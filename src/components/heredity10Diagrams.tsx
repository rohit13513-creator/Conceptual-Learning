import React from "react";

// Two simple explanatory diagrams for the Class 10 "Heredity" notes. They are drawn on a white
// card with explicit colours so they read the same in light and dark mode.

const INK = "#0f172a";
const font = { fontFamily: "sans-serif" } as const;

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number }> = ({ x1, y1, x2, y2 }) => (
  <g stroke={INK} strokeWidth="2" fill={INK}>
    <line x1={x1} y1={y1} x2={x2 - 6} y2={y2} />
    <polygon points={`${x2},${y2} ${x2 - 9},${y2 - 5} ${x2 - 9},${y2 + 5}`} />
  </g>
);

export const GeneToTraitDiagram: React.FC = () => (
  <svg viewBox="0 0 720 250" role="img" aria-label="Gene to trait: DNA contains a gene, the gene makes an enzyme, the enzyme helps make a plant growth hormone, and the amount of hormone decides whether the plant is tall or short" className="w-full h-auto" style={font}>
    {[
      { x: 8, t1: "DNA in the", t2: "nucleus", c: "#dbeafe" },
      { x: 152, t1: "Gene", t2: "(section of DNA)", c: "#dcfce7" },
      { x: 296, t1: "Protein", t2: "(an enzyme)", c: "#fef9c3" },
      { x: 440, t1: "Plant growth", t2: "hormone made", c: "#fce7f3" },
      { x: 584, t1: "Trait:", t2: "plant height", c: "#e9d5ff" },
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y="20" width="128" height="62" rx="10" fill={b.c} stroke={INK} strokeWidth="1.5" />
        <text x={b.x + 64} y="47" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>{b.t1}</text>
        <text x={b.x + 64} y="66" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK}>{b.t2}</text>
        {i < 4 && <Arrow x1={b.x + 130} y1={51} x2={b.x + 144} y2={51} />}
      </g>
    ))}
    <rect x="8" y="112" width="340" height="112" rx="12" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
    <text x="178" y="136" textAnchor="middle" fontSize="13" fontWeight="800" fill="#166534">Gene works normally</text>
    <text x="178" y="160" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK}>Efficient enzyme</text>
    <text x="178" y="180" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK}>→ a lot of hormone</text>
    <text x="178" y="203" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#166534">→ TALL plant</text>
    <rect x="372" y="112" width="340" height="112" rx="12" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
    <text x="542" y="136" textAnchor="middle" fontSize="13" fontWeight="800" fill="#991b1b">Gene altered (less efficient enzyme)</text>
    <text x="542" y="160" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK}>Less efficient enzyme</text>
    <text x="542" y="180" textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK}>→ less hormone</text>
    <text x="542" y="203" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#991b1b">→ SHORT plant</text>
    <text x="360" y="243" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">Genes control traits by controlling proteins.</text>
  </svg>
);

const Chrom: React.FC<{ x: number; y: number; c: string }> = ({ x, y, c }) => (
  <rect x={x} y={y} width="13" height="46" rx="6.5" fill={c} stroke={INK} strokeWidth="1" />
);

export const ChromosomePairsDiagram: React.FC = () => {
  const M = "#ec4899";
  const P = "#2563eb";
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="Body cells have two copies of each chromosome, one from each parent. Germ cells take one chromosome from each pair. Fertilisation restores the pairs in the zygote" className="w-full h-auto" style={font}>
      <text x="115" y="20" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Body cell</text>
      <text x="115" y="36" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#475569">two copies of each chromosome</text>
      <ellipse cx="115" cy="115" rx="92" ry="62" fill="#f8fafc" stroke={INK} strokeWidth="1.5" />
      <Chrom x={64} y={92} c={M} /><Chrom x={82} y={92} c={P} />
      <Chrom x={124} y={92} c={M} /><Chrom x={142} y={92} c={P} />
      <text x="82" y="158" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK}>pair 1</text>
      <text x="142" y="158" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK}>pair 2</text>

      <Arrow x1={212} y1={115} x2={262} y2={115} />
      <text x="237" y="103" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>germ-cell</text>
      <text x="237" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>formation</text>

      <text x="365" y="20" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Germ-cells (gametes)</text>
      <text x="365" y="36" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#475569">one chromosome from each pair</text>
      <circle cx="322" cy="88" r="32" fill="#f8fafc" stroke={INK} strokeWidth="1.5" />
      <Chrom x={306} y={65} c={M} /><Chrom x={330} y={65} c={M} />
      <circle cx="408" cy="88" r="32" fill="#f8fafc" stroke={INK} strokeWidth="1.5" />
      <Chrom x={392} y={65} c={P} /><Chrom x={416} y={65} c={P} />
      <circle cx="322" cy="168" r="32" fill="#f8fafc" stroke={INK} strokeWidth="1.5" />
      <Chrom x={306} y={145} c={M} /><Chrom x={330} y={145} c={P} />
      <circle cx="408" cy="168" r="32" fill="#f8fafc" stroke={INK} strokeWidth="1.5" />
      <Chrom x={392} y={145} c={P} /><Chrom x={416} y={145} c={M} />
      <text x="365" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">(any one of these combinations can occur)</text>

      <Arrow x1={452} y1={128} x2={510} y2={128} />
      <text x="481" y="116" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>fertilisation</text>
      <text x="481" y="152" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#475569">(sperm + egg)</text>

      <text x="620" y="20" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Zygote</text>
      <text x="620" y="36" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#475569">pairs restored</text>
      <ellipse cx="620" cy="115" rx="80" ry="58" fill="#f8fafc" stroke={INK} strokeWidth="1.5" />
      <Chrom x={578} y={92} c={M} /><Chrom x={596} y={92} c={P} />
      <Chrom x={638} y={92} c={M} /><Chrom x={656} y={92} c={P} />

      <rect x="146" y="252" width="14" height="14" rx="3" fill={M} stroke={INK} />
      <text x="166" y="264" fontSize="12" fontWeight="700" fill={INK}>chromosome from the mother</text>
      <rect x="392" y="252" width="14" height="14" rx="3" fill={P} stroke={INK} />
      <text x="412" y="264" fontSize="12" fontWeight="700" fill={INK}>chromosome from the father</text>
    </svg>
  );
};
