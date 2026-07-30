import React, { useState, useMemo, useEffect, useRef } from 'react';
import OpticsCanvas, {
  computeImage,
  getImageDescription,
  getPositionNote,
} from './components/OpticsCanvas';
import type { OpticsType } from './components/OpticsCanvas';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { Quiz } from './components/Quiz';
import { LearnOptics, renderGradePdfNotes } from './components/LearnOptics';
import LearnChemistry from './components/LearnChemistry';
import { LearnBiology } from './components/LearnBiology';
import { CompetitiveOptics } from './components/CompetitiveOptics';
import { AboutUs } from './components/AboutUs';
import ReactionSimulator from './components/ReactionSimulator';
import KnowYourChemicals from './components/KnowYourChemicals';
import {
  NCERT_SOLVED_QUESTIONS,
  SHORT_ANSWER_QUESTIONS,
  LONG_ANSWER_QUESTIONS,
  ASSERTION_REASON_QUESTIONS,
  COMPETENCY_QUESTIONS,
} from './examData';
import {
  CLASS10_NCERT_SOLVED as CLASSX_NCERT_SOLVED,
  CLASS10_MCQS as CLASSX_MCQS,
  CLASS10_ASSERTIONS as CLASSX_ASSERTION_REASON,
  CLASS10_VERY_SHORT as CLASSX_VERY_SHORT,
  CLASS10_SHORT as CLASSX_SHORT,
  CLASS10_LONG as CLASSX_LONG,
  CLASS10_COMPETENCY as CLASSX_CASE_COMPETENCY,
  CLASS10_SELF_ASSESSMENT as CLASSX_SELF_ASSESSMENT,
} from './data/class10';
import {
  CLASS8_NCERT_SOLVED as CLASSVIII_NCERT_SOLVED,
  CLASS8_MCQS as CLASSVIII_MCQS,
  CLASS8_ASSERTIONS as CLASSVIII_ASSERTION_REASON,
  CLASS8_VERY_SHORT as CLASSVIII_VERY_SHORT,
  CLASS8_SHORT as CLASSVIII_SHORT,
  CLASS8_LONG as CLASSVIII_LONG,
  CLASS8_COMPETENCY as CLASSVIII_CASE_COMPETENCY,
  CLASS8_SELF_ASSESSMENT as CLASSVIII_SELF_ASSESSMENT,
} from './data/class8';
import {
  CHEMISTRY10_NCERT_SOLVED,
  CHEMISTRY10_MCQS,
  CHEMISTRY10_ASSERTIONS as CHEMISTRY10_ASSERTION_REASON,
  CHEMISTRY10_VERY_SHORT,
  CHEMISTRY10_SHORT,
  CHEMISTRY10_LONG,
  CHEMISTRY10_COMPETENCY,
  CHEMISTRY10_SELF_ASSESSMENT,
} from './data/chemistry10';
import {
  COMPETITION_MCQS,
  COMPETITION_SELF_ASSESSMENT,
} from './data/competitions';
import {
  Home,
  BookOpen,
  HelpCircle,
  ChevronRight,
  Compass,
  Zap,
  FileText,
  Layers,
  Sliders,
  List,
  ArrowLeft,
  Lock,
  User,
  UserCheck,
  RefreshCw,
  Copy,
  Plus,
  LogOut,
  Key,
  Share2,
  Check,
  CheckCircle2,
  Shield,
  Smartphone,
  Trash2,
  AlertTriangle,
  Eye,
  EyeOff,
  ChevronDown,
  GraduationCap,
  Award,
  Info,
  Beaker,
  Sparkles,
  Sun,
  Moon,
  Upload,
  Calculator,
  Dna,
  FlaskConical,
  Megaphone,
  Construction,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';

const TYPES: { id: OpticsType; label: string; group: 'mirror' | 'lens' }[] = [
  { id: 'plane-mirror',   label: 'Plane Mirror',   group: 'mirror' },
  { id: 'concave-mirror', label: 'Concave Mirror', group: 'mirror' },
  { id: 'convex-mirror',  label: 'Convex Mirror',  group: 'mirror' },
  { id: 'convex-lens',   label: 'Convex Lens',    group: 'lens' },
  { id: 'concave-lens',  label: 'Concave Lens',   group: 'lens' },
];

const Fraction: React.FC<{ num: React.ReactNode; den: React.ReactNode }> = ({ num, den }) => (
  <span className="inline-flex flex-col items-center align-middle mx-1 text-xs font-mono font-bold text-teal-300">
    <span className="border-b border-teal-500/60 pb-0.5 text-center leading-none px-1" style={{ minWidth: '0.85rem' }}>{num}</span>
    <span className="text-center pt-0.5 leading-none px-1">{den}</span>
  </span>
);

const renderTextWithFractions = (text: string): React.ReactNode => {
  const regex = /([a-zA-Z0-9_()+\-\.]+)\s*\/\s*([a-zA-Z0-9_()+\-\.]+)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }
    const numerator = match[1];
    const denominator = match[2];
    parts.push(
      <Fraction key={matchIndex} num={numerator} den={denominator} />
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? <>{parts}</> : text;
};

type QuickCase = { label: string; u: number; f: number; hideObject?: boolean };

const CASES: Record<string, QuickCase[]> = {
  'plane-mirror': [
    { label: 'In Front',       u: 200,  f: 100 },
  ],
  'concave-mirror': [
    { label: 'At Infinity',    u: 9999, f: 100, hideObject: true },
    { label: 'Beyond C',       u: 280,  f: 100 },
    { label: 'At C',           u: 200,  f: 100 },
    { label: 'Bet. C & F',     u: 140,  f: 100 },
    { label: 'At F',           u: 100,  f: 100 },
    { label: 'Bet. F & P',     u: 60,   f: 100 },
  ],
  'convex-mirror': [
    { label: 'At Infinity',    u: 9999, f: 100, hideObject: true },
    { label: 'In Front',       u: 200,  f: 100 },
  ],
  'convex-lens': [
    { label: 'At Infinity',        u: 9999, f: 100, hideObject: true },
    { label: 'Beyond 2F₁',        u: 280,  f: 100 },
    { label: 'At 2F₁',            u: 200,  f: 100 },
    { label: 'Bet. F₁ & 2F₁',     u: 140,  f: 100 },
    { label: 'At F₁',             u: 100,  f: 100 },
    { label: 'Bet. O & F₁',       u: 60,   f: 100 },
  ],
  'concave-lens': [
    { label: 'At Infinity',    u: 9999, f: 100, hideObject: true },
    { label: 'In Front',       u: 200,  f: 100 },
  ],
};

const RAY_LABELS: Record<'mirror' | 'lens', Record<number, { short: string; desc: string; color: string }>> = {
  mirror: {
    1: { short: 'Parallel Ray', desc: 'Parallel to axis → reflects through F', color: '#f87171' },
    2: { short: 'C-Ray (Through C)', desc: 'Through C → reflects back through C',   color: '#4ade80' },
    3: { short: 'F-Ray (Through F)', desc: 'Through F → reflects parallel to axis',  color: '#facc15' },
    4: { short: 'P-Ray (At Pole P)', desc: 'Incident obliquely at Pole P → reflects symmetrically', color: '#c084fc' },
  },
  lens: {
    1: { short: 'Parallel Ray', desc: 'Parallel to axis → refracts through F₂', color: '#f87171' },
    2: { short: 'O-Ray (Through O)', desc: 'Through optical centre O → undeviated',   color: '#4ade80' },
    3: { short: 'F₁-Ray (Through F₁)', desc: 'Through F₁ → emerges parallel to axis',   color: '#facc15' },
    4: { short: 'Oblique Ray', desc: 'Oblique ray → refracts to pass through image tip', color: '#c084fc' },
  },
};

const getQuestionGrade = (question: string): '8th' | '10th' | 'competitive' => {
  const text = question.toLowerCase();
  
  // Rule 1: High level formulas or wave behaviors -> Competitions / JEE
  if (
    text.includes("lens maker") ||
    text.includes("lensmaker") ||
    text.includes("prism") ||
    text.includes("critical angle") ||
    text.includes("total internal reflection") ||
    text.includes("tir ") ||
    text.includes("dispersion") ||
    text.includes("interference") ||
    text.includes("diffraction") ||
    text.includes("polarization") ||
    text.includes("wave optics") ||
    text.includes("deviation") ||
    text.includes("brewster") ||
    text.includes("numerical aperture") ||
    text.includes("optical fiber")
  ) {
    return 'competitive';
  }
  
  // Rule 2: Plane mirrors, simple eye care, basic reflection structure -> Class VIII
  if (
    text.includes("plane mirror") ||
    text.includes("kaleidoscope") ||
    text.includes("eye") ||
    text.includes("retina") ||
    text.includes("pupil") ||
    text.includes("iris") ||
    text.includes("rod") ||
    text.includes("cone") ||
    text.includes("blind spot") ||
    (text.includes("reflection") && !text.includes("spherical") && !text.includes("lens") && !text.includes("concave") && !text.includes("convex"))
  ) {
    return '8th';
  }
  
  // Rule 3: Spherical mirrors, lenses, magnification, refraction, power of lens -> Class X CBSE
  return '10th';
};

interface PrintViewProps {
  grade: string;
}

function PrintView({ grade }: PrintViewProps) {
  const [mirrorCase, setMirrorCase] = useState(0);
  const [lensCase, setLensCase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  let displayGrade = '10th';
  let title = 'Class X Science - Light Handbook';
  if (grade === '8th' || grade === '9th' || grade === '8') {
    displayGrade = '8th';
    title = 'CBSE Class 8 Science - Light Notebook';
  } else if (grade === '12th' || grade === 'competitive' || grade === '12' || grade === 'comp') {
    displayGrade = '12th';
    title = 'CBSE Class 12 Physics - Advanced Optics Handbook';
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 p-8 sm:p-12 font-sans select-text study-notes-container leading-relaxed">
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body {
          background-color: #ffffff !important;
          color: #0d172a !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          font-family: Calibri, Carlito, "Segoe UI", sans-serif !important;
          font-size: 17.5px !important;
          font-weight: 700 !important;
        }
        @media print {
          html, body {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            font-family: Calibri, Carlito, "Segoe UI", sans-serif !important;
            font-weight: 700 !important;
          }
          @page {
            size: A4 portrait;
            margin: 0.6cm !important;
          }
          .no-print {
            display: none !important;
          }
        }
        p, li {
          font-family: Calibri, Carlito, "Segoe UI", sans-serif !important;
          font-weight: 700 !important;
          font-size: 17.5px !important;
        }
        h1 {
          font-size: 34px !important;
          font-weight: 950 !important;
          margin-top: 4px !important;
          margin-bottom: 3px !important;
        }
        h2 {
          font-size: 24px !important;
          font-weight: 900 !important;
          border-bottom: 2.5px solid #e2e8f0 !important;
          padding-bottom: 2px !important;
          margin-top: 8px !important;
          margin-bottom: 3px !important;
        }
        h3 {
          font-size: 20px !important;
          font-weight: 850 !important;
          margin-top: 6px !important;
          margin-bottom: 2px !important;
        }
        ul {
          list-style-type: disc !important;
          padding-left: 20px !important;
          margin-top: 2px !important;
          margin-bottom: 2px !important;
          font-size: 17.5px !important;
        }
        ol {
          list-style-type: decimal !important;
          padding-left: 20px !important;
          margin-top: 2px !important;
          margin-bottom: 2px !important;
          font-size: 17.5px !important;
        }
        li {
          margin-bottom: 2px !important;
          font-size: 17.5px !important;
        }
        .study-notes-container [class*="space-y-"] > :not([hidden]) ~ :not([hidden]) {
          margin-top: 4px !important;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
          font-family: Calibri, Carlito, "Segoe UI", sans-serif !important;
        }
        th, td {
          border: 1px solid #cbd5e1 !important;
          padding: 8px 12px !important;
          text-align: left;
          font-size: 15px !important;
          line-height: 1.4;
          font-weight: 700 !important;
        }
        th {
          background-color: #f1f5f9 !important;
          color: #0d172a !important;
          font-weight: 850 !important;
          font-size: 15.5px !important;
        }
        tr:nth-child(even) {
          background-color: #f8fafc;
        }
        .bg-slate-50, .bg-slate-100, .bg-cyan-50, .bg-emerald-50, .bg-indigo-50, .bg-yellow-50 {
          background-color: #f8fafc !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 12px;
          padding: 12px !important;
          font-family: Calibri, Carlito, "Segoe UI", sans-serif !important;
          margin: 10px 0;
        }
        .bg-amber-50 {
          background-color: #fffbeb !important;
          border: 1px solid #fde68a !important;
          border-radius: 12px;
          padding: 12px !important;
          color: #78350f !important;
          font-family: Calibri, Carlito, "Segoe UI", sans-serif !important;
          margin: 10px 0;
        }
        .bg-amber-50 * {
          color: #78350f !important;
        }
        code {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 85% !important;
          background-color: #f1f5f9 !important;
          color: #0f172a !important;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700 !important;
        }
      `}} />
      
      {/* Floating control bar for quick screen printing/closing */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-2xl border border-slate-700 no-print z-50 font-sans">
        <span className="text-xs font-mono text-slate-300 font-bold">{title}</span>
        <div className="w-[1px] h-4 bg-slate-700 mx-1"></div>
        <button
          onClick={() => window.print()}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full transition cursor-pointer"
        >
          Print / Save PDF
        </button>
        <button
          onClick={() => window.close()}
          className="bg-slate-800 hover:bg-slate-755 text-slate-200 hover:text-white font-bold text-xs px-3.5 py-1.5 rounded-full transition cursor-pointer"
        >
          Close Tab
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {renderGradePdfNotes(displayGrade, mirrorCase, setMirrorCase, lensCase, setLensCase, () => {})}
      </div>
    </div>
  );
}

const ADMIN_EMAILS = ['rohit13513@gmail.com', 'conceptuallearningonline@gmail.com'];

export default function App() {
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "light";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isLightMode) {
        document.documentElement.classList.add("light");
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.remove("light");
        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");
      }
    }
  }, [isLightMode]);

  const [activeView, setActiveView] = useState<'hub' | 'simulator' | 'chemSim' | 'kyc' | 'learn' | 'chemNotes' | 'bioNotes' | 'ncert' | 'qbank' | 'competitive' | 'admin' | 'assessment' | 'portal' | 'about' | 'classUnavailable' | 'homework' | 'startStudying' | 'latestNews' | 'profile' | 'forum'>('hub');
  const [viewHistory, setViewHistory] = useState<('hub' | 'simulator' | 'chemSim' | 'kyc' | 'learn' | 'chemNotes' | 'bioNotes' | 'ncert' | 'qbank' | 'competitive' | 'admin' | 'assessment' | 'portal' | 'about' | 'classUnavailable' | 'homework' | 'startStudying' | 'latestNews' | 'profile' | 'forum')[]>(['hub']);

  const changeView = (newView: 'hub' | 'simulator' | 'chemSim' | 'kyc' | 'learn' | 'chemNotes' | 'bioNotes' | 'ncert' | 'qbank' | 'competitive' | 'admin' | 'assessment' | 'portal' | 'about' | 'classUnavailable' | 'homework' | 'startStudying' | 'latestNews' | 'profile' | 'forum') => {
    setViewHistory(prev => {
      if (prev[prev.length - 1] === newView) return prev;
      return [...prev, newView];
    });
    setActiveView(newView);
  };

  const goBack = () => {
    if (viewHistory.length > 1) {
      const newHistory = [...viewHistory];
      newHistory.pop(); // remove current view
      const prevView = newHistory[newHistory.length - 1];
      setViewHistory(newHistory);
      setActiveView(prevView);
    }
  };

  // ── AUTHENTICATION & DEVICE REGISTRATION STATES ──
  interface DeviceSession {
    deviceId: string;
    deviceName: string;
    lastUsed: string;
  }
  interface ActiveUser {
    name: string;
    email: string;
    role: 'admin' | 'student';
    status: 'pending' | 'approved' | 'rejected';
    devices: DeviceSession[];
    studentClass?: string;
    studentType?: 'offline' | 'online';
  }

  const [user, setUser] = useState<ActiveUser | null>(null);

  // ── CLASS-SPECIFIC CONTENT ACCESS ──
  // Registered students are hard-locked to their own registered class's content across Notes,
  // Solve NCERT, Question Bank, and Self Assessment -- no switcher to other classes is shown.
  // Simulators remain open to every logged-in user regardless of class. The admin and shared
  // test accounts are exempt so they can freely QA any class's material.
  const CLASS_EXEMPT_EMAILS = [...ADMIN_EMAILS, 'test@rayoptica.com'];
  const isClassExempt = !user || CLASS_EXEMPT_EMAILS.includes(user.email);
  const CLASS_TRACK_MAP: Record<string, '8th' | '9th' | '10th' | '12th' | 'unavailable'> = {
    'VIII': '8th',
    'IX': '9th',
    'X': '10th',
    'XI': 'unavailable',
    'XII': '12th',
  };
  const studentTrack: '8th' | '9th' | '10th' | '12th' | 'unavailable' | null = isClassExempt
    ? null
    : (CLASS_TRACK_MAP[user?.studentClass || ''] || 'unavailable');

  // Shared filter used by every class-scoped nav dropdown (Notes/Solve NCERT/Question Bank/Self
  // Assessment): exempt accounts see every item unchanged; locked students only ever see the
  // item(s) tagged with their own track, so there is never a switcher to another class's content.
  type ClassNavItem = { label: string; grade: '8th' | '9th' | '10th' | '12th'; onClick: () => void };
  const filterNavItemsByClass = (items: ClassNavItem[]): ClassNavItem[] => {
    if (isClassExempt) return items;
    if (!studentTrack || studentTrack === 'unavailable') return [];
    return items.filter(i => i.grade === studentTrack);
  };
  const [deviceId, setDeviceId] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  
  // Custom device detector restricting dynamically to Laptop, Mobile Phone, or Tablet
  const defaultDevice = () => {
    const ua = navigator.userAgent;
    if (/android|iphone|ipod/i.test(ua)) return "Mobile Phone";
    if (/ipad/i.test(ua) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2)) return "Tablet";
    return "Laptop";
  };
  const [deviceType, setDeviceType] = useState<'Laptop' | 'Mobile Phone' | 'Tablet'>(defaultDevice());

  // Login & Register Form Inputs
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regWhatsappSameAsPhone, setRegWhatsappSameAsPhone] = useState(true);
  const [regPassword, setRegPassword] = useState('');
  const [regPhoneOtp, setRegPhoneOtp] = useState('');
  const [regStudentClass, setRegStudentClass] = useState<'VIII' | 'IX' | 'X' | 'XI' | 'XII'>('X');
  const [regStudentType, setRegStudentType] = useState<'offline' | 'online'>('offline');
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [publicEmails, setPublicEmails] = useState<any[]>([]);
  const [copiedCodeCode, setCopiedCodeCode] = useState<string | null>(null);
  
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Change Password States
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState<string | null>(null);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);

  // Forgot Password States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<'request' | 'reset'>('request');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState('');
  const [forgotPasswordNewPassword, setForgotPasswordNewPassword] = useState('');
  const [forgotPasswordConfirmPassword, setForgotPasswordConfirmPassword] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(null);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState<string | null>(null);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  // Profile States
  const [profileDob, setProfileDob] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profileFavSubject, setProfileFavSubject] = useState('');
  const [profileHobbies, setProfileHobbies] = useState('');
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  // Forum States
  const [forumThreads, setForumThreads] = useState<any[]>([]);
  const [forumThreadsLoading, setForumThreadsLoading] = useState(false);
  const [forumActiveThreadId, setForumActiveThreadId] = useState<string | null>(null);
  const [forumThreadDetail, setForumThreadDetail] = useState<any | null>(null);
  const [forumReplies, setForumReplies] = useState<any[]>([]);
  const [forumThreadLoading, setForumThreadLoading] = useState(false);
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadBody, setNewThreadBody] = useState('');
  const [newThreadImage, setNewThreadImage] = useState<File | null>(null);
  const [newThreadPosting, setNewThreadPosting] = useState(false);
  const [newThreadError, setNewThreadError] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [replyPosting, setReplyPosting] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  const [forumPendingThreads, setForumPendingThreads] = useState<any[]>([]);
  const [forumPendingReplies, setForumPendingReplies] = useState<any[]>([]);
  const [forumPendingLoading, setForumPendingLoading] = useState(false);

  // Admin Dashboard States
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [adminInvites, setAdminInvites] = useState<any[]>([]);
  const [adminEmails, setAdminEmails] = useState<any[]>([]);
  const [adminHomework, setAdminHomework] = useState<any[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [newStudentName, setNewStudentName] = useState('');
  const [checkNowLoading, setCheckNowLoading] = useState(false);
  const [checkNowResult, setCheckNowResult] = useState<string | null>(null);

  // Homework Upload States
  const homeworkFileInputRef = useRef<HTMLInputElement>(null);
  const [homeworkSubject, setHomeworkSubject] = useState('');
  const [homeworkFiles, setHomeworkFiles] = useState<File[]>([]);
  const [homeworkUploading, setHomeworkUploading] = useState(false);
  const [homeworkError, setHomeworkError] = useState<string | null>(null);
  const [homeworkSuccess, setHomeworkSuccess] = useState<string | null>(null);
  const [mySubmissions, setMySubmissions] = useState<any[]>([]);
  const [homeworkLoading, setHomeworkLoading] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');

  // Homework Assignment States (posted by admin, seen by students)
  const todayDateStr = new Date().toISOString().slice(0, 10);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);
  const [assignTitle, setAssignTitle] = useState('');
  const [assignDescription, setAssignDescription] = useState('');
  const [assignSubject, setAssignSubject] = useState('');
  const [assignTargetClass, setAssignTargetClass] = useState<'All' | '8th' | '9th' | '10th' | '12th'>('All');
  const [assignAssignedDate, setAssignAssignedDate] = useState(todayDateStr);
  const [assignFile, setAssignFile] = useState<File | null>(null);
  const [assignUploading, setAssignUploading] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);
  const [assignSuccess, setAssignSuccess] = useState<string | null>(null);

  // Feedback banner for Approve/Deny/Reset-Devices actions in the admin panel -- these are
  // fire-and-forget row actions with no other visible confirmation, so without this a
  // successful click looks identical to a silently-failed one.
  const [adminActionMessage, setAdminActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  // Active Roster table can get very long with many students -- collapsible so the admin can
  // hide it instead of scrolling past dozens of rows to reach the sections below.
  const [showRoster, setShowRoster] = useState(true);
  // Which class-group sub-tables inside the roster are collapsed, keyed by studentClass
  // (e.g. "X"). Empty by default -- every class group starts expanded.
  const [collapsedRosterClasses, setCollapsedRosterClasses] = useState<Set<string>>(new Set());

  // Missing-submissions report (admin only)
  const [missingReport, setMissingReport] = useState<any[]>([]);
  const [missingReportLoading, setMissingReportLoading] = useState(false);

  // Announcements / Latest Updates States (posted by admin, seen by everyone)
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceMessage, setAnnounceMessage] = useState('');
  const [announceTargetClass, setAnnounceTargetClass] = useState<'All' | '8th' | '9th' | '10th' | '12th'>('All');
  const [announceUploading, setAnnounceUploading] = useState(false);
  const [announceError, setAnnounceError] = useState<string | null>(null);
  const [announceSuccess, setAnnounceSuccess] = useState<string | null>(null);

  // Device Fingerprinting and Session Relaunch Effect
  useEffect(() => {
    let devId = localStorage.getItem('optics_v1_device_id');
    if (!devId) {
      devId = 'DEV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      localStorage.setItem('optics_v1_device_id', devId);
    }
    setDeviceId(devId);
    setDeviceName(deviceType);

    const localUser = localStorage.getItem('optics_v1_user');
    const sessionUser = sessionStorage.getItem('optics_v1_user');
    if (localUser) {
      try {
        setUser(JSON.parse(localUser));
      } catch (e) {
        localStorage.removeItem('optics_v1_user');
      }
    } else if (sessionUser) {
      try {
        setUser(JSON.parse(sessionUser));
      } catch (e) {
        sessionStorage.removeItem('optics_v1_user');
      }
    }
  }, [deviceType]);

  // Click outside listener for dropdown global menus
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#global-nav-tabs')) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setAuthError('Please fill in both Email and Password fields.');
      return;
    }
    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          deviceId,
          deviceName: deviceType
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }
      setUser(data.user);
      if (keepLoggedIn) {
        localStorage.setItem('optics_v1_user', JSON.stringify(data.user));
        sessionStorage.removeItem('optics_v1_user');
      } else {
        sessionStorage.setItem('optics_v1_user', JSON.stringify(data.user));
        localStorage.removeItem('optics_v1_user');
      }
      setAuthSuccess('Welcome back! Authentication approved.');
      changeView('hub');
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // Fetch public email logs (simulated student inbox)
  const fetchPublicLogs = async () => {
    try {
      const resp = await fetch('/api/public/logs');
      if (resp.ok) {
        const data = await resp.json();
        setPublicEmails(data.emailLogs || []);
      }
    } catch (err) {
      console.warn("Error fetching logs:", err);
    }
  };

  // Poll logs periodically so student can grab verification codes without leaving page
  useEffect(() => {
    fetchPublicLogs();
    const interval = setInterval(fetchPublicLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRequestOtp = async () => {
    if (!regEmail || !regPhone) {
      setAuthError('Please fill in both Email Address and Phone Number to request a mobile verification OTP.');
      return;
    }
    setOtpLoading(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail, phone: regPhone })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to dispatch verification code.');
      }
      setOtpSent(true);
      setAuthSuccess(data.message);
      fetchPublicLogs();
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regWhatsapp || !regPassword) {
      setAuthError('Please fill in Name, Email, Phone, WhatsApp Number, and Password.');
      return;
    }
    if (!regPhoneOtp) {
      setAuthError('Please enter the 4-digit verification code sent to your email.');
      return;
    }
    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          phone: regPhone,
          whatsappNumber: regWhatsapp,
          phoneOtp: regPhoneOtp,
          studentClass: regStudentClass,
          studentType: regStudentType
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed.');
      }
      setAuthSuccess(data.message);
      
      // Verification was successful! Set auth tab back to login where pending notice will guide the student.
      setAuthTab('login');
      setLoginEmail(regEmail);
      setRegPhoneOtp('');
      setOtpSent(false);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('optics_v1_user');
    sessionStorage.removeItem('optics_v1_user');
    setLoginPassword('');
    setRegPassword('');
    setRegPhoneOtp('');
    setOtpSent(false);
    setAuthError(null);
    setAuthSuccess(null);
    changeView('hub');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setChangePasswordError(null);
    setChangePasswordSuccess(null);
    if (newPasswordInput !== confirmPasswordInput) {
      setChangePasswordError('New password and confirmation do not match.');
      return;
    }
    setChangePasswordLoading(true);
    try {
      const resp = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, currentPassword: currentPasswordInput, newPassword: newPasswordInput })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to change password.');
      setChangePasswordSuccess('Password changed successfully.');
      setCurrentPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
    } catch (err: any) {
      setChangePasswordError(err.message);
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const handleForgotPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) return;
    setForgotPasswordError(null);
    setForgotPasswordSuccess(null);
    setForgotPasswordLoading(true);
    try {
      const resp = await fetch('/api/forgot-password/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotPasswordEmail })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to send reset code.');
      setForgotPasswordSuccess(data.message);
      setForgotPasswordStep('reset');
    } catch (err: any) {
      setForgotPasswordError(err.message);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleForgotPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordError(null);
    setForgotPasswordSuccess(null);
    if (forgotPasswordNewPassword !== forgotPasswordConfirmPassword) {
      setForgotPasswordError('New password and confirmation do not match.');
      return;
    }
    setForgotPasswordLoading(true);
    try {
      const resp = await fetch('/api/forgot-password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotPasswordEmail, otp: forgotPasswordOtp, newPassword: forgotPasswordNewPassword })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to reset password.');
      setForgotPasswordSuccess('Password reset successfully. You can now log in with your new password.');
      setForgotPasswordOtp('');
      setForgotPasswordNewPassword('');
      setForgotPasswordConfirmPassword('');
      setLoginEmail(forgotPasswordEmail);
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordStep('request');
      }, 2000);
    } catch (err: any) {
      setForgotPasswordError(err.message);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProfileError(null);
    setProfileSuccess(null);
    setProfileSaving(true);
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('dateOfBirth', profileDob);
      formData.append('bio', profileBio);
      formData.append('favoriteSubject', profileFavSubject);
      formData.append('hobbies', profileHobbies);
      if (profilePhotoFile) formData.append('photo', profilePhotoFile);

      const resp = await fetch('/api/profile/update', { method: 'POST', body: formData });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to save profile.');

      setUser(data.user);
      if (localStorage.getItem('optics_v1_user')) {
        localStorage.setItem('optics_v1_user', JSON.stringify(data.user));
      } else {
        sessionStorage.setItem('optics_v1_user', JSON.stringify(data.user));
      }
      setProfilePhotoFile(null);
      setProfileSuccess('Profile updated successfully.');
    } catch (err: any) {
      setProfileError(err.message);
    } finally {
      setProfileSaving(false);
    }
  };

  // Forum
  const fetchForumThreads = async () => {
    setForumThreadsLoading(true);
    try {
      const resp = await fetch(`/api/forum/threads?email=${encodeURIComponent(user?.email || '')}`);
      const data = await resp.json();
      setForumThreads(data.threads || []);
    } catch (err) {
      // Silent
    } finally {
      setForumThreadsLoading(false);
    }
  };

  const fetchForumThreadDetail = async (id: string) => {
    setForumThreadLoading(true);
    try {
      const resp = await fetch(`/api/forum/threads/${id}?email=${encodeURIComponent(user?.email || '')}`);
      const data = await resp.json();
      if (resp.ok) {
        setForumThreadDetail(data.thread);
        setForumReplies(data.replies || []);
      }
    } catch (err) {
      // Silent
    } finally {
      setForumThreadLoading(false);
    }
  };

  const openForumThread = (id: string) => {
    setForumActiveThreadId(id);
    fetchForumThreadDetail(id);
  };

  const backToForumList = () => {
    setForumActiveThreadId(null);
    setForumThreadDetail(null);
    setForumReplies([]);
    fetchForumThreads();
  };

  const handlePostThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newThreadTitle.trim() || !newThreadBody.trim()) return;
    setNewThreadPosting(true);
    setNewThreadError(null);
    try {
      const formData = new FormData();
      formData.append('title', newThreadTitle);
      formData.append('body', newThreadBody);
      formData.append('authorEmail', user.email);
      formData.append('authorName', user.name);
      if (newThreadImage) formData.append('image', newThreadImage);

      const resp = await fetch('/api/forum/threads', { method: 'POST', body: formData });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to post thread.');
      setNewThreadTitle('');
      setNewThreadBody('');
      setNewThreadImage(null);
      setShowNewThreadForm(false);
      fetchForumThreads();
    } catch (err: any) {
      setNewThreadError(err.message);
    } finally {
      setNewThreadPosting(false);
    }
  };

  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !forumActiveThreadId || !replyBody.trim()) return;
    setReplyPosting(true);
    setReplyError(null);
    try {
      const formData = new FormData();
      formData.append('body', replyBody);
      formData.append('authorEmail', user.email);
      formData.append('authorName', user.name);
      if (replyImage) formData.append('image', replyImage);

      const resp = await fetch(`/api/forum/threads/${forumActiveThreadId}/replies`, { method: 'POST', body: formData });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to post reply.');
      setReplyBody('');
      setReplyImage(null);
      fetchForumThreadDetail(forumActiveThreadId);
    } catch (err: any) {
      setReplyError(err.message);
    } finally {
      setReplyPosting(false);
    }
  };

  const handleDeleteForumThread = async (id: string) => {
    if (!user) return;
    try {
      const resp = await fetch('/api/admin/forum/delete-thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ id })
      });
      if (resp.ok) { backToForumList(); fetchForumPending(); }
    } catch (err) {
      // Silent
    }
  };

  const handleDeleteForumReply = async (id: string) => {
    if (!user) return;
    try {
      const resp = await fetch('/api/admin/forum/delete-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ id })
      });
      if (resp.ok) {
        if (forumActiveThreadId) fetchForumThreadDetail(forumActiveThreadId);
        fetchForumPending();
      }
    } catch (err) {
      // Silent
    }
  };

  const fetchForumPending = async () => {
    if (!user || !ADMIN_EMAILS.includes(user.email)) return;
    setForumPendingLoading(true);
    try {
      const resp = await fetch('/api/admin/forum/pending', { headers: { 'x-admin-email': user.email } });
      const data = await resp.json();
      setForumPendingThreads(data.threads || []);
      setForumPendingReplies(data.replies || []);
    } catch (err) {
      // Silent
    } finally {
      setForumPendingLoading(false);
    }
  };

  const handleApproveForumThread = async (id: string) => {
    if (!user) return;
    try {
      const resp = await fetch('/api/admin/forum/approve-thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ id })
      });
      if (resp.ok) fetchForumPending();
    } catch (err) {
      // Silent
    }
  };

  const handleApproveForumReply = async (id: string) => {
    if (!user) return;
    try {
      const resp = await fetch('/api/admin/forum/approve-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ id })
      });
      if (resp.ok) fetchForumPending();
    } catch (err) {
      // Silent
    }
  };

  // Admins dashboard fetchers
  const fetchAdminData = async () => {
    if (!user || !ADMIN_EMAILS.includes(user.email)) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const [dashResp, homeworkResp] = await Promise.all([
        fetch('/api/admin/dashboard', { headers: { 'x-admin-email': user.email } }),
        fetch('/api/admin/homework', { headers: { 'x-admin-email': user.email } })
      ]);
      const data = await dashResp.json();
      if (!dashResp.ok) {
        throw new Error(data.error || 'Failed to sync admin logs.');
      }
      setAdminUsers(data.users || []);
      setAdminInvites(data.inviteCodes || []);
      setAdminEmails(data.emailLogs || []);

      const homeworkData = await homeworkResp.json();
      if (homeworkResp.ok) {
        setAdminHomework(homeworkData.submissions || []);
      }
    } catch (err: any) {
      setAdminError(err.message);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleCheckHomeworkNow = async () => {
    if (!user) return;
    setCheckNowLoading(true);
    try {
      const resp = await fetch('/api/admin/homework/check-now', {
        method: 'POST',
        headers: { 'x-admin-email': user.email },
      });
      const data = await resp.json();
      setCheckNowResult(resp.ok ? `Checked ${data.checked} submission(s).` : (data.error || 'Failed to run check.'));
      fetchAdminData();
    } catch (err: any) {
      setCheckNowResult(err.message);
    } finally {
      setCheckNowLoading(false);
    }
  };

  useEffect(() => {
    if (activeView === 'admin' && user?.email && ADMIN_EMAILS.includes(user.email)) {
      fetchAdminData();
    }
  }, [activeView]);

  // Homework assignments (posted by admin, visible to everyone logged in)
  const fetchAssignments = async () => {
    setAssignmentsLoading(true);
    try {
      const resp = await fetch('/api/homework/assignments');
      const data = await resp.json();
      setAssignments(data.assignments || []);
    } catch (err) {
      // Silent — list simply stays empty on network failure.
    } finally {
      setAssignmentsLoading(false);
    }
  };

  const visibleAssignments = useMemo(() => {
    return assignments.filter(a => a.targetClass === 'All' || isClassExempt || a.targetClass === studentTrack);
  }, [assignments, isClassExempt, studentTrack]);

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return null;
    return new Date(deadline).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
  };

  // Announcements / Latest Updates (posted by admin, visible to everyone logged in)
  const fetchAnnouncements = async () => {
    setAnnouncementsLoading(true);
    try {
      const resp = await fetch('/api/announcements');
      const data = await resp.json();
      setAnnouncements(data.announcements || []);
    } catch (err) {
      // Silent — list simply stays empty on network failure.
    } finally {
      setAnnouncementsLoading(false);
    }
  };

  const visibleAnnouncements = useMemo(() => {
    return announcements.filter(a => a.targetClass === 'All' || isClassExempt || a.targetClass === studentTrack);
  }, [announcements, isClassExempt, studentTrack]);

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !announceTitle.trim() || !announceMessage.trim()) return;
    setAnnounceUploading(true);
    setAnnounceError(null);
    setAnnounceSuccess(null);
    try {
      const resp = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ title: announceTitle, message: announceMessage, targetClass: announceTargetClass })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to post announcement.');
      setAnnounceSuccess('Update posted successfully.');
      setAnnounceTitle('');
      setAnnounceMessage('');
      setAnnounceTargetClass('All');
      fetchAnnouncements();
    } catch (err: any) {
      setAnnounceError(err.message);
    } finally {
      setAnnounceUploading(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!user) return;
    try {
      const resp = await fetch('/api/admin/announcements/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ id })
      });
      if (resp.ok) fetchAnnouncements();
    } catch (err) {
      // Silent
    }
  };

  const handleAssignHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !assignTitle.trim()) return;
    setAssignUploading(true);
    setAssignError(null);
    setAssignSuccess(null);
    try {
      const formData = new FormData();
      formData.append('title', assignTitle);
      formData.append('description', assignDescription);
      formData.append('subject', assignSubject);
      formData.append('targetClass', assignTargetClass);
      formData.append('assignedDate', assignAssignedDate);
      if (assignFile) formData.append('file', assignFile);
      const resp = await fetch('/api/admin/homework/assign', {
        method: 'POST',
        headers: { 'x-admin-email': user.email },
        body: formData
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to post homework assignment.');
      setAssignSuccess(`"${data.assignment?.title || assignTitle}" was posted successfully.`);
      setAssignTitle('');
      setAssignDescription('');
      setAssignSubject('');
      setAssignTargetClass('All');
      setAssignAssignedDate(todayDateStr);
      setAssignFile(null);
      fetchAssignments();
      fetchMissingReport();
    } catch (err: any) {
      setAssignError(err.message);
    } finally {
      setAssignUploading(false);
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    if (!user) return;
    setAdminActionMessage(null);
    try {
      const resp = await fetch('/api/admin/homework/delete-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ id })
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok) {
        setAdminActionMessage({ type: 'success', text: 'Assignment deleted.' });
        fetchAssignments();
        fetchMissingReport();
      } else {
        setAdminActionMessage({ type: 'error', text: data.error || 'Failed to delete the assignment.' });
      }
    } catch (err) {
      setAdminActionMessage({ type: 'error', text: 'Failed to delete the assignment -- check your connection and try again.' });
    }
  };

  const fetchMissingReport = async () => {
    if (!user) return;
    setMissingReportLoading(true);
    try {
      const resp = await fetch('/api/admin/homework/missing', { headers: { 'x-admin-email': user.email } });
      const data = await resp.json();
      setMissingReport(data.report || []);
    } catch (err) {
      // Silent
    } finally {
      setMissingReportLoading(false);
    }
  };

  // Student homework fetch + upload
  const fetchMyHomework = async () => {
    if (!user) return;
    setHomeworkLoading(true);
    try {
      const resp = await fetch(`/api/homework/mine?email=${encodeURIComponent(user.email)}`);
      const data = await resp.json();
      setMySubmissions(data.submissions || []);
    } catch (err) {
      // Silent — history list simply stays empty on network failure.
    } finally {
      setHomeworkLoading(false);
    }
  };

  useEffect(() => {
    if (activeView === 'homework' && user) {
      fetchMyHomework();
      fetchAssignments();
    }
    if (activeView === 'hub' && user && user.studentType !== 'online') {
      fetchMyHomework();
    }
    if ((activeView === 'hub' || activeView === 'latestNews') && user) {
      fetchAssignments();
      fetchAnnouncements();
    }
    if (activeView === 'admin' && user?.email && ADMIN_EMAILS.includes(user.email)) {
      fetchAssignments();
      fetchAnnouncements();
      fetchMissingReport();
      fetchForumPending();
    }
    if (activeView === 'profile' && user) {
      setProfileDob(user.dateOfBirth || '');
      setProfileBio(user.bio || '');
      setProfileFavSubject(user.favoriteSubject || '');
      setProfileHobbies(user.hobbies || '');
      setProfileError(null);
      setProfileSuccess(null);
    }
    if (activeView === 'forum' && user) {
      setForumActiveThreadId(null);
      setForumThreadDetail(null);
      setForumReplies([]);
      setShowNewThreadForm(false);
      fetchForumThreads();
    }
  }, [activeView, user]);

  // Phone camera photos are routinely 3-10MB each. Vercel's serverless functions reject any
  // request body over ~4.5MB before our code even runs, returning a plain-text error instead of
  // JSON -- so a handful of full-resolution photos was enough to break every upload. Shrinking
  // each photo in the browser first (long edge capped, re-encoded as JPEG) keeps real submissions
  // well under that ceiling without asking students to do anything differently.
  const compressImageFile = async (file: File, maxDimension = 1600, quality = 0.75): Promise<File> => {
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') return file;
    try {
      const bitmap = await createImageBitmap(file);
      let { width, height } = bitmap;
      if (width > maxDimension || height > maxDimension) {
        const scale = maxDimension / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return file;
      ctx.drawImage(bitmap, 0, 0, width, height);
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
      if (!blob || blob.size >= file.size) return file;
      return new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' });
    } catch {
      return file;
    }
  };

  const MAX_HOMEWORK_FILES = 15;

  const handleHomeworkFileSelect = (files: File[]) => {
    if (files.length > MAX_HOMEWORK_FILES) {
      setHomeworkError(`Please select at most ${MAX_HOMEWORK_FILES} photos at a time -- you picked ${files.length}. The first ${MAX_HOMEWORK_FILES} have been kept. For longer homework, it's easier to scan all your pages into a single PDF (using your phone's scanner app, e.g. Google Drive, Adobe Scan, or your phone's built-in scanner) and upload that one PDF instead -- there's no page limit on PDFs.`);
      setHomeworkFiles(files.slice(0, MAX_HOMEWORK_FILES));
    } else {
      setHomeworkError(null);
      setHomeworkFiles(files);
    }
  };

  const handleHomeworkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || homeworkFiles.length === 0) return;
    setHomeworkUploading(true);
    setHomeworkError(null);
    setHomeworkSuccess(null);
    try {
      const filesToUpload = await Promise.all(homeworkFiles.map((f) => compressImageFile(f)));
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('subject', homeworkSubject);
      if (selectedAssignmentId) formData.append('assignmentId', selectedAssignmentId);
      filesToUpload.forEach((f) => formData.append('files', f));
      const resp = await fetch('/api/homework/upload', { method: 'POST', body: formData });
      let data: any = {};
      try {
        data = await resp.json();
      } catch {
        throw new Error('Upload failed -- the files may still be too large or your connection dropped mid-upload. Try uploading fewer photos at once.');
      }
      if (!resp.ok) throw new Error(data.error || 'Failed to upload homework.');
      setHomeworkSuccess('Homework submitted successfully! It will be checked soon.');
      setHomeworkFiles([]);
      if (homeworkFileInputRef.current) homeworkFileInputRef.current.value = '';
      setHomeworkSubject('');
      setSelectedAssignmentId('');
      fetchMyHomework();
    } catch (err: any) {
      setHomeworkError(err.message);
    } finally {
      setHomeworkUploading(false);
    }
  };

  const handleApproveUser = async (email: string) => {
    if (!user) return;
    setAdminActionMessage(null);
    try {
      const resp = await fetch('/api/admin/approve-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ email })
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok) {
        setAdminActionMessage({ type: 'success', text: `Approved ${email}.` });
        fetchAdminData();
      } else {
        setAdminActionMessage({ type: 'error', text: data.error || `Failed to approve ${email}.` });
      }
    } catch (e) {
      setAdminActionMessage({ type: 'error', text: `Failed to approve ${email} -- check your connection and try again.` });
    }
  };

  const handleRejectUser = async (email: string) => {
    if (!user) return;
    setAdminActionMessage(null);
    try {
      const resp = await fetch('/api/admin/reject-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ email })
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok) {
        setAdminActionMessage({ type: 'success', text: `Rejected ${email}.` });
        fetchAdminData();
      } else {
        setAdminActionMessage({ type: 'error', text: data.error || `Failed to reject ${email}.` });
      }
    } catch (e) {
      setAdminActionMessage({ type: 'error', text: `Failed to reject ${email} -- check your connection and try again.` });
    }
  };

  const handleResetDevices = async (email: string) => {
    if (!user) return;
    setAdminActionMessage(null);
    try {
      const resp = await fetch('/api/admin/reset-devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ email })
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok) {
        setAdminActionMessage({ type: 'success', text: `Cleared registered devices for ${email}.` });
        fetchAdminData();
      } else {
        setAdminActionMessage({ type: 'error', text: data.error || `Failed to reset devices for ${email}.` });
      }
    } catch (e) {
      setAdminActionMessage({ type: 'error', text: `Failed to reset devices for ${email} -- check your connection and try again.` });
    }
  };

  const handleCreateInviteCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const resp = await fetch('/api/admin/create-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ studentName: newStudentName })
      });
      if (resp.ok) {
        setNewStudentName('');
        fetchAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteInviteCode = async (code: string) => {
    if (!user) return;
    try {
      const resp = await fetch('/api/admin/delete-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-email': user.email },
        body: JSON.stringify({ code })
      });
      if (resp.ok) {
        fetchAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const [preparingFor, setPreparingFor] = useState<'8th' | '9th' | '10th' | '11th' | '12th'>('10th');
  // Class X now has two subjects (Physics/Optics and Chemistry) for Solve NCERT, Question Bank,
  // and Self Assessment -- this tracks which one is currently active, alongside `preparingFor`.
  const [qbSubject, setQbSubject] = useState<'physics' | 'chemistry'>('physics');

  // "Start Studying" subject picker: which class the picker is showing subjects for. Locked
  // students always see their own registered class; exempt (admin/test) accounts pick one first.
  const [studyingClass, setStudyingClass] = useState<'8th' | '9th' | '10th' | null>(null);
  // Which subject on the Start Studying page just showed the "coming soon" message, if any.
  const [underConstructionSubject, setUnderConstructionSubject] = useState<string | null>(null);

  // Which (class, subject) combinations have real notes built already -- everything else shows
  // an "under construction" message instead of navigating away.
  const SUBJECT_AVAILABILITY: Record<'8th' | '9th' | '10th', Record<'Maths' | 'Physics' | 'Chemistry' | 'Biology', boolean>> = {
    '8th': { Maths: false, Physics: true, Chemistry: false, Biology: false },
    '9th': { Maths: false, Physics: false, Chemistry: false, Biology: true },
    '10th': { Maths: false, Physics: true, Chemistry: true, Biology: false },
  };

  const openSubject = (cls: '8th' | '9th' | '10th', subject: 'Maths' | 'Physics' | 'Chemistry' | 'Biology') => {
    if (!SUBJECT_AVAILABILITY[cls][subject]) {
      setUnderConstructionSubject(subject);
      return;
    }
    setUnderConstructionSubject(null);
    setPreparingFor(cls);
    if (subject === 'Physics') changeView('learn');
    else if (subject === 'Chemistry') changeView('chemNotes');
    else if (subject === 'Biology') changeView('bioNotes');
  };

  const SUBJECT_CARDS: { id: 'Maths' | 'Physics' | 'Chemistry' | 'Biology'; icon: React.ElementType; color: string }[] = [
    { id: 'Maths', icon: Calculator, color: 'from-violet-500/20 to-purple-600/20 border-violet-400 text-violet-400' },
    { id: 'Physics', icon: Zap, color: 'from-cyan-500/20 to-blue-600/20 border-cyan-400 text-cyan-400' },
    { id: 'Chemistry', icon: FlaskConical, color: 'from-emerald-500/20 to-teal-600/20 border-emerald-400 text-emerald-400' },
    { id: 'Biology', icon: Dna, color: 'from-green-500/20 to-lime-600/20 border-green-400 text-green-400' },
  ];

  // For online (self-study) students, the home page shows their class's subjects directly --
  // no homework boxes, since homework is only assigned to offline (regular class) students.
  const onlineHomeClass: '8th' | '9th' | '10th' | null =
    studentTrack === '8th' || studentTrack === '9th' || studentTrack === '10th' ? studentTrack : null;

  // Whenever a non-exempt student logs in, default their content track to their own registered
  // class instead of the hardcoded '10th' default -- this only sets the default; class-locked nav
  // below prevents them from ever switching it to another class.
  useEffect(() => {
    if (!isClassExempt && studentTrack && studentTrack !== 'unavailable') {
      setPreparingFor(studentTrack);
    }
  }, [user]);
  const [selectedSubject, setSelectedSubject] = useState<'Math' | 'Science' | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<'Light' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNCERTQuestionId, setSelectedNCERTQuestionId] = useState<number | null>(null);
  const [qbankCategory, setQbankCategory] = useState<'quiz' | 'assertion' | 'veryshort' | 'short' | 'long' | 'competency'>('quiz');
  const [qbankSelectedAnswers, setQbankSelectedAnswers] = useState<Set<string>>(new Set());
  const [qbankMcqSelections, setQbankMcqSelections] = useState<Record<string, number>>({});
  const [qbankMcqRevealed, setQbankMcqRevealed] = useState<Set<string>>(new Set());

  const activeQuestions = useMemo(() => {
    if (preparingFor === '8th') {
      return {
        ncert: CLASSVIII_NCERT_SOLVED,
        mcqs: CLASSVIII_MCQS,
        veryshort: CLASSVIII_VERY_SHORT,
        short: CLASSVIII_SHORT,
        long: CLASSVIII_LONG,
        assertion: CLASSVIII_ASSERTION_REASON,
        competency: CLASSVIII_CASE_COMPETENCY,
      };
    } else if (preparingFor === '10th' && qbSubject === 'chemistry') {
      return {
        ncert: CHEMISTRY10_NCERT_SOLVED,
        mcqs: CHEMISTRY10_MCQS,
        veryshort: CHEMISTRY10_VERY_SHORT,
        short: CHEMISTRY10_SHORT,
        long: CHEMISTRY10_LONG,
        assertion: CHEMISTRY10_ASSERTION_REASON,
        competency: CHEMISTRY10_COMPETENCY,
      };
    } else if (preparingFor === '10th') {
      return {
        ncert: CLASSX_NCERT_SOLVED,
        mcqs: CLASSX_MCQS,
        veryshort: CLASSX_VERY_SHORT,
        short: CLASSX_SHORT,
        long: CLASSX_LONG,
        assertion: CLASSX_ASSERTION_REASON,
        competency: CLASSX_CASE_COMPETENCY,
      };
    } else {
      return {
        ncert: [] as typeof CLASSX_NCERT_SOLVED,
        mcqs: COMPETITION_MCQS,
        veryshort: [] as typeof CLASSX_VERY_SHORT,
        short: [] as typeof CLASSX_SHORT,
        long: [] as typeof CLASSX_LONG,
        assertion: [] as typeof CLASSX_ASSERTION_REASON,
        competency: [] as typeof CLASSX_CASE_COMPETENCY,
      };
    }
  }, [preparingFor, qbSubject]);

  const [opticsType, setOpticsType] = useState<OpticsType>('concave-mirror');
  const [group, setGroup] = useState<'mirror' | 'lens'>('mirror');
  const [focalLength, setFocalLength] = useState(100);
  const [objectDist, setObjectDist] = useState(250);
  const [objectHeight, setObjectHeight] = useState(100);
  const [activeRays, setActiveRays] = useState<Set<1 | 2 | 3 | 4>>(new Set([1, 2, 3, 4]));
  const [aperture, setAperture] = useState(150);   // half-height in canvas units (50–220)
  const [hideObject, setHideObject] = useState(false);
  const [objectType, setObjectType] = useState<'arrow' | 'point'>('arrow');
  const [ray1Angle, setRay1Angle] = useState(15);
  const [ray2Angle, setRay2Angle] = useState(-15);
  const [ray3Angle, setRay3Angle] = useState(-15);
  const [ray4Angle, setRay4Angle] = useState(-15);
  const [isLandscapeModeActive, setIsLandscapeModeActive] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [simTab, setSimTab] = useState<'controls' | 'cases' | 'analysis'>('controls');

  const config = useMemo(() => ({
    type: opticsType,
    focalLength,
    objectDist,
    objectHeight: objectType === 'point' ? 0 : objectHeight
  }), [opticsType, focalLength, objectDist, objectHeight, objectType]);
  const result = useMemo(() => computeImage(config), [config]);

  const desc = getImageDescription(opticsType, result);
  const posNote = getPositionNote(opticsType, result, focalLength, objectDist);
  const mag = result.atInfinity ? '∞' : Math.abs(result.m).toFixed(2) + '×';

  const getRayLabel = (n: number) => {
    if (opticsType === 'plane-mirror') {
      if (n === 1) return { short: 'Parallel Ray', desc: 'Parallel to axis → reflects back parallel', color: '#f87171' };
      if (n === 2) return { short: 'P-Ray (At Pole P)', desc: 'Incident on Pole P → reflects symmetrically', color: '#4ade80' };
      if (n === 3) return { short: 'Custom Angle Ray', desc: 'Custom angle incidence ray', color: '#facc15' };
      return null;
    }
    return RAY_LABELS[group][n];
  };

  function toggleRay(n: 1 | 2 | 3 | 4) {
    setActiveRays(prev => {
      const next = new Set(prev);
      if (next.has(n)) {
        next.delete(n);
      } else {
        next.add(n);
      }
      return next;
    });
  }

  function switchGroup(g: 'mirror' | 'lens') {
    setGroup(g);
    setOpticsType(g === 'mirror' ? 'concave-mirror' : 'convex-lens');
    setFocalLength(100);
    setObjectDist(250);
    setObjectHeight(100);
    setActiveRays(new Set([1, 2, 3, 4]));
    setAperture(150);
    setHideObject(false);
  }

  function switchType(t: OpticsType) {
    setOpticsType(t);
  }

  function applyCase(c: QuickCase) {
    setObjectDist(c.u);
    setFocalLength(c.f);
    setHideObject(c.hideObject ?? false);
  }

  const cases = CASES[opticsType];
  const isMirror = group === 'mirror';

  // Check if print query parameter is present (e.g., ?print=10th) to render standalone clean Print PDF page
  const printParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('print') : null;
  if (printParam) {
    return <PrintView grade={printParam} />;
  }

  if (!user) {
    return (
      <>
      <div className={`flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 font-sans select-none relative overflow-y-auto ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#060b14] text-slate-100'}`}>
        {/* Abstract Background Lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className={`w-full max-w-md backdrop-blur-xl border rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10 space-y-6 shrink-0 ${isLightMode ? 'bg-white/95 border-slate-200' : 'bg-slate-900/90 border-slate-800'}`}>

          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="inline-flex w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 items-center justify-center text-cyan-400 text-2xl font-extrabold shadow-md shadow-cyan-500/10 animate-pulse">
              ⌬
            </div>
            <h1 className={`text-2xl font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Conceptual Learning Online</h1>
            <p className="text-[11px] text-cyan-400 font-semibold tracking-wide">
              Complete theory of optics with simulation.
            </p>
          </div>

          {/* Tab Selection */}
          <div className={`flex p-1 rounded-xl border ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
            {(['login', 'register'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setAuthTab(tab);
                  setAuthError(null);
                  setAuthSuccess(null);
                }}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  authTab === tab
                    ? 'bg-cyan-500 text-slate-950 font-black shadow'
                    : isLightMode ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab === 'login' ? 'Log In' : 'Register'}
              </button>
            ))}
          </div>

          {/* Feedback Messages */}
          {authError && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/25 rounded-xl text-xs text-red-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Authentication Issue</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-95">{authError}</p>
            </div>
          )}

          {authSuccess && (
            <div className="p-3.5 bg-green-500/10 border border-green-500/25 rounded-xl text-xs text-green-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Request Confirmed</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-95">{authSuccess}</p>
            </div>
          )}

          {/* FORM CONTENT */}
          {authTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Email Address</label>
                <div className="relative">
                  <span className={`absolute inset-y-0 left-0 pl-3 flex items-center ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="student@example.com"
                    required
                    className={`w-full border rounded-xl py-2.5 pl-9 pr-4 text-xs focus:outline-none focus:border-cyan-500 transition-colors ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Password</label>
                <div className="relative">
                  <span className={`absolute inset-y-0 left-0 pl-3 flex items-center ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={`w-full border rounded-xl py-2.5 pl-9 pr-10 text-xs focus:outline-none focus:border-cyan-500 transition-colors ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center hover:text-cyan-400 sm:cursor-pointer select-none ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}
                    title={showLoginPassword ? "Hide Password" : "Show Password"}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowForgotPassword(true); setForgotPasswordStep('request'); setForgotPasswordEmail(loginEmail); setForgotPasswordError(null); setForgotPasswordSuccess(null); }}
                  className={`text-[10px] font-bold cursor-pointer ${isLightMode ? 'text-cyan-700 hover:text-cyan-900' : 'text-cyan-400 hover:text-cyan-300'}`}
                >
                  Forgot password?
                </button>
              </div>

              {/* Keep Me Logged In Checkbox */}
              <div className="flex items-center gap-2 py-1 select-none">
                <input
                  type="checkbox"
                  id="keep-logged-in"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className={`w-4 h-4 rounded text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-cyan-500 ${isLightMode ? 'border-slate-300 bg-white' : 'border-slate-800 bg-slate-950'}`}
                />
                <label htmlFor="keep-logged-in" className={`text-xs font-semibold cursor-pointer ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                  Keep me logged in the app
                </label>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-cyan-400 cursor-pointer transition active:scale-98 flex items-center justify-center gap-1.5 shadow"
              >
                {authLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Sign In To Portal'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {authTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Full Name</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Your Name"
                  required
                  disabled={otpSent}
                  className={`w-full border rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Email Address</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="student@example.com"
                  required
                  disabled={otpSent}
                  className={`w-full border rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Phone Number</label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => {
                    setRegPhone(e.target.value);
                    if (regWhatsappSameAsPhone) setRegWhatsapp(e.target.value);
                  }}
                  placeholder="e.g. +91 99999 99999"
                  required
                  disabled={otpSent}
                  className={`w-full border rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className={`text-[10px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>WhatsApp Number</label>
                  <label className="flex items-center gap-1.5 select-none">
                    <input
                      type="checkbox"
                      checked={regWhatsappSameAsPhone}
                      disabled={otpSent}
                      onChange={(e) => {
                        setRegWhatsappSameAsPhone(e.target.checked);
                        if (e.target.checked) setRegWhatsapp(regPhone);
                      }}
                      className="w-3.5 h-3.5 rounded text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-cyan-500 disabled:opacity-50"
                    />
                    <span className={`text-[10px] font-semibold cursor-pointer ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Same as phone</span>
                  </label>
                </div>
                <input
                  type="tel"
                  value={regWhatsapp}
                  onChange={(e) => setRegWhatsapp(e.target.value)}
                  placeholder="e.g. +91 99999 99999"
                  required
                  disabled={otpSent || regWhatsappSameAsPhone}
                  className={`w-full border rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Choose Password</label>
                <div className="relative">
                  <input
                    type={showRegPassword ? "text" : "password"}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={otpSent}
                    className={`w-full border rounded-xl py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                  />
                  <button
                    type="button"
                    disabled={otpSent}
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center hover:text-cyan-400 sm:cursor-pointer select-none disabled:opacity-50 ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}
                    title={showRegPassword ? "Hide Password" : "Show Password"}
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Class</label>
                <select
                  value={regStudentClass}
                  onChange={(e) => setRegStudentClass(e.target.value as any)}
                  disabled={otpSent}
                  className={`w-full border rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 cursor-pointer ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                >
                  <option value="VIII">Class VIII</option>
                  <option value="IX">Class IX</option>
                  <option value="X">Class X</option>
                  <option value="XI">Class XI</option>
                  <option value="XII">Class XII</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className={`text-[10px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Are You an Offline Student?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={otpSent}
                    onClick={() => setRegStudentType('offline')}
                    className={`py-2.5 px-2 rounded-xl border text-[11px] font-black uppercase tracking-wide cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed ${
                      regStudentType === 'offline'
                        ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                        : (isLightMode ? 'bg-white border-slate-300 text-slate-600 hover:border-slate-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700')
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    disabled={otpSent}
                    onClick={() => setRegStudentType('online')}
                    className={`py-2.5 px-2 rounded-xl border text-[11px] font-black uppercase tracking-wide cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed ${
                      regStudentType === 'online'
                        ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                        : (isLightMode ? 'bg-white border-slate-300 text-slate-600 hover:border-slate-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700')
                    }`}
                  >
                    No
                  </button>
                </div>
                <p className={`text-[9.5px] leading-relaxed font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {regStudentType === 'offline'
                    ? '* Offline students attend regular in-person class and will receive daily homework.'
                    : '* Online students study independently through the app only -- no homework will be assigned.'}
                </p>
              </div>

              {/* Email OTP Verification Section */}
              {otpSent && (
                <div className={`p-4 border rounded-xl space-y-3 ${isLightMode ? 'bg-cyan-50 border-cyan-200' : 'bg-cyan-950/30 border-cyan-800/40'}`}>
                  <span className="text-[10px] font-black uppercase font-mono tracking-wider text-cyan-400 block">✉️ Check Your Email</span>

                  <div className="space-y-1">
                    <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Verification Code</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={regPhoneOtp}
                      onChange={(e) => setRegPhoneOtp(e.target.value)}
                      placeholder="Enter 4-digit code"
                      className={`w-full text-center border rounded-lg py-2 px-3 text-xs font-mono tracking-widest focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-cyan-700' : 'bg-slate-950 border-slate-800 text-cyan-300'}`}
                    />
                  </div>

                  <p className={`text-[9.5px] leading-relaxed font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    * We've sent a 4-digit verification code to your email address. Enter it above to continue. It's valid for 10 minutes.
                  </p>
                </div>
              )}

              {/* Conditional Submission */}
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={otpLoading || !regEmail || !regPhone || !regWhatsapp || !regName || !regPassword}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl cursor-pointer transition active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow"
                >
                  {otpLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Send Verification OTP'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className={`px-4 rounded-xl text-xs font-bold transition cursor-pointer ${isLightMode ? 'bg-slate-200 hover:bg-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={authLoading || !regPhoneOtp}
                    className="flex-1 bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-cyan-400 cursor-pointer transition active:scale-98 disabled:opacity-50 flex items-center justify-center gap-1.5 shadow"
                  >
                    {authLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Finalize Registration'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </form>
          )}

          {/* Bottom Footprint */}
          <div className={`pt-2 border-t text-center text-[10px] text-slate-500 font-mono tracking-tight flex items-center justify-center gap-1.5 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
            <span>💻 Device footprint:</span>
            <span className={`font-bold px-2 py-0.5 rounded border ${isLightMode ? 'text-yellow-700 bg-yellow-50 border-yellow-300' : 'text-yellow-400 bg-slate-950 border-slate-800'}`}>{deviceId}</span>
          </div>

        </div>

      </div>

      {showForgotPassword && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowForgotPassword(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-sm rounded-2xl border shadow-2xl p-6 space-y-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0c1324] border-slate-800'}`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <Key className="w-4 h-4 text-cyan-400" /> Reset Password
              </h3>
              <button onClick={() => setShowForgotPassword(false)} className={`cursor-pointer ${isLightMode ? 'text-slate-400 hover:text-slate-700' : 'text-slate-500 hover:text-slate-300'}`}>
                ✕
              </button>
            </div>

            {forgotPasswordError && (
              <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{forgotPasswordError}</div>
            )}
            {forgotPasswordSuccess && (
              <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">{forgotPasswordSuccess}</div>
            )}

            {forgotPasswordStep === 'request' ? (
              <form onSubmit={handleForgotPasswordRequest} className="space-y-3">
                <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Enter your registered email and we'll send a 4-digit reset code to it.
                </p>
                <div className="space-y-1">
                  <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Email Address</label>
                  <input
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                    className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={forgotPasswordLoading}
                  className="w-full py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50"
                >
                  {forgotPasswordLoading ? 'Sending...' : 'Send Reset Code'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleForgotPasswordReset} className="space-y-3">
                <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Enter the code sent to <span className="font-bold">{forgotPasswordEmail}</span> and choose a new password.
                </p>
                <div className="space-y-1">
                  <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Reset Code</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={forgotPasswordOtp}
                    onChange={(e) => setForgotPasswordOtp(e.target.value)}
                    required
                    placeholder="Enter 4-digit code"
                    className={`w-full text-center border rounded-lg py-2 px-3 text-xs font-mono tracking-widest focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-cyan-700' : 'bg-slate-950 border-slate-800 text-cyan-300'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>New Password</label>
                  <input
                    type="password"
                    value={forgotPasswordNewPassword}
                    onChange={(e) => setForgotPasswordNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Confirm New Password</label>
                  <input
                    type="password"
                    value={forgotPasswordConfirmPassword}
                    onChange={(e) => setForgotPasswordConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={forgotPasswordLoading}
                  className="w-full py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50"
                >
                  {forgotPasswordLoading ? 'Resetting...' : 'Reset Password'}
                </button>
                <button
                  type="button"
                  onClick={() => setForgotPasswordStep('request')}
                  className={`w-full text-[10px] font-bold cursor-pointer ${isLightMode ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Didn't get a code? Go back
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      </>
    );
  }

  return (
    <>
      <div className={`flex flex-col h-screen overflow-hidden print:hidden transition-colors duration-300 ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
      {/* ── Persistently Visible Global Header & Learning Hub Tab Navigation ── */}
      <header className={`shrink-0 border-b flex items-center justify-between px-4 py-2.5 flex-wrap gap-3 select-none transition-colors duration-300 ${
        isLightMode 
          ? 'bg-white border-slate-200 text-slate-800' 
          : 'bg-[#0d1424] border-slate-800 text-white'
      }`}>
        
        {/* Left: Brand logo & subtitle with EXCLUSIVELY OPTICS messaging */}
        <div 
          className="flex items-center gap-2 cursor-pointer transition active:scale-95" 
          onClick={() => changeView('hub')}
          id="brand-hub-logo"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-extrabold shadow-md transition-colors ${
            isLightMode 
              ? 'bg-cyan-100 text-cyan-800 shadow-cyan-100/30' 
              : 'bg-cyan-500/25 text-cyan-400 shadow-cyan-500/10'
          }`}>⌬</div>
          <div className="leading-tight">
            <p className={`text-sm font-black tracking-wide transition-colors ${isLightMode ? 'text-cyan-800' : 'text-cyan-400'}`}>Conceptual Learning Online</p>
          </div>
        </div>

        {/* Middle: Integrated Navigation Tabs */}
        <div className={`flex flex-wrap border p-1 rounded-xl shadow-lg overflow-visible max-w-full items-center gap-1 select-none transition-colors duration-300 ${
          isLightMode 
            ? 'bg-slate-100 border-slate-200' 
            : 'bg-slate-950/80 border-slate-800'
        }`} id="global-nav-tabs">
          {viewHistory.length > 1 && (
            <button
              onClick={goBack}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border cursor-pointer transition text-xs font-bold leading-none shrink-0 ${
                isLightMode 
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' 
                  : 'bg-[#0e1726]/85 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Go Back to Previous View"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-600" />
              <span>Back</span>
            </button>
          )}

          {/* Tab 1: Home */}
          <button 
            onClick={() => { changeView('hub'); setOpenMenu(null); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeView === 'hub' 
                ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black' 
                : (isLightMode ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50' : 'text-slate-400 hover:text-slate-200')
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          {/* Tab 2: Notes (class-locked: registered students only ever see their own class's items) */}
          {(() => {
            const notesItems = filterNavItemsByClass([
              { label: 'Class VIII', grade: '8th', onClick: () => { setPreparingFor('8th'); changeView('learn'); } },
              { label: 'Class IX (Biology)', grade: '9th', onClick: () => { setPreparingFor('9th'); changeView('bioNotes'); } },
              { label: 'Class X (Physics)', grade: '10th', onClick: () => { setPreparingFor('10th'); changeView('learn'); } },
              { label: 'Class X (Chemistry)', grade: '10th', onClick: () => { setPreparingFor('10th'); changeView('chemNotes'); } },
              { label: 'Competitions', grade: '12th', onClick: () => { setPreparingFor('12th'); changeView('competitive'); } },
            ]);
            const locked = notesItems.length === 0;
            return (
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    if (locked) { changeView('classUnavailable'); return; }
                    if (notesItems.length === 1) { notesItems[0].onClick(); return; }
                    setOpenMenu(openMenu === 'notes' ? null : 'notes');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    (activeView === 'learn' || activeView === 'chemNotes' || activeView === 'bioNotes' || activeView === 'competitive')
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black'
                      : (isLightMode ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50' : 'text-slate-400 hover:text-slate-200')
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Notes</span>
                  {notesItems.length > 1 && (
                    <ChevronDown className={`w-3 h-3 transition-transform ${openMenu === 'notes' ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {openMenu === 'notes' && notesItems.length > 1 && (
                  <div className={`absolute top-full left-0 mt-1.5 border rounded-xl shadow-2xl py-1 z-50 min-w-[145px] animate-in fade-in slide-in-from-top-1 duration-150 ${
                    isLightMode ? 'bg-white border-slate-200' : 'bg-[#0c1324] border-slate-800'
                  }`}>
                    {notesItems.map(item => (
                      <button
                        key={item.label}
                        onClick={() => { item.onClick(); setOpenMenu(null); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                          isLightMode ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50' : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Tab 3: Simulator Dropdown */}
          <div className="relative shrink-0">
            <button 
              onClick={() => {
                setOpenMenu(openMenu === 'simulator_menu' ? null : 'simulator_menu');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                (activeView === 'simulator' || activeView === 'chemSim' || activeView === 'kyc') 
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black' 
                  : (isLightMode ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50' : 'text-slate-400 hover:text-slate-200')
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Simulator</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${openMenu === 'simulator_menu' ? 'rotate-180' : ''}`} />
            </button>
            {openMenu === 'simulator_menu' && (
              <div className={`absolute top-full left-0 mt-1.5 border rounded-xl shadow-2xl py-1 z-50 min-w-[190px] animate-in fade-in slide-in-from-top-1 duration-150 ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0c1324] border-slate-800'
              }`}>
                <button
                  onClick={() => { changeView('simulator'); setOpenMenu(null); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors flex items-center gap-2 ${
                    activeView === 'simulator' 
                      ? (isLightMode ? 'text-cyan-800 bg-cyan-50' : 'text-[#22d3ee] bg-slate-800/40') 
                      : (isLightMode ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50' : 'text-slate-400 hover:text-white hover:bg-slate-800/80')
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Ray Optica</span>
                </button>
                <button
                  onClick={() => { changeView('chemSim'); setOpenMenu(null); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors flex items-center gap-2 ${
                    activeView === 'chemSim' 
                      ? (isLightMode ? 'text-cyan-800 bg-cyan-50' : 'text-[#22d3ee] bg-slate-800/40') 
                      : (isLightMode ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50' : 'text-slate-400 hover:text-white hover:bg-slate-800/80')
                  }`}
                >
                  <Beaker className="w-3.5 h-3.5" />
                  <span>Reaction Simulator</span>
                </button>
                <button
                  onClick={() => { changeView('kyc'); setOpenMenu(null); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors flex items-center gap-2 border-t ${
                    isLightMode ? 'border-slate-100' : 'border-slate-800/50'
                  } ${
                    activeView === 'kyc' 
                      ? (isLightMode ? 'text-cyan-800 bg-cyan-50' : 'text-[#22d3ee] bg-slate-800/40') 
                      : (isLightMode ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50' : 'text-slate-400 hover:text-white hover:bg-slate-800/80')
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Know Your Chemicals</span>
                </button>
              </div>
            )}
          </div>

          {/* Tab 4: Solve NCERT (class-locked) */}
          {(() => {
            const ncertItems = filterNavItemsByClass([
              { label: 'Class VIII', grade: '8th', onClick: () => { setPreparingFor('8th'); changeView('ncert'); } },
              { label: 'Class X (Physics)', grade: '10th', onClick: () => { setPreparingFor('10th'); setQbSubject('physics'); changeView('ncert'); } },
              { label: 'Class X (Chemistry)', grade: '10th', onClick: () => { setPreparingFor('10th'); setQbSubject('chemistry'); changeView('ncert'); } },
            ]);
            const locked = ncertItems.length === 0;
            return (
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    if (locked) { changeView('classUnavailable'); return; }
                    if (ncertItems.length === 1) { ncertItems[0].onClick(); return; }
                    setOpenMenu(openMenu === 'ncert' ? null : 'ncert');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeView === 'ncert'
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black'
                      : (isLightMode ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50' : 'text-slate-400 hover:text-slate-200')
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Solve NCERT</span>
                  {ncertItems.length > 1 && (
                    <ChevronDown className={`w-3 h-3 transition-transform ${openMenu === 'ncert' ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {openMenu === 'ncert' && ncertItems.length > 1 && (
                  <div className={`absolute top-full left-0 mt-1.5 border rounded-xl shadow-2xl py-1 z-50 min-w-[145px] animate-in fade-in slide-in-from-top-1 duration-150 ${
                    isLightMode ? 'bg-white border-slate-200' : 'bg-slate-905 border border-slate-800 bg-[#0c1324]'
                  }`}>
                    {ncertItems.map(item => (
                      <button
                        key={item.label}
                        onClick={() => { item.onClick(); setOpenMenu(null); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                          isLightMode ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50' : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Tab 5: Question Bank (class-locked) */}
          {(() => {
            const qbankItems = filterNavItemsByClass([
              { label: 'Class VIII', grade: '8th', onClick: () => { setPreparingFor('8th'); changeView('qbank'); } },
              { label: 'Class X (Physics)', grade: '10th', onClick: () => { setPreparingFor('10th'); setQbSubject('physics'); changeView('qbank'); } },
              { label: 'Class X (Chemistry)', grade: '10th', onClick: () => { setPreparingFor('10th'); setQbSubject('chemistry'); changeView('qbank'); } },
              { label: 'Competitions', grade: '12th', onClick: () => { setPreparingFor('12th'); changeView('qbank'); } },
            ]);
            const locked = qbankItems.length === 0;
            return (
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    if (locked) { changeView('classUnavailable'); return; }
                    if (qbankItems.length === 1) { qbankItems[0].onClick(); return; }
                    setOpenMenu(openMenu === 'qbank' ? null : 'qbank');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeView === 'qbank'
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black'
                      : (isLightMode ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50' : 'text-slate-400 hover:text-slate-200')
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Question Bank</span>
                  {qbankItems.length > 1 && (
                    <ChevronDown className={`w-3 h-3 transition-transform ${openMenu === 'qbank' ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {openMenu === 'qbank' && qbankItems.length > 1 && (
                  <div className={`absolute top-full left-0 mt-1.5 border rounded-xl shadow-2xl py-1 z-50 min-w-[145px] animate-in fade-in slide-in-from-top-1 duration-150 ${
                    isLightMode ? 'bg-white border-slate-200' : 'bg-slate-905 border border-slate-800 bg-[#0c1324]'
                  }`}>
                    {qbankItems.map(item => (
                      <button
                        key={item.label}
                        onClick={() => { item.onClick(); setOpenMenu(null); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                          isLightMode ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50' : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Tab 6: Self assessment (class-locked) */}
          {(() => {
            const assessmentItems = filterNavItemsByClass([
              { label: 'Class VIII', grade: '8th', onClick: () => { setPreparingFor('8th'); changeView('assessment'); } },
              { label: 'Class X (Physics)', grade: '10th', onClick: () => { setPreparingFor('10th'); setQbSubject('physics'); changeView('assessment'); } },
              { label: 'Class X (Chemistry)', grade: '10th', onClick: () => { setPreparingFor('10th'); setQbSubject('chemistry'); changeView('assessment'); } },
              { label: 'Competitions', grade: '12th', onClick: () => { setPreparingFor('12th'); changeView('assessment'); } },
            ]);
            const locked = assessmentItems.length === 0;
            return (
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    if (locked) { changeView('classUnavailable'); return; }
                    if (assessmentItems.length === 1) { assessmentItems[0].onClick(); return; }
                    setOpenMenu(openMenu === 'assessment' ? null : 'assessment');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeView === 'assessment'
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black'
                      : (isLightMode ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50' : 'text-slate-400 hover:text-slate-200')
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Self assessment</span>
                  {assessmentItems.length > 1 && (
                    <ChevronDown className={`w-3 h-3 transition-transform ${openMenu === 'assessment' ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {openMenu === 'assessment' && assessmentItems.length > 1 && (
                  <div className={`absolute top-full left-0 mt-1.5 border rounded-xl shadow-2xl py-1 z-50 min-w-[145px] animate-in fade-in slide-in-from-top-1 duration-150 ${
                    isLightMode ? 'bg-white border-slate-200' : 'bg-slate-905 border border-slate-800 bg-[#0c1324]'
                  }`}>
                    {assessmentItems.map(item => (
                      <button
                        key={item.label}
                        onClick={() => { item.onClick(); setOpenMenu(null); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                          isLightMode ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-50' : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Tab: Homework Upload -- not applicable to online (self-study) students */}
          {user.studentType !== 'online' && (
            <button
              onClick={() => { changeView('homework'); setOpenMenu(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeView === 'homework'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black'
                  : (isLightMode ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50' : 'text-slate-400 hover:text-slate-200')
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Homework</span>
            </button>
          )}

          {/* Tab: Forum */}
          <button
            onClick={() => { changeView('forum'); setOpenMenu(null); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeView === 'forum'
                ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black'
                : (isLightMode ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50' : 'text-slate-400 hover:text-slate-200')
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Forum</span>
          </button>

          {/* Tab 7: About Us */}
          <button
            onClick={() => { changeView('about'); setOpenMenu(null); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeView === 'about' 
                ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black' 
                : (isLightMode ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50' : 'text-slate-400 hover:text-slate-200')
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About Us</span>
          </button>
          
          {/* Admin panel only visible to admin accounts */}
          {user?.email && ADMIN_EMAILS.includes(user.email) && (
            <button 
              onClick={() => { changeView('admin'); setOpenMenu(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                activeView === 'admin'
                  ? (isLightMode ? 'bg-cyan-50 border-cyan-500 text-cyan-700 font-extrabold' : 'bg-[#1e293b] border-cyan-400 text-cyan-400 font-extrabold')
                  : (isLightMode ? 'bg-amber-50 border-amber-400/50 text-amber-700 hover:border-amber-500' : 'bg-slate-950/40 border-amber-500/30 text-amber-400 hover:border-amber-400')
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>🔑 Admin Panel</span>
            </button>
          )}
        </div>

        {/* Right: Active user telemetry + Logout */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => changeView('profile')}
            title="View your profile"
            className="hidden md:flex items-center gap-2 cursor-pointer group"
          >
            <div className="flex flex-col text-right leading-none">
              <span className={`text-[10px] font-black transition-colors group-hover:text-cyan-400 ${isLightMode ? 'text-slate-800' : 'text-slate-300'}`}>{user.name}</span>
              <span className={`text-[9px] font-mono mt-0.5 transition-colors ${isLightMode ? 'text-cyan-700' : 'text-[#22d3ee]'}`}>
                {user.email === 'test@rayoptica.com' ? 'Unrestricted (Unlimited Devices)' : `Approved (${user.devices?.length || 1}/3 Devices)`}
              </span>
            </div>
            {user.photoUrl ? (
              <img src={user.photoUrl} alt="Profile" className="w-7 h-7 rounded-full object-cover border border-cyan-500/30" />
            ) : (
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${isLightMode ? 'bg-slate-100 border-slate-300 text-slate-500' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </button>

          {/* Change Password Button */}
          <button
            onClick={() => { setShowChangePassword(true); setChangePasswordError(null); setChangePasswordSuccess(null); }}
            title="Change Password"
            className={`p-2 rounded-xl border cursor-pointer transition active:scale-95 ${
              isLightMode
                ? 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100'
                : 'bg-slate-950 border-slate-850 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4" />
          </button>

          {/* Theme Toggler Button */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
            className={`p-2 rounded-xl border cursor-pointer transition active:scale-95 ${
              isLightMode 
                ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100' 
                : 'bg-slate-950 border-slate-850 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            id="theme-toggle-btn"
          >
            {isLightMode ? (
              <Moon className="w-4 h-4 text-indigo-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={handleLogout}
            title="Log out of Conceptual Learning Online"
            className={`p-2 rounded-xl border cursor-pointer transition active:scale-95 ${
              isLightMode 
                ? 'bg-white border-slate-300 text-slate-600 hover:bg-red-50 hover:text-red-600' 
                : 'bg-slate-950 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border-slate-850'
            }`}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {showChangePassword && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowChangePassword(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-sm rounded-2xl border shadow-2xl p-6 space-y-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0c1324] border-slate-800'}`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <Key className="w-4 h-4 text-cyan-400" /> Change Password
              </h3>
              <button onClick={() => setShowChangePassword(false)} className={`cursor-pointer ${isLightMode ? 'text-slate-400 hover:text-slate-700' : 'text-slate-500 hover:text-slate-300'}`}>
                ✕
              </button>
            </div>

            {changePasswordError && (
              <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{changePasswordError}</div>
            )}
            {changePasswordSuccess && (
              <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">{changePasswordSuccess}</div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div className="space-y-1">
                <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Current Password</label>
                <input
                  type="password"
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  required
                  className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                />
              </div>
              <div className="space-y-1">
                <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>New Password</label>
                <input
                  type="password"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  required
                  minLength={6}
                  className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                />
              </div>
              <div className="space-y-1">
                <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  required
                  minLength={6}
                  className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                />
              </div>
              <button
                type="submit"
                disabled={changePasswordLoading}
                className="w-full py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50"
              >
                {changePasswordLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      )}

        {/* ── 1. HOME HUB INITIAL VIEW PANEL ── */}
      {activeView === 'hub' && user.studentType === 'online' && (
        <div className={`flex-1 overflow-y-auto px-4 py-10 transition-colors duration-300 ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#060b14] text-slate-100'} scrollbar-thin`}>
          <div className="max-w-5xl mx-auto space-y-6">

            <div className="space-y-1">
              <span className={`text-xs uppercase font-mono font-black px-2.5 py-0.5 rounded border ${isLightMode ? 'text-cyan-800 bg-cyan-100 border-cyan-300' : 'text-cyan-400 bg-cyan-400/10 border border-cyan-500/20'}`}>
                Home
              </span>
              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className={`text-xs sm:text-sm font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>Online student -- study at your own pace. No homework is assigned to you.</p>
            </div>

            {/* Latest Updates box */}
            <div className={`border rounded-2xl p-5 shadow-lg flex flex-col ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <h2 className={`text-sm font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <Megaphone className="w-4 h-4 text-amber-400" /> Latest Updates
              </h2>
              <div className={`mt-3 divide-y flex-1 ${isLightMode ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                {announcementsLoading ? (
                  <p className="text-[11px] font-semibold text-slate-500 py-3">Loading updates...</p>
                ) : visibleAnnouncements.length === 0 ? (
                  <p className="text-[11px] font-semibold text-slate-500 py-3">No updates posted yet.</p>
                ) : (
                  visibleAnnouncements.slice(0, 3).map((a) => (
                    <div key={a.id} className="py-2.5">
                      <p className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{a.title}</p>
                      <p className={`text-[11px] mt-0.5 line-clamp-2 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{a.message}</p>
                    </div>
                  ))
                )}
              </div>
              <button onClick={() => changeView('latestNews')} className={`mt-2 text-[11px] font-black self-start cursor-pointer ${isLightMode ? 'text-cyan-700 hover:text-cyan-900' : 'text-cyan-400 hover:text-cyan-300'}`}>
                View all updates →
              </button>
            </div>

            <div className="space-y-2">
              <h2 className={`text-sm font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Choose a Subject</h2>
              <p className={`text-xs font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>Pick a subject to open its study notes.</p>
            </div>

            {onlineHomeClass === null ? (
              <div className={`rounded-2xl border p-6 text-center space-y-2 ${isLightMode ? 'bg-cyan-50 border-cyan-300' : 'bg-cyan-950/20 border-cyan-500/20'}`}>
                <p className={`text-sm font-black ${isLightMode ? 'text-cyan-800' : 'text-cyan-300'}`}>Subjects for your class aren't available yet</p>
                <p className={`text-xs font-semibold ${isLightMode ? 'text-cyan-700' : 'text-cyan-200/80'}`}>Use the Notes menu above for your registered class's content.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SUBJECT_CARDS.map((s) => {
                    const available = SUBJECT_AVAILABILITY[onlineHomeClass][s.id];
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => openSubject(onlineHomeClass, s.id)}
                        className={`flex items-center gap-3 p-5 rounded-2xl border text-left transition duration-200 cursor-pointer bg-gradient-to-br ${s.color} ${!available ? 'opacity-70' : ''}`}
                      >
                        <Icon className="w-7 h-7 shrink-0" />
                        <div>
                          <p className={`text-base font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{s.id}</p>
                          <p className={`text-[11px] font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>{available ? 'Notes available' : 'Coming soon'}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {underConstructionSubject && (
                  <div className={`rounded-2xl border p-6 text-center space-y-2 ${isLightMode ? 'bg-amber-50 border-amber-300' : 'bg-amber-950/20 border-amber-500/20'}`}>
                    <Construction className={`w-6 h-6 mx-auto ${isLightMode ? 'text-amber-600' : 'text-amber-400'}`} />
                    <p className={`text-sm font-black ${isLightMode ? 'text-amber-800' : 'text-amber-300'}`}>{underConstructionSubject} notes for Class {onlineHomeClass.replace('th', '')} are under construction</p>
                    <p className={`text-xs font-semibold ${isLightMode ? 'text-amber-700' : 'text-amber-200/80'}`}>They'll open here as soon as they're ready. Check back soon!</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {activeView === 'hub' && user.studentType !== 'online' && (
        <div className={`flex-1 overflow-y-auto px-4 py-10 transition-colors duration-300 ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#060b14] text-slate-100'} scrollbar-thin`}>
          <div className="max-w-5xl mx-auto space-y-6">

            <div className="space-y-1">
              <span className={`text-xs uppercase font-mono font-black px-2.5 py-0.5 rounded border ${isLightMode ? 'text-cyan-800 bg-cyan-100 border-cyan-300' : 'text-cyan-400 bg-cyan-400/10 border border-cyan-500/20'}`}>
                Home
              </span>
              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>Welcome back, {user.name.split(' ')[0]}!</h1>
            </div>

            {/* Start Studying -- primary call to action */}
            <button
              onClick={() => { setStudyingClass(null); setUnderConstructionSubject(null); changeView('startStudying'); }}
              className={`w-full flex items-center gap-4 p-6 sm:p-7 rounded-3xl border text-left transition duration-200 cursor-pointer relative overflow-hidden group ${
                isLightMode
                  ? 'bg-gradient-to-br from-cyan-500 to-teal-500 border-cyan-400 text-white hover:brightness-105'
                  : 'bg-gradient-to-r from-cyan-500/20 via-teal-500/10 to-slate-900 border-cyan-500/30 text-white hover:border-cyan-400'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${isLightMode ? 'bg-white/20' : 'bg-cyan-500/20'}`}>
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-lg sm:text-xl font-black tracking-tight">Start Studying</p>
                <p className={`text-xs sm:text-sm font-medium ${isLightMode ? 'text-white/90' : 'text-slate-300'}`}>Open your Maths, Physics, Chemistry & Biology notes</p>
              </div>
              <ChevronRight className="w-6 h-6 shrink-0 opacity-80 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Latest Updates box */}
              <div className={`border rounded-2xl p-5 shadow-lg flex flex-col ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                <h2 className={`text-sm font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  <Megaphone className="w-4 h-4 text-amber-400" /> Latest Updates
                </h2>
                <div className={`mt-3 divide-y flex-1 ${isLightMode ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                  {announcementsLoading ? (
                    <p className="text-[11px] font-semibold text-slate-500 py-3">Loading updates...</p>
                  ) : visibleAnnouncements.length === 0 ? (
                    <p className="text-[11px] font-semibold text-slate-500 py-3">No updates posted yet.</p>
                  ) : (
                    visibleAnnouncements.slice(0, 3).map((a) => (
                      <div key={a.id} className="py-2.5">
                        <p className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{a.title}</p>
                        <p className={`text-[11px] mt-0.5 line-clamp-2 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{a.message}</p>
                      </div>
                    ))
                  )}
                </div>
                <button onClick={() => changeView('latestNews')} className={`mt-2 text-[11px] font-black self-start cursor-pointer ${isLightMode ? 'text-cyan-700 hover:text-cyan-900' : 'text-cyan-400 hover:text-cyan-300'}`}>
                  View all updates →
                </button>
              </div>

              {/* Homework Assigned box */}
              <div className={`border rounded-2xl p-5 shadow-lg flex flex-col ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                <h2 className={`text-sm font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  <FileText className="w-4 h-4 text-amber-400" /> Homework Assigned
                </h2>
                <div className={`mt-3 divide-y flex-1 ${isLightMode ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                  {assignmentsLoading ? (
                    <p className="text-[11px] font-semibold text-slate-500 py-3">Loading assignments...</p>
                  ) : visibleAssignments.length === 0 ? (
                    <p className="text-[11px] font-semibold text-slate-500 py-3">No homework assigned yet.</p>
                  ) : (
                    visibleAssignments.slice(0, 3).map((a) => (
                      <div key={a.id} className="py-2.5">
                        <p className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{a.title}</p>
                        {a.subject && <p className="text-[10px] font-mono text-cyan-400 mt-0.5">{a.subject}</p>}
                        {a.deadline && <p className="text-[10px] font-semibold text-amber-400 mt-0.5">Due {formatDeadline(a.deadline)}</p>}
                      </div>
                    ))
                  )}
                </div>
                <button onClick={() => changeView('homework')} className={`mt-2 text-[11px] font-black self-start cursor-pointer ${isLightMode ? 'text-cyan-700 hover:text-cyan-900' : 'text-cyan-400 hover:text-cyan-300'}`}>
                  View all homework →
                </button>
              </div>
            </div>

            {/* Upload Homework box */}
            <div className={`border rounded-2xl p-5 sm:p-6 shadow-lg space-y-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <h2 className={`text-sm font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <Upload className="w-4 h-4 text-cyan-400" /> Upload Homework
              </h2>

              {homeworkError && (
                <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">{homeworkError}</div>
              )}
              {homeworkSuccess && (
                <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2.5">{homeworkSuccess}</div>
              )}

              <form onSubmit={handleHomeworkUpload} className="space-y-3">
                {visibleAssignments.length > 0 && (
                  <div className="space-y-1">
                    <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Which Homework Is This For?</label>
                    <select
                      value={selectedAssignmentId}
                      onChange={(e) => setSelectedAssignmentId(e.target.value)}
                      required
                      className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                    >
                      <option value="" disabled>-- Select the assignment this is for --</option>
                      {visibleAssignments.map((a) => (
                        <option key={a.id} value={a.id}>{a.title}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="space-y-1">
                  <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Homework Photos or a Single PDF (max 15 photos, 10MB per file)</label>
                  <p className={`text-[10px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Got more than 15 pages? Scan them into one PDF with your phone's scanner app instead -- no page limit on PDFs.</p>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf"
                    onChange={(e) => handleHomeworkFileSelect(Array.from(e.target.files || []))}
                    required
                    className={`w-full text-xs font-semibold file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-black file:uppercase file:cursor-pointer cursor-pointer ${isLightMode ? 'text-slate-600 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200' : 'text-slate-400 file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700'}`}
                  />
                  {homeworkFiles.length > 0 && (
                    <ul className="space-y-1 pt-1">
                      {homeworkFiles.map((f, i) => (
                        <li key={i} className={`flex items-center justify-between text-[10px] font-mono px-2 py-1 rounded ${isLightMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-950 text-slate-400'}`}>
                          <span className="truncate">{f.name}</span>
                          <button
                            type="button"
                            onClick={() => setHomeworkFiles(homeworkFiles.filter((_, idx) => idx !== i))}
                            className="text-red-400 hover:text-red-300 cursor-pointer ml-2 shrink-0"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {homeworkFiles.length > 1 && (
                    <p className="text-[10px] font-semibold text-cyan-400">{homeworkFiles.length} photos will be combined into one PDF automatically.</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={homeworkUploading || homeworkFiles.length === 0 || (visibleAssignments.length > 0 && !selectedAssignmentId)}
                  className="w-full py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {homeworkUploading ? 'Uploading...' : 'Submit Homework'}
                </button>
              </form>
            </div>

            <div className={`border rounded-2xl p-5 sm:p-6 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <h3 className="text-sm font-black tracking-tight uppercase font-mono tracking-widest text-[#22d3ee]">
                Your Submissions ({mySubmissions.length})
              </h3>
              <div className={`mt-4 divide-y ${isLightMode ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                {homeworkLoading ? (
                  <div className="text-center py-6 text-xs font-semibold text-slate-500">Loading your submissions...</div>
                ) : mySubmissions.length === 0 ? (
                  <div className="text-center py-6 text-xs font-semibold text-slate-500">No homework submitted yet.</div>
                ) : (
                  mySubmissions.map((sub) => (
                    <div key={sub.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{sub.subject || 'Homework Submission'}</p>
                        <p className={`text-[10px] font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{new Date(sub.submittedAt).toLocaleString()}</p>
                        {sub.aiFeedback && (
                          <p className={`text-[10px] mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{sub.aiFeedback}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {sub.aiScore != null && (
                          <span className="text-xs font-black text-emerald-400">{sub.aiScore}/10</span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                          sub.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                        }`}>
                          {sub.status}
                        </span>
                        {sub.fileUrl && (
                          <a href={sub.fileUrl} target="_blank" rel="noreferrer" className="p-1 rounded hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 cursor-pointer" title="View submitted file">
                            <Eye className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── 1.1B CLASS CONTENT NOT YET AVAILABLE VIEW ── */}
      {activeView === 'classUnavailable' && (
        <div className={`flex-1 overflow-y-auto px-4 py-12 transition-colors duration-300 ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#060b14] text-slate-100'} scrollbar-thin`}>
          <div className="max-w-md mx-auto space-y-4 text-center py-12">
            <div className={`rounded-2xl border p-8 space-y-3 ${isLightMode ? 'bg-amber-50 border-amber-300' : 'bg-amber-950/20 border-amber-500/20'}`}>
              <p className={`text-base font-black ${isLightMode ? 'text-amber-800' : 'text-amber-300'}`}>Content for your class is coming soon</p>
              <p className={`text-sm font-semibold leading-relaxed ${isLightMode ? 'text-amber-700' : 'text-amber-200/80'}`}>
                We're still building dedicated study notes, question banks, and self-assessment tests for your registered class. In the meantime, all Simulators remain fully open to you -- use the Simulator menu above to keep exploring.
              </p>
            </div>
            <button
              onClick={() => changeView('hub')}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition ${isLightMode ? 'bg-slate-200 hover:bg-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* ── 1.2 PORTAL REDIRECT VIEW ── */}
      {activeView === 'portal' && (
        <div className={`flex-1 overflow-y-auto px-4 py-12 transition-colors duration-300 ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#060b14] text-slate-100'} scrollbar-thin`}>
          <div className="max-w-4xl mx-auto space-y-8 text-center py-12">
            
            <div className="space-y-3">
              <span className={`text-xs uppercase font-black tracking-widest px-3 py-1 rounded-full border font-mono ${
                isLightMode 
                  ? 'text-cyan-800 bg-cyan-100 border-cyan-300' 
                  : 'text-[#22d3ee] bg-cyan-400/10 border border-cyan-500/20'
              }`}>
                {preparingFor === '8th' ? 'Class 8 Course' : preparingFor === '10th' ? 'Class 10 Course' : 'Competitions Course'}
              </span>
              <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>
                {preparingFor === '8th' ? 'Optics for Class 8' : preparingFor === '10th' ? 'Optics for Class 10' : 'Optics for Competitions'}
              </h1>
              <p className={`text-sm sm:text-base max-w-xl mx-auto font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                {preparingFor === '8th' && 'Master light straight propagation, reflection laws, shadows, and standard laws of reflection.'}
                {preparingFor === '10th' && 'Master spherical concave or convex mirrors, converging/diverging glass lenses, and NCERT light rules.'}
                {preparingFor === '12th' && 'Master high-level geometric or wave optics, prisms, lens formulas and advanced ray-tracing.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-6xl mx-auto pt-6">
              {/* Option 1: View Notes */}
              <button
                onClick={() => {
                  if (preparingFor === '12th') {
                    changeView('competitive');
                  } else {
                    changeView('learn');
                  }
                }}
                className={`flex flex-col items-center justify-center p-6 border rounded-2xl text-center group transition duration-300 transform hover:-translate-y-1 cursor-pointer shadow-xl relative overflow-hidden ${
                  isLightMode
                    ? 'bg-white border-slate-200 hover:border-cyan-400/50 hover:bg-cyan-50/20 text-slate-900'
                    : 'bg-[#0d1527] border border-slate-800 hover:border-cyan-400/50 hover:bg-[#111c34] text-slate-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 group-hover:scale-110 transition duration-300 ${
                  isLightMode ? 'bg-cyan-50 text-cyan-600' : 'bg-cyan-500/10 text-cyan-400'
                }`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className={`text-base font-bold mb-1 transition text-center leading-tight ${
                  isLightMode ? 'text-slate-800 group-hover:text-cyan-600' : 'text-slate-100 group-hover:text-cyan-400'
                }`}>
                  {preparingFor === '8th' && 'View Notes for Class 8th'}
                  {preparingFor === '10th' && 'View Notes for Class 10th'}
                  {preparingFor === '12th' && 'View Detailed Notes'}
                </h3>
                <p className={`text-[11px] font-medium leading-relaxed ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {preparingFor === '8th' && 'Read through simple, comprehensive Class 8 optics chapters.'}
                  {preparingFor === '10th' && 'Detailed study of CBSE Class 10 optics textbook theory.'}
                  {preparingFor === '12th' && 'Elite depth wave and geometric analysis.'}
                </p>
              </button>

              {/* Option 2: Optic simulator */}
              <button
                onClick={() => {
                  changeView('simulator');
                }}
                className={`flex flex-col items-center justify-center p-6 border rounded-2xl text-center group transition duration-305 transform hover:-translate-y-1 cursor-pointer shadow-xl relative overflow-hidden ${
                  isLightMode
                    ? 'bg-white border-slate-200 hover:border-teal-400/50 hover:bg-teal-50/20 text-slate-900'
                    : 'bg-[#0d1527] border border-slate-800 hover:border-teal-400/50 hover:bg-[#111c34] text-slate-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 group-hover:scale-110 transition duration-300 ${
                  isLightMode ? 'bg-teal-50 text-teal-600' : 'bg-teal-500/10 text-teal-400'
                }`}>
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className={`text-base font-bold mb-1 transition text-center leading-tight ${
                  isLightMode ? 'text-slate-800 group-hover:text-teal-600' : 'text-slate-100 group-hover:text-teal-400'
                }`}>
                  Ray Optica
                </h3>
                <p className={`text-[11px] font-medium leading-relaxed ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  Play around with ray tracing reflection and refraction in real-time.
                </p>
              </button>

              {/* Option 3: Solved NCERT (Omit for 12th/competition) */}
              {preparingFor !== '12th' && (
                <button
                  onClick={() => {
                    changeView('ncert');
                  }}
                  className={`flex flex-col items-center justify-center p-6 border rounded-2xl text-center group transition duration-305 transform hover:-translate-y-1 cursor-pointer shadow-xl relative overflow-hidden ${
                    isLightMode
                      ? 'bg-white border-slate-200 hover:border-emerald-400/50 hover:bg-emerald-50/20 text-slate-900'
                      : 'bg-[#0d1527] border border-slate-800 hover:border-emerald-400/50 hover:bg-[#111c34] text-slate-100'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 group-hover:scale-110 transition duration-300 ${
                    isLightMode ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className={`text-base font-bold mb-1 transition text-center leading-tight ${
                    isLightMode ? 'text-slate-800 group-hover:text-emerald-600' : 'text-slate-100 group-hover:text-emerald-400'
                  }`}>
                    {preparingFor === '8th' ? 'Solved Class 8th NCERT' : 'Solved Class 10th NCERT'}
                  </h3>
                  <p className={`text-[11px] font-medium leading-relaxed ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Theoretical details, textbook numeric marks-model step answers.
                  </p>
                </button>
              )}

              {/* Option 4: Question Bank */}
              <button
                onClick={() => {
                  changeView('qbank');
                }}
                className={`flex flex-col items-center justify-center p-6 border rounded-2xl text-center group transition duration-305 transform hover:-translate-y-1 cursor-pointer shadow-xl relative overflow-hidden ${
                  isLightMode
                    ? 'bg-white border-slate-200 hover:border-amber-400/50 hover:bg-amber-50/20 text-slate-900'
                    : 'bg-[#0d1527] border border-slate-800 hover:border-amber-400/50 hover:bg-[#111c34] text-slate-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 group-hover:scale-110 transition duration-300 ${
                  isLightMode ? 'bg-amber-50 text-amber-600' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className={`text-base font-bold mb-1 transition text-center leading-tight ${
                  isLightMode ? 'text-slate-800 group-hover:text-amber-600' : 'text-slate-100 group-hover:text-amber-400'
                }`}>
                  Question Bank
                </h3>
                <p className={`text-[11px] font-medium leading-relaxed ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  Practice {preparingFor === '12th' ? 'JEE Advanced' : 'MCQs, Assertion, 2/3/5/4 markers'} questions.
                </p>
              </button>

              {/* Option 5: Self Assessment */}
              <button
                onClick={() => {
                  changeView('assessment');
                }}
                className={`flex flex-col items-center justify-center p-6 border rounded-2xl text-center group transition duration-305 transform hover:-translate-y-1 cursor-pointer shadow-xl relative overflow-hidden ${
                  isLightMode
                    ? 'bg-white border-slate-200 hover:border-violet-400/50 hover:bg-violet-50/20 text-slate-900'
                    : 'bg-[#0d1527] border border-slate-800 hover:border-violet-400/50 hover:bg-[#111c34] text-slate-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 group-hover:scale-110 transition duration-300 ${
                  isLightMode ? 'bg-violet-50 text-violet-600' : 'bg-violet-500/10 text-violet-400'
                }`}>
                  <Award className="w-6 h-6" />
                </div>
                <h3 className={`text-base font-bold mb-1 transition text-center leading-tight ${
                  isLightMode ? 'text-slate-800 group-hover:text-violet-600' : 'text-slate-100 group-hover:text-violet-400'
                }`}>
                  Self Assessment
                </h3>
                <p className={`text-[11px] font-medium leading-relaxed ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  Take the graded MCQ quiz to track your mastery.
                </p>
              </button>
            </div>

            <div className="pt-6">
              <button
                onClick={() => changeView('hub')}
                className={`text-xs font-bold hover:underline inline-flex items-center gap-1.5 border px-4 py-2 rounded-xl transition ${
                  isLightMode 
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200' 
                    : 'bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                ← Back to Home
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── 1B. LEARN OPTICS STUDY MODULE ── */}
      {activeView === 'learn' && (
        <LearnOptics 
          preparingFor={preparingFor}
          isLightMode={isLightMode}
          onLoadSimulator={(params) => {
            setGroup(params.group);
            setOpticsType(params.type);
            setObjectDist(params.objectDist);
            setFocalLength(params.focalLength);
            setObjectHeight(params.objectHeight);
            setObjectType(params.objectType);
            setActiveRays(new Set([1, 2, 3, 4]));
            setHideObject(false);
            changeView('simulator');
          }}
          onCompleteNotes={() => changeView('ncert')}
          onGoToSelfAssessment={() => changeView('assessment')}
        />
      )}

      {/* ── 1C. LEARN CHEMISTRY STUDY MODULE ── */}
      {activeView === 'chemNotes' && (
        <LearnChemistry
          isLightMode={isLightMode}
          onCompleteNotes={() => { setQbSubject('chemistry'); changeView('ncert'); }}
          onGoToSelfAssessment={() => { setQbSubject('chemistry'); changeView('assessment'); }}
        />
      )}

      {/* ── 1D. LEARN BIOLOGY (CLASS IX) STUDY MODULE ── */}
      {activeView === 'bioNotes' && (
        <LearnBiology isLightMode={isLightMode} />
      )}

      {/* ── 2. SOLVED NCERT QUESTIONS EXPLORER ── */}
      {activeView === 'ncert' && (
        <div 
          id="ncert-container" 
          className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin transition-colors duration-300 ${
            isLightMode ? 'bg-slate-50 text-slate-800' : 'bg-[#060b14] text-slate-100'
          }`}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            #ncert-container {
              background-color: ${isLightMode ? '#f8fafc' : '#060b14'} !important;
              color: ${isLightMode ? '#1e293b' : '#f1f5f9'} !important;
            }
            #ncert-container .bg-slate-900\\/40,
            #ncert-container .bg-slate-900,
            #ncert-container .bg-slate-900\\/50 {
              background-color: ${isLightMode ? '#ffffff' : '#0f172a'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #ncert-container .bg-slate-950,
            #ncert-container .bg-[#070d18],
            #ncert-container .bg-[#121927],
            #ncert-container .bg-slate-950\\/60 {
              background-color: ${isLightMode ? '#f1f5f9' : '#020617'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #ncert-container .text-slate-100,
            #ncert-container .text-slate-200,
            #ncert-container .text-slate-250 {
              color: ${isLightMode ? '#0f172a' : '#f1f5f9'} !important;
            }
            #ncert-container .text-slate-300,
            #ncert-container .text-slate-400 {
              color: ${isLightMode ? '#475569' : '#94a3b8'} !important;
            }
            #ncert-container h2,
            #ncert-container h3,
            #ncert-container h4 {
              color: ${isLightMode ? '#0f172a' : '#ffffff'} !important;
            }
            #ncert-container .border-slate-800 {
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #ncert-container .bg-teal-500\\/10 {
              background-color: ${isLightMode ? '#f0fdf4' : 'rgba(20, 184, 166, 0.1)'} !important;
              color: ${isLightMode ? '#0d9488' : '#2dd4bf'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : 'rgba(20, 184, 166, 0.25)'} !important;
            }
            #ncert-container input {
              background-color: ${isLightMode ? '#ffffff' : '#020617'} !important;
              color: ${isLightMode ? '#0f172a' : '#ffffff'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#334155'} !important;
            }
            #ncert-container .bg-emerald-950\\/20 {
              background-color: ${isLightMode ? '#f0fdf4' : 'rgba(6, 95, 70, 0.2)'} !important;
              border-color: ${isLightMode ? '#bbf7d0' : 'rgba(16, 185, 129, 0.25)'} !important;
              color: ${isLightMode ? '#166534' : '#34d399'} !important;
            }
            #ncert-container .bg-cyan-950\\/20 {
              background-color: ${isLightMode ? '#ecfeff' : 'rgba(8, 47, 73, 0.2)'} !important;
              border-color: ${isLightMode ? '#cffafe' : 'rgba(6, 182, 212, 0.25)'} !important;
              color: ${isLightMode ? '#0e7490' : '#22d3ee'} !important;
            }
            #ncert-container .text-emerald-250 {
              color: ${isLightMode ? '#15803d' : '#a7f3d0'} !important;
            }
            #ncert-container .text-cyan-205 {
              color: ${isLightMode ? '#0369a1' : '#bae6fd'} !important;
            }
            #ncert-container button:hover {
              background-color: ${isLightMode ? '#f8fafc' : '#1e293b'} !important;
            }
          ` }} />
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Search Header widget */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-100 tracking-tight flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-400" />
                  Solved NCERT Questions
                </h2>
                <p className="text-sm font-semibold text-slate-300">
                  Search & study official {preparingFor === '8th' ? 'Class VIII' : 'Class X'} {preparingFor === '10th' && qbSubject === 'chemistry' ? 'Chemical Reactions and Equations' : 'Light'} textbook questions with exact step-by-step solutions.
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-black border border-emerald-500/20 uppercase tracking-widest leading-none block w-fit">
                    CBSE Board Evaluation Standard (Step-by-Step Marks Model)
                  </span>
                </div>
              </div>
              <input
                type="text"
                placeholder="Search numericals..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 outline-none focus:border-teal-500/80 w-64 transition font-medium"
              />
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-4">
              {activeQuestions.ncert.filter(q => {
                const query = searchQuery.toLowerCase();
                return (
                  q.question.toLowerCase().includes(query) || 
                  q.questionNumber.toLowerCase().includes(query)
                );
              }).map(q => {
                const isOpen = selectedNCERTQuestionId === q.id;
                return (
                  <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition shadow-lg">
                    {/* Header bar button */}
                    <button
                      onClick={() => setSelectedNCERTQuestionId(isOpen ? null : q.id)}
                      className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      <div className="space-y-2 pr-4">
                        <span className="px-2.5 py-0.5 text-xs uppercase tracking-widest font-mono font-black bg-teal-500/10 text-teal-400 rounded border border-teal-500/25">
                          {q.questionNumber}
                        </span>
                        <h3 className="text-base font-bold text-slate-200 leading-snug">
                          {q.question}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-90 bg-teal-500/10 border-teal-500/25 text-teal-400 font-extrabold' : 'text-slate-400'}`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Expandable Worked Content */}
                    {isOpen && (
                      <div className="p-6 border-t border-slate-800 bg-[#070d18] space-y-5">
                        
                        {/* Given values */}
                        <div className="space-y-2">
                          <span className="text-xs font-black text-slate-300 uppercase tracking-widest block font-mono">1. Extracted Values (Prior to substitution)</span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {Object.entries(q.given).map(([key, val]) => (
                              <div key={key} className="bg-[#121927] border border-slate-800 p-3 rounded-xl">
                                <span className="text-xs text-slate-300 font-bold uppercase block mb-1 font-mono">{key}</span>
                                <span className="text-sm font-black text-slate-100 font-mono">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Equations block */}
                        <div className="space-y-3 bg-slate-950/60 rounded-xl p-4.5 border border-slate-800">
                          <div>
                            <span className="text-xs font-black text-slate-300 uppercase tracking-widest block font-mono mb-1">2. {preparingFor === '10th' && qbSubject === 'chemistry' ? 'Applied Concept / Reaction Pattern' : 'Applied Mirror / Lens Formula'}</span>
                            <span className="text-sm font-black text-yellow-300 font-mono bg-yellow-400/5 border border-yellow-400/15 py-1.5 px-3.5 rounded-xl inline-block">
                              {renderTextWithFractions(q.formulaUsed)}
                            </span>
                          </div>

                          <div className="space-y-2 pt-2">
                            <span className="text-xs font-black text-slate-300 uppercase tracking-widest block font-mono">3. Mathematical Progression Steps</span>
                            <div className="space-y-2 pl-2">
                              {q.derivationSteps.map((step, sIdx) => (
                                <div key={sIdx} className="text-sm text-slate-250 font-medium leading-snug font-mono flex gap-2">
                                  <span className="text-slate-400 font-extrabold">{sIdx + 1}.</span>
                                  <span>{renderTextWithFractions(step.replace(/^\d+\.\s*/, ''))}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Outcomes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          <div className="bg-emerald-950/20 border border-emerald-500/25 rounded-xl p-4.5">
                            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block font-mono mb-1">🎯 {preparingFor === '10th' && qbSubject === 'chemistry' ? 'FINAL ANSWER' : 'FINAL NUMERICAL CONCLUSION'}</span>
                            <p className="text-sm text-emerald-250 leading-relaxed font-semibold">{q.finalAnswer}</p>
                          </div>

                          {q.conceptualTip && (
                            <div className="bg-cyan-950/20 border border-cyan-500/25 rounded-xl p-4.5">
                              <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold block font-mono mb-1">💡 NOTE</span>
                              <p className="text-sm text-cyan-205 leading-relaxed font-semibold">{q.conceptualTip}</p>
                            </div>
                          )}
                        </div>

                        {/* Interactive trigger shortcut -- only meaningful for the Physics/Optics dataset,
                            since these presets are ray-optics simulator variables and the Chemistry
                            NCERT dataset reuses the same 1-4 id range for unrelated questions. */}
                        {!(preparingFor === '10th' && qbSubject === 'chemistry') && (
                        <div className="flex justify-end pt-3 border-t border-slate-800">
                          <button
                            onClick={() => {
                              if (q.id === 1) { // rearview mirror (convex, u = -5m, R = 3m, f = +1.5m -> 150 scaled)
                                setGroup('mirror');
                                setOpticsType('convex-mirror');
                                setObjectDist(250);
                                setFocalLength(75);
                                setObjectHeight(80);
                                setObjectType('arrow');
                              } else if (q.id === 2) { // concave mirror (f = -15cm -> 150, u = -25cm -> 250)
                                setGroup('mirror');
                                setOpticsType('concave-mirror');
                                setObjectDist(250);
                                setFocalLength(150);
                                setObjectHeight(100);
                                setObjectType('arrow');
                              } else if (q.id === 3) { // concave lens (f = -15cm, u = -30cm, v = -10cm)
                                setGroup('lens');
                                setOpticsType('concave-lens');
                                setObjectDist(300);
                                setFocalLength(150);
                                setObjectHeight(80);
                                setObjectType('arrow');
                              } else if (q.id === 4) { // convex lens (f = 100, u = 150)
                                setGroup('lens');
                                setOpticsType('convex-lens');
                                setObjectDist(150);
                                setFocalLength(100);
                                setObjectHeight(60);
                                setObjectType('arrow');
                              }
                              setActiveRays(new Set([1, 2, 3, 4]));
                              setHideObject(false);
                              setActiveView('simulator');
                            }}
                            className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-cyan-404 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-md shadow-cyan-500/10 cursor-pointer hover:scale-[1.02] active:scale-95 transition"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            Load Variables to Interactive Simulator
                          </button>
                        </div>
                        )}

                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sequential pipeline next step */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="space-y-0.5 text-left">
                <span className="text-[10px] uppercase font-mono font-black text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded border border-cyan-500/20">Next Chapter Milestone</span>
                <h4 className="text-base font-bold text-slate-100 mt-1">Solved NCERT Exercises Completed!</h4>
                <p className="text-xs text-slate-400 font-semibold">You have thoroughly reviewed all solved steps. Next, put your {preparingFor === '10th' && qbSubject === 'chemistry' ? 'chemistry' : 'optics'} concepts to the test in the Question Bank.</p>
              </div>
              <button
                onClick={() => changeView('qbank')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-lg active:scale-95 whitespace-nowrap animate-pulse"
              >
                Proceed to Question Bank
                <ChevronRight className="w-4 h-4 font-bold" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── 3. COMPREHENSIVE PRACTICE QUESTION BANK VIEW ── */}
      {activeView === 'qbank' && (
        <div 
          id="qbank-container" 
          className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin transition-colors duration-300 ${
            isLightMode ? 'bg-slate-50 text-slate-800' : 'bg-[#060b14] text-slate-100'
          }`}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            #qbank-container {
              background-color: ${isLightMode ? '#f8fafc' : '#060b14'} !important;
              color: ${isLightMode ? '#1e293b' : '#f1f5f9'} !important;
            }
            #qbank-container .bg-slate-900\\/40,
            #qbank-container .bg-slate-900,
            #qbank-container .bg-slate-900\\/50,
            #qbank-container .from-slate-900.to-slate-950,
            #qbank-container .from-slate-900\\/40 {
              background-color: ${isLightMode ? '#ffffff' : '#0f172a'} !important;
              background-image: none !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #qbank-container .bg-slate-950,
            #qbank-container .bg-slate-950\\/80,
            #qbank-container .bg-slate-950\\/60,
            #qbank-container .bg-[#070e1a],
            #qbank-container .bg-slate-900\\/30 {
              background-color: ${isLightMode ? '#f1f5f9' : '#020617'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #qbank-container .text-slate-100,
            #qbank-container .text-slate-101,
            #qbank-container .text-slate-200,
            #qbank-container .text-slate-250 {
              color: ${isLightMode ? '#0f172a' : '#f1f5f9'} !important;
            }
            #qbank-container .text-slate-300,
            #qbank-container .text-slate-400 {
              color: ${isLightMode ? '#475569' : '#94a3b8'} !important;
            }
            #qbank-container h2,
            #qbank-container h3,
            #qbank-container h4 {
              color: ${isLightMode ? '#0f172a' : '#ffffff'} !important;
            }
            #qbank-container .border-slate-800,
            #qbank-container .border-slate-805 {
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #qbank-container button:hover {
              background-color: ${isLightMode ? '#f8fafc' : '#1e293b'} !important;
            }
            #qbank-container input {
              background-color: ${isLightMode ? '#ffffff' : '#020617'} !important;
              color: ${isLightMode ? '#0f172a' : '#ffffff'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#334155'} !important;
            }
            #qbank-container .bg-amber-500\\/10 {
              background-color: ${isLightMode ? '#fef3c7' : 'rgba(245, 158, 11, 0.1)'} !important;
              color: ${isLightMode ? '#b45309' : '#f59e0b'} !important;
              border-color: ${isLightMode ? '#f59e0b' : 'rgba(245, 158, 11, 0.15)'} !important;
            }
            #qbank-container .bg-emerald-500\\/10 {
              background-color: ${isLightMode ? '#d1fae5' : 'rgba(16, 185, 129, 0.1)'} !important;
              color: ${isLightMode ? '#047857' : '#10b981'} !important;
              border-color: ${isLightMode ? '#10b981' : 'rgba(16, 185, 129, 0.15)'} !important;
            }
            #qbank-container .border-emerald-500\\/20,
            #qbank-container .border-emerald-500\\/25 {
              border-color: ${isLightMode ? '#10b981' : 'rgba(16, 185, 129, 0.2)'} !important;
            }
            #qbank-container .border-cyan-500\\/20,
            #qbank-container .border-cyan-500\\/25 {
              border-color: ${isLightMode ? '#06b6d4' : 'rgba(6, 180, 212, 0.2)'} !important;
            }
            #qbank-container .bg-emerald-950\\/20 {
              background-color: ${isLightMode ? '#f0fdf4' : 'rgba(6, 95, 70, 0.2)'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : 'rgba(16, 185, 129, 0.25)'} !important;
              color: ${isLightMode ? '#166534' : '#34d399'} !important;
            }
            #qbank-container .bg-cyan-950\\/20 {
              background-color: ${isLightMode ? '#ecfeff' : 'rgba(8, 47, 73, 0.2)'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : 'rgba(6, 182, 212, 0.25)'} !important;
              color: ${isLightMode ? '#0e7490' : '#22d3ee'} !important;
            }
            #qbank-container .bg-rose-950\\/20 {
              background-color: ${isLightMode ? '#fff1f2' : 'rgba(136, 19, 55, 0.2)'} !important;
              color: ${isLightMode ? '#be123c' : '#fda4af'} !important;
            }
          ` }} />
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Header control banner */}
            <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-101 tracking-tight flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-500 inline-block animate-pulse shrink-0" />
                  Board Exam Question Bank
                </h2>
                <p className="text-xs font-semibold text-slate-400">
                  Select key evaluative formats to examine your formulas, diagram rules, and definitions.
                </p>
              </div>

              {/* Select Category Pills */}
              <div className="flex overflow-x-auto gap-1 border border-slate-805 bg-slate-950/80 p-1 rounded-xl shrink-0">
                {(preparingFor === '12th'
                  ? [
                      { id: 'quiz' as const, label: 'IIT JEE & NEET MCQs' }
                    ]
                  : [
                      { id: 'quiz' as const, label: 'MCQs' },
                      { id: 'assertion' as const, label: 'Assertion & Reason' },
                      { id: 'veryshort' as const, label: 'Very Short (2 Marks)' },
                      { id: 'short' as const, label: 'Short (3 Marks)' },
                      { id: 'long' as const, label: 'Long (5 Marks)' },
                      { id: 'competency' as const, label: 'Competency (4 Marks)' },
                    ]
                ).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setQbankCategory(cat.id); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition cursor-pointer select-none ${
                      qbankCategory === cat.id
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md shadow-yellow-500/10'
                        : (isLightMode ? 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'bg-transparent text-slate-400 hover:text-slate-101 hover:bg-slate-900/50')
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MCQ Quiz Segment (Represented flat on a single page with answer checks and key) */}
            {qbankCategory === 'quiz' && (
              <div className="space-y-6">
                
                {/* Master Answer Key & Progress Controller */}
                <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-widest text-amber-500 font-mono uppercase bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/15">
                      Progress & Answer Key Panel
                    </span>
                    <h3 className="text-sm font-black text-slate-100 font-sans">
                      {preparingFor === '12th' ? 'Multiple-choice questions' : 'All Multiple-Choice Questions (Single-Page List)'}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Select answers for each question and verify. Click any individual "Show Answer" or toggle the master reveal key below.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => {
                        const next = new Set<string>();
                        activeQuestions.mcqs.forEach((_, idx) => {
                          next.add(`${preparingFor}_mcq_${idx}`);
                        });
                        setQbankMcqRevealed(next);
                      }}
                      className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 hover:text-white font-black text-[11px] transition cursor-pointer hover:border-slate-650"
                    >
                      Reveal All Answers / Key
                    </button>
                    <button
                      onClick={() => {
                        setQbankMcqSelections({});
                        setQbankMcqRevealed(new Set());
                      }}
                      className="px-3 py-1.5 rounded-xl border border-rose-950/40 bg-rose-950/20 text-rose-300 hover:text-rose-200 font-black text-[11px] transition cursor-pointer"
                    >
                      Clear All Selections
                    </button>
                  </div>
                </div>

                {/* Grid List of MCQs */}
                <div className="space-y-4">
                  {activeQuestions.mcqs.length === 0 ? (
                    <div className="text-center py-12 px-6 bg-slate-900/35 border border-slate-800 rounded-2xl w-full">
                      <p className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">No multiple-choice questions mapped for this standard</p>
                    </div>
                  ) : (
                    activeQuestions.mcqs.map((q, idx) => {
                      const mcqIdKey = `${preparingFor}_mcq_${idx}`;
                      const selectedIdx = qbankMcqSelections[mcqIdKey];
                      const isRevealed = qbankMcqRevealed.has(mcqIdKey);
                      const isSelectionMade = selectedIdx !== undefined;

                      return (
                        <div 
                          key={idx} 
                          className={`p-5 sm:p-6 rounded-2xl border transition duration-200 shadow-md flex flex-col justify-between space-y-4 ${
                            isRevealed 
                              ? 'bg-slate-900/60 border-slate-800/80 shadow-black/10' 
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-3.5">
                            {/* Question Header Status */}
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-amber-500 uppercase tracking-wider font-mono px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/15">
                                Q{idx + 1} • Single Page MCQ
                              </span>
                              {isRevealed && (
                                <span className={`text-[10px] font-black uppercase tracking-widest font-mono px-2 py-0.5 rounded ${
                                  selectedIdx === q.correctAnswer 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                    : 'bg-rose-500/10 text-rose-450 border border-rose-500/20'
                                }`}>
                                  {selectedIdx === q.correctAnswer ? '✓ Correct Answer' : isSelectionMade ? '✗ Incorrect Selection' : 'Unanswered yet'}
                                </span>
                              )}
                            </div>

                            {/* Question text */}
                            <h4 className="text-sm font-bold text-slate-100 leading-relaxed">
                              {q.question}
                            </h4>

                            {/* Grid representation of options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {q.options.map((opt, optIdx) => {
                                const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D
                                const isOptSelected = selectedIdx === optIdx;
                                const isOptCorrect = optIdx === q.correctAnswer;
                                
                                let optionBgStyle = "bg-[#0b101c] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/40";
                                if (isRevealed) {
                                  if (isOptCorrect) {
                                    optionBgStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold";
                                  } else if (isOptSelected) {
                                    optionBgStyle = "bg-rose-500/10 border-rose-500/40 text-rose-300 font-bold";
                                  } else {
                                    optionBgStyle = "opacity-45 bg-[#070b14] border-slate-905 text-slate-500";
                                  }
                                } else if (isOptSelected) {
                                  optionBgStyle = "bg-cyan-500/10 border-cyan-500 text-cyan-300 font-bold shadow-md shadow-cyan-500/5";
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={isRevealed}
                                    onClick={() => {
                                      setQbankMcqSelections(prev => ({
                                        ...prev,
                                        [mcqIdKey]: optIdx
                                      }));
                                    }}
                                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition flex items-center gap-3 cursor-pointer select-none ${optionBgStyle}`}
                                  >
                                    <span className={`w-6 h-6 rounded-lg text-[10.5px] font-black font-mono flex items-center justify-center shrink-0 ${
                                      isOptSelected 
                                        ? 'bg-cyan-500 text-slate-950 font-black' 
                                        : isRevealed && isOptCorrect 
                                        ? 'bg-emerald-500 text-slate-950 font-black' 
                                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                                    }`}>
                                      {optionLetter}
                                    </span>
                                    <span className="leading-tight">{opt}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Individual answer details */}
                          {isRevealed && (
                            <div className="bg-slate-950/75 p-4 rounded-xl border border-slate-850 space-y-1.5 animate-fade-in">
                              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest font-mono block">
                                🎓 Correct Answer: Option {String.fromCharCode(65 + q.correctAnswer)} ({q.options[q.correctAnswer]})
                              </span>
                              <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                                {q.explanation}
                              </p>
                            </div>
                          )}

                          {/* Footer action */}
                          <div className="flex justify-end">
                            <button
                              onClick={() => {
                                setQbankMcqRevealed(prev => {
                                  const next = new Set(prev);
                                  if (next.has(mcqIdKey)) {
                                    next.delete(mcqIdKey);
                                  } else {
                                    next.add(mcqIdKey);
                                  }
                                  return next;
                                });
                              }}
                              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-black text-slate-200 cursor-pointer tracking-wider transition uppercase"
                            >
                              {isRevealed ? 'Hide Answer' : 'Show Answer'}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            )}

            {/* Very Short Questions List (2 Marks) */}
            {qbankCategory === 'veryshort' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-black text-xs text-amber-500 uppercase tracking-widest font-mono">
                  <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Very Short Answer Question Database (2 Marks Each)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeQuestions.veryshort.length === 0 ? (
                    <div className="col-span-2 text-center py-12 px-6 bg-slate-900/35 border border-slate-800 rounded-2xl w-full">
                      <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto opacity-60 mb-2" />
                      <p className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">No specific very short questions mapped</p>
                      <p className="text-[11px] text-slate-500 mt-1">Please try selecting another study level or category from the navigation dropdowns above.</p>
                    </div>
                  ) : (
                    activeQuestions.veryshort.map(q => {
                      const ansKey = `veryshort_${q.id}`;
                      const showAns = qbankSelectedAnswers.has(ansKey);
                      return (
                        <div key={q.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow transition hover:border-slate-700 text-slate-101">
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-sky-400 bg-sky-500/10 border border-sky-500/15 px-2.5 py-0.5 rounded">
                              Ex-{q.id} • Very Short Answer (2 Marks)
                            </span>
                            <h3 className="text-sm font-bold text-slate-200 leading-snug">
                              {q.question}
                            </h3>
                          </div>

                          {showAns && (
                            <div className="space-y-3 bg-slate-950/70 p-4 border border-slate-850 rounded-xl">
                              <div>
                                <span className="text-[9px] text-slate-400 font-bold uppercase font-mono block mb-1">Standard textbook answer</span>
                                <p className="text-xs text-slate-300 leading-relaxed font-semibold">{q.answer}</p>
                              </div>
                              <div>
                                <span className="text-[9px] text-slate-400 font-bold uppercase font-mono block mb-1">Essential keywords to score points</span>
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                  {q.keyPoints.map(p => (
                                    <span key={p} className="text-[10px] text-emerald-450 font-bold font-mono bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded">
                                      ✓ {p}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => {
                              const next = new Set(qbankSelectedAnswers);
                              if (next.has(ansKey)) next.delete(ansKey); else next.add(ansKey);
                              setQbankSelectedAnswers(next);
                            }}
                            className="w-full py-2 bg-slate-800 hover:bg-slate-700 transition border border-slate-700 hover:border-[#334155] rounded-xl text-xs font-black text-slate-200 cursor-pointer"
                          >
                            {showAns ? 'Hide Model Answer' : 'Reveal Model Answer & Marking Keywords'}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Short Questions List (3 Marks) */}
            {qbankCategory === 'short' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-black text-xs text-amber-500 uppercase tracking-widest font-mono">
                  <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Short Answer Question Database (3 Marks Each)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeQuestions.short.length === 0 ? (
                    <div className="col-span-2 text-center py-12 px-6 bg-slate-900/35 border border-slate-800 rounded-2xl w-full">
                      <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto opacity-60 mb-2" />
                      <p className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">No specific short questions mapped</p>
                      <p className="text-[11px] text-slate-500 mt-1">Please try selecting another study level or category from the navigation dropdowns above.</p>
                    </div>
                  ) : (
                    activeQuestions.short.map(q => {
                      const ansKey = `short_${q.id}`;
                      const showAns = qbankSelectedAnswers.has(ansKey);
                      return (
                        <div key={q.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow transition hover:border-slate-700 text-slate-101">
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-sky-400 bg-sky-500/10 border border-sky-500/15 px-2.5 py-0.5 rounded">
                              Ex-{q.id} • Short Answer (3 Marks)
                            </span>
                            <h3 className="text-sm font-bold text-slate-200 leading-snug">
                              {q.question}
                            </h3>
                          </div>

                          {showAns && (
                            <div className="space-y-3 bg-slate-950/70 p-4 border border-slate-850 rounded-xl">
                              <div>
                                <span className="text-[9px] text-slate-400 font-bold uppercase font-mono block mb-1">Standard Textbook Model Answer</span>
                                <p className="text-xs text-slate-300 leading-relaxed font-semibold">{q.answer}</p>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => {
                              const next = new Set(qbankSelectedAnswers);
                              if (next.has(ansKey)) next.delete(ansKey); else next.add(ansKey);
                              setQbankSelectedAnswers(next);
                            }}
                            className="w-full py-2 bg-slate-800 hover:bg-slate-700 transition border border-slate-700 hover:border-[#334155] rounded-xl text-xs font-black text-slate-200 cursor-pointer"
                          >
                            {showAns ? 'Hide Answer' : 'Show Answer'}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Long Questions List (5 Marks) */}
            {qbankCategory === 'long' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-black text-xs text-amber-500 uppercase tracking-widest font-mono">
                  <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Structured Essay & Diagram Derivations (5 Marks Each)</span>
                </div>
                <div className="space-y-4 text-slate-101">
                  {activeQuestions.long.length === 0 ? (
                    <div className="text-center py-12 px-6 bg-slate-900/35 border border-slate-800 rounded-2xl w-full">
                      <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto opacity-60 mb-2" />
                      <p className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">No specific long questions mapped</p>
                      <p className="text-[11px] text-slate-500 mt-1">Please try selecting another study level or category from the navigation dropdowns above.</p>
                    </div>
                  ) : (
                    activeQuestions.long.map(q => {
                      const ansKey = `long_${q.id}`;
                      const showAns = qbankSelectedAnswers.has(ansKey);
                      return (
                        <div key={q.id} className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl space-y-4 shadow">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-2 border-b border-slate-800 gap-3">
                            <div className="space-y-1.5">
                              <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/15 px-2.5 py-1 rounded">
                                Ex-{q.id} • Structured 5 Marks Essay
                              </span>
                              <h3 className="text-sm font-black text-slate-100 leading-snug">
                                {q.question}
                              </h3>
                            </div>
                            <button
                              onClick={() => {
                                const next = new Set(qbankSelectedAnswers);
                                if (next.has(ansKey)) next.delete(ansKey); else next.add(ansKey);
                                setQbankSelectedAnswers(next);
                              }}
                              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-black text-slate-200 transition cursor-pointer shrink-0"
                            >
                              {showAns ? 'Hide Solution' : 'Reveal Rubrics & Explanations'}
                            </button>
                          </div>

                          {showAns && (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
                              {/* Marking schema */}
                              <div className={`md:col-span-4 space-y-3 p-4.5 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#111827] border-slate-800'}`}>
                                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block font-mono pl-0.5">📚 CBSE BOARD MARK DISTRIBUTION</span>
                                <div className="space-y-2.5">
                                  {q.markingScheme.map((item, idx) => (
                                    <div key={idx} className="text-xs text-slate-300 leading-relaxed font-semibold flex items-start gap-1.5">
                                      <span className="text-teal-400 shrink-0 font-extrabold">•</span>
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Answers breakdown */}
                              <div className="md:col-span-8 space-y-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono pl-0.5">✍️ TEXTBOOK MODEL ANALYSIS</span>
                                <div className="space-y-3">
                                  {q.answerParts.map((part, pIdx) => (
                                    <div key={pIdx} className="bg-slate-950/40 rounded-xl p-4 border border-slate-800">
                                      <span className="text-[10px] font-bold text-sky-450 uppercase tracking-wider block mb-1 font-mono">{part.part}</span>
                                      <p className="text-xs text-slate-200 leading-relaxed font-medium whitespace-pre-line">{part.text}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Assertion Reason List */}
            {qbankCategory === 'assertion' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-black text-xs text-sky-450 uppercase tracking-widest font-mono">
                  <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Assertion & Reason Statement Test Cases (A-R Practice)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-101">
                  {activeQuestions.assertion.length === 0 ? (
                    <div className="col-span-2 text-center py-12 px-6 bg-slate-900/35 border border-slate-805 rounded-2xl w-full">
                      <AlertTriangle className="w-8 h-8 text-amber-550 mx-auto opacity-60 mb-2" />
                      <p className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">No assertion questions mapped</p>
                      <p className="text-[11px] text-slate-500 mt-1">Please try selecting another study level or category from the navigation dropdowns above.</p>
                    </div>
                  ) : (
                    activeQuestions.assertion.map(q => {
                      const ansKey = `ar_${q.id}`;
                      const showAns = qbankSelectedAnswers.has(ansKey);
                      return (
                        <div key={q.id} className={`border p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow transition ${
                          isLightMode 
                            ? 'bg-white border-slate-200 hover:border-slate-300' 
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}>
                          <div className="space-y-4">
                            <span className={`text-[9px] uppercase tracking-wider font-mono font-black px-2.5 py-1 rounded ${
                              isLightMode 
                                ? 'text-sky-700 bg-sky-50 border border-sky-100' 
                                : 'text-sky-400 bg-sky-500/10 border border-sky-500/15'
                            }`}>
                              Ex-{q.id} • Assertion & Reason
                            </span>
 
                            <div className="space-y-3 font-semibold leading-relaxed">
                              {/* Lighter, beautiful, highly pleasant text contrast containers */}
                              <div className={`p-3.5 rounded-xl space-y-1 border ${
                                isLightMode 
                                  ? 'bg-slate-50 border-slate-200' 
                                  : 'bg-slate-950/55 border-slate-800/80'
                              }`}>
                                <span className="text-[9px] text-[#f87171] font-black uppercase tracking-wider block font-mono">A: Assertion Statement</span>
                                <p className={`text-xs font-bold leading-relaxed ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{q.assertion}</p>
                              </div>
 
                              <div className={`p-3.5 rounded-xl space-y-1 border ${
                                isLightMode 
                                  ? 'bg-slate-50 border-slate-200' 
                                  : 'bg-slate-950/55 border-slate-800/80'
                              }`}>
                                <span className="text-[9px] text-emerald-500 font-black uppercase tracking-wider block font-mono">R: Reason Statement</span>
                                <p className={`text-xs font-bold leading-relaxed ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{q.reason}</p>
                              </div>
                            </div>
                          </div>
 
                          {showAns && (
                            <div className={`space-y-2 p-4 border rounded-xl ${
                              isLightMode 
                                ? 'bg-[#ecfeff] border-cyan-200' 
                                : 'bg-[#0d1424] border-slate-800'
                            }`}>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[9px] font-bold uppercase font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>Standard Key:</span>
                                <span className="px-2.5 py-0.5 text-xs font-black font-mono text-slate-950 bg-amber-400 rounded">
                                  Option {q.correctOption}
                                </span>
                              </div>
                              <p className={`text-[11px] leading-relaxed font-semibold pt-1 ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                                <b>Explanation:</b> {q.explanation}
                              </p>
                            </div>
                          )}
 
                          <button
                            onClick={() => {
                              const next = new Set(qbankSelectedAnswers);
                              if (next.has(ansKey)) next.delete(ansKey); else next.add(ansKey);
                              setQbankSelectedAnswers(next);
                            }}
                            className="w-full py-2 bg-slate-800 hover:bg-slate-700 transition border border-slate-700 text-xs font-black text-slate-200 rounded-xl cursor-pointer"
                          >
                            {showAns ? 'Hide Answer' : 'Show Answer'}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Case Studies List (4 Marks Competency - Concordant Open-Ended Format) */}
            {qbankCategory === 'competency' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-black text-xs text-amber-500 uppercase tracking-widest font-mono">
                  <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Challenging Case Studies & Competency-Based Queries (4 Marks Each)</span>
                </div>
                <div className="space-y-6 text-slate-101">
                  {activeQuestions.competency.length === 0 ? (
                    <div className="text-center py-12 px-6 bg-slate-900/35 border border-slate-800 rounded-2xl w-full">
                      <AlertTriangle className="w-8 h-8 text-amber-550 mx-auto opacity-60 mb-2" />
                      <p className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">No specific competencies mapped</p>
                      <p className="text-[11px] text-slate-500 mt-1">Please try selecting another study level or category from the navigation dropdowns above.</p>
                    </div>
                  ) : (
                    activeQuestions.competency.map(q => {
                      return (
                        <div key={q.id} className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl space-y-4 shadow-md">
                          
                          {/* Scenario block */}
                          <div className="space-y-3 pb-4 border-b border-slate-800">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[9px] uppercase tracking-wider font-mono font-black text-teal-400 bg-teal-500/10 border border-teal-500/15 px-2.5 py-1 rounded">
                                CASE MODULE {q.id}
                              </span>
                              <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/15 px-2.5 py-1 rounded">
                                Difficulty: Challenging (Mixed)
                              </span>
                            </div>
                            <h3 className="text-sm font-black text-slate-100 tracking-tight leading-snug">
                              Topic: {q.caseTitle}
                            </h3>
                            <p className="text-xs text-slate-300 leading-relaxed p-4 bg-slate-950/40 border border-slate-800 rounded-xl font-semibold">
                              {q.caseDescription}
                            </p>
                          </div>
 
                          {/* Questions list */}
                          <div className="space-y-4 pt-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">CONCISE OPEN-ENDED QUESTIONS (FORMULATE YOUR RESPONSES)</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {q.subQuestions.map((sub, sIdx) => {
                                const ansArrKey = `case_${q.id}_sub_${sIdx}`;
                                const subAnsOpened = qbankSelectedAnswers.has(ansArrKey);
                                const isPartDifficult = sIdx % 2 !== 0;

                                return (
                                  <div key={sIdx} className={`p-4.5 rounded-xl space-y-3.5 flex flex-col justify-between border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#0b101c] border-slate-800'}`}>
                                    <div className="space-y-2.5">
                                      <div className="flex items-center justify-between gap-2 border-b border-slate-800/40 pb-1.5">
                                        <span className="text-[9.5px] font-black text-sky-400 font-mono">
                                          PART {sIdx + 1} (2 Marks)
                                        </span>
                                        <span className={`text-[8.5px] font-bold font-mono px-1.5 py-0.5 rounded ${
                                          isPartDifficult 
                                            ? 'bg-red-500/10 text-red-400 border border-red-500/10' 
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/10'
                                        }`}>
                                          {isPartDifficult ? 'Difficult / Analytical' : 'Moderate / Concept'}
                                        </span>
                                      </div>
                                      <p className="text-xs text-slate-250 text-slate-200 font-bold leading-relaxed">{sub.question}</p>
                                      
                                      {/* Open-ended response textbox for student to formulate their own answer */}
                                      {!(preparingFor === '8th' || preparingFor === '10th') && (
                                        <div className="space-y-1 pt-0.5">
                                          <textarea
                                            placeholder="Type your constructed answer or solution proof here for active practice..."
                                            className="w-full text-[11px] font-semibold bg-slate-950/80 border border-slate-850 focus:border-cyan-500/40 focus:bg-slate-950 rounded-xl p-3 text-slate-300 placeholder:text-slate-500 outline-none transition resize-none h-20"
                                          />
                                        </div>
                                      )}
                                    </div>
 
                                    {subAnsOpened && (
                                      <div className="p-3 bg-emerald-500/5 border border-emerald-500/25 rounded-lg text-[11px] font-semibold space-y-1">
                                        <p className="text-emerald-400 font-bold mb-0.5 font-mono text-[9px] uppercase tracking-wider">Correct Model Answer:</p>
                                        <p className="text-slate-250 text-slate-200 leading-relaxed font-semibold">{sub.answer}</p>
                                        {sub.explanation && <p className="text-slate-400 mt-1 font-medium">{sub.explanation}</p>}
                                      </div>
                                    )}
 
                                    <button
                                      onClick={() => {
                                        const next = new Set(qbankSelectedAnswers);
                                        if (next.has(ansArrKey)) next.delete(ansArrKey); else next.add(ansArrKey);
                                        setQbankSelectedAnswers(next);
                                      }}
                                      className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 transition text-[10.5px] font-black text-slate-200 rounded-lg cursor-pointer"
                                    >
                                      {subAnsOpened ? 'Hide Answer' : 'Show Answer'}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
 
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Sequential pipeline next step */}
            <div className={`border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 ${isLightMode ? 'bg-slate-50' : 'bg-[#111827]/50'}`}>
              <div className="space-y-0.5 text-left">
                <span className="text-[10px] uppercase font-mono font-black text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/25">Final Chapter Milestone</span>
                <h4 className="text-base font-bold text-slate-100 mt-1">Question Bank Completed!</h4>
                <p className="text-xs text-slate-400 font-semibold">You have practiced MCQ trivia and CBSE derivations. Next, complete your Self-Assessment to earn your {preparingFor === '10th' && qbSubject === 'chemistry' ? 'chemistry' : 'optics'} scoring badge.</p>
              </div>
              <button
                onClick={() => changeView('assessment')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#38bdf8] hover:from-[#06b6d4] hover:to-[#0284c7] text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-lg active:scale-95 whitespace-nowrap animate-pulse"
              >
                Proceed to Self-Assessment
                <ChevronRight className="w-4 h-4 font-bold" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── 6. INTERACTIVE SELF ASSESSMENT VIEW ── */}
      {activeView === 'assessment' && (
        <div 
          id="assessment-container" 
          className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin transition-colors duration-300 ${
            isLightMode ? 'bg-slate-50 text-slate-800' : 'bg-[#060b14] text-slate-100'
          }`}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            #assessment-container {
              background-color: ${isLightMode ? '#f8fafc' : '#060b14'} !important;
              color: ${isLightMode ? '#1e293b' : '#f1f5f9'} !important;
            }
            #assessment-container .bg-slate-900\\/40,
            #assessment-container .bg-slate-900,
            #assessment-container .bg-slate-900\\/50 {
              background-color: ${isLightMode ? '#ffffff' : '#0f172a'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #assessment-container .bg-slate-950,
            #assessment-container .bg-slate-950\\/80,
            #assessment-container .bg-[#070d18],
            #assessment-container .bg-[#121927] {
              background-color: ${isLightMode ? '#f1f5f9' : '#020617'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #assessment-container .text-slate-100,
            #assessment-container .text-slate-200,
            #assessment-container .text-slate-250 {
              color: ${isLightMode ? '#0f172a' : '#f1f5f9'} !important;
            }
            #assessment-container .text-slate-300,
            #assessment-container .text-slate-400 {
              color: ${isLightMode ? '#475569' : '#94a3b8'} !important;
            }
            #assessment-container h2,
            #assessment-container h3,
            #assessment-container h4 {
              color: ${isLightMode ? '#0f172a' : '#ffffff'} !important;
            }
            #assessment-container .border-slate-800,
            #assessment-container .border-slate-805,
            #assessment-container .border-slate-850 {
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #assessment-container button:hover {
              background-color: ${isLightMode ? '#f8fafc' : '#1e293b'} !important;
            }
            #assessment-container input,
            #assessment-container textarea {
              background-color: ${isLightMode ? '#ffffff' : '#020617'} !important;
              color: ${isLightMode ? '#0f172a' : '#ffffff'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#334155'} !important;
            }
            #assessment-container .bg-cyan-950\\/40 {
              background-color: ${isLightMode ? '#ecfeff' : 'rgba(8, 47, 73, 0.4)'} !important;
              color: ${isLightMode ? '#0891b2' : '#22d3ee'} !important;
              border-color: ${isLightMode ? '#cffafe' : 'rgba(21, 94, 117, 0.3)'} !important;
            }
            #assessment-container .bg-emerald-500\\/5 {
              background-color: ${isLightMode ? '#f0fdf4' : 'rgba(16, 185, 129, 0.05)'} !important;
              border-color: ${isLightMode ? '#bbf7d0' : 'rgba(16, 185, 129, 0.25)'} !important;
              color: ${isLightMode ? '#15803d' : '#a7f3d0'} !important;
            }
            #assessment-container .bg-rose-500\\/5,
            #assessment-container .bg-red-500\\/10 {
              background-color: ${isLightMode ? '#fff1f2' : 'rgba(239, 68, 68, 0.05)'} !important;
              color: ${isLightMode ? '#be123c' : '#fda4af'} !important;
            }
            #assessment-container .bg-amber-500\\/10 {
              background-color: ${isLightMode ? '#fef3c7' : 'rgba(245, 158, 11, 0.1)'} !important;
              color: ${isLightMode ? '#b45309' : '#f59e0b'} !important;
              border-color: ${isLightMode ? '#f59e0b' : 'rgba(245, 158, 11, 0.1)'} !important;
            }
          ` }} />
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Assessment Desk Banner */}
            <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-100 tracking-tight flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  Interactive Self Assessment Desk
                </h2>
                <p className="text-sm font-semibold text-slate-300 font-sans">
                  Examining conceptual depth for <span className="text-cyan-400 font-extrabold">{preparingFor === '8th' ? 'Class VIII' : preparingFor === '10th' ? 'Class X' : 'Competitions'}</span>. Answer questions to track your metrics.
                </p>
              </div>
              <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 rounded-lg text-xs font-black font-mono select-none shrink-0 text-center">
                {preparingFor === '8th' ? 'Grade 8 Standard' : preparingFor === '10th' ? 'Grade 10 Standard' : 'Competitive / JEE'}
              </span>
            </div>

            {/* Dynamic Quiz Frame */}
            <div className="max-w-2xl mx-auto">
              <Quiz
                key={`${preparingFor}_${qbSubject}`}
                initialGrade={preparingFor === '8th' ? '8th' : preparingFor === '10th' ? '10th' : 'jee'}
                customQuestions={
                  preparingFor === '8th'
                    ? CLASSVIII_SELF_ASSESSMENT
                    : preparingFor === '10th'
                    ? (qbSubject === 'chemistry' ? CHEMISTRY10_SELF_ASSESSMENT : CLASSX_SELF_ASSESSMENT)
                    : COMPETITION_SELF_ASSESSMENT
                }
                subjectTitle={preparingFor === '10th' && qbSubject === 'chemistry' ? 'Chemistry Self-Assessment' : undefined}
                subjectSubtitle={preparingFor === '10th' && qbSubject === 'chemistry' ? 'Ready to test your knowledge of Chemical Reactions and Equations?' : undefined}
                isLightMode={isLightMode}
              />
            </div>

          </div>
        </div>
      )}

      {activeView === 'homework' && user && (
        <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
          <div className="max-w-3xl mx-auto space-y-6">

            <div className={`border rounded-2xl p-6 shadow-lg space-y-3 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <h2 className={`text-lg font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <FileText className="w-5 h-5 text-amber-400" /> Homework Assigned
              </h2>
              {assignmentsLoading ? (
                <div className="text-center py-4 text-xs font-semibold text-slate-500">Loading assignments...</div>
              ) : visibleAssignments.length === 0 ? (
                <div className="text-center py-4 text-xs font-semibold text-slate-500">No homework assigned yet.</div>
              ) : (
                <div className={`divide-y ${isLightMode ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                  {visibleAssignments.map((a) => (
                    <div key={a.id} className="py-3 flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{a.title}</p>
                        {a.subject && <p className="text-[10px] font-mono text-cyan-400 mt-0.5">{a.subject}</p>}
                        {a.description && <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{a.description}</p>}
                        <p className={`text-[10px] font-mono mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                          {new Date(a.createdAt).toLocaleDateString()} • {a.targetClass === 'All' ? 'All Classes' : `Class ${a.targetClass}`}
                        </p>
                        {a.deadline && <p className="text-[10px] font-bold text-amber-400 mt-0.5">Deadline: {formatDeadline(a.deadline)}</p>}
                      </div>
                      {a.fileUrl && (
                        <a href={a.fileUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded hover:bg-cyan-500/10 text-cyan-400 shrink-0 cursor-pointer" title="View assignment file">
                          <Eye className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={`border rounded-2xl p-6 shadow-lg space-y-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <h2 className={`text-lg font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <Upload className="w-5 h-5 text-cyan-400" /> Submit Homework
              </h2>
              <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Upload photos of every completed page (or a single PDF). Multiple photos are automatically combined into one PDF. It will be checked and feedback will be sent here.
              </p>

              {homeworkError && (
                <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">{homeworkError}</div>
              )}
              {homeworkSuccess && (
                <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2.5">{homeworkSuccess}</div>
              )}

              <form onSubmit={handleHomeworkUpload} className="space-y-3">
                {visibleAssignments.length > 0 && (
                  <div className="space-y-1">
                    <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Which Homework Is This For?</label>
                    <select
                      value={selectedAssignmentId}
                      onChange={(e) => setSelectedAssignmentId(e.target.value)}
                      required
                      className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                    >
                      <option value="" disabled>-- Select the assignment this is for --</option>
                      {visibleAssignments.map((a) => (
                        <option key={a.id} value={a.id}>{a.title}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="space-y-1">
                  <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Subject / Topic (optional)</label>
                  <input
                    type="text"
                    value={homeworkSubject}
                    onChange={(e) => setHomeworkSubject(e.target.value)}
                    placeholder="e.g. Reflection of Light - Q1 to Q5"
                    className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Homework Photos or a Single PDF (max 15 photos, 10MB per file)</label>
                  <p className={`text-[10px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Got more than 15 pages? Scan them into one PDF with your phone's scanner app instead -- no page limit on PDFs.</p>
                  <input
                    ref={homeworkFileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf"
                    onChange={(e) => handleHomeworkFileSelect(Array.from(e.target.files || []))}
                    required
                    className={`w-full text-xs font-semibold file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-black file:uppercase file:cursor-pointer cursor-pointer ${isLightMode ? 'text-slate-600 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200' : 'text-slate-400 file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700'}`}
                  />
                  {homeworkFiles.length > 0 && (
                    <ul className="space-y-1 pt-1">
                      {homeworkFiles.map((f, i) => (
                        <li key={i} className={`flex items-center justify-between text-[10px] font-mono px-2 py-1 rounded ${isLightMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-950 text-slate-400'}`}>
                          <span className="truncate">{f.name}</span>
                          <button
                            type="button"
                            onClick={() => setHomeworkFiles(homeworkFiles.filter((_, idx) => idx !== i))}
                            className="text-red-400 hover:text-red-300 cursor-pointer ml-2 shrink-0"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {homeworkFiles.length > 1 && (
                    <p className="text-[10px] font-semibold text-cyan-400">{homeworkFiles.length} photos will be combined into one PDF automatically.</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={homeworkUploading || homeworkFiles.length === 0 || (visibleAssignments.length > 0 && !selectedAssignmentId)}
                  className="w-full py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {homeworkUploading ? 'Uploading...' : 'Submit Homework'}
                </button>
              </form>
            </div>

            <div className={`border rounded-2xl p-6 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <h3 className="text-sm font-black tracking-tight uppercase font-mono tracking-widest text-[#22d3ee]">
                Your Submissions ({mySubmissions.length})
              </h3>
              <div className={`mt-4 divide-y ${isLightMode ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                {homeworkLoading ? (
                  <div className="text-center py-6 text-xs font-semibold text-slate-500">Loading your submissions...</div>
                ) : mySubmissions.length === 0 ? (
                  <div className="text-center py-6 text-xs font-semibold text-slate-500">No homework submitted yet.</div>
                ) : (
                  mySubmissions.map((sub) => (
                    <div key={sub.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{sub.subject || 'Homework Submission'}</p>
                        <p className={`text-[10px] font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{new Date(sub.submittedAt).toLocaleString()}</p>
                        {sub.aiFeedback && (
                          <p className={`text-[10px] mt-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{sub.aiFeedback}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {sub.aiScore != null && (
                          <span className="text-xs font-black text-emerald-400">{sub.aiScore}/10</span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                          sub.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                        }`}>
                          {sub.status}
                        </span>
                        {sub.fileUrl && (
                          <a href={sub.fileUrl} target="_blank" rel="noreferrer" className="p-1 rounded hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 cursor-pointer" title="View submitted file">
                            <Eye className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {activeView === 'startStudying' && (() => {
        const effectiveClass: '8th' | '9th' | '10th' | null = !isClassExempt
          ? (studentTrack === '8th' || studentTrack === '9th' || studentTrack === '10th' ? studentTrack : null)
          : studyingClass;

        return (
          <div className={`flex-1 overflow-y-auto px-4 py-12 transition-colors duration-300 ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#060b14] text-slate-100'} scrollbar-thin`}>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-2">
                <span className={`text-xs uppercase font-mono font-black px-2.5 py-0.5 rounded border ${isLightMode ? 'text-cyan-800 bg-cyan-100 border-cyan-300' : 'text-cyan-400 bg-cyan-400/10 border border-cyan-500/20'}`}>
                  Start Studying
                </span>
                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>
                  {effectiveClass ? `Class ${effectiveClass.replace('th', '')} -- Choose a Subject` : 'Which class are you studying?'}
                </h1>
                <p className={`text-xs sm:text-sm font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  {effectiveClass ? 'Pick a subject to open its study notes.' : 'Select a class to see its available subjects.'}
                </p>
              </div>

              {!isClassExempt && effectiveClass === null && (
                <div className={`rounded-2xl border p-6 text-center space-y-2 ${isLightMode ? 'bg-cyan-50 border-cyan-300' : 'bg-cyan-950/20 border-cyan-500/20'}`}>
                  <p className={`text-sm font-black ${isLightMode ? 'text-cyan-800' : 'text-cyan-300'}`}>Start Studying covers Class 8, 9 and 10</p>
                  <p className={`text-xs font-semibold ${isLightMode ? 'text-cyan-700' : 'text-cyan-200/80'}`}>Your registered track isn't part of this yet -- use the Notes menu above for your content.</p>
                </div>
              )}

              {isClassExempt && effectiveClass === null && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(['8th', '9th', '10th'] as const).map((cls) => (
                    <button
                      key={cls}
                      onClick={() => setStudyingClass(cls)}
                      className={`flex flex-col items-center justify-center gap-2 p-8 rounded-2xl border text-center transition duration-200 cursor-pointer ${
                        isLightMode ? 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300' : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                      }`}
                    >
                      <GraduationCap className={`w-8 h-8 ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`} />
                      <span className={`text-lg font-black ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>Class {cls.replace('th', '')}</span>
                    </button>
                  ))}
                </div>
              )}

              {effectiveClass !== null && (
                <div className="space-y-4">
                  {isClassExempt && (
                    <button
                      onClick={() => { setStudyingClass(null); setUnderConstructionSubject(null); }}
                      className={`text-xs font-bold flex items-center gap-1 cursor-pointer ${isLightMode ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Choose a different class
                    </button>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SUBJECT_CARDS.map((s) => {
                      const available = SUBJECT_AVAILABILITY[effectiveClass][s.id];
                      const Icon = s.icon;
                      return (
                        <button
                          key={s.id}
                          onClick={() => openSubject(effectiveClass, s.id)}
                          className={`flex items-center gap-3 p-5 rounded-2xl border text-left transition duration-200 cursor-pointer bg-gradient-to-br ${s.color} ${!available ? 'opacity-70' : ''}`}
                        >
                          <Icon className="w-7 h-7 shrink-0" />
                          <div>
                            <p className={`text-base font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{s.id}</p>
                            <p className={`text-[11px] font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>{available ? 'Notes available' : 'Coming soon'}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {underConstructionSubject && (
                    <div className={`rounded-2xl border p-6 text-center space-y-2 ${isLightMode ? 'bg-amber-50 border-amber-300' : 'bg-amber-950/20 border-amber-500/20'}`}>
                      <Construction className={`w-6 h-6 mx-auto ${isLightMode ? 'text-amber-600' : 'text-amber-400'}`} />
                      <p className={`text-sm font-black ${isLightMode ? 'text-amber-800' : 'text-amber-300'}`}>{underConstructionSubject} notes for Class {effectiveClass.replace('th', '')} are under construction</p>
                      <p className={`text-xs font-semibold ${isLightMode ? 'text-amber-700' : 'text-amber-200/80'}`}>They'll open here as soon as they're ready. Check back soon!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {activeView === 'latestNews' && (
        <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-1">
              <h1 className={`text-2xl font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <Megaphone className="w-6 h-6 text-amber-400" /> Latest Updates
              </h1>
              <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Syllabus notices and announcements posted by your teacher.</p>
            </div>

            {announcementsLoading ? (
              <div className="text-center py-8 text-xs font-semibold text-slate-500">Loading updates...</div>
            ) : visibleAnnouncements.length === 0 ? (
              <div className={`text-center py-10 rounded-2xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                <p className="text-xs font-semibold text-slate-500">No updates posted yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {visibleAnnouncements.map((a) => (
                  <div key={a.id} className={`border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-black ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{a.title}</p>
                      {a.targetClass !== 'All' && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">Class {a.targetClass.replace('th', '')}</span>
                      )}
                    </div>
                    <p className={`text-xs mt-2 whitespace-pre-wrap leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{a.message}</p>
                    <p className={`text-[10px] font-mono mt-3 ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>{new Date(a.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeView === 'profile' && (
        <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-1">
              <h1 className={`text-2xl font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <User className="w-6 h-6 text-cyan-400" /> My Profile
              </h1>
              <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Your academic and personal details.</p>
            </div>

            {profileError && (
              <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">{profileError}</div>
            )}
            {profileSuccess && (
              <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2.5">{profileSuccess}</div>
            )}

            <div className={`border rounded-2xl p-6 shadow-lg space-y-5 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <div className="flex items-center gap-4">
                {profilePhotoFile ? (
                  <img src={URL.createObjectURL(profilePhotoFile)} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/40" />
                ) : user.photoUrl ? (
                  <img src={user.photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/40" />
                ) : (
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${isLightMode ? 'bg-slate-100 border-slate-300 text-slate-400' : 'bg-slate-950 border-slate-700 text-slate-500'}`}>
                    <User className="w-9 h-9" />
                  </div>
                )}
                <div>
                  <label className={`inline-block px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer transition ${isLightMode ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>
                    Change Photo
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => setProfilePhotoFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  {profilePhotoFile && <p className="text-[10px] text-slate-500 mt-1 truncate max-w-[160px]">{profilePhotoFile.name}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[9px] font-black uppercase tracking-wider font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Name</p>
                  <p className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{user.name}</p>
                </div>
                <div>
                  <p className={`text-[9px] font-black uppercase tracking-wider font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Email</p>
                  <p className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{user.email}</p>
                </div>
                {user.studentClass && (
                  <div>
                    <p className={`text-[9px] font-black uppercase tracking-wider font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Class</p>
                    <p className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{user.studentClass}</p>
                  </div>
                )}
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-3 pt-2 border-t border-slate-800/50">
                <div className="space-y-1">
                  <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Date of Birth</label>
                  <input
                    type="date"
                    value={profileDob}
                    onChange={(e) => setProfileDob(e.target.value)}
                    className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>About Me</label>
                  <textarea
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    rows={3}
                    placeholder="A little about yourself..."
                    className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 resize-none ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Favorite Subject</label>
                    <input
                      type="text"
                      value={profileFavSubject}
                      onChange={(e) => setProfileFavSubject(e.target.value)}
                      placeholder="e.g. Physics"
                      className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Hobbies & Interests</label>
                    <input
                      type="text"
                      value={profileHobbies}
                      onChange={(e) => setProfileHobbies(e.target.value)}
                      placeholder="e.g. Cricket, drawing"
                      className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="w-full py-2.5 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50"
                >
                  {profileSaving ? 'Saving...' : 'Save Profile'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeView === 'forum' && (() => {
        const isAdmin = !!user?.email && ADMIN_EMAILS.includes(user.email);

        if (forumActiveThreadId) {
          return (
            <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
              <div className="max-w-2xl mx-auto space-y-4">
                <button onClick={backToForumList} className={`text-xs font-bold flex items-center gap-1 cursor-pointer ${isLightMode ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-slate-200'}`}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Forum
                </button>

                {forumThreadLoading ? (
                  <div className="text-center py-8 text-xs font-semibold text-slate-500">Loading thread...</div>
                ) : forumThreadDetail ? (
                  <>
                    <div className={`border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                      <div className="flex items-start justify-between gap-2">
                        <h1 className={`text-lg font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{forumThreadDetail.title}</h1>
                        {isAdmin && (
                          <button onClick={() => handleDeleteForumThread(forumThreadDetail.id)} className="p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 cursor-pointer shrink-0" title="Delete thread">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className={`text-[10px] font-mono mt-1 flex items-center gap-1.5 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {forumThreadDetail.authorName} • {new Date(forumThreadDetail.createdAt).toLocaleString()}
                        {forumThreadDetail.status === 'pending' && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">Pending Approval</span>
                        )}
                      </p>
                      <p className={`text-sm mt-3 whitespace-pre-wrap leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>{forumThreadDetail.body}</p>
                      {forumThreadDetail.imageUrl && (
                        <img src={forumThreadDetail.imageUrl} alt="Attached" className="mt-3 rounded-xl max-h-80 border border-slate-800" />
                      )}
                    </div>

                    <div className="space-y-2.5">
                      <p className={`text-[10px] font-black uppercase tracking-wider font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {forumReplies.length} {forumReplies.length === 1 ? 'Reply' : 'Replies'}
                      </p>
                      {forumReplies.map((r) => (
                        <div key={r.id} className={`border rounded-xl p-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{r.authorName}</p>
                            {isAdmin && (
                              <button onClick={() => handleDeleteForumReply(r.id)} className="p-0.5 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 cursor-pointer shrink-0" title="Delete reply">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <p className={`text-[10px] font-mono flex items-center gap-1.5 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                            {new Date(r.createdAt).toLocaleString()}
                            {r.status === 'pending' && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">Pending Approval</span>
                            )}
                          </p>
                          <p className={`text-xs mt-2 whitespace-pre-wrap leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{r.body}</p>
                          {r.imageUrl && (
                            <img src={r.imageUrl} alt="Attached" className="mt-2 rounded-lg max-h-60 border border-slate-800" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className={`border rounded-2xl p-4 shadow-lg space-y-2 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                      {replyError && (
                        <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{replyError}</div>
                      )}
                      <form onSubmit={handlePostReply} className="space-y-2">
                        <textarea
                          value={replyBody}
                          onChange={(e) => setReplyBody(e.target.value)}
                          rows={3}
                          required
                          placeholder="Write a reply..."
                          className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 resize-none ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                        />
                        <div className="flex items-center gap-2">
                          <label className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer transition ${isLightMode ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>
                            <ImageIcon className="w-3 h-3" /> {replyImage ? 'Change Image' : 'Add Image'}
                            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => setReplyImage(e.target.files?.[0] || null)} />
                          </label>
                          {replyImage && <span className="text-[10px] text-slate-500 truncate max-w-[160px]">{replyImage.name}</span>}
                        </div>
                        <button
                          type="submit"
                          disabled={replyPosting}
                          className="w-full py-2 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50"
                        >
                          {replyPosting ? 'Posting...' : 'Post Reply'}
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-xs font-semibold text-slate-500">Thread not found.</div>
                )}
              </div>
            </div>
          );
        }

        return (
          <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h1 className={`text-2xl font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    <MessageSquare className="w-6 h-6 text-cyan-400" /> Forum
                  </h1>
                  <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Ask doubts, discuss anything -- open to every class.</p>
                </div>
                <button
                  onClick={() => setShowNewThreadForm(!showNewThreadForm)}
                  className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-[#22d3ee] text-slate-950 hover:bg-cyan-400 cursor-pointer transition shrink-0"
                >
                  {showNewThreadForm ? 'Cancel' : '+ New Thread'}
                </button>
              </div>

              {showNewThreadForm && (
                <div className={`border rounded-2xl p-4 shadow-lg space-y-2 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                  {newThreadError && (
                    <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{newThreadError}</div>
                  )}
                  <form onSubmit={handlePostThread} className="space-y-2">
                    <input
                      type="text"
                      value={newThreadTitle}
                      onChange={(e) => setNewThreadTitle(e.target.value)}
                      required
                      placeholder="Title -- what's your question or topic?"
                      className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                    />
                    <textarea
                      value={newThreadBody}
                      onChange={(e) => setNewThreadBody(e.target.value)}
                      rows={4}
                      required
                      placeholder="Describe your doubt or what you'd like to discuss..."
                      className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 resize-none ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                    />
                    <div className="flex items-center gap-2">
                      <label className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer transition ${isLightMode ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>
                        <ImageIcon className="w-3 h-3" /> {newThreadImage ? 'Change Image' : 'Add Image'}
                        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => setNewThreadImage(e.target.files?.[0] || null)} />
                      </label>
                      {newThreadImage && <span className="text-[10px] text-slate-500 truncate max-w-[160px]">{newThreadImage.name}</span>}
                    </div>
                    <p className={`text-[10px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      Your post will be reviewed by an admin before it's visible to others.
                    </p>
                    <button
                      type="submit"
                      disabled={newThreadPosting}
                      className="w-full py-2 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition disabled:opacity-50"
                    >
                      {newThreadPosting ? 'Posting...' : 'Post Thread'}
                    </button>
                  </form>
                </div>
              )}

              {forumThreadsLoading ? (
                <div className="text-center py-8 text-xs font-semibold text-slate-500">Loading threads...</div>
              ) : forumThreads.length === 0 ? (
                <div className={`text-center py-10 rounded-2xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                  <p className="text-xs font-semibold text-slate-500">No threads yet. Be the first to start one!</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {forumThreads.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => openForumThread(t.id)}
                      className={`w-full text-left border rounded-2xl p-4 shadow-lg cursor-pointer transition ${isLightMode ? 'bg-white border-slate-200 hover:border-cyan-400' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50'}`}
                    >
                      <div className="flex items-start gap-3">
                        {t.imageUrl && (
                          <img src={t.imageUrl} alt="Attached" className="w-14 h-14 rounded-lg object-cover border border-slate-800 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm font-black ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{t.title}</p>
                            {isAdmin && (
                              <span
                                onClick={(e) => { e.stopPropagation(); handleDeleteForumThread(t.id); }}
                                className="p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 cursor-pointer shrink-0"
                                title="Delete thread"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                          <p className={`text-[10px] font-mono mt-1 flex items-center gap-1.5 flex-wrap ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                            {t.authorName} • {new Date(t.createdAt).toLocaleDateString()} • {t.replyCount} {t.replyCount === 1 ? 'reply' : 'replies'}
                            {t.status === 'pending' && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">Pending Approval</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {activeView === 'admin' && user?.email && ADMIN_EMAILS.includes(user.email) && (
        <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Admin Welcome Jumbotron */}
            <div className={`relative rounded-3xl overflow-hidden border border-amber-500/20 p-8 shadow-2xl ${isLightMode ? 'bg-gradient-to-r from-amber-50 via-white to-slate-50' : 'bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950'}`}>
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <span className="px-3 py-1 text-xs font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                  🛡️ Core Administrator Controls [Owner Only]
                </span>
                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Welcome back, {(user?.name || 'Admin').split(' ')[0]}!
                </h1>
                <p className={`text-xs sm:text-sm font-semibold leading-relaxed max-w-xl ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                  Approve/reject pending user registries, reset active device limits, and manage shareable Invite/Access Codes for WhatsApp & Instagram.
                </p>
              </div>
            </div>

            {adminActionMessage && (
              <div className={`text-xs font-bold rounded-lg px-3 py-2.5 border ${
                adminActionMessage.type === 'success'
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : 'text-red-400 bg-red-500/10 border-red-500/20'
              }`}>
                {adminActionMessage.text}
              </div>
            )}

            {/* Admin Panel Rows (single-column stack: guarantees no dead space regardless of how tall any card grows) */}
            <div className="space-y-6">

              {/* Pending action registry */}
              <div>
                <div className={`border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                  <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase font-mono tracking-widest text-amber-400">
                    <UserCheck className="w-42 h-4" /> Pending Approvals Queue
                  </h3>
                  <p className={`text-[11px] mt-1 font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Student accounts waiting for your owner manual authorization before they can log in.</p>

                  <div className={`mt-4 divide-y ${isLightMode ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                    {adminUsers.filter(u => u.status === 'pending').length === 0 ? (
                      <div className="text-center py-6 text-xs font-semibold text-slate-500">
                        🎉 Splendid! No pending registrations in queue.
                      </div>
                    ) : (
                      adminUsers.filter(u => u.status === 'pending').map((pUser) => (
                        <div key={pUser.email} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
                          <div>
                            <p className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{pUser.name}</p>
                            <p className={`text-[10px] font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{pUser.email}</p>
                            <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-950/40 text-cyan-400 border border-cyan-800/20">
                              Class: {pUser.studentClass || "10th"}
                            </span>
                            <span className={`inline-block mt-1 ml-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${pUser.studentType === 'online' ? 'bg-violet-950/40 text-violet-400 border-violet-800/20' : 'bg-amber-950/40 text-amber-400 border-amber-800/20'}`}>
                              {pUser.studentType === 'online' ? 'Online' : 'Offline'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApproveUser(pUser.email)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-black text-[10px] uppercase cursor-pointer hover:bg-emerald-400"
                            >
                              Approve ✅
                            </button>
                            <button
                              onClick={() => handleRejectUser(pUser.email)}
                              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-white font-black text-[10px] uppercase cursor-pointer"
                            >
                              Deny ❌
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Approved users database */}
              <div>
                <div className={`border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                  <button
                    onClick={() => setShowRoster(!showRoster)}
                    className="w-full flex items-center justify-between gap-2 cursor-pointer text-left"
                  >
                    <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase font-mono tracking-widest text-[#22d3ee]">
                      <User className="w-4 h-4 text-cyan-400" /> Active Roster ({adminUsers.filter(u => u.status !== 'pending').length} Students)
                    </h3>
                    <ChevronDown className={`w-4 h-4 shrink-0 text-cyan-400 transition-transform ${showRoster ? 'rotate-180' : ''}`} />
                  </button>
                  <p className={`text-[11px] mt-1 font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Review active devices per user. Clear session caches to unblock students with replacement browsers or tablets.</p>

                  {showRoster && (() => {
                    const CLASS_ORDER = ['X', 'IX', 'VIII', 'XI', 'XII'];
                    const nonAdminUsers = adminUsers.filter(u => u.role !== 'admin');
                    const classesPresent: string[] = Array.from(new Set(nonAdminUsers.map((u: any) => u.studentClass || 'Unspecified')));
                    const orderedClasses = [
                      ...CLASS_ORDER.filter(c => classesPresent.includes(c)),
                      ...classesPresent.filter(c => !CLASS_ORDER.includes(c)),
                    ];
                    const toggleClassGroup = (cls: string) => {
                      setCollapsedRosterClasses(prev => {
                        const next = new Set(prev);
                        if (next.has(cls)) next.delete(cls); else next.add(cls);
                        return next;
                      });
                    };

                    return (
                    <div className="mt-4 space-y-5">
                      {orderedClasses.map((cls) => {
                        const group = nonAdminUsers.filter(u => (u.studentClass || 'Unspecified') === cls);
                        const isCollapsed = collapsedRosterClasses.has(cls);
                        return (
                          <div key={cls}>
                            <button
                              onClick={() => toggleClassGroup(cls)}
                              className={`w-full flex items-center justify-between gap-2 cursor-pointer text-left px-3 py-2 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900'}`}
                            >
                              <span className={`text-xs font-black uppercase tracking-wider font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                                {cls === 'Unspecified' ? 'Unspecified Class' : `Class ${cls}`} ({group.length})
                              </span>
                              <ChevronDown className={`w-3.5 h-3.5 shrink-0 text-cyan-400 transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
                            </button>

                            {!isCollapsed && (
                            <div className="mt-2 overflow-x-auto">
                              <table className={`w-full text-left text-xs divide-y ${isLightMode ? 'divide-slate-200' : 'divide-slate-800'}`}>
                                <thead>
                                  <tr className={`uppercase tracking-wider font-mono text-[10px] pb-2 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                    <th className="py-2 pr-4 font-bold">Student Name</th>
                                    <th className="py-2 px-4 font-bold">Authorized Devices (Max 3)</th>
                                    <th className="py-2 px-4 font-bold">Status</th>
                                    <th className="py-2 pl-4 text-right font-bold">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className={`divide-y font-sans ${isLightMode ? 'divide-slate-200 text-slate-900' : 'divide-slate-800/60 text-slate-100'}`}>
                                  {group.map((item) => (
                                    <tr key={item.email} className={`transition-colors ${isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-950/20'}`}>
                                      <td className="py-3 pr-4">
                                        <p className="font-bold">{item.name}</p>
                                        <p className={`text-[10px] font-mono select-text ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{item.email}</p>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                          {item.phone && (
                                            <span className="text-[10px] text-emerald-400 font-mono select-text">📞 {item.phone}</span>
                                          )}
                                          {item.whatsappNumber && item.whatsappNumber !== item.phone && (
                                            <span className="text-[10px] text-emerald-400 font-mono select-text">💬 {item.whatsappNumber}</span>
                                          )}
                                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-extrabold border ${item.studentType === 'online' ? 'text-violet-400 bg-violet-950/40 border-violet-950/60' : 'text-amber-400 bg-amber-950/40 border-amber-950/60'}`}>
                                            {item.studentType === 'online' ? '💻 Online' : '🏫 Offline'}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="py-3 px-4 font-mono text-[#22d3ee] font-bold">
                                        <div>
                                          <span className={item.devices?.length >= 3 ? "text-yellow-500" : "text-cyan-400"}>
                                            {item.devices?.length || 0} / 3 Devices registered
                                          </span>
                                          {item.devices?.length > 0 && (
                                            <ul className="text-[9px] text-slate-500 mt-1 list-disc pl-3">
                                              {item.devices.map((dev: any, i: number) => (
                                                <li key={i}>{dev.deviceName} ({dev.deviceId})</li>
                                              ))}
                                            </ul>
                                          )}
                                        </div>
                                      </td>
                                      <td className="py-3 px-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                                          item.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                          {item.status}
                                        </span>
                                      </td>
                                      <td className="py-3 pl-4 text-right">
                                        <div className="flex gap-1.5 justify-end">
                                          <button
                                            onClick={() => handleResetDevices(item.email)}
                                            className={`px-2.5 py-1.5 rounded border font-bold text-[10px] uppercase flex items-center gap-1 cursor-pointer ${isLightMode ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 hover:border-slate-400 text-slate-700' : 'bg-slate-950 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300'}`}
                                            title="Clear registered devices count back to 0"
                                          >
                                            <Smartphone className="w-3 h-3 text-cyan-400" />
                                            <span>Reset Devices</span>
                                          </button>
                                          <button
                                            onClick={() => handleRejectUser(item.email)}
                                            className={`px-2 py-1.5 rounded hover:bg-red-500/15 transition cursor-pointer text-[10px] uppercase font-bold ${isLightMode ? 'text-slate-500 hover:text-red-600' : 'text-slate-400 hover:text-red-400'}`}
                                            title="Suspend access"
                                          >
                                            Suspend
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    );
                  })()}
                </div>
              </div>

              {/* Post Homework Assignment */}
              <div>
                <div className={`border rounded-2xl p-5 shadow-lg space-y-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                  <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase font-mono tracking-widest text-amber-400">
                    <Upload className="w-4 h-4 text-amber-400" /> Post Homework Assignment
                  </h3>
                  <p className={`text-[11px] leading-relaxed font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Students see this in their Homework tab and can attach it when they submit completed work.
                  </p>

                  {assignError && (
                    <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{assignError}</div>
                  )}
                  {assignSuccess && (
                    <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">{assignSuccess}</div>
                  )}

                  <form onSubmit={handleAssignHomework} className="space-y-3">
                    <div className="space-y-1">
                      <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Title</label>
                      <input
                        type="text"
                        value={assignTitle}
                        onChange={(e) => setAssignTitle(e.target.value)}
                        placeholder="e.g. Chapter 10: Q1 to Q10"
                        required
                        className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Subject</label>
                        <input
                          type="text"
                          value={assignSubject}
                          onChange={(e) => setAssignSubject(e.target.value)}
                          placeholder="Physics"
                          className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Target Class</label>
                        <select
                          value={assignTargetClass}
                          onChange={(e) => setAssignTargetClass(e.target.value as any)}
                          className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                        >
                          <option value="All">All Classes</option>
                          <option value="8th">Class 8th</option>
                          <option value="9th">Class 9th</option>
                          <option value="10th">Class 10th</option>
                          <option value="12th">Class 12th / Competitions</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Assigned Date</label>
                      <input
                        type="date"
                        value={assignAssignedDate}
                        min={todayDateStr}
                        onChange={(e) => setAssignAssignedDate(e.target.value)}
                        required
                        className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                      />
                      <p className={`text-[10px] font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Deadline: 8:00 PM the next day. Past dates can't be selected.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Instructions (optional)</label>
                      <textarea
                        value={assignDescription}
                        onChange={(e) => setAssignDescription(e.target.value)}
                        rows={2}
                        placeholder="Solve all questions in your notebook and submit clear photos."
                        className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-500 resize-none ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Attach Question Sheet (optional)</label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf"
                        onChange={(e) => setAssignFile(e.target.files?.[0] || null)}
                        className={`w-full text-xs font-semibold file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-black file:uppercase file:cursor-pointer cursor-pointer ${isLightMode ? 'text-slate-600 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200' : 'text-slate-400 file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700'}`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={assignUploading || !assignTitle.trim()}
                      className="w-full py-2 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 cursor-pointer transition disabled:opacity-50"
                    >
                      {assignUploading ? 'Posting...' : 'Post Assignment'}
                    </button>
                  </form>

                  <div className={`divide-y pt-2 border-t max-h-[220px] overflow-y-auto ${isLightMode ? 'divide-slate-200 border-slate-200' : 'divide-slate-800 border-slate-800'}`}>
                    {assignments.length === 0 ? (
                      <p className="text-center py-4 text-xs font-semibold text-slate-500">No assignments posted yet.</p>
                    ) : (
                      assignments.map((a) => (
                        <div key={a.id} className="py-2.5 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className={`text-xs font-bold truncate ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{a.title}</p>
                            <p className="text-[10px] font-mono text-slate-500">{a.targetClass === 'All' ? 'All Classes' : a.targetClass} • {new Date(a.createdAt).toLocaleDateString()}</p>
                            {a.deadline && <p className="text-[10px] font-bold text-amber-400">Deadline: {formatDeadline(a.deadline)}</p>}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {a.fileUrl && (
                              <a href={a.fileUrl} target="_blank" rel="noreferrer" className="p-1 rounded hover:bg-cyan-500/10 text-cyan-400 cursor-pointer" title="View attached file">
                                <Eye className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => handleDeleteAssignment(a.id)}
                              className="p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 cursor-pointer"
                              title="Delete assignment"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Post Announcement / Latest Update */}
              <div>
                <div className={`border rounded-2xl p-5 shadow-lg space-y-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                  <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase font-mono tracking-widest text-amber-400">
                    <Megaphone className="w-4 h-4 text-amber-400" /> Post an Update / Announcement
                  </h3>
                  <p className={`text-[11px] leading-relaxed font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Shows up on every student's home page and Latest Updates page. Use this for the CBSE syllabus, exam dates, or any other notice.
                  </p>

                  {announceError && (
                    <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{announceError}</div>
                  )}
                  {announceSuccess && (
                    <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">{announceSuccess}</div>
                  )}

                  <form onSubmit={handlePostAnnouncement} className="space-y-3">
                    <div className="space-y-1">
                      <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Title</label>
                      <input
                        type="text"
                        value={announceTitle}
                        onChange={(e) => setAnnounceTitle(e.target.value)}
                        placeholder="e.g. CBSE Syllabus 2026-27 -- Class X"
                        required
                        className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Target Class</label>
                      <select
                        value={announceTargetClass}
                        onChange={(e) => setAnnounceTargetClass(e.target.value as any)}
                        className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'}`}
                      >
                        <option value="All">All Classes</option>
                        <option value="8th">Class 8th</option>
                        <option value="9th">Class 9th</option>
                        <option value="10th">Class 10th</option>
                        <option value="12th">Class 12th / Competitions</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Message</label>
                      <textarea
                        value={announceMessage}
                        onChange={(e) => setAnnounceMessage(e.target.value)}
                        rows={4}
                        required
                        placeholder="Write the full announcement or paste the syllabus text here."
                        className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-500 resize-none ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={announceUploading || !announceTitle.trim() || !announceMessage.trim()}
                      className="w-full py-2 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 cursor-pointer transition disabled:opacity-50"
                    >
                      {announceUploading ? 'Posting...' : 'Post Update'}
                    </button>
                  </form>

                  <div className={`divide-y pt-2 border-t max-h-[220px] overflow-y-auto ${isLightMode ? 'divide-slate-200 border-slate-200' : 'divide-slate-800 border-slate-800'}`}>
                    {announcements.length === 0 ? (
                      <p className="text-center py-4 text-xs font-semibold text-slate-500">No updates posted yet.</p>
                    ) : (
                      announcements.map((a) => (
                        <div key={a.id} className="py-2.5 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className={`text-xs font-bold truncate ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{a.title}</p>
                            <p className="text-[10px] font-mono text-slate-500">{a.targetClass === 'All' ? 'All Classes' : a.targetClass} • {new Date(a.createdAt).toLocaleDateString()}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteAnnouncement(a.id)}
                            className="p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 cursor-pointer shrink-0"
                            title="Delete announcement"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Create Invite Code Form */}
              <div>
                <div className={`border rounded-2xl p-5 shadow-lg space-y-4 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                  <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase font-mono tracking-widest text-[#22d3ee]">
                    <Plus className="w-4 h-4 text-cyan-400" /> Generate Shareable Access Key
                  </h3>
                  <p className={`text-[11px] leading-relaxed font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Instantly provision a pre-approved Invite Code for your students. You can share this via WhatsApp/Instagram for auto-approvals.
                  </p>

                  <form onSubmit={handleCreateInviteCode} className="space-y-3">
                    <div className="space-y-1">
                      <label className={`text-[9px] font-black uppercase tracking-wider block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Student Name / Note</label>
                      <input
                        type="text"
                        value={newStudentName}
                        onChange={(e) => setNewStudentName(e.target.value)}
                        placeholder="e.g. Aditya Class 12 CBSE"
                        required
                        className={`w-full border rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-cyan-500 ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'}`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#22d3ee] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-400 cursor-pointer transition"
                    >
                      Create Code
                    </button>
                  </form>
                </div>
              </div>

              {/* Invite list database */}
              <div>
                <div className={`border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                  <h3 className="text-sm font-black tracking-tight uppercase font-mono tracking-widest text-amber-400 flex items-center gap-1">
                    <Key className="w-4 h-4 text-amber-400" /> Shareable Invite Keys ({adminInvites.length})
                  </h3>
                  <p className={`text-[11px] mt-1 pb-3 border-b font-semibold font-mono ${isLightMode ? 'text-slate-500 border-slate-200' : 'text-slate-400 border-slate-800'}`}>Copy / Share Codes instantly</p>

                  <div className={`divide-y mt-3 max-h-[300px] overflow-y-auto space-y-2 ${isLightMode ? 'divide-slate-200' : 'divide-slate-800'}`}>
                    {adminInvites.length === 0 ? (
                      <p className="text-center py-4 text-slate-500 text-xs font-semibold">No active access invite keys found.</p>
                    ) : (
                      adminInvites.map((invite) => {
                        const messageText = `Hey ${invite.createdBy}! Create your account on Ray-Optica, verify with your Email and Phone OTPs, and submit. I will instantly approve your request from my desk! Enjoy studying! - Rohit`;
                        const isCopied = copiedCodeCode === invite.code;

                        return (
                          <div key={invite.code} className="py-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className={`font-mono text-cyan-400 font-extrabold block text-sm select-all px-2.5 py-1 rounded border ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/60 border-slate-800'}`}>{invite.code}</span>
                                <span className={`text-[10px] font-bold block mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>For: {invite.createdBy}</span>
                              </div>
                              <button
                                onClick={() => handleDeleteInviteCode(invite.code)}
                                className="p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 cursor-pointer transition duration-150"
                                title="Delete/expire key"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex gap-1.5">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(invite.code);
                                  setCopiedCodeCode(invite.code);
                                  setTimeout(() => setCopiedCodeCode(null), 2000);
                                }}
                                className={`flex-1 py-1 px-2 text-[9px] font-bold text-[#22d3ee] rounded border flex items-center justify-center gap-1 cursor-pointer transition ${isLightMode ? 'bg-cyan-50 hover:bg-cyan-100 border-slate-200' : 'bg-[#111c34] hover:bg-slate-800 border-slate-800'}`}
                              >
                                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{isCopied ? 'Copied' : 'Copy Key'}</span>
                              </button>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(messageText);
                                  alert('Copying prepared WhatsApp text into clipboard! You can paste it directly now on WhatsApp.');
                                }}
                                className={`flex-1 py-1 px-2 text-[9px] font-bold rounded border flex items-center justify-center gap-1 cursor-pointer transition font-sans ${isLightMode ? 'bg-emerald-50 hover:bg-emerald-100 border-slate-200 text-emerald-700' : 'bg-[#162724] hover:bg-emerald-950 text-emerald-400 border-slate-800'}`}
                              >
                                <Share2 className="w-3 h-3 md:inline" />
                                <span>WhatsApp Msg</span>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Homework Submissions */}
            <div className={`border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase font-mono tracking-widest text-[#22d3ee]">
                    <FileText className="w-4 h-4 text-cyan-400" /> Homework Submissions ({adminHomework.length})
                  </h3>
                  <p className={`text-[11px] mt-1 font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Homework uploaded by students. Checked automatically every 30 minutes.</p>
                </div>
                <button
                  onClick={handleCheckHomeworkNow}
                  disabled={checkNowLoading}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 cursor-pointer transition disabled:opacity-50 shrink-0"
                >
                  {checkNowLoading ? 'Checking...' : 'Check Pending Now'}
                </button>
              </div>
              {checkNowResult && (
                <p className={`text-[11px] mt-2 font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{checkNowResult}</p>
              )}

              <div className="mt-4 overflow-x-auto">
                <table className={`w-full text-left text-xs divide-y ${isLightMode ? 'divide-slate-200' : 'divide-slate-800'}`}>
                  <thead>
                    <tr className={`uppercase tracking-wider font-mono text-[10px] pb-2 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      <th className="py-2 pr-4 font-bold">Student</th>
                      <th className="py-2 px-4 font-bold">Assignment / Subject</th>
                      <th className="py-2 px-4 font-bold">Submitted</th>
                      <th className="py-2 px-4 font-bold">Status</th>
                      <th className="py-2 px-4 font-bold">Remarks</th>
                      <th className="py-2 pl-4 text-right font-bold">File</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y font-sans ${isLightMode ? 'divide-slate-200 text-slate-900' : 'divide-slate-800/60 text-slate-100'}`}>
                    {adminHomework.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-xs font-semibold text-slate-500">No homework submitted yet.</td>
                      </tr>
                    ) : (
                      adminHomework.map((sub) => (
                        <tr key={sub.id} className={`transition-colors ${isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-950/20'}`}>
                          <td className="py-3 pr-4">
                            <p className="font-bold">{sub.studentName}</p>
                            <p className={`text-[10px] font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{sub.studentEmail}</p>
                          </td>
                          <td className="py-3 px-4">
                            {sub.assignmentTitle && <p className="font-bold text-amber-400">{sub.assignmentTitle}</p>}
                            <p className={sub.assignmentTitle ? `text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-400'}` : ''}>{sub.subject || (sub.assignmentTitle ? '' : '—')}</p>
                          </td>
                          <td className={`py-3 px-4 font-mono text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            {new Date(sub.submittedAt).toLocaleString()}
                            {sub.isLate && <span className="ml-1.5 px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">Late</span>}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                              sub.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 max-w-[240px]">
                            {sub.aiFeedback ? (
                              <>
                                {sub.aiScore != null && <span className="font-black text-emerald-400 mr-1.5">{sub.aiScore}/10</span>}
                                <span className={isLightMode ? 'text-slate-600' : 'text-slate-400'}>{sub.aiFeedback}</span>
                              </>
                            ) : (
                              <span className="text-slate-500 italic">Not checked yet</span>
                            )}
                            {sub.integrityFlag && (
                              <div className="mt-1.5 flex items-start gap-1 px-2 py-1 rounded bg-red-500/10 border border-red-500/20">
                                <AlertTriangle className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                                <span className="text-red-400 font-semibold">{sub.integrityFlag}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3 pl-4 text-right">
                            {sub.fileUrl && (
                              <a href={sub.fileUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 font-bold text-[10px] uppercase inline-flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5" /> View
                              </a>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Missing Homework Report */}
            <div className={`border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase font-mono tracking-widest text-red-400">
                <AlertTriangle className="w-4 h-4 text-red-400" /> Missing Homework
              </h3>
              <p className={`text-[11px] mt-1 font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Date-wise list of students who haven't submitted each assignment.</p>

              <div className={`mt-4 divide-y max-h-[420px] overflow-y-auto ${isLightMode ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                {missingReportLoading ? (
                  <p className="text-center py-4 text-xs font-semibold text-slate-500">Loading report...</p>
                ) : missingReport.length === 0 ? (
                  <p className="text-center py-4 text-xs font-semibold text-slate-500">No assignments to report on yet.</p>
                ) : (
                  missingReport.map((r) => (
                    <div key={r.id} className="py-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{r.title}</p>
                        <span className={`text-[10px] font-mono shrink-0 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {r.assignedDate} • {r.targetClass === 'All' ? 'All Classes' : r.targetClass}
                        </span>
                      </div>
                      <p className={`text-[10px] font-mono mt-0.5 ${r.missing.length > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {r.submittedCount}/{r.rosterCount} submitted
                      </p>
                      {r.missing.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {r.missing.map((m: any) => (
                            <span key={m.email} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isLightMode ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-red-500/10 text-red-300 border border-red-500/20'}`}>
                              {m.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Pending Forum Posts */}
            <div className={`border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
              <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase font-mono tracking-widest text-amber-400">
                <MessageSquare className="w-4 h-4 text-amber-400" /> Pending Forum Posts
              </h3>
              <p className={`text-[11px] mt-1 font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>New threads and replies waiting for your approval before they become visible.</p>

              <div className={`mt-4 divide-y max-h-[420px] overflow-y-auto ${isLightMode ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                {forumPendingLoading ? (
                  <p className="text-center py-4 text-xs font-semibold text-slate-500">Loading...</p>
                ) : forumPendingThreads.length === 0 && forumPendingReplies.length === 0 ? (
                  <p className="text-center py-4 text-xs font-semibold text-slate-500">Nothing pending -- all caught up.</p>
                ) : (
                  <>
                    {forumPendingThreads.map((t) => (
                      <div key={t.id} className="py-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className={`text-xs font-black uppercase tracking-wider text-cyan-400 mb-0.5`}>New Thread</p>
                            <p className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>{t.title}</p>
                            <p className={`text-[10px] font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>{t.authorName} • {new Date(t.createdAt).toLocaleString()}</p>
                            <p className={`text-xs mt-1 whitespace-pre-wrap ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{t.body}</p>
                            {t.imageUrl && <img src={t.imageUrl} alt="Attached" className="mt-1.5 rounded-lg max-h-40 border border-slate-800" />}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button onClick={() => handleApproveForumThread(t.id)} className="p-1.5 rounded hover:bg-emerald-500/10 text-slate-500 hover:text-emerald-400 cursor-pointer" title="Approve">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteForumThread(t.id)} className="p-1.5 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 cursor-pointer" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {forumPendingReplies.map((r) => (
                      <div key={r.id} className="py-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className={`text-xs font-black uppercase tracking-wider text-cyan-400 mb-0.5`}>Reply {r.threadTitle ? `to "${r.threadTitle}"` : ''}</p>
                            <p className={`text-[10px] font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>{r.authorName} • {new Date(r.createdAt).toLocaleString()}</p>
                            <p className={`text-xs mt-1 whitespace-pre-wrap ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{r.body}</p>
                            {r.imageUrl && <img src={r.imageUrl} alt="Attached" className="mt-1.5 rounded-lg max-h-40 border border-slate-800" />}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button onClick={() => handleApproveForumReply(r.id)} className="p-1.5 rounded hover:bg-emerald-500/10 text-slate-500 hover:text-emerald-400 cursor-pointer" title="Approve">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteForumReply(r.id)} className="p-1.5 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 cursor-pointer" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {activeView === 'chemSim' && (
        <ReactionSimulator isLightMode={isLightMode} />
      )}

      {activeView === 'kyc' && (
        <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin animate-in fade-in duration-305 transition-colors duration-300 ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
          <KnowYourChemicals isLightMode={isLightMode} />
        </div>
      )}

      {activeView === 'about' && (
        <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin animate-in fade-in duration-300 transition-colors duration-300 ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
          <div className="max-w-4xl mx-auto">
            <AboutUs isLightMode={isLightMode} />
          </div>
        </div>
      )}

      {activeView === 'competitive' && (
        <div className={`flex-1 overflow-y-auto px-4 py-8 scrollbar-thin transition-colors duration-300 ${isLightMode ? 'bg-slate-50' : 'bg-[#060b14]'}`}>
          <div className="max-w-6xl mx-auto space-y-6">
            <CompetitiveOptics 
              isLightMode={isLightMode}
              onCompleteNotes={() => changeView('assessment')} 
              onGoToSelfAssessment={() => changeView('assessment')} 
            />
          </div>
        </div>
      )}

      {activeView === 'simulator' && (
        <div 
          id="simulator-container" 
          className={`flex-1 flex flex-col lg:overflow-hidden overflow-y-auto lg:h-screen transition-colors duration-300 ${
            isLightMode ? 'bg-slate-50 text-slate-800' : 'bg-[#060b14] text-slate-100'
          }`}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            #simulator-container {
              background-color: ${isLightMode ? '#f8fafc' : '#060b14'} !important;
            }
            #simulator-container .bg-\\[\\#060b14\\] {
              background-color: ${isLightMode ? '#f8fafc' : '#060b14'} !important;
            }
            #simulator-container .bg-\\[\\#0d1424\\],
            #simulator-container .bg-\\[\\#0c1322\\],
            #simulator-container .bg-\\[\\#0c1324\\] {
              background-color: ${isLightMode ? '#ffffff' : '#0d1424'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #simulator-container .bg-\\[\\#0e1628\\],
            #simulator-container .bg-\\[\\#111c34\\] {
              background-color: ${isLightMode ? '#f1f5f9' : '#0e1628'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #simulator-container .bg-slate-950,
            #simulator-container .bg-slate-950\\/85 {
              background-color: ${isLightMode ? '#f1f5f9' : '#020617'} !important;
              border-color: ${isLightMode ? '#e2e8f0' : '#1e293b'} !important;
            }
            #simulator-container .bg-\\[\\#182235\\],
            #simulator-container .bg-\\[\\#1b2536\\],
            #simulator-container .bg-slate-900 {
              background-color: ${isLightMode ? '#ffffff' : '#0f172a'} !important;
              color: ${isLightMode ? '#1e293b' : '#cbd5e1'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #simulator-container .bg-slate-900\\/50 {
              background-color: ${isLightMode ? '#ffffff' : 'rgba(15, 23, 42, 0.5)'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #simulator-container .bg-slate-950\\/60 {
              background-color: ${isLightMode ? '#f8fafc' : 'rgba(2, 6, 23, 0.6)'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #simulator-container .bg-\\[\\#0b1220\\] {
              background-color: ${isLightMode ? '#f8fafc' : '#0b1220'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #simulator-container .bg-\\[\\#111c2f\\] {
              background-color: ${isLightMode ? '#f1f5f9' : '#111c2f'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #simulator-container .bg-slate-950\\/40 {
              background-color: ${isLightMode ? '#ffffff' : 'rgba(2, 6, 23, 0.4)'} !important;
              border-color: ${isLightMode ? '#cbd5e1' : '#0f172a'} !important;
            }
            #simulator-container .bg-\\[\\#101b33\\]\\/60 {
              background-color: ${isLightMode ? '#ecfeff' : 'rgba(16, 27, 51, 0.6)'} !important;
              border-color: ${isLightMode ? '#cffafe' : '#1e1b4b'} !important;
            }
            #simulator-container .bg-\\[\\#0d1527\\]\\/90 {
              background-color: ${isLightMode ? '#ffffff' : 'rgba(13, 21, 39, 0.9)'} !important;
            }
            #simulator-container .text-slate-305,
            #simulator-container .text-slate-300,
            #simulator-container .text-slate-400,
            #simulator-container .text-slate-405,
            #simulator-container .text-slate-450,
            #simulator-container .text-slate-500 {
              color: ${isLightMode ? '#334155' : '#94a3b8'} !important;
            }
            #simulator-container .text-slate-100,
            #simulator-container .text-slate-200 {
              color: ${isLightMode ? '#0f172a' : '#f1f5f9'} !important;
            }
            #simulator-container .border-slate-800,
            #simulator-container .border-slate-800\\/80,
            #simulator-container .border-slate-850,
            #simulator-container .border-slate-705,
            #simulator-container .border-slate-700\\/80 {
              border-color: ${isLightMode ? '#cbd5e1' : '#1e293b'} !important;
            }
            #simulator-container h1,
            #simulator-container h2,
            #simulator-container h3,
            #simulator-container h4,
            #simulator-container h5,
            #simulator-container h6 {
              color: ${isLightMode ? '#0f172a' : '#ffffff'} !important;
            }
            #simulator-container input[type="range"] {
              background-color: ${isLightMode ? '#e2e8f0' : '#0f172a'} !important;
            }
            #simulator-container .bg-slate-800 {
              background-color: ${isLightMode ? '#ecfeff' : '#1e293b'} !important;
              color: ${isLightMode ? '#0891b2' : '#ffffff'} !important;
            }
            #simulator-container .text-cyan-400 {
              color: ${isLightMode ? '#0891b2' : '#22d3ee'} !important;
            }
            #simulator-container .text-yellow-400,
            #simulator-container .text-yellow-405,
            #simulator-container .text-yellow-500 {
              color: ${isLightMode ? '#b45309' : '#fbbf24'} !important;
            }
            #simulator-container .text-emerald-400 {
              color: ${isLightMode ? '#047857' : '#34d399'} !important;
            }
            #simulator-container .text-purple-400 {
              color: ${isLightMode ? '#6d28d9' : '#c084fc'} !important;
            }
            #simulator-container .text-orange-400 {
              color: ${isLightMode ? '#c2410c' : '#fb923c'} !important;
            }
            #simulator-container .bg-cyan-950 {
              background-color: ${isLightMode ? '#ecfeff' : '#083344'} !important;
              color: ${isLightMode ? '#0891b2' : '#22d3ee'} !important;
            }
            #simulator-container .text-\\[\\#38bdf8\\] {
              color: ${isLightMode ? '#0369a1' : '#38bdf8'} !important;
            }
            #simulator-container .bg-slate-950 p.italic {
              color: ${isLightMode ? '#475569' : '#94a3b8'} !important;
            }
          ` }} />
          {/* ── Sleek, Tight Top Header Bar ── */}
          <div className="shrink-0 bg-[#0d1424] border-b border-slate-800 px-4 py-2.5 flex flex-col gap-2.5 select-none">
            {/* Row 1: Choose Lens or Mirror */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider">Category Select:</span>
                <div className={`flex rounded-lg p-0.5 border shrink-0 shadow-lg text-[11px] ${isLightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-700'}`}>
                  {(['mirror', 'lens'] as const).map(g => (
                    <button key={g} onClick={() => switchGroup(g)}
                      className={`px-3.5 py-1 text-xs font-bold transition-all rounded-md cursor-pointer ${
                        group === g
                          ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 shadow-md font-black'
                          : isLightMode ? 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-white' : 'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
                      }`}>
                      {g === 'mirror' ? 'Mirrors' : 'Lenses'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Landscape Button on the right of Row 1 */}
              <button
                onClick={() => {
                  setIsLandscapeModeActive(true);
                  if (window.innerHeight > window.innerWidth) {
                    setIsRotated(true);
                  } else {
                    setIsRotated(false);
                  }
                }}
                className="hidden md:hidden max-md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 hover:from-emerald-500/30 hover:to-teal-500/30 hover:border-emerald-500/50 transition duration-150 shadow-md select-none cursor-pointer"
                title="Optimize layout for mobile/landscape viewing"
              >
                <Compass className="w-3.5 h-3.5 shrink-0 animate-pulse text-emerald-400" />
                <span>📱 Landscape Mode</span>
              </button>
            </div>

            {/* Row 2: Choose specific type of mirror or lens */}
            <div className="flex items-center gap-1.5 select-none border-t border-slate-800/60 pt-2 w-full overflow-x-auto scrollbar-none">
              <span className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider whitespace-nowrap">Device Subtype:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {TYPES.filter(t => t.group === group).map(t => (
                  <button key={t.id} onClick={() => switchType(t.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-black border transition-all cursor-pointer whitespace-nowrap shadow-sm ${
                      opticsType === t.id
                        ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 border-cyan-300 shadow-md shadow-cyan-500/20'
                        : (isLightMode ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-900' : 'bg-[#182235] text-slate-300 border-slate-700/80 hover:bg-[#202d46] hover:border-slate-500 hover:text-white')
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Main Responsive Workspace: Canvas + Unified Controls Sidebar / Bottom Sheet ── */}
          <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden bg-[#060b14]">
            
            {/* Interactive Canvas Centerpiece */}
            <div className="w-full h-[52vh] min-h-[320px] xs:min-h-[380px] lg:h-full lg:flex-1 relative bg-[#060b14] border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col overflow-hidden shrink-0">
              {/* Solid horizontal ray selection options bar above the canvas rendering area */}
              <div className="shrink-0 bg-[#0c1322] border-b border-slate-800/80 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none z-10 w-full animate-fade-in shadow-lg">
                <div className="flex flex-col xs:flex-row xs:items-center gap-2">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] uppercase font-black text-cyan-400 tracking-wider font-mono">Traced Rays:</span>
                    <span className="text-[9px] text-slate-500 font-bold hidden sm:inline">(Select to Trace)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[1, 2, 3, 4].map(n => {
                      const info = getRayLabel(n);
                      if (!info) return null;
                      const on = activeRays.has(n as any);
                      return (
                        <button
                          key={n}
                          onClick={() => toggleRay(n as any)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black border transition duration-150 cursor-pointer select-none shadow-sm ${
                            on
                              ? (isLightMode 
                                  ? 'bg-cyan-50 text-cyan-900 border-cyan-400 font-extrabold shadow-sm' 
                                  : 'bg-[#182235] text-white font-extrabold border-cyan-500/50 shadow-md shadow-cyan-500/5')
                              : (isLightMode 
                                  ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900' 
                                  : 'bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600 hover:text-white hover:border-slate-400 font-extrabold')
                          }`}
                          style={on ? { borderColor: info.color } : {}}
                          title={info.desc}
                        >
                          <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-md border border-slate-950/20" style={{ backgroundColor: on ? info.color : (isLightMode ? '#94a3b8' : '#64748b') }} />
                          <span>{info.short}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setActiveRays(new Set([1, 2, 3, 4]))}
                  className="text-[10px] font-black bg-[#1b2536] border border-slate-705 hover:border-slate-500 text-cyan-400 hover:text-cyan-300 px-3 py-1 rounded-lg cursor-pointer leading-tight transition-all active:scale-95 shadow self-start sm:self-auto shrink-0"
                >
                  Select All Rays
                </button>
              </div>

              <OpticsCanvas
                config={config}
                result={result}
                activeRays={activeRays}
                aperture={aperture}
                hideObject={hideObject}
                objectType={objectType}
                ray1Angle={ray1Angle}
                ray2Angle={ray2Angle}
                ray3Angle={ray3Angle}
                ray4Angle={ray4Angle}
                onObjectDistChange={u => {
                  if (u === 9999) {
                    setObjectDist(9999);
                    setHideObject(true);
                  } else {
                    setObjectDist(u);
                    setHideObject(false);
                  }
                }}
                onObjectHeightChange={setObjectHeight}
                isLightMode={isLightMode}
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-slate-800/80 text-[10px] sm:text-xs font-semibold text-slate-400 pointer-events-none select-none whitespace-nowrap shadow-md">
                {hideObject
                  ? (objectType === 'point' ? 'Point source S at infinity (∞) — 5 parallel rays' : 'Object at infinity — 5 parallel rays')
                  : (objectType === 'point' ? '💡 Point source S is interactive — drag to move' : '💡 Yellow object O is interactive — drag to move/resize')}
              </div>
            </div>

            {/* Bottom Panel (Mobile) or Sidebar (Desktop): Unified Tabbed Layout */}
            <div className="w-full lg:w-[400px] h-auto lg:h-full shrink-0 bg-[#0e1628] flex flex-col border-t lg:border-t-0 lg:border-l border-slate-800 lg:overflow-hidden">
              
              {/* Tab Selector Header */}
              <div className="shrink-0 flex border-b border-slate-850 bg-[#111c34] p-1 gap-1 select-none">
                <button
                  onClick={() => setSimTab('controls')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    simTab === 'controls'
                      ? 'bg-slate-900 border border-slate-800 text-cyan-400 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Adjust Sliders</span>
                </button>
                
                <button
                  onClick={() => setSimTab('cases')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    simTab === 'cases'
                      ? 'bg-slate-900 border border-slate-800 text-cyan-400 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <List className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Quick Cases</span>
                </button>

                <button
                  onClick={() => setSimTab('analysis')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    simTab === 'analysis'
                      ? 'bg-slate-900 border border-slate-800 text-cyan-400 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Calculations</span>
                </button>
              </div>

              {/* Scrollable Tab Content Container */}
              <div className="p-4 space-y-4 lg:flex-1 lg:overflow-y-auto lg:scrollbar-thin">
                
                {/* ── TAB 1: ADJUST CONTROLS ── */}
                {simTab === 'controls' && (
                  <div className="space-y-4">
                    {/* Source Shape Switcher */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block font-mono">Object Source Type</span>
                      <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
                        <button
                          onClick={() => setObjectType('arrow')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            objectType === 'arrow'
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md'
                              : (isLightMode ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-slate-205')
                          }`}
                        >
                          Arrow Object
                        </button>
                        <button
                          onClick={() => setObjectType('point')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            objectType === 'point'
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md'
                              : (isLightMode ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-slate-205')
                          }`}
                        >
                          Point Source
                        </button>
                      </div>
                    </div>

                    {/* Geometry Parameters Option Cards */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 space-y-3.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Optical Geometry</span>
                      
                      {/* Focal Length Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-300">Focal Length (f)</span>
                          <span className="text-cyan-400 font-extrabold">{focalLength} cm</span>
                        </div>
                        <input type="range" min={20} max={200} step={5} value={focalLength}
                          onChange={e => setFocalLength(Number(e.target.value))}
                          className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg" />
                      </div>

                      {/* Aperture Size */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-300">Aperture Size</span>
                          <span className="text-emerald-400 font-extrabold">{aperture} cm</span>
                        </div>
                        <input type="range" min={50} max={220} step={10} value={aperture}
                          onChange={e => setAperture(Number(e.target.value))}
                          className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg" />
                      </div>
                    </div>

                    {/* Object Spatial Parameters */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 space-y-3.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Object Properties</span>
                      
                      {/* Object Distance */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-300">Object Distance (u)</span>
                          <span className="text-yellow-405 font-extrabold">{hideObject ? '∞ (Infinity)' : `${objectDist} cm`}</span>
                        </div>
                        <input type="range" min={20} max={400} step={5} value={hideObject ? 400 : objectDist}
                          onChange={e => { setObjectDist(Number(e.target.value)); setHideObject(false); }}
                          className="w-full accent-yellow-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg" />
                      </div>

                      {/* Object Height */}
                      {objectType === 'arrow' ? (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-300">Object Height (h)</span>
                            <span className="text-yellow-500 font-extrabold">{objectHeight} cm</span>
                          </div>
                          <input type="range" min={10} max={180} step={5} value={objectHeight}
                            onChange={e => setObjectHeight(Number(e.target.value))}
                            className="w-full accent-yellow-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg" />
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                          Point sources sit on the central principal axis with 0 cm height.
                        </div>
                      )}
                    </div>

                    {/* Custom Ray Angles Control - Displays only when relevant custom/oblique ray types are active */}
                    {((objectType === 'point') || 
                      (group === 'lens' && objectType === 'arrow' && activeRays.has(4)) || 
                      (opticsType === 'plane-mirror' && objectType === 'arrow' && activeRays.has(3))) && (
                      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 space-y-3.5 shadow-inner">
                        <span className="text-[10px] uppercase font-black text-cyan-400 tracking-wider font-mono block">Custom Ray Angles</span>
                        
                        {/* Point source angles */}
                        {objectType === 'point' && (
                          <div className="space-y-3 font-sans">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] font-semibold">
                                <span className="text-purple-400">Ray 1 Angle</span>
                                <span className="font-mono text-purple-300">{ray1Angle}°</span>
                              </div>
                              <input type="range" min={-60} max={60} step={1} value={ray1Angle}
                                onChange={e => setRay1Angle(Number(e.target.value))}
                                className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg animate-fade-in" />
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] font-semibold">
                                <span className="text-orange-400">Ray 2 Angle</span>
                                <span className="font-mono text-orange-300">{ray2Angle}°</span>
                              </div>
                              <input type="range" min={-60} max={60} step={1} value={ray2Angle}
                                onChange={e => setRay2Angle(Number(e.target.value))}
                                className="w-full accent-[#fb923c] cursor-pointer h-1.5 bg-slate-950 rounded-lg animate-fade-in" />
                            </div>
                          </div>
                        )}

                        {/* Oblique Ray 4 (Lens) */}
                        {group === 'lens' && objectType === 'arrow' && activeRays.has(4) && (
                          <div className="space-y-1 font-sans">
                            <div className="flex justify-between text-[11px] font-semibold">
                              <span className="text-purple-400">Oblique Ray 4 Angle:</span>
                              <span className="font-mono text-purple-300">{ray4Angle}°</span>
                            </div>
                            <input type="range" min={-50} max={50} step={1} value={ray4Angle}
                              onChange={e => setRay4Angle(Number(e.target.value))}
                              className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg animate-fade-in" />
                          </div>
                        )}

                        {/* Plane Mirror Custom Ray 3 */}
                        {opticsType === 'plane-mirror' && objectType === 'arrow' && activeRays.has(3) && (
                          <div className="space-y-1 font-sans">
                            <div className="flex justify-between text-[11px] font-semibold">
                              <span className="text-yellow-400">Custom Ray 3 Angle:</span>
                              <span className="font-mono text-yellow-300">{ray3Angle}°</span>
                            </div>
                            <input type="range" min={-60} max={60} step={1} value={ray3Angle}
                              onChange={e => setRay3Angle(Number(e.target.value))}
                              className="w-full accent-yellow-450 cursor-pointer h-1.5 bg-slate-950 rounded-lg animate-fade-in" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ── TAB 2: QUICK CASE PRESETS ── */}
                {simTab === 'cases' && (
                  <div className="space-y-4">
                    <div className="bg-[#111c34] p-3.5 rounded-xl border border-slate-850">
                      <h4 className="text-xs font-black text-cyan-400 tracking-tight flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Quick Case Presets
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-1.5 font-semibold">
                        Select a standard board case preset. Observe how construction light traces intersect to locate the theoretical position described in textbooks.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {cases && cases.map(c => {
                        const isSelected = (objectDist === c.u || (c.u === 9999 && hideObject)) && focalLength === c.f;
                        return (
                          <button
                            key={c.label}
                            onClick={() => applyCase(c)}
                            className={`flex flex-col p-3 rounded-xl border text-left transition duration-150 cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-cyan-950 to-teal-950 border-cyan-500 shadow-md shadow-cyan-500/10'
                                : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-900/80 hover:text-white'
                            }`}
                          >
                            <div className="flex justify-between items-center w-full">
                              <span className={`text-xs font-black ${isSelected ? 'text-cyan-400' : 'text-slate-200'}`}>
                                {c.label}
                              </span>
                              <span className="text-[10px] font-mono font-bold bg-[#060b14] px-1.5 py-0.5 border border-slate-800 rounded text-slate-400">
                                {c.u === 9999 ? 'u = -∞' : `u = -${c.u} cm`}
                              </span>
                            </div>
                            
                            {/* Mini outcome properties shown when active */}
                            {isSelected && (
                              <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1 font-sans font-semibold">
                                {activeRays.size >= 2 ? (
                                  <>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Position (v):</span>
                                      <span className="text-cyan-300 font-black">{result.atInfinity ? 'At Infinity (∞)' : `v = ${result.vStr} cm`}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Nature:</span>
                                      <span className="text-cyan-300 font-black">{result.atInfinity ? 'Real, Inverted' : result.isReal ? 'Real & Inverted' : 'Virtual & Erect'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Size:</span>
                                      <span className="text-cyan-300 font-black">{result.sizeDesc}</span>
                                    </div>
                                  </>
                                ) : (
                                  <p className="text-amber-500 italic font-bold">⚠️ Click 'Select All' in Sliders tab to trace image</p>
                                )}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── TAB 3: ANALYSIS CALCULATIONS ── */}
                {simTab === 'analysis' && (
                  <div className="h-full flex flex-col">
                    <AnalysisDashboard
                      opticsType={opticsType}
                      focalLength={focalLength}
                      objectDist={objectDist}
                      objectHeight={objectHeight}
                      result={result}
                      activeRays={activeRays}
                      objectType={objectType}
                      isLightMode={isLightMode}
                    />
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── IMMERSIVE LANDSCAPE OPTICS SIMULATOR VIEW (MOBILE INTEGRATED) ── */}
      {isLandscapeModeActive && (
        <div
          className={`fixed z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#060b14] text-slate-100'}`}
          style={isRotated ? {
            top: 0,
            left: 0,
            width: '100vh',
            height: '100vw',
            transform: 'rotate(90deg) translateY(-100%)',
            transformOrigin: 'top left',
          } : {
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
        >
          {/* Header Bar of the Landscape simulator */}
          <div className={`shrink-0 h-12 border-b flex items-center justify-between px-4 select-none ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0d1424] border-slate-800'}`}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className={`text-sm font-black tracking-tight flex items-center gap-1.5 ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                <span>Ray Optica</span>
                <span className={`text-cyan-400 font-mono text-[10px] border px-2.5 py-0.5 rounded font-bold uppercase tracking-wider ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>[Landscape View Mode]</span>
              </h2>
            </div>

            {/* Quick Helper orientation text */}
            <span className={`hidden md:inline text-[10px] font-bold font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
              {isRotated ? "💡 Hint: hold phone horizontally with screen rotation lock OFF/ON" : "💡 Fits large wide displays beautifully"}
            </span>

            {/* Controls: Rotate manually & exit */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRotated(!isRotated)}
                className={`px-2.5 py-1 text-[11px] font-extrabold border rounded-lg transition duration-150 cursor-pointer ${isLightMode ? 'bg-slate-100 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900' : 'bg-[#1d293d] border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white'}`}
                title="Rotate layout 90 degrees if screen orientation is locked"
              >
                🔄 {isRotated ? "Rotate 0° (Normal)" : "Rotate 90° (Landscape Lock)"}
              </button>
              
              <button
                onClick={() => setIsLandscapeModeActive(false)}
                className="px-3.5 py-1 text-xs font-black bg-red-650 hover:bg-red-500 text-white rounded-lg border border-red-800 transition active:scale-95 cursor-pointer shadow-lg"
              >
                ✕ Exit Landscape
              </button>
            </div>
          </div>

          {/* Main workspace */}
          <div className="flex-1 min-h-0 flex flex-row">
            {/* Left section: Huge SVG Interactive canvas */}
            <div className={`flex-1 min-w-0 relative h-full border-r flex flex-col ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#060b14] border-slate-800'}`}>
              <OpticsCanvas
                config={config}
                result={result}
                activeRays={activeRays}
                aperture={aperture}
                hideObject={hideObject}
                objectType={objectType}
                ray1Angle={ray1Angle}
                ray2Angle={ray2Angle}
                ray3Angle={ray3Angle}
                ray4Angle={ray3Angle}
                isRotated={isRotated}
                onObjectDistChange={u => {
                  if (u === 9999) {
                    setObjectDist(9999);
                    setHideObject(true);
                  } else {
                    setObjectDist(u);
                    setHideObject(false);
                  }
                }}
                onObjectHeightChange={setObjectHeight}
              />
              <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 px-2 pb-1.5 rounded-full border text-[10px] sm:text-xs font-semibold pointer-events-none select-none whitespace-nowrap shadow-md ${isLightMode ? 'bg-white/90 border-slate-200 text-slate-500' : 'bg-slate-950/80 border-slate-800/80 text-slate-400'}`}>
                {hideObject
                  ? (objectType === 'point' ? 'Point source S at infinity (∞) — 5 parallel rays' : 'Object at infinity — 5 parallel rays')
                  : (objectType === 'point' ? '💡 Point source S is interactive — drag to move' : '💡 Yellow object O is interactive — drag to move/resize')}
              </div>
            </div>

            {/* Right section: Control slide-out column optimized for Landscape list */}
            <div className={`w-[280px] sm:w-[320px] shrink-0 flex flex-col overflow-y-auto border-l scrollbar-thin select-none ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0e1628] border-slate-800'}`}>

              {/* Image Result summary */}
              <div className={`p-3 border-b ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#111c2f] border-slate-800'}`}>
                <span className="text-[9px] uppercase tracking-wider font-bold text-teal-400 block mb-1">Image Outcome Properties</span>
                {activeRays.size >= 2 ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-black uppercase px-2 py-0.5 rounded ${result.isReal && !result.atInfinity ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-purple-550/10 text-purple-400 border border-purple-550/20'}`}>
                        {result.atInfinity ? 'Infinity (∞)' : result.isReal ? 'Real Image' : 'Virtual Image'}
                      </span>
                      <span className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 border rounded ${isLightMode ? 'bg-white border-slate-200 text-cyan-700' : 'bg-[#060b14] border-slate-800 text-cyan-300'}`}>
                        u = -{hideObject ? '∞' : objectDist} cm
                      </span>
                    </div>
                    {!result.atInfinity && (
                      <p className={`text-[11px] font-semibold leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                        Orientation: <b className="text-cyan-300">{result.isInverted ? 'Inverted' : 'Erect'}</b> · Size: <b className="text-cyan-300">{result.sizeDesc}</b> · Mag: <b className="text-cyan-300">{mag}</b>
                        {posNote && <span className={`block text-[10px] mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>{posNote}</span>}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-[11px] text-amber-500 font-bold">⚠️ Need 2+ active rays to trace image</p>
                )}
              </div>

              {/* Slider Settings */}
              <div className={`p-3.5 space-y-3.5 border-b ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={`text-[9px] uppercase tracking-wider font-bold block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Parameters Manual Slider</span>

                {/* Focal length */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className={`text-[11px] font-bold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Focal Length (f)</label>
                    <span className="text-xs text-cyan-400 font-extrabold">{focalLength} cm</span>
                  </div>
                  <input type="range" min={20} max={200} step={5} value={focalLength}
                    onChange={e => setFocalLength(Number(e.target.value))}
                    className={`w-full accent-cyan-400 cursor-pointer h-1.5 rounded-lg ${isLightMode ? 'bg-slate-200' : 'bg-slate-900'}`} />
                </div>

                {/* Object dist */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className={`text-[11px] font-bold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Object Distance (u)</label>
                    <span className="text-xs text-yellow-400 font-extrabold">{hideObject ? '∞' : objectDist} cm</span>
                  </div>
                  <input type="range" min={20} max={400} step={5} value={hideObject ? 400 : objectDist}
                    onChange={e => { setObjectDist(Number(e.target.value)); setHideObject(false); }}
                    className={`w-full accent-yellow-400 cursor-pointer h-1.5 rounded-lg ${isLightMode ? 'bg-slate-200' : 'bg-slate-900'}`} />
                </div>

                {/* Object height */}
                {objectType === 'arrow' && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className={`text-[11px] font-bold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Object Height (h)</label>
                      <span className="text-xs text-yellow-500 font-extrabold">{objectHeight} cm</span>
                    </div>
                    <input type="range" min={10} max={180} step={5} value={objectHeight}
                      onChange={e => setObjectHeight(Number(e.target.value))}
                      className={`w-full accent-yellow-500 cursor-pointer h-1.5 rounded-lg ${isLightMode ? 'bg-slate-200' : 'bg-slate-900'}`} />
                  </div>
                )}

                {/* Aperture */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className={`text-[11px] font-bold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Aperture Size</label>
                    <span className="text-xs text-emerald-400 font-extrabold">{aperture} cm</span>
                  </div>
                  <input type="range" min={50} max={220} step={10} value={aperture}
                    onChange={e => setAperture(Number(e.target.value))}
                    className={`w-full accent-emerald-400 cursor-pointer h-1.5 rounded-lg ${isLightMode ? 'bg-slate-200' : 'bg-slate-900'}`} />
                </div>
              </div>

              {/* Elements & Presets */}
              <div className={`p-3.5 space-y-3 border-b ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={`text-[9px] uppercase tracking-wider font-bold block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Elements Selection</span>

                {/* Group Selector */}
                <div className="flex flex-col gap-1.5">
                  <span className={`text-[10px] font-bold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Category Select:</span>
                  <div className={`flex rounded-lg p-0.5 border shrink-0 text-[11px] font-sans ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                    {(['mirror', 'lens'] as const).map(g => (
                      <button key={g} onClick={() => switchGroup(g)}
                        className={`flex-1 py-1 text-xs font-bold transition-all rounded-md cursor-pointer ${
                          group === g
                            ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 shadow-md font-black'
                            : isLightMode ? 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-white' : 'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
                        }`}>
                        {g === 'mirror' ? 'Mirrors' : 'Lenses'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtype Selector */}
                <div className="flex flex-col gap-1.5">
                  <span className={`text-[10px] font-bold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Device Subtype:</span>
                  <div className="grid grid-cols-2 gap-1.5 font-sans">
                    {TYPES.filter(t => t.group === group).map(t => (
                      <button
                        key={t.id}
                        onClick={() => switchType(t.id)}
                        className={`px-2 py-1 text-[10px] font-black rounded-lg border transition duration-150 truncate cursor-pointer ${
                          opticsType === t.id
                            ? 'bg-gradient-to-r from-cyan-400 to-teal-400 border-cyan-300 text-slate-900 font-black'
                            : isLightMode ? 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`h-px ${isLightMode ? 'bg-slate-200' : 'bg-slate-800'}`} />

                {/* Shape Selection */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold font-sans ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Object Source Style:</span>
                  <div className={`flex gap-1 p-0.5 border rounded-lg ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                    <button
                      onClick={() => setObjectType('arrow')}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md cursor-pointer ${objectType === 'arrow' ? 'bg-[#facc15] text-slate-950 font-black' : isLightMode ? 'text-slate-500' : 'text-slate-400'}`}
                    >
                      Arrow
                    </button>
                    <button
                      onClick={() => setObjectType('point')}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md cursor-pointer ${objectType === 'point' ? 'bg-[#facc15] text-slate-950 font-black' : isLightMode ? 'text-slate-500' : 'text-slate-400'}`}
                    >
                      Point
                    </button>
                  </div>
                </div>
              </div>

              {/* Preset Cases Row */}
              {cases && cases.length > 0 && (
                <div className={`p-3.5 space-y-2 border-b ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                  <span className={`text-[9px] uppercase tracking-wider font-bold block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Quick Case Presets</span>
                  <div className="grid grid-cols-2 gap-1.5 font-sans">
                    {cases.map(c => {
                      const isSelected = (objectDist === c.u || (c.u === 9999 && hideObject)) && focalLength === c.f;
                      return (
                        <button
                          key={c.label}
                          onClick={() => applyCase(c)}
                          className={`px-2 py-1 text-[10px] rounded border transition duration-150 text-left truncate cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-cyan-400 to-teal-400 border-cyan-300 text-slate-900 font-black'
                              : isLightMode ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-bold' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white font-bold'
                          }`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Angles for Ray inputs */}
              {((objectType === 'point') || (group === 'lens' && activeRays.has(4)) || (opticsType === 'plane-mirror' && activeRays.has(3))) && (
                <div className={`p-3.5 space-y-3 border-b ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                  <span className={`text-[9px] uppercase tracking-wider font-bold block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Ancillary Ray Angles</span>
                  
                  {objectType === 'point' && (
                    <div className="space-y-2">
                      <div className="space-y-0.5">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-purple-400 font-bold">Ray 1 angle</span>
                          <span>{ray1Angle}°</span>
                        </div>
                        <input type="range" min={-60} max={60} step={1} value={ray1Angle}
                          onChange={e => setRay1Angle(Number(e.target.value))}
                          className="w-full accent-purple-400 cursor-pointer h-1" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-orange-400 font-bold">Ray 2 angle</span>
                          <span>{ray2Angle}°</span>
                        </div>
                        <input type="range" min={-60} max={60} step={1} value={ray2Angle}
                          onChange={e => setRay2Angle(Number(e.target.value))}
                          className="w-full accent-orange-400 cursor-pointer h-1" />
                      </div>
                    </div>
                  )}

                  {group === 'lens' && objectType === 'arrow' && activeRays.has(4) && (
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-purple-400 font-bold font-sans">Ray 4 Oblique Angle</span>
                        <span>{ray4Angle}°</span>
                      </div>
                      <input type="range" min={-50} max={50} step={1} value={ray4Angle}
                        onChange={e => setRay4Angle(Number(e.target.value))}
                        className="w-full accent-purple-400 cursor-pointer h-1" />
                    </div>
                  )}

                  {opticsType === 'plane-mirror' && objectType === 'arrow' && activeRays.has(3) && (
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-yellow-400 font-bold">Ray 3 Angle</span>
                        <span>{ray3Angle}°</span>
                      </div>
                      <input type="range" min={-60} max={60} step={1} value={ray3Angle}
                        onChange={e => setRay3Angle(Number(e.target.value))}
                        className="w-full accent-yellow-400 cursor-pointer h-1" />
                    </div>
                  )}
                </div>
              )}

              {/* Ray Toggles */}
              <div className="p-3.5 space-y-2">
                <span className={`text-[9px] uppercase tracking-wider font-bold block font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Ray Traces</span>
                <div className="flex flex-col gap-1.5 font-sans">
                  {[1, 2, 3, 4].map(n => {
                    const info = getRayLabel(n);
                    if (!info) return null;
                    const on = activeRays.has(n as any);
                    return (
                      <button
                        key={n}
                        onClick={() => toggleRay(n as any)}
                        className={`flex items-center gap-2 w-full px-2.5 py-1 text-[11px] rounded transition duration-150 border cursor-pointer ${
                          on 
                            ? (isLightMode 
                                ? 'bg-cyan-50 text-cyan-900 border-cyan-400 font-extrabold' 
                                : 'bg-[#182235] border-cyan-500/50 text-white font-extrabold')
                            : (isLightMode 
                                ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold' 
                                : 'bg-slate-700 border-slate-600 text-slate-100 hover:text-white hover:bg-slate-600 hover:border-slate-400 font-extrabold')
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: on ? info.color : '#64748b' }} />
                        <span className="truncate font-bold" title={info.desc}>{info.short}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>

    {/* Standalone clean printable section (only visible during print) */}
    <div className="hidden print:block bg-white text-slate-900 p-8 sm:p-12 font-serif select-text study-notes-container leading-relaxed">
      <div className="max-w-4xl mx-auto">
        {renderGradePdfNotes(
          preparingFor === '8th' || preparingFor === '9th' ? '8th' : preparingFor === '12th' ? '12th' : '10th',
          0,
          () => {},
          0,
          () => {},
          () => {}
        )}
      </div>
    </div>
  </>
);
}
