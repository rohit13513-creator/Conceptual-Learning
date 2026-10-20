import React from "react";

// Own explaining diagrams for "Patterns in Life: Diversity and Classification". White card, fixed colours.

const INK = "#0f172a";
const T = { fontFamily: "sans-serif" } as const;
const GREEN = "#16a34a";
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

const Box: React.FC<{ x: number; y: number; w: number; h: number; fill: string; lines: string[]; size?: number; bold?: boolean }> = ({ x, y, w, h, fill, lines, size = 13, bold = true }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="10" fill={fill} stroke={INK} strokeWidth="2" />
    {lines.map((l, i) => (
      <text key={i} x={x + w / 2} y={y + h / 2 + (i - (lines.length - 1) / 2) * (size + 3) + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={bold && i === 0 ? 800 : 600} fill={INK}>{l}</text>
    ))}
  </g>
);

// Timeline of classification systems, oldest to newest.
export const ClassificationTimelineDiagram: React.FC = () => {
  const steps = [
    { year: "4th century BCE", who: "Aristotle", name: "Grouped by habitat", note: "Land, water, air", fill: "#e2e8f0" },
    { year: "1758", who: "Carolus Linnaeus", name: "Two kingdom", note: "Plantae, Animalia", fill: "#dcfce7" },
    { year: "1866", who: "Ernst Haeckel", name: "Three kingdom", note: "Added Protista", fill: "#dbeafe" },
    { year: "1938", who: "Herbert Copeland", name: "Four kingdom", note: "Added Monera", fill: "#fef3c7" },
    { year: "1969", who: "Robert Whittaker", name: "Five kingdom", note: "Added Fungi", fill: "#ede9fe" },
  ];
  return (
    <svg viewBox="0 0 960 250" role="img" aria-label="Timeline of classification systems from Aristotle to Whittaker" className="w-full h-auto" style={T}>
      <rect width="960" height="250" fill="#ffffff" />
      <line x1="30" y1="60" x2="930" y2="60" stroke={INK} strokeWidth="3" />
      {steps.map((s, i) => {
        const x = 20 + i * 188;
        return (
          <g key={i}>
            <circle cx={x + 80} cy={60} r="9" fill={TEAL} stroke={INK} strokeWidth="2" />
            <text x={x + 80} y={36} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>{s.year}</text>
            <Box x={x} y={90} w={160} h={100} fill={s.fill} lines={[s.name, s.note, s.who]} size={13} />
          </g>
        );
      })}
      <text x="480" y="228" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREY}>Each new system was made because better tools showed something the old system could not place</text>
    </svg>
  );
};

// How the five kingdoms are separated by simple questions.
export const FiveKingdomKeyDiagram: React.FC = () => (
  <svg viewBox="0 0 960 470" role="img" aria-label="Key to the five kingdoms using cell type, level of organisation, cell wall and mode of nutrition" className="w-full h-auto" style={T}>
    <rect width="960" height="470" fill="#ffffff" />
    <Box x={350} y={10} w={260} h={44} fill="#e2e8f0" lines={["Living organisms"]} size={15} />
    <Arrow x1={440} y1={54} x2={240} y2={96} c={GREY} w={2.5} />
    <Arrow x1={520} y1={54} x2={700} y2={96} c={GREY} w={2.5} />
    <text x="290" y="82" fontSize="12" fontWeight="700" fill={GREY}>No true nucleus</text>
    <text x="640" y="82" fontSize="12" fontWeight="700" fill={GREY}>True nucleus</text>
    <Box x={110} y={100} w={260} h={50} fill="#fee2e2" lines={["Prokaryotes", "Cell type"]} size={13} />
    <Arrow x1={240} y1={150} x2={240} y2={185} c={GREY} w={2.5} />
    <Box x={140} y={188} w={200} h={46} fill="#fecaca" lines={["MONERA", "bacteria, cyanobacteria"]} size={13} />
    <Box x={580} y={100} w={260} h={50} fill="#dbeafe" lines={["Eukaryotes", "Cell type"]} size={13} />
    <Arrow x1={650} y1={150} x2={520} y2={190} c={GREY} w={2.5} />
    <Arrow x1={770} y1={150} x2={800} y2={190} c={GREY} w={2.5} />
    <text x="500" y="176" fontSize="12" fontWeight="700" fill={GREY}>Single cell</text>
    <text x="800" y="176" fontSize="12" fontWeight="700" fill={GREY}>Many cells</text>
    <Box x={410} y={192} w={230} h={46} fill="#bfdbfe" lines={["PROTISTA", "amoeba, euglena"]} size={13} />
    <Box x={690} y={192} w={230} h={46} fill="#f1f5f9" lines={["Multicellular", "Level of organisation"]} size={13} />
    <Arrow x1={760} y1={238} x2={640} y2={290} c={GREY} w={2.5} />
    <Arrow x1={850} y1={238} x2={850} y2={290} c={GREY} w={2.5} />
    <text x="690" y="270" fontSize="12" fontWeight="700" fill={GREY}>Has a cell wall</text>
    <text x="745" y="270" fontSize="0" fill={GREY}> </text>
    <Box x={730} y={292} w={200} h={46} fill="#fef3c7" lines={["No cell wall", "Heterotrophic"]} size={13} />
    <Arrow x1={830} y1={338} x2={830} y2={372} c={GREY} w={2.5} />
    <Box x={730} y={374} w={200} h={46} fill="#fde68a" lines={["ANIMALIA", "snake, bird, human"]} size={13} />
    <Box x={460} y={292} w={200} h={46} fill="#e2e8f0" lines={["Cell wall present", "Mode of nutrition"]} size={13} />
    <Arrow x1={510} y1={338} x2={370} y2={372} c={GREY} w={2.5} />
    <Arrow x1={610} y1={338} x2={610} y2={372} c={GREY} w={2.5} />
    <text x="330" y="360" fontSize="12" fontWeight="700" fill={GREY}>chitin wall, heterotrophic</text>
    <text x="620" y="360" fontSize="12" fontWeight="700" fill={GREY}>cellulose wall, autotrophic</text>
    <Box x={250} y={374} w={200} h={46} fill="#e9d5ff" lines={["FUNGI", "mushroom, yeast"]} size={13} />
    <Box x={510} y={374} w={200} h={46} fill="#bbf7d0" lines={["PLANTAE", "fern, pine, rose"]} size={13} />
    <text x="480" y="452" textAnchor="middle" fontSize="12" fontWeight="700" fill={GREY}>Four questions are enough: cell type, number of cells, cell wall, mode of nutrition</text>
  </svg>
);

// Five plant classes, simplest to most complex.
export const PlantClassesDiagram: React.FC = () => {
  const rows = [
    { n: "Thallophyta", ex: "Spirogyra (alga)", f: "Thallus body, no roots, stem or leaves", fill: "#bbf7d0" },
    { n: "Bryophyta", ex: "Moss, Marchantia", f: "Rhizoids, no vascular tissue, needs water", fill: "#a7f3d0" },
    { n: "Pteridophyta", ex: "Fern", f: "True root, stem, leaf; xylem and phloem; no seeds", fill: "#99f6e4" },
    { n: "Gymnosperm", ex: "Pine, cycad", f: "Naked seeds on cones; needle-like leaves", fill: "#a5f3fc" },
    { n: "Angiosperm", ex: "Gulmohar, rose, pea", f: "Flowers; seeds inside fruits", fill: "#bae6fd" },
  ];
  return (
    <svg viewBox="0 0 960 360" role="img" aria-label="Five classes of the plant kingdom, from simple to complex" className="w-full h-auto" style={T}>
      <rect width="960" height="360" fill="#ffffff" />
      <text x="480" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>Kingdom Plantae: five classes, from simple to complex</text>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x={30} y={44 + i * 60} width={160 + i * 0} height={50} rx="10" fill={r.fill} stroke={INK} strokeWidth="2" />
          <text x={110} y={74 + i * 60} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>{r.n}</text>
          <text x={215} y={66 + i * 60} fontSize="13" fontWeight="800" fill={INK}>{r.ex}</text>
          <text x={215} y={85 + i * 60} fontSize="12.5" fontWeight="600" fill={GREY}>{r.f}</text>
        </g>
      ))}
      <Arrow x1={900} y1={66} x2={900} y2={330} c={GREEN} w={4} />
      <text x="880" y="200" textAnchor="end" fontSize="12.5" fontWeight="800" fill={GREEN} transform="rotate(-90 880 200)">more complex body, more independent of water</text>
    </svg>
  );
};

// Animal kingdom tree.
export const AnimalTreeDiagram: React.FC = () => (
  <svg viewBox="0 0 960 500" role="img" aria-label="Kingdom Animalia divided into non-chordata with eight phyla and chordata with protochordates and five vertebrate groups" className="w-full h-auto" style={T}>
    <rect width="960" height="500" fill="#ffffff" />
    <Box x={380} y={8} w={200} h={40} fill="#fde68a" lines={["Kingdom ANIMALIA"]} size={15} />
    <Arrow x1={430} y1={48} x2={250} y2={86} c={GREY} w={2.5} />
    <Arrow x1={530} y1={48} x2={700} y2={86} c={GREY} w={2.5} />
    <text x="270" y="72" fontSize="12" fontWeight="700" fill={GREY}>No notochord</text>
    <text x="640" y="72" fontSize="12" fontWeight="700" fill={GREY}>Notochord present</text>
    <Box x={110} y={90} w={280} h={44} fill="#fed7aa" lines={["Non-chordata", "(invertebrates)"]} size={13} />
    <Box x={560} y={90} w={280} h={44} fill="#bfdbfe" lines={["Chordata"]} size={14} />
    {["Porifera", "Cnidaria", "Platyhelminthes", "Nematoda", "Annelida", "Arthropoda", "Mollusca", "Echinodermata"].map((p, i) => (
      <g key={p}>
        <line x1={250} y1={134} x2={250} y2={150} stroke={GREY} strokeWidth="2" />
        <rect x={40 + (i % 2) * 190} y={156 + Math.floor(i / 2) * 44} width={175} height={36} rx="8" fill="#ffedd5" stroke={INK} strokeWidth="1.5" />
        <text x={40 + (i % 2) * 190 + 87} y={179 + Math.floor(i / 2) * 44} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>{p}</text>
      </g>
    ))}
    <text x="215" y="350" textAnchor="middle" fontSize="12" fontWeight="700" fill={GREY}>Eight phyla, in rising order of complexity</text>
    <Arrow x1={620} y1={134} x2={560} y2={176} c={GREY} w={2.5} />
    <Arrow x1={780} y1={134} x2={810} y2={176} c={GREY} w={2.5} />
    <Box x={440} y={180} w={200} h={48} fill="#dbeafe" lines={["Protochordata", "e.g. Amphioxus"]} size={13} />
    <Box x={700} y={180} w={200} h={48} fill="#bfdbfe" lines={["Vertebrata", "backbone present"]} size={13} />
    {["Fish", "Amphibians", "Reptiles", "Birds", "Mammals"].map((p, i) => (
      <g key={p}>
        <line x1={800} y1={228} x2={800} y2={244} stroke={GREY} strokeWidth="2" />
        <rect x={700} y={250 + i * 42} width={200} height={34} rx="8" fill="#e0f2fe" stroke={INK} strokeWidth="1.5" />
        <text x={800} y={272 + i * 42} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>{p}</text>
      </g>
    ))}
    <text x="480" y="486" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>Notochord: a flexible rod-shaped support. In vertebrates it is replaced by the backbone</text>
  </svg>
);

// Seven levels, with a tiger and a pea plant.
export const HierarchyLadderDiagram: React.FC = () => {
  const levels = ["Kingdom", "Phylum", "Class", "Order", "Family", "Genus", "Species"];
  const tiger = ["Animalia", "Chordata", "Mammalia", "Carnivora", "Felidae", "Panthera", "P. tigris"];
  const pea = ["Plantae", "Magnoliophyta", "Magnoliopsida", "Fabales", "Fabaceae", "Pisum", "P. sativum"];
  return (
    <svg viewBox="0 0 960 420" role="img" aria-label="Seven levels of classification from kingdom to species for a tiger and a pea plant" className="w-full h-auto" style={T}>
      <rect width="960" height="420" fill="#ffffff" />
      <text x="190" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Level</text>
      <text x="480" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fill="#b45309">Tiger</text>
      <text x="770" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fill={GREEN}>Pea plant</text>
      {levels.map((l, i) => {
        const w = 300 - i * 30;
        return (
          <g key={l}>
            <rect x={190 - w / 2} y={40 + i * 50} width={w} height={42} rx="8" fill={["#e2e8f0", "#dbeafe", "#dcfce7", "#fef3c7", "#ffe4e6", "#ede9fe", "#fde68a"][i]} stroke={INK} strokeWidth="2" />
            <text x={190} y={67 + i * 50} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>{l}</text>
            <text x={480} y={67 + i * 50} textAnchor="middle" fontSize="14" fontStyle="italic" fontWeight="700" fill={INK}>{tiger[i]}</text>
            <text x={770} y={67 + i * 50} textAnchor="middle" fontSize="14" fontStyle="italic" fontWeight="700" fill={INK}>{pea[i]}</text>
          </g>
        );
      })}
      <text x="190" y="408" textAnchor="middle" fontSize="12" fontWeight="700" fill={GREY}>Broadest at the top, most specific at the bottom</text>
    </svg>
  );
};

// Mind map of the whole chapter.
export const DiversityMindMap: React.FC = () => {
  const branches = [
    { x: 40, y: 40, t: "Biodiversity", l: ["Variety of life", "Endemic species", "Hotspots"], c: "#bbf7d0" },
    { x: 40, y: 190, t: "Why classify", l: ["Organised study", "Naming new species", "Conservation"], c: "#fde68a" },
    { x: 40, y: 340, t: "Systems", l: ["Aristotle", "2, 3, 4 kingdom", "Whittaker 5 kingdom"], c: "#fed7aa" },
    { x: 700, y: 40, t: "Five kingdoms", l: ["Monera", "Protista", "Fungi, Plantae, Animalia"], c: "#bfdbfe" },
    { x: 700, y: 190, t: "Plants and animals", l: ["5 plant classes", "8 invertebrate phyla", "Chordates"], c: "#e9d5ff" },
    { x: 700, y: 340, t: "Naming", l: ["Hierarchy of 7 levels", "Binomial system", "Three domains"], c: "#fecaca" },
  ];
  return (
    <svg viewBox="0 0 960 470" role="img" aria-label="Mind map of the chapter on diversity and classification" className="w-full h-auto" style={T}>
      <rect width="960" height="470" fill="#ffffff" />
      {branches.map((b, i) => (
        <g key={i}>
          <line x1={b.x < 400 ? b.x + 220 : b.x} y1={b.y + 55} x2={480} y2={235} stroke={GREY} strokeWidth="2.5" />
        </g>
      ))}
      <ellipse cx="480" cy="235" rx="120" ry="52" fill="#99f6e4" stroke={INK} strokeWidth="3" />
      <text x="480" y="230" textAnchor="middle" fontSize="16" fontWeight="800" fill={INK}>Diversity and</text>
      <text x="480" y="250" textAnchor="middle" fontSize="16" fontWeight="800" fill={INK}>Classification</text>
      {branches.map((b, i) => (
        <g key={"b" + i}>
          <rect x={b.x} y={b.y} width={220} height={112} rx="12" fill={b.c} stroke={INK} strokeWidth="2" />
          <text x={b.x + 110} y={b.y + 26} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>{b.t}</text>
          {b.l.map((s, j) => (
            <text key={j} x={b.x + 110} y={b.y + 52 + j * 20} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK}>{s}</text>
          ))}
        </g>
      ))}
    </svg>
  );
};
