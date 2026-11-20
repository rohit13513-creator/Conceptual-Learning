// Recomputes the numbers of the Electricity numericals independently of the text of the question bank.
// Run: npx tsx scripts/check-elec-math.mts   (prints only the lines that disagree, and a total)
const near = (a: number, b: number, tol = 0.006) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const par = (...r: number[]) => 1 / r.reduce((s, x) => s + 1 / x, 0);
const checks: [string, number, number][] = [];
const c = (name: string, got: number, claimed: number) => checks.push([name, got, claimed]);

// textbook examples and exercises
c("Ex 11.1 charge", 0.5 * 600, 300);
c("Ex 11.3 bulb current", 220 / 1200, 0.18); c("Ex 11.3 heater current", 220 / 100, 2.2);
c("Ex 11.5 resistivity", 26 * Math.PI * (3e-4) ** 2 / 4 / 1, 1.84e-6);
c("Ex 11.7 current", 6 / 24, 0.25);
c("Ex 11.8 parallel", par(5, 10, 30), 3);
c("Ex 11.9 total", par(10, 40) + par(30, 20, 60), 18); c("Ex 11.9 current", 12 / 18, 0.67);
c("Ex 11.10 max R", 220 / (840 / 220), 57.6);
c("Ex 11.13 cost", 0.4 * 8 * 30 * 3, 288);
c("Q 11.6.2 (2) iron R", par(100, 50, 500), 31.25); c("Q 11.6.2 (2) iron I", 220 / 31.25, 7.04);
c("Q 11.6.2 (4a)", par(3, 6) + 2, 4); c("Q 11.6.2 (4b)", par(2, 3, 6), 1);
c("Q 11.6.2 (5) lowest", par(4, 8, 12, 24), 2);
c("Q 11.7 (2) heat", 50 * 96000, 4.8e6);
c("Ex 6 length", 10 * Math.PI * (0.25e-3) ** 2 / 1.6e-8, 122.7);
c("Ex 7 R", 6.6 / 2, 3.3);
c("Ex 9 current", 9 / 13.4, 0.67);
c("Ex 13 coil parallel", 220 / 12, 18.33);
c("Ex 15 current", 160 / 220, 0.73);
c("Ex 17 power", 25 * 44, 1100);
// question bank
c("5m mixed R", par(6, 3) + par(12, 4), 5); c("5m mixed I", 10 / 5, 2);
c("5m hot plate parallel heat", (220 * 220 / 27.5) * 600, 1.056e6);
c("5m bill units", (0.075 * 8 + 5 * 0.02 * 6 + 0.3 * 10 + 1) * 30, 156); c("5m bill", 156 * 6.5, 1014);
c("5m nichrome length", 40 * 5e-7 / 1e-4, 0.2);
c("5m power compare (ii)", 36 / 2, 18);
c("5m fuse current", 1560 / 220, 7.09); c("5m energy J", 1.8 * 3.6e6, 6.48e6);
c("5m ammeter", 12 / 10, 1.2); c("5m voltmeter", 1.2 * 6, 7.2); c("5m power in 6 ohm", 1.2 ** 2 * 6, 8.64);
c("5m fuse overload", 1530 / 220, 6.95);
c("5m heater 44 heat", 1100 * 7200, 7.92e6); c("5m heater 44 cost", 2.2 * 7, 15.4);
c("5m ten bulbs I", 400 / 220, 1.82); c("5m bulb R", 220 * 220 / 40, 1210);
c("5m 600 C electrons", 600 / 1.6e-19, 3.75e21);
c("5m 12 V parallel R", par(2, 4), 4 / 3); c("5m 12 V parallel P", 144 / par(2, 4), 108);
c("5m iron max I", 1000 / 220, 4.55); c("5m iron min R", 48400 / 400, 121);
c("3m copper length", 5 * Math.PI * (2e-4) ** 2 / 1.6e-8, 39.3);
c("3m TV and bulbs bill", (1 + 0.8) * 30 * 5, 270);
c("3m nichrome coil heat", 880 * 300, 2.64e5);
c("3m two 100 W in series each", 110 * 110 / 484, 25);
c("3m LED saving", 0.09 * 5 * 30 * 6, 81);
c("3m copper 100 m", 1.6e-8 * 100 / 1.5e-6, 1.07);
c("3m kettle heat", 2200 * 180, 3.96e5);
c("3m bulb on 110 V current", 110 / 484, 0.227);
c("self 4.5 V across 9 ohm", 4.5 / 9, 0.5);
// competency
c("case charger energy J", 10 * 10800, 1.08e5);
c("case torch heat", 4.5 * 0.5 * 120, 270);
c("case heater cost", 1.5 * 4 * 30 * 7, 1260);
c("case wiring copper", 1.62e-8 * 50 / 2.5e-6, 0.324); c("case wiring Al", 2.63e-8 * 50 / 2.5e-6, 0.526);
c("case toaster heat", 880 * 120, 1.056e5);
c("case geyser current", 2100 / 220, 9.55);
c("case LED saving money", 0.051 * 5 * 30 * 6, 45.9);
c("case extension board", 2500 / 220, 11.4);
c("case fan low speed power", 1 ** 2 * 110, 110);
c("case kettle heat", 2200 * 180, 3.96e5);
c("case parallel R", 9 / 4.5, 2);
c("case meter joules", 150 * 3.6e6, 5.4e8);
c("case heater cord ratio", 1100 / 1.25, 880);
c("case pump cost", 2.2 * 7, 15.4);
c("case resistivity P", 1.62e-8 * 10 / 1e-6, 0.162);
c("case thin wire heat", 100 * 0.5 * 60, 3000);

let bad = 0;
for (const [n, got, claimed] of checks) if (!near(got, claimed)) { bad++; console.log("DISAGREE:", n, "computed", got, "text says", claimed); }
console.log(checks.length, "numbers recomputed,", bad, "disagree");
