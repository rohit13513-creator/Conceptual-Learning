import React from "react";

// Shared types and small helpers for the "Patterns in Life: Diversity and Classification" lesson.

export interface Pic { file: string; alt: string; caption: string; }
export type SvgKey = "timeline" | "kingdom-key" | "plant-classes" | "animal-tree" | "ladder" | "mind";

export type Block =
  | { t: "card"; title: string; body: React.ReactNode[] }
  | { t: "h"; text: string }
  | { t: "ul"; items: React.ReactNode[] }
  | { t: "facts"; rows: [string, React.ReactNode][] }
  | { t: "compare"; left: string; right: string; rows: [string, string][] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "remember"; title: string; body: React.ReactNode }
  | { t: "img"; pic: Pic }
  | { t: "imgs"; pics: Pic[] }
  | { t: "svg"; key: SvgKey; caption: string }
  | { t: "species"; title?: string; items: [string, string][] }
  | { t: "exq"; n: number; q: string; a: string }
  | { t: "activity"; title: string; aim: string; steps: string[]; observation: string; conclusion: string }
  | { t: "done"; items: string[] }
  | { t: "p"; body: React.ReactNode };

export interface Topic { id: string; title: string; category: string; heading: string; sub: string; blocks: Block[]; }

export const b = (s: string) => <b>{s}</b>;
