// Class 10 CBSE Biology -- Chapter 6: Control and Coordination
import type {
  QuizQuestion,
  NCERTSolvedQuestion,
  ShortQuestion,
  LongQuestion,
  CompetencyQuestion,
} from "../types-custom";

// ── SOLVED TEXTBOOK QUESTIONS (every in-text section question + every end-of-chapter exercise) ──
export const CC10_NCERT_SOLVED: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "In-text 6.1 Q1",
    question: "What is the difference between a reflex action and walking?",
    given: { "Concept": "Voluntary vs involuntary, thought-based control" },
    formulaUsed: "A reflex is a fast, automatic response controlled at the spinal cord; walking is a voluntary action controlled by conscious thought in the brain.",
    derivationSteps: [
      "A reflex action (like pulling your hand back from a flame) is a sudden, automatic response to a stimulus -- it happens without any conscious thought, and is controlled by the spinal cord so that it can happen very fast.",
      "Walking is a voluntary action -- it is planned and controlled by the thinking part of the brain (the forebrain), and involves a conscious decision to move.",
      "Reflexes are the same every time and cannot easily be stopped once triggered; walking can be started, stopped, or changed at will.",
      "Both use the nervous system, but a reflex bypasses the brain for speed, while walking is directed by the brain the whole time."
    ],
    finalAnswer: "A reflex action is a fast, automatic, involuntary response controlled by the spinal cord, while walking is a voluntary action consciously controlled and directed by the brain.",
    conceptualTip: "Whenever you see 'automatic + fast + no thinking', think spinal cord/reflex arc. Whenever you see 'planned + can be stopped at will', think brain/voluntary."
  },
  {
    id: 2,
    questionNumber: "In-text 6.1 Q2",
    question: "What happens at the synapse between two neurons?",
    given: { "Concept": "Synapse = the gap between two neurons" },
    formulaUsed: "Electrical impulse -> chemical signal (neurotransmitter) -> electrical impulse in the next neuron.",
    derivationSteps: [
      "An electrical impulse travels along a neuron, from its dendrite to its cell body and then along its axon.",
      "When the impulse reaches the end of the axon (the axon terminal), it cannot jump across the synapse (the tiny gap) as electricity.",
      "So the axon terminal releases chemicals called neurotransmitters into the synapse.",
      "These neurotransmitters cross the gap and start a new electrical impulse in the dendrite of the next neuron, allowing the signal to continue onward."
    ],
    finalAnswer: "At a synapse, the electrical impulse in one neuron is converted into a chemical signal (a neurotransmitter), which crosses the gap and triggers a fresh electrical impulse in the next neuron.",
  },
  {
    id: 3,
    questionNumber: "In-text 6.1 Q3",
    question: "Which part of the brain maintains posture and equilibrium of the body?",
    given: { "Concept": "Balance and fine motor control" },
    formulaUsed: "Cerebellum (part of the hindbrain)",
    derivationSteps: [
      "Posture and balance require constant, precise adjustment of many muscles at once, without conscious thought.",
      "The cerebellum, part of the hindbrain, is specialised for this kind of fine motor control.",
      "It coordinates the timing and force of muscle movements, keeping the body balanced and steady, and is essential for skills like riding a bicycle or walking in a straight line."
    ],
    finalAnswer: "The cerebellum (part of the hindbrain) maintains posture and equilibrium of the body.",
  },
  {
    id: 4,
    questionNumber: "In-text 6.1 Q4",
    question: "How do we detect the smell of an agarbatti (incense stick)?",
    given: { "Concept": "Olfactory receptors" },
    formulaUsed: "Chemical stimulus -> olfactory receptor -> dendrite -> electrical impulse -> brain",
    derivationSteps: [
      "Scent particles from the burning agarbatti travel through the air and reach the nose.",
      "Specialised smell-detecting cells called olfactory receptors, present in the lining of the nose, detect these chemical particles.",
      "This information is picked up at the dendritic tip of a nerve cell, setting off a chemical reaction that creates an electrical impulse.",
      "The impulse travels through the neuron and eventually to the brain, which interprets it as the smell of the agarbatti."
    ],
    finalAnswer: "Olfactory receptors in the nose detect the chemical particles from the agarbatti's smoke and convert this into a nerve impulse that the brain interprets as smell.",
  },
  {
    id: 5,
    questionNumber: "In-text 6.1 Q5",
    question: "What is the role of the brain in reflex action?",
    given: { "Concept": "Reflex arcs bypass the brain, but it still receives the signal" },
    formulaUsed: "Reflex arc is completed at the spinal cord; the brain only receives the information afterward.",
    derivationSteps: [
      "A reflex action does not wait for the brain to decide what to do -- the spinal cord itself activates the motor neurons to produce the response, so the reaction is very fast.",
      "This is because thinking is a complex process involving many neurons, and would take too long for urgent, dangerous situations like touching a flame.",
      "However, the sensory information about the stimulus is still sent up to the brain in parallel, so that we become consciously aware of what happened (for example, feeling the pain) even though the brain did not control the movement itself."
    ],
    finalAnswer: "The brain does not directly control a reflex action -- the spinal cord handles it for speed -- but the brain still receives the same sensory information afterward, which is why we become aware of the reflex once it has already happened.",
  },
  {
    id: 6,
    questionNumber: "In-text 6.2 Q1",
    question: "What are plant hormones?",
    given: { "Concept": "Definition of phytohormones" },
    formulaUsed: "Chemical compounds synthesised in one part of the plant and transported to another to produce an effect.",
    derivationSteps: [
      "Plants do not have a nervous system or muscles, so they cannot use electrical impulses the way animals do.",
      "Instead, they use chemical compounds called plant hormones (or phytohormones) to coordinate growth, development, and responses to the environment.",
      "These hormones are synthesised in one part of the plant and simply diffuse or are transported to the part of the plant where they act."
    ],
    finalAnswer: "Plant hormones are chemical substances made by plants that coordinate their growth, development, and responses to the environment, by being produced in one part of the plant and acting on another part.",
  },
  {
    id: 7,
    questionNumber: "In-text 6.2 Q2",
    question: "How is the movement of leaves of the sensitive plant different from the movement of a shoot towards light?",
    given: { "Concept": "Nastic movement vs tropic movement" },
    formulaUsed: "Sensitive-plant folding = non-directional, no growth, fast (nastic). Shoot bending to light = directional, due to growth, slow (tropic).",
    derivationSteps: [
      "The sensitive plant (Mimosa/chhui-mui) folds its leaves in response to touch -- this movement happens very quickly, does not involve any growth, and is not directional (it doesn't matter which side is touched, the leaves simply fold).",
      "The leaves move by suddenly changing the amount of water in their cells, causing cells to swell or shrink.",
      "A shoot bending towards light, on the other hand, happens slowly, involves actual cell growth (elongation), and is directional -- it specifically bends toward the light source.",
      "So one is an immediate, non-directional response to touch (a nastic movement), while the other is a slow, directional, growth-based response to light (a tropic movement, specifically phototropism)."
    ],
    finalAnswer: "The sensitive plant's leaf-folding is a fast, non-directional, growth-independent movement (nastic movement) caused by a change in water content of cells, while a shoot bending toward light is a slow, directional, growth-dependent movement (tropic movement/phototropism).",
  },
  {
    id: 8,
    questionNumber: "In-text 6.2 Q3",
    question: "Give an example of a plant hormone that promotes growth.",
    given: { "Concept": "Growth-promoting phytohormones" },
    formulaUsed: "Auxin, gibberellin, and cytokinin all promote growth.",
    derivationSteps: [
      "Auxin, synthesised at the shoot tip, helps cells grow longer (elongate), helping the plant grow taller and bend toward light.",
      "Gibberellin also helps in the growth of the stem, and helps seeds germinate.",
      "Cytokinin promotes cell division and is found in higher concentration in rapidly growing regions such as fruits and seeds."
    ],
    finalAnswer: "Auxin is an example of a plant hormone that promotes growth (it makes cells elongate, helping shoots grow taller and bend toward light).",
  },
  {
    id: 9,
    questionNumber: "In-text 6.2 Q4",
    question: "How do auxins promote the growth of a tendril around a support?",
    given: { "Concept": "Thigmotropism via differential growth" },
    formulaUsed: "Slower growth on the touching side + faster growth on the opposite side = coiling.",
    derivationSteps: [
      "When a tendril touches a support, the part of the tendril in contact with the object grows more slowly than the part away from it.",
      "This uneven (differential) growth rate is controlled by auxin -- auxin concentration becomes higher on the side away from contact, making that side elongate faster.",
      "Because one side grows faster than the other, the tendril bends and curls around the support, allowing the plant to cling to it and climb."
    ],
    finalAnswer: "Auxin accumulates more on the side of the tendril away from the touched surface, making that side grow faster than the touching side -- this uneven growth causes the tendril to curl around the support.",
  },
  {
    id: 10,
    questionNumber: "In-text 6.2 Q5",
    question: "Design an experiment to demonstrate hydrotropism.",
    given: { "Concept": "Testing whether roots grow toward water" },
    formulaUsed: "Compare root growth direction with and without a nearby water source.",
    derivationSteps: [
      "Take a wide, flat tray or box and fill it with slightly moist soil, or use a similar horizontal-growth set-up so roots are not simply pulled down by gravity alone.",
      "Place a few freshly germinated seeds in the middle of the tray, and place a small perforated pot filled with water at one end of the tray only, so water seeps out slowly to one side.",
      "Cover the tray to block light (so the roots are not responding to light instead), and leave the set-up undisturbed for a few days.",
      "After a few days, dig up the seedlings carefully and observe the direction the roots have grown.",
      "If the roots have bent and grown toward the side with the water source rather than growing straight down or in a random direction, this shows the roots are sensing and moving toward the water, demonstrating hydrotropism."
    ],
    finalAnswer: "Germinate seeds in a horizontal tray of soil with a water source placed to one side only (and light blocked out); after some days, roots will be seen bending toward the water source, demonstrating hydrotropism.",
  },
  {
    id: 11,
    questionNumber: "In-text 6.3 Q1",
    question: "How does chemical coordination take place in animals?",
    given: { "Concept": "Hormones as the chemical communication system" },
    formulaUsed: "Endocrine gland -> hormone released into blood -> travels to target cells with matching receptors -> effect produced.",
    derivationSteps: [
      "Alongside the nervous system, animals also use a chemical communication system made up of endocrine glands.",
      "These glands secrete hormones directly into the bloodstream (they have no ducts).",
      "The hormone travels throughout the body in the blood, but it can only act on target cells that carry a matching receptor for that hormone.",
      "When the hormone binds to its receptor on a target cell, it changes the activity of that cell, producing the required effect -- this is generally slower but longer-lasting than a nerve impulse, and can reach every part of the body."
    ],
    finalAnswer: "Chemical coordination in animals happens through hormones, secreted by endocrine glands directly into the blood, which travel throughout the body and act only on target cells that have matching receptors for that specific hormone.",
  },
  {
    id: 12,
    questionNumber: "In-text 6.3 Q2",
    question: "Why is the use of iodised salt advisable?",
    given: { "Concept": "Iodine is needed to make thyroxine" },
    formulaUsed: "Iodine deficiency -> low thyroxine -> goitre",
    derivationSteps: [
      "The thyroid gland needs iodine to produce the hormone thyroxine.",
      "Thyroxine regulates carbohydrate, protein, and fat metabolism, helping balance the body's overall growth.",
      "If the diet lacks iodine, the thyroid cannot make enough thyroxine, and the gland enlarges as it tries to compensate -- this swelling of the neck is the disease goitre.",
      "Using iodised salt ensures a steady, reliable source of iodine in the diet, preventing this deficiency."
    ],
    finalAnswer: "Iodised salt is advisable because iodine is essential for the thyroid gland to make thyroxine; without enough iodine, thyroxine production falls and the thyroid enlarges, causing goitre.",
  },
  {
    id: 13,
    questionNumber: "In-text 6.3 Q3",
    question: "How does our body respond when adrenaline is secreted into the blood?",
    given: { "Concept": "Fight-or-flight response" },
    formulaUsed: "Adrenaline -> heart rate up, blood diverted to muscles, breathing rate up",
    derivationSteps: [
      "Adrenaline is released by the adrenal glands when the body needs to prepare quickly for a stressful, urgent, or dangerous situation (fight or flight).",
      "It makes the heart beat faster, so more oxygen reaches the muscles.",
      "It narrows the small arteries supplying the digestive system and skin, redirecting blood flow toward the skeletal muscles instead.",
      "It increases the breathing rate by making the diaphragm and rib muscles contract more, supplying more oxygen overall.",
      "Together, these changes prepare the body to either fight the danger or run from it."
    ],
    finalAnswer: "Adrenaline increases heart rate, diverts blood away from the digestive system and skin toward the skeletal muscles, and increases breathing rate -- preparing the body for an immediate 'fight or flight' response.",
  },
  {
    id: 14,
    questionNumber: "In-text 6.3 Q4",
    question: "Why are some patients of diabetes treated by giving injections of insulin?",
    given: { "Concept": "Insulin lowers blood sugar" },
    formulaUsed: "Low/ineffective natural insulin -> high blood sugar -> external insulin injection needed",
    derivationSteps: [
      "Insulin is a hormone made by the pancreas that helps the body use and store blood sugar (glucose), keeping blood sugar levels within a normal range.",
      "In diabetes, either the pancreas does not produce enough insulin, or the insulin produced cannot be used effectively by the body.",
      "Without enough working insulin, blood sugar levels rise too high, which can cause serious harm to the body over time.",
      "Injecting insulin directly makes up for this shortfall, helping bring blood sugar back down to a safe level."
    ],
    finalAnswer: "Insulin injections are given to diabetic patients because their bodies cannot produce or properly use enough natural insulin to regulate blood sugar, so the injected insulin compensates and helps control blood sugar levels.",
  },
  {
    id: 15,
    questionNumber: "Exercise Q1",
    question: "Which of the following is a plant hormone? (a) Insulin (b) Thyroxin (c) Oestrogen (d) Cytokinin",
    given: { "Concept": "Identifying plant vs animal hormones" },
    formulaUsed: "Insulin, thyroxin, and oestrogen are all animal hormones; cytokinin is a plant hormone.",
    derivationSteps: [
      "Insulin is secreted by the pancreas in animals to regulate blood sugar.",
      "Thyroxin is secreted by the thyroid gland in animals to regulate metabolism.",
      "Oestrogen is secreted by the ovaries in animals to control female sexual characteristics.",
      "Cytokinin is a phytohormone (plant hormone) that promotes cell division in plants."
    ],
    finalAnswer: "(d) Cytokinin is the plant hormone.",
  },
  {
    id: 16,
    questionNumber: "Exercise Q2",
    question: "The gap between two neurons is called a (a) dendrite (b) synapse (c) axon (d) impulse",
    given: { "Concept": "Neuron terminology" },
    formulaUsed: "Synapse = the junction/gap between two neurons.",
    derivationSteps: [
      "A dendrite is the branch-like part of a neuron that receives signals.",
      "An axon is the long projection that carries the impulse away from the cell body.",
      "An impulse is the electrical signal itself, not a physical structure.",
      "The synapse is specifically the tiny gap between the axon terminal of one neuron and the dendrite of the next."
    ],
    finalAnswer: "(b) synapse.",
  },
  {
    id: 17,
    questionNumber: "Exercise Q3",
    question: "The brain is responsible for (a) thinking (b) regulating the heart beat (c) balancing the body (d) all of the above",
    given: { "Concept": "Overall functions of the brain across its regions" },
    formulaUsed: "Forebrain -> thinking; hindbrain (medulla) -> heartbeat; hindbrain (cerebellum) -> balance.",
    derivationSteps: [
      "The forebrain handles thinking, memory, and conscious decision-making.",
      "The medulla in the hindbrain controls involuntary functions such as heart rate and blood pressure.",
      "The cerebellum in the hindbrain controls balance and posture.",
      "Since the brain performs all of these functions through its different regions, all three options are correct."
    ],
    finalAnswer: "(d) All of the above.",
  },
  {
    id: 18,
    questionNumber: "Exercise Q4",
    question: "What is the function of receptors in our body? Think of situations where receptors do not work properly. What problems are likely to arise?",
    given: { "Concept": "Role of sensory receptors" },
    formulaUsed: "Receptors detect stimuli and convert them into nerve impulses.",
    derivationSteps: [
      "Receptors are specialised cells or tissues, usually found in our sense organs, that detect changes (stimuli) in the environment -- such as light, sound, smell, taste, and touch/temperature/pain.",
      "They convert this information into an electrical impulse that can be carried by nerve cells to the brain for processing.",
      "If a particular receptor stops working properly (for example, damaged receptors in the eye, ear, nose, tongue, or skin), the body loses the ability to detect that specific type of stimulus.",
      "For example, damaged receptors in the eye can cause blindness or poor vision; damaged receptors in the ear can cause hearing loss or loss of balance; damaged skin receptors can mean a person doesn't feel pain from an injury (like a burn) and gets hurt without realising it."
    ],
    finalAnswer: "Receptors detect stimuli from the environment and convert them into nerve impulses. If receptors are damaged, the body cannot properly sense that type of stimulus -- e.g. damaged eye receptors cause vision loss, damaged skin receptors mean injuries like burns may go unnoticed because pain isn't felt.",
  },
  {
    id: 19,
    questionNumber: "Exercise Q5",
    question: "Draw the structure of a neuron and explain its function.",
    given: { "Concept": "Neuron structure and its role" },
    formulaUsed: "Dendrite -> Cell body -> Axon (myelin-covered) -> Axon terminal",
    derivationSteps: [
      "A neuron has four main parts: the cell body (containing the nucleus, also called the soma), dendrites (branch-like extensions that receive signals), the axon (a long thin projection, often covered by an insulating myelin sheath with gaps called nodes of Ranvier), and axon terminals (the branched, bulb-like ends that release neurotransmitters).",
      "Function: a stimulus is detected at the dendritic tip, generating an electrical impulse.",
      "This impulse travels through the dendrite, across the cell body, and along the axon (sped up by the myelin sheath) to the axon terminal.",
      "At the axon terminal, the electrical impulse triggers the release of neurotransmitter chemicals into the synapse, which pass the signal on to the next neuron, a muscle, or a gland."
    ],
    finalAnswer: "A neuron consists of dendrites, a cell body, an axon (often myelin-covered), and axon terminals. Its function is to detect a stimulus, generate an electrical impulse, and carry that impulse from one end of the cell to the other, before converting it into a chemical signal at the synapse to pass it to the next cell.",
    conceptualTip: "In a diagram-based question, always label all four parts (dendrite, cell body, axon, axon terminal) plus the nucleus, myelin sheath, and node of Ranvier for full marks."
  },
  {
    id: 20,
    questionNumber: "Exercise Q6",
    question: "How does phototropism occur in plants?",
    given: { "Concept": "Auxin-driven bending toward light" },
    formulaUsed: "Light from one side -> auxin accumulates on shaded side -> that side elongates more -> shoot bends toward light.",
    derivationSteps: [
      "When light falls on a shoot unevenly (from one side only), the plant hormone auxin, produced at the shoot tip, moves toward the shaded side of the shoot.",
      "This higher concentration of auxin on the shaded side makes the cells there elongate more than the cells on the illuminated side.",
      "Because one side of the shoot grows longer than the other, the shoot bends and curves toward the light."
    ],
    finalAnswer: "Auxin accumulates on the shaded side of the shoot when light comes from one direction, causing that side to elongate faster than the lit side -- this uneven growth bends the shoot toward the light (positive phototropism).",
  },
  {
    id: 21,
    questionNumber: "Exercise Q7",
    question: "Which signals will get disrupted in case of a spinal cord injury?",
    given: { "Concept": "Functions carried by the spinal cord" },
    formulaUsed: "Spinal cord = link for motor signals, sensory signals, and reflex coordination.",
    derivationSteps: [
      "The spinal cord carries motor signals from the brain down to the muscles, allowing voluntary movement.",
      "It also carries sensory signals (touch, heat, pain, etc.) from the body up to the brain.",
      "It coordinates reflex actions independently of the brain.",
      "A spinal cord injury can disrupt all three: it can cause loss of voluntary movement (paralysis) below the injury site, loss of sensation below the injury site, and disruption of reflexes that rely on that part of the spinal cord."
    ],
    finalAnswer: "A spinal cord injury disrupts motor signals (voluntary movement), sensory signals (touch/pain/heat), and reflex-action signals travelling through the injured region of the spinal cord.",
  },
  {
    id: 22,
    questionNumber: "Exercise Q8",
    question: "How does chemical coordination occur in plants?",
    given: { "Concept": "Coordination via plant hormones, without a nervous system" },
    formulaUsed: "Stimulus -> hormone synthesised in one part -> diffuses/transported to another part -> causes response",
    derivationSteps: [
      "Plants lack a nervous system and muscles, so instead they use chemical messengers called plant hormones (phytohormones) to coordinate growth and responses to stimuli.",
      "These hormones (like auxin, gibberellin, cytokinin, abscisic acid, and ethylene) are synthesised in one part of the plant, often in actively growing regions like the shoot tip or root tip.",
      "The hormone then diffuses or is transported through plant tissue to the site where it acts, changing the rate or direction of growth there.",
      "This is how plants achieve directional (tropic) growth and other coordinated responses, entirely through chemical signalling rather than nerve impulses."
    ],
    finalAnswer: "Plants coordinate chemically using plant hormones -- synthesised in one part of the plant and transported to another part, where they alter growth or trigger a response, allowing coordination without any nervous system.",
  },
  {
    id: 23,
    questionNumber: "Exercise Q9",
    question: "What is the need for a system of control and coordination in an organism?",
    given: { "Concept": "Why coordination systems exist" },
    formulaUsed: "Multicellular organisms need specialised systems since diffusion/individual cell response is too slow/uncoordinated.",
    derivationSteps: [
      "Living organisms constantly experience changes in their environment (stimuli), and must respond appropriately to survive -- for example, moving away from danger, or growing toward light and nutrients.",
      "Each kind of change needs an appropriately matched response, not a random one -- this requires the stimulus to be detected, processed, and the correct response chosen.",
      "In a multicellular organism, different body parts (sense organs, brain, muscles, glands) must all work together in the right order and at the right time for a meaningful response to occur.",
      "Without a control and coordination system to manage and synchronise all of this, an organism's responses to its environment would be slow, uncoordinated, or entirely absent -- reducing its ability to survive."
    ],
    finalAnswer: "A control and coordination system is needed so that an organism can detect changes (stimuli) in its environment and produce a properly timed, appropriate response using its different body parts working together -- essential for survival.",
  },
  {
    id: 24,
    questionNumber: "Exercise Q10",
    question: "How are involuntary actions and reflex actions different from each other?",
    given: { "Concept": "Involuntary action vs reflex action" },
    formulaUsed: "Both are automatic and not consciously controlled, but they are controlled by different parts of the nervous system.",
    derivationSteps: [
      "Both involuntary actions (like heartbeat, breathing, digestion) and reflex actions (like the knee-jerk, or pulling a hand away from a flame) happen without conscious thought or control.",
      "Involuntary actions, however, are ongoing, ordinary body processes controlled mainly by the mid-brain and hind-brain (for example, the medulla controls heart rate, breathing, and blood pressure continuously).",
      "Reflex actions, on the other hand, are sudden, one-off responses to a specific, often urgent stimulus, and are coordinated by the spinal cord (via a reflex arc) precisely to achieve a very fast response.",
      "So while both are automatic, involuntary actions are continuous background regulation by the brain, whereas reflex actions are quick, single-trigger responses handled by the spinal cord."
    ],
    finalAnswer: "Involuntary actions are ongoing body processes (like heartbeat and breathing) controlled continuously by the mid-brain/hind-brain, while reflex actions are sudden, single, fast responses to a specific stimulus, controlled by the spinal cord through a reflex arc.",
  },
  {
    id: 25,
    questionNumber: "Exercise Q11",
    question: "Compare and contrast nervous and hormonal mechanisms for control and coordination in animals.",
    given: { "Concept": "Nervous system vs endocrine system" },
    formulaUsed: "Nervous = electrical impulses, fast, short-lived, specific pathway. Hormonal = chemical, slower, longer-lasting, reaches whole body.",
    derivationSteps: [
      "The nervous system uses electrical impulses carried along neurons, giving very fast responses, but the impulse only reaches the specific cells connected by that nerve pathway.",
      "Nerve cells also need time to reset before they can send another impulse, so they cannot fire continuously.",
      "The hormonal (endocrine) system uses chemical messengers (hormones) released into the blood, which travel to and can potentially reach every cell in the body, but only affect cells with matching receptors.",
      "Hormonal responses are slower to start but tend to be longer-lasting and are well suited for regulating ongoing processes like growth, metabolism, and mood, rather than split-second reactions.",
      "In short: nervous control is fast, short-lived, and narrowly targeted; hormonal control is slower, longer-lasting, and body-wide -- and the two systems work together in a coordinated way."
    ],
    finalAnswer: "The nervous system provides fast, short-lived, narrowly targeted control using electrical impulses along specific nerve pathways, while the hormonal system provides slower but longer-lasting, body-wide control using chemical hormones carried in the blood -- together they coordinate the body's activities.",
  },
  {
    id: 26,
    questionNumber: "Exercise Q12",
    question: "What is the difference between the manner in which movement takes place in a sensitive plant and the movement in our legs?",
    given: { "Concept": "Plant nastic movement vs animal muscular movement" },
    formulaUsed: "Sensitive plant: change in cell water content (turgor pressure) causes movement. Legs: nerve-controlled protein-based muscle contraction causes movement.",
    derivationSteps: [
      "In the sensitive plant, there is no muscle or nervous tissue -- movement (leaf folding) happens because specialised cells rapidly change their water content, causing them to swell or shrink, which changes the shape of the leaf.",
      "In our legs, movement happens because a nerve impulse reaches the muscle, causing special proteins within muscle cells to change their shape and arrangement, making the muscle fibres contract (shorten).",
      "So plant movement here relies on changes in turgor pressure/water content of cells, while animal leg movement relies on a nerve-triggered, protein-based mechanical contraction of muscle cells."
    ],
    finalAnswer: "The sensitive plant moves its leaves by rapidly changing the water content (turgor pressure) of specialised cells, causing them to swell or shrink -- with no muscles or nerves involved. Movement in our legs, by contrast, happens through nerve impulses triggering special proteins in muscle cells to contract.",
  },
];

// ── MULTIPLE CHOICE QUESTIONS ──
export const CC10_MCQS: QuizQuestion[] = [
  { id: 1, question: "The structural and functional unit of the nervous system is the:", options: ["Neuron", "Nephron", "Synapse", "Axon"], correctAnswer: 0, explanation: "A neuron is the structural and functional unit of the nervous system -- a specialised cell that transmits electrical and chemical signals." },
  { id: 2, question: "Which part of a neuron receives incoming signals from other neurons?", options: ["Axon", "Dendrite", "Cell body", "Synapse"], correctAnswer: 1, explanation: "Dendrites are branch-like extensions that receive incoming signals and convert chemical signals from neurotransmitters into electrical impulses." },
  { id: 3, question: "The gap between two neurons, across which a chemical signal passes, is called the:", options: ["Node of Ranvier", "Myelin sheath", "Synapse", "Soma"], correctAnswer: 2, explanation: "The synapse is the functional gap between two adjacent neurons where the electrical impulse is converted into a chemical (neurotransmitter) signal." },
  { id: 4, question: "Myelin sheaths in the peripheral nervous system are formed by:", options: ["Oligodendroglial cells", "Schwann cells", "Neuroglial cells", "Purkinje cells"], correctAnswer: 1, explanation: "Schwann cells form the myelin sheath around axons in the peripheral nervous system (PNS); oligodendroglial cells do this job in the central nervous system (CNS)." },
  { id: 5, question: "Gaps in the myelin sheath along an axon are called:", options: ["Synapses", "Dendrites", "Nodes of Ranvier", "Axon terminals"], correctAnswer: 2, explanation: "Nodes of Ranvier are gaps in the myelin sheath that allow the electrical impulse to 'jump' quickly from node to node, speeding up transmission." },
  { id: 6, question: "Neurons that carry information from sense organs to the brain are called:", options: ["Motor neurons", "Interneurons", "Sensory neurons", "Relay neurons only"], correctAnswer: 2, explanation: "Sensory (afferent) neurons carry information from receptors/sense organs toward the brain." },
  { id: 7, question: "Neurons that carry messages from the brain and spinal cord to muscles are called:", options: ["Sensory neurons", "Motor neurons", "Afferent neurons", "Receptor cells"], correctAnswer: 1, explanation: "Motor (efferent) neurons carry commands from the CNS to muscles, allowing movement." },
  { id: 8, question: "Neurons that connect sensory and motor neurons are known as:", options: ["Interneurons (relay neurons)", "Afferent neurons", "Schwann cells", "Glial cells"], correctAnswer: 0, explanation: "Interneurons, also called relay neurons, connect sensory and motor neurons and are involved in reflexes, learning, and memory." },
  { id: 9, question: "The central nervous system (CNS) consists of the:", options: ["Brain and nerves only", "Brain and spinal cord", "Spinal cord and PNS", "Cranial and spinal nerves only"], correctAnswer: 1, explanation: "The CNS is made up of the brain and the spinal cord -- the body's central processing unit." },
  { id: 10, question: "The peripheral nervous system (PNS) is made up of:", options: ["Only the brain", "The spinal cord only", "All nerves outside the brain and spinal cord", "The cerebellum and medulla"], correctAnswer: 2, explanation: "The PNS consists of all the nerves that lie outside the central nervous system, connecting the CNS to the rest of the body." },
  { id: 11, question: "Which part of the brain is the largest and is mainly responsible for thinking?", options: ["Hindbrain", "Midbrain", "Forebrain", "Medulla"], correctAnswer: 2, explanation: "The forebrain is the largest part of the brain and includes the cerebrum, the main thinking part of the brain." },
  { id: 12, question: "The two hemispheres of the cerebrum communicate through a bundle of nerve fibres called the:", options: ["Corpus callosum", "Medulla oblongata", "Spinal tract", "Node of Ranvier"], correctAnswer: 0, explanation: "The corpus callosum is the bundle of nerve fibres connecting the left and right cerebral hemispheres." },
  { id: 13, question: "Which part of the brain controls involuntary actions like heartbeat, breathing rate, and blood pressure?", options: ["Cerebrum", "Cerebellum", "Medulla oblongata", "Thalamus"], correctAnswer: 2, explanation: "The medulla oblongata, in the hindbrain, manages vital involuntary processes such as heart rate, breathing, blood pressure, and salivation." },
  { id: 14, question: "Which part of the brain helps maintain balance and posture, and controls fine motor skills?", options: ["Cerebellum", "Medulla", "Pons", "Midbrain"], correctAnswer: 0, explanation: "The cerebellum coordinates balance, posture, and precise voluntary movements like riding a bicycle or playing an instrument." },
  { id: 15, question: "Which of these is NOT a function of the midbrain?", options: ["Adjusting pupil size", "Controlling eye and eyelid movement", "Regulating heart rate", "Relaying signals between spinal cord and brain"], correctAnswer: 2, explanation: "Regulating heart rate is a function of the medulla (hindbrain), not the midbrain. The midbrain handles reflexes like pupil size and eye movement." },
  { id: 16, question: "The three protective membranous layers covering the brain and spinal cord are collectively called the:", options: ["Meninges", "Myelin sheaths", "Neuroglia", "Cerebrospinal tissue"], correctAnswer: 0, explanation: "The meninges are the three layers (dura mater, arachnoid layer, pia mater) that cover and protect the brain and spinal cord." },
  { id: 17, question: "Which meningeal layer is the thickest, outermost membrane?", options: ["Pia mater", "Arachnoid layer", "Dura mater", "Cerebral cortex"], correctAnswer: 2, explanation: "The dura mater is the thick, tough outer membrane of the meninges." },
  { id: 18, question: "What is a key function of cerebrospinal fluid (CSF)?", options: ["It transmits nerve impulses directly", "It cushions the brain and keeps it buoyant, absorbing shocks", "It produces neurotransmitters", "It forms the myelin sheath"], correctAnswer: 1, explanation: "CSF cushions the brain from impact and makes it buoyant, preventing it from being weighed down by its own weight." },
  { id: 19, question: "The vertebral column protecting the spinal cord is made up of how many ring-shaped bones (vertebrae)?", options: ["22", "33", "14", "8"], correctAnswer: 1, explanation: "The vertebral column has 33 ring-shaped bones called vertebrae, stacked from the pelvis up to the skull." },
  { id: 20, question: "Which of the following is NOT a function of the spinal cord?", options: ["Carrying motor signals to control movement", "Coordinating reflex actions", "Producing thyroxine", "Sending sensory information to the brain"], correctAnswer: 2, explanation: "Producing thyroxine is the job of the thyroid gland, not the spinal cord. The spinal cord controls movement, coordinates reflexes, and carries sensory information." },
  { id: 21, question: "The two main parts of the peripheral nervous system are the somatic nervous system and the:", options: ["Central nervous system", "Autonomic nervous system", "Sympathetic cortex", "Reflex arc system"], correctAnswer: 1, explanation: "The PNS is divided into the somatic nervous system (controls voluntary actions, skin and muscles) and the autonomic nervous system (controls involuntary actions in internal organs)." },
  { id: 22, question: "In a reflex arc, which structure performs the actual reflex response?", options: ["Receptor", "Effector", "Relay neuron", "Sensory neuron"], correctAnswer: 1, explanation: "The effector (usually a muscle) is the structure that actually carries out the reflex action, once activated by the motor neuron." },
  { id: 23, question: "Reflex arcs are formed mainly in the:", options: ["Cerebrum", "Cerebellum", "Spinal cord", "Hypothalamus"], correctAnswer: 2, explanation: "Reflex arcs are formed in the spinal cord, allowing very fast responses without waiting for the brain to process the signal." },
  { id: 24, question: "The correct sequence of a reflex arc is:", options: ["Effector -> Motor neuron -> Spinal cord -> Sensory neuron -> Receptor", "Receptor -> Sensory neuron -> Spinal cord -> Motor neuron -> Effector", "Receptor -> Motor neuron -> Spinal cord -> Sensory neuron -> Effector", "Spinal cord -> Receptor -> Effector -> Sensory neuron"], correctAnswer: 1, explanation: "A reflex arc runs: receptor detects the stimulus -> sensory neuron carries it to the spinal cord -> spinal cord (via a relay neuron) activates a motor neuron -> motor neuron triggers the effector (muscle)." },
  { id: 25, question: "At a neuromuscular junction, the structure that releases neurotransmitters is the:", options: ["Postsynaptic membrane", "Sarcolemma", "Presynaptic terminal", "Myofibril"], correctAnswer: 2, explanation: "The presynaptic terminal (the end of the motor neuron's axon) releases neurotransmitter chemicals stored in synaptic vesicles." },
  { id: 26, question: "Muscle cells contract by:", options: ["Absorbing more water and swelling", "Special proteins changing shape and arrangement, shortening the cell", "Dividing rapidly", "Releasing hormones"], correctAnswer: 1, explanation: "Special contractile proteins inside muscle cells change shape and rearrange in response to nerve impulses, causing the cell to shorten." },
  { id: 27, question: "The hormonal system is also known as the:", options: ["Circulatory system", "Endocrine system", "Exocrine system", "Digestive system"], correctAnswer: 1, explanation: "The hormonal system is also called the endocrine system -- a network of glands producing hormones." },
  { id: 28, question: "Endocrine glands release their secretions:", options: ["Through a duct onto a body surface", "Directly into the bloodstream", "Only into the digestive tract", "Into the lymph nodes only"], correctAnswer: 1, explanation: "Endocrine glands are ductless -- they release hormones directly into the bloodstream, unlike exocrine glands, which use a duct." },
  { id: 29, question: "A gland that releases its secretions through a duct, and does NOT release hormones, is called a/an:", options: ["Endocrine gland", "Heterocrine gland", "Exocrine gland", "Pituitary gland"], correctAnswer: 2, explanation: "Exocrine glands release non-hormonal substances through a duct onto a body surface or cavity, e.g. sweat glands, salivary glands." },
  { id: 30, question: "A gland that functions as BOTH an endocrine and an exocrine gland is called a:", options: ["Heterocrine gland", "Master gland", "Duct gland", "Target gland"], correctAnswer: 0, explanation: "A heterocrine (composite) gland secretes both through ducts and directly into the blood -- the pancreas is a classic example." },
  { id: 31, question: "Which gland is known as the 'master gland' because it controls the activity of other endocrine glands?", options: ["Thyroid", "Pituitary", "Pancreas", "Adrenal"], correctAnswer: 1, explanation: "The pituitary gland is called the master gland because it produces hormones that regulate other endocrine glands." },
  { id: 32, question: "The pituitary gland is located:", options: ["In the neck, in front of the trachea", "On top of each kidney", "At the base of the brain, below the hypothalamus", "In the abdomen, beside the stomach"], correctAnswer: 2, explanation: "The pituitary gland is a pea-sized gland at the base of the brain, just below the hypothalamus." },
  { id: 33, question: "Deficiency of growth hormone during childhood can result in:", options: ["Gigantism", "Goitre", "Dwarfism", "Diabetes"], correctAnswer: 2, explanation: "A deficiency of growth hormone (secreted by the pituitary) in childhood leads to dwarfism; excess growth hormone leads to gigantism." },
  { id: 34, question: "Which hormone helps in milk ejection during breastfeeding?", options: ["Prolactin", "Oxytocin", "FSH", "ADH"], correctAnswer: 1, explanation: "Oxytocin, secreted by the pituitary, helps in the ejection (release) of milk during breastfeeding." },
  { id: 35, question: "The hormone melatonin, which helps control the sleep-wake cycle, is released by the:", options: ["Pineal gland", "Thymus", "Parathyroid gland", "Hypothalamus"], correctAnswer: 0, explanation: "The pineal gland, a tiny gland in the brain, releases melatonin, which regulates our sleep-wake cycle." },
  { id: 36, question: "The thyroid gland is located:", options: ["Behind the eyes", "At the front of the neck", "In the chest cavity", "Below the kidneys"], correctAnswer: 1, explanation: "The thyroid is a small, butterfly-shaped gland at the front of the neck." },
  { id: 37, question: "Iodine deficiency in the diet can lead to:", options: ["Diabetes", "Goitre", "Gigantism", "Dwarfism"], correctAnswer: 1, explanation: "Iodine is required to make thyroxine; a deficiency causes the thyroid gland to enlarge, a condition called goitre." },
  { id: 38, question: "The parathyroid glands mainly regulate:", options: ["Blood sugar", "Sleep-wake cycles", "Calcium balance in blood and bones", "Blood pressure"], correctAnswer: 2, explanation: "The parathyroid glands release parathyroid hormone (PTH), which regulates calcium balance in the blood and bone health." },
  { id: 39, question: "The thymus gland is important mainly because it:", options: ["Produces insulin", "Produces T cells important for a child's immune system", "Regulates metabolism", "Produces eggs"], correctAnswer: 1, explanation: "The thymus produces T cells, which fight infection and are especially important for a child's developing immune system; it shrinks after puberty." },
  { id: 40, question: "Adrenal glands are located:", options: ["On top of each kidney", "In the neck", "In the brain", "Behind the pancreas"], correctAnswer: 0, explanation: "The adrenal glands are small, triangle-shaped glands sitting on top of each kidney." },
  { id: 41, question: "Adrenaline is also known as:", options: ["Insulin", "Epinephrine", "Thyroxine", "Testosterone"], correctAnswer: 1, explanation: "Adrenaline, secreted by the adrenal glands, is also called epinephrine." },
  { id: 42, question: "Which hormone increases blood sugar levels, opposing the action of insulin?", options: ["Glucagon", "Oxytocin", "Estrogen", "Melatonin"], correctAnswer: 0, explanation: "Glucagon, secreted by the pancreas, raises blood sugar levels and prevents them from dropping too low, working opposite to insulin." },
  { id: 43, question: "Diabetes is a disorder caused by problems with the hormone:", options: ["Adrenaline", "Insulin", "Thyroxine", "Testosterone"], correctAnswer: 1, explanation: "Diabetes occurs when the pancreas produces too little insulin, or the insulin produced cannot be used effectively by the body." },
  { id: 44, question: "Which hormone thickens the lining of the uterus to prepare it for a fertilised egg?", options: ["Estrogen", "Progesterone", "Testosterone", "FSH"], correctAnswer: 1, explanation: "Progesterone, secreted by the ovaries, thickens the uterine lining so a fertilised egg can attach and grow." },
  { id: 45, question: "The male reproductive gland that produces sperm and testosterone is the:", options: ["Prostate", "Testis", "Adrenal gland", "Epididymis"], correctAnswer: 1, explanation: "The testis (testicle) produces sperm and the hormone testosterone, which drives male sexual characteristics." },
  { id: 46, question: "The placenta acts as a temporary endocrine organ that mainly secretes:", options: ["Insulin", "Progesterone", "Thyroxine", "Adrenaline"], correctAnswer: 1, explanation: "The placenta secretes progesterone (among other hormones) during pregnancy, helping maintain the pregnancy by supporting the uterine lining." },
  { id: 47, question: "Which of these is an example of an exocrine gland?", options: ["Pituitary gland", "Thyroid gland", "Sweat gland", "Adrenal gland"], correctAnswer: 2, explanation: "Sweat glands are exocrine glands -- they release sweat through a duct onto the skin surface, not into the bloodstream." },
  { id: 48, question: "The largest exocrine gland in the human body is the:", options: ["Pancreas", "Liver", "Thyroid", "Salivary gland"], correctAnswer: 1, explanation: "The liver is the largest exocrine gland in the human body, with many functions including fat digestion." },
  { id: 49, question: "In the feedback mechanism for blood sugar regulation, a rise in blood sugar is detected by cells of the:", options: ["Liver", "Pancreas", "Kidney", "Pituitary"], correctAnswer: 1, explanation: "Cells of the pancreas detect a rise in blood sugar and respond by producing more insulin, which lowers blood sugar back to normal." },
  { id: 50, question: "Directional growth movement in plants in response to an external stimulus is called:", options: ["Nastic movement", "Tropic movement", "Reflex movement", "Peristalsis"], correctAnswer: 1, explanation: "Tropic movements are directional growth responses of a plant part toward or away from a stimulus, such as light or gravity." },
  { id: 51, question: "Growth of a shoot toward light is an example of:", options: ["Positive geotropism", "Negative phototropism", "Positive phototropism", "Positive hydrotropism"], correctAnswer: 2, explanation: "Shoots bending toward light show positive phototropism." },
  { id: 52, question: "Roots growing downward, in the direction of gravity, is an example of:", options: ["Negative geotropism", "Positive geotropism", "Positive phototropism", "Thigmotropism"], correctAnswer: 1, explanation: "Roots growing downward (toward the pull of gravity) show positive geotropism (gravitropism)." },
  { id: 53, question: "The coiling of a pea plant's tendril around a support is an example of:", options: ["Thigmotropism", "Hydrotropism", "Chemotropism", "Thermotropism"], correctAnswer: 0, explanation: "Thigmotropism is the directional growth response to touch/mechanical contact, seen in the coiling of tendrils around a support." },
  { id: 54, question: "The growth of a pollen tube toward the ovule, guided by chemical signals, is an example of:", options: ["Geotropism", "Chemotropism", "Hydrotropism", "Nastic movement"], correctAnswer: 1, explanation: "Chemotropism is growth in response to chemical stimuli, such as pollen tubes growing toward ovules due to sugars and chemical attractants." },
  { id: 55, question: "Which plant hormone is primarily responsible for causing phototropism?", options: ["Gibberellin", "Cytokinin", "Auxin", "Ethylene"], correctAnswer: 2, explanation: "Auxin accumulates on the shaded side of a shoot, making that side grow faster and causing the shoot to bend toward light." },
  { id: 56, question: "Movements in plants that are non-directional responses to a stimulus (like touch or light) are called:", options: ["Tropic movements", "Nastic movements", "Peristaltic movements", "Reflex movements"], correctAnswer: 1, explanation: "Nastic movements are non-directional -- the plant part moves the same way regardless of which direction the stimulus comes from." },
  { id: 57, question: "The rapid folding of leaves of Mimosa pudica (the touch-me-not plant) in response to touch is an example of:", options: ["Photonasty", "Thigmonasty", "Nyctinasty", "Thermonasty"], correctAnswer: 1, explanation: "Thigmonasty is the nastic movement response to touch, and Mimosa pudica's leaf-folding is the classic example." },
  { id: 58, question: "Nastic movements are mainly caused by changes in:", options: ["Cell division rate", "Turgor pressure (water content) of cells", "Chlorophyll amount", "Hormone synthesis rate only"], correctAnswer: 1, explanation: "Nastic movements happen because specialised cells rapidly swell or shrink by changing their water content, altering turgor pressure." },
  { id: 59, question: "Which plant hormone is mainly responsible for promoting cell division?", options: ["Auxin", "Cytokinin", "Abscisic acid", "Ethylene"], correctAnswer: 1, explanation: "Cytokinins are the plant hormones that promote cell division ('cyto' = cell, 'kinin' = division)." },
  { id: 60, question: "Which plant hormone was first discovered in a fungus that caused abnormally tall growth in rice plants?", options: ["Auxin", "Ethylene", "Gibberellin", "Abscisic acid"], correctAnswer: 2, explanation: "Gibberellins were first discovered in the fungus Gibberella fujikuroi, which caused abnormal tall growth ('foolish seedling disease') in rice." },
  { id: 61, question: "Which plant hormone helps break seed dormancy and promotes germination?", options: ["Abscisic acid", "Ethylene", "Gibberellin", "None of these"], correctAnswer: 2, explanation: "Gibberellins break seed dormancy by activating enzymes that convert stored starch into sugars, fuelling the growth of the embryo." },
  { id: 62, question: "Which plant hormone is known as the 'stress hormone' because it inhibits growth?", options: ["Auxin", "Abscisic acid", "Cytokinin", "Gibberellin"], correctAnswer: 1, explanation: "Abscisic acid (ABA) is called the stress hormone because it slows growth and induces dormancy to help the plant survive unfavourable conditions." },
  { id: 63, question: "Which plant hormone is a gas, and is also called the 'ripening hormone'?", options: ["Auxin", "Ethylene", "Gibberellin", "Cytokinin"], correctAnswer: 1, explanation: "Ethylene is a gaseous hormone that speeds up the ripening of fruits, hence its nickname, the ripening hormone." },
  { id: 64, question: "Which plant hormone closes stomata to help the plant conserve water during drought?", options: ["Auxin", "Cytokinin", "Abscisic acid", "Gibberellin"], correctAnswer: 2, explanation: "Abscisic acid closes stomata during water stress/drought, reducing water loss and helping the plant survive." },
  { id: 65, question: "Auxin controlling the growth of side branches, keeping the main shoot dominant, is called:", options: ["Apical dominance", "Photoperiodism", "Vernalisation", "Senescence"], correctAnswer: 0, explanation: "Apical dominance is the phenomenon where auxin from the shoot tip suppresses the growth of lateral (side) branches." },
];

// ── VERY SHORT ANSWER QUESTIONS ──
export const CC10_VERY_SHORT: ShortQuestion[] = [
  { id: 1, question: "Define stimulus, with one example.", answer: "A stimulus is any change in the environment that an organism detects and responds to, e.g. light, heat, cold, or sound.", keyPoints: ["Change in environment", "Detected and responded to", "Example: light/heat/sound"] },
  { id: 2, question: "What is a receptor?", answer: "A receptor is a specialised cell or tissue, usually present in a sense organ, that detects stimuli (information) from the environment.", keyPoints: ["Specialised cell/tissue", "Present in sense organs", "Detects stimuli"] },
  { id: 3, question: "Name the two main control and coordination systems found in animals.", answer: "The nervous system and the hormonal (endocrine) system.", keyPoints: ["Nervous system", "Hormonal/endocrine system"] },
  { id: 4, question: "What is the structural and functional unit of the nervous system called?", answer: "The neuron.", keyPoints: ["Neuron", "Structural + functional unit"] },
  { id: 5, question: "Name the four main parts of a neuron.", answer: "Cell body (soma), dendrites, axon, and axon terminals (synaptic boutons).", keyPoints: ["Cell body", "Dendrites", "Axon", "Axon terminals"] },
  { id: 6, question: "What is a nerve impulse?", answer: "A nerve impulse is the electrical signal that passes along a nerve fibre, carrying information from one point to another.", keyPoints: ["Electrical signal", "Travels along nerve fibre", "Carries information"] },
  { id: 7, question: "Define synapse.", answer: "A synapse is the tiny functional gap between two adjacent neurons, where the electrical impulse is converted into a chemical signal to cross the gap.", keyPoints: ["Gap between neurons", "Electrical -> chemical conversion", "Allows signal to pass on"] },
  { id: 8, question: "Name the three main types of neurons based on function.", answer: "Sensory (afferent) neurons, motor (efferent) neurons, and interneurons (relay neurons).", keyPoints: ["Sensory neurons", "Motor neurons", "Interneurons"] },
  { id: 9, question: "What are the two components of the central nervous system?", answer: "The brain and the spinal cord.", keyPoints: ["Brain", "Spinal cord"] },
  { id: 10, question: "Name the three main regions of the brain.", answer: "Forebrain, midbrain, and hindbrain.", keyPoints: ["Forebrain", "Midbrain", "Hindbrain"] },
  { id: 11, question: "Which part of the hindbrain controls balance and posture?", answer: "The cerebellum.", keyPoints: ["Cerebellum", "Balance and posture"] },
  { id: 12, question: "Which part of the brain controls involuntary actions like heartbeat and blood pressure?", answer: "The medulla oblongata.", keyPoints: ["Medulla oblongata", "Involuntary actions"] },
  { id: 13, question: "What are the meninges?", answer: "The three protective membrane layers (dura mater, arachnoid layer, pia mater) that cover and protect the brain and spinal cord.", keyPoints: ["Three membrane layers", "Protect brain and spinal cord"] },
  { id: 14, question: "What is a reflex action?", answer: "A reflex action is a quick, automatic, involuntary response to a stimulus, controlled by the spinal cord rather than the brain.", keyPoints: ["Quick and automatic", "Involuntary", "Controlled by spinal cord"] },
  { id: 15, question: "What is a reflex arc?", answer: "A reflex arc is the neural pathway that controls a reflex action, running from a receptor through the spinal cord to an effector.", keyPoints: ["Neural pathway", "Controls a reflex", "Receptor to effector via spinal cord"] },
  { id: 16, question: "What are the two main parts of the peripheral nervous system?", answer: "The somatic nervous system (controls voluntary actions) and the autonomic nervous system (controls involuntary actions).", keyPoints: ["Somatic nervous system", "Autonomic nervous system"] },
  { id: 17, question: "Define hormone.", answer: "A hormone is a chemical substance produced by an endocrine gland, which travels (usually via the blood) to a distant target organ or tissue to regulate a body function.", keyPoints: ["Chemical substance", "Made by endocrine gland", "Travels to target organ"] },
  { id: 18, question: "What is an endocrine gland?", answer: "An endocrine gland is a ductless gland that releases hormones directly into the bloodstream.", keyPoints: ["Ductless", "Releases hormones", "Directly into blood"] },
  { id: 19, question: "What is an exocrine gland? Give one example.", answer: "An exocrine gland releases substances (not hormones) through a duct onto a body surface or cavity, e.g. sweat glands.", keyPoints: ["Uses a duct", "Non-hormonal secretion", "Example: sweat gland"] },
  { id: 20, question: "What is a heterocrine gland? Give one example.", answer: "A heterocrine gland functions as both an endocrine and an exocrine gland, e.g. the pancreas.", keyPoints: ["Both endocrine + exocrine", "Example: pancreas"] },
  { id: 21, question: "Which gland is known as the 'master gland'?", answer: "The pituitary gland, because it produces hormones that control the activity of other endocrine glands.", keyPoints: ["Pituitary gland", "Controls other glands"] },
  { id: 22, question: "Which hormone regulates blood sugar by lowering it, and which gland secretes it?", answer: "Insulin, secreted by the pancreas.", keyPoints: ["Insulin", "Pancreas", "Lowers blood sugar"] },
  { id: 23, question: "What causes goitre, and which gland is affected?", answer: "Goitre is caused by iodine deficiency, which prevents the thyroid gland from making enough thyroxine, causing the gland to enlarge.", keyPoints: ["Iodine deficiency", "Thyroid gland enlarges"] },
  { id: 24, question: "Name the hormone secreted by the adrenal gland that prepares the body for a 'fight or flight' response.", answer: "Adrenaline (also called epinephrine).", keyPoints: ["Adrenaline/epinephrine", "Adrenal gland", "Fight or flight"] },
  { id: 25, question: "What are tropic movements? Give one example.", answer: "Tropic movements are directional growth responses of a plant toward or away from a stimulus, e.g. phototropism (growth toward light).", keyPoints: ["Directional growth response", "Toward/away from stimulus", "Example: phototropism"] },
  { id: 26, question: "What are nastic movements? Give one example.", answer: "Nastic movements are non-directional responses of a plant to a stimulus, e.g. the leaves of Mimosa pudica folding when touched.", keyPoints: ["Non-directional response", "Example: Mimosa pudica folding"] },
  { id: 27, question: "Name the plant hormone responsible for apical dominance.", answer: "Auxin.", keyPoints: ["Auxin", "Apical dominance"] },
  { id: 28, question: "Which plant hormone is known as the 'ripening hormone'?", answer: "Ethylene.", keyPoints: ["Ethylene", "Ripening hormone", "Gaseous"] },
  { id: 29, question: "Which plant hormone is known as the 'stress hormone'?", answer: "Abscisic acid (ABA).", keyPoints: ["Abscisic acid", "Stress hormone", "Growth-inhibiting"] },
  { id: 30, question: "What is turgor pressure?", answer: "Turgor pressure is the pressure exerted by the water inside a plant cell against its cell wall; changes in turgor pressure cause nastic movements.", keyPoints: ["Water pressure inside a cell", "Pushes against cell wall", "Causes nastic movement"] },
];

// ── SHORT ANSWER QUESTIONS ──
export const CC10_SHORT: ShortQuestion[] = [
  {
    id: 1,
    question: "Explain the flow of a nerve impulse from receptor to effector, naming every structure it passes through.",
    answer: "A stimulus is detected by a receptor, which generates an electrical impulse at the dendritic tip of a sensory neuron. The impulse travels through the dendrite, across the cell body, and along the axon to the axon terminal. There, it triggers the release of neurotransmitters into the synapse. These chemicals cross the gap and start a new impulse in the next neuron (which may be a relay neuron in the spinal cord, and then a motor neuron), eventually reaching an effector (a muscle or gland), which carries out the response.",
    keyPoints: ["Receptor detects stimulus", "Dendrite -> cell body -> axon", "Synapse: electrical to chemical", "Passed to next neuron", "Reaches effector"]
  },
  {
    id: 2,
    question: "Describe the three main regions of the brain and one key function of each.",
    answer: "The forebrain is the largest region and is the main thinking part of the brain -- it processes sensory information, integrates it with stored knowledge, and makes decisions; it also handles sensations like hunger. The midbrain is the smallest, topmost region -- it controls reflexes such as pupil size and eye movement, and relays signals between the spinal cord and the brain. The hindbrain includes the medulla (controls involuntary actions like heartbeat and breathing), the pons (regulates sleep and breathing), and the cerebellum (controls balance, posture, and precise voluntary movement).",
    keyPoints: ["Forebrain: thinking, sensory processing, decisions", "Midbrain: reflexes, relaying signals", "Hindbrain: medulla (involuntary actions), cerebellum (balance)"]
  },
  {
    id: 3,
    question: "Why are reflex actions controlled by the spinal cord rather than the brain?",
    answer: "Reflex actions respond to urgent, often dangerous stimuli, where speed is essential. If the signal had to travel all the way to the brain, be consciously processed through the brain's complex neuron networks, and then travel back down to the muscles, it would take too long, risking injury. Instead, the reflex arc is completed within the spinal cord itself -- the sensory neuron connects almost directly to a motor neuron via a relay neuron, so the response happens very quickly. The information is still sent on to the brain afterward, which is why we become consciously aware of the reflex once it has already happened.",
    keyPoints: ["Speed is essential for urgent/dangerous stimuli", "Brain processing would be too slow", "Reflex arc completed in spinal cord", "Brain still receives the signal afterward"]
  },
  {
    id: 4,
    question: "Differentiate between voluntary, involuntary, and reflex actions, with one example of each.",
    answer: "Voluntary actions are consciously controlled and planned by the forebrain, e.g. writing or walking. Involuntary actions happen continuously without conscious control and are managed mainly by the mid-brain and hind-brain, e.g. heartbeat and breathing. Reflex actions are sudden, automatic, one-off responses to a specific stimulus, controlled by the spinal cord for speed, e.g. pulling your hand away from a flame.",
    keyPoints: ["Voluntary: conscious, forebrain, e.g. writing", "Involuntary: continuous, mid/hindbrain, e.g. heartbeat", "Reflex: sudden, one-off, spinal cord, e.g. hand from flame"]
  },
  {
    id: 5,
    question: "How does the body protect the brain and spinal cord from injury?",
    answer: "The brain sits inside the bony skull (cranium), which shields it from the front, sides, and top; the skull is made of 22 bones. Inside the skull, the brain is further protected by three membrane layers called the meninges, and is cushioned by cerebrospinal fluid (CSF), which absorbs shocks and keeps the brain buoyant. The spinal cord is similarly protected by the bumpy vertebral column (33 vertebrae), and is also covered by meninges and cushioned by CSF.",
    keyPoints: ["Skull protects the brain", "Meninges (3 layers) + CSF cushion the brain", "Vertebral column protects the spinal cord", "Spinal cord also has meninges + CSF"]
  },
  {
    id: 6,
    question: "Explain how a muscle contracts in response to a nerve impulse.",
    answer: "When a nerve impulse travelling down a motor neuron reaches a muscle at a neuromuscular junction, it triggers the release of neurotransmitters from the presynaptic terminal. These cross the synaptic cleft and act on the postsynaptic membrane of the muscle fibre. This causes special contractile proteins inside the muscle cell to change their shape and rearrange themselves. This rearrangement makes the muscle cell shorten -- and this shortening of many muscle fibres together is what we experience as a muscle contracting to produce movement.",
    keyPoints: ["Nerve impulse reaches neuromuscular junction", "Neurotransmitters released across synaptic cleft", "Contractile proteins change shape", "Muscle cell shortens = contraction"]
  },
  {
    id: 7,
    question: "Explain the difference between endocrine, exocrine, and heterocrine glands, with an example of each.",
    answer: "Endocrine glands are ductless -- they release hormones directly into the bloodstream, e.g. the pituitary gland. Exocrine glands release non-hormonal substances through a duct onto a body surface or cavity, e.g. sweat glands. Heterocrine (composite) glands do both -- they release some substances through ducts and some hormones directly into the blood, e.g. the pancreas, which releases digestive enzymes through a duct and the hormones insulin/glucagon directly into the blood.",
    keyPoints: ["Endocrine: ductless, hormones into blood, e.g. pituitary", "Exocrine: duct, non-hormonal, e.g. sweat gland", "Heterocrine: both, e.g. pancreas"]
  },
  {
    id: 8,
    question: "Describe how the feedback mechanism regulates blood sugar levels in the body.",
    answer: "When blood sugar (glucose) levels rise, for example after a meal, this is detected by cells of the pancreas. In response, the pancreas secretes more insulin, which helps cells absorb and use glucose, and converts excess glucose into glycogen for storage, thereby lowering the blood sugar level. As the blood sugar level falls back to normal, insulin secretion automatically reduces again. This self-correcting loop -- where the effect of a hormone reduces its own further release once the target level is reached -- is an example of a feedback mechanism.",
    keyPoints: ["Rise in blood sugar detected by pancreas", "More insulin secreted", "Insulin lowers blood sugar (glucose -> glycogen)", "Insulin secretion falls back as sugar normalises"]
  },
  {
    id: 9,
    question: "Explain phototropism and geotropism, including the direction in which roots and shoots typically grow for each.",
    answer: "Phototropism is directional growth in response to light. Shoots usually show positive phototropism, bending toward light, while some roots show negative phototropism, growing away from light. Geotropism (gravitropism) is directional growth in response to gravity. Roots show positive geotropism, growing downward in the direction of gravity, while shoots show negative geotropism, growing upward, against gravity. Both are controlled by uneven distribution of the hormone auxin causing differential cell elongation.",
    keyPoints: ["Phototropism: shoots bend toward light (positive)", "Some roots grow away from light (negative)", "Geotropism: roots grow down (positive)", "Shoots grow up, against gravity (negative)"]
  },
  {
    id: 10,
    question: "How do plants without a nervous system or muscles still manage to move in response to stimuli? Explain with reference to the sensitive plant.",
    answer: "Plants use electrical and chemical signals to communicate that a stimulus (like touch) has occurred, even though they lack specialised nervous tissue -- ordinary plant cells pass this information along. Instead of using contractile muscle proteins, plant cells change shape by altering the amount of water inside them, causing them to swell or shrink. In the sensitive plant (Mimosa pudica), touching a leaf triggers a rapid change in the water content of specialised cells at the base of the leaflets, causing them to lose turgor pressure and collapse, making the leaves fold and droop very quickly.",
    keyPoints: ["Electrical/chemical signals via ordinary cells", "No muscles -- movement via water content change", "Change in turgor pressure", "Sensitive plant: leaflet base cells lose water, leaves fold"]
  },
  {
    id: 11,
    question: "List and briefly describe the five plant hormones and one function of each.",
    answer: "Auxin promotes cell elongation, helping shoots grow taller and bend toward light. Gibberellin promotes stem elongation and helps break seed dormancy for germination. Cytokinin promotes cell division and keeps leaves green for longer by delaying ageing. Abscisic acid (ABA) inhibits growth and induces dormancy, helping the plant survive stress like drought. Ethylene, a gaseous hormone, speeds up the ripening of fruits.",
    keyPoints: ["Auxin: cell elongation, phototropism", "Gibberellin: stem growth, breaks seed dormancy", "Cytokinin: cell division, delays ageing", "Abscisic acid: growth inhibitor, stress hormone", "Ethylene: ripening hormone"]
  },
  {
    id: 12,
    question: "Compare nervous and hormonal control in terms of speed, duration, and range of effect.",
    answer: "Nervous control uses electrical impulses along specific nerve pathways -- it acts very fast but the effect is short-lived and limited to the cells connected by that particular nerve. Hormonal control uses chemicals released into the blood -- it acts more slowly since the hormone has to travel through the bloodstream, but its effects tend to last much longer, and since the hormone travels throughout the body, it can potentially affect any cell that has a matching receptor, giving it a much wider range of effect.",
    keyPoints: ["Nervous: fast, short-lived, narrow/specific pathway", "Hormonal: slower, longer-lasting, body-wide reach", "Both regulated for the right response"]
  },
  {
    id: 13,
    question: "What is the neuromuscular junction, and why is it important?",
    answer: "The neuromuscular junction is the point of contact between the axon terminal of a motor neuron and a muscle fibre. It is important because it is where the nerve impulse (electrical signal) is converted into a chemical signal (via neurotransmitters released from the presynaptic terminal), which then triggers the contractile machinery inside the muscle fibre. Without this junction, nerve impulses would have no way of actually causing a muscle to move.",
    keyPoints: ["Junction between motor neuron axon and muscle fibre", "Converts electrical signal to chemical signal", "Chemical signal triggers muscle contraction"]
  },
  {
    id: 14,
    question: "Explain why hormones can only act on specific 'target' cells, even though they travel throughout the body in the blood.",
    answer: "A hormone circulates everywhere in the bloodstream, reaching almost every cell in the body. However, it can only produce an effect on cells that carry a matching receptor for that specific hormone -- like a key that only fits a particular lock. When the hormone binds to its receptor on a target cell, it changes the activity of that cell's existing proteins and can switch on genes that make new proteins, producing the hormone's effect. Cells without the matching receptor are simply unaffected, even though the hormone passes right by them.",
    keyPoints: ["Hormone reaches almost every cell via blood", "Only cells with matching receptors respond", "Receptor binding changes cell activity/gene expression", "Cells without receptor are unaffected"]
  },
  {
    id: 15,
    question: "Describe the structure and role of the spinal cord.",
    answer: "The spinal cord is a cylindrical column of nerve tissue running from the base of the skull down the back, protected by the bony vertebral column and cushioned by meninges and cerebrospinal fluid. It forms the connecting link between the brain and the peripheral nervous system. Its three main roles are: carrying motor signals from the brain to control movement, carrying sensory information (like heat or pain) from the body up to the brain, and coordinating reflex actions independently of the brain for a fast response.",
    keyPoints: ["Cylindrical nerve tissue, base of skull to lower back", "Protected by vertebral column, meninges, CSF", "Links brain to PNS", "Motor signals, sensory signals, reflex coordination"]
  },
  {
    id: 16,
    question: "What would happen if a person's cerebellum were damaged?",
    answer: "Since the cerebellum coordinates balance, posture, and the precision of voluntary movements, damage to it would make a person unsteady and clumsy. They would likely have trouble walking in a straight line, maintaining balance while standing, and performing skills requiring fine motor control, such as writing, playing an instrument, or riding a bicycle -- even though they would still be able to think and consciously decide to move (since that is controlled by the forebrain, not the cerebellum).",
    keyPoints: ["Cerebellum controls balance, posture, fine motor control", "Damage causes unsteadiness/clumsiness", "Trouble with precise voluntary movements", "Thinking (forebrain) remains unaffected"]
  },
  {
    id: 17,
    question: "Explain thigmotropism and thigmonasty, and how they differ from each other despite both being touch responses.",
    answer: "Thigmotropism is a directional growth response to touch, seen in the coiling of a climbing plant's tendril around a support -- the side of the tendril touching the support grows slower than the opposite side, causing it to curl toward and around the object; this involves growth and is slow. Thigmonasty is a non-directional response to touch, seen in the rapid folding of Mimosa pudica's leaves -- it does not matter which side is touched, the whole leaf folds the same way; this does not involve growth, is caused by a rapid change in turgor pressure, and happens quickly.",
    keyPoints: ["Thigmotropism: directional, growth-based, slow, e.g. tendril coiling", "Thigmonasty: non-directional, no growth, fast, e.g. Mimosa folding", "Both triggered by touch, but mechanism differs"]
  },
  {
    id: 18,
    question: "Why does a plant need a 'stress hormone' like abscisic acid?",
    answer: "Plants cannot move away from unfavourable conditions like drought, extreme cold, or lack of water, so they need a way to protect themselves in place. Abscisic acid helps by inducing dormancy in seeds and buds so they can survive harsh conditions until conditions improve, by preventing premature germination of seeds, and by closing stomata during drought to reduce water loss through transpiration. Under severe stress, it also promotes the shedding of leaves, flowers, and fruits, helping the plant conserve resources and survive.",
    keyPoints: ["Plants can't move away from stress", "Induces dormancy in seeds/buds", "Closes stomata to save water in drought", "Promotes shedding under stress to conserve resources"]
  },
];

// ── LONG ANSWER QUESTIONS ──
export const CC10_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Draw a labelled diagram of a neuron and describe the function of each of its parts. Also explain how information flows through a neuron from receptor to the next cell.",
    markingScheme: ["Correctly labelled diagram (dendrite, cell body/nucleus, axon, myelin sheath, node of Ranvier, axon terminal) -- 2 marks", "Function of each part -- 2 marks", "Correct sequence of information flow -- 2 marks"],
    answerParts: [
      { part: "Structure", text: "A neuron has a cell body (soma) containing the nucleus and cytoplasm, from which branch-like dendrites extend to receive signals. A single long axon extends from the cell body, often covered in a fatty, insulating myelin sheath (formed by Schwann cells in the PNS, or oligodendroglial cells in the CNS) with small gaps called nodes of Ranvier. The axon ends in branched, bulb-like axon terminals." },
      { part: "Function of each part", text: "Dendrites: receive incoming signals and convert them into electrical impulses. Cell body: contains the nucleus (genetic material, controls the cell) and cytoplasm (houses organelles for metabolism). Axon: carries the electrical impulse away from the cell body; the myelin sheath insulates it and speeds up transmission, jumping between nodes of Ranvier. Axon terminals: release neurotransmitter chemicals into the synapse to pass the signal onward." },
      { part: "Flow of information", text: "A stimulus is detected at the dendritic tip, generating an electrical impulse. This travels through the dendrite, across the cell body, and along the myelinated axon to the axon terminal. There, the electrical signal triggers release of neurotransmitters into the synapse -- the gap between this neuron and the next. These chemicals cross the gap and start a fresh electrical impulse in the dendrite of the next neuron (or trigger a muscle/gland if this is the final cell in the pathway)." }
    ]
  },
  {
    id: 2,
    question: "Explain, with a labelled diagram, the working of a reflex arc using the example of touching a hot object.",
    markingScheme: ["Correctly labelled diagram (receptor, sensory neuron, spinal cord/relay neuron, motor neuron, effector) -- 2 marks", "Correct step-by-step explanation -- 3 marks", "Reasoning for why it bypasses the brain -- 1 mark"],
    answerParts: [
      { part: "Step 1: Detection", text: "When the hand touches a hot object, heat/pain receptors in the skin detect this dangerous stimulus." },
      { part: "Step 2: Sensory signal to spinal cord", text: "A sensory neuron carries this information as an electrical impulse to the spinal cord." },
      { part: "Step 3: Relay and motor response", text: "Inside the spinal cord, a relay (inter) neuron connects the sensory neuron to a motor neuron, activating it without routing the signal all the way up to the brain first." },
      { part: "Step 4: Effector response", text: "The motor neuron carries the impulse to the effector -- the muscle in the arm -- causing it to contract and quickly pull the hand away from the hot object." },
      { part: "Why it bypasses the brain", text: "This connection at the spinal cord level allows the response to happen very fast, protecting the body from injury. The sensory information is still sent on to the brain in parallel, which is why we consciously feel the pain, but the movement itself does not wait for the brain's decision." }
    ]
  },
  {
    id: 3,
    question: "Describe the three main regions of the human brain, their sub-parts, and the functions of each in detail.",
    markingScheme: ["Forebrain structures and functions -- 2 marks", "Midbrain functions -- 1 mark", "Hindbrain structures and functions -- 2 marks", "Overall organisation (CNS/protection) -- 1 mark"],
    answerParts: [
      { part: "Forebrain", text: "The largest part of the brain, including the cerebrum (divided into two hemispheres joined by the corpus callosum), thalamus, and hypothalamus. It is the main thinking centre -- it processes sensory information (sight, sound, etc.), integrates it with stored knowledge, makes decisions, and handles sensations like hunger. The left hemisphere manages the right side of the body and logical/language tasks; the right hemisphere manages the left side of the body and creative/emotional processing." },
      { part: "Midbrain", text: "The smallest, topmost part of the brainstem. It controls certain reflexes such as adjusting pupil size and controlling eye/eyelid movement, handles some sensory and motor functions, and relays signals between the spinal cord and the rest of the brain." },
      { part: "Hindbrain", text: "Located at the back and base of the brain, it includes the medulla oblongata (controls involuntary life-supporting functions like breathing, heart rate, blood pressure, salivation, and vomiting), the pons (regulates sleep, breathing, and facial movements), and the cerebellum (coordinates balance, posture, and precise voluntary movements like riding a bicycle)." },
      { part: "Protection", text: "The entire brain sits inside the bony skull, is wrapped in three protective layers called meninges, and is cushioned by cerebrospinal fluid, which absorbs shock and keeps the brain buoyant." }
    ]
  },
  {
    id: 4,
    question: "What is the endocrine system? Describe at least six major endocrine glands, their locations, and the key hormones they secrete.",
    markingScheme: ["Definition of endocrine system -- 1 mark", "At least 6 glands with location + hormone(s) + function -- 5 marks", "Correct terminology (ductless, target cells, etc.) -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "The endocrine system is a network of ductless glands that produce hormones and release them directly into the bloodstream, which then travel to and regulate distant target organs and tissues throughout the body." },
      { part: "Hypothalamus", text: "Located deep in the brain; links the nervous and endocrine systems, and releases hormones (like dopamine) that control the pituitary gland." },
      { part: "Pituitary gland", text: "A pea-sized gland at the base of the brain, below the hypothalamus; called the 'master gland' because it secretes hormones (like growth hormone, TSH, ACTH, oxytocin, FSH, LH) that control the activity of other endocrine glands." },
      { part: "Thyroid gland", text: "A butterfly-shaped gland in the front of the neck; secretes thyroxine, which regulates metabolic rate and requires dietary iodine." },
      { part: "Pancreas", text: "A heterocrine gland in the abdomen; secretes insulin and glucagon directly into the blood to regulate blood sugar levels." },
      { part: "Adrenal glands", text: "Small glands sitting atop each kidney; secrete adrenaline, which prepares the body for a 'fight or flight' response by increasing heart rate and breathing rate." },
      { part: "Ovaries/Testes", text: "The ovaries (in females) secrete estrogen and progesterone, controlling female sexual characteristics and the menstrual cycle; the testes (in males) secrete testosterone, controlling male sexual characteristics and sperm production." }
    ]
  },
  {
    id: 5,
    question: "Explain the feedback mechanism of hormone regulation. Why is this precise regulation important?",
    markingScheme: ["Definition/concept of feedback mechanism -- 2 marks", "Worked example (blood sugar) -- 3 marks", "Importance of precise regulation -- 1 mark"],
    answerParts: [
      { part: "Concept", text: "Hormones must be secreted in precise, carefully controlled quantities -- too much or too little can disrupt the body's normal functioning. A feedback mechanism achieves this by having the level of a substance in the body regulate the secretion of the hormone that controls it, forming a self-correcting loop." },
      { part: "Worked example -- blood sugar", text: "When blood sugar rises (for example, after eating), this rise is detected by cells of the pancreas. The pancreas responds by secreting more insulin, which helps the body's cells absorb glucose and convert excess glucose into glycogen for storage, thereby lowering blood sugar. As the blood sugar level falls back toward normal, the stimulus for insulin secretion weakens, so insulin secretion is automatically reduced -- keeping blood sugar within a healthy range at all times." },
      { part: "Why precise regulation matters", text: "If hormone levels were not tightly regulated, the body could swing between too much and too little of a hormone's effect -- for example, blood sugar could remain dangerously high (as in diabetes) or drop too low, both of which can seriously harm the body over time." }
    ]
  },
  {
    id: 6,
    question: "Discuss the different types of tropic movements in plants, explaining the mechanism behind each with an example.",
    markingScheme: ["Definition of tropic movement -- 1 mark", "At least 4 types with mechanism + example -- 4 marks", "Role of auxin -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "Tropic movements are directional growth responses of a plant part toward or away from an external stimulus, caused by differential (uneven) cell elongation on the two sides of the growing part, largely controlled by the hormone auxin." },
      { part: "Phototropism", text: "Response to light. Auxin accumulates on the shaded side of a shoot, making it elongate more, so the shoot bends toward light (positive phototropism); some roots grow away from light (negative phototropism)." },
      { part: "Geotropism (Gravitropism)", text: "Response to gravity. Starch-filled cells in the root cap sense gravity and redistribute auxin, causing roots to grow downward (positive geotropism) and shoots to grow upward (negative geotropism)." },
      { part: "Hydrotropism", text: "Response to water. The root cap senses a water gradient in the soil and triggers differential growth so that roots bend and grow toward the moist region (positive hydrotropism)." },
      { part: "Thigmotropism", text: "Response to touch. Cells on the side of a tendril in contact with a support grow slower than the opposite side, causing the tendril to coil around the support, e.g. in pea or cucumber plants." },
      { part: "Chemotropism", text: "Response to chemical signals. The ovule releases chemical attractants (sugars, amino acids) that guide the growth of the pollen tube toward it (positive chemotropism)." }
    ]
  },
  {
    id: 7,
    question: "Describe nastic movements in plants, explaining the main types with examples, and how they differ mechanistically from tropic movements.",
    markingScheme: ["Definition of nastic movement -- 1 mark", "At least 3 types with example -- 3 marks", "Mechanism (turgor pressure) -- 1 mark", "Contrast with tropic movement -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "Nastic movements are non-directional responses of a plant to a stimulus such as touch, light, or temperature -- the direction of the movement does not depend on the direction the stimulus comes from." },
      { part: "Thigmonasty", text: "Response to touch/vibration, caused by a rapid change in turgor pressure in specialised cells, leading to fast leaf folding. Example: Mimosa pudica (the sensitive plant) folds its leaves when touched." },
      { part: "Photonasty", text: "Response to light -- changes in the position of flowers or leaves. Example: morning glory flowers open in the morning light and close in the evening." },
      { part: "Nyctinasty", text: "Response to darkness, often the closing of flowers/leaves at night to protect the plant. Example: Oxalis leaves fold down at night and reopen during the day." },
      { part: "Mechanism and contrast with tropic movement", text: "Nastic movements are caused by a rapid change in the water content (turgor pressure) of specific cells, making them swell or shrink -- they are fast, reversible, and involve no growth. This is different from tropic movements, which are directional, involve actual cell elongation (growth), and are usually much slower." }
    ]
  },
  {
    id: 8,
    question: "Describe the five major plant hormones, their site of synthesis, their main functions, and one agricultural use of each.",
    markingScheme: ["All 5 hormones named correctly -- 1 mark", "Synthesis site for each -- 1 mark", "Functions of each -- 2 marks", "Agricultural use of each -- 1 mark", "Growth-promoting vs growth-inhibiting classification -- 1 mark"],
    answerParts: [
      { part: "Auxin", text: "Synthesised mainly at shoot tips and young leaves. Promotes cell elongation (helps shoots grow taller and bend toward light), regulates root growth, and controls apical dominance. Agricultural use: as a rooting powder for vegetative propagation, and as a weedicide." },
      { part: "Gibberellin", text: "Synthesised in young leaves, root tips, and developing seeds. Promotes stem elongation and helps break seed dormancy to trigger germination. Agricultural use: increasing sugarcane stem length to raise yield, and producing seedless fruits." },
      { part: "Cytokinin", text: "Mainly produced in root tips and transported upward through the xylem. Promotes cell division, delays leaf ageing (keeps leaves green longer), and promotes lateral (bushy) growth. Agricultural use: essential in plant tissue culture for root and shoot formation." },
      { part: "Abscisic acid (ABA)", text: "Produced in mature leaves, stems, roots, and developing seeds. A growth-inhibiting 'stress hormone' -- induces seed/bud dormancy, closes stomata during drought, and promotes shedding of leaves/flowers under stress. Agricultural use: helping crops survive drought conditions." },
      { part: "Ethylene", text: "A gaseous hormone produced in almost all plant parts, especially ripening fruit. Speeds up fruit ripening and promotes aging/shedding of leaves and flowers. Agricultural use: artificially ripening fruits like bananas, mangoes, and tomatoes after harvest." }
    ]
  },
];

// ── COMPETENCY-BASED / CASE-STUDY QUESTIONS ──
export const CC10_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Cricket Ball Catch",
    caseDescription: "A fielder in a cricket match sees the ball coming toward him, quickly moves his hands to the right position, and catches it -- all within a fraction of a second, without consciously thinking through each muscle movement.",
    subQuestions: [
      { question: "Is catching the ball purely a reflex action, or does it involve conscious thought? Explain.", answer: "It involves both. Seeing the ball and deciding to catch it is a voluntary action, planned and directed by the forebrain based on visual information -- the fielder consciously decided to try to catch it. However, many of the very fine, rapid muscle adjustments happen so quickly that they rely on well-practised, almost automatic neural pathways, similar to trained reflex-like responses, even though the overall act is voluntary." },
      { question: "Which parts of the nervous system would be especially active in coordinating this precise hand-eye movement?", answer: "The cerebrum (forebrain) processes the visual information and decides to catch the ball; the cerebellum plays a major role in coordinating the timing and precision of the hand and arm muscles, and in maintaining the fielder's balance while moving." },
      { question: "If the fielder's cerebellum were damaged, how would his catching ability be affected?", answer: "His movements would become clumsy and poorly coordinated -- he might still see the ball and want to catch it, but would struggle to move his hands to the precisely correct position and timing, and might also have trouble keeping his balance while moving." }
    ]
  },
  {
    id: 2,
    caseTitle: "Iodised Salt Campaign",
    caseDescription: "A public health campaign in a mountainous region encourages every household to use only iodised salt, after doctors noticed many local people had swollen necks.",
    subQuestions: [
      { question: "Which gland and hormone are directly linked to the health problem described here?", answer: "The thyroid gland and the hormone thyroxine are directly linked -- thyroxine production requires iodine, and this region's diet was likely low in natural iodine sources." },
      { question: "Explain the biological chain of events that leads from iodine deficiency to a swollen neck.", answer: "Without enough dietary iodine, the thyroid gland cannot produce sufficient thyroxine. In an attempt to compensate, the thyroid gland enlarges, trying to capture more iodine and increase hormone output -- this enlargement is what causes the visible swelling in the neck, a condition called goitre." },
      { question: "Besides the visible swelling, what internal body process would also be disrupted by low thyroxine levels?", answer: "Thyroxine regulates carbohydrate, protein, and fat metabolism, which balances the body's overall growth and energy use -- so low thyroxine would disrupt normal metabolic rate and growth regulation, even beyond the visible neck swelling." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Climbing Pea Plant",
    caseDescription: "A gardener plants pea seeds next to a wire fence. Over several weeks, the pea plant's tendrils wrap tightly around the wires of the fence, allowing the plant to climb upward.",
    subQuestions: [
      { question: "Name the type of plant movement responsible for the tendril coiling around the fence wire.", answer: "Thigmotropism -- a directional growth response to touch/mechanical contact." },
      { question: "Explain, in terms of growth rates on each side of the tendril, how this coiling actually happens.", answer: "When the tendril touches the wire, the side of the tendril in contact with the wire grows more slowly than the side facing away from it. This uneven (differential) growth causes the tendril to curve and wrap around the wire." },
      { question: "Which plant hormone is primarily responsible for controlling this differential growth?", answer: "Auxin -- it accumulates unevenly on the two sides of the tendril, driving the faster growth on the side away from contact." }
    ]
  },
  {
    id: 4,
    caseTitle: "The Startled Squirrel",
    caseDescription: "A squirrel foraging on the ground suddenly spots a dog running toward it. Within moments, its heart is racing, and it dashes up the nearest tree.",
    subQuestions: [
      { question: "Which hormone is primarily responsible for the squirrel's rapid physical changes (increased heart rate, etc.) in this situation, and which gland secretes it?", answer: "Adrenaline, secreted by the adrenal glands." },
      { question: "List three specific bodily changes this hormone would cause in the squirrel to prepare it for fleeing.", answer: "Increased heart rate (pumping more oxygen to muscles), reduced blood flow to the digestive system and skin (redirecting blood to skeletal muscles), and an increased breathing rate (via contraction of the diaphragm and rib muscles)." },
      { question: "Why is a hormonal response, rather than only a nervous response, well suited to this kind of situation?", answer: "A hormonal response can reach many different tissues and organs throughout the body all at once via the bloodstream, producing widespread, coordinated changes (heart, blood vessels, lungs, muscles) needed to prepare the whole body for vigorous activity -- something a single, narrowly targeted nerve pathway could not achieve as effectively." }
    ]
  },
  {
    id: 5,
    caseTitle: "Diabetes Diagnosis",
    caseDescription: "A doctor diagnoses a patient with high blood sugar levels and prescribes regular insulin injections as part of the treatment.",
    subQuestions: [
      { question: "Which gland normally produces insulin, and what is insulin's normal role in the body?", answer: "The pancreas normally produces insulin. Insulin helps the body's cells absorb and use blood glucose for energy, and helps convert excess glucose into glycogen for storage, thereby lowering blood sugar levels." },
      { question: "Explain why a shortage of working insulin causes blood sugar levels to rise.", answer: "Without enough insulin (or if the insulin produced cannot be used effectively by the body), glucose cannot be efficiently taken up by cells or stored as glycogen, so it accumulates in the blood, causing blood sugar levels to rise -- this is diabetes." },
      { question: "How does injecting insulin help manage this condition?", answer: "Injected insulin supplements the body's insufficient natural supply, allowing cells to take up glucose from the blood and helping bring blood sugar levels back down closer to the normal range." }
    ]
  },
  {
    id: 6,
    caseTitle: "The Sensitive Plant Experiment",
    caseDescription: "A student gently touches one leaflet of a Mimosa pudica (touch-me-not) plant in the school garden and observes that the leaflets fold up within seconds, even though only one part of the leaf was touched.",
    subQuestions: [
      { question: "Is this an example of a tropic movement or a nastic movement? Justify your answer.", answer: "It is a nastic movement, because the response (folding) is non-directional -- the leaflets fold the same way regardless of exactly where they were touched, and the movement does not involve growth." },
      { question: "The plant has no nervous system, yet information about the touch clearly reaches other parts of the leaf. How does this happen?", answer: "Even without specialised nervous tissue, plant cells can still use electrical and chemical signals to pass on information from the point of touch to the responding cells, using their ordinary cells rather than dedicated nerve cells." },
      { question: "What actually causes the leaflets to fold -- is it similar to how an animal muscle moves?", answer: "Not quite. Instead of contractile proteins found in animal muscle, specialised cells at the base of the leaflets rapidly lose water, decreasing their turgor pressure and causing them to collapse, folding the leaf. The overall idea of 'cells changing shape to cause movement' is similar to muscle movement, but the actual mechanism (water content vs contractile proteins) is different." }
    ]
  },
  {
    id: 7,
    caseTitle: "Dwarfism vs Gigantism",
    caseDescription: "Two children in the same class show unusually different growth patterns as they grow up -- one child is noticeably much shorter than average, while another grows to an unusually tall height, both traced back to childhood hormone levels.",
    subQuestions: [
      { question: "Which hormone, and which gland, is most likely responsible for both of these growth patterns?", answer: "Growth hormone, secreted by the pituitary gland." },
      { question: "Explain how a deficiency versus an excess of this hormone during childhood leads to these two different outcomes.", answer: "A deficiency of growth hormone during childhood results in dwarfism (unusually short stature), because the body does not receive enough of the signal needed to grow to a typical height. An excess of growth hormone during childhood results in gigantism (unusually tall stature), because the body is signalled to keep growing far beyond the typical range." },
      { question: "Why is the pituitary gland described as the 'master gland' in this context?", answer: "The pituitary gland is called the master gland because, beyond growth hormone, it also secretes several other hormones (like TSH and ACTH) that directly control the activity of other endocrine glands throughout the body." }
    ]
  },
  {
    id: 8,
    caseTitle: "Ripening the Mangoes",
    caseDescription: "A fruit seller notices that placing a few ripe bananas in a closed box with unripe mangoes causes the mangoes to ripen much faster than mangoes left out in the open.",
    subQuestions: [
      { question: "Which plant hormone is responsible for this faster ripening, and what special property of this hormone explains why a closed box makes such a difference?", answer: "Ethylene is responsible. Because ethylene is a gas, it builds up inside a closed box (rather than dispersing into the open air), so the unripe mangoes are exposed to a much higher concentration of it, speeding up their ripening." },
      { question: "Besides ripening, name one other effect this hormone has on plants.", answer: "Ethylene also promotes ageing (senescence) and wilting of leaves and flowers, and can cause fruits/flowers/leaves to fall off -- it works opposite to cytokinin, which delays ageing." },
      { question: "How might this natural process be used commercially to ripen fruit for market?", answer: "Fruit sellers or distributors can artificially expose unripe fruits to ethylene gas (or to fruits that naturally release it, like ripe bananas) in a controlled, enclosed space, allowing them to control and speed up ripening before the fruit reaches the market." }
    ]
  },
];

// ── SELF-ASSESSMENT (50-question timed quiz) ──
export const CC10_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "What is the structural and functional unit of the nervous system?", options: ["Nephron", "Neuron", "Axon", "Synapse"], correctAnswer: 1, explanation: "The neuron is the structural and functional unit of the nervous system." },
  { id: 2, question: "Which part of the neuron receives signals from other neurons?", options: ["Axon", "Dendrite", "Nucleus", "Axon terminal"], correctAnswer: 1, explanation: "Dendrites receive incoming signals from other neurons or sensory receptors." },
  { id: 3, question: "The gap between two neurons is called the:", options: ["Axon", "Dendrite", "Synapse", "Node of Ranvier"], correctAnswer: 2, explanation: "The synapse is the functional gap between two neurons." },
  { id: 4, question: "Myelin sheath in the CNS is formed by:", options: ["Schwann cells", "Oligodendroglial cells", "Sensory neurons", "Motor neurons"], correctAnswer: 1, explanation: "Oligodendroglial cells form the myelin sheath in the central nervous system; Schwann cells do this in the PNS." },
  { id: 5, question: "Neurons carrying information from sense organs to the brain are called:", options: ["Motor neurons", "Sensory neurons", "Relay neurons", "Interneurons only"], correctAnswer: 1, explanation: "Sensory (afferent) neurons carry information from the senses to the brain." },
  { id: 6, question: "Which neurons connect sensory and motor neurons?", options: ["Interneurons", "Efferent neurons", "Afferent neurons", "Schwann cells"], correctAnswer: 0, explanation: "Interneurons (relay neurons) connect sensory and motor neurons." },
  { id: 7, question: "The CNS consists of the brain and the:", options: ["Cranial nerves", "Spinal cord", "Autonomic nerves", "Peripheral nerves"], correctAnswer: 1, explanation: "The central nervous system consists of the brain and spinal cord." },
  { id: 8, question: "The largest part of the human brain is the:", options: ["Hindbrain", "Midbrain", "Forebrain", "Medulla"], correctAnswer: 2, explanation: "The forebrain is the largest part of the brain." },
  { id: 9, question: "Which part of the brain controls balance and posture?", options: ["Cerebrum", "Cerebellum", "Medulla", "Thalamus"], correctAnswer: 1, explanation: "The cerebellum controls balance and posture, and coordinates precise movement." },
  { id: 10, question: "Heartbeat and breathing rate are controlled by the:", options: ["Cerebrum", "Cerebellum", "Medulla oblongata", "Pons"], correctAnswer: 2, explanation: "The medulla oblongata controls involuntary functions like heartbeat and breathing." },
  { id: 11, question: "The two hemispheres of the cerebrum are connected by the:", options: ["Spinal cord", "Corpus callosum", "Meninges", "Node of Ranvier"], correctAnswer: 1, explanation: "The corpus callosum connects the two cerebral hemispheres." },
  { id: 12, question: "The three protective membranes around the brain and spinal cord are called:", options: ["Meninges", "Ganglia", "Myelin layers", "Neuroglia"], correctAnswer: 0, explanation: "The meninges are the three protective membrane layers of the brain and spinal cord." },
  { id: 13, question: "Which fluid cushions the brain and keeps it buoyant?", options: ["Blood", "Lymph", "Cerebrospinal fluid", "Synovial fluid"], correctAnswer: 2, explanation: "Cerebrospinal fluid (CSF) cushions the brain and keeps it buoyant." },
  { id: 14, question: "The vertebral column is made up of how many vertebrae?", options: ["22", "33", "12", "44"], correctAnswer: 1, explanation: "The vertebral column has 33 ring-shaped vertebrae." },
  { id: 15, question: "Which part of the PNS controls voluntary actions?", options: ["Autonomic nervous system", "Somatic nervous system", "Sympathetic system only", "Central nervous system"], correctAnswer: 1, explanation: "The somatic nervous system controls voluntary actions of skin and muscles." },
  { id: 16, question: "A reflex arc is completed mainly in the:", options: ["Cerebrum", "Spinal cord", "Cerebellum", "Hypothalamus"], correctAnswer: 1, explanation: "Reflex arcs are formed and completed in the spinal cord for a fast response." },
  { id: 17, question: "In a reflex arc, the effector is usually a:", options: ["Receptor cell", "Muscle", "Sensory neuron", "Gland duct"], correctAnswer: 1, explanation: "The effector, which carries out the reflex response, is usually a muscle (or sometimes a gland)." },
  { id: 18, question: "The correct order of a reflex arc is:", options: ["Receptor -> Sensory neuron -> Spinal cord -> Motor neuron -> Effector", "Effector -> Spinal cord -> Receptor", "Motor neuron -> Sensory neuron -> Effector", "Receptor -> Effector -> Spinal cord"], correctAnswer: 0, explanation: "A reflex arc runs: receptor -> sensory neuron -> spinal cord -> motor neuron -> effector." },
  { id: 19, question: "At the neuromuscular junction, neurotransmitters are released from the:", options: ["Postsynaptic membrane", "Presynaptic terminal", "Sarcolemma", "Myofibril"], correctAnswer: 1, explanation: "The presynaptic terminal of the motor neuron releases neurotransmitters." },
  { id: 20, question: "Muscle contraction happens because:", options: ["Muscle cells divide rapidly", "Special proteins change shape, shortening the cell", "Muscle cells absorb more oxygen", "Hormones are released into muscles"], correctAnswer: 1, explanation: "Special contractile proteins in muscle cells change shape and rearrange, shortening the cell to cause contraction." },
  { id: 21, question: "The hormonal system is also called the:", options: ["Endocrine system", "Exocrine system", "Nervous system", "Digestive system"], correctAnswer: 0, explanation: "The hormonal system is also known as the endocrine system." },
  { id: 22, question: "Endocrine glands release hormones directly into the:", options: ["Digestive tract", "Bloodstream", "Skin surface", "Lymph nodes only"], correctAnswer: 1, explanation: "Endocrine glands are ductless and release hormones directly into the blood." },
  { id: 23, question: "Which gland is called the 'master gland'?", options: ["Thyroid", "Adrenal", "Pituitary", "Pancreas"], correctAnswer: 2, explanation: "The pituitary gland is the master gland, controlling other endocrine glands." },
  { id: 24, question: "Deficiency of growth hormone in childhood leads to:", options: ["Gigantism", "Dwarfism", "Goitre", "Diabetes"], correctAnswer: 1, explanation: "A deficiency of growth hormone in childhood causes dwarfism." },
  { id: 25, question: "Excess growth hormone in childhood leads to:", options: ["Dwarfism", "Goitre", "Gigantism", "Diabetes"], correctAnswer: 2, explanation: "Excess growth hormone in childhood causes gigantism." },
  { id: 26, question: "Melatonin, which regulates the sleep-wake cycle, is secreted by the:", options: ["Pineal gland", "Thyroid gland", "Thymus", "Adrenal gland"], correctAnswer: 0, explanation: "The pineal gland secretes melatonin, regulating sleep-wake cycles." },
  { id: 27, question: "Thyroxine, which regulates metabolism, is secreted by the:", options: ["Pituitary gland", "Thyroid gland", "Parathyroid gland", "Adrenal gland"], correctAnswer: 1, explanation: "The thyroid gland secretes thyroxine, which regulates metabolic rate." },
  { id: 28, question: "Iodine deficiency can cause:", options: ["Diabetes", "Goitre", "Gigantism", "Dwarfism"], correctAnswer: 1, explanation: "Iodine deficiency reduces thyroxine production, causing the thyroid to enlarge (goitre)." },
  { id: 29, question: "Which gland regulates calcium balance in blood and bones?", options: ["Parathyroid gland", "Thymus", "Pineal gland", "Testis"], correctAnswer: 0, explanation: "The parathyroid gland releases PTH, which regulates calcium balance." },
  { id: 30, question: "The thymus gland is important for producing:", options: ["Insulin", "T cells for immunity", "Estrogen", "Melatonin"], correctAnswer: 1, explanation: "The thymus produces T cells, important for the immune system, especially in childhood." },
  { id: 31, question: "Adrenaline is secreted by the:", options: ["Pancreas", "Thyroid gland", "Adrenal gland", "Pituitary gland"], correctAnswer: 2, explanation: "Adrenaline is secreted by the adrenal glands, located atop the kidneys." },
  { id: 32, question: "Which hormone lowers blood sugar levels?", options: ["Glucagon", "Insulin", "Adrenaline", "Thyroxine"], correctAnswer: 1, explanation: "Insulin, secreted by the pancreas, lowers blood sugar levels." },
  { id: 33, question: "Which hormone raises blood sugar levels?", options: ["Insulin", "Glucagon", "Estrogen", "Oxytocin"], correctAnswer: 1, explanation: "Glucagon, secreted by the pancreas, raises blood sugar levels." },
  { id: 34, question: "Diabetes results from a problem with the hormone:", options: ["Insulin", "Adrenaline", "Testosterone", "Thyroxine"], correctAnswer: 0, explanation: "Diabetes results from insufficient or ineffective insulin, causing high blood sugar." },
  { id: 35, question: "Estrogen and progesterone are secreted by the:", options: ["Testis", "Ovary", "Adrenal gland", "Thyroid gland"], correctAnswer: 1, explanation: "The ovaries secrete estrogen and progesterone." },
  { id: 36, question: "Testosterone is secreted by the:", options: ["Ovary", "Testis", "Placenta", "Pancreas"], correctAnswer: 1, explanation: "The testis secretes testosterone and produces sperm." },
  { id: 37, question: "Which of these is an exocrine gland?", options: ["Pituitary gland", "Sweat gland", "Adrenal gland", "Thyroid gland"], correctAnswer: 1, explanation: "Sweat glands are exocrine -- they release sweat through a duct, not hormones into blood." },
  { id: 38, question: "The pancreas is an example of a:", options: ["Endocrine gland only", "Exocrine gland only", "Heterocrine gland", "Neither"], correctAnswer: 2, explanation: "The pancreas is heterocrine -- it secretes digestive enzymes via a duct and hormones directly into the blood." },
  { id: 39, question: "A rise in blood sugar is detected by cells of the:", options: ["Liver", "Pancreas", "Kidney", "Spleen"], correctAnswer: 1, explanation: "Cells of the pancreas detect rising blood sugar and respond by secreting more insulin." },
  { id: 40, question: "Directional growth of a plant part toward or away from a stimulus is called:", options: ["Nastic movement", "Tropic movement", "Osmosis", "Transpiration"], correctAnswer: 1, explanation: "Tropic movements are directional growth responses to a stimulus." },
  { id: 41, question: "Growth of a shoot toward light is called:", options: ["Positive geotropism", "Positive phototropism", "Negative phototropism", "Positive hydrotropism"], correctAnswer: 1, explanation: "Shoots bending toward light show positive phototropism." },
  { id: 42, question: "Roots growing downward due to gravity is called:", options: ["Negative geotropism", "Positive geotropism", "Positive phototropism", "Thigmotropism"], correctAnswer: 1, explanation: "Roots growing down, in the direction of gravity, show positive geotropism." },
  { id: 43, question: "Coiling of a tendril around a support is an example of:", options: ["Hydrotropism", "Chemotropism", "Thigmotropism", "Thermotropism"], correctAnswer: 2, explanation: "Tendril coiling around a support is thigmotropism -- a response to touch." },
  { id: 44, question: "The plant hormone primarily responsible for phototropism is:", options: ["Cytokinin", "Auxin", "Gibberellin", "Ethylene"], correctAnswer: 1, explanation: "Auxin's uneven distribution causes phototropic bending." },
  { id: 45, question: "Non-directional movement of plants in response to a stimulus is called:", options: ["Tropic movement", "Nastic movement", "Peristalsis", "Reflex movement"], correctAnswer: 1, explanation: "Nastic movements are non-directional responses to a stimulus." },
  { id: 46, question: "The folding of Mimosa pudica leaves on touch is an example of:", options: ["Photonasty", "Nyctinasty", "Thigmonasty", "Thermonasty"], correctAnswer: 2, explanation: "Mimosa pudica's leaf-folding on touch is thigmonasty." },
  { id: 47, question: "Which plant hormone promotes cell division?", options: ["Auxin", "Cytokinin", "Abscisic acid", "Ethylene"], correctAnswer: 1, explanation: "Cytokinin promotes cell division in plants." },
  { id: 48, question: "Which plant hormone helps break seed dormancy?", options: ["Abscisic acid", "Ethylene", "Gibberellin", "None of these"], correctAnswer: 2, explanation: "Gibberellin breaks seed dormancy, promoting germination." },
  { id: 49, question: "Which plant hormone is called the 'stress hormone'?", options: ["Auxin", "Gibberellin", "Cytokinin", "Abscisic acid"], correctAnswer: 3, explanation: "Abscisic acid is called the stress hormone -- it induces dormancy and closes stomata under stress." },
  { id: 50, question: "The 'ripening hormone' in plants, which is a gas, is:", options: ["Auxin", "Ethylene", "Gibberellin", "Cytokinin"], correctAnswer: 1, explanation: "Ethylene, a gaseous hormone, speeds up fruit ripening." },
];
