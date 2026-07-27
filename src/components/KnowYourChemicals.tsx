import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Beaker, 
  Dna, 
  Sparkles, 
  Info, 
  BookOpen, 
  Copy, 
  Check, 
  Atom,
  Layers,
  GitBranch,
  Download
} from "lucide-react";
import PeriodicTable, { downloadPeriodicTableSVG } from "./PeriodicTable";

interface KYCResult {
  common_name: string;
  iupac_name: string;
  chemical_formula: string;
  molecular_weight: string;
  chemical_type: string;
  classification: "Organic" | "Inorganic";
  classification_reason: string;
  smiles_notation: string;
  pdb_id: string | null;
  quick_fact: string;
  color: string;
  properties?: string;
  uses?: string;
  requested_compound?: string;
  primary_structure_url?: string;
  fallback_iupac_url?: string;
  source_credit?: string;
  element_category?: "Metal" | "Non-metal" | "Metalloid";
  atomic_number?: number;
  atomic_mass?: string;
  ph_value?: string;
  ph_note?: string;
  isomers?: {
    isomerism_type: string;
    members: { name: string; iupac_name: string; note: string; structure_url: string }[];
  };
}

// Global Static Local Database for high-speed autocomplete search suggestions (100+ high-yield items)
const SUGGESTION_CHEMICALS = [
  { name: "Iron(II) Sulfate", formula: "FeSO4", synonyms: "ferrous sulfate fe2+ feso4" },
  { name: "Iron(II) Sulfate Heptahydrate", formula: "FeSO4·7H2O", synonyms: "green vitriol ferrous sulfate crystals hydrous iron sulfate feso4 7h2o" },
  { name: "Iron(III) Chloride", formula: "FeCl3", synonyms: "ferric chloride fe3+ fecl3" },
  { name: "Iron(III) Chloride Hexahydrate", formula: "FeCl3·6H2O", synonyms: "ferric chloride crystals hydrous iron chloride fecl3 6h2o" },
  { name: "Iron(II) Oxide", formula: "FeO", synonyms: "ferrous oxide fe2+ feo" },
  { name: "Iron(III) Oxide", formula: "Fe2O3", synonyms: "ferric oxide hematite rust fe2o3" },
  { name: "Iron(II) Carbonate", formula: "FeCO3", synonyms: "siderite feco3" },
  { name: "Copper(II) Sulfate", formula: "CuSO4", synonyms: "copper sulphate cupric sulfate cuso4 cu2+" },
  { name: "Copper(II) Sulfate Pentahydrate", formula: "CuSO4·5H2O", synonyms: "blue vitriol copper sulfate crystals hydrous copper sulfate cuso4 5h2o" },
  { name: "Copper(I) Oxide", formula: "Cu2O", synonyms: "cuprous oxide red copper cu2o" },
  { name: "Copper(II) Oxide", formula: "CuO", synonyms: "cupric oxide black copper cuo" },
  { name: "Copper(II) Chloride", formula: "CuCl2", synonyms: "cupric chloride cucl2 cu2+" },
  { name: "Copper(II) Chloride Dihydrate", formula: "CuCl2·2H2O", synonyms: "copper chloride crystals hydrous copper chloride cucl2 2h2o" },
  { name: "Zinc Sulfate", formula: "ZnSO4", synonyms: "zinc sulphate zn2+ znso4" },
  { name: "Zinc Sulfate Heptahydrate", formula: "ZnSO4·7H2O", synonyms: "white vitriol zinc sulfate crystals hydrous zinc sulfate znso4 7h2o" },
  { name: "Zinc Oxide", formula: "ZnO", synonyms: "philosopher's wool zinc white zno" },
  { name: "Sodium Stearate", formula: "C18H35NaO2", synonyms: "soap stearic sodium salt soap curd" },
  { name: "Hemoglobin", formula: "Protein macromolecule", synonyms: "blood protein iron heme metalloprotein" },
  { name: "Glucose", formula: "C6H12O6", synonyms: "dextrose sugar carbohydrate" },
  { name: "Sucrose", formula: "C12H22O11", synonyms: "table sugar cane sugar" },
  { name: "Fructose", formula: "C6H12O6", synonyms: "fruit sugar ketose" },
  { name: "Baking Soda", formula: "NaHCO3", synonyms: "sodium bicarbonate sodium hydrogen carbonate nahco3" },
  { name: "Sodium Carbonate", formula: "Na2CO3", synonyms: "soda ash na2co3" },
  { name: "Washing Soda", formula: "Na2CO3·10H2O", synonyms: "sodium carbonate decahydrate na2co3 10h2o" },
  { name: "DNA", formula: "Deoxyribonucleic Acid", synonyms: "genetic material nucleic acid double helix" },
  { name: "RNA", formula: "Ribonucleic Acid", synonyms: "nucleic acid" },
  { name: "Penicillin G", formula: "C16H18N2O4S", synonyms: "antibiotic penicillin" },
  { name: "Paracetamol", formula: "C8H9NO2", synonyms: "acetaminophen paracetamol panadol dolo tylenol c8h9no2" },
  { name: "Aspirin", formula: "C9H8O4", synonyms: "acetylsalicylic acid painkiller c9h8o4" },
  { name: "Ibuprofen", formula: "C13H18O2", synonyms: "nsaid advil motrin c13h18o2" },
  { name: "Caffeine", formula: "C8H10N4O2", synonyms: "coffee stimulant" },
  { name: "Water", formula: "H2O", synonyms: "dihydrogen monoxide oxidane aqua h2o" },
  { name: "Ammonia", formula: "NH3", synonyms: "azane ammonium basic gas nh3" },
  { name: "Hydrochloric Acid", formula: "HCl", synonyms: "muriatic acid strong acid hydrogen chloride hcl" },
  { name: "Sulfuric Acid", formula: "H2SO4", synonyms: "oil of vitriol king of chemicals h2so4" },
  { name: "Nitric Acid", formula: "HNO3", synonyms: "aqua fortis strong oxidising acid hno3" },
  { name: "Phosphoric Acid", formula: "H3PO4", synonyms: "orthophosphoric acid h3po4" },
  { name: "Carbon Dioxide", formula: "CO2", synonyms: "carbonic acid gas greenhouse gas co2" },
  { name: "Carbon Monoxide", formula: "CO", synonyms: "toxic gas co" },
  { name: "Sodium Hydroxide", formula: "NaOH", synonyms: "caustic soda sodium hydrate naoh" },
  { name: "Potassium Hydroxide", formula: "KOH", synonyms: "caustic potash potassium hydrate koh" },
  { name: "Calcium Carbonate", formula: "CaCO3", synonyms: "limestone chalk marble calcite caco3" },
  { name: "Calcium Hydroxide", formula: "Ca(OH)2", synonyms: "slaked lime limewater ca(oh)2" },
  { name: "Calcium Oxide", formula: "CaO", synonyms: "quicklime burnt lime cao" },
  { name: "Acetic Acid", formula: "CH3COOH", synonyms: "vinegar ethanoic acid ch3cooh" },
  { name: "Ethanol", formula: "C2H5OH", synonyms: "ethyl alcohol drinking alcohol c2h5oh" },
  { name: "Methanol", formula: "CH3OH", synonyms: "methyl alcohol wood spirit ch3oh" },
  { name: "Acetone", formula: "CH3COCH3", synonyms: "propanone nail polish remover ch3coch3" },
  { name: "Benzene", formula: "C6H6", synonyms: "aromatic ring benzol c6h6" },
  { name: "Toluene", formula: "C6H5CH3", synonyms: "methylbenzene c6h5ch3" },
  { name: "Phenol", formula: "C6H5OH", synonyms: "carbolic acid c6h5oh" },
  { name: "Benzoic Acid", formula: "C6H5COOH", synonyms: "benzene carboxylic acid c6h5cooh" },
  { name: "Sodium Chloride", formula: "NaCl", synonyms: "common salt table salt halite nacl" },
  { name: "Potassium Iodide", formula: "KI", synonyms: "ionic iodide ki" },
  { name: "Barium Chloride", formula: "BaCl2", synonyms: "bacl2" },
  { name: "Barium Chloride Dihydrate", formula: "BaCl2·2H2O", synonyms: "barium chloride crystals hydrous barium chloride bacl2 2h2o" },
  { name: "Barium Sulfate", formula: "BaSO4", synonyms: "barite insoluble sulfate baso4" },
  { name: "Silver Nitrate", formula: "AgNo3", synonyms: "lunar caustic agno3" },
  { name: "Silver Chloride", formula: "AgCl", synonyms: "white precipitate agcl" },
  { name: "Bleaching Powder", formula: "CaOCl2", synonyms: "calcium oxychloride chloro-lime caocl2" },
  { name: "Plaster of Paris", formula: "CaSO4·0.5H2O", synonyms: "calcium sulfate hemihydrate pop" },
  { name: "Gypsum", formula: "CaSO4·2H2O", synonyms: "calcium sulfate dihydrate alabaster dypsum" },
  { name: "Iodine", formula: "I2", synonyms: "violet halogen crystal i2" },
  { name: "Chlorine", formula: "Cl2", synonyms: "greenish yellow halogen gas cl2" },
  { name: "Hydrogen Gas", formula: "H2", synonyms: "lightest gas flammable h2" },
  { name: "Oxygen Gas", formula: "O2", synonyms: "breath essential gas oxygen o2" },
  { name: "Nitrogen Gas", formula: "N2", synonyms: "inert dinitrogen n2" },
  { name: "Magnesium Carbonate", formula: "MgCO3", synonyms: "magnesite mgco3" },
  { name: "Magnesium Sulfate", formula: "MgSO4", synonyms: "mgso4" },
  { name: "Magnesium Sulfate Heptahydrate", formula: "MgSO4·7H2O", synonyms: "epsom salt magnesium sulfate crystals mgso4 7h2o" },
  { name: "Urea", formula: "NH2CONH2", synonyms: "carbamide organic waste nh2conh2" },
  { name: "Chloroform", formula: "CHCl3", synonyms: "trichloromethane anesthetic chcl3" },
  { name: "Iodoform", formula: "CHI3", synonyms: "triiodomethane yellow antiseptic chi3" },
  { name: "Carbon Tetrachloride", formula: "CCl4", synonyms: "tetrachloromethane ccl4" },
  { name: "Citric Acid", formula: "C6H8O7", synonyms: "lemon citric acid c6h8o7" },
  { name: "Salicylic Acid", formula: "C7H6O3", synonyms: "2-hydroxybenzoic acid salicylic salicylicacid c7h6o3 skin exfoliation acne" },
  { name: "Lactic Acid", formula: "C3H6O3", synonyms: "2-hydroxypropanoic acid sour milk lactic lacticacid c3h6o3 muscles" },
  { name: "Glycine", formula: "C2H5NO2", synonyms: "2-aminoacetic acid simplest amino acid glycine c2h5no2 protein zwitterion" },
  { name: "Alanine", formula: "C3H7NO2", synonyms: "2-aminopropanoic acid amino acid alanine c3h7no2 protein metabolic" },
  { name: "Ascorbic Acid", formula: "C6H8O6", synonyms: "vitamin c ascorbic acid orange juice antioxidant c6h8o6 scurvy" },
  { name: "Tartaric Acid", formula: "C4H6O6", synonyms: "grapes cream of tartar c4h6o6" },
  { name: "Oxalic Acid", formula: "H2C2O4", synonyms: "ethanedioic acid tomatoes h2c2o4" },
  { name: "Potassium Permanganate", formula: "KMnO4", synonyms: "condy crystals permanganic acid potassium salt purple kmno4" },
  { name: "Potassium Dichromate", formula: "K2Cr2O7", synonyms: "orange oxidizer chromium k2cr2o7" },
  { name: "Uric Acid", formula: "C5H4N4O3", synonyms: "kidney stones purine c5h4n4o3" },
  { name: "Mohr's Salt", formula: "(NH4)2Fe(SO4)2·6H2O", synonyms: "ferrous ammonium sulfate double salt" },
  { name: "Potash Alum", formula: "KAl(SO4)2·12H2O", synonyms: "alum double salt fitkari kal(so4)2" },
  { name: "Aniline", formula: "C6H5NH2", synonyms: "aminobenzene benzenamine c6h5nh2" },
  { name: "Nitrobenzene", formula: "C6H5NO2", synonyms: "oil of mirbane nitro c6h5no2" },
  { name: "Lead Nitrate", formula: "Pb(NO3)2", synonyms: "lead dinitrate pb(no3)2" },
  { name: "Lead Iodide", formula: "PbI2", synonyms: "golden spangles pbi2" },
  { name: "Litharge", formula: "PbO", synonyms: "lead monoxide pbo" },
  { name: "Red Lead", formula: "Pb3O4", synonyms: "minium sindoor pb3o4" },
  { name: "Ammonium Chloride", formula: "NH4Cl", synonyms: "sal ammoniac nh4cl" },
  { name: "Ammonium Nitrate", formula: "NH4NO3", synonyms: "fertilizer explosive nh4no3" },
  { name: "Nitrous Oxide", formula: "N2O", synonyms: "laughing gas dinitrogen monoxide n2o" },
  { name: "Nitric Oxide", formula: "NO", synonyms: "nitrogen monoxide no" },
  { name: "Nitrogen Dioxide", formula: "NO2", synonyms: "brown toxic gas no2" },
  { name: "Borax", formula: "Na2B4O7·10H2O", synonyms: "sodium tetraborate decahydrate na2b4o7" },
  { name: "Silicon Dioxide", formula: "SiO2", synonyms: "silica sand quartz glass sio2" },
  { name: "Sodium Thiosulfate", formula: "Na2S2O3", synonyms: "na2s2o3" },
  { name: "Sodium Thiosulfate Pentahydrate", formula: "Na2S2O3·5H2O", synonyms: "hypo photographer sodium thiosulfate crystals na2s2o3 5h2o" },
  { name: "Hydrogen Sulfide", formula: "H2S", synonyms: "rotten egg sewer gas hydrogen sulphide h2s" },
  { name: "Sulfur Dioxide", formula: "SO2", synonyms: "sulphur dioxide pollutant so2" },
  { name: "Sulfur Trioxide", formula: "SO3", synonyms: "sulphur trioxide fuming so3" },
  { name: "Insulin", formula: "Polypeptide Hormone", synonyms: "blood sugar hormone diabetes" }
];

export const FRONTEND_ELEMENTS = [
  { name: "Hydrogen", formula: "H", synonyms: "hydrogen element h gas" },
  { name: "Helium", formula: "He", synonyms: "helium element he noble gas" },
  { name: "Lithium", formula: "Li", synonyms: "lithium element li metal alkali" },
  { name: "Beryllium", formula: "Be", synonyms: "beryllium element be metal alkaline" },
  { name: "Boron", formula: "B", synonyms: "boron element b metalloid" },
  { name: "Carbon", formula: "C", synonyms: "carbon element c coal graphite diamond" },
  { name: "Nitrogen", formula: "N", synonyms: "nitrogen element n gas" },
  { name: "Oxygen", formula: "O", synonyms: "oxygen element o gas" },
  { name: "Fluorine", formula: "F", synonyms: "fluorine element f halogen gas" },
  { name: "Neon", formula: "Ne", synonyms: "neon element ne noble gas" },
  { name: "Sodium", formula: "Na", synonyms: "sodium element na metal alkali natrium" },
  { name: "Magnesium", formula: "Mg", synonyms: "magnesium element mg metal alkaline" },
  { name: "Aluminum", formula: "Al", synonyms: "aluminum element al metal post-transition aluminium" },
  { name: "Silicon", formula: "Si", synonyms: "silicon element si metalloid sand" },
  { name: "Phosphorus", formula: "P", synonyms: "phosphorus element p non-metal" },
  { name: "Sulfur", formula: "S", synonyms: "sulfur element s sulphur yellow non-metal" },
  { name: "Chlorine", formula: "Cl", synonyms: "chlorine element cl halogen gas" },
  { name: "Argon", formula: "Ar", synonyms: "argon element ar noble gas" },
  { name: "Potassium", formula: "K", synonyms: "potassium element k metal alkali kalium" },
  { name: "Calcium", formula: "Ca", synonyms: "calcium element ca metal alkaline" },
  { name: "Scandium", formula: "Sc", synonyms: "scandium element sc transition metal" },
  { name: "Titanium", formula: "Ti", synonyms: "titanium element ti transition metal" },
  { name: "Vanadium", formula: "V", synonyms: "vanadium element v transition metal" },
  { name: "Chromium", formula: "Cr", synonyms: "chromium element cr transition metal chrome" },
  { name: "Manganese", formula: "Mn", synonyms: "manganese element mn transition metal" },
  { name: "Iron", formula: "Fe", synonyms: "iron element fe transition metal ferrum" },
  { name: "Cobalt", formula: "Co", synonyms: "cobalt element co transition metal" },
  { name: "Nickel", formula: "Ni", synonyms: "nickel element ni transition metal" },
  { name: "Copper", formula: "Cu", synonyms: "copper element cu transition metal cuprum" },
  { name: "Zinc", formula: "Zn", synonyms: "zinc element zn transition metal" },
  { name: "Gallium", formula: "Ga", synonyms: "gallium element ga metal post-transition" },
  { name: "Germanium", formula: "Ge", synonyms: "germanium element ge metalloid" },
  { name: "Arsenic", formula: "As", synonyms: "arsenic element as metalloid poison" },
  { name: "Selenium", formula: "Se", synonyms: "selenium element se non-metal" },
  { name: "Bromine", formula: "Br", synonyms: "bromine element br liquid halogen" },
  { name: "Krypton", formula: "Kr", synonyms: "krypton element kr noble gas" },
  { name: "Rubidium", formula: "Rb", synonyms: "rubidium element rb metal alkali" },
  { name: "Strontium", formula: "Sr", synonyms: "strontium element sr metal alkaline" },
  { name: "Yttrium", formula: "Y", synonyms: "yttrium element y transition metal" },
  { name: "Zirconium", formula: "Zr", synonyms: "zirconium element zr transition metal" },
  { name: "Niobium", formula: "Nb", synonyms: "niobium element nb transition metal" },
  { name: "Molybdenum", formula: "Mo", synonyms: "molybdenum element mo transition metal" },
  { name: "Technetium", formula: "Tc", synonyms: "technetium element tc radioactive metal" },
  { name: "Ruthenium", formula: "Ru", synonyms: "ruthenium element ru transition metal" },
  { name: "Rhodium", formula: "Rh", synonyms: "rhodium element rh transition metal" },
  { name: "Palladium", formula: "Pd", synonyms: "palladium element pd transition metal" },
  { name: "Silver", formula: "Ag", synonyms: "silver element ag transition metal argentum" },
  { name: "Cadmium", formula: "Cd", synonyms: "cadmium element cd transition metal" },
  { name: "Indium", formula: "In", synonyms: "indium element in metal post-transition" },
  { name: "Tin", formula: "Sn", synonyms: "tin element sn metal stannum" },
  { name: "Antimony", formula: "Sb", synonyms: "antimony element sb metalloid stibium" },
  { name: "Tellurium", formula: "Te", synonyms: "tellurium element te metalloid" },
  { name: "Iodine", formula: "I", synonyms: "iodine element i halogen purple" },
  { name: "Xenon", formula: "Xe", synonyms: "xenon element xe noble gas" },
  { name: "Cesium", formula: "Cs", synonyms: "cesium element cs metal alkali" },
  { name: "Barium", formula: "Ba", synonyms: "barium element ba metal alkaline" },
  { name: "Lanthanum", formula: "La", synonyms: "lanthanum element la rare-earth lanthanide" },
  { name: "Cerium", formula: "Ce", synonyms: "cerium element ce rare-earth lanthanide" },
  { name: "Praseodymium", formula: "Pr", synonyms: "praseodymium element pr rare-earth lanthanide" },
  { name: "Neodymium", formula: "Nd", synonyms: "neodymium element nd rare-earth lanthanide" },
  { name: "Promethium", formula: "Pm", synonyms: "promethium element pm radioactive lanthanide" },
  { name: "Samarium", formula: "Sm", synonyms: "samarium element sm rare-earth lanthanide" },
  { name: "Europium", formula: "Eu", synonyms: "europium element eu rare-earth lanthanide" },
  { name: "Gadolinium", formula: "Gd", synonyms: "gadolinium element gd rare-earth lanthanide" },
  { name: "Terbium", formula: "Tb", synonyms: "terbium element tb rare-earth lanthanide" },
  { name: "Dysprosium", formula: "Dy", synonyms: "dysprosium element dy rare-earth lanthanide" },
  { name: "Holmium", formula: "Ho", synonyms: "holmium element ho rare-earth lanthanide" },
  { name: "Erbium", formula: "Er", synonyms: "erbium element er rare-earth lanthanide" },
  { name: "Thulium", formula: "Tm", synonyms: "thulium element tm rare-earth lanthanide" },
  { name: "Ytterbium", formula: "Yb", synonyms: "ytterbium element yb rare-earth lanthanide" },
  { name: "Lutetium", formula: "Lu", synonyms: "lutetium element lu transition metal" },
  { name: "Hafnium", formula: "Hf", synonyms: "hafnium element hf transition metal" },
  { name: "Tantalum", formula: "Ta", synonyms: "tantalum element ta transition metal" },
  { name: "Tungsten", formula: "W", synonyms: "tungsten element w transition metal wolfram" },
  { name: "Rhenium", formula: "Re", synonyms: "rhenium element re transition metal" },
  { name: "Osmium", formula: "Os", synonyms: "osmium element os transition metal" },
  { name: "Iridium", formula: "Ir", synonyms: "iridium element ir transition metal" },
  { name: "Platinum", formula: "Pt", synonyms: "platinum element pt transition metal" },
  { name: "Gold", formula: "Au", synonyms: "gold element au transition metal aurum" },
  { name: "Mercury", formula: "Hg", synonyms: "mercury element hg liquid metal hydrargyrum" },
  { name: "Thallium", formula: "Tl", synonyms: "thallium element tl metal post-transition" },
  { name: "Lead", formula: "Pb", synonyms: "lead element pb metal plumbum" },
  { name: "Bismuth", formula: "Bi", synonyms: "bismuth element bi metal" },
  { name: "Polonium", formula: "Po", synonyms: "polonium element po metalloid" },
  { name: "Astatine", formula: "At", synonyms: "astatine element at metalloid" },
  { name: "Radon", formula: "Rn", synonyms: "radon element rn noble gas" },
  { name: "Francium", formula: "Fr", synonyms: "francium element fr metal alkali" },
  { name: "Radium", formula: "Ra", synonyms: "radium element ra metal alkaline" },
  { name: "Actinium", formula: "Ac", synonyms: "actinium element ac actinide metal" },
  { name: "Thorium", formula: "Th", synonyms: "thorium element th actinide metal" },
  { name: "Protactinium", formula: "Pa", synonyms: "protactinium element pa actinide metal" },
  { name: "Uranium", formula: "U", synonyms: "uranium element u actinide metal radioactive" },
  { name: "Neptunium", formula: "Np", synonyms: "neptunium element np actinide metal" },
  { name: "Plutonium", formula: "Pu", synonyms: "plutonium element pu actinide metal" },
  { name: "Americium", formula: "Am", synonyms: "americium element am actinide metal" },
  { name: "Curium", formula: "Cm", synonyms: "curium element cm actinide metal" },
  { name: "Berkelium", formula: "Bk", synonyms: "berkelium element bk actinide metal" },
  { name: "Californium", formula: "Cf", synonyms: "californium element cf actinide metal" },
  { name: "Einsteinium", formula: "Es", synonyms: "einsteinium element es actinide metal" },
  { name: "Fermium", formula: "Fm", synonyms: "fermium element fm actinide metal" },
  { name: "Mendelevium", formula: "Md", synonyms: "mendelevium element md actinide metal" },
  { name: "Nobelium", formula: "No", synonyms: "nobelium element no actinide metal" },
  { name: "Lawrencium", formula: "Lr", synonyms: "lawrencium element lr actinide metal" },
  { name: "Rutherfordium", formula: "Rf", synonyms: "rutherfordium element rf transition metal" },
  { name: "Dubnium", formula: "Db", synonyms: "dubnium element db transition metal" },
  { name: "Seaborgium", formula: "Sg", synonyms: "seaborgium element sg transition metal" },
  { name: "Bohrium", formula: "Bh", synonyms: "bohrium element bh transition metal" },
  { name: "Hassium", formula: "Hs", synonyms: "hassium element hs transition metal" },
  { name: "Meitnerium", formula: "Mt", synonyms: "meitnerium element mt" },
  { name: "Darmstadtium", formula: "Ds", synonyms: "darmstadtium element ds" },
  { name: "Roentgenium", formula: "Rg", synonyms: "roentgenium element rg" },
  { name: "Copernicium", formula: "Cn", synonyms: "copernicium element cn" },
  { name: "Nihonium", formula: "Nh", synonyms: "nihonium element nh" },
  { name: "Flerovium", formula: "Fl", synonyms: "flerovium element fl" },
  { name: "Moscovium", formula: "Mc", synonyms: "moscovium element mc" },
  { name: "Livermorium", formula: "Lv", synonyms: "livermorium element lv" },
  { name: "Tennessine", formula: "Ts", synonyms: "tennessine element ts" },
  { name: "Oganesson", formula: "Og", synonyms: "oganesson element og noble gas" }
];

// Advanced high-fidelity styling parser that understands subscripts, superscripts, coefficients, and hydration dots
export function renderFormattedFormula(formula: string): React.ReactNode {
  if (!formula) return "";
  
  // Normalize Subscripts / Superscripts of unicode to normal characters for uniform handling
  const unicodeSubMap: Record<string, string> = {
    "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9"
  };
  let normalized = formula;
  Object.keys(unicodeSubMap).forEach(unicode => {
    normalized = normalized.split(unicode).join(unicodeSubMap[unicode]);
  });
  
  const elements: React.ReactNode[] = [];
  let i = 0;
  
  while (i < normalized.length) {
    const char = normalized[i];
    
    // Explicit superscript indicator
    if (char === '^') {
      i++; // Skip '^'
      let supContent = "";
      while (i < normalized.length && /[0-9+\-]/.test(normalized[i])) {
        supContent += normalized[i];
        i++;
      }
      elements.push(
        <sup key={`sup-${i}`} className="text-[0.7em] font-black text-amber-300 align-super select-none leading-none">
          {supContent}
        </sup>
      );
      continue;
    }
    
    // Auto-detect ionic charge notation like "2+", "2-", "++", "+", "-"
    const chargeMatch = normalized.slice(i).match(/^(\d*[+\-]+)/);
    if (chargeMatch) {
      const chargeStr = chargeMatch[1];
      elements.push(
        <sup key={`charge-${i}`} className="text-[0.7em] font-black text-amber-300 align-super select-none leading-none">
          {chargeStr}
        </sup>
      );
      i += chargeStr.length;
      continue;
    }
    
    // Hydration dot notation
    if (char === '·' || char === '.') {
      elements.push(<span key={`dot-${i}`} className="px-1 text-teal-300 font-extrabold select-none">•</span>);
      i++;
      // If immediate next character is a digit (hydration coefficient), render it as normal size text
      if (i < normalized.length && /\d/.test(normalized[i])) {
        let coeff = "";
        while (i < normalized.length && /\d/.test(normalized[i])) {
          coeff += normalized[i];
          i++;
        }
        elements.push(<span key={`coeff-${i}`} className="font-extrabold text-slate-100">{coeff}</span>);
      }
      continue;
    }
    
    // Regular digits
    if (/\d/.test(char)) {
      if (i === 0) {
        // At the very beginning of the string, digits represent a stoichiometric coefficient (normal size)
        let coeff = "";
        while (i < normalized.length && /\d/.test(normalized[i])) {
          coeff += normalized[i];
          i++;
        }
        elements.push(<span key={`coeff-start-${i}`} className="font-extrabold text-slate-100">{coeff}</span>);
      } else {
        // Normal state: render as subscript
        elements.push(
          <sub key={`sub-${i}`} className="text-[0.75em] font-black text-cyan-200 align-sub select-none leading-none">
            {char}
          </sub>
        );
        i++;
      }
      continue;
    }
    
    // Standard chemical alphabets
    elements.push(<span key={`char-${i}`} className="text-slate-100">{char}</span>);
    i++;
  }
  
  return <span className="inline-flex items-center tracking-normal">{elements}</span>;
}

export interface BondStructureData {
  lewis: {
    description: string;
    details: string;
  };
  skeletal: {
    description: string;
    details: string;
  };
  geometry: {
    description: string;
    details: string;
    hybridization: string;
  };
}

export function getBondStructures(name: string, formula: string, classification: string): BondStructureData {
  const normName = name.toLowerCase();
  const normFormula = formula.replace(/·/g, '').replace(/\s/g, '');

  let lewisDesc = "2D representation detailing covalent electron sharing, outer bounds, and complete octets.";
  let lewisDet = "Depicts chemical bonding and shared electron pairs which illustrate how atoms combine to achieve stable electronic configuration.";

  let skeletalDesc = "Skeletal shorthand where carbon chain joints and heterogenous groups are mapped precisely.";
  let skeletalDet = "Focuses on skeletal connections and molecular lines appropriate for mapping carbon compounds in high clarity.";

  let geomDesc = "The spatial shape governed by Valence Shell Electron Pair Repulsion (VSEPR) forces.";
  let geomDet = "The physical geometry of the compound dictated by hybridization states and lone pair repulsions.";
  let geomHybrid = "N/A";

  if (normFormula.includes("H2O") || normName.includes("water")) {
    lewisDesc = "Lewis structure of water showing covalent bonding. Central oxygen shares electrons with two hydrogen atoms.";
    lewisDet = "Oxygen has 2 bonding pairs and 2 lone pairs. All atoms satisfy their respective stability rules (octet for O, duet for H).";
    
    skeletalDesc = "In skeletal structural style, covalent single bonds are represented by explicit lines connecting heterogeneous atoms.";
    skeletalDet = "Skeletal formulas are rarely used for small molecules like water, but can be drawn explicitly where necessary to map connections.";
    
    geomDesc = "3D representation illustrating tetrahedral electron domain shape with a bent or V-shaped molecular structure.";
    geomDet = "The two non-bonding lone pairs exert extra electrostatic repulsion, reducing the ideal tetrahedral angle from 109.5° to 104.5°.";
    geomHybrid = "sp³ hybridized (Oxygen)";
  }
  else if (normFormula.includes("CO2") || normName.includes("carbon dioxide")) {
    lewisDesc = "Lewis representation of Carbon Dioxide showing structural double sharing.";
    lewisDet = "Both outer oxygen atoms and the central carbon atom successfully share double covalent bonds to complete their octets.";
    
    skeletalDesc = "Bond-line representation for double bonds shows parallel strokes aligning linear atoms.";
    skeletalDet = "Symmetric linear notation where carbon sits precisely in the center.";
    
    geomDesc = "Highly symmetrical 3D linear structure.";
    geomDet = "Symmetric charge distribution makes carbon dioxide completely non-polar, despite having polar bonds.";
    geomHybrid = "sp hybridized (Carbon)";
  }
  else if (normFormula.includes("NaCl") || normName.includes("sodium chloride")) {
    lewisDesc = "Ionic Lewis structure of table salt showing complete electron transfer.";
    lewisDet = "Sodium transfers its single valence electron to Chlorine, producing stable ionic charges.";
    
    skeletalDesc = "Ionic lattices can only draw electrostatic proximity rather than continuous molecular chain lines.";
    skeletalDet = "No skeletal lines exist because bond-line structures are reserved for covalent organic molecules, not ionic salt matrices.";
    
    geomDesc = "3D face-centered cubic octahedral unit cell lattice.";
    geomDet = "Coordinates tightly in space where each ion is surrounded octahedral-wise by six oppositely charged neighbors.";
    geomHybrid = "Ionic coordination (No specific directional hybrid orbitals)";
  }
  else if (normFormula.includes("C6H6") || normName.includes("benzene")) {
    lewisDesc = "Lewis structure detailing resonant flat ring system of Carbon and Hydrogen.";
    lewisDet = "Shows alternating double and single C-C bonds (Kekulé structure) or delocalized molecular orbital representations.";
    
    skeletalDesc = "Skeletal hexagon layout. Carbons and hydrogens are fully implied.";
    skeletalDet = "Each corner specifies a carbon atom bound to a single hydrogen atom. Double bonds are noted by interior lines.";
    
    geomDesc = "Planar trigonal hex-symmetric structure.";
    geomDet = "Delocalized pi-electrons travel freely across the entire carbon ring, providing aromatic resonance stability.";
    geomHybrid = "sp² hybridized (all carbons)";
  }
  else if (normFormula.includes("CH3COOH") || normName.includes("acetic acid") || normName.includes("vinegar")) {
    lewisDesc = "Lewis representation of Ethanoic Acid detailing carboxyl bonding.";
    lewisDet = "Illustrates single C-H sharing, a C-C connection, a C=O double bond, and an active acidic hydroxyl terminal.";
    
    skeletalDesc = "Skeletal shorthand showcasing carbonyl double-lines.";
    skeletalDet = "Implies methyl carbon at the start and carbonyl carbon at the vertex, displaying carboxyl details explicitly.";
    
    geomDesc = "Combined tetrahedral methyl end and planar carboxyl end.";
    geomDet = "Intermolecular forces permit the hydroxyl hydrogen to pair closely with oxygen atoms of neighboring molecules, forming dimers.";
    geomHybrid = "sp³ (Methyl C) & sp² (Carbonyl C)";
  }
  else if (classification === "Organic" || normFormula.startsWith("C") || normName.includes("stearate") || normName.includes("paracetamol") || normName.includes("aspirin") || normName.includes("ibuprofen") || normName.includes("caffeine") || normName.includes("glucose")) {
    lewisDesc = `Lewis representation highlighting covalent sharing of Carbon and heteroatoms within ${name}.`;
    lewisDet = "Each shared pair represents non-metal atoms pooling valence shells to fulfill stable octets.";
    
    skeletalDesc = "Organic skeletal format using zigzag lines to represent molecular carbons.";
    skeletalDet = "Zigzag vertices represent CH2, CH, or carbon joints. Hydrogens linked directly to carbon are omitted for simplicity.";
    
    geomDesc = "Spatially diverse shape spanning planar and tetrahedral zones.";
    geomDet = "Molecular shapes conform to carbon centers' hybridization (mostly tetrahedral or flat ring patterns).";
    geomHybrid = "sp³ and sp² hybridized networks";
  }
  else {
    lewisDesc = `2D Lewis diagram displaying structural bonding of ${name}.`;
    lewisDet = "Depicts valence electrons organized into covalent networks or transferred to form stable ion configurations.";
    
    skeletalDesc = "Skeletal shorthand is generally unique to organic chemistry. Inorganic compounds are shown flat.";
    skeletalDet = "Since carbon chains are absent, we display the traditional structural connections between the relative atoms.";
    
    geomDesc = "3D geometric spatial configuration.";
    geomDet = "Shape is determined by atomic size ratio, hydration states, and mineral packing structures.";
    geomHybrid = "Variable metal-ligand coordination";
  }

  return {
    lewis: { description: lewisDesc, details: lewisDet },
    skeletal: { description: skeletalDesc, details: skeletalDet },
    geometry: { description: geomDesc, details: geomDet, hybridization: geomHybrid }
  };
}

export function parseToPoints(text: string | undefined | null): string[] {
  if (!text) return [];
  
  let cleaned = text.trim();
  
  // If the text contains newlines, split by them first
  if (cleaned.includes("\n")) {
    return cleaned
      .split(/\r?\n/)
      .map(p => p.trim().replace(/^[•\-\s\d\.\)]+/, '').trim())
      .filter(p => p.length > 2)
      .map(p => p.charAt(0).toUpperCase() + p.slice(1));
  }
  
  // Split by period-space or semicolon-space
  let parts = cleaned.split(/(?:\.\s+|;\s*)/);
  
  // If parts length is 1 or less, but we have multiple commas, split by comma
  if (parts.length <= 1 && cleaned.includes(",") && cleaned.split(",").length >= 3) {
    parts = cleaned.split(/,\s*/);
  }
  
  const finalPoints: string[] = [];
  for (let p of parts) {
    p = p.trim().replace(/^[•\-\s\d\.\)]+/, '').trim();
    if (p.length > 2) {
      p = p.replace(/[.;,\s]+$/, '');
      if (p.toLowerCase().startsWith("and ")) {
        p = p.slice(4).trim();
      }
      if (p.length > 2) {
        finalPoints.push(p.charAt(0).toUpperCase() + p.slice(1));
      }
    }
  }
  
  return finalPoints;
}

export interface ChemicalEntity {
  label: string;
  count: string;
  role: string;
}

export function getChemicalArrangement(name: string, formula: string): { ionsOrAtoms: ChemicalEntity[]; description: string } {
  const normalizedName = name.toLowerCase();
  const normalizedFormula = formula.replace(/·/g, '.').replace(/\s/g, '');

  // 1. Copper(II) Sulfate / Green / Blue vitriol
  if (normalizedName.includes("copper(ii) sulfate") || normalizedName.includes("copper sulfate") || normalizedFormula.includes("cuso4")) {
    return {
      ionsOrAtoms: [
        { label: "Cu^2+", count: "1", role: "Transition metal copper++ cation responsible for brilliant blue" },
        { label: "SO4^2-", count: "1", role: "Divalent polyatomic sulfate anion with tetrahedral oxygen atoms" },
        { label: "H2O", count: "5 (Hydrate)", role: "Water molecules coordinated in crystalline lattice structure" }
      ],
      description: "Arranged as copper(II) cations coordinated by a cluster of water molecules and sulfate oxyanions."
    };
  }

  // 2. Copper(I) Oxide
  if (normalizedName.includes("copper(i) oxide") || normalizedName.includes("cuprous oxide") || normalizedFormula === "cu2o") {
    return {
      ionsOrAtoms: [
        { label: "Cu^+", count: "2", role: "Monovalent copper+ cation" },
        { label: "O^2-", count: "1", role: "Divalent oxygen anion coordinating with Cu+ ions" }
      ],
      description: "Interspersed in a cubic lattice pattern where oxygen atoms coordinate with cuprous ions."
    };
  }

  // 3. Copper(II) Oxide
  if (normalizedName.includes("copper(ii) oxide") || normalizedName.includes("cupric oxide") || normalizedFormula === "cuo") {
    return {
      ionsOrAtoms: [
        { label: "Cu^2+", count: "1", role: "Divalent copper++ cation" },
        { label: "O^2-", count: "1", role: "Divalent oxide anion" }
      ],
      description: "Monoclinic crystalline system featuring square planar Cu^2+ coordinates surrounded by oxide ions."
    };
  }

  // 4. Iron(II) Sulfate / Ferrous Sulfate
  if (normalizedName.includes("iron(ii) sulfate") || normalizedName.includes("ferrous sulfate") || normalizedFormula.includes("feso4")) {
    return {
      ionsOrAtoms: [
        { label: "Fe^2+", count: "1", role: "Ferrous ion carrying iron in divalent state, providing pale-green hue" },
        { label: "SO4^2-", count: "1", role: "Polyatomic sulfate anion balancing chemical charge" }
      ],
      description: "Arranged as iron(II) cations and sulfate anions crystallizing as a monoclinic heptahydrate."
    };
  }

  // 5. Iron(III) Chloride: FeCl3
  if (normalizedName.includes("iron(iii) chloride") || normalizedName.includes("ferric chloride") || normalizedFormula.includes("fecl3")) {
    return {
      ionsOrAtoms: [
        { label: "Fe^3+", count: "1", role: "Ferric ion in trivalent state coordinating halogen atoms" },
        { label: "Cl^-", count: "3", role: "Halide chloride anions balancing structure" }
      ],
      description: "Layered crystalline lattice where ferric cations share edges formed by chlorine anions."
    };
  }

  // 6. Sodium Chloride: NaCl
  if (normalizedName.includes("sodium chloride") || normalizedFormula === "nacl") {
    return {
      ionsOrAtoms: [
        { label: "Na^+", count: "1", role: "Alkali metal sodium cation" },
        { label: "Cl^-", count: "1", role: "Halogen chlorine anion" }
      ],
      description: "Symmetrical face-centered cubic ionic crystal structure where sodium is bound to six chloride neighbors."
    };
  }

  // 7. Calcium Carbonate: CaCO3
  if (normalizedName.includes("calcium carbonate") || normalizedFormula === "caco3") {
    return {
      ionsOrAtoms: [
        { label: "Ca^2+", count: "1", role: "Alkaline earth calcium metal cation" },
        { label: "CO3^2-", count: "1", role: "Trigonal planar polyatomic carbonate group" }
      ],
      description: "Durable mineral crystal framework where calcium centers are paired with carbon-oxygen clusters."
    };
  }

  // 8. Baking Soda: NaHCO3
  if (normalizedName.includes("baking soda") || normalizedName.includes("bicarbonate") || normalizedFormula === "nahco3") {
    return {
      ionsOrAtoms: [
        { label: "Na^+", count: "1", role: "Alkali sodium cation" },
        { label: "HCO3^-", count: "1", role: "Hydrogen carbonate anion group linking hydrogen bonds" }
      ],
      description: "Formed of sodium cations linked to sheets of hydrogen-bonded bicarbonate polyatomic chains."
    };
  }

  // 9. Water: H2O
  if (normalizedName.includes("water") || normalizedFormula === "h2o") {
    return {
      ionsOrAtoms: [
        { label: "H", count: "2", role: "Hydrogen sharing single covalent bond" },
        { label: "O", count: "1", role: "Electronegative oxygen with 104.5 degree bent molecular orientation" }
      ],
      description: "Polar covalent molecule showing bent geometry with high hydrogen bonding affinity."
    };
  }

  // 10. Carbon Dioxide: CO2
  if (normalizedName.includes("carbon dioxide") || normalizedFormula === "co2") {
    return {
      ionsOrAtoms: [
        { label: "C", count: "1", role: "Central tetravalent carbon atom" },
        { label: "O", count: "2", role: "Double bonded outer oxygen atoms" }
      ],
      description: "Linear symmetrical compound where central carbon is double bonded on both ends with oxygen."
    };
  }

  // 11. Zinc Sulfate: ZnSO4
  if (normalizedName.includes("zinc sulfate") || normalizedFormula.includes("znso4")) {
    return {
      ionsOrAtoms: [
        { label: "Zn^2+", count: "1", role: "Divalent zinc cation" },
        { label: "SO4^2-", count: "1", role: "Polyatomic sulfate anion" }
      ],
      description: "Ionic salt containing zinc cations and sulfate anions coordinated in crystalline structures."
    };
  }

  // 12. Zinc Oxide: ZnO
  if (normalizedName.includes("zinc oxide") || normalizedFormula === "zno") {
    return {
      ionsOrAtoms: [
        { label: "Zn^2+", count: "1", role: "Divalent zinc cation" },
        { label: "O^2-", count: "1", role: "Divalent oxide anion structure" }
      ],
      description: "Arranged in a hexagonal wurtzite crystal structure with tetrahedrally coordinated zinc and oxygen."
    };
  }

  // 13. Hydrochloric Acid: HCl
  if (normalizedName.includes("hydrochloric") || normalizedFormula === "hcl") {
    return {
      ionsOrAtoms: [
        { label: "H", count: "1", role: "Polar covalent active hydrogen" },
        { label: "Cl", count: "1", role: "Negatively polar chlorine atom" }
      ],
      description: "A simple diatomic polar molecule that fully dissociates in water into hydrogen and chlorine ions."
    };
  }

  // 14. Sulfuric Acid: H2SO4
  if (normalizedName.includes("sulfuric") || normalizedFormula === "h2so4") {
    return {
      ionsOrAtoms: [
        { label: "H^+", count: "2", role: "Acidic hydrogen protons ready for ionization" },
        { label: "SO4^2-", count: "1", role: "Strong central polyatomic sulfate oxyanion" }
      ],
      description: "Highly polar diprotic acid arranged around a sulfur atom surrounded tetrahedrally by oxygen atoms."
    };
  }

  // Dynamic automatic parser fallback:
  const elementsMatched: ChemicalEntity[] = [];
  const regex = /([A-Z][a-z]*)(\d*)/g;
  let match;
  while ((match = regex.exec(formula)) !== null) {
    const symbol = match[1];
    const count = match[2] || "1";
    elementsMatched.push({
      label: symbol,
      count,
      role: `Constituent atomic symbol representing ${symbol}`
    });
  }

  // Dynamic polyatomic detections
  if (formula.includes("SO4")) {
    elementsMatched.push({ label: "SO4^2-", count: "1", role: "Polyatomic sulfate anion block" });
  }
  if (formula.includes("CO3")) {
    elementsMatched.push({ label: "CO3^2-", count: "1", role: "Polyatomic carbonate anion block" });
  }
  if (formula.includes("NO3") || formula.includes("No3")) {
    elementsMatched.push({ label: "NO3^-", count: "1", role: "Polyatomic nitrate anion block" });
  }
  if (formula.includes("OH")) {
    elementsMatched.push({ label: "OH^-", count: "1", role: "Polyatomic hydroxide anion block" });
  }
  if (formula.includes("NH4")) {
    elementsMatched.push({ label: "NH4^+", count: "1", role: "Polyatomic ammonium cation block" });
  }

  return {
    ionsOrAtoms: elementsMatched.length > 0 ? elementsMatched : [
      { label: formula, count: "1", role: "Substance molecular framework" }
    ],
    description: `Arranged molecular/ionic compound structure matching standard chemical ratios.`
  };
}

interface KnowYourChemicalsProps {
  isLightMode?: boolean;
}

// Chemical names vary wildly in length -- a short common name like "Water" and a long
// systematic IUPAC name like "(2R,3S,4R,5R)-2,3,4,5,6-pentahydroxyhexanal" (glucose) both
// render through the same box. A single fixed font size either wastes space on short names
// or overflows the box on long ones, so the size is picked dynamically from the name's length.
function getNameFontSizeClass(name: string | undefined | null): string {
  const len = (name || "").length;
  if (len <= 16) return "text-lg md:text-xl";
  if (len <= 28) return "text-base md:text-lg";
  if (len <= 42) return "text-sm md:text-base";
  if (len <= 60) return "text-xs md:text-sm";
  return "text-[11px] md:text-xs";
}

// Same idea as getNameFontSizeClass, but tuned for the much narrower metadata grid cells (Formula /
// Molecular Mass / Color / pH tiles), which are roughly half the width of the name boxes. pH values
// in particular range from very short ("~7.0") to quite long ("13 - 14 (concentrated); ~13 (dilute,
// ~0.1 M)"), and the long ones were overflowing/crowding their tile at a single fixed font size.
function getMetricFontSizeClass(text: string | undefined | null): string {
  const len = (text || "").length;
  if (len <= 8) return "text-sm";
  if (len <= 16) return "text-xs";
  if (len <= 26) return "text-[11px]";
  return "text-[10px]";
}

// PubChem's own generated structure images bake in a large, variable blank margin around the
// actual drawn bond structure -- most severe for simple/small compounds (e.g. metal oxides drawn
// as a couple of atoms on an otherwise empty 600x600 canvas), which is exactly why "many inorganic
// compounds" kept looking tiny inside their box even after a flat zoom. Rather than one fixed zoom
// factor for every compound, this component loads the image onto an offscreen canvas, detects the
// actual bounding box of the drawn structure (everything that isn't the flat background color), and
// computes a per-compound scale + centering translate so the structure itself always fills the box
// consistently. PubChem serves these images with permissive CORS (Access-Control-Allow-Origin: *),
// so crossOrigin="anonymous" lets the canvas read pixel data without tainting. If that analysis ever
// fails for any reason (network hiccup, an exotic image host without CORS, etc.) it falls back to a
// safe fixed zoom instead of breaking the image.
const AutoCropStructureImage: React.FC<{
  src: string;
  alt: string;
  isLightMode: boolean;
  onError: () => void;
}> = ({ src, alt, isLightMode, onError }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [transform, setTransform] = useState<string>("scale(1.28)");

  useEffect(() => {
    setTransform("scale(1.28)");
  }, [src]);

  const handleLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    try {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      if (!w || !h) return;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const { data } = ctx.getImageData(0, 0, w, h);
      const bgIdx = 0;
      const bgR = data[bgIdx], bgG = data[bgIdx + 1], bgB = data[bgIdx + 2];
      const isBackground = (r: number, g: number, b: number, a: number) => {
        if (a < 8) return true;
        const dr = r - bgR, dg = g - bgG, db = b - bgB;
        return (dr * dr + dg * dg + db * db) < 900;
      };
      let minX = w, minY = h, maxX = -1, maxY = -1;
      const step = w > 300 ? 2 : 1;
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4;
          if (!isBackground(data[i], data[i + 1], data[i + 2], data[i + 3])) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX <= minX || maxY <= minY) return;
      const fw = (maxX - minX) / w;
      const fh = (maxY - minY) / h;
      if (fw > 0.94 && fh > 0.94) {
        setTransform("scale(1.05)");
        return;
      }
      const cx = (minX + maxX) / 2 / w;
      const cy = (minY + maxY) / 2 / h;
      const fillTarget = 0.86;
      let scale = fillTarget / Math.max(fw, fh);
      scale = Math.min(Math.max(scale, 1), 5);
      const tx = (0.5 - cx) * 100;
      const ty = (0.5 - cy) * 100;
      setTransform(`scale(${scale.toFixed(3)}) translate(${tx.toFixed(2)}%, ${ty.toFixed(2)}%)`);
    } catch {
      setTransform("scale(1.28)");
    }
  };

  return (
    <img
      ref={imgRef}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      src={src}
      onLoad={handleLoad}
      onError={onError}
      alt={alt}
      className="object-contain rounded-lg transition-all duration-300"
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        transform,
        filter: isLightMode ? 'none' : 'invert(1) saturate(0) brightness(2.5) contrast(1.5)'
      }}
    />
  );
};

export default function KnowYourChemicals({ isLightMode = false }: KnowYourChemicalsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<KYCResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [structureTab, setStructureTab] = useState<"structure" | "physical">("structure");
  const [structureStyle, setStructureStyle] = useState<"neon" | "classical">("neon");
  const [structureSubMode, setStructureSubMode] = useState<"2d" | "3d">("2d");
  const [img2DError, setImg2DError] = useState(false);
  const [img3DError, setImg3DError] = useState(false);
  const [cid, setCid] = useState<number | null>(null);
  const [loadingCid, setLoadingCid] = useState(false);
  const [structureImgSrc, setStructureImgSrc] = useState<string>("");
  // -1 = the searched compound itself; 0..N-1 = result.isomers.members[index]. Both views now
  // share a single structure box (selected via buttons) instead of two separate boxes.
  const [selectedIsomerIndex, setSelectedIsomerIndex] = useState(-1);
  const [isomerImgSrc, setIsomerImgSrc] = useState<string>("");
  const [isomerImgError, setIsomerImgError] = useState(false);
  const [showPeriodicTable, setShowPeriodicTable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom and pan states for 3x bond structure display
  const [structureScale, setStructureScale] = useState(3.0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset scale and pan when the chemical changes
  useEffect(() => {
    setStructureScale(3.0);
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [result]);

  // Set the initial bond-structure image source once per new result. This is intentionally
  // NOT re-run when `cid` resolves later (see the separate CID-fetch effect below) so that an
  // already-successfully-loaded image is never yanked out from under the user just because a
  // background lookup finished; `cid` is only consulted as an additional fallback candidate
  // inside handleStructureImgError below.
  useEffect(() => {
    if (!result) {
      setStructureImgSrc("");
      return;
    }
    setStructureImgSrc(
      result.primary_structure_url ||
      (result.smiles_notation
        ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(result.smiles_notation)}/SVG`
        : "")
    );
  }, [result]);

  // Whenever the searched chemical changes, go back to showing that compound's own structure
  // (rather than staying on whatever isomer tab was previously selected for the last search).
  useEffect(() => {
    setSelectedIsomerIndex(-1);
    setIsomerImgError(false);
  }, [result]);

  // Builds a deduplicated, ordered candidate list for a single isomer's structure image, mirroring
  // buildStructureImgCandidates below but without a CID lookup (isomers don't have their own
  // resolved CID) so a single failing PubChem name-match can never blank out the box.
  const buildIsomerImgCandidates = (name: string, iupacName: string, structureUrl: string): string[] => {
    const list: string[] = [];
    const seen = new Set<string>();
    const add = (url?: string | null) => {
      if (url && !seen.has(url)) {
        seen.add(url);
        list.push(url);
      }
    };
    add(structureUrl);
    add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(name)}/SVG`);
    if (iupacName && iupacName !== name) {
      add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(iupacName)}/PNG?image_size=600x600`);
      add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(iupacName)}/SVG`);
    }
    return list;
  };

  // Loads the correct image whenever the user switches which isomer (or the main compound) is
  // selected in the unified structure box.
  useEffect(() => {
    if (!result || selectedIsomerIndex < 0 || !result.isomers) {
      setIsomerImgSrc("");
      return;
    }
    const iso = result.isomers.members[selectedIsomerIndex];
    if (!iso) {
      setIsomerImgSrc("");
      return;
    }
    setIsomerImgError(false);
    setIsomerImgSrc(buildIsomerImgCandidates(iso.name, iso.iupac_name, iso.structure_url)[0]);
  }, [result, selectedIsomerIndex]);

  const handleIsomerImgError = (currentSrc: string) => {
    if (!result || !result.isomers) {
      setIsomerImgError(true);
      return;
    }
    const iso = result.isomers.members[selectedIsomerIndex];
    if (!iso) {
      setIsomerImgError(true);
      return;
    }
    const candidates = buildIsomerImgCandidates(iso.name, iso.iupac_name, iso.structure_url);
    const currentIndex = candidates.indexOf(currentSrc);
    const next = candidates[currentIndex + 1];
    if (next) {
      setIsomerImgSrc(next);
    } else {
      setIsomerImgError(true);
    }
  };

  // Builds a deduplicated, ordered list of every URL worth trying for a 2D structure image.
  // Used by handleStructureImgError to advance strictly forward through the list, which makes
  // an infinite fallback loop (e.g. bouncing forever between a formula-name URL and a
  // common-name URL that both 400) structurally impossible.
  const buildStructureImgCandidates = (r: KYCResult, cidVal: number | null): string[] => {
    const list: string[] = [];
    const seen = new Set<string>();
    const add = (url?: string | null) => {
      if (url && !seen.has(url)) {
        seen.add(url);
        list.push(url);
      }
    };
    add(r.primary_structure_url);
    add(r.fallback_iupac_url);
    if (cidVal) add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cidVal}/SVG`);
    if (r.smiles_notation) add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(r.smiles_notation)}/SVG`);
    if (r.iupac_name) add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(r.iupac_name)}/SVG`);
    if (r.chemical_formula) add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(r.chemical_formula)}/SVG`);
    if (r.common_name) add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(r.common_name)}/SVG`);
    if (cidVal) add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cidVal}/PNG?image_size=600x600`);
    if (r.smiles_notation) add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(r.smiles_notation)}/PNG?image_size=600x600`);
    if (r.iupac_name) add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(r.iupac_name)}/PNG?image_size=600x600`);
    if (r.chemical_formula) add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(r.chemical_formula)}/PNG?image_size=600x600`);
    if (r.common_name) add(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(r.common_name)}/PNG?image_size=600x600`);
    return list;
  };

  const handleStructureImgError = (currentSrc: string) => {
    if (!result) {
      setImg2DError(true);
      return;
    }
    const candidates = buildStructureImgCandidates(result, cid);
    const currentIndex = candidates.indexOf(currentSrc);
    const next = candidates[currentIndex + 1];
    if (next) {
      setStructureImgSrc(next);
    } else {
      setImg2DError(true);
    }
  };

  // Close suggestions box on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch PubChem CID for high-reliability 2D and 3D structure queries
  useEffect(() => {
    if (!result) {
      setCid(null);
      return;
    }

    let isMounted = true;
    const fetchCid = async () => {
      setLoadingCid(true);
      try {
        // 1. Try fetching by SMILES notation first
        if (result.smiles_notation) {
          const res = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(result.smiles_notation)}/cids/JSON`);
          if (res.ok) {
            const data = await res.json();
            const retrievedCid = data.IdentifierList?.CID?.[0];
            if (retrievedCid && isMounted) {
              setCid(retrievedCid);
              setLoadingCid(false);
              return;
            }
          }
        }

        // 2. Try fetching by IUPAC name
        if (result.iupac_name) {
          const res = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(result.iupac_name)}/cids/JSON`);
          if (res.ok) {
            const data = await res.json();
            const retrievedCid = data.IdentifierList?.CID?.[0];
            if (retrievedCid && isMounted) {
              setCid(retrievedCid);
              setLoadingCid(false);
              return;
            }
          }
        }

        // 3. Try fetching by common name
        if (result.common_name) {
          const res = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(result.common_name)}/cids/JSON`);
          if (res.ok) {
            const data = await res.json();
            const retrievedCid = data.IdentifierList?.CID?.[0];
            if (retrievedCid && isMounted) {
              setCid(retrievedCid);
              setLoadingCid(false);
              return;
            }
          }
        }

        // 4. Try fetching by chemical formula
        if (result.chemical_formula) {
          const res = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(result.chemical_formula)}/cids/JSON`);
          if (res.ok) {
            const data = await res.json();
            const retrievedCid = data.IdentifierList?.CID?.[0];
            if (retrievedCid && isMounted) {
              setCid(retrievedCid);
              setLoadingCid(false);
              return;
            }
          }
        }

        if (isMounted) setCid(null);
      } catch (err) {
        console.error("Error fetching chemical CID from PubChem:", err);
        if (isMounted) setCid(null);
      } finally {
        if (isMounted) setLoadingCid(false);
      }
    };

    fetchCid();
    return () => {
      isMounted = false;
    };
  }, [result]);

  const handleSearch = async (queryToSearch: string) => {
    const trimmed = queryToSearch.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setImg2DError(false);
    setImg3DError(false);
    setCid(null);
    setSearchQuery(trimmed);
    setFocused(false);

    try {
      const response = await fetch("/api/kyc/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Chemical intelligence lookup failed.");
      }

      const data = (await response.json()) as KYCResult;
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching information.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  // Generate real-time search suggestions with priority matches
  const getSuggestions = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const combinedList = [...SUGGESTION_CHEMICALS, ...FRONTEND_ELEMENTS];

    return combinedList.filter((chem) => {
      return (
        chem.name.toLowerCase().includes(query) ||
        chem.formula.toLowerCase().includes(query) ||
        chem.synonyms.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      // Prioritize starting matches
      const aStartsName = a.name.toLowerCase().startsWith(query);
      const bStartsName = b.name.toLowerCase().startsWith(query);
      if (aStartsName && !bStartsName) return -1;
      if (!aStartsName && bStartsName) return 1;

      const aStartsFormula = a.formula.toLowerCase().startsWith(query);
      const bStartsFormula = b.formula.toLowerCase().startsWith(query);
      if (aStartsFormula && !bStartsFormula) return -1;
      if (!aStartsFormula && bStartsFormula) return 1;

      return a.name.localeCompare(b.name);
    })
    .slice(0, 12); // Display up to 12 matching elements
  };

  const suggestions = getSuggestions();

  // Atoms arrangement breakdown helper
  const arrangement = result ? getChemicalArrangement(result.common_name, result.chemical_formula) : null;
  const bondStructures = result ? getBondStructures(result.common_name, result.chemical_formula, result.classification) : null;

  const renderExplicitStructure = (onlySvg = false) => {
    if (!result) return null;
    const formulaNorm = result.chemical_formula.replace(/·/g, '').replace(/\s/g, '').toUpperCase();
    const nameNorm = result.common_name.toLowerCase();

    // Universal SVG style for 3x scaling and grab dragging
    const svgStyle = {
      transform: `scale(${structureScale}) translate(${panOffset.x / structureScale}px, ${panOffset.y / structureScale}px)`,
      transformOrigin: "center",
      cursor: isDragging ? "grabbing" : "grab",
      transition: isDragging ? "none" : "transform 0.15s ease-out",
    };

    // 1. Chloroform (CHCl3)
    if (formulaNorm === "CHCL3" || nameNorm.includes("chloroform") || nameNorm.includes("trichloromethane")) {
      const svgElement = (
        <svg className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] select-none" viewBox="0 0 500 500" fill="none" id="chloroform-svg" style={svgStyle}>
          {/* Bond lines first, so they lie behind atom labels */}
          {/* C-H Top Bond */}
          <line x1="250" y1="250" x2="250" y2="100" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" id="bond-ch" />
          
          {/* C-Cl Left Bond */}
          <line x1="250" y1="250" x2="100" y2="250" stroke="#34D399" strokeWidth="5" strokeLinecap="round" id="bond-ccl-left" />

          {/* C-Cl Bottom Bond */}
          <line x1="250" y1="250" x2="250" y2="400" stroke="#34D399" strokeWidth="5" strokeLinecap="round" id="bond-ccl-bottom" />

          {/* C-Cl Right Bond */}
          <line x1="250" y1="250" x2="400" y2="250" stroke="#34D399" strokeWidth="5" strokeLinecap="round" id="bond-ccl-right" />

          {/* Central Carbon (C) */}
          <circle cx="250" cy="250" r="32" fill="#22D3EE" stroke="#083344" strokeWidth="3" id="atom-c-node" />
          <text x="250" y="259" textAnchor="middle" fontSize="26" fontWeight="900" fill="#020617" fontFamily="sans-serif" id="atom-c-label">C</text>

          {/* Top Hydrogen (H) */}
          <circle cx="250" cy="100" r="28" fill="#38BDF8" stroke="#0c4a6e" strokeWidth="3" id="atom-h-node" />
          <text x="250" y="109" textAnchor="middle" fontSize="22" fontWeight="900" fill="#020617" fontFamily="sans-serif" id="atom-h-label">H</text>

          {/* Left Chlorine (Cl) */}
          <circle cx="100" cy="250" r="30" fill="#34D399" stroke="#064e3b" strokeWidth="3" id="atom-cl-left-node" />
          <text x="100" y="258" textAnchor="middle" fontSize="22" fontWeight="900" fill="#020617" fontFamily="sans-serif" id="atom-cl-left-label">Cl</text>
          {/* Chlorine Lone Pairs (Non-bonding valence electrons) */}
          <circle cx="94" cy="204" r="3.5" fill="#A7F3D0" />
          <circle cx="106" cy="204" r="3.5" fill="#A7F3D0" />
          <circle cx="58" cy="244" r="3.5" fill="#A7F3D0" />
          <circle cx="58" cy="256" r="3.5" fill="#A7F3D0" />
          <circle cx="94" cy="296" r="3.5" fill="#A7F3D0" />
          <circle cx="106" cy="296" r="3.5" fill="#A7F3D0" />

          {/* Bottom Chlorine (Cl) */}
          <circle cx="250" cy="400" r="30" fill="#34D399" stroke="#064e3b" strokeWidth="3" id="atom-cl-bottom-node" />
          <text x="250" y="408" textAnchor="middle" fontSize="22" fontWeight="900" fill="#020617" fontFamily="sans-serif" id="atom-cl-bottom-label">Cl</text>
          <circle cx="204" cy="394" r="3.5" fill="#A7F3D0" />
          <circle cx="204" cy="406" r="3.5" fill="#A7F3D0" />
          <circle cx="244" cy="446" r="3.5" fill="#A7F3D0" />
          <circle cx="256" cy="446" r="3.5" fill="#A7F3D0" />
          <circle cx="296" cy="394" r="3.5" fill="#A7F3D0" />
          <circle cx="296" cy="406" r="3.5" fill="#A7F3D0" />

          {/* Right Chlorine (Cl) */}
          <circle cx="400" cy="250" r="30" fill="#34D399" stroke="#064e3b" strokeWidth="3" id="atom-cl-right-node" />
          <text x="400" y="258" textAnchor="middle" fontSize="22" fontWeight="900" fill="#020617" fontFamily="sans-serif" id="atom-cl-right-label">Cl</text>
          <circle cx="394" cy="204" r="3.5" fill="#A7F3D0" />
          <circle cx="406" cy="204" r="3.5" fill="#A7F3D0" />
          <circle cx="442" cy="244" r="3.5" fill="#A7F3D0" />
          <circle cx="442" cy="256" r="3.5" fill="#A7F3D0" />
          <circle cx="394" cy="296" r="3.5" fill="#A7F3D0" />
          <circle cx="406" cy="296" r="3.5" fill="#A7F3D0" />
        </svg>
      );

      if (onlySvg) return svgElement;

      return (
        <div className="flex flex-col items-center justify-center space-y-4 w-full" id="chloroform-molecule-view">
          {svgElement}

          <div className="max-w-md p-4 bg-slate-900/80 rounded-xl border border-cyan-800/40 text-center space-y-1" id="chloroform-corner">
            <h5 className="text-xs font-bold text-cyan-300 font-mono">CHEMISTRY CORNER: COVALENT OCTET SUCCESS</h5>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              In this full Lewis structure of **Chloroform ($CHCl_3$)**, the central **Carbon (C)** atom shares single covalent bonds with **one Hydrogen (H)** and **three Chlorine (Cl)** atoms, completing its stable valence octet of 8 shared electrons.
            </p>
          </div>
        </div>
      );
    }

    // 2. Carbon Tetrachloride (CCl4)
    if (formulaNorm === "CCL4" || nameNorm.includes("carbon tetrachloride") || nameNorm.includes("tetrachloromethane")) {
      const svgElement = (
        <svg className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] select-none" viewBox="0 0 500 500" fill="none" style={svgStyle}>
          <defs>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* C-Cl Top Bond */}
          <line x1="250" y1="250" x2="250" y2="100" stroke="#475569" strokeWidth="4" />
          <line x1="250" y1="250" x2="250" y2="100" stroke="#34D399" strokeWidth="2" filter="url(#glow-green)" />
          
          {/* C-Cl Left Bond */}
          <line x1="250" y1="250" x2="100" y2="250" stroke="#475569" strokeWidth="4" />
          <line x1="250" y1="250" x2="100" y2="250" stroke="#34D399" strokeWidth="2" filter="url(#glow-green)" />

          {/* C-Cl Bottom Bond */}
          <line x1="250" y1="250" x2="250" y2="400" stroke="#475569" strokeWidth="4" />
          <line x1="250" y1="250" x2="250" y2="400" stroke="#34D399" strokeWidth="2" filter="url(#glow-green)" />

          {/* C-Cl Right Bond */}
          <line x1="250" y1="250" x2="400" y2="250" stroke="#475569" strokeWidth="4" />
          <line x1="250" y1="250" x2="400" y2="250" stroke="#34D399" strokeWidth="2" filter="url(#glow-green)" />

          {/* Central Carbon (C) */}
          <circle cx="250" cy="250" r="28" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="3.5" filter="url(#glow-cyan)" />
          <text x="250" y="258" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#22D3EE">C</text>

          {/* Top Chlorine (Cl) */}
          <circle cx="250" cy="100" r="28" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#34D399" strokeWidth="2.5" filter="url(#glow-green)" />
          <text x="250" y="108" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#34D399">Cl</text>
          <circle cx="214" cy="94" r="3" fill="#34D399" />
          <circle cx="214" cy="106" r="3" fill="#34D399" />
          <circle cx="244" cy="64" r="3" fill="#34D399" />
          <circle cx="256" cy="64" r="3" fill="#34D399" />
          <circle cx="286" cy="94" r="3" fill="#34D399" />
          <circle cx="286" cy="106" r="3" fill="#34D399" />

          {/* Left Chlorine (Cl) */}
          <circle cx="100" cy="250" r="28" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#34D399" strokeWidth="2.5" filter="url(#glow-green)" />
          <text x="100" y="258" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#34D399">Cl</text>
          <circle cx="94" cy="214" r="3" fill="#34D399" />
          <circle cx="106" cy="214" r="3" fill="#34D399" />
          <circle cx="64" cy="244" r="3" fill="#34D399" />
          <circle cx="64" cy="256" r="3" fill="#34D399" />
          <circle cx="94" cy="286" r="3" fill="#34D399" />
          <circle cx="106" cy="286" r="3" fill="#34D399" />

          {/* Bottom Chlorine (Cl) */}
          <circle cx="250" cy="400" r="28" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#34D399" strokeWidth="2.5" filter="url(#glow-green)" />
          <text x="250" y="408" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#34D399">Cl</text>
          <circle cx="214" cy="394" r="3" fill="#34D399" />
          <circle cx="214" cy="406" r="3" fill="#34D399" />
          <circle cx="244" cy="436" r="3" fill="#34D399" />
          <circle cx="256" cy="436" r="3" fill="#34D399" />
          <circle cx="286" cy="394" r="3" fill="#34D399" />
          <circle cx="286" cy="406" r="3" fill="#34D399" />

          {/* Right Chlorine (Cl) */}
          <circle cx="400" cy="250" r="28" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#34D399" strokeWidth="2.5" filter="url(#glow-green)" />
          <text x="400" y="258" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#34D399">Cl</text>
          <circle cx="394" cy="214" r="3" fill="#34D399" />
          <circle cx="406" cy="214" r="3" fill="#34D399" />
          <circle cx="436" cy="244" r="3" fill="#34D399" />
          <circle cx="436" cy="256" r="3" fill="#34D399" />
          <circle cx="394" cy="286" r="3" fill="#34D399" />
          <circle cx="406" cy="286" r="3" fill="#34D399" />
        </svg>
      );

      if (onlySvg) return svgElement;

      return (
        <div className="flex flex-col items-center justify-center space-y-4 w-full">
          {svgElement}

          <div className="max-w-md p-4 bg-slate-900/80 rounded-xl border border-cyan-800/40 text-center space-y-1">
            <h5 className="text-xs font-bold text-cyan-300 font-mono">CHEMISTRY CORNER: SYMMETRICAL TETRAHEDRAL HALIDE</h5>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              In **Carbon Tetrachloride ($CCl_4$)**, a symmetrical non-polar covalent molecule, all four of Carbon's valence electrons are shared with four surrounding **Chlorines (Cl)**.
            </p>
          </div>
        </div>
      );
    }

    // 3. Water (H2O)
    if (formulaNorm === "H2O" || nameNorm.includes("water") || nameNorm.includes("dihydrogen monoxide")) {
      const svgElement = (
        <svg className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] select-none" viewBox="0 0 500 500" fill="none" style={svgStyle}>
          <defs>
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* O-H Left bent Bond */}
          <line x1="250" y1="220" x2="140" y2="330" stroke="#475569" strokeWidth="4" />
          <line x1="250" y1="220" x2="140" y2="330" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />

          {/* O-H Right bent Bond */}
          <line x1="250" y1="220" x2="360" y2="330" stroke="#475569" strokeWidth="4" />
          <line x1="250" y1="220" x2="360" y2="330" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />

          {/* Central Oxygen (O) */}
          <circle cx="250" cy="220" r="30" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#EF4444" strokeWidth="3.5" filter="url(#glow-red)" />
          <text x="250" y="229" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#EF4444">O</text>

          {/* Oxygen Lone Pairs (dots on top representing bent-geometry repulsion) */}
          <circle cx="220" cy="165" r="3.5" fill="#EF4444" />
          <circle cx="230" cy="155" r="3.5" fill="#EF4444" />
          
          <circle cx="270" cy="155" r="3.5" fill="#EF4444" />
          <circle cx="280" cy="165" r="3.5" fill="#EF4444" />

          {/* Left Hydrogen (H) */}
          <circle cx="140" cy="330" r="26" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="2.5" filter="url(#glow-blue)" />
          <text x="140" y="338" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#38BDF8">H</text>

          {/* Right Hydrogen (H) */}
          <circle cx="360" cy="330" r="26" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="2.5" filter="url(#glow-blue)" />
          <text x="360" y="338" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#38BDF8">H</text>
        </svg>
      );

      if (onlySvg) return svgElement;

      return (
        <div className="flex flex-col items-center justify-center space-y-4 w-full">
          {svgElement}

          <div className="max-w-md p-4 bg-slate-900/80 rounded-xl border border-red-900/40 text-center space-y-1">
            <h5 className="text-xs font-bold text-red-400 font-mono">CHEMISTRY CORNER: BENT V-SHAPE HYBRIDIZATION</h5>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              In **Water ($H_2O$)**, Oxygen has 2 bonding pairs and 2 highly repulsive **Lone Pairs**. This reduces the bond angle from tetrahedral $109.5^\circ$ to $104.5^\circ$, creating a polar bent structure.
            </p>
          </div>
        </div>
      );
    }

    // 4. Carbon Dioxide (CO2)
    if (formulaNorm === "CO2" || nameNorm.includes("carbon dioxide") || nameNorm.includes("carbonic acid gas")) {
      const svgElement = (
        <svg className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] select-none" viewBox="0 0 500 500" fill="none" style={svgStyle}>
          <defs>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* C=O Left Double Bond */}
          <line x1="250" y1="240" x2="100" y2="240" stroke="#475569" strokeWidth="3" />
          <line x1="250" y1="240" x2="100" y2="240" stroke="#EF4444" strokeWidth="1.5" filter="url(#glow-red)" />
          <line x1="250" y1="260" x2="100" y2="260" stroke="#475569" strokeWidth="3" />
          <line x1="250" y1="260" x2="100" y2="260" stroke="#EF4444" strokeWidth="1.5" filter="url(#glow-red)" />

          {/* C=O Right Double Bond */}
          <line x1="250" y1="240" x2="400" y2="240" stroke="#475569" strokeWidth="3" />
          <line x1="250" y1="240" x2="400" y2="240" stroke="#EF4444" strokeWidth="1.5" filter="url(#glow-red)" />
          <line x1="250" y1="260" x2="400" y2="260" stroke="#475569" strokeWidth="3" />
          <line x1="250" y1="260" x2="400" y2="260" stroke="#EF4444" strokeWidth="1.5" filter="url(#glow-red)" />

          {/* Central Carbon (C) */}
          <circle cx="250" cy="250" r="30" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="3.5" filter="url(#glow-cyan)" />
          <text x="250" y="259" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#22D3EE">C</text>

          {/* Left Oxygen (O) */}
          <circle cx="100" cy="250" r="28" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#EF4444" strokeWidth="2.5" filter="url(#glow-red)" />
          <text x="100" y="258" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#EF4444">O</text>
          <circle cx="65" cy="235" r="3" fill="#EF4444" />
          <circle cx="65" cy="245" r="3" fill="#EF4444" />
          <circle cx="65" cy="255" r="3" fill="#EF4444" />
          <circle cx="65" cy="265" r="3" fill="#EF4444" />

          {/* Right Oxygen (O) */}
          <circle cx="400" cy="250" r="28" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#EF4444" strokeWidth="2.5" filter="url(#glow-red)" />
          <text x="400" y="258" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#EF4444">O</text>
          <circle cx="435" cy="235" r="3" fill="#EF4444" />
          <circle cx="435" cy="245" r="3" fill="#EF4444" />
          <circle cx="435" cy="255" r="3" fill="#EF4444" />
          <circle cx="435" cy="265" r="3" fill="#EF4444" />
        </svg>
      );

      if (onlySvg) return svgElement;

      return (
        <div className="flex flex-col items-center justify-center space-y-4 w-full">
          {svgElement}

          <div className="max-w-md p-4 bg-slate-900/80 rounded-xl border border-teal-900/40 text-center space-y-1">
            <h5 className="text-xs font-bold text-cyan-300 font-mono">CHEMISTRY CORNER: COVALALENT DOUBLE BONDS</h5>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              In **Carbon Dioxide ($CO_2$)**, the Carbon shares 4 valence electrons with 2 oxygens via **two double bonds**, satisfying octets and forming a symmetric linear, non-polar layout.
            </p>
          </div>
        </div>
      );
    }

    // 5. Benzene (C6H6)
    if (formulaNorm === "C6H6" || nameNorm.includes("benzene")) {
      const svgElement = (
        <svg className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] select-none" viewBox="0 0 500 500" fill="none" style={svgStyle}>
          <defs>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Hydrogens connected */}
          <line x1="250" y1="130" x2="250" y2="40" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />
          <line x1="354" y1="190" x2="434" y2="144" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />
          <line x1="354" y1="310" x2="434" y2="356" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />
          <line x1="250" y1="370" x2="250" y2="460" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />
          <line x1="146" y1="310" x2="66" y2="356" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />
          <line x1="146" y1="190" x2="66" y2="144" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />

          {/* Ring Carbon-Carbon bonds (alternating double/single bonds) */}
          <line x1="250" y1="130" x2="354" y2="190" stroke="#22D3EE" strokeWidth="4" />
          <line x1="256" y1="140" x2="346" y2="192" stroke="#22D3EE" strokeWidth="1.5" />
          
          <line x1="354" y1="190" x2="354" y2="310" stroke="#22D3EE" strokeWidth="4" />
          
          <line x1="354" y1="310" x2="250" y2="370" stroke="#22D3EE" strokeWidth="4" />
          <line x1="346" y1="308" x2="256" y2="360" stroke="#22D3EE" strokeWidth="1.5" />
          
          <line x1="250" y1="370" x2="146" y2="310" stroke="#22D3EE" strokeWidth="4" />
          
          <line x1="146" y1="310" x2="146" y2="190" stroke="#22D3EE" strokeWidth="4" />
          <line x1="154" y1="302" x2="154" y2="198" stroke="#22D3EE" strokeWidth="1.5" />
          
          <line x1="146" y1="190" x2="250" y2="130" stroke="#22D3EE" strokeWidth="4" />

          {/* Carbon Nodes */}
          <circle cx="250" cy="130" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="250" y="136" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          <circle cx="354" cy="190" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="354" y="196" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          <circle cx="354" cy="310" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="354" y="316" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          <circle cx="250" cy="370" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="250" y="376" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          <circle cx="146" cy="310" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="146" y="316" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          <circle cx="146" cy="190" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="146" y="196" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          {/* Hydrogen Nodes */}
          <circle cx="250" cy="40" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="250" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>

          <circle cx="434" cy="144" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="434" y="149" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>

          <circle cx="434" cy="356" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="434" y="361" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>

          <circle cx="250" cy="460" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="250" y="465" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>

          <circle cx="66" cy="356" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="66" y="361" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>

          <circle cx="66" cy="144" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="66" y="149" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>
        </svg>
      );

      if (onlySvg) return svgElement;

      return (
        <div className="flex flex-col items-center justify-center space-y-4 w-full">
          {svgElement}

          <div className="max-w-md p-4 bg-slate-900/80 rounded-xl border border-cyan-900/40 text-center space-y-1">
            <h5 className="text-xs font-bold text-cyan-300 font-mono">CHEMISTRY CORNER: AROMATIC RESONANCE</h5>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              In this full layout of **Benzene ($C_6H_6$)**, each **Carbon (C)** is explicitly bound to one **Hydrogen (H)**. The ring stabilizes through a delocalized system of 6 pi-electrons.
            </p>
          </div>
        </div>
      );
    }

    // 6. Phenol (C6H5OH / C6H6O)
    if (formulaNorm === "C6H5OH" || formulaNorm === "C6H6O" || nameNorm.includes("phenol") || nameNorm.includes("carbolic acid")) {
      const svgElement = (
        <svg className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] select-none" viewBox="0 0 500 500" fill="none" id="phenol-svg" style={svgStyle}>
          <defs>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* C-O Bond from C1 to Oxygen */}
          <line x1="250" y1="130" x2="250" y2="70" stroke="#f472b6" strokeWidth="4" filter="url(#glow-pink)" />
          
          {/* O-H Bond from Oxygen to Hydroxyl Hydrogen */}
          <line x1="250" y1="70" x2="310" y2="35" stroke="#38BDF8" strokeWidth="2.5" filter="url(#glow-blue)" />

          {/* Hydrogens connected to the rest of the ring */}
          <line x1="354" y1="190" x2="434" y2="144" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />
          <line x1="354" y1="310" x2="434" y2="356" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />
          <line x1="250" y1="370" x2="250" y2="460" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />
          <line x1="146" y1="310" x2="66" y2="356" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />
          <line x1="146" y1="190" x2="66" y2="144" stroke="#38BDF8" strokeWidth="2" filter="url(#glow-blue)" />

          {/* Ring Carbon-Carbon bonds (alternating double/single bonds) */}
          <line x1="250" y1="130" x2="354" y2="190" stroke="#22D3EE" strokeWidth="4" />
          <line x1="256" y1="140" x2="346" y2="192" stroke="#22D3EE" strokeWidth="1.5" />
          
          <line x1="354" y1="190" x2="354" y2="310" stroke="#22D3EE" strokeWidth="4" />
          
          <line x1="354" y1="310" x2="250" y2="370" stroke="#22D3EE" strokeWidth="4" />
          <line x1="346" y1="308" x2="256" y2="360" stroke="#22D3EE" strokeWidth="1.5" />
          
          <line x1="250" y1="370" x2="146" y2="310" stroke="#22D3EE" strokeWidth="4" />
          
          <line x1="146" y1="310" x2="146" y2="190" stroke="#22D3EE" strokeWidth="4" />
          <line x1="154" y1="302" x2="154" y2="198" stroke="#22D3EE" strokeWidth="1.5" />
          
          <line x1="146" y1="190" x2="250" y2="130" stroke="#22D3EE" strokeWidth="4" />

          {/* Carbon Nodes */}
          <circle cx="250" cy="130" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="250" y="136" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          <circle cx="354" cy="190" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="354" y="196" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          <circle cx="354" cy="310" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="354" y="316" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          <circle cx="250" cy="370" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="250" y="376" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          <circle cx="146" cy="310" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="146" y="316" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          <circle cx="146" cy="190" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="2" filter="url(#glow-cyan)" />
          <text x="146" y="196" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#22D3EE">C</text>

          {/* Oxygen Node of OH Group */}
          <circle cx="250" cy="70" r="18" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#f472b6" strokeWidth="2" filter="url(#glow-pink)" />
          <text x="250" y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#f472b6">O</text>
          {/* Oxygen Lone Pairs */}
          <circle cx="238" cy="62" r="2.5" fill="#fbcfe8" />
          <circle cx="234" cy="70" r="2.5" fill="#fbcfe8" />

          {/* Hydrogen Node of OH Group */}
          <circle cx="310" cy="35" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="310" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>

          {/* Standard Ring Hydrogen Nodes */}
          <circle cx="434" cy="144" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="434" y="149" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>

          <circle cx="434" cy="356" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="434" y="361" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>

          <circle cx="250" cy="460" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="250" y="465" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>

          <circle cx="66" cy="356" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="66" y="361" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>

          <circle cx="66" cy="144" r="16" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="1.5" filter="url(#glow-blue)" />
          <text x="66" y="149" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#38BDF8">H</text>
        </svg>
      );

      if (onlySvg) return svgElement;

      return (
        <div className="flex flex-col items-center justify-center space-y-4 w-full" id="phenol-molecule-view">
          {svgElement}

          <div className="max-w-md p-4 bg-slate-900/80 rounded-xl border border-pink-900/40 text-center space-y-1">
            <h5 className="text-xs font-bold text-pink-300 font-mono">CHEMISTRY CORNER: PHENOL STRUCTURE</h5>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              In **Phenol ($C_6H_5OH$)**, one of the hydrogen atoms of the benzene ring is substituted by a **hydroxyl (—OH) group**. This resonance-stabilized aromatic ring increases acidity compared to aliphatic alcohols.
            </p>
          </div>
        </div>
      );
    }

    // Generic fallback for other compounds
    const elementsMatched: { symbol: string; count: number }[] = [];
    if (result.chemical_formula) {
      const regex = /([A-Z][a-z]*)([0-9]*)/g;
      let match;
      while ((match = regex.exec(result.chemical_formula)) !== null) {
        elementsMatched.push({
          symbol: match[1],
          count: match[2] ? parseInt(match[2]) : 1
        });
      }
    }

    if (elementsMatched.length === 0) {
      elementsMatched.push({ symbol: "C", count: 1 }, { symbol: "H", count: 4 });
    }

    const svgElement = (
      <svg className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] select-none" viewBox="0 0 500 500" fill="none" style={svgStyle}>
        <defs>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Central explicit anchor node */}
        <circle cx="250" cy="250" r="32" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#22D3EE" strokeWidth="4" filter="url(#glow-cyan)" />
        <text x="250" y="259" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#22D3EE">
          {elementsMatched[0]?.symbol || "C"}
        </text>

        {/* Draw satellite atoms explicitly with labels */}
        {elementsMatched.slice(1, 5).map((el, idx) => {
          const angles = [0, 90, 180, 270];
          const angle = (angles[idx] * Math.PI) / 180;
          const rDist = 130;
          const targetX = 250 + rDist * Math.cos(angle);
          const targetY = 250 + rDist * Math.sin(angle);
          
          return (
            <g key={idx}>
              <line x1="250" y1="250" x2={targetX} y2={targetY} stroke="#475569" strokeWidth="3" />
              <line x1="250" y1="250" x2={targetX} y2={targetY} stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx={targetX} cy={targetY} r="24" fill={isLightMode ? "#e2e8f0" : "#020617"} stroke="#38BDF8" strokeWidth="2" />
              <text x={targetX} y={targetY + 7} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#38BDF8">
                {el.symbol}{el.count > 1 ? el.count : ""}
              </text>
            </g>
          );
        })}
      </svg>
    );

    if (onlySvg) return svgElement;

    return (
      <div className="flex flex-col items-center justify-center space-y-4 w-full">
        {svgElement}

        <div className="max-w-md p-4 bg-slate-900/80 rounded-xl border border-cyan-800/40 text-center space-y-1">
          <h5 className="text-xs font-bold text-cyan-300 font-mono">COMPLETE STRUCTURAL REPRESENTATION</h5>
          <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
            Explicitly detailing atomic constituent elements of **{result.chemical_formula}** ({result.common_name}). Carbon-hydrogen bones and heteroatom locations are brought into primary focus.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div 
      id="kyc-container" 
      className={`space-y-6 max-w-6xl mx-auto p-5 md:p-8 rounded-3xl border shadow-2xl backdrop-blur-md transition-all duration-300 ${
        isLightMode 
          ? 'bg-white text-slate-850 border-slate-200' 
          : 'bg-slate-900/60 text-slate-100 border-slate-800/80'
      }`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        #kyc-container {
          background-color: ${isLightMode ? '#ffffff' : '#040812'} !important;
          color: ${isLightMode ? '#1e293b' : '#f1f5f9'} !important;
          border-color: ${isLightMode ? '#cbd5e1' : 'rgba(30, 41, 59, 0.8)'} !important;
        }
        #kyc-container .bg-slate-950,
        #kyc-container .bg-slate-950\\/70,
        #kyc-container .bg-slate-950\\/80,
        #kyc-container .bg-slate-950\\/85 {
          background-color: ${isLightMode ? '#f8fafc' : '#020617'} !important;
          border-color: ${isLightMode ? '#e2e8f0' : '#1e293b'} !important;
        }
        #kyc-container .bg-slate-900,
        #kyc-container .bg-slate-900\\/40,
        #kyc-container .bg-slate-900\\/50,
        #kyc-container .bg-slate-900\\/60,
        #kyc-container .bg-slate-900\\/80 {
          background-color: ${isLightMode ? '#f1f5f9' : '#0f172a'} !important;
          border-color: ${isLightMode ? '#e2e8f0' : '#1e293b'} !important;
        }
        #kyc-container .border-slate-800,
        #kyc-container .border-slate-800\\/80,
        #kyc-container .border-slate-850,
        #kyc-container .border-slate-700,
        #kyc-container .border-slate-700\\/60,
        #kyc-container .border-slate-700\\/80 {
          border-color: ${isLightMode ? '#e2e8f0' : '#1e293b'} !important;
        }
        #kyc-container .text-slate-300,
        #kyc-container .text-slate-400 {
          color: ${isLightMode ? '#475569' : '#94a3b8'} !important;
        }
        #kyc-container .text-slate-200,
        #kyc-container .text-slate-100 {
          color: ${isLightMode ? '#1e293b' : '#f1f5f9'} !important;
        }
        #kyc-container h1,
        #kyc-container h2,
        #kyc-container h3,
        #kyc-container h4,
        #kyc-container h5,
        #kyc-container h6 {
          color: ${isLightMode ? '#0f172a' : '#ffffff'} !important;
        }
        #kyc-container input {
          background-color: ${isLightMode ? '#ffffff' : '#0f172a'} !important;
          color: ${isLightMode ? '#0f172a' : '#ffffff'} !important;
          border-color: ${isLightMode ? '#cbd5e1' : '#334155'} !important;
        }
        #kyc-container select {
          background-color: ${isLightMode ? '#ffffff' : '#0f172a'} !important;
          color: ${isLightMode ? '#0f172a' : '#ffffff'} !important;
          border-color: ${isLightMode ? '#cbd5e1' : '#334155'} !important;
        }
        #kyc-container .bg-cyan-950\\/60 {
          background-color: ${isLightMode ? '#ecfeff' : 'rgba(8, 47, 73, 0.6)'} !important;
          border-color: ${isLightMode ? '#cffafe' : 'rgba(21, 94, 117, 0.6)'} !important;
          color: ${isLightMode ? '#0891b2' : '#cffafe'} !important;
        }
        #kyc-container .text-transparent.bg-clip-text {
          color: ${isLightMode ? '#0f172a' : 'transparent'} !important;
          background-image: ${isLightMode ? 'none' : ''} !important;
          -webkit-text-fill-color: ${isLightMode ? '#0f172a' : 'transparent'} !important;
        }
        #kyc-container .bg-cyan-950\\/40 {
          background-color: ${isLightMode ? '#ecfeff' : 'rgba(8, 47, 73, 0.4)'} !important;
        }
        #kyc-container .text-cyan-300,
        #kyc-container .text-cyan-400 {
          color: ${isLightMode ? '#0891b2' : '#67e8f9'} !important;
        }
        #kyc-container .text-emerald-350,
        #kyc-container .text-emerald-400 {
          color: ${isLightMode ? '#047857' : '#34d399'} !important;
        }
        #kyc-container .text-teal-350,
        #kyc-container .text-teal-400 {
          color: ${isLightMode ? '#0d9488' : '#2dd4bf'} !important;
        }
        #kyc-container .text-teal-300 {
          color: ${isLightMode ? '#0f766e' : '#5eead4'} !important;
        }
        #kyc-container .text-teal-200 {
          color: ${isLightMode ? '#115e59' : '#99f6e4'} !important;
        }
        #kyc-container .text-cyan-200 {
          color: ${isLightMode ? '#075985' : '#bae6fd'} !important;
        }
        #kyc-container .bg-teal-950\\/80 {
          background-color: ${isLightMode ? '#f0fdf4' : 'rgba(4, 47, 46, 0.8)'} !important;
          border-color: ${isLightMode ? '#bbf7d0' : '#115e59'} !important;
          color: ${isLightMode ? '#15803d' : '#2dd4bf'} !important;
        }
        #kyc-container .bg-cyan-950\\/80 {
          background-color: ${isLightMode ? '#ecfeff' : 'rgba(8, 47, 73, 0.8)'} !important;
          border-color: ${isLightMode ? '#cffafe' : '#155e75'} !important;
          color: ${isLightMode ? '#0369a1' : '#22d3ee'} !important;
        }
        #kyc-container .bg-teal-950\\/50 {
          background-color: ${isLightMode ? '#f0fdf4' : 'rgba(4, 47, 46, 0.5)'} !important;
          border-color: ${isLightMode ? '#bbf7d0' : '#115e59'} !important;
          color: ${isLightMode ? '#15803d' : '#2dd4bf'} !important;
        }
      ` }} />
      {/* Header Block: Scaled Down by 1-2 points to improve balance */}
      <div className="text-center space-y-2 md:py-4">
        <h1 className="text-2xl md:text-4xl font-extrabold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-300 to-emerald-300">
          Know Your Chemicals
        </h1>
      </div>

      {/* Main Search Section with Real-Time suggestions. placeholder */}
      <div
        ref={containerRef}
        className={`relative p-5 md:p-6 rounded-3xl border shadow-inner max-w-3xl mx-auto space-y-3 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800/90'}`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchQuery);
          }}
          className="relative flex items-center"
        >
          <Search className={`absolute left-4 w-5 h-5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            type="text"
            className={`w-full pl-12 pr-28 py-3 border focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 rounded-2xl text-xs md:text-sm font-medium outline-none transition-all ${isLightMode ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400' : 'bg-slate-900 border-slate-700/80 text-slate-100 placeholder-slate-400'}`}
            placeholder="Search chemical name or formula (e.g. CuSO4)..."
            value={searchQuery}
            onFocus={() => setFocused(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setFocused(true);
            }}
          />
          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className="absolute right-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition duration-150 cursor-pointer flex items-center gap-1"
          >
            {loading ? (
              <span className="w-4.5 h-4.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Beaker className="w-4.5 h-4.5 text-slate-950" />
                <span>Analyze</span>
              </>
            )}
          </button>
        </form>

        {/* Real-time Autocomplete Suggestions Box */}
        <AnimatePresence>
          {focused && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={`absolute top-full left-0 right-0 mt-2 border rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto scrollbar-thin ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-700'}`}
            >
              <div className={`p-2.5 border-b text-xs font-mono uppercase font-black tracking-wider flex items-center gap-2 ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-slate-900/90 border-slate-800 text-slate-400'}`}>
                <Atom className="w-4 h-4 text-cyan-400" />
                <span>Related Chemical Suggestions ({suggestions.length})</span>
              </div>
              <div className={`divide-y ${isLightMode ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                {suggestions.map((chem, idx) => (
                  <button
                    key={`${chem.name}-${idx}`}
                    type="button"
                    onClick={() => {
                      handleSearch(chem.name);
                    }}
                    className={`w-full text-left px-4 py-3 transition flex items-center justify-between gap-4 cursor-pointer ${isLightMode ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-900 text-slate-200'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1 rounded-lg bg-cyan-950/40 border border-cyan-800/30 text-cyan-400">
                        <Beaker className="w-4 h-4" />
                      </div>
                      <span className="text-base font-semibold text-slate-100">
                        {chem.name}
                      </span>
                    </div>
                    <span className="text-sm font-mono font-medium text-emerald-300">
                      {renderFormattedFormula(chem.formula)}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Option to View Complete Periodic Table */}
      <div className="flex flex-col sm:flex-row items-center justify-center pt-2 pb-1 gap-3 max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => setShowPeriodicTable(true)}
          className={`flex items-center gap-2.5 px-6 py-3 border hover:border-cyan-500/50 rounded-2xl text-xs md:text-sm font-bold uppercase tracking-wider transition duration-150 cursor-pointer shadow-lg hover:shadow-cyan-500/10 active:scale-95 ${isLightMode ? 'bg-white hover:bg-cyan-50 border-slate-200 text-cyan-700 hover:text-cyan-800' : 'bg-slate-900 hover:bg-slate-850/80 border-slate-800 text-cyan-400 hover:text-cyan-300'}`}
        >
          <Atom className="w-4.5 h-4.5 text-cyan-400 animate-spin-slow" style={{ animationDuration: '8s' }} />
          <span>View Complete Periodic Table</span>
        </button>
      </div>

      {/* Full Screen Periodic Table Overlay */}
      <AnimatePresence>
        {showPeriodicTable && (
          <PeriodicTable 
            onClose={() => setShowPeriodicTable(false)} 
            isLightMode={isLightMode} 
          />
        )}
      </AnimatePresence>

      {/* Interactive Loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center p-14 space-y-4"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>
              <Beaker className="absolute w-8 h-8 text-cyan-300 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-bold text-cyan-300 animate-pulse font-mono">Running advanced chemical lookup...</p>
              <p className="text-sm text-slate-400 font-mono">Parsing exact substance properties in real-time...</p>
            </div>
          </motion.div>
        )}

        {/* Error message */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 border rounded-2xl text-center max-w-2xl mx-auto space-y-2 ${isLightMode ? 'bg-rose-50 border-rose-300' : 'bg-rose-950/40 border-rose-700/50'}`}
          >
            <p className={`text-lg font-bold flex items-center justify-center gap-2 ${isLightMode ? 'text-rose-700' : 'text-rose-300'}`}>
              <span>⚠️</span> Search Unsuccessful
            </p>
            <p className={`text-sm font-mono leading-relaxed ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
              {error}
            </p>
            <p className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Please check the spelling or enter a common name (like Aspirin) or standard chemical formula (like CuSO4).
            </p>
          </motion.div>
        )}

        {/* Search Result Details view */}
        {result && !loading && arrangement && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Block: Chemical Metadata Card */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-6 relative border transition-all duration-300 ${
                isLightMode ? 'bg-white border-slate-200 shadow-slate-100' : 'bg-slate-950/70 border-slate-700/60'
              }`}>
                {/* Glow Ring backdrop */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full filter blur-3xl opacity-10 pointer-events-none ${
                  result.classification === "Organic" ? "bg-emerald-500" : "bg-cyan-500"
                }`}></div>

                {/* Clearly Distinguished Names Header Block - High-fidelity & segregated */}
                <div className={`border-b pb-5 space-y-4 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-md border ${
                        isLightMode 
                          ? "bg-cyan-50 text-cyan-800 border-cyan-200"
                          : "bg-cyan-950/40 text-cyan-300 border-cyan-800/30"
                      }`}>
                        {result.chemical_type}
                      </span>
                      <span className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-md border ${
                        result.classification === "Organic"
                          ? isLightMode 
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                            : "bg-emerald-950/50 text-emerald-300 border-emerald-800/40"
                          : isLightMode 
                            ? "bg-cyan-50 text-cyan-800 border-cyan-200" 
                            : "bg-cyan-950/50 text-cyan-300 border-cyan-800/40"
                      }`}>
                        {result.classification}
                      </span>
                      {result.element_category && (
                        <span className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-md border ${
                          result.element_category === "Metal"
                            ? isLightMode 
                              ? "bg-amber-50 text-amber-800 border-amber-200" 
                              : "bg-amber-950/50 text-amber-300 border-amber-800/40"
                            : result.element_category === "Non-metal"
                            ? isLightMode 
                              ? "bg-blue-50 text-blue-800 border-blue-200" 
                              : "bg-blue-950/50 text-blue-300 border-blue-800/40"
                            : isLightMode 
                              ? "bg-purple-50 text-purple-800 border-purple-200" 
                              : "bg-purple-950/50 text-purple-300 border-purple-800/40"
                        }`}>
                          {result.element_category}
                        </span>
                      )}
                    </div>
                    {result.pdb_id && (
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Standard Registry ID: PDB {result.pdb_id}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {/* Common Name */}
                    <div className={`space-y-1 p-4 rounded-xl border transition-all duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/50 border-slate-800'}`}>
                      <span className="text-xs font-mono font-black text-emerald-500 uppercase tracking-wider block font-bold">
                        Common Name
                      </span>
                      <h2 className={`${getNameFontSizeClass(result.common_name)} font-extrabold leading-tight font-sans tracking-tight break-words ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                        {result.common_name}
                      </h2>
                    </div>

                    {/* IUPAC Name */}
                    <div className={`space-y-1 p-4 rounded-xl border transition-all duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/50 border-slate-800'}`}>
                      <span className="text-xs font-mono font-black text-cyan-500 uppercase tracking-wider block font-bold">
                        IUPAC Systemic Name
                      </span>
                      <p className={`${getNameFontSizeClass(result.iupac_name)} font-extrabold font-mono leading-tight break-words ${isLightMode ? 'text-cyan-850 font-bold' : 'text-cyan-200'}`}>
                        {result.iupac_name || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className={`grid grid-cols-1 ${(result.atomic_number !== undefined || result.ph_value) ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-5`}>
                  {/* Molecular Formula with subscripts and superscripts */}
                  <div className={`p-4 rounded-xl border space-y-1.5 transition-all duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <div className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-between ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      <span>{result.element_category ? "Element Symbol" : "Formula"}</span>
                      <button
                        onClick={() => handleCopy(result.chemical_formula, "formula")}
                        className={`${isLightMode ? 'text-slate-500 hover:text-slate-950' : 'text-slate-400 hover:text-white'} transition duration-150 cursor-pointer`}
                        title="Copy Molecular Formula"
                      >
                        {copiedKey === "formula" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className={`${getMetricFontSizeClass(result.chemical_formula)} font-black font-mono tracking-wide leading-snug break-words ${isLightMode ? 'text-emerald-750 font-black' : 'text-emerald-300'}`}>
                      {renderFormattedFormula(result.chemical_formula)}
                    </p>
                  </div>

                  {/* Atomic Number (Conditional) */}
                  {result.atomic_number !== undefined && (
                    <div className={`p-4 rounded-xl border space-y-1.5 transition-all duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                      <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        <span>Atomic Number</span>
                      </div>
                      <p className={`text-sm font-bold font-mono ${isLightMode ? 'text-amber-700 font-extrabold' : 'text-amber-300'}`}>
                        #{result.atomic_number}
                      </p>
                    </div>
                  )}

                  {/* Molecular Weight / Atomic Mass */}
                  <div className={`p-4 rounded-xl border space-y-1.5 transition-all duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      <span>{result.atomic_mass ? "Atomic Mass" : "Molecular Mass"}</span>
                    </div>
                    <p className={`${getMetricFontSizeClass(result.atomic_mass || result.molecular_weight)} font-bold font-mono leading-snug break-words ${isLightMode ? 'text-slate-800 font-extrabold' : 'text-slate-200'}`}>
                      {result.atomic_mass || result.molecular_weight || "N/A"}
                    </p>
                  </div>

                  {/* Chemical Color (Mentioned Prominently as Requested) */}
                  <div className={`p-4 rounded-xl border space-y-1.5 transition-all duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      <span>Physical Color</span>
                    </div>
                    <p className={`${getMetricFontSizeClass(result.color)} font-bold font-sans leading-snug break-words ${isLightMode ? 'text-teal-700 font-extrabold' : 'text-teal-300'}`}>
                      {result.color || "Colorless / White"}
                    </p>
                  </div>

                  {/* pH of Aqueous Solution */}
                  {result.ph_value && (
                    <div
                      className={`p-4 rounded-xl border space-y-1.5 transition-all duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}
                      title={result.ph_note || ""}
                    >
                      <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        <span>pH (Aqueous)</span>
                      </div>
                      <p className={`${getMetricFontSizeClass(result.ph_value)} font-black font-mono leading-snug break-words ${isLightMode ? 'text-rose-700 font-extrabold' : 'text-rose-300'}`}>
                        {result.ph_value}
                      </p>
                    </div>
                  )}
                </div>
                {result.ph_note && (
                  <p className={`text-[11px] leading-relaxed -mt-2 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span className="font-bold">pH note:</span> {result.ph_note}
                  </p>
                )}

                {/* External biological link */}
                {result.pdb_id && (
                  <div className="flex flex-wrap gap-2 pt-1 text-sm font-mono">
                    <a
                      href={`https://www.rcsb.org/structure/${result.pdb_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition duration-150 cursor-pointer ${isLightMode ? 'bg-violet-50 border-violet-300 text-violet-700 hover:bg-violet-100 hover:text-violet-900' : 'bg-violet-950/40 border-violet-850/50 text-violet-300 hover:bg-violet-900 hover:text-white'}`}
                    >
                      <Dna className="w-4 h-4" />
                      <span>RCSB PDB ID: {result.pdb_id.toUpperCase()} Structure Mapping</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Chemical Bond Structure Frameworks Card */}
              {bondStructures && (
                <div className={`rounded-3xl overflow-hidden shadow-2xl p-5 md:p-6 space-y-5 relative border transition-all duration-300 ${
                  isLightMode ? 'bg-white border-slate-200' : 'bg-slate-950/70 border-slate-700/60'
                }`}>
                  <div className={`absolute top-0 right-0 w-64 h-64 rounded-full filter blur-3xl opacity-10 pointer-events-none ${
                    result.classification === "Organic" ? "bg-emerald-500" : "bg-cyan-500"
                  }`}></div>

                  <p className={`text-sm md:text-base leading-relaxed font-sans font-semibold ${isLightMode ? 'text-slate-900 font-extrabold' : 'text-slate-100 font-medium'}`}>
                    Browse the verified molecular structure and comprehensive chemical properties. Toggle different tabs to inspect physical behaviors:
                  </p>

                  {/* Tabs Selector list */}
                  <div className={`grid grid-cols-2 gap-1 p-1 rounded-xl border transition-all duration-300 ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                    <button
                      type="button"
                      onClick={() => setStructureTab("structure")}
                      className={`py-2 px-0.5 text-[11px] font-bold font-sans rounded-lg transition-all duration-150 cursor-pointer text-center ${
                        structureTab === "structure"
                          ? isLightMode
                            ? "bg-white text-cyan-800 border border-slate-200 shadow-sm font-black"
                            : "bg-gradient-to-r from-cyan-950 to-cyan-900 text-cyan-300 border border-cyan-700/60 shadow"
                          : isLightMode
                          ? "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 border border-transparent"
                          : "text-slate-400 hover:text-slate-250 hover:bg-slate-850/40 border border-transparent"
                      }`}
                    >
                      Structure & Formula
                    </button>
                    <button
                      type="button"
                      onClick={() => setStructureTab("physical")}
                      className={`py-2 px-0.5 text-[11px] font-bold font-sans rounded-lg transition-all duration-150 cursor-pointer text-center ${
                        structureTab === "physical"
                          ? isLightMode
                            ? "bg-white text-cyan-800 border border-slate-200 shadow-sm font-black"
                            : "bg-gradient-to-r from-cyan-950 to-cyan-900 text-cyan-300 border border-cyan-700/60 shadow"
                          : isLightMode
                          ? "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 border border-transparent"
                          : "text-slate-400 hover:text-slate-250 hover:bg-slate-850/40 border border-transparent"
                      }`}
                    >
                      Physical States
                    </button>
                  </div>

                  {/* Tab Contents: Rendered with smooth animation */}
                  <div className={`p-4 rounded-2xl space-y-4 border transition-all duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'}`}>
                    {structureTab === "structure" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-cyan-300 tracking-wider font-mono justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span>Bond Structure representation</span>
                          </div>
                          
                          {/* Isomer selector: when this formula has multiple curated isomers, they are
                              shown one at a time inside the SAME structure box below (not a second,
                              separate box) -- the first button always returns to the compound actually
                              searched for. */}
                          {result.isomers && result.isomers.members.length > 0 && (
                            <div className="space-y-1.5">
                              <p className={`text-[10px] font-sans text-center ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                This formula ({result.chemical_formula}) has multiple isomers -- {result.isomers.isomerism_type}. Choose one to view its structure here:
                              </p>
                              <div className="flex flex-wrap justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setSelectedIsomerIndex(-1)}
                                  className={`px-3 py-1.5 text-xs font-bold font-sans rounded-lg transition-all duration-150 cursor-pointer ${
                                    selectedIsomerIndex === -1
                                      ? (isLightMode ? 'bg-cyan-600 text-white shadow' : 'bg-cyan-500 text-slate-950 shadow')
                                      : (isLightMode ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800')
                                  }`}
                                >
                                  {result.common_name} (searched)
                                </button>
                                {result.isomers.members.map((iso, idx) => (
                                  <button
                                    key={iso.name}
                                    type="button"
                                    onClick={() => setSelectedIsomerIndex(idx)}
                                    className={`px-3 py-1.5 text-xs font-bold font-sans rounded-lg transition-all duration-150 cursor-pointer ${
                                      selectedIsomerIndex === idx
                                        ? (isLightMode ? 'bg-cyan-600 text-white shadow' : 'bg-cyan-500 text-slate-950 shadow')
                                        : (isLightMode ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800')
                                    }`}
                                  >
                                    {iso.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 2D Molecular depiction container. PubChem structure images are always requested
                              square (600x600), so the box is kept square too -- a mismatched rectangular box
                              here is what previously made the structure look tiny with lots of empty space
                              around it (or, for "large"-sized fallbacks with a non-square natural aspect ratio,
                              cropped/clipped). A square, width-driven box scales cleanly for every chemical. */}
                          <div className={`p-4 rounded-xl flex items-center justify-center aspect-square w-full max-w-[600px] mx-auto shadow-md relative overflow-hidden transition-colors ${isLightMode ? 'bg-white border border-slate-200' : 'bg-black'}`}>
                            {selectedIsomerIndex >= 0 && result.isomers?.members[selectedIsomerIndex] ? (
                              isomerImgError ? (
                                <span className={`text-xs font-sans text-center px-4 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Structure unavailable for this isomer.</span>
                              ) : !isomerImgSrc ? (
                                <div className="flex items-center justify-center w-full h-full">
                                  <span className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></span>
                                </div>
                              ) : (
                                <AutoCropStructureImage
                                  key={isomerImgSrc}
                                  src={isomerImgSrc}
                                  alt={`${result.isomers.members[selectedIsomerIndex].name} 2D chemical structure`}
                                  isLightMode={isLightMode}
                                  onError={() => handleIsomerImgError(isomerImgSrc)}
                                />
                              )
                            ) : result.pdb_id ? (
                              <img
                                referrerPolicy="no-referrer"
                                src={`https://cdn.rcsb.org/images/structures/${result.pdb_id.toLowerCase()}_assembly-1.jpeg`}
                                alt={`RCSB PDB complex structure diagram for ID ${result.pdb_id}`}
                                className="object-contain rounded-lg transition-all duration-300"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  filter: isLightMode ? 'none' : 'invert(1) saturate(0) brightness(2.5) contrast(1.5)'
                                }}
                              />
                            ) : img2DError ? (
                              <div className="flex flex-col items-center justify-center text-center p-2 space-y-2 w-full">
                                <svg 
                                  className="animate-pulse text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" 
                                  viewBox="0 0 100 100" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    maxWidth: "100%",
                                    maxHeight: "100%"
                                  }}
                                >
                                  <circle cx="50" cy="50" r="10" strokeDasharray="3 3" className="animate-spin text-emerald-400" style={{ transformOrigin: "center", animationDuration: "12s" }} />
                                  <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" strokeWidth="1.5" className="opacity-80" />
                                  <polygon points="50,25 75,38 75,62 50,75 25,62 25,38" strokeWidth="0.75" strokeDasharray="2 2" className="opacity-40" />
                                  <line x1="50" y1="20" x2="50" y2="5" strokeWidth="2.5" className="text-pink-400" />
                                  <line x1="80" y1="35" x2="93" y2="28" strokeWidth="2.5" className="text-yellow-300" />
                                  <line x1="80" y1="65" x2="93" y2="72" strokeWidth="2.5" className="text-cyan-400" />
                                  <line x1="20" y1="35" x2="7" y2="28" strokeWidth="2.5" className="text-emerald-400" />
                                  <circle cx="50" cy="5" r="4" fill="black" stroke="currentColor" strokeWidth="1" />
                                  <text x="50" y="8" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#60A5FA" stroke="none">H</text>
                                  <circle cx="93" cy="28" r="4" fill="black" stroke="currentColor" strokeWidth="1" />
                                  <text x="93" y="31" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#EF4444" stroke="none">O</text>
                                  <circle cx="7" cy="28" r="4" fill="black" stroke="currentColor" strokeWidth="1" />
                                  <text x="7" y="31" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#34D399" stroke="none">C</text>
                                  <circle cx="50" cy="50" r="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
                                  <text x="50" y="52" textAnchor="middle" fontSize="6" fontWeight="black" fill="#38BDF8" stroke="none">
                                    {result.chemical_formula.replace(/[0-9]/g, "") ? result.chemical_formula.substring(0, 2) : "C"}
                                  </text>
                                </svg>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] font-mono font-medium text-slate-200">Skeletal Blueprint Fallback</p>
                                  <p className="text-[9px] text-slate-400 font-mono">Formulating {result.chemical_formula}</p>
                                </div>
                              </div>
                            ) : !structureImgSrc ? (
                              <div className="flex items-center justify-center w-full h-full">
                                <span className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></span>
                              </div>
                            ) : (
                              <AutoCropStructureImage
                                key={structureImgSrc}
                                src={structureImgSrc}
                                alt={`${result.common_name} 2D Chemical Structure depiction`}
                                isLightMode={isLightMode}
                                onError={() => handleStructureImgError(structureImgSrc)}
                              />
                            )}
                          </div>

                          {selectedIsomerIndex >= 0 && result.isomers?.members[selectedIsomerIndex] && (
                            <div className="text-center space-y-0.5">
                              <p className={`text-sm font-black font-sans ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{result.isomers.members[selectedIsomerIndex].name}</p>
                              <p className={`text-xs font-mono ${isLightMode ? 'text-cyan-700' : 'text-cyan-300'}`}>{result.isomers.members[selectedIsomerIndex].iupac_name}</p>
                              <p className={`text-xs font-sans italic ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>{result.isomers.members[selectedIsomerIndex].note}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {structureTab === "physical" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-wider font-mono ${isLightMode ? 'text-cyan-700' : 'text-cyan-300'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                          <span>Physical States & Experimental Properties</span>
                        </div>
 
                        <div className={`rounded-2xl overflow-hidden p-5 space-y-4 shadow-xl border transition-all duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-850'}`}>
                          <div className={`grid grid-cols-2 gap-4 border-b pb-4 ${isLightMode ? 'border-slate-200' : 'border-slate-850'}`}>
                            <div className="space-y-1">
                              <span className={`text-[10px] font-mono uppercase ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Observed Physical Color</span>
                              <p className={`text-sm font-bold ${isLightMode ? 'text-teal-700' : 'text-teal-300'}`}>{result.color || "Colorless / White"}</p>
                            </div>
                            <div className="space-y-1">
                              <span className={`text-[10px] font-mono uppercase ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Relative Molecular Mass</span>
                              <p className={`text-sm font-mono font-bold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{result.molecular_weight || "N/A"}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 pt-1">
                            <span className={`text-[10px] font-mono uppercase font-black tracking-wider block ${isLightMode ? 'text-cyan-850' : 'text-cyan-300'}`}>Observed Chemical Behavior & Properties</span>
                            <ul className={`list-disc pl-5 space-y-2 text-sm md:text-base leading-relaxed font-sans font-semibold ${isLightMode ? 'text-slate-950' : 'text-slate-100'}`}>
                              {parseToPoints(result.properties || "Solubility, state, specific coloration, and structural features unique to this formula.").map((point, idx) => (
                                <li key={idx} className={`marker:text-cyan-550 ${isLightMode ? 'font-bold' : ''}`}>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </div>
                </div>
              )}

            </div>

            {/* Right Block: Properties and Uses – separate boxes */}
            <div className="lg:col-span-5 space-y-4">
              {/* Chemical & Physical Properties Box */}
              <div className={`p-5 md:p-6 rounded-2xl shadow-lg space-y-3.5 relative overflow-hidden border transition-all duration-300 ${isLightMode ? 'bg-white border-slate-200 shadow-slate-100' : 'bg-slate-950/85 border-teal-500/20'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full filter blur-xl"></div>
                <div className={`flex items-center gap-2.5 border-b pb-2.5 ${isLightMode ? 'border-slate-200' : 'border-teal-950/50'}`}>
                  <div className={`p-1.5 rounded-lg border ${isLightMode ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-teal-950/80 border-teal-800/60 text-teal-300'}`}>
                    <Beaker className="w-4 h-4" />
                  </div>
                  <h3 className={`text-xs md:text-sm font-bold font-sans uppercase tracking-widest ${isLightMode ? 'text-teal-900' : 'text-teal-200'}`}>
                    Chemical & Physical Properties
                  </h3>
                </div>
                <ul className={`list-disc pl-5 space-y-2 text-sm md:text-base leading-relaxed font-sans font-semibold ${isLightMode ? 'text-slate-950' : 'text-slate-100'}`}>
                  {parseToPoints(result.properties || "Solubility, state, specific coloration, and structural features unique to this formula.").map((point, idx) => (
                    <li key={idx} className={`marker:text-teal-550 ${isLightMode ? 'font-bold' : ''}`}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
 
              {/* Practical Applications & Uses Box */}
              <div className={`p-5 md:p-6 rounded-2xl shadow-lg space-y-3.5 relative overflow-hidden border transition-all duration-300 ${isLightMode ? 'bg-white border-slate-200 shadow-slate-100' : 'bg-slate-950/85 border-cyan-500/20'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-xl"></div>
                <div className={`flex items-center gap-2.5 border-b pb-2.5 ${isLightMode ? 'border-slate-200' : 'border-cyan-950/50'}`}>
                  <div className={`p-1.5 rounded-lg border ${isLightMode ? 'bg-cyan-50 border-cyan-200 text-cyan-800' : 'bg-cyan-950/80 border-cyan-800/60 text-cyan-300'}`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className={`text-xs md:text-sm font-bold font-sans uppercase tracking-widest ${isLightMode ? 'text-cyan-900' : 'text-cyan-200'}`}>
                    Practical Applications & Uses
                  </h3>
                </div>
                <ul className={`list-disc pl-5 space-y-2 text-sm md:text-base leading-relaxed font-sans font-semibold ${isLightMode ? 'text-slate-950' : 'text-slate-100'}`}>
                  {parseToPoints(result.uses || "Direct domestic, industrial, educational, or experimental uses associated with this substance.").map((point, idx) => (
                    <li key={idx} className={`marker:text-cyan-550 ${isLightMode ? 'font-bold' : ''}`}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
