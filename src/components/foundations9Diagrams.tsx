import React from "react";

// Simple explaining diagrams for the "How Science Works" notes. White card, fixed colours.

const INK = "#0f172a";
const T = { fontFamily: "sans-serif" } as const;
const RED = "#dc2626";
const GREEN = "#16a34a";
const BLUE = "#2563eb";
const TEAL = "#0f766e";
const GREY = "#475569";
const PURPLE = "#7c3aed";

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

export const ModelSimplifyDiagram: React.FC = () => (
  <svg viewBox="0 0 760 300" role="img" aria-label="A real cricket shot has many details; a simple model keeps only mass, speed and direction" className="w-full h-auto" style={T}>
    <rect width="760" height="300" fill="#ffffff" />
    <text x="190" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>The real thing</text>
    <rect x="30" y="50" width="320" height="200" rx="14" fill="#fef3c7" stroke={INK} strokeWidth="2" />
    <text x="190" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>brand of the bat</text>
    <text x="190" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>colour of the ball</text>
    <text x="190" y="135" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>grass on the field</text>
    <text x="190" y="160" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>mass of the ball</text>
    <text x="190" y="185" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>speed and direction hit</text>
    <text x="190" y="210" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>spin, stitching of seam</text>
    <text x="190" y="235" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>air resistance</text>
    <Arrow x1={362} y1={150} x2={430} y2={150} c={TEAL} w={5} />
    <text x="396" y="135" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={TEAL}>keep what</text>
    <text x="396" y="172" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={TEAL}>matters</text>
    <text x="590" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>The simple model</text>
    <rect x="440" y="50" width="290" height="200" rx="14" fill="#dcfce7" stroke={INK} strokeWidth="2" />
    <text x="585" y="130" textAnchor="middle" fontSize="15" fontWeight="800" fill="#166534">Mass of the ball</text>
    <text x="585" y="165" textAnchor="middle" fontSize="15" fontWeight="800" fill="#166534">Speed it is hit at</text>
    <text x="585" y="200" textAnchor="middle" fontSize="15" fontWeight="800" fill="#166534">Direction it is hit in</text>
    <text x="380" y="280" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>A model keeps only what answers the question: will it cross the boundary?</text>
  </svg>
);

export const UnitsSymbolsDiagram: React.FC = () => (
  <svg viewBox="0 0 760 260" role="img" aria-label="A quantity has a name, a symbol and a unit, such as mass m in kilograms" className="w-full h-auto" style={T}>
    <rect width="760" height="260" fill="#ffffff" />
    <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>Every quantity has three things</text>
    {[["Mass", "m", "kilogram (kg)", 30, "#dbeafe", BLUE], ["Velocity", "v", "metre per second (m/s)", 220, "#ede9fe", PURPLE], ["Force", "F", "newton (N)", 410, "#fef3c7", "#b45309"], ["Electric current", "I", "ampere (A)", 600, "#dcfce7", "#166534"]].map(([name, sym, unit, x, bg, c]: any, i) => (
      <g key={i}>
        <rect x={x} y="60" width="140" height="160" rx="12" fill={bg} stroke={INK} strokeWidth="2" />
        <text x={x + 70} y="86" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK}>{name}</text>
        <text x={x + 70} y="140" textAnchor="middle" fontSize="34" fontWeight="800" fill={c}>{sym}</text>
        <text x={x + 70} y="185" textAnchor="middle" fontSize="11" fontWeight="700" fill={GREY}>{unit.split("(")[0]}</text>
        <text x={x + 70} y="202" textAnchor="middle" fontSize="12" fontWeight="800" fill={c}>{unit.includes("(") ? "(" + unit.split("(")[1] : ""}</text>
      </g>
    ))}
  </svg>
);

export const LawTheoryPrincipleDiagram: React.FC = () => (
  <svg viewBox="0 0 720 340" role="img" aria-label="A pattern observed becomes a law, an explanation for it becomes a theory, and a broad guiding idea is a principle" className="w-full h-auto" style={T}>
    <rect width="720" height="340" fill="#ffffff" />
    <rect x="60" y="30" width="600" height="80" rx="14" fill="#dbeafe" stroke={INK} strokeWidth="2" />
    <text x="360" y="58" textAnchor="middle" fontSize="15" fontWeight="800" fill="#1d4ed8">LAW</text>
    <text x="360" y="80" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK}>A pattern seen again and again in nature</text>
    <text x="360" y="98" textAnchor="middle" fontSize="12" fontWeight="600" fill={GREY}>Example: Newton's laws of motion</text>
    <Arrow x1={360} y1={112} x2={360} y2={148} c={GREY} w={3} />
    <rect x="60" y="152" width="600" height="80" rx="14" fill="#ede9fe" stroke={INK} strokeWidth="2" />
    <text x="360" y="180" textAnchor="middle" fontSize="15" fontWeight="800" fill="#7c3aed">THEORY</text>
    <text x="360" y="202" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK}>An explanation of why the pattern happens, tested with evidence</text>
    <text x="360" y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill={GREY}>Example: the atomic theory explains how molecules form</text>
    <Arrow x1={360} y1={234} x2={360} y2={270} c={GREY} w={3} />
    <rect x="60" y="274" width="600" height="60" rx="14" fill="#fef3c7" stroke={INK} strokeWidth="2" />
    <text x="360" y="298" textAnchor="middle" fontSize="15" fontWeight="800" fill="#b45309">PRINCIPLE</text>
    <text x="360" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>A broad idea used in many situations, like conservation of energy</text>
  </svg>
);

export const PredictionLoopDiagram: React.FC = () => (
  <svg viewBox="0 0 720 340" role="img" aria-label="A loop: idea gives a prediction, prediction is tested, matching builds confidence and not matching leads to a revised idea" className="w-full h-auto" style={T}>
    <rect width="720" height="340" fill="#ffffff" />
    <circle cx="360" cy="170" r="150" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
    {[["Law, theory or model", 360, 40, "#dbeafe", "#1d4ed8"], ["Prediction", 570, 170, "#ede9fe", "#7c3aed"], ["Test / observe", 360, 300, "#fef3c7", "#b45309"], ["Compare", 150, 170, "#dcfce7", "#166534"]].map(([label, x, y, bg, c]: any, i) => (
      <g key={i}>
        <rect x={x - 85} y={y - 30} width="170" height="60" rx="12" fill={bg} stroke={INK} strokeWidth="2" />
        <text x={x} y={y + 6} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={c}>{label}</text>
      </g>
    ))}
    <Arrow x1={430} y1={70} x2={520} y2={140} c={GREY} w={3} />
    <Arrow x1={520} y1={200} x2={430} y2={270} c={GREY} w={3} />
    <Arrow x1={290} y1={270} x2={200} y2={200} c={GREY} w={3} />
    <Arrow x1={200} y1={140} x2={290} y2={70} c={GREY} w={3} />
    <text x="360" y="172" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={TEAL}>Matches: confidence grows</text>
    <text x="360" y="192" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={RED}>Does not match: idea is revised</text>
  </svg>
);

export const EstimationDiagram: React.FC = () => (
  <svg viewBox="0 0 760 260" role="img" aria-label="Two ways to estimate breaths of air in a day give close answers, about 10000 litres" className="w-full h-auto" style={T}>
    <rect width="760" height="260" fill="#ffffff" />
    <text x="190" y="30" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Way 1: breaths per day</text>
    <rect x="30" y="50" width="320" height="150" rx="12" fill="#dbeafe" stroke={INK} strokeWidth="2" />
    <text x="190" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>about 20 000 breaths a day</text>
    <text x="190" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>x about 0.5 litre each</text>
    <text x="190" y="145" textAnchor="middle" fontSize="20" fontWeight="800" fill="#1d4ed8">≈ 10 000 litres</text>
    <text x="570" y="30" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Way 2: balloons per minute</text>
    <rect x="410" y="50" width="320" height="150" rx="12" fill="#dcfce7" stroke={INK} strokeWidth="2" />
    <text x="570" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>3 balloons a minute</text>
    <text x="570" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>x 2 litres x 1440 minutes</text>
    <text x="570" y="145" textAnchor="middle" fontSize="20" fontWeight="800" fill="#166534">≈ 8 640 litres</text>
    <text x="380" y="230" textAnchor="middle" fontSize="13.5" fontWeight="800" fill={TEAL}>Close enough: the rough estimate is reasonable</text>
  </svg>
);

export const BranchesDiagram: React.FC = () => (
  <svg viewBox="0 0 720 320" role="img" aria-label="A mask needs ideas from physics, chemistry, biology and mathematics together" className="w-full h-auto" style={T}>
    <rect width="720" height="320" fill="#ffffff" />
    <circle cx="360" cy="160" r="66" fill="#e0f2fe" stroke={INK} strokeWidth="2" />
    <text x="360" y="155" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>A mask</text>
    <text x="360" y="175" textAnchor="middle" fontSize="12" fontWeight="700" fill={GREY}>keeping out germs</text>
    {[["Physics", "particle motion,", "static attraction", 130, 60, "#dbeafe", "#1d4ed8"], ["Chemistry", "the fibres are", "a kind of polymer", 590, 60, "#fef3c7", "#b45309"], ["Biology", "size and behaviour", "of viruses", 130, 260, "#dcfce7", "#166534"], ["Mathematics", "modelling airflow", "and filtering", 590, 260, "#ede9fe", "#7c3aed"]].map(([t, l1, l2, x, y, bg, c]: any, i) => (
      <g key={i}>
        <line x1={360} y1={160} x2={x} y2={y} stroke="#94a3b8" strokeWidth="2" />
        <rect x={x - 95} y={y - 40} width="190" height="80" rx="12" fill={bg} stroke={INK} strokeWidth="2" />
        <text x={x} y={y - 12} textAnchor="middle" fontSize="14" fontWeight="800" fill={c}>{t}</text>
        <text x={x} y={y + 8} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>{l1}</text>
        <text x={x} y={y + 25} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>{l2}</text>
      </g>
    ))}
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

export const FoundationsMindMap: React.FC = () => (
  <svg viewBox="0 0 960 620" role="img" aria-label="Mind map of how science works" className="w-full h-auto" style={T}>
    <rect width="960" height="620" fill="#ffffff" />
    {[[480, 310, 190, 108], [480, 310, 190, 250], [480, 310, 190, 410], [480, 310, 770, 108], [480, 310, 770, 250], [480, 310, 770, 410], [480, 310, 480, 560]].map(([a, b, c, d], i) => (
      <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#94a3b8" strokeWidth="3" />
    ))}
    <circle cx="480" cy="310" r="76" fill="#0891b2" stroke="#0e7490" strokeWidth="3" />
    <text x="480" y="302" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff">HOW SCIENCE</text>
    <text x="480" y="322" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff">WORKS</text>
    <Node x={40} y={40} w={300} title="1. Models" lines={["Simplified pictures of the real world", "Keep what matters, ignore the rest", "Physics: a point. Biology: a diagram"]} c="#1d4ed8" bg="#dbeafe" />
    <Node x={40} y={200} w={300} title="2. Precise language" lines={["Quantities have symbols and units", "Standard units avoid confusion", "Maths states relationships clearly"]} c="#7c3aed" bg="#ede9fe" />
    <Node x={40} y={360} w={300} title="3. Law, theory, principle" lines={["Law: a seen pattern", "Theory: a tested explanation", "Principle: a broad guiding idea"]} c="#b45309" bg="#fef3c7" />
    <Node x={620} y={40} w={300} title="4. Predictions" lines={["Based on evidence, not guesses", "Match: confidence grows", "Do not match: idea is revised"]} c="#15803d" bg="#dcfce7" />
    <Node x={620} y={200} w={300} title="5. Estimation" lines={["A rough answer that makes sense", "Checks if a result is reasonable", "Different methods should agree roughly"]} c="#be123c" bg="#ffe4e6" />
    <Node x={620} y={360} w={300} title="6. Testing ideas" lines={["Ideas are checked, not just believed", "Nothing is beyond question", "Being wrong and fixing it is a strength"]} c="#0f766e" bg="#ccfbf1" />
    <Node x={330} y={520} w={300} title="7. Branches connect" lines={["Physics, chemistry, biology, earth science", "Real problems need more than one branch"]} c="#c2410c" bg="#ffedd5" />
  </svg>
);
