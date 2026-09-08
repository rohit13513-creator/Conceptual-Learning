// Class 8 Science -- Chapter: Exploring the Investigative World of Science (what science is,
// observation vs inference, hypotheses and predictions, fair testing and variables, the cycle
// of scientific inquiry, recording and communicating results, tools and safety, teamwork and
// chance discoveries). This chapter is conceptual/reasoning-based rather than numeric, so every
// answer below states the REASON behind it, not just the conclusion.
import type {
  QuizQuestion,
  NCERTSolvedQuestion,
  ShortQuestion,
  LongQuestion,
  CompetencyQuestion,
} from "../types-custom";

// ── SOLVED PRACTICE QUESTIONS (one per major idea taught in the chapter) ──
export const SCIENCE8_SOLVED_QUESTIONS: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Practice Q1",
    question: "Explain, with an example, why science is described as a 'process' rather than just a collection of facts.",
    given: { "Concept": "Nature of science" },
    formulaUsed: "Science is a systematic process of observing, questioning, and testing ideas against evidence.",
    derivationSteps: [
      "Facts (like 'water boils at 100 degrees Celsius at sea level') are the OUTPUT of scientific work.",
      "The real subject of science is HOW that fact was found -- through careful observation and repeated testing.",
      "Example: early investigators observed water changing to steam, questioned at what temperature this happens, tested it repeatedly under controlled conditions, and only then accepted the fact.",
      "This shows the fact itself came from a process of inquiry, not from simply being told or assumed."
    ],
    finalAnswer: "Science is a process because every fact it produces comes from a chain of observation, questioning, and fair testing -- the process is what makes the fact trustworthy.",
    conceptualTip: "Whenever asked 'why is science a process', always point to the STEPS that produced the fact, not just the fact itself."
  },
  {
    id: 2,
    questionNumber: "Practice Q2",
    question: "A student says, 'The sky looks orange this evening.' Later, the same student says, 'The sky looks orange because of dust particles scattering the light.' Identify which statement is an observation and which is an inference, with reasons.",
    given: { "Statement 1": "The sky looks orange this evening", "Statement 2": "It is orange because of dust particles scattering light" },
    formulaUsed: "Observation = directly sensed; Inference = explanation added using reasoning.",
    derivationSteps: [
      "Statement 1 describes exactly what was seen, with no explanation attached -- this matches the definition of an observation.",
      "Statement 2 offers a REASON for why the sky looks that way -- this goes beyond what was directly seen and uses reasoning, matching the definition of an inference.",
      "The inference (dust particles) is a plausible explanation but would still need further checking to be confirmed."
    ],
    finalAnswer: "Statement 1 is an observation. Statement 2 is an inference.",
    conceptualTip: "A quick test: if a sentence explains WHY or HOW, it is almost always an inference, not a plain observation."
  },
  {
    id: 3,
    questionNumber: "Practice Q3",
    question: "Convert the question 'Does the type of soil affect how fast a seed sprouts?' into a hypothesis and then into a testable prediction.",
    given: { "Scientific question": "Does soil type affect sprouting speed?" },
    formulaUsed: "Hypothesis: a testable, proposed explanation. Prediction: a specific 'if...then...' expected result.",
    derivationSteps: [
      "First, propose an explanation (hypothesis): 'Sandy soil allows seeds to sprout faster than clay soil, because sandy soil drains water more quickly.'",
      "Then turn it into a specific, testable prediction: 'If sandy soil allows faster sprouting, then seeds planted in sandy soil should sprout in fewer days than identical seeds planted in clay soil, with water and sunlight kept the same.'"
    ],
    finalAnswer: "Hypothesis: sandy soil leads to faster sprouting due to better drainage. Prediction: seeds in sandy soil will sprout sooner than identical seeds in clay soil, all else being equal.",
    conceptualTip: "A hypothesis explains WHY; a prediction states exactly WHAT should be observed if that explanation is correct."
  },
  {
    id: 4,
    questionNumber: "Practice Q4",
    question: "In an experiment testing whether the amount of water affects bean plant growth, identify the independent variable, the dependent variable, and two controlled variables.",
    given: { "Experiment": "Effect of water amount on bean plant growth" },
    formulaUsed: "Independent variable: deliberately changed. Dependent variable: measured outcome. Controlled variables: kept identical.",
    derivationSteps: [
      "The factor being deliberately changed by the investigator is the amount of water -- this is the independent variable.",
      "The factor being measured to see the effect is the plant's growth (for example, height after two weeks) -- this is the dependent variable.",
      "Factors that must be kept the same across all plants being compared include: the type of seed used, the type and amount of soil, the size of the pot, and the amount of sunlight received."
    ],
    finalAnswer: "Independent variable: amount of water. Dependent variable: plant growth (height). Controlled variables: seed type, soil type/amount, pot size, sunlight (any two of these).",
    conceptualTip: "Always ask first: 'What is being deliberately changed?' -- that answer is always the independent variable."
  },
  {
    id: 5,
    questionNumber: "Practice Q5",
    question: "Arrange the following into the correct order of the cycle of scientific inquiry, and briefly explain each stage: Conclusion, Observation, Experiment, Hypothesis, Analysis, Question.",
    given: { "Stages (unordered)": "Conclusion, Observation, Experiment, Hypothesis, Analysis, Question" },
    formulaUsed: "The six-stage cycle: Observation, Question, Hypothesis, Experiment, Analysis, Conclusion.",
    derivationSteps: [
      "Observation: noticing something interesting or unexplained.",
      "Question: turning the observation into a clear, testable question.",
      "Hypothesis: proposing a testable explanation for the observation.",
      "Experiment: carrying out a fair test of the hypothesis.",
      "Analysis: studying the results carefully.",
      "Conclusion: deciding whether the evidence supports the hypothesis, and sharing the finding."
    ],
    finalAnswer: "Correct order: Observation, Question, Hypothesis, Experiment, Analysis, Conclusion.",
    conceptualTip: "Remember this is a CYCLE -- a conclusion can lead straight back into a fresh observation and question."
  },
  {
    id: 6,
    questionNumber: "Practice Q6",
    question: "A student records only the trials of an experiment that matched their expected result, and leaves out the trials that did not. Explain what is wrong with this, and what should have been done instead.",
    given: { "Situation": "Selective recording of results" },
    formulaUsed: "All genuine results must be recorded honestly, whether expected or not.",
    derivationSteps: [
      "Leaving out inconvenient results is a form of dishonest reporting, sometimes called observer bias.",
      "This gives a false, one-sided picture of the evidence, and can hide a genuinely important finding.",
      "The correct approach is to record and report every trial's result exactly as observed, expected or not."
    ],
    finalAnswer: "This is dishonest reporting (observer bias). Every result should be recorded and shared honestly, regardless of whether it matches expectations.",
    conceptualTip: "Unexpected results are often exactly where new discoveries come from -- never discard them."
  },
  {
    id: 7,
    questionNumber: "Practice Q7",
    question: "Name the correct measuring tool for each of the following, and explain your choice: (a) the time taken for an ice cube to melt, (b) the mass of a small stone, (c) the volume of a liquid.",
    given: { "Quantities to measure": "time, mass, volume" },
    formulaUsed: "Each measuring tool is designed for one specific kind of quantity.",
    derivationSteps: [
      "(a) Time is measured using a stopwatch, since it precisely tracks elapsed seconds/minutes.",
      "(b) Mass is measured using a weighing balance, since it gives an exact reading in grams.",
      "(c) Volume of a liquid is measured using a measuring cylinder, since it is marked in millilitres."
    ],
    finalAnswer: "(a) Stopwatch, (b) Weighing balance, (c) Measuring cylinder.",
    conceptualTip: "Always match the tool to the exact quantity being measured -- using the wrong tool cannot give a meaningful reading."
  },
  {
    id: 8,
    questionNumber: "Practice Q8",
    question: "Explain why 'the water felt warm' is a weaker piece of data than 'the water was 42°C', giving a reason.",
    given: { "Two descriptions of the same water": "'felt warm' vs '42°C'" },
    formulaUsed: "A precise, standard measurement can be compared exactly; a sense-based description cannot.",
    derivationSteps: [
      "'Felt warm' depends on the person describing it -- what feels warm to one person may feel only mild to another.",
      "'42°C' is an exact number in a standard unit that means the same thing to everyone who reads it, anywhere.",
      "This makes the numeric measurement far more useful for comparing results or repeating the investigation."
    ],
    finalAnswer: "'42°C' is stronger data because it is a precise, standard measurement, while 'felt warm' is a vague, person-dependent impression.",
    conceptualTip: "Whenever possible, prefer a numeric measurement in a standard unit over a sense-based description."
  },
  {
    id: 9,
    questionNumber: "Practice Q9",
    question: "A researcher accidentally notices something unusual while working on a completely different problem, and this accidental observation eventually leads to an important discovery. Explain why this still required scientific investigation, not just luck.",
    given: { "Situation": "An accidental (chance) observation" },
    formulaUsed: "Chance favours the prepared mind -- an accident is only useful when properly investigated afterwards.",
    derivationSteps: [
      "Noticing the accident is only the very first step -- it is essentially an observation, the same starting point as any investigation.",
      "The researcher still had to ask a clear question about what they noticed, form a hypothesis, and test it fairly before it counted as a genuine discovery.",
      "Without this follow-up investigation, the accidental observation alone would remain just an unexplained curiosity, not an accepted finding."
    ],
    finalAnswer: "The accident only provided the starting observation; it still needed the full process of questioning, hypothesis-forming, and testing before becoming a genuine discovery.",
    conceptualTip: "Chance discoveries are real, but they still have to pass through the same process as any other investigation to be accepted."
  },
  {
    id: 10,
    questionNumber: "Practice Q10",
    question: "Two towns are compared: the town with more ice cream shops also has more cases of sunburn. Explain why it would be wrong to conclude that ice cream shops cause sunburn.",
    given: { "Observed pattern": "More ice cream shops correlate with more sunburn cases" },
    formulaUsed: "Correlation (two things changing together) does not prove causation (one thing causing the other).",
    derivationSteps: [
      "Both ice cream shop numbers and sunburn cases could be caused by a third factor: hot, sunny weather.",
      "Hot weather leads to more people buying ice cream AND more people being outside in the sun (causing sunburn).",
      "No fair test has actually been done to show that ice cream shops themselves cause sunburn -- the two are only correlated, not proven to be linked by cause and effect."
    ],
    finalAnswer: "This is a case of correlation without causation -- both patterns are likely caused by a third factor (hot weather), not by one causing the other.",
    conceptualTip: "Whenever two things rise or fall together, always ask whether a hidden third factor could be causing both."
  },
];

// ── MCQs (1 mark each) ──
export const SCIENCE8_MCQS: QuizQuestion[] = [
  { id: 1, question: "Science is best described as:", options: ["A fixed list of facts to memorise", "A systematic process of observing, questioning, and testing ideas", "A collection of opinions about nature", "A set of rules that never change"], correctAnswer: 1, explanation: "Science is a PROCESS -- facts are its output, but the real subject is careful observation, questioning, and fair testing." },
  { id: 2, question: "What is the very first step that usually starts a scientific investigation?", options: ["Writing a conclusion", "Curiosity or an observation", "Buying laboratory equipment", "Publishing a report"], correctAnswer: 1, explanation: "Investigations begin when someone notices something (an observation) and becomes curious about it." },
  { id: 3, question: "Why is evidence important in science?", options: ["It makes an idea sound more impressive", "It allows an idea to be checked by anyone", "It is required by law", "It is not actually important"], correctAnswer: 1, explanation: "Evidence lets any investigator check whether an idea is true, which is what separates science from personal opinion." },
  { id: 4, question: "Which statement best shows that science is 'self-correcting'?", options: ["Old scientific ideas are never questioned", "An idea is changed when new evidence contradicts it", "Scientists always agree with each other", "Facts in science can never change"], correctAnswer: 1, explanation: "Science updates its ideas when new evidence appears -- this is a strength, showing it is self-correcting." },
  { id: 5, question: "'The plant's leaves are drooping.' This statement is an example of:", options: ["An inference", "An observation", "A hypothesis", "A prediction"], correctAnswer: 1, explanation: "This directly describes what was seen, with no explanation added, making it an observation." },
  { id: 6, question: "'The plant's leaves are drooping because it needs water.' This statement is an example of:", options: ["An observation", "An inference", "A controlled variable", "A tool"], correctAnswer: 1, explanation: "This adds a reasoned explanation ('because it needs water') on top of the observation, making it an inference." },
  { id: 7, question: "Which of these best describes an inference?", options: ["Information sensed directly", "An explanation built using reasoning on top of an observation", "A number obtained from an instrument", "A safety rule"], correctAnswer: 1, explanation: "An inference goes beyond what is directly sensed, adding reasoning or explanation." },
  { id: 8, question: "A single observation can lead to:", options: ["Exactly one possible inference", "More than one possible inference", "No inference at all", "A different observation"], correctAnswer: 1, explanation: "The same observation (like wet ground) can have several different possible explanations (rain, a leak, washing)." },
  { id: 9, question: "A scientific question must be:", options: ["Based only on personal opinion", "Answerable by observation or experiment", "Impossible to test", "About taste or preference"], correctAnswer: 1, explanation: "A scientific question can be investigated and answered using observation or experiment, unlike a matter of pure opinion." },
  { id: 10, question: "A hypothesis is best defined as:", options: ["A proven fact", "A random, unexplained guess", "A testable, proposed explanation made before testing", "The final result of an experiment"], correctAnswer: 2, explanation: "A hypothesis is an informed, testable explanation proposed before the experiment is carried out." },
  { id: 11, question: "A prediction in a scientific investigation is:", options: ["The same thing as a hypothesis", "A specific statement of what should happen if the hypothesis is true", "A safety rule", "An untestable opinion"], correctAnswer: 1, explanation: "A prediction is more specific than a hypothesis -- it states exactly what result is expected." },
  { id: 12, question: "If a test result does not match the prediction, what should happen?", options: ["The data should be changed to match the prediction", "The hypothesis should be reconsidered or rejected", "The experiment should be hidden", "Nothing, since predictions are always right"], correctAnswer: 1, explanation: "An unmatched prediction means the hypothesis is not supported and should be reconsidered -- this is a normal part of science." },
  { id: 13, question: "In an experiment, the variable that the investigator deliberately changes is called the:", options: ["Dependent variable", "Controlled variable", "Independent variable", "Constant"], correctAnswer: 2, explanation: "The independent variable is the one factor the investigator chooses to change on purpose." },
  { id: 14, question: "In an experiment, the variable that is measured as the outcome is called the:", options: ["Independent variable", "Dependent variable", "Controlled variable", "Hypothesis"], correctAnswer: 1, explanation: "The dependent variable is measured to see whether it was affected by the independent variable." },
  { id: 15, question: "Variables that must be kept the same throughout an experiment are called:", options: ["Independent variables", "Dependent variables", "Controlled variables", "Random variables"], correctAnswer: 2, explanation: "Controlled variables are kept identical so they cannot influence the result." },
  { id: 16, question: "A 'fair test' is an experiment in which:", options: ["Every variable is changed at once", "Only the independent variable is changed, and all else is kept the same", "No variables are measured", "The result is decided in advance"], correctAnswer: 1, explanation: "A fair test changes only one variable (the independent variable) while keeping all controlled variables the same." },
  { id: 17, question: "A student changes both the amount of sunlight AND the amount of water given to plants, then compares their growth. This is:", options: ["A fair test", "Not a fair test, since two variables changed at once", "An observation", "A hypothesis"], correctAnswer: 1, explanation: "Changing two variables at once makes it impossible to tell which one caused any difference in growth." },
  { id: 18, question: "What is the purpose of a control group in an experiment?", options: ["To make the experiment take longer", "To provide a baseline for comparison", "To replace the need for measurements", "To confuse other investigators"], correctAnswer: 1, explanation: "A control group shows what happens without the special treatment, so the effect of the treatment can be judged by comparison." },
  { id: 19, question: "Why does testing many samples (instead of just one) make a conclusion more reliable?", options: ["It takes less time", "It reduces the effect of any single unusual case", "It removes the need for a hypothesis", "It is required by law"], correctAnswer: 1, explanation: "A single sample could behave unusually by chance; testing many reduces this risk and reveals the true overall pattern." },
  { id: 20, question: "Which of the following is the correct order of the cycle of scientific inquiry?", options: ["Hypothesis, Observation, Question, Experiment, Conclusion, Analysis", "Observation, Question, Hypothesis, Experiment, Analysis, Conclusion", "Conclusion, Experiment, Question, Observation, Hypothesis, Analysis", "Experiment, Hypothesis, Observation, Question, Conclusion, Analysis"], correctAnswer: 1, explanation: "The standard order is Observation, Question, Hypothesis, Experiment, Analysis, Conclusion." },
  { id: 21, question: "Why is the cycle of scientific inquiry described as a 'cycle' rather than a straight line?", options: ["Because it always takes exactly six days", "Because a conclusion can lead to a brand new question, restarting the process", "Because scientists repeat the same experiment forever", "Because it has no real order at all"], correctAnswer: 1, explanation: "A conclusion often raises new questions, sending the process back to an earlier stage -- hence 'cycle'." },
  { id: 22, question: "Should a scientific conclusion be treated as permanently final?", options: ["Yes, once made it can never change", "No, it can be revised if new evidence appears", "Only if a teacher agrees", "Conclusions are never based on evidence"], correctAnswer: 1, explanation: "Conclusions are the best explanation based on CURRENT evidence and can be revised later." },
  { id: 23, question: "Why should observations be recorded immediately during an investigation?", options: ["To save paper", "Because memory can be inaccurate later", "Because it is required for decoration", "It does not matter when they are recorded"], correctAnswer: 1, explanation: "Recording immediately avoids errors caused by forgetting or misremembering details afterward." },
  { id: 24, question: "A student gets an unexpected result and considers leaving it out of the report. What should they do?", options: ["Leave it out, since it does not match expectations", "Report it honestly along with all other results", "Change the number slightly", "Ask a friend what result they should have gotten"], correctAnswer: 1, explanation: "All genuine results, expected or not, must be reported honestly -- hiding data is dishonest and can hide important findings." },
  { id: 25, question: "Why is it useful to describe the exact method used in an investigation when sharing results?", options: ["So others can repeat it and check the result", "So no one else can use the idea", "It is not useful at all", "To make the report longer"], correctAnswer: 0, explanation: "Sharing the exact method allows other investigators to repeat the work and verify the finding." },
  { id: 26, question: "Which tool would be used to measure the time taken for an ice cube to melt?", options: ["Ruler", "Weighing balance", "Stopwatch", "Measuring cylinder"], correctAnswer: 2, explanation: "A stopwatch measures elapsed time, which is exactly what is needed here." },
  { id: 27, question: "Which tool would be used to measure the mass of a small object?", options: ["Thermometer", "Weighing balance", "Stopwatch", "Hand lens"], correctAnswer: 1, explanation: "A weighing balance measures mass precisely, in grams." },
  { id: 28, question: "Which tool would be used to measure the volume of a liquid?", options: ["Measuring cylinder", "Ruler", "Stopwatch", "Thermometer"], correctAnswer: 0, explanation: "A measuring cylinder is marked in millilitres, exactly suited to measuring liquid volume." },
  { id: 29, question: "Why is a numeric measurement (like 38°C) generally better data than a sense-based description (like 'quite warm')?", options: ["It sounds more scientific", "It is a precise, standard value that means the same to everyone", "It takes longer to state", "There is no real difference"], correctAnswer: 1, explanation: "A numeric measurement in a standard unit can be compared exactly, unlike a vague, person-dependent impression." },
  { id: 30, question: "Which of the following is an important safety rule during an investigation?", options: ["Taste unknown substances to identify them", "Follow instructions exactly and avoid untested steps", "Work in a cluttered area to save space", "Ignore any spills until later"], correctAnswer: 1, explanation: "Following approved instructions exactly, and never testing unknown substances by taste or smell, keeps an investigation safe." },
  { id: 31, question: "If a glass beaker breaks during an activity, what should be done first?", options: ["Clean it up alone immediately", "Report it to the teacher or supervising adult right away", "Ignore it and continue the activity", "Hide the broken pieces"], correctAnswer: 1, explanation: "Reporting immediately keeps everyone safe from cuts and ensures it is cleaned up properly." },
  { id: 32, question: "Why do most modern scientific investigations involve teamwork rather than one person working alone?", options: ["Working alone is against the rules", "Different team members bring different skills and knowledge", "Teams are required to make investigations slower", "There is no real reason"], correctAnswer: 1, explanation: "Combining different skills and knowledge often allows a fuller, more capable investigation than one person managing alone." },
  { id: 33, question: "What does it mean when a discovery is described as 'cumulative'?", options: ["It happens all at once", "It builds on the recorded work of earlier investigators", "It cannot be shared with others", "It has nothing to do with earlier work"], correctAnswer: 1, explanation: "Cumulative means new discoveries build on the shared, recorded knowledge that came before them." },
  { id: 34, question: "What is a 'chance discovery' (serendipity) in science?", options: ["A discovery made through a planned, step-by-step experiment only", "An unplanned, accidental observation that leads to something important, recognised by a curious mind", "A discovery that is always wrong", "A type of measuring tool"], correctAnswer: 1, explanation: "A chance discovery happens by accident, but is only recognised as important by an alert, prepared observer." },
  { id: 35, question: "Why does an accidental (chance) observation still require further investigation before being accepted as a discovery?", options: ["It does not need any further investigation", "It must still be tested and confirmed using the normal scientific process", "Accidents are never useful in science", "Only planned experiments count as observations"], correctAnswer: 1, explanation: "Noticing something by chance is only a starting observation -- it still must be questioned, tested, and confirmed." },
  { id: 36, question: "The phrase 'chance favours the prepared mind' means:", options: ["Only lucky people succeed in science", "A useful accident is only recognised by someone with the knowledge and curiosity to notice it", "Preparation removes the need for luck entirely", "Chance has nothing to do with real science"], correctAnswer: 1, explanation: "It highlights that a curious, knowledgeable mind is what turns an accident into a meaningful discovery." },
  { id: 37, question: "'Towns with more bookstores tend to have higher literacy rates.' Concluding that bookstores directly CAUSE higher literacy is an example of:", options: ["A fair test", "Confusing correlation with causation", "A controlled variable", "A safety rule"], correctAnswer: 1, explanation: "Both factors could be caused by a third factor (like investment in education), so correlation alone does not prove causation." },
  { id: 38, question: "A result is called 'reproducible' if:", options: ["Only the original investigator can get that result", "Other investigators repeating the same method get a similar result", "It can never be tested again", "It was based purely on opinion"], correctAnswer: 1, explanation: "Reproducibility means other people, following the same method, obtain a similar result, which builds confidence in the finding." },
  { id: 39, question: "If a claim cannot be reproduced by any other investigator despite many attempts, what should be concluded?", options: ["The claim is definitely true", "The claim should be treated with strong doubt", "The claim should be accepted without question", "Reproducibility does not matter"], correctAnswer: 1, explanation: "Since genuine scientific findings should be reproducible, repeated failure to reproduce a result suggests it may have been an error or coincidence." },
  { id: 40, question: "'Observer bias' refers to:", options: ["Using a biased measuring instrument only", "Unconsciously noticing results that match expectations while overlooking others", "A rule about laboratory safety", "A type of independent variable"], correctAnswer: 1, explanation: "Observer bias happens when an investigator unintentionally favours results that confirm what they expected." },
  { id: 41, question: "How can recording ALL results honestly help guard against observer bias?", options: ["It cannot help at all", "It ensures unexpected results are not hidden or ignored", "It makes the report shorter", "It removes the need for a hypothesis"], correctAnswer: 1, explanation: "Honest, complete recording ensures inconvenient or unexpected results are not quietly left out." },
  { id: 42, question: "A single interesting personal story ('my friend tried this and it worked') is:", options: ["The same as strong scientific evidence", "An anecdote, which is weaker than evidence from a controlled, repeated test", "Impossible to state", "A type of controlled variable"], correctAnswer: 1, explanation: "An anecdote is a single, unverified account, while scientific evidence comes from properly controlled and repeated testing." },
  { id: 43, question: "Which of these questions is scientific (testable)?", options: ["Which season is the best season?", "Does adding salt to water change its freezing point?", "Which colour is the most beautiful?", "What is the tastiest fruit?"], correctAnswer: 1, explanation: "This can be tested by observation and measurement, unlike the other options, which are matters of personal opinion." },
  { id: 44, question: "A student tests a new plant food on only one plant and concludes it works. The main weakness in this test is:", options: ["The sample size is too small", "The plant food was too expensive", "The experiment took too long", "The plant was the wrong colour"], correctAnswer: 0, explanation: "A single plant's growth could be affected by chance factors, so no reliable conclusion can come from just one case." },
  { id: 45, question: "Why is a hand lens (magnifying glass) a useful tool of investigation?", options: ["It measures temperature", "It makes small details larger and easier to observe", "It measures mass", "It measures time"], correctAnswer: 1, explanation: "A hand lens magnifies small details, extending what the unaided eye alone could observe." },
  { id: 46, question: "Which of these is an example of a controlled variable in an experiment testing how sunlight affects plant growth?", options: ["The amount of sunlight given", "The height of the plant measured at the end", "The amount of water given to each plant", "The conclusion of the experiment"], correctAnswer: 2, explanation: "Since sunlight is the independent variable and height is the dependent variable, water amount should be kept the same (controlled) across all plants." },
  { id: 47, question: "Why must a hypothesis be testable to be scientifically useful?", options: ["Otherwise it sounds unconvincing", "Because there would be no way to gather evidence for or against it", "Testable hypotheses are always true", "It has nothing to do with evidence"], correctAnswer: 1, explanation: "If a hypothesis cannot be tested, no evidence could ever confirm or disprove it, making it scientifically useless." },
  { id: 48, question: "'The floor is wet' is an observation. Which of the following is a possible inference from it?", options: ["The floor is made of tiles", "Someone recently mopped the floor", "The floor is square-shaped", "The floor is in a classroom"], correctAnswer: 1, explanation: "This offers a reasoned explanation for the wetness, going beyond what was directly observed." },
  { id: 49, question: "Why is peer checking (other experts reviewing a finding) important before it is widely accepted?", options: ["It slows down science for no reason", "It helps catch errors or unfair test designs before wide acceptance", "It removes the need for evidence", "It is only a formality with no real purpose"], correctAnswer: 1, explanation: "Having other experts check a finding helps catch mistakes or weaknesses before it becomes widely trusted." },
  { id: 50, question: "Overall, which best summarises the spirit of scientific inquiry?", options: ["Accepting ideas without question", "Curiosity, careful observation, fair testing, and openness to changing an idea when evidence demands it", "Memorising as many facts as possible", "Avoiding any questions that cannot be immediately answered"], correctAnswer: 1, explanation: "This captures the full process: curiosity leads to observation, then fair testing, with a willingness to revise ideas based on evidence." },
];

// ── VERY SHORT (2 marks each) ──
export const SCIENCE8_VERY_SHORT: ShortQuestion[] = [
  { id: 1, question: "Define science in your own words.", answer: "Science is a systematic way of studying the natural world through careful observation, questioning, and testing ideas against evidence.", keyPoints: ["Systematic process", "Observation, questioning, testing"] },
  { id: 2, question: "What usually starts a scientific investigation?", answer: "Curiosity, often triggered by an interesting or unexplained observation.", keyPoints: ["Curiosity", "Triggered by observation"] },
  { id: 3, question: "Why is science called 'self-correcting'?", answer: "Because scientific ideas are changed or replaced when new evidence contradicts them, rather than being held onto no matter what.", keyPoints: ["Changes with new evidence", "Not fixed forever"] },
  { id: 4, question: "Define observation.", answer: "Information gathered directly through the senses or with the help of an instrument, describing only what was actually noticed.", keyPoints: ["Direct", "Through senses/instrument"] },
  { id: 5, question: "Define inference.", answer: "An explanation or conclusion drawn from an observation, using reasoning that goes beyond what was directly sensed.", keyPoints: ["Explanation added", "Uses reasoning"] },
  { id: 6, question: "'The road is slippery.' Is this an observation or an inference? Give a reason.", answer: "An observation -- it directly states what was noticed, with no explanation added.", keyPoints: ["Observation", "No explanation added"] },
  { id: 7, question: "'The road is slippery because it rained recently.' Is this an observation or an inference? Give a reason.", answer: "An inference -- it adds a reasoned explanation (recent rain) for the observation.", keyPoints: ["Inference", "Reasoned explanation added"] },
  { id: 8, question: "Can one observation lead to more than one possible inference? Give an example.", answer: "Yes. For example, 'the grass is wet' could be inferred as due to rain, dew, or a sprinkler -- all are possible explanations for the same observation.", keyPoints: ["Yes, multiple possible", "Example given"] },
  { id: 9, question: "What makes a question 'scientific'?", answer: "A scientific question is one that can be answered through observation or experiment, not just through personal opinion.", keyPoints: ["Answerable by observation/experiment", "Not just opinion"] },
  { id: 10, question: "Define hypothesis.", answer: "A testable, proposed explanation for an observation, made before an experiment is carried out.", keyPoints: ["Testable", "Proposed before testing"] },
  { id: 11, question: "Define prediction and explain how it differs from a hypothesis.", answer: "A prediction is a specific 'if...then...' statement of what should happen if the hypothesis is true; it is more specific than the hypothesis itself.", keyPoints: ["Specific expected result", "More specific than hypothesis"] },
  { id: 12, question: "What should happen if an experiment's result does not match its prediction?", answer: "The hypothesis should be reconsidered or rejected, since the evidence does not support it.", keyPoints: ["Reconsider/reject hypothesis", "Normal part of science"] },
  { id: 13, question: "Define independent variable.", answer: "The one factor in an experiment that the investigator deliberately changes.", keyPoints: ["Deliberately changed", "By the investigator"] },
  { id: 14, question: "Define dependent variable.", answer: "The factor that is measured, to see whether it was affected by the independent variable.", keyPoints: ["Measured outcome", "Affected by independent variable"] },
  { id: 15, question: "Define controlled variables and explain why they matter.", answer: "Controlled variables are all the other factors kept exactly the same during an experiment, so that they cannot affect the result and confuse the conclusion.", keyPoints: ["Kept identical", "Prevents confusing results"] },
  { id: 16, question: "Why is a fair test important in an experiment?", answer: "Because changing only one variable at a time lets any change in the result be confidently linked to that one variable, making the conclusion trustworthy.", keyPoints: ["Only one variable changed", "Trustworthy conclusion"] },
  { id: 17, question: "What is the purpose of a control group?", answer: "It provides a baseline for comparison, showing what happens without the special treatment, so the treatment's real effect can be judged.", keyPoints: ["Baseline for comparison", "Shows real effect"] },
  { id: 18, question: "Why does testing many samples give a more reliable result than testing just one?", answer: "Because a single sample could behave unusually by chance; testing many reduces the effect of any one unusual case.", keyPoints: ["Reduces chance effects", "More reliable pattern"] },
  { id: 19, question: "List the six stages of the cycle of scientific inquiry in order.", answer: "Observation, Question, Hypothesis, Experiment, Analysis, Conclusion.", keyPoints: ["All six named", "Correct order"] },
  { id: 20, question: "Why is scientific inquiry described as a cycle rather than a straight line?", answer: "Because a conclusion can raise a brand new question, sending the process back to an earlier stage to start again.", keyPoints: ["Conclusion can lead to new question", "Not a straight line"] },
  { id: 21, question: "Why should observations be recorded immediately rather than from memory later?", answer: "Because memory can be inaccurate or incomplete after time has passed, so immediate recording keeps the data accurate.", keyPoints: ["Memory can be inaccurate", "Keeps data accurate"] },
  { id: 22, question: "Why must all results, expected or not, be reported honestly?", answer: "Because hiding inconvenient results gives a false picture of the evidence and could hide an important finding.", keyPoints: ["Avoids false picture", "Might hide real findings"] },
  { id: 23, question: "Why is it useful to share the exact method used in an investigation?", answer: "So that other investigators can repeat the same method and check whether they get a similar result.", keyPoints: ["Allows repetition", "Allows verification"] },
  { id: 24, question: "Name two tools of investigation and what each measures.", answer: "A thermometer measures temperature; a stopwatch measures time. (Other valid pairs: ruler-length, balance-mass, measuring cylinder-volume.)", keyPoints: ["Two correct tool-quantity pairs"] },
  { id: 25, question: "Why is a numeric measurement generally more useful than a sense-based description?", answer: "A numeric measurement in a standard unit is exact and means the same to everyone, while a sense-based description can vary between people.", keyPoints: ["Exact and standard", "Sense-based varies"] },
  { id: 26, question: "State one basic safety rule to follow during an investigation.", answer: "Never taste, smell directly, or touch an unknown substance -- observe it only through approved, safe methods.", keyPoints: ["Any valid, correctly reasoned safety rule"] },
  { id: 27, question: "Why do modern scientific investigations often involve teamwork?", answer: "Because different team members bring different skills, tools, or knowledge, allowing a fuller investigation than one person alone could manage.", keyPoints: ["Different skills combined", "Fuller investigation"] },
  { id: 28, question: "What is a chance discovery (serendipity)?", answer: "An unplanned, accidental observation that leads to something important, but only when noticed by a curious, prepared mind.", keyPoints: ["Accidental observation", "Noticed by prepared mind"] },
  { id: 29, question: "Explain briefly why correlation does not always mean causation.", answer: "Two things can change together because a third, hidden factor is causing both of them, not because one is directly causing the other.", keyPoints: ["Hidden third factor possible", "Not automatically cause-effect"] },
  { id: 30, question: "What does it mean for a result to be 'reproducible'?", answer: "It means other investigators, repeating the same method, get a similar result, which builds confidence that the finding is genuine.", keyPoints: ["Others get similar result", "Builds confidence"] },
];

// ── SHORT (3 marks each) ──
export const SCIENCE8_SHORT: ShortQuestion[] = [
  { id: 1, question: "Explain, with one example, the difference between an observation and an inference.", answer: "An observation is information gathered directly through the senses, describing only what was noticed -- for example, 'the ground is wet.' An inference is an explanation built on top of that observation using reasoning -- for example, 'it must have rained.' The inference goes beyond what was directly sensed.", keyPoints: ["Observation defined with example", "Inference defined with example", "Inference goes beyond direct sensing"] },
  { id: 2, question: "A student observes that a candle flame goes out when covered with a glass jar. Write one observation and one possible inference based on this.", answer: "Observation: the candle flame went out after the glass jar was placed over it. Inference: the flame needs the air/oxygen inside the jar to keep burning, and it went out once that was used up.", keyPoints: ["Correct observation stated", "Reasonable inference stated"] },
  { id: 3, question: "Explain why a hypothesis must be testable, with reference to what happens if it is not.", answer: "A hypothesis must be testable so that evidence can be gathered to support or disprove it. If a hypothesis cannot be tested in any way, there is no possible evidence for or against it, making it scientifically useless -- it would remain permanently unconfirmed.", keyPoints: ["Testable = evidence possible", "Untestable = scientifically useless"] },
  { id: 4, question: "Distinguish between a hypothesis and a prediction, using an example of each for the question 'Does temperature affect how fast sugar dissolves?'", answer: "Hypothesis (a proposed explanation): 'Higher temperature makes sugar dissolve faster because heat increases particle movement.' Prediction (a specific expected result): 'If this is true, then sugar placed in hot water will fully dissolve in less time than the same amount of sugar placed in cold water.'", keyPoints: ["Hypothesis example given", "Prediction example given", "Prediction is more specific"] },
  { id: 5, question: "In an experiment testing whether fertiliser amount affects tomato plant height, identify the independent variable, dependent variable, and one controlled variable.", answer: "Independent variable: amount of fertiliser given. Dependent variable: height of the tomato plant. Controlled variable (any one): amount of water given, type of soil used, or amount of sunlight received -- these must be kept the same for all plants.", keyPoints: ["Independent variable correct", "Dependent variable correct", "One valid controlled variable"] },
  { id: 6, question: "Explain why changing two variables at once in an experiment makes the result untrustworthy.", answer: "If two variables are changed at the same time, any difference in the result could have been caused by either variable (or both together), making it impossible to know which one is actually responsible -- so no clear, trustworthy conclusion can be drawn.", keyPoints: ["Cannot tell which variable caused effect", "Result becomes untrustworthy"] },
  { id: 7, question: "Explain the purpose of a control group with an example.", answer: "A control group receives no special treatment and is used as a baseline for comparison. For example, when testing a new fertiliser, a control group of plants gets no fertiliser at all, so its growth can be compared against the treated group to see whether the fertiliser actually made a difference.", keyPoints: ["Purpose explained", "Example given"] },
  { id: 8, question: "Why does repeating an experiment or testing many samples make a conclusion more reliable? Explain with reference to chance.", answer: "Any single sample could behave unusually just by chance, unrelated to the variable being tested. Testing many samples (or repeating the experiment) reduces the effect of any one unusual case and reveals the true, overall pattern more reliably.", keyPoints: ["Chance factors in single samples", "Repetition reduces this risk"] },
  { id: 9, question: "List the six stages of the cycle of scientific inquiry and briefly explain what happens in each.", answer: "Observation: noticing something interesting. Question: turning it into a testable question. Hypothesis: proposing a testable explanation. Experiment: fairly testing the hypothesis. Analysis: studying the results. Conclusion: deciding whether the evidence supports the hypothesis and sharing the finding.", keyPoints: ["All six stages named", "Brief explanation for each"] },
  { id: 10, question: "Explain why the cycle of scientific inquiry is better represented as a circle rather than a straight line, with an example.", answer: "Because a conclusion often raises a brand new question, sending the investigator back to an earlier stage. For example, finding that a plant grows faster in warm soil might raise the new question of exactly how warm the soil needs to be, restarting the cycle from a fresh observation and question.", keyPoints: ["Reason (conclusion leads to new question)", "Example given"] },
  { id: 11, question: "Why should measurements and observations be recorded immediately, and in what form should they ideally be kept?", answer: "They should be recorded immediately because memory can be inaccurate or incomplete after time passes. They are best kept in an organised form, such as a table with clear labels and standard units, so results are accurate and easy to compare later.", keyPoints: ["Reason for immediate recording", "Organised form (table, units) mentioned"] },
  { id: 12, question: "A student is tempted to leave out a result that does not match their hypothesis. Explain why this would be wrong, and what the correct action is.", answer: "Leaving out an inconvenient result is a form of dishonest reporting that gives a false, one-sided picture of the evidence, and might hide something scientifically important. The correct action is to record and report every genuine result honestly, whether it matches the hypothesis or not.", keyPoints: ["Reason it is wrong (bias/dishonesty)", "Correct action stated"] },
  { id: 13, question: "Explain why sharing the exact method of an investigation is important for other investigators.", answer: "Sharing the exact method allows other investigators to repeat the same steps under the same conditions and check whether they get a similar result. This process of verification is an important part of building trust in a scientific finding.", keyPoints: ["Allows repetition", "Builds trust through verification"] },
  { id: 14, question: "Name three tools of investigation, and state what quantity each one measures.", answer: "Thermometer measures temperature. Stopwatch measures time. Weighing balance measures mass. (Other valid tools: ruler for length, measuring cylinder for volume.)", keyPoints: ["Three correct tool-quantity pairs"] },
  { id: 15, question: "Explain, with a reason, why a numeric measurement is generally more trustworthy than a sense-based description.", answer: "A numeric measurement, like 45°C, is precise and given in a standard unit that means the same thing to everyone, everywhere. A sense-based description, like 'quite warm', depends on the individual person and can vary between different observers, making comparisons unreliable.", keyPoints: ["Numeric = precise, standard", "Sense-based = varies between people"] },
  { id: 16, question: "State three basic safety rules to be followed during a science investigation, with a brief reason for each.", answer: "1) Follow instructions exactly, since untested steps can cause unexpected accidents. 2) Never taste or smell unknown substances directly, since some could be harmful. 3) Report any breakage or spill immediately, so it can be cleaned up safely before it causes injury.", keyPoints: ["Three rules stated", "Reason given for each"] },
  { id: 17, question: "Explain why modern scientific work is usually carried out by teams rather than individuals, with an example.", answer: "Different team members often bring different skills, tools, or specialised knowledge, making it possible to carry out a fuller investigation than any one person could manage alone. For example, studying how a disease spreads might need people skilled in biology, statistics, and fieldwork all working together.", keyPoints: ["Reason (combined skills)", "Example given"] },
  { id: 18, question: "Explain the idea of a 'chance discovery' and why it still requires proper investigation afterward.", answer: "A chance discovery happens when an investigator notices something useful completely by accident while working on something else. However, noticing it is only the starting observation -- it still must be questioned, tested, and confirmed through the normal scientific process before it is accepted as a genuine discovery.", keyPoints: ["Chance discovery defined", "Reason further investigation is needed"] },
  { id: 19, question: "Explain what is meant by 'correlation is not causation', using the ice cream and sunburn example.", answer: "Ice cream sales and sunburn cases both rise in summer, appearing linked (correlated). But ice cream does not cause sunburn -- both are actually caused by a third factor, hot sunny weather, which leads to more ice cream buying and more time spent outdoors in the sun.", keyPoints: ["Concept explained", "Example correctly applied"] },
  { id: 20, question: "Explain why a claim that cannot be reproduced by other investigators should be treated with doubt.", answer: "A genuine scientific finding should be reproducible -- other investigators using the same method should get a similar result. If repeated attempts by different investigators consistently fail to reproduce a claim, it suggests the original result may have been due to an error or a coincidence rather than a real effect.", keyPoints: ["Reproducibility expected of genuine findings", "Repeated failure suggests error/coincidence"] },
  { id: 21, question: "A student wants to test whether the colour of light affects how fast a plant grows. Suggest one independent variable, one dependent variable, and one variable that must be controlled.", answer: "Independent variable: colour of light given to the plant. Dependent variable: growth of the plant (e.g., height after two weeks). Controlled variable (any one): amount of water, type of soil, or duration of light exposure each day.", keyPoints: ["Independent variable correct", "Dependent variable correct", "Controlled variable correct"] },
  { id: 22, question: "Explain why an anecdote (a single personal story) is considered weaker evidence than a properly controlled, repeated experiment.", answer: "An anecdote describes only one unverified case, which could easily be affected by chance or by factors that were never checked. A properly controlled, repeated experiment tests the idea fairly across multiple trials, making its result far more trustworthy.", keyPoints: ["Anecdote = single, unverified case", "Controlled experiment = fair, repeated, trustworthy"] },
  { id: 23, question: "Explain what observer bias is and suggest one way to reduce it.", answer: "Observer bias happens when an investigator unconsciously notices results that match their expectations while overlooking results that do not. It can be reduced by recording ALL results honestly, including unexpected ones, and by having other people independently check the data.", keyPoints: ["Observer bias explained", "A valid way to reduce it"] },
  { id: 24, question: "Explain why peer checking of findings (other experts reviewing the work) is an important part of the scientific process.", answer: "When other experts review a finding, they can catch errors, spot unfair test designs, or identify conclusions that are not fully supported by the evidence, before the finding becomes widely trusted and shared -- this makes accepted scientific knowledge more reliable.", keyPoints: ["Purpose (catching errors/weak conclusions)", "Result (more reliable accepted knowledge)"] },
  { id: 25, question: "Summarise, in three key points, what makes an investigation trustworthy.", answer: "1) It uses a fair test, changing only one variable while controlling the rest. 2) It records and reports results honestly, including unexpected ones. 3) Its method is shared clearly enough that others can repeat it and verify the result.", keyPoints: ["Fair test", "Honest recording", "Shareable/repeatable method"] },
];

// ── LONG (5 marks each) ──
export const SCIENCE8_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Describe, step by step, how a simple observation ('some plants near a window grow taller than plants kept in a dark corner') could be turned into a complete, fair scientific investigation, following the full cycle of scientific inquiry.",
    markingScheme: [
      "Correctly frames a testable question from the observation",
      "Correctly proposes a testable hypothesis",
      "Correctly designs a fair experiment, identifying independent, dependent, and controlled variables",
      "Correctly describes how the results would be analysed",
      "Correctly explains how a conclusion would be drawn and what might happen next"
    ],
    answerParts: [
      { part: "Observation", text: "Plants near a window (more light) appear taller than plants kept in a dark corner (less light)." },
      { part: "Question", text: "Does the amount of light a plant receives affect how tall it grows?" },
      { part: "Hypothesis", text: "Plants receiving more light grow taller than plants receiving less light, because light is needed for the plant's growth processes." },
      { part: "Fair experiment design", text: "Independent variable: amount of light given. Dependent variable: height of the plant after a fixed time (e.g., two weeks). Controlled variables: same type of plant/seed, same amount of water, same type and amount of soil, same pot size -- kept identical for all plants except for the light they receive." },
      { part: "Analysis and conclusion", text: "Measure and compare the heights of plants across the different light conditions. If plants with more light are consistently taller (across several plants, not just one), this supports the hypothesis. The conclusion should be shared clearly, including the exact method, so others can repeat it -- and if a surprising result appears, it could lead to a brand new question, continuing the cycle." }
    ]
  },
  {
    id: 2,
    question: "Explain the difference between observation and inference in detail, and describe why confusing the two can lead to a mistaken conclusion in an investigation. Use an original example to support your answer.",
    markingScheme: [
      "Correctly and fully defines observation",
      "Correctly and fully defines inference",
      "Explains clearly why confusing the two is risky",
      "Provides an original, correctly analysed example",
      "Draws a clear overall conclusion about handling inferences carefully"
    ],
    answerParts: [
      { part: "Defining observation", text: "An observation is information gathered directly through the senses or an instrument -- it states only what was actually noticed, with no explanation added." },
      { part: "Defining inference", text: "An inference is an explanation built on top of an observation, using reasoning or existing knowledge -- it goes beyond what was directly sensed." },
      { part: "Why confusing them is risky", text: "If an inference is treated as though it were a directly confirmed fact, an investigator might stop looking for other explanations, or act on an assumption that turns out to be wrong -- since an inference is only one of possibly several explanations for the same observation." },
      { part: "Original example", text: "Observation: 'Several fish in a pond are floating at the surface, not moving.' A tempting inference: 'The fish are dead.' However, another possible inference is that the fish are simply resting near the surface where oxygen levels are higher -- treating the first inference as certain without checking further could lead to a wrong conclusion." },
      { part: "Final Answer", text: "Observation and inference must be kept clearly separate: an inference should always be treated as a plausible explanation still needing to be checked, not as an established fact." }
    ]
  },
  {
    id: 3,
    question: "Design a complete fair-test experiment to investigate whether the type of surface (e.g., grass, concrete, sand) affects how far a ball rolls after being pushed with the same force. Clearly identify all variables and explain how you would ensure the test is fair.",
    markingScheme: [
      "Correctly identifies the independent variable",
      "Correctly identifies the dependent variable",
      "Correctly identifies at least three controlled variables",
      "Explains how the force applied would be kept consistent (a key controlled variable for this specific setup)",
      "Explains how repeating trials would improve the experiment's reliability"
    ],
    answerParts: [
      { part: "Independent variable", text: "The type of surface the ball rolls on (grass, concrete, sand)." },
      { part: "Dependent variable", text: "The distance the ball rolls before stopping." },
      { part: "Controlled variables", text: "The same ball must be used each time; the force used to push the ball must be kept the same; the direction of the push should be kept consistent; weather conditions (like wind) should be similar for all trials." },
      { part: "Ensuring a consistent push", text: "To keep the force consistent, a simple ramp could be used: releasing the ball from the same height on the same ramp every time ensures it starts with the same speed, rather than relying on an inconsistent hand-push." },
      { part: "Improving reliability", text: "The test should be repeated several times on each surface, and the results averaged, to reduce the effect of any one unusual roll (for example, the ball hitting a small stone) on the overall conclusion." }
    ]
  },
  {
    id: 4,
    question: "Explain, in detail, why scientific conclusions are always considered open to revision, and describe how this connects to the cyclical nature of scientific inquiry. Support your explanation with an example of an idea that changed due to new evidence.",
    markingScheme: [
      "Explains clearly why conclusions are treated as provisional (based on current evidence)",
      "Connects this idea clearly to the cyclical nature of the inquiry process",
      "Explains that this openness to revision is a strength, not a weakness, of science",
      "Provides a valid example of an idea changing due to new evidence",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Why conclusions are provisional", text: "A scientific conclusion is the best explanation based on the evidence available AT THE TIME. It is not treated as permanently fixed, because new observations or better experiments could reveal something the earlier investigation missed." },
      { part: "Connection to the cycle", text: "This is exactly why scientific inquiry is described as a cycle: a conclusion that gets challenged by new evidence leads back to a fresh observation and a new round of questioning, rather than being defended no matter what." },
      { part: "Why this is a strength", text: "This openness to revision means science tends to become more accurate over time, since incorrect or incomplete ideas get replaced -- a fixed, unchangeable belief could never improve in the same way." },
      { part: "Example", text: "For centuries, many believed heavier objects always fall faster than lighter ones. Careful testing later showed that, ignoring air resistance, objects of different weights actually fall at the same rate -- the earlier idea was revised once it was properly tested." },
      { part: "Final Answer", text: "Scientific conclusions remain open to revision because they rest on current evidence, not fixed belief; this connects directly to the cyclical nature of inquiry, and is a key strength that allows scientific understanding to keep improving." }
    ]
  },
  {
    id: 5,
    question: "A student wants to find out whether adding sugar to water affects how quickly ice cubes melt in it. Design a fair experiment for this, describe how results should be recorded, and explain why sharing the method afterward matters.",
    markingScheme: [
      "Correctly identifies independent, dependent, and at least two controlled variables",
      "Describes a reasonable, fair experimental setup",
      "Explains how results should be recorded (with reference to accuracy/honesty/organisation)",
      "Explains the importance of sharing the exact method used",
      "Provides an overall, well-reasoned conclusion connecting all parts"
    ],
    answerParts: [
      { part: "Variables", text: "Independent variable: amount of sugar dissolved in the water. Dependent variable: time taken for an identical ice cube to fully melt. Controlled variables: same starting water temperature, same size/shape of ice cube, same container size, same room temperature." },
      { part: "Experimental setup", text: "Prepare several containers of water with different sugar amounts (including one with no sugar, as a control), keep all other conditions identical, drop in identical ice cubes at the same time, and use a stopwatch to time how long each takes to fully melt." },
      { part: "Recording results", text: "Results should be recorded immediately in a clear table, with columns for the amount of sugar and the exact melting time (in a standard unit like seconds), reporting every trial honestly -- including any unexpected result." },
      { part: "Why sharing the method matters", text: "Sharing the exact setup (amounts, timing method, starting temperature) allows other investigators to repeat the experiment under the same conditions and check whether they get a similar result, which builds confidence in the finding." },
      { part: "Final Answer", text: "A properly controlled experiment with honest, organised recording and a clearly shared method gives a trustworthy answer to whether sugar affects ice-melting time, and allows the finding to be verified by others." }
    ]
  },
  {
    id: 6,
    question: "Explain the concept of 'correlation is not causation' in detail, giving two different examples, and describe one method an investigator could use to test whether a suspected cause is a genuine cause.",
    markingScheme: [
      "Clearly explains what correlation means",
      "Clearly explains why correlation does not prove causation",
      "Provides two distinct, correctly reasoned examples",
      "Describes a valid method (a fair, controlled experiment) to test genuine causation",
      "Draws a clear final conclusion"
    ],
    answerParts: [
      { part: "What correlation means", text: "Correlation means two things change together -- as one increases or decreases, the other tends to do the same." },
      { part: "Why it does not prove causation", text: "Two correlated things might not be directly linked at all -- a hidden third factor could be causing both of them to change together, without either one actually causing the other." },
      { part: "Example 1", text: "Ice cream sales and sunburn cases both rise in summer; this is because hot weather causes both more ice cream buying and more time spent in the sun, not because ice cream causes sunburn." },
      { part: "Example 2", text: "Towns with more fire trucks present at a fire may also have more fire damage; this is because bigger fires both cause more damage AND require more fire trucks to be sent, not because fire trucks cause the damage." },
      { part: "Testing genuine causation", text: "A fair, controlled experiment can test genuine causation: deliberately change only the suspected cause (the independent variable) while keeping everything else the same, then measure whether the suspected effect (the dependent variable) actually changes as a result." },
      { part: "Final Answer", text: "Correlation alone never proves causation; only a properly controlled, fair experiment -- not just observing two things changing together -- can show whether one factor genuinely causes another." }
    ]
  },
  {
    id: 7,
    question: "Discuss the role of teamwork and shared, recorded knowledge in the growth of science, and explain how a single investigator's careful recording today can benefit investigators working many years later.",
    markingScheme: [
      "Explains clearly why modern science often relies on teamwork",
      "Explains the idea of science being 'cumulative'",
      "Explains how shared records let later investigators build on earlier work",
      "Gives a reasonable, well-explained example",
      "Draws a clear final conclusion connecting recording, sharing, and cumulative growth"
    ],
    answerParts: [
      { part: "Role of teamwork", text: "Complex investigations often need a mix of different skills, tools, and specialised knowledge that a single person is unlikely to have all at once, making teamwork valuable for tackling bigger questions." },
      { part: "Science as cumulative", text: "Very few discoveries start completely from zero -- most build on knowledge, methods, and results recorded by earlier investigators, sometimes from entirely different times and places." },
      { part: "How shared records help later investigators", text: "When results and methods are clearly recorded and shared, a later investigator does not need to repeat the same basic groundwork -- they can start from where earlier work left off, and focus their effort on the next unanswered question." },
      { part: "Example", text: "An investigator who carefully records exactly how a particular plant responds to different soil types creates a resource that a much later investigator, studying a related question (perhaps about a disease affecting that same plant), can refer back to instead of starting from nothing." },
      { part: "Final Answer", text: "Careful recording and honest sharing turn one investigator's work into a resource for everyone who comes after, which is exactly how scientific understanding grows cumulatively over time, often through teamwork across many people and even generations." }
    ]
  },
  {
    id: 8,
    question: "A newspaper claims: 'Children who eat breakfast every day get better grades, so schools should force all children to eat breakfast to raise grades.' Critically evaluate this claim using ideas from this chapter, and explain what would need to be done to test it properly.",
    markingScheme: [
      "Identifies the correlation being described",
      "Explains why this does not automatically prove causation",
      "Suggests at least one plausible alternative (hidden) explanation",
      "Describes what a fair, controlled test of the actual claim would look like",
      "Draws a balanced, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Identifying the correlation", text: "The claim describes a correlation: children who eat breakfast tend to also get better grades." },
      { part: "Why this does not prove causation", text: "This correlation alone does not prove that breakfast itself causes better grades -- some other, hidden factor could be responsible for both." },
      { part: "A plausible alternative explanation", text: "Families that consistently provide breakfast might also, for example, provide more consistent routines, sleep schedules, or support with schoolwork -- any of these could be the real reason behind better grades, not the breakfast itself." },
      { part: "What a fair test would look like", text: "A fair test would need to deliberately assign breakfast (the independent variable) while keeping other likely factors (sleep routine, homework support, and so on) as similar as possible between groups, then compare grades (the dependent variable) afterward -- something a simple observed correlation cannot do." },
      { part: "Final Answer", text: "The newspaper's claim jumps from a correlation to a causation conclusion without a fair test, and ignores plausible alternative explanations -- a properly controlled study, not just an observed pattern, would be needed before concluding that breakfast itself raises grades." }
    ]
  },
  {
    id: 9,
    question: "Explain the purpose and importance of each of the following in a scientific investigation, using one example for each: (a) recording results in a table with standard units, (b) repeating an experiment multiple times, (c) sharing the method used with other investigators.",
    markingScheme: [
      "Explains the purpose of tables/standard units with an example",
      "Explains the purpose of repetition with an example",
      "Explains the purpose of sharing methods with an example",
      "Each explanation includes a clear reason (not just a description)",
      "Provides an overall concluding statement connecting all three"
    ],
    answerParts: [
      { part: "(a) Tables and standard units", text: "Recording results in a table with standard units (like °C or cm) organises data clearly and allows exact comparison. For example, a table showing plant height in cm for each day makes it far easier to spot a growth pattern than a long paragraph of description." },
      { part: "(b) Repeating the experiment", text: "Repeating an experiment reduces the effect of chance on the conclusion. For example, testing a fertiliser on just one plant could give a misleading result if that plant happened to be unusually strong or weak; testing 10 plants and averaging the results is far more reliable." },
      { part: "(c) Sharing the method", text: "Sharing the exact method allows other investigators to repeat the work and check the result. For example, if an investigator reports a new material's melting point but does not share how it was measured, no one else could verify or trust the claim." },
      { part: "Final Answer", text: "Together, careful recording, repetition, and open sharing of methods are what turn a single person's observation into evidence the wider scientific community can trust and build upon." }
    ]
  },
  {
    id: 10,
    question: "Explain what observer bias is, why it can occur even when an investigator does not intend to be dishonest, and describe two practical steps that can reduce it in a real investigation.",
    markingScheme: [
      "Clearly defines observer bias",
      "Explains why it can happen unintentionally",
      "Describes a first valid step to reduce it",
      "Describes a second, distinct valid step to reduce it",
      "Draws a clear final conclusion about why guarding against bias matters"
    ],
    answerParts: [
      { part: "Defining observer bias", text: "Observer bias is the unconscious tendency to notice, remember, or emphasise results that match what was expected, while overlooking or downplaying results that do not." },
      { part: "Why it can happen unintentionally", text: "It can happen without any deliberate dishonesty, simply because people naturally pay closer attention to results that confirm what they already believe, without realising they are doing so." },
      { part: "Step 1", text: "Recording every result immediately and completely, before knowing whether it 'fits' the expected pattern, makes it much harder to unconsciously skip inconvenient data later." },
      { part: "Step 2", text: "Having another person independently check the recorded data (or repeat the observation separately) provides a second, unbiased perspective that can catch anything the original investigator may have missed or misjudged." },
      { part: "Final Answer", text: "Observer bias is a natural human tendency, not necessarily deliberate dishonesty, but it can still distort a conclusion -- honest, immediate, complete recording combined with independent checking are practical ways to guard against it." }
    ]
  },
  {
    id: 11,
    question: "Design a complete fair-test investigation to find out whether the colour of a cloth affects how much heat it absorbs when placed in sunlight. Identify all variables and explain how you would measure the outcome.",
    markingScheme: [
      "Correctly identifies the independent variable",
      "Correctly identifies the dependent variable",
      "Correctly identifies at least three controlled variables",
      "Describes a reasonable way to measure the outcome",
      "Explains how repeating the test would improve reliability"
    ],
    answerParts: [
      { part: "Independent variable", text: "The colour of the cloth (for example, black, white, and red)." },
      { part: "Dependent variable", text: "The temperature reached by the cloth (or by a thermometer placed under/on it) after a fixed time in sunlight." },
      { part: "Controlled variables", text: "Same type and thickness of cloth material, same size of cloth piece, same duration in sunlight, and testing at the same time of day so sunlight intensity is similar for all pieces." },
      { part: "Measuring the outcome", text: "Place an identical thermometer under or touching each cloth piece and record the temperature reading after the same fixed time (e.g., 10 minutes) in direct sunlight." },
      { part: "Final Answer", text: "Repeating this test with multiple pieces of each colour, and on more than one sunny day, would make the conclusion about colour and heat absorption far more reliable than relying on a single test." }
    ]
  },
  {
    id: 12,
    question: "Explain why the quality of an observation depends on both the senses used and the tools available, giving one example of a human sense's limitation that an instrument overcomes.",
    markingScheme: [
      "Explains that observation quality depends on both senses and available tools",
      "Explains a genuine limitation of unaided human senses",
      "Gives a correct, relevant example of an instrument overcoming that limitation",
      "Explains why this matters for scientific investigation",
      "Draws a clear final conclusion"
    ],
    answerParts: [
      { part: "Senses and tools together", text: "Observation always starts with the senses, but the senses alone have real limits -- tools extend what can be reliably noticed and measured beyond those limits." },
      { part: "A limitation of unaided senses", text: "Human senses cannot judge very small temperature differences accurately, and different people may disagree on whether something feels 'warm' or 'hot'." },
      { part: "An instrument that overcomes it", text: "A thermometer gives an exact numeric temperature reading that does not depend on any individual person's sense of touch, removing this limitation entirely." },
      { part: "Why this matters", text: "Since science relies on evidence that can be checked and compared by anyone, observations limited by variable human senses are far less useful than precise, tool-based measurements." },
      { part: "Final Answer", text: "The quality of an observation improves greatly when appropriate tools are used alongside the senses, since tools provide precise, standard readings that unaided senses cannot reliably give." }
    ]
  },
  {
    id: 13,
    question: "Explain how the reliability of a scientific claim should be judged when it has been tested by many different, independent teams, compared to a claim tested by only one team. Use an example to support your explanation.",
    markingScheme: [
      "Explains why independent replication increases confidence in a claim",
      "Explains why a single team's result alone carries more risk of being an error or coincidence",
      "Gives a correct, relevant example",
      "Explains what should happen if independent teams get conflicting results",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Why replication increases confidence", text: "When many independent teams, working separately, all get a similar result using the same method, it becomes far less likely that the result is due to a single team's error, bias, or coincidence." },
      { part: "Risk of relying on one team", text: "A single team's result could be affected by an unnoticed mistake, an uncontrolled variable, or simple chance -- without independent checking, there is no way to rule this out." },
      { part: "Example", text: "If one school reports that a certain seed variety sprouts unusually fast, but ten other schools testing the same seeds under similar conditions cannot reproduce this result, the original finding becomes doubtful." },
      { part: "Conflicting results", text: "If independent teams get genuinely conflicting results, this signals that the investigation needs a closer look -- perhaps at differences in method or uncontrolled variables -- rather than either result being immediately accepted or rejected." },
      { part: "Final Answer", text: "A claim confirmed by many independent teams is far more trustworthy than one based on a single team's result, since wide, independent reproducibility is one of the strongest signs that a finding reflects a genuine effect." }
    ]
  },
  {
    id: 14,
    question: "Alexander Fleming noticed that mould accidentally growing in one of his petri dishes had killed the surrounding bacteria, a chance observation that eventually led to penicillin. Explain, step by step, how this accidental observation would still have needed to go through the full process of scientific inquiry to become an accepted, useful discovery.",
    markingScheme: [
      "Correctly identifies the chance observation",
      "Explains that noticing it alone was not yet a finished discovery",
      "Describes what a follow-up question and hypothesis might have looked like",
      "Describes what further testing would have been needed",
      "Draws a clear final conclusion about chance discoveries needing full investigation"
    ],
    answerParts: [
      { part: "The chance observation", text: "Fleming noticed, by accident, that bacteria near a patch of mould in one dish had died, while bacteria elsewhere in the dish had not." },
      { part: "Not yet a finished discovery", text: "Simply noticing this pattern was only the starting observation -- it did not, by itself, prove that the mould was responsible or that it could be used safely and effectively." },
      { part: "Follow-up question and hypothesis", text: "A natural next question would be: 'Does a substance produced by this mould kill bacteria?' A testable hypothesis would be: 'The mould produces a substance that stops nearby bacteria from growing.'" },
      { part: "Further testing needed", text: "This would require carefully controlled experiments: testing the mould's effect on bacteria under controlled conditions, identifying and isolating the active substance, and testing it for safety and effectiveness before it could be trusted and used." },
      { part: "Final Answer", text: "Even a hugely important chance observation like Fleming's still had to pass through proper questioning, hypothesis-forming, and extensive fair testing before becoming the confirmed, accepted discovery of penicillin -- luck provided the starting point, but investigation made it a real discovery." }
    ]
  },
  {
    id: 15,
    question: "Explain the idea that 'an unusual or surprising claim needs stronger evidence than an ordinary one', using an example, and explain why this is a reasonable standard for evaluating scientific claims.",
    markingScheme: [
      "Explains the core idea clearly",
      "Explains why ordinary claims need less evidence to be believed",
      "Explains why surprising claims need more evidence",
      "Gives a correct, relevant example",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "The core idea", text: "A claim that fits well with everything already known and tested needs only ordinary evidence to be accepted, but a claim that contradicts a large amount of existing, well-tested evidence needs much stronger evidence before it should be believed." },
      { part: "Why ordinary claims need less evidence", text: "An ordinary claim, like 'this plant grew taller with more sunlight', matches many other well-established findings about plants needing light, so a normal, fair test is enough to support it." },
      { part: "Why surprising claims need more evidence", text: "A surprising claim, like 'this plant grew without any water at all for a year', contradicts a huge amount of well-established evidence about plants needing water, so it would need extremely careful, repeated, and verifiable testing before being accepted." },
      { part: "Example", text: "If someone claims a common house plant can fully purify the air of an entire room, this is a strong claim -- it would need proper controlled measurement of air quality, repeated by others, rather than just one person's impression." },
      { part: "Final Answer", text: "This standard is reasonable because it protects against accepting false claims too easily, while still allowing genuinely well-supported surprising discoveries to be accepted once they pass a suitably strong, repeated test." }
    ]
  },
  {
    id: 16,
    question: "Design a fair-test investigation to find out whether background noise affects how quickly students can complete a simple puzzle. Identify all variables, describe the setup, and explain how the results should be recorded.",
    markingScheme: [
      "Correctly identifies the independent variable",
      "Correctly identifies the dependent variable",
      "Correctly identifies at least two controlled variables",
      "Describes a reasonable experimental setup, including a control condition",
      "Explains how results should be recorded for reliability"
    ],
    answerParts: [
      { part: "Independent variable", text: "The level of background noise (for example, silence, quiet music, and loud noise)." },
      { part: "Dependent variable", text: "The time taken to complete the puzzle." },
      { part: "Controlled variables", text: "The same puzzle (same difficulty) must be used for every student, the same amount of time should be allowed for practice beforehand, and the room's lighting and seating should stay the same." },
      { part: "Setup with a control condition", text: "One group completes the puzzle in silence (the control condition), while other groups complete an identical puzzle under quiet music and loud noise, with everything else kept the same." },
      { part: "Recording results", text: "Record each student's exact completion time in a table, organised by noise condition, and test enough students in each condition (not just one or two) so the average result for each condition is reliable rather than based on chance." }
    ]
  },
  {
    id: 17,
    question: "Explain why controlling every variable becomes more difficult as an investigation grows more complex (involving more than one possible factor), and describe, in simple terms, how testing large numbers of samples helps address this challenge.",
    markingScheme: [
      "Explains why more possible factors make full control harder",
      "Gives a reasonable example of a complex, multi-factor situation",
      "Explains, in simple terms, how large sample sizes help even when not every factor can be perfectly controlled",
      "Explains that this does not fully replace the need for careful test design",
      "Draws a clear final conclusion"
    ],
    answerParts: [
      { part: "Why complexity makes control harder", text: "In simple experiments (like one plant's water amount), it is easy to keep every other factor the same. In more complex, real-world situations (like studying children's health across many different homes), there are far more factors that could differ between cases, and it becomes practically impossible to control every single one perfectly." },
      { part: "Example", text: "Studying whether a particular habit affects children's health across a whole city involves countless differing factors between families -- diet, activity levels, sleep, local environment -- that cannot all be perfectly matched between groups." },
      { part: "How large samples help", text: "By studying a very large number of cases, chance differences between individuals tend to even out across the whole group, so a real overall pattern (if one exists) can still emerge clearly, even without perfectly controlling every single factor for every single person." },
      { part: "Does not fully replace careful design", text: "Large sample sizes help reduce the effect of chance, but they do not replace the need for a thoughtfully designed comparison (such as a suitable control group) -- both careful design and large samples work together." },
      { part: "Final Answer", text: "As investigations grow more complex, perfectly controlling every variable becomes harder, but testing a large number of cases, combined with careful comparison design, still allows a genuine pattern to be identified reliably." }
    ]
  },
  {
    id: 18,
    question: "Explain the role of models in helping scientists understand things that cannot be directly observed, and explain why a model is always a simplification rather than a perfect copy of reality, using an example.",
    markingScheme: [
      "Explains what a scientific model is used for",
      "Explains why models are useful for things not directly observable",
      "Gives a correct, relevant example of a model",
      "Explains clearly why a model is a simplification, not a perfect copy",
      "Draws a clear final conclusion"
    ],
    answerParts: [
      { part: "What a model is used for", text: "A model is a simplified representation of something real, used to help understand, explain, or predict how that real thing behaves." },
      { part: "Why useful for the unobservable", text: "Some things are too large, too small, too far away, or too slow/fast to observe directly with the senses -- a model lets investigators represent and reason about them anyway." },
      { part: "Example", text: "A simple model using balls of different sizes at different distances can represent the relative sizes and positions of the planets around the Sun, helping people understand the solar system's layout even though it cannot be observed directly at true scale." },
      { part: "Why it is a simplification", text: "The model leaves out enormous amounts of real detail (such as the planets' actual complex compositions, motions, and true distances) to focus only on the specific idea it is meant to illustrate -- it was never meant to be an exact, complete copy of reality." },
      { part: "Final Answer", text: "Models are valuable tools for understanding the unobservable, but must always be treated as simplified representations, useful for illustrating specific ideas, not as perfectly accurate copies of the real thing." }
    ]
  },
  {
    id: 19,
    question: "Explain, with two examples, how basic laboratory safety rules are themselves based on scientific, cause-and-effect reasoning about risk, rather than being arbitrary rules.",
    markingScheme: [
      "Explains that safety rules are based on understanding cause and effect (hazard reasoning)",
      "Gives a first correct example linking a rule to its specific hazard reasoning",
      "Gives a second, distinct correct example linking a rule to its specific hazard reasoning",
      "Explains why understanding the reasoning (not just memorising the rule) is valuable",
      "Draws a clear final conclusion"
    ],
    answerParts: [
      { part: "Rules as cause-and-effect reasoning", text: "Each safety rule exists because of a known cause-and-effect relationship between an action and a possible harmful outcome, based on past observation and understanding of risk." },
      { part: "Example 1", text: "The rule 'never taste or smell unknown substances directly' exists because some substances can be harmful if inhaled or ingested -- the rule directly prevents this specific chain of cause and effect." },
      { part: "Example 2", text: "The rule 'keep the work area tidy' exists because clutter increases the chance of knocking something over, tripping, or mixing up materials by mistake -- the rule reduces the chance of this specific chain of events leading to an accident." },
      { part: "Why understanding reasoning matters", text: "Understanding WHY a rule exists (not just following it blindly) helps an investigator recognise new, unlisted situations that carry a similar hidden risk, rather than only avoiding the exact scenarios already listed." },
      { part: "Final Answer", text: "Safety rules are not arbitrary -- each one reflects a specific, reasoned understanding of how a particular action could lead to harm, which is itself a form of scientific, cause-and-effect thinking." }
    ]
  },
  {
    id: 20,
    question: "A group of investigators wants to find out whether a new fertiliser causes tomato plants to flower earlier than usual. Walk through the complete investigation from observation to conclusion, explaining the reasoning at every stage.",
    markingScheme: [
      "States a reasonable starting observation and question",
      "Proposes a testable hypothesis and prediction",
      "Correctly designs a fair experiment with identified variables and a control group",
      "Describes how results would be recorded and analysed",
      "Describes how a conclusion would be drawn and shared, with reasoning throughout"
    ],
    answerParts: [
      { part: "Observation and question", text: "Observation: some tomato plants given a new fertiliser seem to flower sooner than others. Question: does this new fertiliser cause tomato plants to flower earlier than usual?" },
      { part: "Hypothesis and prediction", text: "Hypothesis: the new fertiliser speeds up flowering in tomato plants. Prediction: tomato plants given the new fertiliser will show their first flowers in fewer days, on average, than identical plants given no special fertiliser." },
      { part: "Fair experiment design", text: "Independent variable: whether the new fertiliser is used. Dependent variable: number of days until the first flower appears. Controlled variables: same tomato variety, same amount of water and sunlight, same soil type and pot size. A control group of plants receives no special fertiliser, for comparison. Multiple plants (not just one) are used in each group." },
      { part: "Recording and analysis", text: "The exact flowering day for every plant in both groups is recorded honestly in a table as it happens, and the average flowering time for each group is then compared." },
      { part: "Conclusion and sharing", text: "If the fertiliser group consistently flowers earlier, on average, than the control group across many plants, this supports the hypothesis. The exact method, amounts, and results should be clearly shared so other investigators can repeat the test and verify the finding -- and any unexpected pattern noticed along the way could lead to a fresh new question." }
    ]
  },
];

// ── COMPETENCY / CASE-BASED (4 marks each) ──
export const SCIENCE8_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Wilting Balcony Plants",
    caseDescription: "Riya notices that the plants on her balcony wilt faster on very hot days compared to cooler days. She decides to investigate whether the amount of watering can prevent this wilting on hot days.",
    subQuestions: [
      { question: "What is Riya's initial observation?", answer: "Balcony plants wilt faster on very hot days compared to cooler days." },
      { question: "Suggest a testable hypothesis for Riya's investigation.", answer: "Giving plants more water on hot days reduces or prevents wilting, because extra water compensates for faster water loss in the heat." },
      { question: "Identify the independent variable and the dependent variable in Riya's planned test.", answer: "Independent variable: amount of water given on hot days. Dependent variable: amount of wilting observed (or whether the plant wilts at all)." },
      { question: "Name one variable Riya must keep controlled for her test to be fair.", answer: "Any one of: the type of plant used, the amount of sunlight each plant receives, or the size/type of pot -- these must be kept the same across the plants being compared." }
    ]
  },
  {
    id: 2,
    caseTitle: "Two Students, Two Very Different Tests",
    caseDescription: "Aman and Zoya both want to find out if a new toothpaste reduces cavities better than an older one. Aman gives the new toothpaste to just 1 friend for a week and asks if their teeth feel better. Zoya gives the new toothpaste to 30 students and the old toothpaste to another 30 students, checks with a dentist after two months, and keeps their diets and brushing routines as similar as possible.",
    subQuestions: [
      { question: "Whose test uses a larger, more reliable sample size?", answer: "Zoya's test, since she used 30 students in each group, rather than just 1 person." },
      { question: "Which controlled variable did Zoya specifically try to keep the same between groups, that Aman did not consider at all?", answer: "Diets and brushing routines -- Zoya tried to keep these similar between groups, while Aman made no such effort with just one participant." },
      { question: "Why is 'the teeth feel better' a weaker measurement than checking with a dentist after two months?", answer: "'Feels better' is a vague, personal impression, while a dentist's check gives a more objective, professional assessment -- similar to how a numeric measurement is stronger than a sense-based description." },
      { question: "Whose conclusion is more trustworthy, and why?", answer: "Zoya's conclusion is far more trustworthy, because she used a larger sample size, an objective measurement (a dentist's check), and controlled other variables like diet and brushing routine -- Aman's single-person, feeling-based test cannot support a reliable conclusion." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Case of the Foggy Mirror",
    caseDescription: "After a hot shower, Farhan notices that the bathroom mirror is completely fogged up, but a few minutes after opening the window, the fog disappears.",
    subQuestions: [
      { question: "State one direct observation Farhan made.", answer: "The bathroom mirror was fogged up after the hot shower." },
      { question: "State a reasonable inference Farhan could make about why the fog disappeared after opening the window.", answer: "The fresh air (likely cooler and drier) from the window helped clear the moisture from the mirror's surface." },
      { question: "Suggest a scientific question Farhan could investigate based on this observation.", answer: "Does opening a window reduce mirror fogging faster than leaving it closed after a hot shower?" },
      { question: "If Farhan wanted to test this fairly, what is one variable he would need to keep the same across his trials?", answer: "Any one of: the length/temperature of the shower, the size of the bathroom, or the starting room temperature -- these would need to be kept consistent for a fair comparison." }
    ]
  },
  {
    id: 4,
    caseTitle: "The Suspicious Health Drink Advertisement",
    caseDescription: "An advertisement claims, 'People who drink our health drink daily are, on average, healthier than people who don't -- so our drink makes you healthier!' The advertisement is based on a survey of people's existing habits, not a controlled experiment.",
    subQuestions: [
      { question: "What kind of relationship is being described between drinking the health drink and being healthier?", answer: "A correlation -- the two things (drinking the product and being healthier) are observed to occur together." },
      { question: "Explain why this correlation does not prove the drink CAUSES better health.", answer: "A hidden third factor could explain both -- for example, people who are already health-conscious might be more likely to both buy health drinks AND follow other healthy habits (like exercising), which could be the real reason for their better health." },
      { question: "What would need to be done to properly test whether the drink itself causes better health?", answer: "A fair, controlled experiment would be needed: give the drink to one group and not to a similar comparison group, while keeping other habits (diet, exercise, etc.) as similar as possible, then compare health outcomes afterward." },
      { question: "Based on the chapter's ideas, is the advertisement's conclusion scientifically justified? Explain.", answer: "No -- the advertisement confuses correlation with causation. A survey of existing habits cannot rule out other explanations, so a stronger, controlled test would be needed before concluding the drink itself causes better health." }
    ]
  },
  {
    id: 5,
    caseTitle: "The Overheard Playground Rumour",
    caseDescription: "A rumour spreads at school that a certain plant in the school garden 'moves away' when touched, and one curious student, Meera, decides to check it out herself rather than just believing the rumour.",
    subQuestions: [
      { question: "What is the first thing Meera should do to check this claim scientifically?", answer: "Directly observe the plant herself when it is touched, rather than relying only on what other people said." },
      { question: "If Meera observes the plant's leaves folding inward when touched, is this an observation or an inference?", answer: "An observation -- it directly describes what she noticed happening." },
      { question: "Meera then says, 'The plant is protecting itself from being eaten.' Is this an observation or an inference? Explain.", answer: "An inference -- it offers a possible explanation (protection from being eaten) for the observed folding, going beyond what was directly seen." },
      { question: "Why was it better for Meera to check the claim herself rather than just believing the playground rumour?", answer: "Because a rumour is not evidence -- direct observation lets Meera gather her own reliable evidence, rather than accepting an unverified claim from someone else." }
    ]
  },
  {
    id: 6,
    caseTitle: "The Careless Lab Report",
    caseDescription: "A student writes a lab report claiming that a plant food doubled plant growth, but the report does not mention how many plants were tested, what was used for comparison, or the exact amounts of plant food and water used.",
    subQuestions: [
      { question: "Name one important piece of missing information that makes this report hard to trust.", answer: "Any one of: the number of plants tested (sample size), what the plant food was compared against (whether there was a control group), or the exact amounts of plant food and water used." },
      { question: "Why is knowing the exact amounts used important for other investigators?", answer: "Without exact amounts, no one else could repeat the experiment under the same conditions to check whether they get a similar result." },
      { question: "If only one plant was tested, what problem would this cause for the claim?", answer: "A single plant's growth could be due to chance factors unrelated to the plant food, so no reliable conclusion could be drawn from just one case." },
      { question: "What should the student do to make the report trustworthy?", answer: "Clearly state the number of plants tested, describe a control group with no plant food for comparison, and report the exact amounts and conditions used, so the investigation can be properly checked and repeated by others." }
    ]
  },
  {
    id: 7,
    caseTitle: "The Kitchen Science Curiosity",
    caseDescription: "While helping in the kitchen, Kabir notices that a spoon of sugar dissolves faster in hot tea than in cold water, and wonders whether temperature is really the reason.",
    subQuestions: [
      { question: "What is Kabir's original observation?", answer: "Sugar dissolves faster in hot tea than in cold water." },
      { question: "Kabir also has hot tea (a liquid with tea leaves/milk) and cold plain water -- these two liquids differ in more than just temperature. Why is this a problem if he wants to test his idea properly?", answer: "Because more than one variable is different between the two liquids (temperature AND liquid composition), it would not be a fair test -- any difference in dissolving speed could be due to either factor, not necessarily just temperature." },
      { question: "Suggest how Kabir could redesign his test to make it fair.", answer: "He should compare sugar dissolving in hot plain water versus cold plain water (the same liquid, only the temperature different), so that temperature is the only variable being changed." },
      { question: "In Kabir's redesigned fair test, what is the independent variable and what is the dependent variable?", answer: "Independent variable: the water's temperature. Dependent variable: the time taken for the sugar to fully dissolve." }
    ]
  },
  {
    id: 8,
    caseTitle: "The Trusted Old Family Remedy",
    caseDescription: "A family has used a particular home remedy for a sore throat for generations and firmly believes it always works, based on it having 'worked' for family members many times before.",
    subQuestions: [
      { question: "Is the family's past experience with the remedy considered strong scientific evidence? Explain.", answer: "Not on its own -- it is closer to a collection of anecdotes (personal stories) rather than evidence from a properly controlled, repeated test, since other explanations (like the sore throat naturally getting better on its own) have not been ruled out." },
      { question: "Suggest one other reason the sore throat might have improved, besides the remedy actually working.", answer: "Sore throats often improve naturally over a few days on their own, with or without any remedy -- this possibility has not been ruled out by the family's experience alone." },
      { question: "What would a fair test of the remedy's effectiveness look like?", answer: "A fair test would compare a group using the remedy against a similar control group not using it (or using a comparison treatment), keeping other factors similar, and measuring recovery time in both groups." },
      { question: "Does this mean the remedy definitely does not work? Explain your reasoning.", answer: "No -- it simply means the family's experience alone is not strong enough evidence to be certain either way. The remedy could still work, but a proper fair test would be needed to know this with confidence." }
    ]
  },
  {
    id: 9,
    caseTitle: "The Group Project on Recycling",
    caseDescription: "A team of four students is investigating which type of material (paper, plastic, or cloth) decomposes fastest when buried in soil. Each team member takes charge of a different part of the investigation: one buries the samples, one takes weekly photographs, one researches background information, and one records all the data in a table.",
    subQuestions: [
      { question: "Why might dividing the investigation among four team members (with different roles) be more effective than one student doing everything alone?", answer: "Different tasks (burying samples, photographing, researching, recording) can be handled more thoroughly when spread across people with focused responsibilities, rather than one person trying to manage everything, which could lead to missed details." },
      { question: "Which team role is most directly responsible for making sure results are recorded honestly and clearly?", answer: "The student in charge of recording all the data in a table." },
      { question: "Suggest one controlled variable this team should keep the same for all three materials being tested.", answer: "Any one of: the depth at which each material is buried, the type of soil used, or the amount of moisture in the soil -- these should be kept identical for a fair comparison." },
      { question: "After finishing, the team wants other classes to be able to check their findings. What should they make sure to include when sharing their results?", answer: "A clear description of their exact method (how deep they buried samples, what soil/conditions were used, how often they checked) along with their recorded data, so other classes could repeat the investigation and verify the findings." }
    ]
  },
  {
    id: 10,
    caseTitle: "The Unexpected Mould Discovery",
    caseDescription: "A student accidentally leaves a piece of bread out for several days while working on an unrelated science project, and later notices mould growing on it in an interesting pattern, sparking curiosity about what affects mould growth.",
    subQuestions: [
      { question: "Is noticing the mould pattern an example of a planned observation or a chance observation? Explain.", answer: "A chance observation -- it was noticed by accident while the student was working on something unrelated, not as part of a planned investigation." },
      { question: "Does noticing the mould pattern by itself count as a completed scientific discovery? Explain why or why not.", answer: "No -- it is only the starting observation. It would still need to be turned into a testable question, investigated with a fair experiment, and confirmed before it could be considered a genuine, accepted finding." },
      { question: "Suggest a scientific question the student could now investigate based on this chance observation.", answer: "Does the amount of moisture on bread affect how quickly mould grows on it?" },
      { question: "Explain how the phrase 'chance favours the prepared mind' applies to this situation.", answer: "The mould was noticed by accident, but only because the student was curious and observant enough to notice the pattern and wonder about it -- someone less curious might have thrown the bread away without a second thought." }
    ]
  },
  {
    id: 11,
    caseTitle: "The Classroom Debate on 'Lucky' Charms",
    caseDescription: "During a class discussion, one student claims that wearing a certain bracelet made them perform better in a recent sports match, and several classmates start to believe wearing similar bracelets might help them too.",
    subQuestions: [
      { question: "Is the student's claim based on a controlled scientific test or a personal anecdote? Explain.", answer: "A personal anecdote -- it is a single, unverified personal story, not a result from a properly controlled, repeated test." },
      { question: "Suggest one alternative explanation for the student's good performance, besides the bracelet.", answer: "The student may have simply practised more, felt more confident that day, or the match conditions may have suited their style of play -- any of these could explain the performance instead of the bracelet." },
      { question: "How could the class design a fair test to actually check whether the bracelet affects performance?", answer: "Test a reasonably large group of students performing the same task, with half wearing the bracelet and half not (kept otherwise as similar as possible in practice level and conditions), and compare their average performance." },
      { question: "Why is it important not to accept the bracelet claim just because several classmates now believe it?", answer: "Popularity of a belief does not make it true -- scientific claims need to be checked against evidence from a fair test, not accepted simply because many people agree with it." }
    ]
  },
  {
    id: 12,
    caseTitle: "The Weather Station Volunteer",
    caseDescription: "Ibrahim volunteers to record the daily temperature and rainfall near his home for a school project, using a thermometer and a simple rain gauge, and plans to keep this record for a full year.",
    subQuestions: [
      { question: "Why is using a thermometer and rain gauge better than estimating 'how hot' or 'how much it rained' just by feeling and looking?", answer: "Instruments give precise, standard measurements that can be exactly compared day to day, while a feeling-based estimate ('quite hot', 'a lot of rain') is vague and can vary between different people's impressions." },
      { question: "Why is it important for Ibrahim to record his readings at the same time each day?", answer: "Keeping the time of day the same is a controlled variable -- temperature naturally changes throughout the day, so recording at inconsistent times could make results hard to fairly compare from one day to another." },
      { question: "One day, Ibrahim gets an unusually high temperature reading that seems odd to him. What should he do?", answer: "He should still record it honestly, exactly as measured -- even an unexpected or unusual reading is genuine data and should not be left out or changed just because it seems surprising." },
      { question: "Explain one way Ibrahim's full year of recorded data could be useful to other people later.", answer: "Other investigators or classes studying local weather patterns over time could use his carefully recorded, dated data as a starting resource, rather than needing to collect an entire year of new data themselves." }
    ]
  },
  {
    id: 13,
    caseTitle: "The Two Bakeries' Bread Rising Test",
    caseDescription: "Two bakeries want to know if a new type of yeast makes bread dough rise higher. Bakery A tests the new yeast on 20 identical batches of dough, comparing them to 20 batches with the old yeast, keeping the flour, water amount, and rising time the same for all batches. Bakery B tests the new yeast on just 2 batches and compares them to their memory of how dough 'usually' rises with the old yeast.",
    subQuestions: [
      { question: "Which bakery used a more reliable sample size, and why?", answer: "Bakery A, since it tested 20 batches per condition rather than just 2, reducing the chance that an unusual single batch affects the overall conclusion." },
      { question: "What is the key weakness in Bakery B's comparison method?", answer: "Bakery B compared their new results only to a MEMORY of past results, rather than to an actual, directly measured control batch made under the exact same conditions at the same time -- memory can be inaccurate, unlike a real, recorded comparison." },
      { question: "Name two variables Bakery A kept controlled between its batches.", answer: "Flour amount and water amount (also acceptable: rising time) -- these were kept the same across all batches so only the yeast type differed." },
      { question: "Whose conclusion about the new yeast would be more trustworthy, and why?", answer: "Bakery A's conclusion would be more trustworthy, because it used a larger, more reliable sample size, a genuine directly-measured control group, and properly controlled variables -- all of which Bakery B's approach lacked." }
    ]
  },
  {
    id: 14,
    caseTitle: "The Mysterious Fading Photograph",
    caseDescription: "A student notices that an old photograph kept near a sunny window has faded much more than an identical photograph of the same age kept inside a drawer, and wants to investigate why.",
    subQuestions: [
      { question: "State the direct observation in this scenario.", answer: "The photograph kept near the sunny window has faded more than the identical photograph kept inside a drawer." },
      { question: "Suggest a reasonable inference the student could make from this observation.", answer: "Sunlight exposure may cause photographs to fade faster than being kept away from sunlight." },
      { question: "Turn this inference into a testable hypothesis and a specific prediction.", answer: "Hypothesis: exposure to sunlight causes photographs to fade faster. Prediction: if two identical new photographs are placed in the sun and in a dark drawer for the same length of time, the one in the sun will show more fading." },
      { question: "Name one variable that must be controlled for a fair test of this hypothesis.", answer: "Any one of: using identical photographs (same type, same age when the test starts), the same length of time for both, or similar room temperature/humidity for both locations." }
    ]
  },
  {
    id: 15,
    caseTitle: "The School Science Fair Judge's Feedback",
    caseDescription: "A judge at a school science fair gives feedback to a student: 'Your idea is interesting, but you only tested this once, you did not have anything to compare your result against, and you did not explain exactly how you measured your results.'",
    subQuestions: [
      { question: "Which weakness mentioned by the judge relates to sample size?", answer: "Testing the idea 'only once' -- a single trial does not give a reliable result, since it could easily reflect an unusual, chance outcome." },
      { question: "Which weakness mentioned by the judge relates to the idea of a control group?", answer: "Not having 'anything to compare your result against' -- without a control or comparison group, it is impossible to judge whether the tested factor actually made a difference." },
      { question: "Which weakness relates to recording and communicating results properly?", answer: "Not explaining 'exactly how you measured your results' -- without a clearly described method, other people cannot judge, repeat, or verify the investigation." },
      { question: "If the student wants to fix all three issues for next year, summarise what they should do differently.", answer: "Repeat the test multiple times (or on multiple samples) for reliability, include a proper control group for comparison, and clearly record and describe the exact measurement method used, so the investigation can be trusted and repeated by others." }
    ]
  },
  {
    id: 16,
    caseTitle: "The Disagreement Between Two Investigators",
    caseDescription: "Two investigators test the same hypothesis about how quickly a certain type of paper burns, but they get noticeably different results. Instead of arguing about whose result is correct, they decide to compare their exact methods.",
    subQuestions: [
      { question: "Why is comparing their exact methods a more useful first step than simply arguing about the numbers?", answer: "Comparing methods can reveal an actual difference in how the experiments were carried out (such as a variable that was not controlled the same way), which is a more productive way to explain the different results than arguing without evidence." },
      { question: "Suppose they discover that one investigator used a slightly different type of paper. What does this suggest about their experiments?", answer: "It suggests the two experiments were not truly identical -- the paper type itself may have been an uncontrolled variable, which could fully explain why their results differed." },
      { question: "After fixing this difference, they repeat the test using the identical paper type and get matching results. What does this achievement demonstrate about their finding?", answer: "It demonstrates that the finding is reproducible once the experiment is properly controlled, which builds much stronger confidence that the result reflects a genuine effect rather than an error or coincidence." },
      { question: "What general lesson about scientific investigation does this scenario illustrate?", answer: "It illustrates that differing results between investigators are often due to differences in method (uncontrolled variables) rather than one investigator being simply 'wrong' -- careful comparison of methods, not argument, is the useful way to resolve such disagreements." }
    ]
  },
  {
    id: 17,
    caseTitle: "The Overly Confident Conclusion",
    caseDescription: "After testing only 3 students, a young researcher confidently announces, 'I have proven that listening to music while studying always improves test scores for everyone.'",
    subQuestions: [
      { question: "What is the main issue with the researcher's sample size?", answer: "Testing only 3 students is far too small a sample to draw a general conclusion about 'everyone' -- individual differences between just 3 people could easily explain any pattern seen, by chance alone." },
      { question: "Is the word 'always' appropriate here, based on the chapter's ideas about scientific claims? Explain.", answer: "No -- claiming something is 'always' true based on such limited testing is an overreach; a small, uncontrolled test cannot support such a strong, universal claim." },
      { question: "Suggest a more careful, appropriately worded conclusion the researcher could state instead.", answer: "'In this small test, the 3 students who listened to music while studying scored slightly higher, but a much larger and more controlled study would be needed to draw a general conclusion.'" },
      { question: "What controlled variables should the researcher consider adding to strengthen a future, larger version of this test?", answer: "Any relevant ones, such as: keeping the study material and study duration the same for all participants, keeping the type/volume of music consistent, and ensuring the students have similar prior knowledge of the material being studied." }
    ]
  },
  {
    id: 18,
    caseTitle: "The Instrument Malfunction",
    caseDescription: "During an experiment measuring water temperature, a student's thermometer is later found to have been giving readings 3 degrees higher than the actual temperature throughout the entire investigation.",
    subQuestions: [
      { question: "Does this faulty thermometer affect the reliability of the recorded data? Explain.", answer: "Yes -- since every reading was 3 degrees too high, all the recorded temperature data is inaccurate, even though the readings were recorded honestly." },
      { question: "Is this an example of dishonest recording, or something else? Explain the difference.", answer: "This is not dishonest recording -- the student recorded the readings accurately as shown by the thermometer. The problem is a faulty INSTRUMENT, not dishonesty; the two are different kinds of problems with different fixes." },
      { question: "What should the student do upon discovering the thermometer's fault?", answer: "Report the fault honestly, and either repeat the investigation with a properly working thermometer or clearly note the correction (subtracting 3 degrees) when sharing the results, so others are not misled." },
      { question: "Why is it good practice to check measuring instruments before starting an important investigation?", answer: "Checking instruments beforehand (for example, comparing against a known reference) helps catch faults early, preventing an entire set of results from being made unreliable by an undetected instrument error." }
    ]
  },
  {
    id: 19,
    caseTitle: "The Community Garden Experiment",
    caseDescription: "A community garden group wants to know whether adding compost to soil helps vegetables grow bigger. They divide their garden into two equal sections: one gets compost added, and the other does not, with everything else (watering, sunlight, vegetable type) kept the same.",
    subQuestions: [
      { question: "Identify the independent variable in this investigation.", answer: "Whether compost is added to the soil or not." },
      { question: "Identify the dependent variable in this investigation.", answer: "The size (growth) of the vegetables." },
      { question: "Which section of the garden is acting as the control group?", answer: "The section without compost added, since it serves as the baseline for comparison against the compost-treated section." },
      { question: "Suggest one improvement the group could make to strengthen their conclusion even further.", answer: "Repeat the comparison across multiple smaller plots within each section (rather than just one plot per condition), so the conclusion is based on multiple samples rather than a single comparison, reducing the effect of chance." }
    ]
  },
  {
    id: 20,
    caseTitle: "The Viral Online Claim",
    caseDescription: "A video goes viral online claiming that a certain common houseplant can 'purify the air of an entire room' based only on the video creator's personal experience of 'feeling fresher' after buying the plant.",
    subQuestions: [
      { question: "What kind of evidence is the video creator's claim based on?", answer: "A personal anecdote -- a single, unverified personal impression, not a result from a controlled, measured test." },
      { question: "Suggest one alternative explanation for why the video creator might have 'felt fresher', besides the plant purifying the air.", answer: "Any reasonable alternative, such as: the room may have simply been cleaned or tidied around the same time, the person's mood may have improved from enjoying a new hobby, or they may have also opened a window around the same time." },
      { question: "What would a fair, controlled test of this claim need to measure, instead of a feeling?", answer: "Actual, standard measurements of air quality (such as specific gas concentrations) in identical rooms with and without the plant, kept otherwise as similar as possible, rather than relying on how someone subjectively feels." },
      { question: "Should this viral claim be accepted as scientific fact based on the video alone? Explain.", answer: "No -- a single personal anecdote, without controlled measurement or a comparison group, does not meet the standard of scientific evidence needed to accept such a claim as fact." }
    ]
  },
];

// ── SELF-ASSESSMENT (independent mixed set, matching the MCQ format) ──
export const SCIENCE8_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "Science is best understood as:", options: ["A fixed set of unchangeable facts", "A systematic process of observing, questioning, and testing", "A collection of personal opinions", "A subject with no real method"], correctAnswer: 1, explanation: "Science is fundamentally a process built on observation, questioning, and fair testing." },
  { id: 2, question: "What usually triggers the start of a scientific investigation?", options: ["A textbook assignment only", "Curiosity about an observation", "A random decision", "A safety rule"], correctAnswer: 1, explanation: "Curiosity about something noticed (an observation) is the usual starting point." },
  { id: 3, question: "'The paint on the wall has peeled.' This is an example of:", options: ["An inference", "An observation", "A hypothesis", "A controlled variable"], correctAnswer: 1, explanation: "This states only what was directly seen, making it an observation." },
  { id: 4, question: "'The paint peeled because of moisture in the wall.' This is an example of:", options: ["An observation", "An inference", "A prediction", "A tool"], correctAnswer: 1, explanation: "This adds a reasoned explanation, making it an inference." },
  { id: 5, question: "A hypothesis must always be:", options: ["Proven true already", "Testable", "Based only on opinion", "Impossible to check"], correctAnswer: 1, explanation: "A hypothesis must be testable so evidence can support or disprove it." },
  { id: 6, question: "A prediction is best described as:", options: ["The same as an observation", "A specific expected result if the hypothesis is true", "A safety rule", "An untestable guess"], correctAnswer: 1, explanation: "A prediction states specifically what should be observed if the hypothesis holds." },
  { id: 7, question: "The variable deliberately changed by the investigator is called the:", options: ["Dependent variable", "Independent variable", "Controlled variable", "Constant"], correctAnswer: 1, explanation: "The independent variable is the one the investigator chooses to change on purpose." },
  { id: 8, question: "The variable measured as the outcome of an experiment is called the:", options: ["Independent variable", "Dependent variable", "Hypothesis", "Prediction"], correctAnswer: 1, explanation: "The dependent variable is measured to see the effect of the independent variable." },
  { id: 9, question: "Variables kept the same throughout an experiment are called:", options: ["Independent variables", "Controlled variables", "Random variables", "Dependent variables"], correctAnswer: 1, explanation: "Controlled variables are held constant so they cannot influence the result." },
  { id: 10, question: "A fair test changes:", options: ["Every variable at once", "Only the independent variable", "No variables at all", "Only the dependent variable"], correctAnswer: 1, explanation: "A fair test changes only the independent variable, keeping all else the same." },
  { id: 11, question: "The purpose of a control group is to:", options: ["Make the experiment longer", "Act as a baseline for comparison", "Replace measurements", "Confuse the result"], correctAnswer: 1, explanation: "A control group shows what happens without the treatment, for comparison." },
  { id: 12, question: "Correct order of the cycle of scientific inquiry:", options: ["Question, Observation, Experiment, Hypothesis, Conclusion, Analysis", "Observation, Question, Hypothesis, Experiment, Analysis, Conclusion", "Hypothesis, Experiment, Observation, Question, Analysis, Conclusion", "Conclusion, Analysis, Experiment, Hypothesis, Question, Observation"], correctAnswer: 1, explanation: "The standard order is Observation, Question, Hypothesis, Experiment, Analysis, Conclusion." },
  { id: 13, question: "Why is scientific inquiry described as a cycle?", options: ["Because it always takes a full year", "Because a conclusion can raise a new question, restarting the process", "Because it has no defined stages", "Because experiments are never repeated"], correctAnswer: 1, explanation: "A conclusion often raises new questions, looping back into the process." },
  { id: 14, question: "Should a scientific conclusion ever be revised?", options: ["No, it is always final", "Yes, if new evidence contradicts it", "Only if a teacher says so", "Conclusions are never evidence-based"], correctAnswer: 1, explanation: "Conclusions rest on current evidence and can be revised when new evidence appears." },
  { id: 15, question: "Why should results be recorded immediately?", options: ["To use less paper", "Because memory can be inaccurate later", "It does not matter when", "To make reports longer"], correctAnswer: 1, explanation: "Immediate recording avoids errors from forgetting details later." },
  { id: 16, question: "An unexpected result during an experiment should be:", options: ["Left out of the report", "Reported honestly along with all other results", "Changed to match expectations", "Ignored completely"], correctAnswer: 1, explanation: "All genuine results, expected or not, must be reported honestly." },
  { id: 17, question: "Which tool measures time taken for a process?", options: ["Ruler", "Stopwatch", "Weighing balance", "Measuring cylinder"], correctAnswer: 1, explanation: "A stopwatch is designed to measure elapsed time." },
  { id: 18, question: "Which tool measures the volume of a liquid?", options: ["Measuring cylinder", "Thermometer", "Stopwatch", "Hand lens"], correctAnswer: 0, explanation: "A measuring cylinder is marked in millilitres for measuring liquid volume." },
  { id: 19, question: "Why is a numeric measurement better than a sense-based description?", options: ["It is always shorter to write", "It is precise and means the same to everyone", "It requires no instrument", "There is no real advantage"], correctAnswer: 1, explanation: "A numeric, standard measurement can be compared exactly, unlike a vague impression." },
  { id: 20, question: "An important safety rule during an investigation is:", options: ["Taste unknown substances carefully", "Follow instructions exactly and avoid untested steps", "Keep the work area cluttered", "Ignore small spills"], correctAnswer: 1, explanation: "Following approved instructions and avoiding untested steps keeps an investigation safe." },
  { id: 21, question: "Why do modern investigations often involve teamwork?", options: ["It is required by law", "Different members bring different skills and knowledge", "Teams work slower on purpose", "There is no benefit to teamwork"], correctAnswer: 1, explanation: "Combining different skills allows a fuller investigation than one person alone." },
  { id: 22, question: "A 'chance discovery' (serendipity) is:", options: ["A planned, step-by-step result only", "An accidental observation recognised as important by a prepared mind", "Always false", "The same as a controlled variable"], correctAnswer: 1, explanation: "A chance discovery happens by accident, but only a prepared, curious mind recognises its importance." },
  { id: 23, question: "Why does a chance observation still need further investigation?", options: ["It does not need any further work", "It must still be tested and confirmed through the scientific process", "Chance observations are never useful", "Only planned experiments count as observations"], correctAnswer: 1, explanation: "An accidental observation is only a starting point -- it still needs proper testing and confirmation." },
  { id: 24, question: "'Ice cream sales and sunburn cases both rise in summer.' Concluding ice cream causes sunburn is an example of:", options: ["A fair test", "Confusing correlation with causation", "A controlled variable", "Reproducibility"], correctAnswer: 1, explanation: "Both are likely caused by a third factor (hot weather), not by one causing the other." },
  { id: 25, question: "A result is 'reproducible' if:", options: ["Only the original investigator can get it", "Other investigators get a similar result using the same method", "It can never be tested again", "It is based on a single anecdote"], correctAnswer: 1, explanation: "Reproducibility means others repeating the method get a similar result." },
  { id: 26, question: "'Observer bias' means:", options: ["Using a broken instrument only", "Unconsciously favouring results that match expectations", "A rule about lab safety", "A type of independent variable"], correctAnswer: 1, explanation: "Observer bias is the unintentional tendency to notice results that confirm expectations." },
  { id: 27, question: "A single personal story used as evidence is called:", options: ["A controlled experiment", "An anecdote", "A fair test", "A dependent variable"], correctAnswer: 1, explanation: "An anecdote is a single, unverified personal account, weaker than controlled evidence." },
  { id: 28, question: "Why is peer checking of scientific findings important?", options: ["It has no real purpose", "It helps catch errors or weak conclusions before wide acceptance", "It removes the need for evidence", "It always confirms the original finding"], correctAnswer: 1, explanation: "Other experts reviewing work can catch mistakes or unfair test designs." },
  { id: 29, question: "A student tests a claim on only 1 sample and generalises to 'everyone'. The main flaw is:", options: ["The sample size is too small", "The claim is too specific", "The test took too long", "There is no flaw"], correctAnswer: 0, explanation: "A single sample cannot reliably support a broad, general conclusion." },
  { id: 30, question: "Overall, a trustworthy investigation needs:", options: ["Guesswork and no controls", "A fair test, honest recording, and a shareable method", "Only one trial, kept secret", "Personal opinion instead of evidence"], correctAnswer: 1, explanation: "Trustworthy investigations rest on fair testing, honest recording, and open, repeatable methods." },
];
