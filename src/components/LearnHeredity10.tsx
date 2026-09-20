import React, { useState } from "react";
import { Award, Download, HelpCircle, Leaf, ChevronLeft, ChevronRight, FlaskConical, Sprout, Baby, Shield, Dna } from "lucide-react";
import { GeneToTraitDiagram, ChromosomePairsDiagram } from "./heredity10Diagrams";

// Class 10 Science, Ch 8 "Heredity" -- notes built from the NCERT chapter and the Heredity part of
// the teacher's notes (the Reproduction part belongs to the previous chapter).

const IMG_BASE = "/diagrams/heredity10/";
const NOTES_PDF_URL = "/Class-10-Heredity-Notes.pdf";
const NOTES_PDF_NAME = "Class-10-Heredity-Notes.pdf";
interface Pic { file: string; alt: string; caption: string; }

type Block =
  | { t: "card"; title: string; body: React.ReactNode[] }
  | { t: "h"; text: string }
  | { t: "ul"; items: React.ReactNode[] }
  | { t: "facts"; rows: [string, React.ReactNode][] }
  | { t: "compare"; left: string; right: string; rows: [string, string][] }
  | { t: "remember"; title: string; body: React.ReactNode }
  | { t: "img"; pic: Pic }
  | { t: "imgs"; pics: Pic[] }
  | { t: "svg"; key: "gene" | "chrom"; caption: string }
  | { t: "punnett"; title: string; corner: string; cols: string[]; rows: string[][] }
  | { t: "exq"; n: number; q: string; a: string }
  | { t: "activity"; title: string; aim: string; steps: string[]; observation: string; conclusion: string }
  | { t: "p"; body: React.ReactNode };

interface Topic {
  id: string;
  title: string;
  category: string;
  heading: string;
  sub: string;
  blocks: Block[];
}

const b = (s: string) => <b>{s}</b>;

const TOPICS: Topic[] = [
  {
    id: "variation",
    title: "1. Accumulation of Variation",
    category: "Variation",
    heading: "Accumulation of Variation During Reproduction",
    sub: "Every copy is slightly different -- and the differences add up over generations.",
    blocks: [
      { t: "card", title: "Core Idea", body: [
        <>Reproduction creates new individuals that are {b("similar but subtly different")}. Some variation appears even in {b("asexual")} reproduction (from small inaccuracies in DNA copying), and {b("sexual")} reproduction maximises the number of successful variations.</>,
        <>Inheritance from the previous generation gives the next generation both a {b("common basic body design")} and {b("subtle changes")} in it.</>,
      ] },
      { t: "img", pic: { file: "variation-tree", alt: "Creation of diversity over generations: an original organism gives two slightly different individuals, each giving two more; the four in the bottom row all differ", caption: "Creation of diversity over succeeding generations (NCERT Fig. 8.1)" } },
      { t: "ul", items: [
        <>The second generation has differences {b("inherited from the first generation")} plus {b("newly created differences")} -- so variation {b("accumulates")}. Each of the four individuals in the bottom row of the figure is different from the others.</>,
        <>A single bacterium that divides again and again gives very similar bacteria -- differing only through {b("small inaccuracies in DNA copying")}. A field of {b("sugarcane")} (vegetative propagation) shows very little variation.</>,
        <>In animals that reproduce sexually, including {b("human beings")}, quite {b("distinct variations")} are visible between individuals.</>,
      ] },
      { t: "compare", left: "Asexual reproduction", right: "Sexual reproduction", rows: [
        ["Only DNA-copying errors cause variation", "DNA of two parents combines, so much greater variation"],
        ["Offspring very similar (e.g. sugarcane field)", "Offspring show distinct differences (e.g. humans)"],
      ] },
      { t: "h", text: "Do All Variations Survive Equally?" },
      { t: "ul", items: [
        <>No. Different variations give different advantages in a given environment. {b("Bacteria that can withstand heat")} survive better in a heat wave; others may resist cold, drought or disease.</>,
        <>{b("Selection of variants by environmental factors")} forms the basis of evolution (natural selection) -- studied in the next chapter.</>,
      ] },
      { t: "remember", title: "In-text question hints", body: <>(1) Trait A in 10% and trait B in 60% of an asexually reproducing population: {b("trait B")} is likely to have arisen earlier -- it has had more generations to spread. (2) Variations promote survival because if the environment changes, {b("some individuals may already have a suitable variation")} and survive, so the species continues.</> },
    ],
  },
  {
    id: "types-variation",
    title: "2. Types of Variation",
    category: "Variation",
    heading: "Genetic and Environmental Variation",
    sub: "Differences within a species can be inherited or acquired from the surroundings.",
    blocks: [
      { t: "card", title: "What is Variation?", body: [
        <>{b("Variation")} means differences in traits (characteristics) between individuals of the same species -- physical (size, colour) or behavioural. It arises from genetic differences, environmental factors, or both.</>,
      ] },
      { t: "compare", left: "Genetic variation", right: "Environmental variation", rows: [
        ["Difference in DNA, so it can be inherited", "Caused by conditions the organism grows in"],
        ["Mutation, recombination in sexual reproduction, gene flow", "Climate, diet, lifestyle, accidents, temperature, light, moisture, minerals"],
        ["Passed to the next generation", "Not passed on through DNA"],
      ] },
      { t: "facts", rows: [
        ["Mutation", "A change in the DNA sequence. It can be harmful, beneficial or have no effect; caused by copying mistakes during cell division, chemicals, radiation or viral infection"],
        ["Genetic recombination", "In sexual reproduction offspring get genetic material from two parents, giving new combinations of genes and greater diversity"],
        ["Gene flow (migration)", "Movement of genetic material or individuals from one population to another, e.g. migrants reproducing in a new population"],
      ] },
      { t: "remember", title: "Key point", body: <>Only {b("genetic")} variations are inherited. That is why the variations that matter for evolution are the ones in DNA.</> },
    ],
  },
  {
    id: "heredity-traits",
    title: "3. Heredity & Inherited Traits",
    category: "Inheritance",
    heading: "Heredity and Inherited Traits",
    sub: "How traits and characteristics are reliably passed from parents to children.",
    blocks: [
      { t: "card", title: "Definitions", body: [
        <>{b("Heredity")} is the passing of traits (features) from one generation to the next -- the study of it is {b("genetics")}. The rules of heredity determine how traits are {b("reliably inherited")}.</>,
        <>{b("Traits")} are specific features that can be observed in an individual (eye colour, height...). {b("Inheritance")} is the pathway by which genetic traits are passed on and expressed.</>,
      ] },
      { t: "ul", items: [
        <>A child bears all the basic features of a human being, yet does not look exactly like its parents -- {b("similarities and differences")} both exist.</>,
        <>Inheritance serves two purposes: a {b("common basic body design")} of the species, and {b("subtle changes")} (variations) that bring diversity.</>,
        <>Both the father and the mother contribute {b("practically equal amounts of genetic material")} to the child, so each trait is influenced by paternal and maternal DNA -- there are {b("two versions of each trait")} in every child.</>,
      ] },
      { t: "img", pic: { file: "earlobes", alt: "Free earlobe (a) and attached earlobe (b)", caption: "(a) Free and (b) attached earlobes -- two variants found in human populations (NCERT Fig. 8.2)" } },
      { t: "activity", title: "Earlobes in the classroom (NCERT Activity 8.1)", aim: "To find a possible rule for the inheritance of free and attached earlobes.", steps: [
        "Observe the ears of all students in the class and list who has free and who has attached earlobes.",
        "Calculate the percentage of students with each type.",
        "Find out the earlobe type of each student's parents.",
        "Correlate each student's earlobe type with that of the parents and suggest a rule.",
      ], observation: "Both free and attached earlobes are seen in the population, and the type in children can be compared with their parents.", conclusion: "Earlobe type is an inherited trait with two variants; a possible rule can be suggested from the parent-child pattern." },
    ],
  },
  {
    id: "chromosomes-genes",
    title: "4. Chromosomes, DNA & Genes",
    category: "Inheritance",
    heading: "Chromosomes, DNA, Genes and Alleles",
    sub: "The material of heredity, from the nucleus down to a single gene.",
    blocks: [
      { t: "facts", rows: [
        ["Chromosome", "Thread-like structure in the nucleus, made of protein and a single molecule of DNA. Each gene set is present not as one long thread but as separate independent pieces called chromosomes"],
        ["DNA", "The molecule that carries the information for making proteins (the blueprint for growth, development and reproduction)"],
        ["Gene", "A section of DNA that gives the information for making one protein. The gene is the basic unit of heredity; genes lie on chromosomes and carry the information that decides traits"],
        ["Allele", "One of two or more versions of a gene at the same position on a chromosome. A child inherits two alleles for a trait, one from each parent"],
      ] },
      { t: "img", pic: { file: "homozygous-heterozygous", alt: "Chromosome pairs showing homozygous alleles BB and bb, and heterozygous alleles Bb", caption: "Homozygous = same alleles; heterozygous = different alleles" } },
      { t: "ul", items: [
        <>{b("Homozygous:")} the two alleles for a trait are the same (TT or tt). {b("Heterozygous:")} the two alleles are different (Tt).</>,
      ] },
      { t: "h", text: "Genotype and Phenotype" },
      { t: "compare", left: "Genotype", right: "Phenotype", rows: [
        ["The genetic make-up: the alleles present (e.g. Tt)", "The observable trait (e.g. tall plant)"],
        ["Cannot be seen directly", "Can be seen or measured"],
        ["Inherited", "Result of genotype and environment"],
      ] },
      { t: "facts", rows: [
        ["Example: gene for flower colour", "A = dominant allele (red flowers), a = recessive allele (white flowers)"],
        ["AA -- homozygous dominant", "Phenotype: red flowers"],
        ["Aa -- heterozygous", "Phenotype: red flowers (A masks a)"],
        ["aa -- homozygous recessive", "Phenotype: white flowers"],
      ] },
    ],
  },
  {
    id: "dominant-recessive",
    title: "5. Dominant & Recessive Traits",
    category: "Inheritance",
    heading: "Dominant and Recessive Traits",
    sub: "Which allele shows up when the two are different?",
    blocks: [
      { t: "card", title: "The Idea", body: [
        <>When the two alleles of a gene are {b("different")}, only one trait is expressed. The trait that gets expressed is the {b("dominant trait")}; the trait that is hidden is the {b("recessive trait")}.</>,
        <>A {b("single copy")} of the dominant allele is enough for the dominant trait; the recessive trait appears only when {b("both copies")} are recessive.</>,
      ] },
      { t: "ul", items: [
        <>Dominant alleles are written with a {b("capital letter")} (T), recessive alleles with a {b("small letter")} (t).</>,
        <>In pea plants: tall (T) is dominant over short (t). TT and Tt plants are tall; only tt plants are short.</>,
        <>{b("Homozygous dominant")} = two copies of the dominant allele (TT); {b("homozygous recessive")} = two copies of the recessive allele (tt).</>,
      ] },
      { t: "compare", left: "Dominant allele", right: "Recessive allele", rows: [
        ["Expressed even if only one copy is present", "Expressed only when two copies are present"],
        ["Written as a capital letter (T)", "Written as a small letter (t)"],
        ["Masks the recessive allele", "Masked in the presence of the dominant allele"],
      ] },
      { t: "img", pic: { file: "pea-flower-colour-cross", alt: "Cross between purple-flowered and white-flowered pea plants: all F1 purple, F2 shows 3 purple to 1 white", caption: "Violet x white flowers: all F1 violet, F2 in the ratio 3 : 1 (NCERT Fig. 8.4) -- violet is dominant" } },
      { t: "remember", title: "Common mistake", body: <>Dominant does {b("not")} mean stronger or more common. It only means that the trait is expressed when the alleles are different.</> },
    ],
  },
  {
    id: "mendel",
    title: "6. Gregor Mendel & His Pea Plants",
    category: "Mendel's Experiments",
    heading: "Mendel's Contributions",
    sub: "The Father of Genetics and his experiments with garden peas.",
    blocks: [
      { t: "img", pic: { file: "mendel-portrait", alt: "Portrait of Gregor Johann Mendel", caption: "Gregor Johann Mendel (1822-1884)" } },
      { t: "card", title: "Who was Mendel?", body: [
        <>Mendel was educated in a monastery and studied science and mathematics at the University of Vienna. After failing the teaching-certificate examination, he returned to his monastery and began growing {b("peas")}.</>,
        <>Others had studied inheritance before, but Mendel combined science and mathematics and was the {b("first to count")} the individuals showing each trait in every generation. This helped him arrive at the {b("laws of inheritance")}. He is called the {b("Father of Genetics")}.</>,
      ] },
      { t: "h", text: "Why did Mendel choose the pea plant?" },
      { t: "ul", items: [
        <>{b("Easy to grow")} in pots or the ground.</>,
        <>{b("Short life cycle")} (about 2-3 months), so many offspring can be studied quickly.</>,
        <>{b("Clear contrasting traits")} that are easy to see.</>,
        <>{b("Self- and cross-pollination")} are both possible -- the flowers are bisexual.</>,
      ] },
      { t: "facts", rows: [
        ["Seed shape", "Round / wrinkled"],
        ["Seed colour", "Yellow / green"],
        ["Plant height", "Tall / short (dwarf)"],
        ["Flower colour", "Violet (purple) / white"],
        ["Flower position", "Axial / terminal"],
        ["Pod shape", "Inflated / constricted"],
        ["Pod colour", "Green / yellow"],
      ] },
      { t: "remember", title: "Timeline", body: <>Mendel's experiments were carried out between {b("1856 and 1863")}. He studied {b("seven")} pairs of contrasting traits and worked with self-pollination and cross-pollination.</> },
    ],
  },
  {
    id: "monohybrid",
    title: "7. Monohybrid Cross",
    category: "Mendel's Experiments",
    heading: "Monohybrid Cross: One Trait at a Time",
    sub: "Tall x short pea plants over two generations.",
    blocks: [
      { t: "card", title: "Definition", body: [
        <>A {b("monohybrid cross")} is a cross between two organisms that differ in only {b("one trait")} -- e.g. a pure tall plant (TT) and a pure short plant (tt).</>,
      ] },
      { t: "h", text: "Steps" },
      { t: "ul", items: [
        <>{b("Parents (P):")} pure tall (TT) x pure short (tt). Gametes: all T from one parent, all t from the other.</>,
        <>{b("F1 generation:")} all plants are {b("tall (Tt)")} -- no 'medium-height' plants. Only one parental trait is seen; the other is hidden, not lost.</>,
        <>{b("F1 self-pollination:")} the tall F1 plants are allowed to self-pollinate. In the {b("F2 generation")} about one quarter of the plants are short -- the hidden trait reappears.</>,
      ] },
      { t: "img", pic: { file: "monohybrid-cross-ncert", alt: "Tall (TT) crossed with short (tt) gives all tall (Tt) in F1; F1 x F1 gives tall (TT), tall (Tt), tall (Tt) and short (tt) in F2", caption: "Inheritance of traits over two generations (NCERT Fig. 8.3)" } },
      { t: "imgs", pics: [{ file: "monohybrid-f1-punnett", alt: "Punnett square for TT x tt showing all Tt offspring", caption: "TT x tt: all offspring Tt, all tall" }, { file: "monohybrid-f2-punnett", alt: "Punnett square for Tt x Tt showing TT, Tt, Tt and tt", caption: "Tt x Tt (offspring = F2): 1 TT : 2 Tt : 1 tt = 3 tall : 1 short. (The picture's 'F1' label refers to the offspring of this cross, i.e. the F2 generation.)" }] },
      { t: "punnett", title: "Punnett square: F1 (Tt) x F1 (Tt)", corner: "Gametes", cols: ["T", "t"], rows: [["T", "TT (tall)", "Tt (tall)"], ["t", "Tt (tall)", "tt (short)"]] },
      { t: "facts", rows: [
        ["F2 phenotypic ratio", "3 tall : 1 short"],
        ["F2 genotypic ratio", "1 TT : 2 Tt : 1 tt"],
        ["Conclusion", "Both tallness and shortness were inherited in the F1 plants, but only tallness was expressed. Two copies of the 'factor' (now called gene) control each trait; tall (T) is dominant and short (t) recessive."],
      ] },
      { t: "activity", title: "Confirming the 1 : 2 : 1 ratio (NCERT Activity 8.2 idea)", aim: "To confirm that F2 tall plants are a mixture of TT and Tt.", steps: [
        "Let each F2 tall plant self-pollinate on its own and collect its seeds.",
        "Grow the seeds of each plant and count tall and short offspring.",
        "A TT plant gives only tall offspring; a Tt plant gives both tall and short (about 3 : 1); a tt plant gives only short.",
      ], observation: "About one third of the tall F2 plants breed true (all tall), and about two thirds give tall and short in a 3 : 1 ratio.", conclusion: "This confirms the F2 genotypes are in the ratio 1 TT : 2 Tt : 1 tt." },
    ],
  },
  {
    id: "dihybrid",
    title: "8. Dihybrid Cross",
    category: "Mendel's Experiments",
    heading: "Dihybrid Cross: Two Traits Together",
    sub: "What happens when two different characteristics are bred at the same time?",
    blocks: [
      { t: "card", title: "Definition", body: [
        <>A {b("dihybrid cross")} is a cross between organisms that differ in {b("two traits")} -- e.g. plant height and seed shape. Tallness (T) and round seeds (R) are dominant; shortness (t) and wrinkled seeds (r) are recessive.</>,
      ] },
      { t: "ul", items: [
        <>{b("P:")} pure tall, round-seeded (TTRR) x pure short, wrinkled-seeded (ttrr). {b("F1:")} all tall with round seeds (TtRr).</>,
        <>{b("F1 self-pollination")} gives F2 with {b("new combinations")}: some tall plants with wrinkled seeds and some short plants with round seeds -- along with the two parental combinations.</>,
      ] },
      { t: "img", pic: { file: "dihybrid-cross-notes", alt: "Cross of tall round-seeded TTRR with short wrinkled-seeded ttrr, F1 TtRr and the 16-box F2 grid", caption: "Dihybrid cross: TTRR x ttrr, F1 = TtRr, F2 grid" } },
      { t: "facts", rows: [
        ["F2 phenotypes", "9 tall round : 3 tall wrinkled : 3 short round : 1 short wrinkled"],
        ["Phenotypic ratio", "9 : 3 : 3 : 1"],
        ["Genotypic ratio", "1 : 2 : 2 : 4 : 1 : 2 : 1 : 2 : 1 (nine genotypes)"],
        ["Number of combinations", "16 boxes in the Punnett square (4 gametes x 4 gametes)"],
      ] },
      { t: "img", pic: { file: "dihybrid-cross-ncert", alt: "Round green RRyy crossed with wrinkled yellow rrYY, F1 round yellow RrYy, F2 Punnett square and counts 315, 108, 101, 32", caption: "Independent inheritance of two separate traits, shape and colour of seeds (NCERT Fig. 8.5)" } },
      { t: "facts", rows: [
        ["Mendel's actual count (556 seeds)", "315 round yellow : 108 round green : 101 wrinkled yellow : 32 wrinkled green -- very close to 9 : 3 : 3 : 1"],
        ["New combinations", "Round green and wrinkled yellow appeared in F2 -- combinations that were not present in either parent or in F1"],
      ] },
      { t: "remember", title: "What the dihybrid cross proves", body: <>The two traits (e.g. tall/short and round/wrinkled) are {b("inherited independently")} of each other -- the factors for seed shape and seed colour recombine freely to form the zygote.</> },
    ],
  },
  {
    id: "laws",
    title: "9. Mendel's Laws of Inheritance",
    category: "Mendel's Experiments",
    heading: "Mendel's Three Laws of Inheritance",
    sub: "The conclusions drawn from the pea experiments.",
    blocks: [
      { t: "card", title: "1. Law of Dominance", body: [
        <>In a pair of contrasting traits, one allele is {b("dominant")} over the other. If at least one dominant allele is present, the {b("dominant trait")} is expressed (all F1 plants are tall).</>,
      ] },
      { t: "card", title: "2. Law of Segregation", body: [
        <>During the formation of gametes the {b("two alleles for each gene separate")}, so each gamete carries only one allele and each offspring receives one allele from each parent. (This explains the reappearance of the recessive trait in F2.)</>,
      ] },
      { t: "card", title: "3. Law of Independent Assortment", body: [
        <>During gamete formation the alleles of {b("different genes segregate independently")} of one another and are distributed independently to the next generation. (This explains the new combinations in the dihybrid cross.)</>,
      ] },
      { t: "remember", title: "Why independent assortment works", body: <>If all genes were joined in one long thread and passed together, 'R' and 'y' would always be linked and could never be inherited independently. Because the gene set is in {b("separate chromosomes")}, and a germ cell takes one chromosome from each pair (maternal or paternal), traits can be inherited independently.</> },
    ],
  },
  {
    id: "expression",
    title: "10. How Traits Get Expressed",
    category: "Inheritance",
    heading: "How Do Genes Control Traits?",
    sub: "From DNA to protein to a visible characteristic.",
    blocks: [
      { t: "ul", items: [
        <>Cellular DNA is the information source for making {b("proteins")}. The section of DNA that provides information for one protein is the {b("gene")} for that protein.</>,
        <>Proteins (often {b("enzymes")}) control the chemical reactions that produce a trait, so {b("genes control characteristics")}.</>,
      ] },
      { t: "svg", key: "gene", caption: "Gene → protein → hormone → trait (example: plant height)" },
      { t: "card", title: "Example: Tallness in Plants", body: [
        <>Plant hormones trigger growth, so {b("plant height depends on the amount of hormone")} made. The amount of hormone depends on how efficiently an {b("enzyme")} works.</>,
        <>If the enzyme works {b("efficiently")}, a lot of hormone is made and the plant is {b("tall")}. If the gene for the enzyme has an alteration that makes the enzyme {b("less efficient")}, less hormone is made and the plant is {b("short")}.</>,
      ] },
    ],
  },
  {
    id: "germ-cells",
    title: "11. Germ Cells & Equal Contribution",
    category: "Inheritance",
    heading: "Equal Contribution of Both Parents",
    sub: "Why each germ cell carries only one set of genes.",
    blocks: [
      { t: "ul", items: [
        <>If both parents contribute to the traits of the child, each must contribute a copy of the same gene, so every body cell has {b("two sets of genes")} (two copies of each chromosome, one maternal and one paternal).</>,
        <>For this to work, each {b("germ cell (sperm or egg) must have only one gene set")} -- half the number of chromosomes of a body cell. This is done by a special cell division called {b("meiosis")}.</>,
        <>A germ cell takes {b("one chromosome from each pair")}, which may be of maternal or paternal origin. When a sperm and egg combine, the {b("normal number of chromosomes is restored")} in the zygote, keeping the DNA of the species stable.</>,
      ] },
      { t: "svg", key: "chrom", caption: "Body cell → germ cells → zygote: how the two parental sets are ensured" },
      { t: "remember", title: "Exercise Q4 in one line", body: <>Equal genetic contribution of both parents is ensured because each parent's germ cell has {b("one copy of every chromosome")} (half the body-cell number), and the zygote gets {b("one set from the father and one from the mother")}.</> },
      { t: "ul", items: [
        <>Asexually reproducing organisms follow similar rules of inheritance too -- the offspring get the parent's DNA copy, with only tiny variations.</>,
      ] },
    ],
  },
  {
    id: "sex",
    title: "12. Sex Determination",
    category: "Sex Determination",
    heading: "Sex Determination",
    sub: "How is the sex of a newborn decided?",
    blocks: [
      { t: "h", text: "Different Strategies in Different Species" },
      { t: "facts", rows: [
        ["Environmental cues", "In some reptiles (some turtles and crocodiles) the temperature at which the fertilised eggs are kept decides whether the young are male or female"],
        ["Change of sex", "In some animals such as snails (and some fish) an individual can change sex during its life -- so sex is not genetically determined"],
        ["Genetic determination", "In human beings the sex is largely genetically determined -- by the genes inherited from the parents"],
      ] },
      { t: "h", text: "Sex Chromosomes in Humans" },
      { t: "ul", items: [
        <>Humans have {b("46 chromosomes = 23 pairs")}. {b("22 pairs")} (autosomes) are perfect pairs in both sexes.</>,
        <>The {b("23rd pair")} is the {b("sex chromosomes")}. {b("Women")} have a perfect pair, both called {b("X")} (XX). {b("Men")} have a mismatched pair -- one normal-sized {b("X")} and one short {b("Y")} (XY).</>,
      ] },
      { t: "img", pic: { file: "sex-determination-ncert", alt: "Male XY and female XX, gametes X and Y and X, zygote XX or XY, offspring female or male", caption: "Sex determination in human beings (NCERT Fig. 8.6)" } },
      { t: "img", pic: { file: "sex-chromosomes-notes", alt: "Father XY and mother XX with four children XX, XY, XX, XY", caption: "Inheritance of sex chromosomes: half the children are girls, half are boys" } },
      { t: "punnett", title: "Punnett square: father (XY) x mother (XX)", corner: "Mother's egg", cols: ["X", "X"], rows: [["X", "XX (girl)", "XX (girl)"], ["Y", "XY (boy)", "XY (boy)"]] },
      { t: "ul", items: [
        <>{b("All children inherit an X chromosome from the mother")}, whether they are boys or girls.</>,
        <>The sex of the child is decided by what is inherited from the {b("father")}: a sperm with {b("X")} gives a {b("girl")}; a sperm with {b("Y")} gives a {b("boy")}.</>,
        <>Half the children are boys and half are girls (the chance of each is 50% at every birth).</>,
      ] },
      { t: "remember", title: "Note", body: <>The Punnett square above lists the sperm on the side and the eggs across the top; every egg carries X, so the father's sperm decides the sex.</> },
    ],
  },
  {
    id: "activities",
    title: "13. NCERT Questions Corner",
    category: "Practical",
    heading: "Exercise Ideas and Projects",
    sub: "Investigations from the NCERT exercises.",
    blocks: [
      { t: "activity", title: "Finding the dominant coat colour in dogs (NCERT Exercise Q3)", aim: "To find which coat colour is dominant in dogs.", steps: [
        "Choose dogs of two clearly different coat colours (say black and brown), each a pure-breeding line that always gives puppies of its own colour.",
        "Cross a pure black dog with a pure brown dog and record the colour of all puppies (F1).",
        "Cross two F1 dogs together and record the colours in the F2 puppies.",
        "Repeat with many pairs to get large numbers and count how many puppies show each colour.",
      ], observation: "The colour seen in all F1 puppies is the dominant one; the colour that disappears in F1 and reappears in about one quarter of the F2 puppies is recessive (about 3 : 1).", conclusion: "The trait expressed in the whole F1 generation is the dominant coat colour." },
      { t: "remember", title: "Exercise Q1: the genotype of the tall violet parent", body: <>Tall violet x short white gives progeny that are all violet but about half tall and half short. All violet means the violet parent is {b("WW")}; half short (tt) means the tall parent must be {b("Tt")}. So the parent is {b("TtWW")}, option (c).</> },
      { t: "remember", title: "In-text Q3 (blood groups)", body: <>A man of blood group A marries a woman of group O and their daughter has group O. This does {b("not")} by itself show which trait is dominant: the daughter is O, so the father must carry a hidden O allele (he is A with an O allele), but you cannot tell from one family which is dominant. (Blood group A is in fact dominant over O.)</> },
    ],
  },
  {
    id: "mindmap",
    title: "14. Quick Glossary & Mind Map",
    category: "Revision",
    heading: "Quick Glossary and Mind Map",
    sub: "The whole chapter on one page.",
    blocks: [
      { t: "facts", rows: [
        ["Heredity", "Passing of traits from parents to offspring"],
        ["Variation", "Differences in traits between individuals of a species"],
        ["Gene", "Section of DNA that codes for one protein"],
        ["Allele", "Alternative form of a gene"],
        ["Homozygous / Heterozygous", "Two same alleles / two different alleles"],
        ["Genotype / Phenotype", "Genetic make-up / observable trait"],
        ["Dominant / Recessive", "Trait expressed with one copy / only with two copies"],
        ["F1, F2", "First and second filial (offspring) generations"],
        ["Monohybrid cross", "Cross involving one pair of contrasting traits (3 : 1)"],
        ["Dihybrid cross", "Cross involving two pairs of traits (9 : 3 : 3 : 1)"],
        ["Autosomes / Sex chromosomes", "22 pairs alike in both sexes / the 23rd pair (XX or XY)"],
      ] },
      { t: "h", text: "Mind Map" },
      { t: "ul", items: [
        <>{b("Variation")} → accumulates over generations → genetic (inherited) and environmental (not inherited) → selected by the environment.</>,
        <>{b("Heredity")} → chromosomes, DNA, genes, alleles → dominant and recessive → genotype and phenotype.</>,
        <>{b("Mendel")} → pea plant → monohybrid (3 : 1, 1 : 2 : 1) → dihybrid (9 : 3 : 3 : 1) → three laws.</>,
        <>{b("Expression")} → gene → protein/enzyme → hormone → trait. {b("Germ cells")} → one gene set → equal parental contribution.</>,
        <>{b("Sex determination")} → reptiles (temperature), snails (change sex), humans (XX girl / XY boy; father decides).</>,
      ] },
    ],
  },
  {
    id: "competitive-concepts",
    title: "15. Competitive Corner: Extra Concepts",
    category: "Advanced",
    heading: "Competitive Corner",
    sub: "NCERT gives the fundamentals. Olympiads, NTSE and foundation-level exams push these ideas a step further.",
    blocks: [
      { t: "h", text: "Extending Mendel's Rules" },
      { t: "card", title: "Test Cross", body: [
        <>A {b("test cross")} finds out whether an organism showing the dominant trait is homozygous (TT) or heterozygous (Tt). It is crossed with a {b("homozygous recessive")} (tt) organism.</>,
        <>{b("TT x tt")} → all offspring tall. {b("Tt x tt")} → 1 tall : 1 short. For two traits, {b("TtRr x ttrr")} → 1 : 1 : 1 : 1.</>,
      ] },
      { t: "card", title: "Incomplete Dominance", body: [
        <>Sometimes neither allele completely masks the other and the heterozygote is {b("in between")}. In the four-o'clock plant (Mirabilis) and snapdragon, red (RR) x white (WW) gives {b("pink")} (RW) in F1; F2 shows {b("1 red : 2 pink : 1 white")} -- the genotypic and phenotypic ratios are both 1 : 2 : 1.</>,
      ] },
      { t: "card", title: "Multiple Alleles and Codominance: ABO Blood Groups", body: [
        <>Blood group is controlled by three alleles: {b("IA, IB and i")}. IA and IB are {b("codominant")} (both are expressed together in group AB); both are dominant over {b("i")}.</>,
        <>Group A: IAIA or IAi. Group B: IBIB or IBi. Group AB: IAIB. Group O: ii. A person has only two of the three alleles. Example: IAi x IBi can give A, B, AB and O in a 1 : 1 : 1 : 1 ratio.</>,
      ] },
      { t: "facts", rows: [
        ["Quick genetics formulas (n = number of gene pairs, all heterozygous)", "Types of gametes 2ⁿ; F2 phenotype classes 2ⁿ; F2 genotype classes 3ⁿ; boxes in Punnett square 4ⁿ (1 pair: 4, 2 pairs: 16)"],
        ["Dominant is not 'more common'", "Polydactyly (extra fingers) is a dominant trait but is rare in the population"],
        ["Statistical ratios", "3 : 1 or 9 : 3 : 3 : 1 appear only with large numbers of offspring -- a family of four children need not show the ratio"],
        ["Rediscovery", "Mendel's work was ignored until it was rediscovered in 1900 by de Vries, Correns and Tschermak"],
        ["Chromosome theory", "Sutton and Boveri (1902-03) linked Mendel's factors to chromosomes; Thomas Morgan's work on fruit flies showed genes lie on chromosomes"],
        ["Term 'gene'", "Coined by Wilhelm Johannsen (1909); the double helix of DNA was described by Watson and Crick (1953)"],
      ] },
      { t: "h", text: "Chromosomes and Disorders" },
      { t: "card", title: "Sex-linked Traits", body: [
        <>Genes on the {b("X chromosome")} are inherited with sex. Colour blindness and haemophilia are caused by {b("recessive alleles on the X chromosome")}. A man has one X (XY), so a single recessive allele shows; a woman needs two (XcXc), so she is usually a {b("carrier")} (XCXc) without the disease. These conditions are therefore more common in males.</>,
      ] },
      { t: "facts", rows: [
        ["Karyotype", "The chromosome set of a person arranged in pairs (22 autosome pairs + sex chromosomes)"],
        ["Down syndrome", "An extra copy of chromosome 21 (47 chromosomes)"],
        ["Turner syndrome", "Female with a single X (45, X)"],
        ["Klinefelter syndrome", "Male with an extra X (47, XXY)"],
        ["Sickle-cell anaemia", "Caused by a point mutation in the gene for haemoglobin"],
        ["Mutagens", "Agents that cause mutations: UV rays, X-rays, some chemicals. Mutations in germ cells can be inherited; those in body cells cannot"],
      ] },
      { t: "h", text: "Genetics in Action" },
      { t: "facts", rows: [
        ["Pedigree chart", "A family tree showing a trait over generations: squares are males, circles are females, shaded symbols show the trait"],
        ["DNA fingerprinting", "Identifying a person from patterns in DNA (developed by Alec Jeffreys, 1984) -- used in forensics and paternity tests"],
        ["Human Genome Project", "Completed in 2003; the human genome has about 3 billion base pairs and roughly 20,000 genes"],
        ["Genetically modified crops", "Genes transferred into crops for useful traits, e.g. Bt cotton (in India since 2002) resists bollworm"],
        ["Environment matters too", "Phenotype = genotype + environment: Himalayan rabbits and Siamese cats develop dark fur only in the cooler body parts"],
      ] },
      { t: "remember", title: "Watch for these traps", body: <>(1) Genotype is inherited; phenotype also depends on the environment. (2) 'Pure' or 'true-breeding' means homozygous. (3) The sex of the child is decided by the father's sperm, not the mother. (4) Recessive traits are not lost in F1 -- they are hidden. (5) A cross ratio is a probability for each child, not a guarantee for a family.</> },
    ],
  },
  {
    id: "competitive-solved",
    title: "16. Competitive Corner: Solved Questions",
    category: "Advanced",
    heading: "Solved Competitive Questions",
    sub: "Application-style genetics problems -- work them out on paper first.",
    blocks: [
      { t: "exq", n: 1, q: "A tall pea plant is crossed with a short plant. Half of the offspring are tall and half are short. What is the genotype of the tall parent?", a: "The short plant is tt and gives only t gametes. Half short (tt) offspring means the tall parent gave a t gamete half the time, so it produces T and t gametes equally: the tall parent is heterozygous, Tt. (Tt x tt gives 1 Tt tall : 1 tt short.)" },
      { t: "exq", n: 2, q: "Out of 640 F2 plants from a monohybrid tall x short cross (F1 Tt selfed), how many are expected to be tall, and how many of these will be homozygous?", a: "F2 ratio 3 tall : 1 short, so 480 tall and 160 short. Genotype ratio 1 TT : 2 Tt : 1 tt gives 160 TT, 320 Tt and 160 tt. So among the 480 tall plants, 160 are homozygous (TT) and 320 are heterozygous (Tt)." },
      { t: "exq", n: 3, q: "A plant heterozygous for both height and seed shape (TtRr) is self-pollinated and gives 320 plants. How many are expected to be short with wrinkled seeds?", a: "The F2 ratio is 9 : 3 : 3 : 1. Short wrinkled (ttrr) is the 1 part out of 16, so 320 x 1/16 = 20 plants." },
      { t: "exq", n: 4, q: "A test cross of TtRr with ttrr is done. State the offspring and their ratio.", a: "TtRr makes four gametes TR, Tr, tR, tr; ttrr makes only tr. Offspring: TtRr (tall round), Ttrr (tall wrinkled), ttRr (short round), ttrr (short wrinkled) in the ratio 1 : 1 : 1 : 1." },
      { t: "exq", n: 5, q: "A couple already has three daughters. What is the chance that their fourth child is a boy?", a: "The sex of each child is decided independently by whether the father's sperm carries X or Y, each with probability 1/2. Earlier children do not change this, so the chance of a boy is 1/2 (50%)." },
      { t: "exq", n: 6, q: "Why can two brown-eyed parents have a blue-eyed child (assuming brown is dominant)?", a: "Both parents can be heterozygous (Bb): they show the dominant brown trait but each carries a hidden recessive allele (b). A child who receives b from both parents is bb and blue-eyed. Each such child has a 1/4 chance." },
      { t: "exq", n: 7, q: "A person of blood group A (IAi) marries a person of blood group B (IBi). What blood groups can their children have?", a: "Gametes: IA or i from the father; IB or i from the mother. Children: IAIB (AB), IAi (A), IBi (B) and ii (O), each with probability 1/4 -- all four groups are possible." },
      { t: "exq", n: 8, q: "A colour-blind (recessive, X-linked) condition: a carrier woman (XCXc) marries a man with normal vision (XCY). What is expected in their children?", a: "Gametes: mother XC or Xc; father XC or Y. Children: XCXC (normal girl), XCXc (carrier girl), XCY (normal boy), XcY (colour-blind boy). All daughters have normal vision, and half the sons are colour-blind: 1 in 4 children overall." },
      { t: "exq", n: 9, q: "Two pink four-o'clock plants (RW) are crossed. What is the phenotypic ratio of the offspring, and why is it not 3 : 1?", a: "RW x RW gives RR : RW : WW = 1 : 2 : 1, i.e. 1 red : 2 pink : 1 white. It is not 3 : 1 because of incomplete dominance -- the heterozygote shows an intermediate colour rather than the dominant one." },
      { t: "exq", n: 10, q: "Mendel counted 556 seeds in the F2 of a round-yellow x wrinkled-green cross. How many of each type does 9 : 3 : 3 : 1 predict, and how do they compare with his counts of 315, 108, 101, 32?", a: "556 x 9/16 = 312.75, 556 x 3/16 = 104.25 (twice) and 556 x 1/16 = 34.75, i.e. about 313 : 104 : 104 : 35. Mendel's counts (315, 108, 101, 32) are very close, which supports independent assortment; small differences are due to chance." },
      { t: "exq", n: 11, q: "How can you tell whether a tall pea plant in the F2 is TT or Tt?", a: "By its looks you cannot (both are tall). Do a test cross: cross it with a short (tt) plant. If all the offspring are tall the plant is TT; if about half are short it is Tt." },
      { t: "exq", n: 12, q: "Give a reason why every child of a mother of blood group O and a father of group AB cannot be O.", a: "The mother (ii) can only give i. The father (IAIB) can only give IA or IB. So every child gets one of IAi (group A) or IBi (group B); a child with group O (ii) is impossible." },
    ],
  },
];

const ICONS: Record<string, React.ElementType> = { Variation: Leaf, Inheritance: Dna, "Mendel's Experiments": Sprout, "Sex Determination": Baby, Practical: FlaskConical, Revision: Shield, Advanced: Award };

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#0f1a12] border border-green-500/15 p-5 rounded-2xl space-y-3 shadow-md">
    <div className="flex items-center gap-2"><Baby className="w-5 h-5 text-green-400" /><h3 className="text-sm font-black uppercase tracking-wider text-green-300 font-mono">{title}</h3></div>
    <div className="space-y-3 text-sm font-semibold leading-relaxed text-slate-300">{children}</div>
  </div>
);
const RememberBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-amber-950/20 border border-amber-500/10 p-4 rounded-xl space-y-1.5 font-sans font-semibold">
    <h5 className="font-bold text-amber-400 font-mono text-[12.5px] uppercase tracking-wider flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {title}</h5>
    <div className="text-[14px] leading-relaxed">{children}</div>
  </div>
);
const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-green-300 font-mono"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /><span>{children}</span></div>
);
const FactRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-sm text-slate-300 font-semibold"><span className="text-white font-black">{label}:</span> <span>{children}</span></div>
);
const CompareTable: React.FC<{ left: string; right: string; rows: [string, string][]; isLightMode: boolean }> = ({ left, right, rows, isLightMode }) => (
  <div className={`overflow-hidden rounded-xl border ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
    <div className={`grid grid-cols-2 text-[12.5px] font-black uppercase tracking-wider ${isLightMode ? "bg-slate-800 text-white" : "bg-green-950/50 text-green-300"}`}>
      <div className="px-3 py-2 border-r border-slate-700/50">{left}</div><div className="px-3 py-2">{right}</div>
    </div>
    <div className={`divide-y ${isLightMode ? "divide-slate-200" : "divide-slate-800"}`}>
      {rows.map(([l, r], i) => (
        <div key={i} className={`grid grid-cols-2 text-[14px] font-semibold ${isLightMode ? "odd:bg-white even:bg-slate-50" : "odd:bg-slate-950 even:bg-slate-900/60"}`}>
          <div className={`px-3 py-2 border-r ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>{l}</div><div className="px-3 py-2">{r}</div>
        </div>
      ))}
    </div>
  </div>
);
const PicCard: React.FC<{ pic: Pic; isLightMode: boolean }> = ({ pic, isLightMode }) => (
  <figure className="space-y-2 m-0">
    <div className={`rounded-2xl border p-3 shadow-lg bg-white flex items-center justify-center ${isLightMode ? "border-slate-200" : "border-slate-700"}`}>
      <img src={IMG_BASE + pic.file + ".webp"} alt={pic.alt} loading="lazy" className="w-auto h-auto max-w-full max-h-[440px] object-contain" />
    </div>
    <figcaption className="text-center text-[13px] font-bold text-slate-500">{pic.caption}</figcaption>
  </figure>
);
const ExampleQ: React.FC<{ n: number; q: string; a: string }> = ({ n, q, a }) => (
  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
    <p className="text-sm font-bold leading-relaxed"><span className="text-green-400 font-mono">Q{n}.</span> {q}</p>
    <p className="text-sm font-semibold leading-relaxed"><span className="text-emerald-400 font-black">Answer: </span>{a}</p>
  </div>
);

function renderBlock(block: Block, i: number, isLightMode: boolean) {
  switch (block.t) {
    case "card": return <InfoCard key={i} title={block.title}>{block.body.map((p, j) => <p key={j}>{p}</p>)}</InfoCard>;
    case "h": return <SectionHeading key={i}>{block.text}</SectionHeading>;
    case "p": return <p key={i} className="text-sm font-semibold leading-relaxed">{block.body}</p>;
    case "ul": return <ul key={i} className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">{block.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
    case "facts": return <div key={i} className="grid grid-cols-1 gap-2.5">{block.rows.map(([l, r], j) => <FactRow key={j} label={l}>{r}</FactRow>)}</div>;
    case "compare": return <CompareTable key={i} left={block.left} right={block.right} rows={block.rows} isLightMode={isLightMode} />;
    case "remember": return <RememberBox key={i} title={block.title}>{block.body}</RememberBox>;
    case "img": return <PicCard key={i} pic={block.pic} isLightMode={isLightMode} />;
    case "imgs": return <div key={i} className={`grid grid-cols-1 gap-4 ${block.pics.length > 1 ? "sm:grid-cols-2" : ""}`}>{block.pics.map((p) => <PicCard key={p.file} pic={p} isLightMode={isLightMode} />)}</div>;
    case "exq": return <ExampleQ key={i} n={block.n} q={block.q} a={block.a} />;
    case "svg": return (
      <figure key={i} className="space-y-2 m-0">
        <div className={`rounded-2xl border p-3 shadow-lg bg-white ${isLightMode ? "border-slate-200" : "border-slate-700"}`}>
          {block.key === "gene" ? <GeneToTraitDiagram /> : <ChromosomePairsDiagram />}
        </div>
        <figcaption className="text-center text-[13px] font-bold text-slate-500">{block.caption}</figcaption>
      </figure>
    );
    case "punnett": return (
      <div key={i} className="space-y-2">
        <p className="text-[12.5px] font-black uppercase tracking-wider text-green-300 font-mono">{block.title}</p>
        <div className={`overflow-x-auto rounded-xl border ${isLightMode ? "border-slate-300" : "border-slate-700"}`}>
          <table className="w-full text-center text-[14px] font-semibold border-collapse">
            <thead>
              <tr className={isLightMode ? "bg-slate-800 text-white" : "bg-green-950/50 text-green-300"}>
                <th className="px-3 py-2 border border-slate-600/40 text-[11px] uppercase tracking-wider">{block.corner}</th>
                {block.cols.map((c, j) => <th key={j} className="px-3 py-2 border border-slate-600/40">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, j) => (
                <tr key={j} className={isLightMode ? "odd:bg-white even:bg-slate-50" : "odd:bg-slate-950 even:bg-slate-900/60"}>
                  {r.map((cell, k) => <td key={k} className={`px-3 py-2 border ${isLightMode ? "border-slate-300" : "border-slate-700"} ${k === 0 ? "font-black" : ""}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    case "activity": return (
      <div key={i} className={`rounded-2xl border p-5 space-y-4 shadow-md ${isLightMode ? "bg-white border-slate-200" : "bg-[#0f1a12] border-green-500/15"}`}>
        <div className="flex items-start gap-2.5"><FlaskConical className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /><h3 className="text-base font-black leading-snug">{block.title}</h3></div>
        <p className="text-sm font-semibold leading-relaxed"><span className="text-green-400 font-black">Aim: </span>{block.aim}</p>
        <SectionHeading>Procedure</SectionHeading>
        <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">{block.steps.map((s, j) => <li key={j}>{s}</li>)}</ol>
        <RememberBox title="Observation">{block.observation}</RememberBox>
        <RememberBox title="Conclusion">{block.conclusion}</RememberBox>
      </div>
    );
  }
}

interface LearnHeredity10Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

export function LearnHeredity10({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnHeredity10Props) {
  const [activeId, setActiveId] = useState<string>(TOPICS[0].id);
  const idx = Math.max(0, TOPICS.findIndex((t) => t.id === activeId));
  const topic = TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-heredity10-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <div className="flex items-center gap-2">
          <select value={activeId} onChange={(e) => setActiveId(e.target.value)} className={`flex-1 min-w-0 rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
            {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
          <a href={NOTES_PDF_URL} download={NOTES_PDF_NAME} className={`shrink-0 flex items-center gap-1 px-2.5 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg ${isLightMode ? "bg-green-600 text-white" : "bg-green-500 text-slate-950"}`}>
            <Download className="w-3 h-3" />
            PDF
          </a>
        </div>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><Sprout className="w-5 h-5 text-green-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>Heredity</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Variation, Mendel's experiments, dominant and recessive traits, and sex determination.</p>
          <a href={NOTES_PDF_URL} download={NOTES_PDF_NAME} className={`mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 ${isLightMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-400 text-slate-950"}`}>
            <Download className="w-3.5 h-3.5" />
            Download Notes
          </a>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {TOPICS.map((t) => (
            <button key={t.id} onClick={() => setActiveId(t.id)} className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 ${activeId === t.id ? (isLightMode ? "bg-green-50 border border-green-300" : "bg-green-950/40 border border-green-500/30") : "border border-transparent hover:bg-slate-800/40"}`}>
              <span className={`text-[12px] font-black uppercase tracking-widest font-mono block ${activeId === t.id ? "text-green-400" : "text-slate-500"}`}>{t.category}</span>
              <span className={`text-sm font-bold ${activeId === t.id ? (isLightMode ? "text-green-800" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>{t.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-heredity10-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-heredity10-main p, #learn-heredity10-main li, #learn-heredity10-main span, #learn-heredity10-main label, #learn-heredity10-main div:not(.bg-gradient-to-r) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-heredity10-main b, #learn-heredity10-main strong, #learn-heredity10-main h1, #learn-heredity10-main h2, #learn-heredity10-main h3, #learn-heredity10-main h4, #learn-heredity10-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          ${isLightMode ? `#learn-heredity10-container .bg-slate-900, #learn-heredity10-container .bg-\\[\\#0d1424\\], #learn-heredity10-container .bg-\\[\\#0f1a12\\], #learn-heredity10-container .bg-slate-950, #learn-heredity10-container .bg-\\[\\#0b1710\\] { background-color: #ffffff !important; border-color: #cbd5e1 !important; } #learn-heredity10-container .border-slate-800 { border-color: #cbd5e1 !important; }` : ""}
        ` }} />
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <span className="text-[12px] font-black uppercase tracking-widest font-mono text-green-400 flex items-center gap-1.5">{React.createElement(ICONS[topic.category] || Leaf, { className: "w-3.5 h-3.5" })}{topic.category}</span>
            <h1 className="text-2xl font-black tracking-tight leading-tight">{topic.heading}</h1>
            <p className="text-base font-semibold text-slate-400">{topic.sub}</p>
          </div>

          <div className="space-y-6" key={topic.id}>
            {topic.blocks.map((blk, i) => renderBlock(blk, i, isLightMode))}
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {idx > 0 ? (
              <button onClick={() => setActiveId(TOPICS[idx - 1].id)} className={navBtn}><ChevronLeft className="w-3 h-3" />Previous Topic</button>
            ) : <div />}
            {idx < TOPICS.length - 1 ? (
              <button onClick={() => setActiveId(TOPICS[idx + 1].id)} className={navBtn}>Next Topic<ChevronRight className="w-3 h-3" /></button>
            ) : (
              <div className="flex flex-wrap gap-3 justify-end w-full sm:w-auto">
                {onCompleteNotes && (
                  <button onClick={onCompleteNotes} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-slate-950 font-black text-[14px] cursor-pointer shadow-md border border-green-400/30 shrink-0">Complete Notes<ChevronRight className="w-3.5 h-3.5" /></button>
                )}
                {onGoToSelfAssessment && (
                  <button onClick={onGoToSelfAssessment} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-[14px] cursor-pointer shadow-md border border-cyan-400/30 shrink-0">Take Self Assessment Quiz<Award className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
