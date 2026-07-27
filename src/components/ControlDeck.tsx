import React from "react";
import { DeviceType, Preset } from "../types";
import { DEV_LIMITS } from "../data";
import {
  Compass,
  MoveHorizontal,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  Layers,
  Zap,
} from "lucide-react";

interface ControlDeckProps {
  device: DeviceType;
  onChangeDevice: (dev: DeviceType) => void;
  u: number;
  h: number;
  f: number;
  aperture: number;
  onChangeAperture: (ap: number) => void;
  isPointObject: boolean;
  onChangeIsPointObject: (val: boolean) => void;
  pointAngle1: number;
  onChangePointAngle1: (angle: number) => void;
  pointAngle2: number;
  onChangePointAngle2: (angle: number) => void;
  activeRays: {
    parallel: boolean;
    focus: boolean;
    curvatureOrO: boolean;
    pole: boolean;
  };
  onChangeActiveRays: (rays: {
    parallel: boolean;
    focus: boolean;
    curvatureOrO: boolean;
    pole: boolean;
  }) => void;
  onChangeU: (u: number) => void;
  onChangeH: (h: number) => void;
  onChangeF: (f: number) => void;
  onReset: () => void;
  combineLenses: boolean;
  onChangeCombineLenses: (val: boolean) => void;
  lens2Type: DeviceType;
  onChangeLens2Type: (val: DeviceType) => void;
  f2: number;
  onChangeF2: (val: number) => void;
  
  // Real-time calculated properties from parent App
  currentVVal: number;
  currentHPrimeVal: number;
  isZeroPowerCombinedVal: boolean;
}

export const ControlDeck: React.FC<ControlDeckProps> = ({
  device,
  onChangeDevice,
  u,
  h,
  f,
  aperture,
  onChangeAperture,
  isPointObject,
  onChangeIsPointObject,
  pointAngle1,
  onChangePointAngle1,
  pointAngle2,
  onChangePointAngle2,
  activeRays,
  onChangeActiveRays,
  onChangeU,
  onChangeH,
  onChangeF,
  onReset,
  combineLenses,
  onChangeCombineLenses,
  lens2Type,
  onChangeLens2Type,
  f2,
  onChangeF2,
  currentVVal,
  currentHPrimeVal,
  isZeroPowerCombinedVal,
}) => {
  const isMirror = device === DeviceType.CONCAVE_MIRROR || device === DeviceType.CONVEX_MIRROR || device === DeviceType.PLANE_MIRROR;
  const isSphericalMirror = device === DeviceType.CONCAVE_MIRROR || device === DeviceType.CONVEX_MIRROR;
  const isAtInfinity = u <= -295;

  // Generate presets dynamically so At C and At F targets update with focal edits
  const getPresets = (): Preset[] => {
    const clampU = (val: number) => Math.max(-300, Math.min(-50, val));
    switch (device) {
      case DeviceType.PLANE_MIRROR:
        return [
          { id: "pm-standard", label: "Object at 150px", u: -150, description: "Equal-sized, virtual & erect image located exactly 150px behind the mirror (v = +150px)." },
          { id: "pm-close", label: "Close (80px)", u: -80, description: "Equal-sized, virtual & erect image located 80px behind." },
        ];
      case DeviceType.CONCAVE_MIRROR:
        return [
          { id: "cm-inf", label: "At Infinity", u: -300, description: "Highly diminished, point image at Focus F." },
          { id: "cm-beyond-c", label: "Beyond C", u: clampU(-Math.round(2.6 * f)), description: "Diminished, real & inverted image between F and C." },
          { id: "cm-at-c", label: "At C (2f)", u: clampU(-2 * f), description: "Same size, real & inverted image exactly at C." },
          { id: "cm-bet-cf", label: "Between C & F", u: clampU(-Math.round(1.5 * f)), description: "Magnified, real & inverted image beyond C." },
          { id: "cm-at-f", label: "At Focus F", u: clampU(-f), description: "Highly magnified image formed at infinity on left." },
          { id: "cm-bet-fp", label: "Within F", u: clampU(-Math.round(0.5 * f)), description: "Magnified, virtual & erect magnifying glass effect!" },
        ];
      case DeviceType.CONVEX_MIRROR:
        return [
          { id: "cxm-inf", label: "At Infinity", u: -300, description: "Highly diminished virtual image at F behind mirror." },
          { id: "cxm-bet-infp", label: "Between Inf & Pole", u: -120, description: "Diminished, virtual, and erect image behind mirror." },
        ];
      case DeviceType.CONVEX_LENS:
        return [
          { id: "cl-inf", label: "At Infinity", u: -300, description: "Highly diminished real image at focus F₂ on the right." },
          { id: "cl-beyond-2f", label: "Beyond 2F₁", u: clampU(-Math.round(2.6 * f)), description: "Diminished real/inverted image between F₂ and 2F₂." },
          { id: "cl-at-2f", label: "At 2F₁ (2f)", u: clampU(-2 * f), description: "Same size, real/inverted image exactly at 2F₂." },
          { id: "cl-bet-2ff", label: "Between 2F₁ & F₁", u: clampU(-Math.round(1.5 * f)), description: "Magnified real/inverted image beyond 2F₂." },
          { id: "cl-at-f", label: "At Focus F₁", u: clampU(-f), description: "Extremely magnified real image formed at infinity on right." },
          { id: "cl-bet-fo", label: "Within F₁", u: clampU(-Math.round(0.5 * f)), description: "Magnified, erect, virtual image on the same side." },
        ];
      case DeviceType.CONCAVE_LENS:
        return [
          { id: "cnl-inf", label: "At Infinity", u: -300, description: "Highly diminished virtual image at F₁ on left side." },
          { id: "cnl-anywhere", label: "Between Inf & O", u: -120, description: "Diminished, virtual & erect image between F₁ and O." },
        ];
    }
  };

  const presets = getPresets();

  const handleToggleRay = (rayKey: "parallel" | "focus" | "curvatureOrO" | "pole") => {
    onChangeActiveRays({
      ...activeRays,
      [rayKey]: !activeRays[rayKey],
    });
  };

  // Magnification & Nature calculators
  let magnification = 0;
  let hasRealImage = false;
  if (!isAtInfinity && Math.abs(currentVVal) < 5000) {
    magnification = isMirror ? -currentVVal / u : currentVVal / u;
    if (isMirror) {
      hasRealImage = currentVVal < 0;
    } else {
      hasRealImage = currentVVal > 0;
    }
  }

  const roundedV = Math.abs(currentVVal) > 5000 ? "Infinity (∞)" : `${(currentVVal / 5).toFixed(1)} cm`;
  const roundedHPrime = isPointObject 
                     ? "Point Spec" 
                     : (Math.abs(currentHPrimeVal) > 5000 ? "Infinity" : `${(currentHPrimeVal / 5).toFixed(1)} cm`);

  let natureString = "No image";
  if (device === DeviceType.PLANE_MIRROR) {
    natureString = "Virtual & Erect • Same Size";
  } else if (isAtInfinity) {
    natureString = isMirror 
                 ? (device === DeviceType.CONCAVE_MIRROR ? "Real & Inverted • Point Focus" : "Virtual & Erect • Point Focus")
                 : (device === DeviceType.CONVEX_LENS ? "Real & Inverted • Point Focus" : "Virtual & Erect • Point Focus");
  } else if (Math.abs(currentVVal) > 5000) {
    natureString = "Formed at Infinity";
  } else {
    const orientation = hasRealImage ? "Real & Inverted" : "Virtual & Erect";
    const magSize = Math.abs(magnification) > 1.05 
                  ? "Magnified" 
                  : (Math.abs(magnification) < 0.95 ? "Diminished" : "Same Size");
    natureString = `${orientation} • ${magSize}`;
  }

  return (
    <div className="flex flex-col gap-4 font-sans bg-[#0d1527]/90 border border-slate-800/90 rounded-2xl p-4 shadow-xl mb-6">
      
      {/* ROW 1: CONTROLS & PARAMS SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Row 1, Segment 1: Device + Mode Selections (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-xl p-3 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-850">
            <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Compass className="w-3.5 h-3.5" />
              Optical Device Set
            </h4>
            <button
              onClick={onReset}
              title="Reset configuration parameters"
              className="px-2 py-0.5 rounded text-[9.5px] font-mono bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <RotateCcw className="w-2.5 h-2.5" /> Reset
            </button>
          </div>
          
          {/* Inline compact devices buttons */}
          <div className="grid grid-cols-5 gap-1">
            {Object.values(DeviceType).map((type) => {
              const isSelected = device === type;
              let shortLabel = "";
              if (type === DeviceType.PLANE_MIRROR) shortLabel = "Plane";
              else if (type === DeviceType.CONCAVE_MIRROR) shortLabel = "Conc. M";
              else if (type === DeviceType.CONVEX_MIRROR) shortLabel = "Conv. M";
              else if (type === DeviceType.CONVEX_LENS) shortLabel = "Conv. L";
              else if (type === DeviceType.CONCAVE_LENS) shortLabel = "Conc. L";

              return (
                <button
                  key={type}
                  onClick={() => onChangeDevice(type)}
                  className={`py-1.5 px-0.5 text-[9px] rounded-lg border transition-all cursor-pointer font-semibold text-center ${
                    isSelected
                      ? "bg-sky-500/15 border-sky-400 text-sky-300 shadow-md shadow-sky-500/5 font-bold"
                      : "border-slate-850 bg-slate-900/30 hover:bg-slate-900/75 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>

          {/* Sized Arrow vs Point toggle inline list */}
          <div className="grid grid-cols-2 gap-1 bg-slate-950 p-[3px] rounded-lg border border-slate-850">
            <button
              onClick={() => onChangeIsPointObject(false)}
              className={`py-1 text-[10px] font-bold transition-all rounded cursor-pointer ${
                !isPointObject ? "bg-slate-800 text-sky-400" : "text-slate-500 hover:text-slate-400"
              }`}
            >
              Sized Arrow
            </button>
            <button
              onClick={() => onChangeIsPointObject(true)}
              className={`py-1 text-[10px] font-bold transition-all rounded cursor-pointer ${
                isPointObject ? "bg-slate-800 text-amber-400" : "text-slate-500 hover:text-slate-400"
              }`}
            >
              Point Light Source
            </button>
          </div>
        </div>

        {/* Row 1, Segment 2: Fine-Tuning Sliders (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-xl p-3 flex flex-col justify-between gap-1.5">
          <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5 font-mono border-b border-slate-850 pb-1.5 w-full">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Lab Parameters Slider
          </h4>

          {/* Sliding logic variables */}
          <div className="space-y-1.5">
            {/* 1. Distance Slider (u) */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[10.5px]">
                <span className="text-slate-400">Obj. Distance (u):</span>
                <span className="font-mono font-bold text-rose-400">{isAtInfinity ? "At Infinity (∞)" : `${(Math.abs(u) / 5).toFixed(1)} cm`}</span>
              </div>
              {!isAtInfinity ? (
                <input
                  type="range"
                  min={DEV_LIMITS.uMin}
                  max={DEV_LIMITS.uMax}
                  value={u}
                  onChange={(e) => onChangeU(Number(e.target.value))}
                  className="w-full h-1 accent-rose-500 bg-slate-900 rounded cursor-ew-resize"
                />
              ) : (
                <div className="h-4 flex items-center justify-center bg-rose-950/20 border border-rose-900/10 rounded">
                  <span className="text-[9px] font-bold text-rose-500 font-mono tracking-wider">LOCKED AT INFINITY FORM</span>
                </div>
              )}
            </div>

            {/* 2. Sized Height (h) or Point Angle sliders */}
            {!isPointObject ? (
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[10.5px]">
                  <span className="text-slate-400">Obj. Height (h):</span>
                  <span className="font-mono font-bold text-rose-400">
                    {(h / 5).toFixed(1)} cm
                  </span>
                </div>
                <input
                  type="range"
                  min={DEV_LIMITS.hMin}
                  max={DEV_LIMITS.hMax}
                  value={h}
                  onChange={(e) => onChangeH(Number(e.target.value))}
                  className="w-full h-1 accent-rose-500 bg-slate-900 rounded cursor-ew-resize"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-mono">θ₁ Angle ({pointAngle1}°)</span>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={pointAngle1}
                    onChange={(e) => onChangePointAngle1(Number(e.target.value))}
                    className="w-full h-1 accent-purple-500 bg-slate-900 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-mono">θ₂ Angle ({pointAngle2}°)</span>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={pointAngle2}
                    onChange={(e) => onChangePointAngle2(Number(e.target.value))}
                    className="w-full h-1 accent-amber-500 bg-slate-900 rounded"
                  />
                </div>
              </div>
            )}

            {/* 3. Focal Length (f) */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[10.5px]">
                <span className="text-slate-400">Focal Length (f):</span>
                <span className="font-mono font-bold text-sky-400">
                  {device === DeviceType.PLANE_MIRROR ? "Infinity (∞)" : `${(f / 5).toFixed(1)} cm`}
                </span>
              </div>
              {device !== DeviceType.PLANE_MIRROR ? (
                <input
                  type="range"
                  min={DEV_LIMITS.fMin}
                  max={DEV_LIMITS.fMax}
                  value={f}
                  onChange={(e) => onChangeF(Number(e.target.value))}
                  className="w-full h-1 accent-sky-405 bg-slate-900 rounded cursor-ew-resize"
                />
              ) : (
                <div className="h-4 flex items-center justify-center bg-slate-900/60 rounded">
                  <span className="text-[9px] text-slate-500 font-mono">f = ∞ (Plane scale)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 1, Segment 3: Easy Textbook Positions Presets (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-xl p-3 flex flex-col gap-1.5">
          <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5 font-mono border-b border-slate-850 pb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Standard Presets Jump
          </h4>
          
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-2 gap-1.5 overflow-y-auto max-h-[105px] pr-0.5">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onChangeU(preset.u)}
                title={preset.description}
                className="text-left px-2 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded text-[10px] transition-all cursor-pointer flex flex-col justify-center gap-0.5"
              >
                <span className="text-slate-200 font-bold leading-tight block truncate">{preset.label}</span>
                <span className="text-[8.5px] text-slate-500 truncate block font-mono">u = {(preset.u / 5).toFixed(1)} cm</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ROW 2: OPTO-CASTING, COMBINATION, & REALLIVE LAUNCH DATA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch border-t border-slate-800/50 pt-3">
        
        {/* Row 2, Segment 1: Casting Rays Check chips (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-xl p-3 flex flex-col justify-between gap-2">
          <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5 font-mono border-b border-slate-850 pb-1.5">
            <Layers className="w-3.5 h-3.5" />
            Casted Physics Rays
          </h4>

          {isAtInfinity ? (
            <div className="h-full flex items-center justify-center p-1 bg-sky-950/15 border border-sky-900/10 rounded-lg">
              <span className="text-[9.5px] font-bold text-sky-400 font-mono tracking-wide text-center">
                ✓ 5 Parallel infinity rays casted automatically
              </span>
            </div>
          ) : !isPointObject ? (
            <div className="grid grid-cols-2 gap-1.5">
              {/* Ray 1 */}
              <button
                onClick={() => handleToggleRay("parallel")}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeRays.parallel 
                    ? "bg-purple-950/30 border-purple-500/40 text-purple-300"
                    : "border-slate-850 bg-slate-900/50 text-slate-500"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${activeRays.parallel ? "bg-purple-400" : "bg-slate-600"}`} />
                Parallel
              </button>

              {/* Ray 2 */}
              {device !== DeviceType.PLANE_MIRROR ? (
                <button
                  onClick={() => handleToggleRay("focus")}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeRays.focus 
                      ? "bg-orange-950/30 border-orange-500/40 text-orange-300"
                      : "border-slate-850 bg-slate-900/50 text-slate-500"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${activeRays.focus ? "bg-orange-400" : "bg-slate-600"}`} />
                  Focus F
                </button>
              ) : (
                <div className="py-1.5 px-2 border border-slate-900 bg-slate-950/50 text-slate-600 text-[9.5px] font-mono rounded-lg flex items-center justify-center">
                  (Single Mirror)
                </div>
              )}

              {/* Ray 3 */}
              {device !== DeviceType.PLANE_MIRROR ? (
                <button
                  onClick={() => handleToggleRay("curvatureOrO")}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeRays.curvatureOrO 
                      ? "bg-sky-950/30 border-sky-500/40 text-sky-300"
                      : "border-slate-850 bg-slate-900/50 text-slate-500"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${activeRays.curvatureOrO ? "bg-sky-400" : "bg-slate-600"}`} />
                  {isMirror ? "Center C" : "Optical O"}
                </button>
              ) : (
                <div className="py-1.5 px-2 border border-slate-900 bg-slate-950/50 text-slate-600 text-[9.5px] font-mono rounded-lg flex items-center justify-center">
                  (Flat Surface)
                </div>
              )}

              {/* Ray 4 */}
              <button
                onClick={() => handleToggleRay("pole")}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeRays.pole 
                    ? "bg-amber-950/30 border-amber-500/40 text-amber-300"
                    : "border-slate-850 bg-slate-900/50 text-slate-500"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${activeRays.pole ? "bg-amber-400" : "bg-slate-600"}`} />
                {device === DeviceType.PLANE_MIRROR ? "Pole P" : (isMirror ? "Pole P" : "Oblique")}
              </button>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-1 bg-amber-950/15 border border-amber-900/10 rounded-lg">
              <span className="text-[9.5px] font-bold text-amber-300 font-mono tracking-wide text-center">
                Casting manual point source angles θ₁ & θ₂
              </span>
            </div>
          )}
        </div>

        {/* Row 2, Segment 2: Dual Lenses Combination Support (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-xl p-3 flex flex-col justify-between gap-1.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-850 w-full">
            <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Zap className="w-3.5 h-3.5" />
              Dual-Optics Assembly
            </h4>
            
            {/* Combine Check */}
            {(device === DeviceType.CONVEX_LENS || device === DeviceType.CONCAVE_LENS) && (
              <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold select-none text-cyan-400">
                <input
                  type="checkbox"
                  checked={combineLenses}
                  onChange={(e) => onChangeCombineLenses(e.target.checked)}
                  className="accent-cyan-400 cursor-pointer h-3.5 w-3.5 rounded"
                />
                Combine L₂
              </label>
            )}
          </div>

          {/* Inline configurations depending on active combined module */}
          {(device === DeviceType.CONVEX_LENS || device === DeviceType.CONCAVE_LENS) ? (
            combineLenses ? (
              <div className="space-y-1.5 bg-slate-950/40 p-2 border border-slate-850/65 rounded-lg">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 font-mono font-bold uppercase">L₂ Type:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onChangeLens2Type(DeviceType.CONVEX_LENS)}
                      className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold cursor-pointer transition-all ${
                        lens2Type === DeviceType.CONVEX_LENS ? "bg-slate-800 text-cyan-300" : "text-slate-500"
                      }`}
                    >
                      Convex
                    </button>
                    <button
                      onClick={() => onChangeLens2Type(DeviceType.CONCAVE_LENS)}
                      className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold cursor-pointer transition-all ${
                        lens2Type === DeviceType.CONCAVE_LENS ? "bg-slate-800 text-cyan-300" : "text-slate-500"
                      }`}
                    >
                      Concave
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">f₂ Focal Length:</span>
                    <span className="font-mono font-bold text-cyan-400">{(f2 / 5).toFixed(1)} cm</span>
                  </div>
                  <input
                    type="range"
                    min={DEV_LIMITS.fMin}
                    max={DEV_LIMITS.fMax}
                    value={f2}
                    onChange={(e) => onChangeF2(Number(e.target.value))}
                    className="w-full h-1 accent-cyan-400 bg-slate-900 rounded cursor-ew-resize"
                  />
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-2 text-center">
                <p className="text-[10px] text-slate-500 font-medium max-w-xs">
                  Single lens simulator mode active. Turn on "Combine L₂" to add a coaxial double thin-lens block.
                </p>
              </div>
            )
          ) : (
            <div className="h-full flex items-center justify-center p-2 text-center text-slate-600">
              <span className="text-[10px] uppercase font-mono font-bold">COMBINATION NA FOR MIRRORS</span>
            </div>
          )}
        </div>

        {/* Row 2, Segment 3: Live Results Verdict Telemetry (4 cols) */}
        <div className="lg:col-span-4 bg-[#101b33]/60 border border-indigo-950/80 rounded-xl p-3 flex flex-col justify-between gap-1 shadow-inner relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-center pb-1 border-b border-indigo-950">
            <span className="text-[9px] font-mono leading-none tracking-widest text-[#22d3ee] font-bold uppercase">Live Physics Output</span>
            <span className="text-[8.5px] font-mono bg-cyan-950 px-1.5 py-0.5 rounded text-cyan-400 font-bold">TELEMETRY</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="flex flex-col">
              <span className="text-[8.5px] text-slate-500 uppercase tracking-wider font-mono">Image Pos. (v)</span>
              <span className="text-xs font-bold text-cyan-400 font-mono mt-0.5">{roundedV}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8.5px] text-slate-500 uppercase tracking-wider font-mono">Image Ht. (h')</span>
              <span className="text-xs font-bold text-rose-400 font-mono mt-0.5">{roundedHPrime}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 justify-between bg-slate-950/40 p-1.5 rounded mt-1.5 border border-indigo-950/40">
            <div className="text-[9.5px] font-mono font-bold text-[#fafafa] flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {natureString}
            </div>
            
            {!isPointObject && Math.abs(currentVVal) < 5000 && (
              <div className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/20 text-[#38bdf8]">
                m = {magnification >= 0 ? "+" : ""}{magnification.toFixed(2)}x
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
