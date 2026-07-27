import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Download, X, Search, Info, Award, HelpCircle, Layers, Sparkles, Filter, RotateCw, Smartphone, Atom } from "lucide-react";

export interface ElementData {
  num: number;
  symbol: string;
  name: string;
  mass: string;
  row: number;
  col: number;
  category: string;
  block: "s" | "p" | "d" | "f";
  state: "gas" | "liquid" | "solid" | "synthetic";
  config: string;
  electronegativity?: number;
  melt?: number; // Kelvin
  boil?: number; // Kelvin
  discovered?: string;
}

// 118 Elements Detailed Dataset
export const ELEMENTS: ElementData[] = [
  // Period 1
  { num: 1, symbol: "H", name: "Hydrogen", mass: "1.008", row: 1, col: 1, category: "reactive-nonmetal", block: "s", state: "gas", config: "1s¹", electronegativity: 2.20, melt: 14.01, boil: 20.28, discovered: "1766" },
  { num: 2, symbol: "He", name: "Helium", mass: "4.0026", row: 1, col: 18, category: "noble-gas", block: "s", state: "gas", config: "1s²", electronegativity: undefined, melt: 0.95, boil: 4.22, discovered: "1868" },

  // Period 2
  { num: 3, symbol: "Li", name: "Lithium", mass: "6.94", row: 2, col: 1, category: "alkali-metal", block: "s", state: "solid", config: "[He] 2s¹", electronegativity: 0.98, melt: 453.69, boil: 1615, discovered: "1817" },
  { num: 4, symbol: "Be", name: "Beryllium", mass: "9.0122", row: 2, col: 2, category: "alkaline-earth-metal", block: "s", state: "solid", config: "[He] 2s²", electronegativity: 1.57, melt: 1560, boil: 2742, discovered: "1798" },
  { num: 5, symbol: "B", name: "Boron", mass: "10.81", row: 2, col: 13, category: "metalloid", block: "p", state: "solid", config: "[He] 2s² 2p¹", electronegativity: 2.04, melt: 2349, boil: 4200, discovered: "1808" },
  { num: 6, symbol: "C", name: "Carbon", mass: "12.011", row: 2, col: 14, category: "reactive-nonmetal", block: "p", state: "solid", config: "[He] 2s² 2p²", electronegativity: 2.55, melt: 3823, boil: 4300, discovered: "Ancient" },
  { num: 7, symbol: "N", name: "Nitrogen", mass: "14.007", row: 2, col: 15, category: "reactive-nonmetal", block: "p", state: "gas", config: "[He] 2s² 2p³", electronegativity: 3.04, melt: 63.15, boil: 77.36, discovered: "1772" },
  { num: 8, symbol: "O", name: "Oxygen", mass: "15.999", row: 2, col: 16, category: "reactive-nonmetal", block: "p", state: "gas", config: "[He] 2s² 2p⁴", electronegativity: 3.44, melt: 54.36, boil: 90.20, discovered: "1774" },
  { num: 9, symbol: "F", name: "Fluorine", mass: "18.998", row: 2, col: 17, category: "reactive-nonmetal", block: "p", state: "gas", config: "[He] 2s² 2p⁵", electronegativity: 3.98, melt: 53.53, boil: 85.03, discovered: "1886" },
  { num: 10, symbol: "Ne", name: "Neon", mass: "20.180", row: 2, col: 18, category: "noble-gas", block: "p", state: "gas", config: "[He] 2s² 2p⁶", electronegativity: undefined, melt: 24.56, boil: 27.07, discovered: "1898" },

  // Period 3
  { num: 11, symbol: "Na", name: "Sodium", mass: "22.990", row: 3, col: 1, category: "alkali-metal", block: "s", state: "solid", config: "[Ne] 3s¹", electronegativity: 0.93, melt: 370.87, boil: 1156, discovered: "1807" },
  { num: 12, symbol: "Mg", name: "Magnesium", mass: "24.305", row: 3, col: 2, category: "alkaline-earth-metal", block: "s", state: "solid", config: "[Ne] 3s²", electronegativity: 1.31, melt: 923, boil: 1363, discovered: "1755" },
  { num: 13, symbol: "Al", name: "Aluminium", mass: "26.982", row: 3, col: 13, category: "post-transition-metal", block: "p", state: "solid", config: "[Ne] 3s² 3p¹", electronegativity: 1.61, melt: 933.47, boil: 2792, discovered: "1825" },
  { num: 14, symbol: "Si", name: "Silicon", mass: "28.085", row: 3, col: 14, category: "metalloid", block: "p", state: "solid", config: "[Ne] 3s² 3p²", electronegativity: 1.90, melt: 1687, boil: 3538, discovered: "1823" },
  { num: 15, symbol: "P", name: "Phosphorus", mass: "30.974", row: 3, col: 15, category: "reactive-nonmetal", block: "p", state: "solid", config: "[Ne] 3s² 3p³", electronegativity: 2.19, melt: 317.30, boil: 553.6, discovered: "1669" },
  { num: 16, symbol: "S", name: "Sulfur", mass: "32.06", row: 3, col: 16, category: "reactive-nonmetal", block: "p", state: "solid", config: "[Ne] 3s² 3p⁴", electronegativity: 2.58, melt: 388.36, boil: 717.8, discovered: "Ancient" },
  { num: 17, symbol: "Cl", name: "Chlorine", mass: "35.45", row: 3, col: 17, category: "reactive-nonmetal", block: "p", state: "gas", config: "[Ne] 3s² 3p⁵", electronegativity: 3.16, melt: 171.6, boil: 239.11, discovered: "1774" },
  { num: 18, symbol: "Ar", name: "Argon", mass: "39.948", row: 3, col: 18, category: "noble-gas", block: "p", state: "gas", config: "[Ne] 3s² 3p⁶", electronegativity: undefined, melt: 83.80, boil: 87.30, discovered: "1894" },

  // Period 4
  { num: 19, symbol: "K", name: "Potassium", mass: "39.098", row: 4, col: 1, category: "alkali-metal", block: "s", state: "solid", config: "[Ar] 4s¹", electronegativity: 0.82, melt: 336.5, boil: 1032, discovered: "1807" },
  { num: 20, symbol: "Ca", name: "Calcium", mass: "40.078", row: 4, col: 2, category: "alkaline-earth-metal", block: "s", state: "solid", config: "[Ar] 4s²", electronegativity: 1.00, melt: 1115, boil: 1757, discovered: "1808" },
  { num: 21, symbol: "Sc", name: "Scandium", mass: "44.956", row: 4, col: 3, category: "transition-metal", block: "d", state: "solid", config: "[Ar] 3d¹ 4s²", electronegativity: 1.36, melt: 1814, boil: 3109, discovered: "1879" },
  { num: 22, symbol: "Ti", name: "Titanium", mass: "47.867", row: 4, col: 4, category: "transition-metal", block: "d", state: "solid", config: "[Ar] 3d² 4s²", electronegativity: 1.54, melt: 1941, boil: 3560, discovered: "1791" },
  { num: 23, symbol: "V", name: "Vanadium", mass: "50.942", row: 4, col: 5, category: "transition-metal", block: "d", state: "solid", config: "[Ar] 3d³ 4s²", electronegativity: 1.63, melt: 2183, boil: 3680, discovered: "1801" },
  { num: 24, symbol: "Cr", name: "Chromium", mass: "51.996", row: 4, col: 6, category: "transition-metal", block: "d", state: "solid", config: "[Ar] 3d⁵ 4s¹", electronegativity: 1.66, melt: 2180, boil: 2944, discovered: "1797" },
  { num: 25, symbol: "Mn", name: "Manganese", mass: "54.938", row: 4, col: 7, category: "transition-metal", block: "d", state: "solid", config: "[Ar] 3d⁵ 4s²", electronegativity: 1.55, melt: 1519, boil: 2334, discovered: "1774" },
  { num: 26, symbol: "Fe", name: "Iron", mass: "55.845", row: 4, col: 8, category: "transition-metal", block: "d", state: "solid", config: "[Ar] 3d⁶ 4s²", electronegativity: 1.83, melt: 1811, boil: 3134, discovered: "Ancient" },
  { num: 27, symbol: "Co", name: "Cobalt", mass: "58.933", row: 4, col: 9, category: "transition-metal", block: "d", state: "solid", config: "[Ar] 3d⁷ 4s²", electronegativity: 1.88, melt: 1768, boil: 3200, discovered: "1735" },
  { num: 28, symbol: "Ni", name: "Nickel", mass: "58.693", row: 4, col: 10, category: "transition-metal", block: "d", state: "solid", config: "[Ar] 3d⁸ 4s²", electronegativity: 1.91, melt: 1728, boil: 3186, discovered: "1751" },
  { num: 29, symbol: "Cu", name: "Copper", mass: "63.546", row: 4, col: 11, category: "transition-metal", block: "d", state: "solid", config: "[Ar] 3d¹⁰ 4s¹", electronegativity: 1.90, melt: 1357.77, boil: 2835, discovered: "Ancient" },
  { num: 30, symbol: "Zn", name: "Zinc", mass: "65.38", row: 4, col: 12, category: "transition-metal", block: "d", state: "solid", config: "[Ar] 3d¹⁰ 4s²", electronegativity: 1.65, melt: 692.68, boil: 1180, discovered: "1746" },
  { num: 31, symbol: "Ga", name: "Gallium", mass: "69.723", row: 4, col: 13, category: "post-transition-metal", block: "p", state: "solid", config: "[Ar] 3d¹⁰ 4s² 4p¹", electronegativity: 1.81, melt: 302.91, boil: 2673, discovered: "1875" },
  { num: 32, symbol: "Ge", name: "Germanium", mass: "72.630", row: 4, col: 14, category: "metalloid", block: "p", state: "solid", config: "[Ar] 3d¹⁰ 4s² 4p²", electronegativity: 2.01, melt: 1211.40, boil: 3106, discovered: "1886" },
  { num: 33, symbol: "As", name: "Arsenic", mass: "74.922", row: 4, col: 15, category: "metalloid", block: "p", state: "solid", config: "[Ar] 3d¹⁰ 4s² 4p³", electronegativity: 2.18, melt: 1090, boil: 887, discovered: "1250" },
  { num: 34, symbol: "Se", name: "Selenium", mass: "78.971", row: 4, col: 16, category: "reactive-nonmetal", block: "p", state: "solid", config: "[Ar] 3d¹⁰ 4s² 4p⁴", electronegativity: 2.55, melt: 494, boil: 958, discovered: "1817" },
  { num: 35, symbol: "Br", name: "Bromine", mass: "79.904", row: 4, col: 17, category: "reactive-nonmetal", block: "p", state: "liquid", config: "[Ar] 3d¹⁰ 4s² 4p⁵", electronegativity: 2.96, melt: 265.8, boil: 332, discovered: "1826" },
  { num: 36, symbol: "Kr", name: "Krypton", mass: "83.798", row: 4, col: 18, category: "noble-gas", block: "p", state: "gas", config: "[Ar] 3d¹⁰ 4s² 4p⁶", electronegativity: 3.00, melt: 115.79, boil: 119.93, discovered: "1898" },

  // Period 5
  { num: 37, symbol: "Rb", name: "Rubidium", mass: "85.468", row: 5, col: 1, category: "alkali-metal", block: "s", state: "solid", config: "[Kr] 5s¹", electronegativity: 0.82, melt: 312.46, boil: 961, discovered: "1861" },
  { num: 38, symbol: "Sr", name: "Strontium", mass: "87.62", row: 5, col: 2, category: "alkaline-earth-metal", block: "s", state: "solid", config: "[Kr] 5s²", electronegativity: 0.95, melt: 1050, boil: 1655, discovered: "1790" },
  { num: 39, symbol: "Y", name: "Yttrium", mass: "88.906", row: 5, col: 3, category: "transition-metal", block: "d", state: "solid", config: "[Kr] 4d¹ 5s²", electronegativity: 1.22, melt: 1799, boil: 3609, discovered: "1794" },
  { num: 40, symbol: "Zr", name: "Zirconium", mass: "91.224", row: 5, col: 4, category: "transition-metal", block: "d", state: "solid", config: "[Kr] 4d² 5s²", electronegativity: 1.33, melt: 2128, boil: 4682, discovered: "1789" },
  { num: 41, symbol: "Nb", name: "Niobium", mass: "92.906", row: 5, col: 5, category: "transition-metal", block: "d", state: "solid", config: "[Kr] 4d⁴ 5s¹", electronegativity: 1.6, melt: 2750, boil: 5017, discovered: "1801" },
  { num: 42, symbol: "Mo", name: "Molybdenum", mass: "95.95", row: 5, col: 6, category: "transition-metal", block: "d", state: "solid", config: "[Kr] 4d⁵ 5s¹", electronegativity: 2.16, melt: 2896, boil: 4912, discovered: "1778" },
  { num: 43, symbol: "Tc", name: "Technetium", mass: "(98)", row: 5, col: 7, category: "transition-metal", block: "d", state: "synthetic", config: "[Kr] 4d⁵ 5s²", electronegativity: 1.9, melt: 2430, boil: 4538, discovered: "1937" },
  { num: 44, symbol: "Ru", name: "Ruthenium", mass: "101.07", row: 5, col: 8, category: "transition-metal", block: "d", state: "solid", config: "[Kr] 4d⁷ 5s¹", electronegativity: 2.2, melt: 2607, boil: 4423, discovered: "1844" },
  { num: 45, symbol: "Rh", name: "Rhodium", mass: "102.91", row: 5, col: 9, category: "transition-metal", block: "d", state: "solid", config: "[Kr] 4d⁸ 5s¹", electronegativity: 2.28, melt: 2237, boil: 3968, discovered: "1803" },
  { num: 46, symbol: "Pd", name: "Palladium", mass: "106.42", row: 5, col: 10, category: "transition-metal", block: "d", state: "solid", config: "[Kr] 4d¹⁰", electronegativity: 2.20, melt: 1828.05, boil: 3236, discovered: "1803" },
  { num: 47, symbol: "Ag", name: "Silver", mass: "107.87", row: 5, col: 11, category: "transition-metal", block: "d", state: "solid", config: "[Kr] 4d¹⁰ 5s¹", electronegativity: 1.93, melt: 1234.93, boil: 2435, discovered: "Ancient" },
  { num: 48, symbol: "Cd", name: "Cadmium", mass: "112.41", row: 5, col: 12, category: "transition-metal", block: "d", state: "solid", config: "[Kr] 4d¹⁰ 5s²", electronegativity: 1.69, melt: 594.22, boil: 1040, discovered: "1817" },
  { num: 49, symbol: "In", name: "Indium", mass: "114.82", row: 5, col: 13, category: "post-transition-metal", block: "p", state: "solid", config: "[Kr] 4d¹⁰ 5s² 5p¹", electronegativity: 1.78, melt: 429.75, boil: 2345, discovered: "1863" },
  { num: 50, symbol: "Sn", name: "Tin", mass: "118.71", row: 5, col: 14, category: "post-transition-metal", block: "p", state: "solid", config: "[Kr] 4d¹⁰ 5s² 5p²", electronegativity: 1.96, melt: 505.08, boil: 2875, discovered: "Ancient" },
  { num: 51, symbol: "Sb", name: "Antimony", mass: "121.76", row: 5, col: 15, category: "metalloid", block: "p", state: "solid", config: "[Kr] 4d¹⁰ 5s² 5p³", electronegativity: 2.05, melt: 903.78, boil: 1860, discovered: "Ancient" },
  { num: 52, symbol: "Te", name: "Tellurium", mass: "127.60", row: 5, col: 16, category: "metalloid", block: "p", state: "solid", config: "[Kr] 4d¹⁰ 5s² 5p⁴", electronegativity: 2.10, melt: 722.66, boil: 1261, discovered: "1782" },
  { num: 53, symbol: "I", name: "Iodine", mass: "126.90", row: 5, col: 17, category: "reactive-nonmetal", block: "p", state: "solid", config: "[Kr] 4d¹⁰ 5s² 5p⁵", electronegativity: 2.66, melt: 386.85, boil: 457.4, discovered: "1811" },
  { num: 54, symbol: "Xe", name: "Xenon", mass: "131.29", row: 5, col: 18, category: "noble-gas", block: "p", state: "gas", config: "[Kr] 4d¹⁰ 5s² 5p⁶", electronegativity: 2.60, melt: 161.4, boil: 165.03, discovered: "1898" },

  // Period 6
  { num: 55, symbol: "Cs", name: "Caesium", mass: "132.91", row: 6, col: 1, category: "alkali-metal", block: "s", state: "solid", config: "[Xe] 6s¹", electronegativity: 0.79, melt: 301.59, boil: 944, discovered: "1860" },
  { num: 56, symbol: "Ba", name: "Barium", mass: "137.33", row: 6, col: 2, category: "alkaline-earth-metal", block: "s", state: "solid", config: "[Xe] 6s²", electronegativity: 0.89, melt: 1000, boil: 2170, discovered: "1774" },
  
  // Lanthanides (Z=57 to 71)
  { num: 57, symbol: "La", name: "Lanthanum", mass: "138.91", row: 9, col: 4, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 5d¹ 6s²", electronegativity: 1.1, melt: 1193, boil: 3737, discovered: "1839" },
  { num: 58, symbol: "Ce", name: "Cerium", mass: "140.12", row: 9, col: 5, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f¹ 5d¹ 6s²", electronegativity: 1.12, melt: 1068, boil: 3716, discovered: "1803" },
  { num: 59, symbol: "Pr", name: "Praseodymium", mass: "140.91", row: 9, col: 6, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f³ 6s²", electronegativity: 1.13, melt: 1208, boil: 3793, discovered: "1885" },
  { num: 60, symbol: "Nd", name: "Neodymium", mass: "144.24", row: 9, col: 7, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f⁴ 6s²", electronegativity: 1.14, melt: 1297, boil: 3347, discovered: "1885" },
  { num: 61, symbol: "Pm", name: "Promethium", mass: "(145)", row: 9, col: 8, category: "lanthanide", block: "f", state: "synthetic", config: "[Xe] 4f⁵ 6s²", electronegativity: 1.13, melt: 1308, boil: 3273, discovered: "1945" },
  { num: 62, symbol: "Sm", name: "Samarium", mass: "150.36", row: 9, col: 9, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f⁶ 6s²", electronegativity: 1.17, melt: 1345, boil: 2067, discovered: "1879" },
  { num: 63, symbol: "Eu", name: "Europium", mass: "151.96", row: 9, col: 10, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f⁷ 6s²", electronegativity: 1.2, melt: 1099, boil: 1802, discovered: "1901" },
  { num: 64, symbol: "Gd", name: "Gadolinium", mass: "157.25", row: 9, col: 11, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f⁷ 5d¹ 6s²", electronegativity: 1.2, melt: 1585, boil: 3546, discovered: "1880" },
  { num: 65, symbol: "Tb", name: "Terbium", mass: "158.93", row: 9, col: 12, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f⁹ 6s²", electronegativity: 1.2, melt: 1629, boil: 3503, discovered: "1843" },
  { num: 66, symbol: "Dy", name: "Dysprosium", mass: "162.50", row: 9, col: 13, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f¹⁰ 6s²", electronegativity: 1.22, melt: 1680, boil: 2840, discovered: "1886" },
  { num: 67, symbol: "Ho", name: "Holmium", mass: "164.93", row: 9, col: 14, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f¹¹ 6s²", electronegativity: 1.23, melt: 1734, boil: 2993, discovered: "1878" },
  { num: 68, symbol: "Er", name: "Erbium", mass: "167.26", row: 9, col: 15, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f¹² 6s²", electronegativity: 1.24, melt: 1802, boil: 3141, discovered: "1843" },
  { num: 69, symbol: "Tm", name: "Thulium", mass: "168.93", row: 9, col: 16, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f¹³ 6s²", electronegativity: 1.25, melt: 1818, boil: 2223, discovered: "1879" },
  { num: 70, symbol: "Yb", name: "Ytterbium", mass: "173.05", row: 9, col: 17, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f¹⁴ 6s²", electronegativity: 1.1, melt: 1097, boil: 1469, discovered: "1878" },
  { num: 71, symbol: "Lu", name: "Lutetium", mass: "174.97", row: 9, col: 18, category: "lanthanide", block: "f", state: "solid", config: "[Xe] 4f¹⁴ 5d¹ 6s²", electronegativity: 1.27, melt: 1925, boil: 3675, discovered: "1907" },

  // Rest of Period 6
  { num: 72, symbol: "Hf", name: "Hafnium", mass: "178.49", row: 6, col: 4, category: "transition-metal", block: "d", state: "solid", config: "[Xe] 4f¹⁴ 5d² 6s²", electronegativity: 1.3, melt: 2506, boil: 4876, discovered: "1923" },
  { num: 73, symbol: "Ta", name: "Tantalum", mass: "180.95", row: 6, col: 5, category: "transition-metal", block: "d", state: "solid", config: "[Xe] 4f¹⁴ 5d³ 6s²", electronegativity: 1.5, melt: 3290, boil: 5731, discovered: "1802" },
  { num: 74, symbol: "W", name: "Tungsten", mass: "183.84", row: 6, col: 6, category: "transition-metal", block: "d", state: "solid", config: "[Xe] 4f¹⁴ 5d⁴ 6s²", electronegativity: 2.36, melt: 3695, boil: 6203, discovered: "1783" },
  { num: 75, symbol: "Re", name: "Rhenium", mass: "186.21", row: 6, col: 7, category: "transition-metal", block: "d", state: "solid", config: "[Xe] 4f¹⁴ 5d⁵ 6s²", electronegativity: 1.9, melt: 3459, boil: 5869, discovered: "1925" },
  { num: 76, symbol: "Os", name: "Osmium", mass: "190.23", row: 6, col: 8, category: "transition-metal", block: "d", state: "solid", config: "[Xe] 4f¹⁴ 5d⁶ 6s²", electronegativity: 2.2, melt: 3306, boil: 5285, discovered: "1803" },
  { num: 77, symbol: "Ir", name: "Iridium", mass: "192.22", row: 6, col: 9, category: "transition-metal", block: "d", state: "solid", config: "[Xe] 4f¹⁴ 5d⁷ 6s²", electronegativity: 2.20, melt: 2719, boil: 4701, discovered: "1803" },
  { num: 78, symbol: "Pt", name: "Platinum", mass: "195.08", row: 6, col: 10, category: "transition-metal", block: "d", state: "solid", config: "[Xe] 4f¹⁴ 5d⁹ 6s¹", electronegativity: 2.28, melt: 2041.4, boil: 4098, discovered: "1735" },
  { num: 79, symbol: "Au", name: "Gold", mass: "196.97", row: 6, col: 11, category: "transition-metal", block: "d", state: "solid", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", electronegativity: 2.54, melt: 1337.33, boil: 3129, discovered: "Ancient" },
  { num: 80, symbol: "Hg", name: "Mercury", mass: "200.59", row: 6, col: 12, category: "transition-metal", block: "d", state: "liquid", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", electronegativity: 2.00, melt: 234.32, boil: 629.88, discovered: "Ancient" },
  { num: 81, symbol: "Tl", name: "Thallium", mass: "204.38", row: 6, col: 13, category: "post-transition-metal", block: "p", state: "solid", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹", electronegativity: 1.62, melt: 577, boil: 1746, discovered: "1861" },
  { num: 82, symbol: "Pb", name: "Lead", mass: "207.2", row: 6, col: 14, category: "post-transition-metal", block: "p", state: "solid", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", electronegativity: 2.33, melt: 600.61, boil: 2022, discovered: "Ancient" },
  { num: 83, symbol: "Bi", name: "Bismuth", mass: "208.98", row: 6, col: 15, category: "post-transition-metal", block: "p", state: "solid", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³", electronegativity: 2.02, melt: 544.7, boil: 1837, discovered: "1753" },
  { num: 84, symbol: "Po", name: "Polonium", mass: "(209)", row: 6, col: 16, category: "metalloid", block: "p", state: "solid", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴", electronegativity: 2.0, melt: 527, boil: 1235, discovered: "1898" },
  { num: 85, symbol: "At", name: "Astatine", mass: "(210)", row: 6, col: 17, category: "reactive-nonmetal", block: "p", state: "solid", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵", electronegativity: 2.2, melt: 575, boil: 610, discovered: "1940" },
  { num: 86, symbol: "Rn", name: "Radon", mass: "(222)", row: 6, col: 18, category: "noble-gas", block: "p", state: "gas", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶", electronegativity: 2.2, melt: 202, boil: 211.3, discovered: "1899" },

  // Period 7
  { num: 87, symbol: "Fr", name: "Francium", mass: "(223)", row: 7, col: 1, category: "alkali-metal", block: "s", state: "solid", config: "[Rn] 7s¹", electronegativity: 0.79, melt: 300, boil: 950, discovered: "1939" },
  { num: 88, symbol: "Ra", name: "Radium", mass: "(226)", row: 7, col: 2, category: "alkaline-earth-metal", block: "s", state: "solid", config: "[Rn] 7s²", electronegativity: 0.9, melt: 973, boil: 2010, discovered: "1898" },

  // Actinides (Z=89 to 103)
  { num: 89, symbol: "Ac", name: "Actinium", mass: "(227)", row: 10, col: 4, category: "actinide", block: "f", state: "solid", config: "[Rn] 6d¹ 7s²", electronegativity: 1.1, melt: 1323, boil: 3471, discovered: "1899" },
  { num: 90, symbol: "Th", name: "Thorium", mass: "232.04", row: 10, col: 5, category: "actinide", block: "f", state: "solid", config: "[Rn] 6d² 7s²", electronegativity: 1.3, melt: 2115, boil: 5061, discovered: "1829" },
  { num: 91, symbol: "Pa", name: "Protactinium", mass: "231.04", row: 10, col: 6, category: "actinide", block: "f", state: "solid", config: "[Rn] 5f² 6d¹ 7s²", electronegativity: 1.5, melt: 1841, boil: 4300, discovered: "1913" },
  { num: 92, symbol: "U", name: "Uranium", mass: "238.03", row: 10, col: 7, category: "actinide", block: "f", state: "solid", config: "[Rn] 5f³ 6d¹ 7s²", electronegativity: 1.38, melt: 1405.3, boil: 4404, discovered: "1789" },
  { num: 93, symbol: "Np", name: "Neptunium", mass: "(237)", row: 10, col: 8, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f⁴ 6d¹ 7s²", electronegativity: 1.36, melt: 917, boil: 4273, discovered: "1940" },
  { num: 94, symbol: "Pu", name: "Plutonium", mass: "(244)", row: 10, col: 9, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f⁶ 7s²", electronegativity: 1.28, melt: 912.5, boil: 3501, discovered: "1940" },
  { num: 95, symbol: "Am", name: "Americium", mass: "(243)", row: 10, col: 10, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f⁷ 7s²", electronegativity: 1.3, melt: 1449, boil: 2880, discovered: "1944" },
  { num: 96, symbol: "Cm", name: "Curium", mass: "(247)", row: 10, col: 11, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f⁷ 6d¹ 7s²", electronegativity: 1.3, melt: 1613, boil: 3383, discovered: "1944" },
  { num: 97, symbol: "Bk", name: "Berkelium", mass: "(247)", row: 10, col: 12, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f⁹ 7s²", electronegativity: 1.3, melt: 1259, boil: 2900, discovered: "1949" },
  { num: 98, symbol: "Cf", name: "Californium", mass: "(251)", row: 10, col: 13, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f¹⁰ 7s²", electronegativity: 1.3, melt: 1173, boil: 1743, discovered: "1950" },
  { num: 99, symbol: "Es", name: "Einsteinium", mass: "(252)", row: 10, col: 14, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f¹¹ 7s²", electronegativity: 1.3, melt: 1133, boil: 1269, discovered: "1952" },
  { num: 100, symbol: "Fm", name: "Fermium", mass: "(257)", row: 10, col: 15, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f¹² 7s²", electronegativity: 1.3, melt: 1800, boil: undefined, discovered: "1952" },
  { num: 101, symbol: "Md", name: "Mendelevium", mass: "(258)", row: 10, col: 16, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f¹³ 7s²", electronegativity: 1.3, melt: 1100, boil: undefined, discovered: "1955" },
  { num: 102, symbol: "No", name: "Nobelium", mass: "(259)", row: 10, col: 17, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f¹⁴ 7s²", electronegativity: 1.3, melt: 1100, boil: undefined, discovered: "1966" },
  { num: 103, symbol: "Lr", name: "Lawrencium", mass: "(266)", row: 10, col: 18, category: "actinide", block: "f", state: "synthetic", config: "[Rn] 5f¹⁴ 7s² 7p¹", electronegativity: 1.3, melt: 1900, boil: undefined, discovered: "1961" },

  // Rest of Period 7
  { num: 104, symbol: "Rf", name: "Rutherfordium", mass: "(267)", row: 7, col: 4, category: "transition-metal", block: "d", state: "synthetic", config: "[Rn] 5f¹⁴ 6d² 7s²", electronegativity: undefined, melt: 2400, boil: 5800, discovered: "1964" },
  { num: 105, symbol: "Db", name: "Dubnium", mass: "(268)", row: 7, col: 5, category: "transition-metal", block: "d", state: "synthetic", config: "[Rn] 5f¹⁴ 6d³ 7s²", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "1967" },
  { num: 106, symbol: "Sg", name: "Seaborgium", mass: "(269)", row: 7, col: 6, category: "transition-metal", block: "d", state: "synthetic", config: "[Rn] 5f¹⁴ 6d⁴ 7s²", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "1974" },
  { num: 107, symbol: "Bh", name: "Bohrium", mass: "(270)", row: 7, col: 7, category: "transition-metal", block: "d", state: "synthetic", config: "[Rn] 5f¹⁴ 6d⁵ 7s²", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "1981" },
  { num: 108, symbol: "Hs", name: "Hassium", mass: "(269)", row: 7, col: 8, category: "transition-metal", block: "d", state: "synthetic", config: "[Rn] 5f¹⁴ 6d⁶ 7s²", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "1984" },
  { num: 109, symbol: "Mt", name: "Meitnerium", mass: "(278)", row: 7, col: 9, category: "transition-metal", block: "d", state: "synthetic", config: "[Rn] 5f¹⁴ 6d⁷ 7s²", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "1982" },
  { num: 110, symbol: "Ds", name: "Darmstadtium", mass: "(281)", row: 7, col: 10, category: "transition-metal", block: "d", state: "synthetic", config: "[Rn] 5f¹⁴ 6d⁸ 7s²", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "1994" },
  { num: 111, symbol: "Rg", name: "Roentgenium", mass: "(282)", row: 7, col: 11, category: "transition-metal", block: "d", state: "synthetic", config: "[Rn] 5f¹⁴ 6d⁹ 7s²", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "1994" },
  { num: 112, symbol: "Cn", name: "Copernicium", mass: "(285)", row: 7, col: 12, category: "transition-metal", block: "d", state: "synthetic", config: "[Rn] 5f¹⁴ 6d¹⁰ 7s²", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "1996" },
  { num: 113, symbol: "Nh", name: "Nihonium", mass: "(286)", row: 7, col: 13, category: "post-transition-metal", block: "p", state: "synthetic", config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "2003" },
  { num: 114, symbol: "Fl", name: "Flerovium", mass: "(289)", row: 7, col: 14, category: "post-transition-metal", block: "p", state: "synthetic", config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "1998" },
  { num: 115, symbol: "Mc", name: "Moscovium", mass: "(290)", row: 7, col: 15, category: "post-transition-metal", block: "p", state: "synthetic", config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "2003" },
  { num: 116, symbol: "Lv", name: "Livermorium", mass: "(293)", row: 7, col: 16, category: "post-transition-metal", block: "p", state: "synthetic", config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "2000" },
  { num: 117, symbol: "Ts", name: "Tennessine", mass: "(294)", row: 7, col: 17, category: "reactive-nonmetal", block: "p", state: "synthetic", config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "2010" },
  { num: 118, symbol: "Og", name: "Oganesson", mass: "(294)", row: 7, col: 18, category: "noble-gas", block: "p", state: "synthetic", config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶", electronegativity: undefined, melt: undefined, boil: undefined, discovered: "2002" },
];

// Dynamic styles for blocks and chemical categories based on mode (light vs dark)
export const getCategoryStyles = (category: string, isLight: boolean) => {
  const styles: Record<string, { label: string; bgDark: string; bgLight: string; textDark: string; textLight: string; borderDark: string; borderLight: string; glow: string; desc: string }> = {
    "reactive-nonmetal": {
      label: "Reactive Nonmetals",
      bgDark: "bg-emerald-950/45 hover:bg-emerald-900/60",
      bgLight: "bg-emerald-100 hover:bg-emerald-200",
      textDark: "text-emerald-300",
      textLight: "text-slate-950 font-black",
      borderDark: "border-emerald-500/30",
      borderLight: "border-emerald-400",
      glow: "rgba(16, 185, 129, 0.15)",
      desc: "Highly electronegative nonmetals that readily form covalent or ionic bonds.",
    },
    "noble-gas": {
      label: "Noble Gases",
      bgDark: "bg-purple-950/45 hover:bg-purple-900/60",
      bgLight: "bg-purple-100 hover:bg-purple-200",
      textDark: "text-purple-300",
      textLight: "text-slate-950 font-black",
      borderDark: "border-purple-500/30",
      borderLight: "border-purple-400",
      glow: "rgba(168, 85, 247, 0.15)",
      desc: "Colorless, odorless, extremely stable gases with fully completed valence shells.",
    },
    "alkali-metal": {
      label: "Alkali Metals",
      bgDark: "bg-red-950/45 hover:bg-red-900/60",
      bgLight: "bg-red-100 hover:bg-red-200",
      textDark: "text-red-300",
      textLight: "text-slate-950 font-black",
      borderDark: "border-red-500/30",
      borderLight: "border-red-400",
      glow: "rgba(239, 68, 68, 0.15)",
      desc: "Soft, highly reactive s-block metals with a single outer valence electron.",
    },
    "alkaline-earth-metal": {
      label: "Alkaline Earth Metals",
      bgDark: "bg-orange-950/45 hover:bg-orange-900/60",
      bgLight: "bg-orange-100 hover:bg-orange-200",
      textDark: "text-orange-300",
      textLight: "text-slate-950 font-black",
      borderDark: "border-orange-500/30",
      borderLight: "border-orange-400",
      glow: "rgba(249, 115, 22, 0.15)",
      desc: "Shiny, silver-white, moderately reactive metals with two outer valence electrons.",
    },
    "metalloid": {
      label: "Metalloids",
      bgDark: "bg-amber-950/45 hover:bg-amber-900/60",
      bgLight: "bg-amber-100 hover:bg-amber-200",
      textDark: "text-amber-300",
      textLight: "text-slate-950 font-black",
      borderDark: "border-amber-500/30",
      borderLight: "border-amber-400",
      glow: "rgba(245, 158, 11, 0.15)",
      desc: "Elements with intermediate properties exhibiting metal and non-metal traits.",
    },
    "post-transition-metal": {
      label: "Post-transition Metals",
      bgDark: "bg-teal-950/45 hover:bg-teal-900/60",
      bgLight: "bg-teal-100 hover:bg-teal-200",
      textDark: "text-teal-300",
      textLight: "text-slate-950 font-black",
      borderDark: "border-teal-500/30",
      borderLight: "border-teal-400",
      glow: "rgba(20, 184, 166, 0.15)",
      desc: "Soft metals located between transition metals and metalloids on the p-block.",
    },
    "transition-metal": {
      label: "Transition Metals",
      bgDark: "bg-blue-950/45 hover:bg-blue-900/60",
      bgLight: "bg-blue-100 hover:bg-blue-200",
      textDark: "text-blue-300",
      textLight: "text-slate-950 font-black",
      borderDark: "border-blue-500/30",
      borderLight: "border-blue-400",
      glow: "rgba(59, 130, 246, 0.15)",
      desc: "Metallic d-block elements with variable oxidation states and catalytic properties.",
    },
    "lanthanide": {
      label: "Lanthanides",
      bgDark: "bg-cyan-950/45 hover:bg-cyan-900/60",
      bgLight: "bg-cyan-100 hover:bg-cyan-200",
      textDark: "text-cyan-300",
      textLight: "text-slate-950 font-black",
      borderDark: "border-cyan-500/30",
      borderLight: "border-cyan-400",
      glow: "rgba(6, 182, 212, 0.15)",
      desc: "Rare earth elements (Z=57-71) in the f-block, known for high magnetic susceptibility.",
    },
    "actinide": {
      label: "Actinides",
      bgDark: "bg-pink-950/45 hover:bg-pink-900/60",
      bgLight: "bg-pink-100 hover:bg-pink-200",
      textDark: "text-pink-300",
      textLight: "text-slate-950 font-black",
      borderDark: "border-pink-500/30",
      borderLight: "border-pink-400",
      glow: "rgba(236, 72, 153, 0.15)",
      desc: "Radioactive f-block elements (Z=89-103) with high atomic masses and synthetic origins.",
    },
  };

  const matched = styles[category];
  if (!matched) {
    return {
      label: category,
      bg: isLight ? "bg-slate-100 hover:bg-slate-200" : "bg-slate-900/50 hover:bg-slate-800/60",
      text: isLight ? "text-slate-950 font-black" : "text-slate-100",
      border: isLight ? "border-slate-300" : "border-slate-800",
      glow: "rgba(255,255,255,0.05)",
      desc: "",
    };
  }

  return {
    label: matched.label,
    bg: isLight ? matched.bgLight : matched.bgDark,
    text: isLight ? matched.textLight : matched.textDark,
    border: isLight ? matched.borderLight : matched.borderDark,
    glow: matched.glow,
    desc: matched.desc,
  };
};

export const CATEGORY_KEYS = [
  "reactive-nonmetal",
  "noble-gas",
  "alkali-metal",
  "alkaline-earth-metal",
  "metalloid",
  "post-transition-metal",
  "transition-metal",
  "lanthanide",
  "actinide",
];

// Dynamic state color mapping for state of matter based on theme
export const getLiquidSolidSyntheticColors = (state: string, isLight: boolean) => {
  if (isLight) {
    return state === "solid" ? "text-slate-950 font-black" : state === "gas" ? "text-cyan-850 font-black" : state === "liquid" ? "text-blue-850 font-black" : "text-rose-850 font-black italic";
  } else {
    return state === "solid" ? "text-slate-100" : state === "gas" ? "text-cyan-400" : state === "liquid" ? "text-blue-400 font-bold" : "text-rose-400 italic";
  }
};

// Calculate physical state of matter based on room temperature of 25 degrees Celsius (298.15 K)
export const getElementStateAt25C = (element: ElementData): string => {
  if (element.state === "synthetic") {
    return "synthetic";
  }
  if (element.melt !== undefined && element.boil !== undefined) {
    const roomTempK = 298.15; // 25 °C in Kelvin
    if (roomTempK < element.melt) {
      return "solid";
    } else if (roomTempK >= element.melt && roomTempK < element.boil) {
      return "liquid";
    } else {
      return "gas";
    }
  }
  return element.state;
};

// Export full SVG of the periodic table for offline use
export const downloadPeriodicTableSVG = (isLightMode: boolean = false) => {
  const pal = isLightMode
    ? {
        bg: "#ffffff", fg: "#0f172a", title: "#0e7490", subtitle: "#475569", muted: "#64748b",
        cardStroke: "rgba(0,0,0,0.15)", symbol: "#0f172a", number: "#64748b", name: "#334155",
        mass: "#94a3b8", categoryLabel: "#0f172a", placeholderFill: "#f1f5f9", placeholderStroke: "rgba(0,0,0,0.08)",
        laName: "#334155", legendHeader: "#475569", legendLabel: "#1e293b"
      }
    : {
        bg: "#020617", fg: "#f8fafc", title: "#22d3ee", subtitle: "#94a3b8", muted: "#64748b",
        cardStroke: "rgba(255,255,255,0.1)", symbol: "#ffffff", number: "#94a3b8", name: "#cbd5e1",
        mass: "#64748b", categoryLabel: "#f8fafc", placeholderFill: "#0f172a", placeholderStroke: "rgba(255,255,255,0.05)",
        laName: "#cbd5e1", legendHeader: "#94a3b8", legendLabel: "#e2e8f0"
      };
  const svgHeader = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1480 940" width="100%" height="100%" style="background-color: ${pal.bg}; font-family: system-ui, -apple-system, sans-serif; color: ${pal.fg};">
    <style>
      .title { font-size: 32px; font-weight: 800; fill: ${pal.title}; }
      .subtitle { font-size: 16px; fill: ${pal.subtitle}; }
      .el-card { stroke: ${pal.cardStroke}; stroke-width: 1; rx: 6px; }
      .el-symbol { font-size: 22px; font-weight: bold; fill: ${pal.symbol}; }
      .el-number { font-size: 10px; fill: ${pal.number}; }
      .el-name { font-size: 9px; fill: ${pal.name}; }
      .el-mass { font-size: 8px; fill: ${pal.mass}; }
      .category-label { font-size: 12px; font-weight: 600; fill: ${pal.categoryLabel}; }

      /* Category specific styles */
      .reactive-nonmetal { fill: rgba(16, 185, 129, 0.15); stroke: rgba(16, 185, 129, 0.4); }
      .noble-gas { fill: rgba(168, 85, 247, 0.15); stroke: rgba(168, 85, 247, 0.4); }
      .alkali-metal { fill: rgba(239, 68, 68, 0.15); stroke: rgba(239, 68, 68, 0.4); }
      .alkaline-earth-metal { fill: rgba(249, 115, 22, 0.15); stroke: rgba(249, 115, 22, 0.4); }
      .metalloid { fill: rgba(245, 158, 11, 0.15); stroke: rgba(245, 158, 11, 0.4); }
      .post-transition-metal { fill: rgba(20, 184, 166, 0.15); stroke: rgba(20, 184, 166, 0.4); }
      .transition-metal { fill: rgba(59, 130, 246, 0.15); stroke: rgba(59, 130, 246, 0.4); }
      .lanthanide { fill: rgba(6, 182, 212, 0.15); stroke: rgba(6, 182, 212, 0.4); }
      .actinide { fill: rgba(236, 72, 153, 0.15); stroke: rgba(236, 72, 153, 0.4); }
      .placeholder-card { fill: ${pal.placeholderFill}; stroke: ${pal.placeholderStroke}; rx: 6px; }
    </style>

    <!-- Title & Header -->
    <text x="40" y="55" class="title">PERIODIC TABLE OF THE ELEMENTS</text>
    <text x="40" y="80" class="subtitle">Complete HD Interactive High-Yield Academic Blueprint</text>
    <text x="40" y="100" class="subtitle" style="font-size: 11px; fill: ${pal.muted};">Generated dynamically via "Know Your Chemicals" laboratory</text>

    <g transform="translate(40, 130)">
  `;

  let elementCardsSvg = "";

  // Generate elements cards
  ELEMENTS.forEach((el) => {
    const colWidth = 75;
    const rowHeight = 75;
    const x = (el.col - 1) * colWidth;
    const y = (el.row - 1) * rowHeight;

    elementCardsSvg += `
      <g transform="translate(${x}, ${y})">
        <rect width="70" height="70" class="el-card ${el.category}" />
        <text x="6" y="15" class="el-number">${el.num}</text>
        <text x="35" y="38" text-anchor="middle" class="el-symbol">${el.symbol}</text>
        <text x="35" y="52" text-anchor="middle" class="el-name">${el.name}</text>
        <text x="35" y="63" text-anchor="middle" class="el-mass">${el.mass}</text>
      </g>
    `;
  });

  // Placeholders for Lanthanides and Actinides in row 6/7 column 3
  const laActPlaceholders = `
    <!-- Lanthanides Group Placement -->
    <g transform="translate(150, 375)">
      <rect width="70" height="70" class="placeholder-card" />
      <text x="35" y="28" text-anchor="middle" style="font-size: 10px; fill: #06b6d4; font-weight: bold;">57-71</text>
      <text x="35" y="45" text-anchor="middle" style="font-size: 9px; fill: ${pal.laName}; font-weight: bold;">La-Lu</text>
      <text x="35" y="58" text-anchor="middle" style="font-size: 7px; fill: ${pal.muted}; uppercase font-weight: 500;">Lanthanides</text>
    </g>
    <!-- Actinides Group Placement -->
    <g transform="translate(150, 450)">
      <rect width="70" height="70" class="placeholder-card" />
      <text x="35" y="28" text-anchor="middle" style="font-size: 10px; fill: #ec4899; font-weight: bold;">89-103</text>
      <text x="35" y="45" text-anchor="middle" style="font-size: 9px; fill: ${pal.laName}; font-weight: bold;">Ac-Lr</text>
      <text x="35" y="58" text-anchor="middle" style="font-size: 7px; fill: ${pal.muted}; uppercase font-weight: 500;">Actinides</text>
    </g>
  `;

  // Legend on SVG
  let legendSvg = `
    <g transform="translate(240, 15)">
      <text x="0" y="0" style="font-size: 11px; fill: ${pal.legendHeader}; font-weight: 800; tracking: 0.1em; text-transform: uppercase;">Category Legend</text>
  `;

  CATEGORY_KEYS.forEach((key, idx) => {
    const value = getCategoryStyles(key, false);
    const lx = (idx % 3) * 220;
    const ly = Math.floor(idx / 3) * 24 + 12;
    legendSvg += `
      <g transform="translate(${lx}, ${ly})">
        <rect width="14" height="14" rx="3" class="${key}" />
        <text x="22" y="11" style="font-size: 11px; fill: ${pal.legendLabel}; font-weight: 500;">${value.label}</text>
      </g>
    `;
  });
  legendSvg += "</g>";

  const svgFooter = `
    </g>
  </svg>`;

  const fullSvg = svgHeader + laActPlaceholders + elementCardsSvg + legendSvg + svgFooter;

  // Trigger browser download of SVG
  const element = document.createElement("a");
  const file = new Blob([fullSvg], { type: "image/svg+xml;charset=utf-8" });
  element.href = URL.createObjectURL(file);
  element.download = "periodic_table_of_elements_4k_hd.svg";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

interface PeriodicTableProps {
  onClose: () => void;
  isLightMode?: boolean;
}

interface FamilyDetail {
  title: string;
  desc: string;
  valenceConfig: string;
  members: string;
  physicalProperties: string[];
  chemicalProperties: string[];
  commonUses: string[];
}

const CATEGORY_DETAILS: Record<string, FamilyDetail> = {
  "reactive-nonmetal": {
    title: "Reactive Nonmetals",
    desc: "A group of highly electronegative nonmetallic elements (including halogens and active nonmetals like Oxygen, Nitrogen, Carbon, Sulfur) that actively form covalent bonds with other nonmetals or ionic bonds with metallic elements.",
    valenceConfig: "ns² np¹ to ns² np⁵",
    members: "Hydrogen (H), Carbon (C), Nitrogen (N), Oxygen (O), Fluorine (F), Phosphorus (P), Sulfur (S), Chlorine (Cl), Selenium (Se), Bromine (Br), Iodine (I)",
    physicalProperties: [
      "Exist in multiple phases: gaseous (O₂, Cl₂), liquid (Br₂), and solid (C, S, P) states.",
      "Extremely poor thermal and electrical conductors (highly insulating).",
      "Brittle and lackluster in solid form; cannot be drawn into wires or hammered into sheets."
    ],
    chemicalProperties: [
      "High electronegativity values (strongly attract shared electron pairs).",
      "Gain or share electrons readily to achieve a stable octet configuration.",
      "Form acidic oxides when reacted with oxygen (e.g., CO₂, SO₂)."
    ],
    commonUses: [
      "Life processes: Carbon, Oxygen, and Nitrogen are the core building blocks of organic life.",
      "Industrial chemicals: Sulfur is used to produce sulfuric acid; Nitrogen is essential for fertilizers.",
      "Disinfectants & Purifiers: Chlorine is used to sanitize drinking water and pools."
    ]
  },
  "noble-gas": {
    title: "Noble Gases",
    desc: "The elements of Group 18. Colorless, odorless, monatomic gases with completely filled valence s and p subshells. This full configuration confers extreme stability and near-zero chemical reactivity.",
    valenceConfig: "ns² np⁶ (ns² for Helium)",
    members: "Helium (He), Neon (Ne), Argon (Ar), Krypton (Kr), Xenon (Xe), Radon (Rn), Oganesson (Og)",
    physicalProperties: [
      "Exist strictly as monatomic colorless and odorless gases at standard conditions.",
      "Have the lowest boiling and melting points of any element family.",
      "Emit beautiful, intense colored light when electric current passes through them in a discharge tube."
    ],
    chemicalProperties: [
      "Virtually inert due to full outer electron shells (no drive to gain/lose electrons).",
      "Extremely high ionization energy (difficult to remove any valence electrons).",
      "Do not form compounds easily; only heavy noble gases (Kr, Xe) form stable compounds with strong electronegative elements like Fluorine."
    ],
    commonUses: [
      "Inert atmosphere: Argon is used in welding and light bulbs to prevent oxidation.",
      "Cryogenics: Liquid Helium is used to cool superconducting magnets in MRI machines.",
      "Illumination: Neon and Argon are used in luminous signs and high-intensity gas-discharge lamps."
    ]
  },
  "alkali-metal": {
    title: "Alkali Metals",
    desc: "The elements of Group 1 (excluding Hydrogen). Silvery-white, exceptionally soft, low-density metals containing a single s-orbital valence electron. They are the most chemically active metals on Earth.",
    valenceConfig: "ns¹",
    members: "Lithium (Li), Sodium (Na), Potassium (K), Rubidium (Rb), Cesium (Cs), Francium (Fr)",
    physicalProperties: [
      "Extremely soft; can be easily sliced with a butter knife.",
      "Very low density (Lithium, Sodium, and Potassium float on water).",
      "Low melting and boiling points compared to transition metals."
    ],
    chemicalProperties: [
      "Violently reactive, especially with water, producing flammable hydrogen gas and strong alkaline hydroxides.",
      "Have a single valence electron which they lose with extreme ease (+1 charge).",
      "Must be stored under mineral oil or inert gas to prevent reaction with atmospheric moisture and oxygen."
    ],
    commonUses: [
      "Energy storage: Lithium is the heart of high-performance rechargeable lithium-ion batteries.",
      "Biological function: Sodium and Potassium ions are critical for cell membrane potential and nerve impulse transmission.",
      "Atomic clocks: Cesium-133 resonance frequency is used to define the international standard second."
    ]
  },
  "alkaline-earth-metal": {
    title: "Alkaline Earth Metals",
    desc: "The elements of Group 2. Shiny, silvery-white, moderately reactive metals with two outer s-orbital valence electrons. They are harder, denser, and have higher melting points than alkali metals.",
    valenceConfig: "ns²",
    members: "Beryllium (Be), Magnesium (Mg), Calcium (Ca), Strontium (Sr), Barium (Ba), Radium (Ra)",
    physicalProperties: [
      "Distinctly harder and denser than the alkali metals.",
      "Possess higher melting and boiling points than Group 1 metals.",
      "Silvery-gray appearance when freshly cut; quickly form a thin oxide layer in air."
    ],
    chemicalProperties: [
      "Readily lose their two valence electrons to form stable cations with a +2 charge.",
      "React with water (though less vigorously than Group 1) to form basic hydroxides.",
      "Burn with brilliant, characteristic colors (e.g., Strontium burns red, Barium burns green), making them key in fireworks."
    ],
    commonUses: [
      "Structural Alloys: Magnesium is highly valued for ultra-lightweight alloys in aerospace and high-end automotive parts.",
      "Biominerals: Calcium is an essential structural element in bones, teeth, shells, and cement.",
      "Medical diagnostics: Barium sulfate is swallowed as a contrast agent for X-ray imaging of the digestive tract."
    ]
  },
  "metalloid": {
    title: "Metalloids",
    desc: "Elements residing along the diagonal dividing line between metals and nonmetals. They display a mixture of metallic and non-metallic traits, and are most famous for their semiconducting electronic behaviors.",
    valenceConfig: "Varies (ns² np¹ to ns² np⁴)",
    members: "Boron (B), Silicon (Si), Germanium (Ge), Arsenic (As), Antimony (Sb), Tellurium (Te), Polonium (Po)",
    physicalProperties: [
      "Look metallic (shiny and lustrous), but are chemically brittle like nonmetals.",
      "Are semiconductors: they conduct electricity poorly at room temperature but become highly conductive at elevated temperatures or when doped.",
      "Moderate density and high melting points."
    ],
    chemicalProperties: [
      "Electronegativity and ionization energy values lie intermediate between metals and nonmetals.",
      "Can form covalent or ionic bonds depending on the reacting partner.",
      "Form amphoteric or weakly acidic oxides when reacted with oxygen."
    ],
    commonUses: [
      "Semiconductor microchips: Silicon is the foundation of all modern electronics, solar panels, and computer processors.",
      "Glassware strength: Boron compounds are used to produce thermal-shock-resistant borosilicate glass (Pyrex).",
      "Alloys and flame retardants: Antimony is alloyed with lead to strengthen batteries and added to fire-resistant materials."
    ]
  },
  "post-transition-metal": {
    title: "Post-transition Metals",
    desc: "Metallic elements located between the transition metals (d-block) and the metalloids (p-block). They are softer, have lower melting points, and exhibit higher electronegativity than transition metals.",
    valenceConfig: "ns² np¹ to ns² np⁴",
    members: "Aluminium (Al), Gallium (Ga), Indium (In), Tin (Sn), Thallium (Tl), Lead (Pb), Bismuth (Bi), Nihonium (Nh), Flerovium (Fl), Moscovium (Mc), Livermorium (Lv)",
    physicalProperties: [
      "Generally softer and structurally weaker than transition metals.",
      "Have significantly lower melting points (Gallium melts in the palm of a hand at 29.76 °C).",
      "Possess high electrical and thermal conductivity but lower tensile strength."
    ],
    chemicalProperties: [
      "Higher electronegativity than transition metals, leading to more covalent character in their compounds.",
      "Can display multiple oxidation states (e.g., Lead can be +2 or +4).",
      "Often form amphoteric oxides (reacting with both acids and bases), such as Aluminium Oxide."
    ],
    commonUses: [
      "Construction & Packaging: Aluminium is used universally in aerospace, beverage cans, and structures due to light weight and corrosion resistance.",
      "Solder & Piping: Tin is used for non-corrosive plating and lead-free solder alloys in electronics.",
      "Radiation shielding: Lead's high density makes it highly effective for absorbing X-rays and gamma radiation."
    ]
  },
  "transition-metal": {
    title: "Transition Metals",
    desc: "A huge, industrially vital family of metallic elements in the d-block. They have filled or partially filled d-orbitals, allowing them to exhibit multiple oxidation states, colored compounds, and strong catalytic abilities.",
    valenceConfig: "ns¹⁻² (n-1)d¹⁻¹⁰",
    members: "Scandium to Zinc (Z=21-30), Yttrium to Cadmium (Z=39-48), Lutetium to Mercury (Z=71-80), Lawrencium to Copernium (Z=103-112)",
    physicalProperties: [
      "Exemplary metals: extremely hard, high density, and extraordinarily high melting and boiling points.",
      "Highly malleable and ductile (can be drawn into wires and hammered into sheets).",
      "Outstanding conductors of electricity and thermal energy."
    ],
    chemicalProperties: [
      "Exhibit multiple oxidation states (e.g., Manganese from -3 to +7) due to close energy levels of s and d subshells.",
      "Tend to form beautifully colored complex ions in solution.",
      "Excellent catalysts for crucial industrial reactions (e.g., Iron in the Haber process, Platinum in catalytic converters)."
    ],
    commonUses: [
      "Structural engineering: Iron (steel) is the backbone of global infrastructure, bridges, buildings, and vehicles.",
      "Electrical grids: Copper is the gold standard for electrical wiring due to supreme conductivity.",
      "Jewelry & Catalysts: Gold, Silver, and Platinum are highly prized for beauty, corrosion resistance, and chemistry."
    ]
  },
  "lanthanide": {
    title: "Lanthanides (Rare Earth Elements)",
    desc: "The fifteen inner transition metals spanning atomic numbers 57 to 71. These elements are filling the deep 4f subshell, resulting in highly similar chemical behaviors and critical roles in advanced electronics and strong magnets.",
    valenceConfig: "4f⁰⁻¹⁴ 5d⁰⁻¹ 6s²",
    members: "Lanthanum (La), Cerium (Ce), Praseodymium (Pr), Neodymium (Nd), Promethium (Pm), Samarium (Sm), Europium (Eu), Gadolinium (Gd), Terbium (Tb), Dysprosium (Dy), Holmium (Ho), Erbium (Er), Thulium (Tm), Ytterbium (Yb), Lutetium (Lu)",
    physicalProperties: [
      "Silvery-white, bright, soft metals that tarnish slowly when exposed to air.",
      "Highly paramagnetic properties due to unpaired electrons in the 4f subshell.",
      "Relatively high melting points and high boiling points."
    ],
    chemicalProperties: [
      "Very reactive; oxidize rapidly in air and react with water to liberate hydrogen.",
      "Predominantly exhibit the +3 oxidation state, forming highly stable compounds.",
      "Exhibit 'Lanthanide Contraction': a steady decrease in atomic and ionic radii with increasing atomic number."
    ],
    commonUses: [
      "Super-magnets: Neodymium-Iron-Boron (NdFeB) magnets are the strongest permanent magnets known, used in wind turbines and electric vehicles.",
      "Optics & Lasers: Erbium is used in fiber-optic amplifiers; Ytterbium is used in high-power solid-state lasers.",
      "Phosphors: Europium and Terbium supply the red and green phosphors for high-definition television and computer screens."
    ]
  },
  "actinide": {
    title: "Actinides (Radioactive Metals)",
    desc: "The fifteen heavy, radioactive metallic elements with atomic numbers 89 to 103. They fill the 5f subshell. Only Thorium and Uranium occur in significant natural quantities; the rest are synthetic elements created in reactors.",
    valenceConfig: "5f⁰⁻¹⁴ 6d⁰⁻² 7s²",
    members: "Actinium (Ac), Thorium (Th), Protactinium (Pa), Uranium (U), Neptunium (Np), Plutonium (Pu), Americium (Am), Curium (Cm), Berkelium (Bk), Californium (Cf), Einsteinium (Es), Fermium (Fm), Mendelevium (Md), Nobelium (No), Lawrencium (Lr)",
    physicalProperties: [
      "Silvery metals that tarnish extremely quickly in contact with air.",
      "Dense, heavy metals with high malleability and high thermal conductivity.",
      "Highly toxic and emit heat spontaneously due to radioactive decay."
    ],
    chemicalProperties: [
      "All members are unstable and radioactive, undergoing decay with varying half-lives.",
      "Highly reactive metals that react with air, water, and nonmetals directly.",
      "Exhibit a wide range of oxidation states (especially the lighter actinides: Th, Pa, U, Np, Pu)."
    ],
    commonUses: [
      "Nuclear Power: Uranium-235 is the primary fuel for nuclear power plants; Plutonium-239 is used in space probes (radioisotope thermoelectric generators).",
      "Safety sensors: Americium-241 is a crucial component in household smoke detectors.",
      "Scientific research: Heavy synthetic actinides (Californium, Einsteinium) are used to synthesize superheavy elements."
    ]
  }
};

interface BlockDetail {
  title: string;
  desc: string;
  orbital: string;
  electronicConfig: string;
  subshells: string;
  elementTypes: string;
  groupSpan: string;
  trends: string[];
  features: string[];
}

const BLOCK_DETAILS: Record<string, BlockDetail> = {
  "s": {
    title: "S-Block Segment",
    desc: "Comprises Groups 1 and 2, along with Hydrogen and Helium. In these elements, the highest-energy valence electrons occupy the spherical s-orbitals, which can hold a maximum of 2 electrons.",
    orbital: "Spherical, symmetrical geometry around the nucleus.",
    electronicConfig: "ns¹ to ns²",
    subshells: "Outer s subshell (contains 1 orbital)",
    elementTypes: "Highly reactive metals (except Hydrogen gas and Helium noble gas)",
    groupSpan: "Groups 1 (Alkali metals) & 2 (Alkaline earth metals), plus H & He",
    trends: [
      "Atomic size increases dramatically down the block, making outer electrons easier to lose.",
      "Ionization energy decreases down the block, increasing metallic reactivity.",
      "Electronegativity is extremely low, making these the most electropositive elements."
    ],
    features: [
      "Highly electropositive metals that form ionic compounds readily.",
      "Possess low densities, low melting points, and high malleability.",
      "Emit beautiful, distinctive wavelengths when heated (flame tests: Sodium is yellow, Potassium is lilac).",
      "React actively with water (and air) to form alkaline solutions."
    ]
  },
  "p": {
    title: "P-Block Segment",
    desc: "Spans Groups 13 through 18. This is the most diverse block in the periodic table, containing metals, metalloids, and nonmetals alike. Their outermost valence electrons reside in the dumbbell-shaped p-orbitals.",
    orbital: "Three dumbbell-shaped p-orbitals oriented along the X, Y, and Z axes.",
    electronicConfig: "ns² np¹ to ns² np⁶",
    subshells: "Outer p subshell (contains 3 orbitals, max 6 electrons)",
    elementTypes: "Metals, metalloids, reactive nonmetals, and noble gases",
    groupSpan: "Groups 13 (Boron family) to 18 (Noble gases)",
    trends: [
      "Electronegativity increases dramatically from left to right, peaking at Fluorine in Group 17.",
      "Ionization energy increases from left to right, making elements more nonmetallic.",
      "Atomic radii decrease from left to right due to increased nuclear charge pulling the same shell closer."
    ],
    features: [
      "The only block containing all three categories: metals, semimetals (metalloids), and nonmetals.",
      "Covalent bonding dominates across the block, especially in compounds of carbon, nitrogen, and oxygen.",
      "Features elements with wide ranges of oxidation states (e.g., Chlorine can be -1, +1, +3, +5, or +7).",
      "Includes elements critical to life (Carbon, Nitrogen, Oxygen) and technology (Silicon, Gallium)."
    ]
  },
  "d": {
    title: "D-Block Segment (Transition Metals)",
    desc: "Spans Groups 3 through 12. Known as the transition elements, these metals are filling the multi-lobed d-orbitals of their penultimate (n-1) electron shell. This complex electronic structure enables incredible industrial and catalytic applications.",
    orbital: "Five multi-lobed d-orbitals (max 10 electrons total).",
    electronicConfig: "ns¹⁻² (n-1)d¹⁻¹⁰",
    subshells: "Penultimate d-subshell (contains 5 orbitals)",
    elementTypes: "Exclusively hard, dense transition metals",
    groupSpan: "Groups 3 to 12",
    trends: [
      "Relatively small variations in atomic size across a period due to shielding by d-electrons.",
      "Electronegativity and ionization energies increase only slightly across a period.",
      "Density and melting points peak near the middle of each d-block row (e.g., Tungsten, Osmium)."
    ],
    features: [
      "Form highly colored compounds and complexes due to d-d electron transitions.",
      "Display multiple stable oxidation states (e.g., Iron can easily transition between Fe²⁺ and Fe³⁺).",
      "Paramagnetic behaviors: possess unpaired d-electrons that align with magnetic fields.",
      "Invaluable catalysts for biochemical systems (e.g., Iron in hemoglobin) and industrial synthesis."
    ]
  },
  "f": {
    title: "F-Block Segment (Inner Transition)",
    desc: "Usually positioned in two separate rows at the bottom of the table. It consists of the Lanthanides and Actinides, which are filling the deep-lying f-orbitals of their pre-penultimate (n-2) electron shell.",
    orbital: "Seven complex, multi-lobed f-orbitals (max 14 electrons total).",
    electronicConfig: "ns² (n-2)f¹⁻¹⁴ (n-1)d⁰⁻²",
    subshells: "Pre-penultimate f-subshell (contains 7 orbitals)",
    elementTypes: "Heavy inner transition metals (all Actinides are radioactive)",
    groupSpan: "No designated group numbers; branched from Group 3 in Periods 6 and 7",
    trends: [
      "Lanthanide Contraction: atomic/ionic radii decrease systematically, making heavy elements denser than expected.",
      "Highly uniform chemical properties within each row because outer s-electrons remain identical while f-shell fills deep inside.",
      "Actinides exhibit extreme instability, with half-lives dropping rapidly as atomic numbers climb."
    ],
    features: [
      "Extremely high densities, high melting points, and soft silvery surfaces.",
      "Highly paramagnetic and magnetic properties, making them critical for high-field permanent magnets.",
      "Includes essential fuels for nuclear energy (Uranium, Plutonium) and medicine (Americium, Californium).",
      "Many are purely synthetic and exist for only fractions of a second before decaying."
    ]
  }
};

export interface IsotopeInfo {
  name: string;
  abundance: string;
  halfLife?: string;
  note: string;
}

export function getElementIsotopes(num: number, symbol: string, name: string, mass: string): IsotopeInfo[] {
  // Custom isotope lists for common/high-yield elements
  if (num === 1) { // Hydrogen
    return [
      { name: "¹H (Protium)", abundance: "99.985%", note: "Most common form of hydrogen; stable." },
      { name: "²H (Deuterium)", abundance: "0.015%", note: "Stable; used in heavy water (moderator in nuclear reactors)." },
      { name: "³H (Tritium)", abundance: "Trace", halfLife: "12.3 years", note: "Radioactive; used in self-powered lighting and thermonuclear fusion research." }
    ];
  }
  if (num === 2) { // Helium
    return [
      { name: "³He", abundance: "0.000137%", note: "Stable; extremely rare on Earth, prized for cryogenics and future fusion." },
      { name: "⁴He", abundance: "99.99986%", note: "Stable; standard non-reactive gas produced via alpha decay underground." }
    ];
  }
  if (num === 3) { // Lithium
    return [
      { name: "⁶Li", abundance: "7.59%", note: "Stable; essential for nuclear physics research and tritium production." },
      { name: "⁷Li", abundance: "92.41%", note: "Stable; predominant form, widely used in electrochemical lithium batteries." }
    ];
  }
  if (num === 6) { // Carbon
    return [
      { name: "¹²C", abundance: "98.93%", note: "Stable; reference standard defining the unified atomic mass unit." },
      { name: "¹³C", abundance: "1.07%", note: "Stable; widely utilized in molecular NMR spectroscopy and tracer studies." },
      { name: "¹⁴C", abundance: "Trace", halfLife: "5,730 years", note: "Radioactive; crucial cosmogenic isotope used in radiocarbon dating." }
    ];
  }
  if (num === 7) { // Nitrogen
    return [
      { name: "¹⁴N", abundance: "99.63%", note: "Stable; standard diatomic gas forming 78% of Earth's atmosphere." },
      { name: "¹⁵N", abundance: "0.37%", note: "Stable; rare isotope widely used as a biological chemical tracer." }
    ];
  }
  if (num === 8) { // Oxygen
    return [
      { name: "¹⁶O", abundance: "99.76%", note: "Stable; most abundant, produced in massive star helium fusion." },
      { name: "¹⁷O", abundance: "0.038%", note: "Stable; has nuclear spin used in specific resonance spectroscopy." },
      { name: "¹⁸O", abundance: "0.20%", note: "Stable; used in ice core analysis as a temperature proxy." }
    ];
  }
  if (num === 11) { // Sodium
    return [
      { name: "²³Na", abundance: "100%", note: "Stable; the only naturally occurring stable isotope of sodium." },
      { name: "²²Na", abundance: "Synthetic", halfLife: "2.6 years", note: "Radioactive; used as a positron emitter in PET scans and physics calibration." }
    ];
  }
  if (num === 15) { // Phosphorus
    return [
      { name: "³¹P", abundance: "100%", note: "Stable; essential monoisotopic element critical in biological DNA structure." },
      { name: "³²P", abundance: "Synthetic", halfLife: "14.3 days", note: "Radioactive; beta-emitter widely used as a genetic phosphorus molecular tracer." }
    ];
  }
  if (num === 16) { // Sulfur
    return [
      { name: "³²S", abundance: "95.02%", note: "Stable; main biological and structural sulfur isotope." },
      { name: "³⁴S", abundance: "4.21%", note: "Stable; used in geochemical isotope fractionation modeling." }
    ];
  }
  if (num === 17) { // Chlorine
    return [
      { name: "³⁵Cl", abundance: "75.76%", note: "Stable; majority abundance, coordinates readily as chloride anion." },
      { name: "³⁷Cl", abundance: "24.24%", note: "Stable; minority abundance, used in physical isotope geochemistry." }
    ];
  }
  if (num === 26) { // Iron
    return [
      { name: "⁵⁴Fe", abundance: "5.85%", note: "Stable; weakly radioactive with extremely long half-life." },
      { name: "⁵⁶Fe", abundance: "91.75%", note: "Stable; has the lowest mass per nucleon, endpoint of stellar nucleosynthesis." },
      { name: "⁵⁷Fe", abundance: "2.12%", note: "Stable; extensively studied in biological Mössbauer spectroscopy." }
    ];
  }
  if (num === 27) { // Cobalt
    return [
      { name: "Cobalt-59", abundance: "100%", note: "Stable cobalt isotope, used in magnetic and high-strength alloys." },
      { name: "Cobalt-60", abundance: "Synthetic", halfLife: "5.27 years", note: "Radioactive; powerful gamma ray emitter used in oncology radiotherapy and food sterilization." }
    ];
  }
  if (num === 53) { // Iodine
    return [
      { name: "¹²⁷I", abundance: "100%", note: "Stable; essential diet trace mineral required for thyroid hormone synthesis." },
      { name: "¹³¹I", abundance: "Synthetic", halfLife: "8.0 days", note: "Radioactive; beta/gamma emitter used in thyroid medical ablation therapy." }
    ];
  }
  if (num === 92) { // Uranium
    return [
      { name: "²³⁵U", abundance: "0.72%", halfLife: "703.8M years", note: "Radioactive; fissile isotope that initiates nuclear chain reactions in power plants." },
      { name: "²³⁸U", abundance: "99.27%", halfLife: "4.468B years", note: "Radioactive; primary uranium isotope, fertile material for breeder reactors." }
    ];
  }

  // Fallback generation for other elements
  const massNum = Math.round(parseFloat(mass.replace(/[()]/g, "")) || (num * 2.1 + 2));
  
  if (num >= 83 || num === 43 || num === 61) {
    // Highly radioactive synthetic elements
    return [
      { name: `${massNum}${symbol}`, abundance: "Synthetic", halfLife: "Radioactive", note: `Highly unstable radioisotope of ${name}.` },
      { name: `${massNum + 1}${symbol}`, abundance: "Synthetic", halfLife: "Radioactive", note: `Secondary unstable radioisotope of ${name}.` }
    ];
  } else {
    // Normal stable elements
    return [
      { name: `${massNum}${symbol}`, abundance: "Major (>90%)", note: `Primary naturally occurring stable isotope of ${name}.` },
      { name: `${massNum - 1}${symbol} / ${massNum + 1}${symbol}`, abundance: "Minor (<10%)", note: `Minor naturally occurring stable isotope of ${name}.` }
    ];
  }
}

export default function PeriodicTable({ onClose, isLightMode = false }: PeriodicTableProps) {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(ELEMENTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBlockFilter, setActiveBlockFilter] = useState<"s" | "p" | "d" | "f" | null>(null);
  const [scaleFactor, setScaleFactor] = useState(0.5);
  const [rotateLandscape, setRotateLandscape] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const targetWidth = rotateLandscape ? window.innerHeight : width;
      if (targetWidth >= 1600) {
        setScaleFactor(1.15);
      } else if (targetWidth >= 1280) {
        setScaleFactor(1.05);
      } else {
        setScaleFactor(Math.max(0.4, parseFloat((targetWidth / 1320).toFixed(2))));
      }
    };
    // Do not call handleResize() on mount to preserve 50% default zoom level
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [rotateLandscape]);

  const theme = {
    bg: isLightMode ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100",
    panelBg: isLightMode ? "bg-white/95" : "bg-slate-900/50",
    panelBorder: isLightMode ? "border-slate-300/80" : "border-slate-800/80",
    sidebarBg: isLightMode ? "bg-white/95" : "bg-slate-900/90",
    sidebarBorder: isLightMode ? "border-slate-300/90" : "border-slate-800/90",
    textTitle: isLightMode ? "text-slate-900 font-extrabold" : "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300",
    textHeading: isLightMode ? "text-slate-950 font-black" : "text-white",
    textPrimary: isLightMode ? "text-slate-950 font-bold" : "text-slate-100",
    textSecondary: isLightMode ? "text-slate-800 font-bold" : "text-slate-400",
    textMuted: isLightMode ? "text-slate-800 font-extrabold" : "text-slate-500",
    inputBg: isLightMode ? "bg-slate-100" : "bg-slate-900/90",
    inputBorder: isLightMode ? "border-slate-300" : "border-slate-800",
    inputText: isLightMode ? "text-slate-950 font-bold" : "text-slate-100",
    inputPlaceholder: isLightMode ? "placeholder-slate-500" : "placeholder-slate-500",
    buttonBg: isLightMode ? "bg-slate-200 hover:bg-slate-300 text-slate-950" : "bg-slate-900 hover:bg-slate-850 text-slate-300",
    buttonBorder: isLightMode ? "border-slate-350" : "border-slate-800",
    badgeBg: isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/80 border-slate-800"
  };

  // Filter elements based on search query, category, and block
  const filteredElements = ELEMENTS.filter((el) => {
    const matchesSearch =
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.num.toString() === searchQuery.trim();
    const matchesCategory = activeCategoryFilter ? el.category === activeCategoryFilter : true;
    const matchesBlock = activeBlockFilter ? el.block === activeBlockFilter : true;
    return matchesSearch && matchesCategory && matchesBlock;
  });

  // Export full SVG of the periodic table for offline use
  const handleDownloadSVG = () => {
    downloadPeriodicTableSVG(isLightMode);
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={rotateLandscape ? {
        width: "100vh",
        height: "100vw",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(90deg)",
        transformOrigin: "center center",
        overflow: "auto",
        zIndex: 100,
      } : {}}
      className={`fixed inset-0 z-50 overflow-y-auto flex flex-col p-2.5 md:p-4 xl:p-4 select-none font-sans transition-colors duration-200 ${theme.bg}`}
      id="kyc-periodic-table-fullpage"
    >
      {/* Absolute Beautiful Ambient Backdrops */}
      {!isLightMode && (
        <>
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>
        </>
      )}

      {/* Header Panel */}
      <div className={`flex flex-col lg:flex-row items-center justify-between border-b pb-4 mb-5 gap-3.5 relative z-10 ${isLightMode ? "border-slate-300" : "border-slate-800/80"}`}>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`p-1.5 rounded ${isLightMode ? "bg-cyan-100 border border-cyan-300 text-cyan-950" : "bg-cyan-950/80 border border-cyan-800 text-cyan-300"}`}>
            <Layers className="w-5 h-5" />
          </span>
          <h1 className={`text-base md:text-lg xl:text-xl font-black tracking-tight ${theme.textTitle}`}>
            Periodic Table of Elements
          </h1>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2.5 w-full lg:w-auto lg:justify-end">
          {/* Real-time search element */}
          <div className="relative flex-1 md:flex-initial min-w-[160px] xl:max-w-[210px]">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isLightMode ? "text-slate-600" : "text-slate-400"}`} />
            <input
              type="text"
              placeholder="Filter by name, symbol, Z..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-1.5 rounded-xl text-xs font-semibold outline-none focus:ring-1 transition-all ${theme.inputBg} ${theme.inputText} border ${theme.inputBorder} ${isLightMode ? "focus:border-cyan-400 focus:ring-cyan-300/30" : "focus:border-cyan-500/60 focus:ring-cyan-500/20"}`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${isLightMode ? "text-slate-600 hover:text-slate-900" : "text-slate-500 hover:text-slate-300"}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Zoom Level Controller */}
          <div className={`flex items-center gap-1.5 rounded-xl px-2 py-1 text-xs border shrink-0 ${
            isLightMode ? "bg-slate-100 border-slate-300 text-slate-900" : "bg-slate-900/95 border-slate-800 text-slate-200"
          }`}>
            <span className={`text-[9px] uppercase font-bold ${isLightMode ? "text-slate-800" : "text-slate-400"}`}>Zoom:</span>
            <button 
              onClick={() => setScaleFactor(prev => Math.max(0.4, prev - 0.1))} 
              className={`w-4 h-4 flex items-center justify-center rounded text-[10px] font-black transition active:scale-90 ${
                isLightMode ? "bg-slate-200 hover:bg-slate-300 text-slate-900" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              -
            </button>
            <span className={`font-mono text-[9px] min-w-[28px] text-center ${isLightMode ? "text-slate-900 font-bold" : "text-slate-200"}`}>
              {Math.round(scaleFactor * 100)}%
            </span>
            <button 
              onClick={() => setScaleFactor(prev => Math.min(1.5, prev + 0.1))} 
              className={`w-4 h-4 flex items-center justify-center rounded text-[10px] font-black transition active:scale-90 ${
                isLightMode ? "bg-slate-200 hover:bg-slate-300 text-slate-900" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              +
            </button>
            <button 
              onClick={() => {
                const width = window.innerWidth;
                const targetWidth = rotateLandscape ? window.innerHeight : width;
                if (targetWidth >= 1600) {
                  setScaleFactor(1.15);
                } else if (targetWidth >= 1280) {
                  setScaleFactor(1.05);
                } else {
                  setScaleFactor(Math.max(0.4, parseFloat((targetWidth / 1320).toFixed(2))));
                }
              }} 
              className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider transition active:scale-95 ${
                isLightMode ? "bg-cyan-100 hover:bg-cyan-200 text-cyan-950" : "bg-cyan-950 text-cyan-300"
              }`}
            >
              Fit
            </button>
          </div>

          {/* Force Rotate / Landscape Button for Mobile devices only */}
          <button
            onClick={() => setRotateLandscape(!rotateLandscape)}
            className={`xl:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition active:scale-95 cursor-pointer border shrink-0 ${
              rotateLandscape
                ? (isLightMode ? "bg-amber-100 text-amber-950 border-amber-400" : "bg-amber-500/20 text-amber-300 border-amber-500/30")
                : (isLightMode ? "bg-slate-200 hover:bg-slate-300 text-slate-950 border-slate-350" : "bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800")
            }`}
            title="Force rotate table by 90 degrees for optimal landscape viewing on mobile phones"
          >
            <RotateCw className={`w-3.5 h-3.5 ${rotateLandscape ? "animate-spin-slow text-amber-500" : ""}`} />
            <span>{rotateLandscape ? "Portrait" : "Force Landscape"}</span>
          </button>

          {/* Download Blueprint button */}
          <button
            onClick={handleDownloadSVG}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 rounded-xl text-xs font-black uppercase tracking-wider transition active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/20 shrink-0"
            title="Download HD Vector SVG (perfect for 4K prints, labs, and homework)"
          >
            <Download className="w-3.5 h-3.5 stroke-[3px]" />
            <span>Download Periodic Table</span>
          </button>

          {/* Close Panel Button */}
          <button
            onClick={onClose}
            className={`flex items-center gap-1 px-3 py-1.5 border rounded-xl text-xs font-bold uppercase tracking-wider transition active:scale-95 cursor-pointer shrink-0 ${theme.buttonBg} border ${theme.buttonBorder}`}
          >
            <X className="w-3.5 h-3.5" />
            <span>Close Table</span>
          </button>
        </div>
      </div>

      {/* Mobile Orientation Alert */}
      <div className={`xl:hidden block rounded-2xl p-3 text-center text-xs mb-4 border ${
        isLightMode 
          ? "bg-cyan-50 border-cyan-300 text-cyan-950 font-bold" 
          : "bg-cyan-950/40 border-cyan-800/30 text-cyan-300"
      }`}>
        <p className="flex items-center justify-center gap-1">
          <Smartphone className="w-4 h-4" />
          <span>Periodic Table fits best in Landscape layout!</span>
        </p>
        <p className={`text-[10px] mt-1 ${isLightMode ? "text-slate-800" : "text-slate-400"}`}>
          Please turn your device horizontally, use the <strong className={`${isLightMode ? "text-cyan-950 font-black" : "text-cyan-400 font-bold"}`}>"Force Landscape"</strong> button above, or click <strong className={`${isLightMode ? "text-cyan-950 font-black" : "text-cyan-400 font-bold"}`}>"Fit"</strong> under Zoom!
        </p>
      </div>

      {/* Interactive Legend & Advanced Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-1.5 relative z-10">
        <div className={`lg:col-span-8 p-3 rounded-2xl border ${theme.panelBg} ${theme.panelBorder}`}>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2">
            <Filter className={`w-3.5 h-3.5 ${isLightMode ? "text-teal-800" : "text-teal-400"}`} />
            <span className={theme.textSecondary}>High-Yield Family Legend &amp; Filter</span>
            {(activeCategoryFilter || activeBlockFilter) && (
              <button
                onClick={() => {
                  setActiveCategoryFilter(null);
                  setActiveBlockFilter(null);
                  setSelectedCategory(null);
                  setSelectedBlock(null);
                  setSelectedElement(ELEMENTS[0]);
                }}
                className={`text-[10px] lowercase ml-auto font-bold ${isLightMode ? "text-cyan-800 hover:text-cyan-950 underline" : "text-cyan-400 hover:text-cyan-300 underline"}`}
              >
                reset filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_KEYS.map((key) => {
              const cat = getCategoryStyles(key, isLightMode);
              const isSelected = activeCategoryFilter === key;
              const isInactive = activeCategoryFilter !== null && !isSelected;
              return (
                <button
                  key={key}
                  onClick={() => {
                    const isNowSelected = !isSelected;
                    setActiveCategoryFilter(isNowSelected ? key : null);
                    setActiveBlockFilter(null);
                    if (isNowSelected) {
                      setSelectedCategory(key);
                      setSelectedElement(null);
                      setSelectedBlock(null);
                    } else {
                      setSelectedCategory(null);
                      setSelectedElement(ELEMENTS[0]);
                      setSelectedBlock(null);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition duration-150 cursor-pointer text-left flex items-center gap-1.5 ${cat.bg} ${cat.text} ${cat.border} ${
                    isSelected ? (isLightMode ? "ring-2 ring-slate-950 border-slate-950 scale-[1.03] shadow-md" : "ring-2 ring-cyan-400 border-cyan-400/80 scale-[1.03] z-10 shadow-lg") : ""
                  } ${isInactive ? "opacity-30 blur-[0.5px]" : "opacity-100"}`}
                >
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`lg:col-span-4 p-3 rounded-2xl border flex flex-col justify-center ${theme.panelBg} ${theme.panelBorder}`}>
          <div className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Layers className={`w-4 h-4 ${isLightMode ? "text-purple-800" : "text-purple-400"}`} />
            <span className={`${theme.textSecondary} text-xs font-black`}>Quantum Blocks Filter</span>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {(["s", "p", "d", "f"] as const).map((b) => {
              const isSelected = activeBlockFilter === b;
              const isInactive = activeBlockFilter !== null && !isSelected;
              return (
                <button
                  key={b}
                  onClick={() => {
                    const isNowSelected = !isSelected;
                    setActiveBlockFilter(isNowSelected ? b : null);
                    setActiveCategoryFilter(null);
                    if (isNowSelected) {
                      setSelectedBlock(b);
                      setSelectedElement(null);
                      setSelectedCategory(null);
                    } else {
                      setSelectedBlock(null);
                      setSelectedElement(ELEMENTS[0]);
                      setSelectedCategory(null);
                    }
                  }}
                  className={`py-3 rounded-xl text-xs font-black uppercase transition cursor-pointer border shadow-sm ${
                    b === "s"
                      ? (isLightMode 
                          ? (isSelected ? "bg-red-600 text-white border-red-700 font-extrabold scale-[1.05]" : "bg-red-50 hover:bg-red-100 border-red-350 text-red-950") 
                          : (isSelected ? "bg-red-450 text-slate-950 font-black border-red-300 scale-[1.05]" : "bg-red-950/70 hover:bg-red-950 border-red-900 text-red-350 font-black"))
                      : b === "p"
                      ? (isLightMode 
                          ? (isSelected ? "bg-purple-600 text-white border-purple-700 font-extrabold scale-[1.05]" : "bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-950") 
                          : (isSelected ? "bg-purple-450 text-slate-950 font-black border-purple-300 scale-[1.05]" : "bg-purple-950/70 hover:bg-purple-950 border-purple-900 text-purple-350 font-black"))
                      : b === "d"
                      ? (isLightMode 
                          ? (isSelected ? "bg-blue-600 text-white border-blue-700 font-extrabold scale-[1.05]" : "bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-950") 
                          : (isSelected ? "bg-blue-450 text-slate-950 font-black border-blue-300 scale-[1.05]" : "bg-blue-950/70 hover:bg-blue-950 border-blue-900 text-blue-350 font-black"))
                      : (isLightMode 
                          ? (isSelected ? "bg-cyan-600 text-white border-cyan-700 font-extrabold scale-[1.05]" : "bg-cyan-50 hover:bg-cyan-100 border-cyan-300 text-cyan-950") 
                          : (isSelected ? "bg-cyan-450 text-slate-950 font-black border-cyan-300 scale-[1.05]" : "bg-cyan-950/70 hover:bg-cyan-950 border-cyan-900 text-cyan-350 font-black"))
                  } ${isInactive ? "opacity-35" : "opacity-100"}`}
                >
                  {b}-block
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Panel Area: Side-By-Side Layout (Table on Left, inspector on the side/right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch relative z-10 flex-1 min-h-0 w-full mb-6">
        
        {/* Left Side: The Periodic Table scrollable container (Cols 1 to 10) */}
        <div 
          className={`xl:col-span-10 w-full p-2.5 md:p-3 rounded-3xl border shadow-2xl overflow-x-auto overflow-y-hidden scrollbar-thin flex flex-col justify-start ${
            isLightMode ? "bg-white border-slate-300" : "bg-slate-950/85 border-slate-900"
          }`}
          style={{
            minHeight: `${Math.max(340, 840 * scaleFactor)}px`,
            height: `${Math.max(340, 840 * scaleFactor)}px`
          }}
        >
          <div 
            style={{
              transform: `scale(${scaleFactor})`,
              transformOrigin: "top left",
              width: `${100 / scaleFactor}%`,
              transition: "transform 0.1s ease-out"
            }}
            className="min-w-[1350px] grid grid-cols-[repeat(18,minmax(72px,1fr))] gap-2 md:gap-2.5"
          >
            {/* Elements map */}
            {Array.from({ length: 10 }, (_, rIdx) => {
              const row = rIdx + 1;
              return Array.from({ length: 18 }, (_, cIdx) => {
                const col = cIdx + 1;

                // Find element at coordinates
                const element = ELEMENTS.find((el) => el.row === row && el.col === col);

                // Handle Lanthanide/Actinide Placeholders in columns 3 of Row 6 and 7
                if (row === 6 && col === 3) {
                  const isLaDimmed = 
                    (activeCategoryFilter && activeCategoryFilter !== "lanthanide") ||
                    (activeBlockFilter && activeBlockFilter !== "f") ||
                    (searchQuery);

                  return (
                    <button
                      type="button"
                      onClick={() => {
                        const isSelected = activeCategoryFilter === "lanthanide";
                        setActiveCategoryFilter(isSelected ? null : "lanthanide");
                        setActiveBlockFilter(null);
                        setSelectedCategory(isSelected ? null : "lanthanide");
                        setSelectedElement(isSelected ? ELEMENTS[0] : null);
                        setSelectedBlock(null);
                      }}
                      key="lanthanides-placeholder"
                      className={`aspect-square p-2 rounded-2xl border flex flex-col justify-center items-center text-center transition-all cursor-pointer ${
                        isLightMode ? "bg-cyan-50 border-cyan-300 text-cyan-950" : "bg-cyan-950/40 border-cyan-800/40 text-cyan-300"
                      } ${isLaDimmed ? "opacity-20 saturate-[0.1] blur-[0.2px] hover:opacity-45" : "opacity-85"} ${
                        activeCategoryFilter === "lanthanide" ? (isLightMode ? "ring-2 ring-slate-950 border-slate-950" : "ring-2 ring-cyan-400 border-cyan-400") : ""
                      }`}
                    >
                      <span className={`text-[10px] md:text-[11px] font-black font-mono ${isLightMode ? "text-cyan-900 font-extrabold" : "text-cyan-300"}`}>57-71</span>
                      <span className={`text-sm md:text-base font-black ${isLightMode ? "text-slate-950" : "text-slate-100"}`}>La-Lu</span>
                      <span className={`text-[8px] md:text-[9px] uppercase font-bold leading-none tracking-tighter mt-0.5 ${isLightMode ? "text-slate-800 font-bold" : "text-slate-450"}`}>Lanthanides</span>
                    </button>
                  );
                }

                if (row === 7 && col === 3) {
                  const isAcDimmed = 
                    (activeCategoryFilter && activeCategoryFilter !== "actinide") ||
                    (activeBlockFilter && activeBlockFilter !== "f") ||
                    (searchQuery);

                  return (
                    <button
                      type="button"
                      onClick={() => {
                        const isSelected = activeCategoryFilter === "actinide";
                        setActiveCategoryFilter(isSelected ? null : "actinide");
                        setActiveBlockFilter(null);
                        setSelectedCategory(isSelected ? null : "actinide");
                        setSelectedElement(isSelected ? ELEMENTS[0] : null);
                        setSelectedBlock(null);
                      }}
                      key="actinides-placeholder"
                      className={`aspect-square p-2 rounded-2xl border flex flex-col justify-center items-center text-center transition-all cursor-pointer ${
                        isLightMode ? "bg-pink-50 border-pink-300 text-pink-950" : "bg-pink-950/40 border-pink-800/40 text-pink-300"
                      } ${isAcDimmed ? "opacity-20 saturate-[0.1] blur-[0.2px] hover:opacity-45" : "opacity-85"} ${
                        activeCategoryFilter === "actinide" ? (isLightMode ? "ring-2 ring-slate-950 border-slate-950" : "ring-2 ring-pink-400 border-pink-400") : ""
                      }`}
                    >
                      <span className={`text-[10px] md:text-[11px] font-black font-mono ${isLightMode ? "text-pink-900 font-extrabold" : "text-pink-300"}`}>89-103</span>
                      <span className={`text-sm md:text-base font-black ${isLightMode ? "text-slate-950" : "text-slate-100"}`}>Ac-Lr</span>
                      <span className={`text-[8px] md:text-[9px] uppercase font-bold leading-none tracking-tighter mt-0.5 ${isLightMode ? "text-slate-800 font-bold" : "text-slate-450"}`}>Actinides</span>
                    </button>
                  );
                }

                // If element exists
                if (element) {
                  const isSelected = selectedElement?.num === element.num;
                  const isHovered = hoveredElement?.num === element.num;
                  const isFamilyHighlighted = activeCategoryFilter === element.category;
                  const isBlockHighlighted = activeBlockFilter === element.block;
                  const isSearchMatch = searchQuery
                    ? element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      element.num.toString() === searchQuery.trim()
                    : true;

                  const catData = getCategoryStyles(element.category, isLightMode);

                  const isDimmed =
                    (activeCategoryFilter && !isFamilyHighlighted) ||
                    (activeBlockFilter && !isBlockHighlighted) ||
                    (searchQuery && !isSearchMatch);

                  return (
                    <motion.button
                      whileHover={{ scale: isDimmed ? 1.0 : 1.05, zIndex: 30 }}
                      onClick={() => {
                        setSelectedElement(element);
                        setSelectedCategory(null);
                        setSelectedBlock(null);
                      }}
                      onMouseEnter={() => setHoveredElement(element)}
                      onMouseLeave={() => setHoveredElement(null)}
                      key={element.num}
                      className={`aspect-square p-2 rounded-2xl border flex flex-col justify-between text-left transition-all cursor-pointer relative overflow-hidden select-none ${
                        catData.bg
                      } ${catData.border} ${isDimmed ? "opacity-20 saturate-[0.1] blur-[0.2px] hover:opacity-45" : "opacity-100"} ${
                        isSelected 
                          ? (isLightMode ? "ring-2 ring-slate-950 border-slate-950 shadow-md z-20 scale-[1.04]" : "ring-2 ring-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)] z-20 scale-[1.04]") 
                          : ""
                      }`}
                      style={{
                        boxShadow: isHovered && !isDimmed && !isLightMode ? `0 0 12px ${catData.glow}` : undefined,
                      }}
                    >
                      {/* Top bar: Atomic number + quantum block (micro) */}
                      <div className={`flex justify-between items-center text-[10px] md:text-[11px] font-mono font-extrabold leading-none ${isLightMode ? "text-slate-900 font-extrabold" : "text-slate-400"}`}>
                        <span>{element.num}</span>
                        <span className="opacity-40 uppercase">{element.block}</span>
                      </div>

                      {/* Element Symbol */}
                      <div className="text-center">
                        <span className={`text-xl md:text-2xl font-black tracking-tight font-sans block -mt-1 drop-shadow-sm ${isLightMode ? "text-slate-950 font-black" : "text-white"}`}>
                          {element.symbol}
                        </span>
                      </div>

                      {/* Element Name and Atomic Mass */}
                      <div className="text-center font-sans">
                        <span className={`text-[9.5px] md:text-[10.5px] font-bold block truncate leading-none ${isLightMode ? "text-slate-900 font-extrabold" : "text-slate-200"}`}>
                          {element.name}
                        </span>
                        <span className={`text-[8px] md:text-[9px] font-mono block truncate leading-none mt-0.5 ${isLightMode ? "text-slate-800 font-bold" : "text-slate-500"}`}>
                          {element.mass}
                        </span>
                      </div>
                    </motion.button>
                  );
                }

                // If empty cell, render empty space or spacers
                if (row === 8) {
                  return <div key={`spacer-${col}`} className="h-8" />;
                }

                return <div key={`empty-${row}-${col}`} className="opacity-0 pointer-events-none" />;
              });
            })}
          </div>
        </div>

        {/* Right Side: Sticky element, category or block inspector (Cols 11 to 12) */}
        <div className="xl:col-span-2 w-full xl:sticky xl:top-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedElement ? `el-${selectedElement.num}` : selectedCategory ? `cat-${selectedCategory}` : selectedBlock ? `block-${selectedBlock}` : "empty"}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={`border p-5 rounded-3xl shadow-2xl relative overflow-hidden ${theme.sidebarBg} ${theme.sidebarBorder}`}
            >
              {/* Radial backdrop light on dark mode */}
              {!isLightMode && selectedElement && (
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-2xl opacity-15 pointer-events-none"
                  style={{ backgroundColor: getCategoryStyles(selectedElement.category, false).glow }}
                ></div>
              )}

              {(() => {
                const downloadElementDetails = (element: ElementData) => {
                  const content = `=========================================
ELEMENT DOSSIER: ${element.name.toUpperCase()} (${element.symbol})
=========================================
Atomic Number:      ${element.num}
Chemical Symbol:    ${element.symbol}
Full Name:          ${element.name}
Atomic Mass:        ${element.mass} u
Block Segment:      ${element.block.toUpperCase()}-block
Chemical Family:    ${getCategoryStyles(element.category, false).label}
State (at 25°C):    ${getElementStateAt25C(element).toUpperCase()}
Configuration:      ${element.config}
Electronegativity:  ${element.electronegativity !== undefined ? element.electronegativity.toFixed(2) : "N/A"}
Melting Point:      ${element.melt ? `${element.melt} K` : "N/A"}
Boiling Point:      ${element.boil ? `${element.boil} K` : "N/A"}
Discovered/Isolated: ${element.discovered || "Ancient / Unknown"}

-----------------------------------------
Historical & Structural Context:
${getCategoryStyles(element.category, false).desc}
-----------------------------------------
Generated via "Know Your Chemicals" Laboratory
`;

                  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${element.name.toLowerCase()}_properties_report.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                };

                const downloadCategoryDetails = (categoryKey: string) => {
                  const cat = getCategoryStyles(categoryKey, false);
                  const elementsInCategory = ELEMENTS.filter(e => e.category === categoryKey).map(e => `${e.num}. ${e.name} (${e.symbol})`).join("\n  ");
                  const content = `=========================================
CHEMICAL FAMILY REPORT: ${cat.label.toUpperCase()}
=========================================
Family Name: ${cat.label}
Description: ${cat.desc}

Elements belonging to this family:
  ${elementsInCategory}

-----------------------------------------
Generated via "Know Your Chemicals" Laboratory
`;

                  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${categoryKey.replace("-", "_")}_family_report.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                };

                const downloadBlockDetails = (blockKey: string) => {
                  const elementsInBlock = ELEMENTS.filter(e => e.block === blockKey).map(e => `${e.num}. ${e.name} (${e.symbol})`).join("\n  ");
                  const content = `=========================================
QUANTUM BLOCK DOSSIER: ${blockKey.toUpperCase()}-BLOCK
=========================================
Block Name: ${blockKey.toUpperCase()}-Block

Elements belonging to this block segment:
  ${elementsInBlock}

-----------------------------------------
Generated via "Know Your Chemicals" Laboratory
`;

                  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${blockKey}_block_report.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                };

                if (selectedElement) {
                  const catData = getCategoryStyles(selectedElement.category, isLightMode);
                  return (
                    <div className="flex flex-col space-y-5">
                      {/* Element visual Header */}
                      <div className={`flex items-center gap-4 border-b pb-4 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                        <div
                          className={`w-16 h-16 rounded-2xl border flex flex-col justify-center items-center flex-shrink-0 ${catData.bg} ${catData.border} relative`}
                        >
                          <span className={`text-xs font-mono font-black absolute top-1 left-2 ${isLightMode ? "text-slate-950" : "text-slate-300"}`}>
                            {selectedElement.num}
                          </span>
                          <span className={`text-3xl font-black font-sans tracking-tighter leading-none mt-1 ${isLightMode ? "text-slate-950 font-black" : "text-white"}`}>
                            {selectedElement.symbol}
                          </span>
                          <span className={`text-[10px] font-mono font-black absolute bottom-1 right-2 uppercase ${isLightMode ? "text-slate-950" : "text-slate-300"}`}>
                            {selectedElement.block}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h2 className={`text-lg font-black tracking-tight leading-none truncate ${isLightMode ? "text-slate-950" : "text-white"}`}>
                            {selectedElement.name}
                          </h2>
                          <p className={`text-xs font-mono mt-1.5 ${isLightMode ? "text-slate-900 font-semibold" : "text-slate-300"}`}>
                            Mass: <span className="font-bold">{selectedElement.mass} u</span>
                          </p>
                          <span
                            className={`inline-block text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider mt-1.5 ${catData.text} ${theme.badgeBg} border`}
                          >
                            {catData.label}
                          </span>
                        </div>
                      </div>

                      {/* Subatomic & Mass Properties */}
                      <div className="space-y-2">
                        <div className={`flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-1.5 ${isLightMode ? "text-slate-900 border-slate-200" : "text-slate-200 border-slate-800/50"}`}>
                          <Layers className="w-4 h-4 text-blue-500" />
                          <span>Subatomic Structure</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={`p-2 rounded-lg border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                            <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-350"}`}>Atomic Number</span>
                            <span className={`font-mono font-black block mt-1.5 text-base ${isLightMode ? "text-blue-900" : "text-blue-300"}`}>{selectedElement.num}</span>
                          </div>
                          <div className={`p-2 rounded-lg border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                            <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-350"}`}>Atomic Mass</span>
                            <span className={`font-mono font-black block mt-1.5 text-base ${isLightMode ? "text-indigo-900" : "text-indigo-300"}`}>{selectedElement.mass} u</span>
                          </div>
                          <div className={`p-2 rounded-lg border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                            <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>No of Protons</span>
                            <span className={`font-mono font-black block mt-1.5 text-base ${isLightMode ? "text-rose-905" : "text-rose-300"}`}>{selectedElement.num}</span>
                          </div>
                          <div className={`p-2 rounded-lg border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                            <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>No of Electrons</span>
                            <span className={`font-mono font-black block mt-1.5 text-base ${isLightMode ? "text-emerald-900" : "text-emerald-300"}`}>{selectedElement.num}</span>
                          </div>
                          <div className={`p-2 rounded-lg border col-span-2 ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                            <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>No of Neutrons</span>
                            <span className={`font-mono font-black block mt-1.5 text-base ${isLightMode ? "text-amber-900" : "text-amber-300"}`}>
                              {Math.max(0, Math.round(parseFloat(selectedElement.mass.replace(/[()]/g, "")) || 0) - selectedElement.num)} <span className={`text-[10px] font-normal ${isLightMode ? "text-slate-700" : "text-slate-400"}`}>(approx. {Math.round(parseFloat(selectedElement.mass.replace(/[()]/g, "")) || 0)} - {selectedElement.num})</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantum specs */}
                      <div className="space-y-2">
                        <div className={`flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-1.5 ${isLightMode ? "text-slate-900 border-slate-200" : "text-slate-200 border-slate-800/50"}`}>
                          <Sparkles className="w-4 h-4 text-cyan-500" />
                          <span>Quantum Specs</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={`p-2 rounded-lg border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                            <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>Configuration</span>
                            <span className={`font-mono font-bold truncate block mt-1.5 text-sm ${isLightMode ? "text-cyan-900 font-black" : "text-cyan-200"}`}>{selectedElement.config}</span>
                          </div>
                          <div className={`p-2 rounded-lg border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                            <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>Electronegativity</span>
                            <span className={`font-mono font-bold block mt-1.5 text-base ${isLightMode ? "text-amber-900 font-black" : "text-amber-300"}`}>{selectedElement.electronegativity !== undefined ? selectedElement.electronegativity.toFixed(2) : "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Physical properties */}
                      <div className="space-y-2">
                        <div className={`flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-1.5 ${isLightMode ? "text-slate-900 border-slate-200" : "text-slate-200 border-slate-800/50"}`}>
                          <Info className="w-4 h-4 text-emerald-500" />
                          <span>Physical state &amp; thermal</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={`p-2 rounded-lg border col-span-2 ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                            <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>State (Room Temp, 25°C)</span>
                            <span className={`font-bold uppercase block mt-1.5 text-sm ${getLiquidSolidSyntheticColors(getElementStateAt25C(selectedElement), isLightMode)}`}>{getElementStateAt25C(selectedElement)}</span>
                          </div>
                          <div className={`p-2 rounded-lg border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                            <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>Melting Point</span>
                            <span className={`font-mono font-black block mt-1.5 text-sm ${isLightMode ? "text-slate-900 font-black" : "text-slate-100"}`}>{selectedElement.melt ? `${selectedElement.melt} K` : "N/A"}</span>
                          </div>
                          <div className={`p-2 rounded-lg border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                            <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>Boiling Point</span>
                            <span className={`font-mono font-black block mt-1.5 text-sm ${isLightMode ? "text-slate-900 font-black" : "text-slate-100"}`}>{selectedElement.boil ? `${selectedElement.boil} K` : "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      {/* History / Discovered */}
                      {selectedElement.discovered && (
                        <div className={`p-3 border rounded-xl flex items-center justify-between text-sm ${isLightMode ? "bg-cyan-50 border-cyan-300 text-cyan-950 font-bold" : "bg-cyan-950/15 border-cyan-900/30 text-cyan-300"}`}>
                          <span className={`uppercase text-[10px] font-bold ${isLightMode ? "text-slate-850" : "text-slate-250"}`}>Discovered / Isolated</span>
                          <span className={`font-mono font-black text-sm ${isLightMode ? "text-cyan-950" : "text-cyan-200"}`}>{selectedElement.discovered}</span>
                        </div>
                      )}

                      {/* Key Isotopes Info */}
                      <div className="space-y-2">
                        <div className={`flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-wider border-b pb-1.5 ${isLightMode ? "text-slate-900 border-slate-200" : "text-slate-200 border-slate-800/50"}`}>
                          <Atom className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: "8s" }} />
                          <span>Key Isotopes</span>
                        </div>
                        <div className="space-y-2">
                          {getElementIsotopes(selectedElement.num, selectedElement.symbol, selectedElement.name, selectedElement.mass).map((iso, idx) => (
                            <div key={idx} className={`p-2.5 rounded-lg border flex flex-col gap-1 ${isLightMode ? "bg-slate-50 border-slate-200 text-slate-900 font-medium" : "bg-slate-950/45 border-slate-900/80 text-slate-300"}`}>
                              <div className="flex items-center justify-between font-bold text-xs md:text-sm">
                                <span className={isLightMode ? "text-indigo-950 font-extrabold" : "text-cyan-350"}>{iso.name}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isLightMode ? "bg-slate-200 text-slate-950 font-bold border border-slate-300" : "bg-slate-900 text-slate-250 border border-slate-800 font-medium"}`}>
                                  {iso.abundance} {iso.halfLife ? `(t½: ${iso.halfLife})` : ""}
                                </span>
                              </div>
                              <span className={`text-xs leading-normal ${isLightMode ? "text-slate-800 font-medium" : "text-slate-350"}`}>{iso.note}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className={`text-xs italic p-3 rounded-lg border leading-normal ${isLightMode ? "bg-slate-100 border-slate-200 text-slate-900 font-semibold" : "bg-slate-950/30 border-slate-900 text-slate-300"}`}>
                        {catData.desc}
                      </div>
                    </div>
                  );
                }

                if (selectedCategory) {
                  const cat = CATEGORY_DETAILS[selectedCategory];
                  const catData = getCategoryStyles(selectedCategory, isLightMode);
                  return (
                    <div className="flex flex-col space-y-4 max-h-[750px] overflow-y-auto pr-1 scrollbar-thin">
                      <div className={`border-b pb-3 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                        <span className={`inline-block text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${catData.text} ${theme.badgeBg} border`}>
                          Chemical Family
                        </span>
                        <h2 className={`text-lg font-black tracking-tight mt-1.5 ${isLightMode ? "text-slate-950" : "text-white"}`}>
                          {cat?.title || catData.label}
                        </h2>
                      </div>

                      <p className={`text-xs md:text-sm leading-relaxed ${isLightMode ? "text-slate-950 font-medium" : "text-slate-200"}`}>
                        {cat?.desc || catData.desc}
                      </p>

                      {cat && (
                        <>
                          {/* Configuration & Members */}
                          <div className="space-y-3">
                            <div className={`p-2.5 rounded-xl border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                              <span className={`block uppercase text-[10px] font-bold ${isLightMode ? "text-slate-800" : "text-slate-350"}`}>Valence Configuration</span>
                              <span className={`font-mono font-black text-sm block mt-1 ${isLightMode ? "text-teal-900" : "text-teal-300"}`}>{cat.valenceConfig}</span>
                            </div>

                            <div className={`p-2.5 rounded-xl border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                              <span className={`block uppercase text-[10px] font-bold ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>Representative Members</span>
                              <span className={`text-xs leading-normal font-semibold block mt-1.5 ${isLightMode ? "text-slate-950" : "text-slate-200"}`}>{cat.members}</span>
                            </div>
                          </div>

                          {/* Physical Properties */}
                          <div className="space-y-2">
                            <span className={`block text-[10px] uppercase font-bold ${isLightMode ? "text-slate-850" : "text-slate-350"}`}>Physical Properties</span>
                            <ul className="space-y-1.5 text-xs md:text-sm">
                              {cat.physicalProperties.map((prop, idx) => (
                                <li key={idx} className="flex items-start gap-2 leading-normal">
                                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isLightMode ? "bg-slate-600" : "bg-slate-400"}`}></span>
                                  <span className={isLightMode ? "text-slate-950 font-medium" : "text-slate-200"}>{prop}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Chemical Properties */}
                          <div className="space-y-2">
                            <span className={`block text-[10px] uppercase font-bold ${isLightMode ? "text-slate-850" : "text-slate-350"}`}>Chemical Properties</span>
                            <ul className="space-y-1.5 text-xs md:text-sm">
                              {cat.chemicalProperties.map((prop, idx) => (
                                <li key={idx} className="flex items-start gap-2 leading-normal">
                                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isLightMode ? "bg-cyan-600" : "bg-cyan-400"}`}></span>
                                  <span className={isLightMode ? "text-slate-950 font-medium" : "text-slate-200"}>{prop}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Common Uses */}
                          <div className="space-y-2">
                            <span className={`block text-[10px] uppercase font-bold ${isLightMode ? "text-slate-850" : "text-slate-350"}`}>Real-World Applications</span>
                            <ul className="space-y-1.5 text-xs md:text-sm">
                              {cat.commonUses.map((use, idx) => (
                                <li key={idx} className="flex items-start gap-2 leading-normal">
                                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isLightMode ? "bg-emerald-600" : "bg-emerald-400"}`}></span>
                                  <span className={isLightMode ? "text-slate-950 font-medium" : "text-slate-200"}>{use}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  );
                }

                if (selectedBlock) {
                  const block = BLOCK_DETAILS[selectedBlock];
                  return (
                    <div className="flex flex-col space-y-4 max-h-[750px] overflow-y-auto pr-1 scrollbar-thin">
                      <div className={`border-b pb-3 ${isLightMode ? 'border-slate-200' : 'border-slate-800'}`}>
                        <span className={`inline-block text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${isLightMode ? "bg-purple-100 text-purple-900 border-purple-300" : "bg-purple-500/10 text-purple-300 border border-purple-800/30"}`}>
                          Orbital Block Segment
                        </span>
                        <h2 className={`text-lg font-black tracking-tight mt-1.5 ${isLightMode ? "text-slate-950" : "text-white"}`}>
                          {block?.title}
                        </h2>
                      </div>

                      <p className={`text-xs md:text-sm leading-relaxed ${isLightMode ? "text-slate-950 font-medium" : "text-slate-200"}`}>
                        {block?.desc}
                      </p>

                      {block && (
                        <>
                          {/* Technical Grid specs */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className={`p-2.5 rounded-xl border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                              <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>Orbital Geometry</span>
                              <span className={`font-black block mt-1.5 leading-tight text-xs ${isLightMode ? "text-indigo-900" : "text-indigo-300"}`}>{block.orbital}</span>
                            </div>
                            <div className={`p-2.5 rounded-xl border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                              <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>Valence Config</span>
                              <span className={`font-mono font-black block mt-1.5 text-xs ${isLightMode ? "text-teal-900" : "text-teal-300"}`}>{block.electronicConfig}</span>
                            </div>
                            <div className={`p-2.5 rounded-xl border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                              <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>Subshell capacity</span>
                              <span className={`font-black block mt-1.5 text-xs ${isLightMode ? "text-amber-900" : "text-amber-300"}`}>{block.subshells}</span>
                            </div>
                            <div className={`p-2.5 rounded-xl border ${isLightMode ? "bg-slate-100 border-slate-300" : "bg-slate-950/60 border-slate-900"}`}>
                              <span className={`block uppercase text-[10px] font-bold leading-none ${isLightMode ? "text-slate-800" : "text-slate-355"}`}>Periodic range</span>
                              <span className={`font-black block mt-1.5 text-xs ${isLightMode ? "text-emerald-900" : "text-emerald-300"}`}>{block.groupSpan}</span>
                            </div>
                          </div>

                          {/* Block Trends */}
                          <div className="space-y-2">
                            <span className={`block text-[10px] uppercase font-bold ${isLightMode ? "text-slate-850" : "text-slate-350"}`}>Periodic trends</span>
                            <ul className="space-y-1.5 text-xs md:text-sm">
                              {block.trends.map((trend, idx) => (
                                <li key={idx} className="flex items-start gap-2 leading-normal">
                                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isLightMode ? "bg-cyan-600" : "bg-cyan-400"}`}></span>
                                  <span className={isLightMode ? "text-slate-950 font-medium" : "text-slate-200"}>{trend}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Block Features */}
                          <div className="space-y-2">
                            <span className={`block text-[10px] uppercase font-bold ${isLightMode ? "text-slate-850" : "text-slate-350"}`}>Block Characteristics</span>
                            <ul className="space-y-1.5 text-xs md:text-sm">
                              {block.features.map((feat, idx) => (
                                <li key={idx} className="flex items-start gap-2 leading-normal">
                                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isLightMode ? "bg-purple-600" : "bg-purple-400"}`}></span>
                                  <span className={isLightMode ? "text-slate-950 font-medium" : "text-slate-200"}>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  );
                }

                return (
                  <div className={`h-full flex flex-col items-center justify-center text-center p-4 ${isLightMode ? "text-slate-700" : "text-slate-300"}`}>
                    <HelpCircle className={`w-8 h-8 animate-pulse mb-2 ${isLightMode ? "text-slate-600" : "text-slate-400"}`} />
                    <span className="text-sm font-bold">No selection</span>
                    <p className={`text-xs mt-1 leading-relaxed ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Click on an element card, chemical family, or orbital block to inspect deep details.</p>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.div>,
    document.body
  );
}
