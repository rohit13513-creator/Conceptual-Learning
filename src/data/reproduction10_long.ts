import type { LongQuestion, CompetencyQuestion } from "../types-custom";

// ── LONG ANSWER QUESTIONS (5 marks each) ──
export const REPRO10_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Why is DNA copying essential for reproduction? Explain how copying of DNA leads to variation and why variation is important for the survival of a species.",
    markingScheme: ["Role of DNA and its copying in reproduction (with the need for an accompanying cellular apparatus) -- 1 mark", "Variation arises because DNA copying is never perfectly accurate -- 1 mark", "Importance of variation for survival of the species with a suitable example -- 2 marks", "Variation is not necessarily useful to the individual but to the species as a whole -- 1 mark"],
    answerParts: [
      { part: "Why DNA copying is essential", text: "The nucleus of a cell contains DNA (the hereditary material) that carries the information for making proteins, which decide the body design and characteristics of an organism. Reproduction creates new individuals with a similar body design, so the basic event in reproduction is the creation of a copy of the DNA. Cells use chemical reactions to build copies of their DNA. The copies must then be separated into two cells. Simply pushing out one DNA copy will not work, because the new cell would lack the cellular apparatus needed to carry out life processes. So DNA copying is always accompanied by the creation of additional cellular apparatus, and only then does the cell divide into two." },
      { part: "How variation arises", text: "No biochemical reaction is absolutely reliable. Therefore, some inaccuracy creeps in every time DNA is copied, and the new DNA copy differs slightly from the original. Many such variations are small and do not stop the cell from working, so the new cells are similar to the original but show small differences. Some variations may be so drastic that the new cell cannot survive. In sexual reproduction, the combining of DNA from two different individuals adds further new combinations, so variations build up over generations." },
      { part: "Importance of variation for the species", text: "Populations occupy particular niches in an ecosystem. Niches can change because of factors such as a rise in temperature, a change in water level or a drought. If the population has no variation and is adapted only to the old niche, the entire population may be wiped out. If some individuals have variations that suit the new conditions, they survive and continue the species." },
      { part: "Example", text: "Consider bacteria living in cold water. If global warming raises the temperature of the water, most bacteria die. A few bacteria that have a variation making them heat-tolerant survive and multiply. Hence variation ensures survival of the species even when it does not benefit every individual." },
      { part: "Conclusion", text: "Variations may not always be useful to the individual, but they are the raw material that enables a population to survive changing environments. Reproduction with more variation therefore gives a species a better chance of surviving over time." }
    ]
  },
  {
    id: 2,
    question: "Draw a labelled diagram to show binary fission in Amoeba. Describe the process and explain how binary fission in Leishmania differs from that in Amoeba.",
    markingScheme: ["Diagram of stages of binary fission in Amoeba with correct labels -- 2 marks", "Steps of binary fission in Amoeba -- 1 mark", "Binary fission in Leishmania with its orientation feature -- 1 mark", "Definition and significance of binary fission -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "Binary fission is a mode of asexual reproduction in which a single-celled organism divides into two equal daughter individuals, each getting a copy of the nucleus." },
      { part: "Labelled parts (Amoeba, stage by stage)", text: "Stage 1 - Parent Amoeba: cell membrane (outer boundary), cytoplasm (site of life processes), pseudopodia (finger-like projections used for movement and food capture), nucleus (holds DNA and controls the cell). Stage 2 - Nucleus elongates and divides into two daughter nuclei (division of the nucleus). Stage 3 - Constriction: the cell membrane and cytoplasm pinch in the middle, dividing the cytoplasm between the two nuclei. Stage 4 - Two daughter Amoebae, each with its own nucleus, cytoplasm and pseudopodia." },
      { part: "Steps in Amoeba", text: "The nucleus first divides into two. A constriction then appears in the cell, and the cytoplasm divides so that each part receives one nucleus. The cell splits into two small Amoebae, which grow to full size. The division can take place in any plane, because Amoeba has an irregular shape with no fixed body axis." },
      { part: "Binary fission in Leishmania", text: "Leishmania (the parasite causing kala-azar) has a whip-like flagellum at one end of its cell. Here, binary fission occurs in a definite orientation in relation to this flagellum, that is, the cell splits lengthwise along a fixed plane connected with the flagellar end. This is different from Amoeba, where the division can occur in any plane." },
      { part: "Significance", text: "It is a quick way of multiplying. The daughter cells are genetically almost identical to the parent, with only small variations caused by DNA copying errors. Other organisms such as Paramecium and bacteria also multiply by binary fission." }
    ]
  },
  {
    id: 3,
    question: "What is multiple fission? Describe multiple fission in Plasmodium and state how it differs from binary fission. Why is Plasmodium able to multiply so rapidly inside the human body?",
    markingScheme: ["Definition of multiple fission -- 1 mark", "Description of the process in Plasmodium (cyst, nucleus divides repeatedly, cytoplasm cuts around each nucleus) -- 2 marks", "Two differences from binary fission -- 1 mark", "Reason for rapid multiplication and its consequence -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "Multiple fission is a type of asexual reproduction in which a single-celled organism divides into many daughter cells at the same time." },
      { part: "Process in Plasmodium", text: "Plasmodium, the malaria parasite, enters the red blood cells (and liver cells) of a human. Inside it, the parasite withdraws into a protective covering called a cyst. The nucleus divides repeatedly to form many nuclei without the cytoplasm dividing. Then the cytoplasm cuts around each nucleus, forming many small daughter cells. When the cyst wall or host cell bursts, the many daughter cells are released together." },
      { part: "Difference from binary fission", text: "In binary fission one parent cell divides into two daughters, whereas in multiple fission one parent forms many daughters at once. In multiple fission, the organism usually first forms a protective cyst and the nucleus divides many times before the cytoplasm divides; in binary fission the nucleus divides once and the cytoplasm follows immediately. Multiple fission is also commonly triggered by unfavourable conditions, and helps in survival as well as multiplication." },
      { part: "Rapid multiplication and effect", text: "Because one parasite produces many new parasites in a single division, the number of parasites in the blood rises very quickly. The infected red blood cells burst releasing the young parasites, which infect fresh red blood cells. This causes the periodic chills and fever typical of malaria." }
    ]
  },
  {
    id: 4,
    question: "Draw a labelled diagram of budding in Hydra. Describe the process of budding in Hydra and in yeast. How is budding different from fragmentation?",
    markingScheme: ["Correctly labelled diagram of Hydra with a bud -- 2 marks", "Process of budding in Hydra -- 1 mark", "Budding in yeast -- 1 mark", "Difference from fragmentation -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "Budding is a mode of asexual reproduction in which a new individual develops as an outgrowth (bud) on the body of the parent and later detaches to live independently." },
      { part: "Labelled parts (Hydra with a bud)", text: "Mouth and tentacles: the tentacles capture food and pass it to the mouth. Body wall (column): the tube-like body of the parent, made of two cell layers. Bud: a small outgrowth on the body of the parent, which contains a copy of parent cells. Young Hydra (mature bud): a miniature Hydra developing its own tentacles and mouth, still attached to the parent. Point of detachment: the place where the fully grown bud separates from the parent. Regenerative cells: the special cells at the site of the bud that divide repeatedly to form the bud." },
      { part: "Process in Hydra", text: "Regenerative cells at a specific site divide repeatedly, so a small outgrowth called a bud forms. The bud grows, develops a mouth and tentacles and becomes a miniature Hydra. Finally it detaches from the parent body and lives as a new, independent Hydra." },
      { part: "Budding in yeast", text: "Yeast is a single-celled fungus. Under favourable conditions (warm place, sugar solution) a small outgrowth appears on the parent cell. The nucleus divides, one nucleus moves into the bud, and the bud grows and separates as a new yeast cell. Sometimes buds remain attached and form chains before separating." },
      { part: "Difference from fragmentation", text: "In budding, a new individual arises as an outgrowth at a specific spot, while the parent body remains intact. In fragmentation, the parent body breaks into two or more pieces and each piece grows into a complete organism (for example Spirogyra)." }
    ]
  },
  {
    id: 5,
    question: "Explain regeneration and fragmentation with examples. How does regeneration in Planaria differ from reproduction? Why can regeneration not be considered the usual mode of reproduction in most organisms?",
    markingScheme: ["Definition of regeneration with the role of specialised cells -- 1 mark", "Regeneration in Planaria and Hydra with the sequence of cell proliferation and differentiation -- 2 marks", "Fragmentation with example (Spirogyra) -- 1 mark", "Difference between regeneration and reproduction -- 1 mark"],
    answerParts: [
      { part: "Definition of regeneration", text: "Many fully differentiated organisms can give rise to new individuals from their body parts. If such an organism is cut or broken into pieces, each piece can grow into a separate individual. This ability to grow back lost body parts, or a whole organism from a piece, is called regeneration. It is carried out by specialised cells." },
      { part: "Regeneration in Planaria and Hydra", text: "When a flatworm such as Planaria or a Hydra is cut into pieces, each piece can grow into a complete organism. The specialised cells at the cut region divide repeatedly to form a large mass of new cells (cell proliferation). Different cells in this mass then change (differentiate) into the different cell types and tissues in an organised sequence, and the missing parts are formed." },
      { part: "Fragmentation", text: "In fragmentation a multicellular organism breaks into several pieces on maturation, and each piece grows into a new individual. Example: Spirogyra, a filamentous green alga of pond water, breaks into fragments, each of which develops into a new filament. The new individuals are genetically identical to the parent." },
      { part: "Regeneration versus reproduction", text: "Regeneration is a repair and recovery process that occurs when a body is damaged or cut. Reproduction is the normal process by which organisms produce offspring. Most organisms do not depend on being cut into pieces in order to reproduce; Hydra normally reproduces by budding. Also, regeneration is a limited ability: the more complex an organism, the fewer parts it can regenerate, since complex organisms have highly specialised cells and tissues and cannot rebuild the whole body from any piece. Hence regeneration is not the usual mode of reproduction." }
    ]
  },
  {
    id: 6,
    question: "Draw a labelled diagram of Rhizopus showing spore formation. Explain how spore formation helps in the multiplication and survival of Rhizopus and state the conditions in which it grows best.",
    markingScheme: ["Correctly labelled diagram of Rhizopus (hyphae, sporangium, spores, stalk) -- 2 marks", "Process of spore formation and dispersal -- 1 mark", "Role of the thick protective wall in survival -- 1 mark", "Conditions for growth and germination of spores -- 1 mark"],
    answerParts: [
      { part: "Labelled parts", text: "Hyphae: thread-like structures that spread over the bread; they absorb nutrients and are not involved in reproduction. Sporangiophore (stalk): an upright hypha that carries the sporangium. Sporangium: the round, blob-like sac at the tip of the stalk that contains the spores; when mature it bursts. Spores: tiny reproductive cells inside the sporangium, surrounded by thick protective walls; each can grow into a new Rhizopus. Rhizoids: root-like hyphae going into the food (bread), which anchor the mould and absorb food." },
      { part: "Process of spore formation", text: "The vertical hyphae bear sporangia at their tips. Inside each sporangium, hundreds of spores are formed. On maturity, the sporangium bursts and releases the spores into the air. Being tiny and light, the spores are carried by air currents to new places. When a spore lands on a moist, food-rich surface, it germinates and grows into a new Rhizopus." },
      { part: "Role of protective wall", text: "Spores are covered by a thick wall that protects them from adverse conditions such as dryness and heat. The spore stays dormant, without growth, until it reaches a suitable moist place. This makes spore formation an effective means of survival as well as multiplication." },
      { part: "Conditions for growth", text: "Rhizopus (bread mould) grows best on a slice of bread kept in a cool, moist and dark place, where the spores germinate and quickly produce hyphae. On a dry slice, the spores do not germinate." },
      { part: "Significance", text: "Large numbers of offspring are produced quickly and without a partner. It is an asexual process and the new moulds are genetically similar to the parent." }
    ]
  },
  {
    id: 7,
    question: "What is vegetative propagation? Describe natural vegetative propagation with examples of leaf, stem and root. State three advantages of vegetative propagation.",
    markingScheme: ["Definition of vegetative propagation -- 1 mark", "Natural vegetative propagation by leaves (Bryophyllum) -- 1 mark", "Natural propagation by stem (potato, ginger, etc.) and by roots -- 2 marks", "Three advantages -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "Vegetative propagation is a mode of asexual reproduction in plants in which a new plant is obtained from the vegetative parts of the parent plant, namely the root, stem or leaf, without the involvement of seeds or gametes." },
      { part: "By leaves", text: "In Bryophyllum, buds are produced in the notches along the margin of the leaf. When the leaf falls on damp soil, these buds develop into tiny new plants with roots and shoots. Begonia is another example." },
      { part: "By stem", text: "In potato, the tuber has 'eyes' which are buds. Each eye can grow into a new plant when planted in the soil. Ginger (rhizome), onion (bulb) and grass (runners) also reproduce through underground or creeping stems. New shoots and roots come out from the nodes, and this lets the plant spread." },
      { part: "By roots", text: "In sweet potato and dahlia, the fleshy roots bear buds that can grow into new plants. In some plants, buds also arise on roots (adventitious buds) that develop into new shoots." },
      { part: "Advantages", text: "1. Plants that have lost the ability to produce viable seeds (banana, orange, rose, jasmine) can be propagated. 2. Plants raised this way bear flowers and fruits earlier than those grown from seeds. 3. All the plants are genetically identical to the parent, so the desirable characteristics of the parent are retained. Also, it is quicker and needs no pollination or fertilisation." }
    ]
  },
  {
    id: 8,
    question: "Describe the four methods of artificial vegetative propagation - cutting, layering, grafting and tissue culture - with one example each. Why are these methods used by gardeners and farmers?",
    markingScheme: ["Cutting with example -- 1 mark", "Layering with example -- 1 mark", "Grafting (scion and stock) with example -- 1 mark", "Tissue culture in brief with example -- 1 mark", "Why these methods are used -- 1 mark"],
    answerParts: [
      { part: "Cutting", text: "A healthy young branch with a few nodes and internodes is cut, most leaves are removed and the cut end is planted in moist soil. Roots develop from the nodes and a new plant grows. Examples: rose, sugarcane, money plant." },
      { part: "Layering", text: "A branch of a plant is bent down and part of it is covered with soil, while the tip remains above ground. Roots form on the buried portion while it is still attached to the parent plant. The branch is then cut off and grows as a new plant. Examples: jasmine, mint, rose (also occurs naturally)." },
      { part: "Grafting", text: "The stem or branch of one plant with buds, called the scion, is attached to the rooted stem of another plant, called the stock. The cut surfaces are tied firmly so that their vascular tissues join, and the scion grows on the stock. Examples: mango, apple, lemon and orange. Plants of closely related types are grafted so that desirable characters of both can be combined." },
      { part: "Tissue culture", text: "A small piece of tissue (or a few cells) is taken from the growing tip of a plant and grown on an artificial nutrient medium under sterile conditions. It forms an undifferentiated mass called callus. The callus is transferred to a medium with hormones to form roots and shoots, and the small plantlets are planted in soil. Examples: banana, orchids, ornamental plants." },
      { part: "Why used", text: "These methods give plants that are genetically identical to the parent, retain the good qualities, produce fruit sooner, allow propagation of seedless plants and, in tissue culture, many plants can be produced from a small piece of parent tissue in a small space in a short time, and free of disease." }
    ]
  },
  {
    id: 9,
    question: "Explain the technique of tissue culture, with the help of a flow of steps. State its advantages and any two applications.",
    markingScheme: ["Definition of tissue culture -- 1 mark", "Steps: selection of explant, culture medium, callus, hormones for differentiation, transfer to soil -- 2 marks", "Advantages -- 1 mark", "Two applications with examples -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "Tissue culture is a technique in which cells or a small piece of tissue from a plant are grown in an artificial, sterile nutrient medium, to produce new plants. It is also called micropropagation." },
      { part: "Steps", text: "Step 1: A small piece of tissue (explant), often from the growing tip of the plant, is cut from the parent. Step 2: It is placed in a sterile culture medium containing nutrients and plant hormones. Step 3: The cells divide to form an unorganised mass of cells called callus. Step 4: The callus is transferred to another medium containing hormones which induce differentiation into roots and shoots (plantlets). Step 5: The plantlets are transferred to pots or soil, where they grow into mature plants." },
      { part: "Advantages", text: "A large number of plants can be produced in a small space from a tiny piece of tissue, in a short time and throughout the year. All plants are identical to the parent. Disease-free plants can be produced because the growing tip is often free of pathogens. Plants which do not produce viable seeds can be multiplied." },
      { part: "Applications", text: "It is widely used to raise ornamental plants and orchids and for propagation of crops such as banana, sugarcane and potato. It is also used to conserve rare and endangered plant species." }
    ]
  },
  {
    id: 10,
    question: "Distinguish between asexual and sexual reproduction on the basis of five points. Which of the two gives greater variation and why is that important?",
    markingScheme: ["Any four correct points of difference (1 mark each, in tabular or paragraph form) -- 4 marks", "Sexual reproduction gives greater variation, with the reason and its importance -- 1 mark"],
    answerParts: [
      { part: "Number of parents", text: "Asexual reproduction: a single parent is involved. Sexual reproduction: two parents (male and female) are usually involved." },
      { part: "Gametes and fertilisation", text: "Asexual: no gametes are formed and there is no fertilisation. Sexual: male and female gametes are formed and fuse (fertilisation) to form a zygote." },
      { part: "Genetic similarity and variation", text: "Asexual: the offspring are genetically almost identical to the parent (only minor variations from DNA copying errors). Sexual: the offspring show considerable variation because DNA from two different individuals combines." },
      { part: "Cell division and type", text: "Asexual: takes place by ordinary cell division only; modes include fission, budding, fragmentation, regeneration, spore formation and vegetative propagation. Sexual: involves formation of germ cells with half the DNA, so that on fusion the normal amount of DNA is restored." },
      { part: "Speed, energy and time", text: "Asexual: rapid, needs less time and energy, and large numbers of offspring can be produced. Sexual: comparatively slow, needs more time and energy, and requires finding a mate; fewer offspring are produced per event." },
      { part: "Variation and its importance", text: "Sexual reproduction gives greater variation because germ cells of two different individuals, each with its own combination of DNA, fuse, giving a new combination in each offspring. This is important because if the environment changes, some individuals with suitable variations will survive, which helps the species to survive over time." }
    ]
  },
  {
    id: 11,
    question: "Draw a labelled diagram of the longitudinal section of a bisexual flower and write the function of each part.",
    markingScheme: ["Neat, correctly proportioned diagram -- 1 mark", "At least eight correct labels -- 2 marks", "Functions of the parts, at least six -- 2 marks"],
    answerParts: [
      { part: "Labelled parts with functions", text: "Sepals: green leaf-like parts beneath the petals (together the calyx); they protect the flower in the bud stage and support the flower. Petals: the brightly coloured parts (together the corolla); they attract insects and birds for pollination and protect the inner parts. Stamen (male reproductive part): consists of the anther and filament. Anther: the upper part of the stamen, which produces the pollen grains that carry the male germ cells (male gametes). Filament: the stalk that holds the anther up and helps it release pollen. Carpel or pistil (female reproductive part): consists of the stigma, style and ovary. Stigma: the sticky top of the carpel that receives pollen. Style: the tube-like part that connects the stigma to the ovary; the pollen tube grows through it. Ovary: the swollen basal part which contains the ovules; after fertilisation it develops into the fruit. Ovule: located inside the ovary and contains the egg cell (female gamete); after fertilisation it forms the seed. Thalamus (receptacle): the base of the flower on which all the parts are attached." },
      { part: "Bisexual and unisexual flowers", text: "A flower having both stamens and carpel is bisexual (for example hibiscus and mustard). A flower having only stamens or only carpels is unisexual (for example papaya and watermelon)." },
      { part: "Significance", text: "The flower is the reproductive organ of angiosperms. The stamens and carpels contain the germ cells, and after fertilisation the ovule becomes the seed and the ovary becomes the fruit." }
    ]
  },
  {
    id: 12,
    question: "What is pollination? Explain the types of pollination and the agents that bring it about. How does a pollen grain reach the ovule after landing on the stigma?",
    markingScheme: ["Definition of pollination -- 1 mark", "Self and cross pollination with the difference/significance -- 2 marks", "Agents of pollination with adaptations -- 1 mark", "Growth of the pollen tube to the ovule -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "Pollination is the transfer of pollen from the anther of a stamen to the stigma of a carpel. It must take place before fertilisation." },
      { part: "Self-pollination", text: "Transfer of pollen from the anther to the stigma of the same flower or of another flower on the same plant. It does not need an external agent to be effective, assures seed formation, but gives little variation. Examples: pea, tomato." },
      { part: "Cross-pollination", text: "Transfer of pollen from the anther of a flower to the stigma of a flower on a different plant of the same species. It brings variation, and the offspring are often healthier and better adapted. Examples: sunflower, apple, papaya (unisexual flowers must be cross-pollinated)." },
      { part: "Agents of pollination", text: "Wind: dry, light pollen produced in large amounts (for example maize). Water: in some aquatic plants. Insects (bees, butterflies): brightly coloured, scented flowers with nectar attract them, and they carry the pollen sticking to their bodies. Birds and other animals also transfer pollen while feeding." },
      { part: "Pollen tube", text: "After pollen lands on a suitable stigma, the pollen grain germinates and a pollen tube grows out. It travels through the style to reach the ovary and enters the ovule, where it releases the male germ cells so that they fuse with the female germ cell (egg)." }
    ]
  },
  {
    id: 13,
    question: "Describe fertilisation in a flowering plant, including double fertilisation. What changes take place in the flower after fertilisation?",
    markingScheme: ["Pollen tube growth carrying two male gametes into the embryo sac -- 1 mark", "Syngamy (formation of zygote) -- 1 mark", "Triple fusion and formation of endosperm -- 1 mark", "Post-fertilisation changes: ovule, ovary, zygote -- 1 mark", "Fate of the other floral parts and significance -- 1 mark"],
    answerParts: [
      { part: "Pollen tube and male gametes", text: "The pollen grain on the stigma produces a pollen tube which grows through the style to the ovule. The pollen tube carries two male gametes (sperm cells) and releases them into the embryo sac inside the ovule." },
      { part: "Syngamy", text: "One male gamete fuses with the egg cell (the female gamete) in the embryo sac. This forms a diploid zygote, which develops into the embryo." },
      { part: "Triple fusion", text: "The second male gamete fuses with the two polar nuclei present in the central cell of the embryo sac. This forms a triploid cell that develops into the endosperm, a nutritive tissue which nourishes the growing embryo." },
      { part: "Double fertilisation", text: "Because two fusions (syngamy and triple fusion) take place in the same embryo sac, the process is called double fertilisation. It is a feature of flowering plants." },
      { part: "Post-fertilisation changes", text: "The zygote divides repeatedly and forms the embryo (plumule, radicle and cotyledons) inside the ovule. The ovule develops a tough coat and becomes the seed. The ovary grows, ripens and becomes the fruit. Petals, sepals, stamens, style and stigma wither and fall off. The seed germinates into a new plant under suitable conditions, thereby completing the cycle of sexual reproduction." }
    ]
  },
  {
    id: 14,
    question: "Explain the process of seed germination with the parts of the embryo involved. How do monocot and dicot seeds differ in the number of cotyledons? Give examples.",
    markingScheme: ["Definition of germination and conditions required -- 1 mark", "Parts of the embryo (radicle, plumule, cotyledons) and their fates -- 2 marks", "Sequence of germination -- 1 mark", "Monocot versus dicot with examples -- 1 mark"],
    answerParts: [
      { part: "Definition and conditions", text: "Germination is the process by which the embryo inside a seed grows into a seedling under suitable conditions. It needs water, air (oxygen) and a suitable temperature." },
      { part: "Parts of the embryo", text: "Radicle: the embryonic root, which grows downward to form the root system. Plumule: the embryonic shoot, which grows upward to form the stem and leaves. Cotyledons: the seed leaves, which store food (or absorb it from the endosperm) to nourish the young seedling until it can make its own food." },
      { part: "Sequence", text: "The seed absorbs water and swells; the seed coat splits. The radicle emerges first and grows into the soil. The plumule then grows upward and comes out of the soil, forming the shoot with the first green leaves. The seedling then makes its own food by photosynthesis." },
      { part: "Monocot and dicot", text: "Monocot seeds have one cotyledon (maize, wheat, grass, rice). Dicot seeds have two cotyledons (gram, pea, bean, sunflower)." },
      { part: "Significance", text: "Seeds contain a dormant embryo with stored food and a hard coat, so they can survive unfavourable conditions and spread to new places, which increases the chances of the species surviving." }
    ]
  },
  {
    id: 15,
    question: "Draw a labelled diagram of the human male reproductive system and describe the function of each part.",
    markingScheme: ["Correctly labelled diagram -- 2 marks", "Functions of testes and scrotum with the reason for the scrotum -- 1 mark", "Functions of the vas deferens, glands (prostate, seminal vesicle), urethra and penis -- 2 marks"],
    answerParts: [
      { part: "Labelled parts with functions", text: "Testes (two): oval organs that produce sperms (male gametes) and the hormone testosterone. Scrotum: the pouch of skin outside the abdominal cavity that holds the testes; it keeps them at a temperature lower than body temperature, which is needed for the formation of sperms. Epididymis: a coiled tube on each testis where sperms are stored and mature. Vas deferens (sperm duct): a muscular tube that carries sperms from the epididymis towards the urethra. Seminal vesicle: a gland that secretes a fluid rich in fructose (energy for sperm) which forms a large part of semen. Prostate gland: secretes a fluid that nourishes the sperms and makes movement easier and forms part of semen. Urethra: a common passage for urine (from the bladder) and semen; it runs through the penis. Penis: the copulatory organ which delivers sperms into the female reproductive tract. Urinary bladder: stores urine (not a reproductive organ, but placed near the ducts)." },
      { part: "Role of testosterone", text: "Testosterone regulates the formation of sperms and brings about changes in appearance at puberty such as deepening of the voice and growth of facial hair." },
      { part: "Path of sperms", text: "Testes to epididymis to vas deferens to urethra (where the secretions of the seminal vesicle and prostate are added to form semen) and out through the penis." },
      { part: "Structure of sperm", text: "Sperm is a tiny male gamete with a head (nucleus with the male DNA, with an acrosome at the tip), a middle piece (mitochondria giving energy) and a long tail for swimming towards the egg." }
    ]
  },
  {
    id: 16,
    question: "Draw a labelled diagram of the human female reproductive system and describe the function of each part.",
    markingScheme: ["Correctly labelled diagram -- 2 marks", "Functions of the ovary, oviduct and the site of fertilisation -- 1 mark", "Functions of the uterus, cervix and vagina -- 2 marks"],
    answerParts: [
      { part: "Labelled parts with functions", text: "Ovaries (two): the primary female sex organs, one on each side of the abdomen. They produce eggs (ova) and the hormones oestrogen and progesterone. Oviduct (fallopian tube): a narrow tube with a funnel-shaped opening near the ovary; it catches the egg released by the ovary, carries it to the uterus, and is the usual site of fertilisation. Uterus (womb): a hollow, muscular, pear-shaped organ in which the embryo is implanted and the baby grows. Its inner lining (endometrium) thickens every month to receive the embryo. Cervix: the narrow lower part of the uterus opening into the vagina. Vagina: a muscular tube that receives the sperms during copulation and serves as the birth canal. Its opening lets the menstrual flow leave the body. Mammary glands (breasts): produce milk after childbirth to feed the baby." },
      { part: "Egg release", text: "Girls are born with thousands of immature eggs in the ovaries. Beginning at puberty, one egg is released each month from one of the ovaries (ovulation)." },
      { part: "Hormones", text: "Oestrogen and progesterone bring about the development of female characteristics at puberty and regulate the changes in the uterus in the menstrual cycle and during pregnancy." },
      { part: "Path of the egg", text: "Ovary to oviduct (fertilisation if a sperm is present) to uterus (implantation of the embryo if fertilised)." }
    ]
  },
  {
    id: 17,
    question: "Describe the events in human reproduction from fertilisation to birth of the baby. Draw or describe the structure of the placenta and explain its role.",
    markingScheme: ["Fertilisation in the oviduct and formation of the zygote -- 1 mark", "Division of the zygote and implantation in the uterus -- 1 mark", "Structure of the placenta (villi, blood spaces, umbilical cord) -- 1 mark", "Functions of the placenta -- 1 mark", "Embryo to foetus, gestation of about nine months and birth -- 1 mark"],
    answerParts: [
      { part: "Fertilisation", text: "During copulation, sperms are deposited in the vagina. They travel up through the cervix and uterus into the oviduct. If an egg is present in the oviduct, a sperm fuses with it to form a zygote. This is fertilisation, and it normally takes place in the oviduct." },
      { part: "Development and implantation", text: "The zygote divides repeatedly to form a ball of cells (embryo) as it moves towards the uterus. The embryo gets implanted in the thick, blood-rich lining (endometrium) of the uterus, and continues to grow there. After implantation, the placenta develops." },
      { part: "Structure of placenta", text: "The placenta is a special disc-shaped tissue embedded in the uterine wall. It contains villi, which are finger-like projections on the embryo's side, and on the mother's side there are blood spaces surrounding the villi. It is connected to the embryo by the umbilical cord." },
      { part: "Functions of placenta", text: "It provides a large surface area for the exchange of glucose, oxygen and other nutrients from the mother's blood to the embryo. It also transfers the waste (such as carbon dioxide and urea) from the embryo to the mother's blood, which is removed by the mother's body. It thus acts as the link between the mother and the developing child without their blood mixing directly." },
      { part: "Pregnancy and birth", text: "After about 8 weeks the embryo becomes a foetus, and the organs keep developing. The development in the uterus (gestation) lasts about nine months. Rhythmic contractions of the muscles of the uterus push the baby out through the vagina at birth, and the umbilical cord is cut. The mother then breast-feeds the baby." }
    ]
  },
  {
    id: 18,
    question: "What is the menstrual cycle? Describe the changes which occur in the ovary and uterus during a cycle. What happens if the egg is fertilised and if it is not?",
    markingScheme: ["Definition of the menstrual cycle with its usual duration -- 1 mark", "Changes in the ovary (egg release) -- 1 mark", "Changes in the uterine lining (thickening) -- 1 mark", "Menstruation if the egg is not fertilised -- 1 mark", "What happens if fertilisation occurs (no menstruation) -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "The menstrual cycle is the monthly series of changes in the female reproductive organs, controlled by hormones. It starts at puberty and repeats roughly every 28 days until menopause, except during pregnancy." },
      { part: "Changes in the ovary", text: "One egg matures and is released from an ovary about the middle of the cycle (ovulation). The egg enters the oviduct and stays viable for only about a day." },
      { part: "Changes in the uterus", text: "Every month, the uterus prepares itself to receive a fertilised egg. Its lining (endometrium) becomes thick and spongy, and rich in blood vessels, to nourish the embryo, if one arrives." },
      { part: "If the egg is not fertilised", text: "The egg dies within a day. The thickened lining is no longer needed, so it breaks down and is shed along with blood and mucus through the vagina. This is menstruation, which lasts about 2-8 days. Then the cycle begins again." },
      { part: "If the egg is fertilised", text: "The zygote develops into an embryo, which implants in the uterine lining. The lining is kept and the placenta forms, so there is no menstruation during pregnancy. Missing a period can be an early sign of pregnancy." }
    ]
  },
  {
    id: 19,
    question: "What is puberty? Explain the changes which occur in boys and in girls at puberty, and name the hormones responsible. Why is it important to understand these changes?",
    markingScheme: ["Definition of puberty with hormonal control -- 1 mark", "Common changes in both -- 1 mark", "Changes specific to boys -- 1 mark", "Changes specific to girls -- 1 mark", "Importance of understanding, and individual variation in the timing -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "Puberty is the period, generally between about 10 and 14 years of age (timing varies), when the body becomes sexually mature and capable of reproduction. General body growth slows down while the reproductive organs mature. It is controlled by sex hormones: testosterone in boys, and oestrogen and progesterone in girls." },
      { part: "Changes in both", text: "Thick hair grows in the armpits and genital area. Skin becomes oily and may develop pimples. There is a rise in height and body weight, and new feelings and emotional changes appear." },
      { part: "Changes in boys", text: "Thick hair growth on the face (moustache and beard); voice deepens due to growth of the larynx (Adam's apple); shoulders broaden and muscle growth increases; the penis enlarges; the testes start producing sperms." },
      { part: "Changes in girls", text: "The breasts enlarge and the skin of the nipples darkens; the hips widen; the ovaries start releasing eggs and the menstrual cycle begins (menarche)." },
      { part: "Importance and timing", text: "Puberty does not begin at the same time in everyone and changes occur gradually, so a person should not worry about being early or late. The onset of sexual maturity does not mean that the body or mind is ready for reproduction; knowing these changes helps young people to develop a healthy attitude, adopt good hygiene and resist peer pressure." }
    ]
  },
  {
    id: 20,
    question: "What is contraception? Describe the different methods of contraception with their merits and limitations. Why is contraception needed?",
    markingScheme: ["Meaning and need for contraception -- 1 mark", "Barrier methods -- 1 mark", "Hormonal methods (oral pills) with side effects -- 1 mark", "Intrauterine devices (loop / copper-T) -- 1 mark", "Surgical methods (vasectomy, tubectomy) -- 1 mark"],
    answerParts: [
      { part: "Meaning and need", text: "Contraception is the deliberate prevention of pregnancy. It is needed to avoid unwanted pregnancy which can affect the physical and mental health of the mother, to space the children, and to control the growth of the population." },
      { part: "Barrier methods", text: "Condoms (worn on the penis) and diaphragms/caps or female condoms (worn in the vagina) prevent the sperms from meeting the egg. Merit: condoms also give protection against many sexually transmitted infections including HIV-AIDS. Limitation: they can tear or slip if used wrongly." },
      { part: "Hormonal methods", text: "Oral contraceptive pills change the hormonal balance of the body and prevent the release of eggs (ovulation), so fertilisation cannot take place. Limitation: the change in hormones can produce side effects, and pills do not protect against STDs. They should be taken only on medical advice." },
      { part: "Intrauterine devices", text: "A loop or copper-T is placed in the uterus by a doctor. It prevents pregnancy (by preventing implantation and sperm movement). Limitation: it may cause irritation of the uterus or other side effects; it also does not protect against STDs." },
      { part: "Surgical methods", text: "Vasectomy in males: a small part of the vas deferens is cut and tied or blocked so the sperms cannot be released in semen. Tubectomy in females: a portion of the oviducts (fallopian tubes) is blocked or cut so that the egg cannot reach the uterus and sperms cannot reach the egg. They are highly effective and long-lasting, but need proper surgery, since improper surgery can cause infections and complications." },
      { part: "Note", text: "Abortion is not a method of contraception, and sex-selective abortion is illegal." }
    ]
  },
  {
    id: 21,
    question: "What are sexually transmitted diseases (STDs)? Name two bacterial and two viral STDs, describe the symptoms of each and explain how they can be prevented.",
    markingScheme: ["Meaning of STDs and how they spread -- 1 mark", "Two bacterial STDs with symptoms -- 1 mark", "Two viral STDs with symptoms (including HIV-AIDS) -- 1 mark", "Prevention methods, at least three -- 2 marks"],
    answerParts: [
      { part: "Meaning", text: "Sexually transmitted diseases are infections that are spread by sexual contact with an infected person. The disease-causing organisms can pass through the sexual organs, and some (like HIV) can also spread by infected blood and from an infected mother to child." },
      { part: "Bacterial STDs", text: "Gonorrhoea: causes a discharge from the genital organs and burning pain during urination. Syphilis: causes sores in the genital area and later a skin rash and other more serious complications if untreated." },
      { part: "Viral STDs", text: "Genital warts (caused by the human papilloma virus): flesh-coloured bumps in the genital area. HIV-AIDS: the virus (HIV) attacks the immune system and weakens the body's ability to fight infections; the final stage is AIDS (acquired immunodeficiency syndrome), which can lead to death." },
      { part: "Prevention", text: "Use of condoms during sexual contact reduces the chance of transmission of many STDs, though not to zero. Avoiding sexual contact with multiple or unknown partners. Not sharing needles or razors, and using sterilised syringes and screened blood. Early testing and treatment, since bacterial STDs can be cured with antibiotics on medical advice. Awareness and education." },
      { part: "Important distinction", text: "Other contraceptive methods such as pills, loops or surgical methods prevent pregnancy but do not protect against STDs." }
    ]
  },
  {
    id: 22,
    question: "Explain what is meant by reproductive health. Suggest measures to maintain it. Why has the sex ratio in some parts of the country declined, and how does this affect society?",
    markingScheme: ["Meaning of reproductive health -- 1 mark", "Measures to maintain reproductive health -- 1 mark", "Sex-selective female foeticide and its link with the falling child sex ratio -- 1 mark", "Legal ban on prenatal sex determination -- 1 mark", "Consequences and role of society -- 1 mark"],
    answerParts: [
      { part: "Meaning", text: "Reproductive health means a state of total physical, mental and social well-being in all aspects of reproduction, and not just freedom from disease. It includes a healthy reproductive system, awareness of the reproductive process and being free of STDs." },
      { part: "Measures", text: "A balanced diet, personal and genital hygiene, regular exercise, avoiding smoking, alcohol and other drugs, managing stress, awareness and education about puberty, pregnancy, contraception and STDs, regular medical check-ups, safe practices, and waiting for physical and mental maturity before marriage and having children." },
      { part: "Falling sex ratio", text: "In some sections of society, a preference for male children has led to the illegal practice of finding the sex of the unborn baby and terminating female foetuses (female foeticide). This has caused an alarming decline in the child sex ratio (the number of girls per 1000 boys) in some regions." },
      { part: "Legal position", text: "Prenatal sex determination is prohibited by law (the sex of the foetus must not be revealed in a medical examination) and sex-selective abortion is a punishable crime." },
      { part: "Consequences and remedies", text: "A skewed sex ratio disturbs the social balance and increases the problems of finding partners, as well as violating the rights of girls. Social attitudes must change through education, equal opportunities and equal respect for girls and boys, along with strict enforcement of the law." }
    ]
  },
  {
    id: 23,
    question: "Explain with reasons: (a) the testes are located outside the abdominal cavity in the scrotum, (b) a very large number of sperms are produced but only one egg per month, (c) the egg is large and non-motile while the sperm is small and motile, (d) the wall of the uterus becomes thick and rich in blood every month.",
    markingScheme: ["Reason (a) with the temperature requirement -- 1 mark", "Reason (b) with chances of fertilisation -- 1 mark", "Reason (c) with function of each gamete -- 1.5 marks", "Reason (d) with the preparation for pregnancy and what happens next -- 1.5 marks"],
    answerParts: [
      { part: "(a) Testes in the scrotum", text: "Sperm formation needs a temperature slightly lower than the normal body temperature. The scrotum holds the testes outside the abdominal cavity, and so keeps them at the cooler temperature needed for sperm production." },
      { part: "(b) Sperms many, egg one", text: "Sperms are deposited in the vagina and most of them are lost or destroyed on the long path through the female tract; only a few reach the egg. Millions of sperms are made to increase the chance that one will reach and fertilise the egg. The female produces just one egg a month since it is meant to nourish a single developing embryo, and it has a large amount of stored food." },
      { part: "(c) Egg large, sperm small", text: "The egg (female gamete) is large because it stores food (nutrients) in its cytoplasm to nourish the embryo in the early stage. It is non-motile because it is carried by the oviduct. The sperm has a tiny head with DNA, a middle piece with mitochondria for energy, and a tail, to swim to the egg. It is small and light so that it can move fast." },
      { part: "(d) Thick uterine lining", text: "Every month, the uterus prepares itself to receive a fertilised egg. The lining thickens and becomes rich in blood vessels so as to supply nutrition and oxygen to the embryo after implantation. If no fertilisation happens the lining is shed as menstrual flow." }
    ]
  },
  {
    id: 24,
    question: "Explain with reasons: (a) a multicellular organism cannot reproduce by simple cell division, (b) organisms produced by asexual reproduction are almost identical to the parent, (c) germ cells have half the amount of DNA of body cells, (d) variations are more in sexual reproduction, yet many organisms with asexual reproduction survive for long periods.",
    markingScheme: ["Reason (a) -- 1 mark", "Reason (b) -- 1 mark", "Reason (c) -- 1.5 marks", "Reason (d) -- 1.5 marks"],
    answerParts: [
      { part: "(a) Complex organisms", text: "A multicellular organism has a body design with cells organised into specialised tissues and organs. It cannot simply divide into two cells like an Amoeba. Instead it has specific reproductive cells or parts that can grow, divide and differentiate into all the cell types needed to form a new body. That is why they use fragmentation, regeneration, budding, or the formation of gametes." },
      { part: "(b) Asexual reproduction", text: "Only one parent is involved and the offspring are produced by the copying of the parent's DNA in ordinary cell division. Since there is no mixing of DNA from another individual, the offspring are nearly identical (clones), differing only by the small errors in DNA copying." },
      { part: "(c) Half DNA in germ cells", text: "If both parents gave a full set of DNA, the amount of DNA would double in each generation, which would disturb the working of the cell. Special germ cells (gametes) therefore have half the amount of DNA of the body cell. When the male and female gametes fuse in fertilisation, the normal amount of DNA is restored in the zygote." },
      { part: "(d) Variation and survival", text: "In sexual reproduction, the DNA of two individuals is combined, which adds to the small variations from copying errors, so there is much more variation. In asexual reproduction, the variation is small, but it does not disappear completely, and in a stable environment identical individuals can multiply fast and survive. However, if the environment changes suddenly, a population with little variation is at greater risk of being wiped out, so the variations from sexual reproduction give an advantage for long-term survival." }
    ]
  },
  {
    id: 25,
    question: "Explain with reasons: (a) flowers are often brightly coloured and scented, (b) wind-pollinated plants produce a huge amount of pollen, (c) a cutting of rose or a piece of potato with an eye gives a plant identical to the parent, (d) bananas and jasmine are propagated by vegetative methods, (e) seeds are dormant and have a tough coat.",
    markingScheme: ["Reason (a) -- 1 mark", "Reason (b) -- 1 mark", "Reason (c) -- 1 mark", "Reason (d) -- 1 mark", "Reason (e) -- 1 mark"],
    answerParts: [
      { part: "(a) Bright colour and scent", text: "Bright petals and scent attract insects, birds and other animals to the flower. They come for nectar and pollen and, while doing so, carry the pollen from one flower to another. This helps pollination." },
      { part: "(b) Pollen in huge quantity", text: "Wind-pollinated plants depend on chance for pollen to reach a stigma. Most pollen is lost in the air. So a huge quantity of light, dry pollen is produced, to make sure some of it lands on the stigma of a flower of the same species." },
      { part: "(c) Identical plants", text: "Vegetative propagation is asexual. The new plant grows from the body cells of the parent by cell division without gametes, so it has the same DNA as the parent and shows the same characteristics." },
      { part: "(d) Bananas and jasmine", text: "Many varieties of these plants have lost the ability to produce viable seeds. Vegetative propagation using cuttings, suckers or layering lets them be multiplied, retains the good characteristics of the parent and gives flowers and fruits sooner than seed-grown plants." },
      { part: "(e) Seed dormancy and coat", text: "The seed contains the embryo and stored food. The tough coat protects the embryo from injury, drying and attack by microbes, and the seed remains dormant until water, air and warmth are available. It can survive unfavourable seasons, get carried to new places, and grow when the conditions are favourable." }
    ]
  }
];

// ── COMPETENCY-BASED / CASE-STUDY QUESTIONS (4 marks each) ──
export const REPRO10_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "Bread Mould on a Damp Slice",
    caseDescription: "Meena kept two slices of bread in her kitchen. She moistened one slice and kept it covered in a cool, dark cupboard, while she left the other slice dry in sunlight. After three days, the damp slice was covered with cottony threads with tiny black dots on stalks, while the dry slice remained clean. Under a magnifying glass, the black dots looked like small round sacs on erect stalks.",
    subQuestions: [
      { question: "The thread-like structures spreading on the damp slice are called:", options: ["Sporangia", "Hyphae", "Spores", "Buds"], correctIndex: 1, answer: "Hyphae", explanation: "The cottony threads are hyphae, which absorb food and are not involved in reproduction. The black round sacs are sporangia containing spores." },
      { question: "Name the mould and the mode of asexual reproduction shown by it.", answer: "The mould is Rhizopus (bread mould), and it reproduces by spore formation.", explanation: "Spores are produced inside sporangia on the tips of upright hyphae." },
      { question: "Why did the dry slice in sunlight not develop the mould?", answer: "Rhizopus spores need moisture and a food source to germinate. The dry slice in sunlight lacked moisture, so the spores did not germinate and grow.", explanation: "Rhizopus grows best on a damp slice of bread in a warm, moist, dark place." },
      { question: "How do the thick walls of the spores help the mould?", answer: "The thick protective wall protects the spores from unfavourable conditions such as dryness and heat, and they stay dormant until they land on a moist surface with food.", explanation: "This helps survival as well as dispersal of the species." }
    ]
  },
  {
    id: 2,
    caseTitle: "The Gardener and the Mango Graft",
    caseDescription: "A gardener has a mango tree with a strong root system that gives sour fruits, and another mango variety with sweet fruits but weak roots. He cuts a shoot with buds from the sweet variety and attaches it firmly to the cut stem of the rooted tree, binding the joint tightly. After a few weeks, the shoot begins to grow and, in a few years, the tree bears sweet mangoes.",
    subQuestions: [
      { question: "Name the method of propagation used by the gardener.", answer: "Grafting.", explanation: "Grafting is an artificial method of vegetative propagation." },
      { question: "In this case, which is the scion and which is the stock?", answer: "The shoot with buds from the sweet variety is the scion, and the rooted stem of the other tree is the stock.", explanation: "The scion is the part attached, and the stock is the rooted plant to which it is attached." },
      { question: "Why should the joint be bound tightly?", options: ["To let pollen reach the flower", "To keep the cut surfaces in close contact so that the vascular tissues join", "To prevent the scion from developing leaves", "To make the plant produce seeds"], correctIndex: 1, answer: "To keep the cut surfaces in close contact so that the vascular tissues join", explanation: "Union of the vascular tissues of scion and stock is necessary for water and food to pass and for the scion to grow." },
      { question: "State one advantage of grafting over raising the mango from a seed.", answer: "The graft gives sweet fruits like the scion parent (its desirable characteristics are retained), and it begins fruiting earlier, whereas a seedling shows variation and may give fruit of a different quality.", explanation: "Vegetative propagation gives plants genetically similar to the parent." }
    ]
  },
  {
    id: 3,
    caseTitle: "Banana Plantlets from a Laboratory",
    caseDescription: "A farmer visits an agricultural research centre where hundreds of small banana plantlets are growing in glass bottles containing a jelly-like nutrient medium. Scientists explain that each plantlet came from a tiny piece of tissue of one healthy parent plant, and that the plantlets will be supplied to farmers after being planted in pots. Cultivated bananas do not produce viable seeds.",
    subQuestions: [
      { question: "Name the technique used by scientists.", answer: "Tissue culture (micropropagation).", explanation: "Cells or tissue are grown on an artificial nutrient medium under sterile conditions." },
      { question: "The mass of undifferentiated cells produced from the tissue before roots and shoots appear is called:", options: ["Zygote", "Callus", "Scion", "Embryo"], correctIndex: 1, answer: "Callus", explanation: "The explant first forms an unorganised mass, the callus, which is then induced with hormones to form roots and shoots." },
      { question: "Why is vegetative propagation the only practical way to multiply cultivated bananas?", answer: "Cultivated bananas do not form viable seeds, so they cannot be multiplied by seeds. Vegetative propagation (including tissue culture) is used to get plants.", explanation: "Vegetative propagation helps propagate plants that have lost the ability to produce seeds." },
      { question: "Give two advantages of tissue culture for the farmer.", answer: "A large number of identical, disease-free plants can be produced quickly in a small space from a tiny piece of tissue, and the plants retain the good characteristics of the parent plant.", explanation: "All plants are genetically identical to the parent." }
    ]
  },
  {
    id: 4,
    caseTitle: "Hydra in the School Pond",
    caseDescription: "During a field trip, students observed a Hydra in pond water under a hand lens. On its body, they saw a small bulge, and after a few days, the bulge had developed tiny tentacles and finally detached and swam away. One student then asked whether the bulge was formed by fusion of a sperm and an egg, or by a different process.",
    subQuestions: [
      { question: "Name the mode of reproduction seen in the Hydra.", answer: "Budding.", explanation: "A new individual arises as an outgrowth (bud) that later detaches." },
      { question: "Was the bulge formed by fertilisation? Give a reason.", answer: "No. Budding is asexual: it involves only one parent, no gametes and no fertilisation. The bud forms by repeated cell division of regenerative cells at one site.", explanation: "Sexual reproduction needs two gametes to fuse." },
      { question: "The bud would be genetically:", options: ["Completely different from the parent", "Identical or nearly identical to the parent", "Half of the parent", "Double the parent"], correctIndex: 1, answer: "Identical or nearly identical to the parent", explanation: "Asexual reproduction copies the parent's DNA, with only small variations from copying errors." },
      { question: "If the same Hydra is cut into several pieces, each may grow into a new Hydra. Name this process and state how it differs from budding.", answer: "This is regeneration. In budding, a new individual grows as an outgrowth while the parent stays intact. In regeneration, the body that has been cut or broken into pieces regrows the missing parts, with each piece giving a new organism.", explanation: "Specialised cells proliferate and then differentiate into the different tissues." }
    ]
  },
  {
    id: 5,
    caseTitle: "Yeast in Sugar Solution",
    caseDescription: "In a science class, a teacher adds a pinch of yeast to a 10 per cent sugar solution and keeps the beaker in a warm place. After a few hours, a drop of the solution under a microscope shows many yeast cells, some with small bulges attached to them. The number of cells is much greater than in the drop observed at the start.",
    subQuestions: [
      { question: "Name the process by which yeast multiplies in this activity.", answer: "Budding.", explanation: "A small outgrowth forms on the parent cell, receives a nucleus and then separates." },
      { question: "Why were sugar and warmth provided?", answer: "Sugar gives the food (energy) and warmth is the favourable condition for rapid growth; under favourable conditions yeast reproduces rapidly by budding.", explanation: "Yeast needs nutrients and a suitable temperature to multiply." },
      { question: "Yeast is unicellular. Which of the following cannot be true of budding in yeast?", options: ["It is asexual", "It involves one parent", "It involves fusion of gametes", "The bud has the parent's nucleus copy"], correctIndex: 2, answer: "It involves fusion of gametes", explanation: "Budding is asexual, with one parent and no gametes." },
      { question: "Would you expect much genetic variation among these yeast cells? Explain.", answer: "No. As they were produced asexually from a single parent by copying its DNA, the cells would be almost identical, with only small variations due to errors in DNA copying.", explanation: "Greater variation arises from sexual reproduction." }
    ]
  },
  {
    id: 6,
    caseTitle: "A Cut Planaria in the Laboratory",
    caseDescription: "A biology teacher cuts a Planaria (a flatworm) into three pieces and places them in separate dishes of pond water. After two weeks, each piece has grown into a complete small Planaria. The teacher explains that the cut pieces first formed a mass of new cells at the cut end, which later changed into different types of cells.",
    subQuestions: [
      { question: "Name the process demonstrated in the experiment.", answer: "Regeneration.", explanation: "Many organisms can grow whole bodies or lost parts from the pieces." },
      { question: "Which two steps at the cut end are described by the teacher?", answer: "Cell proliferation (specialised cells divide to form a mass of many new cells) and differentiation (these cells change into the different types of cells and tissues in an organised sequence).", explanation: "This is how the missing parts are rebuilt." },
      { question: "Is regeneration the same as reproduction? Choose the best answer.", options: ["Yes, all organisms reproduce by being cut into pieces", "No, regeneration is mainly repair, and most organisms do not depend on cutting to reproduce", "Yes, because it needs gametes", "No, because it needs two parents"], correctIndex: 1, answer: "No, regeneration is mainly repair, and most organisms do not depend on cutting to reproduce", explanation: "Regeneration occurs when the body is damaged or cut; reproduction is the normal process of producing offspring." },
      { question: "Why can a human being not regenerate a lost limb in the same way as Planaria does?", answer: "Complex organisms such as humans have highly specialised cells, tissues and organs, and do not have the ability to rebuild an entire body part from the cells at the cut region. The more complex the organism, the less it can regenerate.", explanation: "Regeneration is limited in complex multicellular animals." }
    ]
  },
  {
    id: 7,
    caseTitle: "Sprouting Potatoes",
    caseDescription: "A shopkeeper stores potatoes in a dark corner for several weeks. He notices that small shoots have begun to grow from the 'eyes' on the potatoes. His son plants a few of the sprouted potato pieces in the garden, and each piece grows into a full potato plant.",
    subQuestions: [
      { question: "What are the 'eyes' of the potato?", answer: "They are buds (present on the stem tuber) that can grow into new shoots.", explanation: "The potato is a modified stem, and the eyes are its buds at nodes." },
      { question: "Name the type of reproduction shown by the sprouting.", answer: "Natural vegetative propagation, a form of asexual reproduction.", explanation: "New plants grow from the vegetative part (stem) of the parent." },
      { question: "Would the potato plants be identical or different from the parent potato? Why?", options: ["Different, because two parents are involved", "Identical, because they arise from the parent's body cells without gametes", "Different, because pollination is needed", "Identical, because fertilisation occurs"], correctIndex: 1, answer: "Identical, because they arise from the parent's body cells without gametes", explanation: "Vegetative propagation produces genetically similar plants." },
      { question: "Name one other plant that reproduces like potato and one that reproduces through leaves.", answer: "Ginger (or onion, grass) reproduces through stems like potato, and Bryophyllum reproduces through buds on its leaf margins.", explanation: "Both are natural vegetative propagation." }
    ]
  },
  {
    id: 8,
    caseTitle: "Bryophyllum on the Windowsill",
    caseDescription: "Aman placed a fallen leaf of a Bryophyllum plant on damp soil in a pot. After a few days, small plantlets with tiny roots and leaves appeared along the notched edges of the leaf. His grandmother said she never had to buy seeds for this plant, which keeps spreading by itself in her garden.",
    subQuestions: [
      { question: "Where on the leaf do the new plantlets arise?", answer: "From the buds present in the notches of the leaf margin.", explanation: "These are adventitious buds." },
      { question: "Is this sexual or asexual reproduction? Give a reason.", answer: "Asexual reproduction (vegetative propagation), because a single parent is involved and there is no formation or fusion of gametes.", explanation: "The plantlets grow from a vegetative part, the leaf." },
      { question: "Which of these plants is not propagated by a method similar to Bryophyllum?", options: ["Begonia", "Potato", "Sunflower (by seeds)", "Ginger"], correctIndex: 2, answer: "Sunflower (by seeds)", explanation: "Sunflower reproduces by seeds formed after sexual reproduction, while the other three propagate vegetatively." },
      { question: "State two advantages of this mode of reproduction for the plant.", answer: "It allows quick multiplication without needing pollination, fertilisation or a mate. The new plants have the same characteristics as the parent and mature earlier than plants from seeds.", explanation: "These are advantages of vegetative propagation." }
    ]
  },
  {
    id: 9,
    caseTitle: "The Malaria Patient",
    caseDescription: "A boy has recurring fever with chills every few days. A blood test shows that a single parasite in a red blood cell has divided into many small parasites, which burst out and infect fresh red blood cells. The doctor says the parasite is Plasmodium, and adds that Leishmania, which causes kala-azar, reproduces differently.",
    subQuestions: [
      { question: "Name the type of fission shown by Plasmodium.", answer: "Multiple fission.", explanation: "One parent divides into many daughter cells at the same time." },
      { question: "What is the advantage of this type of division to the parasite?", answer: "A single parasite yields many offspring at once, so the number rises very quickly, helping the parasite to spread and infect more cells and hosts.", explanation: "This explains the rapid worsening of the infection." },
      { question: "Leishmania divides by binary fission. What is special about the plane of division?", options: ["It divides in any plane", "It divides in a definite orientation relative to the flagellum at one end", "It divides into many cells", "It does not divide"], correctIndex: 1, answer: "It divides in a definite orientation relative to the flagellum at one end", explanation: "Leishmania has a whip-like structure at one end, and fission takes place in a definite plane in relation to it." },
      { question: "Distinguish between the number of daughter cells formed in binary and multiple fission.", answer: "Binary fission gives two daughter cells, whereas multiple fission gives many daughter cells from a single parent cell.", explanation: "In multiple fission, the nucleus divides many times before the cytoplasm divides." }
    ]
  },
  {
    id: 10,
    caseTitle: "Sunflowers and the Bees",
    caseDescription: "A farmer grows a field of sunflowers and keeps beehives near it. During flowering, he sees bees visiting the flowers for nectar, with yellow powder sticking to their bodies. He observes that fields with more bee visits give more, well-filled seeds. A student tells him that this is because pollination transfers pollen from one plant to another.",
    subQuestions: [
      { question: "The yellow powder on the bees is:", options: ["Stigma", "Pollen grains produced by the anthers", "Ovules", "Seeds"], correctIndex: 1, answer: "Pollen grains produced by the anthers", explanation: "Pollen grains carry the male gametes." },
      { question: "What type of pollination is described? Give a reason.", answer: "Cross-pollination, because pollen is carried from the flower of one plant to the stigma of a flower on another plant.", explanation: "Bees are the agents that bring this about." },
      { question: "Why are bright petals and nectar important for this process?", answer: "Bright colours and nectar attract insects such as bees to the flower; while feeding, they carry pollen from one flower to another, helping pollination.", explanation: "This is the role of petals in the flower." },
      { question: "Give one advantage of cross-pollination over self-pollination.", answer: "It produces more variation in the offspring, and the plants are often healthier and better able to adapt to changes in the environment.", explanation: "Two different plants contribute their DNA." }
    ]
  },
  {
    id: 11,
    caseTitle: "The Papaya Puzzle",
    caseDescription: "Ravi planted a single papaya tree in his backyard. It flowered every year but never gave fruit. A neighbour said that his own papaya tree had only male flowers with no carpels, and a second tree of his had only female flowers. He advised Ravi to plant another papaya tree near his own.",
    subQuestions: [
      { question: "Are the flowers of papaya unisexual or bisexual?", answer: "Unisexual (each flower has either stamens or carpels, not both).", explanation: "Papaya and watermelon have unisexual flowers." },
      { question: "Why did Ravi's tree not bear fruit?", answer: "The tree probably had only male flowers (or only female ones without any pollen supply); fruit requires pollination and fertilisation, which needs pollen from a male flower to reach the stigma of a female flower.", explanation: "Ovary becomes the fruit only after fertilisation." },
      { question: "Which of these is a bisexual flower?", options: ["Papaya", "Watermelon", "Hibiscus", "Male papaya flower"], correctIndex: 2, answer: "Hibiscus", explanation: "Hibiscus and mustard have both stamens and carpels in the same flower." },
      { question: "Why will planting another tree help, and what type of pollination will occur?", answer: "If the other tree has flowers of the opposite sex, insects or wind can carry the pollen to the stigma of the female flowers. This is cross-pollination since the pollen comes from a different plant.", explanation: "Unisexual flowers can only be cross-pollinated (or pollinated between flowers of different plants)." }
    ]
  },
  {
    id: 12,
    caseTitle: "What Happens After Pollination",
    caseDescription: "A student examines a mustard flower and later the pod that forms from it. She notes that a few days after pollination, the petals, sepals and stamens dry and fall off, while the swollen basal part of the carpel keeps growing. When the pod is opened, small seeds are found inside.",
    subQuestions: [
      { question: "Which part of the flower develops into the pod (fruit)?", answer: "The ovary.", explanation: "After fertilisation, the ovary ripens into the fruit." },
      { question: "The seeds in the pod develop from:", options: ["Ovaries", "Ovules", "Stigma", "Petals"], correctIndex: 1, answer: "Ovules", explanation: "The ovule, with the zygote developing into an embryo, changes into a seed with a tough coat." },
      { question: "What is the role of the pollen tube in the process?", answer: "The pollen tube grows from the pollen grain on the stigma through the style to the ovule and carries the male gametes to the egg, where fertilisation takes place.", explanation: "This allows the male and female gametes to fuse." },
      { question: "In double fertilisation, what are the two fusions and what do they form?", answer: "One male gamete fuses with the egg to form the zygote (which becomes the embryo); the other fuses with two polar nuclei to form a triploid cell that develops into the endosperm (food for the embryo).", explanation: "The two fusions are known as syngamy and triple fusion." }
    ]
  },
  {
    id: 13,
    caseTitle: "The Seed Germination Experiment",
    caseDescription: "Four petri dishes are set up with equal numbers of gram seeds. Dish A has dry cotton kept in a warm place, dish B has wet cotton kept in a warm place, dish C has wet cotton kept in a refrigerator, and dish D has seeds under water with no air. After a week, seeds germinate well only in dish B. In dish B, the first structure to emerge from the seed was the radicle.",
    subQuestions: [
      { question: "Which conditions are essential for germination, according to the experiment?", answer: "Water (moisture), air (oxygen) and a suitable temperature.", explanation: "A lacks water, C lacks a suitable temperature and D lacks air." },
      { question: "What does the radicle become?", options: ["Stem", "Leaves", "Root", "Fruit"], correctIndex: 2, answer: "Root", explanation: "The radicle is the embryonic root and the plumule is the embryonic shoot." },
      { question: "Gram seeds have two cotyledons. What is the function of cotyledons?", answer: "They store food and nourish the seedling until it develops leaves and can make its own food by photosynthesis.", explanation: "Gram is a dicot; maize is a monocot with one cotyledon." },
      { question: "Why do seeds not germinate immediately inside dry storage bags?", answer: "The seed stays dormant because of the lack of water and other favourable conditions. The tough seed coat and dormancy protect the embryo until conditions are right.", explanation: "This helps the species survive unfavourable periods." }
    ]
  },
  {
    id: 14,
    caseTitle: "A School Talk on Adolescence",
    caseDescription: "During a school talk on puberty, a doctor says that changes such as growth of facial hair in boys and enlargement of breasts in girls are brought about by hormones released from the testes and ovaries. She adds that these changes start at different ages in different children and that a teenager should not compare themselves with friends.",
    subQuestions: [
      { question: "Name the hormone responsible for changes in boys at puberty and the organ that secretes it.", answer: "Testosterone, secreted by the testes.", explanation: "It causes deepening of voice, facial hair and muscle growth and regulates sperm formation." },
      { question: "Which pair of hormones is responsible for the changes in girls?", options: ["Testosterone and insulin", "Oestrogen and progesterone", "Thyroxine and adrenaline", "Growth hormone and testosterone"], correctIndex: 1, answer: "Oestrogen and progesterone", explanation: "These are secreted by the ovaries." },
      { question: "Give two changes common to both boys and girls at puberty.", answer: "Growth of hair under the arms and in the genital region, and oily skin with the appearance of pimples (also a rise in height and emotional changes).", explanation: "These changes are common to both sexes." },
      { question: "Why should a teenager not worry if changes begin earlier or later than in friends?", answer: "Puberty begins at different ages for different persons, and the changes occur gradually. So such differences are normal and do not mean any problem.", explanation: "The rate of change varies among individuals." }
    ]
  },
  {
    id: 15,
    caseTitle: "Inside the Male Reproductive System",
    caseDescription: "A group of students studies a model of the male reproductive system. They note that the two testes hang in a pouch outside the abdominal cavity. Sperms are formed in the testes and pass through a coiled tube and a muscular duct to join the urethra, where they are mixed with secretions of glands to form semen.",
    subQuestions: [
      { question: "Why are the testes located in the scrotum outside the body cavity?", answer: "Sperm formation requires a temperature lower than the normal body temperature, and the scrotum provides this cooler environment.", explanation: "Sperm production would be affected at body temperature." },
      { question: "Arrange the passage of sperm correctly.", options: ["Testis, vas deferens, epididymis, urethra", "Testis, epididymis, vas deferens, urethra", "Epididymis, testis, urethra, vas deferens", "Vas deferens, testis, epididymis, urethra"], correctIndex: 1, answer: "Testis, epididymis, vas deferens, urethra", explanation: "Sperms are stored and mature in the epididymis, and the vas deferens carries them to the urethra." },
      { question: "Name two glands whose secretions form semen and state one benefit of the secretions.", answer: "Seminal vesicles and the prostate gland. Their secretions nourish the sperms (for example with fructose) and make their movement easier.", explanation: "The mixture of sperm and secretions is called semen." },
      { question: "What is special about the male urethra?", answer: "It is a common passage for both urine and semen.", explanation: "It runs through the penis to the outside." }
    ]
  },
  {
    id: 16,
    caseTitle: "A Girl's Ovary and Oviduct",
    caseDescription: "Anita is studying a diagram of the female reproductive system. She learns that a girl is born with thousands of immature eggs in her ovaries, and that from puberty one egg is released about every month. The egg is caught by a funnel-shaped opening of a tube and carried towards a muscular organ, where the baby develops if the egg is fertilised.",
    subQuestions: [
      { question: "Name the tube that catches the egg and the site where fertilisation normally takes place.", answer: "The oviduct (fallopian tube); fertilisation normally takes place in the oviduct.", explanation: "The egg is carried by the oviduct towards the uterus." },
      { question: "The release of the egg from the ovary is called:", options: ["Menstruation", "Ovulation", "Implantation", "Lactation"], correctIndex: 1, answer: "Ovulation", explanation: "One egg is released every month from puberty until menopause." },
      { question: "State two functions of the ovary.", answer: "It produces eggs (female gametes) and secretes the hormones oestrogen and progesterone.", explanation: "These hormones control female sexual characteristics and the menstrual cycle." },
      { question: "Which is the muscular organ where the baby develops, and why is its lining thick?", answer: "The uterus. Its lining is thick and rich in blood vessels to receive and nourish the embryo after implantation.", explanation: "If no fertilisation occurs, the lining is shed as menstruation." }
    ]
  },
  {
    id: 17,
    caseTitle: "Diet During Pregnancy",
    caseDescription: "A pregnant woman is advised by her doctor to eat a balanced diet with enough iron, protein and folic acid, and to avoid smoking and alcohol. The doctor explains that whatever the mother eats or breathes in can reach the baby, because the baby is linked to the mother's uterus by a special disc-shaped tissue with finger-like villi that increase the surface area for exchange.",
    subQuestions: [
      { question: "Name the tissue described by the doctor and the cord that links it with the baby.", answer: "The placenta, linked to the baby by the umbilical cord.", explanation: "The placenta is embedded in the uterine wall." },
      { question: "What is the function of the villi in the placenta?", answer: "The villi provide a large surface area for the efficient exchange of glucose, oxygen and other substances from the mother to the embryo and waste from the embryo to the mother.", explanation: "Blood spaces on the mother's side surround the villi." },
      { question: "Which substance passes from the embryo's blood to the mother's blood through the placenta?", options: ["Oxygen", "Glucose", "Carbon dioxide and other wastes", "Amino acids"], correctIndex: 2, answer: "Carbon dioxide and other wastes", explanation: "The embryo's wastes are removed through the mother's blood." },
      { question: "Why is smoking or drinking alcohol by a pregnant woman harmful to the baby?", answer: "Harmful substances can pass from the mother's blood through the placenta to the developing baby and may affect its growth and organ development.", explanation: "The placenta acts as a bridge between mother and child." }
    ]
  },
  {
    id: 18,
    caseTitle: "A Missed Period",
    caseDescription: "Sunita, aged 26, regularly has her menstrual period every 28 days or so. In one month, the period does not start and her doctor confirms that she is pregnant. The doctor explains that, in a month when the egg is not fertilised, the lining of the uterus is shed with blood, but this did not happen in this month.",
    subQuestions: [
      { question: "Why did menstruation not take place this month?", answer: "The egg was fertilised and the embryo was implanted in the uterine lining, so the thick lining was retained to nourish the embryo instead of being shed.", explanation: "The lining is maintained during pregnancy." },
      { question: "What happens to an unfertilised egg and the uterine lining?", options: ["They both remain in the uterus", "The egg lives for about a day and the lining breaks and is shed as menstrual flow", "The egg divides to form an embryo", "The lining becomes an embryo"], correctIndex: 1, answer: "The egg lives for about a day and the lining breaks and is shed as menstrual flow", explanation: "Menstruation lasts about 2-8 days." },
      { question: "Which two hormones regulate the menstrual cycle and from which organ are they secreted?", answer: "Oestrogen and progesterone, secreted by the ovaries.", explanation: "They regulate changes in the uterus." },
      { question: "Roughly how long will the pregnancy last, and what is the name given to the developing baby after the first 8 weeks?", answer: "About nine months (around 40 weeks); after 8 weeks the developing baby is called a foetus.", explanation: "Before that it is called an embryo." }
    ]
  },
  {
    id: 19,
    caseTitle: "A Couple Discusses Contraception",
    caseDescription: "A newly married couple, who wish to delay having a child for a few years, meet a doctor. The doctor lists condoms, oral pills, the copper-T, and permanent surgical methods. She cautions that some methods can cause side effects and that only one of these methods also protects against many sexually transmitted diseases.",
    subQuestions: [
      { question: "Which method protects against STDs as well as pregnancy?", options: ["Oral pills", "Copper-T", "Condom", "Tubectomy"], correctIndex: 2, answer: "Condom", explanation: "It is a barrier that prevents sperms from meeting the egg and reduces the transmission of many STDs." },
      { question: "How do oral contraceptive pills prevent pregnancy, and what is their limitation?", answer: "They change the hormonal balance of the body and prevent the release of eggs (ovulation), so fertilisation cannot occur. Their limitation is that they can have side effects due to the hormone changes, and they do not protect against STDs.", explanation: "They should be used only on medical advice." },
      { question: "Since the couple want to delay, not stop, having children, why are surgical methods unsuitable?", answer: "Vasectomy and tubectomy are permanent methods (sterilisation), which block the passage of sperms or eggs; they are meant for those who do not want any more children.", explanation: "Also, improper surgery may lead to infection and complications." },
      { question: "Name the surgical method for males and for females.", answer: "Vasectomy for males (vas deferens is cut and tied) and tubectomy for females (oviducts are blocked).", explanation: "Both prevent fertilisation." }
    ]
  },
  {
    id: 20,
    caseTitle: "Village Campaign for Girl Children",
    caseDescription: "In a village, the number of girls has dropped sharply compared to boys. Health workers found that a few clinics were illegally telling parents the sex of the unborn baby, and that some families ended pregnancies with a female foetus. The workers organised a campaign on the value of girls and also spoke about the danger of STDs for the young people of the village.",
    subQuestions: [
      { question: "What is the illegal practice that led to the fall in the number of girls?", answer: "Prenatal sex determination followed by sex-selective abortion of female foetuses (female foeticide).", explanation: "This practice is banned by law." },
      { question: "Which is the most likely consequence of a low child sex ratio for society?", options: ["More equal marriages", "Social imbalance and a shortage of marriage partners", "Increase in the number of births", "Better health of women"], correctIndex: 1, answer: "Social imbalance and a shortage of marriage partners", explanation: "A skewed sex ratio disturbs the balance of the population and violates the rights of girls." },
      { question: "Name two viral and one bacterial sexually transmitted disease that the workers may have mentioned.", answer: "Viral: HIV-AIDS and genital warts. Bacterial: gonorrhoea (or syphilis).", explanation: "Bacterial STDs can be treated with antibiotics; there is no complete cure for AIDS." },
      { question: "Suggest two steps the village can take to protect girl children and health.", answer: "Spread awareness and education about equal value of girls and boys and about the law banning sex determination; report illegal clinics; ensure equal opportunities for girls; promote safe practices such as condom use and early treatment for STDs.", explanation: "Social attitudes have to change along with enforcement of the law." }
    ]
  }
];
