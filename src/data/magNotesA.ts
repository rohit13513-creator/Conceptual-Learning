import type { CTopic } from "./carbonNotesTypes";

// Class X Physics, Magnetic Effects of Electric Current (NCERT Chapter 12). Topics 1 to 5: Oersted, magnets and field lines,
// the field of a straight wire, of a circular loop and of a solenoid. In every text: **bold** makes bold, I2 or B1 shows a subscript,
// ^{..} gives a superscript. A slash is never used (the screen would show a fraction): ÷ and "per" are used.

export const MAG_A: CTopic[] = [
  {
    id: "g1", category: "Oersted", title: "Electricity and Magnetism Are Linked", heading: "Electricity and Magnetism Are Linked",
    sub: "How a compass needle showed that a current has a magnetic effect.",
    blocks: [
      { t: "p", s: "In the chapter on Electricity we learnt about the **heating effect** of electric current. Is there another effect? We know that a **current-carrying wire behaves like a magnet**. Activity 1 shows it." },
      { t: "dia", id: "mg_oersted" },
      { t: "ol", items: [
        "Place a straight thick copper wire XY in a circuit with a cell, a resistor and a plug key. Keep the wire perpendicular to the plane of the paper.",
        "Place a small compass horizontally near the wire and see the position of its needle.",
        "Insert the key so that a current flows, and watch the needle.",
      ] },
      { t: "p", s: "The needle is **deflected**. So the current has produced a **magnetic effect**. Electricity and magnetism are linked to each other." },
      { t: "h", s: "Oersted's discovery" },
      { t: "ul", items: [
        "**Hans Christian Oersted** (1777–1851), a Danish scientist, in **1820** accidentally noticed that a compass needle kept near a wire moved when the current was switched on.",
        "When the current is switched off, the needle returns to its north–south direction. When the **current is reversed, the needle turns the other way**.",
        "A larger current gives a larger deflection.",
        "His discovery showed that electricity and magnetism are related, and it led later to technologies such as the radio, television and fibre optics. The unit of magnetic field strength in the CGS system, the oersted, is named after him.",
      ] },
      { t: "key", title: "Magnetic effect of electric current", s: "An electric current through a conductor produces a **magnetic field around it**. Charges at rest give only an electric field, but **moving charges (a current) also give a magnetic field**. The reverse effect also exists: a moving magnet can produce a current. Such effects are called **electromagnetic effects**." },
    ],
  },
  {
    id: "g2", category: "Magnets", title: "Magnets, Magnetic Field and Field Lines", heading: "Magnetic Field and Field Lines",
    sub: "The region around a magnet, and the lines that show it.",
    blocks: [
      { t: "h", s: "The compass needle and the poles" },
      { t: "ul", items: [
        "A **compass needle is a small bar magnet**. Its ends point roughly towards north and south. The end pointing to the north is the **north-seeking (north) pole**; the end pointing to the south is the **south-seeking (south) pole**.",
        "**Like poles repel and unlike poles attract** each other.",
        "Poles always occur in **pairs**: if a magnet is broken, each piece has a north and a south pole.",
        "The earth behaves like a huge bar magnet, which is why a freely hanging magnet or a compass needle settles in the north–south direction.",
      ] },
      { t: "h", s: "Magnetic field" },
      { t: "p", s: "The region surrounding a magnet in which the **force of the magnet can be detected** is its **magnetic field**. When iron filings are sprinkled around a bar magnet on a sheet of paper and the sheet is tapped, the filings arrange themselves in a pattern, along the **magnetic field lines**." },
      { t: "ul", items: [
        "Magnetic field has **both magnitude and direction**, so it is a vector quantity.",
        "The **direction** of the field at a point is the direction in which the **north pole of a compass needle** points when placed there.",
        "SI unit of magnetic field: the **tesla (T)**. A smaller unit is the gauss (G): 1 T = 10^{4} G.",
      ] },
      { t: "dia", id: "mg_barfield" },
      { t: "h", s: "Drawing a field line with a compass" },
      { t: "ol", items: [
        "Fix a bar magnet on a white paper and mark its boundary. Place a small compass near its north pole and mark the two ends of the needle.",
        "Move the needle so that its south pole is where its north pole was, and mark again. Proceed step by step till the south pole of the magnet.",
        "Join the marks by a smooth curve. This curve is a field line. Repeat from different points.",
      ] },
      { t: "key", title: "Properties of magnetic field lines", s: "(1) Outside the magnet the lines come out of the **north pole** and go into the **south pole**; inside the magnet they go from the south pole to the north pole, so field lines are **closed curves**. (2) The tangent at any point gives the **direction of the field** there. (3) The field is **stronger where the lines are crowded** (near the poles) and weaker where they are far apart. (4) **No two field lines cross** each other. (5) Equally spaced parallel lines show a **uniform field**." },
      { t: "dia", id: "mg_uniform" },
      { t: "qa", title: "In-text questions (NCERT)", items: [
        ["1. Why does a compass needle get deflected when brought near a bar magnet?", "A compass needle is itself a small magnet. The magnetic field of the bar magnet exerts forces on its poles (like poles repel, unlike poles attract), so the needle turns and settles along the field."],
        ["2. Draw magnetic field lines around a bar magnet.", "The lines come out of the north pole, curve round and go into the south pole, with arrows from N to S outside and from S to N inside; they are crowded near the poles (see the figure)."],
        ["3. List the properties of magnetic field lines.", "They start at the north pole and end at the south pole outside the magnet and are closed curves; the tangent gives the field direction; they are crowded where the field is strong; no two lines cross."],
        ["4. Why don't two magnetic field lines intersect each other?", "At a point the field has only one direction. If two lines crossed, there would be two directions at that point and a compass needle there would have to point in two directions at once, which is impossible."],
        ["5. The magnetic field in a given region is uniform. Draw a diagram to represent it.", "A uniform field is shown by parallel, equally spaced straight lines with arrows in the same direction (see the figure)."],
      ] },
    ],
  },
  {
    id: "g3", category: "Straight wire", title: "Field Due to a Straight Current-Carrying Wire", heading: "Magnetic Field Due to a Current Through a Straight Conductor",
    sub: "Circles around the wire, and the right-hand thumb rule.",
    blocks: [
      { t: "p", s: "When a straight copper wire is placed parallel to and over a compass needle and a current flows from north to south, the north pole of the needle moves towards the **east**. When the current is reversed (south to north), it moves towards the **west**. So the **direction of the magnetic field reverses when the direction of the current is reversed**." },
      { t: "dia", id: "mg_compass" },
      { t: "h", s: "The pattern of the field" },
      { t: "p", s: "A long straight thick wire is passed vertically through a cardboard and connected to a battery, rheostat, ammeter and key. When iron filings are sprinkled on the cardboard and it is tapped, the filings form **concentric circles** around the wire. These circles are the magnetic field lines." },
      { t: "dia", id: "mg_wirefield" },
      { t: "ul", items: [
        "A compass placed on a circle shows the direction of the field there. Its direction is reversed if the current is reversed.",
        "If the **current is increased**, the deflection of the compass increases: the field at a point **increases with the current** (B ∝ I).",
        "If the compass is moved farther from the wire, the deflection decreases: the field **decreases with the distance** from the wire (B ∝ 1 ÷ r). The circles become larger and larger as we move away from the wire.",
      ] },
      { t: "h", s: "Right-hand thumb rule" },
      { t: "key", title: "Right-hand thumb rule", s: "Imagine holding the current-carrying straight conductor in your **right hand** with the **thumb pointing along the current**. Then the **fingers wrap around the conductor in the direction of the field lines**. (It is also called Maxwell's corkscrew rule: a screw turned so that it moves forward along the current turns in the direction of the field.)" },
      { t: "dia", id: "mg_thumb" },
      { t: "ul", items: [
        "In diagrams a **dot** shows a current or field coming **out of** the page and a **cross** shows one going **into** the page. For a current out of the page the field lines go **anticlockwise**; for a current into the page they go **clockwise**.",
      ] },
      { t: "qa", title: "Solved example (Example 12.1)", items: [
        ["A current through a horizontal power line flows in the east to west direction. What is the direction of the magnetic field at a point directly below it and at a point directly above it?", "Point the right thumb from east to west. The field turns in a plane perpendicular to the wire: **clockwise when viewed from the east end** and anticlockwise when viewed from the west end. So directly below the wire the field points towards the **south** and directly above it towards the **north**."],
      ] },
    ],
  },
  {
    id: "g4", category: "Circular loop", title: "Field Due to a Circular Loop and Coil", heading: "Magnetic Field Due to a Current Through a Circular Loop",
    sub: "Circles that become straight lines at the centre.",
    blocks: [
      { t: "p", s: "Suppose a straight wire is bent into a circular loop and a current is passed through it. At every point of the loop, the field lines are concentric circles around the wire that become **larger and larger** as we move away from the wire. By the time we reach the **centre** of the loop the arcs of these big circles appear as **straight lines**." },
      { t: "dia", id: "mg_loop" },
      { t: "ul", items: [
        "By the right-hand rule, **every section of the wire gives a field in the same direction inside the loop**, so the fields add up and the field at the centre is strong.",
        "The field produced by a current-carrying wire at a point depends **directly on the current**. So a coil of **n turns** gives a field **n times** as large as a single turn, because the current in every turn has the same direction and the fields of all turns add up.",
        "The field at the centre is stronger for a **smaller radius** of the coil.",
        "**Clock rule**: looking at a face of the coil, if the current flows **anticlockwise** that face behaves as a **north pole**; if **clockwise**, as a **south pole**.",
      ] },
      { t: "qa", title: "In-text question (NCERT)", items: [
        ["Consider a circular loop of wire lying in the plane of the table. Let the current pass through the loop clockwise. Apply the right-hand rule to find out the direction of the magnetic field inside and outside the loop.", "Apply the right-hand thumb rule to a small part of the loop, with the thumb along the clockwise current. The fingers go **into the table inside the loop** and **out of the table outside the loop**. So the field is directed into the table (downwards) inside the loop and out of the table (upwards) outside it."],
      ] },
      { t: "qa", title: "True or false (Exercise 3 a)", items: [
        ["The field at the centre of a long circular coil carrying current will be parallel straight lines.", "True. Near the centre of a circular coil, the arcs of the large circles look like parallel straight lines."],
      ] },
    ],
  },
  {
    id: "g5", category: "Solenoid", title: "Solenoid and Electromagnet", heading: "Magnetic Field Due to a Current in a Solenoid",
    sub: "A coil that behaves like a bar magnet, and the electromagnet.",
    blocks: [
      { t: "key", title: "Solenoid", s: "A **solenoid** is a coil of **many circular turns of insulated copper wire wrapped closely in the shape of a cylinder**." },
      { t: "dia", id: "mg_solenoid" },
      { t: "ul", items: [
        "The field pattern of a current-carrying solenoid is **similar to that of a bar magnet**: one end behaves as a **north pole** and the other end as a **south pole**. The poles can be found by the clock rule.",
        "Inside the solenoid the field lines are **parallel straight lines**, so the magnetic field is the **same at all points inside**: it is **uniform**.",
        "The field increases with the number of turns and with the current. It becomes much stronger when a piece of **soft iron** is put inside.",
      ] },
      { t: "h", s: "Electromagnet" },
      { t: "p", s: "The strong magnetic field inside a solenoid can **magnetise a piece of magnetic material**, like soft iron, placed inside the coil. The magnet so formed is called an **electromagnet**." },
      { t: "dia", id: "mg_electromagnet" },
      { t: "ul", items: [
        "An electromagnet is a **core of soft iron wrapped around with a coil of insulated copper wire**. It is a magnet only while the current flows. The wire is insulated so that the current goes round every turn.",
        "**Soft iron** is used because it is magnetised easily and strongly, and it **loses its magnetism almost completely when the current is switched off**. Steel keeps its magnetism, so a steel rod in a solenoid becomes a **permanent magnet**.",
        "Its strength depends on the **number of turns**, the **current** and the **nature of the core** (soft iron makes it very strong).",
        "Uses: electric bells, cranes that lift iron scrap, relays, motors, loudspeakers and MRI machines.",
      ] },
      { t: "table", head: ["Solenoid or electromagnet", "Bar magnet"], rows: [
        ["Temporary magnet; works only while current flows", "Permanent magnet"],
        ["Strength can be changed (current, turns, core)", "Strength is fixed"],
        ["Poles can be reversed by reversing the current", "Poles cannot be changed"],
        ["Field inside is uniform", "Field inside is not uniform"],
      ] },
      { t: "key", title: "Two ways of producing a magnetic field", s: "A magnetic field can be produced by (1) a **permanent magnet**, and (2) a **current-carrying conductor** (a straight wire, a circular coil or a solenoid, which with a soft iron core is an electromagnet)." },
      { t: "qa", title: "In-text and exercise questions (NCERT)", items: [
        ["The magnetic field inside a long straight solenoid carrying current (a) is zero (b) decreases as we move towards its end (c) increases as we move towards its end (d) is the same at all points.", "(d) is the same at all points. Inside a long solenoid the lines are parallel straight lines, so the field is uniform."],
        ["List two methods of producing magnetic fields.", "(i) Using a permanent magnet such as a bar magnet. (ii) Passing an electric current through a conductor such as a straight wire, a coil or a solenoid (an electromagnet)."],
        ["Which of the following correctly describes the magnetic field near a long straight wire? (a) straight lines perpendicular to the wire (b) straight lines parallel to the wire (c) radial lines from the wire (d) concentric circles centred on the wire.", "(d) The field consists of concentric circles centred on the wire."],
      ] },
    ],
  },
];
