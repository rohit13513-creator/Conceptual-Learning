import type { LongQuestion, CompetencyQuestion } from "../types-custom";

// ── LONG ANSWER QUESTIONS (5 marks each) ──
export const HEREDITY10_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Describe Mendel's monohybrid cross between a pure tall and a pure short pea plant. Write the parents, gametes, F1 generation, and show the F2 generation with a Punnett square. State the phenotypic and genotypic ratios in F2.",
    markingScheme: ["Parents (TT x tt) and their gametes -- 1 mark", "F1 generation: all Tt, all tall; no medium-height plants -- 1 mark", "F1 self-pollination with gametes and Punnett square -- 2 marks", "F2 phenotypic ratio 3:1 and genotypic ratio 1:2:1 -- 1 mark"],
    answerParts: [
      { part: "Parents and gametes", text: "A monohybrid cross involves one pair of contrasting traits. Mendel crossed a pure (homozygous) tall pea plant, TT, with a pure short plant, tt. The tall plant forms only T gametes and the short plant forms only t gametes." },
      { part: "F1 generation", text: "Fusion of T and t gametes gives only Tt plants. All F1 plants are tall; there are no 'medium-height' plants. So only one parental trait (tallness) was seen and not a mixture of the two. Tt plants carry both factors, but only T is expressed, so T is dominant and t is recessive." },
      { part: "F1 self-pollination (Punnett square)", text: "Tt x Tt. Each F1 plant makes two kinds of gametes, T and t, in equal numbers. Punnett square (female gametes in rows, male gametes in columns): Row T: TT, Tt; Row t: Tt, tt. So the four possible combinations are TT, Tt, Tt and tt." },
      { part: "F2 ratios", text: "Phenotypic ratio: 3 tall (TT, Tt, Tt) : 1 short (tt), i.e. 3:1. Genotypic ratio: 1 TT : 2 Tt : 1 tt, i.e. 1:2:1. One quarter of the F2 plants are short, so the short trait, which was hidden in F1, reappears in F2. This shows that both tallness and shortness were inherited in F1 but only tallness was expressed." }
    ]
  },
  {
    id: 2,
    question: "A pure tall plant with round seeds (TTRR) is crossed with a pure short plant with wrinkled seeds (ttrr). Show the cross up to F2 with a full Punnett square. State the four phenotypes with their ratio, the genotype ratio, and what the result proves.",
    markingScheme: ["Parents, gametes and F1 (TtRr, all tall and round) -- 1 mark", "F1 gametes (TR, Tr, tR, tr) and the complete 16-box Punnett square -- 2 marks", "Four phenotypes in the ratio 9:3:3:1 -- 1 mark", "Genotype ratio 1:2:2:4:1:2:1:2:1 and conclusion of independent inheritance -- 1 mark"],
    answerParts: [
      { part: "Parents, gametes and F1", text: "TTRR (tall, round) x ttrr (short, wrinkled). Gametes: TR only from the first parent and tr only from the second. F1: all TtRr, which are tall with round seeds. So tallness and round seeds are dominant traits, while shortness and wrinkled seeds are recessive." },
      { part: "F1 selfing: gametes", text: "TtRr x TtRr. Each F1 plant produces four types of gametes in equal numbers: TR, Tr, tR and tr. This happens because the alleles of the two genes separate independently of each other." },
      { part: "16-box Punnett square (rows = one parent's gametes, columns = other parent's gametes TR, Tr, tR, tr)", text: "Row TR: TTRR, TTRr, TtRR, TtRr. Row Tr: TTRr, TTrr, TtRr, Ttrr. Row tR: TtRR, TtRr, ttRR, ttRr. Row tr: TtRr, Ttrr, ttRr, ttrr." },
      { part: "Phenotypes in F2", text: "Tall, round: 9 (TTRR 1, TTRr 2, TtRR 2, TtRr 4). Tall, wrinkled: 3 (TTrr 1, Ttrr 2). Short, round: 3 (ttRR 1, ttRr 2). Short, wrinkled: 1 (ttrr). Phenotype ratio = 9:3:3:1 (total 16). Tall-wrinkled and short-round are new combinations not present in either parent." },
      { part: "Genotype ratio and conclusion", text: "Genotype ratio: TTRR 1 : TTRr 2 : TtRR 2 : TtRr 4 : TTrr 1 : Ttrr 2 : ttRR 1 : ttRr 2 : ttrr 1 = 1:2:2:4:1:2:1:2:1 (nine genotypes). The new combinations show that the tall/short trait and the round/wrinkled trait are inherited independently of each other." }
    ]
  },
  {
    id: 3,
    question: "State Mendel's three laws of inheritance. For each, give the experimental evidence from pea plants that supports it.",
    markingScheme: ["Law of dominance stated -- 1 mark", "Law of segregation stated -- 1 mark", "Law of independent assortment stated -- 1 mark", "Evidence from the monohybrid cross (F1 all tall, F2 3:1) -- 1 mark", "Evidence from the dihybrid cross (new combinations, 9:3:3:1) -- 1 mark"],
    answerParts: [
      { part: "Law of dominance", text: "Some alleles are dominant over others. If an organism has at least one dominant allele, it displays the dominant trait. The recessive trait is expressed only when both alleles are recessive." },
      { part: "Law of segregation", text: "During the formation of gametes, the two alleles for each gene separate so that each gamete carries only one allele. Each offspring therefore inherits one allele from each parent." },
      { part: "Law of independent assortment", text: "During the formation of gametes, the alleles of different genes segregate independently and are distributed independently to the next generation. This is because the genes lie on separate chromosomes, and germ cells take one chromosome from each pair." },
      { part: "Evidence for dominance and segregation", text: "In the tall x short cross all F1 plants were tall (dominance: only one parental trait shows). On selfing, F2 had tall and short plants in a 3:1 ratio. The reappearance of shortness in F2 shows that the factor for shortness was present in F1 but not expressed, and that the two factors (T and t) separated into different gametes." },
      { part: "Evidence for independent assortment", text: "In the cross between tall round and short wrinkled plants, F1 were all tall and round. In F2, new combinations (tall wrinkled and short round) appeared along with the parental types, in the ratio 9:3:3:1. This shows that seed shape and plant height are inherited independently." }
    ]
  },
  {
    id: 4,
    question: "Why did Mendel choose the garden pea plant for his experiments? Give four reasons. Also name any four of the seven contrasting traits he studied.",
    markingScheme: ["Any four reasons for choosing the pea plant, explained -- 3 marks", "Four contrasting traits studied by Mendel -- 1 mark", "How Mendel's method (counting) led to the laws of inheritance -- 1 mark"],
    answerParts: [
      { part: "Reasons for choosing the pea plant", text: "(i) Easy to grow: pea plants are easy to cultivate and can be grown in pots or in the ground. (ii) Short life cycle: it is an annual plant with a life cycle of 2-3 months, so a large number of offspring can be studied in a short time. (iii) Visible characteristics: it has several easily recognisable contrasting traits such as round/wrinkled seeds, tall/short plants and violet/white flowers. (iv) Self and cross pollination: the flowers are bisexual and normally self-pollinate, so pure lines are easy to maintain, and Mendel could also carry out cross-pollination between chosen plants." },
      { part: "Contrasting traits (any four of seven)", text: "Seed shape (round or wrinkled), seed colour (yellow or green), plant height (tall or dwarf), flower colour (violet/purple or white), flower position (axial or terminal), pod shape (inflated or constricted), pod colour (green or yellow)." },
      { part: "Mendel's method", text: "Many others had studied inheritance in peas earlier, but Mendel blended his knowledge of science and mathematics and was the first to keep count of the individuals showing a particular trait in each generation. Calculating the ratios helped him arrive at the laws of inheritance, and so he is called the Father of Modern Genetics." }
    ]
  },
  {
    id: 5,
    question: "Differentiate between dominant and recessive traits with reference to Mendel's tall x short experiment. Explain why a recessive trait may be absent in F1 yet appear in F2.",
    markingScheme: ["Definition of dominant trait/allele with example -- 1 mark", "Definition of recessive trait/allele with example -- 1 mark", "Genotype combinations that show each trait (TT, Tt, tt) -- 1 mark", "Recessive trait masked in F1 (Tt) -- 1 mark", "Reappearance in F2 due to separation of alleles and tt combination -- 1 mark"],
    answerParts: [
      { part: "Dominant trait", text: "A dominant trait (e.g. tallness, allele T) is the trait that is expressed even when only one copy of its allele is present. It is written with a capital letter." },
      { part: "Recessive trait", text: "A recessive trait (e.g. shortness, allele t) is the trait that is expressed only when both copies of the allele are recessive. In the presence of the dominant allele it remains masked. It is written with a small letter." },
      { part: "Genotypes and traits", text: "TT (homozygous) and Tt (heterozygous) are both tall; only tt is short. A single copy of T is enough to make the plant tall, while both copies have to be t for the plant to be short." },
      { part: "Why the recessive trait is missing in F1", text: "All F1 plants are Tt. They inherited a t allele from the short parent, but the dominant T allele hides its effect. So the plants look tall although they carry both factors." },
      { part: "Why it reappears in F2", text: "F1 plants make T and t gametes in equal numbers. In selfing, a t male gamete can meet a t female gamete to form tt, which has no dominant allele and so is short. This gives 1/4 short plants in F2 (3 tall : 1 short)." }
    ]
  },
  {
    id: 6,
    question: "Define homozygous, heterozygous, genotype and phenotype. Using flower colour in plants (A = red, a = white) as an example, write the genotypes and phenotypes possible.",
    markingScheme: ["Genotype and phenotype defined -- 1 mark", "Homozygous and heterozygous defined -- 1 mark", "AA: homozygous dominant, red -- 1 mark", "Aa: heterozygous, red, with reason for masking -- 1 mark", "aa: homozygous recessive, white; phenotype also influenced by environment -- 1 mark"],
    answerParts: [
      { part: "Genotype and phenotype", text: "Genotype is the genetic make-up of an individual, that is, the two alleles present for a trait. Phenotype is the observable trait or characteristic of the organism (appearance, behaviour or physiology). Phenotype depends on the genotype and is also influenced by the environment." },
      { part: "Homozygous and heterozygous", text: "An individual inherits two alleles for a trait, one from each parent. If the two alleles are the same (AA or aa) the individual is homozygous. If the two alleles are different (Aa) the individual is heterozygous." },
      { part: "AA", text: "AA is homozygous dominant (two copies of the dominant allele A). Phenotype: red flowers." },
      { part: "Aa", text: "Aa is heterozygous (one A and one a). Phenotype: red flowers, because the dominant allele A is expressed and masks the effect of the recessive allele a." },
      { part: "aa", text: "aa is homozygous recessive (two copies of a). Phenotype: white flowers, because the recessive trait is expressed only when two copies of the recessive allele are present. Note that AA and Aa have different genotypes but the same phenotype." }
    ]
  },
  {
    id: 7,
    question: "Explain how genes control the characteristics (traits) of an organism, taking tallness in pea plants as an example. What will happen if the gene for the enzyme is altered?",
    markingScheme: ["DNA is the information source for proteins; gene defined -- 1 mark", "Plant height depends on the amount of a plant growth hormone -- 1 mark", "Enzyme efficiency decides the amount of hormone (gene -> enzyme -> hormone -> trait chain) -- 1 mark", "Efficient enzyme gives a tall plant -- 1 mark", "Altered gene gives a less efficient enzyme, less hormone and a short plant; conclusion -- 1 mark"],
    answerParts: [
      { part: "DNA and gene", text: "Cellular DNA is the information source for making proteins in the cell. A section of DNA that provides information for one protein is called the gene for that protein. Proteins (such as enzymes and hormones) control the characteristics of the body." },
      { part: "Plant height and hormone", text: "Plants have hormones that trigger growth. Plant height therefore depends on the amount of a particular plant growth hormone. The amount of hormone made depends on the efficiency of the process of making it." },
      { part: "Role of the enzyme", text: "An enzyme is important in this process. The chain of control is: gene -> enzyme -> hormone -> growth -> tallness." },
      { part: "Tall plant", text: "If the enzyme works efficiently, a lot of hormone is made, and the plant becomes tall. This is the case with the dominant allele T." },
      { part: "Altered gene", text: "If the gene for the enzyme has an alteration that makes the enzyme less efficient, less hormone is made and the plant is short. This is the case with the allele t. Thus genes control characteristics or traits by controlling the proteins made in the cell." }
    ]
  },
  {
    id: 8,
    question: "Explain the relationship between DNA, genes and chromosomes. Why are chromosomes present in pairs in body cells, and what is the advantage of genes being on separate chromosomes?",
    markingScheme: ["DNA: molecule with genetic information; instructions for proteins -- 1 mark", "Gene: section of DNA coding for one protein; unit of heredity -- 1 mark", "Chromosome: thread-like structure in the nucleus made of protein and one DNA molecule; genes lie on it -- 1 mark", "Chromosomes occur as pairs (maternal and paternal copy) -- 1 mark", "Genes on separate chromosomes are inherited independently -- 1 mark"],
    answerParts: [
      { part: "DNA", text: "Deoxyribonucleic acid (DNA) is a molecule which contains the genetic information for the development, growth and reproduction of an organism. It contains the instructions for making proteins." },
      { part: "Gene", text: "Each section of DNA that encodes the information for making one specific protein is called a gene for that protein. A gene is the fundamental unit of heredity; it passes from parents to offspring and carries the information that determines a trait." },
      { part: "Chromosome", text: "Chromosomes are thread-like structures in the nucleus, each made of protein and a single molecule of DNA. Genes are located on the chromosomes. So, in order of size: chromosome > DNA > gene (many genes lie along the DNA of a chromosome)." },
      { part: "Chromosomes in pairs", text: "Every body cell has two copies of each chromosome, one from the mother and one from the father. In humans there are 23 such pairs (46 chromosomes). Hence each cell has two copies (alleles) of each gene." },
      { part: "Separate chromosomes", text: "Each gene set is present not as one long thread of DNA but as separate independent pieces, the chromosomes. Since a germ cell takes one chromosome of every pair independently, genes on different chromosomes are inherited independently, which explains the new combinations of traits seen in Mendel's dihybrid cross." }
    ]
  },
  {
    id: 9,
    question: "How is the equal genetic contribution of the male and female parents ensured in the progeny? Explain with reference to germ cells and chromosome number.",
    markingScheme: ["Both parents contribute equal DNA; each trait has two versions in the child -- 1 mark", "Every body cell has two sets of genes, one from each parent -- 1 mark", "Germ cells have only one gene set (one chromosome from each pair) -- 1 mark", "Fusion of male and female gametes restores the normal chromosome number -- 1 mark", "Stability of DNA of the species; example with human numbers -- 1 mark"],
    answerParts: [
      { part: "Equal contribution", text: "Both the father and the mother contribute practically equal amounts of genetic material to the child. So each trait can be influenced by both paternal and maternal DNA, and there are two versions of each trait in every child." },
      { part: "Two sets of genes", text: "For this mechanism to work, each pea plant (or human) must have two sets of all genes, one inherited from each parent. Every body cell therefore has two copies of each chromosome, one maternal and one paternal." },
      { part: "Germ cells have one gene set", text: "The germ cells (sperm and egg) are formed by a special cell division (meiosis) in which each germ cell takes only one chromosome from each pair. Thus each germ cell has only half the number of chromosomes and one gene set. The chromosome taken from a pair may be of maternal or paternal origin." },
      { part: "Fertilisation", text: "When the sperm and the egg fuse, the zygote receives one set of chromosomes from the father and one set from the mother. This restores the normal number of chromosomes in the progeny." },
      { part: "Stability and example", text: "This ensures that the DNA content of the species remains constant from generation to generation. In humans, the sperm and the egg each carry 23 chromosomes and the zygote has 23 + 23 = 46 chromosomes." }
    ]
  },
  {
    id: 10,
    question: "How is the sex of a child determined in human beings? Show the inheritance of sex chromosomes with a Punnett square and explain why the father, not the mother, decides the sex of the child.",
    markingScheme: ["22 pairs of autosomes and one pair of sex chromosomes; women XX, men XY -- 1 mark", "Gametes: all eggs X; sperm X or Y in equal numbers -- 1 mark", "Punnett square: XX, XY, XX, XY -- 1 mark", "Girl if X sperm fertilises the egg, boy if Y sperm does; 50:50 chance -- 1 mark", "Reason: every child gets X from the mother, so the sex depends on the father's contribution -- 1 mark"],
    answerParts: [
      { part: "Sex chromosomes", text: "Humans have 23 pairs of chromosomes. 22 pairs are autosomes and are alike in both sexes. The 23rd pair, the sex chromosomes, is not always a perfect pair. Women have a perfect pair, XX. Men have a mismatched pair, one normal-sized X and one short Y, that is, XY." },
      { part: "Gametes", text: "Mother (XX) produces only one type of egg, each carrying X. Father (XY) produces two types of sperm in equal numbers, half carrying X and half carrying Y." },
      { part: "Punnett square (eggs in rows, sperm in columns)", text: "Row X (egg): X + X = XX (girl); X + Y = XY (boy). Row X (egg): X + X = XX (girl); X + Y = XY (boy). So the four combinations are XX, XY, XX and XY." },
      { part: "Result", text: "A child who inherits an X chromosome from the father is a girl (XX); a child who inherits a Y chromosome from the father is a boy (XY). Half of the children are boys and half are girls, so the chance of a boy or a girl at each conception is 50%." },
      { part: "Why the father decides", text: "All children, whether boys or girls, inherit an X chromosome from their mother. The only variable is what they get from the father (X or Y). Thus the sex of the child is determined by the sex chromosome inherited from the father and the mother has no role in deciding it." }
    ]
  },
  {
    id: 11,
    question: "Different species use different strategies for determining sex. Explain, with examples, how sex is determined by environmental cues in some animals and by genes in humans. What does sex change in snails indicate?",
    markingScheme: ["Strategies differ from species to species -- 1 mark", "Temperature-dependent sex determination in some reptiles, with explanation -- 1 mark", "Sex change in snails (and some fish) shows sex is not genetically determined -- 1 mark", "Humans: sex largely genetically determined by sex chromosomes -- 1 mark", "Comparison: environmental cue versus inherited chromosome -- 1 mark"],
    answerParts: [
      { part: "Different strategies", text: "The two sexes in sexual reproduction must be somewhat different from each other, and different species use very different strategies to decide the sex of a newborn." },
      { part: "Environmental cues: reptiles", text: "In some reptiles such as certain turtles and crocodiles, the temperature at which the fertilised eggs are incubated decides whether the young developing in the eggs will be male or female. Eggs of the same parents kept at different temperatures give different sexes, so genes inherited from the parents do not fix the sex here." },
      { part: "Sex change", text: "In some animals such as snails (and certain fish), an individual can change sex during its lifetime, sometimes in response to environmental or social conditions. This indicates that sex is not genetically determined in these animals." },
      { part: "Genetic determination in humans", text: "In human beings the sex of an individual is largely genetically determined. Women have XX and men have XY sex chromosomes. The genes inherited from the parents decide whether we will be boys or girls: the sperm carrying X gives a girl and the sperm carrying Y gives a boy." },
      { part: "Comparison", text: "In reptiles the sex depends on an external factor (temperature) and can vary with conditions; in snails it can change during life; in humans it is fixed at fertilisation by the chromosome received from the father and does not change with the environment." }
    ]
  },
  {
    id: 12,
    question: "Compare variation in asexual and sexual reproduction. Why do sugarcane fields show little variation while human populations show distinct variation? Give the causes of variation in each case.",
    markingScheme: ["Asexual: offspring are almost identical; small changes only from DNA copying errors -- 1 mark", "Bacteria example: four bacteria from two divisions are very similar -- 1 mark", "Sexual: DNA from two parents gives genetic recombination and greater variation -- 1 mark", "Sugarcane (asexual) versus human (sexual) contrast -- 1 mark", "Earlobe example of variants; significance of variation -- 1 mark"],
    answerParts: [
      { part: "Variation in asexual reproduction", text: "A single individual reproduces, so the offspring are genetically almost identical to the parent. Some variation still arises because DNA copying is not perfectly accurate; small inaccuracies in DNA replication cause minor differences (mutations)." },
      { part: "Bacterial example", text: "If one bacterium divides and the two resulting bacteria divide again, the four bacteria are very similar, with only tiny differences caused by errors in DNA copying." },
      { part: "Variation in sexual reproduction", text: "The DNA of two different parents combine, so offspring get new combinations of genes (genetic recombination). Independent assortment of chromosomes in germ cells adds to the variety. Hence sexual reproduction generates much greater diversity than asexual reproduction and the number of successful variations is maximised." },
      { part: "Sugarcane versus humans", text: "A field of sugarcane is propagated vegetatively (asexually), so the plants show very little variation. Humans and many animals reproduce sexually, so quite distinct variations are visible among different individuals." },
      { part: "Example and importance", text: "Free and attached earlobes are two variants seen in human populations. Variations in a population are useful because, when the environment changes, some variants may survive better and keep the species going." }
    ]
  },
  {
    id: 13,
    question: "Explain how variations accumulate over successive generations. Why do all variations not have an equal chance of survival? How does selection of variants by the environment form the basis of evolution? Use the example of bacteria in a heat wave.",
    markingScheme: ["Accumulation over generations: inherited plus newly created differences -- 1 mark", "Each individual differs from the others, as in the four bottom-row individuals of the diagram -- 1 mark", "Variations differ in survival value -- 1 mark", "Bacteria that withstand heat survive in a heat wave -- 1 mark", "Selection of variants by environment is the basis of evolution (natural selection) -- 1 mark"],
    answerParts: [
      { part: "Inheritance gives sameness and small changes", text: "Inheritance from the previous generation provides both a common basic body design and subtle changes in it for the next generation." },
      { part: "Accumulation", text: "When this new generation reproduces, the second generation has differences that it inherits from the first generation as well as newly created differences. If an original organism gives rise to two individuals, and each of these gives rise to two more, each of the four in the last row differs from the others: some differences are unique and others are inherited from their differing parents. So variation keeps increasing over succeeding generations." },
      { part: "Unequal chances of survival", text: "Depending on the nature of the variation, different individuals have different advantages in the environment in which they live. Some variants are better suited to the conditions than others." },
      { part: "Example", text: "Bacteria that can withstand heat will survive better in a heat wave, and the heat-sensitive bacteria will die. Similarly, other variations may give an advantage against cold, drought or disease." },
      { part: "Natural selection", text: "Selection of variants by environmental factors is called natural selection. The survivors reproduce and pass the useful variation to their offspring, so the population changes over time. This forms the basis of evolutionary processes." }
    ]
  },
  {
    id: 14,
    question: "Distinguish between genetic variation and environmental variation. Give causes and examples of each, and state which of them can be inherited by the next generation.",
    markingScheme: ["Genetic variation defined: differences in DNA -- 1 mark", "Causes of genetic variation: mutation, genetic recombination, gene flow -- 1 mark", "Environmental variation defined with causes -- 1 mark", "Examples of each -- 1 mark", "Only genetic variation is inherited; phenotype is influenced by both -- 1 mark"],
    answerParts: [
      { part: "Genetic variation", text: "Genetic variation is due to differences in DNA that lead to differences in traits. It occurs through mutations (changes in the DNA sequence caused by mistakes during cell division or by DNA-damaging agents such as chemicals and radiation), genetic recombination during sexual reproduction, and gene flow (migration of individuals or genetic material between populations)." },
      { part: "Environmental variation", text: "Environmental variation describes differences between organisms caused by exposure to different external conditions such as climate, diet, temperature, light, moisture, minerals, lifestyle or accidents." },
      { part: "Examples", text: "Genetic: free or attached earlobes; tall or short pea plants. Environmental: the same variety of pea seeds grown in fertile and poor soil grow to different heights; a person who exercises and eats well becomes stronger than one who does not; a person who loses a finger in an accident." },
      { part: "Inheritance", text: "Genetic variation is present in the DNA and can be passed to the next generation through germ cells. Changes caused purely by the environment do not change the DNA of the germ cells and so are not inherited." },
      { part: "Combined effect", text: "The phenotype of an organism is influenced by its genotype and by the environment together. For example, a plant with genes for tallness may still remain short if it gets too little nutrition." }
    ]
  },
  {
    id: 15,
    question: "Activity 8.1: How would you carry out a study of earlobe types in your class and suggest a rule for the inheritance of earlobe types?",
    markingScheme: ["Observe the ears of all students and record free and attached earlobes -- 1 mark", "Calculate the percentage of each type -- 1 mark", "Record the earlobe type of the parents of each student -- 1 mark", "Correlate the child's type with that of the parents (family patterns) -- 1 mark", "Suggest a rule using dominant/recessive genotypes and limits of the study -- 1 mark"],
    answerParts: [
      { part: "Observation", text: "Observe the ears of all students. The earlobe is the lowest part of the ear; it is 'free' if it hangs loose and 'attached' if it is closely attached to the side of the head. Prepare a list of students having free earlobes and those having attached earlobes." },
      { part: "Percentage", text: "Percentage of free earlobes = (number of students with free earlobes / total number of students) x 100. Calculate the percentage of attached earlobes in the same way. For example, 30 free out of 40 students gives 75% free and 25% attached." },
      { part: "Parents' earlobes", text: "Find out the earlobe type of the father and mother of each student, and enter it in a table next to the student's own type." },
      { part: "Correlation", text: "Compare each student with the parents. Look for patterns, for example: do two attached-lobe parents ever have a free-lobe child? Do two free-lobe parents ever have an attached-lobe child? Do children with attached lobes have parents of both types?" },
      { part: "Rule", text: "Suppose two free-lobed parents sometimes have an attached-lobed child but two attached-lobed parents never have a free-lobed child. Then free earlobe is the dominant trait (F, gives FF or Ff) and attached is the recessive trait (f, gives ff). Two heterozygous free-lobed parents (Ff x Ff) can have attached-lobed children in a 3:1 ratio. The rule is only a suggestion based on the sample; families are small, so the data support the rule but do not prove it." }
    ]
  },
  {
    id: 16,
    question: "Activity 8.2: In Mendel's tall x short experiment, what experiment would you do to confirm that the F2 generation really had a 1:2:1 ratio of TT, Tt and tt plants?",
    markingScheme: ["Grow a large number of F2 plants from the selfing of F1 (Tt) plants -- 1 mark", "Short plants are tt (they breed true) -- 1 mark", "Self-pollinate each tall F2 plant and grow its progeny separately -- 1 mark", "Tall plants giving only tall progeny are TT; those giving tall and short in 3:1 are Tt -- 1 mark", "Counting gives TT : Tt : tt = 1 : 2 : 1 (one-quarter, one-half, one-quarter) -- 1 mark"],
    answerParts: [
      { part: "Raising the F2", text: "Cross pure tall (TT) with pure short (tt) plants, get the F1 (all Tt), self-pollinate the F1 plants and collect the seeds. Grow a large number of F2 plants; the larger the number, the closer the ratios will be to the expected ones." },
      { part: "Short plants", text: "Short F2 plants have the genotype tt (both copies must be t for shortness). When self-pollinated they give only short plants, so they are the 'tt' class, about one-quarter of F2." },
      { part: "Tall plants", text: "Tall F2 plants may be TT or Tt, and cannot be told apart by looking at them. So each tall F2 plant is self-pollinated (or crossed with a short tt plant) and its seeds are grown separately." },
      { part: "Interpretation", text: "If the tall plant is TT, all its progeny are tall. If it is Tt, its progeny contain tall and short plants in the ratio 3:1 on selfing (or 1:1 when crossed with tt)." },
      { part: "Conclusion", text: "Out of every 4 F2 plants, about 1 is short (tt), about 1 is tall and gives only tall progeny (TT), and about 2 are tall but give both tall and short progeny (Tt). This confirms the ratio 1 TT : 2 Tt : 1 tt." }
    ]
  },
  {
    id: 17,
    question: "Explain with reasons: (a) Two tall pea plants can produce a short plant, but two short plants never produce a tall plant. (b) Two parents with attached earlobes (recessive) cannot have a free-earlobed child, if free earlobe is dominant. (c) A plant with genotype Tt and a plant with genotype TT look alike.",
    markingScheme: ["Part (a): both tall parents must be Tt, giving a tt child with a Punnett square -- 2 marks", "Part (a): two short plants are tt and give only t gametes, so all offspring are tt -- 1 mark", "Part (b): two ff parents give only f gametes, so all children are ff (attached) -- 1 mark", "Part (c): T is dominant, so TT and Tt have the same phenotype but different genotypes -- 1 mark"],
    answerParts: [
      { part: "(a) Tall x tall giving short", text: "A short plant is tt. It must get one t from each parent. So each tall parent must have carried a hidden t, that is, both are Tt. Tt x Tt gives gametes T, t and T, t, and the offspring are TT, Tt, Tt, tt. One in four is short (tt), so short offspring from two tall plants are possible whenever both parents are heterozygous." },
      { part: "(a) Short x short", text: "A short plant can only be tt since a single T would make it tall. Both parents form only t gametes, so every offspring is tt and short. A tall plant cannot appear because no T allele is available in either parent." },
      { part: "(b) Attached x attached", text: "If free earlobe (F) is dominant, then attached earlobe is ff. Two ff parents form only f gametes, so all children are ff and have attached earlobes, barring a new mutation." },
      { part: "(c) TT and Tt", text: "T is dominant over t. One copy of T is enough to produce enough enzyme and growth hormone for tallness, so both TT and Tt are tall (same phenotype). Their genotypes are different: TT is homozygous and Tt is heterozygous, which can be told apart only by their progeny." }
    ]
  },
  {
    id: 18,
    question: "Why are the two traits, height and seed shape, inherited independently in pea plants? Explain with the help of chromosomes and germ cells. What would have happened if the genes for the two traits were linked on one chromosome?",
    markingScheme: ["Each gene set is present as separate independent pieces called chromosomes -- 1 mark", "Every germ cell takes one chromosome from each pair, of maternal or paternal origin -- 1 mark", "So gametes of all four types (TR, Tr, tR, tr) are formed in equal numbers -- 1 mark", "Random fusion gives new combinations and the 9:3:3:1 ratio -- 1 mark", "If linked, only three plant types in 1:2:1 would appear, not the 9:3:3:1 ratio -- 1 mark"],
    answerParts: [
      { part: "Chromosomes", text: "The genetic material is not a single long thread of DNA but is present as separate independent pieces, the chromosomes. Each cell has two copies of each chromosome, one maternal and one paternal. The genes for the two traits in Mendel's experiment are on different chromosomes." },
      { part: "Germ cells", text: "Each germ cell takes one chromosome from each pair, and which member (maternal or paternal) goes into a gamete is independent for each pair. The alleles of different genes therefore segregate independently." },
      { part: "Gametes", text: "A TtRr plant forms four types of gametes in equal numbers: TR, Tr, tR and tr. Random fusion of these gametes gives 16 combinations." },
      { part: "New combinations", text: "The 16 combinations give tall round : tall wrinkled : short round : short wrinkled = 9:3:3:1. Tall wrinkled and short round are new combinations, which prove that the two traits are inherited independently." },
      { part: "If linked", text: "If the two genes stayed together on one whole piece of DNA, the alleles would be linked and would move together. For example, in a cross between RRyy and rrYY, the F1 would form only Ry and rY gametes, and the F2 would contain only three kinds of plants, RRyy (round green), RrYy (round yellow) and rrYY (wrinkled yellow), in a 1:2:1 ratio. The wrinkled green type (rryy) would never appear and the 9:3:3:1 ratio would not be seen. Since all four types do appear in 9:3:3:1, the genes must be independent." }
    ]
  },
  {
    id: 19,
    question: "A pea plant with round, green seeds (RRyy) is crossed with a plant having wrinkled, yellow seeds (rrYY). Work out the F1 and F2 generations with a Punnett square. Compare the expected number of seeds out of 556 with the observed numbers: 315 round yellow, 108 round green, 101 wrinkled yellow and 32 wrinkled green.",
    markingScheme: ["Parent gametes Ry and rY; F1 is RrYy (round, yellow) -- 1 mark", "F1 gametes RY, Ry, rY, ry -- 1 mark", "Complete Punnett square of 16 boxes -- 1 mark", "Phenotype ratio 9:3:3:1 and expected numbers -- 1 mark", "Comparison with observed numbers and conclusion -- 1 mark"],
    answerParts: [
      { part: "Parents and F1", text: "RRyy (round, green) forms only Ry gametes; rrYY (wrinkled, yellow) forms only rY gametes. F1 = RrYy, all round and yellow. So round and yellow are dominant; wrinkled and green are recessive." },
      { part: "F1 gametes", text: "RrYy x RrYy. Each parent forms RY, Ry, rY and ry gametes in equal numbers." },
      { part: "Punnett square", text: "Row RY: RRYY, RRYy, RrYY, RrYy. Row Ry: RRYy, RRyy, RrYy, Rryy. Row rY: RrYY, RrYy, rrYY, rrYy. Row ry: RrYy, Rryy, rrYy, rryy." },
      { part: "Phenotypes and expected numbers", text: "Round yellow 9 : round green 3 : wrinkled yellow 3 : wrinkled green 1. Out of 556 seeds the expected numbers are 9/16 x 556 = about 313 round yellow, 3/16 x 556 = about 104 round green, about 104 wrinkled yellow and 1/16 x 556 = about 35 wrinkled green." },
      { part: "Comparison and conclusion", text: "The observed values (315, 108, 101, 32) are very close to the expected values (313, 104, 104, 35), i.e. about 9:3:3:1. Round yellow and wrinkled green are new combinations, not seen in the parents, showing that shape and colour of seeds are inherited independently." }
    ]
  },
  {
    id: 20,
    question: "In Mendel's monohybrid experiment, why were there no 'medium-height' plants in the F1 generation? Explain what this result showed about the nature of the traits and how the F2 generation confirmed it.",
    markingScheme: ["F1 plants were all tall; no halfway characteristics -- 1 mark", "Only one parental trait was seen, not a mixture -- 1 mark", "Selfing of the parental plants gave only tall plants, but F1 selfing gave short plants in F2 -- 1 mark", "Both tallness and shortness were inherited in F1 but only tallness was expressed -- 1 mark", "Mendel's proposal of two copies of factors (genes), identical or different -- 1 mark"],
    answerParts: [
      { part: "Observation in F1", text: "When Mendel crossed a tall plant and a short plant, all plants in the first generation (F1) were tall. There were no halfway characteristics, no medium-height plants." },
      { part: "Meaning", text: "Only one of the parental traits was seen and not a mixture of the two. So the traits do not blend; one trait (tallness) is dominant over the other (shortness)." },
      { part: "Test by selfing", text: "To find out whether the F1 tall plants were the same as the tall parental plants, Mendel let both self-pollinate. The parental plants produced only tall progeny. But the F1 plants produced F2 progeny in which one quarter were short." },
      { part: "Interpretation", text: "This indicated that both the tallness and shortness traits were inherited in the F1 plants, but only tallness was expressed. The F1 plants were therefore not identical to the pure tall parents (Tt versus TT)." },
      { part: "Mendel's proposal", text: "Mendel proposed that two copies of a factor (now called genes) controlling a trait are present in a sexually reproducing organism. The two may be identical (TT or tt) or different (Tt), depending on the parentage." }
    ]
  },
  {
    id: 21,
    question: "A man with blood group A marries a woman with blood group O and their daughter has blood group O. Is this information enough to tell you which of the traits, blood group A or O, is dominant? Why or why not? (Treat the two blood groups as a simple dominant/recessive pair.)",
    markingScheme: ["State clearly: the information is not enough -- 1 mark", "Case 1: if A is dominant, father is Aa, mother is oo, daughter oo is possible -- 2 marks", "Case 2: if O is dominant, father is aa, mother is OO or Oo, daughter with O is possible -- 1 mark", "Conclusion: both possibilities fit; more information is needed -- 1 mark"],
    answerParts: [
      { part: "Answer", text: "No, the information is not enough to decide which trait is dominant, because the daughter's blood group O can be explained in both ways." },
      { part: "If A is dominant (A) and O is recessive (a)", text: "The woman with group O must be aa. The daughter is aa and must have got an a from each parent. So the father must be Aa (heterozygous, blood group A). Cross Aa x aa gives gametes A, a and a, so the children are Aa (group A) and aa (group O) in a 1:1 ratio. A daughter with group O is possible." },
      { part: "If O is dominant (O) and A is recessive (a)", text: "The man with group A must be aa and produces only a gametes. The woman with group O may be OO or Oa. The daughter got a from her father and O from her mother, so she is Oa and shows group O. If the mother is Oa, then a daughter aa (group A) is also possible. So a daughter with group O is again possible." },
      { part: "Conclusion", text: "Whichever trait is dominant, a daughter with blood group O can be born to these parents. To find out which is dominant we need more data, such as the blood groups of many children, or of parents both showing one trait and having a child with the other trait. (In reality the ABO system is more complex, since A and B are both expressed together, but the reasoning here treats it as a simple pair.)" }
    ]
  },
  {
    id: 22,
    question: "A study found that children with light-coloured eyes are likely to have parents with light-coloured eyes. On this basis, can we say anything about whether the light eye colour trait is dominant or recessive? Why or why not?",
    markingScheme: ["State that we cannot say -- 1 mark", "If light is recessive (ll): light-eyed parents give all light-eyed children, matching the study -- 1 mark", "If light is dominant: light-eyed parents (LL or Ll) can also give light-eyed children -- 1 mark", "Both explanations fit the same observation -- 1 mark", "What evidence would settle it: two parents with the same trait having a child with the other trait -- 1 mark"],
    answerParts: [
      { part: "Answer", text: "No, this evidence alone is not enough to say whether light eye colour is dominant or recessive." },
      { part: "If light colour is recessive", text: "Light-eyed people are then ll. Two ll parents form only l gametes, so all their children are ll, i.e. light-eyed. This fits the observation." },
      { part: "If light colour is dominant", text: "Light-eyed people are then LL or Ll. Two LL parents give all LL children; LL x Ll gives LL and Ll children. All of them are light-eyed too, so this also fits the observation. Two Ll parents would sometimes give a dark-eyed child (ll), but the study only tells us that light-eyed children are likely to have light-eyed parents." },
      { part: "Why the study fails", text: "The study only shows that the trait runs in families, that is, that it is inherited. It does not compare crosses in which the parents have different traits, so it cannot show which allele masks the other." },
      { part: "What would help", text: "If two parents having the same trait produce a child showing a different trait, the new trait must be recessive (hidden in both parents). For example, if two dark-eyed parents had a light-eyed child, light eye colour would be recessive. Similarly, a cross between pure parents with the two colours, in which all F1 show one colour, would show that colour to be dominant." }
    ]
  },
  {
    id: 23,
    question: "Outline a project which aims to find the dominant coat colour in dogs.",
    markingScheme: ["Choose pure-breeding dogs of two contrasting coat colours (e.g. black and brown) -- 1 mark", "Cross them and record the coat colour of the F1 puppies -- 1 mark", "The colour that appears in all F1 is the dominant one; no blending -- 1 mark", "Cross F1 dogs among themselves and count F2 puppies; expected ratio 3:1 -- 1 mark", "Repeat with many litters and keep records to be sure of the result -- 1 mark"],
    answerParts: [
      { part: "Selecting parents", text: "Select a pure-breeding (true-breeding) black dog and a pure-breeding brown dog. Purity can be checked from the breeder's records: over several generations, black dogs mated with black dogs should give only black puppies and brown with brown only brown." },
      { part: "Cross and F1", text: "Mate the black dog with the brown dog (in both possible ways, black male x brown female and the reverse) and count and record the coat colour of every puppy of this F1 generation, using many litters." },
      { part: "Finding the dominant colour", text: "If all F1 puppies are black, then black is the dominant colour and brown is recessive. If F1 pups were of intermediate colour, it would mean the traits blend. Only the trait that appears in all F1 individuals can be dominant." },
      { part: "F2 confirmation", text: "Mate F1 dogs among themselves to get the F2 generation and count the puppies. If black (B) is dominant, F1 dogs are Bb and F2 puppies should be black and brown in the ratio 3:1 (BB, Bb, Bb, bb). The reappearance of brown pups confirms that brown was hidden, not lost." },
      { part: "Conclusion and precautions", text: "Repeat with several pairs of dogs so that the numbers are large, since small numbers may not show the ratio. Record the results in a table. Make sure the dogs are healthy and treated kindly. Note that the coat colour of dogs in nature may depend on more than one gene, so the project is done with pure lines." }
    ]
  },
  {
    id: 24,
    question: "A Mendelian experiment consisted of breeding tall pea plants bearing violet flowers with short pea plants bearing white flowers. The progeny all bore violet flowers, but almost half of them were short. Deduce the genetic make-up of the tall parent (TTWW, TTww, TtWW or TtWw) and show the cross.",
    markingScheme: ["Short white parent is ttww; it forms only tw gametes -- 1 mark", "All progeny violet: violet is dominant and the tall parent must be WW -- 1 mark", "Half the progeny short: the tall parent must be Tt (not TT) -- 1 mark", "Cross TtWW x ttww with gametes and progeny TtWw : ttWw = 1:1 -- 1 mark", "Why the other options are wrong -- 1 mark"],
    answerParts: [
      { part: "Short, white parent", text: "The short plant with white flowers shows both recessive traits, so it is ttww. It can form only one type of gamete, tw." },
      { part: "Flower colour", text: "All progeny bear violet flowers. Each progeny plant got a w from the white parent, so the violet colour must have come from a W in the tall parent, and this parent must produce only W gametes. So the tall parent is WW." },
      { part: "Height", text: "Almost half the progeny are short (tt). Each short plant got a t from the short parent and a t from the tall parent. So the tall parent must carry a t as well as a T, that is, Tt. It produces T and t gametes in equal numbers." },
      { part: "Cross", text: "TtWW x ttww. Gametes: TW and tW from the tall parent; tw from the short parent. Progeny: TtWw (tall, violet) and ttWw (short, violet) in the ratio 1:1. This matches the observation. So the answer is (c) TtWW." },
      { part: "Other options", text: "TTWW: all progeny would be tall. TTww: the progeny would all be tall and white (Ttww), not violet. TtWw: the progeny would include white-flowered plants (Ttww, ttww) as well, contrary to the observation." }
    ]
  },
  {
    id: 25,
    question: "Explain with reasons: (a) About half of the children born in a large population are boys and half are girls. (b) A mother cannot decide the sex of her child. (c) A father cannot pass his X chromosome to his son. (d) A woman has 44 + XX chromosomes in her body cells but her egg has 22 + X.",
    markingScheme: ["(a) Equal numbers of X and Y sperm and an equal chance of either fertilising the egg -- 2 marks", "(b) All eggs carry X, so the mother's contribution is always the same -- 1 mark", "(c) A son is XY; his Y comes from the father, and his X from the mother -- 1 mark", "(d) Germ cells take one chromosome of each pair, half the number -- 1 mark"],
    answerParts: [
      { part: "(a) Equal numbers of boys and girls", text: "A man produces two kinds of sperm, X-bearing and Y-bearing, in equal numbers. The egg is always X. An X sperm gives XX (girl) and a Y sperm gives XY (boy). Each sperm has an equal chance of fertilising the egg, so the chance of a boy or a girl is 50% at each conception, and in a large population about half are boys and half are girls." },
      { part: "(b) Mother cannot decide the sex", text: "A woman has the sex chromosomes XX, so all her eggs carry one X. Every child, boy or girl, inherits an X from the mother. The difference between a boy and a girl lies in what the child gets from the father, so the sex is determined by the father's sperm." },
      { part: "(c) Father to son", text: "A son is XY. He must have received a Y from his father, because a sperm carrying Y is what gives a boy. Since a father contributes only one sex chromosome to the child, he cannot give both X and Y. So the X of a son always comes from his mother, and the father's X goes only to his daughters." },
      { part: "(d) Egg chromosome number", text: "Body cells have 23 pairs (46 chromosomes: 22 pairs of autosomes plus XX). A germ cell takes only one chromosome from each pair, so the egg has 22 autosomes + one X = 23 chromosomes, which is half the number in the body cell. On fertilisation, the sperm's 23 chromosomes restore the number to 46." }
    ]
  }
];

// ── CASE-BASED COMPETENCY QUESTIONS (4 marks each: four 1-mark sub-questions) ──
export const HEREDITY10_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "Neha's Pea Garden",
    caseDescription: "Neha crossed a pure tall pea plant with a pure short pea plant. All the F1 plants were tall. She then self-pollinated the F1 plants and grew 400 F2 plants, of which 300 were tall and 100 were short.",
    subQuestions: [
      { question: "What is the genotype of the F1 plants?", options: ["TT", "Tt", "tt", "Half TT and half tt"], correctIndex: 1, answer: "Tt", explanation: "The pure tall parent (TT) gives T and the pure short parent (tt) gives t, so every F1 plant is Tt." },
      { question: "Out of the 300 tall F2 plants, about how many are expected to be heterozygous?", answer: "About 200", explanation: "F2 genotypes are in the ratio 1 TT : 2 Tt : 1 tt. So of 400 plants about 100 are TT, 200 are Tt and 100 are tt. All 200 Tt plants are tall and heterozygous." },
      { question: "Neha self-pollinates one of the 100 short F2 plants. What will its progeny be like?", answer: "All the progeny will be short.", explanation: "A short plant is tt, so it can form only t gametes and all its offspring are tt (short)." },
      { question: "Her friend expected the F1 plants to be of medium height. Why was this expectation wrong?", answer: "The traits do not blend; in the heterozygous Tt plant the dominant T allele is expressed and masks t, so all F1 plants are tall.", explanation: "Mendel found no halfway characteristics in F1; only one parental trait (the dominant one) was seen." }
    ]
  },
  {
    id: 2,
    caseTitle: "The Farmer and the Seed Colours",
    caseDescription: "A farmer knows that yellow seed colour (Y) is dominant over green seed colour (y) in his pea crop. He crosses a yellow-seeded plant, whose genotype he does not know, with a green-seeded plant. The offspring are 51 plants with yellow seeds and 49 with green seeds.",
    subQuestions: [
      { question: "What is the genotype of the yellow-seeded parent?", options: ["YY", "Yy", "yy", "Cannot be predicted"], correctIndex: 1, answer: "Yy", explanation: "Green offspring (yy) must have got a y from each parent, so the yellow parent carries y along with Y." },
      { question: "Why can the yellow parent not be YY?", answer: "A YY parent would form only Y gametes, so all offspring of YY x yy would be Yy (yellow), and no green seeds would appear.", explanation: "Since about half of the offspring are green, the yellow parent produced y gametes too." },
      { question: "If 200 offspring were produced from this same cross, how many would you expect to be yellow-seeded?", answer: "About 100", explanation: "Yy x yy gives Yy and yy in the ratio 1:1, so half of 200 are yellow." },
      { question: "One of the yellow offspring is self-pollinated. What fraction of its progeny is expected to have green seeds?", answer: "One-quarter (1/4)", explanation: "The yellow offspring are all Yy. Yy x Yy gives YY, Yy, Yy, yy in the F2, so 1 out of 4 is green (yy)." }
    ]
  },
  {
    id: 3,
    caseTitle: "Earlobes in the Sharma Family",
    caseDescription: "In the Sharma family both parents have free earlobes. Their first child has attached earlobes and their second child has free earlobes. Assume that free earlobe (E) is dominant over attached earlobe (e).",
    subQuestions: [
      { question: "What are the genotypes of the two parents?", options: ["EE and EE", "Ee and Ee", "EE and ee", "ee and ee"], correctIndex: 1, answer: "Ee and Ee", explanation: "The child with attached lobes is ee, so it got an e from each free-lobed parent. So both parents carry e and are heterozygous." },
      { question: "What is the genotype of the first child?", answer: "ee", explanation: "Attached earlobes is the recessive trait and is expressed only when both alleles are e." },
      { question: "What is the probability that a third child of this couple will have attached earlobes?", answer: "1/4 (25%)", explanation: "Ee x Ee gives EE, Ee, Ee, ee, so one out of four children is ee." },
      { question: "What is the probability that a third child will have free earlobes and also be heterozygous?", answer: "1/2 (50%)", explanation: "Out of EE, Ee, Ee, ee two combinations are Ee. All Ee individuals have free lobes." }
    ]
  },
  {
    id: 4,
    caseTitle: "Counting the F2 Plants",
    caseDescription: "A student crossed pure tall plants with round seeds (TTRR) with pure short plants with wrinkled seeds (ttrr) and self-pollinated the F1. Among 160 F2 plants she found: 90 tall with round seeds, 30 tall with wrinkled seeds, 30 short with round seeds and 10 short with wrinkled seeds.",
    subQuestions: [
      { question: "The observed phenotype ratio is closest to:", options: ["3:1", "1:2:1", "9:3:3:1", "1:1:1:1"], correctIndex: 2, answer: "9:3:3:1", explanation: "90 : 30 : 30 : 10 = 9 : 3 : 3 : 1 (dividing each by 10)." },
      { question: "What percentage of the F2 plants show new combinations of traits, not seen in the original parents?", answer: "37.5%", explanation: "The new combinations are tall wrinkled (30) and short round (30), so 60 out of 160 = 37.5% (that is, 6/16)." },
      { question: "How many of the 90 tall round plants are expected to be heterozygous for both traits (TtRr)?", answer: "About 40", explanation: "Among the 9 tall round boxes, 4 are TtRr, so 4/9 of 90 = 40." },
      { question: "How many different genotypes are possible among the tall plants with wrinkled seeds? Name them.", answer: "Two: TTrr and Ttrr", explanation: "Tall needs at least one T, wrinkled needs rr. So the genotypes are TTrr (1 box) and Ttrr (2 boxes)." }
    ]
  },
  {
    id: 5,
    caseTitle: "A Couple and Their Baby's Sex",
    caseDescription: "A couple has three daughters. The grandmother blames the mother and says she is responsible for not having a son. The couple consults a doctor, who explains how the sex of a child is decided.",
    subQuestions: [
      { question: "Which parent's chromosome decides the sex of the child?", options: ["The mother's X", "The father's X or Y", "Both equally", "Neither; it is decided by the environment"], correctIndex: 1, answer: "The father's X or Y", explanation: "Every egg carries an X, so the sex depends on whether the sperm that fertilises it carries X (girl) or Y (boy)." },
      { question: "Which sex chromosome do all the mother's eggs carry?", answer: "X", explanation: "The mother is XX and every egg gets one of her X chromosomes." },
      { question: "What is the probability that the fourth child will be a son?", answer: "1/2 (50%)", explanation: "Each conception is independent. Half the sperm carry Y, so the chance of a boy is 50% regardless of the earlier daughters." },
      { question: "Explain why the grandmother's blame is scientifically wrong.", answer: "The mother has only X chromosomes to give, so she has no Y to pass. Whether the child is a girl or a boy depends on the father's sperm (X or Y).", explanation: "The sex is decided by the chromosome the child gets from the father." }
    ]
  },
  {
    id: 6,
    caseTitle: "Turtle Eggs at Different Temperatures",
    caseDescription: "A wildlife team divided the fertilised eggs laid by one turtle into two groups. Eggs kept at 28 degrees C hatched into mostly males, while eggs kept at 32 degrees C hatched into mostly females. All the eggs had the same parents.",
    subQuestions: [
      { question: "What does this experiment show about sex determination in these turtles?", options: ["It is determined only by X and Y chromosomes", "It is influenced by the incubation temperature", "It is always decided by the mother's genes", "Sex is chosen by the hatchling"], correctIndex: 1, answer: "It is influenced by the incubation temperature", explanation: "Eggs from the same parents gave different sexes at different temperatures, so an environmental cue decides the sex." },
      { question: "Why can the parents' genes alone not explain the difference between the two groups?", answer: "Both groups have the same parents and hence the same genes, yet the sex ratios differ; so the difference must be due to the temperature.", explanation: "Only the temperature was different between the two groups." },
      { question: "How does sex determination in humans differ from that in these turtles?", answer: "In humans the sex is largely genetically determined by the sex chromosomes received from the parents (XX girl, XY boy), and does not depend on temperature.", explanation: "In turtles the environmental cue decides sex; in humans the father's X or Y chromosome decides." },
      { question: "If global warming increases the temperature of nests to above 32 degrees C, what is likely to happen to the sex ratio of these turtles?", answer: "More females will be born and there will be fewer males, so the population may be in danger.", explanation: "Higher temperature gave females in this experiment. A population with few males may not reproduce well." }
    ]
  },
  {
    id: 7,
    caseTitle: "Clownfish and Snails Change Sex",
    caseDescription: "In a group of clownfish the largest fish is a female and the second largest is a male. When the female is removed from the group, the male changes into a female and the next largest fish becomes the male. Some snails are also known to change sex during their life.",
    subQuestions: [
      { question: "What does the sex change in these animals indicate?", options: ["Sex is fixed at fertilisation by X and Y chromosomes", "Sex is not always genetically determined", "The environment has no effect on sex", "The animals lose their genes"], correctIndex: 1, answer: "Sex is not always genetically determined", explanation: "If sex were fixed by inherited chromosomes it could not change during the life of the individual." },
      { question: "What kind of cue seems to trigger the sex change in the clownfish?", answer: "A social or environmental cue, i.e. the absence of the female in the group.", explanation: "The change occurs when the group loses its female, not because of any change in the genes." },
      { question: "Can a human being change sex in this way during life? Give the reason.", answer: "No. In humans the sex is largely genetically determined at fertilisation by the sex chromosomes (XX or XY) and stays the same.", explanation: "The genes inherited from our parents decide whether we will be boys or girls." },
      { question: "Name the three strategies of sex determination that are discussed in this chapter, using the animals above.", answer: "(i) Environmental cue such as temperature (some reptiles); (ii) sex change during life (snails, some fish); (iii) genetic determination by sex chromosomes (humans).", explanation: "Different species use very different strategies to decide the sex." }
    ]
  },
  {
    id: 8,
    caseTitle: "Heat-Tolerant Bacteria in the Pond",
    caseDescription: "A pond contains billions of bacteria which reproduce by binary fission. Only about 1% of them carry a variation that lets them tolerate heat. A long heat wave raises the water temperature, and after some weeks about 95% of the bacteria in the pond are heat-tolerant.",
    subQuestions: [
      { question: "The increase in the proportion of heat-tolerant bacteria is an example of:", options: ["Natural selection of variants by the environment", "Use and disuse of organs", "Bacteria deciding to change", "Environmental variation that is not inherited"], correctIndex: 0, answer: "Natural selection of variants by the environment", explanation: "Heat-tolerant variants survived and multiplied while the others died." },
      { question: "How can there be variation among bacteria which reproduce asexually?", answer: "Small inaccuracies in DNA copying during cell division create minor variations (mutations) in the offspring.", explanation: "Asexual reproduction gives almost identical copies, but DNA copying is never perfect." },
      { question: "Did the bacteria acquire heat tolerance because of the heat wave? Explain.", answer: "No. The variation was already present in about 1% of the bacteria before the heat wave; the heat wave only selected them.", explanation: "The environment selects the variants; it does not create them." },
      { question: "What would have happened to this pond's bacteria if there had been no variation at all?", answer: "The whole population might have been wiped out by the heat wave, because none would have been able to tolerate the heat.", explanation: "Variation helps the survival of a species when the environment changes." }
    ]
  },
  {
    id: 9,
    caseTitle: "Sugarcane Field and Human Crowd",
    caseDescription: "A student visits a sugarcane field, where the plants look nearly the same, and then a market, where the people look very different from each other. The farmer says he planted pieces of sugarcane stem, not seeds.",
    subQuestions: [
      { question: "Why do the sugarcane plants show very little variation?", options: ["They are produced by sexual reproduction", "They are produced asexually, so they are almost identical to the parent", "They are exposed to no environmental factors", "They do not have DNA"], correctIndex: 1, answer: "They are produced asexually, so they are almost identical to the parent", explanation: "Vegetative propagation gives copies of one parent; variation arises only from small DNA copying errors." },
      { question: "Give one reason why human beings show much more variation.", answer: "Humans reproduce sexually, so the DNA of two different parents combines in new ways (genetic recombination) in each child.", explanation: "Sexual reproduction generates greater diversity than asexual reproduction." },
      { question: "A new fungal disease attacks the whole field and all the sugarcane plants die, but only some people in a market die of a similar infection. What does this show about variation?", answer: "Lack of variation makes the whole sugarcane population equally vulnerable, whereas variation in the human population means some individuals may survive.", explanation: "Variations give different individuals different advantages when the environment changes." },
      { question: "Suggest one way in which the differences in height among the market people could be environmental and not genetic.", answer: "Diet and nutrition in childhood: a well-fed child may grow taller than a poorly fed child with the same genes.", explanation: "Environmental factors such as diet, light and climate produce variation without changing the DNA." }
    ]
  },
  {
    id: 10,
    caseTitle: "From Gene to Height",
    caseDescription: "In pea plants a gene makes an enzyme that helps to produce a growth hormone. Tall plants have an efficient version of this enzyme. In a short variety, a change in the gene makes the enzyme work less efficiently. A student sprays growth hormone on a short plant.",
    subQuestions: [
      { question: "Choose the correct chain of events for a tall plant.", options: ["Hormone -> gene -> enzyme -> tall", "Gene -> enzyme -> more hormone -> tall", "Enzyme -> gene -> less hormone -> tall", "Gene -> hormone -> less enzyme -> tall"], correctIndex: 1, answer: "Gene -> enzyme -> more hormone -> tall", explanation: "The gene gives the information for the enzyme; an efficient enzyme makes a lot of hormone, which makes the plant tall." },
      { question: "Why is the short variety short?", answer: "Its gene for the enzyme has an alteration, so the enzyme is less efficient, less hormone is made and the plant does not grow tall.", explanation: "Genes control traits by controlling the proteins made in the cell." },
      { question: "After the hormone spray, the short plant grows taller. Will the seeds of this plant give tall plants? Explain.", answer: "No. The spray changes only the plant's phenotype (an environmental effect); its genotype and the gene for the less efficient enzyme remain the same, so the seeds will grow into short plants.", explanation: "Only changes in the DNA of germ cells are inherited." },
      { question: "Which is the section of DNA that carries the information to make one protein such as this enzyme?", answer: "A gene", explanation: "A section of DNA that provides information for one protein is called the gene for that protein." }
    ]
  },
  {
    id: 11,
    caseTitle: "Blood Group of the Baby",
    caseDescription: "Both parents have blood group A, but their first child has blood group O. Treat the two blood groups as a simple dominant/recessive pair, with the allele for group A written as A and the allele for group O written as o.",
    subQuestions: [
      { question: "What does the birth of a group O child to two group A parents suggest?", options: ["Group O is dominant", "Group O is recessive", "Group A is recessive", "The parents are homozygous"], correctIndex: 1, answer: "Group O is recessive", explanation: "The O trait was hidden in both parents and reappeared in the child, so it is recessive." },
      { question: "What are the genotypes of the two parents?", answer: "Both are Ao (heterozygous).", explanation: "The child (oo) got one o from each parent. The parents show group A, so each is Ao." },
      { question: "What is the probability that the next child will have blood group O?", answer: "1/4 (25%)", explanation: "Ao x Ao gives AA, Ao, Ao, oo, so one out of four is oo." },
      { question: "If the couple has 4 children, will exactly one of them necessarily have group O? Explain.", answer: "No. 1/4 is only a probability for each child; with such a small number of children the actual result can be different.", explanation: "Ratios like 3:1 appear reliably only when large numbers are counted." }
    ]
  },
  {
    id: 12,
    caseTitle: "The Dog Coat Colour Experiment",
    caseDescription: "A breeder crossed a pure black dog with a pure brown dog. All the F1 puppies were black. When two F1 dogs were bred together, they produced 48 puppies in the F2: 36 black and 12 brown.",
    subQuestions: [
      { question: "Which coat colour is dominant?", options: ["Black", "Brown", "Both are equally dominant", "Cannot be decided"], correctIndex: 0, answer: "Black", explanation: "Only black appeared in F1, and brown reappeared in F2 in one-quarter of the puppies." },
      { question: "What is the genotype of the F1 dogs (use B for black, b for brown)?", answer: "Bb", explanation: "The pure black parent gives B and the pure brown parent gives b." },
      { question: "An F1 black dog is mated with a brown dog and they have 20 puppies. How many are expected to be black and how many brown?", answer: "About 10 black and 10 brown", explanation: "Bb x bb gives Bb (black) and bb (brown) in a 1:1 ratio." },
      { question: "Why did brown puppies reappear in F2 even though all F1 dogs were black?", answer: "The F1 dogs carried the b allele hidden by B. They formed B and b gametes, and two b gametes could unite to form bb puppies.", explanation: "A recessive trait is expressed when two copies of the recessive allele are present." }
    ]
  },
  {
    id: 13,
    caseTitle: "Sweet Pea Flower Colour",
    caseDescription: "In sweet peas, purple flowers (P) are dominant over white flowers (p). A gardener has a purple-flowered plant of unknown genotype. To find out, she crosses it with a white-flowered plant and gets 52 purple-flowered and 48 white-flowered plants.",
    subQuestions: [
      { question: "What is the genotype of the purple-flowered parent?", options: ["PP", "Pp", "pp", "Cannot be determined"], correctIndex: 1, answer: "Pp", explanation: "Pp x pp gives Pp (purple) and pp (white) in a 1:1 ratio, as observed." },
      { question: "Why did she choose a white-flowered plant for the cross?", answer: "A white plant is pp and forms only p gametes, so the flower colour of each offspring shows which allele it got from the purple parent.", explanation: "The recessive parent does not hide any allele of the other parent." },
      { question: "What would she have seen among 60 offspring if the purple parent had been PP?", answer: "All 60 would be purple (Pp).", explanation: "PP forms only P gametes and pp forms only p gametes, so all offspring are Pp." },
      { question: "One of the purple offspring is self-pollinated. What ratio of purple to white flowers is expected in its progeny?", answer: "3 purple : 1 white", explanation: "The purple offspring are Pp. Pp x Pp gives PP, Pp, Pp, pp." }
    ]
  },
  {
    id: 14,
    caseTitle: "Earlobe Survey in Class 10",
    caseDescription: "In a class of 40 students, a survey found that 30 have free earlobes and 10 have attached earlobes. A student concludes: 'Free earlobes are found in most students, so free earlobe must be the dominant trait.' Their teacher says the survey needs data about parents.",
    subQuestions: [
      { question: "What percentage of the class have attached earlobes?", options: ["10%", "25%", "30%", "75%"], correctIndex: 1, answer: "25%", explanation: "10 out of 40 = 25%." },
      { question: "Is the student's conclusion correct? Explain.", answer: "No. Being more common does not make a trait dominant; dominance is shown by crosses (which trait appears in F1 or in children of parents with different traits).", explanation: "Dominance describes which allele is expressed in a heterozygote, and not how frequent a trait is." },
      { question: "Which observation about families would show that attached earlobe is recessive?", answer: "Two parents with free earlobes having a child with attached earlobes.", explanation: "The attached trait was hidden in both parents and reappeared in the child." },
      { question: "If a couple of two Ee parents (free earlobe E dominant) had 8 children, how many would be expected to have attached earlobes, and why might the actual number differ?", answer: "About 2 (one-quarter). The actual number may differ because 8 children is a small sample and each child is an independent chance event.", explanation: "Ee x Ee gives free : attached in a 3:1 ratio, but small families need not show it exactly." }
    ]
  },
  {
    id: 15,
    caseTitle: "Counting Chromosomes",
    caseDescription: "A human body cell has 46 chromosomes arranged in 23 pairs. Of these, 22 pairs are autosomes and one pair is the sex chromosomes. A student is asked to work out the chromosome numbers in the germ cells and in the zygote.",
    subQuestions: [
      { question: "How many chromosomes does a human sperm contain?", options: ["46", "23", "22", "92"], correctIndex: 1, answer: "23", explanation: "A germ cell takes one chromosome from each of the 23 pairs." },
      { question: "How many autosomes and which sex chromosome does a normal human egg contain?", answer: "22 autosomes and one X chromosome", explanation: "The mother is XX, so every egg has 22 autosomes plus an X." },
      { question: "How many chromosomes would a zygote have if its sperm and egg had 46 chromosomes each?", answer: "92", explanation: "46 + 46 = 92, double the normal number. This is why germ cells must have only half the normal number." },
      { question: "Why is it necessary for germ cells to carry only one set of chromosomes?", answer: "So that on fertilisation the normal chromosome number is restored and the DNA of the species stays stable, with equal contributions from both parents.", explanation: "Otherwise the chromosome number would double in every generation." }
    ]
  },
  {
    id: 16,
    caseTitle: "Round Green x Wrinkled Yellow",
    caseDescription: "A pea plant with round, green seeds (RRyy) was crossed with a plant having wrinkled, yellow seeds (rrYY). The F1 plants were self-pollinated and gave 556 F2 seeds: 315 round yellow, 108 round green, 101 wrinkled yellow and 32 wrinkled green.",
    subQuestions: [
      { question: "What is the phenotype of the F1 plants?", options: ["Round and green", "Wrinkled and yellow", "Round and yellow", "Wrinkled and green"], correctIndex: 2, answer: "Round and yellow", explanation: "F1 is RrYy. Round and yellow are dominant over wrinkled and green." },
      { question: "Which two F2 phenotypes are new combinations that were not present in either parent?", answer: "Round yellow and wrinkled green", explanation: "The parents were round green and wrinkled yellow." },
      { question: "About how many round yellow seeds are expected out of 556 seeds if the ratio is 9:3:3:1?", answer: "About 313", explanation: "9/16 x 556 = 312.75, close to the observed 315." },
      { question: "What would you infer if only round green and wrinkled yellow seeds had appeared, and no new combinations?", answer: "That the genes for seed shape and colour are linked and not inherited independently.", explanation: "The appearance of new combinations shows that these traits are inherited independently." }
    ]
  },
  {
    id: 17,
    caseTitle: "Same Seeds, Different Soils",
    caseDescription: "A student took seeds of a pure tall variety of pea and planted half in fertile soil and half in poor sandy soil. The plants in fertile soil grew to 90 cm and those in poor soil grew only to 50 cm. The seeds collected from the 50 cm plants were then grown in fertile soil and all grew to 90 cm.",
    subQuestions: [
      { question: "The difference in height between the two groups is an example of:", options: ["Genetic variation", "Environmental variation", "A change in DNA", "Mendel's law of segregation"], correctIndex: 1, answer: "Environmental variation", explanation: "The seeds were of the same pure variety, so the difference came from soil conditions." },
      { question: "Were the genotypes of the two groups of plants the same or different?", answer: "The same (TT).", explanation: "They came from the same pure tall variety, so only the environment differed." },
      { question: "Why did the seeds from the 50 cm plants give 90 cm plants in fertile soil?", answer: "The shortness of the parent plants was caused by poor soil and did not change their DNA, so it was not inherited.", explanation: "Only genetic variation is passed on through germ cells." },
      { question: "Give two environmental factors, other than soil minerals, that could change the height of the plants.", answer: "Any two of: light, water/moisture, temperature, climate.", explanation: "Environmental variation may be caused by climate, temperature, light, moisture, minerals and so on." }
    ]
  },
  {
    id: 18,
    caseTitle: "Chromosomes in a Family",
    caseDescription: "A couple has four children: two sons and two daughters. The teacher asks the class to track the sex chromosomes in this family.",
    subQuestions: [
      { question: "From which parent does each son receive his Y chromosome?", options: ["Mother", "Father", "Either parent", "Both parents"], correctIndex: 1, answer: "Father", explanation: "The mother is XX and has no Y chromosome. Only the father can give a Y." },
      { question: "Which sex chromosomes does each daughter have, and where does each come from?", answer: "Each daughter is XX: one X from the mother and one X from the father.", explanation: "A girl is formed when an X sperm fertilises an X egg." },
      { question: "What is the probability that a couple has four daughters in a row?", answer: "1/16", explanation: "Each child has a 1/2 chance of being a girl, so (1/2) x (1/2) x (1/2) x (1/2) = 1/16." },
      { question: "A son from this family will pass which sex chromosome to his own daughters?", answer: "His X chromosome (which he got from his mother).", explanation: "A man passes X to all his daughters and Y to all his sons." }
    ]
  },
  {
    id: 19,
    caseTitle: "Potatoes from Tubers and from Seeds",
    caseDescription: "One farmer plants potato tubers, so his crop reproduces asexually. Another farmer plants a crop grown from true potato seeds produced by flowers (sexual reproduction). A new disease then spreads through both farms.",
    subQuestions: [
      { question: "Which crop is likely to show less variation among its plants?", options: ["The crop grown from seeds", "The crop grown from tubers", "Both show equal variation", "Neither has any DNA variation"], correctIndex: 1, answer: "The crop grown from tubers", explanation: "Asexual reproduction gives offspring almost identical to the single parent." },
      { question: "What is the only source of variation in the tuber crop?", answer: "Small inaccuracies (errors) in DNA copying.", explanation: "These give minor differences between the plants." },
      { question: "In which farm is it more likely that some plants will survive the disease, and why?", answer: "The seed-grown crop, because sexual reproduction creates more variation and some plants may carry variations that resist the disease.", explanation: "Uniform tuber plants are equally vulnerable to the disease." },
      { question: "If the surviving plants produce seeds, what will happen to the proportion of resistant plants in the next generations?", answer: "It will increase, because the environment (disease) selects the resistant variants, which reproduce and pass on the variation. This is natural selection.", explanation: "Selection of variants by environmental factors forms the basis of evolution." }
    ]
  },
  {
    id: 20,
    caseTitle: "Two Students, Two Results",
    caseDescription: "Two students each self-pollinated Tt plants and counted the F2 plants. Asha grew only 8 plants: 5 tall and 3 short. Bhavna grew 800 plants: 596 tall and 204 short.",
    subQuestions: [
      { question: "Bhavna's ratio of tall to short plants is closest to:", options: ["1:1", "3:1", "9:3", "1:2:1"], correctIndex: 1, answer: "3:1", explanation: "596:204 is about 2.9:1, very close to 3:1." },
      { question: "Why does Asha's result differ from the expected ratio?", answer: "She counted only 8 plants; with a very small number, chance variation is large. Ratios show up reliably only in large numbers.", explanation: "Mendel worked with large numbers of plants and kept count of each trait in each generation." },
      { question: "About how many of Bhavna's 596 tall plants are expected to be homozygous TT?", answer: "About 199 (one-third of the tall plants)", explanation: "F2 genotype ratio is 1 TT : 2 Tt : 1 tt, so TT are 1 out of 3 tall plants: 596/3 is about 199." },
      { question: "How did Mendel's habit of counting the offspring help him discover the laws of inheritance?", answer: "By counting the plants with each trait in each generation he could work out the ratios (3:1, 9:3:3:1), which led to his laws.", explanation: "Mendel combined mathematics with science and was the first to keep count of individuals showing a trait." }
    ]
  }
];
