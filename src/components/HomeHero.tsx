import React from "react";
import { Sparkles, GraduationCap, MonitorSmartphone, School } from "lucide-react";

// Welcome banner at the top of the student home page. Styles: shared premium layer in index.css.
const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

export const HomeHero: React.FC<{ firstName: string; studentClass?: string; studentType?: "online" | "offline"; subtitle?: string }> = ({ firstName, studentClass, studentType, subtitle }) => (
  <section className="cl-card cl-aurora cl-view-in relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
    <div className="cl-grid-bg absolute inset-0 pointer-events-none" />
    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <div className="space-y-3">
        <span className="cl-eyebrow"><Sparkles className="w-3.5 h-3.5" /> Home</span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] cl-heading">
          {greeting()}, <span className="cl-gradient-text">{firstName}</span>
        </h1>
        <p className="text-sm sm:text-base font-medium cl-page max-w-xl">
          {subtitle || "Learn the concept. The marks follow."}
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {studentClass && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black cl-heading" style={{ background: "var(--cl-surface-flat)", border: "1px solid var(--cl-border)" }}>
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Class {String(studentClass).replace(/th$/, "")}
            </span>
          )}
          {studentType && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black cl-heading" style={{ background: "var(--cl-surface-flat)", border: "1px solid var(--cl-border)" }}>
              {studentType === "online" ? <MonitorSmartphone className="w-3.5 h-3.5 text-violet-400" /> : <School className="w-3.5 h-3.5 text-emerald-400" />}
              {studentType === "online" ? "Online learner" : "Classroom learner"}
            </span>
          )}
        </div>
      </div>
      <img src="/favicon.svg" alt="" className="hidden sm:block w-28 h-28 rounded-3xl shadow-2xl shadow-cyan-500/20 cl-float" />
    </div>
  </section>
);
