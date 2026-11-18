import type { CTopic } from "./carbonNotesTypes";

// Topics 12 to 15: extraction of metals, refining, corrosion, and the prevention of corrosion with alloys.

export const MNM_C: CTopic[] = [
  {
    id: "n12", category: "Metallurgy", title: "Extracting Metals: Low and Middle of the Series", heading: "Extracting Metals Low and in the Middle of the Activity Series",
    sub: "Heating, roasting, calcination and reduction with carbon; the thermit reaction.",
    blocks: [
      { t: "h", s: "Metals low in the series" },
      { t: "p", s: "Metals low in the activity series are very unreactive. Their oxides can be reduced to metals by **heating alone**. For example **cinnabar (HgS)**, an ore of mercury, is heated in air and changes into mercuric oxide (HgO). Mercuric oxide is then reduced to mercury on further heating." },
      { t: "eq", lines: [
        "2HgS(s) + 3O2(g) →(heat) 2HgO(s) + 2SO2(g)",
        "2HgO(s) →(heat) 2Hg(l) + O2(g)",
      ] },
      { t: "p", s: "Similarly **copper**, which is found as **Cu2S** in nature, can be obtained from its ore by just heating in air:" },
      { t: "eq", lines: [
        "2Cu2S + 3O2 →(heat) 2Cu2O + 2SO2",
        "2Cu2O + Cu2S →(heat) 6Cu + SO2",
      ] },
      { t: "h", s: "Metals in the middle of the series" },
      { t: "p", s: "Zinc, iron and lead are moderately reactive metals and are usually present in nature as **sulphides or carbonates**. It is easier to obtain a metal from its **oxide** than from its sulphide or carbonate, so the sulphides and carbonates are **first converted into oxides**." },
      { t: "table", head: ["", "Roasting", "Calcination"], rows: [
        ["Ore", "Sulphide ore", "Carbonate ore"],
        ["Heating", "Strongly, in excess air", "Strongly, in limited air"],
        ["Example", "2ZnS + 3O2 → 2ZnO + 2SO2", "ZnCO3 → ZnO + CO2"],
      ] },
      { t: "key", title: "Then reduce the oxide", s: "The metal oxide is reduced to the metal using a suitable **reducing agent such as carbon**. For example **ZnO + C → Zn + CO**. Obtaining metals from their compounds is a **reduction** process." },
      { t: "h", s: "Displacement reactions as reduction: the thermit reaction" },
      { t: "p", s: "Highly reactive metals such as **sodium, calcium and aluminium** can also be used as reducing agents, because they displace metals of lower reactivity from their compounds. For example, when manganese dioxide is heated with aluminium powder:" },
      { t: "eq", lines: ["3MnO2(s) + 4Al(s) → 3Mn(l) + 2Al2O3(s) + heat"] },
      { t: "p", s: "In this reaction aluminium is **oxidised** (it gains oxygen) and manganese dioxide is **reduced** (it loses oxygen). These displacement reactions are **highly exothermic**: so much heat is given out that the metals are produced in the **molten state**." },
      { t: "dia", id: "mnm_thermit" },
      { t: "eq", lines: ["Fe2O3(s) + 2Al(s) → 2Fe(l) + Al2O3(s) + heat"] },
      { t: "note", title: "The thermit reaction", s: "The reaction of **iron(III) oxide with aluminium** is used to join **railway tracks** or **cracked machine parts**. Molten iron fills the gap." },
      { t: "qa", title: "Check yourself", items: [
        ["What chemical process is used for obtaining a metal from its oxide?", "Reduction."],
        ["What are roasting and calcination?", "Roasting: heating a sulphide ore strongly in excess air to get an oxide. Calcination: heating a carbonate ore strongly in limited air to get an oxide."],
        ["In the thermit reaction, which substance is oxidised and which is reduced?", "Aluminium is oxidised; iron(III) oxide is reduced."],
      ] },
    ],
  },
  {
    id: "n13", category: "Metallurgy", title: "Top of the Series and Refining", heading: "Extracting Metals at the Top of the Series, and Refining",
    sub: "Electrolytic reduction, and electrolytic refining of copper.",
    blocks: [
      { t: "h", s: "Metals towards the top of the series" },
      { t: "p", s: "Metals high up in the reactivity series are very reactive. They **cannot be obtained from their compounds by heating with carbon**. For example carbon cannot reduce the oxides of **sodium, magnesium, calcium and aluminium**. This is because these metals have **more affinity for oxygen than carbon**." },
      { t: "key", title: "Electrolytic reduction", s: "These metals are obtained by **electrolytic reduction**. Sodium, magnesium and calcium are obtained by the **electrolysis of their molten chlorides**. The metals are deposited at the **cathode** (negatively charged electrode), whereas chlorine is liberated at the **anode** (positively charged electrode)." },
      { t: "eq", lines: ["At cathode:  Na⁺ + e⁻ → Na", "At anode:  2Cl⁻ → Cl2 + 2e⁻"] },
      { t: "dia", id: "mnm_moltennacl" },
      { t: "p", s: "Similarly, **aluminium** is obtained by the **electrolytic reduction of aluminium oxide**." },
      { t: "h", s: "Refining of metals" },
      { t: "p", s: "The metals produced by the various reduction processes are **not very pure**. They contain impurities, which must be removed. The most widely used method for refining impure metals is **electrolytic refining**. Copper, zinc, tin, nickel, silver, gold and others are refined in this way." },
      { t: "ul", items: [
        "The **impure metal is made the anode** and a **thin strip of pure metal is made the cathode**.",
        "A solution of the **metal salt** is used as the electrolyte. (For copper it is acidified copper sulphate.)",
        "On passing the current, the **pure metal from the anode dissolves** into the electrolyte, and an **equivalent amount of pure metal is deposited on the cathode**.",
        "The **soluble impurities** go into the solution. The **insoluble impurities** settle at the bottom of the anode and are called **anode mud**.",
      ] },
      { t: "dia", id: "mnm_refining" },
      { t: "table", head: ["Metal M refined", "Anode", "Cathode", "Electrolyte"], rows: [
        ["Any metal M", "Impure M", "Thin strip of pure M", "A solution of a soluble salt of M"],
        ["Copper", "Impure copper", "Strip of pure copper", "Acidified copper sulphate"],
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["In the electrolytic refining of a metal M, what is the anode, the cathode and the electrolyte?", "Anode: impure M. Cathode: thin strip of pure M. Electrolyte: a solution of a salt of M."],
        ["Why can carbon not be used to get sodium from its oxide?", "Sodium has more affinity for oxygen than carbon has."],
      ] },
    ],
  },
  {
    id: "n14", category: "Corrosion", title: "Corrosion and Rusting", heading: "Corrosion",
    sub: "Activity 3.14: iron rusts only with air and water.",
    blocks: [
      { t: "p", s: "You learnt about corrosion in Chapter 1:" },
      { t: "ul", items: [
        "**Silver** articles become **black** after some time in air. Silver reacts with **sulphur** in the air and forms a coating of **silver sulphide**.",
        "**Copper** reacts with **moist carbon dioxide** in the air, loses its shiny brown surface and gains a **green coat**. This green substance is **basic copper carbonate**.",
        "**Iron**, when exposed to **moist air** for a long time, acquires a coating of a **brown flaky substance called rust**.",
      ] },
      { t: "act", title: "Activity 3.14: Conditions for rusting", steps: [
        "Take three test tubes A, B and C with clean iron nails.",
        "Tube A: pour some water and cork it.",
        "Tube B: pour boiled distilled water, add about 1 mL of oil and cork it. The oil floats on water and stops air from dissolving in the water.",
        "Tube C: put anhydrous calcium chloride and cork it. It absorbs moisture from the air.",
        "Leave the tubes for a few days.",
      ], see: [
        "The nails **rust in tube A**, where both air and water are present.",
        "The nails **do not rust in tube B** (water only, no air) or in **tube C** (dry air only).",
      ], why: ["**Iron rusts only when it is exposed to both air (oxygen) and water.**"] },
      { t: "dia", id: "mnm_rust" },
      { t: "key", title: "Corrosion", s: "The slow eating away of the surface of a metal when it is exposed to moist air or other chemicals for a long time is called **corrosion**." },
      { t: "note", title: "Cleaning tarnished copper vessels", s: "Tarnished copper vessels are cleaned with **lemon or tamarind juice**. These sour substances contain **acids**, which dissolve the layer of **basic copper carbonate** on the copper, so the vessel shines again." },
      { t: "qa", title: "Check yourself", items: [
        ["What is the green coat on copper?", "Basic copper carbonate."],
        ["Why does silver become black in air?", "It reacts with sulphur compounds in the air and forms black silver sulphide."],
        ["Which metals do not corrode easily?", "Metals low in the reactivity series, such as gold, silver and platinum."],
      ] },
    ],
  },
  {
    id: "n15", category: "Corrosion", title: "Preventing Corrosion and Alloys", heading: "Prevention of Corrosion and Alloys",
    sub: "Galvanisation, alloys, stainless steel, solder and carat gold.",
    blocks: [
      { t: "h", s: "How to prevent rusting" },
      { t: "p", s: "The rusting of iron can be prevented by **painting, oiling, greasing, galvanising, chrome plating, anodising or making alloys**." },
      { t: "key", title: "Galvanisation", s: "**Galvanisation** is a method of protecting steel and iron from rusting by **coating them with a thin layer of zinc**. The galvanised article is protected even if the zinc coating is broken, because **zinc is more reactive than iron**, so zinc is corroded first and protects the iron." },
      { t: "h", s: "Alloys" },
      { t: "key", title: "Alloy", s: "An **alloy** is a **homogeneous mixture of two or more metals, or of a metal and a non-metal**. It is made by first melting the primary metal and then dissolving the other elements in it in definite proportions. It is then cooled to room temperature." },
      { t: "ul", items: [
        "**Alloying is a very good method of improving the properties of a metal.** We can get the properties we want.",
        "**Pure iron** is very soft and stretches easily when hot, so it is never used in the pure state. Mixed with a small amount of **carbon (about 0.05 %)** it becomes **hard and strong**.",
        "Iron mixed with **nickel and chromium** gives **stainless steel**, which is hard and does not rust.",
        "If one of the metals is **mercury**, the alloy is called an **amalgam**.",
        "The **electrical conductivity and melting point of an alloy are less** than those of the pure metals. **Brass** (copper and zinc) and **bronze** (copper and tin) are not good conductors, whereas pure copper is used for electrical circuits.",
        "**Solder**, an alloy of lead and tin, has a **low melting point** and is used for welding electrical wires together.",
      ] },
      { t: "table", head: ["Alloy", "Made of", "Remark"], rows: [
        ["Brass", "Copper and zinc", "Not a good conductor of electricity"],
        ["Bronze", "Copper and tin", "Not a good conductor of electricity"],
        ["Solder", "Lead and tin", "Low melting point; joins wires"],
        ["Stainless steel", "Iron, nickel and chromium", "Hard, does not rust"],
        ["Steel", "Iron with about 0.05 % carbon", "Hard and strong"],
        ["Amalgam", "Any alloy that contains mercury", ""],
      ] },
      { t: "note", title: "Carat gold", s: "**Pure gold, known as 24 carat gold, is very soft**, so it is not suitable for jewellery. It is alloyed with **silver or copper** to make it hard. In India, **22 carat gold** is generally used for ornaments: **22 parts of pure gold and 2 parts of copper or silver**." },
      { t: "note", title: "The iron pillar at Delhi: the wonder of ancient Indian metallurgy", s: "The iron pillar near the **Qutub Minar** in Delhi was built **more than 1600 years ago** by the iron workers of India. They had developed a process that **prevented the iron from rusting**. Scientists from all over the world have examined it for its rust resistance. The pillar is **8 m high** and weighs **6 tonnes (6000 kg)**." },
      { t: "qa", title: "Check yourself", items: [
        ["State two ways to prevent rusting of iron.", "Painting, oiling, greasing, galvanising, chrome plating, anodising, making alloys (any two)."],
        ["What are alloys?", "Homogeneous mixtures of two or more metals, or of a metal and a non-metal."],
        ["Which methods suit an iron frying pan?", "Greasing, painting or coating with zinc: all of them."],
      ] },
    ],
  },
];
