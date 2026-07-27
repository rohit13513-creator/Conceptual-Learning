import React from "react";
import { DeviceType } from "../types";
import { BookOpen, Calculator, Info, HelpCircle } from "lucide-react";

interface StepByStepSolverProps {
  device: DeviceType;
  u: number; // e.g., -150
  h: number; // e.g., 50
  f: number; // e.g., 100
  isPointObject?: boolean;
}

const Fraction: React.FC<{ num: React.ReactNode; den: React.ReactNode }> = ({ num, den }) => (
  <span className="inline-flex flex-col items-center align-middle mx-1.5 text-xs sm:text-sm font-bold font-mono">
    <span className="border-b border-slate-350/80 pb-0.5 text-center leading-none px-1" style={{ minWidth: '1.25rem' }}>{num}</span>
    <span className="text-center pt-0.5 leading-none px-1">{den}</span>
  </span>
);

export const StepByStepSolver: React.FC<StepByStepSolverProps> = ({ device, u, h, f, isPointObject = false }) => {
  const isMirror = device === DeviceType.CONCAVE_MIRROR || device === DeviceType.CONVEX_MIRROR || device === DeviceType.PLANE_MIRROR;

  // Apply Cartesian sign conventions
  let signU = u; // Object distance is always negative
  let signF = f; // Focal length
  if (device === DeviceType.CONCAVE_MIRROR || device === DeviceType.CONCAVE_LENS) {
    signF = -f; // Concave is negative focal length
  }
  const signH = isPointObject ? 0 : h; // Object height is 0 for point object

  // Calculation parameters
  let v = 0;
  let m = 0;
  let hPrime = 0;
  let infinite = false;

  if (device === DeviceType.PLANE_MIRROR) {
    v = -signU;
    m = 1;
    hPrime = signH;
    infinite = false;
  } else if (isMirror) {
    const denom = signU - signF;
    if (Math.abs(denom) < 2) {
      infinite = true;
    } else {
      v = (signU * signF) / denom;
      m = -v / signU;
      hPrime = m * signH;
    }
  } else {
    // Lens
    const denom = signU + signF;
    if (Math.abs(denom) < 2) {
      infinite = true;
    } else {
      v = (signU * signF) / denom;
      m = v / signU;
      hPrime = m * signH;
    }
  }

  // Characteristics descriptors
  const natureString = infinite
    ? "Real and Inverted (at infinity)"
    : isPointObject
    ? (isMirror ? (v < 0 ? "Real (Point Image)" : "Virtual (Point Image)") : (v > 0 ? "Real (Point Image)" : "Virtual (Point Image)"))
    : m < 0
    ? "Real and Inverted"
    : "Virtual and Erect";

  const sizeString = infinite
    ? "Highly Magnified (enormously large)"
    : isPointObject
    ? "Point-sized (Highly Diminished)"
    : Math.abs(m) > 1.1
    ? "Magnified / Enlarged"
    : Math.abs(m) < 0.9
    ? "Diminished"
    : "Same size";

  const roundedU = (signU / 5).toFixed(1);
  const roundedF = (signF / 5).toFixed(1);
  const roundedV = infinite ? "∞" : (v / 5).toFixed(1);
  const roundedM = infinite ? "∞" : m.toFixed(2);
  const roundedHPrime = infinite ? "∞" : (hPrime / 5).toFixed(1);
  const roundedH = (signH / 5).toFixed(1);

  return (
    <div className="bg-[#121b2e]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-xl shadow-black/25 p-5 sm:p-6 space-y-6">
      <div className="flex items-center gap-2 pb-3.5 border-b border-slate-800/50">
        <Calculator className="w-5 h-5 text-sky-400" />
        <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest font-mono">
          Cartesian Formula Solver
        </h3>
      {/* Cartesian Sign Convention Summary Boxes */}
      <div>
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-2 font-mono flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-sky-400" />
          1. Applied Sign Conventions (Optics Sign Rules)
        </h4>
        <div className="grid grid-cols-3 gap-2.5 text-center text-sm">
          <div className="p-3 bg-rose-500/5 rounded-xl border border-rose-500/15">
            <span className="text-xs text-slate-300 font-bold block uppercase tracking-wider mb-1 font-mono">Distance (u)</span>
            <span className="font-mono text-sm font-extrabold text-rose-450">{roundedU} cm</span>
            <span className="text-xs text-slate-300 block mt-1 uppercase font-semibold">Negative (Left)</span>
          </div>
          <div className="p-3 bg-sky-500/5 rounded-xl border border-sky-500/15">
            <span className="text-xs text-slate-300 font-bold block uppercase tracking-wider mb-1 font-mono">Focal (f)</span>
            <span className="font-mono text-sm font-extrabold text-sky-400">
              {signF > 0 ? `+${roundedF}` : roundedF} cm
            </span>
            <span className="text-xs text-slate-300 block mt-1 uppercase font-semibold">
              {signF > 0 ? "Convex (+)" : "Concave (-)"}
            </span>
          </div>
          <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/15">
            <span className="text-xs text-slate-300 font-bold block uppercase tracking-wider mb-1 font-mono">Height (h)</span>
            <span className="font-mono text-sm font-extrabold text-indigo-400">+{roundedH} cm</span>
            <span className="text-xs text-slate-300 block mt-1 uppercase font-semibold">Erect (+)</span>
          </div>
        </div>
      </div>

      {/* Solver Equation Block */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-2 font-mono flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-sky-450" />
          2. Step-by-Step Analytical Evaluation
        </h4>

        {device === DeviceType.PLANE_MIRROR ? (
          // Plane Mirror Steps
          <div className="space-y-3.5 text-sm text-slate-200 bg-slate-950/30 border border-slate-800/80 p-4 rounded-xl font-medium leading-relaxed" id="plane-mirror-solver-card">
            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Plane Mirror Reflection Rule</p>
              <div className="font-mono text-[15px] font-bold text-slate-100 my-1">
                {"v = -u  (Distance of image equals distance of object)"}
              </div>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step A: Substituting Object Distance</p>
              <div className="font-mono text-sm text-slate-200 my-1 space-y-1">
                <p>{`v = -(${roundedU} cm)`}</p>
              </div>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step B: Image Distance (v)</p>
              <div className="font-mono text-[15px] font-bold text-indigo-400 my-1">
                {`v = `}
                <span className="underline decoration-indigo-400 decoration-2">+{Math.abs(Number(roundedU)).toFixed(2)} cm</span>
              </div>
              <p className="text-xs text-slate-300">
                Since v is positive, the virtual image is formed at an equal distance behind the mirror (Right side).
              </p>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step C: Magnification (m)</p>
              <div className="font-mono text-[15px] font-bold text-indigo-400 my-1">
                {"m = +1  (Always virtual, erect, and identical in size)"}
              </div>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step D: Image Height (h')</p>
              <div className="font-mono text-sm text-slate-200 my-1">
                {`h' = m * h = 1 * ${roundedH} = `}
                <strong className="text-indigo-400 text-[15px] font-bold">+{roundedH} cm</strong>
              </div>
              <p className="text-xs text-slate-300">
                The image forms erect and has the exact same height as the object.
              </p>
            </div>
          </div>
        ) : isMirror ? (
          // Mirror Formula Steps
          <div className="space-y-3.5 text-sm text-slate-200 bg-slate-950/30 border border-slate-800/80 p-4 rounded-xl font-medium leading-relaxed">
            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Mirror Formula</p>
              <div className="flex items-center gap-1 font-mono text-[14px] font-bold text-slate-100 my-1 flex-wrap">
                <Fraction num="1" den="f" />
                <span>=</span>
                <Fraction num="1" den="v" />
                <span>+</span>
                <Fraction num="1" den="u" />
              </div>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step A: Rearranging for 1/v</p>
              <div className="flex items-center gap-1 font-mono text-[14px] font-bold text-slate-100 my-1 flex-wrap">
                <Fraction num="1" den="v" />
                <span>=</span>
                <Fraction num="1" den="f" />
                <span>-</span>
                <Fraction num="1" den="u" />
              </div>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step B: Substituting signs and magnitudes</p>
              <div className="font-mono text-sm text-slate-200 my-1 space-y-2.5">
                <div className="flex items-center gap-1 flex-wrap">
                  <Fraction num="1" den="v" />
                  <span>=</span>
                  <Fraction num="1" den={`${roundedF}`} />
                  <span>-</span>
                  <Fraction num="1" den={`(${roundedU})`} />
                </div>
                {!infinite ? (
                  <div className="flex items-center gap-1 flex-wrap">
                    <Fraction num="1" den="v" />
                    <span>=</span>
                    <Fraction num="1" den={`${roundedF}`} />
                    <span>+</span>
                    <Fraction num="1" den={`${Math.abs(Number(roundedU)).toFixed(1)}`} />
                    <span>=</span>
                    <Fraction num={`${roundedU} - ${roundedF}`} den={`(${roundedU} × ${roundedF})`} />
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step C: Calculating Distance (v)</p>
              <div className="font-mono text-[14px] font-semibold text-slate-200 my-1">
                {infinite ? (
                  <span className="text-indigo-400 font-bold">v = ±∞ (Rays reflecting from mirror are parallel, image forms at infinity)</span>
                ) : (
                  <div className="flex items-center gap-1 flex-wrap font-bold text-indigo-400">
                    <span>v =</span>
                    <Fraction num="u × f" den="u - f" />
                    <span>=</span>
                    <Fraction num={`(${roundedU}) × (${roundedF})`} den={`(${roundedU}) - (${roundedF})`} />
                    <span>=</span>
                    <span className="underline decoration-indigo-400 decoration-2">{roundedV} cm</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-300">
                {infinite
                  ? ""
                  : v > 0
                  ? "Since v is positive, the image is formed behind the mirror (Right side, Virtual)."
                  : "Since v is negative, the image is formed in front of the mirror (Left side, Real)."}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step D: Convex/Concave Magnification (m)</p>
              <div className="font-mono text-[14px] font-semibold text-slate-200 my-1">
                {infinite ? (
                  <span className="text-indigo-400 font-bold">m = -v/u = ∞</span>
                ) : (
                  <div className="flex items-center gap-1 flex-wrap font-bold text-indigo-400">
                    <span>m = -</span>
                    <Fraction num="v" den="u" />
                    <span>= -</span>
                    <Fraction num={`${roundedV}`} den={`(${roundedU})`} />
                    <span>=</span>
                    <span className="underline decoration-indigo-400 decoration-2">{roundedM}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step E: Image Height (h')</p>
              <div className="font-mono text-sm text-slate-200 my-1">
                <span>{`h' = m × h = ${roundedM} × ${roundedH} = `}</span>
                <strong className="text-indigo-400 text-[15px]">{roundedHPrime} cm</strong>
              </div>
              <p className="text-xs text-slate-300 font-semibold mt-1">
                {infinite
                  ? ""
                  : hPrime < 0
                  ? "Image is negative height -> Inverted below the principal axis."
                  : "Image is positive height -> Erect above the principal axis."}
              </p>
            </div>
          </div>
        ) : (
          // Lens Formula Steps
          <div className="space-y-3.5 text-sm text-slate-200 bg-slate-950/30 border border-slate-800/85 p-4 rounded-xl font-medium leading-relaxed font-sans">
            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Lens Formula</p>
              <div className="flex items-center gap-1 font-mono text-[14px] font-bold text-slate-100 my-1 flex-wrap">
                <Fraction num="1" den="f" />
                <span>=</span>
                <Fraction num="1" den="v" />
                <span>-</span>
                <Fraction num="1" den="u" />
              </div>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step A: Rearranging for 1/v</p>
              <div className="flex items-center gap-1 font-mono text-[14px] font-bold text-slate-100 my-1 flex-wrap">
                <Fraction num="1" den="v" />
                <span>=</span>
                <Fraction num="1" den="f" />
                <span>+</span>
                <Fraction num="1" den="u" />
              </div>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step B: Substituting signs and magnitudes</p>
              <div className="font-mono text-sm text-slate-200 my-1 space-y-1">
                <div className="flex items-center gap-1 flex-wrap">
                  <Fraction num="1" den="v" />
                  <span>=</span>
                  <Fraction num="1" den={`${roundedF}`} />
                  <span>+</span>
                  <Fraction num="1" den={`(${roundedU})`} />
                </div>
              </div>
            </div>

            <div>
              <p className="text-slate-300 text-xs uppercase font-bold tracking-wide">Step C: Calculating Distance (v)</p>
              <div className="font-mono text-[14px] font-semibold text-slate-200 my-1 col-span-1">
                {infinite ? (
                  <span className="text-indigo-400 font-bold block">v = ±∞ (Rays refracting through lens are parallel, image forms at infinity)</span>
                ) : (
                  <div className="flex items-center gap-1 flex-wrap font-bold text-indigo-400">
                    <span>v =</span>
                    <Fraction num="u × f" den="u + f" />
                    <span>=</span>
                    <Fraction num={`(${roundedU}) × (${roundedF})`} den={`(${roundedU}) + (${roundedF})`} />
                    <span>=</span>
                    <span className="underline decoration-indigo-400 decoration-2">{roundedV} cm</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-250">
                {infinite
                  ? ""
                  : v > 0
                  ? "Since v is positive, the image is formed on the other side of the lens (Right side, Real)."
                  : "Since v is negative, the image is formed on the same side of the lens (Left side, Virtual)."}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <p className="text-slate-200 text-sm uppercase font-bold tracking-wide">Step D: Lens Magnification (m)</p>
              <div className="font-mono text-[14px] font-semibold text-slate-200 my-1 col-span-1">
                {infinite ? (
                  <span className="text-indigo-400 font-bold block">m = v / u = ∞</span>
                ) : (
                  <div className="flex items-center gap-1 flex-wrap font-bold text-indigo-400">
                    <span>m =</span>
                    <Fraction num="v" den="u" />
                    <span>=</span>
                    <Fraction num={`${roundedV}`} den={`(${roundedU})`} />
                    <span>=</span>
                    <span className="underline decoration-indigo-400 decoration-2">{roundedM}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-slate-200 text-sm uppercase font-bold tracking-wide">Step E: Image Height (h')</p>
              <div className="font-mono text-sm text-slate-200 my-1">
                <span>{`h' = m × h = ${roundedM} × ${roundedH} = `}</span>
                <strong className="text-indigo-400 text-[15px]">{roundedHPrime} cm</strong>
              </div>
              <p className="text-sm text-slate-250 font-semibold mt-1">
                {infinite
                  ? ""
                  : hPrime < 0
                  ? "Image holds negative height value -> Inverted below the principal axis."
                  : "Image holds positive height value -> Erect above the principal axis."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Synthesis Conclusion */}
      <div className="p-4 bg-sky-500/5 border border-sky-500/15 rounded-xl text-sm space-y-1">
        <h4 className="font-bold text-sky-400 flex items-center gap-1.5 font-mono uppercase tracking-widest text-sm">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          Characteristics Verdict
        </h4>
        <p className="text-sm text-slate-200 leading-relaxed">
          The resulting image formed by this optical system is <b className="text-[#38bdf8]">{natureString}</b>, is structurally <b className="text-indigo-300">{sizeString}</b>, and has a physical magnification multiplier of <b className="text-sky-300 font-mono">{roundedM}x</b>.
        </p>
      </div>
      </div>
    </div>
  );
};
