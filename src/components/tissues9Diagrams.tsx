import React from "react";

// Simple explaining diagrams for the Tissues notes. White card, fixed colours.

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

export const OrganisationLevelsDiagram: React.FC = () => (
  <svg viewBox="0 0 960 210" role="img" aria-label="Cells group into tissues, tissues into organs, organs into organ systems, and organ systems into an organism" className="w-full h-auto" style={T}>
    <rect width="960" height="210" fill="#ffffff" />
    {["Cells", "Tissue", "Organ", "Organ system", "Organism"].map((label, i) => (
      <g key={i}>
        <rect x={20 + i * 190} y={70} width={150} height={70} rx="14" fill={["#dbeafe", "#dcfce7", "#fef3c7", "#ffe4e6", "#ede9fe"][i]} stroke={INK} strokeWidth="2" />
        <text x={20 + i * 190 + 75} y={110} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>{label}</text>
        {i < 4 && <Arrow x1={20 + i * 190 + 152} y1={105} x2={20 + (i + 1) * 190 - 2} y2={105} c={TEAL} w={4} />}
      </g>
    ))}
    <text x="480" y="35" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>Similar cells group together, again and again, into bigger units</text>
    <text x="480" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>This grouping is called the division of labour</text>
  </svg>
);

export const MeristemLocationsDiagram: React.FC = () => (
  <svg viewBox="0 0 720 320" role="img" aria-label="Three kinds of meristem: apical at the tips, lateral around the stem, intercalary at the base of internodes" className="w-full h-auto" style={T}>
    <rect width="720" height="320" fill="#ffffff" />
    <line x1="150" y1="290" x2="150" y2="60" stroke="#166534" strokeWidth="10" strokeLinecap="round" />
    <circle cx="150" cy="55" r="14" fill="#22c55e" stroke={INK} strokeWidth="2" />
    <text x="150" y="30" textAnchor="middle" fontSize="13" fontWeight="800" fill="#166534">Apical meristem (shoot tip)</text>
    <line x1="150" y1="290" x2="150" y2="320" stroke="#a16207" strokeWidth="10" />
    <rect x="220" y="20" width="14" height="40" fill="#166534" />
    <text x="270" y="45" fontSize="13" fontWeight="700" fill={INK}>root tip has its own apical meristem too</text>
    <circle cx="330" cy="170" r="60" fill="none" stroke="#a16207" strokeWidth="8" />
    <text x="410" y="150" fontSize="13" fontWeight="800" fill="#92400e">Lateral meristem</text>
    <text x="410" y="170" fontSize="12" fontWeight="600" fill={GREY}>ring around the stem,</text>
    <text x="410" y="188" fontSize="12" fontWeight="600" fill={GREY}>makes the stem thicker</text>
    <rect x="115" y="222" width="70" height="10" fill="#0891b2" />
    <text x="560" y="222" fontSize="13" fontWeight="800" fill="#0e7490">Intercalary meristem</text>
    <text x="560" y="242" fontSize="12" fontWeight="600" fill={GREY}>at the base of the</text>
    <text x="560" y="260" fontSize="12" fontWeight="600" fill={GREY}>internode; lets grass</text>
    <text x="560" y="278" fontSize="12" fontWeight="600" fill={GREY}>regrow after mowing</text>
    <Arrow x1={555} y1={225} x2={190} y2={227} c="#0e7490" w={3} />
  </svg>
);

export const DifferentiationDiagram: React.FC = () => (
  <svg viewBox="0 0 720 220" role="img" aria-label="A meristematic cell divides again and again, and some of the new cells differentiate into permanent tissue" className="w-full h-auto" style={T}>
    <rect width="720" height="220" fill="#ffffff" />
    <circle cx="90" cy="110" r="42" fill="#bbf7d0" stroke={INK} strokeWidth="2" />
    <text x="90" y="100" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#166534">Meristematic</text>
    <text x="90" y="118" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#166534">cell</text>
    <text x="90" y="170" textAnchor="middle" fontSize="11.5" fontWeight="600" fill={GREY}>thin wall, big nucleus,</text>
    <text x="90" y="186" textAnchor="middle" fontSize="11.5" fontWeight="600" fill={GREY}>keeps dividing</text>
    <Arrow x1={135} y1={110} x2={230} y2={70} c={TEAL} w={3} />
    <Arrow x1={135} y1={110} x2={230} y2={150} c={TEAL} w={3} />
    <text x="185" y="60" fontSize="12" fontWeight="800" fill={TEAL}>divides</text>
    <circle cx="270" cy="65" r="26" fill="#bbf7d0" stroke={INK} strokeWidth="2" />
    <text x="270" y="70" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#166534">stays</text>
    <circle cx="270" cy="150" r="26" fill="#bfdbfe" stroke={INK} strokeWidth="2" />
    <text x="270" y="155" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#1d4ed8">changes</text>
    <Arrow x1={296} y1={150} x2={380} y2={150} c="#1d4ed8" w={3} />
    <text x="340" y="130" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1d4ed8">differentiation</text>
    <rect x="390" y="110" width="300" height="80" rx="12" fill="#fef3c7" stroke={INK} strokeWidth="2" />
    <text x="540" y="140" textAnchor="middle" fontSize="14" fontWeight="800" fill="#92400e">Permanent tissue</text>
    <text x="540" y="162" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK}>fixed shape, cannot divide,</text>
    <text x="540" y="180" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK}>does one job well</text>
  </svg>
);

export const PlantTissueMapDiagram: React.FC = () => (
  <svg viewBox="0 0 960 480" role="img" aria-label="Plant tissues split into meristematic and permanent; permanent splits into simple and complex" className="w-full h-auto" style={T}>
    <rect width="960" height="480" fill="#ffffff" />
    <rect x="380" y="20" width="200" height="55" rx="12" fill="#0891b2" stroke="#0e7490" strokeWidth="2" />
    <text x="480" y="53" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff">Plant tissues</text>
    <Arrow x1={440} y1={78} x2={220} y2={135} c={GREY} w={3} />
    <Arrow x1={520} y1={78} x2={740} y2={135} c={GREY} w={3} />
    <rect x="100" y="140" width="240" height="70" rx="12" fill="#dcfce7" stroke={INK} strokeWidth="2" />
    <text x="220" y="170" textAnchor="middle" fontSize="14" fontWeight="800" fill="#166534">Meristematic</text>
    <text x="220" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>keeps dividing</text>
    <text x="220" y="230" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>apical, lateral, intercalary</text>
    <rect x="620" y="140" width="240" height="70" rx="12" fill="#fef3c7" stroke={INK} strokeWidth="2" />
    <text x="740" y="170" textAnchor="middle" fontSize="14" fontWeight="800" fill="#92400e">Permanent</text>
    <text x="740" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>differentiated, fixed job</text>
    <Arrow x1={690} y1={215} x2={560} y2={280} c={GREY} w={3} />
    <Arrow x1={790} y1={215} x2={880} y2={280} c={GREY} w={3} />
    <rect x="380" y="285" width="220" height="150" rx="12" fill="#dbeafe" stroke={INK} strokeWidth="2" />
    <text x="490" y="315" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1d4ed8">Simple</text>
    <text x="490" y="333" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>one kind of cell</text>
    <text x="490" y="360" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#1d4ed8">Parenchyma</text>
    <text x="490" y="378" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#1d4ed8">Collenchyma</text>
    <text x="490" y="396" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#1d4ed8">Sclerenchyma</text>
    <text x="490" y="418" textAnchor="middle" fontSize="11" fontWeight="700" fill={GREY}>storage, flexible support, hard support</text>
    <rect x="740" y="285" width="220" height="150" rx="12" fill="#ffe4e6" stroke={INK} strokeWidth="2" />
    <text x="850" y="315" textAnchor="middle" fontSize="14" fontWeight="800" fill="#be123c">Complex</text>
    <text x="850" y="333" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>more than one kind of cell</text>
    <text x="850" y="365" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#be123c">Xylem</text>
    <text x="850" y="385" textAnchor="middle" fontSize="11" fontWeight="700" fill={GREY}>carries water up</text>
    <text x="850" y="405" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#be123c">Phloem</text>
    <text x="850" y="425" textAnchor="middle" fontSize="11" fontWeight="700" fill={GREY}>carries food</text>
  </svg>
);

export const StomataTranspirationDiagram: React.FC = () => (
  <svg viewBox="0 0 720 260" role="img" aria-label="Water rises through the xylem because water vapour escapes through the stomata of the leaf, pulling more water up" className="w-full h-auto" style={T}>
    <rect width="720" height="260" fill="#ffffff" />
    <ellipse cx="580" cy="70" rx="90" ry="45" fill="#bbf7d0" stroke="#166534" strokeWidth="2" />
    <text x="580" y="76" textAnchor="middle" fontSize="13" fontWeight="800" fill="#166534">Leaf (stomata)</text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <line x1={540 + i * 40} y1={40} x2={540 + i * 40} y2={10} stroke={BLUE} strokeWidth="2" strokeDasharray="3 3" />
        <polygon points={`${540 + i * 40},6 ${534 + i * 40},18 ${546 + i * 40},18`} fill={BLUE} />
      </g>
    ))}
    <text x="580" y="18" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={BLUE}>water vapour leaves (transpiration)</text>
    <rect x="330" y="90" width="20" height="150" fill="#a16207" />
    <text x="230" y="150" textAnchor="middle" fontSize="13" fontWeight="800" fill="#92400e">Xylem</text>
    {[0, 1, 2, 3].map((i) => (
      <Arrow key={i} x1={340} y1={230 - i * 45} x2={340} y2={195 - i * 45} c={BLUE} w={3} />
    ))}
    <text x="450" y="150" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>water is pulled</text>
    <text x="450" y="168" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>up, like sucking</text>
    <text x="450" y="186" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>a straw</text>
    <rect x="290" y="240" width="100" height="16" fill="#78350f" />
    <text x="340" y="252" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#fef3c7">soil / roots</text>
  </svg>
);

export const AnimalTissueMapDiagram: React.FC = () => (
  <svg viewBox="0 0 960 300" role="img" aria-label="Four types of animal tissue: epithelial, connective, muscular and nervous" className="w-full h-auto" style={T}>
    <rect width="960" height="300" fill="#ffffff" />
    <rect x="380" y="15" width="200" height="55" rx="12" fill="#0891b2" stroke="#0e7490" strokeWidth="2" />
    <text x="480" y="48" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff">Animal tissues</text>
    {[["Epithelial", "covers and lines", "protection, exchange", 90, "#dbeafe", "#1d4ed8"], ["Connective", "connects and supports", "blood, bone, cartilage", 320, "#dcfce7", "#166534"], ["Muscular", "makes movement", "skeletal, smooth, cardiac", 550, "#fef3c7", "#92400e"], ["Nervous", "controls and senses", "made of neurons", 780, "#ede9fe", "#7c3aed"]].map(([t, l1, l2, x, bg, c]: any, i) => (
      <g key={i}>
        <line x1={480} y1={72} x2={x + 90} y2={110} stroke="#94a3b8" strokeWidth="2" />
        <rect x={x} y={110} width="180" height="140" rx="12" fill={bg} stroke={INK} strokeWidth="2" />
        <text x={x + 90} y={145} textAnchor="middle" fontSize="14" fontWeight="800" fill={c}>{t}</text>
        <text x={x + 90} y={175} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>{l1}</text>
        <text x={x + 90} y={200} textAnchor="middle" fontSize="11" fontWeight="700" fill={GREY}>{l2}</text>
      </g>
    ))}
  </svg>
);

export const VoluntaryInvoluntaryDiagram: React.FC = () => (
  <svg viewBox="0 0 720 260" role="img" aria-label="Voluntary movements are under our control, involuntary movements happen automatically" className="w-full h-auto" style={T}>
    <rect width="720" height="260" fill="#ffffff" />
    <rect x="30" y="40" width="300" height="190" rx="14" fill="#dbeafe" stroke={INK} strokeWidth="2" />
    <text x="180" y="70" textAnchor="middle" fontSize="15" fontWeight="800" fill="#1d4ed8">Voluntary</text>
    <text x="180" y="92" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK}>we choose to do it</text>
    <text x="180" y="130" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>writing, running,</text>
    <text x="180" y="150" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>lifting objects</text>
    <text x="180" y="190" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1d4ed8">Skeletal muscle</text>
    <text x="180" y="208" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={GREY}>attached to bones</text>
    <rect x="390" y="40" width="300" height="190" rx="14" fill="#fef3c7" stroke={INK} strokeWidth="2" />
    <text x="540" y="70" textAnchor="middle" fontSize="15" fontWeight="800" fill="#92400e">Involuntary</text>
    <text x="540" y="92" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={INK}>happens on its own</text>
    <text x="540" y="130" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>digestion, heartbeat</text>
    <text x="540" y="170" textAnchor="middle" fontSize="13" fontWeight="800" fill="#92400e">Smooth muscle</text>
    <text x="540" y="188" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={GREY}>stomach, intestine</text>
    <text x="540" y="208" textAnchor="middle" fontSize="13" fontWeight="800" fill="#92400e">Cardiac muscle</text>
  </svg>
);

export const JointMovementMindMap: React.FC = () => (
  <svg viewBox="0 0 960 620" role="img" aria-label="Mind map of tissues in action" className="w-full h-auto" style={T}>
    <rect width="960" height="620" fill="#ffffff" />
    {[[480, 310, 190, 108], [480, 310, 190, 250], [480, 310, 190, 410], [480, 310, 770, 108], [480, 310, 770, 250], [480, 310, 770, 410], [480, 310, 385, 570], [480, 310, 585, 570]].map(([a, b, c, d], i) => (
      <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#94a3b8" strokeWidth="3" />
    ))}
    <circle cx="480" cy="310" r="76" fill="#0891b2" stroke="#0e7490" strokeWidth="3" />
    <text x="480" y="302" textAnchor="middle" fontSize="17" fontWeight="800" fill="#ffffff">TISSUES IN</text>
    <text x="480" y="322" textAnchor="middle" fontSize="17" fontWeight="800" fill="#ffffff">ACTION</text>
    <g>
      <rect x={40} y={40} width={300} height={102} rx="12" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" />
      <text x={190} y={62} textAnchor="middle" fontSize="14" fontWeight="800" fill="#1d4ed8">1. Meristematic tissue</text>
      <text x={190} y={82} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Apical: length</text>
      <text x={190} y={99} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Lateral: girth</text>
      <text x={190} y={116} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Intercalary: regrowth</text>
      <text x={190} y={133} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Differentiation makes it permanent</text>
    </g>
    <g>
      <rect x={40} y={200} width={300} height={102} rx="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x={190} y={222} textAnchor="middle" fontSize="14" fontWeight="800" fill="#7c3aed">2. Simple permanent</text>
      <text x={190} y={242} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Parenchyma: storage</text>
      <text x={190} y={259} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Collenchyma: flexible support</text>
      <text x={190} y={276} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Sclerenchyma: hard support</text>
      <text x={190} y={293} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Epidermis: protection, cuticle</text>
    </g>
    <g>
      <rect x={40} y={360} width={300} height={102} rx="12" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
      <text x={190} y={382} textAnchor="middle" fontSize="14" fontWeight="800" fill="#b45309">3. Complex permanent</text>
      <text x={190} y={402} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Xylem: water up, gives strength</text>
      <text x={190} y={419} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Phloem: food, both ways</text>
      <text x={190} y={436} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Tissue systems: dermal,</text>
      <text x={190} y={453} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>ground, vascular</text>
    </g>
    <g>
      <rect x={620} y={40} width={300} height={102} rx="12" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
      <text x={770} y={62} textAnchor="middle" fontSize="14" fontWeight="800" fill="#15803d">4. Epithelial and connective</text>
      <text x={770} y={82} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Epithelial: covers, lines, thin</text>
      <text x={770} y={99} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Connective: blood, bone,</text>
      <text x={770} y={116} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>cartilage, tendon, ligament</text>
      <text x={770} y={133} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>All have a matrix around cells</text>
    </g>
    <g>
      <rect x={620} y={200} width={300} height={102} rx="12" fill="#ffe4e6" stroke="#be123c" strokeWidth="2" />
      <text x={770} y={222} textAnchor="middle" fontSize="14" fontWeight="800" fill="#be123c">5. Muscle and nerve</text>
      <text x={770} y={242} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Skeletal: voluntary, striped</text>
      <text x={770} y={259} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Smooth: involuntary, no stripes</text>
      <text x={770} y={276} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Cardiac: heart, tireless</text>
      <text x={770} y={293} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Neuron: cell body, axon, dendrites</text>
    </g>
    <g>
      <rect x={620} y={360} width={300} height={102} rx="12" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
      <text x={770} y={382} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f766e">6. Skeleton and joints</text>
      <text x={770} y={402} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Ball and socket: shoulder</text>
      <text x={770} y={419} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Hinge: elbow, knee</text>
      <text x={770} y={436} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Pivot: neck. Fixed: skull</text>
      <text x={770} y={453} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Tendon: muscle to bone</text>
    </g>
    <g>
      <rect x={330} y={520} width={300} height={80} rx="12" fill="#ffedd5" stroke="#c2410c" strokeWidth="2" />
      <text x={480} y={545} textAnchor="middle" fontSize="14" fontWeight="800" fill="#c2410c">7. Musculoskeletal system</text>
      <text x={480} y={568} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Muscles pull on bones through tendons</text>
      <text x={480} y={585} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK}>Nervous system controls it all</text>
    </g>
  </svg>
);
