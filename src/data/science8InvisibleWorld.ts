// Class 8 Science -- Chapter: The Invisible Living World Beyond Our Naked Eye (microorganisms:
// bacteria, fungi, protozoa, algae, viruses; their habitats; friendly uses in food, medicine,
// agriculture and cleanup; harmful pathogens and disease spread; food preservation; and the
// nitrogen cycle). Every fact below reflects standard, well-established science, and every
// answer states the reason behind it, not just the conclusion.
import type {
  QuizQuestion,
  NCERTSolvedQuestion,
  ShortQuestion,
  LongQuestion,
  CompetencyQuestion,
} from "../types-custom";

// ── SOLVED PRACTICE QUESTIONS ──
export const SCIENCE8IW_SOLVED_QUESTIONS: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Practice Q1",
    question: "Name the five main groups into which microorganisms are classified, and give one example of what each group includes.",
    given: { "Topic": "Classification of microorganisms" },
    formulaUsed: "Microorganisms are grouped as bacteria, fungi, protozoa, algae, and viruses.",
    derivationSteps: [
      "Bacteria: very simple single-celled organisms, among the most common microorganisms.",
      "Fungi: includes moulds and yeasts.",
      "Protozoa: single-celled organisms usually able to move on their own.",
      "Algae: simple, usually water-dwelling organisms that make their own food using sunlight.",
      "Viruses: extremely tiny particles that multiply only inside a living host cell."
    ],
    finalAnswer: "The five groups are bacteria, fungi, protozoa, algae, and viruses, as described above.",
    conceptualTip: "Viruses are often treated as a separate, fifth group at this level, since they behave differently from the other four (they can only multiply inside a host's cells)."
  },
  {
    id: 2,
    questionNumber: "Practice Q2",
    question: "Explain, step by step, how curd is formed from milk, naming the type of microorganism responsible.",
    given: { "Starting material": "Milk" },
    formulaUsed: "A type of bacteria ferments milk, converting it into curd.",
    derivationSteps: [
      "Milk contains sugars that certain bacteria can use as food.",
      "These bacteria carry out fermentation, breaking down the milk sugars.",
      "This process changes the milk's texture and taste, converting it into curd."
    ],
    finalAnswer: "Bacteria ferment the sugars in milk, converting it into curd.",
    conceptualTip: "This is a classic example of a helpful microorganism being used deliberately to make an everyday food."
  },
  {
    id: 3,
    questionNumber: "Practice Q3",
    question: "Explain how yeast makes bread dough rise, describing the underlying process.",
    given: { "Microorganism": "Yeast (a fungus)" },
    formulaUsed: "Yeast ferments sugars in the dough, releasing gas.",
    derivationSteps: [
      "Yeast is added to the dough along with sugar.",
      "Through fermentation, yeast breaks down the sugar and releases gas bubbles.",
      "These gas bubbles get trapped within the dough, causing it to expand and rise.",
      "When baked, this trapped gas gives bread its soft, fluffy texture."
    ],
    finalAnswer: "Yeast ferments sugar in the dough, producing gas that makes the dough rise before baking.",
    conceptualTip: "This is exactly the same underlying process (fermentation) used for making curd, alcohol, and idli/dosa batter -- only the specific microorganism and food differ."
  },
  {
    id: 4,
    questionNumber: "Practice Q4",
    question: "Explain how nitrogen-fixing bacteria help increase soil fertility, naming a specific example.",
    given: { "Bacterium": "Rhizobium" },
    formulaUsed: "Nitrogen-fixing bacteria convert nitrogen gas into a usable form for plants.",
    derivationSteps: [
      "Rhizobium bacteria live in the root nodules of certain plants, such as pea and gram.",
      "These bacteria convert nitrogen gas from the air into a form the plant can absorb.",
      "The plant uses this nitrogen to grow, and some remains in the soil, improving its fertility for future crops."
    ],
    finalAnswer: "Rhizobium converts atmospheric nitrogen into a usable form within the roots of leguminous plants, directly increasing soil fertility.",
    conceptualTip: "Farmers sometimes grow leguminous crops specifically to naturally enrich the soil with nitrogen, reducing the need for chemical fertiliser."
  },
  {
    id: 5,
    questionNumber: "Practice Q5",
    question: "Explain why the common cold cannot be treated with antibiotics, using scientific reasoning.",
    given: { "Disease": "Common cold" },
    formulaUsed: "Antibiotics act on processes specific to bacteria; the common cold is caused by a virus.",
    derivationSteps: [
      "Antibiotics work by disrupting specific processes found in bacteria, such as building their cell walls.",
      "Viruses do not have these bacterial structures, and instead multiply by using the host's own cells.",
      "Since antibiotics have no bacterial target to act on inside a virus, they cannot treat viral infections like the common cold."
    ],
    finalAnswer: "Antibiotics cannot treat the common cold because it is caused by a virus, and antibiotics only act on processes specific to bacteria.",
    conceptualTip: "This is a very common reasoning-based question -- always check WHICH type of microorganism causes a disease before deciding whether antibiotics would even be relevant."
  },
  {
    id: 6,
    questionNumber: "Practice Q6",
    question: "Explain how the female Anopheles mosquito acts as a vector in spreading malaria.",
    given: { "Vector": "Female Anopheles mosquito", "Disease": "Malaria" },
    formulaUsed: "A vector carries a pathogen from an infected host to a healthy one.",
    derivationSteps: [
      "The female Anopheles mosquito bites an infected person and picks up the malaria-causing parasite along with blood.",
      "The parasite develops inside the mosquito.",
      "When the mosquito bites a healthy person next, it transfers the parasite into that person's bloodstream, spreading the infection."
    ],
    finalAnswer: "The female Anopheles mosquito transfers the malaria parasite from an infected person to a healthy person through its bite, acting as a vector.",
    conceptualTip: "Controlling mosquito breeding sites (like removing stagnant water) is one of the most effective ways to reduce malaria, since it targets the vector directly."
  },
  {
    id: 7,
    questionNumber: "Practice Q7",
    question: "Explain how vaccination protects the body against a disease without causing the disease itself.",
    given: { "Concept": "Vaccination" },
    formulaUsed: "A vaccine uses a weakened or killed pathogen (or a part of it) to train the body's defences.",
    derivationSteps: [
      "A vaccine introduces a weakened, killed, or partial form of a pathogen into the body.",
      "This form is not strong enough to cause the actual disease.",
      "However, it is enough for the body's defence system to recognise it and learn to fight it.",
      "If the real, active pathogen enters the body later, the body can respond quickly and effectively, often preventing illness."
    ],
    finalAnswer: "Vaccination trains the body's defences using a harmless form of the pathogen, so the body can fight off the real pathogen quickly if exposed later.",
    conceptualTip: "This is why a vaccinated person does not get seriously ill even if later exposed to the real disease -- their body has already learned how to respond."
  },
  {
    id: 8,
    questionNumber: "Practice Q8",
    question: "Explain why salt is effective in preserving pickles and dried fish.",
    given: { "Preservative": "Salt" },
    formulaUsed: "Salt draws water out of food and microorganisms, preventing microbial growth.",
    derivationSteps: [
      "Salt has a strong tendency to draw water out of surrounding material.",
      "When applied to food, salt draws water out of both the food and any microorganisms present on it.",
      "Without enough water, microorganisms cannot grow or multiply effectively, which prevents the food from spoiling quickly."
    ],
    finalAnswer: "Salt preserves food by drawing out the water microorganisms need to grow, preventing spoilage.",
    conceptualTip: "Sugar works in a very similar way to salt for the same underlying reason, which is why sugar is used to preserve jams and squashes."
  },
  {
    id: 9,
    questionNumber: "Practice Q9",
    question: "Explain the role of decomposer microorganisms in the nitrogen cycle.",
    given: { "Concept": "Decomposers in the nitrogen cycle" },
    formulaUsed: "Decomposers break down dead matter, releasing trapped nutrients back into the soil.",
    derivationSteps: [
      "When plants and animals die, or produce waste, nitrogen compounds remain trapped inside this dead or waste material.",
      "Decomposer bacteria and fungi break down this material into simpler substances.",
      "This process releases the trapped nitrogen compounds back into the soil, where they can be used again by plants."
    ],
    finalAnswer: "Decomposers release nitrogen compounds from dead matter and waste back into the soil, allowing the nitrogen cycle to continue.",
    conceptualTip: "Without decomposers, nitrogen would remain permanently locked inside dead organisms, and the nitrogen cycle could not continue."
  },
  {
    id: 10,
    questionNumber: "Practice Q10",
    question: "A student says pasteurised milk will never spoil because it has already been treated. Explain why this reasoning is incorrect.",
    given: { "Claim": "Pasteurised milk never spoils" },
    formulaUsed: "Pasteurisation kills most harmful microorganisms present at the time of treatment, but does not make the milk permanently sterile.",
    derivationSteps: [
      "Pasteurisation heats milk enough to kill most harmful microorganisms present at that specific time.",
      "However, new microorganisms from the air, containers, or handling can still enter the milk afterward.",
      "If left unrefrigerated for long enough, these new microorganisms can grow and eventually spoil the milk."
    ],
    finalAnswer: "The reasoning is incorrect -- pasteurisation only removes the microorganisms present at treatment time; it does not prevent new microorganisms from growing later, so pasteurised milk still needs refrigeration and can still spoil eventually.",
    conceptualTip: "This is a classic overgeneralisation trap -- treating a food once does not mean it becomes permanently immune to spoilage forever."
  },
];

// ── MCQs (1 mark each) ──
export const SCIENCE8IW_MCQS: QuizQuestion[] = [
  { id: 1, question: "Microorganisms are living things that:", options: ["Can be seen easily with the naked eye", "Are too small to be seen without a microscope", "Do not exist in nature", "Are always harmful"], correctAnswer: 1, explanation: "Microorganisms are defined by being too small to see without magnification, requiring a microscope." },
  { id: 2, question: "Who is credited with first observing microorganisms using a simple microscope?", options: ["Isaac Newton", "Antonie van Leeuwenhoek", "Charles Darwin", "Louis Pasteur"], correctAnswer: 1, explanation: "Antonie van Leeuwenhoek built a simple microscope and was the first to observe microorganisms with it." },
  { id: 3, question: "Which of these is NOT one of the five main groups of microorganisms?", options: ["Bacteria", "Fungi", "Insects", "Protozoa"], correctAnswer: 2, explanation: "Insects are not microorganisms -- they are visible without a microscope. The five groups are bacteria, fungi, protozoa, algae, and viruses." },
  { id: 4, question: "Which group of microorganisms can only multiply inside the living cells of a host?", options: ["Bacteria", "Algae", "Viruses", "Fungi"], correctAnswer: 2, explanation: "Viruses can only multiply inside the living cells of a host organism." },
  { id: 5, question: "Algae are usually found in:", options: ["Only deserts", "Water", "Only human bodies", "Only frozen ice"], correctAnswer: 1, explanation: "Algae are simple organisms usually found in water, where they can make their own food using sunlight." },
  { id: 6, question: "Which statement about microorganism habitats is correct?", options: ["They live only in dirty places", "They are found almost everywhere, including extreme environments", "They can only survive at room temperature", "They cannot survive in water"], correctAnswer: 1, explanation: "Microorganisms are found almost everywhere, including extreme environments like hot springs and ice." },
  { id: 7, question: "Extremophiles are microorganisms that:", options: ["Cannot survive anywhere", "Are specially adapted to survive extreme conditions", "Only live in the human body", "Are always harmful"], correctAnswer: 1, explanation: "Extremophiles are specially adapted to survive extreme conditions like very high temperatures." },
  { id: 8, question: "Fermentation is best described as:", options: ["Freezing food to preserve it", "Microorganisms breaking down sugars to produce acids or gases", "A method of cooking with oil", "A way to measure microorganisms"], correctAnswer: 1, explanation: "Fermentation involves microorganisms breaking down sugars, producing substances like acids or gases." },
  { id: 9, question: "Which microorganism converts milk into curd?", options: ["Yeast", "A type of bacteria", "A virus", "Algae"], correctAnswer: 1, explanation: "A type of bacteria ferments milk sugars, converting milk into curd." },
  { id: 10, question: "What makes bread dough rise before baking?", options: ["Salt added to the dough", "Gas bubbles produced by yeast during fermentation", "Cooling the dough", "Sunlight exposure"], correctAnswer: 1, explanation: "Yeast ferments sugars in the dough and produces gas bubbles that make it rise." },
  { id: 11, question: "Alcohol is commonly produced by the fermentation of sugars using:", options: ["Bacteria only", "Yeast", "Viruses", "Protozoa"], correctAnswer: 1, explanation: "Yeast ferments sugars to produce alcohol." },
  { id: 12, question: "Antibiotics such as penicillin are produced using:", options: ["A type of virus", "A type of fungus", "Algae", "Sunlight"], correctAnswer: 1, explanation: "Penicillin, a well-known antibiotic, is produced using a certain fungus." },
  { id: 13, question: "A vaccine works by:", options: ["Killing all microorganisms in the body permanently", "Training the body's defences using a weakened or killed pathogen", "Making a person immune to all diseases at once", "Curing an infection after severe symptoms appear"], correctAnswer: 1, explanation: "A vaccine trains the body's defences using a weakened or killed form of a specific pathogen." },
  { id: 14, question: "Which bacterium is well known for fixing nitrogen in the root nodules of leguminous plants?", options: ["Rhizobium", "Lactobacillus", "Streptococcus", "Salmonella"], correctAnswer: 0, explanation: "Rhizobium bacteria live in root nodules of plants like pea and gram, fixing nitrogen from the air." },
  { id: 15, question: "Decomposer microorganisms are important because they:", options: ["Cause all plant diseases", "Break down dead matter and release nutrients back into the soil", "Only live in water", "Cannot survive in soil"], correctAnswer: 1, explanation: "Decomposers break down dead plants, animals, and waste, releasing nutrients back into the soil." },
  { id: 16, question: "Microorganisms are used in sewage treatment plants to:", options: ["Add colour to water", "Break down harmful waste material in sewage", "Make water freeze faster", "Increase water's temperature"], correctAnswer: 1, explanation: "Microorganisms break down harmful waste in sewage, making treated water safer." },
  { id: 17, question: "A pathogen is defined as:", options: ["Any living organism, harmful or not", "A microorganism that causes disease in another organism", "A type of medicine", "A tool used to see microorganisms"], correctAnswer: 1, explanation: "A pathogen is specifically a microorganism that causes disease." },
  { id: 18, question: "A communicable disease is one that:", options: ["Cannot spread between people", "Can spread from an infected person or animal to a healthy one", "Only affects plants", "Is always caused by bacteria"], correctAnswer: 1, explanation: "A communicable disease can spread from an infected host to a healthy one." },
  { id: 19, question: "Which of these human diseases is caused by a bacterium?", options: ["Common cold", "Chicken pox", "Typhoid", "Measles"], correctAnswer: 2, explanation: "Typhoid is caused by a bacterium, unlike the other options, which are viral." },
  { id: 20, question: "Which of these human diseases is caused by a virus?", options: ["Cholera", "Tuberculosis", "Measles", "Typhoid"], correctAnswer: 2, explanation: "Measles is caused by a virus; the other options are bacterial diseases." },
  { id: 21, question: "Malaria is caused by which type of microorganism?", options: ["Bacteria", "Fungus", "Protozoan parasite", "Alga"], correctAnswer: 2, explanation: "Malaria is caused by a protozoan parasite, transmitted by the female Anopheles mosquito." },
  { id: 22, question: "Anthrax is a disease that mainly affects:", options: ["Only plants", "Cattle, and can spread to humans", "Only fish", "Only insects"], correctAnswer: 1, explanation: "Anthrax mainly affects cattle and can spread to humans." },
  { id: 23, question: "Citrus canker is an example of a:", options: ["Human disease", "Animal disease", "Plant disease", "Type of vaccine"], correctAnswer: 2, explanation: "Citrus canker is a plant disease affecting citrus trees." },
  { id: 24, question: "Yellow vein mosaic disease commonly affects which crop?", options: ["Wheat", "Okra (bhindi)", "Rice", "Mango"], correctAnswer: 1, explanation: "Yellow vein mosaic is a well-known viral disease of okra (bhindi)." },
  { id: 25, question: "Which of these is a mode of disease transmission through the air?", options: ["Drinking contaminated water", "Droplets released while coughing or sneezing", "A mosquito bite", "Touching an infected object"], correctAnswer: 1, explanation: "Droplets from coughing or sneezing can carry pathogens through the air to others nearby." },
  { id: 26, question: "Cholera and typhoid commonly spread through:", options: ["The air only", "Contaminated water", "Only direct skin contact", "Only through animals"], correctAnswer: 1, explanation: "Cholera and typhoid are commonly spread through water contaminated with pathogens." },
  { id: 27, question: "A vector is best described as:", options: ["A type of medicine", "A carrier that transfers a pathogen between hosts", "A microscope part", "A method of food preservation"], correctAnswer: 1, explanation: "A vector, such as a mosquito, carries a pathogen from one host to another." },
  { id: 28, question: "Houseflies can spread disease mainly by:", options: ["Biting humans directly", "Contaminating food after landing on waste", "Flying through clean air only", "Living inside plant roots"], correctAnswer: 1, explanation: "Houseflies can contaminate food with pathogens after landing on waste or dirty surfaces." },
  { id: 29, question: "Which of the following helps reduce the spread of malaria?", options: ["Increasing stagnant water around homes", "Removing stagnant water and using mosquito nets", "Avoiding vaccination", "Eating more sugar"], correctAnswer: 1, explanation: "Removing mosquito breeding sites (stagnant water) and using nets reduces malaria spread." },
  { id: 30, question: "Why are antibiotics not effective against viral infections like the common cold?", options: ["Antibiotics are too weak for any infection", "Antibiotics act on bacteria-specific processes that viruses do not have", "Viruses are larger than bacteria", "Antibiotics only work on plants"], correctAnswer: 1, explanation: "Antibiotics target processes specific to bacteria, which viruses lack, so they don't work on viral infections." },
  { id: 31, question: "Food spoilage is mainly caused by:", options: ["Refrigeration", "Growth of microorganisms on food", "Adding salt", "Boiling food"], correctAnswer: 1, explanation: "Food spoilage happens when microorganisms grow on food, changing its smell, taste, and safety." },
  { id: 32, question: "Salt helps preserve food mainly by:", options: ["Adding flavour only", "Drawing water out of food and microorganisms", "Increasing microbial growth", "Cooling the food"], correctAnswer: 1, explanation: "Salt draws water out of both the food and microorganisms, preventing microbial growth." },
  { id: 33, question: "Refrigeration preserves food by:", options: ["Killing all microorganisms instantly", "Slowing down the growth of microorganisms", "Adding preservative chemicals", "Removing air completely"], correctAnswer: 1, explanation: "Refrigeration slows microbial growth through low temperature, without necessarily killing microorganisms." },
  { id: 34, question: "Pasteurisation is a process that involves:", options: ["Freezing milk permanently", "Heating milk to kill most harmful microorganisms, then cooling quickly", "Adding salt to milk", "Removing all nutrients from milk"], correctAnswer: 1, explanation: "Pasteurisation heats a liquid like milk to kill harmful microorganisms, then cools it rapidly." },
  { id: 35, question: "Vacuum (airtight) packing helps preserve food because:", options: ["It adds more air for microorganisms", "Many microorganisms need air to grow, and this removes it", "It increases food's temperature", "It adds sugar to food"], correctAnswer: 1, explanation: "Removing air creates conditions unsuitable for many microorganisms that need air to grow." },
  { id: 36, question: "Nitrogen fixation refers to:", options: ["Removing nitrogen from soil completely", "Converting nitrogen gas into a usable form for plants", "Freezing nitrogen gas", "Burning nitrogen gas"], correctAnswer: 1, explanation: "Nitrogen fixation converts atmospheric nitrogen gas into a form plants can absorb and use." },
  { id: 37, question: "Why can't most plants use nitrogen gas from the air directly?", options: ["There is no nitrogen in the air", "Plants cannot absorb and use nitrogen in its gas form directly", "Nitrogen gas is toxic to all plants", "Plants do not need nitrogen at all"], correctAnswer: 1, explanation: "Plants cannot use nitrogen gas directly; it must be converted into a usable form first." },
  { id: 38, question: "In the nitrogen cycle, denitrifying bacteria:", options: ["Convert nitrogen compounds back into nitrogen gas", "Fix nitrogen into the soil", "Are the same as Rhizobium", "Only live in the human body"], correctAnswer: 0, explanation: "Denitrifying bacteria convert nitrogen compounds back into nitrogen gas, returning it to the air." },
  { id: 39, question: "Herd immunity refers to:", options: ["Immunity found only in farm animals", "Protection of a community when a large portion is immune to a disease", "A type of vaccine ingredient", "A disease affecting herds of cattle only"], correctAnswer: 1, explanation: "Herd immunity happens when enough of a population is immune, reducing disease spread even to non-immune individuals." },
  { id: 40, question: "Which statement about bacteria is most accurate?", options: ["All bacteria are harmful", "All bacteria are helpful", "Bacteria include both harmful and helpful species", "Bacteria are not microorganisms"], correctAnswer: 2, explanation: "Bacteria include both harmful pathogens and many helpful species -- it is incorrect to label the whole group as one or the other." },
  { id: 41, question: "Which of these is an example of a helpful microorganism used in food?", options: ["The bacterium causing cholera", "Yeast used in bread-making", "The virus causing measles", "The protozoan causing malaria"], correctAnswer: 1, explanation: "Yeast is a helpful fungus used to make bread rise through fermentation." },
  { id: 42, question: "Which of the following is a correct example of a plant disease and its cause?", options: ["Rust of wheat -- caused by a fungus", "Cholera -- a plant disease", "Anthrax -- a plant disease", "Malaria -- a plant disease"], correctAnswer: 0, explanation: "Rust of wheat is a plant disease caused by a fungus; the other options are human/animal diseases." },
  { id: 43, question: "Why is it important to cover your mouth while coughing or sneezing?", options: ["It has no real effect on disease spread", "It traps droplets that could carry pathogens to others", "It only helps with plant diseases", "It prevents food spoilage"], correctAnswer: 1, explanation: "Covering the mouth traps droplets, reducing the chance of spreading airborne pathogens to others." },
  { id: 44, question: "Which of these best explains why hygiene practices like handwashing reduce disease spread?", options: ["They have no scientific basis", "They physically remove pathogens from hands before they can be transferred", "They only work against viruses", "They replace the need for vaccination entirely"], correctAnswer: 1, explanation: "Handwashing physically removes pathogens from the skin, reducing the chance of transferring them to others or to food." },
  { id: 45, question: "Which group of microorganisms includes moulds and yeasts?", options: ["Bacteria", "Fungi", "Protozoa", "Viruses"], correctAnswer: 1, explanation: "Fungi include moulds and yeasts among other forms." },
  { id: 46, question: "Which group of microorganisms is typically able to move on its own?", options: ["Algae", "Protozoa", "Viruses", "Fungi"], correctAnswer: 1, explanation: "Protozoa are single-celled organisms usually able to move on their own." },
  { id: 47, question: "A student claims refrigeration completely removes all microorganisms from food. Is this correct?", options: ["Yes, refrigeration kills all microorganisms", "No, refrigeration only slows microbial growth", "Yes, but only for meat", "No, refrigeration speeds up microbial growth"], correctAnswer: 1, explanation: "Refrigeration slows down microbial growth through low temperature; it does not kill or remove all microorganisms." },
  { id: 48, question: "Why do farmers sometimes grow leguminous crops like pea or gram in rotation with other crops?", options: ["To reduce soil fertility", "Because nitrogen-fixing bacteria in their roots enrich the soil with nitrogen", "Because these crops destroy all microorganisms in soil", "Because these crops need no nitrogen at all"], correctAnswer: 1, explanation: "Nitrogen-fixing bacteria in the roots of leguminous plants enrich the soil, benefiting future crops." },
  { id: 49, question: "Foot-and-mouth disease mainly affects:", options: ["Wheat crops", "Cattle", "Citrus plants", "Only humans"], correctAnswer: 1, explanation: "Foot-and-mouth disease is a viral disease that mainly affects cattle." },
  { id: 50, question: "Overall, which statement best summarises the relationship between humans and microorganisms?", options: ["All microorganisms are harmful and should be avoided", "Microorganisms are only found in laboratories", "Microorganisms include both helpful and harmful types that affect daily life in many ways", "Microorganisms have no real effect on humans"], correctAnswer: 2, explanation: "Microorganisms include both helpful types (used in food, medicine, agriculture) and harmful pathogens, affecting daily life in many important ways." },
];

// ── VERY SHORT (2 marks each) ──
export const SCIENCE8IW_VERY_SHORT: ShortQuestion[] = [
  { id: 1, question: "Define microorganisms.", answer: "Microorganisms are living things too small to be seen with the naked eye, and can only be observed using a microscope.", keyPoints: ["Too small to see unaided", "Seen using a microscope"] },
  { id: 2, question: "Name the five main groups of microorganisms.", answer: "Bacteria, fungi, protozoa, algae, and viruses.", keyPoints: ["All five groups named"] },
  { id: 3, question: "Who first observed microorganisms, and with what instrument?", answer: "Antonie van Leeuwenhoek, using a simple microscope that he built himself.", keyPoints: ["Correct name", "Simple microscope"] },
  { id: 4, question: "Name two places where microorganisms can be found.", answer: "Any two of: air, water, soil, inside the bodies of living organisms.", keyPoints: ["Two valid locations"] },
  { id: 5, question: "What are extremophiles?", answer: "Microorganisms specially adapted to survive extreme conditions, such as very high temperatures, that would destroy most other living things.", keyPoints: ["Survive extreme conditions", "Most other life could not"] },
  { id: 6, question: "Define fermentation.", answer: "A process in which microorganisms break down sugars, producing substances such as acids or gases, used to make various foods.", keyPoints: ["Breaks down sugars", "Produces acids/gases"] },
  { id: 7, question: "Which microorganism converts milk into curd?", answer: "A type of bacteria, through fermentation.", keyPoints: ["Bacteria", "Fermentation"] },
  { id: 8, question: "Why does bread dough rise before baking?", answer: "Yeast ferments sugar in the dough and produces gas bubbles that make the dough rise.", keyPoints: ["Yeast", "Gas bubbles from fermentation"] },
  { id: 9, question: "Name one antibiotic and the type of microorganism it is produced from.", answer: "Penicillin, produced from a certain fungus.", keyPoints: ["Penicillin", "Fungus"] },
  { id: 10, question: "What is a vaccine?", answer: "A preparation using a weakened or killed pathogen (or part of it) that trains the body's defences against a specific disease.", keyPoints: ["Weakened/killed pathogen", "Trains body's defences"] },
  { id: 11, question: "Name a nitrogen-fixing bacterium and where it is found.", answer: "Rhizobium, found in the root nodules of leguminous plants such as pea and gram.", keyPoints: ["Rhizobium", "Root nodules of legumes"] },
  { id: 12, question: "What role do decomposer microorganisms play in nature?", answer: "They break down dead plants, animals, and waste into simpler substances, returning nutrients to the soil.", keyPoints: ["Break down dead matter", "Return nutrients to soil"] },
  { id: 13, question: "Why are microorganisms used in sewage treatment plants?", answer: "They break down harmful waste material in sewage, making the treated water safer before release.", keyPoints: ["Break down waste", "Make water safer"] },
  { id: 14, question: "Define a pathogen.", answer: "A microorganism that causes disease in another living organism.", keyPoints: ["Causes disease"] },
  { id: 15, question: "Define a communicable disease.", answer: "A disease that can spread from an infected person or animal to a healthy one.", keyPoints: ["Spreads from infected to healthy"] },
  { id: 16, question: "Name two human diseases caused by bacteria.", answer: "Any two of: cholera, typhoid, tuberculosis.", keyPoints: ["Two correct bacterial diseases"] },
  { id: 17, question: "Name two human diseases caused by viruses.", answer: "Any two of: common cold, measles, chicken pox, polio.", keyPoints: ["Two correct viral diseases"] },
  { id: 18, question: "Which type of microorganism causes malaria?", answer: "A protozoan parasite.", keyPoints: ["Protozoan"] },
  { id: 19, question: "Name a plant disease caused by a microorganism and the crop it affects.", answer: "Citrus canker affects citrus plants. (Also acceptable: rust of wheat affects wheat; yellow vein mosaic affects okra/bhindi.)", keyPoints: ["Correct disease-crop pair"] },
  { id: 20, question: "Define a vector, with an example.", answer: "A vector is a carrier that transfers a pathogen from one host to another; for example, the female Anopheles mosquito is a vector for malaria.", keyPoints: ["Carrier definition", "Correct example"] },
  { id: 21, question: "How can a housefly spread disease?", answer: "By landing on waste or contaminated matter and then landing on food, contaminating it with pathogens.", keyPoints: ["Contaminates food after touching waste"] },
  { id: 22, question: "Name two ways to help prevent the spread of communicable diseases.", answer: "Any two of: vaccination, personal hygiene (handwashing), safe drinking water, vector control.", keyPoints: ["Two valid prevention methods"] },
  { id: 23, question: "Why is it important to drink clean, safe water?", answer: "Contaminated water can spread diseases like cholera and typhoid; clean water prevents this route of infection.", keyPoints: ["Prevents water-borne disease"] },
  { id: 24, question: "Define food spoilage.", answer: "The growth of microorganisms on food, which can change its smell, taste, and appearance, and may cause food poisoning.", keyPoints: ["Microbial growth on food", "Can cause food poisoning"] },
  { id: 25, question: "Name two common methods of food preservation.", answer: "Any two of: salting, use of sugar, boiling/pasteurisation, refrigeration/freezing, chemical preservatives, airtight packing.", keyPoints: ["Two valid methods"] },
  { id: 26, question: "Why does salting help preserve food?", answer: "Salt draws water out of the food and out of microorganisms, preventing them from growing easily.", keyPoints: ["Draws out water", "Prevents microbial growth"] },
  { id: 27, question: "What is pasteurisation?", answer: "A process of heating a liquid like milk enough to kill most harmful microorganisms, then cooling it quickly.", keyPoints: ["Heating then rapid cooling", "Kills harmful microorganisms"] },
  { id: 28, question: "Define nitrogen fixation.", answer: "The process by which certain microorganisms convert nitrogen gas from the air into a usable form for plants.", keyPoints: ["Converts nitrogen gas", "Usable form for plants"] },
  { id: 29, question: "Why can't plants use nitrogen gas directly from the air?", answer: "Plants cannot absorb or use nitrogen in its gas form; it must first be converted into a usable form by microorganisms.", keyPoints: ["Cannot use gas form directly", "Needs conversion"] },
  { id: 30, question: "Explain briefly what herd immunity means.", answer: "When a large enough part of a population is immune to a disease, it has fewer chances to spread, indirectly protecting even non-immune individuals.", keyPoints: ["Large immune portion", "Indirectly protects others"] },
];

// ── SHORT (3 marks each) ──
export const SCIENCE8IW_SHORT: ShortQuestion[] = [
  { id: 1, question: "Explain, with reasoning, why microorganisms cannot be seen with the naked eye but can be seen using a microscope.", answer: "Microorganisms are extremely small, far smaller than the finest detail the unaided human eye can resolve. A microscope magnifies these tiny objects far beyond their actual size, making them large enough for the eye to detect and study clearly.", keyPoints: ["Extremely small size", "Microscope magnifies beyond eye's resolving power"] },
  { id: 2, question: "Describe the process of fermentation and name two everyday foods made using it.", answer: "Fermentation is a process in which microorganisms break down sugars, producing substances such as acids or gases. Two everyday foods made using fermentation are curd (from milk, using bacteria) and bread (using yeast, a fungus, whose gas production makes the dough rise).", keyPoints: ["Fermentation defined", "Two correct food examples with microorganism named"] },
  { id: 3, question: "Explain how Rhizobium bacteria help increase soil fertility.", answer: "Rhizobium bacteria live in the root nodules of leguminous plants like pea and gram. They convert nitrogen gas from the air into a form the plant can absorb and use. As the plant grows and eventually decomposes, this fixed nitrogen enriches the surrounding soil, increasing its fertility for future crops.", keyPoints: ["Rhizobium in root nodules", "Converts nitrogen gas to usable form", "Enriches soil over time"] },
  { id: 4, question: "Distinguish between a helpful and a harmful microorganism, giving one example of each.", answer: "A helpful microorganism benefits humans or the environment, such as the bacteria used to make curd. A harmful microorganism (a pathogen) causes disease or damage, such as the bacterium that causes cholera. The same broad group (like bacteria) can contain both types.", keyPoints: ["Helpful example given", "Harmful example given", "Notes both can exist in the same group"] },
  { id: 5, question: "Explain why the common cold cannot be cured using antibiotics.", answer: "The common cold is caused by a virus. Antibiotics work by disrupting processes specific to bacteria, such as their cell wall formation. Since viruses lack these bacterial structures and multiply differently, antibiotics have no target to act on and cannot treat viral infections like the common cold.", keyPoints: ["Common cold is viral", "Antibiotics target bacteria-specific processes", "No effect on viruses"] },
  { id: 6, question: "Explain the four common modes by which communicable diseases spread, with one example disease for each.", answer: "Air: droplets from coughing/sneezing spread diseases like the common cold. Water: contaminated water spreads diseases like cholera. Contact: touching an infected person or object can spread infections. Vectors: carriers like mosquitoes spread diseases like malaria.", keyPoints: ["All four modes named", "One correct example disease per mode"] },
  { id: 7, question: "Explain how vaccination provides protection against a disease, using the idea of the body's defences.", answer: "A vaccine introduces a weakened or killed form of a pathogen (or a part of it) into the body. This is too weak to cause the disease itself, but it trains the body's defence system to recognise this pathogen. If the real, active pathogen enters the body later, the defences respond quickly, often preventing illness.", keyPoints: ["Weakened/killed pathogen introduced", "Trains body's defences", "Quick response if real pathogen appears later"] },
  { id: 8, question: "Explain three ways individuals and communities can help prevent the spread of communicable diseases.", answer: "Vaccination trains the body in advance against specific diseases. Personal hygiene, such as regular handwashing, physically removes pathogens before they spread. Safe drinking water and proper sanitation prevent water-borne diseases from spreading through contaminated water.", keyPoints: ["Vaccination explained", "Hygiene explained", "Safe water/sanitation explained"] },
  { id: 9, question: "Explain why refrigeration helps preserve food, and why it does not preserve food forever.", answer: "Refrigeration lowers the temperature, which slows down the growth and activity of microorganisms considerably, delaying spoilage. However, it does not kill the microorganisms completely, so they can still grow slowly over time -- meaning refrigerated food will eventually spoil, just much more slowly than unrefrigerated food.", keyPoints: ["Slows microbial growth", "Does not kill microorganisms", "Food still eventually spoils"] },
  { id: 10, question: "Explain the process and purpose of pasteurisation.", answer: "Pasteurisation involves heating a liquid, such as milk, to a temperature high enough to kill most harmful microorganisms, then cooling it quickly. Its purpose is to make the liquid safer to consume and extend how long it stays fresh, though it does not make the liquid permanently free of all microorganisms.", keyPoints: ["Heating then rapid cooling", "Purpose: kill harmful microbes, extend freshness", "Not permanently sterile"] },
  { id: 11, question: "Describe the journey of nitrogen through the nitrogen cycle, starting from the air.", answer: "Nitrogen gas in the air is converted into a usable form by nitrogen-fixing bacteria like Rhizobium. Plants absorb this usable nitrogen through their roots, and animals obtain nitrogen compounds by eating plants. When organisms die or produce waste, decomposers release nitrogen compounds back into the soil, and denitrifying bacteria eventually convert some of it back into nitrogen gas, returning it to the air.", keyPoints: ["Fixation by bacteria", "Absorption by plants, passed to animals", "Decomposition and denitrification complete the cycle"] },
  { id: 12, question: "Explain why it would be incorrect to say 'all bacteria are harmful'.", answer: "While some bacteria are harmful pathogens, such as those causing cholera or typhoid, many other bacteria are extremely helpful -- for example, those used to make curd, or those that fix nitrogen in soil. Since the group 'bacteria' contains both harmful and helpful species, it is incorrect to label the entire group as simply harmful.", keyPoints: ["Harmful example given", "Helpful example given", "Explains why overgeneralisation is wrong"] },
  { id: 13, question: "Explain the concept of herd immunity and why it matters for a whole community.", answer: "Herd immunity occurs when a large enough portion of a population becomes immune to a disease, usually through vaccination. This greatly reduces the disease's opportunities to spread from person to person, which indirectly protects even those who are not immune, since the pathogen struggles to find new hosts to infect.", keyPoints: ["Large immune portion defined", "Reduces spread opportunities", "Protects non-immune individuals indirectly"] },
  { id: 14, question: "Explain, with an example, how a plant disease caused by a microorganism can affect farmers economically.", answer: "A plant disease like citrus canker, caused by a microorganism, can damage or destroy large portions of a crop such as citrus fruit. This reduces the amount of healthy produce available to sell, directly lowering the income farmers can earn from their affected crops.", keyPoints: ["Correct plant disease example", "Explains economic impact through crop damage"] },
  { id: 15, question: "Explain why food preservation methods generally work by preventing microbial growth rather than always killing every microorganism present.", answer: "Many preservation methods, such as refrigeration or salting, work by creating conditions (low temperature, low available water) where microorganisms cannot grow or multiply easily, rather than destroying them outright. This is often enough to keep food safe for a useful period, even though some microorganisms may still survive in a dormant or slow-growing state.", keyPoints: ["Explains prevention vs killing", "Notes some microorganisms may survive dormant"] },
  { id: 16, question: "Explain why hot springs are considered an extreme habitat, and what this tells us about certain microorganisms living there.", answer: "Hot springs have very high water temperatures that would destroy the cells of most living things. Microorganisms that survive there, called extremophiles, must have special adaptations allowing their cells to function normally even under such extreme heat, showing how varied microbial life can be." , keyPoints: ["Explains why hot springs are extreme", "Explains extremophile adaptation"] },
  { id: 17, question: "A farmer wants to naturally improve the nitrogen content of their soil without using chemical fertiliser. Suggest a method based on this chapter, and explain why it works.", answer: "The farmer could grow leguminous crops, such as pea or gram, which host nitrogen-fixing bacteria like Rhizobium in their root nodules. These bacteria convert atmospheric nitrogen into a usable form, enriching the soil naturally as the plants grow and later decompose.", keyPoints: ["Suggests leguminous crops/Rhizobium", "Explains the nitrogen-fixing mechanism"] },
  { id: 18, question: "Explain the difference between how a disease spreads through 'contact' versus through a 'vector', with one example of each.", answer: "Contact transmission happens when a healthy person directly touches an infected person or a contaminated object, transferring the pathogen directly. Vector transmission involves a carrier organism, such as a mosquito, that picks up a pathogen from one host and transfers it to another host through a bite -- for example, malaria spreading through mosquito bites.", keyPoints: ["Contact explained with example", "Vector explained with example"] },
  { id: 19, question: "Explain why a person recovering from a bacterial infection is usually given antibiotics, while a person with a viral infection typically is not.", answer: "Antibiotics act on processes specific to bacteria and are effective in stopping bacterial infections. Since viruses do not share these bacterial structures and multiply through host cells instead, antibiotics have no effect on them -- so doctors do not prescribe antibiotics for infections known to be viral, like most common colds." , keyPoints: ["Antibiotics work on bacteria-specific processes", "No effect on viral infections"] },
  { id: 20, question: "Explain why microorganisms found on a seemingly clean kitchen surface can still be a health concern.", answer: "Microorganisms are far too small to be seen by the naked eye, so a surface can appear completely clean while still carrying large numbers of them. If these include harmful pathogens, they could contaminate food or hands even though there is no visible sign of dirt.", keyPoints: ["Explains invisibility of microorganisms", "Explains potential health risk despite visible cleanliness"] },
  { id: 21, question: "Explain why vaccines are considered more effective when a large proportion of a population takes them, rather than just a few individuals.", answer: "When only a few individuals are vaccinated, the disease can still spread easily among the many unvaccinated people. When a large proportion is vaccinated, herd immunity develops, drastically reducing the disease's ability to spread through the community, protecting even those who could not be vaccinated.", keyPoints: ["Explains limited effect of few vaccinations", "Explains herd immunity benefit at scale"] },
  { id: 22, question: "Explain why boiling water before drinking it can help prevent certain diseases.", answer: "Boiling water to a high enough temperature kills most harmful microorganisms present in it, including those that cause diseases like cholera and typhoid, making the water much safer to drink.", keyPoints: ["Heat kills harmful microorganisms", "Prevents water-borne disease"] },
  { id: 23, question: "Explain the relationship between decomposers and the concept of a food source for growing plants.", answer: "Decomposers break down dead plants, animals, and waste material into simpler substances, including nutrients such as nitrogen compounds. These released nutrients return to the soil, where growing plants can absorb them again through their roots, supporting their growth.", keyPoints: ["Decomposers release nutrients", "Nutrients support plant growth"] },
  { id: 24, question: "Explain why a disease like foot-and-mouth disease affecting cattle is a concern for farmers, beyond the health of individual animals.", answer: "Foot-and-mouth disease can spread quickly among cattle, affecting large numbers of animals at once. This can reduce milk production, weaken animals' health and productivity, and cause significant economic loss for farmers who depend on their cattle.", keyPoints: ["Explains rapid spread among cattle", "Explains economic/productivity impact"] },
  { id: 25, question: "Explain why 'preventing' a communicable disease (through vaccination or hygiene) is generally considered better than only 'treating' it after infection.", answer: "Preventing a disease avoids the illness, discomfort, and potential complications altogether, and also stops the infected person from spreading it further to others. Treating a disease only after infection means the person has already suffered the illness and may have already spread it to others before treatment began.", keyPoints: ["Prevention avoids illness and further spread", "Treatment happens only after harm is already done"] },
];

// ── LONG (5 marks each) ──
export const SCIENCE8IW_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Describe, in detail, the five main groups of microorganisms, giving at least one distinguishing feature of each group.",
    markingScheme: [
      "Correctly describes bacteria",
      "Correctly describes fungi",
      "Correctly describes protozoa",
      "Correctly describes algae",
      "Correctly describes viruses, including their distinguishing feature"
    ],
    answerParts: [
      { part: "Bacteria", text: "Very simple, single-celled organisms; among the most common and widespread microorganisms on Earth." },
      { part: "Fungi", text: "Includes moulds and yeasts; some are single-celled (like yeast), while others form larger thread-like structures (like moulds)." },
      { part: "Protozoa", text: "Single-celled organisms that are usually able to move on their own, unlike most bacteria or fungi." },
      { part: "Algae", text: "Simple organisms, usually found in water, that can make their own food using sunlight." },
      { part: "Viruses", text: "Extremely tiny particles, far smaller than bacteria, that can only multiply inside the living cells of a host organism -- this is their key distinguishing feature from the other four groups." }
    ]
  },
  {
    id: 2,
    question: "Explain, in detail, how microorganisms are used to make three different everyday foods, describing the specific process involved in each case.",
    markingScheme: [
      "Correctly explains curd formation with the responsible microorganism",
      "Correctly explains bread-making with the responsible microorganism",
      "Correctly explains a third food (idli/dosa batter or alcohol/vinegar) with reasoning",
      "Uses the term 'fermentation' correctly across all examples",
      "Draws a clear overall conclusion linking all three examples"
    ],
    answerParts: [
      { part: "Curd", text: "A type of bacteria ferments the sugars present in milk, converting it into curd through this fermentation process." },
      { part: "Bread", text: "Yeast, a fungus, is added to dough along with sugar. During fermentation, yeast breaks down the sugar and releases gas bubbles, which get trapped in the dough, making it rise before baking." },
      { part: "Idli/dosa batter", text: "Fermentation by microorganisms present in the batter causes it to rise and develop its characteristic taste and texture before it is cooked." },
      { part: "Common thread", text: "In every case, fermentation -- microorganisms breaking down sugars to produce acids or gases -- is the underlying process, even though the specific microorganism and food product differ each time." },
      { part: "Final Answer", text: "Curd, bread, and idli/dosa batter are all produced using fermentation by specific microorganisms, showing how the same general process can be used to create very different everyday foods." }
    ]
  },
  {
    id: 3,
    question: "Explain the complete role of microorganisms in the nitrogen cycle, from nitrogen gas in the air to its eventual return to the atmosphere.",
    markingScheme: [
      "Correctly explains nitrogen fixation and the bacteria responsible",
      "Correctly explains how plants and then animals obtain nitrogen",
      "Correctly explains the role of decomposers",
      "Correctly explains denitrification",
      "Draws a clear, well-reasoned final conclusion describing the full cycle"
    ],
    answerParts: [
      { part: "Nitrogen fixation", text: "Nitrogen gas makes up a large share of the air, but plants cannot use it directly. Nitrogen-fixing bacteria, such as Rhizobium found in the root nodules of leguminous plants, convert this nitrogen gas into a usable form in the soil." },
      { part: "Plants and animals", text: "Plants absorb this usable nitrogen through their roots and use it to grow. Animals then obtain nitrogen compounds by eating plants (or other animals)." },
      { part: "Decomposers", text: "When plants and animals die, or produce waste, decomposer bacteria and fungi break this material down, releasing the nitrogen compounds trapped inside it back into the soil." },
      { part: "Denitrification", text: "Certain other bacteria, called denitrifying bacteria, convert some of these nitrogen compounds back into nitrogen gas, which returns to the atmosphere." },
      { part: "Final Answer", text: "Nitrogen continuously moves between the air, soil, plants, and animals through the combined actions of nitrogen-fixing bacteria, decomposers, and denitrifying bacteria -- forming a complete, ongoing cycle rather than a one-way process." }
    ]
  },
  {
    id: 4,
    question: "Explain, in detail, the four common modes of disease transmission, and describe one specific prevention method that directly targets each mode.",
    markingScheme: [
      "Correctly explains airborne transmission with a matching prevention method",
      "Correctly explains water-borne transmission with a matching prevention method",
      "Correctly explains contact transmission with a matching prevention method",
      "Correctly explains vector-borne transmission with a matching prevention method",
      "Draws a clear final conclusion connecting mode and prevention"
    ],
    answerParts: [
      { part: "Air", text: "Diseases like the common cold and tuberculosis spread through droplets released while coughing or sneezing. Prevention: covering the mouth and nose while coughing or sneezing traps these droplets, reducing the chance of spreading pathogens to others." },
      { part: "Water", text: "Diseases like cholera and typhoid spread through water contaminated with pathogens. Prevention: drinking clean, safe water (boiled or properly treated) prevents this route of infection." },
      { part: "Contact", text: "Certain infections can spread by touching an infected person or a contaminated object. Prevention: regular handwashing removes pathogens from the skin before they can be transferred further." },
      { part: "Vectors", text: "Diseases like malaria spread through carriers such as the female Anopheles mosquito. Prevention: removing stagnant water (where mosquitoes breed) and using mosquito nets reduces the chances of being bitten." },
      { part: "Final Answer", text: "Each mode of transmission has its own specific weak point that a matching prevention method directly targets -- understanding exactly how a disease spreads is essential for choosing an effective way to stop it." }
    ]
  },
  {
    id: 5,
    question: "Explain, in detail, how vaccination works, why it does not cause the disease itself, and how widespread vaccination benefits an entire community through herd immunity.",
    markingScheme: [
      "Correctly explains what a vaccine contains",
      "Correctly explains why the vaccine does not cause the disease",
      "Correctly explains how the body's defences respond after vaccination",
      "Correctly explains herd immunity",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "What a vaccine contains", text: "A vaccine contains a weakened, killed, or partial form of a specific pathogen." },
      { part: "Why it does not cause disease", text: "This form is deliberately made too weak (or incomplete) to cause the actual illness in a healthy person." },
      { part: "How the body responds", text: "Despite being weak, it is still enough for the body's defence system to recognise the pathogen and learn how to fight it. If the real, active pathogen is encountered later, the body can respond quickly and effectively, often preventing serious illness." },
      { part: "Herd immunity", text: "When a large enough portion of a population is vaccinated and therefore immune, the pathogen has far fewer opportunities to spread from person to person. This indirectly protects even people who could not be vaccinated, since the disease struggles to reach them through a mostly-immune community." },
      { part: "Final Answer", text: "Vaccination safely trains the body's defences using a harmless form of a pathogen, and when enough people in a community are vaccinated, herd immunity provides protection that extends beyond just the vaccinated individuals themselves." }
    ]
  },
  {
    id: 6,
    question: "Compare and contrast helpful and harmful microorganisms in detail, using at least two examples of each, and explain why it is scientifically incorrect to describe an entire group (such as 'bacteria') as simply good or bad.",
    markingScheme: [
      "Gives two correct examples of helpful microorganisms with their benefit explained",
      "Gives two correct examples of harmful microorganisms with their harm explained",
      "Explains clearly why grouping by broad category (like 'bacteria') is misleading",
      "Notes that the same broad group can contain both helpful and harmful members",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Helpful examples", text: "The bacteria that ferment milk into curd are helpful, providing a common everyday food. Rhizobium bacteria, which fix nitrogen in plant roots, are helpful by improving soil fertility for farmers." },
      { part: "Harmful examples", text: "The bacterium that causes cholera is harmful, causing serious illness through contaminated water. The virus that causes measles is harmful, causing a communicable childhood disease." },
      { part: "Why broad grouping is misleading", text: "Both the curd-making bacteria and the cholera-causing bacteria belong to the same broad category, 'bacteria' -- yet one is helpful and the other is harmful. Labelling the whole group as simply 'good' or 'bad' ignores this important difference between specific species." },
      { part: "Same group, different roles", text: "This pattern holds across microorganism groups generally: fungi include both helpful antibiotic-producing species and harmful disease-causing species, just as bacteria do." },
      { part: "Final Answer", text: "Whether a microorganism is helpful or harmful depends on the specific species, not on its broad group -- describing an entire group like 'bacteria' as simply good or bad is a scientifically inaccurate overgeneralisation." }
    ]
  },
  {
    id: 7,
    question: "Explain, in detail, at least four different methods of food preservation, describing the specific reason each method prevents or slows microbial growth.",
    markingScheme: [
      "Correctly explains salting/sugaring and the underlying reason",
      "Correctly explains heat-based methods (boiling/pasteurisation) and the underlying reason",
      "Correctly explains cold-based methods (refrigeration/freezing) and the underlying reason",
      "Correctly explains airtight/vacuum packing and the underlying reason",
      "Draws a clear final conclusion comparing killing versus slowing microbial growth"
    ],
    answerParts: [
      { part: "Salting/sugaring", text: "Salt and sugar both draw water out of food and out of any microorganisms present, creating a dry environment where microorganisms cannot easily grow or multiply." },
      { part: "Heat-based methods", text: "Boiling and pasteurisation use heat to kill most harmful microorganisms present in the food or liquid at that time, making it safer to consume." },
      { part: "Cold-based methods", text: "Refrigeration and freezing lower the temperature, slowing down the growth and activity of microorganisms considerably, without necessarily killing them." },
      { part: "Airtight/vacuum packing", text: "Removing air from food packaging creates conditions unsuitable for the many microorganisms that require air to grow and multiply." },
      { part: "Final Answer", text: "Heat-based methods mainly work by killing microorganisms already present, while salting, cold storage, and airtight packing mainly work by preventing or slowing further microbial growth -- understanding this difference explains why refrigerated food still eventually spoils, while properly heat-treated and sealed food can last much longer." }
    ]
  },
  {
    id: 8,
    question: "A farmer's crop is showing symptoms of a suspected plant disease. Describe, step by step, how the farmer could investigate the cause and what general steps could help manage the situation, connecting your answer to ideas about pathogens and disease spread.",
    markingScheme: [
      "Suggests a reasonable first step (careful observation of symptoms)",
      "Suggests seeking expert confirmation of the specific pathogen involved",
      "Explains how understanding the mode of spread would help manage the situation",
      "Suggests a reasonable management step based on the type of pathogen",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Step 1: Observation", text: "The farmer should carefully observe and record the exact symptoms appearing on the affected plants (such as spots, wilting, or discolouration), and note which plants and areas are affected." },
      { part: "Step 2: Expert confirmation", text: "Since different pathogens (bacteria, fungi, or viruses) can cause similar-looking symptoms, the farmer should seek expert confirmation of the specific pathogen responsible, since treatments differ depending on the type of pathogen." },
      { part: "Step 3: Understanding spread", text: "Knowing how the specific disease spreads (through contaminated tools, insects, water, or direct contact between plants) would help the farmer take targeted steps, such as isolating affected plants or disinfecting tools between uses." },
      { part: "Step 4: Management", text: "Depending on the pathogen identified, appropriate management could include removing and destroying severely affected plants to prevent further spread, or using an approved treatment suited to that specific type of pathogen." },
      { part: "Final Answer", text: "Effectively managing a plant disease requires first identifying the specific pathogen responsible and understanding exactly how it spreads, since this determines which prevention and management steps will actually be effective." }
    ]
  },
  {
    id: 9,
    question: "Explain, in detail, why understanding the difference between bacteria and viruses is important for choosing the correct medical treatment, using the example of antibiotics.",
    markingScheme: [
      "Correctly explains how antibiotics work against bacteria",
      "Correctly explains why viruses are structurally different from bacteria",
      "Correctly explains why antibiotics have no effect on viruses",
      "Gives a correct real-world example illustrating the consequence of this difference",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "How antibiotics work", text: "Antibiotics work by disrupting specific processes found in bacteria, such as the building of their cell walls, which stops the bacteria from surviving or multiplying." },
      { part: "Why viruses are different", text: "Viruses do not have the same cellular structures as bacteria (such as a cell wall); instead, they multiply by using the machinery inside a host's own living cells." },
      { part: "Why antibiotics fail against viruses", text: "Since antibiotics specifically target bacterial structures that viruses do not have, there is nothing for the antibiotic to act on inside a virus, so it has no effect on viral infections." },
      { part: "Real-world example", text: "A patient with a common cold (caused by a virus) will not benefit from taking antibiotics, and unnecessary use of antibiotics in such cases is generally avoided by doctors." },
      { part: "Final Answer", text: "Understanding whether an infection is bacterial or viral is essential for effective treatment, since antibiotics are effective specifically against bacteria and have no effect on viral infections at all." }
    ]
  },
  {
    id: 10,
    question: "Explain, in detail, how the discovery of microorganisms changed our understanding of the causes of disease and everyday food processes, connecting this to the broader idea of scientific inquiry.",
    markingScheme: [
      "Explains the state of knowledge before microorganisms were observed",
      "Explains how the microscope revealed the existence of microorganisms",
      "Explains how this changed understanding of disease causes",
      "Explains how this changed understanding of food processes like fermentation",
      "Draws a clear, well-reasoned final conclusion connecting to scientific inquiry"
    ],
    answerParts: [
      { part: "Before microorganisms were known", text: "Before microscopes existed, there was no way to observe the tiny living organisms responsible for many everyday phenomena, and the true causes of many diseases and food changes (like milk turning into curd) were not understood." },
      { part: "The microscope's role", text: "Antonie van Leeuwenhoek's simple microscope allowed, for the first time, direct observation of this previously invisible world of tiny living organisms." },
      { part: "Changed understanding of disease", text: "Once microorganisms could be observed and studied, specific pathogens could be identified as the actual causes of particular diseases, replacing earlier, less accurate explanations." },
      { part: "Changed understanding of food processes", text: "Processes like fermentation, previously just accepted as something that happened, could now be understood scientifically as the result of specific microorganisms acting on food, allowing these processes to be studied and controlled more precisely." },
      { part: "Final Answer", text: "The discovery of microorganisms, made possible by a new tool (the microscope), is a clear example of how developing better ways to observe nature can completely transform scientific understanding -- directly connecting to the idea, from the previous chapter, that better observation tools lead to deeper, more accurate knowledge." }
    ]
  },
  {
    id: 11,
    question: "Design a set of practical guidelines for a school canteen to reduce the risk of food-borne illness, explaining the scientific reasoning behind each guideline using ideas from this chapter.",
    markingScheme: [
      "Suggests a reasonable guideline about food storage/preservation with reasoning",
      "Suggests a reasonable guideline about hygiene with reasoning",
      "Suggests a reasonable guideline about food preparation/cooking with reasoning",
      "Suggests a reasonable guideline about handling raw versus cooked food with reasoning",
      "Draws a clear final conclusion connecting all guidelines to preventing microbial contamination"
    ],
    answerParts: [
      { part: "Guideline 1: Proper storage", text: "Perishable food should be refrigerated promptly. Reasoning: low temperature slows down microbial growth, reducing the risk of spoilage and food poisoning." },
      { part: "Guideline 2: Hygiene", text: "Kitchen staff should wash their hands thoroughly before handling food. Reasoning: handwashing physically removes pathogens that could otherwise contaminate the food." },
      { part: "Guideline 3: Proper cooking", text: "Food should be cooked thoroughly at a high enough temperature. Reasoning: heat kills most harmful microorganisms that may be present in raw ingredients." },
      { part: "Guideline 4: Separating raw and cooked food", text: "Raw and cooked foods should be kept and prepared separately. Reasoning: this avoids transferring pathogens from raw food (which may carry more microorganisms) onto already-cooked food that will not be heated again." },
      { part: "Final Answer", text: "Each guideline directly targets a specific way microorganisms could grow on or contaminate food, together forming a practical system for reducing the risk of food-borne illness in the canteen." }
    ]
  },
  {
    id: 12,
    question: "Explain, in detail, why a village experiencing a cholera outbreak after a flood should focus its emergency response on water safety, using ideas about disease transmission from this chapter.",
    markingScheme: [
      "Correctly identifies cholera as a water-borne bacterial disease",
      "Explains how flooding could lead to water contamination",
      "Explains why targeting water specifically would be an effective response",
      "Suggests at least one specific, reasonable action for the emergency response",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Cholera as a water-borne disease", text: "Cholera is a disease caused by bacteria that commonly spreads through water contaminated with the pathogen." },
      { part: "How flooding contaminates water", text: "Floods can mix sewage, waste, and other contaminated material into drinking water sources, greatly increasing the chance that the water now carries the cholera-causing bacteria." },
      { part: "Why targeting water is effective", text: "Since cholera spreads mainly through contaminated water, ensuring the community has access to clean, safe drinking water (through boiling, water treatment, or safe distribution) directly blocks the main pathway the disease uses to spread." },
      { part: "A specific action", text: "Distributing boiled or properly treated water, and advising residents to boil any water before drinking, would be a reasonable and effective immediate response." },
      { part: "Final Answer", text: "Since cholera spreads primarily through contaminated water, and floods are a common cause of such contamination, focusing the emergency response on restoring safe water access directly addresses the specific transmission route responsible for the outbreak." }
    ]
  },
  {
    id: 13,
    question: "Explain, in detail, the concept of extremophiles, why their existence is scientifically significant, and how it relates to the wider idea that microorganisms are found almost everywhere.",
    markingScheme: [
      "Correctly defines extremophiles",
      "Gives a correct example of an extreme environment",
      "Explains why most other living things could not survive there",
      "Explains the scientific significance of extremophiles existing",
      "Draws a clear final conclusion connecting to the wider habitat idea"
    ],
    answerParts: [
      { part: "Defining extremophiles", text: "Extremophiles are microorganisms specially adapted to survive in extreme environmental conditions." },
      { part: "Example environment", text: "Very hot springs, where water temperatures would be far too high for most living cells to function or survive." },
      { part: "Why most life could not survive", text: "Extreme heat (or other harsh conditions like very high acidity) can damage or destroy the basic cell structures that most living things depend on to function." },
      { part: "Scientific significance", text: "The existence of organisms able to survive such extreme conditions shows that life, at the microbial scale, can adapt to survive in a much wider range of environments than was once assumed possible." },
      { part: "Final Answer", text: "Extremophiles are a striking example of the broader idea that microorganisms are found almost everywhere -- their survival in conditions lethal to most other life expands our understanding of just how widely microbial life can exist." }
    ]
  },
  {
    id: 14,
    question: "Explain, in detail, the role of microorganisms in maintaining a balanced natural environment, drawing together ideas about decomposition, the nitrogen cycle, and waste treatment.",
    markingScheme: [
      "Explains the role of decomposers in breaking down dead matter",
      "Explains the connection between decomposers and the nitrogen cycle",
      "Explains the role of microorganisms in sewage/waste treatment",
      "Explains what might happen to the environment without these microbial roles",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Decomposition", text: "Decomposer bacteria and fungi break down dead plants, animals, and waste material into simpler substances, preventing dead matter from simply piling up indefinitely." },
      { part: "Connection to the nitrogen cycle", text: "This decomposition releases nitrogen compounds trapped inside dead matter back into the soil, allowing the nitrogen cycle to continue and supporting the growth of new plants." },
      { part: "Waste/sewage treatment", text: "Microorganisms are also deliberately used in sewage treatment plants to break down harmful waste material in human-produced sewage, making the resulting water safer before it is released back into the environment." },
      { part: "Without these roles", text: "Without decomposers and waste-treating microorganisms, dead matter and waste would accumulate indefinitely, nutrients like nitrogen would remain locked away rather than being recycled, and untreated sewage would pose a much greater risk to water sources and public health." },
      { part: "Final Answer", text: "Microorganisms play an essential, ongoing role in maintaining environmental balance -- through decomposition, enabling the nitrogen cycle, and treating waste -- all of which prevent the buildup of dead matter and recycle essential nutrients back into use." }
    ]
  },
  {
    id: 15,
    question: "Explain, in detail, why a disease-prevention campaign in a community should combine vaccination, hygiene education, and vector control, rather than relying on just one method alone.",
    markingScheme: [
      "Explains what vaccination specifically addresses",
      "Explains what hygiene education specifically addresses",
      "Explains what vector control specifically addresses",
      "Explains why no single method covers every mode of disease transmission",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "What vaccination addresses", text: "Vaccination trains the body's defences against specific pathogens in advance, but it does not physically stop a pathogen already present in the environment from existing or spreading through non-vaccinated routes." },
      { part: "What hygiene addresses", text: "Hygiene education (like handwashing and covering coughs) reduces the spread of pathogens through contact and airborne routes, but has little effect on diseases spread mainly through vectors like mosquitoes." },
      { part: "What vector control addresses", text: "Vector control (removing stagnant water, using nets) reduces diseases spread by carriers like mosquitoes, but does little to prevent diseases spread through direct contact or contaminated water." },
      { part: "Why one method is not enough", text: "Since diseases can spread through several different modes (air, water, contact, and vectors), relying on only one prevention method would leave other transmission routes completely unaddressed." },
      { part: "Final Answer", text: "A comprehensive disease-prevention campaign needs to combine vaccination, hygiene education, and vector control together, since each method specifically targets a different transmission route, and no single method alone can address every way a disease might spread." }
    ]
  },
  {
    id: 16,
    question: "A packaged food item states 'Best refrigerated after opening' but has no expiry date issue and was stored correctly before opening. Explain, using ideas from this chapter, why refrigeration becomes necessary specifically after opening.",
    markingScheme: [
      "Explains the sealed/airtight condition before opening",
      "Explains what changes once the package is opened",
      "Explains why refrigeration becomes necessary at that point",
      "Explains why refrigeration alone is still not a permanent solution",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Before opening", text: "While sealed, the packaging likely keeps the food airtight and free from newly introduced microorganisms, similar to how vacuum packing helps preserve food." },
      { part: "What changes after opening", text: "Once opened, the food is exposed to air and to microorganisms present in the surrounding environment, which can begin to grow on the food." },
      { part: "Why refrigeration becomes necessary", text: "Refrigeration slows down the growth of these newly introduced microorganisms, helping to keep the food safe for a reasonably longer period after the airtight seal has been broken." },
      { part: "Why it is still not permanent", text: "Refrigeration only slows microbial growth rather than stopping it completely, so even a refrigerated, opened food item will eventually spoil if kept long enough." },
      { part: "Final Answer", text: "Refrigeration becomes necessary after opening because the airtight protection is lost, exposing the food to new microorganisms -- and while refrigeration slows their growth considerably, it does not preserve the food indefinitely." }
    ]
  },
  {
    id: 17,
    question: "Explain, in detail, why doctors recommend completing a full course of antibiotics even after symptoms of a bacterial infection have improved.",
    markingScheme: [
      "Explains what antibiotics do to a bacterial population over the course of treatment",
      "Explains why symptoms improving does not necessarily mean all bacteria are gone",
      "Explains the risk of stopping treatment early",
      "Connects this to the general idea of pathogens and disease",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "What antibiotics do over time", text: "Antibiotics gradually reduce the number of harmful bacteria in the body over the full course of treatment, rather than eliminating them all instantly." },
      { part: "Why symptoms improve before bacteria are gone", text: "Symptoms often improve once the bacteria are significantly reduced, even though a smaller number may still remain in the body at that point." },
      { part: "Risk of stopping early", text: "Stopping the antibiotic course early could allow the remaining bacteria to survive and multiply again, potentially causing the infection to return." },
      { part: "Connection to pathogens", text: "Since the infection is still technically present at a lower level, prematurely stopping treatment leaves the underlying pathogen still active in the body." },
      { part: "Final Answer", text: "Completing the full antibiotic course ensures that the harmful bacteria are reduced as thoroughly as possible, rather than just enough to relieve symptoms, reducing the risk of the infection returning." }
    ]
  },
  {
    id: 18,
    question: "Explain, in detail, how the same underlying scientific idea -- using microorganisms deliberately for a purpose -- connects fermentation in food, nitrogen fixation in agriculture, and antibiotic production in medicine.",
    markingScheme: [
      "Explains fermentation as a deliberate use of microorganisms",
      "Explains nitrogen fixation as a deliberate/naturally-supported use of microorganisms",
      "Explains antibiotic production as a deliberate use of microorganisms",
      "Identifies the shared underlying idea across all three",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Fermentation", text: "Humans deliberately use specific microorganisms (like bacteria for curd, yeast for bread) because these organisms naturally carry out a useful chemical process (fermentation) as part of their own biology." },
      { part: "Nitrogen fixation", text: "Farmers grow leguminous crops specifically because the nitrogen-fixing bacteria living in their roots naturally carry out a process (converting nitrogen gas into a usable form) that benefits soil fertility." },
      { part: "Antibiotic production", text: "Antibiotics like penicillin are produced using fungi that naturally create substances capable of stopping bacterial growth, which humans have learned to harness and produce on a larger scale." },
      { part: "Shared underlying idea", text: "In every case, a microorganism carries out a natural biological process as part of its own survival or behaviour, and humans have learned to recognise this process and use it deliberately for a specific practical benefit." },
      { part: "Final Answer", text: "Fermentation, nitrogen fixation, and antibiotic production are all examples of humans harnessing a microorganism's own natural biological activity for a specific, practical human purpose -- showing a shared underlying pattern across very different fields." }
    ]
  },
  {
    id: 19,
    question: "Explain, in detail, why a single case of a plant showing disease symptoms in a large field should be investigated quickly, connecting your answer to ideas about communicable disease and pathogens.",
    markingScheme: [
      "Explains that plant diseases caused by microorganisms can be communicable between plants",
      "Explains a plausible way the disease could spread within the field",
      "Explains the risk of delaying investigation",
      "Suggests a reasonable early action",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Plant diseases can spread", text: "Just like diseases in humans and animals, plant diseases caused by pathogens (bacteria, fungi, or viruses) can spread from an infected plant to healthy ones nearby." },
      { part: "Possible spread route", text: "The pathogen could spread through direct contact between plants, through contaminated tools used across multiple plants, through insects, or through water moving across the field." },
      { part: "Risk of delay", text: "If investigation and action are delayed, the pathogen may have more time to spread to many more plants, potentially turning a single affected plant into a much larger outbreak across the field." },
      { part: "A reasonable early action", text: "Isolating or closely monitoring the affected plant, and avoiding using the same tools on healthy plants without cleaning them, could help limit early spread while the cause is being confirmed." },
      { part: "Final Answer", text: "Just as with communicable diseases in humans, a plant disease caused by a pathogen can spread further if left unaddressed -- quick investigation and early precautionary steps can help limit the spread before it affects a much larger part of the field." }
    ]
  },
  {
    id: 20,
    question: "Explain, in detail, the overall relationship between microorganisms and humans as presented in this chapter, covering both the helpful and harmful sides, and explain why a balanced understanding is more scientifically accurate than viewing microorganisms as purely one or the other.",
    markingScheme: [
      "Summarises the helpful roles of microorganisms with examples",
      "Summarises the harmful roles of microorganisms with examples",
      "Explains that helpfulness or harm depends on the specific species, not the broad group",
      "Explains why a one-sided view (purely helpful or purely harmful) would be inaccurate",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Helpful roles", text: "Microorganisms help produce everyday foods through fermentation, provide medicines like antibiotics and vaccines, improve soil fertility through nitrogen fixation, and clean up waste through decomposition and sewage treatment." },
      { part: "Harmful roles", text: "Certain microorganisms act as pathogens, causing communicable diseases in humans (such as cholera and the common cold), animals (such as anthrax), and plants (such as citrus canker)." },
      { part: "Depends on the specific species", text: "Whether a microorganism is helpful or harmful depends on the specific species involved, not on its broad group -- bacteria, for example, include both the helpful curd-making species and the harmful cholera-causing species." },
      { part: "Why a one-sided view is inaccurate", text: "Viewing microorganisms as purely harmful would ignore their essential, widespread benefits in food, medicine, agriculture, and the environment; viewing them as purely helpful would ignore the real risks posed by disease-causing pathogens." },
      { part: "Final Answer", text: "A scientifically accurate understanding of microorganisms recognises both their essential helpful roles and their potential to cause harm, depending on the specific species involved -- a balanced view that avoids the inaccuracy of treating the entire microbial world as simply good or bad." }
    ]
  },
];

// ── COMPETENCY / CASE-BASED (4 marks each) ──
export const SCIENCE8IW_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Curious Case of the Rising Dough",
    caseDescription: "Meera adds a small packet of yeast to bread dough along with some sugar and warm water, and notices the dough doubling in size after an hour, with a slightly sour smell.",
    subQuestions: [
      { question: "What process is responsible for the dough rising?", answer: "Fermentation, carried out by the yeast." },
      { question: "Which group of microorganisms does yeast belong to?", answer: "Fungi." },
      { question: "Explain why sugar was added along with the yeast.", answer: "Sugar provides the food source that yeast breaks down during fermentation, producing the gas bubbles that make the dough rise." },
      { question: "Why might the dough have a slightly sour smell?", answer: "Fermentation can produce acidic substances as a byproduct, alongside the gas, which can give the dough a mild sour smell." }
    ]
  },
  {
    id: 2,
    caseTitle: "The Farmer's Nitrogen Question",
    caseDescription: "A farmer notices that a field where pea plants were grown last season seems to produce a healthier wheat crop this season, without adding extra fertiliser.",
    subQuestions: [
      { question: "Suggest a scientific reason for this observation.", answer: "Pea plants host nitrogen-fixing bacteria (Rhizobium) in their root nodules, which convert atmospheric nitrogen into a usable form, enriching the soil with nitrogen that benefits the next crop." },
      { question: "Name the specific bacterium responsible for this effect.", answer: "Rhizobium." },
      { question: "Where exactly do these bacteria live on the pea plant?", answer: "In the root nodules of the pea plant." },
      { question: "Suggest why farmers might deliberately rotate leguminous crops like peas with other crops.", answer: "To naturally improve soil nitrogen levels between growing seasons, potentially reducing the amount of chemical fertiliser needed for future crops." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Village Water Contamination Scare",
    caseDescription: "After heavy rains, several villagers fall ill with symptoms of severe diarrhoea, and health workers suspect the community's water source has become contaminated.",
    subQuestions: [
      { question: "Name a bacterial disease that commonly spreads this way and matches these symptoms.", answer: "Cholera." },
      { question: "Explain how heavy rains could have led to this situation.", answer: "Heavy rains and flooding can mix sewage, waste, or other contaminated material into drinking water sources, introducing disease-causing pathogens into the water supply." },
      { question: "Suggest an immediate action the community could take to protect themselves.", answer: "Boil water before drinking it, or use a properly treated/safe alternative water source, since boiling kills most harmful microorganisms present." },
      { question: "Explain why this disease is classified as 'communicable'.", answer: "Because it can spread from contaminated sources (or infected individuals) to healthy people, especially when many people share the same contaminated water supply." }
    ]
  },
  {
    id: 4,
    caseTitle: "The Overprescribed Antibiotic",
    caseDescription: "A child with a common cold is taken to a doctor, and the parent insists on getting antibiotics 'just to be safe', but the doctor explains that antibiotics will not help in this case.",
    subQuestions: [
      { question: "What type of microorganism causes the common cold?", answer: "A virus." },
      { question: "Explain why antibiotics would not help treat this illness.", answer: "Antibiotics work on processes specific to bacteria; since a virus lacks these structures and multiplies differently (using host cells), antibiotics have no effect on viral infections like the common cold." },
      { question: "Suggest what kind of illness antibiotics WOULD actually be appropriate for.", answer: "A bacterial infection, such as typhoid or tuberculosis." },
      { question: "Explain, in your own words, why it might actually be unhelpful to take antibiotics unnecessarily.", answer: "Since antibiotics would have no effect on a viral infection, taking them unnecessarily would not help treat the illness, and could contribute to bacteria elsewhere becoming used to antibiotics over time, making future bacterial infections harder to treat." }
    ]
  },
  {
    id: 5,
    caseTitle: "The School Vaccination Drive",
    caseDescription: "A school organises a vaccination drive so that nearly all students receive a vaccine against a particular communicable disease, even though a handful of students with medical conditions cannot be vaccinated.",
    subQuestions: [
      { question: "What term describes the protection that even the unvaccinated students might indirectly receive?", answer: "Herd immunity." },
      { question: "Explain why the unvaccinated students could still be protected.", answer: "Since most students around them are immune, the disease has far fewer opportunities to spread within the school, reducing the chance that the pathogen ever reaches the unvaccinated students." },
      { question: "Why would herd immunity likely be weaker if only half the students were vaccinated instead of nearly all of them?", answer: "With only half immune, the disease would still have many more unvaccinated students through which to spread, making it much easier for the pathogen to keep circulating and eventually reach the vulnerable, unvaccinated individuals." },
      { question: "Explain how a vaccine trains the body without causing the actual disease.", answer: "A vaccine contains a weakened or killed form of the pathogen (or a part of it), which is too weak to cause illness but is still enough for the body's defences to learn to recognise and fight it." }
    ]
  },
  {
    id: 6,
    caseTitle: "The Mysterious Spoiled Milk",
    caseDescription: "A family buys pasteurised milk, leaves it unrefrigerated on the kitchen counter for three days, and finds it has spoiled and developed a sour smell.",
    subQuestions: [
      { question: "Was it correct for the family to assume pasteurised milk cannot spoil?", answer: "No -- pasteurisation only kills the harmful microorganisms present at the time of treatment; it does not make the milk permanently free of all microorganisms." },
      { question: "Explain how new microorganisms could have gotten into the milk after pasteurisation.", answer: "New microorganisms from the air, the container, or handling could enter the milk after the pasteurisation process was completed." },
      { question: "What should the family have done differently to keep the milk fresh longer?", answer: "They should have refrigerated the milk promptly, since low temperature slows down the growth of any microorganisms that enter after pasteurisation." },
      { question: "Explain why the milk developed a sour smell.", answer: "Microorganisms growing in the milk over the three unrefrigerated days likely fermented components of the milk, producing acidic substances responsible for the sour smell." }
    ]
  },
  {
    id: 7,
    caseTitle: "The Mosquito Breeding Investigation",
    caseDescription: "A health team visits a neighbourhood with a high number of malaria cases and finds several containers of stagnant water left uncovered in yards and near homes.",
    subQuestions: [
      { question: "Explain the connection between the stagnant water and the malaria cases.", answer: "Stagnant water is a breeding site for mosquitoes, including the female Anopheles mosquito, which acts as a vector transmitting the malaria parasite between people." },
      { question: "Name the type of microorganism that actually causes malaria.", answer: "A protozoan parasite." },
      { question: "Suggest one action the health team should recommend to reduce malaria cases in this area.", answer: "Removing or covering stagnant water sources to eliminate mosquito breeding sites (also acceptable: encouraging the use of mosquito nets)." },
      { question: "Explain why simply treating the current malaria patients would not fully solve the neighbourhood's problem.", answer: "Treating existing patients does not remove the mosquito breeding sites that continue producing new mosquitoes capable of infecting more people, so the underlying source of spread would remain unaddressed." }
    ]
  },
  {
    id: 8,
    caseTitle: "The Citrus Orchard Outbreak",
    caseDescription: "An orchard owner notices strange lesions appearing on the leaves and fruit of several citrus trees, and the affected trees seem to be spreading the symptoms to nearby trees over a few weeks.",
    subQuestions: [
      { question: "Name a plant disease that matches this description.", answer: "Citrus canker." },
      { question: "What causes citrus canker?", answer: "A microorganism (a specific type of bacteria) that infects citrus plants." },
      { question: "Suggest why the disease might be spreading to nearby trees over time.", answer: "The pathogen could be spreading between trees through contact, wind-blown rain, contaminated tools, or insects moving between infected and healthy trees." },
      { question: "Suggest one management step the orchard owner could take to help limit further spread.", answer: "Removing and properly disposing of severely affected branches or trees, and disinfecting tools used between trees, to reduce the chances of spreading the pathogen further." }
    ]
  },
  {
    id: 9,
    caseTitle: "The Pickle-Making Grandmother",
    caseDescription: "A grandmother prepares a large batch of mango pickle using generous amounts of salt, oil, and spices, and explains that pickles made this way can last for many months without spoiling, unlike fresh mango slices.",
    subQuestions: [
      { question: "Explain how the salt used in the pickle helps prevent spoilage.", answer: "Salt draws water out of the mango pieces and out of any microorganisms present, creating a dry environment where microorganisms struggle to grow." },
      { question: "Explain how the oil used in the pickle might also help preservation.", answer: "Oil can help seal the food away from air and moisture, creating conditions unsuitable for many microorganisms that need air or water to grow." },
      { question: "Why would fresh, unpreserved mango slices spoil much faster than the pickle?", answer: "Fresh mango slices have plenty of available water and no protective salt/oil barrier, allowing microorganisms to grow on them relatively quickly." },
      { question: "Does the fact that the pickle lasts for months mean it contains absolutely no microorganisms at all?", answer: "Not necessarily -- the preservation methods mainly slow down or prevent microbial growth rather than guaranteeing the complete absence of every microorganism." }
    ]
  },
  {
    id: 10,
    caseTitle: "The Cattle Farm Health Scare",
    caseDescription: "Several cattle on a farm show symptoms of a serious illness, and a veterinarian confirms it is anthrax, advising the farmer to take strict precautions.",
    subQuestions: [
      { question: "What type of microorganism causes anthrax?", answer: "A type of bacterium." },
      { question: "Explain why the veterinarian would advise strict precautions, beyond just treating the sick cattle.", answer: "Anthrax can potentially spread from infected cattle to humans, so precautions are needed to protect the people handling or in contact with the affected animals, not just to treat the cattle themselves." },
      { question: "Suggest one reasonable precaution the farmer could take.", answer: "Isolating the affected cattle from healthy animals and from people, and following veterinary guidance on safe handling and disposal, to prevent further spread." },
      { question: "Explain why this scenario shows that microorganisms causing disease are not limited to affecting only humans.", answer: "Anthrax primarily affects cattle (an animal), and can also spread to humans -- showing that pathogens can cause disease in animals as well as humans, not exclusively one or the other." }
    ]
  },
  {
    id: 11,
    caseTitle: "The Hot Spring Discovery",
    caseDescription: "Scientists studying a very hot natural spring, where water temperatures are far too high for most living things to survive, discover thriving colonies of microorganisms living directly in the extremely hot water.",
    subQuestions: [
      { question: "What term is used to describe microorganisms that survive in such extreme conditions?", answer: "Extremophiles." },
      { question: "Explain why most other living things could not survive in this hot spring.", answer: "Extreme heat can damage or destroy the basic cell structures that most living things depend on to function and survive." },
      { question: "What does the discovery of these microorganisms suggest about the range of environments microbial life can exist in?", answer: "It suggests that microbial life can exist in a much wider range of environments, including extremely harsh conditions, than was once assumed possible for living things." },
      { question: "Does the existence of extremophiles mean that ALL microorganisms can survive in such extreme conditions?", answer: "No -- extremophiles are specially adapted for these specific extreme conditions; most other microorganisms would not be able to survive there." }
    ]
  },
  {
    id: 12,
    caseTitle: "The Sewage Treatment Plant Visit",
    caseDescription: "During a school trip, students visit a sewage treatment plant and learn that certain tanks contain specific microorganisms deliberately added to help treat the incoming waste water.",
    subQuestions: [
      { question: "Explain the role these microorganisms play in the treatment process.", answer: "They break down harmful waste material present in the sewage into simpler, less harmful substances." },
      { question: "Why is this microbial process important before the treated water is released into rivers or other water bodies?", answer: "It makes the water safer and less harmful to the environment and to people who might use that water source further downstream." },
      { question: "Suggest what might happen if sewage were released without this microbial treatment process.", answer: "The untreated sewage could contaminate water sources with harmful pathogens and waste, posing serious risks to public health and the environment." },
      { question: "How does this use of microorganisms connect to the idea of 'helpful' microorganisms discussed in this chapter?", answer: "It is another example of humans deliberately using microorganisms' natural ability to break down organic matter for a beneficial, practical purpose -- cleaning water -- similar to how decomposers work in nature." }
    ]
  },
  {
    id: 13,
    caseTitle: "The Confused Student's Notes",
    caseDescription: "A student writes in their notes: 'Viruses are a type of bacteria that cause the common cold.' Their friend points out that this statement contains a mistake.",
    subQuestions: [
      { question: "Identify the mistake in the student's statement.", answer: "Viruses are not a type of bacteria -- they are a separate, distinct group of microorganisms." },
      { question: "Explain one key way viruses differ from bacteria.", answer: "Viruses can only multiply inside the living cells of a host organism, while bacteria are complete, independent single-celled organisms that do not need a host cell to multiply." },
      { question: "Is it correct that the common cold is caused by a virus?", answer: "Yes, that part of the statement is correct -- the common cold is indeed caused by a virus." },
      { question: "Rewrite the student's statement correctly.", answer: "'Viruses are a separate group of microorganisms, distinct from bacteria, and the common cold is caused by a virus.'" }
    ]
  },
  {
    id: 14,
    caseTitle: "The Community Handwashing Campaign",
    caseDescription: "A local health department launches a campaign encouraging regular handwashing, especially before eating and after using the toilet, and reports a noticeable drop in certain illnesses within a few months.",
    subQuestions: [
      { question: "Explain, scientifically, why handwashing could lead to fewer illnesses.", answer: "Handwashing physically removes pathogens from the hands before they can be transferred to food, the mouth, or other people, reducing the chances of infection spreading through contact." },
      { question: "Which mode of disease transmission does handwashing mainly target?", answer: "Contact transmission (and indirectly, contamination of food by unwashed hands)." },
      { question: "Would handwashing alone be expected to reduce diseases spread mainly through mosquitoes? Explain.", answer: "No -- handwashing targets contact-based transmission, not vector-borne transmission, so it would have little effect on diseases like malaria that spread mainly through mosquito bites." },
      { question: "Suggest one additional measure the health department could add to address a wider range of diseases.", answer: "A vector-control measure (such as removing stagnant water) or a vaccination drive, since these would target transmission routes that handwashing alone does not address." }
    ]
  },
  {
    id: 15,
    caseTitle: "The Two Different Field Diseases",
    caseDescription: "A student compares two situations: one field where wheat plants show orange-brown patches identified as rust of wheat (caused by a fungus), and another field where okra plants show yellow patterning identified as yellow vein mosaic (caused by a virus).",
    subQuestions: [
      { question: "Name the two types of microorganisms responsible for each disease.", answer: "Rust of wheat is caused by a fungus; yellow vein mosaic of okra is caused by a virus." },
      { question: "Explain one key difference in how fungi and viruses generally survive or multiply.", answer: "Fungi can often survive and grow independently in a suitable environment, while viruses can only multiply inside the living cells of a host organism." },
      { question: "Would you expect the same single treatment approach to necessarily work for both diseases? Explain.", answer: "Not necessarily -- since the two diseases are caused by different types of pathogens (fungus versus virus) with different biology, an approach effective against one may not be effective against the other." },
      { question: "Why is it useful for farmers to know exactly which type of pathogen is causing a crop disease?", answer: "Knowing the specific type of pathogen helps in choosing an appropriate and effective management or treatment approach suited to that particular type of organism." }
    ]
  },
  {
    id: 16,
    caseTitle: "The Overheard Playground Claim",
    caseDescription: "During a school discussion, one student claims, 'Since bacteria caused the plague long ago, all bacteria must be dangerous and should be destroyed wherever found.'",
    subQuestions: [
      { question: "Is this claim scientifically accurate? Explain.", answer: "No -- while some bacteria are indeed harmful and can cause serious diseases, many other bacteria are helpful, such as those used to make curd or those that fix nitrogen in soil." },
      { question: "Give one example of a helpful bacterium to counter this claim.", answer: "Rhizobium, which fixes nitrogen in the roots of leguminous plants, improving soil fertility." },
      { question: "Explain what would likely happen if all bacteria, including helpful ones, were somehow destroyed everywhere.", answer: "Important natural processes like nitrogen fixation, decomposition, and fermentation of certain foods would be disrupted, since these all depend on helpful bacteria carrying out their natural roles." },
      { question: "Suggest a more accurate way to describe the relationship between bacteria and health/disease.", answer: "Some specific bacterial species are harmful pathogens that can cause disease, while many other bacterial species are helpful or even essential to food production, agriculture, and the environment -- it depends on the specific species, not bacteria as a whole." }
    ]
  },
  {
    id: 17,
    caseTitle: "The Refrigerator Debate",
    caseDescription: "Two roommates argue: one says leftover cooked rice left outside overnight is 'probably fine' since it was cooked, while the other insists it should always be refrigerated promptly.",
    subQuestions: [
      { question: "Whose reasoning is more scientifically sound, and why?", answer: "The roommate insisting on refrigeration is more scientifically sound -- cooking kills many microorganisms present at that time, but new microorganisms from the air or surroundings can land on the food afterward and grow, especially if left at room temperature for a long time." },
      { question: "Explain why cooking the rice does not guarantee it stays safe indefinitely afterward.", answer: "Cooking only affects the microorganisms present in the food at the time of cooking -- it does not prevent new microorganisms from the environment from later contaminating the food and growing on it." },
      { question: "How would refrigerating the rice promptly help?", answer: "Refrigeration would slow down the growth of any new microorganisms that land on the rice after cooking, keeping it safer for a longer period." },
      { question: "Suggest what could happen if the rice is left out for a very long time before eating.", answer: "Microorganisms could grow enough on the rice to cause food spoilage or food poisoning if eaten, since a long time at room temperature gives them a favourable opportunity to multiply." }
    ]
  },
  {
    id: 18,
    caseTitle: "The Fungus That Fights Bacteria",
    caseDescription: "A student reads that a certain fungus can be used to produce a medicine that kills or stops the growth of harmful bacteria in the human body.",
    subQuestions: [
      { question: "What is this type of medicine called?", answer: "An antibiotic." },
      { question: "Name a well-known antibiotic produced from a fungus.", answer: "Penicillin." },
      { question: "Would this medicine be expected to work against a viral infection like the common cold? Explain.", answer: "No -- antibiotics act on processes specific to bacteria, which viruses do not have, so this medicine would not be effective against a viral infection." },
      { question: "Explain why it makes sense that a fungus could naturally produce a substance that harms bacteria.", answer: "In nature, fungi and bacteria often compete for the same resources in their environment; some fungi may have naturally developed ways to stop nearby bacteria from growing, which humans have learned to harness as antibiotics." }
    ]
  },
  {
    id: 19,
    caseTitle: "The Household Vinegar Question",
    caseDescription: "A student notices that a bottle of homemade vinegar started as a sugary liquid weeks earlier, and wonders how it transformed into vinegar over time.",
    subQuestions: [
      { question: "What general process is responsible for this transformation?", answer: "Fermentation." },
      { question: "Describe the two stages the sugary liquid would have gone through to become vinegar.", answer: "First, yeast ferments the sugar to produce alcohol; then, further fermentation (by different microorganisms) converts this alcohol into vinegar." },
      { question: "Is a single type of microorganism responsible for the entire transformation from sugar to vinegar? Explain.", answer: "Not necessarily a single type -- different microorganisms are typically involved at each of the two stages (sugar to alcohol, then alcohol to vinegar)." },
      { question: "Suggest why vinegar, unlike the original sugary liquid, can be used as a food preservative.", answer: "Vinegar's acidic nature creates conditions unsuitable for the growth of many microorganisms, which is why it is used in preserving foods like pickles." }
    ]
  },
  {
    id: 20,
    caseTitle: "The Global Vaccination Success Story",
    caseDescription: "A student reads that a certain serious disease, once common worldwide, has become extremely rare after decades of widespread global vaccination efforts.",
    subQuestions: [
      { question: "Explain, using ideas from this chapter, how widespread vaccination could lead to such a dramatic drop in cases.", answer: "As more and more of the global population became immune through vaccination, the pathogen had fewer and fewer opportunities to find new people to infect, eventually causing case numbers to drop dramatically -- an example of herd immunity working at a very large scale." },
      { question: "Would this outcome have been possible if only a small percentage of the world's population had been vaccinated? Explain.", answer: "No -- with only a small percentage immune, the pathogen would still have had plenty of unvaccinated people to spread between, making such a dramatic, sustained drop in cases far less likely." },
      { question: "Does a vaccine protect a person by killing the pathogen directly once they are exposed?", answer: "Not exactly -- a vaccine works by training the body's own defences in advance, so that if the person is exposed to the real pathogen later, their body can recognise and fight it off quickly and effectively." },
      { question: "Explain why continued vaccination efforts might still matter even after a disease becomes very rare.", answer: "If vaccination efforts stopped completely, immunity in the population could decline over time (as older immune individuals are not replaced by newly vaccinated ones), potentially allowing the rare disease to spread again if it is still present anywhere." }
    ]
  },
];

// ── SELF-ASSESSMENT: 100-question timed quiz (15 minutes) ──
export const SCIENCE8IW_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "Microorganisms are living things that:", options: ["Are visible to the naked eye", "Can only be seen with a microscope", "Do not need water", "Are always plants"], correctAnswer: 1, explanation: "Microorganisms are too small to see without a microscope." },
  { id: 2, question: "The scientist who first observed microorganisms using a simple microscope was:", options: ["Charles Darwin", "Antonie van Leeuwenhoek", "Isaac Newton", "Albert Einstein"], correctAnswer: 1, explanation: "Leeuwenhoek built a simple microscope and first observed microorganisms with it." },
  { id: 3, question: "Which of these is one of the five main groups of microorganisms?", options: ["Insects", "Bacteria", "Birds", "Fish"], correctAnswer: 1, explanation: "Bacteria is one of the five main microorganism groups." },
  { id: 4, question: "Which microorganism group includes moulds and yeasts?", options: ["Bacteria", "Protozoa", "Fungi", "Algae"], correctAnswer: 2, explanation: "Fungi include moulds and yeasts." },
  { id: 5, question: "Which microorganism group is usually able to move on its own?", options: ["Algae", "Protozoa", "Fungi", "Viruses"], correctAnswer: 1, explanation: "Protozoa are typically able to move on their own." },
  { id: 6, question: "Algae are usually found:", options: ["In deserts", "In water", "Inside rocks only", "In the sky"], correctAnswer: 1, explanation: "Algae are simple organisms usually found in water." },
  { id: 7, question: "Which microorganism can only multiply inside a host's living cells?", options: ["Bacteria", "Fungi", "Algae", "Viruses"], correctAnswer: 3, explanation: "Viruses can only multiply inside a living host cell." },
  { id: 8, question: "Microorganisms can be found in:", options: ["Only clean laboratories", "Almost every environment, including extreme ones", "Only inside animals", "Only in cold places"], correctAnswer: 1, explanation: "Microorganisms are found almost everywhere, even in extreme environments." },
  { id: 9, question: "Extremophiles are microorganisms that:", options: ["Cannot survive at all", "Survive extreme conditions like very high heat", "Only live in the human body", "Are always harmful"], correctAnswer: 1, explanation: "Extremophiles survive extreme conditions that most life cannot." },
  { id: 10, question: "A surface that looks completely clean:", options: ["Definitely has no microorganisms", "Could still carry many microorganisms", "Cannot support microbial life", "Is always sterile"], correctAnswer: 1, explanation: "Microorganisms are too small to see, so a clean-looking surface can still carry many." },
  { id: 11, question: "Fermentation is a process where microorganisms:", options: ["Freeze sugars", "Break down sugars to produce acids or gases", "Destroy all food", "Only work in cold conditions"], correctAnswer: 1, explanation: "Fermentation breaks down sugars, producing acids or gases." },
  { id: 12, question: "Curd is made from milk through the action of:", options: ["A virus", "A type of bacteria", "Algae", "Sunlight"], correctAnswer: 1, explanation: "Bacteria ferment milk sugars to make curd." },
  { id: 13, question: "Bread dough rises because of gas produced by:", options: ["Salt", "Yeast", "Sunlight", "Cold water"], correctAnswer: 1, explanation: "Yeast produces gas during fermentation, making dough rise." },
  { id: 14, question: "Yeast belongs to which group of microorganisms?", options: ["Bacteria", "Fungi", "Protozoa", "Viruses"], correctAnswer: 1, explanation: "Yeast is a fungus." },
  { id: 15, question: "Alcohol is produced by fermentation of sugar using:", options: ["Bacteria only", "Yeast", "Algae", "Viruses"], correctAnswer: 1, explanation: "Yeast ferments sugar to produce alcohol." },
  { id: 16, question: "Vinegar can be produced from alcohol through:", options: ["Freezing", "Further fermentation", "Boiling only", "Adding salt"], correctAnswer: 1, explanation: "Further fermentation converts alcohol into vinegar." },
  { id: 17, question: "Idli and dosa batter rises due to:", options: ["Refrigeration", "Fermentation by microorganisms", "Adding oil", "Sunlight exposure"], correctAnswer: 1, explanation: "Fermentation causes idli/dosa batter to rise." },
  { id: 18, question: "Penicillin, a well-known antibiotic, is produced from:", options: ["A virus", "A type of fungus", "Algae", "Sunlight"], correctAnswer: 1, explanation: "Penicillin is produced from a specific fungus." },
  { id: 19, question: "Antibiotics are used to treat infections caused by:", options: ["Viruses only", "Harmful bacteria", "Only plants", "Sunlight exposure"], correctAnswer: 1, explanation: "Antibiotics treat bacterial infections." },
  { id: 20, question: "A vaccine contains:", options: ["A full-strength, active pathogen", "A weakened or killed pathogen, or part of it", "No biological material at all", "Only sugar and water"], correctAnswer: 1, explanation: "A vaccine uses a weakened or killed pathogen (or a part of it)." },
  { id: 21, question: "Rhizobium bacteria are important because they:", options: ["Cause plant diseases", "Fix nitrogen in plant root nodules", "Destroy soil fertility", "Only live in water"], correctAnswer: 1, explanation: "Rhizobium fixes nitrogen in root nodules, improving soil fertility." },
  { id: 22, question: "Rhizobium is commonly found in the roots of:", options: ["Wheat", "Leguminous plants like pea and gram", "Rice only", "Mango trees"], correctAnswer: 1, explanation: "Rhizobium lives in the root nodules of leguminous plants." },
  { id: 23, question: "Decomposer microorganisms help by:", options: ["Destroying all soil nutrients", "Breaking down dead matter and releasing nutrients", "Causing all plant diseases", "Preventing plant growth"], correctAnswer: 1, explanation: "Decomposers break down dead matter, releasing nutrients into soil." },
  { id: 24, question: "Microorganisms are used in sewage treatment to:", options: ["Add colour to water", "Break down harmful waste material", "Increase water temperature", "Freeze the water"], correctAnswer: 1, explanation: "Microorganisms break down harmful waste in sewage treatment." },
  { id: 25, question: "A pathogen is:", options: ["Any microorganism, harmful or not", "A microorganism that causes disease", "A type of medicine", "A microscope part"], correctAnswer: 1, explanation: "A pathogen specifically causes disease." },
  { id: 26, question: "A communicable disease can:", options: ["Never spread between people", "Spread from an infected host to a healthy one", "Only affect plants", "Only affect animals"], correctAnswer: 1, explanation: "Communicable diseases can spread between hosts." },
  { id: 27, question: "Cholera is caused by:", options: ["A virus", "A bacterium", "A fungus", "An alga"], correctAnswer: 1, explanation: "Cholera is caused by a bacterium." },
  { id: 28, question: "Typhoid is caused by:", options: ["A virus", "A bacterium", "A protozoan", "An alga"], correctAnswer: 1, explanation: "Typhoid is caused by a bacterium." },
  { id: 29, question: "Tuberculosis is caused by:", options: ["A virus", "A bacterium", "A fungus", "An alga"], correctAnswer: 1, explanation: "Tuberculosis is caused by a bacterium." },
  { id: 30, question: "The common cold is caused by:", options: ["A bacterium", "A virus", "A protozoan", "An alga"], correctAnswer: 1, explanation: "The common cold is caused by a virus." },
  { id: 31, question: "Measles is caused by:", options: ["A bacterium", "A virus", "A protozoan", "Algae"], correctAnswer: 1, explanation: "Measles is caused by a virus." },
  { id: 32, question: "Chicken pox is caused by:", options: ["A bacterium", "A virus", "A fungus", "Algae"], correctAnswer: 1, explanation: "Chicken pox is caused by a virus." },
  { id: 33, question: "Polio is caused by:", options: ["A bacterium", "A virus", "A protozoan", "A fungus"], correctAnswer: 1, explanation: "Polio is caused by a virus." },
  { id: 34, question: "Malaria is caused by:", options: ["A bacterium", "A virus", "A protozoan parasite", "A fungus"], correctAnswer: 2, explanation: "Malaria is caused by a protozoan parasite." },
  { id: 35, question: "Amoebic dysentery is caused by:", options: ["A virus", "A protozoan", "A fungus", "Algae"], correctAnswer: 1, explanation: "Amoebic dysentery is caused by a protozoan." },
  { id: 36, question: "Anthrax mainly affects:", options: ["Wheat crops", "Cattle, and can spread to humans", "Only fish", "Only birds"], correctAnswer: 1, explanation: "Anthrax mainly affects cattle and can spread to humans." },
  { id: 37, question: "Foot-and-mouth disease mainly affects:", options: ["Cattle", "Wheat", "Citrus plants", "Humans only"], correctAnswer: 0, explanation: "Foot-and-mouth disease is a viral disease of cattle." },
  { id: 38, question: "Citrus canker is a disease of:", options: ["Cattle", "Citrus plants", "Wheat", "Humans"], correctAnswer: 1, explanation: "Citrus canker affects citrus plants." },
  { id: 39, question: "Rust of wheat is caused by:", options: ["A virus", "A fungus", "A protozoan", "Algae"], correctAnswer: 1, explanation: "Rust of wheat is a fungal disease." },
  { id: 40, question: "Yellow vein mosaic disease commonly affects:", options: ["Wheat", "Okra (bhindi)", "Rice", "Citrus plants"], correctAnswer: 1, explanation: "Yellow vein mosaic is a viral disease of okra (bhindi)." },
  { id: 41, question: "Diseases like the common cold spread mainly through:", options: ["Contaminated water", "Air (droplets from coughing/sneezing)", "Only direct injection", "Only soil contact"], correctAnswer: 1, explanation: "The common cold spreads through airborne droplets." },
  { id: 42, question: "Cholera and typhoid commonly spread through:", options: ["Air only", "Contaminated water", "Only skin contact", "Only through animals"], correctAnswer: 1, explanation: "Cholera and typhoid spread through contaminated water." },
  { id: 43, question: "A vector is:", options: ["A type of medicine", "A carrier that transfers a pathogen between hosts", "A microscope lens", "A food preservative"], correctAnswer: 1, explanation: "A vector carries a pathogen from one host to another." },
  { id: 44, question: "Malaria is transmitted by:", options: ["Houseflies", "The female Anopheles mosquito", "Contaminated water only", "Direct contact only"], correctAnswer: 1, explanation: "The female Anopheles mosquito transmits malaria." },
  { id: 45, question: "Houseflies can spread disease by:", options: ["Biting humans", "Contaminating food after landing on waste", "Living only in clean water", "Flying at night only"], correctAnswer: 1, explanation: "Houseflies contaminate food after contact with waste." },
  { id: 46, question: "Vaccination helps the body by:", options: ["Removing the need for any immune response", "Training the body's defences in advance", "Curing all diseases instantly", "Making a person immune to everything"], correctAnswer: 1, explanation: "Vaccination trains the body's defences against a specific pathogen." },
  { id: 47, question: "Herd immunity occurs when:", options: ["No one in a population is immune", "A large portion of a population is immune, reducing disease spread", "Only animals are vaccinated", "A disease cannot spread at all under any condition"], correctAnswer: 1, explanation: "Herd immunity reduces spread when a large portion of the population is immune." },
  { id: 48, question: "Handwashing helps prevent disease mainly by:", options: ["Making the water dirty", "Physically removing pathogens from the hands", "Increasing microbial growth", "Replacing the need for vaccines"], correctAnswer: 1, explanation: "Handwashing physically removes pathogens from the skin." },
  { id: 49, question: "Removing stagnant water around homes helps prevent:", options: ["Common cold spread", "Mosquito breeding and vector-borne disease spread", "Plant diseases only", "Food spoilage"], correctAnswer: 1, explanation: "Stagnant water is a mosquito breeding site; removing it reduces vector-borne disease spread." },
  { id: 50, question: "Antibiotics are NOT effective against:", options: ["Bacterial infections", "Viral infections", "All infections", "None of the above"], correctAnswer: 1, explanation: "Antibiotics act on bacteria-specific processes and have no effect on viruses." },
  { id: 51, question: "Food spoilage is caused by the growth of:", options: ["Salt crystals", "Microorganisms on food", "Only sunlight", "Refrigeration"], correctAnswer: 1, explanation: "Food spoilage happens due to microbial growth on food." },
  { id: 52, question: "Salt preserves food mainly by:", options: ["Adding flavour only", "Drawing water out of food and microorganisms", "Increasing microbial growth", "Freezing the food"], correctAnswer: 1, explanation: "Salt draws out water, preventing microbial growth." },
  { id: 53, question: "Sugar preserves food in a way similar to:", options: ["Refrigeration", "Salt", "Boiling", "Vacuum packing"], correctAnswer: 1, explanation: "Sugar works similarly to salt, reducing available water." },
  { id: 54, question: "Refrigeration preserves food by:", options: ["Killing all microorganisms", "Slowing down microbial growth", "Adding preservative chemicals", "Removing all air"], correctAnswer: 1, explanation: "Refrigeration slows microbial growth through low temperature." },
  { id: 55, question: "Pasteurisation involves:", options: ["Freezing milk permanently", "Heating then rapidly cooling a liquid to kill harmful microbes", "Adding salt to milk", "Removing all nutrients"], correctAnswer: 1, explanation: "Pasteurisation heats then rapidly cools a liquid to kill harmful microorganisms." },
  { id: 56, question: "Vacuum (airtight) packing helps preserve food by:", options: ["Adding more air", "Removing air that many microorganisms need to grow", "Adding sugar", "Increasing temperature"], correctAnswer: 1, explanation: "Removing air creates conditions unsuitable for many microorganisms." },
  { id: 57, question: "Chemical preservatives in packaged food work by:", options: ["Increasing microbial growth", "Preventing microbial growth", "Adding colour only", "Removing nutrients"], correctAnswer: 1, explanation: "Chemical preservatives prevent microbial growth in packaged food." },
  { id: 58, question: "Refrigerated food will eventually spoil because refrigeration:", options: ["Kills all microorganisms instantly", "Only slows microbial growth, not stops it completely", "Has no effect on microorganisms", "Increases microbial growth"], correctAnswer: 1, explanation: "Refrigeration slows but does not completely stop microbial growth." },
  { id: 59, question: "Nitrogen fixation is the process of:", options: ["Removing nitrogen from soil", "Converting nitrogen gas into a usable form for plants", "Freezing nitrogen gas", "Burning nitrogen"], correctAnswer: 1, explanation: "Nitrogen fixation converts atmospheric nitrogen into a usable form." },
  { id: 60, question: "Plants cannot use nitrogen gas directly because:", options: ["There is no nitrogen in the air", "They cannot absorb nitrogen in its gas form directly", "Nitrogen gas is toxic to soil", "Plants do not need nitrogen"], correctAnswer: 1, explanation: "Plants cannot absorb nitrogen gas directly; it must be converted first." },
  { id: 61, question: "Denitrifying bacteria in the nitrogen cycle:", options: ["Fix nitrogen into soil", "Convert nitrogen compounds back into nitrogen gas", "Cause plant diseases", "Only live in water"], correctAnswer: 1, explanation: "Denitrifying bacteria return nitrogen gas to the atmosphere." },
  { id: 62, question: "In the nitrogen cycle, animals obtain nitrogen compounds by:", options: ["Breathing nitrogen gas directly", "Eating plants (or other animals)", "Absorbing nitrogen through skin only", "Drinking water only"], correctAnswer: 1, explanation: "Animals obtain nitrogen compounds by eating plants or other animals." },
  { id: 63, question: "When plants and animals die, decomposers:", options: ["Destroy all nitrogen permanently", "Release nitrogen compounds back into the soil", "Convert nitrogen into oxygen", "Have no effect on nitrogen"], correctAnswer: 1, explanation: "Decomposers release nitrogen compounds from dead matter back into the soil." },
  { id: 64, question: "Which statement about bacteria is most accurate?", options: ["All bacteria are harmful", "All bacteria are helpful", "Bacteria include both helpful and harmful species", "Bacteria are not living organisms"], correctAnswer: 2, explanation: "Bacteria include both helpful and harmful species." },
  { id: 65, question: "Which of these is a helpful use of microorganisms?", options: ["Causing cholera", "Making curd from milk", "Causing citrus canker", "Causing malaria"], correctAnswer: 1, explanation: "Making curd is a helpful use of microorganisms." },
  { id: 66, question: "Which of these is a harmful effect of microorganisms?", options: ["Fixing nitrogen in soil", "Making bread rise", "Causing typhoid", "Making curd"], correctAnswer: 2, explanation: "Causing typhoid is a harmful effect of a pathogenic microorganism." },
  { id: 67, question: "A disease-causing microorganism found in plants can spread through:", options: ["Only human contact", "Contact, contaminated tools, water, or insects", "Only through the air", "Never spreads"], correctAnswer: 1, explanation: "Plant pathogens can spread through several possible routes." },
  { id: 68, question: "Why might a doctor NOT prescribe antibiotics for a common cold?", options: ["Antibiotics are too expensive", "The common cold is viral, and antibiotics don't work on viruses", "Antibiotics cure colds instantly", "There is no reason"], correctAnswer: 1, explanation: "Antibiotics are ineffective against viral infections like the common cold." },
  { id: 69, question: "A completed course of antibiotics is recommended even after symptoms improve because:", options: ["Some bacteria may still remain and could cause the infection to return", "It has no real purpose", "It always causes side effects", "Symptoms only improve after all bacteria are gone"], correctAnswer: 0, explanation: "Stopping early could let remaining bacteria multiply again, causing relapse." },
  { id: 70, question: "Which of these best explains why widespread vaccination matters for a whole community?", options: ["It has no community-wide benefit", "It creates herd immunity, protecting even unvaccinated individuals", "It only benefits vaccinated individuals directly", "It removes the need for hygiene"], correctAnswer: 1, explanation: "Widespread vaccination creates herd immunity, benefiting the whole community." },
  { id: 71, question: "Which of these correctly matches a disease with its cause?", options: ["Malaria -- bacterium", "Tuberculosis -- bacterium", "Chicken pox -- bacterium", "Cholera -- virus"], correctAnswer: 1, explanation: "Tuberculosis is correctly matched with a bacterium; the other pairs are incorrect." },
  { id: 72, question: "Which of these correctly matches a disease with its cause?", options: ["Measles -- virus", "Typhoid -- virus", "Anthrax -- virus", "Malaria -- bacterium"], correctAnswer: 0, explanation: "Measles is correctly matched with a virus; the other pairs are incorrect." },
  { id: 73, question: "Which food preservation method primarily works through heat?", options: ["Salting", "Pasteurisation", "Refrigeration", "Vacuum packing"], correctAnswer: 1, explanation: "Pasteurisation uses heat to kill harmful microorganisms." },
  { id: 74, question: "Which food preservation method primarily works through low temperature?", options: ["Boiling", "Pasteurisation", "Refrigeration", "Salting"], correctAnswer: 2, explanation: "Refrigeration uses low temperature to slow microbial growth." },
  { id: 75, question: "Which food preservation method primarily works by drawing out water?", options: ["Salting", "Refrigeration", "Vacuum packing", "Chemical preservatives"], correctAnswer: 0, explanation: "Salting draws water out of food and microorganisms." },
  { id: 76, question: "Which food preservation method primarily works by removing air?", options: ["Salting", "Refrigeration", "Vacuum (airtight) packing", "Boiling"], correctAnswer: 2, explanation: "Vacuum packing removes air that many microorganisms need to grow." },
  { id: 77, question: "The five main groups of microorganisms are:", options: ["Bacteria, fungi, protozoa, algae, viruses", "Bacteria, insects, fungi, birds, algae", "Fungi, plants, animals, viruses, algae", "Protozoa, insects, fish, algae, bacteria"], correctAnswer: 0, explanation: "The five correct groups are bacteria, fungi, protozoa, algae, and viruses." },
  { id: 78, question: "Which is an example of a microorganism living inside a living body without causing harm?", options: ["Every microorganism in the body is harmful", "Many microorganisms live in the body without causing any harm", "No microorganisms can live inside a body", "Only viruses live inside bodies"], correctAnswer: 1, explanation: "Many microorganisms live inside bodies without causing harm." },
  { id: 79, question: "Which statement about viruses is correct?", options: ["Viruses are a type of bacteria", "Viruses can multiply independently, without any host", "Viruses can only multiply inside a host's living cells", "Viruses always make their own food"], correctAnswer: 2, explanation: "Viruses require a host's living cells to multiply." },
  { id: 80, question: "Which of these is an example of a nitrogen-fixing bacterium?", options: ["Lactobacillus", "Rhizobium", "Salmonella", "Streptococcus"], correctAnswer: 1, explanation: "Rhizobium is the well-known nitrogen-fixing bacterium." },
  { id: 81, question: "A disease that spreads from an infected person to a healthy one is called:", options: ["Non-communicable", "Communicable", "Untreatable", "Harmless"], correctAnswer: 1, explanation: "A communicable disease spreads between hosts." },
  { id: 82, question: "Which mode of transmission involves droplets from coughing or sneezing?", options: ["Water", "Air", "Vector", "Contact only"], correctAnswer: 1, explanation: "Airborne transmission involves droplets from coughing/sneezing." },
  { id: 83, question: "Which mode of transmission involves a mosquito bite?", options: ["Air", "Water", "Vector", "Contact"], correctAnswer: 2, explanation: "A mosquito bite is a vector-borne mode of transmission." },
  { id: 84, question: "Which mode of transmission involves touching an infected person or object?", options: ["Air", "Water", "Vector", "Contact"], correctAnswer: 3, explanation: "Direct contact transmission involves touching an infected person or object." },
  { id: 85, question: "Which mode of transmission involves drinking contaminated liquid?", options: ["Water", "Vector", "Contact", "Air"], correctAnswer: 0, explanation: "Water-borne transmission involves contaminated drinking water." },
  { id: 86, question: "Why is a fungus able to produce a substance that harms bacteria (an antibiotic)?", options: ["Fungi and bacteria never interact in nature", "Fungi may naturally compete with nearby bacteria for resources", "All fungi are identical to bacteria", "Antibiotics have nothing to do with fungi"], correctAnswer: 1, explanation: "Natural competition between fungi and bacteria explains why some fungi produce antibacterial substances." },
  { id: 87, question: "Which best describes the overall relationship between humans and microorganisms?", options: ["Microorganisms are always harmful", "Microorganisms are always helpful", "Microorganisms include both helpful and harmful types", "Microorganisms have no effect on humans"], correctAnswer: 2, explanation: "Microorganisms include both helpful and harmful types affecting human life." },
  { id: 88, question: "Which best explains why pasteurised milk still needs refrigeration?", options: ["Pasteurisation makes milk permanently sterile", "New microorganisms can enter and grow in the milk after pasteurisation", "Refrigeration removes all nutrients", "Pasteurisation has no purpose"], correctAnswer: 1, explanation: "New microorganisms can contaminate milk after pasteurisation, requiring refrigeration." },
  { id: 89, question: "Which best explains why removing stagnant water reduces malaria cases?", options: ["Stagnant water directly causes malaria", "Stagnant water is a mosquito breeding site, and mosquitoes are the vector for malaria", "Malaria has nothing to do with water", "Stagnant water kills mosquitoes"], correctAnswer: 1, explanation: "Removing mosquito breeding sites reduces the vector population, reducing malaria spread." },
  { id: 90, question: "Which best explains why a claim like 'all bacteria are dangerous' is inaccurate?", options: ["No bacteria are ever dangerous", "The bacteria group includes both helpful and harmful species", "All bacteria are identical", "Bacteria do not exist"], correctAnswer: 1, explanation: "The bacteria group contains both harmful and helpful species, so a blanket claim is inaccurate." },
  { id: 91, question: "Which is a correct example of a plant disease and the type of pathogen causing it?", options: ["Rust of wheat -- fungus", "Rust of wheat -- virus", "Rust of wheat -- bacterium", "Rust of wheat -- protozoan"], correctAnswer: 0, explanation: "Rust of wheat is caused by a fungus." },
  { id: 92, question: "Which is a correct example of an animal disease and the animal it affects?", options: ["Anthrax -- cattle", "Anthrax -- citrus plants", "Anthrax -- wheat", "Anthrax -- fish only"], correctAnswer: 0, explanation: "Anthrax mainly affects cattle." },
  { id: 93, question: "What is the main purpose of a vaccine?", options: ["To cure an illness after severe symptoms appear", "To train the body's defences before a real infection occurs", "To replace the need for hygiene entirely", "To kill all microorganisms in the environment"], correctAnswer: 1, explanation: "A vaccine trains the body's defences before a real infection occurs." },
  { id: 94, question: "Which of these is NOT a typical method of food preservation?", options: ["Salting", "Refrigeration", "Leaving food uncovered at room temperature for days", "Pasteurisation"], correctAnswer: 2, explanation: "Leaving food uncovered at room temperature encourages microbial growth rather than preventing it." },
  { id: 95, question: "Which best describes decomposers' role in the environment?", options: ["They only cause disease", "They break down dead matter and recycle nutrients", "They destroy all soil fertility", "They have no role in nature"], correctAnswer: 1, explanation: "Decomposers break down dead matter, recycling nutrients." },
  { id: 96, question: "Which of these correctly completes the nitrogen cycle sequence: Nitrogen gas -> fixed by bacteria -> absorbed by plants -> eaten by animals -> released by decomposers -> ?", options: ["Converted back to nitrogen gas by denitrifying bacteria", "Permanently trapped in animals forever", "Destroyed completely", "Converted into oxygen"], correctAnswer: 0, explanation: "Denitrifying bacteria complete the cycle by returning nitrogen gas to the air." },
  { id: 97, question: "Which best explains why understanding the type of pathogen (bacteria vs virus) matters for treatment?", options: ["It does not matter at all", "Antibiotics work on bacteria but not viruses, so treatment choice depends on the pathogen type", "All pathogens are treated the same way", "Only viruses can be treated with medicine"], correctAnswer: 1, explanation: "Since antibiotics only work on bacteria, knowing the pathogen type is essential for correct treatment." },
  { id: 98, question: "Which of these best summarises 'herd immunity'?", options: ["Only animals develop herd immunity", "When enough of a population is immune, disease spread is reduced for everyone, including the non-immune", "It means a disease can never be prevented", "It only applies to a single individual"], correctAnswer: 1, explanation: "Herd immunity reduces disease spread across a population when enough people are immune." },
  { id: 99, question: "Which best explains why extremophiles are scientifically significant?", options: ["They show life can survive in a much wider range of environments than once thought", "They prove no microorganisms can survive extreme heat", "They are not really living organisms", "They only exist in laboratories"], correctAnswer: 0, explanation: "Extremophiles show that microbial life can survive far more extreme conditions than previously assumed." },
  { id: 100, question: "Overall, which statement best captures the theme of this chapter?", options: ["Microorganisms are unimportant and rarely encountered", "Microorganisms are tiny, widespread organisms with both helpful and harmful effects on daily life", "All microorganisms should be eliminated", "Microorganisms only exist in science books"], correctAnswer: 1, explanation: "This chapter's central theme is that microorganisms are widespread and have both helpful and harmful roles in everyday life." },
];
