import type { CTopic } from "./carbonNotesTypes";

// Topics 7 to 10: reactions of bases, what all acids and bases have in common, dilution and the pH scale.

export const ACID_B: CTopic[] = [
  {
    id: "a7", category: "Reactions of bases", title: "Reactions of Bases", heading: "Bases with Metals and with Non-metal Oxides",
    sub: "A base can also give hydrogen, and a non-metal oxide behaves like an acid.",
    blocks: [
      { t: "h", s: "A base with a metal" },
      { t: "act", title: "Activity 2.4: Zinc with sodium hydroxide", steps: [
        "Place a few pieces of granulated zinc in a test tube.",
        "Add 2 mL of sodium hydroxide solution and warm the test tube.",
        "Test the gas as in Activity 2.3: pass it through soap solution and bring a burning candle near.",
      ], see: ["Bubbles of a gas form. The gas burns with a pop sound."], why: [
        "The gas is **hydrogen** again.",
        "The salt formed is **sodium zincate**, whose negative ion contains the metal and oxygen.",
      ] },
      { t: "eq", lines: ["2NaOH(aq) + Zn(s) → Na2ZnO2(s) + H2(g)"] },
      { t: "note", title: "Not all metals", s: "Such reactions are **not possible with all metals**. Zinc and aluminium react with strong bases on warming. Many other metals do not." },
      { t: "h", s: "A base with a non-metal oxide" },
      { t: "p", s: "In Activity 2.5 you saw that **carbon dioxide** reacts with **calcium hydroxide** (lime water). A salt (calcium carbonate) and water are formed. This is like the reaction between an acid and a base. So **non-metal oxides are acidic in nature**." },
      { t: "eq", lines: ["Ca(OH)2(aq) + CO2(g) → CaCO3(s) + H2O(l)", "Base + Non-metal oxide → Salt + Water"] },
      { t: "key", title: "Basic oxides and acidic oxides", s: "**Metal oxides** (CuO, MgO, CaO) are **basic oxides**: they react with acids. **Non-metal oxides** (CO2, SO2) are **acidic oxides**: they react with bases." },
      { t: "h", s: "All the reactions together" },
      { t: "dia", id: "abs_reactions" },
      { t: "table", head: ["Reaction", "Products", "Example"], rows: [
        ["Acid + Metal", "Salt + Hydrogen", "Zn + H2SO4 → ZnSO4 + H2"],
        ["Base + Metal (some)", "Salt + Hydrogen", "2NaOH + Zn → Na2ZnO2 + H2"],
        ["Acid + Metal carbonate or hydrogencarbonate", "Salt + CO2 + Water", "Na2CO3 + 2HCl → 2NaCl + H2O + CO2"],
        ["Acid + Base", "Salt + Water", "NaOH + HCl → NaCl + H2O"],
        ["Acid + Metal oxide", "Salt + Water", "CuO + 2HCl → CuCl2 + H2O"],
        ["Base + Non-metal oxide", "Salt + Water", "Ca(OH)2 + CO2 → CaCO3 + H2O"],
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["Which gas comes out when zinc is warmed with NaOH?", "Hydrogen."],
        ["Why is CO2 called an acidic oxide?", "It reacts with a base to give a salt and water."],
      ] },
    ],
  },
  {
    id: "a8", category: "Acids and bases in water", title: "What do all Acids and Bases have in Common?", heading: "What do all Acids and all Bases have in Common?",
    sub: "Hydrogen ions make an acid, hydroxide ions make a base.",
    blocks: [
      { t: "p", s: "All acids give hydrogen gas with metals, so **hydrogen is common to all acids**. But is every compound that contains hydrogen an acid? Let us test." },
      { t: "act", title: "Activity 2.8: Does the solution conduct electricity?", steps: [
        "Fix two nails on a cork and place the cork in a 100 mL beaker.",
        "Connect the nails to the two terminals of a 6 volt battery through a bulb and a switch.",
        "Pour dilute HCl into the beaker and switch on. Repeat with dilute sulphuric acid.",
        "Repeat with glucose solution and alcohol solution.",
        "Repeat with alkalis such as sodium hydroxide and calcium hydroxide.",
      ], see: [
        "The bulb **glows** with the acids (and also with the alkalis).",
        "The bulb **does not glow** with glucose and alcohol.",
      ], why: [
        "The bulb glows when current flows, and the current in a solution is carried by **ions**.",
        "Glucose and alcohol contain hydrogen but give no ions, so they are not acids.",
      ] },
      { t: "dia", id: "abs_conduct" },
      { t: "ul", items: [
        "Acids contain **H⁺ as the positive ion**, with negative ions such as Cl⁻ in HCl, NO3⁻ in HNO3, SO4^{2−} in H2SO4 and CH3COO⁻ in CH3COOH.",
        "So **acids produce hydrogen ions, H⁺(aq), in solution**. These ions are responsible for their acidic properties.",
        "Alkalis such as NaOH and Ca(OH)2 also conduct electricity, because they produce ions: **hydroxide ions, OH⁻(aq)**.",
      ] },
      { t: "h", s: "Do acids give ions only in water?" },
      { t: "act", title: "Activity 2.9: Dry and moist HCl gas", steps: [
        "Take about 1 g of solid NaCl in a clean, dry test tube and add some concentrated sulphuric acid.",
        "Pass the gas that comes out through a delivery tube.",
        "Test the gas first with **dry** blue litmus paper, then with **wet** blue litmus paper.",
      ], see: [
        "Dry blue litmus paper **does not change**.",
        "Wet blue litmus paper **turns red**.",
      ], why: [
        "Dry HCl gas is not acidic. HCl gives H⁺ ions **only in the presence of water**.",
        "(In very humid weather the gas is dried by passing it through a guard tube of calcium chloride.)",
      ] },
      { t: "dia", id: "abs_hcl" },
      { t: "eq", lines: ["HCl + H2O → H3O⁺ + Cl⁻", "H⁺ + H2O → H3O⁺"] },
      { t: "key", title: "Hydronium ion", s: "A hydrogen ion cannot exist alone. It joins a water molecule and forms a **hydronium ion, H3O⁺**. So we always write the ion as **H⁺(aq)** or **H3O⁺**." },
      { t: "h", s: "What does a base give in water?" },
      { t: "eq", lines: ["NaOH(s) → Na⁺(aq) + OH⁻(aq)", "KOH(s) → K⁺(aq) + OH⁻(aq)", "Mg(OH)2(s) → Mg^{2+}(aq) + 2OH⁻(aq)"] },
      { t: "p", s: "Bases give **hydroxide (OH⁻) ions** in water. A base that dissolves in water is an alkali. With these ions we can see neutralisation in a new way:" },
      { t: "eq", lines: ["Acid + Base → Salt + Water", "HX + MOH → MX + HOH", "H⁺(aq) + OH⁻(aq) → H2O(l)"] },
      { t: "qa", title: "Check yourself", items: [
        ["Why do HCl and HNO3 show acidic character in water but glucose and alcohol do not?", "HCl and HNO3 give H⁺ ions in water. Glucose and alcohol do not give H⁺ ions."],
        ["Why does dry HCl gas not change the colour of dry litmus paper?", "Without water it cannot form H⁺ ions."],
        ["Why does an acid solution conduct electricity?", "It contains ions that carry the current."],
      ] },
    ],
  },
  {
    id: "a9", category: "Acids and bases in water", title: "Dissolving and Diluting", heading: "What Happens when an Acid or a Base is Mixed with Water?",
    sub: "Activity 2.10: a hot beaker and the golden rule of dilution.",
    blocks: [
      { t: "act", title: "Activity 2.10: Is dissolving exothermic or endothermic?", steps: [
        "Take 10 mL of water in a beaker.",
        "Add a few drops of concentrated H2SO4 and swirl the beaker slowly.",
        "Touch the base of the beaker.",
        "Repeat with sodium hydroxide pellets.",
      ], see: ["The beaker becomes **hot** in both cases."], why: [
        "Dissolving an acid or a base in water gives out heat. It is a highly **exothermic** process.",
      ] },
      { t: "dia", id: "abs_dilution" },
      { t: "key", title: "Golden rule", s: "Always add the **acid slowly to water** with constant stirring. **Never add water to a concentrated acid.** The large amount of heat can make the mixture splash out and cause burns, and the glass container may break because of excessive local heating." },
      { t: "ul", items: [
        "Look for the **warning sign** on the can of concentrated sulphuric acid and on the bottle of sodium hydroxide pellets.",
        "Mixing an acid or a base with water **decreases the concentration of ions (H3O⁺ or OH⁻) per unit volume**. This is called **dilution**, and the acid or base is said to be **diluted**.",
        "When an acid is diluted, the concentration of H3O⁺ ions **decreases**.",
        "When more base is dissolved in a solution of sodium hydroxide, the concentration of OH⁻ ions **increases** (until the solution is saturated).",
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["While diluting an acid, why must acid be added to water and not water to acid?", "The heat released can make the mixture splash out and cause burns, and can break the glass."],
        ["How does the concentration of H3O⁺ change when an acid is diluted?", "It decreases."],
      ] },
    ],
  },
  {
    id: "a10", category: "pH scale", title: "The pH Scale", heading: "How Strong are Acid or Base Solutions?",
    sub: "Universal indicator, pH paper, strong and weak acids.",
    blocks: [
      { t: "p", s: "An indicator tells us whether a solution is an acid or a base. How can we tell **how strong** it is? We use a **universal indicator**. It is a **mixture of several indicators** and shows a different colour at different concentrations of hydrogen ions. Paper soaked in universal indicator (pH paper) is generally used." },
      { t: "key", title: "The pH scale", s: "A scale for measuring the **hydrogen ion concentration** in a solution. The **p** in pH stands for **‘potenz’**, a German word meaning **power**. pH is generally measured from **0 (very acidic) to 14 (very alkaline)**." },
      { t: "dia", id: "abs_phscale" },
      { t: "ul", items: [
        "pH of a **neutral** solution is **7**.",
        "pH **less than 7**: acidic. The lower the pH, the stronger the acid.",
        "pH **more than 7**: basic. From 7 to 14 the concentration of OH⁻ ions increases, so the alkali gets stronger.",
        "**Higher the hydronium ion concentration, lower the pH value.**",
        "pH is just a number that shows the acidic or basic nature of a solution.",
      ] },
      { t: "act", title: "Activity 2.11: pH of everyday liquids", steps: [
        "Test saliva (before and after a meal), lemon juice, a colourless aerated drink, carrot juice, coffee, tomato juice, tap water, 1 M NaOH and 1 M HCl with pH paper.",
        "Compare the colour of the paper with the colour chart and write the approximate pH.",
      ], see: [
        "Lemon juice, tomato juice, coffee and 1 M HCl are acidic. Tap water is about neutral. 1 M NaOH is strongly basic.",
        "Saliva becomes more acidic after a meal.",
      ], why: ["The colour of the universal indicator depends on the H⁺ ion concentration, so the paper shows the pH."] },
      { t: "table", head: ["Solution", "Approximate pH", "Nature"], rows: [
        ["1 M HCl", "0", "Strongly acidic"],
        ["Lemon juice", "about 2", "Acidic"],
        ["Tomato juice", "about 4", "Acidic"],
        ["Coffee", "about 5", "Acidic"],
        ["Saliva after a meal", "less than 7", "Acidic"],
        ["Tap water", "about 7", "Neutral"],
        ["1 M NaOH", "14", "Strongly basic"],
      ] },
      { t: "h", s: "Strong and weak acids and bases" },
      { t: "p", s: "The **strength** of an acid or a base depends on the number of H⁺ ions or OH⁻ ions it produces. Take hydrochloric acid and acetic acid of the **same concentration**, say one molar. They give **different amounts of hydrogen ions**." },
      { t: "ul", items: [
        "**Strong acid:** gives more H⁺ ions (HCl, H2SO4, HNO3).",
        "**Weak acid:** gives fewer H⁺ ions (acetic acid).",
        "**Strong base:** gives more OH⁻ ions (NaOH, KOH). **Weak base:** gives fewer OH⁻ ions (NH4OH).",
      ] },
      { t: "note", title: "Magnesium in two acids", s: "Equal magnesium ribbons are put in HCl and in acetic acid of the **same amount and concentration**. The fizzing is **more vigorous in HCl**, because HCl is a strong acid and gives more H⁺ ions." },
      { t: "h", s: "Reading pH values" },
      { t: "p", s: "Five solutions A, B, C, D and E have pH 4, 1, 11, 7 and 9. **D** (7) is neutral. **C** (11) is strongly alkaline, **B** (1) is strongly acidic, **A** (4) is weakly acidic and **E** (9) is weakly alkaline. In increasing order of H⁺ ion concentration: 11 < 9 < 7 < 4 < 1, which is **C < E < D < A < B**." },
      { t: "note", title: "Do basic solutions have H⁺ ions?", s: "**Yes.** Every water solution has some H⁺ ions (from water itself). A solution is basic because its **OH⁻ ions are more** than its H⁺ ions. The more H⁺ ions a solution has, the more acidic it is." },
      { t: "qa", title: "Check yourself", items: [
        ["Solution A has pH 6 and solution B has pH 8. Which has more H⁺ ions? Which is acidic?", "A has more H⁺ ions. A is acidic and B is basic."],
        ["A solution turns red litmus blue. Is its pH likely to be 1, 4, 5 or 10?", "10."],
      ] },
    ],
  },
];
