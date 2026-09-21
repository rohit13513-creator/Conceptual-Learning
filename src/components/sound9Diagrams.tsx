import React from "react";

// Simple explaining diagrams for the Sound notes. White card, fixed colours.

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

const DArrow: React.FC<{ x1: number; x2: number; y: number; c?: string }> = ({ x1, x2, y, c = INK }) => (
  <g stroke={c} fill={c} strokeWidth="2">
    <line x1={x1 + 8} y1={y} x2={x2 - 8} y2={y} />
    <polygon points={`${x1},${y} ${x1 + 10},${y - 5} ${x1 + 10},${y + 5}`} stroke="none" />
    <polygon points={`${x2},${y} ${x2 - 10},${y - 5} ${x2 - 10},${y + 5}`} stroke="none" />
  </g>
);

// A sine wave path from x0 to x1, centre line y0, amplitude a, wavelength lam, starting phase 0 (goes up first)
const sine = (x0: number, x1: number, y0: number, a: number, lam: number) => {
  let d = "";
  for (let x = x0; x <= x1; x += 2) {
    const y = y0 - a * Math.sin(((x - x0) / lam) * 2 * Math.PI);
    d += (x === x0 ? "M" : "L") + x + " " + y.toFixed(1) + " ";
  }
  return d;
};

export const SoundChainDiagram: React.FC = () => (
  <svg viewBox="0 0 760 240" role="img" aria-label="Sound travels from a vibrating source through a medium to the ear" className="w-full h-auto" style={T}>
    <rect width="760" height="240" fill="#ffffff" />
    {/* source */}
    <rect x="30" y="80" width="130" height="80" rx="10" fill="#fef3c7" stroke={INK} strokeWidth="2" />
    <text x="95" y="112" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>1. Source</text>
    <text x="95" y="132" textAnchor="middle" fontSize="12" fontWeight="600" fill={GREY}>vibrates</text>
    <text x="95" y="148" textAnchor="middle" fontSize="12" fontWeight="600" fill={GREY}>(string, fork, cords)</text>
    <Arrow x1={166} y1={120} x2={228} y2={120} c={BLUE} w={4} />
    {/* medium */}
    <rect x="234" y="80" width="290" height="80" rx="10" fill="#dbeafe" stroke={INK} strokeWidth="2" />
    <text x="379" y="104" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>2. Medium</text>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
      <circle key={i} cx={252 + i * 23 + (i % 4 === 1 ? 6 : 0)} cy={132 + (i % 2 ? 6 : -4)} r="5" fill={BLUE} />
    ))}
    <text x="379" y="152" textAnchor="middle" fontSize="11.5" fontWeight="600" fill={GREY}>particles pass the push along (solid, liquid or gas)</text>
    <Arrow x1={530} y1={120} x2={592} y2={120} c={BLUE} w={4} />
    {/* ear */}
    <rect x="598" y="80" width="130" height="80" rx="10" fill="#dcfce7" stroke={INK} strokeWidth="2" />
    <text x="663" y="112" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>3. Ear</text>
    <text x="663" y="132" textAnchor="middle" fontSize="12" fontWeight="600" fill={GREY}>eardrum vibrates</text>
    <text x="663" y="148" textAnchor="middle" fontSize="12" fontWeight="600" fill={GREY}>brain hears sound</text>
    <text x="380" y="40" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>How sound reaches us</text>
    <text x="380" y="210" textAnchor="middle" fontSize="13" fontWeight="700" fill={RED}>No medium (vacuum) means no sound</text>
  </svg>
);

export const WaveTermsDiagram: React.FC = () => (
  <svg viewBox="0 0 760 320" role="img" aria-label="A sound wave graph showing crest, trough, wavelength and amplitude" className="w-full h-auto" style={T}>
    <rect width="760" height="320" fill="#ffffff" />
    <line x1="60" y1="20" x2="60" y2="290" stroke={INK} strokeWidth="2" /><line x1="60" y1="290" x2="730" y2="290" stroke={INK} strokeWidth="2" />
    <text x="24" y="160" fontSize="13" fontWeight="700" fill={INK} transform="rotate(-90 24 160)" textAnchor="middle">Density</text>
    <text x="700" y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Distance</text>
    <line x1="60" y1="160" x2="720" y2="160" stroke={GREY} strokeWidth="2" strokeDasharray="7 5" />
    <text x="66" y="178" fontSize="12" fontWeight="700" fill={GREY}>Average density</text>
    <path d={sine(60, 700, 160, 80, 300)} stroke={BLUE} strokeWidth="4" fill="none" />
    {/* crests at x = 60+75=135, 435 ; troughs at 285, 585 */}
    <circle cx="135" cy="80" r="5" fill={RED} /><text x="135" y="66" textAnchor="middle" fontSize="13" fontWeight="800" fill={RED}>Crest (compression)</text>
    <circle cx="285" cy="240" r="5" fill={GREEN} /><text x="285" y="262" textAnchor="middle" fontSize="13" fontWeight="800" fill={GREEN}>Trough (rarefaction)</text>
    <circle cx="435" cy="80" r="5" fill={RED} />
    <circle cx="585" cy="240" r="5" fill={GREEN} />
    <DArrow x1={135} x2={435} y={40} c={TEAL} />
    <text x="285" y="32" textAnchor="middle" fontSize="13" fontWeight="800" fill={TEAL}>Wavelength λ (crest to crest)</text>
    <line x1="500" y1="160" x2="500" y2="84" stroke={INK} strokeWidth="2" />
    <polygon points="500,80 494,92 506,92" fill={INK} />
    <text x="510" y="126" fontSize="13" fontWeight="800" fill={INK}>Amplitude</text>
    <text x="380" y="192" textAnchor="middle" fontSize="12" fontWeight="700" fill={GREY}> </text>
  </svg>
);

export const VfLambdaDiagram: React.FC = () => (
  <svg viewBox="0 0 720 240" role="img" aria-label="Speed equals frequency times wavelength" className="w-full h-auto" style={T}>
    <rect width="720" height="240" fill="#ffffff" />
    <polygon points="140,20 60,200 220,200" fill="#e0f2fe" stroke={INK} strokeWidth="2" />
    <line x1="88" y1="125" x2="192" y2="125" stroke={INK} strokeWidth="2" />
    <line x1="140" y1="125" x2="140" y2="200" stroke={INK} strokeWidth="2" />
    <text x="140" y="100" textAnchor="middle" fontSize="34" fontWeight="800" fill={BLUE}>v</text>
    <text x="100" y="172" textAnchor="middle" fontSize="34" fontWeight="800" fill={RED}>f</text>
    <text x="182" y="172" textAnchor="middle" fontSize="34" fontWeight="800" fill={GREEN}>λ</text>
    <text x="270" y="56" fontSize="15" fontWeight="800" fill={INK}>Cover the one you want:</text>
    <text x="270" y="92" fontSize="16" fontWeight="700" fill={BLUE}>cover v: v = f × λ</text>
    <text x="270" y="124" fontSize="16" fontWeight="700" fill={RED}>cover f: f = v / λ</text>
    <text x="270" y="156" fontSize="16" fontWeight="700" fill={GREEN}>cover λ: λ = v / f</text>
    <text x="270" y="196" fontSize="13" fontWeight="600" fill={GREY}>v in m/s, f in hertz (Hz), λ in metre</text>
    <text x="270" y="218" fontSize="13" fontWeight="600" fill={GREY}>Also T = 1 / f (time period in seconds)</text>
  </svg>
);

export const PitchLoudnessDiagram: React.FC = () => (
  <svg viewBox="0 0 760 300" role="img" aria-label="Pitch depends on frequency; loudness depends on amplitude" className="w-full h-auto" style={T}>
    <rect width="760" height="300" fill="#ffffff" />
    <text x="190" y="24" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Pitch: depends on frequency</text>
    <text x="570" y="24" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Loudness: depends on amplitude</text>
    <line x1="30" y1="90" x2="350" y2="90" stroke={GREY} strokeDasharray="5 4" /><line x1="30" y1="210" x2="350" y2="210" stroke={GREY} strokeDasharray="5 4" />
    <path d={sine(30, 350, 90, 24, 160)} stroke={BLUE} strokeWidth="3.5" fill="none" />
    <path d={sine(30, 350, 210, 24, 40)} stroke={RED} strokeWidth="3.5" fill="none" />
    <text x="190" y="140" textAnchor="middle" fontSize="13" fontWeight="800" fill={BLUE}>Low frequency: low pitch (deep)</text>
    <text x="190" y="158" textAnchor="middle" fontSize="12" fontWeight="600" fill={GREY}>like thunder or a drum</text>
    <text x="190" y="262" textAnchor="middle" fontSize="13" fontWeight="800" fill={RED}>High frequency: high pitch (shrill)</text>
    <text x="190" y="280" textAnchor="middle" fontSize="12" fontWeight="600" fill={GREY}>like a whistle or a siren</text>
    <line x1="410" y1="90" x2="730" y2="90" stroke={GREY} strokeDasharray="5 4" /><line x1="410" y1="210" x2="730" y2="210" stroke={GREY} strokeDasharray="5 4" />
    <path d={sine(410, 730, 90, 20, 80)} stroke={BLUE} strokeWidth="3.5" fill="none" />
    <path d={sine(410, 730, 205, 40, 80)} stroke={RED} strokeWidth="3.5" fill="none" />
    <text x="570" y="140" textAnchor="middle" fontSize="13" fontWeight="800" fill={BLUE}>Small amplitude: soft sound</text>
    <text x="570" y="262" textAnchor="middle" fontSize="13" fontWeight="800" fill={RED}>Large amplitude: loud sound</text>
    <text x="570" y="280" textAnchor="middle" fontSize="12" fontWeight="600" fill={GREY}>Same frequency, so the same pitch</text>
  </svg>
);

export const SpeedMediaDiagram: React.FC = () => (
  <svg viewBox="0 0 720 280" role="img" aria-label="Speed of sound in air, water and steel" className="w-full h-auto" style={T}>
    <rect width="720" height="280" fill="#ffffff" />
    <text x="360" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>Speed of sound in different media</text>
    <text x="30" y="82" fontSize="14" fontWeight="800" fill={INK}>Air (gas)</text>
    <rect x="170" y="62" width={340 / 5000 * 480} height="30" fill="#93c5fd" stroke={INK} />
    <text x="170" y="112" fontSize="13" fontWeight="700" fill={BLUE}>340 m/s</text>
    <text x="30" y="152" fontSize="14" fontWeight="800" fill={INK}>Water (liquid)</text>
    <rect x="170" y="132" width={1500 / 5000 * 480} height="30" fill="#60a5fa" stroke={INK} />
    <text x="170" y="182" fontSize="13" fontWeight="700" fill={BLUE}>1500 m/s</text>
    <text x="30" y="222" fontSize="14" fontWeight="800" fill={INK}>Steel (solid)</text>
    <rect x="170" y="202" width="480" height="30" fill="#2563eb" stroke={INK} />
    <text x="170" y="252" fontSize="13" fontWeight="700" fill={BLUE}>5000 m/s</text>
    <text x="690" y="252" textAnchor="end" fontSize="13" fontWeight="800" fill={TEAL}>Fastest in solids, slowest in gases</text>
  </svg>
);

export const EchoDiagram: React.FC = () => (
  <svg viewBox="0 0 760 260" role="img" aria-label="An echo: sound goes to a wall and comes back; the wall must be at least 17 metres away" className="w-full h-auto" style={T}>
    <rect width="760" height="260" fill="#ffffff" />
    <g><circle cx="90" cy="104" r="14" fill="#fde68a" stroke={INK} strokeWidth="2" /><line x1="90" y1="118" x2="90" y2="170" stroke={INK} strokeWidth="4" /><line x1="90" y1="170" x2="76" y2="200" stroke={INK} strokeWidth="4" /><line x1="90" y1="170" x2="104" y2="200" stroke={INK} strokeWidth="4" /><line x1="90" y1="132" x2="116" y2="120" stroke={INK} strokeWidth="4" /></g>
    <rect x="620" y="60" width="36" height="150" fill="#94a3b8" stroke={INK} strokeWidth="2" />
    <text x="638" y="50" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>Hard wall</text>
    <Arrow x1={130} y1={110} x2={610} y2={110} c={BLUE} w={4} /><text x="370" y="98" textAnchor="middle" fontSize="13" fontWeight="800" fill={BLUE}>Sound goes</text>
    <Arrow x1={610} y1={150} x2={130} y2={150} c={RED} w={4} /><text x="370" y="176" textAnchor="middle" fontSize="13" fontWeight="800" fill={RED}>Echo comes back</text>
    <DArrow x1={90} x2={620} y={232} c={TEAL} />
    <text x="355" y="252" textAnchor="middle" fontSize="13" fontWeight="800" fill={TEAL}>d = v × t / 2 (the sound covers the distance twice)</text>
    <text x="690" y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill={GREY}> </text>
    <text x="380" y="30" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>Echo needs a gap of 0.1 s: 340 × 0.1 = 34 m to and fro, so at least 17 m</text>
  </svg>
);

export const HearingRangeDiagram: React.FC = () => (
  <svg viewBox="0 0 760 280" role="img" aria-label="Infrasonic below 20 hertz, audible from 20 hertz to 20 kilohertz, ultrasonic above 20 kilohertz" className="w-full h-auto" style={T}>
    <rect width="760" height="280" fill="#ffffff" />
    <rect x="30" y="80" width="200" height="70" fill="#fecaca" stroke={INK} strokeWidth="2" />
    <rect x="230" y="80" width="300" height="70" fill="#bbf7d0" stroke={INK} strokeWidth="2" />
    <rect x="530" y="80" width="200" height="70" fill="#bfdbfe" stroke={INK} strokeWidth="2" />
    <text x="130" y="110" textAnchor="middle" fontSize="15" fontWeight="800" fill={RED}>Infrasonic</text>
    <text x="130" y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>below 20 Hz</text>
    <text x="380" y="110" textAnchor="middle" fontSize="15" fontWeight="800" fill="#166534">Audible</text>
    <text x="380" y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>20 Hz to 20 000 Hz</text>
    <text x="630" y="110" textAnchor="middle" fontSize="15" fontWeight="800" fill={BLUE}>Ultrasonic</text>
    <text x="630" y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>above 20 kHz</text>
    <text x="230" y="172" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK}>20 Hz</text>
    <text x="530" y="172" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK}>20 kHz</text>
    <text x="130" y="206" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>Elephants hear it</text>
    <text x="130" y="224" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>Earthquake warning</text>
    <text x="380" y="206" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>Human hearing</text>
    <text x="380" y="224" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>Speech, music</text>
    <text x="630" y="206" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>Bats, dogs, dolphins hear it</text>
    <text x="630" y="224" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>Scans, sonar, cleaning</text>
    <text x="380" y="40" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>Frequency ranges of sound</text>
    <text x="380" y="262" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={TEAL}>Humans cannot hear infrasound or ultrasound</text>
  </svg>
);

export const SonarDiagram: React.FC = () => (
  <svg viewBox="0 0 760 280" role="img" aria-label="Sonar: a ship sends an ultrasonic pulse to the sea bed and measures the time for the echo" className="w-full h-auto" style={T}>
    <rect width="760" height="280" fill="#ffffff" />
    <rect x="0" y="70" width="760" height="170" fill="#bae6fd" />
    <rect x="0" y="240" width="760" height="40" fill="#a16207" />
    <polygon points="250,58 390,58 370,84 270,84" fill="#475569" stroke={INK} strokeWidth="2" />
    <rect x="300" y="36" width="50" height="22" fill="#94a3b8" stroke={INK} strokeWidth="2" />
    <Arrow x1={320} y1={90} x2={320} y2={228} c={BLUE} w={4} /><text x="332" y="150" fontSize="13" fontWeight="800" fill={BLUE}>Pulse goes down</text>
    <Arrow x1={350} y1={228} x2={350} y2={92} c={RED} w={4} /><text x="362" y="200" fontSize="13" fontWeight="800" fill={RED}>Echo comes up</text>
    <line x1="120" y1="78" x2="120" y2="238" stroke={TEAL} strokeWidth="2" /><polygon points="120,78 114,90 126,90" fill={TEAL} /><polygon points="120,238 114,226 126,226" fill={TEAL} />
    <text x="132" y="164" fontSize="14" fontWeight="800" fill={TEAL}>depth d</text>
    <text x="600" y="120" textAnchor="middle" fontSize="14" fontWeight="800" fill={INK}>d = v × t / 2</text>
    <text x="600" y="144" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>t is the time for the whole</text>
    <text x="600" y="162" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>trip down and back</text>
    <text x="600" y="190" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREY}>Example: 4 s, 1500 m/s</text>
    <text x="600" y="208" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={TEAL}>d = 1500 × 4 / 2 = 3000 m</text>
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

export const SoundMindMap: React.FC = () => (
  <svg viewBox="0 0 960 660" role="img" aria-label="Mind map of the chapter Sound" className="w-full h-auto" style={T}>
    <rect width="960" height="660" fill="#ffffff" />
    {[[480, 330, 190, 110], [480, 330, 190, 270], [480, 330, 190, 430], [480, 330, 770, 110], [480, 330, 770, 270], [480, 330, 770, 430], [480, 330, 385, 590], [480, 330, 585, 590]].map(([a, b, c, d], i) => (
      <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#94a3b8" strokeWidth="3" />
    ))}
    <circle cx="480" cy="330" r="72" fill="#0891b2" stroke="#0e7490" strokeWidth="3" />
    <text x="480" y="326" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffffff">SOUND</text>
    <text x="480" y="348" textAnchor="middle" fontSize="12" fontWeight="700" fill="#e0f2fe">waves and uses</text>
    <Node x={40} y={40} w={300} title="1. Production" lines={["Made by vibrations", "String, fork, cords, air column", "Source = vibrating object", "Vibration = to and fro motion"]} c="#1d4ed8" bg="#dbeafe" />
    <Node x={40} y={200} w={300} title="2. Travel" lines={["Needs a medium", "Solid, liquid or gas", "No sound in vacuum", "Mechanical wave"]} c="#7c3aed" bg="#ede9fe" />
    <Node x={40} y={360} w={300} title="3. Sound wave" lines={["Compressions and rarefactions", "Longitudinal wave", "Particles only vibrate", "Energy travels, not particles"]} c="#b45309" bg="#fef3c7" />
    <Node x={620} y={40} w={300} title="4. Wave terms" lines={["Wavelength λ (m)", "Frequency f (Hz), period T = 1/f", "Amplitude, intensity", "v = f × λ"]} c="#15803d" bg="#dcfce7" />
    <Node x={620} y={200} w={300} title="5. Speed" lines={["Solid > liquid > gas", "Steel 5000, water 1500, air 340 m/s", "Rises with temperature", "Humidity raises it too"]} c="#be123c" bg="#ffe4e6" />
    <Node x={620} y={360} w={300} title="6. Hearing" lines={["Pitch: frequency", "Loudness: amplitude (dB)", "Audible 20 Hz to 20 kHz", "Timbre, tone, note, octave"]} c="#0f766e" bg="#ccfbf1" />
    <Node x={250} y={520} w={230} title="7. Reflection" lines={["Echo: gap 0.1 s, 17 m", "Reverberation: repeated", "d = v × t / 2"]} c="#c2410c" bg="#ffedd5" />
    <Node x={500} y={520} w={230} title="8. Uses" lines={["Ultrasound: scans, cleaning", "Sonar and echolocation", "Infrasound: earthquakes"]} c="#4338ca" bg="#e0e7ff" />
  </svg>
);
