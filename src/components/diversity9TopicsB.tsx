import React from "react";
import { Topic, b } from "./diversity9Types";

// Lesson topics 9 to 14: Protista, Fungi and the Plant Kingdom.

export const TOPICS_B: Topic[] = [
  {
    id: "protista",
    title: "9. Kingdom Protista",
    category: "Kingdoms",
    heading: "Kingdom Protista: Unicellular Eukaryotes",
    sub: "Single-celled organisms with a true nucleus, living in water or damp places.",
    blocks: [
      { t: "p", body: <>All single-celled eukaryotes that have no cell wall, or a cell wall made of cellulose, are placed in the kingdom {b("Protista")}. They are microscopic and very varied. You can study some of them by making a slide from a hay infusion.</> },
      { t: "activity", title: "Activity 12.5: Let us make a hay infusion", aim: "To find single-celled organisms (protists) in water that has stood with plant matter.", steps: [
        "Collect a small sample of grass after a lawn has been mowed, or collect some straw or fodder.",
        "Take a small glass bottle and fill one fourth of it with the grass, straw or fodder.",
        "Fill the bottle with stagnant water or pond water and mix it with the plant material.",
        "Cover the bottle with a muslin cloth and tie it with a thread.",
        "Keep the bottle aside, undisturbed, for a week.",
        "Slightly open the mouth of the bottle by removing the cloth, just enough to put in a dropper, and carefully take out a drop of water.",
        "Put the drop on a clean slide and observe it under a microscope. Compare what you see with Figure 8.",
        "Take care: the infusion may smell bad. Wear a lab coat, mask and hand gloves, and discard the infusion after autoclaving (sterilising it with hot steam under pressure).",
      ], observation: "You see tiny organisms moving about in the drop of water. Some change shape and creep (like Amoeba), some are slipper-shaped and swim with hair-like cilia (like Paramecium), and some have a tail-like flagellum (like Euglena).", conclusion: "Stagnant or pond water contains protists, and they multiply when there is dead plant matter to feed on. This shows that Protista are single-celled eukaryotes that live in water or damp places." },
      { t: "img", pic: { file: "protists-sketch", alt: "Sketches of Amoeba, Paramecium and Euglena", caption: "Figure 8: Common protists. Amoeba, Paramecium and Euglena" } },
      { t: "ul", items: [
        <>Protists live in water or in moist places. Some are {b("autotrophic")} and others are {b("heterotrophic")}.</>,
        <>They are an important link in aquatic food chains. Some give out oxygen, and others are food for small animals.</>,
        <>Some protists are decomposers and help to recycle nutrients.</>,
      ] },
      { t: "species", title: "Examples from Protista", items: [
        ["Amoeba", "A single-celled organism with no fixed shape that moves and catches food using finger-like extensions of its body, called pseudopodia (false feet). It lives in pond water."],
        ["Paramecium", "A slipper-shaped single-celled organism covered with tiny hair-like cilia that beat to move it and to sweep in food. It lives in fresh water."],
        ["Euglena", "A single-celled organism with a whip-like flagellum for swimming. It makes food by photosynthesis in light and feeds on other matter when there is no light."],
        ["Chlamydomonas", "A tiny green single-celled organism that swims using two flagella. It makes its own food by photosynthesis and lives in fresh water."],
      ] },
      { t: "exq", n: 2, q: "Pause and Ponder: How can a single-celled organism carry out all its life processes when billions of cells are needed to perform similar functions in multicellular organisms like us?", a: "A single cell of a protist has all the parts it needs inside it. Different parts (organelles) of the same cell do the different jobs: taking in food, breathing, removing waste and reproducing. Because the organism is so small, substances can move in and out quickly over its surface. A multicellular body is much larger, so it needs many cells sharing the work, with different tissues for different jobs." },
    ],
  },
  {
    id: "fungi",
    title: "10. Kingdom Fungi",
    category: "Kingdoms",
    heading: "Kingdom Fungi: Multicellular, Heterotrophic Eukaryotes with a Cell Wall",
    sub: "Organisms that feed on dead matter and recycle nutrients in the soil.",
    blocks: [
      { t: "ul", items: [
        <>Fungi are mostly multicellular eukaryotes. Their cell wall is made of {b("chitin")}.</>,
        <>They do not make their own food. They absorb nutrients from dead or decaying matter through fine threads. All these threads together form a network called the {b("mycelium")}.</>,
        <>Most fungi are {b("saprophytes")} (they feed on dead organic matter such as fallen leaves, twigs and dead organisms). So they play a very important role as decomposers.</>,
        <>They break complex organic matter down into simpler substances and make it available in the soil as minerals.</>,
        <>Some fungi live in a mutually helpful partnership with other organisms ({b("symbiotic")}). Others live as {b("parasites")} (they live on or in another organism and harm it) and cause diseases in plants and animals.</>,
        <>They reproduce both sexually and asexually, often by forming {b("spores")} (tiny reproductive cells). They grow best in warm, moist conditions.</>,
      ] },
      { t: "img", pic: { file: "fungi-examples", alt: "Yeast cells, Aspergillus mould and mushrooms", caption: "Figure 9: Common fungi. (a) Yeast, (b) Aspergillus, (c) Mushrooms" } },
      { t: "species", title: "Examples from Fungi", items: [
        ["Yeast", "A tiny single-celled fungus that is used to make bread and to ferment sugar. It is put under fungi because its cell wall is made of chitin, even though it is unicellular."],
        ["Aspergillus", "A common mould that grows as thread-like filaments on stale food. It is used to make enzymes."],
        ["Penicillium", "A blue-green mould that grows on bread and fruit. It is used to make the antibiotic penicillin."],
        ["Mushrooms", "Large (macroscopic) fungi with an umbrella-shaped body that grow on soil and rotting wood. They reproduce by spores, and some are edible while some are poisonous."],
      ] },
      { t: "ul", items: [
        <>Some fungi, like {b("Aspergillus and Penicillium")}, are used to make {b("enzymes")} and {b("antibiotics")}.</>,
        <>Fungi are important decomposers. Without them, the decay of dead plants and animals would be greatly reduced, and the soil fertility and the balance of nature would suffer.</>,
      ] },
      { t: "card", title: "Bridging Science and Society: Wild edible mushrooms", body: [
        <>Wild edible mushrooms are a valuable food, with high nutritional and medicinal value. They are important forest resources used and conserved by many communities, including tribal communities in India.</>,
        <>These communities have traditional knowledge about which mushrooms are edible and which are poisonous. This knowledge is based on {b("folk taxonomy")} (the way local people name and group things). Some wild mushrooms are used as food and some as medicine.</>,
        <>Nowadays, mushroom cultivation is a promising way to earn a living. Mushroom farming is easy because it needs little space and low investment, and the life cycle is fast (30 to 45 days).</>,
      ] },
    ],
  },
  {
    id: "plants-1",
    title: "11. Plantae: Thallophyta",
    category: "Plant Kingdom",
    heading: "Kingdom Plantae: Thallophyta",
    sub: "The simplest plants, with a body that is not divided into root, stem and leaf.",
    blocks: [
      { t: "ul", items: [
        <>Plants are multicellular, autotrophic organisms that carry out photosynthesis.</>,
        <>Their cells have a rigid cell wall, mainly of {b("cellulose")}. It gives support and protection.</>,
        <>All plants belong to the kingdom Plantae. They form the base of most food chains and release oxygen, which is essential for life on the Earth.</>,
        <>The kingdom Plantae is divided into five classes: Thallophyta, Bryophyta, Pteridophyta, Gymnosperm and Angiosperm.</>,
      ] },
      { t: "svg", key: "plant-classes", caption: "Figure 10: The five classes of the plant kingdom" },
      { t: "h", text: "Thallophyta (algae): Primitive Plants" },
      { t: "ul", items: [
        <>The name comes from {b("thallos")} (an undifferentiated body, meaning one not divided into parts) and {b("phyton")} (plant).</>,
        <>They are among the simplest plants and are mostly found in water or in moist places.</>,
        <>They form a {b("thallus")}, a simple body. It lets the plant exchange gases, nutrients and water directly with its surroundings. So they suit life in water.</>,
      ] },
      { t: "img", pic: { file: "spirogyra", alt: "Spirogyra filaments with spiral green chloroplasts", caption: "Figure 11: Spirogyra, a thallophyte" } },
      { t: "species", items: [
        ["Spirogyra", "A green alga that grows as long, thread-like filaments in ponds. Each cell has a spiral, ribbon-shaped green part that does photosynthesis."],
      ] },
      { t: "card", title: "Bridging Science and Society: Lichens", body: [
        <>You may have seen white-green patches on tree trunks, damp walls or stones. These are {b("lichens")}. Elderly people in villages see them as a sign of a pollution-free place.</>,
        <>Lichens change colour with air pollutants. By their colour, researchers can find how much pollutant is in the air. So they are natural {b("bioindicators")} (living things that show the condition of the environment) of air quality.</>,
        <>Villagers collect lichens as forest produce. Some kinds, called {b("patthar ke phool")}, are used as a spice. Some are used as medicine. Since ancient times some have also been used for dyes that give wool and silk a maroon, violet or burgundy colour.</>,
        <>A lichen is a {b("symbiotic")} partnership of two organisms: an autotrophic alga and a heterotrophic fungus. The fungus gives protection, and the alga does photosynthesis and gives food.</>,
        <>Some lichens are poisonous, so they must be classified and identified properly before they are used.</>,
      ] },
    ],
  },
  {
    id: "plants-2",
    title: "12. Plantae: Bryophyta and Pteridophyta",
    category: "Plant Kingdom",
    heading: "Bryophyta and Pteridophyta",
    sub: "The first steps on land, and the first plants with pipes to carry water and food.",
    blocks: [
      { t: "h", text: "Bryophyta: First Steps on Land, Still Need Water" },
      { t: "ul", items: [
        <>The name comes from {b("bryon")} (moss) and {b("phyton")} (plant). Examples are mosses and liverworts.</>,
        <>They show an important shift from water to land. You may have seen them as green mats on damp rocks, old walls and soil, especially in the monsoon.</>,
        <>Their body is more divided than a thallophyte's. They have root-like parts called {b("rhizoids")}, and may have simple stem-like and leaf-like parts.</>,
        <>They live in moist and shady places.</>,
      ] },
      { t: "img", pic: { file: "bryophytes", alt: "Marchantia and moss", caption: "Figure 12: Members of Bryophyta. (a) Marchantia, (b) Moss" } },
      { t: "species", items: [
        ["Marchantia", "A flat, green, ribbon-like liverwort that grows on damp soil and rocks. It has rhizoids underneath instead of true roots."],
        ["Moss", "A tiny green plant that forms soft mats on damp ground and walls. It has thin stalks bearing small capsules and rhizoids instead of roots."],
      ] },
      { t: "activity", title: "Activity 12.6: Let us explore bryophytes", aim: "To compare a bryophyte leaf with the leaves of ordinary plants.", steps: [
        "Observe some bryophytes with the help of a hand lens. Collect them in a watch glass.",
        "Put a drop of water on them and observe them under a dissecting microscope. (A dissecting microscope shows magnified images of live specimens.)",
        "Think: how do they differ from the leaves you usually see on plants around you?",
      ], observation: "The leaf-like parts of a bryophyte are very small, thin and simple. They have no proper veins, and they soak up the drop of water quickly. The ordinary leaves of other plants are larger, have veins, and have a waxy covering.", conclusion: "Bryophytes take in water directly through their body and have no vascular tissue (pipes) for carrying water. So they need to stay moist. Because they need water for reproduction, they are called the amphibians of the plant kingdom. They show how plants began to settle on land while still depending on moisture." },
      { t: "h", text: "Pteridophyta: Adapted to Land, With a Transport System" },
      { t: "ul", items: [
        <>The name comes from {b("pteris")} (from {b("pteron")}, a feather) and {b("phyton")} (plant). Ferns are an example.</>,
        <>They have true roots, stems and leaves. This is a big change from thallophytes and bryophytes.</>,
        <>They have specialised {b("vascular tissues")} (tissues that carry materials): {b("xylem")} carries water and {b("phloem")} carries food, to all parts of the plant.</>,
        <>They still need water for reproduction, and they do not produce seeds.</>,
      ] },
      { t: "imgs", pics: [
        { file: "fern-plant", alt: "A fern with young coiled fronds", caption: "Figure 13: A fern" },
        { file: "fern-stem-section", alt: "Cross section of a fern stem showing xylem and phloem", caption: "Figure 14: Cross section of a fern stem, showing xylem and phloem" },
      ] },
      { t: "species", items: [
        ["Fern", "A green plant with feathery leaves that unroll from a coil. It grows in damp, shady places and reproduces by spores, not seeds."],
      ] },
      { t: "p", body: <>How can we test the idea that ferns have special transport tissue? Cut a cross section of a fern stem and look at it under a microscope, or look at a ready-made permanent slide. It shows xylem and phloem (Figure 14).</> },
      { t: "activity", title: "Activity 12.7: Let us compare", aim: "To compare the vascular tissue of a fern stem with that of a sunflower stem.", steps: [
        "Recall the cross section of the sunflower stem studied earlier in the lesson on plant tissues.",
        "Compare it with the cross section of the fern stem (Figure 14).",
        "Note the difference in the vascular tissue of the fern stem and the stem of higher plants. Write your observations and discuss them in class.",
      ], observation: "In the fern stem, xylem and phloem form one compact central strand, and the vascular tissue is simpler. In the sunflower stem, there are many vascular bundles arranged in a ring, each with xylem and phloem side by side. The sunflower also has a layer of cambium that makes it grow thicker.", conclusion: "Both have xylem and phloem, so both can carry water and food. The vascular tissue of a fern is simpler and less developed than that of the flowering plants. This fits the idea that plant groups gradually evolved better transport systems." },
      { t: "h", text: "Pause and Ponder" },
      { t: "exq", n: 3, q: "Which plant features reduce the dependence on water but still require moist conditions?", a: "True roots, stems and leaves, along with the vascular tissues (xylem and phloem) of pteridophytes, help them take up and carry water to all parts, so they depend less on water around the body than bryophytes. But they still need moist conditions for reproduction, because the male reproductive cells must swim to the female cells." },
      { t: "exq", n: 4, q: "Why do taller plants need specialised transport tissues?", a: "In a tall plant, water and minerals must travel a long way from the roots to the top, and food must travel from the leaves to the roots. Simple diffusion from cell to cell is far too slow over such distances, so xylem and phloem are needed." },
    ],
  },
  {
    id: "plants-3",
    title: "13. Plantae: Gymnosperms and Angiosperms",
    category: "Plant Kingdom",
    heading: "Gymnosperms and Angiosperms",
    sub: "Plants that make seeds, first naked and then inside fruits.",
    blocks: [
      { t: "h", text: "Gymnosperms: Reproduction Without Water" },
      { t: "ul", items: [
        <>The name comes from {b("gymnos")} (naked) and {b("spermos")} (seed). Examples are pines and cycads.</>,
        <>They are well adapted to cold and dry regions. Their needle-like or scale-like leaves reduce loss of water and can bear harsh conditions.</>,
        <>They produce {b("seeds")}. A seed protects the developing embryo (the young plant inside) and holds stored food.</>,
        <>They do not need water for {b("fertilisation")} (the joining of male and female reproductive cells).</>,
        <>Their seeds are not enclosed in fruits. They are often exposed on {b("cones")}.</>,
      ] },
      { t: "img", pic: { file: "pine-cone", alt: "A cone of a pine tree with needle-like leaves", caption: "Figure 15: A cone of pine, with needle-like leaves" } },
      { t: "species", items: [
        ["Pine", "A tall evergreen tree of cold hill regions with needle-like leaves. It bears woody cones that hold its naked seeds."],
        ["Cycad", "A palm-like plant with a thick trunk and a crown of tough, feathery leaves. It bears its naked seeds in cones."],
      ] },
      { t: "h", text: "Angiosperms: Efficient Reproduction and Seed Dispersal" },
      { t: "ul", items: [
        <>The name comes from {b("angeion")} (a vessel) and {b("spermos")} (seed). They are the {b("flowering plants")} and have the most complex body organisation.</>,
        <>They produce flowers and fruits. Flowers attract {b("pollinators")} (animals that carry pollen), which makes reproduction more efficient. Fruits help spread seeds to new places. This is called seed dispersal.</>,
        <>These features let angiosperms live in a very wide range of environments, so they are the most diverse plant group on the Earth.</>,
      ] },
      { t: "img", pic: { file: "gulmohar-tree", alt: "A gulmohar tree covered in red flowers", caption: "Figure 16: An angiosperm tree, the gulmohar" } },
      { t: "species", items: [
        ["Gulmohar", "A large tree that is covered with bright red-orange flowers in summer. It gives good shade and bears seeds inside long pods."],
      ] },
      { t: "activity", title: "Activity 12.8: Let us discuss", aim: "To group flowering plants as monocots or dicots by their leaves.", steps: [
        "Collect different leaves from your surroundings.",
        "Observe their shape and their venation (the pattern of veins).",
        "Group them as monocots or dicots.",
        "Discuss how their structures help them adapt to different conditions and survive.",
      ], observation: "Some leaves have veins running parallel to each other, as in grass, maize and banana. These belong to monocots (plants whose seed has one seed leaf). Other leaves have a net-like pattern of veins, as in peepal, mango and rose. These belong to dicots (plants whose seed has two seed leaves).", conclusion: "Leaf shape and venation help in different ways. Broad leaves with net venation catch plenty of sunlight and spread water through the blade. Narrow leaves with parallel veins, like grass, lose less water and bend in wind without tearing. So the structure of a leaf suits the place where the plant grows." },
      { t: "card", title: "Bridging Science and Society: Hortus Malabaricus", body: [
        <>One of the earliest scientific works on Indian plants, {b("Hortus Malabaricus")}, was put together in the 17th century by Hendrik van Rheede, with the help of Itty Achudan (an Indian herbalist, botanist and physician) and other local experts.</>,
        <>It describes hundreds of plant species and their medicinal uses. It shows how traditional knowledge and science can work together.</>,
      ] },
      { t: "exq", n: 5, q: "Pause and Ponder: How do seeds and fruits affect where and how plants can survive?", a: "A seed protects the baby plant and holds food, and it can wait until conditions are right before it grows. A fruit helps carry the seeds to new places by animals, birds, wind or water, so plants can spread to many different places and survive in many different environments." },
    ],
  },
  {
    id: "plants-table",
    title: "14. Plant Groups Compared",
    category: "Plant Kingdom",
    heading: "Plant Groups Compared: Advantages and Challenges",
    sub: "Every group solves some problems of survival, and meets new ones.",
    blocks: [
      { t: "p", body: <>Different plant groups find different ways of solving problems. Each way has advantages, and also challenges or exceptions.</> },
      { t: "activity", title: "Activity 12.9: Let us study", aim: "To write the advantages and the challenges of each plant group from its main features.", steps: [
        "Study the main features of each plant group carefully.",
        "For each group, write the advantages it has for survival, and the exceptions or challenges it meets.",
      ], observation: "Table 1 gives the main features, and the advantages and the challenges worked out for each group, including the extra points a student can add in the blank lines.", conclusion: "From algae to angiosperms, plant groups show a series of changes in structure that help plants meet the challenges of life on land. Early plants depended on water for support and for reproduction. Gradually, plant groups evolved transport tissues, seeds and flowers. The diversity of plant forms shows many ways of balancing growth, transport, reproduction and survival in different surroundings." },
      { t: "table", head: ["Plant group and main features", "Advantages for survival", "Exceptions or challenges"], rows: [
        ["Thallophyta: body is a thallus, which absorbs water and nutrients and exchanges gases easily with the surroundings.", "Simple body helps survival and spreading in water. No need for a transport system.", "Cannot live on land. Cannot grow large or tall without a support system."],
        ["Bryophyta: began to settle on land but depend strongly on moisture. Body slightly divided, but no true root, stem or leaf. No vascular tissue. Need water for reproduction, because male cells must swim to female cells.", "Plant amphibians. Body adapted to live on moist land. They can grow where algae cannot.", "Always need moisture. Stay small because there is no tissue to carry water upward."],
        ["Pteridophyta: true roots, stems and leaves. Xylem and phloem carry water and food. Still depend on water for reproduction. No seeds.", "Live on land. Carry food and water to all parts, so they can grow taller.", "Reproduction does not take place without water. No seeds, so they are limited to damp, shady places."],
        ["Gymnosperm: live on land. Needle-like leaves reduce water loss. Water not needed for fertilisation. Seeds not enclosed in fruits, exposed on cones.", "Leaves adapted to dry conditions. No need for water for reproduction. Seeds give continuity of life.", "Seeds are not covered by a fruit, so they are less protected and less well spread."],
        ["Angiosperm: well-developed roots, stems and leaves. Sexual reproduction through flowers. Seeds enclosed in fruits. Seeds spread by insects, birds, animals, wind or water.", "Produce flowers, fruits and seeds. Well-developed system for reproduction. Seeds covered and spread widely.", "Reproduction depends on pollination by different agents. Complex processes need a well-developed tissue system."],
      ] },
      { t: "remember", title: "A pattern to remember", body: <>Going from Thallophyta to Angiosperm: the body gets more divided and more complex, transport tissues appear, then seeds appear, then flowers and fruits appear. At each step plants depend a little less on water and can live in more places.</> },
    ],
  },
];
