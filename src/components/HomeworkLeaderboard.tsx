import React, { useState, useEffect } from 'react';
import { BookOpenCheck, ChevronDown } from 'lucide-react';
import { Avatar, RankBadge, type LeaderboardRow as AvatarRow } from './RevisionLeaderboard';
import { LeaderboardModal } from './LeaderboardModal';

export interface HomeworkLeaderboardRow {
  email: string;
  name: string;
  photoUrl: string | null;
  attempted: number;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface HomeworkLeaderboardData {
  classLabel: string;
  totalAssignments: number;
  rows: HomeworkLeaderboardRow[];
}

interface HomeworkLeaderboardProps {
  isLightMode?: boolean;
  token: string;
  currentUserEmail?: string;
  compact?: boolean;
  // Admin's all-classes view passes a specific class's already-fetched data directly instead of
  // this component fetching its own (there's no "own class" to fetch server-side for an admin).
  data?: HomeworkLeaderboardData;
}

const cardClass = (isLightMode: boolean) =>
  `relative overflow-hidden border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`;

// Green/amber/red at a glance so a row's standing reads without needing to parse the number.
function percentageColor(pct: number, isLightMode: boolean): string {
  if (pct >= 75) return isLightMode ? 'text-emerald-600' : 'text-emerald-400';
  if (pct >= 50) return isLightMode ? 'text-amber-600' : 'text-amber-400';
  return isLightMode ? 'text-rose-600' : 'text-rose-400';
}
function percentageBarColor(pct: number): string {
  if (pct >= 75) return 'from-emerald-500 to-teal-400';
  if (pct >= 50) return 'from-amber-400 to-orange-400';
  return 'from-rose-500 to-red-400';
}

const VISIBLE_ROWS_COLLAPSED = 5;

function HomeworkRows({ rows, totalAssignments, isLightMode, currentUserEmail }: { rows: HomeworkLeaderboardRow[]; totalAssignments: number; isLightMode: boolean; currentUserEmail?: string }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-separate border-spacing-y-1.5 min-w-[420px]">
        <thead>
          <tr className={`text-[10px] font-black uppercase tracking-wide ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <th className="text-left px-2 py-1 w-10">Rank</th>
            <th className="text-left px-2 py-1">Student</th>
            <th className="text-center px-2 py-1">Attempted</th>
            <th className="text-center px-2 py-1">Score</th>
            <th className="text-right px-2 py-1">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const rank = i + 1;
            const isMe = row.email === currentUserEmail;
            const avatarRow: AvatarRow = { email: row.email, name: row.name, photoUrl: row.photoUrl, value: row.percentage };
            return (
              <tr
                key={row.email}
                className={`text-xs font-semibold transition-transform hover:scale-[1.01] ${
                  isMe
                    ? isLightMode ? 'bg-cyan-50' : 'bg-cyan-500/10'
                    : rank <= 3
                      ? isLightMode ? 'bg-amber-50/60' : 'bg-amber-400/5'
                      : isLightMode ? 'bg-slate-50' : 'bg-slate-950/60'
                }`}
              >
                <td className={`px-2 py-1.5 rounded-l-lg ${isMe ? (isLightMode ? 'text-cyan-700' : 'text-cyan-300') : isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                  <RankBadge rank={rank} />
                </td>
                <td className={`px-2 py-1.5 ${isMe ? (isLightMode ? 'text-cyan-700' : 'text-cyan-300') : isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar row={avatarRow} isLightMode={isLightMode} />
                    <span className="truncate">{row.name}{isMe ? ' (You)' : ''}</span>
                  </div>
                </td>
                <td className={`px-2 py-1.5 text-center font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  {row.attempted}/{totalAssignments}
                </td>
                <td className={`px-2 py-1.5 text-center font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  {row.score}/{row.maxScore}
                </td>
                <td className="px-2 py-1.5 rounded-r-lg">
                  <div className="flex items-center justify-end gap-2">
                    <span className={`w-14 h-1.5 rounded-full overflow-hidden shrink-0 ${isLightMode ? 'bg-slate-200' : 'bg-slate-800'}`}>
                      <span className={`block h-full rounded-full bg-gradient-to-r ${percentageBarColor(row.percentage)}`} style={{ width: `${Math.max(4, Math.min(100, row.percentage))}%` }} />
                    </span>
                    <span className={`font-mono font-black ${percentageColor(row.percentage, isLightMode)}`}>{row.percentage}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function LeaderboardTable({ data, isLightMode, currentUserEmail }: { data: HomeworkLeaderboardData; isLightMode: boolean; currentUserEmail?: string }) {
  const [showAll, setShowAll] = useState(false);
  if (data.rows.length === 0) {
    return <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>No students to show yet.</p>;
  }
  const visibleRows = data.rows.slice(0, VISIBLE_ROWS_COLLAPSED);
  return (
    <div>
      <HomeworkRows rows={visibleRows} totalAssignments={data.totalAssignments} isLightMode={isLightMode} currentUserEmail={currentUserEmail} />
      {data.rows.length > VISIBLE_ROWS_COLLAPSED && (
        <button
          onClick={() => setShowAll(true)}
          className={`mt-2 flex items-center gap-1 text-[11px] font-black cursor-pointer ${isLightMode ? 'text-indigo-700 hover:text-indigo-900' : 'text-indigo-400 hover:text-indigo-300'}`}
        >
          More ({data.rows.length - VISIBLE_ROWS_COLLAPSED} more student{data.rows.length - VISIBLE_ROWS_COLLAPSED === 1 ? '' : 's'}) <ChevronDown className="w-3.5 h-3.5" />
        </button>
      )}
      {showAll && (
        <LeaderboardModal title={`Class ${data.classLabel} Homework Leaderboard`} onClose={() => setShowAll(false)} isLightMode={isLightMode}>
          <HomeworkRows rows={data.rows} totalAssignments={data.totalAssignments} isLightMode={isLightMode} currentUserEmail={currentUserEmail} />
        </LeaderboardModal>
      )}
    </div>
  );
}

// Shown on the Homework tab and the student Home dashboard (own class only, fetched here), and
// reused by the admin's all-classes view (which passes pre-fetched `data` per class instead).
export function HomeworkLeaderboard({ isLightMode = false, token, currentUserEmail, compact = false, data: providedData }: HomeworkLeaderboardProps) {
  const [loading, setLoading] = useState(!providedData);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HomeworkLeaderboardData | null>(providedData || null);

  useEffect(() => {
    if (providedData) { setData(providedData); return; }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch('/api/homework/leaderboard', { headers: { Authorization: `Bearer ${token}` } });
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
  }, [token, providedData]);

  return (
    <div className={compact ? '' : cardClass(isLightMode)}>
      {!compact && (
        <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${isLightMode ? 'from-indigo-100/60' : 'from-indigo-500/10'} to-transparent pointer-events-none`} />
      )}
      <h3 className={`relative text-sm font-black uppercase tracking-wide mb-1 flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
        <BookOpenCheck className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_6px_rgba(129,140,248,0.6)]" /> {data ? `Class ${data.classLabel} Homework Leaderboard` : 'Homework Leaderboard'}
      </h3>
      <p className={`relative text-xs font-semibold mb-3 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Only students in your own class are shown here.</p>
      {loading && (
        <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Loading leaderboard...</p>
      )}
      {error && (
        <p className="text-xs font-bold text-red-400">{error}</p>
      )}
      {data && !loading && <LeaderboardTable data={data} isLightMode={isLightMode} currentUserEmail={currentUserEmail} />}
    </div>
  );
}
