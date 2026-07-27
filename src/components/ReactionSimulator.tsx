import React, { useState, useEffect } from "react";
import { 
  Flame, 
  Thermometer, 
  Gauge, 
  Droplet, 
  RotateCcw, 
  Play, 
  AlertTriangle, 
  Sparkles, 
  Info, 
  HelpCircle, 
  ArrowRight, 
  Plus, 
  Beaker, 
  Clock, 
  CheckCircle2, 
  XCircle,
  HelpCircle as QuestionIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FRONTEND_ELEMENTS } from "./KnowYourChemicals";

interface ReactantItem {
  formula: string;
  name: string;
  type: "metal" | "salt" | "acid" | "base" | "organic" | "gas" | "solvent";
  colorText: string;
}

// Quick-access chips default to the plain ANHYDROUS form of each salt, since that is the form
// used when writing and balancing reaction equations in school chemistry. The crystalline/hydrate
// form of every salt below is still available as its own distinct, separately-named entry in
// SUPPORTED_REACTANTS_BASE (e.g. "Copper Sulfate Pentahydrate (CuSO4.5H2O)") for anyone who
// specifically wants to study the hydrated/crystal form.
const QUICK_SHELF: ReactantItem[] = [
  { formula: "Fe", name: "Iron Metal", type: "metal", colorText: "text-slate-300" },
  { formula: "CuSO4", name: "Copper Sulfate", type: "salt", colorText: "text-blue-400" },
  { formula: "Na", name: "Sodium Metal", type: "metal", colorText: "text-amber-200" },
  { formula: "H2O", name: "Water", type: "solvent", colorText: "text-cyan-400" },
  { formula: "HCl", name: "Hydrochloric Acid", type: "acid", colorText: "text-red-400" },
  { formula: "NaOH", name: "Sodium Hydroxide", type: "base", colorText: "text-emerald-400" },
  { formula: "Propene", name: "Propene (C₃H₆)", type: "organic", colorText: "text-indigo-400" },
  { formula: "HBr", name: "Hydrogen Bromide", type: "acid", colorText: "text-purple-400" },
  { formula: "Cu", name: "Copper Metal", type: "metal", colorText: "text-orange-400" },
  { formula: "ZnSO4", name: "Zinc Sulfate", type: "salt", colorText: "text-purple-300" },
  { formula: "BaCl2", name: "Barium Chloride", type: "salt", colorText: "text-stone-350" },
  { formula: "Na2SO4", name: "Sodium Sulfate", type: "salt", colorText: "text-sky-300" }
];

interface CategoryItem {
  formula: string;
  name: string;
  type: string;
}

interface ChemicalCategory {
  category: string;
  items: CategoryItem[];
}

const CHEMICAL_CATEGORIES: ChemicalCategory[] = [
  {
    category: "Carboxylic Acids",
    items: [
      { formula: "CH3COOH", name: "Ethanoic / Acetic Acid", type: "acid" },
      { formula: "HCOOH", name: "Formic / Methanoic Acid", type: "acid" },
      { formula: "C6H5COOH", name: "Benzoic Acid", type: "acid" },
      { formula: "C6H8O7", name: "Citric Acid", type: "acid" },
      { formula: "C4H6O6", name: "Tartaric Acid", type: "acid" },
      { formula: "C18H36O2", name: "Stearic Acid", type: "acid" },
      { formula: "C18H34O2", name: "Oleic Acid (Soap fat)", type: "acid" },
      { formula: "C16H32O2", name: "Palmitic Acid (Soap fat)", type: "acid" },
      { formula: "H2C2O4", name: "Oxalic Acid", type: "acid" }
    ]
  },
  {
    category: "Aldehydes",
    items: [
      { formula: "HCHO", name: "Formaldehyde / Methanal", type: "organic" },
      { formula: "CH3CHO", name: "Acetaldehyde / Ethanal", type: "organic" },
      { formula: "C6H5CHO", name: "Benzaldehyde", type: "organic" }
    ]
  },
  {
    category: "Ketones",
    items: [
      { formula: "CH3COCH3", name: "Acetone / Propanone", type: "organic" },
      { formula: "C6H10O", name: "Cyclohexanone", type: "organic" }
    ]
  },
  {
    category: "Haloalkanes",
    items: [
      { formula: "CHCl3", name: "Chloroform / Trichloromethane", type: "organic" },
      { formula: "CH2Cl2", name: "Dichloromethane", type: "organic" },
      { formula: "CH3Cl", name: "Chloromethane", type: "organic" },
      { formula: "C2H5Br", name: "Bromoethane", type: "organic" },
      { formula: "CH3Br", name: "Bromomethane", type: "organic" },
      { formula: "CH2Br2", name: "Dibromomethane", type: "organic" },
      { formula: "C2H4Br2", name: "1,2-Dibromoethane", type: "organic" },
      { formula: "CCl4", name: "Carbon Tetrachloride", type: "organic" }
    ]
  },
  {
    category: "Alkenes & Alkynes",
    items: [
      { formula: "C2H4", name: "Ethene Gas", type: "organic" },
      { formula: "C3H6", name: "Propene Gas", type: "organic" },
      { formula: "C5H10", name: "Pentene", type: "organic" },
      { formula: "C2H2", name: "Acetylene / Ethyne", type: "organic" },
      { formula: "C3H4", name: "Propyne", type: "organic" }
    ]
  },
  {
    category: "Inorganics & Salts",
    items: [
      { formula: "H2O", name: "Water", type: "solvent" },
      { formula: "HCl", name: "Hydrochloric Acid", type: "acid" },
      { formula: "H2SO4", name: "Sulfuric Acid", type: "acid" },
      { formula: "H2CO3", name: "Carbonic Acid", type: "acid" },
      { formula: "NaOH", name: "Sodium Hydroxide", type: "base" },
      { formula: "NaHCO3", name: "Sodium Bicarbonate", type: "salt" },
      { formula: "KMnO4", name: "Potassium Permanganate", type: "salt" },
      { formula: "AgNo3", name: "Silver Nitrate", type: "salt" },
      { formula: "I2", name: "Iodine Solution", type: "salt" },
      { formula: "C18H35NaO2", name: "Sodium Stearate (Soap)", type: "salt" },
      { formula: "C3H8O3", name: "Glycerol / Glycerine", type: "organic" },
      { formula: "Br2", name: "Bromine Water", type: "salt" }
    ]
  },
  {
    category: "Carbohydrates (Carbon-based)",
    items: [
      { formula: "C6H12O6", name: "Glucose", type: "organic" },
      { formula: "C6H12O6", name: "Fructose", type: "organic" },
      { formula: "C12H22O11", name: "Maltose", type: "organic" }
    ]
  }
];

export interface SupportedReactant {
  formula: string;
  name: string;
}

const SUPPORTED_REACTANTS_BASE: SupportedReactant[] = [
  { formula: "Fe", name: "Iron Metal (Fe)" },
  { formula: "CuSO4", name: "Copper Sulfate (CuSO₄)" },
  { formula: "CuSO4·5H2O", name: "Copper Sulfate Pentahydrate / Crystals (CuSO₄·5H₂O)" },
  { formula: "Na", name: "Sodium Metal (Na)" },
  { formula: "H2O", name: "Water (H₂O)" },
  { formula: "HCl", name: "Hydrochloric Acid (HCl)" },
  { formula: "NaOH", name: "Sodium Hydroxide (NaOH)" },
  { formula: "Propene", name: "Propene (C₃H₆)" },
  { formula: "HBr", name: "Hydrogen Bromide (HBr)" },
  { formula: "Cu", name: "Copper Metal (Cu)" },
  { formula: "ZnSO4", name: "Zinc Sulfate (ZnSO₄)" },
  { formula: "ZnSO4·7H2O", name: "Zinc Sulfate Heptahydrate / Crystals (ZnSO₄·7H₂O)" },
  { formula: "BaCl2", name: "Barium Chloride (BaCl₂)" },
  { formula: "BaCl2·2H2O", name: "Barium Chloride Dihydrate / Crystals (BaCl₂·2H₂O)" },
  { formula: "Na2SO4", name: "Sodium Sulfate (Na₂SO₄)" },
  { formula: "CH3COOH", name: "Ethanoic Acid / Acetic Acid" },
  { formula: "C2H5OH", name: "Ethanol" },
  { formula: "H2SO4", name: "Sulfuric Acid (H₂SO₄)" },
  { formula: "KMnO4", name: "Potassium Permanganate (KMnO₄)" },
  { formula: "Oil", name: "Vegetable Oil" },
  { formula: "Fat", name: "Animal Fat" },
  { formula: "NaCl", name: "Sodium Chloride (NaCl)" },
  { formula: "CaCO3", name: "Calcium Carbonate (CaCO₃)" },
  { formula: "O2", name: "Oxygen Gas (O₂)" },
  { formula: "CO2", name: "Carbon Dioxide Gas (CO₂)" },
  { formula: "ZnCO3", name: "Zinc Carbonate (ZnCO₃)" },
  { formula: "Zn", name: "Zinc Metal (Zn)" },
  { formula: "Mg", name: "Magnesium Metal (Mg)" },
  { formula: "MgO", name: "Magnesium Oxide (MgO)" },
  { formula: "MgCO3", name: "Magnesium Carbonate (MgCO₃)" },
  { formula: "MgSO4", name: "Magnesium Sulfate (MgSO₄)" },
  { formula: "MgSO4·7H2O", name: "Magnesium Sulfate Heptahydrate / Epsom Salt (MgSO₄·7H₂O)" },
  { formula: "CaO", name: "Calcium Oxide / Quicklime" },
  { formula: "Ca(OH)2", name: "Calcium Hydroxide / Slaked Lime" },
  { formula: "NH4Cl", name: "Ammonium Chloride (NH₄Cl)" },
  { formula: "HNO3", name: "Nitric Acid (HNO₃)" },
  { formula: "KI", name: "Potassium Iodide (KI)" },
  { formula: "Pb(NO3)2", name: "Lead Nitrate (Pb(NO₃)₂)" },
  { formula: "PbI2", name: "Lead Iodide (PbI₂)" },
  { formula: "AgNo3", name: "Silver Nitrate (AgNO₃)" },
  { formula: "AgCl", name: "Silver Chloride (AgCl)" },
  { formula: "Cl2", name: "Chlorine Gas (Cl₂)" },
  { formula: "H2", name: "Hydrogen Gas (H₂)" },
  { formula: "NaHCO3", name: "Sodium Bicarbonate / Baking Soda" },
  { formula: "Na2CO3", name: "Sodium Carbonate (Na₂CO₃)" },
  { formula: "Na2CO3·10H2O", name: "Sodium Carbonate Decahydrate / Washing Soda (Na₂CO₃·10H₂O)" },
  { formula: "C", name: "Carbon / Charcoal (C)" },
  { formula: "FeSO4", name: "Iron(II) Sulfate (FeSO₄)" },
  { formula: "FeSO4·7H2O", name: "Iron Sulfate Heptahydrate / Green Vitriol (FeSO₄·7H₂O)" },
  { formula: "FeCl3", name: "Iron(III) Chloride (FeCl₃)" },
  { formula: "FeCl3·6H2O", name: "Iron(III) Chloride Hexahydrate / Crystals (FeCl₃·6H₂O)" },
  { formula: "CuCl2", name: "Copper(II) Chloride (CuCl₂)" },
  { formula: "CuCl2·2H2O", name: "Copper(II) Chloride Dihydrate / Crystals (CuCl₂·2H₂O)" },
  { formula: "CuO", name: "Copper(II) Oxide (CuO)" },
  { formula: "ZnO", name: "Zinc Oxide (ZnO)" },
  { formula: "MnO2", name: "Manganese Dioxide (MnO₂)" },
  { formula: "H2O2", name: "Hydrogen Peroxide (H₂O₂)" },
  { formula: "CO", name: "Carbon Monoxide Gas (CO)" },
  { formula: "NH3", name: "Ammonia Gas (NH₃)" },
  { formula: "C6H14", name: "Hexane (C₆H₁₄)" },
  { formula: "H2C2O4", name: "Oxalic Acid (H₂C₂O₄)" },
  { formula: "C18H36O2", name: "Stearic Acid (C₁₈H₃₆O₂)" },
  { formula: "C10H22", name: "Decane (C₁₀H₂₂)" },
  { formula: "C5H10", name: "Pentene (C₅H₁₀)" },
  { formula: "C6H8O7", name: "Citric Acid (C₆H₈O₇)" },
  { formula: "C4H6O6", name: "Tartaric Acid (C₄H₆O₆)" },
  { formula: "HCHO", name: "Formaldehyde / Methanal (HCHO)" },
  { formula: "CH3CHO", name: "Acetaldehyde / Ethanal (CH₃CHO)" },
  { formula: "C6H5CHO", name: "Benzaldehyde (C₆H₅CHO)" },
  { formula: "CH3COCH3", name: "Acetone / Propanone (CH₃COCH₃)" },
  { formula: "C6H10O", name: "Cyclohexanone (C₆H₁₀O)" },
  { formula: "CHCl3", name: "Chloroform / Trichloromethane (CHCl₃)" },
  { formula: "CH2Cl2", name: "Dichloromethane (CH₂Cl₂)" },
  { formula: "CH3Cl", name: "Chloromethane (CH₃Cl)" },
  { formula: "C2H5Br", name: "Bromoethane (C₂H₅Br)" },
  { formula: "CH3Br", name: "Bromomethane (CH₃Br)" },
  { formula: "CH2Br2", name: "Dibromomethane (CH₂Br₂)" },
  { formula: "C2H4Br2", name: "1,2-Dibromoethane (C₂H₄Br₂)" },
  { formula: "CCl4", name: "Carbon Tetrachloride (CCl₄)" },
  { formula: "C2H4", name: "Ethene Gas (C₂H₄)" },
  { formula: "C3H6", name: "Propene Gas (C₃H₆)" },
  { formula: "C2H2", name: "Acetylene / Ethyne Gas (C₂H₂)" },
  { formula: "C3H4", name: "Propyne Gas (C₃H₄)" },
  { formula: "HCOOH", name: "Formic Acid / Methanoic Acid (HCOOH)" },
  { formula: "C6H5COOH", name: "Benzoic Acid (C₆H₅COOH)" },
  { formula: "C18H35NaO2", name: "Sodium Stearate / Soap (C₁₈H₃₅NaO₂)" },
  { formula: "C18H34O2", name: "Oleic Acid (C₁₈H₃₄O₂)" },
  { formula: "C16H32O2", name: "Palmitic Acid (C₁₆H₃₂O₂)" },
  { formula: "C3H8O3", name: "Glycerol / Glycerine (C₃H₈O₃)" },
  { formula: "Br2", name: "Bromine Water (Br₂)" },
  { formula: "H2CO3", name: "Carbonic Acid (H₂CO₃)" },
  { formula: "C6H12O6", name: "Glucose (C₆H₁₂O₆)" },
  { formula: "C6H12O6", name: "Fructose (C₆H₁₂O₆)" },
  { formula: "C12H22O11", name: "Maltose (C₁₂H₂₂O₁₁)" }
];

export const SUPPORTED_REACTANTS: SupportedReactant[] = [
  ...SUPPORTED_REACTANTS_BASE,
  ...FRONTEND_ELEMENTS.filter(fe => !SUPPORTED_REACTANTS_BASE.some(sr => sr.formula.toLowerCase() === fe.formula.toLowerCase()))
    .map(fe => ({ formula: fe.formula, name: `${fe.name} Element (${fe.formula})` }))
];

export interface ElementGroupInfo {
  name: string;
  bg: string;
  text: string;
  border: string;
  badgeBg: string;
}

export function getElementGroup(atomicNumber: number, symbol: string, isLightMode: boolean = false): ElementGroupInfo {
  const nobleGases = ["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"];
  if (nobleGases.includes(symbol)) {
    return isLightMode ? {
      name: "Noble Gas",
      bg: "bg-purple-100 hover:bg-purple-200 hover:border-purple-400",
      text: "text-purple-700",
      border: "border-purple-300",
      badgeBg: "bg-purple-100 text-purple-700 border-purple-300"
    } : {
      name: "Noble Gas",
      bg: "bg-purple-950/30 hover:bg-purple-900/40 hover:border-purple-500/50",
      text: "text-purple-300",
      border: "border-purple-800/40",
      badgeBg: "bg-purple-900/50 text-purple-200 border-purple-800"
    };
  }
  const halogens = ["F", "Cl", "Br", "I", "At", "Ts"];
  if (halogens.includes(symbol)) {
    return isLightMode ? {
      name: "Halogen",
      bg: "bg-blue-100 hover:bg-blue-200 hover:border-blue-400",
      text: "text-blue-700",
      border: "border-blue-300",
      badgeBg: "bg-blue-100 text-blue-700 border-blue-300"
    } : {
      name: "Halogen",
      bg: "bg-blue-950/30 hover:bg-blue-900/40 hover:border-blue-500/50",
      text: "text-blue-300",
      border: "border-blue-800/40",
      badgeBg: "bg-blue-900/50 text-blue-200 border-blue-800"
    };
  }
  const nonmetals = ["H", "C", "N", "O", "P", "S", "Se"];
  if (nonmetals.includes(symbol)) {
    return isLightMode ? {
      name: "Non-metal",
      bg: "bg-emerald-100 hover:bg-emerald-200 hover:border-emerald-400",
      text: "text-emerald-700",
      border: "border-emerald-300",
      badgeBg: "bg-emerald-100 text-emerald-700 border-emerald-300"
    } : {
      name: "Non-metal",
      bg: "bg-emerald-950/30 hover:bg-emerald-900/40 hover:border-emerald-500/50",
      text: "text-emerald-300",
      border: "border-emerald-800/40",
      badgeBg: "bg-emerald-900/50 text-emerald-200 border-emerald-800"
    };
  }
  const metalloids = ["B", "Si", "Ge", "As", "Sb", "Te", "Po"];
  if (metalloids.includes(symbol)) {
    return isLightMode ? {
      name: "Metalloid",
      bg: "bg-amber-100 hover:bg-amber-200 hover:border-amber-400",
      text: "text-amber-700",
      border: "border-amber-300",
      badgeBg: "bg-amber-100 text-amber-700 border-amber-300"
    } : {
      name: "Metalloid",
      bg: "bg-amber-950/30 hover:bg-amber-900/40 hover:border-amber-500/50",
      text: "text-amber-300",
      border: "border-amber-800/40",
      badgeBg: "bg-amber-900/50 text-amber-200 border-amber-800"
    };
  }
  const alkali = ["Li", "Na", "K", "Rb", "Cs", "Fr"];
  if (alkali.includes(symbol)) {
    return isLightMode ? {
      name: "Alkali Metal",
      bg: "bg-red-100 hover:bg-red-200 hover:border-red-400",
      text: "text-red-700",
      border: "border-red-300",
      badgeBg: "bg-red-100 text-red-700 border-red-300"
    } : {
      name: "Alkali Metal",
      bg: "bg-red-950/30 hover:bg-red-900/40 hover:border-red-500/50",
      text: "text-red-300",
      border: "border-red-800/40",
      badgeBg: "bg-red-900/50 text-red-200 border-red-800"
    };
  }
  const alkalineEarth = ["Be", "Mg", "Ca", "Sr", "Ba", "Ra"];
  if (alkalineEarth.includes(symbol)) {
    return isLightMode ? {
      name: "Alkaline Earth",
      bg: "bg-orange-100 hover:bg-orange-200 hover:border-orange-400",
      text: "text-orange-700",
      border: "border-orange-300",
      badgeBg: "bg-orange-100 text-orange-700 border-orange-300"
    } : {
      name: "Alkaline Earth",
      bg: "bg-orange-950/30 hover:bg-orange-900/40 hover:border-orange-500/50",
      text: "text-orange-300",
      border: "border-orange-800/40",
      badgeBg: "bg-orange-900/50 text-orange-200 border-orange-800"
    };
  }
  if (atomicNumber >= 57 && atomicNumber <= 71) {
    return isLightMode ? {
      name: "Lanthanide",
      bg: "bg-pink-100 hover:bg-pink-200 hover:border-pink-400",
      text: "text-pink-700",
      border: "border-pink-300",
      badgeBg: "bg-pink-100 text-pink-700 border-pink-300"
    } : {
      name: "Lanthanide",
      bg: "bg-pink-950/30 hover:bg-pink-900/40 hover:border-pink-500/50",
      text: "text-pink-300",
      border: "border-pink-800/40",
      badgeBg: "bg-pink-900/50 text-pink-200 border-pink-800"
    };
  }
  if (atomicNumber >= 89 && atomicNumber <= 103) {
    return isLightMode ? {
      name: "Actinide",
      bg: "bg-rose-100 hover:bg-rose-200 hover:border-rose-400",
      text: "text-rose-700",
      border: "border-rose-300",
      badgeBg: "bg-rose-100 text-rose-700 border-rose-300"
    } : {
      name: "Actinide",
      bg: "bg-rose-950/30 hover:bg-rose-900/40 hover:border-rose-500/50",
      text: "text-rose-300",
      border: "border-rose-800/40",
      badgeBg: "bg-rose-900/50 text-rose-200 border-rose-800"
    };
  }
  return isLightMode ? {
    name: "Transition Metal",
    bg: "bg-cyan-100 hover:bg-cyan-200 hover:border-cyan-400",
    text: "text-cyan-700",
    border: "border-cyan-300",
    badgeBg: "bg-cyan-100 text-cyan-700 border-cyan-300"
  } : {
    name: "Transition Metal",
    bg: "bg-cyan-950/30 hover:bg-cyan-900/40 hover:border-cyan-500/50",
    text: "text-cyan-300",
    border: "border-cyan-800/40",
    badgeBg: "bg-cyan-900/50 text-cyan-200 border-cyan-800"
  };
}

export function isAcidReactant(formula: string): boolean {
  if (!formula) return false;
  const f = formula.trim().toUpperCase();
  const acids = ["HCL", "H2SO4", "CH3COOH", "HBR", "HNO3", "ACID", "ETHANOIC", "H2C2O4", "C18H36O2", "C6H8O7", "C4H6O6", "HCOOH", "FORMIC", "C6H5COOH", "BENZOIC", "C18H34O2", "OLEIC", "C16H32O2", "PALMITIC", "STEARIC"];
  return acids.some(a => f.includes(a));
}

export function isChemicalFormula(str: string): boolean {
  const trimmed = str.trim();
  if (!trimmed) return false;
  
  if (trimmed.length === 1) {
    return /^[CHONSPKIFWUV]$/i.test(trimmed);
  }
  
  const clean = trimmed.replace(/[\d\(\)\[\]·\.\*\s+\-]/g, "");
  if (clean.length === 0) return false;
  
  const elements = new Set([
    "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", 
    "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", 
    "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", 
    "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", 
    "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", 
    "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", 
    "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", 
    "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", 
    "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", 
    "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", 
    "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", 
    "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
  ]);
  
  let i = 0;
  let allValid = true;
  while (i < clean.length) {
    if (clean[i] >= "A" && clean[i] <= "Z") {
      let element = clean[i];
      if (i + 1 < clean.length && clean[i + 1] >= "a" && clean[i + 1] <= "z") {
        element += clean[i + 1];
        i += 2;
      } else {
        i += 1;
      }
      if (!elements.has(element)) {
        allValid = false;
        break;
      }
    } else {
      allValid = false;
      break;
    }
  }
  return allValid;
}

export function isChemicalName(str: string): boolean {
  const trimmed = str.trim().toLowerCase();
  if (!trimmed) return false;
  
  const fakeWords = ["potion", "magic", "fake", "garbage", "trash", "elixir", "love", "spell", "poison", "juice", "liquid", "stuff", "thing", "unreal"];
  if (fakeWords.some(w => trimmed.includes(w))) return false;

  const exactNames = new Set([
     "ammonia", "ammonia gas", "water", "methane", "ethane", "propane", "butane", 
     "ethene", "propene", "acetylene", "ozone", "glucose", "fructose", "sucrose", "urea", "carbon monoxide",
     "carbon dioxide", "rust", "lime", "quicklime", "slaked lime", "limestone", "washing soda", "baking soda",
     "dry ice", "milk of magnesia", "gypsum", "plaster of paris", "alumni", "hexane", "oxalic acid", "stearic acid",
     "decane", "pentene", "citric acid", "tartaric acid", "formaldehyde", "methanal", "acetaldehyde", "ethanal",
     "benzaldehyde", "acetone", "propanone", "cyclohexanone", "chloroform", "trichloromethane", "dichloromethane",
     "chloromethane", "bromoethane", "ethene gas", "propene gas", "acetylene gas", "ethyne", "propyne", "formic acid",
     "methanoic acid", "benzoic acid", "bromomethane", "dibromomethane", "1,2-dibromoethane", "dibromoethane", 
     "carbon tetrachloride", "tetrachloromethane", "sodium stearate", "soap", "oleic acid", "palmitic acid",
     "glycerol", "glycerine", "bromine", "bromine water"
  ]);
  if (exactNames.has(trimmed)) return true;

  const words = trimmed.replace(/[^a-z0-9]/g, " ").split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return false;

  const chemicalWords = new Set([
     "acid", "hydrochloric", "sulfuric", "nitric", "acetic", "ethanoic", "hydrobromic", "formic", "phosphoric", "carbonic",
     "sodium", "potassium", "ammonium", "calcium", "magnesium", "aluminum", "iron", "copper", "zinc", "barium", "manganese", 
     "silver", "lead", "gold", "platinum", "helium", "neon", "argon", "methane", "ethane", "propane", "butane", "propene", 
     "ethene", "acetylene", "ammonia", "water", "carbon", "monoxide", "dioxide", "trioxide", "oxide", "nitrogen", "oxygen", 
     "fluorine", "chlorine", "bromine", "iodine", "sulfur", "phosphorus", "hydrogen", "sulfate", "chloride", "hydroxide", 
     "nitrate", "carbonate", "bromide", "iodide", "phosphate", "bicarbonate", "acetate", "ethanoate", "sulfide", "sulfite", 
     "nitride", "nitrite", "hydride", "dihydrate", "pentahydrate", "heptahydrate", "hexahydrate", "decahydrate", "gas", 
     "metal", "anhydrous", "permanganate", "dichromate", "chromate", "thiosulfate", "bisulfate", "bisulfite", "fluoride",
     "hydroxide", "oxide", "nitride", "carbide", "peroxide", "superoxide", "solution", "hexane", "oxalic", "stearic",
     "decane", "pentene", "citric", "tartaric", "formaldehyde", "methanal", "acetaldehyde", "ethanal", "benzaldehyde",
     "acetone", "propanone", "cyclohexanone", "chloroform", "trichloromethane", "dichloromethane", "chloromethane",
     "bromoethane", "ethene", "propene", "ethyne", "propyne", "formic", "methanoic", "benzoic", "bromomethane", 
     "dibromomethane", "dibromoethane", "tetrachloride", "tetrachloromethane", "stearate", "oleic", "palmitic",
     "glycerol", "glycerine", "soap", "bromine"
  ]);

  let matchCount = 0;
  for (const word of words) {
    if (/^\d+$/.test(word) || /^[ivx]+$/i.test(word) || word === "of" || word === "and") {
      matchCount++;
      continue;
    }
    if (chemicalWords.has(word)) {
      matchCount++;
    }
  }

  return matchCount === words.length && words.some(w => chemicalWords.has(w) || w === "water");
}

export function isTrueChemical(str: string): boolean {
  if (!str) return false;
  return isChemicalFormula(str) || isChemicalName(str);
}

export function getDefaultQuantity(formula: string): { value: number; unit: "g" | "mL" } {
  if (!formula) return { value: 25.0, unit: "mL" };
  const f = formula.trim().toUpperCase();
  const solids = [
    "FE", "NA", "CU", "CUSO4", "ZNSO4", "BACL2", "NA2SO4", "NACL", "OIL", "FAT", 
    "CACO3", "ZNCO3", "ZN", "MG", "MGO", "MGCO3", "MGSO4", "CAO", "CA(OH)2", 
    "NH4CL", "KI", "PB(NO3)2", "PBI2", "AGNO3", "AGCL", "NAHCO3", "NA2CO3", 
    "C", "FESO4", "FECL3", "CUCL2", "CUO", "ZNO", "MNO2"
  ];
  const isSolid = solids.some(s => f.includes(s));
  if (isSolid) {
    return { value: 10.0, unit: "g" };
  }
  return { value: 25.0, unit: "mL" };
}

interface SimulationResult {
  reactionFeasible: boolean;
  reactantsData: Array<{
    formula: string;
    name: string;
    iupacName?: string;
    pubchemId?: string;
    molecularWeight?: number;
  }>;
  productsData?: Array<{
    formula: string;
    name: string;
    pubchemId?: string;
    state?: string;
  }>;
  deltaH_rxn: number;
  deltaS_rxn: number;
  calculatedDeltaG: number;
  isSpontaneous: boolean;
  balancedEquation: string;
  reactionClass: string;
  thermoType: string;
  majorProduct?: string;
  minorProduct?: string;
  majorYield?: number;
  minorYield?: number;
  visuals: {
    solutionColorStart: string;
    solutionColorEnd: string;
    hasBubbles: boolean;
    gasName?: string;
    precipitateColor: string;
    animationDescription: string;
  };
  dangerLevel: string;
  conceptualExplanationFoundational: string;
  conceptualExplanationAdvanced: string;
  arrowPushingDetails?: string;
  advice?: string[];
}

export function formatFormulaString(rawStr: string, isLightMode: boolean = false): React.ReactNode {
  const coeffMatch = rawStr.match(/^(\d+)(.*)/);
  let coefficient = "";
  let restStr = rawStr;
  if (coeffMatch && coeffMatch[2].length > 0) {
    coefficient = coeffMatch[1];
    restStr = coeffMatch[2];
  }

  const components: React.ReactNode[] = [];
  let curIdx = 0;

  while (curIdx < restStr.length) {
    const chargeMatch = restStr.substring(curIdx).match(/^(2\+|2\-|3\+|3\-|\+|\-)/);
    if (chargeMatch) {
      components.push(
        <sup key={curIdx} className={`relative -top-[0.35em] text-[0.75em] font-bold leading-none select-none ${isLightMode ? 'text-teal-700' : 'text-teal-400'}`}>
          {chargeMatch[1]}
        </sup>
      );
      curIdx += chargeMatch[1].length;
      continue;
    }

    const numMatch = restStr.substring(curIdx).match(/^(\d+)/);
    if (numMatch) {
      components.push(
        <sub key={curIdx} className={`relative -bottom-[0.25em] text-[0.75em] font-extrabold leading-none select-none ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>
          {numMatch[1]}
        </sub>
      );
      curIdx += numMatch[1].length;
      continue;
    }

    components.push(
      <span key={curIdx} className="font-semibold select-all">
        {restStr[curIdx]}
      </span>
    );
    curIdx++;
  }

  if (coefficient) {
    return (
      <span className="inline-flex items-center">
        <span className={`font-bold mr-0.5 select-none ${isLightMode ? 'text-amber-700' : 'text-amber-400'}`}>{coefficient}</span>
        {components}
      </span>
    );
  }
  return <>{components}</>;
}

export function renderFormattedFormula(text: string, isLightMode: boolean = false): React.ReactNode {
  if (!text) return "";

  // Normalize Subscripts / Superscripts of unicode to normal characters for uniform handling
  const unicodeSubMap: Record<string, string> = {
    "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9"
  };
  
  let normalized = text;
  Object.keys(unicodeSubMap).forEach(unicode => {
    normalized = normalized.split(unicode).join(unicodeSubMap[unicode]);
  });
  
  const tokens = normalized.split(/(\s+|\+|\u2192|->|\(|\))/g);
  
  return (
    <span className="inline-flex flex-wrap items-center gap-x-0.5 leading-none">
      {tokens.map((token, index) => {
        if (!token) return null;
        if (token === "→" || token === "->") {
          return <span key={index} className={`mx-1.5 font-bold font-mono ${isLightMode ? 'text-cyan-700' : 'text-cyan-450'}`}>→</span>;
        }
        if (token === "+") {
          return <span key={index} className={`mx-1.5 font-bold font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>+</span>;
        }
        if (token === "(" || token === ")") {
          return <span key={index} className={`font-normal ${isLightMode ? 'text-slate-600' : 'text-slate-500'}`}>{token}</span>;
        }
        if (/^\s+$/.test(token)) {
          return <span key={index} className="w-1"></span>;
        }

        // Handle physical state markers e.g., (s), (aq), (l), (g)
        if (/^(aq|s|l|g)$/i.test(token)) {
          return <span key={index} className={`text-[10.5px] italic font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-450'}`}>({token.toLowerCase()})</span>;
        }

        // Handle crystallization water format dot (· or .)
        if (token.includes("·") || token.includes(".")) {
          const dotIndex = token.indexOf("·") !== -1 ? token.indexOf("·") : token.indexOf(".");
          const part1Str = token.substring(0, dotIndex);
          const part2Str = token.substring(dotIndex + 1);
          
          if (part1Str && part2Str) {
            return (
              <span key={index} className="inline-flex items-center">
                <span>{formatFormulaString(part1Str, isLightMode)}</span>
                <span className={`font-extrabold mx-0.5 font-sans ${isLightMode ? 'text-teal-700' : 'text-teal-450'}`}>•</span>
                <span>{formatFormulaString(part2Str, isLightMode)}</span>
              </span>
            );
          }
        }

        return <React.Fragment key={index}>{formatFormulaString(token, isLightMode)}</React.Fragment>;
      })}
    </span>
  );
}

export function renderDescriptionWithSubscripts(text: string, isLightMode: boolean = false): React.ReactNode {
  if (!text) return "";
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((part, index) => {
        if (/^\s+$/.test(part)) return part;

        const match = part.match(/^([^\w\(]*)([\w\(\)\[\]·\.\*\-\+²⁺³³⁻²⁻₁₂₃₄₅₆₇₈₉₀]+?)([.,;:!?\s]*)$/);
        if (match) {
          const prefix = match[1];
          const word = match[2];
          const suffix = match[3];

          const hasCapitalAndNumber = /[A-Z]/.test(word) && /\d/.test(word);
          const isKnownCommon = /^(H2O|CO2|CO|O2|H2|Cl2|I2|NH3|FE|CU|NA|ZN|MG|KI|PB|C|CH3COOH|C2H5OH|C6H14|C18H36O2|C10H22|C5H10|C6H8O7|C4H6O6|H2C2O4|COSO4|CUSO4|ZNSO4|BASO4|NA2SO4|BACL2|C2H4BR2|CH2BR2|CH3BR|CCL4|CH3COCH3|C18H35NAO2)$/i.test(word);
          const isIonic = /[A-Z]/.test(word) && (word.includes("+") || word.includes("-"));
          const looksLikeFormula = isChemicalFormula(word) || hasCapitalAndNumber || isKnownCommon || isIonic || SUPPORTED_REACTANTS.some(r => r.formula.toLowerCase() === word.toLowerCase());

          if (looksLikeFormula) {
            return (
              <span key={index}>
                {prefix}
                <span className={`font-mono font-bold ${isLightMode ? 'text-cyan-700' : 'text-cyan-300'}`}>{renderFormattedFormula(word, isLightMode)}</span>
                {suffix}
              </span>
            );
          }
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function getMolecularWeightForReactant(formula: string): number {
  if (!formula) return 50.0;
  const f = formula.trim().toUpperCase().replace(/\(S\)/g, "").replace(/\(AQ\)/g, "").replace(/\(L\)/g, "").replace(/\(G\)/g, "").replace(/↓/g, "").replace(/↑/g, "");
  if (f === "FE") return 55.85;
  if (f === "CUSO4") return 159.61;
  if (f === "FESO4") return 151.91;
  if (f === "NA") return 22.99;
  if (f === "H2O") return 18.02;
  if (f === "HCL") return 36.46;
  if (f === "NAOH") return 39.99;
  if (f === "PROPENE" || f === "C3H6") return 42.08;
  if (f === "HBR") return 80.91;
  if (f === "CU") return 63.55;
  if (f === "ZNSO4") return 161.47;
  if (f === "BACL2") return 208.23;
  if (f === "NA2SO4") return 142.04;
  if (f === "BASO4") return 233.39;
  if (f === "NACL") return 58.44;
  if (f === "CACO3") return 100.09;
  if (f === "O2") return 32.00;
  if (f === "CO2") return 44.01;
  if (f === "CH3COOH" || f.includes("ACETIC")) return 60.05;
  if (f === "C2H5OH" || f.includes("ETHANOL")) return 46.07;
  if (f === "H2SO4") return 98.08;
  if (f === "KMNO4") return 158.03;
  if (f === "OIL" || f === "FAT") return 282.47; // Stearate mass range ballpark
  if (f.includes("BROMOPROPANE") || f.includes("PROP_BROMIDE") || f.includes("C3H7BR") || f === "CH3-CH2-CH2BR" || f === "CH3-CHBR-CH3") return 122.99;
  
  // New chemicals
  if (f === "ZNCO3") return 125.40;
  if (f === "ZN") return 65.38;
  if (f === "MG") return 24.31;
  if (f === "MGO") return 40.30;
  if (f === "MGCO3") return 84.31;
  if (f === "MGSO4") return 120.37;
  if (f === "CAO") return 56.08;
  if (f === "CA(OH)2") return 74.09;
  if (f === "NH4CL") return 53.49;
  if (f === "HNO3") return 63.01;
  if (f === "KI") return 166.00;
  if (f === "PB(NO3)2") return 331.20;
  if (f === "PBI2") return 461.00;
  if (f === "AGNO3") return 169.87;
  if (f === "AGCL") return 143.32;
  if (f === "CL2") return 70.90;
  if (f === "H2") return 2.02;
  if (f === "NAHCO3") return 84.01;
  if (f === "NA2CO3") return 105.99;
  if (f === "C") return 12.01;
  if (f === "FECL3") return 162.20;
  if (f === "CUCL2") return 134.45;
  if (f === "CUO") return 79.55;
  if (f === "ZNO") return 81.38;
  if (f === "MNO2") return 86.94;
  if (f === "H2O2") return 34.01;
  if (f.includes("C10H22") || f === "DECANE") return 142.29;
  if (f.includes("C5H10") || f === "PENTENE") return 70.13;
  if (f.includes("C6H8O7") || f.includes("CITRIC")) return 192.12;
  if (f.includes("C4H6O6") || f.includes("TARTARIC")) return 150.09;
  if (f === "HCHO" || f.includes("FORMALDEHYDE")) return 30.03;
  if (f === "CH3CHO" || f.includes("ACETALDEHYDE")) return 44.05;
  if (f === "C6H5CHO" || f.includes("BENZALDEHYDE") || f === "C7H6O") return 106.12;
  if (f === "CH3COCH3" || f.includes("ACETONE")) return 58.08;
  if (f === "C6H10O" || f.includes("CYCLOHEXANONE")) return 98.14;
  if (f === "CHCL3" || f.includes("CHLOROFORM")) return 119.38;
  if (f === "CH2CL2" || f.includes("DICHLOROMETHANE")) return 84.93;
  if (f === "CH3CL" || f.includes("CHLOROMETHANE")) return 50.49;
  if (f === "C2H5BR" || f.includes("BROMOETHANE")) return 108.97;
  if (f === "C2H4" || f.includes("ETHENE")) return 28.05;
  if (f === "C3H6" || f.includes("PROPENE")) return 42.08;
  if (f === "C2H2" || f.includes("ACETYLENE")) return 26.04;
  if (f === "C3H4" || f.includes("PROPYNE")) return 40.06;
  if (f === "HCOOH" || f.includes("FORMIC")) return 46.03;
  if (f === "C6H5COOH" || f.includes("BENZOIC") || f === "C7H6O2") return 122.12;

  // Saponification and Halide weight formulas
  if (f === "CH3BR" || f.includes("BROMOMETHANE")) return 94.94;
  if (f === "CH2BR2" || f.includes("DIBROMOMETHANE")) return 173.83;
  if (f === "C2H4BR2" || f.includes("1,2-DIBROMOETHANE") || f.includes("DIBROMOETHANE")) return 187.86;
  if (f === "CCL4" || f.includes("TETRACHLORIDE")) return 153.82;
  if (f === "C18H35NAO2" || f.includes("STEARATE")) return 306.46;
  if (f === "C18H34O2" || f.includes("OLEIC")) return 282.46;
  if (f === "C16H32O2" || f.includes("PALMITIC")) return 256.42;
  if (f === "C3H8O3" || f.includes("GLYCEROL") || f.includes("GLYCERINE")) return 92.09;
  if (f === "BR2" || f.includes("BROMINE")) return 159.81;

  return 58.0; // fallback molecular weight
}

function getDefaultUnitForReactant(formula: string): "g" | "mL" {
  if (!formula) return "mL";
  const f = formula.trim().toUpperCase();
  if (["FE", "NA", "CU", "CUSO4", "ZNSO4", "BACL2", "NA2SO4"].includes(f)) {
    return "g";
  }
  return "mL";
}

function getDensityForReactant(formula: string): number {
  if (!formula) return 1.0;
  const f = formula.trim().toUpperCase();
  if (f === "H2O") return 1.0;
  if (f === "HCL") return 1.18;
  if (f === "NAOH") return 1.25;
  if (f === "ETHANOL") return 0.789;
  return 1.0;
}

interface ReactionSimulatorProps {
  isLightMode?: boolean;
}

export default function ReactionSimulator({ isLightMode = false }: ReactionSimulatorProps) {
  // Simulator Environment States
  const [numReactants, setNumReactants] = useState<number>(2);
  const [reactants, setReactants] = useState<Array<{ 
    formula: string; 
    concentration: "dilute" | "concentrated";
    amountValue?: number;
    amountUnit?: "g" | "mL";
  }>>([
    { formula: "Fe", concentration: "concentrated", amountValue: 10.0, amountUnit: "g" },
    { formula: "CuSO4", concentration: "concentrated", amountValue: 10.0, amountUnit: "g" },
    { formula: "", concentration: "concentrated" },
    { formula: "", concentration: "concentrated" },
  ]);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [searchTerms, setSearchTerms] = useState<string[]>(["Fe", "CuSO4", "", ""]);

  useEffect(() => {
    setSearchTerms(prev => {
      const copy = [...prev];
      reactants.forEach((r, i) => {
        if (focusedIndex !== i) {
          copy[i] = r.formula;
        }
      });
      return copy;
    });
  }, [reactants, focusedIndex]);

  const calcMoles = (r: { formula: string; concentration: "dilute" | "concentrated"; amountValue?: number; amountUnit?: "g" | "mL" }) => {
    if (!r.formula) return 0;
    const def = getDefaultQuantity(r.formula);
    const val = r.amountValue ?? def.value;
    const unit = r.amountUnit ?? def.unit;
    const mw = getMolecularWeightForReactant(r.formula);
    
    if (unit === "mL") {
      if (r.concentration === "dilute") {
        return (val / 1000) * 1.0; // Assume 1M
      } else {
        return (val / 1000) * 12.0; // Assume 12M
      }
    }
    // For solids (grams)
    if (r.concentration === "dilute") {
      return (val / mw) * 0.2; // dilute solid admixture
    }
    return val / mw;
  };

  const reactantA = reactants[0]?.formula || "";
  const reactantB = reactants[1]?.formula || "";

  const [temperature, setTemperature] = useState<number>(25); // Celsius
  const [pressure, setPressure] = useState<number>(1); // atm
  const [solvent, setSolvent] = useState<string>("None");
  const [addedWater, setAddedWater] = useState<boolean>(true);
  const [catalyst, setCatalyst] = useState<string>("None");

  // Simulation Status States
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [activeTab, setActiveTab] = useState<"foundational" | "advanced" | "arrow">("foundational");
  const [shaking, setShaking] = useState<boolean>(false);
  const [stageProgress, setStageProgress] = useState<number>(0);
  const [simulatedTime, setSimulatedTime] = useState<number>(0);
  const [showThermo, setShowThermo] = useState<boolean>(false);
  const [activeCabinetTab, setActiveCabinetTab] = useState<string>("Carboxylic Acids");
  const [elementSearchQuery, setElementSearchQuery] = useState<string>("");

  // Dynamic Sequential Pouring Calculations
  const getTubeAnimationState = (i: number) => {
    if (!loading) {
      if (result) return { x: 0, y: 0, rotate: 0, opacity: 0.35 }; // Faded and empty after completion
      return { x: 0, y: 0, rotate: 0, opacity: 1 }; // Ready
    }

    const stepSize = 80 / numReactants;
    const start = 10 + i * stepSize;
    const peak = start + stepSize * 0.35;
    const end = start + stepSize * 0.85;

    const gapWidth = 72;
    const x_start = (i - (numReactants - 1) / 2) * gapWidth;
    const isLeft = i < numReactants / 2;
    
    const targetX = -x_start;
    const targetY = 115;
    const targetRotation = isLeft ? 65 : -65;

    if (stageProgress < start) {
      return { x: 0, y: 0, rotate: 0, opacity: 1 };
    }
    if (stageProgress >= start && stageProgress < peak) {
      const ratio = (stageProgress - start) / (peak - start);
      return { 
        x: targetX * ratio, 
        y: targetY * ratio, 
        rotate: targetRotation * ratio, 
        opacity: 1 
      };
    }
    if (stageProgress >= peak && stageProgress < end) {
      return { 
        x: targetX, 
        y: targetY, 
        rotate: targetRotation, 
        opacity: 1 
      };
    }
    // after pouring completes
    return { x: 0, y: 0, rotate: 0, opacity: 0.35 };
  };

  const isPouring = (i: number) => {
    if (!loading) return false;
    const stepSize = 80 / numReactants;
    const start = 10 + i * stepSize;
    const peak = start + stepSize * 0.35;
    const end = start + stepSize * 0.85;
    return stageProgress >= peak && stageProgress < end;
  };

  const getTubeFluidHeight = (i: number, formula: string) => {
    if (!formula) return "0%";
    if (result) return "0%"; // all poured
    if (!loading) return "65%";

    const stepSize = 80 / numReactants;
    const start = 10 + i * stepSize;
    const peak = start + stepSize * 0.35;
    const end = start + stepSize * 0.85;

    if (stageProgress < peak) return "65%";
    if (stageProgress >= end) return "0%";

    // progressive drain
    const ratio = (stageProgress - peak) / (end - peak);
    return `${65 * (1 - ratio)}%`;
  };

  // Quick inputs
  const handleSelectQuick = (formula: string) => {
    setReactants(prev => {
      const copy = [...prev];
      let foundEmpty = false;
      const def = getDefaultQuantity(formula);
      for (let i = 0; i < numReactants; i++) {
        if (!copy[i].formula) {
          copy[i].formula = formula;
          copy[i].amountValue = def.value;
          copy[i].amountUnit = def.unit;
          foundEmpty = true;
          break;
        }
      }
      if (!foundEmpty) {
        // If all are filled, replace the last active slot
        copy[numReactants - 1].formula = formula;
        copy[numReactants - 1].amountValue = def.value;
        copy[numReactants - 1].amountUnit = def.unit;
      }
      return copy;
    });
  };

  const handleReset = () => {
    setReactants([
      { formula: "", concentration: "concentrated" },
      { formula: "", concentration: "concentrated" },
      { formula: "", concentration: "concentrated" },
      { formula: "", concentration: "concentrated" },
    ]);
    setNumReactants(2);
    setTemperature(25);
    setPressure(1);
    setSolvent("None");
    setAddedWater(false);
    setResult(null);
    setError(null);
    setStageProgress(0);
    setSimulatedTime(0);
    setShowThermo(false);
  };

  const runSimulation = async () => {
    const activeReactants = reactants.slice(0, numReactants).filter(r => r.formula.trim().length > 0);
    if (activeReactants.length === 0) {
      setError("Please select or type at least one Reactant to simulate.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setStageProgress(0);
    setSimulatedTime(0);

    // Initial reaction loader interval
    const interval = setInterval(() => {
      setStageProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    try {
      const response = await fetch("/api/simulate-reaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reactants: reactants.slice(0, numReactants),
          temperature,
          pressure,
          solvent,
          addedWater,
          addedPeroxide: solvent === "Peroxide" || solvent === "Hydrogen Peroxide",
          catalyst
        })
      });

      if (!response.ok) {
        const errText = await response.json();
        throw new Error(errText.error || "Reaction failed on the server side.");
      }

      const data = await response.json() as SimulationResult;
      
      // Artificial delay to make simulation visual feel majestic
      setTimeout(() => {
        setResult(data);
        setLoading(false);
        // If hazardous or explosive, trigger mechanical device vibration effect
        if (data.dangerLevel === "explosive" || data.dangerLevel === "hazardous") {
          setShaking(true);
          setTimeout(() => setShaking(false), 900);
        }
      }, 800);

    } catch (err: any) {
      setError(err.message || "An unexpected simulation failure occurred.");
      setLoading(false);
    }
  };

  // Live timer tick for spontaneous processes to simulate kinetic reaction progress
  useEffect(() => {
    let timerId: any;
    if (result && result.reactionFeasible && result.isSpontaneous) {
      setSimulatedTime(0);
      timerId = setInterval(() => {
        setSimulatedTime(prev => {
          if (prev >= 100) {
            clearInterval(timerId);
            return 100;
          }
          return prev + 5;
        });
      }, 80);
    }
    return () => clearInterval(timerId);
  }, [result]);

  // Compute live glass wear & strain based on extreme pressure/temperature
  const glassStrain = Math.min(
    100,
    Math.round(
      (Math.max(0, temperature) / 1500) * 50 + 
      (pressure / 300) * 50
    )
  );

  return (
    <div 
      id="chem-simulator-container" 
      className={`flex-1 flex flex-col lg:h-screen lg:overflow-hidden transition-colors duration-300 ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#060b14] text-slate-100'}`}
      style={{
        backgroundImage: isLightMode
          ? `radial-gradient(circle at 50% 50%, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.98)), 
            linear-gradient(rgba(14, 165, 233, 0.05) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.05) 1.5px, transparent 1.5px)`
          : `radial-gradient(circle at 50% 50%, rgba(9, 21, 41, 0.45), rgba(4, 7, 14, 0.85)), 
            linear-gradient(rgba(34, 211, 238, 0.025) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.025) 1.5px, transparent 1.5px)`,
        backgroundSize: "100% 100%, 28px 28px, 28px 28px",
      }}
    >
      
      {/* Sleek Header Bar */}
      <div className={`shrink-0 border-b transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0d1424] border-slate-800/80'} px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 select-none`}>
        <div>
          <h1 className={`text-base font-black tracking-tight flex items-center gap-2 uppercase font-mono ${isLightMode ? 'text-cyan-800' : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 bg-clip-text text-transparent'}`}>
            <Beaker className={`w-5 h-5 animate-pulse ${isLightMode ? 'text-cyan-700' : 'text-cyan-400'}`} />
            Conceptual Learning Chemistry Lab
          </h1>
          <p className={`text-xs leading-normal mt-1.5 font-sans ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
            Concept Lab: Interactive online 2D chemistry simulation driven by thermodynamic constants.
          </p>
        </div>
        
        {/* Device Status/Info bar */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-bold border transition duration-150 cursor-pointer ${
              isLightMode 
                ? 'text-slate-700 border-slate-300 bg-slate-50 hover:bg-slate-100 hover:text-slate-900' 
                : 'text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white bg-transparent'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Setup</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden min-h-0">
        
        {/* Left Side: Parameters Panel */}
        <div className={`w-full lg:w-[380px] border-b lg:border-b-0 lg:border-r p-5 flex flex-col shrink-0 select-none lg:h-full justify-between transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#090f1d] border-slate-800/60'}`}>
          
          {/* Scrollable Form Body Container */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-5 scrollbar-thin">
            {/* Section 1: Chemical Inputs */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`flex items-center gap-1.5 text-sm font-black uppercase tracking-wider font-mono ${isLightMode ? 'text-slate-800' : 'text-slate-350'}`}>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span>1. Load Reactants</span>
                </div>
                {/* Selector for 1, 2, 3, or 4 reactants */}
                <div className={`flex items-center gap-1 p-1 rounded-lg border transition-colors ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border border-slate-800'}`}>
                  {[1, 2, 3, 4].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNumReactants(n)}
                      className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md transition duration-150 cursor-pointer ${
                        numReactants === n
                          ? isLightMode
                            ? "bg-cyan-100 border border-cyan-300 text-cyan-800 font-black"
                            : "bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-black shadow-inner"
                          : isLightMode
                            ? "text-slate-600 hover:text-slate-900 border border-transparent"
                            : "text-slate-500 hover:text-slate-355 border border-transparent"
                      }`}
                    >
                      {n} {n === 1 ? "Tube" : "Tubes"}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Dynamic text inputs for reactants */}
              <div className="space-y-3">
                {Array.from({ length: numReactants }).map((_, idx) => {
                  const r = reactants[idx] || { formula: "", concentration: "concentrated" };
                  const colorMatch = getChemicalColor(r.formula);
                  return (
                    <div key={idx} className={`p-2.5 rounded-xl border relative ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#101726]/30 border-slate-800/60'}`}>
                      {/* Title & Concentration controls on the same line */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`text-xs font-mono font-extrabold uppercase flex items-center gap-1.5 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorMatch.bg }} />
                          Test Tube {idx + 1}
                        </span>

                        {/* Dilute / Concentrated Toggle */}
                        {isAcidReactant(r.formula) ? (
                          <div className={`flex rounded p-0.5 border text-[10px] ${isLightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-900 border-slate-800'}`}>
                            {(["dilute", "concentrated"] as const).map(c => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => {
                                  setReactants(prev => {
                                    const copy = [...prev];
                                    copy[idx] = { ...copy[idx], concentration: c };
                                    return copy;
                                  });
                                }}
                                className={`px-1.5 py-0.5 rounded font-mono font-semibold transition cursor-pointer ${
                                  r.concentration === c
                                    ? c === "dilute"
                                      ? isLightMode ? "bg-teal-100 text-teal-700 font-extrabold" : "bg-teal-500/20 text-teal-350 font-extrabold"
                                      : isLightMode ? "bg-indigo-100 text-indigo-700 font-extrabold" : "bg-indigo-500/20 text-indigo-350 font-extrabold"
                                    : isLightMode ? "text-slate-500 hover:text-slate-700" : "text-slate-550 hover:text-slate-400"
                                }`}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className={`text-[10px] font-mono tracking-wide px-1.5 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                            Standard Conc.
                          </div>
                        )}
                      </div>

                      <div className="relative">
                        <input 
                          type="text" 
                          value={focusedIndex === idx ? searchTerms[idx] : (SUPPORTED_REACTANTS.find(x => x.formula === r.formula)?.formula || r.formula)}
                          onFocus={() => {
                            setFocusedIndex(idx);
                            setSearchTerms(prev => {
                              const copy = [...prev];
                              copy[idx] = r.formula;
                              return copy;
                            });
                            setActiveDropdown(idx);
                          }}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSearchTerms(prev => {
                              const copy = [...prev];
                              copy[idx] = val;
                              return copy;
                            });

                            // Check for exact formula/name match right away while typing
                            const matched = SUPPORTED_REACTANTS.find(
                              x => x.formula.toLowerCase() === val.trim().toLowerCase() ||
                                   x.name.toLowerCase() === val.trim().toLowerCase()
                            );
                            if (matched) {
                              const def = getDefaultQuantity(matched.formula);
                              setReactants(prev => {
                                const copy = [...prev];
                                copy[idx] = { 
                                  ...copy[idx], 
                                  formula: matched.formula,
                                  amountValue: def.value,
                                  amountUnit: def.unit
                                };
                                return copy;
                              });
                            } else if (isTrueChemical(val)) {
                              setReactants(prev => {
                                const copy = [...prev];
                                copy[idx] = { 
                                  ...copy[idx], 
                                  formula: val,
                                  amountValue: 10.0,
                                  amountUnit: "g"
                                };
                                return copy;
                              });
                            } else {
                              setReactants(prev => {
                                const copy = [...prev];
                                copy[idx] = { 
                                  ...copy[idx], 
                                  formula: "" // Clear on invalid until they choose or exact match
                                  };
                                  return copy;
                                });
                              }
                            }}
                          onBlur={() => {
                            // Delay slightly to let option clicks register first
                            setTimeout(() => {
                              setFocusedIndex(null);
                              setActiveDropdown(null);
                              
                              const val = searchTerms[idx]?.trim() || "";
                              if (!val) {
                                setReactants(prev => {
                                  const copy = [...prev];
                                  copy[idx] = { ...copy[idx], formula: "" };
                                  return copy;
                                });
                                return;
                              }

                              // Strict resolution
                              let match = SUPPORTED_REACTANTS.find(
                                x => x.formula.toLowerCase() === val.toLowerCase() || 
                                     x.name.toLowerCase() === val.toLowerCase()
                              );

                              // Try contains match
                              if (!match) {
                                match = SUPPORTED_REACTANTS.find(
                                  x => x.formula.toLowerCase().includes(val.toLowerCase()) || 
                                       x.name.toLowerCase().includes(val.toLowerCase())
                                );
                              }

                              if (match) {
                                const matchedFormula = match.formula;
                                const def = getDefaultQuantity(matchedFormula);
                                setReactants(prev => {
                                  const copy = [...prev];
                                  copy[idx] = { 
                                    ...copy[idx], 
                                    formula: matchedFormula,
                                    amountValue: def.value,
                                    amountUnit: def.unit
                                  };
                                  return copy;
                                });
                                setSearchTerms(prev => {
                                  const copy = [...prev];
                                  copy[idx] = matchedFormula;
                                  return copy;
                                });
                              } else if (isTrueChemical(val)) {
                                // Accept valid custom chemical formulas and chemical names
                                setReactants(prev => {
                                  const copy = [...prev];
                                  copy[idx] = { 
                                    ...copy[idx], 
                                    formula: val,
                                    amountValue: 10.0,
                                    amountUnit: "g"
                                  };
                                  return copy;
                                });
                                setSearchTerms(prev => {
                                  const copy = [...prev];
                                  copy[idx] = val;
                                  return copy;
                                });
                              } else {
                                // Clear invalid choice - students are not allowed to select a false reactant
                                setReactants(prev => {
                                  const copy = [...prev];
                                  copy[idx] = { ...copy[idx], formula: "" };
                                  return copy;
                                });
                                setSearchTerms(prev => {
                                  const copy = [...prev];
                                  copy[idx] = "";
                                  return copy;
                                });
                              }
                            }, 250);
                          }}
                          placeholder={`Search formula or name...`}
                          className={`w-full border rounded-lg px-2.5 py-1 text-sm focus:outline-none focus:border-cyan-450 font-mono transition duration-155 ${isLightMode ? 'bg-white border-slate-300 text-cyan-800 placeholder-slate-400' : 'bg-[#11192e] border-slate-800 text-cyan-300 placeholder-slate-600'}`}
                        />

                        {/* Live Subscript Formula Preview */}
                        {(focusedIndex === idx ? searchTerms[idx] : r.formula) && (
                          <div className={`mt-1.5 flex items-center justify-between px-2 py-1 border rounded-md text-[11px] font-mono select-none shadow-inner ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#090f1d] border-slate-800/80'}`}>
                            <span className={`font-bold uppercase tracking-wider text-[9px] ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Subscript Preview:</span>
                            <span className={`font-black flex items-center gap-1 mr-0.5 ${isLightMode ? 'text-cyan-700' : 'text-[#22d3ee]'}`}>
                              {renderFormattedFormula(focusedIndex === idx ? searchTerms[idx] : r.formula, isLightMode)}
                            </span>
                          </div>
                        )}

                        {/* Dropdown Suggestions */}
                        {activeDropdown === idx && (
                          <div className={`absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto border rounded-lg shadow-xl z-50 divide-y pointer-events-auto ${isLightMode ? 'bg-white border-slate-300 divide-slate-200' : 'bg-[#0a101f] border-slate-700/60 divide-slate-850'}`}>
                            {SUPPORTED_REACTANTS.filter(item => {
                              const typed = (searchTerms[idx] ?? "").trim().toLowerCase();
                              if (!typed) return true; // show all when empty focused
                              return item.formula.toLowerCase().includes(typed) || item.name.toLowerCase().includes(typed);
                            }).length > 0 ? (
                              SUPPORTED_REACTANTS.filter(item => {
                                const typed = (searchTerms[idx] ?? "").trim().toLowerCase();
                                if (!typed) return true;
                                return item.formula.toLowerCase().includes(typed) || item.name.toLowerCase().includes(typed);
                              }).map((option) => (
                                <div
                                  key={option.formula}
                                  onMouseDown={(e) => {
                                    // Prevent default to prevent blur event before picking
                                    e.preventDefault();
                                    const def = getDefaultQuantity(option.formula);
                                    setReactants(prev => {
                                      const copy = [...prev];
                                      copy[idx] = {
                                        ...copy[idx],
                                        formula: option.formula,
                                        amountValue: def.value,
                                        amountUnit: def.unit,
                                        gasSupply: "excess" // Default
                                      };
                                      return copy;
                                    });
                                    setSearchTerms(prev => {
                                      const copy = [...prev];
                                      copy[idx] = option.formula;
                                      return copy;
                                    });
                                    setActiveDropdown(null);
                                    setFocusedIndex(null);
                                  }}
                                  className={`px-3 py-1.5 cursor-pointer text-xs text-left flex justify-between items-center transition duration-100 ${isLightMode ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-800/80 text-slate-300'}`}
                                >
                                  <div>
                                    <span className={`font-mono font-bold ${isLightMode ? 'text-cyan-700' : 'text-cyan-450'}`}>{option.formula}</span>
                                    <span className={`text-[10px] ml-2 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>({option.name})</span>
                                  </div>
                                  <span className={`text-[9px] border px-1.5 py-0.5 rounded font-mono ${isLightMode ? 'bg-slate-100 border-slate-300 text-teal-700' : 'bg-slate-900 border-slate-800 text-teal-455'}`}>
                                    {getDefaultQuantity(option.formula).value}{getDefaultQuantity(option.formula).unit}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className={`px-3 py-2 text-xs italic text-center ${isLightMode ? 'text-slate-500' : 'text-slate-505'}`}>
                                No matching reactant
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Gas Supply limited/excess toggle (Only for O2 and CO2) */}
                      {(r.formula.toUpperCase() === "O2" || r.formula.toUpperCase() === "CO2") && (
                        <div className={`mt-2 text-xs font-mono p-1.5 rounded border flex items-center justify-between ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800/60'}`}>
                          <span className={`font-bold uppercase tracking-wider text-[9px] ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>Gas Supply</span>
                          <div className={`flex p-0.5 rounded border ${isLightMode ? 'bg-white border-slate-300' : 'bg-slate-950 border-slate-850'}`}>
                            {(["limited", "excess"] as const).map(mode => (
                              <button
                                key={mode}
                                type="button"
                                onClick={() => {
                                  setReactants(prev => {
                                    const copy = [...prev];
                                    copy[idx] = { ...copy[idx], gasSupply: mode };
                                    return copy;
                                  });
                                }}
                                className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] transition cursor-pointer ${
                                  (r.gasSupply || "excess") === mode
                                    ? isLightMode ? "bg-cyan-100 text-cyan-700 font-black" : "bg-cyan-500/15 text-cyan-350 font-black"
                                    : isLightMode ? "text-slate-500 hover:text-slate-700" : "text-slate-500 hover:text-slate-400"
                                }`}
                              >
                                {mode}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Decomposition shortcut button if numReactants === 1 */}
              {numReactants === 1 && reactants[0]?.formula && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      const f = reactants[0].formula.trim().toUpperCase();
                      let suitableTemp = 500; // default
                      if (f === "CACO3") suitableTemp = 825;
                      else if (f === "ZNCO3") suitableTemp = 450;
                      else if (f === "MGCO3") suitableTemp = 540;
                      else if (f === "NAHCO3") suitableTemp = 200;
                      else if (f === "H2O2") suitableTemp = 75;
                      else if (f === "H2C2O4" || f.includes("OXALIC")) suitableTemp = 190;
                      else if (f === "PB(NO3)2") suitableTemp = 400;
                      else if (f.includes("·") || f.includes("H2O")) suitableTemp = 150;
                      
                      setTemperature(suitableTemp);
                      setAddedWater(false); // thermal decomposition runs on dry material
                      
                      // Auto-run reaction!
                      setTimeout(() => {
                        runSimulation();
                      }, 200);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-xs uppercase rounded-lg border border-amber-500/50 shadow-md flex items-center justify-center gap-2 cursor-pointer transition duration-155 active:scale-[0.98]"
                  >
                    <Flame className="w-4 h-4 fill-white animate-pulse" />
                    <span>Decompose {reactants[0].formula} at {
                      (() => {
                        const f = reactants[0].formula.trim().toUpperCase();
                        if (f === "CACO3") return 825;
                        if (f === "ZNCO3") return 450;
                        if (f === "MGCO3") return 540;
                        if (f === "NAHCO3") return 200;
                        if (f === "H2O2") return 75;
                        if (f === "H2C2O4" || f.includes("OXALIC")) return 190;
                        if (f === "PB(NO3)2") return 400;
                        if (f.includes("·") || f.includes("H2O")) return 150;
                        return 500;
                      })()
                    }°C</span>
                  </button>
                  <p className={`text-[10px] mt-1 font-mono text-center leading-normal ${isLightMode ? 'text-amber-700' : 'text-amber-500'}`}>
                    🔥 Sets Dry state, configures optimum {(() => {
                      const f = reactants[0].formula.trim().toUpperCase();
                      if (f === "CACO3") return "calcination";
                      if (f === "ZNCO3" || f === "MGCO3" || f === "PB(NO3)2") return "thermolysis";
                      if (f === "NAHCO3") return "bicarbonate rise";
                      if (f === "H2O2") return "catalytic decomposition";
                      if (f === "H2C2O4" || f.includes("OXALIC")) return "sublimative decomposition";
                      if (f.includes("·") || f.includes("H2O")) return "dehydration";
                      return "decomposition";
                    })()} temperature, and runs simulation instantly.
                  </p>
                </div>
              )}
            </div>

            {/* Helper Quick Shelf Grid */}
            <div className={`p-3.5 rounded-xl border ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/80 border-slate-700/80'}`}>
              <div className={`text-xs font-black uppercase font-mono mb-2 flex items-center justify-between ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                <span>Chemical Cabinet Drawer</span>
              </div>

              {/* Tabs for different chemical classes */}
              <div className={`flex flex-wrap gap-1 mb-2.5 pb-1 border-b overflow-x-auto scrollbar-none ${isLightMode ? 'border-slate-300' : 'border-slate-700'}`}>
                {["Popular", "Periodic Table", ...CHEMICAL_CATEGORIES.map(c => c.category)].map(tabName => (
                  <button
                    key={tabName}
                    type="button"
                    onClick={() => setActiveCabinetTab(tabName)}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition duration-155 cursor-pointer whitespace-nowrap ${
                      activeCabinetTab === tabName
                        ? isLightMode
                          ? "bg-cyan-100 text-cyan-700 border border-cyan-300"
                          : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                        : isLightMode
                          ? "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50"
                          : "bg-slate-700/60 text-slate-200 border border-transparent hover:text-white hover:bg-slate-600"
                    }`}
                  >
                    {tabName}
                  </button>
                ))}
              </div>

              {/* Conditional rendering for Periodic Table vs other categories */}
              {activeCabinetTab === "Periodic Table" ? (
                <div className="space-y-3">
                  {/* Category Legend */}
                  <div className={`flex flex-wrap gap-x-2.5 gap-y-1 text-[8px] font-semibold uppercase tracking-wide font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-sm ${isLightMode ? 'bg-red-200 border border-red-400' : 'bg-red-950/40 border border-red-850'}`}></span> Alkali</span>
                    <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-sm ${isLightMode ? 'bg-orange-200 border border-orange-400' : 'bg-orange-950/40 border border-orange-850'}`}></span> Alkaline</span>
                    <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-sm ${isLightMode ? 'bg-cyan-200 border border-cyan-400' : 'bg-cyan-950/40 border border-cyan-850'}`}></span> Transition</span>
                    <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-sm ${isLightMode ? 'bg-pink-200 border border-pink-400' : 'bg-pink-950/40 border border-pink-850'}`}></span> Lanthanide</span>
                    <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-sm ${isLightMode ? 'bg-rose-200 border border-rose-400' : 'bg-rose-950/40 border border-rose-850'}`}></span> Actinide</span>
                    <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-sm ${isLightMode ? 'bg-amber-200 border border-amber-400' : 'bg-amber-950/40 border border-amber-850'}`}></span> Metalloid</span>
                    <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-sm ${isLightMode ? 'bg-blue-200 border border-blue-400' : 'bg-blue-950/40 border border-blue-850'}`}></span> Halogen</span>
                    <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-sm ${isLightMode ? 'bg-purple-200 border border-purple-400' : 'bg-purple-950/40 border border-purple-850'}`}></span> Noble Gas</span>
                    <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-sm ${isLightMode ? 'bg-emerald-200 border border-emerald-400' : 'bg-emerald-950/40 border border-emerald-850'}`}></span> Non-metal</span>
                  </div>

                  {/* Search inside elements */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search 118 periodic elements by symbol, name, or group..."
                      value={elementSearchQuery}
                      onChange={(e) => setElementSearchQuery(e.target.value)}
                      className={`w-full px-2.5 py-1.5 text-[11px] border rounded focus:outline-none focus:border-cyan-500/50 font-mono ${isLightMode ? 'text-slate-800 placeholder-slate-400 bg-white border-slate-300' : 'text-slate-100 placeholder-slate-550 bg-[#070b14] border-slate-800'}`}
                    />
                    {elementSearchQuery && (
                      <button
                        onClick={() => setElementSearchQuery("")}
                        className={`absolute right-2 top-1.5 text-[10px] font-mono cursor-pointer ${isLightMode ? 'text-slate-500 hover:text-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        [clear]
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 font-mono max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                    {FRONTEND_ELEMENTS.map((item, idx) => {
                      const atomicNumber = idx + 1;
                      const groupInfo = getElementGroup(atomicNumber, item.formula, isLightMode);
                      const isMatch = !elementSearchQuery.trim() ||
                        item.name.toLowerCase().includes(elementSearchQuery.toLowerCase()) ||
                        item.formula.toLowerCase().includes(elementSearchQuery.toLowerCase()) ||
                        groupInfo.name.toLowerCase().includes(elementSearchQuery.toLowerCase());

                      if (!isMatch) return null;

                      const isActive = reactants.slice(0, numReactants).some(r => r.formula.trim().toUpperCase() === item.formula.trim().toUpperCase());

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectQuick(item.formula)}
                          className={`p-1 rounded text-left border transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[50px] relative overflow-hidden ${
                            isActive
                              ? isLightMode
                                ? 'bg-gradient-to-r from-cyan-100 to-teal-100 border-cyan-500 text-slate-900 font-extrabold shadow-md'
                                : 'bg-gradient-to-r from-cyan-950/50 to-teal-950/50 border-cyan-400 text-white font-extrabold shadow-md'
                              : `${groupInfo.bg} ${groupInfo.border} ${groupInfo.text}`
                          }`}
                        >
                          <div className="flex items-center justify-between w-full opacity-65">
                            <span className="text-[7.5px] font-mono">#{atomicNumber}</span>
                            <span className={`text-[6.5px] font-bold px-0.5 rounded scale-90 uppercase truncate ${isLightMode ? 'bg-white/60' : 'bg-slate-900/30'}`}>{groupInfo.name}</span>
                          </div>
                          <div className="text-[13px] font-black leading-none mt-0.5">{item.formula}</div>
                          <div className="text-[9px] truncate mt-0.5 leading-none opacity-80">{item.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1.5 font-mono">
                  {(activeCabinetTab === "Popular"
                    ? QUICK_SHELF
                    : CHEMICAL_CATEGORIES.find(c => c.category === activeCabinetTab)?.items || []
                  ).map((item, idx) => {
                    const isActive = reactants.slice(0, numReactants).some(r => r.formula.trim().toUpperCase() === item.formula.trim().toUpperCase());
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectQuick(item.formula)}
                        className={`p-1.5 rounded text-left border transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[50px] ${
                          isActive
                            ? isLightMode
                              ? 'bg-gradient-to-r from-cyan-100 to-teal-100 border-cyan-500 text-slate-900 font-extrabold shadow-sm'
                              : 'bg-gradient-to-r from-cyan-950/50 to-teal-950/50 border-cyan-400 text-white font-extrabold shadow-sm'
                            : isLightMode
                              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
                              : 'bg-slate-900/70 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <div className="text-[12.5px] font-mono leading-none">{renderFormattedFormula(item.formula, isLightMode)}</div>
                        <div className={`text-[10.5px] truncate mt-0.5 leading-tight ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>{item.name}</div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 2: Environmental Controls */}
            <div className="space-y-4">
              <div className={`flex items-center gap-1.5 text-sm font-black uppercase tracking-wider font-mono ${isLightMode ? 'text-slate-800' : 'text-slate-350'}`}>
                <Thermometer className={`w-3.5 h-3.5 ${isLightMode ? 'text-teal-700' : 'text-teal-400'}`} />
                <span>2. Environmental Chamber</span>
              </div>

              {/* Slider 1: Temperature */}
              <div className={`p-3 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#101726]/45 border-slate-800/60'}`}>
                <div className={`flex items-center justify-between text-xs font-mono mb-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  <span>Reaction Temperature</span>
                  <span className={`font-bold ${temperature > 400 ? (isLightMode ? 'text-amber-700' : 'text-amber-400') : (isLightMode ? 'text-cyan-700' : 'text-cyan-400')}`}>{temperature} °C</span>
                </div>
                <input
                  type="range"
                  min="-78"
                  max="1500"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-cyan-400 ${isLightMode ? 'bg-slate-200' : 'bg-slate-900'}`}
                />
                <div className={`flex justify-between text-[10px] font-mono mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-505'}`}>
                  <span>Sub-Zero (-78°C)</span>
                  <span>Room (25°C)</span>
                  <span>Pyrolysis (1500°C)</span>
                </div>
              </div>

              {/* Slider 2: Pressure */}
              <div className={`p-3 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#101726]/45 border-slate-800/60'}`}>
                <div className={`flex items-center justify-between text-xs font-mono mb-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  <span>Syringe Pressure</span>
                  <span className={`font-bold ${pressure > 100 ? (isLightMode ? 'text-rose-700 animate-pulse' : 'text-rose-400 animate-pulse') : (isLightMode ? 'text-cyan-700' : 'text-cyan-400')}`}>{pressure} atm</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="300"
                  step="0.5"
                  value={pressure}
                  onChange={(e) => setPressure(Number(e.target.value))}
                  className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-teal-400 ${isLightMode ? 'bg-slate-200' : 'bg-slate-900'}`}
                />
                <div className={`flex justify-between text-[10px] font-mono mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-505'}`}>
                  <span>Vacuum (0.1 atm)</span>
                  <span>Standard (1 atm)</span>
                  <span>Supercritical (300 atm)</span>
                </div>
              </div>

              {/* Select 3: Solvent Picker */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`block text-xs font-mono uppercase mb-1 flex items-center gap-1 ${isLightMode ? 'text-slate-600' : 'text-slate-450'}`}>
                    <Droplet className={`w-3 h-3 ${isLightMode ? 'text-cyan-700' : 'text-cyan-400'}`} /> Solvent
                  </label>
                  <select
                    value={solvent === "None" ? "None" : "Choose"}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "None") {
                        setSolvent("None");
                      } else {
                        setSolvent("Water"); // Default when choosing some solvent
                      }
                    }}
                    className={`w-full border rounded-md px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400 font-mono ${isLightMode ? 'bg-white border-slate-300 text-slate-700' : 'bg-[#11192e] border-slate-800 text-slate-205'}`}
                  >
                    <option value="None">no solvent needed</option>
                    <option value="Choose">Choose solvent</option>
                  </select>
                </div>

                {/* Aqueous solution toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setAddedWater(!addedWater)}
                    className={`w-full py-1.5 text-xs font-black border rounded-md transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider ${
                      addedWater
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-550/15'
                        : isLightMode
                          ? 'bg-white border-slate-300 text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                          : 'bg-[#11192e] border-slate-800 text-slate-400 hover:text-slate-300 hover:bg-[#15213d]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${addedWater ? 'bg-white animate-pulse' : 'bg-slate-600'}`}></span>
                    <span>{addedWater ? "Aqueous State" : "Dry / Neat"}</span>
                  </button>
                  <span className={`block text-[10px] font-mono mt-1.5 text-center leading-normal ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    Aqueous solution (Water H₂O solvent added)
                  </span>
                </div>
              </div>

              {/* Secondary Specific Solvent Dropdown when active */}
              {solvent !== "None" && (
                <div className={`p-2.5 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#101726]/30 border-slate-800/40'}`}>
                  <label className={`block text-[10px] font-mono uppercase mb-1 ${isLightMode ? 'text-slate-600' : 'text-slate-450'}`}>Select Solvent Liquid</label>
                  <select
                    value={solvent}
                    onChange={(e) => setSolvent(e.target.value)}
                    className={`w-full border rounded-md px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400 font-mono ${isLightMode ? 'bg-white border-slate-300 text-cyan-700' : 'bg-[#11192e] border-slate-800 text-cyan-400'}`}
                  >
                    <option value="Water">Water (H₂O)</option>
                    <option value="Ethanol">Ethanol</option>
                    <option value="CCl4">CCl₄ (Carbon Tetrachloride)</option>
                    <option value="Diethyl Ether">Diethyl Ether</option>
                    <option value="Benzene">Benzene</option>
                    <option value="Peroxide">Hydrogen Peroxide (H₂O₂)</option>
                  </select>
                </div>
              )}

              {/* Select 4: Catalyst Selector */}
              <div className={`p-3 rounded-lg border mt-3 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#101726]/45 border-slate-800/60'}`}>
                <label className={`block text-xs font-mono uppercase mb-1 flex items-center gap-1.5 font-bold ${isLightMode ? 'text-slate-600' : 'text-slate-450'}`}>
                  <Flame className={`w-3.5 h-3.5 ${isLightMode ? 'text-amber-700' : 'text-amber-400'}`} /> Reaction Catalyst
                </label>
                <select
                  value={catalyst}
                  onChange={(e) => setCatalyst(e.target.value)}
                  className={`w-full border rounded-md px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400 font-mono ${isLightMode ? 'bg-white border-slate-300 text-slate-700' : 'bg-[#11192e] border-slate-800 text-slate-205'}`}
                >
                  <option value="None">None (No Catalyst Needed)</option>
                  <option value="MnO2">Manganese Dioxide (MnO₂)</option>
                  <option value="Ni">Nickel (Ni)</option>
                  <option value="Pt">Platinum (Pt) / Palladium (Pd)</option>
                  <option value="Fe">Iron (Fe)</option>
                  <option value="H2SO4">Concentrated Sulfuric Acid (H₂SO₄)</option>
                  <option value="AlCl3">Anhydrous AlCl₃</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trigger Button Block - ALWAYS sticky and visible at parameter bottom */}
          <div className={`shrink-0 pt-4 border-t mt-4 w-full z-20 ${isLightMode ? 'border-slate-200 bg-white' : 'border-slate-800/40 bg-[#090f1d]'}`}>
            <button
              onClick={runSimulation}
              disabled={loading}
              className={`w-full py-3 rounded-xl border font-black tracking-wide text-xs uppercase flex items-center justify-center gap-2 transition duration-200 cursor-pointer ${
                loading
                  ? isLightMode
                    ? 'bg-slate-200 border-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <Clock className={`w-4 h-4 animate-spin ${isLightMode ? 'text-slate-500' : 'text-slate-950'}`} />
                  <span>Computing reaction dynamics... {stageProgress}%</span>
                </>
              ) : (
                <>
                  <Play className="w-4.5 h-4.5 text-slate-950 fill-slate-950" />
                  <span>{numReactants === 1 ? "Ignite Decomposition Reaction" : "Ignite \"Run Reaction\""}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center/Right: Beaker 2D visual & Data outputs */}
        <div className={`flex-1 flex flex-col md:flex-row min-h-0 transition-colors duration-300 ${isLightMode ? 'bg-white' : 'bg-[#060b14]'} overflow-y-auto`}>
          
          {/* Middle: Visual Beaker Stage */}
          <div className={`w-full md:w-[390px] lg:w-[420px] min-h-[500px] p-4 border-b md:border-b-0 md:border-r flex flex-col items-center justify-between transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#070c17]/30 border-slate-800/50'} shrink-0`}>
            
            {/* Visual Reagent Rack for Selected Chemicals */}
            <div className={`w-full border rounded-xl p-3 mb-2 flex flex-col items-center relative z-30 transition-colors duration-300 ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-950/60 border-slate-800/85'}`}>
              <div className={`text-xs uppercase font-mono font-black tracking-wider mb-2 flex items-center justify-between w-full ${isLightMode ? 'text-slate-800' : 'text-slate-400'}`}>
                <span className={isLightMode ? "text-slate-800" : "text-slate-400"}>Reaction Specimen Rack</span>
                <span className={`text-[10px] font-mono normal-case ${isLightMode ? 'text-cyan-700 font-bold' : 'text-[#22d3ee]'}`}>Tubes loaded: {reactants.slice(0, numReactants).filter(r => r.formula).length}/{numReactants}</span>
              </div>
              
              <div className="flex items-end justify-center h-32 relative w-full px-2 pt-2 gap-2">
                {/* Rack Backplate Grid Lines */}
                <div className={`absolute inset-x-2 bottom-3 h-1 rounded z-0 ${isLightMode ? 'bg-slate-200' : 'bg-slate-800/85'}`}></div>
                <div className={`absolute inset-x-4 bottom-16 h-1 rounded z-0 ${isLightMode ? 'bg-slate-100' : 'bg-slate-800/40'}`}></div>

                {reactants.slice(0, numReactants).map((r, idx) => {
                  const anim = getTubeAnimationState(idx);
                  const isSolid = getChemicalColor(r.formula).isSolid;
                  const fluidColor = getChemicalColor(r.formula).bg;
                  const fHeight = getTubeFluidHeight(idx, r.formula);
                  const pouringNow = isPouring(idx);
                  const isLeft = idx < numReactants / 2;

                  return (
                    <div key={idx} className="relative flex flex-col items-center select-none z-10 w-32 px-1">
                      {r.formula ? (
                        <motion.div
                          animate={anim}
                          transition={{ type: "spring", stiffness: 70, damping: 11 }}
                          className="flex flex-col items-center relative"
                        >
                          {/* Tube Lip */}
                          <div className="w-5 h-1 bg-slate-200/90 rounded-full border border-slate-400/80 shadow-sm z-30"></div>
                          
                          {/* Tube Glass column */}
                          <div className={`w-4 h-16 border-b-2 border-x-2 border-slate-300/80 rounded-b-full overflow-hidden relative shadow flex flex-col justify-end z-20 ${isLightMode ? 'bg-slate-100' : 'bg-slate-900/40'}`}>
                            {/* Shimmer overlay */}
                            <div className="absolute inset-y-0 left-0.5 w-0.5 bg-white/15 z-30"></div>
                            
                            {/* Chemical fluid level */}
                            <motion.div
                              animate={{ height: fHeight }}
                              transition={{ duration: 0.3 }}
                              style={{ backgroundColor: fluidColor }}
                              className="w-full absolute bottom-0"
                            />
                            
                            {/* Solid Pellet if solid metal */}
                            {isSolid && parseInt(fHeight) > 0 && (
                              <div className="w-3 h-3 bg-stone-400 absolute bottom-1 left-0.5 rounded-sm border border-stone-500 shadow-sm z-30 flex items-center justify-center">
                                <span className="text-[5px] text-stone-900 font-extrabold">s</span>
                              </div>
                            )}
                          </div>

                          {/* Floating Quantity Badge in 'test tube corner' */}
                          <div className={`absolute top-2 -right-3 border font-mono text-[8px] font-black px-1 py-0.2 rounded shadow-lg z-35 select-none pointer-events-none scale-90 ${isLightMode ? 'bg-white/95 border-cyan-400 text-cyan-700' : 'bg-slate-900/95 border-cyan-500/30 text-cyan-350'}`}>
                            {getDefaultQuantity(r.formula).value}{getDefaultQuantity(r.formula).unit}
                          </div>

                          {/* Concentration label indicator (dil / conc) */}
                          <span className={`text-[9px] font-mono leading-none mt-0.5 absolute -top-[11px] px-1 rounded ${
                            r.concentration === "dilute"
                              ? isLightMode ? "bg-teal-100 border border-teal-400 text-teal-700" : "bg-teal-950/80 border border-teal-800 text-teal-400"
                              : isLightMode ? "bg-indigo-100 border border-indigo-400 text-indigo-700" : "bg-indigo-950/80 border border-indigo-800 text-indigo-400"
                          }`}>
                            {r.concentration === "dilute" ? "dil" : "conc"}
                          </span>

                          {/* Chemical Marker label with quantity and moles aside/under tubes */}
                          <div className="mt-1 flex flex-col items-center gap-0.5 w-full">
                            <div className={`rounded px-1.5 py-0.5 w-full max-w-[120px] text-center z-20 shadow-md border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#090f1d] border-slate-800'}`}>
                              <span className={`text-[10px] font-mono font-black leading-normal block ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                                {renderFormattedFormula(r.formula, isLightMode)}
                              </span>
                            </div>

                            <div className={`text-[8.5px] font-mono font-bold whitespace-nowrap ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>
                              {calcMoles(r).toFixed(2)} mol
                            </div>
                          </div>

                          {/* Liquid pouring stream inside motion.div so it automatically tracks the moving lip */}
                          {pouringNow && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 110 }} // long stream reaching the beaker
                              exit={{ opacity: 0 }}
                              className="absolute z-50 w-1 rounded-b-full pointer-events-none shadow"
                              style={{
                                backgroundColor: fluidColor,
                                left: "50%", 
                                top: "0px", // near the lip of the tube
                                transform: `rotate(${isLeft ? -65 : 65}deg)`,
                                transformOrigin: "top center"
                              }}
                            />
                          )}
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center opacity-15">
                          <div className={`w-4 h-16 border-b border-x rounded-b-full ${isLightMode ? 'border-slate-400 bg-slate-200/40' : 'border-slate-700 bg-slate-950/20'}`} />
                          <span className={`text-[9px] font-mono mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Empty {idx + 1}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* If result is complete, show the product form quantities right here inside the rack / aside of tubes */}
              {result && result.productsData && result.productsData.length > 0 && (
                <div className={`w-full mt-3 pt-2.5 border-t flex flex-col items-center ${isLightMode ? 'border-slate-200' : 'border-slate-800/80'}`}>
                  <div className={`text-xs uppercase font-mono font-black tracking-wider mb-1.5 self-start flex items-center gap-1.5 leading-none ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Formed Beaker Liquid & Product Yields:
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center w-full">
                    {result.productsData.map((compound, pIdx) => {
                      const limitingMoles = Math.min(...reactants.slice(0, numReactants).filter(r1 => r1.formula).map(r1 => calcMoles(r1)));
                      const mw = getMolecularWeightForReactant(compound.formula);
                      const productName = compound.formula;
                      const limitingReactantVal = limitingMoles > 0 ? limitingMoles : 0.055;
                      const productGrams = limitingReactantVal * mw;
                      const defaultUnit = getDefaultUnitForReactant(productName);
                      const amountStr = defaultUnit === "mL"
                        ? `${(productGrams / getDensityForReactant(productName)).toFixed(1)} ml`
                        : `${productGrams.toFixed(1)} gm`;

                      return (
                        <div key={pIdx} className={`rounded-lg px-2.5 py-1.5 flex flex-col items-center min-w-[80px] text-center shadow-md border ${isLightMode ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-950/15 border-emerald-900/40'}`}>
                          <span className={`text-xs font-mono font-black mb-0.5 ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>{renderFormattedFormula(compound.formula, isLightMode)}</span>
                          <span className={`text-[10px] font-mono leading-none mt-0.5 ${isLightMode ? 'text-cyan-700' : 'text-cyan-350'}`}>{amountStr}</span>
                          <span className={`text-[9px] font-mono leading-none mt-1 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>{limitingReactantVal.toFixed(3)} Moles</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Animated 2D Beaker/Apparatus */}
            <div className={`relative ${reactantA || reactantB ? 'my-3' : 'my-5'} flex flex-col items-center transition-all`}>
              
              {/* Explosion flash overlay */}
              {result && result.dangerLevel === "explosive" && (
                <div className="absolute inset-0 z-40 flex items-center justify-center animate-ping pointer-events-none">
                  <div className="w-48 h-48 bg-amber-500/30 rounded-full blur-2xl"></div>
                </div>
              )}

              {/* Borosilicate Beaker Container with fluid inside */}
              <div id="2d-beaker-stage" className={`relative w-44 h-48 border-b-4 border-x-4 rounded-b-3xl flex flex-col justify-end overflow-hidden shadow-2xl transition-all ${isLightMode ? 'border-slate-400 bg-slate-200/30' : 'border-slate-200/85 bg-slate-950/20'}`}>
                
                {/* Fluid Liquid Level */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ 
                    height: result 
                      ? (result.reactionFeasible ? "70%" : "20%") 
                      : loading
                      ? `${20 + (stageProgress / 100) * 50}%` // gradual fluid fill-up from 20% to 70%
                      : "20%",
                    backgroundColor: result 
                      ? (simulatedTime < 80 
                          ? getChemicalRGB(result.visuals?.solutionColorStart)
                          : getChemicalRGB(result.visuals?.solutionColorEnd))
                      : loading
                      ? stageProgress < 15
                        ? "rgba(56, 189, 248, 0.15)"
                        : getChemicalColor(reactants[Math.min(numReactants - 1, Math.floor(((stageProgress - 10) / 80) * numReactants))]?.formula || "").bg
                      : "rgba(56, 189, 248, 0.15)"
                  }}
                  transition={{ duration: 1.5 }}
                  className="w-full absolute bottom-0 relative overflow-hidden flex flex-col"
                >
                  {/* Wave effect at fluid surface */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-white/10 animate-pulse"></div>

                  {/* Bubble Ebullition generation */}
                  {(result && result.visuals?.hasBubbles && simulatedTime > 20 && simulatedTime < 99) && (
                    <div id="bubble-generator" className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute bottom-2 left-6 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce duration-1000"></div>
                      <div className="absolute bottom-5 left-15 w-2 h-2 bg-white/45 rounded-full animate-bounce duration-750"></div>
                      <div className="absolute bottom-1 right-10 w-1.5 h-1.5 bg-[#4ade80]/30 rounded-full animate-bounce duration-500"></div>
                      <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>
                      <div className="absolute bottom-12 right-6 w-2 h-2 bg-white/35 rounded-full animate-bounce"></div>
                    </div>
                  )}

                  {/* Settling Precipitate layer rendering at container bottom */}
                  {result && result.visuals?.precipitateColor && simulatedTime > 40 && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "14px" }}
                      className="absolute bottom-0 inset-x-0 transition-colors duration-1000 rounded-b-xl"
                      style={{ backgroundColor: getChemicalRGB(result.visuals.precipitateColor, true) }}
                    />
                  )}
                </motion.div>

                {/* Substrate/Reactant A solid bar or piece dropping inside beaker (e.g. Iron strip) after pouring is completed */}
                {(loading || result) && reactantA && (getChemicalColor(reactantA).isSolid || reactantA.toUpperCase() === "FE" || reactantA.toUpperCase() === "NA" || reactantA.toUpperCase() === "CU") && (
                  <motion.div 
                    initial={{ y: -100, opacity: 0 }}
                    animate={
                      loading && stageProgress < 45
                        ? { y: -100, opacity: 0 }
                        : { y: 0, opacity: 0.85 }
                    }
                    transition={{ type: "spring", stiffness: 80, damping: 14 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-36 bg-stone-500 rounded-b-md border border-stone-600/80 shadow z-10 opacity-70"
                    style={{
                      backgroundColor: getChemicalColor(reactantA).bg
                    }}
                  >
                    <div className="text-[9.5px] uppercase font-bold tracking-widest rotate-90 origin-left ml-2 mt-5 text-stone-250 font-mono">
                      {reactantA}
                    </div>
                  </motion.div>
                )}

                {/* Static grid measurement lines */}
                <div className={`absolute top-10 left-3 text-[10.5px] font-mono z-20 select-none ${isLightMode ? 'text-slate-500' : 'text-slate-450'}`}>150 mL</div>
                <div className={`absolute top-18 left-3 text-[10.5px] font-mono z-20 select-none ${isLightMode ? 'text-slate-500' : 'text-slate-450'}`}>100 mL</div>
                <div className={`absolute top-26 left-3 text-[10.5px] font-mono z-20 select-none ${isLightMode ? 'text-slate-500' : 'text-slate-450'}`}>50 mL</div>

                <div className={`absolute top-10 right-3 border-t w-2 ${isLightMode ? 'border-slate-400' : 'border-slate-600'}`}></div>
                <div className={`absolute top-18 right-3 border-t w-2 ${isLightMode ? 'border-slate-400' : 'border-slate-600'}`}></div>
                <div className={`absolute top-26 right-3 border-t w-2 ${isLightMode ? 'border-slate-400' : 'border-slate-600'}`}></div>
              </div>

              {/* Solid support clamp base holding the beaker */}
              <div className="w-52 h-2.5 bg-slate-700/80 rounded-full shadow-md mt-1"></div>
              
              {/* Bunsen Burner heating device rendering */}
              <div className="relative w-12 h-16 mt-1.25 flex flex-col items-center">
                {/* Flame rising towards the beaker */}
                {temperature > 0 && (
                  <div className="absolute -top-7 flex flex-col items-center select-none pointer-events-none">
                    {/* Outer Flame */}
                    <div className={`rounded-full filter blur-[1px] animate-pulse transition-all duration-300 ${
                      temperature > 200 
                        ? 'w-6 h-10 bg-amber-500/50' 
                        : 'w-4 h-7 bg-cyan-400/45'
                    }`}></div>
                    {/* Inner Flame Core */}
                    <div className={`absolute bottom-0 rounded-full transition-all duration-300 ${
                      temperature > 200
                        ? 'w-3 h-6 bg-red-600/70'
                        : 'w-2 h-4 bg-blue-500/85'
                    }`}></div>
                  </div>
                )}
                {/* Gas stem */}
                <div className="w-2.5 h-10 bg-zinc-650 border-x border-zinc-500 shadow"></div>
                {/* Gas adjustment knob */}
                <div className="w-4 h-1 bg-zinc-800 rounded"></div>
                {/* Heavy iron ring base of the burner */}
                <div className="w-10 h-2 bg-zinc-800 rounded shadow"></div>
              </div>

              <div className="w-1.5 h-6 bg-slate-600 shadow"></div>
              {/* Wooden bench base details */}
              <div className="w-28 h-2.5 shadow rounded flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#4a2c1b", borderTop: "2.5px solid #6b442e" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
              </div>
            </div>

            {/* Visual description caption box */}
            <div className="w-full text-center">
              {result ? (
                <div className={`p-3 rounded-xl text-center select-all border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'}`}>
                  <span className={`text-xs uppercase font-mono font-bold tracking-wide block mb-1 ${isLightMode ? 'text-cyan-700' : 'text-[#22d3ee]'}`}>
                    Live Apparatus Feed:
                  </span>
                  <p className={`text-xs leading-normal italic font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-350'}`}>
                    "{result.visuals?.animationDescription || "Reaction is running under steady environmental parameters."}"
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className={`text-xs font-mono italic ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    Chamber currently empty. Define environmental bounds and click ignite.
                  </p>
                </div>
              )}
            </div>

            {/* Laboratory Shelf and specimen Rack visualizer */}
            <div className={`w-full rounded-xl p-3 space-y-2 select-none border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/45 border-slate-800/60'}`}>
              <div className={`text-xs uppercase font-mono font-black tracking-wider flex items-center justify-between ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                <span className="flex items-center gap-1"><Beaker className={`w-3 h-3 ${isLightMode ? 'text-cyan-700' : 'text-cyan-400'}`} /> Laboratory Cabinet Shelf</span>
                <span className={`text-[10px] ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>Ventilation On</span>
              </div>
              <div className="flex items-end justify-center gap-3.5 pt-1">
                {/* Test tube 1 - acid */}
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-10 border-2 rounded-b-full relative overflow-hidden flex flex-col justify-end ${isLightMode ? 'border-slate-400/75 bg-slate-100' : 'border-slate-400/75 bg-slate-950/40'}`}>
                    <div className="absolute inset-0 bg-red-500/25 h-3/4 bottom-0 animate-pulse"></div>
                  </div>
                  <span className={`text-[9.5px] font-mono mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>HCl</span>
                </div>
                {/* Test tube 2 - base */}
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-10 border-2 rounded-b-full relative overflow-hidden flex flex-col justify-end ${isLightMode ? 'border-slate-400/75 bg-slate-100' : 'border-slate-400/75 bg-slate-950/40'}`}>
                    <div className="absolute inset-0 bg-emerald-500/25 h-1/2 bottom-0"></div>
                  </div>
                  <span className={`text-[9.5px] font-mono mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>NaOH</span>
                </div>
                {/* Reagent jar 1 - copper sulfate crystal */}
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-8 border-2 rounded relative overflow-hidden flex flex-col justify-end ${isLightMode ? 'border-slate-400/75 bg-slate-100' : 'border-slate-400/75 bg-slate-950/40'}`}>
                    <div className="absolute inset-x-0 bottom-0 bg-blue-600/40 h-1/3"></div>
                    <span className={`absolute inset-0 flex items-center justify-center text-[7px] font-bold scale-75 font-sans leading-none uppercase ${isLightMode ? 'text-blue-700' : 'text-blue-300'}`}>SO4</span>
                  </div>
                  <span className={`text-[9.5px] font-mono mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>CuSO4</span>
                </div>
                {/* Erlenmeyer Flask 1 - water */}
                <div className="flex flex-col items-center">
                  <div className="w-6 h-8 relative flex flex-col justify-end items-center overflow-hidden">
                    {/* Erlenmeyer outline SVG */}
                    <svg className={`w-6 h-8 stroke-current fill-none absolute inset-0 z-10 ${isLightMode ? 'text-slate-500/75' : 'text-slate-400/75'}`} viewBox="0 0 24 24">
                      <path d="M10 2h4M12 2v6M6 22l4-14h4l4 14H6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="w-5 h-4 bg-cyan-400/20 absolute bottom-1 rounded-b-md"></div>
                  </div>
                  <span className={`text-[9.5px] font-mono mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>H2O</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dynamic High-Yield Scientific Outputs */}
          <div className="flex-1 p-5 lg:overflow-y-auto select-text">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-8 space-y-4"
                >
                  <Beaker className={`w-12 h-12 animate-spin ${isLightMode ? 'text-cyan-700' : 'text-cyan-400'}`} />
                  <div className="text-center">
                    <h3 className={`text-base font-bold uppercase font-mono ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>Solving molecular kinetics...</h3>
                    <p className={`text-[11px] mt-1 font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>Contacting thermodynamic databases (NIST WebBook) & querying chemistry series.</p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-xl space-y-3 border ${isLightMode ? 'bg-rose-50 border-rose-300' : 'bg-rose-950/20 border-rose-500/30'}`}
                >
                  <div className={`flex items-center gap-2 ${isLightMode ? 'text-rose-700' : 'text-rose-400'}`}>
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <h3 className="font-bold text-sm font-mono uppercase">Simulation Aborted / Missing Keys</h3>
                  </div>
                  <p className={`text-xs leading-relaxed font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                    {error}
                  </p>
                  <div className={`p-3 rounded-lg border text-xs font-sans leading-relaxed ${isLightMode ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-950/80 border-slate-900 text-slate-400'}`}>
                    <span className={`font-bold uppercase block mb-1 ${isLightMode ? 'text-amber-700' : 'text-amber-400'}`}>Pedagogical Suggestion:</span>
                    The open-ended engine responds programmatically. However, to guarantee real-time offline success under all network bandwidths, try typing or clicking a canonical curriculum reaction:
                    <ul className={`list-disc pl-4 mt-1.5 space-y-1 text-xs font-mono ${isLightMode ? 'text-cyan-700' : 'text-[#22d3ee]'}`}>
                      <li>Fe + CuSO4 (displacement)</li>
                      <li>Cu + ZnSO4 (no reaction series demo)</li>
                      <li>Na + H2O (exothermic strain demo)</li>
                      <li>HCl + NaOH (acid-base neutralization)</li>
                      <li>Propene + HBr (Markovnikov / Anti-Markovnikov What-if)</li>
                      <li>BaCl2 + Na2SO4 (double displacement milky ppt)</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Balanced Equation Display */}
                  <div className={`p-4 rounded-xl relative overflow-hidden shadow-md border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1222] border-slate-800'}`}>
                    <div className={`absolute top-2 right-3 text-[11px] font-mono uppercase font-black ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      Balanced Formula
                    </div>

                    {/* Reaction header */}
                    <div className={`flex items-center gap-1.5 text-xs uppercase font-mono font-black mb-1.5 ${isLightMode ? 'text-cyan-700' : 'text-[#22d3ee]'}`}>
                      <span className={`px-1.5 py-0.5 rounded text-[11px] ${isLightMode ? 'bg-cyan-100' : 'bg-[#122b3f]'}`}>
                        {result.reactionClass}
                      </span>
                      {result.dangerLevel === "explosive" && (
                        <span className={`px-1.5 py-0.5 rounded text-[11px] flex items-center gap-1 ${isLightMode ? 'bg-rose-100 text-rose-700' : 'bg-rose-950/60 text-rose-400'}`}>
                          <AlertTriangle className={`w-3 h-3 ${isLightMode ? 'text-rose-700' : 'text-rose-400'}`} /> EXPLOSIVE
                        </span>
                      )}
                    </div>

                    <div className={`text-xl sm:text-2xl font-mono font-black tracking-wider py-1 select-all flex items-center ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                      {renderFormattedFormula(result.balancedEquation, isLightMode)}
                    </div>

                    {/* Spontaneity check stamp */}
                    <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-xs font-mono ${isLightMode ? 'border-slate-200' : 'border-slate-800/80'}`}>
                      <span className={`font-bold ${isLightMode ? 'text-slate-600' : 'text-slate-450'}`}>Gibbs Feasibility Status:</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 ${
                        result.reactionFeasible && result.isSpontaneous
                          ? isLightMode ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                          : isLightMode ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-rose-950/60 text-rose-400 border border-rose-500/20'
                      }`}>
                        {result.reactionFeasible && result.isSpontaneous ? (
                          <>
                            <CheckCircle2 className={`w-3.5 h-3.5 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`} />
                            <span>Spontaneous (ΔG &lt; 0)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className={`w-3.5 h-3.5 ${isLightMode ? 'text-rose-700' : 'text-rose-400'}`} />
                            <span>Non-Spontaneous (ΔG &gt; 0) / Blocked</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Thermodynamic Energy Profile Box with Toggle Controller */}
                  <div className={`p-3.5 rounded-xl space-y-3 border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#0b1222]/40 border-slate-800/80'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <Gauge className={`w-4 h-4 ${isLightMode ? 'text-cyan-700' : 'text-[#22d3ee]'}`} />
                        <div>
                          <h4 className={`text-sm uppercase font-mono font-black ${isLightMode ? 'text-slate-800' : 'text-slate-205'}`}>Thermodynamic Options</h4>
                          <p className={`text-[11.5px] font-sans ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>Enthalpy (ΔH), Entropy (ΔS) and Gibbs Free Energy (ΔG)</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowThermo(!showThermo)}
                        className={`px-3.5 py-1.5 rounded-lg border text-xs font-black transition-all duration-150 shrink-0 flex items-center gap-1.5 cursor-pointer select-none uppercase ${
                          showThermo
                            ? isLightMode
                              ? 'bg-cyan-100 border-cyan-400 text-cyan-800 shadow-sm'
                              : 'bg-cyan-950/40 border-cyan-400 text-[#22d3ee] shadow-sm shadow-cyan-500/10'
                            : isLightMode
                              ? 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400'
                              : 'bg-slate-950 border-slate-800 text-slate-350 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>{showThermo ? "Hide Options" : "Show Options"}</span>
                      </button>
                    </div>

                    {showThermo && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t ${isLightMode ? 'border-slate-200' : 'border-slate-800/40'}`}
                      >
                        <div className={`p-3.5 rounded-lg text-center border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1222]/80 border-slate-800/80'}`}>
                          <div className={`text-[11px] uppercase font-mono font-black ${isLightMode ? 'text-slate-600' : 'text-slate-450'}`}>Standard Enthalpy ΔH°</div>
                          <div className={`text-base font-mono mt-1 font-black ${isLightMode ? 'text-rose-700' : 'text-rose-400'}`}>{result.deltaH_rxn} kJ/mol</div>
                          <span className={`text-[10.5px] font-sans ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>{result.thermoType} profile</span>
                        </div>
                        <div className={`p-3.5 rounded-lg text-center border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1222]/80 border-slate-800/80'}`}>
                          <div className={`text-[11px] uppercase font-mono font-black ${isLightMode ? 'text-slate-600' : 'text-slate-450'}`}>Standard Entropy ΔS°</div>
                          <div className={`text-base font-mono mt-1 font-black ${isLightMode ? 'text-cyan-700' : 'text-[#22d3ee]'}`}>{result.deltaS_rxn} J/(mol K)</div>
                          <span className={`text-[10.5px] font-sans ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Kinetics shift</span>
                        </div>
                        <div className={`p-3.5 rounded-lg text-center border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1222]/80 border-slate-800/80'}`}>
                          <div className={`text-[11px] uppercase font-mono font-black ${isLightMode ? 'text-slate-600' : 'text-slate-450'}`}>Free Energy ΔG (Calculated)</div>
                          <div className={`text-base font-mono mt-1 font-black ${result.calculatedDeltaG < 0 ? (isLightMode ? 'text-emerald-700' : 'text-emerald-400') : (isLightMode ? 'text-rose-700' : 'text-rose-400')}`}>
                            {result.calculatedDeltaG} kJ
                          </div>
                          <span className={`text-[10.5px] font-sans font-mono font-bold ${isLightMode ? 'text-slate-500' : 'text-slate-505'}`}>@ {temperature}°C T-factor</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Organic Markovnikov Selection Metrics if applicable */}
                  {(result.majorProduct || result.minorProduct) && (
                    <div className={`p-4 rounded-xl space-y-2 font-mono border ${isLightMode ? 'bg-teal-50 border-teal-300' : 'bg-teal-950/15 border-teal-500/20'}`}>
                      <h4 className={`text-sm uppercase font-black tracking-wider flex items-center gap-1.5 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>
                        <Sparkles className={`w-3.5 h-3.5 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`} />
                        Reaction Outcome
                      </h4>
                      <div className="grid grid-cols-2 gap-4 pt-1">
                        <div className={`p-2.5 rounded border ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-950/50 border-slate-900'}`}>
                          <span className={`text-sm uppercase block mb-0.5 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>Major Product</span>
                          <span className={`text-base font-bold block ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{result.majorProduct}</span>
                        </div>
                        <div className={`p-2.5 rounded border ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-950/50 border-slate-900'}`}>
                          <span className={`text-sm uppercase block mb-0.5 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>Minor Product</span>
                          <span className={`text-base block ${isLightMode ? 'text-slate-700' : 'text-slate-350'}`}>{result.minorProduct || "None observed / traces"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pedagogical Tabs for CBSE, JEE & NEET Drilldowns */}
                  <div className={`rounded-xl overflow-hidden shadow-lg border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1222]/50 border-slate-800'}`}>
                    <div className={`flex border-b select-none text-sm ${isLightMode ? 'border-slate-200 bg-slate-50 text-slate-500' : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                      <button
                        onClick={() => setActiveTab("foundational")}
                        className={`flex-1 py-3 text-center text-xs font-black border-b-2 transition duration-150 cursor-pointer ${
                          activeTab === "foundational"
                            ? isLightMode
                              ? 'text-cyan-700 bg-white border-cyan-500'
                              : 'text-cyan-400 bg-[#0b1222] border-cyan-400'
                            : isLightMode
                              ? 'border-transparent text-slate-500 hover:bg-slate-100'
                              : 'border-transparent text-slate-450 hover:bg-slate-900/60'
                        }`}
                      >
                        Basic Concept
                      </button>
                      <button
                        onClick={() => setActiveTab("advanced")}
                        className={`flex-1 py-3 text-center text-xs font-black border-b-2 transition duration-150 cursor-pointer ${
                          activeTab === "advanced"
                            ? isLightMode
                              ? 'text-cyan-700 bg-white border-cyan-500'
                              : 'text-cyan-400 bg-[#0b1222] border-cyan-400'
                            : isLightMode
                              ? 'border-transparent text-slate-500 hover:bg-slate-100'
                              : 'border-transparent text-slate-450 hover:bg-slate-900/60'
                        }`}
                      >
                        Advanced Concept
                      </button>
                      <button
                        onClick={() => setActiveTab("arrow")}
                        className={`flex-1 py-3 text-center text-xs font-black border-b-2 transition duration-150 cursor-pointer ${
                          activeTab === "arrow"
                            ? isLightMode
                              ? 'text-cyan-700 bg-white border-cyan-500'
                              : 'text-cyan-400 bg-[#0b1222] border-cyan-400'
                            : isLightMode
                              ? 'border-transparent text-slate-500 hover:bg-slate-100'
                              : 'border-transparent text-slate-450 hover:bg-slate-900/60'
                        }`}
                      >
                        Mechanism
                      </button>
                    </div>

                    <div className={`p-5 leading-relaxed text-sm min-h-[420px] flex flex-col justify-start ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                      {activeTab === "foundational" && (
                        <div className="space-y-3">
                          <h4 className={`font-bold uppercase font-mono text-xs tracking-wider border-b pb-1.5 flex items-center gap-1 ${isLightMode ? 'text-slate-700 border-slate-200' : 'text-[#b1c2d9] border-slate-800/40'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Why This Happened:
                          </h4>
                          <p className={`font-sans leading-relaxed antialiased text-sm ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                            {renderDescriptionWithSubscripts(result.conceptualExplanationFoundational || "No foundational explanation retrieved.", isLightMode)}
                          </p>
                        </div>
                      )}

                      {activeTab === "advanced" && (
                        <div className="space-y-3">
                          <h4 className={`font-bold uppercase font-mono text-xs tracking-wider border-b pb-1.5 flex items-center gap-1 ${isLightMode ? 'text-slate-700 border-slate-200' : 'text-[#b1c2d9] border-slate-800/40'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Competitive Drilldown:
                          </h4>
                          <p className={`font-mono leading-relaxed text-xs ${isLightMode ? 'text-emerald-700' : 'text-emerald-350'}`}>
                            {renderDescriptionWithSubscripts(result.conceptualExplanationAdvanced || "No advanced thermodynamic review available.", isLightMode)}
                          </p>
                        </div>
                      )}

                      {activeTab === "arrow" && (
                        <div className="space-y-3 flex flex-col h-full flex-grow">
                          <h4 className={`font-bold uppercase font-mono text-xs tracking-wider border-b pb-1.5 flex items-center gap-1 ${isLightMode ? 'text-slate-700 border-slate-200' : 'text-[#b1c2d9] border-slate-800/40'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Electron Exchange / Mechanism Profile:
                          </h4>
                          {result.arrowPushingDetails ? (
                            <pre className={`p-4 rounded-lg border font-mono text-xs whitespace-pre-wrap leading-relaxed select-all flex-grow min-h-[160px] ${isLightMode ? 'bg-slate-50 border-slate-200 text-cyan-700' : 'bg-slate-950/90 border-slate-900/80 text-[#22d3ee]'}`}>
                              {renderDescriptionWithSubscripts(result.arrowPushingDetails, isLightMode)}
                            </pre>
                          ) : (
                            <p className={`font-sans italic text-sm ${isLightMode ? 'text-slate-500' : 'text-slate-450'}`}>
                              No complex electron pathway is active. Check standard Redox or acid-base ionic balancing instead.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Teacher's / Smart Corrective Advice */}
                  {result.advice && result.advice.length > 0 && (
                    <div className={`p-4 rounded-xl border ${isLightMode ? 'bg-amber-50 border-amber-200' : 'bg-[#111626]/80 border-slate-800/85'}`}>
                      <div className={`text-xs uppercase font-mono font-bold mb-2 flex items-center gap-1.5 ${isLightMode ? 'text-amber-700' : 'text-amber-400'}`}>
                        <Info className={`w-3.5 h-3.5 ${isLightMode ? 'text-amber-700' : 'text-amber-400'}`} />
                        Laboratory Advices
                      </div>
                      <ul className={`list-disc pl-4 space-y-1.5 text-sm font-sans ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                        {result.advice.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Real Compound Data cards */}
                  <div className={`rounded-xl p-4 border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#080d19] border-slate-800'}`}>
                    <h4 className={`text-xs uppercase font-bold font-mono tracking-wider mb-2.5 flex items-center justify-between ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                      <span>Chemical Coordinates</span>
                      <span className={isLightMode ? 'text-cyan-700 text-[10.5px]' : 'text-[#22d3ee] text-[10.5px]'}>API Real-time Verified</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-1">
                      {result.reactantsData.map((compound, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border font-mono flex flex-col justify-between ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/45 border-slate-900'}`}>
                          <div className={`flex items-center justify-between text-xs mb-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                            <span className="flex items-center gap-1">Reactant {idx + 1} ({renderFormattedFormula(compound.formula, isLightMode)})</span>
                            <span className={`text-[9.5px] px-1.2 rounded ${isLightMode ? 'bg-slate-200 text-slate-600' : 'bg-slate-800 text-slate-350'}`}>CID: {compound.pubchemId || "None"}</span>
                          </div>
                          <div className={`text-sm font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{compound.name}</div>
                          {compound.iupacName && (
                            <div className={`text-[10px] truncate mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>IUPAC: {compound.iupacName}</div>
                          )}
                          {compound.molecularWeight && (
                            <div className={`text-[11px] mt-1 ${isLightMode ? 'text-emerald-700' : 'text-emerald-400'}`}>MW: {compound.molecularWeight} g/mol</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}

              {/* Default Welcome Frame */}
              {!result && !loading && !error && (
                <motion.div 
                  key="welcome"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center p-8 space-y-4 text-center max-w-md mx-auto"
                >
                  <Beaker className={`w-12 h-12 animate-pulse ${isLightMode ? 'text-teal-700' : 'text-teal-400'}`} />
                  <div>
                    <h3 className={`font-bold text-base uppercase tracking-wide font-mono ${isLightMode ? 'text-slate-800' : 'text-slate-205'}`}>Reactant Chamber Ready</h3>
                    <p className={`text-sm mt-1 pb-4 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                      Select or type chemical species inside the parameters dashboard, adjust temperature chamber registers, and run the reaction!
                    </p>
                    <div className={`rounded-xl p-4 text-xs font-sans text-left leading-normal space-y-2.5 shadow-md border ${isLightMode ? 'bg-teal-50 border-teal-300 text-slate-700' : 'bg-teal-950/15 border-teal-500/35 text-slate-350'}`}>
                      <span className={`font-bold text-sm flex items-center gap-1.5 leading-none ${isLightMode ? 'text-teal-700' : 'text-teal-300'}`}>
                        💡 Fun Chem Lab Experiments to Try:
                      </span>
                      <div className={`space-y-2 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                        <div className="flex items-start gap-1.5">
                          <span className={isLightMode ? 'text-teal-700 select-none' : 'text-teal-400 select-none'}>•</span>
                          <div>
                            <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>Color Change (Displacement):</strong> Put <code className={isLightMode ? 'bg-emerald-50 border border-emerald-300 text-emerald-700 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]' : 'bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]'}>Fe</code> and <code className={isLightMode ? 'bg-emerald-50 border border-emerald-300 text-emerald-700 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]' : 'bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]'}>CuSO4</code> in other tubes, click run, and watch Iron replace Copper!
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className={isLightMode ? 'text-teal-700 select-none' : 'text-teal-400 select-none'}>•</span>
                          <div>
                            <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>Fizzy Decomposition:</strong> Clear all tubes, select 1 tube with <code className={isLightMode ? 'bg-emerald-50 border border-emerald-300 text-emerald-700 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]' : 'bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]'}>ZnCO3</code> or <code className={isLightMode ? 'bg-emerald-50 border border-emerald-300 text-emerald-700 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]' : 'bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]'}>CaCO3</code>, and click Ignite Decomposition!
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className={isLightMode ? 'text-teal-700 select-none' : 'text-teal-400 select-none'}>•</span>
                          <div>
                            <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>Violent Reactions:</strong> Combine sodium metal <code className={isLightMode ? 'bg-emerald-50 border border-emerald-300 text-emerald-700 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]' : 'bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]'}>Na</code> with Water <code className={isLightMode ? 'bg-emerald-50 border border-emerald-300 text-emerald-700 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]' : 'bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]'}>H2O</code> to see a fast, spectacular exothermic burst!
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className={isLightMode ? 'text-teal-700 select-none' : 'text-teal-400 select-none'}>•</span>
                          <div>
                            <strong className={isLightMode ? 'text-slate-900' : 'text-white'}>Fizzy Gas Combustion:</strong> Combine charcoal <code className={isLightMode ? 'bg-emerald-50 border border-emerald-300 text-emerald-700 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]' : 'bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]'}>C</code> and <code className={isLightMode ? 'bg-emerald-50 border border-emerald-300 text-emerald-700 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]' : 'bg-slate-900 border border-slate-800 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold text-[10.5px]'}>O2</code> gas with Oxygen supply set to excess or limited!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
}

// Quick helper to fetch realistic RGB colors for reactants inside beaker fluid
function getChemicalRGB(colorName: string, isPrecipitate = false) {
  if (!colorName) return isPrecipitate ? "transparent" : "rgba(226, 232, 240, 0.15)";
  
  const colors: Record<string, string> = {
    clear: "rgba(235, 245, 255, 0.12)",
    blue: "rgba(14, 116, 144, 0.65)", // copper sulfate
    green: "rgba(16, 185, 129, 0.55)",
    emerald: "rgba(4, 120, 87, 0.55)", // iron sulfate
    pink: "rgba(244, 114, 182, 0.45)", // phenolphthalein endpoint
    brown: "rgba(161, 98, 7, 0.8)", // metallic copper solid
    white: "rgba(255, 255, 255, 0.85)", // barium sulfate ppt
    yellow: "rgba(250, 204, 21, 0.75)"
  };

  return colors[colorName.toLowerCase()] || "rgba(226, 232, 240, 0.15)";
}

function getChemicalColor(formula: string): { bg: string; text: string; isSolid: boolean; label: string } {
  const norm = formula ? formula.trim().toUpperCase() : "";
  if (norm.includes("CUSO4")) return { bg: "rgba(14, 116, 144, 0.75)", text: "#22d3ee", isSolid: false, label: "Blue CuSO₄" };
  if (norm.includes("CU")) return { bg: "rgba(161, 98, 7, 0.9)", text: "#ff8c00", isSolid: true, label: "Copper Metal" };
  if (norm.includes("FE")) return { bg: "rgba(115, 115, 115, 0.95)", text: "#cbd5e1", isSolid: true, label: "Iron Metal" };
  if (norm.includes("NAOH")) return { bg: "rgba(16, 185, 129, 0.45)", text: "#a7f3d0", isSolid: false, label: "NaOH (aq)" };
  if (norm.includes("H2O") || norm.includes("WATER")) return { bg: "rgba(56, 189, 248, 0.35)", text: "#38bdf8", isSolid: false, label: "H₂O" };
  if (norm.includes("HCL")) return { bg: "rgba(239, 68, 68, 0.4)", text: "#fca5a5", isSolid: false, label: "HCl (aq)" };
  if (norm.includes("HBR")) return { bg: "rgba(168, 85, 247, 0.45)", text: "#e9d5ff", isSolid: false, label: "HBr (aq)" };
  if (norm.includes("NA2SO4")) return { bg: "rgba(2, 132, 199, 0.4)", text: "#aeedff", isSolid: false, label: "Na₂SO₄ (aq)" };
  if (norm.includes("BACL2")) return { bg: "rgba(148, 163, 184, 0.4)", text: "#cbd5e1", isSolid: false, label: "BaCl₂ (aq)" };
  if (norm.includes("ZNSO4")) return { bg: "rgba(236, 72, 153, 0.45)", text: "#fbcfe8", isSolid: false, label: "ZnSO₄ (aq)" };
  if (norm.includes("NA")) return { bg: "rgba(234, 179, 8, 0.95)", text: "#fef08a", isSolid: true, label: "Sodium Metal" };
  if (norm.includes("PROPENE") || norm.includes("C3H6")) return { bg: "rgba(99, 102, 241, 0.5)", text: "#c7d2fe", isSolid: false, label: "Propene" };
  if (norm.includes("C6H14") || norm.includes("HEXANE")) return { bg: "rgba(186, 230, 253, 0.25)", text: "#7dd3fc", isSolid: false, label: "Hexane" };
  if (norm.includes("H2C2O4") || norm.includes("OXALIC")) return { bg: "rgba(248, 250, 252, 0.85)", text: "#f1f5f9", isSolid: true, label: "Oxalic Acid" };
  if (norm.includes("C18H36O2") || norm.includes("STEARIC")) return { bg: "rgba(255, 255, 255, 0.9)", text: "#ffffff", isSolid: true, label: "Stearic Acid" };
  if (norm.includes("C10H22") || norm.includes("DECANE")) return { bg: "rgba(224, 242, 254, 0.3)", text: "#bae6fd", isSolid: false, label: "Decane" };
  if (norm.includes("C5H10") || norm.includes("PENTENE")) return { bg: "rgba(186, 230, 253, 0.35)", text: "#93c5fd", isSolid: false, label: "Pentene" };
  if (norm.includes("C6H8O7") || norm.includes("CITRIC")) return { bg: "rgba(254, 254, 254, 0.88)", text: "#f8fafc", isSolid: true, label: "Citric Acid" };
  if (norm.includes("C4H6O6") || norm.includes("TARTARIC")) return { bg: "rgba(250, 250, 250, 0.85)", text: "#f1f5f9", isSolid: true, label: "Tartaric Acid" };
  if (norm.includes("H2CO3") || norm.includes("CARBONIC")) return { bg: "rgba(186, 242, 255, 0.45)", text: "#99f6ff", isSolid: false, label: "Carbonic Acid" };
  if (norm.includes("C6H12O6") || norm.includes("GLUCOSE") || norm.includes("FRUCTOSE")) return { bg: "rgba(255, 255, 255, 0.95)", text: "#ffffff", isSolid: true, label: "Glucose/Fructose" };
  if (norm.includes("C12H22O11") || norm.includes("MALTOSE")) return { bg: "rgba(245, 245, 240, 0.95)", text: "#f5f5f0", isSolid: true, label: "Maltose" };
  
  return { bg: "rgba(226, 232, 240, 0.25)", text: "#e2e8f0", isSolid: false, label: formula || "Unknown" };
}
