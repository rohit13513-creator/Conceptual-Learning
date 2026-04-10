import { useState, useEffect } from "react";

// ── Fonts & Global ────────────────────────────────────────────────────────────
const FONT = document.createElement("link");
FONT.rel = "stylesheet";
FONT.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@500&display=swap";
document.head.appendChild(FONT);

// ── Data ──────────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "🔔 JEE Main 2025 Session 2 Registration Open – Apply before April 30",
  "📢 NTSE Stage 2 Results announced – Check official NCERT website",
  "🏆 IMO 2025 Registrations open for Class 8, 9 & 10 students",
  "📋 CBSE Board Exam Date Sheet 2026 released – Class 10 exams from Feb 15",
  "🌟 NSO Olympiad – Last date to register: June 10, 2025",
  "📢 KVPY Scholarship applications open for Class 11 students",
  "🏅 RMO (Regional Math Olympiad) 2025 – Registrations begin August",
  "📋 CBSE Sample Papers 2025-26 released on cbse.gov.in",
  "🔔 Science Olympiad Foundation (SOF) – New session registrations open",
  "🌟 Conceptual Learning – Admissions open for Class 8, 9 & 10 batch 2025-26",
];

const RESULTS = [
  { year: 2026, students: 34, toppers: [{ name: "Priya Sharma", score: "98.6%", subject: "Science" }, { name: "Arjun Mehta", score: "97.4%", subject: "Math" }, { name: "Sneha Gupta", score: "96.8%", subject: "Science" }], passRate: 100, avgScore: "91.2%" },
  { year: 2025, students: 31, toppers: [{ name: "Rohan Verma", score: "98.2%", subject: "Math" }, { name: "Kavya Singh", score: "97.0%", subject: "Science" }, { name: "Aarav Joshi", score: "95.5%", subject: "Math" }], passRate: 100, avgScore: "90.8%" },
  { year: 2024, students: 28, toppers: [{ name: "Ananya Patel", score: "97.8%", subject: "Science" }, { name: "Vivaan Rao", score: "96.4%", subject: "Math" }, { name: "Ishaan Kumar", score: "95.2%", subject: "Science" }], passRate: 100, avgScore: "89.6%" },
  { year: 2023, students: 24, toppers: [{ name: "Riya Agarwal", score: "96.6%", subject: "Math" }, { name: "Dev Choudhary", score: "95.8%", subject: "Science" }, { name: "Nisha Tiwari", score: "94.4%", subject: "Math" }], passRate: 98, avgScore: "88.4%" },
  { year: 2022, students: 20, toppers: [{ name: "Siddharth Nair", score: "95.4%", subject: "Science" }, { name: "Pooja Mishra", score: "94.2%", subject: "Math" }, { name: "Karan Shah", score: "93.8%", subject: "Science" }], passRate: 98, avgScore: "87.2%" },
];

const QUESTION_BANK = {
  Mathematics: {
    "Class VIII": {
      "CBSE Board": [
        { id: 1, q: "Simplify: (2x + 3)(x − 4) − x(x + 2)", ans: "2x² − 8x + 3x − 12 − x² − 2x = x² − 7x − 12", marks: 3 },
        { id: 2, q: "Find the value of x: 3(x − 4) + 2(2x + 1) = 19", ans: "3x − 12 + 4x + 2 = 19 → 7x = 29 → x = 29/7", marks: 3 },
        { id: 3, q: "The area of a rectangle is 96 cm². If length is 12 cm, find perimeter.", ans: "Width = 96/12 = 8 cm, Perimeter = 2(12+8) = 40 cm", marks: 4 },
        { id: 4, q: "Factorise: x² − 9x + 20", ans: "(x − 4)(x − 5)", marks: 2 },
        { id: 5, q: "If 2/3 of a number is 48, find the number.", ans: "Number = 48 × 3/2 = 72", marks: 2 },
      ],
      "Olympiads": [
        { id: 1, q: "How many two-digit numbers are divisible by both 3 and 5?", ans: "Numbers divisible by 15 between 10–99: 15,30,45,60,75,90 → 6 numbers", marks: 4 },
        { id: 2, q: "A train travels 240 km at speed v. If speed increases by 20 km/h, it saves 1 hour. Find v.", ans: "240/v − 240/(v+20) = 1 → v² + 20v − 4800 = 0 → v = 60 km/h", marks: 5 },
        { id: 3, q: "Find the smallest number that when divided by 12, 15, 20 leaves remainder 5 each time.", ans: "LCM(12,15,20) = 60. Answer = 60 + 5 = 65", marks: 4 },
      ],
    },
    "Class IX": {
      "CBSE Board": [
        { id: 1, q: "Prove that √2 is irrational.", ans: "Assume √2 = p/q (lowest terms). Then 2q² = p² → p is even → p = 2m → 2q² = 4m² → q² = 2m² → q is even. Contradiction. Hence √2 is irrational.", marks: 5 },
        { id: 2, q: "In a triangle, two angles are 65° and 75°. Find the third angle.", ans: "Third angle = 180° − 65° − 75° = 40°", marks: 2 },
        { id: 3, q: "Factorise: 8x³ + 27y³", ans: "(2x + 3y)(4x² − 6xy + 9y²) using a³ + b³ identity", marks: 3 },
        { id: 4, q: "Find the area of triangle with vertices A(0,0), B(4,0), C(4,3).", ans: "Area = ½ × base × height = ½ × 4 × 3 = 6 sq units", marks: 3 },
      ],
      "Olympiads": [
        { id: 1, q: "If p and q are prime numbers such that p² − q² = 72, find p + q.", ans: "(p+q)(p−q) = 72. Try p=19, q=17: 36×2=72. p+q = 36", marks: 5 },
        { id: 2, q: "A sequence: 2, 6, 12, 20, 30... Find the 10th term.", ans: "Pattern: n(n+1). 10th term = 10×11 = 110", marks: 4 },
        { id: 3, q: "Prove: Sum of angles of any polygon with n sides = (n−2)×180°.", ans: "Divide polygon into (n−2) triangles from one vertex. Each triangle has 180°. Total = (n−2)×180°.", marks: 5 },
      ],
    },
    "Class X": {
      "CBSE Board": [
        { id: 1, q: "Solve: 2x² − 5x + 3 = 0 using quadratic formula.", ans: "D = 25 − 24 = 1. x = (5±1)/4. x = 3/2 or x = 1", marks: 4 },
        { id: 2, q: "Find the 20th term of AP: 3, 7, 11, 15...", ans: "a = 3, d = 4. a₂₀ = 3 + 19×4 = 3 + 76 = 79", marks: 3 },
        { id: 3, q: "A ladder 10 m long reaches a wall 8 m high. Find distance of foot from wall.", ans: "d = √(10²−8²) = √(100−64) = √36 = 6 m", marks: 3 },
        { id: 4, q: "Find HCF of 96 and 72 using Euclid's division lemma.", ans: "96 = 72×1 + 24; 72 = 24×3 + 0. HCF = 24", marks: 3 },
        { id: 5, q: "A pair of linear equations: 3x + 2y = 12 and x − y = 1. Solve.", ans: "From eq2: x = y+1. Sub: 3(y+1)+2y=12 → 5y=9 → y=9/5, x=14/5", marks: 5 },
      ],
      "Olympiads": [
        { id: 1, q: "If α and β are roots of 3x²−5x+2=0, find α²+β².", ans: "α+β = 5/3, αβ = 2/3. α²+β² = (α+β)² − 2αβ = 25/9 − 4/3 = 13/9", marks: 5 },
        { id: 2, q: "How many 4-digit numbers are divisible by 7?", ans: "First: 1001, Last: 9996. Count = (9996−1001)/7 + 1 = 1285", marks: 5 },
        { id: 3, q: "In △ABC, D is midpoint of BC and AD⊥BC. Prove AB²+AC²=2(AD²+BD²).", ans: "Apply Pythagoras in △ABD and △ACD, then add and simplify.", marks: 6 },
      ],
    },
  },
  Science: {
    "Class VIII": {
      "CBSE Board": [
        { id: 1, q: "What is the difference between conductors and insulators? Give two examples each.", ans: "Conductors allow electricity to flow (copper, iron). Insulators do not allow electricity to flow (rubber, wood).", marks: 3 },
        { id: 2, q: "State the law of conservation of mass with an example.", ans: "Mass can neither be created nor destroyed. In a chemical reaction, total mass of reactants = total mass of products. e.g., 2H₂ + O₂ → 2H₂O", marks: 4 },
        { id: 3, q: "Name the cell organelle called the 'powerhouse of the cell' and explain why.", ans: "Mitochondria. It produces ATP (energy) through cellular respiration, supplying energy for all cell activities.", marks: 3 },
        { id: 4, q: "What is photosynthesis? Write the chemical equation.", ans: "Process by which plants make food using sunlight. 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", marks: 4 },
      ],
      "Olympiads": [
        { id: 1, q: "A ball is thrown upward with velocity 20 m/s. How long before it returns? (g=10 m/s²)", ans: "Time to top = v/g = 2s. Total time = 4s", marks: 5 },
        { id: 2, q: "Why does ice float on water despite being solid?", ans: "Ice has a lower density (0.917 g/cm³) than liquid water (1 g/cm³) due to its hexagonal crystal structure which creates empty spaces.", marks: 5 },
        { id: 3, q: "Name the phenomenon that causes a rainbow. Explain with steps.", ans: "Dispersion of white sunlight by water droplets: refraction → internal reflection → refraction again → VIBGYOR spectrum visible.", marks: 5 },
      ],
    },
    "Class IX": {
      "CBSE Board": [
        { id: 1, q: "State Newton's three laws of motion.", ans: "1st: Inertia – object stays at rest or uniform motion unless force acts. 2nd: F=ma. 3rd: Every action has equal and opposite reaction.", marks: 5 },
        { id: 2, q: "What is the difference between distance and displacement?", ans: "Distance is total path length (scalar). Displacement is shortest straight line from start to end (vector).", marks: 3 },
        { id: 3, q: "Name the four tissue types in animals and give one function each.", ans: "Epithelial (protection), Connective (support), Muscular (movement), Nervous (signal transmission).", marks: 4 },
        { id: 4, q: "What is an atom? How does Dalton's atomic theory differ from modern theory?", ans: "Atom is smallest unit of matter. Dalton: indivisible. Modern: has subatomic particles (proton, neutron, electron).", marks: 4 },
      ],
      "Olympiads": [
        { id: 1, q: "A car accelerates from 0 to 72 km/h in 10 seconds. Find force if mass is 1000 kg.", ans: "72 km/h = 20 m/s. a = 20/10 = 2 m/s². F = 1000×2 = 2000 N", marks: 5 },
        { id: 2, q: "Why is hydrogen placed in Group 1 despite not being an alkali metal?", ans: "H has 1 valence electron like alkali metals. But it's a non-metal, diatomic gas. It's placed in Group 1 for electronic configuration similarity only.", marks: 5 },
      ],
    },
    "Class X": {
      "CBSE Board": [
        { id: 1, q: "Explain the working of a human eye. What defects can occur?", ans: "Eye works like camera: light enters cornea → pupil → lens focusses on retina → optic nerve to brain. Defects: Myopia (short sight), Hypermetropia (long sight), Astigmatism.", marks: 5 },
        { id: 2, q: "What is Ohm's Law? State its limitations.", ans: "V = IR (voltage = current × resistance). Limitations: Not valid for non-ohmic conductors, semiconductors, electrolytes.", marks: 4 },
        { id: 3, q: "What happens when HCl is added to Na₂CO₃? Write the equation.", ans: "Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑. CO₂ gas is released causing effervescence.", marks: 4 },
        { id: 4, q: "What is the difference between sexual and asexual reproduction?", ans: "Sexual: two parents, gametes, genetic variation (e.g. humans). Asexual: one parent, no gametes, identical offspring (e.g. Amoeba by binary fission).", marks: 4 },
        { id: 5, q: "Define magnetic field lines. State any three properties.", ans: "Imaginary lines showing direction of magnetic force. Properties: never cross, form closed loops, tangent gives field direction.", marks: 4 },
      ],
      "Olympiads": [
        { id: 1, q: "A 60W bulb runs on 220V supply. Find (i) current (ii) resistance (iii) energy in 5 hours.", ans: "I = P/V = 60/220 ≈ 0.27A. R = V²/P = 220²/60 ≈ 807Ω. E = P×t = 60×5×3600 = 1,080,000 J = 0.3 kWh", marks: 6 },
        { id: 2, q: "Why is the sky blue during day and red/orange at sunset?", ans: "Rayleigh scattering: blue light (short wavelength) scatters most → blue sky. At sunset, light travels longer path → blue scattered away → red/orange reaches eye.", marks: 5 },
        { id: 3, q: "Carbon forms millions of compounds. Give three reasons.", ans: "1. Catenation (C bonds to C). 2. Tetravalency (4 bonds possible). 3. Forms chains, branches, rings with many elements.", marks: 5 },
      ],
    },
  },
};

// ── Logo ──────────────────────────────────────────────────────────────────────
function Logo({ size = 40 }) {
  const uid = "hp" + size;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={"bg"+uid} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1340B0"/><stop offset="100%" stopColor="#6D28D9"/>
        </linearGradient>
        <linearGradient id={"yl"+uid} x1="24" y1="6" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A"/><stop offset="100%" stopColor="#F59E0B"/>
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill={`url(#bg${uid})`}/>
      <rect x="0" y="0" width="48" height="24" rx="13" fill="rgba(255,255,255,0.12)"/>
      <rect x="9" y="19" width="30" height="4" rx="2" fill="white" opacity="0.96"/>
      <rect x="21" y="12" width="6" height="6" rx="1.2" fill="white" opacity="0.96" transform="rotate(45 24 15)"/>
      <path d="M16 23 L16 30 Q16 32 18.5 32.5 L24 34 L29.5 32.5 Q32 32 32 30 L32 23" fill="white" opacity="0.93"/>
      <path d="M37 21 Q38.5 21 38.5 24 L38.5 31" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.8"/>
      <ellipse cx="38.5" cy="33" rx="2.2" ry="1.5" fill={`url(#yl${uid})`} opacity="0.95"/>
      <line x1="37" y1="33" x2="36" y2="37" stroke={`url(#yl${uid})`} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="38.5" y1="34.5" x2="38" y2="38" stroke={`url(#yl${uid})`} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="40" y1="33" x2="41" y2="37" stroke={`url(#yl${uid})`} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 37 Q10 35 12 34.5 L24 36.5 L36 34.5 Q38 35 38 37 L38 41 Q36 40 24 40 Q12 40 10 41 Z" fill="white" opacity="0.15"/>
      <path d="M11 37 L11 40.5 Q17.5 39 24 39 L24 36 Q17.5 35 11 37Z" fill="white" opacity="0.72"/>
      <path d="M37 37 L37 40.5 Q30.5 39 24 39 L24 36 Q30.5 35 37 37Z" fill="white" opacity="0.72"/>
      <circle cx="10" cy="10" r="1.4" fill={`url(#yl${uid})`} opacity="0.9"/>
      <circle cx="7" cy="14" r="0.7" fill="white" opacity="0.5"/>
      <circle cx="14" cy="7" r="0.7" fill="white" opacity="0.5"/>
    </svg>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [page, setPage] = useState("home");
  const [tickerPos, setTickerPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPos(p => (p + 1) % TICKER_ITEMS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nav = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "courses", label: "Courses" },
    { id: "results", label: "Results" },
    { id: "qbank", label: "Question Bank" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#F7F8FC", color: "#1a1a2e" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { from{background-position:-200% 0} to{background-position:200% 0} }
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#F7F8FC; }
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#f1f5f9;} ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px;}
        .nav-link { transition: color 0.2s; cursor:pointer; }
        .nav-link:hover { color: #1A56DB !important; }
        .btn-primary { transition: all 0.2s; cursor:pointer; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow: 0 8px 24px rgba(26,86,219,0.35) !important; }
        .btn-outline { transition: all 0.2s; cursor:pointer; }
        .btn-outline:hover { background: #1A56DB !important; color: white !important; }
        .card-hover { transition: all 0.22s; cursor:default; }
        .card-hover:hover { transform:translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.12) !important; }
        .stat-num { font-family: 'JetBrains Mono', monospace; }
        .section-title { font-family: 'Cormorant Garamond', Georgia, serif; }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .qbank-btn { transition:all 0.18s; cursor:pointer; }
        .qbank-btn:hover { background:#1A56DB !important; color:white !important; transform:translateY(-1px); }
        .qbank-btn.active { background:#1A56DB !important; color:white !important; }
        .ticker-wrap { overflow:hidden; white-space:nowrap; }
        .ticker-inner { display:inline-block; animation: ticker 60s linear infinite; }
        button { border:none; outline:none; font-family:'DM Sans',sans-serif; cursor:pointer; }
        a { text-decoration:none; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.97)", borderBottom: "1px solid #E5E7EB", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 68, justifyContent: "space-between" }}>
          {/* Logo */}
          <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <Logo size={40} />
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20, color: "#1A56DB", lineHeight: 1.1 }}>Conceptual Learning</div>
              <div style={{ fontSize: 10, color: "#7C3AED", letterSpacing: "0.5px", fontWeight: 500 }}>Math & Science Coaching</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {nav.map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} className="nav-link"
                style={{ padding: "8px 16px", borderRadius: 8, background: page === n.id ? "#EBF5FF" : "transparent", color: page === n.id ? "#1A56DB" : "#374151", fontSize: 14, fontWeight: page === n.id ? 600 : 400, border: "none" }}>
                {n.label}
              </button>
            ))}
            <div style={{ width: 1, height: 24, background: "#E5E7EB", margin: "0 8px" }} />
            <button onClick={() => window.open("#login", "_self")} className="btn-outline"
              style={{ padding: "8px 18px", borderRadius: 8, border: "1.5px solid #1A56DB", color: "#1A56DB", fontSize: 13, fontWeight: 600, background: "transparent" }}>
              Login
            </button>
            <button onClick={() => window.open("#register", "_self")} className="btn-primary"
              style={{ padding: "8px 18px", borderRadius: 8, background: "linear-gradient(135deg,#1A56DB,#7C3AED)", color: "white", fontSize: 13, fontWeight: 600, boxShadow: "0 4px 14px rgba(26,86,219,0.3)" }}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div style={{ background: "linear-gradient(90deg,#1A56DB,#7C3AED)", color: "white", padding: "9px 0", overflow: "hidden" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} style={{ marginRight: 80, fontSize: 13, fontWeight: 500 }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div>
        {page === "home" && <HomeSection setPage={setPage} />}
        {page === "about" && <AboutSection />}
        {page === "courses" && <CoursesSection setPage={setPage} />}
        {page === "results" && <ResultsSection />}
        {page === "qbank" && <QuestionBankSection />}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "40px 24px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 32 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Logo size={36} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 18, color: "white" }}>Conceptual Learning</div>
                  <div style={{ fontSize: 11, color: "#7C3AED" }}>Math & Science Coaching</div>
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 300 }}>Building strong conceptual foundations in Math and Science for Class 8–10 students since 2018.</p>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Quick Links</div>
              {["Home", "About Us", "Courses", "Results", "Question Bank"].map(l => (
                <div key={l} onClick={() => setPage(l.toLowerCase().replace(" ", l === "Question Bank" ? "qbank" : "").replace("about us", "about").replace("question bank", "qbank"))}
                  style={{ fontSize: 13, marginBottom: 8, cursor: "pointer", transition: "color 0.2s" }} className="nav-link">{l}</div>
              ))}
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Contact</div>
              <div style={{ fontSize: 13, marginBottom: 8 }}>📧 coach@conceptual.com</div>
              <div style={{ fontSize: 13, marginBottom: 8 }}>📱 Available on WhatsApp</div>
              <div style={{ fontSize: 13, marginBottom: 8 }}>📍 Serving students since 2018</div>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button onClick={() => {}} className="btn-primary" style={{ padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg,#1A56DB,#7C3AED)", color: "white", fontSize: 12, fontWeight: 600 }}>Login</button>
                <button onClick={() => {}} className="btn-primary" style={{ padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg,#059669,#0ea5e9)", color: "white", fontSize: 12, fontWeight: 600 }}>Register</button>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: 20, textAlign: "center", fontSize: 12 }}>
            © 2025 Conceptual Learning. All rights reserved. | Empowering students since 2018
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── HOME SECTION ──────────────────────────────────────────────────────────────
function HomeSection({ setPage }) {
  const updates = [
    { type: "Exam", tag: "CBSE 2026", title: "Class 10 Board Exam Date Sheet Released", desc: "Mathematics: March 2 | Science: March 15", color: "#1A56DB", icon: "📋" },
    { type: "Olympiad", tag: "IMO 2025", title: "International Math Olympiad Registration Open", desc: "Level 1: November 2025 | Open for Class 8–10", color: "#7C3AED", icon: "🏆" },
    { type: "Scholarship", tag: "NTSE 2025", title: "National Talent Search Exam Stage 1", desc: "State level exam in November 2025", color: "#059669", icon: "🌟" },
    { type: "Olympiad", tag: "NSO", title: "National Science Olympiad – New Session", desc: "Register before June 10, 2025 on sofworld.org", color: "#D97706", icon: "🔬" },
    { type: "Exam", tag: "JEE Main", title: "JEE Main 2026 – Start Early Preparation", desc: "Class 10 foundation crucial for JEE success", color: "#DC2626", icon: "🎯" },
    { type: "Olympiad", tag: "RMO 2025", title: "Regional Math Olympiad Registrations", desc: "Begins August 2025 – Prepare with our Olympiad Q-Bank", color: "#0891b2", icon: "📐" },
  ];

  return (
    <div>
      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1A56DB 50%, #7C3AED 100%)", padding: "80px 24px 100px", position: "relative", overflow: "hidden" }}>
        {/* Decorative shapes */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", top: -200, right: -100 }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", top: 50, right: 50 }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(124,58,237,0.2)", bottom: -100, left: -50 }} />
        {/* Grid dots */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div className="fade-up">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "6px 16px", marginBottom: 24, border: "1px solid rgba(255,255,255,0.2)" }}>
                <span style={{ fontSize: 12 }}>✨</span>
                <span style={{ color: "#FDE68A", fontSize: 12, fontWeight: 600 }}>Admissions Open — Batch 2025–26</span>
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 54, fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 20 }}>
                Where Concepts<br />
                <span style={{ color: "#FDE68A", fontStyle: "italic" }}>Come Alive.</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 17, lineHeight: 1.7, marginBottom: 32, maxWidth: 460 }}>
                Expert Math & Science coaching for Class 8–10 students. Individual attention, proven methods, outstanding results since 2018.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button className="btn-primary" style={{ padding: "14px 28px", borderRadius: 10, background: "white", color: "#1A56DB", fontSize: 15, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>
                  Register Now →
                </button>
                <button onClick={() => setPage("courses")} className="btn-outline" style={{ padding: "14px 28px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.4)", color: "white", fontSize: 15, fontWeight: 600, background: "transparent" }}>
                  View Courses
                </button>
              </div>
              {/* Quick stats */}
              <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
                {[["7+", "Years Experience"], ["150+", "Students Taught"], ["98%", "Avg Pass Rate"], ["2018", "Est. Since"]].map(([val, lab]) => (
                  <div key={lab}>
                    <div className="stat-num" style={{ fontSize: 26, fontWeight: 700, color: "#FDE68A" }}>{val}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{lab}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right card */}
            <div className="fade-up" style={{ animationDelay: "0.2s" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, border: "1px solid rgba(255,255,255,0.2)" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "white", fontWeight: 600, marginBottom: 20 }}>Why Choose Us?</div>
                {[
                  { icon: "🎯", title: "Individual Attention", desc: "Small batch sizes ensuring every student gets personal guidance" },
                  { icon: "📚", title: "Concept-First Approach", desc: "We build deep understanding, not just exam shortcuts" },
                  { icon: "🏆", title: "Proven Results", desc: "Top scores in CBSE boards and Olympiads every year since 2018" },
                  { icon: "💡", title: "Doubt Clearing Forum", desc: "Ask doubts anytime through our dedicated student portal" },
                ].map(f => (
                  <div key={f.title} style={{ display: "flex", gap: 14, marginBottom: 18 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <div style={{ color: "white", fontWeight: 600, fontSize: 14 }}>{f.title}</div>
                      <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2, lineHeight: 1.5 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UPDATES SECTION */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-block", background: "#EBF5FF", color: "#1A56DB", borderRadius: 20, padding: "5px 16px", fontSize: 12, fontWeight: 700, marginBottom: 14, letterSpacing: "0.5px" }}>LATEST UPDATES</div>
          <h2 className="section-title" style={{ fontSize: 40, color: "#0f1f5c", fontWeight: 700 }}>Exam & Olympiad News</h2>
          <p style={{ color: "#6B7280", fontSize: 15, marginTop: 10 }}>Stay informed about upcoming exams, scholarships and opportunities</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {updates.map((u, i) => (
            <div key={i} className="card-hover" style={{ background: "white", borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 10, background: u.color + "18", color: u.color, borderRadius: 6, padding: "3px 10px", fontWeight: 700 }}>{u.type}</span>
                <span style={{ fontSize: 22 }}>{u.icon}</span>
              </div>
              <div style={{ fontSize: 11, color: u.color, fontWeight: 700, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>{u.tag}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8, lineHeight: 1.4 }}>{u.title}</h3>
              <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{u.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA BAND */}
      <div style={{ background: "linear-gradient(135deg,#0f1f5c,#1A56DB)", padding: "50px 24px", textAlign: "center" }}>
        <h2 className="section-title" style={{ fontSize: 38, color: "white", fontWeight: 700, marginBottom: 14 }}>Ready to Excel in Math & Science?</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 28 }}>Join students who have achieved outstanding results with Conceptual Learning</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <button className="btn-primary" style={{ padding: "14px 32px", borderRadius: 10, background: "white", color: "#1A56DB", fontSize: 15, fontWeight: 700 }}>Register for Free Trial</button>
          <button onClick={() => setPage("results")} className="btn-outline" style={{ padding: "14px 32px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.4)", color: "white", fontSize: 15, fontWeight: 600, background: "transparent" }}>View Our Results</button>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT SECTION ─────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{ display: "inline-block", background: "#EBF5FF", color: "#1A56DB", borderRadius: 20, padding: "5px 16px", fontSize: 12, fontWeight: 700, marginBottom: 14 }}>ABOUT US</div>
        <h1 className="section-title" style={{ fontSize: 46, color: "#0f1f5c", fontWeight: 700, lineHeight: 1.2 }}>Teaching with Heart,<br /><span style={{ color: "#1A56DB", fontStyle: "italic" }}>Results that Speak.</span></h1>
      </div>

      {/* Story */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", marginBottom: 70 }}>
        <div>
          <h2 className="section-title" style={{ fontSize: 32, color: "#0f1f5c", fontWeight: 700, marginBottom: 20 }}>Our Story</h2>
          <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            Conceptual Learning was founded in 2018 with a single, powerful belief — <strong>every student can excel</strong> when they truly understand the subject, not just memorize it.
          </p>
          <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            Over the years, we have guided hundreds of students through their Class 8, 9 and 10 journey in Mathematics and Science — helping them not only score well in CBSE boards, but also develop the analytical thinking needed for Olympiads, NTSE, and future competitive exams like JEE and NEET.
          </p>
          <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.8 }}>
            Our approach is rooted in one-on-one attention, concept clarity, and consistent practice. We don't believe in shortcuts — we believe in building a foundation so strong that the exam becomes easy.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { val: "2018", label: "Founded", icon: "🎓", color: "#1A56DB" },
            { val: "150+", label: "Students Taught", icon: "👨‍🎓", color: "#7C3AED" },
            { val: "100%", label: "Pass Rate (Board)", icon: "✅", color: "#059669" },
            { val: "7+", label: "Years of Excellence", icon: "🏆", color: "#D97706" },
          ].map(s => (
            <div key={s.label} className="card-hover" style={{ background: "white", borderRadius: 16, padding: "24px 20px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
              <div className="stat-num" style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What Makes Us Different */}
      <div style={{ background: "linear-gradient(135deg,#f8faff,#f0eeff)", borderRadius: 24, padding: "50px 48px", marginBottom: 60 }}>
        <h2 className="section-title" style={{ fontSize: 36, color: "#0f1f5c", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>What Makes Us Different</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {[
            { icon: "🎯", title: "Individual Focus", desc: "We focus on each student individually. Small batches mean your child is never lost in a crowd. We track every student's progress personally.", color: "#1A56DB" },
            { icon: "💡", title: "Concept-First Teaching", desc: "Before any formula or trick, we ensure the student truly understands WHY. This builds long-term mastery rather than short-term cramming.", color: "#7C3AED" },
            { icon: "📊", title: "Results Since 2018", desc: "Our students have consistently scored above 90% in board exams and have won medals at Olympiads. Our track record speaks louder than words.", color: "#059669" },
            { icon: "🔬", title: "Science Made Visual", desc: "We use diagrams, experiments and real-world examples to make Physics, Chemistry and Biology engaging and memorable.", color: "#D97706" },
            { icon: "📐", title: "Math Made Logical", desc: "We teach Mathematics as a language of logic — not a collection of formulas. Students learn to derive, not just apply.", color: "#DC2626" },
            { icon: "🤝", title: "Parent Involvement", desc: "Regular progress updates and open communication with parents ensures everyone works together for the student's success.", color: "#0891b2" },
          ].map(f => (
            <div key={f.title} className="card-hover" style={{ background: "white", borderRadius: 14, padding: "24px 22px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: f.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Approach */}
      <div style={{ textAlign: "center" }}>
        <h2 className="section-title" style={{ fontSize: 36, color: "#0f1f5c", fontWeight: 700, marginBottom: 16 }}>Our Teaching Philosophy</h2>
        <p style={{ color: "#6B7280", fontSize: 15, maxWidth: 700, margin: "0 auto 40px", lineHeight: 1.7 }}>
          We believe the best results come not from pressure, but from understanding. Our three-pillar approach ensures students grow confident, capable, and exam-ready.
        </p>
        <div style={{ display: "flex", gap: 0, maxWidth: 800, margin: "0 auto" }}>
          {[
            { num: "01", title: "Understand", desc: "Deep concept clarity before any practice", color: "#1A56DB" },
            { num: "02", title: "Practice", desc: "Graded exercises from basics to Olympiad level", color: "#7C3AED" },
            { num: "03", title: "Excel", desc: "Exam strategies, time management, top scores", color: "#059669" },
          ].map((p, i) => (
            <div key={p.num} style={{ flex: 1, padding: "30px 24px", background: p.color, color: "white", borderRadius: i === 0 ? "14px 0 0 14px" : i === 2 ? "0 14px 14px 0" : 0 }}>
              <div className="stat-num" style={{ fontSize: 36, fontWeight: 700, opacity: 0.4, marginBottom: 8 }}>{p.num}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── COURSES SECTION ───────────────────────────────────────────────────────────
function CoursesSection({ setPage }) {
  const courses = [
    {
      class: "Class 8", icon: "🌱", color: "#059669", bg: "#ECFDF5",
      desc: "Building the foundation. Perfect entry point to develop strong Math and Science basics.",
      topics: {
        Math: ["Rational Numbers", "Linear Equations", "Quadrilaterals", "Data Handling", "Squares & Cubes", "Algebraic Expressions", "Factorisation", "Graphs", "Mensuration", "Exponents"],
        Science: ["Crop Production", "Microorganisms", "Coal & Petroleum", "Combustion", "Cell Structure", "Reproduction", "Force & Pressure", "Friction", "Light", "Stars & Solar System"],
      },
      duration: "Full Academic Year", sessions: "3 per week", batchSize: "Max 8 students",
    },
    {
      class: "Class 9", icon: "📈", color: "#1A56DB", bg: "#EBF5FF",
      desc: "The crucial year. Concepts learned here form the direct base for Class 10 boards.",
      topics: {
        Math: ["Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations", "Euclid's Geometry", "Lines & Angles", "Triangles", "Quadrilaterals", "Circles", "Surface Areas", "Statistics", "Probability"],
        Science: ["Matter", "Atoms & Molecules", "Cell Biology", "Tissues", "Motion", "Force & Laws", "Gravitation", "Work & Energy", "Sound", "Natural Resources"],
      },
      duration: "Full Academic Year", sessions: "3 per week", batchSize: "Max 8 students",
    },
    {
      class: "Class 10", icon: "🏆", color: "#7C3AED", bg: "#F3EEFF",
      desc: "Board exam mastery. Complete coverage of CBSE syllabus with Olympiad preparation.",
      topics: {
        Math: ["Real Numbers", "Polynomials", "Linear Equations", "Quadratic Equations", "Arithmetic Progressions", "Triangles", "Coordinate Geometry", "Trigonometry", "Circles", "Constructions", "Mensuration", "Statistics", "Probability"],
        Science: ["Chemical Reactions", "Acids & Bases", "Metals & Non-metals", "Carbon Compounds", "Life Processes", "Control & Coordination", "Reproduction", "Heredity", "Light", "Electricity", "Magnetic Effects", "Environment"],
      },
      duration: "Full Academic Year", sessions: "4 per week", batchSize: "Max 6 students",
    },
  ];

  const [openClass, setOpenClass] = useState(null);
  const [openSubject, setOpenSubject] = useState("Math");

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div style={{ display: "inline-block", background: "#EBF5FF", color: "#1A56DB", borderRadius: 20, padding: "5px 16px", fontSize: 12, fontWeight: 700, marginBottom: 14 }}>COURSES OFFERED</div>
        <h1 className="section-title" style={{ fontSize: 44, color: "#0f1f5c", fontWeight: 700 }}>Complete Year Courses</h1>
        <p style={{ color: "#6B7280", fontSize: 15, marginTop: 12, maxWidth: 560, margin: "12px auto 0" }}>Full academic year coaching in Mathematics and Science for Class 8, 9 and 10 — aligned with CBSE curriculum.</p>
      </div>

      {/* Course cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 50 }}>
        {courses.map(c => (
          <div key={c.class} className="card-hover" style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid #F3F4F6" }}>
            <div style={{ background: c.bg, padding: "28px 26px 22px", borderBottom: `3px solid ${c.color}` }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{c.icon}</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: c.color, marginBottom: 8 }}>{c.class}</h2>
              <p style={{ color: "#374151", fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
            </div>
            <div style={{ padding: "20px 26px" }}>
              {[["📅", c.duration], ["🕐", c.sessions], ["👥", c.batchSize]].map(([icon, val]) => (
                <div key={val} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ color: "#374151", fontSize: 13 }}>{val}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <span style={{ fontSize: 11, background: "#EBF5FF", color: "#1A56DB", borderRadius: 6, padding: "4px 10px", fontWeight: 700 }}>Mathematics</span>
                <span style={{ fontSize: 11, background: "#ECFDF5", color: "#059669", borderRadius: 6, padding: "4px 10px", fontWeight: 700 }}>Science</span>
              </div>
              <button onClick={() => { setOpenClass(openClass === c.class ? null : c.class); setOpenSubject("Math"); }}
                style={{ width: "100%", marginTop: 16, padding: "10px 0", borderRadius: 8, background: c.color, color: "white", fontSize: 13, fontWeight: 700 }}>
                {openClass === c.class ? "Hide Syllabus ▲" : "View Syllabus ▼"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Syllabus expand */}
      {openClass && (() => {
        const c = courses.find(x => x.class === openClass);
        return (
          <div style={{ background: "white", borderRadius: 20, padding: "32px 36px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `2px solid ${c.color}`, marginBottom: 40, animation: "fadeUp 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <h3 className="section-title" style={{ fontSize: 28, color: "#0f1f5c", fontWeight: 700 }}>{c.class} — Detailed Syllabus</h3>
              <div style={{ display: "flex", gap: 8 }}>
                {["Math", "Science"].map(sub => (
                  <button key={sub} onClick={() => setOpenSubject(sub)} className="qbank-btn"
                    style={{ padding: "8px 20px", borderRadius: 8, border: `1.5px solid ${c.color}`, color: openSubject === sub ? "white" : c.color, background: openSubject === sub ? c.color : "transparent", fontSize: 13, fontWeight: 600 }}>
                    {sub === "Math" ? "📐 Mathematics" : "🔬 Science"}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 10 }}>
              {c.topics[openSubject].map((t, i) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: c.bg, borderRadius: 8 }}>
                  <span style={{ color: c.color, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ color: "#374151", fontSize: 13 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Included features */}
      <div style={{ background: "linear-gradient(135deg,#0f1f5c,#1A56DB)", borderRadius: 20, padding: "40px 44px", color: "white" }}>
        <h2 className="section-title" style={{ fontSize: 32, fontWeight: 700, marginBottom: 28, textAlign: "center" }}>Every Course Includes</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[
            { icon: "📋", title: "Daily Assignments", desc: "Practice problems after every class" },
            { icon: "📤", title: "Homework Feedback", desc: "Detailed review of submitted work" },
            { icon: "📚", title: "Lecture Notes", desc: "Comprehensive notes after each session" },
            { icon: "💬", title: "Doubt Forum", desc: "Ask questions anytime through our portal" },
            { icon: "🏆", title: "Olympiad Prep", desc: "Special higher-order problems included" },
            { icon: "📊", title: "Progress Reports", desc: "Monthly performance updates to parents" },
            { icon: "📝", title: "Mock Tests", desc: "Board pattern full tests before exams" },
            { icon: "🎯", title: "Question Bank", desc: "Curated CBSE and Olympiad questions" },
          ].map(f => (
            <div key={f.title} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "18px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 11, opacity: 0.75, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── RESULTS SECTION ───────────────────────────────────────────────────────────
function ResultsSection() {
  const [activeYear, setActiveYear] = useState(2026);
  const result = RESULTS.find(r => r.year === activeYear);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div style={{ display: "inline-block", background: "#FEF9C3", color: "#D97706", borderRadius: 20, padding: "5px 16px", fontSize: 12, fontWeight: 700, marginBottom: 14 }}>OUR RESULTS</div>
        <h1 className="section-title" style={{ fontSize: 44, color: "#0f1f5c", fontWeight: 700 }}>Excellence Since 2018</h1>
        <p style={{ color: "#6B7280", fontSize: 15, marginTop: 12 }}>Consistent top performance in CBSE Board Exams and Olympiads year after year</p>
      </div>

      {/* Overall stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 48 }}>
        {[
          { val: "137+", label: "Total Students (2022–26)", icon: "👨‍🎓", color: "#1A56DB" },
          { val: "99%", label: "Overall Pass Rate", icon: "✅", color: "#059669" },
          { val: "91%+", label: "Average Score", icon: "📊", color: "#7C3AED" },
          { val: "25+", label: "Olympiad Achievers", icon: "🥇", color: "#D97706" },
        ].map(s => (
          <div key={s.label} className="card-hover" style={{ background: "white", borderRadius: 16, padding: "24px 20px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>{s.icon}</div>
            <div className="stat-num" style={{ fontSize: 30, fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Year selector */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 36, flexWrap: "wrap" }}>
        {RESULTS.map(r => (
          <button key={r.year} onClick={() => setActiveYear(r.year)} className="qbank-btn"
            style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #1A56DB", color: activeYear === r.year ? "white" : "#1A56DB", background: activeYear === r.year ? "#1A56DB" : "transparent", fontSize: 14, fontWeight: 700 }}>
            {r.year}
          </button>
        ))}
      </div>

      {/* Year detail */}
      {result && (
        <div style={{ animation: "fadeUp 0.3s ease" }}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #F3F4F6", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 30, flexWrap: "wrap", gap: 16 }}>
              <div>
                <h2 className="section-title" style={{ fontSize: 36, color: "#0f1f5c", fontWeight: 700 }}>Class of {result.year}</h2>
                <p style={{ color: "#6B7280", fontSize: 14, marginTop: 4 }}>CBSE Board Examination Results</p>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                {[
                  { val: result.students, label: "Students", color: "#1A56DB" },
                  { val: result.passRate + "%", label: "Pass Rate", color: "#059669" },
                  { val: result.avgScore, label: "Avg Score", color: "#7C3AED" },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center", padding: "14px 20px", background: s.color + "10", borderRadius: 12 }}>
                    <div className="stat-num" style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 16 }}>🏆 Top Performers</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {result.toppers.map((t, i) => (
                <div key={t.name} style={{ background: i === 0 ? "linear-gradient(135deg,#FEF08A,#FDE047)" : i === 1 ? "linear-gradient(135deg,#E5E7EB,#D1D5DB)" : "linear-gradient(135deg,#FEDDBA,#FEC89A)", borderRadius: 14, padding: "20px 22px" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 4 }}>{t.name}</div>
                  <div className="stat-num" style={{ fontSize: 22, fontWeight: 700, color: i === 0 ? "#92400E" : "#374151" }}>{t.score}</div>
                  <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>{t.subject}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ background: "white", borderRadius: 16, padding: "28px 32px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Score Distribution</h3>
            {[["90–100%", 65, "#059669"], ["80–90%", 25, "#1A56DB"], ["70–80%", 8, "#D97706"], ["Below 70%", 2, "#DC2626"]].map(([label, pct, color]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#374151" }}>{label}</span>
                  <span className="stat-num" style={{ fontSize: 13, color, fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{ height: 10, background: "#F3F4F6", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 10, transition: "width 0.8s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── QUESTION BANK SECTION ─────────────────────────────────────────────────────
function QuestionBankSection() {
  const [subject, setSubject] = useState(null);
  const [cls, setCls] = useState(null);
  const [type, setType] = useState(null);
  const [showAns, setShowAns] = useState({});

  const questions = subject && cls && type ? QUESTION_BANK[subject]?.[cls]?.[type] || [] : [];

  const reset = (level) => {
    if (level <= 0) { setSubject(null); setCls(null); setType(null); }
    if (level <= 1) { setCls(null); setType(null); }
    if (level <= 2) { setType(null); }
    setShowAns({});
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div style={{ display: "inline-block", background: "#F3EEFF", color: "#7C3AED", borderRadius: 20, padding: "5px 16px", fontSize: 12, fontWeight: 700, marginBottom: 14 }}>QUESTION BANK</div>
        <h1 className="section-title" style={{ fontSize: 44, color: "#0f1f5c", fontWeight: 700 }}>Practice Makes Perfect</h1>
        <p style={{ color: "#6B7280", fontSize: 15, marginTop: 12 }}>Curated questions for CBSE Board exams and Olympiad preparation</p>
      </div>

      {/* Breadcrumb */}
      {(subject || cls || type) && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          <button onClick={() => reset(0)} style={{ background: "#EBF5FF", color: "#1A56DB", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>Question Bank</button>
          {subject && <><span style={{ color: "#9CA3AF" }}>›</span><button onClick={() => reset(1)} style={{ background: "#EBF5FF", color: "#1A56DB", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{subject}</button></>}
          {cls && <><span style={{ color: "#9CA3AF" }}>›</span><button onClick={() => reset(2)} style={{ background: "#EBF5FF", color: "#1A56DB", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{cls}</button></>}
          {type && <><span style={{ color: "#9CA3AF" }}>›</span><span style={{ background: "#F3EEFF", color: "#7C3AED", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{type}</span></>}
        </div>
      )}

      {/* Level 1: Subject */}
      {!subject && (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 20, textAlign: "center" }}>Select Subject</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 700, margin: "0 auto" }}>
            {[
              { id: "Mathematics", icon: "📐", color: "#1A56DB", bg: "#EBF5FF", desc: "Algebra, Geometry, Mensuration, Statistics and more" },
              { id: "Science", icon: "🔬", color: "#059669", bg: "#ECFDF5", desc: "Physics, Chemistry and Biology — all chapters covered" },
            ].map(s => (
              <div key={s.id} className="card-hover" onClick={() => setSubject(s.id)}
                style={{ background: "white", borderRadius: 20, padding: "40px 32px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: `2px solid ${s.color}20`, cursor: "pointer" }}>
                <div style={{ width: 80, height: 80, borderRadius: 20, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, margin: "0 auto 20px" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: s.color, marginBottom: 10 }}>{s.id}</h3>
                <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
                <button style={{ marginTop: 20, padding: "10px 24px", borderRadius: 8, background: s.color, color: "white", fontSize: 13, fontWeight: 700 }}>Select →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level 2: Class */}
      {subject && !cls && (
        <div style={{ animation: "fadeUp 0.3s ease" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 20, textAlign: "center" }}>Select Class — {subject}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 800, margin: "0 auto" }}>
            {["Class VIII", "Class IX", "Class X"].map((c, i) => {
              const colors = ["#059669", "#1A56DB", "#7C3AED"];
              const bgs = ["#ECFDF5", "#EBF5FF", "#F3EEFF"];
              const icons = ["🌱", "📈", "🏆"];
              const qCount = Object.values(QUESTION_BANK[subject]?.[c] || {}).reduce((a, v) => a + v.length, 0);
              return (
                <div key={c} className="card-hover" onClick={() => setCls(c)}
                  style={{ background: "white", borderRadius: 18, padding: "32px 24px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: `2px solid ${colors[i]}20`, cursor: "pointer" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: bgs[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px" }}>{icons[i]}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: colors[i], marginBottom: 8 }}>{c}</h3>
                  <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 16 }}>{qCount} Questions Available</p>
                  <button style={{ padding: "8px 20px", borderRadius: 8, background: colors[i], color: "white", fontSize: 12, fontWeight: 700 }}>Choose →</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Level 3: Type */}
      {subject && cls && !type && (
        <div style={{ animation: "fadeUp 0.3s ease" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 20, textAlign: "center" }}>{subject} — {cls}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 700, margin: "0 auto" }}>
            {[
              { id: "CBSE Board", icon: "📋", color: "#1A56DB", bg: "#EBF5FF", desc: "Chapter-wise questions aligned with CBSE board exam pattern", tag: "Board Exam" },
              { id: "Olympiads", icon: "🏆", color: "#D97706", bg: "#FFFBEB", desc: "Higher-order thinking questions for IMO, NSO and other Olympiads", tag: "Olympiad" },
            ].map(t => {
              const qCount = QUESTION_BANK[subject]?.[cls]?.[t.id]?.length || 0;
              return (
                <div key={t.id} className="card-hover" onClick={() => setType(t.id)}
                  style={{ background: "white", borderRadius: 20, padding: "36px 30px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: `2px solid ${t.color}20`, cursor: "pointer" }}>
                  <div style={{ width: 72, height: 72, borderRadius: 18, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 18px" }}>{t.icon}</div>
                  <div style={{ fontSize: 11, background: t.color + "18", color: t.color, borderRadius: 6, padding: "3px 10px", fontWeight: 700, display: "inline-block", marginBottom: 10 }}>{t.tag}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 700, color: t.color, marginBottom: 8 }}>{t.id}</h3>
                  <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{t.desc}</p>
                  <p style={{ color: t.color, fontSize: 13, fontWeight: 700, marginBottom: 14 }}>{qCount} Questions</p>
                  <button style={{ padding: "10px 24px", borderRadius: 8, background: t.color, color: "white", fontSize: 13, fontWeight: 700 }}>Start Practice →</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Level 4: Questions */}
      {subject && cls && type && (
        <div style={{ animation: "fadeUp 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 className="section-title" style={{ fontSize: 28, color: "#0f1f5c", fontWeight: 700 }}>{subject} — {cls} — {type}</h2>
              <p style={{ color: "#6B7280", fontSize: 13, marginTop: 4 }}>{questions.length} questions · Click to reveal answers</p>
            </div>
            <button onClick={() => setShowAns(questions.reduce((a, q) => ({ ...a, [q.id]: true }), {}))}
              style={{ padding: "10px 20px", borderRadius: 8, background: "#F3EEFF", color: "#7C3AED", fontSize: 13, fontWeight: 700 }}>
              Show All Answers
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {questions.map((q, i) => (
              <div key={q.id} style={{ background: "white", borderRadius: 16, padding: "22px 26px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, color: "#1A56DB", background: "#EBF5FF", borderRadius: 6, padding: "2px 8px" }}>Q{i + 1}</span>
                      <span style={{ fontSize: 11, color: "#6B7280" }}>{q.marks} marks</span>
                    </div>
                    <p style={{ color: "#111827", fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}>{q.q}</p>
                  </div>
                  <button onClick={() => setShowAns(p => ({ ...p, [q.id]: !p[q.id] }))}
                    style={{ flexShrink: 0, padding: "8px 16px", borderRadius: 8, background: showAns[q.id] ? "#ECFDF5" : "#EBF5FF", color: showAns[q.id] ? "#059669" : "#1A56DB", fontSize: 12, fontWeight: 700 }}>
                    {showAns[q.id] ? "Hide Ans" : "Show Ans"}
                  </button>
                </div>
                {showAns[q.id] && (
                  <div style={{ marginTop: 16, padding: "14px 18px", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, animation: "fadeUp 0.2s ease" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#059669", marginBottom: 6 }}>✅ ANSWER</div>
                    <p style={{ color: "#166534", fontSize: 14, lineHeight: 1.7 }}>{q.ans}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
