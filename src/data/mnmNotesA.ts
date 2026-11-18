import type { CTopic } from "./carbonNotesTypes";

// Class X Chemistry, Metals and Non-metals. Topics 1 to 6: physical properties and the reactions of metals.

export const MNM_A: CTopic[] = [
  {
    id: "n1", category: "Physical properties", title: "Physical Properties of Metals", heading: "Physical Properties of Metals",
    sub: "Lustre, hardness, malleability, ductility, conduction and sound.",
    blocks: [
      { t: "p", s: "Iron, copper, aluminium, gold and silver are **metals**. Oxygen, carbon, sulphur and iodine are **non-metals**. Think of the uses of metals around you: wires, vessels, bridges, bells and jewellery. The use of each metal depends on its **properties**. The easiest way to group substances is to compare their **physical properties**. Collect samples of iron, copper, aluminium, magnesium, sodium, lead and zinc and try the activities." },
      { t: "act", title: "Activity 3.1: Shine of metals", steps: [
        "Take samples of iron, copper, aluminium and magnesium and note how each looks.",
        "Clean the surface of each sample by rubbing it with sand paper and look again.",
      ], see: ["The rubbed surface is bright and shining."], why: [
        "Metals in their pure state have a shining surface. This property is called **metallic lustre**.",
      ] },
      { t: "act", title: "Activity 3.2: Hardness", steps: [
        "Try to cut small pieces of iron, copper, aluminium and magnesium with a sharp knife.",
        "Hold a piece of sodium with tongs, dry it by pressing it between the folds of a filter paper, put it on a watch-glass and try to cut it. **Always handle sodium with care.**",
      ], see: ["Iron, copper, aluminium and magnesium cannot be cut. **Sodium is cut easily.**"], why: [
        "Metals are generally **hard**, but the hardness differs from metal to metal.",
        "The alkali metals lithium, sodium and potassium are so soft that they can be cut with a knife.",
      ] },
      { t: "act", title: "Activity 3.3: Beating metals", steps: [
        "Place a piece of iron on an iron block and strike it four or five times with a hammer.",
        "Repeat with zinc, lead and copper and note how the shape changes.",
      ], see: ["The metals flatten into thin sheets without breaking."], why: [
        "Metals can be beaten into thin sheets. This property is called **malleability**. **Gold and silver** are the most malleable metals.",
      ] },
      { t: "key", title: "Ductility", s: "The ability of metals to be **drawn into thin wires** is called **ductility**. **Gold is the most ductile metal**: a wire about **2 km** long can be drawn from **one gram** of gold. Because of malleability and ductility, metals can be given the shapes we need." },
      { t: "act", title: "Activity 3.5: Conduction of heat", steps: [
        "Clamp an aluminium or copper wire on a stand.",
        "Fix a pin to the free end of the wire with wax.",
        "Heat the wire with a spirit lamp, candle or burner near the place where it is clamped.",
      ], see: ["After some time the wax melts and the pin falls.", "The wire itself does not melt."], why: [
        "Metals are **good conductors of heat** and have **high melting points**. That is why cooking vessels are made of metals.",
        "**Silver and copper** are the best conductors of heat. **Lead and mercury** are comparatively poor conductors.",
      ] },
      { t: "dia", id: "mnm_heat" },
      { t: "act", title: "Activity 3.6: Conduction of electricity", steps: [
        "Set up an electric circuit with a battery, a bulb and two terminals A and B.",
        "Place the metal to be tested between A and B.",
      ], see: ["The bulb glows with every metal."], why: [
        "Metals are **good conductors of electricity**.",
        "The wires that carry current in our homes are coated with **PVC or a rubber-like material**, which does not conduct, to protect us from electric shock.",
      ] },
      { t: "dia", id: "mnm_circuit" },
      { t: "key", title: "Sonorous", s: "Metals that produce a **ringing sound** when they strike a hard surface are said to be **sonorous**. This is why school bells are made of metals." },
      { t: "qa", title: "Check yourself", items: [
        ["Give an example of a metal that (i) is a liquid at room temperature, (ii) can be cut with a knife, (iii) is the best conductor of heat, (iv) is a poor conductor of heat.", "(i) Mercury, (ii) sodium (or lithium, potassium), (iii) silver (or copper), (iv) lead (or mercury)."],
        ["What do malleable and ductile mean?", "Malleable: can be beaten into thin sheets. Ductile: can be drawn into thin wires."],
        ["Why are electric wires coated with PVC?", "PVC does not conduct electricity, so it protects us from shock."],
      ] },
    ],
  },
  {
    id: "n2", category: "Physical properties", title: "Non-metals and the Exceptions", heading: "Non-metals and the Exceptions to the Rules",
    sub: "Physical properties of non-metals, and why we cannot group elements by physical properties alone.",
    blocks: [
      { t: "p", s: "There are very few non-metals compared with metals. Some examples are **carbon, sulphur, iodine, oxygen and hydrogen**. Non-metals are either **solids or gases**, except **bromine**, which is a liquid." },
      { t: "act", title: "Activity 3.7: Testing non-metals", steps: [
        "Collect samples of carbon (coal or graphite), sulphur and iodine.",
        "Carry out Activities 3.1 to 3.4 and 3.6 with them.",
        "Write the observations in a table: type of surface, hardness, malleability, ductility, conduction of electricity and sonority.",
      ], see: [
        "Sulphur and coal are dull and break into powder when hammered. They do not light the bulb.",
        "Iodine is shiny. Graphite lights the bulb.",
      ], why: ["Non-metals mostly have properties **opposite** to metals, but there are some exceptions."] },
      { t: "dia", id: "mnm_compare" },
      { t: "h", s: "Exceptions to remember" },
      { t: "ul", items: [
        "All metals except **mercury** are solids at room temperature.",
        "Most metals have high melting points, but **gallium and caesium** have very low melting points. They melt if you keep them on your palm.",
        "**Iodine** is a non-metal, but it is **lustrous** (shiny).",
        "**Carbon** exists in different forms called **allotropes**. **Diamond** is the hardest natural substance known and has a very high melting and boiling point. **Graphite** conducts electricity.",
        "The **alkali metals** (lithium, sodium, potassium) are so soft that they can be cut with a knife. They have low densities and low melting points.",
      ] },
      { t: "key", title: "A lesson from the exceptions", s: "We cannot group elements as metals and non-metals using **physical properties alone**, because of so many exceptions. Elements are more clearly classified by their **chemical properties**, which you will study next." },
      { t: "qa", title: "Check yourself", items: [
        ["Which non-metal is a liquid at room temperature?", "Bromine."],
        ["Name a non-metal that conducts electricity and one that is lustrous.", "Graphite conducts electricity. Iodine is lustrous."],
      ] },
    ],
  },
  {
    id: "n3", category: "Chemical properties of metals", title: "Metals and Oxygen", heading: "What Happens when Metals are Burnt in Air?",
    sub: "Metal oxides, amphoteric oxides and why sodium is kept under kerosene.",
    blocks: [
      { t: "act", title: "Activity 3.8: Oxides of magnesium and sulphur", steps: [
        "Burn a magnesium ribbon. Collect the ash and dissolve it in water. Test the solution with red and blue litmus.",
        "Burn sulphur powder. Place a test tube over the burning sulphur to collect the fumes. Add some water to the tube, shake, and test with red and blue litmus.",
      ], see: [
        "Magnesium burns with a **dazzling white flame**. Its ash solution turns **red litmus blue** (basic).",
        "The solution of the sulphur fumes turns **blue litmus red** (acidic).",
      ], why: [
        "Most **metals form basic oxides**. Most **non-metals form acidic oxides** when they dissolve in water.",
      ] },
      { t: "dia", id: "mnm_oxides" },
      { t: "act", title: "Activity 3.9: Burning metals in air (teacher’s help, eye protection)", steps: [
        "Hold samples of aluminium, copper, iron, lead, magnesium, zinc and sodium one by one with tongs over a flame.",
        "Collect the products, let them cool, and see if they dissolve in water.",
      ], see: [
        "Sodium burns easily. Magnesium burns with a white flame. Iron does not burn on heating, but **iron filings burn vigorously**. Copper does not burn but gets a **black coat** of copper(II) oxide.",
      ], why: ["Different metals react with oxygen at different rates. **Sodium is the most reactive** of these samples."] },
      { t: "key", title: "Metal + Oxygen → Metal oxide", s: "Almost all metals combine with oxygen to form **metal oxides**." },
      { t: "eq", lines: ["2Cu + O2 → 2CuO   (copper(II) oxide, black)", "4Al + 3O2 → 2Al2O3   (aluminium oxide)"] },
      { t: "h", s: "Amphoteric oxides" },
      { t: "p", s: "Metal oxides are basic in nature (recall copper oxide with HCl in Chapter 2). But some metal oxides, such as **aluminium oxide and zinc oxide**, show **both acidic and basic behaviour**. Metal oxides that react with **both acids and bases** to give salts and water are called **amphoteric oxides**." },
      { t: "eq", lines: ["Al2O3 + 6HCl → 2AlCl3 + 3H2O", "Al2O3 + 2NaOH → 2NaAlO2 + H2O   (sodium aluminate)"] },
      { t: "p", s: "Most metal oxides are insoluble in water, but some dissolve to form **alkalis**. Sodium oxide and potassium oxide dissolve in water:" },
      { t: "eq", lines: ["Na2O(s) + H2O(l) → 2NaOH(aq)", "K2O(s) + H2O(l) → 2KOH(aq)"] },
      { t: "h", s: "Reactivity with oxygen" },
      { t: "ul", items: [
        "**Potassium and sodium** react so vigorously that they catch fire if kept in the open. To protect them and to prevent accidental fires, they are kept **immersed in kerosene oil**.",
        "At ordinary temperature, the surfaces of **magnesium, aluminium, zinc and lead** are covered with a thin layer of oxide. This **protective oxide layer** prevents further oxidation.",
        "**Iron** does not burn on heating, but iron filings burn vigorously in a flame. **Copper** does not burn, but the hot metal gets a black coat of copper(II) oxide.",
        "**Silver and gold** do not react with oxygen even at high temperatures.",
      ] },
      { t: "note", title: "Anodising", s: "Aluminium develops a thin oxide layer in air, which protects it from corrosion. **Anodising** makes this layer thicker. A clean aluminium article is made the **anode** and is electrolysed with **dilute sulphuric acid**. The oxygen gas formed at the anode reacts with aluminium and makes a thick oxide layer, which can be **dyed** easily to give an attractive finish." },
      { t: "qa", title: "Check yourself", items: [
        ["Why is sodium kept immersed in kerosene oil?", "It reacts so vigorously with air that it catches fire. Kerosene keeps air and moisture away and prevents accidental fires."],
        ["What are amphoteric oxides? Name two.", "Oxides that react with both acids and bases to give salt and water. Aluminium oxide and zinc oxide."],
      ] },
    ],
  },
  {
    id: "n4", category: "Chemical properties of metals", title: "Metals and Water", heading: "What Happens when Metals React with Water?",
    sub: "Activity 3.10: from violent with cold water to no reaction at all.",
    blocks: [
      { t: "act", title: "Activity 3.10: Metals in cold water, hot water and steam (teacher’s help)", steps: [
        "Put small pieces of the same metals separately in beakers half-filled with cold water.",
        "Put the metals that did not react with cold water in hot water.",
        "For the metals that did not react with hot water, set up the apparatus of Fig. 3.3 and observe their reaction with steam.",
      ], see: [
        "Some metals react with cold water, some float, some need hot water, and some react only with steam. Some do not react even with steam.",
      ], why: ["Arranging the metals by how they react with water gives their order of reactivity."] },
      { t: "dia", id: "mnm_steam" },
      { t: "key", title: "General reactions", s: "**Metal + Water → Metal oxide + Hydrogen.** **Metal oxide + Water → Metal hydroxide** (if the oxide dissolves). But not all metals react with water." },
      { t: "ul", items: [
        "**Potassium and sodium** react violently with cold water. The reaction is so violent and exothermic that the **hydrogen catches fire**.",
        "**Calcium** reacts less violently. The heat is not enough to set fire to the hydrogen. Calcium starts **floating** because bubbles of hydrogen stick to its surface.",
        "**Magnesium** does not react with cold water. It reacts with **hot water** to form magnesium hydroxide and hydrogen, and it also floats.",
        "**Aluminium, iron and zinc** do not react with cold or hot water, but they react with **steam** to form the metal oxide and hydrogen.",
        "**Lead, copper, silver and gold** do not react with water at all.",
      ] },
      { t: "eq", lines: [
        "2K(s) + 2H2O(l) → 2KOH(aq) + H2(g) + heat energy",
        "2Na(s) + 2H2O(l) → 2NaOH(aq) + H2(g) + heat energy",
        "Ca(s) + 2H2O(l) → Ca(OH)2(aq) + H2(g)",
        "2Al(s) + 3H2O(g) → Al2O3(s) + 3H2(g)",
        "3Fe(s) + 4H2O(g) → Fe3O4(s) + 4H2(g)",
      ] },
      { t: "dia", id: "mnm_water" },
      { t: "qa", title: "Check yourself", items: [
        ["Write the equations for iron with steam, and calcium and potassium with water.", "3Fe + 4H2O → Fe3O4 + 4H2. Ca + 2H2O → Ca(OH)2 + H2. 2K + 2H2O → 2KOH + H2."],
        ["Why does calcium float on water?", "Bubbles of hydrogen gas stick to its surface."],
      ] },
    ],
  },
  {
    id: "n5", category: "Chemical properties of metals", title: "Metals and Acids", heading: "What Happens when Metals React with Acids?",
    sub: "Activity 3.11, hydrogen, nitric acid and aqua regia.",
    blocks: [
      { t: "key", title: "Metal + Dilute acid → Salt + Hydrogen", s: "You know already that metals react with acids to give a salt and hydrogen gas. But do all metals react in the same way?" },
      { t: "act", title: "Activity 3.11: Metals in dilute hydrochloric acid", steps: [
        "Collect the metal samples again, **except sodium and potassium**. Rub tarnished samples with sand paper.",
        "Put the samples separately in test tubes of dilute hydrochloric acid. Dip the bulb of a thermometer in each.",
        "Watch the rate of bubbles and the temperature.",
      ], see: [
        "Bubbles form **fastest with magnesium**, and the temperature is **highest** (most exothermic).",
        "The order is **Mg > Al > Zn > Fe**.",
        "**Copper shows no bubbles** and no change in temperature: it does not react with dilute HCl.",
      ], why: [
        "Metals above hydrogen in the series displace hydrogen from dilute acids. Do not use sodium and potassium: they react violently even with cold water.",
      ] },
      { t: "dia", id: "mnm_acid" },
      { t: "eq", lines: [
        "Mg + 2HCl → MgCl2 + H2",
        "2Al + 6HCl → 2AlCl3 + 3H2",
        "Zn + 2HCl → ZnCl2 + H2",
        "Fe + 2HCl → FeCl2 + H2",
        "Fe + H2SO4 → FeSO4 + H2",
      ] },
      { t: "h", s: "Nitric acid is different" },
      { t: "ul", items: [
        "**Hydrogen gas is not evolved when a metal reacts with nitric acid.** HNO3 is a **strong oxidising agent**. It oxidises the hydrogen produced to **water**, and itself gets reduced to one of the nitrogen oxides (N2O, NO, NO2).",
        "But **magnesium (Mg) and manganese (Mn)** react with **very dilute** HNO3 and give hydrogen gas.",
      ] },
      { t: "note", title: "Aqua regia", s: "**Aqua regia** (Latin for ‘royal water’) is a freshly prepared mixture of **concentrated hydrochloric acid and concentrated nitric acid in the ratio 3 : 1**. It can dissolve **gold** (and platinum), even though neither of these acids can do so alone. It is a highly corrosive, fuming liquid." },
      { t: "qa", title: "Check yourself", items: [
        ["Which gas is produced when dilute HCl is added to a reactive metal? Write the reaction for iron with dilute H2SO4.", "Hydrogen. Fe + H2SO4 → FeSO4 + H2."],
        ["Why does nitric acid not give hydrogen with metals?", "It is a strong oxidising agent and oxidises the hydrogen to water."],
        ["Arrange Mg, Al, Zn, Fe in the order in which they react with dilute HCl.", "Mg > Al > Zn > Fe."],
      ] },
    ],
  },
  {
    id: "n6", category: "Chemical properties of metals", title: "Metals and Salt Solutions", heading: "How do Metals React with Solutions of other Metal Salts?",
    sub: "Activity 3.12: displacement, the best test of reactivity.",
    blocks: [
      { t: "act", title: "Activity 3.12: Copper wire and iron nail", steps: [
        "Take a clean copper wire and a clean iron nail.",
        "Put the copper wire in a solution of iron sulphate and the iron nail in a solution of copper sulphate in two test tubes.",
        "Record your observations after 20 minutes.",
      ], see: [
        "The **iron nail** gets a **brown coat** and the blue solution turns **light green**.",
        "The **copper wire** shows **no change**.",
      ], why: [
        "Iron is **more reactive** than copper, so it displaces copper from copper sulphate. Copper cannot displace iron.",
      ] },
      { t: "dia", id: "mnm_displace" },
      { t: "eq", lines: ["Fe(s) + CuSO4(aq) → FeSO4(aq) + Cu(s)", "Metal A + Salt solution of B → Salt solution of A + Metal B"] },
      { t: "key", title: "Displacement reaction", s: "**Reactive metals can displace less reactive metals** from their compounds in solution or in molten form. If metal A displaces metal B from its solution, then A is **more reactive** than B. Displacement gives better evidence of reactivity than oxygen, water or acid, because not all metals react with those." },
      { t: "h", s: "Reading a displacement table" },
      { t: "p", s: "Four metals A, B, C and D are added to four solutions. The results:" },
      { t: "table", head: ["Metal", "Iron(II) sulphate", "Copper(II) sulphate", "Zinc sulphate", "Silver nitrate"], rows: [
        ["A", "No reaction", "Displacement", "", ""],
        ["B", "Displacement", "", "No reaction", ""],
        ["C", "No reaction", "No reaction", "No reaction", "Displacement"],
        ["D", "No reaction", "No reaction", "No reaction", "No reaction"],
      ] },
      { t: "ul", items: [
        "**B** displaces iron but not zinc, so B is **the most reactive**: it lies between zinc and iron.",
        "**A** displaces copper but not iron, so A lies between iron and copper.",
        "**C** displaces only silver, so C lies between copper and silver. **D** displaces none, so it is the least reactive.",
        "**Decreasing order of reactivity: B > A > C > D.**",
        "If B is added to copper(II) sulphate solution, the **blue colour fades** and a **brown deposit of copper** forms.",
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["What will you see when zinc is added to iron(II) sulphate solution? Write the reaction.", "Zinc displaces iron, so the pale green colour fades and iron is deposited. Zn + FeSO4 → ZnSO4 + Fe."],
        ["Which metal is more reactive, iron or copper?", "Iron, because it displaces copper from its solution."],
      ] },
    ],
  },
];
