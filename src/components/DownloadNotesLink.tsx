import React from "react";
import { Download } from "lucide-react";

// "Download Notes" button for a chapter's PDF (a file in /public). Two sizes: a full-width button
// for the desktop sidebar, and a small "PDF" chip for the mobile header.
interface Props {
  href: string;
  fileName: string;
  isLightMode: boolean;
  compact?: boolean;
}

export const DownloadNotesLink: React.FC<Props> = ({ href, fileName, isLightMode, compact = false }) =>
  compact ? (
    <a href={href} download={fileName} className={`shrink-0 flex items-center gap-1 px-2.5 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg ${isLightMode ? "bg-green-600 text-white" : "bg-green-500 text-slate-950"}`}>
      <Download className="w-3 h-3" />
      PDF
    </a>
  ) : (
    <a href={href} download={fileName} className={`mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 ${isLightMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-400 text-slate-950"}`}>
      <Download className="w-3.5 h-3.5" />
      Download Notes
    </a>
  );
