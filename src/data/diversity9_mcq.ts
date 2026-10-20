import type { QuizQuestion } from "../types-custom";

const m = (id: number, question: string, options: string[], correctAnswer: number, explanation: string): QuizQuestion => ({ id, question, options, correctAnswer, explanation });

// ── MULTIPLE CHOICE QUESTIONS: Patterns in Life, Diversity and Classification ──
const RAW_MCQS: QuizQuestion[] = [
  // ── Biodiversity, endemic species, hotspots (1-10) ──
  m(1, "The immense variety of living organisms on the Earth is called:", ["Ecosystem", "Biodiversity", "Habitat", "Classification"], 1, "Biodiversity means the large variety of living organisms found in all kinds of habitats."),
  m(2, "Most of the oxygen we breathe is released by:", ["Large trees only", "Microscopic algae in the oceans", "Birds and bats", "Fungi in the soil"], 1, "Microscopic algae in the oceans give out most of the oxygen in the air."),
  m(3, "Which organisms decompose fallen leaves and make the soil fertile?", ["Birds and bees", "Fungi and bacteria", "Algae only", "Ferns"], 1, "Fungi and bacteria break down dead matter and return nutrients to the soil."),
  m(4, "Species that are found naturally only in one particular region of the world are called:", ["Extinct species", "Endemic species", "Migratory species", "Hybrid species"], 1, "Endemic species are restricted to a particular region and are not found naturally anywhere else."),
  m(5, "Which of these is an endemic species of India?", ["Tiger shark", "Nilgiri tahr", "House sparrow", "Crow"], 1, "The Nilgiri tahr, lion-tailed macaque, Nepenthes khasiana and Neelakurinji are found only in India."),
  m(6, "Nepenthes khasiana is the Indian variety of the:", ["Lotus", "Pitcher plant", "Banyan tree", "Orchid"], 1, "Nepenthes khasiana is an Indian pitcher plant found only in India."),
  m(7, "A biodiversity hotspot is a region that has:", ["Only a few species and no habitat loss", "Many endemic species and has lost a lot of its habitat", "Only desert plants", "Only man-made forests"], 1, "A hotspot has a large number of endemic species and has also undergone significant habitat loss."),
  m(8, "Which of these is a global biodiversity hotspot found in India?", ["Western Ghats", "Thar Desert", "Deccan Plateau only", "Gangetic Plains only"], 0, "The Western Ghats, Indo-Burma (including North East India), the Himalayas and Sundaland (including Nicobar Islands) are hotspots."),
  m(9, "Farmers kept many crop varieties for centuries because variety:", ["Looks attractive", "Reduces the risk of crop failure and gives food security", "Makes the crop sweeter", "Needs less seed"], 1, "Diversity of varieties with different useful qualities reduces the risk that all crops fail."),
  m(10, "Which pair is a correct example of an organism helping another process in nature?", ["Bees, pollination", "Fungi, photosynthesis", "Bats, decomposition", "Algae, pollination"], 0, "Birds, bees and bats pollinate flowers."),

  // ── Evolution of biodiversity, need and criteria of classification (11-24) ──
  m(11, "Today's biodiversity is mainly the result of:", ["Sudden creation of all species", "Small differences adding up over many generations", "Human planting only", "Changes in one year"], 1, "Small helpful differences accumulated over many generations and produced new forms of life."),
  m(12, "Sacred groves and the Sangam Tinai system are examples of:", ["Modern biotechnology", "Old Indian traditions that protected habitats and landscapes", "A five kingdom system", "Binomial naming"], 1, "These old traditions show a deep understanding of landscapes and saved local habitats."),
  m(13, "Which of these is NOT a feature normally used for classifying organisms?", ["Cell structure", "Mode of nutrition", "Genetic similarity", "The colour of the observer's clothes"], 3, "Scientists use features such as external features, nutrition, cell structure, reproduction and DNA."),
  m(14, "Producer, consumer or decomposer describes the organism's:", ["Cell structure", "Ecological role", "Reproduction", "Genetic similarity"], 1, "Whether an organism is a producer, consumer or decomposer is its ecological role."),
  m(15, "Autotrophic or heterotrophic describes the:", ["Mode of nutrition", "Level of organisation", "Type of skeleton", "Habitat"], 0, "Autotrophs make their own food and heterotrophs depend on others for food."),
  m(16, "An organism whose cells have a true nucleus is called a:", ["Prokaryote", "Eukaryote", "Autotroph", "Parasite"], 1, "A eukaryote has a membrane-bound true nucleus."),
  m(17, "In Activity 12.1, an eagle, a tiger and a leopard were grouped together because they:", ["Fly", "Eat other animals (carnivores)", "Live in water", "Are active at night only"], 1, "They were grouped by eating habits as carnivores."),
  m(18, "The same organism can fit into different groups because:", ["Classification is wrong", "Different features can be used for grouping", "Organisms change every day", "All groups are the same"], 1, "The group depends on the criterion chosen, such as food, habitat or body covering."),
  m(19, "Similar features in organisms suggest that they:", ["Live in the same house", "May have evolved from common ancestors", "Are of the same age", "Eat the same food"], 1, "Shared features hint at a common ancestry."),
  m(20, "The scientific grouping of living organisms into sets on the basis of similarities and differences is called:", ["Biological classification", "Pollination", "Adaptation", "Fossilisation"], 0, "Biological classification is the scientific system of grouping living organisms."),
  m(21, "Which statement about the need for classification is NOT correct?", ["It makes the study of organisms more systematic", "It helps in naming newly discovered organisms", "It helps conservation of threatened organisms", "It stops new species from being discovered"], 3, "Classification helps in identifying new organisms, not stopping their discovery."),
  m(22, "In the Pakke Tiger Reserve, different hornbills are found in different parts of the forest depending on:", ["Colour of the soil", "Tree size and fruit availability", "Height of the hills only", "Number of tourists"], 1, "Hornbills nest in large old trees and feed on specific fruits."),
  m(23, "If the large, old trees of the Pakke forest disappeared, the hornbills would:", ["Increase in number", "Lose nesting places and food and decrease in number", "Become fish", "Be unaffected"], 1, "They nest only in large old trees with cavities and feed on specific fruits."),
  m(24, "About how many bird species have been recorded in the Pakke Tiger Reserve?", ["About 30", "About 100", "About 300", "About 1,300"], 2, "Nearly 300 bird species are recorded in Pakke. India as a whole has about 1,300."),

  // ── Systems over time (25-34) ──
  m(25, "Aristotle grouped animals on the basis of:", ["DNA", "Habitat: land, water and air", "Cell structure", "Chromosomes"], 1, "He grouped them by habitat and external appearance."),
  m(26, "The two kingdom system, introduced in the 18th century, divided organisms into:", ["Monera and Protista", "Plantae and Animalia", "Fungi and Protista", "Land and water"], 1, "All living organisms were put into Plantae and Animalia."),
  m(27, "Organisms like Amoeba and Paramecium could not be placed in the two kingdom system because they:", ["Are very large", "Move like animals but are unicellular", "Live on land", "Are fungi"], 1, "They move like animals, but plants and animals are multicellular. So Protista was added."),
  m(28, "Which kingdom was added to the two kingdoms to give the three kingdom system?", ["Monera", "Fungi", "Protista", "Archaea"], 2, "Protista was added for unicellular microscopic organisms."),
  m(29, "Bacteria were placed in a separate kingdom because they:", ["Are multicellular", "Have no true nucleus", "Make seeds", "Are very big"], 1, "Amoeba has a true nucleus but bacteria do not, so bacteria went to Monera."),
  m(30, "The five kingdom classification was proposed by:", ["Aristotle", "Linnaeus", "Robert H. Whittaker", "Carl Woese"], 2, "Whittaker proposed it in 1969."),
  m(31, "Which kingdom was added last to form the five kingdoms?", ["Fungi", "Monera", "Protista", "Plantae"], 0, "Fungi were placed in a separate kingdom last, since they are heterotrophic and absorb food."),
  m(32, "The order of the systems from oldest to newest is:", ["Five kingdom, four kingdom, three kingdom, two kingdom", "Two kingdom, three kingdom, four kingdom, five kingdom", "Three kingdom, two kingdom, five kingdom, four kingdom", "Four kingdom, five kingdom, two kingdom, three kingdom"], 1, "Two kingdom (1758), three (1866), four (1938), five (1969)."),
  m(33, "The Rigveda and the Brihat Samhita classified animals on the basis of:", ["Habitat, behaviour and ecological roles", "DNA", "Microscope findings", "Number of legs only"], 0, "They used habitat (land, water, air), behaviour patterns and ecological roles."),
  m(34, "Classification systems keep changing because:", ["Scientists forget old systems", "New tools and knowledge show new things", "Organisms do not exist", "Names are boring"], 1, "With new tools like microscopes and stains, new organisms and details were found."),

  // ── Five kingdoms, Monera, Protista (35-46) ──
  m(35, "Which feature is NOT used as a basis in the five kingdom classification?", ["Cell type", "Cell wall", "Number of cells", "Colour of the organism"], 3, "The four features are cell type, cell structure (cell wall), level of organisation and mode of nutrition."),
  m(36, "Prokaryotes are placed in:", ["Protista", "Monera", "Fungi", "Plantae"], 1, "Monera includes unicellular prokaryotes such as bacteria."),
  m(37, "Which of these is a unicellular eukaryote?", ["Bacterium", "Amoeba", "Mango tree", "Earthworm"], 1, "Amoeba is a single-celled eukaryote placed in Protista."),
  m(38, "Lactobacillus and Rhizobium are examples of:", ["Useful bacteria", "Harmful viruses", "Fungi", "Protists"], 0, "Both are useful bacteria in Monera."),
  m(39, "Cyanobacteria are:", ["Autotrophic prokaryotes", "Heterotrophic eukaryotes", "Fungi", "Animals"], 0, "Cyanobacteria are prokaryotes that make food by photosynthesis."),
  m(40, "Stromatolites are structures that contain fossils of:", ["Dinosaurs", "Ancient cyanobacteria", "Early humans", "Ferns"], 1, "They give some of the earliest evidence of life and have been found in Rajasthan and Madhya Pradesh."),
  m(41, "The 'Father of Modern Biogas' in India is:", ["Birbal Sahni", "Ram Bux Singh", "Whittaker", "Linnaeus"], 1, "Ram Bux Singh set up India's first scientifically designed biogas plant in 1957."),
  m(42, "Biogas is produced by bacteria living in the gut of ruminants and acting on their:", ["Milk", "Dung", "Bones", "Blood"], 1, "Bacteria in the gut of ruminants help make biogas from dung."),
  m(43, "A hay infusion is used to observe:", ["Fungi only", "Protists", "Bryophytes", "Fossils"], 1, "Pond water with plant matter allows protists to multiply."),
  m(44, "In making a hay infusion, the bottle is kept undisturbed for:", ["One hour", "One day", "One week", "One month"], 2, "It is covered with muslin cloth and kept aside for a week."),
  m(45, "Which of these is NOT a protist?", ["Euglena", "Paramecium", "Chlamydomonas", "Mushroom"], 3, "A mushroom is a fungus."),
  m(46, "Protists are important because they:", ["Are the main source of timber", "Form a link in aquatic food chains and some release oxygen", "Make seeds", "Live only in deserts"], 1, "Some protists release oxygen and others are food for small animals."),

  // ── Fungi (47-54) ──
  m(47, "The cell wall of fungi is made of:", ["Cellulose", "Chitin", "Starch", "Lignin"], 1, "Fungi have a cell wall made of chitin."),
  m(48, "The network of fine threads of a fungus is called:", ["Thallus", "Mycelium", "Rhizoid", "Cone"], 1, "All the threads together form the mycelium."),
  m(49, "Fungi that feed on dead organic matter are called:", ["Parasites", "Saprophytes", "Producers", "Predators"], 1, "Saprophytes feed on dead matter such as fallen leaves and twigs."),
  m(50, "Yeast is placed under fungi because its:", ["Cell wall is made of chitin", "Body is multicellular", "Cell has no nucleus", "Habitat is water"], 0, "Yeast is unicellular, but its chitin cell wall places it in fungi."),
  m(51, "Antibiotics and enzymes are made using fungi like:", ["Spirogyra and Hydra", "Aspergillus and Penicillium", "Marchantia and moss", "Amoeba and Euglena"], 1, "Aspergillus and Penicillium are used for enzymes and antibiotics."),
  m(52, "Fungi reproduce mainly by forming:", ["Seeds", "Spores", "Fruits", "Flowers"], 1, "They reproduce sexually and asexually, often by spores."),
  m(53, "The life cycle of mushrooms in farming is about:", ["30 to 45 days", "One year", "Five years", "One day"], 0, "Mushroom farming has a fast life cycle of 30 to 45 days."),
  m(54, "Lichens are a partnership of:", ["Two fungi", "An alga and a fungus", "A bacterium and a virus", "A moss and a fern"], 1, "In a lichen the alga makes food and the fungus gives protection."),

  // ── Plants (55-70) ──
  m(55, "The cell wall of plants is mainly made of:", ["Chitin", "Cellulose", "Protein", "Fat"], 1, "Plant cells have a rigid cell wall of cellulose."),
  m(56, "The kingdom Plantae is divided into how many classes in this lesson?", ["Three", "Four", "Five", "Eight"], 2, "Thallophyta, Bryophyta, Pteridophyta, Gymnosperm and Angiosperm."),
  m(57, "The body of a thallophyte is called a:", ["Rhizoid", "Thallus", "Cone", "Frond"], 1, "A thallus is a simple body that exchanges gases, water and nutrients directly."),
  m(58, "Spirogyra is an example of:", ["Bryophyta", "Thallophyta", "Pteridophyta", "Gymnosperm"], 1, "Spirogyra is an alga, a thallophyte."),
  m(59, "Lichens are called bioindicators because they:", ["Make food", "Change colour with air pollutants", "Live in water", "Make seeds"], 1, "Their colour shows how much pollutant is in the air."),
  m(60, "Root-like structures of bryophytes are called:", ["True roots", "Rhizoids", "Tendrils", "Spines"], 1, "Bryophytes have rhizoids, not true roots."),
  m(61, "Bryophytes are called the amphibians of the plant kingdom because they:", ["Live in ponds only", "Need water for reproduction", "Have lungs", "Are green"], 1, "Their male reproductive cells must swim to reach the female cells."),
  m(62, "Marchantia and moss belong to:", ["Pteridophyta", "Bryophyta", "Thallophyta", "Angiosperm"], 1, "They are members of the class Bryophyta."),
  m(63, "Which plant group has true roots, stems and leaves and vascular tissue but no seeds?", ["Bryophyta", "Pteridophyta", "Gymnosperm", "Angiosperm"], 1, "Ferns (Pteridophyta) have xylem and phloem but reproduce by spores."),
  m(64, "Xylem and phloem carry, respectively:", ["Food and water", "Water and food", "Air and water", "Food and air"], 1, "Xylem carries water and phloem carries food."),
  m(65, "Gymnosperm means:", ["Hidden seed", "Naked seed", "Many seeds", "No seed"], 1, "Gymnos means naked and spermos means seed."),
  m(66, "Pine and cycad are examples of:", ["Angiosperms", "Gymnosperms", "Bryophytes", "Thallophytes"], 1, "They have naked seeds, often on cones."),
  m(67, "The needle-like leaves of gymnosperms help to:", ["Catch more sunlight", "Reduce loss of water", "Attract insects", "Make fruits"], 1, "Needle-like or scale-like leaves reduce water loss in cold and dry regions."),
  m(68, "Which plant group has flowers and seeds enclosed in fruits?", ["Gymnosperm", "Pteridophyta", "Angiosperm", "Bryophyta"], 2, "Angiosperms are the flowering plants."),
  m(69, "Which of these is the most diverse plant group on the Earth?", ["Angiosperms", "Ferns", "Mosses", "Algae"], 0, "Flowers and fruits let angiosperms live in a very wide range of environments."),
  m(70, "Hortus Malabaricus is an early scientific work on:", ["Indian animals", "Indian plants and their medicinal uses", "Fossils", "Bacteria"], 1, "It was compiled in the 17th century by Hendrik van Rheede with Itty Achudan and local experts."),

  // ── Animals (71-88) ──
  m(71, "The notochord is a:", ["Hard shell", "Flexible rod-shaped structure", "Type of fruit", "Nerve"], 1, "It is a flexible rod-shaped support found in chordates."),
  m(72, "Animals without a notochord are called:", ["Chordata", "Non-chordata", "Vertebrata", "Protochordata"], 1, "Non-chordata are also called invertebrata."),
  m(73, "Sponges belong to the phylum:", ["Cnidaria", "Porifera", "Annelida", "Mollusca"], 1, "Porifera means pore-bearers."),
  m(74, "The level of organisation of sponges is:", ["Cellular", "Tissue", "Organ", "Organ system"], 0, "Sponges are multicellular but have no tissues or organs."),
  m(75, "Which phylum shows tissue-level organisation and has tentacles?", ["Porifera", "Cnidaria", "Nematoda", "Echinodermata"], 1, "Hydra, jellyfish and corals are cnidarians."),
  m(76, "Bilateral symmetry first appears in:", ["Porifera", "Cnidaria", "Platyhelminthes", "None of these"], 2, "Flatworms have a head-tail and front-back body."),
  m(77, "Hooks and suckers are found in:", ["Free-living sponges", "Parasitic flatworms", "Starfish", "Snails"], 1, "They help parasitic flatworms attach firmly to the host."),
  m(78, "Which group has two openings in the body, a mouth and an anus?", ["Cnidaria", "Platyhelminthes", "Nematoda", "Porifera"], 2, "Roundworms have a mouth and an anus."),
  m(79, "An earthworm belongs to:", ["Nematoda", "Annelida", "Arthropoda", "Mollusca"], 1, "Earthworms are segmented worms (annelids)."),
  m(80, "Arthropoda means:", ["Pore-bearers", "Jointed appendages", "Spiny skin", "Soft body"], 1, "Arthro means limbs and poda means appendages."),
  m(81, "A hard external covering of the body is called:", ["Endoskeleton", "Exoskeleton", "Notochord", "Backbone"], 1, "Arthropods have a hard exoskeleton."),
  m(82, "Snails, squids and octopuses belong to:", ["Mollusca", "Echinodermata", "Annelida", "Nematoda"], 0, "They are soft-bodied animals with a head, muscular foot and a hump."),
  m(83, "The hard internal skeleton of echinoderms is made of:", ["Chitin", "Calcium carbonate", "Cellulose", "Keratin"], 1, "Starfish and sea urchins have an endoskeleton of calcium carbonate."),
  m(84, "Echinoderm means:", ["Soft body", "Spiny skin", "Jointed limb", "Naked seed"], 1, "Echinos means spiny and derma means skin."),
  m(85, "Amphioxus is a:", ["Vertebrate", "Protochordate", "Mollusc", "Fungus"], 1, "It has a notochord at least once in life but no backbone."),
  m(86, "Which of these is NOT one of the five vertebrate groups?", ["Fish", "Reptiles", "Echinoderms", "Birds"], 2, "The five groups are fish, amphibians, reptiles, birds and mammals."),
  m(87, "Feathers and hollow bones make which behaviour possible in birds?", ["Swimming", "Flight", "Burrowing", "Hibernation"], 1, "These adaptations support flight."),
  m(88, "Which feature is shown only by mammals among the following?", ["Mammary glands", "Feathers", "Gills", "Scales"], 0, "Mammary glands feed the young with milk and improve their survival."),

  // ── Hierarchy, naming, three domains (89-96) ──
  m(89, "The correct order of the levels of classification from broad to specific is:", ["Kingdom, Class, Phylum, Order, Genus, Family, Species", "Kingdom, Phylum, Class, Order, Family, Genus, Species", "Species, Genus, Family, Order, Class, Phylum, Kingdom", "Phylum, Kingdom, Class, Order, Family, Genus, Species"], 1, "The hierarchy is Kingdom, Phylum, Class, Order, Family, Genus, Species."),
  m(90, "The tiger belongs to the family:", ["Canidae", "Felidae", "Fabaceae", "Bovidae"], 1, "Tiger: Animalia, Chordata, Mammalia, Carnivora, Felidae, Panthera, P. tigris."),
  m(91, "The scientific name of the pea plant is:", ["Pisum sativum", "pisum Sativum", "Mangifera indica", "Panthera tigris"], 0, "Genus Pisum begins with a capital letter, species sativum is in small letters."),
  m(92, "The binomial system of naming was introduced by:", ["Aristotle", "Carolus Linnaeus", "Whittaker", "Charles Darwin"], 1, "Linnaeus introduced it in the 18th century."),
  m(93, "In Panthera tigris, the word tigris is the name of the:", ["Genus", "Species", "Family", "Order"], 1, "The first word is the genus and the second word is the species."),
  m(94, "A handwritten scientific name should be:", ["Written in capitals", "Underlined", "Written in red", "Written in brackets"], 1, "It is underlined when handwritten and in italics when printed."),
  m(95, "The tiger and the lion are placed in the same:", ["Species", "Genus", "Family only", "Kingdom only"], 1, "Both are in the genus Panthera, the roaring cats."),
  m(96, "The three domain system, proposed by Carl Woese in 1977, includes:", ["Monera, Protista, Fungi", "Bacteria, Archaea and Eukarya", "Plants, animals, fungi", "Land, water, air"], 1, "It was proposed on the basis of genetic (DNA) studies."),

  // ── Fossils and threats (97-100) ──
  m(97, "Fossils are:", ["Fresh remains of plants", "Preserved remains of plants and animals in rocks, sand or mud", "Only dinosaur bones", "Seeds of ancient plants"], 1, "They are natural records that show how life changed over millions of years."),
  m(98, "Birbal Sahni is remembered for his study of:", ["Fossil plants", "Bacteria", "Birds", "Fungi"], 0, "He founded the Birbal Sahni Institute of Palaeosciences in Lucknow."),
  m(99, "The Purple Frog (Nasikabatrachus sahyadrensis) was named after the:", ["Nilgiri Hills", "Sahyadri Hills", "Aravalli Hills", "Himalayas"], 1, "Its species name sahyadrensis comes from the Sahyadri Hills of the Western Ghats."),
  m(100, "Phumdis, the floating grasslands of Manipur, are home to the endangered:", ["Sangai deer", "Nilgiri tahr", "Lion-tailed macaque", "Purple frog"], 0, "The Sangai, or dancing deer, is endemic to Manipur."),
];

// Spread the correct answers evenly over A, B, C and D (deterministic, so every student sees the same order).
export const DIVERSITY9_MCQS: QuizQuestion[] = RAW_MCQS.map((q, i) => {
  const target = (i * 3 + 2) % 4;
  const opts = q.options.slice();
  [opts[q.correctAnswer], opts[target]] = [opts[target], opts[q.correctAnswer]];
  return { ...q, options: opts, correctAnswer: target };
});
