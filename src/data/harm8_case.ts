import type { CompetencyQuestion } from "../types-custom";
import { u } from "./harm8Util";

// Class VIII Science, How Nature Works in Harmony: 10 competency-based case studies of the CBSE pattern. A paragraph (or table) is followed by
// three questions: the first of 1 mark, the second of 1 mark and the third of 2 marks, so each case study carries 4 marks.

let k = 0;
type Part = { question: string; marks: number; answer: string; explanation?: string };
const q = (question: string, answer: string, marks: number, explanation?: string): Part => ({ question: u(question), marks, answer: u(answer), explanation: explanation ? u(explanation) : undefined });
const C = (caseTitle: string, caseDescription: string, subQuestions: [Part, Part, Part], diagram?: string): CompetencyQuestion => ({
  id: ++k, caseTitle: u(caseTitle), caseDescription: u(caseDescription), subQuestions, diagram,
});

export const HARM8_COMPETENCY: CompetencyQuestion[] = [
  C("The elephants of Odisha", "In some parts of Odisha, the forests have shrunk because trees were cut for roads and buildings and the rainfall has changed. The waterholes dry up in summer. Elephants have started to wander into nearby farms to eat bananas and sugarcane. The forest department has now marked a strip of forest land joining two large forests, so that the elephants can move between them.",
    [q("Why are the elephants coming to the farms?", "Because their forest habitat has shrunk and dried, and they find little food and water there.", 1),
     q("What is the strip of land that joins two large forests called?", "A wildlife corridor.", 1),
     q("How does such a strip help the elephants and the villagers?", "The elephants can move safely between the forests when they need to, so they do not enter the farms and villages. This avoids conflict between the elephants and the people, and the crops and lives of the villagers are not harmed.", 2)], "hm_elephant"),
  C("A walk in the forest", "During a walk in a forest, Tara noticed some things: (i) an orchid growing on the branch of a tree, which gets support from the branch while the tree is not affected, (ii) a honeybee collecting nectar from a flower, and the flower getting pollinated, (iii) a tick on the body of a stray dog, feeding on its blood, and the dog scratching because of skin irritation.",
    [q("Name the relationship between the orchid and the tree.", "Commensalism.", 1),
     q("Which organism in (iii) is the parasite and which is the host?", "The tick is the parasite and the dog is the host.", 1),
     q("Name the relationship in (ii) and explain how each organism is affected.", "It is mutualism. The bee benefits because it gets nectar, and the flower benefits because it gets pollinated, so both organisms benefit.", 2)], "hm_relations"),
  C("Counting in the school garden", "Students of Class VIII marked an area of 1 m × 1 m in their school garden and counted the organisms in it. They found 20 marigold plants, 5 tulsi plants, 12 ants and 3 earthworms.",
    [q("How many kinds of organisms were found in the marked area?", "Four kinds: marigold plants, tulsi plants, ants and earthworms.", 1),
     q("What is the population of marigold plants in this area?", "20 marigold plants (the group of the same kind of organisms in the habitat at that time).", 1),
     q("The four groups together form a particular level of life. Name it and explain why it is not a population.", "They form a community. It is not a population because a population is made of organisms of the same kind only, while here there are populations of different kinds living in the same habitat.", 2)], "hm_levels"),
  C("Ponds with and without fish", "A group of scientists studied two ponds. In Pond A, which had fish, they counted 4 dragonflies and 40 bees and butterflies around it, and many flowering plants. In Pond B, which had no fish, they counted 25 dragonflies and 12 bees and butterflies, and fewer flowering plants.",
    [q("Why were there fewer dragonflies in Pond A?", "Because the fish ate the larvae of the dragonflies.", 1),
     q("Why did Pond A have more bees and butterflies?", "Dragonflies eat bees and butterflies. With fewer dragonflies in Pond A, more bees and butterflies were left.", 1),
     q("What type of effect do the fish have on the flowering plants? Explain why the flowering plants near Pond A may make more seeds.", "It is an indirect effect, as the fish affect the plants through a third organism, the dragonflies. The bees and butterflies carry pollen from flower to flower, and with more of them there is more pollination, so more seeds are formed.", 2)], "hm_pondstudy"),
  C("The grassland chain", "A grassland has the following food chain: grass → grasshopper → frog → snake → eagle.",
    [q("Which organism is the producer?", "Grass.", 1),
     q("At which trophic level is the frog?", "The third trophic level (a small carnivore).", 1),
     q("If the snakes are killed by farmers, what will happen to the frogs and the eagles? Give a reason.", "The frogs will increase because fewer of them are eaten. The eagles will get less food and may decrease or eat other animals, because the snake is their food in this chain.", 2)], "hm_trophic"),
  C("The millet field", "In a millet field of a village, a farmer counted 1000 millet plants, 100 mice and 2 eagles. He placed the numbers of the three organisms one above the other, with the largest number at the base.",
    [q("Which organism is at the base of the figure?", "The millet plants, the producers.", 1),
     q("What name is given to such a figure?", "A pyramid of numbers.", 1),
     q("The mice of the field are attacked by a disease and their number falls greatly. What will happen to the millet and to the eagles? Explain.", "The millet plants will be eaten less, so they may increase. The eagles will get less food, so their number may fall (or they will hunt other animals).", 2)], "hm_pyramid"),
  C("When the hares fell ill", "In a part of a forest the food web has grass, hares, deer, foxes and eagles. Grass is eaten by hares and deer. Foxes and eagles eat the hares, and eagles also eat the foxes. A disease reduces the number of hares in the forest.",
    [q("Name the producer in this food web.", "Grass.", 1),
     q("Name one organism that will have less food because of the disease.", "The fox or the eagle (both eat hares).", 1),
     q("Explain what may happen to the grass and to the foxes.", "The hares eat less grass, so the grass may grow more (the deer still eat it). The foxes get less food, so their number may fall, or they may eat more of other animals; the whole web changes because the organisms are linked.", 2)], "hm_web"),
  C("Mushrooms on a log", "After the rains, Arjun saw mushrooms growing on a fallen log in the forest. Near it, small beetles were feeding on elephant dung. After a few months, the log had become soft and crumbly and the soil below it was dark and rich.",
    [q("What kind of organisms are mushrooms, and what do they feed on?", "Mushrooms are fungi. They feed on dead matter such as a dead log.", 1),
     q("What is the process by which the log breaks down called?", "Decomposition.", 1),
     q("Why is the soil below the log rich? What would happen to the forest if there were no such organisms?", "The decomposers break down the log into simpler substances and return the nutrients to the soil, which the plants use. Without them the dead matter would pile up, the nutrients would stay locked in it, the soil would lose fertility and the plants would grow poorly.", 2)], "hm_decomp"),
  C("Raman's field", "Raman has grown only sugarcane in his field for many years. He uses a lot of synthetic fertilisers and pesticides. Now his soil is hard and gets washed away in the rain, earthworms have almost disappeared, and the pests have increased in spite of spraying more pesticides. His neighbour grows different crops and uses compost and organic manure, and she finds beetles eating the pests.",
    [q("What name is given to growing the same crop again and again on the same land?", "Monoculture.", 1),
     q("Why have the pests increased in Raman's field?", "The pesticides have killed the natural predators of the pests, and some pests have become resistant to the pesticides.", 1),
     q("Name the kind of farming followed by his neighbour. Write two ways in which it is better for the soil.", "Sustainable (organic or natural) farming. Compost and organic manure keep the humus and the friendly microorganisms in the soil, and growing different crops with natural predators like beetles keeps the pests in check without harming the soil.", 2)], "hm_farming"),
  C("The village that was saved", "Selvam from Cuddalore district of Tamil Nadu said that his village was less affected by the 2004 tsunami than the nearby villages. His village has a thick mangrove forest along the coast. The Sundarbans, in the east of India, also have the largest mangrove forests in the world.",
    [q("What are mangroves?", "Trees and shrubs that grow in salty, muddy coastal water, with special roots that stick out of the mud.", 1),
     q("In which year did UNESCO declare the Sundarbans a World Heritage Site?", "1987.", 1),
     q("How did the mangroves save Selvam's village? Name two threats to the Sundarbans.", "The thick, tangled roots and trunks of the mangroves slowed the waves and reduced their force, so they acted as a natural wall. Threats: cutting of mangroves for fuelwood and farming, illegal hunting, and pollution by industrial waste and untreated sewage.", 2)], "hm_mangrove"),
];
