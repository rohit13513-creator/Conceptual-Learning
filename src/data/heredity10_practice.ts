// Class 10 CBSE Biology -- Chapter 8: Heredity
import type { QuizQuestion, NCERTSolvedQuestion } from "../types-custom";

// SOLVED TEXTBOOK QUESTIONS (every in-text question + every end-of-chapter exercise)
export const HEREDITY10_NCERT_SOLVED: NCERTSolvedQuestion[] = [
  {
    "id": 1,
    "questionNumber": "In-text 8.1 Q1",
    "question": "If a trait A exists in 10% of a population of an asexually reproducing species and a trait B exists in 60% of the same population, which trait is likely to have arisen earlier?",
    "given": {
      "Concept": "Accumulation of variation in asexual reproduction"
    },
    "formulaUsed": "In asexual reproduction, variations arise only from small DNA-copying errors and are passed to every descendant of that individual.",
    "derivationSteps": [
      "In an asexually reproducing species, a new trait arises in one individual through a small error in DNA copying.",
      "That individual then reproduces and passes the trait to all its offspring, and they pass it on to theirs. The trait therefore spreads through the population generation after generation.",
      "The longer a trait has been present, the more generations it has had to spread, so it will be found in a larger percentage of the population.",
      "Trait B is present in 60% of the population, while trait A is present in only 10%. So B has spread much further."
    ],
    "finalAnswer": "Trait B (present in 60% of the population) is likely to have arisen earlier, because it has had more generations to spread by inheritance.",
    "conceptualTip": "In asexual reproduction a trait spreads only by inheritance, so a higher percentage suggests an older trait."
  },
  {
    "id": 2,
    "questionNumber": "In-text 8.1 Q2",
    "question": "How does the creation of variations in a species promote survival?",
    "given": {
      "Concept": "Variation and natural selection"
    },
    "formulaUsed": "Variation gives some individuals an advantage when the environment changes; these survivors reproduce and continue the species.",
    "derivationSteps": [
      "Variations mean that the individuals of a species are not all identical; they differ in small ways.",
      "The environment can change, for example through a heat wave, cold, drought or disease.",
      "Different variants have different chances of surviving the change. Some variants may be better suited to the new conditions. For example, heat-resistant bacteria survive a heat wave while the others die.",
      "The individuals with the useful variation survive and reproduce, and pass the variation to their offspring. Selection of variants by environmental factors is the basis of evolution.",
      "Thus, the species does not become extinct even if a large number of individuals die."
    ],
    "finalAnswer": "Variations mean that some individuals are likely to be suited to a changed environment. They survive and reproduce, so the species as a whole survives and evolves.",
    "conceptualTip": "Variation is the species' insurance policy against a changing environment."
  },
  {
    "id": 3,
    "questionNumber": "In-text 8.2 Q1",
    "question": "How do Mendel's experiments show that traits may be dominant or recessive?",
    "given": {
      "Concept": "Monohybrid cross (tall x short pea plants)"
    },
    "formulaUsed": "F1 shows only one parental trait (dominant); the other trait reappears in F2 (recessive) in the ratio 3 : 1.",
    "derivationSteps": [
      "Mendel crossed a pure tall pea plant (TT) with a pure short pea plant (tt). All the F1 plants were tall; there were no medium-height plants. Only one of the two parental traits was seen.",
      "He then self-pollinated the F1 (Tt) plants. In the F2 generation about three-quarters of the plants were tall and one-quarter were short (3 : 1). Genotypes: 1 TT : 2 Tt : 1 tt.",
      "So the shortness trait had not been lost in F1. It was inherited but not expressed, because it was masked by the tallness trait.",
      "A trait that is expressed even when only one copy of its factor is present (T) is called the dominant trait. A trait that is expressed only when both copies are of that type (tt) is called the recessive trait."
    ],
    "finalAnswer": "In F1 only the tall trait appears, and in F2 the short trait reappears in one-fourth of the plants (3 tall : 1 short). This shows tallness is dominant and shortness is recessive.",
    "conceptualTip": "A trait that disappears in F1 and reappears in F2 is recessive."
  },
  {
    "id": 4,
    "questionNumber": "In-text 8.2 Q2",
    "question": "How do Mendel's experiments show that traits are inherited independently?",
    "given": {
      "Concept": "Dihybrid cross (round yellow x wrinkled green / tall round x short wrinkled)"
    },
    "formulaUsed": "Dihybrid F2 phenotype ratio = 9 : 3 : 3 : 1, showing new combinations of traits.",
    "derivationSteps": [
      "Mendel crossed pure tall plants with round seeds with pure short plants with wrinkled seeds. All F1 plants were tall with round seeds, so tallness and round seeds are dominant.",
      "He self-pollinated the F1 plants. In F2 he obtained four types: tall round, tall wrinkled, short round and short wrinkled, in the ratio 9 : 3 : 3 : 1.",
      "Tall-wrinkled and short-round plants are new combinations that were not present in either parent. They can appear only if the factors for height and for seed shape are separated and recombine freely.",
      "Therefore, the factors for height and seed shape are inherited independently of each other."
    ],
    "finalAnswer": "In the dihybrid cross, F2 contains new combinations (tall-wrinkled and short-round) in the ratio 9 : 3 : 3 : 1. This shows that different traits are inherited independently.",
    "conceptualTip": "New combinations of parental traits in F2 = independent inheritance."
  },
  {
    "id": 5,
    "questionNumber": "In-text 8.2 Q3",
    "question": "A man with blood group A marries a woman with blood group O and their daughter has blood group O. Is this information enough to tell you which of the traits - blood group A or O - is dominant? Why or why not?",
    "given": {
      "Concept": "Father: blood group A; Mother: blood group O; Daughter: blood group O"
    },
    "formulaUsed": "Dominance can be decided only when the F1 of a cross between two pure (homozygous) parents is seen, or when the genotypes are known.",
    "derivationSteps": [
      "Treat A and O as two versions of a trait. The daughter has blood group O, so she must have received the O version from each parent (if O is recessive), or at least from one of them (if O is dominant).",
      "Case 1: Suppose A is dominant and O is recessive. Mother = OO, father = AO (heterozygous). The daughter can be OO, so blood group O is possible.",
      "Case 2: Suppose O is dominant and A is recessive. Father = AA (only the recessive trait shows as A), mother = OO or OA. The daughter can be OA, which shows the dominant trait O, so blood group O is again possible.",
      "Both cases give the same observation, so the single result cannot tell us which trait is dominant. To decide dominance we need a cross between pure parents and the F1 result, or the genotypes and ratios in many offspring."
    ],
    "finalAnswer": "No. The information is not sufficient, because the daughter's blood group O can be explained whether A is dominant or O is dominant. Only one child and no genotypes are given, so dominance cannot be decided.",
    "conceptualTip": "One child gives no ratio; dominance needs pure parents or ratios."
  },
  {
    "id": 6,
    "questionNumber": "In-text 8.2 Q4",
    "question": "How is the sex of the child determined in human beings?",
    "given": {
      "Concept": "Sex chromosomes: women XX, men XY"
    },
    "formulaUsed": "Mother (XX) gives X always; father (XY) gives X or Y. Child = XX (girl) or XY (boy).",
    "derivationSteps": [
      "Humans have 23 pairs of chromosomes. 22 pairs are autosomes; one pair is the sex chromosomes.",
      "Women have a perfect pair of sex chromosomes, XX. Men have a mismatched pair, one normal X and one short Y (XY).",
      "All eggs of the mother carry one X chromosome. Half of the sperms of the father carry X and half carry Y.",
      "If a sperm carrying X fertilises the egg, the child is XX, a girl. If a sperm carrying Y fertilises the egg, the child is XY, a boy.",
      "So the chance of a boy or a girl is equal (50% each), and the sex is decided by the chromosome inherited from the father."
    ],
    "finalAnswer": "The sex of the child depends on the sex chromosome received from the father: X (with the mother's X) gives a girl (XX) and Y gives a boy (XY). The mother always gives X.",
    "conceptualTip": "Father decides: X sperm = girl, Y sperm = boy."
  },
  {
    "id": 7,
    "questionNumber": "Exercise Q1",
    "question": "A Mendelian experiment consisted of breeding tall pea plants bearing violet flowers with short pea plants bearing white flowers. The progeny all bore violet flowers, but almost half of them were short. This suggests that the genetic make-up of the tall parent can be depicted as (a) TTWW (b) TTww (c) TtWW (d) TtWw",
    "given": {
      "Concept": "Cross: tall violet x short white; progeny all violet, about half short"
    },
    "formulaUsed": "Short white parent must be ttww. Work out each trait separately from the progeny.",
    "derivationSteps": [
      "The short white parent shows both recessive traits, so its genotype is ttww and it produces only tw gametes.",
      "Flower colour: all progeny are violet. If the tall parent were Ww, half the progeny would be white. Since none are white, the tall parent must be WW (homozygous violet).",
      "Height: about half the progeny are short (tt). A short offspring needs a t from each parent, so the tall parent carries t. Being tall, it must be Tt. If it were TT, all progeny would be tall.",
      "So the tall parent is TtWW. Check: TtWW x ttww. Gametes of the tall parent: TW and tW. Gametes of the short parent: tw. Progeny: TtWw (tall, violet) and ttWw (short, violet) in the ratio 1 : 1.",
      "This matches the observation: all violet, half short."
    ],
    "finalAnswer": "(c) TtWW",
    "conceptualTip": "Half short means Tt x tt; no white means WW."
  },
  {
    "id": 8,
    "questionNumber": "Exercise Q2",
    "question": "A study found that children with light-coloured eyes are likely to have parents with light-coloured eyes. On this basis, can we say anything about whether the light eye colour trait is dominant or recessive? Why or why not?",
    "given": {
      "Concept": "Observation: light-eyed children usually have light-eyed parents"
    },
    "formulaUsed": "Dominance can be shown only by a cross of pure parents (which trait shows in F1) or by ratios; correlation with the parents' trait alone does not decide it.",
    "derivationSteps": [
      "If light eye colour is recessive, a light-eyed person has two copies of the recessive factor (ee). Two light-eyed parents (ee x ee) can only have light-eyed children. So light-eyed children would have light-eyed parents.",
      "If light eye colour is dominant, light-eyed parents (for example EE or Ee, or a pair like Ee x Ee) are also likely to have light-eyed children, and this also fits the observation.",
      "The study gives only a general link between the parents' and children's traits. It does not tell us the genotypes of the parents or the ratio of the traits in the children.",
      "Both possibilities explain the observation equally well, so nothing definite can be said."
    ],
    "finalAnswer": "No, we cannot say. The observation fits both a dominant and a recessive light eye colour. Dominance can be decided only by crossing pure parents (seeing the F1) or from the ratios among the offspring.",
    "conceptualTip": "If an observation fits both possibilities, it proves neither."
  },
  {
    "id": 9,
    "questionNumber": "Exercise Q3",
    "question": "Outline a project which aims to find the dominant coat colour in dogs.",
    "given": {
      "Concept": "Find the dominant coat colour by crossing pure dogs of two different coat colours"
    },
    "formulaUsed": "The trait that appears in all F1 progeny of a cross between pure parents is dominant; the trait missing in F1 is recessive.",
    "derivationSteps": [
      "Aim: To find out which of two coat colours in dogs (for example black and brown) is dominant.",
      "Method: (1) Select pure (true-breeding) black dogs and pure brown dogs; pure lines are those which produce puppies of only their own colour when bred among themselves for several generations. (2) Cross a pure black dog with a pure brown dog, and repeat with many pairs to get many puppies. (3) Record the coat colour of every F1 puppy. (4) Then breed F1 dogs among themselves to obtain the F2 generation and record the colours of all puppies.",
      "Observations: Count the number of puppies of each colour in F1 and in F2, and note the ratios.",
      "Reasoning: If all F1 puppies are of one colour (say black), that colour is dominant and the other (brown) is recessive. In F2 the dominant colour should appear in about 3 out of 4 puppies and the recessive colour in about 1 out of 4 (3 : 1). If a colour is not seen in F1 but appears in F2, it is recessive.",
      "A large number of puppies must be studied so that the ratios are reliable."
    ],
    "finalAnswer": "Cross pure dogs of two coat colours, and record the colour of all F1 puppies. The colour seen in all of F1 is dominant. Confirm by crossing F1 dogs and finding a 3 : 1 ratio of dominant to recessive colour in F2.",
    "conceptualTip": "Pure parents, count the F1 and F2: the F1 colour is the dominant one."
  },
  {
    "id": 10,
    "questionNumber": "Exercise Q4",
    "question": "How is the equal genetic contribution of male and female parents ensured in the progeny?",
    "given": {
      "Concept": "Germ cells carry half the chromosome number; fertilisation restores it"
    },
    "formulaUsed": "Each body cell has 2 copies of each chromosome (one from each parent); each germ cell has only 1 copy; fertilisation: 1 + 1 = 2.",
    "derivationSteps": [
      "Every body cell of a sexually reproducing organism has two sets of chromosomes, one from the father and one from the mother.",
      "During the formation of germ cells (gametes), the number of chromosomes is halved. Each germ cell receives only one chromosome from each pair, so each has a single set of genes.",
      "The male gamete (sperm or pollen) and the female gamete (egg) therefore each carry one set of chromosomes, so both contribute equally.",
      "At fertilisation the two gametes fuse to form the zygote. It has one set from the father and one set from the mother, restoring the normal chromosome number of the species."
    ],
    "finalAnswer": "Both parents produce germ cells with half the chromosome number (one set), and at fertilisation the male and female gametes each add one set. The zygote therefore has equal genetic material from both parents.",
    "conceptualTip": "Half from the father plus half from the mother makes a full set."
  }
];

// SELF ASSESSMENT (80 MCQs, 50-minute test)
export const HEREDITY10_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "The passing of traits from one generation to the next is called:", options: ["Variation", "Heredity", "Evolution", "Fertilisation"], correctAnswer: 1, explanation: "Heredity is the process by which traits are reliably passed from parents to offspring." },
  { id: 2, question: "In asexually reproducing organisms, variations arise mainly due to:", options: ["Meiosis", "Crossing of two different parents", "Fusion of gametes", "Small inaccuracies in DNA copying"], correctAnswer: 3, explanation: "Only one parent is involved, so the differences come from minor errors made while copying DNA." },
  { id: 3, question: "Very little variation is seen among the individual plants of:", options: ["A sugarcane field", "A human population", "A herd of cattle", "A flock of sparrows"], correctAnswer: 0, explanation: "Sugarcane is propagated asexually, so the plants are nearly identical." },
  { id: 4, question: "Selection of variants by environmental factors forms the basis of:", options: ["Fertilisation", "Pollination", "Evolutionary processes", "Regeneration"], correctAnswer: 2, explanation: "The environment favours suitable variants, which then survive and reproduce; this drives evolution." },
  { id: 5, question: "Mendel carried out his famous experiments on:", options: ["Fruit flies", "Garden pea plants", "Maize", "Rice"], correctAnswer: 1, explanation: "Mendel grew garden peas (Pisum sativum) in his monastery garden." },
  { id: 6, question: "Who is known as the Father of Modern Genetics?", options: ["Charles Darwin", "Jean Lamarck", "James Watson", "Gregor Mendel"], correctAnswer: 3, explanation: "Mendel worked out the laws of inheritance from his pea experiments." },
  { id: 7, question: "A trait that is expressed even when only one copy of its factor is present is called:", options: ["Dominant", "Recessive", "Acquired", "Sex-linked"], correctAnswer: 0, explanation: "A dominant trait shows up in both homozygous and heterozygous conditions." },
  { id: 8, question: "A section of DNA that provides the information for making one protein is called a:", options: ["Chromosome", "Nucleus", "Gene", "Ribosome"], correctAnswer: 2, explanation: "This is the textbook definition of a gene." },
  { id: 9, question: "Different forms of the same gene, found at the same position on a pair of chromosomes, are called:", options: ["Genotypes", "Alleles", "Phenotypes", "Gametes"], correctAnswer: 1, explanation: "Alleles are alternative versions of a gene occupying the same locus." },
  { id: 10, question: "The phenotype of an organism refers to its:", options: ["Genetic make-up", "Alleles in its gametes", "Number of chromosomes", "Observable characteristics"], correctAnswer: 3, explanation: "Phenotype is the visible or measurable expression of the genotype and the environment." },
  { id: 11, question: "An individual with the genotype Tt is described as:", options: ["Heterozygous", "Homozygous dominant", "Homozygous recessive", "Pure line"], correctAnswer: 0, explanation: "The two alleles are different (T and t), so the individual is heterozygous." },
  { id: 12, question: "Mendel was the first scientist to:", options: ["Use an electron microscope", "Discover DNA", "Count the individuals showing each trait in every generation", "Discover chromosomes"], correctAnswer: 2, explanation: "His mathematical counting of offspring in each generation revealed the ratios behind inheritance." },
  { id: 13, question: "When a pure tall pea plant is crossed with a pure short pea plant, the F1 plants are:", options: ["Half tall and half short", "All tall", "All of medium height", "All short"], correctAnswer: 1, explanation: "Tallness is dominant, so every F1 plant (Tt) is tall; there is no blending." },
  { id: 14, question: "The phenotypic ratio in the F2 generation of a monohybrid cross is:", options: ["1 : 2 : 1", "9 : 3 : 3 : 1", "1 : 1", "3 : 1"], correctAnswer: 3, explanation: "Three plants show the dominant trait for every one showing the recessive trait." },
  { id: 15, question: "The genotypic ratio in the F2 generation of a monohybrid cross (TT, Tt, tt) is:", options: ["1 : 2 : 1", "3 : 1", "9 : 3 : 3 : 1", "1 : 1"], correctAnswer: 0, explanation: "F1 (Tt) self-pollination gives 1 TT : 2 Tt : 1 tt." },
  { id: 16, question: "The statement that the two alleles of a gene separate during gamete formation so that each gamete gets only one is the Law of:", options: ["Dominance", "Independent assortment", "Segregation", "Linkage"], correctAnswer: 2, explanation: "This is Mendel's Law of Segregation." },
  { id: 17, question: "The phenotypic ratio obtained in the F2 generation of a dihybrid cross is:", options: ["9 : 3 : 3 : 1", "3 : 1", "1 : 2 : 1", "1 : 1 : 1 : 1"], correctAnswer: 0, explanation: "Round-yellow : round-green : wrinkled-yellow : wrinkled-green = 9 : 3 : 3 : 1." },
  { id: 18, question: "In the cross between pure tall round-seeded and pure short wrinkled-seeded pea plants, the F2 plants showing new combinations of parental traits are:", options: ["Tall round and short wrinkled", "Tall round only", "Short wrinkled only", "Tall wrinkled and short round"], correctAnswer: 3, explanation: "The parents were tall-round and short-wrinkled, so tall-wrinkled and short-round are the new combinations." },
  { id: 19, question: "Every germ cell (gamete) contains:", options: ["Two sets of chromosomes", "One set of chromosomes", "Only the sex chromosomes", "No chromosomes"], correctAnswer: 1, explanation: "Germ cells carry a single gene set so that fertilisation restores the double set." },
  { id: 20, question: "The number of chromosomes in a normal human body cell is:", options: ["23", "44", "46", "48"], correctAnswer: 2, explanation: "Humans have 23 pairs, that is 46 chromosomes." },
  { id: 21, question: "The sex chromosomes of a human female are:", options: ["XX", "XY", "YY", "XO"], correctAnswer: 0, explanation: "Women have a perfectly matched pair of X chromosomes." },
  { id: 22, question: "In human beings the sex of a child is decided by:", options: ["The X chromosome of the mother", "The temperature in the womb", "The number of autosomes", "The sex chromosome inherited from the father"], correctAnswer: 3, explanation: "Every egg carries X, so it is the father's sperm (X or Y) that decides the sex." },
  { id: 23, question: "In some reptiles such as turtles, the sex of the offspring is determined by:", options: ["The number of chromosomes", "The temperature at which the eggs are incubated", "The mother's diet", "The size of the egg"], correctAnswer: 1, explanation: "Incubation temperature acts as an environmental cue for sex in some reptiles." },
  { id: 24, question: "Which of the following organisms can change its sex during its lifetime, showing that sex is not genetically fixed?", options: ["Human", "Pea plant", "Snail", "Dog"], correctAnswer: 2, explanation: "Individuals of some snails can change sex." },
  { id: 25, question: "The probability that a child born to any couple is a girl is:", options: ["50%", "25%", "75%", "100%"], correctAnswer: 0, explanation: "Half of the sperms carry X and half carry Y, so the chances are equal." },
  { id: 26, question: "The number of pairs of autosomes in a human being is:", options: ["23", "21", "44", "22"], correctAnswer: 3, explanation: "Of the 23 pairs, 22 are autosomes and one is the sex chromosome pair." },
  { id: 27, question: "Genes are located on:", options: ["The cell membrane", "Chromosomes in the nucleus", "The cytoplasm only", "Ribosomes"], correctAnswer: 1, explanation: "Genes are sections of DNA present on the chromosomes." },
  { id: 28, question: "A chromosome is made up of:", options: ["Lipid and DNA", "Starch and RNA", "Protein and DNA", "Cellulose and protein"], correctAnswer: 2, explanation: "Each chromosome consists of protein and a single long DNA molecule." },
  { id: 29, question: "If the gene for an enzyme in the pathway of a plant growth hormone works less efficiently, the plant will most likely be:", options: ["Short, because less hormone is made", "Tall, because more hormone is made", "Tall, because the enzyme is unimportant", "Unable to grow at all in any condition"], correctAnswer: 0, explanation: "Less efficient enzyme gives less hormone, and hence a shorter plant." },
  { id: 30, question: "Which of the following is NOT a reason why Mendel chose the pea plant?", options: ["Short life cycle", "Easily visible contrasting traits", "It can self-pollinate as well as cross-pollinate", "It has unisexual flowers so only cross-pollination is possible"], correctAnswer: 3, explanation: "Pea flowers are bisexual and normally self-pollinate; that is what made them useful." },
  { id: 31, question: "In the F1 generation of a monohybrid cross, the recessive trait is:", options: ["Permanently lost", "Present but not expressed", "Blended with the dominant trait", "Expressed in half of the plants"], correctAnswer: 1, explanation: "The recessive factor is still inherited; it is masked by the dominant one and reappears in F2." },
  { id: 32, question: "Which of the following is a homozygous recessive genotype?", options: ["TT", "Tt", "tt", "Both Tt and tt"], correctAnswer: 2, explanation: "Two identical recessive alleles (tt) make it homozygous recessive." },
  { id: 33, question: "Which of the following is a phenotype?", options: ["RR", "Rr", "rr", "Round seed"], correctAnswer: 3, explanation: "Round seed is an observable characteristic; the others are genotypes." },
  { id: 34, question: "By convention, a dominant allele is written as:", options: ["A capital letter", "A small letter", "A number", "A Greek letter"], correctAnswer: 0, explanation: "Dominant alleles use capital letters and recessive alleles use small letters." },
  { id: 35, question: "The number of contrasting pairs of characters studied by Mendel in pea plants was:", options: ["Five", "Seven", "Nine", "Twelve"], correctAnswer: 1, explanation: "Mendel studied seven contrasting traits, such as seed shape, seed colour and plant height." },
  { id: 36, question: "Which of the following is a recessive trait in Mendel's pea plants?", options: ["Tall plant", "Round seed", "Wrinkled seed", "Violet flower"], correctAnswer: 2, explanation: "Tall, round and violet are dominant; wrinkled seed is the recessive form." },
  { id: 37, question: "The greater diversity seen in sexually reproducing organisms is mainly due to:", options: ["DNA copying errors only", "Mitosis", "Budding", "Recombination of genes from two parents"], correctAnswer: 3, explanation: "Genes from two parents combine in new ways in every offspring." },
  { id: 38, question: "The number of chromosomes of a species stays constant over generations because:", options: ["Fertilisation restores the number that was halved in the germ cells", "Germ cells carry two sets of chromosomes", "The zygote carries only one set", "Body cells halve their chromosomes at every division"], correctAnswer: 0, explanation: "Gametes carry half the number and the zygote gets the full number back." },
  { id: 39, question: "Reappearance of short plants in the F2 generation shows that in F1 the factor for shortness was:", options: ["Destroyed", "Changed into tallness", "Inherited but not expressed", "Blended with tallness"], correctAnswer: 2, explanation: "It was hidden by the dominant tallness factor, not lost." },
  { id: 40, question: "In human beings, the Y chromosome is:", options: ["Longer than the X chromosome", "Shorter than the X chromosome", "Present in women only", "Present in every cell of a female"], correctAnswer: 1, explanation: "The Y is the short chromosome of the mismatched XY pair in men." },
  { id: 41, question: "A boy inherits his X chromosome from:", options: ["His father", "Both parents equally", "Neither parent", "His mother"], correctAnswer: 3, explanation: "The father gives him Y; the only X he can receive is the mother's." },
  { id: 42, question: "A mutation is:", options: ["A change in the DNA sequence", "Fusion of two gametes", "Division of a chromosome", "Copying of protein"], correctAnswer: 0, explanation: "Mutation is a change in the DNA sequence that can create new variations." },
  { id: 43, question: "Which of the following variations is caused mainly by the environment?", options: ["Blood group", "Eye colour", "Body weight changing with diet", "Free earlobes"], correctAnswer: 2, explanation: "Diet and lifestyle affect body weight; the others are genetically determined." },
  { id: 44, question: "The two variants of human earlobes are:", options: ["Long and short", "Free and attached", "Broad and narrow", "Curved and straight"], correctAnswer: 1, explanation: "Free and attached earlobes are the two variants mentioned in the chapter." },
  { id: 45, question: "In a sexually reproducing organism, each body cell has how many copies of a gene for a trait?", options: ["One", "Three", "Four", "Two"], correctAnswer: 3, explanation: "One copy comes from each parent, so there are two." },
  { id: 46, question: "Which genotype represents a pea plant that is homozygous for round seeds (R = round, r = wrinkled)?", options: ["RR", "Rr", "rr", "Rr and rr"], correctAnswer: 0, explanation: "Homozygous round has two identical dominant alleles, RR." },
  { id: 47, question: "In the dihybrid cross RRyy (round, green) x rrYY (wrinkled, yellow), the F1 plants are RrYy. Which traits are dominant?", options: ["Wrinkled and green", "Round and green", "Round and yellow", "Wrinkled and yellow"], correctAnswer: 2, explanation: "All F1 plants are round and yellow, so these traits are dominant." },
  { id: 48, question: "The cell formed by the fusion of a male gamete and a female gamete is called:", options: ["Gamete", "Zygote", "Spore", "Bud"], correctAnswer: 1, explanation: "Fertilisation gives a zygote with the full set of chromosomes." },
  { id: 49, question: "When two traits are inherited independently, it means that:", options: ["They always occur together", "One trait depends on the other", "They are inherited only from the mother", "The inheritance of one does not affect the inheritance of the other"], correctAnswer: 3, explanation: "Genes for different traits sort into gametes independently, giving new combinations." },
  { id: 50, question: "Genes control the characteristics of an organism mainly by:", options: ["Directing the making of proteins such as enzymes", "Directly forming muscles", "Changing the number of chromosomes", "Working only when the environment allows"], correctAnswer: 0, explanation: "A gene carries the information for a protein, and proteins such as enzymes regulate processes that produce the trait." },
  { id: 51, question: "A homozygous tall pea plant (TT) is crossed with a homozygous short plant (tt). The genotype of all the offspring is:", options: ["TT", "Tt", "tt", "Half TT and half tt"], correctAnswer: 1, explanation: "TT gives only T gametes and tt gives only t gametes, so every offspring is Tt." },
  { id: 52, question: "A heterozygous tall plant (Tt) is crossed with a short plant (tt). The ratio of tall to short progeny is:", options: ["3 : 1", "1 : 2 : 1", "All tall", "1 : 1"], correctAnswer: 3, explanation: "Gametes T, t x t, t give Tt and tt in equal numbers." },
  { id: 53, question: "Two heterozygous tall plants are crossed. The fraction of the progeny expected to be short is:", options: ["1/2", "3/4", "1/4", "0"], correctAnswer: 2, explanation: "Tt x Tt gives 1 TT : 2 Tt : 1 tt, so one quarter are short (tt)." },
  { id: 54, question: "Among the tall progeny of the cross Tt x Tt, the fraction that are homozygous (TT) is:", options: ["1/4", "1/3", "1/2", "2/3"], correctAnswer: 1, explanation: "Tall plants are TT and Tt in the ratio 1 : 2, so 1 out of every 3 tall plants is TT." },
  { id: 55, question: "If 160 seeds are obtained from self-pollination of an F1 plant RrYy (round yellow), the number of wrinkled green seeds expected is:", options: ["10", "30", "90", "20"], correctAnswer: 0, explanation: "Wrinkled green (rryy) is 1/16 of the seeds, and 160/16 = 10." },
  { id: 56, question: "A round-seeded pea plant crossed with a wrinkled-seeded plant gives about half round and half wrinkled progeny. The genotype of the round-seeded parent is:", options: ["RR", "Rr", "rr", "Cannot be determined"], correctAnswer: 1, explanation: "Wrinkled progeny (rr) need an r from each parent, so the round parent is Rr (Rr x rr gives 1 : 1)." },
  { id: 57, question: "Two round-seeded pea plants produce some wrinkled-seeded offspring. The genotypes of the parents must be:", options: ["RR x RR", "RR x Rr", "Rr x Rr", "Rr x rr"], correctAnswer: 2, explanation: "Both parents must carry the recessive allele r to give rr offspring, and both show the dominant trait, so both are Rr." },
  { id: 58, question: "A couple already has three daughters. The chance that their fourth child is a boy is:", options: ["50%", "25%", "75%", "100%"], correctAnswer: 0, explanation: "Each birth is independent; the sperm is X or Y with equal probability." },
  { id: 59, question: "A sperm carrying a Y chromosome fertilises an egg. The zygote will be:", options: ["XX, a girl", "YY, a boy", "XY, a girl", "XY, a boy"], correctAnswer: 3, explanation: "The egg always carries X, so the zygote is XY and develops into a boy." },
  { id: 60, question: "The types of gametes produced by a plant of genotype RrYy are:", options: ["RY, Ry, rY and ry", "Rr and Yy only", "RR, YY, rr and yy", "Ry and rY only"], correctAnswer: 0, explanation: "Each gamete gets one allele of each gene, and the alleles assort independently, giving four types." },
  { id: 61, question: "A plant of genotype TtRr is crossed with a plant of genotype ttrr. The phenotypic ratio of the progeny is:", options: ["9 : 3 : 3 : 1", "3 : 1", "1 : 1 : 1 : 1", "1 : 2 : 1"], correctAnswer: 2, explanation: "TtRr gives four gamete types (TR, Tr, tR, tr) in equal numbers and ttrr gives only tr, so four phenotypes appear in equal numbers." },
  { id: 62, question: "A TtRr plant is self-pollinated (T = tall, R = round). The fraction of progeny that are tall with round seeds is:", options: ["3/16", "1/16", "1/4", "9/16"], correctAnswer: 3, explanation: "Tall round is the 9 in the 9 : 3 : 3 : 1 ratio, so 9/16." },
  { id: 63, question: "In the F2 generation of a dihybrid cross between tall-round and short-wrinkled plants, the fraction of plants showing new combinations of the parental traits is:", options: ["1/4", "3/8", "9/16", "1/8"], correctAnswer: 1, explanation: "Tall-wrinkled (3) and short-round (3) make 6 out of 16, which is 3/8." },
  { id: 64, question: "The number of different genotypes that appear in the F2 generation of a dihybrid cross RrYy x RrYy is:", options: ["4", "9", "16", "6"], correctAnswer: 1, explanation: "Three genotypes for each gene (e.g. RR, Rr, rr) combine to give 3 x 3 = 9 genotypes in the ratio 1:2:2:4:1:2:1:2:1." },
  { id: 65, question: "A pure violet-flowered plant is crossed with a white-flowered plant and all F1 plants are violet. If 800 F2 plants are obtained on self-pollination of F1, the expected number of white-flowered plants is:", options: ["200", "600", "400", "100"], correctAnswer: 0, explanation: "F1 is Ww and F2 is 3 violet : 1 white, so 1/4 of 800 = 200." },
  { id: 66, question: "To find out whether a tall pea plant is TT or Tt, it should be crossed with:", options: ["A tall TT plant", "A short tt plant", "A tall Tt plant", "Any tall plant"], correctAnswer: 1, explanation: "With tt, a Tt plant gives some short offspring while a TT plant gives only tall ones." },
  { id: 67, question: "A tall plant is crossed with a short plant and all the progeny are tall. The genotype of the tall parent is:", options: ["Tt", "tt", "Cannot be determined", "TT"], correctAnswer: 3, explanation: "If the tall parent were Tt, half the progeny would be short. So it must be TT." },
  { id: 68, question: "Which of the following statements about sex chromosomes in humans is correct?", options: ["A son receives his X chromosome from his father", "A father gives his Y chromosome to all his children", "A father passes his X chromosome to all his daughters", "A daughter receives a Y chromosome from her father"], correctAnswer: 2, explanation: "A girl is XX, and her X from the father is the only X he has." },
  { id: 69, question: "If every egg of a woman could be fertilised by every sperm of a man, the proportion of zygotes that would be XX is:", options: ["1/2", "1/4", "3/4", "1"], correctAnswer: 0, explanation: "Half the sperms carry X and all the eggs carry X, so half the zygotes are XX." },
  { id: 70, question: "Which observation best proves that the recessive factor for shortness was still present in the tall F1 plants?", options: ["All F1 plants were tall", "Short plants appeared in the F2 generation", "The parent plants were pure lines", "The F1 plants were fertile"], correctAnswer: 1, explanation: "Short plants can appear in F2 only if the F1 plants carried the factor for shortness." },
  { id: 71, question: "Assertion (A): Very little variation is seen among the individual plants in a sugarcane field. Reason (R): Sugarcane reproduces by the fusion of male and female gametes.", options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is NOT the correct explanation of A.", "A is true but R is false.", "A is false but R is true."], correctAnswer: 2, explanation: "Sugarcane is propagated asexually, so the plants are nearly identical; the reason given is false." },
  { id: 72, question: "Assertion (A): A single copy of a dominant allele is enough to express the dominant trait. Reason (R): The dominant allele masks the effect of the recessive allele.", options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is NOT the correct explanation of A.", "A is true but R is false.", "A is false but R is true."], correctAnswer: 0, explanation: "Because the dominant allele masks the recessive one, it shows even in the heterozygous state." },
  { id: 73, question: "Assertion (A): In the F1 generation of Mendel's monohybrid cross, the plants showed blending of the tall and short traits. Reason (R): Only one of the two parental traits was expressed in F1.", options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is NOT the correct explanation of A.", "A is true but R is false.", "A is false but R is true."], correctAnswer: 3, explanation: "All F1 plants were tall with no medium-height plants, so there was no blending; the reason is true." },
  { id: 74, question: "Assertion (A): The phenotypic ratio in the F2 generation of a monohybrid cross is 3 : 1. Reason (R): Mendel counted the number of individuals showing each trait in every generation.", options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is NOT the correct explanation of A.", "A is true but R is false.", "A is false but R is true."], correctAnswer: 1, explanation: "Both statements are true, but counting explains how the ratio was found, not why the ratio is 3 : 1 (which is due to segregation of alleles)." },
  { id: 75, question: "Assertion (A): About half of the children born to human parents are boys. Reason (R): A woman produces two kinds of eggs, some with X and some with Y chromosome.", options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is NOT the correct explanation of A.", "A is true but R is false.", "A is false but R is true."], correctAnswer: 2, explanation: "Boys and girls arise in equal numbers because a man produces X and Y sperms equally; every egg carries X." },
  { id: 76, question: "Assertion (A): The genotype of an organism is its observable appearance. Reason (R): The phenotype is influenced by both the genotype and the environment.", options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is NOT the correct explanation of A.", "A is true but R is false.", "A is false but R is true."], correctAnswer: 3, explanation: "Observable appearance is the phenotype, not the genotype; the reason statement is correct." },
  { id: 77, question: "Assertion (A): Each germ cell carries only one set of genes. Reason (R): This ensures that the zygote formed at fertilisation has the normal double set of genes of the species.", options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is NOT the correct explanation of A.", "A is true but R is false.", "A is false but R is true."], correctAnswer: 0, explanation: "Two single sets combine at fertilisation to restore the double set, so the number stays constant over generations." },
  { id: 78, question: "Assertion (A): Tall plants with wrinkled seeds appear in the F2 generation of a cross between tall-round and short-wrinkled parents. Reason (R): Tallness and wrinkled seeds are linked traits that are always inherited together.", options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is NOT the correct explanation of A.", "A is true but R is false.", "A is false but R is true."], correctAnswer: 2, explanation: "New combinations appear because the traits are inherited independently, not linked." },
  { id: 79, question: "Assertion (A): The Y chromosome of a human male is longer than the X chromosome. Reason (R): Women have a perfectly matched pair of sex chromosomes, XX.", options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is NOT the correct explanation of A.", "A is true but R is false.", "A is false but R is true."], correctAnswer: 3, explanation: "The Y is the short chromosome of the mismatched XY pair, so A is false; R is true." },
  { id: 80, question: "Assertion (A): Both the tallness factor and the shortness factor are inherited by the F1 plants of a monohybrid cross. Reason (R): The F1 plants are half tall and half short.", options: ["Both A and R are true and R is the correct explanation of A.", "Both A and R are true but R is NOT the correct explanation of A.", "A is true but R is false.", "A is false but R is true."], correctAnswer: 2, explanation: "F1 plants (Tt) carry both factors, but all of them are tall, so R is false." }
];

