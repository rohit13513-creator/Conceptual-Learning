// Solves the systems used in the Two Variables, One Line questions and compares with the answers written in the data files.
const solve = (a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): [number, number] | null => {
  const d = a1 * b2 - a2 * b1;
  if (Math.abs(d) < 1e-12) return null;
  return [(c1 * b2 - c2 * b1) / d, (a1 * c2 - a2 * c1) / d];
};
const checks: [string, number[], number[]][] = [
  // [name, a1 b1 c1 a2 b2 c2 for a x + b y = c, expected x y]
  ["rakesh", [1, 1, 25, 1, -1, 11], [18, 7]],
  ["tickets", [2, 3, 600, 3, 2, 700], [180, 80]],
  ["ex7", [7, -15, 2, 1, 2, 3], [49 / 29, 19 / 29]],
  ["ex9", [9, -4, 2000, 7, -3, 2000], [2000, 4000]],
  ["13.4 q1", [2, 3, 850, 4, 1, 1100], [245, 120]],
  ["13.4 q2", [1, 6, 122, 1, 8, 160], [8, 19]],
  ["13.4 q3", [1, 1, 200, 150, 100, 25000], [100, 100]],
  ["13.5 1i", [1, 1, 5, 1, -1, -21], [-8, 13]],
  ["13.5 1ii", [1, -1, 26, 1, -3, 0], [39, 13]],
  ["13.5 1iii", [7, 6, 8880, 3, 5, 4000], [1200, 80]],
  ["13.5 1iv", [1, 10, 155, 1, 15, 220], [25, 13]],
  ["13.5 1v", [11, -9, -4, 6, -5, -3], [7, 9]],
  ["13.5 1vi", [1, -1, -2, 2, -1, 1], [3, 5]],
  ["13.5 1vii", [1, -3, -10, 1, -2, 10], [50, 20]],
  ["13.5 1viii", [1, 1, 9, 8, -1, 0], [1, 8]],
  ["13.5 1ix", [1, 1, 25, 1, 2, 40], [10, 15]],
  ["13.5 1x", [1, 4, 27, 1, 2, 21], [15, 3]],
  ["13.5 q2", [1, 1, 10, -1, 1, 4], [3, 7]],
  ["13.5 q5", [1, 1, 36, 1, -1, 4], [20, 16]],
  ["13.5 q7", [9, 7, 107, 7, 9, 101], [8, 5]],
  ["13.5 q8", [5, 7, 50, 7, 5, 46], [3, 5]],
  ["4 iii", [2, 1, 6, 4, -2, 4], [2, 2]],
  ["end 3", [2, 1, 6, 2, -1, 2], [2, 2]],
  ["end 14", [1, 3, 150, 4, 1, 160], [30, 40]],
  ["end 15", [-1, 1, 6, 3, -2, 12], null as any],
  ["end 13", [1, 1, 15, -1, 1, 1], [7, 8]],
  ["ex11", [1, 3, 6, 2, -3, 12], [6, 0]],
  ["pair1", [2, 1, 6, 1, -1, 2], [8 / 3, 2 / 3]],
];
let bad = 0;
for (const [name, c, exp] of checks) {
  const r = solve(c[0], c[1], c[2], c[3], c[4], c[5]);
  if (!exp) continue;
  const ok = r && Math.abs(r[0] - exp[0]) < 1e-9 && Math.abs(r[1] - exp[1]) < 1e-9;
  if (!ok) { bad++; console.log("MISMATCH", name, r, exp); }
}
console.log(`${checks.length} systems checked, ${bad} wrong`);
process.exit(bad ? 1 : 0);
