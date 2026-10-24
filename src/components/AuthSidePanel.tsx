import React from "react";
import { School, MonitorSmartphone, ChevronRight } from "lucide-react";

// The left-hand information panel of the sign-in screens. It changes with the tab: the Log In tab shows
// the advantages of logging in, the Register tab shows what an account gives and the two ways to join
// (offline in the classroom, or online). Wide screens get the full panel; phones get a short folded
// version above the form.

type Tab = "login" | "register";
interface Props { tab: Tab; isLightMode: boolean; onSwitch: (tab: Tab) => void; }

const LOGIN_POINTS: [string, string][] = [
  ["Your notes, ready", "Concept-first notes with real diagrams, for your own class."],
  ["Practice and quizzes", "Solved questions, question banks and timed self-assessments."],
  ["Homework and scores", "See your homework, upload your pages and get quick feedback with your score."],
  ["Revision and rank", "Fresh 30-mark revision papers and your class leaderboard."],
  ["Always up to date", "Latest updates from your teacher and chapter PDFs to download."],
];

const REGISTER_POINTS: [string, string][] = [
  ["Made for your class", "You see the notes, questions and quizzes of your own class only."],
  ["Approved by your teacher", "Your registration is checked and approved before you get access."],
  ["Your progress in one place", "Scores, revision papers and leaderboard, saved to your account."],
];

const MODES = [
  {
    icon: School,
    tone: "from-emerald-400 to-teal-400",
    title: "Offline student",
    text: "You attend regular classes in person and get daily homework, checked on the portal with quick feedback.",
    note: "Admission is through a test of 50 marks. Seats are limited.",
  },
  {
    icon: MonitorSmartphone,
    tone: "from-violet-400 to-cyan-400",
    title: "Online student",
    text: "You study from anywhere, at your own pace, using the whole learning portal: notes, simulators, solved questions and question banks.",
    note: "No homework is assigned to online students.",
  },
];

const Body: React.FC<Props & { compact?: boolean }> = ({ tab, isLightMode, onSwitch, compact }) => {
  const head = isLightMode ? "text-slate-900" : "text-white";
  const body = isLightMode ? "text-slate-600" : "text-slate-300";
  const points = tab === "login" ? LOGIN_POINTS : REGISTER_POINTS;
  return (
    <div className="space-y-5">
      {!compact && (
        <>
          <span className="cl-eyebrow">{tab === "login" ? "Welcome back" : "Join us"}</span>
          <h2 className={`text-4xl xl:text-5xl font-black tracking-tight leading-[1.08] ${head}`}>
            {tab === "login" ? <>Log in and <span className="cl-gradient-text">keep learning.</span></> : <>Join Conceptual <span className="cl-gradient-text">Learning.</span></>}
          </h2>
        </>
      )}
      <p className={`text-xs font-black uppercase tracking-[0.18em] ${isLightMode ? "text-cyan-700" : "text-cyan-300"}`}>
        {tab === "login" ? "What you get when you log in" : "What your account gives you"}
      </p>
      <ul className="space-y-3">
        {points.map(([t, d]) => (
          <li key={t} className="flex items-start gap-3">
            <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 text-slate-950 flex items-center justify-center text-[12px] font-black">✓</span>
            <span className={`text-sm font-semibold ${body}`}><b className={head}>{t}.</b> {d}</span>
          </li>
        ))}
      </ul>

      {tab === "register" && (
        <div className="space-y-3 pt-1">
          <p className={`text-xs font-black uppercase tracking-[0.18em] ${isLightMode ? "text-cyan-700" : "text-cyan-300"}`}>Two ways to join</p>
          <div className="grid gap-3">
            {MODES.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.title} className="cl-card p-4 flex gap-3.5">
                  <span className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${m.tone} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-slate-950" />
                  </span>
                  <div className="space-y-1">
                    <p className={`text-sm font-black ${head}`}>{m.title}</p>
                    <p className={`text-[13px] font-medium leading-relaxed ${body}`}>{m.text}</p>
                    <p className={`text-[12px] font-bold ${isLightMode ? "text-slate-700" : "text-slate-200"}`}>{m.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => onSwitch(tab === "login" ? "register" : "login")}
        className={`inline-flex items-center gap-1 text-sm font-black cursor-pointer ${isLightMode ? "text-cyan-700 hover:text-cyan-900" : "text-cyan-300 hover:text-cyan-200"}`}
      >
        {tab === "login" ? "New here? Register" : "Already registered? Log in"} <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// Full panel for wide screens: brand and headline plus the content above.
export const AuthSidePanel: React.FC<Props> = (props) => (
  <div className="hidden lg:flex flex-col gap-7 max-w-md xl:max-w-lg relative z-10 cl-view-in" key={props.tab}>
    <div className="flex items-center gap-4">
      <img src="/favicon.svg" alt="" className="w-14 h-14 rounded-2xl shadow-2xl shadow-cyan-500/25" />
      <div className="leading-none">
        <p className={`text-xl font-black tracking-tight ${props.isLightMode ? "text-slate-900" : "text-white"}`}>Conceptual Learning</p>
        <p className="mt-1.5 text-[11px] font-black uppercase tracking-[0.5em] cl-gradient-text">Online</p>
      </div>
    </div>
    <Body {...props} />
  </div>
);

// Folded version above the form on phones and tablets.
export const AuthMobileInfo: React.FC<Props> = (props) => (
  <details className="lg:hidden w-full max-w-md relative z-10 cl-card px-5 py-3.5 mb-4 group">
    <summary className={`cursor-pointer list-none flex items-center justify-between text-sm font-black ${props.isLightMode ? "text-slate-900" : "text-white"}`}>
      <span>{props.tab === "login" ? "Why log in?" : "Why register, and how to join"}</span>
      <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
    </summary>
    <div className="pt-4"><Body {...props} compact /></div>
  </details>
);
