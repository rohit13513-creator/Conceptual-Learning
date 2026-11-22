import type { CTopic } from "./carbonNotesTypes";

// Class VIII Science, Electricity: Magnetic and Heating Effects (NCERT Chapter 4). Topics 1 to 7: the magnetic effect of current and electromagnets.
// In every text: **bold** makes bold, cm^{3} gives a superscript. A slash is never used (the screen would show a fraction): "per", "or" and ÷ are used.

export const EM_A: CTopic[] = [
  {
    id: "e1", category: "Introduction", title: "Three Effects of Electric Current", heading: "What Can an Electric Current Do?",
    sub: "A science exhibition, an electromagnet and three effects.",
    blocks: [
      { t: "p", s: "At the school science exhibition, Mohini and Aakarsh saw a working model of a **lifting electromagnet** made by their senior, Sumana. Instead of a hook, an **iron nail wrapped with a wire** was joined to a battery. When Sumana **closed the circuit**, the nail picked up iron paper clips like a magnet. When she **opened the circuit**, the clips fell off. There was **no magnet** in the model, only an electric circuit!" },
      { t: "dia", id: "em_three" },
      { t: "table", head: ["Effect", "What happens", "Example"], rows: [
        ["**Magnetic effect**", "A current-carrying wire or coil acts like a **magnet**", "Electromagnet, electric bell, motor, fan"],
        ["**Heating effect**", "A current-carrying wire gets **hot**", "Room heater, electric iron, kettle"],
        ["**Chemical reactions**", "Chemical reactions inside a **cell or battery** produce the current", "Voltaic cell, dry cell, mobile battery"],
      ] },
      { t: "note", title: "Probe and ponder: think about these", s: "If you have no electric lamp in a circuit, is there another way to know that **current is flowing**? Can we make **temporary magnets**? How is **heat generated in electrical appliances**? How do we know that a cell is **dead**, and can all cells be **recharged**? This chapter answers all four questions." },
      { t: "qa", title: "Check yourself", items: [
        ["Name the three things you will study in this chapter.", "The **magnetic effect** of electric current, the **heating effect** of electric current, and how **cells and batteries** make electricity by chemical reactions."],
        ["Was there a magnet in Sumana's lifting model?", "**No.** The iron nail wrapped with a wire became a magnet only while the **current** flowed."],
      ] },
    ],
  },
  {
    id: "e2", category: "Magnetic effect", title: "Magnetic Effect of Electric Current", heading: "Does an Electric Current Have a Magnetic Effect?",
    sub: "Oersted's discovery with a compass needle.",
    blocks: [
      { t: "act", title: "Activity 4.1: Does the compass needle react to a current?",
        steps: ["Make a switch with two drawing pins, a safety pin and a piece of cardboard. Place a cell in a cell holder.", "Fix two nails to a cardboard and stretch the middle of a long wire between them, slightly above the cardboard. Join one end of the wire to the cell holder and the other end to the switch. Join the second wire between the cell holder and the switch.", "Place a magnetic compass beneath the wire between the two nails.", "Watch the compass needle and move the switch to ON, then to OFF, a few times."],
        see: ["Switch ON: the compass needle is **deflected** from its original direction.", "Switch OFF: the needle **returns** to its original direction."],
        why: ["The compass needle is a tiny magnet. It deflects only when a **magnet** is brought near it, and the effect can act **through any non-magnetic material** kept in between. So a current-carrying wire has a **magnetic effect**. When the current stops, the effect disappears."] },
      { t: "dia", id: "em_oersted" },
      { t: "key", title: "Magnetic effect of electric current", s: "When **electric current flows through a conductor** (like a wire), it produces a **magnetic field** around it. This is the **magnetic effect of electric current**. The magnetic field **disappears when the current stops**." },
      { t: "dia", id: "em_field" },
      { t: "ul", items: [
        "**Magnetic field:** the region around a magnet or a current-carrying wire where its magnetic effect can be felt, for example by the **deflection of a compass needle**.",
        "A compass can be used **in place of a lamp** to find out whether current is flowing in a circuit.",
        "Electricity and magnetism are **linked**. The effect is used in **electromagnets, electric bells, motors, fans and loudspeakers**.",
      ] },
      { t: "note", title: "Be a scientist: Hans Christian Oersted (1777 to 1851)", s: "**Oersted**, a professor at a university in **Denmark**, made this discovery in **1820**. While giving a demonstration he noticed that whenever an electrical circuit was **closed or opened**, the needle of a magnetic compass lying nearby **deflected**. He investigated it, and published his findings only when he was **certain** that an electric current produces a magnetic field. Other scientists then **repeated his experiment** to check the results and studied the link further." },
      { t: "qa", title: "Check yourself", items: [
        ["Why does the compass needle deflect when the switch is ON?", "The current-carrying wire produces a **magnetic field**, which acts on the needle (a tiny magnet)."],
        ["What happens to the needle when the switch is turned OFF?", "It **returns to its original direction**, because the magnetic field disappears."],
        ["Does cardboard between the wire and the compass stop the effect?", "**No.** The magnetic effect acts through any non-magnetic material."],
      ] },
    ],
  },
  {
    id: "e3", category: "Electromagnet", title: "Electromagnets", heading: "Can We Make a Magnet with an Electric Current?",
    sub: "A coil, a nail and a cell.",
    blocks: [
      { t: "act", title: "Activity 4.2: A coil on an iron nail",
        steps: ["Take about 50 cm of flexible insulated wire, an iron nail, an electric cell and a few iron paper clips.", "Wrap the wire tightly round the nail as a coil and secure it with adhesive tape.", "Join the ends of the wire to the cell, for only a few seconds, or the cell may weaken quickly.", "Bring the nail near the paper clips and lift. Then disconnect the wire from the cell."],
        see: ["While the current flows, the clips **cling** to the nail.", "When the current is stopped, the clips **fall down**."],
        why: ["A coil carrying current behaves like a **magnet** only while the current flows."] },
      { t: "dia", id: "em_coil" },
      { t: "act", title: "Activity 4.3: With and without an iron core",
        steps: ["Roll a piece of chart paper into a cylinder as wide as a pencil and wind about 50 turns of insulated wire (about 100 cm) on it. Secure it with tape.", "Place two compasses near the two ends of the coil and join the coil to a cell. Then disconnect it.", "Insert an iron nail in the paper cylinder and repeat the steps. Bring some iron clips near the ends of the nail."],
        see: ["With the current ON, the compass needles are **deflected**; with the current OFF they come back.", "With the iron nail inside, the deflection is **much more** and the iron clips are **attracted** to the ends of the nail."],
        why: ["A coil carrying current behaves like a magnet. An **iron core** makes it a much **stronger** magnet. When the current stops, it loses its magnetic effect."] },
      { t: "dia", id: "em_core" },
      { t: "key", title: "Electromagnet", s: "A **current-carrying coil that behaves as a magnet** is called an **electromagnet**. For practical use, most electromagnets have an **iron core** to make them stronger." },
      { t: "ul", items: [
        "An electromagnet is a **temporary magnet**: it works only **while current flows**.",
        "Even a **coil without the nail** still deflects a compass, but the deflection is **less**.",
        "A coil made of **any conducting metal** (iron, copper, aluminium or nichrome) deflects a compass needle when current flows through it. It is the **current** that produces the field.",
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["Define an electromagnet.", "A current-carrying coil that behaves as a magnet."],
        ["Why is an iron core put inside the coil?", "It makes the electromagnet **much stronger**."],
      ] },
    ],
  },
  {
    id: "e4", category: "Poles", title: "Poles of an Electromagnet", heading: "Does an Electromagnet Have Two Poles?",
    sub: "North and south, found with a compass.",
    blocks: [
      { t: "act", title: "Activity 4.4: Finding the poles",
        steps: ["Take the electromagnet of Activity 4.3 and a magnetic compass. Label the two ends of the coil A and B.", "Place the compass near end A and connect the coil to the cell. Note which pole of the compass needle is attracted to end A.", "Repeat the procedure for end B."],
        see: ["If the **north pole** of the compass needle is attracted to end A, then end A is a **south pole**.", "End B attracts the opposite pole of the needle, so end B is a **north pole**."],
        why: ["**Unlike poles attract** (north and south). So an electromagnet has **two poles**, north and south, just like a bar magnet."] },
      { t: "dia", id: "em_poles" },
      { t: "table", head: ["Compass needle", "Attracted to", "So that end of the coil is"], rows: [
        ["North pole of the needle", "End A", "A **south pole**"],
        ["South pole of the needle", "End B", "A **north pole**"],
      ] },
      { t: "ul", items: [
        "A bar magnet and an electromagnet both have **two poles**, north and south.",
        "Unlike poles **attract**; like poles **repel**.",
      ] },
    ],
  },
  {
    id: "e5", category: "Strength", title: "Strength and Poles of an Electromagnet", heading: "Making an Electromagnet Stronger, and Reversing Its Poles",
    sub: "More current, more turns, and a reversed battery.",
    blocks: [
      { t: "act", title: "Think like a scientist: what makes it stronger?",
        steps: ["Repeat Activity 4.3 with **2 and 4 cells** and the **same coil**.", "Repeat it with **2 cells** but a **different number of turns** of the coil.", "Make coils of **25, 50, 75 and 100 turns**, connect each to the same cell and note the compass deflection at the same place.", "Repeat Activity 4.4 by **changing the direction of the current**."],
        see: ["More cells and more turns give **more deflection** and the coil attracts **more clips**.", "On reversing the current, the **poles of the electromagnet are reversed**."],
        why: ["A single cell gives only a small current and a weak field. A battery of more cells gives a **larger current**, so a stronger field. More **turns** also make a stronger magnet."] },
      { t: "dia", id: "em_strength" },
      { t: "table", head: ["To", "Do this"], rows: [
        ["Make it **stronger**", "Increase the **current** (more cells in the battery), or increase the **number of turns**, or both"],
        ["Make it **weaker**", "Decrease the current or the number of turns"],
        ["**Reverse** the poles", "Change the **direction of the current** (reverse the battery terminals)"],
        ["**Switch it off**", "Stop the current: the field disappears"],
      ] },
      { t: "dia", id: "em_reverse" },
      { t: "ul", items: [
        "The strength can be **changed**, so the electromagnet is more useful than an ordinary magnet.",
        "On reversing the battery, the compass needle also deflects in the **opposite direction**.",
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["An electromagnet with a single cell attracts fewer clips than with a battery of 2 cells. Why?", "A single cell gives a **smaller current**, so a weaker magnetic field."],
        ["How can you change the poles of an electromagnet?", "By **reversing the direction of the current** (reversing the battery)."],
      ] },
    ],
  },
  {
    id: "e6", category: "Earth and magnets", title: "The Earth as a Magnet, and Electricity from Magnetism", heading: "A Step Further: The Earth and Moving Magnets",
    sub: "Why a compass points north, and what comes next.",
    blocks: [
      { t: "dia", id: "em_earth" },
      { t: "ul", items: [
        "A **freely suspended magnet** rests along the **north-south direction**, because the Earth itself behaves like a **giant magnet**.",
        "Deep inside the Earth, the movement of **liquid iron in the core** creates **electric currents**, which generate a magnetic field.",
        "Many **migratory birds, fish and animals** use this field to **navigate** across continents and oceans.",
        "The Earth's magnetic field acts as a **shield**, blocking harmful particles from space, and helps protect life on Earth.",
      ] },
      { t: "key", title: "Electricity from magnetism", s: "Just as **electricity can produce magnetism**, a **moving magnet can lead to an electric current**. You will learn this in higher classes. It is the basis of many devices, from **electric motors to power generators**." },
    ],
  },
  {
    id: "e7", category: "Lifting magnet", title: "Lifting Electromagnets", heading: "Lifting Electromagnets and Sumana's Model",
    sub: "Why a crane can drop what it lifts.",
    blocks: [
      { t: "dia", id: "em_crane" },
      { t: "ul", items: [
        "**Lifting electromagnets** are strong electromagnets that may be hung from **cranes**.",
        "The crane operator controls the magnet by switching the current **ON and OFF**.",
        "**Current ON:** the electromagnet lifts iron and steel objects. **Current OFF:** the magnetic field disappears and the objects are **released**.",
        "They are widely used in **factories and scrap yards** to move, lift and sort heavy metal items efficiently.",
      ] },
      { t: "note", title: "Sumana forgot to switch OFF", s: "Suppose Sumana leaves the switch of her model ON for a long time. After some time the nail **no longer picks up the clips**, but the wire is **still warm**. The **cell has been used up** (it becomes weak or dead), so the **current falls** and the magnetic effect becomes too weak. The wire is warm because of the **heating effect** of the current that flowed. Never leave a circuit connected for long." },
      { t: "qa", title: "Check yourself", items: [
        ["Why is a lifting electromagnet better than a permanent magnet for a crane?", "It can be **switched ON and OFF**, so it can pick up scrap and **release** it where needed."],
        ["Which objects does a lifting electromagnet lift?", "Objects of **iron or steel**."],
      ] },
    ],
  },
];
