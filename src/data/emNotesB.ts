import type { CTopic } from "./carbonNotesTypes";

// Class VIII Science, Electricity: Magnetic and Heating Effects (NCERT Chapter 4). Topics 8 to 17: the heating effect, cells and batteries,
// all the activities and the revision. Same writing rules as emNotesA.ts.

export const EM_B: CTopic[] = [
  {
    id: "e8", category: "Heating effect", title: "The Heating Effect of Electric Current", heading: "Does a Current-carrying Wire Get Hot?",
    sub: "Why the wire ends got warm, and what resistance has to do with it.",
    blocks: [
      { t: "p", s: "While making the electromagnet, you may have noticed that the **wire ends got warm**. Why would that happen? In this activity we use a special wire called a **nichrome wire**." },
      { t: "act", title: "Activity 4.5: Does the wire get warm? (under a teacher's supervision)",
        steps: ["Take a cardboard piece of about 10 cm × 10 cm, two nails, a nichrome wire (about 0.3 mm thick, 26 to 28 gauge, 10 cm long), a cell, a cell holder, a switch and connecting wires.", "Mount the nails on the cardboard about 5 cm apart. Tie the nichrome wire between them and make the connections with the switch OFF.", "Touch the wire. Then move the switch ON for about 30 s and back OFF. Touch the wire **momentarily** (do not hold it).", "Repeat the last two steps to confirm."],
        see: ["With the switch OFF the wire is **not warm**.", "After the current flowed, the nichrome wire feels **warm**."],
        why: ["When current flows through a conductor, it faces some **opposition (resistance)**. This resistance converts some **electrical energy into heat energy**, so the wire gets heated."] },
      { t: "dia", id: "em_heating" },
      { t: "key", title: "Heating effect of electric current", s: "The **generation of heat in a conductor** due to the flow of electric current through it is called the **heating effect of electric current**." },
      { t: "ul", items: [
        "**Resistance** is the opposition a conductor offers to the flow of current. Different conductors offer different resistance.",
        "A **nichrome wire** offers **higher resistance** than a **copper wire** of the same size and length, so it gets hotter.",
        "The **wires of the electromagnet** also got warm because of this heating effect.",
        "**Safety:** touch a heated wire only **for a moment**, and only under the supervision of a teacher.",
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["Why does a current-carrying wire become warm?", "The wire **resists** the current, and the resistance changes some **electrical energy into heat energy**."],
        ["Which wire gets hotter: copper or nichrome of the same size and length?", "**Nichrome**, because it has a higher resistance."],
      ] },
    ],
  },
  {
    id: "e9", category: "Factors", title: "What the Heat Depends On", heading: "How Much Heat Does a Wire Produce?",
    sub: "Current, material, thickness, length and time.",
    blocks: [
      { t: "act", title: "Think like a scientist: one cell or two cells? (under a teacher's supervision)",
        steps: ["Repeat Activity 4.5 with a **battery of 2 cells** for the same time.", "Take two nichrome wires of **equal length** and different thickness (about 0.3 mm and 0.6 mm). Connect them one by one in a circuit with a switch and a cell and let current flow for 30 s each. Touch the wires momentarily.", "Repeat with two wires of the **same thickness** and **different lengths**."],
        see: ["The wire heats up **more with 2 cells** than with one cell.", "The **thinner** wire heats up more than the thicker one.", "The **shorter** wire heats up more than the longer one (with the same cell)."],
        why: ["The heat generated depends on the **amount of current**, the **material, thickness and length** of the wire, and the **duration** for which the current flows."] },
      { t: "dia", id: "em_factors" },
      { t: "table", head: ["Factor", "Effect on the heat produced"], rows: [
        ["**Amount of current**", "More current, more heat (2 cells heat more than 1 cell)"],
        ["**Material** of the wire", "Nichrome produces more heat than copper"],
        ["**Thickness** of the wire", "A thinner wire heats up more"],
        ["**Length** of the wire", "A shorter wire heats up more with the same cell"],
        ["**Duration** of the current", "The longer the current flows, the more the heat"],
      ] },
    ],
  },
  {
    id: "e10", category: "Appliances", title: "Uses of the Heating Effect", heading: "Heating Appliances and Industries",
    sub: "From a room heater to a steel furnace.",
    blocks: [
      { t: "p", s: "In Class 7 you learnt that an **incandescent lamp** glows because its **filament is heated by an electric current**. That is why the incandescent torch lamp sometimes gets warm when you make it glow with a cell." },
      { t: "dia", id: "em_appliances" },
      { t: "ul", items: [
        "Many household appliances work on the **heating effect**: **electric room heaters, stoves, kettles, irons, water heating immersion rods and hair dryers**.",
        "All of them contain a **rod or a coil of wire** called a **heating element**. In some appliances the element can be seen **glowing red hot**.",
        "**Nichrome** is best suited for the heating element: it generates **more heat for a given current**.",
      ] },
      { t: "h", s: "Industries" },
      { t: "p", s: "In **steel manufacturing industries**, a specially designed **high-temperature furnace** (an enclosed space built to generate heat) uses electric current to produce heat. It is used to **melt and recycle scrap steel** into usable steel." },
      { t: "h", s: "Electric heating or firewood and charcoal?" },
      { t: "p", s: "Electric heaters and stoves are often **more convenient** than burning firewood or charcoal, with a good effect on society:" },
      { t: "ol", items: [
        "They produce **no smoke, ash or harmful gases**, so the indoor air stays clean and health is protected.",
        "They heat **quickly** and the heat can be **controlled easily**.",
        "They save the **time and effort** of collecting fuel and reduce the **cutting of trees**.",
      ] },
    ],
  },
  {
    id: "e11", category: "Safety", title: "Problems of the Heating Effect, and Safety", heading: "When the Heat Is Not Wanted",
    sub: "Energy loss, overheating and safety devices.",
    blocks: [
      { t: "p", s: "The heating effect is useful in many appliances. But sometimes it causes **problems**:" },
      { t: "ol", items: [
        "**Energy loss** in wires during **transmission** (sending electricity over long distances).",
        "**Overheating** in appliances: the plastic parts of plugs and sockets may **melt**, or even lead to **fires**.",
      ] },
      { t: "key", title: "How to stay safe", s: "To prevent unnecessary heating in household switchboards, use **wires, plugs and sockets rated for the specified electric current** of the connections. In household circuits, **safety devices** are placed in the circuit to minimise such incidents." },
      { t: "qa", title: "Check yourself", items: [
        ["Name two problems caused by the heating effect.", "Energy loss in wires during transmission, and **overheating** that may melt plugs and sockets or cause a fire."],
        ["Why should we use wires and plugs rated for the current?", "A wire not rated for the current gets **too hot**, which can damage the appliance and cause **fires**."],
      ] },
    ],
  },
  {
    id: "e12", category: "Cells", title: "Cells and Batteries: Voltaic Cell", heading: "How Does a Battery Generate Electricity?",
    sub: "The first cell, and the frog's leg.",
    blocks: [
      { t: "key", title: "Cell or battery", s: "A **cell or battery** is a device that **generates electric current because of chemical reactions** taking place inside it." },
      { t: "h", s: "Voltaic (Galvanic) cell" },
      { t: "dia", id: "em_voltaic" },
      { t: "ul", items: [
        "A **Voltaic cell**, also called a **Galvanic cell**, is one of the earliest electric cells.",
        "It has **two metal rods of different materials**, called **electrodes**, partly dipped in a liquid called the **electrolyte** (usually a weak acid or a salt solution), in a glass or plastic container.",
        "A **chemical reaction** between the rods and the electrolyte produces electricity.",
        "When the circuit is connected, current flows from the **positive terminal** through the circuit to the **negative terminal**.",
        "Over time the chemicals get **used up** and the cell stops working. It is then called **dead**.",
      ] },
      { t: "note", title: "Ever heard of: Volta and Galvani", s: "The cell is named after two Italian scientists, **Alessandro Volta** and **Luigi Galvani**. In the late **1700s**, Galvani noticed that a **dead frog's leg kicked** when touched with two different metals, copper and iron. He thought the electricity came from the frog. **Volta** believed it came from the **metals**. To test this, he used **saltwater-soaked paper** instead of the frog's leg and still got a current. So it was the **combination of metals and a liquid** that gave the current, and this led to the invention of the **first battery**." },
    ],
  },
  {
    id: "e13", category: "Lemon cell", title: "Make Your Own Cell: The Lemon Cell", heading: "A Voltaic Cell from Lemons",
    sub: "Copper, iron and lemon juice light an LED.",
    blocks: [
      { t: "act", title: "Activity 4.6: A cell from lemons",
        steps: ["Take 5 or 6 juicy lemons, copper wires or strips (1 to 2 mm thick), iron nails, one LED and some connecting wires.", "Insert a copper wire and an iron nail in each lemon, keeping them a small distance apart.", "Join the copper wire of one lemon to the iron nail of the next, and so on for all the lemons.", "Connect the LED between the copper wire of the first lemon and the iron nail of the last lemon.", "If the LED does not glow, reverse its connections."],
        see: ["The **LED glows**: the cell is working."],
        why: ["The **metal electrodes** are the copper wires and the iron nails. The **electrolyte** is the lemon juice, which helps conduct electricity. You may also use **salt solutions** instead of lemon juice."] },
      { t: "dia", id: "em_lemon" },
      { t: "ul", items: [
        "An **LED glows only in one direction**: its **longer wire** (positive) must be joined to the **positive terminal** of the battery and its **shorter wire** (negative) to the **negative terminal**.",
        "**Common metal pairs** for Voltaic cells: zinc and copper, zinc and silver, aluminium and copper, iron and copper, magnesium and copper, lead and copper.",
        "Some metals, like **copper**, act as the **positive** electrode and some, like **zinc**, as the **negative** electrode. This is due to their chemical properties, which you will study in higher classes.",
      ] },
      { t: "h", s: "Lemon juice or pure water?" },
      { t: "dia", id: "em_lemon2" },
      { t: "p", s: "An iron nail and a copper strip in **lemon juice** make the LED glow, but in **pure water** the LED does **not** glow. **Pure water hardly conducts electricity**, so it cannot work as the electrolyte." },
      { t: "qa", title: "Try it", items: [
        ["Which are the electrodes and which is the electrolyte in the lemon cell?", "**Electrodes:** copper wire and iron nail. **Electrolyte:** lemon juice."],
        ["The LED does not glow in a lemon cell. What can you do?", "**Reverse the connections of the LED**, because it glows only when its longer wire is joined to the positive terminal."],
      ] },
    ],
  },
  {
    id: "e14", category: "Dry cell", title: "Dry Cells and Rechargeable Batteries", heading: "Dry Cells, and Batteries That Can Be Recharged",
    sub: "Single use or many uses.",
    blocks: [
      { t: "p", s: "Voltaic cells were an important discovery, but they are **not convenient** for everyday use. **Dry cells** are among the most widely used cells today." },
      { t: "dia", id: "em_drycell" },
      { t: "ul", items: [
        "A dry cell is called **dry** because its electrolyte is **not a liquid but a thick moist paste**.",
        "It has a **zinc container**, which is the **negative terminal**, and a **carbon rod** at the centre covered with a **metal cap**, which is the **positive terminal**. The rod is surrounded by the **paste-like electrolyte**.",
        "A dry cell is **portable** and is a **single-use** cell: once used up, it has to be **disposed of**.",
      ] },
      { t: "h", s: "Rechargeable batteries" },
      { t: "ul", items: [
        "**Rechargeable batteries** can be **recharged and reused many times**. This prevents wastage and saves money over time.",
        "They are used in **watches, mobile phones, laptops, tablets, cameras, inverters and electric vehicles**.",
        "They do **not last forever**: after being charged and used many times they slowly **wear out**. That is why a phone battery needs charging **more often** after a year or two.",
      ] },
      { t: "dia", id: "em_recharge" },
    ],
  },
  {
    id: "e15", category: "Batteries", title: "Modern Batteries and Safe Disposal", heading: "Lithium-ion Batteries and Where to Throw a Used Battery",
    sub: "The batteries of today and tomorrow, and e-waste.",
    blocks: [
      { t: "h", s: "A step further: modern batteries" },
      { t: "ul", items: [
        "The **lithium-ion (Li-ion) battery** is the most common type of rechargeable battery, found in almost all devices that use batteries.",
        "It uses special metals like **lithium and cobalt**, which are mined and processed in limited parts of the world. So countries are now racing to **secure supplies, recycle old batteries and develop new technologies**.",
        "Scientists are working on **solid-state batteries**, which replace the liquid or paste-like electrolyte with **solid materials**. They would be **safer, charge faster and last longer**.",
        "Better rechargeable batteries are very important as the world moves towards **environment-friendly sources of electrical power**.",
      ] },
      { t: "h", s: "Safe disposal of batteries" },
      { t: "dia", id: "em_disposal" },
      { t: "ul", items: [
        "A battery that stops working is **not completely dead**. It may still contain **acids and metals like lead, cadmium, nickel or lithium**.",
        "If thrown in **regular garbage**, these may cause **fires** or be **harmful for the environment**.",
        "Many materials in these batteries are **valuable and can be recycled and reused**.",
        "Today there are special **e-waste recycling facilities** where used batteries can be given. If you are not sure, **ask your teacher**. Recycling batteries is good for the planet and the people.",
      ] },
    ],
  },
  {
    id: "e16", category: "Activities", title: "All the Activities at a Glance", heading: "All the Activities of the Chapter",
    sub: "What you do, what you see and what you learn.",
    blocks: [
      { t: "table", head: ["Activity", "What you do", "What you see", "What you learn"], rows: [
        ["**4.1** Compass and wire", "Place a compass beneath a wire; switch ON and OFF", "Needle deflects when current flows and returns when it stops", "A current-carrying wire has a **magnetic effect** (magnetic field)"],
        ["**4.2** Coil on a nail", "Wrap wire on a nail and join it to a cell", "Clips cling while current flows and fall when it stops", "The coil is a **magnet only while current flows**"],
        ["**4.3** With and without iron", "Coil on a paper cylinder, then with an iron nail", "Deflection is much more with the nail; clips are attracted", "An **iron core** makes the **electromagnet stronger**"],
        ["**4.4** Poles", "Compass near ends A and B of the coil", "Opposite poles of the needle are attracted to the two ends", "An electromagnet has **two poles**; reversing the current reverses them"],
        ["**Think** Strength", "More cells; coils of 25, 50, 75, 100 turns", "More deflection and more clips with more cells or turns", "Strength grows with **current and number of turns**"],
        ["**4.5** Heating", "Nichrome wire, cell and switch; touch it momentarily", "The wire feels warm; hotter with 2 cells", "Current has a **heating effect**; more current, more heat"],
        ["**Think** Thickness and length", "Two nichrome wires, different thickness and length", "Thinner and shorter wire heats up more", "Heat depends on the **thickness and length** of the wire"],
        ["**4.6** Lemon cell", "Copper and iron in each of 5 or 6 lemons, with an LED", "The LED glows", "Two different metals and an electrolyte make a **cell**"],
        ["**Design** Fruit cells", "Different fruits and vegetables with different metals", "Juicy ones make the LED glow", "Any conducting juice can be an electrolyte"],
      ] },
    ],
  },
  {
    id: "e17", category: "Revision", title: "Revision: The Whole Chapter", heading: "Revision: The Whole Chapter",
    sub: "The mind map, the key words and the points to remember.",
    blocks: [
      { t: "mindmap" },
      { t: "h", s: "Key words of the chapter" },
      { t: "table", head: ["Word", "Meaning"], rows: [
        ["Magnetic effect of current", "A current-carrying conductor produces a **magnetic field** around it"],
        ["Magnetic field", "The region around a magnet or a current-carrying wire where its effect can be felt"],
        ["Electromagnet", "A **current-carrying coil** that behaves as a magnet (usually with an iron core)"],
        ["Heating effect of current", "Generation of **heat** in a conductor when current flows through it"],
        ["Resistance", "The opposition a conductor offers to the flow of current"],
        ["Heating element", "The rod or coil of wire in an appliance that gets hot"],
        ["Voltaic cell", "Two different metal electrodes in an electrolyte: chemical reactions make the current"],
        ["Dry cell", "A **single-use** cell with a paste-like electrolyte"],
        ["Rechargeable battery", "A battery that can be recharged and **reused many times**"],
      ] },
      { t: "h", s: "Snapshots: points to remember" },
      { t: "ul", items: [
        "When current flows through a conductor, it produces a **magnetic field** around it: the **magnetic effect** of electric current.",
        "A current-carrying **coil that behaves as a magnet** is an **electromagnet**; most have an **iron core** to be stronger.",
        "**Generation of heat** in conductors due to the flow of current is the **heating effect** of electric current.",
        "A **cell or battery** generates current because of **chemical reactions** inside it.",
        "**Rechargeable batteries** can be recharged and reused many times.",
      ] },
      { t: "key", title: "Remember", s: "**Strength of an electromagnet:** more **current** and more **turns** make it stronger. **Poles:** reverse the current and the poles reverse. **Heat in a wire:** depends on **current, material, thickness, length and time**. **Used batteries** go to an **e-waste** recycling facility, never to the regular garbage." },
    ],
  },
];
