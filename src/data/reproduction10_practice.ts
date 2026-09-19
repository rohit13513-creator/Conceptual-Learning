// Class 10 CBSE Biology -- Chapter 7: How do Organisms Reproduce?
import type { QuizQuestion, NCERTSolvedQuestion } from "../types-custom";

// SOLVED TEXTBOOK QUESTIONS (every in-text question + every end-of-chapter exercise)
export const REPRO10_NCERT_SOLVED: NCERTSolvedQuestion[] = [
  {
    "id": 1,
    "questionNumber": "In-text 7.1 Q1",
    "question": "What is the importance of DNA copying in reproduction?",
    "given": {
      "Concept": "DNA carries the blueprint of body design"
    },
    "formulaUsed": "DNA copying is the basic event of reproduction; it passes the body-design information to the next generation.",
    "derivationSteps": [
      "The DNA in the chromosomes of the nucleus is the information source for making proteins, and proteins decide the body design.",
      "When a cell reproduces, it must make a copy of its DNA so that the new cell gets the same blueprint. This keeps the new individual similar to the parent.",
      "The copy is made by chemical reactions, and it is accompanied by the creation of extra cellular apparatus, so each DNA copy ends up in a cell that can carry on life processes.",
      "Because copying is never perfectly accurate, small variations appear, which are the raw material for evolution."
    ],
    "finalAnswer": "DNA copying passes the blueprint of body design to the new cell, ensuring similarity between parent and offspring, while small copying errors give the variations needed for survival of the species.",
    "conceptualTip": "Think: no DNA copy = no blueprint = no new individual."
  },
  {
    "id": 2,
    "questionNumber": "In-text 7.1 Q2",
    "question": "Why is variation beneficial to the species but not necessarily for the individual?",
    "given": {
      "Concept": "Variation and survival of a population"
    },
    "formulaUsed": "Variation helps the population survive changes in the environment, but an individual variant may or may not be suited to the change.",
    "derivationSteps": [
      "Variations are differences in the DNA copies. Some may suit the environment, some may not.",
      "If the environment (niche) changes drastically, for example the temperature rises, most individuals may die. A few individuals with useful variations (e.g. heat resistance in bacteria) can survive and multiply.",
      "So the species does not become extinct, even though many individuals die. Thus variation ensures survival of the species over time.",
      "For an individual, a variation may be harmful or useless; only the variant that fits the changed conditions benefits. That is why variation is not necessarily beneficial to every individual."
    ],
    "finalAnswer": "Some variants in a population can survive a changed environment, so the species survives; but any single individual may carry a useless or harmful variation.",
    "conceptualTip": "Variation protects the population, not each member."
  },
  {
    "id": 3,
    "questionNumber": "In-text 7.2 Q1",
    "question": "How does binary fission differ from multiple fission?",
    "given": {
      "Concept": "Fission in unicellular organisms"
    },
    "formulaUsed": "Binary fission gives 2 daughter cells; multiple fission gives many daughter cells at once.",
    "derivationSteps": [
      "In binary fission, the parent cell divides into two equal halves, giving two daughter cells. Examples: Amoeba, Leishmania, many bacteria.",
      "In multiple fission, the parent cell divides into many daughter cells simultaneously. Example: Plasmodium (malarial parasite).",
      "In Amoeba the division can take place in any plane, while in Leishmania it occurs in a definite orientation relative to the whip-like flagellum."
    ],
    "finalAnswer": "Binary fission splits one cell into two daughter cells, whereas multiple fission splits one cell into many daughter cells at the same time.",
    "conceptualTip": "Binary = 2 (bi), multiple = many."
  },
  {
    "id": 4,
    "questionNumber": "In-text 7.2 Q2",
    "question": "How will an organism be benefited if it reproduces through spores?",
    "given": {
      "Concept": "Spore formation"
    },
    "formulaUsed": "Spores are protected by thick walls and can survive until conditions are favourable.",
    "derivationSteps": [
      "Spores are tiny cells formed inside a sporangium (e.g. in Rhizopus).",
      "They are covered by thick walls that protect them from harsh conditions such as dryness.",
      "When a spore reaches a moist surface, it germinates and grows into a new individual.",
      "Large numbers of spores are made, so many new individuals can arise from a single parent and spread widely."
    ],
    "finalAnswer": "Spores have thick protective walls and grow into new individuals whenever they land on a suitable moist surface, so the organism can survive harsh conditions and spread easily.",
    "conceptualTip": "Thick wall = protection; many spores = wide spread."
  },
  {
    "id": 5,
    "questionNumber": "In-text 7.2 Q3",
    "question": "Can you think of reasons why more complex organisms cannot give rise to new individuals through regeneration?",
    "given": {
      "Concept": "Regeneration and body complexity"
    },
    "formulaUsed": "Complex organisms have specialised cells organised into tissues and organs at fixed positions.",
    "derivationSteps": [
      "Complex multi-cellular organisms are not a random collection of cells. Specialised cells form tissues, and tissues form organs placed at definite positions.",
      "Regeneration needs specialised cells that can proliferate and form all cell types in an organised sequence (development). Such cells are very limited in complex organisms.",
      "In such a carefully organised body, breaking it up and regrowing everything from pieces would be impractical, so they use more complex methods like sexual reproduction.",
      "Also, regeneration is not the same as reproduction, as most organisms do not depend on being cut up to reproduce."
    ],
    "finalAnswer": "Complex organisms have highly organised tissues and organs, so pieces of the body cannot easily regrow the whole organism; hence they use specialised reproductive methods.",
    "conceptualTip": "The more specialised the body, the less each piece can rebuild the whole."
  },
  {
    "id": 6,
    "questionNumber": "In-text 7.2 Q4",
    "question": "Why is vegetative propagation practised for growing some types of plants?",
    "given": {
      "Concept": "Advantages of vegetative propagation"
    },
    "formulaUsed": "It works for plants that have lost the ability to make seeds and gives plants identical to the parent.",
    "derivationSteps": [
      "Plants such as banana, orange, rose and jasmine have lost the capacity to produce viable seeds. Vegetative propagation (layering, grafting, cuttings) is the only way to grow them.",
      "Plants raised this way bear flowers and fruits earlier than those grown from seeds.",
      "All the new plants are genetically similar to the parent, so they have all its desirable characteristics.",
      "Methods like layering and grafting are used to grow sugarcane, roses and grapes."
    ],
    "finalAnswer": "It is used for plants like banana and jasmine which do not form seeds, gives earlier flowering and fruiting, and produces plants with the same characteristics as the parent.",
    "conceptualTip": "Vegetative propagation = clones of the parent."
  },
  {
    "id": 7,
    "questionNumber": "In-text 7.2 Q5",
    "question": "Why is DNA copying an essential part of the process of reproduction?",
    "given": {
      "Concept": "DNA copying in reproduction"
    },
    "formulaUsed": "DNA copying transfers the blueprint of the body design to the next generation.",
    "derivationSteps": [
      "The DNA in the nucleus contains the information for making proteins that determine body design.",
      "For a new individual to resemble the parent, its cells must receive a copy of this blueprint, so DNA copying is needed.",
      "DNA copying with small variations gives diversity, which helps species survive changes in the environment and is the basis of evolution.",
      "Copying also ensures that each daughter cell has its own DNA to control its cellular activities."
    ],
    "finalAnswer": "DNA copying passes the blueprint of body design to the offspring, giving similarity to the parents, and its minor errors create variations that help the species survive.",
    "conceptualTip": "Same idea as In-text 7.1 Q1: no copy, no next generation."
  },
  {
    "id": 8,
    "questionNumber": "In-text 7.3 Q1",
    "question": "How is the process of pollination different from fertilisation?",
    "given": {
      "Concept": "Pollination vs fertilisation"
    },
    "formulaUsed": "Pollination is the transfer of pollen; fertilisation is the fusion of male and female gametes.",
    "derivationSteps": [
      "Pollination is the transfer of pollen grains from the anther of a stamen to the stigma of a pistil. It can be by wind, water or animals, and may be self- or cross-pollination. It happens outside the ovule, on the stigma.",
      "After landing on the stigma, the pollen grain grows a tube through the style to reach the ovule in the ovary.",
      "Fertilisation is the fusion of the male gamete (from the pollen) with the female gamete (egg cell) in the ovule, forming the zygote.",
      "So pollination is only the arrival of pollen; fertilisation is the actual fusion of germ-cells that follows it."
    ],
    "finalAnswer": "Pollination is the transfer of pollen from anther to stigma, whereas fertilisation is the fusion of the male and female gametes to form a zygote.",
    "conceptualTip": "Pollination comes first (transfer); fertilisation comes next (fusion)."
  },
  {
    "id": 9,
    "questionNumber": "In-text 7.3 Q2",
    "question": "What is the role of the seminal vesicles and the prostate gland?",
    "given": {
      "Concept": "Male accessory glands"
    },
    "formulaUsed": "They add secretions to the sperms to form semen.",
    "derivationSteps": [
      "Along the path of the vas deferens, the seminal vesicles and the prostate gland add their secretions.",
      "These secretions make a fluid in which the sperms are carried, which makes their transport easier.",
      "The fluid also provides nutrition to the sperms."
    ],
    "finalAnswer": "The seminal vesicles and prostate gland add secretions that form a fluid medium making the transport of sperms easier and also providing them nutrition.",
    "conceptualTip": "Sperms plus these secretions make semen."
  },
  {
    "id": 10,
    "questionNumber": "In-text 7.3 Q3",
    "question": "What are the changes seen in girls at the time of puberty?",
    "given": {
      "Concept": "Puberty in girls"
    },
    "formulaUsed": "Puberty is the period of sexual maturation when growth slows and reproductive tissues mature.",
    "derivationSteps": [
      "Changes common to both sexes: thick hair grows in armpits and the genital area, thinner hair on arms and legs, skin becomes oily and pimples may appear.",
      "Changes in girls specifically: breast size begins to increase and the skin of the nipples darkens.",
      "Girls begin to menstruate at around this time.",
      "These changes happen slowly and vary from person to person."
    ],
    "finalAnswer": "In girls, breast size increases, the nipple skin darkens, hair grows in the armpits and genital area, the skin becomes oily, and menstruation begins.",
    "conceptualTip": "Remember: breasts + menstruation for girls; facial hair + cracking voice for boys."
  },
  {
    "id": 11,
    "questionNumber": "In-text 7.3 Q4",
    "question": "How does the embryo get nourishment inside the mother's body?",
    "given": {
      "Concept": "Placenta"
    },
    "formulaUsed": "Through the placenta, a disc-like tissue embedded in the uterine wall.",
    "derivationSteps": [
      "The embryo is implanted in the thick, blood-rich lining of the uterus.",
      "The placenta is a special disc-shaped tissue embedded in the uterine wall. It has villi on the embryo's side and blood spaces around them on the mother's side.",
      "This gives a large surface area for glucose and oxygen to pass from the mother's blood to the embryo.",
      "The embryo's waste substances are removed by passing them into the mother's blood through the placenta."
    ],
    "finalAnswer": "The embryo receives glucose and oxygen from the mother's blood through the placenta, which also removes the embryo's wastes.",
    "conceptualTip": "Placenta = supply line and waste line."
  },
  {
    "id": 12,
    "questionNumber": "In-text 7.3 Q5",
    "question": "If a woman is using a copper-T, will it help in protecting her from sexually transmitted diseases?",
    "given": {
      "Concept": "Contraception vs STI protection"
    },
    "formulaUsed": "No. Copper-T only prevents pregnancy.",
    "derivationSteps": [
      "A copper-T is a contraceptive device placed inside the uterus to prevent pregnancy.",
      "It does not form a barrier against disease-causing microbes during the sexual act.",
      "Only barrier methods such as condoms help prevent transmission of many sexually transmitted infections (e.g. gonorrhoea, syphilis, warts, HIV-AIDS) to some extent."
    ],
    "finalAnswer": "No. A copper-T prevents pregnancy but does not protect against sexually transmitted diseases; a condom helps to some extent.",
    "conceptualTip": "Copper-T = pregnancy control only."
  },
  {
    "id": 13,
    "questionNumber": "Exercise Q1",
    "question": "Asexual reproduction takes place through budding in: (a) Amoeba (b) Yeast (c) Plasmodium (d) Leishmania",
    "given": {
      "Concept": "Budding"
    },
    "formulaUsed": "Yeast puts out small buds that separate and grow.",
    "derivationSteps": [
      "Amoeba reproduces by binary fission in any plane, so (a) is wrong.",
      "Yeast puts out small buds that detach and grow into new cells, so (b) is correct.",
      "Plasmodium divides by multiple fission, so (c) is wrong.",
      "Leishmania divides by binary fission at a definite orientation, so (d) is wrong."
    ],
    "finalAnswer": "(b) Yeast",
    "conceptualTip": "Budding: yeast and Hydra."
  },
  {
    "id": 14,
    "questionNumber": "Exercise Q2",
    "question": "Which of the following is not a part of the female reproductive system in human beings? (a) Ovary (b) Uterus (c) Vas deferens (d) Fallopian tube",
    "given": {
      "Concept": "Male vs female organs"
    },
    "formulaUsed": "Vas deferens belongs to the male system.",
    "derivationSteps": [
      "The ovary makes eggs, the fallopian tube carries them, and the uterus holds the developing embryo: all are female organs.",
      "The vas deferens carries sperms from the testis, so it is part of the male reproductive system."
    ],
    "finalAnswer": "(c) Vas deferens",
    "conceptualTip": "Vas deferens has 'sperm' duty, so it is male."
  },
  {
    "id": 15,
    "questionNumber": "Exercise Q3",
    "question": "The anther contains: (a) sepals (b) ovules (c) pistil (d) pollen grains",
    "given": {
      "Concept": "Parts of a stamen"
    },
    "formulaUsed": "The anther is the part of the stamen that produces pollen.",
    "derivationSteps": [
      "Sepals are the outer green leaf-like parts of the flower, not inside the anther.",
      "Ovules are inside the ovary of the pistil.",
      "The pistil is the female part, separate from the stamen.",
      "The anther, at the top of the stamen, contains pollen grains, which carry the male germ-cells."
    ],
    "finalAnswer": "(d) pollen grains",
    "conceptualTip": "Anther = pollen factory."
  },
  {
    "id": 16,
    "questionNumber": "Exercise Q4",
    "question": "What are the advantages of sexual reproduction over asexual reproduction?",
    "given": {
      "Concept": "Variation and adaptation"
    },
    "formulaUsed": "Sexual reproduction combines DNA of two individuals and so gives greater variation.",
    "derivationSteps": [
      "In sexual reproduction, DNA from two different individuals combine, so each offspring gets a new combination of variations.",
      "This creates greater genetic variation than the slight errors of DNA copying in asexual reproduction.",
      "Variations help the species survive if the environment changes, and provide raw material for evolution.",
      "Asexual reproduction produces nearly identical copies, so a single environmental change may wipe out all of them."
    ],
    "finalAnswer": "Sexual reproduction produces greater variation among offspring, which gives the species better chances of survival in changing environments and supports evolution.",
    "conceptualTip": "More variation = better survival of the species."
  },
  {
    "id": 17,
    "questionNumber": "Exercise Q5",
    "question": "What are the functions performed by the testis in human beings?",
    "given": {
      "Concept": "Functions of the testes"
    },
    "formulaUsed": "Testes produce sperms and secrete testosterone.",
    "derivationSteps": [
      "The testes are the site of formation of sperms (male germ-cells).",
      "They secrete the hormone testosterone.",
      "Testosterone regulates the formation of sperms and brings about changes in appearance at puberty, such as facial hair and voice change.",
      "The testes lie in the scrotum outside the body cavity because sperm formation needs a temperature lower than normal body temperature."
    ],
    "finalAnswer": "The testes produce sperms and secrete the male hormone testosterone, which regulates sperm formation and brings about the changes seen at puberty.",
    "conceptualTip": "Two jobs: sperms and testosterone."
  },
  {
    "id": 18,
    "questionNumber": "Exercise Q6",
    "question": "Why does menstruation occur?",
    "given": {
      "Concept": "Menstrual cycle"
    },
    "formulaUsed": "If the egg is not fertilised, the thickened uterine lining is shed.",
    "derivationSteps": [
      "Every month one ovary releases an egg, and the uterus prepares itself to receive a fertilised egg: its lining becomes thick, spongy and rich in blood.",
      "If the egg is not fertilised, it lives for about one day and no embryo is implanted.",
      "The prepared lining is then not needed, so it slowly breaks down and comes out through the vagina as blood and mucus.",
      "This cycle happens roughly every month and is called menstruation. It usually lasts two to eight days."
    ],
    "finalAnswer": "Menstruation occurs because the egg is not fertilised, so the thick uterine lining prepared to nourish an embryo breaks down and is shed through the vagina as blood and mucus.",
    "conceptualTip": "No fertilisation = lining discarded."
  },
  {
    "id": 19,
    "questionNumber": "Exercise Q7",
    "question": "Draw a labelled diagram of the longitudinal section of a flower.",
    "given": {
      "Concept": "Flower structure (drawing question)"
    },
    "formulaUsed": "A flower has sepals, petals, stamens (male) and a pistil/carpel (female).",
    "derivationSteps": [
      "Sepals: the outer, green, leaf-like parts at the base; they protect the flower bud.",
      "Petals: usually coloured, inside the sepals; they attract insects for pollination.",
      "Stamen (male part): made of an anther at the top, which produces pollen grains, and a thin filament that supports the anther.",
      "Pistil / carpel (female part): in the centre of the flower. It has the stigma (sticky top, receives pollen), the style (the elongated middle tube through which the pollen tube grows), and the ovary (swollen bottom part).",
      "Ovule: inside the ovary, containing the egg cell (female gamete). After fertilisation it becomes the seed and the ovary becomes the fruit.",
      "Drawing tip: draw a large vertical section, put the pistil in the centre, the stamens on either side, petals outside them, and sepals at the base with the thalamus below. Draw label lines straight and horizontal with a ruler, and write the labels on the right or left side."
    ],
    "finalAnswer": "Labelled parts: sepal, petal, stamen (anther and filament), pistil (stigma, style, ovary), ovule inside the ovary.",
    "conceptualTip": "Draw the pistil in the middle and label every part with a straight line."
  },
  {
    "id": 20,
    "questionNumber": "Exercise Q8",
    "question": "What are the different methods of contraception?",
    "given": {
      "Concept": "Contraceptive methods"
    },
    "formulaUsed": "Barrier, hormonal, intra-uterine devices and surgical methods.",
    "derivationSteps": [
      "Barrier methods: condoms on the penis or similar coverings in the vagina prevent sperms from reaching the egg. Condoms also help prevent many sexually transmitted infections.",
      "Hormonal methods: oral pills change the hormonal balance so that eggs are not released and fertilisation cannot occur. They may cause side effects.",
      "Intra-uterine devices: the loop or copper-T is placed in the uterus to prevent pregnancy; it can cause irritation of the uterus.",
      "Surgical methods: blocking the vas deferens in males (sperm transfer is prevented) or the fallopian tube in females (the egg cannot reach the uterus). These are safe in the long run but improper surgery can cause infections."
    ],
    "finalAnswer": "Contraception can be by barrier methods (condoms), hormonal pills, devices like the loop or copper-T, and surgical methods (blocking the vas deferens or fallopian tube).",
    "conceptualTip": "Four groups: barrier, hormonal, IUD, surgical."
  },
  {
    "id": 21,
    "questionNumber": "Exercise Q9",
    "question": "How are the modes for reproduction different in unicellular and multicellular organisms?",
    "given": {
      "Concept": "Reproduction and body design"
    },
    "formulaUsed": "Unicellular organisms use cell division; multicellular organisms need more complex methods.",
    "derivationSteps": [
      "Unicellular organisms reproduce by cell division: fission (binary in Amoeba, multiple in Plasmodium) or budding (yeast).",
      "Simple multicellular organisms use fragmentation (Spirogyra), regeneration and budding (Hydra), spore formation (Rhizopus) and vegetative propagation in plants.",
      "Complex multicellular organisms cannot divide cell by cell because their cells are organised into tissues and organs, so reproduction is done by a specific cell type; they use sexual reproduction through germ-cells (gametes)."
    ],
    "finalAnswer": "Unicellular organisms reproduce by simple cell division such as fission or budding, whereas multicellular organisms use more complex methods such as fragmentation, regeneration, budding, spores, vegetative propagation or sexual reproduction with specialised reproductive organs.",
    "conceptualTip": "Unicellular = cell divides; multicellular = specialised methods."
  },
  {
    "id": 22,
    "questionNumber": "Exercise Q10",
    "question": "How does reproduction help in providing stability to populations of species?",
    "given": {
      "Concept": "Reproduction and population stability"
    },
    "formulaUsed": "Consistent DNA copying maintains body design, so populations keep filling their niche.",
    "derivationSteps": [
      "Populations occupy well-defined niches in the ecosystem, using their ability to reproduce.",
      "Reproduction copies DNA consistently, so offspring keep the body design features that suit that niche.",
      "Reproduction increases the number of individuals, and the balance of birth and death rates keeps the population size stable.",
      "Variations created during copying help some individuals survive niche changes, so the species is not wiped out."
    ],
    "finalAnswer": "Reproduction copies DNA consistently, preserving body designs suited to the niche and keeping the population going, while variations help it survive changes; this gives stability to the species.",
    "conceptualTip": "Copy of body design = stable population."
  },
  {
    "id": 23,
    "questionNumber": "Exercise Q11",
    "question": "What could be the reasons for adopting contraceptive methods?",
    "given": {
      "Concept": "Reproductive health and population"
    },
    "formulaUsed": "To avoid unwanted pregnancy, protect health and control population growth.",
    "derivationSteps": [
      "To avoid pregnancy when a woman is not physically or mentally ready, since pregnancy makes major demands on her body and mind.",
      "To prevent sexually transmitted infections such as gonorrhoea, syphilis and HIV-AIDS (by using condoms).",
      "To space out or limit the number of children, helping to control the rapid growth of the population.",
      "To let young people finish growing and studying and take responsible decisions about having children."
    ],
    "finalAnswer": "Contraceptives are adopted to avoid unwanted pregnancies, protect the mother's health, prevent sexually transmitted diseases (condoms) and control population growth.",
    "conceptualTip": "Think: health of mother, protection from infection, population."
  }
];

// 80-question timed self-assessment
export const REPRO10_SELF_ASSESSMENT: QuizQuestion[] = [
  {
    "question": "Which molecule in the nucleus carries the blueprint for body design that is copied during reproduction?",
    "options": [
      "Starch",
      "DNA",
      "Haemoglobin",
      "Chlorophyll"
    ],
    "correctAnswer": 1,
    "explanation": "DNA in the chromosomes holds the information for making proteins that decide body design.",
    "id": 1
  },
  {
    "question": "Why is it not enough for a cell to copy its DNA and simply push the extra copy out?",
    "options": [
      "DNA copies cannot leave the nucleus",
      "The copy would immediately become RNA",
      "The pushed-out copy would have no cellular apparatus to run life processes",
      "Cells cannot survive with only one copy of DNA"
    ],
    "correctAnswer": 2,
    "explanation": "DNA copying is accompanied by making extra cellular apparatus so that each copy works inside its own cell.",
    "id": 2
  },
  {
    "question": "The inbuilt tendency for variation during DNA copying is the basis of",
    "options": [
      "digestion",
      "excretion",
      "transpiration",
      "evolution"
    ],
    "correctAnswer": 3,
    "explanation": "Small errors in copying create variants, which natural changes in the environment can select; this is the basis of evolution.",
    "id": 3
  },
  {
    "question": "Warming of pond water kills most bacteria, but a few survive and multiply. These survivors are best described as",
    "options": [
      "bacteria that avoided reproducing",
      "identical copies of every dead cell",
      "new species created by the water",
      "heat-resistant variants"
    ],
    "correctAnswer": 3,
    "explanation": "Variation present beforehand let a few bacteria withstand the changed niche.",
    "id": 4
  },
  {
    "question": "Variation is useful mainly for the",
    "options": [
      "survival of every individual in a population",
      "survival of the species over time",
      "speed of digestion in an organism",
      "copying of DNA without errors"
    ],
    "correctAnswer": 1,
    "explanation": "A population with variants is more likely to have some individuals surviving a change in surroundings.",
    "id": 5
  },
  {
    "question": "In Amoeba, binary fission can occur in",
    "options": [
      "only the transverse plane",
      "only the longitudinal plane",
      "any plane",
      "a plane fixed by the flagellum"
    ],
    "correctAnswer": 2,
    "explanation": "Amoeba has no fixed body axis, so the cell may split in any plane.",
    "id": 6
  },
  {
    "question": "Which unicellular organism divides in a definite orientation relative to its whip-like structure?",
    "options": [
      "Amoeba",
      "Yeast",
      "Leishmania",
      "Plasmodium"
    ],
    "correctAnswer": 2,
    "explanation": "Leishmania has a flagellum at one end and divides in a fixed orientation to it.",
    "id": 7
  },
  {
    "question": "Assertion (A): Reproduction is a life process, yet an individual can stay alive without reproducing. Reason (R): Unlike nutrition and respiration, reproduction is not essential to maintain the life of an individual.",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    "correctAnswer": 0,
    "explanation": "The reason states exactly why the assertion holds.",
    "id": 8
  },
  {
    "question": "The malarial parasite Plasmodium reproduces by",
    "options": [
      "budding",
      "fragmentation",
      "spore formation",
      "multiple fission"
    ],
    "correctAnswer": 3,
    "explanation": "Plasmodium divides into many daughter cells simultaneously.",
    "id": 9
  },
  {
    "question": "Small outgrowths that separate from the parent and grow further are seen in",
    "options": [
      "yeast",
      "Spirogyra",
      "Rhizopus",
      "Planaria"
    ],
    "correctAnswer": 0,
    "explanation": "Yeast puts out small buds that detach and grow into new cells.",
    "id": 10
  },
  {
    "question": "Spirogyra reproduces by breaking into smaller pieces, each growing into a new filament. This is called",
    "options": [
      "regeneration",
      "fragmentation",
      "budding",
      "binary fission"
    ],
    "correctAnswer": 1,
    "explanation": "Mature Spirogyra filaments break up into fragments that grow into new individuals.",
    "id": 11
  },
  {
    "question": "Which pair of animals can be cut into many pieces, each growing into a whole organism?",
    "options": [
      "Amoeba and Yeast",
      "Human and Rat",
      "Hydra and Planaria",
      "Rhizopus and Spirogyra"
    ],
    "correctAnswer": 2,
    "explanation": "Hydra and Planaria have specialised cells that proliferate and rebuild all tissues.",
    "id": 12
  },
  {
    "question": "In Hydra, a bud develops because of",
    "options": [
      "fusion of two cells",
      "spore release from a sporangium",
      "transfer of pollen",
      "repeated cell division at one specific site"
    ],
    "correctAnswer": 3,
    "explanation": "Regenerative cells divide repeatedly at one site, forming an outgrowth that becomes a small Hydra.",
    "id": 13
  },
  {
    "question": "New Bryophyllum plants grow from buds located",
    "options": [
      "in notches on the leaf margin",
      "at the root tips",
      "inside the flower",
      "in the stem's pith"
    ],
    "correctAnswer": 0,
    "explanation": "Buds in the leaf notches fall on the soil and grow into new plants.",
    "id": 14
  },
  {
    "question": "In a potato, the notches from which new shoots arise are",
    "options": [
      "ovules",
      "buds ('eyes')",
      "sporangia",
      "stigmas"
    ],
    "correctAnswer": 1,
    "explanation": "Only potato pieces containing a bud sprout into a new plant.",
    "id": 15
  },
  {
    "question": "Assertion (A): Copies of DNA made during reproduction are similar but not always identical. Reason (R): No biochemical reaction involved in copying is absolutely reliable.",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    "correctAnswer": 0,
    "explanation": "Imperfect copying reactions produce small variations.",
    "id": 16
  },
  {
    "question": "Which of these is the reproductive structure of bread mould?",
    "options": [
      "Hypha",
      "Stigma",
      "Sporangium",
      "Bud"
    ],
    "correctAnswer": 2,
    "explanation": "The blob-on-a-stick sporangia contain spores, while hyphae are thread-like non-reproductive parts.",
    "id": 17
  },
  {
    "question": "Why are the spores of Rhizopus covered with thick walls?",
    "options": [
      "To help them swim towards a mate",
      "To store food for the embryo",
      "To attract insects",
      "To protect them until they reach a moist surface"
    ],
    "correctAnswer": 3,
    "explanation": "Thick walls protect the spore until it finds moisture and can grow.",
    "id": 18
  },
  {
    "question": "In tissue culture, the small mass of dividing cells formed first in artificial medium is called",
    "options": [
      "callus",
      "zygote",
      "bud",
      "spore"
    ],
    "correctAnswer": 0,
    "explanation": "The callus is later moved to a hormone medium to form plantlets.",
    "id": 19
  },
  {
    "question": "Which plant can be propagated only vegetatively because it has lost the capacity to make viable seeds?",
    "options": [
      "Mustard",
      "Banana",
      "Wheat",
      "Pea"
    ],
    "correctAnswer": 1,
    "explanation": "Banana, jasmine, rose and orange are propagated vegetatively.",
    "id": 20
  },
  {
    "question": "Why can't most complex multi-cellular organisms reproduce simply by dividing cell by cell?",
    "options": [
      "They have no DNA",
      "They do not have a nucleus",
      "Their cells are organised into tissues and organs at definite positions",
      "Their cells cannot divide at all"
    ],
    "correctAnswer": 2,
    "explanation": "Such organised body designs make cell-by-cell division impractical.",
    "id": 21
  },
  {
    "question": "Regeneration is not the same as reproduction because",
    "options": [
      "it never involves cell division",
      "it occurs only in plants",
      "it always involves two parents",
      "most organisms do not depend on being cut up in order to reproduce"
    ],
    "correctAnswer": 3,
    "explanation": "Regeneration restores body parts after damage; it is not the normal way most organisms produce offspring.",
    "id": 22
  },
  {
    "question": "A key feature of asexual reproduction is that the new generation arises from",
    "options": [
      "a single individual",
      "two individuals of opposite sex",
      "a fused zygote",
      "two gametes"
    ],
    "correctAnswer": 0,
    "explanation": "Asexual modes need only one parent.",
    "id": 23
  },
  {
    "question": "Assertion (A): Spirogyra can reproduce by fragmentation. Reason (R): Spirogyra is a simple multi-cellular filamentous organism with relatively simple body organisation.",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    "correctAnswer": 0,
    "explanation": "Simple body organisation lets fragments regrow into new individuals.",
    "id": 24
  },
  {
    "question": "A zygote is formed by",
    "options": [
      "division of a spore",
      "fusion of a male and a female gamete",
      "budding of a parent cell",
      "fragmentation of a filament"
    ],
    "correctAnswer": 1,
    "explanation": "Fertilisation combines the two germ-cells into a zygote.",
    "id": 25
  },
  {
    "question": "Compared with a body cell, the germ-cells (gametes) of a multicellular organism contain",
    "options": [
      "the same amount of DNA",
      "double the amount of DNA",
      "no DNA",
      "half the amount of DNA"
    ],
    "correctAnswer": 3,
    "explanation": "Germ-cells carry half the DNA of a body cell so that fertilisation restores the normal amount.",
    "id": 26
  },
  {
    "question": "Of the two gametes in a complex organism, the male gamete is typically",
    "options": [
      "large with food stores and non-motile",
      "identical to the female gamete",
      "absent",
      "small and motile"
    ],
    "correctAnswer": 3,
    "explanation": "The female gamete stores food, whereas the male one is smaller and moves.",
    "id": 27
  },
  {
    "question": "Which of these plants bears unisexual flowers?",
    "options": [
      "Papaya",
      "Hibiscus",
      "Mustard",
      "Petunia"
    ],
    "correctAnswer": 0,
    "explanation": "Papaya flowers have either stamens or pistil, while Hibiscus and mustard have both.",
    "id": 28
  },
  {
    "question": "The correct order of parts of the pistil from top to bottom is",
    "options": [
      "ovary, style, stigma",
      "stigma, style, ovary",
      "style, stigma, ovary",
      "stigma, ovary, style"
    ],
    "correctAnswer": 1,
    "explanation": "The sticky stigma is terminal, the style is the middle tube, and the ovary is the swollen base.",
    "id": 29
  },
  {
    "question": "Pollen grains are produced in the",
    "options": [
      "ovary",
      "stigma",
      "anther",
      "sepal"
    ],
    "correctAnswer": 2,
    "explanation": "The anther of a stamen makes yellowish pollen grains.",
    "id": 30
  },
  {
    "question": "Transfer of pollen from an anther to a stigma of the same flower is",
    "options": [
      "cross-pollination",
      "fertilisation",
      "germination",
      "self-pollination"
    ],
    "correctAnswer": 3,
    "explanation": "Pollen moved within the same flower is self-pollination.",
    "id": 31
  },
  {
    "question": "Assertion (A): Human beings can reproduce by regeneration as Planaria do. Reason (R): Complex organisms have tissues and organs organised at definite positions.",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    "correctAnswer": 3,
    "explanation": "Humans cannot regenerate whole bodies; the reason is true and explains why.",
    "id": 32
  },
  {
    "question": "Which is NOT a usual agent of pollen transfer between flowers?",
    "options": [
      "Vas deferens",
      "Wind",
      "Water",
      "Animals"
    ],
    "correctAnswer": 0,
    "explanation": "Wind, water and animals carry pollen; the vas deferens is a human male organ.",
    "id": 33
  },
  {
    "question": "The pollen tube carries the male germ-cell through the",
    "options": [
      "filament to the anther",
      "style to the ovary",
      "sepal to the petal",
      "stigma to the filament"
    ],
    "correctAnswer": 1,
    "explanation": "The tube grows down the style so the male gamete reaches the ovule.",
    "id": 34
  },
  {
    "question": "After fertilisation in a flower, the ovule develops into a",
    "options": [
      "fruit",
      "petal",
      "seed",
      "stigma"
    ],
    "correctAnswer": 2,
    "explanation": "The ovule gets a tough coat and becomes the seed; the ovary becomes the fruit.",
    "id": 35
  },
  {
    "question": "The zygote first divides to form an embryo inside the",
    "options": [
      "anther",
      "stigma",
      "sepal",
      "ovule"
    ],
    "correctAnswer": 3,
    "explanation": "The embryo develops within the ovule before it becomes a seed.",
    "id": 36
  },
  {
    "question": "The process in which a seed's embryo grows into a seedling is called",
    "options": [
      "germination",
      "pollination",
      "fertilisation",
      "budding"
    ],
    "correctAnswer": 0,
    "explanation": "Under suitable conditions the embryo in the seed develops into a seedling.",
    "id": 37
  },
  {
    "question": "Fertilisation is best defined as",
    "options": [
      "landing of pollen on the stigma",
      "fusion of the male and female germ-cells",
      "formation of a fruit",
      "opening of a flower"
    ],
    "correctAnswer": 1,
    "explanation": "Fusion of gametes gives the zygote.",
    "id": 38
  },
  {
    "question": "Sperms are formed in the",
    "options": [
      "prostate gland",
      "urethra",
      "testes",
      "seminal vesicles"
    ],
    "correctAnswer": 2,
    "explanation": "The testes produce sperms and testosterone.",
    "id": 39
  },
  {
    "question": "Assertion (A): Testes lie outside the abdominal cavity in the scrotum. Reason (R): Sperm formation requires a temperature higher than the normal body temperature.",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    "correctAnswer": 2,
    "explanation": "Sperm formation needs a lower temperature, so the reason is false.",
    "id": 40
  },
  {
    "question": "The testes lie in the scrotum because sperm formation needs a",
    "options": [
      "higher temperature than the body",
      "complete absence of oxygen",
      "constant supply of urine",
      "temperature lower than the normal body temperature"
    ],
    "correctAnswer": 3,
    "explanation": "The scrotum outside the abdomen keeps the testes cooler.",
    "id": 41
  },
  {
    "question": "Which hormone secreted by the testes regulates sperm formation and puberty changes in boys?",
    "options": [
      "Testosterone",
      "Insulin",
      "Thyroxine",
      "Adrenaline"
    ],
    "correctAnswer": 0,
    "explanation": "Testosterone controls sperm production and secondary sexual features.",
    "id": 42
  },
  {
    "question": "The common passage for sperms and urine in a human male is the",
    "options": [
      "ureter",
      "urethra",
      "oviduct",
      "vas deferens only"
    ],
    "correctAnswer": 1,
    "explanation": "The vas deferens joins a tube from the bladder to form the urethra.",
    "id": 43
  },
  {
    "question": "Which glands add fluid that helps sperm transport and gives nutrition?",
    "options": [
      "Thyroid and pituitary",
      "Salivary glands and liver",
      "Prostate gland and seminal vesicles",
      "Adrenal glands and pancreas"
    ],
    "correctAnswer": 2,
    "explanation": "These glands add secretions along the vas deferens.",
    "id": 44
  },
  {
    "question": "Eggs are produced in the",
    "options": [
      "uterus",
      "cervix",
      "vagina",
      "ovaries"
    ],
    "correctAnswer": 3,
    "explanation": "An ovary releases one egg every month after puberty.",
    "id": 45
  },
  {
    "question": "Fertilisation in a human female normally occurs in the",
    "options": [
      "fallopian tube",
      "vagina",
      "cervix",
      "urinary bladder"
    ],
    "correctAnswer": 0,
    "explanation": "Sperms travel up and meet the egg in the oviduct.",
    "id": 46
  },
  {
    "question": "The uterus opens into the vagina through the",
    "options": [
      "oviduct",
      "cervix",
      "urethra",
      "placenta"
    ],
    "correctAnswer": 1,
    "explanation": "The narrow lower opening of the uterus is the cervix.",
    "id": 47
  },
  {
    "question": "Assertion (A): Pollination is the transfer of pollen from the anther to the stigma. Reason (R): Fertilisation is the fusion of the male and female gametes.",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    "correctAnswer": 1,
    "explanation": "Both statements are correct, but fertilisation does not explain what pollination is.",
    "id": 48
  },
  {
    "question": "The disc-like tissue through which the embryo obtains glucose and oxygen is the",
    "options": [
      "scrotum",
      "cervix",
      "placenta",
      "ovule"
    ],
    "correctAnswer": 2,
    "explanation": "Villi on the embryo's side and blood spaces on the mother's side allow exchange.",
    "id": 49
  },
  {
    "question": "The development of a human child in the mother's body takes about",
    "options": [
      "nine days",
      "nine weeks",
      "two years",
      "nine months"
    ],
    "correctAnswer": 3,
    "explanation": "The gestation period is roughly nine months.",
    "id": 50
  },
  {
    "question": "The child is born because of",
    "options": [
      "rhythmic contractions of the uterine muscles",
      "contraction of the placenta",
      "opening of the fallopian tubes",
      "secretion of testosterone"
    ],
    "correctAnswer": 0,
    "explanation": "Uterine muscle contractions push the baby out.",
    "id": 51
  },
  {
    "question": "Menstruation usually lasts for about",
    "options": [
      "two to eight weeks",
      "two to eight days",
      "one hour",
      "twenty days"
    ],
    "correctAnswer": 1,
    "explanation": "The uterine lining is shed over roughly two to eight days.",
    "id": 52
  },
  {
    "question": "If not fertilised, a human egg lives for about",
    "options": [
      "one hour",
      "one month",
      "one day",
      "one year"
    ],
    "correctAnswer": 2,
    "explanation": "An unfertilised egg survives roughly a day.",
    "id": 53
  },
  {
    "question": "Puberty is the period when",
    "options": [
      "a person is born",
      "only boys change",
      "milk teeth first appear",
      "the rate of general body growth slows and reproductive tissues mature"
    ],
    "correctAnswer": 3,
    "explanation": "Reproductive tissues mature after general body growth slows.",
    "id": 54
  },
  {
    "question": "Which change occurs in boys but NOT in girls at puberty?",
    "options": [
      "Cracking of voice and thick hair on the face",
      "Growth of hair in the armpits",
      "Oily skin and pimples",
      "Awareness of the body"
    ],
    "correctAnswer": 0,
    "explanation": "Facial hair and voice cracking are seen in boys; the others occur in both sexes.",
    "id": 55
  },
  {
    "question": "Assertion (A): Spores of Rhizopus are covered by thick walls. Reason (R): The hyphae of Rhizopus are thread-like structures.",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    "correctAnswer": 1,
    "explanation": "Both are true, but hyphal shape does not explain why spores have thick walls.",
    "id": 56
  },
  {
    "question": "Which is a bacterial sexually transmitted infection?",
    "options": [
      "HIV-AIDS",
      "Syphilis",
      "Warts",
      "Malaria"
    ],
    "correctAnswer": 1,
    "explanation": "Gonorrhoea and syphilis are bacterial; warts and HIV-AIDS are viral.",
    "id": 57
  },
  {
    "question": "Which contraceptive also gives some protection against sexually transmitted infections?",
    "options": [
      "Oral pill",
      "Copper-T",
      "Condom",
      "Blocking the fallopian tube"
    ],
    "correctAnswer": 2,
    "explanation": "A condom is a barrier that stops many microbes as well as sperms.",
    "id": 58
  },
  {
    "question": "Oral contraceptive pills prevent pregnancy by",
    "options": [
      "blocking the vas deferens",
      "irritating the uterus",
      "killing all sperms in the testes",
      "changing hormonal balance so that eggs are not released"
    ],
    "correctAnswer": 3,
    "explanation": "Pills act on hormones, and can cause side effects.",
    "id": 59
  },
  {
    "question": "The loop or copper-T is placed in the",
    "options": [
      "uterus",
      "fallopian tube",
      "vas deferens",
      "ovary"
    ],
    "correctAnswer": 0,
    "explanation": "These devices act inside the uterus.",
    "id": 60
  },
  {
    "question": "Blocking the vas deferens prevents pregnancy because",
    "options": [
      "egg release is stopped",
      "sperm transfer is stopped",
      "the uterus lining cannot form",
      "the embryo cannot implant"
    ],
    "correctAnswer": 1,
    "explanation": "Without sperm in the semen, fertilisation cannot occur.",
    "id": 61
  },
  {
    "question": "Blocking the fallopian tube in a woman prevents pregnancy because",
    "options": [
      "the ovary stops working forever",
      "menstruation cannot occur",
      "the egg cannot reach the uterus or meet sperms",
      "testosterone is not produced"
    ],
    "correctAnswer": 2,
    "explanation": "The tube is the egg's path and site of fertilisation.",
    "id": 62
  },
  {
    "question": "A farmer wants banana plants that are exactly like the parent plant. The best method is",
    "options": [
      "growing from seeds",
      "cross-pollination",
      "spore formation",
      "vegetative propagation"
    ],
    "correctAnswer": 3,
    "explanation": "Vegetative propagation gives plants genetically similar to the parent.",
    "id": 63
  },
  {
    "question": "Assertion (A): Oral contraceptive pills prevent pregnancy by stopping the release of eggs. Reason (R): Oral pills are placed inside the uterus.",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    "correctAnswer": 2,
    "explanation": "Pills are swallowed; loops and copper-T are placed in the uterus.",
    "id": 64
  },
  {
    "question": "Some potato pieces with 'eyes' and some without are kept on moist cotton. Fresh shoots appear on",
    "options": [
      "only the pieces with eyes",
      "only the pieces without eyes",
      "all pieces equally",
      "none of the pieces"
    ],
    "correctAnswer": 0,
    "explanation": "Buds are needed for new shoots.",
    "id": 65
  },
  {
    "question": "Money-plant cuttings are placed in water. Which will grow new leaves and roots?",
    "options": [
      "Only pieces from between two leaves with no node",
      "Pieces having a node with a leaf",
      "Only dead pieces",
      "None of them"
    ],
    "correctAnswer": 1,
    "explanation": "Regenerative tissue is present at the nodes carrying leaves or buds.",
    "id": 66
  },
  {
    "question": "A Planaria is cut into three pieces. What is expected?",
    "options": [
      "Only the head piece survives",
      "All pieces die",
      "Each piece may grow into a complete Planaria",
      "The pieces fuse back together"
    ],
    "correctAnswer": 2,
    "explanation": "Planaria regenerate from body pieces using specialised cells.",
    "id": 67
  },
  {
    "question": "A woman using a copper-T gets a sexually transmitted infection from her partner. What does this show?",
    "options": [
      "Copper-T caused the infection",
      "Copper-T protects only against bacteria",
      "Infections are impossible with contraceptives",
      "Copper-T does not protect against such infections"
    ],
    "correctAnswer": 3,
    "explanation": "Copper-T only prevents pregnancy; a barrier such as a condom is needed for STI protection.",
    "id": 68
  },
  {
    "question": "Compared with asexual reproduction, sexual reproduction produces more variation because",
    "options": [
      "DNA from two different individuals is combined",
      "DNA is never copied",
      "only one parent is involved",
      "the zygote has half the DNA"
    ],
    "correctAnswer": 0,
    "explanation": "Combining two parents' DNA gives novel combinations.",
    "id": 69
  },
  {
    "question": "If the germ-cells carried the full amount of DNA of a body cell (not half), then each generation would have",
    "options": [
      "half the DNA of the previous one",
      "double the DNA of the previous one",
      "no DNA",
      "the same DNA as the previous one"
    ],
    "correctAnswer": 1,
    "explanation": "Fusion of two full sets would double the amount every generation.",
    "id": 70
  },
  {
    "question": "A bee carries pollen from the anther of one flower to the stigma of another. This is",
    "options": [
      "self-pollination",
      "fertilisation",
      "cross-pollination",
      "germination"
    ],
    "correctAnswer": 2,
    "explanation": "Transfer from one flower to another is cross-pollination.",
    "id": 71
  },
  {
    "question": "Assertion (A): Yeast reproduces by binary fission. Reason (R): Yeast puts out small buds that separate and grow further.",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    "correctAnswer": 3,
    "explanation": "Yeast reproduces by budding, not binary fission.",
    "id": 72
  },
  {
    "question": "A student sees a blob-on-a-stick structure on stale bread. The blob is",
    "options": [
      "a hypha with no function",
      "a pollen grain",
      "a fully grown yeast bud",
      "a sporangium containing spores"
    ],
    "correctAnswer": 3,
    "explanation": "The blobs are sporangia of Rhizopus.",
    "id": 73
  },
  {
    "question": "The long tail of a sperm helps it to",
    "options": [
      "move towards the female germ-cell",
      "store food for the embryo",
      "produce testosterone",
      "attach to the uterine wall"
    ],
    "correctAnswer": 0,
    "explanation": "Sperms are mostly genetic material with a tail for motility.",
    "id": 74
  },
  {
    "question": "After fertilisation, the embryo becomes attached to the uterus by",
    "options": [
      "fusion with the ovary",
      "implantation in the thick uterine lining",
      "entering the vagina",
      "joining the scrotum"
    ],
    "correctAnswer": 1,
    "explanation": "The embryo is implanted in the blood-rich uterine lining and forms the placenta.",
    "id": 75
  },
  {
    "question": "In males, the excretory and reproductive systems share the",
    "options": [
      "vas deferens only",
      "testes",
      "urethra",
      "prostate only"
    ],
    "correctAnswer": 2,
    "explanation": "Both urine and sperms leave through the urethra.",
    "id": 76
  },
  {
    "question": "The correct sequence of human development after fertilisation is",
    "options": [
      "foetus, zygote, embryo",
      "embryo, zygote, foetus",
      "zygote, foetus, embryo",
      "zygote, embryo, foetus"
    ],
    "correctAnswer": 3,
    "explanation": "The zygote divides into a ball of cells (embryo), which develops organs to become a foetus.",
    "id": 77
  },
  {
    "question": "The thin stalk-like part of a stamen that supports the anther is the",
    "options": [
      "filament",
      "style",
      "stigma",
      "ovule"
    ],
    "correctAnswer": 0,
    "explanation": "A stamen has an anther on top, held up by a filament.",
    "id": 78
  },
  {
    "question": "A crop plant is raised by grafting and flowers earlier than one from seed. This is because",
    "options": [
      "grafting removes the need for water",
      "vegetatively propagated plants bear flowers and fruits earlier",
      "grafted plants make more seeds",
      "they combine DNA from two parents"
    ],
    "correctAnswer": 1,
    "explanation": "Vegetative propagation gives earlier flowering and fruiting.",
    "id": 79
  },
  {
    "question": "Assertion (A): The pollen tube travels through the style to reach the ovary. Reason (R): This lets the male gamete reach the female gamete inside the ovule.",
    "options": [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    "correctAnswer": 0,
    "explanation": "The tube is the route for delivering the male gamete.",
    "id": 80
  }
];
