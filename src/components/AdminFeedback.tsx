import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MessageSquareHeart, Star, RefreshCw, Copy, Check } from 'lucide-react';

// The teacher's list of every complaint, feedback and testimonial students have sent (each one is also e-mailed).
interface Item { id: string; name: string; email: string; studentClass: string | null; kind: 'complaint' | 'feedback' | 'testimonial'; rating: number | null; message: string; allowPublic: boolean; isRead: boolean; createdAt: string }
type Filter = 'all' | 'new' | 'complaint' | 'feedback' | 'testimonial' | 'five' | 'public';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' }, { key: 'new', label: 'New' }, { key: 'complaint', label: 'Complaints' }, { key: 'feedback', label: 'Feedback' }, { key: 'testimonial', label: 'Testimonials' }, { key: 'five', label: '5 stars' }, { key: 'public', label: 'May be shown' },
];

export default function AdminFeedback({ token, isLightMode }: { token: string; isLightMode: boolean }) {
  const light = isLightMode;
  const [items, setItems] = useState<Item[] | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const r = await fetch('/api/admin/feedback', { headers: { Authorization: `Bearer ${token}` } });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Could not load.');
      setItems(d.items || []); setUnavailable(!!d.unavailable);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, [token]);
  useEffect(() => { load(); }, [load]);

  const setRead = async (id: string, isRead: boolean) => {
    setItems((cur) => (cur ? cur.map((i) => (i.id === id ? { ...i, isRead } : i)) : cur));
    try { await fetch('/api/admin/feedback/read', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id, isRead }) }); } catch { load(); }
  };
  const copyText = async (i: Item) => {
    const first = i.name.split(/\s+/)[0];
    try { await navigator.clipboard.writeText(`"${i.message}"\n- ${first}, ${i.studentClass ? (i.studentClass === 'Canadian' ? 'Canadian Board' : 'Class ' + i.studentClass) + ' student' : 'student'}`); setCopiedId(i.id); setTimeout(() => setCopiedId(null), 2000); } catch { /* nothing to do */ }
  };

  const shown = useMemo(() => (items || []).filter((i) => filter === 'all' ? true : filter === 'new' ? !i.isRead : filter === 'complaint' || filter === 'feedback' || filter === 'testimonial' ? i.kind === filter : filter === 'five' ? i.rating === 5 : i.allowPublic), [items, filter]);
  const rated = (items || []).filter((i) => typeof i.rating === 'number') as (Item & { rating: number })[];
  const average = rated.length ? (rated.reduce((s, i) => s + i.rating, 0) / rated.length).toFixed(1) : null;
  const countOf = (k: Item['kind']) => (items || []).filter((i) => i.kind === k).length;
  const newCount = (items || []).filter((i) => !i.isRead).length;
  const muted = light ? 'text-slate-500' : 'text-slate-400';
  const heading = light ? 'text-slate-900' : 'text-white';
  const stars = (n: number) => <span className="inline-flex">{[1, 2, 3, 4, 5].map((k) => <Star key={k} className={`w-4 h-4 ${k <= n ? 'fill-amber-400 text-amber-400' : (light ? 'text-slate-300' : 'text-slate-700')}`} />)}</span>;

  return (
    <div className={`border rounded-2xl p-5 shadow-lg ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase font-mono tracking-widest text-amber-400"><MessageSquareHeart className="w-4 h-4" /> Complaints, Feedback &amp; Testimonials</h3>
          <p className={`text-[11px] mt-1 font-semibold ${muted}`}>{items ? `${items.length} received (${countOf('complaint')} complaints, ${countOf('feedback')} feedback, ${countOf('testimonial')} testimonials)${average ? `. Testimonials average ${average} out of 5` : ''}${newCount ? `. ${newCount} new` : ''}.` : 'Everything students send you here is also e-mailed to you.'}</p>
        </div>
        <button onClick={load} disabled={loading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 cursor-pointer disabled:opacity-60"><RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh</button>
      </div>

      {error && <p className="mt-3 text-xs font-bold text-red-400">{error}</p>}
      {unavailable ? (
        <p className={`mt-4 text-xs font-semibold rounded-lg px-3 py-2.5 border ${light ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-amber-500/10 border-amber-500/25 text-amber-300'}`}>Feedback is reaching you by e-mail. To also keep the list here, the one-time Supabase step (supabase_feedback.sql) still has to be run.</p>
      ) : items && (
        <>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {FILTERS.map((f) => (
              <button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition ${filter === f.key ? 'bg-amber-400 text-slate-950' : (light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700')}`}>{f.label}</button>
            ))}
          </div>
          <div className={`mt-3 divide-y max-h-[520px] overflow-y-auto ${light ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
            {shown.length === 0 ? <p className={`text-center py-6 text-xs font-semibold ${muted}`}>{items.length === 0 ? 'Nothing received yet.' : 'Nothing in this filter.'}</p> : shown.map((i) => (
              <div key={i.id} className="py-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className={`text-sm font-bold flex items-center gap-2 ${heading}`}>{i.name}{!i.isRead && <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400">New</span>}</p>
                  <span className={`text-[10px] font-mono ${muted}`}>{i.studentClass ? (i.studentClass === 'Canadian' ? 'Canadian' : `Class ${i.studentClass}`) + ' • ' : ''}{new Date(i.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${i.kind === 'complaint' ? 'bg-red-500/15 text-red-400' : i.kind === 'testimonial' ? 'bg-amber-500/15 text-amber-500' : 'bg-cyan-500/15 text-cyan-500'}`}>{i.kind === 'complaint' ? 'Complaint' : i.kind === 'testimonial' ? 'Testimonial' : 'Feedback'}</span>
                  {i.rating !== null && <>{stars(i.rating)}<span className={`text-[11px] font-bold ${muted}`}>{i.rating}/5</span></>}
                  {i.allowPublic && <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">May be shown</span>}
                </div>
                <p className={`text-sm font-medium whitespace-pre-wrap break-words ${light ? 'text-slate-700' : 'text-slate-200'}`}>{i.message}</p>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  <button onClick={() => setRead(i.id, !i.isRead)} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>{i.isRead ? 'Mark as new' : 'Mark as read'}</button>
                  <button onClick={() => copyText(i)} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>{copiedId === i.id ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> {i.kind === 'testimonial' ? 'Copy as testimonial' : 'Copy text'}</>}</button>
                  <a href={`mailto:${i.email}`} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>Reply by e-mail</a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
