import React, { useEffect, useRef, useState } from "react";

// Fades and slides its children in when they scroll into view (styles: .cl-reveal in index.css).
// Without IntersectionObserver, or with reduced motion, the content simply shows.
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`cl-reveal ${shown ? "in" : ""} ${className}`} style={{ ["--d" as any]: `${delay}ms` }}>
      {children}
    </div>
  );
};
