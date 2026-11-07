import fs from "fs";
let s = fs.readFileSync("src/data/al9Notes.ts","utf8");
const rep=(a,b)=>{ if(s.split(a).length!==2) throw new Error("nf "+a.slice(0,70)); s=s.replace(a,()=>b); };
rep("For k = 7 to 11 neither number is divided by k together, so it stays 6. k = 12 does not divide 18.", "For k = 7 to 11, k does not divide both numbers, so it stays 6. k = 12 does not divide 18.");
rep("for each j = 1, 2, 3, ..., m × n, the first j that both m and n divide is the lcm (the first common multiple that is found while counting up).", "for each j = 1, 2, 3, ..., m × n in order, the first j that is a multiple of both m and n (that is, both m and n divide j) is the lcm.");
fs.writeFileSync("src/data/al9Notes.ts", s);
