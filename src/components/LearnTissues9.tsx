import React, { useState } from "react";
import { Award, HelpCircle, ChevronLeft, ChevronRight, FlaskConical, Sprout, Layers, Bone, Zap, Brain, Network, Trophy, Lightbulb, Dna } from "lucide-react";
import { OrganisationLevelsDiagram, MeristemLocationsDiagram, DifferentiationDiagram, PlantTissueMapDiagram, StomataTranspirationDiagram, AnimalTissueMapDiagram, VoluntaryInvoluntaryDiagram, JointMovementMindMap } from "./tissues9Diagrams";

// Notes for "Tissues in Action". Simple words, short sentences, point by point.

const IMG_BASE = "/diagrams/tissues9/";
interface Pic { file: string; alt: string; caption: string; }
type SvgKey = "levels" | "meristem-loc" | "differentiation" | "plant-map" | "stomata" | "animal-map" | "voluntary" | "mind";

type Block =
  | { t: "card"; title: string; body: React.ReactNode[] }
  | { t: "h"; text: string }
  | { t: "ul"; items: React.ReactNode[] }
  | { t: "facts"; rows: [string, React.ReactNode][] }
  | { t: "compare"; left: string; right: string; rows: [string, string][] }
  | { t: "remember"; title: string; body: React.ReactNode }
  | { t: "img"; pic: Pic }
  | { t: "imgs"; pics: Pic[] }
  | { t: "svg"; key: SvgKey; caption: string }
  | { t: "exq"; n: number; q: string; a: string }
  | { t: "activity"; title: string; aim: string; steps: string[]; observation: string; conclusion: string }
  | { t: "done"; items: string[] }
  | { t: "p"; body: React.ReactNode };

interface Topic { id: string; title: string; category: string; heading: string; sub: string; blocks: Block[]; }

const b = (s: string) => <b>{s}</b>;

const TOPICS: Topic[] = [
  {
    id: "levels",
    title: "1. Cells Form Tissues",
    category: "Organisation",
    heading: "From Cells to a Whole Body",
    sub: "Similar cells group together and share the work, so the body runs more efficiently.",
    blocks: [
      { t: "card", title: "Core Idea", body: [
        <>Life begins from a single cell that divides again and again. These cells go on to form skin, muscles, bones, nerves and every other part of the body.</>,
        <>A {b("tissue")} is a group of cells, similar in structure, that work together to do one job.</>,
      ] },
      { t: "svg", key: "levels", caption: "Cells build up into tissues, organs, organ systems and a whole organism" },
      { t: "ul", items: [
        <>In a {b("unicellular")} organism, like an amoeba, a single cell does every job of life.</>,
        <>In a {b("multicellular")} organism, different groups of cells take on different jobs.</>,
        <>Cells of one kind, doing one job, form a {b("tissue")}. More than one tissue together forms an {b("organ")}. Organs working together form an {b("organ system")}. Organ systems together form the {b("organism")}.</>,
      ] },
      { t: "card", title: "Division of Labour", body: [
        <>Making different tissues for different jobs is called {b("division of labour")}. It makes the body more efficient and lets it do more complex jobs.</>,
        <>In animals, muscle tissue gives movement and nervous tissue carries messages. In plants, xylem carries water and minerals, while phloem carries food.</>,
      ] },
    ],
  },
  {
    id: "plant-vs-animal",
    title: "2. Why Plant and Animal Tissues Differ",
    category: "Organisation",
    heading: "Why Are Plant and Animal Tissues Different?",
    sub: "Different jobs and different lifestyles need different kinds of tissue.",
    blocks: [
      { t: "ul", items: [
        <>Most plants stay fixed in one place. They need support to stay upright, so plant cells have a {b("cell wall")} that gives strength and rigidity.</>,
        <>Most animals can move (a few, like sponges, cannot). Without a rigid cell wall, animal cells can change shape easily, which suits movement.</>,
        <>Animals have tissues to digest food from outside. Plants have tissues that use sunlight to make their own food (photosynthesis).</>,
        <>Both plants and animals have separate tissues for carrying food and water, but these tissues are built differently.</>,
        <>The tissues responsible for growth are also different in structure and function in plants and animals.</>,
      ] },
      { t: "remember", title: "Key point", body: <>Structure and function go together. The shape and arrangement of the cells in a tissue is suited to the exact job it does.</> },
    ],
  },
  {
    id: "meristems",
    title: "3. Growth Tissues: Meristems",
    category: "Plant Tissues",
    heading: "Tissues for Growth in Plants",
    sub: "Plants grow in three ways, and each way needs its own dividing tissue.",
    blocks: [
      { t: "card", title: "Three ways plants grow", body: [
        <>Plants grow taller (length of stem, depth of roots), thicker (girth of stem), and can regrow after their branches are cut or grazed.</>,
        <>This growth needs actively dividing cells. Together, these cells form a {b("meristematic tissue")}.</>,
      ] },
      { t: "activity", title: "Activity: Onion roots in two jars", aim: "To find out where a root grows from.", steps: [
        "Fill two jars with water. Place one onion bulb in each jar.",
        "Let the roots grow for a few days. Measure their length each day.",
        "On day 3, cut about 1 cm off the root tips in Jar B only. Keep measuring both for more days.",
      ], observation: "Roots in Jar A keep growing. Roots in Jar B stop growing once the tips are cut.", conclusion: "Roots grow only from their tips. The tips have cells that divide again and again (you may recall seeing this cell division under a microscope)." },
      { t: "img", pic: { file: "root-growth-graph", alt: "Graph showing the length of onion roots over days for Jar A and Jar B", caption: "Jar A keeps growing; Jar B stops after its tip is cut" } },
      { t: "h", text: "Apical Meristem: Growing in Length" },
      { t: "img", pic: { file: "apical-meristem-location", alt: "A seedling showing the shoot apical meristem at the top and the root apical meristem at the tip of the root", caption: "Apical meristem at the shoot tip and the root tip" } },
      { t: "ul", items: [
        <>Growth zones at the {b("tips of roots and shoots")} are called {b("apical meristems")}. They make the plant grow in length.</>,
        <>Shoot tips also have actively dividing cells, just like root tips.</>,
      ] },
      { t: "h", text: "Lateral Meristem: Growing in Girth" },
      { t: "img", pic: { file: "tree-rings", alt: "The cut trunk of a tree showing ring-like patterns called annual growth rings", caption: "Annual growth rings in a tree trunk" } },
      { t: "ul", items: [
        <>A ring of actively dividing cells around the stem is the {b("lateral meristem")}. It adds new cells inside and outside, making the stem thicker.</>,
        <>This produces the ring-like patterns (annual rings) seen in a cut tree trunk. Wide rings mean good growth years, narrow rings mean poor ones.</>,
        <>Scientists count these rings to estimate a tree's age and the climate it grew in.</>,
      ] },
      { t: "h", text: "Intercalary Meristem: Growing Back After Being Cut" },
      { t: "imgs", pics: [
        { file: "new-branches", alt: "New branches growing from the nodes of a cut plant stem", caption: "New branches grow from the nodes after the stem tip is cut" },
        { file: "lawn-mowing", alt: "A man mowing a lawn with a lawn mower", caption: "Grass grows back after mowing" },
      ] },
      { t: "ul", items: [
        <>If the tip of a young stem is cut, the stem stops growing taller, but new branches grow from the {b("nodes")} (the points where leaves or branches arise).</>,
        <>The part of the stem between two nodes is the {b("internode")}. The {b("intercalary meristem")} sits at the base of the internode, just above the node.</>,
        <>This is why a trimmed hedge becomes bushy, and why grass and grazed plants grow back.</>,
      ] },
      { t: "svg", key: "meristem-loc", caption: "Where the three meristems are found" },
      { t: "facts", rows: [
        ["Apical meristem", "At root and shoot tips. Increases length"],
        ["Lateral meristem", "Around the stem. Increases girth (thickness)"],
        ["Intercalary meristem", "At the base of internodes. Lets plants regrow after cutting or grazing"],
      ] },
      { t: "card", title: "What meristem cells look like", body: [
        <>Meristematic cells are small, have {b("thin walls")}, a large prominent nucleus and dense cytoplasm packed with organelles.</>,
        <>They usually have {b("no vacuoles")} and are tightly packed with little space between them. This lets them divide fast and often.</>,
      ] },
    ],
  },
  {
    id: "differentiation",
    title: "4. Differentiation and Permanent Tissue",
    category: "Plant Tissues",
    heading: "Differentiation: From Dividing Cell to Fixed Job",
    sub: "New cells either keep dividing, or settle down to do one job for life.",
    blocks: [
      { t: "svg", key: "differentiation", caption: "Some new cells stay meristematic; others differentiate into permanent tissue" },
      { t: "ul", items: [
        <>Meristematic tissue keeps adding new cells to the plant body. Some new cells stay meristematic.</>,
        <>Others lose the ability to divide. They change shape and function and become {b("permanent tissue")}, specialised for one job such as support, transport or storage.</>,
        <>This process is called {b("differentiation")}.</>,
      ] },
      { t: "svg", key: "plant-map", caption: "Plant tissues: meristematic tissue differentiates into permanent tissue, simple or complex" },
      { t: "facts", rows: [
        ["Simple permanent tissue", "Made of only one kind of cell: parenchyma, collenchyma, sclerenchyma"],
        ["Complex permanent tissue", "Made of more than one kind of cell working together: xylem, phloem"],
      ] },
    ],
  },
  {
    id: "protecting-supporting",
    title: "5. Protecting and Supporting Tissues",
    category: "Plant Tissues",
    heading: "Protecting and Supporting Tissues in Plants",
    sub: "The outer skin, and three kinds of simple tissue that hold the plant up.",
    blocks: [
      { t: "img", pic: { file: "sunflower-stem-ts", alt: "A cross section of a sunflower stem showing epidermis, collenchyma, parenchyma, sclerenchyma, phloem, lateral meristem and xylem arranged in layers", caption: "Internal structure of a sunflower stem" } },
      { t: "h", text: "Epidermis: The Outer Cover" },
      { t: "ul", items: [
        <>The {b("epidermis")} forms the outermost layer of the plant, a tightly packed single layer of flat, rectangular cells. It protects the plant from injury, water loss, germs and harsh weather.</>,
        <>A waxy layer called {b("cuticle")} covers the epidermis. Plants in very dry places may have a thicker cuticle, to cut down water loss.</>,
        <>In roots, epidermal cells grow hair-like {b("root hairs")} that increase the surface area for taking up water and minerals.</>,
        <>In leaves, the epidermis has pores called {b("stomata")}. These let gases in and out, and let water vapour escape (transpiration).</>,
        <>Transpiration also helps pull water up through the xylem and helps remove waste from the plant.</>,
      ] },
      { t: "h", text: "Simple Permanent Tissues (Supporting Tissues)" },
      { t: "img", pic: { file: "permanent-tissues", alt: "Microscope views of parenchyma with thin walls, collenchyma with thick corners, and sclerenchyma with thick lignified walls", caption: "(a) Parenchyma (b) Collenchyma (c) Sclerenchyma" } },
      { t: "compare", left: "Tissue", right: "Structure and job", rows: [
        ["Parenchyma", "Living cells, thin walls, loosely packed with gaps between them. Stores food, does photosynthesis in green parts. In water plants, forms air spaces that help the plant float"],
        ["Collenchyma", "Living cells, unevenly thickened corners (from a flexible chemical called pectin). Gives support and flexibility, so stems and tendrils bend without breaking"],
        ["Sclerenchyma", "Mostly dead cells with thick, hard walls (from a chemical called lignin). Gives strength and forms the woody, hard parts: stems, leaf veins, coconut husk, walnut shell"],
      ] },
      { t: "remember", title: "Why some fibres are hard and some are soft", body: <>Coconut husk fibre is hard and brittle because it is made of {b("sclerenchyma")} (dead, thick-walled cells). A coriander leaf stalk is soft and flexible because it is made mostly of living {b("parenchyma")} and {b("collenchyma")} cells with thin or only slightly thickened walls.</> },
    ],
  },
  {
    id: "conducting",
    title: "6. Conducting Tissues: Xylem and Phloem",
    category: "Plant Tissues",
    heading: "Conducting Tissues: Xylem and Phloem",
    sub: "Two teams of cells, one carrying water up, the other carrying food both ways.",
    blocks: [
      { t: "card", title: "Complex permanent tissue", body: [
        <>{b("Xylem")} and {b("phloem")} are called {b("complex permanent tissues")} because each is made of several kinds of cells working as a team.</>,
      ] },
      { t: "img", pic: { file: "vascular-tissue", alt: "Xylem made of tracheids, vessels, xylem parenchyma and xylem fibres; phloem made of sieve tubes, companion cells, phloem parenchyma and phloem fibres", caption: "(a) Xylem (b) Phloem" } },
      { t: "facts", rows: [
        ["Xylem", "Carries water and minerals from roots to the rest of the plant. Also gives strength. Made of tracheids, vessels (tubular, thick-walled), xylem parenchyma (the only living part) and xylem fibres"],
        ["Phloem", "Carries food from leaves to the rest of the plant. Mostly living cells: long sieve tubes joined end to end, with companion cells that control the sieve tubes, phloem parenchyma (stores food, resin, tannins, latex) and phloem fibres (give strength)"],
      ] },
      { t: "svg", key: "stomata", caption: "Water evaporating out of the stomata pulls more water up through the xylem" },
      { t: "h", text: "Tissue Systems: Tissues Working in Groups" },
      { t: "ul", items: [
        <>Plant tissues do not work alone. They are organised into three {b("tissue systems")}.</>,
      ] },
      { t: "img", pic: { file: "tissue-systems", alt: "Three cross sections of a bean plant showing the dermal, ground and vascular tissue systems in root, stem and leaf", caption: "Tissue systems in a root, stem and leaf" } },
      { t: "facts", rows: [
        ["Dermal tissue system", "The outer covering. Protects the plant and cuts down water loss"],
        ["Ground tissue system", "The main body of the plant, between the dermal and vascular tissues. Includes parenchyma, collenchyma and sclerenchyma"],
        ["Vascular tissue system", "The conducting tissues: xylem and phloem"],
      ] },
    ],
  },
  {
    id: "totipotency",
    title: "7. One Cell, a Whole Plant: Totipotency",
    category: "Plant Tissues",
    heading: "From One Cell to an Organism: Totipotency",
    sub: "Some mature plant cells can go back to being unspecialised and grow an entire new plant.",
    blocks: [
      { t: "card", title: "Steward's carrot experiment (1958)", body: [
        <>F. C. Steward showed that even a single cell from the phloem of a carrot can regrow a whole plant. He was the first person to do this.</>,
        <>He grew carrot phloem cells in a nutrient medium with simple sugars and hormones. The cells divided into an unspecialised mass, which then divided and differentiated into a complete plant: roots, shoot and all.</>,
      ] },
      { t: "img", pic: { file: "carrot-regeneration", alt: "Steps showing a fragment of carrot phloem cultured in nutrient medium, dividing into single cells, forming an embryonic plant, then a plantlet, then an adult plant", caption: "Regeneration of a carrot plant from a single cell" } },
      { t: "ul", items: [
        <>The phloem cells first {b("dedifferentiated")}: they went back to being able to divide, forming an unspecialised mass of cells.</>,
        <>Grown with the right nutrients and growth chemicals, these cells then {b("redifferentiated")}: they divided and formed roots, shoot, and eventually a whole plant.</>,
        <>This ability of a mature cell to dedifferentiate, divide and redifferentiate into a new plant is called {b("totipotency")}. Such cells are {b("totipotent cells")}.</>,
        <>It is similar to how a zygote (fertilised egg) can divide and differentiate into a whole organism.</>,
      ] },
      { t: "h", text: "What Conditions Helped the Carrot Cells Grow Best?" },
      { t: "facts", rows: [
        ["Solid medium, with light, no air", "Growth was reduced"],
        ["Liquid medium, with light and air", "Growth increased by about 20 percent, the best result"],
        ["Liquid medium, with air, no light", "Growth was reduced"],
      ] },
      { t: "ul", items: [
        <>The best growth needed {b("both light and air")}, along with a {b("liquid")} nutrient medium. This suggests the cells, like normal plant cells, benefit from light (for making food) and air (for gas exchange), and a liquid medium probably lets nutrients and gases reach the cells more easily than a solid one.</>,
        <>Since this ability comes from being a {b("plant")} cell with a full set of genes and the flexibility to redifferentiate, we would not expect the exact same result if animal cells were used; most animal cells are not totipotent in this simple way.</>,
        <>Commercial uses: this idea is the basis of {b("plant tissue culture")}, used to grow many identical, disease-free plants quickly, and to conserve rare plant species.</>,
      ] },
      { t: "remember", title: "Crown gall disease and a useful lesson", body: <>A bacterium called {b("Agrobacterium tumefaciens")} causes tumour-like swellings on plant stems (crown gall disease) by making cells divide out of control. Scientists studied how this bacterium moves its genes into plant cells. That knowledge is now used in plant tissue culture and genetic engineering, to add useful genes to crops for better yield and disease resistance.</> },
      { t: "img", pic: { file: "crown-gall", alt: "A tumour-like swelling on a plant stem caused by crown gall disease", caption: "Crown gall disease on a plant stem" } },
    ],
  },
  {
    id: "epithelial",
    title: "8. Animal Tissue: Epithelial",
    category: "Animal Tissues",
    heading: "Epithelial Tissue: Covering and Lining",
    sub: "A thin, tightly packed sheet of cells with many different jobs.",
    blocks: [
      { t: "svg", key: "animal-map", caption: "Four kinds of animal tissue" },
      { t: "card", title: "Core Idea", body: [
        <>{b("Epithelial tissue")} forms the outer covering of the body (skin) and lines internal organs like the mouth, lungs, blood vessels and intestine.</>,
        <>Its cells are closely packed with very little space between them. This stops germs getting in, cuts down water loss, and still allows absorption, secretion and movement of substances.</>,
      ] },
      { t: "img", pic: { file: "epithelial-tissues", alt: "Five types of epithelial tissue: thin flat cells for exchange, many layered cells for protection, secretory cells, ciliated sensory cells, and tall cells for absorption", caption: "Types of epithelial tissue in different parts of the body" } },
      { t: "facts", rows: [
        ["Exchange (a)", "Single layer of thin, flat cells. In blood vessels and lungs, for fast diffusion of gases and liquids"],
        ["Protection (b)", "Many layers of flat, tightly packed cells. In skin, mouth and food pipe, to resist injury, friction and germs"],
        ["Secretion (c)", "Cells specialised to make and release substances. In salivary glands, sweat glands and the stomach lining"],
        ["Sensory (d)", "Receptor cells with hair-like cilia. In the nostrils, taste buds and inner ear, for smell, taste, sound and balance"],
        ["Absorption (e)", "Single layer of tall, pillar-like cells, often with hair-like structures. Lines the small intestine, for taking up nutrients and water"],
      ] },
      { t: "remember", title: "Why so thin?", body: <>A lining that is only one or a few cells thick lets substances move across it quickly. This quick exchange is exactly what gas exchange in the lungs, or absorption in the intestine, needs.</> },
    ],
  },
  {
    id: "connective",
    title: "9. Animal Tissue: Connective",
    category: "Animal Tissues",
    heading: "Connective Tissue: Connecting and Supporting",
    sub: "Blood, bone, cartilage, tendon and ligament all connect and support the body, in very different ways.",
    blocks: [
      { t: "card", title: "Core Idea", body: [
        <>A {b("connective tissue")} connects and supports other tissues of the body.</>,
        <>Blood and bone are both connective tissues, but blood is fluid and bone is hard. This difference comes from the {b("matrix")}: watery and jelly-like in blood, but hard and rigid in bone.</>,
      ] },
      { t: "img", pic: { file: "blood-components", alt: "Blood in a test tube showing plasma at 55 percent and formed elements platelets, WBCs and RBCs at 45 percent", caption: "Components of blood" } },
      { t: "facts", rows: [
        ["Red blood cells (RBCs)", "Give blood its red colour, from an iron-rich protein called haemoglobin. Live about 4 months and are replaced regularly"],
        ["White blood cells (WBCs)", "Collect at an infected area, causing redness, swelling and sometimes pus"],
        ["Platelets", "Help blood clot at the site of an injury"],
        ["Plasma", "The watery, liquid part of blood (about 55 percent of its volume)"],
      ] },
      { t: "ul", items: [
        <>Small cut: blood oozes out, then a clot forms. Skin infection: redness, swelling, maybe fever, because WBCs gather to fight it. Exercise: faster breathing and more blood flow, since muscles need more oxygen.</>,
      ] },
      { t: "img", pic: { file: "bone-types", alt: "A human skeleton showing the collar bone, a long bone and the kneecap", caption: "Types of bones" } },
      { t: "img", pic: { file: "joint-arrangement", alt: "A knee joint showing the tendon, cartilage and ligament", caption: "Arrangement of connective tissues at a joint" } },
      { t: "facts", rows: [
        ["Bone", "Hard, rigid matrix with calcium and phosphorus compounds. Gives strength, support and protection"],
        ["Cartilage", "Soft, jelly-like matrix. Gives flexibility and cushions the ends of bones for shock absorption"],
        ["Tendon", "Connects muscle to bone. Brings about movement"],
        ["Ligament", "Connects bone to bone. Gives stability, limits movement and helps prevent dislocation"],
      ] },
    ],
  },
  {
    id: "muscular",
    title: "10. Animal Tissue: Muscular",
    category: "Animal Tissues",
    heading: "Muscular Tissue: Making Movement Happen",
    sub: "Three kinds of muscle, for movements we control and movements that just happen.",
    blocks: [
      { t: "svg", key: "voluntary", caption: "Voluntary movements we choose; involuntary movements happen on their own" },
      { t: "img", pic: { file: "muscle-types", alt: "Skeletal muscle attached to the arm, smooth muscle in the intestine, and cardiac muscle in the heart", caption: "Different types of muscles" } },
      { t: "compare", left: "Muscle", right: "Structure and behaviour", rows: [
        ["Skeletal muscle", "Long, cylindrical, unbranched fibres with many nuclei and striped (striated) bands. Attached to the skeleton. Voluntary: running, writing, lifting"],
        ["Smooth muscle", "Spindle-shaped cells, one nucleus, no stripes. Found in the stomach and intestine. Involuntary, gives slow, continuous movement like digestion"],
        ["Cardiac muscle", "Cylindrical, branched fibres, one nucleus, faint stripes. Found only in the heart. Involuntary, works tirelessly and rhythmically without ever getting tired"],
      ] },
    ],
  },
  {
    id: "nervous",
    title: "11. Animal Tissue: Nervous",
    category: "Animal Tissues",
    heading: "Nervous Tissue: Sensing, Communicating and Responding",
    sub: "One kind of cell, built to carry messages fast, across the whole body.",
    blocks: [
      { t: "card", title: "Core Idea", body: [
        <>Pulling your hand away from something hot, or remembering an old song, are both the work of {b("nervous tissue")}, the body's control and coordination network.</>,
        <>The brain is the control centre. It coordinates activities, memory and responses. Muscles cannot work on their own; they follow instructions from nervous tissue.</>,
      ] },
      { t: "img", pic: { file: "neuron", alt: "The structure of a neuron showing the cell body, nucleus, dendrites, axon and axon terminals", caption: "Structure of a neuron" } },
      { t: "facts", rows: [
        ["Neuron (nerve cell)", "The cell of nervous tissue. Specialised to receive, process and transmit messages"],
        ["Cell body", "Contains the nucleus, controls the cell's activities"],
        ["Dendrites", "Receive signals from other neurons"],
        ["Axon", "A long fibre that carries the message away from the cell, ending at axon terminals which pass it on"],
      ] },
    ],
  },
  {
    id: "musculoskeletal",
    title: "12. The Musculoskeletal System",
    category: "Movement",
    heading: "The Musculoskeletal System",
    sub: "Bones, muscles, joints, cartilage, tendons and ligaments, working as one system.",
    blocks: [
      { t: "img", pic: { file: "musculoskeletal-system", alt: "The human musculoskeletal system showing muscles, bones, joints, cartilage, tendon and ligament", caption: "The musculoskeletal system in the human body" } },
      { t: "ul", items: [
        <>The {b("musculoskeletal system")} helps us stand upright, move, keep posture, and protect delicate organs.</>,
        <>It works under the control of the {b("nervous system")}.</>,
        <>Muscles are attached to bones by strong, flexible bands called {b("tendons")}. When a muscle contracts, the tendon carries this force to the bone, causing movement at a joint.</>,
        <>On average, the adult human skeleton makes up about {b("12 to 15 percent")} of body weight (it varies with age, sex and body build).</>,
      ] },
      { t: "activity", title: "Activity: Bone and muscle share of body weight", aim: "To estimate how much of your weight is bone and how much is muscle.", steps: [
        "Note your total body weight on a weighing scale.",
        "Find average bone and muscle mass percentages for your age and sex (roughly 12 to 15 percent bone for all adults; muscle is roughly 40 to 50 percent in adult males and 30 to 40 percent in adult females, though these numbers vary).",
        "Multiply your body weight by each percentage to estimate your bone weight and muscle weight.",
        "Compare your estimates with your classmates and find the class average.",
      ], observation: "Bone and muscle mass differ between people because of differences in age, sex, body build and fitness.", conclusion: "Both bone and muscle add to total body weight, but muscle usually makes up a bigger share than bone." },
    ],
  },
  {
    id: "joints",
    title: "13. Types of Joints",
    category: "Movement",
    heading: "Types of Joints",
    sub: "A joint is where two or more bones meet. Its shape decides how it can move.",
    blocks: [
      { t: "card", title: "What is a joint?", body: [
        <>A {b("joint")} is a junction between two or more bones. Joints allow movement, but they cannot move bones on their own. Muscles, pulling through tendons, do that.</>,
      ] },
      { t: "img", pic: { file: "joint-types", alt: "Four types of joints: fixed joint, pivot joint, ball and socket joint, and hinge joint", caption: "Types of joints" } },
      { t: "facts", rows: [
        ["Ball and socket joint", "Shoulder. A rounded bone end fits into a shallow hollow. Allows forward, backward, sideways and circular movement"],
        ["Hinge joint", "Elbow and knee. Bends and straightens in one direction only, like a door hinge. A kneecap protects the knee joint"],
        ["Pivot joint", "Neck (skull on the backbone). Lets the head turn side to side, like a doorknob turning in its socket"],
        ["Fixed joint", "Skull. The flat bones are joined so they cannot move at all, keeping the brain safe"],
      ] },
      { t: "ul", items: [
        <>Different body parts move differently because of the type of joint they have: the elbow only bends, the shoulder moves freely in many directions, the neck turns, and the skull does not move at all.</>,
      ] },
    ],
  },
  {
    id: "skeletal-system",
    title: "14. The Skeletal System",
    category: "Movement",
    heading: "The Skeletal System",
    sub: "A framework of bones that gives strength and protects the organs inside.",
    blocks: [
      { t: "ul", items: [
        <>The {b("skeletal system")} is a framework of bones. It gives strength and protects delicate internal organs. It includes the skull, the vertebral column and the rib cage.</>,
        <>The {b("vertebral column")} (backbone or spine) is a flexible column of small bones called {b("vertebrae")}. It supports the body and lets it stand upright.</>,
        <>Between each vertebra is a cushion of {b("cartilage")}, giving flexibility so we can bend and twist without hurting the spinal cord inside.</>,
        <>The {b("rib cage")} is formed by 12 pairs of ribs. It protects vital organs like the heart and lungs.</>,
        <>Ribs join the spine at the back and the breastbone (sternum) in front, through flexible cartilage. This flexibility lets the rib cage expand and contract during breathing, moving air in and out of the lungs.</>,
        <>An injury to the ribs can make breathing painful and difficult.</>,
      ] },
      { t: "remember", title: "Yoga and posture", body: <>Yoga (physical postures, breathing and meditation from ancient Indian tradition) is shown to improve flexibility, posture and breathing, reduce stress, and help prevent lifestyle diseases. Every year, 21 June is marked as International Yoga Day. Good posture, proper nutrition, regular exercise and yoga keep bones strong, muscles fit and joints flexible.</> },
    ],
  },
  {
    id: "mindmap",
    title: "15. Mind Map",
    category: "Revision",
    heading: "Mind Map",
    sub: "The whole topic on one page.",
    blocks: [
      { t: "svg", key: "mind", caption: "Mind map: tissues in action" },
      { t: "h", text: "Key Points at a Glance" },
      { t: "facts", rows: [
        ["Tissue", "A group of similar cells working together for one job"],
        ["Meristematic tissue", "Apical (length), lateral (girth), intercalary (regrowth). Keeps dividing"],
        ["Permanent tissue", "Formed by differentiation. Simple (one cell type) or complex (more than one type)"],
        ["Simple permanent", "Parenchyma (storage), collenchyma (flexible support), sclerenchyma (hard support)"],
        ["Complex permanent", "Xylem (water up), phloem (food, both ways)"],
        ["Animal tissues", "Epithelial (covers, lines), connective (connects, supports), muscular (movement), nervous (control)"],
        ["Joints", "Ball and socket (shoulder), hinge (elbow, knee), pivot (neck), fixed (skull)"],
      ] },
    ],
  },
  {
    id: "competitive-1",
    title: "16. Competitive Corner: Ideas",
    category: "Advanced",
    heading: "Competitive Corner",
    sub: "The main topic is enough for school exams. These ideas take you one step further.",
    blocks: [
      { t: "card", title: "More on Meristem and Growth", body: [
        <>{b("Stem cells")} in bone marrow can divide and make new blood cells throughout life. In a bone marrow transplant, stem cells from a healthy donor are given to patients with blood disorders such as leukaemia or thalassaemia.</>,
        <>In young stems, the outer layer is a single-layered epidermis. As the plant ages, some cells below the epidermis become a lateral meristem called the {b("cork cambium")}. It produces dead, tightly packed cork cells that are impermeable to water and gases, forming the {b("bark")} of a tree.</>,
      ] },
      { t: "card", title: "More on Xylem, Phloem and Movement", body: [
        <>Water moves up dead xylem cells mainly through {b("transpiration pull")}: water vapour escaping from leaf stomata creates a suction that pulls the whole water column upward, like sipping through a straw.</>,
        <>Phloem transport needs {b("living cells")} and energy, since companion cells actively load and unload sugars into the sieve tubes.</>,
      ] },
      { t: "card", title: "More on Animal Tissue", body: [
        <>Cartilage exists in a few forms: the flexible kind cushioning joints, and tougher, more fibrous kinds elsewhere in the body (such as between spinal discs).</>,
        <>Neurons come in different roles: {b("sensory neurons")} carry messages from receptors to the brain or spinal cord, {b("motor neurons")} carry messages to muscles, and {b("relay (connector) neurons")} connect the two inside the brain and spinal cord.</>,
        <>A {b("reflex action")}, like pulling a hand away from something hot, uses a short path called a {b("reflex arc")}, which reacts faster than a message sent all the way to the brain and back.</>,
      ] },
      { t: "facts", rows: [
        ["Uncontrolled cell division", "Crown gall disease in plants and cancer/tumour growth in animals both involve cells dividing without proper control"],
        ["Osteoporosis and arthritis", "Osteoporosis makes bones weak and brittle; arthritis causes painful, stiff joints, often as cartilage wears down"],
        ["Tissue culture uses", "Growing disease-free plants quickly, producing many identical copies (clones), and conserving rare or endangered plant species"],
        ["Bone remodelling", "Bone tissue keeps being broken down and rebuilt throughout life, helped by minerals like calcium and phosphorus"],
        ["Companion cells", "Named because they sit right beside the sieve tube cells they support and control"],
        ["Cork vs cork cambium", "Cork is the dead protective layer; cork cambium is the living meristem that keeps producing it"],
      ] },
      { t: "remember", title: "Exam traps", body: <>(1) Meristematic tissue divides; permanent tissue does not. (2) Xylem cells that transport water are mostly dead; phloem cells that transport food are mostly alive. (3) Cartilage cushions and cushions joints; it is not the same as bone. (4) A tendon joins muscle to bone; a ligament joins bone to bone. (5) Voluntary movement uses skeletal muscle; involuntary movement uses smooth or cardiac muscle.</> },
    ],
  },
  {
    id: "competitive-2",
    title: "17. Competitive Corner: Solved",
    category: "Advanced",
    heading: "Solved Practice Questions",
    sub: "Try each one on paper first. Then check.",
    blocks: [
      { t: "exq", n: 1, q: "Which tissue in a plant is most like nervous tissue in an animal, in terms of its role (not its structure)?", a: "None of the plant tissues is built like nervous tissue, but hormones carried in xylem and phloem act a little like a slow signalling system, coordinating growth and responses across the plant. Plants do not have a nervous system like animals do." },
      { t: "exq", n: 2, q: "Why do tendons need to be tough, rope-like tissue rather than soft and stretchy like some other connective tissue?", a: "A tendon must transmit the pulling force of a contracting muscle to a bone efficiently. If it stretched too much, force would be lost and movement would become sluggish or imprecise." },
      { t: "exq", n: 3, q: "A doctor wants to know whether a patient's joint problem is in the bone, the cartilage or the ligaments. Why does this matter for treatment?", a: "These are different connective tissues with different jobs: bone is hard and load-bearing, cartilage cushions and reduces friction, and ligaments hold bones together and limit movement. Each needs a different kind of care or treatment, so identifying which one is affected matters." },
      { t: "exq", n: 4, q: "Two plant cuttings are taken from the same plant. One is treated with rooting hormone before planting, and roots faster than the untreated one. Which meristem is being encouraged to act, and why might a hormone help?", a: "Rooting hormone encourages the cutting's cells near the cut end to form a new apical meristem in the root, restarting active cell division there. The hormone signals nearby cells to dedifferentiate and start dividing, similar to the idea used in tissue culture." },
      { t: "exq", n: 5, q: "A tall, old tree and a young sapling are both cut down. Which one would show more annual rings, and what property of the tree does this reflect?", a: "The old tree would show more rings, since one ring generally forms per year of active lateral meristem growth. This reflects the age of the tree and its year-by-year growing conditions." },
      { t: "exq", n: 6, q: "Why might a broken bone heal (given enough time), while damaged cartilage often heals slowly or poorly?", a: "Bone has a good blood supply, bringing nutrients, oxygen and repair cells to the site. Cartilage has little or no direct blood supply, so nutrients reach it more slowly, and it repairs itself much more slowly." },
    ],
  },
  {
    id: "complete",
    title: "18. Topic Complete",
    category: "Complete",
    heading: "Topic Complete",
    sub: "Well done. Check what you can now do.",
    blocks: [
      { t: "done", items: [
        "I can explain the levels of organisation from cell to organism, and what division of labour means.",
        "I can explain why plant and animal tissues are built differently.",
        "I can name the three meristematic tissues and what each does.",
        "I can explain differentiation, and tell simple from complex permanent tissue.",
        "I can describe epidermis, parenchyma, collenchyma and sclerenchyma, with an example each.",
        "I can describe xylem and phloem, and the three plant tissue systems.",
        "I can explain totipotency using the carrot experiment.",
        "I can name and describe the four animal tissues: epithelial, connective, muscular and nervous.",
        "I can explain voluntary and involuntary movement, and name the four types of joints.",
      ] },
      { t: "facts", rows: [
        ["Meristematic tissue", "Apical, lateral, intercalary"],
        ["Simple permanent", "Parenchyma, collenchyma, sclerenchyma"],
        ["Complex permanent", "Xylem, phloem"],
        ["Animal tissues", "Epithelial, connective, muscular, nervous"],
        ["Joints", "Ball and socket, hinge, pivot, fixed"],
      ] },
      { t: "remember", title: "What to do next", body: <>Go to the Question Bank for practice. Then take the Self Assessment quiz to check how well you know the topic. If you make mistakes, come back to the topic and read it again.</> },
    ],
  },
];

const ICONS: Record<string, React.ElementType> = { Organisation: Network, "Plant Tissues": Sprout, "Animal Tissues": Layers, Movement: Bone, Revision: Network, Advanced: Award, Complete: Trophy };

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#0a1f14] border border-green-500/15 p-5 rounded-2xl space-y-3 shadow-md">
    <div className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-green-400" /><h3 className="text-sm font-black uppercase tracking-wider text-green-300 font-mono">{title}</h3></div>
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

function renderSvg(key: SvgKey) {
  switch (key) {
    case "levels": return <OrganisationLevelsDiagram />;
    case "meristem-loc": return <MeristemLocationsDiagram />;
    case "differentiation": return <DifferentiationDiagram />;
    case "plant-map": return <PlantTissueMapDiagram />;
    case "stomata": return <StomataTranspirationDiagram />;
    case "animal-map": return <AnimalTissueMapDiagram />;
    case "voluntary": return <VoluntaryInvoluntaryDiagram />;
    case "mind": return <JointMovementMindMap />;
  }
}

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
        <div className={`rounded-2xl border p-3 shadow-lg bg-white overflow-x-auto ${isLightMode ? "border-slate-200" : "border-slate-700"}`}>
          <div className={block.key === "mind" ? "min-w-[640px]" : ""}>{renderSvg(block.key)}</div>
        </div>
        <figcaption className="text-center text-[13px] font-bold text-slate-500">{block.caption}</figcaption>
      </figure>
    );
    case "activity": return (
      <div key={i} className={`rounded-2xl border p-5 space-y-4 shadow-md ${isLightMode ? "bg-white border-slate-200" : "bg-[#0a1f14] border-green-500/15"}`}>
        <div className="flex items-start gap-2.5"><FlaskConical className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /><h3 className="text-base font-black leading-snug">{block.title}</h3></div>
        <p className="text-sm font-semibold leading-relaxed"><span className="text-green-400 font-black">Aim: </span>{block.aim}</p>
        <SectionHeading>Steps</SectionHeading>
        <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">{block.steps.map((s, j) => <li key={j}>{s}</li>)}</ol>
        <RememberBox title="What you see">{block.observation}</RememberBox>
        <RememberBox title="What it shows">{block.conclusion}</RememberBox>
      </div>
    );
    case "done": return (
      <div key={i} className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3">
        <div className="flex items-center gap-2"><Trophy className="w-6 h-6 text-emerald-400" /><h3 className="text-base font-black text-emerald-300">You have finished Tissues in Action</h3></div>
        <ul className="space-y-2">
          {block.items.map((it, j) => (
            <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed"><span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-500 text-slate-950 text-[12px] font-black flex items-center justify-center">✓</span><span>{it}</span></li>
          ))}
        </ul>
      </div>
    );
  }
}

interface LearnTissues9Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

export function LearnTissues9({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnTissues9Props) {
  const [activeId, setActiveId] = useState<string>(TOPICS[0].id);
  const idx = Math.max(0, TOPICS.findIndex((t) => t.id === activeId));
  const topic = TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-tissues9-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <select value={activeId} onChange={(e) => setActiveId(e.target.value)} className={`w-full min-w-0 rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
          {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><Sprout className="w-5 h-5 text-green-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>Tissues in Action</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Plant and animal tissues, and how their structure suits their function.</p>
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

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-tissues9-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-tissues9-main p, #learn-tissues9-main li, #learn-tissues9-main span, #learn-tissues9-main label, #learn-tissues9-main div:not(.bg-gradient-to-r) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-tissues9-main b, #learn-tissues9-main strong, #learn-tissues9-main h1, #learn-tissues9-main h2, #learn-tissues9-main h3, #learn-tissues9-main h4, #learn-tissues9-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          ${isLightMode ? `#learn-tissues9-container .bg-slate-900, #learn-tissues9-container .bg-\\[\\#0d1424\\], #learn-tissues9-container .bg-\\[\\#0a1a1f\\], #learn-tissues9-container .bg-slate-950 { background-color: #ffffff !important; border-color: #cbd5e1 !important; } #learn-tissues9-container .border-slate-800 { border-color: #cbd5e1 !important; }` : ""}
        ` }} />
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <span className="text-[12px] font-black uppercase tracking-widest font-mono text-green-400 flex items-center gap-1.5">{React.createElement(ICONS[topic.category] || Lightbulb, { className: "w-3.5 h-3.5" })}{topic.category}</span>
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
                  <button onClick={onGoToSelfAssessment} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-slate-950 font-black text-[14px] cursor-pointer shadow-md border border-green-400/30 shrink-0">Take Self Assessment Quiz<Award className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
