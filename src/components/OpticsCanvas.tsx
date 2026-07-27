import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface Props {
  config: OpticsConfig;
  result: ImageResult;
  activeRays: Set<1 | 2 | 3 | 4>;
  aperture: number;           // half-height of the mirror / lens in canvas units
  hideObject?: boolean;       // true for "object at infinity" cases
  objectType?: 'arrow' | 'point';
  onObjectDistChange: (dist: number) => void;
  onObjectHeightChange: (h: number) => void;
  ray1Angle?: number;
  ray2Angle?: number;
  ray3Angle?: number;
  ray4Angle?: number;
  isRotated?: boolean;
  isLightMode?: boolean;
}

// SVG viewBox: -560 -280 1120 560
// Origin at (0,0) = center of SVG
// Physics x = SVG x, Physics y = -SVG y (we flip y)
const VB_W = 1120;
const VB_H = 560;
const VB_HALF_W = VB_W / 2;  // 560
const VB_HALF_H = VB_H / 2;  // 280

const MIN_U = 20;
const MAX_U = 400;
const MIN_H = 10;
const MAX_H = 180;

function toSvg(px: number, py: number): [number, number] {
  return [px, -py];
}

function toPhysics(sx: number, sy: number): [number, number] {
  return [sx, -sy];
}

function pathFromPoints(pts: [number, number][]): string {
  const svgPts = pts.map(([x, y]) => toSvg(x, y));
  return svgPts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function renderRaySegment(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  isDashed = false,
  opacity = 0.95,
  color = "#60a5fa",
  keyStr: string
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  
  const midArrow = len > 15 && (
    <g key={`arr_${keyStr}`} transform={`translate(${(x1 + x2) / 2}, ${(y1 + y2) / 2}) rotate(${(Math.atan2(dy, dx) * 180) / Math.PI})`}>
      <path d="M -10 -8 L 6 0 L -10 8 Z" fill={color} opacity={opacity} />
    </g>
  );

  return (
    <g key={keyStr}>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={isDashed ? 2.0 : 2.8}
        strokeDasharray={isDashed ? '7 5' : undefined}
        strokeOpacity={isDashed ? 0.75 : opacity}
      />
      {midArrow}
    </g>
  );
}

export default function OpticsCanvas({
  config,
  result,
  activeRays,
  aperture,
  hideObject = false,
  objectType = 'arrow',
  onObjectDistChange,
  onObjectHeightChange,
  ray1Angle = 15,
  ray2Angle = -15,
  ray3Angle = -15,
  ray4Angle = -15,
  isRotated = false,
  isLightMode = false,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<'obj' | 'height' | 'pan' | null>(null);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [zoom, setZoom] = useState(1.0);
  const [startPan, setStartPan] = useState<[number, number]>([0, 0]);
  const [startPinchDist, setStartPinchDist] = useState<number | null>(null);
  const [startZoom, setStartZoom] = useState<number>(1.0);
  const [isDownloading, setIsDownloading] = useState(false);

  const { type, focalLength: f, objectDist: u, objectHeight: h } = config;

  const handleDownload = useCallback(async () => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    setIsDownloading(true);

    try {
      // 1. Create a canvas of crisp, ultra-high resolution
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      // 2. Clone the SVG element so we can safely edit its scale/pan for printing
      const svgClone = svgEl.cloneNode(true) as SVGSVGElement;
      
      // Override transform zoom/pan inside the exported SVG to a perfectly-framed fit
      const sceneGroup = svgClone.querySelector('#optics-scene-group');
      if (sceneGroup) {
        sceneGroup.setAttribute('transform', 'translate(0, 0) scale(1)');
      }

      // Explicitly set width & height so browser renders the vector bounding-box accurately
      svgClone.setAttribute('width', '1120');
      svgClone.setAttribute('height', '560');

      // Convert SVG DOM into XML source
      const svgXml = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgXml], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        try {
          // A. Fill high-contrast background (matches the app's current theme)
          ctx.fillStyle = isLightMode ? '#f8fafc' : '#060b14';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // B. Add subtle outer border accent
          ctx.strokeStyle = isLightMode ? '#cbd5e1' : '#1e293b';
          ctx.lineWidth = 2;
          ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);

          // C. Draw SVG scene centered (Scale down 1120x560 to beautifully fit inside 1920x1080)
          // Aspect ratio is 2:1. Width = 1840px, Height = 920px. Left-offset = 40px, Top-offset = 140px.
          ctx.drawImage(img, 40, 140, 1840, 920);

          // D. Draw sophisticated top heading bar panel with branding information
          ctx.fillStyle = isLightMode ? '#ffffff' : '#090e1a';
          ctx.fillRect(16, 16, canvas.width - 32, 105);

          // Decorative cyan separator border
          ctx.fillStyle = '#0891b2'; // Cyan-600
          ctx.fillRect(16, 118, canvas.width - 32, 3);

          // Draw "Ray Optica" main title logo representation on the top left
          ctx.font = "bold 38px 'Inter', system-ui, -apple-system, sans-serif";
          ctx.fillStyle = isLightMode ? '#0e7490' : '#22d3ee'; // Cyan-700 on light, Cyan-400 on dark
          ctx.fillText('Ray Optica', 50, 60);

          // E. Draw neat visual metric parameters for the ray experiment
          const prettyType = type
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          const expMetrics = `${prettyType}  |  f = ${f} cm,  u = ${u === 9999 ? '∞' : u + ' cm'},  v = ${result.atInfinity ? '∞' : result.v.toFixed(1) + ' cm'}`;

          ctx.font = "bold 22px 'Inter', system-ui, -apple-system, sans-serif";
          ctx.fillStyle = isLightMode ? '#047857' : '#10b981'; // Emerald-700 on light, Emerald-400 on dark
          ctx.textAlign = 'right';
          ctx.fillText(expMetrics, canvas.width - 50, 60);

          // F. Draw secondary properties underneath the metrics (Nature/Size)
          const subMetricsText = `Nature: ${result.nature}  •  Size: ${result.sizeDesc}  •  Magnification: ${result.m === 0 ? 'N/A' : result.m.toFixed(2)}x`;
          ctx.font = "500 16px 'Inter', system-ui, -apple-system, sans-serif";
          ctx.fillStyle = isLightMode ? '#475569' : '#64748b'; // Slate-600 on light, Slate-500 on dark
          ctx.fillText(subMetricsText, canvas.width - 50, 94);

          // Reset text alignment to left for safety
          ctx.textAlign = 'left';

          // G. Draw dynamic footer watermarks for reference
          ctx.fillStyle = isLightMode ? '#94a3b8' : '#334155'; // Slate-400 on light, Slate-700 on dark
          ctx.font = "600 14px 'Inter', system-ui, -apple-system, sans-serif";
          ctx.fillText('Conceptual Learning Online © conceptuallearning.com', canvas.width - 50, canvas.height - 35);
          
          ctx.textAlign = 'left';
          ctx.fillText('Ray Diagram', 50, canvas.height - 35);

          // 6. Programmatically trigger native file download
          const exportUrl = canvas.toDataURL('image/png');
          const dlHandler = document.createElement('a');
          dlHandler.href = exportUrl;
          
          const cleanTypeName = type.replace('-mirror', '').replace('-lens', '');
          dlHandler.download = `RayOptics_${cleanTypeName}_u${u === 9999 ? 'inf' : u}cm_f${f}cm.png`;
          
          document.body.appendChild(dlHandler);
          dlHandler.click();
          document.body.removeChild(dlHandler);
        } catch (canvasErr) {
          console.error("Canvas export execution failed:", canvasErr);
        } finally {
          URL.revokeObjectURL(blobUrl);
          setIsDownloading(false);
        }
      };

      img.onerror = (imgErr) => {
        console.error("SVG image source loading error on export:", imgErr);
        URL.revokeObjectURL(blobUrl);
        setIsDownloading(false);
      };

      img.src = blobUrl;
    } catch (e) {
      console.error("Initiation of ray download triggered error:", e);
      setIsDownloading(false);
    }
  }, [type, f, u, result]);
  const isMirror = type === 'concave-mirror' || type === 'convex-mirror' || type === 'plane-mirror';
  const isConcave = type === 'concave-mirror' || type === 'concave-lens';
  const hasFAndC = type !== 'plane-mirror';

  // Physics positions
  const objPhysX = hideObject ? -400 : -u;
  const objPhysY = h;
  const [objSvgX, objSvgY] = toSvg(objPhysX, objPhysY);

  const imgPhysX = result.atInfinity ? 0 : result.v;
  const imgPhysY = result.atInfinity ? 0 : result.imageHeight;
  const [imgSvgX, imgSvgY] = toSvg(imgPhysX, imgPhysY);

  const fSign = isMirror
    ? (isConcave ? -f : f)
    : (isConcave ? -f : f);

  const f1X = isMirror ? fSign : -f;
  const f2X = isMirror ? fSign : f;
  const cX = isMirror ? 2 * fSign : 0;

  const rays = objectType === 'arrow'
    ? computeRays(config, result, aperture, ray4Angle, ray3Angle).filter(r => activeRays.has(r.group))
    : computePointRays(config, result, aperture, ray1Angle, ray2Angle);

  // ─── Pointer event handling ────────────────────────────────────────────────
  const getSvgCoords = useCallback((clientX: number, clientY: number): [number, number] => {
    const svg = svgRef.current;
    if (!svg) return [0, 0];
    const rect = svg.getBoundingClientRect();

    if (isRotated) {
      // Rotated 90deg clockwise:
      // Vertical clientY maps to landscape horizontal (left coordinates starting from rect.top)
      // Horizontal clientX maps to landscape vertical (top coordinates starting from rect.right, going left)
      const relX = clientY - rect.top;
      const relY = rect.right - clientX;
      
      const scaleX = VB_W / rect.height;
      const scaleY = VB_H / rect.width;
      
      const sx = relX * scaleX - VB_HALF_W;
      const sy = relY * scaleY - VB_HALF_H;
      return [sx, sy];
    } else {
      const scaleX = VB_W / rect.width;
      const scaleY = VB_H / rect.height;
      const sx = (clientX - rect.left) * scaleX - VB_HALF_W;
      const sy = (clientY - rect.top) * scaleY - VB_HALF_H;
      return [sx, sy];
    }
  }, [isRotated]);

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!dragging) return;

    if (dragging === 'pan') {
      if (isRotated) {
        const dx = clientY - startPan[0];
        const dy = (window.innerWidth - clientX) - startPan[1];
        setPanX(dx);
        setPanY(dy);
      } else {
        const dx = clientX - startPan[0];
        const dy = clientY - startPan[1];
        setPanX(dx);
        setPanY(dy);
      }
      return;
    }

    const [sx, sy] = getSvgCoords(clientX, clientY);
    // Adjusted for pan & zoom to get coordinates inside the transformed group
    const sx_scene = (sx - panX) / zoom;
    const sy_scene = (sy - panY) / zoom;
    const [px] = toPhysics(sx_scene, sy_scene);

    if (dragging === 'obj') {
      // Dragging horizontally changes object distance
      const rawU = -px;
      if (rawU >= 385 && type !== 'plane-mirror') {
        onObjectDistChange(9999);
      } else {
        const newU = clamp(rawU, MIN_U, MAX_U);
        onObjectDistChange(newU);
      }
      // Dragging vertically changes object height if arrow, otherwise point source is on axis (0)
      if (objectType === 'arrow') {
        const [, py] = toPhysics(sx_scene, sy_scene);
        const newH = clamp(py, MIN_H, MAX_H);
        onObjectHeightChange(newH);
      } else {
        onObjectHeightChange(0);
      }
    }
  }, [dragging, getSvgCoords, onObjectDistChange, onObjectHeightChange, objectType, type, panX, panY, zoom, startPan, isRotated]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handlePointerMove(e.clientX, e.clientY);
  }, [handlePointerMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2 && startPinchDist !== null) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const scaleFactor = dist / startPinchDist;
      const newZoom = clamp(startZoom * scaleFactor, 0.4, 4.0);
      setZoom(newZoom);
    } else if (e.touches.length === 1 && dragging) {
      e.preventDefault();
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handlePointerMove, startPinchDist, startZoom, dragging]);

  const handlePointerUp = useCallback(() => {
    setDragging(null);
    setStartPinchDist(null);
  }, []);

  useEffect(() => {
    if (dragging || startPinchDist !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [dragging, startPinchDist, handleMouseMove, handleTouchMove, handlePointerUp]);

  const handleBgDown = (clientX: number, clientY: number) => {
    if (dragging) return;
    setDragging('pan');
    if (isRotated) {
      setStartPan([clientY - panX, (window.innerWidth - clientX) - panY]);
    } else {
      setStartPan([clientX - panX, clientY - panY]);
    }
  };

  const onSvgMouseDown = (e: React.MouseEvent) => {
    const target = e.target as SVGElement;
    if (target.closest('g[style*="cursor: grab"]') || target.closest('g[style*="cursor: grabbing"]')) {
      return; // Handled by object drag
    }
    handleBgDown(e.clientX, e.clientY);
  };

  const onSvgTouchStart = (e: React.TouchEvent) => {
    const target = e.target as SVGElement;
    if (target.closest('g[style*="cursor: grab"]') || target.closest('g[style*="cursor: grabbing"]')) {
      return; // Handled by object drag
    }
    if (e.touches.length === 2) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      setStartPinchDist(dist);
      setStartZoom(zoom);
      setDragging(null); // Cancel single touch drag
    } else if (e.touches.length === 1) {
      setDragging('pan');
      if (isRotated) {
        setStartPan([e.touches[0].clientY - panX, (window.innerWidth - e.touches[0].clientX) - panY]);
      } else {
        setStartPan([e.touches[0].clientX - panX, e.touches[0].clientY - panY]);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomIntensity = 0.08;
    const direction = e.deltaY > 0 ? -1 : 1;
    setZoom(z => clamp(z * (1 + direction * zoomIntensity), 0.4, 4.0));
  };

  const startDrag = (type: 'obj' | 'height') => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(type);
  };

  // ─── Drawing helpers ───────────────────────────────────────────────────────

  // Lens shape paths
  function lensPath(cx: number, halfH: number): string {
    if (type === 'convex-lens') {
      // Biconvex: both surfaces bow OUTWARD → thicker in the middle
      const bulge = halfH * 0.55;
      return `M ${cx} ${-halfH} Q ${cx + bulge} 0 ${cx} ${halfH} Q ${cx - bulge} 0 ${cx} ${-halfH} Z`;
    } else {
      // Biconcave: thick outer edges, thin center, inward bows
      const w = Math.max(15, halfH * 0.15); // edge width
      const m = 5;                           // center width
      return [
        `M ${cx - w} ${-halfH}`,               // Top-left
        `L ${cx + w} ${-halfH}`,               // Line to Top-right
        `Q ${cx + m} 0 ${cx + w} ${halfH}`,    // Curve to Bottom-right (inward bow)
        `L ${cx - w} ${halfH}`,               // Line to Bottom-left
        `Q ${cx - m} 0 ${cx - w} ${-halfH}`,   // Curve to Top-left (inward bow)
        `Z`
      ].join(' ');
    }
  }

  // Mirror arc path — height driven by aperture prop
  function mirrorArcPath(): string {
    if (type === 'plane-mirror') {
      return `M 0 ${-aperture} L 0 ${aperture}`;
    }
    const bulge = type === 'concave-mirror' ? 40 : -40;
    return `M 0 ${-aperture} Q ${bulge} 0 0 ${aperture}`;
  }

  const arrowMarker = (id: string, color: string) => (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="14" markerHeight="14" orient="auto">
      <path d="M 0 1 L 10 5 L 0 9 z" fill={color} />
    </marker>
  );

  // Compute label safe positions (avoid overlap)
  const fLabel1 = toSvg(f1X, 0);
  const f2SvgPos = toSvg(f2X, 0);
  const cSvgPos = toSvg(cX, 0);
  const twoF1SvgPos = toSvg(2 * f1X, 0);
  const twoF2SvgPos = toSvg(2 * f2X, 0);

  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col flex-1 transition-colors duration-300 ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`} id="optics-canvas-wrapper">
      {/* ── Floating Zoom / Pan Controls (Overlay) ── */}
      <div className={`absolute top-4 right-4 flex flex-col gap-2 p-2 rounded-2xl shadow-xl z-25 select-none transition-colors duration-300 ${isLightMode ? 'bg-white/95 border border-slate-250' : 'bg-slate-950/85 border border-slate-800'}`} id="canvas-zoom-controls">
        <button
          onClick={() => setZoom(z => clamp(z + 0.15, 0.4, 4.0))}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition active:scale-95 cursor-pointer text-lg font-black ${
            isLightMode 
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-705 border border-slate-300' 
              : 'bg-slate-900 hover:bg-slate-800 text-cyan-450 hover:text-cyan-300 border border-slate-750'
          }`}
          title="Zoom In (Wheel Scroll)"
        >
          ＋
        </button>
        <button
          onClick={() => setZoom(z => clamp(z - 0.15, 0.4, 4.0))}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition active:scale-95 cursor-pointer text-lg font-black ${
            isLightMode 
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-705 border border-slate-300' 
              : 'bg-slate-900 hover:bg-slate-800 text-cyan-450 hover:text-cyan-300 border border-slate-750'
          }`}
          title="Zoom Out (Wheel Scroll)"
        >
          －
        </button>
        <button
          onClick={() => {
            setZoom(1.0);
            setPanX(0);
            setPanY(0);
          }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition active:scale-95 cursor-pointer text-xs font-bold ${
            isLightMode 
              ? 'bg-slate-100 hover:bg-slate-200 text-emerald-700 hover:text-emerald-800 border border-slate-300' 
              : 'bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-350 border border-slate-750'
          }`}
          title="Reset View"
        >
          Reset
        </button>
        <div className={`h-px mx-1 my-0.5 ${isLightMode ? 'bg-slate-200' : 'bg-slate-800'}`} />
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 disabled:from-slate-800 disabled:to-slate-900 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-lg shadow-cyan-500/10 border border-cyan-500/20"
          title="Download Ray Diagram (High Quality Image)"
        >
          {isDownloading ? (
            <Loader2 className="w-5 h-5 animate-spin text-cyan-200" />
          ) : (
            <Download className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      <svg
        ref={svgRef}
        viewBox={`${-VB_HALF_W} ${-VB_HALF_H} ${VB_W} ${VB_H}`}
        className="w-full h-full select-none touch-none"
        style={{ cursor: dragging === 'pan' ? 'grabbing' : dragging ? 'grabbing' : 'default', background: 'transparent' }}
        onMouseDown={onSvgMouseDown}
        onTouchStart={onSvgTouchStart}
        onWheel={handleWheel}
      >
        <defs>
          {arrowMarker('arr-obj', isLightMode ? '#b45309' : '#facc15')}
          {arrowMarker('arr-img-real', isLightMode ? '#15803d' : '#4ade80')}
          {arrowMarker('arr-img-virt', isLightMode ? '#6d28d9' : '#a78bfa')}
          {arrowMarker('arr-axis', isLightMode ? '#475569' : '#475569')}
          {arrowMarker('arr-ray', isLightMode ? '#1d4ed8' : '#60a5fa')}
          {arrowMarker('arr-ray-d', isLightMode ? '#1d4ed8' : '#60a5fa')}
        </defs>

        <g id="optics-scene-group" transform={`translate(${panX}, ${panY}) scale(${zoom})`}>
          {/* ── Grid lines (subtle) ── */}
          {[-200, -100, 100, 200].map(x => (
            <line key={`gx${x}`} x1={x} y1={-VB_HALF_H} x2={x} y2={VB_HALF_H}
              stroke={isLightMode ? '#e2e8f0' : '#1e293b'} strokeWidth="1" />
          ))}
          {[-150, -100, -50, 50, 100, 150].map(y => (
            <line key={`gy${y}`} x1={-VB_HALF_W} y1={y} x2={VB_HALF_W} y2={y}
              stroke={isLightMode ? '#e2e8f0' : '#1e293b'} strokeWidth="1" />
          ))}

          {/* ── Principal Axis ── */}
          <line x1={-VB_HALF_W} y1={0} x2={VB_HALF_W} y2={0}
            stroke={isLightMode ? '#94a3b8' : '#475569'} strokeWidth="1.5" strokeDasharray="8 6" />

          {/* ── Construction Rays / Infinity Rays ── */}
          {hideObject
            /* 5 parallel rays when object is at infinity */
            ? [0.8, 0.4, 0, -0.4, -0.8].map((frac, idx) => {
                const pY    = frac * aperture;   // physics hit-Y
                const sY    = -pY;               // SVG hit-Y (y-flipped)
                const ratio = 520 / f;           // canvas half-width / focal length

                const isMir = type === 'concave-mirror' || type === 'convex-mirror';
                const bulge = type === 'concave-mirror' ? 40 : (type === 'convex-mirror' ? -40 : 0);
                const hitX = isMir ? (bulge / 2) * (1 - (pY / aperture) ** 2) : 0;

                // Reflected / refracted endpoint (SVG coords)
                const refX = isMir ? -520 : 520;
                const refY =
                  type === 'concave-mirror' ? -(pY * (1 - ratio)) :
                  type === 'convex-mirror'  ? -(pY * (1 + ratio)) :
                  type === 'convex-lens'    ? -(pY * (1 - ratio)) :
                                              -(pY * (1 + ratio)); // concave-lens

                let refEndX = refX;
                let refEndY = refY;
                let dashElement: React.ReactNode = null;

                const rayColor = isLightMode ? '#1d4ed8' : '#60a5fa';

                if (type === 'concave-mirror') {
                  const focusX = -f;
                  const dx = focusX - hitX;
                  const dy = -sY;
                  const [ex, ey] = extendToX(hitX, sY, dx, dy, -520);
                  refEndX = ex;
                  refEndY = ey;
                } else if (type === 'convex-mirror') {
                  const focusX = f;
                  const dx = hitX - focusX;
                  const dy = sY;
                  const [ex, ey] = extendToX(hitX, sY, dx, dy, -520);
                  refEndX = ex;
                  refEndY = ey;
                  dashElement = (
                    <line x1={hitX} y1={sY} x2={focusX} y2={0}
                      stroke={rayColor} strokeWidth="1.2" strokeOpacity="0.35"
                      strokeDasharray="6 4" />
                  );
                }

                // Dashed: back-trace to virtual focus for convex-mirror / concave-lens
                const dashX =
                  type === 'convex-mirror'  ?  f :
                  type === 'concave-lens'   ? -f : null;

                return (
                  <g key={`inf${idx}`}>
                    {/* Incident ray (horizontal, from left canvas edge) */}
                    {renderRaySegment(-520, sY, hitX, sY, false, 0.85, rayColor, `inf_inc_${idx}`)}
                    
                    {/* Reflected / refracted ray */}
                    {renderRaySegment(hitX, sY, refEndX, refEndY, false, 0.85, rayColor, `inf_ref_${idx}`)}

                    {/* Dashed virtual extension toward virtual focus */}
                    {dashElement ? dashElement : (dashX !== null && (
                      <line x1={0} y1={sY} x2={dashX} y2={0}
                        stroke={rayColor} strokeWidth="1.2" strokeOpacity="0.35"
                        strokeDasharray="6 4" />
                    ))}
                  </g>
                );
              })
            /* Normal case: split into segments with midpoints arrows */
            : rays.flatMap((ray, ri) =>
                ray.points.slice(0, -1).map((pt, si) => {
                  const [x1, y1] = toSvg(pt[0], pt[1]);
                  const [x2, y2] = toSvg(ray.points[si + 1][0], ray.points[si + 1][1]);
                  const color = objectType === 'point'
                    ? (ray.group === 1 
                        ? (isLightMode ? '#6d28d9' : '#c084fc') 
                        : (isLightMode ? '#ea580c' : '#fb923c')) // Purple and Orange custom rays!
                    : (isLightMode ? '#1d4ed8' : '#60a5fa'); // Blue for normal rays
                  return renderRaySegment(
                    x1, y1, x2, y2,
                    ray.dashed,
                    ray.dashed ? 0.6 : 0.85,
                    color,
                    `r${ri}s${si}`
                  );
                })
              )
          }

          {/* ── Mirror or Lens ── */}
          {isMirror ? (
            <>
              {/* Reflective silvered mirror body */}
              <path d={mirrorArcPath()} fill="none" stroke={isLightMode ? '#334155' : '#e2e8f0'} strokeWidth="4.5" strokeLinecap="round" />

              {/* Solid protective backing paint (red-lead/rust color) on the non-reflecting rear side (right) */}
              {type === 'plane-mirror' ? (
                <line x1={2.2} y1={-aperture} x2={2.2} y2={aperture} stroke="#b91c1c" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
              ) : type === 'concave-mirror' ? (
                <path d={`M 2.2 ${-aperture} Q 42.2 0 2.2 ${aperture}`} fill="none" stroke="#b91c1c" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
              ) : (
                <path d={`M 2.2 ${-aperture} Q -37.8 0 2.2 ${aperture}`} fill="none" stroke="#b91c1c" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
              )}

              {/* Highly visible hatching on the back side of the mirror */}
              {Array.from({ length: Math.ceil((2 * aperture) / 10) }, (_, i) => {
                const step = (2 * aperture) / Math.ceil((2 * aperture) / 10);
                const y = -aperture + i * step;
                let mirrorX = 0;
                if (type !== 'plane-mirror') {
                  const bulge = type === 'concave-mirror' ? 40 : -40;
                  const ratio = y / aperture;
                  mirrorX = (bulge / 2) * (1 - ratio * ratio);
                }
                const xOffset = 12; // Back side is always shifting rightward for both concave and convex
                return (
                  <line key={`h${y}_${i}`}
                    x1={mirrorX + 2} y1={y} x2={mirrorX + xOffset + 2} y2={y + 8}
                    stroke={isLightMode ? '#475569' : '#94a3b8'} strokeWidth="2.0" opacity="0.95" />
                );
              })}
            </>
          ) : (
            <>
              <path d={lensPath(0, aperture)} fill={isLightMode ? "rgba(30,144,255,0.08)" : "rgba(96,165,250,0.10)"} stroke={isLightMode ? '#1d4ed8' : '#60a5fa'} strokeWidth="2.5" />
            </>
          )}

          {/* ── Focus Points ── */}
          {hasFAndC && (
            <>
              {/* F1 */}
              <circle cx={fLabel1[0]} cy={fLabel1[1]} r={6} fill={isLightMode ? '#d97706' : '#fbbf24'} />
              <text x={fLabel1[0]} y={fLabel1[1] + 22} textAnchor="middle"
                fontSize="18" fontWeight="bold" fill={isLightMode ? '#92400e' : '#fbbf24'} fontFamily="serif">
                {isMirror ? 'F' : 'F₁'}
              </text>

              {/* F2 for lens */}
              {!isMirror && (
                <>
                  <circle cx={f2SvgPos[0]} cy={f2SvgPos[1]} r={6} fill={isLightMode ? '#d97706' : '#fbbf24'} />
                  <text x={f2SvgPos[0]} y={f2SvgPos[1] + 22} textAnchor="middle"
                    fontSize="18" fontWeight="bold" fill={isLightMode ? '#92400e' : '#fbbf24'} fontFamily="serif">
                    F₂
                  </text>
                </>
              )}

              {/* C for mirror */}
              {isMirror && (
                <>
                  <circle cx={cSvgPos[0]} cy={cSvgPos[1]} r={6} fill={isLightMode ? '#ea580c' : '#f97316'} />
                  <text x={cSvgPos[0]} y={cSvgPos[1] + 22} textAnchor="middle"
                    fontSize="18" fontWeight="bold" fill={isLightMode ? '#9a3412' : '#f97316'} fontFamily="serif">
                    C
                  </text>
                </>
              )}

              {/* 2F1 and 2F2 for lens */}
              {!isMirror && (
                <>
                  {/* 2F1 */}
                  <circle cx={twoF1SvgPos[0]} cy={twoF1SvgPos[1]} r={6} fill={isLightMode ? '#ea580c' : '#f97316'} />
                  <text x={twoF1SvgPos[0]} y={twoF1SvgPos[1] + 22} textAnchor="middle"
                    fontSize="18" fontWeight="bold" fill={isLightMode ? '#9a3412' : '#f97316'} fontFamily="serif">
                    2F₁
                  </text>

                  {/* 2F2 */}
                  <circle cx={twoF2SvgPos[0]} cy={twoF2SvgPos[1]} r={6} fill={isLightMode ? '#ea580c' : '#f97316'} />
                  <text x={twoF2SvgPos[0]} y={twoF2SvgPos[1] + 22} textAnchor="middle"
                    fontSize="18" fontWeight="bold" fill={isLightMode ? '#9a3412' : '#f97316'} fontFamily="serif">
                    2F₂
                  </text>
                </>
              )}
            </>
          )}

          {/* Pole / Optical Center */}
          {(() => {
            const bulgeVal = type === 'concave-mirror' ? 40 : (type === 'convex-mirror' ? -40 : 0);
            const poleX = isMirror ? (type === 'plane-mirror' ? 0 : bulgeVal / 2) : 0;
            return (
              <>
                <circle cx={poleX} cy={0} r={5} fill={isLightMode ? '#475569' : '#94a3b8'} />
                <text x={poleX + 8} y={22} fontSize="16" fill={isLightMode ? '#334155' : '#94a3b8'} fontFamily="serif" fontWeight="bold">
                  {isMirror ? 'P' : 'O'}
                </text>
              </>
            );
          })()}

          {/* ── Object Arrow or Point ── */}
          <g
            style={{ cursor: dragging === 'obj' ? 'grabbing' : 'grab' }}
            onMouseDown={startDrag('obj')}
            onTouchStart={startDrag('obj')}
            opacity={hideObject ? 0.35 : 1}
          >
            <rect
              x={objSvgX - 24} y={Math.min(0, objSvgY) - 10}
              width={48} height={Math.abs(objSvgY) + 20}
              fill="transparent"
            />
            {objectType === 'arrow' ? (
              <>
                <line
                  x1={objSvgX} y1={0}
                  x2={objSvgX} y2={objSvgY}
                  stroke={isLightMode ? '#b45309' : '#facc15'} strokeWidth="3"
                  strokeDasharray={hideObject ? '4 4' : undefined}
                  markerEnd="url(#arr-obj)"
                />
                <circle cx={objSvgX} cy={0} r={7} fill={isLightMode ? '#b45309' : '#facc15'} />
                <text x={objSvgX - 14} y={objSvgY - 14} fontSize="16" fontWeight="bold" fill={isLightMode ? '#92400e' : '#facc15'}>
                  {hideObject ? 'O (∞)' : 'O'}
                </text>
                <text x={objSvgX} y={20} textAnchor="middle" fontSize={11} fill={isLightMode ? '#b45309' : '#facc15'} opacity={0.8}>
                  {hideObject ? '← drag to bring back' : '↔ drag'}
                </text>
              </>
            ) : (
              <>
                {/* Pulsing glow ring for Point Source */}
                <circle cx={objSvgX} cy={objSvgY} r={14} fill={isLightMode ? '#b45309' : '#facc15'} opacity="0.25" className="animate-pulse" />
                <circle cx={objSvgX} cy={objSvgY} r={8} stroke={isLightMode ? '#b45309' : '#facc15'} strokeWidth="1.5" fill="none" />
                <circle cx={objSvgX} cy={objSvgY} r={5} fill={isLightMode ? '#b45309' : '#facc15'} />
                <text x={objSvgX - 14} y={objSvgY - 14} fontSize="16" fontWeight="bold" fill={isLightMode ? '#92400e' : '#facc15'}>
                  {hideObject ? 'S (∞)' : 'S'}
                </text>
                <text x={objSvgX} y={20} textAnchor="middle" fontSize={11} fill={isLightMode ? '#b45309' : '#facc15'} opacity={0.8}>
                  {hideObject ? '← drag' : '↔ drag'}
                </text>
              </>
            )}
          </g>

          {/* ── Image Arrow or Point (Only shown if 2+ rays active) ── */}
          {activeRays.size >= 2 && !result.atInfinity && (
            <g opacity="0.95">
              {objectType === 'arrow' ? (
                <>
                  <line
                    x1={imgSvgX} y1={0}
                    x2={imgSvgX} y2={imgSvgY}
                    stroke={result.isReal ? (isLightMode ? '#15803d' : '#4ade80') : (isLightMode ? '#6d28d9' : '#a78bfa')}
                    strokeWidth={result.isReal ? 3 : 2}
                    strokeDasharray={result.isReal ? undefined : '8 4'}
                    markerEnd={result.isReal ? 'url(#arr-img-real)' : 'url(#arr-img-virt)'}
                  />
                  <circle cx={imgSvgX} cy={0} r={6} fill={result.isReal ? (isLightMode ? '#15803d' : '#4ade80') : (isLightMode ? '#6d28d9' : '#a78bfa')} />
                  <text x={imgSvgX + 10} y={imgSvgY - 10}
                    fontSize="15" fontWeight="bold"
                    fill={result.isReal ? (isLightMode ? '#15803d' : '#4ade80') : (isLightMode ? '#6d28d9' : '#a78bfa')}>
                    I
                  </text>
                </>
              ) : (
                <>
                  {/* Point image glow effect */}
                  <circle cx={imgSvgX} cy={imgSvgY} r={12} fill={result.isReal ? (isLightMode ? '#15803d' : '#4ade80') : (isLightMode ? '#6d28d9' : '#a78bfa')} opacity="0.3" />
                  <circle cx={imgSvgX} cy={imgSvgY} r={5} fill={result.isReal ? (isLightMode ? '#15803d' : '#4ade80') : (isLightMode ? '#6d28d9' : '#a78bfa')} />
                  <text x={imgSvgX + 10} y={imgSvgY - 10}
                    fontSize="15" fontWeight="bold"
                    fill={result.isReal ? (isLightMode ? '#15803d' : '#4ade80') : (isLightMode ? '#6d28d9' : '#a78bfa')}>
                    I
                  </text>
                </>
              )}
              {/* Image type badge */}
              <rect
                x={imgSvgX - 38}
                y={imgSvgY < 0 ? imgSvgY - 36 : imgSvgY + 8}
                width={76} height={24} rx={4}
                fill={result.isReal ? (isLightMode ? 'rgba(21,128,61,0.08)' : 'rgba(74,222,128,0.15)') : (isLightMode ? 'rgba(109,40,217,0.08)' : 'rgba(167,139,250,0.15)')}
                stroke={result.isReal ? (isLightMode ? '#15803d' : '#4ade80') : (isLightMode ? '#6d28d9' : '#a78bfa')} strokeWidth="1"
              />
              <text
                x={imgSvgX}
                y={imgSvgY < 0 ? imgSvgY - 18 : imgSvgY + 24}
                textAnchor="middle" fontSize="13" fontWeight="600"
                fill={result.isReal ? (isLightMode ? '#15803d' : '#4ade80') : (isLightMode ? '#6d28d9' : '#a78bfa')}>
                {result.isReal ? 'Real' : 'Virtual'}
              </text>
            </g>
          )}

          {/* At infinity label (Only shown if 2+ rays active) */}
          {activeRays.size >= 2 && result.atInfinity && (
            <text x={200} y={-30} fontSize="16" fill={isLightMode ? '#475569' : '#94a3b8'} fontStyle="italic">
              Image at infinity
            </text>
          )}

          {/* ── Scale bar ── */}
          <g transform={`translate(${-VB_HALF_W + 30}, ${VB_HALF_H - 30})`}>
            <line x1={0} y1={0} x2={100} y2={0} stroke={isLightMode ? '#334155' : '#475569'} strokeWidth="2" />
            <line x1={0} y1={-5} x2={0} y2={5} stroke={isLightMode ? '#334155' : '#475569'} strokeWidth="2" />
            <line x1={100} y1={-5} x2={100} y2={5} stroke={isLightMode ? '#334155' : '#475569'} strokeWidth="2" />
            <text x={50} y={-10} textAnchor="middle" fontSize="13" fill={isLightMode ? '#475569' : '#64748b'}>100 cm</text>
          </g>
        </g>
      </svg>
    </div>
  );
}


export type OpticsType = 'concave-mirror' | 'convex-mirror' | 'convex-lens' | 'concave-lens' | 'plane-mirror';

export interface ImageResult {
  v: number;          // signed image distance (physics sign convention)
  m: number;          // magnification
  imageHeight: number;
  isReal: boolean;
  isInverted: boolean;
  nature: string;
  sizeDesc: string;
  atInfinity: boolean;
}

export interface Ray {
  points: [number, number][];   // in physics coords
  dashed: boolean;
  group: 1 | 2 | 3 | 4;            // which construction ray (1, 2, 3, or 4)
}

export interface OpticsConfig {
  type: OpticsType;
  focalLength: number;   // always positive magnitude
  objectDist: number;    // always positive magnitude (u)
  objectHeight: number;  // always positive (height of object arrow)
}

/**
 * Compute image using NCERT sign convention.
 * Mirror: 1/v + 1/u = 1/f
 * Lens:   1/v - 1/u = 1/f
 * For mirrors: concave f<0, convex f>0; u always negative (object in front)
 * For lenses:  convex f>0, concave f<0; u always negative (object on left)
 */
export function computeImage(cfg: OpticsConfig): ImageResult {
  const { type, focalLength: fMag, objectDist: uMag, objectHeight } = cfg;

  if (type === 'plane-mirror') {
    return {
      v: uMag,
      m: 1,
      imageHeight: objectHeight,
      isReal: false,
      isInverted: false,
      nature: 'Virtual',
      sizeDesc: 'Same size',
      atInfinity: false,
    };
  }

  const u = -uMag; // signed u (always negative)
  let f: number;

  if (type === 'concave-mirror') f = -fMag;
  else if (type === 'convex-mirror') f = fMag;
  else if (type === 'convex-lens') f = fMag;
  else f = -fMag; // concave-lens

  let v: number;
  const EPS = 0.5;

  if (type === 'concave-mirror' || type === 'convex-mirror') {
    // 1/v = 1/f - 1/u
    const inv_f = 1 / f;
    const inv_u = 1 / u;
    const inv_v = inv_f - inv_u;
    if (Math.abs(inv_v) < 0.0001) {
      return {
        v: 0, m: 0, imageHeight: 0,
        isReal: false, isInverted: false,
        nature: 'Virtual', sizeDesc: 'At infinity',
        atInfinity: true,
      };
    }
    v = 1 / inv_v;
  } else {
    // lens: 1/v - 1/u = 1/f  →  1/v = 1/f + 1/u
    const inv_f = 1 / f;
    const inv_u = 1 / u;
    const inv_v = inv_f + inv_u;
    if (Math.abs(inv_v) < 0.0001) {
      return {
        v: 0, m: 0, imageHeight: 0,
        isReal: false, isInverted: false,
        nature: 'Virtual', sizeDesc: 'At infinity',
        atInfinity: true,
      };
    }
    v = 1 / inv_v;
  }

  // Magnification
  let m: number;
  if (type === 'concave-mirror' || type === 'convex-mirror') {
    m = -v / u;
  } else {
    m = v / u;
  }

  const imageHeight = m * objectHeight;

  // Real/virtual
  let isReal: boolean;
  if (type === 'concave-mirror' || type === 'convex-mirror') {
    isReal = v < -EPS; // mirrors: v negative = real image in front
  } else {
    isReal = v > EPS; // lenses: v positive = real image on other side
  }

  const isInverted = m < 0;
  const nature = isReal ? 'Real' : 'Virtual';
  const absMag = Math.abs(m);
  const sizeDesc = absMag > 1.05 ? 'Magnified' : absMag < 0.95 ? 'Diminished' : 'Same size';

  return { v, m, imageHeight, isReal, isInverted, nature, sizeDesc, atInfinity: false };
}

/**
 * Compute the 3 construction rays for the given optics configuration.
 * All coordinates are in physics space.
 *
 * Physics coords:
 *   Mirror/lens at x=0
 *   Object at x = -objectDist (left), y = objectHeight (up)
 *   Positive x = right of mirror/lens
 *   Positive y = above principal axis
 *
 * Mirror:
 *   Focus at x = f_signed  (concave: -fMag, convex: +fMag)
 *   C at x = 2*f_signed
 *
 * Lens:
 *   F1 (object side) at x = -fMag
 *   F2 (image side)  at x = +fMag
 */
export function planeMirrorRays(
  objX: number, objY: number, imgX: number, imgY: number,
  left: number, right: number, aperture: number,
  ray3Angle = -15
): Ray[] {
  const rays: Ray[] = [];

  const missedStraight = (hitY: number, group: 1 | 2 | 3 | 4): Ray => {
    const [ex, ey] = extendToX(0, hitY, -objX, hitY - objY, right);
    return { points: [[objX, objY], [0, hitY], [ex, ey]], dashed: false, group };
  };

  // Ray 1: Parallel to principal axis
  {
    const hitY = objY;
    if (Math.abs(hitY) > aperture) {
      rays.push(missedStraight(hitY, 1));
    } else {
      const [exRef, eyRef] = extendToX(0, hitY, -imgX, hitY - imgY, left);
      rays.push({ points: [[objX, objY], [0, hitY], [exRef, eyRef]], dashed: false, group: 1 });
      rays.push({ points: [[0, hitY], [imgX, imgY]], dashed: true, group: 1 });
    }
  }

  // Ray 2: From pole (hits at 0, 0)
  {
    const hitY = 0;
    if (Math.abs(hitY) > aperture) {
      rays.push(missedStraight(hitY, 2));
    } else {
      const [exRef, eyRef] = extendToX(0, hitY, -imgX, hitY - imgY, left);
      rays.push({ points: [[objX, objY], [0, hitY], [exRef, eyRef]], dashed: false, group: 2 });
      rays.push({ points: [[0, hitY], [imgX, imgY]], dashed: true, group: 2 });
    }
  }

  // Ray 3: Custom angle of incidence
  {
    const angleRad = (ray3Angle * Math.PI) / 180;
    const tanTheta = Math.tan(angleRad);
    const hitY = objY - objX * tanTheta;

    if (Math.abs(hitY) > aperture) {
      rays.push(missedStraight(hitY, 3));
    } else {
      const [exRef, eyRef] = extendToX(0, hitY, -imgX, hitY - imgY, left);
      rays.push({ points: [[objX, objY], [0, hitY], [exRef, eyRef]], dashed: false, group: 3 });
      rays.push({ points: [[0, hitY], [imgX, imgY]], dashed: true, group: 3 });
    }
  }

  return rays;
}

export function computeRays(
  cfg: OpticsConfig,
  result: ImageResult,
  aperture = 9999,
  ray4Angle?: number,
  ray3Angle?: number
): Ray[] {
  const { type, focalLength: fMag, objectDist: uMag, objectHeight: h } = cfg;
  if (uMag >= 9000) return []; // object at infinity

  const { v, imageHeight } = result;

  const CANVAS_LEFT = -520;
  const CANVAS_RIGHT = 520;

  const objX = -uMag;
  const objY = h;
  const imgX = v;
  const imgY = imageHeight;

  if (type === 'plane-mirror') {
    return planeMirrorRays(objX, objY, imgX, imgY, CANVAS_LEFT, CANVAS_RIGHT, aperture, ray3Angle);
  }

  let f1X: number, f2X: number, cX: number;
  if (type === 'concave-mirror') {
    f1X = -fMag; cX = -2 * fMag; f2X = -fMag;
  } else if (type === 'convex-mirror') {
    f1X = fMag; cX = 2 * fMag; f2X = fMag;
  } else if (type === 'convex-lens') {
    f1X = -fMag; f2X = fMag; cX = 0;
  } else {
    f1X = -fMag; f2X = fMag; cX = 0;
  }

  const rays: Ray[] = [];

  if (type === 'concave-mirror' || type === 'convex-mirror') {
    rays.push(...mirrorRays(type, objX, objY, imgX, imgY, fMag, f1X, cX, v, CANVAS_LEFT, CANVAS_RIGHT, aperture));
  } else {
    rays.push(...lensRays(type, objX, objY, imgX, imgY, fMag, f1X, f2X, v, CANVAS_LEFT, CANVAS_RIGHT, aperture, result.atInfinity, ray4Angle));
  }

  return rays;
}

export function computePointRays(
  cfg: OpticsConfig,
  result: ImageResult,
  aperture: number,
  angle1: number,
  angle2: number
): Ray[] {
  const { type, objectDist: uMag, objectHeight: h } = cfg;
  const { v, imageHeight } = result;

  const CANVAS_LEFT = -520;
  const CANVAS_RIGHT = 520;

  const objX = -uMag;
  const objY = h;
  const imgX = v;
  const imgY = imageHeight;

  const rays: Ray[] = [];
  const angles = [angle1, angle2];

  angles.forEach((angle, idx) => {
    // Convert angle to radians
    const angleRad = (angle * Math.PI) / 180;
    const tanTheta = Math.tan(angleRad);

    // Hit coordinates approximated at x = 0 first, then adjusted for mirror curve
    const approxHitY = objY + uMag * tanTheta;
    const isMirror = type.includes('mirror');
    const bulge = type === 'concave-mirror' ? 40 : (type === 'convex-mirror' ? -40 : 0);
    const hitX = isMirror ? (bulge / 2) * (1 - (approxHitY / aperture) ** 2) : 0;
    
    // Exact hitY based on hitX
    const hitY = objY + (hitX - objX) * tanTheta;

    const missedStraight = (): Ray => {
      // Calculate endpoint at far right
      const [ex, ey] = extendToX(hitX, hitY, hitX - objX, hitY - objY, CANVAS_RIGHT);
      return {
        points: [[objX, objY], [hitX, hitY], [ex, ey]],
        dashed: false,
        group: (idx + 1) as any,
      };
    };

    if (Math.abs(hitY) > aperture) {
      // Ray misses the aperture and goes straight
      rays.push(missedStraight());
    } else {
      if (isMirror) {
        const isVirtual = v > 0;
        if (result.atInfinity) {
          // Object is at focus, reflected rays are parallel
          const slope = (objY - hitY) / cfg.focalLength;
          rays.push({
            points: [[objX, objY], [hitX, hitY], [CANVAS_LEFT, hitY + (CANVAS_LEFT - hitX) * slope]],
            dashed: false,
            group: (idx + 1) as any,
          });
        } else if (isVirtual) {
          // Virtual image: reflected ray goes left, virtual extension goes right to image
          const dx = hitX - v;
          const dy = hitY - imgY;
          const [exRef, eyRef] = extendToX(hitX, hitY, dx, dy, CANVAS_LEFT);
          rays.push({
            points: [[objX, objY], [hitX, hitY], [exRef, eyRef]],
            dashed: false,
            group: (idx + 1) as any,
          });
          rays.push({
            points: [[hitX, hitY], [v, imgY]],
            dashed: true,
            group: (idx + 1) as any,
          });
        } else {
          // Real image: reflected ray goes left, passing through (v, imageHeight)
          const dx = v - hitX;
          const dy = imgY - hitY;
          const [exRef, eyRef] = extendToX(hitX, hitY, dx, dy, CANVAS_LEFT);
          rays.push({
            points: [[objX, objY], [hitX, hitY], [exRef, eyRef]],
            dashed: false,
            group: (idx + 1) as any,
          });
        }
      } else {
        // Lens
        const isVirtual = v < 0;
        if (result.atInfinity) {
          // Object at focus, refracted ray is parallel
          const slope = type === 'convex-lens' ? -objY / cfg.focalLength : objY / cfg.focalLength;
          rays.push({
            points: [[objX, objY], [0, hitY], [CANVAS_RIGHT, hitY + CANVAS_RIGHT * slope]],
            dashed: false,
            group: (idx + 1) as any,
          });
        } else if (isVirtual) {
          // Virtual image on left: physical refracted ray goes right, virtual extension goes left to image
          const dx = -v;
          const dy = hitY - imgY;
          const [exRef, eyRef] = extendToX(0, hitY, dx, dy, CANVAS_RIGHT);
          rays.push({
            points: [[objX, objY], [0, hitY], [exRef, eyRef]],
            dashed: false,
            group: (idx + 1) as any,
          });
          rays.push({
            points: [[0, hitY], [v, imgY]],
            dashed: true,
            group: (idx + 1) as any,
          });
        } else {
          // Real image: refracted ray goes right, passing through (v, imageHeight)
          const dx = v;
          const dy = imgY - hitY;
          const [exRef, eyRef] = extendToX(0, hitY, dx, dy, CANVAS_RIGHT);
          rays.push({
            points: [[objX, objY], [0, hitY], [exRef, eyRef]],
            dashed: false,
            group: (idx + 1) as any,
          });
        }
      }
    }
  });

  return rays;
}

function lineXtoY(x1: number, y1: number, x2: number, y2: number, targetX: number): number {
  if (Math.abs(x2 - x1) < 0.001) return y1;
  return y1 + (y2 - y1) * (targetX - x1) / (x2 - x1);
}

function extendToX(x1: number, y1: number, dx: number, dy: number, targetX: number): [number, number] {
  if (Math.abs(dx) < 0.001) return [x1, targetX > x1 ? 9999 : -9999];
  const t = (targetX - x1) / dx;
  return [targetX, y1 + dy * t];
}

function mirrorRays(
  type: OpticsType, objX: number, objY: number, imgX: number, imgY: number,
  fMag: number, focusX: number, cX: number, v: number,
  left: number, right: number, aperture: number
): Ray[] {
  const rays: Ray[] = [];
  const isConcave = type === 'concave-mirror';
  const isVirtual = v > 0;
  const bulge = type === 'concave-mirror' ? 40 : -40;

  const getMirrorX = (y: number) => {
    return (bulge / 2) * (1 - (y / aperture) ** 2);
  };

  // Ray continues straight past mirror if it misses the aperture
  const missedStraight = (hitY: number, group: 1 | 2 | 3 | 4): Ray => {
    const hitX = getMirrorX(hitY);
    const [ex, ey] = extendToX(hitX, hitY, hitX - objX, hitY - objY, right);
    return { points: [[objX, objY], [hitX, hitY], [ex, ey]], dashed: false, group };
  };

  // ─── Ray 1: Parallel to axis ───────────────────────────────────────────────
  {
    const hitY = objY;
    const hitX = getMirrorX(hitY);
    if (Math.abs(hitY) > aperture) {
      rays.push(missedStraight(hitY, 1));
    } else if (isConcave) {
      const dx = focusX - hitX; const dy = -hitY;
      if (isVirtual) {
        const [ex, ey] = extendToX(hitX, hitY, dx, dy, left);
        rays.push({ points: [[objX, objY], [hitX, hitY], [ex, ey]], dashed: false, group: 1 });
        rays.push({ points: [[hitX, hitY], extendToX(hitX, hitY, -dx, -dy, right)], dashed: true, group: 1 });
      } else {
        const [ex, ey] = extendToX(hitX, hitY, dx, dy, left);
        rays.push({ points: [[objX, objY], [hitX, hitY], [ex, ey]], dashed: false, group: 1 });
      }
    } else {
      const dx = hitX - focusX; const dy = hitY;
      const [ex, ey] = extendToX(hitX, hitY, dx, dy, left);
      rays.push({ points: [[objX, objY], [hitX, hitY], [ex, ey]], dashed: false, group: 1 });
      rays.push({ points: [[hitX, hitY], extendToX(hitX, hitY, -dx, -dy, right)], dashed: true, group: 1 });
    }
  }

  // ─── Ray 2: Through center of curvature C ──────────────────────────────────
  {
    const hitY = lineXtoY(objX, objY, cX, 0, 0);
    const hitX = getMirrorX(hitY);
    if (Math.abs(hitY) > aperture) {
      rays.push(missedStraight(hitY, 2));
    } else if (isConcave) {
      const dx = cX - hitX; const dy = -hitY;
      if (isVirtual) {
        const [ex, ey] = extendToX(hitX, hitY, dx, dy, left);
        rays.push({ points: [[objX, objY], [hitX, hitY], [ex, ey]], dashed: false, group: 2 });
        rays.push({ points: [[hitX, hitY], extendToX(hitX, hitY, -dx, -dy, right)], dashed: true, group: 2 });
      } else {
        const [ex, ey] = extendToX(hitX, hitY, dx, dy, left);
        rays.push({ points: [[objX, objY], [hitX, hitY], [ex, ey]], dashed: false, group: 2 });
      }
    } else {
      const dx = hitX - cX; const dy = hitY;
      const [ex, ey] = extendToX(hitX, hitY, dx, dy, left);
      rays.push({ points: [[objX, objY], [hitX, hitY], [ex, ey]], dashed: false, group: 2 });
      rays.push({ points: [[hitX, hitY], extendToX(hitX, hitY, -dx, -dy, right)], dashed: true, group: 2 });
    }
  }

  // ─── Ray 3: Through / toward focus ─────────────────────────────────────────
  {
    const hitY = lineXtoY(objX, objY, focusX, 0, 0);
    const hitX = getMirrorX(hitY);
    if (Math.abs(hitY) > aperture) {
      rays.push(missedStraight(hitY, 3));
    } else if (isConcave) {
      const [ex, ey] = extendToX(hitX, hitY, -1, 0, left);
      rays.push({ points: [[objX, objY], [hitX, hitY], [ex, ey]], dashed: false, group: 3 });
      if (isVirtual) {
        rays.push({ points: [[hitX, hitY], [right, hitY]], dashed: true, group: 3 });
      }
    } else {
      const [ex, ey] = extendToX(hitX, hitY, -1, 0, left);
      rays.push({ points: [[objX, objY], [hitX, hitY], [ex, ey]], dashed: false, group: 3 });
      rays.push({ points: [[hitX, hitY], [right, hitY]], dashed: true, group: 3 });
    }
  }

  // ─── Ray 4: Incident obliquely towards Pole P ──────────────────────────────
  {
    // The pole (vertex) of the mirror is at (bulge/2, 0).
    const hitX = bulge / 2;
    const hitY = 0;
    const dxRef = objX - hitX;
    const dyRef = objY;
    const [exRef, eyRef] = extendToX(hitX, 0, dxRef, dyRef, left);
    rays.push({ points: [[objX, objY], [hitX, 0], [exRef, eyRef]], dashed: false, group: 4 });

    if (isVirtual) {
      const [exVirt, eyVirt] = extendToX(hitX, 0, -dxRef, -dyRef, right);
      rays.push({ points: [[hitX, 0], [exVirt, eyVirt]], dashed: true, group: 4 });
    }
  }

  return rays;
}

function lensRays(
  type: OpticsType, objX: number, objY: number, imgX: number, imgY: number,
  fMag: number, f1X: number, f2X: number, v: number,
  left: number, right: number, aperture: number, atInfinity: boolean,
  ray4Angle?: number
): Ray[] {
  const rays: Ray[] = [];
  const isConvex = type === 'convex-lens';
  const isVirtual = v < 0;

  // Ray continues straight if it misses the lens aperture
  const missedStraight = (hitY: number, group: 1 | 2 | 3 | 4): Ray => {
    const [ex, ey] = extendToX(0, hitY, -objX, hitY - objY, right);
    return { points: [[objX, objY], [0, hitY], [ex, ey]], dashed: false, group };
  };

  // ─── Ray 1: Parallel to axis ───────────────────────────────────────────────
  {
    const hitY = objY;
    if (Math.abs(hitY) > aperture) {
      rays.push(missedStraight(hitY, 1));
    } else if (isConvex) {
      if (isVirtual) {
        const [ex, ey] = extendToX(0, hitY, fMag, -hitY, right);
        rays.push({ points: [[objX, objY], [0, hitY], [ex, ey]], dashed: false, group: 1 });
        rays.push({ points: [[0, hitY], extendToX(0, hitY, -fMag, hitY, left)], dashed: true, group: 1 });
      } else {
        const [ex, ey] = extendToX(0, hitY, fMag, -hitY, right);
        rays.push({ points: [[objX, objY], [0, hitY], [ex, ey]], dashed: false, group: 1 });
      }
    } else {
      const [ex, ey] = extendToX(0, hitY, fMag, hitY, right);
      rays.push({ points: [[objX, objY], [0, hitY], [ex, ey]], dashed: false, group: 1 });
      rays.push({ points: [[0, hitY], [f1X, 0]], dashed: true, group: 1 });
    }
  }

  // ─── Ray 2: Through optical center (always hits — centre is on axis) ────────
  {
    const [ex, ey] = extendToX(objX, objY, -objX, -objY, right);
    rays.push({ points: [[objX, objY], [0, 0], [ex, ey]], dashed: false, group: 2 });
    if (isVirtual) {
      // This undeviated ray is a single straight line through the centre; extended
      // backward past the object it passes exactly through the virtual image too --
      // draw that backward part dashed, matching rays 1 and 3.
      rays.push({ points: [[objX, objY], extendToX(objX, objY, objX, objY, left)], dashed: true, group: 2 });
    }
  }

  // ─── Ray 3: Through/toward F1 → emerges parallel ──────────────────────────
  {
    const hitY = lineXtoY(objX, objY, isConvex ? f1X : f2X, 0, 0);
    if (Math.abs(hitY) > aperture) {
      rays.push(missedStraight(hitY, 3));
    } else if (isConvex) {
      const [ex, ey] = extendToX(0, hitY, 1, 0, right);
      rays.push({ points: [[objX, objY], [0, hitY], [ex, ey]], dashed: false, group: 3 });
      if (isVirtual) {
        rays.push({ points: [[0, hitY], [left, hitY]], dashed: true, group: 3 });
      }
    } else {
      const [ex, ey] = extendToX(0, hitY, 1, 0, right);
      rays.push({ points: [[objX, objY], [0, hitY], [ex, ey]], dashed: false, group: 3 });
      rays.push({ points: [[0, hitY], [left, hitY]], dashed: true, group: 3 });
    }
  }

  // ─── Ray 4: Oblique ray striking lens at an offset ────────────────────────
  {
    const hitY = ray4Angle !== undefined
      ? objY + Math.abs(objX) * Math.tan((ray4Angle * Math.PI) / 180)
      : -0.4 * objY;

    if (Math.abs(hitY) > aperture) {
      rays.push(missedStraight(hitY, 4));
    } else {
      if (atInfinity) {
        // Image is at infinity: refracted ray is parallel to Ray 1 and 2
        // For convex lens, the slope of parallel refracted ray is -objY / fMag
        const slope = isConvex ? -objY / fMag : objY / fMag;
        const [ex, ey] = extendToX(0, hitY, 1, slope, right);
        rays.push({ points: [[objX, objY], [0, hitY], [ex, ey]], dashed: false, group: 4 });
      } else if (isVirtual) {
        // Virtual image: ray goes forward into x > 0, back-traces to virtual image
        const dx = imgX - 0;
        const dy = imgY - hitY;
        const [exFront, eyFront] = extendToX(0, hitY, dx, dy, right);
        rays.push({ points: [[objX, objY], [0, hitY], [exFront, eyFront]], dashed: false, group: 4 });
        const [exBack, eyBack] = extendToX(0, hitY, -dx, -dy, left);
        rays.push({ points: [[0, hitY], [exBack, eyBack]], dashed: true, group: 4 });
      } else {
        // Real image: goes from (0, hitY) through (imgX, imgY) to the right
        const dx = imgX - 0;
        const dy = imgY - hitY;
        const [ex, ey] = extendToX(0, hitY, dx, dy, right);
        rays.push({ points: [[objX, objY], [0, hitY], [ex, ey]], dashed: false, group: 4 });
      }
    }
  }

  return rays;
}

export function getImageDescription(type: OpticsType, result: ImageResult): string {
  if (result.atInfinity) return 'Image formed at infinity.';

  const { nature, sizeDesc, isInverted } = result;
  const orientation = isInverted ? 'Inverted' : 'Erect';
  return `${nature} · ${orientation} · ${sizeDesc}`;
}

export function getPositionNote(type: OpticsType, result: ImageResult, fMag: number, uMag: number): string {
  if (result.atInfinity) return '';
  const v = Math.abs(result.v);
  const side = (type === 'concave-mirror' || type === 'convex-mirror')
    ? (result.isReal ? 'in front of mirror' : 'behind mirror')
    : (result.isReal ? 'on opposite side of lens' : 'on same side as object');
  return `Image is ${v.toFixed(1)} cm ${side}`;
}
