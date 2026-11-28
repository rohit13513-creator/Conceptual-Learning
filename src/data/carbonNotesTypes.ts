// Block types for the "Carbon and its Compounds" notes. Inside any text, **bold** makes bold text,
// [a|b] shows a stacked fraction a over b (used by the maths chapters); formulas written like CH4 or H2SO4 show their subscripts automatically, and _{..} / ^{..} give subscripts / superscripts.

export type CBlock =
  | { t: "p"; s: string }
  | { t: "h"; s: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "key"; title: string; s: string }
  | { t: "note"; title: string; s: string }
  | { t: "dia"; id: string }
  | { t: "dias"; ids: string[] }
  | { t: "act"; title: string; steps: string[]; see: string[]; why: string[] }
  | { t: "eq"; lines: string[] }
  | { t: "qa"; title?: string; items: [string, string][] }
  | { t: "ex"; title: string; q: string; steps: string[]; ans: string } // a solved example
  | { t: "mindmap" };

export interface CTopic { id: string; category: string; title: string; heading: string; sub: string; blocks: CBlock[] }
