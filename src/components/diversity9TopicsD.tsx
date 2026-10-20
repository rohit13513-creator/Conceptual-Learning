import React from "react";
import { Topic, b } from "./diversity9Types";

// Lesson topics 20 to 24: summary, projects, mind map, competitive corner and completion.

export const TOPICS_D: Topic[] = [
  {
    id: "glance",
    title: "20. At a Glance and Projects",
    category: "Revision",
    heading: "At a Glance, and The Journey Beyond",
    sub: "A quick summary of the whole topic, and projects to try on your own.",
    blocks: [
      { t: "card", title: "At a Glance", body: [
        <>Life on the Earth exists in many forms, from simple bacteria to complex animals.</>,
        <>Scientists classify organisms using cell structure, number of cells, mode of nutrition and the ecological role of the organism.</>,
        <>Whittaker's five kingdom classification (Monera, Protista, Fungi, Plantae and Animalia) is a simple and useful way to understand diversity.</>,
        <>The kingdom Plantae has five classes: Thallophyta, Bryophyta, Pteridophyta, Gymnosperm and Angiosperm.</>,
        <>The kingdom Animalia is divided into non-chordata (invertebrates) and chordata (vertebrates) on the basis of the notochord. Non-chordata has eight phyla: Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Arthropoda, Mollusca and Echinodermata.</>,
        <>Protochordates show the change from invertebrates to vertebrates, because they have a notochord at least once in their life. Vertebrates have five groups: fish, amphibians, reptiles, birds and mammals.</>,
        <>Classification is not only about naming. It helps us understand how organisms are related, trace the history of life on the Earth, and conserve biodiversity.</>,
      ] },
      { t: "h", text: "The Journey Beyond: Projects to Try" },
      { t: "ul", items: [
        <>Visit a nearby park or a water body. Look at the water body and its surroundings. Identify ten organisms and put them into kingdoms. (Tip: use the key in Figure 6. A fish is Animalia, a mushroom is Fungi, a grass is Plantae, a pond alga could be Plantae or Protista.)</>,
        <>Talk to a gardener or a forest worker. Ask how they identify species. Compare their traditional methods with scientific methods.</>,
        <>Suppose you study the Pakke Tiger Reserve or another bird sanctuary. How would you organise the information about the bird species? (Tip: group by family or genus, record where and when each is seen, what it eats, and where it nests.)</>,
        <>Do a survey in a forest area near a village and identify edible and poisonous mushrooms with the help of community resource persons who have traditional knowledge. Never taste or eat any wild mushroom yourself.</>,
        <>Collect and study postage stamps of India and the world on plants and animals. Make your own criteria and classify them. Hold a philately (stamp collecting) exhibition in your school.</>,
        <>Study an extinct species and find out how its disappearance affected the organisms that depended on it, and the balance of the ecosystem.</>,
        <>Study the variety of farm animals used in different kinds of farming in different parts of the country.</>,
      ] },
      { t: "remember", title: "The Quest Continues", body: <>What new knowledge might scientists find, and how could it change the classification system? New tools like DNA study have already added the three domain system. Future discoveries may change today's groups again, and that is how science works.</> },
    ],
  },
  {
    id: "mindmap",
    title: "21. Mind Map",
    category: "Revision",
    heading: "Mind Map",
    sub: "The whole topic on one page.",
    blocks: [
      { t: "svg", key: "mind", caption: "Figure 29: Mind map of Diversity and Classification" },
      { t: "h", text: "Key Points at a Glance" },
      { t: "facts", rows: [
        ["Biodiversity", "The variety of living organisms. Endemic species live only in one region. Hotspots have many endemic species and are losing habitat"],
        ["Classification", "Grouping organisms by shared features. It organises study, helps naming and conservation"],
        ["Systems", "Aristotle (habitat), two kingdom (1758), three (1866), four (1938), five kingdom (1969), three domains (1977)"],
        ["Five kingdoms", "Monera, Protista, Fungi, Plantae, Animalia. Based on cell type, cell wall, level of organisation and nutrition"],
        ["Plant classes", "Thallophyta, Bryophyta, Pteridophyta, Gymnosperm, Angiosperm"],
        ["Animal groups", "Non-chordata (8 phyla), Protochordata, Vertebrata (fish, amphibians, reptiles, birds, mammals)"],
        ["Levels", "Kingdom, Phylum, Class, Order, Family, Genus, Species"],
        ["Naming", "Binomial: genus (capital) then species (small), in italics or underlined"],
      ] },
    ],
  },
  {
    id: "competitive-1",
    title: "22. Competitive Corner: Ideas",
    category: "Advanced",
    heading: "Competitive Corner",
    sub: "The main topic is enough for school exams. These ideas take you one step further.",
    blocks: [
      { t: "card", title: "Beyond the Five Kingdoms", body: [
        <>{b("Viruses")} are not placed in any of the five kingdoms. They are {b("acellular")} (they have no cell), they have no cell structure of their own, and they show signs of life only inside a host cell. Outside a host they stay inactive, like non-living matter. So they do not fit a system that is based on cells.</>,
        <>{b("Archaea")} look like bacteria under a microscope, but their genes and chemistry differ. Many live in extreme places such as hot springs, very salty lakes and deep sea vents. They were once put with bacteria in Monera and are now a separate domain.</>,
        <>The cell wall of bacteria is made of a different substance (peptidoglycan) from the cellulose of plants and the chitin of fungi. This is another way to tell them apart.</>,
      ] },
      { t: "card", title: "More on Plants", body: [
        <>Ferns reproduce by {b("spores")}, which are often found in small brown dots under the leaf. Seed plants make seeds. A seed contains an embryo and stored food, but a spore is a single cell with no stored food.</>,
        <>Plants with one seed leaf are {b("monocots")}, and those with two are {b("dicots")}. Monocots usually have parallel venation, and dicots have net venation.</>,
        <>In bryophytes, the male reproductive cell has to swim through a film of water to reach the female cell. That is why they live in damp places and stay small.</>,
      ] },
      { t: "card", title: "More on Animals", body: [
        <>Many cnidarians and echinoderms show {b("radial symmetry")} (they can be cut into matching halves along many planes through the centre), while flatworms and most higher animals show bilateral symmetry.</>,
        <>Birds and mammals are {b("warm-blooded")}. They keep a steady body temperature. Fish, amphibians and reptiles are {b("cold-blooded")}. Their body temperature changes with the surroundings.</>,
      ] },
      { t: "compare", left: "Vertebrate group", right: "Main features", rows: [
        ["Fish", "Live in water, breathe through gills, have fins, and most have scales"],
        ["Amphibians", "Live on land and in water, moist skin, lay eggs in water. The young breathe with gills and the adults with lungs"],
        ["Reptiles", "Dry, scaly skin, lay eggs on land with leathery shells, breathe with lungs"],
        ["Birds", "Feathers, beak, front limbs are wings, hollow bones, lay eggs, breathe with lungs"],
        ["Mammals", "Hair on the body, mammary glands to feed milk, most give birth to young ones"],
      ] },
      { t: "facts", rows: [
        ["Genus vs species", "A genus is a larger group of closely related species. A species is a group of individuals that can breed and give young ones"],
        ["Class vs genus", "A class has more members and fewer common features. A genus has fewer members and more common features"],
        ["Lichen", "A partnership of an alga (makes food) and a fungus (protects and holds water). Used as a bioindicator of air quality"],
        ["Hotspot test", "Many endemic species, plus serious habitat loss"],
      ] },
      { t: "remember", title: "Exam traps", body: <>(1) Yeast is unicellular but is a fungus, because it has a chitin wall. (2) Euglena makes food in light, but is a protist, because it is a unicellular eukaryote that moves. (3) Bryophytes and pteridophytes both lack flowers and seeds, but ferns have vascular tissue and true roots, stems and leaves. (4) Sponges are animals even though they do not move, because they are multicellular and heterotrophic with no cell wall. (5) Write scientific names in italics or underlined, with a capital letter for the genus only. (6) Gymnosperm seeds are naked, not enclosed in a fruit.</> },
    ],
  },
  {
    id: "competitive-2",
    title: "23. Competitive Corner: Solved",
    category: "Advanced",
    heading: "Solved Practice Questions",
    sub: "Try each one on paper first. Then check.",
    blocks: [
      { t: "exq", n: 1, q: "A student finds an organism that is single-celled, has a cell wall of chitin and feeds on dead matter. Which kingdom is it, and why?", a: "It belongs to the kingdom Fungi. A chitin cell wall and feeding on dead matter by absorption are features of fungi. It is like yeast, which is single-celled but still a fungus because of its chitin wall." },
      { t: "exq", n: 2, q: "Why can mosses grow as thick green mats on a wall only in the rainy season?", a: "Mosses have no vascular tissue and no true roots. They take up water directly through the body, and the male reproductive cells need a film of water to swim to the female cells. In the rainy season the wall stays wet, so they can grow and reproduce." },
      { t: "exq", n: 3, q: "Two organisms have the same genus name but different species names. How closely are they related?", a: "They are closely related. Species in the same genus share many features and are put together because of those features. For example, the tiger (Panthera tigris) and the lion (Panthera leo) are both in Panthera." },
      { t: "exq", n: 4, q: "Why is a starfish placed in the group of animals without a notochord even though it has a hard skeleton?", a: "The notochord is a flexible rod-shaped structure and not any skeleton. A starfish has a hard endoskeleton of calcium carbonate, but it never has a notochord, so it is placed with the non-chordates (phylum Echinodermata)." },
      { t: "exq", n: 5, q: "An alga lives in water and a fern lives on land. Name two changes in the fern body that help it live on land.", a: "The fern has true roots, stems and leaves, and it has vascular tissue (xylem and phloem) that carries water and food to all parts. These let it take up water from the soil and grow taller on land." },
      { t: "exq", n: 6, q: "Why do scientists use Latin scientific names instead of common names?", a: "A common name changes from place to place and language to language, so it can cause confusion. A scientific name in the binomial system is the same all over the world, so scientists everywhere know exactly which organism is meant." },
    ],
  },
  {
    id: "complete",
    title: "24. Topic Complete",
    category: "Complete",
    heading: "Topic Complete",
    sub: "Well done. Check what you can now do.",
    blocks: [
      { t: "done", items: [
        "I can explain biodiversity, endemic species and biodiversity hotspots.",
        "I can name the features scientists use to classify organisms, and explain why classification is needed.",
        "I can explain how classification systems changed from Aristotle to the five kingdoms and the three domains.",
        "I can name the five kingdoms and give their main features and examples.",
        "I can name the five classes of plants and describe each, with an example.",
        "I can name the eight groups of invertebrates, with their level of organisation, habitat and skeleton.",
        "I can tell the difference between protochordates and vertebrates, and name the five vertebrate groups.",
        "I can write the seven levels of classification and write a scientific name correctly.",
        "I can explain how fossils show change, and why biodiversity is under threat.",
      ] },
      { t: "facts", rows: [
        ["Five kingdoms", "Monera, Protista, Fungi, Plantae, Animalia"],
        ["Plant classes", "Thallophyta, Bryophyta, Pteridophyta, Gymnosperm, Angiosperm"],
        ["Invertebrate phyla", "Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Arthropoda, Mollusca, Echinodermata"],
        ["Levels", "Kingdom, Phylum, Class, Order, Family, Genus, Species"],
      ] },
      { t: "remember", title: "What to do next", body: <>Go to the Question Bank for practice. Then take the Self Assessment quiz to check how well you know the topic. If you make mistakes, come back to the topic and read it again.</> },
    ],
  },
];
