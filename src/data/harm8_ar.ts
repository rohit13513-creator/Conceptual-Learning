import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./harm8Util";

// Class VIII Science, How Nature Works in Harmony: 22 assertion-reason questions for the separate Assertion section
// (different from the 10 inside the multiple-choice list).
// A = both true and R explains A, B = both true but R does not explain A, C = A true and R false, D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const HARM8_ASSERTIONS: AssertionReasonQuestion[] = [
  q("A habitat can be as small as the bark of a tree.", "A habitat is a place that provides the right conditions for an organism to live and grow.", "A", "Whatever its size, a place that gives an organism what it needs is its habitat. R explains A."),
  q("Living organisms in a habitat depend on non-living things such as air, water and sunlight.", "A forest may be warm in the day and cool at night.", "B", "Both are true, but the change of temperature between day and night does not explain the dependence of organisms on non-living things."),
  q("The pond with fish had fewer dragonflies than the pond without fish.", "Dragonflies eat fish.", "C", "A is true because fish eat dragonfly larvae. R is false: it is the fish that eat the larvae of dragonflies."),
  q("A habitat with only one kind of organism has no competition for resources.", "Organisms of the same kind need the same food, water and space.", "D", "A is false: all the organisms would need the same resources, so there would be strong competition and a shortage. R is true."),
  q("Fish in a pond affect the production of seeds in the plants around it.", "Fish reduce the number of dragonflies, which leaves more bees and butterflies to pollinate the flowers.", "A", "This is an indirect effect through a third organism. R explains A."),
  q("Wind blowing over a pond makes gentle waves on its surface.", "Interactions between two non-living parts affect the physical conditions of a habitat.", "A", "Wind and water are both non-living parts; their interaction changes the physical condition of the pond. R explains A."),
  q("Forests are terrestrial ecosystems.", "Ponds and lakes are terrestrial ecosystems.", "C", "A is true. R is false: ponds and lakes are aquatic ecosystems."),
  q("A river cannot overlap with a forest ecosystem.", "Ecosystems often overlap and keep interacting with each other.", "D", "A is false: a small river (aquatic) may flow beside forests and farmland (terrestrial). R is true."),
  q("Mushrooms grow on dead logs in the rainy season.", "Mushrooms are fungi that grow on dead matter.", "A", "They feed on dead plants and animals as decomposers. R explains A."),
  q("Grass is a producer.", "Deer eat grass.", "B", "Both are true, but the fact that deer eat grass does not explain why grass is a producer. Grass is a producer because it makes its own food."),
  q("Herbivores are at the second trophic level of a food chain.", "Herbivores feed on producers, which are at the first trophic level.", "A", "The position of an organism in a food chain depends on what it eats. R explains A."),
  q("A food web is a network of interlinked food chains.", "In a food web each organism is eaten by only one kind of organism.", "C", "A is true. R is false: each organism may be eaten by two or more kinds of organisms, and that is why the chains get linked."),
  q("In a crop field the number of eagles is smaller than the number of mice.", "The number of organisms becomes smaller at each higher trophic level of a food chain.", "A", "Producers are the most in number, then the herbivores, then the carnivores. R explains A."),
  q("Nutrients are lost for ever when plants and animals die.", "Decomposers recycle nutrients from dead matter back to the soil.", "D", "A is false: in nature nothing is wasted. R is true."),
  q("Competition helps to keep an ecosystem balanced.", "Competition controls the size of the populations of organisms.", "A", "Without competition one kind could multiply too much and upset the balance. R explains A."),
  q("The Demoiselle Crane visits the water body of Khichan village in winter.", "Migratory birds help farmers to control insect pests.", "B", "Both are true, but the second does not explain the first. Birds migrate to avoid harsh climate and to find food."),
  q("The Sundarbans were declared a World Heritage Site by UNESCO.", "The Sundarbans have the smallest mangrove forest in the world.", "C", "A is true (in 1987). R is false: the Sundarbans have the largest mangrove forest in the world."),
  q("Overfishing can upset the balance of a pond ecosystem.", "Fewer fish means more dragonflies, fewer pollinators and fewer seeds in the plants nearby.", "A", "The change in one population changes the others. R explains A."),
  q("Synthetic fertilisers increase the number of friendly microorganisms in the soil.", "Overuse of synthetic fertilisers lowers the humus in the soil.", "D", "A is false: overuse lowers the number of friendly microorganisms. R is true."),
  q("Overuse of pesticides can increase the number of pests.", "Pesticides kill the natural predators of pests, such as beetles.", "A", "With fewer predators, and with pests becoming resistant, the pests increase. R explains A."),
  q("Kunapa Jala is a liquid fertiliser made from animal and plant waste.", "The ancient Indian text Vrikshayurveda gives importance to soil health.", "B", "Both are true. The text advises organic manure such as Kunapa Jala, but its importance for soil health is not the reason for how Kunapa Jala is made."),
  q("Commensalism is a relationship in which one organism benefits and the other is not affected.", "A tick living on a dog is an example of commensalism.", "C", "A is true. R is false: a tick on a dog is parasitism, since the dog is harmed."),
];
