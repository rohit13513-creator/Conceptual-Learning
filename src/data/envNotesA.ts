import type { CTopic } from "./carbonNotesTypes";

// Class X Science, Our Environment (NCERT Chapter 13). Topics 1 to 5: ecosystem, organisms, food chains, flow of energy, food webs.
// In every text: **bold** makes bold, O3 or CO2 shows a subscript, ^{..} gives a superscript. A slash is never used (the screen would show a fraction).

export const ENV_A: CTopic[] = [
  {
    id: "v1", category: "Ecosystem", title: "The Ecosystem and Its Components", heading: "Ecosystem: What Are Its Components?",
    sub: "Living and non-living things that depend on one another.",
    blocks: [
      { t: "p", s: "We hear the word **environment** on television, in newspapers and from people around us. Our elders say that the environment is not what it used to be, and countries hold global summits on environmental problems. In this chapter we study how the different components of the environment interact with one another and how our activities affect the environment." },
      { t: "key", title: "Ecosystem", s: "All the interacting **organisms** (plants, animals, microorganisms and human beings) in an area **together with the non-living constituents** of the environment form an **ecosystem**." },
      { t: "ul", items: [
        "An ecosystem has **biotic components**: the living organisms.",
        "It also has **abiotic components**: physical factors like **temperature, rainfall, wind, soil and minerals**.",
        "All the living organisms interact with each other, and their growth, reproduction and other activities are affected by the abiotic components. Together they keep a **balance in nature**.",
        "Example: a garden has grasses, trees and flowering plants such as rose, jasmine and sunflower, and animals such as frogs, insects and birds. So a garden is an ecosystem.",
      ] },
      { t: "dia", id: "ev_components" },
      { t: "table", head: ["Natural ecosystems", "Human-made (artificial) ecosystems"], rows: [
        ["Forests, ponds and lakes", "Gardens and crop-fields"],
        ["Nature maintains them without our help", "People make and look after them (an aquarium is also one)"],
      ] },
      { t: "h", s: "The aquarium: an ecosystem that we can design" },
      { t: "p", s: "Think of an aquarium. The fish need free space to swim (a large jar), water, oxygen and food. Oxygen can be given by an oxygen pump (aerator) and fish food is bought from the market. If a few aquatic plants and animals are added, it can become a **self-sustaining system**. An aquarium is a **human-made ecosystem**." },
      { t: "dia", id: "ev_aquarium" },
      { t: "ul", items: [
        "An aquarium cannot be left alone after it is set up. It has to be **cleaned once in a while**, because dead remains and wastes of fish collect in the small tank faster than the few decomposers can break them down.",
        "Ponds and lakes are **much bigger and balanced natural ecosystems**, with many more decomposers, so they are not cleaned by people in the same manner.",
      ] },
    ],
  },
  {
    id: "v2", category: "Organisms", title: "Producers, Consumers and Decomposers", heading: "Producers, Consumers and Decomposers",
    sub: "How organisms get their food and how they depend on each other.",
    blocks: [
      { t: "p", s: "Organisms can be grouped as **producers, consumers and decomposers** according to the manner in which they obtain their sustenance (food) from the environment." },
      { t: "dia", id: "ev_groups" },
      { t: "h", s: "Producers" },
      { t: "ul", items: [
        "Organisms that make **organic compounds like sugar and starch from inorganic substances** using the **radiant energy of the Sun in the presence of chlorophyll** are the **producers**.",
        "All **green plants** and certain **bacteria** that make food by photosynthesis are producers.",
      ] },
      { t: "h", s: "Consumers" },
      { t: "ul", items: [
        "Organisms that depend on the producers, **directly or indirectly**, for food are the **consumers**.",
        "They consume the food produced by the producers or feed on other consumers.",
        "Consumers are classed as **herbivores** (eat plants, for example cow and deer), **carnivores** (eat other animals, for example lion and snake), **omnivores** (eat both, for example human beings and crow) and **parasites** (live on or in another living organism and feed on it, for example tapeworm and lice).",
      ] },
      { t: "h", s: "Decomposers" },
      { t: "ul", items: [
        "When an organism dies, **bacteria and fungi** break down its dead remains and the waste products of organisms.",
        "These microorganisms are the **decomposers**. They break down **complex organic substances into simple inorganic substances** that go into the soil and are **used up once more by the plants**.",
        "Without decomposers, garbage and dead plants and animals would pile up, and the **natural replenishment of the soil** would not take place.",
      ] },
      { t: "key", title: "Interdependence", s: "The producers make the energy of sunlight available to the rest of the ecosystem. The consumers depend on the producers. The decomposers clean up the dead matter and return materials to the soil. **No group can be called the most important**: all of them are needed, and they depend on each other." },
      { t: "qa", title: "In-text question (NCERT)", items: [
        ["What is the role of decomposers in the ecosystem?", "Decomposers (bacteria and fungi) break down the dead remains and wastes of organisms into simple inorganic substances. These go into the soil and are used again by plants, so the materials are recycled and the soil is replenished. They also keep the environment clean."],
      ] },
    ],
  },
  {
    id: "v3", category: "Food chain", title: "Food Chains and Trophic Levels", heading: "Food Chains and Trophic Levels",
    sub: "Who eats whom, step by step.",
    blocks: [
      { t: "p", s: "A series of organisms feeding on one another forms a **food chain**. For example: Grass → Grasshopper → Frog → Snake. In the aquarium, we can write the organisms in order of who eats whom, in a chain of at least three steps." },
      { t: "dia", id: "ev_foodchains" },
      { t: "key", title: "Trophic level", s: "Each **step or level** of a food chain is a **trophic level**. The organisms at the same step belong to the same trophic level." },
      { t: "table", head: ["Trophic level", "Who is in it", "Example"], rows: [
        ["First", "**Producers** (autotrophs): they fix the solar energy and make it available to heterotrophs", "Grass"],
        ["Second", "**Primary consumers**: herbivores", "Grasshopper"],
        ["Third", "**Secondary consumers**: small carnivores", "Frog"],
        ["Fourth", "**Tertiary consumers**: larger carnivores", "Snake"],
      ] },
      { t: "dia", id: "ev_trophic" },
      { t: "ul", items: [
        "The food we eat acts as a **fuel** that gives us energy to do work. So the interactions among the components of the environment involve a **flow of energy** from one component to another.",
        "Autotrophs capture the energy in sunlight and change it into chemical energy. This energy supports all the activities of the living world.",
        "From the autotrophs the energy goes to the heterotrophs (consumers) and to the decomposers.",
      ] },
      { t: "qa", title: "In-text question (NCERT)", items: [
        ["What are trophic levels? Give an example of a food chain and state the different trophic levels in it.", "A trophic level is a step or level in a food chain at which organisms get their food in the same way. Example: Grass → Grasshopper → Frog → Snake. Grass is the producer (first trophic level), grasshopper the primary consumer (second), frog the secondary consumer (third) and snake the tertiary consumer (fourth trophic level)."],
      ] },
    ],
  },
  {
    id: "v4", category: "Energy flow", title: "Flow of Energy in an Ecosystem", heading: "Flow of Energy: The Ten Per Cent Law",
    sub: "Why food chains are short.",
    blocks: [
      { t: "p", s: "When one form of energy is changed into another, **some energy is lost to the environment** in forms that cannot be used again (as you saw in the chapter on Sources of Energy). The flow of energy between the components of the environment has been studied closely, and the findings are:" },
      { t: "ul", items: [
        "The green plants of a land ecosystem capture only about **1% of the energy of sunlight** that falls on their leaves and change it into food energy.",
        "When green plants are eaten by primary consumers, a great deal of energy is **lost as heat** to the environment. Some goes into digestion and doing work, and the rest goes into growth and reproduction. On average **10% of the food eaten is turned into the body** of the consumer and made available to the next level.",
        "So **10%** can be taken as the average amount of organic matter that is present at each step and reaches the next level of consumers.",
        "Because so little energy reaches the next level, **food chains generally have only three or four steps**. After four trophic levels very little usable energy is left.",
        "There are generally **more individuals at the lower trophic levels**, and the greatest number is of the producers.",
      ] },
      { t: "dia", id: "ev_energy" },
      { t: "key", title: "Two things about the flow of energy", s: "(1) The flow of energy is **unidirectional**: the energy captured by autotrophs does not go back to the Sun, and the energy passed to herbivores does not come back to the autotrophs. (2) The energy available at each trophic level **becomes less and less**, because energy is lost at every step." },
      { t: "dia", id: "ev_pyramid10" },
      { t: "qa", title: "Solved example", items: [
        ["A producer level stores 20 000 J of energy. How much energy reaches the primary and the secondary consumers by the ten per cent law?", "Primary consumers: 10% of 20 000 = 2000 J. Secondary consumers: 10% of 2000 = **200 J**. The rest of the energy is lost as heat or used by the organisms themselves."],
        ["Why are there seldom more than four trophic levels?", "About 90% of the energy is lost at each step, so after four steps too little energy remains to support another level."],
      ] },
    ],
  },
  {
    id: "v5", category: "Food web", title: "Food Webs", heading: "Food Webs",
    sub: "Food chains are linked together.",
    blocks: [
      { t: "p", s: "The length and complexity of food chains vary greatly. Each organism is generally **eaten by two or more other kinds of organisms**, which are in turn eaten by several others. So, instead of a straight-line food chain, the relationship can be shown as a series of **branching lines** called a **food web**." },
      { t: "dia", id: "ev_foodweb" },
      { t: "key", title: "Food web", s: "A **food web** is a network of many food chains joined together in an ecosystem." },
      { t: "ul", items: [
        "In the web shown, the hawk can get food from the frog or the snake, and the snake eats the mouse. So there are many different chains.",
        "If one food source fails, the consumer can turn to another, so the food web gives the ecosystem **stability**.",
      ] },
      { t: "h", s: "What happens if all the organisms of one trophic level are removed?" },
      { t: "ul", items: [
        "The organisms of the level **below** it would increase greatly, as no one would eat them, and may destroy their own food.",
        "The organisms of the level **above** it would be left without food and would die or move away.",
        "The effect is different for different levels. If producers are removed, **all** the consumers would lose their food, so the whole ecosystem would collapse. If the top carnivores are removed, the herbivores would multiply and over-graze the plants.",
        "So the organisms of **no trophic level can be removed without causing damage** to the ecosystem.",
      ] },
    ],
  },
];
