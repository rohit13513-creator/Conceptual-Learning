import React from "react";

// Simple inline SVG diagrams for the Class 10 "How do Organisms Reproduce?" notes. Text uses
// currentColor so labels stay readable in both light and dark mode.

const Svg: React.FC<{ viewBox: string; label: string; children: React.ReactNode }> = ({ viewBox, label, children }) => (
  <svg viewBox={viewBox} role="img" aria-label={label} className="w-full h-auto" style={{ color: "currentColor" }}>
    <style>{`.lbl{font:600 12px sans-serif;fill:currentColor}.ttl{font:700 13px sans-serif;fill:currentColor}.ln{stroke:currentColor;stroke-width:1;fill:none}`}</style>
    {children}
  </svg>
);

const Label: React.FC<{ x: number; y: number; tx: number; ty: number; text: string; anchor?: "start" | "end" | "middle" }> = ({ x, y, tx, ty, text, anchor = "start" }) => (
  <g>
    <line x1={x} y1={y} x2={tx} y2={ty} className="ln" />
    <text x={tx} y={ty} className="lbl" textAnchor={anchor} dy={anchor === "end" ? 4 : 4} dx={anchor === "end" ? -4 : anchor === "start" ? 4 : 0}>{text}</text>
  </g>
);

export const BinaryFissionDiagram: React.FC = () => (
  <Svg viewBox="0 0 640 170" label="Binary fission in Amoeba: one cell elongates, the nucleus divides, the cell splits into two">
    <g>
      <ellipse cx="70" cy="80" rx="48" ry="38" fill="#34d39933" stroke="#10b981" strokeWidth="2" />
      <circle cx="70" cy="80" r="11" fill="#10b98166" stroke="#059669" />
      <text x="70" y="145" className="lbl" textAnchor="middle">1. Parent Amoeba</text>
    </g>
    <text x="135" y="84" className="ttl" textAnchor="middle">→</text>
    <g>
      <ellipse cx="215" cy="80" rx="62" ry="32" fill="#34d39933" stroke="#10b981" strokeWidth="2" />
      <circle cx="215" cy="80" r="11" fill="#10b98166" stroke="#059669" />
      <text x="215" y="145" className="lbl" textAnchor="middle">2. DNA copied,</text>
      <text x="215" y="160" className="lbl" textAnchor="middle">cell elongates</text>
    </g>
    <text x="295" y="84" className="ttl" textAnchor="middle">→</text>
    <g>
      <ellipse cx="375" cy="80" rx="66" ry="32" fill="#34d39933" stroke="#10b981" strokeWidth="2" />
      <circle cx="350" cy="80" r="10" fill="#10b98166" stroke="#059669" />
      <circle cx="400" cy="80" r="10" fill="#10b98166" stroke="#059669" />
      <path d="M375 50 Q372 80 375 110" stroke="#059669" strokeWidth="2" fill="none" strokeDasharray="4 3" />
      <text x="375" y="145" className="lbl" textAnchor="middle">3. Nucleus divides,</text>
      <text x="375" y="160" className="lbl" textAnchor="middle">cell constricts</text>
    </g>
    <text x="462" y="84" className="ttl" textAnchor="middle">→</text>
    <g>
      <ellipse cx="520" cy="80" rx="36" ry="30" fill="#34d39933" stroke="#10b981" strokeWidth="2" />
      <circle cx="520" cy="80" r="9" fill="#10b98166" stroke="#059669" />
      <ellipse cx="596" cy="80" rx="36" ry="30" fill="#34d39933" stroke="#10b981" strokeWidth="2" />
      <circle cx="596" cy="80" r="9" fill="#10b98166" stroke="#059669" />
      <text x="558" y="145" className="lbl" textAnchor="middle">4. Two daughter Amoebae</text>
    </g>
  </Svg>
);

export const BuddingHydraDiagram: React.FC = () => (
  <Svg viewBox="0 0 420 260" label="Budding in Hydra: a small bud grows on the parent's body and later detaches">
    <rect x="150" y="60" width="46" height="150" rx="20" fill="#34d39933" stroke="#10b981" strokeWidth="2" />
    <ellipse cx="173" cy="210" rx="34" ry="12" fill="#34d39955" stroke="#10b981" strokeWidth="2" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M${158 + i * 8} 60 Q${150 + i * 12} 25 ${140 + i * 16} 10`} stroke="#10b981" strokeWidth="2" fill="none" />
    ))}
    <ellipse cx="240" cy="140" rx="20" ry="26" fill="#34d39955" stroke="#10b981" strokeWidth="2" />
    <line x1="196" y1="140" x2="222" y2="140" stroke="#10b981" strokeWidth="6" />
    <Label x={173} y={40} tx={300} ty={30} text="Tentacles" />
    <Label x={173} y={110} tx={40} ty={110} text="Parent Hydra" anchor="end" />
    <Label x={250} y={125} tx={300} ty={110} text="Bud (outgrowth from" />
    <text x="304" y="126" className="lbl">repeated cell division)</text>
    <Label x={173} y={215} tx={40} ty={235} text="Base (attached)" anchor="end" />
    <text x="210" y="252" className="lbl" textAnchor="middle">Bud grows → detaches → new independent Hydra</text>
  </Svg>
);

export const FlowerLSDiagram: React.FC = () => (
  <Svg viewBox="0 0 520 380" label="Longitudinal section of a flower showing sepal, petal, stamen (anther and filament), carpel (stigma, style, ovary, ovule) and thalamus">
    <path d="M260 340 L260 200" stroke="#059669" strokeWidth="6" />
    <ellipse cx="260" cy="200" rx="52" ry="34" fill="#a7f3d055" stroke="#10b981" strokeWidth="2" />
    <path d="M232 178 Q222 140 240 105 Q260 75 280 105 Q298 140 288 178" fill="#a7f3d044" stroke="#10b981" strokeWidth="2" />
    <ellipse cx="260" cy="170" rx="13" ry="17" fill="#fde68a99" stroke="#d97706" />
    <circle cx="256" cy="167" r="4" fill="#f59e0b" /><circle cx="264" cy="174" r="4" fill="#f59e0b" />
    <path d="M260 153 L260 100" stroke="#10b981" strokeWidth="4" />
    <ellipse cx="260" cy="92" rx="12" ry="8" fill="#f9a8d4" stroke="#db2777" strokeWidth="2" />
    <path d="M226 178 L206 110" stroke="#0ea5e9" strokeWidth="3" />
    <ellipse cx="202" cy="100" rx="9" ry="14" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
    <path d="M294 178 L314 110" stroke="#0ea5e9" strokeWidth="3" />
    <ellipse cx="318" cy="100" rx="9" ry="14" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
    <path d="M208 200 Q150 170 128 118 Q158 130 212 186 Z" fill="#f472b699" stroke="#db2777" strokeWidth="2" />
    <path d="M312 200 Q370 170 392 118 Q362 130 308 186 Z" fill="#f472b699" stroke="#db2777" strokeWidth="2" />
    <path d="M214 214 Q160 240 140 285 Q180 262 226 232 Z" fill="#4ade8099" stroke="#15803d" strokeWidth="2" />
    <path d="M306 214 Q360 240 380 285 Q340 262 294 232 Z" fill="#4ade8099" stroke="#15803d" strokeWidth="2" />
    <Label x={260} y={92} tx={410} ty={40} text="Stigma (sticky tip)" />
    <Label x={260} y={125} tx={410} ty={70} text="Style" />
    <Label x={260} y={175} tx={410} ty={100} text="Ovary" />
    <Label x={258} y={168} tx={410} ty={130} text="Ovule (contains egg)" />
    <text x="430" y="150" className="lbl">Carpel / pistil = stigma + style + ovary</text>
    <Label x={318} y={100} tx={410} ty={190} text="Anther (makes pollen)" />
    <Label x={310} y={140} tx={410} ty={215} text="Filament" />
    <text x="430" y="232" className="lbl">Stamen = anther + filament</text>
    <Label x={140} y={130} tx={20} ty={130} text="Petal" anchor="start" />
    <Label x={150} y={270} tx={20} ty={300} text="Sepal" anchor="start" />
    <Label x={260} y={330} tx={330} ty={345} text="Thalamus / stalk" />
  </Svg>
);

export const PollenTubeDiagram: React.FC = () => (
  <Svg viewBox="0 0 460 340" label="Pollen grain landing on stigma, pollen tube growing through the style to the ovule in the ovary">
    <ellipse cx="230" cy="285" rx="90" ry="45" fill="#a7f3d044" stroke="#10b981" strokeWidth="2" />
    <ellipse cx="230" cy="280" rx="22" ry="28" fill="#fde68a99" stroke="#d97706" strokeWidth="2" />
    <circle cx="230" cy="280" r="7" fill="#f59e0b" />
    <rect x="216" y="80" width="28" height="170" rx="10" fill="#a7f3d044" stroke="#10b981" strokeWidth="2" />
    <ellipse cx="230" cy="70" rx="34" ry="14" fill="#f9a8d4" stroke="#db2777" strokeWidth="2" />
    <circle cx="214" cy="52" r="9" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
    <path d="M214 60 Q222 120 228 200 T230 252" stroke="#0ea5e9" strokeWidth="3" fill="none" strokeDasharray="6 3" />
    <circle cx="228" cy="150" r="3" fill="#0369a1" /><circle cx="231" cy="178" r="3" fill="#0369a1" />
    <Label x={214} y={50} tx={90} ty={40} text="Pollen grain" anchor="end" />
    <Label x={250} y={70} tx={330} ty={55} text="Stigma" />
    <Label x={244} y={150} tx={330} ty={150} text="Style" />
    <Label x={228} y={160} tx={90} ty={170} text="Pollen tube (carries" anchor="end" />
    <text x="88" y="186" className="lbl" textAnchor="end">male gametes)</text>
    <Label x={230} y={280} tx={330} ty={280} text="Ovule (egg cell inside)" />
    <Label x={310} y={305} tx={350} ty={325} text="Ovary" />
    <text x="230" y="20" className="ttl" textAnchor="middle">Pollination → pollen tube → fertilisation</text>
  </Svg>
);

export const SpermDiagram: React.FC = () => (
  <Svg viewBox="0 0 520 130" label="Human sperm: head with nucleus and acrosome, middle piece with mitochondria, long tail">
    <ellipse cx="80" cy="60" rx="46" ry="28" fill="#93c5fd66" stroke="#2563eb" strokeWidth="2" />
    <ellipse cx="88" cy="60" rx="26" ry="18" fill="#3b82f699" stroke="#1d4ed8" />
    <path d="M40 60 Q44 40 60 36 Q52 50 52 60 Q52 70 60 84 Q44 80 40 60Z" fill="#f59e0b99" stroke="#b45309" />
    <rect x="126" y="52" width="60" height="16" rx="6" fill="#fca5a599" stroke="#dc2626" strokeWidth="2" />
    <path d="M186 60 Q240 20 290 60 T400 60 T500 60" stroke="#2563eb" strokeWidth="3" fill="none" />
    <Label x={48} y={48} tx={20} ty={14} text="Acrosome (enzymes)" anchor="start" />
    <Label x={92} y={60} tx={92} ty={108} text="Head (nucleus, DNA)" anchor="middle" />
    <Label x={156} y={52} tx={156} ty={22} text="Middle piece (mitochondria)" anchor="middle" />
    <Label x={330} y={60} tx={330} ty={100} text="Tail (flagellum) - for swimming" anchor="middle" />
  </Svg>
);
