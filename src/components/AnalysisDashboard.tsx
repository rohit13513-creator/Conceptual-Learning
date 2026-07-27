import React from 'react';
import {
  Info,
  HelpCircle,
  BookOpen,
  Scale,
  Eye,
  ChevronRight,
  Activity,
  ChevronsUp,
  ChevronsDown,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import type { ImageResult, OpticsType } from './OpticsCanvas';

interface AnalysisDashboardProps {
  opticsType: OpticsType;
  focalLength: number;
  objectDist: number;
  objectHeight: number;
  result: ImageResult;
  activeRays: Set<1 | 2 | 3 | 4>;
  objectType: 'arrow' | 'point';
  isLightMode?: boolean;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  opticsType,
  focalLength,
  objectDist,
  objectHeight,
  result,
  activeRays,
  objectType,
  isLightMode = false,
}) => {
  const isMirror = opticsType.includes('mirror');
  const isLens = opticsType.includes('lens');
  const isConcave = opticsType.includes('concave');
  const isConvex = opticsType.includes('convex');

  // NCERT signed values
  const signedU = -objectDist;

  let signedF = focalLength;
  if (isConcave) {
    signedF = -focalLength;
  }

  const vVal = result.atInfinity ? 0 : result.v;
  const signedVStr = result.atInfinity ? '±∞' : `${vVal > 0 ? '+' : ''}${vVal.toFixed(1)}`;
  const signedMStr = result.atInfinity ? '∞' : `${result.m > 0 ? '+' : ''}${result.m.toFixed(2)}`;
  const imgHtStr = result.atInfinity ? '∞' : `${result.imageHeight > 0 ? '+' : ''}${result.imageHeight.toFixed(1)}`;

  const numRaysActive = activeRays.size;
  const showStats = numRaysActive >= 2;

  // Let's create user-friendly text descriptions for NCERT interpretation rules
  const sizeExplanation = () => {
    if (result.atInfinity) {
      return 'Formed at infinity (highly magnified).';
    }
    const absM = Math.abs(result.m);
    if (absM > 1.05) {
      return `Magnification magnitude (${absM.toFixed(2)}) > 1, hence image is larger than the object.`;
    } else if (absM < 0.95) {
      return `Magnification magnitude (${absM.toFixed(2)}) < 1, hence image is smaller than the object.`;
    } else {
      return `Magnification magnitude (${absM.toFixed(2)}) ≈ 1, hence image is of the exact same size as the object.`;
    }
  };

  const natureExplanation = () => {
    if (result.atInfinity) {
      return 'At focus F / infinity: real, inverted, highly enlarged.';
    }
    if (result.isReal) {
      return 'Real image: Reflected/refracted rays physically intersect on the screen. It is always Inverted (upside-down).';
    } else {
      return 'Virtual image: Rays appear to diverge from behind/inside the device. It is always Erect (upright).';
    }
  };

  const formulaString = isMirror
    ? "1/v + 1/u = 1/f"
    : "1/v - 1/u = 1/f";

  const formulaTitle = isMirror
    ? "Mirror Formula"
    : "Lens Formula";

  // Position of object relative to focal points for NCERT lookup
  const getObjectPositionDesc = () => {
    if (objectDist === 9999) return 'At Infinity (∞)';
    const doubleF = 2 * focalLength;
    if (objectDist > doubleF) {
      return isMirror ? 'Beyond Centre of Curvature C' : 'Beyond 2F₁';
    } else if (objectDist === doubleF) {
      return isMirror ? 'At Centre of Curvature C' : 'At 2F₁';
    } else if (objectDist > focalLength && objectDist < doubleF) {
      return isMirror ? 'Between C and Focus F' : 'Between 2F₁ and F₁';
    } else if (objectDist === focalLength) {
      return isMirror ? 'At Focus F' : 'At Focus F₁';
    } else {
      return isMirror ? 'Between Pole P and Focus F' : 'Between Optical Centre O and Focus F₁';
    }
  };

  // Magnification sign meaning
  const magSignExplanation = () => {
    if (result.atInfinity) return 'Image forms at infinity.';
    if (result.m < 0) {
      return 'Negative (-) sign of magnification shows that the image is Real & Inverted.';
    } else {
      return 'Positive (+) sign of magnification shows that the image is Virtual & Erect.';
    }
  };

  return (
    <div className={`w-full flex-1 flex flex-col select-none transition-colors ${isLightMode ? 'bg-white text-slate-900' : 'bg-[#0e1628] text-slate-100'}`}>

      {/* Header Bar */}
      <div className={`px-4 py-3 flex items-center justify-between shrink-0 border-b transition-colors ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#111c34] border-slate-800'}`}>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-500" />
          <h2 className={`text-[13px] font-black tracking-wider uppercase ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
            Optics Analysis Dashboard
          </h2>
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-bold ${isLightMode ? 'bg-white border-slate-300 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
          <span>Active Rays:</span>
          <span className={`font-black ${numRaysActive >= 2 ? (isLightMode ? 'text-emerald-600' : 'text-emerald-400') : (isLightMode ? 'text-rose-600 animate-pulse' : 'text-rose-400 animate-pulse')}`}>
            {numRaysActive}/4
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* ── 1. ACTIVE RAY INTERACTION CHECK ── */}
        {!showStats && (
          <div className={`rounded-xl p-3.5 space-y-2 border ${isLightMode ? 'bg-rose-50 border-rose-300 text-rose-800' : 'bg-rose-950/40 border-rose-500/40 text-rose-200'}`}>
            <div className="flex items-start gap-2.5">
              <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isLightMode ? 'text-rose-500' : 'text-rose-400'}`} />
              <div>
                <h3 className={`font-bold text-sm ${isLightMode ? 'text-rose-700' : 'text-rose-300'}`}>No Image Formed</h3>
                <p className={`text-[11px] leading-relaxed mt-0.5 ${isLightMode ? 'text-rose-700/80' : 'text-rose-200/80'}`}>
                  An image is located by finding the point where
                  at least <strong>two construction rays</strong> intersect.
                </p>
              </div>
            </div>
            <div className={`pt-1.5 border-t flex justify-end ${isLightMode ? 'border-rose-200' : 'border-rose-950/50'}`}>
              <button
                onClick={() => {}} // parent handler logic can go here indirectly, but instructions said keep active ray state.
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded border cursor-not-allowed ${isLightMode ? 'text-rose-700 bg-rose-100 border-rose-300 hover:bg-rose-200' : 'text-rose-300 bg-rose-900/30 border-rose-500/30 hover:bg-rose-900/50'}`}
              >
                Activate rays above to trace image
              </button>
            </div>
          </div>
        )}

        {showStats && (
          <>
            {/* ── 2. NATURE & CHARACTERISTICS (NCERT) ── */}
            <div className="space-y-2">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                IMAGE CHARACTERISTICS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                {/* NATURE CARD */}
                <div className={`rounded-xl p-3 border transition-all ${
                  result.isReal && !result.atInfinity
                    ? (isLightMode ? 'bg-emerald-50 border-emerald-300' : 'bg-emerald-950/20 border-emerald-500/30')
                    : (isLightMode ? 'bg-purple-50 border-purple-300' : 'bg-purple-950/20 border-purple-500/30')
                }`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2 h-2 rounded-full ${result.isReal && !result.atInfinity ? (isLightMode ? 'bg-emerald-500' : 'bg-emerald-400') : (isLightMode ? 'bg-purple-500' : 'bg-purple-400')}`} />
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Nature</span>
                    <Sparkles className={`w-3 h-3 ml-auto ${result.isReal && !result.atInfinity ? (isLightMode ? 'text-emerald-500' : 'text-emerald-400') : (isLightMode ? 'text-purple-500' : 'text-purple-400')}`} />
                  </div>
                  <div className={`text-base font-black ${result.isReal && !result.atInfinity ? (isLightMode ? 'text-emerald-600' : 'text-emerald-400') : (isLightMode ? 'text-purple-700' : 'text-purple-300')}`}>
                    {result.atInfinity ? 'Real & Inverted' : `${result.nature} & ${result.isInverted ? 'Inverted' : 'Erect'}`}
                  </div>
                  <p className={`text-[10.5px] leading-relaxed mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                    {natureExplanation()}
                  </p>
                </div>

                {/* SIZE CARD */}
                <div className={`rounded-xl p-3 border ${isLightMode ? 'bg-cyan-50 border-cyan-300' : 'bg-cyan-950/20 border-cyan-500/25'}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Scale className={`w-3.5 h-3.5 ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`} />
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Image Size</span>
                  </div>
                  <div className={`text-base font-black ${isLightMode ? 'text-cyan-700' : 'text-cyan-300'}`}>
                    {result.atInfinity ? 'Highly Enlarged' : result.sizeDesc}
                  </div>
                  <p className={`text-[10.5px] leading-relaxed mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                    {sizeExplanation()}
                  </p>
                </div>

              </div>
            </div>

            {/* ── 3. FORMULA & NUMERICAL SOLVER ── */}
            <div className={`space-y-2 rounded-xl p-3.5 border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#121c2e] border-slate-800'}`}>

              {/* Formula Panel Header */}
              <div className={`flex items-center justify-between border-b pb-2 mb-2 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className="flex items-center gap-1.5">
                  <BookOpen className={`w-4 h-4 ${isLightMode ? 'text-yellow-600' : 'text-yellow-400'}`} />
                  <span className={`text-xs font-bold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{formulaTitle}</span>
                </div>
                <code className={`text-xs font-black px-2 py-0.5 rounded font-mono border ${isLightMode ? 'text-slate-800 bg-white border-slate-300' : 'text-slate-100 bg-slate-900 border-slate-800'}`}>
                  {formulaString}
                </code>
              </div>

              {/* Step By Step Live Calculations */}
              <div className="space-y-2.5">

                {/* Row: Object Distance */}
                <div className={`flex items-center justify-between text-xs py-1 border-b ${isLightMode ? 'border-slate-200' : 'border-slate-800/50'}`}>
                  <div className="flex flex-col">
                    <span className={`font-bold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>Object Distance (u)</span>
                    <span className={`text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Object position: {getObjectPositionDesc()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${isLightMode ? 'bg-white text-slate-600 border-slate-300' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>u</span>
                    <span className={`font-black text-sm ${isLightMode ? 'text-amber-600' : 'text-amber-300'}`}>{signedU.toFixed(1)} cm</span>
                  </div>
                </div>

                {/* Row: Focal Length */}
                <div className={`flex items-center justify-between text-xs py-1 border-b ${isLightMode ? 'border-slate-200' : 'border-slate-800/50'}`}>
                  <div className="flex flex-col">
                    <span className={`font-bold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>Focal Length (f)</span>
                    <span className={`text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      {isConcave ? 'Concave is negative (-)' : 'Convex is positive (+)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${isLightMode ? 'bg-white text-slate-600 border-slate-300' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>f</span>
                    <span className={`font-black text-sm ${signedF < 0 ? (isLightMode ? 'text-red-600' : 'text-red-400') : (isLightMode ? 'text-emerald-600' : 'text-emerald-400')}`}>
                      {signedF > 0 ? '+' : ''}{signedF.toFixed(1)} cm
                    </span>
                  </div>
                </div>

                {/* Row: Image Distance */}
                <div className={`flex items-center justify-between text-xs py-1 border-b ${isLightMode ? 'border-slate-200' : 'border-slate-800/50'}`}>
                  <div className="flex flex-col">
                    <span className={`font-bold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>Image Distance (v)</span>
                    <span className={`text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      {isMirror
                        ? (result.isReal ? 'In front of mirror (- v)' : 'Behind mirror (+ v)')
                        : (result.isReal ? 'Opposite side (+ v)' : 'Same side (- v)')
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${isLightMode ? 'bg-white text-slate-600 border-slate-300' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>v</span>
                    <span className={`font-black text-sm ${vVal < 0 ? (isLightMode ? 'text-red-600' : 'text-red-400') : (isLightMode ? 'text-emerald-600' : 'text-emerald-400')}`}>
                      {signedVStr} {!result.atInfinity && 'cm'}
                    </span>
                  </div>
                </div>

                {/* Row: Magnification */}
                <div className="flex items-center justify-between text-xs py-1">
                  <div className="flex flex-col">
                    <span className={`font-bold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>Magnification (m)</span>
                    <span className={`text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      Ratio of image height to object height
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${isLightMode ? 'bg-white text-slate-600 border-slate-300' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>m</span>
                    <span className={`font-black text-sm ${result.m < 0 ? (isLightMode ? 'text-[#dc2626]' : 'text-[#f87171]') : (isLightMode ? 'text-[#7c3aed]' : 'text-[#a78bfa]')}`}>
                      {signedMStr}
                    </span>
                  </div>
                </div>

              </div>

              {/* Magnification description */}
              <div className={`mt-3 pt-2.5 border-t text-[11px] leading-relaxed rounded-lg p-2 flex items-start gap-1.5 ${isLightMode ? 'border-slate-200 text-slate-600 bg-slate-100' : 'border-slate-800 text-slate-400 bg-slate-950/50'}`}>
                <Info className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`} />
                <span>
                  {magSignExplanation()}
                </span>
              </div>

            </div>

            {/* ── 4. CARTESIAN SIGN CHEAT SHEET ── */}
            <div className={`space-y-1.5 text-[10.5px] leading-relaxed p-3 rounded-xl border ${isLightMode ? 'text-slate-600 bg-slate-100 border-slate-200' : 'text-slate-400 bg-slate-950/40 border-slate-800/80'}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <Eye className={`w-3.5 h-3.5 ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`} />
                <span className={`font-extrabold uppercase tracking-wider ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                  Cartesian Sign Rule Book
                </span>
              </div>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Light Direction:</strong> Incidental rays travel from left to right (+x direction).</li>
                <li><strong>Object (u):</strong> Placed on the left side, so object distance <strong className={isLightMode ? 'text-red-600' : 'text-red-300'}>u is always negative</strong>.</li>
                <li><strong>Heights:</strong> Measured upward perpendicular to principal axis are positive (+h); downward measurements are negative (-h).</li>
                <li><strong>Concave {isMirror ? 'Mirror' : 'Lens'}:</strong> The focus is on the left side, making its focal length <strong className={isLightMode ? 'text-red-600' : 'text-red-300'}>f always negative (-)</strong>.</li>
                <li><strong>Convex {isMirror ? 'Mirror' : 'Lens'}:</strong> The focus is on the right side, making its focal length <strong className={isLightMode ? 'text-emerald-600' : 'text-emerald-300'}>f always positive (+)</strong>.</li>
              </ul>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
