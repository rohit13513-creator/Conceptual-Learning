// Class 9 CBSE Biology -- Chapter: The Cell (structure, organelles, transport)
import type {
  QuizQuestion,
  NCERTSolvedQuestion,
  ShortQuestion,
  LongQuestion,
  CompetencyQuestion,
} from "../types-custom";

// ── SOLVED TEXTBOOK-STYLE QUESTIONS ──
export const BIOLOGY9_NCERT_SOLVED: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Q1",
    question: "Why is the cell called the structural and functional unit of life?",
    given: { "Concept": "Cell theory and cell as the basic biological unit" },
    formulaUsed: "Cell Theory: all living organisms are composed of cells, and the cell is the basic unit of structure and function in every living thing.",
    derivationSteps: [
      "Every living organism, whether unicellular (like Amoeba) or multicellular (like humans), is made up of one or more cells.",
      "Structurally, cells are the smallest units that show the organisation of membranes, cytoplasm, and genetic material found in living matter.",
      "Functionally, every basic life process -- respiration, nutrition, excretion, growth, and reproduction -- occurs inside cells or is carried out by them.",
      "Since no smaller unit than a cell can independently carry out all these life processes, the cell is both the structural and functional unit of life."
    ],
    finalAnswer: "The cell is the smallest unit that is structurally organised like a living thing and can independently carry out every basic function of life, which is why it is called the structural and functional unit of life.",
    conceptualTip: "Remember: 'structural' = builds the body; 'functional' = carries out life processes. A cell does both."
  },
  {
    id: 2,
    questionNumber: "Q2",
    question: "How do substances like carbon dioxide and water move in and out of a cell? Discuss.",
    given: { "Concept": "Diffusion and osmosis across the plasma membrane" },
    formulaUsed: "Diffusion: net movement of a substance from a region of higher concentration to lower concentration; Osmosis: diffusion of water across a selectively permeable membrane.",
    derivationSteps: [
      "Gases such as CO2 and O2 move by simple diffusion -- they move down their concentration gradient without using any energy.",
      "For example, CO2 built up inside a cell due to respiration diffuses out into the surrounding blood or air where its concentration is lower.",
      "Water moves in and out of cells by osmosis, a special case of diffusion where only the water molecules cross the selectively permeable plasma membrane, moving from a region of higher water concentration (dilute solution) to lower water concentration (concentrated solution).",
      "Both processes happen passively, driven only by the concentration gradient, and stop once equilibrium is reached."
    ],
    finalAnswer: "Gases move in and out of the cell by diffusion along their concentration gradient, while water moves in and out by osmosis through the selectively permeable plasma membrane.",
    conceptualTip: "Diffusion applies to any substance (gases, solutes); osmosis is diffusion specifically of water across a membrane."
  },
  {
    id: 3,
    questionNumber: "Q3",
    question: "Why is diffusion insufficient to meet the oxygen requirements of multicellular organisms like humans?",
    given: { "Concept": "Limitations of diffusion over distance and surface area" },
    formulaUsed: "Rate of diffusion is inversely related to the distance a substance must travel and depends on available surface area.",
    derivationSteps: [
      "Diffusion is efficient only over very short distances, such as across a single cell membrane.",
      "In large multicellular organisms, most cells are far from the body surface and cannot exchange gases directly with the environment.",
      "The surface-area-to-volume ratio of a large body is too small for diffusion alone to supply oxygen fast enough to every internal cell.",
      "Therefore, specialised respiratory and circulatory systems (lungs, blood, heart) evolved to actively transport oxygen quickly to every cell."
    ],
    finalAnswer: "Because diffusion is only efficient over very short distances, large multicellular organisms need specialised organ systems (like the respiratory and circulatory systems) to deliver oxygen to cells that are far from the body surface.",
    conceptualTip: "Surface-area-to-volume ratio is the key idea: small/simple organisms rely on diffusion; large/complex ones need transport systems."
  },
  {
    id: 4,
    questionNumber: "Q4",
    question: "What criteria would you use to decide whether a given cell is prokaryotic or eukaryotic?",
    given: { "Criterion 1": "Presence or absence of a nuclear membrane", "Criterion 2": "Presence or absence of membrane-bound organelles" },
    formulaUsed: "Prokaryotic cells lack a true, membrane-bound nucleus and membrane-bound organelles; eukaryotic cells possess both.",
    derivationSteps: [
      "Check whether the genetic material is enclosed by a nuclear membrane -- if not, the region is called a nucleoid and the cell is prokaryotic.",
      "Check for membrane-bound organelles such as mitochondria, endoplasmic reticulum, or Golgi apparatus -- their absence indicates a prokaryotic cell.",
      "Prokaryotic cells are also generally smaller and structurally simpler (e.g. bacteria, blue-green algae).",
      "If a true nucleus and membrane-bound organelles are present, the cell is eukaryotic (e.g. cells of plants, animals, fungi, protists)."
    ],
    finalAnswer: "A cell is judged prokaryotic if it lacks a membrane-bound nucleus and membrane-bound organelles (genetic material lies in a nucleoid); it is eukaryotic if it has a well-defined nuclear membrane and membrane-bound organelles.",
    conceptualTip: "'Pro-karyon' = before a nucleus; 'Eu-karyon' = true nucleus -- the Greek roots directly tell you the defining difference."
  },
  {
    id: 5,
    questionNumber: "Q5",
    question: "What would happen if the plasma membrane ruptures or breaks down?",
    given: { "Concept": "Role of plasma membrane as a selective barrier" },
    formulaUsed: "The plasma membrane is a selectively permeable barrier that regulates the entry and exit of substances and maintains the cell's internal environment.",
    derivationSteps: [
      "The plasma membrane controls what substances enter or leave the cell, maintaining a stable internal composition.",
      "If it ruptures, this selective control is lost, and cell contents (cytoplasm, organelles, ions) would leak out uncontrollably.",
      "At the same time, uncontrolled substances from outside would rush into the cell, disturbing its internal chemical balance.",
      "Without an intact membrane, the cell cannot maintain homeostasis and would eventually disintegrate and die."
    ],
    finalAnswer: "If the plasma membrane ruptures, the cell loses its ability to control what enters or leaves it, its contents leak out, its internal balance is destroyed, and the cell dies.",
    conceptualTip: "The plasma membrane is often compared to a security gate -- remove the gate and the building (cell) can no longer control who comes in or out."
  },
  {
    id: 6,
    questionNumber: "Q6",
    question: "What would happen to the life of a cell if there was no Golgi apparatus?",
    given: { "Concept": "Role of Golgi apparatus in packaging and secretion" },
    formulaUsed: "The Golgi apparatus modifies, packages, and dispatches materials (especially proteins made by the ER) to their correct destinations inside or outside the cell.",
    derivationSteps: [
      "Proteins synthesised on the rough endoplasmic reticulum are normally transported to the Golgi apparatus for further processing.",
      "The Golgi apparatus modifies these proteins, packages them into vesicles, and directs them to the plasma membrane, lysosomes, or outside the cell.",
      "Without a Golgi apparatus, proteins and lipids could not be properly modified, sorted, or packaged for transport.",
      "This would disrupt secretion of enzymes/hormones and formation of lysosomes, severely affecting the cell's ability to function and communicate."
    ],
    finalAnswer: "Without a Golgi apparatus, the cell would be unable to properly modify, package, and transport proteins and lipids to their correct destinations, disrupting secretion and the formation of structures like lysosomes.",
    conceptualTip: "Think of the Golgi apparatus as the cell's packaging and dispatch department -- no dispatch department means nothing leaves the factory properly labelled."
  },
  {
    id: 7,
    questionNumber: "Q7",
    question: "Which organelle is known as the powerhouse of the cell? Why?",
    given: { "Concept": "Energy production via cellular respiration" },
    formulaUsed: "Mitochondria carry out aerobic cellular respiration, breaking down food to release energy stored as ATP.",
    derivationSteps: [
      "Mitochondria contain enzymes required for the oxidative breakdown of food molecules (like glucose) in the presence of oxygen.",
      "This process, cellular respiration, releases energy that is captured and stored in the form of ATP (adenosine triphosphate) molecules.",
      "ATP is the immediate usable energy currency for almost all of the cell's activities.",
      "Because mitochondria are the primary site of ATP generation, they are called the powerhouse of the cell."
    ],
    finalAnswer: "Mitochondria are called the powerhouse of the cell because they carry out cellular respiration and produce ATP, the energy currency that powers nearly all cellular activities.",
    conceptualTip: "Mitochondria have their own DNA and can even divide independently of the cell -- evidence for the theory that they originated from ancient free-living bacteria."
  },
  {
    id: 8,
    questionNumber: "Q8",
    question: "Where do the lipids and proteins that make up the cell membrane get synthesised?",
    given: { "Concept": "Roles of smooth ER (lipids) and rough ER (proteins)" },
    formulaUsed: "Smooth endoplasmic reticulum synthesises lipids; rough endoplasmic reticulum (studded with ribosomes) synthesises proteins.",
    derivationSteps: [
      "The smooth endoplasmic reticulum (SER) lacks ribosomes on its surface and is the primary site for lipid (fat) synthesis in the cell.",
      "The rough endoplasmic reticulum (RER) has ribosomes attached to its surface, and these ribosomes synthesise proteins.",
      "The lipids and proteins made by the ER are used to build and continually renew the cell membrane and membranes of other organelles.",
      "Some of these membrane components are further processed by the Golgi apparatus before being incorporated into the membrane."
    ],
    finalAnswer: "Lipids for the cell membrane are synthesised in the smooth endoplasmic reticulum, and proteins are synthesised by the ribosomes attached to the rough endoplasmic reticulum.",
    conceptualTip: "SER = Smooth = no ribosomes = fat/lipid factory; RER = Rough = has ribosomes = protein factory."
  },
  {
    id: 9,
    questionNumber: "Q9",
    question: "How does an amoeba obtain its food?",
    given: { "Organism": "Amoeba, a unicellular organism" },
    formulaUsed: "Endocytosis (phagocytosis): the cell membrane engulfs external material by forming temporary finger-like extensions.",
    derivationSteps: [
      "When an amoeba encounters a food particle, its cell membrane pushes out temporary finger-like projections called pseudopodia around the food.",
      "These pseudopodia surround and fold over the food particle, ultimately enclosing it inside a food vacuole formed within the cell.",
      "Digestive enzymes are released into this food vacuole to break down the food particle.",
      "This process, where the plasma membrane engulfs material from outside the cell, is called endocytosis (specifically phagocytosis)."
    ],
    finalAnswer: "An amoeba obtains its food by endocytosis -- it forms pseudopodia that engulf a food particle into a food vacuole, where the food is then digested.",
    conceptualTip: "Endocytosis is only possible because the plasma membrane is flexible, not rigid -- this is one reason plant cells (with a rigid cell wall) cannot feed this way."
  },
  {
    id: 10,
    questionNumber: "Q10",
    question: "What is osmosis?",
    given: { "Concept": "Special case of diffusion involving only water" },
    formulaUsed: "Osmosis: net movement of water molecules from a region of higher water concentration (dilute solution) to lower water concentration (concentrated solution) through a selectively permeable membrane.",
    derivationSteps: [
      "A selectively permeable membrane allows water molecules to pass through but restricts the passage of many dissolved solute particles.",
      "When such a membrane separates a dilute solution (more water) from a concentrated solution (less water), water moves toward the side with less water to balance the concentration.",
      "This net movement of water across the membrane, without net movement of the solute, is called osmosis.",
      "Osmosis continues until the water concentration becomes equal on both sides, or is opposed by pressure."
    ],
    finalAnswer: "Osmosis is the net movement of water molecules from a region of higher water concentration to a region of lower water concentration through a selectively permeable membrane.",
    conceptualTip: "Osmosis is just 'diffusion of water' -- if you understand diffusion, replace 'substance' with 'water' and add 'through a selectively permeable membrane'."
  },
  {
    id: 11,
    questionNumber: "Q11",
    question: "Compare the functions of a plant cell wall with an animal cell's plasma membrane in terms of protection and shape.",
    given: { "Structure A": "Cell wall (plants)", "Structure B": "Plasma membrane (animals, and also plants)" },
    formulaUsed: "Cell wall = rigid, non-living, made of cellulose; Plasma membrane = flexible, living, made of lipids and proteins.",
    derivationSteps: [
      "The cell wall is a thick, rigid, non-living structure made mainly of cellulose that lies outside the plasma membrane in plant cells.",
      "It gives the plant cell a fixed, definite shape and protects it against mechanical injury and infection, while also preventing the cell from bursting when it absorbs excess water.",
      "The plasma membrane, present in both plant and animal cells, is thin, flexible, and living, made of lipids and proteins.",
      "In animal cells (which lack a cell wall), the plasma membrane alone determines the flexible shape and controls what enters/exits the cell; it cannot provide the same rigid mechanical protection a cell wall gives."
    ],
    finalAnswer: "The cell wall gives plant cells a fixed shape and strong mechanical protection using rigid cellulose, while the plasma membrane (the only boundary in animal cells) gives a flexible shape and regulates transport but offers comparatively less mechanical strength.",
    conceptualTip: "Only plant cells (and fungi/bacteria) have a cell wall; every cell, plant or animal, has a plasma membrane."
  },
  {
    id: 12,
    questionNumber: "Q12",
    question: "Name two cell organelles that contain their own genetic material (DNA).",
    given: { "Concept": "Semi-autonomous organelles" },
    formulaUsed: "Endosymbiotic theory: mitochondria and chloroplasts are believed to have originated from free-living bacteria engulfed by ancestral eukaryotic cells.",
    derivationSteps: [
      "Most cell organelles depend entirely on the nucleus for genetic information.",
      "However, mitochondria and plastids (specifically chloroplasts) are exceptions -- both contain their own small circular DNA and ribosomes.",
      "This allows them to synthesise some of their own proteins and to divide independently of the cell's normal division cycle.",
      "This unique feature supports the theory that they were once independent, free-living bacteria that entered into a permanent symbiotic relationship with early eukaryotic cells."
    ],
    finalAnswer: "Mitochondria and plastids (chloroplasts) are the two organelles that contain their own genetic material.",
    conceptualTip: "This is called the Endosymbiotic Theory -- a favourite exam one-liner: 'organelles with their own DNA = mitochondria and plastids'."
  },
  {
    id: 13,
    questionNumber: "Q13",
    question: "What would happen to a cell if its internal organisation was destroyed by some physical or chemical influence?",
    given: { "Concept": "Cell as an organised, self-sustaining unit" },
    formulaUsed: "Cellular organisation (membrane boundaries, organelle compartments, genetic control) is necessary for the coordinated life processes of a cell.",
    derivationSteps: [
      "A cell functions correctly only because its organelles work in a coordinated, organised manner within defined membrane boundaries.",
      "If this organisation is destroyed -- for example, by intense heat, strong chemicals, or radiation -- the internal compartments and their functions break down.",
      "Enzymes and metabolic pathways can no longer work in a controlled way, and essential processes like respiration, protein synthesis, and transport stop.",
      "As a result, the cell loses the ability to sustain itself and dies."
    ],
    finalAnswer: "If a cell's internal organisation is destroyed, its coordinated life processes break down and the cell dies, since organised structure is essential for a cell to function.",
    conceptualTip: "This links back to the very first idea of the chapter: the cell is a structural unit -- destroy the structure, and the function (life) is lost too."
  },
  {
    id: 14,
    questionNumber: "Q14",
    question: "Why are lysosomes referred to as the 'suicide bags' of a cell?",
    given: { "Concept": "Autolysis: self-digestion of a damaged or dying cell" },
    formulaUsed: "Lysosomes contain powerful digestive enzymes capable of breaking down cellular material.",
    derivationSteps: [
      "Lysosomes are membrane-bound sacs filled with strong digestive enzymes capable of breaking down proteins, lipids, carbohydrates, and nucleic acids.",
      "Under normal conditions, these enzymes are safely contained within the lysosomal membrane and are used to digest foreign material or worn-out cell parts.",
      "However, if the cell becomes damaged or disorganised, the lysosomal membrane can rupture, releasing these enzymes into the cytoplasm.",
      "The released enzymes then digest the cell's own contents, causing the cell to self-destruct -- hence the nickname 'suicide bags'."
    ],
    finalAnswer: "Lysosomes are called suicide bags because, if the cell is damaged, their digestive enzymes are released into the cytoplasm and digest the cell's own components, killing the cell.",
    conceptualTip: "Lysosomes are made by the Golgi apparatus, which packages digestive enzymes produced by the rough ER."
  },
  {
    id: 15,
    questionNumber: "Q15",
    question: "How do white blood cells (leucocytes) destroy foreign organisms that enter the body?",
    given: { "Process": "Phagocytosis followed by lysosomal digestion" },
    formulaUsed: "Endocytosis (engulfment) followed by fusion with lysosomes, whose enzymes digest the engulfed material.",
    derivationSteps: [
      "A white blood cell's flexible plasma membrane engulfs a bacterium or foreign particle through endocytosis, enclosing it in a vacuole.",
      "This vacuole then fuses with a lysosome present in the cell.",
      "The powerful digestive enzymes inside the lysosome break down and destroy the engulfed foreign organism.",
      "The digested remains may then be absorbed by the cell or expelled, protecting the body from infection."
    ],
    finalAnswer: "White blood cells engulf foreign organisms by endocytosis, and the resulting vacuole fuses with a lysosome whose enzymes digest and destroy the invader.",
    conceptualTip: "This is the same basic engulfing mechanism (phagocytosis) an amoeba uses to eat -- your immune cells essentially 'eat' bacteria the same way an amoeba eats food."
  },
  {
    id: 16,
    questionNumber: "Q16",
    question: "Why are vacuoles in mature plant cells much larger than in most animal cells?",
    given: { "Concept": "Central vacuole and turgor pressure" },
    formulaUsed: "Turgor pressure: internal pressure exerted on the cell wall by a swollen vacuole full of cell sap, which keeps the plant cell firm.",
    derivationSteps: [
      "Mature plant cells usually have a single, large central vacuole that can occupy up to 90% of the cell's volume.",
      "This vacuole is filled with cell sap (a solution of salts, sugars, and other substances) and helps store nutrients and waste products.",
      "By osmosis, water enters this vacuole, causing it to swell and press outward on the rigid cell wall, creating turgor pressure that keeps the plant firm and upright.",
      "Animal cells lack a rigid cell wall to press against, so they only have small, temporary vacuoles and would burst rather than benefit from a large permanent one."
    ],
    finalAnswer: "Plant cells have large central vacuoles because they store cell sap and generate turgor pressure against the rigid cell wall, keeping the plant firm; animal cells lack a cell wall to support this and so only have small, temporary vacuoles.",
    conceptualTip: "When a plant is not watered, its cells lose turgor pressure (vacuoles shrink) and the plant wilts -- a direct visible effect of vacuole function."
  },
  {
    id: 17,
    questionNumber: "Q17",
    question: "Describe the structure and importance of the nucleus in a cell.",
    given: { "Concept": "The control centre of the eukaryotic cell" },
    formulaUsed: "The nucleus is bound by a double-layered nuclear membrane with pores, and contains chromatin (DNA + protein) and a nucleolus.",
    derivationSteps: [
      "The nucleus is enclosed by a double-layered nuclear membrane which has tiny pores that allow the transfer of material between the nucleus and cytoplasm.",
      "Inside, it contains chromatin material -- a network of thread-like DNA and protein -- which condenses into visible chromosomes just before cell division.",
      "Chromosomes carry genes, the units of inheritance, which control the synthesis of proteins and thereby regulate all of the cell's activities.",
      "A dense region called the nucleolus is also present, involved in ribosome production. In cells lacking a defined nucleus (prokaryotes), this genetic material lies in a region called the nucleoid."
    ],
    finalAnswer: "The nucleus, enclosed by a pore-studded double membrane, houses the cell's genetic material (as chromatin/chromosomes carrying genes) and a nucleolus, and it directs and controls all cellular activities -- earning it the name 'control centre' of the cell.",
    conceptualTip: "Nucleus : cell :: brain : body -- both act as the coordinating control centre."
  },
  {
    id: 18,
    questionNumber: "Q18",
    question: "Draw the process of osmosis using three beakers containing (a) a plant cell in pure water, (b) the same cell in a concentrated salt solution, and (c) the same cell in a solution of equal concentration to the cell sap. Explain what happens in each case.",
    given: { "Case a": "Hypotonic solution (pure water)", "Case b": "Hypertonic solution (concentrated salt solution)", "Case c": "Isotonic solution" },
    formulaUsed: "Endosmosis occurs when the external medium is hypotonic; exosmosis occurs when the external medium is hypertonic; no net movement occurs when the solution is isotonic.",
    derivationSteps: [
      "In pure water (a hypotonic solution), water concentration outside is higher than inside the cell, so water moves into the cell by endosmosis -- the cell swells and becomes turgid (in an animal cell it could even burst).",
      "In a concentrated salt solution (a hypertonic solution), water concentration outside is lower than inside the cell, so water moves out of the cell by exosmosis -- the cell shrinks and the cell membrane pulls away from the cell wall (plasmolysis) in plant cells.",
      "In a solution of equal concentration to the cell sap (an isotonic solution), the rate of water movement into and out of the cell is equal, so there is no net change in cell size.",
      "These three outcomes together demonstrate that the direction of osmosis always depends on the relative water concentration on either side of the selectively permeable membrane."
    ],
    finalAnswer: "The cell swells in a hypotonic (pure water) solution due to endosmosis, shrinks/plasmolyses in a hypertonic (concentrated salt) solution due to exosmosis, and shows no net change in an isotonic solution.",
    conceptualTip: "Remember the direction rule: water always moves toward the solution with LESS water (i.e., MORE dissolved solute)."
  },
];

// ── QUESTION BANK: MULTIPLE CHOICE QUESTIONS (100) ──
export const BIOLOGY9_MCQS: QuizQuestion[] = [
  { id: 1, question: "Who discovered the cell for the first time and gave it its name?", options: ["Anton van Leeuwenhoek", "Robert Hooke", "Robert Brown", "Rudolf Virchow"], correctAnswer: 1, explanation: "Robert Hooke, in 1665, observed thin slices of cork under a self-built microscope and named the box-like structures he saw 'cells' after the Latin word for small rooms." },
  { id: 2, question: "Who first observed and described a living cell?", options: ["Robert Hooke", "Anton van Leeuwenhoek", "Matthias Schleiden", "Theodor Schwann"], correctAnswer: 1, explanation: "Anton van Leeuwenhoek, using a self-designed microscope, was the first to observe and describe a live cell in 1674." },
  { id: 3, question: "Who discovered the nucleus and gave it its name?", options: ["Robert Brown", "Robert Hooke", "Rudolf Virchow", "Purkinje"], correctAnswer: 0, explanation: "Robert Brown discovered the nucleus in 1831 while examining orchid cells." },
  { id: 4, question: "Which scientist first used the word 'protoplasm' for the fluid substance of the cell?", options: ["Robert Hooke", "Purkinje", "Robert Brown", "Rudolf Virchow"], correctAnswer: 1, explanation: "Purkinje coined the term 'protoplasm' for the fluid substance found within the cell." },
  { id: 5, question: "Who proposed that all plants are composed of cells?", options: ["Theodor Schwann", "Matthias Schleiden", "Rudolf Virchow", "Robert Hooke"], correctAnswer: 1, explanation: "In 1838, Matthias Schleiden, a botanist, concluded that all plants are made up of cells." },
  { id: 6, question: "Who proposed that all animals are composed of cells?", options: ["Theodor Schwann", "Matthias Schleiden", "Robert Brown", "Robert Hooke"], correctAnswer: 0, explanation: "In 1839, Theodor Schwann, a zoologist, described that animal cells also have an outer membrane and, along with Schleiden's work, proposed the cell theory." },
  { id: 7, question: "Who expanded the cell theory by stating that all cells arise from pre-existing cells?", options: ["Rudolf Virchow", "Robert Brown", "Robert Hooke", "Purkinje"], correctAnswer: 0, explanation: "Rudolf Virchow, in 1855, explained that new cells are formed only by the division of pre-existing cells, completing the modern cell theory." },
  { id: 8, question: "Which of the following is NOT a postulate of the cell theory?", options: ["All living organisms are composed of cells", "The cell is the basic unit of structure and function", "New cells arise from pre-existing cells", "All cells contain chlorophyll"], correctAnswer: 3, explanation: "Chlorophyll is present only in plant cells (in chloroplasts) and some protists, not in all cells, so it is not part of the cell theory." },
  { id: 9, question: "Which organism is an example of a unicellular organism?", options: ["Amoeba", "Human", "Frog", "Hibiscus plant"], correctAnswer: 0, explanation: "Amoeba is a unicellular organism -- its entire body is made of just a single cell that carries out all life processes." },
  { id: 10, question: "Which of these is NOT a unicellular organism?", options: ["Paramecium", "Chlamydomonas", "Bacterium", "Earthworm"], correctAnswer: 3, explanation: "An earthworm is a multicellular organism made up of trillions of cells; Paramecium, Chlamydomonas, and bacteria are all unicellular." },
  { id: 11, question: "Which of the following statements about cell shape and size is correct?", options: ["All cells are the same shape and size", "Cell shape and size are related to the specific function of the cell", "Only animal cells vary in shape", "Cell size always corresponds to the size of the organism"], correctAnswer: 1, explanation: "Cells vary enormously in shape and size depending on their specific function -- for example, nerve cells are long to transmit signals, while red blood cells are small and disc-shaped." },
  { id: 12, question: "Which is generally considered the longest cell in the human body?", options: ["Red blood cell", "Nerve cell", "White blood cell", "Muscle cell"], correctAnswer: 1, explanation: "Nerve cells (neurons) can be extremely long, with some extending over a metre, allowing them to transmit signals across long distances in the body." },
  { id: 13, question: "Which is often cited as one of the largest single cells?", options: ["An ostrich egg cell", "A human red blood cell", "A skin cell", "A bacterial cell"], correctAnswer: 0, explanation: "The egg cell of an ostrich is among the largest known single cells, visible to the naked eye." },
  { id: 14, question: "The outermost boundary of an animal cell is the:", options: ["Cell wall", "Plasma membrane", "Nuclear membrane", "Golgi apparatus"], correctAnswer: 1, explanation: "Animal cells lack a cell wall; their outermost boundary is the plasma membrane." },
  { id: 15, question: "The plasma membrane is composed mainly of:", options: ["Cellulose and lignin", "Lipids and proteins", "Chitin and keratin", "DNA and RNA"], correctAnswer: 1, explanation: "The plasma membrane is a flexible boundary made up of organic molecules, primarily lipids and proteins." },
  { id: 16, question: "What property allows the plasma membrane to control the movement of substances into and out of the cell?", options: ["Rigidity", "Selective permeability", "Impermeability", "Opacity"], correctAnswer: 1, explanation: "The plasma membrane is selectively permeable, meaning it allows only certain substances to pass through while restricting others." },
  { id: 17, question: "Which process allows a cell to take in large solid particles by engulfing them with the plasma membrane?", options: ["Osmosis", "Diffusion", "Endocytosis", "Exosmosis"], correctAnswer: 2, explanation: "Endocytosis is the process by which large particles are engulfed by the plasma membrane and taken into the cell, as seen in Amoeba." },
  { id: 18, question: "The engulfing of food by Amoeba using temporary finger-like extensions is called:", options: ["Osmosis", "Phagocytosis (a form of endocytosis)", "Exosmosis", "Plasmolysis"], correctAnswer: 1, explanation: "Amoeba forms pseudopodia (temporary finger-like extensions of the cell membrane) to engulf food particles, a process called phagocytosis." },
  { id: 19, question: "The net movement of particles of a substance from a region of higher concentration to a region of lower concentration is called:", options: ["Osmosis", "Diffusion", "Plasmolysis", "Turgidity"], correctAnswer: 1, explanation: "This is the definition of diffusion -- movement occurs down the concentration gradient, without the need for a membrane." },
  { id: 20, question: "Osmosis is best described as:", options: ["Diffusion of any solute across a membrane", "Diffusion of water across a selectively permeable membrane", "Movement of ions using energy", "Engulfing of solid particles by a cell"], correctAnswer: 1, explanation: "Osmosis is a special case of diffusion where only water molecules move across a selectively permeable membrane." },
  { id: 21, question: "When a plant cell is placed in a hypotonic solution, water moves:", options: ["Out of the cell, causing plasmolysis", "Into the cell, causing it to become turgid", "Neither in nor out", "Both in and out equally"], correctAnswer: 1, explanation: "In a hypotonic solution (more water outside), water enters the cell by endosmosis, making the cell swell and become turgid." },
  { id: 22, question: "When a plant cell is placed in a hypertonic solution, it undergoes:", options: ["Turgidity", "Plasmolysis", "Osmoregulation", "Phagocytosis"], correctAnswer: 1, explanation: "In a hypertonic solution (less water outside than inside the cell), water leaves the cell by exosmosis, causing the cell membrane to shrink away from the cell wall -- a process called plasmolysis." },
  { id: 23, question: "A solution having the same water concentration as the cell's cytoplasm is called:", options: ["Hypotonic", "Hypertonic", "Isotonic", "Saturated"], correctAnswer: 2, explanation: "An isotonic solution has equal water/solute concentration to the cell, so there is no net movement of water into or out of the cell." },
  { id: 24, question: "Why do raisins swell up when soaked in plain water?", options: ["Exosmosis", "Endosmosis", "Diffusion of sugar out of the raisin", "Plasmolysis"], correctAnswer: 1, explanation: "Water enters the raisin's cells by endosmosis because the water outside is at a higher concentration than inside the dried, sugar-rich raisin." },
  { id: 25, question: "Why does a wilted plant become firm again after watering?", options: ["Its cells undergo plasmolysis", "Water enters the vacuoles by endosmosis, restoring turgor pressure", "Water leaves the cells by exosmosis", "The cell wall dissolves"], correctAnswer: 1, explanation: "Watering the soil raises water availability; water enters the root cells and vacuoles by endosmosis, restoring turgor pressure and making the plant firm again." },
  { id: 26, question: "The rigid, non-living, outermost layer found in plant cells (but not animal cells) is the:", options: ["Plasma membrane", "Cell wall", "Nuclear envelope", "Middle lamella"], correctAnswer: 1, explanation: "The cell wall, made mainly of cellulose, is present only in plant cells (also fungi and bacteria) and lies outside the plasma membrane." },
  { id: 27, question: "The main chemical component of a plant cell wall is:", options: ["Chitin", "Cellulose", "Peptidoglycan", "Keratin"], correctAnswer: 1, explanation: "Plant cell walls are made primarily of cellulose, a complex carbohydrate that provides rigidity and strength." },
  { id: 28, question: "Which of the following is a function of the cell wall?", options: ["Site of protein synthesis", "Provides shape and mechanical support to the cell", "Controls the entry of gases only", "Produces ATP"], correctAnswer: 1, explanation: "The cell wall gives the plant cell a definite, rigid shape and protects it from mechanical damage and bursting." },
  { id: 29, question: "Which structure, if absent, would allow a cell to burst when placed in a hypotonic solution?", options: ["Nucleus", "Cell wall", "Mitochondria", "Ribosomes"], correctAnswer: 1, explanation: "The rigid cell wall in plant cells prevents bursting from excess water uptake; animal cells, lacking a cell wall, can burst (lyse) under similar conditions." },
  { id: 30, question: "The 'control centre' of a eukaryotic cell, which regulates all cellular activities, is the:", options: ["Golgi apparatus", "Nucleus", "Ribosome", "Vacuole"], correctAnswer: 1, explanation: "The nucleus contains the cell's genetic material and directs/controls the cell's metabolic activities, earning it the name 'control centre'." },
  { id: 31, question: "The network of thread-like structures within the nucleus, made of DNA and protein, is called:", options: ["Chromatin", "Chromosomes", "Nucleolus", "Cytoskeleton"], correctAnswer: 0, explanation: "Chromatin is the loosely coiled, thread-like network of DNA and protein in a non-dividing nucleus. It condenses into visible chromosomes during cell division." },
  { id: 32, question: "Chromatin material condenses into visible rod-shaped structures called _____ just before cell division.", options: ["Genes", "Chromosomes", "Ribosomes", "Nucleoli"], correctAnswer: 1, explanation: "Just before cell division, chromatin condenses to form visible, distinct chromosomes." },
  { id: 33, question: "The units of inheritance located on chromosomes, controlling the characteristics of an organism, are called:", options: ["Genes", "Nucleoli", "Vesicles", "Cristae"], correctAnswer: 0, explanation: "Genes are the functional segments of DNA on a chromosome, and they carry the information for hereditary characteristics." },
  { id: 34, question: "The dense, spherical structure within the nucleus, involved in ribosome production, is the:", options: ["Nucleoid", "Nucleolus", "Nuclear membrane", "Nuclear pore"], correctAnswer: 1, explanation: "The nucleolus is a small, dense region inside the nucleus, mainly involved in the production of ribosomes." },
  { id: 35, question: "What allows the nucleus to communicate/exchange material with the cytoplasm?", options: ["The cell wall", "Pores in the nuclear membrane", "The plasma membrane alone", "Mitochondria"], correctAnswer: 1, explanation: "The double-layered nuclear membrane has tiny pores that allow the transfer of materials between the nucleus and the cytoplasm." },
  { id: 36, question: "In cells that lack a well-defined nucleus, the genetic material is present in a region called the:", options: ["Nucleolus", "Nucleoid", "Nuclear envelope", "Centrosome"], correctAnswer: 1, explanation: "In prokaryotic cells, which have no defined nuclear membrane, the genetic material lies in a poorly defined region called the nucleoid." },
  { id: 37, question: "Which of the following is a prokaryotic organism?", options: ["Bacteria", "Yeast", "Human liver cell", "Onion cell"], correctAnswer: 0, explanation: "Bacteria (and blue-green algae) are prokaryotic organisms, lacking a membrane-bound nucleus and membrane-bound organelles." },
  { id: 38, question: "Which of the following is TRUE about prokaryotic cells?", options: ["They have a well-defined nucleus", "They lack membrane-bound organelles", "They contain mitochondria", "They are generally larger than eukaryotic cells"], correctAnswer: 1, explanation: "Prokaryotic cells lack membrane-bound organelles like mitochondria and Golgi apparatus, and are generally smaller and simpler than eukaryotic cells." },
  { id: 39, question: "Which of the following organisms has eukaryotic cells?", options: ["Bacterium", "Blue-green algae", "Amoeba", "Cyanobacteria"], correctAnswer: 2, explanation: "Amoeba, a protist, is a eukaryotic organism with a well-defined nucleus and membrane-bound organelles, unlike bacteria and cyanobacteria which are prokaryotic." },
  { id: 40, question: "The jelly-like substance between the nucleus and the plasma membrane, where most cellular activities occur, is the:", options: ["Cytoplasm", "Nucleoplasm", "Cell sap", "Matrix"], correctAnswer: 0, explanation: "Cytoplasm is the fluid content of the cell within the plasma membrane, excluding the nucleus, and it houses various organelles and metabolic activities." },
  { id: 41, question: "Which organelle is described as a network of membrane-bound tubules and sacs extending throughout the cytoplasm?", options: ["Golgi apparatus", "Endoplasmic reticulum", "Lysosome", "Mitochondria"], correctAnswer: 1, explanation: "The endoplasmic reticulum (ER) is an extensive network of membrane-bound tubules and vesicles spread throughout the cytoplasm." },
  { id: 42, question: "Rough endoplasmic reticulum (RER) appears 'rough' because of the presence of:", options: ["Lipid droplets", "Ribosomes on its surface", "Chlorophyll", "DNA strands"], correctAnswer: 1, explanation: "RER has numerous ribosomes attached to its outer surface, giving it a granular or 'rough' appearance under the microscope." },
  { id: 43, question: "The main function of rough endoplasmic reticulum is:", options: ["Lipid synthesis", "Protein synthesis", "Detoxification of drugs", "Water storage"], correctAnswer: 1, explanation: "RER, due to its attached ribosomes, is the primary site of protein synthesis in the cell." },
  { id: 44, question: "The main function of smooth endoplasmic reticulum is:", options: ["Protein synthesis", "Lipid (fat) synthesis", "ATP production", "Photosynthesis"], correctAnswer: 1, explanation: "SER, which lacks ribosomes, is mainly responsible for the synthesis of lipids (fats)." },
  { id: 45, question: "Liver cells that detoxify many poisons and drugs have an abundance of which organelle?", options: ["Rough endoplasmic reticulum", "Smooth endoplasmic reticulum", "Chloroplast", "Vacuole"], correctAnswer: 1, explanation: "Smooth endoplasmic reticulum plays a major role in detoxifying poisons and drugs, which is why liver cells have an abundance of it." },
  { id: 46, question: "Which organelle helps in the transport of materials synthesised in the ER to other parts of the cell?", options: ["Endoplasmic reticulum", "Golgi apparatus", "Ribosome", "Nucleus"], correctAnswer: 1, explanation: "The Golgi apparatus receives materials from the ER, modifies and packages them, and transports them to their destinations within or outside the cell." },
  { id: 47, question: "The Golgi apparatus was discovered by:", options: ["Camillo Golgi", "Robert Brown", "Robert Hooke", "Rudolf Virchow"], correctAnswer: 0, explanation: "The Golgi apparatus was first observed by Camillo Golgi, after whom it was named." },
  { id: 48, question: "The Golgi apparatus is structurally composed of:", options: ["Rod-shaped mitochondria", "System of membrane-bound vesicles, vacuoles, and flattened sacs (cisternae)", "A large central sac only", "Thread-like DNA strands"], correctAnswer: 1, explanation: "The Golgi apparatus consists of stacks of flattened, membrane-bound sacs called cisternae, along with associated vesicles and vacuoles." },
  { id: 49, question: "Which organelle is primarily responsible for the formation of lysosomes?", options: ["Mitochondria", "Golgi apparatus", "Ribosomes", "Nucleus"], correctAnswer: 1, explanation: "Lysosomes are formed by the Golgi apparatus, which packages digestive enzymes produced by the RER." },
  { id: 50, question: "Lysosomes are also known as:", options: ["Powerhouses of the cell", "Suicide bags of the cell", "Protein factories", "Control centres"], correctAnswer: 1, explanation: "Lysosomes are called 'suicide bags' because their digestive enzymes, if released within the cell, can digest the cell's own components, leading to cell death." },
  { id: 51, question: "Lysosomes are rich in which type of substances?", options: ["Photosynthetic pigments", "Digestive enzymes", "Hereditary material", "Structural cellulose"], correctAnswer: 1, explanation: "Lysosomes contain a variety of powerful digestive (hydrolytic) enzymes capable of breaking down organic material." },
  { id: 52, question: "Which organelle is responsible for cellular respiration and ATP production?", options: ["Ribosome", "Mitochondria", "Lysosome", "Golgi apparatus"], correctAnswer: 1, explanation: "Mitochondria perform cellular respiration, breaking down food to produce ATP, the cell's energy currency." },
  { id: 53, question: "Mitochondria are called the 'powerhouse of the cell' because they:", options: ["Store genetic material", "Produce ATP through cellular respiration", "Synthesise proteins", "Digest worn-out cell parts"], correctAnswer: 1, explanation: "Mitochondria release energy needed for various cellular activities in the form of ATP molecules through cellular respiration." },
  { id: 54, question: "Which of the following statements about mitochondria is correct?", options: ["They have their own DNA and ribosomes", "They lack a membrane", "They are found only in plant cells", "They synthesise cellulose"], correctAnswer: 0, explanation: "Mitochondria possess their own circular DNA and ribosomes, allowing them to independently synthesise some of their own proteins and divide." },
  { id: 55, question: "Cells that require a lot of energy, such as muscle cells, tend to have a large number of:", options: ["Vacuoles", "Mitochondria", "Lysosomes", "Cell walls"], correctAnswer: 1, explanation: "Cells with high energy demands, like muscle cells, contain many mitochondria to meet their increased ATP requirements." },
  { id: 56, question: "Plastids are found only in:", options: ["Animal cells", "Plant cells", "Bacterial cells", "Fungal cells"], correctAnswer: 1, explanation: "Plastids are organelles found exclusively in plant cells (and some protists like algae), not in animal or bacterial cells." },
  { id: 57, question: "Green-coloured plastids that contain chlorophyll and are the site of photosynthesis are called:", options: ["Chromoplasts", "Leucoplasts", "Chloroplasts", "Elaioplasts"], correctAnswer: 2, explanation: "Chloroplasts contain the green pigment chlorophyll and are the site where photosynthesis occurs." },
  { id: 58, question: "Colourless plastids that store starch, oils, and proteins are called:", options: ["Chloroplasts", "Chromoplasts", "Leucoplasts", "Nucleoplasts"], correctAnswer: 2, explanation: "Leucoplasts are colourless plastids that function mainly as storage organelles for starch, oils, and proteins." },
  { id: 59, question: "Plastids that give flowers and fruits their yellow, orange, or red colours are called:", options: ["Chloroplasts", "Chromoplasts", "Leucoplasts", "Amyloplasts"], correctAnswer: 1, explanation: "Chromoplasts contain pigments other than chlorophyll, giving flowers and fruits their characteristic yellow, orange, and red colours." },
  { id: 60, question: "Like mitochondria, plastids also possess their own:", options: ["Cellulose wall", "DNA and ribosomes", "Digestive enzymes only", "Nucleolus"], correctAnswer: 1, explanation: "Plastids, like mitochondria, contain their own DNA and ribosomes, supporting the endosymbiotic theory of their origin." },
  { id: 61, question: "Which organelle serves as the site of protein synthesis and is not bound by a membrane?", options: ["Ribosome", "Mitochondria", "Lysosome", "Golgi apparatus"], correctAnswer: 0, explanation: "Ribosomes are small, granular structures, not bound by a membrane, and they are the actual site where protein synthesis takes place." },
  { id: 62, question: "Ribosomes are found:", options: ["Freely in the cytoplasm and attached to the rough ER", "Only inside the nucleus", "Only inside mitochondria", "Only in plant cells"], correctAnswer: 0, explanation: "Ribosomes occur freely floating in the cytoplasm as well as attached to the rough endoplasmic reticulum." },
  { id: 63, question: "Membrane-bound sacs found in the cytoplasm that store water, food, waste, or other materials are called:", options: ["Vacuoles", "Lysosomes", "Ribosomes", "Golgi bodies"], correctAnswer: 0, explanation: "Vacuoles are storage sacs bound by a membrane (called the tonoplast in plant cells) that store various substances." },
  { id: 64, question: "In plant cells, vacuoles are generally:", options: ["Small and numerous", "Absent altogether", "Large, often occupying most of the cell's volume", "Filled with digestive enzymes only"], correctAnswer: 2, explanation: "Mature plant cells typically contain a large central vacuole that can occupy up to 90% of the cell volume, filled with cell sap." },
  { id: 65, question: "In Amoeba, the vacuole that helps remove excess water from the cell is called the:", options: ["Food vacuole", "Contractile vacuole", "Central vacuole", "Sap vacuole"], correctAnswer: 1, explanation: "Amoeba (and some other protists) possess a contractile vacuole that actively pumps out excess water to maintain water balance." },
  { id: 66, question: "In Amoeba, the vacuole formed around engulfed food particles is called the:", options: ["Central vacuole", "Contractile vacuole", "Food vacuole", "Sap vacuole"], correctAnswer: 2, explanation: "The temporary vacuole formed around a food particle engulfed by Amoeba is called a food vacuole, inside which digestion occurs." },
  { id: 67, question: "The fluid stored inside a plant cell's central vacuole is called:", options: ["Cytoplasm", "Cell sap", "Nucleoplasm", "Chromoplasm"], correctAnswer: 1, explanation: "The solution of salts, sugars, and other substances stored in a plant cell's vacuole is called cell sap." },
  { id: 68, question: "The pressure exerted by the swollen vacuole against the rigid cell wall, keeping a plant firm, is called:", options: ["Osmotic pressure only", "Turgor pressure", "Plasmolytic pressure", "Diffusion pressure"], correctAnswer: 1, explanation: "Turgor pressure is generated when a water-filled vacuole presses outward against the cell wall, keeping plant cells and tissues firm." },
  { id: 69, question: "Which of the following organelles is common to BOTH plant and animal cells?", options: ["Cell wall", "Chloroplast", "Mitochondria", "Large permanent central vacuole"], correctAnswer: 2, explanation: "Mitochondria are present in both plant and animal cells, whereas cell wall, chloroplasts, and large permanent vacuoles are features unique (or largely unique) to plant cells." },
  { id: 70, question: "Which of the following is found in an animal cell but typically NOT in a plant cell?", options: ["Nucleus", "Mitochondria", "Centrioles (used in animal cell division)", "Ribosomes"], correctAnswer: 2, explanation: "Centrioles, which help organise the spindle fibres during animal cell division, are typically absent in most plant cells." },
  { id: 71, question: "Which feature is unique to plant cells and absent in typical animal cells?", options: ["Plasma membrane", "Cytoplasm", "Chloroplasts", "Nucleus"], correctAnswer: 2, explanation: "Chloroplasts, needed for photosynthesis, are found only in plant cells (and photosynthetic protists), not in animal cells." },
  { id: 72, question: "A red blood cell placed in distilled water will most likely:", options: ["Shrink due to exosmosis", "Swell and may burst due to endosmosis", "Remain completely unchanged", "Undergo plasmolysis"], correctAnswer: 1, explanation: "Distilled water is strongly hypotonic to the cell's cytoplasm, so water rushes in by endosmosis; lacking a cell wall, the RBC can swell and burst (haemolysis)." },
  { id: 73, question: "Cell division in living organisms is essential for:", options: ["Only reproduction", "Growth, repair, and reproduction", "Only respiration", "Digestion of food"], correctAnswer: 1, explanation: "Cell division allows organisms to grow, replace damaged or worn-out cells (repair), and reproduce." },
  { id: 74, question: "Which of the following best describes the term 'multicellular organism'?", options: ["An organism made of a single cell", "An organism made of many cells performing specialised functions", "An organism without a nucleus", "An organism that lacks a cell membrane"], correctAnswer: 1, explanation: "Multicellular organisms are composed of many cells, often organised into tissues and organs, each performing specialised functions." },
  { id: 75, question: "Which of these is an example of a multicellular organism?", options: ["Amoeba", "Paramecium", "Human being", "Bacterium"], correctAnswer: 2, explanation: "Human beings, like most animals and plants, are multicellular, made up of trillions of specialised cells." },
  { id: 76, question: "Which term describes an organism's entire body consisting of just one cell that performs all life functions?", options: ["Multicellular", "Unicellular", "Acellular", "Non-cellular"], correctAnswer: 1, explanation: "A unicellular organism's single cell carries out nutrition, respiration, excretion, and reproduction all by itself." },
  { id: 77, question: "The scientific name for the study of cells is:", options: ["Cytology", "Histology", "Physiology", "Anatomy"], correctAnswer: 0, explanation: "Cytology is the branch of biology dealing specifically with the structure and function of cells." },
  { id: 78, question: "Diffusion of a substance always occurs from a region of:", options: ["Lower to higher concentration", "Higher to lower concentration", "Equal concentration only", "High pressure to high pressure"], correctAnswer: 1, explanation: "Diffusion is a passive process where particles move down their concentration gradient, from higher to lower concentration." },
  { id: 79, question: "Which of the following does NOT require the input of external energy by the cell?", options: ["Diffusion", "Active transport", "Endocytosis", "Muscle contraction"], correctAnswer: 0, explanation: "Diffusion (and osmosis) is a passive process driven purely by the concentration gradient and does not require the cell to spend energy." },
  { id: 80, question: "Which of the following correctly differentiates prokaryotic cells from eukaryotic cells?", options: ["Prokaryotic cells have a nuclear membrane; eukaryotic cells do not", "Prokaryotic cells lack membrane-bound organelles; eukaryotic cells possess them", "Prokaryotic cells are always larger than eukaryotic cells", "Prokaryotic cells contain chloroplasts; eukaryotic cells do not"], correctAnswer: 1, explanation: "The defining difference is that prokaryotic cells lack a membrane-bound nucleus and other membrane-bound organelles, which eukaryotic cells possess." },
  { id: 81, question: "The genetic material of a bacterium (a prokaryote) is located in the:", options: ["Nucleus", "Nucleoid", "Nucleolus", "Chromoplast"], correctAnswer: 1, explanation: "Since bacteria lack a true, membrane-bound nucleus, their genetic material lies in an undefined region of the cytoplasm called the nucleoid." },
  { id: 82, question: "Which organelle acts as the packaging and dispatch unit for materials made by the endoplasmic reticulum?", options: ["Ribosome", "Mitochondria", "Golgi apparatus", "Nucleolus"], correctAnswer: 2, explanation: "The Golgi apparatus modifies, packages, and transports materials received from the endoplasmic reticulum to their proper destinations." },
  { id: 83, question: "What is the primary function of the plasma membrane apart from providing a boundary?", options: ["Photosynthesis", "Regulating movement of substances into and out of the cell", "Storing genetic information", "Producing energy"], correctAnswer: 1, explanation: "The plasma membrane's key role is to selectively regulate the transport of substances between the cell and its environment." },
  { id: 84, question: "Which of the following is a fluid-filled sac bound by a single membrane that stores substances within the cell?", options: ["Ribosome", "Vacuole", "Chromosome", "Cell wall"], correctAnswer: 1, explanation: "A vacuole is a membrane-bound storage sac found in the cytoplasm of a cell." },
  { id: 85, question: "Which structure would be primarily responsible if a plant cell needed to break down a worn-out organelle?", options: ["Lysosome", "Ribosome", "Chloroplast", "Nuclear membrane"], correctAnswer: 0, explanation: "Lysosomes contain digestive enzymes that break down and recycle worn-out or damaged cell organelles." },
  { id: 86, question: "Chromosomes are best described as:", options: ["Condensed, visible forms of chromatin material seen during cell division", "Small organelles found only in plant cells", "Proteins that make up the cell wall", "Sacs of digestive enzymes"], correctAnswer: 0, explanation: "Chromosomes are the tightly coiled, visible form that chromatin material takes just before and during cell division." },
  { id: 87, question: "DNA stands for:", options: ["Deoxyribonucleic acid", "Diribonucleic acid", "Dinucleotide acid", "Deoxyribose nuclear acid"], correctAnswer: 0, explanation: "DNA is the abbreviation for Deoxyribonucleic Acid, the molecule that carries genetic information." },
  { id: 88, question: "Which of these terms correctly ranks from smallest to largest unit of genetic organisation?", options: ["Chromosome, gene, DNA", "Gene, DNA, chromosome", "DNA, gene, chromosome", "Chromosome, DNA, gene"], correctAnswer: 1, explanation: "A gene is a functional segment of a DNA molecule, and many DNA molecules (with their associated proteins) coil together to form a chromosome." },
  { id: 89, question: "Which of the following would you expect to find plenty of in a gland cell that secretes digestive enzymes for export out of the cell?", options: ["Chloroplasts", "Rough endoplasmic reticulum and Golgi apparatus", "Cell wall only", "Contractile vacuoles"], correctAnswer: 1, explanation: "A secretory cell needs abundant RER to synthesise the enzyme proteins and Golgi apparatus to package and export them." },
  { id: 90, question: "Which best explains why onion peel cells, when observed under a microscope with iodine solution, show a clearly visible nucleus?", options: ["Iodine dissolves the cell wall", "Iodine stains the nucleus, making it more visible under the microscope", "Iodine destroys the cytoplasm", "Iodine is a source of energy for the cell"], correctAnswer: 1, explanation: "Iodine solution is commonly used as a stain in microscopy because it darkens/highlights the nucleus and other structures, making them easier to observe." },
  { id: 91, question: "Which of these correctly lists organelles found ONLY in a typical plant cell (not in animal cells)?", options: ["Mitochondria and ribosomes", "Nucleus and plasma membrane", "Cell wall and chloroplasts", "Golgi apparatus and lysosomes"], correctAnswer: 2, explanation: "The rigid cell wall and chlorophyll-containing chloroplasts are structures characteristic of plant cells, generally absent in animal cells." },
  { id: 92, question: "Which of the following is the correct sequence of protein transport in a secretory cell?", options: ["Ribosome (on RER) → Golgi apparatus → secretory vesicle → outside the cell", "Nucleus → mitochondria → outside the cell", "Golgi apparatus → ribosome → nucleus", "Lysosome → RER → nucleus"], correctAnswer: 0, explanation: "Proteins are made by ribosomes on the RER, sent to the Golgi apparatus for modification/packaging, and then released from the cell in secretory vesicles." },
  { id: 93, question: "Which organelle would be present in especially high numbers in a cell of a green leaf but absent from a root cell deep underground?", options: ["Mitochondria", "Chloroplasts", "Ribosomes", "Nucleus"], correctAnswer: 1, explanation: "Chloroplasts are abundant in photosynthetic leaf cells exposed to sunlight but are absent in non-photosynthetic root cells underground." },
  { id: 94, question: "Endosmosis refers to the net movement of water:", options: ["Out of a cell", "Into a cell", "Sideways along the cell membrane", "Only within the nucleus"], correctAnswer: 1, explanation: "Endosmosis is the inward movement of water into a cell when the external solution is hypotonic relative to the cell's contents." },
  { id: 95, question: "Exosmosis refers to the net movement of water:", options: ["Into a cell", "Out of a cell", "Into the nucleus", "Into a vacuole only"], correctAnswer: 1, explanation: "Exosmosis is the outward movement of water from a cell when the external solution is hypertonic relative to the cell's contents." },
  { id: 96, question: "A cell wall is described as 'permeable' because it:", options: ["Allows almost all substances, including large molecules, to pass through freely", "Allows only water to pass", "Blocks the entry of all substances", "Only allows gases to pass"], correctAnswer: 0, explanation: "Unlike the selectively permeable plasma membrane, the cell wall is fully permeable, allowing water and most solutes to pass through easily." },
  { id: 97, question: "Which of the following organelles is described as a 'factory' most directly responsible for making a cell's proteins?", options: ["Golgi apparatus", "Ribosome", "Vacuole", "Cell wall"], correctAnswer: 1, explanation: "Ribosomes are the actual site of protein synthesis, translating genetic instructions into protein molecules." },
  { id: 98, question: "Two daughter cells produced from a single parent cell during cell division are generally:", options: ["Always genetically different from the parent", "Genetically identical to the parent cell (in normal mitotic division)", "Always larger than the parent cell", "Never capable of dividing again"], correctAnswer: 1, explanation: "During normal (mitotic) cell division, the genetic material is copied and equally distributed, so daughter cells are genetically identical to the parent." },
  { id: 99, question: "Which of the following is the correct order of increasing organisation in a multicellular organism?", options: ["Organ → Tissue → Cell → Organ system", "Cell → Tissue → Organ → Organ system", "Tissue → Organ system → Cell → Organ", "Organ system → Organ → Cell → Tissue"], correctAnswer: 1, explanation: "In multicellular organisms, cells group to form tissues, tissues combine to form organs, and organs work together as organ systems." },
  { id: 100, question: "Which statement best summarises why the cell is considered the fundamental unit of life?", options: ["It is the largest visible structure in an organism", "It is the smallest unit capable of independently performing all basic life processes", "It only exists in plants", "It cannot be seen without special staining"], correctAnswer: 1, explanation: "The cell is the smallest structural and functional unit capable of independently carrying out nutrition, respiration, excretion, growth, and reproduction -- hence it is the fundamental unit of life." },
];

// ── QUESTION BANK: VERY SHORT ANSWER (2 MARKS) ──
export const BIOLOGY9_VERY_SHORT: ShortQuestion[] = [
  { id: 1, question: "Define a cell.", answer: "A cell is the smallest structural and functional unit of a living organism, capable of independently carrying out the basic processes of life.", keyPoints: ["Smallest structural unit", "Smallest functional unit", "Basic unit of every living organism"] },
  { id: 2, question: "State the cell theory.", answer: "The cell theory states that all living organisms are composed of cells, the cell is the basic unit of structure and function in living things, and new cells arise only from pre-existing cells.", keyPoints: ["All organisms made of cells", "Cell = basic structural/functional unit", "New cells from pre-existing cells (Virchow)"] },
  { id: 3, question: "Who discovered the cell, and when?", answer: "Robert Hooke discovered the cell in 1665 while examining a thin slice of cork under a self-designed microscope, and he named the structures he observed 'cells'.", keyPoints: ["Robert Hooke", "1665", "Observed cork slice; coined term 'cell'"] },
  { id: 4, question: "Define diffusion.", answer: "Diffusion is the net movement of particles of a substance from a region of higher concentration to a region of lower concentration, without the use of external energy.", keyPoints: ["Higher to lower concentration", "Passive process", "No membrane strictly required"] },
  { id: 5, question: "Define osmosis.", answer: "Osmosis is the net movement of water molecules from a region of higher water concentration to a region of lower water concentration through a selectively permeable membrane.", keyPoints: ["Movement of water only", "Through selectively permeable membrane", "High to low water concentration"] },
  { id: 6, question: "What is plasmolysis?", answer: "Plasmolysis is the shrinking of the cytoplasm and pulling away of the cell membrane from the cell wall when a plant cell is placed in a hypertonic (concentrated) solution and loses water by exosmosis.", keyPoints: ["Occurs in hypertonic solution", "Water leaves the cell (exosmosis)", "Membrane shrinks away from cell wall"] },
  { id: 7, question: "Differentiate between a prokaryotic and eukaryotic cell (in one line each).", answer: "A prokaryotic cell lacks a membrane-bound nucleus and organelles (genetic material lies in a nucleoid), while a eukaryotic cell has a well-defined, membrane-bound nucleus and membrane-bound organelles.", keyPoints: ["Prokaryote: no nuclear membrane, nucleoid", "Eukaryote: true nucleus present", "Eukaryote also has membrane-bound organelles"] },
  { id: 8, question: "What is chromatin?", answer: "Chromatin is the loosely coiled, thread-like network of DNA and protein present in the nucleus of a non-dividing cell, which condenses into chromosomes during cell division.", keyPoints: ["Made of DNA + protein", "Found in nucleus", "Condenses into chromosomes before division"] },
  { id: 9, question: "Name the two types of endoplasmic reticulum and one function of each.", answer: "The two types are Rough Endoplasmic Reticulum (RER), which synthesises proteins due to ribosomes on its surface, and Smooth Endoplasmic Reticulum (SER), which synthesises lipids and helps in detoxification.", keyPoints: ["RER: has ribosomes, makes proteins", "SER: no ribosomes, makes lipids", "SER also aids detoxification"] },
  { id: 10, question: "Why are lysosomes called 'suicide bags'?", answer: "Lysosomes are called suicide bags because they contain digestive enzymes that, if released due to cell damage, digest the cell's own components and cause the cell to die.", keyPoints: ["Contain digestive enzymes", "Enzymes released on cell damage", "Self-digestion (autolysis) of the cell"] },
  { id: 11, question: "Why are mitochondria called the 'powerhouse of the cell'?", answer: "Mitochondria are called the powerhouse of the cell because they carry out cellular respiration, breaking down food to release energy that is stored as ATP for the cell's use.", keyPoints: ["Site of cellular respiration", "Produces ATP", "ATP = usable energy currency"] },
  { id: 12, question: "Name the three types of plastids.", answer: "The three types of plastids are chloroplasts (green, contain chlorophyll, site of photosynthesis), chromoplasts (coloured, give colour to flowers/fruits), and leucoplasts (colourless, store food).", keyPoints: ["Chloroplast -- photosynthesis", "Chromoplast -- colour pigments", "Leucoplast -- storage"] },
  { id: 13, question: "What is a selectively permeable membrane?", answer: "A selectively permeable membrane is one that allows certain substances (like water and small molecules) to pass through while restricting the passage of others (like large solute molecules).", keyPoints: ["Allows some substances through", "Blocks other substances", "Property of the plasma membrane"] },
  { id: 14, question: "Define an isotonic solution.", answer: "An isotonic solution is one that has the same water/solute concentration as the cell's cytoplasm, resulting in no net movement of water into or out of the cell.", keyPoints: ["Equal concentration to cell contents", "No net water movement", "Cell size stays unchanged"] },
  { id: 15, question: "Define a hypotonic solution and its effect on a cell.", answer: "A hypotonic solution has a lower solute concentration (more water) than the cell; water enters the cell by endosmosis, causing it to swell or become turgid.", keyPoints: ["More water outside than inside", "Water enters cell (endosmosis)", "Cell swells / turgid"] },
  { id: 16, question: "Define a hypertonic solution and its effect on a cell.", answer: "A hypertonic solution has a higher solute concentration (less water) than the cell; water leaves the cell by exosmosis, causing it to shrink or plasmolyse.", keyPoints: ["Less water outside than inside", "Water leaves cell (exosmosis)", "Cell shrinks / plasmolysis"] },
  { id: 17, question: "What is a nucleoid?", answer: "A nucleoid is the undefined, non-membrane-bound region in a prokaryotic cell where the genetic material (DNA) is located.", keyPoints: ["Found in prokaryotes", "Not membrane-bound", "Holds the cell's DNA"] },
  { id: 18, question: "What is protoplasm?", answer: "Protoplasm is the living substance of the cell, comprising the cytoplasm and the nucleoplasm (contents of the nucleus), first named by Purkinje.", keyPoints: ["Living content of the cell", "Includes cytoplasm + nucleoplasm", "Named by Purkinje"] },
  { id: 19, question: "Name two organelles that possess their own DNA.", answer: "Mitochondria and plastids (chloroplasts) both possess their own circular DNA and ribosomes, allowing partial independence from the nucleus.", keyPoints: ["Mitochondria", "Plastids/chloroplasts", "Supports endosymbiotic theory"] },
  { id: 20, question: "Define exocytosis.", answer: "Exocytosis is the process by which materials produced inside a cell are packaged into vesicles and expelled out of the cell through the plasma membrane.", keyPoints: ["Movement of materials out of the cell", "Uses vesicles", "Opposite of endocytosis"] },
  { id: 21, question: "State one function of ribosomes.", answer: "Ribosomes are the site of protein synthesis in the cell, translating genetic instructions from mRNA into protein molecules.", keyPoints: ["Site of protein synthesis", "Not membrane-bound", "Found free or attached to RER"] },
  { id: 22, question: "Define cytoplasm.", answer: "Cytoplasm is the jelly-like substance present between the nucleus and the plasma membrane, in which the various cell organelles are suspended and many metabolic reactions occur.", keyPoints: ["Fluid content of the cell", "Excludes the nucleus", "Houses the organelles"] },
  { id: 23, question: "State one function of the nuclear membrane.", answer: "The nuclear membrane encloses and protects the genetic material of the cell, while its pores allow the regulated exchange of materials between the nucleus and cytoplasm.", keyPoints: ["Encloses genetic material", "Has pores for exchange", "Double-layered structure"] },
  { id: 24, question: "State one function of the Golgi apparatus.", answer: "The Golgi apparatus modifies, packages, and dispatches materials (like proteins from the ER) to their correct destinations within or outside the cell; it also forms lysosomes.", keyPoints: ["Modifies and packages materials", "Transports materials to destinations", "Forms lysosomes"] },
  { id: 25, question: "What is a contractile vacuole and where is it found?", answer: "A contractile vacuole is a specialised vacuole found in organisms like Amoeba that actively pumps out excess water from the cell to maintain water balance.", keyPoints: ["Found in Amoeba/protists", "Removes excess water", "Maintains osmotic balance"] },
  { id: 26, question: "Why does a cell need a plasma membrane?", answer: "A cell needs a plasma membrane to form a selectively permeable boundary that separates it from its environment and regulates the entry and exit of substances.", keyPoints: ["Forms the outer boundary", "Selectively permeable", "Regulates transport"] },
  { id: 27, question: "State one difference between a plant cell and an animal cell.", answer: "A plant cell has a rigid cell wall made of cellulose outside the plasma membrane, whereas an animal cell lacks a cell wall and has only the flexible plasma membrane as its boundary.", keyPoints: ["Plant cell: has cell wall", "Animal cell: no cell wall", "Cell wall = cellulose, rigid"] },
  { id: 28, question: "What is turgor pressure?", answer: "Turgor pressure is the pressure exerted by the contents of a water-filled vacuole against the cell wall, which keeps plant cells and tissues firm and upright.", keyPoints: ["Pressure of vacuole against cell wall", "Caused by water entering by osmosis", "Keeps plant firm"] },
];

// ── QUESTION BANK: SHORT ANSWER (3 MARKS) ──
export const BIOLOGY9_SHORT: ShortQuestion[] = [
  { id: 1, question: "Explain the cell theory with its three main postulates.", answer: "The cell theory has three main postulates: (1) all living organisms are composed of cells, (2) the cell is the basic structural and functional unit of life, and (3) new cells are produced only from pre-existing cells through cell division (added later by Rudolf Virchow).", keyPoints: ["All organisms made of cells (Schleiden & Schwann)", "Cell = structural and functional unit", "New cells from pre-existing cells (Virchow, 1855)"] },
  { id: 2, question: "Explain diffusion with a suitable biological example.", answer: "Diffusion is the net movement of particles from a region of higher concentration to lower concentration. For example, oxygen produced by a leaf during photosynthesis diffuses out into the air where its concentration is lower, while carbon dioxide from the air diffuses into the leaf where its concentration is lower inside due to photosynthetic consumption.", keyPoints: ["Higher to lower concentration", "Example: gas exchange in a leaf", "No energy required, passive process"] },
  { id: 3, question: "Explain osmosis using the terms endosmosis and exosmosis.", answer: "Osmosis is the movement of water across a selectively permeable membrane. When water moves into a cell because the external solution is hypotonic (more water outside), it is called endosmosis, causing the cell to swell. When water moves out of a cell because the external solution is hypertonic (less water outside), it is called exosmosis, causing the cell to shrink.", keyPoints: ["Endosmosis: water enters (hypotonic outside)", "Exosmosis: water leaves (hypertonic outside)", "Both are directions of osmosis"] },
  { id: 4, question: "Differentiate between a plant cell and an animal cell (any three points).", answer: "A plant cell has a rigid cellulose cell wall while an animal cell does not; a plant cell typically has a large permanent central vacuole while an animal cell has small, temporary vacuoles if any; and a plant cell contains chloroplasts for photosynthesis while an animal cell lacks them entirely.", keyPoints: ["Cell wall: present in plant, absent in animal", "Vacuole: large & permanent in plant, small in animal", "Chloroplast: present in plant, absent in animal"] },
  { id: 5, question: "Differentiate between prokaryotic and eukaryotic cells (any three points).", answer: "A prokaryotic cell lacks a membrane-bound nucleus (genetic material lies in a nucleoid) while a eukaryotic cell has a well-defined nucleus enclosed by a nuclear membrane; prokaryotic cells lack membrane-bound organelles while eukaryotic cells possess them (mitochondria, ER, Golgi apparatus); and prokaryotic cells are generally smaller and structurally simpler than eukaryotic cells.", keyPoints: ["Nucleus: absent (nucleoid) vs. present (true nucleus)", "Organelles: absent vs. present (membrane-bound)", "Size/complexity: simpler & smaller vs. larger & complex"] },
  { id: 6, question: "Describe the structure of the plasma membrane.", answer: "The plasma membrane is a thin, flexible, living boundary composed mainly of lipids and proteins arranged in a bilayer, giving it a fluid, mosaic-like structure. It is selectively permeable, allowing it to regulate the movement of substances into and out of the cell while maintaining the cell's shape and integrity.", keyPoints: ["Made of lipids and proteins", "Flexible, fluid-mosaic structure", "Selectively permeable"] },
  { id: 7, question: "Explain the function of the nucleus in a cell.", answer: "The nucleus, enclosed by a pore-studded double nuclear membrane, houses the cell's genetic material (chromatin/chromosomes) and controls all metabolic and hereditary activities of the cell. Its nucleolus is involved in ribosome formation, and the pores allow regulated exchange of material with the cytoplasm.", keyPoints: ["Contains genetic material (DNA)", "Controls cellular activities ('control centre')", "Nuclear pores allow material exchange"] },
  { id: 8, question: "Describe the three types of plastids and their functions.", answer: "Chloroplasts are green plastids containing chlorophyll, and they are the site of photosynthesis. Chromoplasts are coloured plastids (yellow, orange, red) that give colour to flowers and fruits, attracting pollinators/seed dispersers. Leucoplasts are colourless plastids found in non-green parts, mainly used for storing starch, oils, and proteins.", keyPoints: ["Chloroplast: photosynthesis", "Chromoplast: colour pigments", "Leucoplast: storage of food"] },
  { id: 9, question: "Why are lysosomes called the 'suicide bags' of the cell? Explain.", answer: "Lysosomes are membrane-bound sacs formed by the Golgi apparatus, containing powerful digestive enzymes used to break down foreign material and worn-out cell parts. If the cell becomes damaged, the lysosomal membrane may rupture and release these enzymes into the cytoplasm, causing the enzymes to digest the cell's own components and kill it -- hence the name 'suicide bags'.", keyPoints: ["Contain digestive enzymes", "Normally digest waste/foreign material", "Rupture on cell damage causes self-digestion"] },
  { id: 10, question: "Describe the structure and role of mitochondria as the 'powerhouse of the cell'.", answer: "Mitochondria are rod-shaped or oval organelles bound by a double membrane, with the inner membrane folded into cristae to increase surface area for reactions. They contain enzymes for cellular respiration, breaking down food in the presence of oxygen to release energy stored as ATP, which powers the cell's activities. They also possess their own DNA and can divide independently.", keyPoints: ["Double membrane, inner folded into cristae", "Site of cellular respiration", "Produces ATP; has own DNA"] },
  { id: 11, question: "Explain the difference in vacuoles between plant and animal cells.", answer: "Plant cells usually have one large, permanent central vacuole that stores cell sap and generates turgor pressure by pressing against the rigid cell wall, keeping the plant firm. Animal cells, lacking a cell wall to press against, have small, numerous, and temporary vacuoles that store water, food, or waste for short periods.", keyPoints: ["Plant: single, large, permanent vacuole", "Animal: small, temporary vacuoles", "Plant vacuole generates turgor pressure"] },
  { id: 12, question: "Explain the roles of RER and SER in the cell.", answer: "Rough Endoplasmic Reticulum (RER) has ribosomes attached to its surface and is the main site of protein synthesis; these proteins may be exported or used within the cell. Smooth Endoplasmic Reticulum (SER) lacks ribosomes and is mainly responsible for lipid synthesis; it also plays a role in detoxifying drugs and poisons, especially in liver cells.", keyPoints: ["RER: has ribosomes, synthesises proteins", "SER: no ribosomes, synthesises lipids", "SER also detoxifies harmful substances"] },
  { id: 13, question: "Describe the structure and function of the Golgi apparatus.", answer: "The Golgi apparatus consists of a system of membrane-bound, flattened sac-like structures called cisternae, along with associated vesicles and vacuoles, usually located near the nucleus. It receives materials (like proteins) from the endoplasmic reticulum, chemically modifies and packages them into vesicles, and dispatches them to their correct destinations inside or outside the cell; it also forms lysosomes.", keyPoints: ["Stack of membrane-bound cisternae", "Modifies and packages materials from ER", "Forms lysosomes; discovered by Camillo Golgi"] },
  { id: 14, question: "Describe the structure and function of ribosomes.", answer: "Ribosomes are extremely small, granular structures made of RNA and protein, not bound by any membrane. They are found freely scattered in the cytoplasm or attached to the surface of the rough endoplasmic reticulum, and they serve as the actual site of protein synthesis in the cell, translating genetic code into functional proteins.", keyPoints: ["Small, granular, not membrane-bound", "Free in cytoplasm or attached to RER", "Site of protein synthesis"] },
  { id: 15, question: "Describe the structure and function of the cell wall.", answer: "The cell wall is a rigid, non-living, freely permeable layer found outside the plasma membrane of plant cells, made mainly of cellulose. It provides mechanical strength, gives the cell a fixed shape, protects the cell from mechanical injury and infection, and prevents the cell from bursting when it absorbs excess water by osmosis.", keyPoints: ["Rigid, non-living, made of cellulose", "Gives fixed shape and mechanical protection", "Prevents bursting from excess water uptake"] },
  { id: 16, question: "Explain the relationship between chromatin, chromosomes, and genes.", answer: "Chromatin is the loosely coiled network of DNA and protein present in the nucleus of a non-dividing cell. Just before cell division, chromatin condenses and coils tightly to form visible, distinct structures called chromosomes. Genes are specific functional segments of the DNA present on a chromosome, and they carry the coded information that controls the hereditary characteristics of an organism.", keyPoints: ["Chromatin = loose DNA + protein network", "Chromosomes = condensed chromatin (visible during division)", "Genes = functional DNA segments on chromosomes"] },
  { id: 17, question: "How does an amoeba obtain its food? Describe the process.", answer: "When an amoeba encounters a food particle, its flexible plasma membrane pushes out temporary finger-like extensions called pseudopodia, which surround and engulf the particle. This forms a food vacuole inside the cell, into which digestive enzymes are released to break down the food. This entire process of engulfing food is called endocytosis (specifically phagocytosis, as it involves solid particles).", keyPoints: ["Pseudopodia surround the food particle", "Food vacuole forms inside the cell", "Digestive enzymes break down the food"] },
  { id: 18, question: "Explain why mature mammalian red blood cells lack a nucleus, and what this implies about their lifespan.", answer: "Mature mammalian red blood cells lose their nucleus during development to maximise space for carrying oxygen-binding haemoglobin. Since they lack a nucleus, they cannot direct the synthesis of new proteins or repair themselves over time, which is one reason they have a limited lifespan (about 120 days) and must be continuously replaced by new cells produced in the bone marrow.", keyPoints: ["Nucleus lost to maximise haemoglobin space", "Cannot synthesise new proteins to repair itself", "Results in a limited lifespan (~120 days)"] },
  { id: 19, question: "Explain the significance of turgor pressure for plants.", answer: "Turgor pressure, generated when a plant cell's vacuole absorbs water and presses against its rigid cell wall, keeps plant cells firm and helps support non-woody parts of the plant like leaves and young stems. Loss of turgor pressure (due to lack of water) causes cells to become flaccid, resulting in the wilting seen in an under-watered plant.", keyPoints: ["Generated by water-filled vacuole pressing on cell wall", "Keeps cells and soft plant parts firm/upright", "Loss of turgor causes wilting"] },
  { id: 20, question: "Differentiate between diffusion and osmosis.", answer: "Diffusion is the net movement of particles of any substance (solid, liquid, or gas) from a region of higher to lower concentration, and does not necessarily require a membrane. Osmosis is a special type of diffusion involving specifically the movement of water molecules from a region of higher to lower water concentration, and it must occur across a selectively permeable membrane.", keyPoints: ["Diffusion: any substance, membrane not essential", "Osmosis: only water, membrane essential", "Osmosis is a specific case of diffusion"] },
  { id: 21, question: "State the function of the nucleolus and explain how it differs from the nucleus.", answer: "The nucleolus is a small, dense, spherical body found inside the nucleus, mainly involved in the production and assembly of ribosomes. Unlike the nucleus itself, which is the large membrane-bound structure holding all the genetic material (chromatin/chromosomes) and controlling the cell's activities, the nucleolus is just one specialised region within it.", keyPoints: ["Nucleolus: dense body inside nucleus", "Function: ribosome formation", "Nucleus is the larger structure containing it"] },
  { id: 22, question: "Explain briefly why unicellular organisms like Amoeba can perform all life processes within a single cell.", answer: "In a unicellular organism such as Amoeba, the single cell itself contains all the structures (like the plasma membrane, cytoplasm, nucleus, and vacuoles) needed to independently carry out every basic life process -- nutrition (via endocytosis), respiration, excretion (via the contractile vacuole), movement, and reproduction -- without needing any other cells to help.", keyPoints: ["One cell performs all functions", "Uses same organelles as multicellular organisms", "No division of labour between cells needed"] },
  { id: 23, question: "Explain the concept of endocytosis and exocytosis with one example each.", answer: "Endocytosis is the process by which a cell engulfs external material by folding its plasma membrane around it, as seen when an amoeba engulfs a food particle to form a food vacuole. Exocytosis is the reverse process, where the cell packages material into vesicles and releases it out through the plasma membrane, as seen when a gland cell secretes digestive enzymes out of the body.", keyPoints: ["Endocytosis: material moves into cell (e.g. Amoeba feeding)", "Exocytosis: material moves out of cell (e.g. enzyme secretion)", "Both require a flexible plasma membrane"] },
  { id: 24, question: "Explain why the study of cell structure and function is important in biology.", answer: "Since the cell is the basic structural and functional unit of every living organism, understanding cell structure and function helps explain how organisms grow, obtain energy, reproduce, and respond to their environment. It also forms the foundation for understanding diseases, genetics, and how multicellular organisms are organised into tissues, organs, and systems.", keyPoints: ["Cell = basis of all life processes", "Helps understand growth, energy, reproduction", "Foundation for genetics and disease studies"] },
  { id: 25, question: "Explain why diffusion alone is not enough for gas exchange in large organisms like humans.", answer: "Diffusion is efficient only over very short distances, and in a large, complex organism most cells are located far from the body's surface, with a low surface-area-to-volume ratio. Diffusion alone would be far too slow to supply oxygen to distant internal cells, so large organisms rely on specialised respiratory and circulatory systems to actively transport oxygen quickly to every cell.", keyPoints: ["Diffusion only efficient over short distances", "Large body = low surface-area-to-volume ratio", "Needs respiratory & circulatory systems instead"] },
];

// ── QUESTION BANK: LONG ANSWER (5 MARKS) ──
export const BIOLOGY9_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Describe in detail the structure and functions of the plasma membrane.",
    markingScheme: ["Composition of the membrane (1 mark)", "Structure/organisation (1 mark)", "Property of selective permeability (1.5 marks)", "Functions -- boundary, transport, shape (1.5 marks)"],
    answerParts: [
      { part: "Composition", text: "The plasma membrane is composed mainly of lipids and proteins, arranged so that it is thin, elastic, and living." },
      { part: "Structure", text: "It forms a flexible boundary around the cell's cytoplasm, capable of changing shape (allowing endocytosis/exocytosis), unlike a rigid cell wall." },
      { part: "Selective Permeability", text: "Its most important property is selective permeability -- it allows some substances (like water, oxygen, small molecules) to pass through while restricting others, controlling the internal composition of the cell." },
      { part: "Transport Functions", text: "It regulates the movement of substances in and out of the cell via diffusion, osmosis, and active transport, and allows bulk transport of large particles through endocytosis and exocytosis." },
      { part: "Protective/Shape Function", text: "It protects the internal components of the cell from the external environment and, in cells without a cell wall (like animal cells), it is solely responsible for maintaining the cell's shape." }
    ]
  },
  {
    id: 2,
    question: "Explain the structure and functions of the nucleus in a eukaryotic cell.",
    markingScheme: ["Nuclear membrane and pores (1.5 marks)", "Chromatin, chromosomes, and genes (1.5 marks)", "Nucleolus (1 mark)", "Overall control function (1 mark)"],
    answerParts: [
      { part: "Nuclear Membrane", text: "The nucleus is enclosed by a double-layered nuclear membrane, perforated with tiny pores that allow the regulated transfer of material between the nucleus and the cytoplasm." },
      { part: "Chromatin and Chromosomes", text: "Inside, the nucleus contains chromatin -- a loosely coiled network of DNA and protein -- which condenses into distinct, visible chromosomes just before and during cell division." },
      { part: "Genes", text: "Genes are the functional units of DNA present on chromosomes; they carry coded hereditary information that determines an organism's traits and controls protein synthesis." },
      { part: "Nucleolus", text: "A dense spherical structure called the nucleolus is present within the nucleus and plays a key role in the formation of ribosomes." },
      { part: "Overall Function", text: "By controlling gene expression and protein synthesis, the nucleus directs and regulates essentially all of the metabolic and hereditary activities of the cell, earning it the title 'control centre'." }
    ]
  },
  {
    id: 3,
    question: "Give a detailed account of the endoplasmic reticulum, including its types, structure, and functions.",
    markingScheme: ["General structure of ER (1 mark)", "Rough ER: structure and function (1.5 marks)", "Smooth ER: structure and function (1.5 marks)", "Overall significance (1 mark)"],
    answerParts: [
      { part: "General Structure", text: "The endoplasmic reticulum (ER) is a vast, interconnected network of membrane-bound tubules and flattened sacs that extends throughout the cytoplasm of a eukaryotic cell, forming a passage system within the cell." },
      { part: "Rough Endoplasmic Reticulum (RER)", text: "RER has numerous ribosomes attached to its outer surface, giving it a granular, 'rough' appearance. Because of these ribosomes, RER is the principal site of protein synthesis in the cell." },
      { part: "Smooth Endoplasmic Reticulum (SER)", text: "SER lacks ribosomes on its surface and appears smooth. It is the main site of lipid (fat) synthesis, and it also plays a significant role in detoxifying harmful drugs and poisons, especially in liver cells." },
      { part: "Membrane Biogenesis", text: "The ER also helps in the manufacture of new cell membrane material, as both proteins (from RER) and lipids (from SER) are essential building blocks of the plasma membrane and other organelle membranes." },
      { part: "Overall Significance", text: "Together, the two types of ER form a coordinated system for synthesising, processing, and transporting proteins and lipids to the Golgi apparatus and beyond, making the ER essential to the cell's manufacturing and repair systems." }
    ]
  },
  {
    id: 4,
    question: "Describe the structure and functions of mitochondria, and explain why they are called the powerhouse of the cell.",
    markingScheme: ["Structure -- double membrane and cristae (1.5 marks)", "Cellular respiration and ATP (1.5 marks)", "Own DNA and division (1 mark)", "'Powerhouse' explanation (1 mark)"],
    answerParts: [
      { part: "Structure", text: "Mitochondria are rod-shaped or spherical organelles enclosed by a double membrane -- the outer membrane is smooth, while the inner membrane is folded inward to form structures called cristae, which greatly increase the surface area for chemical reactions." },
      { part: "Cellular Respiration", text: "Mitochondria contain the enzymes needed to break down food molecules (like glucose) in the presence of oxygen, a process called cellular (aerobic) respiration." },
      { part: "ATP Production", text: "This respiration releases energy which is captured and stored in the form of ATP (adenosine triphosphate) molecules -- the immediately usable energy currency for the cell's activities." },
      { part: "Own DNA", text: "Mitochondria possess their own circular DNA and ribosomes, enabling them to synthesise some of their own proteins and to divide independently of the cell, supporting the theory that they originated from free-living bacteria." },
      { part: "Why 'Powerhouse'", text: "Since mitochondria are the primary source of the ATP that powers nearly every cellular activity -- from movement to biosynthesis -- they are aptly called the powerhouse of the cell." }
    ]
  },
  {
    id: 5,
    question: "Explain the different types of plastids found in plant cells, along with their structure and functions.",
    markingScheme: ["General features of plastids (1 mark)", "Chloroplasts (1.5 marks)", "Chromoplasts (1 mark)", "Leucoplasts (1.5 marks)"],
    answerParts: [
      { part: "General Features", text: "Plastids are organelles found only in plant cells (and some protists), bound by a double membrane, and like mitochondria, they contain their own DNA and ribosomes." },
      { part: "Chloroplasts", text: "Chloroplasts are green plastids containing the pigment chlorophyll; they are the site of photosynthesis, converting light energy, water, and carbon dioxide into glucose and oxygen." },
      { part: "Chromoplasts", text: "Chromoplasts contain pigments other than chlorophyll (yellow, orange, or red carotenoid pigments), giving colour to flowers and ripe fruits, which helps attract pollinators and seed-dispersing animals." },
      { part: "Leucoplasts", text: "Leucoplasts are colourless plastids typically found in underground parts like roots and tubers, or in seeds; they mainly function as storage sites for starch, oils, and proteins." },
      { part: "Interconversion", text: "Plastids can, in some cases, convert from one type to another -- for example, leucoplasts turning green (into chloroplasts) when a potato tuber is exposed to sunlight, illustrating their shared origin and flexibility." }
    ]
  },
  {
    id: 6,
    question: "Describe the structure, discovery, and functions of the Golgi apparatus.",
    markingScheme: ["Discovery (0.5 marks)", "Structure -- cisternae, vesicles, vacuoles (1.5 marks)", "Modification and packaging function (1.5 marks)", "Formation of lysosomes and secretion (1.5 marks)"],
    answerParts: [
      { part: "Discovery", text: "The Golgi apparatus was first observed and described by the Italian scientist Camillo Golgi, after whom it is named." },
      { part: "Structure", text: "It is composed of a system of membrane-bound, flattened sac-like structures called cisternae, stacked roughly parallel to each other, along with associated vesicles and vacuoles at their edges, usually located close to the nucleus." },
      { part: "Modification and Packaging", text: "Material produced in the endoplasmic reticulum, such as newly made proteins, is transported to the Golgi apparatus in vesicles, where it is chemically modified before being packaged for transport." },
      { part: "Transport and Secretion", text: "The Golgi apparatus then dispatches these packaged materials to their appropriate destinations -- either to other locations within the cell, to the plasma membrane, or out of the cell via secretion (exocytosis)." },
      { part: "Formation of Lysosomes", text: "One of its important roles is packaging digestive enzymes (synthesised on the RER) into membrane-bound sacs to form lysosomes." }
    ]
  },
  {
    id: 7,
    question: "Explain lysosomes in detail -- their structure, formation, functions, and why they are called 'suicide bags'.",
    markingScheme: ["Structure of lysosomes (1 mark)", "Formation by Golgi apparatus (1 mark)", "Normal digestive functions (1.5 marks)", "'Suicide bags' explanation (1.5 marks)"],
    answerParts: [
      { part: "Structure", text: "Lysosomes are small, spherical, membrane-bound sacs found in the cytoplasm, filled with a variety of powerful digestive (hydrolytic) enzymes." },
      { part: "Formation", text: "They are formed by the Golgi apparatus, which packages digestive enzymes -- synthesised earlier by the rough endoplasmic reticulum -- into these membrane-bound sacs." },
      { part: "Normal Function", text: "Under normal conditions, lysosomes break down foreign material and microorganisms that enter the cell, and they also digest and recycle worn-out or damaged cell organelles, keeping the cell clean and functional." },
      { part: "'Suicide Bags' Explanation", text: "If a cell becomes severely damaged or disorganised, the lysosomal membrane can rupture, releasing its digestive enzymes directly into the cytoplasm." },
      { part: "Result", text: "These released enzymes then digest the cell's own components, causing the cell to self-destruct -- this is why lysosomes are nicknamed the 'suicide bags' of the cell." }
    ]
  },
  {
    id: 8,
    question: "Compare and contrast plant cells and animal cells, listing at least five differences.",
    markingScheme: ["Cell wall difference (1 mark)", "Plastids difference (1 mark)", "Vacuole difference (1 mark)", "Shape difference (1 mark)", "Any additional valid difference with explanation (1 mark)"],
    answerParts: [
      { part: "Cell Wall", text: "Plant cells have a rigid cellulose cell wall outside the plasma membrane, giving them a fixed shape; animal cells lack a cell wall entirely, having only the flexible plasma membrane." },
      { part: "Plastids", text: "Plant cells contain plastids, including chlorophyll-bearing chloroplasts for photosynthesis; animal cells do not possess plastids at all." },
      { part: "Vacuoles", text: "Plant cells typically have one large, permanent central vacuole occupying most of the cell's volume; animal cells have small, numerous, and temporary vacuoles, if present." },
      { part: "Shape", text: "Due to the rigid cell wall, plant cells usually have a fixed, often rectangular shape; animal cells, bounded only by the flexible membrane, tend to have irregular or rounded shapes." },
      { part: "Centrioles / Storage", text: "Animal cells commonly contain centrioles that assist in cell division, which are typically absent in plant cells; conversely, plant cells store food mainly as starch, while animal cells store it as glycogen." }
    ]
  },
  {
    id: 9,
    question: "Compare and contrast prokaryotic and eukaryotic cells in detail.",
    markingScheme: ["Nuclear organisation (1.5 marks)", "Membrane-bound organelles (1.5 marks)", "Size and complexity (1 mark)", "Examples (1 mark)"],
    answerParts: [
      { part: "Nuclear Organisation", text: "Prokaryotic cells lack a well-defined, membrane-bound nucleus; their genetic material lies loosely in a region called the nucleoid. Eukaryotic cells have a true nucleus enclosed by a double nuclear membrane." },
      { part: "Membrane-Bound Organelles", text: "Prokaryotic cells lack membrane-bound organelles such as mitochondria, endoplasmic reticulum, and Golgi apparatus. Eukaryotic cells possess all of these well-developed, membrane-bound organelles." },
      { part: "Size and Complexity", text: "Prokaryotic cells are generally much smaller (about 1-10 micrometres) and structurally simpler than eukaryotic cells (about 10-100 micrometres), which have more complex internal organisation." },
      { part: "Cell Wall", text: "Most prokaryotes have a cell wall made of a substance different from cellulose (like peptidoglycan in bacteria), whereas eukaryotic plant cells have a cellulose cell wall, and eukaryotic animal cells lack a cell wall altogether." },
      { part: "Examples", text: "Bacteria and blue-green algae (cyanobacteria) are examples of prokaryotic organisms; plants, animals, fungi, and protists (like Amoeba) are examples of eukaryotic organisms." }
    ]
  },
  {
    id: 10,
    question: "Explain osmosis in detail, describing the three possible states (isotonic, hypotonic, hypertonic) with real-life examples.",
    markingScheme: ["Definition of osmosis (1 mark)", "Isotonic condition (1 mark)", "Hypotonic condition and example (1.5 marks)", "Hypertonic condition and example (1.5 marks)"],
    answerParts: [
      { part: "Definition", text: "Osmosis is the net movement of water molecules from a region of higher water concentration to a region of lower water concentration through a selectively permeable membrane." },
      { part: "Isotonic Solution", text: "When the external solution has the same water/solute concentration as the cell (isotonic), the rate of water entering and leaving the cell is equal, so there is no net change in cell size." },
      { part: "Hypotonic Solution", text: "When the external solution has more water than the cell (hypotonic), water moves into the cell by endosmosis, causing it to swell -- for example, dried raisins swell up when soaked in plain water." },
      { part: "Hypertonic Solution", text: "When the external solution has less water than the cell (hypertonic), water moves out of the cell by exosmosis, causing it to shrink -- for example, a plant cell placed in a concentrated salt or sugar solution undergoes plasmolysis." },
      { part: "Real-Life Relevance", text: "This is why pickles are preserved in concentrated salt/sugar solutions (drawing water out of any bacteria present, killing them), and why intravenous fluids given to patients must be isotonic to blood cells to avoid damaging them." }
    ]
  },
  {
    id: 11,
    question: "Explain diffusion in detail, with biological examples of its role in gas exchange and transport.",
    markingScheme: ["Definition of diffusion (1 mark)", "Factors affecting diffusion rate (1 mark)", "Example in respiration/gas exchange (1.5 marks)", "Example in plants/other processes (1.5 marks)"],
    answerParts: [
      { part: "Definition", text: "Diffusion is the net movement of particles of a substance from a region of higher concentration to a region of lower concentration, occurring spontaneously without the input of external energy." },
      { part: "Factors Affecting Rate", text: "The rate of diffusion depends on the concentration gradient (steeper gradient = faster diffusion), the distance over which it must occur (shorter = faster), and the available surface area (larger = faster)." },
      { part: "Gas Exchange Example", text: "In the human lungs, oxygen diffuses from the air in the alveoli (higher concentration) into the blood (lower concentration), while carbon dioxide diffuses from the blood into the alveoli to be exhaled." },
      { part: "Plant Example", text: "In leaves, carbon dioxide diffuses into the leaf from the air through stomata during the day (when photosynthesis lowers internal CO2 levels), while oxygen produced by photosynthesis diffuses out." },
      { part: "Limitation", text: "Because diffusion works efficiently only over short distances, large multicellular organisms cannot rely on it alone and require specialised transport systems (like the circulatory system) to move substances over longer distances." }
    ]
  },
  {
    id: 12,
    question: "Describe the process and significance of cell division for growth, repair, and reproduction.",
    markingScheme: ["Meaning of cell division (1 mark)", "Role in growth (1 mark)", "Role in repair (1.5 marks)", "Role in reproduction (1.5 marks)"],
    answerParts: [
      { part: "Meaning", text: "Cell division is the process by which a single parent cell divides to produce two or more daughter cells, allowing organisms to increase their cell number." },
      { part: "Role in Growth", text: "Multicellular organisms grow larger primarily through repeated cell division, which increases the total number of cells in developing tissues and organs." },
      { part: "Role in Repair", text: "When tissues are damaged, such as in a wound, cell division allows the body to replace dead or damaged cells with new ones, healing the injury over time." },
      { part: "Role in Reproduction", text: "In unicellular organisms, cell division itself is a method of reproduction (e.g. binary fission in Amoeba), producing new individual organisms. In multicellular organisms, specialised reproductive cells are also produced through cell division." },
      { part: "Overall Significance", text: "Without cell division, an organism could neither develop from a single fertilised cell into a complex body, nor replace worn-out cells, nor reproduce -- making it fundamental to the continuity of life." }
    ]
  },
  {
    id: 13,
    question: "Trace the history of the discovery of the cell, describing the contributions of the major scientists involved.",
    markingScheme: ["Robert Hooke (1 mark)", "Anton van Leeuwenhoek (1 mark)", "Robert Brown (1 mark)", "Schleiden and Schwann (1 mark)", "Rudolf Virchow (1 mark)"],
    answerParts: [
      { part: "Robert Hooke (1665)", text: "Robert Hooke examined a thin slice of cork under a self-built microscope and observed small, box-like compartments, which he named 'cells' -- marking the first discovery and naming of the cell." },
      { part: "Anton van Leeuwenhoek (1674)", text: "Using an improved, self-designed microscope, Leeuwenhoek was the first person to observe and describe living, free cells, such as those in pond water." },
      { part: "Robert Brown (1831)", text: "Robert Brown discovered and described the nucleus while studying orchid cells, adding an important internal structure to the understanding of the cell." },
      { part: "Schleiden and Schwann (1838-39)", text: "Botanist Matthias Schleiden concluded that all plants are made of cells, and zoologist Theodor Schwann extended this to animals, together proposing the foundation of the cell theory." },
      { part: "Rudolf Virchow (1855)", text: "Rudolf Virchow completed the cell theory by explaining that all new cells arise only from the division of pre-existing cells, rejecting the earlier idea of spontaneous generation of cells." }
    ]
  },
  {
    id: 14,
    question: "Explain the structure and function of the cell wall in plant cells, and compare it with animal cells that lack one.",
    markingScheme: ["Structure and composition (1.5 marks)", "Functions of the cell wall (1.5 marks)", "Consequence of absence in animal cells (2 marks)"],
    answerParts: [
      { part: "Structure and Composition", text: "The cell wall is a rigid, non-living, fully permeable layer that lies outside the plasma membrane in plant cells, composed mainly of the complex carbohydrate cellulose." },
      { part: "Shape and Protection", text: "It gives the plant cell a fixed, definite shape and provides strong mechanical protection against physical damage and pathogen entry." },
      { part: "Preventing Bursting", text: "When a plant cell absorbs excess water by endosmosis in a hypotonic solution, the rigid cell wall resists the resulting pressure, preventing the cell from bursting, and instead the cell simply becomes turgid." },
      { part: "Absence in Animal Cells", text: "Animal cells lack a cell wall entirely; their only boundary is the flexible plasma membrane, which allows them to change shape (useful for movement and endocytosis) but cannot resist large internal pressure." },
      { part: "Consequence", text: "As a result, an animal cell placed in a strongly hypotonic solution (like distilled water) can swell uncontrollably and burst (lyse), since it has no rigid wall to hold its shape and resist pressure." }
    ]
  },
  {
    id: 15,
    question: "Describe vacuoles in detail -- their structure, contents, and significance in plant cells versus protist cells like Amoeba.",
    markingScheme: ["General structure of vacuoles (1 mark)", "Plant cell vacuoles and cell sap (1.5 marks)", "Contractile vacuole in Amoeba (1.5 marks)", "Food vacuole in Amoeba (1 mark)"],
    answerParts: [
      { part: "General Structure", text: "A vacuole is a fluid-filled sac bound by a single membrane (called the tonoplast in plant cells), found within the cytoplasm, used for storing various substances." },
      { part: "Plant Cell Vacuoles", text: "Mature plant cells usually have one large, permanent central vacuole filled with cell sap (a solution of salts, sugars, and pigments), which can occupy up to 90% of the cell's volume and generates turgor pressure against the cell wall." },
      { part: "Contractile Vacuole", text: "In Amoeba, a specialised contractile vacuole actively collects and expels excess water from the cell, helping to maintain a stable internal water balance (osmoregulation) since the organism lives in a watery environment." },
      { part: "Food Vacuole", text: "Amoeba also forms temporary food vacuoles around particles engulfed through endocytosis, within which digestive enzymes break down the food for absorption by the cell." },
      { part: "Comparative Significance", text: "While plant vacuoles are large, permanent, and primarily storage/support structures, Amoeba's vacuoles are small, temporary, and specialised for either water regulation or digestion -- reflecting the very different lifestyles of a fixed plant cell versus a free-living, feeding protist." }
    ]
  },
  {
    id: 16,
    question: "Explain endocytosis and exocytosis in detail, with examples from Amoeba and white blood cells.",
    markingScheme: ["Definition of endocytosis (1 mark)", "Example -- Amoeba feeding (1.5 marks)", "Definition of exocytosis (1 mark)", "Example -- white blood cells / secretion (1.5 marks)"],
    answerParts: [
      { part: "Endocytosis Defined", text: "Endocytosis is the process by which a cell takes in large solid or liquid material from its surroundings by folding its flexible plasma membrane around it, forming an internal vacuole." },
      { part: "Amoeba Example", text: "When Amoeba encounters food, it extends pseudopodia (temporary finger-like projections of its membrane) that surround and engulf the food particle, enclosing it within a food vacuole for digestion -- a clear example of endocytosis (phagocytosis)." },
      { part: "White Blood Cell Example", text: "Similarly, white blood cells in the human body use endocytosis to engulf invading bacteria or foreign particles, which are then destroyed by fusing the resulting vacuole with a lysosome -- an important immune defence mechanism." },
      { part: "Exocytosis Defined", text: "Exocytosis is essentially the reverse process, where materials produced or processed within the cell are packaged into membrane-bound vesicles and released outside the cell by fusing with the plasma membrane." },
      { part: "Exocytosis Example", text: "For example, gland cells in the pancreas package digestive enzymes into vesicles at the Golgi apparatus and release them out of the cell via exocytosis, to be used in the digestive tract." }
    ]
  },
  {
    id: 17,
    question: "Describe ribosomes in detail -- their structure, location, and role in protein synthesis.",
    markingScheme: ["Structure and composition (1.5 marks)", "Location in the cell (1.5 marks)", "Role in protein synthesis (2 marks)"],
    answerParts: [
      { part: "Structure and Composition", text: "Ribosomes are extremely small, granular structures composed of RNA and protein. Unlike most other organelles, they are not bound by any membrane." },
      { part: "Location", text: "Ribosomes are found in two main locations within a cell: freely scattered throughout the cytoplasm, or attached to the outer surface of the rough endoplasmic reticulum (giving RER its 'rough' appearance)." },
      { part: "Role in Protein Synthesis", text: "Ribosomes are the actual site where protein synthesis takes place -- they read the coded genetic instructions carried by messenger RNA (which originates from the nucleus) and assemble amino acids in the correct sequence to build specific proteins." },
      { part: "Free vs. Attached Ribosomes", text: "Proteins made by free ribosomes are typically used within the cytoplasm itself, while proteins made by ribosomes attached to the RER are often destined for secretion, the cell membrane, or packaging into other organelles like lysosomes." },
      { part: "Overall Importance", text: "Since proteins carry out most of a cell's structural and functional roles (as enzymes, structural components, and signalling molecules), ribosomes are essential to virtually every aspect of the cell's life." }
    ]
  },
  {
    id: 18,
    question: "Explain the concept of the cell as the basic structural and functional unit of life, citing the postulates of cell theory and supporting evidence.",
    markingScheme: ["Meaning of 'structural unit' (1 mark)", "Meaning of 'functional unit' (1 mark)", "Cell theory postulates (1.5 marks)", "Supporting evidence (1.5 marks)"],
    answerParts: [
      { part: "Structural Unit", text: "Every living organism, whether unicellular or multicellular, is physically built from one or more cells; the cell is the smallest organised unit displaying the basic architecture (membrane, cytoplasm, genetic material) of living matter." },
      { part: "Functional Unit", text: "Every essential life process -- nutrition, respiration, excretion, growth, and reproduction -- is carried out by, or within, cells; no smaller independent unit can perform all of these functions on its own." },
      { part: "Cell Theory Postulates", text: "The cell theory states that all organisms are made of cells, the cell is the basic unit of structure and function, and new cells arise only from the division of pre-existing cells." },
      { part: "Supporting Evidence", text: "This is supported by the fact that unicellular organisms like Amoeba independently perform every life process within a single cell, and multicellular organisms are simply built from many specialised cells working together." },
      { part: "Conclusion", text: "Because the cell both builds the body of an organism and independently sustains its life processes, it is rightly called the fundamental structural and functional unit of life." }
    ]
  },
  {
    id: 19,
    question: "Discuss how unicellular organisms perform all life processes within a single cell, using Amoeba as an example.",
    markingScheme: ["Nutrition (1 mark)", "Respiration and excretion (1.5 marks)", "Movement (1 mark)", "Reproduction (1.5 marks)"],
    answerParts: [
      { part: "Nutrition", text: "Amoeba obtains food through endocytosis -- it extends pseudopodia to engulf food particles into a food vacuole, where digestive enzymes break the food down for absorption into the cytoplasm." },
      { part: "Respiration", text: "Gaseous exchange (taking in oxygen and releasing carbon dioxide) occurs by simple diffusion directly across the plasma membrane, since Amoeba is small enough for diffusion to be efficient." },
      { part: "Excretion", text: "Excess water and some waste products are removed from the cell by the contractile vacuole, which collects and periodically expels fluid to maintain internal balance." },
      { part: "Movement", text: "Amoeba moves from place to place using its pseudopodia, which extend and retract to pull the cell along a surface -- a movement called amoeboid movement." },
      { part: "Reproduction", text: "Amoeba reproduces asexually through binary fission, where the single cell divides into two genetically identical daughter cells, each capable of independently living and repeating the entire cycle." }
    ]
  },
  {
    id: 20,
    question: "Explain the relationship between chromatin, chromosomes, genes, and DNA, and their role in heredity.",
    markingScheme: ["DNA as the genetic molecule (1 mark)", "Chromatin structure (1 mark)", "Chromosomes during division (1.5 marks)", "Genes and heredity (1.5 marks)"],
    answerParts: [
      { part: "DNA", text: "Deoxyribonucleic acid (DNA) is the molecule that carries the coded genetic information of an organism, stored within the nucleus of a eukaryotic cell." },
      { part: "Chromatin", text: "In a non-dividing cell, DNA exists loosely coiled together with protein, forming a thread-like network called chromatin, spread throughout the nucleus." },
      { part: "Chromosomes", text: "Just before and during cell division, the chromatin condenses and coils tightly into distinct, visible, rod-shaped structures called chromosomes, ensuring the genetic material can be accurately and equally distributed to daughter cells." },
      { part: "Genes", text: "A gene is a specific functional segment of a DNA molecule located on a chromosome; each gene carries the coded instructions for a particular hereditary trait or the synthesis of a particular protein." },
      { part: "Role in Heredity", text: "Because chromosomes (and the genes on them) are copied and passed on during cell division and reproduction, they are responsible for transmitting hereditary characteristics from parent cells/organisms to offspring." }
    ]
  },
];

// ── QUESTION BANK: COMPETENCY-BASED / CASE STUDY (4 MARKS) ──
export const BIOLOGY9_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "Reeta's Raisin Experiment",
    caseDescription: "Reeta takes a few dried raisins and places them in a bowl of plain water. After a few hours, she observes that the raisins have become swollen and plump. She then takes another set of raisins and places them in a strong sugar solution, but this time they show no such swelling.",
    subQuestions: [
      { question: "Which process caused the raisins to swell up in plain water?", options: ["Exosmosis", "Endosmosis", "Diffusion of sugar", "Plasmolysis"], correctIndex: 1, answer: "Endosmosis", explanation: "Plain water is hypotonic relative to the concentrated sugar/water content inside the raisin, so water moves into the raisin's cells by endosmosis, causing swelling." },
      { question: "Why did the raisins in the strong sugar solution NOT swell up?", answer: "Because the strong sugar solution was hypertonic (or close to isotonic/hypertonic) relative to the raisin's contents, so little or no net water entered the raisin by osmosis, and swelling did not occur.", explanation: "Since there was little or no water concentration gradient favouring entry into the raisin, endosmosis did not occur significantly." },
      { question: "What would you expect if the swollen raisins from plain water were now placed into the strong sugar solution?", answer: "The raisins would shrink again as water moves out of them by exosmosis, since the surrounding sugar solution now has a lower water concentration than the raisin's cells.", explanation: "This demonstrates exosmosis -- water leaving the cells when placed in a hypertonic solution." }
    ]
  },
  {
    id: 2,
    caseTitle: "Saline Drip for a Patient",
    caseDescription: "A doctor is preparing an intravenous (IV) saline solution to be given to a patient. The nurse explains that the salt concentration of the solution must be very carefully matched to that of the patient's blood plasma before it can be administered.",
    subQuestions: [
      { question: "What term describes a solution whose water/solute concentration exactly matches that of blood cells?", options: ["Hypotonic solution", "Hypertonic solution", "Isotonic solution", "Saturated solution"], correctIndex: 2, answer: "Isotonic solution", explanation: "An isotonic solution has the same concentration as the cell's contents, causing no net movement of water into or out of blood cells." },
      { question: "What would happen to red blood cells if a strongly hypotonic (very dilute) solution were injected instead?", answer: "Water would rush into the red blood cells by endosmosis, causing them to swell and potentially burst (haemolysis), since RBCs have no rigid cell wall to resist the pressure.", explanation: "Lacking a cell wall, animal cells like RBCs can lyse (burst) when placed in a strongly hypotonic environment." },
      { question: "What would happen to red blood cells if a strongly hypertonic (very concentrated) solution were injected instead?", answer: "Water would move out of the red blood cells by exosmosis, causing them to shrink and become shrivelled, disrupting their normal function.", explanation: "A hypertonic external solution draws water out of cells, causing them to shrink." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Wilting and Recovering Plant",
    caseDescription: "Aryan forgets to water his potted plant for several days, and its leaves droop and wilt. He waters it thoroughly the next morning, and by evening, the leaves have become firm and upright again.",
    subQuestions: [
      { question: "What caused the plant's leaves to wilt in the first place?", answer: "Lack of water caused the plant cells' vacuoles to lose water, reducing turgor pressure against the cell wall, making the cells (and hence the leaves) flaccid and droopy.", explanation: "Wilting occurs when cells lose turgidity due to insufficient water." },
      { question: "Which physical process is mainly responsible for the plant recovering its firmness after watering?", options: ["Diffusion of minerals", "Endosmosis (osmosis of water into the vacuole)", "Exosmosis", "Plasmolysis"], correctIndex: 1, answer: "Endosmosis (osmosis of water into the vacuole)", explanation: "Water entering the root cells and then the vacuoles by endosmosis restores turgor pressure, making the plant firm again." },
      { question: "Name the pressure that keeps a well-watered plant's cells firm and upright.", answer: "Turgor pressure -- the outward pressure exerted by the swollen vacuole against the rigid cell wall.", explanation: "Turgor pressure is what physically keeps plant tissue rigid and upright." }
    ]
  },
  {
    id: 4,
    caseTitle: "Examining Onion Peel Cells",
    caseDescription: "In a school laboratory, students place a thin peel of onion epidermis on a glass slide, add a drop of iodine solution, and observe it under a microscope. They notice rectangular, brick-like cells, each with a clearly visible dark-stained round structure inside.",
    subQuestions: [
      { question: "What is the purpose of adding iodine solution to the onion peel?", answer: "Iodine acts as a stain that highlights and darkens certain cell structures (especially the nucleus), making them easier to see clearly under the microscope.", explanation: "Staining increases the contrast of otherwise near-transparent cell structures." },
      { question: "What is the dark, round structure visible inside each cell most likely to be?", options: ["Mitochondria", "Nucleus", "Chloroplast", "Vacuole"], correctIndex: 1, answer: "Nucleus", explanation: "The nucleus, being dense and DNA/protein-rich, stains strongly with iodine and is usually the most prominent visible structure." },
      { question: "Why do the onion peel cells appear rectangular and brick-like, unlike many animal cells?", answer: "Because plant cells like these have a rigid cellulose cell wall outside the plasma membrane, which gives them a fixed, regular, brick-like shape.", explanation: "The presence of a rigid cell wall accounts for the fixed geometric shape typical of plant cells." }
    ]
  },
  {
    id: 5,
    caseTitle: "Comparing Muscle Cells and Fat Cells",
    caseDescription: "A biologist examines two types of human cells under an electron microscope: a muscle cell, which is packed with a very large number of a certain organelle, and a fat-storage cell, which has comparatively very few of that same organelle.",
    subQuestions: [
      { question: "Which organelle is most likely present in far greater numbers in the muscle cell?", options: ["Ribosomes", "Mitochondria", "Lysosomes", "Golgi apparatus"], correctIndex: 1, answer: "Mitochondria", explanation: "Muscle cells require large amounts of ATP for repeated contraction, so they contain many more mitochondria than cells with lower energy demands, like fat-storage cells." },
      { question: "What is the main function of this organelle in the muscle cell?", answer: "It carries out cellular respiration, breaking down food (glucose) in the presence of oxygen to release energy stored as ATP, which powers muscle contraction.", explanation: "Mitochondria supply the ATP energy that muscle fibres need to contract repeatedly." },
      { question: "Why does a fat-storage cell need comparatively fewer of this organelle?", answer: "A fat-storage cell's main role is to store energy (as fat) rather than actively use large amounts of energy for movement, so its energy (ATP) demand -- and hence its mitochondria count -- is much lower.", explanation: "Organelle abundance often reflects a cell's specific functional demands." }
    ]
  },
  {
    id: 6,
    caseTitle: "A Bacterium Under the Microscope",
    caseDescription: "A microbiologist observes a bacterial cell under a high-powered microscope. She notes that, unlike a human cheek cell observed earlier, this cell has no distinct nucleus bounded by a membrane, and no visible membrane-bound organelles like mitochondria.",
    subQuestions: [
      { question: "Based on these observations, how would this bacterial cell be classified?", options: ["Eukaryotic cell", "Prokaryotic cell", "Multicellular cell", "Plant cell"], correctIndex: 1, answer: "Prokaryotic cell", explanation: "The absence of a membrane-bound nucleus and membrane-bound organelles is the defining feature of a prokaryotic cell." },
      { question: "Where is the bacterium's genetic material located, since it lacks a true nucleus?", answer: "In an undefined, non-membrane-bound region of the cytoplasm called the nucleoid.", explanation: "Prokaryotic genetic material is concentrated in the nucleoid region rather than being enclosed by a nuclear membrane." },
      { question: "How does the human cheek cell observed earlier differ from this bacterium in terms of cell organisation?", answer: "The human cheek cell is eukaryotic -- it has a true, membrane-bound nucleus and possesses membrane-bound organelles such as mitochondria and endoplasmic reticulum, which the bacterium lacks.", explanation: "This highlights the fundamental prokaryote-eukaryote distinction in cellular organisation." }
    ]
  },
  {
    id: 7,
    caseTitle: "The Detoxifying Liver Cell",
    caseDescription: "A pharmacology student studies liver cells and learns that they play a major role in breaking down and detoxifying drugs and alcohol consumed by the body. Under the microscope, these cells show an extensive network of smooth, tubular membranes.",
    subQuestions: [
      { question: "Which organelle is primarily responsible for this detoxifying network seen in liver cells?", options: ["Rough endoplasmic reticulum", "Smooth endoplasmic reticulum", "Golgi apparatus", "Lysosome"], correctIndex: 1, answer: "Smooth endoplasmic reticulum", explanation: "Smooth ER (SER) plays a major role in detoxifying drugs and poisons, which is why it is abundant in liver cells." },
      { question: "How does the smooth ER's structure differ from the rough ER's structure?", answer: "Smooth ER lacks ribosomes on its surface (giving it a smooth appearance), while rough ER has ribosomes attached to its surface (giving it a rough, granular appearance).", explanation: "The presence or absence of surface ribosomes distinguishes the two types of ER." },
      { question: "Besides detoxification, what other major function does smooth ER perform in cells?", answer: "It is the main site of lipid (fat) synthesis within the cell.", explanation: "SER's primary general role across cell types is the synthesis of lipids." }
    ]
  },
  {
    id: 8,
    caseTitle: "The Enzyme-Secreting Pancreatic Cell",
    caseDescription: "A pancreatic cell is studied for its role in producing and secreting digestive enzymes that travel to the small intestine. Researchers trace the enzyme's journey: it is first made by ribosomes on a membrane network, then sent to another organelle for packaging, and finally released from the cell.",
    subQuestions: [
      { question: "On which organelle are the ribosomes making this enzyme most likely located?", options: ["Smooth endoplasmic reticulum", "Rough endoplasmic reticulum", "Golgi apparatus", "Mitochondria"], correctIndex: 1, answer: "Rough endoplasmic reticulum", explanation: "Since the enzyme is a protein made by ribosomes on a membrane network, this network must be the rough endoplasmic reticulum (RER), which has ribosomes attached to it." },
      { question: "Which organelle packages the enzyme after it leaves the RER?", answer: "The Golgi apparatus, which modifies and packages the protein into a vesicle for transport out of the cell.", explanation: "The Golgi apparatus is the cell's packaging and dispatch centre for materials received from the ER." },
      { question: "What is the name of the process by which the packaged enzyme is finally released out of the cell?", answer: "Exocytosis -- the vesicle containing the enzyme fuses with the plasma membrane and releases its contents outside the cell.", explanation: "Exocytosis is the reverse of endocytosis, used to export materials from the cell." }
    ]
  },
  {
    id: 9,
    caseTitle: "White Blood Cells Fighting Infection",
    caseDescription: "When bacteria enter a cut on the skin, white blood cells rush to the site of infection. Under a microscope, one white blood cell is seen engulfing a bacterium, forming an internal sac around it, which soon shrinks in size as the bacterium is broken down.",
    subQuestions: [
      { question: "What is the process by which the white blood cell engulfs the bacterium called?", options: ["Exocytosis", "Osmosis", "Endocytosis", "Diffusion"], correctIndex: 2, answer: "Endocytosis", explanation: "Endocytosis is the process by which a cell engulfs external material (like a bacterium) by folding its plasma membrane around it." },
      { question: "Which organelle fuses with the internal sac to digest and destroy the bacterium?", answer: "A lysosome, whose digestive enzymes break down the engulfed bacterium.", explanation: "Lysosomes fuse with vacuoles containing engulfed material and digest it using their hydrolytic enzymes." },
      { question: "Name another organism, discussed in this chapter, that uses a similar engulfing method to obtain its food.", answer: "Amoeba, which uses pseudopodia to engulf food particles by endocytosis (phagocytosis), just as the white blood cell engulfs the bacterium.", explanation: "Both cells use the same fundamental engulfing mechanism, just for different purposes -- nutrition versus immune defence." }
    ]
  },
  {
    id: 10,
    caseTitle: "The Wilting Cabbage Leaf in Salt Water",
    caseDescription: "A student places a fresh cabbage leaf into a bowl of concentrated salt water and observes it under a microscope after 30 minutes. The plant cells appear shrunken, and their cell membranes have visibly pulled away from the surrounding cell wall.",
    subQuestions: [
      { question: "What is this shrinking phenomenon, where the cell membrane pulls away from the cell wall, called?", options: ["Turgidity", "Plasmolysis", "Endosmosis", "Phagocytosis"], correctIndex: 1, answer: "Plasmolysis", explanation: "Plasmolysis is the shrinking of the cell membrane away from the cell wall due to loss of water in a hypertonic solution." },
      { question: "Which type of solution (hypotonic, hypertonic, or isotonic) is the concentrated salt water relative to the cabbage cells?", answer: "Hypertonic -- it has a lower water concentration (more dissolved salt) than the cabbage cell's contents.", explanation: "A hypertonic external solution draws water out of the cell by exosmosis." },
      { question: "If the same cabbage leaf were now transferred into plain water, what would you expect to happen?", answer: "The cells would absorb water by endosmosis and regain their normal turgid shape, as the plain water is now hypotonic relative to the cell's contents.", explanation: "This demonstrates the reversibility of plasmolysis when the external water concentration is increased." }
    ]
  },
  {
    id: 11,
    caseTitle: "A Diagram-Based Comparison Task",
    caseDescription: "In an exam, students are shown two unlabeled cell diagrams: Cell A has a rigid rectangular boundary, a large fluid-filled sac occupying most of its interior, and small green oval bodies scattered inside. Cell B has an irregular, rounded boundary, several small fluid sacs, and no green oval bodies.",
    subQuestions: [
      { question: "Which type of cell -- plant or animal -- is Cell A most likely to be?", options: ["Animal cell", "Plant cell", "Bacterial cell", "Cannot be determined"], correctIndex: 1, answer: "Plant cell", explanation: "The rigid rectangular shape (cell wall), large central vacuole, and green plastids (chloroplasts) are all hallmark features of a plant cell." },
      { question: "Which type of cell is Cell B most likely to be, and why?", answer: "Cell B is most likely an animal cell, because it has an irregular rounded shape (no rigid cell wall), small vacuoles, and lacks chloroplasts, all typical of animal cells.", explanation: "The absence of a cell wall and chloroplasts, combined with an irregular shape, points to an animal cell." },
      { question: "What are the green oval bodies seen only in Cell A, and what is their function?", answer: "They are chloroplasts, plastids containing chlorophyll that carry out photosynthesis, converting light energy into chemical energy (glucose).", explanation: "Chloroplasts are unique to plant cells (and some protists) and are the site of photosynthesis." }
    ]
  },
  {
    id: 12,
    caseTitle: "Healing a Cut on the Skin",
    caseDescription: "A student accidentally cuts their finger while cooking. Over the next several days, they observe the wound gradually closing up and new skin forming over the injured area, until it eventually heals completely.",
    subQuestions: [
      { question: "Which fundamental biological process at the cellular level is mainly responsible for healing this wound?", options: ["Osmosis", "Diffusion", "Cell division", "Plasmolysis"], correctIndex: 2, answer: "Cell division", explanation: "Repeated cell division near the wound produces new cells that replace the damaged tissue and close the wound." },
      { question: "Besides repair, name one other important role cell division plays in the human body.", answer: "Cell division is also essential for growth, allowing the body to increase in size and develop from a single fertilised cell into a complex, multicellular organism.", explanation: "Growth and repair both depend fundamentally on the ability of cells to divide." },
      { question: "Are the new skin cells produced during healing genetically identical to the original skin cells?", answer: "Yes, in normal (mitotic) cell division, the genetic material is copied and equally distributed, so the new daughter cells are genetically identical to the parent cells.", explanation: "Mitotic division ensures genetic continuity between parent and daughter cells during tissue repair." }
    ]
  },
  {
    id: 13,
    caseTitle: "The Root Hair Cell Absorbing Water",
    caseDescription: "A student studies a root hair cell of a plant growing in moist soil. The soil water surrounding the root hair has a much higher water concentration than the cell sap inside the root hair's vacuole.",
    subQuestions: [
      { question: "By which process will water move from the soil into the root hair cell?", options: ["Exosmosis", "Endosmosis", "Active transport only", "Phagocytosis"], correctIndex: 1, answer: "Endosmosis", explanation: "Since the soil water has a higher water concentration than the cell sap, water moves into the root hair cell by endosmosis." },
      { question: "Which cell structure directly controls which substances can pass through, along with the water, into the root hair cell?", answer: "The plasma membrane, which is selectively permeable and regulates the entry of water and dissolved substances into the cell.", explanation: "The selectively permeable plasma membrane governs which substances can accompany or follow the osmotic movement of water." },
      { question: "Once inside the root hair cell, in which structure does most of the absorbed water get stored?", answer: "The large central vacuole, which stores the absorbed water as part of the cell sap and helps generate turgor pressure.", explanation: "The vacuole is the main water-storage compartment of a mature plant cell." }
    ]
  },
  {
    id: 14,
    caseTitle: "Comparing an Egg Cell and a Nerve Cell",
    caseDescription: "A biology class is shown two extreme examples of human cells: an egg (ovum) cell, which is one of the largest cells in the body, and a nerve cell (neuron), which can be one of the longest cells, sometimes stretching over a metre in the body.",
    subQuestions: [
      { question: "What general principle about cells does this comparison best illustrate?", options: ["All cells are the same size and shape", "Cell shape and size are related to their specific function", "Only plant cells vary in size", "Cell size depends only on the organism's total body size"], correctIndex: 1, answer: "Cell shape and size are related to their specific function", explanation: "Cells are adapted in shape and size to best perform their specific role -- a large egg cell stores nutrients for early development, while a long nerve cell transmits signals over distance." },
      { question: "Why might it be advantageous for an egg cell to be relatively large?", answer: "A large size allows the egg cell to store sufficient nutrients and cellular machinery needed to support the very early stages of development after fertilisation.", explanation: "Egg cells are packed with stored resources (like yolk in many animals) to nourish the developing embryo before other nutrient sources are available." },
      { question: "Why might it be advantageous for a nerve cell to be very long?", answer: "Its extreme length allows a nerve cell to transmit electrical signals directly over long distances in the body (e.g. from the spinal cord to a toe) without requiring signal relay through many separate cells.", explanation: "A long, continuous nerve cell allows faster, more direct signal transmission across the body." }
    ]
  },
  {
    id: 15,
    caseTitle: "Muscle Cell Under Exercise Stress",
    caseDescription: "During intense exercise, a muscle cell rapidly consumes its stored energy and requires a continuous, fast supply of ATP to keep contracting. Researchers note that trained athletes' muscle cells often contain a noticeably higher number of a specific organelle compared to untrained individuals.",
    subQuestions: [
      { question: "Which organelle is most likely increased in number in the muscle cells of trained athletes?", options: ["Ribosomes", "Mitochondria", "Golgi apparatus", "Nucleus"], correctIndex: 1, answer: "Mitochondria", explanation: "Since mitochondria produce the ATP needed for muscle contraction, cells with greater endurance demands (like those of trained athletes) often develop more mitochondria." },
      { question: "Explain, in terms of cellular respiration, why more of this organelle helps meet the athlete's energy demands.", answer: "More mitochondria means a greater capacity to carry out cellular respiration simultaneously, allowing the muscle cell to generate ATP faster and sustain contraction for longer periods.", explanation: "Mitochondrial number directly relates to a cell's aerobic ATP-generating capacity." },
      { question: "What essential raw materials does cellular respiration in mitochondria require to produce ATP?", answer: "Cellular respiration requires food molecules (such as glucose, broken down from stored carbohydrates) and oxygen, which are combined to release energy stored as ATP.", explanation: "Aerobic cellular respiration combines glucose and oxygen to produce ATP, carbon dioxide, and water." }
    ]
  },
  {
    id: 16,
    caseTitle: "The Cactus Plant in the Desert",
    caseDescription: "A cactus growing in a hot, dry desert has fleshy, water-storing stems. Under the microscope, its cells are seen to contain unusually large, prominent, fluid-filled sacs occupying most of the cell's interior.",
    subQuestions: [
      { question: "What are these large, fluid-filled sacs inside the cactus cells called?", options: ["Lysosomes", "Vacuoles", "Mitochondria", "Ribosomes"], correctIndex: 1, answer: "Vacuoles", explanation: "The large, prominent, fluid-filled storage sacs seen in plant cells are vacuoles." },
      { question: "Why would having unusually large vacuoles be especially advantageous for a plant living in a dry desert?", answer: "Large vacuoles allow the cactus to store a substantial reserve of water within its cells, helping it survive long periods without rainfall in its dry desert environment.", explanation: "Water storage in enlarged vacuoles is a key adaptation of succulent desert plants like cacti." },
      { question: "Besides water storage, name one other general function of plant cell vacuoles.", answer: "Vacuoles also help maintain turgor pressure against the cell wall, keeping the plant's cells and tissues firm, and can store other substances like sugars, pigments, and waste products.", explanation: "Vacuoles serve multiple roles: storage, turgor maintenance, and sometimes waste containment." }
    ]
  },
  {
    id: 17,
    caseTitle: "A Sudden Physical Injury to a Cell",
    caseDescription: "A researcher applies a harsh chemical to a group of cultured cells in a lab dish. Within minutes, the cells begin to break apart and disintegrate from the inside, well before any external structural damage is visible.",
    subQuestions: [
      { question: "Which organelle's rupture is most directly responsible for this rapid internal self-destruction of the cells?", options: ["Nucleus", "Lysosome", "Ribosome", "Chloroplast"], correctIndex: 1, answer: "Lysosome", explanation: "When a cell is damaged, its lysosomes can rupture and release digestive enzymes into the cytoplasm, causing the cell to digest itself from within." },
      { question: "What is this self-digesting phenomenon commonly called, and why are lysosomes given a related nickname?", answer: "This phenomenon is called autolysis (self-digestion). Because of this ability, lysosomes are nicknamed the 'suicide bags' of the cell.", explanation: "The nickname 'suicide bags' directly reflects lysosomes' potential to cause the cell's self-destruction when damaged." },
      { question: "Under normal, undamaged conditions, what beneficial role do these same enzymes play in the cell?", answer: "Under normal conditions, lysosomal enzymes safely digest foreign material (like engulfed bacteria) and break down and recycle worn-out cell organelles.", explanation: "Lysosomal enzymes are only harmful to the cell itself when accidentally released due to damage; otherwise they perform essential cleanup functions." }
    ]
  },
  {
    id: 18,
    caseTitle: "Studying a Cell Producing Export Proteins",
    caseDescription: "An electron microscope image of a particular cell reveals an unusually extensive, ribosome-studded membrane network filling much of its cytoplasm, along with several nearby stacks of flattened, membrane-bound sacs.",
    subQuestions: [
      { question: "The ribosome-studded membrane network observed is most likely which organelle?", options: ["Smooth endoplasmic reticulum", "Rough endoplasmic reticulum", "Golgi apparatus", "Mitochondria"], correctIndex: 1, answer: "Rough endoplasmic reticulum", explanation: "A membrane network 'studded' with ribosomes is, by definition, rough endoplasmic reticulum (RER)." },
      { question: "What are the nearby stacks of flattened, membrane-bound sacs most likely to be?", answer: "The Golgi apparatus, which is composed of stacked, flattened sac-like structures called cisternae.", explanation: "Stacked flattened sacs near the ER are characteristic of the Golgi apparatus." },
      { question: "Based on these features, what kind of specialised role is this cell most likely suited for?", answer: "This cell is likely specialised for producing and secreting large amounts of protein (such as enzymes or hormones) for export, since it has abundant machinery (RER and Golgi apparatus) for protein synthesis, processing, and packaging.", explanation: "Cells extensively producing and exporting proteins typically show enlarged RER and Golgi apparatus under the microscope." }
    ]
  },
  {
    id: 19,
    caseTitle: "Comparing a Leaf Cell and a Root Cell",
    caseDescription: "A student compares two cells taken from the same plant: one from a green leaf exposed to sunlight, and one from a root growing underground. Both cells have similar basic structures, but one contains numerous small green bodies, while the other does not.",
    subQuestions: [
      { question: "Which cell -- the leaf cell or the root cell -- is more likely to contain the green bodies (chloroplasts)?", options: ["The root cell", "The leaf cell", "Both equally", "Neither"], correctIndex: 1, answer: "The leaf cell", explanation: "Leaf cells, exposed to sunlight and responsible for photosynthesis, are rich in chloroplasts; underground root cells, lacking light, generally are not." },
      { question: "What is the main function of the green bodies found in the leaf cell?", answer: "These are chloroplasts, and their main function is to carry out photosynthesis -- using chlorophyll to convert light energy, water, and carbon dioxide into glucose and oxygen.", explanation: "Chloroplasts are the site of photosynthesis in plant cells." },
      { question: "What type of plastid would you more likely expect to find in the underground root cell instead?", answer: "Leucoplasts, colourless plastids that are typically found in non-photosynthetic parts like roots, mainly used to store starch and other food reserves.", explanation: "Non-green, underground plant parts commonly contain leucoplasts rather than chloroplasts." }
    ]
  },
  {
    id: 20,
    caseTitle: "The Amoeba's Full Life Cycle",
    caseDescription: "A student observes a single amoeba in a drop of pond water under a microscope over the course of a day. They see it move across the slide, engulf a smaller organism, expel a bubble of fluid periodically, and eventually split into two separate amoebae.",
    subQuestions: [
      { question: "What is the process by which the amoeba moves across the slide called?", answer: "Amoeboid movement, achieved by extending and retracting pseudopodia (temporary finger-like extensions of the cell).", explanation: "Amoeboid movement relies on flowing extensions of the flexible plasma membrane and cytoplasm." },
      { question: "What is the process by which the amoeba engulfs the smaller organism, and what does it form inside the cell?", options: ["Exocytosis, forming a contractile vacuole", "Endocytosis, forming a food vacuole", "Osmosis, forming a nucleus", "Diffusion, forming a lysosome"], correctIndex: 1, answer: "Endocytosis, forming a food vacuole", explanation: "The amoeba engulfs food via endocytosis, forming a food vacuole where digestion then occurs." },
      { question: "What is the purpose of the fluid bubble periodically expelled by the amoeba, and what is it called?", answer: "This is the contractile vacuole expelling excess water from the cell, helping the amoeba maintain its internal water balance.", explanation: "The contractile vacuole periodically empties to prevent the cell from over-absorbing water from its watery environment." },
      { question: "What is the process by which the amoeba splits into two separate amoebae called, and what type of reproduction is this?", answer: "This is binary fission, a form of asexual reproduction in which the single parent cell divides to produce two genetically identical daughter cells.", explanation: "Binary fission is both a method of cell division and a form of asexual reproduction in unicellular organisms like Amoeba." }
    ]
  },
];

// ── SELF ASSESSMENT: 50 TIMED MCQS (distinct from the question bank set above) ──
export const BIOLOGY9_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "The cell was first discovered and named by:", options: ["Anton van Leeuwenhoek", "Robert Hooke", "Robert Brown", "Rudolf Virchow"], correctAnswer: 1, explanation: "Robert Hooke discovered and named the cell in 1665 while examining cork under a microscope." },
  { id: 2, question: "The first person to observe a living cell was:", options: ["Robert Hooke", "Anton van Leeuwenhoek", "Theodor Schwann", "Matthias Schleiden"], correctAnswer: 1, explanation: "Anton van Leeuwenhoek was the first to observe and describe a living cell, in 1674." },
  { id: 3, question: "Which scientist stated that new cells arise only from pre-existing cells?", options: ["Robert Brown", "Rudolf Virchow", "Purkinje", "Robert Hooke"], correctAnswer: 1, explanation: "Rudolf Virchow, in 1855, established that new cells form only by the division of existing cells." },
  { id: 4, question: "Which of the following is a unicellular organism?", options: ["Amoeba", "Frog", "Hibiscus", "Human"], correctAnswer: 0, explanation: "Amoeba is unicellular, its entire body being a single cell." },
  { id: 5, question: "The outer boundary of an animal cell is the:", options: ["Cell wall", "Plasma membrane", "Nuclear membrane", "Cytoskeleton"], correctAnswer: 1, explanation: "Animal cells are bounded only by the plasma membrane, as they lack a cell wall." },
  { id: 6, question: "The property of the plasma membrane that allows it to regulate what enters and leaves the cell is called:", options: ["Impermeability", "Selective permeability", "Rigidity", "Opacity"], correctAnswer: 1, explanation: "Selective permeability allows the membrane to control which substances can pass through." },
  { id: 7, question: "The process by which Amoeba engulfs food using pseudopodia is called:", options: ["Osmosis", "Endocytosis", "Exocytosis", "Diffusion"], correctAnswer: 1, explanation: "This engulfing process is a form of endocytosis, specifically phagocytosis." },
  { id: 8, question: "Diffusion refers to the net movement of particles from:", options: ["Low to high concentration", "High to low concentration", "Only within a cell membrane", "Only across a selectively permeable membrane"], correctAnswer: 1, explanation: "Diffusion always occurs from a region of higher concentration to lower concentration." },
  { id: 9, question: "Osmosis is the movement of:", options: ["Any solute", "Water across a selectively permeable membrane", "Gases only", "Solid particles"], correctAnswer: 1, explanation: "Osmosis specifically refers to the movement of water molecules across a selectively permeable membrane." },
  { id: 10, question: "A plant cell placed in a hypertonic solution will undergo:", options: ["Turgidity", "Plasmolysis", "Endocytosis", "Mitosis"], correctAnswer: 1, explanation: "In a hypertonic solution, water leaves the cell (exosmosis), causing plasmolysis." },
  { id: 11, question: "A plant cell placed in a hypotonic solution will become:", options: ["Plasmolysed", "Turgid", "Shrunken", "Dehydrated"], correctAnswer: 1, explanation: "In a hypotonic solution, water enters the cell by endosmosis, making it turgid." },
  { id: 12, question: "The rigid, cellulose-based outer layer of plant cells is the:", options: ["Plasma membrane", "Cell wall", "Nuclear envelope", "Vacuole membrane"], correctAnswer: 1, explanation: "The cell wall, made of cellulose, is the rigid outer boundary of plant cells." },
  { id: 13, question: "Which organelle is called the control centre of the cell?", options: ["Golgi apparatus", "Nucleus", "Ribosome", "Mitochondria"], correctAnswer: 1, explanation: "The nucleus controls and regulates the cell's activities, earning it the name 'control centre'." },
  { id: 14, question: "Chromatin condenses to form visible structures called _____ during cell division.", options: ["Genes", "Chromosomes", "Nucleoli", "Ribosomes"], correctAnswer: 1, explanation: "Chromatin condenses into chromosomes just before cell division." },
  { id: 15, question: "Units of inheritance located on chromosomes are called:", options: ["Genes", "Nucleoli", "Cisternae", "Cristae"], correctAnswer: 0, explanation: "Genes are the units of heredity, located on chromosomes." },
  { id: 16, question: "In prokaryotic cells, genetic material is located in a region called the:", options: ["Nucleus", "Nucleoid", "Nucleolus", "Nuclear envelope"], correctAnswer: 1, explanation: "Prokaryotic cells lack a true nucleus, so their DNA lies in the nucleoid region." },
  { id: 17, question: "Which of these is a prokaryotic organism?", options: ["Amoeba", "Yeast", "Bacterium", "Human cell"], correctAnswer: 2, explanation: "Bacteria are prokaryotic, lacking a membrane-bound nucleus and organelles." },
  { id: 18, question: "Rough endoplasmic reticulum has ribosomes attached and mainly synthesises:", options: ["Lipids", "Proteins", "Carbohydrates", "Water"], correctAnswer: 1, explanation: "RER's ribosomes make it the primary site of protein synthesis." },
  { id: 19, question: "Smooth endoplasmic reticulum mainly synthesises:", options: ["Proteins", "Lipids", "DNA", "Chlorophyll"], correctAnswer: 1, explanation: "SER, lacking ribosomes, is mainly responsible for lipid synthesis." },
  { id: 20, question: "Which organelle detoxifies drugs and poisons, especially in liver cells?", options: ["Rough ER", "Smooth ER", "Golgi apparatus", "Ribosome"], correctAnswer: 1, explanation: "Smooth endoplasmic reticulum plays a key role in detoxification." },
  { id: 21, question: "The Golgi apparatus is composed of stacked, flattened sacs called:", options: ["Cristae", "Cisternae", "Nucleoli", "Pseudopodia"], correctAnswer: 1, explanation: "The Golgi apparatus consists of a stack of membrane-bound flattened sacs called cisternae." },
  { id: 22, question: "Which organelle packages digestive enzymes to form lysosomes?", options: ["Mitochondria", "Golgi apparatus", "Ribosome", "Nucleus"], correctAnswer: 1, explanation: "The Golgi apparatus forms lysosomes by packaging digestive enzymes into membrane-bound sacs." },
  { id: 23, question: "Lysosomes are nicknamed the:", options: ["Powerhouse of the cell", "Suicide bags of the cell", "Control centre of the cell", "Protein factory of the cell"], correctAnswer: 1, explanation: "Lysosomes are called 'suicide bags' because their enzymes can cause self-digestion of a damaged cell." },
  { id: 24, question: "Which organelle is the site of cellular respiration and ATP production?", options: ["Ribosome", "Mitochondria", "Lysosome", "Vacuole"], correctAnswer: 1, explanation: "Mitochondria perform cellular respiration and generate ATP." },
  { id: 25, question: "Mitochondria are called the powerhouse of the cell because they:", options: ["Store DNA only", "Produce ATP through respiration", "Digest waste material", "Synthesise cellulose"], correctAnswer: 1, explanation: "Mitochondria release usable energy in the form of ATP through cellular respiration." },
  { id: 26, question: "The inner membrane of a mitochondrion is folded into structures called:", options: ["Cisternae", "Cristae", "Thylakoids", "Pseudopodia"], correctAnswer: 1, explanation: "The inner mitochondrial membrane folds into cristae, increasing surface area for respiration." },
  { id: 27, question: "Plastids are found in:", options: ["Animal cells only", "Plant cells only", "Bacterial cells only", "Both plant and animal cells"], correctAnswer: 1, explanation: "Plastids are unique to plant cells (and some protists)." },
  { id: 28, question: "Green plastids containing chlorophyll, the site of photosynthesis, are called:", options: ["Chromoplasts", "Leucoplasts", "Chloroplasts", "Nucleoplasts"], correctAnswer: 2, explanation: "Chloroplasts contain chlorophyll and carry out photosynthesis." },
  { id: 29, question: "Colourless plastids that store starch, oils, and proteins are called:", options: ["Chloroplasts", "Chromoplasts", "Leucoplasts", "Amyloplasts only"], correctAnswer: 2, explanation: "Leucoplasts are colourless storage plastids." },
  { id: 30, question: "Coloured plastids (other than green) that give colour to flowers and fruits are called:", options: ["Leucoplasts", "Chromoplasts", "Chloroplasts", "Elaioplasts"], correctAnswer: 1, explanation: "Chromoplasts contain pigments that give flowers/fruits their yellow, orange, or red colour." },
  { id: 31, question: "Ribosomes are the site of:", options: ["Lipid synthesis", "Protein synthesis", "ATP breakdown only", "Photosynthesis"], correctAnswer: 1, explanation: "Ribosomes translate genetic instructions into proteins." },
  { id: 32, question: "Ribosomes are found:", options: ["Only in the nucleus", "Freely in cytoplasm and attached to rough ER", "Only in mitochondria", "Only in chloroplasts"], correctAnswer: 1, explanation: "Ribosomes occur both freely in the cytoplasm and attached to the rough ER." },
  { id: 33, question: "Fluid-filled sacs that store water, food, or waste inside a cell are called:", options: ["Vacuoles", "Lysosomes", "Ribosomes", "Cristae"], correctAnswer: 0, explanation: "Vacuoles are membrane-bound storage sacs within the cytoplasm." },
  { id: 34, question: "In Amoeba, the vacuole responsible for removing excess water is the:", options: ["Food vacuole", "Contractile vacuole", "Central vacuole", "Sap vacuole"], correctAnswer: 1, explanation: "The contractile vacuole in Amoeba actively expels excess water to maintain water balance." },
  { id: 35, question: "The fluid stored in a plant cell's central vacuole is called:", options: ["Cytoplasm", "Cell sap", "Nucleoplasm", "Plasma"], correctAnswer: 1, explanation: "Cell sap is the solution of substances stored in a plant cell's vacuole." },
  { id: 36, question: "The pressure of a swollen vacuole against the cell wall that keeps a plant firm is called:", options: ["Osmotic shock", "Turgor pressure", "Diffusion pressure", "Plasmolytic pressure"], correctAnswer: 1, explanation: "Turgor pressure keeps plant cells and tissues firm." },
  { id: 37, question: "Which of these organelles is common to BOTH plant and animal cells?", options: ["Cell wall", "Chloroplast", "Mitochondria", "Large permanent vacuole"], correctAnswer: 2, explanation: "Mitochondria are present in both plant and animal cells." },
  { id: 38, question: "Which structure is typically absent in animal cells?", options: ["Nucleus", "Mitochondria", "Cell wall", "Plasma membrane"], correctAnswer: 2, explanation: "Animal cells lack a cell wall, unlike plant cells." },
  { id: 39, question: "A red blood cell placed in distilled water will likely:", options: ["Shrink", "Swell and possibly burst", "Remain unchanged", "Undergo plasmolysis"], correctAnswer: 1, explanation: "Distilled water is hypotonic, so water enters the RBC by endosmosis, potentially bursting it." },
  { id: 40, question: "Cell division is essential for:", options: ["Only reproduction", "Growth, repair, and reproduction", "Only respiration", "Only excretion"], correctAnswer: 1, explanation: "Cell division enables growth, tissue repair, and reproduction." },
  { id: 41, question: "An organism made up of many cells, each performing specialised functions, is called:", options: ["Unicellular", "Multicellular", "Acellular", "Non-living"], correctAnswer: 1, explanation: "Multicellular organisms are made of many specialised cells working together." },
  { id: 42, question: "The scientific study of cells is called:", options: ["Cytology", "Histology", "Physiology", "Ecology"], correctAnswer: 0, explanation: "Cytology is the branch of biology focused on cell structure and function." },
  { id: 43, question: "Which process does NOT require the cell to spend energy?", options: ["Diffusion", "Active transport", "Endocytosis", "Muscle contraction"], correctAnswer: 0, explanation: "Diffusion (and osmosis) is a passive process, requiring no energy expenditure by the cell." },
  { id: 44, question: "The key structural difference between prokaryotic and eukaryotic cells is:", options: ["Presence/absence of a plasma membrane", "Presence/absence of a membrane-bound nucleus", "Presence/absence of cytoplasm", "Presence/absence of DNA"], correctAnswer: 1, explanation: "Eukaryotic cells have a true, membrane-bound nucleus; prokaryotic cells do not." },
  { id: 45, question: "Which organelle acts as the packaging and dispatch unit of the cell?", options: ["Ribosome", "Mitochondria", "Golgi apparatus", "Nucleolus"], correctAnswer: 2, explanation: "The Golgi apparatus modifies, packages, and dispatches materials to their destinations." },
  { id: 46, question: "Like mitochondria, plastids also possess their own:", options: ["Cell wall", "DNA and ribosomes", "Digestive enzymes exclusively", "Chlorophyll always"], correctAnswer: 1, explanation: "Plastids, like mitochondria, contain their own DNA and ribosomes." },
  { id: 47, question: "Chromosomes are the condensed, visible form of:", options: ["Ribosomes", "Chromatin", "Cell sap", "Plastids"], correctAnswer: 1, explanation: "Chromosomes form when chromatin material condenses before cell division." },
  { id: 48, question: "DNA stands for:", options: ["Deoxyribonucleic acid", "Dinucleotide acid", "Diribose nuclear acid", "Deoxyribose nuclear acid"], correctAnswer: 0, explanation: "DNA stands for Deoxyribonucleic Acid, the molecule carrying genetic information." },
  { id: 49, question: "Which of the following best describes exocytosis?", options: ["Material entering the cell via engulfment", "Material being released from the cell via vesicles", "Water moving into the cell", "Gases diffusing into the cell"], correctAnswer: 1, explanation: "Exocytosis is the release of material out of the cell via vesicles fusing with the plasma membrane." },
  { id: 50, question: "The cell is considered the fundamental unit of life because it is the smallest unit that can:", options: ["Be seen without a microscope", "Independently perform all basic life processes", "Survive without a membrane", "Exist only in plants"], correctAnswer: 1, explanation: "The cell is the smallest unit capable of independently carrying out nutrition, respiration, excretion, growth, and reproduction." },
];
