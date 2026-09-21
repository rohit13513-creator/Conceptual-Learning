import React from "react";

// Simple explaining diagrams for the Work, Energy and Simple Machines notes. White card, fixed colours.

const INK = "#0f172a";
const T = { fontFamily: "sans-serif" } as const;
const RED = "#dc2626";
const GREEN = "#16a34a";
const BLUE = "#2563eb";
const TEAL = "#0f766e";
const GREY = "#475569";

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

const Box: React.FC<{ x: number; y: number; w?: number; h?: number; label?: string; fill?: string }> = ({ x, y, w = 60, h = 40, label, fill = "#fde68a" }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="4" fill={fill} stroke={INK} strokeWidth="1.5" />
    {label && <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK} style={T}>{label}</text>}
  </g>
);

export const WorkSignsDiagram: React.FC = () => (
  <svg viewBox="0 0 760 300" role="img" aria-label="Positive work, negative work and zero work" className="w-full h-auto" style={T}>
    <rect width="760" height="300" fill="#ffffff" />
    {/* positive */}
    <text x="125" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fill={GREEN}>Positive work</text>
    <line x1="20" y1="150" x2="230" y2="150" stroke="#94a3b8" strokeWidth="3" />
    <Box x={70} y={108} label="Box" />
    <Arrow x1={134} y1={128} x2={210} y2={128} c={RED} w={4} /><text x="172" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill={RED}>Force</text>
    <Arrow x1={70} y1={175} x2={190} y2={175} c={BLUE} w={4} /><text x="130" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill={BLUE}>Displacement</text>
    <text x="125" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Force and movement</text>
    <text x="125" y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>in the SAME direction</text>
    <text x="125" y="282" textAnchor="middle" fontSize="13" fontWeight="800" fill={GREEN}>W is positive</text>
    {/* negative */}
    <text x="380" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fill={RED}>Negative work</text>
    <line x1="270" y1="150" x2="490" y2="150" stroke="#94a3b8" strokeWidth="3" />
    <Box x={330} y={108} label="Ball" fill="#bfdbfe" />
    <Arrow x1={326} y1={128} x2={270} y2={128} c={RED} w={4} /><text x="298" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill={RED}>Force</text>
    <Arrow x1={330} y1={175} x2={450} y2={175} c={BLUE} w={4} /><text x="390" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill={BLUE}>Displacement</text>
    <text x="380" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Force and movement</text>
    <text x="380" y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>in OPPOSITE directions</text>
    <text x="380" y="282" textAnchor="middle" fontSize="13" fontWeight="800" fill={RED}>W is negative</text>
    {/* zero */}
    <text x="635" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fill={GREY}>Zero work</text>
    <line x1="520" y1="150" x2="750" y2="150" stroke="#94a3b8" strokeWidth="3" />
    <Box x={580} y={108} label="Bag" fill="#fecaca" />
    <Arrow x1={610} y1={104} x2={610} y2={56} c={RED} w={4} /><text x="640" y="72" fontSize="12" fontWeight="700" fill={RED}>Force (up)</text>
    <Arrow x1={580} y1={175} x2={700} y2={175} c={BLUE} w={4} /><text x="640" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill={BLUE}>Displacement</text>
    <text x="635" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Force at right angles</text>
    <text x="635" y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>to the movement (or no movement)</text>
    <text x="635" y="282" textAnchor="middle" fontSize="13" fontWeight="800" fill={GREY}>W = 0</text>
  </svg>
);

export const WorkFormulaDiagram: React.FC = () => (
  <svg viewBox="0 0 720 240" role="img" aria-label="Work equals force times displacement in the direction of the force" className="w-full h-auto" style={T}>
    <rect width="720" height="240" fill="#ffffff" />
    <line x1="40" y1="130" x2="680" y2="130" stroke="#94a3b8" strokeWidth="3" />
    <Box x={90} y={90} w={70} h={40} label="Box" />
    <Box x={470} y={90} w={70} h={40} label="Box" fill="#fef3c7" />
    <Arrow x1={164} y1={110} x2={250} y2={110} c={RED} w={5} />
    <text x="207" y="100" textAnchor="middle" fontSize="14" fontWeight="800" fill={RED}>F</text>
    <line x1="125" y1="160" x2="125" y2="150" stroke={BLUE} strokeWidth="2" /><line x1="505" y1="160" x2="505" y2="150" stroke={BLUE} strokeWidth="2" />
    <Arrow x1={125} y1={165} x2={505} y2={165} c={BLUE} w={3} />
    <text x="315" y="188" textAnchor="middle" fontSize="14" fontWeight="800" fill={BLUE}>Displacement s</text>
    <text x="360" y="40" textAnchor="middle" fontSize="22" fontWeight="800" fill={INK}>W = F × s</text>
    <text x="360" y="66" textAnchor="middle" fontSize="13" fontWeight="600" fill={GREY}>1 joule = 1 newton × 1 metre</text>
    <text x="360" y="224" textAnchor="middle" fontSize="13" fontWeight="700" fill={TEAL}>Bigger force or longer distance means more work</text>
  </svg>
);

export const KineticEnergyDiagram: React.FC = () => (
  <svg viewBox="0 0 720 300" role="img" aria-label="Kinetic energy grows with the square of velocity; doubling the speed makes it four times" className="w-full h-auto" style={T}>
    <rect width="720" height="300" fill="#ffffff" />
    <line x1="70" y1="250" x2="70" y2="30" stroke={INK} strokeWidth="2" /><line x1="70" y1="250" x2="360" y2="250" stroke={INK} strokeWidth="2" />
    <path d="M70 250 Q 160 245 215 180 T 320 40" stroke={RED} strokeWidth="4" fill="none" />
    <text x="215" y="278" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Velocity v</text>
    <text x="30" y="140" fontSize="13" fontWeight="700" fill={INK} transform="rotate(-90 30 140)" textAnchor="middle">Kinetic energy K</text>
    <text x="215" y="22" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>K = ½ m v²</text>
    <g>
      <rect x="420" y="60" width="110" height="60" rx="8" fill="#fef3c7" stroke={INK} />
      <text x="475" y="86" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Speed v</text>
      <text x="475" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>Energy K</text>
      <Arrow x1={535} y1={90} x2={585} y2={90} c={TEAL} w={3} />
      <rect x="590" y="40" width="120" height="100" rx="8" fill="#fecaca" stroke={INK} />
      <text x="650" y="76" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Speed 2v</text>
      <text x="650" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill={RED}>Energy 4K</text>
    </g>
    <text x="565" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Double the speed, four times the energy</text>
    <text x="565" y="200" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Triple the speed, nine times the energy</text>
    <text x="565" y="236" textAnchor="middle" fontSize="13" fontWeight="600" fill={GREY}>Mass doubled: energy doubled only</text>
  </svg>
);

export const PotentialEnergyDiagram: React.FC = () => (
  <svg viewBox="0 0 720 300" role="img" aria-label="Potential energy mgh grows with height" className="w-full h-auto" style={T}>
    <rect width="720" height="300" fill="#ffffff" />
    <rect x="30" y="256" width="660" height="10" fill="#a3e635" stroke="#65a30d" />
    <text x="60" y="288" fontSize="13" fontWeight="700" fill={GREY}>Ground (PE = 0)</text>
    {[0, 1, 2].map((i) => {
      const x = 130 + i * 210;
      const h = (i + 1) * 60;
      const y = 256 - h - 30;
      return (
        <g key={i}>
          <circle cx={x} cy={y + 15} r="15" fill="#f87171" stroke={INK} strokeWidth="2" />
          <line x1={x + 40} y1={256} x2={x + 40} y2={y + 15} stroke={BLUE} strokeWidth="2" strokeDasharray="5 4" />
          <text x={x + 48} y={(256 + y + 15) / 2 + 4} fontSize="13" fontWeight="800" fill={BLUE}>{i === 0 ? "h" : `${i + 1}h`}</text>
          <text x={x} y={y - 8} textAnchor="middle" fontSize="14" fontWeight="800" fill={RED}>{i === 0 ? "PE = mgh" : `PE = ${i + 1}mgh`}</text>
        </g>
      );
    })}
    <text x="360" y="22" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Higher up, more stored energy</text>
  </svg>
);

export const EnergyBarsDiagram: React.FC = () => {
  const Col: React.FC<{ x: number; label: string; pe: number; ke: number; y: number }> = ({ x, label, pe, ke, y }) => (
    <g>
      <circle cx={x - 66} cy={y} r="14" fill="#f87171" stroke={INK} strokeWidth="2" />
      <text x={x} y={30} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK}>{label}</text>
      <rect x={x - 40} y={250 - pe} width="36" height={pe} fill="#60a5fa" stroke={INK} />
      <rect x={x + 4} y={250 - ke} width="36" height={ke} fill="#f59e0b" stroke={INK} />
      <text x={x - 22} y={268} textAnchor="middle" fontSize="12" fontWeight="700" fill={BLUE}>PE</text>
      <text x={x + 22} y={268} textAnchor="middle" fontSize="12" fontWeight="700" fill="#b45309">KE</text>
      <text x={x} y={288} textAnchor="middle" fontSize="12" fontWeight="800" fill={TEAL}>Total = mgh</text>
    </g>
  );
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="A falling object: potential energy turns into kinetic energy and the total stays the same" className="w-full h-auto" style={T}>
      <rect width="720" height="300" fill="#ffffff" />
      <line x1="60" y1="250" x2="660" y2="250" stroke={INK} strokeWidth="2" />
      <Col x={130} label="Top: at rest" pe={150} ke={0} y={52} />
      <Col x={310} label="Half way down" pe={75} ke={75} y={110} />
      <Col x={490} label="Just before ground" pe={0} ke={150} y={170} />
      <text x="640" y="150" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>PE falls,</text>
      <text x="640" y="168" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>KE rises,</text>
      <text x="640" y="186" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>sum same</text>
    </svg>
  );
};

export const PowerDiagram: React.FC = () => (
  <svg viewBox="0 0 720 240" role="img" aria-label="Same work done in different times needs different power" className="w-full h-auto" style={T}>
    <rect width="720" height="240" fill="#ffffff" />
    <text x="180" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Run up the stairs: 1 minute</text>
    <text x="540" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Walk up the stairs: 5 minutes</text>
    {[180, 540].map((cx, k) => (
      <g key={k}>
        <polyline points={`${cx - 90},190 ${cx - 90},160 ${cx - 50},160 ${cx - 50},130 ${cx - 10},130 ${cx - 10},100 ${cx + 30},100 ${cx + 30},70 ${cx + 70},70`} fill="none" stroke={INK} strokeWidth="3" />
        <circle cx={cx + 50} cy="54" r="9" fill="#fde68a" stroke={INK} strokeWidth="2" />
      </g>
    ))}
    <rect x="90" y="204" width="180" height="28" rx="6" fill="#fecaca" stroke={RED} />
    <text x="180" y="223" textAnchor="middle" fontSize="13" fontWeight="800" fill={RED}>More power</text>
    <rect x="450" y="204" width="180" height="28" rx="6" fill="#bbf7d0" stroke={GREEN} />
    <text x="540" y="223" textAnchor="middle" fontSize="13" fontWeight="800" fill="#166534">Less power</text>
    <text x="360" y="120" textAnchor="middle" fontSize="13" fontWeight="800" fill={TEAL}>Same work</text>
    <text x="360" y="140" textAnchor="middle" fontSize="16" fontWeight="800" fill={INK}>P = W / t</text>
  </svg>
);

export const LeverBalanceDiagram: React.FC = () => (
  <svg viewBox="0 0 720 280" role="img" aria-label="A lever balanced: effort times effort arm equals load times load arm" className="w-full h-auto" style={T}>
    <rect width="720" height="280" fill="#ffffff" />
    <line x1="60" y1="120" x2="660" y2="120" stroke="#92400e" strokeWidth="10" strokeLinecap="round" />
    <polygon points="300,124 275,190 325,190" fill="#f97316" stroke={INK} strokeWidth="2" />
    <text x="300" y="212" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Fulcrum</text>
    <rect x="72" y="60" width="90" height="50" rx="4" fill="#94a3b8" stroke={INK} strokeWidth="2" />
    <text x="117" y="90" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Load</text>
    <Arrow x1={117} y1={126} x2={117} y2={168} c={RED} w={3} /><text x="117" y="186" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={RED}>F2 (big)</text>
    <Arrow x1={620} y1={70} x2={620} y2={112} c={BLUE} w={3} /><text x="620" y="58" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={BLUE}>Effort F1 (small)</text>
    <line x1="117" y1="236" x2="300" y2="236" stroke={RED} strokeWidth="2" /><line x1="117" y1="230" x2="117" y2="242" stroke={RED} strokeWidth="2" /><line x1="300" y1="230" x2="300" y2="242" stroke={RED} strokeWidth="2" />
    <text x="208" y="256" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={RED}>Load arm (short)</text>
    <line x1="300" y1="236" x2="620" y2="236" stroke={BLUE} strokeWidth="2" /><line x1="620" y1="230" x2="620" y2="242" stroke={BLUE} strokeWidth="2" />
    <text x="460" y="256" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={BLUE}>Effort arm (long)</text>
    <text x="360" y="24" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>Effort × effort arm = Load × load arm</text>
    <text x="360" y="274" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={TEAL}>Mechanical advantage = effort arm / load arm</text>
  </svg>
);

export const SeesawDiagram: React.FC = () => (
  <svg viewBox="0 0 720 260" role="img" aria-label="A seesaw balanced with a 15 kg child 2 m away and a 30 kg child 1 m away" className="w-full h-auto" style={T}>
    <rect width="720" height="260" fill="#ffffff" />
    <line x1="80" y1="130" x2="640" y2="130" stroke="#92400e" strokeWidth="9" strokeLinecap="round" />
    <polygon points="360,134 335,196 385,196" fill="#f97316" stroke={INK} strokeWidth="2" />
    <text x="360" y="218" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Fulcrum</text>
    <g><circle cx="140" cy="92" r="14" fill="#fde68a" stroke={INK} strokeWidth="2" /><line x1="140" y1="106" x2="140" y2="124" stroke={INK} strokeWidth="3" /></g>
    <text x="140" y="60" textAnchor="middle" fontSize="13" fontWeight="800" fill={BLUE}>15 kg</text>
    <g><circle cx="500" cy="82" r="18" fill="#fca5a5" stroke={INK} strokeWidth="2" /><line x1="500" y1="100" x2="500" y2="124" stroke={INK} strokeWidth="4" /></g>
    <text x="500" y="50" textAnchor="middle" fontSize="13" fontWeight="800" fill={RED}>30 kg</text>
    <line x1="140" y1="236" x2="360" y2="236" stroke={BLUE} strokeWidth="2" /><text x="250" y="254" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={BLUE}>2 m</text>
    <line x1="360" y1="236" x2="500" y2="236" stroke={RED} strokeWidth="2" /><text x="430" y="254" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={RED}>1 m</text>
    <text x="600" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>15 × 2 = 30 × 1</text>
    <text x="600" y="210" textAnchor="middle" fontSize="13" fontWeight="800" fill={TEAL}>Balanced</text>
  </svg>
);

export const InclinedPlaneDiagram: React.FC = () => (
  <svg viewBox="0 0 720 260" role="img" aria-label="An inclined plane: a longer slope needs a smaller force but the same work" className="w-full h-auto" style={T}>
    <rect width="720" height="260" fill="#ffffff" />
    <line x1="30" y1="220" x2="690" y2="220" stroke="#94a3b8" strokeWidth="3" />
    <polygon points="40,220 320,220 320,90" fill="#fde68a" stroke={INK} strokeWidth="2" />
    <line x1="335" y1="220" x2="335" y2="90" stroke={BLUE} strokeWidth="2" strokeDasharray="5 4" />
    <text x="350" y="160" fontSize="14" fontWeight="800" fill={BLUE}>h</text>
    <text x="150" y="140" fontSize="14" fontWeight="800" fill={RED} transform="rotate(-25 150 140)">L (slope length)</text>
    <rect x="80" y="180" width="34" height="26" fill="#ef4444" stroke={INK} transform="rotate(-25 97 193)" />
    <Arrow x1={110} y1={172} x2={160} y2={148} c={GREEN} w={4} />
    <text x="196" y="184" fontSize="13" fontWeight="800" fill="#166534">Effort F</text>
    <text x="500" y="70" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>F × L = m g h</text>
    <text x="500" y="100" textAnchor="middle" fontSize="14" fontWeight="800" fill={TEAL}>Mechanical advantage = L / h</text>
    <text x="500" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>Longer, gentler slope:</text>
    <text x="500" y="160" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>smaller force, longer path,</text>
    <text x="500" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>the same work</text>
  </svg>
);

export const PulleyDiagram: React.FC = () => (
  <svg viewBox="0 0 720 300" role="img" aria-label="A fixed pulley only changes the direction of the force, a movable pulley also reduces the effort" className="w-full h-auto" style={T}>
    <rect width="720" height="300" fill="#ffffff" />
    <text x="180" y="24" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Fixed pulley: MA = 1</text>
    <rect x="100" y="36" width="160" height="8" fill="#92400e" />
    <line x1="180" y1="44" x2="180" y2="62" stroke={INK} strokeWidth="3" />
    <circle cx="180" cy="80" r="18" fill="#cbd5e1" stroke={INK} strokeWidth="3" />
    <line x1="162" y1="80" x2="162" y2="230" stroke={INK} strokeWidth="3" /><line x1="198" y1="80" x2="198" y2="200" stroke={INK} strokeWidth="3" />
    <Arrow x1={198} y1={170} x2={198} y2={214} c={GREEN} w={4} /><text x="210" y="200" fontSize="13" fontWeight="800" fill="#166534">Pull down</text>
    <rect x="140" y="230" width="44" height="34" fill="#94a3b8" stroke={INK} strokeWidth="2" />
    <text x="162" y="252" textAnchor="middle" fontSize="12" fontWeight="800" fill={INK}>Load</text>
    <Arrow x1={162} y1={224} x2={162} y2={190} c={RED} w={3} />
    <text x="180" y="290" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>Effort = load, direction changes</text>
    <text x="540" y="24" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Movable pulley: MA up to 2</text>
    <rect x="440" y="36" width="200" height="8" fill="#92400e" />
    <line x1="490" y1="44" x2="490" y2="150" stroke={INK} strokeWidth="3" />
    <line x1="590" y1="44" x2="590" y2="150" stroke={INK} strokeWidth="3" />
    <circle cx="540" cy="150" r="18" fill="#cbd5e1" stroke={INK} strokeWidth="3" />
    <path d="M522 150 L490 150" stroke={INK} strokeWidth="3" /><path d="M558 150 L590 150" stroke={INK} strokeWidth="3" />
    <line x1="540" y1="168" x2="540" y2="200" stroke={INK} strokeWidth="3" />
    <rect x="516" y="200" width="48" height="36" fill="#94a3b8" stroke={INK} strokeWidth="2" />
    <text x="540" y="223" textAnchor="middle" fontSize="12" fontWeight="800" fill={INK}>Load</text>
    <Arrow x1={590} y1={100} x2={590} y2={60} c={GREEN} w={4} /><text x="602" y="94" fontSize="13" fontWeight="800" fill="#166534">Effort (half)</text>
    <text x="540" y="290" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>Two ropes share the load</text>
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

export const EnergyMindMap: React.FC = () => (
  <svg viewBox="0 0 960 660" role="img" aria-label="Mind map of the chapter: work, energy, kinetic and potential energy, conservation, power and simple machines" className="w-full h-auto" style={T}>
    <rect width="960" height="660" fill="#ffffff" />
    {[[480, 330, 190, 110], [480, 330, 190, 270], [480, 330, 190, 430], [480, 330, 770, 110], [480, 330, 770, 270], [480, 330, 770, 430], [480, 330, 385, 590], [480, 330, 585, 590]].map(([a, b, c, d], i) => (
      <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#94a3b8" strokeWidth="3" />
    ))}
    <circle cx="480" cy="330" r="76" fill="#0891b2" stroke="#0e7490" strokeWidth="3" />
    <text x="480" y="318" textAnchor="middle" fontSize="17" fontWeight="800" fill="#ffffff">WORK AND</text>
    <text x="480" y="338" textAnchor="middle" fontSize="17" fontWeight="800" fill="#ffffff">ENERGY</text>
    <text x="480" y="358" textAnchor="middle" fontSize="12" fontWeight="700" fill="#e0f2fe">and machines</text>
    <Node x={40} y={40} w={300} title="1. Work" lines={["W = F × s (along the force)", "Unit: joule (J)", "Zero if s = 0 or force at 90°", "Positive, negative or zero"]} c="#1d4ed8" bg="#dbeafe" />
    <Node x={40} y={200} w={300} title="2. Work-energy theorem" lines={["Work done = change in energy", "Positive work: energy gained", "Negative work: energy lost", "Energy unit is also joule"]} c="#7c3aed" bg="#ede9fe" />
    <Node x={40} y={360} w={300} title="3. Forms of energy" lines={["Mechanical, thermal, light, sound", "Electrical, nuclear, chemical", "One form changes into another", "Mechanical = KE + PE"]} c="#b45309" bg="#fef3c7" />
    <Node x={620} y={40} w={300} title="4. Kinetic energy" lines={["Energy of motion", "K = ½ m v²", "Double speed: 4 times energy", "No direction"]} c="#15803d" bg="#dcfce7" />
    <Node x={620} y={200} w={300} title="5. Potential energy" lines={["Stored by shape or position", "U = m g h near the Earth", "Spring, magnets, charges", "Higher: more energy"]} c="#be123c" bg="#ffe4e6" />
    <Node x={620} y={360} w={300} title="6. Conservation" lines={["KE + PE stays the same", "Free fall, pendulum, slide", "v = √(2gh) on a slide", "Friction turns some into heat"]} c="#0f766e" bg="#ccfbf1" />
    <Node x={300} y={520} w={170} title="7. Power" lines={["P = W / t", "Unit: watt (W)", "1 hp = 746 W"]} c="#c2410c" bg="#ffedd5" />
    <Node x={490} y={520} w={190} title="8. Simple machines" lines={["MA = load / effort", "Pulley, incline, lever", "Work is not reduced"]} c="#4338ca" bg="#e0e7ff" />
  </svg>
);
