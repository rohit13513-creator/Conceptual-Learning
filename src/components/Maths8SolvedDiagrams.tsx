// CBSE-pattern figures for the Class 8 Maths (Quadrilaterals) Solved Questions section.
// Each solved question in src/data/maths8.ts gets a matching labelled diagram here,
// drawn in the same visual language as LearnMaths8.tsx (thin outline, cyan/amber dashed
// diagonals, red intersection point).
import React from "react";

interface DiagramProps {
  isLightMode?: boolean;
}

const dot = (x: number, y: number, color: string) => <circle cx={x} cy={y} r="4" fill={color} />;
const label = (x: number, y: number, text: string, color: string, dx = 0, dy = -9, size = 14) => (
  <text x={x + dx} y={y + dy} textAnchor="middle" fontSize={size} fontWeight="800" fill={color}>{text}</text>
);

const Frame: React.FC<{ children: React.ReactNode; caption: string; isLightMode?: boolean }> = ({ children, caption, isLightMode = false }) => (
  <div className={`rounded-2xl border p-4 shadow-md space-y-2 ${isLightMode ? "bg-white border-slate-200" : "bg-[#0b1420] border-slate-800"}`}>
    {children}
    <p className={`text-center text-[12.5px] font-bold ${isLightMode ? "text-slate-500" : "text-slate-500"}`}>{caption}</p>
  </div>
);

export const Maths8SolvedDiagram: React.FC<{ questionId: number; isLightMode?: boolean }> = ({ questionId, isLightMode = false }) => {
  const main = isLightMode ? "#334155" : "#cbd5e1";
  const vLabel = isLightMode ? "#0f172a" : "#f1f5f9";
  const dash = isLightMode ? "#94a3b8" : "#64748b";
  const cyan = "#22d3ee";
  const amber = "#fbbf24";
  const red = "#f87171";
  const green = "#a3e635";

  switch (questionId) {
    case 1: // Rectangle ABCD, diagonals meet at O, angle OAB = 35 deg
      return (
        <Frame caption="Rectangle ABCD with diagonals AC, BD meeting at O" isLightMode={isLightMode}>
          <svg viewBox="0 0 380 220" className="w-full h-auto">
            <polygon points="60,180 320,180 320,50 60,50" fill="none" stroke={main} strokeWidth="2.5" />
            <line x1="60" y1="180" x2="320" y2="50" stroke={cyan} strokeWidth="2" strokeDasharray="6 4" />
            <line x1="60" y1="50" x2="320" y2="180" stroke={amber} strokeWidth="2" strokeDasharray="6 4" />
            {dot(60, 180, main)}{label(60, 180, "A", vLabel, -12, 16)}
            {dot(320, 180, main)}{label(320, 180, "B", vLabel, 12, 16)}
            {dot(320, 50, main)}{label(320, 50, "C", vLabel, 12, -10)}
            {dot(60, 50, main)}{label(60, 50, "D", vLabel, -12, -10)}
            {dot(190, 115, red)}{label(190, 115, "O", red, 16, 5)}
            <path d="M 90 180 A 30 30 0 0 1 76 160" fill="none" stroke={green} strokeWidth="2" />
            {label(95, 158, "35°", green, 0, 0, 12)}
          </svg>
        </Frame>
      );
    case 2: // Two strips 8cm crossed at 40 deg and 90 deg, bisecting each other
      return (
        <Frame caption="Two 8 cm strips, bisecting each other -- Case 1 at 40 degrees, Case 2 at 90 degrees" isLightMode={isLightMode}>
          <svg viewBox="0 0 380 190" className="w-full h-auto">
            <line x1="60" y1="150" x2="150" y2="30" stroke={cyan} strokeWidth="2.5" />
            <line x1="55" y1="55" x2="155" y2="125" stroke={amber} strokeWidth="2.5" />
            {dot(105, 90, red)}
            {label(75, 155, "40°", green, 0, 0, 12)}
            {label(105, 175, "Case 1", vLabel, 0, 0, 12)}

            <line x1="240" y1="150" x2="240" y2="30" stroke={cyan} strokeWidth="2.5" />
            <line x1="180" y1="90" x2="300" y2="90" stroke={amber} strokeWidth="2.5" />
            {dot(240, 90, red)}
            <path d="M 255 90 A 15 15 0 0 1 240 75" fill="none" stroke={green} strokeWidth="2" />
            {label(258, 78, "90°", green, 0, 0, 12)}
            {label(240, 175, "Case 2", vLabel, 0, 0, 12)}
          </svg>
        </Frame>
      );
    case 3: // Circle, perpendicular diameters PL, AM -> quadrilateral APML
      return (
        <Frame caption="Perpendicular diameters PL and AM of a circle, forming quadrilateral APML" isLightMode={isLightMode}>
          <svg viewBox="0 0 300 220" className="w-full h-auto">
            <circle cx="150" cy="110" r="80" fill="none" stroke={dash} strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="150" y1="30" x2="150" y2="190" stroke={cyan} strokeWidth="2" />
            <line x1="70" y1="110" x2="230" y2="110" stroke={amber} strokeWidth="2" />
            <polygon points="150,30 230,110 150,190 70,110" fill="none" stroke={main} strokeWidth="2.5" />
            {dot(150, 30, main)}{label(150, 30, "P", vLabel, 0, -10)}
            {dot(230, 110, main)}{label(230, 110, "A", vLabel, 16, 4)}
            {dot(150, 190, main)}{label(150, 190, "L", vLabel, 0, 22)}
            {dot(70, 110, main)}{label(70, 110, "M", vLabel, -16, 4)}
            {dot(150, 110, red)}{label(150, 110, "O", red, 16, -6)}
          </svg>
        </Frame>
      );
    case 4: // Two equal sticks + thread -> 90 degree construction
      return (
        <Frame caption="Two equal sticks crossed and bisected, tied at the four ends with thread" isLightMode={isLightMode}>
          <svg viewBox="0 0 300 200" className="w-full h-auto">
            <line x1="70" y1="160" x2="230" y2="40" stroke={cyan} strokeWidth="3" />
            <line x1="70" y1="55" x2="230" y2="145" stroke={amber} strokeWidth="3" />
            {dot(150, 100, red)}{label(150, 100, "midpoint", red, 0, -14, 11)}
            <polygon points="70,160 230,145 230,40 70,55" fill="none" stroke={dash} strokeWidth="1.5" strokeDasharray="4 3" />
            {label(150, 185, "Equal strips + thread joining the 4 endpoints", vLabel, 0, 0, 11)}
          </svg>
        </Frame>
      );
    case 5: // Opposite sides parallel and equal -- test the claim
      return (
        <Frame caption="Quadrilateral ABCD with AB parallel and equal to CD" isLightMode={isLightMode}>
          <svg viewBox="0 0 380 200" className="w-full h-auto">
            <polygon points="60,160 250,160 320,40 130,40" fill="none" stroke={main} strokeWidth="2.5" />
            {dot(60, 160, main)}{label(60, 160, "A", vLabel, -12, 16)}
            {dot(250, 160, main)}{label(250, 160, "B", vLabel, 12, 16)}
            {dot(320, 40, main)}{label(320, 40, "C", vLabel, 14, -10)}
            {dot(130, 40, main)}{label(130, 40, "D", vLabel, -12, -10)}
            <line x1="80" y1="150" x2="230" y2="150" stroke={cyan} strokeWidth="2" strokeDasharray="5 3" />
            <line x1="150" y1="50" x2="300" y2="50" stroke={cyan} strokeWidth="2" strokeDasharray="5 3" />
            {label(155, 145, "AB", cyan, 0, 0, 11)}
            {label(225, 55, "DC", cyan, 0, 0, 11)}
          </svg>
        </Frame>
      );
    case 6: // Quadrilateral PQRS, angle P=95, Q=80, R=105, find S
      return (
        <Frame caption="Quadrilateral PQRS with three known angles" isLightMode={isLightMode}>
          <svg viewBox="0 0 320 220" className="w-full h-auto">
            <polygon points="70,180 280,160 250,40 100,60" fill="none" stroke={main} strokeWidth="2.5" />
            {dot(70, 180, main)}{label(70, 180, "P", vLabel, -14, 14)}
            {dot(280, 160, main)}{label(280, 160, "Q", vLabel, 16, 12)}
            {dot(250, 40, main)}{label(250, 40, "R", vLabel, 14, -10)}
            {dot(100, 60, main)}{label(100, 60, "S", vLabel, -14, -10)}
            {label(95, 165, "95°", green, 0, 0, 12)}
            {label(255, 150, "80°", green, 0, 0, 12)}
            {label(230, 55, "105°", green, 0, 0, 12)}
            {label(120, 75, "?", red, 0, 0, 14)}
          </svg>
        </Frame>
      );
    case 7: // Parallelogram ABCD, AC=6, BD=8, angle 100
      return (
        <Frame caption="Parallelogram ABCD, diagonals AC = 6 cm, BD = 8 cm meeting at 100 degrees" isLightMode={isLightMode}>
          <svg viewBox="0 0 380 220" className="w-full h-auto">
            <polygon points="70,180 260,180 310,40 120,40" fill="none" stroke={main} strokeWidth="2.5" />
            <line x1="70" y1="180" x2="310" y2="40" stroke={cyan} strokeWidth="2" strokeDasharray="6 4" />
            <line x1="120" y1="40" x2="260" y2="180" stroke={amber} strokeWidth="2" strokeDasharray="6 4" />
            {dot(70, 180, main)}{label(70, 180, "A", vLabel, -12, 16)}
            {dot(260, 180, main)}{label(260, 180, "B", vLabel, 12, 16)}
            {dot(310, 40, main)}{label(310, 40, "C", vLabel, 12, -10)}
            {dot(120, 40, main)}{label(120, 40, "D", vLabel, -12, -10)}
            {dot(190, 110, red)}{label(190, 110, "O", red, 18, 4)}
            {label(190, 90, "100°", green, 0, 0, 12)}
          </svg>
        </Frame>
      );
    case 8: // Rhombus ABCD, AC=5, BD=8
      return (
        <Frame caption="Rhombus ABCD, diagonals AC = 5 cm, BD = 8 cm" isLightMode={isLightMode}>
          <svg viewBox="0 0 300 220" className="w-full h-auto">
            <polygon points="150,15 260,110 150,205 40,110" fill="none" stroke={main} strokeWidth="2.5" />
            <line x1="150" y1="15" x2="150" y2="205" stroke={cyan} strokeWidth="2" strokeDasharray="6 4" />
            <line x1="40" y1="110" x2="260" y2="110" stroke={amber} strokeWidth="2" strokeDasharray="6 4" />
            {dot(150, 15, main)}{label(150, 15, "A", vLabel, 0, -10)}
            {dot(260, 110, main)}{label(260, 110, "B", vLabel, 16, 5)}
            {dot(150, 205, main)}{label(150, 205, "C", vLabel, 0, 22)}
            {dot(40, 110, main)}{label(40, 110, "D", vLabel, -16, 5)}
            {dot(150, 110, red)}{label(150, 110, "O", red, 18, -6)}
          </svg>
        </Frame>
      );
    case 9: // Two equilateral triangles joined along a side -> rhombus
      return (
        <Frame caption="Two equilateral triangles of side 5 cm joined along a common side" isLightMode={isLightMode}>
          <svg viewBox="0 0 300 220" className="w-full h-auto">
            <polygon points="150,20 240,110 150,200 60,110" fill="none" stroke={main} strokeWidth="2.5" />
            <line x1="60" y1="110" x2="240" y2="110" stroke={dash} strokeWidth="1.5" strokeDasharray="4 3" />
            {dot(150, 20, main)}{label(150, 20, "A", vLabel, 0, -10)}
            {dot(240, 110, main)}{label(240, 110, "B", vLabel, 16, 5)}
            {dot(150, 200, main)}{label(150, 200, "C", vLabel, 0, 22)}
            {dot(60, 110, main)}{label(60, 110, "D", vLabel, -16, 5)}
            {label(150, 75, "60°", green, 0, 0, 12)}
            {label(150, 148, "60°", green, 0, 0, 12)}
          </svg>
        </Frame>
      );
    case 10: // Kite, diagonals 6 (bisected) and 9 (bisecting)
      return (
        <Frame caption="Kite ABCD -- diagonal BD (9 cm) bisects diagonal AC (6 cm) perpendicularly" isLightMode={isLightMode}>
          <svg viewBox="0 0 300 220" className="w-full h-auto">
            <polygon points="150,10 220,95 150,205 80,95" fill="none" stroke={main} strokeWidth="2.5" />
            <line x1="150" y1="10" x2="150" y2="205" stroke={amber} strokeWidth="2" strokeDasharray="6 4" />
            <line x1="80" y1="95" x2="220" y2="95" stroke={cyan} strokeWidth="2" strokeDasharray="6 4" />
            {dot(150, 10, main)}{label(150, 10, "B", vLabel, 0, -8)}
            {dot(220, 95, main)}{label(220, 95, "C", vLabel, 18, 4)}
            {dot(150, 205, main)}{label(150, 205, "D", vLabel, 0, 22)}
            {dot(80, 95, main)}{label(80, 95, "A", vLabel, -18, 4)}
            {dot(150, 95, red)}{label(150, 95, "O", red, 18, -6)}
          </svg>
        </Frame>
      );
    case 11: // Isosceles trapezium PQRS, PQ || SR, angle S = 100
      return (
        <Frame caption="Isosceles trapezium PQRS, PQ parallel to SR, angle S = 100 degrees" isLightMode={isLightMode}>
          <svg viewBox="0 0 380 200" className="w-full h-auto">
            <polygon points="60,170 320,170 250,30 130,30" fill="none" stroke={main} strokeWidth="2.5" />
            {dot(60, 170, main)}{label(60, 170, "P", vLabel, -12, 16)}
            {dot(320, 170, main)}{label(320, 170, "Q", vLabel, 12, 16)}
            {dot(250, 30, main)}{label(250, 30, "R", vLabel, 12, -10)}
            {dot(130, 30, main)}{label(130, 30, "S", vLabel, -12, -10)}
            {label(155, 45, "100°", green, 0, 0, 12)}
          </svg>
        </Frame>
      );
    case 12: // Kite vs rhombus
      return (
        <Frame caption="A general kite (AB=BC, CD=DA but the two pairs differ) is not a rhombus" isLightMode={isLightMode}>
          <svg viewBox="0 0 300 220" className="w-full h-auto">
            <polygon points="150,15 260,95 150,205 100,95" fill="none" stroke={main} strokeWidth="2.5" />
            {dot(150, 15, main)}{label(150, 15, "B", vLabel, 0, -8)}
            {dot(260, 95, main)}{label(260, 95, "C", vLabel, 18, 4)}
            {dot(150, 205, main)}{label(150, 205, "D", vLabel, 0, 22)}
            {dot(100, 95, main)}{label(100, 95, "A", vLabel, -18, 4)}
            {label(195, 45, "long side", cyan, 0, 0, 10)}
            {label(115, 155, "short side", amber, 0, 0, 10)}
          </svg>
        </Frame>
      );
    case 13: // Rectangle PQRS, diagonals meet at O, angle POQ=100
      return (
        <Frame caption="Rectangle PQRS with diagonals meeting at O" isLightMode={isLightMode}>
          <svg viewBox="0 0 380 220" className="w-full h-auto">
            <polygon points="60,180 320,180 320,50 60,50" fill="none" stroke={main} strokeWidth="2.5" />
            <line x1="60" y1="180" x2="320" y2="50" stroke={cyan} strokeWidth="2" strokeDasharray="6 4" />
            <line x1="60" y1="50" x2="320" y2="180" stroke={amber} strokeWidth="2" strokeDasharray="6 4" />
            {dot(60, 180, main)}{label(60, 180, "P", vLabel, -12, 16)}
            {dot(320, 180, main)}{label(320, 180, "Q", vLabel, 12, 16)}
            {dot(320, 50, main)}{label(320, 50, "R", vLabel, 12, -10)}
            {dot(60, 50, main)}{label(60, 50, "S", vLabel, -12, -10)}
            {dot(190, 115, red)}{label(190, 115, "O", red, 16, 5)}
            {label(190, 92, "100°", green, 0, 0, 12)}
          </svg>
        </Frame>
      );
    case 14: // Square, diagonal 7cm
      return (
        <Frame caption="Square with diagonal 7 cm" isLightMode={isLightMode}>
          <svg viewBox="0 0 300 220" className="w-full h-auto">
            <polygon points="70,180 230,180 230,20 70,20" fill="none" stroke={main} strokeWidth="2.5" />
            <line x1="70" y1="180" x2="230" y2="20" stroke={cyan} strokeWidth="2" strokeDasharray="6 4" />
            {dot(70, 180, main)}{label(70, 180, "A", vLabel, -12, 16)}
            {dot(230, 180, main)}{label(230, 180, "B", vLabel, 12, 16)}
            {dot(230, 20, main)}{label(230, 20, "C", vLabel, 12, -10)}
            {dot(70, 20, main)}{label(70, 20, "D", vLabel, -12, -10)}
            {label(160, 90, "7 cm", cyan, 0, 0, 12)}
          </svg>
        </Frame>
      );
    case 15: // Square WXYZ side a, midpoints U,V,W2,X2 form inner square
      return (
        <Frame caption="Square WXYZ with midpoints U, V, W2, X2 joined to form an inner square" isLightMode={isLightMode}>
          <svg viewBox="0 0 300 220" className="w-full h-auto">
            <polygon points="60,180 240,180 240,20 60,20" fill="none" stroke={main} strokeWidth="2.5" />
            <polygon points="150,20 240,100 150,180 60,100" fill="none" stroke={cyan} strokeWidth="2" strokeDasharray="6 4" />
            {dot(60, 180, main)}{label(60, 180, "W", vLabel, -12, 16)}
            {dot(240, 180, main)}{label(240, 180, "X", vLabel, 12, 16)}
            {dot(240, 20, main)}{label(240, 20, "Y", vLabel, 12, -10)}
            {dot(60, 20, main)}{label(60, 20, "Z", vLabel, -12, -10)}
            {dot(150, 20, amber)}{label(150, 20, "U", amber, 0, -10)}
            {dot(240, 100, amber)}{label(240, 100, "V", amber, 16, 4)}
            {dot(150, 180, amber)}{label(150, 180, "W2", amber, 0, 20)}
            {dot(60, 100, amber)}{label(60, 100, "X2", amber, -18, 4)}
          </svg>
        </Frame>
      );
    case 16: // All sides equal + one right angle
      return (
        <Frame caption="A quadrilateral with all four sides equal and one 90 degree angle" isLightMode={isLightMode}>
          <svg viewBox="0 0 300 220" className="w-full h-auto">
            <polygon points="70,180 230,180 230,20 70,20" fill="none" stroke={main} strokeWidth="2.5" />
            {dot(70, 180, main)}{label(70, 180, "A", vLabel, -12, 16)}
            {dot(230, 180, main)}{label(230, 180, "B", vLabel, 12, 16)}
            {dot(230, 20, main)}{label(230, 20, "C", vLabel, 12, -10)}
            {dot(70, 20, main)}{label(70, 20, "D", vLabel, -12, -10)}
            <path d="M 82 180 L 82 168 L 70 168" fill="none" stroke={green} strokeWidth="2" />
            {label(105, 165, "90°", green, 0, 0, 12)}
            {label(150, 195, "all sides equal", amber, 0, 0, 11)}
          </svg>
        </Frame>
      );
    case 17: // ABCD, AB=CD, BC=AD -- diagonal BD for SSS congruence
      return (
        <Frame caption="Quadrilateral ABCD with AB = CD and BC = AD, diagonal BD drawn" isLightMode={isLightMode}>
          <svg viewBox="0 0 380 200" className="w-full h-auto">
            <polygon points="60,160 250,160 320,40 130,40" fill="none" stroke={main} strokeWidth="2.5" />
            <line x1="60" y1="160" x2="320" y2="40" stroke={cyan} strokeWidth="2" strokeDasharray="6 4" />
            {dot(60, 160, main)}{label(60, 160, "A", vLabel, -12, 16)}
            {dot(250, 160, main)}{label(250, 160, "B", vLabel, 12, 16)}
            {dot(320, 40, main)}{label(320, 40, "C", vLabel, 14, -10)}
            {dot(130, 40, main)}{label(130, 40, "D", vLabel, -12, -10)}
            {label(190, 100, "diagonal BD", cyan, 0, 0, 11)}
          </svg>
        </Frame>
      );
    case 18: // Non-convex dart quadrilateral
      return (
        <Frame caption="Non-convex 'dart' quadrilateral -- vertex O caves inward (reflex angle)" isLightMode={isLightMode}>
          <svg viewBox="0 0 300 220" className="w-full h-auto">
            <polygon points="150,20 250,120 150,110 50,120" fill="none" stroke={main} strokeWidth="2.5" />
            <line x1="150" y1="20" x2="150" y2="110" stroke={dash} strokeWidth="1.5" strokeDasharray="4 3" />
            {dot(150, 20, main)}{label(150, 20, "A", vLabel, 0, -10)}
            {dot(250, 120, main)}{label(250, 120, "B", vLabel, 16, 6)}
            {dot(150, 110, red)}{label(150, 110, "O (reflex)", red, 0, 24, 11)}
            {dot(50, 120, main)}{label(50, 120, "D", vLabel, -16, 6)}
          </svg>
        </Frame>
      );
    case 19: // True/False consolidated -- generic reference quadrilateral
      return (
        <Frame caption="Reference figure: a general quadrilateral ABCD with both diagonals drawn" isLightMode={isLightMode}>
          <svg viewBox="0 0 380 200" className="w-full h-auto">
            <polygon points="70,160 280,170 300,40 120,30" fill="none" stroke={main} strokeWidth="2.5" />
            <line x1="70" y1="160" x2="300" y2="40" stroke={cyan} strokeWidth="2" strokeDasharray="6 4" />
            <line x1="120" y1="30" x2="280" y2="170" stroke={amber} strokeWidth="2" strokeDasharray="6 4" />
            {dot(70, 160, main)}{label(70, 160, "A", vLabel, -12, 16)}
            {dot(280, 170, main)}{label(280, 170, "B", vLabel, 12, 16)}
            {dot(300, 40, main)}{label(300, 40, "C", vLabel, 14, -10)}
            {dot(120, 30, main)}{label(120, 30, "D", vLabel, -12, -10)}
          </svg>
        </Frame>
      );
    default:
      return null;
  }
};

export default Maths8SolvedDiagram;
