import React from "react";
import { DeviceType } from "../types";
import {
  PLANE_MIRROR_TABLE,
  CONCAVE_MIRROR_TABLE,
  CONVEX_MIRROR_TABLE,
  CONVEX_LENS_TABLE,
  CONCAVE_LENS_TABLE,
} from "../data";

interface NCERTTableProps {
  device: DeviceType;
  u: number; // raw negative distance, e.g. -150
  f: number; // raw positive focal length, e.g. 100
}

export const NCERTTable: React.FC<NCERTTableProps> = ({ device, u, f }) => {
  const absU = Math.abs(u);
  const ratio = absU / f;

  // Function to determine which row is active
  const getActiveRowIndex = (): number => {
    if (device === DeviceType.PLANE_MIRROR) {
      if (absU >= 350) return 0; // At infinity
      return 1; // Finite distance
    } else if (device === DeviceType.CONCAVE_MIRROR) {
      if (ratio >= 2.9) return 0; // At infinity
      if (ratio > 2.08) return 1; // Beyond C
      if (ratio >= 1.92 && ratio <= 2.08) return 2; // At C
      if (ratio > 1.08 && ratio < 1.92) return 3; // Between C and F
      if (ratio >= 0.92 && ratio <= 1.08) return 4; // At F
      return 5; // Between P and F
    } else if (device === DeviceType.CONVEX_MIRROR) {
      if (ratio >= 2.9) return 0; // At infinity
      return 1; // Between infinity and P
    } else if (device === DeviceType.CONVEX_LENS) {
      if (ratio >= 2.9) return 0; // At infinity
      if (ratio > 2.08) return 1; // Beyond 2F1
      if (ratio >= 1.92 && ratio <= 2.08) return 2; // At 2F1
      if (ratio > 1.08 && ratio < 1.92) return 3; // Between F1 and 2F1
      if (ratio >= 0.92 && ratio <= 1.08) return 4; // At F1
      return 5; // Between F1 and O
    } else {
      // CONCAVE_LENS
      if (ratio >= 2.9) return 0;
      return 1;
    }
  };

  const activeIndex = getActiveRowIndex();

  const getTableData = () => {
    switch (device) {
      case DeviceType.PLANE_MIRROR:
        return { title: "Image formation by Plane Mirror", rows: PLANE_MIRROR_TABLE };
      case DeviceType.CONCAVE_MIRROR:
        return { title: "Image formation by Concave Mirror", rows: CONCAVE_MIRROR_TABLE };
      case DeviceType.CONVEX_MIRROR:
        return { title: "Image formation by Convex Mirror", rows: CONVEX_MIRROR_TABLE };
      case DeviceType.CONVEX_LENS:
        return { title: "Image formation by Convex Lens", rows: CONVEX_LENS_TABLE };
      case DeviceType.CONCAVE_LENS:
        return { title: "Image formation by Concave Lens", rows: CONCAVE_LENS_TABLE };
    }
  };

  const { title, rows } = getTableData();

  return (
    <div className="bg-[#121b2e]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-xl shadow-black/25 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800/60 gap-2">
        <div>
          <h3 className="font-bold text-slate-100 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest bg-sky-500/15 text-sky-400 font-bold rounded-md border border-sky-500/25 font-mono">
              OPTICS REFERENCE
            </span>
            {title}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-semibold opacity-80">
            The row matching your active simulation position is highlighted below.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/20">
        <table className="min-w-full text-xs text-left">
          <thead className="bg-[#0f172a]/60 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800 text-[10px]">
            <tr>
              <th className="py-3 px-4 font-bold">Position of the Object</th>
              <th className="py-3 px-4 font-bold">Position of the Image</th>
              <th className="py-3 px-4 font-bold">Size of the Image</th>
              <th className="py-3 px-4 font-bold">Nature of the Image</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rows.map((row, idx) => {
              const isActive = idx === activeIndex;
              return (
                <tr
                  key={row.objectPos + idx}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "bg-sky-500/10 text-sky-300 font-semibold ring-1 ring-inset ring-sky-500/30"
                      : "text-slate-350 hover:bg-slate-950/40"
                  }`}
                >
                  <td className="py-3.5 px-4 flex items-center gap-2">
                    {isActive && (
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                    )}
                    {row.objectPos}
                  </td>
                  <td className="py-3.5 px-4">{row.imagePos}</td>
                  <td className="py-3.5 px-4 font-semibold">{row.size}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wide ${
                        row.nature.toLowerCase().includes("virtual")
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                          : "bg-sky-500/10 text-sky-400 border border-sky-500/15"
                      }`}
                    >
                      {row.nature}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
