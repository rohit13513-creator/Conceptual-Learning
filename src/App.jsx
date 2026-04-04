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
  { id:"n1", date:TODAY, title:"Welcome to Conceptual Learning!", message:"Hello everyone! Your complete learning portal is live. Check daily assignments, study lectures, submit homework for AI feedback, and discuss doubts in our community forum. Let us build strong concepts together!", pinned:true, postedBy:"coach1" },
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
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A56DB"/>
          <stop offset="100%" stopColor="#7C3AED"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#lg1)"/>
      <path d="M8 28 L8 16 Q8 14 10 13 L20 10 L30 13 Q32 14 32 16 L32 28 Q28 26 20 26 Q12 26 8 28Z" fill="white" opacity="0.12"/>
      <path d="M20 11 L10 14.5 L10 26.5 Q15 25 20 25 Q25 25 30 26.5 L30 14.5 Z" fill="white" opacity="0.95"/>
      <line x1="20" y1="11" x2="20" y2="25" stroke="#c7d2fe" strokeWidth="1"/>
      <line x1="12" y1="17" x2="19" y2="16" stroke="#93c5fd" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="12" y1="19.5" x2="19" y2="18.5" stroke="#93c5fd" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="12" y1="22" x2="19" y2="21" stroke="#93c5fd" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="21" y1="16" x2="28" y2="17" stroke="#93c5fd" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="21" y1="18.5" x2="28" y2="19.5" stroke="#93c5fd" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="21" y1="21" x2="28" y2="22" stroke="#93c5fd" strokeWidth="0.9" strokeLinecap="round"/>
      <circle cx="20" cy="32" r="1.5" fill="white" opacity="0.9"/>
      <ellipse cx="20" cy="32" rx="5.5" ry="2.2" stroke="white" strokeWidth="1" fill="none" opacity="0.7"/>
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
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
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
      {!user ? <AuthPage appData={appData} save={save} setUser={setUser} toast$={toast$}/> : user.role==="admin" ? <AdminApp appData={appData} save={save} user={user} setUser={setUser} toast$={toast$}/> : <StudentApp appData={appData} save={save} user={user} setUser={setUser} toast$={toast$}/>}
    </div>
  );
}

function AuthPage({ appData, save, setUser, toast$ }) {
  const [tab, setTab] = useState("login");
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
            {["Daily Assignments with AI Feedback","Video and Notes Lectures","Community Doubt Forum","Class-wise Student Management"].map((feat,i)=>(
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
          <p style={{textAlign:"center",color:T.textFaint,fontSize:11,marginTop:18}}>Coach login: coach@conceptual.com / coach123</p>
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
                {l.generatedByAI&&<Tg label="AI Generated" color={T.accent}/>}
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
      toast$("Claude is reviewing your homework...","warn");
      try {
        const feedback=await claudeGradeHomework(base64,file.type,assignment.title,assignment.subject);
        const grade=feedback.match(/GRADE:\s*([A-F][+-]?)\s*[-]\s*(\d+)/i);
        const sub={id:"sub"+Date.now(),userId:user.id,userName:user.name,assignmentId:selA,assignmentTitle:assignment.title,subject:assignment.subject,fileName:file.name,fileType:file.type,notes,submittedAt:new Date().toISOString(),feedback,grade:grade?grade[1]+" ("+grade[2]+"/100)":null};
        await save("submissions",[...appData.submissions,sub]);
        toast$("Homework submitted and graded by AI!");
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
              {busy?<>Grading with AI...</>:"Submit and Get AI Feedback"}
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
      {subs.length===0&&<Empty icon="🎯" msg="No submissions yet. Submit homework to get AI feedback!"/>}
      {subs.map(s=>(
        <div key={s.id} style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"18px 22px",boxShadow:T.shadow}}>
          <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}><Tg label={s.subject} color={sc(s.subject)}/>{s.grade&&<Tg label={s.grade} color={T.accent}/>}</div>
          <h3 style={{color:T.text,fontSize:15,fontWeight:600}}>{s.assignmentTitle}</h3>
          <p style={{color:T.textSub,fontSize:11,marginTop:2,marginBottom:12}}>{new Date(s.submittedAt).toLocaleString()} - {s.fileName}</p>
          <div style={{background:T.primaryLight,border:"1px solid #bfdbfe",borderRadius:10,padding:"14px 16px"}}>
            <div style={{color:T.primary,fontSize:11,fontWeight:700,marginBottom:8}}>AI FEEDBACK</div>
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
    toast$("Claude is writing your lecture notes...","warn");
    try {
      const content=await claudeGenerateLecture(f.title,f.subject,f.class);
      setF(p=>({...p,content}));
      toast$("Notes generated! Review and edit before posting.");
    } catch { toast$("Generation failed. Try again.","err"); }
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
            <textarea value={f.content} onChange={s("content")} placeholder={f.type==="notes"?"Write your notes here, or click Generate with AI below...":"Describe what students should focus on..."} rows={8} style={{...IS,resize:"vertical"}}/>
          </FF>
          {f.type==="notes"&&(
            <div style={{background:T.accentLight,border:"1px solid #ddd6fe",borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
              <div>
                <p style={{color:T.accent,fontWeight:700,fontSize:13}}>Generate Notes with Claude AI</p>
                <p style={{color:T.textSub,fontSize:12,marginTop:2}}>Enter a title above then click to auto-generate detailed lecture notes for your class.</p>
              </div>
              <button className="hb" onClick={generate} disabled={genBusy} style={{padding:"10px 20px",borderRadius:10,background:T.accent,color:"#fff",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                {genBusy?"Generating...":"Generate with AI"}
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
            <div style={{color:T.primary,fontSize:11,fontWeight:700,marginBottom:6}}>AI FEEDBACK</div>
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
