import type { CompetencyQuestion } from "../types-custom";
import { u } from "./sol8Util";

// Class VIII Science, The Amazing World of Solutes, Solvents, and Solutions: 10 competency-based case studies of the CBSE pattern. A paragraph (or table) is
// followed by three questions: the first of 1 mark, the second of 1 mark and the third of 2 marks, so each case study carries 4 marks.

let k = 0;
type Part = { question: string; marks: number; answer: string; explanation?: string };
const q = (question: string, answer: string, marks: number, explanation?: string): Part => ({ question: u(question), marks, answer: u(answer), explanation: explanation ? u(explanation) : undefined });
const C = (caseTitle: string, caseDescription: string, subQuestions: [Part, Part, Part], diagram?: string): CompetencyQuestion => ({
  id: ++k, caseTitle: u(caseTitle), caseDescription: u(caseDescription), subQuestions, diagram,
});

export const SOL8_COMPETENCY: CompetencyQuestion[] = [
  C("The glass of ORS", "Kabir's mother makes an oral rehydration solution (ORS) by dissolving sugar and salt in a glass of water. Kabir notices that every sip tastes the same. His friend stirs sand into another glass of water and notices that the sand settles at the bottom.",
    [q("Is the ORS a uniform or a non-uniform mixture?", "It is a uniform mixture.", 1),
     q("Name the solute and the solvent in the ORS.", "Sugar and salt are the solutes and water is the solvent.", 1),
     q("Why does every sip of ORS taste the same, while the sand and water mixture is not a solution?", "The sugar and salt are evenly distributed in the water and cannot be seen separately, so the ORS has the same composition everywhere. The sand is not evenly distributed and can be seen settling, so it is a non-uniform mixture and not a solution.", 2)], "sl_mixtures"),
  C("Sugar in the tea", "Meera adds spoon after spoon of sugar into a cup of tea. After some spoons the sugar stops dissolving and settles at the bottom of the cup. She heats the tea and the sugar dissolves again.",
    [q("What name is given to the tea when no more sugar can dissolve in it?", "A saturated solution.", 1),
     q("What happened to the tea when it was heated?", "It behaved as an unsaturated solution, because the solubility of sugar increased with the temperature.", 1),
     q("Give two ways to dissolve the extra sugar in the tea.", "Heat the tea, as the solubility of sugar increases with temperature, or add more tea, which is more solvent.", 2)], "sl_saturation"),
  C("Two glasses of salt water", "Rohan prepares two glasses of salt solution. Glass P has 2 spoons of salt in 100 mL of water. Glass Q has 4 spoons of salt in 50 mL of water. Both solutions are clear and no salt is left at the bottom.",
    [q("Which glass has the more concentrated solution?", "Glass Q.", 1),
     q("How many spoons of salt per 100 mL of water are there in glass Q?", "8 spoons per 100 mL (4 spoons in 50 mL).", 1),
     q("Define concentration and explain why the solution in glass P is called dilute.", "Concentration is the amount of solute present in a fixed quantity of solution. The solution in P has less solute per 100 mL than the solution in Q (2 spoons against 8), so it is dilute compared with Q. Dilute and concentrated are relative terms.", 2)], "sl_concentration"),
  C("The summer pond", "In summer, the water of a pond becomes very warm. Fish are seen coming up to the surface of the water again and again, while in winter they stay in the deeper water without any trouble.",
    [q("Which gas dissolved in the water do the fish need?", "Oxygen.", 1),
     q("How does the temperature affect the solubility of gases in water?", "The solubility of gases decreases as the temperature rises.", 1),
     q("Why do the fish come to the surface in summer?", "Warm water holds less dissolved oxygen, so the fish do not get enough oxygen in the water and come up to the surface. In winter the cold water holds more oxygen.", 2)], "sl_gases"),
  C("Cleaning at home", "Aarav spills some oil paint on his shirt. Water and soap do not remove it. His grandfather uses turpentine and the paint goes. Later Aarav's sister uses acetone to remove her nail polish.",
    [q("Which solvent removed the oil paint?", "Turpentine.", 1),
     q("Why did water not remove the paint?", "Paint does not dissolve in water.", 1),
     q("Water is called the universal solvent. Explain why other solvents are still needed. Name the solvent used for grease.", "Water dissolves more substances than any other common liquid, but it cannot dissolve everything, for example oil, grease, wax, paint and plastics. For such substances other solvents are used. Kerosene or petrol is used for grease.", 2)], "sl_water"),
  C("The packet of oil", "A shopkeeper sells 1 litre packets of cooking oil. Each packet has a mass of 910 g. Neha pours a little of the oil into a glass of water and sees that it floats on the water.",
    [q("What is the density of the oil in g per mL?", "910 g ÷ 1000 mL = 0.91 g per mL.", 1),
     q("Is the oil denser or less dense than water?", "Less dense than water (water has about 1 g per mL).", 1),
     q("Find the relative density of the oil and explain why it floats on the water.", "Relative density = 0.91 ÷ 1 = 0.91, with no unit. The density of the oil is less than that of water, so the oil floats on it.", 2)], "sl_float"),
  C("The stone and the measuring cylinder", "Isha takes 50 mL of water in a measuring cylinder. She ties a stone with a thread and lowers it into the water. The water level rises to 56 mL. The mass of the stone, measured on a digital balance, is 33.6 g.",
    [q("What is the volume of the stone?", "56 − 50 = 6 mL = 6 cm^3.", 1),
     q("Name the method used to find the volume of the stone.", "The displacement method.", 1),
     q("Find the density of the stone and tell whether it floats or sinks in water.", "Density = mass ÷ volume = 33.6 ÷ 6 = 5.6 g per cm^3. It is more than the density of water (1 g per cm^3), so the stone sinks.", 2)], "sl_volume"),
  C("In the kitchen", "Dev puts an unpeeled orange and a peeled orange in a bucket of water. The unpeeled orange floats and the peeled one sinks. He then puts a raw egg in a glass of tap water, where it sinks. His mother adds salt to the water and stirs, and the egg slowly rises and floats.",
    [q("Why does the unpeeled orange float?", "Its peel has air pockets, which make it less dense than water.", 1),
     q("Why does the egg float after salt is added?", "Salt water is denser than tap water.", 1),
     q("State the condition for an object to float in a liquid. Why does the peeled orange sink?", "An object floats in a liquid if its density is less than that of the liquid. The peeled orange has no air pockets, so its density is more than that of water and it sinks.", 2)], "sl_float"),
  C("A very salty lake", "Ananya reads about a very salty lake, which has no fish and no plants, and in which a person floats easily without swimming. Only a few bacteria can live in it. The water of this lake is very dense.",
    [q("Why can a person float easily in this lake?", "The salty water is very dense, denser than the body of the person.", 1),
     q("Why are there no fish in the lake?", "The very salty water draws water out of the cells of living things and holds very little dissolved oxygen.", 1),
     q("How does the density of the water of the lake compare with that of ordinary water? What does this tell about the amount of salt dissolved in it?", "The density of the lake water is more than that of ordinary water (about 1.24 g per cm^3 compared with 1 g per cm^3). It means that a large amount of salt is dissolved in the water of the lake.", 2)], "sl_float"),
  C("Hot air and ice", "At a fair, Tara sees a hot air balloon rising slowly. Her teacher then shows her a glass of water with a piece of ice floating in it. She learns that water has its highest density at 4 °C.",
    [q("Why does the hot air balloon rise?", "The hot air inside is less dense than the cool air around it.", 1),
     q("What happens to the density of a substance when it is heated?", "It generally decreases.", 1),
     q("Why does the ice float on water? How does this help the fish of a lake in very cold weather?", "When water freezes, its particles take up more space (expansion), so the ice is less dense than water and floats. The floating layer of ice keeps the water below warm enough, so the fish and other animals survive.", 2)], "sl_ice"),
];
