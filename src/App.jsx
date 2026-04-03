import { useState, useEffect, useRef } from "react";


// ── Storage Helpers (localStorage for real deployment) ────────────────────────
const DB = {
  async get(key) {
    try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } catch { return null; }
  },
  async set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { console.warn("storage err", e); }
  },
};

// ── Seed Data ─────────────────────────────────────────────────────────────────
const TODAY = new Date().toISOString().slice(0, 10);
const SEED_USERS = [
  { id: "coach1", name: "Dr. Sharma", email: "coach@conceptual.com", password: "coach123", role: "admin", approved: true, joinedAt: TODAY },
  { id: "s1", name: "Aditya Verma", email: "aditya@student.com", password: "pass123", role: "student", approved: true, joinedAt: TODAY },
];
const SEED_ASSIGNMENTS = [
  { id: "a1", date: TODAY, title: "Newton's Laws – Problem Set", subject: "Physics", description: "Solve Q1–Q10 from Chapter 4. Show free-body diagrams for each. Mention all forces acting.", dueTime: "11:59 PM", postedBy: "coach1" },
  { id: "a2", date: TODAY, title: "Quadratic Equations Practice", subject: "Mathematics", description: "Complete exercises 3.1 to 3.5. Use the quadratic formula for at least 5 problems.", dueTime: "11:59 PM", postedBy: "coach1" },
];
const SEED_LECTURES = [
  { id: "l1", date: TODAY, title: "Laws of Motion – Complete Theory", subject: "Physics", type: "notes", content: `# Newton's Laws of Motion\n\n## First Law – Inertia\nAn object at rest stays at rest, and an object in motion stays in motion with the same speed and direction **unless acted upon by an unbalanced force.**\n\n> *Inertia is the resistance of any physical object to a change in its state of motion.*\n\n## Second Law – F = ma\nThe acceleration of an object depends on the **net force** acting on it and its **mass**.\n\n**Formula:** F = m × a\n\n- F = Force (Newtons, N)\n- m = Mass (kilograms, kg)\n- a = Acceleration (m/s²)\n\n**Example:** A 5 kg block accelerates at 3 m/s². Find the force.\nF = 5 × 3 = **15 N**\n\n## Third Law – Action–Reaction\nFor every action, there is an **equal and opposite reaction.**\n\n**Examples:**\n- Rocket propulsion\n- Swimming\n- Recoil of a gun\n\n## Free Body Diagrams\nAlways isolate the object and draw:\n1. Weight (mg) → downward\n2. Normal force → perpendicular to surface\n3. Friction → opposing motion\n4. Applied force → direction of push/pull`, postedBy: "coach1" },
  { id: "l2", date: TODAY, title: "Quadratic Equations – Full Walkthrough", subject: "Mathematics", type: "notes", content: `# Quadratic Equations\n\n## Standard Form\n**ax² + bx + c = 0** where a ≠ 0\n\n## Methods to Solve\n\n### 1. Factoring\nWrite as (x – p)(x – q) = 0\n\n**Example:** x² – 5x + 6 = 0\n→ (x – 2)(x – 3) = 0\n→ x = 2 or x = 3\n\n### 2. Quadratic Formula\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n**Use when factoring fails.**\n\n**Example:** 2x² + 3x – 2 = 0\na=2, b=3, c=–2\nx = (–3 ± √(9+16)) / 4 = (–3 ± 5) / 4\nx = **0.5** or x = **–2**\n\n### 3. Discriminant (D = b²–4ac)\n| D > 0 | Two distinct real roots |\n| D = 0 | One repeated real root |\n| D < 0 | No real roots (complex) |\n\n## Tips for Exam\n- Always check if equation is in standard form first\n- Discriminant tells you HOW MANY roots before solving\n- Verify answers by substituting back`, postedBy: "coach1" },
  { id: "l3", date: TODAY, title: "Understanding Force & Motion (Video)", subject: "Physics", type: "video", videoUrl: "https://www.youtube.com/embed/kKKM8Y-u7ds", content: "Watch this concise video explanation of force, mass, and acceleration. Pay attention to the worked examples at 4:30.", postedBy: "coach1" },
];
const SEED_ANNOUNCEMENTS = [
  { id: "n1", date: TODAY, title: "Welcome to Conceptual Learning! 🎉", message: "Hello everyone! This is your complete learning hub. Check your daily assignments, attend lectures, submit homework for AI feedback, and post your doubts below. Let's build strong concepts together!", pinned: true, postedBy: "coach1" },
];

// ── Claude API ─────────────────────────────────────────────────────────────────
async function claudeGradeHomework(base64Data, mediaType, assignmentTitle, subject) {
  const isPDF = mediaType === "application/pdf";
  const contentBlock = isPDF
    ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64Data } }
    : { type: "image", source: { type: "base64", media_type: mediaType, data: base64Data } };

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are an expert ${subject} tutor and academic evaluator. Analyze student homework submissions with encouragement and precision. Always provide structured, detailed, constructive feedback that helps students improve. Use clear sections. End with a grade letter and score out of 100.`,
      messages: [{
        role: "user",
        content: [
          contentBlock,
          { type: "text", text: `Please evaluate this student's homework for the assignment: "${assignmentTitle}" (Subject: ${subject}).\n\nProvide your feedback in this exact format:\n\n**✅ STRENGTHS**\n[List 2-3 things done well]\n\n**📝 AREAS TO IMPROVE**\n[Specific gaps or errors found]\n\n**💡 SUGGESTIONS**\n[Actionable advice for better performance]\n\n**🎯 OVERALL FEEDBACK**\n[2-3 sentence summary]\n\n**GRADE: [Letter] – [Score]/100**` }
        ]
      }]
    }),
  });
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("") || "Unable to process submission. Please try again.";
}

async function claudeAnswerDoubt(question, subject) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 800,
      system: `You are a brilliant ${subject} teacher who explains concepts with clarity and enthusiasm. Use examples, analogies, and step-by-step reasoning. Keep answers helpful and student-friendly. Use markdown formatting.`,
      messages: [{ role: "user", content: `Student doubt (${subject}): ${question}\n\nPlease explain clearly with examples if needed.` }]
    }),
  });
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("") || "Unable to answer right now. Please try again.";
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [appData, setAppData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      const [users, assignments, lectures, doubts, submissions, announcements] = await Promise.all([
        DB.get("cl_users"), DB.get("cl_assignments"), DB.get("cl_lectures"),
        DB.get("cl_doubts"), DB.get("cl_submissions"), DB.get("cl_announcements"),
      ]);
      setAppData({
        users: users || SEED_USERS,
        assignments: assignments || SEED_ASSIGNMENTS,
        lectures: lectures || SEED_LECTURES,
        doubts: doubts || [],
        submissions: submissions || [],
        announcements: announcements || SEED_ANNOUNCEMENTS,
      });
      setLoading(false);
    })();
  }, []);

  const save = async (key, arr) => {
    await DB.set(`cl_${key}`, arr);
    setAppData(d => ({ ...d, [key]: arr }));
  };

  const toast$ = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  if (loading) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100vh", background:"#0a0e1a", fontFamily:"DM Sans, sans-serif" }}>
      <div style={{ width:48, height:48, border:"3px solid #1e293b", borderTop:"3px solid #38bdf8", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p style={{ color:"#64748b", marginTop:16, fontSize:14 }}>Loading Conceptual Learning...</p>
    </div>
  );

  return (
    <div style={{ fontFamily:"'DM Sans', sans-serif", minHeight:"100vh", background:"#070b14" }}>
      <GlobalStyles />
      {toast && (
        <div style={{
          position:"fixed", top:20, right:20, zIndex:9999, padding:"12px 20px", borderRadius:10,
          background: toast.type === "err" ? "#ef4444" : toast.type === "warn" ? "#f59e0b" : "#10b981",
          color:"#fff", fontWeight:600, fontSize:13, boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
          animation:"slideIn 0.3s ease"
        }}>
          {toast.msg}
        </div>
      )}
      {!user
        ? <AuthPage appData={appData} save={save} setUser={setUser} toast$={toast$} />
        : user.role === "admin"
          ? <AdminApp appData={appData} save={save} user={user} setUser={setUser} toast$={toast$} />
          : <StudentApp appData={appData} save={save} user={user} setUser={setUser} toast$={toast$} />
      }
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @keyframes slideIn { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }
      @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      * { box-sizing: border-box; margin:0; padding:0; }
      ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-track { background:#0f172a; } ::-webkit-scrollbar-thumb { background:#334155; border-radius:10px; }
      button { cursor:pointer; border:none; outline:none; }
      input, textarea, select { outline:none; border:none; }
      .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
      .card-hover:hover { transform:translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.4) !important; }
      .nav-btn-hover:hover { background: rgba(56,189,248,0.08) !important; color: #38bdf8 !important; }
      .btn-hover:hover { opacity: 0.88; transform: translateY(-1px); }
      pre { white-space: pre-wrap; }
    `}</style>
  );
}

// ── AUTH PAGE ─────────────────────────────────────────────────────────────────
function AuthPage({ appData, save, setUser, toast$ }) {
  const [tab, setTab] = useState("login");
  const [f, setF] = useState({ name:"", email:"", password:"", confirm:"", subject:"Mathematics" });
  const set = k => e => setF(p => ({...p, [k]: e.target.value}));

  const login = () => {
    const u = appData.users.find(u => u.email.toLowerCase() === f.email.toLowerCase() && u.password === f.password);
    if (!u) return toast$("Invalid email or password", "err");
    if (!u.approved) return toast$("Registration pending coach approval ⏳", "warn");
    setUser(u);
  };

  const register = async () => {
    if (!f.name.trim() || !f.email.trim() || !f.password) return toast$("Please fill all fields", "err");
    if (f.password !== f.confirm) return toast$("Passwords don't match", "err");
    if (appData.users.find(u => u.email.toLowerCase() === f.email.toLowerCase())) return toast$("Email already registered", "err");
    const newUser = { id: "u" + Date.now(), name: f.name.trim(), email: f.email.trim().toLowerCase(), password: f.password, role:"student", approved:false, subject: f.subject, joinedAt: TODAY };
    await save("users", [...appData.users, newUser]);
    toast$("Registration sent! Awaiting coach approval 🎓");
    setTab("login");
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#070b14", position:"relative", overflow:"hidden" }}>
      {/* Bg decoration */}
      <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)", top:-200, right:-200, pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)", bottom:-100, left:-100, pointerEvents:"none" }} />

      <div style={{ width:"100%", maxWidth:420, padding:32, background:"rgba(15,23,42,0.9)", border:"1px solid rgba(56,189,248,0.12)", borderRadius:20, backdropFilter:"blur(20px)", boxShadow:"0 32px 80px rgba(0,0,0,0.5)", animation:"fadeUp 0.5s ease" }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:60, height:60, borderRadius:16, background:"linear-gradient(135deg, #0ea5e9, #6366f1)", marginBottom:14, fontSize:26 }}>⚛️</div>
          <h1 style={{ fontFamily:"'DM Serif Display', serif", fontSize:26, color:"#f1f5f9", letterSpacing:"-0.5px" }}>Conceptual Learning</h1>
          <p style={{ color:"#64748b", fontSize:13, marginTop:4 }}>Math & Science Coaching Hub</p>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", background:"#0f172a", borderRadius:10, padding:4, marginBottom:24 }}>
          {[["login","Sign In"],["register","Register"]].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex:1, padding:"9px 0", borderRadius:8, fontSize:13, fontWeight:600, fontFamily:"DM Sans, sans-serif", background: tab===t ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "transparent", color: tab===t ? "#fff" : "#64748b", transition:"all 0.2s" }}>{l}</button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {tab === "register" && <Input placeholder="Full Name" value={f.name} onChange={set("name")} icon="👤" />}
          <Input placeholder="Email Address" value={f.email} onChange={set("email")} icon="✉️" />
          <Input placeholder="Password" type="password" value={f.password} onChange={set("password")} icon="🔒" />
          {tab === "register" && <>
            <Input placeholder="Confirm Password" type="password" value={f.confirm} onChange={set("confirm")} icon="🔒" />
            <select value={f.subject} onChange={set("subject")} style={{ padding:"12px 14px", background:"#0f172a", border:"1px solid #1e293b", borderRadius:10, color:"#cbd5e1", fontSize:13, fontFamily:"DM Sans, sans-serif" }}>
              {["Mathematics","Physics","Chemistry","Biology","All Subjects"].map(s => <option key={s}>{s}</option>)}
            </select>
          </>}
          <button className="btn-hover" onClick={tab==="login" ? login : register} style={{ padding:"13px 0", borderRadius:10, background:"linear-gradient(135deg, #0ea5e9, #6366f1)", color:"#fff", fontSize:14, fontWeight:700, fontFamily:"DM Sans, sans-serif", transition:"all 0.2s", marginTop:4 }}>
            {tab==="login" ? "Sign In →" : "Request Access →"}
          </button>
        </div>
        <p style={{ textAlign:"center", color:"#334155", fontSize:11, marginTop:16 }}>Coach login: coach@conceptual.com / coach123</p>
      </div>
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div style={{ display:"flex", alignItems:"center", background:"#0f172a", border:"1px solid #1e293b", borderRadius:10, padding:"0 14px", gap:10 }}>
      <span style={{ fontSize:14 }}>{icon}</span>
      <input {...props} style={{ flex:1, background:"transparent", color:"#e2e8f0", fontSize:13, padding:"12px 0", fontFamily:"DM Sans, sans-serif", width:"100%" }} />
    </div>
  );
}

// ── STUDENT APP ───────────────────────────────────────────────────────────────
function StudentApp({ appData, save, user, setUser, toast$ }) {
  const [page, setPage] = useState("home");
  const pendingDoubts = appData.doubts.filter(d => d.userId === user.id && !d.answer).length;

  const NAV = [
    { id:"home", icon:"🏠", label:"Dashboard" },
    { id:"assignments", icon:"📋", label:"Assignments" },
    { id:"lectures", icon:"📚", label:"Lectures" },
    { id:"submit", icon:"📤", label:"Submit HW" },
    { id:"feedback", icon:"🎯", label:"My Feedback" },
    { id:"doubts", icon:"💬", label:"Ask Doubts", badge: pendingDoubts > 0 ? pendingDoubts : null },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      <Sidebar nav={NAV} page={page} setPage={setPage} user={user} setUser={setUser} />
      <div style={{ flex:1, overflowY:"auto", background:"#070b14" }}>
        <TopBar title={NAV.find(n=>n.id===page)?.label} user={user} />
        <div style={{ padding:"24px 28px", maxWidth:960, margin:"0 auto" }}>
          {page==="home" && <StudentHome appData={appData} user={user} setPage={setPage} />}
          {page==="assignments" && <AssignmentsPage appData={appData} user={user} />}
          {page==="lectures" && <LecturesPage appData={appData} />}
          {page==="submit" && <SubmitHomework appData={appData} save={save} user={user} toast$={toast$} />}
          {page==="feedback" && <MyFeedback appData={appData} user={user} />}
          {page==="doubts" && <DoubtsPage appData={appData} save={save} user={user} toast$={toast$} isCoach={false} />}
        </div>
      </div>
    </div>
  );
}

function StudentHome({ appData, user, setPage }) {
  const todayAssignments = appData.assignments.filter(a => a.date === TODAY);
  const todayLectures = appData.lectures.filter(l => l.date === TODAY);
  const mySubmissions = appData.submissions.filter(s => s.userId === user.id);
  const announcements = appData.announcements;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, animation:"fadeUp 0.4s ease" }}>
      {/* Welcome */}
      <div style={{ background:"linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.15))", border:"1px solid rgba(56,189,248,0.2)", borderRadius:16, padding:"20px 24px" }}>
        <h2 style={{ fontFamily:"DM Serif Display, serif", color:"#f1f5f9", fontSize:22 }}>Good {getGreeting()}, {user.name.split(" ")[0]}! 👋</h2>
        <p style={{ color:"#64748b", fontSize:13, marginTop:4 }}>{new Date().toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</p>
      </div>

      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:14 }}>
        {[
          { label:"Today's Tasks", val: todayAssignments.length, icon:"📋", color:"#0ea5e9" },
          { label:"Today's Lectures", val: todayLectures.length, icon:"📚", color:"#6366f1" },
          { label:"Submitted HW", val: mySubmissions.length, icon:"✅", color:"#10b981" },
          { label:"Pending Doubts", val: appData.doubts.filter(d=>d.userId===user.id&&!d.answer).length, icon:"💬", color:"#f59e0b" },
        ].map(s => (
          <div key={s.label} className="card-hover" style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:"16px 18px", textAlign:"center" }}>
            <div style={{ fontSize:24 }}>{s.icon}</div>
            <div style={{ fontSize:26, fontWeight:700, color:s.color, fontFamily:"JetBrains Mono, monospace", marginTop:6 }}>{s.val}</div>
            <div style={{ fontSize:11, color:"#475569", marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Announcements */}
      {announcements.length > 0 && (
        <Section title="📢 Announcements">
          {announcements.map(a => (
            <div key={a.id} style={{ background:"rgba(14,165,233,0.05)", border:"1px solid rgba(14,165,233,0.2)", borderRadius:12, padding:"14px 18px" }}>
              {a.pinned && <span style={{ fontSize:10, background:"#0ea5e9", color:"#fff", borderRadius:4, padding:"2px 6px", fontWeight:700, marginRight:8 }}>PINNED</span>}
              <span style={{ color:"#e2e8f0", fontWeight:600, fontSize:14 }}>{a.title}</span>
              <p style={{ color:"#64748b", fontSize:13, marginTop:6, lineHeight:1.6 }}>{a.message}</p>
              <p style={{ color:"#334155", fontSize:11, marginTop:8 }}>{a.date}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Today Shortcuts */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <QuickCard title="Today's Assignments" count={todayAssignments.length} icon="📋" color="#0ea5e9" onClick={() => setPage("assignments")} sub={todayAssignments[0]?.title || "No assignments yet"} />
        <QuickCard title="Today's Lectures" count={todayLectures.length} icon="📚" color="#6366f1" onClick={() => setPage("lectures")} sub={todayLectures[0]?.title || "No lectures yet"} />
      </div>
    </div>
  );
}

function QuickCard({ title, count, icon, color, onClick, sub }) {
  return (
    <div className="card-hover" onClick={onClick} style={{ background:"#0f172a", border:`1px solid ${color}22`, borderRadius:14, padding:"18px 20px", cursor:"pointer" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontSize:12, color:"#475569", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>{title}</div>
          <div style={{ fontSize:28, fontWeight:700, color, fontFamily:"JetBrains Mono, monospace", marginTop:4 }}>{count}</div>
          <div style={{ fontSize:12, color:"#334155", marginTop:4, lineHeight:1.4 }}>{sub}</div>
        </div>
        <div style={{ fontSize:28, opacity:0.6 }}>{icon}</div>
      </div>
    </div>
  );
}

function AssignmentsPage({ appData, user }) {
  const sorted = [...appData.assignments].sort((a,b) => b.date.localeCompare(a.date));
  const mySubmitted = appData.submissions.filter(s => s.userId === user.id).map(s => s.assignmentId);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14, animation:"fadeUp 0.4s ease" }}>
      {sorted.length === 0 && <Empty icon="📋" msg="No assignments posted yet" />}
      {sorted.map(a => {
        const done = mySubmitted.includes(a.id);
        return (
          <div key={a.id} className="card-hover" style={{ background:"#0f172a", border:`1px solid ${done ? "#10b981" : "#1e293b"}44`, borderRadius:14, padding:"18px 22px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, flexWrap:"wrap" }}>
                  <span style={{ fontSize:10, background: subjectColor(a.subject), color:"#fff", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>{a.subject}</span>
                  <span style={{ fontSize:11, color:"#475569" }}>📅 {a.date}</span>
                  <span style={{ fontSize:11, color:"#475569" }}>⏰ Due: {a.dueTime}</span>
                  {done && <span style={{ fontSize:10, background:"#10b981", color:"#fff", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>✓ SUBMITTED</span>}
                </div>
                <h3 style={{ color:"#f1f5f9", fontSize:16, fontWeight:600, marginBottom:6 }}>{a.title}</h3>
                <p style={{ color:"#64748b", fontSize:13, lineHeight:1.6 }}>{a.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LecturesPage({ appData }) {
  const [open, setOpen] = useState(null);
  const sorted = [...appData.lectures].sort((a,b) => b.date.localeCompare(a.date));

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14, animation:"fadeUp 0.4s ease" }}>
      {sorted.length === 0 && <Empty icon="📚" msg="No lectures posted yet" />}
      {sorted.map(l => (
        <div key={l.id} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, overflow:"hidden" }}>
          <div onClick={() => setOpen(open===l.id ? null : l.id)} style={{ padding:"16px 22px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <span style={{ fontSize:10, background: subjectColor(l.subject), color:"#fff", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>{l.subject}</span>
                <span style={{ fontSize:10, background: l.type==="video" ? "#f59e0b22" : "#10b98122", color: l.type==="video" ? "#f59e0b" : "#10b981", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>{l.type==="video" ? "🎬 VIDEO" : "📝 NOTES"}</span>
                <span style={{ fontSize:11, color:"#475569" }}>{l.date}</span>
              </div>
              <h3 style={{ color:"#f1f5f9", fontSize:15, fontWeight:600 }}>{l.title}</h3>
            </div>
            <span style={{ color:"#38bdf8", fontSize:18, transition:"transform 0.2s", transform: open===l.id ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
          </div>
          {open===l.id && (
            <div style={{ padding:"0 22px 22px", borderTop:"1px solid #1e293b", paddingTop:18 }}>
              {l.type === "video" ? (
                <div>
                  <p style={{ color:"#64748b", fontSize:13, marginBottom:14 }}>{l.content}</p>
                  <div style={{ position:"relative", paddingBottom:"56.25%", height:0, borderRadius:10, overflow:"hidden" }}>
                    <iframe src={l.videoUrl} style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", border:"none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={l.title} />
                  </div>
                </div>
              ) : (
                <div style={{ color:"#94a3b8", fontSize:13, lineHeight:1.8 }}>
                  <MarkdownText text={l.content} />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SubmitHomework({ appData, save, user, toast$ }) {
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const eligible = appData.assignments.filter(a => {
    const alreadySubmitted = appData.submissions.some(s => s.userId===user.id && s.assignmentId===a.id);
    return !alreadySubmitted;
  });

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const allowed = ["image/jpeg","image/png","application/pdf"];
    if (!allowed.includes(f.type)) return toast$("Only JPEG, PNG, or PDF allowed", "err");
    if (f.size > 10 * 1024 * 1024) return toast$("File must be under 10MB", "err");
    setFile(f);
    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = e => setPreview(e.target.result);
      reader.readAsDataURL(f);
    } else {
      setPreview("pdf");
    }
  };

  const submit = async () => {
    if (!selectedAssignment) return toast$("Please select an assignment", "err");
    if (!file) return toast$("Please upload your homework file", "err");
    setLoading(true);

    try {
      const assignment = appData.assignments.find(a => a.id === selectedAssignment);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(",")[1];
        const mediaType = file.type;
        toast$("🤖 Claude is reviewing your homework...", "warn");
        const feedback = await claudeGradeHomework(base64, mediaType, assignment.title, assignment.subject);
        const newSub = {
          id: "sub" + Date.now(),
          userId: user.id,
          userName: user.name,
          assignmentId: selectedAssignment,
          assignmentTitle: assignment.title,
          subject: assignment.subject,
          fileName: file.name,
          fileType: mediaType,
          notes,
          submittedAt: new Date().toISOString(),
          feedback,
          grade: extractGrade(feedback),
        };
        const updated = [...appData.submissions, newSub];
        await save("submissions", updated);
        toast$("Homework submitted & graded! ✅");
        setFile(null); setPreview(null); setNotes(""); setSelectedAssignment("");
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast$("Error submitting homework", "err");
      setLoading(false);
    }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, animation:"fadeUp 0.4s ease" }}>
      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"24px 26px" }}>
        <h2 style={{ fontFamily:"DM Serif Display, serif", color:"#f1f5f9", fontSize:20, marginBottom:20 }}>Submit Homework</h2>

        {eligible.length === 0 ? (
          <div style={{ textAlign:"center", padding:"30px 0", color:"#475569" }}>
            <div style={{ fontSize:40, marginBottom:10 }}>🎉</div>
            <p>All assignments submitted! Great job.</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label style={{ color:"#64748b", fontSize:12, fontWeight:600, display:"block", marginBottom:6 }}>SELECT ASSIGNMENT</label>
              <select value={selectedAssignment} onChange={e => setSelectedAssignment(e.target.value)} style={{ width:"100%", padding:"12px 14px", background:"#070b14", border:"1px solid #1e293b", borderRadius:10, color:"#e2e8f0", fontSize:13, fontFamily:"DM Sans, sans-serif" }}>
                <option value="">-- Choose assignment --</option>
                {eligible.map(a => <option key={a.id} value={a.id}>[{a.subject}] {a.title}</option>)}
              </select>
            </div>

            <div>
              <label style={{ color:"#64748b", fontSize:12, fontWeight:600, display:"block", marginBottom:6 }}>UPLOAD FILE (JPEG / PNG / PDF)</label>
              <div onClick={() => fileRef.current?.click()} style={{ border:"2px dashed #1e293b", borderRadius:12, padding:"28px 20px", textAlign:"center", cursor:"pointer", background:"#070b14", transition:"border-color 0.2s" }}>
                {preview ? (
                  preview === "pdf"
                    ? <div style={{ color:"#94a3b8" }}>📄 {file.name}</div>
                    : <img src={preview} alt="preview" style={{ maxHeight:160, maxWidth:"100%", borderRadius:8, objectFit:"contain" }} />
                ) : (
                  <div>
                    <div style={{ fontSize:32, marginBottom:8 }}>📎</div>
                    <p style={{ color:"#475569", fontSize:13 }}>Click to upload your homework</p>
                    <p style={{ color:"#334155", fontSize:11, marginTop:4 }}>JPEG, PNG, or PDF • Max 10MB</p>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display:"none" }} onChange={handleFile} />
            </div>

            <div>
              <label style={{ color:"#64748b", fontSize:12, fontWeight:600, display:"block", marginBottom:6 }}>ADDITIONAL NOTES (Optional)</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any comments about your submission..." rows={3} style={{ width:"100%", padding:"12px 14px", background:"#070b14", border:"1px solid #1e293b", borderRadius:10, color:"#e2e8f0", fontSize:13, fontFamily:"DM Sans, sans-serif", resize:"vertical" }} />
            </div>

            <button className="btn-hover" onClick={submit} disabled={loading} style={{ padding:"13px 0", borderRadius:10, background: loading ? "#1e293b" : "linear-gradient(135deg, #0ea5e9, #6366f1)", color:"#fff", fontSize:14, fontWeight:700, fontFamily:"DM Sans, sans-serif", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {loading ? <><Spinner /> Analysing with AI...</> : "Submit & Get AI Feedback →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MyFeedback({ appData, user }) {
  const mySubs = appData.submissions.filter(s => s.userId === user.id).sort((a,b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14, animation:"fadeUp 0.4s ease" }}>
      {mySubs.length === 0 && <Empty icon="🎯" msg="No submissions yet. Submit homework to get AI feedback!" />}
      {mySubs.map(s => (
        <div key={s.id} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:"18px 22px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12, flexWrap:"wrap", gap:8 }}>
            <div>
              <div style={{ display:"flex", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                <span style={{ fontSize:10, background: subjectColor(s.subject), color:"#fff", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>{s.subject}</span>
                {s.grade && <span style={{ fontSize:10, background:"#6366f122", color:"#818cf8", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>GRADE: {s.grade}</span>}
              </div>
              <h3 style={{ color:"#f1f5f9", fontSize:15, fontWeight:600 }}>{s.assignmentTitle}</h3>
              <p style={{ color:"#475569", fontSize:11, marginTop:2 }}>Submitted: {new Date(s.submittedAt).toLocaleString()}</p>
            </div>
            <div style={{ fontSize:11, color:"#475569" }}>📄 {s.fileName}</div>
          </div>
          {s.notes && <p style={{ color:"#475569", fontSize:12, marginBottom:12, fontStyle:"italic" }}>Your note: "{s.notes}"</p>}
          <div style={{ background:"rgba(99,102,241,0.05)", border:"1px solid rgba(99,102,241,0.15)", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
              <span style={{ fontSize:14 }}>🤖</span>
              <span style={{ color:"#818cf8", fontSize:12, fontWeight:700 }}>AI FEEDBACK</span>
            </div>
            <div style={{ color:"#94a3b8", fontSize:13, lineHeight:1.8 }}>
              <MarkdownText text={s.feedback} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DoubtsPage({ appData, save, user, toast$, isCoach }) {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [loading, setLoading] = useState(null);
  const [answerText, setAnswerText] = useState({});

  const myDoubts = isCoach
    ? [...appData.doubts].sort((a,b) => new Date(b.askedAt) - new Date(a.askedAt))
    : appData.doubts.filter(d => d.userId === user.id).sort((a,b) => new Date(b.askedAt) - new Date(a.askedAt));

  const askClaude = async (doubt) => {
    setLoading(doubt.id);
    const answer = await claudeAnswerDoubt(doubt.question, doubt.subject);
    const updated = appData.doubts.map(d => d.id === doubt.id ? { ...d, answer, answeredAt: new Date().toISOString(), answeredBy: "Claude AI" } : d);
    await save("doubts", updated);
    setLoading(null);
    toast$("Claude answered the doubt! ✅");
  };

  const coachAnswer = async (doubt) => {
    const ans = answerText[doubt.id];
    if (!ans?.trim()) return toast$("Please type an answer", "err");
    const updated = appData.doubts.map(d => d.id === doubt.id ? { ...d, answer: ans, answeredAt: new Date().toISOString(), answeredBy: "Coach" } : d);
    await save("doubts", updated);
    setAnswerText(p => ({...p, [doubt.id]: ""}));
    toast$("Answer posted!");
  };

  const submitDoubt = async () => {
    if (!question.trim()) return toast$("Please type your doubt", "err");
    const newDoubt = { id:"d"+Date.now(), userId: user.id, userName: user.name, question: question.trim(), subject, askedAt: new Date().toISOString(), answer: null, answeredBy: null };
    await save("doubts", [...appData.doubts, newDoubt]);
    setQuestion("");
    toast$("Doubt posted! Your coach or AI will answer soon.");
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp 0.4s ease" }}>
      {!isCoach && (
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"20px 22px" }}>
          <h3 style={{ color:"#f1f5f9", fontWeight:600, marginBottom:14, fontSize:15 }}>Ask a Doubt</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <select value={subject} onChange={e => setSubject(e.target.value)} style={{ padding:"10px 14px", background:"#070b14", border:"1px solid #1e293b", borderRadius:10, color:"#e2e8f0", fontSize:13, fontFamily:"DM Sans, sans-serif" }}>
              {["Mathematics","Physics","Chemistry","Biology","Other"].map(s => <option key={s}>{s}</option>)}
            </select>
            <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Type your doubt clearly... e.g. 'How do I find the discriminant for 3x² + 5x - 2?'" rows={3} style={{ width:"100%", padding:"12px 14px", background:"#070b14", border:"1px solid #1e293b", borderRadius:10, color:"#e2e8f0", fontSize:13, fontFamily:"DM Sans, sans-serif", resize:"vertical" }} />
            <button className="btn-hover" onClick={submitDoubt} style={{ padding:"11px 0", borderRadius:10, background:"linear-gradient(135deg, #0ea5e9, #6366f1)", color:"#fff", fontSize:13, fontWeight:700, fontFamily:"DM Sans, sans-serif", transition:"all 0.2s" }}>
              Post Doubt →
            </button>
          </div>
        </div>
      )}

      {myDoubts.length === 0 && <Empty icon="💬" msg="No doubts yet. Ask anything!" />}
      {myDoubts.map(d => (
        <div key={d.id} style={{ background:"#0f172a", border:`1px solid ${d.answer ? "#10b98122" : "#1e293b"}`, borderRadius:14, padding:"16px 20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", gap:8, marginBottom:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:10, background: subjectColor(d.subject), color:"#fff", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>{d.subject}</span>
                {isCoach && <span style={{ fontSize:10, color:"#64748b" }}>by {d.userName}</span>}
                <span style={{ fontSize:10, color:"#334155" }}>{new Date(d.askedAt).toLocaleDateString()}</span>
                {!d.answer && <span style={{ fontSize:10, background:"#f59e0b22", color:"#f59e0b", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>PENDING</span>}
              </div>
              <p style={{ color:"#e2e8f0", fontSize:13, lineHeight:1.6, fontWeight:500 }}>❓ {d.question}</p>
            </div>
          </div>

          {d.answer ? (
            <div style={{ marginTop:14, background:"rgba(16,185,129,0.05)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:10, padding:"12px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                <span style={{ fontSize:12 }}>{d.answeredBy === "Claude AI" ? "🤖" : "👨‍🏫"}</span>
                <span style={{ color:"#10b981", fontSize:11, fontWeight:700 }}>{d.answeredBy?.toUpperCase()} — {new Date(d.answeredAt).toLocaleString()}</span>
              </div>
              <div style={{ color:"#94a3b8", fontSize:13, lineHeight:1.8 }}><MarkdownText text={d.answer} /></div>
            </div>
          ) : isCoach ? (
            <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:8 }}>
              <textarea value={answerText[d.id] || ""} onChange={e => setAnswerText(p => ({...p, [d.id]: e.target.value}))} placeholder="Type your answer..." rows={2} style={{ width:"100%", padding:"10px 12px", background:"#070b14", border:"1px solid #1e293b", borderRadius:8, color:"#e2e8f0", fontSize:13, fontFamily:"DM Sans, sans-serif", resize:"vertical" }} />
              <div style={{ display:"flex", gap:8 }}>
                <button className="btn-hover" onClick={() => coachAnswer(d)} style={{ flex:1, padding:"9px 0", borderRadius:8, background:"#10b981", color:"#fff", fontSize:12, fontWeight:700, fontFamily:"DM Sans, sans-serif" }}>
                  Post My Answer
                </button>
                <button className="btn-hover" onClick={() => askClaude(d)} disabled={loading===d.id} style={{ flex:1, padding:"9px 0", borderRadius:8, background:"linear-gradient(135deg, #0ea5e9, #6366f1)", color:"#fff", fontSize:12, fontWeight:700, fontFamily:"DM Sans, sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                  {loading===d.id ? <><Spinner />Asking AI...</> : "🤖 Let AI Answer"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// ── ADMIN APP ─────────────────────────────────────────────────────────────────
function AdminApp({ appData, save, user, setUser, toast$ }) {
  const [page, setPage] = useState("dashboard");
  const pendingStudents = appData.users.filter(u => u.role==="student" && !u.approved).length;
  const unansweredDoubts = appData.doubts.filter(d => !d.answer).length;

  const NAV = [
    { id:"dashboard", icon:"📊", label:"Dashboard" },
    { id:"students", icon:"👥", label:"Students", badge: pendingStudents || null },
    { id:"post-assignment", icon:"📋", label:"Post Assignment" },
    { id:"post-lecture", icon:"📚", label:"Post Lecture" },
    { id:"submissions", icon:"📥", label:"Submissions" },
    { id:"doubts", icon:"💬", label:"Doubts", badge: unansweredDoubts || null },
    { id:"announcements", icon:"📢", label:"Announce" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      <Sidebar nav={NAV} page={page} setPage={setPage} user={user} setUser={setUser} isAdmin />
      <div style={{ flex:1, overflowY:"auto", background:"#070b14" }}>
        <TopBar title={NAV.find(n=>n.id===page)?.label} user={user} isAdmin />
        <div style={{ padding:"24px 28px", maxWidth:1000, margin:"0 auto" }}>
          {page==="dashboard" && <AdminDashboard appData={appData} />}
          {page==="students" && <StudentsManager appData={appData} save={save} toast$={toast$} />}
          {page==="post-assignment" && <PostAssignment appData={appData} save={save} user={user} toast$={toast$} />}
          {page==="post-lecture" && <PostLecture appData={appData} save={save} user={user} toast$={toast$} />}
          {page==="submissions" && <AllSubmissions appData={appData} />}
          {page==="doubts" && <DoubtsPage appData={appData} save={save} user={user} toast$={toast$} isCoach={true} />}
          {page==="announcements" && <Announcements appData={appData} save={save} user={user} toast$={toast$} />}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ appData }) {
  const students = appData.users.filter(u => u.role==="student");
  const approved = students.filter(u => u.approved);
  const pending = students.filter(u => !u.approved);
  const todayAssignments = appData.assignments.filter(a => a.date === TODAY);
  const todayLectures = appData.lectures.filter(l => l.date === TODAY);
  const unanswered = appData.doubts.filter(d => !d.answer);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, animation:"fadeUp 0.4s ease" }}>
      <div style={{ background:"linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.15))", border:"1px solid rgba(56,189,248,0.2)", borderRadius:16, padding:"20px 24px" }}>
        <h2 style={{ fontFamily:"DM Serif Display, serif", color:"#f1f5f9", fontSize:22 }}>Coach Dashboard 📊</h2>
        <p style={{ color:"#64748b", fontSize:13, marginTop:4 }}>{new Date().toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:14 }}>
        {[
          { label:"Active Students", val: approved.length, icon:"🎓", color:"#10b981" },
          { label:"Pending Approval", val: pending.length, icon:"⏳", color:"#f59e0b" },
          { label:"Today's Tasks", val: todayAssignments.length, icon:"📋", color:"#0ea5e9" },
          { label:"Unanswered Doubts", val: unanswered.length, icon:"💬", color:"#ef4444" },
        ].map(s => (
          <div key={s.label} className="card-hover" style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:"16px 18px", textAlign:"center" }}>
            <div style={{ fontSize:24 }}>{s.icon}</div>
            <div style={{ fontSize:26, fontWeight:700, color:s.color, fontFamily:"JetBrains Mono, monospace", marginTop:6 }}>{s.val}</div>
            <div style={{ fontSize:11, color:"#475569", marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:"18px 20px" }}>
          <h3 style={{ color:"#94a3b8", fontSize:13, fontWeight:700, marginBottom:14, textTransform:"uppercase", letterSpacing:1 }}>Recent Submissions</h3>
          {appData.submissions.length === 0 ? <p style={{ color:"#334155", fontSize:13 }}>No submissions yet</p> : appData.submissions.slice(-5).reverse().map(s => (
            <div key={s.id} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #0f172a" }}>
              <span style={{ color:"#e2e8f0", fontSize:12 }}>{s.userName}</span>
              <span style={{ color:"#475569", fontSize:11 }}>{s.grade || "—"}</span>
            </div>
          ))}
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:"18px 20px" }}>
          <h3 style={{ color:"#94a3b8", fontSize:13, fontWeight:700, marginBottom:14, textTransform:"uppercase", letterSpacing:1 }}>Recent Doubts</h3>
          {appData.doubts.length === 0 ? <p style={{ color:"#334155", fontSize:13 }}>No doubts yet</p> : appData.doubts.slice(-5).reverse().map(d => (
            <div key={d.id} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #0f172a" }}>
              <span style={{ color:"#e2e8f0", fontSize:12 }}>{d.userName} – {d.subject}</span>
              <span style={{ color: d.answer ? "#10b981" : "#f59e0b", fontSize:11 }}>{d.answer ? "✓" : "Pending"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentsManager({ appData, save, toast$ }) {
  const students = appData.users.filter(u => u.role === "student");
  const pending = students.filter(u => !u.approved);
  const approved = students.filter(u => u.approved);

  const approve = async (id) => {
    const updated = appData.users.map(u => u.id === id ? { ...u, approved: true } : u);
    await save("users", updated);
    toast$("Student approved! ✅");
  };
  const reject = async (id) => {
    const updated = appData.users.filter(u => u.id !== id);
    await save("users", updated);
    toast$("Student removed.");
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp 0.4s ease" }}>
      {pending.length > 0 && (
        <Section title={`⏳ Pending Approval (${pending.length})`}>
          {pending.map(u => (
            <div key={u.id} style={{ background:"rgba(245,158,11,0.05)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
              <div>
                <p style={{ color:"#f1f5f9", fontWeight:600, fontSize:14 }}>{u.name}</p>
                <p style={{ color:"#64748b", fontSize:12 }}>{u.email} · {u.subject || "N/A"} · Joined {u.joinedAt}</p>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button className="btn-hover" onClick={() => approve(u.id)} style={{ padding:"8px 16px", borderRadius:8, background:"#10b981", color:"#fff", fontSize:12, fontWeight:700, fontFamily:"DM Sans, sans-serif" }}>Approve</button>
                <button className="btn-hover" onClick={() => reject(u.id)} style={{ padding:"8px 16px", borderRadius:8, background:"#ef444422", color:"#ef4444", fontSize:12, fontWeight:700, fontFamily:"DM Sans, sans-serif" }}>Reject</button>
              </div>
            </div>
          ))}
        </Section>
      )}

      <Section title={`✅ Active Students (${approved.length})`}>
        {approved.length === 0 && <Empty icon="👥" msg="No students approved yet" />}
        {approved.map(u => (
          <div key={u.id} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:"12px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
            <div>
              <p style={{ color:"#e2e8f0", fontWeight:600, fontSize:14 }}>{u.name}</p>
              <p style={{ color:"#475569", fontSize:12 }}>{u.email} · {u.subject || "All Subjects"}</p>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <span style={{ fontSize:11, color:"#10b981" }}>✓ Active</span>
              <span style={{ fontSize:11, color:"#334155" }}>{appData.submissions.filter(s=>s.userId===u.id).length} submissions</span>
              <button className="btn-hover" onClick={() => reject(u.id)} style={{ padding:"6px 12px", borderRadius:7, background:"#ef444411", color:"#ef4444", fontSize:11, fontWeight:700, fontFamily:"DM Sans, sans-serif" }}>Remove</button>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}

function PostAssignment({ appData, save, user, toast$ }) {
  const [f, setF] = useState({ title:"", subject:"Mathematics", description:"", dueTime:"11:59 PM", date: TODAY });
  const set = k => e => setF(p => ({...p, [k]: e.target.value}));

  const post = async () => {
    if (!f.title.trim() || !f.description.trim()) return toast$("Please fill all fields", "err");
    const newA = { id:"a"+Date.now(), ...f, postedBy: user.id };
    await save("assignments", [...appData.assignments, newA]);
    setF({ title:"", subject:"Mathematics", description:"", dueTime:"11:59 PM", date: TODAY });
    toast$("Assignment posted! ✅");
  };

  return (
    <div style={{ animation:"fadeUp 0.4s ease" }}>
      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"24px 26px" }}>
        <h2 style={{ fontFamily:"DM Serif Display, serif", color:"#f1f5f9", fontSize:20, marginBottom:20 }}>Post New Assignment</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <FormField label="ASSIGNMENT TITLE">
            <input value={f.title} onChange={set("title")} placeholder="e.g. Newton's Laws – Problem Set" style={inputStyle} />
          </FormField>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
            <FormField label="SUBJECT">
              <select value={f.subject} onChange={set("subject")} style={inputStyle}>
                {["Mathematics","Physics","Chemistry","Biology","All Subjects"].map(s => <option key={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="DATE">
              <input type="date" value={f.date} onChange={set("date")} style={inputStyle} />
            </FormField>
            <FormField label="DUE TIME">
              <input value={f.dueTime} onChange={set("dueTime")} placeholder="e.g. 11:59 PM" style={inputStyle} />
            </FormField>
          </div>
          <FormField label="DESCRIPTION / INSTRUCTIONS">
            <textarea value={f.description} onChange={set("description")} placeholder="Describe what students need to do..." rows={4} style={{ ...inputStyle, resize:"vertical" }} />
          </FormField>
          <button className="btn-hover" onClick={post} style={btnStyle}>Post Assignment →</button>
        </div>
      </div>

      <Section title="All Assignments" style={{ marginTop:20 }}>
        {[...appData.assignments].sort((a,b)=>b.date.localeCompare(a.date)).map(a => (
          <div key={a.id} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:"12px 18px" }}>
            <div style={{ display:"flex", gap:8, marginBottom:6 }}>
              <span style={{ fontSize:10, background: subjectColor(a.subject), color:"#fff", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>{a.subject}</span>
              <span style={{ fontSize:11, color:"#475569" }}>{a.date} · Due {a.dueTime}</span>
            </div>
            <p style={{ color:"#e2e8f0", fontSize:14, fontWeight:600 }}>{a.title}</p>
            <p style={{ color:"#64748b", fontSize:12, marginTop:4 }}>{a.description}</p>
          </div>
        ))}
      </Section>
    </div>
  );
}

function PostLecture({ appData, save, user, toast$ }) {
  const [f, setF] = useState({ title:"", subject:"Mathematics", type:"notes", content:"", videoUrl:"", date: TODAY });
  const set = k => e => setF(p => ({...p, [k]: e.target.value}));

  const post = async () => {
    if (!f.title.trim() || !f.content.trim()) return toast$("Please fill title and content", "err");
    if (f.type==="video" && !f.videoUrl.trim()) return toast$("Please add a video URL", "err");
    const newL = { id:"l"+Date.now(), ...f, postedBy: user.id };
    await save("lectures", [...appData.lectures, newL]);
    setF({ title:"", subject:"Mathematics", type:"notes", content:"", videoUrl:"", date: TODAY });
    toast$("Lecture posted! ✅");
  };

  return (
    <div style={{ animation:"fadeUp 0.4s ease" }}>
      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"24px 26px" }}>
        <h2 style={{ fontFamily:"DM Serif Display, serif", color:"#f1f5f9", fontSize:20, marginBottom:20 }}>Post New Lecture</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <FormField label="LECTURE TITLE">
            <input value={f.title} onChange={set("title")} placeholder="e.g. Laws of Motion – Complete Theory" style={inputStyle} />
          </FormField>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
            <FormField label="SUBJECT">
              <select value={f.subject} onChange={set("subject")} style={inputStyle}>
                {["Mathematics","Physics","Chemistry","Biology","General"].map(s => <option key={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="TYPE">
              <select value={f.type} onChange={set("type")} style={inputStyle}>
                <option value="notes">📝 Notes</option>
                <option value="video">🎬 Video</option>
              </select>
            </FormField>
            <FormField label="DATE">
              <input type="date" value={f.date} onChange={set("date")} style={inputStyle} />
            </FormField>
          </div>
          {f.type === "video" && (
            <FormField label="YOUTUBE EMBED URL">
              <input value={f.videoUrl} onChange={set("videoUrl")} placeholder="https://www.youtube.com/embed/VIDEO_ID" style={inputStyle} />
            </FormField>
          )}
          <FormField label={f.type==="notes" ? "LECTURE CONTENT (Markdown supported)" : "VIDEO DESCRIPTION"}>
            <textarea value={f.content} onChange={set("content")} placeholder={f.type==="notes" ? "Write lecture notes here. Use **bold**, # headings, - lists..." : "Describe what students should watch for..."} rows={6} style={{ ...inputStyle, resize:"vertical" }} />
          </FormField>
          <button className="btn-hover" onClick={post} style={btnStyle}>Post Lecture →</button>
        </div>
      </div>
    </div>
  );
}

function AllSubmissions({ appData }) {
  const sorted = [...appData.submissions].sort((a,b) => new Date(b.submittedAt)-new Date(a.submittedAt));

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14, animation:"fadeUp 0.4s ease" }}>
      {sorted.length === 0 && <Empty icon="📥" msg="No homework submitted yet" />}
      {sorted.map(s => (
        <div key={s.id} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:"16px 20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:10 }}>
            <div>
              <div style={{ display:"flex", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                <span style={{ fontSize:10, background: subjectColor(s.subject), color:"#fff", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>{s.subject}</span>
                {s.grade && <span style={{ fontSize:10, background:"#6366f122", color:"#818cf8", borderRadius:6, padding:"3px 8px", fontWeight:700 }}>{s.grade}</span>}
              </div>
              <p style={{ color:"#f1f5f9", fontWeight:600, fontSize:14 }}>{s.userName} — {s.assignmentTitle}</p>
              <p style={{ color:"#475569", fontSize:11 }}>{new Date(s.submittedAt).toLocaleString()} · {s.fileName}</p>
            </div>
          </div>
          <div style={{ background:"rgba(99,102,241,0.05)", border:"1px solid rgba(99,102,241,0.12)", borderRadius:10, padding:"12px 14px" }}>
            <div style={{ color:"#64748b", fontSize:11, fontWeight:700, marginBottom:6 }}>🤖 AI FEEDBACK</div>
            <div style={{ color:"#94a3b8", fontSize:12, lineHeight:1.7 }}><MarkdownText text={s.feedback} /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Announcements({ appData, save, user, toast$ }) {
  const [f, setF] = useState({ title:"", message:"", pinned: false });

  const post = async () => {
    if (!f.title.trim() || !f.message.trim()) return toast$("Fill all fields", "err");
    const newA = { id:"n"+Date.now(), date: TODAY, ...f, postedBy: user.id };
    await save("announcements", [...appData.announcements, newA]);
    setF({ title:"", message:"", pinned:false });
    toast$("Announcement posted! 📢");
  };

  const remove = async (id) => {
    await save("announcements", appData.announcements.filter(a => a.id !== id));
    toast$("Removed.");
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp 0.4s ease" }}>
      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"22px 24px" }}>
        <h3 style={{ color:"#f1f5f9", fontSize:16, fontWeight:600, marginBottom:16 }}>New Announcement</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <FormField label="TITLE">
            <input value={f.title} onChange={e => setF(p=>({...p,title:e.target.value}))} placeholder="Announcement title" style={inputStyle} />
          </FormField>
          <FormField label="MESSAGE">
            <textarea value={f.message} onChange={e => setF(p=>({...p,message:e.target.value}))} placeholder="Write your announcement..." rows={3} style={{ ...inputStyle, resize:"vertical" }} />
          </FormField>
          <label style={{ display:"flex", alignItems:"center", gap:8, color:"#64748b", fontSize:13, cursor:"pointer" }}>
            <input type="checkbox" checked={f.pinned} onChange={e => setF(p=>({...p,pinned:e.target.checked}))} />
            📌 Pin this announcement
          </label>
          <button className="btn-hover" onClick={post} style={btnStyle}>Post Announcement →</button>
        </div>
      </div>

      {[...appData.announcements].reverse().map(a => (
        <div key={a.id} style={{ background:"rgba(14,165,233,0.05)", border:"1px solid rgba(14,165,233,0.15)", borderRadius:12, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
          <div>
            {a.pinned && <span style={{ fontSize:10, background:"#0ea5e9", color:"#fff", borderRadius:4, padding:"2px 6px", fontWeight:700, marginRight:6 }}>PINNED</span>}
            <span style={{ color:"#e2e8f0", fontWeight:600 }}>{a.title}</span>
            <p style={{ color:"#64748b", fontSize:13, marginTop:6 }}>{a.message}</p>
            <p style={{ color:"#334155", fontSize:11, marginTop:6 }}>{a.date}</p>
          </div>
          <button onClick={() => remove(a.id)} style={{ background:"#ef444411", color:"#ef4444", border:"none", borderRadius:6, padding:"4px 10px", fontSize:11, cursor:"pointer", fontFamily:"DM Sans, sans-serif", flexShrink:0 }}>Remove</button>
        </div>
      ))}
    </div>
  );
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function Sidebar({ nav, page, setPage, user, setUser, isAdmin }) {
  return (
    <aside style={{ width:220, background:"#0a0e1a", borderRight:"1px solid #1e293b", display:"flex", flexDirection:"column", padding:"20px 12px", position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>
      <div style={{ textAlign:"center", marginBottom:24, padding:"0 8px" }}>
        <div style={{ fontSize:28, marginBottom:6 }}>⚛️</div>
        <h2 style={{ fontFamily:"DM Serif Display, serif", color:"#f1f5f9", fontSize:14, lineHeight:1.3 }}>Conceptual<br/>Learning</h2>
        <p style={{ color:"#334155", fontSize:10, marginTop:2 }}>{isAdmin ? "Coach Portal" : "Student Portal"}</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:2, flex:1 }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)} className="nav-btn-hover" style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:9, background: page===n.id ? "rgba(56,189,248,0.1)" : "transparent", color: page===n.id ? "#38bdf8" : "#64748b", fontSize:13, fontFamily:"DM Sans, sans-serif", fontWeight: page===n.id ? 600 : 400, transition:"all 0.15s", textAlign:"left", position:"relative", borderLeft: page===n.id ? "2px solid #38bdf8" : "2px solid transparent" }}>
            <span style={{ fontSize:15 }}>{n.icon}</span>
            <span style={{ flex:1 }}>{n.label}</span>
            {n.badge && <span style={{ fontSize:10, background:"#ef4444", color:"#fff", borderRadius:10, padding:"1px 6px", fontWeight:700 }}>{n.badge}</span>}
          </button>
        ))}
      </div>

      <div style={{ borderTop:"1px solid #1e293b", paddingTop:14, display:"flex", flexDirection:"column", gap:4 }}>
        <p style={{ color:"#475569", fontSize:11, padding:"0 12px" }}>{user.name}</p>
        <button className="nav-btn-hover" onClick={() => setUser(null)} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:8, background:"transparent", color:"#64748b", fontSize:12, fontFamily:"DM Sans, sans-serif", transition:"all 0.15s" }}>
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}

function TopBar({ title, user, isAdmin }) {
  return (
    <div style={{ padding:"16px 28px", borderBottom:"1px solid #1e293b", display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(10,14,26,0.8)", backdropFilter:"blur(10px)", position:"sticky", top:0, zIndex:10 }}>
      <h1 style={{ fontFamily:"DM Serif Display, serif", color:"#f1f5f9", fontSize:20 }}>{title}</h1>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ color:"#64748b", fontSize:12 }}>{user.name}</span>
        <div style={{ width:32, height:32, borderRadius:"50%", background: isAdmin ? "linear-gradient(135deg,#0ea5e9,#6366f1)" : "linear-gradient(135deg,#10b981,#0ea5e9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>
          {isAdmin ? "👨‍🏫" : "👨‍🎓"}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 style={{ color:"#475569", fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:1.2, marginBottom:12 }}>{title}</h3>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>{children}</div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label style={{ color:"#475569", fontSize:11, fontWeight:700, letterSpacing:0.8, display:"block", marginBottom:6 }}>{label}</label>
      {children}
    </div>
  );
}

function Empty({ icon, msg }) {
  return (
    <div style={{ textAlign:"center", padding:"40px 20px", color:"#334155" }}>
      <div style={{ fontSize:40, marginBottom:10 }}>{icon}</div>
      <p style={{ fontSize:14 }}>{msg}</p>
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ width:14, height:14, border:"2px solid rgba(255,255,255,0.3)", borderTop:"2px solid #fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function MarkdownText({ text }) {
  const lines = text.split("\n");
  return (
    <div>
      {lines.map((line, i) => {
        if (line.startsWith("# ")) return <h2 key={i} style={{ color:"#e2e8f0", fontSize:16, fontFamily:"DM Serif Display, serif", margin:"10px 0 6px" }}>{line.slice(2)}</h2>;
        if (line.startsWith("## ")) return <h3 key={i} style={{ color:"#cbd5e1", fontSize:14, fontWeight:700, margin:"8px 0 4px" }}>{line.slice(3)}</h3>;
        if (line.startsWith("### ")) return <h4 key={i} style={{ color:"#94a3b8", fontSize:13, fontWeight:600, margin:"6px 0 3px" }}>{line.slice(4)}</h4>;
        if (line.startsWith("- ") || line.startsWith("* ")) return <div key={i} style={{ paddingLeft:16, position:"relative", marginBottom:2 }}><span style={{ color:"#38bdf8", position:"absolute", left:4 }}>·</span>{renderInline(line.slice(2))}</div>;
        if (/^\d+\./.test(line)) return <div key={i} style={{ paddingLeft:16, marginBottom:2 }}>{renderInline(line)}</div>;
        if (line.startsWith("> ")) return <div key={i} style={{ borderLeft:"3px solid #0ea5e9", paddingLeft:12, color:"#64748b", fontStyle:"italic", margin:"4px 0" }}>{line.slice(2)}</div>;
        if (line.startsWith("**") && line.endsWith("**")) return <div key={i} style={{ fontWeight:700, color:"#e2e8f0", marginBottom:2 }}>{line.slice(2,-2)}</div>;
        if (line === "") return <div key={i} style={{ height:6 }} />;
        return <div key={i} style={{ marginBottom:2 }}>{renderInline(line)}</div>;
      })}
    </div>
  );
}

function renderInline(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((p, i) => p.startsWith("**") ? <strong key={i} style={{ color:"#e2e8f0" }}>{p.slice(2,-2)}</strong> : p);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const subjectColor = s => ({ Mathematics:"#6366f1", Physics:"#0ea5e9", Chemistry:"#10b981", Biology:"#f59e0b", Physics:"#0ea5e9" }[s] || "#64748b");

const extractGrade = (text) => {
  const match = text.match(/GRADE:\s*([A-F][+-]?)\s*[–-]\s*(\d+)/i) || text.match(/([A-F][+-]?)\s*[–-]\s*(\d+)\/100/i);
  return match ? `${match[1]} (${match[2]}/100)` : null;
};

const getGreeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
};

const inputStyle = {
  width:"100%", padding:"11px 14px", background:"#070b14", border:"1px solid #1e293b",
  borderRadius:10, color:"#e2e8f0", fontSize:13, fontFamily:"DM Sans, sans-serif"
};

const btnStyle = {
  padding:"13px 0", borderRadius:10, background:"linear-gradient(135deg, #0ea5e9, #6366f1)",
  color:"#fff", fontSize:14, fontWeight:700, fontFamily:"DM Sans, sans-serif", transition:"all 0.2s"
};
