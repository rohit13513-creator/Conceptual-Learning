import type { CTopic } from "./carbonNotesTypes";

// Class X Physics, Magnetic Effects of Electric Current. Topics 12 to 18: the Competition Zone (Rohit's "Competitive Topics", beyond the textbook).

export const MAG_C: CTopic[] = [
  {
    id: "g12", category: "Competition Zone", title: "Moving Charges, Atomic Magnets and Domains", heading: "Competition Zone: Why a Magnet Is a Magnet",
    sub: "The magnetism of atoms and of a piece of iron.",
    blocks: [
      { t: "note", title: "Competition Zone", s: "These topics go a step beyond the textbook. They are often asked in competitive examinations and form the base of the next level of study of electromagnetism." },
      { t: "h", s: "Moving charges produce magnetism" },
      { t: "ul", items: [
        "Every magnetic field is produced by **moving electric charges**. A charge at rest gives only an electric field; when it moves it also gives a magnetic field.",
        "An electric current is a stream of moving electrons, so a current-carrying wire is surrounded by a magnetic field. The faster the charges move, or the more charges pass per second, the stronger the field.",
        "Even a permanent magnet has no outside current: its magnetism comes from the motion of **electrons inside its atoms**.",
      ] },
      { t: "h", s: "Magnetism of atoms" },
      { t: "dia", id: "mg_atoms" },
      { t: "ul", items: [
        "An electron in an atom behaves like a tiny magnet for two reasons: its **orbital motion** round the nucleus (a tiny loop of current) and its **spin** about its own axis. Spin gives the main part of the magnetism of most materials.",
        "**Magnetic moment** is a measure of the strength (and direction) of a tiny magnet.",
        "Two **paired electrons** spin in opposite directions, so their effects cancel. An atom with **unpaired electrons** has a magnetic moment and behaves like a tiny atomic magnet.",
      ] },
      { t: "h", s: "Magnetic domains" },
      { t: "dia", id: "mg_domains" },
      { t: "ul", items: [
        "A **magnetic domain** is a very small region (about 0.001 mm to 1 mm) of a material such as iron, in which all the atomic magnets point in the **same direction**. A domain holds millions of atoms.",
        "In **unmagnetised iron**, every domain is strongly magnetised, but the domains point in different directions and their effects cancel.",
        "When the iron is placed in a magnetic field (for example inside a solenoid), the domains **turn and grow along the field**; when most point one way, the piece is a magnet. When all point along the field, it is **saturated** and cannot be made stronger.",
        "A magnet can be **made** by stroking an iron or steel bar many times in one direction with a magnet, by magnetic induction, or (best) by putting it inside a solenoid carrying current.",
        "A magnet **loses** its magnetism when it is heated strongly, hammered or dropped repeatedly, or placed in a solenoid carrying AC and slowly pulled out: all of these shake the domains into random directions.",
        "**Soft iron** has domains that turn and turn back very easily; **steel** has domains that are hard to turn and stay turned, so it makes a permanent magnet.",
      ] },
    ],
  },
  {
    id: "g13", category: "Competition Zone", title: "Magnetic Materials", heading: "Competition Zone: Diamagnetic, Paramagnetic, Ferromagnetic and More",
    sub: "How different materials behave near a magnet.",
    blocks: [
      { t: "dia", id: "mg_materials" },
      { t: "table", head: ["Kind", "Atomic magnets", "Near a magnet", "Examples"], rows: [
        ["**Diamagnetic**", "None (all electrons paired)", "Weakly **repelled**", "Copper, silver, gold, bismuth, lead, water, glass"],
        ["**Paramagnetic**", "Present, in random directions", "Weakly **attracted**", "Aluminium, sodium, platinum, oxygen"],
        ["**Ferromagnetic**", "Present, all parallel in domains", "**Strongly attracted**; can become a magnet", "Iron, cobalt, nickel and their alloys (steel, alnico)"],
        ["**Antiferromagnetic**", "Equal, in opposite directions", "Almost no effect", "MnO, FeO, NiO, chromium"],
        ["**Ferrimagnetic**", "Unequal, in opposite directions", "Fairly strongly attracted", "Magnetite (lodestone), ferrites"],
      ] },
      { t: "ul", items: [
        "A **diamagnetic** rod hung between the poles of a strong magnet sets itself at right angles to the field; a **paramagnetic** rod sets itself along the field. Paramagnetism becomes weaker on heating.",
        "**Superconductors** at very low temperatures are perfect diamagnetic materials: they push the field out completely, so a small magnet can float above them.",
        "**Curie temperature**: above this temperature a ferromagnetic material loses its ferromagnetism and becomes paramagnetic, because heat shakes the domains apart. It is about 770 °C for iron, 358 °C for nickel and 1115 °C for cobalt. This is why heating destroys a magnet.",
        "**Soft magnetic materials** (soft iron) are magnetised easily and lose their magnetism easily: electromagnets and the cores of motors, generators and transformers. **Hard magnetic materials** (steel, alnico, neodymium) keep their magnetism for a long time: permanent magnets in loudspeakers, motors and compasses.",
        "Ferrimagnetic materials conduct electricity very poorly, so little energy is wasted in them as heat: used in transformer cores of mobile chargers, radio antennas and fridge-door magnets.",
      ] },
    ],
  },
  {
    id: "g14", category: "Competition Zone", title: "Earth's Magnetism", heading: "Competition Zone: The Earth as a Magnet",
    sub: "Where the earth's field comes from, and how it is described.",
    blocks: [
      { t: "dia", id: "mg_earth" },
      { t: "ul", items: [
        "The earth's magnetism is **not due to a huge bar magnet inside it**: the inside of the earth is far hotter than the Curie temperature of iron.",
        "The **outer core** is molten iron and nickel, which conduct electricity. Heat from the inner core and the rotation of the earth keep this liquid metal moving in large currents, and these currents produce the field. This self-sustaining process is the **geodynamo**. So the earth's magnetism also comes from moving charges.",
        "The earth behaves as if a bar magnet lies inside it with its **south pole near the geographic north** and its north pole near the geographic south. The magnetic axis is tilted by about **11°** from the geographic axis.",
        "Outside the earth, field lines go from the southern to the northern hemisphere. The field at the surface is about **25 to 65 microtesla**, weakest near the equator and strongest near the poles. The poles drift slowly, and over hundreds of thousands of years the field has even **reversed** many times.",
      ] },
      { t: "h", s: "Elements of the earth's field" },
      { t: "ul", items: [
        "**Magnetic declination**: the angle between geographic north and the direction shown by a compass at a place. It is small in India (less than 1° to 2°).",
        "**Magnetic dip (inclination)**: the angle that the earth's field makes with the horizontal. It is **0° at the magnetic equator and 90° at the magnetic poles**.",
        "**Horizontal component** B_{H}: the part of the field along the ground, which turns a compass. If B is the total field and δ the angle of dip, B_{H} = B cos δ and the vertical component B_{V} = B sin δ. At the poles B_{H} = 0, so an ordinary compass does not work there.",
      ] },
      { t: "h", s: "Importance of the earth's field" },
      { t: "ul", items: [
        "**Navigation** with compasses.",
        "**Protection from the solar wind**: it turns away the fast charged particles of the Sun. The protected region is the **magnetosphere**.",
        "**Auroras**: some particles are guided to the poles, where they make the gases of the air glow (northern and southern lights).",
        "**Migration of animals**: birds, turtles and fish use the field to find direction.",
      ] },
    ],
  },
  {
    id: "g15", category: "Competition Zone", title: "Field Formulas and Numericals", heading: "Competition Zone: Strength of the Magnetic Field",
    sub: "The field of a wire, a coil and a solenoid by formula.",
    blocks: [
      { t: "ul", items: [
        "**Permeability** is the ability of a material to allow a magnetic field to be set up in it. The **permeability of free space** (vacuum, and very nearly air) is **μ_{0} = 4π × 10^{-7} T m per A**, so μ_{0} ÷ 2π = 2 × 10^{-7} T m per A.",
        "**Relative permeability** μ_{r}: how many times more easily a material allows the field than vacuum. It is 1 for air and several thousands for soft iron, which is why a soft iron core makes the field so much stronger.",
      ] },
      { t: "dia", id: "mg_formulas" },
      { t: "key", title: "Field of a long straight wire", s: "At a distance r from a long straight wire carrying current I: **B = μ_{0} I ÷ (2π r) = 2 × 10^{-7} × I ÷ r**. So B ∝ I (double the current, double the field) and B ∝ 1 ÷ r (double the distance, half the field). Its direction is given by the right-hand thumb rule." },
      { t: "key", title: "Field at the centre of a circular coil", s: "For a coil of n turns, radius r and current I: **B = μ_{0} n I ÷ (2r)**. B ∝ n, B ∝ I and B ∝ 1 ÷ r (a smaller coil gives a stronger field at its centre). The field is perpendicular to the plane of the coil." },
      { t: "key", title: "Field inside a long solenoid", s: "**B = μ_{0} n I**, where n = N ÷ L is the number of turns **per metre**. It does not depend on the radius and is uniform inside. With a core of relative permeability μ_{r}: B = μ_{0} μ_{r} n I. At the end of a long solenoid the field is about half of that inside." },
      { t: "qa", title: "Solved examples", items: [
        ["Find the magnetic field at a distance of 10 cm from a long straight wire carrying a current of 10 A.", "r = 0.1 m. B = 2 × 10^{-7} × 10 ÷ 0.1 = **2 × 10^{-5} T** (about half the earth's field)."],
        ["At what distance from a wire carrying 5 A is the field 1 × 10^{-5} T?", "r = 2 × 10^{-7} × I ÷ B = 2 × 10^{-7} × 5 ÷ (1 × 10^{-5}) = **0.1 m = 10 cm**."],
        ["A circular coil of 50 turns and radius 10 cm carries a current of 2 A. Find the field at its centre.", "B = μ_{0} n I ÷ (2r) = (4π × 10^{-7} × 50 × 2) ÷ (2 × 0.1) = 1.257 × 10^{-4} ÷ 0.2 = **6.28 × 10^{-4} T**."],
        ["A solenoid 50 cm long has 500 turns and carries a current of 2 A. Find the field inside it.", "n = 500 ÷ 0.5 = 1000 turns per metre. B = 4π × 10^{-7} × 1000 × 2 = **2.51 × 10^{-3} T**."],
      ] },
    ],
  },
  {
    id: "g16", category: "Competition Zone", title: "Force Formulas and Magnetic Flux", heading: "Competition Zone: Force on Wires and Charges, and Magnetic Flux",
    sub: "How big the force is, and the flux through a coil.",
    blocks: [
      { t: "key", title: "Force on a current-carrying conductor", s: "A straight conductor of length l carrying current I in a uniform field B feels the force **F = B I l sin θ**, where θ is the angle between the current and the field. At θ = 90° the force is largest, F = B I l; at θ = 0° or 180° there is no force. One **tesla** is the field in which a wire 1 m long carrying 1 A at right angles to it feels a force of 1 N." },
      { t: "qa", items: [
        ["A wire 10 cm long carrying 2 A lies at right angles to a field of 0.5 T. Find the force on it. What is the force if the wire makes 30° with the field?", "F = B I l = 0.5 × 2 × 0.1 = **0.1 N**. At 30°: F = 0.1 × sin 30° = **0.05 N**."],
      ] },
      { t: "h", s: "Force between two parallel wires" },
      { t: "dia", id: "mg_parallel" },
      { t: "ul", items: [
        "Currents in the **same direction attract**; currents in **opposite directions repel**. (For currents it is 'like attract, unlike repel', the opposite of poles and charges.) Both wires feel equal and opposite forces.",
        "Between the wires with currents in the same direction, the two fields point in opposite directions and partly cancel, so the field there is weak; outside, the fields add up. Each wire is pushed from the strong-field side towards the weak-field side, so the wires move together.",
        "For two long wires carrying I_{1} and I_{2} at a distance d, the force on each metre of length is **F ÷ l = μ_{0} I_{1} I_{2} ÷ (2π d) = 2 × 10^{-7} × I_{1} I_{2} ÷ d**. For two wires 1 m apart each carrying 1 A it is 2 × 10^{-7} N per metre. This was used to define the **ampere**.",
      ] },
      { t: "h", s: "Force on a moving charge" },
      { t: "dia", id: "mg_circle" },
      { t: "ul", items: [
        "A charge q moving with velocity v in a field B feels **F = q v B sin θ**. It is largest (q v B) at right angles to the field and zero when the charge moves along the field or is at rest.",
        "The force is always **perpendicular to the velocity**, so it changes only the direction of motion, not the speed, and does **no work**. A charge entering at right angles to a uniform field moves in a **circle of radius r = m v ÷ (q B)**.",
      ] },
      { t: "qa", items: [
        ["A proton (q = 1.6 × 10^{-19} C) moves at 2 × 10^{6} m per s at right angles to a field of 0.1 T. Find the force.", "F = q v B = 1.6 × 10^{-19} × 2 × 10^{6} × 0.1 = **3.2 × 10^{-14} N**."],
      ] },
      { t: "h", s: "Magnetic flux" },
      { t: "ul", items: [
        "**Magnetic flux Φ** is the total magnetic field passing through an area: a measure of the number of field lines crossing it. For a uniform field B through a flat area A, **Φ = B A cos θ**, where θ is the angle between the field and the normal to the area.",
        "SI unit: the **weber (Wb)**, 1 Wb = 1 T m². So the magnetic field is the flux per unit area, flux density, in T. Flux is largest (BA) when the field is perpendicular to the surface and zero when it is parallel. For a coil of N turns the flux linked is NΦ.",
      ] },
      { t: "qa", items: [
        ["A coil of area 0.02 m² is placed with its plane perpendicular to a field of 0.5 T. Find the flux through it.", "The field is perpendicular to the plane, θ = 0°, so Φ = B A = 0.5 × 0.02 = **0.01 Wb**."],
      ] },
    ],
  },
  {
    id: "g17", category: "Competition Zone", title: "Electromagnetic Induction", heading: "Competition Zone: Electromagnetic Induction, Faraday and Lenz",
    sub: "Magnetism producing electricity.",
    blocks: [
      { t: "key", title: "Electromagnetic induction", s: "The production of an electric current (or potential difference) in a conductor when the **magnetic flux linked with it changes**. It is the reverse of Oersted's discovery: here magnetism produces electricity." },
      { t: "dia", id: "mg_emi" },
      { t: "ul", items: [
        "A coil joined to a galvanometer and a bar magnet: pushing the north pole into the coil deflects the needle for a moment; holding the magnet still gives **no deflection**; pulling the magnet out deflects the needle the **opposite** way; moving the magnet **faster** gives a larger deflection. The same happens if the coil is moved instead.",
        "So a current is induced only while there is **relative motion** between the magnet and the coil, that is, while the flux through the coil is **changing**.",
        "**Two coils** on the same iron core: closing or opening the key in the primary coil makes the galvanometer of the secondary coil deflect for a moment (in opposite directions); a steady current gives no deflection. This is the working basis of the **transformer**.",
        "Ways to induce a current: moving a magnet or a coil, **rotating a coil** in a magnetic field (the generator), changing the current in a nearby coil, or changing the area of a coil in a field.",
      ] },
      { t: "ul", items: [
        "**Michael Faraday** (1791–1867), an English scientist, in 1821 made a current-carrying wire rotate around a magnet (the first motor); in 1831 he discovered electromagnetic induction and built the first dynamo (a copper disc rotated between the poles of a magnet). He also gave the idea of lines of force.",
      ] },
      { t: "key", title: "Faraday's laws", s: "**First law**: whenever the magnetic flux linked with a coil changes, an emf is induced in it; the induced current flows only as long as the flux keeps changing. **Second law**: the induced emf equals the rate of change of magnetic flux linked with the coil: **e = − N ΔΦ ÷ Δt**, and the induced current is **I = e ÷ R**. The emf is larger for a faster motion, a stronger magnet or more turns." },
      { t: "key", title: "Lenz's law", s: "The direction of the induced current is always such that it **opposes the change in magnetic flux** that produces it. When the north pole of a magnet is pushed towards a coil, the near face of the coil becomes a north pole and repels it; when it is pulled away, the near face becomes a south pole and attracts it. So work has to be done to move the magnet, and this work appears as electrical energy: Lenz's law follows the **conservation of energy**." },
      { t: "key", title: "Emf in a moving rod", s: "A rod of length l moving with speed v at right angles to a field B has an emf **e = B l v** across its ends (direction by Fleming's right-hand rule)." },
      { t: "qa", title: "Solved examples", items: [
        ["The flux through a coil of 100 turns changes from 0.05 Wb to 0.01 Wb in 0.2 s. The coil has a resistance of 10 Ω. Find the induced emf and current.", "ΔΦ = 0.01 − 0.05 = −0.04 Wb. e = −N ΔΦ ÷ Δt = −100 × (−0.04) ÷ 0.2 = **20 V**. I = e ÷ R = 20 ÷ 10 = **2 A**."],
        ["A rod 0.5 m long moves at 4 m per s perpendicular to a field of 0.2 T. Find the emf.", "e = B l v = 0.2 × 0.5 × 4 = **0.4 V**."],
      ] },
    ],
  },
  {
    id: "g18", category: "Competition Zone", title: "Electric Motor and Generator", heading: "Competition Zone: The Electric Motor and the Electric Generator",
    sub: "Two machines, two rules.",
    blocks: [
      { t: "h", s: "Electric motor" },
      { t: "key", title: "Electric motor", s: "A device that changes **electrical energy into mechanical energy**. **Principle**: a current-carrying coil in a magnetic field experiences forces; its two sides feel forces in opposite directions, so the coil rotates (the direction of each force by Fleming's left-hand rule)." },
      { t: "dia", id: "mg_motor" },
      { t: "ul", items: [
        "Parts: the **armature coil ABCD** (insulated copper wire on an axle), the **field magnet** (N and S poles), the **split-ring commutator** (two half-rings joined to the ends of the coil), the **brushes** X and Y (carbon or metal strips pressing on the split ring) and the **battery**.",
        "Working: current enters through brush X and half-ring P and flows A → B → C → D. By Fleming's left-hand rule the force on AB is downwards and on CD upwards, so the coil turns. After half a turn, P touches brush Y and Q touches X, so the current flows D → C → B → A and the forces keep the coil turning the same way.",
        "The **split ring reverses the current in the coil after every half rotation**, so that the coil keeps rotating in one direction.",
        "Commercial motors use an **electromagnet** instead of a permanent magnet, a coil with a **large number of turns** and a **soft iron core** (coil and core together form the armature). The speed can be raised by more current, more turns, a stronger field or a larger coil area.",
        "Uses: fans, mixers, washing machines, refrigerators, water pumps, computers and electric vehicles.",
      ] },
      { t: "h", s: "Electric generator" },
      { t: "key", title: "Electric generator", s: "A device that changes **mechanical energy into electrical energy**. **Principle**: electromagnetic induction. When a coil is rotated in a magnetic field, the flux through it keeps changing and a current is induced (direction by Fleming's right-hand rule)." },
      { t: "dia", id: "mg_generator" },
      { t: "ul", items: [
        "Parts of an **AC generator**: the armature coil ABCD rotated by an outside force (a turbine or engine), the field magnet, two **slip rings** R_{1} and R_{2} (full rings that turn with the coil) and the **brushes** B_{1} and B_{2} that carry the current to the outer circuit.",
        "Working: when AB moves up and CD moves down, the induced current flows A → B → C → D and out through B_{2}. After half a turn the current reverses (D → C → B → A) and goes out through B_{1}. So the current changes direction every half rotation: it is **alternating current**.",
        "In a **DC generator** a split-ring commutator is used in place of slip rings, so the current in the outer circuit flows in one direction. In power stations the coil is turned by turbines run by falling water, steam, wind or gas.",
      ] },
      { t: "table", head: ["Electric motor", "Electric generator"], rows: [
        ["Electrical energy into mechanical energy", "Mechanical energy into electrical energy"],
        ["Works on the force on a current-carrying conductor in a field", "Works on electromagnetic induction"],
        ["Direction by Fleming's left-hand rule", "Direction by Fleming's right-hand rule"],
        ["Current is supplied to the coil", "Current is taken out of the coil"],
        ["Uses a split-ring commutator", "Uses slip rings (AC) or a split ring (DC)"],
      ] },
      { t: "h", s: "Formulas at a glance" },
      { t: "table", head: ["Quantity", "Formula"], rows: [
        ["Field of a long straight wire", "B = μ_{0} I ÷ (2π r)"],
        ["Field at the centre of a circular coil", "B = μ_{0} n I ÷ (2r)"],
        ["Field inside a long solenoid", "B = μ_{0} n I (n = turns per metre)"],
        ["Force on a current-carrying conductor", "F = B I l sin θ"],
        ["Force between parallel wires (per metre)", "F ÷ l = μ_{0} I_{1} I_{2} ÷ (2π d)"],
        ["Force on a moving charge; radius of its path", "F = q v B sin θ; r = m v ÷ (q B)"],
        ["Magnetic flux", "Φ = B A cos θ"],
        ["Induced emf (Faraday's law)", "e = − N ΔΦ ÷ Δt"],
        ["Emf across a moving rod", "e = B l v"],
      ] },
    ],
  },
];
