import type { QuizQuestion } from "../types-custom";
import { mc, ar } from "./mnm10Util";

// Class X Chemistry, Metals and Non-metals: 50 multiple-choice questions (10 of them assertion-reason).
// Every question stays inside Chapter 3 of the textbook.

export const MNM10_MCQS: QuizQuestion[] = [
  // ── physical properties ──
  mc("The property of metals by which they can be beaten into thin sheets is called", "malleability", ["ductility", "sonority", "lustre"], "Malleability is the ability to be beaten into sheets. Ductility is the ability to be drawn into wires."),
  mc("Which metal is the most ductile?", "Gold", ["Silver", "Copper", "Aluminium"], "About 2 km of wire can be drawn from one gram of gold."),
  mc("Which of the following is a liquid at room temperature?", "Mercury", ["Sodium", "Lead", "Iodine"], "Mercury is the only metal that is a liquid at room temperature. Sodium and lead are solids, and iodine is a solid non-metal."),
  mc("A metal that can be cut easily with a knife is", "sodium", ["iron", "copper", "aluminium"], "Alkali metals such as lithium, sodium and potassium are very soft."),
  mc("The best conductors of heat among the metals are", "silver and copper", ["lead and mercury", "iron and zinc", "sodium and potassium"], "Lead and mercury are comparatively poor conductors of heat.", "mnm_heat"),
  mc("Electric wires are coated with PVC because PVC", "does not conduct electricity", ["is a good conductor of heat", "is a metal", "is lustrous"], "A poor conductor of electricity protects us from shocks."),
  mc("Which of the following non-metals is lustrous?", "Iodine", ["Sulphur", "Coal", "Phosphorus"], "Iodine is a lustrous non-metal; sulphur and coal are dull."),
  mc("Which allotrope of carbon conducts electricity?", "Graphite", ["Diamond", "Both diamond and graphite", "Neither diamond nor graphite"], "Graphite conducts electricity. Diamond is the hardest natural substance but does not conduct."),
  // ── chemical properties of metals ──
  mc("Magnesium burns in air with", "a dazzling white flame", ["a blue flame", "a golden yellow flame", "no flame"], "It forms white magnesium oxide, a basic oxide."),
  mc("Sodium is kept immersed in kerosene oil because it", "catches fire if kept in the open", ["is soft", "is a poor conductor", "dissolves in air"], "It reacts so vigorously with oxygen that it can catch fire. Kerosene keeps air and moisture away."),
  mc("Oxides of aluminium and zinc that react with both acids and bases are called", "amphoteric oxides", ["acidic oxides", "basic oxides", "neutral oxides"], "Amphoteric oxides show both acidic and basic behaviour."),
  mc("When copper is heated in air, it forms a", "black coating of copper(II) oxide", ["white powder of copper oxide", "green coating of copper carbonate", "yellow flame"], "2Cu + O2 → 2CuO."),
  mc("Which of the following metals does not react with oxygen even at high temperature?", "Gold", ["Iron", "Zinc", "Copper"], "Silver and gold are the least reactive metals."),
  mc("Which of the following metals reacts with cold water violently and the hydrogen catches fire?", "Potassium", ["Calcium", "Magnesium", "Iron"], "The reaction of potassium and sodium is so exothermic that the hydrogen catches fire.", "mnm_water"),
  mc("Which metal reacts with hot water but not with cold water?", "Magnesium", ["Sodium", "Calcium", "Iron"], "Magnesium forms magnesium hydroxide and hydrogen with hot water."),
  mc("Iron reacts with steam to form", "Fe3O4 and hydrogen", ["Fe2O3 and oxygen", "FeO and carbon dioxide", "iron hydroxide only"], "3Fe + 4H2O → Fe3O4 + 4H2.", "mnm_steam"),
  mc("Which of the following metals does not react with water at all?", "Copper", ["Aluminium", "Zinc", "Iron"], "Lead, copper, silver and gold do not react with water or steam."),
  mc("In Activity 3.11, bubbles are formed fastest with", "magnesium", ["aluminium", "zinc", "iron"], "The order of reactivity with dilute acid is Mg > Al > Zn > Fe.", "mnm_acid"),
  mc("Hydrogen gas is not evolved when a metal reacts with nitric acid, because nitric acid is", "a strong oxidising agent", ["a weak acid", "a strong reducing agent", "a base"], "It oxidises the hydrogen produced to water."),
  mc("Aqua regia is a mixture of concentrated HCl and concentrated HNO3 in the ratio", "3 : 1", ["1 : 3", "1 : 1", "2 : 1"], "It can dissolve gold."),
  mc("An iron nail is dipped in copper sulphate solution. After some time", "the solution turns light green and copper is deposited", ["nothing happens", "the solution turns darker blue", "hydrogen gas is evolved"], "Iron is more reactive than copper and displaces it.", "mnm_displace"),
  // ── reactivity series and non-metals ──
  mc("The most reactive and the least reactive metals in the reactivity series are", "potassium and gold", ["sodium and silver", "potassium and copper", "calcium and gold"], "The series is K, Na, Ca, Mg, Al, Zn, Fe, Pb, [H], Cu, Hg, Ag, Au.", "mnm_series"),
  mc("Which of the following will displace hydrogen from dilute hydrochloric acid?", "Zinc", ["Copper", "Silver", "Mercury"], "Zinc is above hydrogen in the series."),
  mc("The oxides of non-metals are generally", "acidic or neutral", ["basic", "amphoteric", "only neutral"], "For example SO2 and CO2 are acidic, while CO is neutral."),
  mc("Sulphur dioxide has no action on dry litmus paper but turns moist blue litmus", "red", ["blue", "colourless", "green"], "SO2 + H2O → H2SO3, an acid.", "mnm_so2"),
  // ── ionic compounds ──
  mc("The electronic configuration of a sodium ion (Na⁺) is", "2, 8", ["2, 8, 1", "2, 8, 8", "2, 7"], "Sodium (2, 8, 1) loses its outer electron."),
  mc("In magnesium chloride, MgCl2, the ions present are", "Mg²⁺ and two Cl⁻", ["Mg⁺ and two Cl⁻", "Mg²⁻ and two Cl⁺", "Mg²⁺ and one Cl²⁻"], "Magnesium loses two electrons; each chlorine takes one.", "mnm_mgcl2"),
  mc("Compounds formed by the transfer of electrons from a metal to a non-metal are called", "ionic compounds", ["covalent compounds", "alloys", "amalgams"], "They are also called electrovalent compounds."),
  mc("Which of the following is NOT a property of ionic compounds?", "They conduct electricity in the solid state", ["They have high melting points", "They are soluble in water", "They conduct electricity in the molten state"], "In the solid state the ions cannot move, so they do not conduct."),
  mc("Which ionic compound has the highest melting point among the following?", "CaO", ["NaCl", "LiCl", "MgCl2"], "From Table 3.4: CaO 2850 K, NaCl 1074 K, LiCl 887 K, MgCl2 981 K.", "mnm_mp"),
  // ── metallurgy ──
  mc("Minerals from which a metal can be extracted profitably are called", "ores", ["gangue", "alloys", "amalgams"], "Every ore is a mineral but not every mineral is an ore."),
  mc("The impurities like soil and sand present in an ore are called", "gangue", ["minerals", "slag", "alloy"], "They are removed in the enrichment of the ore."),
  mc("Heating a sulphide ore strongly in excess air is called", "roasting", ["calcination", "reduction", "refining"], "Roasting changes a sulphide ore into an oxide. Calcination is for carbonate ores."),
  mc("The reaction of iron(III) oxide with aluminium, used to join railway tracks, is called", "the thermit reaction", ["roasting", "calcination", "galvanisation"], "Fe2O3 + 2Al → 2Fe + Al2O3 + heat.", "mnm_thermit"),
  mc("Sodium, magnesium and calcium are obtained from their compounds by", "electrolysis of their molten chlorides", ["heating with carbon", "heating alone", "roasting"], "They have more affinity for oxygen than carbon has."),
  mc("In the electrolytic refining of copper, the cathode is", "a thin strip of pure copper", ["impure copper", "a graphite rod", "a strip of zinc"], "Pure copper is deposited on the cathode.", "mnm_refining"),
  // ── corrosion and alloys ──
  mc("Rusting of iron takes place in", "air and water", ["dry air only", "boiled water without air", "oil"], "A nail rusts only when both air and water are present.", "mnm_rust"),
  mc("The green coating on copper is", "basic copper carbonate", ["copper oxide", "copper sulphide", "copper chloride"], "Copper reacts with moist carbon dioxide of the air."),
  mc("Galvanisation is the coating of iron with a thin layer of", "zinc", ["tin", "chromium", "copper"], "Zinc is more reactive than iron, so it protects the iron even when scratched."),
  mc("An alloy of copper and zinc is", "brass", ["bronze", "solder", "stainless steel"], "Bronze is copper and tin; solder is lead and tin."),
  // ── assertion-reason ──
  ar("Sodium is kept under kerosene oil.", "Sodium reacts vigorously with oxygen and moisture of the air.", 0, "To prevent accidental fires it is kept away from air, so R explains A."),
  ar("Aluminium is used for making cooking utensils although it is a reactive metal.", "A thin layer of aluminium oxide protects the metal from further reaction.", 0, "The protective oxide layer prevents corrosion, so R explains A."),
  ar("A galvanised iron article does not rust even if the zinc coating is scratched.", "Zinc is more reactive than iron.", 0, "Zinc reacts first and protects the iron, so R explains A."),
  ar("Copper is used to make hot water tanks.", "Copper does not react with water or steam.", 0, "Steel (iron) reacts slowly with steam and rusts, but copper does not."),
  ar("Ionic compounds have high melting points.", "Ionic compounds are made of ions held by strong electrostatic forces.", 0, "A large amount of energy is needed to break the strong inter-ionic attraction."),
  ar("Aluminium oxide is called an amphoteric oxide.", "Aluminium oxide is insoluble in water.", 1, "Both statements are true, but R does not explain A. It is called amphoteric because it reacts with both acids and bases."),
  ar("Graphite conducts electricity although carbon is a non-metal.", "Graphite is an allotrope of carbon.", 1, "Both are true, but R does not explain why graphite conducts."),
  ar("Zinc reacts with copper oxide on heating.", "Copper is more reactive than zinc.", 2, "A is true: zinc displaces copper from copper oxide. R is false because zinc is more reactive than copper."),
  ar("Solid sodium chloride conducts electricity.", "Sodium chloride is an ionic compound.", 3, "A is false: the ions cannot move in the solid. R is true."),
  ar("Mercury is the only metal that exists as a liquid at room temperature.", "Mercury is not a metal.", 2, "A is true. R is false: mercury is a metal."),
];
