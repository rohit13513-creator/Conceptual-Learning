import { Scene } from "../components/sceneKit";
import { LEWIS } from "../components/chemLewis";
import { mol, alkane, cyc, scheme, skeleton, C_, O_, H_, ChainAtom } from "../components/chemMol";

export const DIAGRAMS: Record<string, () => Scene> = {};
export const add = (id: string, f: () => Scene) => { DIAGRAMS[id] = f; };

const A = (el: string, o: Partial<ChainAtom> = {}): ChainAtom => ({ el, ...o });
const Me = "CH3";

// ── electron dot structures ──
Object.entries(LEWIS).forEach(([k, f]) => add("lewis_" + k, f));

// ── expanded structures: alkanes ──
add("m_methane", () => alkane(1, "Methane, CH₄"));
add("m_ethane", () => alkane(2, "Ethane, C₂H₆"));
add("m_propane", () => alkane(3, "Propane, C₃H₈"));
add("m_butane", () => alkane(4, "Butane, C₄H₁₀"));
add("m_isobutane", () => mol([C_(), C_({ up: Me }), C_()], "2-Methylpropane (isobutane), C₄H₁₀"));
add("m_pentane", () => alkane(5, "Pentane, C₅H₁₂"));
add("m_isopentane", () => mol([C_(), C_({ up: Me }), C_(), C_()], "2-Methylbutane, C₅H₁₂"));
add("m_neopentane", () => mol([C_(), C_({ up: Me, down: Me }), C_()], "2,2-Dimethylpropane, C₅H₁₂"));
add("m_hexane", () => alkane(6, "Hexane, C₆H₁₄"));
add("m_2mpentane", () => mol([C_(), C_({ up: Me }), C_(), C_(), C_()], "2-Methylpentane, C₆H₁₄"));
add("m_3mpentane", () => mol([C_(), C_(), C_({ up: Me }), C_(), C_()], "3-Methylpentane, C₆H₁₄"));
add("m_23dmbutane", () => mol([C_(), C_({ up: Me }), C_({ down: Me }), C_()], "2,3-Dimethylbutane, C₆H₁₄"));
add("m_22dmbutane", () => mol([C_(), C_({ up: Me, down: Me }), C_(), C_()], "2,2-Dimethylbutane, C₆H₁₄"));
// alkenes
add("m_ethene", () => mol([C_({ bond: 2 }), C_()], "Ethene, C₂H₄"));
add("m_propene", () => mol([C_({ bond: 2 }), C_(), C_()], "Propene, C₃H₆"));
add("m_but1ene", () => mol([C_({ bond: 2 }), C_(), C_(), C_()], "But-1-ene, C₄H₈"));
add("m_but2ene", () => mol([C_(), C_({ bond: 2 }), C_(), C_()], "But-2-ene, C₄H₈"));
add("m_2mpropene", () => mol([C_({ bond: 2 }), C_({ up: Me }), C_()], "2-Methylpropene, C₄H₈"));
// alkynes
add("m_ethyne", () => mol([C_({ bond: 3 }), C_()], "Ethyne, C₂H₂"));
add("m_propyne", () => mol([C_({ bond: 3 }), C_(), C_()], "Propyne, C₃H₄"));
add("m_but1yne", () => mol([C_({ bond: 3 }), C_(), C_(), C_()], "But-1-yne, C₄H₆"));
add("m_but2yne", () => mol([C_(), C_({ bond: 3 }), C_(), C_()], "But-2-yne, C₄H₆"));
// rings
add("m_cyclopropane", () => cyc(3, "Cyclopropane, C₃H₆"));
add("m_cyclobutane", () => cyc(4, "Cyclobutane, C₄H₈"));
add("m_cyclopentane", () => cyc(5, "Cyclopentane, C₅H₁₀"));
add("m_cyclohexane", () => cyc(6, "Cyclohexane, C₆H₁₂"));
add("m_benzene", () => cyc(6, "Benzene, C₆H₆", "benzene"));
// haloalkanes
add("m_chloromethane", () => mol([C_(), A("Cl")], "Chloromethane, CH₃Cl"));
add("m_dichloromethane", () => mol([C_({ up: "Cl", down: "Cl" })], "Dichloromethane, CH₂Cl₂"));
add("m_chloroform", () => mol([C_({ up: "Cl", down: "Cl" }), A("Cl")], "Trichloromethane (chloroform), CHCl₃"));
add("m_ccl4", () => mol([A("Cl"), C_({ up: "Cl", down: "Cl" }), A("Cl")], "Tetrachloromethane, CCl₄"));
add("m_chloroethane", () => mol([C_(), C_(), A("Cl")], "Chloroethane, C₂H₅Cl"));
add("m_1chloropropane", () => mol([C_(), C_(), C_(), A("Cl")], "1-Chloropropane, C₃H₇Cl"));
add("m_2chloropropane", () => mol([C_(), C_({ up: "Cl" }), C_()], "2-Chloropropane, C₃H₇Cl"));
// alcohols
add("m_methanol", () => mol([C_(), O_(), H_()], "Methanol, CH₃OH"));
add("m_ethanol", () => mol([C_(), C_(), O_(), H_()], "Ethanol, C₂H₅OH"));
add("m_propan1ol", () => mol([C_(), C_(), C_(), O_(), H_()], "Propan-1-ol, C₃H₇OH"));
add("m_propan2ol", () => mol([C_(), C_({ up: "OH" }), C_()], "Propan-2-ol, C₃H₇OH"));
add("m_butan1ol", () => mol([C_(), C_(), C_(), C_(), O_(), H_()], "Butan-1-ol, C₄H₉OH"));
add("m_glycerol", () => mol([C_({ up: "OH" }), C_({ up: "OH" }), C_({ up: "OH" })], "Glycerol (propane-1,2,3-triol), C₃H₈O₃"));
// aldehydes, ketones
add("m_methanal", () => mol([C_({ up: "=O" })], "Methanal, HCHO"));
add("m_ethanal", () => mol([C_(), C_({ up: "=O" })], "Ethanal, CH₃CHO"));
add("m_propanal", () => mol([C_(), C_(), C_({ up: "=O" })], "Propanal, C₂H₅CHO"));
add("m_butanal", () => mol([C_(), C_(), C_(), C_({ up: "=O" })], "Butanal, C₃H₇CHO"));
add("m_propanone", () => mol([C_(), C_({ up: "=O" }), C_()], "Propanone (acetone), CH₃COCH₃"));
add("m_butanone", () => mol([C_(), C_({ up: "=O" }), C_(), C_()], "Butanone, CH₃COC₂H₅"));
add("m_pentan2one", () => mol([C_(), C_({ up: "=O" }), C_(), C_(), C_()], "Pentan-2-one, C₅H₁₀O"));
add("m_pentan3one", () => mol([C_(), C_(), C_({ up: "=O" }), C_(), C_()], "Pentan-3-one, C₅H₁₀O"));
// acids, esters, ethers
add("m_methanoic", () => mol([H_(), C_({ up: "=O" }), O_(), H_()], "Methanoic acid, HCOOH"));
add("m_ethanoic", () => mol([C_(), C_({ up: "=O" }), O_(), H_()], "Ethanoic acid, CH₃COOH"));
add("m_propanoic", () => mol([C_(), C_(), C_({ up: "=O" }), O_(), H_()], "Propanoic acid, C₂H₅COOH"));
add("m_methylmethanoate", () => mol([H_(), C_({ up: "=O" }), O_(), C_()], "Methyl methanoate, HCOOCH₃"));
add("m_methylethanoate", () => mol([C_(), C_({ up: "=O" }), O_(), C_()], "Methyl ethanoate, CH₃COOCH₃"));
add("m_ethylethanoate", () => mol([C_(), C_({ up: "=O" }), O_(), C_(), C_()], "Ethyl ethanoate, CH₃COOC₂H₅"));
add("m_dimethylether", () => mol([C_(), O_(), C_()], "Methoxymethane (dimethyl ether), CH₃OCH₃"));
add("m_methoxyethane", () => mol([C_(), O_(), C_(), C_()], "Methoxyethane, CH₃OC₂H₅"));
add("m_diethylether", () => mol([C_(), C_(), O_(), C_(), C_()], "Ethoxyethane (diethyl ether), C₂H₅OC₂H₅"));
add("m_water", () => mol([H_(), O_(), H_()], "Water, H₂O"));

// ── functional groups (R is the rest of the molecule) ──
const R = (): ChainAtom => A("R"), R2 = (): ChainAtom => A("R'");
add("fg_halo", () => mol([R(), A("Cl")], "Halo group: R–Cl"));
add("fg_alcohol", () => mol([R(), O_(), H_()], "Alcohol: R–OH"));
add("fg_aldehyde", () => mol([R(), C_({ up: "=O" }), H_()], "Aldehyde: R–CHO"));
add("fg_ketone", () => mol([R(), C_({ up: "=O" }), R2()], "Ketone: R–CO–R′"));
add("fg_acid", () => mol([R(), C_({ up: "=O" }), O_(), H_()], "Carboxylic acid: R–COOH"));
add("fg_ester", () => mol([R(), C_({ up: "=O" }), O_(), R2()], "Ester: R–COO–R′"));
add("fg_ether", () => mol([R(), O_(), R2()], "Ether: R–O–R′"));

// ── steps in drawing a structure ──
add("step_ethane", () => scheme([[mol([A("C", { noH: true }), A("C", { noH: true })], "Step 1: join the carbons"), "->", mol([C_(), C_()], "Step 2: add hydrogens")]], "Ethane, C₂H₆"));
add("step_ethene", () => scheme([[mol([A("C", { noH: true }), A("C", { noH: true })], "Step 1: join the carbons"), "->", mol([C_({ up: "H", down: "H", noH: true }), C_({ up: "H", down: "H", noH: true })], "Step 2: one valency left on each C"), "->", mol([C_({ bond: 2 }), C_()], "Step 3: double bond")]], "Ethene, C₂H₄"));

// ── numbering of a chain for naming ──
add("nm_but1ene", () => skeleton(4, { dbl: [1], caption: "But-1-ene: the double bond gets the lowest number" }));
add("nm_3mbut1ene", () => skeleton(4, { dbl: [1], subs: [{ at: 3, text: "CH_{3}" }], caption: "3-Methylbut-1-ene" }));
add("nm_2chloropropane", () => skeleton(3, { subs: [{ at: 2, text: "Cl" }], caption: "2-Chloropropane" }));
add("nm_4e2mhexane", () => skeleton(6, { subs: [{ at: 2, text: "CH_{3}" }, { at: 4, text: "C_{2}H_{5}" }], caption: "4-Ethyl-2-methylhexane" }));

// ── reactions drawn with structures ──
add("rx_hydrogenation", () => scheme([[mol([C_({ bond: 2 }), C_()], "Ethene"), "+", mol([H_(), H_()], "Hydrogen"), "->Ni catalyst", mol([C_(), C_()], "Ethane")]], "Hydrogenation: unsaturated → saturated"));
add("rx_chlorination", () => scheme([[mol([C_()], "Methane"), "+", mol([A("Cl"), A("Cl")], "Chlorine"), "->Sunlight", mol([C_(), A("Cl")], "Chloromethane"), "+", mol([H_(), A("Cl")], "HCl")]], "Substitution: Cl replaces H"));
add("rx_oxidation", () => scheme([[mol([C_(), C_(), O_(), H_()], "Ethanol"), "->[O] alk. KMnO₄", mol([C_(), C_({ up: "=O" }), O_(), H_()], "Ethanoic acid")]], "Oxidation of ethanol"));
add("rx_dehydration", () => scheme([[mol([C_(), C_(), O_(), H_()], "Ethanol"), "->conc. H₂SO₄, 443 K", mol([C_({ bond: 2 }), C_()], "Ethene"), "+", mol([H_(), O_(), H_()], "Water")]], "Dehydration of ethanol"));
add("rx_ester", () => scheme([[mol([C_(), C_({ up: "=O" }), O_(), H_()], "Ethanoic acid"), "+", mol([C_(), C_(), O_(), H_()], "Ethanol")], ["<>conc. H₂SO₄ (acid catalyst)"], [mol([C_(), C_({ up: "=O" }), O_(), C_(), C_()], "Ethyl ethanoate (ester)"), "+", mol([H_(), O_(), H_()], "Water")]], "Esterification"));

// ── laboratory pictures ──
import { limewaterTest, bunsenFlames, sootActivity, oilTrap, tubeRow, esterBath } from "../components/chemApparatus";
add("ap_limewater_burn", () => limewaterTest(["Compound burning", "in oxygen"], "Test for carbon: the gas turns limewater milky"));
add("ap_limewater_acid", () => limewaterTest(["Sodium carbonate +", "dilute ethanoic acid"], "Ethanoic acid with a carbonate: the gas turns limewater milky"));
add("ap_bunsen", () => bunsenFlames());
add("ap_soot", () => sootActivity());
add("ap_oiltrap", () => oilTrap());
add("ap_bromine", () => tubeRow([
  { name: ["Bromine water", "+ butter"], level: 0.55, liquid: "#fdba74" },
  { name: ["Bromine water", "+ cooking oil"], level: 0.55, liquid: "#f8fafc" },
], "Bromine water test: saturated (left) and unsaturated (right)"));
add("ap_ph", () => tubeRow([
  { name: ["Dilute HCl", "universal indicator: red", "pH about 1–2"], level: 0.6, liquid: "#f87171" },
  { name: ["Dilute ethanoic acid", "universal indicator: orange", "pH about 3–4"], level: 0.6, liquid: "#fdba74" },
], "Comparing two acids with universal indicator", 11.5));
add("ap_soap_oil", () => tubeRow([
  { name: ["A", "water + oil"], layers: [["#bfdbfe", 0.7], ["#fde68a", 0.3]], level: 0.7 },
  { name: ["B", "water + oil + soap"], level: 0.7, liquid: "#f1f5f9", emulsion: true },
], "Soap helps oil mix with water (after shaking and standing)"));
add("ap_hard", () => tubeRow([
  { name: ["Soft water + soap", "plenty of foam"], level: 0.6, liquid: "#bfdbfe", foam: true },
  { name: ["Hard water + soap", "curdy white scum"], level: 0.6, liquid: "#dbeafe", curds: true },
], "Soap in soft water and in hard water"));
add("ap_hard_detergent", () => tubeRow([
  { name: ["Hard water + soap", "curdy scum, little foam"], level: 0.6, liquid: "#dbeafe", curds: true },
  { name: ["Hard water + detergent", "plenty of foam"], level: 0.6, liquid: "#bfdbfe", foam: true },
], "Soap and detergent in hard water", 11.5));
add("ap_sodium", () => tubeRow([
  { name: ["Ethanol + small piece", "of sodium"], level: 0.55, liquid: "#e0f2fe", piece: true, bubbles: 3, match: true },
], "Ethanol with sodium: hydrogen gas is given off"));
add("ap_ester", () => esterBath());

// ── allotropes and soaps ──
import { diamondUnit, graphiteSheet, graphiteLayers, c60, soapMolecule, soapSurface, micelle, soapCleaning } from "../components/chemStructures";
add("st_diamond", () => diamondUnit());
add("st_graphite_sheet", () => graphiteSheet());
add("st_graphite_layers", () => graphiteLayers());
add("st_c60", () => c60());
add("sp_molecule", () => soapMolecule());
add("sp_surface", () => soapSurface());
add("sp_micelle", () => micelle(true));
add("sp_micelle_hc", () => micelle(false));
add("sp_cleaning", () => soapCleaning());

// ── charts ──
import { hydrocarbonTree, homologousLadder, reactionMap, chapterMindMap } from "../components/chemCharts";
add("ch_tree", () => hydrocarbonTree());
add("ch_ladder", () => homologousLadder());
add("ch_reactions", () => reactionMap());
add("ch_mindmap", () => chapterMindMap());
