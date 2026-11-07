import fs from "fs";
const BS = String.fromCharCode(92);
// competency: remove the last paragraph question; 3-mark: remove the last
let l = fs.readFileSync("src/data/al9_long.ts","utf8");
const ci = l.indexOf(`  C("Counting the work"`);
if (ci < 0) throw new Error("c nf");
const end = l.indexOf(`];`, ci);
l = l.slice(0, ci) + l.slice(end);
fs.writeFileSync("src/data/al9_long.ts", l);
let sh = fs.readFileSync("src/data/al9_short.ts","utf8");
const si = sh.indexOf(`  s("Why do we say that gcd algorithms with lists give the correct gcd more easily`);
if (si < 0) throw new Error("s nf");
const se = sh.indexOf(`];`, si);
sh = sh.slice(0, si) + sh.slice(se);
fs.writeFileSync("src/data/al9_short.ts", sh);
// mcq: add one ordinary question before the assertion block
let m = fs.readFileSync("src/data/al9_mcq.ts","utf8");
const marker = `\n  // ── Assertion and reasoning ──`;
if (m.split(marker).length !== 2) throw new Error("m nf");
m = m.replace(marker, () => `  m("While the divisors algorithm is executed for n = 12, a new divisor is added to the list how many times?", "6", ["12", "4", "5"],
    "The list ends as [1, 2, 3, 4, 6, 12]. A divisor is added six times (for j = 1, 2, 3, 4, 6 and 12), although all 12 numbers are checked."),
` + marker);
fs.writeFileSync("src/data/al9_mcq.ts", m);
// self: add one ordinary question after the no-list trace question
let s = fs.readFileSync("src/data/al9_self.ts","utf8");
const a = `  q("Scanning from min(84, 126) = 84 down to 1`;
if (s.split(a).length !== 2) throw new Error("self nf");
s = s.replace(a, () => `  q("The no-list algorithm is executed for m = 12 and n = 18. After the start, the value of most-recent-common-divisor is updated how many times?", "3", ["2", "4", "5"],
    "min = 12. The updates happen at k = 2, k = 3 and k = 6 (the numbers that divide both 12 and 18). The value goes 1, 2, 3, 6 and gcd(12, 18) = 6."),
` + a);
fs.writeFileSync("src/data/al9_self.ts", s);
