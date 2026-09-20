import React from "react";

// Simple explaining diagrams for the Forces notes. All drawn on a white card with fixed colours.

const INK = "#0f172a";
const T = { fontFamily: "sans-serif" } as const;
const RED = "#dc2626";
const GREEN = "#16a34a";
const BLUE = "#2563eb";

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; c?: string; w?: number }> = ({ x1, y1, x2, y2, c = INK, w = 3 }) => {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const hx = x2 - ux * 11, hy = y2 - uy * 11;
  return (
    <g stroke={c} fill={c} strokeWidth={w}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} />
      <polygon points={`${x2},${y2} ${hx - uy * 6},${hy + ux * 6} ${hx + uy * 6},${hy - ux * 6}`} stroke="none" />
    </g>
  );
};

const Block: React.FC<{ x: number; y: number; w?: number; h?: number; label?: string; fill?: string }> = ({ x, y, w = 70, h = 46, label, fill = "#fde68a" }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="4" fill={fill} stroke={INK} strokeWidth="1.5" />
    {label && <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={INK} style={T}>{label}</text>}
  </g>
);

export const NetForceCases: React.FC = () => {
  const Row: React.FC<{ y: number; title: string; left?: [number, string, string]; right?: [number, string, string]; result: string }> = ({ y, title, left, right, result }) => (
    <g>
      <text x="16" y={y} fontSize="14" fontWeight="800" fill={INK}>{title}</text>
      <Block x={285} y={y + 14} label="Block" />
      {left && (<g><Arrow x1={281} y1={y + 37} x2={281 - left[0]} y2={y + 37} c={left[1]} /><text x={281 - left[0] - 8} y={y + 42} textAnchor="end" fontSize="13" fontWeight="700" fill={left[1]}>{left[2]}</text></g>)}
      {right && (<g><Arrow x1={359} y1={y + 37} x2={359 + right[0]} y2={y + 37} c={right[1]} /><text x={359 + right[0] + 8} y={y + 42} fontSize="13" fontWeight="700" fill={right[1]}>{right[2]}</text></g>)}
      <text x="665" y={y + 42} textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f766e">{result}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 780 260" role="img" aria-label="Net force when two forces act in the same direction and in opposite directions" className="w-full h-auto" style={T}>
      <rect width="780" height="260" fill="#ffffff" />
      <Row y={22} title="1. Both forces pull the same way (to the right)" right={[70, RED, "10 N + 6 N"]} result="Net = 10 + 6 = 16 N, right" />
      <Row y={100} title="2. Opposite forces, right one is bigger" left={[50, GREEN, "6 N"]} right={[90, RED, "10 N"]} result="Net = 10 - 6 = 4 N, right" />
      <Row y={178} title="3. Opposite forces, left one is bigger" left={[90, RED, "10 N"]} right={[50, GREEN, "6 N"]} result="Net = 10 - 6 = 4 N, left" />
    </svg>
  );
};

export const FmaTriangle: React.FC = () => (
  <svg viewBox="0 0 520 250" role="img" aria-label="F equals m times a triangle" className="w-full h-auto" style={T}>
    <rect width="520" height="250" fill="#ffffff" />
    <polygon points="140,20 60,200 220,200" fill="#e0f2fe" stroke={INK} strokeWidth="2" />
    <line x1="88" y1="125" x2="192" y2="125" stroke={INK} strokeWidth="2" />
    <line x1="140" y1="125" x2="140" y2="200" stroke={INK} strokeWidth="2" />
    <text x="140" y="100" textAnchor="middle" fontSize="34" fontWeight="800" fill={BLUE}>F</text>
    <text x="100" y="172" textAnchor="middle" fontSize="34" fontWeight="800" fill={RED}>m</text>
    <text x="182" y="172" textAnchor="middle" fontSize="34" fontWeight="800" fill={GREEN}>a</text>
    <text x="270" y="60" fontSize="15" fontWeight="800" fill={INK}>Cover the one you want:</text>
    <text x="270" y="95" fontSize="16" fontWeight="700" fill={BLUE}>cover F: F = m x a</text>
    <text x="270" y="128" fontSize="16" fontWeight="700" fill={GREEN}>cover a: a = F / m</text>
    <text x="270" y="161" fontSize="16" fontWeight="700" fill={RED}>cover m: m = F / a</text>
    <text x="270" y="200" fontSize="13" fontWeight="600" fill="#475569">F in newton (N), m in kg, a in m/s²</text>
  </svg>
);

export const ForceAccelGraphs: React.FC = () => (
  <svg viewBox="0 0 720 300" role="img" aria-label="Two graphs: acceleration grows in a straight line with force for the same mass; acceleration falls as mass grows for the same force" className="w-full h-auto" style={T}>
    <rect width="720" height="300" fill="#ffffff" />
    <g>
      <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Same mass: more force, more acceleration</text>
      <line x1="60" y1="240" x2="60" y2="42" stroke={INK} strokeWidth="2" /><line x1="60" y1="240" x2="300" y2="240" stroke={INK} strokeWidth="2" />
      <line x1="60" y1="240" x2="280" y2="70" stroke={BLUE} strokeWidth="4" />
      <text x="180" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Force F</text>
      <text x="22" y="145" fontSize="13" fontWeight="700" fill={INK} transform="rotate(-90 22 145)" textAnchor="middle">Acceleration a</text>
      <text x="180" y="290" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#475569">Double F, and a doubles</text>
    </g>
    <g>
      <text x="540" y="22" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Same force: more mass, less acceleration</text>
      <line x1="420" y1="240" x2="420" y2="42" stroke={INK} strokeWidth="2" /><line x1="420" y1="240" x2="680" y2="240" stroke={INK} strokeWidth="2" />
      <path d="M440 60 C 470 150, 540 205, 660 222" stroke={RED} strokeWidth="4" fill="none" />
      <text x="550" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Mass m</text>
      <text x="382" y="145" fontSize="13" fontWeight="700" fill={INK} transform="rotate(-90 382 145)" textAnchor="middle">Acceleration a</text>
      <text x="550" y="290" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#475569">Double m, and a becomes half</text>
    </g>
  </svg>
);

export const ActionReactionDiagram: React.FC = () => (
  <svg viewBox="0 0 720 240" role="img" aria-label="Object A pushes object B and object B pushes object A with an equal and opposite force" className="w-full h-auto" style={T}>
    <rect width="720" height="240" fill="#ffffff" />
    <Block x={180} y={80} w={120} h={70} label="Object A" fill="#bfdbfe" />
    <Block x={420} y={80} w={120} h={70} label="Object B" fill="#fecaca" />
    <Arrow x1={304} y1={100} x2={416} y2={100} c={BLUE} w={4} />
    <text x="360" y="88" textAnchor="middle" fontSize="13" fontWeight="800" fill={BLUE}>Force by A on B</text>
    <Arrow x1={416} y1={132} x2={304} y2={132} c={RED} w={4} />
    <text x="360" y="156" textAnchor="middle" fontSize="13" fontWeight="800" fill={RED}>Force by B on A</text>
    <text x="360" y="200" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Equal size, opposite direction, always together</text>
    <text x="360" y="222" textAnchor="middle" fontSize="13" fontWeight="600" fill="#475569">They act on DIFFERENT objects, so they never cancel each other.</text>
  </svg>
);

export const BusInertiaDiagram: React.FC = () => {
  const Person: React.FC<{ x: number; lean: number }> = ({ x, lean }) => (
    <g stroke={INK} strokeWidth="3" strokeLinecap="round">
      <circle cx={x + lean} cy="62" r="9" fill="#fde68a" />
      <line x1={x + lean} y1="71" x2={x} y2="112" />
      <line x1={x} y1="112" x2={x - 8} y2="140" /><line x1={x} y1="112" x2={x + 8} y2="140" />
    </g>
  );
  const Bus: React.FC<{ x: number }> = ({ x }) => (
    <g>
      <rect x={x} y="40" width="190" height="105" rx="10" fill="#dbeafe" stroke={INK} strokeWidth="2" />
      <rect x={x + 12} y="52" width="34" height="26" fill="#ffffff" stroke={INK} /><rect x={x + 56} y="52" width="34" height="26" fill="#ffffff" stroke={INK} />
      <circle cx={x + 40} cy="150" r="14" fill="#334155" /><circle cx={x + 150} cy="150" r="14" fill="#334155" />
    </g>
  );
  return (
    <svg viewBox="0 0 720 260" role="img" aria-label="Passenger in a bus: leans forward when the bus brakes, leans backward when it starts" className="w-full h-auto" style={T}>
      <rect width="720" height="260" fill="#ffffff" />
      <text x="115" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Bus moving steadily</text>
      <Bus x={20} /><Person x={120} lean={0} /><Arrow x1={40} y1={192} x2={190} y2={192} c={BLUE} />
      <text x="115" y="222" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK}>Body moves along with the bus</text>
      <text x="360" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Bus stops suddenly</text>
      <Bus x={265} /><Person x={365} lean={22} /><text x="360" y="222" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK}>Feet stop, upper body keeps moving: jerk forward</text>
      <text x="605" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Bus starts suddenly</text>
      <Bus x={510} /><Person x={610} lean={-22} /><text x="605" y="222" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK}>Body stays at rest: jerk backward</text>
      <text x="360" y="248" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f766e">Inertia: objects keep their state of rest or motion</text>
    </svg>
  );
};

export const TimeForceDiagram: React.FC = () => (
  <svg viewBox="0 0 720 260" role="img" aria-label="Stopping a ball quickly needs a big force, stopping it slowly needs a small force" className="w-full h-auto" style={T}>
    <rect width="720" height="260" fill="#ffffff" />
    <text x="180" y="24" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Hands stay stiff</text>
    <rect x="70" y="150" width="220" height="14" fill="#94a3b8" /><text x="180" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Stops in a very short time</text>
    <circle cx="180" cy="120" r="22" fill="#f87171" stroke={INK} strokeWidth="2" />
    <Arrow x1={180} y1={60} x2={180} y2={92} c={BLUE} />
    <rect x="120" y="212" width="120" height="26" rx="4" fill="#fecaca" stroke={RED} /><text x="180" y="230" textAnchor="middle" fontSize="13" fontWeight="800" fill={RED}>BIG force</text>
    <text x="540" y="24" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Hands move back with the ball</text>
    <path d="M430 150 Q540 200 650 150" stroke="#94a3b8" strokeWidth="14" fill="none" />
    <circle cx="540" cy="120" r="22" fill="#f87171" stroke={INK} strokeWidth="2" />
    <Arrow x1={540} y1={60} x2={540} y2={92} c={BLUE} />
    <text x="540" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Stops in a longer time</text>
    <rect x="490" y="212" width="100" height="26" rx="4" fill="#bbf7d0" stroke={GREEN} /><text x="540" y="230" textAnchor="middle" fontSize="13" fontWeight="800" fill="#166534">small force</text>
    <text x="360" y="252" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#475569">Same change in velocity: F = m x (change in v) / time, so more time gives less force.</text>
  </svg>
);

export const RecoilDiagram: React.FC = () => (
  <svg viewBox="0 0 720 220" role="img" aria-label="A gun and bullet: equal and opposite forces but the light bullet gets a much bigger acceleration" className="w-full h-auto" style={T}>
    <rect width="720" height="220" fill="#ffffff" />
    <rect x="250" y="70" width="120" height="44" rx="6" fill="#94a3b8" stroke={INK} strokeWidth="2" />
    <text x="310" y="98" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Gun 5 kg</text>
    <circle cx="410" cy="92" r="9" fill="#f59e0b" stroke={INK} strokeWidth="2" />
    <text x="410" y="130" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK}>Bullet 0.1 kg</text>
    <Arrow x1={244} y1={92} x2={150} y2={92} c={RED} w={4} />
    <text x="196" y="80" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={RED}>Force on gun 2 N</text>
    <text x="196" y="118" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK}>a = 2 / 5 = 0.4 m/s²</text>
    <Arrow x1={430} y1={92} x2={560} y2={92} c={GREEN} w={4} />
    <text x="500" y="80" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={GREEN}>Force on bullet 2 N</text>
    <text x="510" y="118" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK}>a = 2 / 0.1 = 20 m/s²</text>
    <text x="360" y="176" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f766e">Same force, different masses, so different accelerations</text>
  </svg>
);

const Node: React.FC<{ x: number; y: number; w: number; title: string; lines: string[]; c: string; bg: string }> = ({ x, y, w, title, lines, c, bg }) => {
  const h = 34 + lines.length * 17;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={bg} stroke={c} strokeWidth="2" />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" fontSize="14" fontWeight="800" fill={c}>{title}</text>
      {lines.map((l, i) => <text key={i} x={x + w / 2} y={y + 42 + i * 17} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>{l}</text>)}
    </g>
  );
};

export const ForcesMindMap: React.FC = () => (
  <svg viewBox="0 0 960 620" role="img" aria-label="Mind map of the chapter: force, balanced and unbalanced forces, friction, three laws of motion and forces on a system" className="w-full h-auto" style={T}>
    <rect width="960" height="620" fill="#ffffff" />
    {[[480, 310, 190, 108], [480, 310, 190, 250], [480, 310, 190, 410], [480, 310, 770, 108], [480, 310, 770, 250], [480, 310, 770, 410], [480, 310, 480, 560]].map(([a, b, c, d], i) => (
      <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#94a3b8" strokeWidth="3" />
    ))}
    <circle cx="480" cy="310" r="72" fill="#0891b2" stroke="#0e7490" strokeWidth="3" />
    <text x="480" y="303" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffffff">FORCES</text>
    <text x="480" y="326" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e0f2fe">and motion</text>
    <Node x={40} y={40} w={300} title="1. What is a force?" lines={["A push or a pull", "Has size and direction", "Unit: newton (N)", "Measured with a spring balance"]} c="#1d4ed8" bg="#dbeafe" />
    <Node x={40} y={190} w={300} title="2. Balanced / unbalanced" lines={["Equal and opposite: net force 0", "Same direction: add forces", "Opposite direction: subtract", "Net force decides the motion"]} c="#7c3aed" bg="#ede9fe" />
    <Node x={40} y={350} w={300} title="3. Friction" lines={["Acts against the motion", "Depends on the two surfaces", "Smaller friction: goes farther", "Also helps us walk"]} c="#b45309" bg="#fef3c7" />
    <Node x={620} y={40} w={300} title="4. First law (inertia)" lines={["No net force: rest stays rest", "Moving keeps constant velocity", "Inertia = resisting a change", "Bigger mass, more inertia"]} c="#15803d" bg="#dcfce7" />
    <Node x={620} y={190} w={300} title="5. Second law" lines={["a = F / m,  F = m x a", "1 N gives 1 kg an a of 1 m/s²", "Weight = m x g", "More time to stop, less force"]} c="#be123c" bg="#ffe4e6" />
    <Node x={620} y={350} w={300} title="6. Third law" lines={["Equal and opposite pair", "Acts on two different objects", "Walking, canoe, rocket", "Bullet and gun, Earth and fruit"]} c="#0f766e" bg="#ccfbf1" />
    <Node x={330} y={520} w={300} title="7. System of objects" lines={["Treat joined objects as one", "a = F / (m1 + m2)"]} c="#c2410c" bg="#ffedd5" />
  </svg>
);
