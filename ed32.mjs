import fs from "fs";
let s = fs.readFileSync("src/data/al9_self.ts","utf8");
const i = s.indexOf(`  ar("Assertion (A): If the last carry in the addition algorithm is 1`);
const j = s.indexOf(`  ar("Assertion (A): 33 mod 7 equals 4.`);
if (i < 0 || j < 0) throw new Error("nf");
s = s.slice(0, i) + `  ar("Assertion (A): If the carry from the last column of the addition algorithm is 1, the sum has the same number of digits as the larger number.\nReason (R): Step 5 writes the last carry as 1 on the left of the bottom row.", 3,
    "A is false: the last carry is written as an extra digit on the left, so the sum has one digit more than the larger number (for example 56 + 67 = 123). R is true."),
` + s.slice(j);
fs.writeFileSync("src/data/al9_self.ts", s);
