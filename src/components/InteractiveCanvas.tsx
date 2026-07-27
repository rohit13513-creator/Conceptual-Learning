import React, { useState } from "react";
import { DeviceType } from "../types";
import { DEV_LIMITS } from "../data";

interface InteractiveCanvasProps {
  device: DeviceType;
  u: number; // raw object distance, always negative (left)
  h: number; // positive height of object
  f: number; // absolute focal length value, e.g. 100
  aperture: number; // vertical height of mirror/lens
  isPointObject: boolean;
  pointAngle1: number;
  pointAngle2: number;
  activeRays: {
    parallel: boolean;
    focus: boolean;
    curvatureOrO: boolean;
    pole: boolean;
  };
  onUpdateObj: (u: number, h: number) => void;
  onUpdateF: (f: number) => void;
  combineLenses?: boolean;
  lens2Type?: DeviceType;
  f2?: number;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  device,
  u,
  h: rawH,
  f: rawF,
  aperture: rawAperture,
  isPointObject,
  pointAngle1,
  pointAngle2,
  activeRays,
  onUpdateObj,
  onUpdateF,
  combineLenses = false,
  lens2Type = DeviceType.CONVEX_LENS,
  f2 = 120,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<"object" | "focus" | null>(null);

  const FIXED_APERTURE = 200;
  const FIXED_MAX_HEIGHT = 50;

  const isSphericalMirror = device === DeviceType.CONCAVE_MIRROR || device === DeviceType.CONVEX_MIRROR;
  const h = Math.max(5, Math.min(FIXED_MAX_HEIGHT, rawH));
  const aperture = FIXED_APERTURE;
  const f = Math.max(DEV_LIMITS.fMin, Math.min(DEV_LIMITS.fMax, rawF));

  // Optical center coordinates
  const x0 = 400;
  const y0 = 225;

  // Compute effective attributes when lens combination is enabled
  const isCombinedActive = combineLenses && (device === DeviceType.CONVEX_LENS || device === DeviceType.CONCAVE_LENS);
  
  let effF = f;
  let effDevice = device;
  let isZeroPower = false;
  
  if (isCombinedActive) {
    const f1Signed = device === DeviceType.CONVEX_LENS ? f : -f;
    const f2Signed = lens2Type === DeviceType.CONVEX_LENS ? f2 : -f2;
    const power1 = 1 / f1Signed;
    const power2 = 1 / f2Signed;
    const totalPower = power1 + power2;
    
    if (Math.abs(totalPower) < 0.0001) {
      isZeroPower = true;
      effF = 999999;
    } else {
      const fEq = 1 / totalPower;
      effF = Math.abs(fEq);
      effDevice = fEq > 0 ? DeviceType.CONVEX_LENS : DeviceType.CONCAVE_LENS;
    }
  }

  const isMirror = effDevice === DeviceType.CONCAVE_MIRROR || effDevice === DeviceType.CONVEX_MIRROR || effDevice === DeviceType.PLANE_MIRROR;
  const isAtInfinity = u <= -295;

  // 1. Curved mirror surface / central lens plane coordinates helper
  const getMirrorX = (y: number, fVal: number, devType: DeviceType): number => {
    if (devType === DeviceType.CONCAVE_MIRROR) {
      const xC = x0 - 2 * fVal;
      const R = 2 * fVal;
      const dy = y - y0;
      const term = Math.max(0, R * R - dy * dy);
      return xC + Math.sqrt(term);
    } else if (devType === DeviceType.CONVEX_MIRROR) {
      const xC = x0 + 2 * fVal;
      const R = 2 * fVal;
      const dy = y - y0;
      const term = Math.max(0, R * R - dy * dy);
      return xC - Math.sqrt(term);
    }
    return x0; // Lenses use central vertical plane for thin lens refraction
  };

  // 2. Calculations for image position v and height h' (Paraxial Approximation)
  const calculateOpticalProperties = () => {
    let v = 0;
    let hPrime = 0;
    let infinite = false;

    // Use height 0 for point objects, else h
    const finalH = isPointObject ? 0 : h;

    if (isZeroPower) {
      return { v: -u, hPrime: finalH, infinite: false };
    }

    if (effDevice === DeviceType.PLANE_MIRROR) {
      if (isAtInfinity) {
        return { v: 5000, hPrime: 0, infinite: true };
      }
      return { v: -u, hPrime: finalH, infinite: false };
    }

    if (isAtInfinity) {
      if (effDevice === DeviceType.CONCAVE_MIRROR) {
        v = -effF;
        hPrime = 0;
      } else if (effDevice === DeviceType.CONVEX_MIRROR) {
        v = effF;
        hPrime = 0;
      } else if (effDevice === DeviceType.CONVEX_LENS) {
        v = effF;
        hPrime = 0;
      } else if (effDevice === DeviceType.CONCAVE_LENS) {
        v = -effF;
        hPrime = 0;
      }
      return { v, hPrime, infinite: false };
    }

    if (effDevice === DeviceType.CONCAVE_MIRROR) {
      const actF = -effF;
      const denom = u - actF;
      if (Math.abs(denom) < 3) {
        infinite = true;
        v = u < actF ? -5000 : 5000;
        hPrime = -Infinity;
      } else {
        v = (u * actF) / denom;
        const m = -v / u;
        hPrime = m * finalH;
      }
    } else if (effDevice === DeviceType.CONVEX_MIRROR) {
      const actF = effF;
      const denom = u - actF;
      v = (u * actF) / denom;
      const m = -v / u;
      hPrime = m * finalH;
    } else if (effDevice === DeviceType.CONVEX_LENS) {
      const actF = effF;
      const denom = u + actF;
      if (Math.abs(denom) < 3) {
        infinite = true;
        v = u < -actF ? 5000 : -5000;
        hPrime = Infinity;
      } else {
        v = (u * actF) / denom;
        const m = v / u;
        hPrime = m * finalH;
      }
    } else if (effDevice === DeviceType.CONCAVE_LENS) {
      const actF = -effF;
      const denom = u + actF;
      if (Math.abs(denom) < 3) {
        infinite = true;
        v = -5000;
        hPrime = 0;
      } else {
        v = (u * actF) / denom;
        const m = v / u;
        hPrime = m * finalH;
      }
    }

    return { v, hPrime, infinite };
  };

  const { v, hPrime, infinite } = calculateOpticalProperties();

  // Screen coordinates
  const xObj = x0 + u;
  const yObj = y0 - (isPointObject ? 0 : h);

  const maxDisplayV = 380;
  const clampedV = infinite ? (v > 0 ? maxDisplayV : -maxDisplayV) : Math.max(-maxDisplayV, Math.min(maxDisplayV, v));
  const xImg = x0 + clampedV;
  const displayHPrime = infinite ? (u < -effF ? -400 : 400) : hPrime;
  const yImg = y0 - Math.max(-200, Math.min(200, displayHPrime));

  // Pointer event handlers for dragging the object / light source
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = 80 + ((e.clientX - rect.left) / rect.width) * 560;
    const clickY = 67.5 + ((e.clientY - rect.top) / rect.height) * 315;

    // Interactive focus F (on the left generally, except convex mirror on the right)
    let xFocusInteractive = x0 - effF;
    if (effDevice === DeviceType.CONVEX_MIRROR) {
      xFocusInteractive = x0 + effF;
    }
    const distToFocus = Math.hypot(clickX - xFocusInteractive, clickY - y0);

    // Determine dragging target
    const distToObjTip = Math.hypot(clickX - xObj, clickY - yObj);
    const distToObjBody = Math.abs(clickX - xObj);
    const isNearObj = isAtInfinity
      ? (clickX < 120) // Easy grab at Left border to drag out of Infinity
      : isPointObject
      ? Math.hypot(clickX - xObj, clickY - y0) < 35
      : distToObjTip < 45 || (distToObjBody < 25 && clickY > Math.min(y0, yObj) - 15 && clickY < Math.max(y0, yObj) + 15);

    if (isNearObj) {
      setIsDragging(true);
      setDragType("object");
      e.currentTarget.setPointerCapture(e.pointerId);
    } else if (device !== DeviceType.PLANE_MIRROR && distToFocus < 25) {
      setIsDragging(true);
      setDragType("focus");
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging || !dragType) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = 80 + ((e.clientX - rect.left) / rect.width) * 560;
    const clickY = 67.5 + ((e.clientY - rect.top) / rect.height) * 315;

    if (dragType === "object") {
      let newU = Math.round(clickX - x0);
      if (newU > DEV_LIMITS.uMax) newU = DEV_LIMITS.uMax;
      if (newU < DEV_LIMITS.uMin) newU = DEV_LIMITS.uMin;

      let newH = isPointObject ? 0 : Math.round(y0 - clickY);
      if (!isPointObject) {
        const minH = 5;
        const maxH = 50;
        if (newH < minH) newH = minH;
        if (newH > maxH) newH = maxH;
      }

      onUpdateObj(newU, newH);
    } else if (dragType === "focus") {
      let computedF = Math.abs(clickX - x0);
      const minF = DEV_LIMITS.fMin;
      const maxF = DEV_LIMITS.fMax;
      if (computedF < minF) computedF = minF;
      if (computedF > maxF) computedF = maxF;
      onUpdateF(Math.round(computedF));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isDragging) {
      setIsDragging(false);
      setDragType(null);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // Helper to extend a ray line segment from A(x1,y1) through B(x2,y2) to a target X boundary
  const getExtendedPoint = (x1: number, y1: number, x2: number, y2: number, targetX: number) => {
    const dx = x2 - x1;
    if (Math.abs(dx) < 0.1) return { x: x2, y: y2 > y1 ? 440 : 10 };
    const m = (y2 - y1) / dx;
    return { x: targetX, y: y1 + m * (targetX - x1) };
  };

  // Find precise intersection of any line starting at (xs, ys) going through (xe, ye) with the mirror/lens surface
  const getMirrorIntersection = (xs: number, ys: number, xe: number, ye: number, fVal: number, devType: DeviceType) => {
    if (devType === DeviceType.PLANE_MIRROR || devType === DeviceType.CONVEX_LENS || devType === DeviceType.CONCAVE_LENS) {
      // For Plane Mirror and Lenses, refraction/intersection is treated at the central vertical plane x0
      const dx = xe - xs;
      if (Math.abs(dx) < 0.1) {
        return { x: x0, y: ys };
      }
      const m = (ye - ys) / dx;
      return { x: x0, y: ys + m * (x0 - xs) };
    }

    // For mirrors, we use fixed point iteration to find the exact intersection with the circle boundary
    const dx = xe - xs;
    const dy = ye - ys;
    if (Math.abs(dx) < 0.1) {
      const xHit = xs;
      const R = 2 * fVal;
      const xC = devType === DeviceType.CONCAVE_MIRROR ? x0 - R : x0 + R;
      const term = Math.max(0, R * R - (xHit - xC) * (xHit - xC));
      const yHit = y0 + (dy > 0 ? 1 : -1) * Math.sqrt(term);
      return { x: xHit, y: yHit };
    }

    const m = dy / dx; // y = ys + m * (x - xs)
    let xHit = x0; // Start at center of mirror
    let yHit = ys + m * (xHit - xs);
    // 6 iterations converge to sub-pixel precision
    for (let i = 0; i < 6; i++) {
      xHit = getMirrorX(yHit, fVal, devType);
      yHit = ys + m * (xHit - xs);
    }
    return { x: xHit, y: yHit };
  };

  // 3. Generate Rays representing precise Physics Reflection/Refraction
  const getRays = (propFVal: number) => {
    const parentF = propFVal;
    const f = effF;
    const device = effDevice;
    const isMirror = device === DeviceType.CONCAVE_MIRROR || device === DeviceType.CONVEX_MIRROR;

    const list: Array<{
      id: string;
      color: string;
      dashed: boolean;
      d: string;
      hitsAperture: boolean;
    }> = [];

    // Helper to generate a 3-point path with an intermediate vertex for centered SVG markerMid arrow decoration
    const makeArrowLine = (x1: number, y1: number, x2: number, y2: number) => {
      const xMid = (x1 + x2) / 2;
      const yMid = (y1 + y2) / 2;
      return `M ${x1} ${y1} L ${xMid} ${yMid} L ${x2} ${y2}`;
    };

    if (isZeroPower) {
      if (isPointObject) {
        const angles = [pointAngle1, pointAngle2];
        angles.forEach((angle, idx) => {
          const theta = (angle * Math.PI) / 180;
          const tanT = Math.tan(theta);
          const yHit = y0 - (x0 - xObj) * tanT;
          const hits = Math.abs(yHit - y0) <= aperture / 2;
          if (hits) {
            list.push({
              id: `point-ray-${idx}-incident`,
               color: idx === 0 ? "stroke-purple-500 stroke-[2]" : "stroke-amber-500 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xObj, y0, x0, yHit),
              hitsAperture: true,
            });
            const ext = getExtendedPoint(xObj, y0, x0, yHit, 780);
            list.push({
              id: `point-ray-${idx}-refracted`,
              color: idx === 0 ? "stroke-purple-400 stroke-[2]" : "stroke-amber-400 stroke-[2]",
              dashed: false,
              d: makeArrowLine(x0, yHit, ext.x, ext.y),
              hitsAperture: true,
            });
          } else {
            const ext = getExtendedPoint(xObj, y0, x0, yHit, 780);
            list.push({
              id: `point-ray-${idx}-straight`,
              color: idx === 0 ? "stroke-purple-500/35 stroke-[1.5]" : "stroke-amber-500/35 stroke-[1.5]",
              dashed: false,
              d: makeArrowLine(xObj, y0, ext.x, ext.y),
              hitsAperture: false,
            });
          }
        });
      } else {
        if (activeRays.parallel) {
          const hits = Math.abs(yObj - y0) <= aperture / 2;
          list.push({
            id: "ray1-incident",
            color: "stroke-purple-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, x0, yObj),
            hitsAperture: hits,
          });
          list.push({
            id: "ray1-reflected-or-refracted",
            color: "stroke-purple-400 stroke-[2]",
            dashed: false,
            d: makeArrowLine(x0, yObj, 780, yObj),
            hitsAperture: hits,
          });
        }
        
        if (activeRays.curvatureOrO) {
          const dx = x0 - xObj;
          const dy = y0 - yObj;
          const m = dy / (dx || 0.1);
          const yHit = yObj + m * (x0 - xObj);
          const hits = Math.abs(yHit - y0) <= aperture / 2;
          list.push({
            id: "ray3-incident",
            color: "stroke-sky-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, x0, yHit),
            hitsAperture: hits,
          });
          const ext = getExtendedPoint(xObj, yObj, x0, yHit, 780);
          list.push({
            id: "ray3-reflected-or-refracted",
            color: "stroke-sky-400 stroke-[2]",
            dashed: false,
            d: makeArrowLine(x0, yHit, ext.x, ext.y),
            hitsAperture: hits,
          });
        }
        
        if (activeRays.focus) {
          const xF1 = x0 - parentF;
          const dx = xF1 - xObj;
          const dy = y0 - yObj;
          const m = dy / (dx || 0.1);
          const yHit = yObj + m * (x0 - xObj);
          const hits = Math.abs(yHit - y0) <= aperture / 2;
          list.push({
            id: "ray2-incident",
            color: "stroke-emerald-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, x0, yHit),
            hitsAperture: hits,
          });
          const ext = getExtendedPoint(xObj, yObj, x0, yHit, 780);
          list.push({
            id: "ray2-reflected-or-refracted",
            color: "stroke-emerald-400 stroke-[2]",
            dashed: false,
            d: makeArrowLine(x0, yHit, ext.x, ext.y),
            hitsAperture: hits,
          });
        }
        
        if (activeRays.pole) {
          const yTop = y0 - aperture / 2;
          const hits = true;
          list.push({
            id: "ray4-incident",
            color: "stroke-amber-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, x0, yTop),
            hitsAperture: hits,
          });
          const ext = getExtendedPoint(xObj, yObj, x0, yTop, 780);
          list.push({
            id: "ray4-reflected-or-refracted",
            color: "stroke-amber-400 stroke-[2]",
            dashed: false,
            d: makeArrowLine(x0, yTop, ext.x, ext.y),
            hitsAperture: hits,
          });
        }
      }
      return list;
    }

    // Unified helper to append reflected/refracted and virtual segments for paraxial rays
    const addReflectedOrRefractedRay = (
      rayIdPrefix: string,
      color: string,
      xHit: number,
      yHit: number,
      targetXBorder: number, // 20 for mirror, 780 for lens
      isReal: boolean
    ) => {
      if (isReal) {
        // Real optical path goes through the image tip (xImg, yImg)
        const ext = getExtendedPoint(xHit, yHit, xImg, yImg, targetXBorder);
        list.push({
          id: `${rayIdPrefix}-reflected-or-refracted`,
          color: color,
          dashed: false,
          d: makeArrowLine(xHit, yHit, ext.x, ext.y),
          hitsAperture: true,
        });
      } else {
        // Virtual optical path: diverges from (xImg, yImg), starts at xHit, yHit
        const extReal = getExtendedPoint(xImg, yImg, xHit, yHit, targetXBorder);
        list.push({
          id: `${rayIdPrefix}-reflected-or-refracted`,
          color: color,
          dashed: false,
          d: makeArrowLine(xHit, yHit, extReal.x, extReal.y),
          hitsAperture: true,
        });
        list.push({
          id: `${rayIdPrefix}-virtual`,
          color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
          dashed: true,
          d: `M ${xHit} ${yHit} L ${xImg} ${yImg}`,
          hitsAperture: true,
        });
      }
    };

    // --- CASE 0: PLANE MIRROR ---
    if (device === DeviceType.PLANE_MIRROR) {
      if (isPointObject) {
        const angles = [pointAngle1, pointAngle2];
        angles.forEach((angle, idx) => {
          const theta = (angle * Math.PI) / 180;
          const tanT = Math.tan(theta);
          const yHit = y0 - (x0 - xObj) * tanT;
          const hits = Math.abs(yHit - y0) <= aperture / 2;
          
          if (hits) {
            list.push({
              id: `point-ray-${idx}-incident`,
              color: idx === 0 ? "stroke-purple-500 stroke-[2]" : "stroke-amber-500 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xObj, y0, x0, yHit),
              hitsAperture: true,
            });
            addReflectedOrRefractedRay(`point-ray-${idx}`, idx === 0 ? "stroke-purple-400 stroke-[2]" : "stroke-amber-400 stroke-[2]", x0, yHit, 20, false);
          } else {
            const ext = getExtendedPoint(xObj, y0, x0, yHit, 20);
            list.push({
              id: `point-ray-${idx}-missed`,
              color: idx === 0 ? "stroke-purple-500/25 stroke-[1.5]" : "stroke-amber-500/25 stroke-[1.5]",
              dashed: true,
              d: makeArrowLine(xObj, y0, ext.x, ext.y),
              hitsAperture: false,
            });
          }
        });
      } else {
        // Parallel Ray
        if (activeRays.parallel) {
          const xHit1 = x0;
          const yHit1 = yObj;
          const hits1 = Math.abs(yHit1 - y0) <= aperture / 2;
          if (hits1) {
            list.push({
              id: "ray1-incident",
              color: "stroke-purple-500 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xObj, yObj, xHit1, yHit1),
              hitsAperture: true,
            });
            addReflectedOrRefractedRay("ray1", "stroke-purple-400 stroke-[2]", xHit1, yHit1, 20, false);
          }
        }

        // Pole Ray
        if (activeRays.pole) {
          const xHit4 = x0;
          const yHit4 = y0;
          list.push({
            id: "ray4-incident",
            color: "stroke-amber-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, xHit4, yHit4),
            hitsAperture: true,
          });
          addReflectedOrRefractedRay("ray4", "stroke-amber-400 stroke-[2]", xHit4, yHit4, 20, false);
        }
      }

      return list;
    }

    // --- CASE A: OBJECT AT INFINITY ---
    // At least 5 parallel rays entering from left, meeting at focus.
    if (isAtInfinity) {
      const rayHeights = [
        y0 - 0.8 * (aperture / 2),
        y0 - 0.4 * (aperture / 2),
        y0,
        y0 + 0.4 * (aperture / 2),
        y0 + 0.8 * (aperture / 2),
      ];

      rayHeights.forEach((ry, idx) => {
        const xHit = getMirrorX(ry, f, device);

        // Incident ray (horizontal from left)
        list.push({
          id: `inf-ray-${idx}-incident`,
          color: "stroke-sky-400 stroke-[2]",
          dashed: false,
          d: makeArrowLine(20, ry, xHit, ry),
          hitsAperture: true,
        });

        // Reflected or Refracted ray
        if (device === DeviceType.CONCAVE_MIRROR) {
          const xF = x0 - f;
          const ext = getExtendedPoint(xHit, ry, xF, y0, 20);
          list.push({
            id: `inf-ray-${idx}-reflected`,
            color: "stroke-rose-400 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xHit, ry, ext.x, ext.y),
            hitsAperture: true,
          });
        } else if (device === DeviceType.CONVEX_MIRROR) {
          const xF = x0 + f;
          const extLeft = getExtendedPoint(xF, y0, xHit, ry, 20);
          list.push({
            id: `inf-ray-${idx}-reflected`,
            color: "stroke-rose-400 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xHit, ry, extLeft.x, extLeft.y),
            hitsAperture: true,
          });
          list.push({
            id: `inf-ray-${idx}-virtual`,
            color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
            dashed: true,
            d: `M ${xHit} ${ry} L ${xF} ${y0}`,
            hitsAperture: true,
          });
        } else if (device === DeviceType.CONVEX_LENS) {
          const xF2 = x0 + f;
          const extRight = getExtendedPoint(xHit, ry, xF2, y0, 780);
          list.push({
            id: `inf-ray-${idx}-refracted`,
            color: "stroke-rose-400 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xHit, ry, extRight.x, extRight.y),
            hitsAperture: true,
          });
        } else if (device === DeviceType.CONCAVE_LENS) {
          const xF1 = x0 - f;
          const extRight = getExtendedPoint(xF1, y0, xHit, ry, 780);
          list.push({
            id: `inf-ray-${idx}-refracted`,
            color: "stroke-rose-400 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xHit, ry, extRight.x, extRight.y),
            hitsAperture: true,
          });
          list.push({
            id: `inf-ray-${idx}-virtual`,
            color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
            dashed: true,
            d: `M ${xHit} ${ry} L ${xF1} ${y0}`,
            hitsAperture: true,
          });
        }
      });

      return list;
    }

    // --- CASE B: POINT SIZE OBJECT WITH 2 MANUALLY CONTROLLED ANGLES ---
    if (isPointObject) {
      const angles = [pointAngle1, pointAngle2];
      angles.forEach((angle, idx) => {
        const theta = (angle * Math.PI) / 180;
        const tanT = Math.tan(theta);

        // Compute hitting point accurately using getMirrorIntersection
        let { x: xHit, y: yHit } = getMirrorIntersection(xObj, y0, x0, y0 - (x0 - xObj) * tanT, f, device);
        
        if (isSphericalMirror) {
          const topLimit = y0 - aperture / 2;
          const bottomLimit = y0 + aperture / 2;
          if (yHit < topLimit) {
            yHit = topLimit;
            xHit = getMirrorX(yHit, f, device);
          } else if (yHit > bottomLimit) {
            yHit = bottomLimit;
            xHit = getMirrorX(yHit, f, device);
          }
        }

        const hits = Math.abs(yHit - y0) <= aperture / 2;

        if (hits) {
          // Incident segment starts from object on axis
          list.push({
            id: `point-ray-${idx}-incident`,
            color: idx === 0 ? "stroke-purple-500 stroke-[2]" : "stroke-amber-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, y0, xHit, yHit),
            hitsAperture: true,
          });

          // Ray reflects/refracts to pass through or diverge from standard focus/image point (xImg, y0)
          if (infinite) {
            // Emits parallel or based on symmetric angles
            if (isMirror) {
              const extLeft = getExtendedPoint(xHit, yHit, xHit - 100, yHit + 100 * tanT, 20);
              list.push({
                id: `point-ray-${idx}-reflected`,
                color: idx === 0 ? "stroke-purple-400 stroke-[2]" : "stroke-amber-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit, yHit, extLeft.x, extLeft.y),
                hitsAperture: true,
              });
            } else {
              const extRight = getExtendedPoint(xHit, yHit, xHit + 100, yHit - 100 * tanT, 780);
              list.push({
                id: `point-ray-${idx}-refracted`,
                color: idx === 0 ? "stroke-purple-400 stroke-[2]" : "stroke-amber-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit, yHit, extRight.x, extRight.y),
                hitsAperture: true,
              });
            }
          } else {
            // Ray must pass through xImg on axis
            const isRealImage = isMirror ? v < 0 : v > 0;

            if (isRealImage) {
              // Real ray goes through xImg
              const targetXBorder = isMirror ? 20 : 780;
              const ext = getExtendedPoint(xHit, yHit, xImg, y0, targetXBorder);
              list.push({
                id: `point-ray-${idx}-reflected-or-refracted`,
                color: idx === 0 ? "stroke-purple-400 stroke-[2]" : "stroke-amber-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit, yHit, ext.x, ext.y),
                hitsAperture: true,
              });
            } else {
              // Virtual image: goes away from xImg. Extension goes back to xImg.
              const targetXBorder = isMirror ? 20 : 780;
              const extReal = getExtendedPoint(xImg, y0, xHit, yHit, targetXBorder);
              list.push({
                id: `point-ray-${idx}-reflected-or-refracted`,
                color: idx === 0 ? "stroke-purple-400 stroke-[2]" : "stroke-amber-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit, yHit, extReal.x, extReal.y),
                hitsAperture: true,
              });
              list.push({
                id: `point-ray-${idx}-virtual`,
                color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
                dashed: true,
                d: `M ${xHit} ${yHit} L ${xImg} ${y0}`,
                hitsAperture: true,
              });
            }
          }
        } else {
          // Does not hit: goes completely straight to the right edge. Rendered in faded incident color.
          const extStraight = getExtendedPoint(xObj, y0, xHit, yHit, 780);
          list.push({
            id: `point-ray-${idx}-straight`,
            color: idx === 0 ? "stroke-purple-500/35 stroke-[1.5]" : "stroke-amber-500/35 stroke-[1.5]",
            dashed: false,
            d: makeArrowLine(xObj, y0, extStraight.x, extStraight.y),
            hitsAperture: false,
          });
        }
      });

      return list;
    }

    // --- CASE C: SIZED OBJECT STANDARD PARAXIAL RAY CASTS ---
    const isMirrorLocal = device === DeviceType.CONCAVE_MIRROR || device === DeviceType.CONVEX_MIRROR || device === DeviceType.PLANE_MIRROR;
    const xImg_actual = xImg;
    const yImg_actual = yImg;

    // Ray 1: Parallel to Principal Axis
    if (activeRays.parallel) {
      const xHit1 = isMirrorLocal ? getMirrorX(yObj, f, device) : x0;
      const yHit1 = yObj;
      const hits1 = Math.abs(yHit1 - y0) <= aperture / 2;

      if (hits1) {
        list.push({
          id: "ray1-incident",
          color: "stroke-purple-500 stroke-[2]",
          dashed: false,
          d: makeArrowLine(xObj, yObj, xHit1, yHit1),
          hitsAperture: true,
        });

        if (infinite) {
          if (isMirrorLocal) {
            const xF = device === DeviceType.CONCAVE_MIRROR ? x0 - f : x0 + f;
            if (device === DeviceType.CONCAVE_MIRROR) {
              const ext = getExtendedPoint(xHit1, yHit1, xF, y0, 20);
              list.push({
                id: "ray1-reflected",
                color: "stroke-purple-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit1, yHit1, ext.x, ext.y),
                hitsAperture: true,
              });
            } else {
              const extReal = getExtendedPoint(xF, y0, xHit1, yHit1, 20);
              list.push({
                id: "ray1-reflected",
                color: "stroke-purple-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit1, yHit1, extReal.x, extReal.y),
                hitsAperture: true,
              });
              list.push({
                id: "ray1-virtual",
                color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
                dashed: true,
                d: `M ${xHit1} ${yHit1} L ${xF} ${y0}`,
                hitsAperture: true,
              });
            }
          } else {
            const xF2 = device === DeviceType.CONVEX_LENS ? x0 + f : x0 - f;
            if (device === DeviceType.CONVEX_LENS) {
              const ext = getExtendedPoint(xHit1, yHit1, xF2, y0, 780);
              list.push({
                id: "ray1-refracted",
                color: "stroke-purple-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit1, yHit1, ext.x, ext.y),
                hitsAperture: true,
              });
            } else {
              const extReal = getExtendedPoint(xF2, y0, xHit1, yHit1, 780);
              list.push({
                id: "ray1-refracted",
                color: "stroke-purple-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit1, yHit1, extReal.x, extReal.y),
                hitsAperture: true,
              });
              list.push({
                id: "ray1-virtual",
                color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
                dashed: true,
                d: `M ${xHit1} ${yHit1} L ${xF2} ${y0}`,
                hitsAperture: true,
              });
            }
          }
        } else {
          if (isMirrorLocal) {
            const isRealImage = v < 0;
            if (isRealImage) {
              const ext = getExtendedPoint(xHit1, yHit1, xImg_actual, yImg_actual, 20);
              list.push({
                id: "ray1-reflected",
                color: "stroke-purple-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit1, yHit1, ext.x, ext.y),
                hitsAperture: true,
              });
            } else {
              const extReal = getExtendedPoint(xImg_actual, yImg_actual, xHit1, yHit1, 20);
              list.push({
                id: "ray1-reflected",
                color: "stroke-purple-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit1, yHit1, extReal.x, extReal.y),
                hitsAperture: true,
              });
              list.push({
                id: "ray1-virtual",
                color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
                dashed: true,
                d: `M ${xHit1} ${yHit1} L ${xImg} ${yImg}`,
                hitsAperture: true,
              });
            }
          } else {
            const isRealImage = v > 0;
            if (isRealImage) {
              const ext = getExtendedPoint(xHit1, yHit1, xImg_actual, yImg_actual, 780);
              list.push({
                id: "ray1-refracted",
                color: "stroke-purple-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit1, yHit1, ext.x, ext.y),
                hitsAperture: true,
              });
            } else {
              const extReal = getExtendedPoint(xImg_actual, yImg_actual, xHit1, yHit1, 780);
              list.push({
                id: "ray1-refracted",
                color: "stroke-purple-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit1, yHit1, extReal.x, extReal.y),
                hitsAperture: true,
              });
              list.push({
                id: "ray1-virtual",
                color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
                dashed: true,
                d: `M ${xHit1} ${yHit1} L ${xImg} ${yImg}`,
                hitsAperture: true,
              });
            }
          }
        }
      } else {
        list.push({
          id: "ray1-straight",
          color: "stroke-purple-500/35 stroke-[1.5]",
          dashed: false,
          d: makeArrowLine(xObj, yObj, 780, yObj),
          hitsAperture: false,
        });
      }
    }

    // Ray 2: Incident through focus F / directed towards focus F
    if (activeRays.focus) {
      // Find focus F on incident side
      let xF = x0 - f;
      if (device === DeviceType.CONVEX_MIRROR) xF = x0 + f;
      else if (device === DeviceType.CONCAVE_LENS) xF = x0 + f;

      const { x: xHit2, y: yHit2 } = getMirrorIntersection(xObj, yObj, xF, y0, f, device);
      const hits2 = Math.abs(yHit2 - y0) <= aperture / 2;

      if (hits2) {
        if (infinite) {
          list.push({
            id: "ray2-incident",
            color: "stroke-orange-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, xHit2, yHit2),
            hitsAperture: hits2,
          });

          if (isMirrorLocal) {
            list.push({
              id: "ray2-reflected",
              color: "stroke-orange-400 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xHit2, yHit2, 20, yHit2),
              hitsAperture: true,
            });
          } else {
            list.push({
              id: "ray2-refracted",
              color: "stroke-orange-400 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xHit2, yHit2, 780, yHit2),
              hitsAperture: true,
            });
          }
        } else {
          list.push({
            id: "ray2-incident",
            color: "stroke-orange-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, xHit2, yHit2),
            hitsAperture: true,
          });

          const isConcaveMirror = device === DeviceType.CONCAVE_MIRROR;
          const isConvexLens = device === DeviceType.CONVEX_LENS;
          const isInsideFocus = (isConcaveMirror && xObj > xF) || (isConvexLens && xObj > xF);

          if (isInsideFocus) {
            list.push({
              id: "ray2-incident-virtual",
              color: "stroke-orange-500/55 stroke-[1.5] stroke-dasharray-[3,3]",
              dashed: true,
              d: `M ${xObj} ${yObj} L ${xF} ${y0}`,
              hitsAperture: true,
            });
          } else if (device === DeviceType.CONVEX_MIRROR || device === DeviceType.CONCAVE_LENS) {
            list.push({
              id: "ray2-incident-virtual",
              color: "stroke-orange-500/55 stroke-[1.5] stroke-dasharray-[3,3]",
              dashed: true,
              d: `M ${xHit2} ${yHit2} L ${xF} ${y0}`,
              hitsAperture: true,
            });
          }

          if (isMirrorLocal) {
            const isRealImage = v < 0;
            if (isRealImage) {
              const ext = getExtendedPoint(xHit2, yHit2, xImg_actual, yImg_actual, 20);
              list.push({
                id: "ray2-reflected",
                color: "stroke-orange-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit2, yHit2, ext.x, ext.y),
                hitsAperture: true,
              });
            } else {
              const extReal = getExtendedPoint(xImg_actual, yImg_actual, xHit2, yHit2, 20);
              list.push({
                id: "ray2-reflected",
                color: "stroke-orange-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit2, yHit2, extReal.x, extReal.y),
                hitsAperture: true,
              });
              list.push({
                id: "ray2-virtual",
                color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
                dashed: true,
                d: `M ${xHit2} ${yHit2} L ${xImg} ${yImg}`,
                hitsAperture: true,
              });
            }
          } else {
            const isRealImage = v > 0;
            if (isRealImage) {
              const ext = getExtendedPoint(xHit2, yHit2, xImg_actual, yImg_actual, 780);
              list.push({
                id: "ray2-refracted",
                color: "stroke-orange-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit2, yHit2, ext.x, ext.y),
                hitsAperture: true,
              });
            } else {
              const extReal = getExtendedPoint(xImg_actual, yImg_actual, xHit2, yHit2, 780);
              list.push({
                id: "ray2-refracted",
                color: "stroke-orange-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit2, yHit2, extReal.x, extReal.y),
                hitsAperture: true,
              });
              list.push({
                id: "ray2-virtual",
                color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
                dashed: true,
                d: `M ${xHit2} ${yHit2} L ${xImg} ${yImg}`,
                hitsAperture: true,
              });
            }
          }
        }
      } else {
        const ext = getExtendedPoint(xObj, yObj, xHit2, yHit2, 780);
        list.push({
          id: "ray2-straight",
          color: "stroke-orange-500/35 stroke-[1.5]",
          dashed: false,
          d: makeArrowLine(xObj, yObj, ext.x, ext.y),
          hitsAperture: false,
        });
      }
    }

    // Ray 3: Mirror center of curvature C OR Lens Optical Center O
    if (activeRays.curvatureOrO) {
      if (isMirrorLocal) {
        const xC = device === DeviceType.CONCAVE_MIRROR ? x0 - 2 * f : x0 + 2 * f;
        const { x: xHit3, y: yHit3 } = getMirrorIntersection(xObj, yObj, xC, y0, f, device);

        const hits3 = Math.abs(yHit3 - y0) <= aperture / 2;

        if (hits3) {
          list.push({
            id: "ray3-incident",
            color: "stroke-sky-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, xHit3, yHit3),
            hitsAperture: true,
          });

          if (device === DeviceType.CONCAVE_MIRROR && xObj > xC) {
            list.push({
              id: "ray3-c-connector",
              color: "stroke-sky-500/50 stroke-[1.5]",
              dashed: true,
              d: `M ${xC} ${y0} L ${xObj} ${yObj}`,
              hitsAperture: true,
            });
          } else if (device === DeviceType.CONVEX_MIRROR && !infinite) {
            list.push({
              id: "ray3-c-connector-virtual",
              color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
              dashed: true,
              d: `M ${xHit3} ${yHit3} L ${xC} ${y0}`,
              hitsAperture: true,
            });
          }

          if (infinite) {
            let extLeft;
            if (device === DeviceType.CONCAVE_MIRROR) {
              extLeft = getExtendedPoint(xHit3, yHit3, xC, y0, 20);
            } else {
              extLeft = getExtendedPoint(xC, y0, xHit3, yHit3, 20);
            }
            list.push({
              id: "ray3-reflected",
              color: "stroke-sky-400 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xHit3, yHit3, extLeft.x, extLeft.y),
              hitsAperture: true,
            });
          } else {
            const isRealImage = v < 0;
            if (isRealImage) {
              const ext = getExtendedPoint(xHit3, yHit3, xImg_actual, yImg_actual, 20);
              list.push({
                id: "ray3-reflected",
                color: "stroke-sky-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit3, yHit3, ext.x, ext.y),
                hitsAperture: true,
              });
            } else {
              const extReal = getExtendedPoint(xImg_actual, yImg_actual, xHit3, yHit3, 20);
              list.push({
                id: "ray3-reflected",
                color: "stroke-sky-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit3, yHit3, extReal.x, extReal.y),
                hitsAperture: true,
              });
              list.push({
                id: "ray3-virtual",
                color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
                dashed: true,
                d: `M ${xHit3} ${yHit3} L ${xImg} ${yImg}`,
                hitsAperture: true,
              });
            }
          }
        } else {
          const ext = getExtendedPoint(xObj, yObj, xHit3, yHit3, 780);
          list.push({
            id: "ray3-straight",
            color: "stroke-sky-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, ext.x, ext.y),
            hitsAperture: false,
          });
        }
      } else {
        const OC_hits = true; 
        const xHit3 = x0;
        const yHit3 = y0;

        list.push({
          id: "ray3-incident",
          color: "stroke-sky-500 stroke-[2]",
          dashed: false,
          d: makeArrowLine(xObj, yObj, xHit3, yHit3),
          hitsAperture: OC_hits,
        });

        if (infinite) {
          const extRight = getExtendedPoint(xObj, yObj, x0, y0, 780);
          list.push({
            id: "ray3-refracted",
            color: "stroke-sky-400 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xHit3, yHit3, extRight.x, extRight.y),
            hitsAperture: OC_hits,
          });
        } else {
          const isRealImage = v > 0;
          if (isRealImage) {
            const ext = getExtendedPoint(xHit3, yHit3, xImg_actual, yImg_actual, 780);
            list.push({
              id: "ray3-refracted",
              color: "stroke-sky-400 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xHit3, yHit3, ext.x, ext.y),
              hitsAperture: OC_hits,
            });
          } else {
            const extReal = getExtendedPoint(xImg_actual, yImg_actual, xHit3, yHit3, 780);
            list.push({
              id: "ray3-refracted",
              color: "stroke-sky-400 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xHit3, yHit3, extReal.x, extReal.y),
              hitsAperture: OC_hits,
            });
            list.push({
              id: "ray3-virtual",
              color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
              dashed: true,
              d: `M ${xHit3} ${yHit3} L ${xImg} ${yImg}`,
              hitsAperture: OC_hits,
            });
          }
        }
      }
    }

    // Ray 4: Sized Ray to Pole P (Mirrors) OR Symmetrical Oblique Ray (Lenses)
    if (activeRays.pole) {
      if (isMirrorLocal) {
        const pole_hits = true; 
        const xHit4 = x0;
        const yHit4 = y0;

        list.push({
          id: "ray4-incident",
          color: "stroke-amber-500 stroke-[2]",
          dashed: false,
          d: makeArrowLine(xObj, yObj, xHit4, yHit4),
          hitsAperture: pole_hits,
        });

        if (infinite) {
          const m_i = (y0 - yObj) / (x0 - xObj);
          const extLeftY = y0 + m_i * (x0 - 20);
          list.push({
            id: "ray4-reflected",
            color: "stroke-amber-400 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xHit4, yHit4, 20, extLeftY),
            hitsAperture: pole_hits,
          });
        } else {
          const isRealImage = v < 0;
          if (isRealImage) {
            const ext = getExtendedPoint(xHit4, yHit4, xImg_actual, yImg_actual, 20);
            list.push({
              id: "ray4-reflected",
              color: "stroke-amber-400 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xHit4, yHit4, ext.x, ext.y),
              hitsAperture: pole_hits,
            });
          } else {
            const extReal = getExtendedPoint(xImg_actual, yImg_actual, xHit4, yHit4, 20);
            list.push({
              id: "ray4-reflected",
              color: "stroke-amber-400 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xHit4, yHit4, extReal.x, extReal.y),
              hitsAperture: pole_hits,
            });
            list.push({
              id: "ray4-virtual",
              color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
              dashed: true,
              d: `M ${xHit4} ${yHit4} L ${xImg} ${yImg}`,
              hitsAperture: pole_hits,
            });
          }
        }
      } else {
        const yHit4 = y0 + 40; 
        const lens_hits = Math.abs(yHit4 - y0) <= aperture / 2;
        const xHit4 = x0;

        if (lens_hits) {
          list.push({
            id: "ray4-incident",
            color: "stroke-amber-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, xHit4, yHit4),
            hitsAperture: lens_hits,
          });

          if (infinite) {
            list.push({
              id: "ray4-refracted",
              color: "stroke-amber-400 stroke-[2]",
              dashed: false,
              d: makeArrowLine(xHit4, yHit4, 780, yHit4),
              hitsAperture: lens_hits,
            });
          } else {
            const isRealImage = v > 0;
            if (isRealImage) {
              const ext = getExtendedPoint(xHit4, yHit4, xImg_actual, yImg_actual, 780);
              list.push({
                id: "ray4-refracted",
                color: "stroke-amber-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit4, yHit4, ext.x, ext.y),
                hitsAperture: lens_hits,
              });
            } else {
              const extReal = getExtendedPoint(xImg_actual, yImg_actual, xHit4, yHit4, 780);
              list.push({
                id: "ray4-refracted",
                color: "stroke-amber-400 stroke-[2]",
                dashed: false,
                d: makeArrowLine(xHit4, yHit4, extReal.x, extReal.y),
                hitsAperture: lens_hits,
              });
              list.push({
                id: "ray4-virtual",
                color: "stroke-emerald-400/80 stroke-[1.5] stroke-dasharray-[4,4]",
                dashed: true,
                d: `M ${xHit4} ${yHit4} L ${xImg} ${yImg}`,
                hitsAperture: lens_hits,
              });
            }
          }
        } else {
          const ext = getExtendedPoint(xObj, yObj, xHit4, yHit4, 780);
          list.push({
            id: "ray4-straight",
            color: "stroke-amber-500 stroke-[2]",
            dashed: false,
            d: makeArrowLine(xObj, yObj, ext.x, ext.y),
            hitsAperture: false,
          });
        }
      }
    }

    return list;
  };

  const activeRaysResult = getRays(f);

  // Count active rays that successfully hit and reflect/refract
  const countHittingRays = (): number => {
    if (isAtInfinity) return 5; // Always meets at focus by design
    const activeRayItems = activeRaysResult.filter((ray) => !ray.id.includes("incident") && !ray.id.includes("virtual") && !ray.id.includes("straight"));
    const hitRays = activeRaysResult.filter((ray) => ray.id.includes("incident") && ray.hitsAperture);
    return hitRays.length;
  };

  // Draw the image only if it is not at infinity and is mathematically formed
  const shouldDrawImage = !infinite && !isAtInfinity;

  // 4. Create SVG path for mirrors/lenses with accurate surface curves
  const renderOpticalComponent = () => {
    const lensClass = "fill-cyan-500/10 stroke-cyan-400 stroke-[3] drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]";
    const mirrorClass = "fill-none stroke-sky-400 stroke-[5] drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]";
    const mirrorBackingSlashes = "stroke-slate-500 stroke-[1.5]";

    const topY = y0 - aperture / 2;
    const bottomY = y0 + aperture / 2;

    if (device === DeviceType.PLANE_MIRROR) {
      const pathData = `M ${x0} ${topY} L ${x0} ${bottomY}`;

      // Slashing intervals behind mirror (silvered side on the right side)
      const slashesCount = Math.round(aperture / 15);
      const slashes = [];
      for (let i = 0; i <= slashesCount; i++) {
        const sy = topY + (i / slashesCount) * aperture;
        slashes.push(<line key={i} x1={x0} y1={sy} x2={x0 + 6} y2={sy + 6} className={mirrorBackingSlashes} />);
      }

      return (
        <g id="plane-mirror-component">
          <path d={pathData} className={mirrorClass} />
          <g id="silvered-backing">{slashes}</g>
        </g>
      );
    } else if (device === DeviceType.CONCAVE_MIRROR) {
      const topX = getMirrorX(topY, f, device);
      const bottomX = getMirrorX(bottomY, f, device);
      const radius = 2 * f;

      const pathData = `M ${topX} ${topY} A ${radius} ${radius} 0 0 1 ${bottomX} ${bottomY}`;

      // Slashing intervals behind mirror (silvered side is on the right)
      const slashesCount = Math.round(aperture / 15);
      const slashes = [];
      for (let i = 0; i <= slashesCount; i++) {
        const sy = topY + (i / slashesCount) * aperture;
        const sx = getMirrorX(sy, f, device);
        slashes.push(<line key={i} x1={sx} y1={sy} x2={sx + 6} y2={sy + 6} className={mirrorBackingSlashes} />);
      }

      return (
        <g id="concave-mirror-component">
          <path d={pathData} className={mirrorClass} />
          <g id="silvered-backing">{slashes}</g>
        </g>
      );
    } else if (device === DeviceType.CONVEX_MIRROR) {
      const topX = getMirrorX(topY, f, device);
      const bottomX = getMirrorX(bottomY, f, device);
      const radius = 2 * f;

      // Silvered side is on the right (inside the curve)
      const pathData = `M ${topX} ${topY} A ${radius} ${radius} 0 0 0 ${bottomX} ${bottomY}`;

      const slashesCount = Math.round(aperture / 15);
      const slashes = [];
      for (let i = 0; i <= slashesCount; i++) {
        const sy = topY + (i / slashesCount) * aperture;
        const sx = getMirrorX(sy, f, device);
        slashes.push(<line key={i} x1={sx} y1={sy} x2={sx + 6} y2={sy + 6} className={mirrorBackingSlashes} />);
      }

      return (
        <g id="convex-mirror-component">
          <path d={pathData} className={mirrorClass} />
          <g id="silvered-backing">{slashes}</g>
        </g>
      );
    } else if (isCombinedActive) {
      // Draw BOTH lenses side-by-side centered around x0
      const drawLens = (pX: number, dev: DeviceType, label: string) => {
        const isConv = dev === DeviceType.CONVEX_LENS;
        const path = isConv
          ? `M ${pX} ${topY} Q ${pX + 14} ${y0} ${pX} ${bottomY} Q ${pX - 14} ${y0} ${pX} ${topY} Z`
          : `M ${pX - 12} ${topY} L ${pX + 12} ${topY} Q ${pX + 2} ${y0} ${pX + 12} ${bottomY} L ${pX - 12} ${bottomY} Q ${pX - 2} ${y0} ${pX - 12} ${topY} Z`;
        
        return (
          <g key={label}>
            <path d={path} className={lensClass} />
            <text x={pX - 6} y={topY - 10} className="text-[10px] font-mono font-bold fill-cyan-400 select-none">{label}</text>
          </g>
        );
      };

      return (
        <g id="combined-lenses-component">
          {drawLens(x0 - 9, device, "L₁")}
          {drawLens(x0 + 9, lens2Type, "L₂")}
          {/* Central thin-lens reference guideline */}
          <line
            x1={x0}
            y1={topY + 2}
            x2={x0}
            y2={bottomY - 2}
            className="stroke-cyan-400/30 stroke-[1] border-dashed"
            strokeDasharray="4 4"
          />
        </g>
      );
    } else if (device === DeviceType.CONVEX_LENS) {
      // Double convex, meeting at the ends
      const pathData = `M ${x0} ${topY} Q ${x0 + 22} ${y0} ${x0} ${bottomY} Q ${x0 - 22} ${y0} ${x0} ${topY} Z`;
      return (
        <g id="convex-lens-component">
          <path d={pathData} className={lensClass} />
          {/* Central thin-lens reference guideline */}
          <line
            x1={x0}
            y1={topY + 2}
            x2={x0}
            y2={bottomY - 2}
            className="stroke-cyan-400/40 stroke-[1.5]"
            strokeDasharray="4 4"
          />
        </g>
      );
    } else if (device === DeviceType.CONCAVE_LENS) {
      // Double concave shape with beautiful, textbook-style outer flare and deep central arc
      const halfH = aperture / 2;
      const edge = Math.max(6, halfH * 0.06);
      const bow = halfH * 0.50;

      const topHalfWidth = edge + 14;
      const centerWidth = topHalfWidth - (bow * 0.28);

      const pathData = `M ${x0 - topHalfWidth} ${topY} L ${x0 + topHalfWidth} ${topY} Q ${x0 + centerWidth} ${y0} ${x0 + topHalfWidth} ${bottomY} L ${x0 - topHalfWidth} ${bottomY} Q ${x0 - centerWidth} ${y0} ${x0 - topHalfWidth} ${topY} Z`;
      return (
        <g id="concave-lens-component">
          <path d={pathData} className={lensClass} />
          {/* Central thin-lens reference guideline */}
          <line
            x1={x0}
            y1={topY + 2}
            x2={x0}
            y2={bottomY - 2}
            className="stroke-cyan-400/40 stroke-[1.5]"
            strokeDasharray="4 4"
          />
        </g>
      );
    }
    return null;
  };

  // Label helper for Focus and Curvature nodes
  const renderInteractivePoints = () => {
    const textStyle = "text-xs font-bold font-mono select-none fill-slate-400";

    if (device === DeviceType.PLANE_MIRROR || isZeroPower) {
      return (
        <g id="reference-points">
          {/* Only render Optical Center P / O */}
          <circle cx={x0} cy={y0} r="5" className="fill-slate-500" />
          <text x={x0 - 15} y={y0 + 24} className={textStyle}>P</text>
        </g>
      );
    }

    const f = effF;
    const deviceVal = effDevice;
    const xF = x0 - f;
    const xC = x0 - 2 * f;

    if (deviceVal === DeviceType.CONCAVE_MIRROR) {
      return (
        <g id="reference-points">
          {/* Focus F */}
          <circle cx={xF} cy={y0} r="6.5" className="fill-sky-400 stroke-[#0a0f1d] stroke-2 cursor-pointer hover:scale-125 transition-transform" />
          <text x={xF - 5} y={y0 + 24} className={textStyle}>F</text>

          {/* Center of Curvature C */}
          <circle cx={xC} cy={y0} r="6.5" className="fill-indigo-400 stroke-[#0a0f1d] stroke-2 cursor-default" />
          <text x={xC - 5} y={y0 + 24} className={textStyle}>C</text>

          {/* Pole P (Separate from F in labels!) */}
          <circle cx={x0} cy={y0} r="5" className="fill-slate-500" />
          <text x={x0 - 15} y={y0 + 24} className={textStyle}>P</text>
        </g>
      );
    } else if (deviceVal === DeviceType.CONVEX_MIRROR) {
      return (
        <g id="reference-points">
          {/* Focus F is behind on the right */}
          <circle cx={x0 + f} cy={y0} r="6.5" className="fill-sky-400 stroke-[#0a0f1d] stroke-2 cursor-pointer hover:scale-125 transition-transform" />
          <text x={x0 + f - 4} y={y0 + 24} className={textStyle}>F</text>

          {/* Center C is on the right */}
          <circle cx={x0 + 2 * f} cy={y0} r="6.5" className="fill-indigo-400 stroke-[#0a0f1d] stroke-2" />
          <text x={x0 + 2 * f - 4} y={y0 + 24} className={textStyle}>C</text>

          {/* Pole P */}
          <circle cx={x0} cy={y0} r="5" className="fill-slate-500" />
          <text x={x0 - 15} y={y0 + 24} className={textStyle}>P</text>
        </g>
      );
    } else {
      // Lenses have left Focus & 2f (F1, 2F1) and right Focus & 2f (F2, 2F2)
      return (
        <g id="reference-points">
          {/* F1 */}
          <circle cx={x0 - f} cy={y0} r="6.5" className="fill-sky-400 stroke-[#0a0f1d] stroke-2 cursor-pointer hover:scale-125 transition-transform" />
          <text x={x0 - f - 6} y={y0 + 24} className={textStyle}>F₁</text>

          {/* 2F1 */}
          <circle cx={xC} cy={y0} r="6.5" className="fill-indigo-400 stroke-[#0a0f1d] stroke-2" />
          <text x={xC - 10} y={y0 + 24} className={textStyle}>2F₁</text>

          {/* F2 */}
          <circle cx={x0 + f} cy={y0} r="6.5" className="fill-sky-400 stroke-[#0a0f1d] stroke-2" />
          <text x={x0 + f - 6} y={y0 + 24} className={textStyle}>F₂</text>

          {/* 2F2 */}
          <circle cx={x0 + 2 * f} cy={y0} r="6.5" className="fill-indigo-400 stroke-[#0a0f1d] stroke-2" />
          <text x={x0 + 2 * f - 10} y={y0 + 24} className={textStyle}>2F₂</text>

          {/* Optical Center O */}
          <circle cx={x0} cy={y0} r="5" className="fill-slate-500" />
          <text x={x0 - 5} y={y0 - 15} className={textStyle}>O</text>
        </g>
      );
    }
  };

  const getMetricsPositionClasses = () => {
    return "bottom-4 right-4";
  };

  const getTitlePositionClasses = () => {
    return "top-4 left-4";
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0f1d] border border-slate-800 rounded-2xl shadow-2xl select-none p-3 sm:p-5" id="optical-simulator-canvas-container">
      {/* Visual background title overlay */}
      <div className={`absolute ${getTitlePositionClasses()} flex flex-col pointer-events-none z-10`}>
        <span className="text-[10px] uppercase tracking-widest text-[#38bdf8] font-bold font-mono">OPTICS SIMULATOR STAGE</span>
        <span className="text-sm font-bold text-slate-100 uppercase tracking-wide">
          {isCombinedActive ? `Combined Lenses (${device === DeviceType.CONVEX_LENS ? "Convex L1" : "Concave L1"} + ${lens2Type === DeviceType.CONVEX_LENS ? "Convex L2" : "Concave L2"})` : device.replace("_", " ")}
        </span>
      </div>

      {/* Real-time Optics Telemetry Metrics Overlay */}
      <div className={`absolute ${getMetricsPositionClasses()} bg-[#121c32]/95 border border-slate-800 backdrop-blur-md rounded-2xl p-4 shadow-2xl select-none max-w-xs pointer-events-none z-10 space-y-3`}>
        <div className="border-b border-slate-800/60 pb-1.5 flex justify-between items-center gap-6">
          <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#22d3ee]">
            {isCombinedActive ? "Combined Image Details" : "Image Details"}
          </span>
          <span className="text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-indigo-950 font-bold border border-indigo-500/10 text-indigo-400">
            REAL-TIME HUD
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[11px]">
          <div>
            <div className="text-[9px] text-slate-500 uppercase font-semibold">Obj Distance (u)</div>
            <div className="font-extrabold text-rose-400">{isAtInfinity ? "At Infinity (∞)" : `${(u / 5).toFixed(1)} cm`}</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 uppercase font-semibold">Img Distance (v)</div>
            <div className="font-extrabold text-sky-400">
              {isZeroPower ? "Straight Through" : (isAtInfinity ? (effDevice.includes("MIRROR") ? (effDevice.includes("CONCAVE") ? `-${(effF / 5).toFixed(1)} cm (Focus F)` : `+${(effF / 5).toFixed(1)} cm (Focus F)`) : `+${(effF / 5).toFixed(1)} cm (Focus F)`) : (infinite ? "At Infinity (∞)" : `${(v / 5).toFixed(1)} cm`))}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 uppercase font-semibold">Obj Size (h)</div>
            <div className="font-extrabold text-purple-400">{(h / 5).toFixed(1)} cm</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 uppercase font-semibold">Equivalent F (f)</div>
            <div className="font-extrabold text-emerald-400">
              {isZeroPower ? "No Power (f = ∞)" : `${(effF / 5).toFixed(1)} cm`}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/40 pt-2.5 space-y-1 text-xs">
          <div className="flex justify-between items-center bg-slate-950/45 px-2 py-1 rounded">
            <span className="text-[10.5px] font-bold text-slate-400">Nature:</span>
            <span className="font-extrabold text-[#38bdf8] font-sans">
              {isZeroPower ? (
                "No Refraction"
              ) : isAtInfinity ? (
                effDevice.replace("_", " ").includes("CONCAVE MIRROR") || effDevice.replace("_", " ").includes("CONVEX LENS")
                  ? "Real & Inverted"
                  : "Virtual & Erect"
              ) : infinite ? (
                "Real & Inverted"
              ) : (isMirror ? (v < 0 ? "Real & Inverted" : "Virtual & Erect") : (v > 0 ? "Real & Inverted" : "Virtual & Erect"))}
            </span>
          </div>

          <div className="flex justify-between items-center bg-slate-950/45 px-2 py-1 rounded">
            <span className="text-[10.5px] font-bold text-slate-400">Magnification (m):</span>
            <span className="font-extrabold text-indigo-400 font-mono">
              {isZeroPower ? "m = 1.00x (Erect)" : isAtInfinity ? "m ≈ 0 (Diminished)" : infinite ? "m ≈ ∞" : `${(hPrime / h).toFixed(2)}x`}
            </span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <svg
        viewBox="80 67.5 560 315"
        className="w-full h-auto cursor-crosshair touch-none select-none rounded-xl"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <defs>
          <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="currentColor" className="text-slate-800/20" strokeWidth="1" />
          </pattern>

          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-slate-500" />
          </marker>
          <marker id="ray1-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-purple-400" />
          </marker>
          <marker id="ray2-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-orange-400" />
          </marker>
          <marker id="ray3-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-sky-400" />
          </marker>
          <marker id="ray4-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-amber-400" />
          </marker>
          <marker id="virtual-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-emerald-400" />
          </marker>
          <marker id="rose-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-rose-400" />
          </marker>
        </defs>

        {/* 1. Grid Background */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* 2. Principal Axis */}
        <line
          x1="15"
          y1={y0}
          x2="785"
          y2={y0}
          className="stroke-slate-500/50 stroke-[1.5]"
        />
        <text x="545" y={y0 - 8} className="text-[9px] font-mono font-bold tracking-wider fill-slate-500 select-none uppercase">Principal Axis</text>

        {/* 3. Optical Component Rendering */}
        {renderOpticalComponent()}

        {/* Height limits indicator lines (Aperture bounds checking) */}
        <g id="aperture-limits">
          <line
            x1={x0 - 45}
            y1={y0 - aperture / 2}
            x2={x0 + 45}
            y2={y0 - aperture / 2}
            className="stroke-slate-700/65 stroke-[1] stroke-dasharray-[2,3]"
          />
          <line
            x1={x0 - 45}
            y1={y0 + aperture / 2}
            x2={x0 + 45}
            y2={y0 + aperture / 2}
            className="stroke-slate-700/65 stroke-[1] stroke-dasharray-[2,3]"
          />
          <text x={x0 + 50} y={y0 - aperture/2 + 4} className="text-[8px] font-mono fill-slate-600 font-bold select-none uppercase">Aperture Limit</text>
        </g>

        {/* 4. Trace Active Rays with arrow pointer indicators */}
        <g id="optical-rays">
          {activeRaysResult.flatMap((ray) => {
            // Extract coordinate pairs following M or L
            const pairs: Array<{ x: number; y: number }> = [];
            const regex = /(?:M|L)\s+([\d.-]+)\s+([\d.-]+)/ig;
            let match;
            while ((match = regex.exec(ray.d)) !== null) {
              pairs.push({ x: parseFloat(match[1]), y: parseFloat(match[2]) });
            }

            if (pairs.length < 2) return [];

            // Split into individual line segments
            const segments: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
            for (let i = 0; i < pairs.length - 1; i++) {
              segments.push({
                x1: pairs[i].x,
                y1: pairs[i].y,
                x2: pairs[i + 1].x,
                y2: pairs[i + 1].y,
              });
            }

            return segments.map((seg, idx) => {
              let arrowHead = "url(#arrow)";
              const colorStr = ray.color.toLowerCase();
              if (colorStr.includes("purple")) {
                arrowHead = "url(#ray1-arrow)";
              } else if (colorStr.includes("orange")) {
                arrowHead = "url(#ray2-arrow)";
              } else if (colorStr.includes("sky") || colorStr.includes("cyan")) {
                arrowHead = "url(#ray3-arrow)";
              } else if (colorStr.includes("amber") || colorStr.includes("yellow")) {
                arrowHead = "url(#ray4-arrow)";
              } else if (colorStr.includes("emerald")) {
                arrowHead = "url(#virtual-arrow)";
              } else if (colorStr.includes("rose")) {
                arrowHead = "url(#rose-arrow)";
              }

              const segId = `${ray.id}-seg-${idx}`;

              return (
                <line
                  key={segId}
                  x1={seg.x1}
                  y1={seg.y1}
                  x2={seg.x2}
                  y2={seg.y2}
                  className={`${ray.color} ${ray.dashed ? "" : "stroke-[2]"}`}
                  strokeDasharray={ray.dashed ? "4 4" : undefined}
                  markerEnd={arrowHead}
                />
              );
            });
          })}
        </g>

        {/* 5. Reference nodes */}
        {renderInteractivePoints()}

        {/* 6. Render the Object (Always visible to allow height adjustment and visual presence) */}
        {true && (
          <g className="cursor-grab active:cursor-grabbing" id="simulation-object">
            {isPointObject ? (
              // Point Object: Solid Red Dot on Axis
              <g>
                <circle
                  cx={xObj}
                  cy={y0}
                  r="18"
                  className="fill-rose-500/10 stroke-rose-400/40 stroke-[1.5] stroke-dasharray-[3,3]"
                />
                <circle cx={xObj} cy={y0} r="8.5" className="fill-rose-500 stroke-[#0a0f1d] stroke-2 animate-pulse shadow-xl" />
                <text x={xObj - 24} y={y0 - 15} className="text-[10px] font-extrabold font-mono fill-rose-400 select-none bg-black">
                  POINT OBJECT
                </text>
              </g>
            ) : (
              // Sized Object: Standard arrow on axis
              <g>
                <circle
                  cx={xObj}
                  cy={yObj}
                  r="16"
                  className="fill-rose-500/10 stroke-rose-500/30 stroke-1 stroke-dasharray-[3,3]"
                />
                <line
                  x1={xObj}
                  y1={y0}
                  x2={xObj}
                  y2={yObj}
                  className="stroke-rose-500 stroke-[3.5] drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]"
                />
                <polygon
                  points={`${xObj - 7},${yObj + 4} ${xObj + 7},${yObj + 4} ${xObj},${yObj - 6}`}
                  className="fill-rose-500 stroke-rose-600 stroke-1"
                />
                <circle cx={xObj} cy={yObj} r="6" className="fill-rose-400 cursor-pointer shadow-md" />
                <text x={xObj - 12} y={y0 + 15} className="text-[10px] font-bold fill-rose-500 text-center select-none font-mono">A</text>
                <text x={xObj - 12} y={yObj - 10} className="text-[10px] font-bold fill-rose-400 text-center select-none font-mono">B (Object)</text>
              </g>
            )}
          </g>
        )}

        {/* 7. Draw Computed Image Point / Arrow */}
        {shouldDrawImage && (
          <g id="simulation-image">
            {isPointObject ? (
              // Point Size Image formed on Axis
              <g>
                <circle cx={xImg} cy={y0} r="7.5" className="fill-emerald-400 stroke-[#0a0f1d] stroke-2 shadow-lg" />
                <text x={xImg - 15} y={y0 - 15} className="text-[10px] font-extrabold font-mono fill-emerald-400 select-none bg-black">
                  POINT IMAGE
                </text>
              </g>
            ) : (
              // Standard Arrow image matching orientation
              <g>
                <line
                  x1={xImg}
                  y1={y0}
                  x2={xImg}
                  y2={yImg}
                  className="stroke-emerald-400 stroke-[3.5] drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  strokeDasharray={hPrime > 0 ? "4 4" : undefined}
                />
                {hPrime >= 0 ? (
                  <polygon
                    points={`${xImg - 7},${yImg + 4} ${xImg + 7},${yImg + 4} ${xImg},${yImg - 6}`}
                    className="fill-emerald-400 stroke-emerald-500 stroke-1"
                  />
                ) : (
                  <polygon
                    points={`${xImg - 7},${yImg - 4} ${xImg + 7},${yImg - 4} ${xImg},${yImg + 6}`}
                    className="fill-emerald-400 stroke-emerald-500 stroke-1"
                  />
                )}
                <text x={xImg - 14} y={y0 + (hPrime >= 0 ? 15 : -8)} className="text-[10px] font-bold fill-emerald-400 font-mono select-none">A'</text>
                <text x={xImg - 14} y={yImg + (hPrime >= 0 ? -10 : 15)} className="text-[10px] font-bold fill-emerald-400 font-mono select-none">
                  B' {hPrime >= 0 ? "(Virtual)" : "(Real)"}
                </text>
              </g>
            )}
          </g>
        )}

        {/* 8. Object at Infinity Case: Separate Image & Focal point text labels (Point 12) */}
        {isAtInfinity && (
          <g transform={`translate(${device.includes("CONVEX") || device === DeviceType.CONVEX_LENS ? x0 + f : x0 - f}, 190)`} id="separation-inf-case">
            <rect x="-65" y="-12" width="130" height="20" rx="4" fill="#0f172a" className="stroke-emerald-500/60 stroke-[1.5] shadow-xl" />
            <text x="0" y="1" textAnchor="middle" className="text-[9px] font-extrabold font-mono fill-emerald-400 uppercase tracking-widest">
              Image at Focus (F)
            </text>
          </g>
        )}
      </svg>

      {/* Guide details bottom deck area */}
      <div className="mt-4 border-t border-slate-800/80 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] text-slate-400 font-medium px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            <span>Aperture: <b>{(aperture / 5).toFixed(1)} cm (Fixed)</b>. Very large aperture compared to object height ({(h / 5).toFixed(1)} cm) ensures highly accurate paraxial ray traces.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Image Status: <b>{shouldDrawImage ? "Formed" : (isAtInfinity ? "Formed at Focus (F)" : "Formed at Infinity")}</b>.</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Focus is interactive! Drag the orange focused dot or use the sliders on the right.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            <span>Sign Convention page values match standard optics convention.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
