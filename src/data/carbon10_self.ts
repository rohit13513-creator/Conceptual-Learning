import type { QuizQuestion } from "../types-custom";
import { u } from "./carbon10Util";

// SELF ASSESSMENT: Class X, Carbon and its Compounds. 80 questions, 50 minutes.
// Every question stays inside the chapter (sections 4.1 to 4.5 of the textbook): covalent bonding, versatile carbon, allotropes,
// saturated and unsaturated compounds, chains, branches and rings, isomers of pentane, functional groups, homologous series,
// naming (Table 4.4), combustion, oxidation, addition, substitution, ethanol, ethanoic acid, soaps and detergents.

let id = 0;
const q = (question: string, correct: string, wrong: [string, string, string], explanation: string): QuizQuestion => {
  id++;
  const pos = (id * 3 + 1) % 4;
  const options = [...wrong];
  options.splice(pos, 0, correct);
  return { id, question: u(question), options: options.map(u), correctAnswer: pos, explanation: u(explanation) };
};
const AR = ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"];
const ar = (assertion: string, reason: string, right: number, explanation: string): QuizQuestion => {
  id++;
  return { id, question: u(`Assertion (A): ${assertion}\nReason (R): ${reason}`), options: AR, correctAnswer: right, explanation: u(explanation) };
};

const RAW_SELF: QuizQuestion[] = [
  // ── covalent bonding (8) ──
  q("Table: methane m.p. 90 K, b.p. 111 K; ethanol m.p. 156 K, b.p. 351 K; chloroform m.p. 209 K, b.p. 334 K; ethanoic acid m.p. 290 K, b.p. 391 K. At 300 K the states of methane, ethanol, chloroform and ethanoic acid are respectively", "gas, liquid, liquid, liquid", ["gas, liquid, solid, liquid", "liquid, liquid, liquid, solid", "gas, gas, liquid, solid"], "At 300 K: methane is above its b.p. (gas). Ethanol (156–351 K), chloroform (209–334 K) and ethanoic acid (290–391 K) are all between m.p. and b.p., so liquids."),
  q("In a molecule of ethene (C2H4), the total number of shared pairs of electrons is", "6", ["4", "5", "7"], "The C=C bond has two shared pairs and the four C–H bonds have one each: 2 + 4 = 6."),
  q("In chloromethane (CH3Cl), the number of electrons on chlorine that are NOT shared is", "6", ["2", "4", "8"], "Chlorine has 7 outer electrons; one is shared in the C–Cl bond; the other 6 form three lone pairs."),
  q("An element Y has atomic number 7. It combines with hydrogen to form YH3. In this molecule Y has", "three shared pairs and one lone pair", ["four shared pairs", "two shared pairs and two lone pairs", "three shared pairs and no lone pair"], "Y (2, 5) needs three electrons, so it shares three pairs and keeps one lone pair, like nitrogen in NH3."),
  q("Which of the following molecules has both single bonds and a double bond?", "Methanal, H–CHO", ["Carbon dioxide, CO2", "Nitrogen, N2", "Oxygen, O2"], "In methanal, H–C(=O)–H, carbon forms two C–H single bonds and one C=O double bond. CO2 has two double bonds, N2 a triple bond and O2 one double bond."),
  ar("Carbon compounds are generally poor conductors of electricity.", "Carbon forms covalent bonds, and covalent bonding does not give rise to ions.", 0, "Without ions or free charged particles, there is nothing to carry current, so R explains A."),
  q("Which statement about a covalent bond is NOT correct?", "The electrons are given by one atom to the other", ["Shared electrons belong to the outermost shell of both atoms", "Both atoms reach a completely filled outer shell", "A double bond has two shared pairs"], "That describes an ionic bond (transfer). In a covalent bond electrons are shared."),
  q("The forces between molecules of covalent compounds are weak. This explains why", "their melting and boiling points are low", ["their bonds are easily broken inside the molecule", "they are good conductors of electricity", "they form ions in water"], "The attraction between molecules is overcome with little energy; the bonds inside the molecules are strong."),

  // ── versatile nature and allotropes (8) ──
  q("Which two properties of carbon together explain the huge number of carbon compounds?", "Tetravalency and catenation", ["Small size and high density", "Ionic bonding and metallic character", "Allotropy and isomerism"], "Catenation gives chains, branches and rings; tetravalency lets each carbon bond to four atoms."),
  q("Silicon forms compounds with hydrogen having chains of up to 7 or 8 atoms, but these compounds are very reactive. The main reason is that", "the silicon–silicon bond is weak because silicon atoms are larger", ["silicon has valency 2", "silicon is a metal", "silicon has no valence electrons"], "Bonds formed by bigger atoms are weaker, because the nucleus holds the shared electrons less strongly."),
  q("Diamond and graphite are both made of carbon. Which of the following is TRUE for both?", "They burn in oxygen to give carbon dioxide only", ["They conduct electricity", "They have the same hardness", "Each carbon is bonded to four others"], "Chemical properties are the same; physical properties differ."),
  q("In graphite, one of the three bonds of each carbon atom in the hexagonal array is a double bond. The reason is that", "carbon must satisfy its valency of four", ["graphite is a metal", "the layers are close together", "carbon has six valence electrons"], "Each carbon has three neighbours (three single bonds) so one of them must be double for valency 4."),
  q("Which is the correct statement about C-60?", "It has carbon atoms arranged in the shape of a football", ["It is the hardest known substance", "It is a form of graphite", "It is formed only by burning diamond"], "C-60 is a fullerene; the first one identified, shaped like a football (geodesic dome of Buckminster Fuller)."),
  q("Synthetic diamonds are made by", "subjecting pure carbon to very high pressure and temperature", ["heating graphite in air", "burning diamond in oxygen", "heating carbon dioxide with water"], "They are small but otherwise indistinguishable from natural diamonds."),
  q("Friedrich Wöhler’s experiment of 1828 showed that", "an organic compound can be made from an inorganic compound without a living system", ["organic compounds are all poisonous", "urea cannot be made in a laboratory", "carbon has no allotropes"], "He prepared urea from ammonium cyanate and disproved the ‘vital force’ idea."),
  ar("Graphite is a good conductor of electricity but diamond is not.", "In graphite each carbon atom is bonded to three others, leaving one valence electron free.", 0, "The free electron carries charge. Diamond uses all four valence electrons in bonds."),

  // ── saturated, unsaturated, chains, branches, rings (11) ──
  q("A hydrocarbon has 5 carbon atoms and 10 hydrogen atoms. It could be", "an alkene or a ring compound", ["an alkane only", "an alkyne", "a compound with a triple bond"], "C5H10 fits CnH2n: an alkene (pentene) or a cycloalkane (cyclopentane)."),
  q("A hydrocarbon has the formula C6H10. If it has no ring, it must contain", "one triple bond", ["only single bonds", "three double bonds", "a benzene ring"], "CnH2n−2 is the formula of alkynes (or a compound with two double bonds). With no ring and one unsaturation of this kind, a triple bond fits."),
  q("The number of hydrogen atoms in a molecule of an alkyne with 5 carbon atoms is", "8", ["10", "12", "6"], "CnH2n−2 with n = 5 gives 2(5) − 2 = 8."),
  q("Which of these is a saturated compound even though it has the same molecular formula as an alkene?", "Cyclohexane", ["Benzene", "Ethyne", "Propene"], "C6H12 is CnH2n but all its C–C bonds are single, so it is saturated."),
  q("Ethane (C2H6) has", "seven covalent bonds", ["six covalent bonds", "eight covalent bonds", "nine covalent bonds"], "1 C–C bond and 6 C–H bonds."),
  q("Cyclohexane has how many covalent bonds in its molecule?", "18", ["12", "15", "21"], "6 C–C bonds in the ring and 12 C–H bonds."),
  q("How many structural isomers are possible for pentane?", "3", ["2", "4", "5"], "Pentane, 2-methylbutane and 2,2-dimethylpropane."),
  q("Butane and 2-methylpropane are", "structural isomers", ["members of one homologous series", "allotropes", "alkenes"], "Both are C4H10 but one is a straight chain and the other has a branch."),
  q("Which statement about saturated and unsaturated hydrocarbons is correct?", "Unsaturated hydrocarbons are more reactive than saturated ones", ["Saturated hydrocarbons contain double bonds", "Unsaturated hydrocarbons have only single bonds", "Both burn with a very sooty flame in air"], "Double and triple bonds make a compound more reactive."),
  q("The saturated hydrocarbon among C3H8, C3H6 and C3H4 and the number of its covalent bonds are", "C3H8 with 10 bonds", ["C3H6 with 9 bonds", "C3H4 with 7 bonds", "C3H8 with 11 bonds"], "Propane has 2 C–C and 8 C–H bonds: 10."),
  q("Which is the correct electron dot description of ethyne (C2H2)?", "Three shared pairs between the carbons and one shared pair between each C and H", ["Two shared pairs between the carbons", "Four shared pairs between the carbons", "One shared pair between the carbons"], "Each carbon needs 4 pairs: 3 with the other carbon and 1 with hydrogen."),

  // ── functional groups, homologous series, naming (11) ──
  q("A compound has the structure CH3–CH2–CH2–CHO. Its name is", "butanal", ["butanone", "butan-1-ol", "propanal"], "Four carbons and the aldehyde group (suffix –al)."),
  q("The functional group in butanone and the number of carbon atoms in its chain are", "ketone and four", ["aldehyde and four", "ketone and three", "alcohol and four"], "Butanone is a four-carbon ketone: CH3–CO–CH2–CH3."),
  q("Which is the correct name of CH3–CH2–CH2–Cl?", "Chloropropane", ["Propyl chloroethane", "Chloroethane", "Propanol chloride"], "Halogens are named with a prefix: chloro + propane."),
  q("Propane − ‘e’ + ‘one’ gives", "propanone", ["propaneone", "propanal", "propanol"], "If the suffix starts with a vowel, the final ‘e’ of the carbon chain name is dropped."),
  q("Which pair differs by a –CH2– unit?", "C2H5OH and C3H7OH", ["CH3OH and CH3COOH", "C2H4 and C2H6", "CH4 and C3H8"], "C3H7OH − C2H5OH = CH2. The other pairs differ by more or by different groups."),
  q("The difference in molecular mass between ethanol (C2H5OH) and propanol (C3H7OH) is (C = 12 u, H = 1 u)", "14 u", ["12 u", "16 u", "28 u"], "A CH2 unit: 12 + 2 = 14 u."),
  q("A homologous series of alkenes begins with ethene. The next three members are", "C3H6, C4H8, C5H10", ["C3H8, C4H10, C5H12", "C3H4, C4H6, C5H8", "C3H6, C4H10, C5H14"], "The general formula of alkenes is CnH2n."),
  q("What is common to CH3OH, C2H5OH, C3H7OH and C4H9OH?", "They have similar chemical properties because of the same functional group", ["They have identical boiling points", "They have the same number of carbon atoms", "They are all isomers"], "The functional group –OH decides the chemical behaviour. Physical properties change gradually."),
  q("Which is the structure of ethanoic acid?", "CH3–C(=O)–OH", ["CH3–CH2–OH", "CH3–C(=O)–H", "H–C(=O)–OH"], "Two carbons and the –COOH group. The last is methanoic acid."),
  q("Bromopentane (C5H11Br) can have structural isomers because", "the bromine can be on different carbon atoms and the chain can be branched", ["bromine is a metal", "pentane has only one structure", "the molecule has a double bond"], "Position of the halogen and branching of the carbon chain give different structures."),
  q("The names of compounds with the functional groups –OH, –CHO, >C=O and –COOH having three carbon atoms are respectively", "propanol, propanal, propanone, propanoic acid", ["propanal, propanol, propanone, propanoic acid", "propanol, propanone, propanal, propanoic acid", "propanol, propanal, propanoic acid, propanone"], "Suffixes: –ol (alcohol), –al (aldehyde), –one (ketone), –oic acid (carboxylic acid)."),

  // ── combustion and fuels (8) ──
  q("The balanced equation for the combustion of ethanol is", "CH3CH2OH + 3O2 → 2CO2 + 3H2O + heat and light", ["CH3CH2OH + 2O2 → 2CO2 + 3H2O", "CH3CH2OH + O2 → CO2 + H2O", "2CH3CH2OH + 3O2 → 2CO2 + 3H2O"], "Carbon: 2 each side. Hydrogen: 6 each side. Oxygen: 1 + 6 = 7 on the left, 4 + 3 = 7 on the right."),
  q("When methane burns, the coefficients of CH4, O2, CO2 and H2O in the balanced equation are", "1, 2, 1, 2", ["1, 1, 1, 2", "2, 1, 2, 1", "1, 3, 1, 2"], "CH4 + 2O2 → CO2 + 2H2O."),
  q("In Activity of burning naphthalene, camphor and alcohol, a black deposit on the metal plate is seen with", "naphthalene and camphor only", ["alcohol only", "all three", "none of them"], "They burn incompletely with a sooty yellow flame; alcohol burns with a clean flame."),
  q("A gas stove has holes for air to enter so that", "the fuel burns completely with a clean blue flame", ["the flame becomes sooty", "the gas does not burn", "the stove becomes colder"], "Enough oxygen gives complete combustion."),
  q("If the bottom of a cooking vessel is getting blackened, the correct step is to", "clear the air holes of the stove", ["add more fuel", "use wet fuel", "close the air holes"], "Blackening means the fuel is burning incompletely, since air is not entering freely."),
  q("Coal and petroleum are called fossil fuels because they", "were formed from biomass that was buried and acted on by biological and geological processes", ["contain fossil bones", "burn without a flame", "are renewable"], "Coal came from plants; oil and gas from tiny sea organisms."),
  q("Ethyne is burnt with oxygen and not with air for welding because", "in air it burns incompletely and does not give a hot enough flame", ["it does not burn in air", "oxygen is cheaper than air", "air makes it explosive"], "Pure oxygen gives complete burning and a very high temperature."),
  ar("A flame is produced only when gaseous substances burn.", "Charcoal in an angithi glows red without a flame after its volatile substances have burnt away.", 0, "Volatile vapours burn with a flame at first; solid charcoal glows without a flame."),

  // ── oxidation, addition, substitution (9) ──
  q("Which change is an oxidation reaction?", "Ethanol to ethanoic acid", ["Ethene to ethane", "Methane to chloromethane", "Ethyne to ethane"], "Oxygen is added to ethanol. The others are addition or substitution."),
  q("Which of the following are oxidising agents?", "Alkaline potassium permanganate and acidified potassium dichromate", ["Nickel and palladium", "Sodium hydroxide and sulphuric acid", "Water and ethanol"], "They add oxygen to alcohols, giving carboxylic acids."),
  q("On adding alkaline KMnO4 drop by drop to warm ethanol, the pink colour at first disappears and later persists because", "the KMnO4 is used up at first and later the ethanol is finished", ["ethanol is a reducing agent only", "KMnO4 is decomposed by heat", "ethanol absorbs light"], "Once all ethanol is oxidised, excess KMnO4 remains and its colour stays."),
  q("Unsaturated hydrocarbons add hydrogen in the presence of", "a catalyst such as nickel or palladium", ["concentrated sulphuric acid", "sunlight and chlorine", "alkaline KMnO4"], "This hydrogenation turns unsaturated compounds into saturated ones."),
  q("Which hydrocarbons among C2H6, C3H8, C3H6, C2H2 and CH4 undergo addition reactions?", "C3H6 and C2H2", ["C2H6 and CH4", "C3H8 and C3H6", "C2H6 and C2H2"], "Only the unsaturated ones (alkene and alkyne)."),
  q("Vegetable oils are converted into vanaspati ghee by", "hydrogenation using a nickel catalyst", ["oxidation with KMnO4", "chlorination in sunlight", "dehydration with sulphuric acid"], "Unsaturated oils add hydrogen and become saturated fats."),
  q("CH4 + Cl2 → CH3Cl + HCl in the presence of sunlight is a", "substitution reaction", ["addition reaction", "combustion reaction", "oxidation reaction"], "One atom (Cl) takes the place of another (H)."),
  q("A student wants to differentiate between two samples, one of a saturated and one of an unsaturated hydrocarbon, using only a flame. She would observe that", "the unsaturated one burns with a yellow sooty flame and the saturated one with a clean flame", ["both burn with a blue flame", "the saturated one gives a sooty flame", "neither burns in air"], "Unsaturated hydrocarbons give a yellow flame with lots of black smoke."),
  q("Cooking oils with unsaturated fatty acids are recommended for cooking, while animal fats are not, because animal fats generally have", "saturated fatty acids that are said to be harmful for health", ["double bonds in their chains", "no carbon", "nitrogen in the chain"], "Vegetable oils generally have long unsaturated chains; animal fats have saturated chains."),

  // ── ethanol (7) ──
  q("When a small piece of sodium is dropped into ethanol, the gas evolved burns with a pop sound. The gas and the other product are", "hydrogen and sodium ethoxide", ["oxygen and sodium hydroxide", "carbon dioxide and sodium ethanoate", "hydrogen and sodium hydroxide"], "2Na + 2CH3CH2OH → 2CH3CH2ONa + H2."),
  q("Ethanol is heated at 443 K with excess concentrated sulphuric acid. The product and the role of the acid are", "ethene; dehydrating agent", ["ethanoic acid; oxidising agent", "ethane; reducing agent", "ethyl ethanoate; catalyst"], "H2SO4 removes water from ethanol to give ethene."),
  q("Which is true for ethanol?", "It is soluble in water in all proportions", ["It is a gas at room temperature", "It is a strong acid", "It is insoluble in water"], "Ethanol is a liquid (b.p. 351 K) and mixes with water completely."),
  q("Denatured alcohol is", "ethanol made unfit for drinking by adding poisonous substances such as methanol and a blue dye", ["ethanol with added water", "pure methanol", "ethanol without any impurity"], "This prevents the misuse of industrial ethanol."),
  q("Which statement about methanol is correct?", "Small quantities can cause death because it is oxidised to methanal in the liver", ["It is the active ingredient of alcoholic drinks", "It is safer than ethanol", "It does not affect the optic nerve"], "Methanal coagulates protoplasm, and methanol also affects the optic nerve, causing blindness."),
  q("Some countries add alcohol to petrol because alcohol", "is a cleaner fuel giving only carbon dioxide and water on burning in enough air", ["is cheaper than water", "is a heavier fuel", "does not burn"], "Sugarcane juice gives molasses, which is fermented to ethanol."),
  ar("Even a small quantity of pure ethanol (absolute alcohol) can be lethal.", "Ethanol is oxidised in the liver to methanal, which is the same product as that from methanol.", 2, "A is true. R is false: it is methanol that is oxidised to methanal. Ethanol slows the nervous system."),

  // ── ethanoic acid (7) ──
  q("A 5–8% solution of ethanoic acid in water is called", "vinegar", ["glacial acetic acid", "absolute alcohol", "denatured alcohol"], "It is used as a preservative in pickles."),
  q("Pure ethanoic acid is called glacial acetic acid because", "it freezes in cold climates, since its melting point is 290 K", ["it is found in glaciers", "it boils at 290 K", "it is very cold"], "Its freezing point is just 17 °C."),
  q("Ethanoic acid is a weak acid. This is shown by", "universal indicator giving a colour for a higher pH than for HCl of the same dilution", ["its failure to turn blue litmus red", "its reaction with sodium hydroxide", "its sour smell"], "Both turn litmus red, but universal indicator shows ethanoic acid as the weaker acid."),
  q("In the esterification of ethanoic acid with ethanol, concentrated sulphuric acid is added as", "an acid catalyst", ["an oxidising agent", "a solvent", "a product"], "It speeds up the reaction between the acid and the alcohol."),
  q("The reaction of an ester with sodium hydroxide that gives an alcohol and the sodium salt of a carboxylic acid is called", "saponification", ["hydrogenation", "esterification", "dehydration"], "It is the reaction used to prepare soap."),
  q("Ethanoic acid and sodium carbonate react to give", "sodium ethanoate, water and carbon dioxide", ["sodium ethoxide and hydrogen", "ethanol and sodium carbonate", "ethyl ethanoate and water"], "2CH3COOH + Na2CO3 → 2CH3COONa + H2O + CO2."),
  q("A test tube contains either ethanol or ethanoic acid. Which single test will tell them apart?", "Add sodium hydrogencarbonate and look for brisk bubbles", ["Add sodium and look for bubbles", "Look at the colour", "Check whether each dissolves in water"], "Sodium reacts with both to give hydrogen, so it cannot tell them apart. Only the acid gives CO2 with NaHCO3."),

  // ── soaps and detergents (11) ──
  q("Soap molecules are", "sodium or potassium salts of long-chain carboxylic acids", ["sodium salts of sulphonic acids", "long-chain hydrocarbons", "esters of acids and alcohols"], "For example sodium stearate."),
  q("In a micelle formed in water, the hydrocarbon tails of the soap molecules are", "in the interior of the cluster", ["on the surface of the cluster", "dissolved in the water", "pointing towards the water"], "The ionic ends are on the surface in contact with water."),
  q("Why do micelles of soap not come together and precipitate?", "Because of ion–ion repulsion between their outer ionic surfaces", ["Because they are neutral", "Because they are heavy", "Because oil attracts them"], "All the outer surfaces carry the same charge."),
  q("A soap solution appears cloudy because", "the micelles are large enough to scatter light", ["soap is a coloured substance", "soap forms a precipitate", "air bubbles are trapped"], "Colloidal micelles scatter light."),
  q("When soap is added to hard water, the white curdy precipitate formed is", "the insoluble calcium or magnesium salt of the soap", ["sodium chloride", "calcium carbonate only", "the detergent"], "Calcium and magnesium salts of hard water react with soap."),
  q("Detergents are effective in hard water because", "their charged ends do not form insoluble precipitates with calcium and magnesium ions", ["they are not charged at all", "they have a short hydrocarbon chain", "they react with water"], "So no scum forms."),
  q("The test tube experiment: oil and water are shaken in tube A, and oil, water and soap in tube B. After some time", "the oil separates sooner in A than in B", ["the oil separates sooner in B", "the oil separates at the same time in both", "no oil is present in A"], "Soap helps oil stay mixed with water in B (emulsion)."),
  q("What is the correct statement about the tadpole-like structure of a soap molecule?", "It has a hydrophilic ionic head and a hydrophobic carbon chain tail", ["Both ends are hydrophobic", "It has a hydrophobic ionic end", "It has no long carbon chain"], "The ionic end interacts with water and the carbon chain with oil."),
  q("Soap is dissolved in a hydrocarbon. Compared with water, the micelle arrangement would", "be reversed, with the ionic ends inside and the hydrocarbon chains outside", ["be the same as in water", "not exist, because soap does not dissolve", "have all the molecules pointing outwards"], "The hydrocarbon solvent attracts the carbon chain, so the ionic ends cluster inside."),
  q("Which action best explains why clothes are beaten or scrubbed after applying soap?", "It helps the soap reach and loosen the oily dirt so that micelles can trap it", ["It makes the soap acidic", "It creates detergent from soap", "It makes oil dissolve in water"], "Agitation helps pull out the dirt, trapped in micelles, into the water."),
  q("Detergents are generally", "sodium salts of sulphonic acids or ammonium salts with chloride or bromide ions", ["sodium salts of carboxylic acids", "esters of ethanoic acid", "hydrocarbons only"], "Both have long hydrocarbon chains with a charged end."),
];

// Spread the correct answers evenly over A, B, C and D (assertion-reason questions keep their standard order).
export const CARBON10_SELF_ASSESSMENT: QuizQuestion[] = RAW_SELF.map((q, i) => {
  if (q.question.startsWith("Assertion (A)")) return q;
  const target = (i * 3 + 1) % 4;
  const opts = q.options.slice();
  [opts[q.correctAnswer], opts[target]] = [opts[target], opts[q.correctAnswer]];
  return { ...q, options: opts, correctAnswer: target };
});
