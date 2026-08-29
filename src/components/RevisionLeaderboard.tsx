import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

interface LeaderboardRow {
  email: string;
  name: string;
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

const cardClass = (isLightMode: boolean) => `border rounded-2xl p-5 shadow-lg ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`;

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
      <h3 className={`text-sm font-black uppercase tracking-wide mb-1 flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
        <Trophy className="w-4 h-4 text-amber-400" /> {data ? `Class ${data.classLabel} Leaderboard` : 'Leaderboard'}
      </h3>
      <p className={`text-xs font-semibold mb-3 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Only students in your own class are shown here.</p>
      {loading && (
        <p className={`text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Loading leaderboard...</p>
      )}
      {error && (
        <p className="text-xs font-bold text-red-400">{error}</p>
      )}
      {data && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {([
            { title: 'Most Tests Attempted', rows: data.mostAttempted, format: (v: number) => `${v} test${v === 1 ? '' : 's'}`, empty: 'No attempts yet.' },
            { title: 'Highest Percentage (First Attempt)', rows: data.highestPercentage, format: (v: number) => `${v}%`, empty: 'No graded papers yet.' },
            { title: 'Top Improvers', rows: data.topImprovers, format: (v: number) => `+${v} marks`, empty: 'No improvements yet.' },
          ]).map((section) => (
            <div key={section.title} className={`p-3 rounded-xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <h4 className={`text-[10px] font-black uppercase tracking-wide mb-2 ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>{section.title}</h4>
              {section.rows.length === 0 ? (
                <p className={`text-[11px] font-semibold ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>{section.empty}</p>
              ) : (
                <ol className="space-y-1.5">
                  {section.rows.map((row, i) => (
                    <li key={row.email} className={`flex items-center justify-between gap-2 text-xs font-semibold ${row.email === currentUserEmail ? (isLightMode ? 'text-cyan-700' : 'text-cyan-400') : (isLightMode ? 'text-slate-700' : 'text-slate-300')}`}>
                      <span className="truncate">{i + 1}. {row.name}{row.email === currentUserEmail ? ' (You)' : ''}</span>
                      <span className="shrink-0 font-mono">{section.format(row.value)}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
