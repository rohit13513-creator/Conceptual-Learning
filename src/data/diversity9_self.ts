import type { QuizQuestion } from "../types-custom";

const m = (id: number, question: string, options: string[], correctAnswer: number, explanation: string): QuizQuestion => ({ id, question, options, correctAnswer, explanation });

const AR_OPTS: string[] = [
  "Both A and R are true and R is the correct explanation of A.",
  "Both A and R are true but R is NOT the correct explanation of A.",
  "A is true but R is false.",
  "A is false but R is true.",
];
const ar = (id: number, a: string, r: string, correct: number, explanation: string): QuizQuestion =>
  ({ id, question: `Assertion (A): ${a}\nReason (R): ${r}`, options: AR_OPTS, correctAnswer: correct, explanation });

// ── SELF ASSESSMENT: 80 questions, 45 minutes ──
const RAW_SELF: QuizQuestion[] = [
  m(1, "Which of these best defines biodiversity?", ["The number of trees in a forest", "The immense variety of living organisms on the Earth", "Only the animals in a zoo", "Only the crops grown by farmers"], 1, "Biodiversity covers all the variety of life in all habitats."),
  m(2, "Fungi and bacteria help nature mainly by:", ["Pollinating flowers", "Decomposing dead matter and making soil fertile", "Releasing oxygen", "Hunting insects"], 1, "They are decomposers."),
  m(3, "Species found naturally in only one part of the world are:", ["Endemic", "Extinct", "Common", "Wild"], 0, "Endemic species are restricted to a particular region."),
  m(4, "Which of these is endemic to India?", ["Lion-tailed macaque", "Common crow", "Rat", "House fly"], 0, "The lion-tailed macaque is found only in India (Western Ghats)."),
  m(5, "A biodiversity hotspot has:", ["Many endemic species and heavy habitat loss", "No species", "Only plants", "Only marine life"], 0, "That is the meaning of a hotspot."),
  m(6, "Farmers kept many crop varieties because it:", ["Lowers the risk of crop failure", "Makes harvesting slower", "Needs less land", "Makes seeds cheaper"], 0, "Variety gives food security."),
  m(7, "Diversity seen today is mainly the result of:", ["Changes over a vast span of time", "One sudden event", "Human planning", "Weather in a single year"], 0, "Small differences added up over many generations."),
  m(8, "Which is used by scientists to classify organisms?", ["Cell structure", "Time of the day", "The price of food", "Spelling of names"], 0, "Cell structure is one of the features."),
  m(9, "A producer, a consumer and a decomposer are three kinds of:", ["Ecological roles", "Skeletons", "Cell walls", "Genes"], 0, "They describe the ecological role."),
  m(10, "Similar features in organisms suggest:", ["Common ancestors", "Same age", "Same habitat", "Same colour"], 0, "Shared features hint at common ancestry."),
  m(11, "Which one is a benefit of classification?", ["Helps name newly discovered organisms", "Creates new species", "Stops extinction by itself", "Removes similarities"], 0, "Classification helps identify and name new organisms."),
  m(12, "Aristotle grouped animals by:", ["Habitat", "DNA", "Cell wall", "Notochord"], 0, "Land, water and air."),
  m(13, "The two kingdoms of the 18th century system were:", ["Plantae and Animalia", "Monera and Fungi", "Protista and Plantae", "Fungi and Animalia"], 0, "Plantae and Animalia."),
  m(14, "Protista was added because:", ["Amoeba and Paramecium did not fit plants or animals", "Mushrooms were found", "DNA was found", "Viruses were found"], 0, "They are unicellular but move like animals."),
  m(15, "Bacteria were separated into Monera because they:", ["Lack a true nucleus", "Have chlorophyll", "Are multicellular", "Have seeds"], 0, "They are prokaryotes."),
  m(16, "The five kingdom system was proposed in:", ["1969", "1758", "1866", "1938"], 0, "Whittaker proposed it in 1969."),
  m(17, "Which feature separates fungi from plants?", ["Cell wall of chitin and no photosynthesis", "Cell wall of cellulose", "Seeds", "Roots"], 0, "Fungi are heterotrophic with a chitin wall."),
  m(18, "Prokaryotes are found in:", ["Monera", "Protista", "Fungi", "Animalia"], 0, "Monera has prokaryotes."),
  m(19, "Which of the following is unicellular and eukaryotic?", ["Euglena", "Rhizobium", "Spirogyra", "Fern"], 0, "Euglena is a protist."),
  m(20, "Cyanobacteria are important because they:", ["Were among the first to release oxygen", "Are fungi", "Make seeds", "Are animals"], 0, "They changed the atmosphere 2.5 billion years ago."),
  m(21, "Lactobacillus is useful for:", ["Making curd", "Making antibiotics", "Making wood", "Making flowers"], 0, "It turns milk into curd."),
  m(22, "Rhizobium lives in:", ["Root nodules of pulse plants", "Ponds as a protist", "Mushrooms", "Pine cones"], 0, "It helps plants get nitrogen."),
  m(23, "A hay infusion helps us to observe:", ["Protists", "Fossils", "Seeds", "Coral"], 0, "Protists multiply in it."),
  m(24, "Euglena can:", ["Photosynthesise in light and feed on others in the dark", "Make seeds", "Grow flowers", "Have a backbone"], 0, "It is autotrophic and heterotrophic."),
  m(25, "The thread-like network of a fungus is:", ["Mycelium", "Thallus", "Rhizoid", "Cone"], 0, "Mycelium."),
  m(26, "Saprophytes feed on:", ["Dead organic matter", "Sunlight", "Live blood", "Air"], 0, "Saprophytes live on dead matter."),
  m(27, "Which pair is correct?", ["Yeast: unicellular fungus", "Amoeba: fungus", "Mushroom: protist", "Spirogyra: animal"], 0, "Yeast is a unicellular fungus."),
  m(28, "An antibiotic is made from:", ["Penicillium", "Spirogyra", "Moss", "Hydra"], 0, "Penicillium makes penicillin."),
  m(29, "Mushroom farming is popular because:", ["It needs little space and money", "It needs large fields", "It takes years", "It needs no care"], 0, "It has a fast life cycle of 30 to 45 days."),
  m(30, "Lichens are partnerships of:", ["Alga and fungus", "Moss and fern", "Virus and fungus", "Two algae"], 0, "The alga makes food and the fungus protects."),
  m(31, "The five classes of Plantae start with:", ["Thallophyta", "Angiosperm", "Gymnosperm", "Pteridophyta"], 0, "Thallophyta, Bryophyta, Pteridophyta, Gymnosperm and Angiosperm."),
  m(32, "Spirogyra is placed in:", ["Thallophyta", "Bryophyta", "Pteridophyta", "Gymnosperm"], 0, "It is an alga with a thallus."),
  m(33, "Rhizoids are found in:", ["Bryophytes", "Gymnosperms", "Angiosperms", "Ferns only"], 0, "Bryophytes have rhizoids."),
  m(34, "Which plant group has no vascular tissue?", ["Bryophyta", "Pteridophyta", "Gymnosperm", "Angiosperm"], 0, "Bryophytes lack xylem and phloem."),
  m(35, "Ferns:", ["Have true roots, stems and leaves but no seeds", "Have flowers", "Have fruits", "Have naked seeds"], 0, "Ferns are pteridophytes."),
  m(36, "Which tissue carries food in plants?", ["Phloem", "Xylem", "Cuticle", "Wax"], 0, "Phloem carries food."),
  m(37, "Seeds are present in:", ["Gymnosperms and angiosperms", "Bryophytes and ferns", "Algae", "Fungi"], 0, "Only gymnosperms and angiosperms make seeds."),
  m(38, "A pine cone carries:", ["Naked seeds", "Fruits", "Flowers", "Spores of a moss"], 0, "Seeds are exposed on cones."),
  m(39, "The most diverse plant group is:", ["Angiosperm", "Gymnosperm", "Thallophyta", "Bryophyta"], 0, "Flowers and fruits help them live everywhere."),
  m(40, "Parallel venation is a feature of:", ["Monocots", "Dicots", "Ferns", "Mosses"], 0, "Monocots have parallel venation."),
  m(41, "Hortus Malabaricus was compiled by Hendrik van Rheede with the help of:", ["Itty Achudan", "Birbal Sahni", "Ram Bux Singh", "Linnaeus"], 0, "Itty Achudan was an Indian herbalist and physician."),
  m(42, "Animals are divided into two groups on the basis of the:", ["Notochord", "Colour", "Size", "Habitat"], 0, "Non-chordata and chordata."),
  m(43, "The lowest level of organisation in animals is shown by:", ["Porifera", "Cnidaria", "Nematoda", "Annelida"], 0, "Sponges have only cellular organisation."),
  m(44, "Which animal has tentacles for catching prey?", ["Hydra", "Sponge", "Earthworm", "Snail"], 0, "Hydra is a cnidarian."),
  m(45, "Flatworms show:", ["Bilateral symmetry", "A backbone", "An exoskeleton", "A notochord"], 0, "They have a head-tail and front-back body."),
  m(46, "Which group has both a mouth and an anus but no skeleton?", ["Nematoda", "Cnidaria", "Porifera", "Platyhelminthes"], 0, "Roundworms have two openings."),
  m(47, "Segmented body with a body cavity is a feature of:", ["Annelida", "Cnidaria", "Porifera", "Platyhelminthes"], 0, "Earthworms are annelids."),
  m(48, "A hard exoskeleton is found in:", ["Arthropoda", "Annelida", "Nematoda", "Porifera"], 0, "Arthropods have a hard external skeleton."),
  m(49, "Snails belong to:", ["Mollusca", "Annelida", "Cnidaria", "Echinodermata"], 0, "Molluscs are soft-bodied animals."),
  m(50, "An endoskeleton of calcium carbonate is found in:", ["Echinodermata", "Mollusca", "Arthropoda", "Annelida"], 0, "Starfish and sea urchins."),
  m(51, "Which has a notochord at least once in its life?", ["Amphioxus", "Starfish", "Snail", "Earthworm"], 0, "It is a protochordate."),
  m(52, "Vertebrates are put into how many groups?", ["Five", "Three", "Eight", "Seven"], 0, "Fish, amphibians, reptiles, birds and mammals."),
  m(53, "Mammary glands are a feature of:", ["Mammals", "Birds", "Reptiles", "Fish"], 0, "They feed milk to the young."),
  m(54, "Hollow bones and feathers help birds to:", ["Fly", "Swim", "Dig", "Climb"], 0, "They are adaptations for flight."),
  m(55, "The correct order of levels of classification is:", ["Kingdom, Phylum, Class, Order, Family, Genus, Species", "Species, Genus, Kingdom, Class", "Class, Kingdom, Order, Phylum", "Genus, Family, Species, Order"], 0, "Broad to specific."),
  m(56, "Which level has the fewest members and the most common features?", ["Species", "Kingdom", "Phylum", "Class"], 0, "Species is the most specific."),
  m(57, "In Panthera tigris, Panthera is the:", ["Genus", "Species", "Family", "Class"], 0, "The first word is the genus."),
  m(58, "Which scientific name is written correctly?", ["Mangifera indica", "mangifera Indica", "MANGIFERA INDICA", "Mangifera Indica"], 0, "Genus has a capital letter and species is in small letters."),
  m(59, "Binomial nomenclature was given by:", ["Carolus Linnaeus", "Aristotle", "Whittaker", "Woese"], 0, "Linnaeus introduced it."),
  m(60, "The three domains are:", ["Bacteria, Archaea, Eukarya", "Plantae, Animalia, Fungi", "Monera, Protista, Fungi", "Land, water, air"], 0, "Proposed by Carl Woese in 1977."),
  m(61, "Fossils are found in:", ["Layers of rocks, sand and mud", "Only in ice", "Only in water", "Only in trees"], 0, "They are preserved remains."),
  m(62, "The Birbal Sahni Institute of Palaeosciences is in:", ["Lucknow", "Pune", "Kolkata", "Chennai"], 0, "It studies fossil plants."),
  m(63, "The species name of the Purple Frog comes from:", ["The Sahyadri Hills", "The Nilgiri Hills", "The Himalayas", "The Vindhyas"], 0, "Nasikabatrachus sahyadrensis."),
  m(64, "Phumdis are:", ["Floating grasslands of Manipur", "Fossil beds", "Coral reefs", "Types of fungi"], 0, "They are found in Loktak Lake."),
  m(65, "Which human activity is NOT a threat to biodiversity?", ["Planting local trees", "Deforestation", "Pollution", "Overuse of resources"], 0, "Planting local trees helps biodiversity."),
  ar(66, "Bryophytes are called the amphibians of the plant kingdom.", "They can live on land but need water for reproduction.", 0, "Their male cells must swim to reach the female cells."),
  ar(67, "Yeast is placed in the kingdom Fungi.", "Yeast is a multicellular organism.", 2, "Yeast is unicellular. It is placed in fungi because of its chitin wall."),
  ar(68, "Sponges cannot live on land.", "Water flowing through their pores brings food and oxygen to their cells.", 0, "They depend on water currents."),
  ar(69, "Viruses are not placed in the five kingdoms.", "Viruses are acellular, while the five kingdoms are based on cell features.", 0, "They have no cells."),
  ar(70, "Scientists classify organisms using only the habitat in which they live.", "Habitat alone can group together organisms that are not related.", 3, "A is false, because many features such as cell structure and nutrition are used. R is true, and it is the reason habitat alone is not enough."),
  m(71, "A scientist finds an organism that is single-celled, has a nucleus, moves by flagella and photosynthesises. It is most likely a:", ["Protist", "Bacterium", "Fungus", "Moss"], 0, "This matches Euglena."),
  m(72, "A multicellular organism has a chitin cell wall and absorbs food from dead logs. It is a:", ["Fungus", "Plant", "Animal", "Protist"], 0, "These are features of fungi."),
  m(73, "Which pair has the same genus?", ["Panthera tigris and Panthera leo", "Pisum sativum and Mangifera indica", "Panthera tigris and Pisum sativum", "Mangifera indica and Panthera leo"], 0, "Both start with Panthera."),
  m(74, "An animal has jointed legs and a hard outer covering. It is a(n):", ["Arthropod", "Annelid", "Mollusc", "Sponge"], 0, "Jointed appendages and an exoskeleton define arthropods."),
  m(75, "A green mat on a damp wall after rain is most likely made of:", ["Bryophytes", "Gymnosperms", "Angiosperms", "Ferns only"], 0, "Mosses and liverworts grow in moist places."),
  m(76, "Which statement is true for ferns and mosses?", ["Both reproduce without seeds and need water", "Both have flowers", "Both have fruits", "Both have naked seeds"], 0, "Both lack seeds and flowers and need water to reproduce."),
  m(77, "The first group of plants to have flowers and fruits is:", ["Angiosperms", "Gymnosperms", "Ferns", "Mosses"], 0, "Angiosperms are the flowering plants."),
  m(78, "A tall tree with needle-like leaves on a cold hill is most likely a:", ["Gymnosperm", "Bryophyte", "Alga", "Fern"], 0, "Pines have needle-like leaves."),
  m(79, "From Porifera to Echinodermata, the animal body shows increasing:", ["Complexity of organisation", "Number of fins", "Number of seeds", "Size of the cell wall"], 0, "Cellular, tissue, organ and organ system levels."),
  m(80, "The main reason why classification systems keep changing is that:", ["New tools and knowledge reveal new facts", "Scientists dislike old names", "Organisms change names", "Nature has no pattern"], 0, "Science grows with new tools and information."),
];

// Spread the correct answers evenly over A, B, C and D (assertion-reason questions keep their standard order).
export const DIVERSITY9_SELF_ASSESSMENT: QuizQuestion[] = RAW_SELF.map((q, i) => {
  if (q.question.startsWith("Assertion (A)")) return q;
  const target = (i * 3 + 1) % 4;
  const opts = q.options.slice();
  [opts[q.correctAnswer], opts[target]] = [opts[target], opts[q.correctAnswer]];
  return { ...q, options: opts, correctAnswer: target };
});
