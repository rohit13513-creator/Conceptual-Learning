import React, { useState } from "react";
import {
  BookOpen,
  Award,
  HelpCircle,
  Gauge,
  MoveRight,
  TrendingUp,
  RefreshCw,
  Compass,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PhysicsTopicId =
  | "reference-position"
  | "distance-displacement"
  | "speed-velocity"
  | "acceleration"
  | "position-time-graphs"
  | "velocity-time-graphs"
  | "kinematic-equations"
  | "circular-motion"
  | "glossary-mindmap";

interface PhysicsTopic {
  id: PhysicsTopicId;
  title: string;
  category: string;
}

const PHYSICS_TOPICS: PhysicsTopic[] = [
  { id: "reference-position", title: "1. Describing Position & Motion", category: "Fundamentals" },
  { id: "distance-displacement", title: "2. Distance & Displacement", category: "Fundamentals" },
  { id: "speed-velocity", title: "3. Average Speed & Velocity", category: "How Fast, Which Way" },
  { id: "acceleration", title: "4. Average Acceleration", category: "How Fast, Which Way" },
  { id: "position-time-graphs", title: "5. Position-Time Graphs", category: "Graphs" },
  { id: "velocity-time-graphs", title: "6. Velocity-Time Graphs", category: "Graphs" },
  { id: "kinematic-equations", title: "7. Equations of Motion", category: "Kinematics" },
  { id: "circular-motion", title: "8. Motion in a Plane: Uniform Circular Motion", category: "Kinematics" },
  { id: "glossary-mindmap", title: "9. Quick Glossary & Mind Map", category: "Revision" },
];

interface LearnPhysics9Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

// ── Reusable building blocks (same visual language as the Biology/Chemistry notes, cyan accent) ──

const InfoCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; isLightMode?: boolean }> = ({ title, icon: Icon, children, isLightMode = false }) => (
  <div className={`p-5 rounded-2xl space-y-3 shadow-md border ${isLightMode ? "bg-cyan-50 border-cyan-200" : "bg-[#0a1622] border-cyan-500/15"}`}>
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-cyan-400" />
      <h3 className={`text-sm font-black uppercase tracking-wider font-mono ${isLightMode ? "text-cyan-800" : "text-cyan-300"}`}>{title}</h3>
    </div>
    <div className={`space-y-3 text-sm font-semibold leading-relaxed ${isLightMode ? "text-slate-700" : "text-slate-300"}`}>{children}</div>
  </div>
);

const RememberBox: React.FC<{ title: string; children: React.ReactNode; isLightMode?: boolean }> = ({ title, children, isLightMode = false }) => (
  <div className={`p-4 rounded-xl space-y-1.5 font-sans font-semibold border ${isLightMode ? "bg-amber-50 border-amber-200" : "bg-amber-950/20 border-amber-500/10"}`}>
    <h5 className="font-bold text-amber-400 font-mono text-[12.5px] uppercase tracking-wider flex items-center gap-1">
      <HelpCircle className="w-3.5 h-3.5" /> {title}
    </h5>
    <div className={`text-[14px] font-sans leading-relaxed ${isLightMode ? "text-slate-700" : "text-slate-350"}`}>{children}</div>
  </div>
);

const FormulaBox: React.FC<{ children: React.ReactNode; isLightMode?: boolean }> = ({ children, isLightMode = false }) => (
  <div className={`p-4 rounded-xl border text-center font-mono text-[15px] font-black tracking-wide ${isLightMode ? "bg-slate-900 text-cyan-300 border-slate-700" : "bg-slate-950 text-cyan-300 border-slate-800"}`}>
    {children}
  </div>
);

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-cyan-300 font-mono">
    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
    <span>{children}</span>
  </div>
);

const FactRow: React.FC<{ label: string; children: React.ReactNode; isLightMode?: boolean }> = ({ label, children, isLightMode = false }) => (
  <div className={`p-2.5 rounded-lg border text-sm font-semibold ${isLightMode ? "bg-white border-slate-200 text-slate-700" : "bg-slate-950 border-slate-800 text-slate-300"}`}>
    <span className={`font-black ${isLightMode ? "text-slate-900" : "text-white"}`}>{label}:</span> <span>{children}</span>
  </div>
);

const DiagramCard: React.FC<{ caption: string; children: React.ReactNode; isLightMode?: boolean }> = ({ caption, children, isLightMode = false }) => (
  <div className="space-y-2">
    <div className={`rounded-2xl border p-3 shadow-lg ${isLightMode ? "bg-white border-slate-200" : "bg-[#0b1420] border-slate-800"}`}>
      {children}
    </div>
    <p className={`text-center text-[13px] font-bold ${isLightMode ? "text-slate-500" : "text-slate-500"}`}>{caption}</p>
  </div>
);

type MindMapColor = "cyan" | "emerald" | "indigo" | "orange" | "amber" | "rose" | "sky";

const MIND_MAP_PALETTE: Record<MindMapColor, { dark: string; light: string; icon: string }> = {
  cyan: { dark: "bg-cyan-950/30 border-cyan-500/25 text-cyan-300", light: "bg-cyan-50 border-cyan-300 text-cyan-900", icon: "text-cyan-400" },
  emerald: { dark: "bg-emerald-950/30 border-emerald-500/25 text-emerald-300", light: "bg-emerald-50 border-emerald-300 text-emerald-900", icon: "text-emerald-500" },
  indigo: { dark: "bg-indigo-950/30 border-indigo-500/25 text-indigo-300", light: "bg-indigo-50 border-indigo-300 text-indigo-900", icon: "text-indigo-400" },
  orange: { dark: "bg-orange-950/30 border-orange-500/25 text-orange-300", light: "bg-orange-50 border-orange-300 text-orange-900", icon: "text-orange-500" },
  amber: { dark: "bg-amber-950/30 border-amber-500/25 text-amber-300", light: "bg-amber-50 border-amber-300 text-amber-900", icon: "text-amber-500" },
  rose: { dark: "bg-rose-950/30 border-rose-500/25 text-rose-300", light: "bg-rose-50 border-rose-300 text-rose-900", icon: "text-rose-500" },
  sky: { dark: "bg-sky-950/30 border-sky-500/25 text-sky-300", light: "bg-sky-50 border-sky-300 text-sky-900", icon: "text-sky-400" },
};

const MindMapBranch: React.FC<{
  icon: React.ElementType;
  title: string;
  color: MindMapColor;
  points: string[];
  isLightMode?: boolean;
}> = ({ icon: Icon, title, color, points, isLightMode = false }) => {
  const palette = MIND_MAP_PALETTE[color];
  return (
    <div className="flex flex-col items-center">
      <div className={`w-px h-4 ${isLightMode ? "bg-slate-300" : "bg-slate-700"}`} />
      <div className={`w-full rounded-2xl border p-4 space-y-2.5 shadow-md ${isLightMode ? palette.light : palette.dark}`}>
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${palette.icon}`} />
          <h4 className="text-sm font-black uppercase tracking-wider font-mono">{title}</h4>
        </div>
        <ul className={`list-disc pl-4 text-[13.5px] font-semibold space-y-1 ${isLightMode ? "text-slate-700" : "text-slate-300"}`}>
          {points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
    </div>
  );
};

export function LearnPhysics9({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnPhysics9Props) {
  const [activeTopic, setActiveTopic] = useState<PhysicsTopicId>("reference-position");

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-physics9-container">
      {/* Mobile header */}
      <div className={`sticky top-0 shrink-0 backdrop-blur z-20 p-3.5 flex flex-col md:hidden gap-3 w-full select-none transition-colors duration-300 ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span className={`text-sm uppercase tracking-widest font-black font-mono ${isLightMode ? "text-slate-800" : "text-cyan-400"}`}>Describing Motion Around Us</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none transition-colors duration-300 ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b space-y-3 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-cyan-400" />
              <h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-850" : "text-slate-100"}`}>Motion Notes</h3>
            </div>
            <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>
              Distance, displacement, speed, velocity, acceleration, graphs, and the equations of motion -- explained simply.
            </p>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {PHYSICS_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 group ${
                activeTopic === topic.id
                  ? isLightMode
                    ? "bg-cyan-50 border border-cyan-300"
                    : "bg-cyan-950/40 border border-cyan-500/30"
                  : "border border-transparent hover:bg-slate-800/40"
              }`}
            >
              <span className={`text-[12px] font-black uppercase tracking-widest font-mono block ${activeTopic === topic.id ? "text-cyan-400" : "text-slate-500"}`}>
                {topic.category}
              </span>
              <span className={`text-sm font-bold ${activeTopic === topic.id ? (isLightMode ? "text-cyan-800" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>
                {topic.title}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 scrollbar-thin transition-colors duration-300 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-physics9-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-physics9-main p, #learn-physics9-main li, #learn-physics9-main span, #learn-physics9-main label, #learn-physics9-main div:not(.bg-gradient-to-r) {
            color: ${isLightMode ? "#334155" : "#f1f5f9"};
          }
          #learn-physics9-main b, #learn-physics9-main strong, #learn-physics9-main h1, #learn-physics9-main h2, #learn-physics9-main h3, #learn-physics9-main h4, #learn-physics9-main h5 {
            color: ${isLightMode ? "#0f172a" : "#ffffff"};
          }
          ${isLightMode ? `
            #learn-physics9-container .bg-slate-900, #learn-physics9-container .bg-\\[\\#0d1424\\], #learn-physics9-container .bg-\\[\\#0a1622\\], #learn-physics9-container .bg-slate-950 {
              background-color: #ffffff !important;
              border-color: #cbd5e1 !important;
            }
            #learn-physics9-container .border-slate-800, #learn-physics9-container .border-slate-850 {
              border-color: #cbd5e1 !important;
            }
          ` : ""}
        ` }} />

        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

          {/* Header banner */}
          <div className={`bg-gradient-to-r border rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm ${isLightMode ? "from-cyan-50 via-sky-50 to-cyan-50 border-cyan-300" : "from-cyan-950/40 via-[#0a1a28]/40 to-sky-950/40 border-cyan-500/20"}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                <Gauge className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-cyan-400 tracking-tight">Class IX: describing motion around us -- notes</h4>
              </div>
            </div>
          </div>

          {activeTopic === "reference-position" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Describing Position & Motion</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Before we can describe HOW something moves, we first need to agree on WHERE it is.</p>
              </div>

              <InfoCard title="Core Definitions" icon={Compass} isLightMode={isLightMode}>
                <p><b>Reference point (origin):</b> a fixed point we choose to measure everything else against.</p>
                <p><b>Position:</b> the distance AND direction of an object from the reference point, at a given instant.</p>
                <p><b>Motion:</b> an object is in motion if its position changes with time relative to the reference point. It is at rest if its position does not change.</p>
              </InfoCard>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>Imagine an athlete running on a straight track. To describe her position at any moment, we first mark her starting point as the origin O, and draw a straight line with distances marked on it. Positions to the right of O are usually taken as positive, and to the left as negative.</p>
                <p>Just knowing "she is 40 m away" is not enough -- 40 m in which direction? That is why position always needs both a distance AND a direction from the reference point.</p>
              </div>

              <DiagramCard caption="An athlete's positions at different instants, measured from a chosen reference point O" isLightMode={isLightMode}>
                <svg viewBox="0 0 640 120" className="w-full h-auto">
                  <line x1="40" y1="60" x2="600" y2="60" stroke={isLightMode ? "#94a3b8" : "#475569"} strokeWidth="2" markerEnd="url(#arrowEndP1)" />
                  <defs>
                    <marker id="arrowEndP1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill={isLightMode ? "#94a3b8" : "#475569"} />
                    </marker>
                  </defs>
                  {[0, 20, 40, 60, 80, 100].map((v, i) => {
                    const x = 60 + i * 100;
                    return (
                      <g key={v}>
                        <line x1={x} y1="54" x2={x} y2="66" stroke={isLightMode ? "#94a3b8" : "#64748b"} strokeWidth="2" />
                        <text x={x} y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isLightMode ? "#475569" : "#94a3b8"}>{v} m</text>
                      </g>
                    );
                  })}
                  <circle cx="60" cy="60" r="6" fill="#22d3ee" />
                  <text x="60" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#22d3ee">O (origin)</text>
                  <circle cx="260" cy="60" r="6" fill="#fbbf24" />
                  <text x="260" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fbbf24">B (t = 4 s)</text>
                  <circle cx="460" cy="60" r="6" fill="#f87171" />
                  <text x="460" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f87171">A (t = 10 s)</text>
                </svg>
              </DiagramCard>

              <SectionHeading>Types of Motion Covered in This Chapter</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-cyan-400 font-mono tracking-widest">Linear / Straight-Line Motion</h4>
                  <p className="text-sm font-semibold">Motion along a single straight line -- the simplest kind. E.g. a train on a straight track, a ball falling vertically.</p>
                </div>
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-sky-400 font-mono tracking-widest">Motion in a Plane / Circular Motion</h4>
                  <p className="text-sm font-semibold">Motion along a curved or circular path, in two dimensions. E.g. a kicked ball's path, a satellite's orbit.</p>
                </div>
              </div>

              <RememberBox title="Rest and motion are relative" isLightMode={isLightMode}>
                Whether something is "at rest" or "in motion" always depends on the reference point you choose. A passenger is at rest relative to their moving train, but in motion relative to a person standing on the ground.
              </RememberBox>
            </div>
          )}

          {activeTopic === "distance-displacement" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Distance & Displacement</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Two ways to describe "how much an object moved" -- and they are not the same thing.</p>
              </div>

              <InfoCard title="Core Definitions" icon={MoveRight} isLightMode={isLightMode}>
                <p><b>Distance travelled:</b> the total length of the actual path covered by an object, no matter which direction it went. A scalar (magnitude only).</p>
                <p><b>Displacement:</b> the net change in position between two instants -- specified by both magnitude and direction. A vector.</p>
              </InfoCard>

              <DiagramCard caption="An athlete runs O to A (100 m) and back to B (60 m) -- total distance 160 m, but displacement only 40 m" isLightMode={isLightMode}>
                <svg viewBox="0 0 640 130" className="w-full h-auto">
                  <line x1="40" y1="70" x2="600" y2="70" stroke={isLightMode ? "#94a3b8" : "#475569"} strokeWidth="2" />
                  {[0, 20, 40, 60, 80, 100].map((v, i) => {
                    const x = 60 + i * 100;
                    return (
                      <g key={v}>
                        <line x1={x} y1="64" x2={x} y2="76" stroke={isLightMode ? "#94a3b8" : "#64748b"} strokeWidth="2" />
                        <text x={x} y="95" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={isLightMode ? "#475569" : "#94a3b8"}>{v} m</text>
                      </g>
                    );
                  })}
                  <path d="M 60 40 L 460 40" stroke="#f87171" strokeWidth="3" markerEnd="url(#arrowRedP1)" />
                  <text x="260" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#f87171">O to A: 100 m</text>
                  <path d="M 460 55 L 260 55" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowAmberP1)" />
                  <text x="360" y="112" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fbbf24">A to B: 60 m (return)</text>
                  <defs>
                    <marker id="arrowRedP1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f87171" /></marker>
                    <marker id="arrowAmberP1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fbbf24" /></marker>
                  </defs>
                  <circle cx="60" cy="70" r="6" fill="#22d3ee" /><text x="60" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#22d3ee">O</text>
                  <circle cx="260" cy="70" r="6" fill="#a3e635" /><text x="260" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a3e635">B</text>
                  <circle cx="460" cy="70" r="6" fill="#f87171" />
                </svg>
              </DiagramCard>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>Distance is like the reading on a car's odometer -- it only ever adds up, regardless of direction. Displacement, however, only cares about where you started and where you ended up.</p>
              </div>

              <FormulaBox isLightMode={isLightMode}>|displacement| &le; distance travelled</FormulaBox>

              <SectionHeading>Scalars vs Vectors</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-cyan-400 font-mono tracking-widest">Scalar</h4>
                  <p className="text-sm font-semibold">Fully described by magnitude alone. E.g. distance, speed, time.</p>
                </div>
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-sky-400 font-mono tracking-widest">Vector</h4>
                  <p className="text-sm font-semibold">Needs both magnitude and direction. E.g. displacement, velocity, acceleration.</p>
                </div>
              </div>

              <RememberBox title="They are equal only in one special case" isLightMode={isLightMode}>
                Distance travelled equals the magnitude of displacement ONLY when the object moves in a straight line, in one direction, without ever turning back.
              </RememberBox>
            </div>
          )}

          {activeTopic === "speed-velocity" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Average Speed & Average Velocity</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>How fast something moves -- and in the case of velocity, which way too.</p>
              </div>

              <InfoCard title="Core Definitions" icon={TrendingUp} isLightMode={isLightMode}>
                <p><b>Average speed:</b> total distance travelled divided by the time interval. A scalar.</p>
                <p><b>Average velocity:</b> displacement divided by the time interval. A vector.</p>
              </InfoCard>

              <FormulaBox isLightMode={isLightMode}>average speed = total distance travelled / time interval</FormulaBox>
              <FormulaBox isLightMode={isLightMode}>average velocity (v_av) = displacement (s) / time interval (t)</FormulaBox>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>Both are measured in the SI unit metre per second (m/s), also commonly written as kilometre per hour (km/h). To convert km/h to m/s, multiply by 5/18; to convert back, multiply by 18/5.</p>
              </div>

              <SectionHeading>Uniform vs Non-Uniform Motion</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-cyan-400 font-mono tracking-widest">Uniform Motion</h4>
                  <p className="text-sm font-semibold">Equal distances covered in every equal time interval -- constant speed throughout.</p>
                </div>
                <div className={`p-4 rounded-xl border space-y-1.5 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                  <h4 className="text-[12.5px] font-black uppercase text-sky-400 font-mono tracking-widest">Non-Uniform Motion</h4>
                  <p className="text-sm font-semibold">Unequal distances in equal time intervals -- speed keeps changing.</p>
                </div>
              </div>

              <SectionHeading>Worked Example</SectionHeading>
              <div className={`p-4 rounded-xl border space-y-2 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">Sarang swims one length of a 25 m pool and back (50 m total) in 50 s.</p>
                <p className="text-sm font-semibold"><b>Average speed</b> = total distance / time = 50 m / 50 s = <b className="text-cyan-400">1 m/s</b>.</p>
                <p className="text-sm font-semibold"><b>Average velocity</b> = displacement / time = 0 m / 50 s = <b className="text-cyan-400">0 m/s</b> (he ends up back where he started).</p>
              </div>

              <RememberBox title="A rate of change" isLightMode={isLightMode}>
                Average velocity is the average rate of change of position with respect to time -- exactly the same idea as the "rate of change" concept from mathematics.
              </RememberBox>
            </div>
          )}

          {activeTopic === "acceleration" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Average Acceleration</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Describing how quickly velocity itself is changing.</p>
              </div>

              <InfoCard title="Core Definition" icon={Gauge} isLightMode={isLightMode}>
                <p><b>Average acceleration:</b> the change in velocity of an object divided by the time interval over which that change occurs. A vector, with SI unit m/s^2.</p>
              </InfoCard>

              <FormulaBox isLightMode={isLightMode}>a = (v - u) / t</FormulaBox>
              <p className={`text-center text-[13px] font-semibold ${isLightMode ? "text-slate-500" : "text-slate-500"}`}>where u = initial velocity, v = final velocity, t = time taken</p>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>If speed is increasing, acceleration acts in the same direction as velocity. If speed is decreasing (deceleration/retardation), acceleration acts opposite to the direction of velocity.</p>
                <p>A freely falling object near Earth's surface has a constant acceleration due to gravity, denoted g, approximately equal to 9.8 m/s^2, directed downward.</p>
              </div>

              <SectionHeading>Worked Example</SectionHeading>
              <div className={`p-4 rounded-xl border space-y-2 ${isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900 border-slate-800"}`}>
                <p className="text-sm font-semibold">A bus speeds up from 36 km/h (10 m/s) to 54 km/h (15 m/s) in 10 s.</p>
                <p className="text-sm font-semibold">a = (15 - 10)/10 = <b className="text-cyan-400">0.5 m/s^2</b>, in the direction of motion (speeding up).</p>
              </div>

              <RememberBox title="Zero acceleration does not mean zero speed" isLightMode={isLightMode}>
                A bus cruising on a straight highway at a high, unchanging speed has ZERO acceleration -- acceleration depends on how quickly velocity is CHANGING, not on how fast the object is currently moving.
              </RememberBox>
            </div>
          )}

          {activeTopic === "position-time-graphs" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Position-Time Graphs</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>A visual way to see how an object's position changes with time -- and to read off its velocity.</p>
              </div>

              <DiagramCard caption="Straight line = constant velocity (left). Curve = changing (non-uniform) velocity (right)." isLightMode={isLightMode}>
                <svg viewBox="0 0 640 220" className="w-full h-auto">
                  <line x1="50" y1="190" x2="300" y2="190" stroke={isLightMode ? "#94a3b8" : "#64748b"} strokeWidth="2" />
                  <line x1="50" y1="190" x2="50" y2="20" stroke={isLightMode ? "#94a3b8" : "#64748b"} strokeWidth="2" />
                  <line x1="55" y1="170" x2="280" y2="40" stroke="#22d3ee" strokeWidth="3" />
                  <text x="170" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isLightMode ? "#475569" : "#94a3b8"}>Time (s)</text>
                  <text x="20" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isLightMode ? "#475569" : "#94a3b8"} transform="rotate(-90 20 105)">Position (m)</text>
                  <text x="170" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#22d3ee">(a) Constant velocity</text>

                  <line x1="370" y1="190" x2="620" y2="190" stroke={isLightMode ? "#94a3b8" : "#64748b"} strokeWidth="2" />
                  <line x1="370" y1="190" x2="370" y2="20" stroke={isLightMode ? "#94a3b8" : "#64748b"} strokeWidth="2" />
                  <path d="M 375 185 Q 450 180 500 130 T 600 40" stroke="#fbbf24" strokeWidth="3" fill="none" />
                  <text x="495" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isLightMode ? "#475569" : "#94a3b8"}>Time (s)</text>
                  <text x="490" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fbbf24">(b) Changing velocity</text>
                </svg>
              </DiagramCard>

              <InfoCard title="What the Graph Tells You" icon={TrendingUp} isLightMode={isLightMode}>
                <p><b>Slope of the graph = velocity</b> of the object at that instant (or interval). A steeper slope means a higher velocity.</p>
                <p>A horizontal line (parallel to the time axis) means the object is at rest.</p>
              </InfoCard>

              <FormulaBox isLightMode={isLightMode}>velocity = slope = (s2 - s1) / (t2 - t1)</FormulaBox>

              <RememberBox title="A graph is not a route map" isLightMode={isLightMode}>
                A position-time graph shows how the object's position (measured from the origin) changes with time -- it does NOT show the physical shape of the path the object actually followed.
              </RememberBox>
            </div>
          )}

          {activeTopic === "velocity-time-graphs" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Velocity-Time Graphs</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>The single most useful graph in this chapter -- its slope gives acceleration, and its area gives displacement.</p>
              </div>

              <DiagramCard caption="Slope of a velocity-time graph = acceleration; the shaded area under the line = displacement" isLightMode={isLightMode}>
                <svg viewBox="0 0 500 220" className="w-full h-auto">
                  <line x1="60" y1="190" x2="460" y2="190" stroke={isLightMode ? "#94a3b8" : "#64748b"} strokeWidth="2" />
                  <line x1="60" y1="190" x2="60" y2="30" stroke={isLightMode ? "#94a3b8" : "#64748b"} strokeWidth="2" />
                  <polygon points="60,190 60,150 380,50 380,190" fill="#22d3ee" fillOpacity="0.18" />
                  <line x1="60" y1="150" x2="380" y2="50" stroke="#22d3ee" strokeWidth="3" />
                  <line x1="380" y1="50" x2="380" y2="190" stroke={isLightMode ? "#cbd5e1" : "#334155"} strokeWidth="1.5" strokeDasharray="4 3" />
                  <text x="60" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isLightMode ? "#475569" : "#94a3b8"}>0</text>
                  <text x="380" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isLightMode ? "#475569" : "#94a3b8"}>t</text>
                  <text x="260" y="212" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isLightMode ? "#475569" : "#94a3b8"}>Time</text>
                  <text x="25" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isLightMode ? "#475569" : "#94a3b8"} transform="rotate(-90 25 115)">Velocity</text>
                  <text x="45" y="154" textAnchor="end" fontSize="12" fontWeight="bold" fill="#fbbf24">u</text>
                  <text x="45" y="54" textAnchor="end" fontSize="12" fontWeight="bold" fill="#f87171">v</text>
                  <text x="220" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#22d3ee">Area = displacement (s)</text>
                </svg>
              </DiagramCard>

              <InfoCard title="Two Things You Can Read Off This Graph" icon={TrendingUp} isLightMode={isLightMode}>
                <p><b>1. Slope = acceleration.</b> A horizontal line means zero acceleration (constant velocity); a straight sloped line means constant (uniform) acceleration.</p>
                <p><b>2. Area (between the line and the time axis) = displacement.</b> Split the shape into rectangles and triangles and add up their areas.</p>
              </InfoCard>

              <FormulaBox isLightMode={isLightMode}>acceleration = slope = (v - u) / t</FormulaBox>
              <FormulaBox isLightMode={isLightMode}>displacement = area under the graph</FormulaBox>

              <SectionHeading>Reading Common Graph Shapes</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FactRow label="Horizontal line" isLightMode={isLightMode}>Constant velocity, zero acceleration.</FactRow>
                <FactRow label="Straight line, sloping up" isLightMode={isLightMode}>Constant, positive acceleration (speeding up).</FactRow>
                <FactRow label="Straight line, sloping down" isLightMode={isLightMode}>Constant, negative acceleration (slowing down).</FactRow>
              </div>

              <RememberBox title="Trapezium = rectangle + triangle" isLightMode={isLightMode}>
                When the graph starts at some non-zero initial velocity u and rises to v, split the shaded area into a rectangle (height u) plus a triangle on top (height v - u) to calculate the total area easily.
              </RememberBox>
            </div>
          )}

          {activeTopic === "kinematic-equations" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Equations of Motion (Constant Acceleration)</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Three equations that let you predict an object's motion without needing to draw a graph every time.</p>
              </div>

              <InfoCard title="The Three Kinematic Equations" icon={Award} isLightMode={isLightMode}>
                <p>u = initial velocity, v = final velocity, a = (constant) acceleration, t = time interval, s = displacement.</p>
              </InfoCard>

              <div className="space-y-3">
                <FormulaBox isLightMode={isLightMode}>v = u + at</FormulaBox>
                <FormulaBox isLightMode={isLightMode}>s = ut + (1/2) a t^2</FormulaBox>
                <FormulaBox isLightMode={isLightMode}>v^2 = u^2 + 2as</FormulaBox>
              </div>

              <SectionHeading>When to Use Which Equation</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Know u, a, t -- want v" isLightMode={isLightMode}>Use v = u + at.</FactRow>
                <FactRow label="Know u, a, t -- want s" isLightMode={isLightMode}>Use s = ut + (1/2)at^2.</FactRow>
                <FactRow label="Know u, a, s -- want v (no t given)" isLightMode={isLightMode}>Use v^2 = u^2 + 2as.</FactRow>
              </div>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>These equations are only valid for motion with CONSTANT acceleration. They are derived directly from a velocity-time graph: the first equation comes from the slope, and the second from the area under the graph. The third is obtained algebraically by eliminating t from the first two.</p>
              </div>

              <SectionHeading>Two More Useful Forms (Journey Beyond)</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="s = vt - (1/2)at^2" isLightMode={isLightMode}>Useful when final velocity v is known instead of u.</FactRow>
                <FactRow label="s = [(u + v)/2] x t" isLightMode={isLightMode}>The "average velocity x time" form -- very handy for quick calculations.</FactRow>
              </div>

              <RememberBox title="Always convert to SI units first" isLightMode={isLightMode}>
                Convert km/h to m/s (multiply by 5/18) before substituting into any of these equations -- mixing units is the single most common source of wrong answers in numericals.
              </RememberBox>
            </div>
          )}

          {activeTopic === "circular-motion" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Motion in a Plane: Uniform Circular Motion</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Constant speed, but always accelerating -- one of the most counter-intuitive ideas in this chapter.</p>
              </div>

              <InfoCard title="Core Definition" icon={RefreshCw} isLightMode={isLightMode}>
                <p><b>Uniform circular motion:</b> motion of an object along a circular path at a constant (unchanging) speed.</p>
              </InfoCard>

              <DiagramCard caption="Velocity at any point on the circle is directed along the tangent at that point -- and that direction keeps changing" isLightMode={isLightMode}>
                <svg viewBox="0 0 400 260" className="w-full h-auto">
                  <circle cx="200" cy="130" r="90" fill="none" stroke={isLightMode ? "#94a3b8" : "#475569"} strokeWidth="2" strokeDasharray="5 4" />
                  <circle cx="200" cy="130" r="3" fill={isLightMode ? "#475569" : "#94a3b8"} />
                  {[0, 90, 180, 270].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    const px = 200 + 90 * Math.cos(rad);
                    const py = 130 + 90 * Math.sin(rad);
                    const tx = px - 45 * Math.sin(rad);
                    const ty = py + 45 * Math.cos(rad);
                    const tx2 = px + 45 * Math.sin(rad);
                    const ty2 = py - 45 * Math.cos(rad);
                    return (
                      <g key={deg}>
                        <circle cx={px} cy={py} r="5" fill="#22d3ee" />
                        <line x1={px} y1={py} x2={tx2} y2={ty2} stroke="#f87171" strokeWidth="2.5" markerEnd="url(#arrowCircP1)" />
                      </g>
                    );
                  })}
                  <defs>
                    <marker id="arrowCircP1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f87171" /></marker>
                  </defs>
                  <text x="200" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#f87171">Red arrows = velocity direction (along the tangent)</text>
                </svg>
              </DiagramCard>

              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>For an object making one revolution of a circle of radius R in time T:</p>
              </div>
              <FormulaBox isLightMode={isLightMode}>average speed = 2 pi R / T (circumference / time period)</FormulaBox>
              <p className={`text-center text-[13px] font-semibold ${isLightMode ? "text-slate-500" : "text-slate-500"}`}>Displacement after one full revolution = 0 (the object returns to its starting point)</p>

              <SectionHeading>Why Is It "Accelerated" Motion?</SectionHeading>
              <div className="prose prose-sm leading-relaxed font-semibold space-y-3">
                <p>Speed stays constant in uniform circular motion -- but velocity is a vector, and its DIRECTION keeps changing every instant as the object goes around the curve. Since acceleration is any change in velocity (including just direction), the object is continuously accelerating, even though the speedometer reading never changes.</p>
              </div>

              <RememberBox title="Release the marble, and it flies straight" isLightMode={isLightMode}>
                If a marble spinning inside a ring is suddenly released, it does not keep curving -- it flies off in a straight line, along the tangent direction it had at the exact instant of release. This shows that the circular path only continues as long as something keeps redirecting the object's velocity.
              </RememberBox>
            </div>
          )}

          {activeTopic === "glossary-mindmap" && (
            <div className="space-y-6 animate-fade-in">
              <div className={`space-y-1.5 border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h1 className="text-2xl font-black tracking-tight leading-tight">Quick Glossary & Mind Map</h1>
                <p className={`text-base font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>A fast, one-page recap of the whole chapter before your test.</p>
              </div>

              <SectionHeading>Glossary</SectionHeading>
              <div className="grid grid-cols-1 gap-2.5">
                <FactRow label="Reference point" isLightMode={isLightMode}>a fixed point used to describe an object's position.</FactRow>
                <FactRow label="Distance" isLightMode={isLightMode}>total path length covered; scalar; never decreases.</FactRow>
                <FactRow label="Displacement" isLightMode={isLightMode}>net change in position; vector; can be zero even if distance is not.</FactRow>
                <FactRow label="Average speed" isLightMode={isLightMode}>distance / time; scalar.</FactRow>
                <FactRow label="Average velocity" isLightMode={isLightMode}>displacement / time; vector.</FactRow>
                <FactRow label="Average acceleration" isLightMode={isLightMode}>(v - u) / t; vector; SI unit m/s^2.</FactRow>
                <FactRow label="Uniform motion" isLightMode={isLightMode}>equal distances in equal time intervals; constant speed.</FactRow>
                <FactRow label="Position-time graph slope" isLightMode={isLightMode}>gives velocity.</FactRow>
                <FactRow label="Velocity-time graph slope" isLightMode={isLightMode}>gives acceleration.</FactRow>
                <FactRow label="Velocity-time graph area" isLightMode={isLightMode}>gives displacement.</FactRow>
                <FactRow label="Uniform circular motion" isLightMode={isLightMode}>constant speed along a circular path; always accelerating due to changing direction.</FactRow>
              </div>

              <SectionHeading>Mind Map</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MindMapBranch icon={MoveRight} title="Distance & Displacement" color="cyan" isLightMode={isLightMode} points={[
                  "Distance: scalar, total path",
                  "Displacement: vector, net change",
                  "|displacement| <= distance",
                ]} />
                <MindMapBranch icon={TrendingUp} title="Speed & Velocity" color="sky" isLightMode={isLightMode} points={[
                  "Speed = distance/time (scalar)",
                  "Velocity = displacement/time (vector)",
                  "Equal only for one-directional motion",
                ]} />
                <MindMapBranch icon={Gauge} title="Acceleration" color="amber" isLightMode={isLightMode} points={[
                  "a = (v-u)/t",
                  "Same direction as v if speeding up",
                  "Opposite direction if slowing down",
                ]} />
                <MindMapBranch icon={Award} title="Kinematic Equations" color="emerald" isLightMode={isLightMode} points={[
                  "v = u + at",
                  "s = ut + 1/2 at^2",
                  "v^2 = u^2 + 2as",
                  "Valid only for constant acceleration",
                ]} />
                <MindMapBranch icon={BookOpen} title="Graphs" color="indigo" isLightMode={isLightMode} points={[
                  "Position-time slope = velocity",
                  "Velocity-time slope = acceleration",
                  "Velocity-time area = displacement",
                ]} />
                <MindMapBranch icon={RefreshCw} title="Uniform Circular Motion" color="rose" isLightMode={isLightMode} points={[
                  "Constant speed, changing direction",
                  "Velocity always along the tangent",
                  "Always accelerating",
                ]} />
              </div>

              <RememberBox title="You've completed the Motion chapter!" isLightMode={isLightMode}>
                Go back to any topic using the sidebar whenever you need to revise, then try the NCERT solved questions, the question bank, and the self-assessment quiz to test what you remember.
              </RememberBox>
            </div>
          )}

          {/* Previous Topic / Next Topic navigation */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {(() => {
              const currentIndex = PHYSICS_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex > 0) {
                return (
                  <button
                    onClick={() => setActiveTopic(PHYSICS_TOPICS[currentIndex - 1].id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${
                      isLightMode
                        ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm"
                        : "bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Previous Topic
                  </button>
                );
              }
              return <div />;
            })()}
            {(() => {
              const currentIndex = PHYSICS_TOPICS.findIndex(t => t.id === activeTopic);
              if (currentIndex < PHYSICS_TOPICS.length - 1) {
                return (
                  <button
                    onClick={() => setActiveTopic(PHYSICS_TOPICS[currentIndex + 1].id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${
                      isLightMode
                        ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm"
                        : "bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    Next Topic
                    <ChevronRight className="w-3 h-3" />
                  </button>
                );
              } else if (onCompleteNotes) {
                return (
                  <div className="flex flex-wrap gap-3 justify-end w-full sm:w-auto">
                    <button
                      onClick={onCompleteNotes}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-black text-[14px] cursor-pointer hover:from-cyan-450 hover:to-sky-450 shadow-md border border-cyan-400/30 shrink-0"
                    >
                      Complete Notes
                      <ChevronRight className="w-3.5 h-3.5 font-bold" />
                    </button>
                    {onGoToSelfAssessment && (
                      <button
                        onClick={onGoToSelfAssessment}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[14px] cursor-pointer hover:from-amber-350 hover:to-orange-450 shadow-md border border-amber-400/30 shrink-0"
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
                    onClick={() => setActiveTopic(PHYSICS_TOPICS[0].id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${
                      isLightMode
                        ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm"
                        : "bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"
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
      </main>
    </div>
  );
}

export default LearnPhysics9;
