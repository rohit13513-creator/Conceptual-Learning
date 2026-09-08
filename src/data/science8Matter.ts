// Class 8 Science -- Chapter: Particulate Nature of Matter (constituent particles, interparticle
// spaces and attraction, the solid/liquid/gas states, melting and boiling points, diffusion, and
// how thermal energy governs the state of matter). Every fact below reflects the verified content
// of the chapter, and every answer states the reason behind it, not just the conclusion.
import type {
  QuizQuestion,
  NCERTSolvedQuestion,
  ShortQuestion,
  LongQuestion,
  CompetencyQuestion,
} from "../types-custom";

// ── SOLVED PRACTICE QUESTIONS ──
export const SCIENCE8M_SOLVED_QUESTIONS: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Practice Q1",
    question: "A piece of chalk is broken repeatedly and finally ground into a fine powder. Explain what this demonstrates about matter, and what it does not change.",
    given: { "Activity": "Repeatedly breaking and grinding chalk" },
    formulaUsed: "Matter is composed of extremely small constituent particles; grinding is a physical change, not a chemical one.",
    derivationSteps: [
      "Breaking chalk into smaller and smaller pieces eventually produces a fine powder that is difficult to break further by hand.",
      "Grinding this powder further and imagining the process continuing shows that the chalk must be made of a very large number of much smaller units.",
      "At every stage, the substance is still chalk -- only the size of each piece has changed, not what it is made of."
    ],
    finalAnswer: "This activity demonstrates that chalk (and all matter) is made of extremely small constituent particles; it confirms a change in size, not a change into a new substance.",
    conceptualTip: "Any grinding, crushing, or breaking activity is a physical change -- the substance's identity stays the same all the way down to its constituent particles."
  },
  {
    id: 2,
    questionNumber: "Practice Q2",
    question: "Sugar is stirred into water until it can no longer be seen. The water tastes sweet throughout. Explain where the sugar has gone.",
    given: { "Observation": "Dissolved sugar cannot be seen but the water tastes sweet" },
    formulaUsed: "Dissolved substances break into constituent particles that occupy interparticle spaces.",
    derivationSteps: [
      "When sugar dissolves, it breaks up into its own constituent particles.",
      "These particles are far too small to see, but they spread evenly throughout the water.",
      "The particles occupy the interparticle spaces that already exist between the water's own particles.",
      "Since the sugar particles are still present throughout the water, the sweet taste can still be sensed."
    ],
    finalAnswer: "The sugar has broken into constituent particles too small to see, which have spread through the interparticle spaces between the water particles -- this is why the water tastes sweet even though no sugar can be seen.",
    conceptualTip: "'Disappearing' when dissolved does not mean a substance is gone -- it means its particles have spread out too finely to see individually."
  },
  {
    id: 3,
    questionNumber: "Practice Q3",
    question: "Explain why solids have a definite shape and volume, referring to interparticle attraction.",
    given: { "State": "Solid" },
    formulaUsed: "Strong interparticle attraction holds solid particles in fixed positions.",
    derivationSteps: [
      "In solids, particles are packed closely together.",
      "The interparticle attraction between them is very strong.",
      "This strong attraction holds each particle in a fixed position, allowing only small vibrations, not free movement.",
      "Since particles cannot move from their positions, the overall shape and volume of the solid stay fixed."
    ],
    finalAnswer: "Solids have a definite shape and volume because strong interparticle attraction locks their particles into fixed positions, allowing only vibration, not movement.",
    conceptualTip: "Whenever a question asks 'why does X have a fixed shape', the answer should trace back to how strongly the particles are held in place."
  },
  {
    id: 4,
    questionNumber: "Practice Q4",
    question: "Water is heated steadily until it reaches its boiling point. Explain, in terms of particle behaviour, what happens as this temperature is reached and passed.",
    given: { "Process": "Heating water to its boiling point" },
    formulaUsed: "At the boiling point, particles gain enough energy to escape the liquid throughout its volume, not just at the surface.",
    derivationSteps: [
      "As water is heated, its particles move more and more vigorously.",
      "At the boiling point, this movement becomes vigorous enough that particles can escape from the liquid not only at the surface, but throughout the entire liquid.",
      "This rapid escape of particles throughout the liquid is observed as bubble formation.",
      "The liquid steadily converts into vapour (the gaseous state) as this continues."
    ],
    finalAnswer: "At the boiling point, water particles gain enough energy to escape throughout the whole liquid (seen as bubbling), converting the liquid into vapour.",
    conceptualTip: "Boiling and evaporation are often confused -- boiling happens at one fixed temperature and occurs throughout the liquid, while evaporation is a slower, surface-only process that can happen at any temperature."
  },
  {
    id: 5,
    questionNumber: "Practice Q5",
    question: "A syringe filled only with trapped air is compressed by pushing its plunger, while an identical syringe filled with water barely compresses at all. Explain this difference.",
    given: { "Two syringes": "One with trapped air, one with water" },
    formulaUsed: "Gases have large interparticle spacing; liquids have very little space left to compress.",
    derivationSteps: [
      "The air-filled syringe contains gas particles that have a great deal of empty interparticle space between them.",
      "Pushing the plunger forces these particles closer together, using up this available space -- this is why the volume can decrease noticeably.",
      "The water-filled syringe contains liquid particles that are already packed closely together, with very little interparticle space left.",
      "Since there is very little space left to remove, pushing the plunger produces almost no change in volume."
    ],
    finalAnswer: "Gas is compressible because its particles have large interparticle spaces that can be reduced; water is practically incompressible because its particles are already packed closely with very little space left.",
    conceptualTip: "Compressibility is really just a test of how much unused interparticle space a substance has available."
  },
  {
    id: 6,
    questionNumber: "Practice Q6",
    question: "Two teaspoons of sugar are added to water and the water level is marked before and after dissolving. Explain why the final water level is not simply the sum of the two original volumes.",
    given: { "Activity": "Marking water levels before and after dissolving sugar" },
    formulaUsed: "Dissolved particles occupy existing interparticle spaces rather than adding fully separate volume.",
    derivationSteps: [
      "Before dissolving, adding solid sugar increases the water level, since the solid sugar takes up its own separate space.",
      "Once the sugar dissolves, its particles move into the interparticle spaces that already exist between the water particles.",
      "Since the dissolved sugar now shares space with the water rather than occupying entirely separate space, the final volume is less than simply adding the two original volumes together."
    ],
    finalAnswer: "The final volume is less than the sum of the two volumes because the dissolved sugar particles occupy existing interparticle spaces in the water rather than adding completely separate volume.",
    conceptualTip: "This activity is one of the clearest pieces of evidence that interparticle spaces genuinely exist and are large enough for other particles to fit into."
  },
  {
    id: 7,
    questionNumber: "Practice Q7",
    question: "A single grain of a coloured substance is dropped into still water and, without stirring, the whole glass eventually turns the same colour. Explain why, and describe how temperature would affect this process.",
    given: { "Activity": "Colour spreading through still water" },
    formulaUsed: "Diffusion happens due to the constant, random motion of particles, and speeds up with higher temperature.",
    derivationSteps: [
      "Water particles are always in constant, random motion, even without any stirring.",
      "This motion knocks particles off the coloured grain and carries them throughout the water.",
      "Over time, these particles spread evenly, giving the whole glass a uniform colour -- this is diffusion.",
      "In hotter water, particles move faster, so this spreading (diffusion) happens more quickly; in colder water, particles move slower, so diffusion is slower."
    ],
    finalAnswer: "The colour spreads on its own because water particles are always moving and carry the dissolved particles throughout the liquid; higher temperature speeds up this diffusion, and lower temperature slows it down.",
    conceptualTip: "Diffusion happening without any stirring is the clearest possible evidence that particles are always moving on their own."
  },
  {
    id: 8,
    questionNumber: "Practice Q8",
    question: "Explain, using the relationship between heat energy, interparticle distance, and interparticle attraction, why a substance changes from solid to liquid to gas as it is heated.",
    given: { "Concept": "Heat energy and change of state" },
    formulaUsed: "Heat energy increases interparticle distance, which weakens interparticle attraction.",
    derivationSteps: [
      "In the solid state, particles have low heat energy, stay close together, and are held by strong interparticle attraction, allowing only vibration.",
      "As heat energy increases, particles vibrate more, and at the melting point, enough energy is available to let particles move out of their fixed positions -- the solid becomes a liquid.",
      "With even more heat energy, interparticle distance increases further, weakening attraction further, until particles can move freely in all directions -- the liquid becomes a gas."
    ],
    finalAnswer: "As heat energy increases, interparticle distance increases and interparticle attraction weakens, moving a substance from solid to liquid to gas.",
    conceptualTip: "This one chain of reasoning -- more heat energy, more distance, weaker attraction, more freedom of movement -- explains every change of state in this chapter."
  },
  {
    id: 9,
    questionNumber: "Practice Q9",
    question: "An incense stick is lit in one corner of a closed room. Explain, using particle motion, why its fragrance is eventually smelled throughout the room.",
    given: { "Activity": "Incense stick fragrance spreading through a room" },
    formulaUsed: "Air particles are in constant motion and carry fragrance particles by diffusion.",
    derivationSteps: [
      "The air in the room is made of particles that are constantly moving in all directions.",
      "These moving air particles collide with and carry the fragrance particles released by the incense stick.",
      "Over time, this constant motion spreads the fragrance particles further and further, eventually reaching every part of the room."
    ],
    finalAnswer: "The fragrance spreads throughout the room because the constantly moving air particles carry the fragrance particles outward in all directions -- diffusion in a gas.",
    conceptualTip: "The same underlying idea (diffusion caused by constant particle motion) explains spreading colour in water and spreading smell in air -- only the state of matter differs."
  },
  {
    id: 10,
    questionNumber: "Practice Q10",
    question: "Explain why sand does not dissolve in water, even though water particles are constantly moving.",
    given: { "Observation": "Sand remains undissolved in water" },
    formulaUsed: "Dissolving requires water particles to be able to pull a substance's particles apart; this depends on how strongly that substance's particles are held together.",
    derivationSteps: [
      "For a substance to dissolve, moving water particles must be able to pull its constituent particles away from each other.",
      "In sand, the constituent particles are held together by forces too strong for water particles to overcome.",
      "As a result, sand particles are not pulled apart and spread through the water -- sand simply settles instead."
    ],
    finalAnswer: "Sand does not dissolve because its constituent particles are held together too strongly for water particles to pull them apart, unlike substances such as sugar.",
    conceptualTip: "Whether something dissolves depends on a tug-of-war between water's pulling action and how strongly the substance's own particles are held together."
  },
];

// ── MCQs (1 mark each) ──
export const SCIENCE8M_MCQS: QuizQuestion[] = [
  { id: 1, question: "Matter is composed of:", options: ["A single, unbreakable block", "Extremely small constituent particles", "Only visible dust particles", "Nothing at all"], correctAnswer: 1, explanation: "Matter is made of extremely small constituent particles." },
  { id: 2, question: "Grinding a piece of chalk into fine powder is an example of:", options: ["A chemical change", "A physical change", "A change into a new substance", "No change at all"], correctAnswer: 1, explanation: "Grinding only changes the size of the pieces; it remains chalk, so it is a physical change." },
  { id: 3, question: "Sugar dissolved in water can no longer be seen, but the water tastes sweet because:", options: ["The sugar disappeared completely", "Sugar particles are spread through the water, too small to see", "The water changed into sugar", "Taste has nothing to do with particles"], correctAnswer: 1, explanation: "The dissolved sugar particles are present throughout the water, too small to see, but detectable by taste." },
  { id: 4, question: "The empty gap between constituent particles is called:", options: ["Interparticle attraction", "Interparticle space", "A molecule", "A melting point"], correctAnswer: 1, explanation: "Interparticle space is the empty gap between particles." },
  { id: 5, question: "Interparticle attraction is the force that:", options: ["Pushes particles apart", "Holds constituent particles together", "Has nothing to do with particle spacing", "Only exists in gases"], correctAnswer: 1, explanation: "Interparticle attraction holds particles together." },
  { id: 6, question: "The strength of interparticle attraction depends on:", options: ["Only the colour of the substance", "The nature of the substance and the distance between particles", "Nothing at all", "Only the temperature of the room"], correctAnswer: 1, explanation: "Interparticle attraction depends on the substance's nature and the distance between its particles." },
  { id: 7, question: "A small increase in the distance between particles causes their attraction to:", options: ["Increase drastically", "Decrease drastically", "Stay exactly the same", "Become negative"], correctAnswer: 1, explanation: "Even a slight increase in distance decreases interparticle attraction drastically." },
  { id: 8, question: "Acharya Kanad proposed the early idea of indivisible particles called:", options: ["Molecules", "Parmanu", "Electrons", "Atoms only"], correctAnswer: 1, explanation: "Acharya Kanad proposed the idea of 'Parmanu' in the Vaisheshika Sutras." },
  { id: 9, question: "In solids, particles are:", options: ["Free to move anywhere", "Tightly packed and fixed in position", "Spread far apart", "Not attracted to each other at all"], correctAnswer: 1, explanation: "Solid particles are tightly packed and held in fixed positions." },
  { id: 10, question: "Particles in a solid can:", options: ["Move past one another freely", "Only vibrate about a fixed position", "Escape the solid easily", "Move only in gases"], correctAnswer: 1, explanation: "Solid particles can only vibrate about their fixed position." },
  { id: 11, question: "The minimum temperature at which a solid becomes a liquid at atmospheric pressure is called its:", options: ["Boiling point", "Melting point", "Freezing space", "Diffusion point"], correctAnswer: 1, explanation: "This is the definition of melting point." },
  { id: 12, question: "The melting point of ice is:", options: ["100 degrees Celsius", "0 degrees Celsius", "133 degrees Celsius", "1538 degrees Celsius"], correctAnswer: 1, explanation: "Ice melts at 0 degrees Celsius." },
  { id: 13, question: "The melting point of iron is approximately:", options: ["0 degrees Celsius", "133 degrees Celsius", "1538 degrees Celsius", "100 degrees Celsius"], correctAnswer: 2, explanation: "Iron's melting point is approximately 1538 degrees Celsius." },
  { id: 14, question: "A substance with weak interparticle attraction generally has:", options: ["A very high melting point", "A low melting point", "No melting point at all", "The same melting point as iron"], correctAnswer: 1, explanation: "Weak interparticle attraction generally means a lower melting point." },
  { id: 15, question: "Liquids have:", options: ["A fixed shape and fixed volume", "No fixed shape but a definite volume", "No fixed shape and no fixed volume", "A fixed shape but no fixed volume"], correctAnswer: 1, explanation: "Liquids take the shape of their container but keep a definite volume." },
  { id: 16, question: "200 mL of water poured into three different containers will:", options: ["Change its volume each time", "Keep the same volume but change shape", "Keep the same shape but change volume", "Disappear"], correctAnswer: 1, explanation: "The volume stays the same; only the shape changes to match the container." },
  { id: 17, question: "A finger can move through water because:", options: ["Water has no interparticle attraction at all", "Water's particles are free to move and temporarily shift aside", "Water is a solid", "Water particles are fixed in place"], correctAnswer: 1, explanation: "Water's particles can move and temporarily shift, then return to position." },
  { id: 18, question: "The temperature at which a liquid turns to vapour throughout its volume at atmospheric pressure is called its:", options: ["Melting point", "Boiling point", "Interparticle point", "Diffusion point"], correctAnswer: 1, explanation: "This is the definition of boiling point." },
  { id: 19, question: "Evaporation differs from boiling because evaporation:", options: ["Only happens at the boiling point", "Happens at the surface, at any temperature, more slowly", "Happens throughout the liquid rapidly", "Cannot happen at room temperature"], correctAnswer: 1, explanation: "Evaporation happens at the surface, at any temperature, and is slower than boiling." },
  { id: 20, question: "Liquids and gases are both classified as:", options: ["Solids", "Fluids", "Crystals", "Constituent particles"], correctAnswer: 1, explanation: "Both liquids and gases flow and are classified as fluids." },
  { id: 21, question: "In gases, interparticle attraction is:", options: ["Very strong", "Moderate", "Negligible", "Impossible to determine"], correctAnswer: 2, explanation: "Gases have negligible interparticle attraction." },
  { id: 22, question: "Gases have:", options: ["A fixed shape and volume", "A fixed volume but no fixed shape", "No fixed shape and no fixed volume", "Only a fixed shape"], correctAnswer: 2, explanation: "Gases have neither a fixed shape nor a fixed volume." },
  { id: 23, question: "Smoke trapped in one gas jar, when connected to a second empty jar, will:", options: ["Stay only in the first jar", "Spread to fill both jars completely", "Disappear completely", "Turn into a liquid"], correctAnswer: 1, explanation: "Gas particles move freely and spread to fill all available space." },
  { id: 24, question: "Interparticle spacing is greatest in:", options: ["Solids", "Liquids", "Gases", "It is the same in all three states"], correctAnswer: 2, explanation: "Interparticle spacing is greatest in gases." },
  { id: 25, question: "Interparticle spacing is smallest in:", options: ["Solids", "Liquids", "Gases", "It is the same in all three states"], correctAnswer: 0, explanation: "Interparticle spacing is smallest in solids." },
  { id: 26, question: "A syringe filled with trapped air is compressed easily because:", options: ["Air particles are fixed in place", "Air particles have large interparticle spaces that can be reduced", "Air has no particles", "Air is a liquid"], correctAnswer: 1, explanation: "Gas particles have large interparticle spaces that can be compressed." },
  { id: 27, question: "Water is practically incompressible because:", options: ["It has no particles", "Its particles are already packed closely with little space left", "It is a gas", "It has no interparticle attraction"], correctAnswer: 1, explanation: "Liquid particles are already closely packed, leaving little room to compress." },
  { id: 28, question: "When sugar dissolves in water, the final volume is:", options: ["Exactly the sum of the two original volumes", "Less than the sum of the two original volumes", "Always double the original water volume", "Impossible to measure"], correctAnswer: 1, explanation: "Sugar particles fit into existing interparticle spaces, so the final volume is less than the simple sum." },
  { id: 29, question: "The space between particles in a solid is:", options: ["Filled with air", "Filled with a special gas", "Genuinely empty", "Filled with water"], correctAnswer: 2, explanation: "Interparticle space is genuinely empty, not filled with air or anything else." },
  { id: 30, question: "'Suspended particulate matter' in air pollution refers to:", options: ["The same tiny constituent particles discussed in this chapter", "Visible dust or soot particles, much larger than constituent particles", "Nothing related to particles", "Only gas particles"], correctAnswer: 1, explanation: "Suspended particulate matter refers to visible dust/soot, far larger than constituent particles." },
  { id: 31, question: "Diffusion is best described as:", options: ["The freezing of a liquid", "The spreading of one substance's particles through another due to particle motion", "A change in colour only", "A type of melting"], correctAnswer: 1, explanation: "Diffusion is the spreading of particles due to constant motion." },
  { id: 32, question: "A coloured grain dropped into still water spreads and colours the whole glass because:", options: ["Someone stirred it", "Water particles are constantly moving and carry the colour", "The grain evaporated", "Water has no particles"], correctAnswer: 1, explanation: "Constant particle motion in water causes diffusion, without any stirring." },
  { id: 33, question: "Diffusion happens fastest in:", options: ["Ice-cold water", "Room-temperature water", "Hot water", "Frozen water"], correctAnswer: 2, explanation: "Higher temperature increases particle motion, speeding up diffusion." },
  { id: 34, question: "The fragrance of an incense stick spreading through a room demonstrates:", options: ["Diffusion in a solid", "Diffusion in a gas", "Melting", "Boiling"], correctAnswer: 1, explanation: "This demonstrates diffusion of fragrance particles through air (a gas)." },
  { id: 35, question: "Soap helps remove oil from fabric because:", options: ["Soap particles repel water completely", "One end of a soap particle attaches to oil, the other mixes with water", "Soap dissolves the fabric", "Soap has no effect on oil"], correctAnswer: 1, explanation: "Soap particles have one end that attaches to oil and one that mixes with water, lifting the oil away." },
  { id: 36, question: "The heat (thermal) energy of particles mainly determines:", options: ["The colour of a substance", "The physical state of a substance", "The taste of a substance", "Nothing important"], correctAnswer: 1, explanation: "Thermal energy determines interparticle distance and attraction, which decide the physical state." },
  { id: 37, question: "As heat energy is added to a solid at its melting point, this energy is mainly used to:", options: ["Increase the solid's colour", "Weaken interparticle attraction enough for particles to move", "Destroy the particles", "Convert particles into energy"], correctAnswer: 1, explanation: "Heat energy at the melting point weakens interparticle attraction enough for particles to move." },
  { id: 38, question: "In the gaseous state, particles have:", options: ["No energy at all", "Enough energy to overcome interparticle attraction almost completely", "Less energy than in solids", "Fixed positions"], correctAnswer: 1, explanation: "Gas particles have enough energy to overcome interparticle attraction almost completely." },
  { id: 39, question: "The tiny particles that make up matter are, more specifically, called:", options: ["Only molecules", "Atoms and molecules", "Only electrons", "Only dust particles"], correctAnswer: 1, explanation: "Constituent particles are, more specifically, atoms and molecules." },
  { id: 40, question: "A water molecule is made up of:", options: ["One hydrogen atom and one oxygen atom", "Two hydrogen atoms and one oxygen atom", "Two oxygen atoms and one hydrogen atom", "Three hydrogen atoms only"], correctAnswer: 1, explanation: "A water molecule is made of two hydrogen atoms and one oxygen atom." },
  { id: 41, question: "Some atoms, like hydrogen and oxygen, usually:", options: ["Exist completely independently", "Combine with other atoms to form molecules", "Never combine with anything", "Only exist in solids"], correctAnswer: 1, explanation: "Certain atoms combine with others of the same element to form stable molecules." },
  { id: 42, question: "Ice is a notable exception because:", options: ["It has no particles", "Its particles are farther apart than in liquid water", "It has the highest melting point of all solids", "It cannot melt"], correctAnswer: 1, explanation: "Ice's particles are arranged farther apart than in liquid water, making ice less dense." },
  { id: 43, question: "Why does ice float on water?", options: ["Ice is warmer than water", "Ice is less dense because its particles are farther apart than in liquid water", "Ice has no interparticle attraction", "Ice is a gas"], correctAnswer: 1, explanation: "Ice's wider particle spacing makes it less dense, so it floats." },
  { id: 44, question: "Sublimation refers to a substance changing:", options: ["Directly from liquid to gas", "Directly from solid to vapour, without becoming liquid first", "From gas to solid only", "From solid to liquid only"], correctAnswer: 1, explanation: "Sublimation is a direct solid-to-vapour change." },
  { id: 45, question: "A gas exerts pressure on the walls of its container because:", options: ["Gas particles are stationary", "Gas particles constantly collide with the container walls", "Gas has no particles", "Gas particles attract the walls strongly"], correctAnswer: 1, explanation: "Constant collisions of moving gas particles with the walls create pressure." },
  { id: 46, question: "Why does sand not dissolve in water?", options: ["Sand has no particles", "Sand's particles are held together too strongly for water to pull apart", "Water has no particles", "Sand repels water completely"], correctAnswer: 1, explanation: "Water particles cannot overcome the strong forces holding sand's particles together." },
  { id: 47, question: "A sealed balloon placed in hot water tends to expand slightly because:", options: ["The balloon material shrinks", "Increased particle motion inside pushes outward on the balloon", "The air inside disappears", "Cold water was used instead"], correctAnswer: 1, explanation: "Heating increases gas particle motion, increasing outward push on the balloon." },
  { id: 48, question: "Which of the following correctly ranks interparticle attraction from strongest to weakest?", options: ["Gas, liquid, solid", "Liquid, solid, gas", "Solid, liquid, gas", "Gas, solid, liquid"], correctAnswer: 2, explanation: "Interparticle attraction is strongest in solids, then liquids, then gases." },
  { id: 49, question: "Which of the following correctly ranks interparticle spacing from smallest to largest?", options: ["Gas, liquid, solid", "Solid, liquid, gas", "Liquid, gas, solid", "Gas, solid, liquid"], correctAnswer: 1, explanation: "Interparticle spacing is smallest in solids, then liquids, then largest in gases." },
  { id: 50, question: "Overall, which idea best summarises this chapter?", options: ["Matter is a single solid block with no particles", "Matter is made of tiny particles whose spacing, attraction, and motion decide its state", "All substances behave identically regardless of temperature", "Particles only exist in gases"], correctAnswer: 1, explanation: "This captures the chapter's central theme linking particles, spacing, attraction, and state." },
];

// ── VERY SHORT (2 marks each) ──
export const SCIENCE8M_VERY_SHORT: ShortQuestion[] = [
  { id: 1, question: "Define a constituent particle.", answer: "The basic tiny unit that makes up a larger piece of a substance or material.", keyPoints: ["Basic tiny unit", "Makes up larger matter"] },
  { id: 2, question: "Is grinding chalk into powder a physical or chemical change? Explain briefly.", answer: "A physical change -- the chalk remains chalk; only the size of the pieces has reduced.", keyPoints: ["Physical change", "Substance stays the same"] },
  { id: 3, question: "Define interparticle space.", answer: "The empty gap that exists between the constituent particles of a substance.", keyPoints: ["Empty gap between particles"] },
  { id: 4, question: "Define interparticle attraction.", answer: "The attractive force holding constituent particles together, whose strength depends on the substance and the distance between particles.", keyPoints: ["Attractive force", "Depends on substance and distance"] },
  { id: 5, question: "Who proposed the idea of 'Parmanu', and in which work?", answer: "Acharya Kanad, in his work known as the Vaisheshika Sutras.", keyPoints: ["Acharya Kanad", "Vaisheshika Sutras"] },
  { id: 6, question: "Why do solids have a definite shape?", answer: "Because their particles are held tightly in fixed positions by strong interparticle attraction and cannot move past one another.", keyPoints: ["Fixed positions", "Strong attraction"] },
  { id: 7, question: "Define melting point.", answer: "The minimum temperature at which a solid changes into a liquid at atmospheric pressure.", keyPoints: ["Minimum temperature", "Solid to liquid"] },
  { id: 8, question: "State the melting points of ice and iron.", answer: "Ice: 0 degrees Celsius. Iron: approximately 1538 degrees Celsius.", keyPoints: ["Ice 0°C", "Iron ~1538°C"] },
  { id: 9, question: "Why do liquids not have a fixed shape?", answer: "Because their particles are free to move, allowing the liquid to flow and take the shape of its container.", keyPoints: ["Particles free to move", "Takes container's shape"] },
  { id: 10, question: "Define boiling point.", answer: "The temperature at which a liquid turns into vapour throughout its volume at atmospheric pressure.", keyPoints: ["Fixed temperature", "Vapour throughout volume"] },
  { id: 11, question: "Distinguish evaporation from boiling in one line.", answer: "Evaporation happens slowly at the surface at any temperature, while boiling happens rapidly throughout the liquid at one fixed temperature.", keyPoints: ["Evaporation: surface, any temp, slow", "Boiling: throughout, fixed temp, fast"] },
  { id: 12, question: "Why are liquids and gases both called fluids?", answer: "Because both can flow and do not have a fixed shape of their own.", keyPoints: ["Both flow", "No fixed shape"] },
  { id: 13, question: "Why do gases fill their entire container?", answer: "Because interparticle attraction in gases is negligible, so particles move freely in all directions until they occupy all available space.", keyPoints: ["Negligible attraction", "Free movement in all directions"] },
  { id: 14, question: "Why can a gas be compressed easily, but not a liquid?", answer: "Gas particles have large interparticle spaces that can be reduced, while liquid particles are already packed closely with very little space left.", keyPoints: ["Gas has space to compress", "Liquid has little space left"] },
  { id: 15, question: "Is the interparticle space in a solid filled with air?", answer: "No -- interparticle space is genuinely empty; it is not filled with air or anything else.", keyPoints: ["Genuinely empty", "Not filled with air"] },
  { id: 16, question: "Explain briefly why the final volume is less than expected when sugar dissolves completely in water.", answer: "The sugar's particles fit into the existing interparticle spaces between the water particles, rather than adding fully separate volume.", keyPoints: ["Fits into existing spaces", "Volume less than simple sum"] },
  { id: 17, question: "Define diffusion.", answer: "The spreading of one substance's particles through another, caused by the constant, random motion of particles.", keyPoints: ["Spreading of particles", "Due to constant motion"] },
  { id: 18, question: "Why does a coloured grain spread through still water without stirring?", answer: "Because water particles are always moving, and this motion carries the grain's particles throughout the water.", keyPoints: ["Constant particle motion", "Carries particles throughout"] },
  { id: 19, question: "How does temperature affect the speed of diffusion?", answer: "Higher temperature increases particle motion and speeds up diffusion; lower temperature slows particle motion and slows diffusion.", keyPoints: ["Higher temp = faster diffusion", "Lower temp = slower diffusion"] },
  { id: 20, question: "Why doesn't sand dissolve in water?", answer: "Because sand's constituent particles are held together by forces too strong for water particles to pull apart.", keyPoints: ["Particles held too strongly", "Cannot be pulled apart"] },
  { id: 21, question: "Explain briefly how soap helps remove an oily stain.", answer: "Soap particles surround the oil, with one end attaching to the oil and the other end mixing with water, lifting the oil away.", keyPoints: ["One end attaches to oil", "Other end mixes with water"] },
  { id: 22, question: "What determines the physical state (solid, liquid, or gas) of a substance?", answer: "The thermal (heat) energy of its particles, which decides interparticle distance and therefore the strength of interparticle attraction.", keyPoints: ["Thermal energy", "Controls distance and attraction"] },
  { id: 23, question: "What are the constituent particles of matter more specifically called?", answer: "Atoms and molecules.", keyPoints: ["Atoms and molecules"] },
  { id: 24, question: "How many atoms combine to form a water molecule, and of what type?", answer: "Two hydrogen atoms and one oxygen atom.", keyPoints: ["Two hydrogen", "One oxygen"] },
  { id: 25, question: "Why is ice considered an exception among solids?", answer: "Its particles are arranged slightly farther apart than in liquid water, making ice less dense than water.", keyPoints: ["Particles farther apart than liquid", "Less dense than water"] },
  { id: 26, question: "Why does ice float on water?", answer: "Because ice is less dense than water, as its particles are spaced farther apart than in the liquid state.", keyPoints: ["Less dense", "Wider particle spacing"] },
  { id: 27, question: "Define sublimation.", answer: "The direct change of a substance from the solid state to vapour, without passing through the liquid state.", keyPoints: ["Solid directly to vapour", "No liquid stage"] },
  { id: 28, question: "Why does a gas exert pressure on the walls of its container?", answer: "Because its constantly moving particles repeatedly collide with the container walls, and these collisions create pressure.", keyPoints: ["Constant collisions", "Create pressure"] },
  { id: 29, question: "What is 'suspended particulate matter' in the context of air pollution?", answer: "Visible dust or soot particles suspended in air, much larger than the constituent particles of matter discussed in this chapter.", keyPoints: ["Visible dust/soot", "Much larger than constituent particles"] },
  { id: 30, question: "Explain briefly why a sealed balloon placed in hot water expands slightly.", answer: "The heat increases the motion of the gas particles trapped inside, causing them to push outward on the balloon's walls with more force.", keyPoints: ["Increased particle motion", "More outward push"] },
];

// ── SHORT (3 marks each) ──
export const SCIENCE8M_SHORT: ShortQuestion[] = [
  { id: 1, question: "Describe the chalk-grinding activity and explain what it demonstrates about matter.", answer: "A stick of chalk is broken repeatedly and ground into a fine powder using a mortar and pestle. Even the finest visible speck is still chalk, showing that only the size has changed, not the substance. This demonstrates that matter is made of a very large number of extremely small constituent particles, far smaller than what can be seen even with a magnifying glass.", keyPoints: ["Describes the activity", "Explains substance unchanged", "Concludes matter is made of tiny particles"] },
  { id: 2, question: "Explain, with reasoning, why water tastes sweet throughout after sugar is fully dissolved and stirred, even though no sugar can be seen.", answer: "When stirred, sugar breaks into constituent particles that are too small to see. These particles spread evenly through the interparticle spaces between the water particles, distributing themselves throughout the liquid. Since the sugar particles are present everywhere in the water, the sweet taste can be sensed no matter where a sample is taken from.", keyPoints: ["Sugar breaks into constituent particles", "Particles spread through interparticle spaces", "Explains uniform sweetness"] },
  { id: 3, question: "Explain how the strength of interparticle attraction depends on distance, and why this matters for changes of state.", answer: "The strength of interparticle attraction depends on both the nature of the substance and the distance between its particles -- even a small increase in distance causes a large decrease in attraction. This matters because heating a substance increases the distance between its particles, weakening the attraction enough to change its state, for example from solid to liquid.", keyPoints: ["Explains distance-attraction relationship", "Connects to changes of state via heating"] },
  { id: 4, question: "Describe how particles behave in the solid state, and explain why solids have both a definite shape and a definite volume.", answer: "In solids, particles are tightly packed and held by strong interparticle attraction, which fixes each particle in position. Particles can only vibrate about this fixed position, not move past one another. Since the particles cannot move from their positions or change their overall arrangement, the solid keeps both a definite shape and a definite volume.", keyPoints: ["Describes tight packing and strong attraction", "Explains fixed positions with vibration only", "Connects to definite shape and volume"] },
  { id: 5, question: "Explain, step by step, what happens as a solid is heated up to and past its melting point.", answer: "As heat is added, the solid's particles vibrate more and more vigorously. At the melting point, these vibrations become strong enough to let particles break free from their fixed positions, weakening the interparticle attraction. The particles can then move around within a limited space, and the solid has become a liquid.", keyPoints: ["Increasing vibration with heat", "Particles break free at melting point", "Solid becomes liquid"] },
  { id: 6, question: "Explain why liquids have a definite volume but no fixed shape, using an example.", answer: "Liquid particles are free to move but stay close together due to still-significant interparticle attraction. This lets a liquid flow into the shape of any container, while the total amount of liquid (its volume) stays the same. For example, 200 mL of water poured into three differently shaped containers takes a different shape in each case but always measures 200 mL.", keyPoints: ["Explains particle freedom within limited space", "Correct example with unchanged volume"] },
  { id: 7, question: "Distinguish between boiling and evaporation, and explain why both are related to particle motion.", answer: "Boiling happens at one specific temperature (the boiling point) and occurs rapidly throughout the entire liquid, seen as bubbling. Evaporation happens more slowly, only at the liquid's surface, and can occur at any temperature. Both are related to particle motion, since in each case, particles gain enough energy to escape the liquid and become vapour -- boiling simply involves much more vigorous, widespread particle motion than evaporation.", keyPoints: ["Boiling explained (temperature, whole liquid, fast)", "Evaporation explained (surface, any temp, slow)", "Connects both to particle motion/energy"] },
  { id: 8, question: "Describe the gas jar and smoke activity, and explain what it demonstrates about the gaseous state.", answer: "Smoke is trapped inside one gas jar, which is then connected to a second, empty gas jar by removing a separating glass plate. The smoke is observed to spread and completely fill both jars. This demonstrates that gas particles move freely in every direction and have negligible interparticle attraction, causing them to spread out and occupy all the space available to them, rather than staying in one place.", keyPoints: ["Describes the activity accurately", "Explains free movement and negligible attraction", "Connects to gases filling all available space"] },
  { id: 9, question: "Explain, using the syringe activity, how the compressibility of a gas differs from that of a liquid.", answer: "When the plunger of a syringe filled only with trapped air is pushed, the air's volume decreases noticeably, showing that gas particles have a lot of interparticle space that can be squeezed smaller. Repeating this with water shows almost no change in volume, since water's particles are already packed closely together with very little space left to compress. This shows gases are easily compressible while liquids are practically incompressible.", keyPoints: ["Describes syringe test for gas", "Describes syringe test for liquid", "Explains the compressibility difference through spacing"] },
  { id: 10, question: "Explain why the water level rises less than expected when sugar is dissolved into it, referring to interparticle space.", answer: "When solid sugar is first added, it takes up its own separate space and the water level rises. Once dissolved, the sugar's particles move into the already-existing interparticle spaces between the water's particles, rather than continuing to occupy fully separate space. Because of this, the final water level, after dissolving, is less than what would be expected by simply adding the two original volumes together.", keyPoints: ["Describes initial rise from solid sugar", "Explains particles fitting into interparticle spaces", "Explains why final volume is less than the simple sum"] },
  { id: 11, question: "Explain why insoluble substances like sand behave differently from soluble substances like sugar when added to water.", answer: "Soluble substances like sugar have particles that water particles can pull apart and spread into the interparticle spaces of the water. Insoluble substances like sand have particles held together by forces too strong for water to pull apart, so they do not break apart or spread through the water. Instead, sand simply settles at the bottom, and its full volume adds directly to the water's volume rather than fitting into existing spaces.", keyPoints: ["Explains soluble substance behaviour", "Explains insoluble substance behaviour", "Contrasts effect on total volume"] },
  { id: 12, question: "Explain the potassium permanganate activity and what it reveals about the effect of temperature on particle motion.", answer: "A grain of potassium permanganate is dropped into water, and its colour is observed spreading into streaks and eventually colouring the entire water evenly, without stirring. When repeated in hot, room-temperature, and ice-cold water, the colour spreads fastest in hot water and slowest in ice-cold water. This shows that water particles move faster when heated, and this increased particle motion speeds up diffusion.", keyPoints: ["Describes the activity and its basic result", "Describes the temperature comparison", "Connects temperature to particle motion speed"] },
  { id: 13, question: "Explain how the incense stick activity demonstrates diffusion in gases, and why this differs from the diffusion seen in liquids only in terms of the state involved.", answer: "When an incense stick is lit in one corner of a room, its fragrance is initially noticed only nearby, but eventually reaches every part of the room. This happens because the room's air particles are constantly moving and collide with the fragrance particles, carrying them outward in all directions -- exactly the same underlying process (diffusion due to constant particle motion) seen with dissolved colour spreading through water, just occurring in a gas instead of a liquid.", keyPoints: ["Describes the incense stick observation", "Explains the mechanism (moving air particles)", "Connects to the same underlying diffusion process as in liquids"] },
  { id: 14, question: "Explain, using the idea of thermal energy, the complete sequence of changes as a solid is heated all the way into a gas.", answer: "In the solid state, particles have low thermal energy, stay close together under strong attraction, and can only vibrate. As heat energy increases to the melting point, particles gain enough energy to break free from fixed positions, becoming a liquid with weaker attraction and particles that can move within a limited space. With further heating to the boiling point, particles gain enough energy to overcome almost all interparticle attraction, moving freely in all directions as a gas.", keyPoints: ["Describes solid stage with low energy", "Describes liquid stage at melting point", "Describes gas stage at boiling point"] },
  { id: 15, question: "Explain why understanding that 'atoms of some elements do not exist independently' is important, using hydrogen as an example.", answer: "Atoms of elements like hydrogen are not usually found existing completely on their own in nature; instead, a fixed number of such atoms join together to form a stable molecule. In the case of hydrogen, two hydrogen atoms combine to form one hydrogen molecule. Understanding this is important because it shows that 'atom' and 'molecule' are related but distinct ideas -- the molecule is the stable, naturally occurring particle, built from combined atoms.", keyPoints: ["Explains atoms not existing independently", "Correct hydrogen example", "Explains the atom-molecule distinction"] },
  { id: 16, question: "Explain why ice is considered an exception to the usual pattern of solids being denser than their liquid form.", answer: "In most substances, the solid state has particles packed more closely together than in the liquid state, making the solid denser. Ice is an exception: its particles are actually arranged slightly farther apart than in liquid water. This wider spacing makes ice less dense than liquid water, which is why ice floats rather than sinking, unlike what would normally be expected of a solid compared to its own liquid form.", keyPoints: ["States the usual pattern for solids/liquids", "Explains ice's exceptional wider spacing", "Connects to ice floating due to lower density"] },
  { id: 17, question: "Explain, using the idea of collisions, why a gas exerts pressure on the walls of a sealed container, and what would happen to this pressure if the gas were heated.", answer: "Gas particles are in constant, fast motion in every direction inside the container, and they repeatedly collide with its walls. These frequent collisions push against the walls, and the combined effect of countless such collisions is what we observe as the gas's pressure. If the gas were heated, its particles would move even faster, causing more frequent and more forceful collisions with the walls, which would increase the pressure the gas exerts.", keyPoints: ["Explains constant motion and wall collisions", "Explains pressure as the result of collisions", "Explains the effect of heating on pressure"] },
  { id: 18, question: "A student claims that the empty space between particles in a solid must be filled with air, since air is 'everywhere'. Explain why this claim is incorrect.", answer: "Interparticle space is not filled with air or with any other substance at all -- it is genuinely empty space. The claim likely comes from confusing everyday visible empty spaces (like a gap in a shelf, which does contain air) with the microscopic interparticle spaces between constituent particles, which is a completely different scale and situation, with nothing at all present inside it.", keyPoints: ["States the correct fact (genuinely empty)", "Explains the likely source of confusion", "Distinguishes interparticle space from everyday visible gaps"] },
  { id: 19, question: "Explain the difference between 'suspended particulate matter' as used in discussions about air pollution and the 'constituent particles' discussed in this chapter, including their relative sizes.", answer: "Suspended particulate matter refers to visible or near-visible dust and soot particles floating in polluted air. Constituent particles, as discussed in this chapter, are the extremely tiny building blocks (atoms and molecules) that make up all matter, including these dust particles. In fact, even a single tiny dust particle is itself built from an enormous number of constituent particles, showing just how much smaller constituent particles really are.", keyPoints: ["Explains suspended particulate matter", "Explains constituent particles", "Correctly relates their relative sizes"] },
  { id: 20, question: "Explain why understanding interparticle spacing helps explain both why gases can be compressed and why solids generally sink in their own liquid, except for ice.", answer: "Compressibility depends on how much unused interparticle space a substance has -- gases have plenty of space to be squeezed into, while solids and liquids generally have much less. Density (and therefore whether something sinks or floats) also depends on how closely packed particles are -- normally, a solid's closer packing makes it denser than its own liquid, causing it to sink. Ice is an exception because its particles are spaced farther apart than in liquid water, making it float instead of sinking.", keyPoints: ["Connects compressibility to available interparticle space", "Connects density/sinking to particle packing", "Notes ice as the correct exception"] },
  { id: 21, question: "Explain why a substance's melting point can be used as a rough indicator of the strength of its interparticle attraction.", answer: "A higher melting point means more heat energy is needed before a solid's particles can break free from their fixed positions, which in turn means the interparticle attraction holding those particles together must be stronger. Conversely, a low melting point suggests the interparticle attraction is comparatively weak, since only a small amount of heat energy is enough to overcome it.", keyPoints: ["Explains link between melting point and heat energy needed", "Connects this to interparticle attraction strength"] },
  { id: 22, question: "Explain, with reasoning, why the same activity (dropping a coloured grain into water) gives different results in hot and cold water, connecting this to particle motion.", answer: "In both cases, the coloured grain's particles spread through the water due to diffusion, caused by the constant motion of water particles. However, in hot water, particles move faster, so they collide with and carry away the grain's particles more quickly, causing faster colouring. In cold water, particles move more slowly, so the same spreading process takes noticeably longer.", keyPoints: ["Explains diffusion occurs in both cases", "Connects speed difference to particle motion linked to temperature"] },
  { id: 23, question: "Explain why a liquid poured between containers of very different shapes does not lose or gain any material, even though its appearance changes noticeably.", answer: "The liquid's particles are simply moving to fill the new container's shape -- no particles are added or removed in the process. Since the same number of particles, each taking up the same amount of space, are still present, the total volume remains unchanged even though the outward appearance (shape) looks very different.", keyPoints: ["Explains particles simply rearranging, not changing in number", "Connects to volume staying constant despite shape change"] },
  { id: 24, question: "Explain why understanding the particulate nature of matter can help explain both why perfume can be smelled across a room and why a solid metal object does not dissolve in water.", answer: "Perfume particles diffuse through air because gas particles move freely and carry other particles with them across long distances. A solid metal object does not dissolve because its constituent particles are held together by interparticle attraction far too strong for water particles to overcome and pull apart. Both situations are explained by the same core idea -- how freely particles can move and how strongly they are held together -- just leading to very different outcomes for a gas-based process versus a strongly-bonded solid.", keyPoints: ["Explains perfume diffusion through free particle movement", "Explains non-dissolving through strong interparticle attraction", "Connects both to the same core particle-behaviour idea"] },
  { id: 25, question: "Explain why a scientist investigating an unknown substance's state (solid, liquid, or gas) at room temperature could reasonably use its compressibility as one useful clue, alongside its shape and volume behaviour.", answer: "Compressibility is closely linked to how much interparticle space a substance has, which differs consistently across the three states -- solids and liquids compress very little, while gases compress noticeably. Combined with observing whether the substance holds a fixed shape and volume (solid), takes the container's shape but keeps a fixed volume (liquid), or expands to fill any container (gas), compressibility adds a helpful, testable clue to correctly identify the state.", keyPoints: ["Explains link between compressibility and interparticle spacing", "Explains how it complements shape/volume clues to identify state"] },
];

// ── LONG (5 marks each) ──
export const SCIENCE8M_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Describe, in detail, two activities (one involving a solid and one involving dissolving) that provide evidence that matter is made of extremely small constituent particles, and explain what conclusion each activity supports.",
    markingScheme: [
      "Correctly describes the chalk-grinding activity",
      "States the conclusion supported by the chalk activity",
      "Correctly describes the sugar-dissolving activity",
      "States the conclusion supported by the sugar activity",
      "Draws an overall final conclusion connecting both activities"
    ],
    answerParts: [
      { part: "Chalk activity", text: "A stick of chalk is broken repeatedly and ground into a fine powder, observed under a magnifying glass. Even the finest visible speck remains chalk." },
      { part: "Chalk conclusion", text: "This supports the conclusion that chalk (and matter generally) is made of a very large number of extremely small constituent particles, since the substance's identity never changes, only its size." },
      { part: "Sugar activity", text: "Sugar is added to water and stirred until it dissolves completely and cannot be seen, yet the water tastes sweet throughout." },
      { part: "Sugar conclusion", text: "This supports the conclusion that the sugar has broken into constituent particles too small to see, which spread evenly through the interparticle spaces in the water." },
      { part: "Final Answer", text: "Both activities support the same underlying idea -- that matter is made of extremely small constituent particles -- one showing this through repeated physical breaking, and the other through particles spreading invisibly while dissolved." }
    ]
  },
  {
    id: 2,
    question: "Explain, in detail, the concept of interparticle space and interparticle attraction, describing how the sugar-dissolving volume activity provides evidence for interparticle space, and how the concept of interparticle attraction explains why substances have different melting points.",
    markingScheme: [
      "Correctly defines interparticle space",
      "Correctly defines interparticle attraction",
      "Explains the sugar-dissolving volume activity as evidence for interparticle space",
      "Explains how interparticle attraction relates to melting point differences",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Interparticle space", text: "Interparticle space is the empty gap that exists between the constituent particles of a substance." },
      { part: "Interparticle attraction", text: "Interparticle attraction is the attractive force holding constituent particles together, whose strength depends on the nature of the substance and the distance between its particles." },
      { part: "Evidence from the sugar activity", text: "When sugar is dissolved in water, the final volume is less than the sum of the sugar's and water's original volumes, because the sugar's particles fit into the existing interparticle spaces between the water particles rather than adding entirely separate volume -- directly showing that such spaces exist." },
      { part: "Connection to melting points", text: "Substances with weaker interparticle attraction require less heat energy to free their particles from fixed positions, giving them lower melting points (like ice at 0 degrees Celsius), while substances with stronger attraction, like iron, require far more heat energy and have much higher melting points (around 1538 degrees Celsius)." },
      { part: "Final Answer", text: "Interparticle space and interparticle attraction are two related but distinct ideas -- space is the physical gap between particles, evidenced by volume changes on dissolving, while attraction is the force holding particles together, whose strength directly explains why different substances melt at very different temperatures." }
    ]
  },
  {
    id: 3,
    question: "Describe, in detail, the particle arrangement, movement, and interparticle attraction in each of the three states of matter, and explain how these three states relate to melting and boiling.",
    markingScheme: [
      "Correctly describes the solid state (arrangement, movement, attraction)",
      "Correctly describes the liquid state (arrangement, movement, attraction)",
      "Correctly describes the gaseous state (arrangement, movement, attraction)",
      "Explains melting as the solid-to-liquid transition",
      "Explains boiling as the liquid-to-gas transition"
    ],
    answerParts: [
      { part: "Solid state", text: "Particles are tightly packed with minimum interparticle spacing, held by maximum interparticle attraction, and can only vibrate about fixed positions -- giving solids a definite shape and volume." },
      { part: "Liquid state", text: "Particles have slightly more spacing than in solids, with somewhat weaker (but still significant) interparticle attraction, allowing particles to move within a limited space -- giving liquids a definite volume but no fixed shape." },
      { part: "Gaseous state", text: "Particles have maximum interparticle spacing, with negligible interparticle attraction, allowing free movement in all directions -- giving gases neither a fixed shape nor a fixed volume." },
      { part: "Melting", text: "As a solid is heated, particle vibrations increase until, at the melting point, interparticle attraction is weakened enough for particles to leave their fixed positions, converting the solid into a liquid." },
      { part: "Boiling", text: "As a liquid is heated further, particle motion increases until, at the boiling point, particles gain enough energy to escape the liquid throughout its entire volume (not just the surface), converting the liquid into a gas." }
    ]
  },
  {
    id: 4,
    question: "Design and describe an experiment (based on activities from this chapter) to compare the compressibility of a gas and a liquid, and explain the reasoning behind the expected results.",
    markingScheme: [
      "Describes a reasonable experimental setup using a syringe (or similar)",
      "Describes what would be observed with a gas",
      "Describes what would be observed with a liquid",
      "Explains the interparticle-space-based reasoning behind the difference",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Setup", text: "Take a syringe without a needle, fill it once with only trapped air and once with water (in a separate trial), sealing the open end each time, and push the plunger inward with steady force in each case, observing any change in volume." },
      { part: "Gas observation", text: "When filled with air, pushing the plunger causes a noticeable decrease in volume, showing the air can be compressed." },
      { part: "Liquid observation", text: "When filled with water, pushing the plunger with similar force produces almost no change in volume, showing water is practically incompressible." },
      { part: "Reasoning", text: "Gas particles have large amounts of interparticle space between them, which can be reduced when force is applied. Liquid particles are already packed closely together, leaving very little space left to reduce further." },
      { part: "Final Answer", text: "This experiment directly shows that a gas is significantly more compressible than a liquid, and the underlying reason is the large difference in how much unused interparticle space each state has available." }
    ]
  },
  {
    id: 5,
    question: "Explain, in detail, the process of diffusion, describing two different activities (one in a liquid, one in a gas) that demonstrate it, and explain how temperature affects the rate of diffusion.",
    markingScheme: [
      "Correctly defines diffusion",
      "Correctly describes a liquid diffusion activity (such as potassium permanganate in water)",
      "Correctly describes a gas diffusion activity (such as an incense stick)",
      "Explains how temperature affects diffusion rate, with reasoning",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Defining diffusion", text: "Diffusion is the spreading of one substance's particles through another, caused by the constant, random motion of particles." },
      { part: "Liquid activity", text: "A grain of a coloured substance dropped into still water spreads into streaks and eventually colours the entire water evenly, without any stirring, because the water's particles are always moving and carry the colour throughout." },
      { part: "Gas activity", text: "An incense stick lit in one corner of a room is eventually smelled throughout the room, because the constantly moving air particles collide with and carry the fragrance particles in all directions." },
      { part: "Effect of temperature", text: "Diffusion happens faster in hot liquids or gases and slower in cold ones, since higher temperature increases the speed of particle motion, allowing faster spreading, while lower temperature slows particle motion and diffusion." },
      { part: "Final Answer", text: "Diffusion, demonstrated in both liquids and gases, is caused by the same underlying process -- constant particle motion -- and its speed is directly controlled by temperature, since temperature determines how fast particles move." }
    ]
  },
  {
    id: 6,
    question: "Explain, in detail, how thermal (heat) energy governs the complete behaviour of matter across all three states, connecting interparticle distance, interparticle attraction, and particle movement at each stage.",
    markingScheme: [
      "Explains the role of thermal energy in the solid state",
      "Explains the role of thermal energy at the melting point",
      "Explains the role of thermal energy in the liquid state",
      "Explains the role of thermal energy at the boiling point and in the gaseous state",
      "Draws a clear, well-reasoned final conclusion tying the whole chain together"
    ],
    answerParts: [
      { part: "Solid state", text: "Thermal energy is low, so particles stay close together, interparticle attraction is strong, and particles can only vibrate in fixed positions." },
      { part: "At the melting point", text: "Added thermal energy is used specifically to weaken interparticle attraction enough for particles to break free from their fixed positions." },
      { part: "Liquid state", text: "Thermal energy has increased interparticle distance slightly, weakening attraction just enough to let particles move around, though still within a limited space." },
      { part: "At the boiling point and gas state", text: "Enough thermal energy has been added that particles can overcome interparticle attraction almost completely, allowing them to move freely in every direction as a gas." },
      { part: "Final Answer", text: "Thermal energy is the single underlying factor driving every change described in this chapter -- it controls how far apart particles are, which controls how strongly they attract each other, which ultimately decides whether a substance behaves as a solid, a liquid, or a gas." }
    ]
  },
  {
    id: 7,
    question: "Explain, in detail, why ice is considered an exception in this chapter, describing how this exception relates to interparticle spacing, density, and a real-world consequence of this exception.",
    markingScheme: [
      "States the usual relationship between solid and liquid particle spacing",
      "Explains how ice differs from this usual pattern",
      "Explains the connection between spacing and density",
      "Describes a real-world consequence of ice floating",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Usual pattern", text: "In most substances, the solid state has particles packed closer together than the liquid state, since cooling normally reduces particle spacing further." },
      { part: "How ice differs", text: "Ice is an exception -- its particles are actually arranged slightly farther apart than in liquid water, rather than closer together." },
      { part: "Spacing and density", text: "Since density depends on how much mass is packed into a given space, wider particle spacing in ice means it is less dense than liquid water." },
      { part: "Real-world consequence", text: "Because ice is less dense than water, it floats rather than sinking -- this is why ice forms and remains on the surface of a pond or lake in cold weather, rather than sinking to the bottom." },
      { part: "Final Answer", text: "Ice's unusual wider particle spacing compared to liquid water makes it less dense, causing it to float -- an important exception to the usual solid-denser-than-liquid pattern, with the very visible real-world consequence of ice floating on water bodies." }
    ]
  },
  {
    id: 8,
    question: "A sealed glass bottle with a balloon fixed over its neck is placed in hot water. Explain, in detail, what would be observed, and describe the complete particle-level reasoning behind this observation.",
    markingScheme: [
      "States the expected observation (balloon inflates/expands)",
      "Explains the effect of heat on the air particles inside the bottle",
      "Explains how this leads to increased pressure on the balloon",
      "Explains why this results in the balloon expanding",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Expected observation", text: "The balloon fixed over the bottle's neck would be expected to inflate or expand somewhat as the bottle sits in the hot water." },
      { part: "Effect of heat on particles", text: "The heat from the hot water increases the thermal energy of the air particles trapped inside the sealed bottle, causing them to move faster and more vigorously." },
      { part: "Increased pressure", text: "Faster-moving particles collide with the surrounding surfaces (including the balloon) more frequently and more forcefully, increasing the outward pressure exerted by the trapped air." },
      { part: "Why the balloon expands", text: "This increased pressure pushes against the flexible balloon material, causing the balloon to stretch and expand outward, since it is the only flexible surface available for the air to push into." },
      { part: "Final Answer", text: "Placing the sealed bottle in hot water increases the motion and pressure of the trapped air particles, and since the balloon is the only flexible boundary, it expands outward in response -- directly demonstrating the connection between heat energy, particle motion, and gas pressure." }
    ]
  },
  {
    id: 9,
    question: "Explain, in detail, why understanding constituent particles matters for real-life processes, using fermentation-style dissolving, cleaning with soap, and diffusion of scent as three connected examples.",
    markingScheme: [
      "Explains the dissolving example with particle-level reasoning",
      "Explains the soap-cleaning example with particle-level reasoning",
      "Explains the scent-diffusion example with particle-level reasoning",
      "Identifies the shared underlying idea connecting all three",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Dissolving example", text: "When a substance like sugar dissolves in water, its constituent particles separate and spread into the interparticle spaces of the water, explaining how a solid can seem to 'disappear' while still being present, detectable by taste." },
      { part: "Soap-cleaning example", text: "Soap particles have one end that attaches to oil and another that mixes with water; understanding this particle-level behaviour explains exactly how soap manages to lift oily stains off fabric and wash them away." },
      { part: "Scent-diffusion example", text: "The spreading of an incense stick's fragrance throughout a room is explained by constantly moving air particles carrying fragrance particles outward in all directions -- diffusion at the particle level." },
      { part: "Shared underlying idea", text: "In every case, understanding how tiny, constantly moving, interacting particles behave explains something directly observable in daily life, connecting an invisible, particle-level cause to a visible, everyday effect." },
      { part: "Final Answer", text: "Understanding constituent particles is not just an abstract idea -- it directly explains ordinary, everyday observations like dissolving, cleaning, and the spreading of scent, showing how a single underlying concept connects many seemingly unrelated real-life experiences." }
    ]
  },
  {
    id: 10,
    question: "Explain, in detail, the complete reasoning chain from 'heat energy' to 'physical state', including how this reasoning also explains diffusion rate and compressibility, tying together the major ideas of this chapter.",
    markingScheme: [
      "Explains the core reasoning chain (heat energy to distance to attraction to state)",
      "Explains how this same reasoning connects to diffusion rate",
      "Explains how this same reasoning connects to compressibility",
      "Notes the ice exception as a boundary case within this reasoning",
      "Draws a clear, well-reasoned final conclusion tying everything together"
    ],
    answerParts: [
      { part: "Core reasoning chain", text: "Heat energy determines how much particles vibrate and move; more heat energy increases the distance between particles; increased distance sharply weakens interparticle attraction; weaker attraction allows more particle freedom, determining whether a substance behaves as a solid, liquid, or gas." },
      { part: "Connection to diffusion rate", text: "The same heat energy that increases particle spacing also increases particle speed -- faster-moving particles collide and spread more quickly, which is exactly why diffusion happens faster in hotter liquids and gases." },
      { part: "Connection to compressibility", text: "Interparticle spacing, which is controlled by heat energy and attraction, also determines compressibility -- a gas's large spacing (due to weak attraction) leaves much room to compress, while a liquid or solid's small spacing leaves little room." },
      { part: "The ice exception", text: "Ice is a notable exception within this reasoning -- while heat energy and attraction generally explain solids being denser than their liquids, ice's particle arrangement is unusual, giving it wider spacing than liquid water and making it float instead of sink." },
      { part: "Final Answer", text: "A single reasoning chain -- heat energy controlling particle distance, which controls attraction strength, which controls particle freedom -- explains not only why matter exists as solids, liquids, and gases, but also why diffusion speeds up with heat and why gases compress more easily than liquids, with ice standing out as a notable, well-understood exception." }
    ]
  },
  {
    id: 11,
    question: "Design a complete experiment (using ideas from this chapter) to determine whether an unknown, everyday liquid dissolves a given solid, and explain step by step how you would interpret the results using the idea of interparticle forces.",
    markingScheme: [
      "Describes a reasonable experimental setup",
      "Describes what observation would indicate dissolving",
      "Describes what observation would indicate no dissolving",
      "Explains the interparticle-force-based reasoning behind each outcome",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Setup", text: "Add a measured, small amount of the solid to a sample of the unknown liquid in a clean, clear container, and stir gently, observing closely over a few minutes." },
      { part: "If dissolving occurs", text: "The solid gradually disappears from view, and if tasted or tested appropriately, its presence can still be detected throughout the liquid." },
      { part: "If dissolving does not occur", text: "The solid remains visible, either floating, suspended, or settled at the bottom, without spreading through the liquid." },
      { part: "Interparticle-force reasoning", text: "If dissolving occurs, the liquid's particles were able to pull the solid's particles apart against its interparticle attraction, letting them spread into the liquid's interparticle spaces. If dissolving does not occur, the solid's interparticle attraction was too strong for the liquid's particles to overcome." },
      { part: "Final Answer", text: "Observing whether the solid disappears (and is still detectable) or remains visibly separate allows a conclusion about dissolving, which can then be explained through the relative strength of the solid's interparticle attraction compared to the liquid's ability to pull its particles apart." }
    ]
  },
  {
    id: 12,
    question: "Explain, in detail, the relationship between a substance's boiling point and the strength of its interparticle attraction in the liquid state, and describe how this relationship could be used to compare two unknown liquids.",
    markingScheme: [
      "Explains the general relationship between boiling point and interparticle attraction",
      "Explains why more heat energy is needed for stronger attraction",
      "Describes how measuring boiling points could compare two liquids",
      "Notes a reasonable limitation or consideration of this method",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "General relationship", text: "A liquid with stronger interparticle attraction generally requires a higher temperature (and more heat energy) before its particles can escape throughout the liquid and reach the boiling point." },
      { part: "Why more energy is needed", text: "Stronger attraction means particles are held together more firmly, so more thermal energy must be supplied to give them enough motion to overcome this attraction and escape as vapour." },
      { part: "Comparing two liquids", text: "By measuring and comparing the boiling points of two unknown liquids under the same atmospheric pressure, the liquid with the higher boiling point can reasonably be inferred to have stronger interparticle attraction." },
      { part: "A limitation", text: "This comparison assumes both liquids are being measured under the same pressure conditions, since boiling point can also be affected by atmospheric pressure, not interparticle attraction alone." },
      { part: "Final Answer", text: "Boiling point provides a useful, testable clue to the relative strength of a liquid's interparticle attraction, with a higher boiling point generally indicating stronger attraction, provided the comparison is made under consistent pressure conditions." }
    ]
  },
  {
    id: 13,
    question: "Explain, in detail, why repeated, careful observation (such as in the potassium permanganate temperature experiment) is important for drawing reliable conclusions about particle behaviour, rather than relying on a single observation.",
    markingScheme: [
      "Explains the value of comparing multiple conditions (hot/room/cold) rather than just one",
      "Explains how a single observation could be misleading",
      "Connects this to the specific potassium permanganate experiment",
      "Explains how this supports a general, reliable conclusion about temperature and particle motion",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Value of multiple conditions", text: "Testing the same activity under hot, room-temperature, and ice-cold conditions allows a clear pattern to be seen across a range, rather than relying on results from just one specific condition." },
      { part: "Risk of a single observation", text: "If only hot water had been tested, it would be impossible to know whether the fast colour-spreading was specifically due to heat, or simply typical of the substance regardless of temperature." },
      { part: "Connection to the experiment", text: "By comparing all three temperatures with the potassium permanganate activity, a clear, consistent pattern emerges: faster spreading in hot water, slower in cold water, supporting the specific conclusion that temperature affects particle motion." },
      { part: "Supporting a reliable conclusion", text: "Seeing the same pattern repeated across multiple, deliberately varied conditions gives much stronger confidence that temperature (not some other unrelated factor) is truly responsible for the difference in diffusion speed." },
      { part: "Final Answer", text: "Comparing results across multiple carefully varied conditions, rather than relying on a single observation, is what allows a reliable, general conclusion (like 'heat increases particle motion') to be drawn with confidence." }
    ]
  },
  {
    id: 14,
    question: "A student wants to demonstrate the difference between a physical change and a chemical change using ideas from this chapter. Explain, in detail, how the chalk-grinding activity could be used for this purpose, and contrast it with a hypothetical example of a chemical change.",
    markingScheme: [
      "Explains why chalk grinding is a physical change",
      "Explains what would need to be true for the substance to instead be a chemical change",
      "Gives a reasonable hypothetical chemical change example for contrast",
      "Explains the key difference between the two types of change using particle identity",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Why grinding is physical", text: "Grinding chalk only changes the size of its pieces; the substance remains chalk throughout the entire process, with the same constituent particles simply separated into smaller groups." },
      { part: "What a chemical change would require", text: "For this to be a chemical change instead, the grinding process would need to actually transform the chalk's constituent particles into a completely different substance with different properties." },
      { part: "A hypothetical chemical change example", text: "If the chalk were instead burned and turned into a different substance with entirely new properties (a chemical change), the original chalk's particles would have been rearranged into new kinds of particles, unlike the grinding activity where the particles remain exactly the same substance, just separated." },
      { part: "The key difference", text: "The key difference lies in particle identity: a physical change (like grinding) never changes what the constituent particles actually are, while a chemical change transforms them into different particles altogether." },
      { part: "Final Answer", text: "The chalk-grinding activity clearly demonstrates a physical change, since the constituent particles remain chalk throughout; this contrasts with a chemical change, where the particles themselves would be transformed into an entirely different substance." }
    ]
  },
  {
    id: 15,
    question: "Explain, in detail, how the concept of interparticle spacing could be used to predict which of two unlabelled sealed containers (one gas, one liquid, both of unknown identity) is which, without opening either container, using only a compression test.",
    markingScheme: [
      "Describes a reasonable compression-based test using the sealed containers",
      "Explains the expected result for the gas-filled container",
      "Explains the expected result for the liquid-filled container",
      "Explains the interparticle-spacing reasoning behind the difference",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "The test", text: "Without opening either sealed container, gently apply a firm, controlled squeezing force to each (or observe how much a connected plunger-like mechanism can be pushed in, if fitted) and compare how much each container's volume appears to decrease." },
      { part: "Gas-filled container result", text: "The gas-filled container would be expected to show a noticeably larger decrease in volume under the same applied force." },
      { part: "Liquid-filled container result", text: "The liquid-filled container would be expected to show almost no noticeable decrease in volume under the same applied force." },
      { part: "Interparticle spacing reasoning", text: "Gases have large amounts of interparticle space that can be reduced under pressure, while liquids already have their particles packed closely together, leaving very little room to compress further." },
      { part: "Final Answer", text: "By comparing how much each sealed container compresses under the same applied force, the container showing significantly more compression can be identified as containing the gas, and the one showing little to no compression as containing the liquid -- entirely based on differences in interparticle spacing, without ever opening either container." }
    ]
  },
  {
    id: 16,
    question: "Explain, in detail, why a scientist studying a newly discovered substance would find it useful to measure both its melting point and its boiling point, connecting these measurements to what they reveal about interparticle attraction in the solid and liquid states.",
    markingScheme: [
      "Explains what melting point reveals about the solid state's interparticle attraction",
      "Explains what boiling point reveals about the liquid state's interparticle attraction",
      "Explains why measuring both gives more complete information than either alone",
      "Gives a reasonable example of how these values could help identify or characterise a substance",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "What melting point reveals", text: "The melting point indicates how much heat energy is needed to weaken the solid's interparticle attraction enough for particles to leave their fixed positions, giving a sense of how strongly the solid is held together." },
      { part: "What boiling point reveals", text: "The boiling point indicates how much additional heat energy is needed for the liquid's particles to overcome nearly all remaining interparticle attraction and escape throughout the liquid, giving a sense of how strongly the liquid state is still held together." },
      { part: "Why both together are useful", text: "Measuring only one value gives an incomplete picture -- knowing both the melting point and boiling point together shows the full temperature range over which the substance exists as a liquid, and how its interparticle attraction changes across both transitions." },
      { part: "Example use", text: "These two values, taken together, are often used as one way to help identify or distinguish between different substances, since each substance tends to have its own characteristic combination of melting and boiling points." },
      { part: "Final Answer", text: "Measuring both melting point and boiling point provides a fuller picture of a substance's interparticle attraction across two key transitions, offering more complete and more useful information than either measurement could provide on its own." }
    ]
  },
  {
    id: 17,
    question: "Explain, in detail, how the everyday experience of smelling food cooking in a kitchen from another room connects to at least three separate concepts covered in this chapter.",
    markingScheme: [
      "Identifies and explains the connection to diffusion",
      "Identifies and explains the connection to constant particle motion",
      "Identifies and explains the connection to gases having no fixed shape/volume",
      "Explains how temperature (e.g. cooking heat) might influence the experience",
      "Draws a clear, well-reasoned final conclusion connecting all the ideas together"
    ],
    answerParts: [
      { part: "Diffusion", text: "The smell reaching another room is a direct example of diffusion -- the spreading of the cooking substance's particles through the air of the house." },
      { part: "Constant particle motion", text: "This diffusion is only possible because air particles throughout the house are in constant, random motion, carrying the smell particles along with them." },
      { part: "Gases filling available space", text: "Since gases (including the air carrying the smell) have no fixed shape or volume, they can spread through open doorways and hallways to reach every connected space, including the other room." },
      { part: "Effect of cooking heat", text: "The heat from cooking likely increases the motion of the released particles and the surrounding air, making the smell spread noticeably faster and reach the other room sooner than it might at a cooler temperature." },
      { part: "Final Answer", text: "Smelling food from another room connects at least three ideas from this chapter -- diffusion, constant particle motion, and gases filling all available space -- with cooking heat further speeding up the process, showing how several separate concepts combine to explain one simple, everyday experience." }
    ]
  },
  {
    id: 18,
    question: "Explain, in detail, why simply stating 'gases have weak interparticle attraction' is a less complete answer than explaining the full reasoning behind why gases behave the way they do, using an example question and a stronger, more complete answer.",
    markingScheme: [
      "Explains why the short statement alone is incomplete",
      "Provides an example exam-style question this could apply to",
      "Gives a stronger, fuller answer including reasoning (spacing, energy, movement)",
      "Explains why the fuller answer would earn more credit or show deeper understanding",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Why the short statement is incomplete", text: "Simply stating that gas interparticle attraction is weak does not explain WHY it is weak, or connect this to the actual observable behaviours (like filling all available space) that the statement is meant to explain." },
      { part: "Example question", text: "'Explain why a gas released in one corner of a room eventually spreads to fill the entire room.'" },
      { part: "A stronger, fuller answer", text: "Gas particles have high thermal energy and large interparticle spacing, resulting in negligible interparticle attraction; because there is very little force holding them back, the particles move freely and randomly in every direction until they occupy all the space available to them." },
      { part: "Why the fuller answer is better", text: "The fuller answer connects thermal energy, spacing, and attraction together to explain the actual observed behaviour, rather than just naming one property (weak attraction) without explaining its cause or its consequence." },
      { part: "Final Answer", text: "A complete, well-reasoned answer should connect thermal energy, interparticle spacing, and interparticle attraction together to explain an observed behaviour, rather than simply stating one property in isolation -- this is what distinguishes a strong answer from an incomplete one." }
    ]
  },
  {
    id: 19,
    question: "Explain, in detail, how you would explain to a younger student, using only ideas from this chapter (without complicated technical terms), why blowing up a balloon becomes easier the more air is already inside it becomes harder, connecting your explanation to particle behaviour.",
    markingScheme: [
      "Provides a simple, accurate explanation avoiding overly technical language",
      "Correctly explains why more air inside means more particles pushing outward",
      "Explains why this makes the balloon's material harder to stretch further",
      "Notes the connection to why blowing up a balloon gets progressively harder",
      "Draws a clear, well-reasoned final conclusion in simple terms"
    ],
    answerParts: [
      { part: "Simple starting explanation", text: "Air is made of a huge number of tiny moving particles, and every time you blow into the balloon, you are pushing more of these particles inside it." },
      { part: "More particles pushing outward", text: "As more particles are packed into the balloon, they bump into its inner walls more often and more forcefully, pushing outward on the balloon's stretchy material." },
      { part: "Why the material resists further stretching", text: "As the balloon gets bigger and its material gets more stretched, it takes more force to stretch it even further, so you need to blow in even more air particles, pushing even harder, to keep inflating it." },
      { part: "Why it feels progressively harder", text: "Since both the particle pushing and the material's resistance to stretching increase together as the balloon fills up, blowing air in near the end genuinely does feel harder than blowing air in at the very start." },
      { part: "Final Answer", text: "In simple terms: more air means more tiny particles constantly bumping against the inside of the balloon, pushing it outward, and as the balloon's material gets more stretched, it resists this push more, which is exactly why blowing up a balloon gets progressively harder as it fills." }
    ]
  },
  {
    id: 20,
    question: "Explain, in detail, how the ideas in this chapter (particle spacing, attraction, and motion) could be used together to fully explain why a bottle of soda fizzes and releases gas bubbles when opened, even though it appeared to contain only liquid while sealed.",
    markingScheme: [
      "Explains that gas particles were dissolved within the liquid while sealed",
      "Explains why opening the bottle changes the conditions for the dissolved gas",
      "Explains the resulting escape of gas particles as bubbles",
      "Connects this to interparticle spacing and attraction ideas from the chapter",
      "Draws a clear, well-reasoned final conclusion"
    ],
    answerParts: [
      { part: "Dissolved gas while sealed", text: "While sealed, gas particles are dissolved within the liquid, fitting into the interparticle spaces between the liquid's own particles, similar to how sugar particles fit into water's interparticle spaces." },
      { part: "Why opening changes things", text: "Opening the bottle releases the pressure that was helping keep the gas particles dissolved within the liquid's interparticle spaces." },
      { part: "Resulting escape as bubbles", text: "With this pressure released, many of the dissolved gas particles are able to escape from the liquid, forming visible bubbles that rise and burst at the surface -- observed as fizzing." },
      { part: "Connection to spacing and attraction", text: "This directly relates to the chapter's ideas about interparticle spaces (where the dissolved gas particles were fitting) and about how weaker attraction and more freedom (once pressure is released) allow particles to move out of the liquid more easily." },
      { part: "Final Answer", text: "The fizzing occurs because dissolved gas particles, previously held within the liquid's interparticle spaces under pressure, are released as bubbles once the bottle is opened and that pressure is removed -- a real-life demonstration of interparticle spacing and particle escape working together." }
    ]
  },
];

// ── COMPETENCY / CASE-BASED (4 marks each) ──
export const SCIENCE8M_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Curious Chalk Grinder",
    caseDescription: "Riya breaks a stick of chalk into smaller and smaller pieces, eventually grinding it into a very fine powder, and observes the powder closely with a magnifying glass.",
    subQuestions: [
      { question: "Is the fine chalk powder Riya observes a new substance, or still chalk?", answer: "Still chalk -- grinding only changes the size of the pieces, not the substance itself." },
      { question: "Is this an example of a physical change or a chemical change? Explain.", answer: "A physical change, since the substance's identity has not changed, only its size and form." },
      { question: "Is the finest visible speck of powder the smallest possible unit of chalk? Explain.", answer: "No -- even this tiny speck is still made up of a very large number of much smaller constituent particles that cannot be broken down further by this method." },
      { question: "Why can't Riya see these constituent particles even with her magnifying glass?", answer: "Constituent particles are far smaller than what even a magnifying glass (or an ordinary microscope) can make visible." }
    ]
  },
  {
    id: 2,
    caseTitle: "The Disappearing Sugar Mystery",
    caseDescription: "Arjun dissolves two teaspoons of sugar into a glass of water and stirs until he can no longer see any sugar grains, but when he tastes the water, it is sweet throughout the glass.",
    subQuestions: [
      { question: "Has the sugar actually disappeared from the water?", answer: "No -- the sugar has broken into constituent particles too small to see, but they are still present, spread throughout the water." },
      { question: "Why does the water taste sweet even though no sugar can be seen?", answer: "The sugar's constituent particles are spread evenly through the water's interparticle spaces, and their presence can still be sensed by taste even though they cannot be seen." },
      { question: "If Arjun adds sand instead of sugar and stirs, would he expect the same result? Explain.", answer: "No -- sand does not dissolve, since its particles are held together too strongly for water to pull them apart; the sand would simply settle rather than spreading through the water." },
      { question: "Would the final water level after dissolving the sugar be exactly the starting water level plus the sugar's own volume? Explain.", answer: "No -- since the sugar particles fit into existing interparticle spaces in the water, the final volume would be somewhat less than the simple sum of the two original volumes." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Metal and the Ice Cube",
    caseDescription: "A student holds an ice cube in one hand and a small iron nail in the other, and wonders why the ice quickly starts melting from body heat while the iron nail shows no visible change at all.",
    subQuestions: [
      { question: "Explain, using melting points, why the ice melts from body heat but the iron does not.", answer: "Ice has a very low melting point (0 degrees Celsius), so even the relatively small amount of heat from a hand is enough to melt it, while iron's melting point (about 1538 degrees Celsius) is far higher than body heat could ever provide." },
      { question: "What does this difference in melting points suggest about the interparticle attraction in ice compared to iron?", answer: "It suggests that the interparticle attraction holding ice's particles together is much weaker than the interparticle attraction holding iron's particles together." },
      { question: "As the ice melts, describe what is happening to its particles.", answer: "The added heat energy is increasing the vibration of the ice's particles until they gain enough energy to break free from their fixed positions, turning the solid ice into liquid water." },
      { question: "Would you expect the iron nail to ever melt under normal room conditions? Explain.", answer: "No -- since normal room temperatures are vastly lower than iron's very high melting point, the iron nail would not be expected to melt under such conditions." }
    ]
  },
  {
    id: 4,
    caseTitle: "The Smoke-Filled Jars",
    caseDescription: "A student traps smoke inside one gas jar, then carefully connects it to a second, empty gas jar by removing a glass plate between them, and observes what happens to the smoke over the next few minutes.",
    subQuestions: [
      { question: "What would the student observe happening to the smoke?", answer: "The smoke would spread out and eventually fill both jars completely and evenly." },
      { question: "Explain why the smoke spreads into the second jar rather than staying only in the first.", answer: "Gas particles move freely and randomly in all directions, and with negligible interparticle attraction holding them back, they naturally spread to occupy all the space now available to them, including the second jar." },
      { question: "Would you expect the same spreading behaviour if the jars instead contained water instead of smoke-filled air? Explain.", answer: "No -- liquids like water have a definite volume and do not expand to fill all available space the way gases do; the water would stay within its own container rather than spreading into the second jar on its own." },
      { question: "What does this activity suggest about the relative interparticle attraction in gases compared to liquids?", answer: "It suggests that interparticle attraction in gases is much weaker (negligible) compared to liquids, since gas particles spread apart freely, while liquid particles remain held together within a limited space." }
    ]
  },
  {
    id: 5,
    caseTitle: "The Syringe Investigation",
    caseDescription: "A student seals the open end of a syringe filled only with trapped air and pushes the plunger, noticing the air compresses easily. The student then repeats the exact same test using water instead of air.",
    subQuestions: [
      { question: "What result would the student observe when pushing the plunger of the water-filled syringe?", answer: "Almost no change in volume -- the water would resist compression far more than the air did." },
      { question: "Explain, using interparticle spacing, why the two results are so different.", answer: "Air (a gas) has large amounts of empty interparticle space that can be reduced when force is applied, while water (a liquid) already has its particles packed closely together, leaving very little space left to compress." },
      { question: "If the student tried the same test with a solid object instead of air or water, what result would be expected, and why?", answer: "Even less compression than water would be expected, since a solid's particles are the most tightly packed of the three states, leaving essentially no room to compress." },
      { question: "What general property of matter does this investigation help demonstrate?", answer: "It demonstrates that interparticle spacing (and therefore compressibility) is smallest in solids, a little more in liquids, and greatest in gases." }
    ]
  },
  {
    id: 6,
    caseTitle: "The Potassium Permanganate Race",
    caseDescription: "A student drops identical grains of potassium permanganate into three glass tumblers: one with hot water, one with room-temperature water, and one with ice-cold water, then watches to see which turns colour first.",
    subQuestions: [
      { question: "In which tumbler would the colour spread fastest, and why?", answer: "The hot water tumbler, since higher temperature increases the speed of particle motion, which speeds up diffusion." },
      { question: "In which tumbler would the colour spread slowest, and why?", answer: "The ice-cold water tumbler, since lower temperature decreases particle motion, slowing down diffusion." },
      { question: "Did the student need to stir any of the tumblers for the colour to eventually spread? Explain.", answer: "No -- diffusion happens on its own due to the constant, random motion of water particles, without any need for stirring." },
      { question: "What is the general name for the process being observed in all three tumblers?", answer: "Diffusion -- the spreading of one substance's particles through another due to constant particle motion." }
    ]
  },
  {
    id: 7,
    caseTitle: "The Fragrant Corner",
    caseDescription: "An incense stick is lit in one corner of a closed classroom. Within a few minutes, students sitting at the far end of the room, who could not see the incense stick, begin to notice its fragrance.",
    subQuestions: [
      { question: "Explain how the fragrance reached students who were far from the incense stick.", answer: "The constantly moving air particles throughout the room collided with and carried the fragrance particles outward in all directions, until they reached even the far corners of the room." },
      { question: "Is this process best described as diffusion in a liquid or diffusion in a gas? Explain.", answer: "Diffusion in a gas, since the fragrance is spreading through air, which is a gas." },
      { question: "Would you expect the fragrance to spread faster on a hot day or a cold day? Explain.", answer: "Faster on a hot day, since higher temperature increases the speed of particle motion, speeding up diffusion." },
      { question: "If the classroom windows were opened, creating air currents, would this affect how quickly the fragrance spreads? Explain.", answer: "Yes -- air currents would likely help carry the fragrance particles even faster and further than diffusion by random particle motion alone, in addition to (not instead of) the underlying diffusion process." }
    ]
  },
  {
    id: 8,
    caseTitle: "The Soap and the Oily Stain",
    caseDescription: "A parent explains to a child that plain water alone does not remove an oily stain from clothing very well, but adding soap and water together works much better.",
    subQuestions: [
      { question: "Why doesn't plain water alone remove the oily stain effectively?", answer: "Oil and water do not mix well on their own, so plain water cannot easily lift the oil away from the fabric." },
      { question: "Explain, at the particle level, how soap helps solve this problem.", answer: "Soap particles have one end that attaches to the oil and another end that mixes with water; this dual behaviour allows the soap particles to surround the oil and lift it away, allowing it to be washed off along with the water." },
      { question: "Would soap still work this way if it only had ends that mixed with water, and no end that could attach to oil? Explain.", answer: "No -- soap's ability to clean oil specifically depends on having one end attach to the oil while the other mixes with water; without the oil-attaching end, it could not lift the oil away at all." },
      { question: "Suggest why hot, soapy water often cleans oily stains better than cold, soapy water.", answer: "Hot water increases particle motion, which can help the soap particles interact with and lift away the oil particles more effectively and quickly than in cold water." }
    ]
  },
  {
    id: 9,
    caseTitle: "The Sealed Balloon Experiment",
    caseDescription: "A student stretches a balloon over the neck of an empty glass bottle and places the bottle in a container of hot water, watching closely to see what happens to the balloon over the next few minutes.",
    subQuestions: [
      { question: "What would the student most likely observe happening to the balloon?", answer: "The balloon would likely inflate or expand slightly as the bottle sits in the hot water." },
      { question: "Explain, at the particle level, why this happens.", answer: "The heat from the hot water increases the motion of the air particles trapped inside the bottle, causing them to collide with the bottle's walls and the balloon more frequently and forcefully, increasing pressure and pushing the balloon outward." },
      { question: "What would you expect to happen if the same bottle and balloon were instead placed in ice-cold water? Explain.", answer: "The balloon would likely not inflate, and might even be pulled slightly inward, since cooling would decrease the air particles' motion, reducing pressure inside the bottle." },
      { question: "What does this experiment demonstrate about the relationship between heat and gas behaviour?", answer: "It demonstrates that heating a gas increases the motion (and effectively the pressure) of its particles, while cooling decreases it -- directly connecting thermal energy to particle behaviour in gases." }
    ]
  },
  {
    id: 10,
    caseTitle: "The Floating Ice Cube Puzzle",
    caseDescription: "A student notices that ice cubes always float at the top of a glass of water, rather than sinking to the bottom, and wonders why this happens when, for most other substances, the solid form sinks in its own liquid.",
    subQuestions: [
      { question: "Is ice's floating behaviour typical of most solids compared to their own liquid form? Explain.", answer: "No -- ice is an exception; most solids are denser than their own liquid form and would sink, but ice behaves differently." },
      { question: "Explain, using interparticle spacing, why ice floats on water.", answer: "Ice's particles are arranged slightly farther apart than in liquid water, making ice less dense than water -- and since less dense substances float on denser ones, ice floats." },
      { question: "If ice behaved like a 'typical' solid and were denser than liquid water, what would happen to ice cubes placed in a glass of water?", answer: "They would sink to the bottom instead of floating at the top." },
      { question: "Suggest one real-world consequence of ice being less dense than water, beyond ice cubes in a glass.", answer: "Ice forms and stays on the surface of ponds, lakes, or rivers in cold weather, rather than sinking, which can be an important factor for aquatic life surviving underneath the ice layer." }
    ]
  },
  {
    id: 11,
    caseTitle: "The Confused Classroom Debate",
    caseDescription: "During a class discussion, one student claims that 'boiling and evaporation are exactly the same process, just with different names', while another student disagrees.",
    subQuestions: [
      { question: "Is the first student's claim correct? Explain.", answer: "No -- while both involve a liquid turning into vapour, they are not exactly the same process; they differ in where they occur, at what temperature, and how quickly." },
      { question: "Explain one key difference between boiling and evaporation.", answer: "Boiling occurs throughout the entire liquid at one specific temperature (the boiling point), while evaporation occurs only at the surface and can happen at any temperature." },
      { question: "Explain another key difference between the two processes.", answer: "Boiling happens rapidly, visibly seen as bubbling, while evaporation happens much more slowly and is not visible as bubbles." },
      { question: "Suggest an everyday example that demonstrates evaporation happening well below the boiling point.", answer: "A puddle of water on the ground slowly disappearing over a warm day, even though the outdoor temperature is nowhere near water's boiling point." }
    ]
  },
  {
    id: 12,
    caseTitle: "The Bottled Perfume Question",
    caseDescription: "A student notices that opening a bottle of perfume in one room allows its scent to be noticed in a nearby room after some time, even without any fan or air conditioning running.",
    subQuestions: [
      { question: "Explain how the perfume's scent could travel to the nearby room without any fan.", answer: "The perfume particles spread through the air by diffusion, carried outward by the constant, random motion of air particles, without needing any fan or forced air movement." },
      { question: "Would you expect the scent to spread faster in a warm room or a cold room? Explain.", answer: "Faster in a warm room, since higher temperature increases the speed of particle motion, speeding up diffusion." },
      { question: "If the door between the two rooms were kept tightly closed, would the scent still be expected to spread to the other room? Explain.", answer: "No, or much more slowly -- diffusion still requires some pathway (like a gap or opening) for particles to travel through; a tightly sealed, fully closed door would block or greatly limit this pathway." },
      { question: "What general process is being demonstrated by the perfume's scent spreading through the air?", answer: "Diffusion -- the spreading of one substance's particles (perfume) through another (air) due to the constant motion of particles." }
    ]
  },
  {
    id: 13,
    caseTitle: "The Two Unlabelled Syringes",
    caseDescription: "A student is given two identical, sealed syringes, one filled with a gas and one filled with a liquid, but the labels have fallen off, and the student must figure out which is which without opening them.",
    subQuestions: [
      { question: "Suggest a simple test the student could perform to tell the syringes apart.", answer: "Try pushing the plunger of each syringe (with the open end sealed by a thumb or cap) and compare how much the volume decreases under similar force." },
      { question: "Which syringe would show a much bigger decrease in volume when pushed, and why?", answer: "The gas-filled syringe, since gas particles have much larger interparticle spaces that can be compressed, unlike the liquid's already closely packed particles." },
      { question: "Which syringe would show almost no change in volume, and why?", answer: "The liquid-filled syringe, since its particles are already packed closely together, leaving very little room to compress further." },
      { question: "Could the student use this same method to identify a solid instead of a gas or liquid? Explain.", answer: "Not practically in the same way, since a solid would need to be placed inside a syringe-like setup very differently -- but conceptually, a solid would be expected to compress even less than a liquid, since its particles are the most tightly packed of the three states." }
    ]
  },
  {
    id: 14,
    caseTitle: "The Cooling Soft Drink Bottle",
    caseDescription: "A sealed plastic soft drink bottle is placed in a freezer, and after some time, the student notices the bottle has become slightly harder and more rigid to squeeze compared to before.",
    subQuestions: [
      { question: "Suggest a reason, based on particle motion, why the bottle might feel different after cooling.", answer: "Cooling reduces the motion and effective spacing tendency of the gas particles inside the bottle (such as any trapped air or dissolved gas), which can reduce the internal pressure pushing outward, changing how the bottle responds to squeezing." },
      { question: "Would you expect the opposite effect (the bottle becoming easier to squeeze, or bulging) if it were instead placed in warm water? Explain.", answer: "Yes -- warming would increase particle motion, likely increasing internal pressure and making the sealed bottle feel firmer from increased outward push, or even cause it to bulge slightly, similar to the balloon experiment discussed in this chapter." },
      { question: "What general relationship between temperature and gas particle behaviour does this scenario reflect?", answer: "It reflects that increasing temperature increases gas particle motion (and effectively pressure in a sealed container), while decreasing temperature reduces particle motion (and pressure)." },
      { question: "Is this scenario more directly related to a solid, a liquid, or a gas's particle behaviour? Explain.", answer: "A gas's particle behaviour, since gas particles are the most responsive to temperature changes in terms of pressure and motion, especially at the given change compared to what a liquid would show." }
    ]
  },
  {
    id: 15,
    caseTitle: "The Two Different Boiling Points",
    caseDescription: "A student learns that water boils at 100 degrees Celsius, while a different liquid used in a science demonstration boils at only 35 degrees Celsius, and wonders what this difference might mean.",
    subQuestions: [
      { question: "What does the lower boiling point of the second liquid suggest about its interparticle attraction compared to water?", answer: "It suggests the second liquid's interparticle attraction is weaker than water's, since less heat energy was needed for its particles to escape throughout the liquid." },
      { question: "Would you expect the second liquid to evaporate more quickly than water at room temperature? Explain.", answer: "Likely yes -- since its particles are held together more weakly, they would likely also escape from the surface (evaporate) more easily at room temperature compared to water." },
      { question: "If both liquids were placed in a compression (syringe) test, would you expect a noticeable difference between them? Explain.", answer: "Not necessarily a large difference -- since both are liquids with already closely packed particles, both would likely show only a small amount of compression, unlike the much larger compression expected from a gas." },
      { question: "Explain why boiling point alone is a useful but incomplete way to compare two liquids.", answer: "Boiling point gives useful information about relative interparticle attraction strength, but does not by itself describe other properties like colour, taste, or safety -- it is one useful clue among several needed for a fuller comparison." }
    ]
  },
  {
    id: 16,
    caseTitle: "The Puzzling Puddle",
    caseDescription: "After a rain shower, a student observes a puddle of water on the pavement slowly shrinking in size over several hours on a warm, sunny day, even though the temperature never got close to water's boiling point.",
    subQuestions: [
      { question: "What process is most likely responsible for the puddle shrinking?", answer: "Evaporation -- the slow escape of water particles from the surface of the puddle." },
      { question: "Explain why this could happen even though the temperature never reached water's boiling point.", answer: "Evaporation can happen at any temperature, unlike boiling, which only happens at one specific temperature -- so the puddle's water particles could still slowly escape from the surface even well below the boiling point." },
      { question: "Would you expect the puddle to shrink faster or slower on a cooler, cloudy day? Explain.", answer: "Slower, since lower temperature reduces particle motion, slowing down the rate of evaporation." },
      { question: "Is bubbling expected to be seen in the puddle as it shrinks? Explain.", answer: "No -- bubbling is associated with boiling, not evaporation; evaporation is a much slower, surface-only process that does not produce visible bubbles." }
    ]
  },
  {
    id: 17,
    caseTitle: "The Metal Rod and the Rubber Band",
    caseDescription: "A student stretches a rubber band easily with their fingers but is unable to stretch a thin metal rod by hand at all, no matter how much force is applied.",
    subQuestions: [
      { question: "What does this observation suggest about the relative interparticle attraction in the rubber band's material compared to the metal rod?", answer: "It suggests that the metal rod's interparticle attraction is far stronger than that of the rubber band's material, since the metal strongly resists any change in the position of its particles under the same applied force." },
      { question: "Are both the rubber band and the metal rod considered solids? Explain.", answer: "Yes -- both keep a definite shape and volume under normal conditions, which is a defining property of the solid state, even though they clearly differ in how easily they can be deformed." },
      { question: "Would you expect the metal rod to have a higher or lower melting point than the rubber band's material, based on this observation? Explain.", answer: "A higher melting point would generally be expected for the metal, since its much stronger interparticle attraction would require significantly more heat energy to overcome and cause melting." },
      { question: "Does the differing 'stretchiness' of these two solids contradict the idea that solids have fixed interparticle positions? Explain.", answer: "No -- both still have particles that stay in fixed average positions and only vibrate; 'stretchiness' relates to how much a material's structure can flex slightly under force while still returning to shape (or resisting deformation) without the constituent particles freely moving past each other as they would in a liquid." }
    ]
  },
  {
    id: 18,
    caseTitle: "The Two Rooms with Open Doors",
    caseDescription: "A gas leak sensor is accidentally triggered in one room of a house that has its door wide open to a hallway connecting to several other rooms, all with doors also open.",
    subQuestions: [
      { question: "Would the leaked gas be expected to stay only in the original room? Explain.", answer: "No -- since gas particles move freely in all directions and there are open pathways (open doors) to other rooms, the gas would be expected to spread beyond the original room." },
      { question: "Explain, using particle behaviour, why closing all the doors immediately might help limit the gas's spread.", answer: "Closing the doors would block the open pathways the gas particles would otherwise use to move into other rooms, effectively containing the free movement of the gas particles within the original room." },
      { question: "Would you expect the gas to spread faster through the house on a warm day or a cool day? Explain.", answer: "Faster on a warm day, since higher temperature increases particle motion, speeding up the gas's diffusion throughout the connected rooms." },
      { question: "Is this scenario a safety-relevant real-world example of a concept from this chapter? Explain.", answer: "Yes -- it is a real-world, safety-relevant example of diffusion and the free movement of gas particles into all available connected space, showing why closing doors/windows and ventilating properly matters during an actual gas leak." }
    ]
  },
  {
    id: 19,
    caseTitle: "The Curious Case of Two Identical-Looking Blocks",
    caseDescription: "A student is given two identical-looking metal blocks and told that one has a much higher melting point than the other, and is asked to suggest what this difference could mean about their interparticle attraction, without being allowed to melt either block.",
    subQuestions: [
      { question: "Based only on the melting point information, what can the student reasonably conclude about the two blocks' interparticle attraction?", answer: "The block with the higher melting point likely has stronger interparticle attraction, since more heat energy would be needed to free its particles from their fixed positions." },
      { question: "Can the student be completely certain the blocks are made of different substances just from this melting point difference? Explain.", answer: "It strongly suggests they are different substances (or significantly different in composition), since a genuinely identical substance would be expected to have the same melting point under the same conditions -- though other unusual factors could occasionally play a role." },
      { question: "Suggest one other property (besides melting point) the student could compare to gather more evidence about the two blocks.", answer: "Any reasonable answer, such as comparing their boiling points, densities, or how easily each can be compressed or deformed." },
      { question: "Why is it useful to compare more than one property when trying to distinguish between two unknown substances?", answer: "Relying on a single property could be misleading or coincidental in rare cases; comparing multiple properties together gives a much more reliable and complete basis for concluding that two substances are genuinely different." }
    ]
  },
  {
    id: 20,
    caseTitle: "The Fizzy Bottle Mystery",
    caseDescription: "A sealed bottle of a fizzy drink shows no visible bubbles at all while closed, but immediately begins fizzing and releasing many bubbles the moment it is opened.",
    subQuestions: [
      { question: "Where were the gas bubbles before the bottle was opened?", answer: "The gas was dissolved within the liquid, with its particles fitting into the interparticle spaces between the liquid's own particles, rather than existing as visible bubbles." },
      { question: "Explain why opening the bottle causes the gas to suddenly appear as bubbles.", answer: "Opening the bottle releases the pressure that was helping keep the gas dissolved within the liquid; once this pressure drops, the dissolved gas particles are able to escape from the liquid's interparticle spaces, forming visible bubbles." },
      { question: "Would you expect a warm bottle of the same drink to fizz more or less vigorously than a cold one when opened? Explain.", answer: "A warm bottle would likely fizz more vigorously, since higher temperature increases particle motion, making it easier for the dissolved gas particles to escape once the pressure is released." },
      { question: "Does this fizzing process relate more closely to the idea of interparticle space, or to the idea of a chemical change? Explain.", answer: "It relates to interparticle space -- the gas was physically dissolved within existing spaces in the liquid, and its release as bubbles is a physical process (gas escaping from solution), not a chemical change into a new substance." }
    ]
  },
];

// ── SELF-ASSESSMENT: 50-question timed quiz (30 minutes) ──
export const SCIENCE8M_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "Matter is composed of:", options: ["A single unbreakable block", "Extremely small constituent particles", "Only visible dust", "Nothing physical"], correctAnswer: 1, explanation: "Matter is made of extremely small constituent particles." },
  { id: 2, question: "Grinding chalk into fine powder is:", options: ["A chemical change", "A physical change", "A change into a new substance", "Not a real change"], correctAnswer: 1, explanation: "Grinding only changes size; the chalk remains chalk, so it is a physical change." },
  { id: 3, question: "When sugar dissolves in water and cannot be seen, this shows:", options: ["The sugar vanished completely", "The sugar broke into tiny particles spread through the water", "The water turned into sugar", "Nothing happened"], correctAnswer: 1, explanation: "The sugar's particles spread through the water, too small to see but detectable by taste." },
  { id: 4, question: "Interparticle space is:", options: ["The force between particles", "The empty gap between particles", "A type of molecule", "A measuring tool"], correctAnswer: 1, explanation: "Interparticle space is the empty gap between particles." },
  { id: 5, question: "Interparticle attraction depends on:", options: ["Only colour", "The substance's nature and distance between particles", "Nothing at all", "Only room temperature"], correctAnswer: 1, explanation: "Interparticle attraction depends on the substance and particle distance." },
  { id: 6, question: "A small increase in particle distance causes attraction to:", options: ["Increase sharply", "Decrease sharply", "Stay the same", "Reverse direction"], correctAnswer: 1, explanation: "Even small distance increases sharply weaken interparticle attraction." },
  { id: 7, question: "Acharya Kanad's early particle concept was called:", options: ["Molecule", "Parmanu", "Electron", "Compound"], correctAnswer: 1, explanation: "Acharya Kanad proposed the idea of 'Parmanu'." },
  { id: 8, question: "In solids, particles can:", options: ["Move freely", "Only vibrate in fixed positions", "Escape easily", "Never exist"], correctAnswer: 1, explanation: "Solid particles vibrate about fixed positions only." },
  { id: 9, question: "Melting point is defined as:", options: ["The temperature liquids boil at", "The minimum temperature a solid becomes a liquid at atmospheric pressure", "The temperature gases form", "A type of interparticle space"], correctAnswer: 1, explanation: "This is the definition of melting point." },
  { id: 10, question: "Ice melts at:", options: ["100°C", "0°C", "133°C", "1538°C"], correctAnswer: 1, explanation: "Ice melts at 0 degrees Celsius." },
  { id: 11, question: "Iron's melting point is approximately:", options: ["0°C", "133°C", "1538°C", "500°C"], correctAnswer: 2, explanation: "Iron's melting point is approximately 1538 degrees Celsius." },
  { id: 12, question: "Liquids have:", options: ["Fixed shape and volume", "Definite volume, no fixed shape", "No fixed volume at all", "Fixed shape, no volume"], correctAnswer: 1, explanation: "Liquids keep a definite volume but take the shape of their container." },
  { id: 13, question: "A finger can pass through water because:", options: ["Water has no particles", "Water particles move and temporarily shift aside", "Water is a solid", "Water repels fingers"], correctAnswer: 1, explanation: "Water particles are free to move and temporarily displace." },
  { id: 14, question: "Boiling point is the temperature at which:", options: ["A solid melts", "A liquid turns to vapour throughout its volume", "A gas becomes a solid", "Diffusion stops"], correctAnswer: 1, explanation: "This is the definition of boiling point." },
  { id: 15, question: "Evaporation occurs:", options: ["Only at the boiling point", "At the surface, at any temperature, slowly", "Throughout the liquid rapidly", "Only in solids"], correctAnswer: 1, explanation: "Evaporation is a slow, surface-only process at any temperature." },
  { id: 16, question: "Liquids and gases are both called:", options: ["Solids", "Fluids", "Crystals", "Molecules"], correctAnswer: 1, explanation: "Both liquids and gases are classified as fluids." },
  { id: 17, question: "In gases, interparticle attraction is:", options: ["Very strong", "Negligible", "Moderate", "Impossible to measure"], correctAnswer: 1, explanation: "Gases have negligible interparticle attraction." },
  { id: 18, question: "Gases have:", options: ["Fixed shape and volume", "Fixed volume only", "No fixed shape or volume", "Fixed shape only"], correctAnswer: 2, explanation: "Gases have neither fixed shape nor fixed volume." },
  { id: 19, question: "Smoke trapped in one jar, connected to an empty jar, will:", options: ["Stay in the first jar", "Spread to fill both jars", "Vanish", "Turn to liquid"], correctAnswer: 1, explanation: "Gas particles spread to fill all available space." },
  { id: 20, question: "Interparticle spacing is greatest in:", options: ["Solids", "Liquids", "Gases", "None of these"], correctAnswer: 2, explanation: "Gases have the greatest interparticle spacing." },
  { id: 21, question: "A gas-filled syringe compresses easily because:", options: ["Gas particles have large spaces to reduce", "Gas has no particles", "Gas particles are fixed", "Gas is a liquid"], correctAnswer: 0, explanation: "Gas particles have large interparticle spaces that can be reduced." },
  { id: 22, question: "Water in a syringe barely compresses because:", options: ["Water particles are far apart", "Water particles are already packed closely", "Water has no particles", "Water is a gas"], correctAnswer: 1, explanation: "Liquid particles are already closely packed, leaving little room to compress." },
  { id: 23, question: "When sugar dissolves in water, the final volume is:", options: ["Exactly the sum of both volumes", "Less than the sum of both volumes", "Always double", "Impossible to measure"], correctAnswer: 1, explanation: "Sugar fits into existing interparticle spaces, so the volume increase is less than the simple sum." },
  { id: 24, question: "Interparticle space in a solid is:", options: ["Filled with air", "Genuinely empty", "Filled with water", "Filled with gas"], correctAnswer: 1, explanation: "Interparticle space is genuinely empty." },
  { id: 25, question: "Suspended particulate matter (in air pollution) refers to:", options: ["Constituent particles", "Visible dust/soot particles, much larger than constituent particles", "Nothing physical", "Only gas particles"], correctAnswer: 1, explanation: "Suspended particulate matter is much larger than constituent particles." },
  { id: 26, question: "Diffusion is:", options: ["Freezing of a liquid", "Spreading of particles through another substance due to particle motion", "A colour change only", "A type of melting"], correctAnswer: 1, explanation: "Diffusion is particle spreading due to constant motion." },
  { id: 27, question: "A coloured grain spreads through still water because:", options: ["Someone stirred it", "Water particles are always moving", "The grain evaporated", "Water has no particles"], correctAnswer: 1, explanation: "Constant particle motion causes diffusion without stirring." },
  { id: 28, question: "Diffusion is fastest in:", options: ["Ice-cold water", "Room-temperature water", "Hot water", "Frozen water"], correctAnswer: 2, explanation: "Higher temperature speeds up particle motion and diffusion." },
  { id: 29, question: "Incense fragrance spreading through a room demonstrates:", options: ["Diffusion in a solid", "Diffusion in a gas", "Melting", "Boiling"], correctAnswer: 1, explanation: "This demonstrates diffusion of fragrance particles through air." },
  { id: 30, question: "Soap removes oil because:", options: ["It repels water", "One end attaches to oil, the other mixes with water", "It dissolves the fabric", "It has no effect on oil"], correctAnswer: 1, explanation: "Soap particles have a dual-attachment structure that lifts oil away." },
  { id: 31, question: "The physical state of a substance is mainly determined by:", options: ["Its colour", "The thermal energy of its particles", "Its taste", "Its weight alone"], correctAnswer: 1, explanation: "Thermal energy determines particle spacing and attraction, which decide the state." },
  { id: 32, question: "At the melting point, added heat energy is used to:", options: ["Increase colour", "Weaken interparticle attraction enough for particles to move", "Destroy particles", "Convert particles to energy"], correctAnswer: 1, explanation: "Heat energy at melting point weakens attraction enough for particles to move." },
  { id: 33, question: "In gases, particles have:", options: ["No energy", "Enough energy to nearly overcome interparticle attraction", "Less energy than solids", "Fixed positions"], correctAnswer: 1, explanation: "Gas particles have enough energy to overcome most interparticle attraction." },
  { id: 34, question: "Constituent particles are more specifically called:", options: ["Only molecules", "Atoms and molecules", "Only electrons", "Only dust"], correctAnswer: 1, explanation: "Constituent particles are atoms and molecules." },
  { id: 35, question: "A water molecule contains:", options: ["1 hydrogen, 1 oxygen", "2 hydrogen, 1 oxygen", "2 oxygen, 1 hydrogen", "3 hydrogen only"], correctAnswer: 1, explanation: "A water molecule has two hydrogen atoms and one oxygen atom." },
  { id: 36, question: "Some atoms, like hydrogen, usually:", options: ["Exist alone", "Combine to form molecules", "Never combine", "Only exist in solids"], correctAnswer: 1, explanation: "Certain atoms combine with others of the same element to form molecules." },
  { id: 37, question: "Ice is an exception because:", options: ["It has no particles", "Its particles are farther apart than in liquid water", "It has the highest melting point", "It cannot melt"], correctAnswer: 1, explanation: "Ice's particles are spaced farther apart than in liquid water." },
  { id: 38, question: "Ice floats on water because:", options: ["Ice is warmer", "Ice is less dense due to wider particle spacing", "Ice has no attraction", "Ice is a gas"], correctAnswer: 1, explanation: "Ice's wider spacing makes it less dense, so it floats." },
  { id: 39, question: "Sublimation is:", options: ["Liquid to gas directly", "Solid directly to vapour, no liquid stage", "Gas to solid only", "Solid to liquid only"], correctAnswer: 1, explanation: "Sublimation is a direct solid-to-vapour change." },
  { id: 40, question: "Gas pressure on container walls is caused by:", options: ["Stationary particles", "Constant particle collisions with the walls", "No particles at all", "Strong attraction to the walls"], correctAnswer: 1, explanation: "Constant collisions of moving particles create gas pressure." },
  { id: 41, question: "Sand doesn't dissolve in water because:", options: ["Sand has no particles", "Sand's particles are held together too strongly for water to pull apart", "Water has no particles", "Sand repels water"], correctAnswer: 1, explanation: "Water cannot overcome the strong forces holding sand's particles together." },
  { id: 42, question: "A sealed balloon in hot water expands because:", options: ["The balloon shrinks", "Increased particle motion pushes outward", "Air disappears", "Cold water was used"], correctAnswer: 1, explanation: "Heating increases gas particle motion, increasing outward pressure on the balloon." },
  { id: 43, question: "Interparticle attraction, strongest to weakest, ranks as:", options: ["Gas, liquid, solid", "Liquid, solid, gas", "Solid, liquid, gas", "Gas, solid, liquid"], correctAnswer: 2, explanation: "Attraction is strongest in solids, then liquids, then gases." },
  { id: 44, question: "Interparticle spacing, smallest to largest, ranks as:", options: ["Gas, liquid, solid", "Solid, liquid, gas", "Liquid, gas, solid", "Gas, solid, liquid"], correctAnswer: 1, explanation: "Spacing is smallest in solids, then liquids, then largest in gases." },
  { id: 45, question: "Which best describes the overall theme of this chapter?", options: ["Matter is a single solid block", "Matter is made of tiny particles whose spacing, attraction, and motion decide its state", "All substances behave identically", "Particles exist only in gases"], correctAnswer: 1, explanation: "This captures the chapter's central theme." },
  { id: 46, question: "Why does a liquid take the shape of its container?", options: ["Its particles are fixed", "Its particles are free to move", "It has no particles", "It is a solid"], correctAnswer: 1, explanation: "Liquid particles are free to move, allowing the liquid to flow into any shape." },
  { id: 47, question: "200 mL of water poured into differently shaped containers:", options: ["Changes volume each time", "Keeps the same volume, changes shape", "Keeps the same shape, changes volume", "Disappears"], correctAnswer: 1, explanation: "Volume stays the same; only shape changes." },
  { id: 48, question: "Which correctly matches a term with its meaning: 'Fluid'", options: ["A substance with a fixed shape", "A substance that flows and has no fixed shape", "Only a type of gas", "Only a type of solid"], correctAnswer: 1, explanation: "A fluid flows and has no fixed shape -- both liquids and gases qualify." },
  { id: 49, question: "Why does a gas released in a room spread to fill the entire room?", options: ["It has strong attraction holding it in place", "Its particles move freely in all directions with negligible attraction", "It turns into a liquid", "It has no particles"], correctAnswer: 1, explanation: "Gas particles move freely due to negligible interparticle attraction." },
  { id: 50, question: "Which best explains why hot water helps diffusion happen faster than cold water?", options: ["Hot water has fewer particles", "Hot water particles move faster, speeding up spreading", "Hot water has stronger interparticle attraction", "Temperature has no effect on diffusion"], correctAnswer: 1, explanation: "Higher temperature increases particle speed, speeding up diffusion." },
];
