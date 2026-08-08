import { useState, ReactNode, useMemo, useEffect } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import OpticsCanvas, { computeImage, computeRays } from './OpticsCanvas';
import type { OpticsType, OpticsConfig, ImageResult } from './OpticsCanvas';
import { 
  BookOpen, 
  ChevronLeft,
  ChevronRight, 
  Zap, 
  Info,
  Compass,
  FileText,
  Bookmark,
  Award,
  Layers,
  HelpCircle,
  Printer,
  Download,
  X,
  ExternalLink,
  Check
} from 'lucide-react';

interface LearnOpticsProps {
  preparingFor?: '8th' | '9th' | '10th' | '11th' | '12th';
  onLoadSimulator: (params: {
    group: 'mirror' | 'lens';
    type: OpticsType;
    objectDist: number;
    focalLength: number;
    objectHeight: number;
    objectType: 'arrow' | 'point';
  }) => void;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
  isLightMode?: boolean;
}

const Fraction = ({ num, den }: { num: ReactNode; den: ReactNode }) => (
  <span className="inline-inline-flex inline-flex flex-col justify-center items-center text-center font-sans text-current font-bold" style={{ verticalAlign: 'middle', margin: '0 4px', lineHeight: '1.0' }}>
    <span className="block pb-[1px]" style={{ fontSize: '14.5px', fontWeight: 'bold', borderBottom: '1.5px solid currentColor', width: '100%', minWidth: '12px', textAlign: 'center' }}>
      {num}
    </span>
    <span className="block pt-[1px]" style={{ fontSize: '14.5px', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
      {den}
    </span>
  </span>
);

// Shared concave-mirror scaffold (axis, mirror arc, P/C/F points) reused by the four ray-tracing rule diagrams.
// Geometry: Pole P=(222,100), Focus F=(147,100), Centre C=(72,100), on principal axis y=100.
// Shared concave-mirror scaffold. Geometry: Pole P=(240,100) is the DEEPEST point (farthest from the
// object, which sits at small x); the rim sits at x=223 (closer to the object); C=(90,100) and F=(165,100)
// sit in FRONT of the mirror, on the object's side. Mirror curve: x(y) = 223 + 17.34*(1-((y-100)/70)^2).
const ConcaveMirrorBase = ({ isLightMode = false, children }: { isLightMode?: boolean; children: ReactNode }) => {
  const cAxis = isLightMode ? '#64748b' : '#475569';
  const cMirror = isLightMode ? '#334155' : '#f1f5f9';
  const cTick = isLightMode ? '#94a3b8' : '#64748b';
  const cPointStroke = isLightMode ? '#0f172a' : '#ffffff';
  const cC = isLightMode ? '#0369a1' : '#38bdf8';
  const cF = isLightMode ? '#a16207' : '#facc15';
  const cP = isLightMode ? '#334155' : '#e2e8f0';
  const backTicks = Array.from({ length: 15 }, (_, i) => {
    const y = 33 + i * 9.6;
    const dy = y - 100;
    const x = 223 + 17.34 * (1 - (dy / 70) * (dy / 70));
    return { x1: x, y1: y, x2: x + 6, y2: y + (dy < 0 ? -3 : 3) };
  });
  return (
    <svg width="100%" height="210" viewBox="0 0 300 200" className={`rounded-lg border max-w-[380px] transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b101d] border-slate-800'}`}>
      {/* Principal axis */}
      <line x1="10" y1="100" x2="290" y2="100" stroke={cAxis} strokeWidth="1" strokeDasharray="4 3" />
      <text x="285" y="112" fill={cAxis} fontSize="8" fontFamily="monospace" textAnchor="end">PRINCIPAL AXIS</text>

      {/* Reflective front surface -- bulges right, deepest point (Pole) is farthest from the object */}
      <path d="M 223,30 A 150,150 0 0,1 223,170" fill="none" stroke={cMirror} strokeWidth="3" strokeLinecap="round" />
      {/* Painted, non-reflective back */}
      {backTicks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={cTick} strokeWidth="1.2" />
      ))}
      <text x="212" y="22" fill={cMirror} fontSize="8.5" fontWeight="bold" textAnchor="middle">Reflective</text>

      {children}

      {/* C, F, P points -- drawn last so they sit above the rays */}
      <circle cx="90" cy="100" r="3.5" fill={cPointStroke} stroke={cC} strokeWidth="1.8" />
      <text x="90" y="88" fill={cC} fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">C</text>
      <circle cx="165" cy="100" r="3.5" fill={cPointStroke} stroke={cF} strokeWidth="1.8" />
      <text x="165" y="88" fill={cF} fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">F</text>
      <circle cx="240" cy="100" r="3.5" fill={cPointStroke} stroke={cP} strokeWidth="1.8" />
      <text x="240" y="88" fill={cP} fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">P</text>
    </svg>
  );
};

// Shared convex-mirror scaffold. Geometry: Pole P=(200,100) is the point CLOSEST to the object (mirror
// bulges toward the object); C=(305,100) and F=(252.5,100) are virtual, behind the mirror. Mirror curve:
// x(y) = 217 - 17.34*(1-((y-100)/70)^2).
const ConvexMirrorBase = ({ isLightMode = false, children }: { isLightMode?: boolean; children: ReactNode }) => {
  const cAxis = isLightMode ? '#64748b' : '#475569';
  const cMirror = isLightMode ? '#334155' : '#f1f5f9';
  const cTick = isLightMode ? '#94a3b8' : '#64748b';
  const cPointStroke = isLightMode ? '#0f172a' : '#ffffff';
  const cC = isLightMode ? '#0369a1' : '#38bdf8';
  const cF = isLightMode ? '#a16207' : '#facc15';
  const cP = isLightMode ? '#334155' : '#e2e8f0';
  const backTicks = Array.from({ length: 15 }, (_, i) => {
    const y = 33 + i * 9.6;
    const dy = y - 100;
    const x = 217 - 17.34 * (1 - (dy / 70) * (dy / 70));
    return { x1: x, y1: y, x2: x + 6, y2: y + (dy < 0 ? -3 : 3) };
  });
  return (
    <svg width="100%" height="210" viewBox="0 0 300 200" className={`rounded-lg border max-w-[380px] transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b101d] border-slate-800'}`}>
      {/* Principal axis */}
      <line x1="10" y1="100" x2="290" y2="100" stroke={cAxis} strokeWidth="1" strokeDasharray="4 3" />
      <text x="285" y="112" fill={cAxis} fontSize="8" fontFamily="monospace" textAnchor="end">PRINCIPAL AXIS</text>

      {/* Reflective front surface -- bulges left, Pole is the point closest to the object */}
      <path d="M 217,30 A 150,150 0 0,0 217,170" fill="none" stroke={cMirror} strokeWidth="3" strokeLinecap="round" />
      {/* Painted, non-reflective back */}
      {backTicks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={cTick} strokeWidth="1.2" />
      ))}
      <text x="195" y="22" fill={cMirror} fontSize="8.5" fontWeight="bold" textAnchor="middle">Reflective</text>

      {children}

      {/* F, C points (virtual, behind mirror) and P (real, on the mirror surface) */}
      <circle cx="252.5" cy="100" r="3.5" fill={cPointStroke} stroke={cF} strokeWidth="1.8" strokeDasharray="1.5,1.5" />
      <text x="252.5" y="88" fill={cF} fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">F</text>
      <circle cx="305" cy="100" r="3.5" fill={cPointStroke} stroke={cC} strokeWidth="1.8" strokeDasharray="1.5,1.5" />
      <text x="305" y="88" fill={cC} fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">C</text>
      <circle cx="200" cy="100" r="3.5" fill={cPointStroke} stroke={cP} strokeWidth="1.8" />
      <text x="200" y="88" fill={cP} fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">P</text>
      <text x="252.5" y="185" fill={cP} fontSize="7" fontStyle="italic" textAnchor="middle">F and C are virtual (behind the mirror)</text>
    </svg>
  );
};

type TopicId = 'light-em-spectrum' | 'light-nature' | 'reflection' | 'spherical-mirrors' | 'image-formation-mirrors' | 'ray-rules' | 'sign-convention' | 'refraction' | 'prism-refraction' | 'light-phenomena' | 'lenses' | 'lens-formulas' | 'lens-power' | 'combined-lenses' | 'thick-lenses' | 'human-eye' | 'regular-diffused' | 'multiple-reflection' | 'braille';

export const MIRROR_CASES = [
  { label: 'At Infinity',    type: 'concave-mirror' as const, u: 9999, f: 100, hideObject: true, desc: 'Incoming parallel rays meet exactly at Focus (F). Image is real, inverted, and extremely diminished (point-sized).',
    theory: 'Rays from an object infinitely far away are effectively parallel to the principal axis by the time they reach the mirror. Every parallel ray obeys Ray 1 (parallel-to-axis reflects through F), so all of them converge at exactly one point: the focus. This is precisely how a concave mirror concentrates sunlight -- rays from the (essentially infinite) Sun converge at F, and this is the principle used in solar cookers and furnaces.' },
  { label: 'Beyond C',       type: 'concave-mirror' as const, u: 280,  f: 100, desc: 'Object placed beyond C. Image is formed between C & F, and is real, inverted, and diminished.',
    theory: 'As the object moves in from infinity to just beyond C, the image (which started as a point at F) begins to grow and moves outward from F toward C, but always stays closer to the mirror than the object and between C and F. Since the object is still farther than C, the image remains smaller than the object.' },
  { label: 'At C',           type: 'concave-mirror' as const, u: 200,  f: 100, desc: 'Object placed exactly at Center of Curvature C. Image is formed at C, and is real, inverted, and equal in size.',
    theory: 'This is the one special crossover point: object and image coincide at C, and the image is exactly the same size as the object (magnification = -1). Move the object even slightly closer than C and the image becomes larger than the object; move it farther and the image becomes smaller. This makes "object at C" the dividing line between magnified and diminished real images.' },
  { label: 'Bet. C & F',     type: 'concave-mirror' as const, u: 140,  f: 100, desc: 'Object between C & F. Image is formed beyond C, and is real, inverted, and magnified.',
    theory: 'Now the object is closer to the mirror than C, so its image forms even farther away, beyond C -- and because the image distance now exceeds the object distance, the image is magnified (larger than the object). This is the working principle behind reflecting telescopes, which use a concave mirror to capture and magnify light from distant, dim objects.' },
  { label: 'At F',           type: 'concave-mirror' as const, u: 100,  f: 100, desc: 'Object placed at Focus. Reflected rays emerge parallel. Image is formed at infinity.',
    theory: 'This is the exact reverse of the "object at infinity" case (light paths are always reversible). Every ray that leaves the object at F and strikes the mirror emerges parallel to the axis, so the reflected rays never converge at any finite distance -- the image is said to form "at infinity." This is exactly how a searchlight, car headlight, or torch works: the bulb is placed at F so the mirror sends out a powerful parallel beam.' },
  { label: 'Bet. F & P',     type: 'concave-mirror' as const, u: 60,   f: 100, desc: 'Object inside Focus. Image is formed behind the mirror, and is virtual, erect, and magnified.',
    theory: 'Once the object moves inside F, the reflected rays diverge after striking the mirror and never actually meet in front of it -- they only appear to meet if extended backward, behind the mirror. This produces a virtual image (uncatchable on a screen), which is always erect and magnified in this zone. This is exactly why concave mirrors are used as shaving and makeup mirrors: keep your face within the focal length and you get a large, upright reflection.' },
  { label: 'Convex: At Infinity', type: 'convex-mirror' as const, u: 9999, f: 100, hideObject: true, desc: 'Parallel rays from infinity reflect and appear to diverge from Focus (F) behind mirror. Image is virtual, erect, and highly diminished.',
    theory: 'A convex mirror always diverges (spreads apart) reflected rays, regardless of how far away the object is. Parallel rays from a very distant object reflect outward as if they are coming from the focus point behind the mirror, so the image appears to form there -- tiny, upright, and virtual.' },
  { label: 'Convex: In Front', type: 'convex-mirror' as const, u: 200, f: 100, desc: 'Object anywhere between infinity and Pole P. Image is formed behind the mirror, and is virtual, erect, and diminished.',
    theory: 'This is the single defining property of convex mirrors: no matter where the object is placed -- near or far -- the image is always virtual, always erect, and always smaller than the object, forming somewhere between the pole and the focus behind the mirror. This constant, predictable, wide-field behaviour is exactly why convex mirrors are used for vehicle rear-view mirrors and shop security mirrors: they always show a smaller, upright view covering a much wider area than a plane mirror could.' },
];

export const LENS_CASES = [
  { label: 'At Infinity',        type: 'convex-lens' as const, u: 9999, f: 100, hideObject: true, desc: 'Parallel rays refract to meet at F₂. Image is real, inverted, and point-sized.' },
  { label: 'Beyond 2F₁',        type: 'convex-lens' as const, u: 280,  f: 100, desc: 'Object placed beyond 2F₁. Image is formed between F₂ and 2F₂, and is real, inverted, and diminished.' },
  { label: 'At 2F₁',            type: 'convex-lens' as const, u: 200,  f: 100, desc: 'Object placed at 2F₁. Image is formed exactly at 2F₂, and is real, inverted, and equal in size.' },
  { label: 'Bet. F₁ & 2F₁',     type: 'convex-lens' as const, u: 140,  f: 100, desc: 'Object between F₁ & 2F₁. Image is formed beyond 2F₂, and is real, inverted, and magnified.' },
  { label: 'At F₁',             type: 'convex-lens' as const, u: 100,  f: 100, desc: 'Object placed at Focus F₁. Refracted rays emerge parallel and meet at infinity.' },
  { label: 'Bet. O & F₁',       type: 'convex-lens' as const, u: 60,   f: 100, desc: 'Object inside Focus. Refracted rays diverge. Dashed rays extend back to form a virtual, erect, and magnified image.' },
  { label: 'Concave: At Infinity', type: 'concave-lens' as const, u: 9999, f: 100, hideObject: true, desc: 'Parallel rays of light from infinity refract to diverge, appearing to meet at focus F₁ on the same side. Image is virtual, erect, and highly diminished.' },
  { label: 'Concave: In Front', type: 'concave-lens' as const, u: 200,  f: 100, desc: 'Object placed anywhere in front of concave lens. Image is virtual, erect, diminished, and formed between F₁ and optical center O.' },
];

// Collision-free label offsets [dx, dy] for the F/C/A/B/A'/B' text labels in each
// spherical-mirror ray-diagram case, keyed by object distance (u). Each offset was
// found by exhaustively searching for a nearby spot clear of every ray line and every
// other label in that specific case -- ray geometry differs too much case-to-case for
// one fixed offset to avoid every collision everywhere.
const MIRROR_LABEL_OFFSETS: Record<string, Record<number, Partial<Record<'F' | 'C' | 'A' | 'B' | "A'" | "B'", [number, number]>>>> = {
  'concave-mirror': {
    9999: { F: [-4, -4], C: [0, -4], "B'": [-18, -4], "A'": [0, 27] },
    280: { F: [0, -4], C: [4, -4], A: [0, -4], B: [4, 12], "A'": [0, 12], "B'": [0, -4] },
    200: { F: [0, -6], C: [-4, -4], A: [0, -4], B: [-14, -6], "A'": [-14, -4], "B'": [14, 0] },
    140: { F: [0, -4], C: [-4, -4], A: [-4, -4], B: [-8, 0], "A'": [-14, -4], "B'": [0, -4] },
    100: { F: [-4, 12], C: [0, -4], A: [0, -4], B: [-8, -4] },
    60: { F: [2, 10], C: [0, -4], A: [0, -4], B: [0, 10], "A'": [0, -4], "B'": [0, 10] },
  },
  'convex-mirror': {
    9999: { F: [0, -4], C: [0, 12] },
    200: { F: [0, -10], C: [0, 10], A: [0, -4], B: [0, 10], "A'": [4, -4], "B'": [8, 10] },
  },
};

function getMirrorLabelOffset(type: string, u: number, label: 'F' | 'C' | 'A' | 'B' | "A'" | "B'"): [number, number] {
  return MIRROR_LABEL_OFFSETS[type]?.[u]?.[label] ?? [0, 0];
}

// Collision-free label offsets [dx, dy] for the F1/2F1/F2/2F2/O/A'/B' text labels in each
// spherical-lens ray-diagram case, keyed by object distance (u), found the same way as
// MIRROR_LABEL_OFFSETS -- exhaustively searching for a nearby spot clear of every ray line,
// the lens body, and every other label in that specific case.
const LENS_LABEL_OFFSETS: Record<string, Record<number, Partial<Record<'F1' | '2F1' | 'F2' | '2F2' | 'A' | "A'" | "B'" | 'atInfinityText', [number, number]>>>> = {
  'convex-lens': {
    9999: { F1: [-1, 9], '2F1': [-1, 9], F2: [-11, 5], '2F2': [11, -5], "B'": [-21, 7] },
    280: { F2: [-1, 3], '2F2': [-7, 15] },
    200: { F2: [-1, 5], '2F2': [9, -1] },
    140: { F2: [-3, 9], '2F2': [3, -3] },
    100: { F2: [-1, -3], '2F2': [3, -3], atInfinityText: [0, 35] },
    60: { '2F2': [3, -3], "B'": [-1, 3], A: [-1, 1] },
  },
  'concave-lens': {
    9999: { F1: [-11, 9], '2F1': [-1, 9], "A'": [-1, -3], "B'": [-11, -7] },
    200: { F2: [-1, 5], '2F2': [-1, -3], "B'": [-1, 3], A: [2, -11] },
  },
};

function getLensLabelOffset(type: string, u: number, label: 'F1' | '2F1' | 'F2' | '2F2' | 'A' | "A'" | "B'" | 'atInfinityText'): [number, number] {
  return LENS_LABEL_OFFSETS[type]?.[u]?.[label] ?? [0, 0];
}

export function DynamicRayDiagram({
  type,
  u,
  f,
  onLoadSimulator,
  isLightMode = false
}: {
  type: 'concave-mirror' | 'convex-mirror' | 'convex-lens' | 'concave-lens';
  u: number;
  f: number;
  onLoadSimulator?: any;
  isLightMode?: boolean;
}) {
  const cLabel = isLightMode ? '#1e293b' : '#f1f5f9';
  const cBodyStroke = isLightMode ? '#1e293b' : '#cbd5e1';
  const cGrid = isLightMode ? '#94a3b8' : '#64748b';
  const isMirror = type.endsWith('mirror');
  const size = { w: 420, h: 220 };
  const cx = 210;
  const cy = 110;
  
  // Custom scales for clean printing layouts
  const scaleX = 0.50;
  const scaleY = 0.50;
  
  const fCanvas = f * scaleX; 
  const uCanvas = u === 9999 ? 9999 : u * scaleX;
  const hCanvas = 40 * scaleY;
  
  // Compute image details safely
  const res = computeImage({
    type,
    focalLength: f,
    objectDist: u === 9999 ? 9999 : u,
    objectHeight: 40
  });
  
  const vCanvas = res.v * scaleX;
  const ihCanvas = res.imageHeight * scaleY;

  const toX = (x: number) => cx + x;
  const toY = (y: number) => cy - y;

  // Mirror curve offset (canvas units) at a given absolute canvas y -- matches the exact
  // getMirrorX() formula used by computeRays() in OpticsCanvas.tsx (bulge=40, aperture=150),
  // so every ray computed by the physics engine touches this exact drawn curve, never before or after it.
  const MIRROR_APERTURE = 150;
  const mirrorBulgeSign = type === 'concave-mirror' ? 1 : type === 'convex-mirror' ? -1 : 0;
  const mirrorCurveX = (yCanvasAbs: number) => {
    const py = (cy - yCanvasAbs) / scaleY;
    return mirrorBulgeSign * 20 * scaleX * (1 - (py / MIRROR_APERTURE) ** 2);
  };

  const arrowMarkerId = `diagram-arrow-${type}-${u}`;

  // Physics-accurate ray calculation for finite cases
  const rays = u === 9999 ? [] : computeRays(
    { type, focalLength: f, objectDist: u, objectHeight: 40 },
    res,
    150 // aperture limit
  );

  // Filter rays to select 2 valid rays for standard representation
  const objX = -u;
  const objY = 40;
  const aperture = 150;

  let isGroup1Valid = true;
  let isGroup2Valid = true;
  let isGroup3Valid = true;

  if (isMirror) {
    const fSigned = type === 'concave-mirror' ? -f : f;
    const cX = 2 * fSigned;
    const fX = fSigned;

    // Ray 2 (C-ray)
    const hitY2 = (Math.abs(objX - cX) < 0.1) ? objY : cX * objY / (cX - objX);
    isGroup2Valid = Math.abs(hitY2) <= aperture;

    // Ray 3 (F-ray)
    const hitY3 = (Math.abs(objX - fX) < 0.1) ? objY : fX * objY / (fX - objX);
    isGroup3Valid = Math.abs(hitY3) <= aperture;
  } else {
    // Lens
    const fValue = type === 'convex-lens' ? -f : f;
    const fX = fValue;

    // Ray 3 (F-ray)
    const hitY3 = (Math.abs(objX - fX) < 0.1) ? objY : fX * objY / (fX - objX);
    isGroup3Valid = Math.abs(hitY3) <= aperture;
  }

  let ray1 = rays.find(r => r.group === 1);
  let ray2Candidate: any = null;

  if (isMirror) {
    // For mirrors, prefer: 1. C-ray (Group 2), 2. F-ray (Group 3), 3. Pole-ray (Group 4, guaranteed)
    if (isGroup2Valid && Math.abs(u - 2 * f) > 5) {
      ray2Candidate = rays.find(r => r.group === 2);
    }
    if (!ray2Candidate && isGroup3Valid && Math.abs(u - f) > 5) {
      ray2Candidate = rays.find(r => r.group === 3);
    }
    if (!ray2Candidate) {
      ray2Candidate = rays.find(r => r.group === 4);
    }
  } else {
    // For lenses, prefer: 1. O-ray (Group 2, guaranteed), 2. F-ray (Group 3), 3. Oblique-ray (Group 4)
    ray2Candidate = rays.find(r => r.group === 2);
    if (!ray2Candidate && isGroup3Valid && Math.abs(u - f) > 5) {
      ray2Candidate = rays.find(r => r.group === 3);
    }
    if (!ray2Candidate) {
      ray2Candidate = rays.find(r => r.group === 4);
    }
  }

  // Choose both solid and virtual segments of chosen groups
  const chosenGroups: number[] = [1];
  if (ray2Candidate) {
    chosenGroups.push(ray2Candidate.group);
  }

  let activeRays = rays.filter(r => chosenGroups.includes(r.group));

  // Fallback if filtering is empty
  if (activeRays.length === 0 && rays.length > 0) {
    activeRays = rays.slice(0, 2);
  }

  // Determine corrected image coordinates and height for point/extended cases
  let finalVCanvas = vCanvas;
  let finalIhCanvas = ihCanvas;

  if (u === 9999) {
    // Point-size image at focus F
    if (type === 'concave-mirror') {
      finalVCanvas = -fCanvas;
      finalIhCanvas = 0; // True point-sized image -- rays converge exactly on the axis at F
    } else if (type === 'convex-mirror') {
      finalVCanvas = fCanvas;
      finalIhCanvas = 0; // True point-sized image -- rays appear to diverge from exactly on the axis at F
    } else if (type === 'convex-lens') {
      finalVCanvas = fCanvas;
      finalIhCanvas = 0; // True point-sized image -- rays converge exactly on the axis at F
    } else if (type === 'concave-lens') {
      finalVCanvas = -fCanvas;
      finalIhCanvas = 0; // True point-sized image -- rays appear to diverge from exactly on the axis at F
    }
  }

  // Map ray points into the 420x220 canvas coordinates exactly as computed by the physics engine --
  // no snapping or bending. This matches how the interactive Ray Optica simulator (OpticsCanvas)
  // renders the identical computeRays() output: every ray is drawn obeying its own reflection rule
  // exactly (parallel-to-axis through F, through the centre of curvature retracing itself, through
  // the pole with mirror symmetry), and the image arrow is drawn separately at the analytically
  // exact position from computeImage(). Forcing a ray's endpoint to the image point -- even just the
  // "parallel" ray -- bends it off its own correct path, which is never acceptable in a ray diagram.
  const mappedRays = activeRays.map(ray => ({
    points: ray.points.map(([px, py]: [number, number]) => [
      cx + px * scaleX,
      cy - py * scaleY
    ]),
    dashed: ray.dashed,
    group: ray.group
  }));

  // The image forms exactly where the two shown rays (or their imaginary backward extensions, for
  // a virtual image) actually cross -- so derive the drawn image position from that true geometric
  // intersection rather than from the separate mirror/lens-formula position. The two calculations
  // agree exactly in the paraxial limit; for a ray that strikes the mirror well off-axis the exact
  // curved-surface geometry departs slightly from the paraxial formula (ordinary spherical
  // aberration), and using the formula position here would show the image sitting off of where the
  // rays that are supposed to construct it actually meet -- which is the one thing a construction
  // diagram must never do.
  let imgCanvasX = cx + finalVCanvas;
  let imgCanvasY = cy - finalIhCanvas;
  if (!res.atInfinity && mappedRays.length >= 2) {
    const convergentSegment = (group: number): [[number, number], [number, number]] | null => {
      const isVirtualImg = !res.isReal;
      const ray = mappedRays.find(r => r.group === group && r.dashed === isVirtualImg);
      if (!ray || ray.points.length < 2) return null;
      if (isVirtualImg) {
        // dashed backward-construction ray: exactly 2 points, [hitPoint, farPoint]
        return [ray.points[0] as [number, number], ray.points[ray.points.length - 1] as [number, number]];
      }
      // solid real-path ray: [obj, hitPoint, farPoint] -- use the reflected/refracted half only
      const start = ray.points.length >= 3 ? ray.points[1] : ray.points[0];
      const end = ray.points[ray.points.length - 1];
      return [start as [number, number], end as [number, number]];
    };
    const groups = Array.from(new Set(mappedRays.map(r => r.group)));
    if (groups.length >= 2) {
      const segA = convergentSegment(groups[0]);
      const segB = convergentSegment(groups[1]);
      if (segA && segB) {
        const [[ax1, ay1], [ax2, ay2]] = segA;
        const [[bx1, by1], [bx2, by2]] = segB;
        const denom = (ax1 - ax2) * (by1 - by2) - (ay1 - ay2) * (bx1 - bx2);
        if (Math.abs(denom) > 1e-6) {
          const t = ((ax1 - bx1) * (by1 - by2) - (ay1 - by1) * (bx1 - bx2)) / denom;
          imgCanvasX = ax1 + t * (ax2 - ax1);
          imgCanvasY = ay1 + t * (ay2 - ay1);
        }
      }
    }
  }

  return (
    <svg viewBox="0 0 420 220" className={`w-full h-auto rounded-xl shadow-sm transition-colors duration-300 print:border-slate-300 print:bg-white ${isLightMode ? 'bg-white border border-slate-200 text-slate-900' : 'bg-[#0b101d] border border-slate-800 text-slate-100'}`}>
      <defs>
        <marker id={arrowMarkerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
        </marker>
        <marker id={`${arrowMarkerId}-ray1`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
        </marker>
        <marker id={`${arrowMarkerId}-ray2`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669" />
        </marker>
        <marker id={`${arrowMarkerId}-obj`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
        </marker>
        <marker id={`${arrowMarkerId}-img`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669" />
        </marker>
      </defs>

      {/* Ground level reference axis line */}
      <line x1="10" y1={cy} x2="410" y2={cy} stroke={cGrid} strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Focus & Center Points */}
      {type === 'concave-mirror' && (
        <>
          <circle cx={toX(-fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(-fCanvas) + getMirrorLabelOffset(type, u, 'F')[0]} y={cy + getMirrorLabelOffset(type, u, 'F')[1]} fontSize="9" fontWeight="extrabold" fill={cLabel} textAnchor="middle">F</text>

          <circle cx={toX(-2 * fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(-2 * fCanvas) + getMirrorLabelOffset(type, u, 'C')[0]} y={cy + getMirrorLabelOffset(type, u, 'C')[1]} fontSize="9" fontWeight="extrabold" fill={cLabel} textAnchor="middle">C</text>

          <circle cx={toX(mirrorCurveX(cy))} cy={cy} r="3.5" fill={cLabel} />
        </>
      )}

      {type === 'convex-mirror' && (
        <>
          <circle cx={toX(fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(fCanvas) + getMirrorLabelOffset(type, u, 'F')[0]} y={cy + getMirrorLabelOffset(type, u, 'F')[1]} fontSize="9" fontWeight="extrabold" fill={cLabel} textAnchor="middle">F</text>

          <circle cx={toX(2 * fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(2 * fCanvas) + getMirrorLabelOffset(type, u, 'C')[0]} y={cy + getMirrorLabelOffset(type, u, 'C')[1]} fontSize="9" fontWeight="extrabold" fill={cLabel} textAnchor="middle">C</text>

          <circle cx={toX(mirrorCurveX(cy))} cy={cy} r="3.5" fill={cLabel} />
        </>
      )}

      {type === 'convex-lens' && (
        <>
          <circle cx={toX(-fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(-fCanvas) + getLensLabelOffset(type, u, 'F1')[0]} y={cy + 18 + getLensLabelOffset(type, u, 'F1')[1]} fontSize="11" fontWeight="extrabold" fill={cLabel} textAnchor="middle">F₁</text>
          <circle cx={toX(-2 * fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(-2 * fCanvas) + getLensLabelOffset(type, u, '2F1')[0]} y={cy + 18 + getLensLabelOffset(type, u, '2F1')[1]} fontSize="11" fontWeight="extrabold" fill={cLabel} textAnchor="middle">2F₁</text>

          <circle cx={toX(fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(fCanvas) + getLensLabelOffset(type, u, 'F2')[0]} y={cy + 18 + getLensLabelOffset(type, u, 'F2')[1]} fontSize="11" fontWeight="extrabold" fill={cLabel} textAnchor="middle">F₂</text>
          <circle cx={toX(2 * fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(2 * fCanvas) + getLensLabelOffset(type, u, '2F2')[0]} y={cy + 18 + getLensLabelOffset(type, u, '2F2')[1]} fontSize="11" fontWeight="extrabold" fill={cLabel} textAnchor="middle">2F₂</text>

          <circle cx={toX(0)} cy={cy} r="3.5" fill={cLabel} />
          <text x={toX(0)} y="200" fontSize="11" fontWeight="extrabold" fill={cLabel} textAnchor="middle">O</text>
        </>
      )}

      {type === 'concave-lens' && (
        <>
          <circle cx={toX(-fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(-fCanvas) + getLensLabelOffset(type, u, 'F1')[0]} y={cy + 18 + getLensLabelOffset(type, u, 'F1')[1]} fontSize="11" fontWeight="extrabold" fill={cLabel} textAnchor="middle">F₁</text>
          <circle cx={toX(-2 * fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(-2 * fCanvas) + getLensLabelOffset(type, u, '2F1')[0]} y={cy + 18 + getLensLabelOffset(type, u, '2F1')[1]} fontSize="11" fontWeight="extrabold" fill={cLabel} textAnchor="middle">2F₁</text>

          <circle cx={toX(fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(fCanvas) + getLensLabelOffset(type, u, 'F2')[0]} y={cy + 18 + getLensLabelOffset(type, u, 'F2')[1]} fontSize="11" fontWeight="extrabold" fill={cLabel} textAnchor="middle">F₂</text>
          <circle cx={toX(2 * fCanvas)} cy={cy} r="3" fill="#2563eb" />
          <text x={toX(2 * fCanvas) + getLensLabelOffset(type, u, '2F2')[0]} y={cy + 18 + getLensLabelOffset(type, u, '2F2')[1]} fontSize="11" fontWeight="extrabold" fill={cLabel} textAnchor="middle">2F₂</text>

          <circle cx={toX(0)} cy={cy} r="3.5" fill={cLabel} />
          <text x={toX(0)} y="200" fontSize="11" fontWeight="extrabold" fill={cLabel} textAnchor="middle">O</text>
        </>
      )}

      {/* Mirror body / Lens body */}
      {isMirror ? (
        <>
          {/* Reflective front surface -- highlighted in blue to mark the silvered, light-facing side.
              Sampled directly from mirrorCurveX() so it exactly matches wherever the physics engine's
              rays actually strike the mirror -- never before or after this drawn surface. */}
          {(() => {
            const steps = 30;
            const curvePts = Array.from({ length: steps + 1 }, (_, i) => {
              const y = 40 + (i * 140) / steps;
              return [toX(mirrorCurveX(y)), y];
            });
            const curveD = curvePts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x},${y}`).join(' ');
            return <path d={curveD} fill="none" stroke="#2563eb" strokeWidth="4.5" strokeLinecap="round" />;
          })()}

          {/* Painted, non-reflective back -- hatch marks directly on the single mirror surface, coloured red to match the CBSE "red-lead paint" backing convention */}
          {(() => {
            const pts = Array.from({ length: 15 }, (_, i) => {
              const h = 40 + i * 10;
              return [toX(mirrorCurveX(h)), h];
            });
            return (
              <>
                {pts.slice(0, -1).map(([x, y], i) => (
                  <line key={i} x1={x} y1={y} x2={x + 7} y2={y + 6} stroke="#dc2626" strokeWidth="1.3" opacity="0.85" />
                ))}
              </>
            );
          })()}
        </>
      ) : (
        <>
          {type === 'convex-lens' ? (
            <path d={`M ${toX(0)},40 Q ${toX(15)},${cy} ${toX(0)},180 Q ${toX(-15)},${cy} ${toX(0)},40`} fill="rgba(147,197,253,0.25)" stroke={cBodyStroke} strokeWidth="2.5" />
          ) : (
            <path d={`M ${toX(-12)},40 Q ${toX(0)},${cy} ${toX(-12)},180 L ${toX(12)},180 Q ${toX(0)},${cy} ${toX(12)},40 Z`} fill="rgba(147,197,253,0.25)" stroke={cBodyStroke} strokeWidth="2.5" />
          )}
        </>
      )}

      {/* ── DRAW RAYS AND OBJECTS ── */}
      {uCanvas === 9999 ? (
        /* Parallel Infinite Rays */
        <>
          {/* Incoming Parallel Rays (Incident) */}
          {[30, 15, -15, -30].map((yVal, idx) => {
            const startX = toX(-200);
            const midX = toX(-100);
            const renderY = toY(yVal);
            const endX = isMirror ? toX(mirrorCurveX(renderY)) : toX(0);
            return (
              <g key={`inc-inf-${idx}`}>
                <line
                  x1={startX}
                  y1={renderY}
                  x2={midX}
                  y2={renderY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  markerEnd={`url(#${arrowMarkerId}-ray1)`}
                />
                <line
                  x1={midX}
                  y1={renderY}
                  x2={endX}
                  y2={renderY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* Reflected/Refracted Rays converging/diverging */}
          {type === 'concave-mirror' && [30, 15, -15, -30].map((yVal, idx) => {
            const startY = toY(yVal);
            const startX = toX(mirrorCurveX(startY));
            const endX = toX(-fCanvas);
            const endY = toY(0);
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;
            return (
              <g key={`ref-inf-${idx}`}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={midX}
                  y2={midY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  markerEnd={`url(#${arrowMarkerId}-ray1)`}
                />
                <line
                  x1={midX}
                  y1={midY}
                  x2={endX}
                  y2={endY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {type === 'convex-mirror' && [30, 15, -15, -30].map((yVal, idx) => {
            const startY = toY(yVal);
            const startX = toX(mirrorCurveX(startY));
            const endX = toX(-100);
            const endY = toY(yVal + 100 * (yVal / fCanvas));
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;
            return (
              <g key={`ref-inf-${idx}`}>
                <line x1={startX} y1={startY} x2={toX(fCanvas)} y2={toY(0)} stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="3 3" />
                <line
                  x1={startX}
                  y1={startY}
                  x2={midX}
                  y2={midY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  markerEnd={`url(#${arrowMarkerId}-ray1)`}
                />
                <line
                  x1={midX}
                  y1={midY}
                  x2={endX}
                  y2={endY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {type === 'convex-lens' && [30, 15, -15, -30].map((yVal, idx) => {
            const startX = toX(0);
            const startY = toY(yVal);
            const endX = toX(180);
            const endY = toY(-yVal * (180 / fCanvas - 1));
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;
            return (
              <g key={`ref-inf-${idx}`}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={midX}
                  y2={midY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  markerEnd={`url(#${arrowMarkerId}-ray1)`}
                />
                <line
                  x1={midX}
                  y1={midY}
                  x2={endX}
                  y2={endY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {type === 'concave-lens' && [30, 15, -15, -30].map((yVal, idx) => {
            const startX = toX(0);
            const startY = toY(yVal);
            const endX = toX(140);
            const endY = toY(yVal * (140 / fCanvas + 1));
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;
            return (
              <g key={`ref-inf-${idx}`}>
                <line x1={toX(0)} y1={startY} x2={toX(-fCanvas)} y2={toY(0)} stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="3 3" />
                <line
                  x1={startX}
                  y1={startY}
                  x2={midX}
                  y2={midY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  markerEnd={`url(#${arrowMarkerId}-ray1)`}
                />
                <line
                  x1={midX}
                  y1={midY}
                  x2={endX}
                  y2={endY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* Real or Imaginary Image of Object at focus when rays meet */}
          {isMirror ? (
            /* Point-sized image -- a dot, not an arrow, since m -> 0 at u = infinity */
            <circle cx={toX(finalVCanvas)} cy={toY(0)} r="3" fill="#059669" />
          ) : (
            <line
              x1={toX(finalVCanvas)}
              y1={toY(0)}
              x2={toX(finalVCanvas)}
              y2={toY(finalIhCanvas)}
              stroke="#059669"
              strokeWidth="2"
              strokeDasharray={type === 'concave-lens' ? "3 2" : "none"}
              markerEnd={`url(#${arrowMarkerId}-img)`}
            />
          )}
          {!isMirror && (
            <>
              <text x={(isMirror ? toX(finalVCanvas) + getMirrorLabelOffset(type, u, "A'")[0] : toX(finalVCanvas)) + getLensLabelOffset(type, u, "A'")[0]} y={(isMirror ? toY(finalIhCanvas) + getMirrorLabelOffset(type, u, "A'")[1] : toY(finalIhCanvas + (finalIhCanvas < 0 ? -16 : 16))) + getLensLabelOffset(type, u, "A'")[1]} fontSize="9" fontWeight="extrabold" fill="#059669" textAnchor="middle">
                {type === 'convex-lens' ? "A' (Real)" : "A' (Virtual)"}
              </text>
              <text x={(isMirror ? toX(finalVCanvas) + getMirrorLabelOffset(type, u, "B'")[0] : toX(finalVCanvas)) + getLensLabelOffset(type, u, "B'")[0]} y={(isMirror ? toY(0) + getMirrorLabelOffset(type, u, "B'")[1] : toY(-18)) + getLensLabelOffset(type, u, "B'")[1]} fontSize="9" fontWeight="extrabold" fill="#059669" textAnchor="middle">B'</text>
            </>
          )}
        </>
      ) : (
        /* Normal Object Construction Rays */
        <>
          {/* Object arrow */}
          <line x1={toX(-uCanvas)} y1={toY(0)} x2={toX(-uCanvas)} y2={toY(hCanvas)} stroke="#d97706" strokeWidth="2" markerEnd={`url(#${arrowMarkerId}-obj)`} />

          {/* Render beautifully calculated construction rays */}
          {mappedRays.map((ray, rayIdx) => {
            const isDashed = ray.dashed;
            const strokeColor = ray.group === 1 ? '#2563eb' : '#059669'; // Ray 1: blue, other ray: green/emerald
            const strokeWidth = isDashed ? '1.2' : '1.5';
            
            return (
              <g key={`ray-${ray.group}-${rayIdx}`}>
                {ray.points.slice(0, -1).map((pt: any, i: number) => {
                  const nextPt = ray.points[i + 1];
                  
                  if (isDashed) {
                    return (
                      <line
                        key={i}
                        x1={pt[0]}
                        y1={pt[1]}
                        x2={nextPt[0]}
                        y2={nextPt[1]}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray="2.5 2.5"
                      />
                    );
                  } else {
                    const midX = (pt[0] + nextPt[0]) / 2;
                    const midY = (pt[1] + nextPt[1]) / 2;
                    return (
                      <g key={i}>
                        <line
                          x1={pt[0]}
                          y1={pt[1]}
                          x2={midX}
                          y2={midY}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          markerEnd={`url(#${arrowMarkerId}-ray${ray.group === 1 ? '1' : '2'})`}
                        />
                        <line
                          x1={midX}
                          y1={midY}
                          x2={nextPt[0]}
                          y2={nextPt[1]}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                        />
                      </g>
                    );
                  }
                })}
              </g>
            );
          })}

          {/* Image Arrow */}
          {res.atInfinity ? (
            /* No image marker -- per NCERT phrasing, object at F simply forms no image (rays emerge parallel and never converge) */
            null
          ) : (
            <line
              x1={imgCanvasX}
              y1={cy}
              x2={imgCanvasX}
              y2={imgCanvasY}
              stroke="#059669"
              strokeWidth="2"
              strokeDasharray={res.isReal ? "none" : "3 2"}
              markerEnd={`url(#${arrowMarkerId}-img)`}
            />
          )}

          {/* Object & image labels -- displaced clear of the object tip / axis / image tip so they never sit on a ray */}
          <text x={toX(-uCanvas) + (isMirror ? getMirrorLabelOffset(type, u, 'A')[0] : -10 + getLensLabelOffset(type, u, 'A')[0])} y={toY(hCanvas) + (isMirror ? getMirrorLabelOffset(type, u, 'A')[1] : 2 + getLensLabelOffset(type, u, 'A')[1])} fontSize="9" fontWeight="extrabold" fill="#d97706" textAnchor={isMirror ? 'middle' : 'end'}>A</text>
          <text x={toX(-uCanvas) + (isMirror ? getMirrorLabelOffset(type, u, 'B')[0] : -10)} y={toY(0) + (isMirror ? getMirrorLabelOffset(type, u, 'B')[1] : -3)} fontSize="9" fontWeight="extrabold" fill="#d97706" textAnchor={isMirror ? 'middle' : 'end'}>B</text>
          {!res.atInfinity && (
            <>
              <text x={imgCanvasX + (isMirror ? getMirrorLabelOffset(type, u, "A'")[0] : getLensLabelOffset(type, u, "A'")[0])} y={(isMirror ? imgCanvasY + getMirrorLabelOffset(type, u, "A'")[1] : toY(finalIhCanvas + (finalIhCanvas < 0 ? -20 : 20))) + (isMirror ? 0 : getLensLabelOffset(type, u, "A'")[1])} fontSize="9" fontWeight="extrabold" fill="#059669" textAnchor="middle">A'</text>
              {/* B' coincides exactly with B when the image forms at the same axis point as the object (e.g. concave mirror, object at C) -- labeling both is redundant */}
              {Math.abs(imgCanvasX - toX(-uCanvas)) >= 1 && (
                <text x={imgCanvasX + (isMirror ? getMirrorLabelOffset(type, u, "B'")[0] : getLensLabelOffset(type, u, "B'")[0])} y={(isMirror ? cy + getMirrorLabelOffset(type, u, "B'")[1] : toY(finalIhCanvas < 0 ? 8 : -8)) + (isMirror ? 0 : getLensLabelOffset(type, u, "B'")[1])} fontSize="9" fontWeight="extrabold" fill="#059669" textAnchor="middle">B'</text>
              )}
            </>
          )}
        </>
      )}

      {/* Pole label -- drawn last, positioned in the open space past the mirror's outer edge so it never sits on a ray, the mirror, or the axis */}
      {(type === 'concave-mirror' || type === 'convex-mirror') && (
        <text x={toX(mirrorCurveX(cy)) + 10} y={cy + 7} fontSize="9" fontWeight="extrabold" fill={cLabel}>P</text>
      )}
    </svg>
  );
}

const computeCaseDetails = (type: string, uVal: number, fVal: number) => {
  if (uVal === 9999) {
    const isMirror = type.endsWith('mirror');
    const isConcave = type.startsWith('concave');
    const vResult = isMirror 
      ? (isConcave ? -fVal : fVal)
      : (isConcave ? -fVal : fVal);
    return {
      v: vResult,
      isReal: isConcave && isMirror ? true : (isConcave ? false : !isMirror),
      m: 0,
      vStr: `At Focus F (${Math.abs(vResult)} cm)`,
      mStr: `m → 0 (Highly Diminished)`,
      mSign: isConcave && isMirror ? '-' : (type === 'convex-lens' ? '-' : '+'),
      mExpl: isConcave && isMirror 
        ? "Negative (-) sign representing a Real & Inverted point-sized image at the Focus." 
        : (type === 'convex-lens' 
          ? "Negative (-) sign representing a Real & Inverted point-sized image at the Focus (F₂)." 
          : "Positive (+) sign representing a Virtual & Erect point-sized image.")
    };
  }

  const uSign = -uVal;
  let fSign = 0;
  if (type === 'concave-mirror') fSign = -fVal;
  else if (type === 'convex-mirror') fSign = fVal;
  else if (type === 'convex-lens') fSign = fVal;
  else fSign = -fVal; // concave-lens

  let v = 0;
  const isMirror = type.endsWith('mirror');
  if (isMirror) {
    v = 1 / ((1 / fSign) - (1 / uSign));
  } else {
    v = 1 / ((1 / fSign) + (1 / uSign));
  }

  const m = isMirror ? -v / uSign : v / uSign;
  const mSign = m < 0 ? '-' : '+';

  return {
    v,
    isReal: isMirror ? (v < -0.1) : (v > 0.1),
    m,
    vStr: `${Math.abs(v).toFixed(1)} cm (${isMirror ? (v < 0 ? 'In front of mirror' : 'Behind mirror') : (v > 0 ? 'Opposite side / Right' : 'Same side / Left')})`,
    mStr: `m = ${m.toFixed(2)}x`,
    mSign,
    mExpl: `${m < 0 ? 'Negative (-)' : 'Positive (+)'} sign confirms the image is ${m < 0 ? 'Real & Inverted' : 'Virtual & Erect'}. Since |m| ${Math.abs(m) > 1.01 ? '> 1' : Math.abs(m) < 0.99 ? '< 1' : '= 1'}, the image is ${Math.abs(m) > 1.01 ? 'Magnified (enlarged)' : Math.abs(m) < 0.99 ? 'Diminished (reduced)' : 'Identical (same size as object)'}.`
  };
};

export const renderGradePdfNotes = (
  preparingFor: string,
  mirrorCaseIndex: number,
  setMirrorCaseIndex: (i: number) => void,
  lensCaseIndex: number,
  setLensCaseIndex: (i: number) => void,
  onLoadSimulator: any
) => {
  if (preparingFor === '8th' || preparingFor === '9th') {
    return (
      <div className="space-y-8 animate-fade-in" id="print-content-class-8">
        {/* UPPER HEADER BAR */}
        <div className="flex justify-between items-center text-[11px] sm:text-xs font-sans font-black text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2 whitespace-nowrap">
          <span className="shrink-0 text-left font-extrabold text-slate-500">NCERT Curiosity Curriculum</span>
          <span className="flex-1 text-center font-black text-slate-900 mx-4">Class VIII Science Revision Notes</span>
          <span className="shrink-0 text-right font-extrabold text-slate-500">Science Notes</span>
        </div>

        {/* Cover/Header Block */}
        <div className="border-b-[3px] border-slate-900 pb-6 text-center space-y-2">
          <h1 className="text-3xl font-sans font-black tracking-tight text-slate-900 uppercase">Light: Mirrors and Lenses</h1>
          <p className="text-xs uppercase font-sans tracking-widest font-black text-slate-500">NCERT Class VIII Curiosity Series — Revision Notes</p>
          <p className="text-sm italic text-slate-600">Complete, point-wise handbook covering spherical mirrors, lens physics, laws of reflection, and textbook activities.</p>
        </div>

        {/* SECTION 1: What Are Spherical Mirrors? */}
        <div className="space-y-4 print:break-inside-avoid">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900 flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs px-2 py-0.5 rounded">1</span>
            What Are Spherical Mirrors?
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li>
              <b>Definition:</b> A spherical mirror is a curved reflecting surface that can be considered as a part of an imaginary hollow glass sphere.
            </li>
            <li>
              <b>Spoon Exploration (Activity 10.1):</b> A shiny metallic spoon acts as an excellent, simple spherical mirror system:
              <ul className="list-[circle] pl-6 mt-1.5 space-y-1 text-xs text-slate-600 font-sans">
                <li><b>The Inner Curved Side (curves inwards):</b> Acts as a <i>concave mirror</i>. It forms an inverted image of your face. Moving the spoon slowly away changes its size.</li>
                <li><b>The Outer Curved Side (bulges outwards):</b> Acts as a <i>convex mirror</i>. It forms a smaller, up-right (erect) image of your face, regardless of distance.</li>
              </ul>
            </li>
            <li>
              <b>Two Basic Types of Mirrors:</b>
              <ul className="list-[circle] pl-6 mt-1.5 space-y-1.5 text-xs text-slate-600">
                <li><b>Concave Mirror:</b> A spherical mirror whose reflecting surface curves <i>inwards</i> (reflective coating like aluminum polished on the outer curved surface).</li>
                <li><b>Convex Mirror:</b> A spherical mirror whose reflecting surface bulges <i>outwards</i> (reflective coating polished on the inner curved surface).</li>
              </ul>
            </li>
            <li>
              <b>"A Step Further" (Textbook Box):</b> If a spherical mirror is cut out from a hollow glass sphere, then:
              <ul className="list-[circle] pl-6 mt-1 text-xs text-slate-600">
                <li>If the outer surface is coated with silver / reflecting coating, the inside surface is reflecting, forming a <b>concave mirror</b>.</li>
                <li>If the inner surface is coated with silver / reflecting coating, the outside surface is refracting/reflecting, forming a <b>convex mirror</b>.</li>
              </ul>
            </li>
          </ul>

          {/* Conceptual Slices */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-2xl my-3 print:break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 text-center">Spherical Mirror Geometries (NCERT "A Step Further" Model)</span>
            <svg viewBox="0 0 540 210" className="w-full max-w-[780px] h-auto bg-white rounded-xl border border-slate-200 p-2 shadow-2xs">
              <circle cx="270" cy="105" r="80" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 5" />
              <circle cx="270" cy="105" r="4" fill="#64748b" />
              <text x="270" y="122" fontSize="9.5" fontFamily="sans-serif" fill="#64748b" textAnchor="middle" fontWeight="bold">Center of Curvature (C)</text>
              
              {/* Radius Lines */}
              <line x1="270" y1="105" x2="214" y2="49" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <text x="245" y="70" fontSize="8" fill="#64748b" fontWeight="bold" textAnchor="end">Radius (R)</text>

              <line x1="270" y1="105" x2="326" y2="49" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <text x="295" y="70" fontSize="8" fill="#64748b" fontWeight="bold" textAnchor="start">Radius (R)</text>

              {/* Concave Slice (Left side of sphere) */}
              <path d="M 214,49 A 80,80 0 0,0 214,161" fill="none" stroke="#0ea5e9" strokeWidth="4" />
              <g stroke="#94a3b8" strokeWidth="1" opacity="0.8">
                <line x1="214" y1="49" x2="219" y2="44" />
                <line x1="203" y1="65" x2="208" y2="60" />
                <line x1="195" y1="85" x2="200" y2="80" />
                <line x1="192" y1="105" x2="197" y2="100" />
                <line x1="195" y1="125" x2="200" y2="120" />
                <line x1="203" y1="145" x2="208" y2="140" />
                <line x1="214" y1="161" x2="219" y2="156" />
              </g>
              <text x="145" y="95" fontSize="11" fontWeight="black" fill="#0284c7" textAnchor="end">CONCAVE MIRROR</text>
              <text x="145" y="109" fontSize="8.5" fill="#475569" textAnchor="end">Outer Coated (Silvered)</text>
              <text x="145" y="123" fontSize="8.5" fill="#15803d" fontWeight="bold" textAnchor="end">Inner Reflector</text>

              {/* Convex Slice (Right side of sphere) */}
              <path d="M 326,49 A 80,80 0 0,1 326,161" fill="none" stroke="#f43f5e" strokeWidth="4" />
              <g stroke="#94a3b8" strokeWidth="1" opacity="0.8">
                <line x1="326" y1="49" x2="321" y2="44" />
                <line x1="337" y1="65" x2="332" y2="60" />
                <line x1="345" y1="85" x2="340" y2="80" />
                <line x1="348" y1="105" x2="343" y2="100" />
                <line x1="345" y1="125" x2="340" y2="120" />
                <line x1="337" y1="145" x2="332" y2="140" />
                <line x1="326" y1="161" x2="321" y2="156" />
              </g>
              <text x="395" y="95" fontSize="11" fontWeight="black" fill="#be123c" textAnchor="start">CONVEX MIRROR</text>
              <text x="395" y="109" fontSize="8.5" fill="#475569" textAnchor="start">Inner Coated (Silvered)</text>
              <text x="395" y="123" fontSize="8.5" fill="#0284c7" fontWeight="bold" textAnchor="start">Outer Reflector</text>
            </svg>
          </div>
        </div>

        {/* SECTION 2: What Are the Characteristics of Images Formed by Spherical Mirrors? */}
        <div className="space-y-4 print:break-inside-avoid">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900 flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs px-2 py-0.5 rounded">2</span>
            10.2 Characteristics of Images Formed by Spherical Mirrors
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li>
              <b>Activity 10.2 (Let us distinguish):</b> We can distinguish between a plane mirror, a concave mirror, and a convex mirror by looking closely from their side-view or by viewing side views to inspect their characteristic physical shapes.
            </li>
            <li>
              <b>Activity 10.3 (Let us explore - Object Distance-Dependent Behavior):</b> Studying how distance between mirror and object determines image traits:
              <ul className="list-[circle] pl-6 mt-1.5 space-y-1.5 text-xs text-slate-650 font-sans">
                <li><b>Concave Mirror:</b>
                  <div className="mt-1 leading-relaxed text-slate-600">
                    * <i>When the object is CLOSE</i>: The image formed is <b>Virtual, Erect</b> (upright), and <b>Magnified (Enlarged)</b>.
                  </div>
                  <div className="mt-1 leading-relaxed text-slate-600">
                    * <i>When the object is FARTHER AWAY</i>: The image flips and becomes <b>Real, Inverted</b> (upside-down), and decreases in size (becoming <b>Diminished</b> or highly diminished).
                  </div>
                </li>
                <li><b>Convex Mirror:</b> In all situations and at any distance, the image formed is <b>Always Virtual, Erect</b>, and <b>Diminished</b> (smaller than the object).</li>
                <li><b>Plane Mirror:</b> Always forms an image that is <b>Virtual, Erect, and of the Same Size</b> as the object in front of it.</li>
              </ul>
            </li>
            <li>
              <b>Real-Life Applications of Curved Mirrors:</b>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs space-y-1 text-slate-705">
                  <span className="font-bold text-blue-900 block uppercase tracking-wide text-[10px]">Concave Mirror Uses</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    <li><b>Reflectors</b> of torchlights, car and scooter headlights (to create a powerful parallel beam of light).</li>
                    <li><b>Dentist's mirrors</b> (to see an enlarged, erect view of teeth).</li>
                    <li><b>Reflecting telescopes</b> (the main mirror is a large concave mirror used to gather distant starlight).</li>
                  </ul>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs space-y-1 text-slate-705">
                  <span className="font-bold text-rose-900 block uppercase tracking-wide text-[10px]">Convex Mirror Uses</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    <li><b>Rear-view / side-view mirrors</b> in vehicles (provide a wider field of view because they are curved outwards, and the images are always erect and smaller).</li>
                    <li><b>Security mirrors</b> in big shops or at road intersections and sharp bends to avoid crashes.</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>

          {/* Dental enlargement vs vehicle lateral wide reflection */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-2xl my-3 print:break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 text-center">Real-World Uses of Concave & Convex Mirrors</span>
            <div className="flex flex-col lg:flex-row gap-6 w-full justify-center items-center">
              <div className="bg-white border border-slate-150 rounded-xl p-3 text-center flex flex-col justify-center items-center w-full max-w-[390px]">
                <span className="text-[10px] font-bold text-slate-700 uppercase mb-1">Dentist's Enlarging Mirror (Concave)</span>
                <svg viewBox="0 0 280 200" className="w-full max-w-[340px] h-auto my-2 bg-white rounded-xl border border-slate-100 p-1">
                  <defs>
                    <marker id="arrow-dentist-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#0ea5e9" />
                    </marker>
                  </defs>
                  
                  {/* Mirror backing hashes on the outer left side */}
                  <path d="M 80,35 A 100,100 0 0,0 80,165" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="77" y1="35" x2="72" y2="32" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="73" y1="55" x2="68" y2="52" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="71" y1="75" x2="66" y2="72" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="70" y1="95" x2="65" y2="92" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="70" y1="115" x2="65" y2="112" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="71" y1="135" x2="66" y2="132" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="73" y1="155" x2="68" y2="152" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="77" y1="175" x2="72" y2="172" stroke="#94a3b8" strokeWidth="1.2" />

                  {/* Concave Mirror itself */}
                  <path d="M 80,35 A 100,100 0 0,0 80,165" stroke="#0ea5e9" strokeWidth="4.5" fill="none" />
                  
                  {/* Real Tooth (Object) inside Focus */}
                  <g transform="translate(150, 95)" fill="#f8fafc" stroke="#475569" strokeWidth="1.5">
                    <path d="M -8,-10 Q -12,-10 -12,-4 Q -12,4 -8,8 L -6,14 L -2,14 L -1,10 L 1,10 L 2,14 L 6,14 L 8,8 Q 12,4 12,-4 Q 12,-10 8,-10 Z" />
                  </g>
                  <text x="150" y="125" fontSize="10" fill="#334155" fontWeight="bold" textAnchor="middle" className="font-sans">Real Tooth</text>
                  <text x="150" y="137" fontSize="8" fill="#475569" textAnchor="middle" className="font-sans">(Inside Focus)</text>

                  {/* Virtual Erect Image (behind mirror) */}
                  <g transform="translate(40, 85) scale(1.9)" fill="#ebf8ff" stroke="#0ea5e9" strokeWidth="1.5">
                    <path d="M -8,-10 Q -12,-10 -12,-4 Q -12,4 -8,8 L -6,14 L -2,14 L -1,10 L 1,10 L 2,14 L 6,14 L 8,8 Q 12,4 12,-4 Q 12,-10 8,-10 Z" opacity="0.85" />
                  </g>
                  <text x="40" y="132" fontSize="11" fontWeight="extrabold" fill="#0284c7" textAnchor="middle" className="font-sans">Enlarged Image</text>
                  <text x="40" y="144" fontSize="9" fontWeight="bold" fill="#0284c7" textAnchor="middle" className="font-sans">(Virtual &amp; Erect)</text>

                  {/* Rays from Tooth top (150, 85) to mirror */}
                  {/* Ray 1 Going Left */}
                  <line x1="150" y1="85" x2="115" y2="70" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#arrow-dentist-blue)" />
                  <line x1="115" y1="70" x2="80" y2="55" stroke="#0ea5e9" strokeWidth="1.5" />
                  {/* Reflected Ray 1 going Down-Right to Eye */}
                  <line x1="80" y1="55" x2="160" y2="87.5" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#arrow-dentist-blue)" />
                  <line x1="160" y1="87.5" x2="240" y2="120" stroke="#0ea5e9" strokeWidth="1.5" />
                  {/* Virtual trace black dash behind mirror */}
                  <line x1="80" y1="55" x2="40" y2="40" stroke="#0284c7" strokeWidth="1.3" strokeDasharray="3 3" />

                  {/* Ray 2 Going Left-Down */}
                  <line x1="150" y1="85" x2="115" y2="115" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#arrow-dentist-blue)" />
                  <line x1="115" y1="115" x2="80" y2="145" stroke="#0ea5e9" strokeWidth="1.5" />
                  {/* Reflected Ray 2 going Up-Right to Eye */}
                  <line x1="80" y1="145" x2="160" y2="137.5" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#arrow-dentist-blue)" />
                  <line x1="160" y1="137.5" x2="240" y2="130" stroke="#0ea5e9" strokeWidth="1.5" />
                  {/* Virtual trace back */}
                  <line x1="80" y1="145" x2="40" y2="40" stroke="#0284c7" strokeWidth="1.3" strokeDasharray="3 3" />
                  
                  {/* Observer Eye on the Right receiving the rays */}
                  <g transform="translate(245, 125) scale(0.6)">
                    <path d="M -25,0 Q 0,18 25,0 Q 0,-18 -25,0 Z" fill="#ebf8ff" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="9" fill="#0284c7" />
                    <circle cx="0" cy="0" r="4" fill="#0f172a" />
                  </g>
                </svg>
                <p className="text-[10px] text-slate-600 font-sans mt-1">Tooth placed inside the focus forms a highly magnified and erect virtual reflection.</p>
              </div>

              <div className="bg-white border border-slate-150 rounded-xl p-3 text-center flex flex-col justify-center items-center w-full max-w-[390px]">
                <span className="text-[10px] font-bold text-slate-700 uppercase mb-1">Vehicle Side-View Mirror (Convex)</span>
                <svg viewBox="0 0 280 200" className="w-full max-w-[340px] h-auto my-2 bg-white rounded-xl border border-slate-200 p-1">
                  <defs>
                    <marker id="arrow-vehicle-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f43f5e" />
                    </marker>
                  </defs>
                  
                  {/* Convex Mirror backing hashes on the inner right side */}
                  <path d="M 170,35 A 100,100 0 0,0 170,165" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="172" y1="35" x2="177" y2="32" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="164" y1="55" x2="169" y2="52" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="160" y1="75" x2="165" y2="72" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="159" y1="95" x2="164" y2="92" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="159" y1="115" x2="164" y2="112" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="160" y1="135" x2="165" y2="132" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="164" y1="155" x2="169" y2="152" stroke="#94a3b8" strokeWidth="1.2" />
                  <line x1="172" y1="175" x2="177" y2="172" stroke="#94a3b8" strokeWidth="1.2" />

                  {/* Convex Mirror itself */}
                  <path d="M 170,35 A 100,100 0 0,0 170,165" stroke="#f43f5e" strokeWidth="4.5" fill="none" />
                  
                  {/* Real Large Car (Object) in front of mirror */}
                  <g transform="translate(45, 80)" fill="#475569" stroke="#1e293b" strokeWidth="1.2">
                    <path d="M 0,15 L 5,15 L 12,5 L 28,5 L 35,15 L 43,15 C 46,15 48,17 48,20 L 48,32 C 48,34 46,36 43,36 L 0,36 C -3,36 -5,34 -5,32 L -5,20 C -5,17 -3,15 0,15 Z" />
                    <circle cx="8" cy="36" r="6" fill="#1e293b" />
                    <circle cx="8" cy="36" r="2.5" fill="#94a3b8" />
                    <circle cx="32" cy="36" r="6" fill="#1e293b" />
                    <circle cx="32" cy="36" r="2.5" fill="#94a3b8" />
                    <rect x="14" y="8" width="10" height="7" fill="#cbd5e1" />
                  </g>
                  <text x="65" y="137" fontSize="10.5" fill="#334155" fontWeight="bold" textAnchor="middle" className="font-sans">Rear Large Car</text>
                  <text x="65" y="149" fontSize="8.5" fill="#475569" textAnchor="middle" className="font-sans">Real Object</text>

                  {/* Diminished Image (behind mirror) */}
                  <g transform="translate(195, 96) scale(0.45)" fill="#fff" stroke="#f43f5e" strokeWidth="1.5">
                    <path d="M 0,15 L 5,15 L 12,5 L 28,5 L 35,15 L 43,15 C 46,15 48,17 48,20 L 48,32 C 48,34 46,36 43,36 L 0,36 C -3,36 -5,34 -5,32 L -5,20 C -5,17 -3,15 0,15 Z" />
                    <circle cx="8" cy="36" r="6" fill="#1e293b" />
                    <circle cx="32" cy="36" r="6" fill="#1e293b" />
                  </g>
                  <text x="210" y="125" fontSize="10" fontWeight="extrabold" fill="#be123c" textAnchor="middle" className="font-sans">Diminished Image</text>
                  <text x="210" y="137" fontSize="8.5" fontWeight="bold" fill="#be123c" textAnchor="middle" className="font-sans">(Virtual &amp; Erect)</text>

                  {/* Rays from Car Top (65, 85) */}
                  {/* Ray 1 going to mirror */}
                  <line x1="65" y1="85" x2="109" y2="80.5" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrow-vehicle-red)" />
                  <line x1="109" y1="80.5" x2="153" y2="76" stroke="#f43f5e" strokeWidth="1.5" />
                  {/* Reflected Ray 1 reflecting OUTWARD/upwards */}
                  <line x1="153" y1="76" x2="109" y2="56" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrow-vehicle-red)" />
                  <line x1="109" y1="56" x2="65" y2="36" stroke="#f43f5e" strokeWidth="1.5" />
                  {/* Dashed virtual trace back behind mirror */}
                  <line x1="153" y1="76" x2="205" y2="98" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Ray 2 going to mirror */}
                  <line x1="65" y1="116" x2="109" y2="120" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrow-vehicle-red)" />
                  <line x1="109" y1="120" x2="153" y2="124" stroke="#f43f5e" strokeWidth="1.5" />
                  {/* Reflected Ray 2 reflecting OUTWARD/downwards */}
                  <line x1="153" y1="124" x2="109" y2="144" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrow-vehicle-red)" />
                  <line x1="109" y1="144" x2="65" y2="164" stroke="#f43f5e" strokeWidth="1.5" />
                  {/* Dashed virtual trace back behind mirror */}
                  <line x1="153" y1="124" x2="205" y2="112" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Wide perspective/field of view eye detector */}
                  <g transform="translate(45, 55) scale(0.6)">
                    <path d="M -25,0 Q 0,18 25,0 Q 0,-18 -25,0 Z" fill="#fff5f5" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="9" fill="#f43f5e" />
                  </g>
                </svg>
                <p className="text-[10px] text-slate-600 font-sans mt-1">Curved-out design reflects rays from a massive field into a small, upright, virtual view.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: What Are the Laws of Reflection? */}
        <div className="space-y-4 print:break-inside-avoid">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900 flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs px-2 py-0.5 rounded">3</span>
            What Are the Laws of Reflection?
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li>
              <b>Key Reflection Terms (Activity 10.4 comb setup):</b>
              <ul className="list-[circle] pl-6 mt-1.5 space-y-1 text-xs text-slate-600 font-sans">
                <li><b>Incident Ray:</b> The ray of light that falls upon a reflecting surface.</li>
                <li><b>Reflected Ray:</b> The ray of light that is bounced back from the reflecting surface.</li>
                <li><b>Normal:</b> An imaginary line perpendicular (at 90°) to the mirror surface at the point of incidence (O).</li>
                <li><b>Angle of Incidence (∠i):</b> The angle formed between the normal and the incoming incident ray.</li>
                <li><b>Angle of Reflection (∠r):</b> The angle formed between the normal and the outgoing reflected ray.</li>
              </ul>
            </li>
            <li>
              <b>The First Law of Reflection:</b> The angle of incidence is always equal to the angle of reflection (<code className="font-sans font-bold">∠i = ∠r</code>).
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                * <i>Normal incidence</i>: When a ray falls perpendicular on the mirror, <code className="font-sans">∠i = 0°</code> and <code className="font-sans">∠r = 0°</code>, causing the light ray to bounce back along its exact same path.
              </p>
            </li>
            <li>
              <b>The Second Law of Reflection:</b> The incident ray, the normal drawn at the point of incidence, and the reflected ray, all lie in the same plane.
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                * <i>Activity 10.5 Proof</i>: If you let a light ray pass over a sheet of paper on a table, and then bend the extended part of the paper downwards at the table's edge, the reflected ray instantly disappears. This is because the bent paper is in a different plane than the incident ray and the normal, proving that they all need to be in the same plane.
              </p>
            </li>
            <li>
              <b>Universality:</b> The two laws of reflection apply universally to all types of reflecting surfaces—whether flat (plane mirrors) or curved (concave and convex mirrors).
            </li>
            <li>
              <b>Activity 10.6 (Comb with multiple opening - parallel beams):</b> Observing parallel incident light beams falling on different mirrors:
              <ul className="list-[circle] pl-6 mt-1.5 space-y-1 text-xs text-slate-600">
                <li><b>Plane Mirror:</b> Parallel rays remain parallel after reflection.</li>
                <li><b>Concave Mirror:</b> Bends incoming parallel rays inward to meet at a single real focal point <b>Focus (F)</b>. Thus, it is called a <b>converging mirror</b>.</li>
                <li><b>Convex Mirror:</b> Scatters incoming parallel rays outward. When retro-traced backward, they seem to emerge from a virtual <b>Focus (F)</b> behind the mirror. Thus, it is called a <b>diverging mirror</b>.</li>
              </ul>
            </li>
            <li>
              <b>Solar Concentrators (Activity 10.7):</b> Focusing sunlight onto a sheet of paper using a concave mirror concentrates starlight and heat energy. The intense converged rays soon set the paper on fire! This is the core science behind <b>solar cookers</b> and industrial <b>solar furnaces</b>.
            </li>
          </ul>

          {/* Laws of Reflection */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-2xl my-3 print:break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 text-center">Geometric Laws of Ray Reflection (NCERT Fig 10.9 Setup)</span>
            <svg viewBox="0 0 500 240" className="w-full max-w-[670px] h-auto bg-white rounded-xl border border-slate-200 p-2 shadow-2xs">
              <defs>
                <marker id="arrow-laws-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#0ea5e9" />
                </marker>
                <marker id="arrow-laws-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f43f5e" />
                </marker>
              </defs>

              {/* Mirror Base block */}
              <line x1="40" y1="170" x2="460" y2="170" stroke="#1e293b" strokeWidth="2.5" />
              <g stroke="#475569" strokeWidth="1.2" opacity="0.4">
                {Array.from({ length: 43 }).map((_, inx) => (
                  <line key={inx} x1={50 + inx * 10} y1="170" x2={45 + inx * 10} y2="182" />
                ))}
              </g>
              <text x="250" y="200" fontSize="10.5" fill="#475569" textAnchor="middle" fontWeight="bold" className="font-sans">Reflecting Mirror Surface</text>

              {/* Normal Line (Perpendicular) */}
              <line x1="250" y1="30" x2="250" y2="170" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="250" y="22" fontSize="10" fill="#334155" fontWeight="black" textAnchor="middle" className="font-sans">Normal Line (90°)</text>

              {/* Incident Ray (with arrow exactly in middle: (70,50) -> (160,110) -> (250,170)) */}
              <line x1="70" y1="50" x2="160" y2="110" stroke="#0ea5e9" strokeWidth="2.2" markerEnd="url(#arrow-laws-blue)" />
              <line x1="160" y1="110" x2="250" y2="170" stroke="#0ea5e9" strokeWidth="2.2" />
              <text x="80" y="42" fontSize="10.5" fill="#0284c7" fontWeight="bold" className="font-sans">Incident Ray</text>

              {/* Reflected Ray (with arrow exactly in middle: (250,170) -> (340,110) -> (430,50)) */}
              <line x1="250" y1="170" x2="340" y2="110" stroke="#f43f5e" strokeWidth="2.2" markerEnd="url(#arrow-laws-red)" />
              <line x1="340" y1="110" x2="430" y2="50" stroke="#f43f5e" strokeWidth="2.2" />
              <text x="420" y="42" fontSize="10.5" fill="#be123c" fontWeight="bold" textAnchor="end" className="font-sans">Reflected Ray</text>

              {/* Angle of Incidence i (measured from the normal to incident ray) */}
              {/* Arc from normal (250, 130) curving back left to incident ray */}
              <path d="M 220,147 A 40,40 0 0,1 250,130" stroke="#0ea5e9" strokeWidth="1.2" fill="none" />
              <text x="215" y="125" fontSize="11" fill="#0284c7" fontWeight="black" textAnchor="middle" className="font-sans">∠i</text>
              <text x="215" y="137" fontSize="8" fill="#0284c7" className="font-sans" textAnchor="middle">Angle of Incidence</text>
              
              {/* Angle of Reflection r (measured from the normal to reflected ray) */}
              {/* Arc from normal (250, 130) curving right to reflected ray */}
              <path d="M 250,130 A 40,40 0 0,1 280,147" stroke="#f43f5e" strokeWidth="1.2" fill="none" />
              <text x="285" y="125" fontSize="11" fill="#be123c" fontWeight="black" textAnchor="middle" className="font-sans">∠r</text>
              <text x="285" y="137" fontSize="8" fill="#be123c" className="font-sans" textAnchor="middle">Angle of Reflection</text>

              {/* Point of Incidence O */}
              <circle cx="250" cy="170" r="4.5" fill="#1e293b" />
              <text x="250" y="186" fontSize="10.5" fill="#1e293b" fontWeight="black" textAnchor="middle" className="font-sans">O (Point of Incidence)</text>
              
              {/* 1st Law Headline text */}
              <rect x="130" y="11" width="240" height="2" fill="#22c55e" opacity="0.1" />
              <text x="250" y="222" fontSize="11" fill="#15803d" className="font-sans font-black uppercase tracking-wide" textAnchor="middle">1st Law: ∠i = ∠r (Angles are Symmetrical)</text>
            </svg>
          </div>

          {/* Trajectories on reflection */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-2xl my-3 print:break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 text-center">Converging (Concave) vs Diverging (Convex) Light Trajectories</span>
            <svg viewBox="0 0 600 240" className="w-full max-w-[780px] h-auto bg-white rounded-xl border border-slate-200 p-2 shadow-2xs">
              <defs>
                <marker id="traj-arrow-dark" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#475569" />
                </marker>
                <marker id="traj-arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#22c55e" />
                </marker>
                <marker id="traj-arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f43f5e" />
                </marker>
              </defs>

              {/* Left Segment: Concave Mirror (CONVERGING) */}
              <g transform="translate(10, 0)">
                {/* Principal Axis */}
                <line x1="10" y1="120" x2="260" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                <text x="25" y="112" fontSize="8" fill="#94a3b8" className="font-mono">Principal Axis</text>

                {/* Mirror Curve: Starts at (220, 20), curves left toward control (180, 120), ends at (220, 220) */}
                <path d="M 220,20 Q 180,120 220,220" fill="none" stroke="#0ea5e9" strokeWidth="4.5" />
                
                {/* Backing hashes on the right side of the curve */}
                <g stroke="#cbd5e1" strokeWidth="1.2">
                  <line x1="220" y1="20" x2="226" y2="17" />
                  <line x1="212" y1="45" x2="218" y2="42" />
                  <line x1="206" y1="70" x2="212" y2="67" />
                  <line x1="202" y1="95" x2="208" y2="92" />
                  <line x1="200" y1="120" x2="206" y2="117" />
                  <line x1="202" y1="145" x2="208" y2="142" />
                  <line x1="206" y1="170" x2="212" y2="167" />
                  <line x1="212" y1="195" x2="218" y2="192" />
                  <line x1="220" y1="220" x2="226" y2="217" />
                </g>

                {/* Ray 1 (Upper Horizontal Beam): hits at (212.8, 45) */}
                {/* Incident parallel ray */}
                <line x1="15" y1="45" x2="114" y2="45" stroke="#475569" strokeWidth="1.8" markerEnd="url(#traj-arrow-dark)" />
                <line x1="114" y1="45" x2="212.8" y2="45" stroke="#475569" strokeWidth="1.8" />
                
                {/* Reflected ray meeting at Focus F(120, 120) */}
                <line x1="212.8" y1="45" x2="166.4" y2="82.5" stroke="#22c55e" strokeWidth="1.8" markerEnd="url(#traj-arrow-green)" />
                <line x1="166.4" y1="82.5" x2="120" y2="120" stroke="#22c55e" strokeWidth="1.8" />

                {/* Ray 2 (Lower Horizontal Beam): hits at (212.8, 195) */}
                {/* Incident parallel ray */}
                <line x1="15" y1="195" x2="114" y2="195" stroke="#475569" strokeWidth="1.8" markerEnd="url(#traj-arrow-dark)" />
                <line x1="114" y1="195" x2="212.8" y2="195" stroke="#475569" strokeWidth="1.8" />
                
                {/* Reflected ray meeting at Focus F(120, 120) */}
                <line x1="212.8" y1="195" x2="166.4" y2="157.5" stroke="#22c55e" strokeWidth="1.8" markerEnd="url(#traj-arrow-green)" />
                <line x1="166.4" y1="157.5" x2="120" y2="120" stroke="#22c55e" strokeWidth="1.8" />

                {/* Focal Point Spot */}
                <circle cx="120" cy="120" r="4.5" fill="#15803d" />
                <text x="120" y="108" fontSize="10.5" fontWeight="black" fill="#15803d" textAnchor="middle" className="font-sans">Focus (F)</text>
                
                {/* Label */}
                <text x="130" y="234" fontSize="10.5" fontWeight="extrabold" fill="#0284c7" textAnchor="middle" className="font-sans">CONCAVE: CONVERGING Mirror</text>
              </g>

              {/* Right Segment: Convex Mirror (DIVERGING) */}
              <g transform="translate(320, 0)">
                {/* Principal Axis */}
                <line x1="10" y1="120" x2="260" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                <text x="220" y="112" fontSize="8" fill="#94a3b8" className="font-mono">Principal Axis</text>

                {/* Mirror Curve: Starts at (50, 20), curves right toward (90, 120), ends at (50, 220) */}
                <path d="M 50,20 Q 90,120 50,220" fill="none" stroke="#f43f5e" strokeWidth="4.5" />
                
                {/* Backing hashes on the right (concave/inner) side of the curve */}
                <g stroke="#cbd5e1" strokeWidth="1.2">
                  <line x1="50" y1="20" x2="56" y2="17" />
                  <line x1="58" y1="45" x2="64" y2="42" />
                  <line x1="64" y1="70" x2="70" y2="67" />
                  <line x1="68" y1="95" x2="74" y2="92" />
                  <line x1="70" y1="120" x2="76" y2="117" />
                  <line x1="68" y1="145" x2="74" y2="142" />
                  <line x1="64" y1="170" x2="70" y2="167" />
                  <line x1="58" y1="195" x2="64" y2="192" />
                  <line x1="50" y1="220" x2="56" y2="217" />
                </g>

                {/* Ray 1 (Upper Horizontal Beam): strikes bulge exactly at (57.2, 45) */}
                {/* Incident parallel ray pointing right */}
                <line x1="10" y1="45" x2="33" y2="45" stroke="#475569" strokeWidth="1.8" markerEnd="url(#traj-arrow-dark)" />
                <line x1="33" y1="45" x2="57.2" y2="45" stroke="#475569" strokeWidth="1.8" />
                
                {/* Real Reflected ray reflecting OUTWARD (diverging) */}
                <line x1="57.2" y1="45" x2="31" y2="21" stroke="#f43f5e" strokeWidth="1.8" markerEnd="url(#traj-arrow-red)" />
                <line x1="31" y1="21" x2="5" y2="-3" stroke="#f43f5e" strokeWidth="1.8" />

                {/* Dashed trace back to Virtual Focus (F) behind mirror at (150, 120) */}
                <line x1="57.2" y1="45" x2="150" y2="120" stroke="#be123c" strokeWidth="1.4" strokeDasharray="3 3" />

                {/* Ray 2 (Lower Horizontal Beam): strikes bulge exactly at (57.2, 195) */}
                {/* Incident parallel ray pointing right */}
                <line x1="10" y1="195" x2="33" y2="195" stroke="#475569" strokeWidth="1.8" markerEnd="url(#traj-arrow-dark)" />
                <line x1="33" y1="195" x2="57.2" y2="195" stroke="#475569" strokeWidth="1.8" />
                
                {/* Real Reflected ray reflecting OUTWARD (diverging) */}
                <line x1="57.2" y1="195" x2="31" y2="219" stroke="#f43f5e" strokeWidth="1.8" markerEnd="url(#traj-arrow-red)" />
                <line x1="31" y1="219" x2="5" y2="243" stroke="#f43f5e" strokeWidth="1.8" />

                {/* Dashed trace back to Focus */}
                <line x1="57.2" y1="195" x2="150" y2="120" stroke="#be123c" strokeWidth="1.4" strokeDasharray="3 3" />

                {/* Virtual Focal Spot */}
                <circle cx="150" cy="120" r="4.5" fill="#be123c" />
                <text x="150" y="108" fontSize="10.5" fontWeight="bold" fill="#be123c" textAnchor="middle" className="font-sans">Virtual Focus (F)</text>
                
                {/* Label */}
                <text x="130" y="234" fontSize="10.5" fontWeight="extrabold" fill="#e11d48" textAnchor="middle" className="font-sans">CONVEX: DIVERGING Mirror</text>
              </g>
            </svg>
          </div>
        </div>

        {/* SECTION 4: What Is a Lens? */}
        <div className="space-y-4 print:break-inside-avoid">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900 flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs px-2 py-0.5 rounded">4</span>
            What Is a Lens?
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li>
              <b>Definition:</b> A lens is a piece of transparent refracting material, usually made of polished glass or clear plastic, bounded by curved surfaces. Unlike mirrors, lenses allow light to pass <i>through</i> them rather than bouncing back.
            </li>
            <li>
              <b>Water Droplet natural magnifier (Activity 10.8):</b> Placing a round water drop on a wax-coated glass strip acts as a natural convex lens, magnifying the letters beneath it and making them appear larger.
            </li>
            <li>
              <b>CONVEX LENS (The Converging Lens - Fig 10.15):</b>
              <ul className="list-[circle] pl-6 mt-1 space-y-1 text-xs text-slate-600 font-sans">
                <li><b>Shape:</b> Thicker at the middle center zone and thinner towards the outer boundary edges.</li>
                <li><b>Action on Light (Activity 10.9 Paper Burning):</b> It converges parallel light rays (like sunlight) that pass through it. Directing sunlight through a convex lens onto a sheet of paper heats it intensely at a single spot (Focus), setting the paper on fire and proving its converging nature.</li>
                <li><b>Image Properties (Activity 10.10 Candle Experiment):</b>
                  <div className="mt-1 leading-relaxed">
                    * <i>When the object is held CLOSE</i>: It forms a <b>Virtual, Erect, and Magnified</b> (enlarged) image. This is the classic <i>magnifying glass</i> arrangement.
                  </div>
                  <div className="mt-1 leading-relaxed">
                    * <i>When the object distance INCREASES</i>: The image flips to become <b>Real, Inverted</b>, and its size varies between magnified and diminished.
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <b>CONCAVE LENS (The Diverging Lens - Fig 10.16):</b>
              <ul className="list-[circle] pl-6 mt-1 space-y-1 text-xs text-slate-600 font-sans">
                <li><b>Shape:</b> Thinner at the middle center zone and thicker towards the outer boundary edges.</li>
                <li><b>Action on Light:</b> It diverges parallel light rays that pass through it. Consequently, it is named a <b>diverging lens</b>.</li>
                <li><b>Image Properties (Activity 10.11):</b> It always forms a <b>Virtual, Erect, and Diminished</b> (smaller) image, regardless of how close or far the object is placed in front of it.</li>
              </ul>
            </li>
            <li>
              <b>Optical Applications:</b> Reading glasses (eyeglasses), camera lenses, smartphones, binoculars, microscopes, and the crystalline convex lens inside the human eye.
            </li>
          </ul>

          {/* Lens Cross Sections and Trajectories */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-2xl my-3 print:break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 text-center">Convex &amp; Concave Lens Cross-sections &amp; Refraction Trajectories</span>
            
            <div className="flex flex-col lg:flex-row gap-6 w-full justify-center items-center">
              {/* Geometry specs inside */}
              <div className="bg-white border border-slate-150 rounded-xl p-3 text-center w-full max-w-[590px]">
                <span className="text-[10px] font-bold text-slate-700 uppercase block mb-1">Glass Cross-Section Shapes</span>
                <svg viewBox="0 0 380 180" className="w-full max-w-[540px] h-auto my-1 bg-white rounded-xl border border-slate-100 p-1">
                  <g transform="translate(10, 0)">
                    {/* Convex Lens Body */}
                    <path d="M 80,20 Q 115,90 80,160 Q 45,90 80,20 Z" fill="#ebf8ff" stroke="#0ea5e9" strokeWidth="2.8" />
                    <text x="80" y="80" fontSize="9" fill="#0369a1" fontWeight="extrabold" textAnchor="middle" className="font-sans">Thicker at</text>
                    <text x="80" y="93" fontSize="9" fill="#0369a1" fontWeight="extrabold" textAnchor="middle" className="font-sans">the Middle</text>
                    <text x="80" y="11" fontSize="9.5" fontWeight="bold" fill="#0284c7" textAnchor="middle" className="font-sans">CONVEX LENS</text>
                    <text x="80" y="172" fontSize="8" fill="#475569" textAnchor="middle" className="font-sans">(Converging Nature)</text>
                  </g>
                  <g transform="translate(200, 0)">
                    {/* Concave Lens Body */}
                    <path d="M 60,20 L 100,20 Q 80,90 100,160 L 60,160 Q 80,90 60,20" fill="#fff5f5" stroke="#f43f5e" strokeWidth="2.8" />
                    <text x="80" y="55" fontSize="9" fill="#b91c1c" fontWeight="extrabold" textAnchor="middle" className="font-sans">Thinner</text>
                    <text x="80" y="68" fontSize="9" fill="#b91c1c" fontWeight="extrabold" textAnchor="middle" className="font-sans">in Middle</text>
                    <text x="80" y="105" fontSize="9" fill="#b91c1c" fontWeight="extrabold" textAnchor="middle" className="font-sans">Thicker</text>
                    <text x="80" y="118" fontSize="9" fill="#b91c1c" fontWeight="extrabold" textAnchor="middle" className="font-sans">at Edges</text>
                    <text x="80" y="11" fontSize="9.5" fontWeight="bold" fill="#be123c" textAnchor="middle" className="font-sans">CONCAVE LENS</text>
                    <text x="80" y="172" fontSize="8" fill="#475569" textAnchor="middle" className="font-sans">(Diverging Nature)</text>
                  </g>
                </svg>
              </div>

              {/* Rays specs */}
              <div className="bg-white border border-slate-150 rounded-xl p-3 text-center w-full max-w-[590px]">
                <span className="text-[10px] font-bold text-slate-700 uppercase block mb-1">Beams Refraction Trajectories</span>
                <svg viewBox="0 0 600 240" className="w-full max-w-[540px] h-auto my-1 bg-white rounded-xl border border-slate-100 p-1">
                  <defs>
                    <marker id="lens-arrow-dark" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#475569" />
                    </marker>
                    <marker id="lens-arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#22c55e" />
                    </marker>
                    <marker id="lens-arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f43f5e" />
                    </marker>
                  </defs>

                  {/* Left Segment: Convex Lens (CONVERGING) */}
                  <g transform="translate(10, 0)">
                    {/* Principal Axis */}
                    <line x1="10" y1="120" x2="260" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="25" y="112" fontSize="8" fill="#94a3b8" className="font-mono">Principal Axis</text>

                    {/* Convex Lens Shape */}
                    <path d="M 120,30 Q 140,120 120,210 Q 100,120 120,30 Z" fill="#ebf8ff" stroke="#0ea5e9" strokeWidth="2.5" opacity="0.85" />
                    
                    {/* Parallel Beam 1 (Upper) */}
                    <line x1="15" y1="50" x2="65" y2="50" stroke="#475569" strokeWidth="1.8" markerEnd="url(#lens-arrow-dark)" />
                    <line x1="65" y1="50" x2="120" y2="50" stroke="#475569" strokeWidth="1.8" />
                    {/* Refracts down to focus */}
                    <line x1="120" y1="50" x2="170" y2="85" stroke="#22c55e" strokeWidth="1.8" markerEnd="url(#lens-arrow-green)" />
                    <line x1="170" y1="85" x2="220" y2="120" stroke="#22c55e" strokeWidth="1.8" />

                    {/* Parallel Beam 2 (Lower) */}
                    <line x1="15" y1="190" x2="65" y2="190" stroke="#475569" strokeWidth="1.8" markerEnd="url(#lens-arrow-dark)" />
                    <line x1="65" y1="190" x2="120" y2="190" stroke="#475569" strokeWidth="1.8" />
                    {/* Refracts up to focus */}
                    <line x1="120" y1="190" x2="170" y2="155" stroke="#22c55e" strokeWidth="1.8" markerEnd="url(#lens-arrow-green)" />
                    <line x1="170" y1="155" x2="220" y2="120" stroke="#22c55e" strokeWidth="1.8" />

                    {/* Focus Spot */}
                    <circle cx="220" cy="120" r="4.5" fill="#15803d" />
                    <text x="220" y="108" fontSize="10.5" fontWeight="black" fill="#15803d" textAnchor="middle" className="font-sans">Focus (F)</text>
                    
                    {/* Label */}
                    <text x="130" y="232" fontSize="10.5" fontWeight="bold" fill="#0284c7" textAnchor="middle" className="font-sans">CONVEX: CONVERGING Lens</text>
                  </g>

                  {/* Right Segment: Concave Lens (DIVERGING) */}
                  <g transform="translate(320, 0)">
                    {/* Principal Axis */}
                    <line x1="10" y1="120" x2="260" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="220" y="112" fontSize="8" fill="#94a3b8" className="font-mono">Principal Axis</text>

                    {/* Concave Lens Shape */}
                    <path d="M 100,30 L 140,30 Q 120,120 140,210 L 100,210 Q 120,120 100,30 Z" fill="#fff5f5" stroke="#f43f5e" strokeWidth="2.5" opacity="0.85" />
                    
                    {/* Parallel Beam 1 (Upper) */}
                    <line x1="15" y1="50" x2="70" y2="50" stroke="#475569" strokeWidth="1.8" markerEnd="url(#lens-arrow-dark)" />
                    <line x1="70" y1="50" x2="120" y2="50" stroke="#475569" strokeWidth="1.8" />
                    {/* Refracts outwards (diverging) */}
                    <line x1="120" y1="50" x2="170" y2="25" stroke="#f43f5e" strokeWidth="1.8" markerEnd="url(#lens-arrow-red)" />
                    <line x1="170" y1="25" x2="220" y2="0" stroke="#f43f5e" strokeWidth="1.8" />
                    {/* Dashed virtual traceback to virtual focus F(20, 120) */}
                    <line x1="120" y1="50" x2="20" y2="120" stroke="#be123c" strokeWidth="1.4" strokeDasharray="3 3" />

                    {/* Parallel Beam 2 (Lower) */}
                    <line x1="15" y1="190" x2="70" y2="190" stroke="#475569" strokeWidth="1.8" markerEnd="url(#lens-arrow-dark)" />
                    <line x1="70" y1="190" x2="120" y2="190" stroke="#475569" strokeWidth="1.8" />
                    {/* Refracts outwards (diverging) */}
                    <line x1="120" y1="190" x2="170" y2="215" stroke="#f43f5e" strokeWidth="1.8" markerEnd="url(#lens-arrow-red)" />
                    <line x1="170" y1="215" x2="220" y2="240" stroke="#f43f5e" strokeWidth="1.8" />
                    {/* Dashed virtual traceback to virtual focus F(20, 120) */}
                    <line x1="120" y1="190" x2="20" y2="120" stroke="#be123c" strokeWidth="1.4" strokeDasharray="3 3" />

                    {/* Virtual Focus Spot */}
                    <circle cx="20" cy="120" r="4.5" fill="#be123c" />
                    <text x="20" y="108" fontSize="10.5" fontWeight="bold" fill="#be123c" textAnchor="middle" className="font-sans">Virtual Focus (F)</text>
                    
                    {/* Label */}
                    <text x="130" y="232" fontSize="10.5" fontWeight="bold" fill="#be123c" textAnchor="middle" className="font-sans">CONCAVE: DIVERGING Lens</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: Our Scientific Heritage */}
        <div className="space-y-4 print:break-inside-avoid">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900 flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs px-2 py-0.5 rounded">5</span>
            Our Scientific Heritage
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li>
              <b>Ibn al-Haytham and the Science of Vision (Page 165 Snapshot):</b>
              <p className="mt-1 leading-relaxed text-slate-600">
                Known as the "father of modern optics," <b>Ibn al-Haytham</b> (Abu Ali al-Hasan Ibn al-Haytham, 965–1040 CE) revolutionized our understanding of light and sight. 
                Before his work, ancient philosophers believed our eyes emitted special rays that touched objects to let us see them.
              </p>
            </li>
            <li>
              <b>The Truth About Vision:</b>
              <p className="mt-1 leading-relaxed text-slate-600">
                Through systematic experiments using pinholes, mirrors, and dark rooms (camera obscura), Ibn al-Haytham proved that we see objects because <b>light rays reflect or rebound off objects and enter our eyes</b>.
              </p>
            </li>
            <li>
              <b>Investigating Mirrors and Curved Glass:</b>
              <p className="mt-1 leading-relaxed text-slate-600">
                He meticulously formulated mathematical models for reflection on concave/convex spherical mirrors and analyzed refraction across curved glass and water cylinders, laying the scientific foundation for modern reading glasses, magnifying lenses, and astronomy telescopes.
              </p>
            </li>
          </ul>

          {/* Ibn al-Haytham's Ray Reflection (How We See) */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-2xl my-3 print:break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 text-center">Ibn al-Haytham's Breakthrough Theory of Vision</span>
            <svg viewBox="0 0 350 170" className="w-full max-w-[455px] h-auto bg-white rounded-xl border border-slate-200 p-2 shadow-2xs">
              {/* Sun (Light Source) */}
              <circle cx="45" cy="40" r="15" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
              <g stroke="#eab308" strokeWidth="1.2">
                <line x1="45" y1="15" x2="45" y2="20" />
                <line x1="45" y1="60" x2="45" y2="65" />
                <line x1="20" y1="40" x2="25" y2="40" />
                <line x1="65" y1="40" x2="70" y2="40" />
                <line x1="27" y1="22" x2="31" y2="26" />
                <line x1="59" y1="54" x2="63" y2="58" />
                <line x1="27" y1="58" x2="31" y2="54" />
                <line x1="59" y1="22" x2="63" y2="26" />
              </g>
              <text x="45" y="80" fontSize="8" fontWeight="bold" fill="#a16207" textAnchor="middle">Light Source (Sun)</text>

              {/* Object (Flower) */}
              <g transform="translate(160, 85)">
                {/* Flower pot */}
                <path d="M -10,35 L 10,35 L 7,50 L -7,50 Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
                {/* Stem */}
                <line x1="0" y1="10" x2="0" y2="35" stroke="#15803d" strokeWidth="2.5" />
                {/* Leaf */}
                <path d="M 0,22 Q 12,18 8,28 Q 0,22 0,22" fill="#16a34a" />
                {/* Petals */}
                <circle cx="0" cy="5" r="5" fill="#f43f5e" />
                <circle cx="-6" cy="1" r="5" fill="#f43f5e" />
                <circle cx="6" cy="1" r="5" fill="#f43f5e" />
                <circle cx="-3" cy="-6" r="5" fill="#f43f5e" />
                <circle cx="3" cy="-6" r="5" fill="#f43f5e" />
                <circle cx="0" cy="-1" r="4.5" fill="#facc15" />
              </g>
              <text x="175" y="152" fontSize="8.5" fontWeight="bold" fill="#1e293b" textAnchor="middle">Reflecting Object</text>

              {/* Eye (Observer) */}
              <g transform="translate(290, 40)">
                <path d="M -25,0 Q 0,18 25,0 Q 0,-18 -25,0 Z" fill="#ebf8ff" stroke="#334155" strokeWidth="1.8" />
                <circle cx="0" cy="0" r="10" fill="#0284c7" />
                <circle cx="0" cy="0" r="4.5" fill="#0f172a" />
              </g>
              <text x="290" y="68" fontSize="8" fontWeight="bold" fill="#0369a1" textAnchor="middle">Eye of Observer</text>

              {/* Light Ray 1: Sun to Object */}
              <line x1="60" y1="45" x2="160" y2="80" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="1 1" />
              <polygon points="113,63 105,62 109,68" fill="#ca8a04" />
              <text x="80" y="55" fontSize="7" fill="#ca8a04" fontStyle="italic">1. Light strikes object</text>

              {/* Light Ray 2: Object to Eye */}
              <line x1="175" y1="80" x2="270" y2="42" stroke="#ea580c" strokeWidth="1.8" />
              <polygon points="225,60 217,63 222,55" fill="#ea580c" />
              <text x="250" y="80" fontSize="7" fill="#ea580c" fontStyle="italic" textAnchor="end">2. Light reflects into eye</text>
            </svg>
          </div>
        </div>

        {/* LOWER FOOTER BAR */}
        <div className="flex justify-between items-center text-[11px] sm:text-xs font-sans font-black text-slate-700 uppercase tracking-widest border-t border-slate-300 pt-1.5 mt-3.5 whitespace-nowrap">
          <span className="shrink-0 text-left font-extrabold text-slate-500">NCERT Curiosity Curriculum</span>
          <span className="flex-1 text-center font-black text-slate-950 mx-4">Grade 8 Complete Revision Notes</span>
          <span className="shrink-0 text-right font-extrabold text-slate-500">Science Notes</span>
        </div>
      </div>
    );
  }

  if (preparingFor === '12th') {
    return (
      <div className="space-y-8 animate-fade-in" id="print-content-class-12">
        {/* UPPER HEADER BAR (Required text, not standard heading) */}
        <div className="flex justify-between items-center text-[11px] sm:text-xs font-sans font-black text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2 whitespace-nowrap">
          <span className="shrink-0 text-left font-extrabold text-slate-500">Integrated Learning</span>
          <span className="flex-1 text-center font-black text-slate-900 mx-4">Integrated Syllabus Notes (Class VIII to XII)</span>
          <span className="shrink-0 text-right font-extrabold text-slate-500">K-12 Syllabus</span>
        </div>

        {/* Cover Block header */}
        <div className="border-b-[3px] border-slate-900 pb-6 text-center space-y-2">
          <h4 className="text-xs uppercase font-sans tracking-widest font-black text-slate-500">Comprehensive K-12 Optics Syllabus</h4>
          <h1 className="text-3xl font-sans font-black tracking-tight text-slate-900 uppercase">Syllabus-Wise Notes of Optics</h1>
          <p className="text-sm italic text-slate-600">Unified Point-Wise Study Notes Mapped from Class VIII Foundations to Class XII Formulations</p>
        </div>

        {/* SECTION 1: Electromagnetic & Wave Foundations */}
        <div className="space-y-4">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">1. Nature of Light & Electromagnetic Spectrum</h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li><b>Nature of Light:</b> Light is a transverse electromagnetic wave that can propagate through vacuum at the speed of <code className="font-sans font-semibold text-slate-900">3 &times; 10⁸ m/s</code>. It propagates in straight-line paths (rectilinear propagation).</li>
            <li><b>Dual Aspect (Wave-Particle Duality):</b> Light acts as waves during propagation (e.g. interference, diffraction) and as discrete packets of energy called photons during interaction with matter (e.g. photoelectric effect).</li>
            <li><b>Electromagnetic Spectrum:</b> Visible light is a tiny, highly specialized fraction of the EM spectrum (wavelengths approximately <code className="font-sans font-bold text-slate-900">400 nm to 750 nm</code>), bordered by ultraviolet at shorter wavelengths and infrared at longer wavelengths.</li>
          </ul>
        </div>

        {/* SECTION 2: Reflection, Plane Mirrors & Multiple Reflection */}
        <div className="space-y-4">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">2. Laws of Reflection, Plane Mirrors & Multiple Reflection</h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li><b>Laws of Reflection:</b> Valid for all reflecting reflective surfaces:
              <ul className="list-[circle] pl-6 mt-1.5 space-y-1 text-xs text-slate-650 font-sans">
                <li>The angle of incidence is equal to the angle of reflection (<code className="font-sans font-bold text-slate-900">&ang;i = &ang;r</code>).</li>
                <li>The incident ray, the normal, and the reflected ray all lie in the same plane.</li>
              </ul>
            </li>
            <li><b>Regular vs. Diffused Reflection (Class VIII):</b> Regular reflection happens from smooth surfaces (like mirrors) forming sharp images, whereas diffused (irregular) reflection happens from rough surfaces where rays scatter in different directions, making objects visible from any side.</li>
            <li><b>Plane Mirror Reflection:</b> Image is virtual, erect, laterally inverted, same size as the object, and formed at the same distance behind the mirror. The focal length of a plane mirror is infinite.</li>
            <li><b>Multiple Reflection & Kaleidoscope (Class VIII):</b> When two plane mirrors are kept at an angle <code className="font-sans font-semibold">&theta;</code>, they form multiple images. The number of images formed <code className="font-sans font-bold text-slate-900">N = (360/&theta;) - 1</code> if <code className="font-sans">360/&theta;</code> is an even integer. For example, mirrors at <code className="font-sans">60&deg;</code> in a kaleidoscope yield 5 symmetrical images.</li>
          </ul>
        </div>

        {/* SECTION 3: Spherical Mirrors & Formulas */}
        <div className="space-y-4">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">3. Spherical Mirrors (CBSE Class X Core)</h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li><b>Concave and Convex Mirrors:</b>
              <ul className="list-[circle] pl-6 mt-1.5 space-y-1 text-xs text-slate-655 font-sans">
                <li><b>Concave (Converging):</b> Inner surface is reflecting. Focuses parallel incoming rays at a real focal point. Forms both real/inverted or virtual/erect images depending on object position.</li>
                <li><b>Convex (Diverging):</b> Outer surface is reflecting. Scatters parallel incoming rays, making them appear to diverge from a virtual focus behind the mirror. Form only virtual, erect, and diminished images.</li>
              </ul>
            </li>
            <li><b>鏡 Mirror Formula and Magnification:</b> Uses standard Cartesian sign conventions:
              <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
                <div className="flex flex-wrap items-center gap-6 font-sans text-slate-900 text-sm font-bold justify-center">
                  <div className="flex items-center gap-1">
                    <Fraction num="1" den="v" />
                    <span>+</span>
                    <Fraction num="1" den="u" />
                    <span>=</span>
                    <Fraction num="1" den="f" />
                  </div>
                  <div className="flex items-center gap-1 border-l border-slate-300 pl-6">
                    <span>m = </span>
                    <Fraction num={<span>h<sub>i</sub></span>} den={<span>h<sub>o</sub></span>} />
                    <span>= -</span>
                    <Fraction num="v" den="u" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* SECTION 4: Refraction, Real/Apparent Depth & Glass Slabs */}
        <div className="space-y-4">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">4. Refraction of Light & Glass Slabs</h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li><b>The Refraction Phenomenon:</b> Light transitions between media of different optical densities, bending as its speed changes.
              <ul className="list-[circle] pl-6 mt-1.5 space-y-1 text-xs text-slate-600 font-sans">
                <li>Bends <b>towards the normal</b> when moving from an optically rarer to a denser medium (decrease in velocity).</li>
                <li>Bends <b>away from the normal</b> when moving from an optically denser to a rarer medium (increase in velocity).</li>
              </ul>
            </li>
            <li className="space-y-3 bg-slate-50 p-4 border border-slate-200 rounded-xl leading-relaxed text-xs text-slate-800 print:break-inside-avoid animate-fade-in">
              <div className="font-black text-slate-950 block text-[13.5px] sm:text-sm uppercase tracking-wide border-b border-slate-200 pb-1.5 flex items-center gap-1.5">💡 Velocity Shift Explained:</div>
              <div className="space-y-3 text-xs text-slate-700">
                <div>
                  <b className="text-slate-900 block">Why does Light slow down in Glass or Water?</b>
                  <p className="mt-1 text-slate-600 leading-relaxed">
                    In a complete vacuum, light travels at its absolute speed of <b>3,00,000 kilometers per second</b>. 
                    However, glass and water are packed with atoms. When a light wave enters these materials, it keeps interacting with these atoms. 
                    The atoms momentarily absorb and re-emit the light energy, causing microscopic delays. Like walking through a crowded hallway, the overall journey of light slows down!
                  </p>
                </div>
              </div>
            </li>
            <li><b>Snell's Law:</b> Expresses refraction ratio as:
              <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
                <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold">
                  <Fraction num="sin i" den="sin r" />
                  <span>= constant = &mu;<sub>21</sub> =</span>
                  <Fraction num={<span>sin i</span>} den={<span>sin r</span>} />
                  <span>=</span>
                  <Fraction num={<span>&mu;<sub>2</sub></span>} den={<span>&mu;<sub>1</sub></span>} />
                  <span>=</span>
                  <Fraction num={<span>v<sub>1</sub></span>} den={<span>v<sub>2</sub></span>} />
                </div>
              </div>
            </li>
            <li><b>Real and Apparent Depth:</b> Due to refraction, objects placed in a denser medium (like a pond bed) appear raised when viewed from a rarer medium. Apparent Depth is given by: Apparent Depth = <code className="font-sans font-bold">Real Depth / &mu;<sub>relative</sub></code>.</li>
          </ul>
        </div>

        {/* SECTION 5: Total Internal Reflection */}
        <div className="space-y-4">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">5. Total Internal Reflection (TIR)</h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li><b>Total Internal Reflection (TIR):</b> Light traveling from dense to rare media incident at an angle exceeding the critical angle gets completely reflected back into the denser medium.</li>
            <li><b>Two Necessary Conditions:</b>
              <ul className="list-[circle] pl-6 mt-1.5 space-y-0.5 text-xs text-slate-600 font-sans">
                <li>Light must travel from an optically <b>denser medium to a rarer medium</b>.</li>
                <li>Angle of incidence inside the denser medium must exceed the critical angle (<code className="font-sans">∠i &gt; ∠c</code>).</li>
              </ul>
            </li>
            <li><b>Critical Angle Formula:</b> Expresses critical angle <code className="font-sans">&theta;<sub>c</sub></code> as:
              <div className="flex justify-center items-center py-3 bg-slate-50 border border-slate-200 rounded-xl my-2">
                <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold">
                  <span>sin &theta;<sub>c</sub> =</span>
                  <Fraction num={<span>&mu;<sub>rarer</sub></span>} den={<span>&mu;<sub>denser</sub></span>} />
                  <span>=</span>
                  <Fraction num="1" den={<span>&mu;<sub>denser</sub></span>} />
                </div>
              </div>
            </li>
            <li><b>Applications of TIR:</b> Refracting binoculars, diamond brilliance, optical fibers carrying medical signals, and natural mirage formations.</li>
          </ul>
        </div>

        {/* SECTION 6: Lenses & Refraction through Prism */}
        <div className="space-y-4">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">6. Lenses, Refraction through Prism & Dispersion</h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li><b>Thin Lens Formula and Lensmaker's Equation:</b>
              <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
                <div className="flex flex-wrap items-center gap-6 font-sans text-slate-900 text-sm font-bold justify-center">
                  <div className="flex items-center gap-1">
                    <Fraction num="1" den="v" />
                    <span>-</span>
                    <Fraction num="1" den="u" />
                    <span>=</span>
                    <Fraction num="1" den="f" />
                  </div>
                  <div className="flex items-center gap-1 border-l border-slate-300 pl-6">
                    <Fraction num="1" den="f" />
                    <span>= (&mu;<sub>lens</sub> - 1) &times; [ </span>
                    <Fraction num="1" den={<span>R<sub>1</sub></span>} />
                    <span>-</span>
                    <Fraction num="1" den={<span>R<sub>2</sub></span>} />
                    <span> ]</span>
                  </div>
                </div>
              </div>
            </li>
            <li><b>Power of combined lenses in contact:</b> Total focal length of coaxial lense contacts is:
              <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
                <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold">
                  <span>P<sub>eq</sub> = P<sub>1</sub> + P<sub>2</sub></span>
                  <span className="mx-4 font-normal text-slate-400">or</span>
                  <Fraction num="1" den={<span>f<sub>eq</sub></span>} />
                  <span>=</span>
                  <Fraction num="1" den={<span>f<sub>1</sub></span>} />
                  <span>+</span>
                  <Fraction num="1" den={<span>f<sub>2</sub></span>} />
                </div>
              </div>
            </li>
            <li><b>Refraction through a Prism:</b> Light disperses into seven constituent colors (VIBGYOR спектр). The refractive index of a prism of angle <code className="font-sans font-semibold">A</code> and angle of minimum deviation <code className="font-sans font-semibold">D<sub>m</sub></code> is:
              <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
                <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold">
                  <span>&mu; =</span>
                  <Fraction num={<span>sin[ (A + D<sub>m</sub>) / 2 ]</span>} den={<span>sin(A / 2)</span>} />
                </div>
              </div>
            </li>
            <li><b>Sir Isaac Newton's Recombination:</b> Newton proved that white light is composite by placing an inverted second prism in front of a dispersed spectrum, recombining the colored beams back into a single white beam.</li>
          </ul>
        </div>

        {/* SECTION 7: Human Eye, defects of vision & Braille System */}
        <div className="space-y-4">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">7. Human Eye, Vision Defects & Care (Class VIII & X)</h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800 font-sans">
            <li><b>Anatomical Structure of the Eye:</b> Includes the white tough protective <b>Sclera</b>, the transparent outer curved protective dome <b>Cornea</b>, the dark colored muscular diaphragm <b>Iris</b>, active light-aperture <b>Pupil</b>, and the light-sensitive <b>Retina</b> packed with photoreceptor cells (<b>Rods</b> for night-vision and <b>Cones</b> for color-vision).</li>
            <li><b>Defects of Vision & Correction:</b>
              <ul className="list-[circle] pl-6 mt-1.5 space-y-2 text-xs text-slate-600 font-sans">
                <li><b>Myopia (Near-sightedness):</b> Can see near objects clearly but far objects are fuzzy because parallel beams focus <i>in front</i> of the retina. Corrected with a diverging <b>concave lens</b>.</li>
                <li><b>Hypermetropia (Far-sightedness):</b> Can see far objects clearly but near objects are fuzzy because beams focus <i>behind</i> the retina. Corrected with a converging <b>convex lens</b>.</li>
                <li><b>Presbyopia:</b> Age-related decrease in ciliary muscle elasticity. Corrected using bi-focal lenses.</li>
              </ul>
            </li>
            <li><b>Care of Eyes & Inclusion:</b> Clean eyes regularly, do not look directly at the sun, and provide proper lighting.
              <p className="mt-1"><b>Braille System:</b> An elegant tactile writing system for visually disabled persons designed by Louis Braille, containing 63 tactile cell dot arrangements read via light finger touch.</p>
            </li>
          </ul>
        </div>

        {/* SECTION 8: Optical Instruments */}
        <div className="space-y-4">
          <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">8. Advanced Optical Instruments (Class XII Core)</h2>
          <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800">
            <li><b>Simple Microscope:</b> A single short-focus converging lens. When object is within first principal focus, it forms virtual, erect, magnified images on the same side.</li>
            <li><b>Compound Microscope:</b> Uses short-focal Objective and Eyepiece to multiply magnifications: <code className="font-sans font-bold">m = m<sub>o</sub> &times; m<sub>e</sub></code>. Optima focuses tiny specs on slide glass sheets.</li>
            <li><b>Astronomical Telescope:</b> Combines long-focus Objective (with wide light gathering aperture) and short-focus Eyepiece to view distant celestial systems. Focal length path: <code className="font-sans font-semibold text-slate-900">L = f₀ + f<sub>e</sub></code>.</li>
            <li><b>Reflecting Telescope (Parabolic Mirror):</b> Uses large curved paraboloidal mirrors instead of optical lenses to gather light. This completely deletes both chromatic aberration (color halos) and spherical aberration (defocussed edges).</li>
          </ul>
        </div>

        {/* LOWER FOOTER BAR (Required text, not standard heading) */}
        <div className="flex justify-between items-center text-[11px] sm:text-xs font-sans font-black text-slate-700 uppercase tracking-widest border-t border-slate-300 pt-1.5 mt-3.5 whitespace-nowrap">
          <span className="shrink-0 text-left font-extrabold text-slate-500">Integrated Learning</span>
          <span className="flex-1 text-center font-black text-slate-900 mx-4">Integrated Syllabus Notes (Class VIII to XII)</span>
          <span className="shrink-0 text-right font-extrabold text-slate-500">K-12 Syllabus</span>
        </div>
      </div>
    );
  }

  // Fallback to Class 10 (the default)
  return (
    <div className="space-y-8 animate-fade-in" id="print-content-class-10">
      {/* UPPER HEADER BAR (Required text, not standard heading) */}
      <div className="flex justify-between items-center text-[11px] sm:text-xs font-sans font-black text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2 whitespace-nowrap">
        <span className="shrink-0 text-left font-extrabold text-slate-500">Conceptual Learning</span>
        <span className="flex-1 text-center font-black text-slate-900 mx-4">Notes of Optics for Class 10th</span>
        <span className="shrink-0 text-right font-extrabold text-slate-500">CBSE Physics</span>
      </div>

      {/* Cover/Header Block */}
      <div className="border-b-[3px] border-slate-900 pb-6 text-center">
        <h1 className="text-3xl font-sans font-black tracking-tight text-slate-900 uppercase">Light: Reflection and Refraction</h1>
      </div>

      {/* SECTION 1: reflection */}
      <div className="space-y-4">
        <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">1. Reflection of Light & Spherical Mirrors</h2>
        <ul className="list-disc pl-6 text-sm space-y-2.5 text-slate-800 font-sans">
          <li>
            <b>Light:</b> A form of electromagnetic radiation that can be detected by the human eye. It propagates along straight lines under standard homogeneous medium conditions, which is known as the rectilinear propagation of light.
          </li>
          <li>
            <b>Reflection of Light:</b> The physical phenomenon of light rays bouncing back into the same medium upon striking a polished plane interface.
          </li>
          <li>
            <b>Plane Mirror Reflection:</b> Forms a Virtual and Erect image whose size matches the original object, is formed at an equal distance behind the mirror, and is laterally inverted. The focal length (<code className="font-sans font-semibold">f</code>) of a plane mirror is <b>Infinity (∞)</b>.
          </li>
          <li>
            <b>Laws of Reflection:</b>
            <ul className="list-[circle] pl-6 mt-1.5 space-y-1 text-xs text-slate-600">
              <li>The angle of incidence is always equal to the angle of reflection (<code className="font-sans font-semibold">∠i = ∠r</code>).</li>
              <li>The incident ray, the reflected ray, and the normal to the mirror at the point of incidence all lie in the same mathematical plane.</li>
            </ul>
          </li>
          <li>
            <b>Spherical Mirrors:</b> A mirror whose reflecting surface is part of a hollow sphere of glass.
            <ul className="list-[circle] pl-6 mt-1.5 space-y-1.5 text-xs text-slate-650">
              <li><b>Pole (P):</b> The geometric center of the reflecting spherical surface.</li>
              <li><b>Center of Curvature (C):</b> The center of the hollow sphere of which the mirror forms a part.</li>
              <li><b>Radius of Curvature (R):</b> The distance between Pole and Center of Curvature. It satisfies the relation <code className="font-sans">R = 2f</code>.</li>
              <li><b>Principal Focus (F):</b> The point on the principal axis where rays parallel to the axis converge (concave mirror) or appear to diverge from (convex mirror) after reflection.</li>
            </ul>
          </li>
        </ul>

        {/* Sub-section 1.1: Image Formation by Concave Mirror */}
        <div className="space-y-4 pt-4">
          <h3 className="text-[13px] sm:text-sm font-sans font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
            Image Formation by Concave Mirror (Activity)
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            A concave mirror has an inwardly curved reflecting surface. Depending on the position of the object relative to the Pole (P), Focus (F), and Center of Curvature (C), it can produce real and inverted images of various sizes, or a virtual, erect, and magnified image (when the object is placed inside the focus, between F and P).
          </p>

          {/* Detailed Activity Box for Concave Mirror */}
          <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-4 space-y-3 print:break-inside-avoid shadow-2xs">
            <h4 className="text-xs font-sans font-bold uppercase text-emerald-800 tracking-wide flex items-center gap-2">
              <span className="bg-emerald-700 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold">NCERT Activity 10.5</span>
              Observe Image Formation by Concave Mirror
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              This activity explores how changing the object distance relative to the focal length affects the properties of images formed by a concave mirror.
            </p>
            <ul className="list-decimal pl-5 text-xs text-slate-750 space-y-2 leading-relaxed">
              <li>
                <b>Determine Focal Length:</b> Find the approximate focal length (<code className="font-sans font-semibold">f</code>) of the concave mirror by focusing the image of a distant tree or the Sun onto a paper sheet to get a sharp bright spot.
              </li>
              <li>
                <b>Draw Reference Lines:</b> Mark a straight line on a table to represent the principal axis. Mark three points on it representing the Pole (P), Focus (F), and Center of Curvature (C) with equal spacing: <code className="font-sans font-semibold">PF = FC = f</code>.
              </li>
              <li>
                <b>Mount Mirror:</b> Place the concave mirror on a clean stand and align its pole directly over point P.
              </li>
              <li>
                <b>Configure the Object:</b> Place a burning candle successively at these six positions:
                <div className="mt-1.5 grid grid-cols-2 gap-2 text-slate-650 font-medium">
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 1. At Infinity</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 2. Beyond C</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 3. At C</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 4. Between C and F</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 5. At Focus F</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 6. Between F and P</div>
                </div>
              </li>
              <li>
                <b>Catch the Image:</b> Move a paper screen along the table to catch a sharp, clear flame image. (Note: For the eleventh-hour case 6 when the candle is between F and P, no real image can be projected on a screen. Look directly inside the mirror to find a magnified, virtual, and erect image!).
              </li>
            </ul>
          </div>

          {/* Table for Concave Mirror */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white print:break-inside-avoid print:my-4">
            <table className="min-w-full divide-y divide-slate-200 text-[10.5px] font-sans text-left">
              <thead className="bg-[#1e293b] text-white uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-3 py-2 text-[9.5px]">S.No</th>
                  <th className="px-3 py-2 text-[9.5px]">Object Position</th>
                  <th className="px-3 py-2 text-[9.5px]">Image Position</th>
                  <th className="px-3 py-2 text-[9.5px]">Relative Size</th>
                  <th className="px-3 py-2 text-[9.5px]">Nature of Image</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">1</td>
                  <td className="px-3 py-1.5 font-semibold">At Infinity (&infin;)</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">At Focus F</td>
                  <td className="px-3 py-1.5">Highly Diminished, Point-sized</td>
                  <td className="px-3 py-1.5 font-semibold text-red-650">Real & Inverted</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">2</td>
                  <td className="px-3 py-1.5 font-semibold">Beyond C (At u &gt; 2f)</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">Between F and C</td>
                  <td className="px-3 py-1.5">Diminished</td>
                  <td className="px-3 py-1.5 font-semibold text-red-650">Real & Inverted</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">3</td>
                  <td className="px-3 py-1.5 font-semibold">At C (At u = 2f)</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">At C</td>
                  <td className="px-3 py-1.5 font-bold text-slate-800">Same size as Object</td>
                  <td className="px-3 py-1.5 font-semibold text-red-650">Real & Inverted</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">4</td>
                  <td className="px-3 py-1.5 font-semibold">Between C and F</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">Beyond C</td>
                  <td className="px-3 py-1.5">Magnified (Enlarged)</td>
                  <td className="px-3 py-1.5 font-semibold text-red-650">Real & Inverted</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">5</td>
                  <td className="px-3 py-1.5 font-semibold">At Focus F (At u = f)</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">At Infinity (&infin;)</td>
                  <td className="px-3 py-1.5">Highly Magnified</td>
                  <td className="px-3 py-1.5 font-semibold text-red-650">Real & Inverted</td>
                </tr>
                <tr className="hover:bg-emerald-50 bg-emerald-50/20">
                  <td className="px-3 py-1.5 font-bold text-emerald-800">6</td>
                  <td className="px-3 py-1.5 font-black text-emerald-800">Between F and P</td>
                  <td className="px-3 py-1.5 text-emerald-750 font-bold">Behind the Mirror</td>
                  <td className="px-3 py-1.5 text-emerald-800 font-black">Magnified (Enlarged)</td>
                  <td className="px-3 py-1.5 font-black text-emerald-700">Virtual & Erect</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 pt-4 print:break-inside-avoid">
            <h4 className="text-xs sm:text-[13px] font-sans font-black uppercase text-slate-705 tracking-wider text-center">
              Concave Mirror Ray Diagrams (Standard Reference Cases A to F)
            </h4>
            <div className="flex flex-col gap-6 w-full mt-4">
              {MIRROR_CASES.slice(0, 6).map((c, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="flex-1 space-y-3">
                    <span className="inline-block text-[11px] font-black text-blue-800 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wide">
                      Case {String.fromCharCode(65 + idx)}: {c.label}
                    </span>
                    <p className="text-xs sm:text-[13px] text-slate-750 leading-relaxed font-sans font-medium">
                      {c.desc}
                    </p>
                  </div>
                  <div className="w-full max-w-full md:max-w-md shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                    <div className="w-full max-w-[420px]">
                      <DynamicRayDiagram 
                        type={c.type}
                        u={c.u}
                        f={c.f}
                        onLoadSimulator={onLoadSimulator}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-section 1.2: Image Formation by Convex Mirror */}
        <div className="space-y-4 pt-6 print:page-break-before">
          <h3 className="text-[13px] sm:text-sm font-sans font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
            Image Formation by Convex Mirror (Activity)
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            A convex mirror has an outwardly curved reflecting surface. It acts as a diverging mirror, spreading incident rays. Therefore, it always forms a virtual, erect, and diminished image behind the mirror, irrespective of the distance of the object from its reflective surface. This wide field of view makes it standard for automotive rear-view mirrors.
          </p>

          {/* Detailed Activity Box for Convex Mirror */}
          <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-4 space-y-3 print:break-inside-avoid shadow-2xs">
            <h4 className="text-xs font-sans font-bold uppercase text-emerald-800 tracking-wide flex items-center gap-2">
              <span className="bg-emerald-700 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold">NCERT Activity 10.6</span>
              Observe Image Formation by Convex Mirror
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              This activity explores how physical properties and scale behave consistently inside a convex reflecting medium.
            </p>
            <ul className="list-decimal pl-5 text-xs text-slate-750 space-y-2 leading-relaxed">
              <li>
                <b>Hold Mirror & Object:</b> Take a high-quality convex mirror in one hand. Hold a well-defined object like an upright pencil or a candle in the other hand.
              </li>
              <li>
                <b>Study the Image:</b> Peer into the convex mirror surface. Locate the image of the pencil or candle.
              </li>
              <li>
                <b>Observe Nature & Size:</b> Note that the physical image is formed upright (erect), diminished, and is located behind the reflecting surface (virtual).
              </li>
              <li>
                <b>Vary Distance:</b> Slowly slide the pencil or candle further away from the convex mirror. Observe how the image size dynamically shrinks, but remains strictly upright and virtual.
              </li>
              <li>
                <b>Examine Coverage:</b> Look past the immediate object to appreciate how a vast portion of the room is captured in a highly compact area. This wide-angle coverage underpins the standard usage of convex mirrors as rear-view mirrors in cars and road security hubs.
              </li>
            </ul>
          </div>

          {/* Table for Convex Mirror */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white print:break-inside-avoid print:my-4">
            <table className="min-w-full divide-y divide-slate-200 text-[10.5px] font-sans text-left">
              <thead className="bg-[#1e293b] text-white uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-3 py-2 text-[9.5px]">S.No</th>
                  <th className="px-3 py-2 text-[9.5px]">Object Position</th>
                  <th className="px-3 py-2 text-[9.5px]">Image Position</th>
                  <th className="px-3 py-2 text-[9.5px]">Relative Size</th>
                  <th className="px-3 py-2 text-[9.5px]">Nature of Image</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">1</td>
                  <td className="px-3 py-1.5 font-semibold">At Infinity (&infin;)</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">At Focus F behind Mirror</td>
                  <td className="px-3 py-1.5 font-medium">Highly Diminished, Point-sized</td>
                  <td className="px-3 py-1.5 font-black text-emerald-700">Virtual & Erect</td>
                </tr>
                <tr className="hover:bg-emerald-50 bg-emerald-50/10">
                  <td className="px-3 py-1.5 font-bold">2</td>
                  <td className="px-3 py-1.5 font-semibold">In Front (Between &infin; & P)</td>
                  <td className="px-3 py-1.5 text-emerald-750 font-bold">Between P and F behind Mirror</td>
                  <td className="px-3 py-1.5">Diminished</td>
                  <td className="px-3 py-1.5 font-black text-emerald-700">Virtual & Erect</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 pt-4 print:break-inside-avoid">
            <h4 className="text-xs sm:text-[13px] font-sans font-black uppercase text-slate-705 tracking-wider text-center">
              Convex Mirror Ray Diagrams (Standard Reference Cases G to H)
            </h4>
            <div className="flex flex-col gap-6 w-full mt-4">
              {MIRROR_CASES.slice(6, 8).map((c, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="flex-1 space-y-3">
                    <span className="inline-block text-[11px] font-black text-blue-800 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wide">
                      Case {String.fromCharCode(71 + idx)}: {c.label.replace('Convex: ', '')}
                    </span>
                    <p className="text-xs sm:text-[13px] text-slate-755 leading-relaxed font-sans font-medium">
                      {c.desc}
                    </p>
                  </div>
                  <div className="w-full max-w-full md:max-w-md shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                    <div className="w-full max-w-[420px]">
                      <DynamicRayDiagram 
                        type={c.type}
                        u={c.u}
                        f={c.f}
                        onLoadSimulator={onLoadSimulator}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: maths formulae */}
      <div className="space-y-4">
        <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">2. New Cartesian Sign Convention & Mirror Formula</h2>
        <ul className="list-disc pl-6 text-sm space-y-3.5 text-slate-800 font-sans">
          <li className="print:break-inside-avoid">
            <b>New Cartesian Sign Convention (Core Principles):</b>
            <p className="text-xs text-slate-600 mt-1 mb-2 leading-relaxed">
              To perform accurate quantitative mirror-related calculations, we must apply Cartesian Coordinate geometry rules under the following instructions:
            </p>
            <ul className="list-[circle] pl-6 space-y-1.5 text-xs text-slate-605">
              <li>The <b>Pole (P)</b> of the mirror behaves mathematically as the <b>Origin (0,0)</b>.</li>
              <li>The object is always placed <b>on the left side</b> of the mirror, implying that incident rays always travel from left to right.</li>
              <li>All distances measured along the principal axis <b>to the right</b> of the origin (direction of incident light) are taken as <b>Positive (+)</b>.</li>
              <li>All distances measured along the principal axis <b>to the left</b> of the origin (opposite to incident light direction) are taken as <b>Negative (-)</b>. Hence, the object distance (<code className="font-sans font-bold">u</code>) is <b>always negative</b> in standard physics numericals.</li>
              <li>Heights measured perpendicular to and <b>above</b> the principal axis are taken as <b>Positive (+)</b>.</li>
              <li>Heights measured perpendicular to and <b>below</b> the principal axis are taken as <b>Negative (-)</b>.</li>
              <li><b>Focal Length Rules:</b> Focal length (<code className="font-sans font-bold">f</code>) of a <b>concave mirror is always negative</b>, while the focal length (<code className="font-sans font-bold">f</code>) of a <b>convex mirror is always positive</b>.</li>
            </ul>

            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white my-3 print:break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
              <table className="min-w-full divide-y divide-slate-200 text-[10px] font-sans text-left">
                <thead className="bg-[#0f171a] text-white uppercase tracking-wider font-bold">
                  <tr>
                    <th className="px-3 py-2">Optical Element</th>
                    <th className="px-3 py-2">Focal Length (f)</th>
                    <th className="px-3 py-2">Object Dist (u)</th>
                    <th className="px-3 py-2">Image Dist (v)</th>
                    <th className="px-3 py-2">Object Ht (hₒ)</th>
                    <th className="px-3 py-2">Image Ht (hᵢ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-1.5 font-bold text-slate-900">Concave Mirror</td>
                    <td className="px-3 py-1.5 font-semibold text-rose-600">Negative (-)</td>
                    <td className="px-3 py-1.5 font-semibold text-rose-600">Always Negative (-)</td>
                    <td className="px-3 py-1.5 font-medium"><b>Negative (-)</b> (Real image)<br/><b>Positive (+)</b> (Virtual image)</td>
                    <td className="px-3 py-1.5 font-semibold text-emerald-600">Always Positive (+)</td>
                    <td className="px-3 py-1.5 font-medium"><b>Negative (-)</b> (Inverted)<br/><b>Positive (+)</b> (Erect)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-1.5 font-bold text-slate-900">Convex Mirror</td>
                    <td className="px-3 py-1.5 font-semibold text-emerald-600">Positive (+)</td>
                    <td className="px-3 py-1.5 font-semibold text-rose-600">Always Negative (-)</td>
                    <td className="px-3 py-1.5 font-semibold text-emerald-600">Always Positive (+)</td>
                    <td className="px-3 py-1.5 font-semibold text-emerald-600">Always Positive (+)</td>
                    <td className="px-3 py-1.5 font-semibold text-emerald-600">Always Positive (+) (Erect, diminished)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li>
            <b>Mirror Formula:</b> The mathematical equation establishing the quantitative relation between focal length (<code className="font-sans font-bold">f</code>), object distance (<code className="font-sans font-bold">u</code>), and image distance (<code className="font-sans font-bold">v</code>):
            <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
              <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold">
                <Fraction num="1" den={<span className="font-sans font-bold">f</span>} />
                <span>=</span>
                <Fraction num="1" den={<span className="font-sans font-bold">v</span>} />
                <span>+</span>
                <Fraction num="1" den={<span className="font-sans font-bold">u</span>} />
              </div>
            </div>
          </li>
          <li>
            <b>Key Coordinate Variables:</b>
            <div className="grid grid-cols-3 gap-2 text-xs font-sans p-2 bg-slate-50 border border-slate-200 rounded-lg text-center mt-1 text-slate-700">
              <div><b>f:</b> focal length</div>
              <div><b>u:</b> object distance</div>
              <div><b>v:</b> image distance</div>
            </div>
          </li>
          <li>
            <b>Linear Magnification (m):</b> The ratio of the height of the image (<code className="font-sans font-bold">hᵢ</code>) relative to the height of the object (<code className="font-sans font-bold">hₒ</code>):
            <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
              <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold flex-wrap justify-center">
                <span>m =</span>
                <Fraction num={<span>hᵢ</span>} den={<span>hₒ</span>} />
                <span>= -</span>
                <Fraction num="v" den="u" />
              </div>
            </div>
          </li>
          <li>
            <b>Magnification Signs:</b>
            <ul className="list-[circle] pl-6 mt-1 space-y-1 text-xs text-slate-600">
              <li>A <b>negative</b> magnification value represents a <b>Real and Inverted</b> image.</li>
              <li>A <b>positive</b> magnification value represents a <b>Virtual and Erect</b> image.</li>
            </ul>
          </li>
        </ul>
      </div>

      {/* SECTION 3: refraction */}
      <div className="space-y-4 print:pt-6">
        <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">3. Refraction of Light & Snell's Law</h2>
        <ul className="list-disc pl-6 text-sm space-y-3.5 text-slate-800 font-sans">
          <li>
            <b>Refraction of Light:</b> The physical phenomenon of light rays bending (deviating) as they pass obliquely from one transparent medium to another due to transition speed changes.
          </li>
          <li className="space-y-3 bg-slate-50 p-4 border border-slate-200 rounded-xl leading-relaxed text-xs text-slate-800 print:break-inside-avoid">
            <div className="font-black text-slate-950 block text-[13.5px] sm:text-sm uppercase tracking-wide border-b border-slate-200 pb-1.5 flex items-center gap-1.5">💡 Why does Light change speed and bend? (In Plain Words):</div>
            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <b className="text-slate-900 block">1. Why does Light slow down in Glass or Water? (The "Crowded Corridor" Concept)</b>
                <p className="mt-1 text-slate-600 leading-relaxed">
                  In blank open space (a vacuum), light has zero obstacles and zooms forward at its ultimate top speed of <b>3,00,000 kilometers per second</b>. 
                  However, glass, water, and plastic are packed with billions of atoms. When a light wave enters these materials, it keeps bumping into these atoms. 
                  These atoms catch the light energy momentarily, hold it for a tiny fraction of a split-second, and then release it, passing it on. 
                  This continuous cycle of catching and throwing the light acts as tiny delays along the path. 
                  Just like a runner who is forced to slow down when running through a crowded, busy store compared to an empty park, the collective journey of the light wave slows down!
                </p>
              </div>
              <div>
                <b className="text-slate-900 block">2. Why does changing speed cause Light to bend? (The "Toy Car on Carpet" Concept)</b>
                <p className="mt-1 text-slate-600 leading-relaxed">
                  When a flat light beam strikes a transparent material (like a glass block) at an angle, different edges of the wavefront hit the material at different times:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                  <li>The edge of the light beam that enters the glass first gets slowed down immediately.</li>
                  <li>The remaining edge of the beam is still moving fast through the air outside.</li>
                  <li>This speed difference between the two sides of the wavefront causes the beam to <b>pivot and turn</b>, changing its heading.</li>
                </ul>
                <p className="mt-2 font-medium text-slate-800 bg-slate-100/50 p-2.5 rounded-lg border border-slate-200">
                  <b>🚗 Easy Analogy:</b> Imagine rolling a toy car at an angle from a smooth tile floor onto a thick hairy rug. 
                  As soon as the front-right wheel rolls onto the rug, it slows down. Since the front-left wheel is still turning super fast on the slick tile, 
                  the toy car instantly swings and turns towards the rug! This is exactly what we call <b>refraction (bending)</b>.
                </p>
              </div>
            </div>
          </li>
          <li className="print:break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <b>Laws of Refraction:</b>
            <ul className="list-[circle] pl-6 mt-1 space-y-1 text-xs text-slate-600 font-sans">
              <li>The incident ray, normal, and refracted ray at the dividing interface all lie in the same mathematical plane.</li>
              <li>The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant for a given pair of media.</li>
            </ul>
          </li>
          <li>
            <b>Snell's Law:</b> Expressed mathematically as:
            <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
              <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold flex-wrap justify-center">
                <Fraction num={<span>sin i</span>} den={<span>sin r</span>} />
                <span>= constant = &mu;<sub>21</sub> =</span>
                <Fraction num={<span>v<sub>1</sub></span>} den={<span>v<sub>2</sub></span>} />
                <span>=</span>
                <Fraction num={<span>&mu;<sub>2</sub></span>} den={<span>&mu;<sub>1</sub></span>} />
              </div>
            </div>
          </li>
          <li>
            <b>Refractive Index (&mu;):</b> The measure of optical density, defined as the ratio of speed of light in vacuum (<code className="font-sans text-slate-900">&mu;</code>) to speed of light in medium (<code className="font-sans text-slate-900">v</code>):
            <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
              <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold">
                <span>&mu; =</span>
                <Fraction num="c" den="v" />
                <span className="text-xs text-slate-500 font-normal ml-2">(where c &approx; 3 &times; 10&sup8; m/s)</span>
              </div>
            </div>
          </li>
        </ul>

        {/* Glass Slab Refraction Diagram */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 max-w-full">
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-2 text-center">Refraction of Light Through a Rectangular Glass Slab</span>
          <svg viewBox="0 0 500 280" className="w-full max-w-[500px] bg-white h-auto rounded border border-slate-100 p-2">
            {/* Air-Glass boundary */}
            <rect x="80" y="90" width="340" height="110" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.8" rx="4" />
            
            {/* Glass Slab Labels placed cleanly on the right side of the slab away from all rays */}
            <text x="340" y="145" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#0369a1" textAnchor="middle">Glass Slab</text>
            <text x="340" y="160" fontSize="8.5" fontFamily="sans-serif" fill="#64748b" textAnchor="middle">(n₂ = 1.5)</text>
            
            {/* Air mediums placed cleanly on far left and right to prevent ray overlapping */}
            <text x="340" y="35" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold" fill="#475569" letterSpacing="0.5" textAnchor="middle">Air Medium (n₁ = 1.0)</text>
            <text x="40" y="245" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold" fill="#475569" letterSpacing="0.5">Air Medium (n₃ = 1.0)</text>
            
            {/* Normals */}
            <line x1="180" y1="20" x2="180" y2="260" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="185" y="35" fontSize="8" fill="#64748b" fontFamily="sans-serif" fontWeight="bold">N</text>
            <text x="185" y="255" fontSize="8" fill="#64748b" fontFamily="sans-serif" fontWeight="bold">N'</text>

            <line x1="240" y1="20" x2="240" y2="260" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="245" y="35" fontSize="8" fill="#64748b" fontFamily="sans-serif" fontWeight="bold">M</text>
            <text x="245" y="255" fontSize="8" fill="#64748b" fontFamily="sans-serif" fontWeight="bold">M'</text>

            {/* Rays */}
            {/* Incident Ray */}
            <line x1="90" y1="20" x2="180" y2="90" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="129.4,55.8 141.3,59.9 134.2,49.4" fill="#10b981" />
            <text x="80" y="25" fontSize="8.5" fill="#047857" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">Incident Ray</text>
            
            {/* Refracted Ray - placed completely to the left, inside the slab, away from the normal */}
            <line x1="180" y1="90" x2="240" y2="200" stroke="#f15922" strokeWidth="2.5" />
            <polygon points="204.6,143.4 213.8,152 211.6,139.6" fill="#f15922" />
            <text x="130" y="145" fontSize="8.5" fill="#c2410c" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Refracted Ray</text>

            {/* Emergent Ray */}
            <line x1="240" y1="200" x2="317" y2="260" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="272.9,230.8 284.8,234.9 277.7,224.4" fill="#10b981" />
            <text x="340" y="245" fontSize="8.5" fill="#047857" fontWeight="bold" fontFamily="sans-serif" textAnchor="start">Emergent Ray</text>

            {/* Extended Incident Ray Path */}
            <line x1="180" y1="90" x2="321" y2="200" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 4" />
            <line x1="321" y1="200" x2="398" y2="260" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 4" />
            <text x="280" y="155" fontSize="7.5" fill="#64748b" fontFamily="sans-serif" fontStyle="italic" transform="rotate(38, 280, 155)" textAnchor="middle">Actual Incident Ray (Original Path)</text>

            {/* Lateral Shift (d) */}
            <line x1="275" y1="227" x2="298" y2="200" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="275" cy="227" r="2" fill="#ef4444" />
            <circle cx="298" cy="200" r="2" fill="#ef4444" />
            <text x="281" y="210" fontSize="8" fill="#ef4444" fontWeight="bold">d</text>
            <text x="315" y="185" fontSize="8.5" fill="#ef4444" fontWeight="bold" fontFamily="sans-serif">Lateral Shift (d)</text>

            {/* Angle markers */}
            {/* Angle i (incidence) */}
            <path d="M 180,60 A 30,30 0 0,0 152,65" fill="none" stroke="#10b981" strokeWidth="1.2" />
            <text x="163" y="54" fontSize="8" fill="#10b981" fontWeight="extrabold">i</text>

            {/* Angle r (refraction) */}
            <path d="M 180,120 A 30,30 0 0,0 193,114" fill="none" stroke="#f15922" strokeWidth="1.2" />
            <text x="188" y="128" fontSize="8" fill="#f15922" fontWeight="extrabold">r</text>

            {/* Angle e (emergence) */}
            <path d="M 240,230 A 30,30 0 0,0 268,222" fill="none" stroke="#10b981" strokeWidth="1.2" />
            <text x="252" y="238" fontSize="8" fill="#10b981" fontWeight="extrabold">e</text>
          </svg>
        </div>
      </div>

      {/* SECTION 4: lenses, lens formula */}
      <div className="space-y-4">
        <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">4. Spherical Lenses & Power of Lens</h2>
        <ul className="list-disc pl-6 text-sm space-y-3.5 text-slate-800 font-sans">
          <li>
            <b>Spherical Lens:</b> A transparent optical medium bound by two surfaces, of which at least one surface is spherical.
          </li>
          <li>
            <b>Lens Formula:</b> The relation between image distance (<code className="font-sans font-bold">v</code>), object distance (<code className="font-sans font-bold">u</code>), and focal length (<code className="font-sans font-bold">f</code>):
            <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
              <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold">
                <Fraction num="1" den={<span className="font-sans font-bold">f</span>} />
                <span>=</span>
                <Fraction num="1" den={<span className="font-sans font-bold">v</span>} />
                <span>-</span>
                <Fraction num="1" den={<span className="font-sans font-bold">u</span>} />
              </div>
            </div>
          </li>
          <li>
            <b>Lens Magnification (m):</b> Defined as the ratio of image height (<code className="font-sans font-bold">hᵢ</code>) to object height (<code className="font-sans font-bold">hₒ</code>):
            <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
              <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold flex-wrap justify-center">
                <span>m =</span>
                <Fraction num={<span>hᵢ</span>} den={<span>hₒ</span>} />
                <span>=</span>
                <Fraction num="v" den="u" />
              </div>
            </div>
          </li>
          <li className="print:break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <b>Power of a Lens (P):</b> The quantitative measure of convergence or divergence a lens introduces on incident light rays. It is equal to the reciprocal of focal length:
            <div className="flex justify-center items-center py-4 bg-slate-50 border border-slate-200 rounded-xl my-2">
              <div className="flex items-center gap-1 font-sans text-slate-900 text-sm font-bold flex-wrap justify-center">
                <span>P =</span>
                <Fraction num="1" den={<span className="font-sans font-bold">f (in meters)</span>} />
                <span>=</span>
                <Fraction num="100" den={<span className="font-sans font-bold">f (in cm)</span>} />
              </div>
            </div>
          </li>
          <li>
            <b>Unit of Power:</b> The <b>Dioptre (D)</b>. A convex (converging) lens has positive power, while a concave (diverging) lens has negative power.
          </li>
        </ul>

        {/* Sub-section 4.1: Image Formation by Convex Lens */}
        <div className="space-y-4 pt-4">
          <h3 className="text-[13px] sm:text-sm font-sans font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
            Image Formation by Convex Lens (Activity)
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            A convex lens is thicker in the middle than at the edges and acts as a converging lens. It bends incoming parallel light rays inward toward a common focal point. Similar to concave mirrors, convex lenses produce both real and inverted images of varying sizes (depending on the object's relative proximity to F₁ and 2F₁), and a virtual, erect, and magnified image when placed inside the focal point (between F₁ and O).
          </p>

          {/* Detailed Activity Box for Convex Lens */}
          <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-4 space-y-3 print:break-inside-avoid shadow-2xs">
            <h4 className="text-xs font-sans font-bold uppercase text-emerald-800 tracking-wide flex items-center gap-2">
              <span className="bg-emerald-700 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold">NCERT Activity 10.11</span>
              Observe Image Formation by Convex Lens
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              This activity explores how changing the object distance relative to a convex lens's principal focus shifts the position and properties of refractive image focus.
            </p>
            <ul className="list-decimal pl-5 text-xs text-slate-750 space-y-2 leading-relaxed">
              <li>
                <b>Find Focal Length:</b> Determine the approximate focal length ($f$) of the convex lens by focusing distant sunlight or a tree onto a paper screen until a sharp bright point is formed.
              </li>
              <li>
                <b>Draw axis line:</b> Draw a straight chalk line on a table. Mark its center as the Optical Center (O). From O, mark focal points F₁ and F₂ on both sides, as well as 2F₁ and 2F₂ points at exactly double the distance ($2f$).
              </li>
              <li>
                <b>Mount Lens:</b> Secure the convex lens on a vertical stand positioned exactly over the optical center (O).
              </li>
              <li>
                <b>Position Candle:</b> Place a burning candle at several sequential locations:
                <div className="mt-1.5 grid grid-cols-2 gap-2 text-slate-650 font-medium">
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 1. At Infinity</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 2. Beyond 2F₁</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 3. At 2F₁</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 4. Between F₁ and 2F₁</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 5. At Focus F₁</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 6. Between F₁ and O</div>
                </div>
              </li>
              <li>
                <b>Image Capturing:</b> Mount a paper screen on the opposite side of the lens and move it until you get a sharp, focused image of the candle flame. For Case 6, no real image forms; peer from the opposite side directly through the lens to find the enlarged virtual image!
              </li>
            </ul>
          </div>

          {/* Table for Convex Lens */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white print:break-inside-avoid print:my-4">
            <table className="min-w-full divide-y divide-slate-200 text-[10.5px] font-sans text-left">
              <thead className="bg-[#1e293b] text-white uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-3 py-2 text-[9.5px]">S.No</th>
                  <th className="px-3 py-2 text-[9.5px]">Object Position</th>
                  <th className="px-3 py-2 text-[9.5px]">Image Position</th>
                  <th className="px-3 py-2 text-[9.5px]">Relative Size</th>
                  <th className="px-3 py-2 text-[9.5px]">Nature of Image</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">1</td>
                  <td className="px-3 py-1.5 font-semibold">At Infinity (&infin;)</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">At Focus F₂</td>
                  <td className="px-3 py-1.5">Highly Diminished, Point-sized</td>
                  <td className="px-3 py-1.5 font-semibold text-red-650">Real & Inverted</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">2</td>
                  <td className="px-3 py-1.5 font-semibold">Beyond 2F₁ (u &gt; 2f)</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">Between F₂ and 2F₂</td>
                  <td className="px-3 py-1.5">Diminished</td>
                  <td className="px-3 py-1.5 font-semibold text-red-650">Real & Inverted</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">3</td>
                  <td className="px-3 py-1.5 font-semibold">At 2F₁ (u = 2f)</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">At 2F₂</td>
                  <td className="px-3 py-1.5 font-bold text-slate-800">Same size as Object</td>
                  <td className="px-3 py-1.5 font-semibold text-red-650">Real & Inverted</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">4</td>
                  <td className="px-3 py-1.5 font-semibold">Between F₁ and 2F₁</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">Beyond 2F₂</td>
                  <td className="px-3 py-1.5">Magnified (Enlarged)</td>
                  <td className="px-3 py-1.5 font-semibold text-red-650">Real & Inverted</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">5</td>
                  <td className="px-3 py-1.5 font-semibold">At Focus F₁ (u = f)</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">At Infinity (&infin;)</td>
                  <td className="px-3 py-1.5">Highly Magnified</td>
                  <td className="px-3 py-1.5 font-semibold text-red-650">Real & Inverted</td>
                </tr>
                <tr className="hover:bg-emerald-50 bg-emerald-50/20">
                  <td className="px-3 py-1.5 font-bold text-emerald-800">6</td>
                  <td className="px-3 py-1.5 font-black text-emerald-800">Between F₁ and O</td>
                  <td className="px-3 py-1.5 text-emerald-750 font-bold">On Same Side as Object</td>
                  <td className="px-3 py-1.5 text-emerald-800 font-black">Magnified (Enlarged)</td>
                  <td className="px-3 py-1.5 font-black text-emerald-700">Virtual & Erect</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 pt-4 print:break-inside-avoid">
            <h4 className="text-xs sm:text-[13px] font-sans font-black uppercase text-slate-705 tracking-wider text-center">
              Convex Lens Ray Diagrams (Standard Reference Cases A to F)
            </h4>
            <div className="flex flex-col gap-6 w-full mt-4">
              {LENS_CASES.slice(0, 6).map((c, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="flex-1 space-y-3">
                    <span className="inline-block text-[11px] font-black text-blue-800 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wide">
                      Case {String.fromCharCode(65 + idx)}: {c.label}
                    </span>
                    <p className="text-xs sm:text-[13px] text-slate-750 leading-relaxed font-sans font-medium">
                      {c.desc}
                    </p>
                  </div>
                  <div className="w-full max-w-full md:max-w-md shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                    <div className="w-full max-w-[420px]">
                      <DynamicRayDiagram 
                        type={c.type}
                        u={c.u}
                        f={c.f}
                        onLoadSimulator={onLoadSimulator}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-section 4.2: Image Formation by Concave Lens */}
        <div className="space-y-4 pt-6 print:page-break-before">
          <h3 className="text-[13px] sm:text-sm font-sans font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
            Image Formation by Concave Lens (Activity)
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            A concave lens is thinner in the middle than at the edges and acts as a diverging lens. It refracts incoming parallel light rays outward, causing them to spread apart. Because the refracted rays never converge physically on the opposite side, the image is formed by extending diverging rays backward. Therefore, a concave lens always produces a virtual, erect, and diminished image on the same side as the object, regardless of where the object is placed.
          </p>

          {/* Detailed Activity Box for Concave Lens */}
          <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-4 space-y-3 print:break-inside-avoid shadow-2xs">
            <h4 className="text-xs font-sans font-bold uppercase text-emerald-800 tracking-wide flex items-center gap-2">
              <span className="bg-emerald-700 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold">NCERT Activity 10.12</span>
              Observe Image Formation by Concave Lens
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              This activity explores how physical properties and scale behave consistently inside a concave diverging refracting medium.
            </p>
            <ul className="list-decimal pl-5 text-xs text-slate-750 space-y-2 leading-relaxed">
              <li>
                <b>Hold Lens & Object:</b> Take a high-quality concave lens in one hand. Hold a well-defined object like an upright pencil or a candle in the other hand.
              </li>
              <li>
                <b>Study the Image:</b> Peer through the concave lens at the pencil or candle.
              </li>
              <li>
                <b>Observe Nature & Size:</b> Note that the image observed is always formed upright (erect), highly diminished, and is located on the same side as the object (virtual).
              </li>
              <li>
                <b>Vary Distance:</b> Slowly move the pencil or candle further away from the concave lens. Observe how the image size progressively shrinks, but remains strictly upright, virtual, and diminished.
              </li>
              <li>
                <b>Conclusions:</b> Recognize that unlike a convex lens, a concave lens never produces real images, serving as a reliable diverging focal reference.
              </li>
            </ul>
          </div>

          {/* Table for Concave Lens */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white print:break-inside-avoid print:my-4">
            <table className="min-w-full divide-y divide-slate-200 text-[10.5px] font-sans text-left">
              <thead className="bg-[#1e293b] text-white uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-3 py-2 text-[9.5px]">S.No</th>
                  <th className="px-3 py-2 text-[9.5px]">Object Position</th>
                  <th className="px-3 py-2 text-[9.5px]">Image Position</th>
                  <th className="px-3 py-2 text-[9.5px]">Relative Size</th>
                  <th className="px-3 py-2 text-[9.5px]">Nature of Image</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 font-bold">1</td>
                  <td className="px-3 py-1.5 font-semibold">At Infinity (&infin;)</td>
                  <td className="px-3 py-1.5 text-blue-700 font-medium">At Focus F₁</td>
                  <td className="px-3 py-1.5 font-medium">Highly Diminished, Point-sized</td>
                  <td className="px-3 py-1.5 font-black text-emerald-700">Virtual & Erect</td>
                </tr>
                <tr className="hover:bg-emerald-50 bg-emerald-50/10">
                  <td className="px-3 py-1.5 font-bold">2</td>
                  <td className="px-3 py-1.5 font-semibold">In Front (Between &infin; & O)</td>
                  <td className="px-3 py-1.5 text-emerald-750 font-bold">Between F₁ and O</td>
                  <td className="px-3 py-1.5">Diminished</td>
                  <td className="px-3 py-1.5 font-black text-emerald-700">Virtual & Erect</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 pt-4 print:break-inside-avoid">
            <h4 className="text-xs sm:text-[13px] font-sans font-black uppercase text-slate-705 tracking-wider text-center">
              Concave Lens Ray Diagrams (Standard Reference Cases G to H)
            </h4>
            <div className="flex flex-col gap-6 w-full mt-4">
              {LENS_CASES.slice(6, 8).map((c, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="flex-1 space-y-3">
                    <span className="inline-block text-[11px] font-black text-blue-800 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wide">
                      Case {String.fromCharCode(71 + idx)}: {c.label.replace('Concave: ', '')}
                    </span>
                    <p className="text-xs sm:text-[13px] text-slate-755 leading-relaxed font-sans font-medium">
                      {c.desc}
                    </p>
                  </div>
                  <div className="w-full max-w-full md:max-w-md shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                    <div className="w-full max-w-[420px]">
                      <DynamicRayDiagram 
                        type={c.type}
                        u={c.u}
                        f={c.f}
                        onLoadSimulator={onLoadSimulator}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: cartesian rule */}
      <div className="space-y-4 print:pt-6">
        <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">5. New Cartesian Sign Convention Guide</h2>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700 leading-relaxed font-sans">
          <p className="font-bold text-slate-900">Core Cartesian Coordinates Principle:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[11px]">
            <li>The <b>pole (P) of a spherical mirror</b> (or optical center <b>O</b> of a lens) serves as the <b>Origin (0,0)</b> of coordinates.</li>
            <li>The <b>principal axis</b> of the system is aligned with the horizontal <b>X-axis</b>.</li>
            <li>All light rays are assumed of travelling specifically <b>from left to right</b>.</li>
            <li>Consequently, distances measured in the direction of the incident light are taken as <b>Positive (+)</b>, while distances measured against the direction of the incident light are taken as <b>Negative (-)</b>.</li>
            <li>Heights measured upward and perpendicular to the principal axis are taken as <b>Positive (+)</b>, whereas downward heights are taken as <b>Negative (-)</b>.</li>
          </ul>
        </div>
        <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white print:break-inside-avoid print:my-4">
          <table className="min-w-full divide-y divide-slate-300 font-sans text-xs border-none">
            <thead className="bg-[#1e293b] text-white uppercase tracking-wider font-bold">
              <tr>
                <th className="px-4 py-3 text-left font-sans text-[10px]">Parameter</th>
                <th className="px-4 py-3 text-left font-sans text-[10px]">Concave Mirror</th>
                <th className="px-4 py-3 text-left font-sans text-[10px]">Convex Mirror</th>
                <th className="px-4 py-3 text-left font-sans text-[10px]">Convex Lens</th>
                <th className="px-4 py-3 text-left font-sans text-[10px]">Concave Lens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800 font-sans">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-sans font-bold bg-slate-50">Focal Length (f)</td>
                <td className="px-4 py-2.5 text-red-700 font-semibold text-center">Negative (-)</td>
                <td className="px-4 py-2.5 text-emerald-700 font-semibold text-center">Positive (+)</td>
                <td className="px-4 py-2.5 text-emerald-700 font-semibold text-center">Positive (+)</td>
                <td className="px-4 py-2.5 text-red-700 font-semibold text-center">Negative (-)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-sans font-bold bg-slate-50">Object Distance (u)</td>
                <td className="px-4 py-2.5 text-red-700 font-semibold text-center">Negative (-)</td>
                <td className="px-4 py-2.5 text-red-700 font-semibold text-center">Negative (-)</td>
                <td className="px-4 py-2.5 text-red-700 font-semibold text-center">Negative (-)</td>
                <td className="px-4 py-2.5 text-red-700 font-semibold text-center">Negative (-)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-sans font-bold bg-slate-50">Image Distance (v)</td>
                <td className="px-4 py-2.5 text-center text-slate-700 font-medium">Negative (Real) / Positive (Virtual)</td>
                <td className="px-4 py-2.5 text-emerald-700 font-semibold text-center">Positive (+) [Virtual]</td>
                <td className="px-4 py-2.5 text-center text-slate-700 font-medium">Positive (Real) / Negative (Virtual)</td>
                <td className="px-4 py-2.5 text-red-700 font-semibold text-center">Negative (-) [Virtual]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 6: The Human Eye */}
      <div className="space-y-4 print:pt-6">
        <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">6. The Human Eye & Power of Accommodation</h2>
        <ul className="list-disc pl-6 text-sm space-y-3 text-slate-800 font-sans">
          <li>
            <b>The Human Eye:</b> A sensitive and valuable sense organ that acts as an organic camera system, projecting real and inverted images of external objects onto a light-sensitive screen called the retina.
          </li>
          <li>
            <b>Cornea:</b> A thin, transparent membrane forming a bulge on the front surface of the eyeball, where most refraction of light entering the eye occurs. Eyeball diameter is roughly 2.3 cm.
          </li>
          <li>
            <b>Crystalline Lens:</b> A double-convex, jelly-like fibrous structure that provides the fine focal adjustments required to focus objects at varying distances onto the retina.
          </li>
          <li>
            <b>Iris:</b> A dark, muscular diaphragm located behind the cornea that dynamically expands or contracts to control the precise diameter of the pupil aperture.
          </li>
          <li>
            <b>Pupil:</b> The central circular opening that regulates the total amount of light entering the eyeball:
            <ul className="list-[circle] pl-6 mt-1 space-y-1 text-xs text-slate-600">
              <li>In bright light, the pupil contracts to prevent cellular light damage.</li>
              <li>In dim light, the pupil expands through iris relaxation to maximize light collection.</li>
            </ul>
          </li>
          <li>
            <b>Retina & Optic Nerve:</b> The retina is a delicate rear lining filled with light-sensitive cells that generate electrical signals upon illumination, which are transmitted to the brain via the optic nerve.
          </li>
          <li>
            <b>Power of Accommodation:</b> The natural fluid mechanical ability of the eye lens to vary its focal length dynamically using the surrounding ciliary muscles to focus both near and far objects.
          </li>
          <li>
            <b>Ciliary Muscle Action:</b>
            <ul className="list-[circle] pl-6 mt-1 space-y-1.5 text-xs text-slate-600">
              <li><b>Relaxed:</b> Makes the crystalline lens thin and flat, increasing focal length for looking at distant objects comfortably.</li>
              <li><b>Contracted:</b> Makes the lens convex and thick, decreasing focal length for looking at nearby objects.</li>
            </ul>
          </li>
          <li>
            <b>Visual Range Limits:</b>
            <ul className="list-[circle] pl-6 mt-1 space-y-1.5 text-xs text-slate-600">
              <li><b>Near Point:</b> The minimum distance for comfort without any visual strain, which is exactly 25 cm for a healthy adult.</li>
              <li><b>Far Point:</b> The maximum distance up to which an eye can see clearly, which is at infinity.</li>
            </ul>
          </li>
          <li>
            <b>Cataract:</b> An age-related progressive clouding of the crystalline lens, making it milky and hazy, resulting in vision loss that is restored safely via modern surgical implants.
          </li>
        </ul>

        {/* Human Eye Textbook Diagram embedded */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 max-w-full print:break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-2 text-center">Structure of the Human Eye (Easy Exam Sketch Guide)</span>
          <svg viewBox="0 0 400 240" className="w-full max-w-[440px] bg-white h-auto rounded border border-slate-100 p-2">
            <defs>
              <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4">
                <circle cx="5" cy="5" r="5" fill="#475569" />
              </marker>
            </defs>
            
            {/* Eyeball outer wall */}
            <path d="M 160,75 A 60,60 0 1,1 160,165" fill="#f8fafc" stroke="#000000" strokeWidth="2" />
            {/* Cornea bulge */}
            <path d="M 160,75 C 115,75 115,165 160,165" fill="#f8fafc" stroke="#000000" strokeWidth="2" />
            
            {/* Crystalline Lens */}
            <path d="M 185,95 C 192,105 192,135 185,145 C 178,135 178,105 185,95 Z" fill="#f0fdffa0" stroke="#000000" strokeWidth="1.5" />
            
            {/* Ciliary Muscles */}
            <path d="M 185,72 C 185,82 182,85 185,95" fill="none" stroke="#000000" strokeWidth="1.5" />
            <path d="M 185,168 C 185,158 182,155 185,145" fill="none" stroke="#000000" strokeWidth="1.5" />
            
            {/* Iris */}
            <line x1="162" y1="76" x2="180" y2="105" stroke="#000000" strokeWidth="3" />
            <line x1="162" y1="164" x2="180" y2="135" stroke="#000000" strokeWidth="3" />
            
            {/* Optic Nerve exit */}
            <path d="M 215,153 C 225,158 238,172 245,185 M 205,158 C 215,165 228,178 234,192" fill="none" stroke="#000000" strokeWidth="2" />
            {/* Erase visual overlap at gap */}
            <path d="M 210,154 Q 212,156 215,158" stroke="#f8fafc" strokeWidth="4" />
            
            {/* Light rays entry */}
            <g stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" fill="none">
              {/* Ray 1 */}
              <path d="M 50,110 L 132,110 L 185,114 L 260,120" />
              {/* Ray 2 */}
              <path d="M 50,130 L 132,130 L 185,126 L 260,120" />
            </g>
            
            {/* Focus point on retina */}
            <circle cx="260" cy="120" r="3" fill="#ef4444" />
            <text x="256" y="113" fontSize="8" fontFamily="sans-serif" fontWeight="bold" fill="#ef4444" textAnchor="end">Retinal Focus</text>
            
            {/* Pointer labels */}
            {/* 1. Cornea */}
            <path d="M 125,120 L 90,120 L 80,95" fill="none" stroke="#475569" strokeWidth="0.8" markerStart="url(#dot)" />
            <text x="75" y="93" fontSize="9" fontFamily="sans-serif" textAnchor="end" fill="#1e293b" fontWeight="bold">Cornea</text>
            
            {/* 2. Iris */}
            <path d="M 168,90 L 115,90 L 105,65" fill="none" stroke="#475569" strokeWidth="0.8" markerStart="url(#dot)" />
            <text x="100" y="63" fontSize="9" fontFamily="sans-serif" textAnchor="end" fill="#1e293b" fontWeight="bold">Iris</text>
            
            {/* 3. Pupil */}
            <path d="M 172,120 L 120,120 L 110,145" fill="none" stroke="#475569" strokeWidth="0.8" markerStart="url(#dot)" />
            <text x="105" y="152" fontSize="9" fontFamily="sans-serif" textAnchor="end" fill="#1e293b" fontWeight="bold">Pupil</text>
            
            {/* 4. Crystalline Lens */}
            <path d="M 188,115 L 220,115 L 235,90" fill="none" stroke="#475569" strokeWidth="0.8" markerStart="url(#dot)" />
            <text x="240" y="88" fontSize="9" fontFamily="sans-serif" textAnchor="start" fill="#1e293b" fontWeight="bold">Crystalline Lens</text>
            
            {/* 5. Ciliary Muscles */}
            <path d="M 185,82 L 220,82 L 230,55" fill="none" stroke="#475569" strokeWidth="0.8" markerStart="url(#dot)" />
            <text x="235" y="53" fontSize="9" fontFamily="sans-serif" textAnchor="start" fill="#1e293b" fontWeight="bold">Ciliary Muscle</text>
            
            {/* 6. Retina */}
            <path d="M 245,100 L 260,100 L 275,125" fill="none" stroke="#475569" strokeWidth="0.8" markerStart="url(#dot)" />
            <text x="280" y="132" fontSize="9" fontFamily="sans-serif" textAnchor="start" fill="#1e293b" fontWeight="bold">Retina (Screen)</text>
            
            {/* 7. Optic Nerve */}
            <path d="M 225,170 L 255,170 L 265,150" fill="none" stroke="#475569" strokeWidth="0.8" markerStart="url(#dot)" />
            <text x="270" y="148" fontSize="9" fontFamily="sans-serif" textAnchor="start" fill="#1e293b" fontWeight="bold">Optic Nerve</text>

            {/* 8. Aqueous Humour */}
            <path d="M 145,120 L 110,120 L 100,110" fill="none" stroke="#475569" strokeWidth="0.8" markerStart="url(#dot)" />
            <text x="95" y="108" fontSize="9" fontFamily="sans-serif" textAnchor="end" fill="#1e293b" fontWeight="bold">Aqueous Humour</text>

            {/* 9. Vitreous Humour */}
            <path d="M 220,135 L 240,135 L 250,165" fill="none" stroke="#475569" strokeWidth="0.8" markerStart="url(#dot)" />
            <text x="255" y="168" fontSize="9" fontFamily="sans-serif" textAnchor="start" fill="#1e293b" fontWeight="bold">Vitreous Humour</text>
          </svg>
        </div>
      </div>

      {/* SECTION 7: Defects of Vision */}
      <div className="space-y-4 print:pt-6">
        <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">7. Defects of Vision and Their Correction</h2>
        <ul className="list-disc pl-6 text-sm space-y-4 text-slate-800 font-sans">
          <li>
            <b>Refractive Defects:</b> Visual impairments that occur when the physiological ciliary muscles or crystalline lens lose their optimal power of accommodation, preventing focus from landing exactly on the retina.
          </li>
          <li>
            <b>Myopia (Near-Sightedness):</b>
            <ul className="list-[circle] pl-6 mt-1.5 space-y-1.5 text-xs text-slate-650">
              <li><b>Symptom:</b> Patient can see nearby objects with perfect clarity but distant objects appear hazy, as the far point recedes from infinity to several meters.</li>
              <li><b>Optical Pathway:</b> Incoming light rays from a distant object focus at a point <b>in front of the retina</b> rather than on it.</li>
              <li><b>Key Causes:</b> Induced by: (i) Excessive curvature of the lens (too converging), or (ii) Physiological elongation of the eyeball.</li>
              <li><b>Correction Method:</b> Implantation of spectacles with a <b>Concave lens of appropriate power</b> to diverge rays before they enter.</li>
            </ul>
          </li>
          <li>
            <b>Hypermetropia (Far-Sightedness):</b>
            <ul className="list-[circle] pl-6 mt-1.5 space-y-1.5 text-xs text-slate-650">
              <li><b>Symptom:</b> Patient can see distant objects clearly but cannot see nearby objects distinctly, as the near point recedes beyond 25 cm.</li>
              <li><b>Optical Pathway:</b> Light rays diverging from a nearby object focus at a convergent point <b>behind the retina</b>.</li>
              <li><b>Key Causes:</b> Induced by: (i) Eye lens focal length being too long (weak convergence), or (ii) Eyeball becoming too small.</li>
              <li><b>Correction Method:</b> Implantation of spectacles with a <b>Convex lens of appropriate power</b> to provide initial convergence.</li>
            </ul>
          </li>
          <li>
            <b>Presbyopia (Old-Age Presbyopia):</b>
            <ul className="list-[circle] pl-6 mt-1.5 space-y-1.5 text-xs text-slate-650">
              <li><b>Symptom:</b> Age-related decrease in accommodation power leading to near point receding, making reading or close-range work difficult.</li>
              <li><b>Key Causes:</b> Caused by progressive weakening of the ciliary muscles and decreasing physical lens flexural elasticity.</li>
              <li><b>Correction Method:</b> Corrected using simple reading glasses. If a patient is myopic as well, they require <b>Bi-focal lenses</b> containing a concave upper lens and a convex lower lens.</li>
            </ul>
          </li>
          <li>
            <b>Advantages of Stereoscopic Vision (Two Eyes):</b>
            <ul className="list-[circle] pl-6 mt-1.5 space-y-1 text-xs text-slate-650">
              <li><b>Wider Field of View:</b> A single eye offers roughly 150° of horizontal field of view, while two eyes together extend this to a panoramic 180°.</li>
              <li><b>Stereopsis (Depth Perception):</b> Each eye views objects from slightly different coordinates; the brain combines these into a seamless 3D spatial field.</li>
            </ul>
          </li>
          <li>
            <b>Critical Guidelines for Eye Donation:</b>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-2.5 mt-2 text-slate-800">
              <div className="font-sans font-bold text-amber-900 uppercase tracking-widest">
                💡 Human Focus: Curable Corneal Blindness through Donation
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><b>Who Can Donate:</b> Anyone regardless of age, sex, spectacles, previous cataract surgeries, or minor systemic conditions (diabetes, hypertension).</li>
                <li><b>Critical Timeframe:</b> Corneas must be surgically retrieved within <b>4 to 6 hours</b> of physiological death. Removal takes only 10-15 mins with zero disfigurement.</li>
                <li><b>Medical Exclusion Criteria:</b> Donors with infections like AIDS, Rabies, Tetanus, Cholera, Hepatitis B or C, or Acute Leukemia are strictly ineligible.</li>
                <li><b>Impact:</b> A single pair of eye donations can restore sight to <b>two corneal blind people</b>.</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

        {/* Vision Defects Ray Diagrams (Added as requested) */}
        <div className="space-y-6 pt-4 w-full print:break-inside-avoid">
          <h4 className="text-xs sm:text-[13px] font-sans font-black uppercase text-slate-705 tracking-wider text-center">
            Official Ray Diagrams of Vision Defects and Corrective Lenses
          </h4>
          <div className="flex flex-col gap-6 w-full">
            {/* (a) Myopic Eye */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full animate-fade-in-up" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
              <div className="flex-1 space-y-2">
                <span className="inline-block text-[11px] font-black text-red-800 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  (a) Myopic Eye (Focus in front of Retina)
                </span>
                <p className="text-xs sm:text-[13px] text-slate-755 leading-relaxed font-sans">
                  In a myopic (nearsighted) eye, parallel light rays coming from a distant object are converged too strongly by the eye's refractive system, focusing <b>in front of the retina</b> rather than directly on it. This causes distant vision to be blurred while near sight remains clear.
                </p>
              </div>
              <div className="w-full max-w-sm shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                <svg viewBox="0 0 280 145" className="w-full max-w-[260px] h-auto bg-white rounded">
                  {/* Eyeball line */}
                  <path d="M 155,40 A 40,40 0 1,1 155,100 C 158,85 178,80 178,70 C 178,60 158,55 155,40 Z" fill="#fafafa" stroke="#1e293b" strokeWidth="1.8" />
                  <path d="M 155,40 C 135,50 130,60 130,70 C 130,80 135,90 155,100" fill="none" stroke="#0891b2" strokeWidth="1.8" />
                  
                  {/* Eye crystalline Lens */}
                  <path d="M 165,52 C 160,58 160,82 165,88 C 170,82 170,58 165,52 Z" fill="#f0f9ff" stroke="#1e293b" strokeWidth="1.2" />
                  
                  {/* Parallel rays from far distance focusing early */}
                  <g stroke="#d97706" strokeWidth="1.8" fill="none" strokeLinecap="round">
                    <path d="M 15,50 L 128,50 L 165,54 L 205,70" />
                    <path d="M 15,90 L 128,90 L 165,86 L 205,70" />
                    {/* Ray focus extending past focus but blurred on retina */}
                    <path d="M 205,70 L 222,74" strokeDasharray="2 2" strokeOpacity="0.75" />
                    <path d="M 205,70 L 222,66" strokeDasharray="2 2" strokeOpacity="0.75" />
                  </g>

                  {/* Arrowheads */}
                  <polygon points="50,50 44,47 46,53" fill="#d97706" />
                  <polygon points="50,90 44,87 46,93" fill="#d97706" />
                  
                  {/* Focal Point Spot */}
                  <circle cx="205" cy="70" r="3.5" fill="#dc2626" />
                  <line x1="205" y1="70" x2="205" y2="118" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="205" y="132" fontSize="8.5" fill="#dc2626" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">FOCUS IN FRONT</text>

                  {/* Retina marker */}
                  <circle cx="223" cy="70" r="1.5" fill="#1e293b" />
                  <text x="232" y="73" fontSize="7" fill="#475569" fontWeight="bold" fontFamily="sans-serif">Retina</text>
                </svg>
              </div>
            </div>

            {/* (b) Correction of Myopia */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full animate-fade-in-up" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
              <div className="flex-1 space-y-2">
                <span className="inline-block text-[11px] font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  (b) Correction of Myopia (using Concave Lens)
                </span>
                <p className="text-xs sm:text-[13px] text-slate-755 leading-relaxed font-sans">
                  A diverging <b>concave lens spectacle</b> is placed in front of the myopic eye. The corrective lens diverges incoming parallel light rays slightly outward before they reach the eye, causing the eye's refractive system to focus the final image <b>precisely on the retina</b>, fully restoring distant vision.
                </p>
              </div>
              <div className="w-full max-w-sm shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                <svg viewBox="0 0 280 145" className="w-full max-w-[260px] h-auto bg-white rounded">
                  {/* Eyeball line */}
                  <path d="M 155,40 A 40,40 0 1,1 155,100 C 158,85 178,80 178,70 C 178,60 158,55 155,40 Z" fill="#fafafa" stroke="#1e293b" strokeWidth="1.8" />
                  <path d="M 155,40 C 135,50 130,60 130,70 C 130,80 135,90 155,100" fill="none" stroke="#0891b2" strokeWidth="1.8" />
                  
                  {/* Eye crystalline Lens */}
                  <path d="M 165,52 C 160,58 160,82 165,88 C 170,82 170,58 165,52 Z" fill="#f0f9ff" stroke="#1e293b" strokeWidth="1.2" />
                  
                  {/* Concave Spectacle Lens */}
                  <path d="M 90,48 L 96,48 C 93,58 93,82 96,92 L 90,92 C 93,82 93,58 90,48 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
                  <text x="93" y="42" fontSize="6.5" fill="#024e84" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">CONCAVE SPECTACLES</text>

                  {/* Light Rays propagating through concave, then focused perfectly */}
                  <g stroke="#d97706" strokeWidth="1.8" fill="none" strokeLinecap="round">
                    <path d="M 15,52 L 91,52 L 128,48 L 165,54 L 222,70" />
                    <path d="M 15,88 L 91,88 L 128,92 L 165,86 L 222,70" />
                  </g>

                  {/* Arrowheads */}
                  <polygon points="50,52 44,49 46,55" fill="#d97706" />
                  <polygon points="50,88 44,85 46,91" fill="#d97706" />

                  {/* Focus Spot on Retina */}
                  <circle cx="222" cy="70" r="3.5" fill="#059669" />
                  <line x1="222" y1="70" x2="222" y2="118" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="222" y="132" fontSize="8.5" fill="#059669" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">CORRECTED FOCUS</text>
                </svg>
              </div>
            </div>

            {/* (c) Hypermetropic Eye */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full animate-fade-in-up" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
              <div className="flex-1 space-y-2">
                <span className="inline-block text-[11px] font-black text-red-800 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  (c) Hypermetropic Eye (Focus behind Retina)
                </span>
                <p className="text-xs sm:text-[13px] text-slate-755 leading-relaxed font-sans">
                  In a hypermetropic (farsighted) eye, light rays from a nearby object are refracted too weakly by the eye's crystalline lens and fail to converge in time, attempting to focus at a virtual point located <b>behind the retina</b>. This causes nearby text to appear hazy and blurred.
                </p>
              </div>
              <div className="w-full max-w-sm shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                <svg viewBox="0 0 280 145" className="w-full max-w-[260px] h-auto bg-white rounded">
                  {/* Eyeball line */}
                  <path d="M 155,40 A 40,40 0 1,1 155,100 C 158,85 178,80 178,70 C 178,60 158,55 155,40 Z" fill="#fafafa" stroke="#1e293b" strokeWidth="1.8" />
                  <path d="M 155,40 C 135,50 130,60 130,70 C 130,80 135,90 155,100" fill="none" stroke="#0891b2" strokeWidth="1.8" />
                  
                  {/* Eye crystalline Lens */}
                  <path d="M 165,52 C 160,58 160,82 165,88 C 170,82 170,58 165,52 Z" fill="#f0f9ff" stroke="#1e293b" strokeWidth="1.2" />
                  
                  {/* Near Object N */}
                  <circle cx="45" cy="70" r="3" fill="#dc2626" />
                  <text x="45" y="62" fontSize="8" fill="#dc2626" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Object (N)</text>

                  {/* Diverging light rays focusing behind retina */}
                  <g stroke="#d97706" strokeWidth="1.8" fill="none" strokeLinecap="round">
                    <path d="M 45,70 L 128,54 L 165,55 L 222,66 L 242,70" />
                    <path d="M 45,70 L 128,86 L 165,85 L 222,74 L 242,70" />
                  </g>

                  {/* Arrowheads */}
                  <polygon points="75,64 69,63 71,69" fill="#d97706" />
                  <polygon points="75,76 71,71 69,77" fill="#d97706" />

                  {/* Focus Spot behind Retina */}
                  <circle cx="242" cy="70" r="3.5" fill="#dc2626" />
                  <line x1="242" y1="70" x2="242" y2="118" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="242" y="132" fontSize="8.5" fill="#dc2626" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">FOCUS BEHIND</text>

                  {/* Retina marker */}
                  <circle cx="222" cy="70" r="1.5" fill="#1e293b" />
                  <text x="210" y="63" fontSize="7" fill="#475569" fontWeight="bold" fontFamily="sans-serif">Retina</text>
                </svg>
              </div>
            </div>

            {/* (d) Correction of Hypermetropia */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full animate-fade-in-up" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
              <div className="flex-1 space-y-2">
                <span className="inline-block text-[11px] font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  (d) Correction of Hypermetropia (using Convex Lens)
                </span>
                <p className="text-xs sm:text-[13px] text-slate-755 leading-relaxed font-sans">
                  A converging <b>convex lens spectacle</b> is prescribed. The corrective lens provides extra convergence, pre-bending light rays slightly inward so that the eye's native lens can successfully complete the refraction, drawing the focal plane forward to converge <b>exactly on the retina</b> for a crisp near image.
                </p>
              </div>
              <div className="w-full max-w-sm shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                <svg viewBox="0 0 280 145" className="w-full max-w-[260px] h-auto bg-white rounded">
                  {/* Eyeball line */}
                  <path d="M 155,40 A 40,40 0 1,1 155,100 C 158,85 178,80 178,70 C 178,60 158,55 155,40 Z" fill="#fafafa" stroke="#1e293b" strokeWidth="1.8" />
                  <path d="M 155,40 C 135,50 130,60 130,70 C 130,80 135,90 155,100" fill="none" stroke="#0891b2" strokeWidth="1.8" />
                  
                  {/* Eye crystalline Lens */}
                  <path d="M 165,52 C 160,58 160,82 165,88 C 170,82 170,58 165,52 Z" fill="#f0f9ff" stroke="#1e293b" strokeWidth="1.2" />
                  
                  {/* Convex Spectacle Lens */}
                  <path d="M 91,48 C 96,56 96,84 91,92 C 86,84 86,56 91,48 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
                  <text x="91" y="42" fontSize="6.5" fill="#024e84" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">CONVEX SPECTACLES</text>

                  {/* Near Object N */}
                  <circle cx="45" cy="70" r="3" fill="#dc2626" />
                  <text x="45" y="62" fontSize="7.5" fill="#dc2626" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">N'</text>

                  {/* Light rays from nearby object */}
                  <g stroke="#d97706" strokeWidth="1.8" fill="none" strokeLinecap="round">
                    <path d="M 45,60 L 92,48 C 110,48 115,48 123,49 L 158,51 L 198,60" />
                    <path d="M 45,60 L 92,72 C 110,72 115,72 123,71 L 158,69 L 198,60" />
                  </g>
                  
                  {/* Ideal Focus Point */}
                  <circle cx="198" cy="60" r="3.5" fill="#059669" />
                  <line x1="198" y1="60" x2="198" y2="118" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="198" y="132" fontSize="8.5" fill="#059669" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">CORRECTED FOCUS</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

      {/* SECTION 8: Refraction through a Prism */}
      <div className="space-y-4 print:pt-6">
        <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">8. Refraction of Light through a Prism & Dispersion</h2>
        <ul className="list-disc pl-6 text-sm space-y-3.5 text-slate-800 font-sans">
          <li>
            <b>Glass Prism:</b> A transparent optical medium consisting of two triangular bases and three rectangular lateral surfaces, where the lateral surfaces are physically inclined to each other.
          </li>
          <li>
            <b>Angle of Prism (∠A):</b> The peculiar inclination angle between any two adjacent rectangular refracting surfaces of a glass prism.
          </li>
          <li>
            <b>Angle of Deviation (∠D):</b> The unique angle formed between the extension of the incident light ray traveling forward and the emergent light ray traveling backward as it exits the prism.
          </li>
          <li>
            <b>Prism Ray Trajectory:</b>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl my-2 text-slate-700">
              <div><b>Incident Ray</b></div>
              <div><b>Refracted Ray</b></div>
              <div><b>Emergent Ray</b></div>
              <div><b>∠A:</b> Angle of Prism</div>
              <div><b>∠i:</b> Angle of Incidence</div>
              <div><b>∠r:</b> Angle of Refraction</div>
              <div><b>∠e:</b> Angle of Emergence</div>
              <div><b>∠D:</b> Angle of Deviation</div>
            </div>
          </li>
          <li>
            <b>Dispersion of Light:</b> The physical splitting of a composite beam of white light into its constituent component colors when completing refraction through a transparent prism.
          </li>
          <li>
            <b>The Spectrum:</b> The spectacular band of colored components generated via dispersion, forming the classic <b>VIBGYOR</b> sequence (Violet, Indigo, Blue, Green, Yellow, Orange, Red).
            <ul className="list-[circle] pl-6 mt-1 space-y-1 text-xs text-slate-600">
              <li><b>Red Light:</b> Bends the absolute <b>least</b> because of its longer wavelength and higher speed in glass.</li>
              <li><b>Violet Light:</b> Bends the absolute <b>most</b> because of its shorter wavelength and slower speed in glass.</li>
            </ul>
          </li>
          <li>
            <b>Newton's Double Prism Experiment (Recombination of Spectrum):</b>
            <ul className="list-[circle] pl-6 mt-1 space-y-1.5 text-xs text-slate-650">
              <li><b>Historic Proof:</b> Sir Isaac Newton was the first to use a glass glass prism to obtain the spectrum of sunlight. He tried to split the colors of the spectrum further by using another similar prism but could not get any more colors.</li>
              <li><b>The Recombination Process:</b> He then placed a second identical prism in an <b>inverted position</b> with respect to the first prism. This allowed all the colors of the spectrum to pass through the second prism.</li>
              <li><b>Observation:</b> He found that a beam of <b>white light</b> emerged from the other side of the second prism. This activity proved that <b>sunlight is made up of seven colors</b>.</li>
            </ul>
          </li>
          <li>
            <b>Natural Rainbow Formation:</b> A dynamic atmospheric spectrum caused by sunlight refracting, dispersing, and internally reflecting inside thousands of suspended raindrops acting as tiny glass prisms.
            <ul className="list-[circle] pl-6 mt-1 space-y-1 text-xs text-slate-600">
              <li>Always formed in the sky in the direction exactly <b>opposite</b> to the position of the Sun.</li>
              <li>Droplet Pathway: Light enters droplet → refracts and disperses → internally reflects once at rear wall → refracts again exiting to our eyes.</li>
            </ul>
          </li>
        </ul>

        {/* Glass Prism Refraction and Dispersion Diagram */}
        <div className="space-y-6 pt-4 w-full print:break-inside-avoid">
          <h4 className="text-xs sm:text-[13px] font-sans font-black uppercase text-slate-705 tracking-wider text-center">
            Prism Ray Optics and Dispersion Phenomena (Separate Reference Graphics)
          </h4>
          <div className="flex flex-col gap-6 w-full">
            {/* Prism Ray trajectory */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full">
              <div className="flex-1 space-y-2">
                <span className="inline-block text-[11px] font-black text-blue-800 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  (a) Single Ray Trajectory & Deviation
                </span>
                <p className="text-xs sm:text-[13px] text-slate-755 leading-relaxed font-sans">
                  Illustrates the clear geometric path of a monochromatic light ray through a triangular glass prism. Light bends towards the normal entering the glass block, and away from normal when exiting into air. The total angular deviation of the final exiting ray is defined as <b>Angle of Deviation (∠D)</b>.
                 </p>
              </div>
              <div className="w-full max-w-xs shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                <svg viewBox="0 0 200 155" className="w-full h-auto max-w-[220px]">
                  {/* Prism triangle */}
                  <polygon points="100,25 40,115 160,115" fill="#f0f9ff" stroke="#1e293b" strokeWidth="1.5" />
                  <text x="100" y="20" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif" fill="#1e293b" textAnchor="middle">∠A (Angle of Prism)</text>
                  
                  {/* Rays */}
                  {/* Incident ray */}
                  <line x1="15" y1="95" x2="70" y2="70" stroke="#0284c7" strokeWidth="1.5" />
                  <polygon points="45,81 38,81 43,86" fill="#0284c7" />
                  <text x="22" y="105" fontSize="6" fill="#0284c7" fontWeight="bold" textAnchor="middle">Incident Ray</text>
                  
                  {/* Refracted ray */}
                  <line x1="70" y1="70" x2="130" y2="80" stroke="#15803d" strokeWidth="1.5" />
                  <polygon points="105,76 100,73 102,79" fill="#15803d" />
                  <text x="100" y="67" fontSize="5.5" fill="#15803d" fontWeight="bold" textAnchor="middle">Refracted Ray</text>
                  
                  {/* Emergent ray */}
                  <line x1="130" y1="80" x2="185" y2="120" stroke="#ef4444" strokeWidth="1.5" />
                  <polygon points="160,102 154,98 158,105" fill="#ef4444" />
                  <text x="175" y="130" fontSize="6" fill="#ef4444" fontWeight="bold" textAnchor="middle">Emergent Ray</text>

                  {/* Extended path lines for Deviation */}
                  <line x1="70" y1="70" x2="140" y2="38" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
                  <line x1="130" y1="80" x2="110" y2="52" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />

                  {/* Normals */}
                  <line x1="45" y1="55" x2="95" y2="90" stroke="#475569" strokeDasharray="3 3" strokeWidth="0.8" />
                  <line x1="155" y1="60" x2="105" y2="90" stroke="#475569" strokeDasharray="3 3" strokeWidth="0.8" />

                  {/* Angles labels */}
                  {/* Angle of prism arc */}
                  <path d="M 94,35 A 10,10 0 0,0 106,35" stroke="#1e293b" strokeWidth="0.8" fill="none" />
                  
                  {/* Deviation angle D */}
                  <path d="M 124,45 A 12,12 0 0,1 118,57" stroke="#ea580c" strokeWidth="1" fill="none" />
                  <text x="127" y="52" fontSize="7" fill="#ea580c" fontWeight="bold">∠D (Angle of Deviation)</text>

                  {/* Angle of Incidence i */}
                  <path d="M 48,80 A 14,14 0 0,1 55,66" stroke="#0284c7" strokeWidth="0.8" fill="none" />
                  <text x="40" y="72" fontSize="6" fill="#0284c7" fontWeight="bold">∠i (Incidence)</text>

                  {/* Angle of Refraction r */}
                  <path d="M 80,77 A 12,12 0 0,1 78,83" stroke="#15803d" strokeWidth="0.8" fill="none" />
                  <text x="81" y="90" fontSize="6" fill="#15803d" fontWeight="bold">∠r (Refraction)</text>

                  {/* Angle of Emergence e */}
                  <path d="M 141,73 A 12,12 0 0,1 143,86" stroke="#ef4444" strokeWidth="0.8" fill="none" />
                  <text x="145" y="93" fontSize="6" fill="#ef4444" fontWeight="bold">∠e (Emergence)</text>
                </svg>
              </div>
            </div>

            {/* Dispersion of white light */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full">
              <div className="flex-1 space-y-2">
                <span className="inline-block text-[11px] font-black text-purple-800 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  (b) Dispersion into VIBGYOR Spectrum
                </span>
                <p className="text-xs sm:text-[13px] text-slate-755 leading-relaxed font-sans">
                  Different wavelengths of color refract at different angles due to varying refractive indices inside glass (<code className="font-sans">n_violet &gt; n_red</code>). This separates white light into its constituent bands, creating the iconic <b>VIBGYOR</b> spectrum, with red light diverging the least and violet the most.
                </p>
              </div>
              <div className="w-full max-w-xs shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                <svg viewBox="0 0 200 140" className="w-full h-auto max-w-[220px]">
                  <defs>
                    <linearGradient id="rainbow-blend" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="20%" stopColor="#f97316" />
                      <stop offset="40%" stopColor="#eab308" />
                      <stop offset="60%" stopColor="#10b981" />
                      <stop offset="80%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  {/* Prism triangle */}
                  <polygon points="100,20 40,110 160,110" fill="#f0f9ff" stroke="#1e293b" strokeWidth="1.5" />
                  
                  {/* Incident White Light ray */}
                  <line x1="15" y1="85" x2="70" y2="65" stroke="#94a3b8" strokeWidth="2" />
                  <polygon points="45,74 38,72 43,78" fill="#94a3b8" />
                  <text x="8" y="102" fontSize="7" fontWeight="black" fill="#475569">WHITE LIGHT</text>

                  {/* Inside prism bands */}
                  <polygon points="70,65 130,55 130,85" fill="none" />
                  <line x1="70" y1="65" x2="130" y2="58" stroke="#ef4444" strokeWidth="1" />
                  <line x1="70" y1="65" x2="130" y2="82" stroke="#8b5cf6" strokeWidth="1" />

                  {/* Re-dispersing outwards */}
                  <polygon points="130,58 185,75 185,115 130,82" fill="url(#rainbow-blend)" opacity="0.85" />
                  
                  {/* Border rays lines for red and violet */}
                  <line x1="130" y1="58" x2="185" y2="75" stroke="#ef4444" strokeWidth="1.2" />
                  <line x1="130" y1="82" x2="185" y2="115" stroke="#8b5cf6" strokeWidth="1.2" />

                  <text x="189" y="78" fontSize="7" fill="#ef4444" fontWeight="bold">Red</text>
                  <text x="189" y="116" fontSize="7" fill="#8b5cf6" fontWeight="bold">Violet</text>
                  <text x="150" y="128" fontSize="6.5" fill="#475569" fontWeight="bold">V I B G Y O R Spectrum</text>
                </svg>
              </div>
            </div>

            {/* Newton Recombination */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid print:my-4 w-full">
              <div className="flex-1 space-y-2">
                <span className="inline-block text-[11px] font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  (c) Newton's Recombination Experiment
                </span>
                <p className="text-xs sm:text-[13px] text-slate-755 leading-relaxed font-sans">
                  A classic physics proof that the prism does not create color but merely splits it. Placing an identical inverted prism <code className="font-sans">P₂</code> adjacent to the upright dispersing prism <code className="font-sans">P₁</code> intercepts the separated colors, causing them to converge back into uniform white light.
                </p>
              </div>
              <div className="w-full max-w-xs shrink-0 flex justify-center bg-white border border-slate-150 rounded-xl p-4 shadow-3xs">
                <svg viewBox="0 0 200 140" className="w-full h-auto max-w-[220px]">
                  <defs>
                    <linearGradient id="recomb-spectrum" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  {/* Prism 1: Normal (pointing up) */}
                  <polygon points="50,30 10,110 90,110" fill="#f0f9ff" stroke="#1e293b" strokeWidth="1.2" />
                  <text x="50" y="103" fill="#475569" fontSize="6" fontWeight="bold" textAnchor="middle">P₁ (Upright)</text>

                  {/* Prism 2: Inverted (pointing down) */}
                  <polygon points="145,110 105,30 185,30" fill="#f0fdf4" stroke="#1e293b" strokeWidth="1.2" />
                  <text x="145" y="40" fill="#475569" fontSize="6" fontWeight="bold" textAnchor="middle">P₂ (Inverted)</text>

                  {/* Incoming White Light: entering left face of P1 at (27.5, 75) */}
                  <line x1="2" y1="68" x2="27.5" y2="75" stroke="#475569" strokeWidth="1.8" />
                  <polygon points="16,71 10,69 12,75" fill="#475569" />
                  <text x="2" y="61" fill="#1e293b" fontSize="6.5" fontWeight="bold">White Light</text>

                  {/* Inside Prism 1: single white ray to point (72.5, 75) */}
                  <line x1="27.5" y1="75" x2="72.5" y2="75" stroke="#64748b" strokeWidth="1.2" />

                  {/* Dispersed paths in between the two prisms */}
                  {/* Red path: from (72.5, 75) to (120, 60) */}
                  <line x1="72.5" y1="75" x2="120" y2="60" stroke="#ef4444" strokeWidth="1.2" />
                  {/* Violet path: from (72.5, 75) to (125, 70) */}
                  <line x1="72.5" y1="75" x2="125" y2="70" stroke="#8b5cf6" strokeWidth="1.2" />

                  {/* Colors overlap fan fill from P1 exit point to P2 entrance */}
                  <polygon points="72.5,75 120,60 125,70" fill="url(#recomb-spectrum)" fillOpacity="0.25" />

                  {/* Paths inside inverted Prism 2: converging to (165, 70) */}
                  <line x1="120" y1="60" x2="165" y2="70" stroke="#ef4444" strokeWidth="1" />
                  <line x1="125" y1="70" x2="165" y2="70" stroke="#8b5cf6" strokeWidth="1" />

                  {/* Exit recombined white light ray: from (165, 70) to (198, 77) */}
                  <line x1="165" y1="70" x2="198" y2="77" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
                  <polygon points="188,74 182,72 184,78" fill="#475569" />
                  <text x="198" y="71" fill="#15803d" fontSize="6.5" fontWeight="black" textAnchor="end">Recombined White</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Natural Dispersion - Rainbow Formation in a Spherical Water Droplet */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 max-w-full print:break-inside-avoid">
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-3 text-center">Detailed Point-wise Rainbow Formation in a Spherical Raindrop</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center">
            {/* Pointwise Text */}
            <div className="text-xs text-slate-800 font-sans space-y-1.5 leading-relaxed">
              <span className="text-[9.5px] uppercase font-mono font-black text-amber-600 block">The Optical Sequence of a Rainbow:</span>
              <ol className="list-decimal pl-4.5 space-y-1.5 text-slate-700">
                <li><b>Droplets as Prisms:</b> Water droplets floating in the air after rainfall act as miniature transparent spherical prisms.</li>
                <li><b>Refraction & Dispersion at Entrance:</b> Oblique sunlight striking the upper-front boundary bends as it enters denser water, splitting into red and violet boundaries.</li>
                <li><b>Total Internal Reflection (TIR):</b> Dispersed colors striking the rear droplet wall exceed the water-air critical angle (~48.6°) and undergo complete internal reflection.</li>
                <li><b>Exit Refraction:</b> Exiting back into rarer air from the bottom-front boundary, the rays refract a second time, widening their colorful separation.</li>
                <li><b>Observational Angles:</b> Red light emerges at exactly <b>42°</b> and violet at <b>40°</b> to our sight line, putting red constantly on the outer edge. Always formed <b>opposite to the Sun</b>.</li>
              </ol>
            </div>

            {/* SVG Diagram */}
            <div className="flex flex-col items-center bg-white p-3.5 border border-slate-200 rounded-xl">
              <svg viewBox="0 0 250 185" className="w-full h-auto max-w-[280px] bg-white text-slate-900">
                {/* Water droplet ring */}
                <circle cx="125" cy="90" r="62" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="125" y="72" fontSize="7.5" fontFamily="sans-serif" fontWeight="black" fill="#0284c7" opacity="0.3" textAnchor="middle">WATER DROPLET</text>

                {/* Incident Sunlight */}
                <line x1="15" y1="50" x2="80" y2="40" stroke="#475569" strokeWidth="2" />
                <polygon points="50,45 44,44 47,49" fill="#475569" />
                <text x="16" y="36" fontSize="7.5" fontWeight="bold" fill="#475569">Incident Sunlight</text>

                {/* Point 1: Refraction & Dispersion */}
                <circle cx="80" cy="40" r="2.2" fill="#10b981" />
                <text x="75" y="24" fontSize="7.5" fontWeight="bold" fill="#10b981" textAnchor="middle">1. Refract & Disperse</text>

                {/* Internal paths */}
                <line x1="80" y1="40" x2="182" y2="65" stroke="#ef4444" strokeWidth="1.2" />
                <line x1="80" y1="40" x2="175" y2="105" stroke="#8b5cf6" strokeWidth="1.2" />

                {/* Point 2: TIR */}
                <circle cx="182" cy="65" r="2.2" fill="#facc15" />
                <circle cx="175" cy="105" r="2.2" fill="#facc15" />
                <text x="194" y="85" fontSize="7" fontWeight="bold" fill="#c2410c" textAnchor="middle" transform="rotate(-60, 194, 85)">2. TIR</text>

                {/* Internal reflected paths */}
                <line x1="182" y1="65" x2="102" y2="142" stroke="#ef4444" strokeWidth="1.2" />
                <line x1="175" y1="105" x2="114" y2="151" stroke="#8b5cf6" strokeWidth="1.2" />

                {/* Point 3: Exit refraction */}
                <circle cx="102" cy="142" r="1.8" fill="#0ea5e9" />
                <circle cx="114" cy="151" r="1.8" fill="#0ea5e9" />
                <text x="122" y="162" fontSize="7" fontWeight="bold" fill="#0ea5e9">3. Exit Refract</text>

                {/* Outgoing dispersed rays */}
                <line x1="102" y1="142" x2="50" y2="170" stroke="#ef4444" strokeWidth="1.8" />
                <line x1="114" y1="151" x2="72" y2="176" stroke="#8b5cf6" strokeWidth="1.8" />

                <text x="45" y="168" fontSize="7.5" fill="#ef4444" fontWeight="bold" textAnchor="end">Red (42°)</text>
                <text x="66" y="181" fontSize="7.5" fill="#8b5cf6" fontWeight="bold" textAnchor="end">Violet (40°)</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 9: Atmospheric Refraction */}
      <div className="space-y-4 print:pt-6">
        <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">9. Atmospheric Refraction & Natural Phenomena</h2>
        <ul className="list-disc pl-6 text-sm space-y-3.5 text-slate-800 font-sans">
          <li>
            <b>Atmospheric Refraction:</b> The continuous refraction and bending of light rays as they travel through the Earth's atmosphere, which consists of air layers of varying temperatures and dynamic refractive indexes.
          </li>
          <li>
            <b>Twinkling of Stars:</b> Caused by the starlight entering the eye fluctuating dynamically in intensity and position due to passing through moving, turbulent thermal air currents.
          </li>
          <li>
            <b>Apparent Star Position:</b> Starlight curves gradually towards the normal as it enters dense atmospheric air, causing stars to appear located slightly <b>higher</b> than their actual positions.
          </li>
          <li>
            <b>Planetary Non-Twinkling:</b> Planets are much closer to Earth and act as extended, multi-point sources of light, meaning individual point fluctuations cancel each other out to present a steady average intensity.
          </li>
          <li>
            <b>Advance Sunrise and Delayed Sunset:</b> The Sun is visible to our eyes about 2 minutes before it physically crosses the horizon, and about 2 minutes after it has physically passed it, due to atmospheric refraction curves.
          </li>
        </ul>
      </div>

      {/* SECTION 10: Scattering of Light & Tyndall Effect */}
      <div className="space-y-4 print:pt-6">
        <h2 className="text-lg font-sans font-black uppercase border-b border-slate-300 pb-1 text-slate-900">10. Scattering of Light & Tyndall Effect</h2>
        <ul className="list-disc pl-6 text-sm space-y-3.5 text-slate-800 font-sans">
          <li>
            <b>Scattering of Light:</b> The physical scattering behavior of light rays when colliding with micro dust, smoke, gas molecules, and suspended water droplets.
          </li>
          <li>
            <b>The Tyndall Effect:</b> The visible presentation of light ray paths as they collide with dispersed, heterogeneous colloidal particles (e.g. sunlight streaming into a dusty room or through a misty forest canopy).
          </li>
          <li>
            <b>Color Dependency on Particle Size:</b>
            <ul className="list-[circle] pl-6 mt-1 space-y-1.5 text-xs text-slate-630">
              <li><b>Very Fine Particles:</b> Scatter predominantly blue light containing shorter wavelengths.</li>
              <li><b>Larger Particles:</b> Scatter longer wavelengths like red, orange, and yellow.</li>
              <li><b>Extremely Large Particles:</b> Scatter all wavelengths equally, causing the scattered light to appear completely white.</li>
            </ul>
          </li>
          <li>
            <b>Color of Clear Sky:</b> Air molecules are smaller than the wavelength of visible light and scatter the shorter blue wavelengths about 1.8 times more strongly than red wavelengths, coloring the sky blue.
          </li>
          <li>
            <b>Astronaut's Black Sky:</b> Passengers flying at high altitudes or astronauts in vacuum space observe a dark, black sky since there is no air atmosphere to cause scattering.
          </li>
          <li>
            <b>Red Danger Signals:</b> Red light has the longest wavelength in the visible spectrum and is least scattered by fog, smoke, or dust, remaining highly visible over very long distances.
          </li>
          <li>
            <b>Reddening of Sun at Sunrise/Sunset:</b> Near the horizon, sunlight travels through thick layers of atmosphere, scattering away most blue and shorter wavelength light. Only the least-scattered long wavelengths (red and orange) reach our eyes.
          </li>
          <li>
            <b>Experiment: Scattering of Light using Hypo (Sodium Thiosulphate):</b>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mt-1.5 space-y-2 text-xs text-slate-700">
              <p>
                <b>What is Hypo?</b> <i>Sodium Thiosulphate</i> (popularly nicknamed <b>"Hypo"</b>) is simply a safe, colorless chemical salt that dissolves completely in water.
              </p>
              <p>
                <b>The Experiment (NCERT Activity 11.3):</b> 
                We dissolve about 200g of hypo in a clean glass tank of water and add 1 to 2 mL of concentrated sulphuric acid. 
              </p>
              <p>
                <b>What happens inside?</b> The acid reacts with the hypo, causing tiny solid particles of <b>sulphur</b> to start forming and floating in the water (this is called <i>precipitation of colloidal sulphur</i>).
              </p>
              <p>
                <b>The Magic Explanation:</b>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>As these sulphur particles grow, they are exactly the right microscopic size to scatter <b>blue light</b>.</li>
                <li>When you look at the glass tank from the sides, you will see a beautiful **blue color glow** in the water.</li>
                <li>Since all the blue light is scattered away to the sides, the remaining light traveling straight through is rich in long red wavelengths. Therefore, the beam of light that strikes the screen on the far side appears as a **bright crimson-red circular spot**!</li>
              </ul>
              <p className="italic text-slate-500 text-[11px]">
                This perfectly explains why the sky looks blue during the day (light scattered from the sides) and why the Sun looks red at sunrise and sunset (light traveling straight through to our eyes)!
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* LOWER FOOTER BAR (Required text, not standard heading) */}
      <div className="flex justify-between items-center text-[11px] sm:text-xs font-sans font-black text-slate-700 uppercase tracking-widest border-t border-slate-300 pt-1.5 mt-3.5 whitespace-nowrap">
        <span className="shrink-0 text-left font-extrabold text-slate-500">Conceptual Learning</span>
        <span className="flex-1 text-center font-black text-slate-900 mx-4">Notes of Optics for Class 10th</span>
        <span className="shrink-0 text-right font-extrabold text-slate-500">CBSE Physics</span>
      </div>
    </div>
  );
};

export function LearnOptics({ onLoadSimulator, preparingFor = '10th', onCompleteNotes, onGoToSelfAssessment, isLightMode = false }: LearnOpticsProps) {
  const [activeTopic, setActiveTopic] = useState<TopicId>('light-em-spectrum');
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [pdfGenerating, setPdfGenerating] = useState<boolean>(false);
  const [downloadBlobUrl, setDownloadBlobUrl] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Auto clean up Blob URL on modal close to prevent memory leaks
  useEffect(() => {
    if (!showPdfModal) {
      if (downloadBlobUrl) {
        URL.revokeObjectURL(downloadBlobUrl);
        setDownloadBlobUrl(null);
      }
      setPdfGenerating(false);
      setPdfError(null);
    }
  }, [showPdfModal]);
  const [eyeDefectMode, setEyeDefectMode] = useState<'normal' | 'myopia' | 'myopia-corrected' | 'hypermetropia' | 'hypermetropia-corrected'>('normal');
  const [signOpticsType, setSignOpticsType] = useState<'concave-mirror' | 'convex-mirror' | 'convex-lens' | 'concave-lens'>('concave-mirror');
  
  // Interactive Glossary Hover Highlight state
  const [glossaryHighlight, setGlossaryHighlight] = useState<string | null>(null);

  // States for dynamic textbook ray diagrams inside printable PDF view
  const [mirrorCaseIndex, setMirrorCaseIndex] = useState<number>(2); // Default to "At C"
  const [lensCaseIndex, setLensCaseIndex] = useState<number>(2); // Default to "At 2F₁"

  // States for the interactive in-notes selection widgets
  const [notesMirrorCaseInd, setNotesMirrorCaseInd] = useState<number>(2); // Default to "At C"
  const [notesLensCaseInd, setNotesLensCaseInd] = useState<number>(2); // Default to "At 2F₁"

  // States for the interactive Combined Lenses Sandbox (Topic 8)
  const [combLensCount, setCombLensCount] = useState<2 | 3>(2);
  const [combLens1Type, setCombLens1Type] = useState<'convex' | 'concave'>('convex');
  const [combLens1F, setCombLens1F] = useState<number>(30); // in cm
  const [combLens2Type, setCombLens2Type] = useState<'convex' | 'concave'>('concave');
  const [combLens2F, setCombLens2F] = useState<number>(40); // in cm
  const [combLens3Type, setCombLens3Type] = useState<'convex' | 'concave'>('convex');
  const [combLens3F, setCombLens3F] = useState<number>(50); // in cm
  const [combObjectDist, setCombObjectDist] = useState<number>(60); // in cm

  // States for the interactive Thick Lenses Sandbox (Topic 9)
  const [thickR1, setThickR1] = useState<number>(10.0); // R1 in cm
  const [thickR2, setThickR2] = useState<number>(-12.0); // R2 in cm
  const [thickT, setThickT] = useState<number>(4.0); // t in cm
  const [thickN, setThickN] = useState<number>(1.50); // Refractive index n

  // States for the Atmospheric & Nature Optical Phenomena (Topic 9)
  const [scatteringWavelength, setScatteringWavelength] = useState<'all' | 'blue' | 'red'>('all');
  const [rainbowActiveRay, setRainbowActiveRay] = useState<'all' | 'red' | 'violet'>('all');

  // Class 10 now ships with a real, pre-written PDF booklet (placed in /public) instead of the
  // dynamically-generated print-to-PDF flow used by the other grades, so this just triggers a
  // direct file download rather than opening the "compile notes" modal.
  const handleDownloadNotes = () => {
    if (preparingFor === '10th') {
      const link = document.createElement('a');
      link.href = '/Class-10-Optics-Notes.pdf';
      link.download = 'Class-10-Optics-Notes.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    setShowPdfModal(true);
  };

  const handlePrintPdf = () => {
    if (pdfGenerating) return;
    setPdfGenerating(true);
    setPdfError(null);

    let docTitle = 'light reflection and refraction';
    if (preparingFor === '8th' || preparingFor === '9th') {
      docTitle = 'light';
    } else if (preparingFor === '12th') {
      docTitle = 'advanced optics';
    }

    try {
      const element = document.querySelector('.study-notes-print-content') as HTMLElement;
      if (!element) {
        throw new Error('Notes content element not found.');
      }

      // Preserve original layout styles
      const originalMaxHeight = element.style.maxHeight;
      const originalOverflow = element.style.overflow;
      const originalHeight = element.style.height;

      // Ensure full expansion for clean capturing
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';
      element.style.height = 'auto';

      // Safeguard stylesheets containing oklch & oklab for html2canvas
      const restoreStyles = (() => {
        const replaceColorFunctions = (text: string) => {
          return text.replace(/(oklch|oklab)\s*\(([^()]+|\([^()]*\))*\)/gi, (match) => {
            const startIdx = match.indexOf('(');
            const endIdx = match.lastIndexOf(')');
            if (startIdx === -1 || endIdx === -1) return 'rgb(248, 250, 252)';
            const content = match.slice(startIdx + 1, endIdx);
            
            const parts = content.trim().split(/[\s,]+/);
            const firstPart = parts[0] || '';
            let l = 0.5;
            if (firstPart.endsWith('%')) {
              l = parseFloat(firstPart) / 100;
            } else {
              l = parseFloat(firstPart);
            }
            
            let alpha = 1;
            const slashIdx = content.indexOf('/');
            if (slashIdx !== -1) {
              const alphaPart = content.slice(slashIdx + 1).trim();
              if (alphaPart.endsWith('%')) {
                alpha = parseFloat(alphaPart) / 100;
              } else {
                alpha = parseFloat(alphaPart);
              }
            }

            if (isNaN(l)) {
              l = 0.9;
            }

            let h = 0;
            if (parts.length >= 3) {
              h = parseFloat(parts[2]);
            }
            
            if (l > 0.85) {
              if (h >= 20 && h < 71) {
                return `rgba(254, 243, 199, ${alpha})`; // Light amber
              }
              if (h >= 71 && h < 160) {
                return `rgba(240, 253, 244, ${alpha})`; // Light green
              }
              if (h >= 160 && h < 260) {
                return `rgba(236, 254, 255, ${alpha})`; // Light cyan/blue
              }
              return `rgba(255, 255, 255, ${alpha})`; // Perfect print bg white
            } else if (l > 0.65) {
              if (h >= 20 && h < 71) {
                return `rgba(251, 191, 36, ${alpha})`; // Amber border
              }
              if (h >= 71 && h < 160) {
                return `rgba(74, 222, 128, ${alpha})`; // Green border
              }
              if (h >= 160 && h < 260) {
                return `rgba(34, 211, 238, ${alpha})`; // Cyan/blue border
              }
              return `rgba(226, 232, 240, ${alpha})`; // Slate border
            } else if (l < 0.35) {
              if (h >= 20 && h < 71) {
                return `rgba(120, 53, 4, ${alpha})`; // Dark brown/amber text
              }
              if (h >= 71 && h < 160) {
                return `rgba(6, 78, 59, ${alpha})`; // Dark forest green text
              }
              if (h >= 160 && h < 260) {
                return `rgba(8, 79, 120, ${alpha})`; // Dark oceanic blue text
              }
              return `rgba(15, 23, 42, ${alpha})`; // Charcoal black text (super clear)
            } else {
              if (h >= 160 && h < 260) {
                return `rgba(14, 116, 144, ${alpha})`; // Indigo/blue text
              }
              return `rgba(71, 85, 105, ${alpha})`; // Slate grey mid-tone
            }
          });
        };

        const cleanups: (() => void)[] = [];

        // 1. Sanitize all <style> tags textContent directly
        try {
          const styleTags = Array.from(document.querySelectorAll('style'));
          for (const styleTag of styleTags) {
            try {
              const text = styleTag.textContent || '';
              if (text.includes('oklch') || text.includes('oklab')) {
                const modifiedText = replaceColorFunctions(text);
                styleTag.textContent = modifiedText;
                cleanups.push(() => {
                  try {
                    styleTag.textContent = text;
                  } catch (e) {}
                });
              }
            } catch (err) {
              console.warn("Could not patch style tag:", err);
            }
          }
        } catch (err) {
          console.warn("Error in style tagging:", err);
        }

        // 2. Traversal and sanitize inline styles of targets
        try {
          const traverseAndSanitize = (node: HTMLElement) => {
            if (node.style) {
              const styleAttr = node.getAttribute('style') || '';
              if (styleAttr.includes('oklch') || styleAttr.includes('oklab')) {
                const cleaned = replaceColorFunctions(styleAttr);
                node.setAttribute('style', cleaned);
                cleanups.push(() => {
                  try {
                    node.setAttribute('style', styleAttr);
                  } catch (e) {}
                });
              }
            }
            for (let i = 0; i < node.children.length; i++) {
              traverseAndSanitize(node.children[i] as HTMLElement);
            }
          };
          traverseAndSanitize(element);
        } catch (err) {
          console.warn("Error sanitizing element inline styles:", err);
        }

        // 3. Patch window.getComputedStyle globally to intercept computed color functions
        try {
          const originalGetComputedStyle = window.getComputedStyle;
          (window as any).getComputedStyle = function (elt: any, pseudoElt: any) {
            const style = originalGetComputedStyle(elt, pseudoElt);
            return new Proxy(style, {
              get(target, prop) {
                const value = Reflect.get(target, prop);
                if (typeof prop === 'symbol') {
                  return value;
                }
                if (value === null || value === undefined) {
                  return value;
                }
                if (typeof value === 'string') {
                  if (value.includes('oklch') || value.includes('oklab')) {
                    return replaceColorFunctions(value);
                  }
                  return value;
                }
                if (typeof value === 'function') {
                  return function (...args: any[]) {
                    const res = value.apply(target, args);
                    if (typeof res === 'string' && (res.includes('oklch') || res.includes('oklab'))) {
                      return replaceColorFunctions(res);
                    }
                    return res;
                  };
                }
                return value;
              }
            });
          };

          cleanups.push(() => {
            (window as any).getComputedStyle = originalGetComputedStyle;
          });
        } catch (err) {
          console.warn("Failed to patch getComputedStyle Proxy:", err);
        }

        return () => {
          for (let i = cleanups.length - 1; i >= 0; i--) {
            try {
              cleanups[i]();
            } catch (e) {
              console.warn("Failed cleanup action:", e);
            }
          }
        };
      })();

      const opt = {
        margin:       [5, 5, 5, 5], // Optimized minimal top/bottom and side margins
        filename:     `${docTitle.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.92 }, // Higher quality JPEG compression for extreme clarity
        html2canvas:  { 
          scale: 2.0, // Increased to 2.0 for razor-sharp high-definition PDF rendering
          useCORS: true, 
          logging: false,
          scrollY: 0,
          scrollX: 0,
          windowWidth: 1100 // Beautiful desktop A4 scale width
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'] } // Disable buggy avoid-all to eliminate artificial blank trailing gaps
      };

      // Handle module/interop compatibility for older CJS library in Vite
      const html2pdfFunc = typeof html2pdf === 'function' ? html2pdf : (html2pdf as any).default || (window as any).html2pdf;
      
      if (!html2pdfFunc) {
        restoreStyles();
        throw new Error('Could not initialize the PDF compiler engine.');
      }

      const inst = html2pdfFunc().set(opt).from(element);

      // First output as blob so we can set state and support direct click saves
      inst.output('blob')
        .then((blob: Blob) => {
          // Restore original styles
          element.style.maxHeight = originalMaxHeight;
          element.style.overflow = originalOverflow;
          element.style.height = originalHeight;
          restoreStyles();

          const url = URL.createObjectURL(blob);
          setDownloadBlobUrl(url);
          setPdfGenerating(false);

          // Direct browser-safe anchor click to trigger direct download instantly
          try {
            const link = document.createElement('a');
            link.href = url;
            link.download = `${docTitle.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (err) {
            console.warn("Direct save action failed inside sandbox:", err);
          }
        })
        .catch((error: any) => {
          // Put back layout styling on capture compile failure
          element.style.maxHeight = originalMaxHeight;
          element.style.overflow = originalOverflow;
          element.style.height = originalHeight;
          restoreStyles();
          console.error('html2pdf compilation failed:', error);
          setPdfError(error.message || 'PDF generation failed.');
          setPdfGenerating(false);
        });

    } catch (error: any) {
      console.error('html2pdf setup failed:', error);
      setPdfError(error.message || 'PDF Compilation failed.');
      setPdfGenerating(false);
    }
  };

  // Sign convention calculator values
  const signValues = {
    'concave-mirror': { 
      f: 'Negative (-)', 
      u: 'Negative (-)', 
      v: 'Negative (-) [Real Image on left] or Positive (+) [Virtual Image on right]', 
      h: 'Positive (+)', 
      hPrime: 'Negative (-) [Real/Inverted] or Positive (+) [Virtual/Erect]', 
      formula: '1/v + 1/u = 1/f', 
      mag: 'm = -v/u', 
      desc: 'Concave mirrors are converging. The Focus (F) is on the left side (in front of mirror), so focal length f is always negative.' 
    },
    'convex-mirror': { 
      f: 'Positive (+)', 
      u: 'Negative (-)', 
      v: 'Positive (+) [Always virtual behind mirror]', 
      h: 'Positive (+)', 
      hPrime: 'Positive (+) [Always virtual/erect]', 
      formula: '1/v + 1/u = 1/f', 
      mag: 'm = -v/u', 
      desc: 'Convex mirrors are diverging. The Focus (F) lies behind the reflective surface (right-hand side), rendering focal length f always positive.' 
    },
    'convex-lens': { 
      f: 'Positive (+)', 
      u: 'Negative (-)', 
      v: 'Positive (+) [Real on right] or Negative (-) [Virtual on left]', 
      h: 'Positive (+)', 
      hPrime: 'Negative (-) [Real/Inverted] or Positive (+) [Virtual/Erect]', 
      formula: '1/v - 1/u = 1/f', 
      mag: 'm = v/u', 
      desc: 'Convex lenses are converging. Parallel incident rays converge at the real second principal focus F₂ on the right, making f positive.' 
    },
    'concave-lens': { 
      f: 'Negative (-)', 
      u: 'Negative (-)', 
      v: 'Negative (-) [Always virtual on the same left side]', 
      h: 'Positive (+)', 
      hPrime: 'Positive (+) [Always virtual/erect]', 
      formula: '1/v - 1/u = 1/f', 
      mag: 'm = v/u', 
      desc: 'Concave lenses are diverging. Parallel incident rays appear to scatter from the virtual first principal focus F₁ on the left, making f negative.' 
    }
  };

  const currentTopics = useMemo(() => {
    if (preparingFor === '8th' || preparingFor === '9th') {
      return [
        { id: 'light-nature' as TopicId, title: '1. Definition & Propagation of Light', category: 'Fundamentals' },
        { id: 'reflection' as TopicId, title: '2. Laws of Reflection & Plane Mirrors', category: 'Reflection' },
        { id: 'regular-diffused' as TopicId, title: '3. Regular & Diffused Reflection', category: 'Reflection' },
        { id: 'spherical-mirrors' as TopicId, title: '4. Spherical Mirrors (Concave & Convex)', category: 'Reflection' },
        { id: 'image-formation-mirrors' as TopicId, title: '5. Image Formation in Spherical Mirrors', category: 'Reflection' },
        { id: 'lenses' as TopicId, title: '6. Spherical Lenses (Convex & Concave)', category: 'Refraction' },
        { id: 'multiple-reflection' as TopicId, title: '7. Multiple Reflection & Kaleidoscope', category: 'Multiple Reflection' },
        { id: 'prism-refraction' as TopicId, title: '8. Sunlight - Dispersion of Light', category: 'Dispersion' },
        { id: 'human-eye' as TopicId, title: '9. Structure & Care of Human Eye', category: 'Applied Optics' },
        { id: 'braille' as TopicId, title: '10. Visually Impaired & Braille System', category: 'Inclusion' },
      ];
    } else if (preparingFor === '10th') {
      return [
        { id: 'light-nature' as TopicId, title: '1. Definition of Light & Properties', category: 'Fundamentals' },
        { id: 'reflection' as TopicId, title: '2. Laws of Reflection & Plane Mirrors', category: 'Reflection' },
        { id: 'spherical-mirrors' as TopicId, title: '3. Spherical Mirrors (Concave & Convex)', category: 'Reflection' },
        { id: 'ray-rules' as TopicId, title: '4. Ray Tracing Guidelines (Mirrors)', category: 'Reflection' },
        { id: 'image-formation-mirrors' as TopicId, title: '5. Image Formation in Spherical Mirrors', category: 'Reflection' },
        { id: 'sign-convention' as TopicId, title: '6. Sign Conventions & Formulas', category: 'Mathematics' },
        { id: 'refraction' as TopicId, title: '7. Refraction of Light & Glass Slabs', category: 'Refraction' },
        { id: 'prism-refraction' as TopicId, title: '8. Refraction by Prism & Spectrum', category: 'Dispersion' },
        { id: 'lenses' as TopicId, title: '9. Spherical Lenses & Ray Rules', category: 'Refraction' },
        { id: 'lens-formulas' as TopicId, title: '10. Lens Formula & Magnification', category: 'Mathematics' },
        { id: 'lens-power' as TopicId, title: '11. Power of a Lens', category: 'Mathematics' },
        { id: 'human-eye' as TopicId, title: '12. Structure and defects of Human Eye', category: 'Applied Optics' },
        { id: 'light-phenomena' as TopicId, title: '13. Atmospheric Refraction & Scattering', category: 'Phenomena' },
      ];
    } else {
      return [
        { id: 'light-em-spectrum' as TopicId, title: '1. Light & Electromagnetic Spectrum', category: 'Light & Wave' },
        { id: 'light-nature' as TopicId, title: '2. Wave-Particle Duality & Definition of Light', category: 'Light & Wave' },
        { id: 'reflection' as TopicId, title: '3. Reflection of Light & Plane Mirrors', category: 'Reflection' },
        { id: 'regular-diffused' as TopicId, title: '4. Regular & Diffused Reflection (Class VIII)', category: 'Reflection' },
        { id: 'spherical-mirrors' as TopicId, title: '5. Spherical Mirror Terminology', category: 'Reflection' },
        { id: 'ray-rules' as TopicId, title: '6. Ray Tracing Guidelines (Mirrors)', category: 'Reflection' },
        { id: 'image-formation-mirrors' as TopicId, title: '7. Image Formation in Spherical Mirrors', category: 'Reflection' },
        { id: 'sign-convention' as TopicId, title: '8. Sign Conventions & Formulas', category: 'Mathematics' },
        { id: 'multiple-reflection' as TopicId, title: '9. Multiple Reflections & Kaleidoscope (Class VIII)', category: 'Multiple Reflection' },
        { id: 'refraction' as TopicId, title: '10. Refraction of Light & Glass Slabs', category: 'Refraction' },
        { id: 'prism-refraction' as TopicId, title: '11. Refraction by Prism & Spectrum', category: 'Dispersion' },
        { id: 'lenses' as TopicId, title: '12. Spherical Lenses & Ray Rules', category: 'Refraction' },
        { id: 'lens-formulas' as TopicId, title: '13. Lens Formula & Magnification', category: 'Mathematics' },
        { id: 'lens-power' as TopicId, title: '14. Power of a Lens', category: 'Mathematics' },
        { id: 'combined-lenses' as TopicId, title: '15. Combined Lenses (Convex & Concave)', category: 'Refraction' },
        { id: 'human-eye' as TopicId, title: '16. Structure, Defects & Care of Human Eye', category: 'Applied Optics' },
        { id: 'braille' as TopicId, title: '17. Visually Impaired & Braille System (Class VIII)', category: 'Inclusion' },
        { id: 'light-phenomena' as TopicId, title: '18. Optical Phenomena in Nature & Atmos Refraction', category: 'Dispersion' },
      ];
    }
  }, [preparingFor]);

  useEffect(() => {
    if (!currentTopics.some(t => t.id === activeTopic)) {
      setActiveTopic(currentTopics[0]?.id || 'light-nature');
    }
  }, [currentTopics, activeTopic, preparingFor]);

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`} id="learn-optics-container">
      {/* ── Mobile Sticky Navigation Header ── */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? 'bg-white/95 border-b border-slate-200' : 'bg-[#0d1424]/95 border-b border-slate-800'}`} id="learn-optics-mobile-header">
        {/* Row 1: The label/block category (above) */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-500" />
            <span className={`text-xs uppercase tracking-widest font-black font-mono ${isLightMode ? 'text-slate-800' : 'text-cyan-400'}`}>
              {preparingFor === '8th' || preparingFor === '9th' ? 'Class VIII Notes' : preparingFor === '10th' ? 'Class X Notes' : 'Class XII Notes'}
            </span>
          </div>
          <button
            onClick={handleDownloadNotes}
            className={`flex items-center gap-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded transition ${isLightMode ? 'bg-cyan-600 hover:bg-cyan-700 text-white' : 'bg-cyan-500 hover:bg-cyan-400 text-[#0d1424]'}`}
          >
            <Printer className="w-2.5 h-2.5" />
            PDF
          </button>
        </div>

        {/* Row 2: Selected Topic dropdown (below) */}
        <div className="relative w-full">
          <select
            value={activeTopic}
            onChange={(e) => setActiveTopic(e.target.value as TopicId)}
            className={`w-full appearance-none text-xs font-bold border px-3 py-2 pr-9 rounded-xl transition cursor-pointer outline-none focus:border-cyan-400 font-sans shadow ${
              isLightMode 
                ? 'bg-white text-slate-800 border-slate-200 hover:border-slate-300' 
                : 'bg-[#11192d] hover:bg-[#16213b] text-slate-100 border-slate-800 hover:border-cyan-500/50'
            }`}
          >
            {currentTopics.map(topic => (
              <option key={topic.id} value={topic.id} className={isLightMode ? 'bg-white text-slate-800' : 'bg-[#0f172a] text-slate-300 font-semibold p-2'}>
                {topic.title}
              </option>
            ))}
          </select>
          <ChevronRight className="w-4 h-4 text-cyan-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
        </div>
      </div>

      {/* ── Side topics navigation list ── */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${
        isLightMode ? 'bg-white border-r border-slate-200' : 'bg-[#0d1424] border-r border-[#1e293b]'
      }`} id="learn-optics-sidebar">
        <div className={`p-4 border-b space-y-3 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-500" />
              <h3 className={`text-sm font-black tracking-wider uppercase ${isLightMode ? 'text-slate-850' : 'text-slate-100'}`}>
                {preparingFor === '8th' || preparingFor === '9th' ? 'Class VIII CBSE Notes' : preparingFor === '10th' ? 'Class X CBSE Study Notes' : 'Class XII Advanced Study Notes'}
              </h3>
            </div>
            <p className={`text-[11px] mt-1 font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              {preparingFor === '8th' || preparingFor === '9th'
                ? 'Syllabus definitions, laws of reflection, and plane mirror concepts.'
                : preparingFor === '10th'
                ? 'Class X Light syllabus definitions, sign conventions, and board formulas.'
                : 'Comprehensive textbook coverage with standard SI Units and definitions.'}
            </p>
          </div>
          <button
            onClick={handleDownloadNotes}
            className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 ${
              isLightMode 
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-600/10' 
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-450/5'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            Download {preparingFor === '8th' || preparingFor === '9th' ? 'Class VIII' : preparingFor === '10th' ? 'Class X' : 'Class XII'} Notes (Handwritten & PDF)
          </button>
        </div>
        
        {/* Navigation list */}
        <nav className="p-2 space-y-1.5 flex-1" id="learn-nav">
          {currentTopics.map(topic => {
            const isActive = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`w-full text-left p-3.5 rounded-xl transition duration-150 flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? isLightMode
                      ? 'bg-cyan-50 border border-cyan-200 text-cyan-900 font-bold shadow-sm shadow-cyan-100'
                      : 'bg-[#1b2a47] border border-cyan-500/30 text-white font-bold shadow-lg shadow-cyan-400/5'
                    : isLightMode
                      ? 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold border border-transparent'
                      : 'bg-transparent hover:bg-slate-800/40 text-slate-400 hover:text-slate-200 font-semibold border border-transparent'
                }`}
              >
                <div className="space-y-0.5">
                  <span className={`text-[10px] uppercase tracking-widest block font-bold font-mono ${
                    isActive 
                      ? isLightMode ? 'text-cyan-700' : 'text-cyan-400' 
                      : isLightMode ? 'text-slate-400' : 'text-slate-450'
                  }`}>
                    {topic.category}
                  </span>
                  <span className={`text-xs tracking-tight line-clamp-1 ${
                    isActive 
                      ? isLightMode ? 'text-cyan-950 font-black' : 'text-slate-100' 
                      : isLightMode ? 'text-slate-700 group-hover:text-slate-900' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>{topic.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive 
                    ? 'translate-x-1 text-cyan-500' 
                    : isLightMode ? 'text-slate-400 group-hover:text-slate-600' : 'text-slate-500 group-hover:text-slate-200'
                }`} />
              </button>
            );
          })}
        </nav>

        {/* Removed CBSE Exam Weightage banner */}
      </aside>

      {/* ── Main Book Contents Viewport ── */}
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin flex flex-col justify-between transition-colors duration-300 ${isLightMode ? 'bg-white' : 'bg-[#060b14]'}`} id="learn-optics-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-optics-main {
            font-size: 18px !important;
          }
          #learn-optics-main p,
          #learn-optics-main li,
          #learn-optics-main span,
          #learn-optics-main label,
          #learn-optics-main blockquote,
          #learn-optics-main code,
          #learn-optics-main table,
          #learn-optics-main td,
          #learn-optics-main th,
          #learn-optics-main div:not(.bg-gradient-to-r):not(.bg-cyan-500):not(.bg-cyan-600):not(.bg-cyan-50):not(.bg-teal-50):not(.bg-emerald-50):not(.bg-amber-50):not(.bg-violet-50):not(.bg-amber-400):not(.bg-emerald-500):not(.text-slate-950) {
            color: ${isLightMode ? '#334155' : '#f1f5f9'} !important; /* Dynamic high-contrast reading text */
          }
          #learn-optics-main p,
          #learn-optics-main li {
            font-size: 1.15rem !important; /* Elevated prominent reading size */
            line-height: 1.75 !important;
          }
          #learn-optics-main b,
          #learn-optics-main strong,
          #learn-optics-main h1,
          #learn-optics-main h2,
          #learn-optics-main h3,
          #learn-optics-main h4,
          #learn-optics-main h5 {
            color: ${isLightMode ? '#0f172a' : '#ffffff'} !important; /* Dynamic bold/heading contrast */
          }
          /* Ensure specific colorful highlight classes are brilliantly glowing and fully legible */
          #learn-optics-main .text-\\[\\#22d3ee\\],
          #learn-optics-main .text-cyan-450,
          #learn-optics-main .text-cyan-400,
          #learn-optics-main .text-cyan-300,
          #learn-optics-main .text-cyan-500 {
            color: ${isLightMode ? '#0891b2' : '#22d3ee'} !important;
          }
          #learn-optics-main .text-amber-400,
          #learn-optics-main .text-amber-500 {
            color: ${isLightMode ? '#b45309' : '#f59e0b'} !important;
          }
          #learn-optics-main .text-emerald-400,
          #learn-optics-main .text-emerald-300 {
            color: ${isLightMode ? '#047857' : '#34d399'} !important;
          }
          #learn-optics-main .text-rose-450,
          #learn-optics-main .text-rose-400,
          #learn-optics-main .text-rose-500 {
            color: ${isLightMode ? '#be123c' : '#fb7185'} !important;
          }
          #learn-optics-main .text-yellow-350,
          #learn-optics-main .text-yellow-400,
          #learn-optics-main .text-yellow-300 {
            color: ${isLightMode ? '#a16207' : '#facc15'} !important;
          }
          #learn-optics-main .text-slate-400,
          #learn-optics-main .text-slate-450,
          #learn-optics-main .text-slate-500 {
            color: ${isLightMode ? '#64748b' : '#cbd5e1'} !important;
          }
          /* Rayleigh simulator box keeps a permanently dark sky background in both modes,
             so its caption text must stay bright regardless of the generic reading-text color above. */
          #learn-optics-main #rayleigh-scatter-box p {
            color: #cbd5e1 !important;
          }
          #learn-optics-main #rayleigh-scatter-box p b.text-cyan-400 {
            color: #22d3ee !important;
          }
          #learn-optics-main #rayleigh-scatter-box p b.text-blue-400 {
            color: #60a5fa !important;
          }
          #learn-optics-main #rayleigh-scatter-box p b.text-red-400 {
            color: #f87171 !important;
          }
          #learn-optics-main .text-xs {
            font-size: 0.88rem !important;
          }
          #learn-optics-main .text-[10px],
          #learn-optics-main .text-[11px],
          #learn-optics-main .text-[10.5px],
          #learn-optics-main .text-[9.5px],
          #learn-optics-main .text-[9px] {
            font-size: 0.82rem !important;
          }
          /* Hide all Topic Module badges as requested */
          #learn-optics-main span.text-xs.uppercase.font-mono.font-black.tracking-widest {
            display: none !important;
          }

          /* Override all dark background blocks when isLightMode is true */
          ${isLightMode ? `
            #learn-optics-container .bg-slate-900,
            #learn-optics-container .bg-\\[\\#0b101d\\],
            #learn-optics-container .bg-\\[\\#070b12\\],
            #learn-optics-container .bg-\\[\\#050912\\],
            #learn-optics-container .bg-\\[\\#040810\\],
            #learn-optics-container .bg-\\[\\#121c2e\\],
            #learn-optics-container .bg-slate-950,
            #learn-optics-container .bg-slate-900\\/40,
            #learn-optics-container svg {
              background-color: #ffffff !important;
              background-image: none !important;
              border-color: #cbd5e1 !important;
            }

            #learn-optics-container .border-slate-800,
            #learn-optics-container .border-slate-850,
            #learn-optics-container .border-slate-900 {
              border-color: #cbd5e1 !important;
            }

            /* Ensure text inside SVG and blocks is high contrast */
            #learn-optics-container svg text {
              fill: #0f172a !important;
            }
            #learn-optics-container svg text[fill="#94a3b8"],
            #learn-optics-container svg text[fill="#6366f1"],
            #learn-optics-container svg text[fill="#818cf8"],
            #learn-optics-container svg text[fill="#a78bfa"],
            #learn-optics-container svg text[fill="#f87171"],
            #learn-optics-container svg text[fill="#facc15"] {
              fill: #334155 !important;
              font-weight: bold !important;
            }
            #learn-optics-container svg text[fill="white"] {
              fill: #000000 !important;
            }
            #learn-optics-container svg line[stroke="white"] {
              stroke: #475569 !important;
            }
            #learn-optics-container svg path[stroke="white"] {
              stroke: #475569 !important;
            }
            #learn-optics-container svg circle[stroke="white"] {
              stroke: #475569 !important;
            }
            #learn-optics-container svg text[fill="#22d3ee"] {
              fill: #0891b2 !important;
            }

            /* Rayleigh scattering simulator keeps a permanently dark sky background in both modes,
               so its text must keep its own bright colours instead of the generic light-mode overrides above. */
            #learn-optics-container #rayleigh-scatter-box svg text[fill="#fbbf24"] { fill: #fbbf24 !important; }
            #learn-optics-container #rayleigh-scatter-box svg text[fill="#cbd5e1"] { fill: #cbd5e1 !important; }
            #learn-optics-container #rayleigh-scatter-box svg text[fill="#f97316"] { fill: #f97316 !important; }
            #learn-optics-container #rayleigh-scatter-box svg text[fill="#22d3ee"] { fill: #22d3ee !important; }
            #learn-optics-container #rayleigh-scatter-box svg text[fill="#67e8f9"] { fill: #67e8f9 !important; }
            #learn-optics-container #rayleigh-scatter-box svg text[fill="#38bdf8"] { fill: #38bdf8 !important; }
            #learn-optics-container #rayleigh-scatter-box svg text[fill="#ef4444"] { fill: #ef4444 !important; }
            #learn-optics-container #rayleigh-scatter-box svg text[fill="#e2e8f0"] { fill: #e2e8f0 !important; }

            /* For interactive simulator inside notes (e.g. Topic 8 & 9) */
            #learn-optics-container select,
            #learn-optics-container input[type="range"] {
              background-color: #f1f5f9 !important;
              color: #0f172a !important;
              border-color: #cbd5e1 !important;
            }
          ` : ''}
        ` }} />
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Special Class 10 PDF Export Banner */}
          {preparingFor === '10th' && (
            <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs ${isLightMode ? 'from-cyan-50 via-blue-50 to-cyan-50 border-cyan-300' : 'from-cyan-950/40 via-[#0a182d]/40 to-blue-950/40 border-cyan-500/20'}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-[#22d3ee] tracking-tight">Class X: optics notes</h4>
                </div>
              </div>
              <button
                onClick={handleDownloadNotes}
                className="shrink-0 flex items-center gap-1.5 py-2 px-4 bg-cyan-500 hover:bg-cyan-400 text-[#0d1424] font-black uppercase tracking-wider text-[11px] rounded-xl transition cursor-pointer hover:shadow-lg hover:shadow-cyan-400/5 active:scale-95"
              >
                <Printer className="w-3.5 h-3.5" />
                Download Class 10 Notes (Handwritten & PDF)
              </button>
            </div>
          )}

          {/* ────── TOPIC 1: LIGHT & ELECTROMAGNETIC SPECTRUM ────── */}
          {activeTopic === 'light-em-spectrum' && (
            <div className="space-y-6 animate-fade-in" id="topic-light-em-spectrum">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Light & Electromagnetic Spectrum
                </h1>
                <p className="text-slate-300 text-sm font-semibold">
                  Understand what light is and how it interacts with the complete spectrum of electromagnetic radiation.
                </p>
              </div>

              {/* CORE DEFINITIONS */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                </div>
                <div className="space-y-3 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>
                    <b className="text-white">1. Electromagnetic Radiation (EMR):</b> A stream of energy that moves through space in the form of electric and magnetic fields. It does not require any material (medium) to travel, which is why sunlight can travel through empty vacuum to reach us!
                  </p>
                  <p>
                    <b className="text-white">2. Electromagnetic Spectrum:</b> The complete family of all electromagnetic waves, put in order of their wavelengths or frequencies. It includes everything from giant radio waves to tiny cosmic rays.
                  </p>
                  <p>
                    <b className="text-white">3. Visible Light:</b> The tiny part of the electromagnetic spectrum that our eyes can actually see. It is made of different colors (VIBGYOR) that mix together to make white light.
                  </p>
                </div>
              </div>

              {/* PHYSICAL QUANTITIES AND SI UNITS */}
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & Standard Units</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Speed of Light in Vacuum (c)</span>
                    <span className="font-mono text-cyan-400 font-black">3 &times; 10⁸ m/s</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Wavelength (λ)</span>
                    <span className="font-mono text-cyan-400 font-black">Meters (m) or Nanometers (nm)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Frequency (f or ν)</span>
                    <span className="font-mono text-cyan-400 font-black">Hertz (Hz)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Visible Spectrum Range</span>
                    <span className="font-mono text-yellow-300">400 nm to 750 nm</span>
                  </div>
                </div>
              </div>

              {/* SCIENTIFIC CONTEXT: INTERACTION WITH SPECTRUM */}
              <div className={`prose prose-sm leading-relaxed font-semibold space-y-4 ${isLightMode ? 'text-slate-800' : 'prose-invert text-slate-200'}`}>
                <p>
                  Visible light is just a very small member of a much larger family of waves called the <b>Electromagnetic Spectrum</b>. All these waves travel at the exact same lightning-fast speed of <b>300,000 km/s</b> in space, but they carry different amounts of energy based on their wavelength.
                </p>

                {/* THE COMPLETE SPECTRUM VISUALIZATION */}
                <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5" id="diagram-spectrum">
                  <span className="text-[10.5px] text-slate-400 uppercase font-mono font-black tracking-widest block mb-4 text-center">
                    Figure: The Entire Electromagnetic Spectrum showing the Visible Light Band
                  </span>
                  
                  <div className="flex justify-center flex-col items-center">
                    {/* SVG Spectrum */}
                    <svg width="100%" height="160" viewBox="0 0 600 160" className="bg-[#0b101d] rounded-xl border border-slate-800 shadow-md">
                      {/* Spectrum blocks */}
                      <g transform="translate(10, 20)">
                        {/* Wavelength Arrow */}
                        <line x1="10" y1="5" x2="570" y2="5" stroke="#475569" strokeWidth="1.5" />
                        <polygon points="570,5 562,1 562,9" fill="#475569" />
                        <text x="290" y="-2" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">WAVELENGTH INCREASES &rarr;</text>
                        <text x="290" y="55" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">&larr; ENERGY & FREQUENCY INCREASE</text>

                        {/* Bands */}
                        <g transform="translate(0, 10)">
                          {/* Gamma */}
                          <rect x="0" y="0" width="80" height="30" fill="#312e81" opacity="0.8" rx="4" />
                          <text x="40" y="18" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">Gamma Rays</text>
                          <text x="40" y="27" fill="#6366f1" fontSize="7" textAnchor="middle">10⁻¹² m</text>

                          {/* X-Ray */}
                          <rect x="83" y="0" width="80" height="30" fill="#1e1b4b" opacity="0.8" rx="4" />
                          <text x="123" y="18" fill="#bcafeb" fontSize="9" fontWeight="bold" textAnchor="middle">X-Rays</text>
                          <text x="123" y="27" fill="#818cf8" fontSize="7" textAnchor="middle">10⁻¹⁰ m</text>

                          {/* UV */}
                          <rect x="166" y="0" width="80" height="30" fill="#4c1d95" opacity="0.8" rx="4" />
                          <text x="206" y="18" fill="#d8b4fe" fontSize="9" fontWeight="bold" textAnchor="middle">Ultraviolet</text>
                          <text x="206" y="27" fill="#a78bfa" fontSize="7" textAnchor="middle">10⁻⁸ m</text>

                          {/* VISIBLE SPOTLIGHT */}
                          <rect x="249" y="0" width="80" height="30" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.5" rx="4" />
                          <text x="289" y="18" fill="#22d3ee" fontSize="9" fontWeight="black" textAnchor="middle">VISIBLE</text>
                          <text x="289" y="27" fill="#38bdf8" fontSize="7" textAnchor="middle">10⁻⁶ m</text>

                          {/* Infrared */}
                          <rect x="332" y="0" width="80" height="30" fill="#7f1d1d" opacity="0.8" rx="4" />
                          <text x="372" y="18" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">Infrared</text>
                          <text x="372" y="27" fill="#f87171" fontSize="7" textAnchor="middle">10⁻⁵ m</text>

                          {/* Microwave */}
                          <rect x="415" y="0" width="80" height="30" fill="#78350f" opacity="0.8" rx="4" />
                          <text x="455" y="18" fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="middle">Microwave</text>
                          <text x="455" y="27" fill="#facc15" fontSize="7" textAnchor="middle">10⁻² m</text>

                          {/* Radio */}
                          <rect x="498" y="0" width="80" height="30" fill="#064e3b" opacity="0.8" rx="4" />
                          <text x="538" y="18" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle">Radio Waves</text>
                          <text x="538" y="27" fill="#34d399" fontSize="7" textAnchor="middle">10² m</text>
                        </g>

                        {/* Expanded Rainbow details */}
                        <g transform="translate(0, 50)">
                          {/* Dotted lines from Visible block */}
                          <line x1="249" y1="-10" x2="200" y2="25" stroke="#22d3ee" strokeDasharray="3 3" opacity="0.5" />
                          <line x1="329" y1="-10" x2="380" y2="25" stroke="#22d3ee" strokeDasharray="3 3" opacity="0.5" />

                          {/* Beautiful gradient bar */}
                          <defs>
                            <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="16%" stopColor="#3b82f6" />
                              <stop offset="33%" stopColor="#06b6d4" />
                              <stop offset="50%" stopColor="#10b981" />
                              <stop offset="66%" stopColor="#eab308" />
                              <stop offset="83%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                          </defs>

                          <rect x="200" y="25" width="180" height="15" fill="url(#rainbow)" rx="2" />
                          
                          {/* Violet mark */}
                          <text x="200" y="49" fill="#a78bfa" fontSize="8" fontWeight="bold" textAnchor="middle">Violet</text>
                          <text x="200" y="58" fill="#cbd5e1" fontSize="7.5" textAnchor="middle">400nm</text>

                          {/* Red mark */}
                          <text x="380" y="49" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">Red</text>
                          <text x="380" y="58" fill="#cbd5e1" fontSize="7.5" textAnchor="middle">750nm</text>

                          <text x="290" y="49" fill="#e2e8f0" fontSize="8.5" fontWeight="black" textAnchor="middle">V I B G Y O R Spectrum</text>
                        </g>

                      </g>
                    </svg>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#22d3ee] rounded-full" />
                    How Visible Light Interacts with the EM Spectrum
                  </h4>
                  <p className="text-slate-350 text-[11px] leading-relaxed">
                    The sun and other stars radiate energy across the entire spectrum. Earth's atmosphere acting as a filter blocks extremely high-energy rays (Gamma rays and X-rays) that would be harmful, while visible light and radio waves pass through easily. Visible light is the specific small band of wavelengths that triggers chemical receptors in human retinas, enabling us to see our world!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ────── TOPIC 2: DUAL NATURE OR DEFINITION OF LIGHT (DEPENDS ON CLASS) ────── */}
          {activeTopic === 'light-nature' && (
            preparingFor === '12th' ? (
              <div className="space-y-6 animate-fade-in" id="topic-light-nature-12th">
                <div className="space-y-1.5 border-b border-slate-800 pb-4">
                  <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                    Dual Nature & Behavior of Light
                  </h1>
                  <p className="text-slate-400 text-xs font-semibold">
                    Discover what light does, how scientists discovered its dual nature, and how it interacts with different surfaces.
                  </p>
                </div>

                {/* CORE DEFINITIONS */}
                <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Concepts</h3>
                  </div>
                  <div className="space-y-3 text-xs font-semibold leading-relaxed text-slate-300">
                    <p>
                      <b className="text-white">1. Dual Nature of Light:</b> Light behaves both as a wave and as a particle (stream of photons). It behaves like ripples when traveling through space, and acts like packets of energy when colliding with surfaces.
                    </p>
                    <p>
                      <b className="text-white">2. Reflection process:</b> The bouncing back of light when it strikes the boundary of a medium.
                    </p>
                    <p>
                      <b className="text-[#22d3ee]">3. Refraction process:</b> The bending of light as it moves from one transparent medium to another, caused by its change in velocity.
                    </p>
                  </div>
                </div>

                {/* THE DUAL NATURE DISCOVERY */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-amber-500 font-mono">How the Dual Nature was Discovered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <span className="text-[13px] font-black text-cyan-400 uppercase font-mono">1. The Wave Nature</span>
                      <p className="text-slate-300 text-xs font-bold">Christian Huygens & Thomas Young</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                        Huygens proposed that light travels as continuous waves. Later, Thomas Young proved this with his famous <b>Double-Slit Experiment</b>. When light was passed through two tiny slits, it formed bright and dark bands (interference fringes) on a screen. This is exactly how two water ripples meet and cross, proving light travels as waves!
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <span className="text-[13px] font-black text-[#4ade80] uppercase font-mono">2. The Particle Nature</span>
                      <p className="text-slate-300 text-xs font-bold">Isaac Newton & Albert Einstein</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                        Isaac Newton believed light was made of tiny solid pellets (corpuscles). Much later, Albert Einstein proved the particle nature using the <b>Photoelectric Effect</b>. When light was shone on a piece of metal, it knocked out electric particles (electrons) like tiny billiard balls! This proved light travels in tiny energy packets called <b>photons</b>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* DUAL NATURE SVG DIAGRAM - SIDE BY SIDE GRID TO RECLAIM EMPTY SPACE */}
                <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5" id="diagram-dual-nature">
                  <span className="text-[10.5px] text-slate-400 uppercase font-mono font-black tracking-widest block mb-4">
                    Figure: Wave-Particle Dual Behavior of Optical Radiation
                  </span>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                    {/* Column 1: SVG Diagram */}
                    <div className="flex justify-center w-full">
                      {(() => {
                        const cCyan = isLightMode ? '#0e7490' : '#22d3ee';
                        const cGreen = isLightMode ? '#15803d' : '#4ade80';
                        const cSlateDim = isLightMode ? '#334155' : '#94a3b8';
                        const cDivider = isLightMode ? '#cbd5e1' : '#334155';
                        return (
                          <svg width="100%" height="130" viewBox="0 0 400 130" className={`rounded-xl border shadow-lg max-w-[400px] transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b101d] border-slate-800'}`}>
                            {/* Left block (Wave) */}
                            <text x="100" y="25" fill={cCyan} fontSize="10" fontWeight="bold" textAnchor="middle">WAVE NATURE (Traveling)</text>
                            <path d="M 20,65 Q 40,35 60,65 T 100,65 T 140,65 T 180,65" fill="none" stroke={cCyan} strokeWidth="2" />
                            <text x="100" y="90" fill={cSlateDim} fontSize="8" fontStyle="italic" textAnchor="middle">Acts like continuous ripples in water</text>

                            {/* Dividing line */}
                            <line x1="200" y1="15" x2="200" y2="115" stroke={cDivider} strokeWidth="1" strokeDasharray="3 3" />

                            {/* Right block (Particle) */}
                            <text x="300" y="25" fill={cGreen} fontSize="10" fontWeight="bold" textAnchor="middle">PARTICLE NATURE (Hitting)</text>

                            {/* Photons */}
                            <g transform="translate(10, 0)">
                              <circle cx="240" cy="50" r="4" fill={cGreen} />
                              <path d="M 225,50 Q 230,45 235,50" fill="none" stroke={cGreen} strokeWidth="1" />

                              <circle cx="280" cy="70" r="4" fill={cGreen} />
                              <path d="M 265,70 Q 270,65 275,70" fill="none" stroke={cGreen} strokeWidth="1" />

                              <circle cx="320" cy="45" r="4" fill={cGreen} />
                              <path d="M 305,45 Q 310,40 315,45" fill="none" stroke={cGreen} strokeWidth="1" />

                              <circle cx="340" cy="75" r="4" fill={cGreen} />
                              <path d="M 325,75 Q 330,70 335,75" fill="none" stroke={cGreen} strokeWidth="1" />
                            </g>
                            <text x="300" y="90" fill={cSlateDim} fontSize="8" fontStyle="italic" textAnchor="middle">Acts like a stream of energy packets (Photons)</text>
                          </svg>
                        );
                      })()}
                    </div>

                    {/* Column 2: Explanation Text - covering every empty space */}
                    <div className="space-y-2 text-xs">
                      <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase font-mono tracking-wider text-cyan-400">
                        Modern Quantum Fusion of Light
                      </h4>
                      <p className="text-slate-350 leading-relaxed font-semibold">
                        Historically, Isaac Newton believed light consisted of particles, while Christian Huygens proposed it traveled in waves. Thomas Young proved the wave theory using double-slit interference. Albert Einstein verified the particle theory in 1905 via the Photoelectric Effect.
                      </p>
                      <ul className="text-slate-400 space-y-1 list-disc pl-4 leading-relaxed font-semibold">
                        <li><b>Wave properties:</b> Interference, diffraction, and polarisation.</li>
                        <li><b>Particle properties:</b> Photoelectric outcome, Compton scattering, and target interaction.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* THREE TYPES OF SURFACES / MATERIALS */}
                <div className="bg-[#121c2e]/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Types of Materials Light Hits</h3>
                  <p className="text-slate-350 text-[11px] leading-relaxed">
                    How light behaves when it hits an object depends completely on the material that the object is made of:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2">
                      <span className="text-[12px] font-black text-[#38bdf8] uppercase font-mono tracking-wider">1. Transparent Objects</span>
                      <p className="text-[11px] text-slate-400">
                        These objects let <b>almost all light pass through</b> them in straight paths, allowing you to see through them perfectly.
                      </p>
                      <div className="text-[10px] text-zinc-300 font-bold bg-zinc-900 px-2 py-1 rounded inline-block">
                        Examples: Clean Water, Air, Pure Glass
                      </div>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2">
                      <span className="text-[12px] font-black text-amber-500 uppercase font-mono tracking-wider">2. Translucent Objects</span>
                      <p className="text-[11px] text-slate-400">
                        These objects let <b>some light pass through</b>, but they scatter the rays in all directions, so you cannot see objects clearly behind them.
                      </p>
                      <div className="text-[10px] text-zinc-300 font-bold bg-zinc-900 px-2 py-1 rounded inline-block">
                        Examples: Frosted Glass, Butter Paper, Thin Plastic
                      </div>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2">
                      <span className="text-[12px] font-black text-rose-400 uppercase font-mono tracking-wider">3. Opaque Objects</span>
                      <p className="text-[11px] text-slate-400">
                        These objects do <b>not let any light pass through</b>! Instead, they swallow (absorb) the light, reflect it, or bounce it away entirely.
                      </p>
                      <div className="text-[10px] text-zinc-300 font-bold bg-zinc-900 px-2 py-1 rounded inline-block">
                        Examples: Wooden door, Brick wall, Metal plate
                      </div>
                    </div>
                  </div>
                </div>

                {/* RELATED PROCESSES */}
                <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-amber-500 font-mono">Processes of Light and Matter</h3>
                  <p className="text-slate-350 text-[11px] leading-relaxed font-semibold">
                    When light hits any of these materials, some very important physical processes take place:
                  </p>
                  <div className="space-y-3.5 text-xs font-semibold leading-relaxed">
                    <p className="text-slate-300 pl-3 border-l-2 border-cyan-500">
                      <b className="text-white">Reflection:</b> When light waves strike a surface and get thrown back into the same medium. Smooth polished surfaces cause neat organized reflection (as seen in mirrors).
                    </p>
                    <p className="text-slate-300 pl-3 border-l-2 border-emerald-500">
                      <b className="text-white">Refraction:</b> When light rays enter a transparent medium at an angle and bend. This happens because light moves at different speeds in different materials!
                    </p>
                    <p className="text-slate-300 pl-3 border-l-2 border-rose-500">
                      <b className="text-white">Absorption:</b> When light energy is taken in by an object and converted into thermal energy (heat). This is why dark-colored clothes get warm under sunny rays.
                    </p>
                    <p className="text-slate-300 pl-3 border-l-2 border-yellow-500">
                      <b className="text-white">Scattering:</b> When tiny particles in a material absorb light and throw it out in all different directions. This is the cool physical process that makes earth's sky look blue!
                    </p>
                  </div>
                </div>

                {/* DETAILED REFLECTION & REFRACTION EXPLANATION */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#22d3ee] font-mono">How Light Reflects, Refracts, and Stays Orderly</h3>
                  
                  <div className="space-y-4 text-xs font-semibold leading-relaxed text-slate-300">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-2">
                      <h4 className="text-white font-black text-xs">A. How Light Reflects (Bouncing back)</h4>
                      <p className="text-slate-400">
                        When light rays fall on a smooth, flat polished object (like a mirror or silver plate), they bounce off in an orderly, neat way. This causes a clear image to form, which we call <b>Regular (Specular) Reflection</b>. 
                      </p>
                      <p className="text-slate-400">
                        When light falls on rough, opaque surfaces (like wood, paper, or brick walls), the rays are bounced back in all different directions. We call this <b>Irregular (Diffuse) Reflection</b>. It doesn't form any image, but it allows us to see the object from any angle!
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-2">
                      <h4 className="text-white font-black text-xs">B. Introduce: The Two Laws of Reflection</h4>
                      <p className="text-slate-400">
                        Every single light ray obeys two very strict rules whenever it bounces off a surface:
                      </p>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-300 font-bold">
                        <li>
                          <b className="text-white">First Law (Angles):</b> The angle of the incoming ray (angle of incidence, <i>i</i>) is always perfectly equal to the angle of the outgoing ray (angle of reflection, <i>r</i>). So, <code className="text-yellow-300">∠i = ∠r</code>.
                        </li>
                        <li>
                          <b className="text-white">Second Law (Plane):</b> The incoming ray, the reflected ray, and the perpendicular line (Normal) at the hitting point must all be drawn on the exact same flat, dimensional space.
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-2">
                      <h4 className="text-white font-black text-xs">C. How Light Refracts (Bending)</h4>
                      <p className="text-slate-400">
                        When a beam of light travels from one medium to another (for example, from air into glass), its speed changes suddenly. This change in speed causes the ray to bend. We call this <b>Refraction</b>!
                      </p>
                      <p className="text-slate-400">
                        Think of how a toy shopping trolley bends when you push it from smooth pavement onto thick mud at an angle. The wheels that hit the mud first slow down immediately, while the other wheels keep going fast. This sudden imbalance swings the trolley to a new angle!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Class 10/8/9 Compliant "Definition of Light & How We See Objects"
              <div className="space-y-6 animate-fade-in" id="topic-light-nature-standard">
                <div className="space-y-1.5 border-b border-slate-800 pb-4">
                  <span className="text-xs uppercase font-mono font-black tracking-widest text-[#22d3ee] bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20 inline-block" style={{ display: 'none' }}>
                    Syllabus Class X
                  </span>
                  <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                    Definition of Light & How We See Objects
                  </h1>
                  <p className="text-slate-400 text-xs font-semibold">
                    The fundamental starting point of optics: what is light, how our eyes perceive objects, and basic properties.
                  </p>
                </div>

                {/* THE SEED CONCEPT: HOW WE SEE */}
                <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Concept: Sensation of Vision</h3>
                  </div>
                  <div className="space-y-3 text-xs font-semibold leading-relaxed text-slate-300">
                    <p>
                      <b className="text-white">What is Light?</b> Light is a visual form of energy that stimulates our eyes and produces the sensation of sight, allowing us to interact with the colorful world around us.
                    </p>
                    <p>
                      <b className="text-white">What makes things visible?</b> We see a variety of objects in the world around us. However, we are unable to see anything in a completely dark room. On lighting up the room, things become visible. 
                    </p>
                    <p>
                      <b className="text-[#22d3ee]">Reflective Perception:</b> During the day, the sunlight helps us to see objects. An object reflects the light rays falling on it. When these reflected light rays are received by our eyes, they stimulate our retinas, allowing us to see things! We can see through transparent media as light is transmitted through them.
                    </p>
                  </div>
                </div>

                {/* HOW WE SEE THINGS DIAGRAM - FULL-WIDTH STACKED LAYOUT */}
                <div className={`rounded-2xl p-5 border transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-850'}`} id="diagram-how-we-see">
                  <span className={`text-sm uppercase font-mono font-black tracking-widest block mb-4 ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>
                    Figure: Ray Diagram of Reflective Vision
                  </span>

                  <div className="flex flex-col gap-5">
                    {/* Full-width SVG Diagram */}
                    <div className="w-full">
                      <svg width="100%" height="220" viewBox="0 0 800 220" className={`w-full rounded-xl border shadow-lg transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b101d] border-slate-800'}`}>
                        <defs>
                          <marker id="visionArrowAmber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                            <path d="M 0,0 L 10,5 L 0,10 Z" fill={isLightMode ? '#b45309' : '#fbbf24'} />
                          </marker>
                          <marker id="visionArrowRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                            <path d="M 0,0 L 10,5 L 0,10 Z" fill={isLightMode ? '#b91c1c' : '#ef4444'} />
                          </marker>
                        </defs>

                        {/* Sun/Source on left */}
                        <g transform="translate(90, 110)">
                          <circle cx="0" cy="0" r="24" fill={isLightMode ? '#d97706' : '#fbbf24'} className="animate-pulse" />
                          <circle cx="0" cy="0" r="18" fill={isLightMode ? '#f59e0b' : '#f59e0b'} />
                          <line x1="0" y1="0" x2="0" y2="-34" stroke={isLightMode ? '#b45309' : '#fbbf24'} strokeWidth="2.5" />
                          <line x1="0" y1="0" x2="0" y2="34" stroke={isLightMode ? '#b45309' : '#fbbf24'} strokeWidth="2.5" />
                          <line x1="0" y1="0" x2="-34" y2="0" stroke={isLightMode ? '#b45309' : '#fbbf24'} strokeWidth="2.5" />
                          <line x1="0" y1="0" x2="34" y2="0" stroke={isLightMode ? '#b45309' : '#fbbf24'} strokeWidth="2.5" />
                          <line x1="0" y1="0" x2="24" y2="-24" stroke={isLightMode ? '#b45309' : '#fbbf24'} strokeWidth="2.5" />
                          <line x1="0" y1="0" x2="-24" y2="-24" stroke={isLightMode ? '#b45309' : '#fbbf24'} strokeWidth="2.5" />
                          <line x1="0" y1="0" x2="24" y2="24" stroke={isLightMode ? '#b45309' : '#fbbf24'} strokeWidth="2.5" />
                          <line x1="0" y1="0" x2="-24" y2="24" stroke={isLightMode ? '#b45309' : '#fbbf24'} strokeWidth="2.5" />
                          <text x="0" y="52" fill={isLightMode ? '#92400e' : '#fbbf24'} fontSize="12" fontWeight="bold" textAnchor="middle">Sun (Light Source)</text>
                        </g>

                        {/* Object (Apple/Sphere) in middle */}
                        <g transform="translate(400, 150)">
                          <circle cx="0" cy="0" r="20" fill={isLightMode ? '#dc2626' : '#ef4444'} />
                          <path d="M -7,-18 Q 0,-30 6,-18" fill="none" stroke={isLightMode ? '#16a34a' : '#22c55e'} strokeWidth="3" />
                          <text x="0" y="42" fill={isLightMode ? '#991b1b' : '#fca5a5'} fontSize="12" fontWeight="bold" textAnchor="middle">Object (Reflector)</text>
                        </g>

                        {/* Human Eye on right */}
                        <g transform="translate(700, 90)">
                          <path d="M -34,0 C -14,-22 14,-22 34,0 C 14,22 -14,22 -34,0 Z" fill={isLightMode ? '#f1f5f9' : '#ffffff'} stroke={isLightMode ? '#64748b' : '#cbd5e1'} strokeWidth="2" />
                          <circle cx="0" cy="0" r="11" fill="#0284c7" />
                          <circle cx="0" cy="0" r="4.5" fill="#000000" />
                          <path d="M 16,-20 Q 20,-27 24,-20" fill="none" stroke={isLightMode ? '#475569' : '#94a3b8'} strokeWidth="1.5" />
                          <text x="0" y="46" fill={isLightMode ? '#075985' : '#38bdf8'} fontSize="12" fontWeight="bold" textAnchor="middle">Observer Eye</text>
                        </g>

                        {/* Light rays paths */}
                        {/* Ray 1: Sun to Object (incident) */}
                        <line x1="113.8" y1="113.1" x2="247" y2="130.25" stroke={isLightMode ? '#b45309' : '#fbbf24'} strokeWidth="3" strokeDasharray="6 3" markerEnd="url(#visionArrowAmber)" />
                        <line x1="247" y1="130.25" x2="380.2" y2="147.4" stroke={isLightMode ? '#b45309' : '#fbbf24'} strokeWidth="3" strokeDasharray="6 3" />
                        <text x="247" y="115" fill={isLightMode ? '#92400e' : '#fbbf24'} fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(7.4, 247, 121)">1. Incident Ray</text>

                        {/* Ray 2: Object to Eye (reflected) */}
                        <line x1="419.6" y1="146.1" x2="542.15" y2="121.6" stroke={isLightMode ? '#b91c1c' : '#ef4444'} strokeWidth="3" strokeDasharray="6 3" markerEnd="url(#visionArrowRed)" />
                        <line x1="542.15" y1="121.6" x2="664.7" y2="97.1" stroke={isLightMode ? '#b91c1c' : '#ef4444'} strokeWidth="3" strokeDasharray="6 3" />
                        <text x="542" y="105" fill={isLightMode ? '#991b1b' : '#fca5a5'} fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-11.3, 542, 111)">2. Reflected Ray</text>
                      </svg>
                    </div>

                    {/* Explanation Text - full width below the diagram */}
                    <div className="space-y-2 text-xs">
                      <h4 className={`text-xs font-bold flex items-center gap-1.5 uppercase font-mono tracking-wider ${isLightMode ? 'text-cyan-700' : 'text-cyan-400'}`}>
                        Scientific Principle of Vision
                      </h4>
                      <p className={`leading-relaxed font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                        A non-luminous object does not produce light. We only see it because light originating from a source (like the Sun) falls on its surface and bounces off (reflects) into our eye.
                      </p>
                      <ul className={`space-y-1 list-disc pl-4 leading-relaxed font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        <li><b>Incident Light:</b> Direct emission rays from the luminous bulb or star hitting the atoms.</li>
                        <li><b>Sensation:</b> The eye's lens focuses reflected rays onto the light-sensitive retina, exciting optical nerves.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* PROPERTIES OF LIGHT */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-amber-500 font-mono">Key Properties of Light Rays</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-semibold">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <span className="text-base font-black text-[#38bdf8] uppercase font-mono">1. Electromagnetic Wave Nature</span>
                      <p className="text-slate-300 font-sans">Self-propagating wave fields</p>
                      <p className="text-[13px] text-slate-400 leading-relaxed font-semibold">
                        Unlike sound waves which must have air, water, or iron to travel, light acts as an electromagnetic transverse wave and can cross through completely empty vacuum. This is why sunlight propagates across millions of kilometers of empty space to reach Earth!
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <span className="text-base font-black text-emerald-400 uppercase font-mono">2. Rectilinear Propagation</span>
                      <p className="text-slate-300 font-sans">Traveling in straight lines</p>
                      <p className="text-[13px] text-slate-400 leading-relaxed font-semibold">
                        Under homogeneous medium conditions, light rays move in precise straight lines. Strong evidence of this is: (i) Opaque obstacles in the way cast sharp, clear dark shadows; (ii) Light streaming through window slits forms parallel visible beams.
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2 col-span-1 md:col-span-2">
                      <span className="text-base font-black text-amber-500 uppercase font-mono">3. High Class Duality Note</span>
                      <p className="text-slate-300 font-sans">Wave-Particle Duality in Physics</p>
                      <p className="text-[13px] text-slate-400 leading-relaxed font-semibold">
                        While Class X focuses on light behaving as rays traveling in straight directions (Geometrical Optics), advanced physics proves that light exhibits a dual character—behaving like waves during travel (such as diffraction and interference through slits) and acting like particles called photons when interacting with metal surfaces (such as knocking out electrons in the photoelectric effect).
                      </p>
                    </div>
                  </div>
                </div>

                {/* INTERACTION WITH DIFFERENT MEDIUM BOUNDARIES */}
                <div className="bg-[#121c2e]/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Physical Interactions at Surfaces</h3>
                  <p className="text-slate-350 text-[11px] leading-relaxed">
                    When a straight ray of light strikes the boundary separating two media (for example, hitting a piece of polished glass or rough wood), three distinct physical events can occur:
                  </p>
                  
                  <div className="space-y-3.5 text-xs font-semibold leading-relaxed">
                    <p className="text-slate-300 pl-3 border-l-2 border-cyan-500">
                      <b className="text-white">Reflection:</b> The bouncing back of light into the identical initial medium when hitting a boundary. Smooth surfaces (like mirrors) cause regular reflection to build virtual replica images, while textured walls scatter light in all ways (diffuse reflection) making things visible without mirror copies.
                    </p>
                    <p className="text-slate-300 pl-3 border-l-2 border-emerald-500">
                      <b className="text-white">Refraction:</b> The bending of light rays as they transition obliquely from one transparent medium to a different optical density, caused by a sudden change in speed.
                    </p>
                    <p className="text-slate-300 pl-3 border-l-2 border-rose-500">
                      <b className="text-white">Absorption:</b> The process where light energy is swallowed and held by the atoms of an object, converting directly into heat. (Dark objects absorb the most light energy).
                    </p>
                  </div>
                </div>
              </div>
            )
          )}

          {/* ────── TOPIC 3: REFLECTION OF LIGHT & LAWS ────── */}
          {activeTopic === 'reflection' && (
            <div className="space-y-6 animate-fade-in" id="topic-reflection">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Laws of Reflection & Plane Mirrors
                </h1>
                <p className="text-slate-400 text-xs font-semibold">
                  Light bounces off smooth, shiny surfaces like mirrors. We start with the simple laws of reflection.
                </p>
              </div>

              {/* LAWS OF REFLECTION - FIRST */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl relative overflow-hidden space-y-3 shadow-md">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#22d3ee]" />
                <span className="text-sm font-black tracking-wider text-cyan-300 uppercase font-mono flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-cyan-400" /> THE TWO LAWS OF REFLECTION:
                </span>
                <ol className="list-decimal pl-5 text-slate-200 text-xs space-y-2.5 font-bold">
                  <li>
                    <b className="text-white">Equality of Angles:</b> The angle of incidence (<i>i</i>) is exactly equal to the angle of reflection (<i>r</i>). 
                    <div className="mt-1 font-mono text-yellow-300 bg-slate-950 px-2.5 py-1 rounded inline-flex items-center gap-1.5">
                      <span>∠i</span>
                      <span className="text-xs font-sans text-slate-400 font-bold">=</span>
                      <span>∠r</span>
                    </div>
                  </li>
                  <li>
                    <b className="text-white">Coplanarity:</b> The incident ray, the reflected ray, and the normal at the point of incidence, all lie in the <span className="text-cyan-300 font-black font-sans">same flat plane</span>.
                  </li>
                </ol>
              </div>

              {/* MANDATORY DEFINITIONS SECTION SECOND */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                </div>
                <div className="space-y-2.5 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>
                    <b className="text-white">1. Light:</b> A form of energy that we can detect with our eyes. It travels in straight lines.
                  </p>
                  <p>
                    <b className="text-white">2. Reflection:</b> The bouncing back of light when it hits a smooth surface like a mirror.
                  </p>
                  <p>
                    <b className="text-white">3. Incident Ray:</b> The ray of light that falls on the reflecting surface.
                  </p>
                  <p>
                    <b className="text-white">4. Reflected Ray:</b> The ray of light that bounces off the reflecting surface.
                  </p>
                  <p>
                    <b className="text-white">5. Normal:</b> An imaginary perpendicular line drawn at 90&deg; to the mirror at the point where the light hits.
                  </p>
                </div>
              </div>

              {/* QUANTITY UNITS BOX */}
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & Units</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Angle of Incidence (i)</span>
                    <span className="font-mono text-cyan-400 font-black">Degrees (°)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Angle of Reflection (r)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">Degrees (°)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-805 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Speed of Light (c)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">3 &times; 10⁸ m/s</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Wavelength of Visible Light</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">400 nm to 750 nm</span>
                  </div>
                </div>
              </div>

              {/* Theoretical Summary */}
              <div className={`prose prose-sm leading-relaxed font-semibold space-y-4 ${isLightMode ? 'text-slate-800' : 'prose-invert text-slate-200'}`}>
                <p>
                  Light travels in a <b>straight line</b> inside any single material. In school exams and general math, we simplify the speed of light in vacuum to <code className="text-yellow-300">c ≈ 3 × 10⁸ m / s</code> (which is 300,000 kilometers per second).
                </p>

                {/* "So What?" Factor Case study */}
                <div className="bg-cyan-950/20 border border-cyan-500/10 p-4.5 rounded-2xl space-y-2">
                  <div className="text-[10px] uppercase font-mono font-black text-cyan-400 tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    The "So What?" Factor: Why draw light as straight lines instead of waves?
                  </div>
                  <p className="text-[11px] text-slate-350 leading-relaxed font-sans font-semibold">
                    In reality, light is actually a wave. But light waves are super tiny (<b className="text-white">only 400 to 750 nanometers wide!</b>), while school mirrors and lenses are huge (measured in centimeters). Because of this massive size difference, light wraps around things so minutely that we can completely ignore its wavy nature. We can just draw simple straight lines (rays) to understand how it behaves!
                  </p>
                </div>

              </div>

              {/* ILLUSTRATION DIAL-IN: REFLECTION PROCESS - SIDE BY SIDE GRID */}
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5" id="diagram-reflection">
                <span className="text-sm text-slate-100 uppercase font-mono font-black tracking-widest block mb-4">
                  Figure: Physical Mechanics of Optical Reflection
                </span>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                  {/* Column 1: SVG Diagram */}
                  <div className="flex justify-center w-full">
                    {(() => {
                      const cSlateDim = isLightMode ? '#334155' : '#94a3b8';
                      const cRed = isLightMode ? '#b91c1c' : '#f87171';
                      const cGreen = isLightMode ? '#15803d' : '#4ade80';
                      const cMirrorGlass = isLightMode ? '#94a3b8' : '#f1f5f9';
                      const cTick = isLightMode ? '#94a3b8' : '#475569';
                      const cLabel = isLightMode ? '#0f172a' : '#f8fafc';
                      const cBackingLabel = isLightMode ? '#b91c1c' : '#dc2626';
                      return (
                        <svg width="100%" height="200" viewBox="0 0 400 200" className={`rounded-xl border shadow-lg max-w-[400px] transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b101d] border-slate-800'}`}>
                          <defs>
                            <marker id="mirrorArrowRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                              <path d="M 0,0 L 10,5 L 0,10 Z" fill={cRed} />
                            </marker>
                            <marker id="mirrorArrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                              <path d="M 0,0 L 10,5 L 0,10 Z" fill={cGreen} />
                            </marker>
                          </defs>
                          {/* Normal line */}
                          <line x1="200" y1="20" x2="200" y2="150" stroke={cSlateDim} strokeWidth="1.5" strokeDasharray="5,4" />
                          <text x="200" y="15" fill={cSlateDim} fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NORMAL (N)</text>

                          {/* Silvered Reflective Mirror horizontal line */}
                          <line x1="50" y1="150" x2="350" y2="150" stroke={cMirrorGlass} strokeWidth="5.0" />
                          {/* Red protective lead-paint backing */}
                          <line x1="50" y1="153" x2="350" y2="153" stroke="#b91c1c" strokeWidth="2.0" />

                          {/* Tick hatchings denoting silvered backing on non-reflecting side */}
                          {Array.from({ length: 30 }, (_, i) => (
                            <line key={i} x1={50 + i * 10} y1="154" x2={50 + i * 10 - 5} y2="162" stroke={cTick} strokeWidth="1.5" />
                          ))}

                          {/* Incident Ray -- arrow placed at the midpoint, ray continues to the mirror */}
                          <line x1="80" y1="50" x2="140" y2="100" stroke={cRed} strokeWidth="2.5" markerEnd="url(#mirrorArrowRed)" />
                          <line x1="140" y1="100" x2="200" y2="150" stroke={cRed} strokeWidth="2.5" />
                          <text x="75" y="45" fill={cRed} fontSize="11" fontWeight="bold">Incident Ray</text>

                          {/* Reflected Ray -- arrow placed at the midpoint, ray continues away from the mirror */}
                          <line x1="200" y1="150" x2="260" y2="100" stroke={cGreen} strokeWidth="2.5" markerEnd="url(#mirrorArrowGreen)" />
                          <line x1="260" y1="100" x2="320" y2="50" stroke={cGreen} strokeWidth="2.5" />
                          <text x="325" y="45" fill={cGreen} fontSize="11" fontWeight="bold">Reflected Ray</text>

                          {/* Angle of incidence (i) arc */}
                          <path d="M 175,129 A 30,30 0 0,1 190,121" fill="none" stroke={cRed} strokeWidth="1.5" />
                          <text x="175" y="115" fill={cRed} fontSize="11" fontFamily="monospace" fontWeight="bold">i</text>

                          {/* Angle of reflection (r) arc */}
                          <path d="M 225,129 A 30,30 0 0,0 210,121" fill="none" stroke={cGreen} strokeWidth="1.5" />
                          <text x="220" y="115" fill={cGreen} fontSize="11" fontFamily="monospace" fontWeight="bold">r</text>

                          {/* Ground level labels */}
                          <text x="200" y="175" fill={cLabel} fontSize="10" fontWeight="black" textAnchor="middle">PLANE MIRROR</text>
                          <text x="200" y="190" fill={cBackingLabel} fontSize="9" fontWeight="bold" textAnchor="middle">Red-Lead Backing Paint Layer (Non-Reflective Back)</text>
                        </svg>
                      );
                    })()}
                  </div>

                  {/* Column 2: Explanation Text - covering every empty space */}
                  <div className="space-y-3.5 text-xs">
                    <h4 className="text-[12px] font-bold text-cyan-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                      The Mathematical Mirror Framework
                    </h4>
                    <p className="text-slate-200 leading-relaxed font-semibold">
                      Reflection from any smooth surface obeys two fundamental laws:
                    </p>
                    <div className="space-y-2 text-[11px] text-slate-400 font-semibold leading-relaxed">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-amber-400 font-mono font-bold block uppercase mb-1">First Law of Reflection:</span>
                        The incident ray, the reflected ray, and the normal at the point of incidence, all lie in the exact same physical plane (co-planar).
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-cyan-400 font-mono font-bold block uppercase mb-1">Second Law of Reflection:</span>
                        The angle of incidence (<code className="text-white">i</code>) is always precisely equal to the angle of reflection (<code className="text-white">r</code>), i.e., <code className="text-white">∠i = ∠r</code>.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plane Mirror characteristics */}
              <div className="space-y-4" id="plane-mirror-characteristics-cards">
                <h3 className="text-sm font-black text-slate-200 tracking-wider uppercase font-mono">
                  5 Properties of Image Formed by a Plane Mirror:
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#0e1628]/60 border border-slate-800 p-4.5 rounded-2xl flex gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-extrabold shrink-0">1</div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-100">Virtual & Erect</h4>
                      <p className="text-[11px] text-slate-400">The image cannot be focused on a physical screen and lies behind the mirror, staying perfectly upright.</p>
                    </div>
                  </div>

                  <div className="bg-[#0e1628]/60 border border-slate-800 p-4.5 rounded-2xl flex gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-extrabold shrink-0">2</div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-100">Same Size (m = +1)</h4>
                      <p className="text-[11px] text-slate-400">The linear magnification ratio size is strictly equal to <code className="text-teal-400 font-mono">+1</code>. It is a unitless ratio of equal heights.</p>
                    </div>
                  </div>

                  <div className="bg-[#0e1628]/60 border border-slate-800 p-4.5 rounded-2xl flex gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-extrabold shrink-0">3</div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-100">Equal Distance (v = -u)</h4>
                      <p className="text-[11px] text-slate-400">The image distance behind the mirror matches the objective distance in front. Both measured in <b>centimeters (cm)</b> or <b>meters (m)</b>.</p>
                    </div>
                  </div>

                  <div className="bg-[#0e1628]/60 border border-slate-800 p-4.5 rounded-2xl flex gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-extrabold shrink-0">4</div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-100">Laterally Inverted</h4>
                      <p className="text-[11px] text-slate-400">The left-hand side of the physical object appears as the right-hand side of the virtual image, and vice-versa.</p>
                    </div>
                  </div>

                  <div className="bg-[#0e1628]/60 border border-slate-800 p-4.5 rounded-2xl flex gap-3 col-span-1 sm:col-span-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-extrabold shrink-0">5</div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-100">Infinite Focal Length (f = ∞)</h4>
                      <p className="text-[11px] text-slate-400">The focal length of a flat plane mirror is theoretically <b>Infinity (∞)</b>. This corresponds to an optical power of exactly <b>0 diopters</b> representing zero focal bending.</p>
                    </div>
                  </div>
                </div>

                {/* Practical interaction button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => onLoadSimulator({
                      group: 'mirror',
                      type: 'plane-mirror',
                      objectDist: 200,
                      focalLength: 100,
                      objectHeight: 80,
                      objectType: 'arrow'
                    })}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow duration-150 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Load Plane Mirror in Simulator
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ────── TOPIC 2: SPHERICAL MIRRORS TERMINOLOGY ────── */}
          {activeTopic === 'spherical-mirrors' && (
            <div className="space-y-6 animate-fade-in" id="topic-spherical">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Terminology of Spherical Mirrors
                </h1>
                <p className="text-slate-400 text-xs font-semibold">
                  Spherically curved reflecting surfaces and their geometric definitions.
                </p>
              </div>

              {/* MANDATORY EXPLICIT DEFINITION FIRST */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                </div>
                <div className="space-y-2 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>
                    <b className="text-white">1. Spherical Mirror:</b> A mirror that is curved like the surface of a ball (a sphere) instead of being completely flat. Imagine cutting a hollow glass ball and coating it with silver!
                  </p>
                  <p>
                    <b className="text-white">2. Concave Mirror:</b> A mirror that curves inward in the middle, like entering a dark cave. It bends incoming light rays inward towards each other. This is why we also call it a <b>converging mirror</b>.
                  </p>
                  <p>
                    <b className="text-white">3. Convex Mirror:</b> A mirror that bulges outward in the middle, like the back of a shiny spoon. It bends incoming light rays outward, spreading them apart. This is why we also call it a <b>diverging mirror</b>.
                  </p>
                </div>
              </div>

              {/* QUANTITY UNITS BOX */}
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & Units</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] flex-wrap">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Focal Length (f)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters (m) / centimeters (cm)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Radius of Curvature (R)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters (m) / centimeters (cm)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Aperture Size</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters (m) / millimeters (mm)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Curvature Relationship</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">R = 2f (Dimensioned in cm)</span>
                  </div>
                </div>
              </div>

              {/* Glossary definitions -- compact wrapping row, full width, sits ABOVE the diagrams
                  (stacking rather than a tall-left/short-right grid avoids leaving blank space below the diagrams) */}
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5" id="interactive-glossary-hover">
                  {[
                    { id: 'pole', title: 'Pole (P)', desc: 'The absolute center point on the front surface of the curved mirror.' },
                    { id: 'center', title: 'Centre of Curvature (C)', desc: 'The center point of the giant hollow sphere that the mirror was originally cut from. It acts like the center of the ball!' },
                    { id: 'focus', title: 'Principal Focus (F)', desc: 'The magic meeting point where all incoming parallel light rays cross paths (or appear to spread out from) after hitting the mirror.' },
                    { id: 'axis', title: 'Principal Axis', desc: 'The imaginary flat line that goes straight through the center of the mirror, passing through both C and P, splitting the mirror perfectly in half.' },
                    { id: 'focal-length', title: 'Focal Length (f)', desc: 'The physical distance between the center of the mirror (P) and its focus point (F). It is always exactly half of the radius (f = R/2)!' },
                  ].map(term => (
                    <div
                      key={term.id}
                      onMouseEnter={() => setGlossaryHighlight(term.id)}
                      onMouseLeave={() => setGlossaryHighlight(null)}
                      className={`p-3 rounded-xl border transition-all duration-200 cursor-help ${
                        glossaryHighlight === term.id
                          ? (isLightMode ? 'bg-cyan-50 border-cyan-400 shadow-md -translate-y-1 text-slate-900' : 'bg-[#1e2d4a]/85 border-cyan-500/50 shadow-md shadow-cyan-500/5 -translate-y-1 text-white')
                          : (isLightMode ? 'bg-white border-slate-200 text-slate-700 hover:text-slate-900' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-slate-100')
                      }`}
                    >
                      <h4 className="text-sm font-black tracking-tight">{term.title}</h4>
                      <p className={`text-[12px] mt-0.5 leading-relaxed font-semibold font-sans ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{term.desc}</p>
                    </div>
                  ))}
                </div>

                {/* SVG Mirror Terminology Diagrams -- Concave and Convex side by side, full width */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* CONCAVE -- true sphere cap: C=(62,100) R=96, so P=(158,100), rim=128, F=midpoint(C,P)=(110,100) */}
                  <div className={`rounded-2xl p-4 border flex flex-col items-center gap-2 transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                    <span className={`text-[11.5px] font-black uppercase tracking-widest font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Concave (Converging) Mirror</span>
                    {(() => {
                      const cAccent = isLightMode ? '#0e7490' : '#22d3ee';
                      const cSphere = isLightMode ? '#94a3b8' : '#334155';
                      const cAxis = isLightMode ? '#64748b' : '#475569';
                      const cMirror = isLightMode ? '#0369a1' : '#38bdf8';
                      const cPaint = isLightMode ? '#b91c1c' : '#dc2626';
                      const cTick = isLightMode ? '#94a3b8' : '#64748b';
                      const cPointStroke = isLightMode ? '#0f172a' : '#ffffff';
                      const cPole = isLightMode ? '#be123c' : '#f43f5e';
                      const cCentre = isLightMode ? '#15803d' : '#4ade80';
                      const cFocus = isLightMode ? '#a16207' : '#eab308';
                      const cLabel = isLightMode ? '#334155' : '#cbd5e1';
                      const R = 96, C = 62, P = 158, F = 110, rim = 128;
                      const backTicks = Array.from({ length: 15 }, (_, i) => {
                        const y = 33 + i * 9.6;
                        const dy = y - 100;
                        const xCurve = C + Math.sqrt(Math.max(0, R * R - dy * dy));
                        return { x1: xCurve, y1: y, x2: xCurve + 6, y2: y + (dy < 0 ? -3 : 3) };
                      });
                      return (
                        <svg width="100%" height="320" viewBox="-70 0 270 225" className={`rounded-xl border overflow-hidden transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b101d] border-slate-800/80'}`}>
                          {/* Imaginary sphere outline -- the mirror is a small cap cut from this true sphere, centred at C */}
                          <circle cx={C} cy="100" r={R} stroke={cSphere} strokeWidth="1.5" strokeDasharray="4,4" fill="none" />

                          {/* Principal axis running across */}
                          <line x1="10" y1="100" x2="190" y2="100"
                            stroke={glossaryHighlight === 'axis' ? cAccent : cAxis}
                            strokeWidth={glossaryHighlight === 'axis' ? '3.0' : '1.5'}
                            className="transition-all duration-150"
                          />

                          {/* Reflective front surface -- true cap of the sphere centred at C, deepest point (Pole) farthest from the object */}
                          <path d={`M ${rim},30 A ${R},${R} 0 0,1 ${rim},170`} fill="none" stroke={cMirror} strokeWidth="4.0" strokeLinecap="round" />
                          {/* Painted, non-reflective back -- ticks follow the same true curve, offset outward to the right */}
                          {backTicks.map((t, i) => (
                            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={cTick} strokeWidth="1.2" />
                          ))}
                          <text x={P + 10} y="25" fill={cMirror} fontSize="9.5" fontWeight="bold" textAnchor="middle">Reflective</text>

                          {/* Pole P */}
                          <circle cx={P} cy="100" r="5" fill={glossaryHighlight === 'pole' ? cAccent : cPole} stroke={cPointStroke} strokeWidth="1.2" />
                          <text x={P + 5} y="93" fill={glossaryHighlight === 'pole' ? cAccent : cLabel} fontSize="10.5" fontFamily="monospace" fontWeight="bold">P</text>

                          {/* Centre C */}
                          <circle cx={C} cy="100" r="5" fill={glossaryHighlight === 'center' ? cAccent : cCentre} stroke={cPointStroke} strokeWidth="1.2" />
                          <text x={C - 10} y="90" fill={glossaryHighlight === 'center' ? cAccent : cLabel} fontSize="10.5" fontFamily="monospace" fontWeight="bold">C</text>

                          {/* Focus F */}
                          <circle cx={F} cy="100" r="5" fill={glossaryHighlight === 'focus' ? cAccent : cFocus} stroke={cPointStroke} strokeWidth="1.2" />
                          <text x={F - 5} y="115" fill={glossaryHighlight === 'focus' ? cAccent : cLabel} fontSize="10.5" fontFamily="monospace" fontWeight="bold">F</text>

                          {glossaryHighlight === 'focal-length' && (
                            <g>
                              <path d={`M ${F},130 L ${P},130`} stroke={cAccent} strokeWidth="1.5" />
                              <line x1={F} y1="105" x2={F} y2="135" stroke={cAccent} strokeWidth="1" strokeDasharray="3,2" />
                              <line x1={P} y1="105" x2={P} y2="135" stroke={cAccent} strokeWidth="1" strokeDasharray="3,2" />
                              <text x={(F + P) / 2} y="145" fill={cAccent} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">f = R/2</text>
                            </g>
                          )}
                        </svg>
                      );
                    })()}
                  </div>

                  {/* CONVEX -- true sphere cap: C=(167,100) R=96 (matching concave for a symmetric pair), so P=(71,100), rim=101, F=midpoint(P,C)=(119,100) */}
                  <div className={`rounded-2xl p-4 border flex flex-col items-center gap-2 transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                    <span className={`text-[11.5px] font-black uppercase tracking-widest font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Convex (Diverging) Mirror</span>
                    {(() => {
                      const cAccent = isLightMode ? '#0e7490' : '#22d3ee';
                      const cSphere = isLightMode ? '#94a3b8' : '#334155';
                      const cAxis = isLightMode ? '#64748b' : '#475569';
                      const cMirror = isLightMode ? '#0369a1' : '#38bdf8';
                      const cPaint = isLightMode ? '#b91c1c' : '#dc2626';
                      const cTick = isLightMode ? '#94a3b8' : '#64748b';
                      const cPointStroke = isLightMode ? '#0f172a' : '#ffffff';
                      const cPole = isLightMode ? '#be123c' : '#f43f5e';
                      const cCentre = isLightMode ? '#15803d' : '#4ade80';
                      const cFocus = isLightMode ? '#a16207' : '#eab308';
                      const cLabel = isLightMode ? '#334155' : '#cbd5e1';
                      const R = 96, P = 71, rim = 101, F = 119, C = 167;
                      const backTicks = Array.from({ length: 15 }, (_, i) => {
                        const y = 33 + i * 9.6;
                        const dy = y - 100;
                        const xCurve = C - Math.sqrt(Math.max(0, R * R - dy * dy));
                        return { x1: xCurve, y1: y, x2: xCurve + 6, y2: y + (dy < 0 ? -3 : 3) };
                      });
                      return (
                        <svg width="100%" height="320" viewBox="0 0 270 225" className={`rounded-xl border overflow-hidden transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b101d] border-slate-800/80'}`}>
                          {/* Imaginary sphere outline -- the mirror is a small cap cut from this true sphere, centred at C (behind the mirror) */}
                          <circle cx={C} cy="100" r={R} stroke={cSphere} strokeWidth="1.5" strokeDasharray="4,4" fill="none" />

                          {/* Principal axis running across */}
                          <line x1="10" y1="100" x2="190" y2="100"
                            stroke={glossaryHighlight === 'axis' ? cAccent : cAxis}
                            strokeWidth={glossaryHighlight === 'axis' ? '3.0' : '1.5'}
                            className="transition-all duration-150"
                          />

                          {/* Reflective front surface -- true cap of the sphere centred at C, bulges toward the object; Pole is closest point to the object */}
                          <path d={`M ${rim},30 A ${R},${R} 0 0,0 ${rim},170`} fill="none" stroke={cMirror} strokeWidth="4.0" strokeLinecap="round" />
                          {/* Painted, non-reflective back -- ticks follow the same true curve, offset outward to the right (away from the object) */}
                          {backTicks.map((t, i) => (
                            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={cTick} strokeWidth="1.2" />
                          ))}
                          <text x={P - 8} y="25" fill={cMirror} fontSize="9.5" fontWeight="bold" textAnchor="middle">Reflective</text>

                          {/* Pole P (on the mirror vertex, closest point to the object) */}
                          <circle cx={P} cy="100" r="5" fill={glossaryHighlight === 'pole' ? cAccent : cPole} stroke={cPointStroke} strokeWidth="1.2" />
                          <text x={P - 5} y="93" fill={glossaryHighlight === 'pole' ? cAccent : cLabel} fontSize="10.5" fontFamily="monospace" fontWeight="bold" textAnchor="end">P</text>

                          {/* Focus F (virtual, behind mirror) */}
                          <circle cx={F} cy="100" r="5" fill={glossaryHighlight === 'focus' ? cAccent : cFocus} stroke={cPointStroke} strokeWidth="1.2" strokeDasharray="1.5,1.5" />
                          <text x={F} y="90" fill={glossaryHighlight === 'focus' ? cAccent : cLabel} fontSize="10.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">F</text>

                          {/* Centre C (virtual, behind mirror) */}
                          <circle cx={C} cy="100" r="5" fill={glossaryHighlight === 'center' ? cAccent : cCentre} stroke={cPointStroke} strokeWidth="1.2" strokeDasharray="1.5,1.5" />
                          <text x={C} y="90" fill={glossaryHighlight === 'center' ? cAccent : cLabel} fontSize="10.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">C</text>

                          <text x={(F + C) / 2} y="213" fill={cLabel} fontSize="8.5" fontStyle="italic" textAnchor="middle">F and C are virtual (behind the mirror)</text>

                          {glossaryHighlight === 'focal-length' && (
                            <g>
                              <path d={`M ${P},130 L ${F},130`} stroke={cAccent} strokeWidth="1.5" />
                              <line x1={P} y1="105" x2={P} y2="135" stroke={cAccent} strokeWidth="1" strokeDasharray="3,2" />
                              <line x1={F} y1="105" x2={F} y2="135" stroke={cAccent} strokeWidth="1" strokeDasharray="3,2" />
                              <text x={(P + F) / 2} y="145" fill={cAccent} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">f = R/2</text>
                            </g>
                          )}
                        </svg>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Additional Textbook Notes for Topic 2 */}
              <div className="space-y-4 pt-2 font-sans font-semibold text-sm leading-relaxed text-slate-300">
                {/* Note Callout */}
                <div className="bg-[#121c2e]/40 border border-cyan-500/15 p-4 rounded-2xl flex gap-3">
                  <Award className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[12px] text-cyan-400 font-bold uppercase font-mono block tracking-widest">💡 Note: Don't get C and P confused!</span>
                    <p className="text-slate-350 mt-1 font-sans font-semibold">
                      Think of it like this: the <b>Pole (P)</b> is a real physical point on the mirror itself (it is the exact center of the glass surface). But the <b>Center of Curvature (C)</b> is a coordinate floating in empty space. It is where the center of the giant ball would be if you completed the full circle of the mirror!
                    </p>
                  </div>
                </div>

                {/* Convergence and Divergence Visualization Callout */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <h4 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono text-cyan-400 font-sans">Understanding Bending (Inward vs Outward)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px] leading-relaxed text-slate-400 font-sans font-semibold">
                    <div>
                      <span className="font-extrabold text-slate-200 block mb-1">How a Concave Mirror bends light:</span>
                      Parallel light rays from the left hit the inward-curved polished surface. These rays bounce inward and all meet together at a real focus point (<b className="text-white">F</b>) in front of the mirror. This is a real focus because the light rays actually cross!
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-200 block mb-1">How a Convex Mirror bends light:</span>
                      Parallel light rays from the left hit the outward-bulging surface. These rays bounce outward, spreading apart. But if our eyes trace these expanding rays backward behind the mirror, they look like they gather at an imaginary focus point (<b className="text-white">F</b>) inside the mirror.
                    </div>
                  </div>
                </div>

                {/* Focal Length and Spherical Aberration */}
                <div className="bg-amber-950/20 border border-amber-500/10 p-4 rounded-xl space-y-1.5 font-sans font-semibold">
                  <h5 className="font-bold text-amber-400 font-mono text-[12px] uppercase tracking-wider flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> The f = R/2 rule & why it might fail in real-life
                  </h5>
                  <p className="text-slate-350 text-[13px] font-sans flex items-center gap-1.5 flex-wrap">
                    <span>In school, we use the simple equation</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 rounded border border-slate-800 text-yellow-300 font-bold font-mono">
                      <span>f</span>
                      <span>=</span>
                      <Fraction num="R" den="2" />
                    </span>
                    <span>(focal length is half of the radius). This rule is only true for <b>central rays (paraxial rays)</b> that hit very close to the center of the mirror.</span>
                  </p>
                  <p className="text-slate-400 text-[12px] font-sans">
                    <b>Why it is a trick:</b> If light rays hit near the outer edges of a very wide mirror, they bounce at different angles and do NOT meet at the same focus point. This fuzzy-focus error is called <b>spherical aberration</b>. Real-life cameras use custom non-spherical shapes to fix this!
                  </p>
                </div>
              </div>

              {/* COMPREHENSIVE TEXTBOOK USES OF CONCAVE AND CONVEX MIRRORS */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-lg my-6" id="mirror-uses-section">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-105 uppercase tracking-tight text-cyan-400">
                    Syllabus Practical Applications: Uses of Mirrors (with Scientific Reasons)
                  </h4>
                  <p className="text-slate-400 text-xs font-semibold">
                    An in-depth handbook for CBSE board preparations detailing exactly HOW and WHY distinct reflection options are selected in society today.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Concave Mirror Section */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold shrink-0">1</div>
                      <h5 className="font-black text-white text-xs uppercase tracking-wider">Uses of Concave (Converging) Mirrors</h5>
                    </div>
                    <ul className="space-y-3.5 text-xs text-slate-300 font-sans leading-relaxed font-semibold">
                      <li className="bg-[#121c2e]/40 p-3 rounded-xl border border-cyan-500/10">
                        <b className="text-cyan-400 block mb-1 font-sans">A. Shaving and Makeup Mirrors</b>
                        <span>Provides an erect, magnified view of the face.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal">
                          <span className="text-yellow-400 font-bold">WHY:</span> When the face is positioned between the Pole (P) and Focus (F), a concave mirror generates a highly magnified, virtual, and erect image.
                        </p>
                      </li>
                      <li className="bg-[#121c2e]/40 p-3 rounded-xl border border-cyan-500/10">
                        <b className="text-cyan-400 block mb-1 font-sans">B. Dentists' Examination Mirrors</b>
                        <span>Helps dentists inspect cavities and internal details.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal">
                          <span className="text-yellow-400 font-bold">WHY:</span> By placing the concave mirror very close inside the mouth, the tooth falls under the focus distance, creating a highly magnified, upright virtual image.
                        </p>
                      </li>
                      <li className="bg-[#121c2e]/40 p-3 rounded-xl border border-cyan-500/10">
                        <b className="text-cyan-400 block mb-1 font-sans">C. Torches, Car Headlights & Searchlights</b>
                        <span>Generates a powerful, non-divergent parallel ray column of light.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> The light bulb is placed exactly at the Principal Focus (F). Light rays starting from the focus strike the concave reflector and emerge parallel to the principal axis, traveling massive distances.
                        </p>
                      </li>
                      <li className="bg-[#121c2e]/40 p-3 rounded-xl border border-cyan-500/10">
                        <b className="text-cyan-400 block mb-1 font-sans">D. Large Solar Furnaces</b>
                        <span>Concentrates heavy solar heat at a single target point.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> Parallel rays of incoming sunlight from infinity hit the massive concave dish and converge precisely at the Principal Focus (F), magnifying thermal density to produce extreme heat.
                        </p>
                      </li>
                    </ul>
                  </div>

                  {/* Convex Mirror Section */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 font-bold shrink-0 font-sans">2</div>
                      <h5 className="font-black text-white text-xs uppercase tracking-wider">Uses of Convex (Diverging) Mirrors</h5>
                    </div>
                    <ul className="space-y-3.5 text-xs text-slate-300 font-sans leading-relaxed font-semibold">
                      <li className="bg-[#1d121c]/40 p-3 rounded-xl border border-pink-500/10">
                        <b className="text-pink-400 block mb-1 font-sans">A. Rearview and Wing Mirrors in Vehicles</b>
                        <span>Enables drivers to see trailing traffic clearly.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> Convex mirrors always produce virtual, erect, and upright images, so the driver sees cars upright rather than inverted. Because they are curved outward, they have a vastly wider field of view compared to plane mirrors, fitting massive fractions of the highway on small glass surfaces.
                        </p>
                      </li>
                      <li className="bg-[#1d121c]/40 p-3 rounded-xl border border-pink-500/10">
                        <b className="text-pink-400 block mb-1 font-sans">B. Shop Security & Surveillance Mirrors</b>
                        <span>Allows store owners to monitor aisles and counters.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> They offer a wide-angle perspective and cover highly expanded visual fields, allowing a single observer standing at a counter to monitor large parts of the store.
                        </p>
                      </li>
                      <li className="bg-[#1d121c]/40 p-3 rounded-xl border border-pink-500/10">
                        <b className="text-pink-400 block mb-1 font-sans">C. Sharp Convex Mirrors on Blind Road Corners</b>
                        <span>Provides visibility of oncoming vehicles on mountain cliffs and intersections.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> They diverge incoming rays from diverse side paths into the driver's sight, allowing them to gaze 'around' tight corners safely.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ────── TOPIC 3: RAY RULES (MIRRORS) ────── */}
          {activeTopic === 'ray-rules' && (
            <div className="space-y-6 animate-fade-in" id="topic-ray-rules">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Ray Construction Tracing Rules
                </h1>
                <p className="text-slate-400 text-xs font-semibold">
                  The standard geometric pathways used to calculate and construct mirror images.
                </p>
              </div>

              {/* DEFINITIONS OF BASIC RAY TRACING TERMS */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                </div>
                <div className="space-y-2 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>
                    <b className="text-white">1. Paraxial Rays:</b> Light rays that hit near the middle of the mirror and travel almost parallel to the main center line. All our basic school formulas assume the light rays are paraxial!
                  </p>
                  <p>
                    <b className="text-white">2. Real Image:</b> An image formed when light rays actually cross each other. Since they really meet, you can catch this image on a piece of paper or screen (like a movie projector does). Real images are always upside down!
                  </p>
                  <p>
                    <b className="text-white">3. Virtual Image:</b> An image formed when light rays spread apart, so they don't really cross. Instead, our eyes trace them backwards to make it look like they meet. You can't put a screen there to catch it—it is just like your reflection inside a bathroom mirror! Virtual images are always right-side up.
                  </p>
                </div>
              </div>

              {/* QUANTITY UNITS BOX */}
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & Units</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Object Height (h)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters (m) or centimeters (cm)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Image Height (h')</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters (m) or centimeters (cm)</span>
                  </div>
                </div>
              </div>

              {/* 4 Rules cards, each with a labeled ray diagram for BOTH concave and convex mirrors */}
              <div className="space-y-5">
                {/* RAY 1: Parallel to Axis -> through F (concave) / appears to diverge from F (convex) */}
                <div className="p-4 bg-slate-900 border border-slate-800 border-l-4 border-l-[#f87171] rounded-r-2xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-100">Ray 1: The Parallel-to-Axis Ray</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-semibold font-sans">A light ray starting parallel to the principal axis. Upon reflecting, it travels directly through the principal focus F (for concave) or appears to diverge from focus F behind the mirror (for convex).</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {(() => {
                      const cIncident = isLightMode ? '#b91c1c' : '#f87171';
                      const cReflected = isLightMode ? '#15803d' : '#4ade80';
                      return (
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-sm font-black uppercase tracking-widest font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-100'}`}>Concave Mirror</span>
                          <ConcaveMirrorBase isLightMode={isLightMode}>
                            <defs>
                              <marker id="r1cArrowIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cIncident} /></marker>
                              <marker id="r1cArrowOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cReflected} /></marker>
                            </defs>
                            <line x1="20" y1="55" x2="126.5" y2="55" stroke={cIncident} strokeWidth="2.2" markerEnd="url(#r1cArrowIn)" />
                            <line x1="126.5" y1="55" x2="233" y2="55" stroke={cIncident} strokeWidth="2.2" />
                            <text x="20" y="45" fill={cIncident} fontSize="9.5" fontWeight="bold">Incident (∥ to axis)</text>
                            <line x1="233" y1="55" x2="178.5" y2="91" stroke={cReflected} strokeWidth="2.2" markerEnd="url(#r1cArrowOut)" />
                            <line x1="178.5" y1="91" x2="124" y2="127" stroke={cReflected} strokeWidth="2.2" />
                            <text x="40" y="150" fill={cReflected} fontSize="9.5" fontWeight="bold">Reflected (through F)</text>
                          </ConcaveMirrorBase>
                        </div>
                      );
                    })()}
                    {(() => {
                      const cIncident = isLightMode ? '#b91c1c' : '#f87171';
                      const cReflected = isLightMode ? '#15803d' : '#4ade80';
                      return (
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-sm font-black uppercase tracking-widest font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-100'}`}>Convex Mirror</span>
                          <ConvexMirrorBase isLightMode={isLightMode}>
                            <defs>
                              <marker id="r1vArrowIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cIncident} /></marker>
                              <marker id="r1vArrowOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cReflected} /></marker>
                            </defs>
                            <line x1="20" y1="55" x2="113.5" y2="55" stroke={cIncident} strokeWidth="2.2" markerEnd="url(#r1vArrowIn)" />
                            <line x1="113.5" y1="55" x2="207" y2="55" stroke={cIncident} strokeWidth="2.2" />
                            <text x="20" y="45" fill={cIncident} fontSize="9.5" fontWeight="bold">Incident (∥ to axis)</text>
                            <line x1="207" y1="55" x2="191" y2="39.5" stroke={cReflected} strokeWidth="2.2" markerEnd="url(#r1vArrowOut)" />
                            <line x1="191" y1="39.5" x2="175" y2="24" stroke={cReflected} strokeWidth="2.2" />
                            <line x1="207" y1="55" x2="252.5" y2="100" stroke={cReflected} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
                            <text x="215" y="18" fill={cReflected} fontSize="9.5" fontWeight="bold">Reflected (appears from F)</text>
                          </ConvexMirrorBase>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* RAY 2: Through/towards F -> parallel to axis */}
                <div className="p-4 bg-slate-900 border border-slate-800 border-l-4 border-l-[#facc15] rounded-r-2xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-100">Ray 2: The Focus-Intersecting Ray</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-semibold font-sans">A ray directed straight through the focus F (concave) or heading towards F behind the mirror (convex). It reflects and emerges completely parallel to the principal axis.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {(() => {
                      const cIncident = isLightMode ? '#a16207' : '#facc15';
                      const cReflected = isLightMode ? '#15803d' : '#4ade80';
                      return (
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-sm font-black uppercase tracking-widest font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-100'}`}>Concave Mirror</span>
                          <ConcaveMirrorBase isLightMode={isLightMode}>
                            <defs>
                              <marker id="r2cArrowIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cIncident} /></marker>
                              <marker id="r2cArrowOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cReflected} /></marker>
                            </defs>
                            <line x1="20" y1="150" x2="129" y2="112.5" stroke={cIncident} strokeWidth="2.2" markerEnd="url(#r2cArrowIn)" />
                            <line x1="129" y1="112.5" x2="238" y2="75" stroke={cIncident} strokeWidth="2.2" />
                            <text x="20" y="162" fill={cIncident} fontSize="9.5" fontWeight="bold">Incident (through F)</text>
                            <line x1="238" y1="75" x2="134" y2="75" stroke={cReflected} strokeWidth="2.2" markerEnd="url(#r2cArrowOut)" />
                            <line x1="134" y1="75" x2="30" y2="75" stroke={cReflected} strokeWidth="2.2" />
                            <text x="130" y="65" fill={cReflected} fontSize="9.5" fontWeight="bold" textAnchor="middle">Reflected (∥ to axis)</text>
                          </ConcaveMirrorBase>
                        </div>
                      );
                    })()}
                    {(() => {
                      const cIncident = isLightMode ? '#a16207' : '#facc15';
                      const cReflected = isLightMode ? '#15803d' : '#4ade80';
                      return (
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-sm font-black uppercase tracking-widest font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-100'}`}>Convex Mirror</span>
                          <ConvexMirrorBase isLightMode={isLightMode}>
                            <defs>
                              <marker id="r2vArrowIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cIncident} /></marker>
                              <marker id="r2vArrowOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cReflected} /></marker>
                            </defs>
                            <line x1="20" y1="61" x2="109.5" y2="76" stroke={cIncident} strokeWidth="2.2" markerEnd="url(#r2vArrowIn)" />
                            <line x1="109.5" y1="76" x2="199" y2="91" stroke={cIncident} strokeWidth="2.2" />
                            <line x1="199" y1="91" x2="252.5" y2="100" stroke={cIncident} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
                            <text x="20" y="51" fill={cIncident} fontSize="9.5" fontWeight="bold">Incident (towards F)</text>
                            <line x1="199" y1="91" x2="114.5" y2="91" stroke={cReflected} strokeWidth="2.2" markerEnd="url(#r2vArrowOut)" />
                            <line x1="114.5" y1="91" x2="30" y2="91" stroke={cReflected} strokeWidth="2.2" />
                            <text x="115" y="105" fill={cReflected} fontSize="9.5" fontWeight="bold" textAnchor="middle">Reflected (∥ to axis)</text>
                          </ConvexMirrorBase>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* RAY 3: Through/towards C -> reflects straight back */}
                <div className="p-4 bg-slate-900 border border-slate-800 border-l-4 border-l-[#4ade80] rounded-r-2xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-100">Ray 3: The Centre-of-Curvature Ray</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-semibold font-sans">A ray passing through Centre C (concave) or heading towards C behind the mirror (convex). Since normal lines map to sphere radii, it strikes perpendicularly (incidence = 0°) and bounce-reflects back along its original path.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {(() => {
                      const cIncident = isLightMode ? '#15803d' : '#4ade80';
                      const cReflected = isLightMode ? '#6d28d9' : '#a78bfa';
                      return (
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-sm font-black uppercase tracking-widest font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-100'}`}>Concave Mirror</span>
                          <ConcaveMirrorBase isLightMode={isLightMode}>
                            <defs>
                              <marker id="r3cArrowIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cIncident} /></marker>
                              <marker id="r3cArrowOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cReflected} /></marker>
                            </defs>
                            <line x1="20" y1="114" x2="128.5" y2="92" stroke={cIncident} strokeWidth="2.2" markerEnd="url(#r3cArrowIn)" />
                            <line x1="128.5" y1="92" x2="237" y2="70" stroke={cIncident} strokeWidth="2.2" />
                            <text x="20" y="126" fill={cIncident} fontSize="9.5" fontWeight="bold">Incident (through C)</text>
                            <line x1="237" y1="73" x2="128.5" y2="95" stroke={cReflected} strokeWidth="2.2" strokeDasharray="5 3" markerEnd="url(#r3cArrowOut)" />
                            <line x1="128.5" y1="95" x2="20" y2="117" stroke={cReflected} strokeWidth="2.2" strokeDasharray="5 3" />
                            <text x="150" y="150" fill={cReflected} fontSize="9" fontWeight="bold" textAnchor="middle">Reflects back along same path</text>
                          </ConcaveMirrorBase>
                        </div>
                      );
                    })()}
                    {(() => {
                      const cIncident = isLightMode ? '#15803d' : '#4ade80';
                      const cReflected = isLightMode ? '#6d28d9' : '#a78bfa';
                      return (
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-sm font-black uppercase tracking-widest font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-100'}`}>Convex Mirror</span>
                          <ConvexMirrorBase isLightMode={isLightMode}>
                            <defs>
                              <marker id="r3vArrowIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cIncident} /></marker>
                              <marker id="r3vArrowOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cReflected} /></marker>
                            </defs>
                            <line x1="20" y1="31" x2="111" y2="53" stroke={cIncident} strokeWidth="2.2" markerEnd="url(#r3vArrowIn)" />
                            <line x1="111" y1="53" x2="202" y2="75" stroke={cIncident} strokeWidth="2.2" />
                            <line x1="202" y1="75" x2="305" y2="100" stroke={cIncident} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
                            <text x="20" y="22" fill={cIncident} fontSize="9.5" fontWeight="bold">Incident (towards C)</text>
                            <line x1="202" y1="78" x2="111" y2="56" stroke={cReflected} strokeWidth="2.2" strokeDasharray="5 3" markerEnd="url(#r3vArrowOut)" />
                            <line x1="111" y1="56" x2="20" y2="34" stroke={cReflected} strokeWidth="2.2" strokeDasharray="5 3" />
                            <text x="150" y="150" fill={cReflected} fontSize="9" fontWeight="bold" textAnchor="middle">Reflects back along same path</text>
                          </ConvexMirrorBase>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* RAY 4: Oblique to Pole -> symmetric reflection (i = r) */}
                <div className="p-4 bg-slate-900 border border-slate-800 border-l-4 border-l-[#c084fc] rounded-r-2xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-100">Ray 4: The Oblique Pole Ray</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-semibold font-sans">A ray directed obliquely straight to the Pole P. It reflects off symmetrically according to standard planar reflection laws (i = r), on both concave and convex mirrors alike.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {(() => {
                      const cIncident = isLightMode ? '#7e22ce' : '#c084fc';
                      const cReflected = isLightMode ? '#0e7490' : '#22d3ee';
                      return (
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-sm font-black uppercase tracking-widest font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-100'}`}>Concave Mirror</span>
                          <ConcaveMirrorBase isLightMode={isLightMode}>
                            <defs>
                              <marker id="r4cArrowIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cIncident} /></marker>
                              <marker id="r4cArrowOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cReflected} /></marker>
                            </defs>
                            <line x1="20" y1="50" x2="130" y2="75" stroke={cIncident} strokeWidth="2.2" markerEnd="url(#r4cArrowIn)" />
                            <line x1="130" y1="75" x2="240" y2="100" stroke={cIncident} strokeWidth="2.2" />
                            <text x="20" y="40" fill={cIncident} fontSize="9.5" fontWeight="bold">Incident (oblique to P)</text>
                            <line x1="240" y1="100" x2="195" y2="110" stroke={cReflected} strokeWidth="2.2" markerEnd="url(#r4cArrowOut)" />
                            <line x1="195" y1="110" x2="150" y2="120" stroke={cReflected} strokeWidth="2.2" />
                            <text x="172" y="138" fill={cReflected} fontSize="9" fontWeight="bold" textAnchor="middle">Reflected (i = r)</text>
                          </ConcaveMirrorBase>
                        </div>
                      );
                    })()}
                    {(() => {
                      const cIncident = isLightMode ? '#7e22ce' : '#c084fc';
                      const cReflected = isLightMode ? '#0e7490' : '#22d3ee';
                      return (
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-sm font-black uppercase tracking-widest font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-100'}`}>Convex Mirror</span>
                          <ConvexMirrorBase isLightMode={isLightMode}>
                            <defs>
                              <marker id="r4vArrowIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cIncident} /></marker>
                              <marker id="r4vArrowOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cReflected} /></marker>
                            </defs>
                            <line x1="20" y1="55" x2="110" y2="77.5" stroke={cIncident} strokeWidth="2.2" markerEnd="url(#r4vArrowIn)" />
                            <line x1="110" y1="77.5" x2="200" y2="100" stroke={cIncident} strokeWidth="2.2" />
                            <text x="20" y="45" fill={cIncident} fontSize="9.5" fontWeight="bold">Incident (oblique to P)</text>
                            <line x1="200" y1="100" x2="165" y2="108.75" stroke={cReflected} strokeWidth="2.2" markerEnd="url(#r4vArrowOut)" />
                            <line x1="165" y1="108.75" x2="130" y2="117.5" stroke={cReflected} strokeWidth="2.2" />
                            <text x="148" y="133" fill={cReflected} fontSize="9" fontWeight="bold" textAnchor="middle">Reflected (i = r)</text>
                          </ConvexMirrorBase>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ────── TOPIC: IMAGE FORMATION IN SPHERICAL MIRRORS ────── */}
          {activeTopic === 'image-formation-mirrors' && (
            <div className="space-y-6 animate-fade-in" id="topic-image-formation-mirrors">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Image Formation in Spherical Mirrors
                </h1>
                <p className="text-slate-400 text-xs font-semibold">
                  Explore systematically how images are formed based on the object's position relative to the principal focus (F) and center of curvature (C). Keep in mind that these cases match the exact physics of school curriculum.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5" id="mirror-image-formation-section">
                {/* Case selector -- compact wrapping row, full width */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">
                    Select Object Position:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 font-sans">
                    {MIRROR_CASES.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setNotesMirrorCaseInd(idx)}
                        className={`p-2.5 w-full text-left rounded-xl border text-[11px] font-bold transition-all duration-150 cursor-pointer ${
                          notesMirrorCaseInd === idx
                            ? (isLightMode ? 'bg-cyan-50 border-cyan-500/50 text-cyan-700 shadow' : 'bg-[#121c2e] border-cyan-500/50 text-cyan-300 shadow')
                            : (isLightMode ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100' : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60')
                        }`}
                      >
                        <span className="truncate block">{c.label}</span>
                        <span className="shrink-0 text-[10px] font-mono font-normal opacity-70 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 inline-block mt-1">{c.type === 'concave-mirror' ? 'Concave' : 'Convex'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Ray Diagram -- full width */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 font-mono text-center">
                    Ray Diagram: {MIRROR_CASES[notesMirrorCaseInd].label}
                  </span>
                  <div className="w-full flex justify-center">
                    <DynamicRayDiagram
                      type={MIRROR_CASES[notesMirrorCaseInd].type}
                      u={MIRROR_CASES[notesMirrorCaseInd].u}
                      f={MIRROR_CASES[notesMirrorCaseInd].f}
                      onLoadSimulator={onLoadSimulator}
                      isLightMode={isLightMode}
                    />
                  </div>
                </div>

                {/* Explanatory notes */}
                <div className="bg-slate-950/70 p-5 border border-slate-800 rounded-2xl space-y-4 font-sans text-xs" id="mirror-image-formation-notes">
                  <div className="border-b border-slate-850 pb-2.5">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block font-mono">Case Description:</span>
                    <p className="font-semibold text-slate-100 text-sm mt-0.5">{MIRROR_CASES[notesMirrorCaseInd].desc}</p>
                  </div>

                  <div className="border-b border-slate-850 pb-2.5">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Why This Happens:</span>
                    <p className="font-semibold text-slate-300 text-[12.5px] leading-relaxed mt-0.5">{MIRROR_CASES[notesMirrorCaseInd].theory}</p>
                  </div>

                  {(() => {
                    const det = computeCaseDetails(
                      MIRROR_CASES[notesMirrorCaseInd].type,
                      MIRROR_CASES[notesMirrorCaseInd].u,
                      MIRROR_CASES[notesMirrorCaseInd].f
                    );
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="mirror-mag-sign-analysis-panel">
                        <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                          <span className="text-slate-500 block uppercase font-mono font-bold tracking-wider text-[10px]">Object position (u):</span>
                          <span className="text-white font-bold text-xs mt-0.5 block">
                            {MIRROR_CASES[notesMirrorCaseInd].label} (u = {MIRROR_CASES[notesMirrorCaseInd].u === 9999 ? '-∞' : `-${MIRROR_CASES[notesMirrorCaseInd].u} cm`})
                          </span>
                        </div>

                        <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                          <span className="text-slate-500 block uppercase font-mono font-bold tracking-wider text-[10px]">Image position (v):</span>
                          <span className="text-cyan-300 font-bold text-xs mt-0.5 block">{det.vStr}</span>
                        </div>

                        <div className="bg-[#121c2e] p-3.5 rounded-xl border border-cyan-500/10 sm:col-span-2 space-y-2">
                          <div className="flex justify-between items-center border-b border-cyan-500/10 pb-1.5">
                            <span className="text-cyan-400 uppercase font-mono font-bold tracking-wider text-[9px]">Linear Magnification (m):</span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${det.mSign === '-' ? 'bg-[#ef4444]/15 text-[#f87171] border border-red-500/20' : 'bg-[#10b981]/15 text-[#4ade80] border border-emerald-500/20'}`}>
                              Sign: {det.mSign === '-' ? 'Negative (-)' : 'Positive (+)'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-xl font-black text-white">{det.mStr}</div>
                            <div className="text-[11px] text-slate-350 leading-relaxed font-semibold">{det.mExpl}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* SUMMARY: trends as the object moves closer to the mirror */}
              <div className="bg-gradient-to-r from-emerald-950/40 via-[#0a2820]/40 to-teal-950/40 border border-emerald-500/20 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300 font-mono">Summary: How the Image Changes as the Object Moves</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11.5px] leading-relaxed">
                  <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-black text-slate-100 uppercase text-[10px] tracking-wider block font-mono">Concave Mirror: Object moving from Infinity → Pole</span>
                    <ul className="list-disc pl-4 text-slate-300 font-semibold space-y-1">
                      <li>The image starts as a tiny point exactly at F, then grows steadily larger as the object moves closer.</li>
                      <li>The image also moves away from the mirror, from F toward C, then beyond C, staying real and inverted the whole time.</li>
                      <li>At C, object and image are the same size (m = -1) -- this is the exact crossover point.</li>
                      <li>Between C and F, the image is real, inverted, and magnified (larger than the object).</li>
                      <li>The moment the object crosses inside F, the image flips character entirely: it becomes virtual, erect, and magnified, forming behind the mirror.</li>
                    </ul>
                  </div>
                  <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-black text-slate-100 uppercase text-[10px] tracking-wider block font-mono">Convex Mirror: Object moving from Infinity → Pole</span>
                    <ul className="list-disc pl-4 text-slate-300 font-semibold space-y-1">
                      <li>Unlike a concave mirror, the image is virtual, erect, and diminished for every single object position -- this never changes.</li>
                      <li>As the object moves closer to the mirror, the image grows slightly larger (though always remains smaller than the object) and moves outward from F toward P.</li>
                      <li>The image always stays trapped between the Pole (P) and the Focus (F), behind the mirror.</li>
                      <li>Because of this constant, predictable behaviour and wide field of view, convex mirrors are ideal for vehicle mirrors and security mirrors.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ────── TOPIC 4: SIGN CONVENTIONS & FORMULAS ────── */}
          {activeTopic === 'sign-convention' && (
            <div className="space-y-6 animate-fade-in" id="topic-sign-convention">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Cartesian Sign Conventions & Mirror Formulas
                </h1>
                <p className="text-slate-400 text-xs font-semibold">
                  Mathematical sign orientation rules for spherical optical systems.
                </p>
              </div>

              {/* DEFINITION FIRST */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                </div>
                <div className="space-y-2 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>
                    <b className="text-white">1. New Cartesian Sign Convention & Its Core Principle:</b> A fundamental set of mathematical sign rules used in optical physics to assign positive (+) and negative (-) values to lengths.
                    <span className="block mt-1.5 font-sans pl-4 border-l-2 border-cyan-500/30 text-slate-300">
                      <b>Fundamental Principle:</b> This system is based entirely on standard coordinate geometry where:
                      <br />• The <b>pole (P) of a spherical mirror</b> (or the optical center &apos;O&apos; of a lens) is treated mathematically as the <b>Origin (0,0)</b>.
                      <br />• The <b>principal axis</b> is aligned with the horizontal <b>X-axis</b>.
                      <br />• The incident light is always assumed of moving <b>from left to right</b>. Consequently, all distances measured in the direction of the incident light are taken as <b>Positive (+)</b>, and all distances measured in the direction opposite to that of incident light are taken as <b>Negative (-)</b>.
                    </span>
                  </p>
                  <p>
                    <b className="text-white">2. Object Distance (u):</b> The distance from the mirror or lens to the object. Because we always place the object on the left, <b>u is always a negative number</b> in physics questions.
                  </p>
                  <p>
                    <b className="text-white">3. Image Distance (v):</b> The distance from the mirror or lens to where the image forms. If it is on the right of the center, it gets a plus (+) sign; if it is on the left, it gets a minus (-) sign.
                  </p>
                </div>
              </div>

              {/* QUANTITY UNITS BOX */}
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & Units</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Object/Image Distance (u, v)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters (m) [SI] / centimeters (cm)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Object/Image Height (h, h')</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters (m) [SI] / centimeters (cm)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Linear Magnification (m)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">Dimensionless (Unitless Ratio)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive sign-convention helper tool */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4" id="sign-convention-helper">
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-500 font-black font-mono tracking-widest uppercase block">
                    🔴 Dynamic New Cartesian Sign Sign-poster:
                  </span>
                  <p className="text-xs text-slate-300 font-bold font-sans">
                    Select a component category below to immediately see the standard algebraic prefixes (+ or -) used in exam calculations:
                  </p>
                </div>

                <div className="flex gap-2 border bg-slate-950/80 p-1 border-slate-800 rounded-xl overflow-x-auto scrollbar-none">
                  {[
                    { id: 'concave-mirror', label: 'Concave Mirror' },
                    { id: 'convex-mirror', label: 'Convex Mirror' },
                    { id: 'convex-lens', label: 'Convex Lens' },
                    { id: 'concave-lens', label: 'Concave Lens' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setSignOpticsType(item.id as any)}
                      className={`px-3 py-2 rounded-lg text-xs font-black whitespace-nowrap cursor-pointer transition select-none ${
                        signOpticsType === item.id
                          ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black'
                          : 'bg-transparent text-slate-400 hover:text-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Display selected prefixes table */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                  <div className="bg-slate-950 border border-slate-850 p-3 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 min-h-[92px]">
                    <span className="text-[11px] font-black text-slate-400 uppercase font-mono block">f (Focal Length)</span>
                    <span className="text-sm font-black text-white">{signValues[signOpticsType].f}</span>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-3 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 min-h-[92px]">
                    <span className="text-[11px] font-black text-slate-400 uppercase font-mono block">u (Object Dist)</span>
                    <span className="text-sm font-black text-rose-300">{signValues[signOpticsType].u}</span>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-3 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 min-h-[92px]">
                    <span className="text-[11px] font-black text-slate-400 uppercase font-mono block">v (Image Dist)</span>
                    <span className="text-sm font-black text-teal-400 uppercase leading-snug">{signValues[signOpticsType].v}</span>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-3 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 min-h-[92px]">
                    <span className="text-[11px] font-black text-slate-400 uppercase font-mono block">h (Object Ht)</span>
                    <span className="text-sm font-black text-white">{signValues[signOpticsType].h}</span>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-3 rounded-2xl flex flex-col items-center text-center justify-center gap-1.5 min-h-[92px]">
                    <span className="text-[11px] font-black text-slate-400 uppercase font-mono block">h' (Image Ht)</span>
                    <span className="text-sm font-black text-yellow-300 leading-snug">{signValues[signOpticsType].hPrime}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-850">
                  <span className="text-[9px] font-black text-slate-400 uppercase font-mono block mb-2">Standard Equation (Mathematical Format)</span>
                  <div className="bg-slate-900/40 border border-slate-800 p-2.5 rounded-lg inline-flex items-center gap-1 text-center font-mono text-sm">
                    {signOpticsType.includes('mirror') ? (
                      <div className="flex items-center gap-1.5 text-yellow-300">
                        <Fraction num="1" den="v" />
                        <span className="text-xs text-slate-400 font-sans font-bold">+</span>
                        <Fraction num="1" den="u" />
                        <span className="text-xs text-slate-400 font-sans font-bold">=</span>
                        <Fraction num="1" den="f" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-cyan-300">
                        <Fraction num="1" den="v" />
                        <span className="text-xs text-slate-400 font-sans font-bold">-</span>
                        <Fraction num="1" den="u" />
                        <span className="text-xs text-slate-400 font-sans font-bold">=</span>
                        <Fraction num="1" den="f" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-350 block mt-2 font-sans">{signValues[signOpticsType].desc}</span>
                </div>
              </div>

              {/* Mirror formula list items */}
              <div className="space-y-4 text-xs font-semibold leading-relaxed">
                <h3 className="text-sm font-black text-slate-200 tracking-wider uppercase font-mono">
                  General Quantitative Mirror Formula Rules:
                </h3>
                
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                      1. Mirror Formula
                    </h4>
                    <p className="text-slate-400 pl-3 leading-relaxed text-[11px] font-sans">
                      This formula connects the object distance (<code className="text-rose-400">u</code>), image distance (<code className="text-[#22d3ee]">v</code>) and focal length (<code className="text-emerald-400">f</code>) of a spherical mirror:
                    </p>
                    <div className="flex justify-center my-3">
                      <div className="flex items-center gap-1.5 px-6 py-3 bg-slate-950 rounded-xl border border-slate-850 text-yellow-300">
                        <Fraction num="1" den="v" />
                        <span className="text-xs font-bold font-sans">+</span>
                        <Fraction num="1" den="u" />
                        <span className="text-xs font-bold font-sans">=</span>
                        <Fraction num="1" den="f" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full" />
                      2. Linear Magnification (m)
                    </h4>
                    <p className="text-slate-400 pl-3 leading-relaxed text-[11px] font-sans">
                      Tells us how large or small the image is compared to the object. It has no standard unit:
                    </p>
                    <div className="flex justify-center my-3">
                      <div className="flex items-center gap-1.5 px-6 py-3 bg-slate-950 rounded-xl border border-slate-855 text-yellow-300">
                        <span className="text-xs font-serif italic text-white mr-1">m</span>
                        <span className="text-xs font-bold font-sans">=</span>
                        <Fraction num="h'" den="h" />
                        <span className="text-xs font-bold font-sans">=</span>
                        <span className="text-xs font-serif italic text-white">-</span>
                        <Fraction num="v" den="u" />
                      </div>
                    </div>
                  </div>

                  {/* Magnification outcomes guide */}
                  <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5">
                    <span className="text-[13px] font-black text-[#58a6ff] uppercase font-mono block">📚 Decoding Magnification Sign Outcomes:</span>
                    <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4 font-bold font-sans">
                      <li>If <code className="text-rose-400">m is Negative (-)</code>: The image is strictly <b>Real & Inverted</b>.</li>
                      <li>If <code className="text-emerald-400">m is Positive (+)</code>: The image is strictly <b>Virtual & Erect</b>.</li>
                      <li>If <code className="text-yellow-300">|m| &gt; 1</code>: The image is larger than the object (<b>Enlarged</b>).</li>
                      <li>If <code className="text-yellow-300">|m| &lt; 1</code>: The image is smaller than the object (<b>Diminished</b>).</li>
                    </ul>
                  </div>

                  {/* Derivation Insight and Integrity vs Intensity */}
                  <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-3 font-sans text-xs">
                    <div>
                      <span className="text-[10.5px] font-black text-amber-500 uppercase font-mono block">📐 Derivation Insight:</span>
                      <p className="text-slate-300 text-[11px] mt-1 font-semibold leading-relaxed">
                        The mirror equation is derived through the geometry of similar triangles on a ray diagram. Specifically, observing that <code className="text-teal-400">ΔA'B'F ~ ΔMPF</code> and <code className="text-teal-400">ΔA'B'P ~ ΔABP</code>. By comparing the side ratios and substituting the Cartesian coordinates (<code className="text-slate-300 font-bold">BP = -u, B'P = -v, FP = -f</code>), similar-triangle algebra simplifies beautifully into the final equation <code className="text-yellow-300 font-mono">1/v + 1/u = 1/f</code>.
                      </p>
                    </div>

                    <div className="border-t border-slate-900 pt-2.5">
                      <span className="text-[10.5px] font-black text-cyan-400 uppercase font-mono block">🛡️ Exhibit Note: Image Integrity vs Intensity (Example 9.1)</span>
                      <p className="text-slate-400 text-[11px] mt-1 font-semibold leading-relaxed">
                        If the lower half of a mirror’s reflecting surface is completely covered by an opaque shroud:
                      </p>
                      <ul className="list-disc pl-4 mt-1 text-[11px] text-slate-350 space-y-1">
                        <li>
                          <b className="text-white">Image Integrity:</b> The <i>entire object</i> is still completely visible! Rays emanating from every single coordinate point on the target object still strike the uncovered upper half of the mirror to converge and project the complete image.
                        </li>
                        <li>
                          <b className="text-white">Image Intensity (Brightness):</b> Because the total surface reflecting area is cut in half, the amount of light gathered and refocused is halved, rendering the image <b>half as bright</b> (50% intensity).
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ────── TOPIC 5: REFRACTION of LIGHT & GLASS SLABS ────── */}
          {activeTopic === 'refraction' && (
            <div className="space-y-6 animate-fade-in" id="topic-refraction">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Refraction of Light & Glass Slab Lateral Shift
                </h1>
                <p className="text-slate-400 text-xs font-semibold">
                  Light propagation velocity changes and bending mechanics across varying optical densities.
                </p>
              </div>

              {/* DEFINITIONS BOX FIRST */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                </div>
                <div className="space-y-2 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>
                    <b className="text-white">1. Refraction:</b> The bending of light as it passes from one clear material (like air) into another (like water or glass). This happens because light speed changes from one material to another!
                  </p>
                  <p>
                    <b className="text-white">2. Refractive Index (n):</b> A number that tells us how much a material slows down light. For example, glass has a refractive index of about 1.5, which means light travels 1.5 times slower in glass than in empty space!
                  </p>
                  <p>
                    <b className="text-white">3. Snell's Law:</b> The formula that calculates exactly how much a light ray will bend when it enters a new material. It connects the bending angles to the refractive indices of both materials.
                  </p>
                  <p>
                    <b className="text-white">4. Lateral Displacement / Shift:</b> When light passes through a flat glass block, it bends when entering and bends back when leaving. The exiting light ray travels in the exact same direction but is shifted slightly to the side. The distance of this side-shift is the lateral shift!
                  </p>
                </div>
              </div>

              {/* QUANTITY UNITS BOX */}
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & Units</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Refractive Index (n)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">None (Dimensionless Constant)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Lateral Shift Value</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters (m) / millimeters (mm)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Speed of Light (v)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters per second (m/s or m s⁻¹)</span>
                  </div>
                </div>
              </div>

              {/* Medium bending rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex gap-3">
                  <div className="w-1.5 bg-[#f87171] rounded-full shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">Rarer to Denser (e.g., Air to Glass)</h4>
                    <p className="text-[10.5px] text-slate-400 mt-1 uppercase font-mono">Bends towards normal</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium mt-0.5 font-sans">Velocity of light decreases inside denser mediums, pulling the ray towards the perpendicular normal.</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex gap-3">
                  <div className="w-1.5 bg-[#4ade80] rounded-full shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">Denser to Rarer (e.g., Glass to Air)</h4>
                    <p className="text-[10.5px] text-slate-400 mt-1 uppercase font-mono">Bends away from normal</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium mt-0.5 font-sans">Velocity of light increases inside rarer mediums, scattering the ray away from the normal.</p>
                  </div>
                </div>
              </div>

              {/* RECTANGULAR GLASS SLAB SVG DIAGRAM - SIDE BY SIDE GRID TO RECLAIM EMPTY SPACE */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5" id="diagram-refraction-slab">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-black tracking-widest block mb-4">
                  Figure: High Precision Path of Refraction & Lateral Shift in Glass Slab
                </span>
                
                <div className="flex flex-col gap-5">
                  {/* Full-width SVG Diagram -- spans the entire card so the ray geometry has room to breathe */}
                  <div className="flex justify-center w-full">
                    {(() => {
                      const cCyan = isLightMode ? '#0e7490' : '#22d3ee';
                      const cSlate = isLightMode ? '#475569' : '#cbd5e1';
                      const cSlateDim = isLightMode ? '#334155' : '#64748b';
                      const cRed = isLightMode ? '#b91c1c' : '#f87171';
                      const cYellow = isLightMode ? '#a16207' : '#facc15';
                      const cGreen = isLightMode ? '#15803d' : '#4ade80';
                      return (
                        <svg width="100%" viewBox="-40 -8 480 268" className={`w-full h-auto rounded-xl border shadow-md transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b101d] border-slate-800'}`}>
                          <defs>
                            <marker id="slabArrowRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cRed} /></marker>
                            <marker id="slabArrowYellow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cYellow} /></marker>
                            <marker id="slabArrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cGreen} /></marker>
                          </defs>
                          {/* Glass Slab block rectangle */}
                          <rect x="70" y="60" width="260" height="110" fill={cCyan} fillOpacity="0.08" stroke={cCyan} strokeWidth="2.5" />
                          <text x="285" y="95" fill={cCyan} fontSize="11" fontWeight="bold" textAnchor="middle">GLASS SLAB</text>
                          <text x="285" y="107" fill={cSlate} fontSize="9" opacity="0.8" textAnchor="middle">(n = 1.50)</text>

                          {/* Boundary medium labels */}
                          <text x="310" y="3" fill={cSlate} fontSize="10" fontFamily="monospace" textAnchor="middle">AIR (Rarer)</text>
                          <text x="70" y="238" fill={cSlate} fontSize="10" fontFamily="monospace" textAnchor="start">AIR (Rarer)</text>

                          {/* Normals */}
                          {/* Top interface normal */}
                          <line x1="140" y1="8" x2="140" y2="100" stroke={cSlateDim} strokeDasharray="4,3" strokeWidth="1.2" />
                          <text x="140" y="2" fill={cSlateDim} fontSize="8" fontFamily="monospace" textAnchor="middle">N</text>
                          <text x="140" y="112" fill={cSlateDim} fontSize="8" fontFamily="monospace" textAnchor="middle">N'</text>

                          {/* Bottom interface normal */}
                          <line x1="230" y1="130" x2="230" y2="238" stroke={cSlateDim} strokeDasharray="4,3" strokeWidth="1.2" />
                          <text x="230" y="125" fill={cSlateDim} fontSize="8" fontFamily="monospace" textAnchor="middle">M</text>
                          <text x="230" y="250" fill={cSlateDim} fontSize="8" fontFamily="monospace" textAnchor="middle">M'</text>

                          {/* Rays path */}
                          {/* 1. Incident path -- arrowhead at the midpoint, never at an endpoint */}
                          <line x1="-15" y1="0" x2="62.5" y2="30" stroke={cRed} strokeWidth="2.5" markerEnd="url(#slabArrowRed)" />
                          <line x1="62.5" y1="30" x2="140" y2="60" stroke={cRed} strokeWidth="2.5" />
                          <text x="-3" y="2" fill={cRed} fontSize="9.5" fontWeight="bold" textAnchor="start">Incident Ray</text>

                          {/* 2. Refracted path inside glass */}
                          <line x1="140" y1="60" x2="185" y2="115" stroke={cYellow} strokeWidth="2.5" markerEnd="url(#slabArrowYellow)" />
                          <line x1="185" y1="115" x2="230" y2="170" stroke={cYellow} strokeWidth="2.5" />
                          <text x="152" y="150" fill={cYellow} fontSize="9.5" fontWeight="bold" textAnchor="middle">Refracted Ray</text>

                          {/* 3. Emergent path */}
                          <line x1="230" y1="170" x2="285" y2="192.5" stroke={cGreen} strokeWidth="2.5" markerEnd="url(#slabArrowGreen)" />
                          <line x1="285" y1="192.5" x2="340" y2="215" stroke={cGreen} strokeWidth="2.5" />
                          <text x="345" y="240" fill={cGreen} fontSize="9.5" fontWeight="bold" textAnchor="start">Emergent Ray</text>

                          {/* Dotted path (without slab deviation) */}
                          <line x1="140" y1="60" x2="265" y2="111" stroke={cSlateDim} strokeDasharray="3,3" strokeWidth="1.2" />
                          <line x1="265" y1="111" x2="340" y2="142" stroke={cSlateDim} strokeDasharray="3,3" strokeWidth="1.2" />

                          {/* Lateral Displacement indicator bracket */}
                          <path d="M 336,141 L 336,213" stroke={cRed} strokeDasharray="3,2" strokeWidth="1" />
                          <path d="M 336,170 C 356,170 356,185 336,185" fill="none" stroke={cCyan} strokeWidth="1.5" />
                          <text x="400" y="181" fill={cCyan} fontSize="9" fontWeight="bold" textAnchor="middle">LATERAL SHIFT</text>

                          {/* Incident angle i label */}
                          <path d="M 125,54 A 18,18 0 0,1 140,42" fill="none" stroke={cRed} strokeWidth="1.2" />
                          <text x="127" y="47" fill={cRed} fontSize="9" fontFamily="monospace">i</text>

                          {/* Refraction angle r label */}
                          <path d="M 140,78 A 18,18 0 0,0 152,70" fill="none" stroke={cYellow} strokeWidth="1.2" />
                          <text x="146" y="88" fill={cYellow} fontSize="9" fontFamily="monospace">r</text>
                        </svg>
                      );
                    })()}
                  </div>

                  {/* Column 2: Explanation Text - covering every empty space */}
                  <div className="space-y-3.5 text-[13px]">
                    <h4 className="text-[14px] font-bold text-cyan-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                      Slab Deviation Mechanics
                    </h4>
                    <p className="text-slate-200 leading-relaxed font-semibold">
                      When a beam of light travels through a rectangular glass slab, it bends at two distinct interfaces:
                    </p>
                    <ul className="text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed font-semibold">
                      <li><b>First Surface (Air to Glass):</b> Light slows down, bending <b>towards</b> the normal (<code className="text-white">i &gt; r</code>).</li>
                      <li><b>Second Surface (Glass to Air):</b> Light accelerates, bending <b>away</b> from the normal (<code className="text-white">r' &gt; i'</code>).</li>
                      <li><b>Lateral Displacement:</b> The emergent ray is parallel to the incident ray but offset sideways. This offset is called <i>Lateral Shift</i>.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Snell's Law details */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3" id="snells-law-block">
                <span className="text-[12px] text-cyan-400 font-black tracking-widest block font-mono uppercase">
                  📃 SNELL'S LAW & MATHEMATICAL EXPRESSION
                </span>

                <div className="space-y-2 text-[13px] font-semibold leading-relaxed">
                  <p className="text-slate-200 font-sans">
                    The ratio of the sine of angle of incidence to the sine of angle of refraction is constant, for a given pair of media. This is <b>Snell's Law</b>:
                  </p>
                  <div className="flex justify-center my-3">
                    <div className="flex items-center gap-1.5 px-6 py-3 bg-slate-950 rounded-xl border border-dashed border-cyan-500/30 text-yellow-300 font-bold font-mono">
                      <Fraction num="sin i" den="sin r" />
                      <span className="text-sm font-bold font-sans">=</span>
                      <span className="text-sm text-white">constant</span>
                      <span className="text-sm font-bold font-sans">=</span>
                      <span className="text-sm text-yellow-300 font-bold">n₂₁</span>
                    </div>
                  </div>
                  <p className="text-[#94a3b8] leading-relaxed text-[13px] pt-1 font-sans">
                    Where <code className="text-cyan-400">n₂₁</code> is the refractive index of glass (medium 2) with respect to air (medium 1). It is a pure unitless ratio. Water refractive index is <code className="text-[#2196f3]">1.33</code>, standard glass is <code className="text-[#2196f3]">1.50</code>, and diamond is the highest at <code className="text-[#2196f3]">2.42</code>!
                  </p>
                </div>
              </div>

              {/* THE ENTIRE RIGOROUS SCIENTIFIC REASON BEHIND SPEED CHANGE & DEVIATION */}
              <div className={`bg-gradient-to-br border border-cyan-500/20 p-6 rounded-3xl space-y-4 shadow-lg text-[13px] ${isLightMode ? 'from-white to-cyan-50' : 'from-[#0c1322] to-[#121c2e]'}`} id="deep-refraction-cause">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <div className="p-1 px-2 bg-cyan-500/10 text-cyan-400 font-mono text-[11px] font-black uppercase rounded tracking-widest border border-cyan-500/20">Physics Concept Guide</div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono">The Real Cause of Refraction (Why Light of different media slows down & bends)</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 leading-relaxed text-slate-350 font-sans">
                  <div className="space-y-3">
                    <h4 className="text-cyan-400 font-bold text-[13px] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" />
                      1. Why Glass & Water Slow Down Light: The "Crowded Corridor" Concept
                    </h4>
                    <p className="text-justify text-[13px] leading-relaxed text-slate-300">
                      In empty space (a vacuum), light travels completely unimpeded, zoom-flying at its maximum speed of <b>3,00,000 kilometers per second</b>.
                    </p>
                    <p className="text-justify text-[13px] leading-relaxed text-slate-300">
                      But materials like glass or water are packed with billions of atoms and electrons. When a light wave attempts to pierce through, the atoms absorb the incoming light energy for a tiny fraction of a split-second before passing/re-emitting it onwards.
                    </p>
                    <p className="text-justify text-[13px] leading-relaxed text-slate-400">
                      These billions of micro-stops cause tiny delays. It is just like trying to jog down a crowded, bustling school corridor vs. sprinting down an empty hallway! The individual light particles (photons) still travel at speed <code className="text-cyan-400 font-semibold font-mono">c</code> in the empty gaps between atoms, but the collective, overall progress of the wave is slowed down.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-emerald-400 font-bold text-[13px] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                      2. Why a Speed Change Forces the Light Beam to Bend
                    </h4>
                    <p className="text-justify text-[13px] leading-relaxed text-slate-300">
                      When a wide wave of light strikes glass at an angle, different sides of the wave front hit the glass at different split-seconds.
                    </p>
                    <p className="text-justify text-[13px] leading-relaxed text-slate-300">
                      The side of the beam entering the glass first slows down immediately, while the rest of the beam outside is still rushing ahead at full speed through the air. This speed difference across the wavefront forces the wave to <b>pivot and turn</b>!
                    </p>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-[15px] leading-relaxed text-slate-400">
                      <b className="text-slate-250 block mb-1">🚗 The Wheel-on-Rug Concept (Simple Analogy):</b>
                      Imagine rolling a toy car obliquely from smooth tile onto a thick hairy carpet. As soon as the front-right wheel rolls onto the carpet, it slows down. Since the front-left wheel is still rolling quickly on the slick tile, the entire toy car instantly swings and changes its heading. In physics, this turning direction is exactly what we call <b>bending/refracting towards the normal</b>.
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 mt-1 leading-relaxed text-[15px] text-slate-400 font-sans">
                  <div className="font-bold text-amber-400 uppercase tracking-wider text-[13px] font-mono mb-1">Summary of Snell's Law & Principle of Least Time:</div>
                  Nature always optimizes itself! According to Fermat's Principle, light naturally chooses the route that takes the absolute <b>minimum travel time</b>. To get from a faster medium (air) to a slower medium (glass) in the shortest possible time, bending its path is mathematically the quickest route! This perfect geometry is expressed by Snell's Law: <code className="text-yellow-300 font-mono font-bold">n₁ sin(i) = n₂ sin(r)</code>.
                </div>
              </div>

              {/* NATURAL EXAMPLES of REFRACTION WITH RAY DIAGRAMS */}
              <div className="space-y-6 pt-4 border-t border-slate-800" id="natural-refraction-examples">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
                  <h3 className="text-base font-black text-slate-105">Natural Phenomena of Refraction</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  Refraction is not just an abstract laboratory experiment—it is active all around us! Here are two essential natural examples analyzed with high-precision ray diagrams:
                </p>

                {/* Example 1: Coin in Water */}
                <div className="bg-[#0b101d] border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-wider flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] border border-amber-500/20">Case A</span>
                    Apparent Shallowing (Coin in Water)
                  </h4>

                  <div className="flex flex-col gap-5">
                    {/* Definitions & Detailed Explanation */}
                    <div className="space-y-3 text-xs">
                      <div className="bg-[#121c2e] p-3.5 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[13px] font-black uppercase text-[#22d3ee] font-mono tracking-widest block">Core Definition: Apparent Depth</span>
                        <p className="text-slate-350 leading-relaxed font-bold">
                          The perceived upward displacement of a submerged object due to light escaping from a denser medium (water) to a rarer medium (air). 
                        </p>
                      </div>

                      <div className="text-slate-300 space-y-2 font-semibold leading-relaxed">
                        <span className="text-[13px] font-black uppercase text-amber-300 font-mono tracking-widest block">How and Why It Happens:</span>
                        <p>
                          Every point on the coin at the bottom of the beaker reflects multiple light rays. Let's trace two of these rays:
                        </p>
                        <ul className="list-disc pl-4 text-[11px] text-slate-400 space-y-1.5">
                          <li>
                            <strong className="text-white">Ray 1 (Normal Incidence):</strong> Travels straight vertically upwards, hit the boundary and enters the air completely straight without any bending.
                          </li>
                          <li>
                            <strong className="text-white">Ray 2 (Oblique Incidence):</strong> Slashes upward at an angle. On crossing the density boundary into air, it speeds up and <span className="text-cyan-400 font-bold">bends away from the normal</span>.
                          </li>
                          <li>
                            <strong className="text-white">The Intersection:</strong> When an observer captures these rays, their brain projects the rays straight backward. The virtual straight-line trace of Ray 2 meets the vertical Ray 1 at a higher point, creating an <span className="text-emerald-400 font-bold">apparent image of the coin</span> that is significantly higher than its actual physical location!
                          </li>
                        </ul>
                        
                        {/* Mathematical link */}
                        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 mt-3 flex justify-between items-center text-[11px]">
                          <span className="text-slate-300">Refractive Index Formula:</span>
                          <span className="font-mono text-yellow-300 font-black">
                            n = <Fraction num="Real Depth (h)" den="Apparent Depth (h')" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Apparent Depth SVG Ray Diagram */}
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-850 flex flex-col items-center justify-center">
                      <span className="text-xs text-slate-400 uppercase font-mono font-black tracking-widest block mb-3 text-center">
                        Ray Diagram: Real vs Apparent Depth
                      </span>
                      
                      {(() => {
                        const cWater = isLightMode ? '#0369a1' : '#0ea5e9';
                        const cWaterLabel = isLightMode ? '#0369a1' : '#38bdf8';
                        const cAirLabel = isLightMode ? '#334155' : '#94a3b8';
                        const cBorder = isLightMode ? '#64748b' : '#475569';
                        const cNormal = isLightMode ? '#475569' : '#64748b';
                        const cCoin = isLightMode ? '#a16207' : '#eab308';
                        const cCoinLabel = isLightMode ? '#0f172a' : '#ffffff';
                        const cRay1 = isLightMode ? '#b91c1c' : '#f87171';
                        const cRay2 = isLightMode ? '#a16207' : '#facc15';
                        const cRay3 = isLightMode ? '#15803d' : '#4ade80';
                        const cVirtual = isLightMode ? '#6d28d9' : '#8b5cf6';
                        const cEyeFill = isLightMode ? '#e2e8f0' : '#1e293b';
                        const cEyeStroke = isLightMode ? '#334155' : '#ffffff';
                        const cEyeIris = isLightMode ? '#94a3b8' : '#475569';
                        const cEyeLabel = isLightMode ? '#334155' : '#cbd5e1';
                        return (
                          <svg width="100%" viewBox="0 0 280 250" className={`w-full max-w-[560px] h-auto rounded-lg border transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#070b12] border-slate-900'}`}>
                            <defs>
                              <marker id="depthArrow1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cRay1} /></marker>
                              <marker id="depthArrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cRay2} /></marker>
                              <marker id="depthArrow3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cRay3} /></marker>
                            </defs>
                            {/* Water level gradient or rectangle */}
                            <rect x="30" y="100" width="220" height="110" fill={cWater} fillOpacity="0.08" stroke={cWater} strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="30" y1="100" x2="250" y2="100" stroke={cWater} strokeWidth="2.5" />
                            <text x="40" y="115" fill={cWater} fontSize="8" fontFamily="monospace" fontWeight="bold">WATER SURFACE</text>
                            <text x="40" y="200" fill={cWaterLabel} fontSize="8" fontFamily="monospace">WATER (n = 1.33)</text>
                            <text x="40" y="85" fill={cAirLabel} fontSize="8" fontFamily="monospace">AIR (n = 1.0)</text>

                            {/* Beaker borders */}
                            <path d="M 30,50 L 30,210 L 250,210 L 250,50" fill="none" stroke={cBorder} strokeWidth="1.5" />

                            {/* Normal line, drawn at the true refraction point (Snell's Law: 1.33 sin15deg = 1.0 sin r => r = 20.1deg) */}
                            <line x1="167" y1="35" x2="167" y2="130" stroke={cNormal} strokeDasharray="3 3" strokeWidth="1" />
                            <text x="167" y="40" fill={cNormal} fontSize="7" fontFamily="monospace" textAnchor="middle">NORMAL</text>

                            {/* Coins */}
                            {/* Actual Coin (Deeper) */}
                            <ellipse cx="140" cy="200" rx="14" ry="4" fill={cCoin} fillOpacity="0.3" stroke={cCoin} strokeWidth="1" strokeDasharray="3 2" />
                            <text x="157" y="203" fill={cCoin} fillOpacity="0.7" fontSize="7" fontWeight="bold" textAnchor="start">Real Coin</text>

                            {/* Apparent Coin - true intersection of Ray 1 (undeviated) and the back-projection of refracted Ray 2 */}
                            <ellipse cx="140" cy="174" rx="14" ry="4" fill={cCoin} stroke={cCoin} strokeWidth="2" />
                            <text x="157" y="177" fill={cCoinLabel} fontSize="7.5" fontWeight="bold" textAnchor="start">Apparent Coin</text>

                            {/* Rays path */}
                            {/* Ray 1: Normal incidence, passes straight through undeviated */}
                            <line x1="140" y1="200" x2="140" y2="100" stroke={cRay1} strokeWidth="1.5" markerEnd="url(#depthArrow1)" />
                            <line x1="140" y1="100" x2="140" y2="30" stroke={cRay1} strokeWidth="1.5" markerEnd="url(#depthArrow1)" />

                            {/* Ray 2: Oblique incidence (15 deg from normal) and refraction */}
                            {/* Incident in water */}
                            <line x1="140" y1="200" x2="167" y2="100" stroke={cRay2} strokeWidth="1.5" markerEnd="url(#depthArrow2)" />

                            {/* Refracted in air (bends away from normal, r = 20.1deg), pointing straight at the eye */}
                            <line x1="167" y1="100" x2="192" y2="39" stroke={cRay3} strokeWidth="1.5" markerEnd="url(#depthArrow3)" />

                            {/* Virtual Ray traced back - meets Ray 1 exactly at the Apparent Coin */}
                            <line x1="167" y1="100" x2="140" y2="174" stroke={cVirtual} strokeDasharray="2 2" strokeWidth="1.5" />
                            <circle cx="140" cy="174" r="1.5" fill={cVirtual} />

                            {/* Depths Bracket Indicators */}
                            {/* Real Depth h */}
                            <line x1="262" y1="100" x2="262" y2="200" stroke={cRay1} strokeWidth="1" />
                            <line x1="258" y1="100" x2="266" y2="100" stroke={cRay1} strokeWidth="1" />
                            <line x1="258" y1="200" x2="266" y2="200" stroke={cRay1} strokeWidth="1" />
                            <text x="272" y="155" fill={cRay1} fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(90, 272, 155)">Real Depth (h)</text>

                            {/* Apparent Depth h' */}
                            <line x1="15" y1="100" x2="15" y2="174" stroke={cWaterLabel} strokeWidth="1" />
                            <line x1="11" y1="100" x2="19" y2="100" stroke={cWaterLabel} strokeWidth="1" />
                            <line x1="11" y1="174" x2="19" y2="174" stroke={cWaterLabel} strokeWidth="1" />
                            <text x="7" y="137" fill={cWaterLabel} fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 7, 137)">Apparent (h')</text>

                            {/* Eye representation, positioned right where the refracted ray arrives */}
                            <g transform="translate(172, 4)">
                              <path d="M 10,22 Q 25,12 40,22 Q 25,32 10,22 Z" fill={cEyeFill} stroke={cEyeStroke} strokeWidth="1" />
                              <circle cx="25" cy="22" r="5" fill={cEyeIris} stroke={cEyeStroke} strokeWidth="0.5" />
                              <circle cx="25" cy="22" r="2.5" fill="#000000" />
                              <text x="25" y="4" fill={cEyeLabel} fontSize="7" fontWeight="bold" textAnchor="middle">OBSERVER EYE</text>
                            </g>

                          </svg>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Example 2: Bent Straw / Pencil */}
                <div className="bg-[#0b101d] border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-wider flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] border border-amber-500/20">Case B</span>
                    The Bent Pencil Illusion
                  </h4>

                  <div className="flex flex-col gap-5">
                    {/* Definitions & Detailed Explanation */}
                    <div className="space-y-3 text-xs">
                      <div className="bg-[#121c2e] p-3.5 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[13px] font-black uppercase text-[#22d3ee] font-mono tracking-widest block">Core Definition: Optical Misalignment</span>
                        <p className="text-slate-350 leading-relaxed font-bold">
                          The apparent bending or displacement of a continuous solid rod (pencil/straw) at the junction where it crosses from a rarer gas medium into a denser liquid medium.
                        </p>
                      </div>

                      <div className="text-slate-300 space-y-2 font-semibold leading-relaxed">
                        <span className="text-[13px] font-black uppercase text-amber-300 font-mono tracking-widest block">How and Why It Happens:</span>
                        <p>
                          This classic phenomenon is a direct extension of apparent depth, acting point-by-point:
                        </p>
                        <ul className="list-disc pl-4 text-[11px] text-slate-400 space-y-1.5">
                          <li>
                            The section of the pencil above the water line is seen directly. Light from this section travels straight to the eyes through air, so it is located exactly where it truly is.
                          </li>
                          <li>
                            Every submerged coordinate point of the pencil behaves exactly like the coin from Case A!
                          </li>
                          <li>
                            Since each point submerged under water is shifted upwards by water-air refraction, the entire submerged body of the pencil appears <span className="text-yellow-300 font-bold">lifted and shortened</span>. This dynamic upward pivot at the water plane creates the striking optical illusion that the pencil is broken or bent at the water surface!
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Bent Pencil SVG Diagram */}
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-850 flex flex-col items-center justify-center">
                      <span className="text-xs text-slate-400 uppercase font-mono font-black tracking-widest block mb-3 text-center">
                        Ray Diagram: Pencil Appearing Bent
                      </span>

                      {(() => {
                        const cWater = isLightMode ? '#0369a1' : '#0ea5e9';
                        const cWaterLabel = isLightMode ? '#0369a1' : '#38bdf8';
                        const cAirLabel = isLightMode ? '#334155' : '#94a3b8';
                        const cBorder = isLightMode ? '#64748b' : '#475569';
                        const cEye = isLightMode ? '#0e7490' : '#22d3ee';
                        const cEyeIris = isLightMode ? '#475569' : '#cbd5e1';
                        const cPencil = isLightMode ? '#c2410c' : '#f97316';
                        const cActualFaded = isLightMode ? '#94a3b8' : '#94a3b8';
                        const cActualTipFill = isLightMode ? '#fdba74' : '#fed7aa';
                        const cActualTipEdge = isLightMode ? '#64748b' : '#475569';
                        const cActualLabel = isLightMode ? '#64748b' : '#e2e8f0';
                        const cApparentLabel = isLightMode ? '#15803d' : '#4ade80';
                        const cNormal = isLightMode ? '#64748b' : '#475569';
                        const cIncident = isLightMode ? '#0e7490' : '#22d3ee';
                        const cRefracted = isLightMode ? '#15803d' : '#4ade80';
                        const cBackProject = isLightMode ? '#6d28d9' : '#a78bfa';
                        const cFooter = isLightMode ? '#334155' : '#94a3b8';
                        return (
                          <svg width="100%" viewBox="0 0 280 250" className={`w-full max-w-[560px] h-auto rounded-lg border transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#070b12] border-slate-900'}`}>
                            <defs>
                              <marker id="pencilArrowIncident" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cIncident} /></marker>
                              <marker id="pencilArrowRefracted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cRefracted} /></marker>
                            </defs>
                            {/* Water level gradient or rectangle */}
                            <rect x="30" y="110" width="220" height="100" fill={cWater} fillOpacity="0.08" stroke={cWater} strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="30" y1="110" x2="250" y2="110" stroke={cWater} strokeWidth="2.5" />
                            <text x="55" y="123" fill={cWater} fontSize="8" fontFamily="monospace" fontWeight="bold">WATER LEVEL</text>
                            <text x="55" y="195" fill={cWaterLabel} fontSize="8" fontFamily="monospace">WATER (n = 1.33)</text>
                            <text x="55" y="100" fill={cAirLabel} fontSize="8" fontFamily="monospace">AIR (n = 1.00)</text>

                            {/* Beaker borders */}
                            <path d="M 30,50 L 30,210 L 250,210 L 250,50" fill="none" stroke={cBorder} strokeWidth="1.5" />

                            {/* Elegant Eye representation, raised above the pencil so the EYE label doesn't overlap it */}
                            <g transform="translate(-12.5, -10)">
                              <path d="M 60,35 Q 75,23 90,35 Q 75,47 60,35 Z" fill="none" stroke={cEye} strokeWidth="1.5" />
                              <circle cx="75" cy="35" r="5" fill={cEyeIris} />
                              <circle cx="75" cy="35" r="2.5" fill="#0f172a" />
                              <text x="98" y="38" fill={cEye} fontSize="8" fontWeight="extrabold" fontFamily="sans-serif">EYE</text>
                            </g>

                            {/* PENCIL POSITIONS */}
                            {/* Pencil ABOVE water position (true and solid) */}
                            <line x1="100" y1="40" x2="150" y2="110" stroke={cPencil} strokeWidth="6" strokeLinecap="flat" />

                            {/* Submerged Pencil ACTUAL position (faded/dashed/transparent) */}
                            <line x1="150" y1="110" x2="190" y2="166" stroke={cActualFaded} strokeWidth="6" strokeOpacity="0.22" strokeLinecap="flat" />
                            <polygon points="187,167 200,180 192,164" fill={cActualTipFill} fillOpacity="0.22" />
                            <polygon points="196,175 200,180 198,173" fill={cActualTipEdge} fillOpacity="0.22" />
                            <text x="210" y="184" fill={cActualLabel} fillOpacity="0.32" fontSize="7.5" fontWeight="bold">Actual Tip</text>

                            {/* Submerged Pencil APPARENT position (solid, bent upwards, and beautifully sharp-tipped!) */}
                            <line x1="150" y1="110" x2="190" y2="142" stroke={cPencil} strokeWidth="6" strokeLinecap="flat" />
                            <polygon points="188,144 200,150 192,140" fill={cActualTipFill} />
                            <polygon points="196,147 200,150 198,145" fill={cActualTipEdge} />
                            <text x="202" y="148" fill={cApparentLabel} fontSize="7" fontWeight="bold">Apparent Tip</text>

                            {/* Normal lines at boundary (light gray dashed) */}
                            <line x1="145" y1="90" x2="145" y2="135" stroke={cNormal} strokeWidth="0.8" strokeDasharray="3 3" />
                            <line x1="155" y1="90" x2="155" y2="135" stroke={cNormal} strokeWidth="0.8" strokeDasharray="3 3" />
                            <text x="150" y="72" fill={cNormal} fontSize="7" fontFamily="sans-serif" textAnchor="middle">Normal</text>

                            {/* Rays path from the actual tip */}
                            {/* Ray 1 (Incident in water): goes from (200, 180) to (145, 110) */}
                            <line x1="200" y1="180" x2="145" y2="110" stroke={cIncident} strokeWidth="1.2" markerEnd="url(#pencilArrowIncident)" />

                            {/* Ray 1 (Refracted in air): goes from (145, 110) to (48.75, 40) - enters pupil */}
                            <line x1="145" y1="110" x2="48.75" y2="40" stroke={cRefracted} strokeWidth="1.5" markerEnd="url(#pencilArrowRefracted)" />

                            {/* Ray 2 (Incident in water): goes from (200, 180) to (155, 110) */}
                            <line x1="200" y1="180" x2="155" y2="110" stroke={cIncident} strokeWidth="1.2" markerEnd="url(#pencilArrowIncident)" />

                            {/* Ray 2 (Refracted in air): goes from (155, 110) to (76.25, 40) - enters pupil */}
                            <line x1="155" y1="110" x2="76.25" y2="40" stroke={cRefracted} strokeWidth="1.5" markerEnd="url(#pencilArrowRefracted)" />

                            {/* Back-projection of refracted rays (Dashed lines to Apparent Tip) */}
                            <line x1="145" y1="110" x2="200" y2="150" stroke={cBackProject} strokeDasharray="3 3" strokeWidth="1.2" />
                            <line x1="155" y1="110" x2="200" y2="150" stroke={cBackProject} strokeDasharray="3 3" strokeWidth="1.2" />

                            <text x="140" y="235" fill={cFooter} fontSize="8.5" fontStyle="italic" textAnchor="middle" fontWeight="bold">Submerged part appears shallower and bent upwards</text>
                          </svg>
                        );
                      })()}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ────── TOPIC 8: REFRACTION BY PRISM & SPECTRUM ────── */}
          {activeTopic === 'prism-refraction' && (
            <div className="space-y-6 animate-fade-in" id="topic-prism-refraction">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Refraction of Light by a Prism & Dispersion
                </h1>
                <p className="text-slate-400 text-xs font-semibold">
                  Study how a triangular glass prism bends light and decomposes white light into its constituent wavelengths.
                </p>
              </div>

              {/* CORE DEFINITIONS AND STRICT EXPLANATIONS */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-4 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions & Corresponding Explanations</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 text-xs">
                  {/* Definition 1 */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-black text-[#38bdf8] uppercase font-mono tracking-wider">1. Triangular Prism</span>
                      <span className="text-[9px] text-slate-500 font-mono">Definition & Explanation</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-bold">
                      <b className="text-white">Definition:</b> A transparent optical body bounded by two triangular bases and three rectangular lateral refracting faces inclined at an angle.
                    </p>
                    <p className="text-slate-400 leading-relaxed font-semibold">
                      <b className="text-cyan-300">Explanation:</b> Unlike a rectangular glass slab where the entrance and exit surfaces are perfectly parallel, a prism's refracting faces are inclined. Because of this tilt, when a light ray passes through, it suffers a permanent angular change in its direction, bending towards the wider base of the prism instead of emerging parallel to its original path.
                    </p>
                  </div>

                  {/* Definition 2 */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-black text-amber-400 uppercase font-mono tracking-wider">2. Angle of Deviation (δ)</span>
                      <span className="text-[9px] text-slate-500 font-mono">Definition & Explanation</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-bold">
                      <b className="text-white">Definition:</b> The unique angle formed between the forward projection of the incident ray and the backward extension of the emerging ray.
                    </p>
                    <p className="text-slate-400 leading-relaxed font-semibold">
                      <b className="text-amber-300">Explanation:</b> As light crosses into the prism, it slows down and bends toward the normal line. When it exits the opposite side back into air, it speeds up and bends away from the normal. The total cumulative turning angle between where the light was original heading, and where it actually ends up shooting out, is called the Angle of Deviation, denoted by the Greek letter <code className="text-yellow-300">δ (Delta)</code>.
                    </p>
                  </div>

                  {/* Definition 3 */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-black text-rose-400 uppercase font-mono tracking-wider">3. Dispersion of Light</span>
                      <span className="text-[9px] text-slate-500 font-mono">Definition & Explanation</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-bold">
                      <b className="text-white">Definition:</b> The physical splitting of a composite beam of light (like sunlight) into its constituent monochromatic spectrum of colors.
                    </p>
                    <p className="text-slate-400 leading-relaxed font-semibold">
                      <b className="text-rose-300">Explanation:</b> White light is actually a mixture of many wavelengths (VIBGYOR). The speed of light inside the glass prism depends on its wavelength (Cauchy's Principle). Red light has the longest wavelength and encounters the lowest refractive index, meaning it travels fastest and bends the <span className="text-emerald-400 font-bold">least</span>. Violet light has the shortest wavelength, encounters the highest refractive index, moves slowest, and bends the <span className="text-rose-400 font-bold">most</span>. This speed gap fans out the incoming white beam into a brilliant color band!
                    </p>
                  </div>

                  {/* Definition 4 */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-black text-emerald-400 uppercase font-mono tracking-wider">4. Recombination of Spectrum</span>
                      <span className="text-[9px] text-slate-500 font-mono">Definition & Explanation</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-bold">
                      <b className="text-white">Definition:</b> The process of merging dispersed monochromatic spectral colors back into a single, unified beam of white light.
                    </p>
                    <p className="text-slate-400 leading-relaxed font-semibold">
                      <b className="text-emerald-300">Explanation:</b> First demonstrated by Sir Isaac Newton using a pair of prisms. He realized that if his first prism splits white light, he can undo this effect by taking a second identical glass prism and turning it upside down (inverted) right behind the first. The inverted prism bends the dispersed colors in the exact opposite direction and by the exact same amounts. This cancels out the dispersion, recombining the spectrum back into a single white beam!
                    </p>
                  </div>
                </div>
              </div>

              {/* DEMONSTRATION 1: GEOMETRICAL REFRACTION BY PRISM */}
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4">
                <span className="text-[13px] text-amber-500 uppercase font-mono font-black tracking-widest block text-center">
                  Figure: Formal Geometrical Ray Diagram of Refraction through Prism
                </span>

                <div className="flex flex-col gap-5">
                  {/* Explanation parameters info */}
                  <div className="text-xs font-semibold leading-relaxed text-slate-350 space-y-2.5">
                    <h4 className="text-white font-black text-xs uppercase font-mono">Mathematical Ray Relations</h4>
                    <p>
                      Let's trace a monochromatic ray through an equilateral prism. By analyzing the geometry of triangles and normals inside the prism, we establish these fundamental optical relationships:
                    </p>
                    <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
                      <li>
                        <b className="text-white">Angle of Deviation (δ):</b> The angle between the original direction of the incident ray and the final direction of the emergent ray — in short, the total amount by which the prism bends the light from its straight-line path.
                      </li>
                      <li>
                        <b className="text-white">Angle of Prism (A):</b> Connects the internal refraction angles at both boundaries:
                        <div className="mt-1 font-mono text-yellow-300 bg-slate-950 px-3 py-1 rounded border border-slate-800 shadow-inner inline-block">A = r₁ + r₂</div>
                      </li>
                      <li>
                        <b className="text-white">Prism Equation:</b> The sum of angle of incidence (i) and angle of emergence (e) is always equal to the sum of angle of prism (A) and angle of deviation (δ):
                        <div className="mt-1 font-mono text-cyan-300 bg-slate-950 px-3 py-1 rounded border border-slate-800 shadow-inner inline-block">i + e = A + δ</div>
                      </li>
                      <li>
                        <b className="text-white">Minimum Deviation (D_m):</b> At a specific angle of incidence, deviation is minimum. In this condition, the ray inside the prism travels perfectly parallel to the base, where <code className="text-emerald-400 font-sans font-bold">i = e</code> and <code className="text-emerald-400 font-sans font-bold font-mono">r₁ = r₂ = A/2</code>.
                      </li>
                    </ul>
                  </div>

                  {/* SVG Geometrical Prism Ray Diagram */}
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-850 flex justify-center">
                    {(() => {
                      const cPrism = isLightMode ? '#0369a1' : '#38bdf8';
                      const cNormal = isLightMode ? '#64748b' : '#64748b';
                      const cIncident = isLightMode ? '#b91c1c' : '#f87171';
                      const cRefracted = isLightMode ? '#a16207' : '#facc15';
                      const cEmergent = isLightMode ? '#15803d' : '#4ade80';
                      const cProjection = isLightMode ? '#334155' : '#e2e8f0';
                      const cDeviation = isLightMode ? '#be185d' : '#ec4899';
                      return (
                        <svg width="100%" viewBox="0 0 280 230" className={`w-full max-w-[560px] h-auto rounded-lg transition-colors duration-300 ${isLightMode ? 'bg-white' : 'bg-[#070b12]'}`}>
                          <defs>
                            <marker id="prismArrowIncident" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cIncident} /></marker>
                            <marker id="prismArrowRefracted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cRefracted} /></marker>
                            <marker id="prismArrowEmergent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cEmergent} /></marker>
                          </defs>
                          {/* Prism Triangle */}
                          <polygon points="140,40 40,200 240,200" fill={cPrism} fillOpacity="0.05" stroke={cPrism} strokeWidth="2.5" />
                          {/* Angle of Prism (A), the true apex angle between the two faces (~64deg here) */}
                          <path d="M 147.4,51.9 A 14,14 0 0,1 132.6,51.9" fill="none" stroke={cPrism} strokeWidth="1.2" />
                          <text x="140" y="32" fill={cPrism} fontSize="10.5" fontWeight="bold" textAnchor="middle">A (Angle of Prism)</text>
                          <text x="140" y="188" fill={cPrism} opacity="0.32" fontSize="12" fontWeight="black" textAnchor="middle">GLASS PRISM</text>

                          {/* Normals */}
                          {/* Left Face Normal: perpendicular to slope -1.6 (slope 0.625) passing through (90, 120) */}
                          <line x1="40" y1="89" x2="170" y2="170" stroke={cNormal} strokeDasharray="3 3" strokeWidth="1" />
                          <text x="35" y="83" fill={cNormal} fontSize="7.5" fontFamily="monospace">Normal 1</text>

                          {/* Right Face Normal: perpendicular to slope 1.6 (slope -0.625) passing through (190, 120) */}
                          <line x1="240" y1="89" x2="110" y2="170" stroke={cNormal} strokeDasharray="3 3" strokeWidth="1" />
                          <text x="245" y="83" fill={cNormal} fontSize="7.5" fontFamily="monospace" textAnchor="end">Normal 2</text>

                          {/* Rays */}
                          {/* Incident Ray */}
                          <line x1="5" y1="165" x2="47.5" y2="142.5" stroke={cIncident} strokeWidth="1.4" markerEnd="url(#prismArrowIncident)" />
                          <line x1="47.5" y1="142.5" x2="90" y2="120" stroke={cIncident} strokeWidth="1.4" />
                          <text x="2" y="178" fill={cIncident} fontSize="8" fontWeight="bold">Incident</text>

                          {/* Refracted Ray inside prism (Horizontal under minimum deviation conditions) */}
                          <line x1="90" y1="120" x2="140" y2="120" stroke={cRefracted} strokeWidth="1.4" markerEnd="url(#prismArrowRefracted)" />
                          <line x1="140" y1="120" x2="190" y2="120" stroke={cRefracted} strokeWidth="1.4" />
                          <text x="140" y="112" fill={cRefracted} fontSize="7.5" fontWeight="bold" textAnchor="middle">Refracted</text>

                          {/* Emergent Ray exiting (Symmetrical to Incident) */}
                          <line x1="190" y1="120" x2="227.5" y2="140" stroke={cEmergent} strokeWidth="1.4" markerEnd="url(#prismArrowEmergent)" />
                          <line x1="227.5" y1="140" x2="265" y2="160" stroke={cEmergent} strokeWidth="1.4" />
                          <text x="278" y="213" fill={cEmergent} fontSize="8" fontWeight="bold" textAnchor="end">Emergent Ray</text>

                          {/* Angle sector text labels */}
                          {/* Angle of incidence i */}
                          <path d="M 74.1,128.4 A 18,18 0 0,1 74.7,110.5" fill="none" stroke={cIncident} strokeWidth="1.2" />
                          <text x="63" y="123" fill={cIncident} fontSize="7.5" fontFamily="monospace">i</text>

                          {/* Angle of refraction r1 */}
                          <path d="M 105,120 A 15,15 0 0,1 102.7,128" fill="none" stroke={cRefracted} strokeWidth="1.2" />
                          <text x="111" y="129" fill={cRefracted} fontSize="7.5" fontFamily="monospace">r₁</text>

                          {/* Angle of refraction r2 */}
                          <path d="M 177.3,128 A 15,15 0 0,1 175,120" fill="none" stroke={cRefracted} strokeWidth="1.2" />
                          <text x="158" y="129" fill={cRefracted} fontSize="7.5" fontFamily="monospace">r₂</text>

                          {/* Angle of emergence e */}
                          <path d="M 205.3,110.5 A 18,18 0 0,1 205.9,128.5" fill="none" stroke={cEmergent} strokeWidth="1.2" />
                          <text x="215" y="123" fill={cEmergent} fontSize="7.5" fontFamily="monospace">e</text>

                          {/* Projections of Forward Incident and Backward Emergent: they meet exactly at (140, 93.5) */}
                          <line x1="90" y1="120" x2="160" y2="83" stroke={cProjection} strokeDasharray="2 2" strokeWidth="1" opacity="0.6" />
                          <line x1="190" y1="120" x2="120" y2="83" stroke={cProjection} strokeDasharray="2 2" strokeWidth="1" opacity="0.6" />

                          {/* Angle of Deviation δ: the true angle between the undeviated (forward incident) path and the actual emergent ray, i.e. i + e - A ≈ 56deg (NOT the 124deg supplementary/vertical angle on the other side of the crossing) */}
                          <path d="M 154.3,86 A 16,16 0 0,1 154.3,101" fill="none" stroke={cDeviation} strokeWidth="1.2" />
                          <text x="163" y="97" fill={cDeviation} fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">δ</text>
                        </svg>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* DEMONSTRATION 2: DISPERSION and SINGLE PRISM SPECTRUM */}
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4" id="single-prism-spectrum">
                <span className="text-[13px] text-amber-500 uppercase font-mono font-black tracking-widest block text-center">
                  Figure: Dispersion of Composite White Light into standard VIBGYOR Spectrum
                </span>

                <div className="flex flex-col gap-5">
                  {/* SVG Dispersion ray tracer */}
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-850 flex justify-center">
                    {(() => {
                      const cPrism = isLightMode ? '#0369a1' : '#38bdf8';
                      const cOutline = isLightMode ? '#64748b' : '#475569';
                      const cPrismLabel = isLightMode ? '#334155' : '#cbd5e1';
                      const cScreenFill = isLightMode ? '#e2e8f0' : '#1e293b';
                      const cScreenLabel = isLightMode ? '#334155' : '#94a3b8';
                      const cWhiteRay = isLightMode ? '#334155' : '#ffffff';
                      const cYellow = isLightMode ? '#a16207' : '#eab308';
                      const cViolet = isLightMode ? '#6d28d9' : '#8b5cf6';
                      const cVioletLabel = isLightMode ? '#7e22ce' : '#c084fc';
                      return (
                        <svg width="100%" viewBox="0 0 290 230" className={`w-full max-w-[580px] h-auto rounded-lg transition-colors duration-300 ${isLightMode ? 'bg-white' : 'bg-[#070b12]'}`}>
                          {/* Glass Prism */}
                          <polygon points="120,40 30,190 210,190" fill={cPrism} fillOpacity="0.04" stroke={cOutline} strokeWidth="1.5" />
                          <text x="120" y="110" fill={cPrismLabel} opacity="0.25" fontSize="11" fontWeight="bold" textAnchor="middle">PRISM</text>

                          {/* Screen on the right */}
                          <rect x="255" y="40" width="10" height="160" fill={cScreenFill} stroke={cOutline} strokeWidth="1" />
                          <text x="260" y="215" fill={cScreenLabel} fontSize="8.5" fontWeight="black" textAnchor="middle">SCREEN</text>

                          {/* Incident White Light Beam */}
                          <line x1="5" y1="100" x2="72" y2="120" stroke={cWhiteRay} strokeWidth="2.5" markerEnd="url(#dispersionArrowWhite)" />
                          <text x="5" y="88" fill={cWhiteRay} fontSize="8" fontWeight="bold">Incident White Light</text>

                          {/* Inside path: a single white ray from (72, 120) to (181.5, 142.5) */}
                          <line x1="72" y1="120" x2="181.5" y2="142.5" stroke={cWhiteRay} strokeWidth="2.2" opacity="0.95" />
                          <text x="120" y="145" fill={cWhiteRay} opacity="0.8" fontSize="7" fontWeight="bold" textAnchor="middle">White Light</text>

                          <defs>
                            <marker id="dispersionArrowWhite" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cWhiteRay} /></marker>
                            <linearGradient id="rainbow-screen" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="16%" stopColor="#f97316" />
                              <stop offset="33%" stopColor="#eab308" />
                              <stop offset="50%" stopColor="#10b981" />
                              <stop offset="66%" stopColor="#06b6d4" />
                              <stop offset="83%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                            <linearGradient id="rainbow-air-spectrum" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.35" />
                            </linearGradient>
                          </defs>

                          {/* Spectrum filling polygon in air, starting only at exit face (181.5, 142.5) */}
                          <polygon points="181.5,142.5 255,155 255,185" fill="url(#rainbow-air-spectrum)" />

                          {/* Exiting Spectrum rays from right face exit point (181.5, 142.5) to screen at x = 255 */}
                          {/* Red ray (deviated least, top of spectrum) */}
                          <line x1="181.5" y1="142.5" x2="255" y2="155" stroke="#ef4444" strokeWidth="1.5" />
                          <text x="253" y="138" fill="#ef4444" fontSize="7" fontWeight="bold" textAnchor="end">Red (Least bent)</text>

                          {/* Orange ray */}
                          <line x1="181.5" y1="142.5" x2="255" y2="160" stroke="#f97316" strokeWidth="1.2" />

                          {/* Yellow ray */}
                          <line x1="181.5" y1="142.5" x2="255" y2="165" stroke={cYellow} strokeWidth="1.2" />

                          {/* Green ray */}
                          <line x1="181.5" y1="142.5" x2="255" y2="170" stroke="#10b981" strokeWidth="1.2" />

                          {/* Blue ray */}
                          <line x1="181.5" y1="142.5" x2="255" y2="175" stroke="#06b6d4" strokeWidth="1.2" />

                          {/* Indigo ray */}
                          <line x1="181.5" y1="142.5" x2="255" y2="180" stroke="#3b82f6" strokeWidth="1.2" />

                          {/* Violet ray (deviated most, bottom of spectrum) */}
                          <line x1="181.5" y1="142.5" x2="255" y2="185" stroke={cViolet} strokeWidth="1.5" strokeLinecap="round" />
                          <text x="225" y="202" fill={cVioletLabel} fontSize="8" fontWeight="bold" textAnchor="end">Violet (Most bent)</text>

                          {/* Color dispersion screen target overlay */}
                          <rect x="254" y="155" width="4" height="30" fill="url(#rainbow-screen)" />
                        </svg>
                      );
                    })()}
                  </div>

                  {/* Scientific text description */}
                  <div className="text-xs font-semibold leading-relaxed text-slate-350 space-y-3">
                    <h4 className="text-white font-black text-xs uppercase font-mono">Why does White Light Split?</h4>
                    <p>
                      Visible sunlight appears white, but is actually a composite of electromagnetic waves from approximately <b className="text-[#38bdf8]">400 nm (violet)</b> to <b className="text-[#38bdf8]">750 nm (red)</b> in wavelength.
                    </p>
                    <p>
                      When this composite beam travels inside glass, its glass speed <code className="text-yellow-300">v_λ</code> is wavelength-dependent:
                    </p>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 font-mono text-[11px] text-center text-teal-400 font-bold leading-normal">
                      v_red &gt; v_violet  ⟹  n_violet &gt; n_red
                    </div>
                    <p>
                      Because refraction bending is directly governed by refractive index <code className="text-teal-400">n</code>, violet light experiences the highest refractive index, slowing down dramatically and bending at a sharper angle than red light! The diverging angle between these colors forms the VIBGYOR bands.
                    </p>
                  </div>
                </div>
              </div>

              {/* DEMONSTRATION 3: NEWTON'S RECOMBINATION OF WHITE LIGHT */}
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4" id="newton-spectrum-recombination">
                <span className="text-[13px] text-amber-500 uppercase font-mono font-black tracking-widest block text-center">
                  Figure: Sir Isaac Newton's Recombination Experiment (Double-Prism Setup)
                </span>

                <div className="flex flex-col gap-5">
                  {/* Detailed explanation */}
                  <div className="text-xs font-semibold leading-relaxed text-slate-350 space-y-3">
                    <h4 className="text-white font-black text-xs uppercase font-mono">Newton's Critical Historic Proof</h4>
                    <p>
                      Before Sir Isaac Newton, scholars believed that glass itself "painted" or colored the light as a corrupting contamination.
                    </p>
                    <div className="bg-[#121c2e] p-3.5 rounded-xl border border-slate-800 text-[11px] font-sans text-slate-300 leading-relaxed font-semibold">
                      <b className="text-white block mb-1">Double Prism Experiment:</b>
                      To disprove this, Newton placed a second identical prism <strong className="text-yellow-300">inverted (upside down)</strong> behind the first. 
                      The first prism dispersed white light into colored rays. When these separated colors entered the second, inverted prism, the inverted shape bent them back together. 
                      The colors exited as a single, combined beam of <strong className="text-emerald-400">pure white light!</strong>
                    </div>
                    <p>
                      This elegant, landmark experiment proved that white light is naturally composed of constituent colors, and the prism acts merely as a physical separator.
                    </p>
                  </div>

                  {/* SVG Newton Recombination ray tracer */}
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-850 flex justify-center">
                    {(() => {
                      const cOutline = isLightMode ? '#64748b' : '#475569';
                      const cPrismLabel = isLightMode ? '#334155' : '#cbd5e1';
                      const cWhiteRay = isLightMode ? '#334155' : '#ffffff';
                      const cYellow = isLightMode ? '#a16207' : '#eab308';
                      const cViolet = isLightMode ? '#6d28d9' : '#8b5cf6';
                      const cRecombined = isLightMode ? '#047857' : '#34d399';
                      return (
                        <svg width="100%" viewBox="0 0 290 230" className={`w-full max-w-[580px] h-auto rounded-lg transition-colors duration-300 ${isLightMode ? 'bg-white' : 'bg-[#070b12]'}`}>
                          {/* Prism 1: Normal (pointing up) */}
                          <polygon points="75,50 15,185 135,185" fill="#38bdf8" fillOpacity="0.03" stroke={cOutline} strokeWidth="1.2" />
                          <text x="75" y="170" fill={cPrismLabel} opacity="0.3" fontSize="8" fontWeight="bold" textAnchor="middle">DISPERSING PRISM P₁</text>

                          {/* Prism 2: Inverted (pointing down) */}
                          <polygon points="215,180 155,45 275,45" fill="#10b981" fillOpacity="0.03" stroke={cOutline} strokeWidth="1.2" />
                          <text x="215" y="60" fill={cPrismLabel} opacity="0.3" fontSize="8" fontWeight="bold" textAnchor="middle">RECOMBINING PRISM P₂</text>

                          {/* Incoming White Light: entering left face of P1 at (40, 128) */}
                          <line x1="5" y1="120" x2="40" y2="128" stroke={cWhiteRay} strokeWidth="2.5" markerEnd="url(#newtonArrowWhite)" />
                          <text x="5" y="110" fill={cWhiteRay} fontSize="7.5" fontWeight="bold">White Light Input</text>

                          {/* Inside Prism 1: a single white ray from input to exit point (118.5, 148) */}
                          <line x1="40" y1="128" x2="118.5" y2="148" stroke={cWhiteRay} strokeWidth="2.2" opacity="0.95" />

                          {/* Dispersed paths in between the two prisms, starting from Prism 1 exit face point (118.5, 148). Violet has the highest refractive index so it must bend furthest from the undeviated path (closest to the apex at 182,105); red bends least (187,117) */}
                          {/* Violet path: from (118.5, 148) to (182, 105) - bends most */}
                          <line x1="118.5" y1="148" x2="182" y2="105" stroke={cViolet} strokeWidth="1.2" />
                          {/* Yellow path: from (118.5, 148) to (184.5, 111) */}
                          <line x1="118.5" y1="148" x2="184.5" y2="111" stroke={cYellow} strokeWidth="1.2" />
                          {/* Red path: from (118.5, 148) to (187, 117) - bends least */}
                          <line x1="118.5" y1="148" x2="187" y2="117" stroke="#ef4444" strokeWidth="1.2" />

                          {/* Colors overlap fan fill from P1 exit point to P2 entrance */}
                          <polygon points="118.5,148 187,117 182,105" fill="url(#newton-spectrum)" fillOpacity="0.15" />

                          <defs>
                            <marker id="newtonArrowWhite" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cWhiteRay} /></marker>
                            <linearGradient id="newton-spectrum" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                          </defs>

                          {/* Paths inside inverted Prism 2: converging from P2's left face to a single point on right face (246, 110) */}
                          {/* Violet inside path */}
                          <line x1="182" y1="105" x2="246" y2="110" stroke={cViolet} strokeWidth="1.2" />
                          {/* Red inside path */}
                          <line x1="187" y1="117" x2="246" y2="110" stroke="#ef4444" strokeWidth="1.2" />

                          {/* Exit white light ray recombined: starting from (246, 110) */}
                          <line x1="246" y1="110" x2="285" y2="118" stroke={cWhiteRay} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#newtonArrowWhite)" />
                          <text x="285" y="103" fill={cRecombined} fontSize="8" fontWeight="black" textAnchor="end">White Light Recombined</text>
                        </svg>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* DEMONSTRATION 4: NATURAL DISPERSION - WATER DROPLET & RAINBOW FORMATION */}
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4" id="natural-rainbow-formation">
                <span className="text-[13px] text-cyan-400 uppercase font-mono font-black tracking-widest block text-center">
                  Figure: Natural Dispersion - Rainbow Formation in a Spherical Water Droplet
                </span>

                <div className="flex flex-col gap-5">
                  {/* Detailed point-by-point explanation */}
                  <div className="text-xs font-semibold leading-relaxed text-slate-350 space-y-3">
                    <h4 className="text-white font-black text-xs uppercase font-mono">Point-wise Rainbow Mechanics</h4>
                    <p>
                      A rainbow is a spectacular, curved, natural spectrum formed in the sky, demonstrating massive-scale atmospheric dispersion. Here is the step-by-step optical pathway:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-slate-300 font-sans">
                      <li>
                        <strong className="text-white font-bold">Droplets as Tiny Prisms:</strong> Water droplets suspended in the atmosphere after a rain shower act as miniature transparent spherical glass prisms.
                      </li>
                      <li>
                        <strong className="text-white font-bold">Refraction & Dispersion at Entrance:</strong> When oblique sunlight strikes the front curve of a raindrop, it transitions from rarer air to denser water. It bends (refracts) and decomposes (disperses) into its color components (VIBGYOR). Red deviates the least, and violet dominates the maximum bending path.
                      </li>
                      <li>
                        <strong className="text-white font-bold">Total Internal Reflection (TIR):</strong> The separated colors travel inside the water droplet and hit the rear internal wall of the sphere. If the angle of incidence exceeds the water-to-air critical angle (~48.6°), the boundary acts as a mirror, causing <strong className="text-yellow-300">Total Internal Reflection</strong>.
                      </li>
                      <li>
                        <strong className="text-white font-bold">Refraction upon Exit:</strong> The reflected colors travel back to the bottom-front boundary and exit the water back into air. Here, they refract a second time, magnifying their angular separation further.
                      </li>
                      <li>
                        <strong className="text-white font-bold">Angular Threshold for Human Sight:</strong> Red light exits at an angle of roughly <strong className="text-[#38bdf8]">42°</strong>, while violet light exits at <strong className="text-[#38bdf8]">40°</strong> relative to the anti-solar line. This constant layout ensures red always forms the outer arch, and violet settles at the lower inner margin. Note: A rainbow is always formed in the direction exactly <strong className="text-amber-400 font-bold">opposite to the position of the sun</strong>.
                      </li>
                    </ol>
                  </div>

                  {/* SVG Raindrop ray tracer diagram & Key Physics Constants */}
                  <div className="space-y-4">
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-850 flex justify-center items-center">
                      {(() => {
                        const cDropletRim = isLightMode ? '#64748b' : '#475569';
                        const cDropletFill = isLightMode ? '#0369a1' : '#38bdf8';
                        const cDropletRing = isLightMode ? '#0e7490' : '#22d3ee';
                        const cWhiteRay = isLightMode ? '#334155' : '#ffffff';
                        const cEntry = isLightMode ? '#047857' : '#34d399';
                        const cViolet = isLightMode ? '#6d28d9' : '#8b5cf6';
                        const cVioletLabel = isLightMode ? '#334155' : '#cbd5e1';
                        const cTIR = isLightMode ? '#a16207' : '#facc15';
                        const cExitPoint = isLightMode ? '#0369a1' : '#38bdf8';
                        const cVioletExit = isLightMode ? '#7e22ce' : '#c084fc';
                        return (
                          <svg width="100%" viewBox="0 0 290 248" className={`rounded-lg max-w-[580px] w-full h-auto transition-colors duration-300 ${isLightMode ? 'bg-white' : 'bg-[#070b12]'}`}>
                            <defs>
                              <marker id="rainbowArrowWhite" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cWhiteRay} /></marker>
                              <marker id="rainbowArrowRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill="#ef4444" /></marker>
                              <marker id="rainbowArrowViolet" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill={cViolet} /></marker>
                            </defs>
                            {/* Large Water droplet rim */}
                            <circle cx="130" cy="110" r="75" fill={cDropletFill} fillOpacity="0.04" stroke={cDropletRim} strokeWidth="1" strokeDasharray="3 2" />
                            <circle cx="130" cy="110" r="72" fill="none" stroke={cDropletRing} strokeWidth="1.5" />

                            {/* Incident white sunlight ray - arrow at the midpoint, ending exactly on the r=72 droplet boundary */}
                            <line x1="5" y1="65" x2="43.5" y2="60.7" stroke={cWhiteRay} strokeWidth="1.6" markerEnd="url(#rainbowArrowWhite)" />
                            <line x1="43.5" y1="60.7" x2="81.9" y2="56.4" stroke={cWhiteRay} strokeWidth="1.6" />
                            <text x="5" y="44" fill={cWhiteRay} fontSize="8" fontWeight="black">SUNLIGHT (White)</text>

                            {/* Point of entry refraction - exactly on the boundary */}
                            <circle cx="81.9" cy="56.4" r="2.5" fill={cEntry} />
                            <text x="75" y="34" fill={cEntry} fontSize="8" fontWeight="bold">1. Refraction & Dispersion</text>

                            {/* Dispersed red and violet lines inside droplet. Violet has the higher refractive index so it
                                bends closer to the normal (smaller angle from the radius) than red at entry - this governs
                                the arc each ray sweeps to its TIR point, which is what makes the reflection law hold exactly. */}
                            <line x1="81.9" y1="56.4" x2="198.7" y2="88.4" stroke="#ef4444" strokeWidth="1.3" />
                            <line x1="81.9" y1="56.4" x2="200.8" y2="97" stroke={cViolet} strokeWidth="1.3" />

                            {/* Text inside */}
                            <text x="95" y="50" fill="#ef4444" fontSize="7">Red Path</text>
                            <text x="95" y="108" fill={cVioletLabel} fontSize="7">Violet Path</text>

                            {/* Points of internal reflection, strictly on the boundary (not before or after it).
                                Placed so angle of incidence = angle of reflection relative to the radius (the true
                                surface normal) at each point - verified to match to within 0.01deg. */}
                            <circle cx="198.7" cy="88.4" r="2.5" fill={cTIR} />
                            <circle cx="200.8" cy="97" r="2.5" fill={cTIR} />
                            <text x="285" y="26" fill={cTIR} fontSize="7" fontWeight="bold" textAnchor="end">2. Total Internal Reflection</text>

                            {/* Reflected paths to exiting side, TIR and exit points both exactly on r=72, each sweeping
                                the same arc angle as the entry-to-TIR segment (so the reflection law is satisfied) */}
                            <line x1="198.7" y1="88.4" x2="121.2" y2="181.5" stroke="#ef4444" strokeWidth="1.3" />
                            <line x1="200.8" y1="97" x2="104.2" y2="177.2" stroke={cViolet} strokeWidth="1.3" />

                            {/* Points of exit refraction - exactly on the boundary */}
                            <circle cx="121.2" cy="181.5" r="2" fill={cExitPoint} />
                            <circle cx="104.2" cy="177.2" r="2" fill={cExitPoint} />
                            <text x="185" y="172" fill={cExitPoint} fontSize="7.5" fontWeight="bold">3. Exit Refraction</text>

                            {/* Exiting dispersed rays to observer - arrows at the midpoint, starting exactly on the
                                boundary and bending away from the local radius/normal on exit (denser to rarer medium) */}
                            <line x1="121.2" y1="181.5" x2="88.5" y2="204.6" stroke="#ef4444" strokeWidth="1.8" markerEnd="url(#rainbowArrowRed)" />
                            <line x1="88.5" y1="204.6" x2="55.8" y2="227.7" stroke="#ef4444" strokeWidth="1.8" />
                            <text x="145" y="220" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="end">Red exits at 42°</text>

                            <line x1="104.2" y1="177.2" x2="67.9" y2="194" stroke={cViolet} strokeWidth="1.8" markerEnd="url(#rainbowArrowViolet)" />
                            <line x1="67.9" y1="194" x2="31.6" y2="210.8" stroke={cViolet} strokeWidth="1.8" />
                            <text x="2" y="220" fill={cVioletExit} fontSize="7" fontWeight="bold">Violet exits at 40°</text>

                            {/* Caption moved below the diagram so it no longer overlaps any ray */}
                            <text x="145" y="240" fill={cDropletRing} opacity="0.55" fontSize="7.5" fontWeight="bold" textAnchor="middle">SPHERICAL RAINDROP: REFRACTION AND REFLECTION</text>
                          </svg>
                        );
                      })()}
                    </div>

                    {/* Quick Study Parameter Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="rainbow-properties-accent">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850/70 space-y-1">
                        <span className="text-[13px] text-[#ef4444] font-mono font-black uppercase tracking-wider block">Red Light Horizon</span>
                        <div className="text-xs font-black text-slate-100 font-mono">42° Exit Angle</div>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                          Refracts least, emerging on the outer boundary of the rainbow arch.
                        </p>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850/70 space-y-1">
                        <span className="text-[13px] text-[#a78bfa] font-mono font-black uppercase tracking-wider block">Violet Light Horizon</span>
                        <div className="text-xs font-black text-slate-100 font-mono">40° Exit Angle</div>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                          Refracts most, concentrated at the lower inner margin of the band.
                        </p>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850/70 space-y-1 sm:col-span-2">
                        <span className="text-[13px] text-cyan-400 font-mono font-black uppercase tracking-wider block">Critical Refraction Factor</span>
                        <div className="flex items-baseline gap-2">
                          <code className="text-xs font-black text-slate-100 font-mono">θ_crit = 48.6°</code>
                          <span className="text-[10px] text-slate-400 font-sans font-bold">(Water-to-Air Limitation)</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                          If ray incidence angle on the rear surface exceeds 48.6°, total internal reflection is forced.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ────── TOPIC 9: OPTICAL PHENOMENA IN NATURE ────── */}
          {activeTopic === 'light-phenomena' && (
            <div className="space-y-8 animate-fade-in text-xs md:text-sm font-medium" id="topic-light-phenomena">
              {/* Header */}
              <div className={`space-y-2 border-b pb-4 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                <h1 className={`text-2xl md:text-3xl font-black tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                  Optical Phenomena in Nature & Atmosphere
                </h1>
                <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Explore atmospheric scattering, water droplet dispersion, total internal reflection, and continuous refraction.
                </p>
              </div>

              {/* Phenomenon 1: Scattering of Light & Rayleigh's Law */}
              <div className={`border rounded-3xl p-6 space-y-6 transition-all duration-300 shadow-sm ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`} id="phenomenon-scattering">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-500 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                  Phenomenon 1: Scattering of Light & Rayleigh's Law
                </span>

                {/* Top Row: Balanced side-by-side introduction cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className={`p-5 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-150' : 'bg-slate-950 border-slate-850'}`}>
                    <div className="space-y-3">
                      <span className="text-base font-black uppercase text-cyan-500 font-mono tracking-widest block">Scientific Definition</span>
                      <p className={`leading-relaxed text-xs md:text-sm ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                        <b>Scattering of Light:</b> The deflection or redirection of light rays in multiple random directions upon striking tiny atmospheric particles (like Nitrogen & Oxygen molecules) smaller than the light's wavelength. When light waves hit these gas molecules, they excite the molecule's electrons, inducing an oscillating electric dipole. This dipole then re-radiates electromagnetic energy in all directions, causing the light to scatter out of its original path.
                      </p>
                      <p className={`leading-relaxed text-[11px] ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        <b>Rayleigh vs. Mie Scattering:</b> Rayleigh scattering occurs when particle size is much smaller than the wavelength of light (e.g., N₂ and O₂ molecules). Mie scattering happens when particles are comparable to or larger than the wavelength (e.g., dust, water droplets), scattering all colors equally, which is why clouds appear white.
                      </p>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-4 ${isLightMode ? 'bg-slate-50 border-slate-150' : 'bg-slate-950 border-slate-850'}`}>
                    <div className="space-y-3">
                      <span className="text-xs text-amber-500 font-mono font-black tracking-wider block">Rayleigh Scattering Law:</span>
                      <p className={`text-xs md:text-sm ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        For scatterers smaller than light's wavelength, scattering intensity <code className="text-yellow-500 font-mono font-bold">I</code> is inversely proportional to the 4th power of wavelength. This mathematical relation explains why high-frequency blue/violet light is scattered dramatically more than low-frequency red light:
                      </p>
                      <code className={`text-base font-mono block text-center font-black p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-150 text-yellow-600' : 'bg-slate-950 border-slate-850 text-yellow-400'}`}>
                        I ∝ 1 / λ⁴
                      </code>
                    </div>

                    {/* Interactive controls */}
                    <div className="space-y-2">
                      <span className="text-xs text-cyan-500 font-mono font-black tracking-wider block">Interactive Simulator Mode:</span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setScatteringWavelength('all')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                            scatteringWavelength === 'all'
                              ? 'bg-cyan-500 text-white shadow'
                              : isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
                          }`}
                        >
                          Show All
                        </button>
                        <button
                          onClick={() => setScatteringWavelength('blue')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                            scatteringWavelength === 'blue'
                              ? 'bg-blue-500 text-white shadow'
                              : isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
                          }`}
                        >
                          Midday Sky
                        </button>
                        <button
                          onClick={() => setScatteringWavelength('red')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                            scatteringWavelength === 'red'
                              ? 'bg-red-500 text-white shadow'
                              : isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
                          }`}
                        >
                          Sunset Line
                        </button>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        <b className={isLightMode ? 'text-slate-800' : 'text-slate-200'}>Show All</b> displays the full noon spectrum, <b className={isLightMode ? 'text-slate-800' : 'text-slate-200'}>Midday Sky</b> highlights the intensely scattered blue light that colours the daytime sky, and <b className={isLightMode ? 'text-slate-800' : 'text-slate-200'}>Sunset Line</b> shows why mostly red light survives the longer atmospheric path at a low sun angle.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Model: Rayleigh Scattering Law (Full width, matches outer box breadth) */}
                <div className="flex flex-col space-y-2">
                  <span className={`text-[11px] uppercase font-mono font-black tracking-widest block text-center ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Rayleigh Scattering Law
                  </span>
                  <div id="rayleigh-scatter-box" className="rounded-2xl p-4 border flex flex-col items-center justify-center bg-[#030712] border-slate-800">
                    <svg width="100%" height="280" viewBox="0 0 800 240" className="w-full h-auto">
                        <defs>
                          <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#facc15" stopOpacity="1" />
                            <stop offset="30%" stopColor="#eab308" stopOpacity="0.8" />
                            <stop offset="70%" stopColor="#eab308" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="molecule-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                            <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                          </radialGradient>
                          <filter id="glow-red-filter" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                          <marker id="scatterArrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill="#38bdf8" /></marker>
                          <marker id="scatterArrowRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill="#ef4444" /></marker>
                          <marker id="scatterArrowWhite" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill="#ffffff" /></marker>
                        </defs>

                        {/* Background grids */}
                        <g opacity="0.1">
                          <line x1="0" y1="120" x2="800" y2="120" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="5 5" />
                          <line x1="400" y1="0" x2="400" y2="240" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="5 5" />
                        </g>

                        {/* The Sun */}
                        {scatteringWavelength !== 'red' ? (
                          <g>
                            <circle cx="80" cy="120" r="35" fill="url(#sun-glow)" />
                            <circle cx="80" cy="120" r="14" fill="#fbbf24" />
                            <text x="80" y="175" fill="#fbbf24" fontSize="14" fontWeight="bold" textAnchor="middle">White Sunlight</text>
                            <text x="80" y="192" fill="#cbd5e1" fontSize="12" textAnchor="middle">(All Wavelengths)</text>
                          </g>
                        ) : (
                          <g>
                            <circle cx="80" cy="120" r="35" fill="url(#sun-glow)" opacity="0.2" />
                            <circle cx="80" cy="120" r="14" fill="#ea580c" />
                            <text x="80" y="175" fill="#f97316" fontSize="14" fontWeight="bold" textAnchor="middle">Sunset Sun</text>
                            <text x="80" y="192" fill="#cbd5e1" fontSize="12" textAnchor="middle">(Low angle at horizon)</text>
                          </g>
                        )}

                        {/* Incident Beam */}
                        <g opacity={scatteringWavelength === 'red' ? 0.3 : 1}>
                          <line x1="120" y1="115" x2="350" y2="115" stroke="#94a3b8" strokeWidth="1.5" />
                          <line x1="120" y1="120" x2="250" y2="120" stroke="#f1f5f9" strokeWidth="2.5" markerEnd="url(#scatterArrowWhite)" />
                          <line x1="250" y1="120" x2="350" y2="120" stroke="#f1f5f9" strokeWidth="2.5" />
                          <line x1="120" y1="125" x2="350" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
                        </g>
                        <g opacity={scatteringWavelength === 'red' ? 0.7 : 1}>
                          <text x="235" y="90" fill="#cbd5e1" fontSize="14" fontWeight="bold" textAnchor="middle">Incident Ray Beam</text>
                          <text x="235" y="107" fill="#cbd5e1" fontSize="12" textAnchor="middle">λ_average = 550nm</text>
                        </g>
                        {scatteringWavelength === 'red' && (
                          <g>
                            <line x1="120" y1="120" x2="350" y2="120" stroke="#f97316" strokeWidth="2.2" strokeDasharray="4 3" />
                            <text x="235" y="155" fill="#f97316" fontSize="13" fontWeight="bold" textAnchor="middle">Blue light scattered out earlier</text>
                          </g>
                        )}

                        {/* Gas Molecule */}
                        <circle cx="400" cy="120" r="45" fill="url(#molecule-glow)" />
                        <circle cx="400" cy="120" r="14" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx="400" cy="120" r="5" fill="#22d3ee" />
                        <text x="400" y="32" fill="#22d3ee" fontSize="14" fontWeight="extrabold" textAnchor="middle">Gas Molecule (O₂ or N₂)</text>
                        <text x="400" y="215" fill="#67e8f9" fontSize="12" fontStyle="italic" textAnchor="middle">Diameter d &lt;&lt; λ</text>

                        {/* Scattered Blue Rays */}
                        <g opacity={scatteringWavelength === 'red' ? 0.15 : scatteringWavelength === 'blue' ? 1.0 : 0.8}>
                          <line x1="400" y1="120" x2="330" y2="50" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#scatterArrowBlue)" />
                          <line x1="400" y1="120" x2="400" y2="35" stroke="#38bdf8" strokeWidth="2.2" markerEnd="url(#scatterArrowBlue)" />
                          <line x1="400" y1="120" x2="470" y2="50" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#scatterArrowBlue)" />
                          <line x1="400" y1="120" x2="330" y2="190" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#scatterArrowBlue)" />
                          <line x1="400" y1="120" x2="400" y2="205" stroke="#38bdf8" strokeWidth="2.2" markerEnd="url(#scatterArrowBlue)" />
                          <line x1="400" y1="120" x2="470" y2="190" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#scatterArrowBlue)" />
                        </g>
                        <g opacity={scatteringWavelength === 'red' ? 0.65 : scatteringWavelength === 'blue' ? 1.0 : 0.95}>
                          <text x="495" y="65" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="start">Scattered Blue Light</text>
                          <text x="495" y="82" fill="#cbd5e1" fontSize="12" textAnchor="start">Short λ blue/violet waves</text>
                          <text x="495" y="98" fill="#cbd5e1" fontSize="12" textAnchor="start">re-radiated in all directions</text>
                        </g>

                        {/* Transmitted Red Ray */}
                        <g opacity={scatteringWavelength === 'blue' ? 0.2 : 1}>
                          <line x1="405" y1="120" x2="680" y2="120" stroke="#ef4444" strokeWidth={scatteringWavelength === 'red' ? 4 : 2.5} filter={scatteringWavelength === 'red' ? "url(#glow-red-filter)" : undefined} markerEnd="url(#scatterArrowRed)" />
                        </g>
                        <g opacity={scatteringWavelength === 'blue' ? 0.7 : 1}>
                          <text x="560" y="155" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">Transmitted Red Light</text>
                          <text x="560" y="172" fill="#cbd5e1" fontSize="12" textAnchor="middle">Longer λ waves pass straight through</text>
                        </g>

                        {/* Observer */}
                        <g transform="translate(710, 100)">
                          <path d="M 0,20 Q 20,5 40,20 Q 20,35 0,20 Z" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                          <circle cx="20" cy="20" r="7" fill="#0284c7" />
                          <circle cx="20" cy="20" r="3" fill="#000000" />
                          <circle cx="22" cy="18" r="1" fill="#ffffff" />
                          <text x="20" y="52" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">
                            {scatteringWavelength === 'red' ? 'Sunset Eye' : scatteringWavelength === 'blue' ? 'Daytime Eye' : 'Observer'}
                          </text>
                        </g>
                      </svg>
                    <p className="text-[11px] leading-relaxed text-center mt-3 text-slate-300">
                      This simulator visualizes Rayleigh's Law in action: sunlight strikes a gas molecule, and the shorter blue wavelengths scatter intensely in every direction while the longer red wavelengths pass through largely undeflected. Use the <b className="text-cyan-400">Show All</b>, <b className="text-blue-400">Midday Sky</b>, and <b className="text-red-400">Sunset Line</b> buttons above to see how the dominant transmitted colour shifts as the sun's angle in the sky changes.
                    </p>
                  </div>
                </div>

                {/* Curriculum Phenomena Deep Dive (Below the model, full width) */}
                <div className={`p-5 rounded-2xl border space-y-4 text-xs ${isLightMode ? 'bg-slate-50 border-slate-150' : 'bg-slate-950 border-slate-850'}`}>
                  <span className="font-extrabold uppercase text-[10px] tracking-wider block text-amber-500">Curriculum Phenomena Deep Dive:</span>

                  <div className="space-y-1">
                        <h4 className={`font-black text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>1. Why is the Sky Blue and not Violet?</h4>
                        <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                          According to Rayleigh's law, violet light scatters even more intensely than blue. However, the sky appears blue because sunlight naturally contains significantly more blue light than violet at the top of the atmosphere, and human eyes have cone receptors that are far more sensitive to blue than violet.
                        </p>
                      </div>

                      <div className={`space-y-1 border-t pt-2.5 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                        <h4 className={`font-black text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>2. Why Danger Signals are Red</h4>
                        <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                          Red has the longest wavelength in the visible spectrum. Since scattering is inversely proportional to λ⁴, red scatters the least by atmospheric dust, smoke, and fog. This allows red light rays to travel extreme distances without losing intensity, remaining highly visible in fog or storm.
                        </p>
                      </div>

                      <div className={`space-y-1 border-t pt-2.5 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                        <h4 className={`font-black text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>3. Pitch Black Sky of Outer Space</h4>
                        <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                          In outer space, there is a vacuum with no atmosphere or gas molecules to scatter passing sunlight. Thus, light travels in straight, uninterrupted paths, and the sky surrounding the shining Sun appears completely black.
                        </p>
                      </div>

                      <div className={`space-y-1 border-t pt-2.5 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                        <h4 className={`font-black text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>4. Why Sunrise & Sunset Skies Turn Orange-Red</h4>
                        <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                          At sunrise and sunset, sunlight has to travel through a much longer, denser stretch of atmosphere to reach an observer. Nearly all the short-wavelength blue and violet components get scattered away well before reaching the eye, leaving mostly the long-wavelength orange and red light to arrive directly, painting the sky in these warm hues.
                        </p>
                      </div>
                    </div>
              </div>

              {/* Phenomenon 2: Natural Rainbow Dispersion */}
              <div className={`border rounded-3xl p-6 space-y-6 transition-all duration-300 shadow-sm ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`} id="phenomenon-rainbow">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-500 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                  Phenomenon 2: Rainbow Dispersion & Total Internal Reflection
                </span>

                {/* Top Row: Balanced side-by-side intro cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  <div className={`p-5 rounded-2xl border flex flex-col justify-between ${isLightMode ? 'bg-slate-50 border-slate-150' : 'bg-slate-950 border-slate-850'}`}>
                    <div className="space-y-3">
                      <span className="text-base font-black uppercase text-cyan-500 font-mono tracking-widest block">Scientific Definition</span>
                      <p className={`leading-relaxed text-xs md:text-sm ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                        <b>The Rainbow:</b> A meteorological spectrum formed by spherical suspended water droplets acting as tiny dispersing prisms, involving an exact sequence of <b className="text-amber-500">refraction, dispersion, internal reflection, and final refraction</b>.
                      </p>
                      <div className={`space-y-2 border-t pt-2.5 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                        <span className="text-xs text-amber-500 font-mono font-black tracking-wider block">Three Core Steps inside Droplet:</span>
                        <ol className={`list-decimal pl-5 space-y-1.5 font-semibold text-xs ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                          <li><b className={isLightMode ? 'text-slate-800' : 'text-slate-200'}>Refraction & Dispersion:</b> Sunlight hits upper edge of droplet; bends and splits into red and violet colors.</li>
                          <li><b className={isLightMode ? 'text-slate-800' : 'text-slate-200'}>Total Internal Reflection (TIR):</b> Split beams hit back surface of droplet at angles exceeding the water critical limit (~48°).</li>
                          <li><b className={isLightMode ? 'text-slate-800' : 'text-slate-200'}>Refraction on Exit:</b> Beams refract back out into air from lower surface, fanning out towards ground.</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${isLightMode ? 'bg-slate-50 border-slate-150' : 'bg-slate-950 border-slate-850'}`}>
                    <div className="space-y-3">
                      <span className="text-xs text-cyan-500 font-mono font-black tracking-wider block">Interactive Wavelength Path:</span>
                      <p className={`text-xs md:text-sm ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        Adjust the ray tracer to track individual color components or view the full white sunlight composite path through the water droplet:
                      </p>
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <button
                          onClick={() => setRainbowActiveRay('all')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                            rainbowActiveRay === 'all'
                              ? 'bg-cyan-500 text-white shadow'
                              : isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
                          }`}
                        >
                          Full Spectrum
                        </button>
                        <button
                          onClick={() => setRainbowActiveRay('red')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                            rainbowActiveRay === 'red'
                              ? 'bg-red-500 text-white shadow'
                              : isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
                          }`}
                        >
                          Red Ray (42°)
                        </button>
                        <button
                          onClick={() => setRainbowActiveRay('violet')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                            rainbowActiveRay === 'violet'
                              ? 'bg-purple-500 text-white shadow'
                              : isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
                          }`}
                        >
                          Violet Ray (40°)
                        </button>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border text-xs ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                      <h4 className={`font-black text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>Water-to-Air Refraction Constant:</h4>
                      <p className={`text-[11px] leading-relaxed mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        Because light travels from a dense medium (water, index n ≈ 1.33) to a rare medium (air, index n ≈ 1.00), the critical angle of reflection is 48.6°. Sunlight incident on the rear wall of the raindrop always exceeds this angle, forcing total internal reflection back through the drop.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Top Row: Primary vs. Secondary Rainbows (placed ABOVE the ray diagram) */}
                <div className={`p-5 rounded-2xl border space-y-2 text-xs ${isLightMode ? 'bg-slate-50 border-slate-150' : 'bg-slate-950 border-slate-850'}`}>
                  <span className="font-extrabold uppercase text-[10px] tracking-wider block text-cyan-500">Rainbow Physics: Primary vs. Secondary Rainbows</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className={`font-black text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>Primary Rainbow (One Reflection)</h4>
                      <p className={`text-[11px] leading-relaxed mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        Formed by <i>one</i> internal reflection inside the droplet. Brightest arc, with red on the outside (exiting at an angle of 42° to the incoming sunlight) and violet on the inside (exiting at 40°).
                      </p>
                    </div>
                    <div>
                      <h4 className={`font-black text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>Secondary Rainbow (Two Reflections)</h4>
                      <p className={`text-[11px] leading-relaxed mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        Formed by <i>two</i> internal reflections inside the droplet. Fainter arc with completely reversed colors: red is on the inside (50°) and violet is on the outside (53°).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ray Diagram: Full width (increased width, reduced height, crisp enlarged water droplet) */}
                <div className="flex flex-col space-y-2">
                  <span className={`text-[11px] uppercase font-mono font-black tracking-widest block text-center ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Ray Diagram: Dispersion Mechanism in Droplet
                  </span>
                  <div className={`rounded-2xl p-4 border flex flex-col items-center justify-center ${isLightMode ? 'bg-[#0a0f1d] border-slate-800' : 'bg-[#030712] border-slate-850'}`}>
                    <svg width="100%" height="300" viewBox="0 0 800 280" className="w-full h-auto">
                      <defs>
                        <radialGradient id="drop-grad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                          <stop offset="85%" stopColor="#0ea5e9" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
                        </radialGradient>
                        <filter id="drop-glow-filter" x="-40%" y="-40%" width="180%" height="180%">
                          <feGaussianBlur stdDeviation="6" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <marker id="dropletArrowWhite" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0,0 L 10,5 L 0,10 Z" fill="#ffffff" /></marker>
                      </defs>

                      {/* Raindrop core circle - Enlarged, crisp and high-contrast */}
                      <circle cx="400" cy="140" r="95" fill="url(#drop-grad)" stroke="#38bdf8" strokeWidth="3" filter="url(#drop-glow-filter)" />
                      <circle cx="400" cy="140" r="92" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="10 5" opacity="0.7" />
                      <text x="510" y="65" fill="#38bdf8" fontSize="14" fontWeight="black" textAnchor="start">Water Droplet (n ≈ 1.33)</text>

                      {/* White Sunlight Incoming */}
                      <g>
                        <line x1="120" y1="50" x2="322" y2="86" stroke="#ffffff" strokeWidth="3" markerEnd="url(#dropletArrowWhite)" />
                        <text x="120" y="42" fill="#ffffff" fontSize="14" fontWeight="bold">Sunlight (White Beam)</text>
                      </g>

                      {/* ① Refraction & Dispersion label - Shifted left to prevent overlap */}
                      <g>
                        <text x="195" y="115" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">① Refraction & Dispersion</text>
                        <text x="195" y="132" fill="#cbd5e1" fontSize="12" fontWeight="600" textAnchor="middle">Bending splits colors at entry</text>
                      </g>

                      {/* Red path interior & exit */}
                      <g opacity={rainbowActiveRay === 'violet' ? 0.15 : 1}>
                        <line x1="322" y1="86" x2="492" y2="125" stroke="#ef4444" strokeWidth={rainbowActiveRay === 'red' ? 3.5 : 2} />
                        <line x1="492" y1="125" x2="355" y2="215" stroke="#ef4444" strokeWidth={rainbowActiveRay === 'red' ? 3.5 : 2} />
                        {/* Extend line exactly to target the observer eye */}
                        <line x1="355" y1="215" x2="115" y2="238" stroke="#ef4444" strokeWidth={rainbowActiveRay === 'red' ? 4 : 2.5} />
                        <text x="210" y="200" fill="#ef4444" fontSize="13" fontWeight="extrabold" textAnchor="end">Red exits at 42°</text>
                      </g>

                      {/* Violet path interior & exit */}
                      <g opacity={rainbowActiveRay === 'red' ? 0.15 : 1}>
                        <line x1="322" y1="86" x2="475" y2="180" stroke="#a78bfa" strokeWidth={rainbowActiveRay === 'violet' ? 3.5 : 2} />
                        <line x1="475" y1="180" x2="365" y2="228" stroke="#a78bfa" strokeWidth={rainbowActiveRay === 'violet' ? 3.5 : 2} />
                        {/* Extend line exactly to target the observer eye */}
                        <line x1="365" y1="228" x2="115" y2="242" stroke="#a78bfa" strokeWidth={rainbowActiveRay === 'violet' ? 4 : 2.5} />
                        <text x="235" y="262" fill="#c084fc" fontSize="13" fontWeight="extrabold" textAnchor="end">Violet exits at 40°</text>
                      </g>

                      {/* ② Total Internal Reflection label */}
                      <g>
                        <text x="550" y="150" fill="#fbbf24" fontSize="14" fontWeight="bold" textAnchor="start">② Total Internal Reflection</text>
                        <text x="550" y="167" fill="#cbd5e1" fontSize="12" fontWeight="600" textAnchor="start">Angle exceeds limit (~48.6°)</text>
                      </g>

                      {/* ③ Refraction on Exit label */}
                      <g>
                        <text x="460" y="225" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="start">③ Refraction on Exit</text>
                        <text x="460" y="242" fill="#cbd5e1" fontSize="12" fontWeight="600" textAnchor="start">Further angular dispersion</text>
                      </g>

                      {/* Observer Eye Graphics replacing pure text */}
                      <g transform="translate(80, 230)">
                        <path d="M 0,10 Q 15,0 30,10 Q 15,20 0,10 Z" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                        <circle cx="15" cy="10" r="5" fill="#0284c7" />
                        <circle cx="15" cy="10" r="2.2" fill="#000000" />
                        <circle cx="16" cy="9" r="0.8" fill="#ffffff" />
                        <text x="15" y="-6" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">Observer Eye</text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Required Observation Conditions (placed BELOW the ray diagram) */}
                <div className={`p-5 rounded-2xl border space-y-2 text-xs ${isLightMode ? 'bg-slate-50 border-slate-150' : 'bg-slate-950 border-slate-850'}`}>
                  <span className="font-extrabold uppercase text-[10px] tracking-wider block text-cyan-500">Observation Requirements</span>
                  <h4 className={`font-black text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>Required Observation Conditions:</h4>
                  <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    To view a rainbow, the observer must stand directly between the Sun and the raindrops. The Sun must be behind you, and the rain must be ahead of you, so that the backscattered dispersed light enters your eyes at the matching angles.
                  </p>
                                  {/* Subsection A: Twinkling of Stars */}
                  <div className={`border p-6 rounded-2xl space-y-4 ${isLightMode ? 'bg-slate-50 border-slate-150' : 'bg-slate-950 border-slate-850'}`}>
                    {/* Explanatory text card (Top) */}
                    <div className="space-y-2">
                      <span className="text-sm font-black uppercase text-amber-500 font-mono tracking-wider block">A. Twinkling of Stars Explained</span>
                      <p className={`leading-relaxed text-xs md:text-sm ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                        <b>Twinkling (Scintillation):</b> Because stars are point light sources at extreme distance, their rays travel through turbulent atmospheric layers of varying temperature and air density. This dynamic shifting continuously alters the ray refraction angles, causing the apparent brightness and position to fluctuate rapidly—making them twinkle.
                      </p>
                    </div>

                    {/* Visual Model: Dynamic Star Refraction Bending (Middle, Full Width) */}
                    <div className="space-y-2">
                      <span className={`text-[11px] uppercase font-mono font-black tracking-widest block text-center ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        Visual Model: Dynamic Star Refraction Bending
                      </span>
                      <div className="bg-[#030712] rounded-xl p-3 border border-slate-800">
                        <svg width="100%" height="240" viewBox="0 0 800 240" className="w-full h-auto">
                          <defs>
                            <linearGradient id="sky-layers" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#020617" />
                              <stop offset="100%" stopColor="#0f172a" />
                            </linearGradient>
                            <filter id="star-glow-filter" x="-30%" y="-30%" width="160%" height="160%">
                              <feGaussianBlur stdDeviation="3.5" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>

                          <rect width="800" height="240" fill="url(#sky-layers)" />

                          {/* Atmospheric Layers */}
                          <g opacity="0.2">
                            <line x1="40" y1="50" x2="760" y2="50" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="40" y1="90" x2="760" y2="90" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="40" y1="130" x2="760" y2="130" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="40" y1="170" x2="760" y2="170" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                          </g>

                          {/* Left density guide */}
                          <g transform="translate(60, 30)">
                            <line x1="0" y1="10" x2="0" y2="170" stroke="#06b6d4" strokeWidth="2.5" />
                            <polygon points="0,170 -4,163 4,163" fill="#06b6d4" />
                            <text x="12" y="20" fill="#94a3b8" fontSize="13" fontWeight="bold">Rarer Air</text>
                            <text x="12" y="165" fill="#22d3ee" fontSize="13" fontWeight="bold">Denser Air</text>
                            <text x="-12" y="95" fill="#06b6d4" fontSize="12" fontWeight="black" textAnchor="middle" transform="rotate(-90, -12, 95)">n INCREASES DOWNWARD</text>
                          </g>

                          {/* Observer */}
                          <g transform="translate(200, 190)">
                            <circle cx="0" cy="0" r="6" fill="#ffffff" />
                            <line x1="0" y1="6" x2="0" y2="20" stroke="#ffffff" strokeWidth="2" />
                            <line x1="-4" y1="28" x2="0" y2="20" stroke="#ffffff" strokeWidth="1.8" />
                            <line x1="4" y1="28" x2="0" y2="20" stroke="#ffffff" strokeWidth="1.8" />
                            <text x="15" y="4" fill="#e2e8f0" fontSize="13" fontWeight="bold">Observer</text>
                          </g>
                          <line x1="120" y1="225" x2="760" y2="225" stroke="#475569" strokeWidth="2" />

                          {/* Stars */}
                          <g transform="translate(700, 80)">
                            <path d="M 0,-7 L 2,-2 L 7,0 L 2,2 L 0,7 L -2,2 L -7,0 L -2,-2 Z" fill="#94a3b8" />
                            <text x="15" y="4" fill="#94a3b8" fontSize="13" fontWeight="bold">Actual Star Position</text>
                          </g>
                          <g transform="translate(700, 30)">
                            <path d="M 0,-10 L 3,-3 L 10,0 L 3,3 L 0,10 L -3,3 L -10,0 L -3,-3 Z" fill="#fbbf24" filter="url(#star-glow-filter)" />
                            <text x="18" y="3" fill="#fbbf24" fontSize="13" fontWeight="extrabold">Apparent Star Position</text>
                          </g>

                          {/* Rays */}
                          <path d="M 700,80 Q 450,110 200,190" fill="none" stroke="#f97316" strokeWidth="3.5" />
                          <text x="460" y="155" fill="#f97316" fontSize="13" fontWeight="bold" textAnchor="middle">Ray curves due to refraction</text>

                          <line x1="200" y1="190" x2="700" y2="30" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" />
                          <text x="460" y="88" fill="#fbbf24" fontSize="12" textAnchor="middle" transform="rotate(-18, 460, 88)">Straight projection line of sight</text>
                        </svg>
                      </div>
                    </div>

                    {/* Why Planets Do Not Twinkle explanation (Bottom) */}
                    <div className={`p-4 rounded-xl border space-y-2 text-xs ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                      <h4 className={`font-black text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>Why Planets Do Not Twinkle:</h4>
                      <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        Unlike stars, planets are much closer to Earth. Instead of behaving as point sources of light, they act as extended sources (disks of light made of many individual point sources). The average variation in brightness and position from all these points cancels out, producing a steady, non-twinkling glow.
                      </p>
                    </div>
                  </div>

                  {/* Subsection B: Early Sunrise & Delayed Sunset */}
                  <div className={`border p-6 rounded-2xl space-y-4 ${isLightMode ? 'bg-slate-50 border-slate-150' : 'bg-slate-950 border-slate-850'}`}>
                    {/* Explanatory text card (Top) */}
                    <div className="space-y-2">
                      <span className="text-sm font-black uppercase text-amber-500 font-mono tracking-wider block">B. Early Sunrise & Delayed Sunset</span>
                      <p className={`leading-relaxed text-xs md:text-sm ${isLightMode ? 'text-slate-700' : 'text-slate-350'}`}>
                        When the Sun is below the horizon line, its light enters Earth's atmosphere at a flat angle. Refractive bending curves these rays downwards over the Earth's curved horizon to the observer. The observer sees the apparent Sun hovering above the horizon line, making the sun visible <b className="text-emerald-500">2 minutes before</b> true astronomical sunrise and <b className="text-emerald-500">2 minutes after</b> sunset.
                      </p>
                    </div>

                    {/* Visual Model: Atmospheric Horizon Curvature (Middle, Full Width) */}
                    <div className="space-y-2">
                      <span className={`text-[11px] uppercase font-mono font-black tracking-widest block text-center ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        Visual Model: Atmospheric Horizon Curvature
                      </span>
                      <div className="bg-[#030712] rounded-xl p-3 border border-slate-800 flex-grow flex flex-col items-center justify-center">
                        <svg width="100%" height="180" viewBox="0 0 800 180" className="w-full h-auto">
                          <defs>
                            <radialGradient id="earth-shading" cx="50%" cy="30%" r="70%">
                              <stop offset="0%" stopColor="#1e293b" />
                              <stop offset="100%" stopColor="#0f172a" />
                            </radialGradient>
                          </defs>

                          {/* Earth */}
                          <circle cx="200" cy="360" r="240" fill="url(#earth-shading)" stroke="#475569" strokeWidth="2.5" />
                          <text x="200" y="165" fill="#64748b" opacity="0.3" fontSize="22" fontWeight="black" textAnchor="middle" letterSpacing="4">EARTH</text>

                          {/* Atmosphere */}
                          <path d="M 20,170 A 270,270 0 0,1 500,170" fill="none" stroke="#22d3ee" strokeWidth="20" strokeOpacity="0.08" />
                          <path d="M 20,170 A 270,270 0 0,1 500,170" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
                          <text x="320" y="65" fill="#06b6d4" fontSize="13" fontWeight="bold">Atmosphere blanket</text>

                          {/* Observer */}
                          <g transform="translate(200, 120)">
                            <line x1="0" y1="0" x2="0" y2="-12" stroke="#ffffff" strokeWidth="2" />
                            <circle cx="0" cy="-15" r="3" fill="#ffffff" />
                          </g>

                          {/* Horizon line */}
                          <line x1="200" y1="120" x2="760" y2="120" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
                          <text x="750" y="112" fill="#ef4444" fontSize="13.5" fontWeight="extrabold" textAnchor="end">Horizon line</text>

                          {/* Suns */}
                          <g transform="translate(680, 145)">
                            <circle cx="0" cy="0" r="10" fill="#ea580c" />
                            <text x="15" y="-2" fill="#fca5a5" fontSize="13" fontWeight="bold">Actual Sun</text>
                            <text x="15" y="10" fill="#94a3b8" fontSize="11">(Below Horizon)</text>
                          </g>
                          <g transform="translate(680, 75)">
                            <circle cx="0" cy="0" r="10" fill="#facc15" stroke="#eab308" strokeWidth="1.5" />
                            <text x="15" y="-2" fill="#fbbf24" fontSize="13" fontWeight="extrabold">Apparent Sun</text>
                            <text x="15" y="10" fill="#eab308" fontSize="11" fontWeight="semibold">(Seen elevated)</text>
                          </g>

                          {/* Rays */}
                          <path d="M 680,145 Q 440,110 200,120" fill="none" stroke="#f97316" strokeWidth="3" />
                          <text x="440" y="152" fill="#f97316" fontSize="12.5" fontWeight="bold" textAnchor="middle">Ray curves over Earth's shoulder</text>

                          <line x1="200" y1="120" x2="680" y2="75" stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="3 3" />
                          <text x="440" y="88" fill="#fbbf24" fontSize="12.5" textAnchor="middle" transform="rotate(-5, 440, 88)">Straight Line of Sight</text>
                        </svg>
                      </div>
                    </div>

                    {/* Apparent Flattening of the Sun explanation (Bottom) */}
                    <div className={`p-4 rounded-xl border space-y-2 text-xs flex-grow flex flex-col justify-center ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                      <h4 className={`font-black text-xs ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>Apparent Flattening of the Sun:</h4>
                      <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        At sunrise or sunset, the Sun appears oval or flattened rather than a perfect circle. This occurs because the bottom edge of the Sun is closer to the horizon and its light travels through thicker atmospheric layers, causing it to refract (bend upwards) more than the light from the top edge. This uneven vertical bending compresses the Sun's shape.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ────── TOPIC 10: LENSES & RAY RULES ────── */}
          {activeTopic === 'lenses' && (
            <div className="space-y-6 animate-fade-in" id="topic-lenses">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Spherical Lenses & Ray Rules
                </h1>
                <p className="text-slate-400 text-xs font-semibold">
                  Light transmission pathways traversing refracting glass curved lenses.
                </p>
              </div>

              {/* DEFINITIONS FIRST */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                </div>
                <div className="space-y-2 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>
                    <b className="text-white">1. Lens:</b> A piece of transparent material (like glass or plastic) with curved sides. It bends passing light rays to make things look larger, smaller, closer, or clearer!
                  </p>
                  <p>
                    <b className="text-white">2. Convex Lens (Converging):</b> A lens that is thicker in the middle than at the edges (like a magnifying glass). It bends incoming parallel light rays inward so they all meet at a single point.
                  </p>
                  <p>
                    <b className="text-white">3. Concave Lens (Diverging):</b> A lens that is thinner in the middle and thicker at the edges (it curves inward!). It bends light rays outward, making them spread apart.
                  </p>
                  <p>
                    <b className="text-white">4. Optical Centre (O):</b> The exact central point of a lens. Any light ray that goes directly through this center point passes straight through without bending at all!
                  </p>
                </div>
              </div>

              {/* QUANTITY UNITS BOX */}
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & Units</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Lens Focal Length (f)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters (m) [SI] / centimeters (cm)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Object Height (h)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">meters (m) [SI] / centimeters (cm)</span>
                  </div>
                </div>
              </div>

              {/* Comparison grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold leading-relaxed font-sans">
                <div className="space-y-2 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    Refraction Rules (Convex Lens)
                  </h4>
                  <ul className="list-disc pl-4 text-slate-400 space-y-1.5 text-[11px] leading-relaxed">
                    <li>Rays parallel to principal axis refract and converge on the right-hand focus F₂.</li>
                    <li>Rays passing through principal focus F₁ refract and emerge parallel on the right.</li>
                    <li>Rays exiting straight through Optical Centre O suffer absolute zero deviation.</li>
                  </ul>
                  <button
                    onClick={() => onLoadSimulator({ group: 'lens', type: 'convex-lens', objectDist: 180, focalLength: 80, objectHeight: 80, objectType: 'arrow' })}
                    className="mt-3 text-cyan-400 hover:text-cyan-300 text-[10px] font-black uppercase tracking-wider block cursor-pointer"
                  >
                    Open Convex Lens Simulator →
                  </button>
                </div>

                <div className="space-y-2 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                    Refraction Rules (Concave Lens)
                  </h4>
                  <ul className="list-disc pl-4 text-slate-400 space-y-1.5 text-[11px] leading-relaxed">
                    <li>Rays parallel to principal axis refract, scattering away, appearing to diverge from left focus F₁.</li>
                    <li>Rays directed towards F₂ reflect/refract, emerging parallel to the principal axis.</li>
                    <li>Rays passing through Optical Centre O traverse without any deviation.</li>
                  </ul>
                  <button
                    onClick={() => onLoadSimulator({ group: 'lens', type: 'concave-lens', objectDist: 150, focalLength: 80, objectHeight: 80, objectType: 'arrow' })}
                    className="mt-3 text-cyan-400 hover:text-cyan-300 text-[10px] font-black uppercase tracking-wider block cursor-pointer"
                  >
                    Open Concave Lens Simulator →
                  </button>
                </div>
              </div>

              {/* IMAGE FORMATION IN SPHERICAL LENSES WIDGET */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5" id="lens-image-formation-section">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-100 uppercase tracking-tight text-[#22d3ee]">
                    Image Formation in Spherical Lenses
                  </h4>
                  <p className="text-slate-400 text-xs font-semibold">
                    Explore systematically how light beams refract to form images depending on the object's position relative to the focal points (F₁ and 2F₁). These exact cases are critical for school exams!
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">
                      Select Object Position:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 font-sans font-semibold">
                      {LENS_CASES.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setNotesLensCaseInd(idx)}
                          className={`p-2.5 w-full text-left rounded-xl border text-[11px] font-bold transition-all duration-150 cursor-pointer ${
                            notesLensCaseInd === idx
                              ? (isLightMode ? 'bg-cyan-50 border-cyan-500/50 text-cyan-700 shadow' : 'bg-[#121c2e] border-cyan-500/50 text-cyan-300 shadow')
                              : (isLightMode ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100' : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60')
                          }`}
                        >
                          <div className="flex justify-between items-center gap-2 font-sans">
                            <span className="truncate">{c.label}</span>
                            <span className="shrink-0 text-[10px] font-mono font-normal opacity-70 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">{c.type === 'convex-lens' ? 'Convex' : 'Concave'}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 font-sans">
                    {/* SVG Ray Diagram */}
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 font-mono text-center">
                        Ray Diagram: {LENS_CASES[notesLensCaseInd].label}
                      </span>
                      <div className="w-full flex justify-center">
                        <DynamicRayDiagram
                          type={LENS_CASES[notesLensCaseInd].type}
                          u={LENS_CASES[notesLensCaseInd].u}
                          f={LENS_CASES[notesLensCaseInd].f}
                          onLoadSimulator={onLoadSimulator}
                          isLightMode={isLightMode}
                        />
                      </div>
                    </div>

                    {/* Explanatory notes */}
                    <div className="bg-slate-950/70 p-5 border border-slate-800 rounded-2xl space-y-4 font-sans text-xs" id="lens-image-formation-section">
                      <div className="border-b border-slate-850 pb-2.5">
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block font-mono">Case Description:</span>
                        <p className="font-semibold text-slate-100 text-sm mt-0.5">{LENS_CASES[notesLensCaseInd].desc}</p>
                      </div>

                      {(() => {
                        const det = computeCaseDetails(
                          LENS_CASES[notesLensCaseInd].type,
                          LENS_CASES[notesLensCaseInd].u,
                          LENS_CASES[notesLensCaseInd].f
                        );
                        return (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="lens-mag-sign-analysis-panel">
                            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                              <span className="text-slate-500 block uppercase font-mono font-bold tracking-wider text-[10px]">Object position (u):</span>
                              <span className="text-white font-bold text-xs mt-0.5 block">
                                {LENS_CASES[notesLensCaseInd].label} (u = {LENS_CASES[notesLensCaseInd].u === 9999 ? '-∞' : `-${LENS_CASES[notesLensCaseInd].u} cm`})
                              </span>
                            </div>
                            
                            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                              <span className="text-slate-500 block uppercase font-mono font-bold tracking-wider text-[10px]">Image position (v):</span>
                              <span className="text-cyan-300 font-bold text-xs mt-0.5 block">{det.vStr}</span>
                            </div>

                            <div className="bg-[#121c2e] p-3.5 rounded-xl border border-cyan-500/10 sm:col-span-2 space-y-2">
                              <div className="flex justify-between items-center border-b border-cyan-500/10 pb-1.5">
                                <span className="text-cyan-400 uppercase font-mono font-bold tracking-wider text-[9px]">Linear Magnification (m):</span>
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${det.mSign === '-' ? 'bg-[#ef4444]/15 text-[#f87171] border border-red-500/20' : 'bg-[#10b981]/15 text-[#4ade80] border border-emerald-500/20'}`}>
                                  Sign: {det.mSign === '-' ? 'Negative (-)' : 'Positive (+)'}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-xl font-black text-white">{det.mStr}</div>
                                <div className="text-[11px] text-slate-350 leading-relaxed font-semibold">{det.mExpl}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* COMPREHENSIVE TEXTBOOK USES OF CONVEX AND CONCAVE LENSES */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-lg my-6" id="lens-uses-section">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-105 uppercase tracking-tight text-cyan-400">
                    Syllabus Practical Applications: Uses of Lenses (with Scientific Reasons)
                  </h4>
                  <p className="text-slate-400 text-xs font-semibold">
                    An in-depth handbook for CBSE board investigations detailing exactly HOW and WHY distinct lens styles are used in modern science.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  {/* Convex Lens Section */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold shrink-0">1</div>
                      <h5 className="font-black text-white text-xs uppercase tracking-wider">Uses of Convex (Converging) Lenses</h5>
                    </div>
                    <ul className="space-y-3.5 text-xs text-slate-300 font-sans leading-relaxed font-semibold">
                      <li className="bg-[#121c2e]/40 p-3 rounded-xl border border-cyan-500/10">
                        <b className="text-cyan-400 block mb-1 font-sans">A. Magnifying Glasses and Reading Spectacles</b>
                        <span>Produces an enlarged, virtual erect reading image.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal">
                          <span className="text-yellow-400 font-bold">WHY:</span> When the user positions the reading material very close to the lens (within its focal length, between the Optical Centre O and Principal Focus F₁), a highly magnified, virtual, and erect image is produced on the same side.
                        </p>
                      </li>
                      <li className="bg-[#121c2e]/40 p-3 rounded-xl border border-cyan-500/10">
                        <b className="text-cyan-400 block mb-1 font-sans">B. Spectacles for Hypermetropia (Farsightedness)</b>
                        <span>Helps farsighted individuals focus on close-up print.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal">
                          <span className="text-yellow-400 font-bold">WHY:</span> Hypermetropic eyes converge light weakly, focusing near rays *behind* the retina. Adding a convex lens provides additional converging power, shifting the focused image forward onto the retina.
                        </p>
                      </li>
                      <li className="bg-[#121c2e]/40 p-3 rounded-xl border border-cyan-500/10">
                        <b className="text-cyan-400 block mb-1 font-sans">C. Astronomical Telescopes & Microscopes</b>
                        <span>Achieves extreme magnification of planets and microbe details.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> They converge diverse beams of incoming light to construct sharp, highly detailed real images that can be further magnified by an eyepiece lens.
                        </p>
                      </li>
                      <li className="bg-[#121c2e]/40 p-3 rounded-xl border border-cyan-500/10">
                        <b className="text-cyan-400 block mb-1 font-sans">D. Camera and Projector Lenses</b>
                        <span>Projects sharp, clear images onto films or sensors.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> They converge incoming light rays from distant scenes to construct real, inverted, sharp images directly on the screen or sensor plane.
                        </p>
                      </li>
                    </ul>
                  </div>

                  {/* Concave Lens Section */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 font-bold shrink-0 font-sans">2</div>
                      <h5 className="font-black text-white text-xs uppercase tracking-wider">Uses of Concave (Diverging) Lenses</h5>
                    </div>
                    <ul className="space-y-3.5 text-xs text-slate-300 font-sans leading-relaxed font-semibold">
                      <li className="bg-[#1d121c]/40 p-3 rounded-xl border border-pink-500/10">
                        <b className="text-pink-400 block mb-1 font-sans">A. Spectacles for Myopia (Nearsightedness)</b>
                        <span>Enables myopic individuals to resolve distant landscapes.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> Myopic eyes are either too long or converge too strongly, creating sharp focus *in front of* the retina. A concave lens diverges incoming parallel light beams *before* they enter the eye, shifting the final focus point backward directly onto the retina.
                        </p>
                      </li>
                      <li className="bg-[#1d121c]/40 p-3 rounded-xl border border-pink-500/10">
                        <b className="text-pink-400 block mb-1 font-sans">B. Security Door Peepholes</b>
                        <span>Provides a broad field of view to see visitors outside the door.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> Concave lenses always produce virtual, erect, and highly diminished images. This physical shrinkage allows a tiny lens to capture a highly expansive wide angle of the corridor.
                        </p>
                      </li>
                      <li className="bg-[#1d121c]/40 p-3 rounded-xl border border-pink-500/10">
                        <b className="text-pink-400 block mb-1 font-sans">C. Laser Scanners and High-End Flashlights</b>
                        <span>Spreads out concentrated point light beams.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> They diverge the parallel rays of light produced by the internal bulb, helping to sweep light over a wider physical angle.
                        </p>
                      </li>
                      <li className="bg-[#1d121c]/40 p-3 rounded-xl border border-pink-500/10">
                        <b className="text-pink-400 block mb-1 font-sans">D. Galilean Telescopes & Binoculars</b>
                        <span>Produces an erect, magnified view of distant objects.</span>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-normal font-sans">
                          <span className="text-yellow-400 font-bold">WHY:</span> Used as the eyepiece, a concave lens intercepts the converging rays from the objective lens before they meet and diverges them into an erect virtual image -- unlike astronomical telescopes, which use a convex eyepiece and give an inverted view.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ────── TOPIC 7: LENS FORMULA & MAGNIFICATION ────── */}
          {activeTopic === 'lens-formulas' && (
            <div className="space-y-6 animate-fade-in" id="topic-lens-formulas">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Lens Formula & Magnification
                </h1>
                <p className="text-slate-400 text-xs font-semibold">
                  Solve for lens positions, image sizes, and magnification using easy-to-remember exam methods.
                </p>
              </div>

              {/* DEFINITIONS FIRST */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                </div>
                <div className="space-y-3 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>
                    <b className="text-white">1. Lens Formula:</b> A simple formula that relates object distance (<code className="text-rose-400">u</code>), image distance (<code className="text-teal-400">v</code>), and focal length (<code className="text-cyan-400">f</code>) for any thin curved lens. It is used in exam questions to find where an image forms.
                  </p>
                  <p>
                    <b className="text-white">2. Linear Magnification (m):</b> A ratio that compares the height of the image to the height of the object. It tells us how many times larger or smaller the image is.
                  </p>
                </div>
              </div>

              {/* PHYSICAL QUANTITIES */}
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & standard units</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Object / Image Distance (u, v)</span>
                    <span className="font-mono text-cyan-400">centimeters (cm) or meters (m)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Focal Length (f)</span>
                    <span className="font-mono text-cyan-400">centimeters (cm) or meters (m)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Object / Image Height (h, h')</span>
                    <span className="font-mono text-cyan-400">centimeters (cm) or meters (m)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Magnification (m)</span>
                    <span className="font-mono text-yellow-300">No Units (Dimensionless Ratio)</span>
                  </div>
                </div>
              </div>

              {/* Lens formulas cards layout */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    1. Thin Lens Formula
                  </h4>
                  <p className="text-slate-400 pl-3 text-[11px] leading-relaxed font-sans">
                    Use this formula for all lens math questions. Pay extra attention to the minus (-) sign!
                  </p>
                  <div className="flex justify-center my-3">
                    <div className="flex items-center gap-1.5 px-6 py-3 bg-slate-950 rounded-xl border border-slate-850 text-cyan-300">
                      <Fraction num="1" den="v" />
                      <span className="text-xs font-bold font-sans">-</span>
                      <Fraction num="1" den="u" />
                      <span className="text-xs font-bold font-sans">=</span>
                      <Fraction num="1" den="f" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                    2. Linear Magnification (m)
                  </h4>
                  <p className="text-slate-400 pl-3 text-[11px] leading-relaxed font-sans">
                    Remember: unlike mirrors, lenses have a plus (+) sign in the distance ratio portion!
                  </p>
                  <div className="flex justify-center my-3">
                    <div className="flex items-center gap-1.5 px-6 py-3 bg-slate-950 rounded-xl border border-slate-855 text-cyan-350">
                      <span className="text-xs font-serif italic text-white mr-1">m</span>
                      <span className="text-xs font-bold font-sans">=</span>
                      <Fraction num="h'" den="h" />
                      <span className="text-xs font-bold font-sans">=</span>
                      <Fraction num="v" den="u" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    3. Lens Maker's Formula
                  </h4>
                  <p className="text-slate-400 pl-3 text-[11px] leading-relaxed font-sans">
                    Used by glass makers to build a lens with a specific focal length. Here, <code className="text-yellow-300">n</code> is the refractive index of the glass, and <code className="text-[#a78bfa]">R₁</code> & <code className="text-[#a78bfa]">R₂</code> are the sphere radii:
                  </p>
                  <div className="flex justify-center my-3">
                    <div className="flex items-center gap-1.5 px-6 py-3 bg-slate-950 rounded-xl border border-slate-850 text-cyan-300">
                      <Fraction num="1" den="f" />
                      <span className="text-xs font-bold font-sans">=</span>
                      <span className="text-xs text-white font-mono font-bold">(n - 1) &times; [ </span>
                      <Fraction num="1" den={<span>R<sub>1</sub></span>} />
                      <span className="text-xs font-bold font-sans">-</span>
                      <Fraction num="1" den={<span>R<sub>2</sub></span>} />
                      <span className="text-xs text-white font-mono font-bold"> ]</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crucial exam numerical tips */}
              <div className="bg-[#121c2e] p-5 border border-slate-800 rounded-3xl space-y-3">
                <span className="text-[13px] font-black text-amber-500 uppercase font-mono block">🎯 EXAM TIPS FOR SOLVING LENS QUESTIONS:</span>
                <ul className="text-[11px] text-slate-350 space-y-2.5 list-disc pl-4 font-bold font-sans leading-relaxed">
                  <li>
                    <b className="text-white">Convex Lens Focal Length:</b> Always write <code className="text-emerald-400">f</code> as <b>positive (+)</b> in calculations.
                  </li>
                  <li>
                    <b className="text-white">Concave Lens Focal Length:</b> Always write <code className="text-rose-400">f</code> as <b>negative (-)</b> in calculations.
                  </li>
                  <li>
                    <b className="text-white">Object Distance u:</b> Always write <code className="text-rose-400">u</code> as <b>negative (-)</b> because the object is always placed on the left side of the lens.
                  </li>
                  <li>
                    <b className="text-white">Magnification Signs:</b>
                    <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-400 font-semibold">
                      <li>If <code className="text-rose-400">m is negative (-)</code>, the image is <b>Real & Inverted</b> (upside down).</li>
                      <li>If <code className="text-emerald-400">m is positive (+)</code>, the image is <b>Virtual & Erect</b> (right side up).</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* ────── TOPIC 8: POWER OF A LENS ────── */}
          {activeTopic === 'lens-power' && (
            <div className="space-y-6 animate-fade-in" id="topic-lens-power">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Power of a Lens
                </h1>
                <p className="text-slate-400 text-xs font-semibold">
                  Understand how lenses bend light and how to solve doctors' glasses math problems.
                </p>
              </div>

              {/* DEFINITIONS FIRST */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                </div>
                <div className="space-y-3 text-xs font-semibold leading-relaxed text-slate-300">
                  <p>
                    <b className="text-white">1. Power of a Lens (P):</b> This is a measure of how strongly a lens can bend (converge or diverge) light rays. A strong lens bends light very quickly over a short distance, which means it has a short focal length.
                  </p>
                  <p>
                    <b className="text-white">2. Dioptre (D):</b> The standard unit used to measure the power of a lens. A lens with a focal length of exactly 1 meter has a power of 1 Dioptre.
                  </p>
                </div>
              </div>

              {/* MANDATORY HIGH-ACCURACY UNITS BOX */}
              <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & Standard Units</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Power of Lens (P)</span>
                    <span className="font-mono text-yellow-300 font-black font-sans text-xs">DIOPTRE (D) [equivalent to m⁻¹]</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Focal Length (f) for Power</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">MUST BE IN METERS (m)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Combined Power (P_net)</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">Power sum (P_net = P₁ + P₂)</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Combined Focal Length</span>
                    <span className="font-mono text-cyan-400 font-black font-sans">Reciprocal fraction sum</span>
                  </div>
                </div>
              </div>

              {/* Lens power cards layout */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse" />
                    1. Lens Power Equation
                  </h4>
                  <p className="text-slate-400 pl-3 text-[11px] leading-relaxed font-sans">
                    Focal length <b>must</b> be written in meters when finding power using this basic math relation:
                  </p>
                  <div className="flex justify-center my-3">
                    <div className="flex items-center gap-1.5 px-6 py-3 bg-slate-950 rounded-xl border border-slate-850 text-green-400 font-bold">
                      <span className="text-xs font-serif italic text-white mr-1">P</span>
                      <span className="text-xs font-bold font-sans">=</span>
                      <Fraction num="1" den={<span className="font-serif italic text-white font-normal">f <span className="font-sans text-[9px] font-bold text-slate-400">(in meters)</span></span>} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                    2. Lens Power Equation (Focal Length in cm)
                  </h4>
                  <p className="text-slate-400 pl-3 text-[11px] leading-relaxed font-sans">
                    Since exam questions usually give focal length in centimeters, use this direct formula to avoid unit errors:
                  </p>
                  <div className="flex justify-center my-3">
                    <div className="flex items-center gap-1.5 px-6 py-3 bg-slate-950 rounded-xl border border-slate-850 text-green-300 font-bold">
                      <span className="text-xs font-serif italic text-white mr-1">P</span>
                      <span className="text-xs font-bold font-sans">=</span>
                      <Fraction num="100" den={<span className="font-serif italic text-white font-normal">f <span className="font-sans text-[9px] font-bold text-slate-400">(in cm)</span></span>} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    3. Lenses Placed in contact
                  </h4>
                  <p className="text-slate-400 pl-3 text-[11px] leading-relaxed font-sans">
                    When multiple thin lenses touch each other side-by-side, their powers simply add up algebraically:
                  </p>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 font-mono text-center text-xs text-yellow-300">
                    P_net = P₁ + P₂ + P₃ + ...
                  </div>
                  <p className="text-slate-400 pl-3 text-[11px] leading-relaxed font-sans mt-2">
                    Their net combined focal length can be calculated by adding the individual fraction focal lengths together:
                  </p>
                  <div className="flex justify-center my-3">
                    <div className="flex items-center gap-1.5 px-6 py-3 bg-slate-950 rounded-xl border border-slate-850 text-yellow-300 font-bold">
                      <Fraction num="1" den={<span>F<sub>net</sub></span>} />
                      <span className="text-xs font-bold font-sans">=</span>
                      <Fraction num="1" den={<span>f<sub>1</sub></span>} />
                      <span className="text-xs font-bold font-sans">+</span>
                      <Fraction num="1" den={<span>f<sub>2</sub></span>} />
                      <span className="text-xs font-bold font-sans">+</span>
                      <Fraction num="1" den={<span>f<sub>3</sub></span>} />
                      <span className="text-xs font-bold font-sans">+ ...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crucial exam numerical tips */}
              <div className="bg-[#121c2e] p-5 border border-slate-800 rounded-3xl space-y-3">
                <span className="text-[13px] font-black text-amber-500 uppercase font-mono block">🎯 EXAM TIPS FOR LENS POWER QUESTIONS:</span>
                <ul className="text-[11px] text-slate-350 space-y-2.5 list-disc pl-4 font-bold font-sans leading-relaxed">
                  <li>
                    <b className="text-white">Convex Lens has Positive Power (+P):</b> Because it converges light rays (and its focal length is positive).
                  </li>
                  <li>
                    <b className="text-white">Concave Lens has Negative Power (-P):</b> Because it diverges light rays (and its focal length is negative).
                  </li>
                  <li>
                    <b className="text-white">Corrective Glasses:</b> A doctor prescribing glasses writes power values. Convex is <span className="text-emerald-400 font-bold">+2.5 D</span> (for hypermetropia / farsightedness), and Concave is <span className="text-rose-400 font-bold">-1.25 D</span> (for myopia / nearsightedness).
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* ────── TOPIC 8: COMBINED LENSES (CONVEX & CONCAVE) ────── */}
          {activeTopic === 'combined-lenses' && (() => {
            // Live physical math translations
            const f1Signed = combLens1Type === 'convex' ? combLens1F : -combLens1F;
            const p1 = 100 / f1Signed; // in Dioptres
            
            const f2Signed = combLens2Type === 'convex' ? combLens2F : -combLens2F;
            const p2 = 100 / f2Signed; // in Dioptres

            const f3Signed = combLens3Type === 'convex' ? combLens3F : -combLens3F;
            const p3 = 100 / f3Signed; // in Dioptres

            const netP = combLensCount === 2 ? (p1 + p2) : (p1 + p2 + p3);
            const isZeroP = Math.abs(netP) < 0.005;
            const netFCm = isZeroP ? Infinity : 100 / netP;
            const netFM = isZeroP ? Infinity : 1 / netP;

            // u is negative by sign convention on left
            const uSigned = -combObjectDist;
            // Lens combination formula: 1/v - 1/u = 1/F_net => 1/v = 1/F_net + 1/u
            const oneOverF = isZeroP ? 0 : 1 / netFCm;
            const oneOverU = 1 / uSigned;
            const oneOverV = oneOverF + oneOverU;

            const isVInf = Math.abs(oneOverV) < 0.0001;
            const finalV = isVInf ? Infinity : 1 / oneOverV;
            const netM = isVInf ? 0 : finalV / uSigned;

            // Graphical dimensions mapping
            // SVG width = 600, height = 240, Center axis at Y = 120
            const xCenter = 300;
            const yCenter = 120;
            const xSgScale = 1.3; // scale factor for drawing distances

            const drawLens1X = combLensCount === 2 ? xCenter - 10 : xCenter - 20;
            const drawLens2X = combLensCount === 2 ? xCenter + 10 : xCenter;
            const drawLens3X = xCenter + 20;

            const drawObjX = Math.max(20, xCenter - combObjectDist * xSgScale);
            const drawObjH = 45;

            let drawImgX = xCenter;
            let drawImgH = 0;
            let drawImgState: 'real' | 'virtual' | 'infinity' = 'real';

            if (isVInf) {
              drawImgState = 'infinity';
            } else if (finalV < 0) {
              drawImgState = 'virtual';
              drawImgX = Math.max(10, xCenter + finalV * xSgScale);
              drawImgH = drawObjH * Math.abs(netM);
              if (drawImgH > 80) drawImgH = 80;
            } else {
              drawImgState = 'real';
              drawImgX = Math.min(580, xCenter + finalV * xSgScale);
              drawImgH = drawObjH * Math.abs(netM);
              if (drawImgH > 80) drawImgH = 80;
            }

            // Path generators for SVG lenses
            const makeConvexPath = (x: number) => `M ${x} 30 C ${x+12} 60 ${x+12} 180 ${x} 210 C ${x-12} 180 ${x-12} 60 ${x} 30 Z`;
            const makeConcavePath = (x: number) => `M ${x-10} 30 L ${x+10} 30 Q ${x+2} 120 ${x+10} 210 L ${x-10} 210 Q ${x-2} 120 ${x-10} 30 Z`;

            return (
              <div className="space-y-6 animate-fade-in" id="topic-combined-lenses">
                <div className="space-y-1.5 border-b border-slate-800 pb-4">
                  <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                    Combined Lenses (Convex & Concave)
                  </h1>
                  <p className="text-slate-400 text-xs font-semibold">
                    Solving multi-lens optical configurations in contact. Master power addition, net focal coordinate, and sequential image placement.
                  </p>
                </div>

                {/* 1. MANDATORY DEFINITIONS BOX FIRST */}
                <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                  </div>
                  <div className="space-y-2.5 text-xs font-semibold leading-relaxed text-slate-200">
                    <p>
                      <b className="text-white">1. Combined Lenses (Lens System):</b> Placing two or more lenses side-by-side or touching each other. This is exactly how complex gadgets like cameras, microscopes, and telescopes work, since one lens is rarely enough to get a perfect image!
                    </p>
                    <p>
                      <b className="text-white">2. Equivalent Focal Length (F_net):</b> If we wanted to replace our group of multiple lenses with just one single lens that does the exact same job, its focal length would be the equivalent focal length.
                    </p>
                    <p>
                      <b className="text-white">3. Net Optical Power (P_net):</b> The total strength of our combined lenses. When lenses touch each other, we can find their combined power by simply adding their individual powers together (taking care of positive and negative signs).
                    </p>
                    <p>
                      <b className="text-white">4. Chromatic Aberration Correction:</b> A cool trick where we merge a convex and a concave lens together to stop colors from separating. This prevents fuzzy rainbow outlines from appearing around the edges of our images, keeping them sharp and clear!
                    </p>
                  </div>
                </div>

                {/* 2. PHYSICAL QUANTITIES & UNITS REFERENCE GRID */}
                <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                  <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & Standard Units</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                      <span className="font-bold text-slate-300">Individual Lens Power (P₁, P₂, P₃)</span>
                      <span className="font-mono text-cyan-400 font-black">DIOPTRE (D) [1 D = 1 m⁻¹]</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                      <span className="font-bold text-slate-300">Net Power (P_net)</span>
                      <span className="font-mono text-cyan-400 font-black">DIOPTRE (D) [Signed Algebraic Sum]</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                      <span className="font-bold text-slate-300">Focal Length (f_i, F_net)</span>
                      <span className="font-mono text-cyan-400 font-black font-sans">meters (m) or centimeters (cm)</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                      <span className="font-bold text-slate-300">Magnification (m_net)</span>
                      <span className="font-mono text-cyan-400 font-black font-sans">Dimensionless / Unitless Ratio</span>
                    </div>
                  </div>
                </div>

                {/* 3. CORE FORMULA REFERENCE */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-200 font-mono">Governing Mathematical Formulas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 flex flex-col justify-between">
                      <div>
                        <span className="text-[12px] uppercase font-mono text-cyan-400 block font-bold">Equivalent Net Power</span>
                        <p className="text-[11px] text-slate-400">Summed algebraically (keeping proper signs):</p>
                      </div>
                      <code className="block text-center text-yellow-300 font-mono text-xs pt-2">
                        P<sub>net</sub> = P₁ + P₂ + P₃
                      </code>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 flex flex-col justify-between">
                      <div>
                        <span className="text-[12px] uppercase font-mono text-cyan-400 block font-bold">Equivalent Focal Length</span>
                        <p className="text-[11px] text-slate-400">Reciprocal addition relation:</p>
                      </div>
                      <div className="flex justify-center items-center gap-1 font-mono text-yellow-300 text-xs py-1.5 border border-slate-900 rounded bg-[#0b101d] overflow-x-auto mt-2">
                        <Fraction num="1" den={<span className="font-sans font-bold">F<sub>net</sub></span>} />
                        <span>=</span>
                        <Fraction num="1" den={<span>f<sub>1</sub></span>} />
                        <span>+</span>
                        <Fraction num="1" den={<span>f<sub>2</sub></span>} />
                        <span>+</span>
                        <Fraction num="1" den={<span>f<sub>3</sub></span>} />
                      </div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 flex flex-col justify-between">
                      <div>
                        <span className="text-[12px] uppercase font-mono text-cyan-400 block font-bold">Image Sizing & Magnification</span>
                        <p className="text-[11px] text-slate-400">Overall magnification is a product:</p>
                      </div>
                      <div className="flex justify-center items-center gap-1 font-mono text-yellow-300 text-xs py-1.5 border border-slate-900 rounded bg-[#0b101d] overflow-x-auto mt-2">
                        <span>m<sub>net</sub> = m₁ × m₂ × m₃ =</span>
                        <Fraction num="v" den="u" />
                      </div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 flex flex-col justify-between">
                      <div>
                        <span className="text-[12px] uppercase font-mono text-cyan-400 block font-bold">Separated by Distance d</span>
                        <p className="text-[11px] text-slate-400">When two lenses are separated by d:</p>
                      </div>
                      <div className="flex justify-center items-center gap-1 font-mono text-yellow-300 text-xs py-1.5 border border-slate-900 rounded bg-[#0b101d] overflow-x-auto mt-2 flex-wrap">
                        <Fraction num="1" den={<span className="font-sans font-bold">F<sub>net</sub></span>} />
                        <span>=</span>
                        <Fraction num="1" den={<span>f<sub>1</sub></span>} />
                        <span>+</span>
                        <Fraction num="1" den={<span>f<sub>2</sub></span>} />
                        <span>-</span>
                        <Fraction num="d" den={<span>f<sub>1</sub>f<sub>2</sub></span>} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. THE INTERACTIVE COMBINED LENS CALCULATION LAB & DIAGRAM */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 md:p-6 space-y-6" id="combined-lenses-sandbox">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-4">
                    <div>
                      <h3 className="text-sm font-black text-slate-100 flex items-center gap-1.5">
                        <Zap className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
                        Combined Lenses Contact Sandbox
                      </h3>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">Customize your coaxial alignment and examine refraction results in real-time.</p>
                    </div>

                    {/* Lens Count toggle pill */}
                    <div className="flex bg-[#0d1424] p-1 rounded-xl border border-slate-800 select-none">
                      <button
                        onClick={() => setCombLensCount(2)}
                        className={`px-3 py-1 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer ${
                          combLensCount === 2 
                            ? 'bg-cyan-500 text-slate-950 shadow' 
                            : (isLightMode ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-slate-200')
                        }`}
                      >
                        2 Lenses
                      </button>
                      <button
                        onClick={() => setCombLensCount(3)}
                        className={`px-3 py-1 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer ${
                          combLensCount === 3 
                            ? 'bg-cyan-500 text-slate-950 shadow' 
                            : (isLightMode ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-slate-200')
                        }`}
                      >
                        3 Lenses
                      </button>
                    </div>
                  </div>

                  {/* STEP 4.1: CONFIGURATION PANELS */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    
                    {/* LEFT CONTROLS PANEL: LENSES CONFIGS */}
                    <div className="md:col-span-4 space-y-4">
                      
                      {/* LENS 1 CONTROLS */}
                      <div className="bg-[#0b101d] border border-slate-850 p-3.5 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-cyan-400 font-mono tracking-wider uppercase">Lens 1 (Leftmost)</span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => setCombLens1Type('convex')}
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                combLens1Type === 'convex' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/35' : 'text-slate-500 hover:text-slate-400'
                              }`}
                            >
                              Convex
                            </button>
                            <button
                              onClick={() => setCombLens1Type('concave')}
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                combLens1Type === 'concave' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/35' : 'text-slate-500 hover:text-slate-400'
                              }`}
                            >
                              Concave
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-slate-300">
                            <span>Focal Length (|f₁|):</span>
                            <span className="font-mono text-yellow-300 font-bold">{combLens1F} cm</span>
                          </div>
                          <input
                            type="range"
                            min="15"
                            max="120"
                            step="5"
                            value={combLens1F}
                            onChange={(e) => setCombLens1F(Number(e.target.value))}
                            className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300"
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] bg-slate-950 px-2 py-1 rounded border border-slate-900 font-mono text-slate-400">
                          <span>Signed f₁: <code className="text-slate-200">{f1Signed > 0 ? `+${f1Signed}` : f1Signed} cm</code></span>
                          <span>P₁ = <code className="text-[#22d3ee] font-sans font-extrabold">{p1 > 0 ? `+${p1.toFixed(2)}` : p1.toFixed(2)} D</code></span>
                        </div>
                      </div>

                      {/* LENS 2 CONTROLS */}
                      <div className="bg-[#0b101d] border border-slate-850 p-3.5 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-cyan-400 font-mono tracking-wider uppercase">Lens 2 (Middle)</span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => setCombLens2Type('convex')}
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                combLens2Type === 'convex' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/35' : 'text-slate-500 hover:text-slate-400'
                              }`}
                            >
                              Convex
                            </button>
                            <button
                              onClick={() => setCombLens2Type('concave')}
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                combLens2Type === 'concave' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/35' : 'text-slate-500 hover:text-slate-400'
                              }`}
                            >
                              Concave
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-slate-300">
                            <span>Focal Length (|f₂|):</span>
                            <span className="font-mono text-yellow-300 font-bold">{combLens2F} cm</span>
                          </div>
                          <input
                            type="range"
                            min="15"
                            max="120"
                            step="5"
                            value={combLens2F}
                            onChange={(e) => setCombLens2F(Number(e.target.value))}
                            className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300"
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] bg-slate-950 px-2 py-1 rounded border border-slate-900 font-mono text-slate-400">
                          <span>Signed f₂: <code className="text-slate-200">{f2Signed > 0 ? `+${f2Signed}` : f2Signed} cm</code></span>
                          <span>P₂ = <code className="text-[#22d3ee] font-sans font-extrabold">{p2 > 0 ? `+${p2.toFixed(2)}` : p2.toFixed(2)} D</code></span>
                        </div>
                      </div>

                      {/* LENS 3 CONTROLS (CONDITIONAL) */}
                      {combLensCount === 3 && (
                        <div className="bg-[#0b101d] border border-slate-850 p-3.5 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black text-cyan-400 font-mono tracking-wider uppercase">Lens 3 (Rightmost)</span>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => setCombLens3Type('convex')}
                                className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                  combLens3Type === 'convex' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/35' : 'text-slate-500 hover:text-slate-400'
                                }`}
                              >
                                Convex
                              </button>
                              <button
                                onClick={() => setCombLens3Type('concave')}
                                className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                                  combLens3Type === 'concave' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/35' : 'text-slate-500 hover:text-slate-400'
                                }`}
                              >
                                Concave
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[11px] text-slate-300">
                              <span>Focal Length (|f₃|):</span>
                              <span className="font-mono text-yellow-300 font-bold">{combLens3F} cm</span>
                            </div>
                            <input
                              type="range"
                              min="15"
                              max="120"
                              step="5"
                              value={combLens3F}
                              onChange={(e) => setCombLens3F(Number(e.target.value))}
                              className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300"
                            />
                          </div>

                          <div className="flex items-center justify-between text-[10px] bg-slate-950 px-2 py-1 rounded border border-slate-900 font-mono text-slate-400">
                            <span>Signed f₃: <code className="text-slate-200">{f3Signed > 0 ? `+${f3Signed}` : f3Signed} cm</code></span>
                            <span>P₃ = <code className="text-[#22d3ee] font-sans font-extrabold">{p3 > 0 ? `+${p3.toFixed(2)}` : p3.toFixed(2)} D</code></span>
                          </div>
                        </div>
                      )}

                      {/* OBJECT POSITION SELECTOR */}
                      <div className="bg-[#0b101d] border border-amber-500/10 p-3.5 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-amber-500 font-mono tracking-wider uppercase">Object Placement</span>
                          <span className="text-[10px] font-mono text-slate-400">u = -{combObjectDist} cm</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-slate-300">
                            <span>Leftside Distance (|u|):</span>
                            <span className="font-mono text-yellow-300 font-bold">{combObjectDist} cm</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="150"
                            step="5"
                            value={combObjectDist}
                            onChange={(e) => setCombObjectDist(Number(e.target.value))}
                            className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400"
                          />
                        </div>
                      </div>

                    </div>

                    {/* RIGHT VISUALS & METADATA OUTPUT PANEL */}
                    <div className="md:col-span-8 flex flex-col justify-between space-y-5">
                      
                      {/* 1. DYNAMIC SVG SIMULATION SCHEMATIC */}
                      <div className={`rounded-2xl p-4 flex flex-col items-center border transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#060b14] border-slate-850'}`}>
                        <span className={`text-[9.5px] uppercase font-mono tracking-wider mb-2 block font-extrabold ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                          Interactive System Coordinate Ray Tracing
                        </span>
                        {(() => {
                          const cAxis = isLightMode ? '#475569' : '#475569';
                          const cLensGuide = isLightMode ? '#94a3b8' : '#334155';
                          const cLens1 = isLightMode ? '#0e7490' : '#22d3ee';
                          const cLens2 = isLightMode ? '#1d4ed8' : '#60a5fa';
                          const cLens3 = isLightMode ? '#6d28d9' : '#a78bfa';
                          const cObj = isLightMode ? '#b45309' : '#f59e0b';
                          const cIncidentRay = isLightMode ? '#b91c1c' : '#f87171';
                          const cRefractedRay = isLightMode ? '#15803d' : '#4ade80';
                          const cVirtualImg = isLightMode ? '#1d4ed8' : '#60a5fa';
                          const cRealImg = isLightMode ? '#047857' : '#10b981';
                          return (
                            <div className="w-full overflow-x-auto scrollbar-none flex justify-center">
                              <svg width="600" height="240" viewBox="0 0 600 240" className={`rounded-xl border shadow-inner shrink-0 transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b101d] border-slate-850'}`}>

                                {/* Optical Axis (Principal Axis) */}
                                <line x1="15" y1={yCenter} x2="585" y2={yCenter} stroke={cAxis} strokeWidth="1.2" strokeDasharray="6 4" />
                                <text x="580" y={yCenter - 6} fill={cAxis} fontSize="8" fontFamily="monospace" textAnchor="end">PRINCIPLE AXIS</text>

                                {/* Lens centers / vertical markers */}
                                <line x1={drawLens1X} y1="20" x2={drawLens1X} y2="220" stroke={cLensGuide} strokeWidth="0.8" strokeDasharray="2 3" />
                                <line x1={drawLens2X} y1="20" x2={drawLens2X} y2="220" stroke={cLensGuide} strokeWidth="0.8" strokeDasharray="2 3" />
                                {combLensCount === 3 && (
                                  <line x1={drawLens3X} y1="20" x2={drawLens3X} y2="220" stroke={cLensGuide} strokeWidth="0.8" strokeDasharray="2 3" />
                                )}

                                {/* 1. DRAW LENSES ON INTERFACE */}
                                {/* Lens 1 */}
                                <path
                                  d={combLens1Type === 'convex' ? makeConvexPath(drawLens1X) : makeConcavePath(drawLens1X)}
                                  fill="rgba(34, 211, 238, 0.08)"
                                  stroke={cLens1}
                                  strokeWidth="1.8"
                                />
                                <text x={drawLens1X} y="22" fill={cLens1} fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="black" className="cursor-default">L1</text>

                                {/* Lens 2 */}
                                <path
                                  d={combLens2Type === 'convex' ? makeConvexPath(drawLens2X) : makeConcavePath(drawLens2X)}
                                  fill="rgba(34, 211, 238, 0.08)"
                                  stroke={cLens2}
                                  strokeWidth="1.8"
                                />
                                <text x={drawLens2X} y="22" fill={cLens2} fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="black" className="cursor-default">L2</text>

                                {/* Lens 3 */}
                                {combLensCount === 3 && (
                                  <>
                                    <path
                                      d={combLens3Type === 'convex' ? makeConvexPath(drawLens3X) : makeConcavePath(drawLens3X)}
                                      fill="rgba(34, 211, 238, 0.08)"
                                      stroke={cLens3}
                                      strokeWidth="1.8"
                                    />
                                    <text x={drawLens3X} y="22" fill={cLens3} fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="black" className="cursor-default">L3</text>
                                  </>
                                )}

                                {/* 2. DRAW OBJECT ARROW (Teal/Amber) */}
                                <g transform={`translate(${drawObjX}, ${yCenter})`}>
                                  {/* Arrow line */}
                                  <line x1="0" y1="0" x2="0" y2={-drawObjH} stroke={cObj} strokeWidth="2.5" />
                                  {/* Arrow cap */}
                                  <polygon points={`0,${-drawObjH} -4.5,${-drawObjH+7.5} 4.5,${-drawObjH+7.5}`} fill={cObj} />
                                  {/* Anchor label */}
                                  <text x="-8" y={-drawObjH/2} fill={cObj} fontSize="8" fontWeight="bold">Obj</text>
                                </g>

                                {/* 3. DRAW REFRACTED LIGHT RAYS AND IMAGE */}
                                {/* Starting coordinate: top tip of object */}
                                {(() => {
                                  const rayStartY = yCenter - drawObjH;
                                  const meetLensX = combLensCount === 2 ? drawLens1X : drawLens1X;

                                  if (drawImgState === 'infinity') {
                                    // Parallel rays coming out
                                    return (
                                      <>
                                        {/* Incident Parallel ray to lenses */}
                                        <line x1={drawObjX} y1={rayStartY} x2={xCenter} y2={rayStartY} stroke={cIncidentRay} strokeWidth="1.5" />
                                        {/* Arrow marker on light incident */}
                                        <polygon points={`${(drawObjX+xCenter)/2},${rayStartY} ${(drawObjX+xCenter)/2-5},${rayStartY-3.5} ${(drawObjX+xCenter)/2-5},${rayStartY+3.5}`} fill={cIncidentRay} />

                                        {/* Outgoing parallel ray */}
                                        <line x1={xCenter} y1={rayStartY} x2="580" y2={rayStartY} stroke={cRefractedRay} strokeWidth="1.5" strokeDasharray="3 2" />
                                        {/* Center traversing ray */}
                                        <line x1={drawObjX} y1={rayStartY} x2="580" y2={200} stroke={cRefractedRay} strokeWidth="1.5" />

                                        <text x="500" y="50" fill={cRefractedRay} fontSize="8" fontWeight="black" fontFamily="monospace">IMAGE AT ∞</text>
                                      </>
                                    );
                                  }

                                  const imgY = yCenter - (netM * (-drawObjH));

                                  // Check output limits
                                  const screenImgX = Math.max(10, Math.min(590, drawImgX));
                                  const screenImgY = Math.max(15, Math.min(225, imgY));

                                  return (
                                    <>
                                      {/* Ray 1: Parallel to Principal Axis */}
                                      <line x1={drawObjX} y1={rayStartY} x2={xCenter} y2={rayStartY} stroke={cIncidentRay} strokeWidth="1.2" />
                                      {/* Refracted Ray 1 going to image */}
                                      <line x1={xCenter} y1={rayStartY} x2={screenImgX} y2={screenImgY} stroke={cRefractedRay} strokeWidth="1.2" />
                                      {drawImgState === 'virtual' && (
                                        // backward projection
                                        <line x1={xCenter} y1={rayStartY} x2="580" y2={rayStartY + (rayStartY - screenImgY) * (580 - xCenter) / (xCenter - screenImgX)} stroke={cRefractedRay} strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                                      )}

                                      {/* Ray 2: Optical center traversing straight ray */}
                                      <line x1={drawObjX} y1={rayStartY} x2={xCenter} y2={yCenter} stroke={cIncidentRay} strokeWidth="1.2" />
                                      <line x1={xCenter} y1={yCenter} x2={screenImgX} y2={screenImgY} stroke={cRefractedRay} strokeWidth="1.2" />
                                      {drawImgState === 'virtual' && (
                                        <line x1={screenImgX} y1={screenImgY} x2={drawImgX} y2={screenImgY} stroke={cIncidentRay} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                                      )}

                                      {/* DRAW IMAGE ARROW */}
                                      <g transform={`translate(${drawImgX}, ${yCenter})`}>
                                        <line x1="0" y1="0" x2="0" y2={drawImgX < xCenter ? -drawImgH : drawImgH} stroke={drawImgState === 'virtual' ? cVirtualImg : cRealImg} strokeWidth="2.5" strokeDasharray={drawImgState === 'virtual' ? '4 2' : undefined} />
                                        {drawImgState === 'virtual' ? (
                                          <polygon points={`0,${-drawImgH} -4.5,${-drawImgH+7.5} 4.5,${-drawImgH+7.5}`} fill={cVirtualImg} />
                                        ) : (
                                          <polygon points={`0,${drawImgH} -4.5,${drawImgH-7.5} 4.5,${drawImgH-7.5}`} fill={cRealImg} />
                                        )}
                                        <text x="8" y={drawImgX < xCenter ? -drawImgH/2 : drawImgH/2} fill={drawImgState === 'virtual' ? cVirtualImg : cRealImg} fontSize="8" fontWeight="black" className="font-sans">
                                          {drawImgState === 'virtual' ? 'Virt' : 'Real'} Img
                                        </text>
                                      </g>
                                    </>
                                  );
                                })()}

                              </svg>
                            </div>
                          );
                        })()}
                      </div>

                      {/* 2. NUMERICAL OUTPUT QUANTITY BOX */}
                      <div className="bg-[#0b101d] border border-slate-800 p-4 rounded-xl space-y-3">
                        <span className="text-[13px] font-black text-cyan-400 font-mono tracking-widest block uppercase">⚡ Simulation Mathematical Outputs</span>
                        
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          
                          {/* Equivalent Power */}
                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-400 uppercase font-mono block font-bold">Net Equivalent Power (P_net)</span>
                            <span className={`text-base font-black font-sans mt-0.5 ${isZeroP ? 'text-slate-400' : netP > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {isZeroP ? '0.00 D' : `${netP > 0 ? '+' : ''}${netP.toFixed(2)} D`}
                            </span>
                          </div>

                          {/* Net Focal Length */}
                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between font-sans">
                            <span className="text-[9px] text-slate-400 uppercase font-mono block font-bold">Equivalent Focus (F_net)</span>
                            <span className="text-base font-black font-sans mt-0.5 text-yellow-300">
                              {isZeroP ? '∞ (Infinity)' : `${netFCm > 0 ? '+' : ''}${netFCm.toFixed(1)} cm`}
                            </span>
                          </div>

                          {/* Final Image Distance */}
                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-400 uppercase font-mono block font-bold">Final Image Position (v)</span>
                            <span className={`text-base font-black font-sans mt-0.5 ${isVInf ? 'text-[#8892b0]' : finalV > 0 ? 'text-emerald-400' : 'text-cyan-400'}`}>
                              {isVInf ? 'At Infinity (∞)' : `${finalV > 0 ? '+' : ''}${finalV.toFixed(1)} cm`}
                            </span>
                          </div>

                          {/* Magnification */}
                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-400 uppercase font-mono block font-bold">Combined Magnification (m)</span>
                            <span className="text-base font-black font-sans mt-0.5 text-yellow-300">
                              {isVInf ? 'Undefined' : `${netM > 0 ? '+' : ''}${netM.toFixed(2)}x`}
                            </span>
                          </div>

                        </div>

                        {/* Combined System Character profiling alert */}
                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-855 text-[10.5px] leading-relaxed">
                          <p className="font-semibold text-slate-300 font-sans">
                            🧠 <span className="text-white font-bold">Nature of the System:</span> This combination acts as a{" "}
                            <span className={`font-black uppercase ${isZeroP ? 'text-slate-400' : netP > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {isZeroP ? 'Zero-Power Parallel Plate' : netP > 0 ? 'Converging (Convexlens-like) System' : 'Diverging (Concavelens-like) System'}
                            </span>.
                            Light placed at <code className="text-amber-400 font-mono font-sans font-bold">-{combObjectDist} cm</code> on the left will converge / focus to form a{" "}
                            <span className="text-yellow-300 font-extrabold">
                              {isVInf ? 'highly scattered parallel beam' : finalV > 0 ? 'Real & Inverted image on the right' : 'Virtual & Erect image on the left'}
                            </span>.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* STEP 4.2: EDUCATIONAL STEP-BY-STEP ALGEBRAIC SOLVER WRITTEN BEAUTIFULLY */}
                  <div className="bg-[#0b101d] border border-cyan-500/10 p-5 rounded-2xl space-y-4 font-sans">
                    <div className="flex items-center gap-1.5 border-b border-slate-850 pb-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-black uppercase tracking-wider text-slate-100 font-mono">Step-by-Step Textbook Numerical Solution Workout</h4>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed font-semibold">
                      
                      {/* Step 1: Write down parameters */}
                      <div className="space-y-1">
                        <h5 className="font-bold text-slate-200">Step 1: Write down given quantities with signs</h5>
                        <div className="pl-4 border-l border-slate-800 space-y-1.5 text-slate-400 text-[11px] font-sans">
                          <p>
                            Focal length of Lens 1: <code className="text-[#22d3ee]">f₁ = {f1Signed > 0 ? `+${combLens1F}` : `-${combLens1F}`} cm = {f1Signed > 0 ? `+` : `-`}{(combLens1F/100).toFixed(2)} m</code> ({combLens1Type === 'convex' ? 'Convex' : 'Concave'})
                          </p>
                          <p>
                            Focal length of Lens 2: <code className="text-[#22d3ee]">f₂ = {f2Signed > 0 ? `+${combLens2F}` : `-${combLens2F}`} cm = {f2Signed > 0 ? `+` : `-`}{(combLens2F/100).toFixed(2)} m</code> ({combLens2Type === 'convex' ? 'Convex' : 'Concave'})
                          </p>
                          {combLensCount === 3 && (
                            <p>
                              Focal length of Lens 3: <code className="text-[#22d3ee]">f₃ = {f3Signed > 0 ? `+${combLens3F}` : `-${combLens3F}`} cm = {f3Signed > 0 ? `+` : `-`}{(combLens3F/100).toFixed(2)} m</code> ({combLens3Type === 'convex' ? 'Convex' : 'Concave'})
                            </p>
                          )}
                          <p>
                            Object distance from center coordinate: <code className="text-amber-500">u = -{combObjectDist} cm = -{(combObjectDist/100).toFixed(2)} m</code> (placed on the left side)
                          </p>
                        </div>
                      </div>

                      {/* Step 2: Calculate individual powers */}
                      <div className="space-y-2">
                        <h5 className="font-bold text-slate-200">Step 2: Calculate individual optical powers in Dioptres (D)</h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          Power is the reciprocal of focal length in meters:
                          <span className="inline-flex items-center align-middle ml-1">
                            <span className="font-sans font-bold text-yellow-300">P = </span>
                            <Fraction num="100" den={<span className="font-sans font-bold">f (in cm)</span>} />
                          </span>
                        </p>
                        <div className="pl-4 border-l border-slate-800 space-y-2.5 text-slate-300 font-mono text-[11px]">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span>P₁ =</span>
                            <Fraction num="100" den={<span>{f1Signed}</span>} />
                            <span>=</span>
                            <span className="text-cyan-400 font-bold">{p1 > 0 ? `+${p1.toFixed(2)}` : p1.toFixed(2)} D</span>
                            <span className="text-slate-500 font-sans">({combLens1Type === 'convex' ? 'Convex / Converging' : 'Concave / Diverging'})</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span>P₂ =</span>
                            <Fraction num="100" den={<span>{f2Signed}</span>} />
                            <span>=</span>
                            <span className="text-cyan-400 font-bold">{p2 > 0 ? `+${p2.toFixed(2)}` : p2.toFixed(2)} D</span>
                            <span className="text-slate-500 font-sans">({combLens2Type === 'convex' ? 'Convex / Converging' : 'Concave / Diverging'})</span>
                          </div>

                          {combLensCount === 3 && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span>P₃ =</span>
                              <Fraction num="100" den={<span>{f3Signed}</span>} />
                              <span>=</span>
                              <span className="text-cyan-400 font-bold">{p3 > 0 ? `+${p3.toFixed(2)}` : p3.toFixed(2)} D</span>
                              <span className="text-slate-500 font-sans">({combLens3Type === 'convex' ? 'Convex / Converging' : 'Concave / Diverging'})</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Step 3: Calculate Net Power and Equiv Focal Length */}
                      <div className="space-y-1">
                        <h5 className="font-bold text-slate-200">Step 3: Combine powers to calculate net power (P_net) and focal length (F_net)</h5>
                        <div className="pl-4 border-l border-slate-800 space-y-2.5 text-slate-350 text-[11px] font-sans">
                          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 font-mono text-slate-300 text-xs">
                            <span className="text-[#a78bfa] block font-bold">P_net = P₁ + P₂ {combLensCount === 3 ? '+ P₃' : ''}</span>
                            P_net = {p1 > 0 ? `+${p1.toFixed(2)}` : p1.toFixed(2)} + ({p2 > 0 ? `+${p2.toFixed(2)}` : p2.toFixed(2)}) {combLensCount === 3 ? `+ (${p3 > 0 ? '+' : ''}${p3.toFixed(2)})` : ''} = <b>{isZeroP ? '0.00 D' : `${netP > 0 ? '+' : ''}${netP.toFixed(2)} D`}</b>
                          </div>
                          
                          <p className="mt-1.5 text-slate-400 flex items-center gap-1 flex-wrap">
                            <span>Equivalent Focal Length is the reciprocal of net power:</span>
                            <span className="text-yellow-300 font-mono font-semibold flex items-center ml-1">
                              <span>F<sub>net</sub> =</span>
                              <Fraction num="100" den={<span>P<sub>net</sub></span>} />
                            </span>
                          </p>
                          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 font-mono text-slate-300 text-xs mt-1 flex items-center gap-1 flex-wrap">
                            <span>F<sub>net</sub> =</span>
                            {isZeroP ? (
                              <div className="flex items-center gap-1">
                                <Fraction num="100" den="0" />
                                <span>= ∞ (acts as flat window panel)</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <Fraction num="100" den={<span>{netP.toFixed(2)}</span>} />
                                <span>= {netFCm > 0 ? '+' : ''}{netFCm.toFixed(2)} cm ({(netFM).toFixed(3)} meters)</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Step 4: Lens combination formula image find */}
                      <div className="space-y-1">
                        <h5 className="font-bold text-slate-200">Step 4: Solve for the final image position (v) using the lens formula</h5>
                        <p className="text-slate-400 text-[11px]">
                          Substitute the values of <code className="text-cyan-400 font-sans">F_net</code> and <code className="text-amber-500 font-sans">u</code> into the thin lens formula:
                        </p>
                        <div className="pl-4 border-l border-slate-800 space-y-2 text-slate-400 text-[11px] font-sans">
                          <div className="flex justify-center items-center gap-1.5 bg-[#090f1e] p-2.5 rounded border border-slate-900 font-mono text-xs text-yellow-300">
                            <Fraction num="1" den="v" />
                            <span>-</span>
                            <Fraction num="1" den={<span>u<sub>signed</sub></span>} />
                            <span>=</span>
                            <Fraction num="1" den={<span className="italic">F<sub>net</sub></span>} />
                          </div>
                          
                          <p className="text-slate-400">Substituting values:</p>
                          <div className="bg-slate-950 p-3 rounded border border-slate-900 space-y-3 font-mono text-[11px] text-slate-300">
                            <div className="flex items-center gap-1 flex-wrap">
                              <Fraction num="1" den="v" />
                              <span>=</span>
                              <Fraction num="1" den={<span>F<sub>net</sub></span>} />
                              <span>+</span>
                              <Fraction num="1" den="u" />
                              <span>=</span>
                              <Fraction num="1" den={isZeroP ? '∞' : netFCm.toFixed(2)} />
                              <span>+</span>
                              <Fraction num="1" den={`(${uSigned})`} />
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                              <Fraction num="1" den="v" />
                              <span>=</span>
                              <span>{oneOverF.toFixed(5)}</span>
                              <span>+</span>
                              <span>({oneOverU.toFixed(5)})</span>
                              <span>=</span>
                              <b>{oneOverV.toFixed(5)} cm⁻¹</b>
                            </div>
                          </div>
                          
                          <p className="mt-1">Reciprocating to find final image distance <code className="text-cyan-300 font-mono">v</code>:</p>
                          <div className="bg-slate-950 p-3 rounded border border-slate-900 font-mono text-xs text-slate-100 flex items-center gap-1 flex-wrap">
                            <span>v =</span>
                            <Fraction num="1" den={oneOverV.toFixed(5)} />
                            <span>=</span>
                            <b>{isVInf ? 'Infinity (∞)' : `${finalV > 0 ? '+' : ''}${finalV.toFixed(2)} cm`}</b>
                          </div>

                          <div className="flex flex-col gap-1.5 bg-slate-950 p-3 rounded-lg border border-slate-900 mt-2 font-sans font-semibold text-slate-300">
                            <span className="text-[10px] uppercase font-mono text-[#58a6ff] block font-bold">🏁 FINAL CORE OUTCOME:</span>
                            {isVInf ? (
                              <p>Since the refracting rays emerge completely parallel, they will meet at <span className="text-yellow-300 font-black">Infinity (v = ∞)</span>.</p>
                            ) : finalV > 0 ? (
                              <p>The image is formed at a distance of <span className="text-emerald-400 font-black">{finalV.toFixed(2)} cm</span> behind the lenses (on the right-hand side). Because <code className="text-emerald-400 font-mono font-bold">v is positive</code>, it is a <span className="text-emerald-400 font-black">Real & Inverted</span> image.</p>
                            ) : (
                              <p>The image is formed at a distance of <span className="text-cyan-300 font-black">{Math.abs(finalV).toFixed(2)} cm</span> in front of the lenses (on the left-hand side, same side as object). Because <code className="text-cyan-300 font-mono font-bold">v is negative</code>, it is a <span className="text-cyan-300 font-black">Virtual & Erect</span> image.</p>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            );
          })()}

          {/* ────── TOPIC 9: THICK LENSES & CARDINAL POINTS ────── */}
          {activeTopic === 'thick-lenses' && (() => {
            const nRel = thickN;
            const r1 = thickR1;
            const r2 = thickR2;
            const t = thickT;

            // Thick Lens Maker's Formula
            const factor = nRel - 1;
            const rTerm = (1 / r1) - (1 / r2);
            // thickTerm: (n - 1) * t / (n * R1 * R2)
            const thickTerm = (factor * t) / (nRel * r1 * r2);
            const inverseF = factor * (rTerm + thickTerm);
            const isInfF = Math.abs(inverseF) < 0.0001;
            const thickF = isInfF ? Infinity : 1 / inverseF;

            // Distances from poles V1 and V2 to principal points H1 and H2
            // h1 = - f * (n - 1) * t / (n * R2)
            // h2 = - f * (n - 1) * t / (n * R1)
            const d1Val = isInfF ? 0 : - thickF * factor * t / (nRel * r2);
            const d2Val = isInfF ? 0 : - thickF * factor * t / (nRel * r1);

            // Graphical parameters for SVG rendering (width = 500, height = 220)
            const yMid = 110;
            const v1 = 250 - (t * 8); // scale thickness visually
            const v2 = 250 + (t * 8);

            // Position of principal planes H1 and H2
            const h1Pos = v1 + d1Val * 8;
            const h2Pos = v2 + d2Val * 8;

            // Focal point absolute positions relative to center line X=250
            const f1Pos = h1Pos - (isInfF ? 800 : thickF * 4);
            const f2Pos = h2Pos + (isInfF ? 800 : thickF * 4);

            return (
              <div className="space-y-6 animate-fade-in" id="topic-thick-lenses">
                <div className="space-y-1.5 border-b border-slate-800 pb-4">
                  <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                    Thick Lenses & Cardinal Points
                  </h1>
                  <p className="text-slate-400 text-xs font-semibold">
                    Advanced geometric optics: accounting for physical lens thickness and mapping the six cardinal points.
                  </p>
                </div>

                {/* 1. MANDATORY DEFINITIONS SECTION FIRST */}
                <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Core Definitions</h3>
                  </div>
                  <div className="space-y-2.5 text-xs font-semibold leading-relaxed text-slate-300">
                    <p>
                      <b className="text-white">1. Thick Lens:</b> A lens that is thick enough that we cannot ignore its width in our math. Instead of pretending the lens is a flat sheet, we must calculate light bending twice—once when entering the front glass surface, and once when leaving the back surface!
                    </p>
                    <p>
                      <b className="text-white">2. Cardinal Points:</b> Six special reference points along the center line (axis) of a thick lens. They act like simplified "magic shortcuts" that allow us to draw and calculate light rays easily without tracing every tiny bend inside the glass!
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-1 text-slate-350 font-bold">
                      <li><b className="text-white">Focal Points (F₁, F₂):</b> The exact spots where parallel light rays meet (or appear to spread out from) after passing through the thick lens.</li>
                      <li><b className="text-white">Principal Points (H₁, H₂):</b> Two magic points where we can pretend all the lens's light-bending action happens. These points let us treat a thick lens just like a simple thin lens!</li>
                      <li><b className="text-white">Nodal Points (N₁, N₂):</b> Two special points where if a light ray goes in towards the first point at some angle, it comes out of the second point at the exact same angle (parallel to the first one).</li>
                    </ul>
                    <p>
                      <b className="text-white">3. System Focal Length (f):</b> The true focus distance of the thick lens, measured from the magic principal points (<code className="text-yellow-300 font-mono">H₁</code> or <code className="text-yellow-300 font-mono">H₂</code>) instead of the actual physical glass surface.
                    </p>
                  </div>
                </div>

                {/* 2. PHYSICAL QUANTITIES SECTION */}
                <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
                  <h4 className="text-sm font-black uppercase text-amber-500 font-mono tracking-widest">Physical Quantities & Units</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center font-bold">
                      <span className="text-slate-300">Lens Thickness (t)</span>
                      <span className="font-mono text-cyan-400">centimeters (cm) or meters (m)</span>
                    </div>
                    <div className="bg-slate-955 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center font-bold">
                      <span className="text-slate-300">Refractive Index (n)</span>
                      <span className="font-mono text-cyan-400">Dimensionless Constant</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center font-bold">
                      <span className="text-slate-300">Radii of Curvature (R₁, R₂)</span>
                      <span className="font-mono text-cyan-400">centimeters (cm) or meters (m)</span>
                    </div>
                    <div className="bg-slate-955 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center font-bold">
                      <span className="text-slate-300">Effective Focal Length (f)</span>
                      <span className="font-mono text-cyan-400">cm / m [From coordinates H₁ or H₂]</span>
                    </div>
                  </div>
                </div>

                {/* 3. MATHEMATICAL EQUATIONS SECTION */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-200 font-mono">Governing Equations & Formulas</h3>
                  <div className="space-y-4 font-sans text-xs">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-1.5 font-bold">
                      <span className="text-[12px] uppercase font-mono text-cyan-400 block font-black">1. Thick Lens Maker's Formula (Gullstrand's Equation)</span>
                      <p className="text-slate-400 text-[11px] font-sans font-semibold">Takes into account focal shortening due to the thickness of glass the light travels through:</p>
                      <div className="flex justify-center my-3 text-yellow-300 font-mono text-xs">
                        <div className="flex items-center gap-1 px-5 py-3 bg-slate-900 rounded-xl border border-slate-800 flex-wrap">
                          <Fraction num="1" den={<span className="font-serif italic font-normal text-white">f</span>} />
                          <span className="mx-1.5 text-xs text-slate-400 font-sans">=</span>
                          <span className="text-white font-sans text-xs">(n - 1) &times; [ </span>
                          <Fraction num="1" den={<span>R<sub>1</sub></span>} />
                          <span className="mx-1.5 text-xs text-slate-400 font-sans">-</span>
                          <Fraction num="1" den={<span>R<sub>2</sub></span>} />
                          <span className="mx-1.5 text-xs text-slate-400 font-sans">+</span>
                          <Fraction num={<span>(n - 1) &middot; t</span>} den={<span>n &middot; R<sub>1</sub> &middot; R<sub>2</sub></span>} />
                          <span className="text-white font-sans text-xs"> ]</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-1.5">
                        <span className="text-[12px] uppercase font-mono text-cyan-400 block font-black">2. Distance to First Principal Point (V₁ to H₁)</span>
                        <p className="text-[11px] text-slate-400 font-sans font-semibold">Axial distance h₁ from pole vertex V₁ to principal plane H₁:</p>
                        <div className="flex justify-center my-2 text-cyan-300 font-mono text-xs">
                          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                            <span className="font-sans font-bold">h₁</span>
                            <span className="font-sans font-bold">=</span>
                            <span className="font-sans font-bold">-</span>
                            <Fraction num={<span>f &middot; (n - 1) &middot; t</span>} den={<span>n &middot; R<sub>2</sub></span>} />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-1.5">
                        <span className="text-[12px] uppercase font-mono text-cyan-400 block font-black">3. Distance to Second Principal Point (V₂ to H₂)</span>
                        <p className="text-[11px] text-slate-400 font-sans font-semibold">Axial distance h₂ from pole vertex V₂ to principal plane H₂:</p>
                        <div className="flex justify-center my-2 text-cyan-300 font-mono text-xs">
                          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                            <span className="font-sans font-bold">h₂</span>
                            <span className="font-sans font-bold">=</span>
                            <span className="font-sans font-bold">-</span>
                            <Fraction num={<span>f &middot; (n - 1) &middot; t</span>} den={<span>n &middot; R<sub>1</sub></span>} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-amber-400 text-[10.5px] leading-relaxed font-semibold bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                      💡 <b>Sign Convention Note:</b> Standard Cartesian rules apply. Distances measured in the direction of light travel are positive. Radii R₁ is positive for convex-left curves, and R₂ is negative for convex-right curves (e.g. biconvex lens has R₁ &gt; 0 and R₂ &lt; 0).
                    </p>
                  </div>
                </div>

                {/* 4. INTERACTIVE THICK LENSES CALCULATION LAB & DIAGRAM */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 md:p-6 space-y-6" id="thick-lenses-sandbox">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-4">
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-100 flex items-center gap-1.5">
                        <Zap className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
                        Thick Lens Cardinal Points Lab
                      </h3>
                      <p className="text-[10.5px] text-slate-400 mt-0.5 font-semibold">Manipulate thickness, radii, and refractive index to visualize principal planes instantly.</p>
                    </div>
                  </div>

                  {/* SandBox controls layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-sans">
                    
                    {/* Hand-tuned controls sliders */}
                    <div className="md:col-span-5 space-y-4">
                      
                      {/* Control: Refractive index */}
                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1.5">
                        <div className="flex justify-between items-center text-[11px] font-bold">
                          <span className="text-slate-300">Refractive Index (n)</span>
                          <span className="font-mono text-cyan-400">{thickN.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="1.10"
                          max="2.50"
                          step="0.05"
                          value={thickN}
                          onChange={(e) => setThickN(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                      </div>

                      {/* Control: Radius 1 */}
                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1.5 font-sans">
                        <div className="flex justify-between items-center text-[11px] font-bold">
                          <span className="text-slate-300 font-sans">Curvature Radius 1 (R₁)</span>
                          <span className="font-mono text-[#a78bfa]">{thickR1 > 0 ? '+' : ''}{thickR1.toFixed(1)} cm</span>
                        </div>
                        <input
                          type="range"
                          min="5.0"
                          max="30.0"
                          step="0.5"
                          value={thickR1}
                          onChange={(e) => setThickR1(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                      </div>

                      {/* Control: Radius 2 */}
                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1.5 font-sans">
                        <div className="flex justify-between items-center text-[11px] font-bold">
                          <span className="text-slate-300 font-sans">Curvature Radius 2 (R₂)</span>
                          <span className="font-mono text-[#a78bfa]">{thickR2 > 0 ? '+' : ''}{thickR2.toFixed(1)} cm</span>
                        </div>
                        <input
                          type="range"
                          min="-30.0"
                          max="-5.0"
                          step="0.5"
                          value={thickR2}
                          onChange={(e) => setThickR2(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                      </div>

                      {/* Control: Thickness */}
                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1.5 font-sans">
                        <div className="flex justify-between items-center text-[11px] font-bold">
                          <span className="text-slate-300 font-sans">Lens Thickness (t)</span>
                          <span className="font-mono text-yellow-300">{thickT.toFixed(1)} cm</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="10.0"
                          step="0.1"
                          value={thickT}
                          onChange={(e) => setThickT(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                      </div>

                    </div>

                    {/* Interactive diagram preview area */}
                    <div className="md:col-span-7 flex flex-col gap-4">
                      <div className="bg-[#050912] rounded-2xl border border-slate-850 p-2 relative overflow-hidden flex items-center justify-center">
                        
                        <div className="absolute top-2 left-3 flex gap-2">
                          <span className="text-[9px] font-mono border border-cyan-500/10 px-2 py-0.5 rounded text-cyan-400 font-black tracking-wider bg-cyan-950/10">Interactive Focal Rays</span>
                        </div>

                        <div className="w-full aspect-[25/11] bg-[#050912]">
                          <svg viewBox="0 0 500 220" className="w-full h-full" id="thick-lens-svg-stage">
                            {/* Axis line */}
                            <line x1="10" y1={yMid} x2="490" y2={yMid} stroke="#1e293b" strokeWidth="1.5" strokeDasharray="4,2" />

                            {/* Render Principal Plane H1 */}
                            <line x1={h1Pos} y1="20" x2={h1Pos} y2="200" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3,3" />
                            <text x={h1Pos + 3} y="32" fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="extrabold">H₁</text>

                            {/* Render Principal Plane H2 */}
                            <line x1={h2Pos} y1="20" x2={h2Pos} y2="200" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />
                            <text x={h2Pos - 12} y="32" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="extrabold">H₂</text>

                            {/* Drawing the thick lens structure */}
                            {(() => {
                              const b1 = r1 > 0 ? 12 : -12;
                              const b2 = r2 > 0 ? 12 : -12;
                              
                              const pathD = `M ${v1},60 
                                             C ${v1 + b1},60 ${v1 + b1},160 ${v1},160 
                                             L ${v2},160 
                                             C ${v2 + b2},160 ${v2 + b2},60 ${v2},60 Z`;
                              
                              return (
                                <g>
                                  {/* Glass Body fill */}
                                  <path d={pathD} fill="#22d3ee" fillOpacity="0.08" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" />
                                  <text x="250" y="155" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="black" textAnchor="middle">n = {nRel.toFixed(2)}</text>
                                </g>
                              );
                            })()}

                            {/* Vertex indicators */}
                            <circle cx={v1} cy={yMid} r="3" fill="#ef4444" />
                            <text x={v1 - 12} y={yMid + 12} fill="#ef4444" fontSize="8" fontFamily="monospace" fontWeight="black">V₁</text>

                            <circle cx={v2} cy={yMid} r="3" fill="#ef4444" />
                            <text x={v2 + 4} y={yMid + 12} fill="#ef4444" fontSize="8" fontFamily="monospace" fontWeight="black">V₂</text>

                            {/* Cardinal Points: Focal points F1 and F2 */}
                            {!isInfF && f1Pos > 15 && f1Pos < 485 && (
                              <g>
                                <circle cx={f1Pos} cy={yMid} r="3.5" fill="#facc15" stroke="white" strokeWidth="0.8" />
                                <text x={f1Pos - 8} y={yMid - 8} fill="#facc15" fontSize="8" fontFamily="monospace" fontWeight="black">F₁</text>
                              </g>
                            )}

                            {!isInfF && f2Pos > 15 && f2Pos < 485 && (
                              <g>
                                <circle cx={f2Pos} cy={yMid} r="3.5" fill="#facc15" stroke="white" strokeWidth="0.8" />
                                <text x={f2Pos - 8} y={yMid - 8} fill="#facc15" fontSize="8" fontFamily="monospace" fontWeight="black">F₂</text>
                              </g>
                            )}

                            {/* Principal Unit point on axis */}
                            <circle cx={h1Pos} cy={yMid} r="3" fill="#e2e8f0" />
                            <text x={h1Pos - 5} y={yMid + 12} fill="#e2e8f0" fontSize="8" fontFamily="monospace" fontWeight="bold">H₁</text>

                            <circle cx={h2Pos} cy={yMid} r="3" fill="#e2e8f0" />
                            <text x={h2Pos - 5} y={yMid + 12} fill="#e2e8f0" fontSize="8" fontFamily="monospace" fontWeight="bold">H₂</text>

                            {/* Standard Ray Tracing path for physical understanding */}
                            {!isInfF && (
                              <path 
                                d={`M 15,65 L ${h1Pos},65 L ${h2Pos},65 L ${f2Pos > 490 ? 490 : f2Pos},${f2Pos > 490 ? 65 + (135 * (490 - h2Pos) / (f2Pos - h2Pos)) : yMid}`} 
                                fill="none" 
                                stroke="#facc15" 
                                strokeWidth="1.5" 
                                strokeDasharray="0"
                              />
                            )}

                          </svg>
                        </div>
                      </div>

                      {/* Real time output variables report */}
                      <div className="bg-[#0b101d] border border-slate-800 p-4 rounded-xl space-y-3 font-sans">
                        <span className="text-[13px] font-black text-cyan-400 font-mono tracking-widest block uppercase">⚡ Calculated Thick-Lens Parameters</span>
                        
                        <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-400 uppercase font-mono block font-bold">Effective Focus (f_eff)</span>
                            <span className="text-base font-black mt-0.5 text-yellow-300">
                              {isInfF ? '∞ (Flat Glass)' : `${thickF > 0 ? '+' : ''}${thickF.toFixed(2)} cm`}
                            </span>
                          </div>

                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-400 uppercase font-mono block font-bold">Thick Power (P_thick)</span>
                            <span className="text-base font-black mt-0.5 text-emerald-400 font-sans">
                              {isInfF ? '0.00 D' : `${(100 / thickF) > 0 ? '+' : ''}${(100 / thickF).toFixed(2)} D`}
                            </span>
                          </div>

                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-400 uppercase font-mono block font-bold">V₁ to plane H₁ (h₁)</span>
                            <span className="text-sm font-bold font-mono mt-0.5 text-[#a78bfa]">
                              {d1Val === 0 ? '0.00' : `${d1Val > 0 ? '+' : ''}${d1Val.toFixed(2)}`} cm
                            </span>
                          </div>

                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-400 uppercase font-mono block font-bold">V₂ to plane H₂ (h₂)</span>
                            <span className="text-sm font-bold font-mono mt-0.5 text-[#38bdf8]">
                              {d2Val === 0 ? '0.00' : `${d2Val > 0 ? '+' : ''}${d2Val.toFixed(2)}`} cm
                            </span>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* 5. STEP BY STEP SOLUTION */}
                  <div className="bg-[#0b101d] border border-cyan-500/10 p-5 rounded-2xl space-y-4 font-sans font-semibold">
                    <div className="flex items-center gap-1.5 border-b border-slate-850 pb-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-black uppercase tracking-wider text-slate-100 font-mono">Step-by-Step Thick Lens Calculation Breakdown</h4>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
                      <div className="space-y-1">
                        <h5 className="font-bold text-slate-200">Step 1: Write down input optical parameters</h5>
                        <div className="pl-4 border-l border-slate-800 space-y-1 text-slate-400 text-[11px] font-sans">
                          <p>Relative Refractive Index: <code className="text-[#22d3ee]">n = {nRel.toFixed(2)}</code></p>
                          <p>Curvature values: <code className="text-[#a78bfa]">R₁ = {thickR1.toFixed(1)} cm</code>, <code className="text-[#a78bfa]">R₂ = {thickR2.toFixed(1)} cm</code></p>
                          <p>Central axial thickness: <code className="text-yellow-300">t = {thickT.toFixed(1)} cm</code></p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h5 className="font-bold text-slate-200">Step 2: Solve the Thick Lens Gullstrand Equation</h5>
                        <div className="bg-slate-950 p-3 rounded-xl border border-dashed border-cyan-500/30 text-cyan-300 font-mono text-[11.5px] my-2 text-center">
                          1/f = ({nRel.toFixed(2)} - 1) &times; [ 1/({thickR1.toFixed(1)}) - 1/({thickR2.toFixed(1)}) + ({nRel.toFixed(2)} - 1) &middot; {thickT.toFixed(1)} / ({nRel.toFixed(2)} &middot; {thickR1.toFixed(1)} &middot; ({thickR2.toFixed(1)})) ]
                        </div>
                        <div className="pl-4 border-l border-slate-800 text-slate-400 font-mono text-[10.5px] space-y-1">
                          <p>factor = {factor.toFixed(2)}</p>
                          <p>rTerm = {rTerm.toFixed(5)} cm⁻¹</p>
                          <p>thickTerm = {thickTerm.toFixed(5)} cm⁻¹</p>
                          <p>1 / f = {factor.toFixed(2)} × ({rTerm.toFixed(5)} + {thickTerm.toFixed(5)}) = {inverseF.toFixed(5)} cm⁻¹</p>
                          <p className="text-yellow-300 font-sans font-bold">f = {isInfF ? '∞ (Infinity)' : `${thickF.toFixed(2)} cm`}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h5 className="font-bold text-slate-200">Step 3: Calculate coordinates of Principal Planes H₁ and H₂</h5>
                        <div className="pl-4 border-l border-slate-805 text-slate-400 font-sans text-[11px] space-y-1">
                          <p>
                            Plane H₁ distance from V₁: <code className="text-[#a78bfa]">h₁ = -f · (n - 1) · t / (n · R₂)</code>
                          </p>
                          <p className="font-mono text-[10.5px] pl-2">
                            h₁ = -({isInfF ? '∞' : thickF.toFixed(2)}) · ({factor.toFixed(2)}) · {thickT.toFixed(1)} / ({nRel.toFixed(2)} · ({thickR2.toFixed(1)})) = {d1Val.toFixed(3)} cm
                          </p>
                          <p className="mt-1.5">
                            Plane H₂ distance from V₂: <code className="text-[#38bdf8]">h₂ = -f · (n - 1) · t / (n · R₁)</code>
                          </p>
                          <p className="font-mono text-[10.5px] pl-2">
                            h₂ = -({isInfF ? '∞' : thickF.toFixed(2)}) · ({factor.toFixed(2)}) · {thickT.toFixed(1)} / ({nRel.toFixed(2)} · {thickR1.toFixed(1)}) = {d2Val.toFixed(3)} cm
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            );
          })()}

          {activeTopic === 'human-eye' && (
            <div className="space-y-6 animate-fade-in" id="topic-human-eye">
              <div className={`space-y-2 border-b pb-4 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                <h1 className={`text-2xl md:text-3xl font-black tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                  Structure and Optical Function of the Human Eye
                </h1>
                <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Study the complex structure, optical refraction mechanics, and key parts of the human vision system from multiple academic perspectives.
                </p>
              </div>

              {/* EYE DESCRIPTION BLOCK */}
              <div className={`border p-6 rounded-2xl relative overflow-hidden space-y-3 shadow-md ${isLightMode ? 'bg-cyan-50/50 border-cyan-500/20' : 'bg-[#121c2e] border-cyan-500/15'}`}>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#22d3ee]" />
                <span className="text-xs font-black tracking-wider text-cyan-500 uppercase font-mono flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-cyan-500" /> THE EYE AS A NATURAL CAMERA:
                </span>
                <p className={`text-sm font-medium leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                  The human eye is one of the most highly sensitive, self-focusing optical instruments in nature. Physically, it operates exactly like an analog film camera: a system of transparent surfaces and an organic double-convex lens focus incoming rays of light to form a <b className={isLightMode ? "text-slate-900 font-bold" : "text-white"}>real, inverted, and diminished</b> image on a light-sensitive screen at the back called the <b className={isLightMode ? "text-slate-900 font-bold" : "text-white"}>retina</b>.
                </p>
              </div>

              {/* LABELED DIAGRAM CONTAINER */}
              <div className={`border rounded-3xl p-6 transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`} id="human-eye-anatomical-diagram">
                <div className="text-center space-y-1 mb-6">
                  <span className={`text-base uppercase font-mono font-black tracking-wider ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                    Figure: Cross-Section & Ray Optics of the Human Eyeball
                  </span>
                  <p className={`text-sm font-semibold font-sans ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Refracting interfaces, adjustable natural lens, and retina. High-contrast textbook schematic.
                  </p>
                </div>

                <div className="flex flex-col space-y-8">
                  
                  {/* Interactive Diagram SVG (Centered, Full Width, Highly readable labels) */}
                  <div className={`flex justify-center p-6 rounded-2xl border transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-850'}`}>
                    <svg width="100%" height="450" viewBox="-140 0 670 360" className={`rounded-xl overflow-visible transition-colors duration-300 ${isLightMode ? 'bg-[#f8fafc]' : 'bg-[#050912]'}`}>
                      <defs>
                        {/* Gradients */}
                        <radialGradient id="retinaGrad" cx="50%" cy="50%" r="50%">
                          <stop offset="65%" stopColor={isLightMode ? "#f8fafc" : "#050912"} stopOpacity="0" />
                          <stop offset="90%" stopColor="#fca5a5" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
                        </radialGradient>
                        <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={isLightMode ? "#bae6fd" : "#e0f2fe"} stopOpacity="0.5" />
                          <stop offset="50%" stopColor={isLightMode ? "#e0f2fe" : "#f0f9ff"} stopOpacity="0.9" />
                          <stop offset="100%" stopColor={isLightMode ? "#0284c7" : "#38bdf8"} stopOpacity="0.6" />
                        </linearGradient>
                        <marker id="pointerDot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4">
                          <circle cx="5" cy="5" r="4" fill={isLightMode ? "#475569" : "#cbd5e1"} />
                        </marker>
                        <marker id="eyeRayArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0,0 L 10,5 L 0,10 Z" fill={isLightMode ? "#e11d48" : "#fb7185"} />
                        </marker>
                      </defs>

                      {/* Eyeball thick solid Sclera wall with optic nerve opening */}
                      <path d="M 160,100 A 110,110 0 0,1 345,215 L 380,260 L 368,268 L 333,225 A 110,110 0 0,1 160,260" fill={isLightMode ? "#e2e8f0" : "#0d1527"} stroke={isLightMode ? "#475569" : "#334155"} strokeWidth="9" strokeLinecap="round" />
                      
                      {/* Choroid lining (Red-brown vascular layer) */}
                      <path d="M 161,105 A 105,105 0 0,1 337,218 Q 343,230 350,235" fill="none" stroke={isLightMode ? "#dc2626" : "#991b1b"} strokeWidth="2.5" />
                      
                      {/* Shaded retina glow overlay */}
                      <path d="M 162,110 A 100,100 0 0,1 330,210 C 270,270 190,230 162,110 Z" fill="url(#retinaGrad)" opacity="0.45" pointerEvents="none" />
                      
                      {/* Cornea bulge at the front */}
                      <path d="M 160,100 C 110,130 110,230 160,260" fill="none" stroke={isLightMode ? "#0891b2" : "#22d3ee"} strokeWidth="5.5" strokeLinecap="round" />
                      <path d="M 160,105 C 117,133 117,227 160,255" fill="none" stroke={isLightMode ? "#0891b2" : "#22d3ee"} strokeWidth="2" strokeOpacity="0.4" />
                      
                      {/* Aqueous Humor chamber (fill) */}
                      <path d="M 160,100 C 110,130 110,230 160,260 C 165,240 170,180 170,180 C 170,180 165,120 160,100 Z" fill={isLightMode ? "#06b6d4" : "#22d3ee"} fillOpacity="0.08" />

                      {/* Crystalline Double Convex Lens */}
                      <path d="M 183,142 C 174,154 174,206 183,218 C 192,206 192,154 183,142 Z" fill="url(#lensGrad)" stroke={isLightMode ? "#0284c7" : "#f8fafc"} strokeWidth="2.5" strokeOpacity="0.9" />
                      
                      {/* Iris (pupil shutters) */}
                      <line x1="160" y1="100" x2="171" y2="142" stroke="#4f46e5" strokeWidth="7" strokeLinecap="round" />
                      <line x1="157" y1="102" x2="168" y2="142" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                      <line x1="160" y1="260" x2="171" y2="218" stroke="#4f46e5" strokeWidth="7" strokeLinecap="round" />
                      <line x1="157" y1="258" x2="168" y2="218" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Ciliary Muscles & suspension ligaments */}
                      <path d="M 160,100 C 172,108 180,126 183,142" fill="none" stroke={isLightMode ? "#e11d48" : "#fb7185"} strokeWidth="3.5" strokeLinecap="round" />
                      <path d="M 160,260 C 172,252 180,234 183,218" fill="none" stroke={isLightMode ? "#e11d48" : "#fb7185"} strokeWidth="3.5" strokeLinecap="round" />
                      <line x1="179" y1="142" x2="183" y2="142" stroke={isLightMode ? "#475569" : "#cbd5e1"} strokeWidth="1.5" />
                      <line x1="179" y1="218" x2="183" y2="218" stroke={isLightMode ? "#475569" : "#cbd5e1"} strokeWidth="1.5" />

                      {/* Optic Nerve bundle exiting at rear */}
                      <g stroke={isLightMode ? "#b45309" : "#eab308"} strokeWidth="1.5" strokeOpacity="0.8" strokeDasharray="3 2" fill="none">
                        <path d="M 330,225 Q 360,250 380,272" />
                        <path d="M 338,220 Q 365,247 385,268" />
                      </g>

                      {/* Fovea centralis / yellow spot segment */}
                      <circle cx="350" cy="180" r="5" fill={isLightMode ? "#ca8a04" : "#facc15"} stroke={isLightMode ? "#475569" : "#ffffff"} strokeWidth="1.5" />

                      {/* Blind Spot gap */}
                      <circle cx="340" cy="212" r="5" fill={isLightMode ? "#dc2626" : "#f43f5e"} stroke={isLightMode ? "#475569" : "#ffffff"} strokeWidth="1.5" />

                      {/* High-contrast Laser light rays focusing */}
                      {/* Ray 1 */}
                      <path d="M 10,135 L 135,138" fill="none" stroke={isLightMode ? "#e11d48" : "#fb7185"} strokeWidth="3" markerEnd="url(#eyeRayArrow)" />
                      <path d="M 135,138 L 183,148 L 350,180" fill="none" stroke={isLightMode ? "#e11d48" : "#fb7185"} strokeWidth="3" />
                      {/* Ray 2 (Optical axis trace) */}
                      <path d="M 10,180 L 132,180 L 183,180 L 350,180" fill="none" stroke={isLightMode ? "#0284c7" : "#38bdf8"} strokeWidth="2.5" strokeDasharray="5 4" opacity="0.8" />
                      {/* Ray 3 */}
                      <path d="M 10,240 L 135,237" fill="none" stroke={isLightMode ? "#e11d48" : "#fb7185"} strokeWidth="3" markerEnd="url(#eyeRayArrow)" />
                      <path d="M 135,237 L 183,227 L 350,180" fill="none" stroke={isLightMode ? "#e11d48" : "#fb7185"} strokeWidth="3" />

                      {/* Focus marker spot */}
                      <circle cx="350" cy="180" r="4.5" fill="#10b981" />

                      {/* Annotations & labels with callout pointer lines shifted outwards */}
                      <g stroke={isLightMode ? "#475569" : "#64748b"} strokeWidth="1.8" fill="none" opacity="0.95">
                        {/* Cornea pointer */}
                        <path d="M 120,180 L 70,130 L -25,130" markerStart="url(#pointerDot)" />
                        {/* Aqueous Humor pointer */}
                        <path d="M 145,205 L 85,255 L -25,255" markerStart="url(#pointerDot)" />
                        {/* Pupil pointer */}
                        <path d="M 166,180 L 105,175 L -25,175" markerStart="url(#pointerDot)" />
                        {/* Iris pointer */}
                        <path d="M 164,125 L 100,85 L -25,85" markerStart="url(#pointerDot)" />
                        {/* Crystalline Lens pointer */}
                        <path d="M 182,165 L 215,50 L 390,50" markerStart="url(#pointerDot)" />
                        {/* Retina pointer */}
                        <path d="M 325,125 L 365,75 L 390,75" markerStart="url(#pointerDot)" />
                        {/* Sclera pointer */}
                        <path d="M 255,96 L 315,105 L 390,105" markerStart="url(#pointerDot)" />
                        {/* Yellow Spot fovea pointer */}
                        <path d="M 350,180 L 375,155 L 390,155" markerStart="url(#pointerDot)" />
                        {/* Blind Spot pointer */}
                        <path d="M 340,212 L 375,222 L 390,222" markerStart="url(#pointerDot)" />
                        {/* Optic Nerve pointer */}
                        <path d="M 360,240 L 375,265 L 390,265" markerStart="url(#pointerDot)" />
                        {/* Vitreous Humor pointer */}
                        <path d="M 260,210 L 310,310 L 390,310" markerStart="url(#pointerDot)" />
                      </g>

                      {/* Text overlays with color coding and clear functions - Increased size (14px) & crisp rendering */}
                      <g className="font-sans font-black text-[14px] tracking-wider select-none">
                        {/* Left column labels */}
                        <text x="-30" y="134" fill={isLightMode ? "#0891b2" : "#22d3ee"} textAnchor="end">CORNEA</text>
                        <text x="-30" y="89" fill={isLightMode ? "#4f46e5" : "#a78bfa"} textAnchor="end">IRIS</text>
                        <text x="-30" y="179" fill={isLightMode ? "#0f172a" : "#e2e8f0"} textAnchor="end">PUPIL</text>
                        <text x="-30" y="259" fill={isLightMode ? "#0369a1" : "#38bdf8"} textAnchor="end">AQUEOUS HUMOR</text>

                        {/* Right column labels */}
                        <text x="395" y="54" fill={isLightMode ? "#0c4a6e" : "#f8fafc"} textAnchor="start">CRYSTALLINE LENS</text>
                        <text x="395" y="79" fill={isLightMode ? "#be123c" : "#fca5a5"} textAnchor="start">RETINA</text>
                        <text x="395" y="109" fill={isLightMode ? "#334155" : "#cbd5e1"} textAnchor="start">SCLERA</text>
                        <text x="395" y="159" fill={isLightMode ? "#a16207" : "#fbbf24"} textAnchor="start">YELLOW SPOT</text>
                        <text x="395" y="226" fill={isLightMode ? "#9f1239" : "#f43f5e"} textAnchor="start">BLIND SPOT</text>
                        <text x="395" y="269" fill={isLightMode ? "#475569" : "#94a3b8"} textAnchor="start">OPTIC NERVE</text>
                        <text x="395" y="314" fill={isLightMode ? "#0369a1" : "#38bdf8"} textAnchor="start">VITREOUS HUMOR</text>
                      </g>
                    </svg>
                  </div>

                  {/* Descriptions from Various Textbooks & Sources - Placed underneath in a professional grid */}
                  <div className="space-y-3">
                    <span className={`text-sm font-mono font-black uppercase tracking-wide block ${isLightMode ? 'text-slate-700' : 'text-slate-400'}`}>
                      🔍 Detailed Part-by-Part Anatomical & Optical Function Guide
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: "Cornea", color: isLightMode ? "text-cyan-700" : "text-cyan-400", use: "A thin, tough transparent spherical membrane covering the front. It accounts for about 70-80% of total light refraction. It has a high optical refractive index (n ≈ 1.376)." },
                        { name: "Aqueous Humor", color: isLightMode ? "text-cyan-750" : "text-cyan-300", use: "Clear, salty watery fluid (n = 1.336) in the front chamber. It provides oxygen and essential nutrients to the lens and maintains intraocular pressure (~15 mmHg)." },
                        { name: "Iris & Pupil", color: isLightMode ? "text-indigo-700" : "text-[#a78bfa]", use: "The Iris is a dark, circular muscular diaphragm that controls pupil diameter. The Pupil is the dark central aperture. Under bright light, the iris contracts the pupil; in faint light, it dilates/expands the pupil to adapt." },
                        { name: "Crystalline Lens", color: isLightMode ? "text-blue-800" : "text-white", use: "A flexible, fibrous, gelatinous biconvex lens (n varies from 1.386 in outer layers to 1.406 in the core). It acts as a fine-tuning system to adjust image focus perfectly onto the retina." },
                        { name: "Ciliary Muscles", color: isLightMode ? "text-rose-700" : "text-rose-400", use: "A ring of elastic smooth muscles that hold the lens. By contracting or relaxing, they alter the curvature shape of the focal lens, which adjusts its focal length." },
                        { name: "Vitreous Humor", color: isLightMode ? "text-sky-700" : "text-blue-300", use: "A clean, jelly-like transparent fluid (99% water, 1% collagen, n = 1.336) filling the main inner eyeball. It maintains the spherical shape of the eyeball." },
                        { name: "Retina", color: isLightMode ? "text-red-700" : "text-red-400", use: "The inner light-sensitive membrane. Acts as a curved digital sensor containing 125 million Rods (which detect twilight, dim light, black/white shapes) and 7 million Cones (which resolve bright colors, fine details, and sharp contrasts)." },
                        { name: "Yellow Spot (Macula / Fovea)", color: isLightMode ? "text-yellow-700" : "text-yellow-400", use: "A tiny shallow depression in the exact optical center of the retina. Packed almost entirely with cones. It offers the absolute highest visual acuity (resolution)." },
                        { name: "Blind Spot", color: isLightMode ? "text-rose-800" : "text-rose-400", use: "The critical region where the optic nerve bundle exits the eyeball. It contains absolutely no photoreceptor cells (no vision is possible here)." }
                      ].map((p, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border transition-colors duration-300 flex flex-col space-y-1.5 ${isLightMode ? 'bg-slate-50/50 border-slate-200 hover:bg-slate-100' : 'bg-slate-950/60 border-slate-850 hover:bg-slate-950'}`}>
                          <span className={`text-base font-black uppercase tracking-wider ${p.color}`}>{p.name}</span>
                          <p className={`text-xs md:text-sm font-semibold leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                            {p.use}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* HOW THE EYE WORKS & ACCOMODATION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className={`border p-6 rounded-3xl space-y-4 transition-all duration-300 shadow-sm ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <h3 className={`text-base font-black uppercase font-mono tracking-wide flex items-center gap-1.5 ${isLightMode ? 'text-indigo-800' : 'text-cyan-300'}`}>
                    <Info className="w-4 h-4 text-cyan-500" /> Power of Accommodation (Self-Focusing)
                  </h3>
                  <p className={`text-sm md:text-base leading-relaxed font-medium ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                    Unlike mechanical camera lenses which must move forward or backward to focus, the human crystalline lens is organic and flexible. The ciliary muscles adjust its shape to focus light on the retina:
                  </p>
                  
                  <div className="space-y-3.5 text-sm md:text-base font-semibold">
                    <div className={`p-4 rounded-xl border transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-850'}`}>
                      <span className="text-yellow-500 font-bold font-mono text-sm uppercase">1. VIEWING DISTANT OBJECTS (Relaxed Muscles)</span>
                      <p className={`mt-2 leading-relaxed text-xs md:text-sm font-medium ${isLightMode ? 'text-slate-650' : 'text-slate-300'}`}>
                        Ciliary muscles are relaxed &rarr; suspensory ligaments become tight &rarr; the lens is pulled thin and flat &rarr; focal length increases to its maximum value (~2.5 cm, matching the eyeball length). This allows parallel beams of light from infinity to focus cleanly on the retina without eye strain.
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl border transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-850'}`}>
                      <span className="text-rose-500 font-bold font-mono text-sm uppercase">2. VIEWING NEAR OBJECTS (Contracted Muscles)</span>
                      <p className={`mt-2 leading-relaxed text-xs md:text-sm font-medium ${isLightMode ? 'text-slate-650' : 'text-slate-300'}`}>
                        Ciliary muscles contract &rarr; suspensory ligaments loosen &rarr; the elastic lens bulges into a thick, highly convex shape &rarr; focal length decreases. This allows diverging rays of light from a nearby object to converge sharply onto the retina.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`border p-6 rounded-3xl space-y-4 transition-all duration-300 shadow-sm ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <h3 className={`text-base font-black uppercase font-mono tracking-wide flex items-center gap-1.5 ${isLightMode ? 'text-indigo-800' : 'text-amber-500'}`}>
                    <HelpCircle className="w-4 h-4 text-amber-500" /> Normal Retinal Range & Visual Limits
                  </h3>
                  <p className={`text-sm md:text-base leading-relaxed font-medium ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                    A healthy normal human eye has strict optical limit boundaries to stay sharp without strain:
                  </p>

                  <div className="space-y-4 text-xs md:text-sm font-medium leading-relaxed pt-2 pl-1.5">
                    <div className="flex gap-2.5">
                      <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full mt-1.5 shrink-0" />
                      <div>
                        <b className={isLightMode ? "text-slate-900 font-bold text-sm md:text-base" : "text-white text-sm md:text-base"}>Near Point (Least Distance of Distinct Vision, D):</b> 
                        <span className={`block mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>The minimum distance at which an object can be seen perfectly clearly without any fatigue. For a normal young adult, <code className="text-cyan-500 font-mono font-black text-sm">D = 25 cm</code>. It increases as ciliary ligaments age (Presbyopia).</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full mt-1.5 shrink-0" />
                      <div>
                        <b className={isLightMode ? "text-slate-900 font-bold text-sm md:text-base" : "text-white text-sm md:text-base"}>Far Point:</b> 
                        <span className={`block mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>The maximum distance up to which the eye can see objects clearly. For a normal eye, the far point is at <code className="text-blue-500 font-mono font-black text-sm">Infinity (∞)</code>.</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full mt-1.5 shrink-0" />
                      <div>
                        <b className={isLightMode ? "text-slate-900 font-bold text-sm md:text-base" : "text-white text-sm md:text-base"}>Persistence of Vision:</b> 
                        <span className={`block mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>When an image falls on the retina, the signal persists in the brain for about <code className="text-yellow-600 font-mono font-black text-sm">1/16th of a second</code>. If images flash quicker than this, we perceive seamless movement (the foundation of video and cinema!).</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* INTERACTIVE VISION DEFECTS MECHANICS SIMULATOR */}
              <div className={`border rounded-3xl p-6 transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`} id="interactive-eye-defect-simulator">
                <div className={`flex flex-col md:flex-row items-center justify-between border-b pb-4 mb-6 gap-4 ${isLightMode ? 'border-slate-150' : 'border-slate-800'}`}>
                  <div className="flex items-center gap-1.5 self-start">
                    <Compass className="w-5 h-5 text-indigo-500" />
                    <div>
                      <h4 className={`text-xs font-black uppercase font-mono tracking-wider ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>Interactive Defect & Ray Tracer</h4>
                      <p className={`text-[10px] font-semibold font-sans mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Select a state to trace how refraction focus displacements trigger defects and corrective specs.</p>
                    </div>
                  </div>

                  {/* Mode select tabs */}
                  <div className={`flex flex-wrap gap-1 p-1 rounded-xl border ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 p-1 rounded-xl border border-slate-850'}`}>
                    {[
                      { id: 'normal', label: "Normal Eye" },
                      { id: 'myopia', label: "Myopia (Blurred)" },
                      { id: 'myopia-corrected', label: "Myopia (Concave Corrected)" },
                      { id: 'hypermetropia', label: "Hypermetropia (Blurred)" },
                      { id: 'hypermetropia-corrected', label: "Hypermetropia (Convex Corrected)" }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => setEyeDefectMode(mode.id as any)}
                        className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg border transition-all cursor-pointer font-sans ${
                          eyeDefectMode === mode.id
                            ? "bg-indigo-600 border-indigo-500 text-white active:scale-95 shadow-sm"
                            : isLightMode
                              ? "bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                              : "bg-transparent border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Dynamic Ray Tracer representation of Eyeball */}
                  <div className={`lg:col-span-7 flex justify-center p-4 rounded-2xl border overflow-hidden relative transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-850'}`}>
                    <div className="absolute top-2 left-3">
                      <span className={`text-[9px] font-mono font-black border px-2 py-0.5 rounded uppercase ${isLightMode ? 'text-slate-600 border-slate-200 bg-white shadow-xs' : 'text-slate-400 border-slate-800 bg-slate-900/40'}`}>
                        Active Simulation State: {eyeDefectMode.replace('-', ' ')}
                      </span>
                    </div>

                    <svg width="100%" height="260" viewBox="0 0 340 200" className={`rounded-xl overflow-visible transition-colors duration-300 ${isLightMode ? 'bg-[#f8fafc]' : 'bg-[#050912]'}`}>
                      {/* Principal axis */}
                      <line x1="10" y1="100" x2="330" y2="100" stroke={isLightMode ? "#cbd5e1" : "#1e293b"} strokeDasharray="3,2" />

                      {/* Eyeball profile path */}
                      <path d="M 160,30 A 70,70 0 1,1 160,170 C 163,142 188,135 188,100 C 188,65 163,58 160,30 Z" fill={isLightMode ? "#e2e8f0" : "#080e1a"} stroke={isLightMode ? "#64748b" : "#334155"} strokeWidth="1.5" />
                      
                      {/* Retina */}
                      <path d="M 156,30 A 70,70 0 0,1 156,170" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.4" />
                      <text x="210" y="55" fill={isLightMode ? "#be123c" : "#fca5a5"} fontSize="9" fontFamily="monospace" opacity="0.8" fontWeight="bold">RETINA</text>

                      {/* Cornea bulge */}
                      <path d="M 160,30 C 140,50 132,70 132,100 C 132,130 140,150 160,170" fill="none" stroke={isLightMode ? "#0891b2" : "#22d3ee"} strokeWidth="2" />

                      {/* Crystalline Lens */}
                      <path d="M 170,72 C 166,78 166,122 170,128 C 174,122 174,78 170,72 Z" fill="url(#lensGrad)" fillOpacity="0.4" stroke={isLightMode ? "#0284c7" : "#ffffff"} strokeWidth="1.2" />

                      {/* Corrective Spectacle lens (rendered only in corrected modes) */}
                      {(eyeDefectMode === 'myopia-corrected') && (
                        <g>
                          {/* Concave specifications glass */}
                          <path d="M 95,70 L 102,70 L 102,130 L 95,130 C 98,115 98,85 95,70 Z" fill={isLightMode ? "#0284c7" : "#38bdf8"} fillOpacity="0.1" stroke={isLightMode ? "#0284c7" : "#38bdf8"} strokeWidth="1.5" />
                          <text x="98" y="62" fill={isLightMode ? "#0284c7" : "#38bdf8"} fontSize="8.5" fontFamily="monospace" fontWeight="black" textAnchor="middle">CONCAVE SPEC LENS</text>
                        </g>
                      )}

                      {(eyeDefectMode === 'hypermetropia-corrected') && (
                        <g>
                          {/* Convex specifications glass */}
                          <path d="M 95,75 C 102,85 102,115 95,125 C 92,115 92,85 95,75 Z" fill={isLightMode ? "#0284c7" : "#38bdf8"} fillOpacity="0.1" stroke={isLightMode ? "#0284c7" : "#38bdf8"} strokeWidth="1.5" />
                          <text x="95" y="65" fill={isLightMode ? "#0284c7" : "#38bdf8"} fontSize="8.5" fontFamily="monospace" fontWeight="black" textAnchor="middle">CONVEX SPEC LENS</text>
                        </g>
                      )}

                      {/* Dynamic Ray tracing trajectories */}
                      {(() => {
                        let pathD1 = "";
                        let pathD2 = "";
                        let focusCx = 227; // Retina coordinate boundary

                        if (eyeDefectMode === 'normal') {
                          // Converges exactly on Retina
                          focusCx = 226;
                          pathD1 = "M 15,75 L 132,75 L 170,75 L 226,100";
                          pathD2 = "M 15,125 L 132,125 L 170,125 L 226,100";
                        } else if (eyeDefectMode === 'myopia') {
                          // Converges in front of the retina
                          focusCx = 198;
                          pathD1 = "M 15,75 L 132,75 L 170,75 L 198,100 L 226,112";
                          pathD2 = "M 15,125 L 132,125 L 170,125 L 198,100 L 226,88";
                        } else if (eyeDefectMode === 'myopia-corrected') {
                          // Diverges through concave lens, then converges perfectly
                          focusCx = 226;
                          pathD1 = "M 15,75 L 98,75 L 132,68 L 170,72 L 226,100";
                          pathD2 = "M 15,125 L 98,125 L 132,132 L 170,128 L 226,100";
                        } else if (eyeDefectMode === 'hypermetropia') {
                          // Converges behind retina
                          focusCx = 255;
                          pathD1 = "M 15,75 L 132,77 L 170,79 L 226,92 L 255,100";
                          pathD2 = "M 15,125 L 132,123 L 170,121 L 226,108 L 255,100";
                        } else if (eyeDefectMode === 'hypermetropia-corrected') {
                          // Pre-converges through convex, then converges perfectly
                          focusCx = 226;
                          pathD1 = "M 15,75 L 95,75 L 132,82 L 170,80 L 226,100";
                          pathD2 = "M 15,125 L 95,125 L 132,118 L 170,120 L 226,100";
                        }

                        return (
                          <g>
                            {/* Rays */}
                            <path d={pathD1} fill="none" stroke={isLightMode ? "#ea580c" : "#facc15"} strokeWidth="1.8" />
                            <path d={pathD2} fill="none" stroke={isLightMode ? "#ea580c" : "#facc15"} strokeWidth="1.8" />

                            {/* Arrowheads for ray input */}
                            <polygon points="65,75 59,71 61,79" fill={isLightMode ? "#ea580c" : "#facc15"} />
                            <polygon points="65,125 59,121 61,129" fill={isLightMode ? "#ea580c" : "#facc15"} />

                            {/* Focus spot marker */}
                            <circle cx={focusCx} cy={100} r="4" fill="#10b981" stroke="white" strokeWidth="0.8" className="animate-ping" />
                            <circle cx={focusCx} cy={100} r="3" fill="#10b981" stroke="white" strokeWidth="0.5" />
                          </g>
                        );
                      })()}

                    </svg>
                  </div>

                  {/* Scientific descriptions based on medical physics */}
                  <div className="lg:col-span-5 space-y-3 font-sans">
                    {eyeDefectMode === 'normal' && (
                      <div className={`p-5 border rounded-2xl space-y-2 transition-colors duration-300 ${isLightMode ? 'bg-green-50/50 border-green-200' : 'bg-slate-950 border-green-500/10'}`}>
                        <span className="text-sm font-black uppercase text-green-600 font-mono tracking-wider block">👁️ Normal Emmetropic Eye</span>
                        <p className={`text-xs leading-relaxed font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                          Parallel light beams coming from distant subjects focus squarely on the back retinal plane without putting any operational strain on ciliary muscles. Images formed are razor-sharp.
                        </p>
                      </div>
                    )}

                    {eyeDefectMode === 'myopia' && (
                      <div className={`p-5 border rounded-2xl space-y-2.5 transition-colors duration-300 ${isLightMode ? 'bg-rose-50/50 border-rose-200' : 'bg-slate-955 border-rose-500/10 bg-slate-950'}`}>
                        <span className="text-sm font-black uppercase text-rose-600 font-mono tracking-wider block">👓 Myopia (ShortSightedness)</span>
                        <p className={`text-xs leading-relaxed font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                          <b>Defect:</b> The person can see near objects wonderfully clearly from 25 cm, but distant landscapes appear blurry.
                        </p>
                        <ul className={`list-disc pl-4 text-[11px] space-y-1 font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                          <li><b>Causes:</b> High refractive convergence of the lens (excess curvature) or excessive elongation of the physical eyeball.</li>
                          <li><b>Optical state:</b> Focus point collapses <b>in front of</b> the retina (inside the vitreous humor).</li>
                          <li><b>Far point:</b> Moves closer than infinity.</li>
                        </ul>
                      </div>
                    )}

                    {eyeDefectMode === 'myopia-corrected' && (
                      <div className={`p-5 border rounded-2xl space-y-2.5 transition-colors duration-300 ${isLightMode ? 'bg-cyan-50/50 border-cyan-200' : 'bg-slate-955 border-cyan-500/10 bg-slate-950'}`}>
                        <span className="text-sm font-black uppercase text-cyan-600 font-mono tracking-wider block">🤓 Myopia Spectacle Correction</span>
                        <p className={`text-xs leading-relaxed font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                          <b>Correction Spectacle:</b> A **Concave (diverging) lens** of suitable power is mounted in front.
                        </p>
                        <p className={`text-[11px] font-semibold leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                          <b>How it works:</b> The concave spectacles diverge the incoming parallel lights slightly *before* entering. When this pre-diverged beam passes through the eye's over-curved lens, the converging system bends it by the exact right degree to focus cleanly back onto the retina.
                        </p>
                        <div className={`px-2.5 py-1.5 rounded font-mono text-[11px] font-bold ${isLightMode ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-900 text-cyan-300'}`}>
                          Required focal length (f) = -d (far point distance)
                        </div>
                      </div>
                    )}

                    {eyeDefectMode === 'hypermetropia' && (
                      <div className={`p-5 border rounded-2xl space-y-2.5 transition-colors duration-300 ${isLightMode ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-955 border-amber-500/10 bg-slate-950'}`}>
                        <span className="text-sm font-black uppercase text-amber-600 font-mono tracking-wider block">🔍 Hypermetropia (LongSightedness)</span>
                        <p className={`text-xs leading-relaxed font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                          <b>Defect:</b> Distant stars are easily resolved, but opening a textbook at 25 cm looks terribly blurry.
                        </p>
                        <ul className={`list-disc pl-4 text-[11px] space-y-1 font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                          <li><b>Causes:</b> Insufficient convergence power of the lens (focal length is too long) or the eyeball is too short.</li>
                          <li><b>Optical state:</b> Focal path intersects <b>behind</b> the retina.</li>
                          <li><b>Near point:</b> Slides further away than standard 25 cm (can move to 1 meter or more).</li>
                        </ul>
                      </div>
                    )}

                    {eyeDefectMode === 'hypermetropia-corrected' && (
                      <div className={`p-5 border rounded-2xl space-y-2.5 transition-colors duration-300 ${isLightMode ? 'bg-cyan-50/50 border-cyan-200' : 'bg-slate-955 border-cyan-500/10 bg-slate-950'}`}>
                        <span className="text-sm font-black uppercase text-cyan-600 font-mono tracking-wider block">🤓 Hypermetropia Spectacle Correction</span>
                        <p className={`text-xs leading-relaxed font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                          <b>Correction Spectacle:</b> A **Convex (converging) lens** of correct density is specified.
                        </p>
                        <p className={`text-[11px] font-semibold leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                          <b>How it works:</b> The convex spectacles pre-converge the beams of light slightly. The eye's weak lens can then handle the rest of the work and guide the focus point safely forward onto the retina surface.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>


              {/* EXTENDED EYE DEFECTS ACCORDING TO ACADEMIC RESEARCH (PRESBOPYA, ASTIGMATISM, CATARACT) */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <span className="text-sm font-black uppercase text-amber-500 font-mono tracking-wider block">📝 Additional Complex Refractive & Pathology Defects</span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="bg-slate-955 p-4 rounded-xl border border-slate-850 space-y-1.5 font-sans bg-slate-950">
                    <h5 className="font-bold text-slate-100 text-xs text-indigo-300">1. Presbyopia (Old-Age Sight)</h5>
                    <p className="text-slate-400 text-[10.5px] leading-relaxed font-semibold">
                      <b>Symptoms:</b> Progressive loss of active eye near-focus capacity with age.
                    </p>
                    <p className="text-[10.5px] text-slate-405 leading-relaxed font-medium text-slate-400">
                      <b>Physics Cause:</b> Due to the aging hardening of the ciliary muscle tissues and decreasing flexibility of the crystalline lens shell.
                    </p>
                    <p className="text-[10px] bg-slate-900 p-1.5 rounded text-yellow-400 font-mono font-bold">
                      Remedy: Bifocal lenses (Concave top for distance, Convex bottom for reading).
                    </p>
                  </div>

                  <div className="bg-slate-955 p-4 rounded-xl border border-slate-850 space-y-1.5 font-sans bg-slate-950">
                    <h5 className="font-bold text-slate-100 text-xs text-indigo-300">2. Astigmatism (Non-Spherical Error)</h5>
                    <p className="text-slate-400 text-[10.5px] leading-relaxed font-semibold">
                      <b>Symptoms:</b> Blurred horizontal lines or vertical structures at the same distance, general visual distortion.
                    </p>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed font-medium">
                      <b>Physics Cause:</b> Cornea has irregular, asymmetric curvature (looks more like a rugby ball than a soccer ball).
                    </p>
                    <p className="text-[10px] bg-slate-900 p-1.5 rounded text-yellow-400 font-mono font-bold">
                      Remedy: Specs made of highly tailored Cylindrical lenses.
                    </p>
                  </div>

                  <div className="bg-slate-955 p-4 rounded-xl border border-slate-850 space-y-1.5 font-sans bg-slate-950">
                    <h5 className="font-bold text-slate-100 text-xs text-indigo-300">3. Cataract (Lens Opacity)</h5>
                    <p className="text-slate-400 text-[10.5px] leading-relaxed font-semibold">
                      <b>Symptoms:</b> Gradual total dimming or cloudiness of vision, resembling looking through a frosted window.
                    </p>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed font-medium">
                      <b>Physics Cause:</b> Protein molecules in the crystalline lens break down and clump together, scattering and blocking incoming light.
                    </p>
                    <p className="text-[10px] bg-slate-900 p-1.5 rounded text-yellow-405 font-mono font-bold text-yellow-400">
                      Remedy: Surgical replacement with an acrylic Intraocular Lens (IOL).
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ────── TOPIC 15: HUMAN EYE END ────── */}

          {/* ────── CLASS VIII TOPIC 3: REGULAR & DIFFUSED REFLECTION ────── */}
          {activeTopic === 'regular-diffused' && (
            <div className="space-y-6 animate-fade-in" id="topic-regular-diffused">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <span className="text-xs uppercase font-mono font-black tracking-widest text-[#22d3ee] bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20 inline-block">
                  Class VIII CBSE Topic 3
                </span>
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Regular and Diffused Reflection
                </h1>
                <p className="text-slate-300 text-xs font-semibold">
                  Understand the micro-surface physics explaining why we see a clear reflection in smooth polish but not on cardboard.
                </p>
              </div>

              {/* CORE DEFINITIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 md:space-y-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-cyan-500 text-slate-950 font-black p-1 rounded font-mono">TYPE A</span>
                    <h4 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Regular Reflection</h4>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed font-semibold">
                    Occurs when parallel ray beams hit a perfectly smooth, polished boundary surface like standard looking mirrors. Since surface normal vectors at all points are exactly parallel, all reflected light rays bounce off parallel to each other. This perfect geometric replication produces sharp, focused virtual image replicas.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-rose-500 text-white font-black p-1 rounded font-mono">TYPE B</span>
                    <h4 className="text-sm font-black uppercase tracking-wider text-rose-300 font-mono">Diffused / Irregular Reflection</h4>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed font-semibold">
                    Occurs on micro-surfaces with rough, uneven terrain (like paper texture, walls, or wood sheets). Even though each light ray obeys the laws of reflection individually, the irregular normals scatter the reflected rays in completely random paths. No visual image is formed, but it illuminates the object, making it visible from all angles!
                  </p>
                </div>
              </div>

              {/* INTERACTIVE COMPARISON SIMULATION */}
              <div className="bg-[#0b101d] border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-black text-slate-250 text-slate-100">Interactive Surface Simulator</h3>
                    <p className="text-xs text-slate-405 text-slate-400 font-semibold font-sans">Toggle between smooth mirror and bumpy surfaces to trace parallel rays.</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setGlossaryHighlight('smooth')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition duration-155 cursor-pointer ${
                        glossaryHighlight !== 'bumpy' ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Smooth Mirror
                    </button>
                    <button
                      onClick={() => setGlossaryHighlight('bumpy')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition duration-155 cursor-pointer ${
                        glossaryHighlight === 'bumpy' ? 'bg-rose-500 text-white font-black' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Rough Board
                    </button>
                  </div>
                </div>

                <div className="flex justify-center p-4 bg-slate-950/60 rounded-xl border border-slate-850">
                  <svg width="400" height="150" viewBox="0 0 400 150" className="w-full max-w-md">
                    {/* Surface Line base */}
                    {glossaryHighlight !== 'bumpy' ? (
                      // Smooth flat line
                      <line x1="20" y1="120" x2="380" y2="120" stroke="#06b6d4" strokeWidth="4" />
                    ) : (
                      // Rough bumpy path
                      <path d="M 20,120 Q 50,105 80,128 T 140,110 T 200,125 T 260,112 T 320,129 T 380,120" fill="none" stroke="#f43f5e" strokeWidth="4" />
                    )}

                    {/* Ray 1 */}
                    <g>
                      <path d="M 50,30 L 100,120" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="3 1" />
                      <path d="M 90,102 L 100,120 M 102,108 L 100,120" stroke="#eab308" strokeWidth="2" />
                      {glossaryHighlight !== 'bumpy' ? (
                        <path d="M 100,120 L 150,30" fill="none" stroke="#22d3ee" strokeWidth="2" />
                      ) : (
                        <path d="M 100,120 L 40,40" fill="none" stroke="#f43f5e" strokeWidth="2" />
                      )}
                    </g>

                    {/* Ray 2 */}
                    <g>
                      <path d="M 150,30 L 200,120" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="3 1" />
                      <path d="M 190,102 L 200,120 M 202,108 L 200,120" stroke="#eab308" strokeWidth="2" />
                      {glossaryHighlight !== 'bumpy' ? (
                        <path d="M 200,120 L 250,30" fill="none" stroke="#22d3ee" strokeWidth="2" />
                      ) : (
                        <path d="M 200,120 L 260,35" fill="none" stroke="#f43f5e" strokeWidth="2" />
                      )}
                    </g>

                    {/* Ray 3 */}
                    <g>
                      <path d="M 250,30 L 300,120" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="3 1" />
                      <path d="M 290,102 L 300,120 M 302,108 L 300,120" stroke="#eab308" strokeWidth="2" />
                      {glossaryHighlight !== 'bumpy' ? (
                        <path d="M 300,120 L 350,30" fill="none" stroke="#22d3ee" strokeWidth="2" />
                      ) : (
                        <path d="M 300,120 L 280,30" fill="none" stroke="#f43f5e" strokeWidth="2" />
                      )}
                    </g>
                  </svg>
                </div>
                <div className="text-center text-[11px] leading-relaxed text-slate-400 font-semibold italic">
                  {glossaryHighlight !== 'bumpy' 
                    ? "Parallel incident beams remain parallel after leaving. This perfect preservation enables standard reflections."
                    : "The bumpy boundary normals reflect rays in divergent, chaotic paths. Parallel alignment is lost, forming diffused reflections."}
                </div>
              </div>
            </div>
          )}

          {/* ────── CLASS VIII TOPIC 4: MULTIPLE REFLECTIONS ────── */}
          {activeTopic === 'multiple-reflection' && (
            <div className="space-y-6 animate-fade-in" id="topic-multiple-reflection">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <span className="text-xs uppercase font-mono font-black tracking-widest text-[#22d3ee] bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20 inline-block">
                  Class VIII CBSE Topic 4
                </span>
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Multiple Images & Kaleidoscope
                </h1>
                <p className="text-slate-300 text-xs font-semibold">
                  Calculate image multiplication based on mirror orientation angles and construct symmetric patterns.
                </p>
              </div>

              {/* CORE CONCEPTS */}
              <div className="bg-[#121c2e] border border-cyan-500/15 p-5 rounded-2xl space-y-3 font-sans">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">Multiple Reflection Concept</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  Since a plane mirror forms a virtual image behind its surface, placing two mirrors face-to-face allows the image of one mirror to act as a real object for the second mirror. This creates successive nested reflections. The exact number of visible images depends on the angle <code className="text-cyan-400 font-mono">θ</code> between them.
                </p>
                <div className="flex justify-center items-center py-3 bg-slate-950/60 rounded-xl border border-slate-850 font-mono text-cyan-400 font-semibold text-xs gap-1.5">
                  Formula: <span className="bg-cyan-500/10 px-2.5 py-1 rounded text-[#22d3ee] font-black">N = (360° / θ) - 1</span>
                </div>
              </div>

              {/* INTERACTIVE MULTIPLE REFLECTIONS CALCULATOR */}
              <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 font-mono text-center">Interactive Angle & Image Count Calculator</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                  <div className="space-y-3">
                    <span className="text-[11px] text-slate-400 font-bold block">Select Angle between mirrors (θ):</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[30, 45, 60, 90, 120, 180].map((angle) => (
                        <button
                          key={angle}
                          // Reuse combLens1F slot to save active theta angle state!
                          onClick={() => setCombLens1F(angle)}
                          className={`py-2 text-center text-xs font-black tracking-tight rounded-xl transition duration-150 cursor-pointer ${
                            (combLens1F === angle || (angle === 90 && combLens1F === 30 && !currentTopics.some(t => t.id === 'thick-lenses')))
                              ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-400/10' 
                              : 'bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-205'
                          }`}
                        >
                          {angle}°
                        </button>
                      ))}
                    </div>
                    
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-1 font-mono text-xs">
                      <p className="text-slate-400 font-sans font-bold">Calculation Summary:</p>
                      <p className="text-slate-300">Angle: <b className="text-cyan-400">{combLens1F === 30 || combLens1F === 45 || combLens1F === 60 || combLens1F === 90 || combLens1F === 120 || combLens1F === 180 ? combLens1F : 90}°</b></p>
                      <p className="text-slate-300">Images formed: <b className="text-emerald-400 text-sm">{(360 / (combLens1F === 30 || combLens1F === 45 || combLens1F === 60 || combLens1F === 90 || combLens1F === 120 || combLens1F === 180 ? combLens1F : 90)) - 1}</b></p>
                    </div>
                  </div>

                  {/* Tactile Reflection Mockup Canvas */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 flex flex-col items-center justify-center min-h-[160px] space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Reflected Image Matrix</span>
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-400 z-10 font-bold flex items-center justify-center text-[8px] text-slate-950">O</div>
                      
                      {Array.from({ length: (360 / (combLens1F === 30 || combLens1F === 45 || combLens1F === 60 || combLens1F === 90 || combLens1F === 120 || combLens1F === 180 ? combLens1F : 90)) - 1 }).map((_, i) => {
                        const ang = (combLens1F === 30 || combLens1F === 45 || combLens1F === 60 || combLens1F === 90 || combLens1F === 120 || combLens1F === 180 ? combLens1F : 90);
                        const rotation = (i + 1) * ang;
                        return (
                          <div
                            key={i}
                            className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400/40 border border-cyan-400/80 animate-pulse flex items-center justify-center text-[7px] text-white"
                            style={{
                              transform: `rotate(${rotation}deg) translate(0, -36px) rotate(-${rotation}deg)`
                            }}
                          >
                            I
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-500 text-center font-sans">O is the source object. I represent virtual reflective copies.</p>
                  </div>
                </div>
              </div>

              {/* KALEIDOSCOPE EXPLANATION */}
              <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-3">
                <span className="text-[10px] text-amber-400 uppercase font-mono font-black block">National CBSE Experiment: The Kaleidoscope</span>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  A <b>Kaleidoscope</b> is a classic tube toy that uses three glass mirrors positioned as an equilateral triangle structure (at 60° to each other). Putting broken chunks of colorful glass beads inside yields stellar pattern matrices:
                </p>
                <ol className="list-decimal pl-5 text-xs text-slate-400 space-y-1 font-semibold leading-relaxed">
                  <li>Light reflecting successive times among the three mirror surfaces builds gorgeous, hexagonal symmetric reflections.</li>
                  <li>Rotating or shaking the tube reorganizes beads randomly, creating completely new and unrepeatable symmetric designs every time!</li>
                </ol>
              </div>
            </div>
          )}

          {/* ────── CLASS VIII TOPIC 7: BRAILLE tactile aid ────── */}
          {activeTopic === 'braille' && (
            <div className="space-y-6 animate-fade-in" id="topic-braille">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <span className="text-xs uppercase font-mono font-black tracking-widest text-[#22d3ee] bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20 inline-block">
                  Class VIII CBSE Topic 7
                </span>
                <h1 className="text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  Visually Impaired & Braille System
                </h1>
                <p className="text-slate-300 text-xs font-semibold">
                  Learn about standard eye correction devices, vital eye hygiene, and the brilliant raised tactual coding of Louis Braille.
                </p>
              </div>

              {/* NATIONAL SYLLABUS ADVICE: CARE OF EYES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-3 font-sans">
                  <span className="text-[10px] text-cyan-400 uppercase font-mono font-black block">Tactile and Audio Assistive Aids</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    People with visual impairment can use tactile, mechanical, or virtual devices:
                  </p>
                  <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1.5">
                    <li><b>Non-Optical Aids:</b> Audio recordings (talking books), electronic screen readers, and tactile stick markers.</li>
                    <li><b>Optical Aids:</b> Convex lenses, magnifying mirrors, and spec frames matching user index requirements.</li>
                  </ul>
                </div>

                <div className="bg-[#1c180e] border border-amber-500/10 p-5 rounded-2xl space-y-3 font-sans">
                  <span className="text-[10px] text-amber-400 uppercase font-mono font-black block">Core Eye Health Instructions</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    Key CBSE guidelines to guard eyesight from degenerative syndromes:
                  </p>
                  <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1.5">
                    <li>Never read in extreme dimness or directly facing powerful flashlights.</li>
                    <li>Always read textbook notes at a normal structural clearance of ~<b>25 cm</b>.</li>
                    <li>Consume adequate <b>Vitamin A</b> (milky products, raw eggs, spinach, papayas). Visual vitamin deficiency triggers <b>Night Blindness</b>.</li>
                  </ul>
                </div>
              </div>

              {/* LOUIS BRAILLE INDUCTION SYSTEM */}
              <div className="bg-[#0d1424] border border-slate-500/15 p-5 rounded-2xl space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">The Braille Code</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    Louis Braille, himself a visually challenged scholar, constructed this tactile code in 1821. It represents symbols, characters, numbers, and basic mathematics matrices into a basic grid containing <b>6 tactile embossed dots</b>.
                  </p>
                </div>

                {/* Tactile Cell Interactive */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-5 space-y-3">
                    <span className="text-[10.5px] uppercase font-mono font-bold text-slate-400 block">Select a letter to feel:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => (
                        <button
                          key={letter}
                          // Reuse combLens2Type to map active letter selection slot:
                          // convex -> A, concave -> B, none/fallback for other custom states
                          onClick={() => {
                            if (letter === 'A') setCombLens2Type('convex');
                            else if (letter === 'B') setCombLens2Type('concave');
                            else if (letter === 'C') { setCombLens2Type('convex'); setCombLens2F(5); } // dummy slots
                            else if (letter === 'D') { setCombLens2Type('concave'); setCombLens2F(6); }
                            else if (letter === 'E') { setCombLens2Type('convex'); setCombLens2F(7); }
                            else { setCombLens2Type('concave'); setCombLens2F(8); }
                          }}
                          className={`py-2 text-center text-xs font-black rounded-lg transition cursor-pointer ${
                            (letter === 'A' && combLens2Type === 'convex' && combLens2F !== 5 && combLens2F !== 7) ||
                            (letter === 'B' && combLens2Type === 'concave' && combLens2F !== 6 && combLens2F !== 8) ||
                            (letter === 'C' && combLens2Type === 'convex' && combLens2F === 5) ||
                            (letter === 'D' && combLens2Type === 'concave' && combLens2F === 6) ||
                            (letter === 'E' && combLens2Type === 'convex' && combLens2F === 7) ||
                            (letter === 'F' && combLens2Type === 'concave' && combLens2F === 8)
                              ? 'bg-amber-400 text-slate-950 font-black' 
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-205'
                          }`}
                        >
                          Letter {letter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-7 flex flex-col items-center justify-center p-3.5 bg-slate-900/60 rounded-xl border border-slate-850 space-y-2">
                    <span className="text-[9.5px] text-slate-400 uppercase font-mono tracking-wider font-bold block">Tactile Braille Cell Rendering</span>
                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      {(() => {
                        // dots: [1, 2, 3, 4, 5, 6]
                        let activeDots = [1, 0, 0, 0, 0, 0]; // A
                        if (combLens2Type === 'concave' && combLens2F !== 6 && combLens2F !== 8) activeDots = [1, 1, 0, 0, 0, 0]; // B
                        else if (combLens2Type === 'convex' && combLens2F === 5) activeDots = [1, 0, 0, 1, 0, 0]; // C
                        else if (combLens2Type === 'concave' && combLens2F === 6) activeDots = [1, 0, 0, 1, 1, 0]; // D
                        else if (combLens2Type === 'convex' && combLens2F === 7) activeDots = [1, 0, 0, 0, 1, 0]; // E
                        else if (combLens2Type === 'concave' && combLens2F === 8) activeDots = [1, 1, 0, 1, 0, 0]; // F

                        return activeDots.map((dot, index) => (
                          <div
                            key={index}
                            className={`w-4.5 h-4.5 rounded-full transition-all duration-200 ${
                              dot === 1 
                                ? 'bg-amber-400 scale-125 shadow-md shadow-amber-300' 
                                : 'bg-slate-800 opacity-20 border border-slate-705'
                            }`}
                          />
                        ));
                      })()}
                    </div>
                    <p className="text-[9px] text-slate-500 italic mt-1 text-center font-sans">Bold amber colored circles represent raised tactual dot patterns.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

            {/* ────── BOTTOM BAR SIGN-OFF / PREVIOUS-NEXT BUTTONS ────── */}
          <div className={`border-t pt-6 flex items-center justify-between ${isLightMode ? 'border-slate-200' : 'border-slate-800/80'}`} id="learn-footer-links">
            <div className="flex gap-2">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase font-mono tracking-wider">Active Module:</span>
              <span className={`text-[10px] font-black uppercase font-mono ${isLightMode ? 'text-cyan-700' : 'text-[#22d3ee]'}`}>
                {currentTopics.find(t => t.id === activeTopic)?.title}
              </span>
            </div>
            
            {/* Quick action: jump straight to solving numeric quiz! */}
            <div className="flex items-center gap-2" id="learn-optics-navigation-helpers">
              <button
                onClick={() => {
                  const currentIndex = currentTopics.findIndex(t => t.id === activeTopic);
                  if (currentIndex > 0) {
                    setActiveTopic(currentTopics[currentIndex - 1].id);
                  } else {
                    setActiveTopic(currentTopics[currentTopics.length - 1].id); // loop to end
                  }
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[11px] cursor-pointer transition ${
                  isLightMode 
                    ? 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm' 
                    : 'bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700'
                }`}
              >
                <ChevronLeft className="w-3 h-3" />
                Previous Topic
              </button>
              {(() => {
                const currentIndex = currentTopics.findIndex(t => t.id === activeTopic);
                if (currentIndex < currentTopics.length - 1) {
                  return (
                    <button
                      onClick={() => {
                        setActiveTopic(currentTopics[currentIndex + 1].id);
                      }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[11px] cursor-pointer transition ${
                        isLightMode 
                          ? 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm' 
                          : 'bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-705'
                      }`}
                    >
                      Next Topic 
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  );
                } else if (onCompleteNotes) {
                  return (
                    <div className="flex flex-wrap gap-3 pb-2 justify-end w-full sm:w-auto">
                      <button
                        onClick={onCompleteNotes}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-[11.5px] cursor-pointer hover:from-emerald-450 hover:to-teal-450 shadow-md border border-emerald-400/30 shrink-0"
                      >
                        Complete & Go to Solved NCERT
                        <ChevronRight className="w-3.5 h-3.5 font-bold" />
                      </button>
                      {onGoToSelfAssessment && (
                        <button
                          onClick={onGoToSelfAssessment}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-[11.5px] cursor-pointer hover:from-cyan-350 hover:to-blue-450 shadow-md border border-cyan-400/30 shrink-0"
                        >
                          Take Self Assessment Quiz
                          <Award className="w-4 h-4 text-slate-950" />
                        </button>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <button
                      onClick={() => {
                        setActiveTopic(currentTopics[0].id); // loop back
                      }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[11px] cursor-pointer transition ${
                        isLightMode 
                          ? 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm' 
                          : 'bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-705'
                      }`}
                    >
                      Next Topic 
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  );
                }
              })()}
            </div>
          </div>

        </div>
      </main>

      {/* Dynamic Study Notes Print Overlay */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 print:p-0 print:static print:bg-white">
          <style dangerouslySetInnerHTML={{ __html: `
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @media screen {
              .study-notes-container {
                font-family: Calibri, Carlito, "Segoe UI", sans-serif !important;
                color: #0f172a !important;
                background-color: #ffffff !important;
                font-size: 17.5px !important;
                font-weight: 700 !important;
                line-height: 1.55 !important;
              }
              /* Headings & Text */
              .study-notes-container h1,
              .study-notes-container h2,
              .study-notes-container h3,
              .study-notes-container h4,
              .study-notes-container h5,
              .study-notes-container li,
              .study-notes-container p {
                font-family: Calibri, Carlito, "Segoe UI", sans-serif !important;
                font-weight: 700 !important;
              }
              .study-notes-container h1 {
                color: #0f172a !important;
                font-size: 34px !important;
                font-weight: 900 !important;
                margin-top: 4px !important;
                margin-bottom: 3px !important;
              }
              .study-notes-container h2 {
                color: #0f172a !important;
                font-size: 24px !important;
                font-weight: 850 !important;
                border-bottom: 2.5px solid #0f172a !important;
                padding-bottom: 2px !important;
                margin-top: 8px !important;
                margin-bottom: 3px !important;
              }
              .study-notes-container h3 {
                color: #0f172a !important;
                font-size: 20px !important;
                font-weight: 800 !important;
                margin-top: 6px !important;
                margin-bottom: 2px !important;
              }
              .study-notes-container p,
              .study-notes-container li {
                color: #0f172a !important;
                font-size: 17.5px !important;
                line-height: 1.55 !important;
                font-weight: 700 !important;
                margin-top: 0px !important;
                margin-bottom: 2px !important;
              }
              .study-notes-container ul,
              .study-notes-container ol {
                margin: 0px !important;
                padding-left: 20px !important;
              }
              .study-notes-container li {
                margin-bottom: 2px !important;
              }
              
              /* Squeeze excessive space-y spacing from Tailwind elements */
              .study-notes-container [class*="space-y-"] > :not([hidden]) ~ :not([hidden]) {
                margin-top: 4px !important;
              }
              
              /* Box Cards: ensure answers and texts in these boxes stay compact and well-proportioned */
              .study-notes-container .bg-slate-50 p,
              .study-notes-container .bg-slate-50 li,
              .study-notes-container .bg-slate-50 div,
              .study-notes-container .bg-slate-100 p,
              .study-notes-container .bg-slate-100 li,
              .study-notes-container .bg-slate-100 div,
              .study-notes-container .bg-cyan-50 p,
              .study-notes-container .bg-cyan-50 li,
              .study-notes-container .bg-cyan-50 div,
              .study-notes-container .bg-amber-50 p,
              .study-notes-container .bg-amber-50 li,
              .study-notes-container .bg-amber-50 div {
                font-size: 13.5px !important;
                line-height: 1.45 !important;
                font-weight: 700 !important;
              }
              
              /* Text override helpers */
              .study-notes-container .text-slate-950,
              .study-notes-container .text-slate-900,
              .study-notes-container .text-slate-850,
              .study-notes-container .text-slate-800,
              .study-notes-container .text-slate-755,
              .study-notes-container .text-slate-750,
              .study-notes-container .text-slate-705,
              .study-notes-container .text-slate-700,
              .study-notes-container .text-slate-600,
              .study-notes-container .text-slate-450,
              .study-notes-container .text-slate-400,
              .study-notes-container .text-slate-300 {
                color: #0f172a !important;
                font-weight: bold !important;
              }
              .study-notes-container .text-slate-500 {
                color: #334155 !important;
                font-weight: bold !important;
              }
              
              /* Borders and dividers */
              .study-notes-container .border-slate-900,
              .study-notes-container .border-slate-305,
              .study-notes-container .border-slate-300,
              .study-notes-container .border-slate-200 {
                border-color: #94a3b8 !important;
              }
              .study-notes-container .border-l-2 {
                border-left-color: #0284c7 !important;
                border-left-width: 3px !important;
              }
              .study-notes-container .border-b-[3px] {
                border-bottom-color: #0f172a !important;
                border-bottom-width: 3px !important;
              }
              
              /* Box Cards (Formulas, eye donation, defects, tables) */
              .study-notes-container .bg-slate-50,
              .study-notes-container .bg-slate-100,
              .study-notes-container .bg-cyan-50,
              .study-notes-container .bg-slate-50\\/50,
              .study-notes-container .bg-cyan-50\\/50 {
                background-color: #f8fafc !important;
                border-color: #cbd5e1 !important;
                margin-top: 4px !important;
                margin-bottom: 4px !important;
                padding: 12px !important;
              }
              .study-notes-container td.bg-slate-50 {
                background-color: #f8fafc !important;
              }
              .study-notes-container th {
                background-color: #f1f5f9 !important;
                color: #0f172a !important;
                font-size: 15.5px !important;
                font-weight: 800 !important;
              }
              .study-notes-container td {
                font-size: 15px !important;
                font-weight: 700 !important;
                color: #0f172a !important;
              }
              
              /* Specific highlighted colors */
              .study-notes-container .text-red-700 {
                color: #991b1b !important;
              }
              .study-notes-container .text-emerald-700 {
                color: #065f46 !important;
              }
              .study-notes-container .text-indigo-700 {
                color: #3730a3 !important;
              }
              .study-notes-container .text-cyan-900 {
                color: #155e75 !important;
              }
              
              .study-notes-container .font-mono {
                color: #0f172a !important;
                font-weight: 900 !important;
              }
            }
            
            @media print {
              @page {
                size: portrait;
                margin: 0.6cm !important;
              }
              body {
                background-color: #ffffff !important;
              }
              .study-notes-container {
                font-family: Calibri, Carlito, "Segoe UI", sans-serif !important;
                color: #000000 !important;
                background-color: #ffffff !important;
                font-size: 17.5px !important;
                font-weight: 700 !important;
                line-height: 1.55 !important;
              }
              .study-notes-container h1,
              .study-notes-container h2,
              .study-notes-container h3,
              .study-notes-container h4,
              .study-notes-container li,
              .study-notes-container p {
                font-family: Calibri, Carlito, "Segoe UI", sans-serif !important;
                color: #000000 !important;
                font-weight: 700 !important;
              }
              .study-notes-container h1 {
                font-size: 34px !important;
                margin-top: 4px !important;
                margin-bottom: 3px !important;
              }
              .study-notes-container h2 {
                font-size: 24px !important;
                border-bottom: 2.5px solid #000000 !important;
                padding-bottom: 2px !important;
                margin-top: 8px !important;
                margin-bottom: 3px !important;
              }
              .study-notes-container h3 {
                font-size: 20px !important;
                margin-top: 6px !important;
                margin-bottom: 2px !important;
              }
              .study-notes-container p,
              .study-notes-container li {
                font-size: 17.5px !important;
                font-weight: 700 !important;
                margin-top: 0px !important;
                margin-bottom: 2px !important;
              }
              .study-notes-container ul,
              .study-notes-container ol {
                margin: 0px !important;
                padding-left: 20px !important;
              }
              .study-notes-container li {
                margin-bottom: 2px !important;
              }
              
              /* Squeeze space-y spacing under print */
              .study-notes-container [class*="space-y-"] > :not([hidden]) ~ :not([hidden]) {
                margin-top: 4px !important;
              }
              
              /* Card box text overrides under print to keep activities well-spaced and small */
              .study-notes-container .bg-slate-50 p,
              .study-notes-container .bg-slate-50 li,
              .study-notes-container .bg-slate-50 div,
              .study-notes-container .bg-slate-100 p,
              .study-notes-container .bg-slate-100 li,
              .study-notes-container .bg-slate-100 div,
              .study-notes-container .bg-cyan-50 p,
              .study-notes-container .bg-cyan-50 li,
              .study-notes-container .bg-cyan-50 div,
              .study-notes-container .bg-amber-50 p,
              .study-notes-container .bg-amber-50 li,
              .study-notes-container .bg-amber-50 div {
                font-size: 13.5px !important;
                line-height: 1.45 !important;
                font-weight: 700 !important;
              }
              
              .study-notes-container th {
                background-color: #f1f5f9 !important;
                color: #000000 !important;
                font-size: 15.5px !important;
                font-weight: 800 !important;
              }
              .study-notes-container td {
                font-size: 15px !important;
                font-weight: 700 !important;
              }
              .study-notes-container .bg-slate-50,
              .study-notes-container .bg-slate-100,
              .study-notes-container .bg-cyan-50 {
                margin-top: 4px !important;
                margin-bottom: 4px !important;
                padding: 12px !important;
              }
              
              /* Prevent awkward page cuts in main structured cards and headings only */
              .study-notes-container h2,
              .study-notes-container h3,
              .study-notes-container h4,
              .study-notes-container table,
              .study-notes-container .bg-slate-50,
              .study-notes-container .bg-slate-100,
              .study-notes-container .bg-\\[\\#f8fafc\\],
              .study-notes-container .bg-cyan-50,
              .study-notes-container .bg-amber-50,
              .study-notes-container .print\:break-inside-avoid {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                break-inside: avoid-page !important;
              }
              
              /* Significantly enlarge and scale up all ray diagrams and graphics */
              .study-notes-container svg {
                max-width: 100% !important;
                width: 100% !important;
                height: auto !important;
                min-height: 180px !important;
              }
              
              /* Release width limits on custom diameter components so they fill out print grid nicely */
              .study-notes-container .max-w-\[320px\],
              .study-notes-container .max-w-\[340px\],
              .study-notes-container .max-w-\[260px\],
              .study-notes-container .max-w-\[220px\],
              .study-notes-container .max-w-\[280px\],
              .study-notes-container .max-w-\[420px\],
              .study-notes-container .max-w-\[440px\],
              .study-notes-container .max-w-\[500px\] {
                max-width: 100% !important;
                width: 100% !important;
              }
            }
          `}} />
          <div className={`border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl print:max-h-full print:border-none print:shadow-none print:rounded-none font-sans ${isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'}`}>
            {/* Header controls (hidden on print) */}
            <div className={`px-6 py-4 border-b flex items-center justify-between print:hidden ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className={`flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <BookOpen className={isLightMode ? 'w-5 h-5 text-cyan-600' : 'w-5 h-5 text-cyan-400'} />
                <div>
                  <h3 className={`text-sm font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                    {preparingFor === '8th' || preparingFor === '9th'
                      ? 'CBSE Class 8 Science - Light Notebook'
                      : preparingFor === '12th'
                        ? 'CBSE Class 12 Physics - Advanced Optics Handbook'
                        : 'Class X Science - Light Handbook'}
                  </h3>
                  <p className={`text-[10px] uppercase tracking-wider font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Custom Printed Study Companion</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {pdfError && (
                  <span className="text-[10px] text-red-400 font-mono hidden sm:inline">{pdfError}</span>
                )}

                {pdfGenerating ? (
                  <div className={`flex items-center gap-1.5 py-1.5 px-3 text-xs font-black uppercase tracking-wider rounded-lg ${isLightMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'}`}>
                    <svg className="animate-spin h-3.5 w-3.5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PDF...
                  </div>
                ) : downloadBlobUrl ? (
                  <div className="flex items-center gap-2">
                    {/* Real user-initiated static file save trigger */}
                    <a
                      href={downloadBlobUrl}
                      download={`${(preparingFor === '8th' || preparingFor === '9th' ? 'light' : preparingFor === '12th' ? 'advanced_optics' : 'light_reflection_and_refraction')}.pdf`}
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-emerald-500 hover:bg-emerald-450 text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg transition cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Save PDF File
                    </a>
                    
                    {/* Open in a new window/tab to use the built-in Chrome/Safari viewer */}
                    <button
                      onClick={() => window.open(downloadBlobUrl, '_blank')}
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg transition cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View PDF
                    </button>
                    
                    {/* Re-generate button if they want to compile again */}
                    <button
                      onClick={handlePrintPdf}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${isLightMode ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-800' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
                      title="Recompile PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {/* Standard compile and build trigger */}
                    <button
                      onClick={handlePrintPdf}
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </button>
                  </div>
                )}
                
                <button
                  onClick={() => setShowPdfModal(false)}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${isLightMode ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-900' : 'hover:bg-slate-900 text-slate-400 hover:text-white'}`}
                >
                  <X className={isLightMode ? 'w-5 h-5 text-slate-500' : 'w-5 h-5 text-slate-400'} />
                </button>
              </div>
            </div>

            {/* Document contents (Optimized for both screen display and paper printing) */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-8 bg-white text-slate-900 print:overflow-visible print:p-0 print:text-black font-sans study-notes-container study-notes-print-content">
              {renderGradePdfNotes(preparingFor, mirrorCaseIndex, setMirrorCaseIndex, lensCaseIndex, setLensCaseIndex, onLoadSimulator)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
