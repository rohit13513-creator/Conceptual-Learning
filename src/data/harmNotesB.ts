import type { CTopic } from "./carbonNotesTypes";

// Class VIII Science, How Nature Works in Harmony (NCERT Chapter 12). Topics 7 to 12: producers and consumers, food chains and trophic levels,
// food webs, decomposers, migratory birds, and chains of change in an ecosystem.

export const HARM_B: CTopic[] = [
  {
    id: "h7", category: "Producers and consumers", title: "Producers, Consumers and Decomposers", heading: "Producers and Consumers",
    sub: "Who makes food, who eats it, and who breaks down what is left.",
    blocks: [
      { t: "ul", items: [
        "**Producers (autotrophs):** organisms that **make their own food** (auto = self, troph = food). Green plants make food by **photosynthesis**, using sunlight, carbon dioxide and water. Examples: grass, trees, algae.",
        "**Consumers (heterotrophs):** organisms that **cannot make their own food** and depend on other organisms for it (hetero = other, troph = food).",
        "**Decomposers (saprotrophs):** organisms such as **fungi and bacteria** that feed on dead plants and animals and break them down.",
      ] },
      { t: "dia", id: "hm_groups" },
      { t: "h", s: "Kinds of consumers" },
      { t: "table", head: ["Kind", "Eats", "Examples"], rows: [
        ["Herbivores", "Only plants or plant products", "Deer, hare, cow, grasshopper"],
        ["Carnivores", "Only other animals", "Leopard, tiger, vulture, eagle"],
        ["Omnivores", "Both plants and animals", "Crow, fox, mouse, bear, human"],
      ] },
      { t: "h", s: "Eating habits of forest organisms" },
      { t: "table", head: ["Organism", "Makes its own food", "Feeds on", "Group"], rows: [
        ["Tree", "Yes", "Makes food by photosynthesis", "Producer"],
        ["Deer", "No", "Only plants: grass and leaves", "Herbivore"],
        ["Hare", "No", "Only plants: grass, leaves, roots", "Herbivore"],
        ["Vulture", "No", "Only animals: flesh of dead animals", "Carnivore"],
        ["Shikra (bird)", "No", "Only animals: small birds, lizards, insects", "Carnivore"],
        ["Bengal fox", "No", "Both: rodents, insects, fruits", "Omnivore"],
        ["Squirrel", "No", "Both: nuts, seeds, fruits, insects, eggs", "Omnivore"],
        ["Mouse", "No", "Both: grains, seeds, insects", "Omnivore"],
        ["Mushroom", "No", "Dead plants and animals", "Decomposer"],
      ] },
    ],
  },
  {
    id: "h8", category: "Food chains", title: "Food Chains, Trophic Levels and Pyramid of Numbers", heading: "Who Eats Whom?",
    sub: "Food chains, the steps called trophic levels, and the pyramid of numbers.",
    blocks: [
      { t: "key", title: "Food chain", s: "A **food chain** is a simple sequence showing **who eats whom** in an ecosystem. It shows the feeding links among living organisms **as a straight line**. The **arrow points from the organism that is eaten to the organism that eats it**, and shows the direction in which food (energy) moves. **Every food chain starts with a producer**, and the energy of all food chains comes from the **Sun**." },
      { t: "dia", id: "hm_chains" },
      { t: "ul", items: [
        "**Grass → hare → leopard** (grassland).",
        "**Grass → grasshopper → frog → snake → eagle** (grassland).",
        "**Millet → mouse → eagle** (crop field).",
      ] },
      { t: "h", s: "Trophic levels" },
      { t: "p", s: "Each organism in a food chain has a specific position, called its **trophic level** (troph = food)." },
      { t: "ul", items: [
        "**First level:** producers, such as green plants.",
        "**Second level:** herbivores, such as hares and deer.",
        "**Third level:** small carnivores, such as frogs.",
        "**Higher levels:** large carnivores, such as tigers or vultures.",
        "**Decomposers** act on dead organisms of every level.",
      ] },
      { t: "dia", id: "hm_trophic" },
      { t: "h", s: "Pyramid of numbers" },
      { t: "p", s: "In a crop field there are **many millet plants**, **fewer mice** that eat the millets and **very few eagles** that eat the mice. If we arrange the numbers with the **largest at the base** and the **smallest at the top**, the shape is a **pyramid**." },
      { t: "key", title: "Pyramid of numbers", s: "A **pyramid of numbers** shows the **number of organisms at each trophic level** of a food chain, with the **producers at the base**. Producers are the most in number, and the number becomes **smaller at each higher level**." },
      { t: "dia", id: "hm_pyramid" },
    ],
  },
  {
    id: "h9", category: "Food web", title: "Food Web and Losing a Link", heading: "Food Webs: Chains Joined Together",
    sub: "Why one food chain is not enough, and what happens when an organism disappears.",
    blocks: [
      { t: "p", s: "In an ecosystem, one organism may be **eaten by two or more kinds** of organisms, and one animal may eat **many kinds of food**. So many food chains are **linked with each other**." },
      { t: "key", title: "Food web", s: "A **food web** is a **network of many interlinked food chains** in an ecosystem. Example: grass is eaten by the hare, the mouse and the grasshopper; the mouse is eaten by the fox, the owl, the snake and the hawk." },
      { t: "dia", id: "hm_web" },
      { t: "h", s: "What happens when a link is lost?" },
      { t: "table", head: ["Change", "Effect"], rows: [
        ["Frogs disappear from grass → grasshopper → frog → snake", "Grasshoppers **increase** (nothing eats them) and eat up more grass. Snakes **decrease** because they lose their food."],
        ["The hare population falls because of a disease", "Foxes and eagles get less food, so their numbers may fall or they eat more of other animals. The grass and plants eaten by hares may grow more."],
      ] },
      { t: "note", title: "Why an ecosystem needs more than producers", s: "An ecosystem with **only producers** cannot last. **Without decomposers**, dead plants would pile up and nutrients would never return to the soil. **Without consumers**, nothing would pass food along the chain or keep the number of plants in check." },
    ],
  },
  {
    id: "h10", category: "Decomposers", title: "Decomposers and Recycling", heading: "What Happens to Waste in Nature?",
    sub: "How dead matter is broken down and nutrients are used again.",
    blocks: [
      { t: "ul", items: [
        "Living organisms grow, carry out life processes and finally die. During their life they also produce a lot of **waste**: dead leaves, droppings and food waste.",
        "In the rainy season small umbrella-like **mushrooms** grow on dead plants and logs. Mushrooms are a kind of **fungi** that grow on dead matter.",
        "**Fungi and bacteria** break down the complex substances of dead plants and animals into **simpler substances**. This returns important **nutrients to the soil**.",
        "Tiny insects such as **beetles and flies** on animal droppings (for example elephant dung) help break them down and recycle nutrients.",
      ] },
      { t: "key", title: "Decomposition", s: "**Decomposition** is the breaking down of dead plants, animals and their wastes into simple substances. It is done by **decomposers** (**saprotrophs**; sapro = rotten). Many of the **nutrients in the soil** that plants use to grow come from decomposition, so decomposers **recycle nutrients**. In nature **nothing is wasted: everything is reused**." },
      { t: "dia", id: "hm_decomp" },
      { t: "note", title: "A forest without decomposers", s: "Dead leaves, fallen trees and dead bodies of animals would **pile up** everywhere. Nutrients would stay **locked in dead matter** and the soil would lose its fertility. Plants would grow poorly, and then the herbivores and carnivores would also suffer." },
    ],
  },
  {
    id: "h11", category: "Migratory birds", title: "Migratory Birds", heading: "Birds That Link Two Habitats",
    sub: "Why birds travel thousands of kilometres and how they help.",
    blocks: [
      { t: "ul", items: [
        "India has many kinds of habitats and seasons, so many **migratory birds** fly thousands of kilometres to reach Indian habitats. **Migration** is the regular seasonal journey of animals from one region to another.",
        "Birds migrate to **escape harsh climate** and in **search of food**.",
        "They add to the **beauty (aesthetic value)** of the habitats they visit.",
        "They keep the ecosystem in balance as **pollinators and seed dispersers** along their path. In this way they **link two habitats**.",
        "They eat **insect pests**, helping farmers to control pests and, indirectly, to grow healthy crops.",
        "The **Demoiselle Crane** visits the water body of **Khichan village in Jodhpur district (Rajasthan)** every winter.",
        "The Indian Postal Department has released **postal stamps** on migratory birds. Collecting them is a good way to learn where the birds come from and why they migrate.",
      ] },
      { t: "dia", id: "hm_migrate" },
    ],
  },
  {
    id: "h12", category: "Balance", title: "Chain of Changes and Balance in Nature", heading: "How Does One Change Lead to Another?",
    sub: "A change in one place can change many others. The frog legs story and ecological balance.",
    blocks: [
      { t: "h", s: "One change leads to another" },
      { t: "ol", items: [
        "Many plants in a pond die because of **pollution**.",
        "With fewer plants, **less oxygen** is produced in the water.",
        "**Fish begin to die**, and the number of consumers in the pond falls.",
        "With fewer fish to eat them, **insects increase** in number.",
        "The insects spread to nearby farms and damage crops.",
        "Farmers are forced to use **more pesticides**, which harm the environment further.",
      ] },
      { t: "dia", id: "hm_changes" },
      { t: "h", s: "What happens when we intervene in nature? The frog legs story" },
      { t: "ul", items: [
        "In the **1980s** India was a large exporter of **frog legs**, especially of the **Indian bullfrog** (Hoplobatrachus tigerinus). Large-scale catching of frogs reduced their population.",
        "**Frogs eat insects**, so fewer frogs led to a **rise in agricultural pests**.",
        "Farmers had to use more **synthetic (man-made, chemical) pesticides**, which harmed the soil, the water and the health of people and the environment.",
        "To stop further damage, the **Government of India banned the export of frog legs**.",
      ] },
      { t: "dia", id: "hm_frogs" },
      { t: "key", title: "Ecological balance", s: "An ecosystem stays in **balance** when the interactions among organisms and their surroundings keep **populations and resources stable**. This balance is **dynamic** (always adjusting), not fixed. It can be upset by **natural changes** (floods, droughts, diseases) or by **human activities** (pollution, hunting, cutting forests)." },
      { t: "h", s: "Fewer butterflies in a school garden" },
      { t: "ul", items: [
        "**Possible reasons:** pesticides are sprayed, flowering plants are removed, the plants on which caterpillars feed are cut, or the place has become too hot, dry or polluted.",
        "**Steps students can take:** grow nectar-rich flowering plants and the plants that caterpillars eat, and do not use pesticides.",
      ] },
    ],
  },
];
