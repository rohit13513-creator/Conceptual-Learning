import React, { useState } from 'react';
import { Star, MessageSquareHeart, Check, ExternalLink } from 'lucide-react';

// The "Feedback" page (its own tab in the top bar). The student first chooses what to send: a complaint, a feedback or a
// testimonial. Only a testimonial has the star rating. Everything reaches the teacher by e-mail and on the admin screen.
// After a testimonial -- whatever the stars -- the student is invited to share the words on Google as well, if a link is set.

type Kind = 'complaint' | 'feedback' | 'testimonial';
const LABELS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
const KINDS: { key: Kind; label: string; intro: string; placeholder: string; thanks: string }[] = [
  { key: 'complaint', label: 'Complaint', intro: 'Something went wrong? Tell us plainly and Rohit Sir will look into it.', placeholder: 'What went wrong? Please tell us what happened.', thanks: 'We are sorry for the trouble. Your complaint has reached Rohit Sir and he will look into it.' },
  { key: 'feedback', label: 'Feedback', intro: 'A suggestion or an idea to make Conceptual Learning better.', placeholder: 'What can we do better? Any idea is welcome.', thanks: 'Thank you! Your feedback has reached Rohit Sir. We read every message and use it to improve.' },
  { key: 'testimonial', label: 'Testimonial', intro: 'Share your experience with a star rating and a few words.', placeholder: 'What did you like about Conceptual Learning?', thanks: 'Thank you! Your testimonial has reached Rohit Sir. Your kind words mean a lot to us.' },
];

export function FeedbackPage({ token, isLightMode }: { token: string; isLightMode: boolean }) {
  const light = isLightMode;
  const [kind, setKind] = useState<Kind>('feedback');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState('');
  const [allowPublic, setAllowPublic] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ kind: Kind; googleUrl: string | null } | null>(null);
  const [copied, setCopied] = useState(false);

  const current = KINDS.find((k) => k.key === kind)!;
  const reset = () => { setRating(0); setHover(0); setMessage(''); setAllowPublic(false); setError(null); setDone(null); setCopied(false); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (kind === 'testimonial' && rating < 1) return setError('Please tap the stars to give a rating.');
    if (message.trim().length < 10) return setError('Please write a few words (at least 10 letters).');
    setSending(true); setError(null);
    try {
      const body: Record<string, unknown> = { kind, message: message.trim() };
      if (kind === 'testimonial') { body.rating = rating; body.allowPublic = allowPublic; }
      const r = await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || 'Could not send. Please try again.');
      setDone({ kind, googleUrl: d.googleReviewUrl || null });
    } catch (err: any) { setError(err.message || 'Could not send. Please try again.'); }
    setSending(false);
  };

  const shareOnGoogle = async () => {
    try { await navigator.clipboard.writeText(message.trim()); setCopied(true); } catch { /* the student can still type or paste it */ }
    if (done?.googleUrl) window.open(done.googleUrl, '_blank', 'noopener,noreferrer');
  };

  const shown = hover || rating;
  const heading = light ? 'text-slate-900' : 'text-white';
  const muted = light ? 'text-slate-600' : 'text-slate-400';
  const labelCls = `text-[11px] font-bold uppercase tracking-wider block mb-1.5 ${light ? 'text-slate-500' : 'text-slate-400'}`;
  const fieldCls = `w-full border rounded-xl py-3 px-4 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 ${light ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500'}`;

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-300 to-orange-400 shadow-lg shadow-amber-500/25"><MessageSquareHeart className="w-6 h-6 text-slate-950" /></span>
        <div>
          <h1 className={`text-2xl font-black ${heading}`}>Feedback</h1>
          <p className={`text-sm font-semibold mt-0.5 ${muted}`}>Send a complaint, a feedback or a testimonial. It reaches Rohit Sir directly.</p>
        </div>
      </div>

      <div className={`rounded-2xl border p-5 sm:p-6 shadow-sm ${light ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
        {done ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl px-4 py-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
              <Check className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-bold">{KINDS.find((k) => k.key === done.kind)!.thanks}</p>
            </div>
            {done.googleUrl && (
              <div className={`rounded-xl border p-4 space-y-3 ${light ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'}`}>
                <p className={`text-sm font-bold ${heading}`}>Would you also like to share your words on Google?</p>
                <p className={`text-xs font-medium ${muted}`}>It is completely your choice. It helps other students and parents find us. Your words are copied for you, so you only have to tap "Write a review" on Google and paste them.</p>
                <button onClick={shareOnGoogle} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#22d3ee] text-slate-950 font-black text-sm cursor-pointer hover:bg-cyan-300"><ExternalLink className="w-4 h-4" /> Copy my words and open Google</button>
                {copied && <p className="text-xs font-bold text-emerald-400">Copied. On Google, tap "Write a review" and paste your words.</p>}
              </div>
            )}
            <button onClick={reset} className={`w-full py-3 rounded-xl text-sm font-black cursor-pointer ${light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>Send another message</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className={labelCls}>What would you like to send?</label>
              <select className={fieldCls} value={kind} onChange={(e) => { setKind(e.target.value as Kind); setError(null); }}>
                {KINDS.map((k) => <option key={k.key} value={k.key}>{k.label}</option>)}
              </select>
              <p className={`text-xs font-medium mt-1.5 ${muted}`}>{current.intro}</p>
            </div>

            {kind === 'testimonial' && (
              <div className="text-center">
                <p className={`text-sm font-bold mb-2 ${heading}`}>How would you rate Conceptual Learning?</p>
                <div className="flex justify-center gap-1.5" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" aria-label={`${n} star${n > 1 ? 's' : ''}`} onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} className="p-1 cursor-pointer">
                      <Star className={`w-10 h-10 transition ${n <= shown ? 'fill-amber-400 text-amber-400' : (light ? 'text-slate-300' : 'text-slate-600')}`} />
                    </button>
                  ))}
                </div>
                <p className={`text-sm font-black h-5 mt-1 ${shown ? 'text-amber-400' : ''}`}>{LABELS[shown]}</p>
              </div>
            )}

            <div>
              <label className={labelCls}>Your words</label>
              <textarea className={`${fieldCls} resize-none`} rows={5} maxLength={1500} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={current.placeholder} />
              <p className={`text-[11px] font-medium mt-1 text-right ${muted}`}>{message.length}/1500</p>
            </div>

            {kind === 'testimonial' && (
              <label className={`flex items-start gap-3 cursor-pointer text-sm font-medium ${light ? 'text-slate-700' : 'text-slate-300'}`}>
                <input type="checkbox" checked={allowPublic} onChange={(e) => setAllowPublic(e.target.checked)} className="mt-1 w-4 h-4 accent-cyan-500" />
                <span>You may show my words as a testimonial (with my first name only).</span>
              </label>
            )}

            {error && <div className="text-sm font-semibold rounded-xl px-4 py-3 border text-red-400 bg-red-500/10 border-red-500/25">{error}</div>}
            <button type="submit" disabled={sending} className="w-full py-3.5 rounded-2xl bg-[#22d3ee] text-slate-950 font-black text-sm uppercase tracking-wider cursor-pointer hover:bg-cyan-300 disabled:opacity-50">{sending ? 'Sending...' : `Send ${current.label.toLowerCase()}`}</button>
          </form>
        )}
      </div>
    </div>
  );
}
