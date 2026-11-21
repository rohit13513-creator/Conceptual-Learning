import type { CTopic } from "./carbonNotesTypes";

// Class VIII Science, How Nature Works in Harmony (NCERT Chapter 12). Topics 1 to 6: the elephant corridor, habitat, levels of life,
// the pond study, interactions and the ecosystem. In every text: **bold** makes bold, CO2 shows a subscript, ^{..} gives a superscript.
// A slash is never used (the screen would show a fraction): "or", "and" and "per" are used.

export const HARM_A: CTopic[] = [
  {
    id: "h1", category: "Nature as one system", title: "Elephants, Forests and Farms", heading: "Nature as One Connected System",
    sub: "Why elephants enter villages, and what it tells us about nature.",
    blocks: [
      { t: "p", s: "In many parts of India, especially in **Odisha, Jharkhand, West Bengal, Assam and Chhattisgarh**, elephants often enter farms and villages. They damage crops and sometimes even harm people and domestic animals. Why does this happen?" },
      { t: "dia", id: "hm_elephant" },
      { t: "h", s: "A chain of events" },
      { t: "ul", items: [
        "**Vegetation** (the plant cover of an area) becomes scarce and **waterholes dry up** in the elephants' natural home.",
        "Elephants then wander into nearby **farms or plantations** to find food such as **bananas and sugarcane**.",
        "**Changes in rainfall and temperature** affect the plants that grow in a forest. **Cutting trees** for roads and buildings makes it worse.",
        "The forest **dries and shrinks**. Forests are the natural home of many animals, so animals lose their **habitat** and move into places where people live.",
        "Elephants are **adapted to forest life**, so sudden changes make it hard for them to survive.",
      ] },
      { t: "key", title: "Wildlife corridor", s: "A **wildlife corridor** is a strip of natural land that **joins two large forest areas**, so that animals can move safely between them. **Wildlife ecologists** (scientists who study how wild animals live with their surroundings) have marked such corridors in many parts of India. Elephants can then travel between forests **without coming into conflict with human settlements**." },
      { t: "p", s: "This chain of events shows how **closely all parts of nature are linked**. To understand such links, we must study the **components of our environment**." },
      { t: "qa", title: "Probe and ponder", items: [
        ["How might the loss of forest cover and changes in rainfall patterns lead elephants to enter human farms and villages?", "Less rain and fewer trees dry up the forest and the waterholes, so elephants find little food and water. They move out of the shrinking forest to farms and villages, where crops such as bananas and sugarcane are easy food."],
        ["Imagine you are a tree in a dense forest. What kind of relationships would you have with water, sunlight, other animals and other parts of the forest?", "I take water from the soil by my roots and use sunlight to make my food. Birds and insects use me for food and shelter, and I depend on bees and birds for pollination and for spreading my seeds. My fallen leaves are broken down by decomposers and return nutrients to the soil that feeds me."],
        ["Do you think the Earth can thrive without humans? Can humans survive without the Earth?", "Nature managed for millions of years before humans appeared, so the Earth can thrive without humans. Humans cannot survive without the Earth, because we depend on it completely for air, water and food."],
        ["If two kinds of birds compete for the same fruit, how might their way of living change over time?", "They may start feeding at different times of the day or on different trees, so that both kinds can survive."],
        ["Can human actions cause natural disasters?", "Yes. Cutting forests on hills can lead to landslides and floods, and destroying mangroves leaves coasts open to storms."],
      ] },
    ],
  },
  {
    id: "h2", category: "Habitat", title: "Habitat and Its Components", heading: "Habitat and Its Components",
    sub: "Where organisms live, and the living and non-living parts around them.",
    blocks: [
      { t: "h", s: "What is a habitat?" },
      { t: "ul", items: [
        "A **habitat** is the **place where an organism lives**. It gives the organism the right conditions to live and grow.",
        "A habitat may be very **large**, like a forest, or very **small**, like the bark of a tree. Examples: a pond, a forest, a farm, or a large tree such as banyan, mango or pilkhan (white fig).",
        "Plants and animals of a habitat **interact** with each other and **adapt** to the conditions around them.",
        "**Adaptation** is a special feature of an organism that helps it survive in its habitat, for example the gills of a fish for breathing in water.",
      ] },
      { t: "h", s: "Living and non-living parts" },
      { t: "key", title: "Biotic and abiotic components", s: "**Biotic components** are the **living** parts of a habitat: plants, animals and microorganisms. **Abiotic components** are the **non-living** parts: air, water, soil, sunlight and temperature. **Every habitat has both.**" },
      { t: "dia", id: "hm_habitats" },
      { t: "table", head: ["Habitat", "Living beings (biotic)", "Non-living things (abiotic)"], rows: [
        ["Pond", "Fish, frogs, turtles, snakes, ducks, snails, dragonflies, mosquitoes, algae, diatoms, duckweed, lotus", "Water, sunlight, air, mud, stones, dissolved oxygen, temperature"],
        ["Forest", "Grass, trees, shrubs, birds, deer, hare, fox, insects, mushrooms", "Soil, air, sunlight, rainwater, rocks, temperature, humidity"],
      ] },
      { t: "h", s: "Needs of organisms" },
      { t: "ul", items: [
        "Every organism needs **specific conditions** to survive, so some organisms live on land and others in water. Different habitats offer different living conditions.",
        "A pond gives its organisms **food, oxygen, shelter and space to grow**. A fish gets its **biotic need**, food, from small plants and animals of the pond, and its **abiotic need**, oxygen, from the water.",
      ] },
      { t: "h", s: "Sharing the same habitat" },
      { t: "ul", items: [
        "Different organisms in the same habitat may use its resources in **different ways**. A forest may be warm in the day and cool at night. A **snake active at night** and a **rodent active in the day** live in the same forest but face different conditions.",
        "In this way many organisms **coexist (live together) in harmony** in the same habitat.",
        "If two kinds of birds feed on the same fruit, over time they may feed at **different times of the day or on different trees**, so that both can survive.",
      ] },
    ],
  },
  {
    id: "h3", category: "Levels of life", title: "Individual, Population and Community", heading: "Levels of Life in Nature",
    sub: "From one organism to many kinds living together.",
    blocks: [
      { t: "ul", items: [
        "**Individual:** a **single organism**, such as one fish, one deer or one mango tree.",
        "**Population:** a **group of organisms of the same kind** living together in a habitat at a given time. All the fish of one kind in a pond form a population of that fish.",
        "**Community:** **all the different populations** (plants, animals and microorganisms) living together and sharing the same habitat. The members of a community interact and depend on one another for survival.",
      ] },
      { t: "key", title: "Remember", s: "A **population is a part of a community**. A community is made of many populations." },
      { t: "h", s: "Counting a population" },
      { t: "p", s: "A population is studied by **counting its members at a given place and time**. In a 1 m × 1 m area of a school garden there may be **20 plants of one kind** but only **5 plants of another kind**. These are the populations of the two plants in that area." },
      { t: "note", title: "What if there were only one kind of organism?", s: "All of them would need the **same food, water and space**. This would cause strong **competition** and a **shortage of resources**. A habitat with many kinds of organisms shares its resources better." },
      { t: "h", s: "Ever heard of pollination?" },
      { t: "ul", items: [
        "A flower has a **stalk**, green leafy parts called **sepals**, and coloured **petals**. It has two reproductive parts: **carpels (female)** and **stamens (male)**.",
        "The stamens burst and release a yellow, dust-like powder called **pollen grains**.",
        "**Pollination** is the transfer of pollen from the stamens to the carpels of the same flower or of a different flower. The agents that carry pollen are called **pollinators**: wind, water, insects (bees, butterflies), bats and birds.",
        "Pollination is essential for the formation of **fruits and seeds**.",
      ] },
      { t: "dia", id: "hm_pollination" },
    ],
  },
  {
    id: "h4", category: "Every organism matters", title: "The Pond Study: Fish, Dragonflies and Flowers", heading: "Does Every Organism in a Community Matter?",
    sub: "How fish in a pond affect the seeds of plants nearby.",
    blocks: [
      { t: "p", s: "Scientists studied two ponds to see how **fish** affect **seed production** in the plants nearby. **Pond A** had fish and a large number of flowering plants around it. **Pond B** had no fish and fewer flowering plants around it." },
      { t: "ol", items: [
        "Pond A had **fewer dragonflies** than Pond B, because **fish eat the larvae** (young stage) of dragonflies.",
        "Dragonflies eat **flies, bees and butterflies**. With fewer dragonflies, Pond A had **more bees, flies and butterflies**.",
        "These insects **carry pollen from flower to flower** and help plants form seeds.",
        "So flowers near ponds **with fish** may produce **more seeds** than flowers near ponds without fish.",
      ] },
      { t: "dia", id: "hm_pondstudy" },
      { t: "h", s: "Direct and indirect effects" },
      { t: "ul", items: [
        "**Direct effect:** one organism affects another straight away. Fish eat dragonfly larvae; dragonflies eat bees.",
        "**Indirect effect:** one organism affects another **through a third organism**. Fish help the flowering plants by reducing the dragonflies, which leaves more pollinators.",
        "In the figure of the book, **red arrows** show direct effects and **green arrows** show indirect effects.",
      ] },
      { t: "key", title: "Lesson from the pond study", s: "The **living parts** (fish, dragonflies, pollinators, plants) and the **non-living parts** (temperature, water, nutrients) of a habitat **interact with and affect each other**. **Overfishing** by humans can upset this balance: fewer fish means more dragonflies, fewer pollinators and fewer seeds in nearby plants." },
    ],
  },
  {
    id: "h5", category: "Interactions", title: "Interactions in a Habitat", heading: "Interactions Among Organisms and Their Surroundings",
    sub: "Three groups of interactions, with examples from a pond.",
    blocks: [
      { t: "p", s: "Living organisms depend on **non-living things** such as air, water, soil and sunlight. Plants and animals also depend on **each other** for nutrition, respiration and reproduction. So there are interactions **among the living parts** and **between living and non-living parts**. Both are important for survival in any habitat." },
      { t: "dia", id: "hm_interactions" },
      { t: "table", head: ["Living and non-living", "Two non-living parts", "Living parts with each other"], rows: [
        ["Earthworms live in moist soil.", "The day temperature is high because of bright sunlight.", "A frog eats insects."],
        ["Many microbes live in the pond water.", "Water evaporates fast in strong sunlight.", "A water snake eats fish."],
        ["A fish lays eggs in water.", "Wind blowing over the pond makes gentle waves.", "Frogs and fish may compete for small insect larvae."],
        ["Plants use sunlight to make food.", "The soil near the pond is moist because of the water.", "A fish lays eggs near plants to hide them from other fish and frogs."],
        ["Fish take in oxygen dissolved in water.", "Rain fills the pond and raises the water level.", "Bees take nectar from flowers and pollinate them."],
      ] },
      { t: "ul", items: [
        "**Group 1, living and non-living:** these affect life processes such as **nutrition, respiration and reproduction**.",
        "**Group 2, two non-living parts:** these affect the **physical conditions** of the habitat.",
        "**Group 3, among living parts:** these affect the **amount of resources** available for life processes.",
      ] },
    ],
  },
  {
    id: "h6", category: "Ecosystem", title: "Ecosystem", heading: "Ecosystem: Living and Non-living Together",
    sub: "Kinds of ecosystems, how parts depend on each other, and two places compared.",
    blocks: [
      { t: "key", title: "Ecosystem", s: "An **ecosystem** is formed by all the **living parts** (plants, animals, microorganisms) and the **non-living parts** (air, water, soil, sunlight, temperature) of an area, **interacting with each other**. Organisms interact with the non-living parts for **food, shelter and protection**." },
      { t: "ul", items: [
        "An ecosystem can be **large** (a forest, an ocean) or **small** (a pond, a single tree).",
        "**Aquatic ecosystems** are in water: ponds, rivers, lakes, seas and oceans.",
        "**Terrestrial ecosystems** are on land: forests, grasslands, deserts, farms, or even a large banyan, mango or pilkhan tree.",
        "Ecosystems often **overlap**. A small river (aquatic) may flow beside mountains, forests, grassland and farmland (terrestrial), and all of them keep interacting. **Farmland is a human-made ecosystem.**",
      ] },
      { t: "dia", id: "hm_ecosystems" },
      { t: "h", s: "From individual to ecosystem" },
      { t: "p", s: "Life in nature is arranged in levels: **individual → population → community → ecosystem**. The ecosystem contains the community, so **a community is never larger than an ecosystem**." },
      { t: "dia", id: "hm_levels" },
      { t: "h", s: "Living parts depend on non-living parts, and the other way round" },
      { t: "dia", id: "hm_twoway" },
      { t: "ul", items: [
        "**Sunlight, carbon dioxide and water** are needed by plants to make food.",
        "**Soil** gives plants a medium to grow and supplies essential nutrients.",
        "**Air** gives oxygen for respiration to plants as well as animals. **Water** is essential for all living organisms.",
        "Living parts also change the non-living parts. Plants **release oxygen** during photosynthesis, their **roots hold the soil** and prevent erosion, they **keep the soil moist** and help **cool the atmosphere**. Decomposers add nutrients to the soil.",
      ] },
      { t: "h", s: "Two places compared" },
      { t: "table", head: ["", "A park", "A roadside"], rows: [
        ["Living parts", "Many trees, grass, birds, insects and earthworms", "Fewer plants and animals"],
        ["Non-living parts", "Moist soil; cooler and cleaner air", "More dust, smoke and noise; hard ground; higher temperature"],
      ] },
      { t: "p", s: "The living and non-living parts of the two places are different, so they form **different ecosystems**." },
    ],
  },
];
