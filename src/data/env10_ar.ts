import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./env10Util";

// Class X Science, Our Environment: 25 assertion-reason questions for the separate Assertion section.
// A = both true and R explains A, B = both true but R does not explain A, C = A true and R false, D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const ENV10_ASSERTIONS: AssertionReasonQuestion[] = [
  q("A garden is an ecosystem.", "A garden has living organisms and non-living components that interact with each other.", "A", "An ecosystem is exactly the interacting organisms together with the non-living constituents of an area."),
  q("Abiotic components are not important for an ecosystem.", "Temperature, rainfall and soil affect the growth and reproduction of the organisms.", "D", "The assertion is false. The abiotic components strongly affect the living organisms."),
  q("A pond does not have to be cleaned by people, but an aquarium does.", "A pond is a large natural ecosystem with many decomposers.", "A", "The decomposers of the pond break down the wastes and dead remains, which an aquarium has too few of."),
  q("Producers form the first trophic level of a food chain.", "Producers fix the solar energy and make it available to the heterotrophs.", "A", "All the energy of the food chain begins with the producers."),
  q("Bacteria and fungi are the decomposers of an ecosystem.", "They break down complex organic substances into simple inorganic substances.", "A", "This is the work of decomposers and it returns materials to the soil."),
  q("Cow, lion and snake are all consumers.", "Consumers can make their own food from inorganic substances.", "C", "Consumers cannot make their own food; they depend on the producers directly or indirectly."),
  q("Only about 10% of the energy of a trophic level reaches the next level.", "A great deal of energy is lost as heat, in digestion and in doing work.", "A", "The rest of the energy is lost to the environment or used for the life of the organism."),
  q("Food chains generally have only three or four steps.", "The producers are the most numerous organisms of an ecosystem.", "B", "Both are true. The chains are short because energy is lost at each step, not because producers are numerous."),
  q("There are generally more individuals at the lower trophic levels than at the higher ones.", "Decomposers feed on the dead matter of every trophic level.", "B", "Both are true, but the work of decomposers does not explain the number of individuals."),
  q("A food web is more stable than a single food chain.", "In a food web an organism has more than one source of food and more than one consumer.", "A", "If one food source fails, the organism can turn to another."),
  q("Removing all the producers from an ecosystem affects every other group of organisms.", "All the other organisms depend on the producers directly or indirectly.", "A", "The consumers and decomposers get their energy from the food made by producers."),
  q("Pesticide residues are found in wheat, rice and vegetables.", "Plants absorb pesticides from the soil and water along with minerals.", "A", "The chemicals enter the food chain at the producer level."),
  q("Biological magnification is greatest in the producers.", "Producers are at the first trophic level.", "D", "The assertion is false: the concentration is greatest at the top level. The reason is true."),
  q("Pesticide residues can be removed completely from food by washing.", "Pesticides are not degradable.", "D", "The assertion is false: they cannot always be removed by washing. The reason is true."),
  q("Ozone is a deadly poison, yet it is essential for life at a high level of the atmosphere.", "At the higher levels it absorbs the harmful ultraviolet radiation of the Sun.", "A", "The shielding role of ozone is why it is essential there."),
  q("Ozone forms in the upper atmosphere.", "Ultraviolet radiation splits oxygen molecules into atoms, and the atoms combine with oxygen molecules.", "A", "O2 → O + O and O + O2 → O3."),
  q("The amount of ozone in the atmosphere began to drop sharply in the 1980s.", "The drop was caused by the use of nitrogen in refrigerators.", "C", "The assertion is true, but the drop was linked to synthetic chemicals like CFCs, not to nitrogen."),
  q("The agreement of 1987 was brought about by the World Health Organization.", "The agreement was to freeze the production of CFCs at 1986 levels.", "D", "The assertion is false: the agreement was brought about by the United Nations Environment Programme (UNEP). The reason is true."),
  q("It is now mandatory to make CFC-free refrigerators.", "CFCs used in refrigerators damage the ozone layer.", "A", "CFC-free refrigerators limit the damage to the ozone layer."),
  q("Plastics are non-biodegradable.", "Enzymes are specific in their action, so bacteria cannot break down plastics.", "A", "Decomposers have no enzymes for these human-made materials."),
  q("A heap of biodegradable waste does no harm to the environment.", "Biodegradable waste is broken down by decomposers.", "D", "The assertion is false: heaps of waste can smell, attract pests and spread diseases. The reason is true."),
  q("Wood is a non-biodegradable material.", "Wood is a product of plants.", "D", "Wood is biodegradable (it rots slowly). Being a plant product is true but does not make it non-biodegradable."),
  q("Disposable paper cups are a better choice than disposable plastic cups.", "Paper is biodegradable and plastic is not.", "A", "Paper cups do not persist in the environment as plastic cups do."),
  q("Walking to school instead of going by scooter is an environment-friendly practice.", "Walking is a good exercise for the body.", "B", "Both are true, but it is friendly to the environment because it saves fuel and avoids pollution, not because of the exercise."),
  q("We get no energy if we try to eat coal.", "The enzymes of our body are specific in their action and cannot break down coal.", "A", "A particular enzyme is needed for the break-down of a particular substance."),
];
