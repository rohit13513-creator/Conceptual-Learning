import type { LongQuestion, CompetencyQuestion } from "../types-custom";

// -- LONG ANSWER QUESTIONS (5 marks each) --
export const FOUNDATIONS9_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Why does science use models instead of studying every detail of a system? Explain using the cricket-shot example and one example of your own.",
    markingScheme: ["Meaning: a model is a simplified way of looking at a real system, keeping only what matters for the question being asked -- 1 mark", "Reason: the real world is complex, so studying every single detail is often impossible -- 1 mark", "Cricket-shot example: only the mass of the ball, and the speed and direction it is hit, decide if it clears the boundary; the bat brand, ball colour and grass do not -- 1 mark", "Own example: modelling a paper aeroplane's flight keeps its weight, shape and launch speed, and ignores the colour of the paper or drawings on it -- 1 mark", "Leaving out details is done on purpose, not a mistake; more detail can always be added later for greater accuracy -- 1 mark"],
    answerParts: [
      { part: "Meaning of a model", text: "A model is a simplified picture of a real system. It keeps only the details that matter for the question being asked, and leaves out the rest." },
      { part: "Why models are needed", text: "The natural world is complex, and studying it in full detail is often impossible. Models make it possible to find an answer without getting lost in details that do not matter." },
      { part: "The cricket-shot example", text: "For a ball hit for a six, the real question is whether it will cross the boundary without hitting the ground first. The mass of the ball and the speed and direction it is hit in matter a great deal. The brand of the bat, the colour of the ball and the amount of grass on the field make no real difference to this question." },
      { part: "An example of my own", text: "Modelling how far a paper aeroplane flies keeps its weight, its shape and the speed and angle it is launched at. The colour of the paper or any drawings on it can be safely ignored, since they do not change how far it flies." },
      { part: "Details left out on purpose", text: "Leaving out details is not a mistake, it is a deliberate choice to keep the model simple while still answering the question. As more accuracy is needed, more details, such as air resistance or spin, can be added back into a more complex model." }
    ]
  },
  {
    id: 2,
    question: "How does making a model involve leaving out details on purpose? Explain using the falling-object example and the heart-as-a-pump example.",
    markingScheme: ["Building a model always involves making assumptions and choosing what to keep and what to leave out -- 1 mark", "Falling-object example: air resistance is neglected so that the basic effect of gravity can be understood -- 1 mark", "This lets us study the pull of gravity clearly, without the extra complication of air resistance -- 1 mark", "Heart-as-pump example: the many individual cells of the heart are ignored so it can be studied as one working pump moving blood -- 1 mark", "These choices are not mistakes, they keep the model simple enough to still answer the question being asked -- 1 mark"],
    answerParts: [
      { part: "Models need assumptions", text: "Building any model means making assumptions about what matters for a question, and deliberately leaving out other details that would only make the picture more complicated without helping." },
      { part: "The falling-object example", text: "When studying the motion of a falling object, air resistance is usually neglected. This lets us understand the basic effect of gravity pulling the object down, without the extra complication of the air pushing back on it." },
      { part: "Why this is useful", text: "Once the basic effect of gravity is understood using the simple model, air resistance can be added back later if a more accurate answer is needed, for example for a falling feather instead of a stone." },
      { part: "The heart-as-pump example", text: "When studying how the heart pumps blood, biologists often ignore the many individual cells that make up the heart. Instead, the heart is studied as one working pump that moves blood around the body." },
      { part: "These choices are on purpose", text: "Leaving out details like air resistance or individual cells is not a mistake. It is done on purpose, to keep the model simple enough to work with, while still being able to find useful answers to the question being studied." }
    ]
  },
  {
    id: 3,
    question: "Why do scientific quantities need exact symbols and standard units? Explain using the kilogram and the real airplane fuel mix-up as examples.",
    markingScheme: ["Quantities such as mass, velocity, force and electric current are given exact symbols, such as m, v, F and I, each with a defined unit -- 1 mark", "Exact symbols and units let scientists everywhere describe observations, compare results and build ideas together without confusion -- 1 mark", "Kilogram example: buying rice or vegetables, a kilogram is expected to mean the same amount everywhere, based on an agreed international standard -- 1 mark", "Airplane fuel mix-up: a flight needing 22300 kg of fuel was miscalculated because the crew used the density of fuel in pounds per litre instead of kilograms per litre -- 1 mark", "The plane was about 15000 litres short of fuel and had to glide to an emergency landing; using one standard system of units everywhere avoids such costly and dangerous mix-ups -- 1 mark"],
    answerParts: [
      { part: "Symbols and units", text: "Quantities such as mass, velocity, force and electric current are represented by exact symbols, such as m, v, F and I. Each symbol is associated with a clearly defined unit." },
      { part: "Why this matters", text: "This shared, exact language allows scientists across the world to describe their observations, compare their results, and build ideas together, without any confusion over what a number actually means." },
      { part: "The kilogram example", text: "When we buy rice or vegetables, we expect a kilogram to mean the same amount everywhere. This is only possible because measurements are based on agreed international standards, not on local objects or opinions." },
      { part: "The airplane fuel mix-up", text: "In a well-known real incident, a flight needed 22300 kg of fuel in total. The ground crew miscalculated the amount needed because they used the density of the fuel in pounds per litre instead of kilograms per litre." },
      { part: "The result and the lesson", text: "The aircraft ended up about 15000 litres short of fuel mid-flight and had to glide to an emergency landing, though luckily no one was hurt. Using one standard (SI) system of units everywhere avoids conversions between systems, and the errors that come with them." }
    ]
  },
  {
    id: 4,
    question: "Where does the symbol c for the speed of light come from? Why does science need a shared and unambiguous language?",
    markingScheme: ["Scientific symbols often come from history and international agreement, not simply from convenience -- 1 mark", "The symbol c for the speed of light comes from the Latin word celeritas, meaning speed -- 1 mark", "The speed of light is today defined to be exactly 299792458 m/s -- 1 mark", "A shared language of exact terms, symbols and units lets scientists worldwide describe observations, compare results and build on each other's work -- 1 mark", "Everyday words such as force, work, cell or reaction are given one exact meaning in science, so ideas can be communicated clearly and without confusion -- 1 mark"],
    answerParts: [
      { part: "Where symbols come from", text: "Scientific symbols often come from history, and are based on international agreements, not necessarily from abbreviations of convenience." },
      { part: "The symbol c", text: "The speed of light is usually denoted by the symbol c, since it comes from the Latin word celeritas, meaning speed. Today, the speed of light is one of the physical constants, defined to be exactly 299792458 metres per second." },
      { part: "Why a shared language is needed", text: "Science uses a shared language of specific terms, symbols and units so that scientists across the world can describe observations, compare results and build ideas together, no matter where they work." },
      { part: "Precise everyday words", text: "Many words used in everyday life, such as force, work, cell or reaction, get very specific meanings in science. These meanings must be exact because scientific ideas must be communicated clearly and without any ambiguity." },
      { part: "The role of mathematics", text: "Science also turns to mathematics so that relationships between quantities can be expressed clearly and tested carefully. An equation is a compact statement about how quantities are related, not just a tool for getting a number." }
    ]
  },
  {
    id: 5,
    question: "Explain the difference between a law, a theory and a principle. Give one example of each.",
    markingScheme: ["A law describes a regular pattern observed in nature, often expressed using words or mathematical relationships -- 1 mark", "Example of a law: Newton's laws of motion explain the jerk felt when a bus stops suddenly -- 1 mark", "A theory explains why a pattern occurs, based on evidence gathered and tested over time; example: the atomic theory explains how molecules are formed -- 1 mark", "A principle is a broad idea that helps make sense of a given situation; example: the principle of conservation of energy applies when climbing a flight of stairs -- 1 mark", "All three help organise our understanding as observations are repeated, measurements refined, and ideas tested through experiments -- 1 mark"],
    answerParts: [
      { part: "Law", text: "A law usually describes a regular pattern observed in nature, often expressed using words or a mathematical relationship. For example, Newton's laws of motion explain the jerk felt when a bus stops suddenly." },
      { part: "Theory", text: "A theory goes a step further and provides an explanation of why a pattern occurs, usually based on evidence gathered over time. For example, the atomic theory explains how molecules are formed from atoms." },
      { part: "Principle", text: "A principle is a broad idea that helps us make sense of many situations. For example, the principle of conservation of energy is applied when explaining the effort of climbing a flight of stairs." },
      { part: "How they connect", text: "As observations are repeated, measurements refined, and ideas tested through experiments, our understanding gets organised into laws, theories and principles, each with its own specific meaning in science." },
      { part: "Why the distinction matters", text: "Knowing whether an idea is a law, a theory or a principle helps us understand what kind of claim is being made: a pattern, an explanation for that pattern, or a broad guiding idea used across many situations." }
    ]
  },
  {
    id: 6,
    question: "Why is a scientific theory not the same as a guess? Explain why theories stay open to being revised.",
    markingScheme: ["In everyday talk, calling something 'just a theory' can sound like a guess, but in science it means something else -- 1 mark", "A theory is an explanation based on careful testing and critical examination, not an untested idea -- 1 mark", "It explains patterns using the evidence gathered and available at the time -- 1 mark", "Theories remain open to improvement and can change as new evidence becomes available -- 1 mark", "This openness to being corrected is a key feature that makes science reliable, not a weakness -- 1 mark"],
    answerParts: [
      { part: "Not the same as a guess", text: "In everyday talk, calling an idea 'just a theory' can make it sound like a guess or an untested idea. In science, a theory means something quite different." },
      { part: "What a theory really is", text: "A theory is an explanation of why a pattern happens, built on careful testing and critical examination, based on the evidence gathered and available at the time." },
      { part: "Always based on evidence", text: "Because a theory is built from evidence, it is not simply someone's opinion. It has been checked against observations before it is accepted as a good explanation." },
      { part: "Open to revision", text: "Even so, a theory is always open to improvement. As new evidence becomes available, a theory can be changed, extended, or in some cases replaced by a better explanation." },
      { part: "Why this is a strength", text: "This openness to being corrected is a key feature of science that makes it reliable. A theory that could never be changed, no matter what new evidence appeared, would not be trustworthy in the same way." }
    ]
  },
  {
    id: 7,
    question: "Explain how scientific predictions are reasoned expectations rather than guesses. Give two examples.",
    markingScheme: ["When laws, theories and models are well established, they let us anticipate what will happen under new conditions -- 1 mark", "Predictions are reasoned expectations, based on evidence and careful thinking, not guesses -- 1 mark", "Example 1: using ideas about motion, we can predict how far a kicked football will travel -- 1 mark", "Example 2: using knowledge of chemical reactions we can estimate how much carbon dioxide will be produced, or using biology predict how breathing changes while running -- 1 mark", "When predictions match observations, confidence grows; when they do not, scientists re-examine their assumptions, models or measurements -- 1 mark"],
    answerParts: [
      { part: "What a prediction is", text: "When laws, theories and models are well established, they allow us to anticipate what will happen under new or different conditions, often before we even perform an experiment." },
      { part: "Not a guess", text: "These predictions are reasoned expectations, based on evidence and careful thinking, and not simple guesses." },
      { part: "Example 1: motion", text: "Using ideas about motion, we can predict how far a kicked football will travel, based on the force and angle of the kick." },
      { part: "Example 2: chemistry or biology", text: "Using knowledge of chemical reactions, we can estimate how much carbon dioxide will be produced, or how soft a baked loaf of bread would be. Using biological principles, we can predict how a person's breathing would change while running." },
      { part: "When predictions are checked", text: "When a prediction matches what is observed, confidence in the underlying science grows. When it does not match, scientists re-examine their assumptions, their models, or their measurements, which drives further exploration." }
    ]
  },
  {
    id: 8,
    question: "Varsha tells her friend Meghna, 'It will rain this afternoon because the clouds look dark.' How can this claim be turned into a testable scientific prediction? List some better questions to ask.",
    markingScheme: ["As stated, the claim has a simple yes-or-no feel to it and is not easy to test scientifically -- 1 mark", "A good scientific question looks for measurable evidence and past patterns, not a simple feeling -- 1 mark", "Better question: what was the condition of the sky the last time it actually rained -- 1 mark", "Better questions: what is the humidity today, was it above 80 per cent last time it rained, and what is today's wind speed and direction -- 1 mark", "Better question: is the temperature dropping the way it did before the recent rains; such questions ask for measurable data rather than a vague impression -- 1 mark"],
    answerParts: [
      { part: "The problem with the claim", text: "The claim 'it will rain because the clouds look dark' has a simple yes-or-no feel to it. Questions with such simple answers are usually not very useful for testing a prediction." },
      { part: "What a good question looks for", text: "Good scientific questions look for measurable evidence and past patterns, going beyond a vague impression like 'the clouds look dark'." },
      { part: "Question about past patterns", text: "Meghna could ask: what was the condition of the sky the last time it actually rained, to compare it with today?" },
      { part: "Questions about measurements", text: "She could also ask: what is the humidity today, and was it above 80 per cent the last time it rained? What is today's wind speed and direction?" },
      { part: "Another measurable question", text: "She could ask: is the temperature dropping today the way it did before the recent rains? Questions like these ask for measurable data and past patterns, making the claim genuinely testable." }
    ]
  },
  {
    id: 9,
    question: "Why do weather forecasts become less certain the further into the future they look?",
    markingScheme: ["Weather depends on many changing factors, such as temperature, pressure, humidity and wind -- 1 mark", "Weather forecasts are made using measurements and models of these factors -- 1 mark", "Very tiny differences in starting conditions can grow larger and larger over time -- 1 mark", "These small differences can eventually lead to something completely different happening than first expected -- 1 mark", "So forecasts are usually reliable for a few hours or days, but less certain further ahead; this is a limit of the model, not a failure of science -- 1 mark"],
    answerParts: [
      { part: "Many changing factors", text: "Weather depends on many changing factors at once, such as temperature, pressure, humidity and wind, all changing together across a wide area." },
      { part: "Forecasts use models", text: "Weather forecasts use measurements of these factors along with models built from them to work out what is likely to happen next." },
      { part: "Small differences grow", text: "Very tiny differences in the starting conditions of the atmosphere can grow larger and larger as time passes." },
      { part: "Leading to different outcomes", text: "Because these small differences keep growing, the actual weather that develops can end up being quite different from what a model first suggested, especially many days ahead." },
      { part: "Why this is not a failure", text: "This is why forecasts are usually reliable for only a few hours or a few days, and become less certain further into the future. It shows the limits of the model being used, not a failure of science itself." }
    ]
  },
  {
    id: 10,
    question: "A common claim on social media says food becomes harmful if eaten during an eclipse. How can simple scientific questions be used to test and reject this claim?",
    markingScheme: ["An eclipse is simply a play of shadows, caused by one body blocking light from reaching another -- 1 mark", "Question to ask: does the temperature change significantly during an eclipse -- 1 mark", "Question to ask: does food kept in any ordinary shadow go bad in the same short time -- 1 mark", "Question to ask: what physical, chemical or biological mechanism could actually explain such harm -- 1 mark", "Checking these questions shows no such mechanism exists, so the claim can be confidently rejected -- 1 mark"],
    answerParts: [
      { part: "What an eclipse really is", text: "An eclipse is simply a play of shadows, where one body such as the moon blocks light that would otherwise reach the earth. It is a purely physical event." },
      { part: "First question", text: "A useful question to ask is whether the temperature changes significantly during an eclipse, in a way that could plausibly harm food." },
      { part: "Second question", text: "Another useful question is whether food kept in any ordinary shadow, not just during an eclipse, goes bad in the same short time. If not, a shadow itself cannot be the cause." },
      { part: "Third question", text: "A further question asks what physical, chemical or biological mechanism could actually explain food becoming harmful just because of an eclipse." },
      { part: "Conclusion", text: "Asking these simple scientific questions shows that no physical, chemical or biological mechanism supports the claim, so it can be rejected with confidence, rather than accepted just because it is widely shared." }
    ]
  },
  {
    id: 11,
    question: "Explain why no scientific idea is ever completely final. How do scientists respond when a prediction does not match what is observed?",
    markingScheme: ["Even the most successful theories have limits and may fail when new conditions are explored or measurements become more precise -- 1 mark", "Such failures are not a weakness of science, they are in fact its greatest strength -- 1 mark", "When a prediction does not match observation, scientists re-examine their assumptions, models or measurements -- 1 mark", "Scientists change their ideas only because of evidence, never because of opinion or belief -- 1 mark", "This openness to being corrected by nature is what allows science to help us understand the world we live in -- 1 mark"],
    answerParts: [
      { part: "Limits of even good theories", text: "Even the most successful scientific theories have limits, and may fail when new conditions are explored or when measurements become more precise than before." },
      { part: "Not a weakness", text: "Such failures are not a weakness of science. In fact, this ability to find and correct its own failures is one of the greatest strengths of science." },
      { part: "How scientists respond", text: "When predictions do not match observations, scientists re-examine their assumptions, their models, or their measurements, to find out what needs to change." },
      { part: "Evidence, not opinion", text: "Scientists do not reject or change ideas based on opinion or belief. They do so only when the evidence shows that a change is needed." },
      { part: "Why this matters", text: "No scientific theory is ever completely final, and none is beyond question. This openness to being corrected by nature itself is exactly what has allowed science to help us understand the world we live in." }
    ]
  },
  {
    id: 12,
    question: "What does it mean to estimate a quantity in science? Why can an approximate answer be useful? Explain using the example of feeding a family of four for a month.",
    markingScheme: ["Estimation means making a rough, sensible approximate answer instead of an exact calculation -- 1 mark", "An approximate answer is useful because an exact value is not always necessary, especially early in reasoning -- 1 mark", "Rice example: assume all the family's calories come from rice, find the calories 100 g of cooked rice gives, and use the daily need of about 2000-2500 kcal per adult to scale up -- 1 mark", "The goal is not an exact number, but to check the answer feels sensible: 100 g for a month is clearly too little, and a few tonnes is clearly too much -- 1 mark", "Estimating this way builds intuition, helps detect errors, and connects science to everyday questions about food and resources -- 1 mark"],
    answerParts: [
      { part: "What estimation means", text: "Estimation means making a rough, reasonable approximate answer, rather than an exact calculation, to check whether a result makes sense." },
      { part: "Why an estimate is useful", text: "Exact values are not always necessary, especially in the early stages of reasoning. Often an approximate estimate is enough to tell us whether a result is reasonable or clearly impossible." },
      { part: "The rice example", text: "To estimate how much rice would feed a family of four for a month, we can assume that all their calorie needs come from rice alone. An average adult needs about 2000 to 2500 kilocalories a day, and we can find how many calories 100 g of cooked rice gives, then scale this up for the whole family for a month." },
      { part: "Checking the answer feels right", text: "The aim is not to get an exact number, but to check that the answer makes sense. An answer of 100 g for the whole month is clearly far too little, while an answer of a few tonnes is clearly far too much." },
      { part: "Why this skill matters", text: "Such estimation connects science to everyday questions about food and resources, and shows why approximate reasoning, rather than only exact calculation, is an important scientific skill." }
    ]
  },
  {
    id: 13,
    question: "Describe two independent ways to estimate how many litres of air a person breathes in one day. Why does getting close, though not exactly the same, answers from each method build confidence in the estimate?",
    markingScheme: ["Method 1: about 12-15 breaths a minute gives roughly 20000 breaths a day; using a party balloon (4-5 breaths fill a 2 litre balloon) gives about 0.5 litre per breath, so about 10000 litres a day -- 1 mark", "Method 2: a balloon takes about 20 seconds to blow up, so about 3 balloons a minute; 3 balloons/minute x 2 litres/balloon x 1440 minutes/day gives about 8640 litres -- 1 mark", "Both methods estimate the volume of air differently, one from breath rate and balloon-filling, one from blowing speed -- 1 mark", "Getting close, though not exactly equal, answers from two independent methods suggests the overall estimate is reasonable, not wildly wrong -- 1 mark", "This kind of cross-checking, rather than trusting a single calculation, is how confidence in an estimate is built in science -- 1 mark"],
    answerParts: [
      { part: "Method 1: breath rate and balloon volume", text: "At rest, a person takes about 12 to 15 breaths a minute, giving roughly 18000 to 22000, or about 20000, breaths in a day (60 x 24 = 1440 minutes). It takes about 4 to 5 breaths to fill a typical 2 litre party balloon, so one breath is about 0.5 litre. This gives about 10000 litres of air a day." },
      { part: "Method 2: blowing speed", text: "A second, independent way is to note that a balloon takes about 20 seconds to blow up, so about 3 balloons could be filled in a minute. Multiplying 3 balloons a minute by 2 litres per balloon by 1440 minutes in a day gives about 8640 litres." },
      { part: "Why the methods are independent", text: "The two methods estimate the same quantity, the volume of air breathed in a day, using different reasoning: one from breathing rate and balloon filling, the other from blowing speed." },
      { part: "Why closeness matters", text: "Although the two answers, about 10000 litres and about 8640 litres, are not exactly the same, they are reasonably close to each other for estimation purposes." },
      { part: "Building confidence", text: "Getting close but not identical answers from two independent methods builds confidence that the estimate is in the right range. This kind of cross-checking, rather than relying on a single calculation, is an important part of how scientists trust an estimate." }
    ]
  },
  {
    id: 14,
    question: "When is an approximate estimate good enough in science, and when is an exact value really needed? Give your own example of each.",
    markingScheme: ["An estimate is enough when we only need to check whether a result is reasonable or roughly workable -- 1 mark", "Own example: guessing how much rice or wheat a family should buy for a month, where being roughly right is enough -- 1 mark", "An exact value is needed when a small error could cause real harm, waste or danger -- 1 mark", "Own example: the exact dose of a medicine for a patient, or the exact amount of fuel needed for a flight, where a small mistake matters a great deal -- 1 mark", "Deciding which is needed depends on the situation, and on how much a mistake in the answer would actually cost -- 1 mark"],
    answerParts: [
      { part: "When an estimate is enough", text: "An approximate estimate is good enough when the only goal is to check whether a result is reasonable, or whether a plan is roughly workable." },
      { part: "Example of an estimate being enough", text: "Guessing roughly how much rice or wheat a family should buy for a month is a case where being roughly right, rather than exact, is perfectly fine." },
      { part: "When an exact value is needed", text: "An exact value is really needed when even a small error could cause real harm, waste, or danger." },
      { part: "Example needing an exact value", text: "The exact dose of a medicine given to a patient needs to be precise, since too little may not help and too much could be dangerous. Similarly, the exact amount of fuel needed for a flight to safely complete its journey must be calculated exactly, not estimated roughly." },
      { part: "How to decide", text: "Whether an estimate is enough, or an exact value is required, depends on the situation being studied and on how costly or dangerous a mistake in the answer would be." }
    ]
  },
  {
    id: 15,
    question: "Explain why the branches of science, physics, chemistry, biology and earth science, are divisions made by people rather than real boundaries in nature. Use the example of how a mask works to show several branches working together.",
    markingScheme: ["Science is often divided into branches such as physics, chemistry, biology and earth science, mainly to help organise knowledge -- 1 mark", "The natural world itself does not have any such boundaries between these branches -- 1 mark", "Mask example, physics: how particles move in air and how electrostatic attraction pulls tiny particles towards the fibres -- 1 mark", "Mask example, chemistry and biology: the properties of the polymer fibres, and the size and behaviour of the viruses the mask should stop -- 1 mark", "Mask example, mathematics: modelling airflow and filtration efficiency; together these ideas explain one everyday object -- 1 mark"],
    answerParts: [
      { part: "Branches as human divisions", text: "Science is often divided into branches, such as physics, chemistry, biology and earth science. These divisions are made by people mainly to help organise knowledge into manageable areas of study." },
      { part: "No real boundaries in nature", text: "The natural world itself does not have any such boundaries. These divisions are not independent of each other, and most real-world problems need ideas from more than one branch at once." },
      { part: "Mask example: physics", text: "Understanding how a mask works requires physics, to explain how tiny particles move through the air and how electrostatic attraction pulls some of them towards the mask's fibres." },
      { part: "Mask example: chemistry and biology", text: "It also requires chemistry, to explain the properties of the polymer fibres the mask is made from, and biology, to explain the size and behaviour of the viruses the mask is meant to stop." },
      { part: "Mask example: mathematics", text: "Mathematics is used to model the airflow through the mask and to work out how efficiently it filters the air. Together, physics, chemistry, biology and mathematics are all needed to fully explain one everyday object." }
    ]
  },
  {
    id: 16,
    question: "Choose a real-world problem such as climate change or developing a medicine. Explain why solving it needs more than one branch of science, and how it also connects to mathematics or technology.",
    markingScheme: ["Real-world problems rarely fit inside just one branch of science -- 1 mark", "Climate change example: needs physics (heat and energy), chemistry (gases in the atmosphere), biology (effects on living things) and earth science (oceans and weather patterns) -- 1 mark", "Medicine example: needs chemistry (making the compound), biology (how the body reacts) and mathematics (testing results and working out doses) -- 1 mark", "Science also connects with technology, for example the instruments used to measure, test and apply these ideas -- 1 mark", "Solving such problems needs several branches and ways of knowing to work together, not any one branch alone -- 1 mark"],
    answerParts: [
      { part: "Real problems cross boundaries", text: "Most real-world problems today do not fit neatly inside a single branch of science. Understanding or solving them usually needs ideas from several branches together." },
      { part: "Climate change example", text: "Understanding climate change needs physics to explain heat and energy in the atmosphere, chemistry to explain the gases involved, biology to explain the effects on living things, and earth science to explain oceans and weather patterns." },
      { part: "Medicine example", text: "Developing a medicine needs chemistry to make the right compound, biology to understand how the body reacts to it, and mathematics to analyse test results and work out safe doses." },
      { part: "Connection to technology", text: "Science also connects naturally with technology, for example the instruments and devices used to take measurements, run tests, and apply scientific ideas to real situations." },
      { part: "Why several branches are needed", text: "Solving problems like climate change or developing a medicine requires several branches of science, along with mathematics and technology, working together, rather than any single branch acting alone." }
    ]
  },
  {
    id: 17,
    question: "Why is science described as a human activity? Explain the role of curiosity, creativity and collaboration.",
    markingScheme: ["Science is not just a collection of facts, equations or experiments -- 1 mark", "It is shaped by curiosity: people ask questions about the world around them -- 1 mark", "It is shaped by creativity: coming up with new ways to test an idea or build a model -- 1 mark", "It grows through collaboration: people share their results, test each other's ideas, and learn from mistakes -- 1 mark", "Science has developed over time through the work of many people across different cultures and generations -- 1 mark"],
    answerParts: [
      { part: "More than facts and equations", text: "Science is not just a collection of facts, equations, or experiments. It is a human activity, shaped by curiosity, creativity, collaboration, and careful questioning." },
      { part: "The role of curiosity", text: "Curiosity drives scientists, and anyone doing science, to ask questions about things they notice in the world around them." },
      { part: "The role of creativity", text: "Creativity is needed to come up with new ways of testing an idea, building a useful model, or looking at an old problem from a fresh angle." },
      { part: "The role of collaboration", text: "Science grows as people share their results with each other, test one another's ideas, and learn from mistakes rather than hiding them." },
      { part: "Built up over time", text: "Science has developed over time through the work of many individuals across different cultures and generations, each adding to what came before." }
    ]
  },
  {
    id: 18,
    question: "Explain the scientific method as a cycle of observation, question, hypothesis, experiment and conclusion. Use an example of your own.",
    markingScheme: ["Observation: noticing something interesting or unusual in nature -- 1 mark", "Question: asking why or how the observed thing happens -- 1 mark", "Hypothesis: forming a testable explanation that could answer the question -- 1 mark", "Experiment and conclusion: running a fair test of the hypothesis, then deciding from the results whether to keep, change or drop it -- 1 mark", "Own example applying all the steps in order, showing that the process can lead back to a new observation or question -- 1 mark"],
    answerParts: [
      { part: "Observation", text: "The cycle begins with observation: noticing something interesting in nature, such as a plant near a window appearing to grow taller than similar plants elsewhere." },
      { part: "Question", text: "This observation leads to a question: why does the plant near the window grow taller than the others?" },
      { part: "Hypothesis", text: "A hypothesis is then formed, a testable explanation that could answer the question, for example, that more sunlight near the window makes the plant grow taller." },
      { part: "Experiment and conclusion", text: "An experiment is designed to test this fairly, for example growing similar plants under different amounts of light while keeping water and soil the same. The conclusion is drawn from the results: whether the hypothesis should be kept, changed, or dropped." },
      { part: "It is a cycle", text: "If the conclusion raises new questions, for example about how much light is ideal, the cycle can begin again with a fresh observation or question, which is why it is described as a cycle rather than a straight line." }
    ]
  },
  {
    id: 19,
    question: "What are independent, dependent and controlled variables? What is the role of a control group? Explain with a simple experiment.",
    markingScheme: ["Independent variable: the one deliberately changed by the experimenter -- 1 mark", "Dependent variable: the one that is measured, which may change because of the independent variable -- 1 mark", "Controlled variables: kept the same on purpose, so only the independent variable can explain any change in the result -- 1 mark", "Control group: a group that does not get the treatment being tested, so it can be compared with the group that does -- 1 mark", "Example experiment applying all four ideas, such as testing whether music affects plant growth -- 1 mark"],
    answerParts: [
      { part: "Independent variable", text: "The independent variable is the one that the experimenter deliberately changes, on purpose, to see what effect it has." },
      { part: "Dependent variable", text: "The dependent variable is the one that is measured in the experiment. It may change because of the independent variable." },
      { part: "Controlled variables", text: "Controlled variables are the conditions that are kept the same on purpose throughout the experiment, so that only the independent variable can explain any difference seen in the result." },
      { part: "Control group", text: "A control group is a group that is not given the treatment being tested. It is compared with the group that is given the treatment, to see if the treatment really made a difference." },
      { part: "Example experiment", text: "In an experiment testing whether music makes a plant grow faster, the independent variable is whether the plant hears music or not, and the dependent variable is how much the plant grows. Water, light and soil are kept the same as controlled variables, and a group of plants grown without music forms the control group for comparison." }
    ]
  },
  {
    id: 20,
    question: "What is the difference between accuracy and precision? Give an example of each.",
    markingScheme: ["Accuracy means how close a measurement is to the true value -- 1 mark", "Precision means how close repeated measurements are to each other -- 1 mark", "A measurement can be precise but not accurate: readings close together, but all off from the true value by a similar amount -- 1 mark", "A measurement can be accurate on average but not precise: readings scattered around the true value -- 1 mark", "Worked example: five readings of a pencil's length close to each other (14.2 to 14.3 cm) but a true length of 14.5 cm shows precise but not accurate measurement -- 1 mark"],
    answerParts: [
      { part: "Accuracy", text: "Accuracy means how close a measurement is to the actual, true value of the quantity being measured." },
      { part: "Precision", text: "Precision means how close repeated measurements of the same quantity are to each other, whether or not they are close to the true value." },
      { part: "Precise but not accurate", text: "A set of measurements can be precise but not accurate: the readings are close together, but all shifted away from the true value by a similar amount, perhaps due to a fault in the measuring tool." },
      { part: "Accurate but not precise", text: "A set of measurements can also be accurate on average but not precise: individual readings are scattered on either side of the true value, though their average is close to it." },
      { part: "Worked example", text: "A student measures the same pencil five times and gets 14.2, 14.2, 14.3, 14.2 and 14.2 cm, but the pencil's true length, checked with a standard scale, is 14.5 cm. The readings are close to each other, so they are precise, but they are all away from the true value, so they are not accurate." }
    ]
  },
  {
    id: 21,
    question: "Name the seven SI base units. Why do standard units matter internationally?",
    markingScheme: ["The metre for length, the kilogram for mass, and the second for time -- 1 mark", "The ampere for electric current, the kelvin for temperature, the mole for amount of substance, and the candela for luminous intensity -- 1 mark", "Standard units are based on agreed international standards, not on local objects or opinions -- 1 mark", "This lets scientific results be compared fairly across different countries, labs and experiments -- 1 mark", "Example: a kilogram of rice means the same amount everywhere, and standard units also ensure fairness in everyday trade -- 1 mark"],
    answerParts: [
      { part: "Three base units", text: "The seven SI base units include the metre for length, the kilogram for mass, and the second for time." },
      { part: "The other four base units", text: "The remaining base units are the ampere for electric current, the kelvin for temperature, the mole for the amount of substance, and the candela for luminous intensity." },
      { part: "Why standards matter", text: "These units are based on agreed international standards, not on local objects or local opinions, so a unit means exactly the same thing wherever it is used." },
      { part: "Comparing results fairly", text: "Because the units are standard, scientific results measured in one country or lab can be fairly compared with results measured anywhere else in the world." },
      { part: "Everyday example", text: "We expect a kilogram of rice to mean the same amount everywhere we buy it. Standard units allow scientific results to be compared, and also ensure fairness in daily life and trade." }
    ]
  },
  {
    id: 22,
    question: "What is order of magnitude? What is scientific notation? Explain dimensional analysis as a way to check a formula, using a worked example.",
    markingScheme: ["Order of magnitude: a quantity's size rounded to the nearest power of ten, useful for a quick sanity check -- 1 mark", "Scientific notation: writing a number as a value between 1 and 10 times a power of ten, for example the speed of light as 3 x 10^8 m/s -- 1 mark", "Worked example: 0.000056 m written in scientific notation is 5.6 x 10^-5 m, with an order of magnitude of 10^-5 -- 1 mark", "Dimensional analysis: checking that both sides of an equation have matching units -- 1 mark", "Worked example: speed = distance/time has units of metre per second; if a formula gives a different unit on one side, it is likely wrong -- 1 mark"],
    answerParts: [
      { part: "Order of magnitude", text: "The order of magnitude of a quantity is its size rounded to the nearest power of ten. It is a useful quick way to sanity-check whether an estimate or a calculated answer is roughly the right size." },
      { part: "Scientific notation", text: "Scientific notation writes a number as a value between 1 and 10 multiplied by a power of ten, for example the speed of light written as 3 x 10^8 metres per second." },
      { part: "Worked example of both", text: "The number 0.000056 m can be written in scientific notation as 5.6 x 10^-5 m. Its order of magnitude is 10^-5, telling us quickly how small the quantity is." },
      { part: "Dimensional analysis", text: "Dimensional analysis means checking that both sides of an equation have matching units. If they do not match, the formula cannot be correct as written." },
      { part: "Worked example of dimensional analysis", text: "The formula speed = distance / time has units of metre per second on both sides, since distance is in metres and time in seconds. If someone proposed a formula for speed that gave units of metre-seconds instead, dimensional analysis would immediately show the formula is wrong." }
    ]
  },
  {
    id: 23,
    question: "What are reproducibility and peer review? Why do they matter for trusting a scientific result?",
    markingScheme: ["Reproducibility: a result is trusted more when other people, in other places, get the same result by repeating the test -- 1 mark", "If a result cannot be reproduced by others, it is doubted, even if it seemed convincing at first -- 1 mark", "Peer review: other scientists check a piece of work before it is accepted and published -- 1 mark", "Peer review looks for errors, gaps or missing evidence in the work -- 1 mark", "Together, these two habits stop mistaken or false claims from being accepted as reliable science -- 1 mark"],
    answerParts: [
      { part: "Reproducibility", text: "Reproducibility means that a scientific result is trusted more when other people, working in other places, can repeat the same test and get a similar result." },
      { part: "Why reproducibility matters", text: "If a result cannot be reproduced by others, it is doubted, even if it seemed convincing when it was first reported, since it might have been due to an error or an unusual, one-off situation." },
      { part: "Peer review", text: "Peer review means that other scientists working in the same area check a piece of research before it is accepted and published." },
      { part: "What peer review looks for", text: "Peer reviewers look for errors in reasoning, gaps in the evidence, or claims that are not properly supported by the data presented." },
      { part: "Why both matter together", text: "Reproducibility and peer review together help stop mistaken or false claims from being accepted as reliable science, by making sure results are checked more than once and by more than one person." }
    ]
  },
  {
    id: 24,
    question: "What is a paradigm shift? Explain using one historical example.",
    markingScheme: ["A paradigm shift is a big change in scientific understanding that replaces an older, widely held idea -- 1 mark", "Historical example: the shift from an Earth-centred view of the solar system to a Sun-centred view -- 1 mark", "Or example: the discovery that germs, tiny living organisms, rather than bad air, cause many diseases -- 1 mark", "Such shifts happen when the old idea can no longer explain new evidence or more careful observations -- 1 mark", "The new idea is accepted only after being tested carefully and shown to explain the evidence better than the old one -- 1 mark"],
    answerParts: [
      { part: "What a paradigm shift is", text: "A paradigm shift is a big change in scientific understanding, where a widely held idea is replaced by a very different one that explains the evidence better." },
      { part: "Historical example: astronomy", text: "For a long time, people believed the Earth was the centre of the solar system, with the Sun and planets moving around it. Careful observation and mathematics eventually showed that the Sun is at the centre instead, with the Earth and other planets moving around it." },
      { part: "Another example: disease", text: "Another paradigm shift was the discovery that many diseases are caused by germs, tiny living organisms, rather than by 'bad air', as people had believed for a long time before." },
      { part: "Why the shift happens", text: "A paradigm shift happens when the older idea can no longer explain new evidence, or when more careful and precise observations reveal problems with it." },
      { part: "How the new idea is accepted", text: "The new idea is not simply accepted because it is different. It is accepted only after being carefully tested and shown to explain the evidence better than the idea it replaces." }
    ]
  },
  {
    id: 25,
    question: "What is the difference between correlation and causation? Explain with a simple everyday example. What are Occam's razor and falsifiability, and why does an idea need to be falsifiable to count as scientific?",
    markingScheme: ["Correlation: two things happening together, or changing together, without one necessarily causing the other -- 1 mark", "Causation: one thing actually causing the other to happen -- 1 mark", "Everyday example: ice cream sales and drowning rates rise together in summer, but ice cream does not cause drowning, both rise because of hot weather -- 1 mark", "Occam's razor: among explanations that fit the evidence equally well, the simplest one is usually preferred -- 1 mark", "Falsifiability: a scientific idea must be capable of being shown wrong by some possible observation; an idea that could never be tested or proven wrong is not truly scientific -- 1 mark"],
    answerParts: [
      { part: "Correlation", text: "Correlation means that two things happen together, or change together, without necessarily meaning that one causes the other." },
      { part: "Causation", text: "Causation means that one thing actually causes the other to happen, not merely that they occur at the same time." },
      { part: "Everyday example", text: "Ice cream sales and drowning rates both rise together in the summer. This does not mean eating ice cream causes drowning. Both actually rise because of the hot weather, which leads to more ice cream buying and more swimming at the same time." },
      { part: "Occam's razor", text: "Occam's razor is the idea that, among explanations that fit the evidence equally well, the simplest one is usually the one to prefer, rather than a more complicated explanation that is not actually needed." },
      { part: "Falsifiability", text: "Falsifiability means a scientific idea must be capable of being shown wrong by some possible observation or test. An idea that could never be tested or proven wrong under any circumstances is not considered truly scientific, no matter how reasonable it sounds." }
    ]
  }
];

// -- CASE-BASED QUESTIONS (4 marks each: 4 sub-questions of 1 mark) --
export const FOUNDATIONS9_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "Will the Six Clear the Boundary?",
    caseDescription: "A batter hits a ball high into the air during a match. Rohan says that only the mass of the ball, and the speed and direction it was hit in, decide whether it crosses the boundary. His friend argues that the colour of the ball and the brand of the bat must matter too.",
    subQuestions: [
      { question: "Which of these actually decides whether the ball clears the boundary?", options: ["The colour of the ball", "The mass, speed and direction of the hit", "The brand of the bat", "The amount of grass on the field"], correctIndex: 1, answer: "The mass, speed and direction of the hit", explanation: "For the question of whether the ball crosses the boundary, the mass of the ball and the speed and direction it is hit in matter a great deal, while the colour of the ball or the brand of the bat make no real difference." },
      { question: "What kind of simplified picture is Rohan using to think about the ball's flight?", answer: "A model.", explanation: "Rohan is building a model, a simplified picture that keeps only the details that matter for the question being asked." },
      { question: "Name one detail a simple model here can ignore, and one a more careful model could add back.", answer: "It can ignore the ball's colour or the bat's brand; a more careful model could add air resistance or the spin of the ball.", explanation: "Small effects like air resistance and spin are ignored in a simple model, but can be added back for greater accuracy." },
      { question: "Why is leaving out these small details not a mistake?", answer: "Because it is done on purpose, to keep the model simple while still answering the question of whether the ball clears the boundary.", explanation: "Leaving out details is a deliberate choice in building a model, not an error, as long as the model still answers the question being asked." }
    ]
  },
  {
    id: 2,
    caseTitle: "Planning the School Picnic",
    caseDescription: "A teacher checks a weather forecast for a picnic planned five days later. It says there is a fair chance of rain. A student points out that the forecast for tomorrow's cricket match, only one day away, seems much more certain.",
    subQuestions: [
      { question: "Why is the forecast for tomorrow more certain than the one for five days later?", options: ["Forecasts for near dates always use bigger instruments", "Small differences in today's conditions can grow larger over more time", "The weather changes only after five days", "Forecasts for five days away are never actually measured"], correctIndex: 1, answer: "Small differences in today's conditions can grow larger over more time", explanation: "Tiny differences in starting conditions can grow over time, making forecasts further into the future less certain." },
      { question: "Name two factors that weather forecasts depend on.", answer: "Any two of: temperature, pressure, humidity, wind.", explanation: "Weather depends on many changing factors such as temperature, pressure, humidity and wind." },
      { question: "Should the school treat the five-day forecast as a guarantee? Why or why not?", answer: "No, because forecasts further into the future are less certain.", explanation: "This uncertainty is a limit of the weather model being used, not a mistake by the forecaster." },
      { question: "What should the school do, given this uncertainty?", answer: "Keep checking the forecast closer to the day, and have a backup plan such as an indoor space.", explanation: "Since forecasts become more reliable closer to the day, checking again nearer the picnic date gives a more trustworthy answer." }
    ]
  },
  {
    id: 3,
    caseTitle: "A Viral Health Post",
    caseDescription: "A post shared widely online claims, 'Never drink water immediately after a meal, or your food will rot inside you.' Many students start believing it after seeing it shared again and again.",
    subQuestions: [
      { question: "What should be done before accepting such a claim?", options: ["Share it with more friends", "Check if there is measurable evidence and a real mechanism behind it", "Believe it, since many people shared it", "Ignore all advice about food completely"], correctIndex: 1, answer: "Check if there is measurable evidence and a real mechanism behind it", explanation: "A claim should be tested with measurable evidence and a real mechanism, not accepted just because it is popular." },
      { question: "What kind of question should be asked to test this claim scientifically?", answer: "Does drinking water actually change digestion in this way, and what physical or chemical process is being claimed?", explanation: "Good scientific questions look for a measurable process and evidence, not just a feeling that something sounds true." },
      { question: "Why is the fact that many people shared the post not good evidence?", answer: "The number of shares is not measurable evidence about the body; popularity does not make a claim true.", explanation: "How widely something is shared has nothing to do with whether it is actually true." },
      { question: "What kind of study could actually test this idea?", answer: "A fair test comparing digestion in a group who drink water after meals with a similar group who do not, under similar conditions.", explanation: "A fair test with comparable groups is needed to check whether the claim has any real basis." }
    ]
  },
  {
    id: 4,
    caseTitle: "Refuelling the Aircraft",
    caseDescription: "A ground crew calculates the fuel needed for a flight, but uses the density of fuel in pounds per litre instead of kilograms per litre. The flight actually needed 22300 kg of fuel in total.",
    subQuestions: [
      { question: "What error did the ground crew make?", options: ["They used the wrong aircraft", "They mixed up two different unit systems for density", "They added too much fuel", "They forgot to check the weather"], correctIndex: 1, answer: "They mixed up two different unit systems for density", explanation: "Using pounds per litre instead of kilograms per litre mixed up two different unit systems, leading to a serious miscalculation." },
      { question: "What happened as a result of this mistake?", answer: "The plane was about 15000 litres short of fuel and had to glide to an emergency landing.", explanation: "The unit mix-up meant far less fuel was loaded than the flight actually needed." },
      { question: "Why does using one standard (SI) unit system everywhere prevent such mistakes?", answer: "It avoids the need to convert between systems, which is where errors like this happen.", explanation: "When everyone uses the same standard units, there is no conversion step where a mistake can occur." },
      { question: "Name one other everyday situation where mixing up units could cause a problem.", answer: "Example: a recipe using cups in one country and grams in another, or a medicine dose given in milligrams instead of micrograms.", explanation: "Any situation involving two different unit systems carries the same risk of a costly mix-up." }
    ]
  },
  {
    id: 5,
    caseTitle: "Testing a New Medicine",
    caseDescription: "A doctor wants to check if a new tablet reduces fever faster than the usual treatment. She gives the tablet to one group of volunteers, and gives a similar-looking tablet with no medicine in it to another group, without telling them which group they are in.",
    subQuestions: [
      { question: "What is the group given the tablet with no medicine called?", options: ["The independent group", "The control group", "The dependent group", "The peer review group"], correctIndex: 1, answer: "The control group", explanation: "The group not given the real medicine is the control group, used for comparison with the treated group." },
      { question: "What is the independent variable in this test?", answer: "Whether a person receives the real medicine or not.", explanation: "The independent variable is the one deliberately changed by the doctor, in this case which tablet a person receives." },
      { question: "What is the dependent variable?", answer: "How quickly the fever comes down.", explanation: "The dependent variable is the one measured to see the effect, here the speed of fever reduction." },
      { question: "Why should other doctors be able to repeat this test and get similar results before it is fully trusted?", answer: "Because reproducibility, getting the same result when the test is repeated, is what makes a scientific result trustworthy.", explanation: "A result that can be reproduced by other doctors elsewhere is much more reliable than a single test." }
    ]
  },
  {
    id: 6,
    caseTitle: "Guessing the Jellybean Jar",
    caseDescription: "A jar full of jellybeans is kept at a school fair for a guessing contest. Priya estimates the volume of the jar and the rough size of one jellybean to work out a sensible guess, instead of picking a random number.",
    subQuestions: [
      { question: "What is Priya doing when she calculates a number this way, instead of guessing randomly?", options: ["Making an exact calculation", "Making a reasoned estimate", "Stating a law", "Forming a control group"], correctIndex: 1, answer: "Making a reasoned estimate", explanation: "Priya is using the sizes of the jar and a jellybean to make a reasoned estimate, rather than guessing at random." },
      { question: "Why is an approximate answer good enough here, rather than needing an exact count?", answer: "Because the goal is only to guess close to the real number, not to count every jellybean exactly.", explanation: "The purpose of the estimate is to be reasonably close, which is all a guessing contest needs." },
      { question: "Name one quantity Priya needs to find to make her estimate.", answer: "The volume of the jar, or the volume of one jellybean.", explanation: "Both quantities are needed together to estimate how many jellybeans fit inside the jar." },
      { question: "If her estimate is 340 and the real count is 360, has her method worked well?", answer: "Yes, because the estimate is reasonably close to the true value, even though it is not exact.", explanation: "An estimate does not need to be exact to be useful, only reasonably close to the true value." }
    ]
  },
  {
    id: 7,
    caseTitle: "How the Mask Really Works",
    caseDescription: "A mask factory wants to explain to its customers why their masks stop tiny particles. They mention fibres that attract particles, the size of viruses, and how air flows through the material.",
    subQuestions: [
      { question: "Explaining how the mask works needs ideas from which combination of branches?", options: ["Only physics", "Only chemistry", "Physics, chemistry, biology and mathematics together", "Only biology"], correctIndex: 2, answer: "Physics, chemistry, biology and mathematics together", explanation: "A mask's working needs physics for particle motion, chemistry for the fibres, biology for viruses, and mathematics for airflow modelling." },
      { question: "Which branch explains how particles move in air and are pulled towards the mask's fibres?", answer: "Physics.", explanation: "Physics explains particle motion and electrostatic attraction towards the fibres." },
      { question: "Which branch explains the properties of the polymer fibres used in the mask?", answer: "Chemistry.", explanation: "Chemistry explains the properties of the polymer fibres the mask is made from." },
      { question: "Which branch explains the size and behaviour of the viruses the mask should stop?", answer: "Biology.", explanation: "Biology explains the size and behaviour of the viruses the mask is designed to block." }
    ]
  },
  {
    id: 8,
    caseTitle: "Plants Under Different Light",
    caseDescription: "For a science fair, Aakash grows three identical plants. One gets red light, one gets blue light, and one gets ordinary daylight. He gives all three the same water, soil and pot size, and measures their height every week.",
    subQuestions: [
      { question: "What is the independent variable in this project?", options: ["The height of the plant", "The colour of light given to each plant", "The amount of water given", "The size of the pot"], correctIndex: 1, answer: "The colour of light given to each plant", explanation: "The colour of light is the variable Aakash deliberately changes between the three plants." },
      { question: "What is the dependent variable?", answer: "The height of the plant, measured each week.", explanation: "The plant's growth in height is what is measured to see the effect of the light colour." },
      { question: "Name two controlled variables in this project.", answer: "Any two of: the amount of water, the soil, and the pot size.", explanation: "These are kept the same on purpose so only light colour can explain any difference in growth." },
      { question: "Why does Aakash keep the water, soil and pot the same for all three plants?", answer: "So that only the colour of light can explain any difference in growth, making it a fair test.", explanation: "Keeping other conditions constant isolates the effect of the one variable being tested." }
    ]
  },
  {
    id: 9,
    caseTitle: "Shopping for a Month",
    caseDescription: "A family wants to buy enough rice to last the whole month. They do not weigh out an exact number of grains, but instead make a rough calculation based on how much an adult typically eats in a day.",
    subQuestions: [
      { question: "What kind of answer does the family need here?", options: ["An exact count of grains", "A reasonable estimate, not an exact number", "No calculation at all", "A control group"], correctIndex: 1, answer: "A reasonable estimate, not an exact number", explanation: "A sensible approximate amount is all that is needed to plan a month's shopping." },
      { question: "Why is an estimate good enough for this shopping decision?", answer: "Because they only need to check that they are buying a sensible amount, not the exact amount that will be used up.", explanation: "The goal is a reasonable amount, not an exact number of grains." },
      { question: "What quantity would they first need to know to make this estimate?", answer: "How many kilocalories rice gives per 100 g when cooked, or how much an adult needs to eat per day.", explanation: "These quantities let the family scale up a daily amount to a monthly one." },
      { question: "If their estimate suggests 100 g for the whole month, should they trust it?", answer: "No, because that is clearly too little; the estimate should at least feel like a sensible amount before they buy.", explanation: "Checking that an estimate feels reasonable is part of using it properly." }
    ]
  },
  {
    id: 10,
    caseTitle: "Ice Cream and Drownings",
    caseDescription: "A news report says that places where ice cream sales are higher also have more drowning cases, and suggests that ice cream might be somehow dangerous. A student questions this claim.",
    subQuestions: [
      { question: "What kind of relationship is being described between ice cream sales and drowning?", options: ["Causation, one causes the other", "Correlation, they happen together", "A scientific law", "A control group result"], correctIndex: 1, answer: "Correlation, they happen together", explanation: "The two things rise together, which is correlation, not proof that one causes the other." },
      { question: "What is a more likely explanation for both rising together?", answer: "Hot weather: more people buy ice cream and more people go swimming in hot weather, so both numbers rise together.", explanation: "A shared cause, hot weather, explains both rising together without one causing the other." },
      { question: "Why is it wrong to say ice cream causes drowning just from this data?", answer: "Because correlation, two things happening together, does not prove causation, one thing causing the other.", explanation: "Data showing two things rising together is not enough to prove that one causes the other." },
      { question: "What further test could check if there is a real cause-and-effect link?", answer: "Checking whether drownings still rise in hot places with low ice cream sales, or comparing swimming activity directly with drowning rates.", explanation: "Testing the claim against other data helps show whether ice cream itself really matters." }
    ]
  },
  {
    id: 11,
    caseTitle: "Testing an Old Belief",
    caseDescription: "For centuries, people believed that comets were omens of bad luck. Modern astronomers use telescopes and physics to study comets as balls of ice and dust following predictable paths.",
    subQuestions: [
      { question: "What allowed scientists to test the old belief about comets?", options: ["Guessing without evidence", "Modern instruments and careful, repeated observation", "Ignoring the old belief completely without checking it", "Asking more people to believe it"], correctIndex: 1, answer: "Modern instruments and careful, repeated observation", explanation: "Telescopes and careful observation let scientists actually test the old belief rather than simply accept or reject it." },
      { question: "What did careful observation show about comets instead?", answer: "That comets are balls of ice and dust that follow predictable paths, explained by physics.", explanation: "Observation and physics explained comets as natural objects with predictable motion, not omens." },
      { question: "Why is it fair to say science replaced the old belief only because of evidence, not opinion?", answer: "Because the new explanation was accepted after testing and observation, not because someone simply disagreed with the old idea.", explanation: "Evidence, not personal opinion, is what changed the accepted explanation." },
      { question: "Does this mean old beliefs are always wrong? Explain briefly.", answer: "Not always, but every belief, old or new, should be checked against evidence rather than accepted without question.", explanation: "The key point is testing beliefs against evidence, not assuming old ideas are automatically wrong." }
    ]
  },
  {
    id: 12,
    caseTitle: "The Homemade Thermometer",
    caseDescription: "A group of students builds a simple thermometer using a bottle, water and a straw. They compare its readings with a standard laboratory thermometer several times, on the same objects.",
    subQuestions: [
      { question: "Why do they compare their homemade thermometer with a standard one?", options: ["To make the homemade one look nicer", "To check how accurate their readings are compared to a trusted standard", "Because the standard thermometer is heavier", "To avoid using any units at all"], correctIndex: 1, answer: "To check how accurate their readings are compared to a trusted standard", explanation: "Comparing with a standard instrument checks the accuracy of the homemade one." },
      { question: "If their homemade thermometer gives the same reading every time on the same object, but that reading is off from the standard, is it precise, accurate, both or neither?", answer: "Precise but not accurate.", explanation: "Repeatable readings show precision, but being consistently off from the true value means it is not accurate." },
      { question: "Why do standard units and instruments matter for such comparisons?", answer: "Because they are based on agreed international standards, so results can be trusted and compared fairly.", explanation: "Standard instruments give a trustworthy reference point for checking other measuring devices." },
      { question: "How could the students improve their homemade thermometer?", answer: "By marking it using the readings of the standard thermometer as a reference, adjusting for the difference they measured.", explanation: "Calibrating against a known standard is how a rough instrument can be made more accurate." }
    ]
  },
  {
    id: 13,
    caseTitle: "A New View of the Solar System",
    caseDescription: "For a long time, people believed the Earth was the centre of the solar system, and that the Sun moved around it. Careful observation and mathematics eventually showed that the Sun was at the centre, with the Earth moving around it.",
    subQuestions: [
      { question: "What is this kind of major change in scientific understanding called?", options: ["A law", "An estimate", "A paradigm shift", "A control group"], correctIndex: 2, answer: "A paradigm shift", explanation: "A big change replacing a widely held scientific idea with a very different one is called a paradigm shift." },
      { question: "Why did the old Earth-centred belief get replaced?", answer: "Because careful observations and mathematics did not fit it well, and fit a Sun-centred model much better.", explanation: "The old idea could not explain the evidence as well as the new model could." },
      { question: "Does a paradigm shift happen just because someone disagrees with the old idea?", answer: "No, it happens only when evidence and testing show the new idea explains observations better.", explanation: "A paradigm shift is driven by evidence, not simple disagreement." },
      { question: "Why does this show that no scientific idea is completely final?", answer: "Because even a widely believed idea, held for a long time, was changed once better evidence became available.", explanation: "This history shows that even long-accepted ideas can be revised when evidence demands it." }
    ]
  },
  {
    id: 14,
    caseTitle: "The Water Purifier's Claim",
    caseDescription: "A company advertises that its water purifier 'removes 99.9 percent of germs.' A customer wants to know whether this claim can actually be trusted.",
    subQuestions: [
      { question: "What would best support this company's claim?", options: ["A famous person using the purifier in an advertisement", "Independent, repeatable tests measuring germs before and after purification", "The purifier looking modern and expensive", "The company simply repeating the claim often"], correctIndex: 1, answer: "Independent, repeatable tests measuring germs before and after purification", explanation: "Actual measurements from independent, repeatable tests are real evidence for the claim." },
      { question: "Why should such tests ideally be checked by other scientists as well?", answer: "Because peer review helps catch errors or gaps before a claim is fully accepted.", explanation: "Peer review is an extra check that catches mistakes the original testers may have missed." },
      { question: "Why does reproducibility matter here?", answer: "If other labs test the same purifier and get similar results, the claim becomes more trustworthy.", explanation: "A claim confirmed by more than one lab is far more reliable than a single test." },
      { question: "Is an advertisement alone, without any test data, good evidence for a scientific claim?", answer: "No, because it is not measurable evidence, just a statement.", explanation: "An advertisement by itself provides no measurable proof, however confidently it is stated." }
    ]
  },
  {
    id: 15,
    caseTitle: "Converting Between Systems",
    caseDescription: "A student reading a foreign recipe finds ingredient amounts given in pounds and ounces, but the kitchen scale at home only measures in grams and kilograms.",
    subQuestions: [
      { question: "Why does the student need to convert the units carefully?", options: ["Pounds and grams measure completely different things", "A wrong conversion can give the wrong amount of an ingredient, just like the airplane fuel mix-up", "Units never actually need to be converted", "Grams are not a standard unit"], correctIndex: 1, answer: "A wrong conversion can give the wrong amount of an ingredient, just like the airplane fuel mix-up", explanation: "A careless unit conversion can lead to a serious error, the same way the airplane fuel mix-up happened." },
      { question: "What could go wrong if the student mixes up the two systems without converting properly?", answer: "The recipe could use much more or much less of an ingredient than intended, similar to the airplane running short of fuel.", explanation: "An unconverted or wrongly converted amount changes the whole recipe, just as it changed the amount of fuel loaded onto the plane." },
      { question: "Why do standard international units help avoid such problems in general?", answer: "Because everyone using the same system does not need to convert at all, removing the chance of a conversion mistake.", explanation: "A single shared standard removes the conversion step where errors usually happen." },
      { question: "Name one other everyday place where a wrong unit conversion could be risky.", answer: "Example: giving a wrong dose of medicine, or a wrong measurement in building or construction work.", explanation: "Any situation mixing two unit systems carries a similar risk of a costly mistake." }
    ]
  },
  {
    id: 16,
    caseTitle: "Building a Solar Cooker",
    caseDescription: "A group of students builds a solar cooker using a box, foil and glass, to cook rice using only sunlight. They need to explain how heat builds up inside it, how the food changes as it cooks, and how to keep the cooker safe to use.",
    subQuestions: [
      { question: "Explaining how a solar cooker heats and cooks food needs ideas from", options: ["Only mathematics", "Physics, chemistry and biology together", "Only art", "No branch of science at all"], correctIndex: 1, answer: "Physics, chemistry and biology together", explanation: "Heating, cooking and safety together need physics, chemistry and biology working together." },
      { question: "Which branch explains how sunlight is trapped and turned into heat inside the box?", answer: "Physics.", explanation: "Physics explains how light energy is captured and converted into heat inside the cooker." },
      { question: "Which branch explains the chemical changes that happen in rice as it cooks?", answer: "Chemistry.", explanation: "Chemistry explains the changes that occur in rice as heat cooks it." },
      { question: "Which branch would help think about food safety, such as germs being killed by heat?", answer: "Biology.", explanation: "Biology explains how heat affects living organisms such as germs in the food." }
    ]
  },
  {
    id: 17,
    caseTitle: "Music and Plant Growth",
    caseDescription: "A student plays music near one plant every day and claims it grows faster than plants elsewhere in the house. She has not kept any similar plant without music, grown under the same water and light, to compare with it.",
    subQuestions: [
      { question: "What is missing from this experiment?", options: ["A dependent variable", "A control group", "A plant", "Water"], correctIndex: 1, answer: "A control group", explanation: "There is no similar plant grown without music under the same conditions to compare against." },
      { question: "Why is a control group needed to trust this claim?", answer: "Without a similar plant grown without music under the same conditions, we cannot tell if music, or something else like light or water, caused the faster growth.", explanation: "A control group isolates the effect of music from other possible causes." },
      { question: "How could the student fix her experiment?", answer: "She should grow an identical plant with the same water, light and soil, but without music, and compare the growth of both.", explanation: "Adding a proper control group would make the comparison fair." },
      { question: "In the fixed experiment, what would be the independent variable and what would be the dependent variable?", answer: "Independent variable: whether the plant hears music or not. Dependent variable: how much the plant grows.", explanation: "The variable deliberately changed is music or no music; the one measured is the amount of growth." }
    ]
  },
  {
    id: 18,
    caseTitle: "The Lucky Ritual",
    caseDescription: "A cricket coach believes a player performs better whenever he wears a particular pair of socks. A scientist on the team suggests testing this belief properly instead of simply assuming it is true.",
    subQuestions: [
      { question: "What would be the best way to test whether the socks really affect performance?", options: ["Just believe the coach because he has more experience", "Compare the player's performance with and without the socks over many matches, under similar conditions", "Never test it since it is only a belief", "Ask other players what they personally think"], correctIndex: 1, answer: "Compare the player's performance with and without the socks over many matches, under similar conditions", explanation: "A fair comparison across many matches, not just one, is needed to test the belief properly." },
      { question: "Why is a single good performance while wearing the socks not enough evidence?", answer: "Because one result could be a coincidence; a fair test needs many trials and comparison, not one example.", explanation: "A single instance cannot rule out coincidence, so more trials are needed." },
      { question: "What might really be causing the improved performance, other than the socks?", answer: "The player's own confidence or mental state, or other changing conditions on those match days.", explanation: "Other factors besides the socks could explain the pattern seen." },
      { question: "How does this situation show the difference between correlation and causation?", answer: "Good performance and wearing the socks might happen together (correlation) without the socks actually causing the good performance (causation).", explanation: "The socks and good performance being linked in a few matches does not prove the socks caused it." }
    ]
  },
  {
    id: 19,
    caseTitle: "Why the Old Theory Changed",
    caseDescription: "A science magazine explains how the old idea that diseases were caused by 'bad air' was replaced once scientists observed that tiny living organisms cause many illnesses.",
    subQuestions: [
      { question: "Why was the 'bad air' theory replaced?", options: ["Because it was an old idea, and old ideas are always wrong", "Because careful observation showed germs, not bad air, caused the diseases", "Because scientists simply voted on it", "Because the theory was a law, not a theory"], correctIndex: 1, answer: "Because careful observation showed germs, not bad air, caused the diseases", explanation: "Evidence from careful observation, not a vote or opinion, replaced the old theory." },
      { question: "What kind of change in scientific understanding does this replacement represent?", answer: "A paradigm shift.", explanation: "Replacing a widely held explanation with a very different one is called a paradigm shift." },
      { question: "Why does this show that a theory is not the same as a fixed fact?", answer: "Because even a theory that was widely accepted was changed once better evidence became available; theories stay open to revision.", explanation: "Theories can be revised or replaced, unlike something treated as permanently fixed." },
      { question: "What does this history teach about accepting old, unquestioned ideas?", answer: "That even long-held ideas should be tested, since evidence can show they need to be changed or replaced.", explanation: "The history of this theory shows the value of testing ideas rather than accepting them without question." }
    ]
  },
  {
    id: 20,
    caseTitle: "Modelling the Water Cycle",
    caseDescription: "For a project, a student makes a simple diagram of the water cycle showing evaporation, condensation and rainfall. She decides not to include the detailed chemistry of water molecules or the effect of ocean currents.",
    subQuestions: [
      { question: "What is the student doing by choosing what to include and what to leave out?", options: ["Making a mistake in her project", "Building a model of the water cycle", "Ignoring science completely", "Copying an already exact system"], correctIndex: 1, answer: "Building a model of the water cycle", explanation: "Choosing what to keep and what to leave out is exactly how a model is built." },
      { question: "Why is it reasonable for her to leave out ocean currents and detailed molecular chemistry?", answer: "Because her question is about the basic cycle of evaporation, condensation and rainfall, and these details are not needed to answer that question.", explanation: "A model only needs to keep what matters for the question it is meant to answer." },
      { question: "What key steps does she keep in her simple model?", answer: "Evaporation, condensation and rainfall (precipitation).", explanation: "These are the essential steps of the basic water cycle her model is meant to show." },
      { question: "If she later wanted a more detailed model, what could she add?", answer: "Details such as ocean currents, temperature effects on evaporation rate, or the role of plants (transpiration).", explanation: "A more detailed model can add back the finer details left out of the simple version." }
    ]
  }
];
