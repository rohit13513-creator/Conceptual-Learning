import type { CTopic } from "./carbonNotesTypes";

// Class VIII Science, The Amazing World of Solutes, Solvents, and Solutions (NCERT Chapter 9). Topics 1 to 6: mixtures, solute and solvent,
// saturated and unsaturated solutions, concentration, solubility of solids and of gases, and water as a solvent.
// In every text: **bold** makes bold, cm^{3} gives a superscript. A slash is never used (the screen would show a fraction): "per", "or" and ÷ are used.

export const SOL_A: CTopic[] = [
  {
    id: "s1", category: "Mixtures", title: "Uniform and Non-uniform Mixtures", heading: "Mixtures: Uniform and Non-uniform",
    sub: "Why every sip of ORS tastes the same.",
    blocks: [
      { t: "p", s: "You may have taken an **Oral Rehydration Solution (ORS)**. It is a mixture of **sugar, salt and water** used to treat **dehydration** (loss of water from the body). Every sip tastes the same, whether you drink little or much, because the sugar and the salt are **spread evenly** throughout the water." },
      { t: "key", title: "Mixture", s: "A **mixture** is made when two or more substances are mixed together and each keeps its own properties." },
      { t: "dia", id: "sl_mixtures" },
      { t: "table", head: ["", "Uniform mixture", "Non-uniform mixture"], rows: [
        ["Spreading", "Components are **evenly distributed** throughout", "Components are **not evenly distributed**"],
        ["Seen?", "Components **cannot be seen separately**", "Components can be seen with the **naked eye or a magnifying glass**"],
        ["Called", "A **solution**", "**Not** a solution"],
        ["Examples", "Salt or sugar in water; air (a mixture of gases)", "Chalk powder, sand or sawdust in water"],
      ] },
      { t: "ul", items: [
        "In a non-uniform mixture, some components **float** (sawdust in water) and others **sink** (sand in water).",
        "When salt and sugar are mixed with water, a **uniform mixture** is formed. When chalk powder, sand or sawdust is mixed with water, the components are not evenly distributed, so the mixture is **non-uniform**.",
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["Is a mixture of sugar, salt and water uniform or non-uniform?", "It is a **uniform** mixture, because the components are evenly distributed and cannot be seen separately."],
        ["What happens when chalk powder is mixed with water? Is it a uniform mixture?", "The chalk is not evenly distributed, so it forms a **non-uniform** mixture."],
      ] },
    ],
  },
  {
    id: "s2", category: "Solute and solvent", title: "Solute, Solvent and Solution", heading: "What Are Solute, Solvent and Solution?",
    sub: "Who dissolves and who is dissolved.",
    blocks: [
      { t: "ul", items: [
        "A **solution** is a **uniform mixture** of two or more substances, for example salt in water.",
        "The **solute** is the substance that **dissolves**. In a solid and liquid solution, the **solid** is the solute.",
        "The **solvent** is the substance in which the solute dissolves. In a solid and liquid solution, the **liquid** is the solvent.",
      ] },
      { t: "eq", lines: ["Solute + Solvent → Solution"] },
      { t: "dia", id: "sl_solute" },
      { t: "key", title: "When two liquids are mixed", s: "It is not always clear which liquid dissolves the other. The liquid present in the **smaller amount** is the **solute** and the one in the **larger amount** is the **solvent**." },
      { t: "ul", items: [
        "**Air** is a mixture of gases spread evenly, so it is also a **uniform mixture**: a solution of gases.",
        "**Chashni of gulab jamun:** the sugar syrup has a large amount of sugar in a small amount of water, yet **water is the solvent** and **sugar is the solute**, because the solid dissolves in the liquid.",
      ] },
      { t: "h", s: "Solvents in Indian medicine" },
      { t: "ul", items: [
        "**Water** has mainly been used as the solvent for preparing medicines in **Ayurveda, Siddha** and other Indian systems of medicine. Medicines were also made as **hydro-alcoholic extracts** (water and alcohol) of herbs.",
        "**Oils, ghee and milk** were also used as solvents to get the therapeutic (healing) benefits of the drug.",
      ] },
      { t: "note", title: "Be a scientist: Asima Chatterjee", s: "**Asima Chatterjee** was an Indian chemist who used solvents and solutions to **extract and isolate important compounds from medicinal plants**. She developed **anti-epileptic and anti-malarial drugs**. She was the **second Indian woman, after Janaki Ammal, to earn a Doctorate of Science**, the **first woman to receive the Shanti Swarup Bhatnagar Award** in chemical science, and she was given the **Padma Bhushan**." },
    ],
  },
  {
    id: "s3", category: "Saturation", title: "Saturated and Unsaturated Solutions, Concentration", heading: "How Much Solute Can a Solvent Dissolve?",
    sub: "A limit to dissolving, and the words dilute and concentrated.",
    blocks: [
      { t: "p", s: "A fixed amount of water can dissolve only a **limited amount of salt**. The first few spoons dissolve completely. After that the extra salt settles at the bottom." },
      { t: "dia", id: "sl_saturation" },
      { t: "table", head: ["Unsaturated solution", "Saturated solution"], rows: [
        ["**More solute** can be dissolved at that temperature", "**No more solute** can be dissolved at that temperature"],
        ["All the added solute dissolves", "Extra solute **settles at the bottom**"],
      ] },
      { t: "ul", items: [
        "A saturated solution can form at **any temperature**, not only at a high temperature.",
        "A saturated solution at one temperature behaves as an **unsaturated** solution if the temperature is **increased**.",
      ] },
      { t: "h", s: "Concentration" },
      { t: "key", title: "Concentration", s: "**Concentration** is the **amount of solute present in a fixed quantity of solution** (or solvent). A **dilute** solution has a **smaller** amount of solute. A **concentrated** solution has a **larger** amount of solute. **Dilute and concentrated are relative terms**: one spoon of salt in a glass of water is dilute compared with two spoons in the same water." },
      { t: "dia", id: "sl_concentration" },
      { t: "p", s: "**Which is more concentrated: 2 spoons of salt in 100 mL of water or 4 spoons of salt in 50 mL of water?** 4 spoons in 50 mL means **8 spoons per 100 mL**, which is more than 2 spoons per 100 mL. So the second solution is more concentrated." },
    ],
  },
  {
    id: "s4", category: "Solubility", title: "Solubility and Temperature", heading: "Solubility and the Effect of Temperature",
    sub: "Why hot tea dissolves more sugar, and how salt is made.",
    blocks: [
      { t: "key", title: "Solubility", s: "**Solubility** is the **maximum amount of solute that can dissolve in a fixed quantity (100 mL) of a solvent at a particular temperature**." },
      { t: "dia", id: "sl_solubility" },
      { t: "ul", items: [
        "In Activity 2, water at **70 °C** dissolves more baking soda (sodium hydrogen carbonate) than water at **50 °C**, and water at **20 °C** dissolves even less.",
        "For **most substances**, the solubility **increases** with an increase in temperature.",
        "So a saturated solution at one temperature behaves as an unsaturated solution when it is heated.",
      ] },
      { t: "note", title: "Too much sugar in your tea?", s: "When sugar stops dissolving in the tea, you can dissolve it by **heating the tea** or by **adding more tea** (more solvent)." },
      { t: "h", s: "Salt from sea water" },
      { t: "ul", items: [
        "Common salt is obtained from sea water in **shallow salt pans**. The **heat of the Sun evaporates the water** and the salt crystals are left behind. Workers collect and heap them.",
      ] },
      { t: "note", title: "Our scientific heritage: salt of Ningel", s: "**Ningel village** in **Thoubal district of Manipur** still makes salt by traditional methods. Salty water is drawn from **salt wells**, one of which is lined with a **100-year-old tree trunk**. Mostly **women** boil the salt solution in large metal pans over firewood kilns. The water evaporates and **salt crystals** form. The salt is shaped into round **salt cakes** using banana leaves and wrapped in a traditional cloth (**phanek**). The salt cakes are believed to have medicinal value, and the practice is a part of history, culture and belief." },
    ],
  },
  {
    id: "s5", category: "Gases", title: "Solubility of Gases", heading: "Do Gases Also Dissolve in Water?",
    sub: "Why cold water is good for fish.",
    blocks: [
      { t: "ul", items: [
        "Many gases, including **oxygen**, dissolve in water. A mixture of a gas in water is a **uniform mixture**, because the gas dissolves evenly.",
        "Oxygen dissolves in water only to a **small extent**. Yet this **dissolved oxygen** keeps alive all aquatic life: plants, fishes and other organisms.",
        "The solubility of gases **decreases** with a **rise in temperature**. **Cold water holds more oxygen**, so aquatic life gets enough oxygen. **Warm water holds less oxygen.**",
      ] },
      { t: "dia", id: "sl_gases" },
      { t: "table", head: ["Solubility of solids in liquids", "Solubility of gases in liquids"], rows: [
        ["Generally **increases** with a rise in temperature", "**Decreases** with a rise in temperature"],
        ["Example: more sugar dissolves in hot tea", "Example: more oxygen dissolves in cold water"],
      ] },
    ],
  },
  {
    id: "s6", category: "Water as solvent", title: "Water as a Solvent", heading: "Why Is Water a Good Solvent?",
    sub: "Why salt dissolves in water but not in oil.",
    blocks: [
      { t: "p", s: "**Water dissolves more substances than any other common liquid**, so it is called the **universal solvent** and is the **most versatile** solvent (useful in many ways). **Salt and sugar dissolve in water, but not in oil.**" },
      { t: "dia", id: "sl_water" },
      { t: "ul", items: [
        "Water **cannot dissolve everything**: oil, grease, wax, paint and plastics do not dissolve in it.",
        "For such substances other solvents are used: **kerosene or petrol** for grease, **turpentine** for paint, **acetone** (nail polish remover) for nail polish and **alcohol** for many medicines and perfumes.",
        "So water is the most useful solvent in daily life and in living things, but it is **not a solvent for all substances**.",
      ] },
    ],
  },
];
