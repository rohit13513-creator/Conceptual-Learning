import type { LongQuestion, CompetencyQuestion } from "../types-custom";

// ── LONG ANSWER QUESTIONS (5 marks each) ──
export const TISSUES9_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Life begins from a single cell. Explain, step by step, how cells build up into a whole organism. What is division of labour, and why is it useful to a body?",
    markingScheme: ["A cell is the basic unit of life; a tissue is a group of similar cells that work together to do one job -- 1 mark", "Tissues combine to form organs, organs combine to form organ systems, and organ systems together form an organism -- 1 mark", "In a unicellular organism like an amoeba, one cell does every job of life; in a multicellular organism, different groups of cells take on different jobs -- 1 mark", "Division of labour: making different tissues for different jobs raises the efficiency of the body and lets it carry out complex life processes -- 1 mark", "Examples: in animals, muscle tissue gives movement and nervous tissue carries messages; in plants, xylem carries water and minerals while phloem carries food -- 1 mark"],
    answerParts: [
      { part: "Basic unit and tissue", text: "A cell is the basic unit of life. A tissue is a group of cells, similar in structure, that work together to perform a specific function." },
      { part: "Building up the levels", text: "More than one type of tissue comes together to form an organ. Different organs working together form an organ system. Different organ systems together form a complete organism." },
      { part: "One cell versus many cells", text: "In a unicellular organism such as an amoeba, a single cell performs all the functions of life. In a multicellular organism like a plant or an animal, different groups of cells perform different functions." },
      { part: "Division of labour", text: "Forming different types of tissues for different jobs is called division of labour. It raises the efficiency of the body and allows it to carry out complex life processes that a single cell alone could not manage." },
      { part: "Examples", text: "In animals, muscle tissue enables movement and nervous tissue carries messages to different parts of the body. In plants, xylem transports water and minerals, while phloem transports food to different parts of the plant." }
    ]
  },
  {
    id: 2,
    question: "Explain why the tissues of plants and animals are different, even though both are made of cells. Give reasons based on support, movement, nutrition and growth.",
    markingScheme: ["Most plants stay fixed in one place and need support to stay upright; plant cells have a cell wall that gives rigidity and strength -- 1 mark", "Most animals can move (a few, such as sponges, cannot); without a rigid cell wall, animal cells change shape easily, which suits movement -- 1 mark", "Mode of nutrition differs: animal tissues digest food obtained from outside; plant tissues use sunlight to make food by photosynthesis -- 1 mark", "Plants and animals have separate tissues for transporting food and water to different parts of the body, but these tissues are built differently -- 1 mark", "The tissues responsible for growth also differ in structure and function between plants and animals -- 1 mark"],
    answerParts: [
      { part: "Support and the cell wall", text: "Most plants are fixed in one place and do not move like animals. They need support to stay firm and upright. Plant cells have a cell wall that gives them rigidity and strength." },
      { part: "Movement", text: "Most animals can move from place to place, although a few, such as sponges, are immobile. Animal cells do not have a rigid cell wall, so they can change shape easily. This flexibility suits a body built for locomotion." },
      { part: "Nutrition", text: "Animals have tissues that help them digest food obtained from different food sources. Plants have tissues that help them use sunlight to make their own food through photosynthesis." },
      { part: "Transport", text: "Both plants and animals have distinct tissues for transporting food and water to different parts of the body, but the structure of these tissues is not the same in the two groups." },
      { part: "Growth", text: "The growth patterns of plants and animals also vary, because the tissues responsible for growth differ in structure and function between the two groups." }
    ]
  },
  {
    id: 3,
    question: "Name the three types of meristematic tissue in a plant and describe the work of each. Describe the onion root activity and explain what tree rings tell us.",
    markingScheme: ["Meristematic tissue is made of actively dividing cells; plants have three types: apical, lateral and intercalary -- 1 mark", "Apical meristem is at the tips of roots and shoots and increases length; onion activity: roots in Jar A keep growing, roots in Jar B stop growing once the tips are cut, showing that roots grow only from their tips -- 1 mark", "Lateral meristem is a ring of dividing cells around the stem; it adds new cells inside and outside, increasing the girth (thickness) of the stem -- 1 mark", "This activity produces annual growth rings in a tree trunk; wide rings show good growth years and narrow rings show poor growth years -- 1 mark", "Intercalary meristem is at the base of the internode, just above the node, and lets plants such as grass and hedges regrow after being cut or grazed -- 1 mark"],
    answerParts: [
      { part: "Meaning and the three types", text: "Growth in plants needs actively dividing cells, which together form a meristematic tissue. Plants have three types of meristematic tissue: apical, lateral and intercalary." },
      { part: "Apical meristem and the onion activity", text: "Apical meristem is located at the tips of roots and shoots and makes the plant grow in length. In the onion root activity, two onion bulbs are grown in jars of water and their root lengths are measured daily. When the root tip of Jar B is cut on day 3, its roots stop growing, while the roots in Jar A (uncut) keep growing. This shows that roots grow only from their tips, where cells divide continuously." },
      { part: "Lateral meristem", text: "Lateral meristem is a ring of actively dividing cells arranged around the stem. These cells divide and add new cells inside and outside in a concentric manner, increasing the diameter, or girth, of the stem." },
      { part: "Tree rings", text: "This activity of the lateral meristem produces the ring-like patterns, called annual growth rings, seen on the cut trunk of a tree. Wide rings reflect favourable growth conditions in that year and narrow rings reflect unfavourable conditions. By counting these rings, scientists can estimate the age of the tree and the climate it grew in." },
      { part: "Intercalary meristem", text: "Intercalary meristem is located at the base of the internode, just above the node (the point where leaves or branches arise). It lets plants regrow after their tips are cut, which is why a trimmed hedge becomes bushy and grass grows back after mowing or grazing." }
    ]
  },
  {
    id: 4,
    question: "What is differentiation? Explain the difference between simple permanent tissue and complex permanent tissue, with one example of each.",
    markingScheme: ["Meristematic tissue keeps adding new cells; some new cells stay meristematic while others lose the ability to divide -- 1 mark", "Cells that lose the ability to divide change in structure and function and become specialised for jobs such as support, transport or storage; this process is called differentiation -- 1 mark", "Simple permanent tissue is made of only one type of cell, for example parenchyma, collenchyma or sclerenchyma -- 1 mark", "Complex permanent tissue is made of more than one type of cell working together, for example xylem or phloem -- 1 mark", "Overall difference: a simple tissue does one job with one kind of cell, while a complex tissue is a team of different cells working together to carry out a shared job -- 1 mark"],
    answerParts: [
      { part: "How new cells arise", text: "Due to continuous cell division, meristematic tissue keeps adding new cells to the plant body. Some of these newly formed cells remain meristematic, while others lose the ability to divide." },
      { part: "Differentiation", text: "The cells that lose the ability to divide undergo changes in structure and function and become permanent tissue, specialised to perform specific jobs such as support, transport or storage. This process, by which meristematic tissue becomes specialised, is called differentiation." },
      { part: "Simple permanent tissue", text: "A simple permanent tissue is made of only one type of cell. Parenchyma, collenchyma and sclerenchyma are all simple permanent tissues." },
      { part: "Complex permanent tissue", text: "A complex permanent tissue is made of more than one type of cell working together as a team. Xylem and phloem are complex permanent tissues, since each contains several kinds of cells with related jobs." },
      { part: "Overall difference", text: "In a simple permanent tissue, a single kind of cell repeats itself to do one job. In a complex permanent tissue, several different kinds of cells work together, each contributing to a shared function such as transporting water or food." }
    ]
  },
  {
    id: 5,
    question: "Describe the structure, function and one example of parenchyma, collenchyma and sclerenchyma. Why are coconut husk fibres hard while coriander leaf stalks are soft and flexible?",
    markingScheme: ["Parenchyma: living cells with thin walls, loosely packed with gaps between them; stores food and does photosynthesis; example, air spaces in water plants help them float -- 1 mark", "Collenchyma: living cells with unevenly thickened corners due to pectin; gives support and flexibility; example, stems and tendrils bend without breaking -- 1 mark", "Sclerenchyma: mostly dead cells with thick walls due to lignin; gives strength; example, coconut husk and walnut shell -- 1 mark", "Coconut husk fibre is hard and brittle because it is made of sclerenchyma, dead cells with thick lignified walls -- 1 mark", "Coriander leaf stalk is soft and flexible because it is made mostly of living parenchyma and collenchyma cells with thin or only slightly thickened walls -- 1 mark"],
    answerParts: [
      { part: "Parenchyma", text: "Parenchyma consists of living cells with thin walls, loosely packed with gaps (intercellular spaces) between them. It mainly stores food, and also carries out photosynthesis in the green parts of a plant. In water plants, a special form of parenchyma forms air spaces that help the plant float." },
      { part: "Collenchyma", text: "Collenchyma consists of living cells with unevenly thickened corners, due to a flexible chemical called pectin. This tissue gives support along with flexibility, letting parts like stems and tendrils bend without breaking." },
      { part: "Sclerenchyma", text: "Sclerenchyma cells have thick walls due to a chemical called lignin, and most of these cells are dead. This makes the tissue hard and strong. It is found in stems, leaf veins and hard coverings such as coconut husk and walnut shell." },
      { part: "Why coconut husk fibre is hard", text: "Coconut husk fibre is hard and brittle because it is made of sclerenchyma cells, which are dead and have thick, lignified walls." },
      { part: "Why coriander stalk is soft", text: "A coriander leaf stalk is soft and flexible because it is made mostly of living parenchyma and collenchyma cells, which have thin or only slightly thickened walls and are not lignified." }
    ]
  },
  {
    id: 6,
    question: "Describe the epidermis of a plant, including the cuticle, stomata and root hairs. How do these parts help in protection and in transpiration?",
    markingScheme: ["Epidermis forms the outermost layer of the plant body; a tightly packed single layer of flat, rectangular cells -- 1 mark", "It protects the plant from mechanical injury, water loss, harmful microorganisms and harsh weather -- 1 mark", "Cuticle: a waxy layer of cutin covering the epidermis, thicker in plants living in very dry places to reduce water loss -- 1 mark", "Root hairs: hair-like projections from epidermal cells in roots, increasing surface area for absorbing water and minerals -- 1 mark", "Stomata: pores in the leaf epidermis for gas exchange and for transpiration (evaporation of water vapour), which creates a transpiration pull in xylem and helps remove waste -- 1 mark"],
    answerParts: [
      { part: "Structure of the epidermis", text: "The epidermis forms the outermost layer of the plant body. It consists of a tightly packed, single layer of flat and rectangular cells." },
      { part: "Protection", text: "The epidermis protects all parts of the plant from mechanical injury, water loss, harmful microorganisms and harsh environmental conditions." },
      { part: "Cuticle", text: "The epidermal cells are covered with a waxy layer called cuticle. In plants living in very dry habitats, the cuticle may be thicker, to cut down water loss during transpiration." },
      { part: "Root hairs", text: "In roots, hair-like projections arise from epidermal cells. These are called root hairs. They increase the surface area for absorbing water and minerals from the soil." },
      { part: "Stomata and transpiration", text: "In leaves, the epidermis contains pores called stomata. Apart from letting gases in and out, stomata allow transpiration, the evaporation of water vapour from the plant. Transpiration helps pull water upward by creating a transpiration pull in the xylem, and it also helps remove waste from the plant body." }
    ]
  },
  {
    id: 7,
    question: "Describe the structure of xylem. What are its functions, and how does transpiration help pull water upward through it?",
    markingScheme: ["Xylem is a complex permanent tissue that transports water and minerals from the roots to other parts of the plant; it also gives strength -- 1 mark", "It is made of tracheids, vessels, xylem parenchyma and xylem fibres -- 1 mark", "Tracheids and vessels are tubular and thick-walled; xylem parenchyma is the only living part, while tracheids, vessels and fibres are mostly sclerenchymatous -- 1 mark", "Water evaporates from the leaf through stomata (transpiration), which pulls more water upward through the xylem, called the transpiration pull -- 1 mark", "This lets water travel against gravity, from the roots up to the leaves of even tall trees -- 1 mark"],
    answerParts: [
      { part: "Function", text: "Xylem is the tissue that transports water and minerals from the roots to other parts of the plant. It also provides strength to the plant body." },
      { part: "Cell types", text: "Xylem consists of tracheids, vessels, xylem parenchyma and xylem fibres." },
      { part: "Structure of the cells", text: "Tracheids and vessels are tubular and thick-walled, and along with xylem fibres, are mostly sclerenchymatous (dead, hard-walled). Xylem parenchyma is the only living component of xylem." },
      { part: "Transpiration pull", text: "Water vapour escapes from the leaf through the stomata, in the process called transpiration. This creates a pull, called the transpiration pull, which draws more water upward through the xylem to replace what was lost." },
      { part: "Water moving upward", text: "The transpiration pull is strong enough to move water against gravity, all the way from the roots to the leaves at the top of even a tall tree, through the connected column of xylem cells." }
    ]
  },
  {
    id: 8,
    question: "Describe the structure of phloem. What is its function, and what role do companion cells play in it?",
    markingScheme: ["Phloem is a complex permanent tissue that transports food from the leaves to other parts of the plant -- 1 mark", "It is mostly made up of living cells, unlike xylem -- 1 mark", "It consists of sieve tubes, companion cells, phloem parenchyma and phloem fibres -- 1 mark", "Sieve tubes are long, tubular cells joined end to end by perforated walls, forming the path along which food moves -- 1 mark", "Companion cells are specialised parenchyma cells that regulate the sieve tube cells, mainly by monitoring the loading and unloading of sugars in the sieve tubes -- 1 mark"],
    answerParts: [
      { part: "Function", text: "Phloem is the tissue that transports food prepared in the leaves to other parts of the plant." },
      { part: "Mostly living cells", text: "Unlike xylem, phloem is mostly made up of living cells." },
      { part: "Cell types", text: "Phloem consists of sieve tubes, companion cells, phloem parenchyma and phloem fibres." },
      { part: "Sieve tubes", text: "Some cells are long and tubular and are joined end to end by perforated walls. These cells form the sieve tubes, which transport food from the leaves to other parts of the plant." },
      { part: "Companion cells and other parts", text: "The cellular functions of the sieve tube cells are regulated by companion cells, which are specialised parenchyma cells. Their main job is to monitor the loading and unloading of sugars in the sieve tubes. Phloem parenchyma stores food materials, resin, tannins and latex, while phloem fibres support the sieve tubes and provide strength." }
    ]
  },
  {
    id: 9,
    question: "Plant tissues do not work alone but are organised into tissue systems. Name the three tissue systems in a plant and describe what each one is made of and what it does.",
    markingScheme: ["Plant tissues are organised into larger groups called tissue systems, which work together -- 1 mark", "Dermal tissue system: forms the outer covering of the plant -- 1 mark", "It protects the inner parts of the plant and reduces water loss -- 1 mark", "Ground tissue system: forms the main body of the plant between the dermal and conducting tissues, and includes parenchyma, collenchyma and sclerenchyma -- 1 mark", "Vascular tissue system: consists of the conducting tissues, xylem and phloem -- 1 mark"],
    answerParts: [
      { part: "Why tissue systems", text: "Plant tissues for protection, support and conduction do not work alone. They are organised together into larger groups called tissue systems." },
      { part: "Dermal tissue system", text: "The dermal tissue system forms the outer covering of the plant." },
      { part: "Job of the dermal system", text: "It protects the inner parts of the plant and reduces water loss." },
      { part: "Ground tissue system", text: "The ground tissue system forms the main body of the plant, lying between the dermal and the conducting tissues. It includes parenchyma, collenchyma and sclerenchyma." },
      { part: "Vascular tissue system", text: "The vascular tissue system consists of the conducting tissues of the plant, namely xylem and phloem." }
    ]
  },
  {
    id: 10,
    question: "Describe F. C. Steward's carrot experiment on totipotency. What effect did light, air and the type of nutrient medium (liquid or solid) have on the growth of the cultured cells?",
    markingScheme: ["In 1958, F. C. Steward grew single cells from the phloem of a carrot in a nutrient medium with simple sugars and hormones -- 1 mark", "The cells first dedifferentiated (regained the ability to divide) to form an unspecialised mass of cells -- 1 mark", "With the right nutrients and growth chemicals, these cells redifferentiated and divided to form roots, shoot and eventually a whole plant; this ability is called totipotency -- 1 mark", "Effect of medium: growth increased about 20 percent in a liquid medium with both light and air; growth was reduced in a solid medium, and also reduced in a liquid medium with air but no light -- 1 mark", "Conclusion: the cells needed both light and air along with a liquid medium for the best growth, since a liquid medium likely lets nutrients and gases reach the cells more easily -- 1 mark"],
    answerParts: [
      { part: "The experiment", text: "In 1958, F. C. Steward showed that even single cells taken from the phloem of a carrot could regenerate a whole plant. He grew these phloem cells in a nutrient medium containing simple sugars and hormones under suitable conditions." },
      { part: "Dedifferentiation", text: "The phloem cells first dedifferentiated: they regained the ability to divide and formed an unspecialised mass of cells." },
      { part: "Redifferentiation and totipotency", text: "When grown with the right nutrients and growth chemicals, this mass of cells further divided and redifferentiated to form roots, shoot and, eventually, a complete plant. This ability of a mature cell to dedifferentiate, divide and redifferentiate into a new plant is called totipotency." },
      { part: "Effect of light, air and medium", text: "The highest growth, about 20 percent increase in fresh weight, was seen in a liquid nutrient medium with both light and air. Growth was reduced in a solid medium with light but no air, and it was also reduced in a liquid medium with air but no light." },
      { part: "What this tells us", text: "The cells grew best with both light and air, and in a liquid medium. This suggests the cells need light (for making food) and air (for gas exchange), like normal plant cells, and that a liquid medium probably lets nutrients and gases reach the cells more easily than a solid one." }
    ]
  },
  {
    id: 11,
    question: "What is crown gall disease? Explain how the study of this disease and the bacterium that causes it has been useful to science.",
    markingScheme: ["Crown gall disease is a plant disease in which tumour-like swellings develop on the stems -- 1 mark", "These swellings are caused by rapid and uncontrolled cell division -- 1 mark", "The disease is caused by a bacterium called Agrobacterium tumefaciens -- 1 mark", "Scientists studied how this bacterium transfers its genetic material into plant cells, rather than only trying to cure the disease -- 1 mark", "This knowledge is now used in plant tissue culture and genetic engineering, to introduce useful genes into plants for better crops, valuable phytochemicals and disease resistance -- 1 mark"],
    answerParts: [
      { part: "What the disease looks like", text: "Crown gall disease is a disease observed in plants, in which tumour-like swellings develop on the stems." },
      { part: "Cause of the swellings", text: "These swellings develop due to rapid and uncontrolled cell division in the affected tissue." },
      { part: "The bacterium", text: "The disease is caused by a bacterium called Agrobacterium tumefaciens." },
      { part: "How scientists studied it", text: "Instead of only trying to cure the disease, scientists studied how this bacterium transfers its genetic material into plant cells." },
      { part: "Useful application", text: "This knowledge was later put to use in plant tissue culture and genetic engineering. Agrobacterium is now used as a tool to introduce useful genes into plants, to produce valuable phytochemicals, improved crops and disease-resistant varieties." }
    ]
  },
  {
    id: 12,
    question: "Name the five types of epithelial tissue found in the body. For each type, describe its structure, its function and one place where it is found.",
    markingScheme: ["Exchange type: single layer of thin, flat cells; helps rapid diffusion of gases and liquids; found lining blood vessels and lungs -- 1 mark", "Protective type: many layers of cells, outer cells flat and tightly packed; protects underlying tissue from injury, friction and microbes; found in skin, mouth and food pipe -- 1 mark", "Secretory type: cells specialised for producing and releasing substances, may be cuboidal or columnar; found in salivary glands, sweat glands and stomach lining -- 1 mark", "Sensory type: specialised receptor cells with hair-like cilia; helps in smell, taste, sound and balance; found in nostrils, taste buds and inner ear -- 1 mark", "Absorptive type: single layer of tall, pillar-like cells, often with hair-like structures; helps efficient uptake of nutrients and water; found lining the small intestine -- 1 mark"],
    answerParts: [
      { part: "Exchange type", text: "Structure: a single layer of thin, flat cells. Function: helps in rapid diffusion of gases and liquids. Location: lining of blood vessels and lungs." },
      { part: "Protective type", text: "Structure: many layers of cells, with the outer cells flat and tightly packed. Function: protects underlying tissue from mechanical injury, friction and the entry of microbes. Location: skin, mouth and oesophagus (food pipe)." },
      { part: "Secretory type", text: "Structure: cells specialised for producing and releasing substances, which may be cuboidal or columnar in shape. Function: production and secretion of mucus, enzymes, hormones, sweat or saliva. Location: salivary glands, sweat glands and stomach lining." },
      { part: "Sensory type", text: "Structure: specialised receptor cells with hair-like cilia. Function: sensory jobs such as smell, taste, sound and balance. Location: nostrils, taste buds and the inner ear." },
      { part: "Absorptive type", text: "Structure: a single layer of tall, pillar-like cells, often with hair-like structures. Function: efficient uptake of nutrients, water and other substances. Location: lining of the small intestine." }
    ]
  },
  {
    id: 13,
    question: "Blood, bone, cartilage, tendon and ligament are all connective tissues. Compare their matrix and their function.",
    markingScheme: ["A connective tissue connects and supports other tissues of the body; blood and bone are both connective tissues but differ in matrix -- 1 mark", "Blood has a watery, soft and jelly-like matrix (plasma); it transports nutrients, gases and hormones; RBCs, WBCs and platelets are its formed elements -- 1 mark", "Bone has a hard, solid and rigid matrix, containing calcium and phosphorus compounds; it gives strength, support and protection -- 1 mark", "Cartilage has a soft, jelly-like matrix; it provides flexibility and cushions the ends of bones for shock absorption -- 1 mark", "Tendons connect muscle to bone and bring about movement; ligaments connect bone to bone, provide stability and limit movement, helping prevent dislocation -- 1 mark"],
    answerParts: [
      { part: "What makes a tissue connective", text: "A tissue that connects and supports other tissues is called a connective tissue. Blood and bone are both connective tissues, though they differ greatly in composition and consistency." },
      { part: "Blood", text: "Blood has a matrix called plasma, which is watery, soft and jelly-like. It transports nutrients, gases and hormones around the body. Its formed elements are red blood cells, white blood cells and platelets." },
      { part: "Bone", text: "Bone has a hard, solid and rigid matrix, containing calcium and phosphorus compounds. This gives bone strength, support and the ability to protect the body." },
      { part: "Cartilage", text: "Cartilage has a soft, jelly-like matrix. It provides flexibility and cushions the ends of bones, absorbing shocks at joints." },
      { part: "Tendons and ligaments", text: "Tendons connect muscle to bone and bring about movement when the muscle contracts. Ligaments connect bone to bone; they provide stability, limit movement and help prevent dislocation of a joint." }
    ]
  },
  {
    id: 14,
    question: "Name the three types of muscle found in the body. Describe the structure of each type and say whether its movements are voluntary or involuntary.",
    markingScheme: ["Skeletal muscle: long, cylindrical, unbranched, multinucleate and striated fibres, attached to the skeleton -- 1 mark", "Skeletal muscle brings about voluntary movements, under our conscious control, such as running or writing -- 1 mark", "Smooth muscle: spindle-shaped cells with a single nucleus and no striations, found in organs like the stomach and intestine -- 1 mark", "Smooth muscle brings about involuntary movements, such as the slow, continuous movement of food in the intestine -- 1 mark", "Cardiac muscle: found only in the heart, cylindrical and branched fibres with a single nucleus and faint striations; works involuntarily, tirelessly and rhythmically without fatigue -- 1 mark"],
    answerParts: [
      { part: "Skeletal muscle structure", text: "Skeletal muscles are attached to the skeleton. They are made up of bundles of long, cylindrical cells called muscle fibres, which are unbranched, multinucleate (having many nuclei) and striated (showing light and dark bands)." },
      { part: "Skeletal muscle and voluntary movement", text: "Skeletal muscles carry out voluntary movements, which are under our conscious control, such as running, writing or lifting objects." },
      { part: "Smooth muscle structure", text: "Smooth muscles are found in organs like the stomach and intestines. Their cells are spindle-shaped, have a single nucleus and lack striations." },
      { part: "Smooth muscle and involuntary movement", text: "Smooth muscles bring about involuntary movements that occur automatically, without conscious control, such as the slow, continuous movement of food through the intestine." },
      { part: "Cardiac muscle", text: "Cardiac muscles are found only in the heart. Their fibres are cylindrical and branched, with a single nucleus and faint striations. They work involuntarily, contracting tirelessly and rhythmically, enabling the heart to beat throughout life without fatigue." }
    ]
  },
  {
    id: 15,
    question: "Describe the structure of a neuron. How does nervous tissue help the body sense, communicate and respond?",
    markingScheme: ["Nervous tissue forms the body's control and coordination network; its cells are called neurons, specialised to receive, process and transmit messages -- 1 mark", "Cell body: contains the nucleus and controls the activities of the cell -- 1 mark", "Dendrites: receive signals from other neurons -- 1 mark", "Axon: a long fibre that carries messages away from the cell body, ending at axon terminals that pass the message to other cells -- 1 mark", "The brain acts as the control centre, coordinating activities, memory and responses; muscles cannot work on their own, they receive instructions from nervous tissue -- 1 mark"],
    answerParts: [
      { part: "What nervous tissue does", text: "Actions such as pulling a hand away from something hot, or remembering something learned long ago, are controlled by nervous tissue, the body's control and coordination network. Its cells, called neurons or nerve cells, are specialised to receive, process and transmit messages." },
      { part: "Cell body", text: "Each neuron has a cell body, which contains the nucleus and controls the activities of the cell." },
      { part: "Dendrites", text: "Dendrites are branch-like parts of the neuron that receive signals from other neurons." },
      { part: "Axon", text: "The axon is a long fibre that carries messages away from the cell body. It ends at axon terminals, which transmit the messages to other cells." },
      { part: "The brain and muscles", text: "The brain acts as the control centre, coordinating activities, memory and responses across the body. Muscles, whether voluntary or involuntary, cannot function on their own; they receive instructions from nervous tissue. For example, during exercise, the brain signals the heart to beat faster to meet the body's increased oxygen demand." }
    ]
  },
  {
    id: 16,
    question: "What is the musculoskeletal system made of? Explain how tendons help transmit the force of a muscle to a bone, resulting in movement.",
    markingScheme: ["The musculoskeletal system is made up of bones, muscles, joints, cartilage, tendons and ligaments -- 1 mark", "It helps the body stand upright, move, keep posture and protect delicate organs -- 1 mark", "It works under the control of the nervous system -- 1 mark", "Muscles are attached to bones by strong, flexible bands called tendons -- 1 mark", "When a muscle contracts, the tendon transmits this force to the bone, resulting in movement at a joint -- 1 mark"],
    answerParts: [
      { part: "What it is made of", text: "The musculoskeletal system is made up of bones, muscles, joints, cartilage, tendons and ligaments." },
      { part: "What it does", text: "This system helps the body stand upright, move, maintain posture and protect delicate organs." },
      { part: "Control", text: "The musculoskeletal system functions under the control of the nervous system." },
      { part: "Tendons", text: "Muscles pull on bones to produce movement. They are attached to bones by strong, flexible bands called tendons." },
      { part: "Transmitting force", text: "When a muscle contracts, the tendon transmits this force to the bone, resulting in movement at a joint. Without tendons, the pulling force of a contracting muscle could not be carried efficiently to the bone." }
    ]
  },
  {
    id: 17,
    question: "Name the four types of joints in the body. For each type, give one example and describe the kind of movement it allows.",
    markingScheme: ["A joint is a junction between two or more bones; joints allow movement but cannot move bones on their own -- 1 mark", "Ball and socket joint: shoulder; the rounded top of the upper arm bone fits into a shallow hollow, allowing forward, backward, sideways and circular movement -- 1 mark", "Hinge joint: elbow (also knee); bends and straightens in one direction only, like a door hinge -- 1 mark", "Pivot joint: neck, where the skull meets the backbone; allows the head to move side to side, like a doorknob turning in its socket -- 1 mark", "Fixed joint: skull; the bones are joined so they cannot move at all, keeping the brain safe -- 1 mark"],
    answerParts: [
      { part: "What a joint is", text: "A joint is a junction between two or more bones. Joints allow movement, but they cannot move the bones on their own; muscles pulling through tendons do that." },
      { part: "Ball and socket joint", text: "In the shoulder joint, the rounded top of the upper arm bone fits into a shallow hollow of the shoulder bone. This ball and socket joint allows forward, backward, sideways and circular movements." },
      { part: "Hinge joint", text: "The elbow bends and straightens in one direction only, like a door hinge. This is called a hinge joint. A similar hinge joint is present in the knee, where the kneecap protects the joint." },
      { part: "Pivot joint", text: "The skull is connected to the backbone through a pivot joint, which allows the head to move side to side, like a doorknob turning in its socket." },
      { part: "Fixed joint", text: "The bones of the skull are connected by fixed joints, meaning the bones of the skull cannot move. This keeps the brain safe even when the rest of the body moves." }
    ]
  },
  {
    id: 18,
    question: "What is the skeletal system made of? Explain how the structure of the rib cage allows breathing.",
    markingScheme: ["The skeletal system is a framework of bones that gives strength and protects delicate internal organs, and includes the skull, vertebral column and rib cage -- 1 mark", "The vertebral column (backbone) is a flexible column of small bones called vertebrae, supporting the body and letting it stand upright -- 1 mark", "A cartilage disc between each vertebra cushions it and allows bending and twisting without injuring the spinal cord -- 1 mark", "The rib cage is formed by 12 pairs of ribs, joined to the spine at the back and the breastbone in front by flexible cartilage; it protects organs such as the heart and lungs -- 1 mark", "This flexible joining lets the rib cage expand and contract during breathing, increasing and decreasing the space in the chest so air moves in and out of the lungs -- 1 mark"],
    answerParts: [
      { part: "The skeletal system", text: "The skeletal system consists of a framework of bones that provides strength and protects delicate internal organs. It includes the skull, the vertebral column and the rib cage." },
      { part: "Vertebral column", text: "From the base of the skull extends a flexible column called the backbone, or vertebral column, made up of a series of small bones called vertebrae. It supports the body and helps us stand upright." },
      { part: "Cartilage discs", text: "Between each vertebra is a cartilage disc, which acts as a cushion and allows flexibility, so we can bend and twist without injuring the spinal cord inside." },
      { part: "Rib cage structure", text: "There are 12 pairs of ribs, and together they form the rib cage, which acts like a protective cage for vital organs such as the heart and lungs. The ribs are attached to the spine at the back and to the breastbone (sternum) in the front, joined by flexible cartilage." },
      { part: "Rib cage and breathing", text: "This flexibility allows the rib cage to expand and contract during breathing. This movement increases and decreases the space in the chest, allowing air to move in and out of the lungs. An injury to the ribs can make breathing painful and difficult." }
    ]
  },
  {
    id: 19,
    question: "Compare plant tissues and animal tissues overall. Bring out the differences in rigidity, growth and movement.",
    markingScheme: ["Plant cells have a rigid cell wall giving strength and support; animal cells lack a rigid wall and can change shape easily -- 1 mark", "Plants stay fixed in place and their tissues are built for support, not locomotion; animal tissues, such as muscle, are built for movement -- 1 mark", "Plant growth continues through life at meristems (apical, lateral, intercalary); most animal tissues stop active division once the body reaches its adult size -- 1 mark", "Plant tissues can be simple (one cell type) or complex (more than one cell type); animal tissues are of four broad kinds, epithelial, connective, muscular and nervous, each built differently for its job -- 1 mark", "Both plant and animal tissues show division of labour and have transport tissues (xylem/phloem in plants, blood in animals), but the underlying cell structure differs to suit each group's way of life -- 1 mark"],
    answerParts: [
      { part: "Rigidity", text: "Plant cells have a cell wall, which gives strength and rigidity, keeping the plant upright. Animal cells have no rigid cell wall, so animal tissues can change shape easily." },
      { part: "Support versus movement", text: "Since plants stay fixed in place, plant tissues are largely built for support and standing upright. Animals mostly move about, so animal tissues, such as muscle, are built to allow locomotion." },
      { part: "Growth", text: "Plants keep growing throughout life, through meristematic tissue at the tips (apical), around the stem (lateral) and at the base of internodes (intercalary). Most animal tissues stop dividing rapidly once the body reaches its adult size." },
      { part: "Kinds of tissue", text: "Plant permanent tissue can be simple, made of one type of cell, or complex, made of more than one type of cell working together. Animal tissue is of four broad kinds, epithelial, connective, muscular and nervous, each with a structure suited to its own job." },
      { part: "What is similar", text: "Both plants and animals show division of labour among their tissues, and both have tissues for transport, xylem and phloem in plants, and blood in animals. Even so, the exact cell structure of each tissue differs, because it must suit each group's very different way of life." }
    ]
  },
  {
    id: 20,
    question: "The table below gives the age of a teak tree, the diameter of its stem (DBH) and the number of annual rings formed. (i) Interpret the trend in the graph you would plot. (ii) What is the relation between diameter and the number of annual rings? (iii) Which tissue is responsible for the girth of the stem, and where is it located?",
    markingScheme: ["The diameter of the stem increases steadily as the age of the tree increases -- 1 mark", "The number of annual rings also increases steadily with age -- 1 mark", "The diameter and the number of annual rings increase roughly in step with each other, at every age given -- 1 mark", "This means one annual ring corresponds to roughly the same, steady increase in diameter each year -- 1 mark", "The lateral meristem, located as a ring around the stem, is responsible for this increase in girth -- 1 mark"],
    answerParts: [
      { part: "Trend in diameter", text: "As the age of the teak tree increases from 5 to 40 years, the diameter (DBH) of its stem also increases steadily, from 4 cm to 40 cm." },
      { part: "Trend in annual rings", text: "The number of annual rings formed also increases steadily with age, from 5 rings at 5 years to 40 rings at 40 years." },
      { part: "Relation between the two", text: "The diameter of the stem and the number of annual rings increase roughly in step with each other. At every age given in the table, the diameter in centimetres is close to the number of rings." },
      { part: "What this means", text: "This shows that the tree adds roughly a similar amount of girth for each ring, or year, of growth, so counting the rings gives a good estimate of the age of the tree." },
      { part: "Tissue responsible", text: "The lateral meristem is responsible for the increase in girth of the stem. It is located as a ring of actively dividing cells around the stem, and it adds new cells inside and outside as the tree grows older." }
    ]
  },
  {
    id: 21,
    question: "In a forest, a tree was severely debarked by an elephant to get at the nutrients in the bark. (i) Which function of the tree is hampered by debarking? (ii) Which tissue would be affected by further damage to the trunk? (iii) What would happen if that tissue were severely damaged?",
    markingScheme: ["Debarking removes the outer protective covering, exposing the tissues just beneath the bark -- 1 mark", "The vascular tissue (xylem and phloem), which lies just beneath the bark, is exposed and can be damaged by further injury to the trunk -- 1 mark", "This hampers the transport of water and minerals (by xylem) and food (by phloem) to and from different parts of the tree -- 1 mark", "If the damage is severe, the tree may not get enough water, minerals or food to its parts, and it can eventually die -- 1 mark", "This shows how important the protective bark and the conducting tissues beneath it are to the survival of the tree -- 1 mark"],
    answerParts: [
      { part: "Function hampered by debarking", text: "Debarking removes the outer bark, which normally protects the tissues beneath it. Once the bark is gone, the protective covering of that part of the trunk is lost, and the tissues underneath are exposed to injury and infection." },
      { part: "Tissue at risk from further damage", text: "Just beneath the bark lies the vascular tissue, made up of xylem and phloem. Further damage to the trunk after debarking would affect this vascular tissue." },
      { part: "Why this matters", text: "Xylem transports water and minerals from the roots to the rest of the tree, while phloem transports food from the leaves to the rest of the tree. Damage to these tissues would hamper this transport." },
      { part: "If severely damaged", text: "If the vascular tissue beneath the bark is severely damaged, the movement of water, minerals and food through the tree would be seriously disrupted. If the damage is extensive enough, the tree may not get what it needs to survive, and it can eventually die." },
      { part: "Overall lesson", text: "This shows that the bark and the tissues just beneath it are essential to keeping a tree alive, since they carry out both protection and transport." }
    ]
  },
  {
    id: 22,
    question: "A young mango sapling's stem bends flexibly during monsoon winds and does not break. Which tissue gives it this flexibility? Predict what would happen if this tissue were replaced by sclerenchyma instead.",
    markingScheme: ["The tissue responsible for this flexibility is collenchyma -- 1 mark", "Collenchyma consists of living cells with unevenly thickened corners, due to pectin, which gives support along with flexibility -- 1 mark", "This lets the young stem and its parts bend in the wind without breaking -- 1 mark", "If sclerenchyma replaced collenchyma, the stem would be hard and inflexible, since sclerenchyma cells are mostly dead with thick, lignified walls -- 1 mark", "A hard, inflexible stem would tend to snap or break in strong wind rather than bend, since it could not absorb the bending force the way a flexible tissue can -- 1 mark"],
    answerParts: [
      { part: "Tissue responsible", text: "The flexibility of the young mango stem comes from collenchyma tissue." },
      { part: "Why collenchyma gives flexibility", text: "Collenchyma consists of living cells with unevenly thickened corners, due to the deposition of a chemical called pectin, which gives flexibility somewhat like rubber. This gives the tissue both support and flexibility." },
      { part: "Effect during monsoon winds", text: "Because of this flexible support, the stem and its parts can bend under the force of the wind without breaking, and then return towards their original position." },
      { part: "Prediction if replaced by sclerenchyma", text: "Sclerenchyma cells are mostly dead, with thick walls due to lignin, making the tissue hard and strong but not flexible. If collenchyma were replaced by sclerenchyma, the stem would become stiff and rigid." },
      { part: "Likely outcome", text: "A stiff, inflexible stem would not be able to bend with the wind the way the original flexible stem could. Instead of bending, it would be more likely to snap and break under the same monsoon winds." }
    ]
  },
  {
    id: 23,
    question: "Sohan tried to grow sugarcane from two types of cuttings, type A and type B. After a few weeks, only type B sprouted and grew into sugarcane plants. (i) Why did type B grow while type A did not? (ii) What difference was likely present between them? (iii) What should be measured to check the effect? (iv) What must be kept the same for a fair comparison?",
    markingScheme: ["Only cuttings with an intact node or bud, which contains meristematic tissue, are able to sprout -- 1 mark", "Type B cuttings must have had an intact node or bud with intercalary or axillary meristem tissue, while type A cuttings lacked this -- 1 mark", "This meristematic tissue has actively dividing cells, which is why only type B could regenerate new growth (shoots and roots) -- 1 mark", "To check the effect, the number of cuttings that sprouted, the time taken to sprout, and the length or growth of the resulting plants should be measured and compared -- 1 mark", "For a fair comparison, both types of cuttings should be of the same length, given the same amount of water, planted in the same type of soil, and kept under the same conditions -- 1 mark"],
    answerParts: [
      { part: "Why type B could sprout", text: "Sugarcane cuttings can only sprout if they contain an intact node or bud, since this is where the meristematic tissue that allows new growth is located." },
      { part: "Likely difference between type A and type B", text: "Type B cuttings must have had an intact node or bud containing intercalary or axillary meristem tissue, while type A cuttings likely lacked an intact node or bud, or had it damaged." },
      { part: "Why this makes the difference", text: "The meristematic tissue at the node contains actively dividing cells. Only a cutting that retains this tissue can produce new shoots and roots, so only type B was able to grow into a sugarcane plant." },
      { part: "What to measure", text: "To find out whether the difference in cuttings had an effect, one should measure the number of cuttings that sprouted, the time taken to sprout, and the growth (height or number of shoots) of the plants that did grow." },
      { part: "Conditions for a fair comparison", text: "For a fair comparison between type A and type B, both should be cut to the same length, given the same amount of water, planted in the same type of soil, and kept under the same conditions of light and temperature." }
    ]
  },
  {
    id: 24,
    question: "\"A tissue is a group of similar cells performing similar functions.\" One student argues this is always true, while another says it is only true for simple tissues, not for complex tissues. Explain who is right, with reasons.",
    markingScheme: ["A tissue is generally defined as a group of similar cells working together to perform a specific function -- 1 mark", "This is fully true for simple permanent tissues, such as parenchyma, collenchyma and sclerenchyma, which are each made of one kind of cell doing one job -- 1 mark", "It is not fully true for complex permanent tissues, such as xylem and phloem, since these are made of several different kinds of cells -- 1 mark", "In xylem, tracheids, vessels, xylem parenchyma and xylem fibres are different cell types with related but distinct jobs (conduction, storage, strength) working together -- 1 mark", "So the statement holds for simple tissues, but for complex tissues it must be understood as several kinds of cells working together toward one shared overall function, rather than identical cells doing an identical job -- 1 mark"],
    answerParts: [
      { part: "The general idea", text: "A tissue is usually described as a group of cells, similar in structure, that work together to perform a specific function." },
      { part: "Why it is true for simple tissues", text: "This description fits simple permanent tissues well. Parenchyma, collenchyma and sclerenchyma are each made of one kind of cell, and every cell in that tissue does much the same job, such as storage or support." },
      { part: "Why it needs care for complex tissues", text: "The description needs more care for complex permanent tissues, such as xylem and phloem, which are made of more than one type of cell." },
      { part: "Example", text: "Xylem contains tracheids, vessels, xylem parenchyma and xylem fibres. These are different kinds of cells: some conduct water, one type (xylem parenchyma) is living and stores substances, and others give strength. They are not identical cells doing an identical job, but different cells working as a team." },
      { part: "Conclusion", text: "The statement is correct for simple tissues, where the cells truly are similar and do the same job. For complex tissues, it is more accurate to say that different kinds of cells work together toward one shared overall function, such as conduction, rather than all cells being alike." }
    ]
  },
  {
    id: 25,
    question: "F. C. Steward showed that a single plant cell can be totipotent and regrow a whole carrot plant. Would you expect the same result if a single animal cell were cultured in the same way? Give reasons.",
    markingScheme: ["Totipotency is the ability of a cell to dedifferentiate, divide and redifferentiate into a whole new organism, as shown by Steward's carrot phloem cells -- 1 mark", "This ability is similar to how a zygote (fertilised egg) can divide and differentiate into a whole organism -- 1 mark", "A mature plant cell more easily shows totipotency, since many plant cells keep a fuller set of genetic instructions active and can redifferentiate under suitable nutrient and hormone conditions -- 1 mark", "Most mature animal cells are not expected to be totipotent so easily, since animal cells usually become specialised in a way that is harder to reverse once the body is fully formed -- 1 mark", "So the same simple totipotency experiment would not be expected to give a complete new animal from an ordinary adult animal cell, though special animal cells such as certain stem cells can still divide and produce new cells of a limited range of types -- 1 mark"],
    answerParts: [
      { part: "What totipotency showed in the carrot", text: "Steward's experiment showed that some mature plant cells, such as carrot phloem cells, are totipotent: they can dedifferentiate, divide and redifferentiate into a whole new plant when given suitable nutrients and hormones." },
      { part: "Comparison with a zygote", text: "This ability is similar to the way a zygote, a fertilised egg, can divide and differentiate into a complete new organism." },
      { part: "Why plant cells manage this more easily", text: "Many mature plant cells are able to show totipotency because they can be induced, under the right conditions, to give up their specialised role and start dividing again, eventually forming every part of a new plant." },
      { part: "Why this is not expected so easily in animal cells", text: "Most mature animal cells are not expected to be totipotent so easily. Once an animal cell becomes specialised, for example as a nerve or muscle cell, it is much harder to make it dedifferentiate and build an entire new animal from it." },
      { part: "Conclusion", text: "So culturing a single ordinary adult animal cell in the same way as Steward's carrot cells would not be expected to give a whole new animal. Even so, certain special animal cells, such as stem cells in bone marrow, can still divide and produce new cells, though only of a limited range of types, not a complete new organism." }
    ]
  }
];

// ── CASE-BASED QUESTIONS (4 marks each: 4 sub-questions of 1 mark) ──
export const TISSUES9_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "Onion Roots in Two Jars",
    caseDescription: "Priya sets up two jars, A and B, each with an onion bulb placed in water. She measures the length of the roots each day for three days. On day 3, she cuts about 1 cm off the root tips in jar B only, and then keeps measuring the roots in both jars for four more days.",
    subQuestions: [
      { question: "After day 3, what happens to the roots in jar B?", options: ["They keep growing at the same rate", "They stop growing", "They grow faster than before", "They turn into shoots"], correctIndex: 1, answer: "They stop growing", explanation: "The apical meristem, the actively dividing cells at the root tip, was removed when the tip was cut, so no new cells are added and the root stops growing." },
      { question: "Why do the roots in jar A keep growing normally?", answer: "Because their tips still have the apical meristem, whose actively dividing cells keep adding new cells.", explanation: "Since jar A's root tips were left uncut, the apical meristem there continues to divide, so the roots keep getting longer." },
      { question: "What is the growth zone at the tip of a root or shoot called?", answer: "The apical meristem.", explanation: "Apical meristems are located at the tips of roots and shoots and are made of actively dividing cells." },
      { question: "Does the apical meristem mainly increase the length or the girth of a root?", answer: "The length.", explanation: "Apical meristem increases the length of roots and shoots. Girth (thickness) is increased by a different tissue, the lateral meristem." }
    ]
  },
  {
    id: 2,
    caseTitle: "The Timber Yard Worker",
    caseDescription: "Ramesh works at a timber yard. Whenever a tree trunk is cut, he studies the ring-like pattern on the flat, cut surface of the wood before selling it, and from this he can guess how old the tree was and whether some years were dry or difficult for its growth.",
    subQuestions: [
      { question: "What are the ring-like patterns on a cut tree trunk called?", options: ["Growth spirals", "Annual growth rings", "Xylem knots", "Bark lines"], correctIndex: 1, answer: "Annual growth rings", explanation: "These ring-like patterns seen on the cut surface of a tree trunk are called annual growth rings." },
      { question: "Which meristem produces these rings?", answer: "The lateral meristem.", explanation: "The lateral meristem is a ring of dividing cells around the stem that adds new cells inside and outside, producing the rings seen in the trunk." },
      { question: "What does a narrow ring generally tell Ramesh about that year's growth?", answer: "That the growing conditions were unfavourable that year.", explanation: "Narrow rings reflect unfavourable growth conditions, while wide rings reflect favourable ones." },
      { question: "Besides the age of the tree, what else can be learnt by studying the rings?", answer: "The climatic conditions the tree grew under in a given year.", explanation: "Scientists study the width of rings to understand the climate a tree experienced year by year, along with estimating its age." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Gardener's Hedge and Lawn",
    caseDescription: "Meena regularly trims the hedge around her garden and mows the lawn. She notices that after some days, the hedge becomes bushier than before, and fresh grass appears again in the mowed lawn.",
    subQuestions: [
      { question: "Which meristem lets the hedge and grass regrow after cutting?", options: ["Apical meristem", "Lateral meristem", "Intercalary meristem", "Cork cambium"], correctIndex: 2, answer: "Intercalary meristem", explanation: "Intercalary meristem, present at the nodes of stems such as grass, allows regrowth after cutting or grazing." },
      { question: "Where in the stem is the intercalary meristem located?", answer: "At the base of the internode, just above the node.", explanation: "This is the exact location described for intercalary meristem." },
      { question: "What is a node, on a plant stem?", answer: "The point on the stem where branches or leaves arise.", explanation: "The part of the stem between two nodes is called the internode." },
      { question: "Why does the hedge become bushier rather than simply growing back to its old shape?", answer: "Cutting removes the tip along with its apical meristem, so new branches sprout instead from the nodes below, giving the hedge a bushy look.", explanation: "Once the main growing tip is cut, new branches arise from the nodes, and many new branches together make the hedge appear bushy." }
    ]
  },
  {
    id: 4,
    caseTitle: "A Doctor Explains Three Injuries",
    caseDescription: "Anil visits a doctor after a fall. The doctor examines him and explains three different possible injuries he could have: a broken bone (fracture), a torn ligament in the ankle, and a slipped disc in the back.",
    subQuestions: [
      { question: "A torn ligament is damage to the tissue that mainly connects", options: ["Bone to bone", "Muscle to bone", "Blood vessels to the heart", "Skin to muscle"], correctIndex: 0, answer: "Bone to bone", explanation: "A ligament connects bone to bone and helps limit movement, so a torn ligament weakens this connection." },
      { question: "What is the disc between two vertebrae made of, and what job does it do?", answer: "It is made of cartilage, and it cushions the vertebrae and allows flexibility of the spine.", explanation: "A cartilage disc between each vertebra acts as a cushion and allows bending and twisting without injuring the spinal cord." },
      { question: "Why might a fracture heal faster than damage to cartilage?", answer: "Bone has a good blood supply that speeds up repair, while cartilage has little or no direct blood supply, so it heals much more slowly.", explanation: "The richer blood supply to bone brings nutrients and repair cells quickly, unlike the poor blood supply to cartilage." },
      { question: "Which tissue connects the muscles around the ankle to the bone, and could also be hurt in this fall?", answer: "The tendon.", explanation: "Tendons connect muscle to bone and can be strained or injured along with ligaments and bones in a fall." }
    ]
  },
  {
    id: 5,
    caseTitle: "Sunita's Blood Test Report",
    caseDescription: "Sunita gets a blood test done. Her report lists the counts of red blood cells (RBCs), white blood cells (WBCs) and platelets, along with the volume of plasma in her blood.",
    subQuestions: [
      { question: "Which component of blood gives it its red colour?", options: ["Plasma", "Haemoglobin in RBCs", "Platelets", "WBCs"], correctIndex: 1, answer: "Haemoglobin in RBCs", explanation: "Haemoglobin is an iron-rich protein present in RBCs, and it gives blood its red colour." },
      { question: "Which blood component helps blood clot at the site of an injury?", answer: "Platelets.", explanation: "Platelets help in blood clotting at the site of an injury, forming a clot after some time." },
      { question: "Sunita's report shows a high WBC count along with a fever. What might this suggest?", answer: "It might suggest an infection somewhere in her body.", explanation: "WBCs collect at infected areas, which can cause inflammation, and sometimes fever, as the body fights the infection." },
      { question: "About how long does one RBC live before it needs to be replaced?", answer: "About 4 months.", explanation: "RBCs live for about 4 months and are replaced regularly by the body." }
    ]
  },
  {
    id: 6,
    caseTitle: "A Strained Tendon on the Field",
    caseDescription: "During a football match, Arjun feels a sharp pain near his knee after a sudden turn. The team physiotherapist checks him and says it looks like a strained tendon rather than an injury to the bone itself.",
    subQuestions: [
      { question: "What is the main job of a tendon?", options: ["Connect bone to bone", "Connect muscle to bone and transmit force", "Cushion the ends of bones", "Carry blood cells around the body"], correctIndex: 1, answer: "Connect muscle to bone and transmit force", explanation: "Tendons are strong, flexible bands that connect muscle to bone, and they transmit the force of a contracting muscle to the bone." },
      { question: "What happens at the joint if the tendon is injured badly enough?", answer: "The muscle's pulling force cannot be properly carried to the bone, so movement at that joint becomes painful or difficult.", explanation: "Since the tendon is the link between muscle and bone, damage to it disrupts how the force of the muscle reaches the bone." },
      { question: "How does a tendon differ from a ligament in what it connects?", answer: "A tendon connects muscle to bone, while a ligament connects bone to bone.", explanation: "This is the key structural difference between the two types of connective tissue found at a joint." },
      { question: "Why must tendons be tough and rope-like rather than soft and stretchy?", answer: "If a tendon stretched too much, some of the muscle's pulling force would be lost, making movement sluggish and imprecise.", explanation: "A tough, less stretchy tendon transmits the contracting muscle's force to the bone efficiently, giving quick, precise movement." }
    ]
  },
  {
    id: 7,
    caseTitle: "A Tissue Culture Lab Growing Orchids",
    caseDescription: "A laboratory grows thousands of identical orchid plants. Workers take tiny pieces of plant tissue and place them in sterile jars on a nutrient medium, where each piece slowly grows into a complete new plant.",
    subQuestions: [
      { question: "This method of growing many identical plants from small pieces of tissue is based on which property of plant cells?", options: ["Totipotency", "Photosynthesis alone", "Transpiration", "Lignification"], correctIndex: 0, answer: "Totipotency", explanation: "Totipotency is the ability of a cell to dedifferentiate, divide and redifferentiate into a whole new plant, which is exactly what happens in plant tissue culture." },
      { question: "What must a small piece of tissue first do, before it can grow into a whole new plant?", answer: "It must dedifferentiate, meaning its cells regain the ability to divide and form an unspecialised mass of cells.", explanation: "This unspecialised mass of cells then divides further and redifferentiates to form roots, shoot and a complete plant." },
      { question: "Name one commercial advantage of growing plants this way instead of from seeds.", answer: "It produces many identical, disease-free plants quickly.", explanation: "Tissue culture is also used to conserve rare or endangered plant species." },
      { question: "Which scientist first demonstrated this ability using carrot cells?", answer: "F. C. Steward.", explanation: "In 1958, F. C. Steward showed that single carrot phloem cells could regenerate a whole plant." }
    ]
  },
  {
    id: 8,
    caseTitle: "Swellings on a Farmer's Fruit Trees",
    caseDescription: "A farmer notices strange, tumour-like swellings on the stems of some of his fruit trees. He calls a plant expert, who examines the trees and identifies the problem as crown gall disease.",
    subQuestions: [
      { question: "Which organism causes crown gall disease?", options: ["A virus", "A fungus", "A bacterium called Agrobacterium tumefaciens", "An insect"], correctIndex: 2, answer: "A bacterium called Agrobacterium tumefaciens", explanation: "Crown gall disease in plants is caused by this bacterium." },
      { question: "What causes the tumour-like swellings to form on the stem?", answer: "Rapid and uncontrolled cell division in the affected tissue.", explanation: "The disease leads to cells dividing without proper control, forming the swellings." },
      { question: "How has studying this disease been useful beyond just treating it?", answer: "Scientists studied how the bacterium transfers its genetic material into plant cells, and this knowledge is now used in plant tissue culture and genetic engineering.", explanation: "Rather than only curing the disease, researchers used the bacterium's own method of gene transfer for other purposes." },
      { question: "Name one modern use of this knowledge in farming.", answer: "Introducing useful genes into plants for improved crops or disease-resistant varieties.", explanation: "Agrobacterium is now used as a tool to add valuable genes to crop plants." }
    ]
  },
  {
    id: 9,
    caseTitle: "A Physiotherapist and a Shoulder Injury",
    caseDescription: "After a shoulder injury, Rehan visits a physiotherapist. She explains that the shoulder is a ball and socket joint, and compares it with the hinge joint in his elbow and the fixed joint in his skull, to help him understand his recovery exercises.",
    subQuestions: [
      { question: "Which type of joint is the shoulder?", options: ["Hinge joint", "Pivot joint", "Ball and socket joint", "Fixed joint"], correctIndex: 2, answer: "Ball and socket joint", explanation: "In the shoulder, the rounded top of the upper arm bone fits into a shallow hollow, forming a ball and socket joint." },
      { question: "What movement does the ball and socket joint allow that the elbow's hinge joint does not?", answer: "Forward, backward, sideways and circular movement, not just bending in one direction.", explanation: "A hinge joint like the elbow only bends and straightens in one direction, while a ball and socket joint allows movement in many directions." },
      { question: "Why does the physiotherapist compare the shoulder to the elbow while explaining recovery exercises?", answer: "Because recovery exercises must match the joint's own type of movement, and the shoulder can move far more freely than the elbow.", explanation: "Understanding the type of joint helps in planning exercises that suit its natural range of movement." },
      { question: "Why can the skull's joints not be compared to the shoulder joint at all?", answer: "The bones of the skull are joined by fixed joints, which allow no movement, unlike the freely moving shoulder.", explanation: "Fixed joints keep the skull bones firmly joined to protect the brain, and they do not move at all." }
    ]
  },
  {
    id: 10,
    caseTitle: "A Science Fair Project on Transpiration",
    caseDescription: "For a science fair project, Divya covers a potted plant's leaves loosely with a clear plastic bag and leaves it in sunlight for a few hours. She then notices small water droplets forming on the inside of the bag.",
    subQuestions: [
      { question: "The water droplets inside the bag are mainly caused by which process?", options: ["Photosynthesis", "Transpiration", "Respiration", "Fertilisation"], correctIndex: 1, answer: "Transpiration", explanation: "Transpiration is the evaporation of water vapour from the plant, which then condenses as droplets inside the bag." },
      { question: "Through which structures in the leaf does this water vapour escape?", answer: "Through the stomata.", explanation: "Stomata are pores in the leaf epidermis that let gases in and out and let water vapour escape during transpiration." },
      { question: "How does transpiration help water move up through the plant?", answer: "It creates a transpiration pull, which draws water upward through the xylem.", explanation: "As water evaporates from the leaves, it pulls more water up from the roots through the xylem to replace it." },
      { question: "Name one other function transpiration serves for the plant, besides moving water upward.", answer: "It helps remove waste from the plant body.", explanation: "Along with creating the transpiration pull, this process also helps eliminate wastes from the plant." }
    ]
  },
  {
    id: 11,
    caseTitle: "Why the Heart Never Gets Tired",
    caseDescription: "A nursing student asks why the heart can keep beating for a whole lifetime without resting, while leg muscles get tired after a long run and need rest.",
    subQuestions: [
      { question: "Which type of muscle makes up the heart?", options: ["Skeletal muscle", "Smooth muscle", "Cardiac muscle", "Epithelial muscle"], correctIndex: 2, answer: "Cardiac muscle", explanation: "Cardiac muscle is found only in the heart." },
      { question: "Is the beating of the heart a voluntary or an involuntary movement?", answer: "Involuntary.", explanation: "The heart beats automatically, without conscious control, unlike voluntary movements such as running." },
      { question: "Describe the structure of cardiac muscle fibres.", answer: "Cylindrical and branched fibres, with a single nucleus and faint striations.", explanation: "This structure suits the heart's need for coordinated, continuous contraction." },
      { question: "How does cardiac muscle behave differently from skeletal muscle?", answer: "Cardiac muscle works tirelessly and rhythmically without fatigue, while skeletal muscle is voluntary and can get tired after continued use.", explanation: "This difference in behaviour matches their different jobs in the body." }
    ]
  },
  {
    id: 12,
    caseTitle: "A Group Debate on Tissues and Cell Types",
    caseDescription: "During a group discussion, one student says, \"A tissue always means one kind of cell doing one job.\" Another student disagrees and points to xylem as an example where this is not quite true.",
    subQuestions: [
      { question: "Which of these is a complex permanent tissue made of several types of cells?", options: ["Parenchyma", "Collenchyma", "Xylem", "Sclerenchyma"], correctIndex: 2, answer: "Xylem", explanation: "Xylem is a complex permanent tissue, made of tracheids, vessels, xylem parenchyma and xylem fibres." },
      { question: "Name the different cell types found in xylem.", answer: "Tracheids, vessels, xylem parenchyma and xylem fibres.", explanation: "These different cell types work together in xylem." },
      { question: "Why is xylem still considered one tissue, even with different cell types in it?", answer: "Because all these cell types work together toward one shared overall function, transporting water and minerals and giving strength.", explanation: "A complex tissue is defined by cells working together for a shared job, not by all its cells being identical." },
      { question: "Give one plant tissue for which the first student's statement (one kind of cell doing one job) is fully correct.", answer: "Any simple permanent tissue, such as parenchyma, collenchyma or sclerenchyma.", explanation: "Simple permanent tissues are each made of only one kind of cell doing one job." }
    ]
  },
  {
    id: 13,
    caseTitle: "The Coconut Fibre Industry",
    caseDescription: "A small industry collects coconut husks and processes the tough fibres found inside them to weave mats, ropes and doormats, which are sold in local markets.",
    subQuestions: [
      { question: "Which tissue in the coconut husk gives it the strength needed for making ropes and mats?", options: ["Parenchyma", "Collenchyma", "Sclerenchyma", "Epidermis"], correctIndex: 2, answer: "Sclerenchyma", explanation: "Sclerenchyma cells have thick, lignified walls, making the tissue hard and strong, ideal for tough fibres." },
      { question: "What chemical, deposited in the cell walls, makes this tissue so hard?", answer: "Lignin.", explanation: "Deposition of lignin in sclerenchyma cell walls makes them thick, hard and strong." },
      { question: "Are the cells of this tissue mostly living or mostly dead?", answer: "Mostly dead.", explanation: "Most sclerenchyma cells are dead, which suits their role as a hard, supporting tissue." },
      { question: "Why could living parenchyma not be used for the same rope-making purpose?", answer: "Parenchyma has thin walls and is soft, so it lacks the strength and toughness needed for making ropes and mats.", explanation: "Parenchyma is built for storage and photosynthesis, not for providing hard, fibre-like strength." }
    ]
  },
  {
    id: 14,
    caseTitle: "An Orthopaedic Case: Bone versus Cartilage",
    caseDescription: "An orthopaedic doctor tells a patient that his broken bone should heal in a few weeks, but the cartilage damage in his knee will take much longer to heal.",
    subQuestions: [
      { question: "Why does bone generally heal faster than cartilage?", options: ["Bone has a rich blood supply while cartilage has little or none", "Cartilage is harder than bone", "Bone cells never die", "Cartilage grows faster than bone"], correctIndex: 0, answer: "Bone has a rich blood supply while cartilage has little or none", explanation: "A good blood supply brings nutrients and repair cells quickly to bone, while cartilage's poor blood supply slows its healing." },
      { question: "What is the matrix of bone made of, that gives it strength?", answer: "A hard, rigid matrix containing calcium and phosphorus compounds.", explanation: "This mineral-rich matrix gives bone its strength and rigidity." },
      { question: "What is the matrix of cartilage like?", answer: "Soft and jelly-like.", explanation: "This soft, jelly-like matrix gives cartilage its flexibility and cushioning ability." },
      { question: "Besides cushioning joints, name one other place cartilage is found in the body.", answer: "Between the vertebrae of the backbone.", explanation: "Cartilage discs between vertebrae cushion them and allow the spine to bend and twist." }
    ]
  },
  {
    id: 15,
    caseTitle: "A Nature Club Studies a Stem Cross Section",
    caseDescription: "A nature club examines a thin cross section of a plant stem under a microscope. They try to label the outer covering, the main bulk in the middle, and the conducting strands as three different tissue systems.",
    subQuestions: [
      { question: "The outer covering layer they see belongs to which tissue system?", options: ["Dermal tissue system", "Ground tissue system", "Vascular tissue system", "Meristematic system"], correctIndex: 0, answer: "Dermal tissue system", explanation: "The dermal tissue system forms the outer covering of the plant." },
      { question: "Which tissue system forms the main bulk of the stem, between the outer covering and the conducting strands?", answer: "The ground tissue system.", explanation: "The ground tissue system lies between the dermal and vascular tissue systems and forms the main body of the plant." },
      { question: "Name the two tissues that make up the vascular tissue system they see as strands.", answer: "Xylem and phloem.", explanation: "The vascular tissue system consists of these two conducting tissues." },
      { question: "What job does the dermal tissue system do for the stem?", answer: "It protects the inner parts of the stem and reduces water loss.", explanation: "As the outer covering, the dermal tissue system shields the stem and helps prevent excess water loss." }
    ]
  },
  {
    id: 16,
    caseTitle: "An Elephant Damages a Tree's Bark",
    caseDescription: "Forest rangers find that an elephant has stripped away a large patch of bark from a tree to feed on the nutrients inside it, leaving part of the trunk exposed.",
    subQuestions: [
      { question: "Which tissue lying just beneath the bark is now exposed to further damage?", options: ["Epidermis of the leaf", "Vascular tissue (xylem and phloem)", "Meristematic tissue only", "Root hairs"], correctIndex: 1, answer: "Vascular tissue (xylem and phloem)", explanation: "The vascular tissue lies just beneath the bark, and debarking exposes it to injury." },
      { question: "Which two substances does this exposed tissue normally transport?", answer: "Water and minerals (by xylem) and food (by phloem).", explanation: "Xylem carries water and minerals, and phloem carries food, to different parts of the tree." },
      { question: "What could happen to the tree if this exposed tissue suffers further, severe damage?", answer: "The tree may not get enough water, minerals or food to its parts, and it can eventually die.", explanation: "Severe damage to the vascular tissue seriously disrupts the transport the tree depends on for survival." },
      { question: "What assumption is being made in saying the tree might die from this damage?", answer: "It assumes the damage is severe and widespread enough to seriously block transport; a smaller or less severe patch of damage might not have the same outcome.", explanation: "The severity and extent of the damage change how serious the effect on the tree will be." }
    ]
  },
  {
    id: 17,
    caseTitle: "Sugarcane Farmers and Their Cuttings",
    caseDescription: "Sugarcane farmers plant stem cuttings in their fields instead of seeds. They always make sure each cutting includes at least one healthy node before planting it.",
    subQuestions: [
      { question: "Why must each sugarcane cutting include a node?", options: ["The node contains meristematic tissue needed for new growth", "The node is the heaviest part of the stem", "The node prevents water loss", "The node contains no living cells"], correctIndex: 0, answer: "The node contains meristematic tissue needed for new growth", explanation: "A node has the meristematic tissue that allows the cutting to sprout new shoots and roots." },
      { question: "Which meristem, found at or near the node, allows the cutting to sprout?", answer: "Intercalary or axillary meristem.", explanation: "This meristematic tissue at the node is what allows the cutting to regenerate a new plant." },
      { question: "What would likely happen if a farmer planted a cutting with no node at all?", answer: "It would likely fail to sprout, since it would lack the meristematic tissue needed to grow new shoots and roots.", explanation: "Without an intact node, the cutting has no source of actively dividing cells to start new growth." },
      { question: "Name one condition that should be kept the same across all cuttings for a fair test of which ones grow best.", answer: "The same cutting length (or the same water, soil and growing conditions).", explanation: "Keeping other conditions the same lets farmers fairly judge whether the presence of a node made the real difference." }
    ]
  },
  {
    id: 18,
    caseTitle: "A Mango Sapling Bends in a Storm",
    caseDescription: "During a storm, Aamrapali watches a young mango sapling bend right over in strong wind and then spring back upright once the wind dies down, without any part of it breaking.",
    subQuestions: [
      { question: "Which tissue lets the young stem bend like this without breaking?", options: ["Sclerenchyma", "Collenchyma", "Xylem", "Epidermis"], correctIndex: 1, answer: "Collenchyma", explanation: "Collenchyma gives support along with flexibility, letting stems bend without breaking." },
      { question: "What chemical in collenchyma cell walls gives it this flexible, rubber-like quality?", answer: "Pectin.", explanation: "Pectin deposited at the unevenly thickened corners of collenchyma cells gives the tissue its flexibility." },
      { question: "What would most likely happen if this tissue were replaced by sclerenchyma?", answer: "The stem would become hard and inflexible, and would be more likely to snap in the wind instead of bending.", explanation: "Sclerenchyma is mostly dead, with thick lignified walls, making it hard and strong but not flexible." },
      { question: "Would an older, thicker part of the same mango tree bend as easily as this young stem?", answer: "No, older parts contain more hard, woody sclerenchyma tissue, so they are less flexible than a young, actively growing stem.", explanation: "As stems age, more sclerenchyma and lignified tissue develop, reducing flexibility compared to young growth." }
    ]
  },
  {
    id: 19,
    caseTitle: "Touching Something Hot: A Reflex Action",
    caseDescription: "In a science demonstration, a teacher touches a hot object very briefly and pulls the hand away almost instantly, before actually feeling any pain, to show how fast the body reacts to danger.",
    subQuestions: [
      { question: "Which tissue mainly senses the heat and triggers the quick pulling away of the hand?", options: ["Connective tissue", "Nervous tissue", "Epithelial tissue", "Muscular tissue alone"], correctIndex: 1, answer: "Nervous tissue", explanation: "Nervous tissue senses the heat and quickly sends signals that trigger the response, before the sensation of pain is even felt." },
      { question: "Which cells of nervous tissue are specialised to receive, process and transmit this kind of message?", answer: "Neurons.", explanation: "Neurons, or nerve cells, receive, process and transmit messages such as the sensation of heat." },
      { question: "The hand is actually pulled away by which tissue, acting on instructions from the nervous tissue?", answer: "Muscular tissue (skeletal muscle).", explanation: "Muscles cannot act on their own; they follow the instructions carried by nervous tissue, and here skeletal muscle pulls the hand away." },
      { question: "Is this pulling away of the hand a voluntary or an involuntary action?", answer: "Involuntary, a fast, automatic reflex.", explanation: "It happens before conscious thought, so it is an involuntary, reflex response rather than a voluntary one." }
    ]
  },
  {
    id: 20,
    caseTitle: "A Bone Marrow Transplant Story",
    caseDescription: "A young patient with a blood disorder such as thalassaemia receives a bone marrow transplant, in which stem cells from a healthy donor are given to help her body make healthy blood cells.",
    subQuestions: [
      { question: "What special ability do bone marrow stem cells have that makes this treatment possible?", options: ["They can divide and make new cells", "They can carry out photosynthesis", "They never divide", "They can only turn into bone"], correctIndex: 0, answer: "They can divide and make new cells", explanation: "Stem cells in bone marrow are special cells that can divide and make new cells, including new blood cells." },
      { question: "Name one other blood disorder, besides thalassaemia, that such a transplant can help treat.", answer: "Leukaemia (a blood cancer).", explanation: "Bone marrow transplants are given to patients with blood cancers like leukaemia or disorders such as thalassaemia." },
      { question: "Which blood cells might these stem cells eventually help replace in the patient?", answer: "Red blood cells, white blood cells and platelets.", explanation: "Bone marrow stem cells can give rise to the different cells found in blood." },
      { question: "How is this ability of stem cells similar to the totipotency shown by Steward's carrot cells?", answer: "Both involve special cells that can divide and give rise to new, more specialised cells, though bone marrow stem cells only form a limited range of blood cell types, unlike carrot cells, which can form an entire new plant.", explanation: "This comparison highlights that totipotency (as in the carrot) is a broader ability than the more limited cell-forming ability of bone marrow stem cells." }
    ]
  }
];
