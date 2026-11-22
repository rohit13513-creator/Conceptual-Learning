import type { CTopic } from "./carbonNotesTypes";

// Class VIII Science, Electricity: Magnetic and Heating Effects (NCERT Chapter 4). Topics 18 to 24: the Competition Corner. These go a step beyond
// the textbook, with ideas from the Class X chapters on Electricity and on Magnetic Effects of Electric Current. Same writing rules as emNotesA.ts.

export const EM_C: CTopic[] = [
  {
    id: "c1", category: "Competition Corner", title: "Direction of the Field: Right-hand Thumb Rule", heading: "Competition Corner: The Field Round a Straight Wire",
    sub: "Which way does the compass needle turn, and why?",
    blocks: [
      { t: "note", title: "Competition Corner", s: "These topics go a step beyond the textbook. They bring in ideas from Class X (Electricity, and Magnetic Effects of Electric Current) and are useful for Olympiads and other competitive tests. First be sure of the NCERT chapter, then enjoy these." },
      { t: "dia", id: "em_thumb" },
      { t: "key", title: "Right-hand thumb rule", s: "Imagine holding the wire in your **right hand** with the **thumb along the direction of the current**. The **curled fingers** show the **direction of the magnetic field** round the wire." },
      { t: "ul", items: [
        "The field lines of a straight wire are **concentric circles** with the wire at the centre, in planes at right angles to the wire.",
        "Current **into the page**: the field is **clockwise**. Current **out of the page**: the field is **anticlockwise**.",
        "The **north pole of a compass needle** points along the direction of the field. So **reversing the current reverses the deflection** of the needle.",
        "The field is **stronger near the wire** and **weaker farther away**. A **larger current** gives a **stronger** field.",
        "Two field lines **never cross** each other.",
      ] },
      { t: "table", head: ["Current in the wire", "Field above the wire", "Field below the wire"], rows: [
        ["Flowing **north**", "Points **east**", "Points **west**"],
        ["Flowing **south**", "Points **west**", "Points **east**"],
      ] },
      { t: "p", s: "This is why in Activity 4.1 the needle deflects **one way** when the compass is **under** the wire and the **opposite way** when it is **above** the wire." },
      { t: "note", title: "For the curious (Class X)", s: "At a distance r from a long straight wire carrying a current I, the field is B = μ_{0} I ÷ (2 π r). So B is **directly proportional to the current** and **inversely proportional to the distance**. Doubling the current doubles the field; doubling the distance halves it." },
      { t: "qa", title: "Check yourself", items: [
        ["A current flows into the page. Is the field round the wire clockwise or anticlockwise?", "**Clockwise.**"],
        ["The current in a wire is doubled. What happens to the field at the same point?", "The field becomes **double** (it is directly proportional to the current)."],
      ] },
    ],
  },
  {
    id: "c2", category: "Competition Corner", title: "The Solenoid and Its Field", heading: "Competition Corner: A Long Coil Is a Bar Magnet",
    sub: "Field lines, the clock rule and the factors that decide the strength.",
    blocks: [
      { t: "p", s: "A **solenoid** is a long coil of many circular turns of insulated wire. The electromagnet of Activity 4.3 is a short solenoid." },
      { t: "dia", id: "em_solenoid" },
      { t: "ul", items: [
        "The magnetic field of a current-carrying solenoid looks **exactly like that of a bar magnet**: lines come **out of the north pole end**, go round outside and **enter the south pole end**. Inside the solenoid they run from the south to the north end.",
        "**Inside** a long solenoid the field is **strong and uniform** (the lines are parallel and equally spaced).",
        "**Clock rule for the poles:** look at one end of the coil. If the current there flows **anticlockwise**, that end is a **north pole**. If it flows **clockwise**, that end is a **south pole**.",
        "A solenoid with an **iron core** becomes a **very strong** electromagnet, because the iron itself is magnetised by the field.",
      ] },
      { t: "table", head: ["Strength of a solenoid", "Depends on"], rows: [
        ["Number of turns", "More turns per unit length: **stronger** field"],
        ["Current", "More current: **stronger** field"],
        ["Core", "A **soft iron** core makes it very much stronger; air, wood or plastic make no difference"],
        ["Direction of the current", "Does **not** change the strength; it **reverses the poles**"],
      ] },
      { t: "table", head: ["", "Bar magnet", "Electromagnet"], rows: [
        ["Type", "Permanent", "**Temporary**: only while the current flows"],
        ["Strength", "Fixed", "Can be **changed** (current, turns)"],
        ["Poles", "Fixed", "Can be **reversed** (reverse the current)"],
        ["Switching off", "Not possible", "Possible: switch off the current"],
      ] },
      { t: "note", title: "For the curious (Class X)", s: "Inside a long solenoid the field is B = μ_{0} n I, where n is the number of turns per metre and I the current. For n = 500 turns per metre and I = 2 A: B = 4 π × 10^{-7} × 500 × 2 ≈ 1.26 × 10^{-3} tesla. Doubling the current or the number of turns per metre doubles B." },
      { t: "qa", title: "Check yourself", items: [
        ["Coil A has 100 turns and carries 1 A. Coil B has 50 turns and carries 2 A. Same size, same iron core. Which is the stronger electromagnet?", "**Both are equal.** The strength depends on turns × current: 100 × 1 = 100 and 50 × 2 = 100."],
        ["Seen from one end, the current in a solenoid is clockwise. What is the pole at that end?", "A **south pole** (anticlockwise gives a north pole)."],
      ] },
    ],
  },
  {
    id: "c3", category: "Competition Corner", title: "Soft Iron, Steel and the Electric Bell", heading: "Competition Corner: Temporary and Permanent Magnets, and Uses",
    sub: "Why soft iron is used in electromagnets, and how an electric bell rings.",
    blocks: [
      { t: "table", head: ["", "Soft iron", "Steel"], rows: [
        ["Becomes a magnet", "**Quickly** and strongly", "With more difficulty"],
        ["Loses its magnetism", "**Quickly**, when the current stops (temporary magnet)", "Keeps it for a long time (**permanent magnet**)"],
        ["Used for", "**Cores of electromagnets**, electric bells, cranes", "**Permanent magnets**, compass needles"],
      ] },
      { t: "p", s: "That is why a lifting electromagnet has a **soft iron core**: it must lose its magnetism at once when the current is switched OFF, so that the load is released." },
      { t: "h", s: "How the electric bell works" },
      { t: "dia", id: "em_bell" },
      { t: "ol", items: [
        "On **pressing the switch**, current flows through the coils and the iron core becomes an **electromagnet**.",
        "The electromagnet **attracts the soft iron armature**; the **hammer** attached to it strikes the **gong** and the bell rings.",
        "As the armature moves, its **contact with the screw is broken**, so the circuit breaks and the current stops.",
        "The core **loses its magnetism**; the armature **springs back** and touches the contact screw again.",
        "The current flows again and the process **repeats very fast** for as long as the switch is pressed: the hammer keeps hitting the gong.",
      ] },
      { t: "table", head: ["Device", "What the electromagnet does"], rows: [
        ["**Lifting crane**", "Lifts and releases iron and steel scrap when switched ON and OFF"],
        ["**Electric bell**", "Pulls the armature again and again so that the hammer strikes the gong"],
        ["**Electric motor and fan**", "A current-carrying coil in a magnetic field is made to turn (Class X)"],
        ["**Loudspeaker**", "A coil moving in a magnetic field shakes a cone to make sound (Class X)"],
        ["**Relay and circuit breaker**", "A small current in an electromagnet switches a big circuit ON or OFF"],
        ["**Medical scanners (MRI)**", "Very strong electromagnets give a strong magnetic field"],
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["Why is the core of an electromagnet made of soft iron and not steel?", "Soft iron is magnetised and **demagnetised quickly**; steel would **stay magnetised** when the current stops."],
        ["In an electric bell, why does the hammer keep striking?", "The contact breaks each time the armature is pulled, the magnetism is lost, the armature springs back, and the current **flows again**: the cycle repeats."],
      ] },
    ],
  },
  {
    id: "c4", category: "Competition Corner", title: "Resistance and Joule's Law of Heating", heading: "Competition Corner: How Much Heat? H = I^{2} R t",
    sub: "The rule behind every heater, with solved numericals.",
    blocks: [
      { t: "key", title: "Resistance (Class X idea)", s: "The **resistance** of a wire is larger when it is **longer**, when it is **thinner** and when its **material** is a poor conductor. R = ρ l ÷ A, where l is the length, A the area of cross-section and ρ (rho) the **resistivity** of the material. The unit of resistance is the **ohm (Ω)**. Resistance is more for **nichrome** than for **copper**." },
      { t: "table", head: ["Change", "Resistance of the wire"], rows: [
        ["Length doubled", "Becomes **double**"],
        ["Thickness (area) doubled", "Becomes **half**"],
        ["Copper replaced by nichrome", "Becomes **much more**"],
      ] },
      { t: "key", title: "Joule's law of heating", s: "When a current I flows through a resistance R for a time t, the heat produced is **H = I^{2} R t** (in **joule**). So the heat is directly proportional to the **square of the current**, to the **resistance** and to the **time**." },
      { t: "table", head: ["If you", "The heat produced becomes"], rows: [
        ["Double the current (same R and t)", "**4 times** (2^{2} = 4)"],
        ["Double the time (same I and R)", "**2 times**"],
        ["Double the resistance (same I and t)", "**2 times**"],
        ["Halve the current", "**One-fourth**"],
      ] },
      { t: "h", s: "Why do the filament and the heater glow but the wires do not?" },
      { t: "p", s: "The same current flows through the filament and through the connecting wires (they are in series). The filament has a **very high resistance** and the copper wires a **very low** one. As H = I^{2} R t, the heat is large in the filament and almost nothing in the wires." },
      { t: "ul", items: [
        "**Heating elements** are made of an alloy like **nichrome**: high resistance and a **high melting point**, and it does not burn away easily when red hot.",
        "The **filament of a bulb** is a thin wire of **tungsten**, which has a very high melting point (about 3400 °C).",
        "A **fuse** is a thin wire of a metal with a **low melting point**. If the current becomes too large, the wire **melts**, the circuit breaks and the appliance is saved: a safety device against overheating.",
      ] },
      { t: "h", s: "Solved numericals" },
      { t: "qa", items: [
        ["A current of 2 A flows for 30 s through a resistance of 10 Ω. Find the heat produced.", "H = I^{2} R t = 2 × 2 × 10 × 30 = **1200 J**."],
        ["A 6 V cell is joined to a wire of resistance 20 Ω. Find the current, and the heat in 100 s.", "I = V ÷ R = 6 ÷ 20 = **0.3 A**. H = I^{2} R t = 0.3 × 0.3 × 20 × 100 = **180 J**."],
        ["A current of 3 A flows through 4 Ω for 10 s. What is the heat produced?", "H = 3 × 3 × 4 × 10 = **360 J**."],
        ["The current through a heater is doubled. By what factor does the heat per second change?", "It becomes **4 times**, as the heat is proportional to I^{2}."],
      ] },
      { t: "note", title: "In the school activity", s: "In Activity 4.5, the thinner and the shorter nichrome wire feel hotter to the touch. They have less material to warm up, and they carry the current of the same cell. The full reasoning, with the internal resistance of the cell, belongs to higher classes. For now remember the NCERT result and the rule H = I^{2} R t." },
    ],
  },
  {
    id: "c5", category: "Competition Corner", title: "Electric Power, Energy and the Bill", heading: "Competition Corner: Power, kilowatt-hour and Loss in Transmission",
    sub: "How fast the energy is used, and why electricity is sent at high voltage.",
    blocks: [
      { t: "key", title: "Electric power and energy", s: "**Power** is the rate at which electrical energy is used or changed into heat or light: **P = V × I** (voltage × current), in **watt (W)**. **Energy = Power × time**. The unit of the electricity bill is the **kilowatt-hour (kWh)**, called **one unit**." },
      { t: "table", head: ["Quantity", "Formula", "Unit"], rows: [
        ["Power", "P = V × I", "watt (W); 1 kilowatt = 1000 W"],
        ["Energy used", "E = P × t", "watt-hour; kilowatt-hour (kWh)"],
        ["1 kWh", "1 kilowatt for 1 hour", "= 3 600 000 J (3.6 × 10^{6} J)"],
        ["Heat produced", "H = I^{2} R t", "joule (J)"],
      ] },
      { t: "h", s: "Solved numericals" },
      { t: "qa", items: [
        ["An appliance works at 220 V and draws 5 A. What is its power?", "P = V × I = 220 × 5 = **1100 W**."],
        ["A 60 W bulb is used for 5 hours every day for 30 days. How many units of energy does it use? What is the cost at ₹7 per unit?", "Energy = 60 × 5 × 30 = 9000 Wh = **9 kWh** (9 units). Cost = 9 × 7 = **₹63**."],
        ["A 1000 W heater works for 2 hours. How much energy does it use in kWh?", "1 kW × 2 h = **2 kWh**."],
        ["Find the current and the resistance of a 1000 W heater working at 220 V.", "I = P ÷ V = 1000 ÷ 220 ≈ **4.5 A**. R = V^{2} ÷ P = 220 × 220 ÷ 1000 = **48.4 Ω**."],
        ["How many joules of heat does a 1000 W heater give in 1 minute?", "1000 W means 1000 J per second. 1000 × 60 = **60 000 J**."],
      ] },
      { t: "h", s: "Why is electricity sent at high voltage? (energy loss in transmission)" },
      { t: "ul", items: [
        "The NCERT chapter says energy is **lost as heat in the wires** during transmission. The heat lost in the wires of resistance R is **I^{2} R** every second.",
        "A power station sends the power P = V × I. If the **voltage is made 10 times** larger, the **current becomes one-tenth** (for the same power).",
        "The loss I^{2} R then becomes **one-hundredth**. That is why electricity is sent over long distances at **very high voltage** and brought down by transformers before it reaches our homes.",
      ] },
    ],
  },
  {
    id: "c6", category: "Competition Corner", title: "Cells and Batteries in Depth", heading: "Competition Corner: Series, Parallel and the Kinds of Cells",
    sub: "Voltage, reactive metals, primary and secondary cells.",
    blocks: [
      { t: "dia", id: "em_series" },
      { t: "table", head: ["", "In series", "In parallel"], rows: [
        ["Joining", "Positive of one to the **negative of the next**", "All positives together, all negatives together"],
        ["Voltage", "**Adds up**: three 1.5 V cells give 4.5 V", "Stays that of **one cell**: 1.5 V"],
        ["Use", "When a **higher voltage** is needed (brighter lamp, more deflection)", "When the **cells must last longer**"],
      ] },
      { t: "p", s: "A battery of **three cells in series with one cell wrongly connected** gives 1.5 + 1.5 − 1.5 = **1.5 V**: the reversed cell cancels one good cell. A lemon gives only a small voltage, so **several lemons are joined in series** to light an LED." },
      { t: "h", s: "Which electrode is positive?" },
      { t: "ul", items: [
        "In a Voltaic cell the **more reactive metal** is the **negative** electrode (zinc is negative against copper; iron is negative against copper in the lemon cell) and the **less reactive metal** is the **positive** electrode.",
        "The two electrodes must be **different metals**: two copper rods in lemon juice give no current.",
        "**Conventional current** flows from the **positive terminal through the circuit to the negative terminal**; the electrons actually move the other way round.",
      ] },
      { t: "table", head: ["Kind", "Examples", "Use"], rows: [
        ["**Primary cell** (single use)", "Dry cell (zinc and carbon)", "Torch, remote, wall clock"],
        ["**Secondary cell** (rechargeable)", "Lead-acid, nickel-cadmium, **lithium-ion**", "Vehicles and inverters, laptops and phones"],
      ] },
      { t: "ul", items: [
        "A cell does **not store electric current**: it stores **chemical energy** and changes it into electrical energy. A dead cell has **used up its chemicals**, not its current.",
        "**Never short-circuit** a cell (joining its two terminals directly with a wire): the large current heats the wire and the cell. **Never heat, open or burn** a battery.",
        "Do not mix **old and new cells** in one device.",
      ] },
    ],
  },
  {
    id: "c7", category: "Competition Corner", title: "Practice: Tricky Questions and Formulas", heading: "Competition Corner: Practise Like a Champion",
    sub: "Questions with answers, common mistakes and a formula sheet.",
    blocks: [
      { t: "table", head: ["Formula sheet", "Meaning"], rows: [
        ["B = μ_{0} I ÷ (2 π r)", "Field of a long straight wire (Class X)"],
        ["B = μ_{0} n I", "Field inside a long solenoid (Class X)"],
        ["R = ρ l ÷ A", "Resistance of a wire"],
        ["H = I^{2} R t", "Heat produced (Joule's law)"],
        ["P = V × I", "Electric power"],
        ["E = P × t;  1 kWh = 3.6 × 10^{6} J", "Energy and the unit of the bill"],
      ] },
      { t: "h", s: "Tricky questions" },
      { t: "qa", items: [
        ["The battery of an electromagnet is reversed. What changes and what stays the same?", "The **poles reverse** and the compass deflects the **opposite way**. The **strength stays the same**."],
        ["Why does a coil on an iron nail pick up more clips than the same coil on a wooden rod?", "The iron is **magnetised by the field of the coil**, which adds to it. Wood is not magnetic and adds nothing."],
        ["A nichrome wire and a copper wire of the same size and length carry the same current for the same time. Which produces more heat and why?", "**Nichrome**: it has a higher resistance, and H = I^{2} R t."],
        ["Why does the filament of a bulb glow but the connecting wire stay cool?", "The same current flows in both, but the **filament has a very high resistance** (thin, long coil), so H = I^{2} R t is large only there."],
        ["Three 1.5 V cells are joined in series but one is connected the wrong way round. What is the voltage of the battery?", "1.5 + 1.5 − 1.5 = **1.5 V**."],
        ["Coil A (100 turns, 1 A) and coil B (50 turns, 2 A) have the same size and core. Compare their strength.", "**Equal**: turns × current is 100 in both."],
        ["A 100 W bulb glows for 10 hours. How many units of electricity are used?", "100 × 10 = 1000 Wh = **1 kWh = 1 unit**."],
        ["Why is a fuse wire made of a metal with a low melting point?", "So that it **melts quickly** when the current is too large and **breaks the circuit**."],
        ["Why does a student leaving the switch of a lifting model ON for a long time find the clips falling off?", "The **cell has been used up**, the current falls and the magnetic field becomes too weak."],
        ["The compass above a wire deflects east when the current flows north. Where will it point when placed below the wire?", "**West**: the field below the wire is opposite to the field above it."],
      ] },
      { t: "h", s: "Common mistakes" },
      { t: "table", head: ["Wrong idea", "Correct idea"], rows: [
        ["An electromagnet stays magnetic after the switch is off", "It **loses its magnetism** when the current stops"],
        ["Only an iron coil deflects a compass", "A coil of **any metal** carrying current does; iron only makes it **stronger**"],
        ["A dry cell is less portable than a Voltaic cell", "A dry cell is **more portable** (no liquid)"],
        ["A thicker wire gets hotter", "A **thinner** wire heats up more in the activity"],
        ["Pure water can be the electrolyte", "Pure water hardly conducts, so the LED does **not** glow"],
        ["A dead battery is safe garbage", "It still has acids and metals: give it to an **e-waste** facility"],
      ] },
    ],
  },
];
