import type { CTopic } from "./carbonNotesTypes";

// Class X Physics, Electricity (NCERT Chapter 11). Topics 1 to 3: current, potential difference, circuit diagrams and meters.
// In every text: **bold** makes bold, R1 or I2 shows a subscript, ^{..} gives a superscript. A slash is never used (the screen would show a fraction): ÷ and "per" are used.

export const ELEC_A: CTopic[] = [
  {
    id: "e1", category: "Current and circuit", title: "Electric Charge, Current and Circuit", heading: "Electric Charge, Current and Circuit",
    sub: "What flows in a wire, how it is measured, and the path it needs.",
    blocks: [
      { t: "p", s: "Electricity is a **controllable and convenient form of energy**. We can switch it on or off at will and carry it through wires to homes, schools, hospitals and industries. In this chapter we learn what electricity is made of, how it flows in a circuit, what controls the current and how a current produces heat." },
      { t: "h", s: "Electric charge" },
      { t: "ul", items: [
        "**Electric charge** is a basic property of matter, like mass. Because of it, a body pulls or pushes other charged bodies.",
        "Charges are of two kinds, **positive** and **negative**. Like charges repel each other; unlike charges attract each other.",
        "An atom has positive protons in the nucleus and negative electrons around it. Their numbers are equal, so the atom is neutral.",
        "The SI unit of charge is the **coulomb (C)**.",
        "The charge on one electron is 1.6 × 10^{-19} C. Any charge is a whole number of electrons: **Q = n e**.",
      ] },
      { t: "key", title: "Electrons in one coulomb", s: "n = Q ÷ e = 1 ÷ (1.6 × 10^{-19}) = **6.25 × 10^{18} electrons**. So 1 C is the charge of nearly 6 × 10^{18} electrons." },
      { t: "h", s: "Electric current" },
      { t: "p", s: "We know air current and water current. In the same way, when electric charge flows through a conductor (for example a metal wire), we say there is an **electric current** in it." },
      { t: "key", title: "Electric current", s: "Electric current is the **rate of flow of electric charge**. If a net charge Q flows across any cross-section of a conductor in time t, the current is **I = Q ÷ t**." },
      { t: "ul", items: [
        "SI unit of current: the **ampere (A)**, named after the French scientist André-Marie Ampère (1775–1836).",
        "**1 ampere**: the current when 1 coulomb of charge flows across a cross-section in 1 second, that is, 1 A = 1 C per 1 s.",
        "Small currents: 1 milliampere (1 mA) = 10^{-3} A and 1 microampere (1 μA) = 10^{-6} A.",
        "In metal wires, the charges that flow are **electrons**.",
      ] },
      { t: "h", s: "Electric circuit" },
      { t: "ul", items: [
        "A **continuous and closed path** of an electric current is called an **electric circuit**.",
        "In a torch, the cells (or a battery placed in the proper order) make charge flow through the bulb, and the bulb glows.",
        "The **switch** (plug key) makes or breaks the conducting link between the cell and the bulb. When the switch is off, or the circuit is broken anywhere, the current stops and the bulb does not glow.",
      ] },
      { t: "h", s: "Direction of current" },
      { t: "p", s: "When electricity was first studied, electrons were not known. So current was thought to be a flow of **positive charges**, and the direction of flow of positive charges was taken as the direction of current. This is still followed." },
      { t: "key", title: "Remember", s: "By convention, the current flows **from the positive terminal to the negative terminal** of the cell through the outside circuit. The electrons, being negative, actually move the opposite way, so the direction of current is **opposite to the flow of electrons**." },
      { t: "dia", id: "el_circuit" },
      { t: "p", s: "The current is measured by an instrument called an **ammeter**. It is always joined **in series** in the circuit through which the current is to be measured." },
      { t: "qa", title: "Solved examples", items: [
        ["Example 11.1. A current of 0.5 A is drawn by the filament of an electric bulb for 10 minutes. Find the amount of electric charge that flows through the circuit.", "I = 0.5 A, t = 10 min = 600 s. From I = Q ÷ t, Q = I t = 0.5 A × 600 s = **300 C**."],
        ["A current of 2 A flows through a wire for 4 s. How many electrons pass through any cross-section of the wire?", "Q = I t = 2 × 4 = 8 C. Number of electrons n = Q ÷ e = 8 ÷ (1.6 × 10^{-19}) = **5 × 10^{19}** electrons."],
      ] },
      { t: "qa", title: "In-text questions (NCERT)", items: [
        ["1. What does an electric circuit mean?", "An electric circuit is a continuous and closed path along which an electric current flows. It has a source (cell or battery), a switch, electrical components and connecting wires."],
        ["2. Define the unit of current.", "The unit of current is the ampere. One ampere is the current when one coulomb of charge flows through a cross-section of a conductor in one second."],
        ["3. Calculate the number of electrons constituting one coulomb of charge.", "n = Q ÷ e = 1 ÷ (1.6 × 10^{-19}) = **6.25 × 10^{18}** electrons."],
      ] },
    ],
  },
  {
    id: "e2", category: "Potential difference", title: "Electric Potential Difference", heading: "Electric Potential and Potential Difference",
    sub: "The electric push that makes charge flow.",
    blocks: [
      { t: "p", s: "What makes the electric charge flow? Think of water. Water in a perfectly horizontal tube does not flow. If one end of the tube is joined to a tank kept at a higher level, there is a **pressure difference** between the two ends and water flows out of the other end." },
      { t: "dia", id: "el_water" },
      { t: "ul", items: [
        "Charges do not flow in a copper wire by themselves. Gravity has no part to play here; the electrons move only if there is a difference of **electric pressure**, called the **potential difference**, along the conductor.",
        "The potential difference is produced by a **battery** made of one or more electric cells. The **chemical action** inside a cell creates a potential difference across its terminals, even when no current is drawn from it.",
        "When the cell is joined to a conducting circuit element, the potential difference sets the charges in motion and a current flows.",
        "To keep the current flowing, the cell has to spend the **chemical energy** stored in it.",
      ] },
      { t: "key", title: "Potential difference", s: "The electric potential difference between two points of a circuit carrying current is the **work done to move a unit charge** from one point to the other. **V = W ÷ Q**." },
      { t: "ul", items: [
        "SI unit: the **volt (V)**, named after the Italian physicist Alessandro Volta (1745–1827).",
        "**1 volt** is the potential difference between two points of a current-carrying conductor when 1 joule of work is done to move a charge of 1 coulomb from one point to the other. 1 V = 1 J per 1 C.",
        "Work done in moving a charge Q across a potential difference V is **W = V Q**.",
        "The potential difference is measured by a **voltmeter**. It is always joined **in parallel** across the two points between which the potential difference is to be measured.",
      ] },
      { t: "qa", title: "Solved examples", items: [
        ["Example 11.2. How much work is done in moving a charge of 2 C across two points having a potential difference of 12 V?", "W = V Q = 12 V × 2 C = **24 J**."],
        ["60 J of work is done in moving 5 C of charge between two points. Find the potential difference between them.", "V = W ÷ Q = 60 ÷ 5 = **12 V**."],
      ] },
      { t: "qa", title: "In-text questions (NCERT)", items: [
        ["1. Name a device that helps to maintain a potential difference across a conductor.", "A cell or a battery (a combination of cells). A generator or a solar cell also does it."],
        ["2. What is meant by saying that the potential difference between two points is 1 V?", "It means that 1 joule of work is done to move 1 coulomb of charge from one point to the other."],
        ["3. How much energy is given to each coulomb of charge passing through a 6 V battery?", "W = V Q = 6 V × 1 C = **6 J**."],
      ] },
    ],
  },
  {
    id: "e3", category: "Circuits", title: "Circuit Diagrams and Meters", heading: "Circuit Diagrams, Symbols and the Two Meters",
    sub: "How circuits are drawn, and how the ammeter and voltmeter are joined.",
    blocks: [
      { t: "p", s: "An electric circuit has a **cell (or battery), a plug key, electrical components and connecting wires**. It is easier to draw a **schematic diagram** in which each component is shown by an agreed symbol. The symbols mean the same everywhere." },
      { t: "dia", id: "el_symbols" },
      { t: "ul", items: [
        "In the symbol of a cell, the **longer line is the positive terminal** and the shorter, thicker line is the negative terminal.",
        "A **battery** is shown by several cells joined one after another (positive of one to negative of the next).",
        "A **dot** on a joint shows that the wires are connected. Wires crossing without a dot are **not** connected.",
        "A rheostat is a variable resistance. The same symbol is used for both.",
      ] },
      { t: "h", s: "The ammeter and the voltmeter" },
      { t: "table", head: ["", "Ammeter", "Voltmeter"], rows: [
        ["It measures", "Electric current (in A)", "Potential difference (in V)"],
        ["How it is joined", "In **series** with the part", "In **parallel** across the two points"],
        ["Resistance", "Very low (so it does not change the current)", "Very high (so it takes almost no current)"],
        ["Terminals", "+ towards the positive side of the cell, − towards the negative side", "+ to the point at higher potential, − to the point at lower potential"],
        ["Symbol", "A in a circle", "V in a circle"],
      ] },
      { t: "dia", id: "el_meters" },
      { t: "ul", items: [
        "In a series path the same current flows everywhere, so the whole current to be measured passes through the ammeter.",
        "Parts joined in parallel have the same potential difference, so a voltmeter joined across two points reads exactly the potential difference between them.",
        "A **rheostat** is joined in series. It is used to change the current in the circuit without changing the source.",
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["Why is an ammeter never joined in parallel?", "It has a very low resistance, so almost the whole current would rush through it. The reading would be wrong and the ammeter may be damaged."],
        ["Which end of the cell is the positive terminal in the symbol?", "The longer thin line."],
      ] },
    ],
  },
];
