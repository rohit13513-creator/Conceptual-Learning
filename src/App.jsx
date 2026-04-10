import { useState, useEffect, useRef } from "react";

const DB = {
  async get(k) { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } catch { return null; } },
  async set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) { console.warn(e); } },
};

const TODAY = new Date().toISOString().slice(0, 10);

const SEED_USERS = [
  { id:"coach1", name:"Dr. Sharma", email:"coach@conceptual.com", password:"coach123", role:"admin", approved:true, joinedAt:TODAY, class:"" },
  { id:"s1", name:"Aditya Verma", email:"aditya@student.com", password:"pass123", role:"student", approved:true, joinedAt:TODAY, class:"Class 10" },
];
const SEED_ASSIGNMENTS = [
  { id:"a1", date:TODAY, title:"Newton's Laws – Problem Set", subject:"Physics", description:"Solve Q1–Q10 from Chapter 4. Show free-body diagrams. Mention all forces.", dueTime:"11:59 PM", postedBy:"coach1", class:"Class 10" },
  { id:"a2", date:TODAY, title:"Quadratic Equations Practice", subject:"Mathematics", description:"Complete exercises 3.1 to 3.5. Use the quadratic formula for at least 5 problems.", dueTime:"11:59 PM", postedBy:"coach1", class:"Class 10" },
];
const SEED_LECTURES = [
  { id:"l1", date:TODAY, title:"Newton's Laws of Motion – Complete Theory", subject:"Physics", type:"notes", content:"# Newton's Laws of Motion\n\n## First Law – Law of Inertia\nEvery object continues in its state of rest or uniform motion in a straight line unless acted upon by an external unbalanced force.\n\n> Inertia is the property of a body to resist changes in its state of motion.\n\n## Second Law – F = ma\nThe rate of change of momentum is directly proportional to the applied force.\n\n**Formula:** F = m x a\n\n- **F** = Force (Newtons, N)\n- **m** = Mass (kg)\n- **a** = Acceleration (m/s squared)\n\n**Solved Example:**\nA 5 kg block is pushed with 20 N. Find acceleration.\na = F/m = 20/5 = **4 m/s squared**\n\n## Third Law – Action and Reaction\nFor every action there is an equal and opposite reaction.\n\n**Examples:**\n- Rocket pushes gas backward, gas pushes rocket forward\n- You push a wall, wall pushes you back\n\n## Free Body Diagrams\n1. Draw object as a box\n2. Weight (mg) downward\n3. Normal force upward\n4. Friction opposing motion\n5. Applied force in its direction", postedBy:"coach1", class:"Class 10" },
  { id:"l2", date:TODAY, title:"Quadratic Equations – Full Walkthrough", subject:"Mathematics", type:"notes", content:"# Quadratic Equations\n\n## Standard Form\n**ax squared + bx + c = 0** where a is not equal to 0\n\n## Method 1: Factorisation\nFind two numbers that multiply to c and add to b.\n\n**Example:** x squared minus 5x + 6 = 0\n- Numbers: minus 2 and minus 3\n- (x minus 2)(x minus 3) = 0\n- **x = 2 or x = 3**\n\n## Method 2: Quadratic Formula\n**x = (minus b plus or minus root of (b squared minus 4ac)) divided by 2a**\n\n**Example:** 2x squared + 3x minus 2 = 0\na=2, b=3, c=minus 2\nD = 9 + 16 = 25\nx = (minus 3 + 5) divided by 4 = **0.5** or x = (minus 3 minus 5) divided by 4 = **minus 2**\n\n## Discriminant (D = b squared minus 4ac)\n- D greater than 0: Two distinct real roots\n- D equals 0: One repeated root\n- D less than 0: No real roots\n\n## Exam Tips\n- Rearrange to standard form first\n- Check discriminant before solving\n- Verify by substituting back", postedBy:"coach1", class:"Class 10" },
];
const SEED_ANNOUNCEMENTS = [
  { id:"n1", date:TODAY, title:"Welcome to Conceptual Learning!", message:"Hello everyone! Your complete learning portal is live. Check daily assignments, study lectures, submit homework for detailed feedback, and discuss doubts in our community forum. Let us build strong concepts together!", pinned:true, postedBy:"coach1" },
];
const CLASSES = ["Class 6","Class 7","Class 8","Class 9","Class 10","Class 11 (Science)","Class 12 (Science)","Dropper / Repeater","Other"];
const SUBJECTS = ["Mathematics","Physics","Chemistry","Biology","All Subjects"];

const T = {
  bg:"#F8FAFF", bgCard:"#FFFFFF", primary:"#1A56DB", primaryLight:"#EBF5FF", primaryDark:"#1342A8",
  accent:"#7C3AED", accentLight:"#F3EEFF", success:"#059669", successLight:"#ECFDF5",
  warning:"#D97706", warningLight:"#FFFBEB", danger:"#DC2626", dangerLight:"#FEF2F2",
  text:"#111827", textMid:"#374151", textSub:"#6B7280", textFaint:"#9CA3AF",
  border:"#E5E7EB", borderStrong:"#D1D5DB",
  shadow:"0 1px 3px rgba(0,0,0,0.08)", shadowMd:"0 4px 16px rgba(0,0,0,0.08)", shadowLg:"0 8px 32px rgba(0,0,0,0.12)",
};

async function claudeGradeHomework(base64Data, mediaType, assignmentTitle, subject) {
  const isPDF = mediaType === "application/pdf";
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-sonnet-4-20250514", max_tokens:1000,
      system:`You are an expert ${subject} tutor. Evaluate student homework with encouragement and precision. Give structured feedback. End with a grade letter and score out of 100.`,
      messages:[{ role:"user", content:[
        isPDF ? {type:"document",source:{type:"base64",media_type:"application/pdf",data:base64Data}} : {type:"image",source:{type:"base64",media_type:mediaType,data:base64Data}},
        {type:"text",text:`Evaluate this homework for: "${assignmentTitle}" (${subject})\n\nFormat:\n**STRENGTHS**\n[2-3 things done well]\n\n**AREAS TO IMPROVE**\n[Specific gaps or errors]\n\n**SUGGESTIONS**\n[Actionable advice]\n\n**OVERALL FEEDBACK**\n[2-3 sentence summary]\n\n**GRADE: [Letter] - [Score]/100**`}
      ]}]
    }),
  });
  const data = await res.json();
  return data.content?.map(b=>b.text||"").join("") || "Unable to process. Please try again.";
}

async function claudeGenerateLecture(title, subject, cls) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-sonnet-4-20250514", max_tokens:1500,
      system:`You are an expert ${subject} teacher creating lecture notes for ${cls} students (CBSE/ICSE curriculum, India). Write clear, detailed, exam-focused notes. Use markdown: # headings, **bold**, bullet points, > for important quotes. Include theory, formulas, solved examples, and exam tips.`,
      messages:[{role:"user",content:`Create complete lecture notes for: "${title}" for ${cls} ${subject}. Include clear theory, key formulas, at least 2 solved examples, important points, and exam tips. Make it detailed for self-study.`}]
    }),
  });
  const data = await res.json();
  return data.content?.map(b=>b.text||"").join("") || "Unable to generate. Please try again.";
}

function Logo({ size = 36 }) {
  const s = size;
  const uid = "u" + s;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={"bg"+uid} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1340B0"/>
          <stop offset="100%" stopColor="#6D28D9"/>
        </linearGradient>
        <linearGradient id={"yl"+uid} x1="24" y1="6" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A"/>
          <stop offset="100%" stopColor="#F59E0B"/>
        </linearGradient>
        <linearGradient id={"sh"+uid} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
      {/* Deep blue-violet rounded square background */}
      <rect width="48" height="48" rx="13" fill={"url(#bg"+uid+")"}/>
      {/* Subtle top sheen */}
      <rect x="0" y="0" width="48" height="24" rx="13" fill={"url(#sh"+uid+")"} opacity="0.6"/>
      {/* === GRADUATION CAP === */}
      {/* Cap brim - wide flat board */}
      <rect x="9" y="19" width="30" height="4" rx="2" fill="white" opacity="0.96"/>
      {/* Diamond on top of brim */}
      <rect x="21" y="12" width="6" height="6" rx="1.2" fill="white" opacity="0.96" transform="rotate(45 24 15)"/>
      {/* Cap crown / dome */}
      <path d="M16 23 L16 30 Q16 32 18.5 32.5 L24 34 L29.5 32.5 Q32 32 32 30 L32 23" fill="white" opacity="0.93"/>
      {/* Tassel cord */}
      <path d="M37 21 Q38.5 21 38.5 24 L38.5 31" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.8"/>
      {/* Tassel end */}
      <ellipse cx="38.5" cy="33" rx="2.2" ry="1.5" fill={"url(#yl"+uid+")"} opacity="0.95"/>
      <line x1="37" y1="33" x2="36" y2="37" stroke={"url(#yl"+uid+")"} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="38.5" y1="34.5" x2="38" y2="38" stroke={"url(#yl"+uid+")"} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="40" y1="33" x2="41" y2="37" stroke={"url(#yl"+uid+")"} strokeWidth="1.2" strokeLinecap="round"/>
      {/* === OPEN BOOK at bottom === */}
      <path d="M10 37 Q10 35 12 34.5 L24 36.5 L36 34.5 Q38 35 38 37 L38 41 Q36 40 24 40 Q12 40 10 41 Z" fill="white" opacity="0.15"/>
      <path d="M11 37 L11 40.5 Q17.5 39 24 39 L24 36 Q17.5 35 11 37Z" fill="white" opacity="0.72"/>
      <path d="M37 37 L37 40.5 Q30.5 39 24 39 L24 36 Q30.5 35 37 37Z" fill="white" opacity="0.72"/>
      <line x1="24" y1="36" x2="24" y2="39" stroke="#818cf8" strokeWidth="0.8" opacity="0.5"/>
      {/* Tiny lines as text on book pages */}
      <line x1="13.5" y1="37.5" x2="21" y2="37" stroke="rgba(99,102,241,0.4)" strokeWidth="0.7" strokeLinecap="round"/>
      <line x1="13.5" y1="38.8" x2="20" y2="38.3" stroke="rgba(99,102,241,0.3)" strokeWidth="0.7" strokeLinecap="round"/>
      <line x1="27" y1="37" x2="34.5" y2="37.5" stroke="rgba(99,102,241,0.4)" strokeWidth="0.7" strokeLinecap="round"/>
      <line x1="28" y1="38.3" x2="34.5" y2="38.8" stroke="rgba(99,102,241,0.3)" strokeWidth="0.7" strokeLinecap="round"/>
      {/* Gold star sparkle top-left */}
      <circle cx="10" cy="10" r="1.4" fill={"url(#yl"+uid+")"} opacity="0.9"/>
      <circle cx="7" cy="14" r="0.7" fill="white" opacity="0.5"/>
      <circle cx="14" cy="7" r="0.7" fill="white" opacity="0.5"/>
    </svg>
  );
}

function LogoFull({ size = 36 }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <Logo size={size}/>
      <div>
        <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,fontSize:size*0.47,color:T.primary,lineHeight:1.1,letterSpacing:"-0.3px"}}>Conceptual</div>
        <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:size*0.32,color:T.accent,letterSpacing:"0.4px",lineHeight:1}}>Learning</div>
      </div>
    </div>
  );
}

function GS() {
  return <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:${T.bg};font-family:'Inter',sans-serif;color:${T.text};}
    ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#f1f5f9;} ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px;}
    button{cursor:pointer;border:none;outline:none;font-family:'Inter',sans-serif;}
    input,textarea,select{outline:none;border:none;font-family:'Inter',sans-serif;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
    .hc:hover{box-shadow:${T.shadowMd}!important;transform:translateY(-1px);transition:all 0.18s;}
    .hb:hover{opacity:0.88;transform:translateY(-1px);}
    .hn:hover{background:${T.primaryLight}!important;color:${T.primary}!important;}
    textarea,input,select{color:${T.text};}
    @keyframes ticker{from{transform:translateX(0)} to{transform:translateX(-50%)}}
    @keyframes float{0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}}
    .nav-link{transition:color 0.2s;cursor:pointer;}
    .nav-link:hover{color:#1A56DB!important;}
    .btn-primary{transition:all 0.2s;cursor:pointer;}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,86,219,0.35)!important;}
    .btn-outline{transition:all 0.2s;cursor:pointer;}
    .btn-outline:hover{background:#1A56DB!important;color:white!important;}
    .card-hover{transition:all 0.22s;}
    .card-hover:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,0.12)!important;}
    .stat-num{font-family:'JetBrains Mono',monospace;}
    .section-title{font-family:'Cormorant Garamond',Georgia,serif;}
    .fade-up{animation:fadeUp 0.6s ease both;}
    .qbank-btn{transition:all 0.18s;cursor:pointer;}
    .qbank-btn:hover{background:#1A56DB!important;color:white!important;transform:translateY(-1px);}
    .ticker-wrap{overflow:hidden;white-space:nowrap;}
    .ticker-inner{display:inline-block;animation:ticker 60s linear infinite;}
  `}</style>;
}

export default function App() {
  const [appData, setAppData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      const [users,assignments,lectures,doubts,submissions,announcements] = await Promise.all([
        DB.get("cl3_users"),DB.get("cl3_assignments"),DB.get("cl3_lectures"),
        DB.get("cl3_doubts"),DB.get("cl3_submissions"),DB.get("cl3_announcements"),
      ]);
      setAppData({ users:users||SEED_USERS, assignments:assignments||SEED_ASSIGNMENTS, lectures:lectures||SEED_LECTURES, doubts:doubts||[], submissions:submissions||[], announcements:announcements||SEED_ANNOUNCEMENTS });
      setLoading(false);
    })();
  }, []);

  const save = async (key, arr) => { await DB.set("cl3_"+key, arr); setAppData(d=>({...d,[key]:arr})); };
  const toast$ = (msg, type="ok") => { setToast({msg,type}); setTimeout(()=>setToast(null),3500); };

  if (loading) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:T.bg}}>
      <GS/><Logo size={56}/>
      <div style={{marginTop:20,width:36,height:36,border:"3px solid #e2e8f0",borderTop:"3px solid "+T.primary,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
      <p style={{color:T.textSub,marginTop:14,fontSize:14}}>Loading Conceptual Learning...</p>
    </div>
  );

  return (
    <div style={{fontFamily:"'Inter',sans-serif",minHeight:"100vh",background:T.bg}}>
      <GS/>
      {toast&&<div style={{position:"fixed",top:20,right:20,zIndex:9999,padding:"12px 20px",borderRadius:10,background:toast.type==="err"?T.danger:toast.type==="warn"?T.warning:T.success,color:"#fff",fontWeight:600,fontSize:13,boxShadow:T.shadowLg,animation:"slideIn 0.3s ease",maxWidth:340}}>{toast.msg}</div>}
      {!user ? <PublicSite appData={appData} save={save} setUser={setUser} toast$={toast$}/> : user.role==="admin" ? <AdminApp appData={appData} save={save} user={user} setUser={setUser} toast$={toast$}/> : <StudentApp appData={appData} save={save} user={user} setUser={setUser} toast$={toast$}/>}
    </div>
  );
}

function AuthPage({ appData, save, setUser, toast$, initTab="login", onClose }) {
  const [tab, setTab] = useState(initTab);
  const [f, setF] = useState({name:"",email:"",password:"",confirm:"",class:""});
  const set = k => e => setF(p=>({...p,[k]:e.target.value}));

  const login = () => {
    const u = appData.users.find(u=>u.email.toLowerCase()===f.email.toLowerCase()&&u.password===f.password);
    if (!u) return toast$("Invalid email or password","err");
    if (!u.approved) return toast$("Registration pending coach approval","warn");
    setUser(u);
  };
  const register = async () => {
    if (!f.name.trim()||!f.email.trim()||!f.password||!f.class) return toast$("Please fill all fields","err");
    if (f.password!==f.confirm) return toast$("Passwords do not match","err");
    if (appData.users.find(u=>u.email.toLowerCase()===f.email.toLowerCase())) return toast$("Email already registered","err");
    const nu={id:"u"+Date.now(),name:f.name.trim(),email:f.email.trim().toLowerCase(),password:f.password,role:"student",approved:false,class:f.class,joinedAt:TODAY};
    await save("users",[...appData.users,nu]);
    toast$("Registration sent! Coach will approve your account.");
    setTab("login"); setF({name:"",email:"",password:"",confirm:"",class:""});
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",background:T.bg}}>
      <div style={{flex:1,background:"linear-gradient(145deg,"+T.primary+","+T.accent+")",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:48,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:450,height:450,borderRadius:"50%",background:"rgba(255,255,255,0.06)",top:-150,right:-150}}/>
        <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:"rgba(255,255,255,0.06)",bottom:-80,left:-60}}/>
        <div style={{position:"relative",textAlign:"center",color:"white",maxWidth:360}}>
          <Logo size={88}/>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:40,fontWeight:700,marginTop:22,lineHeight:1.15}}>Conceptual<br/>Learning</h1>
          <p style={{fontSize:16,opacity:0.85,marginTop:12,lineHeight:1.6}}>Your complete Math and Science coaching hub</p>
          <div style={{marginTop:40,display:"flex",flexDirection:"column",gap:14,textAlign:"left"}}>
            {["Daily Assignments with Feedback","Video and Notes Lectures","Community Doubt Forum","Class-wise Student Management"].map((feat,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,fontSize:14,opacity:0.9}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11}}>✓</div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{width:480,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 52px",background:"#fff"}}>
        <div style={{width:"100%",maxWidth:360}}>
          <div style={{marginBottom:30}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:T.text,fontWeight:700}}>{tab==="login"?"Welcome Back":"Create Account"}</h2>
            <p style={{color:T.textSub,fontSize:14,marginTop:5}}>{tab==="login"?"Sign in to continue learning":"Join the coaching hub"}</p>
          </div>
          <div style={{display:"flex",background:T.bg,borderRadius:10,padding:4,marginBottom:24,border:"1px solid "+T.border}}>
            {[["login","Sign In"],["register","Register"]].map(([t,l])=>(
              <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"9px 0",borderRadius:8,fontSize:13,fontWeight:600,background:tab===t?"white":"transparent",color:tab===t?T.primary:T.textSub,transition:"all 0.2s",boxShadow:tab===t?T.shadow:"none"}}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            {tab==="register"&&<FI label="Full Name" placeholder="e.g. Rahul Sharma" value={f.name} onChange={set("name")}/>}
            <FI label="Email Address" placeholder="your@email.com" value={f.email} onChange={set("email")}/>
            <FI label="Password" type="password" placeholder="Min 6 characters" value={f.password} onChange={set("password")}/>
            {tab==="register"&&<>
              <FI label="Confirm Password" type="password" placeholder="Re-enter password" value={f.confirm} onChange={set("confirm")}/>
              <div>
                <label style={{fontSize:12,fontWeight:600,color:T.textSub,display:"block",marginBottom:6}}>CLASS / STANDARD</label>
                <select value={f.class} onChange={set("class")} style={{width:"100%",padding:"11px 14px",background:T.bg,border:"1.5px solid "+T.border,borderRadius:10,fontSize:13,color:f.class?T.text:T.textFaint}}>
                  <option value="">Select your class</option>
                  {CLASSES.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
            </>}
            <button className="hb" onClick={tab==="login"?login:register} style={{padding:"13px 0",borderRadius:10,background:"linear-gradient(135deg,"+T.primary+","+T.accent+")",color:"#fff",fontSize:14,fontWeight:700,transition:"all 0.2s",marginTop:4,boxShadow:"0 4px 14px rgba(26,86,219,0.3)"}}>
              {tab==="login"?"Sign In →":"Request Access →"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function FI({ label, ...props }) {
  return (
    <div>
      {label&&<label style={{fontSize:12,fontWeight:600,color:T.textSub,display:"block",marginBottom:6}}>{label}</label>}
      <input {...props} style={{width:"100%",padding:"11px 14px",background:T.bg,border:"1.5px solid "+T.border,borderRadius:10,fontSize:13,color:T.text}}/>
    </div>
  );
}

function StudentApp({ appData, save, user, setUser, toast$ }) {
  const [page, setPage] = useState("home");
  const NAV = [
    {id:"home",icon:"🏠",label:"Dashboard"},
    {id:"assignments",icon:"📋",label:"Assignments"},
    {id:"lectures",icon:"📚",label:"Lectures"},
    {id:"submit",icon:"📤",label:"Submit HW"},
    {id:"feedback",icon:"🎯",label:"My Feedback"},
    {id:"forum",icon:"💬",label:"Doubt Forum"},
  ];
  return (
    <div style={{display:"flex",minHeight:"100vh"}}>
      <SB nav={NAV} page={page} setPage={setPage} user={user} setUser={setUser}/>
      <div style={{flex:1,overflowY:"auto",background:T.bg}}>
        <TB title={NAV.find(n=>n.id===page)?.label||""} user={user}/>
        <div style={{padding:"24px 28px",maxWidth:960,margin:"0 auto"}}>
          {page==="home"&&<StudentHome appData={appData} user={user} setPage={setPage}/>}
          {page==="assignments"&&<AssignmentsPage appData={appData} user={user}/>}
          {page==="lectures"&&<LecturesPage appData={appData} user={user}/>}
          {page==="submit"&&<SubmitHW appData={appData} save={save} user={user} toast$={toast$}/>}
          {page==="feedback"&&<MyFeedback appData={appData} user={user}/>}
          {page==="forum"&&<ForumPage appData={appData} save={save} user={user} toast$={toast$} isCoach={false}/>}
        </div>
      </div>
    </div>
  );
}

function StudentHome({ appData, user, setPage }) {
  const todayA = appData.assignments.filter(a=>a.date===TODAY&&(!a.class||a.class===user.class||a.class==="All Classes"));
  const todayL = appData.lectures.filter(l=>l.date===TODAY&&(!l.class||l.class===user.class||l.class==="All Classes"));
  const mySubs = appData.submissions.filter(s=>s.userId===user.id);
  const myDoubts = appData.doubts.filter(d=>d.userId===user.id);
  const openD = myDoubts.filter(d=>!d.replies||d.replies.length===0).length;

  const greet = () => { const h=new Date().getHours(); return h<12?"morning":h<17?"afternoon":"evening"; };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20,animation:"fadeUp 0.4s ease"}}>
      <div style={{background:"linear-gradient(135deg,"+T.primary+","+T.accent+")",borderRadius:16,padding:"24px 28px",color:"white",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-20,top:-20,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700}}>Good {greet()}, {user.name.split(" ")[0]}!</h2>
        <p style={{opacity:0.82,fontSize:13,marginTop:5}}>{new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
        <div style={{marginTop:12,display:"inline-block",background:"rgba(255,255,255,0.18)",borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:600}}>{user.class}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        {[
          {label:"Today Tasks",val:todayA.length,icon:"📋",color:T.primary,bg:T.primaryLight},
          {label:"Today Lectures",val:todayL.length,icon:"📚",color:T.accent,bg:T.accentLight},
          {label:"Submitted HW",val:mySubs.length,icon:"✅",color:T.success,bg:T.successLight},
          {label:"Open Doubts",val:openD,icon:"💬",color:T.warning,bg:T.warningLight},
        ].map(s=>(
          <div key={s.label} className="hc" style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,boxShadow:T.shadow}}>
            <div style={{width:36,height:36,borderRadius:10,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:10}}>{s.icon}</div>
            <div style={{fontSize:26,fontWeight:700,color:s.color,fontFamily:"'JetBrains Mono',monospace"}}>{s.val}</div>
            <div style={{fontSize:11,color:T.textSub,marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>
      {appData.announcements.length>0&&(
        <div style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"18px 20px",boxShadow:T.shadow}}>
          <div style={{fontSize:11,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Announcements</div>
          {appData.announcements.map(a=>(
            <div key={a.id} style={{borderLeft:"3px solid "+T.primary,paddingLeft:14,marginBottom:12}}>
              {a.pinned&&<span style={{fontSize:10,background:T.primaryLight,color:T.primary,borderRadius:4,padding:"2px 7px",fontWeight:700,marginRight:8}}>PINNED</span>}
              <span style={{color:T.text,fontWeight:600,fontSize:14}}>{a.title}</span>
              <p style={{color:T.textSub,fontSize:13,marginTop:5,lineHeight:1.6}}>{a.message}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div className="hc" onClick={()=>setPage("assignments")} style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"18px 20px",cursor:"pointer",boxShadow:T.shadow}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div><div style={{fontSize:11,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.8}}>Today Assignments</div><div style={{fontSize:28,fontWeight:700,color:T.primary,fontFamily:"'JetBrains Mono',monospace",marginTop:4}}>{todayA.length}</div><div style={{fontSize:12,color:T.textSub,marginTop:4}}>{todayA[0]?.title||"None yet"}</div></div>
            <div style={{width:44,height:44,borderRadius:12,background:T.primaryLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>📋</div>
          </div>
        </div>
        <div className="hc" onClick={()=>setPage("lectures")} style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"18px 20px",cursor:"pointer",boxShadow:T.shadow}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div><div style={{fontSize:11,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.8}}>Today Lectures</div><div style={{fontSize:28,fontWeight:700,color:T.accent,fontFamily:"'JetBrains Mono',monospace",marginTop:4}}>{todayL.length}</div><div style={{fontSize:12,color:T.textSub,marginTop:4}}>{todayL[0]?.title||"None yet"}</div></div>
            <div style={{width:44,height:44,borderRadius:12,background:T.accentLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>📚</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssignmentsPage({ appData, user }) {
  const items = [...appData.assignments].filter(a=>!a.class||a.class===user.class||a.class==="All Classes").sort((a,b)=>b.date.localeCompare(a.date));
  const submitted = appData.submissions.filter(s=>s.userId===user.id).map(s=>s.assignmentId);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:12,animation:"fadeUp 0.4s ease"}}>
      {items.length===0&&<Empty icon="📋" msg="No assignments posted yet"/>}
      {items.map(a=>{
        const done=submitted.includes(a.id);
        return (
          <div key={a.id} className="hc" style={{background:T.bgCard,border:"1px solid "+(done?"#a7f3d0":T.border),borderRadius:14,padding:"18px 22px",boxShadow:T.shadow}}>
            <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap",alignItems:"center"}}>
              <Tg label={a.subject} color={sc(a.subject)}/>{a.class&&<Tg label={a.class} color="#6366f1"/>}
              <span style={{fontSize:11,color:T.textSub}}>Date: {a.date}</span>
              <span style={{fontSize:11,color:T.textSub}}>Due: {a.dueTime}</span>
              {done&&<Tg label="Submitted" color={T.success}/>}
            </div>
            <h3 style={{color:T.text,fontSize:16,fontWeight:600,marginBottom:6}}>{a.title}</h3>
            <p style={{color:T.textSub,fontSize:13,lineHeight:1.6}}>{a.description}</p>
          </div>
        );
      })}
    </div>
  );
}

function LecturesPage({ appData, user }) {
  const [open, setOpen] = useState(null);
  const items = [...appData.lectures].filter(l=>!l.class||l.class===user.class||l.class==="All Classes").sort((a,b)=>b.date.localeCompare(a.date));
  return (
    <div style={{display:"flex",flexDirection:"column",gap:12,animation:"fadeUp 0.4s ease"}}>
      {items.length===0&&<Empty icon="📚" msg="No lectures posted yet"/>}
      {items.map(l=>(
        <div key={l.id} style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,overflow:"hidden",boxShadow:T.shadow}}>
          <div onClick={()=>setOpen(open===l.id?null:l.id)} style={{padding:"16px 22px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap",alignItems:"center"}}>
                <Tg label={l.subject} color={sc(l.subject)}/>
                <Tg label={l.type==="video"?"Video":"Notes"} color={l.type==="video"?T.warning:T.success}/>
                {l.generatedByAI&&<Tg label="Auto-Prepared" color={T.accent}/>}
                <span style={{fontSize:11,color:T.textSub}}>{l.date}</span>
              </div>
              <h3 style={{color:T.text,fontSize:15,fontWeight:600}}>{l.title}</h3>
            </div>
            <span style={{color:T.primary,fontSize:20,transform:open===l.id?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s",flexShrink:0}}>v</span>
          </div>
          {open===l.id&&(
            <div style={{padding:"0 22px 22px",borderTop:"1px solid "+T.border,paddingTop:18}}>
              {l.type==="video"?(
                <div>
                  <p style={{color:T.textSub,fontSize:13,marginBottom:14,lineHeight:1.6}}>{l.content}</p>
                  <div style={{position:"relative",paddingBottom:"56.25%",height:0,borderRadius:10,overflow:"hidden",background:"#000"}}>
                    <iframe src={l.videoUrl} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}} allowFullScreen title={l.title}/>
                  </div>
                </div>
              ):(
                <div style={{color:T.textMid,fontSize:13,lineHeight:1.9}}><MD text={l.content}/></div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SubmitHW({ appData, save, user, toast$ }) {
  const [selA, setSelA] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const ref = useRef();

  const eligible = appData.assignments.filter(a=>
    (!a.class||a.class===user.class||a.class==="All Classes")&&
    !appData.submissions.some(s=>s.userId===user.id&&s.assignmentId===a.id)
  );

  const handleFile = e => {
    const f=e.target.files[0]; if(!f) return;
    if(!["image/jpeg","image/png","application/pdf"].includes(f.type)) return toast$("Only JPEG, PNG or PDF allowed","err");
    if(f.size>10*1024*1024) return toast$("File must be under 10MB","err");
    setFile(f);
    if(f.type.startsWith("image/")){ const r=new FileReader(); r.onload=e=>setPreview(e.target.result); r.readAsDataURL(f); }
    else setPreview("pdf");
  };

  const submit = async () => {
    if(!selA) return toast$("Select an assignment","err");
    if(!file) return toast$("Upload your homework file","err");
    setBusy(true);
    const assignment=appData.assignments.find(a=>a.id===selA);
    const reader=new FileReader();
    reader.onload=async e=>{
      const base64=e.target.result.split(",")[1];
      toast$("Your homework is being reviewed...","warn");
      try {
        const feedback=await claudeGradeHomework(base64,file.type,assignment.title,assignment.subject);
        const grade=feedback.match(/GRADE:\s*([A-F][+-]?)\s*[-]\s*(\d+)/i);
        const sub={id:"sub"+Date.now(),userId:user.id,userName:user.name,assignmentId:selA,assignmentTitle:assignment.title,subject:assignment.subject,fileName:file.name,fileType:file.type,notes,submittedAt:new Date().toISOString(),feedback,grade:grade?grade[1]+" ("+grade[2]+"/100)":null};
        await save("submissions",[...appData.submissions,sub]);
        toast$("Homework submitted! Feedback ready.");
        setFile(null);setPreview(null);setNotes("");setSelA("");
      } catch(err) { toast$("Error grading. Please try again.","err"); }
      setBusy(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{animation:"fadeUp 0.4s ease"}}>
      <div style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:"24px 26px",boxShadow:T.shadow}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:T.text,fontSize:20,marginBottom:20}}>Submit Homework</h2>
        {eligible.length===0?(
          <div style={{textAlign:"center",padding:"30px 0"}}>
            <div style={{fontSize:48,marginBottom:12}}>🎉</div>
            <p style={{color:T.textSub}}>All assignments submitted! Great work.</p>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <FF label="SELECT ASSIGNMENT">
              <select value={selA} onChange={e=>setSelA(e.target.value)} style={{...IS,color:selA?T.text:T.textFaint}}>
                <option value="">-- Choose an assignment --</option>
                {eligible.map(a=><option key={a.id} value={a.id}>[{a.subject}] {a.title}</option>)}
              </select>
            </FF>
            <FF label="UPLOAD FILE (JPEG / PNG / PDF)">
              <div onClick={()=>ref.current?.click()} style={{border:"2px dashed "+T.borderStrong,borderRadius:12,padding:"28px 20px",textAlign:"center",cursor:"pointer",background:T.bg}}>
                {preview?(preview==="pdf"?<div style={{color:T.textSub}}>File: {file.name}</div>:<img src={preview} alt="preview" style={{maxHeight:160,maxWidth:"100%",borderRadius:8,objectFit:"contain"}}/>):(
                  <div><div style={{fontSize:36,marginBottom:8}}>📎</div><p style={{color:T.textSub,fontSize:13}}>Click to upload homework</p><p style={{color:T.textFaint,fontSize:11,marginTop:4}}>JPEG, PNG or PDF - Max 10MB</p></div>
                )}
              </div>
              <input ref={ref} type="file" accept=".jpg,.jpeg,.png,.pdf" style={{display:"none"}} onChange={handleFile}/>
            </FF>
            <FF label="NOTES (Optional)">
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Any comments about your submission..." rows={3} style={{...IS,resize:"vertical"}}/>
            </FF>
            <button className="hb" onClick={submit} disabled={busy} style={{...BS,display:"flex",alignItems:"center",justifyContent:"center",gap:8,opacity:busy?0.7:1}}>
              {busy?<>Reviewing...</>:"Submit and Get Feedback"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MyFeedback({ appData, user }) {
  const subs=[...appData.submissions].filter(s=>s.userId===user.id).sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt));
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14,animation:"fadeUp 0.4s ease"}}>
      {subs.length===0&&<Empty icon="🎯" msg="No submissions yet. Submit homework to get feedback!"/>}
      {subs.map(s=>(
        <div key={s.id} style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"18px 22px",boxShadow:T.shadow}}>
          <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}><Tg label={s.subject} color={sc(s.subject)}/>{s.grade&&<Tg label={s.grade} color={T.accent}/>}</div>
          <h3 style={{color:T.text,fontSize:15,fontWeight:600}}>{s.assignmentTitle}</h3>
          <p style={{color:T.textSub,fontSize:11,marginTop:2,marginBottom:12}}>{new Date(s.submittedAt).toLocaleString()} - {s.fileName}</p>
          <div style={{background:T.primaryLight,border:"1px solid #bfdbfe",borderRadius:10,padding:"14px 16px"}}>
            <div style={{color:T.primary,fontSize:11,fontWeight:700,marginBottom:8}}>FEEDBACK</div>
            <div style={{color:T.textMid,fontSize:13,lineHeight:1.8}}><MD text={s.feedback}/></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ForumPage({ appData, save, user, toast$, isCoach }) {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [openThread, setOpenThread] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [replyFile, setReplyFile] = useState({});
  const [replyPrev, setReplyPrev] = useState({});

  const doubts=[...appData.doubts].sort((a,b)=>new Date(b.askedAt)-new Date(a.askedAt));

  const postDoubt = async () => {
    if(!question.trim()) return toast$("Type your doubt","err");
    const nd={id:"d"+Date.now(),userId:user.id,userName:user.name,question:question.trim(),subject,class:user.class||"",askedAt:new Date().toISOString(),replies:[]};
    await save("doubts",[...appData.doubts,nd]);
    setQuestion(""); toast$("Doubt posted! Coach and classmates will answer.");
  };

  const postReply = async (doubtId) => {
    const text=replyText[doubtId]||"";
    const file=replyFile[doubtId];
    if(!text.trim()&&!file) return toast$("Type a reply or attach a file","err");
    let fileData=null;
    if(file){
      const allowed=["image/jpeg","image/png","video/mp4","video/webm","application/pdf"];
      if(!allowed.includes(file.type)) return toast$("Only JPEG, PNG, PDF, MP4 or WebM allowed","err");
      if(file.size>50*1024*1024) return toast$("File must be under 50MB","err");
      await new Promise(res=>{const r=new FileReader();r.onload=e=>{fileData={name:file.name,type:file.type,data:e.target.result};res();};r.readAsDataURL(file);});
    }
    const reply={id:"r"+Date.now(),authorId:user.id,authorName:user.name,isCoach:user.role==="admin",text:text.trim(),file:fileData,postedAt:new Date().toISOString()};
    await save("doubts",appData.doubts.map(d=>d.id===doubtId?{...d,replies:[...(d.replies||[]),reply]}:d));
    setReplyText(p=>({...p,[doubtId]:""}));
    setReplyFile(p=>({...p,[doubtId]:null}));
    setReplyPrev(p=>({...p,[doubtId]:null}));
    toast$("Reply posted!");
  };

  const handleRF = (doubtId,e) => {
    const f=e.target.files[0]; if(!f) return;
    setReplyFile(p=>({...p,[doubtId]:f}));
    if(f.type.startsWith("image/")){const r=new FileReader();r.onload=ev=>setReplyPrev(p=>({...p,[doubtId]:{type:"image",src:ev.target.result}}));r.readAsDataURL(f);}
    else if(f.type.startsWith("video/")) setReplyPrev(p=>({...p,[doubtId]:{type:"video",name:f.name}}));
    else setReplyPrev(p=>({...p,[doubtId]:{type:"pdf",name:f.name}}));
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"fadeUp 0.4s ease"}}>
      {!isCoach&&(
        <div style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:"20px 22px",boxShadow:T.shadow}}>
          <h3 style={{color:T.text,fontWeight:700,marginBottom:14,fontSize:15}}>Post a Doubt</h3>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div>
              <label style={{fontSize:11,fontWeight:600,color:T.textSub,display:"block",marginBottom:5}}>SUBJECT</label>
              <select value={subject} onChange={e=>setSubject(e.target.value)} style={IS}>{SUBJECTS.map(s=><option key={s}>{s}</option>)}</select>
            </div>
            <textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Describe your doubt clearly... e.g. How do I apply Newton's third law to a rocket?" rows={3} style={{...IS,resize:"vertical"}}/>
            <button className="hb" onClick={postDoubt} style={BS}>Post Doubt</button>
          </div>
        </div>
      )}
      {doubts.length===0&&<Empty icon="💬" msg="No doubts yet. Be the first to ask!"/>}
      {doubts.map(d=>(
        <div key={d.id} style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,boxShadow:T.shadow,overflow:"hidden"}}>
          <div onClick={()=>setOpenThread(openThread===d.id?null:d.id)} style={{padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap",alignItems:"center"}}>
                <Tg label={d.subject} color={sc(d.subject)}/>
                {d.class&&<Tg label={d.class} color="#6366f1"/>}
                <span style={{fontSize:11,color:T.textSub}}>{d.replies?.length||0} replies</span>
                <span style={{fontSize:11,color:T.textSub}}>by {d.userName}</span>
              </div>
              <p style={{color:T.text,fontSize:14,fontWeight:500,lineHeight:1.5}}>{d.question}</p>
              <p style={{color:T.textFaint,fontSize:11,marginTop:6}}>{new Date(d.askedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</p>
            </div>
            <span style={{color:T.primary,fontSize:16,transform:openThread===d.id?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s",flexShrink:0}}>▼</span>
          </div>
          {openThread===d.id&&(
            <div style={{borderTop:"1px solid "+T.border}}>
              {(!d.replies||d.replies.length===0)&&<div style={{padding:"14px 20px",color:T.textFaint,fontSize:13,fontStyle:"italic"}}>No replies yet. Be the first to answer!</div>}
              {(d.replies||[]).map(r=>(
                <div key={r.id} style={{padding:"14px 20px",borderBottom:"1px solid "+T.bg,background:r.isCoach?"#faf5ff":"#fff"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <div style={{width:30,height:30,borderRadius:"50%",background:r.isCoach?"linear-gradient(135deg,"+T.primary+","+T.accent+")":"linear-gradient(135deg,#10b981,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"white",fontWeight:700}}>
                      {r.authorName[0]}
                    </div>
                    <span style={{fontWeight:700,fontSize:13,color:r.isCoach?T.accent:T.text}}>{r.authorName}</span>
                    {r.isCoach&&<span style={{fontSize:10,background:T.accentLight,color:T.accent,borderRadius:4,padding:"2px 6px",fontWeight:700}}>COACH</span>}
                    <span style={{fontSize:11,color:T.textFaint,marginLeft:"auto"}}>{new Date(r.postedAt).toLocaleString()}</span>
                  </div>
                  {r.text&&<p style={{color:T.textMid,fontSize:13,lineHeight:1.7,marginBottom:r.file?10:0}}>{r.text}</p>}
                  {r.file&&(
                    r.file.type.startsWith("image/")?<img src={r.file.data} alt={r.file.name} style={{maxWidth:"100%",maxHeight:300,borderRadius:8,objectFit:"contain"}}/>
                    :r.file.type.startsWith("video/")?<video src={r.file.data} controls style={{maxWidth:"100%",maxHeight:280,borderRadius:8}}/>
                    :<a href={r.file.data} download={r.file.name} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:8,background:T.primaryLight,color:T.primary,fontSize:12,fontWeight:600,textDecoration:"none"}}>Download {r.file.name}</a>
                  )}
                </div>
              ))}
              <div style={{padding:"16px 20px",background:T.bg}}>
                <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:user.role==="admin"?"linear-gradient(135deg,"+T.primary+","+T.accent+")":"linear-gradient(135deg,#10b981,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"white",fontWeight:700,flexShrink:0,marginTop:4}}>{user.name[0]}</div>
                  <div style={{flex:1,display:"flex",flexDirection:"column",gap:8}}>
                    <textarea value={replyText[d.id]||""} onChange={e=>setReplyText(p=>({...p,[d.id]:e.target.value}))} placeholder="Write your reply..." rows={2} style={{...IS,resize:"vertical"}}/>
                    {replyPrev[d.id]&&(
                      <div style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:8,padding:"8px 12px",fontSize:12,color:T.textSub,display:"flex",alignItems:"center",gap:8}}>
                        {replyPrev[d.id].type==="image"?<img src={replyPrev[d.id].src} style={{height:40,borderRadius:4,objectFit:"cover"}} alt="prev"/>:<span>{replyPrev[d.id].type==="video"?"Video":"PDF"}: {replyPrev[d.id].name}</span>}
                        <button onClick={()=>{setReplyFile(p=>({...p,[d.id]:null}));setReplyPrev(p=>({...p,[d.id]:null}));}} style={{marginLeft:"auto",background:"none",color:T.danger,fontSize:12,fontWeight:700}}>Remove</button>
                      </div>
                    )}
                    <div style={{display:"flex",gap:8}}>
                      <label style={{padding:"8px 14px",borderRadius:8,background:T.bg,border:"1px solid "+T.border,color:T.textSub,fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                        Attach File
                        <input type="file" accept=".jpg,.jpeg,.png,.pdf,.mp4,.webm" style={{display:"none"}} onChange={e=>handleRF(d.id,e)}/>
                      </label>
                      <button className="hb" onClick={()=>postReply(d.id)} style={{...BS,padding:"8px 20px",fontSize:12,flex:1}}>Post Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AdminApp({ appData, save, user, setUser, toast$ }) {
  const [page, setPage] = useState("dashboard");
  const pendingSt=appData.users.filter(u=>u.role==="student"&&!u.approved).length;
  const NAV=[
    {id:"dashboard",icon:"📊",label:"Dashboard"},
    {id:"students",icon:"👥",label:"Students",badge:pendingSt||null},
    {id:"post-assignment",icon:"📋",label:"Post Assignment"},
    {id:"post-lecture",icon:"📚",label:"Post Lecture"},
    {id:"submissions",icon:"📥",label:"Submissions"},
    {id:"forum",icon:"💬",label:"Doubt Forum"},
    {id:"announce",icon:"📢",label:"Announcements"},
  ];
  return (
    <div style={{display:"flex",minHeight:"100vh"}}>
      <SB nav={NAV} page={page} setPage={setPage} user={user} setUser={setUser} isAdmin/>
      <div style={{flex:1,overflowY:"auto",background:T.bg}}>
        <TB title={NAV.find(n=>n.id===page)?.label||""} user={user} isAdmin/>
        <div style={{padding:"24px 28px",maxWidth:1000,margin:"0 auto"}}>
          {page==="dashboard"&&<AdminHome appData={appData}/>}
          {page==="students"&&<StudentsPage appData={appData} save={save} toast$={toast$}/>}
          {page==="post-assignment"&&<PostAssignment appData={appData} save={save} user={user} toast$={toast$}/>}
          {page==="post-lecture"&&<PostLecture appData={appData} save={save} user={user} toast$={toast$}/>}
          {page==="submissions"&&<AllSubmissions appData={appData}/>}
          {page==="forum"&&<ForumPage appData={appData} save={save} user={user} toast$={toast$} isCoach={true}/>}
          {page==="announce"&&<AnnouncePage appData={appData} save={save} user={user} toast$={toast$}/>}
        </div>
      </div>
    </div>
  );
}

function AdminHome({ appData }) {
  const students=appData.users.filter(u=>u.role==="student");
  const approved=students.filter(u=>u.approved);
  const pending=students.filter(u=>!u.approved);
  const todayA=appData.assignments.filter(a=>a.date===TODAY);
  const unanswered=appData.doubts.filter(d=>!d.replies||d.replies.length===0);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:20,animation:"fadeUp 0.4s ease"}}>
      <div style={{background:"linear-gradient(135deg,"+T.primary+","+T.accent+")",borderRadius:16,padding:"22px 28px",color:"white"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700}}>Coach Dashboard</h2>
        <p style={{opacity:0.82,fontSize:13,marginTop:5}}>{new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        {[
          {label:"Active Students",val:approved.length,icon:"🎓",color:T.success,bg:T.successLight},
          {label:"Pending Approval",val:pending.length,icon:"⏳",color:T.warning,bg:T.warningLight},
          {label:"Today Tasks",val:todayA.length,icon:"📋",color:T.primary,bg:T.primaryLight},
          {label:"Unanswered Doubts",val:unanswered.length,icon:"💬",color:T.danger,bg:T.dangerLight},
        ].map(s=>(
          <div key={s.label} className="hc" style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,boxShadow:T.shadow}}>
            <div style={{width:36,height:36,borderRadius:10,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:10}}>{s.icon}</div>
            <div style={{fontSize:26,fontWeight:700,color:s.color,fontFamily:"'JetBrains Mono',monospace"}}>{s.val}</div>
            <div style={{fontSize:11,color:T.textSub,marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"18px 20px",boxShadow:T.shadow}}>
          <div style={{fontSize:11,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Recent Submissions</div>
          {appData.submissions.length===0?<p style={{color:T.textFaint,fontSize:13}}>No submissions yet</p>:appData.submissions.slice(-5).reverse().map(s=>(
            <div key={s.id} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid "+T.bg}}>
              <span style={{color:T.text,fontSize:12,fontWeight:500}}>{s.userName}</span>
              <span style={{color:T.textSub,fontSize:11}}>{s.grade||"Pending"}</span>
            </div>
          ))}
        </div>
        <div style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"18px 20px",boxShadow:T.shadow}}>
          <div style={{fontSize:11,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Recent Doubts</div>
          {appData.doubts.length===0?<p style={{color:T.textFaint,fontSize:13}}>No doubts yet</p>:appData.doubts.slice(-5).reverse().map(d=>(
            <div key={d.id} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid "+T.bg}}>
              <span style={{color:T.text,fontSize:12,fontWeight:500}}>{d.userName}</span>
              <span style={{color:d.replies?.length>0?T.success:T.warning,fontSize:11}}>{d.replies?.length>0?d.replies.length+" replies":"No reply"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentsPage({ appData, save, toast$ }) {
  const pending=appData.users.filter(u=>u.role==="student"&&!u.approved);
  const approved=appData.users.filter(u=>u.role==="student"&&u.approved);
  const approve=async id=>{await save("users",appData.users.map(u=>u.id===id?{...u,approved:true}:u));toast$("Student approved!");};
  const reject=async id=>{await save("users",appData.users.filter(u=>u.id!==id));toast$("Removed.");};
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"fadeUp 0.4s ease"}}>
      {pending.length>0&&(
        <Sec title={"Pending Approval ("+pending.length+")"}>
          {pending.map(u=>(
            <div key={u.id} style={{background:T.warningLight,border:"1px solid #fde68a",borderRadius:12,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
              <div><p style={{color:T.text,fontWeight:600,fontSize:14}}>{u.name}</p><p style={{color:T.textSub,fontSize:12}}>{u.email} - {u.class} - Applied {u.joinedAt}</p></div>
              <div style={{display:"flex",gap:8}}>
                <button className="hb" onClick={()=>approve(u.id)} style={{padding:"8px 16px",borderRadius:8,background:T.success,color:"#fff",fontSize:12,fontWeight:700}}>Approve</button>
                <button className="hb" onClick={()=>reject(u.id)} style={{padding:"8px 16px",borderRadius:8,background:T.dangerLight,color:T.danger,fontSize:12,fontWeight:700}}>Reject</button>
              </div>
            </div>
          ))}
        </Sec>
      )}
      <Sec title={"Active Students ("+approved.length+")"}>
        {approved.length===0&&<Empty icon="👥" msg="No approved students yet"/>}
        {approved.map(u=>(
          <div key={u.id} style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"12px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,boxShadow:T.shadow}}>
            <div><p style={{color:T.text,fontWeight:600,fontSize:14}}>{u.name}</p><p style={{color:T.textSub,fontSize:12}}>{u.email} - {u.class}</p></div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontSize:11,color:T.success,fontWeight:600}}>Active</span>
              <span style={{fontSize:11,color:T.textFaint}}>{appData.submissions.filter(s=>s.userId===u.id).length} submissions</span>
              <button onClick={()=>reject(u.id)} style={{padding:"5px 12px",borderRadius:7,background:T.dangerLight,color:T.danger,fontSize:11,fontWeight:700}}>Remove</button>
            </div>
          </div>
        ))}
      </Sec>
    </div>
  );
}

function PostAssignment({ appData, save, user, toast$ }) {
  const [f,setF]=useState({title:"",subject:"Mathematics",description:"",dueTime:"11:59 PM",date:TODAY,class:"All Classes"});
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const post=async()=>{
    if(!f.title.trim()||!f.description.trim()) return toast$("Fill all fields","err");
    await save("assignments",[...appData.assignments,{id:"a"+Date.now(),...f,postedBy:user.id}]);
    setF({title:"",subject:"Mathematics",description:"",dueTime:"11:59 PM",date:TODAY,class:"All Classes"});
    toast$("Assignment posted!");
  };
  return (
    <div style={{animation:"fadeUp 0.4s ease"}}>
      <div style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:"24px 26px",boxShadow:T.shadow,marginBottom:20}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:T.text,fontSize:20,marginBottom:20}}>Post New Assignment</h2>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <FF label="TITLE"><input value={f.title} onChange={s("title")} placeholder="e.g. Newton Laws Problem Set" style={IS}/></FF>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12}}>
            <FF label="SUBJECT"><select value={f.subject} onChange={s("subject")} style={IS}>{SUBJECTS.map(x=><option key={x}>{x}</option>)}</select></FF>
            <FF label="CLASS"><select value={f.class} onChange={s("class")} style={IS}><option>All Classes</option>{CLASSES.map(c=><option key={c}>{c}</option>)}</select></FF>
            <FF label="DATE"><input type="date" value={f.date} onChange={s("date")} style={IS}/></FF>
            <FF label="DUE TIME"><input value={f.dueTime} onChange={s("dueTime")} placeholder="11:59 PM" style={IS}/></FF>
          </div>
          <FF label="INSTRUCTIONS"><textarea value={f.description} onChange={s("description")} placeholder="Describe what students need to do..." rows={4} style={{...IS,resize:"vertical"}}/></FF>
          <button className="hb" onClick={post} style={BS}>Post Assignment</button>
        </div>
      </div>
      <Sec title="All Assignments">
        {[...appData.assignments].sort((a,b)=>b.date.localeCompare(a.date)).map(a=>(
          <div key={a.id} style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"12px 18px",boxShadow:T.shadow}}>
            <div style={{display:"flex",gap:8,marginBottom:5,flexWrap:"wrap"}}><Tg label={a.subject} color={sc(a.subject)}/><Tg label={a.class||"All"} color="#6366f1"/><span style={{fontSize:11,color:T.textSub}}>{a.date} - Due {a.dueTime}</span></div>
            <p style={{color:T.text,fontSize:14,fontWeight:600}}>{a.title}</p>
            <p style={{color:T.textSub,fontSize:12,marginTop:4}}>{a.description}</p>
          </div>
        ))}
      </Sec>
    </div>
  );
}

function PostLecture({ appData, save, user, toast$ }) {
  const [f,setF]=useState({title:"",subject:"Mathematics",type:"notes",content:"",videoUrl:"",date:TODAY,class:"All Classes"});
  const [genBusy,setGenBusy]=useState(false);
  const s=k=>e=>setF(p=>({...p,[k]:e.target.value}));

  const generate=async()=>{
    if(!f.title.trim()) return toast$("Enter a lecture title first","err");
    setGenBusy(true);
    toast$("Generating your lecture notes...","warn");
    try {
      const content=await claudeGenerateLecture(f.title,f.subject,f.class);
      setF(p=>({...p,content}));
      toast$("Notes ready! Review and edit before posting.");
    } catch { toast$("Could not generate notes. Try again.","err"); }
    setGenBusy(false);
  };

  const post=async()=>{
    if(!f.title.trim()||!f.content.trim()) return toast$("Fill title and content","err");
    if(f.type==="video"&&!f.videoUrl.trim()) return toast$("Add a YouTube embed URL","err");
    await save("lectures",[...appData.lectures,{id:"l"+Date.now(),...f,postedBy:user.id,generatedByAI:false}]);
    setF({title:"",subject:"Mathematics",type:"notes",content:"",videoUrl:"",date:TODAY,class:"All Classes"});
    toast$("Lecture posted!");
  };

  return (
    <div style={{animation:"fadeUp 0.4s ease"}}>
      <div style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:"24px 26px",boxShadow:T.shadow,marginBottom:20}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",color:T.text,fontSize:20,marginBottom:20}}>Post New Lecture</h2>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <FF label="LECTURE TITLE"><input value={f.title} onChange={s("title")} placeholder="e.g. Laws of Motion Complete Theory" style={IS}/></FF>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12}}>
            <FF label="SUBJECT"><select value={f.subject} onChange={s("subject")} style={IS}>{SUBJECTS.map(x=><option key={x}>{x}</option>)}</select></FF>
            <FF label="CLASS"><select value={f.class} onChange={s("class")} style={IS}><option>All Classes</option>{CLASSES.map(c=><option key={c}>{c}</option>)}</select></FF>
            <FF label="TYPE"><select value={f.type} onChange={s("type")} style={IS}><option value="notes">Notes</option><option value="video">Video</option></select></FF>
            <FF label="DATE"><input type="date" value={f.date} onChange={s("date")} style={IS}/></FF>
          </div>
          {f.type==="video"&&<FF label="YOUTUBE EMBED URL"><input value={f.videoUrl} onChange={s("videoUrl")} placeholder="https://www.youtube.com/embed/VIDEO_ID" style={IS}/></FF>}
          <FF label={f.type==="notes"?"LECTURE NOTES (Markdown supported)":"VIDEO DESCRIPTION"}>
            <textarea value={f.content} onChange={s("content")} placeholder={f.type==="notes"?"Write your notes here, or click Auto-Generate below...":"Describe what students should focus on..."} rows={8} style={{...IS,resize:"vertical"}}/>
          </FF>
          {f.type==="notes"&&(
            <div style={{background:T.accentLight,border:"1px solid #ddd6fe",borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
              <div>
                <p style={{color:T.accent,fontWeight:700,fontSize:13}}>Auto-Generate Notes</p>
                <p style={{color:T.textSub,fontSize:12,marginTop:2}}>Enter a title above then click to automatically prepare detailed lecture notes for your class.</p>
              </div>
              <button className="hb" onClick={generate} disabled={genBusy} style={{padding:"10px 20px",borderRadius:10,background:T.accent,color:"#fff",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                {genBusy?"Generating notes...":"Auto-Generate"}
              </button>
            </div>
          )}
          <button className="hb" onClick={post} style={BS}>Post Lecture</button>
        </div>
      </div>
    </div>
  );
}

function AllSubmissions({ appData }) {
  const sorted=[...appData.submissions].sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt));
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14,animation:"fadeUp 0.4s ease"}}>
      {sorted.length===0&&<Empty icon="📥" msg="No submissions yet"/>}
      {sorted.map(s=>(
        <div key={s.id} style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"16px 20px",boxShadow:T.shadow}}>
          <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}><Tg label={s.subject} color={sc(s.subject)}/>{s.grade&&<Tg label={s.grade} color={T.accent}/>}</div>
          <p style={{color:T.text,fontWeight:600,fontSize:14}}>{s.userName} - {s.assignmentTitle}</p>
          <p style={{color:T.textSub,fontSize:11,marginBottom:10}}>{new Date(s.submittedAt).toLocaleString()} - {s.fileName}</p>
          <div style={{background:T.primaryLight,border:"1px solid #bfdbfe",borderRadius:10,padding:"12px 14px"}}>
            <div style={{color:T.primary,fontSize:11,fontWeight:700,marginBottom:6}}>FEEDBACK</div>
            <div style={{color:T.textMid,fontSize:12,lineHeight:1.7}}><MD text={s.feedback}/></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AnnouncePage({ appData, save, user, toast$ }) {
  const [f,setF]=useState({title:"",message:"",pinned:false});
  const post=async()=>{
    if(!f.title.trim()||!f.message.trim()) return toast$("Fill all fields","err");
    await save("announcements",[...appData.announcements,{id:"n"+Date.now(),date:TODAY,...f,postedBy:user.id}]);
    setF({title:"",message:"",pinned:false}); toast$("Announcement posted!");
  };
  const remove=async id=>{await save("announcements",appData.announcements.filter(a=>a.id!==id));toast$("Removed.");};
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16,animation:"fadeUp 0.4s ease"}}>
      <div style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:"22px 24px",boxShadow:T.shadow}}>
        <h3 style={{color:T.text,fontSize:16,fontWeight:700,marginBottom:16}}>New Announcement</h3>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <FF label="TITLE"><input value={f.title} onChange={e=>setF(p=>({...p,title:e.target.value}))} placeholder="Announcement title" style={IS}/></FF>
          <FF label="MESSAGE"><textarea value={f.message} onChange={e=>setF(p=>({...p,message:e.target.value}))} placeholder="Write your announcement..." rows={3} style={{...IS,resize:"vertical"}}/></FF>
          <label style={{display:"flex",alignItems:"center",gap:8,color:T.textSub,fontSize:13,cursor:"pointer"}}>
            <input type="checkbox" checked={f.pinned} onChange={e=>setF(p=>({...p,pinned:e.target.checked}))}/> Pin this announcement
          </label>
          <button className="hb" onClick={post} style={BS}>Post Announcement</button>
        </div>
      </div>
      {[...appData.announcements].reverse().map(a=>(
        <div key={a.id} style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,boxShadow:T.shadow}}>
          <div>
            {a.pinned&&<span style={{fontSize:10,background:T.primaryLight,color:T.primary,borderRadius:4,padding:"2px 6px",fontWeight:700,marginRight:6}}>PINNED</span>}
            <span style={{color:T.text,fontWeight:600}}>{a.title}</span>
            <p style={{color:T.textSub,fontSize:13,marginTop:6}}>{a.message}</p>
            <p style={{color:T.textFaint,fontSize:11,marginTop:6}}>{a.date}</p>
          </div>
          <button onClick={()=>remove(a.id)} style={{background:T.dangerLight,color:T.danger,borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0}}>Remove</button>
        </div>
      ))}
    </div>
  );
}

function SB({ nav, page, setPage, user, setUser, isAdmin }) {
  return (
    <aside style={{width:228,background:"#fff",borderRight:"1px solid "+T.border,display:"flex",flexDirection:"column",padding:"20px 12px",position:"sticky",top:0,height:"100vh",overflow:"hidden"}}>
      <div style={{padding:"0 8px 20px",borderBottom:"1px solid "+T.border,marginBottom:12}}>
        <LogoFull size={34}/>
        <div style={{marginTop:8,fontSize:11,color:T.textFaint,fontWeight:500}}>{isAdmin?"Coach Portal":"Student Portal"}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:2,flex:1,overflowY:"auto"}}>
        {nav.map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)} className="hn" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:9,background:page===n.id?T.primaryLight:"transparent",color:page===n.id?T.primary:T.textSub,fontSize:13,fontWeight:page===n.id?600:400,transition:"all 0.15s",textAlign:"left",borderLeft:"2px solid "+(page===n.id?T.primary:"transparent")}}>
            <span style={{fontSize:15}}>{n.icon}</span>
            <span style={{flex:1}}>{n.label}</span>
            {n.badge&&<span style={{fontSize:10,background:T.danger,color:"#fff",borderRadius:10,padding:"1px 6px",fontWeight:700}}>{n.badge}</span>}
          </button>
        ))}
      </div>
      <div style={{borderTop:"1px solid "+T.border,paddingTop:12,display:"flex",flexDirection:"column",gap:4}}>
        <div style={{padding:"0 12px 6px",display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,"+T.primary+","+T.accent+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"white",fontWeight:700,flexShrink:0}}>{user.name[0]}</div>
          <div><p style={{color:T.text,fontSize:12,fontWeight:600,lineHeight:1.2}}>{user.name}</p><p style={{color:T.textFaint,fontSize:10}}>{user.class||"Coach"}</p></div>
        </div>
        <button className="hn" onClick={()=>setUser(null)} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 12px",borderRadius:8,background:"transparent",color:T.textSub,fontSize:12,transition:"all 0.15s"}}>Sign Out</button>
      </div>
    </aside>
  );
}

function TB({ title, user, isAdmin }) {
  return (
    <div style={{padding:"16px 28px",borderBottom:"1px solid "+T.border,display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(255,255,255,0.94)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:10}}>
      <h1 style={{fontFamily:"'Playfair Display',serif",color:T.text,fontSize:20,fontWeight:700}}>{title}</h1>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{color:T.textSub,fontSize:12}}>{user.name}</span>
        <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,"+T.primary+","+T.accent+")",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:13,fontWeight:700}}>{user.name[0]}</div>
      </div>
    </div>
  );
}

function Sec({ title, children }) {
  return (
    <div>
      <div style={{fontSize:12,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:1.2,marginBottom:10}}>{title}</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>{children}</div>
    </div>
  );
}

function FF({ label, children }) {
  return (
    <div>
      {label&&<label style={{fontSize:11,fontWeight:700,color:T.textSub,letterSpacing:0.8,display:"block",marginBottom:6}}>{label}</label>}
      {children}
    </div>
  );
}

function Empty({ icon, msg }) {
  return (
    <div style={{textAlign:"center",padding:"40px 20px",color:T.textFaint}}>
      <div style={{fontSize:44,marginBottom:10}}>{icon}</div>
      <p style={{fontSize:14}}>{msg}</p>
    </div>
  );
}

function Tg({ label, color }) {
  return <span style={{fontSize:10,background:color+"18",color,borderRadius:6,padding:"3px 8px",fontWeight:700,whiteSpace:"nowrap"}}>{label}</span>;
}

function MD({ text }) {
  return (
    <div>{(text||"").split("\n").map((line,i)=>{
      if(line.startsWith("# ")) return <h2 key={i} style={{color:T.text,fontSize:15,fontFamily:"'Playfair Display',serif",margin:"10px 0 5px"}}>{line.slice(2)}</h2>;
      if(line.startsWith("## ")) return <h3 key={i} style={{color:T.textMid,fontSize:13,fontWeight:700,margin:"8px 0 3px"}}>{line.slice(3)}</h3>;
      if(line.startsWith("### ")) return <h4 key={i} style={{color:T.textMid,fontSize:12,fontWeight:700,margin:"6px 0 2px"}}>{line.slice(4)}</h4>;
      if(line.startsWith("- ")||line.startsWith("* ")) return <div key={i} style={{paddingLeft:14,position:"relative",marginBottom:2}}><span style={{color:T.primary,position:"absolute",left:4}}>·</span>{ri(line.slice(2))}</div>;
      if(/^\d+\./.test(line)) return <div key={i} style={{paddingLeft:14,marginBottom:2}}>{ri(line)}</div>;
      if(line.startsWith("> ")) return <div key={i} style={{borderLeft:"3px solid "+T.primary,paddingLeft:12,color:T.textSub,fontStyle:"italic",margin:"4px 0"}}>{line.slice(2)}</div>;
      if(line==="") return <div key={i} style={{height:6}}/>;
      return <div key={i} style={{marginBottom:2}}>{ri(line)}</div>;
    })}</div>
  );
}

function ri(text) {
  return text.split(/(\*\*.*?\*\*)/g).map((p,i)=>p.startsWith("**")?<strong key={i} style={{color:T.text}}>{p.slice(2,-2)}</strong>:p);
}

const sc=s=>({Mathematics:T.accent,Physics:T.primary,Chemistry:T.success,Biology:"#d97706"}[s]||T.textSub);

const IS={width:"100%",padding:"11px 14px",background:T.bg,border:"1.5px solid "+T.border,borderRadius:10,fontSize:13};
const BS={padding:"13px 0",borderRadius:10,background:"linear-gradient(135deg,"+T.primary+","+T.accent+")",color:"#fff",fontSize:14,fontWeight:700,transition:"all 0.2s",boxShadow:"0 4px 14px rgba(26,86,219,0.25)"};


// ═══════════════════ PUBLIC HOMEPAGE ═══════════════════

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


// ── MAIN APP ──────────────────────────────────────────────────────────────────
function PublicSite({ appData, save, setUser, toast$ }) {
  const [page, setPage] = useState("home");
  const [authTab, setAuthTab] = useState(null); // null=hidden, "login" or "register"
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
            <button onClick={() => setAuthTab("login")} className="btn-outline"
              style={{ padding: "8px 18px", borderRadius: 8, border: "1.5px solid #1A56DB", color: "#1A56DB", fontSize: 13, fontWeight: 600, background: "transparent" }}>
              Login
            </button>
            <button onClick={() => setAuthTab("register")} className="btn-primary"
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

      {/* ── AUTH MODAL ── */}
      {authTab && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setAuthTab(null)}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:440,animation:"fadeUp 0.3s ease"}}>
            <AuthPage appData={appData} save={save} setUser={setUser} toast$={toast$} initTab={authTab} onClose={()=>setAuthTab(null)}/>
          </div>
        </div>
      )}

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
                <button onClick={() => {}} className="btn-primary" style={{ padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg,#1A56DB,#7C3AED)", color: "white", fontSize: 12, fontWeight: 600 }} onClick={()=>setAuthTab('login')}>Login</button>
                <button onClick={() => {}} className="btn-primary" style={{ padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg,#059669,#0ea5e9)", color: "white", fontSize: 12, fontWeight: 600 }} onClick={()=>setAuthTab('register')}>Register</button>
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
                <button className="btn-primary" onClick={()=>setAuthTab("register")} style={{ padding: "14px 28px", borderRadius: 10, background: "white", color: "#1A56DB", fontSize: 15, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.25)", cursor:"pointer" }}>
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
          <button className="btn-primary" onClick={()=>setAuthTab("register")} style={{ padding: "14px 32px", borderRadius: 10, background: "white", color: "#1A56DB", fontSize: 15, fontWeight: 700, cursor:"pointer" }}>Register for Free Trial</button>
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
