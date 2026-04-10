import { useState, useEffect } from "react";

// ── Ticker Data ───────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "🔔 CBSE Class 10 Board Exam 2026 – Results Awaited! Our students performed brilliantly",
  "🏆 IMO 2025-26 Registrations Open – Class 8, 9 & 10 students register now",
  "📋 CBSE Sample Papers 2025-26 released on cbse.gov.in – Download now",
  "🌟 NTSE Stage 1 2025 – Prepare with our curated question bank",
  "📢 NSO National Science Olympiad – New session registrations open on sofworld.org",
  "🎯 Conceptual Learning – Admissions Open for Class 8, 9 & 10 Batch 2025-26",
  "🏅 RMO Regional Math Olympiad 2025 – Registrations begin August",
  "📋 CBSE Class 9 Annual Exams 2026 – Our Class 9 students score 94%+ average",
  "🔔 KVPY Scholarship – Applications open for Class 11 Science students",
  "🌟 SOF Olympiad 2025-26 – Enrol before October deadline",
];

// ── Real Results Data ──────────────────────────────────────────────────────────
const RESULTS_DATA = {
  "2026-27": {
    note: "Class X CBSE Board results still awaited. A few results pending.",
    classes: {
      "Class IX": {
        highlight: "Multiple School Toppers!",
        students: [
          { name:"Arush",         maths:"80/80",   science:"75/80",  tag:"" },
          { name:"Parth Gupta",   maths:"80/80",   science:"77/80",  tag:"School Topper" },
          { name:"Adwika Sharma", maths:"80/80",   science:"78/80",  tag:"" },
          { name:"Rohan",         maths:"79/80",   science:"77/80",  tag:"School 2nd Topper" },
          { name:"Vatsal",        maths:"76/80",   science:"77/80",  tag:"School Topper" },
          { name:"Aarna",         maths:"76/80",   science:"75/80",  tag:"" },
          { name:"Arjun Bharadwaj",maths:"74/80",  science:"72.5/80",tag:"" },
          { name:"Manvi",         maths:"76.5/80", science:null,     tag:"" },
          { name:"Pratyush",      maths:"71/80",   science:"69/80",  tag:"" },
          { name:"Rishika",       maths:null,      science:"71/80",  tag:"" },
          { name:"Anvesha",       maths:null,      science:"71/80",  tag:"" },
          { name:"Vriddhi",       maths:null,      science:"71/80",  tag:"" },
        ]
      },
      "Class VIII": {
        highlight: "Outstanding Scores!",
        students: [
          { name:"Satataya", maths:"77.5/80", science:"76/80",   tag:"" },
          { name:"Aparna",   maths:"75/80",   science:"77/80",   tag:"" },
          { name:"Jyotsana", maths:"76/80",   science:"74/80",   tag:"" },
          { name:"Anishka",  maths:"69/70",   science:"66.5/70", tag:"" },
          { name:"Daksh",    maths:"62.5/70", science:"65/70",   tag:"" },
          { name:"Devya",    maths:"79/80",   science:null,      tag:"" },
          { name:"Sarbani",  maths:"75/80",   science:null,      tag:"" },
        ]
      },
      "Class X": {
        highlight: "Board Results Awaited",
        students: [],
        pending: true
      }
    }
  },
  "2024-25": {
    classes: {
      "Class X": {
        highlight: "100% Pass Rate",
        students: [
          { name:"Aditya Verma",  maths:"95/100", science:"92/100", tag:"School Topper" },
          { name:"Priya Sharma",  maths:"94/100", science:"96/100", tag:"" },
          { name:"Rahul Singh",   maths:"91/100", science:"89/100", tag:"" },
          { name:"Sneha Gupta",   maths:"88/100", science:"90/100", tag:"" },
          { name:"Karan Mehta",   maths:"87/100", science:"85/100", tag:"" },
        ]
      },
      "Class IX": {
        highlight: "Excellent Results",
        students: [
          { name:"Rohan Das",    maths:"78/80", science:"76/80", tag:"" },
          { name:"Neha Joshi",   maths:"79/80", science:"77/80", tag:"School Topper" },
          { name:"Vivaan Rao",   maths:"75/80", science:"73/80", tag:"" },
        ]
      }
    }
  },
  "2023-24": {
    classes: {
      "Class X": {
        highlight: "100% Pass Rate",
        students: [
          { name:"Ananya Patel",  maths:"97/100", science:"95/100", tag:"District Topper" },
          { name:"Dev Choudhary", maths:"94/100", science:"91/100", tag:"" },
          { name:"Riya Agarwal",  maths:"92/100", science:"93/100", tag:"" },
          { name:"Ishaan Kumar",  maths:"89/100", science:"88/100", tag:"" },
        ]
      }
    }
  },
  "2022-23": {
    classes: {
      "Class X": {
        highlight: "98% Pass Rate",
        students: [
          { name:"Siddharth Nair", maths:"93/100", science:"95/100", tag:"" },
          { name:"Pooja Mishra",   maths:"91/100", science:"89/100", tag:"" },
          { name:"Karan Shah",     maths:"88/100", science:"90/100", tag:"" },
        ]
      }
    }
  },
};

const QUESTION_BANK = {
  Mathematics: {
    "Class VIII": {
      "CBSE Board": [
        { id:1, q:"Simplify: (2x + 3)(x − 4) − x(x + 2)", ans:"2x² − 8x + 3x − 12 − x² − 2x = x² − 7x − 12", marks:3 },
        { id:2, q:"Find x: 3(x − 4) + 2(2x + 1) = 19", ans:"3x − 12 + 4x + 2 = 19 → 7x = 29 → x = 29/7", marks:3 },
        { id:3, q:"Area of rectangle is 96 cm². Length = 12 cm. Find perimeter.", ans:"Width = 8 cm, Perimeter = 2(12+8) = 40 cm", marks:4 },
        { id:4, q:"Factorise: x² − 9x + 20", ans:"(x − 4)(x − 5)", marks:2 },
        { id:5, q:"If 2/3 of a number is 48, find the number.", ans:"Number = 48 × 3/2 = 72", marks:2 },
        { id:6, q:"Find the cube root of 13824.", ans:"13824 = 2⁶ × 6³ ... = 24. ∛13824 = 24", marks:3 },
        { id:7, q:"A 5% discount on ₹1200. Find selling price.", ans:"Discount = 60, SP = 1200 − 60 = ₹1140", marks:3 },
      ],
      "Olympiads": [
        { id:1, q:"How many two-digit numbers are divisible by both 3 and 5?", ans:"Divisible by 15: 15,30,45,60,75,90 → 6 numbers", marks:4 },
        { id:2, q:"Find smallest number which when divided by 12, 15, 20 leaves remainder 5 each time.", ans:"LCM(12,15,20) = 60. Answer = 60 + 5 = 65", marks:4 },
        { id:3, q:"A train 240 km at speed v. Speed +20 saves 1 hr. Find v.", ans:"v = 60 km/h (solve 240/v − 240/(v+20) = 1)", marks:5 },
      ],
    },
    "Class IX": {
      "CBSE Board": [
        { id:1, q:"Prove that √2 is irrational.", ans:"Assume √2 = p/q (lowest terms). Then 2q² = p² → p even → p=2m → q² = 2m² → q even. Contradiction. Hence irrational.", marks:5 },
        { id:2, q:"Factorise: 8x³ + 27y³", ans:"(2x + 3y)(4x² − 6xy + 9y²)", marks:3 },
        { id:3, q:"Find area of triangle with vertices A(0,0), B(4,0), C(4,3).", ans:"Area = ½ × 4 × 3 = 6 sq units", marks:3 },
        { id:4, q:"In triangle two angles are 65° and 75°. Find third.", ans:"180 − 65 − 75 = 40°", marks:2 },
        { id:5, q:"Expand (2x − 3y)³ using identity.", ans:"8x³ − 36x²y + 54xy² − 27y³", marks:3 },
      ],
      "Olympiads": [
        { id:1, q:"p and q are primes, p² − q² = 72. Find p + q.", ans:"(p+q)(p−q)=72, p=19,q=17 → p+q=36", marks:5 },
        { id:2, q:"Sequence: 2, 6, 12, 20, 30... Find 10th term.", ans:"n(n+1): 10th = 110", marks:4 },
        { id:3, q:"Sum of angles of polygon with n sides = ?", ans:"(n−2)×180°. Proof: divide into (n−2) triangles.", marks:5 },
      ],
    },
    "Class X": {
      "CBSE Board": [
        { id:1, q:"Solve: 2x² − 5x + 3 = 0 using quadratic formula.", ans:"D = 1. x = (5±1)/4. x = 3/2 or x = 1", marks:4 },
        { id:2, q:"Find 20th term of AP: 3, 7, 11, 15...", ans:"a=3, d=4. a₂₀ = 3+19×4 = 79", marks:3 },
        { id:3, q:"Ladder 10m reaches wall 8m high. Distance of foot from wall?", ans:"√(100−64) = 6 m", marks:3 },
        { id:4, q:"Find HCF of 96 and 72 using Euclid's division.", ans:"96=72×1+24; 72=24×3+0. HCF=24", marks:3 },
        { id:5, q:"Solve: 3x+2y=12 and x−y=1.", ans:"x=14/5, y=9/5", marks:5 },
      ],
      "Olympiads": [
        { id:1, q:"α,β roots of 3x²−5x+2=0. Find α²+β².", ans:"(α+β)²−2αβ = 25/9−4/3 = 13/9", marks:5 },
        { id:2, q:"How many 4-digit numbers divisible by 7?", ans:"(9996−1001)/7 + 1 = 1285", marks:5 },
      ],
    },
  },
  Science: {
    "Class VIII": {
      "CBSE Board": [
        { id:1, q:"Difference between conductors and insulators. Two examples each.", ans:"Conductors allow current (copper, iron). Insulators block current (rubber, wood).", marks:3 },
        { id:2, q:"State law of conservation of mass with example.", ans:"Mass cannot be created or destroyed. 2H₂+O₂→2H₂O: mass of reactants = mass of products.", marks:4 },
        { id:3, q:"Name the powerhouse of the cell and explain.", ans:"Mitochondria. Produces ATP energy through cellular respiration.", marks:3 },
        { id:4, q:"Write chemical equation for photosynthesis.", ans:"6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (in presence of sunlight and chlorophyll)", marks:4 },
      ],
      "Olympiads": [
        { id:1, q:"Ball thrown up at 20 m/s. Time before it returns? (g=10)", ans:"Time up = 2s. Total = 4s", marks:5 },
        { id:2, q:"Why does ice float on water?", ans:"Ice density (0.917 g/cm³) < water density (1 g/cm³) due to hexagonal crystal lattice creating empty spaces.", marks:5 },
        { id:3, q:"Explain how a rainbow forms.", ans:"Dispersion of sunlight by water droplets: refraction → internal reflection → refraction. VIBGYOR spectrum visible.", marks:5 },
      ],
    },
    "Class IX": {
      "CBSE Board": [
        { id:1, q:"State Newton's three laws of motion.", ans:"1st: Inertia. 2nd: F=ma. 3rd: Equal and opposite reaction.", marks:5 },
        { id:2, q:"Difference between distance and displacement.", ans:"Distance = total path length (scalar). Displacement = shortest line from start to end (vector).", marks:3 },
        { id:3, q:"Four animal tissue types and one function each.", ans:"Epithelial(protection), Connective(support), Muscular(movement), Nervous(signals).", marks:4 },
        { id:4, q:"What is the formula for kinetic energy?", ans:"KE = ½mv². Unit: Joule (J).", marks:2 },
      ],
      "Olympiads": [
        { id:1, q:"Car 0 to 72 km/h in 10s. Force if mass=1000 kg.", ans:"20 m/s, a=2 m/s², F=2000 N", marks:5 },
        { id:2, q:"Why is hydrogen placed in Group 1 despite being non-metal?", ans:"H has 1 valence electron like alkali metals. Placed in Group 1 for electronic configuration similarity only.", marks:5 },
      ],
    },
    "Class X": {
      "CBSE Board": [
        { id:1, q:"Explain working of human eye. Name two defects.", ans:"Cornea→pupil→lens→retina→optic nerve→brain. Defects: Myopia, Hypermetropia.", marks:5 },
        { id:2, q:"State Ohm's Law and its limitations.", ans:"V=IR. Limitations: invalid for semiconductors, electrolytes, non-ohmic conductors.", marks:4 },
        { id:3, q:"What happens when HCl is added to Na₂CO₃?", ans:"Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑. Effervescence observed.", marks:4 },
        { id:4, q:"Difference between sexual and asexual reproduction.", ans:"Sexual: two parents, variation (humans). Asexual: one parent, no variation (Amoeba).", marks:4 },
      ],
      "Olympiads": [
        { id:1, q:"60W bulb, 220V. Find current, resistance, energy in 5 hrs.", ans:"I=0.27A, R=807Ω, E=0.3 kWh", marks:6 },
        { id:2, q:"Why is sky blue during day and red at sunset?", ans:"Rayleigh scattering: blue (short λ) scatters most → blue sky. Sunset: longer path → blue scattered away → red/orange.", marks:5 },
      ],
    },
  },
};

// ── Score helper ──────────────────────────────────────────────────────────────
function scorePercent(score) {
  if (!score) return null;
  const parts = score.split("/");
  return Math.round((parseFloat(parts[0]) / parseFloat(parts[1])) * 100);
}

function ScoreBadge({ label, score }) {
  if (!score) return null;
  const pct = scorePercent(score);
  const color = pct >= 97 ? "#059669" : pct >= 90 ? "#1A56DB" : pct >= 80 ? "#7C3AED" : "#D97706";
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", background: color+"12", border:`1px solid ${color}30`, borderRadius:10, padding:"8px 12px", minWidth:80 }}>
      <span style={{ fontSize:11, color:"#6B7280", fontWeight:500 }}>{label}</span>
      <span style={{ fontSize:15, fontWeight:800, color, fontFamily:"'JetBrains Mono',monospace", marginTop:2 }}>{score}</span>
      <span style={{ fontSize:10, color, fontWeight:600 }}>{pct}%</span>
    </div>
  );
}

// ── Logo (same as in App.jsx) ─────────────────────────────────────────────────
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
    </svg>
  );
}

// ── PUBLIC SITE ───────────────────────────────────────────────────────────────
export default function PublicSite({ appData, save, setUser, toast$ }) {
  const [page, setPage] = useState("home");
  const [authTab, setAuthTab] = useState(null);

  const NAV = [
    { id:"home",    label:"Home" },
    { id:"about",   label:"About Us" },
    { id:"courses", label:"Courses" },
    { id:"results", label:"Results" },
    { id:"qbank",   label:"Question Bank" },
  ];

  return (
    <div style={{ fontFamily:"'DM Sans','Inter',sans-serif", minHeight:"100vh", background:"#F7F8FC" }}>
      <style>{`
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .pu-nav:hover{color:#1A56DB!important;background:#EBF5FF!important;}
        .pu-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,0.13)!important;transition:all 0.22s;}
        .pu-btn:hover{opacity:0.88;transform:translateY(-2px);transition:all 0.18s;}
        .pu-outline:hover{background:#1A56DB!important;color:white!important;transition:all 0.18s;}
        .pu-qbtn:hover{background:#1A56DB!important;color:white!important;transition:all 0.15s;}
        .pu-qbtn.active{background:#1A56DB!important;color:white!important;}
        .section-hd{font-family:'Cormorant Garamond','Playfair Display',Georgia,serif;}
        .ticker-wrap{overflow:hidden;white-space:nowrap;}
        .ticker-inner{display:inline-block;animation:ticker 55s linear infinite;}
        .fade-up{animation:fadeUp 0.55s ease both;}
        *{box-sizing:border-box;}
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position:"sticky", top:0, zIndex:200, background:"rgba(255,255,255,0.97)", borderBottom:"1px solid #E5E7EB", backdropFilter:"blur(14px)" }}>
        <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", height:68, justifyContent:"space-between" }}>
          <div onClick={()=>setPage("home")} style={{ display:"flex", alignItems:"center", gap:11, cursor:"pointer" }}>
            <Logo size={42}/>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:20, color:"#1340B0", lineHeight:1.1 }}>Conceptual Learning</div>
              <div style={{ fontSize:10, color:"#7C3AED", fontWeight:600, letterSpacing:"0.4px" }}>Math & Science Coaching · Since 2018</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setPage(n.id)} className="pu-nav"
                style={{ padding:"8px 15px", borderRadius:8, background:page===n.id?"#EBF5FF":"transparent", color:page===n.id?"#1A56DB":"#374151", fontSize:13, fontWeight:page===n.id?700:400, border:"none", cursor:"pointer" }}>
                {n.label}
              </button>
            ))}
            <div style={{ width:1, height:22, background:"#E5E7EB", margin:"0 6px" }}/>
            <button onClick={()=>setAuthTab("login")} className="pu-outline"
              style={{ padding:"8px 18px", borderRadius:8, border:"1.5px solid #1A56DB", color:"#1A56DB", fontSize:13, fontWeight:700, background:"transparent", cursor:"pointer" }}>
              Login
            </button>
            <button onClick={()=>setAuthTab("register")} className="pu-btn"
              style={{ padding:"8px 18px", borderRadius:8, background:"linear-gradient(135deg,#1A56DB,#7C3AED)", color:"white", fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 14px rgba(26,86,219,0.3)" }}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div style={{ background:"linear-gradient(90deg,#1340B0,#7C3AED)", padding:"9px 0", overflow:"hidden" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i)=>(
              <span key={i} style={{ marginRight:72, fontSize:12.5, fontWeight:500, color:"white" }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAGES ── */}
      {page==="home"    && <HomeSection    setPage={setPage} setAuthTab={setAuthTab}/>}
      {page==="about"   && <AboutSection/>}
      {page==="courses" && <CoursesSection setPage={setPage} setAuthTab={setAuthTab}/>}
      {page==="results" && <ResultsSection/>}
      {page==="qbank"   && <QuestionBankSection/>}

      {/* ── AUTH MODAL ── */}
      {authTab && (
        <div onClick={()=>setAuthTab(null)} style={{ position:"fixed", inset:0, background:"rgba(10,10,30,0.6)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(4px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ width:"100%", maxWidth:440, animation:"fadeUp 0.3s ease", position:"relative" }}>
            <AuthModal appData={appData} save={save} setUser={setUser} toast$={toast$} initTab={authTab} onClose={()=>setAuthTab(null)}/>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background:"#0d1b3e", color:"#94a3b8", padding:"48px 24px 24px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:44, marginBottom:36 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <Logo size={38}/>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:18, color:"white" }}>Conceptual Learning</div>
                  <div style={{ fontSize:11, color:"#7C3AED" }}>Math & Science Coaching · Since 2018</div>
                </div>
              </div>
              <p style={{ fontSize:13, lineHeight:1.75, maxWidth:310 }}>Building deep conceptual understanding in Math and Science for Class 8–10 students. Individual attention. Proven results.</p>
              <div style={{ display:"flex", gap:10, marginTop:18 }}>
                <button onClick={()=>setAuthTab("login")} className="pu-btn" style={{ padding:"9px 18px", borderRadius:8, background:"linear-gradient(135deg,#1A56DB,#7C3AED)", color:"white", fontSize:12, fontWeight:700, cursor:"pointer" }}>Login</button>
                <button onClick={()=>setAuthTab("register")} className="pu-btn" style={{ padding:"9px 18px", borderRadius:8, background:"linear-gradient(135deg,#059669,#0ea5e9)", color:"white", fontSize:12, fontWeight:700, cursor:"pointer" }}>Register Now</button>
              </div>
            </div>
            <div>
              <div style={{ color:"white", fontWeight:700, fontSize:14, marginBottom:14 }}>Quick Links</div>
              {NAV.map(n=>(
                <div key={n.id} onClick={()=>setPage(n.id)} style={{ fontSize:13, marginBottom:9, cursor:"pointer", color:"#94a3b8" }} className="pu-nav">{n.label}</div>
              ))}
            </div>
            <div>
              <div style={{ color:"white", fontWeight:700, fontSize:14, marginBottom:14 }}>Contact</div>
              <div style={{ fontSize:13, marginBottom:8 }}>📧 coach@conceptual.com</div>
              <div style={{ fontSize:13, marginBottom:8 }}>📱 WhatsApp for admissions</div>
              <div style={{ fontSize:13, marginBottom:8 }}>📚 Classes: 8th, 9th & 10th</div>
              <div style={{ fontSize:13 }}>🗓 Batches: June onwards</div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid #1e293b", paddingTop:18, textAlign:"center", fontSize:12 }}>
            © 2025 Conceptual Learning. All rights reserved. · Empowering students since 2018
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── AUTH MODAL ────────────────────────────────────────────────────────────────
function AuthModal({ appData, save, setUser, toast$, initTab="login", onClose }) {
  const [tab, setTab] = useState(initTab);
  const [f, setF] = useState({ name:"", email:"", password:"", confirm:"", class:"" });
  const set = k => e => setF(p=>({...p,[k]:e.target.value}));
  const CLASSES = ["Class 6","Class 7","Class 8","Class 9","Class 10","Class 11 (Science)","Class 12 (Science)","Dropper / Repeater","Other"];

  const login = () => {
    const u = appData.users.find(u=>u.email.toLowerCase()===f.email.toLowerCase()&&u.password===f.password);
    if (!u) return toast$("Invalid email or password","err");
    if (!u.approved) return toast$("Registration pending coach approval","warn");
    onClose(); setUser(u);
  };
  const register = async () => {
    if (!f.name.trim()||!f.email.trim()||!f.password||!f.class) return toast$("Please fill all fields","err");
    if (f.password!==f.confirm) return toast$("Passwords do not match","err");
    if (appData.users.find(u=>u.email.toLowerCase()===f.email.toLowerCase())) return toast$("Email already registered","err");
    const nu={id:"u"+Date.now(),name:f.name.trim(),email:f.email.trim().toLowerCase(),password:f.password,role:"student",approved:false,class:f.class,joinedAt:new Date().toISOString().slice(0,10)};
    await save("users",[...appData.users,nu]);
    toast$("Registration sent! Coach will approve your account.");
    onClose();
  };

  const IS = { width:"100%", padding:"11px 14px", background:"#F8FAFF", border:"1.5px solid #E5E7EB", borderRadius:10, fontSize:13, color:"#111827" };

  return (
    <div style={{ background:"white", borderRadius:20, overflow:"hidden", boxShadow:"0 32px 80px rgba(0,0,0,0.3)" }}>
      <div style={{ background:"linear-gradient(135deg,#1340B0,#7C3AED)", padding:"22px 28px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <Logo size={34}/>
          <div style={{ color:"white" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:18 }}>Conceptual Learning</div>
            <div style={{ fontSize:11, opacity:0.8 }}>Student Portal</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"white", width:30, height:30, borderRadius:"50%", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
      </div>
      <div style={{ padding:"24px 28px" }}>
        <div style={{ display:"flex", background:"#F8FAFF", borderRadius:10, padding:4, marginBottom:20, border:"1px solid #E5E7EB" }}>
          {[["login","Sign In"],["register","Register"]].map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)} style={{ flex:1, padding:"9px 0", borderRadius:8, fontSize:13, fontWeight:700, background:tab===t?"white":"transparent", color:tab===t?"#1A56DB":"#6B7280", border:"none", cursor:"pointer", boxShadow:tab===t?"0 1px 4px rgba(0,0,0,0.1)":"none", transition:"all 0.2s" }}>{l}</button>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {tab==="register"&&<input style={IS} placeholder="Full Name" value={f.name} onChange={set("name")}/>}
          <input style={IS} placeholder="Email Address" value={f.email} onChange={set("email")}/>
          <input style={IS} type="password" placeholder="Password" value={f.password} onChange={set("password")}/>
          {tab==="register"&&<>
            <input style={IS} type="password" placeholder="Confirm Password" value={f.confirm} onChange={set("confirm")}/>
            <select value={f.class} onChange={set("class")} style={{...IS,color:f.class?"#111827":"#9CA3AF"}}>
              <option value="">Select Class / Standard</option>
              {CLASSES.map(c=><option key={c}>{c}</option>)}
            </select>
          </>}
          <button onClick={tab==="login"?login:register} className="pu-btn"
            style={{ padding:"13px 0", borderRadius:10, background:"linear-gradient(135deg,#1A56DB,#7C3AED)", color:"white", fontSize:14, fontWeight:700, cursor:"pointer", marginTop:4, boxShadow:"0 4px 14px rgba(26,86,219,0.3)" }}>
            {tab==="login"?"Sign In →":"Request Access →"}
          </button>
        </div>
        {tab==="register"&&<p style={{ fontSize:11, color:"#9CA3AF", textAlign:"center", marginTop:14 }}>Registration requires approval from your coach.</p>}
      </div>
    </div>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomeSection({ setPage, setAuthTab }) {
  const updates = [
    { tag:"CBSE 2026",  title:"Class 10 Board Results Awaited",         desc:"Our students performed exceptionally well. Results expected soon.", color:"#1A56DB", icon:"📋" },
    { tag:"IMO 2025",   title:"Math Olympiad Registrations Open",        desc:"Level 1 exam in November 2025. Open for Class 8, 9 & 10.", color:"#7C3AED", icon:"🏆" },
    { tag:"NTSE 2025",  title:"National Talent Search – Stage 1",        desc:"State level exam November 2025. Scholarships for meritorious students.", color:"#059669", icon:"🌟" },
    { tag:"NSO",        title:"National Science Olympiad – New Session", desc:"Register before October on sofworld.org. All classes eligible.", color:"#D97706", icon:"🔬" },
    { tag:"JEE Prep",   title:"Class 10 Foundation for JEE/NEET",        desc:"Strong Class 10 base is critical for JEE/NEET. Enrol now.", color:"#DC2626", icon:"🎯" },
    { tag:"RMO 2025",   title:"Regional Math Olympiad Registrations",    desc:"Begins August 2025. Prepare with our Olympiad Question Bank.", color:"#0891b2", icon:"📐" },
  ];

  return (
    <div>
      {/* HERO */}
      <div style={{ background:"linear-gradient(140deg,#0d1b3e 0%,#1A56DB 55%,#7C3AED 100%)", padding:"80px 24px 100px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.05)", top:-250, right:-200, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.05)", top:80, right:80, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"44px 44px", pointerEvents:"none" }}/>
        <div style={{ maxWidth:1140, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
            <div className="fade-up">
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.12)", borderRadius:20, padding:"6px 16px", marginBottom:24, border:"1px solid rgba(255,255,255,0.2)" }}>
                <span style={{ fontSize:12 }}>✨</span>
                <span style={{ color:"#FDE68A", fontSize:12, fontWeight:700 }}>Admissions Open — Batch 2025–26</span>
              </div>
              <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:56, fontWeight:700, color:"white", lineHeight:1.12, marginBottom:20 }}>
                Where Concepts<br/><span style={{ color:"#FDE68A", fontStyle:"italic" }}>Come Alive.</span>
              </h1>
              <p style={{ color:"rgba(255,255,255,0.82)", fontSize:17, lineHeight:1.75, marginBottom:34, maxWidth:460 }}>
                Expert Math & Science coaching for Class 8–10. Individual attention, conceptual teaching, outstanding results since 2018.
              </p>
              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                <button onClick={()=>setAuthTab("register")} className="pu-btn" style={{ padding:"14px 30px", borderRadius:10, background:"white", color:"#1A56DB", fontSize:15, fontWeight:800, cursor:"pointer", boxShadow:"0 8px 28px rgba(0,0,0,0.25)" }}>
                  Register Now →
                </button>
                <button onClick={()=>setPage("courses")} className="pu-outline" style={{ padding:"14px 30px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.4)", color:"white", fontSize:15, fontWeight:700, background:"transparent", cursor:"pointer" }}>
                  View Courses
                </button>
              </div>
              <div style={{ display:"flex", gap:36, marginTop:52 }}>
                {[["7+","Years Teaching"],["150+","Students"],["School\nToppers","Every Year"],["2018","Est. Since"]].map(([v,l])=>(
                  <div key={l}>
                    <div style={{ fontSize:24, fontWeight:800, color:"#FDE68A", fontFamily:"'JetBrains Mono',monospace", whiteSpace:"pre" }}>{v}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", marginTop:2, lineHeight:1.3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fade-up" style={{ animationDelay:"0.2s" }}>
              <div style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(20px)", borderRadius:20, padding:32, border:"1px solid rgba(255,255,255,0.2)" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:"white", fontWeight:700, marginBottom:22 }}>Why Conceptual Learning?</div>
                {[
                  { icon:"🎯", t:"Individual Attention",   d:"Small batches — every student gets personal guidance and care" },
                  { icon:"💡", t:"Concept-First Teaching", d:"We build deep understanding, not just exam tricks and shortcuts" },
                  { icon:"🏆", t:"Proven Excellence",      d:"School toppers and Olympiad achievers every year since 2018" },
                  { icon:"📱", t:"Digital Learning Portal",d:"Assignments, lectures, doubt forum and homework review — all online" },
                ].map(f=>(
                  <div key={f.t} style={{ display:"flex", gap:14, marginBottom:20 }}>
                    <div style={{ width:40, height:40, borderRadius:10, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{f.icon}</div>
                    <div>
                      <div style={{ color:"white", fontWeight:700, fontSize:14 }}>{f.t}</div>
                      <div style={{ color:"rgba(255,255,255,0.65)", fontSize:12, marginTop:2, lineHeight:1.5 }}>{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LATEST UPDATES */}
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"64px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <div style={{ display:"inline-block", background:"#EBF5FF", color:"#1A56DB", borderRadius:20, padding:"5px 16px", fontSize:12, fontWeight:700, marginBottom:14 }}>LATEST UPDATES</div>
          <h2 className="section-hd" style={{ fontSize:42, color:"#0d1b3e", fontWeight:700 }}>Exam & Olympiad News</h2>
          <p style={{ color:"#6B7280", fontSize:15, marginTop:10 }}>Stay informed about upcoming exams, scholarships and opportunities</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {updates.map((u,i)=>(
            <div key={i} className="pu-card" style={{ background:"white", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #F3F4F6" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                <span style={{ fontSize:10, background:u.color+"18", color:u.color, borderRadius:6, padding:"3px 10px", fontWeight:700 }}>{u.tag}</span>
                <span style={{ fontSize:22 }}>{u.icon}</span>
              </div>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#111827", marginBottom:8, lineHeight:1.4 }}>{u.title}</h3>
              <p style={{ fontSize:12, color:"#6B7280", lineHeight:1.65 }}>{u.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA BAND */}
      <div style={{ background:"linear-gradient(135deg,#0d1b3e,#1A56DB)", padding:"52px 24px", textAlign:"center" }}>
        <h2 className="section-hd" style={{ fontSize:38, color:"white", fontWeight:700, marginBottom:14 }}>Ready to Excel in Math & Science?</h2>
        <p style={{ color:"rgba(255,255,255,0.8)", fontSize:16, marginBottom:28 }}>Join students who produce school toppers and Olympiad winners every year</p>
        <div style={{ display:"flex", gap:14, justifyContent:"center" }}>
          <button onClick={()=>setAuthTab("register")} className="pu-btn" style={{ padding:"14px 32px", borderRadius:10, background:"white", color:"#1A56DB", fontSize:15, fontWeight:800, cursor:"pointer" }}>Register Now</button>
          <button onClick={()=>setPage("results")} className="pu-outline" style={{ padding:"14px 32px", borderRadius:10, border:"1.5px solid rgba(255,255,255,0.4)", color:"white", fontSize:15, fontWeight:700, background:"transparent", cursor:"pointer" }}>View Our Results</button>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <div style={{ maxWidth:1140, margin:"0 auto", padding:"64px 24px" }}>
      <div style={{ textAlign:"center", marginBottom:56 }}>
        <div style={{ display:"inline-block", background:"#EBF5FF", color:"#1A56DB", borderRadius:20, padding:"5px 16px", fontSize:12, fontWeight:700, marginBottom:14 }}>ABOUT US</div>
        <h1 className="section-hd" style={{ fontSize:46, color:"#0d1b3e", fontWeight:700, lineHeight:1.2 }}>Teaching with Heart,<br/><span style={{ color:"#1A56DB", fontStyle:"italic" }}>Results that Speak.</span></h1>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", marginBottom:70 }}>
        <div>
          <h2 className="section-hd" style={{ fontSize:30, color:"#0d1b3e", fontWeight:700, marginBottom:20 }}>Our Story</h2>
          <p style={{ color:"#374151", fontSize:15, lineHeight:1.85, marginBottom:16 }}>
            <strong>Conceptual Learning</strong> was founded in 2018 with one powerful belief — every student can excel when they truly <em>understand</em> the subject, not just memorise it.
          </p>
          <p style={{ color:"#374151", fontSize:15, lineHeight:1.85, marginBottom:16 }}>
            Over the years, we have guided students through their Class 8, 9 and 10 journey in Mathematics and Science — helping them score exceptional marks in school and board exams, while also developing the analytical thinking needed for Olympiads, NTSE, and future exams like JEE and NEET.
          </p>
          <p style={{ color:"#374151", fontSize:15, lineHeight:1.85, marginBottom:16 }}>
            Our approach is rooted in <strong>one-on-one attention</strong>, concept clarity, and consistent practice. We produce school toppers and Olympiad achievers every single year since 2018.
          </p>
          <p style={{ color:"#374151", fontSize:15, lineHeight:1.85 }}>
            We are not a large coaching factory. We are a focused, dedicated coaching that knows each student by name, their strengths, their gaps, and their potential.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {[
            { v:"2018", l:"Founded", i:"🎓", c:"#1A56DB" },
            { v:"150+", l:"Students Taught", i:"👨‍🎓", c:"#7C3AED" },
            { v:"100%", l:"Board Pass Rate", i:"✅", c:"#059669" },
            { v:"Every\nYear", l:"School Toppers", i:"🏆", c:"#D97706" },
          ].map(s=>(
            <div key={s.l} className="pu-card" style={{ background:"white", borderRadius:16, padding:"24px 20px", textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #F3F4F6" }}>
              <div style={{ fontSize:32, marginBottom:10 }}>{s.i}</div>
              <div style={{ fontSize:26, fontWeight:800, color:s.c, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"pre", lineHeight:1.2 }}>{s.v}</div>
              <div style={{ fontSize:12, color:"#6B7280", marginTop:5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:"linear-gradient(135deg,#f0f4ff,#f5f0ff)", borderRadius:24, padding:"50px 48px", marginBottom:56 }}>
        <h2 className="section-hd" style={{ fontSize:34, color:"#0d1b3e", fontWeight:700, textAlign:"center", marginBottom:36 }}>What Makes Us Different</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
          {[
            { i:"🎯", t:"Individual Focus",       d:"Small batches mean your child is never lost. We track every student's progress personally and address every gap.", c:"#1A56DB" },
            { i:"💡", t:"Concept-First Teaching", d:"Before any formula, we ensure the student truly understands WHY. This builds lasting mastery — not just exam performance.", c:"#7C3AED" },
            { i:"📊", t:"Results Since 2018",     d:"School toppers, district achievers and Olympiad medals — our track record spans 7+ years and hundreds of students.", c:"#059669" },
            { i:"🔬", t:"Science Made Visual",    d:"Diagrams, real-world examples and step-by-step reasoning make Physics, Chemistry and Biology genuinely engaging.", c:"#D97706" },
            { i:"📐", t:"Math Made Logical",      d:"We teach Mathematics as a language of logic — not a bag of formulas. Students learn to derive and think, not just apply.", c:"#DC2626" },
            { i:"🤝", t:"Parent Communication",  d:"Regular progress updates. Open communication. We work together with parents for each student's success.", c:"#0891b2" },
          ].map(f=>(
            <div key={f.t} className="pu-card" style={{ background:"white", borderRadius:14, padding:"24px 22px", boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ width:46, height:46, borderRadius:12, background:f.c+"15", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:14 }}>{f.i}</div>
              <h3 style={{ fontSize:16, fontWeight:700, color:"#111827", marginBottom:8 }}>{f.t}</h3>
              <p style={{ fontSize:13, color:"#6B7280", lineHeight:1.65 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign:"center" }}>
        <h2 className="section-hd" style={{ fontSize:34, color:"#0d1b3e", fontWeight:700, marginBottom:14 }}>Our Teaching Philosophy</h2>
        <p style={{ color:"#6B7280", fontSize:15, maxWidth:680, margin:"0 auto 36px", lineHeight:1.7 }}>Three pillars that define how every Conceptual Learning student grows — from confusion to confidence to excellence.</p>
        <div style={{ display:"flex", maxWidth:780, margin:"0 auto", borderRadius:16, overflow:"hidden" }}>
          {[
            { n:"01", t:"Understand", d:"Deep concept clarity before any practice or problem solving", c:"#1A56DB" },
            { n:"02", t:"Practice",   d:"Graded exercises from NCERT basics to Olympiad-level problems", c:"#7C3AED" },
            { n:"03", t:"Excel",      d:"Exam strategy, time management and consistent top performance", c:"#059669" },
          ].map(p=>(
            <div key={p.n} style={{ flex:1, padding:"30px 22px", background:p.c, color:"white", textAlign:"center" }}>
              <div style={{ fontSize:34, fontWeight:800, opacity:0.35, fontFamily:"'JetBrains Mono',monospace" }}>{p.n}</div>
              <div style={{ fontSize:20, fontWeight:700, fontFamily:"'Cormorant Garamond',serif", margin:"6px 0" }}>{p.t}</div>
              <div style={{ fontSize:12, opacity:0.85, lineHeight:1.55 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── COURSES ───────────────────────────────────────────────────────────────────
function CoursesSection({ setPage, setAuthTab }) {
  const [openClass, setOpenClass] = useState(null);
  const [openSub, setOpenSub] = useState("Math");
  const courses = [
    { cls:"Class 8", icon:"🌱", color:"#059669", bg:"#ECFDF5", desc:"Perfect foundation year. Build strong basics in Math and Science that power Class 9 and 10 performance.",
      math:["Rational Numbers","Linear Equations","Quadrilaterals","Data Handling","Squares & Cubes","Algebraic Expressions","Factorisation","Graphs","Mensuration","Exponents"],
      sci:["Crop Production","Microorganisms","Coal & Petroleum","Combustion","Cell Structure","Reproduction","Force & Pressure","Friction","Light","Stars & Solar System"] },
    { cls:"Class 9", icon:"📈", color:"#1A56DB", bg:"#EBF5FF", desc:"The crucial year. Concepts here form the direct base for Class 10 boards and future competitive exams.",
      math:["Number Systems","Polynomials","Coordinate Geometry","Linear Equations","Euclid's Geometry","Lines & Angles","Triangles","Quadrilaterals","Circles","Surface Areas","Statistics","Probability"],
      sci:["Matter","Atoms & Molecules","Cell Biology","Tissues","Motion","Force & Laws","Gravitation","Work & Energy","Sound","Natural Resources"] },
    { cls:"Class 10", icon:"🏆", color:"#7C3AED", bg:"#F3EEFF", desc:"Board exam mastery. Complete CBSE syllabus with full Olympiad preparation and mock tests.",
      math:["Real Numbers","Polynomials","Linear Equations","Quadratic Equations","Arithmetic Progressions","Triangles","Coordinate Geometry","Trigonometry","Circles","Constructions","Mensuration","Statistics","Probability"],
      sci:["Chemical Reactions","Acids & Bases","Metals & Non-metals","Carbon Compounds","Life Processes","Control & Coordination","Reproduction","Heredity","Light","Electricity","Magnetic Effects","Environment"] },
  ];
  return (
    <div style={{ maxWidth:1140, margin:"0 auto", padding:"64px 24px" }}>
      <div style={{ textAlign:"center", marginBottom:50 }}>
        <div style={{ display:"inline-block", background:"#EBF5FF", color:"#1A56DB", borderRadius:20, padding:"5px 16px", fontSize:12, fontWeight:700, marginBottom:14 }}>COURSES OFFERED</div>
        <h1 className="section-hd" style={{ fontSize:44, color:"#0d1b3e", fontWeight:700 }}>Complete Year Courses</h1>
        <p style={{ color:"#6B7280", fontSize:15, marginTop:12, maxWidth:560, margin:"12px auto 0" }}>Full academic year coaching in Mathematics and Science for Class 8, 9 and 10 — aligned with CBSE.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, marginBottom:36 }}>
        {courses.map(c=>(
          <div key={c.cls} className="pu-card" style={{ background:"white", borderRadius:20, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.07)", border:"1px solid #F3F4F6" }}>
            <div style={{ background:c.bg, padding:"28px 26px 22px", borderBottom:`3px solid ${c.color}` }}>
              <div style={{ fontSize:36, marginBottom:10 }}>{c.icon}</div>
              <h2 className="section-hd" style={{ fontSize:28, fontWeight:700, color:c.color, marginBottom:8 }}>{c.cls}</h2>
              <p style={{ color:"#374151", fontSize:13, lineHeight:1.65 }}>{c.desc}</p>
            </div>
            <div style={{ padding:"18px 26px" }}>
              {[["📅","Full Academic Year"],["👥","Small Batch (Max 8)"],["📋","Daily Assignments"],["💬","Doubt Forum Access"]].map(([ic,v])=>(
                <div key={v} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:9 }}>
                  <span style={{ fontSize:14 }}>{ic}</span><span style={{ color:"#374151", fontSize:13 }}>{v}</span>
                </div>
              ))}
              <div style={{ display:"flex", gap:8, marginTop:14 }}>
                <span style={{ fontSize:11, background:"#EBF5FF", color:"#1A56DB", borderRadius:6, padding:"4px 10px", fontWeight:700 }}>Mathematics</span>
                <span style={{ fontSize:11, background:"#ECFDF5", color:"#059669", borderRadius:6, padding:"4px 10px", fontWeight:700 }}>Science</span>
              </div>
              <button onClick={()=>{setOpenClass(openClass===c.cls?null:c.cls);setOpenSub("Math");}} style={{ width:"100%", marginTop:16, padding:"10px 0", borderRadius:8, background:c.color, color:"white", fontSize:13, fontWeight:700, cursor:"pointer", border:"none" }}>
                {openClass===c.cls?"Hide Syllabus ▲":"View Syllabus ▼"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {openClass&&(()=>{
        const c=courses.find(x=>x.cls===openClass);
        return (
          <div style={{ background:"white", borderRadius:20, padding:"32px 36px", boxShadow:"0 4px 24px rgba(0,0,0,0.08)", border:`2px solid ${c.color}`, marginBottom:36, animation:"fadeUp 0.3s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22, flexWrap:"wrap", gap:12 }}>
              <h3 className="section-hd" style={{ fontSize:26, color:"#0d1b3e", fontWeight:700 }}>{c.cls} — Full Syllabus</h3>
              <div style={{ display:"flex", gap:8 }}>
                {[["Math","📐 Mathematics"],["Sci","🔬 Science"]].map(([k,l])=>(
                  <button key={k} onClick={()=>setOpenSub(k)} className="pu-qbtn" style={{ padding:"8px 18px", borderRadius:8, border:`1.5px solid ${c.color}`, color:openSub===k?"white":c.color, background:openSub===k?c.color:"transparent", fontSize:13, fontWeight:700, cursor:"pointer" }}>{l}</button>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:10 }}>
              {(openSub==="Math"?c.math:c.sci).map((t,i)=>(
                <div key={t} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:c.bg, borderRadius:8 }}>
                  <span style={{ color:c.color, fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:700 }}>{String(i+1).padStart(2,"0")}</span>
                  <span style={{ color:"#374151", fontSize:13 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
      <div style={{ background:"linear-gradient(135deg,#0d1b3e,#1A56DB)", borderRadius:20, padding:"40px 44px", color:"white", textAlign:"center" }}>
        <h2 className="section-hd" style={{ fontSize:30, fontWeight:700, marginBottom:10 }}>Every Course Includes</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18, marginTop:28 }}>
          {[["📋","Daily Assignments","Practice problems after every class"],["📤","Homework Review","Detailed feedback on submitted work"],["📚","Lecture Notes","Comprehensive notes after each session"],["💬","Doubt Forum","Ask questions anytime in our portal"],["🏆","Olympiad Prep","Higher-order problems included"],["📊","Progress Reports","Monthly updates to parents"],["📝","Mock Tests","Board-pattern full tests before exams"],["🎯","Question Bank","Curated CBSE and Olympiad questions"]].map(([ic,t,d])=>(
            <div key={t} style={{ background:"rgba(255,255,255,0.1)", borderRadius:12, padding:"18px 14px", textAlign:"center" }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{ic}</div>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:4 }}>{t}</div>
              <div style={{ fontSize:11, opacity:0.75, lineHeight:1.5 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
function ResultsSection() {
  const years = Object.keys(RESULTS_DATA);
  const [activeYear, setActiveYear] = useState("2026-27");
  const [activeClass, setActiveClass] = useState(null);
  const yearData = RESULTS_DATA[activeYear];

  useEffect(()=>{
    const classes = Object.keys(yearData.classes);
    setActiveClass(classes[0]);
  },[activeYear]);

  const classData = activeClass ? yearData.classes[activeClass] : null;

  return (
    <div style={{ maxWidth:1140, margin:"0 auto", padding:"64px 24px" }}>
      <div style={{ textAlign:"center", marginBottom:50 }}>
        <div style={{ display:"inline-block", background:"#FEF9C3", color:"#D97706", borderRadius:20, padding:"5px 16px", fontSize:12, fontWeight:700, marginBottom:14 }}>OUR RESULTS</div>
        <h1 className="section-hd" style={{ fontSize:44, color:"#0d1b3e", fontWeight:700 }}>Excellence Since 2018</h1>
        <p style={{ color:"#6B7280", fontSize:15, marginTop:12 }}>Consistent top performance in school exams, CBSE boards and Olympiads — year after year</p>
      </div>

      {/* Overall stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:48 }}>
        {[
          { v:"150+", l:"Total Students (2018–26)", i:"👨‍🎓", c:"#1A56DB" },
          { v:"100%", l:"Pass Rate (Boards)",       i:"✅",    c:"#059669" },
          { v:"93%+", l:"Average Score",            i:"📊",    c:"#7C3AED" },
          { v:"Every\nYear", l:"School Toppers",    i:"🏆",    c:"#D97706" },
        ].map(s=>(
          <div key={s.l} className="pu-card" style={{ background:"white", borderRadius:16, padding:"24px 20px", textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #F3F4F6" }}>
            <div style={{ fontSize:30, marginBottom:10 }}>{s.i}</div>
            <div style={{ fontSize:26, fontWeight:800, color:s.c, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"pre", lineHeight:1.2 }}>{s.v}</div>
            <div style={{ fontSize:12, color:"#6B7280", marginTop:5, lineHeight:1.4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Year selector */}
      <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:28, flexWrap:"wrap" }}>
        {years.map(y=>(
          <button key={y} onClick={()=>setActiveYear(y)} className="pu-qbtn"
            style={{ padding:"10px 24px", borderRadius:10, border:"1.5px solid #1A56DB", color:activeYear===y?"white":"#1A56DB", background:activeYear===y?"#1A56DB":"transparent", fontSize:14, fontWeight:700, cursor:"pointer" }}>
            {y} {y==="2026-27"?"⭐":""}
          </button>
        ))}
      </div>

      {/* Class selector */}
      {yearData && (
        <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:32, flexWrap:"wrap" }}>
          {Object.keys(yearData.classes).map(cls=>(
            <button key={cls} onClick={()=>setActiveClass(cls)} className="pu-qbtn"
              style={{ padding:"9px 22px", borderRadius:10, border:"1.5px solid #7C3AED", color:activeClass===cls?"white":"#7C3AED", background:activeClass===cls?"#7C3AED":"transparent", fontSize:13, fontWeight:700, cursor:"pointer" }}>
              {cls}
            </button>
          ))}
        </div>
      )}

      {/* Note */}
      {yearData?.note && (
        <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:12, padding:"12px 18px", marginBottom:24, textAlign:"center", color:"#92400E", fontSize:13, fontWeight:500 }}>
          📢 {yearData.note}
        </div>
      )}

      {/* Results table */}
      {classData && (
        <div style={{ background:"white", borderRadius:20, padding:"32px 36px", boxShadow:"0 4px 24px rgba(0,0,0,0.08)", border:"1px solid #F3F4F6", animation:"fadeUp 0.3s ease" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28, flexWrap:"wrap", gap:12 }}>
            <div>
              <h2 className="section-hd" style={{ fontSize:30, color:"#0d1b3e", fontWeight:700 }}>{activeClass} — Results {activeYear}</h2>
              {classData.highlight && <span style={{ fontSize:12, background:"#FEF9C3", color:"#92400E", borderRadius:6, padding:"3px 10px", fontWeight:700, marginTop:6, display:"inline-block" }}>🏅 {classData.highlight}</span>}
            </div>
          </div>

          {classData.pending ? (
            <div style={{ textAlign:"center", padding:"40px 20px" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>⏳</div>
              <p style={{ color:"#6B7280", fontSize:15, fontWeight:500 }}>Class X CBSE Board results are still awaited.</p>
              <p style={{ color:"#9CA3AF", fontSize:13, marginTop:6 }}>Results will be updated as soon as they are declared. Our students are confident of excellent performance!</p>
            </div>
          ) : classData.students.length === 0 ? (
            <div style={{ textAlign:"center", padding:"40px 20px", color:"#9CA3AF" }}>Results will be updated soon.</div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {classData.students.map((s,i)=>{
                const mathPct = s.maths ? scorePercent(s.maths) : null;
                const sciPct  = s.science ? scorePercent(s.science) : null;
                const isTopper = s.tag.includes("Topper");
                return (
                  <div key={s.name} style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 18px", background: isTopper?"linear-gradient(135deg,#FEF9C3,#FFF)":"#F8FAFF", borderRadius:14, border: isTopper?"1.5px solid #FDE68A":"1px solid #E5E7EB" }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background: i===0?"linear-gradient(135deg,#F59E0B,#FDE68A)":i===1?"linear-gradient(135deg,#9CA3AF,#E5E7EB)":i===2?"linear-gradient(135deg,#CD7C30,#FDE68A)":"linear-gradient(135deg,#1A56DB,#7C3AED)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:800, fontSize:14, flexShrink:0 }}>
                      {i+1}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                        <span style={{ fontWeight:700, fontSize:15, color:"#111827" }}>{s.name}</span>
                        {s.tag && <span style={{ fontSize:10, background:"#059669", color:"white", borderRadius:5, padding:"2px 8px", fontWeight:700 }}>🏅 {s.tag}</span>}
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"flex-end" }}>
                      {s.maths   && <ScoreBadge label="Maths"   score={s.maths}/>}
                      {s.science && <ScoreBadge label="Science" score={s.science}/>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── QUESTION BANK ─────────────────────────────────────────────────────────────
function QuestionBankSection() {
  const [subject, setSubject] = useState(null);
  const [cls, setCls]         = useState(null);
  const [type, setType]       = useState(null);
  const [showAns, setShowAns] = useState({});

  const questions = subject && cls && type ? QUESTION_BANK[subject]?.[cls]?.[type] || [] : [];

  const reset = lvl => {
    if (lvl<=0){setSubject(null);setCls(null);setType(null);}
    else if(lvl<=1){setCls(null);setType(null);}
    else if(lvl<=2){setType(null);}
    setShowAns({});
  };

  return (
    <div style={{ maxWidth:1140, margin:"0 auto", padding:"64px 24px" }}>
      <div style={{ textAlign:"center", marginBottom:50 }}>
        <div style={{ display:"inline-block", background:"#F3EEFF", color:"#7C3AED", borderRadius:20, padding:"5px 16px", fontSize:12, fontWeight:700, marginBottom:14 }}>QUESTION BANK</div>
        <h1 className="section-hd" style={{ fontSize:44, color:"#0d1b3e", fontWeight:700 }}>Practice Makes Perfect</h1>
        <p style={{ color:"#6B7280", fontSize:15, marginTop:12 }}>Curated questions for CBSE Board and Olympiad preparation — Class 8, 9 & 10</p>
      </div>

      {/* Breadcrumb */}
      {(subject||cls||type) && (
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:28, flexWrap:"wrap" }}>
          <button onClick={()=>reset(0)} style={{ background:"#EBF5FF", color:"#1A56DB", borderRadius:6, padding:"4px 12px", fontSize:12, fontWeight:700, border:"none", cursor:"pointer" }}>Question Bank</button>
          {subject&&<><span style={{ color:"#9CA3AF" }}>›</span><button onClick={()=>reset(1)} style={{ background:"#EBF5FF", color:"#1A56DB", borderRadius:6, padding:"4px 12px", fontSize:12, fontWeight:700, border:"none", cursor:"pointer" }}>{subject}</button></>}
          {cls&&<><span style={{ color:"#9CA3AF" }}>›</span><button onClick={()=>reset(2)} style={{ background:"#EBF5FF", color:"#1A56DB", borderRadius:6, padding:"4px 12px", fontSize:12, fontWeight:700, border:"none", cursor:"pointer" }}>{cls}</button></>}
          {type&&<><span style={{ color:"#9CA3AF" }}>›</span><span style={{ background:"#F3EEFF", color:"#7C3AED", borderRadius:6, padding:"4px 12px", fontSize:12, fontWeight:700 }}>{type}</span></>}
        </div>
      )}

      {/* L1 Subject */}
      {!subject && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, maxWidth:700, margin:"0 auto" }}>
          {[
            { id:"Mathematics", icon:"📐", color:"#1A56DB", bg:"#EBF5FF", desc:"Algebra, Geometry, Mensuration, Statistics and more" },
            { id:"Science",     icon:"🔬", color:"#059669", bg:"#ECFDF5", desc:"Physics, Chemistry and Biology — all chapters covered" },
          ].map(s=>(
            <div key={s.id} className="pu-card" onClick={()=>setSubject(s.id)}
              style={{ background:"white", borderRadius:20, padding:"44px 32px", textAlign:"center", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", border:`2px solid ${s.color}20`, cursor:"pointer" }}>
              <div style={{ width:80, height:80, borderRadius:20, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:42, margin:"0 auto 20px" }}>{s.icon}</div>
              <h3 className="section-hd" style={{ fontSize:28, fontWeight:700, color:s.color, marginBottom:10 }}>{s.id}</h3>
              <p style={{ color:"#6B7280", fontSize:13, lineHeight:1.65, marginBottom:20 }}>{s.desc}</p>
              <button style={{ padding:"10px 24px", borderRadius:8, background:s.color, color:"white", fontSize:13, fontWeight:700, cursor:"pointer", border:"none" }}>Select →</button>
            </div>
          ))}
        </div>
      )}

      {/* L2 Class */}
      {subject && !cls && (
        <div style={{ animation:"fadeUp 0.3s ease" }}>
          <h2 style={{ fontSize:18, fontWeight:700, color:"#111827", marginBottom:22, textAlign:"center" }}>Select Class — {subject}</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, maxWidth:820, margin:"0 auto" }}>
            {["Class VIII","Class IX","Class X"].map((c,i)=>{
              const colors=["#059669","#1A56DB","#7C3AED"], bgs=["#ECFDF5","#EBF5FF","#F3EEFF"], icons=["🌱","📈","🏆"];
              const qc=Object.values(QUESTION_BANK[subject]?.[c]||{}).reduce((a,v)=>a+v.length,0);
              return (
                <div key={c} className="pu-card" onClick={()=>setCls(c)}
                  style={{ background:"white", borderRadius:18, padding:"32px 22px", textAlign:"center", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", border:`2px solid ${colors[i]}18`, cursor:"pointer" }}>
                  <div style={{ width:64, height:64, borderRadius:16, background:bgs[i], display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 16px" }}>{icons[i]}</div>
                  <h3 className="section-hd" style={{ fontSize:26, fontWeight:700, color:colors[i], marginBottom:8 }}>{c}</h3>
                  <p style={{ color:"#6B7280", fontSize:12, marginBottom:16 }}>{qc} Questions Available</p>
                  <button style={{ padding:"8px 20px", borderRadius:8, background:colors[i], color:"white", fontSize:12, fontWeight:700, cursor:"pointer", border:"none" }}>Choose →</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* L3 Type */}
      {subject && cls && !type && (
        <div style={{ animation:"fadeUp 0.3s ease" }}>
          <h2 style={{ fontSize:18, fontWeight:700, color:"#111827", marginBottom:22, textAlign:"center" }}>{subject} — {cls}</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, maxWidth:700, margin:"0 auto" }}>
            {[
              { id:"CBSE Board", icon:"📋", color:"#1A56DB", bg:"#EBF5FF", desc:"Chapter-wise questions aligned with CBSE board exam pattern and marking scheme" },
              { id:"Olympiads",  icon:"🏆", color:"#D97706", bg:"#FFFBEB", desc:"Higher-order thinking questions for IMO, NSO, NTSE and other Olympiads" },
            ].map(t=>{
              const qc=QUESTION_BANK[subject]?.[cls]?.[t.id]?.length||0;
              return (
                <div key={t.id} className="pu-card" onClick={()=>setType(t.id)}
                  style={{ background:"white", borderRadius:20, padding:"36px 28px", textAlign:"center", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", border:`2px solid ${t.color}18`, cursor:"pointer" }}>
                  <div style={{ width:72, height:72, borderRadius:18, background:t.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 18px" }}>{t.icon}</div>
                  <h3 className="section-hd" style={{ fontSize:26, fontWeight:700, color:t.color, marginBottom:8 }}>{t.id}</h3>
                  <p style={{ color:"#6B7280", fontSize:13, lineHeight:1.65, marginBottom:14 }}>{t.desc}</p>
                  <p style={{ color:t.color, fontSize:13, fontWeight:700, marginBottom:16 }}>{qc} Questions</p>
                  <button style={{ padding:"10px 24px", borderRadius:8, background:t.color, color:"white", fontSize:13, fontWeight:700, cursor:"pointer", border:"none" }}>Start Practice →</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* L4 Questions */}
      {subject && cls && type && (
        <div style={{ animation:"fadeUp 0.3s ease" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:26, flexWrap:"wrap", gap:12 }}>
            <div>
              <h2 className="section-hd" style={{ fontSize:28, color:"#0d1b3e", fontWeight:700 }}>{subject} — {cls} — {type}</h2>
              <p style={{ color:"#6B7280", fontSize:13, marginTop:4 }}>{questions.length} questions · Click to reveal answers</p>
            </div>
            <button onClick={()=>setShowAns(questions.reduce((a,q)=>({...a,[q.id]:true}),{}))}
              style={{ padding:"10px 20px", borderRadius:8, background:"#F3EEFF", color:"#7C3AED", fontSize:13, fontWeight:700, cursor:"pointer", border:"none" }}>
              Show All Answers
            </button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {questions.map((q,i)=>(
              <div key={q.id} style={{ background:"white", borderRadius:16, padding:"22px 26px", boxShadow:"0 2px 10px rgba(0,0,0,0.05)", border:"1px solid #F3F4F6" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:10, marginBottom:10, alignItems:"center" }}>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:700, color:"#1A56DB", background:"#EBF5FF", borderRadius:6, padding:"2px 8px" }}>Q{i+1}</span>
                      <span style={{ fontSize:11, color:"#6B7280" }}>{q.marks} marks</span>
                    </div>
                    <p style={{ color:"#111827", fontSize:15, lineHeight:1.65, fontWeight:500 }}>{q.q}</p>
                  </div>
                  <button onClick={()=>setShowAns(p=>({...p,[q.id]:!p[q.id]}))}
                    style={{ flexShrink:0, padding:"8px 16px", borderRadius:8, background:showAns[q.id]?"#ECFDF5":"#EBF5FF", color:showAns[q.id]?"#059669":"#1A56DB", fontSize:12, fontWeight:700, cursor:"pointer", border:"none" }}>
                    {showAns[q.id]?"Hide Ans":"Show Ans"}
                  </button>
                </div>
                {showAns[q.id]&&(
                  <div style={{ marginTop:16, padding:"14px 18px", background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:10, animation:"fadeUp 0.2s ease" }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#059669", marginBottom:6 }}>✅ ANSWER</div>
                    <p style={{ color:"#166534", fontSize:14, lineHeight:1.75 }}>{q.ans}</p>
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

