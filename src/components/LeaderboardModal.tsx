import React from 'react';
import { X } from 'lucide-react';

// Shared dialog chrome for "see everyone" popups on both the Revision and Homework leaderboards --
// a plain fixed-position overlay (no portal needed, this app doesn't nest these) with a
// click-outside-to-close backdrop and its own scroll region so a 30-student list never pushes the
// page around.
export function LeaderboardModal({ title, onClose, isLightMode, children }: { title: string; onClose: () => void; isLightMode: boolean; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md max-h-[80vh] flex flex-col rounded-2xl border shadow-2xl ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700'}`}
      >
        <div className={`flex items-center justify-between gap-3 px-5 py-4 border-b shrink-0 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
          <h3 className={`text-sm font-black uppercase tracking-wide ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{title}</h3>
          <button
            onClick={onClose}
            className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center cursor-pointer transition ${isLightMode ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
