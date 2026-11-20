import type { QuizQuestion } from "../types-custom";
import { mc, ar } from "./elec10Util";

// Class X Physics, Electricity: 60 multiple-choice questions, 20 of them assertion-reason. Everything stays inside NCERT Chapter 11.
// Do not write a slash in any text (use ÷ or "per"). Powers are written 10^-8, I^2 and so on (see elec10Util.ts).

export const ELEC10_MCQS: QuizQuestion[] = [
  // ── charge, current, potential difference ──
  mc("A charge of 12 C flows through a wire in 4 s. The current in the wire is", "3 A", ["48 A", "0.33 A", "8 A"], "I = Q ÷ t = 12 ÷ 4 = 3 A."),
  mc("The number of electrons that make up a charge of 1 C is nearly", "6.25 × 10^18", ["1.6 × 10^19", "6.25 × 10^-18", "1.6 × 10^-19"], "n = Q ÷ e = 1 ÷ (1.6 × 10^-19) = 6.25 × 10^18."),
  mc("By convention the direction of the electric current in the outside circuit is", "from the positive terminal to the negative terminal of the cell", ["from the negative terminal to the positive terminal of the cell", "the same as the direction of flow of electrons", "different in different parts of the circuit"], "Current was thought to be the flow of positive charge. Electrons actually move the opposite way.", "el_circuit"),
  mc("To measure the current in a bulb, an ammeter is joined", "in series with the bulb", ["in parallel with the bulb", "in series with the battery only after the bulb is removed", "across the terminals of the switch"], "The whole current to be measured must pass through the ammeter, so it is joined in series."),
  mc("A voltmeter is always joined", "in parallel across the two points", ["in series with the component", "in series with the cell", "in parallel with the ammeter only"], "Parts in parallel have the same potential difference, so the voltmeter then reads the potential difference between those points."),
  mc("Work of 60 J is done in moving 5 C of charge between two points. The potential difference between the points is", "12 V", ["300 V", "65 V", "0.083 V"], "V = W ÷ Q = 60 ÷ 5 = 12 V."),
  mc("How much energy is given to each coulomb of charge passing through a 6 V battery?", "6 J", ["1 J", "36 J", "0.17 J"], "W = V Q = 6 × 1 = 6 J."),
  mc("One volt is the potential difference between two points when", "1 J of work is done in moving 1 C of charge between them", ["1 C of charge flows in 1 s", "1 A of current flows through 1 Ω", "1 W of power is used in 1 s"], "1 V = 1 J per 1 C."),
  // ── Ohm's law and resistance ──
  mc("The V–I graph of a metallic wire at constant temperature is", "a straight line through the origin", ["a straight line not through the origin", "a curve rising faster and faster", "a straight line parallel to the I-axis"], "V is directly proportional to I, which is Ohm's law."),
  mc("A 12 V battery is joined across an unknown resistor and a current of 2.5 mA flows. The resistance of the resistor is", "4800 Ω", ["30 Ω", "4.8 Ω", "0.0002 Ω"], "R = V ÷ I = 12 ÷ (2.5 × 10^-3) = 4800 Ω."),
  mc("The resistance of a component stays constant while the potential difference across it is made half. The current through it", "becomes half", ["becomes double", "stays the same", "becomes one-fourth"], "I = V ÷ R, so I is proportional to V when R is constant."),
  mc("The SI unit of resistivity is", "Ω m", ["Ω", "Ω ÷ m", "Ω m^2"], "ρ = R A ÷ l, so the unit is Ω × m^2 ÷ m = Ω m."),
  mc("The length of a wire is doubled and its diameter is also doubled. Its resistance becomes", "half", ["double", "four times", "one-fourth"], "R = ρ l ÷ A. Length ×2 gives R ×2; the area becomes 4 times, so R ÷ 4. Net: 2 ÷ 4 = one-half."),
  mc("The material generally used for the coils of an electric toaster is", "nichrome", ["copper", "aluminium", "silver"], "An alloy like nichrome has high resistivity and does not oxidise readily at high temperature."),
  mc("From the table of resistivities, which of these is the best conductor?", "silver", ["iron", "mercury", "tungsten"], "Silver has the lowest resistivity, 1.60 × 10^-8 Ω m."),
  mc("A wire of resistance R is cut into five equal parts and the parts are joined in parallel. The equivalent resistance is", "R ÷ 25", ["R ÷ 5", "5 R", "25 R"], "Each part has R ÷ 5. Five of them in parallel give (R ÷ 5) ÷ 5 = R ÷ 25."),
  // ── series and parallel ──
  mc("Resistors of 2 Ω, 3 Ω and 5 Ω are joined in series. The equivalent resistance is", "10 Ω", ["1.03 Ω", "30 Ω", "0.97 Ω"], "R = 2 + 3 + 5 = 10 Ω."),
  mc("Resistors of 6 Ω and 3 Ω are joined in parallel. The equivalent resistance is", "2 Ω", ["9 Ω", "4.5 Ω", "18 Ω"], "R = (6 × 3) ÷ (6 + 3) = 2 Ω."),
  mc("Three resistors of 6 Ω each are joined in parallel. The equivalent resistance is", "2 Ω", ["18 Ω", "6 Ω", "12 Ω"], "R ÷ n = 6 ÷ 3 = 2 Ω."),
  mc("When a number of resistors are joined in series, the quantity that is the same in every resistor is", "the current", ["the potential difference", "the resistance", "the power"], "Only one path exists, so the same current passes through each resistor.", "el_series"),
  mc("When a number of resistors are joined in parallel, the quantity that is the same across every resistor is", "the potential difference", ["the current", "the resistance", "the heat produced"], "All of them are joined between the same two points.", "el_parallel"),
  mc("A 20 Ω lamp and a 4 Ω conductor are joined in series to a 6 V battery. The current in the circuit is", "0.25 A", ["1.5 A", "0.3 A", "4 A"], "R = 24 Ω; I = 6 ÷ 24 = 0.25 A.", "el_lamp"),
  mc("A 12 V battery is joined to resistors of 3 Ω and 6 Ω in parallel. The total current drawn from the battery is", "6 A", ["1.33 A", "4 A", "2 A"], "R = (3 × 6) ÷ 9 = 2 Ω; I = 12 ÷ 2 = 6 A. (Branch currents 4 A and 2 A.)"),
  mc("Domestic appliances are joined in parallel because", "each appliance gets the full voltage and works independently of the others", ["the total resistance becomes very large", "the same current then flows through each appliance", "the potential difference divides among them"], "In parallel each device gets the supply voltage and can be switched on or off separately."),
  mc("In a series circuit of an electric bulb and a heater, it is impracticable because", "they need very different currents to work properly", ["the voltage is the same across both", "the total resistance becomes zero", "the bulb would get all the current"], "The same current flows through both in series, but a bulb and a heater need widely different currents."),
  // ── heating effect ──
  mc("An electric iron of resistance 20 Ω takes a current of 5 A. The heat developed in 30 s is", "15000 J", ["3000 J", "600 J", "750 J"], "H = I^2 R t = 25 × 20 × 30 = 15000 J."),
  mc("When the current through a resistor is doubled (resistance and time unchanged), the heat produced becomes", "four times", ["double", "half", "eight times"], "H = I^2 R t is proportional to I^2."),
  mc("The cord of an electric heater does not glow while its element does, because the cord", "has a very low resistance but carries the same current", ["carries a smaller current than the element", "has a higher resistance than the element", "is kept in cold air"], "The same current flows through both (series), so heat is proportional to R."),
  mc("The filament of an electric bulb is made of tungsten because tungsten", "has a very high melting point", ["has a very low resistivity", "is a very good insulator", "is cheaper than copper"], "The filament must get white hot without melting; tungsten melts at 3380 °C.", "el_bulb"),
  mc("A fuse is joined in series with an appliance and works on", "the heating effect of current", ["the magnetic effect of current", "the chemical effect of current", "the lighting effect of current"], "A larger current than the rating heats and melts the fuse wire, which breaks the circuit.", "el_fuse"),
  mc("An electric iron of 1 kW is used on 220 V. The fuse that should be used is", "5 A", ["1 A", "3 A", "10 A"], "I = P ÷ V = 1000 ÷ 220 = 4.54 A, so the next higher rating, 5 A, is used."),
  mc("Two wires of the same material, length and diameter are joined first in series and then in parallel across the same potential difference. The ratio of heat produced in series to that in parallel is", "1 : 4", ["1 : 2", "2 : 1", "4 : 1"], "In series the resistance is 2R and in parallel it is R ÷ 2. Since H = V^2 t ÷ R, the heat in series to the heat in parallel is (R ÷ 2) : 2R = 1 : 4."),
  // ── power and energy ──
  mc("The power of an electric bulb connected to a 220 V source drawing 0.50 A is", "110 W", ["440 W", "220 W", "0.0023 W"], "P = V I = 220 × 0.5 = 110 W."),
  mc("1 kW h is equal to", "3.6 × 10^6 J", ["3.6 × 10^3 J", "1000 J", "3600 J"], "1 kW h = 1000 W × 3600 s = 3.6 × 10^6 J."),
  mc("An electric bulb rated 220 V, 100 W is used on 110 V. The power it consumes is", "25 W", ["100 W", "75 W", "50 W"], "R = 220^2 ÷ 100 = 484 Ω. P = 110^2 ÷ 484 = 25 W."),
  mc("A 100 W bulb is used for 10 hours every day for 30 days. At Rs 5 per unit the cost of energy is", "Rs 150", ["Rs 15", "Rs 1500", "Rs 30"], "Energy = 0.1 kW × 10 h × 30 = 30 kW h. Cost = 30 × 5 = Rs 150."),
  mc("Which of the following does NOT represent electrical power?", "I R^2", ["I^2 R", "V I", "V^2 ÷ R"], "I R^2 has the unit V Ω, not watt."),
  mc("An electric heater of resistance 44 Ω draws 5 A. The rate at which heat is developed in it is", "1100 W", ["220 W", "8.8 W", "11000 W"], "P = I^2 R = 25 × 44 = 1100 W."),
  mc("Of two resistors joined in parallel across a battery, the one with the smaller resistance", "carries the larger current", ["carries the smaller current", "has the larger potential difference across it", "has the smaller potential difference across it"], "Same V, so I = V ÷ R is larger for the smaller R."),
  mc("Which of the two statements is correct? (i) An ammeter has a very low resistance. (ii) A voltmeter has a very high resistance.", "Both (i) and (ii)", ["(i) only", "(ii) only", "Neither (i) nor (ii)"], "The ammeter must not change the current; the voltmeter must take almost no current."),
  // ── assertion-reason (20) ──
  ar("Electrons flow from the negative to the positive terminal of a cell, yet the current is said to flow from positive to negative.", "The direction of current was fixed by convention before electrons were discovered.", 0, "Current was taken as the flow of positive charge, and the practice continues."),
  ar("The electric current in a circuit is measured with an ammeter.", "The SI unit of electric current is the ampere.", 1, "Both are true, but the unit of current does not explain why an ammeter is used to measure it."),
  ar("The resistivity of a wire doubles when its length is doubled.", "The resistance of a wire is directly proportional to its length.", 3, "Resistivity is a property of the material and does not depend on the length. Resistance doubles with length."),
  ar("Alloys are used in electric heating devices like toasters and irons.", "Alloys have a higher resistivity than pure metals and do not oxidise readily at high temperatures.", 0, "Both reasons make alloy coils produce heat and last long."),
  ar("The series arrangement is not used for house wiring.", "In a series circuit, if one appliance fails, all the other appliances stop working.", 0, "Failure of one breaks the only path of the current."),
  ar("The equivalent resistance of resistors in parallel is less than the smallest resistance.", "Each additional resistor in parallel gives the current one more path.", 0, "More paths mean less overall opposition to the current."),
  ar("The heat produced in a resistor becomes four times when the current is doubled.", "According to Joule's law, the heat produced is proportional to the square of the current.", 0, "H = I^2 R t."),
  ar("A 100 W bulb has a smaller resistance than a 60 W bulb when both are made for 220 V.", "The power of a device on a fixed voltage is inversely proportional to its resistance.", 0, "R = V^2 ÷ P: more power means less resistance."),
  ar("Tungsten is used for the filament of an electric bulb.", "Tungsten has a very high melting point.", 0, "The filament must become white hot without melting."),
  ar("Ordinary copper wire cannot be used in place of a fuse wire.", "Copper has a low melting point and a very high resistivity.", 2, "Copper has a high melting point and a low resistivity, so it would not melt when the current is dangerously high."),
  ar("The cord of an electric heater does not glow, but the heating element glows.", "The cord has a much smaller resistance than the element, though the same current flows in both.", 0, "H = I^2 R t is proportional to R for the same current."),
  ar("Kilowatt hour is a unit of electric power.", "1 kW h = 3.6 × 10^6 J.", 3, "The kilowatt hour is a unit of energy. The relation given is correct."),
  ar("A thick wire allows a larger current than a thin wire of the same material and length.", "The resistance of a wire is inversely proportional to its area of cross-section.", 0, "More area means less resistance and so more current at the same voltage."),
  ar("The resistance of a metal wire increases when its temperature rises.", "Ohm's law holds only when the temperature remains the same.", 1, "Both are true. Ohm's law is stated at constant temperature, but that statement does not explain why the resistance of a metal increases on heating."),
  ar("Ohm's law is not obeyed when the temperature of the wire changes.", "The resistance of a metal wire changes with temperature.", 0, "The law holds only at constant temperature because R depends on temperature."),
  ar("The same current flows through every resistor in a series combination.", "There is only one path for the charge in a series combination.", 0, "With no branch, the same charge passes every point each second."),
  ar("A bulb marked 220 V, 100 W glows dimly when used on 110 V.", "On 110 V it consumes only one-fourth of its rated power.", 0, "P = V^2 ÷ R with R fixed: half the voltage, one-fourth the power."),
  ar("One coulomb of charge consists of nearly 6 × 10^18 electrons.", "The charge on one electron is 1.6 × 10^-19 C.", 0, "n = 1 ÷ (1.6 × 10^-19) = 6.25 × 10^18."),
  ar("An ammeter joined in parallel with a resistor may get damaged.", "An ammeter has a very high resistance.", 2, "An ammeter has a very low resistance, so a very large current would pass through it."),
  ar("A fuse is joined in series with the appliance it protects.", "A fuse wire is usually made of an alloy of tin and lead.", 1, "Both are true. The fuse is in series so that the whole current passes through it; the material of the wire does not explain this."),
];
