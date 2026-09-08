// Class 8 Science -- Chapter: Health: The Ultimate Treasure (what health really means, personal
// and community factors, communicable vs non-communicable disease, disease spread and prevention,
// immunity, deficiency diseases, and mental health/healthy habits). This chapter is reasoning-based
// rather than numeric, so every answer states the reason behind it, not just the conclusion.
import type {
  QuizQuestion,
  NCERTSolvedQuestion,
  ShortQuestion,
  LongQuestion,
  CompetencyQuestion,
} from "../types-custom";

// ── SOLVED PRACTICE QUESTIONS ──
export const SCIENCE8H_SOLVED_QUESTIONS: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Practice Q1",
    question: "Explain, using the accepted definition of health, why a person free of any illness might still not be considered completely healthy.",
    given: { "Concept": "Definition of health" },
    formulaUsed: "Health is a state of complete physical, mental, and social well-being, not merely the absence of disease.",
    derivationSteps: [
      "The definition of health has three parts: physical, mental, and social well-being.",
      "A person without any physical illness has only satisfied the physical part of this definition.",
      "If their mind is under constant stress, or their social relationships are troubled, the mental and social parts remain unmet.",
      "Since all three parts are required together, the person cannot be considered completely healthy."
    ],
    finalAnswer: "A person free of illness may still lack complete health if their mental or social well-being is not also satisfied.",
    conceptualTip: "Whenever a question describes someone as 'not sick' but under stress or socially isolated, this is a strong signal to apply the three-part definition of health."
  },
  {
    id: 2,
    questionNumber: "Practice Q2",
    question: "Distinguish between personal health and community health, giving one example of each.",
    given: { "Concept": "Personal health vs community health" },
    formulaUsed: "Personal health concerns one individual; community health concerns a whole group sharing common conditions.",
    derivationSteps: [
      "Personal health refers to an individual's own physical, mental, and social well-being, influenced by their personal habits.",
      "Community health refers to the overall health of a group of people, often shaped by shared conditions like water supply or sanitation.",
      "Example of personal health: one student eating a balanced diet.",
      "Example of community health: a whole neighbourhood benefiting from a safe, treated water supply."
    ],
    finalAnswer: "Personal health is about one individual's well-being; community health is about the shared well-being of a whole group, often depending on common infrastructure like water and sanitation.",
    conceptualTip: "A good personal habit can be undone by a poor community condition, and vice versa -- the two levels interact constantly."
  },
  {
    id: 3,
    questionNumber: "Practice Q3",
    question: "Classify the following as communicable or non-communicable, with reasoning: tuberculosis, diabetes.",
    given: { "Diseases": "Tuberculosis, Diabetes" },
    formulaUsed: "Communicable diseases spread between hosts via a pathogen; non-communicable diseases do not.",
    derivationSteps: [
      "Tuberculosis is caused by a bacterium that can spread from an infected person to a healthy one, mainly through the air -- this matches the definition of a communicable disease.",
      "Diabetes develops due to lifestyle and genetic factors affecting how the body manages sugar levels -- it involves no pathogen and cannot spread between people, matching the definition of a non-communicable disease."
    ],
    finalAnswer: "Tuberculosis is communicable; diabetes is non-communicable.",
    conceptualTip: "Always ask: is there a pathogen involved, and can it actually travel from one host to another? This single question separates the two categories cleanly."
  },
  {
    id: 4,
    questionNumber: "Practice Q4",
    question: "Explain the mode of transmission for cholera, and suggest one effective prevention measure that directly targets it.",
    given: { "Disease": "Cholera" },
    formulaUsed: "Cholera is a water-borne bacterial disease.",
    derivationSteps: [
      "Cholera is caused by a bacterium that spreads mainly through water contaminated with the pathogen.",
      "An effective prevention measure must directly target this water-based pathway.",
      "Ensuring safe, clean drinking water (through boiling or proper treatment) removes the pathogen from the water before it can be consumed, directly blocking this mode of transmission."
    ],
    finalAnswer: "Cholera spreads through contaminated water; ensuring safe drinking water directly prevents this mode of transmission.",
    conceptualTip: "A prevention measure is only effective if it targets the SPECIFIC pathway a disease actually uses -- clean water does nothing against a disease spread by mosquitoes, for example."
  },
  {
    id: 5,
    questionNumber: "Practice Q5",
    question: "Explain how vaccination builds acquired immunity against a specific disease, without the person actually falling ill.",
    given: { "Concept": "Vaccination and acquired immunity" },
    formulaUsed: "A vaccine introduces a weakened or killed pathogen (or part of it) to train the body's defences.",
    derivationSteps: [
      "A vaccine contains a weakened, killed, or partial form of a specific pathogen.",
      "This form is too weak to cause the actual disease in a healthy person.",
      "It is still enough for the body's defence system to learn to recognise this specific pathogen.",
      "If the real, active pathogen is encountered later, the body can respond quickly and effectively, often preventing illness."
    ],
    finalAnswer: "Vaccination safely trains the body's defences using a harmless form of a pathogen, building acquired immunity without causing the actual disease.",
    conceptualTip: "This is exactly why a vaccinated person does not fall seriously ill even after later exposure to the real pathogen -- their body has already learned how to respond."
  },
  {
    id: 6,
    questionNumber: "Practice Q6",
    question: "A child develops soft, poorly formed bones. Identify the likely deficiency disease and the missing nutrient responsible.",
    given: { "Symptom": "Soft, poorly formed bones in a child" },
    formulaUsed: "Rickets is caused by a long-term lack of vitamin D (or calcium).",
    derivationSteps: [
      "Soft, poorly formed bones in a growing child are a classic sign of rickets.",
      "Rickets develops from a long-term lack of vitamin D or calcium in the diet, both of which are essential for healthy bone development."
    ],
    finalAnswer: "The child likely has rickets, caused by a long-term lack of vitamin D (or calcium).",
    conceptualTip: "Each deficiency disease is linked to one specific missing nutrient -- learning these pairs (iron-anaemia, vitamin C-scurvy, vitamin D-rickets, iodine-goitre) makes this kind of question quick to answer."
  },
  {
    id: 7,
    questionNumber: "Practice Q7",
    question: "Explain why a diet that provides enough of every nutrient except iodine can still lead to a health problem.",
    given: { "Situation": "Diet missing only iodine" },
    formulaUsed: "A long-term lack of even a single essential nutrient can cause its specific deficiency disease.",
    derivationSteps: [
      "Each essential nutrient supports a specific function in the body.",
      "Iodine is specifically needed for the proper functioning of a gland in the neck.",
      "Even if every other nutrient need is fully met, a consistent lack of iodine alone can still lead to goitre, since no other nutrient can substitute for iodine's specific role."
    ],
    finalAnswer: "A diet missing only iodine can still cause goitre, since meeting every other nutrient need does not compensate for the specific, essential role of iodine.",
    conceptualTip: "Deficiency diseases are nutrient-specific -- being well-fed overall does not protect against a gap in just one essential nutrient."
  },
  {
    id: 8,
    questionNumber: "Practice Q8",
    question: "Explain why mental health is considered a genuine part of the overall definition of health, using an example.",
    given: { "Concept": "Mental health as part of overall health" },
    formulaUsed: "Health includes physical, mental, and social well-being together.",
    derivationSteps: [
      "The accepted definition of health explicitly names mental well-being as one of its three required parts.",
      "A student who is physically fit but constantly anxious about exams has unmet mental well-being.",
      "According to the definition, this means the student's overall health is incomplete, even though their body is functioning normally."
    ],
    finalAnswer: "Mental health is a genuine, required part of overall health, not a separate or optional concern -- as shown by a physically fit but constantly anxious student not being considered fully healthy.",
    conceptualTip: "Whenever a scenario mentions stress, anxiety, or emotional strain alongside good physical condition, this is a cue to discuss the mental well-being component of health."
  },
  {
    id: 9,
    questionNumber: "Practice Q9",
    question: "Explain why widespread vaccination against a communicable disease benefits even people who are not vaccinated.",
    given: { "Concept": "Herd immunity" },
    formulaUsed: "When a large portion of a population is immune, a disease has fewer opportunities to spread.",
    derivationSteps: [
      "Vaccination makes an individual immune to a specific pathogen.",
      "When a large enough portion of a community is immune, the pathogen struggles to find enough new, non-immune hosts to keep spreading.",
      "This reduces the overall spread of the disease through the community, lowering the chances that it ever reaches the remaining non-immune individuals."
    ],
    finalAnswer: "Widespread vaccination creates herd immunity, reducing disease spread through the community and indirectly protecting even unvaccinated individuals.",
    conceptualTip: "Herd immunity only works well when a LARGE portion of the population is immune -- a small vaccinated minority provides far less community-wide protection."
  },
  {
    id: 10,
    questionNumber: "Practice Q10",
    question: "A risk factor for a non-communicable disease is present in a person, but they never develop the disease. Explain why this does not disprove the risk factor.",
    given: { "Concept": "Risk factor vs guaranteed cause" },
    formulaUsed: "A risk factor increases the CHANCE of a disease; it does not guarantee it will occur.",
    derivationSteps: [
      "A risk factor, such as a high-salt diet, is associated with a higher likelihood of developing a related non-communicable disease, such as high blood pressure.",
      "This is different from a direct cause, like a pathogen causing a communicable disease.",
      "Other factors, such as genetics or overall lifestyle, can also influence whether the disease actually develops in a specific individual.",
      "One person avoiding the disease despite having the risk factor does not disprove the general, population-level association between the risk factor and the disease."
    ],
    finalAnswer: "A risk factor only increases the likelihood of a disease; individual outcomes can still vary due to other factors, so one exception does not disprove the risk factor's overall role.",
    conceptualTip: "Never confuse a 'risk factor' (which raises probability) with a 'cause' (which directly and reliably produces an effect) -- they behave very differently in reasoning questions."
  },
];

// ── MCQs (1 mark each) ──
export const SCIENCE8H_MCQS: QuizQuestion[] = [
  { id: 1, question: "According to the accepted definition, health is:", options: ["Simply the absence of disease", "A state of complete physical, mental, and social well-being", "Only about physical fitness", "Only about avoiding infection"], correctAnswer: 1, explanation: "Health includes physical, mental, and social well-being together, not merely the absence of disease." },
  { id: 2, question: "A person with no physical illness but constant stress and social isolation is:", options: ["Completely healthy", "Not completely healthy, since mental and social well-being are missing", "Automatically diseased", "Impossible to assess"], correctAnswer: 1, explanation: "Complete health requires physical, mental, and social well-being together." },
  { id: 3, question: "Personal health refers to:", options: ["The health of a whole community", "The health and well-being of one individual", "Only physical fitness", "Government health policy"], correctAnswer: 1, explanation: "Personal health concerns one individual's own well-being." },
  { id: 4, question: "Community health depends heavily on:", options: ["Only individual willpower", "Shared conditions like water supply and sanitation", "Nothing outside personal habits", "Only genetics"], correctAnswer: 1, explanation: "Community health depends on shared infrastructure and conditions affecting many people at once." },
  { id: 5, question: "Which of the following is a personal factor supporting good health?", options: ["Safe public water supply", "Balanced diet", "Community sewage treatment", "Public healthcare access"], correctAnswer: 1, explanation: "A balanced diet is a personal habit; the others are community-level factors." },
  { id: 6, question: "Which of the following is a community-level factor supporting good health?", options: ["Personal hygiene", "Adequate rest", "Safe drinking water supply", "Regular exercise"], correctAnswer: 2, explanation: "Safe drinking water supply is typically a shared, community-level factor." },
  { id: 7, question: "A disease is best defined as:", options: ["A condition where normal body/mind function is disturbed", "Always a communicable infection", "Only a mental health issue", "A type of vaccine"], correctAnswer: 0, explanation: "Disease is any disturbance of normal body or mind function." },
  { id: 8, question: "A communicable disease is one that:", options: ["Never spreads between people", "Can spread from an infected host to a healthy one", "Only affects animals", "Cannot be prevented"], correctAnswer: 1, explanation: "Communicable diseases can spread between hosts." },
  { id: 9, question: "A non-communicable disease is one that:", options: ["Spreads rapidly between people", "Does not spread between people, often linked to lifestyle or genetics", "Is always caused by a virus", "Is always curable with antibiotics"], correctAnswer: 1, explanation: "Non-communicable diseases do not spread between people and often relate to lifestyle or genetics." },
  { id: 10, question: "Which of these is a communicable disease?", options: ["Diabetes", "Tuberculosis", "High blood pressure", "Obesity"], correctAnswer: 1, explanation: "Tuberculosis is caused by a bacterium and can spread between people." },
  { id: 11, question: "Which of these is a non-communicable disease?", options: ["Common cold", "Cholera", "Diabetes", "Chicken pox"], correctAnswer: 2, explanation: "Diabetes does not spread between people and is linked to lifestyle/genetics." },
  { id: 12, question: "Communicable diseases are caused by:", options: ["Only genetics", "Pathogens such as bacteria, viruses, fungi, or protozoa", "Only diet", "Only stress"], correctAnswer: 1, explanation: "Communicable diseases are caused by pathogens." },
  { id: 13, question: "The common cold spreads mainly through:", options: ["Contaminated water", "Air (droplets from coughing/sneezing)", "Only direct injection", "Only through soil"], correctAnswer: 1, explanation: "The common cold spreads through airborne droplets." },
  { id: 14, question: "Cholera spreads mainly through:", options: ["Air", "Contaminated water", "Only mosquito bites", "Only direct skin contact"], correctAnswer: 1, explanation: "Cholera spreads mainly through contaminated water." },
  { id: 15, question: "A vector is:", options: ["A type of medicine", "A carrier that transfers a pathogen between hosts", "A microscope part", "A food preservative"], correctAnswer: 1, explanation: "A vector, such as a mosquito, carries a pathogen from one host to another." },
  { id: 16, question: "Malaria is transmitted by:", options: ["Contaminated water", "The female Anopheles mosquito", "Direct contact only", "Air only"], correctAnswer: 1, explanation: "Malaria is transmitted by the female Anopheles mosquito." },
  { id: 17, question: "Which prevention measure would be most effective against a water-borne disease?", options: ["Covering coughs", "Mosquito nets", "Safe, clean drinking water", "Avoiding all exercise"], correctAnswer: 2, explanation: "Safe drinking water directly targets water-borne disease spread." },
  { id: 18, question: "Which prevention measure would be most effective against a vector-borne disease like malaria?", options: ["Boiling water", "Removing stagnant water and using mosquito nets", "Covering coughs", "Eating more vitamin C"], correctAnswer: 1, explanation: "Removing mosquito breeding sites and using nets targets vector-borne spread." },
  { id: 19, question: "Vaccination helps prevent disease by:", options: ["Killing all pathogens in the environment", "Training the body's defences in advance", "Removing the need for hygiene", "Curing illness after symptoms appear"], correctAnswer: 1, explanation: "Vaccination trains the body's defences before real exposure occurs." },
  { id: 20, question: "Immunity is best defined as:", options: ["The body's ability to defend itself against pathogens and disease", "A type of vaccine ingredient", "A measuring instrument", "A food preservation method"], correctAnswer: 0, explanation: "Immunity is the body's ability to defend against pathogens and disease." },
  { id: 21, question: "Innate immunity is:", options: ["Built only after vaccination", "The general defence present from birth", "Only found in animals", "The same as acquired immunity"], correctAnswer: 1, explanation: "Innate immunity is the general defence a person is born with." },
  { id: 22, question: "Acquired immunity develops:", options: ["Only before birth", "After the body encounters a specific pathogen, through infection or vaccination", "Without any pathogen exposure at all", "Only in certain animals"], correctAnswer: 1, explanation: "Acquired immunity develops after encountering a specific pathogen." },
  { id: 23, question: "The skin acting as a barrier against pathogens is an example of:", options: ["Acquired immunity", "Innate immunity", "A vaccine", "A deficiency disease"], correctAnswer: 1, explanation: "The skin barrier is a form of innate immunity present from birth." },
  { id: 24, question: "A deficiency disease is caused by:", options: ["A virus", "A long-term lack of a particular nutrient", "A vector", "Excess exercise"], correctAnswer: 1, explanation: "Deficiency diseases result from a long-term lack of a specific nutrient." },
  { id: 25, question: "Anaemia is caused by a long-term lack of:", options: ["Vitamin C", "Iron", "Iodine", "Vitamin D"], correctAnswer: 1, explanation: "Anaemia is caused by a long-term lack of iron." },
  { id: 26, question: "Scurvy is caused by a long-term lack of:", options: ["Iron", "Vitamin C", "Iodine", "Calcium"], correctAnswer: 1, explanation: "Scurvy is caused by a long-term lack of vitamin C." },
  { id: 27, question: "Rickets is caused by a long-term lack of:", options: ["Iron", "Vitamin C", "Vitamin D (or calcium)", "Iodine"], correctAnswer: 2, explanation: "Rickets is caused by a long-term lack of vitamin D or calcium, affecting bone development." },
  { id: 28, question: "Goitre is caused by a long-term lack of:", options: ["Iodine", "Vitamin C", "Iron", "Vitamin D"], correctAnswer: 0, explanation: "Goitre is caused by a long-term lack of iodine." },
  { id: 29, question: "Which is the main way to prevent deficiency diseases?", options: ["Vaccination", "Eating a truly balanced diet", "Boiling water", "Using mosquito nets"], correctAnswer: 1, explanation: "A balanced diet with all essential nutrients prevents deficiency diseases." },
  { id: 30, question: "Mental health refers to:", options: ["Only physical fitness", "A person's emotional and psychological well-being", "Only social relationships", "A type of vaccine"], correctAnswer: 1, explanation: "Mental health concerns emotional and psychological well-being." },
  { id: 31, question: "Which habit is generally considered harmful to overall health?", options: ["Balanced diet", "Regular exercise", "Tobacco use", "Adequate rest"], correctAnswer: 2, explanation: "Tobacco use is a harmful habit linked to serious long-term health damage." },
  { id: 32, question: "A balanced routine of activity, rest, and recreation supports:", options: ["Only physical health", "Both physical and mental well-being together", "Only social health", "Neither physical nor mental health"], correctAnswer: 1, explanation: "A balanced routine supports multiple parts of health together." },
  { id: 33, question: "Herd immunity occurs when:", options: ["No one is immune", "A large portion of a population is immune, reducing disease spread", "Only animals are vaccinated", "A disease cannot be prevented at all"], correctAnswer: 1, explanation: "Herd immunity reduces spread when enough of the population is immune." },
  { id: 34, question: "Why does widespread vaccination help even unvaccinated individuals?", options: ["It has no effect on them", "It reduces the disease's opportunities to spread through the community", "It directly cures unvaccinated people", "It removes the need for personal hygiene"], correctAnswer: 1, explanation: "Herd immunity reduces community-wide spread, indirectly protecting the unvaccinated." },
  { id: 35, question: "A risk factor for a non-communicable disease:", options: ["Guarantees the disease will occur", "Increases the chance of the disease, without guaranteeing it", "Has no effect on disease likelihood", "Only applies to communicable diseases"], correctAnswer: 1, explanation: "A risk factor increases likelihood but does not guarantee the disease." },
  { id: 36, question: "Which of these is an example of a non-communicable disease risk factor?", options: ["Contaminated water", "A high-salt diet", "A mosquito bite", "An infected person's cough"], correctAnswer: 1, explanation: "A high-salt diet is a risk factor for conditions like high blood pressure." },
  { id: 37, question: "Which statement correctly distinguishes prevention from treatment?", options: ["Prevention and treatment are identical", "Prevention stops a disease before it occurs; treatment manages it after it occurs", "Treatment always prevents future cases", "Prevention only applies to non-communicable diseases"], correctAnswer: 1, explanation: "Prevention acts before disease onset; treatment manages an existing case." },
  { id: 38, question: "Why is community-wide sanitation considered important for health?", options: ["It only benefits one household", "It reduces the risk of water contamination and disease spread for many people at once", "It has no link to disease", "It only matters for non-communicable diseases"], correctAnswer: 1, explanation: "Sanitation is a community-level factor reducing disease risk broadly." },
  { id: 39, question: "A child shows soft, poorly developed bones. This is most likely a sign of:", options: ["Scurvy", "Rickets", "Goitre", "Anaemia"], correctAnswer: 1, explanation: "Soft, poorly developed bones are a classic sign of rickets." },
  { id: 40, question: "A person shows unusual tiredness and pale skin, possibly due to a lack of iron. This condition is called:", options: ["Rickets", "Goitre", "Anaemia", "Scurvy"], correctAnswer: 2, explanation: "Anaemia is linked to iron deficiency and causes tiredness and pale skin." },
  { id: 41, question: "Why can two people with the same risk factor have different health outcomes?", options: ["Risk factors always guarantee identical outcomes", "Other factors like genetics and overall lifestyle also play a role", "This situation is impossible", "Risk factors have no real effect"], correctAnswer: 1, explanation: "Other individual factors also influence whether a disease actually develops." },
  { id: 42, question: "Which best explains why identifying whether a disease is communicable or non-communicable matters?", options: ["It does not matter at all", "It determines whether spread-prevention or lifestyle management is the priority", "All diseases are treated identically regardless", "Only communicable diseases need any treatment"], correctAnswer: 1, explanation: "The distinction determines the appropriate management approach." },
  { id: 43, question: "Which of these best completes: 'A fair prevention method should always match...'", options: ["The disease's actual mode of transmission or cause", "Whichever method is cheapest", "A random selection of measures", "The season of the year only"], correctAnswer: 0, explanation: "Effective prevention targets the disease's actual mode of transmission or underlying cause." },
  { id: 44, question: "Which of these would NOT help prevent a vector-borne disease?", options: ["Removing stagnant water", "Using mosquito nets", "Boiling drinking water", "Reducing mosquito breeding sites"], correctAnswer: 2, explanation: "Boiling water targets water-borne disease, not vector-borne disease." },
  { id: 45, question: "Which best describes the relationship between diet and deficiency diseases?", options: ["Diet has no link to these diseases", "A long-term lack of a specific nutrient in the diet causes its related deficiency disease", "All deficiency diseases have the same single cause", "Deficiency diseases are always communicable"], correctAnswer: 1, explanation: "Deficiency diseases are directly linked to a long-term lack of a specific nutrient." },
  { id: 46, question: "Which statement about mental health is most accurate?", options: ["It is unrelated to overall health", "It is an essential part of the accepted definition of health", "It only matters for adults", "It cannot be supported by daily habits"], correctAnswer: 1, explanation: "Mental health is explicitly part of the accepted definition of health." },
  { id: 47, question: "Which of these could help support mental well-being?", options: ["Ignoring stress completely", "Talking to a trusted friend or family member", "Avoiding all rest", "Isolating from others"], correctAnswer: 1, explanation: "Talking to someone trusted is a healthy way to manage stress and support mental well-being." },
  { id: 48, question: "Why is it inaccurate to assume a claimed risk factor is disproven by a single healthy exception?", options: ["Risk factors are always 100% guaranteed", "A risk factor only affects probability, not every individual outcome", "Exceptions are impossible in health science", "Risk factors and causes are identical concepts"], correctAnswer: 1, explanation: "A risk factor affects overall probability, not a guaranteed individual outcome." },
  { id: 49, question: "Which best summarises the overall theme of this chapter?", options: ["Health is simple and only about avoiding germs", "Health is a complete state involving physical, mental, and social well-being, supported by both personal habits and community conditions", "Only medicine can achieve good health", "Disease prevention is unnecessary if treatment is available"], correctAnswer: 1, explanation: "This captures the chapter's central theme about the full scope of health and how it is protected." },
  { id: 50, question: "Which of these correctly pairs a deficiency disease with its missing nutrient?", options: ["Goitre -- Vitamin C", "Scurvy -- Iodine", "Rickets -- Vitamin D", "Anaemia -- Vitamin D"], correctAnswer: 2, explanation: "Rickets is correctly paired with a lack of vitamin D; the other pairs are incorrect." },
];

// ── VERY SHORT (2 marks each) ──
export const SCIENCE8H_VERY_SHORT: ShortQuestion[] = [
  { id: 1, question: "Define health according to the accepted definition.", answer: "Health is a state of complete physical, mental, and social well-being, not merely the absence of disease.", keyPoints: ["Three parts named", "Not just absence of disease"] },
  { id: 2, question: "Name the three components of health.", answer: "Physical, mental, and social well-being.", keyPoints: ["All three named"] },
  { id: 3, question: "Distinguish briefly between personal health and community health.", answer: "Personal health is about one individual's well-being; community health is about the overall well-being of a group, often depending on shared conditions like water supply.", keyPoints: ["Personal = individual", "Community = shared conditions"] },
  { id: 4, question: "Name two personal factors that support good health.", answer: "Any two of: balanced diet, personal hygiene, physical activity, adequate rest.", keyPoints: ["Two valid personal factors"] },
  { id: 5, question: "Name two community-level factors that support good health.", answer: "Any two of: safe drinking water, proper sanitation, clean environment, access to healthcare.", keyPoints: ["Two valid community factors"] },
  { id: 6, question: "Define disease.", answer: "A condition in which the normal functioning of the body or mind is disturbed.", keyPoints: ["Disturbed normal functioning"] },
  { id: 7, question: "Define a communicable disease.", answer: "A disease that can spread from an infected person or animal to a healthy one.", keyPoints: ["Spreads between hosts"] },
  { id: 8, question: "Define a non-communicable disease.", answer: "A disease that does not spread between people, often linked to lifestyle, genetics, or long-term conditions.", keyPoints: ["Does not spread", "Linked to lifestyle/genetics"] },
  { id: 9, question: "Name two examples of communicable diseases.", answer: "Any two of: common cold, cholera, tuberculosis, typhoid.", keyPoints: ["Two correct examples"] },
  { id: 10, question: "Name two examples of non-communicable diseases.", answer: "Any two of: diabetes, high blood pressure, obesity.", keyPoints: ["Two correct examples"] },
  { id: 11, question: "Name the four broad types of pathogens.", answer: "Bacteria, viruses, fungi, and protozoa.", keyPoints: ["All four named"] },
  { id: 12, question: "Define a vector, with an example.", answer: "A vector is a carrier that transfers a pathogen between hosts; for example, the mosquito is a vector for malaria.", keyPoints: ["Definition", "Example given"] },
  { id: 13, question: "Name the mode of transmission for the common cold.", answer: "Air, through droplets released while coughing or sneezing.", keyPoints: ["Air/droplets"] },
  { id: 14, question: "Name the mode of transmission for cholera.", answer: "Water, through drinking water contaminated with the pathogen.", keyPoints: ["Water-borne"] },
  { id: 15, question: "Suggest one prevention measure for a water-borne disease.", answer: "Ensuring safe, clean drinking water, such as by boiling or proper treatment.", keyPoints: ["Safe water measure"] },
  { id: 16, question: "Suggest one prevention measure for a vector-borne disease.", answer: "Removing stagnant water (mosquito breeding sites) or using mosquito nets.", keyPoints: ["Vector control measure"] },
  { id: 17, question: "Define immunity.", answer: "The body's ability to defend itself against pathogens and the diseases they cause.", keyPoints: ["Body's defence ability"] },
  { id: 18, question: "Distinguish between innate and acquired immunity.", answer: "Innate immunity is present from birth as a general defence; acquired immunity develops after the body encounters a specific pathogen, through infection or vaccination.", keyPoints: ["Innate = from birth", "Acquired = after exposure"] },
  { id: 19, question: "Explain briefly how a vaccine works.", answer: "A vaccine introduces a weakened or killed pathogen (or part of it), training the body's defences to recognise and fight it without causing the actual disease.", keyPoints: ["Weakened/killed pathogen", "Trains defences"] },
  { id: 20, question: "Define a deficiency disease.", answer: "A disease caused by a long-term lack of a particular nutrient in the diet.", keyPoints: ["Long-term nutrient lack"] },
  { id: 21, question: "Name the nutrient deficiency responsible for anaemia.", answer: "A long-term lack of iron.", keyPoints: ["Iron"] },
  { id: 22, question: "Name the nutrient deficiency responsible for scurvy.", answer: "A long-term lack of vitamin C.", keyPoints: ["Vitamin C"] },
  { id: 23, question: "Name the nutrient deficiency responsible for rickets.", answer: "A long-term lack of vitamin D (or calcium).", keyPoints: ["Vitamin D/calcium"] },
  { id: 24, question: "Name the nutrient deficiency responsible for goitre.", answer: "A long-term lack of iodine.", keyPoints: ["Iodine"] },
  { id: 25, question: "How can deficiency diseases mainly be prevented?", answer: "By eating a truly balanced diet that includes all essential nutrients.", keyPoints: ["Balanced diet"] },
  { id: 26, question: "Define mental health.", answer: "A person's emotional and psychological well-being -- how they think, feel, and cope with everyday stress.", keyPoints: ["Emotional/psychological well-being"] },
  { id: 27, question: "Name two habits that can harm overall health.", answer: "Any two of: tobacco use, alcohol misuse, drug misuse.", keyPoints: ["Two harmful habits"] },
  { id: 28, question: "Explain briefly what herd immunity means.", answer: "When a large enough portion of a population is immune, the disease has fewer opportunities to spread, indirectly protecting even non-immune individuals.", keyPoints: ["Large immune portion", "Indirect protection"] },
  { id: 29, question: "Explain the difference between a risk factor and a direct cause.", answer: "A risk factor increases the chance of a disease occurring, without guaranteeing it, while a direct cause (like a pathogen) reliably produces the disease.", keyPoints: ["Risk factor = increases chance", "Cause = reliably produces"] },
  { id: 30, question: "Suggest one healthy way to manage everyday stress.", answer: "Any reasonable answer, such as talking to a trusted friend or family member, taking breaks, or maintaining a balanced routine.", keyPoints: ["Valid stress-management suggestion"] },
];

// ── SHORT (3 marks each) ──
export const SCIENCE8H_SHORT: ShortQuestion[] = [
  { id: 1, question: "Explain, with reasoning, why a person can be free of illness and still not be considered completely healthy.", answer: "The accepted definition of health requires physical, mental, and social well-being together, not just the absence of illness. A person without physical illness may still be under constant mental stress or have poor social relationships, meaning two of the three required parts remain unmet -- so they are not considered completely healthy.", keyPoints: ["Three-part definition explained", "Reasoning for incomplete health despite no illness"] },
  { id: 2, question: "Distinguish between personal health and community health, explaining why both matter together.", answer: "Personal health concerns an individual's own habits and well-being, such as diet and hygiene. Community health concerns shared conditions affecting a whole group, such as water supply and sanitation. Both matter together because even excellent personal habits cannot fully protect someone from a health risk that exists at the community level, such as contaminated public water.", keyPoints: ["Personal health defined", "Community health defined", "Explains why both are needed together"] },
  { id: 3, question: "Explain the key difference between a communicable and a non-communicable disease, with one example of each.", answer: "A communicable disease is caused by a pathogen and can spread from an infected host to a healthy one, such as tuberculosis. A non-communicable disease does not spread between people and is often linked to lifestyle or genetic factors, such as diabetes.", keyPoints: ["Key difference (spread) explained", "Correct example of each"] },
  { id: 4, question: "Describe the four common modes of transmission for communicable diseases, with an example disease for each.", answer: "Air: droplets from coughing/sneezing spread diseases like the common cold. Water: contaminated water spreads diseases like cholera. Contact: touching an infected person or object can spread infections. Vectors: carriers like mosquitoes spread diseases like malaria.", keyPoints: ["All four modes named", "One correct example disease per mode"] },
  { id: 5, question: "Explain why a prevention method effective against one disease may be completely ineffective against another.", answer: "Different diseases spread through different modes of transmission -- a method that blocks one specific pathway (like clean water for cholera) has no effect on a disease that spreads through a completely different pathway (like malaria through mosquitoes). Effective prevention must match the disease's actual mode of transmission.", keyPoints: ["Explains different pathways", "Explains mismatch problem"] },
  { id: 6, question: "Explain how vaccination provides protection against a disease without causing illness.", answer: "A vaccine introduces a weakened, killed, or partial form of a specific pathogen into the body. This form is too weak to cause the actual disease but is still enough for the body's defences to learn to recognise and respond to it, so that if the real pathogen appears later, the body can fight it off quickly, often preventing illness.", keyPoints: ["Weakened/killed pathogen introduced", "Trains defences without causing illness", "Quick response later"] },
  { id: 7, question: "Distinguish between innate and acquired immunity, with an example of each.", answer: "Innate immunity is the general defence a person is born with, such as the skin acting as a barrier against pathogens. Acquired immunity develops after the body encounters a specific pathogen, through infection or vaccination, such as the immunity built after receiving a vaccine.", keyPoints: ["Innate immunity with example", "Acquired immunity with example"] },
  { id: 8, question: "Explain the concept of herd immunity and why it matters for a whole community.", answer: "Herd immunity occurs when a large enough portion of a population becomes immune to a disease, usually through vaccination. This greatly reduces the disease's opportunities to spread from person to person, indirectly protecting even those who are not immune, since the pathogen struggles to find enough new hosts to infect.", keyPoints: ["Large immune portion defined", "Explains indirect protection of non-immune individuals"] },
  { id: 9, question: "Explain what a deficiency disease is, and describe why a balanced diet is the main way to prevent it.", answer: "A deficiency disease is caused by a long-term lack of a specific nutrient in the diet. Since the disease is directly caused by this missing nutrient, ensuring the diet regularly includes that nutrient (as part of a balanced diet) prevents the shortage from building up in the first place, which is why balanced eating -- not medicine -- is the main prevention method.", keyPoints: ["Deficiency disease defined", "Explains why balanced diet is the main prevention"] },
  { id: 10, question: "Name and briefly describe three deficiency diseases, including the nutrient responsible for each.", answer: "Anaemia is caused by a long-term lack of iron, affecting the blood's ability to carry oxygen. Scurvy is caused by a long-term lack of vitamin C. Rickets is caused by a long-term lack of vitamin D (or calcium), affecting bone development, especially in children.", keyPoints: ["Three correct disease-nutrient pairs with brief description"] },
  { id: 11, question: "Explain why mental health is considered an essential part of overall health, rather than a separate concern.", answer: "The accepted definition of health explicitly includes mental well-being as one of its three required components, alongside physical and social well-being. Since a person cannot be considered completely healthy while missing any one of these three parts, mental health is not separate from health -- it is an essential, required part of it.", keyPoints: ["Explains mental health as part of the definition", "Explains why it cannot be treated as separate"] },
  { id: 12, question: "Explain why habits like tobacco or drug misuse are considered harmful to health in more than one way.", answer: "These habits can cause direct physical damage to the body over a long period, but they can also affect a person's mental well-being and judgement, and can strain personal relationships. Since health includes physical, mental, and social well-being together, such habits can harm more than one part of overall health at once.", keyPoints: ["Explains physical harm", "Explains mental/social harm"] },
  { id: 13, question: "Explain the difference between a risk factor and a direct cause, using an example of each.", answer: "A risk factor, such as a high-salt diet, increases the likelihood of developing a related disease (like high blood pressure), without guaranteeing it will happen. A direct cause, such as a specific bacterium causing tuberculosis, reliably produces the disease when present. The two behave very differently when reasoning about disease.", keyPoints: ["Risk factor explained with example", "Direct cause explained with example"] },
  { id: 14, question: "A community focuses only on treating disease cases after they occur, without improving water supply or sanitation. Explain why this approach is likely to be less effective over time.", answer: "Without addressing the underlying community-level conditions responsible for spreading disease, such as contaminated water, new cases are likely to keep occurring even as existing ones are treated. Prevention addresses the root cause of ongoing spread, while treatment alone only manages individual cases after they have already happened.", keyPoints: ["Explains ongoing risk without prevention", "Explains limitation of treatment-only approach"] },
  { id: 15, question: "Explain why two people with the exact same risk factor for a non-communicable disease might have different health outcomes.", answer: "A risk factor only increases the probability of developing a disease; it does not guarantee the outcome for every individual. Other factors, such as genetics, overall lifestyle, and other health conditions, also influence whether the disease actually develops in a specific person, which is why outcomes can differ even with the same risk factor present.", keyPoints: ["Explains probability vs guarantee", "Names other influencing factors"] },
  { id: 16, question: "Explain why understanding a disease's mode of transmission is essential before designing a prevention strategy.", answer: "Each mode of transmission (air, water, contact, or vector) requires a different, specific prevention approach. Without knowing exactly how a disease spreads, a chosen prevention measure might completely miss the actual pathway being used, wasting effort on a method that has no real effect on that particular disease.", keyPoints: ["Explains why matching mode matters", "Explains risk of a mismatched strategy"] },
  { id: 17, question: "Explain how a balanced routine supports both physical and mental well-being together.", answer: "A balanced routine typically includes physical activity (supporting the body's fitness), adequate rest (supporting recovery), and time for recreation or relationships (supporting mental and social well-being). Because it touches multiple parts of the definition of health at once, a single balanced routine can support more than one aspect of overall health simultaneously.", keyPoints: ["Explains physical component", "Explains mental/social component"] },
  { id: 18, question: "Explain why community health measures, such as sanitation, are considered harder for a single individual to achieve alone compared to personal hygiene.", answer: "Personal hygiene, like handwashing, can be practised entirely by one individual using their own effort. Sanitation systems, such as sewage treatment and safe waste disposal, usually require shared infrastructure and coordinated effort serving an entire community, which a single person cannot arrange or maintain on their own.", keyPoints: ["Explains individual scope of personal hygiene", "Explains shared/coordinated scope of sanitation"] },
  { id: 19, question: "Explain, with reasoning, why identifying whether a disease is communicable or non-communicable changes how it should be managed.", answer: "A communicable disease requires managing and blocking its spread to others, such as through hygiene, sanitation, or vaccination, since a new person could become infected. A non-communicable disease instead usually requires managing individual lifestyle factors or long-term treatment, since there is no risk of it spreading to someone else. Confusing the two could lead to using the wrong management approach entirely.", keyPoints: ["Explains communicable management approach", "Explains non-communicable management approach"] },
  { id: 20, question: "Explain why 'chance favours the prepared' does NOT mean a risk factor guarantees a disease, using the idea of probability.", answer: "A risk factor changes the overall probability that a disease will occur across many people, but probability describes a general tendency, not a certainty for every individual case. This is why some people with a given risk factor may never develop the related disease, while some without it might still develop it due to other contributing factors.", keyPoints: ["Explains probability vs certainty", "Explains individual variation despite shared risk factor"] },
  { id: 21, question: "Explain why 'chance of illness' being reduced through vaccination is different from the illness being made completely impossible.", answer: "Vaccination trains the body's defences to respond quickly and effectively to a specific pathogen, greatly reducing the chance of serious illness. However, this is a strong reduction in risk, not an absolute guarantee -- in rare cases, a vaccinated person's defences might still be overwhelmed, meaning vaccination reduces but does not entirely eliminate all possibility of illness.", keyPoints: ["Explains reduction in risk", "Distinguishes from absolute guarantee"] },
  { id: 22, question: "Explain why non-communicable diseases often require different long-term strategies compared to communicable diseases.", answer: "Since non-communicable diseases do not involve a spreading pathogen, strategies focus on managing individual lifestyle factors (diet, exercise) and ongoing treatment, often over a long period. Communicable diseases, by contrast, often can be addressed more directly by blocking transmission pathways or through vaccination, sometimes preventing the disease from ever developing at all.", keyPoints: ["Explains non-communicable strategy focus", "Explains communicable strategy focus"] },
  { id: 23, question: "Explain, with an example, how a single missing nutrient can cause a health problem even when overall food intake seems sufficient.", answer: "Overall food quantity does not guarantee that every specific essential nutrient is present in sufficient amounts. For example, a diet with plenty of food but very little iodine can still lead to goitre, since iodine specifically supports a function that no other nutrient can substitute for, regardless of how much food is eaten overall.", keyPoints: ["Explains quantity vs specific nutrient content", "Correct example given"] },
  { id: 24, question: "Explain why community-wide handwashing campaigns are effective against diseases spread by contact, but not against diseases spread by vectors.", answer: "Handwashing physically removes pathogens transferred through touch, directly targeting the contact mode of transmission. However, vector-borne diseases like malaria spread through mosquito bites, a completely different pathway that handwashing has no effect on -- prevention must match the specific mode of transmission being addressed.", keyPoints: ["Explains handwashing's target (contact)", "Explains why it misses vector-borne spread"] },
  { id: 25, question: "Explain why 'treating symptoms' is not the same as 'addressing the underlying disease type', using an example.", answer: "Symptoms, like tiredness, can be caused by very different underlying conditions -- for example, both anaemia (a deficiency disease) and a chronic infection (a communicable disease) can cause tiredness. Treating only the symptom without identifying the actual underlying cause could mean the real problem (a nutrient deficiency or an active pathogen) remains unaddressed.", keyPoints: ["Explains symptom vs underlying cause", "Correct example given"] },
];

// ── LONG (5 marks each) ──
export const SCIENCE8H_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Explain, in detail, the accepted definition of health, why it goes beyond the absence of disease, and describe the relationship between personal health and community health with examples.",
    markingScheme: [
      "Correctly states the three-part definition of health",
      "Explains why absence of disease alone is not enough",
      "Defines personal health with an example",
      "Defines community health with an example",
      "Draws a clear final conclusion linking both levels"
    ],
    answerParts: [
      { part: "The three-part definition", text: "Health is a state of complete physical, mental, and social well-being, not merely the absence of disease." },
      { part: "Why absence of disease is not enough", text: "A person can be free of physical illness but still experience constant stress (missing mental well-being) or poor relationships (missing social well-being); since all three parts are required together, illness-free alone does not equal complete health." },
      { part: "Personal health", text: "Personal health refers to an individual's own well-being, shaped by habits like diet, hygiene, exercise, and rest -- for example, one student maintaining a balanced diet." },
      { part: "Community health", text: "Community health refers to the overall well-being of a group, often shaped by shared conditions like water supply and sanitation -- for example, an entire neighbourhood benefiting from safe, treated drinking water." },
      { part: "Final Answer", text: "Health is a complete, three-part state that goes well beyond simply avoiding illness, and it depends on both an individual's personal habits and the shared conditions of the community they live in." }
    ]
  },
  {
    id: 2,
    question: "Explain, in detail, the difference between communicable and non-communicable diseases, including their causes, and describe why each category requires a different overall management approach.",
    markingScheme: [
      "Correctly defines communicable disease with cause and example",
      "Correctly defines non-communicable disease with cause and example",
      "Explains the management approach for communicable diseases",
      "Explains the management approach for non-communicable diseases",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Communicable disease", text: "A communicable disease is caused by a pathogen (bacteria, virus, fungus, or protozoan) and can spread from an infected host to a healthy one -- for example, tuberculosis, caused by a bacterium." },
      { part: "Non-communicable disease", text: "A non-communicable disease does not spread between people and is often linked to lifestyle or genetic factors -- for example, diabetes, linked to diet and lifestyle." },
      { part: "Managing communicable diseases", text: "Management focuses on blocking the pathogen's mode of transmission (through hygiene, sanitation, vector control) and building immunity through vaccination, since preventing spread to new people is a central concern." },
      { part: "Managing non-communicable diseases", text: "Management focuses on addressing individual lifestyle factors (diet, exercise) and long-term treatment, since there is no risk of the disease spreading to another person." },
      { part: "Final Answer", text: "The two categories differ fundamentally in cause (pathogen versus lifestyle/genetics) and therefore require different management priorities -- spread prevention for communicable diseases, and lifestyle/long-term management for non-communicable diseases." }
    ]
  },
  {
    id: 3,
    question: "Describe, in detail, the four common modes of disease transmission, giving one prevention measure that directly targets each, and explain why a prevention measure must match the specific mode of transmission to be effective.",
    markingScheme: [
      "Correctly explains airborne transmission with a matching prevention measure",
      "Correctly explains water-borne transmission with a matching prevention measure",
      "Correctly explains contact transmission with a matching prevention measure",
      "Correctly explains vector-borne transmission with a matching prevention measure",
      "Explains clearly why matching the method to the mode matters"
    ],
    answerParts: [
      { part: "Air", text: "Diseases like the common cold spread through droplets released while coughing or sneezing. Prevention: covering the mouth and nose traps these droplets, reducing spread." },
      { part: "Water", text: "Diseases like cholera spread through water contaminated with pathogens. Prevention: ensuring safe, clean drinking water (boiling or treatment) blocks this pathway." },
      { part: "Contact", text: "Certain infections spread by touching an infected person or a contaminated object. Prevention: regular handwashing removes pathogens before they can be transferred." },
      { part: "Vectors", text: "Diseases like malaria spread through carriers such as the female Anopheles mosquito. Prevention: removing stagnant water and using mosquito nets reduces mosquito bites." },
      { part: "Final Answer", text: "A prevention method must directly target the disease's actual mode of transmission to be effective -- a method that works brilliantly for one pathway (like clean water for water-borne disease) can be completely useless for a disease spreading a different way (like malaria via mosquitoes), so identifying the correct mode is essential before choosing a prevention strategy." }
    ]
  },
  {
    id: 4,
    question: "Explain, in detail, how vaccination works, the concept of herd immunity, and why widespread vaccination benefits a whole community beyond just the people who are vaccinated.",
    markingScheme: [
      "Correctly explains what a vaccine contains and why it does not cause disease",
      "Correctly explains how the body's defences respond after vaccination",
      "Correctly explains herd immunity",
      "Explains why herd immunity requires a large portion of the population to be immune",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "What a vaccine contains", text: "A vaccine contains a weakened, killed, or partial form of a specific pathogen, which is too weak to cause the actual disease in a healthy person." },
      { part: "How the body responds", text: "Despite being weak, the vaccine content is enough for the body's defence system to learn to recognise the pathogen. If the real, active pathogen appears later, the body can respond quickly and effectively, often preventing serious illness." },
      { part: "Herd immunity", text: "When a large enough portion of a population is vaccinated and therefore immune, the pathogen has far fewer opportunities to spread from person to person." },
      { part: "Why a large portion matters", text: "If only a small portion of the population is immune, the pathogen can still easily spread among the many non-immune individuals, meaning herd immunity provides little real protection unless a sufficiently large share of the community is immune." },
      { part: "Final Answer", text: "Vaccination trains the body's defences safely in advance, and when enough people in a community are vaccinated, herd immunity emerges, indirectly protecting even unvaccinated individuals by reducing the disease's overall ability to spread through the population." }
    ]
  },
  {
    id: 5,
    question: "Explain, in detail, the difference between innate and acquired immunity, and describe how understanding this difference helps explain why a vaccinated person responds better to a pathogen than an unvaccinated person meeting it for the first time.",
    markingScheme: [
      "Correctly defines innate immunity with an example",
      "Correctly defines acquired immunity with an example",
      "Explains how vaccination specifically builds acquired immunity",
      "Compares the response of a vaccinated versus first-time-exposed unvaccinated person",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Innate immunity", text: "Innate immunity is the general defence a person is born with, such as the skin acting as a physical barrier against pathogens -- it works generally, without needing any prior exposure." },
      { part: "Acquired immunity", text: "Acquired immunity develops after the body encounters a specific pathogen, through natural infection or vaccination, allowing a faster, targeted response if that same pathogen appears again." },
      { part: "How vaccination builds it", text: "A vaccine safely introduces a weakened or killed form of a pathogen, letting the body build acquired immunity to that specific pathogen without ever experiencing the real disease." },
      { part: "Comparing responses", text: "A vaccinated person's body has already learned to recognise the pathogen through the vaccine, allowing a quick, strong response upon real exposure. An unvaccinated person meeting the same pathogen for the first time has no such prior training, so their body must build a response from scratch, which is typically slower and less effective, often allowing the illness to develop fully first." },
      { part: "Final Answer", text: "The key difference is prior exposure: vaccination provides a safe form of that exposure in advance, building acquired immunity, which is why a vaccinated person generally responds faster and more effectively than someone facing the pathogen for the first time." }
    ]
  },
  {
    id: 6,
    question: "Explain, in detail, what deficiency diseases are, describe four examples with their responsible nutrients, and explain why treating a deficiency disease requires correcting the diet rather than only using general medicine.",
    markingScheme: [
      "Correctly defines deficiency disease",
      "Correctly describes at least four examples with their nutrients",
      "Explains why the diet itself must be corrected",
      "Explains why general medicine alone would not fully address the root cause",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Defining deficiency disease", text: "A deficiency disease is caused by a long-term lack of a particular nutrient in a person's diet." },
      { part: "Four examples", text: "Anaemia (lack of iron, affecting blood's oxygen-carrying ability), scurvy (lack of vitamin C), rickets (lack of vitamin D or calcium, affecting bone development), and goitre (lack of iodine, affecting a gland in the neck)." },
      { part: "Why the diet must be corrected", text: "Since the disease is directly caused by a missing nutrient, the underlying problem is the diet's composition -- correcting the diet to include that specific nutrient addresses the actual root cause." },
      { part: "Why general medicine alone is not enough", text: "General medicine that does not specifically restore the missing nutrient would not solve the underlying dietary gap, meaning the deficiency (and its symptoms) could persist or return even after temporary treatment." },
      { part: "Final Answer", text: "Deficiency diseases are directly tied to a specific missing nutrient, so lasting recovery and prevention depend on correcting the diet to include that nutrient, rather than relying on general medicine that does not address the actual dietary gap." }
    ]
  },
  {
    id: 7,
    question: "Explain, in detail, why mental health is considered an essential part of overall health, describe factors that support and harm mental well-being, and explain the connection between mental health and the other two components of health.",
    markingScheme: [
      "Explains why mental health is part of the accepted definition of health",
      "Describes at least two factors supporting mental well-being",
      "Describes at least two factors harming mental well-being",
      "Explains the connection between mental, physical, and social well-being",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Mental health as part of the definition", text: "The accepted definition of health explicitly includes mental well-being alongside physical and social well-being, meaning a person cannot be considered completely healthy if their mental well-being is poor, even without physical illness." },
      { part: "Supporting factors", text: "Managing stress through healthy methods (like talking to someone trusted) and maintaining a balanced routine of activity, rest, and recreation both support mental well-being." },
      { part: "Harmful factors", text: "Habits like tobacco, alcohol, or drug misuse can seriously harm mental well-being over time, alongside their physical effects." },
      { part: "Connection to other components", text: "Mental well-being often influences and is influenced by physical health (poor sleep affecting mood) and social well-being (supportive relationships helping manage stress), showing that the three components of health are closely interconnected rather than fully separate." },
      { part: "Final Answer", text: "Mental health is not an optional extra but a genuine, required part of the definition of health, closely connected to physical and social well-being, and supported or harmed by specific everyday habits and relationships." }
    ]
  },
  {
    id: 8,
    question: "A community experiences repeated outbreaks of a water-borne disease every rainy season. Explain, in detail, the likely cause, and describe a complete, multi-part plan the community could adopt to address the problem, both immediately and in the long term.",
    markingScheme: [
      "Explains the likely connection between rainy season and water contamination",
      "Suggests a reasonable immediate response",
      "Suggests a reasonable long-term community-level solution",
      "Explains why both immediate and long-term measures are needed together",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Likely cause", text: "Heavy rain and flooding during the rainy season can mix sewage, waste, or other contaminated material into the community's drinking water sources, introducing disease-causing pathogens repeatedly each year." },
      { part: "Immediate response", text: "Advising residents to boil drinking water, or distributing safely treated water, would quickly reduce the immediate risk during an active outbreak." },
      { part: "Long-term solution", text: "Improving water infrastructure, such as building proper drainage and sewage systems that prevent contamination during heavy rain, would address the underlying cause rather than just managing yearly outbreaks." },
      { part: "Why both are needed", text: "Immediate measures protect people during the current outbreak, but without a long-term infrastructure fix, the same contamination problem is likely to recur every rainy season -- both timescales must be addressed for a lasting solution." },
      { part: "Final Answer", text: "The repeated outbreaks likely stem from seasonal water contamination; a complete plan needs immediate safe-water measures to manage the current situation, combined with long-term infrastructure improvements to prevent the same problem from recurring every year." }
    ]
  },
  {
    id: 9,
    question: "Explain, in detail, why a claim like 'this risk factor definitely causes this disease in everyone who has it' would be scientifically inaccurate, using ideas about risk factors, probability, and individual variation.",
    markingScheme: [
      "Explains what a risk factor actually represents (probability, not certainty)",
      "Explains why individual outcomes can vary despite a shared risk factor",
      "Gives a correct example illustrating this variation",
      "Explains the difference between a risk factor and a guaranteed direct cause",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "What a risk factor represents", text: "A risk factor increases the overall likelihood, across a population, that a related disease will develop -- it describes a general tendency, not a guaranteed individual outcome." },
      { part: "Why outcomes vary", text: "Other factors, such as genetics, overall lifestyle, and additional health conditions, also influence whether a specific individual actually develops the disease, even when a known risk factor is present." },
      { part: "Example", text: "Two people with the same high-salt diet (a risk factor for high blood pressure) may have different outcomes -- one might develop high blood pressure, while the other, perhaps due to genetics or other lifestyle factors, might not." },
      { part: "Risk factor versus direct cause", text: "This is different from a direct cause, such as a specific pathogen causing a communicable disease -- when the pathogen is present and takes hold, the disease reliably follows, unlike the more variable relationship with a risk factor." },
      { part: "Final Answer", text: "Claiming a risk factor 'definitely causes' a disease in everyone is scientifically inaccurate, since risk factors describe increased probability influenced by many individual factors, not a guaranteed, universal outcome the way a direct pathogenic cause does." }
    ]
  },
  {
    id: 10,
    question: "Explain, in detail, the overall relationship between personal habits, community conditions, disease prevention, and mental well-being as presented in this chapter, and explain why a truly complete approach to health must address all of these together.",
    markingScheme: [
      "Summarises the role of personal habits",
      "Summarises the role of community conditions",
      "Summarises the role of disease prevention (communicable and non-communicable)",
      "Summarises the role of mental well-being",
      "Draws a clear, well-reasoned final conclusion connecting all four together"
    ],
    answerParts: [
      { part: "Personal habits", text: "Personal habits such as a balanced diet, hygiene, exercise, and rest directly support an individual's own physical well-being and help prevent both deficiency diseases and some non-communicable diseases." },
      { part: "Community conditions", text: "Shared conditions such as safe water, sanitation, and access to healthcare address risks that no single individual can fully control alone, particularly for communicable diseases." },
      { part: "Disease prevention", text: "Preventing communicable diseases requires targeting specific modes of transmission and building immunity (including through vaccination), while managing non-communicable diseases requires addressing lifestyle risk factors over the long term." },
      { part: "Mental well-being", text: "Since health explicitly includes mental well-being, supporting it through healthy routines, relationships, and avoiding harmful habits is just as essential as the physical measures above." },
      { part: "Final Answer", text: "A truly complete approach to health must combine personal habits, community-level conditions, targeted disease prevention, and mental well-being together -- addressing only one of these while ignoring the others would leave real gaps in a person's or a community's overall health." }
    ]
  },
  {
    id: 11,
    question: "Explain, in detail, the concept of a vector, describe how vector-borne diseases differ from directly-transmitted diseases, and explain why vector control is a distinct prevention strategy from personal hygiene.",
    markingScheme: [
      "Correctly defines a vector with an example",
      "Explains how vector-borne spread differs from direct spread (air, water, contact)",
      "Explains why personal hygiene does not address vector-borne spread",
      "Describes at least two specific vector-control measures",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Defining a vector", text: "A vector is a carrier organism, such as a mosquito, that transfers a pathogen from an infected host to a healthy one, without the two hosts needing any direct contact with each other." },
      { part: "How this differs from direct spread", text: "Airborne, water-borne, and contact transmission all involve some direct link between the infected source and the healthy person (shared air, shared water, or direct touch). Vector-borne transmission instead relies on a third organism (the vector) actively carrying the pathogen between two hosts that may never come into contact with each other at all." },
      { part: "Why hygiene does not help here", text: "Personal hygiene measures like handwashing target pathogens transferred through touch or contaminated surfaces; they have no effect on a pathogen being carried directly into the bloodstream through a vector's bite." },
      { part: "Vector-control measures", text: "Removing stagnant water (a mosquito breeding site) and using mosquito nets are both measures that specifically target the vector itself, rather than the pathogen's other possible pathways." },
      { part: "Final Answer", text: "Vector-borne diseases spread through a carrier organism rather than through direct shared exposure, which is why vector control (targeting the carrier) must be treated as its own distinct prevention strategy, separate from general personal hygiene." }
    ]
  },
  {
    id: 12,
    question: "Explain, in detail, why 'health' as a personal goal and 'health' as a community goal require different kinds of action, using examples of actions only an individual can take and actions that require a whole community.",
    markingScheme: [
      "Explains health as a personal goal with example actions",
      "Explains health as a community goal with example actions",
      "Explains why some actions cannot be achieved by an individual alone",
      "Explains why some conditions cannot be achieved by a community without individual cooperation",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Health as a personal goal", text: "An individual can directly control actions like eating a balanced diet, washing their hands regularly, exercising, and getting enough rest." },
      { part: "Health as a community goal", text: "A community must coordinate actions like building sewage treatment systems, maintaining a safe public water supply, and running vaccination programmes." },
      { part: "Why individuals cannot achieve some goals alone", text: "A single person cannot build or maintain shared infrastructure like a water treatment plant; these require coordinated resources and effort across the whole community." },
      { part: "Why communities need individual cooperation too", text: "Even with excellent community infrastructure, individual actions like proper handwashing or attending vaccination programmes still require each person's personal cooperation to be fully effective." },
      { part: "Final Answer", text: "Personal and community health goals require different types of action -- individual habits versus coordinated infrastructure and programmes -- and neither level can fully achieve good health without some degree of cooperation from the other." }
    ]
  },
  {
    id: 13,
    question: "Explain, in detail, why a doctor needs to determine the specific type of pathogen (bacteria, virus, fungus, or protozoan) responsible for a communicable disease before deciding on treatment.",
    markingScheme: [
      "Explains that different pathogen types require different treatment approaches",
      "Gives a correct example involving bacteria",
      "Gives a correct example involving viruses",
      "Explains the risk of treating without identifying the pathogen type",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Different pathogens need different approaches", text: "Treatments effective against one type of pathogen are often completely ineffective against another, since their biology and vulnerabilities differ." },
      { part: "Bacterial example", text: "A bacterial infection, such as tuberculosis, can often be treated with antibiotics that specifically disrupt bacterial processes." },
      { part: "Viral example", text: "A viral infection, such as the common cold, cannot be treated with antibiotics, since viruses lack the bacterial structures antibiotics act on -- different approaches (like supportive care or antiviral treatments) are needed instead." },
      { part: "Risk of not identifying the pathogen", text: "Treating a patient without knowing the actual pathogen type could mean giving a treatment (like antibiotics for a viral infection) that has no real effect, delaying proper care and potentially allowing the illness to worsen." },
      { part: "Final Answer", text: "Identifying the specific type of pathogen is essential before treatment, since bacteria, viruses, fungi, and protozoa each require different, specifically matched approaches to be effectively treated." }
    ]
  },
  {
    id: 14,
    question: "Explain, in detail, how a poor diet can simultaneously contribute to both a deficiency disease and a non-communicable disease, using a clear example of each occurring in the same person.",
    markingScheme: [
      "Explains how a poor diet can cause a deficiency disease",
      "Explains how a poor diet can also be a risk factor for a non-communicable disease",
      "Gives a coherent combined example",
      "Explains why these two problems, though both diet-related, are still distinct types of disease",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Diet causing deficiency disease", text: "A diet consistently lacking a specific nutrient, such as iron, can lead to a deficiency disease like anaemia over time." },
      { part: "Diet as a risk factor for non-communicable disease", text: "The same overall diet, if high in salt or unhealthy fats, can also act as a risk factor for a non-communicable disease like high blood pressure." },
      { part: "Combined example", text: "A person eating mostly processed, high-salt foods with very little fresh produce could develop both iron-deficiency anaemia (from lack of iron) and an increased risk of high blood pressure (from excess salt) at the same time." },
      { part: "Why they remain distinct", text: "Even though both problems stem from the same poor diet, anaemia is specifically a deficiency disease tied to a missing nutrient, while high blood pressure risk is a separate non-communicable disease risk tied to excess intake of something else -- they require different corrective dietary changes." },
      { part: "Final Answer", text: "A single poor diet can contribute to both a deficiency disease (through what it lacks) and a non-communicable disease risk (through what it contains in excess) at the same time, showing that diet quality affects health in more than one distinct way simultaneously." }
    ]
  },
  {
    id: 15,
    question: "Explain, in detail, why public health campaigns often combine multiple prevention messages (such as hygiene, vaccination, and safe water) rather than promoting just one, using reasoning about different disease transmission modes.",
    markingScheme: [
      "Explains that different diseases in a population spread through different modes",
      "Explains why a single message cannot cover every mode",
      "Gives at least two examples of diseases needing different specific measures",
      "Explains the benefit of a combined, multi-message campaign",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Different diseases, different modes", text: "At any given time, a population may be at risk from several different communicable diseases, each spreading through its own specific mode of transmission -- air, water, contact, or vectors." },
      { part: "Why one message is not enough", text: "A single prevention message, such as only promoting handwashing, would address contact-based spread but leave water-borne or vector-borne diseases completely unaddressed." },
      { part: "Two examples", text: "Handwashing helps prevent contact-spread illnesses, but does nothing for cholera (water-borne) or malaria (vector-borne), which need entirely different specific measures like safe water and mosquito control." },
      { part: "Benefit of combining messages", text: "A campaign combining hygiene, safe water practices, and vaccination information covers multiple transmission pathways at once, offering broader protection across the different diseases present in the population." },
      { part: "Final Answer", text: "Public health campaigns combine multiple prevention messages because a population faces diseases spreading through several different modes of transmission, and no single measure can adequately cover every pathway on its own." }
    ]
  },
  {
    id: 16,
    question: "Explain, in detail, the reasoning behind quarantine or isolation of a person with a highly communicable disease, connecting this measure to the concept of modes of transmission.",
    markingScheme: [
      "Explains what quarantine/isolation means in this context",
      "Connects the measure to blocking a specific mode of transmission",
      "Explains why this measure is used mainly for communicable, not non-communicable, diseases",
      "Explains a limitation or consideration of this measure",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "What quarantine/isolation means", text: "Isolating an infected person means limiting their contact with healthy people for a period of time, to prevent them from unintentionally spreading the disease further." },
      { part: "Connection to modes of transmission", text: "This measure works by directly blocking whichever mode of transmission (air, contact, etc.) the disease relies on to reach new people -- if the infected person has no opportunity to spread it, the chain of transmission is interrupted." },
      { part: "Why only for communicable diseases", text: "This measure only makes sense for communicable diseases, since non-communicable diseases (like diabetes) cannot spread to another person in the first place, making isolation pointless for them." },
      { part: "A limitation", text: "Isolation can only work well if it begins before the infected person has already spread the disease to many others, and it depends on identifying infected individuals accurately and in time." },
      { part: "Final Answer", text: "Isolating a person with a communicable disease directly targets the disease's mode of transmission by removing the opportunity for it to reach new hosts, which is exactly why this measure is meaningful for communicable diseases but irrelevant for non-communicable ones." }
    ]
  },
  {
    id: 17,
    question: "Explain, in detail, how a lack of access to healthcare in a community can worsen outcomes for both communicable and non-communicable diseases, giving one example of each.",
    markingScheme: [
      "Explains the general effect of limited healthcare access",
      "Gives a correct example involving a communicable disease",
      "Gives a correct example involving a non-communicable disease",
      "Explains why early access matters for both categories",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "General effect of limited access", text: "Without easy access to healthcare, illnesses may go undiagnosed or untreated for longer periods, allowing conditions to worsen before any care is given." },
      { part: "Communicable disease example", text: "A person with early tuberculosis symptoms who cannot easily access healthcare may go undiagnosed for a long time, both worsening their own condition and increasing the chance they unknowingly spread the disease to others." },
      { part: "Non-communicable disease example", text: "A person with early signs of high blood pressure who lacks healthcare access may not receive guidance on lifestyle changes or treatment in time, allowing the condition to progress to more serious complications." },
      { part: "Why early access matters", text: "In both cases, earlier access to healthcare allows a condition to be identified and managed before it becomes more severe or, in the communicable case, before it spreads further to others." },
      { part: "Final Answer", text: "Limited healthcare access can worsen outcomes for both communicable and non-communicable diseases by delaying diagnosis and management, though the specific consequences differ -- greater onward spread for communicable diseases, and greater personal disease progression for non-communicable ones." }
    ]
  },
  {
    id: 18,
    question: "Explain, in detail, why 'natural' does not automatically mean 'healthy' when discussing disease and immunity, using the example of naturally acquiring immunity through infection versus through vaccination.",
    markingScheme: [
      "Explains how immunity can be naturally acquired through infection",
      "Explains how immunity can be acquired through vaccination instead",
      "Compares the risks of the two approaches",
      "Explains why the vaccination route is generally considered safer",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Naturally acquiring immunity through infection", text: "A person can develop acquired immunity to a pathogen by actually catching the disease, recovering, and having their body learn to recognise that pathogen afterward." },
      { part: "Acquiring immunity through vaccination", text: "Alternatively, a person can develop the same kind of acquired immunity by receiving a vaccine containing a weakened or killed form of the pathogen, without ever experiencing the actual disease." },
      { part: "Comparing the risks", text: "Naturally catching the disease carries the real risk of the illness's symptoms, complications, and the chance of spreading it to others before recovering. Vaccination provides a much safer route to the same acquired immunity, without these risks." },
      { part: "Why vaccination is generally safer", text: "Since the vaccine's weakened or killed pathogen is specifically designed to be too weak to cause the actual disease, it offers the training benefit of natural infection without its associated dangers." },
      { part: "Final Answer", text: "While both routes can lead to acquired immunity, 'natural' infection carries real risks that a properly developed vaccine avoids, showing that 'natural' is not automatically the safer or healthier option when a much lower-risk alternative achieves the same protective outcome." }
    ]
  },
  {
    id: 19,
    question: "Explain, in detail, why addressing mental health stigma (the reluctance to discuss or seek help for mental health concerns) is important for achieving complete health at a community level.",
    markingScheme: [
      "Explains what stigma around mental health means",
      "Explains how stigma could prevent people from seeking help",
      "Connects this back to the definition of health including mental well-being",
      "Explains a possible community-level consequence of widespread stigma",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "What stigma means here", text: "Stigma refers to negative attitudes or judgement that can make people reluctant to openly discuss their mental health struggles or seek support for them." },
      { part: "How stigma prevents help-seeking", text: "If a person fears being judged or misunderstood, they may avoid talking to someone trusted or seeking appropriate support, even when they are struggling significantly." },
      { part: "Connection to the definition of health", text: "Since mental well-being is a required part of the definition of health, a community where people cannot openly address mental health concerns is failing to fully support one of the three essential components of health for its members." },
      { part: "Community-level consequence", text: "Widespread stigma could mean many people in a community quietly struggle with poor mental well-being without support, lowering the overall level of complete health across the community, even if physical health measures are otherwise strong." },
      { part: "Final Answer", text: "Since mental well-being is an essential, required part of health, addressing stigma so people feel able to seek support is necessary for a community to achieve genuinely complete health, not just physical health, among its members." }
    ]
  },
  {
    id: 20,
    question: "Explain, in detail, why a single measurement (such as no reported illness in a village for one month) is not sufficient evidence to conclude that the village has achieved complete community health.",
    markingScheme: [
      "Explains what 'no reported illness' actually measures",
      "Explains what this measurement leaves out regarding mental and social well-being",
      "Explains what it leaves out regarding underlying risk factors not yet causing visible illness",
      "Suggests what additional information would be needed for a fuller picture",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "What the measurement covers", text: "'No reported illness' only reflects the absence of currently diagnosed physical disease cases during that specific period." },
      { part: "What it misses: mental/social", text: "It says nothing about the community's mental or social well-being, such as levels of stress, isolation, or supportive relationships among residents." },
      { part: "What it misses: underlying risk", text: "It also does not capture underlying risk factors (like poor diet or unsafe water sources) that might not have caused visible illness yet but could still lead to problems later." },
      { part: "What additional information is needed", text: "A fuller picture would require information on community mental well-being, social conditions, access to safe water and sanitation, and ongoing risk factors, not just a snapshot of current illness reports." },
      { part: "Final Answer", text: "A single measurement like 'no reported illness' only captures part of the physical dimension of health at one moment in time -- true community health requires a much broader picture including mental and social well-being and underlying risk factors, not just the current absence of diagnosed illness." }
    ]
  },
];

// ── COMPETENCY / CASE-BASED (4 marks each) ──
export const SCIENCE8H_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Stressed But Fit Athlete",
    caseDescription: "Aryan trains every day and is in excellent physical shape, with no illnesses. However, he feels constantly anxious about competitions and has grown distant from his friends and family due to his packed schedule.",
    subQuestions: [
      { question: "Based on the accepted definition of health, is Aryan completely healthy? Explain.", answer: "No -- although Aryan is physically fit, his constant anxiety means his mental well-being is affected, and his distance from friends and family means his social well-being is also affected. Complete health requires all three parts together." },
      { question: "Which two components of health appear to be missing in Aryan's case?", answer: "Mental well-being (due to anxiety) and social well-being (due to distant relationships)." },
      { question: "Suggest one healthy habit Aryan could adopt to support his mental well-being.", answer: "Any reasonable suggestion, such as talking to a trusted friend or family member about his anxiety, or building short breaks and relaxation into his schedule." },
      { question: "Explain why simply telling Aryan to 'exercise more' would not fully solve his health concerns.", answer: "Aryan is already very physically active; his unmet needs are mental and social, not physical -- so a purely physical suggestion would not address the actual gaps in his overall health." }
    ]
  },
  {
    id: 2,
    caseTitle: "The Village Without Safe Water",
    caseDescription: "A village has excellent personal hygiene practices among its residents, but its main water source has recently become contaminated after a nearby flood, leading to a rise in cases of a water-borne illness.",
    subQuestions: [
      { question: "Explain why good personal hygiene alone was not enough to prevent the outbreak.", answer: "The disease is spreading through contaminated water, a community-level risk that personal hygiene habits like handwashing cannot fully address, since the water itself carries the pathogen." },
      { question: "Suggest the type of disease most likely responsible, based on the mode of spread described.", answer: "A water-borne communicable disease, such as cholera or typhoid." },
      { question: "Suggest one immediate action the village could take to reduce further cases.", answer: "Boiling water before drinking it, or distributing safely treated water, until the contaminated source is fixed." },
      { question: "Explain why this scenario shows that personal and community health factors must be addressed together.", answer: "It shows that even with strong personal habits, a community-level problem (contaminated water) can still cause illness -- both levels need to be managed for the village to be fully protected." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Two Neighbourhoods and Vaccination",
    caseDescription: "Neighbourhood A has 95% of its residents vaccinated against a certain communicable disease, while Neighbourhood B has only 40% vaccinated. A few months later, Neighbourhood B experiences a much larger outbreak than Neighbourhood A.",
    subQuestions: [
      { question: "Explain, using the concept from this chapter, why Neighbourhood A likely had fewer cases.", answer: "Neighbourhood A likely benefits from herd immunity, since a very large portion of its residents are immune, sharply reducing the disease's ability to spread even to the small unvaccinated minority." },
      { question: "Why did Neighbourhood B's lower vaccination rate likely lead to a larger outbreak?", answer: "With only 40% immune, the disease still had a large number of non-immune people to spread between, allowing it to circulate more freely and cause a bigger outbreak." },
      { question: "Does a 40% vaccination rate provide zero protection to the neighbourhood? Explain.", answer: "No -- it still provides some level of protection compared to no vaccination at all, but it is not high enough to create strong herd immunity, which typically requires a much larger immune portion of the population." },
      { question: "Suggest what Neighbourhood B could do to reduce future outbreaks of this disease.", answer: "Increase its vaccination coverage significantly, aiming for a much higher percentage of immune residents to build effective herd immunity." }
    ]
  },
  {
    id: 4,
    caseTitle: "The Misunderstood Risk Factor",
    caseDescription: "A student argues, 'My uncle eats a lot of salty food every day and has never developed high blood pressure, so the claim that a high-salt diet is a risk factor for high blood pressure must be false.'",
    subQuestions: [
      { question: "Explain the flaw in the student's reasoning.", answer: "The student is treating a risk factor as if it were a guaranteed cause. A risk factor only increases the CHANCE of developing a disease; it does not guarantee that every person with that risk factor will develop it." },
      { question: "Suggest one reason the uncle might not have developed high blood pressure despite the risk factor.", answer: "Other factors, such as genetics, overall lifestyle, or physical activity levels, could be helping offset the risk in his specific case." },
      { question: "Does the uncle's example mean no one should worry about a high-salt diet? Explain.", answer: "No -- across a large population, a high-salt diet still increases the overall likelihood of developing high blood pressure; one individual exception does not change this general, population-level pattern." },
      { question: "How would you correctly explain the relationship between a high-salt diet and high blood pressure to the student?", answer: "A high-salt diet is a risk factor that increases the probability of developing high blood pressure, but it does not guarantee it for every individual -- other personal factors also play a role in the final outcome." }
    ]
  },
  {
    id: 5,
    caseTitle: "The Community Health Worker's Diagnosis Puzzle",
    caseDescription: "A health worker visits two patients on the same day. Patient X shows extreme tiredness and pale skin, and a blood test reveals low iron levels. Patient Y also shows extreme tiredness, but tests positive for an active viral infection.",
    subQuestions: [
      { question: "Identify the likely condition affecting Patient X, and its cause.", answer: "Anaemia, caused by a long-term lack of iron in the diet." },
      { question: "Is Patient X's condition communicable or non-communicable? Explain.", answer: "Non-communicable (specifically a deficiency disease) -- it is caused by a lack of a nutrient, not a pathogen, and cannot spread to another person." },
      { question: "Is Patient Y's condition communicable or non-communicable? Explain.", answer: "Communicable -- it is caused by a virus (a pathogen), which can potentially spread from Patient Y to a healthy person." },
      { question: "Explain why both patients showing the same symptom (tiredness) still need completely different treatments.", answer: "Since their underlying causes are different -- a nutrient deficiency versus an active viral infection -- the treatments must target the actual cause: correcting the diet or supplementing iron for Patient X, versus care and management appropriate for the viral infection for Patient Y." }
    ]
  },
  {
    id: 6,
    caseTitle: "The School Handwashing and Malaria Confusion",
    caseDescription: "A school launches a strong handwashing campaign after seeing many students absent due to illness. However, later that term, cases of malaria among students continue to rise despite the campaign.",
    subQuestions: [
      { question: "Explain why the handwashing campaign likely helped reduce some illnesses but not malaria.", answer: "Handwashing targets diseases spread through contact or contaminated hands, but malaria spreads through mosquito bites (a vector), an entirely different mode of transmission that handwashing does not address." },
      { question: "Suggest a more appropriate measure the school could add specifically to address the malaria cases.", answer: "Removing stagnant water sources around the school (mosquito breeding sites) and encouraging the use of mosquito nets or repellents." },
      { question: "Explain why relying on just one prevention method (handwashing) was not enough to address all the illnesses at the school.", answer: "Different illnesses can spread through different modes of transmission; a single method targeting only one pathway (like contact) cannot be expected to prevent diseases that spread through a completely different pathway (like a vector)." },
      { question: "What general lesson about disease prevention does this scenario illustrate?", answer: "Effective disease prevention requires identifying the specific mode of transmission for each disease and applying a matching, targeted measure -- a single universal method is unlikely to address every type of disease present in a community." }
    ]
  },
  {
    id: 7,
    caseTitle: "The Family History Debate",
    caseDescription: "A family has a history of high blood pressure across several generations. One family member insists that since it 'runs in the family', there is nothing anyone can do to prevent it, so lifestyle habits do not matter.",
    subQuestions: [
      { question: "Is genetics the ONLY factor influencing whether someone develops high blood pressure? Explain.", answer: "No -- while genetics can be a contributing risk factor, lifestyle factors such as diet (especially salt intake), physical activity, and stress management also influence the likelihood of developing high blood pressure." },
      { question: "Explain why the family member's claim that 'lifestyle habits do not matter' is likely incorrect.", answer: "Since lifestyle factors are also known risk factors for high blood pressure, adopting healthier habits (like reducing salt intake and staying active) can still meaningfully reduce the overall risk, even if a genetic predisposition is present." },
      { question: "Suggest two lifestyle changes that could help reduce this family's overall risk.", answer: "Reducing salt intake in the diet and increasing regular physical activity (other valid answers: managing stress, avoiding harmful habits like tobacco or excessive alcohol)." },
      { question: "Explain why having a risk factor (family history) makes it even MORE important, not less important, to manage other risk factors.", answer: "Since genetics is already contributing to their risk, actively managing the OTHER controllable risk factors (like diet and activity) becomes even more valuable in keeping their overall risk as low as reasonably possible." }
    ]
  },
  {
    id: 8,
    caseTitle: "The Coastal Village's Iodine Problem",
    caseDescription: "A village far from the coast, where the local soil and food naturally contain very little iodine, reports an unusually high number of goitre cases among its residents compared to nearby coastal villages.",
    subQuestions: [
      { question: "Explain the likely reason for the high number of goitre cases in this village.", answer: "Goitre is caused by a long-term lack of iodine in the diet. Since the local soil and food naturally contain very little iodine, residents are likely not getting enough of this nutrient over time, leading to more cases." },
      { question: "Why might a nearby coastal village have fewer cases of the same condition?", answer: "Coastal areas and their food sources (such as seafood) often naturally contain more iodine, meaning coastal residents may be less likely to develop a long-term iodine deficiency." },
      { question: "Suggest one practical way the affected village could address this deficiency.", answer: "Using iodised salt (salt with added iodine) in cooking, to ensure the diet includes sufficient iodine despite the low natural iodine content of local food." },
      { question: "Is goitre a communicable or non-communicable condition? Explain.", answer: "Non-communicable -- specifically a deficiency disease, caused by a long-term lack of a nutrient, not by a pathogen, so it cannot spread from one person to another." }
    ]
  },
  {
    id: 9,
    caseTitle: "The Overworked Student's Wellbeing",
    caseDescription: "A student maintains excellent grades by studying nearly every waking hour, skipping meals, sleeping very little, and rarely seeing friends, believing this is the best path to success.",
    subQuestions: [
      { question: "Identify at least two components of health that appear to be at risk in this scenario.", answer: "Physical well-being (from skipping meals and little sleep) and social well-being (from rarely seeing friends) -- mental well-being could also be at risk from the resulting stress and lack of balance." },
      { question: "Explain why this routine could eventually affect the student's academic performance itself, not just their health.", answer: "Poor nutrition, insufficient sleep, and high stress can affect concentration, memory, and overall cognitive function over time, potentially undermining the very academic performance the student is trying to protect." },
      { question: "Suggest one change the student could make that would support more than one component of health at once.", answer: "Building in regular, adequate sleep would support physical recovery and could also improve mood and mental clarity, touching both physical and mental well-being together." },
      { question: "Explain why 'success' defined only in terms of grades might be an incomplete measure of the student's overall well-being.", answer: "Since health includes physical, mental, and social well-being together, focusing only on academic results while neglecting these other areas means the student's overall well-being -- not just their exam performance -- is incomplete." }
    ]
  },
  {
    id: 10,
    caseTitle: "The New Vaccine Rollout Debate",
    caseDescription: "A new vaccine becomes available for a communicable disease that has been causing seasonal outbreaks in a region. Some residents are eager to get vaccinated immediately, while others plan to wait and only get vaccinated if they personally get sick first.",
    subQuestions: [
      { question: "Explain why waiting until getting sick defeats the main purpose of a vaccine.", answer: "A vaccine is meant to train the body's defences BEFORE a real infection occurs, so that illness can be prevented or reduced; waiting until after infection removes this preventive benefit entirely, since the vaccine cannot undo an infection already taking place." },
      { question: "Explain how the residents who get vaccinated early could also help those who choose to wait.", answer: "If enough residents get vaccinated early, herd immunity can develop, reducing the disease's overall spread in the region -- this could indirectly lower the risk even for those who have not yet been vaccinated." },
      { question: "Suggest one reason vaccination timing matters for how effective herd immunity becomes.", answer: "Herd immunity only becomes strong once a large enough portion of the population is immune -- if too many residents delay vaccination, the immune portion may stay too low to meaningfully reduce the disease's spread during the outbreak." },
      { question: "Based on this chapter, is 'wait until I get sick' a scientifically sound vaccination strategy? Explain.", answer: "No -- this approach misunderstands how vaccines work. Vaccines are preventive, training the body's defences in advance; waiting until illness occurs means the person forgoes this protective benefit and also delays contributing to community-wide herd immunity." }
    ]
  },
  {
    id: 11,
    caseTitle: "The Confusing Symptom Overlap",
    caseDescription: "Two patients both report feeling weak and fatigued. Patient A has a poor diet lacking in iron, while Patient B recently recovered from a bacterial infection that is now causing lingering weakness.",
    subQuestions: [
      { question: "Explain what condition Patient A most likely has, and why.", answer: "Patient A most likely has anaemia, caused by a long-term lack of iron in their diet, which affects the blood's ability to carry oxygen and leads to weakness and fatigue." },
      { question: "Is Patient A's condition linked to a pathogen? Explain.", answer: "No -- Patient A's condition is a deficiency disease caused by a nutrient shortage, not by any pathogen." },
      { question: "Is Patient B's original condition communicable? Explain.", answer: "Yes -- Patient B's original condition was a bacterial infection, a communicable disease, since bacteria are pathogens capable of spreading between people." },
      { question: "Explain why simply prescribing the same weakness-relief remedy to both patients might not fully solve either patient's underlying problem.", answer: "Since their underlying causes are different (a dietary iron deficiency versus the after-effects of a bacterial infection), a generic remedy addressing only the symptom of weakness would not correct Patient A's iron levels or fully address whatever after-effects remain from Patient B's infection." }
    ]
  },
  {
    id: 12,
    caseTitle: "The Sanitation Investment Decision",
    caseDescription: "A local government must choose between spending its health budget entirely on treating disease cases as they occur, or spending a portion of it on improving community sanitation infrastructure instead.",
    subQuestions: [
      { question: "Explain one advantage of investing in sanitation infrastructure over only treating cases.", answer: "Improving sanitation addresses a root cause of many communicable diseases (contaminated water and waste), potentially preventing many future cases altogether, rather than only managing illness after it has already occurred." },
      { question: "Explain one risk of spending the entire budget only on treatment, with no prevention investment.", answer: "Without addressing the underlying causes, new cases are likely to keep occurring repeatedly, potentially requiring ongoing and possibly increasing treatment costs over time." },
      { question: "Does this mean treatment spending is unnecessary? Explain.", answer: "No -- people who are already sick still need treatment; the point is that relying only on treatment, without any prevention investment, is less effective in the long run than combining both approaches." },
      { question: "Suggest a balanced approach the government could consider.", answer: "Allocating the budget to cover necessary immediate treatment needs, while also investing a meaningful portion in long-term prevention measures like sanitation, aiming to reduce future case numbers and treatment costs over time." }
    ]
  },
  {
    id: 13,
    caseTitle: "The Mosquito Net Distribution Program",
    caseDescription: "A health organisation distributes free mosquito nets to every household in a region with high malaria rates, while also running a separate campaign encouraging people to boil their drinking water.",
    subQuestions: [
      { question: "Which prevention measure specifically targets malaria, and why?", answer: "The mosquito nets, since malaria spreads through mosquito bites (a vector), and nets physically reduce the chance of being bitten." },
      { question: "Does boiling water have any direct effect on malaria cases? Explain.", answer: "No -- boiling water targets water-borne pathogens, but malaria is spread by a mosquito vector, not through contaminated water, so boiling water would not directly reduce malaria cases." },
      { question: "Why might the organisation still run the water-boiling campaign in the same region?", answer: "The region may also be at risk from separate water-borne diseases, so the water-boiling campaign addresses a different health risk alongside the malaria-focused mosquito net programme." },
      { question: "What does this scenario illustrate about designing public health programmes?", answer: "It illustrates that different diseases require different, specifically matched prevention measures, and a thorough public health programme may need to run several targeted measures at once to address multiple risks in the same population." }
    ]
  },
  {
    id: 14,
    caseTitle: "The Recovering Patient's Confusion",
    caseDescription: "A patient who recently recovered from a bacterial throat infection asks their doctor why they still need to complete the remaining days of their prescribed antibiotic course, since they already feel completely better.",
    subQuestions: [
      { question: "Explain what likely happened to the bacteria causing the infection by the time the patient started feeling better.", answer: "The antibiotics have likely reduced the bacteria to a low enough number that symptoms improved, but some bacteria may still remain in the body even though the patient feels better." },
      { question: "Explain the risk of the patient stopping the antibiotics early.", answer: "If bacteria remain, stopping early could allow them to survive and multiply again, potentially causing the infection to return." },
      { question: "Is this patient's illness communicable or non-communicable? Explain.", answer: "Communicable -- it is caused by a bacterium (a pathogen), which is capable of spreading between people." },
      { question: "What should the doctor advise the patient to do?", answer: "Complete the full prescribed course of antibiotics, even though symptoms have already improved, to ensure the bacteria are reduced as thoroughly as possible." }
    ]
  },
  {
    id: 15,
    caseTitle: "The City's Two Health Strategies",
    caseDescription: "City A invests heavily in vaccination programmes and clean water infrastructure. City B invests only in building more hospitals to treat sick patients. After several years, City A reports far fewer new communicable disease cases than City B.",
    subQuestions: [
      { question: "Explain why City A's strategy likely resulted in fewer new cases.", answer: "City A's approach (vaccination and clean water) directly prevents communicable diseases from occurring in the first place, by blocking transmission pathways and building immunity, rather than only responding after people become ill." },
      { question: "Does City B's strategy help people who do get sick? Explain.", answer: "Yes -- more hospitals can provide treatment and care for people who become ill, which is still valuable, but this approach does not prevent new cases from occurring in the first place." },
      { question: "Suggest what City B could add to its strategy to reduce future case numbers.", answer: "Investing in prevention measures such as vaccination programmes and safe water infrastructure, similar to City A's approach." },
      { question: "What general lesson about health strategy does this comparison illustrate?", answer: "Prevention-focused measures can reduce the overall number of new disease cases over time, while treatment-only approaches manage illness after it occurs but do not address the underlying causes of ongoing spread." }
    ]
  },
  {
    id: 16,
    caseTitle: "The Isolated Farming Family's Diet",
    caseDescription: "A farming family living far from any market grows and eats mostly one type of grain, with very little variety in fruits, vegetables, or other food groups, across many years.",
    subQuestions: [
      { question: "Explain why this family could be at risk of developing one or more deficiency diseases.", answer: "Relying on mostly one type of food for a long period makes it likely that certain essential nutrients found mainly in other food groups (like specific vitamins from fruits and vegetables) are missing from their diet over time." },
      { question: "Suggest a possible deficiency disease this family might be at risk of, with reasoning.", answer: "Any reasonable answer with correct reasoning, such as scurvy if their diet lacks vitamin C (commonly found in fruits and vegetables), since fruits and vegetables appear to be missing from their diet." },
      { question: "Would eating a larger quantity of the same single grain solve this problem? Explain.", answer: "No -- eating more of the same food would not add the specific missing nutrients found in other food groups; solving the problem requires adding variety to the diet, not just increasing the amount of what they already eat." },
      { question: "Suggest a practical way this family could address the risk despite limited access to markets.", answer: "Growing a wider variety of crops themselves if possible (such as vegetables suited to their land), to add nutritional variety to their diet without relying on distant markets." }
    ]
  },
  {
    id: 17,
    caseTitle: "The Overlooked Mental Health Signs",
    caseDescription: "A normally cheerful and active student has recently become withdrawn, stopped participating in activities they used to enjoy, and seems constantly tired, but appears physically healthy according to a recent medical check-up.",
    subQuestions: [
      { question: "Based on the definition of health, could this student still have a health concern despite the clear physical check-up? Explain.", answer: "Yes -- health includes mental well-being as an essential component; the described changes in mood, withdrawal, and loss of interest could indicate a mental health concern, even with normal physical results." },
      { question: "Why might a physical check-up alone fail to identify this kind of health concern?", answer: "A physical check-up mainly examines the body's physical functioning, and is not designed to directly assess emotional or psychological well-being, which requires a different kind of attention or conversation." },
      { question: "Suggest one appropriate first step for someone noticing these changes in a friend.", answer: "Gently talking to the friend and expressing care and concern, encouraging them to share what they are experiencing, or suggesting they speak with a trusted adult." },
      { question: "Explain why dismissing these signs simply because 'the check-up was normal' would be a mistake.", answer: "Since mental well-being is a distinct and essential part of health, separate from physical results, dismissing clear behavioural changes based only on a physical check-up would overlook a potentially real and important part of the person's overall health." }
    ]
  },
  {
    id: 18,
    caseTitle: "The Delayed Vaccination Consequence",
    caseDescription: "A region delays its planned vaccination programme against a communicable disease by several months due to funding issues. During this delay, the disease spreads significantly further than health officials had originally expected.",
    subQuestions: [
      { question: "Explain why the delay likely allowed the disease to spread further than expected.", answer: "Without the vaccination programme in place, the population's level of immunity remained lower for longer, giving the pathogen more time and more available non-immune hosts to spread between." },
      { question: "How might the region's decision to eventually still deliver the vaccination programme help going forward?", answer: "Once delivered, the vaccination programme would begin building immunity in the population, working toward eventual herd immunity and reducing further spread from that point onward." },
      { question: "Does this scenario mean vaccination programmes are only useful if delivered immediately, with no value if delayed? Explain.", answer: "No -- a delayed vaccination programme still provides value once delivered, by building immunity from that point forward, even though the earlier delay likely allowed more cases to occur than if it had started on time." },
      { question: "What general lesson does this scenario suggest about the timing of prevention measures?", answer: "The timing of prevention measures like vaccination can significantly affect how much a disease spreads -- earlier action tends to limit spread more effectively than delayed action, even though later action still provides meaningful benefit." }
    ]
  },
  {
    id: 19,
    caseTitle: "The Genetic Risk and Lifestyle Choice",
    caseDescription: "A student learns that they have a family history that puts them at higher genetic risk for a certain non-communicable disease later in life, and wonders whether there is any point in maintaining healthy habits now.",
    subQuestions: [
      { question: "Explain whether genetic risk alone determines if the student will definitely develop the disease.", answer: "No -- genetic risk is one contributing risk factor among several; lifestyle factors such as diet and physical activity also influence the overall likelihood of developing the disease." },
      { question: "Explain why maintaining healthy habits could still be valuable for this student, despite the genetic risk.", answer: "Since lifestyle is also a contributing risk factor, maintaining healthy habits could help offset some of the increased risk from genetics, potentially reducing the overall likelihood or delaying the onset of the disease." },
      { question: "Is it accurate for the student to conclude 'there is no point trying' because of their genetic risk? Explain.", answer: "No -- this conclusion incorrectly treats genetic risk as a guaranteed outcome rather than one of several contributing risk factors; healthy habits can still meaningfully influence the overall risk." },
      { question: "Suggest one healthy habit the student could prioritise, with reasoning tied to their situation.", answer: "Any reasonable habit relevant to the disease type, such as maintaining a balanced diet and regular physical activity, reasoning that these are controllable risk factors that can help offset the uncontrollable genetic risk." }
    ]
  },
  {
    id: 20,
    caseTitle: "The Community Well-Being Survey",
    caseDescription: "A community conducts a survey asking only about the number of physical illnesses residents experienced in the past year, and concludes the community is 'very healthy' based on a low illness count.",
    subQuestions: [
      { question: "Explain why this survey provides an incomplete picture of the community's overall health.", answer: "The survey only measures physical illness, leaving out the mental and social well-being components that are also part of the accepted definition of health." },
      { question: "Suggest two additional questions the survey could include to give a fuller picture.", answer: "Any two reasonable questions, such as questions about stress levels, feelings of social support or isolation, access to healthcare, or satisfaction with community relationships." },
      { question: "Could a community have a low illness count but still have significant health concerns? Explain.", answer: "Yes -- a community could have few physical illnesses reported while still experiencing widespread stress, social isolation, or other mental and social well-being concerns that the illness-only survey would completely miss." },
      { question: "What should the community conclude instead, based on ideas from this chapter?", answer: "The community should recognise that a low physical illness count is a positive sign for only one part of health, and a fuller assessment covering mental and social well-being would be needed before concluding the community is 'very healthy' overall." }
    ]
  },
];

// ── SELF-ASSESSMENT: 50-question timed quiz (30 minutes) ──
export const SCIENCE8H_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "Health is best defined as:", options: ["Only the absence of disease", "Complete physical, mental, and social well-being", "Only physical fitness", "Only avoiding infection"], correctAnswer: 1, explanation: "Health includes physical, mental, and social well-being together." },
  { id: 2, question: "A person with no illness but constant stress and isolation is:", options: ["Completely healthy", "Not completely healthy", "Automatically diseased", "Impossible to assess"], correctAnswer: 1, explanation: "Complete health requires all three well-being components together." },
  { id: 3, question: "Personal health concerns:", options: ["A whole community", "One individual", "Only government policy", "Only genetics"], correctAnswer: 1, explanation: "Personal health is about one individual's well-being." },
  { id: 4, question: "Community health depends heavily on:", options: ["Only individual willpower", "Shared conditions like water and sanitation", "Nothing external", "Only genetics"], correctAnswer: 1, explanation: "Community health depends on shared, community-level conditions." },
  { id: 5, question: "A balanced diet is an example of a:", options: ["Community-level factor", "Personal factor supporting health", "Type of pathogen", "Type of vaccine"], correctAnswer: 1, explanation: "A balanced diet is a personal habit supporting health." },
  { id: 6, question: "Safe drinking water supply is mainly a:", options: ["Personal factor", "Community-level factor", "Type of disease", "Type of vaccine"], correctAnswer: 1, explanation: "Safe water supply is typically a shared, community-level factor." },
  { id: 7, question: "A disease is a condition where:", options: ["Normal body/mind function is disturbed", "The body is always perfectly healthy", "Only the mind is affected", "Only animals are affected"], correctAnswer: 0, explanation: "Disease disturbs normal body or mind function." },
  { id: 8, question: "A communicable disease can:", options: ["Never spread between people", "Spread from an infected host to a healthy one", "Only affect plants", "Only affect the mind"], correctAnswer: 1, explanation: "Communicable diseases spread between hosts." },
  { id: 9, question: "A non-communicable disease:", options: ["Spreads rapidly between people", "Does not spread between people", "Is always caused by a virus", "Is always curable instantly"], correctAnswer: 1, explanation: "Non-communicable diseases do not spread between people." },
  { id: 10, question: "Tuberculosis is:", options: ["Non-communicable", "Communicable", "A deficiency disease", "A type of vaccine"], correctAnswer: 1, explanation: "Tuberculosis is a communicable bacterial disease." },
  { id: 11, question: "Diabetes is:", options: ["Communicable", "Non-communicable", "Caused by a virus", "Spread by mosquitoes"], correctAnswer: 1, explanation: "Diabetes is a non-communicable disease linked to lifestyle/genetics." },
  { id: 12, question: "Communicable diseases are caused by:", options: ["Only stress", "Pathogens", "Only diet", "Only genetics"], correctAnswer: 1, explanation: "Communicable diseases are caused by pathogens." },
  { id: 13, question: "The common cold spreads mainly through:", options: ["Water", "Air", "Only mosquito bites", "Only soil"], correctAnswer: 1, explanation: "The common cold spreads through airborne droplets." },
  { id: 14, question: "Cholera spreads mainly through:", options: ["Air", "Contaminated water", "Only skin contact", "Only mosquitoes"], correctAnswer: 1, explanation: "Cholera spreads mainly through contaminated water." },
  { id: 15, question: "A vector transfers a pathogen:", options: ["Never between hosts", "Between hosts", "Only within one host", "Only in water"], correctAnswer: 1, explanation: "A vector carries a pathogen between hosts." },
  { id: 16, question: "Malaria's vector is:", options: ["Housefly", "Female Anopheles mosquito", "Rat", "Cockroach"], correctAnswer: 1, explanation: "The female Anopheles mosquito transmits malaria." },
  { id: 17, question: "Best prevention for a water-borne disease:", options: ["Mosquito nets", "Safe, clean drinking water", "Covering coughs", "Ignoring hygiene"], correctAnswer: 1, explanation: "Safe drinking water directly targets water-borne disease spread." },
  { id: 18, question: "Best prevention for a vector-borne disease:", options: ["Boiling water", "Removing stagnant water/using nets", "Only handwashing", "Only diet change"], correctAnswer: 1, explanation: "Removing breeding sites and using nets targets vector-borne disease." },
  { id: 19, question: "Vaccination works by:", options: ["Killing all pathogens everywhere", "Training the body's defences in advance", "Removing need for hygiene", "Curing illness after symptoms"], correctAnswer: 1, explanation: "Vaccination trains defences before real exposure." },
  { id: 20, question: "Immunity is:", options: ["The body's ability to defend against pathogens", "A type of vaccine ingredient only", "A measuring tool", "A food preservative"], correctAnswer: 0, explanation: "Immunity is the body's defence ability against pathogens and disease." },
  { id: 21, question: "Innate immunity is present:", options: ["Only after vaccination", "From birth", "Only in animals", "Only after infection"], correctAnswer: 1, explanation: "Innate immunity is present from birth." },
  { id: 22, question: "Acquired immunity develops:", options: ["Before birth only", "After encountering a specific pathogen", "Without any exposure", "Only in plants"], correctAnswer: 1, explanation: "Acquired immunity develops after pathogen exposure or vaccination." },
  { id: 23, question: "Skin acting as a barrier is an example of:", options: ["Acquired immunity", "Innate immunity", "A vaccine", "A deficiency disease"], correctAnswer: 1, explanation: "Skin barrier is a form of innate immunity." },
  { id: 24, question: "A deficiency disease is caused by:", options: ["A virus", "A long-term lack of a nutrient", "A vector", "Too much exercise"], correctAnswer: 1, explanation: "Deficiency diseases result from long-term nutrient lack." },
  { id: 25, question: "Anaemia is linked to a lack of:", options: ["Vitamin C", "Iron", "Iodine", "Vitamin D"], correctAnswer: 1, explanation: "Anaemia is caused by a long-term lack of iron." },
  { id: 26, question: "Scurvy is linked to a lack of:", options: ["Iron", "Vitamin C", "Iodine", "Calcium"], correctAnswer: 1, explanation: "Scurvy is caused by a long-term lack of vitamin C." },
  { id: 27, question: "Rickets is linked to a lack of:", options: ["Iron", "Vitamin C", "Vitamin D (or calcium)", "Iodine"], correctAnswer: 2, explanation: "Rickets is caused by a lack of vitamin D or calcium." },
  { id: 28, question: "Goitre is linked to a lack of:", options: ["Iodine", "Vitamin C", "Iron", "Vitamin D"], correctAnswer: 0, explanation: "Goitre is caused by a long-term lack of iodine." },
  { id: 29, question: "Deficiency diseases are mainly prevented by:", options: ["Vaccination", "A truly balanced diet", "Boiling water", "Mosquito nets"], correctAnswer: 1, explanation: "A balanced diet with all essential nutrients prevents deficiency diseases." },
  { id: 30, question: "Mental health refers to:", options: ["Only physical fitness", "Emotional and psychological well-being", "Only social relationships", "A type of vaccine"], correctAnswer: 1, explanation: "Mental health concerns emotional and psychological well-being." },
  { id: 31, question: "Which habit is harmful to overall health?", options: ["Balanced diet", "Tobacco use", "Regular exercise", "Adequate rest"], correctAnswer: 1, explanation: "Tobacco use is harmful to overall health." },
  { id: 32, question: "A balanced routine supports:", options: ["Only physical health", "Both physical and mental well-being", "Only social health", "Neither aspect"], correctAnswer: 1, explanation: "A balanced routine supports multiple aspects of health together." },
  { id: 33, question: "Herd immunity occurs when:", options: ["No one is immune", "A large portion of a population is immune", "Only animals are vaccinated", "A disease cannot ever be prevented"], correctAnswer: 1, explanation: "Herd immunity develops when enough people are immune." },
  { id: 34, question: "Widespread vaccination helps unvaccinated people because:", options: ["It has no effect on them", "It reduces disease spread through the community", "It cures them directly", "It removes need for hygiene"], correctAnswer: 1, explanation: "Herd immunity indirectly protects the unvaccinated by reducing spread." },
  { id: 35, question: "A risk factor:", options: ["Guarantees a disease will occur", "Increases the chance of a disease, without guaranteeing it", "Has no effect on likelihood", "Only applies to communicable diseases"], correctAnswer: 1, explanation: "Risk factors increase likelihood but do not guarantee disease." },
  { id: 36, question: "A high-salt diet is a risk factor for:", options: ["The common cold", "High blood pressure", "Malaria", "Rickets"], correctAnswer: 1, explanation: "A high-salt diet is linked to a higher risk of high blood pressure." },
  { id: 37, question: "Prevention differs from treatment because:", options: ["They are identical concepts", "Prevention stops disease before onset; treatment manages it after", "Treatment always prevents future cases", "Prevention only applies to non-communicable diseases"], correctAnswer: 1, explanation: "Prevention acts before disease; treatment manages an existing case." },
  { id: 38, question: "Community sanitation is important because it:", options: ["Only benefits one household", "Reduces contamination risk for many people at once", "Has no link to disease", "Only matters for non-communicable disease"], correctAnswer: 1, explanation: "Sanitation reduces disease risk at a community-wide level." },
  { id: 39, question: "Soft, poorly formed bones in a child suggest:", options: ["Scurvy", "Rickets", "Goitre", "Anaemia"], correctAnswer: 1, explanation: "Soft, poorly formed bones are a classic sign of rickets." },
  { id: 40, question: "Unusual tiredness and pale skin may suggest:", options: ["Rickets", "Goitre", "Anaemia", "Scurvy"], correctAnswer: 2, explanation: "Tiredness and pale skin are linked to anaemia (iron deficiency)." },
  { id: 41, question: "Two people with the same risk factor can have different outcomes because:", options: ["Risk factors always guarantee identical results", "Other factors like genetics also matter", "This situation cannot occur", "Risk factors have no effect"], correctAnswer: 1, explanation: "Other individual factors also influence disease outcomes." },
  { id: 42, question: "Knowing if a disease is communicable or non-communicable matters because:", options: ["It does not matter", "It determines whether spread-prevention or lifestyle management is the priority", "All diseases are managed identically", "Only communicable diseases need any care"], correctAnswer: 1, explanation: "This distinction determines the correct management approach." },
  { id: 43, question: "An effective prevention method should:", options: ["Match the disease's actual mode of transmission", "Be chosen randomly", "Always be the same regardless of disease", "Ignore how the disease spreads"], correctAnswer: 0, explanation: "Effective prevention must target the specific mode of transmission." },
  { id: 44, question: "Which would NOT help prevent a vector-borne disease?", options: ["Removing stagnant water", "Using mosquito nets", "Boiling drinking water", "Reducing mosquito breeding sites"], correctAnswer: 2, explanation: "Boiling water targets water-borne disease, not vector-borne disease." },
  { id: 45, question: "Deficiency diseases are directly linked to:", options: ["No dietary factor at all", "A long-term lack of a specific nutrient", "A single universal cause for all cases", "Communicable spread"], correctAnswer: 1, explanation: "Each deficiency disease links to a specific missing nutrient." },
  { id: 46, question: "Mental health is:", options: ["Unrelated to overall health", "An essential part of the definition of health", "Relevant only to adults", "Impossible to support through habits"], correctAnswer: 1, explanation: "Mental health is explicitly part of the definition of health." },
  { id: 47, question: "A healthy way to manage stress includes:", options: ["Ignoring it completely", "Talking to a trusted person", "Avoiding all rest", "Isolating from everyone"], correctAnswer: 1, explanation: "Talking to a trusted person is a healthy stress-management strategy." },
  { id: 48, question: "A single healthy exception to a risk factor claim:", options: ["Disproves the risk factor entirely", "Does not disprove the overall risk factor, since it affects probability", "Means risk factors are meaningless", "Proves risk factors are always guaranteed"], correctAnswer: 1, explanation: "A risk factor affects overall probability, not every individual case." },
  { id: 49, question: "Overall, this chapter's theme is best summarised as:", options: ["Health is only about avoiding germs", "Health is a complete state of physical, mental, and social well-being, supported by personal habits and community conditions", "Only medicine achieves good health", "Prevention is unnecessary if treatment exists"], correctAnswer: 1, explanation: "This captures the chapter's central theme about the full scope of health." },
  { id: 50, question: "Which correctly pairs a deficiency disease with its missing nutrient?", options: ["Goitre -- Vitamin C", "Scurvy -- Iodine", "Rickets -- Vitamin D", "Anaemia -- Vitamin D"], correctAnswer: 2, explanation: "Rickets is correctly linked to a lack of vitamin D." },
];
