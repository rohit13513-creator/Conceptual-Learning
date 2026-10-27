import type { CTopic } from "./carbonNotesTypes";

// The Competition Zone: sharper tools, traps and Olympiad-style problems for Carbon and its Compounds.

export const CARBON_D: CTopic[] = [
  {
    id: "k19", category: "Competition Zone", title: "Competition Zone", heading: "Competition Zone",
    sub: "Quick counting rules, traps, tricky comparisons and Olympiad-style problems with answers.",
    blocks: [
      { t: "note", title: "How to use this zone", s: "Olympiad and foundation-level papers do not ask you to repeat a definition. They ask you to **count bonds**, **find isomers**, **compare boiling points**, **choose the right test** and **balance equations quickly**. Learn the tools below, then try the problems before you read the answers." },
      { t: "h", s: "Ten tools that save time" },
      { t: "ol", items: [
        "**Counting covalent bonds.** Alkane C_{n}H_{2n+2}: **3n + 1** bonds (n − 1 of C–C and 2n + 2 of C–H). Alkene C_{n}H_{2n} (and cycloalkane): **3n** bonds. Alkyne C_{n}H_{2n−2}: **3n − 1** bonds. A double bond counts as 2 bonds and a triple bond as 3. Check: ethane 7, ethene 6, ethyne 5, cyclohexane 18.",
        "**Formula to family.** Compare H with 2C: H = 2C + 2 → alkane; H = 2C → alkene or cycloalkane; H = 2C − 2 → alkyne (or a ring with one double bond, or a diene). A hydrocarbon with a ring **and** a double bond has 2 fewer hydrogens than the cycloalkane.",
        "**Valence electron count.** Total outer electrons of all atoms must equal the electrons drawn. CO2: 4 + 6 + 6 = 16. H2O: 6 + 1 + 1 = 8. Every atom except H must end with 8 outer electrons (H with 2).",
        "**Number of isomers of alkanes:** C4 → 2, C5 → 3, C6 → 5, C7 → 9, C8 → 18. For C4H8 there are 3 alkenes (but-1-ene, but-2-ene, 2-methylpropene) and 2 rings (cyclobutane, methylcyclopropane): **5 structural isomers** in all.",
        "**Same formula, different class (functional isomers):** alcohol ⇄ ether (C_{n}H_{2n+2}O), aldehyde ⇄ ketone (C_{n}H_{2n}O), acid ⇄ ester (C_{n}H_{2n}O_{2}), and ring–chain isomers such as alkene ⇄ cycloalkane (C_{n}H_{2n}) and alkyne ⇄ diene.",
        "**Smallest member:** alkene and alkyne need 2 carbons; ketone needs 3; branched alkane (isomer) needs 4; ring needs 3.",
        "**Combustion balancing:** for C_{x}H_{y}O_{z}, oxygen needed per mole = x + y/4 − z/2. Propane: 3 + 2 = 5. Ethanol: 2 + 1.5 − 0.5 = 3. Ethyne: 2 + 0.5 = 2.5. Butane: 4 + 2.5 = 6.5, so 2C4H10 + 13O2 → 8CO2 + 10H2O.",
        "**Percentage of carbon decides the flame.** The higher the %C, the sootier the flame (see problem 3).",
        "**Naming order:** (1) main group, (2) double or triple bond, (3) branches. Lowest numbers go in that order. Never write a number for –COOH or –CHO (they are carbon 1).",
        "**Tests (pick the cheapest):** unsaturation → bromine water. Alcohol → sodium (H2 pop). Carboxylic acid → NaHCO3 (CO2, milky limewater). Carbon in a sample → burn and limewater. Hard water → soap (not detergent).",
      ] },
      { t: "h", s: "Traps to avoid" },
      { t: "ul", items: [
        "**A ring is not always unsaturated.** Cycloalkanes (C_{n}H_{2n}) are **saturated** (only single bonds) even though they have the same formula as alkenes.",
        "**“Saturated” means single C–C bonds only,** not “no double bond anywhere”. A C=O group does not make a compound unsaturated in this sense.",
        "**Ethanol is neutral.** It has an –OH group but does not turn litmus red. Ethanoic acid is acidic, but only a **weak** acid.",
        "**Alcohol and acid both give hydrogen with sodium.** Use NaHCO3 to separate them: only the acid gives CO2.",
        "**Both diamond and graphite burn to CO2 only,** but only graphite conducts electricity.",
        "**Clean flame does not mean no carbon.** Saturated compounds burn with a clean blue flame and still give CO2.",
        "**Soap solution is alkaline** (salt of a strong base and a weak acid). It turns red litmus blue.",
        "**A detergent cannot show hardness** because it lathers in hard water too.",
        "**Ketones resist mild oxidation;** aldehydes do not. Ethanol, an alcohol with –OH on the end carbon, is oxidised to an acid.",
        "**Dehydration needs conc. H2SO4 and 443 K.** At a lower temperature other products form. Concentrated H2SO4 here is a dehydrating agent, not an oxidising agent.",
      ] },
      { t: "h", s: "Boiling points: why they rise" },
      { t: "p", s: "Compare five compounds with two carbon atoms. They have almost the same size, but their boiling points are very different because the **forces between molecules** are different. Molecules with an –OH group (alcohols, acids) hold each other by **hydrogen bonds**. Ethers cannot form hydrogen bonds with each other. A carboxylic acid forms the strongest hydrogen bonds (two per pair)." },
      { t: "dia", id: "ch_bp" },
      { t: "key", title: "Rule of thumb", s: "Same family: the **longer the chain, the higher the boiling point**. Different families with similar mass: **acid > alcohol > aldehyde > ether > alkane**." },
      { t: "h", s: "Problems with answers" },
      { t: "qa", title: "Problem 1: Counting bonds", items: [
        ["How many covalent bonds does a molecule of butane (C4H10) have? How many does but-1-ene (C4H8) have?", "Butane: 3n + 1 = 13 bonds (3 C–C and 10 C–H). But-1-ene: 3n = 12 bonds (1 C=C counted as 2, 2 C–C, 8 C–H: 2 + 2 + 8 = 12)."],
        ["How many shared pairs of electrons are in a molecule of CO2? In N2?", "CO2 has 2 double bonds = 4 shared pairs. N2 has 1 triple bond = 3 shared pairs."],
      ] },
      { t: "qa", title: "Problem 2: Isomers", items: [
        ["Draw all the structural isomers of C3H8O.", "Three: propan-1-ol (CH3CH2CH2OH), propan-2-ol (CH3CH(OH)CH3) and methoxyethane (CH3OCH2CH3). The first two are alcohols (chain/position isomers); methoxyethane is an ether (a functional isomer)."],
        ["Propanal and propanone both have the formula C3H6O. What is this kind of isomerism? How can you tell them apart?", "Functional isomerism (aldehyde and ketone). The aldehyde is easily oxidised to propanoic acid by alkaline KMnO4 (the pink colour goes); the ketone resists mild oxidation."],
      ] },
      { t: "dias", ids: ["m_propan1ol", "m_propan2ol", "m_methoxyethane"] },
      { t: "dias", ids: ["m_propanal", "m_propanone"] },
      { t: "qa", title: "Problem 3: Which gives the sootiest flame?", items: [
        ["Find the percentage of carbon in CH4, C2H6, C2H4 and C2H2. Arrange the flames from cleanest to sootiest.", "%C = 12n ÷ molar mass: CH4 = 12 ÷ 16 = 75%. C2H6 = 24 ÷ 30 = 80%. C2H4 = 24 ÷ 28 = 85.7%. C2H2 = 24 ÷ 26 = 92.3%. Cleanest to sootiest: CH4 < C2H6 < C2H4 < C2H2. More carbon per molecule means that the air has too little oxygen to burn it all, so unburnt carbon glows and escapes as soot."],
      ] },
      { t: "qa", title: "Problem 4: Quantities in combustion", items: [
        ["How much CO2 and water do 16 g of methane give on complete combustion? (C = 12, H = 1, O = 16)", "CH4 + 2O2 → CO2 + 2H2O. 16 g of CH4 is 1 mole. It gives 1 mole of CO2 = 44 g and 2 moles of H2O = 36 g. It needs 2 moles of O2 = 64 g."],
        ["How many moles of oxygen are needed to burn 1 mole of propane?", "C3H8 + 5O2 → 3CO2 + 4H2O. So 5 moles of oxygen."],
        ["Write the balanced equation for the complete combustion of butane.", "2C4H10 + 13O2 → 8CO2 + 10H2O."],
      ] },
      { t: "qa", title: "Problem 5: Identify the compound", items: [
        ["A liquid X turns blue litmus red and gives bubbles of a gas that turns limewater milky when NaHCO3 is added. When warmed with ethanol and a few drops of conc. H2SO4 it gives a sweet smell. What is X? Name the gas and the sweet-smelling product.", "X is a carboxylic acid (for example ethanoic acid). The gas is carbon dioxide. The sweet-smelling product is an ester (ethyl ethanoate with ethanol and ethanoic acid)."],
        ["A colourless liquid Y has no effect on litmus. It reacts with sodium and gives a gas that burns with a pop. It burns with a clean blue flame. Heating with conc. H2SO4 at 443 K gives a gas Z that decolourises bromine water. Name Y and Z.", "Y is ethanol (neutral, gives H2 with sodium, burns with a clean flame). Z is ethene (unsaturated, decolourises bromine water)."],
        ["A hydrocarbon has 4 carbon atoms and 6 hydrogen atoms. It burns with a sooty flame and decolourises bromine water. To which family does it belong?", "H = 2C − 2 = 6, so it is an alkyne (C4H6): but-1-yne or but-2-yne. A ring with one double bond (cyclobutene) also fits the formula, so the formula alone does not decide."],
      ] },
      { t: "qa", title: "Problem 6: Ester and its parent compounds", items: [
        ["Name the acid and the alcohol that make ethyl butanoate (C3H7COOC2H5). What is its molar mass?", "Acid: butanoic acid (C3H7COOH). Alcohol: ethanol (C2H5OH). The ester is C6H12O2: 6 × 12 + 12 + 2 × 16 = 116 g per mole. Remember: the part with C=O comes from the acid, the other part from the alcohol."],
        ["What are the products of saponification of ethyl ethanoate with NaOH?", "Ethanol and sodium ethanoate: CH3COOC2H5 + NaOH → C2H5OH + CH3COONa."],
      ] },
      { t: "qa", title: "Problem 7: Choose the test", items: [
        ["How would you distinguish (a) cooking oil from butter, (b) ethanol from ethanoic acid, (c) hard water from soft water, (d) propane from propene?", "(a) Add bromine water: oil (unsaturated) decolourises it, butter (saturated) does not. (b) Add NaHCO3: the acid gives bubbles of CO2, ethanol does not. (c) Add soap: soft water gives lather, hard water gives scum. (d) Bromine water: propene decolourises it, propane does not (also: propene burns with a sooty flame)."],
      ] },
      { t: "qa", title: "Problem 8: Naming puzzles", items: [
        ["Name CH3–CH(OH)–CH2–CH3 and CH2=CH–CH2–OH.", "The first is butan-2-ol (number the chain so that the –OH gets the lowest number: 2, not 3). The second is prop-2-en-1-ol: the –OH has priority and takes number 1, the double bond then gets 2."],
        ["Why is CH3–CH2–CH(CH3)–CH3 called 2-methylbutane and not 3-methylbutane?", "The longest chain has 4 carbons. Numbering from the end nearer the branch gives the branch the number 2, which is lower than 3."],
      ] },
      { t: "qa", title: "Problem 9: Reasoning", items: [
        ["Why do ionic compounds conduct electricity when molten but covalent compounds do not?", "Molten ionic compounds have free ions that carry charge. Covalent compounds have neutral molecules and no ions."],
        ["Why does graphite conduct electricity but diamond does not?", "In graphite each carbon uses only 3 outer electrons for bonds, so one electron per atom is free to move along the layers. In diamond all 4 are used in bonds."],
        ["Why does a micelle not form when soap is dissolved in ethanol?", "Soap dissolves completely in ethanol (both its ionic head and its tail are soluble), so there is no reason for the molecules to cluster."],
        ["Why does adding common salt help soap to separate out during manufacture?", "Salt lowers the solubility of soap in water (“salting out”), so the soap comes out as a solid."],
      ] },
      { t: "h", s: "A little beyond the syllabus" },
      { t: "ul", items: [
        "**Cis–trans isomers.** But-2-ene can have its two CH3 groups on the same side (cis) or on opposite sides (trans) of the double bond, because a double bond cannot rotate. Counting these, C4H8 has more isomers than the 5 listed above.",
        "**Polymers.** Many ethene molecules join by addition to make **polythene**: n CH2=CH2 → (–CH2–CH2–)n. This is **addition polymerisation**.",
        "**Degree of unsaturation.** For C_{x}H_{y}: (2x + 2 − y) ÷ 2 counts rings plus double bonds (a triple bond counts as 2). C6H6 gives 4; C4H8 gives 1; C3H8 gives 0.",
        "**Cracking.** Big alkane molecules are broken into smaller alkanes and alkenes by heat and catalysts: this is how ethene is made from petroleum.",
        "**Hydrogen bonding** explains why ethanol dissolves in water, why acids and alcohols boil higher than ethers, and why lower acids mix with water.",
      ] },
      { t: "qa", title: "Quick-fire questions (answers given)", items: [
        ["(a) 7  (b) 6  (c) 8  (d) 9. How many covalent bonds are in ethane?", "(a) 7."],
        ["Which pair are functional isomers (same formula, different functional group)? (a) butane and 2-methylpropane  (b) ethanol and methoxymethane  (c) propene and cyclopropane  (d) ethane and ethene", "(b). Ethanol and methoxymethane (both C2H6O) have different functional groups. Pair (a) are chain isomers, pair (c) are ring–chain isomers (both C3H6), and pair (d) have different formulae."],
        ["The oxidising agents used for ethanol are (a) H2/Ni  (b) alkaline KMnO4  (c) conc. H2SO4 at 443 K  (d) Cl2 in sunlight", "(b). (a) adds hydrogen, (c) removes water, (d) substitutes chlorine."],
        ["The general formula C_{n}H_{2n−2} belongs to (a) alkanes  (b) alkenes  (c) alkynes  (d) alcohols", "(c) alkynes."],
        ["Which of these shows a clean blue flame? (a) naphthalene  (b) camphor  (c) alcohol  (d) a kerosene lamp", "(c) alcohol."],
        ["The simplest test to separate ethanoic acid from ethanol is (a) litmus (b) sodium (c) NaHCO3 (d) smell", "(c) NaHCO3: only the acid gives brisk bubbles of CO2. (Litmus also works, but sodium does not separate them.)"],
      ] },
    ],
  },
];
