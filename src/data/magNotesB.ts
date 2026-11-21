import type { CTopic } from "./carbonNotesTypes";

// Class X Physics, Magnetic Effects of Electric Current. Topics 6 to 11: force on a conductor, induced current, AC and DC,
// domestic circuits, the activities and the revision with the mind map.

export const MAG_B: CTopic[] = [
  {
    id: "g6", category: "Force on a conductor", title: "Force on a Current-Carrying Conductor", heading: "Force on a Current-Carrying Conductor in a Magnetic Field",
    sub: "Fleming's left-hand rule.",
    blocks: [
      { t: "p", s: "A current-carrying conductor produces a magnetic field, which exerts a force on a magnet kept nearby. The French scientist **André-Marie Ampère** (1775–1836) suggested that the magnet must also exert an **equal and opposite force on the current-carrying conductor**." },
      { t: "dia", id: "mg_rod" },
      { t: "ol", items: [
        "Hang a small aluminium rod AB (about 5 cm) horizontally from a stand with two connecting wires.",
        "Place a strong horseshoe magnet so that the rod lies between its poles, with the north pole below and the south pole above (field upwards).",
        "Connect the rod in series with a battery, a key and a rheostat, and pass a current from B to A. The rod is displaced towards the **left**.",
        "Reverse the current: the rod moves to the **right**. Interchange the poles of the magnet (field downwards): the direction of the force reverses again.",
      ] },
      { t: "key", title: "What the activity shows", s: "A **current-carrying conductor placed in a magnetic field experiences a force**. The direction of the force depends on **both the direction of the current and the direction of the field**. The force is **largest when the current is at right angles to the field**." },
      { t: "ul", items: [
        "The force becomes larger when the **current** is increased, when a **stronger magnet** is used and when a **longer length of the rod** is in the field.",
        "In this arrangement the force is **perpendicular to both the current and the field**.",
      ] },
      { t: "h", s: "Fleming's left-hand rule" },
      { t: "key", title: "Fleming's left-hand rule", s: "Stretch the **thumb, forefinger and middle finger of the left hand** so that they are **mutually perpendicular**. If the **forefinger** points in the direction of the **magnetic field** and the **middle finger** in the direction of the **current**, then the **thumb** points in the direction of the **motion (force)** of the conductor." },
      { t: "dia", id: "mg_fleming" },
      { t: "ul", items: [
        "Memory aid: **Fo**refinger – **Fi**eld; **C**entre (middle) finger – **C**urrent; **T**humb – **T**hrust (force).",
        "For a moving **electron**, the direction of current is **opposite** to its motion; for a moving **proton or alpha particle** it is the **same** as its motion.",
        "The force on a charged particle moving in a magnetic field is **perpendicular to its motion**, so it changes only the direction of the motion and not the speed.",
        "Devices that use this force include the **electric motor, loudspeakers, microphones** and measuring instruments such as the galvanometer.",
      ] },
      { t: "qa", title: "Solved example (Example 12.2)", items: [
        ["An electron enters a magnetic field at right angles to it, as shown (an electron moving downwards, with the field directed to the right). The direction of force on the electron is (a) to the right (b) to the left (c) out of the page (d) into the page.", "The electron moves downwards, so the current is **upwards**. The field is to the right. By Fleming's left-hand rule (forefinger right, middle finger up) the thumb points into the page. Answer **(d) into the page**."],
      ] },
      { t: "qa", title: "In-text and exercise questions (NCERT)", items: [
        ["Which of the following property of a proton can change while it moves freely in a magnetic field? (a) mass (b) speed (c) velocity (d) momentum", "**(c) velocity and (d) momentum**. The force is always perpendicular to the motion, so it changes only the direction of the motion; the speed and the mass stay the same, but velocity and momentum have direction and so change."],
        ["In Activity 12.7, how will the displacement of rod AB be affected if (i) the current is increased, (ii) a stronger horseshoe magnet is used, (iii) the length of the rod is increased?", "In all three cases the **force and so the displacement increase**: the force grows with the current, with the strength of the field and with the length of the rod in the field."],
        ["A positively charged particle (alpha particle) projected towards the west is deflected towards the north by a magnetic field. The direction of the field is (a) towards south (b) towards east (c) downward (d) upward.", "The current is in the direction of motion (west), the force (thumb) is towards the north. The forefinger then points **upward**. Answer **(d) upward**."],
        ["When is the force experienced by a current-carrying conductor placed in a magnetic field largest?", "When the direction of the current is at **right angles** (perpendicular) to the direction of the magnetic field."],
        ["An electron beam moving horizontally from the back wall towards the front wall is deflected to your right side by a strong magnetic field (you sit with your back to the back wall). What is the direction of the field?", "Electrons move front-wards, so the current is towards the back wall. The force (thumb) is to the right. By Fleming's left-hand rule the forefinger points **vertically downwards**: the field is vertically downward."],
      ] },
      { t: "note", title: "Magnetism in medicine", s: "Even the weak ion currents in the nerve cells of our body produce magnetic fields (about one-billionth of the earth's field). The field is significant in the **heart and the brain**. The magnetic field inside the body forms the basis of **Magnetic Resonance Imaging (MRI)**, which gives images of body parts that help in medical diagnosis." },
    ],
  },
  {
    id: "g7", category: "Induced current", title: "Induced Current and Fleming's Right-Hand Rule", heading: "Current Induced in a Coil Moving in a Magnetic Field",
    sub: "The reverse of Oersted's discovery, and the second Fleming rule.",
    blocks: [
      { t: "p", s: "Oersted showed that a current gives a magnetic field. The reverse also happens: a **current is produced in a conductor when it moves in a magnetic field, or when the magnetic field around it changes**. This is called an **induced current**. It is explained in detail in the Competition Zone." },
      { t: "key", title: "Fleming's right-hand rule", s: "Stretch the **thumb, forefinger and middle finger of the right hand** mutually perpendicular. If the **forefinger** points along the **magnetic field** and the **thumb** along the **motion of the conductor**, then the **middle finger** gives the direction of the **induced current**." },
      { t: "table", head: ["Fleming's left-hand rule", "Fleming's right-hand rule"], rows: [
        ["Gives the direction of the **force** on a current-carrying conductor", "Gives the direction of the **induced current**"],
        ["Thumb shows the force (motion)", "Middle finger shows the induced current"],
        ["Used for the electric motor", "Used for the electric generator"],
      ] },
      { t: "qa", title: "Exercise 7 (NCERT)", items: [
        ["State the rule to determine the direction of (i) the magnetic field produced around a straight conductor carrying current, (ii) the force experienced by a current-carrying straight conductor placed in a perpendicular magnetic field, and (iii) the current induced in a coil due to its rotation in a magnetic field.", "(i) **Right-hand thumb rule**: thumb along the current, the curled fingers give the field. (ii) **Fleming's left-hand rule**: forefinger along the field, middle finger along the current, the thumb gives the force. (iii) **Fleming's right-hand rule**: forefinger along the field, thumb along the motion, the middle finger gives the induced current."],
      ] },
    ],
  },
  {
    id: "g8", category: "AC and DC", title: "Alternating and Direct Current", heading: "Alternating and Direct Current",
    sub: "Current that flows one way, and current that keeps reversing.",
    blocks: [
      { t: "table", head: ["", "Direct current (DC)", "Alternating current (AC)"], rows: [
        ["Direction", "Flows in **one direction** only", "**Reverses** its direction at regular intervals"],
        ["Value", "Usually constant with time", "Keeps changing: rises to a maximum, falls to zero, reverses, and so on"],
        ["Frequency", "Zero", "Number of cycles per second; **50 Hz in India**"],
        ["Sources", "Cells, batteries, solar cells, DC generators", "AC generators in power stations; the mains supply"],
        ["Symbol", "A straight line, or the cell symbol", "A wavy line"],
      ] },
      { t: "dia", id: "mg_acdc" },
      { t: "ul", items: [
        "**Frequency** is the number of cycles in one second; its unit is the **hertz (Hz)**. In India the AC supply has a frequency of **50 Hz**: it completes 50 cycles every second and changes its direction **100 times** every second (twice in each cycle). The time for one cycle is 1 ÷ 50 = 0.02 s.",
        "In our houses we receive **AC electric power of 220 V with a frequency of 50 Hz**.",
      ] },
      { t: "h", s: "Advantages of AC" },
      { t: "ul", items: [
        "Its voltage can be **stepped up** for sending power over long distances and **stepped down** for safe use in homes, using transformers.",
        "Power sent at a high voltage needs a small current, so **less energy is lost as heat** in the transmission wires.",
        "AC can be changed into DC easily when needed, for example in a mobile charger, with a rectifier.",
        "DC can be stored in batteries, but AC cannot be stored.",
      ] },
    ],
  },
  {
    id: "g9", category: "Domestic circuits", title: "Domestic Electric Circuits", heading: "Domestic Electric Circuits",
    sub: "Live, neutral and earth wires, fuses and safety.",
    blocks: [
      { t: "p", s: "In our homes we receive electric power through the **main supply (mains)**, carried by overhead wires on poles or by underground cables." },
      { t: "table", head: ["Wire", "Colour of insulation", "Purpose"], rows: [
        ["**Live wire** (positive)", "**Red** (brown in new wiring)", "Brings the current to the appliance; at high potential"],
        ["**Neutral wire** (negative)", "**Black** (blue in new wiring)", "Return path of the current; at zero potential"],
        ["**Earth wire**", "**Green** (green-yellow in new wiring)", "Safety: joined to a metal plate deep in the earth near the house"],
      ] },
      { t: "ul", items: [
        "In our country the **potential difference between the live and neutral wires is 220 V**.",
        "At the meter-board the wires pass into an **electricity meter through a main fuse**. Through the **main switch** they are connected to the line wires of the house, which supply separate circuits.",
      ] },
      { t: "dia", id: "mg_domestic" },
      { t: "table", head: ["Lighting circuit (5 A)", "Power circuit (15 A)"], rows: [
        ["Bulbs, tube lights, fans, TV", "Geysers, air coolers, ACs, irons, ovens"],
        ["Thinner wires", "Thicker wires"],
        ["Fuse or MCB of 5 A", "Fuse or MCB of 15 A"],
      ] },
      { t: "h", s: "Why appliances are joined in parallel" },
      { t: "ul", items: [
        "In each circuit, different appliances are connected **across the live and neutral wires, in parallel**, so that **each appliance gets the same potential difference (220 V)**.",
        "Each appliance has a **separate switch** to turn it ON or OFF. If one appliance fails, the others keep working.",
      ] },
      { t: "h", s: "Earthing" },
      { t: "ul", items: [
        "The **metal bodies** of appliances such as the electric press, toaster, table fan and refrigerator are connected to the **earth wire**, which gives a **low-resistance conducting path** for the current.",
        "So any **leakage of current** to the metallic body keeps its potential at that of the earth (zero), and the user does **not get a severe electric shock**. (The large leakage current also blows the fuse.)",
      ] },
      { t: "h", s: "Short circuit, overloading and the fuse" },
      { t: "ul", items: [
        "A **short circuit** occurs when the **live wire and the neutral wire come into direct contact** (the insulation is damaged or there is a fault in an appliance). The resistance becomes almost zero and the current **increases heavily**.",
        "**Overloading** can occur due to a short circuit, an accidental rise in the supply voltage, or connecting too many appliances to a single socket.",
        "An **electric fuse** protects the circuit and the appliances by stopping the flow of an unduly high current. The **Joule heating** in the fuse melts it and breaks the circuit. The fuse is joined in series in the live wire.",
      ] },
      { t: "qa", title: "In-text and exercise questions (NCERT)", items: [
        ["Name two safety measures commonly used in electric circuits and appliances.", "(i) The **electric fuse** (or MCB), which breaks the circuit when the current is too high. (ii) **Earthing** of metallic appliances, which protects the user from electric shock."],
        ["An electric oven of 2 kW power rating is operated in a domestic electric circuit (220 V) that has a current rating of 5 A. What result do you expect? Explain.", "The current drawn is I = P ÷ V = 2000 ÷ 220 = **9.09 A**, which is more than the 5 A rating. The circuit is **overloaded**: the fuse will melt and cut off the supply (without a fuse the wires may overheat and catch fire). The oven should be used on a 15 A power circuit."],
        ["What precaution should be taken to avoid the overloading of domestic electric circuits?", "Do not connect too many appliances to a single socket; run high-power appliances on the 15 A circuit; use a fuse or MCB of proper rating; and keep the insulation of the wires in good condition."],
        ["What is the function of an earth wire? Why is it necessary to earth metallic appliances? (Exercise 9)", "The earth wire provides a low-resistance path to the earth for any current that leaks to the metal body, keeping the body at the potential of the earth so that the user does not get a severe shock."],
        ["When does an electric short circuit occur? (Exercise 8) At the time of a short circuit the current in the circuit (a) reduces substantially (b) does not change (c) increases heavily (d) varies continuously. (Exercise 2)", "A short circuit occurs when the live wire and the neutral wire come into direct contact. The current **increases heavily**: answer **(c)**."],
        ["True or false (Exercise 3 b): A wire with green insulation is usually the live wire of an electric supply.", "False. The wire with green insulation is the **earth wire**; the live wire has red insulation."],
      ] },
    ],
  },
  {
    id: "g10", category: "Activities", title: "Activities from the Chapter", heading: "The Seven Activities of the Chapter",
    sub: "What to do, what you see and why it happens.",
    blocks: [
      { t: "act", title: "Activity 1: A compass near a current-carrying wire",
        steps: ["Place a straight thick copper wire between the points X and Y of a circuit with a cell, a resistor and a plug key. Keep it perpendicular to the plane of the paper.", "Place a small compass horizontally near the wire and note the position of its needle.", "Insert the key so that current flows, and watch the needle."],
        see: ["The compass needle is deflected when the current flows."],
        why: ["A current through a wire produces a magnetic field around it, so electricity and magnetism are linked."] },
      { t: "act", title: "Activity 2: Iron filings around a bar magnet",
        steps: ["Fix a sheet of white paper on a drawing board.", "Place a bar magnet at its centre and sprinkle iron filings evenly around it.", "Tap the board gently."],
        see: ["The filings arrange themselves in curved lines from one pole to the other, crowded near the poles."],
        why: ["The magnet exerts a force on the filings in the region around it, its magnetic field; the filings line up along the field lines."] },
      { t: "act", title: "Activity 3: Drawing field lines with a compass",
        steps: ["Fix a bar magnet on paper, mark its boundary and place a small compass near the north pole.", "Mark the two ends of the needle, then move the compass so that its south end is where its north end was.", "Proceed step by step up to the south pole of the magnet and join the marks."],
        see: ["Near the north pole of the magnet, the south pole of the needle points towards it. The curves join the north pole to the south pole, and the deflection of the needle grows near the poles."],
        why: ["The curves are the magnetic field lines. They go from the north pole to the south pole outside the magnet."] },
      { t: "act", title: "Activity 4: Reversing the current",
        steps: ["Connect a long straight copper wire, two or three cells of 1.5 V and a plug key in series.", "Place the wire parallel to and over a compass needle and plug the key so that the current flows from north to south. Note the deflection of the north pole of the needle.", "Reverse the cell connections and note the deflection again."],
        see: ["With the current from north to south, the north pole of the needle moves towards the east.", "With the current from south to north, it moves towards the west."],
        why: ["The direction of the magnetic field produced by a current reverses when the direction of the current is reversed."] },
      { t: "act", title: "Activity 5: The field around a straight wire",
        steps: ["Pass a long straight thick copper wire vertically through the centre of a cardboard and join it between X and Y with a 12 V battery, a rheostat, an ammeter (0 to 5 A) and a key.", "Sprinkle iron filings on the cardboard, close the key and tap the cardboard.", "Place a compass at a point P on a circle and note the direction of its north pole.", "Change the current with the rheostat, then move the compass to a farther point Q, then reverse the current."],
        see: ["The filings form concentric circles around the wire.", "The deflection of the compass increases with current and decreases with distance.", "The direction of the field reverses when the current is reversed."],
        why: ["The field lines of a straight wire are concentric circles; the field is stronger for a larger current and weaker farther from the wire."] },
      { t: "act", title: "Activity 6: The field of a circular coil",
        steps: ["Pass a circular coil of many turns through two holes in a rectangular cardboard, normal to the cardboard.", "Join the coil in series with a battery, a key and a rheostat.", "Sprinkle iron filings on the cardboard, plug the key and tap the cardboard gently."],
        see: ["Near the wire the filings form small circles; near the centre of the coil they form nearly straight parallel lines."],
        why: ["The fields of all parts of the coil add up at the centre, giving a strong, nearly uniform field there."] },
      { t: "act", title: "Activity 7: Force on a current-carrying rod",
        steps: ["Hang an aluminium rod AB horizontally between the poles of a horseshoe magnet (north pole below, south pole above).", "Pass a current from B to A through the rod, using a battery, a key and a rheostat.", "Reverse the current, then interchange the poles of the magnet."],
        see: ["With the current from B to A the rod moves to the left; with the current reversed it moves to the right.", "When the poles are interchanged the direction of motion reverses again."],
        why: ["A current-carrying conductor in a magnetic field experiences a force whose direction depends on the directions of both the current and the field."] },
    ],
  },
  {
    id: "g11", category: "Revision", title: "Revision: The Whole Chapter", heading: "Revision: The Whole Chapter on One Page",
    sub: "The mind map, the rules and the points to remember.",
    blocks: [
      { t: "mindmap" },
      { t: "h", s: "The three rules of the chapter" },
      { t: "table", head: ["Rule", "What it finds", "How to apply it"], rows: [
        ["**Right-hand thumb rule**", "Direction of the **magnetic field** around a straight current-carrying wire", "Thumb along the current; the curled fingers show the field"],
        ["**Fleming's left-hand rule**", "Direction of the **force** on a current-carrying conductor in a field", "Forefinger: field; middle finger: current; thumb: force"],
        ["**Fleming's right-hand rule**", "Direction of the **induced current**", "Forefinger: field; thumb: motion; middle finger: current"],
      ] },
      { t: "h", s: "What you have learnt" },
      { t: "ul", items: [
        "A compass needle is a small magnet. A magnetic field exists in the region around a magnet, where its force can be detected. **Field lines** represent the field: they are closer together where the field is greater.",
        "A metallic wire carrying a current has a magnetic field around it. The field lines are **concentric circles** whose direction is given by the **right-hand thumb rule**.",
        "The pattern of the field depends on the **shape of the conductor**. The field of a **solenoid** is similar to that of a **bar magnet**.",
        "An **electromagnet** has a core of soft iron wrapped with a coil of insulated copper wire.",
        "A current-carrying conductor in a magnetic field experiences a force. If the field and the current are perpendicular, the force is perpendicular to both and is given by **Fleming's left-hand rule**.",
        "In our houses we receive **AC power of 220 V and 50 Hz**. The **live wire** has red insulation, the **neutral wire** black, and the **earth wire** green. The **fuse** protects circuits from short-circuiting and overloading.",
      ] },
      { t: "qa", title: "Quick revision questions", items: [
        ["Who discovered the magnetic effect of electric current and in which year?", "Hans Christian Oersted, in 1820."],
        ["What is the shape of the magnetic field lines around a straight current-carrying wire?", "Concentric circles with the wire at the centre."],
        ["What is the colour of the live, neutral and earth wires?", "Red, black and green."],
      ] },
    ],
  },
];
