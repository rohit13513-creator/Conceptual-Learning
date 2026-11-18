import type { CTopic } from "./carbonNotesTypes";

// Class X Chemistry, Acids, Bases and Salts. Topics 1 to 6: indicators, what acids and bases are, and the reactions of acids.

export const ACID_A: CTopic[] = [
  {
    id: "a1", category: "Indicators", title: "Indicators: Finding Acids and Bases", heading: "Indicators: Finding Acids and Bases",
    sub: "How colour (and smell) tells us whether a substance is an acid, a base or neutral.",
    blocks: [
      { t: "p", s: "At home you already use acids and bases. Lemon juice and vinegar taste **sour** because they contain acids. Baking soda and soap are **bitter** or soapy because they are bases. If someone has acidity after a heavy meal, a baking soda solution gives relief, because a base cancels the effect of an acid. But we must never taste or touch an unknown substance to find out. Many acids and bases are harmful. We use **indicators** instead." },
      { t: "key", title: "Indicator", s: "An **acid-base indicator** is a dye, or a mixture of dyes, that shows by a **change of colour** (or smell) whether a substance is acidic or basic." },
      { t: "h", s: "Natural indicators" },
      { t: "ul", items: [
        "**Litmus** is a purple dye taken from **lichen**, a plant that belongs to the division Thallophyta. Litmus solution is purple when it is neither acidic nor basic. It is used as **red litmus paper** and **blue litmus paper**.",
        "**Blue litmus** turns **red** in an acid. **Red litmus** turns **blue** in a base.",
        "**Turmeric** is another natural indicator. It is yellow in acid and in neutral solution and turns **reddish-brown** in a base. A yellow curry stain on a white cloth turns reddish-brown when you scrub it with soap (soap is basic). Washing with plenty of water makes it yellow again.",
        "Other natural indicators are red cabbage leaves, beetroot, and the coloured petals of flowers such as Hydrangea, Petunia and Geranium.",
      ] },
      { t: "h", s: "Synthetic indicators" },
      { t: "p", s: "Synthetic indicators are made in laboratories. **Phenolphthalein** and **methyl orange** are the two you will use most." },
      { t: "ul", items: [
        "**Phenolphthalein** is colourless in an acid and in a neutral solution. It turns **pink** in a base.",
        "**Methyl orange** is **red** in an acid and **yellow** in a base.",
      ] },
      { t: "dia", id: "abs_indicators" },
      { t: "act", title: "Activity 2.1: Test solutions with indicators", steps: [
        "Collect solutions of HCl, H2SO4, HNO3, CH3COOH, NaOH, Ca(OH)2, KOH, Mg(OH)2 and NH4OH from the laboratory.",
        "Put one drop of each solution on a watch-glass and test it with a drop of red litmus, blue litmus, phenolphthalein and methyl orange.",
        "Write the colours in a table (Table 2.1).",
      ], see: [
        "The four acids turn blue litmus red, keep phenolphthalein colourless and turn methyl orange red.",
        "The five bases turn red litmus blue, turn phenolphthalein pink and turn methyl orange yellow.",
      ], why: [
        "An indicator is a dye whose colour depends on whether the solution is acidic or basic.",
        "So the colour change tells us which kind of substance we have, without tasting it.",
      ] },
      { t: "h", s: "Olfactory indicators" },
      { t: "p", s: "Some substances do not change colour. They change their **smell** in an acidic or a basic solution. They are called **olfactory indicators** (olfactory means “connected with the sense of smell”). They help visually impaired students to test for acids and bases." },
      { t: "act", title: "Activity 2.2: Onion, vanilla and clove as indicators", steps: [
        "Put finely chopped onions and strips of clean cloth in a plastic bag, tie it tightly and keep it overnight in the fridge. The strips now smell of onion.",
        "Put a few drops of dilute HCl on one strip and a few drops of dilute NaOH on another. Smell both.",
        "Do the same with a few drops of dilute vanilla essence and of clove oil added to dilute HCl in one tube and to dilute NaOH in another.",
      ], see: [
        "With HCl, the smell of onion, vanilla and clove stays.",
        "With NaOH, the smell is lost (it can no longer be detected).",
      ], why: [
        "A base destroys the smell of these substances, an acid does not.",
        "So onion, vanilla and clove can be used as olfactory indicators.",
      ] },
      { t: "key", title: "Remember the three groups", s: "Indicators are **natural** (litmus, turmeric, red cabbage, beetroot), **synthetic** (phenolphthalein, methyl orange) and **olfactory** (onion, vanilla, clove oil). Later we will meet a **universal indicator**, which is a mixture of several indicators." },
      { t: "note", title: "Red litmus trick", s: "You have three test tubes: one has distilled water, one an acid and one a base. You have only **red litmus**. Dip red litmus in all three: the one that turns it **blue** is the **base**. Now use this blue litmus on the other two: the one that turns it **red** is the **acid**. The one with no change is **distilled water**." },
      { t: "qa", title: "Check yourself", items: [
        ["A solution turns blue litmus red. Is it acidic or basic?", "It is acidic."],
        ["Which indicator is colourless in acid and pink in base?", "Phenolphthalein."],
        ["What happens to the smell of vanilla essence when NaOH is added?", "The smell is lost."],
      ] },
    ],
  },
  {
    id: "a2", category: "Acids and bases", title: "Acids and Bases Around Us", heading: "Acids and Bases Around Us",
    sub: "Common acids, common bases, alkalis and the acids found in nature.",
    blocks: [
      { t: "p", s: "All acids taste sour, turn blue litmus red and show the same chemical behaviour. All bases taste bitter, feel soapy, turn red litmus blue and show the same chemical behaviour. In the next topics you will see why." },
      { t: "h", s: "Some acids and bases of the laboratory" },
      { t: "table", head: ["Acids", "Formula", "Bases", "Formula"], rows: [
        ["Hydrochloric acid", "HCl", "Sodium hydroxide", "NaOH"],
        ["Sulphuric acid", "H2SO4", "Potassium hydroxide", "KOH"],
        ["Nitric acid", "HNO3", "Calcium hydroxide", "Ca(OH)2"],
        ["Acetic acid", "CH3COOH", "Magnesium hydroxide", "Mg(OH)2"],
        ["", "", "Ammonium hydroxide", "NH4OH"],
      ] },
      { t: "h", s: "Acids found in nature" },
      { t: "table", head: ["Natural source", "Acid", "Natural source", "Acid"], rows: [
        ["Vinegar", "Acetic acid", "Sour milk (curd)", "Lactic acid"],
        ["Orange", "Citric acid", "Lemon", "Citric acid"],
        ["Tamarind", "Tartaric acid", "Ant sting", "Methanoic acid"],
        ["Tomato", "Oxalic acid", "Nettle sting", "Methanoic acid"],
      ] },
      { t: "h", s: "Bases and alkalis" },
      { t: "ul", items: [
        "Most bases are the **oxides or hydroxides of metals**.",
        "A base that **dissolves in water** is called an **alkali**. NaOH, KOH, Ca(OH)2 and NH4OH are alkalis.",
        "All bases do not dissolve in water. For example Mg(OH)2 is only very slightly soluble. So **all alkalis are bases, but not all bases are alkalis**.",
        "Alkalis are bitter, soapy to touch and corrosive. **Never taste or touch them.**",
      ] },
      { t: "key", title: "Strong and weak", s: "A **strong acid** (HCl, H2SO4, HNO3) gives many H⁺ ions in water. A **weak acid** (acetic acid, citric acid) gives few. In the same way NaOH and KOH are **strong bases**, while NH4OH and Mg(OH)2 are **weak bases**. You will see this properly with the pH scale." },
      { t: "qa", title: "Check yourself", items: [
        ["Name the acid in lemon, in tamarind and in curd.", "Citric acid, tartaric acid and lactic acid."],
        ["What is an alkali?", "A base that dissolves in water."],
        ["Is every base an alkali?", "No. Only the bases that dissolve in water are alkalis."],
      ] },
    ],
  },
  {
    id: "a3", category: "Reactions of acids", title: "Acids and Metals", heading: "How do Acids react with Metals?",
    sub: "Activity 2.3: the gas that burns with a pop.",
    blocks: [
      { t: "act", title: "Activity 2.3: Zinc with dilute sulphuric acid", steps: [
        "Take about 5 mL of dilute sulphuric acid in a test tube and add a few zinc granules (the teacher must help).",
        "Pass the gas that comes off through soap solution.",
        "Bring a burning candle near a gas-filled soap bubble.",
        "Repeat with HCl, HNO3 and CH3COOH.",
      ], see: [
        "Bubbles appear on the surface of the zinc granules.",
        "Soap bubbles filled with gas rise. The gas **burns with a pop sound**.",
      ], why: [
        "The gas is **hydrogen**. It does not dissolve in the soap solution, so it makes bubbles. It burns with a pop.",
        "The metal **displaces hydrogen** from the acid and forms a compound called a **salt**.",
      ] },
      { t: "dia", id: "abs_zinc" },
      { t: "key", title: "General reaction", s: "**Acid + Metal → Salt + Hydrogen gas**" },
      { t: "eq", lines: [
        "Zn(s) + H2SO4(aq) → ZnSO4(aq) + H2(g)",
        "Mg(s) + 2HCl(aq) → MgCl2(aq) + H2(g)",
        "2Al(s) + 3H2SO4(aq) → Al2(SO4)3(aq) + 3H2(g)",
        "Fe(s) + 2HCl(aq) → FeCl2(aq) + H2(g)",
      ] },
      { t: "ul", items: [
        "**Test for hydrogen:** bring a burning candle or splinter near the gas. It burns with a **pop sound**.",
        "Dilute acids are used for this activity because they react safely. Dilute HCl and H2SO4 give hydrogen readily, and acetic acid reacts more slowly.",
        "Nitric acid is an exception: it is a strong oxidising agent, so it usually does not give hydrogen with metals.",
      ] },
      { t: "note", title: "Why curd and sour things must not be kept in brass or copper vessels", s: "Curd and other sour foods contain **acids**. In brass and copper vessels the acid reacts with the metal and forms **harmful (poisonous) salts**, which spoil the food and can make you ill. So sour food is kept in glass, steel or ceramic containers." },
      { t: "qa", title: "Check yourself", items: [
        ["Which gas is usually given off when an acid reacts with a metal?", "Hydrogen."],
        ["How do you test it?", "A burning candle near the gas makes it burn with a pop sound."],
        ["Write the equation for zinc with dilute hydrochloric acid.", "Zn + 2HCl → ZnCl2 + H2"],
      ] },
    ],
  },
  {
    id: "a4", category: "Reactions of acids", title: "Acids with Carbonates", heading: "How do Metal Carbonates and Hydrogencarbonates React with Acids?",
    sub: "Activity 2.5: the gas that turns lime water milky.",
    blocks: [
      { t: "act", title: "Activity 2.5: Na2CO3 and NaHCO3 with dilute HCl", steps: [
        "Take 0.5 g of sodium carbonate (Na2CO3) in test tube A and 0.5 g of sodium hydrogencarbonate (NaHCO3) in test tube B.",
        "Add about 2 mL of dilute HCl to both.",
        "Pass the gas from each tube through lime water (calcium hydroxide solution).",
      ], see: [
        "Brisk bubbling (effervescence) takes place in both tubes.",
        "The gas turns lime water **milky**.",
      ], why: [
        "The gas is **carbon dioxide**.",
        "The milkiness is a white precipitate of **calcium carbonate**.",
      ] },
      { t: "dia", id: "abs_limewater" },
      { t: "eq", lines: [
        "Na2CO3(s) + 2HCl(aq) → 2NaCl(aq) + H2O(l) + CO2(g)",
        "NaHCO3(s) + HCl(aq) → NaCl(aq) + H2O(l) + CO2(g)",
        "Ca(OH)2(aq) + CO2(g) → CaCO3(s) + H2O(l)",
      ] },
      { t: "key", title: "General reaction", s: "**Metal carbonate (or hydrogencarbonate) + Acid → Salt + Carbon dioxide + Water**" },
      { t: "ul", items: [
        "**Limestone, chalk and marble** are different forms of calcium carbonate. Egg-shells too contain it, so crushed egg-shells give CO2 with an acid.",
        "If you pass **excess carbon dioxide** through lime water, the milkiness **disappears**, because soluble calcium hydrogencarbonate forms:",
      ] },
      { t: "eq", lines: ["CaCO3(s) + H2O(l) + CO2(g) → Ca(HCO3)2(aq)"] },
      { t: "note", title: "Two tests for carbon dioxide", s: "It **puts out a burning candle**, and it **turns lime water milky**. (Do not confuse it with hydrogen, which burns with a pop.)" },
      { t: "qa", title: "Check yourself", items: [
        ["A solution reacts with crushed egg-shells and gives a gas that turns lime water milky. What does the solution contain?", "An acid, for example HCl."],
        ["Why does the milkiness go away with excess CO2?", "Soluble calcium hydrogencarbonate is formed."],
      ] },
    ],
  },
  {
    id: "a5", category: "Reactions of acids", title: "Acids and Bases: Neutralisation", heading: "How do Acids and Bases React with each other?",
    sub: "Activity 2.6: the pink colour that disappears and returns.",
    blocks: [
      { t: "act", title: "Activity 2.6: NaOH with HCl and phenolphthalein", steps: [
        "Take about 2 mL of dilute NaOH in a test tube and add two drops of phenolphthalein.",
        "Add dilute HCl drop by drop.",
        "Now add a few drops of NaOH again.",
      ], see: [
        "The solution is **pink** at first.",
        "The pink colour **disappears** when HCl is added. It **comes back** when a few drops of NaOH are added.",
      ], why: [
        "The acid cancels (nullifies) the effect of the base, and the base cancels the effect of the acid.",
        "Phenolphthalein is pink only in the presence of a base.",
      ] },
      { t: "dia", id: "abs_neutral" },
      { t: "eq", lines: ["NaOH(aq) + HCl(aq) → NaCl(aq) + H2O(l)"] },
      { t: "key", title: "Neutralisation reaction", s: "The reaction between an acid and a base to give a **salt and water** is called a **neutralisation reaction**. **Base + Acid → Salt + Water**" },
      { t: "ul", items: [
        "A fixed volume of a base needs a fixed volume of the same acid. If 10 mL of NaOH needs 8 mL of HCl, then 20 mL of the **same** NaOH needs 2 × 8 = **16 mL** of the **same** HCl.",
        "This is used in daily life. A baking soda solution (a base) is a remedy for acidity; lemon juice or vinegar (acids) would make it worse.",
        "Toothpaste (a base) neutralises the acid in the mouth, and milk of magnesia neutralises the acid in the stomach.",
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["Define a neutralisation reaction. Give two examples.", "Acid + base → salt + water. For example NaOH + HCl → NaCl + H2O and Ca(OH)2 + 2HNO3 → Ca(NO3)2 + 2H2O."],
        ["10 mL of NaOH is neutralised by 8 mL of HCl. How much of this HCl neutralises 20 mL of this NaOH?", "16 mL."],
      ] },
    ],
  },
  {
    id: "a6", category: "Reactions of acids", title: "Acids and Metal Oxides", heading: "Reaction of Metallic Oxides with Acids",
    sub: "Activity 2.7: black copper oxide dissolves and turns the solution blue-green.",
    blocks: [
      { t: "act", title: "Activity 2.7: Copper oxide with dilute HCl", steps: [
        "Take a small amount of copper oxide in a beaker.",
        "Add dilute hydrochloric acid slowly while stirring.",
        "Note the colour of the solution.",
      ], see: [
        "The black copper oxide dissolves.",
        "The solution turns **blue-green**.",
      ], why: [
        "The blue-green colour is due to **copper(II) chloride**.",
        "Metal oxide + acid gives a salt and water, just like a base with an acid.",
      ] },
      { t: "dia", id: "abs_cuo" },
      { t: "eq", lines: ["CuO(s) + 2HCl(aq) → CuCl2(aq) + H2O(l)"] },
      { t: "key", title: "General reaction", s: "**Metal oxide + Acid → Salt + Water**. Since metal oxides react with acids to give a salt and water, like a base does, **metal oxides are basic oxides**." },
      { t: "note", title: "Try to balance", s: "The book asks you to write and balance this equation yourself. Count the atoms: one Cu, one O, two H and two Cl on each side. The balanced equation is CuO + 2HCl → CuCl2 + H2O." },
      { t: "qa", title: "Check yourself", items: [
        ["Why are metal oxides called basic oxides?", "They react with acids to form a salt and water, as bases do."],
        ["What gives the blue-green colour in Activity 2.7?", "Copper(II) chloride, CuCl2."],
      ] },
    ],
  },
];
