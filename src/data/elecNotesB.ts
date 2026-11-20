import type { CTopic } from "./carbonNotesTypes";

// Class X Physics, Electricity. Topics 4 and 5: Ohm's law, resistance and resistivity.

export const ELEC_B: CTopic[] = [
  {
    id: "e4", category: "Ohm's law", title: "Ohm's Law", heading: "Ohm's Law and Resistance",
    sub: "How the potential difference and the current in a wire are related.",
    blocks: [
      { t: "p", s: "Is there a relation between the potential difference across a conductor and the current through it? In Activity 1 (see the Activities topic) a nichrome wire XY, an ammeter, a voltmeter and four cells are joined as shown, and the number of cells is increased from one to four." },
      { t: "dia", id: "el_ohm" },
      { t: "ul", items: [
        "For each pair of readings, V ÷ I comes out nearly the same.",
        "The graph of V against I is a **straight line passing through the origin**. So V ÷ I is a constant ratio.",
        "**Nichrome** is an alloy of nickel, chromium, manganese and iron.",
      ] },
      { t: "dia", id: "el_vi" },
      { t: "key", title: "Ohm's law", s: "The potential difference V across the ends of a given metallic wire in an electric circuit is **directly proportional to the current I** flowing through it, **provided its temperature remains the same**. V ∝ I, or V ÷ I = constant = R, that is, **V = I R**." },
      { t: "p", s: "In 1827 the German physicist **Georg Simon Ohm** (1787–1854) found this relation between the current in a metallic wire and the potential difference across its ends." },
      { t: "h", s: "Resistance" },
      { t: "ul", items: [
        "In V = I R, R is a constant for the given wire at a given temperature. It is called its **resistance**.",
        "**Resistance** is the property of a conductor to **resist the flow of charges** through it. R = V ÷ I.",
        "SI unit: the **ohm**, written Ω. If the potential difference across a conductor is 1 V and the current through it is 1 A, its resistance is **1 Ω**. 1 ohm = 1 volt ÷ 1 ampere.",
        "Cause: electrons are not completely free to move inside a conductor. They are held back by the attraction of the atoms among which they move, so their motion is retarded.",
        "From V = I R we also get **I = V ÷ R**. The current through a resistor is **inversely proportional to its resistance**: if the resistance is doubled, the current is halved.",
      ] },
      { t: "h", s: "Variable resistance and rheostat" },
      { t: "p", s: "In many practical cases we must increase or decrease the current in a circuit. A component used to **regulate the current without changing the voltage source** is called a **variable resistance**. A device called a **rheostat** is often used to change the resistance in a circuit." },
      { t: "h", s: "Conductors, resistors and insulators" },
      { t: "p", s: "Components of the same size offer different resistances (Activity 2). Some give an easy path to the current and others resist it." },
      { t: "ul", items: [
        "A component of a given size that offers a **low resistance** is a **good conductor**.",
        "A conductor having some **appreciable resistance** is called a **resistor**.",
        "A component of the same size that offers a **higher resistance** is a **poor conductor**.",
        "An **insulator** of the same size offers an **even higher resistance**.",
      ] },
      { t: "qa", title: "Solved examples", items: [
        ["Example 11.3. (a) How much current will an electric bulb draw from a 220 V source if the resistance of the bulb filament is 1200 Ω? (b) How much current will an electric heater coil draw from a 220 V source if its resistance is 100 Ω?", "(a) I = V ÷ R = 220 ÷ 1200 = **0.18 A**. (b) I = 220 ÷ 100 = **2.2 A**. The heater draws about 12 times the current of the bulb from the same source."],
        ["Example 11.4. The potential difference between the terminals of an electric heater is 60 V when it draws a current of 4 A. What current will it draw if the potential difference is increased to 120 V?", "R = V ÷ I = 60 ÷ 4 = 15 Ω. New current I = V ÷ R = 120 ÷ 15 = **8 A**. (Double the potential difference, double the current.)"],
        ["When a 12 V battery is connected across an unknown resistor, there is a current of 2.5 mA in the circuit. Find the resistance. (Exercise 8)", "I = 2.5 mA = 2.5 × 10^{-3} A. R = V ÷ I = 12 ÷ (2.5 × 10^{-3}) = 4800 Ω = **4.8 kΩ**."],
        ["The readings I = 0.5, 1.0, 2.0, 3.0, 4.0 A and V = 1.6, 3.4, 6.7, 10.2, 13.2 V are taken for a resistor. Plot the graph and find R. (Exercise 7)", "Plot I on the x-axis and V on the y-axis. The points lie close to a straight line through the origin, so the resistor obeys Ohm's law. R = V ÷ I is nearly the same for every pair (about 3.2 to 3.4 Ω), so **R ≈ 3.3 Ω** (the slope of the line)."],
      ] },
    ],
  },
  {
    id: "e5", category: "Resistance", title: "Resistance and Resistivity", heading: "Factors on Which the Resistance of a Conductor Depends",
    sub: "Length, area of cross-section and the material.",
    blocks: [
      { t: "p", s: "In Activity 3 a cell, an ammeter and a key are joined with different wires placed between P and Q, one at a time, and the ammeter reading is noted." },
      { t: "dia", id: "el_factors" },
      { t: "table", head: ["Wire used", "Ammeter reading", "What it shows"], rows: [
        ["Nichrome, length l", "Some current", "Reference reading"],
        ["Nichrome, length 2l (same thickness)", "Becomes one-half", "Double the length, double the resistance"],
        ["Thicker nichrome, length l", "Increases", "A larger area gives a smaller resistance"],
        ["Copper, same length and thickness", "Changes (it increases)", "Resistance depends on the material"],
      ] },
      { t: "key", title: "Factors", s: "The resistance of a conductor depends (i) on its **length**, (ii) on its **area of cross-section** and (iii) on the **nature of its material**." },
      { t: "p", s: "Precise measurements show that the resistance of a uniform metallic conductor is **directly proportional to its length (l)** and **inversely proportional to its area of cross-section (A)**." },
      { t: "eq", lines: ["R ∝ l   and   R ∝ 1 ÷ A", "R = ρ l ÷ A"] },
      { t: "ul", items: [
        "ρ (rho) is a constant of proportionality called the **electrical resistivity** of the material of the conductor.",
        "ρ = R A ÷ l, so its SI unit is **Ω m** (ohm metre). Putting l = 1 m and A = 1 m^{2} gives ρ = R: it is the resistance of a conductor of unit length and unit area of cross-section.",
        "Resistivity is a **characteristic property of the material**. It does not depend on the length or thickness of the wire.",
        "**Metals and alloys** have very low resistivity (10^{-8} Ω m to 10^{-6} Ω m); they are good conductors.",
        "**Insulators** like rubber and glass have resistivity of the order of 10^{12} to 10^{17} Ω m.",
        "Both the resistance and the resistivity of a material vary with **temperature**.",
      ] },
      { t: "table", head: ["Material", "Resistivity (Ω m) at 20 °C"], rows: [
        ["**Conductors**: Silver", "1.60 × 10^{-8}"], ["Copper", "1.62 × 10^{-8}"], ["Aluminium", "2.63 × 10^{-8}"], ["Tungsten", "5.20 × 10^{-8}"],
        ["Nickel", "6.84 × 10^{-8}"], ["Iron", "10.0 × 10^{-8}"], ["Chromium", "12.9 × 10^{-8}"], ["Mercury", "94.0 × 10^{-8}"], ["Manganese", "1.84 × 10^{-6}"],
        ["**Alloys**: Constantan (Cu, Ni)", "49 × 10^{-6}"], ["Manganin (Cu, Mn, Ni)", "44 × 10^{-6}"], ["Nichrome (Ni, Cr, Mn, Fe)", "100 × 10^{-6}"],
        ["**Insulators**: Glass", "10^{10} to 10^{14}"], ["Hard rubber", "10^{13} to 10^{16}"], ["Ebonite", "10^{15} to 10^{17}"], ["Diamond", "10^{12} to 10^{13}"], ["Paper (dry)", "10^{12}"],
      ] },
      { t: "note", title: "You need not memorise", s: "The textbook says these values need not be learnt by heart. Use them when a numerical gives you the material." },
      { t: "h", s: "Why different materials are used" },
      { t: "ul", items: [
        "The resistivity of an **alloy is generally higher** than that of its constituent metals. Alloys do not oxidise (burn) readily at high temperatures. So they are used in electrical heating devices such as electric irons, toasters and heaters.",
        "**Tungsten** is used almost exclusively for the filaments of electric bulbs.",
        "**Copper and aluminium** have very low resistivity, so they are used for electrical transmission lines.",
      ] },
      { t: "qa", title: "Solved examples", items: [
        ["Example 11.5. Resistance of a metal wire of length 1 m is 26 Ω at 20 °C. If the diameter of the wire is 0.3 mm, what is the resistivity of the metal at that temperature? Use the table to predict the material.", "d = 0.3 mm = 3 × 10^{-4} m. ρ = R A ÷ l = R π d^{2} ÷ (4 l) = 26 × 3.14 × (3 × 10^{-4})^{2} ÷ 4 = **1.84 × 10^{-6} Ω m**. From the table, this is manganese."],
        ["Example 11.6. A wire of length l and area of cross-section A has a resistance of 4 Ω. What is the resistance of another wire of the same material with length l ÷ 2 and area 2A?", "R_{1} = ρ l ÷ A = 4 Ω. R_{2} = ρ (l ÷ 2) ÷ (2A) = (1 ÷ 4) ρ l ÷ A = R_{1} ÷ 4 = **1 Ω**."],
        ["A copper wire has diameter 0.5 mm and resistivity 1.6 × 10^{-8} Ω m. What length gives a resistance of 10 Ω? How does the resistance change if the diameter is doubled? (Exercise 6)", "A = π d^{2} ÷ 4 = 3.14 × (5 × 10^{-4})^{2} ÷ 4 = 1.96 × 10^{-7} m^{2}. l = R A ÷ ρ = 10 × 1.96 × 10^{-7} ÷ (1.6 × 10^{-8}) = **122.7 m (about 123 m)**. If the diameter is doubled, the area becomes 4 times, so the resistance becomes one-fourth: **2.5 Ω**."],
      ] },
      { t: "qa", title: "In-text questions (NCERT)", items: [
        ["1. On what factors does the resistance of a conductor depend?", "On its length, its area of cross-section and the nature of its material (and also on its temperature)."],
        ["2. Will current flow more easily through a thick wire or a thin wire of the same material, when connected to the same source? Why?", "Through the thick wire. Resistance is inversely proportional to the area of cross-section, so the thick wire has less resistance and allows a larger current."],
        ["3. The resistance of a component stays constant while the potential difference across it decreases to half. What change occurs in the current?", "I = V ÷ R, so with R constant the current also becomes half."],
        ["4. Why are coils of electric toasters and electric irons made of an alloy rather than a pure metal?", "An alloy has a higher resistivity and does not oxidise (burn) readily at high temperatures, so the coil gets very hot and lasts long."],
        ["5. Use the table to answer: (a) Which among iron and mercury is a better conductor? (b) Which material is the best conductor?", "(a) Iron, because its resistivity (10.0 × 10^{-8} Ω m) is lower than that of mercury (94.0 × 10^{-8} Ω m). (b) Silver, which has the lowest resistivity (1.60 × 10^{-8} Ω m)."],
      ] },
    ],
  },
];
