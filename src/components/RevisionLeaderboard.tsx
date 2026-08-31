import React, { useState, useEffect } from 'react';
import { Trophy, Flame, TrendingUp, Crown, ChevronDown } from 'lucide-react';
import { LeaderboardModal } from './LeaderboardModal';

const VISIBLE_ROWS_COLLAPSED = 5;

export interface LeaderboardRow {
  email: string;
  name: string;
  photoUrl: string | null;
  value: number;
}

interface LeaderboardData {
  classLabel: string;
  mostAttempted: LeaderboardRow[];
  highestPercentage: LeaderboardRow[];
  topImprovers: LeaderboardRow[];
}

interface RevisionLeaderboardProps {
  isLightMode?: boolean;
  token: string;
  currentUserEmail?: string;
  compact?: boolean;
}

const cardClass = (isLightMode: boolean) =>
  `relative overflow-hidden border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`;

// Deterministic, cheerful gradient for a student with no profile photo -- picked from their email
// so the same student always gets the same colors instead of a random one flickering per render.
const AVATAR_GRADIENTS = [
  'from-pink-500 to-rose-500',
  'from-violet-500 to-purple-500',
  'from-cyan-500 to-blue-500',
  'from-amber-400 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-fuchsia-500 to-pink-500',
  'from-sky-500 to-indigo-500',
  'from-lime-500 to-green-500',
];
function gradientFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
}
function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

// Per-rank presentation: gold/silver/bronze podium styling for the top 3, a plain numbered dot
// for 4th/5th -- reserving the flashiest treatment for the ranks students actually chase.
const RANK_STYLE: Record<number, { ring: string; badge: string; glow: string }> = {
  1: { ring: 'ring-2 ring-amber-400', badge: 'bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950', glow: 'shadow-[0_0_16px_rgba(251,191,36,0.35)]' },
  2: { ring: 'ring-2 ring-slate-300', badge: 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-800', glow: '' },
  3: { ring: 'ring-2 ring-orange-400/70', badge: 'bg-gradient-to-br from-orange-300 to-amber-600 text-orange-950', glow: '' },
};

export function Avatar({ row, isLightMode }: { row: LeaderboardRow; isLightMode: boolean }) {
  const [broken, setBroken] = useState(false);
  if (row.photoUrl && !broken) {
    return (
      <img
        src={row.photoUrl}
        alt=""
        onError={() => setBroken(true)}
        className={`w-7 h-7 rounded-full object-cover shrink-0 ${isLightMode ? 'ring-1 ring-slate-200' : 'ring-1 ring-slate-700'}`}
      />
    );
  }
  return (
    <span className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black text-white bg-gradient-to-br ${gradientFor(row.email)}`}>
      {initialsFor(row.name)}
    </span>
  );
}

export function RankBadge({ rank }: { rank: number }) {
  const style = RANK_STYLE[rank];
  if (!style) {
    return <span className="w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-black bg-slate-500/20 text-slate-400">{rank}</span>;
  }
  return (
    <span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-black ${style.badge}`}>
      {rank === 1 ? <Crown className="w-3 h-3" /> : rank}
    </span>
  );
}

// Distinct color identity per category -- makes the three boards instantly tell-apart at a glance
// instead of reading as three copies of the same gray card.
const SECTION_THEME = {
  attempted: {
    icon: Flame,
    iconClass: 'text-orange-400',
    headerGradient: 'from-orange-500/15 to-transparent',
    accentText: 'text-orange-400',
  },
  percentage: {
    icon: Trophy,
    iconClass: 'text-amber-400',
    headerGradient: 'from-amber-400/20 to-transparent',
    accentText: 'text-amber-400',
  },
  improvers: {
    icon: TrendingUp,
    iconClass: 'text-emerald-400',
    headerGradient: 'from-emerald-500/15 to-transparent',
    accentText: 'text-emerald-400',
  },
} as const;

export type SectionKey = keyof typeof SECTION_THEME;

// One category's ranked list (e.g. "Highest Percentage") -- top 5 shown by default with a "More"
// toggle to reveal the full class ranking, since every category can have far more than 5 students
// once the server stopped truncating. Exported so the admin's all-classes view (App.tsx) renders
// the exact same card, with the same expand behavior, instead of a separate hand-rolled list.
function CategoryRows({ rows, format, isLightMode, currentUserEmail, accentText }: { rows: LeaderboardRow[]; format: (v: number) => string; isLightMode: boolean; currentUserEmail?: string; accentText: string }) {
  return (
    <ol className="space-y-1.5">
      {rows.map((row, i) => {
        const rank = i + 1;
        const isMe = row.email === currentUserEmail;
        const rankStyle = RANK_STYLE[rank];
        return (
          <li
            key={row.email}
            className={`flex items-center gap-2 text-xs font-semibold rounded-lg px-1.5 py-1 -mx-1.5 transition-transform hover:scale-[1.02] ${
              isMe
                ? isLightMode ? 'bg-cyan-50 text-cyan-700' : 'bg-cyan-500/10 text-cyan-300'
                : isLightMode ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <RankBadge rank={rank} />
            <span className={`rounded-full ${rankStyle?.glow || ''}`}>
              <Avatar row={row} isLightMode={isLightMode} />
            </span>
            <span className="truncate flex-1">{row.name}{isMe ? ' (You)' : ''}</span>
            <span className={`shrink-0 font-mono ${rank === 1 ? accentText : ''}`}>{format(row.value)}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function CategoryCard({
  sectionKey, title, rows, format, empty, isLightMode, currentUserEmail,
}: {
  sectionKey: SectionKey;
  title: string;
  rows: LeaderboardRow[];
  format: (v: number) => string;
  empty: string;
  isLightMode: boolean;
  currentUserEmail?: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const theme = SECTION_THEME[sectionKey];
  const Icon = theme.icon;
  const visibleRows = rows.slice(0, VISIBLE_ROWS_COLLAPSED);
  return (
    <div className={`p-3 rounded-xl border bg-gradient-to-b ${theme.headerGradient} ${isLightMode ? 'bg-slate-50 border-slate-200' : 'border-slate-800 bg-slate-950'}`}>
      <h4 className={`text-[10px] font-black uppercase tracking-wide mb-2 flex items-center gap-1.5 ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
        <Icon className={`w-3.5 h-3.5 ${theme.iconClass}`} /> {title}
      </h4>
      {rows.length === 0 ? (
        <p className={`text-[11px] font-semibold ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>{empty}</p>
      ) : (
        <>
          <CategoryRows rows={visibleRows} format={format} isLightMode={isLightMode} currentUserEmail={currentUserEmail} accentText={theme.accentText} />
          {rows.length > VISIBLE_ROWS_COLLAPSED && (
            <button
              onClick={() => setShowAll(true)}
              className={`mt-2 flex items-center gap-1 text-[11px] font-black cursor-pointer ${isLightMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}
            >
              More ({rows.length - VISIBLE_ROWS_COLLAPSED}) <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
          {showAll && (
            <LeaderboardModal title={title} onClose={() => setShowAll(false)} isLightMode={isLightMode}>
              <CategoryRows rows={rows} format={format} isLightMode={isLightMode} currentUserEmail={currentUserEmail} accentText={theme.accentText} />
            </LeaderboardModal>
          )}
        </>
      )}
    </div>
  );
}

// Shared by the Revision tab, the student Home dashboard, and (via RevisionLeaderboardAllClasses
// below) the admin panel -- fetches and renders one class's three-category top-5 leaderboard.
// Always fetches on mount; the server resolves which class this is for (or takes classLabel
// directly for the admin's all-classes view), so this component never has to reason about scope.
export function RevisionLeaderboard({ isLightMode = false, token, currentUserEmail, compact = false }: RevisionLeaderboardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LeaderboardData | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch('/api/revision/leaderboard', { headers: { Authorization: `Bearer ${token}` } });
        const json = await resp.json();
        if (!resp.ok) throw new Error(json.error || 'Failed to load the leaderboard.');
        if (!cancelled) setData(json);
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  return (
    <div className={compact ? '' : cardClass(isLightMode)}>
      {!compact && (
        <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${isLightMode ? 'from-amber-100/60' : 'from-amber-500/10'} to-transparent pointer-events-none`} />
      )}
      <h3 className={`relative text-sm font-black uppercase tracking-wide mb-1 flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
        <Trophy className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" /> {data ? `Class ${data.classLabel} Leaderboard` : 'Leaderboard'}
      </h3>
      <p className={`relative text-xs font-semibold mb-3 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Only students in your own class are shown here.</p>
      {loading && (
        <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Loading leaderboard...</p>
      )}
      {error && (
        <p className="text-xs font-bold text-red-400">{error}</p>
      )}
      {data && !loading && (
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
          <CategoryCard sectionKey="attempted" title="Most Tests Attempted" rows={data.mostAttempted} format={(v) => `${v} test${v === 1 ? '' : 's'}`} empty="No attempts yet." isLightMode={isLightMode} currentUserEmail={currentUserEmail} />
          <CategoryCard sectionKey="percentage" title="Highest Percentage (First Attempt)" rows={data.highestPercentage} format={(v) => `${v}%`} empty="No graded papers yet." isLightMode={isLightMode} currentUserEmail={currentUserEmail} />
          <CategoryCard sectionKey="improvers" title="Top Improvers" rows={data.topImprovers} format={(v) => `+${v} marks`} empty="No improvements yet." isLightMode={isLightMode} currentUserEmail={currentUserEmail} />
        </div>
      )}
    </div>
  );
}
