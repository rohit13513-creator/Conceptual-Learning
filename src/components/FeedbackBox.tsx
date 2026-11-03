import React, { useState } from 'react';
import { Star, MessageSquareHeart, X, Check, ExternalLink } from 'lucide-react';

// "Feedback & Testimonial" on the home page: a card that opens a small form (stars + a few words). Everything a
// student sends reaches the teacher by e-mail and on the admin screen, whatever the rating. Afterwards every student
// -- not only those who gave 5 stars -- is invited to share their words on Google as well, if a Google link is set.

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

export function FeedbackBox({ token, isLightMode }: { token: string; isLightMode: boolean }) {
  const light = isLightMode;
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState('');
  const [allowPublic, setAllowPublic] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ googleUrl: string | null } | null>(null);
  const [copied, setCopied] = useState(false);

  const reset = () => { setRating(0); setHover(0); setMessage(''); setAllowPublic(false); setError(null); setDone(null); setCopied(false); };
  const close = () => { setOpen(false); setTimeout(reset, 200); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) return setError('Please tap the stars to give a rating.');
    if (message.trim().length < 10) return setError('Please write a few words about your experience.');
    setSending(true); setError(null);
    try {
      const r = await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ rating, message: message.trim(), allowPublic }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || 'Could not send. Please try again.');
      setDone({ googleUrl: d.googleReviewUrl || null });
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
  const inputCls = `w-full border rounded-xl py-3 px-4 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 resize-none ${light ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500'}`;

  return (
    <>
      <button onClick={() => setOpen(true)} className={`w-full flex items-center gap-3 p-5 rounded-2xl border text-left transition duration-200 cursor-pointer bg-gradient-to-br ${light ? 'from-amber-50 to-orange-50 border-amber-300' : 'from-amber-500/10 to-orange-600/10 border-amber-500/30'}`}>
        <span className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-300 to-orange-400 shadow-lg shadow-amber-500/25"><MessageSquareHeart className="w-6 h-6 text-slate-950" /></span>
        <div className="flex-1">
          <p className={`text-base font-black ${heading}`}>Feedback &amp; Testimonial</p>
          <p className={`text-[11px] font-semibold ${light ? 'text-slate-600' : 'text-slate-300'}`}>Tell Rohit Sir how we are doing. Your rating and words reach him directly.</p>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4" onClick={close}>
          <div onClick={(e) => e.stopPropagation()} className={`w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border shadow-2xl p-6 ${light ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700'}`}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className={`text-lg font-black ${heading}`}>{done ? 'Thank you!' : 'Feedback & Testimonial'}</h3>
              <button onClick={close} aria-label="Close" className={`p-1.5 rounded-lg cursor-pointer ${light ? 'text-slate-500 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800'}`}><X className="w-5 h-5" /></button>
            </div>

            {done ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-xl px-4 py-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-bold">Your feedback has reached Rohit Sir. We read every message and use it to improve.</p>
                </div>
                {done.googleUrl && (
                  <div className={`rounded-xl border p-4 space-y-3 ${light ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'}`}>
                    <p className={`text-sm font-bold ${heading}`}>Would you also like to share your words on Google?</p>
                    <p className={`text-xs font-medium ${muted}`}>It is completely your choice. It helps other students and parents find us. Your words are copied for you, so you only have to tap "Write a review" on Google and paste them.</p>
                    <button onClick={shareOnGoogle} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#22d3ee] text-slate-950 font-black text-sm cursor-pointer hover:bg-cyan-300"><ExternalLink className="w-4 h-4" /> Copy my words and open Google</button>
                    {copied && <p className="text-xs font-bold text-emerald-400">Copied. On Google, tap "Write a review" and paste your words.</p>}
                  </div>
                )}
                <button onClick={close} className={`w-full py-3 rounded-xl text-sm font-black cursor-pointer ${light ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>Close</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
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
                <div>
                  <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1.5 ${light ? 'text-slate-500' : 'text-slate-400'}`}>Your words</label>
                  <textarea className={inputCls} rows={4} maxLength={1500} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What did you like? What can we do better?" />
                  <p className={`text-[11px] font-medium mt-1 text-right ${muted}`}>{message.length}/1500</p>
                </div>
                <label className={`flex items-start gap-3 cursor-pointer text-sm font-medium ${light ? 'text-slate-700' : 'text-slate-300'}`}>
                  <input type="checkbox" checked={allowPublic} onChange={(e) => setAllowPublic(e.target.checked)} className="mt-1 w-4 h-4 accent-cyan-500" />
                  <span>You may show my words as a testimonial (with my first name only).</span>
                </label>
                {error && <div className="text-sm font-semibold rounded-xl px-4 py-3 border text-red-400 bg-red-500/10 border-red-500/25">{error}</div>}
                <button type="submit" disabled={sending} className="w-full py-3.5 rounded-2xl bg-[#22d3ee] text-slate-950 font-black text-sm uppercase tracking-wider cursor-pointer hover:bg-cyan-300 disabled:opacity-50">{sending ? 'Sending...' : 'Send feedback'}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
