// Facts used in the World of Algorithms questions, computed by the same algorithms the chapter describes.
const divisors = (n: number) => { const l: number[] = []; for (let j = 1; j <= n; j++) if (n % j === 0) l.push(j); return l; };
const subSteps = (m: number, n: number) => { let steps = 0; const trace: string[] = [`(${m},${n})`]; for (;;) { if (m < n) { [m, n] = [n, m]; trace.push(`rev(${m},${n})`); } if (n === 0) return { g: m, steps, trace }; [m, n] = [n, m - n]; steps++; trace.push(`(${m},${n})`); } };
const divSteps = (m: number, n: number) => { let steps = 0; const trace: string[] = []; for (;;) { if (m < n) [m, n] = [n, m]; if (n === 0) return { g: m, steps, trace }; trace.push(`${m}=${Math.floor(m / n)}x${n}+${m % n}`); [m, n] = [n, m % n]; steps++; } };
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const pairs: [number, number][] = [[375, 825], [54000, 81000], [51000, 81000], [1789287, 237656], [2587392, 157656], [48, 18], [252, 105], [60, 16], [36, 24], [84, 36], [45, 20], [100, 75], [119, 34], [99, 2], [101, 2], [1000, 3], [72, 30], [56, 42], [91, 39], [144, 60], [225, 150], [18, 12], [12, 18], [17, 5], [33, 7], [210, 45], [180, 84], [64, 40], [35, 14], [27, 18], [96, 36], [90, 24]];
for (const [m, n] of pairs) { const s = subSteps(m, n), d = divSteps(m, n); console.log(`gcd(${m},${n}) = ${gcd(m, n)} | subtraction reductions ${s.steps} | division steps ${d.steps} ${m < 400 ? d.trace.join("; ") : ""}`); }
for (const n of [12, 15, 18, 28, 30, 36, 45, 48, 60, 100, 135, 775, 49, 13, 1]) console.log(`divisors(${n}) = [${divisors(n).join(", ")}] count ${divisors(n).length}`);
console.log("mod:", 17 % 5, 33 % 7, 99 % 2, 100 % 7, 250 % 12, 45 % 45);
console.log("lcm(12,18)", (12 * 18) / gcd(12, 18), "lcm(15,20)", (15 * 20) / gcd(15, 20), "lcm(8,12)", (8 * 12) / gcd(8, 12));
console.log("add 473+695", 473 + 695, "dots 3347+2729", 3347 + 2729, ((3347 + 2729) / 60).toFixed(1), "min");
