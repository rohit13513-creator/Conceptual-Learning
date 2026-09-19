import React, { useState } from "react";
import { Award, HelpCircle, Leaf, ChevronLeft, ChevronRight, FlaskConical, Sprout, Heart, Baby, Shield, Dna } from "lucide-react";
import { BinaryFissionDiagram, BuddingHydraDiagram, FlowerLSDiagram, PollenTubeDiagram, SpermDiagram } from "./reproduction10Diagrams";

// Class 10 Science, Ch 7 "How do Organisms Reproduce?" -- notes built from the NCERT chapter and
// the teacher's Reproduction notes (the Heredity portion of those notes belongs to the next
// chapter and is deliberately excluded).

type DiagramKey = "fission" | "budding" | "flower" | "pollen" | "sperm";

type Block =
  | { t: "card"; title: string; body: React.ReactNode[] }
  | { t: "h"; text: string }
  | { t: "ul"; items: React.ReactNode[] }
  | { t: "facts"; rows: [string, React.ReactNode][] }
  | { t: "compare"; left: string; right: string; rows: [string, string][] }
  | { t: "remember"; title: string; body: React.ReactNode }
  | { t: "diagram"; key: DiagramKey; caption: string }
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
    id: "why",
    title: "1. Why Do Organisms Reproduce?",
    category: "Fundamentals",
    heading: "Why Do Organisms Reproduce?",
    sub: "Reproduction is not needed for an individual to stay alive -- so why do all species do it?",
    blocks: [
      { t: "card", title: "Core Idea", body: [
        <>{b("Reproduction")} is the biological process by which living organisms produce new individuals (offspring) of their own kind, ensuring the continuation of their species.</>,
        <>Unlike nutrition, respiration or excretion, reproduction is {b("not essential to keep an individual alive")}. In fact it uses up a lot of the body's energy. Organisms reproduce for the {b("survival of their species")}.</>,
      ] },
      { t: "ul", items: [
        <>We notice a species only because there are {b("large numbers")} of similar individuals -- a single, non-reproducing member of a kind would hardly be noticed.</>,
        <>Two organisms belong to the same {b("species")} if they look (and are built) similar. Reproducing organisms create new individuals that look very much like themselves.</>,
        <>Similar {b("body design")} requires similar {b("blueprints")} -- so at its most basic level, reproduction means making {b("copies of the blueprint")}, i.e. the DNA.</>,
      ] },
      { t: "h", text: "Two Broad Types of Reproduction" },
      { t: "compare", left: "Asexual Reproduction", right: "Sexual Reproduction", rows: [
        ["Only one parent involved", "Two parents (male + female) involved"],
        ["No gametes, no fertilisation", "Gametes are formed and fuse (fertilisation)"],
        ["Offspring nearly identical to parent", "Offspring show variation"],
        ["Rapid, less energy", "Slower, needs more energy"],
      ] },
    ],
  },
  {
    id: "dna",
    title: "2. DNA Copying & Variation",
    category: "Fundamentals",
    heading: "DNA Copying and the Importance of Variation",
    sub: "The basic event in reproduction is making a copy of DNA -- and the copy is never perfect.",
    blocks: [
      { t: "card", title: "DNA -- the Blueprint", body: [
        <>{b("DNA (Deoxyribonucleic Acid)")} is found in the nucleus of a cell (in the chromosomes). It carries the information for making {b("proteins")}; different proteins give different body designs. If the information changes, different proteins are made and the body design can change.</>,
        <>DNA has a {b("double-helix")} structure -- two strands joined by pairs of bases (A with T, C with G).</>,
      ] },
      { t: "ul", items: [
        <>A basic event in reproduction is the {b("creation of a DNA copy")}. Cells use {b("chemical reactions")} to build copies of their DNA.</>,
        <>Keeping one copy in the old cell and pushing the other out would not work -- the pushed-out copy would have no {b("organised cellular apparatus")}. So DNA copying is accompanied by making {b("additional cell machinery")}, then the DNA copies separate, each with its own cell apparatus. A cell effectively {b("divides into two cells")}.</>,
        <>No biochemical reaction is absolutely reliable, so DNA copies are {b("similar but not identical")}. Some variations are so drastic that the new cell cannot survive (it dies); many are minor, so surviving cells are similar but {b("subtly different")}.</>,
        <>This inbuilt tendency for {b("variation")} during reproduction is the basis for {b("evolution")} (next chapter).</>,
      ] },
      { t: "h", text: "The Importance of Variation" },
      { t: "ul", items: [
        <>Populations of organisms occupy well-defined places called {b("niches")} in an ecosystem, and use their ability to reproduce to stay there. The {b("consistency of DNA copying")} maintains the body design suited to that niche -- so reproduction gives {b("stability to populations")}.</>,
        <>Niches can change (temperature rises, water level changes, a meteorite strikes). If a population has {b("no variation")}, a drastic change may wipe it out. If some individuals have variations that suit the new conditions, they {b("survive")} and the species continues.</>,
      ] },
      { t: "remember", title: "Example to remember", body: <>Bacteria living in temperate water: if global warming raises the water temperature, most die -- but the few variants that can tolerate heat survive and multiply. Variation ensures survival of the {b("species")}, even if individuals do not benefit.</> },
    ],
  },
  {
    id: "asexual-intro",
    title: "3. Asexual Reproduction: Overview",
    category: "Asexual Reproduction",
    heading: "Asexual Reproduction -- Modes Used by Single Organisms",
    sub: "One parent, no gametes, offspring that are (nearly) copies of the parent.",
    blocks: [
      { t: "card", title: "Definition", body: [
        <>{b("Asexual reproduction")} is the mode of reproduction in which a {b("single individual")} gives rise to new individuals. No gametes and no fertilisation are involved.</>,
      ] },
      { t: "h", text: "Characteristics" },
      { t: "ul", items: [
        <>Only {b("one parent")} is needed.</>,
        <>{b("No")} gamete formation and {b("no fertilisation")}.</>,
        <>Rapid multiplication and rapid population growth.</>,
        <>Offspring are {b("genetically identical")} to the parent (only tiny variations from copying errors).</>,
        <>Seen in unicellular organisms and many simple multicellular organisms and plants.</>,
      ] },
      { t: "h", text: "Six Types" },
      { t: "facts", rows: [
        ["Fission", "Binary fission and multiple fission -- Amoeba, Leishmania, Plasmodium"],
        ["Fragmentation", "Body breaks into pieces, each piece grows into a new individual -- Spirogyra"],
        ["Regeneration", "A cut/broken piece regrows into a full organism -- Hydra, Planaria"],
        ["Budding", "A bud grows as an outgrowth and detaches -- Hydra, yeast"],
        ["Vegetative propagation", "New plants from roots, stems or leaves -- Bryophyllum, potato, rose"],
        ["Spore formation", "Spores released from sporangia -- Rhizopus"],
      ] },
    ],
  },
  {
    id: "fission",
    title: "4. Fission (Binary & Multiple)",
    category: "Asexual Reproduction",
    heading: "Fission",
    sub: "Single-celled organisms simply divide.",
    blocks: [
      { t: "card", title: "What is Fission?", body: [
        <>{b("Fission")} is asexual reproduction in which a {b("unicellular organism")} divides into two or more new individuals. Each new individual is identical to the parent.</>,
      ] },
      { t: "h", text: "Binary Fission" },
      { t: "ul", items: [
        <>The parent cell divides into {b("two equal halves")}. Seen in {b("Amoeba, Paramecium, bacteria")}.</>,
        <>In {b("Amoeba")}, division can occur in any plane. In {b("Leishmania")} (which causes kala-azar) the cell has a whip-like {b("flagellum")} at one end, so binary fission takes place in a definite orientation in relation to that structure.</>,
      ] },
      { t: "diagram", key: "fission", caption: "Binary fission in Amoeba" },
      { t: "ul", items: [
        <>Steps: {b("nucleus divides (DNA copied) → cell elongates → cytoplasm constricts → two daughter cells")}.</>,
      ] },
      { t: "h", text: "Multiple Fission" },
      { t: "ul", items: [
        <>A single cell divides into {b("many daughter cells at the same time")}. Seen in {b("Plasmodium")} (the malarial parasite).</>,
        <>Under unfavourable conditions the organism forms a protective {b("cyst")} around itself; when conditions improve, many daughter cells are formed inside and released.</>,
      ] },
      { t: "compare", left: "Binary Fission", right: "Multiple Fission", rows: [
        ["Cell divides into 2 daughter cells", "Cell divides into many daughter cells"],
        ["Happens in favourable conditions", "Often follows cyst formation (unfavourable conditions)"],
        ["Amoeba, Leishmania, bacteria", "Plasmodium"],
      ] },
    ],
  },
  {
    id: "frag-regen",
    title: "5. Fragmentation & Regeneration",
    category: "Asexual Reproduction",
    heading: "Fragmentation and Regeneration",
    sub: "Broken pieces that grow into whole organisms.",
    blocks: [
      { t: "card", title: "Fragmentation", body: [
        <>In {b("fragmentation")} a multicellular organism simply {b("breaks up into smaller pieces (fragments)")} on maturity, and each fragment grows into a new individual. Example: {b("Spirogyra")} (a filamentous green alga in pond water).</>,
        <>It only works when the fragments contain cells that can {b("grow, divide and specialise")}; this is why complex organisms cannot use it.</>,
      ] },
      { t: "card", title: "Regeneration", body: [
        <>{b("Regeneration")} is the ability of a fully differentiated organism to give rise to a new individual from its cut or broken body parts. Examples: {b("Planaria")} and {b("Hydra")} -- cut into pieces, each piece regrows into a complete organism.</>,
        <>It is carried out by specialised cells that {b("proliferate (divide repeatedly)")} to make a mass of cells; these then {b("change into different cell types and tissues")} in an organised sequence.</>,
      ] },
      { t: "remember", title: "Regeneration ≠ reproduction", body: <>Most organisms cannot be cut up and still reproduce -- regeneration is a repair/regrowth ability, not a normal way of reproducing for them. Hydra normally reproduces by {b("budding")}; Planaria normally reproduces sexually.</> },
      { t: "h", text: "Why can't complex organisms (like humans) reproduce by regeneration?" },
      { t: "ul", items: [
        <>Complex organisms are made of {b("organised tissues and organs")}, not just similar cells.</>,
        <>Regeneration needs special cells that can multiply and specialise in a coordinated way; in complex organisms these abilities are {b("highly restricted")} and body design is not simply rebuilt from a piece.</>,
      ] },
    ],
  },
  {
    id: "budding",
    title: "6. Budding",
    category: "Asexual Reproduction",
    heading: "Budding",
    sub: "A new individual grows like an outgrowth on the parent.",
    blocks: [
      { t: "card", title: "Definition", body: [
        <>In {b("budding")}, a {b("bud")} develops as an outgrowth at a specific site on the parent, due to repeated cell division at that site. The bud grows into a tiny individual and, when mature, {b("detaches")} and lives independently.</>,
        <>Budding uses special (regenerative) cells and occurs in unicellular ({b("yeast")}) and multicellular ({b("Hydra")}) organisms.</>,
      ] },
      { t: "diagram", key: "budding", caption: "Budding in Hydra" },
      { t: "ul", items: [
        <>Steps: {b("growth of bud → development → separation → new independent organism")}.</>,
        <>{b("Yeast")}: in warm, sugar-rich (about 10% sugar) solution, yeast cells form small buds that separate and grow into new yeast cells.</>,
      ] },
      { t: "compare", left: "Budding", right: "Fission", rows: [
        ["Unequal division; a small outgrowth forms", "Parent divides into (nearly) equal parts"],
        ["Hydra, yeast", "Amoeba, bacteria, Plasmodium"],
        ["Bud detaches after growing", "Parent cell itself is used up in dividing"],
      ] },
    ],
  },
  {
    id: "spore",
    title: "7. Spore Formation",
    category: "Asexual Reproduction",
    heading: "Spore Formation",
    sub: "Tiny, tough reproductive cells released into the air.",
    blocks: [
      { t: "card", title: "Rhizopus (Bread Mould)", body: [
        <>{b("Rhizopus")} grows on a moist slice of bread kept in a cool, moist, dark place. The thread-like structures on the bread are {b("hyphae")} -- they are {b("not")} reproductive.</>,
        <>The small blob-on-a-stick structures are {b("sporangia")}; they contain many tiny cells called {b("spores")}. When the sporangium bursts, spores are dispersed by air and, on a moist surface, {b("germinate into new Rhizopus")}.</>,
      ] },
      { t: "ul", items: [
        <>Spores are covered by a {b("thick protective wall")} that helps them survive unfavourable conditions until they land on a suitable moist surface.</>,
        <>{b("Benefit")}: a very large number of spores is produced; they are easily spread by air; they survive harsh conditions -- so the organism can spread quickly and widely.</>,
      ] },
    ],
  },
  {
    id: "vegetative",
    title: "8. Vegetative Propagation",
    category: "Asexual Reproduction",
    heading: "Vegetative Propagation",
    sub: "New plants from roots, stems or leaves.",
    blocks: [
      { t: "card", title: "What is it?", body: [
        <>{b("Vegetative propagation")} is a type of asexual reproduction in which new plants are obtained from the {b("vegetative parts")} -- root, stem or leaf -- of the parent plant. The buds/nodes present develop into new plants under suitable conditions.</>,
      ] },
      { t: "h", text: "Natural Vegetative Propagation" },
      { t: "facts", rows: [
        ["Leaf", "Buds in the notches of the leaf margin of Bryophyllum fall on damp soil and grow into new plants"],
        ["Stem", "Potato (eyes/nodes), ginger, onion, grasses -- buds on stems/tubers sprout"],
        ["Root", "Sweet potato, Dahlia -- buds on roots develop into new plants"],
      ] },
      { t: "h", text: "Artificial Vegetative Propagation" },
      { t: "facts", rows: [
        ["Cutting", "A stem piece with nodes is cut and planted in moist soil -- roots form (rose, sugarcane, money plant)"],
        ["Layering", "A branch is bent and covered with soil while still attached to the parent; roots form, then it is separated (jasmine, mint, strawberry)"],
        ["Grafting", "The cut stem (scion) of one plant is fixed on the rooted stock of a related plant; tissues join (mango, apple, lemon)"],
        ["Tissue culture", "A few cells/tissue taken from the tip of a plant are grown on a nutrient medium in sterile conditions; the callus is moved to hormone medium, then to soil (orchids, ornamental plants, banana)"],
      ] },
      { t: "h", text: "Why practise vegetative propagation?" },
      { t: "ul", items: [
        <>Plants raised by it bear {b("flowers and fruits earlier")} than those grown from seeds.</>,
        <>It lets us grow plants that have {b("lost the capacity to produce viable seeds")} -- banana, orange, rose, jasmine.</>,
        <>All new plants are {b("genetically similar to the parent")}, so the desired characters are preserved.</>,
      ] },
      { t: "remember", title: "Grafting note", body: <>{b("Scion")} = the part joined on top; {b("Stock")} = the rooted plant it is joined to. Only plants of the same or closely related type can be grafted.</> },
    ],
  },
  {
    id: "sexual",
    title: "9. Sexual Reproduction",
    category: "Sexual Reproduction",
    heading: "Sexual Reproduction",
    sub: "Two parents, two special cells, one new individual.",
    blocks: [
      { t: "card", title: "Definition", body: [
        <>{b("Sexual reproduction")} involves {b("two individuals")} (usually one male, one female). Each produces specialised sex cells called {b("gametes")}; the male gamete (sperm) and female gamete (egg) fuse in {b("fertilisation")} to form a {b("zygote")}, which develops into the new individual.</>,
      ] },
      { t: "h", text: "Why the Sexual Mode?" },
      { t: "ul", items: [
        <>DNA copying creates small variations; when DNA of {b("two different individuals")} combines, {b("new combinations")} arise -- much more variation than asexual copying gives.</>,
        <>If every generation combined the full DNA of two parents, DNA would {b("double each generation")}. To avoid this, organisms make {b("germ cells (gametes) with half the DNA/chromosome number")}; fusion restores the normal amount in the zygote.</>,
        <>In complex organisms the two gametes are different: the {b("egg is large and stores food")}; the {b("sperm is small and motile")}. This is why male and female reproductive organs (and in some species male and female bodies) differ.</>,
      ] },
      { t: "compare", left: "Advantages of Sexual Reproduction", right: "Disadvantages", rows: [
        ["Promotes variation, helping species adapt and survive", "Uses more energy and time"],
        ["Better resistance to diseases and changing conditions", "Need to find a mate; less rapid growth of population"],
      ] },
      { t: "remember", title: "Key comparison", body: <>Asexual = one parent, no variation, fast. Sexual = two parents, variation, slower, more energy. Variation is what makes evolution possible.</> },
    ],
  },
  {
    id: "flower",
    title: "10. Flowering Plants: The Flower",
    category: "Sexual Reproduction",
    heading: "Sexual Reproduction in Flowering Plants",
    sub: "The flower is the reproductive organ of an angiosperm.",
    blocks: [
      { t: "ul", items: [
        <>{b("Angiosperms")} (flowering plants) bear seeds enclosed in fruits; {b("gymnosperms")} bear seeds without fruits (cones are their reproductive structures).</>,
        <>Flower parts (from outside): {b("sepals")} (green, protect the bud), {b("petals")} (coloured, attract insects and protect inner parts), {b("stamens")} (male), {b("carpel/pistil")} (female).</>,
      ] },
      { t: "diagram", key: "flower", caption: "Longitudinal section (L.S.) of a flower" },
      { t: "facts", rows: [
        ["Stamen (male part)", "Anther -- swollen top, makes pollen grains (yellowish powder) that carry male gametes; Filament -- stalk holding the anther"],
        ["Carpel / Pistil (female part)", "Stigma -- sticky tip that receives pollen; Style -- tube joining stigma and ovary; Ovary -- swollen base containing ovules"],
        ["Ovule", "Inside the ovary; contains the female gamete (egg cell); becomes the seed after fertilisation"],
      ] },
      { t: "h", text: "Unisexual vs Bisexual Flowers" },
      { t: "compare", left: "Unisexual flower", right: "Bisexual flower", rows: [
        ["Has only stamens OR only pistil", "Has both stamens and pistil"],
        ["Papaya, watermelon", "Hibiscus, mustard"],
      ] },
    ],
  },
  {
    id: "pollination",
    title: "11. Pollination & Fertilisation",
    category: "Sexual Reproduction",
    heading: "Pollination and Fertilisation",
    sub: "From pollen landing on a stigma to a zygote in the ovule.",
    blocks: [
      { t: "card", title: "Pollination", body: [
        <>{b("Pollination")} is the transfer of pollen from the anther of a stamen to the stigma of a carpel. Agents: wind, water, insects, birds and animals.</>,
      ] },
      { t: "compare", left: "Self-pollination", right: "Cross-pollination", rows: [
        ["Pollen goes to the stigma of the same flower (or another flower of the same plant)", "Pollen goes to a flower of a different plant of the same species"],
        ["No variation; needs no agent (peas, tomato)", "Produces variation and healthier offspring (apple, sunflower)"],
      ] },
      { t: "diagram", key: "pollen", caption: "Pollen tube growth after pollination" },
      { t: "h", text: "Fertilisation" },
      { t: "ul", items: [
        <>After landing on a suitable stigma, the pollen grain grows a {b("pollen tube")} down through the style to the ovary and ovule.</>,
        <>The tube carries the {b("male gametes")}; in the ovule one of them fuses with the {b("egg cell")} -- this is {b("fertilisation")}, forming a {b("zygote")} (diploid).</>,
        <>{b("Pollination ≠ fertilisation")}: pollination is the transfer of pollen (an external event); fertilisation is the fusion of gametes.</>,
      ] },
      { t: "remember", title: "Extra (beyond NCERT): double fertilisation", body: <>In flowering plants a second male gamete fuses with two polar nuclei in the ovule (triple fusion) to form the food-storing {b("endosperm")}. This together with syngamy (egg + male gamete) is called double fertilisation.</> },
      { t: "h", text: "After Fertilisation" },
      { t: "facts", rows: [
        ["Zygote", "Divides repeatedly to form the embryo inside the ovule"],
        ["Ovule", "Develops a tough coat and becomes the seed"],
        ["Ovary", "Grows, ripens and becomes the fruit"],
        ["Petals, sepals, stamens, style, stigma", "Usually dry up and fall off"],
      ] },
    ],
  },
  {
    id: "germination",
    title: "12. Seed & Germination",
    category: "Sexual Reproduction",
    heading: "Seed, Fruit and Germination",
    sub: "How a seed grows into a new plant.",
    blocks: [
      { t: "ul", items: [
        <>The {b("seed")} contains the embryo (future plant) with food stored in {b("cotyledons")} (seed leaves).</>,
        <>{b("Germination")} is the development of the embryo in the seed into a seedling, under suitable conditions (water, air, warmth). The seed swells by absorbing water, the {b("radicle")} grows down into the root, and the {b("plumule")} grows up into the shoot.</>,
        <>Seeds germinate to give a new plant, and the {b("fruit")} protects the seed and helps in dispersal.</>,
      ] },
      { t: "compare", left: "Monocot (one cotyledon)", right: "Dicot (two cotyledons)", rows: [
        ["Parallel leaf veins", "Net-like leaf veins"],
        ["Grass, maize, lilies, orchids", "Beans, gram, sunflower, rose"],
      ] },
      { t: "activity", title: "Observing a germinating seed (NCERT 7.7)", aim: "To see the parts of a soaked seed.", steps: [
        "Soak a few gram or pea seeds overnight.",
        "Drain the water and cover the seeds with a wet cloth; leave them for a day.",
        "Cut open a soaked seed and identify its parts.",
        "Compare with the figure of the seed in the textbook.",
      ], observation: "A seed has a seed coat, an embryo with plumule and radicle, and cotyledons that store food.", conclusion: "The embryo grows into a new plant on germination, using stored food in the cotyledons." },
    ],
  },
  {
    id: "puberty",
    title: "13. Puberty & Adolescence",
    category: "Human Reproduction",
    heading: "Reproduction in Human Beings: Puberty",
    sub: "The body matures sexually.",
    blocks: [
      { t: "card", title: "Sexual Maturation", body: [
        <>Humans reproduce {b("sexually")}. As body growth slows down, the reproductive tissues begin to mature -- this period is called {b("puberty")} (sexual maturation). It is a time of physical and hormonal change, usually starting between about 10-14 years of age; it may start earlier or later in different individuals.</>,
        <>{b("Adolescence")} is the period between childhood and adulthood in which puberty occurs, along with psychological changes.</>,
      ] },
      { t: "h", text: "Common Changes (Boys and Girls)" },
      { t: "ul", items: [
        <>Thick hair growth in the {b("armpits and genital area")}; skin becomes {b("oily")} and pimples may appear; increase in height and body mass; new emotions and awareness.</>,
      ] },
      { t: "compare", left: "Changes in Girls", right: "Changes in Boys", rows: [
        ["Breast size increases; darkening of nipple skin", "Thick hair growth on face (moustache, beard)"],
        ["Onset of menstruation", "Voice deepens, becomes 'cracky'; Adam's apple forms"],
        ["Hips widen; body proportions change", "Muscle mass and strength increase"],
      ] },
      { t: "remember", title: "Key point", body: <>These changes are signals of {b("sexual maturation")}. They happen gradually over months/years and at different times for different people -- but a body that is sexually mature is not automatically ready for the responsibilities of sex or parenthood.</> },
    ],
  },
  {
    id: "male",
    title: "14. The Male Reproductive System",
    category: "Human Reproduction",
    heading: "The Human Male Reproductive System",
    sub: "Making and delivering sperm.",
    blocks: [
      { t: "facts", rows: [
        ["Testes (2)", "Primary sex organs; produce sperm and the hormone testosterone. Lie outside the abdomen in the scrotum, where the temperature is lower -- sperm formation needs a temperature lower than normal body temperature"],
        ["Testosterone", "Regulates sperm production and brings about the changes seen in boys at puberty"],
        ["Epididymis", "Coiled tube on each testis that stores sperm and where they mature"],
        ["Vas deferens", "Sperm duct; carries sperm from the testis up to the urethra"],
        ["Seminal vesicles & prostate gland", "Add their secretions to the sperm to make semen -- provide fluid medium, nutrition (fructose) for the sperm, and ease their transport"],
        ["Urethra", "Common passage for urine and semen; runs through the penis"],
        ["Penis", "Organ that delivers sperm into the female reproductive tract"],
      ] },
      { t: "h", text: "The Sperm" },
      { t: "diagram", key: "sperm", caption: "Structure of a sperm" },
      { t: "ul", items: [
        <>A tiny, motile male gamete with a {b("head")} (nucleus with DNA; the tip holds enzymes), a {b("middle piece")} rich in mitochondria (energy) and a long {b("tail")} for swimming.</>,
      ] },
    ],
  },
  {
    id: "female",
    title: "15. The Female Reproductive System",
    category: "Human Reproduction",
    heading: "The Human Female Reproductive System",
    sub: "Making eggs and nurturing the developing baby.",
    blocks: [
      { t: "facts", rows: [
        ["Ovaries (2)", "Primary sex organs; produce eggs (ova) and hormones (oestrogen, progesterone). At birth they already hold thousands of immature eggs; from puberty one egg matures and is released about every month (ovulation)"],
        ["Oviducts / Fallopian tubes", "Tubes with a funnel-shaped opening that catch the egg and carry it to the uterus; fertilisation normally occurs here"],
        ["Uterus (womb)", "Bag-like, muscular organ where the embryo is implanted and develops; its inner lining (endometrium) thickens every month to receive a fertilised egg"],
        ["Cervix", "Lower narrow part of the uterus that opens into the vagina"],
        ["Vagina", "Muscular tube that receives sperm, and forms the birth canal"],
      ] },
      { t: "remember", title: "Why the testes are outside but ovaries inside", body: <>Sperm need a lower temperature than normal body temperature to form, so testes hang in the scrotum outside the abdominal cavity. Eggs and the developing baby need a stable warm environment, so ovaries and uterus lie safely inside.</> },
    ],
  },
  {
    id: "fertilisation",
    title: "16. Fertilisation to Birth",
    category: "Human Reproduction",
    heading: "From Fertilisation to Birth",
    sub: "How a zygote becomes a baby.",
    blocks: [
      { t: "ul", items: [
        <>During sexual intercourse sperm are deposited in the {b("vagina")}, travel through the cervix and uterus into the {b("oviduct")}, where one sperm may fuse with the egg -- {b("fertilisation")} -- to form a {b("zygote")} (this is internal fertilisation).</>,
        <>The zygote divides repeatedly to form an {b("embryo")}, which gets {b("implanted")} in the thick, blood-rich lining of the uterus about 6-8 days after fertilisation.</>,
      ] },
      { t: "h", text: "Placenta" },
      { t: "ul", items: [
        <>The {b("placenta")} is a special disc-like tissue embedded in the uterine wall. It has many {b("villi")} on the embryo's side and blood spaces on the mother's side.</>,
        <>It provides a large surface area for the exchange of {b("glucose, oxygen, nutrients")} from the mother to the embryo and for the removal of {b("waste (e.g. carbon dioxide)")} from the embryo to the mother's blood. The embryo is connected to the placenta by the {b("umbilical cord")}.</>,
      ] },
      { t: "h", text: "Development and Birth" },
      { t: "facts", rows: [
        ["Zygote", "Formed after fertilisation in the oviduct"],
        ["Embryo", "First stage after implantation; major organs start forming (up to about 8 weeks)"],
        ["Foetus", "Development continues; organs mature; grows rapidly until birth"],
        ["Gestation", "Roughly 9 months (about 40 weeks) from the last menstrual period; birth occurs by rhythmic contractions of uterine muscles"],
        ["Lactation", "After birth, the mother produces milk (breast-feeding) which gives the baby nutrition and antibodies"],
      ] },
    ],
  },
  {
    id: "menstruation",
    title: "17. Menstruation",
    category: "Human Reproduction",
    heading: "What Happens When the Egg is Not Fertilised?",
    sub: "The monthly cycle.",
    blocks: [
      { t: "ul", items: [
        <>Each month the ovary releases an egg and the uterus prepares itself: its lining becomes thick and soft with a rich blood supply to receive a fertilised egg.</>,
        <>If the egg is {b("not fertilised")}, it lives for about {b("one day")}. The thickened lining is no longer needed, so it {b("breaks down and comes out of the vagina as blood and mucus")}. This is {b("menstruation")}.</>,
        <>The cycle repeats roughly {b("every month")}, and the bleeding lasts about {b("2 to 8 days")}.</>,
      ] },
      { t: "remember", title: "Why does menstruation occur?", body: <>Because the uterine lining prepared for a possible pregnancy is not needed when the egg is not fertilised -- the lining is shed. If fertilisation occurs, menstruation stops during pregnancy.</> },
    ],
  },
  {
    id: "health",
    title: "18. Reproductive Health",
    category: "Human Reproduction",
    heading: "Reproductive Health",
    sub: "Contraception, STDs and the sex ratio.",
    blocks: [
      { t: "card", title: "What is Reproductive Health?", body: [
        <>Reproductive health means a state of physical, mental and social well-being in all matters relating to the reproductive system. It needs a balanced diet, hygiene, exercise, no smoking or drugs, and mental well-being. Readiness for sexual activity depends on physical and mental maturity -- not only on body changes -- and can be affected by peer, family or social pressure.</>,
      ] },
      { t: "h", text: "Sexually Transmitted Diseases (STDs)" },
      { t: "facts", rows: [
        ["Bacterial", "Gonorrhoea, Syphilis"],
        ["Viral", "Warts, HIV-AIDS"],
      ] },
      { t: "ul", items: [
        <>STDs spread through {b("sexual contact")}. Using a {b("condom")} can reduce the risk of many of them to some extent.</>,
        <>A copper-T does {b("not")} protect from STDs.</>,
      ] },
      { t: "h", text: "Contraception (Birth Control)" },
      { t: "facts", rows: [
        ["Barrier methods", "Condoms (male/female) and diaphragm prevent sperm from meeting the egg; also protect from STDs (condoms)"],
        ["Hormonal methods (oral pills)", "Change the hormonal balance so that eggs are not released; may have side effects"],
        ["Intrauterine devices (Copper-T / loop)", "Placed in the uterus to prevent implantation; may cause irritation or side effects"],
        ["Surgical methods", "Vasectomy (vas deferens blocked in men) and tubectomy (fallopian tubes blocked in women) -- permanent; risk of infection if not done properly"],
      ] },
      { t: "h", text: "Why adopt contraception?" },
      { t: "ul", items: [
        <>To {b("space or delay pregnancies")}, avoid unwanted pregnancy, protect the mother's health, control population growth and (for condoms) reduce STD risk.</>,
      ] },
      { t: "remember", title: "Female foeticide & sex ratio", body: <>Killing a female foetus (illegal sex-selective abortion after prenatal sex determination) has caused a sharp fall in the child sex ratio in some regions. Prenatal sex determination is {b("prohibited by law")}. A healthy society needs a balanced sex ratio.</> },
    ],
  },
  {
    id: "activities",
    title: "19. NCERT Activities",
    category: "Practical",
    heading: "NCERT Activities (Chapter 7)",
    sub: "The hands-on experiments you must know.",
    blocks: [
      { t: "activity", title: "Rhizopus on bread (Activity 7.2)", aim: "To observe the growth of bread mould and its spores.", steps: [
        "Moisten a slice of bread and keep it in a cool, moist, dark place for a few days.",
        "Observe the thread-like growth with a magnifying glass.",
        "Later, observe the small blob-like sporangia; a slide can be viewed under a microscope.",
      ], observation: "Cotton-like hyphae spread on the bread; small black round sporangia appear on stalks and contain spores.", conclusion: "Rhizopus reproduces by spore formation; spores germinate on damp surfaces." },
      { t: "activity", title: "Yeast budding (Activity 7.1 style)", aim: "To see budding in yeast.", steps: [
        "Dissolve about 10 g sugar in 100 mL warm water and add a pinch of yeast.",
        "Keep in a warm place for an hour, then put a drop on a slide and view under a microscope.",
      ], observation: "Small outgrowths (buds) on the yeast cells in various stages of separation.", conclusion: "Yeast reproduces by budding." },
      { t: "activity", title: "Vegetative propagation in a potato / money plant (Activity 7.5/7.6)", aim: "To see how a piece of a plant grows into a new plant.", steps: [
        "Cut a piece of potato with an 'eye' or a stem piece of a money plant with a node.",
        "Keep them in moist soil / water for a few days.",
      ], observation: "Roots and shoots develop from the node/eye.", conclusion: "Buds/nodes give rise to new plants -- vegetative propagation." },
      { t: "activity", title: "Studying a flower (Activity 7.7)", aim: "To identify the parts of a flower.", steps: [
        "Take a hibiscus or mustard flower.",
        "Separate the sepals, petals, stamens and carpel carefully.",
        "Cut the ovary lengthwise and observe the ovules with a hand lens.",
      ], observation: "A bisexual flower has both stamens and a pistil; the ovary contains ovules.", conclusion: "A flower is the reproductive organ of a flowering plant." },
    ],
  },
  {
    id: "mindmap",
    title: "20. Quick Glossary & Mind Map",
    category: "Revision",
    heading: "Quick Glossary and Mind Map",
    sub: "Everything in the chapter on one page.",
    blocks: [
      { t: "facts", rows: [
        ["Gamete", "A sex cell (sperm/egg) with half the DNA of a body cell"],
        ["Zygote", "Cell formed by fusion of two gametes"],
        ["Pollination", "Transfer of pollen from anther to stigma"],
        ["Fertilisation", "Fusion of male and female gametes"],
        ["Implantation", "Attachment of the embryo to the uterine lining"],
        ["Placenta", "Tissue connecting embryo and mother for exchange of food, oxygen and wastes"],
        ["Menstruation", "Shedding of the uterine lining when the egg is not fertilised"],
        ["Regeneration", "Growing back a whole organism/part from a cut piece"],
        ["Scion / Stock", "Upper cut branch / rooted plant in grafting"],
        ["Contraception", "Methods to prevent pregnancy"],
      ] },
      { t: "h", text: "Mind Map" },
      { t: "ul", items: [
        <>{b("Reproduction")} → {b("Asexual")}: fission (binary, multiple), fragmentation, regeneration, budding, vegetative propagation, spore formation.</>,
        <>{b("Reproduction")} → {b("Sexual")}: flowering plants (flower → pollination → fertilisation → seed/fruit → germination) and humans (puberty → male/female systems → fertilisation → implantation → placenta → birth).</>,
        <>{b("Reproductive health")}: hygiene, STDs, contraception (barrier, hormonal, IUD, surgical), sex ratio.</>,
      ] },
    ],
  },
];

const ICONS: Record<string, React.ElementType> = { Fundamentals: Dna, "Asexual Reproduction": Leaf, "Sexual Reproduction": Sprout, "Human Reproduction": Heart, Practical: FlaskConical, Revision: Shield };

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
const DiagramCard: React.FC<{ caption: string; children: React.ReactNode; isLightMode: boolean }> = ({ caption, children, isLightMode }) => (
  <div className="space-y-2">
    <div className={`rounded-2xl border p-3 shadow-lg ${isLightMode ? "bg-white border-slate-200" : "bg-[#0b1710] border-slate-800"}`}>{children}</div>
    <p className="text-center text-[13px] font-bold text-slate-500">{caption}</p>
  </div>
);
const DIAGRAMS: Record<DiagramKey, React.ReactElement> = {
  fission: <BinaryFissionDiagram />, budding: <BuddingHydraDiagram />, flower: <FlowerLSDiagram />, pollen: <PollenTubeDiagram />, sperm: <SpermDiagram />,
};

function renderBlock(block: Block, i: number, isLightMode: boolean) {
  switch (block.t) {
    case "card": return <InfoCard key={i} title={block.title}>{block.body.map((p, j) => <p key={j}>{p}</p>)}</InfoCard>;
    case "h": return <SectionHeading key={i}>{block.text}</SectionHeading>;
    case "p": return <p key={i} className="text-sm font-semibold leading-relaxed">{block.body}</p>;
    case "ul": return <ul key={i} className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">{block.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
    case "facts": return <div key={i} className="grid grid-cols-1 gap-2.5">{block.rows.map(([l, r], j) => <FactRow key={j} label={l}>{r}</FactRow>)}</div>;
    case "compare": return <CompareTable key={i} left={block.left} right={block.right} rows={block.rows} isLightMode={isLightMode} />;
    case "remember": return <RememberBox key={i} title={block.title}>{block.body}</RememberBox>;
    case "diagram": return <DiagramCard key={i} caption={block.caption} isLightMode={isLightMode}>{DIAGRAMS[block.key]}</DiagramCard>;
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

interface LearnReproduction10Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

export function LearnReproduction10({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnReproduction10Props) {
  const [activeId, setActiveId] = useState<string>(TOPICS[0].id);
  const idx = Math.max(0, TOPICS.findIndex((t) => t.id === activeId));
  const topic = TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-repro10-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <select value={activeId} onChange={(e) => setActiveId(e.target.value)} className={`w-full rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
          {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><Sprout className="w-5 h-5 text-green-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>How do Organisms Reproduce?</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Asexual and sexual reproduction, plants and humans, reproductive health.</p>
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

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-repro10-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-repro10-main p, #learn-repro10-main li, #learn-repro10-main span, #learn-repro10-main label, #learn-repro10-main div:not(.bg-gradient-to-r) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-repro10-main b, #learn-repro10-main strong, #learn-repro10-main h1, #learn-repro10-main h2, #learn-repro10-main h3, #learn-repro10-main h4, #learn-repro10-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          ${isLightMode ? `#learn-repro10-container .bg-slate-900, #learn-repro10-container .bg-\\[\\#0d1424\\], #learn-repro10-container .bg-\\[\\#0f1a12\\], #learn-repro10-container .bg-slate-950, #learn-repro10-container .bg-\\[\\#0b1710\\] { background-color: #ffffff !important; border-color: #cbd5e1 !important; } #learn-repro10-container .border-slate-800 { border-color: #cbd5e1 !important; }` : ""}
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
