// Class 8 Optics Study Data
import { QuizQuestion, NCERTSolvedQuestion, ShortQuestion, LongQuestion, AssertionReasonQuestion, CompetencyQuestion } from "../types-custom";

export interface NCERTSolvedQuestionCustom {
  id: number;
  questionNumber: string;
  question: string;
  given: { [key: string]: string };
  formulaUsed: string;
  derivationSteps: string[];
  finalAnswer: string;
  conceptualTip?: string;
  grade?: "8th" | "10th";
}

// NCERT SOLVED STUDY ELEMENT (Class 8) - 20 Solved Questions
export const CLASS8_NCERT_SOLVED: NCERTSolvedQuestionCustom[] = [
  {
    id: 1,
    questionNumber: "Textbook Exercise Q1",
    question: "Suppose you are in a dark room. Can you see objects in the room? Can you see objects outside the room? Explain.",
    given: { "Illumination level inside": "Pitch dark", "Illumination level outside": "Daylight/Lamp lit" },
    formulaUsed: "Sight requires light to reflect off an object and enter our eyes.",
    derivationSteps: [
      "No light exists to reflect from inside objects. Hence room objects are invisible.",
      "Light reflecting off outside objects enters our eyes through the door/window, making them visible."
    ],
    finalAnswer: "You cannot see objects inside the dark room due to lack of reflected light. You can see objects outside because light reflects off them and reaches your eyes.",
    conceptualTip: "Light itself is invisible, but it enables us to see everything else."
  },
  {
    id: 2,
    questionNumber: "Textbook Exercise Q2",
    question: "Differentiate between regular and diffused reflection. Does diffused reflection mean the failure of the laws of reflection?",
    given: { "Regular Surface": "Highly polished flat mirror", "Diffused Surface": "Rough cardboard" },
    formulaUsed: "Laws of Reflection: ∠i = ∠r",
    derivationSteps: [
      "In regular reflection, parallel rays remain parallel after bouncing off a smooth surface.",
      "In diffused reflection, parallel rays scatter in all directions because the surface normals at individual touchpoints are tilted.",
      "Every single ray obeys ∠i = ∠r perfectly at its local contact point."
    ],
    finalAnswer: "Regular reflection occurs from smooth surfaces, diffused from rough ones. Diffused reflection is NOT a failure of reflection laws; it is caused by microscopic surface unevenness.",
    conceptualTip: "The laws of reflection are never violated, regardless of how irregular the surface is."
  },
  {
    id: 3,
    questionNumber: "Textbook Exercise Q3",
    question: "State the laws of reflection of light.",
    given: { "Reflection Boundary": "Flat mirror surface" },
    formulaUsed: "1) ∠i = ∠r, 2) Same Plane rule",
    derivationSteps: [
      "Incident ray, normal at point of contact, and reflected ray all reside on the exact same plane.",
      "The angle of incidence (∠i) is always strictly equal to the angle of reflection (∠r)."
    ],
    finalAnswer: "1. The angle of incidence equals the angle of reflection. 2. The incident ray, reflected ray, and normal at the point of incidence lie in the same physical plane.",
    conceptualTip: "Both laws apply to all kinds of reflecting surfaces, spherical, plane, or irregular."
  },
  {
    id: 4,
    questionNumber: "Textbook Exercise Q4",
    question: "Describe an experiment to show that the incident ray, reflected ray, and normal lie in the same plane.",
    given: { "Apparatus": "White sheet of paper, drawing board, plane mirror, pins, wooden block, torch" },
    formulaUsed: "Geometric coplanarity projection",
    derivationSteps: [
      "Fix sheet of paper on a drawing board. Place mirror vertically on the line.",
      "Project a light ray from torch. Draw line for incident ray and reflected ray.",
      "Fold or cut the edge of paper where reflected ray travels. The reflected ray disappears from the folded paper portion.",
      "Bring paper back flat; ray is visible. This proves they require a single shared flat plane."
    ],
    finalAnswer: "By clipping a sheet of paper and folding the bottom half, the reflected ray is lost in space, proving it only travels in the exact shared plane of incidence.",
    conceptualTip: "A plane is a two-dimensional sheet extending infinitely; three-dimensional bending violates reflection geometry."
  },
  {
    id: 5,
    questionNumber: "Textbook Exercise Q5",
    question: "An incident ray makes an angle of 30° with the surface of a plane mirror. Calculate its angle of reflection.",
    given: { "Angle with mirror surface": "30°", "Perpendicular angle": "90°" },
    formulaUsed: "i = 90° - (angle with mirror surface); r = i",
    derivationSteps: [
      "Calculate angle of incidence: i = 90° - 30° = 60°.",
      "Applying law of reflection: r = i = 60°."
    ],
    finalAnswer: "The angle of reflection is 60°.",
    conceptualTip: "Angles must always be measured from the normal (the line perpendicular to the surface)!"
  },
  {
    id: 6,
    questionNumber: "Textbook Exercise Q6",
    question: "How many images of a candle will be formed if it is placed between two parallel plane mirrors separated by 40 cm?",
    given: { "Angle between mirrors (θ)": "0° (parallel)" },
    formulaUsed: "n = (360/θ) - 1",
    derivationSteps: [
      "Parallel mirrors have an angle θ = 0°.",
      "Substituting into formula: n = (360/0) - 1 which approaches infinity."
    ],
    finalAnswer: "An infinite number of images are formed.",
    conceptualTip: "Each image in one mirror acts as a virtual object for the other mirror, leading to an endless cycle of reflection."
  },
  {
    id: 7,
    questionNumber: "Textbook Exercise Q7",
    question: "Explain why our eyes cannot focus on objects placed closer than 25 cm from them.",
    given: { "Minimum safe boundary": "25 cm (Leat Distance of Distinct Vision)" },
    formulaUsed: "Ciliary muscle limits",
    derivationSteps: [
      "The eye lens changes its focal length using ciliary muscles to focus objects.",
      "To focus closer, the ciliary muscles must contract to make the lens fat and bulged.",
      "Ciliary muscles cannot contract beyond a biological safe maximum limit, which corresponds to 25 cm."
    ],
    finalAnswer: "25 cm is the Near Point of a normal human eye. Light rays from objects closer than this cannot be converged sufficiently onto the retina, causing a blurred image.",
    conceptualTip: "Attempts to read closer than 25 cm strain the ciliary muscles, causing severe headaches."
  },
  {
    id: 8,
    questionNumber: "Textbook Exercise Q8",
    question: "What is a Kaleidoscope? On what optical concept is it constructed?",
    given: { "Apparatus": "Three rectangular glass strip mirrors, cardboard tube, colored glass shards" },
    formulaUsed: "Multiple reflections at 60° angles",
    derivationSteps: [
      "Align three mirrors to form a triangle (angle between mirrors is 60°).",
      "Enclose inside a cylinder. Seal one end with transparent plate and dry colored glass pieces.",
      "Looking through, we see beautifully symmetric repeating geometric patterns due to repetitive multiple reflections."
    ],
    finalAnswer: "A kaleidoscope is an optical toy made of three plane mirrors tilted at 60° to form a prism. It works on the principle of multiple reflections to form infinite beautiful patterns.",
    conceptualTip: "A kaleidoscope never displays the exact same pattern twice; rotating it changes the shards' placement."
  },
  {
    id: 9,
    questionNumber: "Textbook Exercise Q9",
    question: "What is the function of the retina and what cells does it contain?",
    given: { "Part of Eye": "Retina (the screen)" },
    formulaUsed: "Optic signal transduction",
    derivationSteps: [
      "The retina acts as a light-sensitive screen at the back of the eyeball.",
      "It contains two types of cells: Rods (detecting light intensity, active in dim light) and Cones (detecting color and fine detail in bright light)."
    ],
    finalAnswer: "The retina converts light into electrical impulses. It contains Rod cells (sensitive to dim light) and Cone cells (sensitive to color and bright light).",
    conceptualTip: "Nocturnal animals have many rods and few cones, allowing excellent dark navigation but poor color vision."
  },
  {
    id: 10,
    questionNumber: "Textbook Exercise Q10",
    question: "What occurs to the size of the pupil when you walk from a bright sunny courtyard into a dark cinema hall?",
    given: { "First environment": "Bright courtyard", "Second environment": "Dim cinema hall" },
    formulaUsed: "Pupil adjustment by Iris muscle",
    derivationSteps: [
      "In bright light, the pupil is small to limit excessive light entering and damaging the eye.",
      "In a dim room, the pupil must expand to allow maximum light in so we can perceive the dark room.",
      "This expansion takes a few seconds, which is why we feel temporarily blinded initially."
    ],
    finalAnswer: "The pupil expands (its diameter increases) to let in more light. This process is controlled by the iris's circular and radial muscles.",
    conceptualTip: "The iris acts like the aperture of a camera, shielding or exposing the sensor as needed."
  },
  {
    id: 11,
    questionNumber: "Textbook Exercise Q11",
    question: "Explain how visually impaired individuals can read and write using non-visual systems.",
    given: { "Target user": "Visually challenged persons" },
    formulaUsed: "Tactile sensation and Braille code",
    derivationSteps: [
      "Visually challenged individuals rely on touch, sound, and specialized tactile scripts.",
      "The Braille system uses raised dots arranged in a 6-dot grid to represent letters, numbers, and symbols.",
      "Special stylus and boards are used to write, and readers sense it sliding their fingertips over raised dots."
    ],
    finalAnswer: "They read and write using the Braille system, which represents alphanumeric keys using raised dots that can be read touch-wise using fingertips.",
    conceptualTip: "Louis Braille invented this system in 1821, transforming education accessibility."
  },
  {
    id: 12,
    questionNumber: "Textbook Exercise Q12",
    question: "Identify the parts of the human eye through which light enters and where it forms clean image focus.",
    given: { "Enters": "Through transparent window", "Focuses": "On rear sensory screen" },
    formulaUsed: "Refractive pathways of eye",
    derivationSteps: [
      "Light first passes through the transparent outer layer called Cornea.",
      "It travels through the Pupil aperture and is refracted by the crystalline Convex Lens.",
      "The lens converges the rays to a sharp focus exactly on the Retina."
    ],
    finalAnswer: "Light enters the eye through the transparent cornea. It is bent by the eye's convex lens to form an inverted real image on the retina.",
    conceptualTip: "Although the image formed on the retina is inverted, our brain flips it upright automatically."
  },
  {
    id: 13,
    questionNumber: "Textbook Exercise Q13",
    question: "Two mirrors are joined perpendicularly (90°). A ray is incident on one mirror at an angle of 30°. Show its path on the second mirror.",
    given: { "Angle between mirrors": "90°", "Incident angle on Mirror 1 (i1)": "30°" },
    formulaUsed: "Mirror reflection laws + geometry of normal lines",
    derivationSteps: [
      "Since i1 = 30°, the reflection angle r1 = 30°.",
      "The reflected ray meets Mirror 2. Since the mirrors are at 90°, the normal lines are also at 90°.",
      "Using the triangle angle sum: the sum of angles of incidence at the two mirrors must equal 90° (since they are perpendicular, normal lines are perpendicular).",
      "Thus, angle of incidence at Mirror 2 (i2) = 90° - 30° = 60°.",
      "The angle of reflection from Mirror 2 (r2) is equal to i2 = 60°."
    ],
    finalAnswer: "The ray is reflected from the first mirror at 30° and will strike the second mirror with an angle of incidence of 60°, reflecting off at 60°.",
    conceptualTip: "For 90° mirrors, a ray always emerges perfectly parallel to its original incident direction, acting as a retroreflector."
  },
  {
    id: 14,
    questionNumber: "Textbook Exercise Q14",
    question: "Why do we say that plane mirrors form images of 'virtual' nature?",
    given: { "Device": "Standard household plane mirror" },
    formulaUsed: "Divergence of reflected beams",
    derivationSteps: [
      "Real rays of light from an object bounce off a plane mirror and diverge.",
      "Our eyes receive these diverging rays and trace them backward in straight lines.",
      "They meet at a point behind the mirror. No real light exists behind the mirror, hence the image is virtual."
    ],
    finalAnswer: "The image is virtual because light rays do not actually pass through or meet at the image point behind the mirror; they only appear to extend from there.",
    conceptualTip: "A virtual image cannot be captured on a paper or screen placed behind the mirror."
  },
  {
    id: 15,
    questionNumber: "Textbook Exercise Q15",
    question: "What is the blind spot of the human eye and why is it devoid of sight?",
    given: { "Part": "Optic nerve junction" },
    formulaUsed: "Receptor occlusion",
    derivationSteps: [
      "The optic nerve carries sensory signals from the retina to the brain.",
      "At the junction of the optic nerve and the retina, there are no rod cells or cone cells.",
      "Because there are no photoreceptors here, light falling on this region cannot trigger nerve signals."
    ],
    finalAnswer: "The blind spot is the junction of the optic nerve and retina. Since it contains zero light-sensitive cells (rods or cones), no vision is possible if an image falls here.",
    conceptualTip: "Our brain fills in the blank blind spot automatically using information from the other eye."
  },
  {
    id: 16,
    questionNumber: "Textbook Exercise Q16",
    question: "What is power of accommodation of the eye and how do ciliary muscles assist it?",
    given: { "Eye function": "Accommodation" },
    formulaUsed: "focal length changes (P = 1/f)",
    derivationSteps: [
      "To see distant objects, the ciliary muscles relax, making the lens thin, which increases focal length.",
      "To see nearby objects, ciliary muscles contract, making the lens thick and curved, decreasing the focal length.",
      "This capability to change focal length is called accommodation."
    ],
    finalAnswer: "The power of accommodation is the ability of the eye lens to adjust its focal length to view nearby and far objects clearly, mediated by the ciliary muscles.",
    conceptualTip: "This elasticity decreases with age, a condition known as presbyopia."
  },
  {
    id: 17,
    questionNumber: "Textbook Exercise Q17",
    question: "Describe visually regular reflection and diffused reflection with examples.",
    given: { "Regular vs Diffused examples": "Still water vs rippling pond" },
    formulaUsed: "Surface polish dependency",
    derivationSteps: [
      "Regular reflection occurs from a surface so smooth that light rays reflect parallel, forming a sharp copy (e.g. still puddle).",
      "Diffused reflection occurs from rough surfaces, reflecting rays in multiple directions (e.g., brick wall)."
    ],
    finalAnswer: "Regular reflection occurs from polished surfaces like plane mirrors, forming clear images. Diffused reflection occurs from rough surfaces like wood, scattering light.",
    conceptualTip: "Almost everything we see (walls, tables, paper) displays diffused reflection."
  },
  {
    id: 18,
    questionNumber: "Textbook Exercise Q18",
    question: "What is lateral inversion? Explain with a simple letter example from a mirror.",
    given: { "Object": "The letter 'B' written on paper" },
    formulaUsed: "Left-right symmetry shift",
    derivationSteps: [
      "When you hold the letter 'B' in front of a mirror, the left side of the letter appears as the right in the image.",
      "This is because the mirror reflects the front-facing rays straight back."
    ],
    finalAnswer: "Lateral inversion is the left-to-right swap of an object in its mirror reflection. E.g. holding 'RED' to a mirror displays it mirrored.",
    conceptualTip: "This is why the word 'AMBULANCE' is written in laterally inverted form on emergency vehicles."
  },
  {
    id: 19,
    questionNumber: "Textbook Exercise Q19",
    question: "At what distance is the image of an object formed in a plane mirror? Calculate.",
    given: { "Object distance from mirror": "1.5 meters" },
    formulaUsed: "Object distance (u) = Image distance (v)",
    derivationSteps: [
      "In plane mirrors, the image is formed as far behind the mirror as the object is in front.",
      "Since object distance is 1.5m, the image is likewise formed 1.5m behind the mirror reflecting sheet."
    ],
    finalAnswer: "The image is formed at a distance of 1.5 meters behind the mirror plate.",
    conceptualTip: "The total distance between the object and its image is u + v = 1.5 + 1.5 = 3 meters."
  },
  {
    id: 20,
    questionNumber: "Textbook Exercise Q20",
    question: "Why does the eye blink automatically when a fly rushes toward it?",
    given: { "Stimulus": "Sudden approach of a fly" },
    formulaUsed: "Biological reflex action",
    derivationSteps: [
      "Sensory receptors in the eye detect a threat of physical impact.",
      "Signals bypass complex thinking and trigger reflex muscles around the eyelids, causing immediate closure."
    ],
    finalAnswer: "This is an automatic defensive reflex response to protect the eyeball and cornea from physical injury, dust, or impact.",
    conceptualTip: "The blink reflex occurs in less than 0.1 seconds."
  }
];

// CLASS 8 QUESTION BANK CATEGORIES (Each with exactly 20 questions)

// 1. MCQS (20 Questions)
export const CLASS8_MCQS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of the following is responsible for keeping the shape of our eyes round and turgid?",
    options: ["Rods", "Cones", "Vitreous Humor fluid", "Iris muscle"],
    correctAnswer: 2,
    explanation: "Vitreous Humor is a thick, jelly-like transparent fluid that fills the space behind the lens, maintaining intraocular pressure to keep the eyeball spherical."
  },
  {
    id: 2,
    question: "An incident ray hits a plane mirror making a 40° angle with the mirror's flat face. What is the angle of reflection?",
    options: ["40°", "55°", "50°", "90°"],
    correctAnswer: 2,
    explanation: "If angle with surface is 40°, the angle of incidence i = 90° - 40° = 50°. Since i = r, the angle of reflection is also 50°."
  },
  {
    id: 3,
    question: "Which cells in the human eye are extremely sensitive to dim light, allowing animals like owls to see excellently at night?",
    options: ["Cone cells", "Lens fibers", "Rod cells", "Ganglion fibers"],
    correctAnswer: 2,
    explanation: "Rod cells are highly sensitive to low levels of light, enabling monochromatic night and dim vision."
  },
  {
    id: 4,
    question: "What is the angle between the incident and reflected ray if light falls normal (at 90° with surface) on a flat mirror?",
    options: ["90°", "180°", "0°", "45°"],
    correctAnswer: 2,
    explanation: "Falling at 90° to the surface means the ray is aligned along the normal, so angle of incidence is 0°. The reflection angle is also 0°, and the angle between both rays is 0° + 0° = 0° (the ray bounces straight back along its path)."
  },
  {
    id: 5,
    question: "A girl stands 3 meters in front of a mirror. She walks 1 meter closer to it. What is the distance between her and her image now?",
    options: ["6 meters", "4 meters", "2 meters", "3 meters"],
    correctAnswer: 1,
    explanation: "Starting at 3m, walking 1m closer leaves her at 2m in front. Her image is 2m behind. The distance between her and her image is 2m + 2m = 4m."
  },
  {
    id: 6,
    question: "How many mirror strips are used to construct a standard childhood kaleidscope?",
    options: ["Two parallel", "Three tilted at 60°", "Four as a box", "One single mirror"],
    correctAnswer: 1,
    explanation: "A standard kaleidoscope uses 3 mirror strips jointed in an equilateral triangular configuration at 60° angles."
  },
  {
    id: 7,
    question: "Which part of the human eye gives it its specific distinctive color (such as black, brown, blue, or green)?",
    options: ["Sclera", "Iris", "Pupil", "Retina"],
    correctAnswer: 1,
    explanation: "The iris is a colored muscular sheet. Its chemical pigment composition determines whether a person's eyes appear blue, hazel, or brown."
  },
  {
    id: 8,
    question: "A material which does not permit light to pass through it at all is known as a/an:",
    options: ["Transparent material", "Opaque material", "Translucent material", "Luminous material"],
    correctAnswer: 1,
    explanation: "Opaque materials block light completely, casting dark, sharp shadows."
  },
  {
    id: 9,
    question: "Which of the following devices is used by submarine crews to view objects on the surface of the sea?",
    options: ["Telescope", "Microscope", "Periscope", "Spectroscope"],
    correctAnswer: 2,
    explanation: "A periscope utilizes two mirrors placed at 45° angles inside a tube to let users see over obstacles or water surfaces."
  },
  {
    id: 10,
    question: "What type of light is detected by the human cone cells?",
    options: ["Dim starlight", "Bright light & colored light", "X-ray waves", "Infrared radiation only"],
    correctAnswer: 1,
    explanation: "Cone cells are excited only in bright light and are responsible for our color vision."
  },
  {
    id: 11,
    question: "What cells are practically missing as compared to rods in nocturnal birds like owls, which is why they cannot see colors in the dark?",
    options: ["Stem cells", "Lens layers", "Cone cells", "Ciliary nodes"],
    correctAnswer: 2,
    explanation: "Owls have highly abundant rod cells (for dim sight) but almost zero cone cells, meaning they cannot identify colored spaces in daylight."
  },
  {
    id: 12,
    question: "The thin transparent layer forming a protective bulge over the center of font eye is called the:",
    options: ["Lens", "Cornea", "Choroid", "Retina"],
    correctAnswer: 1,
    explanation: "The cornea is the glassy dome covering the pupil and iris, serving as the first refracting boundary of the eye."
  },
  {
    id: 13,
    question: "If two plane mirrors are jointed perpendicularly at 90°, how many images will be formed of an apple placed between them?",
    options: ["Two", "Three", "Four", "Infinite"],
    correctAnswer: 1,
    explanation: "Using n = (360/θ) - 1 with θ = 90°: n = (360/90) - 1 = 4 - 1 = 3 images."
  },
  {
    id: 14,
    question: "Which system is the globally approved touch-based reading script utilized by visually disabled individuals?",
    options: ["Morse Code", "Binary Code", "Braille System", "Latin Script"],
    correctAnswer: 2,
    explanation: "The Braille system uses patterns of six raised cells that are read by running fingers across them."
  },
  {
    id: 15,
    question: "What is the primary cause behind the condition called 'cataract' in senior people?",
    options: ["The retina peeling off", "The eye lens turning hazy, cloudy, and opaque", "Ciliary muscles tightening up", "Lack of rod cells"],
    correctAnswer: 1,
    explanation: "Cataract is the progressive clouding of the clear crystalline lens, obstructing light and causing hazy vision or blindness."
  },
  {
    id: 16,
    question: "The nerve signals triggered by the retina are delivered directly to the human brain via which path?",
    options: ["Spinal cord", "Olfactory tract", "Optic nerve", "Auditory node"],
    correctAnswer: 2,
    explanation: "The optic nerve acts as the biological data cable transmitting visual signals from retinal cells straight to the brain's occipital lobe."
  },
  {
    id: 17,
    question: "What is regular reflection?",
    options: ["Scattering of light by wood", "Parallel rays staying parallel after bouncing on smooth surfaces", "Reflection occurring in dark rooms", "Absorption of rays by glass"],
    correctAnswer: 1,
    explanation: "Regular reflection occurs on flat, smooth surfaces, causing parallel incoming rays to bounce off in structured parallel rays."
  },
  {
    id: 18,
    question: "To protect our eyesight from damage, we must avoid looking directly at which of the following?",
    options: ["A glowing candle", "The intensely bright Sun", "A television from 5 meters away", "A green leaf"],
    correctAnswer: 1,
    explanation: "The sun's intense light can burn sensitive retinal photoreceptors, causing permanent partial blindness."
  },
  {
    id: 19,
    question: "Which nutrient vitamin is vital for maintaining healthy rod cells and preventing night blindness?",
    options: ["Vitamin C", "Vitamin B12", "Vitamin A", "Vitamin D"],
    correctAnswer: 2,
    explanation: "Vitamin A is essential for the production of rhodopsin, the light-sensitive pigment in rod cells. Deficiency causes night blindness."
  },
  {
    id: 20,
    question: "If we project white sunlight through a wet glass prism, it breaks into seven distinct colors. This separation is called:",
    options: ["Reflection", "Dispersion", "Absorption", "Inversion"],
    correctAnswer: 1,
    explanation: "Dispersion is the splitting of composite white light into its constituent colors (VIBGYOR) due to varying refraction levels."
  },
  {
    id: 21,
    question: "What is the normal range of vision for a healthy human eye?",
    options: ["2.5 cm to 25 cm", "25 cm to infinity", "10 cm to 100 cm", "0 to infinity"],
    correctAnswer: 1,
    explanation: "A healthy human eye can focus on objects as close as 25 cm (near point) and as far as infinity (far point), giving it a range of 25 cm to infinity."
  },
  {
    id: 22,
    question: "What happens to the size of the pupil when you step from a dark room into bright sunlight?",
    options: ["It expands", "It remains the same", "It constricts (becomes smaller)", "It disappears"],
    correctAnswer: 2,
    explanation: "In bright sunlight, the iris muscles constrict the pupil to reduce the amount of light entering the eye and protect the retina from being damaged."
  },
  {
    id: 23,
    question: "An object is placed between two parallel plane mirrors facing each other. How many images will be formed?",
    options: ["Zero", "One", "Two", "Infinite"],
    correctAnswer: 3,
    explanation: "Parallel mirrors have an angle of 0° between them. Using the image formula, this causes an infinite number of reflections, forming infinite images."
  },
  {
    id: 24,
    question: "What is the primary function of ciliary muscles in the human eye?",
    options: ["They change the shape of the iris", "They change the curvature and focal length of the crystalline lens", "They clean the tear ducts", "They control eye lubrication"],
    correctAnswer: 1,
    explanation: "Ciliary muscles relax and contract to alter the curvature of the elastic crystalline lens, allowing the eye to focus on both near and distant objects."
  },
  {
    id: 25,
    question: "White light splits into seven colors when passing through a prism. Which color of light is refracted (bent) the most?",
    options: ["Red", "Green", "Violet", "Yellow"],
    correctAnswer: 2,
    explanation: "Violet light has the shortest wavelength and travels the slowest in glass, meaning it encounters the highest refractive index and is refracted (bent) the most."
  },
  {
    id: 26,
    question: "What is a spherical mirror whose reflecting surface is curved inwards (like the inner curved face of a shiny metal spoon)?",
    options: ["Convex mirror", "Concave mirror", "Plane mirror", "Prism mirror"],
    correctAnswer: 1,
    explanation: "A spherical mirror with a reflecting surface curved inwards is called a concave mirror. It bends light inwards and behaves as a converging mirror, capable of forming both real and virtual images."
  },
  {
    id: 27,
    question: "When parallel sunlight falls on a convex mirror, how do the reflected rays behave?",
    options: [
      "They converge on a single real focus point in front of the mirror",
      "They diverge (spread out) and appear to meet at a virtual focal point behind the mirror",
      "They bounce back exactly parallel along the same path",
      "They are fully absorbed and convert into heat energy"
    ],
    correctAnswer: 1,
    explanation: "A convex mirror has its reflecting surface curved outwards. When parallel rays of light hit it, they diverge (spread out), meaning they appear to originate from a virtual focus point located behind the mirror."
  },
  {
    id: 28,
    question: "A magnifying glass is a type of spherical lens that allows us to focus sunlight onto a tiny point to burn paper. What type of lens is it?",
    options: [
      "Concave lens which converges light",
      "Convex lens which converges light",
      "Concave lens which diverges light",
      "Convex lens which diverges light"
    ],
    correctAnswer: 1,
    explanation: "A convex lens is thicker in the middle than at the edges. It bend parallel rays of light inwards (converges them) to meet at a single focal point, making it excellent for magnifying and focusing."
  },
  {
    id: 29,
    question: "How do the images formed by a concave lens generally differ from those formed by a convex lens?",
    options: [
      "Concave lenses always form virtual, erect, and smaller images, while convex lenses can form both real/inverted and virtual/erect images",
      "Concave lenses only form real, larger, and inverted images of objects",
      "Convex lenses only form smaller virtual images of objects",
      "Both types of lenses behave identically under all conditions"
    ],
    correctAnswer: 0,
    explanation: "A concave lens is a diverging lens and always forms an erect, virtual, and diminished (smaller) image, regardless of the object's position. A convex lens is a converging lens and can form real/inverted images or virtual/erect magnifying images."
  },
  {
    id: 30,
    question: "If you look through the back (outer curved) side of a highly polished metal spoon, what kind of image do you observe of your face?",
    options: [
      "An inverted, larger image",
      "An erect, smaller (diminished) image",
      "No image is formed because spoon surfaces do not reflect",
      "A real, inverted, identical-sized image"
    ],
    correctAnswer: 1,
    explanation: "The back of a shiny spoon acts as a convex mirror. A convex mirror always forms a virtual, erect, and smaller (diminished) image, which is why it provides a wide field of view."
  }
];

// 2. ASSERTION & REASON (20 Questions)
export const CLASS8_ASSERTIONS: AssertionReasonQuestion[] = [
  {
    id: 1,
    assertion: "A plane mirror forms virtual, erect, and laterally inverted images.",
    reason: "A plane mirror is highly polished and causes diffuse reflection.",
    correctOption: "C",
    explanation: "The assertion is true, but the reason is false. A plane mirror is polished and causes regular reflection, not diffuse reflection."
  },
  {
    id: 2,
    assertion: "Visually fully challenged people can develop high listening and touching senses.",
    reason: "Our brain compensates for the loss of one sensory organ by training others to be more sensitive.",
    correctOption: "A",
    explanation: "Both statements are true and the reason provides the accurate cognitive explanation for sensory compensation."
  },
  {
    id: 3,
    assertion: "When light falls perpendicularly on a plane mirror, it rebounds straight back along the normal.",
    reason: "The angle of reflection matches the angle of incidence, and both are 0° in this case.",
    correctOption: "A",
    explanation: "Both are true. Perpendicular incidence means alignment with normal, so i = 0°. By reflection laws, r = 0°, returning the ray straight back."
  },
  {
    id: 4,
    assertion: "We cannot inspect our own reflection clearly on a micro-rough wooden table.",
    reason: "A rough surface leads to regular reflection.",
    correctOption: "C",
    explanation: "The table causes diffuse reflection due to its microscopic roughness, making the reason false."
  },
  {
    id: 5,
    assertion: "The blind spot of the human eye is totally incapable of perceiving light.",
    reason: "There are zero light-sensitive rod or cone photoreceptor cells at the entrance of optic nerve.",
    correctOption: "A",
    explanation: "The lack of photoreceptors at the optic nerve junction describes why light falling on the blind spot is not detected."
  },
  {
    id: 6,
    assertion: "Two parallel plane mirrors facing each other create an infinite number of images.",
    reason: "Infinite images require a reflecting angle of 90 degrees.",
    correctOption: "C",
    explanation: "The assertion is true, but the reason is false because parallel mirrors correspond to 0° angle of inclination."
  },
  {
    id: 7,
    assertion: "In dim light, the iris dilates the pupil to let in more light.",
    reason: "The iris is a circular colored muscle which serves as physical shutter for eyeball aperture.",
    correctOption: "A",
    explanation: "Both are true. In dim environments, pupil size is widened to optimize image brightness."
  },
  {
    id: 8,
    assertion: "Butter paper is a translucent material.",
    reason: "Translucent objects block light and form dark shadows.",
    correctOption: "C",
    explanation: "Butter paper is translucent because it lets some light pass but scatters it, so objects behind are hazy. Opaque materials block light completely, so the reason is false."
  },
  {
    id: 9,
    assertion: "Night owls navigate efficiently in pitch dark situations.",
    reason: "Owls' retinas contain a high density of cone cells.",
    correctOption: "C",
    explanation: "Owls have high rod density and very few cones, so the reason is false."
  },
  {
    id: 10,
    assertion: "Vitamin A deficiency leads to xerophthalmia and night blindness.",
    reason: "Vitamin A is essential for synthesising rhodopsin, the photopigment present in rod cells.",
    correctOption: "A",
    explanation: "Rods depend on retinal (Vitamin A derivative) to function, making night vision fail in its absence."
  },
  {
    id: 11,
    assertion: "Diffuse reflection leads to the scattering of parallel rays in all directions.",
    reason: "Laws of reflection are completely violated during diffuse reflections.",
    correctOption: "C",
    explanation: "Diffuse reflection scatters light but each ray obeys laws of reflection perfectly, so the reason is false."
  },
  {
    id: 12,
    assertion: "We can read a printed paper book from any angle under standard tube room light.",
    reason: "Book paper surface has micro-roughness causing diffused reflection, scattering light in all directions.",
    correctOption: "A",
    explanation: "Diffuse scattering ensures light from the page reaches our eyes regardless of our angle from the book."
  },
  {
    id: 13,
    assertion: "In a periscope, light gets reflected twice by two parallel mirrors.",
    reason: "The mirrors in a periscope are placed parallel, inclined at 45° to the path of light.",
    correctOption: "A",
    explanation: "Parallel alignment inclined at 45° allows light to drop 90° vertically, and then turn parallel again, enabling deep line-of-sight elevation."
  },
  {
    id: 14,
    assertion: "The image of an object in a plane mirror is always virtual.",
    reason: "Virtual images are formed by the actual intersection of reflected rays.",
    correctOption: "C",
    explanation: "Virtual images are formed by back-projecting diverging rays of light, making the reason false."
  },
  {
    id: 15,
    assertion: "The human eye lens is a convex lens.",
    reason: "A convex lens is thinner in the middle and thicker at the edges.",
    correctOption: "C",
    explanation: "A convex lens is thicker in the middle and thinner at the edges, making the reason false."
  },
  {
    id: 16,
    assertion: "A kaleidoscope creates beautiful repeating patterns.",
    reason: "Multiple reflections occur between three mirrors tilted at 60° to one another.",
    correctOption: "A",
    explanation: "Both statements are true and the reason explains the symmetric repeating effect."
  },
  {
    id: 17,
    assertion: "The image in a plane mirror is as far behind the mirror as the object is in front of it.",
    reason: "Light speeds up inside highly polished mirror glass.",
    correctOption: "C",
    explanation: "The assertion is true, but the reason is false; equal distance is a geometric property of reflection, not speed changes."
  },
  {
    id: 18,
    assertion: "Visually impaired people read Braille using their sense of touch.",
    reason: "Each Braille character consists of raised dots that can be systematically identified by fingertips.",
    correctOption: "A",
    explanation: "Both statements are true and the reason explains how visually impaired people make use of Braille characters."
  },
  {
    id: 19,
    assertion: "Cataract impairs sight by clouding the cornea.",
    reason: "Cornea is the clear layer covering pupil.",
    correctOption: "D",
    explanation: "Cataract affects the clear internal eye lens, not the cornea, making the assertion false, though the reason is true."
  },
  {
    id: 20,
    assertion: "Looking directly at a laser pointer beam can create blind spots on our retina.",
    reason: "A laser beam carries highly concentrated bright light that can heat up and burn photo-receptive cells.",
    correctOption: "A",
    explanation: "Laser light is highly coherent and intense, and can damage sensitive retinal tissue instantly."
  },
  {
    id: 21,
    assertion: "A convex mirror is commonly used as a rear-view mirror in vehicles.",
    reason: "A convex mirror diverges light rays, producing virtual, erect, and diminished images that provide a wide field of view.",
    correctOption: "A",
    explanation: "Convex mirrors always form virtual, erect, and smaller images, extending the motorist's field of view to see traffic behind."
  },
  {
    id: 22,
    assertion: "A concave lens is also known as a converging lens.",
    reason: "A concave lens is thicker in the middle and thinner at its edges, which causes parallel light rays to bend inwards and meet at a single focal point.",
    correctOption: "D",
    explanation: "Both statements are false: a concave lens is thinner in the middle and thicker at the edges, and it diverges light (diverging lens), not converges it."
  }
];

// 3. VERY SHORT ANSWER QUESTIONS (2 Marks Each - 20 Questions)
export const CLASS8_VERY_SHORT: ShortQuestion[] = [
  {
    id: 1,
    question: "State the two primary laws of reflection.",
    answer: "1) The angle of incidence equals the angle of reflection (∠i = ∠r). 2) The incident ray, reflected ray, and normal at the point of incidence all lie on the same plane.",
    keyPoints: ["∠i = ∠r", "Incident, reflected, and normal inside same plane"]
  },
  {
    id: 2,
    question: "Define the term lateral inversion with an example.",
    answer: "Lateral inversion is the left-to-right swap of an object's image in a mirror. E.g. holding the letter 'P' displays a mirrored reflection like 'q'.",
    keyPoints: ["Left-right reversal", "Plane mirror signature"]
  },
  {
    id: 3,
    question: "Explain the basic physical difference between a luminous and a non-luminous object.",
    answer: "Luminous objects emit their own light (e.g. Sun, bulb). Non-luminous objects do not emit light and are only visible when they reflect light from a source (e.g., chair).",
    keyPoints: ["Emits own light", "Reflects light to be visible"]
  },
  {
    id: 4,
    question: "Why can you see your image in a polished steel plate but not on a wooden dining table?",
    answer: "Steel plate has a smooth surface promoting regular reflection, which produces a clear image. Wood has a rough surface causing diffused reflection, scattering light in all directions.",
    keyPoints: ["Regulated vs diffused", "Surface smoothness"]
  },
  {
    id: 5,
    question: "Identify the main function of the iris muscle in the human eye.",
    answer: "The iris acts as a colored muscular diaphragm that controls the size of the pupil, regulating the amount of light that enters the eyeball.",
    keyPoints: ["Pupil control", "Light regulation"]
  },
  {
    id: 6,
    question: "What is night blindness? Which vitamin deficiency causes it?",
    answer: "Night blindness is the inability to see clearly in dim light or dark surroundings. It is caused by a deficiency of Vitamin A in our diet.",
    keyPoints: ["Dim line blindness", "Vitamin A deficiency"]
  },
  {
    id: 7,
    question: "Explain how many images are formed when two mirrors are kept parallel.",
    answer: "When mirrors are parallel (angle θ = 0°), an infinite number of images are formed due to endless back-and-forth reflections between the mirrors.",
    keyPoints: ["Infinite images", "Endless reflections"]
  },
  {
    id: 8,
    question: "Where is an image formed in the human eye, and what carries its signal to the brain?",
    answer: "The image is formed as an inverted real projection on the retina. The optic nerve carries these signals to the brain in the form of electrical impulses.",
    keyPoints: ["Retina", "Optic nerve impulses"]
  },
  {
    id: 9,
    question: "What is the function of rod cells in the human retina?",
    answer: "Rod cells are highly sensitive photoreceptors active in dim light. They provide monochromatic black-and-white night vision.",
    keyPoints: ["Dim light sensitivity", "Monochromatic night sight"]
  },
  {
    id: 10,
    question: "What is the function of cone cells in the human retina?",
    answer: "Cone cells are photoreceptors that detect colors and details. They operate efficiently only in bright light.",
    keyPoints: ["Color detection", "Bright light operation"]
  },
  {
    id: 11,
    question: "Briefly explain why a classroom blackboard appears dark and black to our eyes.",
    answer: "The blackboard absorbs almost all wavelengths of light falling on it, reflecting minimal light back to our eyes.",
    keyPoints: ["Absorbs all colors", "No reflection"]
  },
  {
    id: 12,
    question: "If an incident ray forms a 60° angle with the normal, what is the angle between the incident and reflected ray?",
    answer: "Angle of incidence i = 60°. Since i = r, reflection angle r = 60°. The total angle between both rays is i + r = 60° + 60° = 120°.",
    keyPoints: ["i = r = 60°", "Total angle = 120°"]
  },
  {
    id: 13,
    question: "What are the tactile indicators used in Braille script, and who designed this system?",
    answer: "The Braille script uses arrangements of raised dots representing letters and symbols, designed by Louis Braille in 1821.",
    keyPoints: ["Raised dots grid", "Louis Braille"]
  },
  {
    id: 14,
    question: "Under what condition will the laws of reflection fail?",
    answer: "The laws of reflection never fail. They hold true for all surfaces, curved or rough, at every single point of incidence.",
    keyPoints: ["Never fail", "Universally true"]
  },
  {
    id: 15,
    question: "Define the term blind spot in human eyes.",
    answer: "The blind spot is the region where the optic nerve exits the eyeball. It contains zero rods or cones, making it blind to light.",
    keyPoints: ["Optic nerve junction", "No photoreceptor cells"]
  },
  {
    id: 16,
    question: "What happens to the pupil when you flash a bright flashlight into a person's eye?",
    answer: "The iris immediately contracts to shrink the pupil's diameter, protecting the retina from excessive light.",
    keyPoints: ["Pupil shrinks", "Light shielding"]
  },
  {
    id: 17,
    question: "How does still water act differently than moving rippling water with respect to reflections?",
    answer: "Still water acts as a flat mirror exhibiting regular reflection (forming a sharp image). Rippled water acts rough, causing diffused reflection.",
    keyPoints: ["Smooth vs rough", "Regular vs diffused"]
  },
  {
    id: 18,
    question: "What is a periscope? Mention one of its real-world uses.",
    answer: "A periscope is an optical tube containing two parallel mirrors tilted at 45°. It is used in submarines to view objects on the sea surface.",
    keyPoints: ["Two 45° mirrors", "Submarine surface observation"]
  },
  {
    id: 19,
    question: "What is Cataract and how is it clinically treated?",
    answer: "Cataract is the clouding of the clear eye lens, obstructing vision. It is treated by replacing the cloudy lens with an artificial lens.",
    keyPoints: ["Hazy lens", "Surgical replacement"]
  },
  {
    id: 20,
    question: "How do ciliary muscles help us see distant clouds as well as a close book?",
    answer: "Ciliary muscles relax to make the lens thin for far objects, and contract to make the lens thick for near objects.",
    keyPoints: ["Shape adjustment", "Power accommodation"]
  }
];

// 4. SHORT ANSWER QUESTIONS (3 Marks Each - 20 Questions)
export const CLASS8_SHORT: ShortQuestion[] = [
  {
    id: 1,
    question: "Describe diffused reflection and explain why it is NOT a failure of reflection laws.",
    answer: "Diffused reflection happens when parallel rays fall on a rough surface and scatter in all directions. It occurs because the microscopic normal of the surface varies. However, each individual ray obeys ∠i = ∠r perfectly at its local touchpoint.",
    keyPoints: ["Rough surface scatter", "Normal variation on surface", "Laws still obeyed locally"]
  },
  {
    id: 2,
    question: "Explain the construction and working of a periscope with a neat ray schematic theory.",
    answer: "A periscope is a tube with two plane mirrors placed parallel at 45° angles. Light from an object strikes the top mirror, reflects 90° down the tube, strikes the bottom mirror, and reflects into the observer's eye, bypasses obstacles.",
    keyPoints: ["Two parallel mirrors", "No deviation change", "Sight line elevation"]
  },
  {
    id: 3,
    question: "Write down three major guidelines we should adopt to take proper care of our eyes.",
    answer: "1) Avoid looking directly at the sun. 2) Never read in extremely dim or blindingly bright light. 3) Keep reading material at a safe distance from eyes.",
    keyPoints: ["Sun protection", "Lighting optimization", "Reading distance"]
  },
  {
    id: 4,
    question: "Calculate the exact number of images formed when mirrors are inclined at 60°. Show steps.",
    answer: "The formula is n = (360/θ) - 1. Substituting θ = 60°: n = (360/60) - 1 = 6 - 1 = 5 images.",
    keyPoints: ["n = (360/θ) - 1", "θ = 60°", "Images formed = 5"]
  },
  {
    id: 5,
    question: "Describe the structural features of the Retina which help us register light and colors.",
    answer: "The retina has a layer of light-sensitive photoreceptor cells (rods and cones). Rods detect light intensity, cones detect wavelengths (colors), converting light into nerve impulses.",
    keyPoints: ["Photoreceptor layer", "Rods detect light", "Cones detect colors"]
  },
  {
    id: 6,
    question: "Explain how multiple reflections are used in clothes shops to display haircuts.",
    answer: "Holding a small mirror behind the customer reflects the back of their head. This image acts as a virtual object for the front mirror, showing the haircut.",
    keyPoints: ["Back-to-front reflections", "Virtual object mirror mapping"]
  },
  {
    id: 7,
    question: "How does the eye pupil respond to changes in illumination, and why?",
    answer: "The pupil shrinks in bright light to protect the retina from damage, and dilates in dim light to let in more light for better visibility.",
    keyPoints: ["Shrinking vs dilation", "Retinal protection", "Controlled by iris muscles"]
  },
  {
    id: 8,
    question: "Is light a form of energy? How can we prove this using a simple solar example?",
    answer: "Yes, light is electromagnetic radiation. Sunlight hitting solar panels excites electrons to generate electric power, proving its energy nature.",
    keyPoints: ["Electromagnetic wave", "Solar electric transition", "Excites molecules"]
  },
  {
    id: 9,
    question: "What is Braille system? Explain some of its features.",
    answer: "Braille is a tactile code with 63 raised dot characters in a 6-dot grid. It allows visually impaired individuals to read by touch.",
    keyPoints: ["63 tactile dot configurations", "Touch-read fingertip flow", "Louis Braille"]
  },
  {
    id: 10,
    question: "Where do we find diffuse reflection in everyday situations? Distinguish it from plane mirrors.",
    answer: "Diffused reflection occurs from walls, books, and tables, scattering light in all directions, making them visible from various angles instead of forming a mirror image.",
    keyPoints: ["Visible from all angles", "No image formation", "Micro-rough wood/paper"]
  },
  {
    id: 11,
    question: "Briefly explain the role of ciliary muscles in vision and aging.",
    answer: "Ciliary muscles adjust the eyes' focal length to focus objects. As we age, these muscles lose elasticity, making it harder to focus close, leading to presbyopia.",
    keyPoints: ["Focal alteration", "Elasticity decrease", "Presbyopia defect"]
  },
  {
    id: 12,
    question: "If angle of reflection is 45°, calculate the angle between the mirror surface and the incident ray.",
    answer: "Angle of incidence i = angle of reflection = 45°. The angle of incidence is measured from the normal (90°), so the angle with the mirror surface is 90° - 45° = 45°.",
    keyPoints: ["i = r = 45°", "Surface angle = 90° - i", "Surface angle = 45°"]
  },
  {
    id: 13,
    question: "Explain why we cannot see our reflection in paper, even though it reflects light.",
    answer: "Paper has microscopic fibers causing diffuse reflection, which scatters light rays in random directions, preventing the formation of a coherent image.",
    keyPoints: ["Fibers and micro-pores", "Scattering of rays", "No clean image outline"]
  },
  {
    id: 14,
    question: "What is xerophthalmia? What dietary sources help prevent it?",
    answer: "Xerophthalmia is severe dry-eye disease caused by Vitamin A deficiency. It is prevented by eating green leafy veggies, carrots, milk, and eggs.",
    keyPoints: ["Dry eyes risk", "Vitamin A deficiency", "Carrots / Papaya diet"]
  },
  {
    id: 15,
    question: "Differentiate between real and virtual images produced in household mirrors.",
    answer: "Plane mirrors only form virtual images that cannot be projected on paper. Convex and concave mirrors can form real images on a screen.",
    keyPoints: ["Screen capture capability", "Projection on a surface", "Rays real mapping"]
  },
  {
    id: 16,
    question: "What is persistent of vision in human eyes?",
    answer: "An image persists on the retina for about 1/16th of a second. If multiple still images are shown in quick succession, we perceive smooth motion (the basis of animation).",
    keyPoints: ["1/16 second lag", "Animation and movie foundation", "Flicker fusion rate"]
  },
  {
    id: 17,
    question: "Describe how a kaleidoscope is constructed in steps.",
    answer: "1) Join three rectangular mirrors at 60° angles. 2) Insert into a cardboard tube. 3) Seal one end with a peek hole, and the other with colored beads.",
    keyPoints: ["Equilateral mirror triangular assembly", "Tube housing", "Beads compartment"]
  },
  {
    id: 18,
    question: "Why does sunlight break into a rainbow when traveling through a rain droplet?",
    answer: "Water droplets act as natural glass prisms. Light bends at different angles depending on its color, separating into a colorful spectrum.",
    keyPoints: ["Reflex dispersion", "Varying bending ratios", "Rainbow spectrum formation"]
  },
  {
    id: 19,
    question: "Explain why blind spots exist in mammalian eyes.",
    answer: "Our blood vessels and optic nerves must exit from the back of the retina. This exit point lacks photoreceptor cells, creating a blind spot.",
    keyPoints: ["Optic exit path", "Retina structural hole", "No photoreceptive cells"]
  },
  {
    id: 20,
    question: "How do nocturnal animals differ in eye structure from humans?",
    answer: "Nocturnal animals have larger corneas and pupils to let in maximum light, and retinas dominated by rod cells for dark vision.",
    keyPoints: ["Dilated pupils", "Abundant rod count", "Tapetum lucidum mirror layer"]
  }
];

// 5. LONG ANSWER QUESTIONS (5 Marks Each - 20 Questions)
export const CLASS8_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Explain the structure and functioning of the human eye in detail with a structural list of its parts.",
    markingScheme: [
      "Detailing front protections like Cornea and Iris (1 mark)",
      "Explaining pupil adjusting mechanisms (1 mark)",
      "Discussing convex lens focusing onto retina (1 mark)",
      "Explaining Retina conversion to nerve impulses (1 mark)",
      "Detailing optic nerve communication with the brain (10 marks/1 mark)"
    ],
    answerParts: [
      { part: "Outer Bulky Layers", text: "The cornea is the outer transparent bulge through which light enters, providing protection and initial refraction." },
      { part: "The Shutter Control", text: "The circular iris muscle controls the size of the pupil, regulating light intake." },
      { part: "Focusing Lens", text: "The crystalline convex lens is held by ciliary muscles, which adjust its focal length to focus objects." },
      { part: "Retinal Registry", text: "The retina converts light into electrical signals through rod and cone photoreceptors." },
      { part: "Signal Transmission", text: "The optic nerve delivers these impulses to the brain, which decodes them into upright images." }
    ]
  },
  {
    id: 2,
    question: "Compare Regular and Diffused Reflection. Explain their mechanics, surface dependencies, and image formation capabilities.",
    markingScheme: [
      "Definition and mechanics of Regular Reflection (1.5 marks)",
      "Definition and mechanics of Diffused Reflection (1.5 marks)",
      "Detailed surface roughness analysis (1 mark)",
      "Explanation of why laws of reflection are not violated in diffuse reflection (1 mark)"
    ],
    answerParts: [
      { part: "Regular Reflection Mechanics", text: "When parallel light rays hit a smooth, polished plane mirror, they reflect parallel, forming a sharp image." },
      { part: "Diffused Reflection Mechanics", text: "When parallel light rays hit a rough cardboard surface, they bounce in random directions, scattering light." },
      { part: "No Law Violations", text: "Diffused reflection is caused by surface roughness, not a failure of reflection laws. Every ray obeys ∠i = ∠r perfectly at its point of contact." },
      { part: "Image Consequences", text: "Regular reflection produces mirror images, while diffuse reflection scatters light, making objects visible from any angle." }
    ]
  },
  {
    id: 3,
    question: "Explain human eye defects with detail on Cataract, Night Blindness, and Presbyopia. Provide symptoms and treatments.",
    markingScheme: [
      "Cataract description, symptoms, and lens surgery (1.5 marks)",
      "Night blindness and Vitamin A links (1.5 marks)",
      "Presbyopia, aging, and lens treatments (2 marks)"
    ],
    answerParts: [
      { part: "Hazy Cloudy Cataract", text: "Cataract is the clouding of the eye lens with age, which blocks light. It is treated by replacing the lens with an artificial intraocular lens (IOL)." },
      { part: "Vitamin A and Rod failure", text: "Night blindness is the inability to see in dim light due to a lack of rod pigment (rhodopsin), typically treated with a diet rich in Vitamin A." },
      { part: "Presbyopia stiffening", text: "Presbyopia is the age-related loss of lens flexibility, making close-up focusing difficult, corrected with reading glasses or bifocal lenses." }
    ]
  },
  {
    id: 4,
    question: "Explain the concept of multiple reflections. Derive the image formula and calculate images formed at 90°, 60°, and 0° inclination.",
    markingScheme: [
      "Explain multiple reflection mechanics (1.5 marks)",
      "Formula derivation discussion (1.5 marks)",
      "Math calculations for 90°, 60°, and parallel configurations (2 marks)"
    ],
    answerParts: [
      { part: "Multiple Reflection Concept", text: "An image formed by one mirror can act as a virtual object for a second mirror, leading to multiple reflections and images." },
      { part: "Formula", text: "The number of images is n = (360/θ) - 1, where θ is the angle between the mirrors." },
      { part: "Case Calculations", text: "At 90°: (360/90)-1 = 3 images. At 60°: (360/60)-1 = 5 images. At 0° (parallel): (360/0)-1 = infinite images." }
    ]
  },
  {
    id: 5,
    question: "Detail the steps, mechanics, and design of the Braille System to aid visually challenged students in reading and writing.",
    markingScheme: [
      "Louis Braille invention context (1.5 marks)",
      "Grid dot design system (1.5 marks)",
      "Reading mechanics and printing apparatus (2 marks)"
    ],
    answerParts: [
      { part: "Invention details", text: "Invented by Louis Braille in 1821, this system uses raised dots on paper to represent alphanumeric characters." },
      { part: "Aesthetic Grid Dot size", text: "Characters consist of raised dots in a 6-dot cell grid (two columns of three dots), representing letters, numbers, and punctuation." },
      { part: "Tactile Reading", text: "Visually impaired individuals read by sliding their fingertips across the raised dots, translating tactile patterns into language." }
    ]
  },
  {
    id: 6,
    question: "How does reflection make the world around us visible? Discuss absorption and color reflection in plants, oceans, and dark bodies.",
    markingScheme: [
      "Visiblity concept (1.5 marks)",
      "Color selective reflection detail (1.5 marks)",
      "Plant chlorophyll and dark bodies absorption (2 marks)"
    ],
    answerParts: [
      { part: "Mechanics of Sight", text: "We see non-luminous objects when light from a source reflects off them into our eyes." },
      { part: "Selective Wavelength bouncing", text: "Objects absorb certain wavelengths of light and reflect others. The color we perceive is the reflected wavelength." },
      { part: "Natural Examples", text: "Plants look green because chlorophyll absorbs red and blue light while reflecting green light. Black objects absorb all light, making them look dark." }
    ]
  },
  {
    id: 7,
    question: "Describe an activity to prove that the angle of incidence equals the angle of reflection utilizing paper, boards, and pins.",
    markingScheme: [
      "Setup description with paper and mirror (1.5 marks)",
      "Pin alignment process under sight (1.5 marks)",
      "Math measuring step with protractor (2 marks)"
    ],
    answerParts: [
      { part: "Setup", text: "Fix a drawing sheet on a wooden board. Draw a line and place a plane mirror vertically on it. Erect a normal line perpendicular to the mirror." },
      { part: "Pin Alignment", text: "Place two pins (P and Q) on the incident line. Look into the mirror from the other side and place two more pins (R and S) so they align with the images of P and Q." },
      { part: "Measurement", text: "Draw lines through the pins. Measure ∠i and ∠r with a protractor; they will be equal, proving the law of reflection." }
    ]
  },
  {
    id: 8,
    question: "Design and explain the working of a periscope. Discuss its mirror angles, light paths, and practical limitations.",
    markingScheme: [
      "Physical tube construction (1.5 marks)",
      "Light reflection paths at 45° (1.5 marks)",
      "Military usage and light attenuation issues (2 marks)"
    ],
    answerParts: [
      { part: "Construction", text: "A periscope is a Z-shaped tube with parallel plane mirrors mounted at each turn, tilted at 45° to the light path." },
      { part: "Light Path", text: "Light entering the top window strikes the first mirror at 45°, reflects 90° down the tube, strikes the bottom mirror, and reflects into the observer's eye." },
      { part: "Applications & Limits", text: "Used in submarines and trenches. Multi-mirror systems can suffer from light loss and dim images due to absorption at each reflection." }
    ]
  },
  {
    id: 9,
    question: "Discuss the persistent of vision, its mathematical limits, and how it is utilized to create cinematic movies and animations.",
    markingScheme: [
      "Definition of Retina persistent duration (1.5 marks)",
      "Flipbook frame-rate thresholds (1.5 marks)",
      "Cinematography projection detail (2 marks)"
    ],
    answerParts: [
      { part: "Temporal Retina Lag", text: "The retina retains an image for about 1/16 of a second after the light source is removed." },
      { part: "Frame Rate Trickry", text: "If static images of a running dog are shown at a rate faster than 16 frames per second, the images merge, creating the illusion of smooth motion." },
      { part: "Cinematic Implementation", text: "Modern films screen still photos at 24 to 30 frames per second. The persistent of vision blends these stills into continuous video." }
    ]
  },
  {
    id: 10,
    question: "Detail the ocular physiology of accommodation. Discuss limits of normal sight, near point, far point, and muscle stress.",
    markingScheme: [
      "Accommodation definition (1.5 marks)",
      "Near / Far point limits (1.5 marks)",
      "Ciliary muscles action strain (2 marks)"
    ],
    answerParts: [
      { part: "Accommodation", text: "Accommodation is the eye's ability to adjust its focal length using ciliary muscles to focus objects at various distances." },
      { part: "The Near and Far Limits", text: "The near point (closest distance we can focus clearly) is 25 cm. The far point (farthest distance) is infinity for a normal eye." },
      { part: "Ocular strain", text: "Viewing objects closer than 25 cm requires maximum contraction of ciliary muscles, causing eye strain and fatigue." }
    ]
  },
  {
    id: 11,
    question: "How do humans perceive color? Detailed analysis of red, green, blue color cones, color blindness, and genetic links.",
    markingScheme: [
      "Trichromatic cone sensor model (1.5 marks)",
      "Color blindness mechanisms (1.5 marks)",
      "Contrast validation with rods (2 marks)"
    ],
    answerParts: [
      { part: "Cone Sensors", text: "The human retina has three types of cone cells, sensitive to red, green, and blue light." },
      { part: "Color Blending", text: "The brain processes signals from these three cone types to perceive thousands of intermediate colors." },
      { part: "Color Blindness", text: "A genetic defect can cause one or more cone types to be active or missing, making it difficult to distinguish colors (like red-green)." }
    ]
  },
  {
    id: 12,
    question: "Discuss Light Dispersion through glass mediums. Create the wave speed reasoning why white sunlight separates into VIBGYOR.",
    markingScheme: [
      "White light composition (1.5 marks)",
      "Refraction differences of wavelengths (1.5 marks)",
      "Symmetric exit spectrum labels (2 marks)"
    ],
    answerParts: [
      { part: "Composite white sunlight", text: "sunlight is made of seven colors: Violet, Indigo, Blue, Green, Yellow, Orange, and Red (VIBGYOR)." },
      { part: "Wavelength speed variances", text: "In glass, different colors travel at different speeds. Red is fastest (bends least), while violet is slowest (bends most)." },
      { part: "Spectrum dispersion", text: "When sunlight enters a prism, this speed difference separates the colors, projecting a beautiful rainbow spectrum." }
    ]
  },
  {
    id: 13,
    question: "Trace the path of an incident ray through a parallel plane glass slab. Prove lateral displacement with geometrical reasons.",
    markingScheme: [
      "Bending towards then away from normal (1.5 marks)",
      "Parallel exit proof (1.5 marks)",
      "Lateral shift dependency on slab thickness (2 marks)"
    ],
    answerParts: [
      { part: "Refraction Path", text: "Light bends toward the normal as it enters a glass slab, and away from the normal as it exits back into the air." },
      { part: "Parallelism proof", text: "Because the opposite faces of the glass slab are parallel, the angle of emergence equals the angle of incidence, so the emergent ray is parallel to the incident ray." },
      { part: "Lateral Displacement", text: "The perpendicular distance between the incident and emergent rays is called lateral displacement, which increases with slab thickness." }
    ]
  },
  {
    id: 14,
    question: "Analyze diffuse reflection from paper and walls. Prove why diffuse reflection is vital for general visibility of objects.",
    markingScheme: [
      "Everyday room ambient light diffusion (1.5 marks)",
      "Micro-scaffolds of wall paint (1.5 marks)",
      "Dark shadow mitigation (2 marks)"
    ],
    answerParts: [
      { part: "Ambient Light dispersion", text: "Without diffused reflection, we would only see light sources or polished mirror surfaces. Room walls and paper scatter light, filling the room with ambient light." },
      { part: "Surface microscopic pits", text: "Wall paint has a textured surface that scatters light in all directions, illuminating shadows." },
      { part: "General visibility", text: "Diffused reflection allows us to see non-luminous objects from any angle, making everyday materials visible." }
    ]
  },
  {
    id: 15,
    question: "Describe Pupil adaptive responses under dark and bright situations. Detail the muscles of Iris, radial, and circular functions.",
    markingScheme: [
      "Antagonistic iris muscle operation (1.5 marks)",
      "Pupil dilates and contracts times (1.5 marks)",
      "Retinal bleach adaptation (2 marks)"
    ],
    answerParts: [
      { part: "Iris Muscles", text: "The iris contains circular muscles (to shrink the pupil) and radial muscles (to dilate the pupil)." },
      { part: "Adaptation Delay", text: "Adapting to dark rooms takes a few seconds because radial muscles must slowly contract to dial up pupil diameter." },
      { part: "Protection and sight balance", text: "These involuntary adjustments protect photoreceptors from bright light and maximize vision in dim conditions." }
    ]
  },
  {
    id: 16,
    question: "Explain Kaleidoscope symmetrical geometry. Derive the reflection angles and show why multi-patterns are generated at 60° inclination.",
    markingScheme: [
      "Symmetry mirror placement (1.5 marks)",
      "60-degree angle mathematics (1.5 marks)",
      "Tesselation patterns generation (2 marks)"
    ],
    answerParts: [
      { part: "Symmetry mirror placement", text: "The mirrors reflect images across their boundaries, creating a symmetrical tessellation." },
      { part: "60-degree angle mathematics", text: "Inclined mirrors create (360/60) - 1 = 5 images arranged in a circle, forming a repeating hexagonal pattern." },
      { part: "Dynamic Shard placement", text: "Varying the positions of beads in our kaleidoscope forms infinite symmetrical patterns." }
    ]
  },
  {
    id: 17,
    question: "Write an essay on modern dietary and physiological habits to protect standard classroom eyes from early myopia and screen strain.",
    markingScheme: [
      "Dry eyes screen blink mechanics (1.5 marks)",
      "The 20-20-20 rules (1.5 marks)",
      "Nutrient food and outdoor play (2 marks)"
    ],
    answerParts: [
      { part: "Screen strain problem", text: "Staring at screens reduces our blink rate, causing dry eyes and strain on ciliary muscles." },
      { part: "The 20-20-20 Rule", text: "Every 20 minutes, look at an object 20 feet away for at least 20 seconds to relax ciliary muscles." },
      { part: "Healthy habits", text: "Eat foods rich in Vitamin A and zinc (like carrots, leafy greens), and spend time outdoors to help prevent nearsightedness." }
    ]
  },
  {
    id: 18,
    question: "Describe how visually impaired people can read and write using non-visual systems, focusing on tactile and auditory tech.",
    markingScheme: [
      "Braille script details (1.5 marks)",
      "Tactile maps and stylus slates (1.5 marks)",
      "Auditory screen readers and assistive tech (2 marks)"
    ],
    answerParts: [
      { part: "Tactile Reading", text: "Braille allows reading by touch. Elevated bumps on paper can be scanned quickly with fingertips." },
      { part: "Tactile Graphics", text: "Visually impaired individuals can feel graphs, maps, and shapes printed on specialized swell paper." },
      { part: "Assistive Audiology tech", text: "Screen reading software convert text to speech, and talking clocks and calculators assist in everyday tasks." }
    ]
  },
  {
    id: 19,
    question: "Derive and design a retroreflector using three perpendicular plane mirrors (90° corner reflector) and discuss its optical applications.",
    markingScheme: [
      "Three planar 90 degrees geometry (1.5 marks)",
      "Light reflection bounces vectorially (1.5 marks)",
      "Applications on bicycle taillights and Moon retro-prisms (2 marks)"
    ],
    answerParts: [
      { part: "Geometry of Corner plates", text: "Align three mirrors perpendicularly in a corner. An incident ray reflects off all three surfaces." },
      { part: "Vector Reflector Proof", text: "The exit ray bounces back parallel to its incident path, regardless of its starting angle." },
      { part: "Uses", text: "Used in retroreflective bicycle taillights and of moon missions to measure distance with lasers." }
    ]
  },
  {
    id: 20,
    question: "Compare light sensors in advanced digital cameras with mammalian retinas. Discuss focal lenses, shutters, pixels, and dark adjustments.",
    markingScheme: [
      "Crystalline lens vs solid camera lenses (1.5 marks)",
      "Rods/cones vs silicon pixels (1.5 marks)",
      "Aperture iris adjustment comparison (2 marks)"
    ],
    answerParts: [
      { part: "Lens comparison", text: "Cameras focus by physically moving solid lenses, while the eye changes the shape of its flexible lens using ciliary muscles." },
      { part: "Sensors comparison", text: "Rods and cones convert light into nerve impulses, whereas silicon pixels generate electrical signals." },
      { part: "Aperture comparison", text: "The iris adjusts pupil size to regulate light, while a camera lens uses mechanical blades to control its aperture." }
    ]
  }
];

// 6. DETAILED CASE-BASED COMPETENCY QUESTIONS (4 Marks Each - 20 Questions)
export const CLASS8_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "Rohan's Kaleidoscope Experiment",
    caseDescription: "Rohan wants to make a toy that forms beautiful, repeating symmetrical patterns. He obtains three rectangular glass mirrors, each 15 cm long and 4 cm wide. He joins them along their length to form a triangular prism-like structure. He wraps this inside a cardboard cylinder and closes one end with a cardboard disc containing a small hole. At the other end, he places some pieces of colored glass beads, secured between a clear glass sheet and a ground glass plate.",
    subQuestions: [
      {
        question: "On which basic optical concept is Rohan's toy constructed?",
        options: ["Dispersion", "Multiple reflections at inclined angles", "Total internal reflection", "Refraction"],
        correctIndex: 1,
        answer: "Multiple reflections at inclined angles",
        explanation: "A kaleidoscope uses three plane mirrors jointed at 60° to create repeating symmetrical patterns through multiple reflections."
      },
      {
        question: "What is the angle of inclination between the three mirror strips?",
        options: ["90°", "45°", "60°", "0°"],
        correctIndex: 2,
        answer: "60°",
        explanation: "To form an equilateral triangle, the three mirror strips must be inclined at 60° to one another."
      }
    ]
  },
  {
    id: 2,
    caseTitle: "Sanya's Dark Room Observation",
    caseDescription: "Sanya goes inside a completely closed basement room which has no windows or lamps. She is unable to see her hand or any wooden objects. When she steps outside into the corridor where an electric bulb is glowing, she can see all doors, pots, and cars clearly. She wonders what triggers this sight.",
    subQuestions: [
      {
        question: "Why could Sanya not see anything inside her basement room?",
        options: ["Because her eyes were closed", "Because there was no source of light to reflect off objects into her eyes", "Because basement objects absorb oxygen", "Because wood is always invisible in dark locations"],
        correctIndex: 1,
        answer: "Because there was no source of light to reflect off objects into her eyes",
        explanation: "We see non-luminous objects when light from a source reflects off them into our eyes."
      },
      {
        question: "The objects in the corridor (like the doors and pots) are classified as:",
        options: ["Luminous sources", "Non-luminous bodies", "Incandescent items", "Bioluminescent plants"],
        correctIndex: 1,
        answer: "Non-luminous bodies",
        explanation: "Doors and pots do not generate their own light; they are non-luminous bodies that reflect light."
      }
    ]
  },
  {
    id: 3,
    caseTitle: "The Rear View Mirror Selection",
    caseDescription: "An automobile manufacturing company needs to select the safest rearview reflecting mirrors for its new line of heavy-duty trucks. They test plane mirrors, concave mirrors, and convex mirrors. They measure how wide an area behind the truck can be monitored by the driver in each mirror.",
    subQuestions: [
      {
        question: "Which mirror is best suited to provide a wider field of view for the driver?",
        options: ["Concave mirror", "Convex mirror", "Plane mirror", "Parabolic concenrator"],
        correctIndex: 1,
        answer: "Convex mirror",
        explanation: "Convex mirrors bulge outward, diverging light to provide a wider field of view than other mirrors."
      },
      {
        question: "What type of image is always formed by a rearview convex mirror?",
        options: ["Inverted, magnified and real", "Upright, reduced (diminished) and virtual", "Upright, magnified and virtual", "Inverted, reduced and real"],
        correctIndex: 1,
        answer: "Upright, reduced (diminished) and virtual",
        explanation: "Convex mirrors always form upright, reduced, and virtual images."
      }
    ]
  },
  {
    id: 4,
    caseTitle: "The Optic Blind Spot Test",
    caseDescription: "A biology instructor draws a black cross and a black circular dot on a white card sheet separated by 8 cm. She asks the students to close their left eyes, hold the card at arm's length, and look steadily at the cross. Slowly, they bring the card closer. At a specific distance, the black dot completely disappears from their field of view.",
    subQuestions: [
      {
        question: "Why does the dot fade away from sight at a particular distance?",
        options: ["Because ciliary muscles contract completely", "Because the image of the dot falls on the blind spot of the retina", "Because the cross is too bright", "Because the pupil expands completely"],
        correctIndex: 1,
        answer: "Because the image of the dot falls on the blind spot of the retina",
        explanation: "The blind spot is the region where the optic nerve exits the retina. It lacks photoreceptors, making any image falling here invisible."
      },
      {
        question: "Are there photoreceptors (rods or cones) present in the blind spot?",
        options: ["Yes, only rod cells are present", "Yes, only cone cells are present", "No, both rod and cone cells are missing", "Yes, both rods and cones are abundant"],
        correctIndex: 2,
        answer: "No, both rod and cone cells are missing",
        explanation: "The optic nerve exit lacks light-sensitive cells, so light falling on this region cannot trigger nerve signals."
      }
    ]
  },
  {
    id: 5,
    caseTitle: "Apurva's Parallel Mirror Showcase",
    caseDescription: "During a visit to a salon, Apurva sits in front of a flat plane mirror. Behind her, another plane mirror has been mounted facing the front one. They are aligned completely parallel to each other. She is amazed to see a long series of nested images echoing into the distance.",
    subQuestions: [
      {
        question: "What is the theoretical number of images of Apurva formed in this configuration?",
        options: ["One", "Two", "Three", "An infinite number of images"],
        correctIndex: 3,
        answer: "An infinite number of images",
        explanation: "When mirrors are parallel (0° inclination), light reflects back and forth continuously, forming infinite images."
      },
      {
        question: "As the images get further away, why do they appear dimmer?",
        options: ["Due to the curvature of light", "Because some light is absorbed by the mirror surface with each reflection", "Because the speed of light turns negative", "Because of ciliary muscle fatigue"],
        correctIndex: 1,
        answer: "Because some light is absorbed by the mirror surface with each reflection",
        explanation: "Mirrors are not 100% reflective; they absorb a small faction of light with each bounce, making distant reflections look progressively dimmer."
      }
    ]
  },
  {
    id: 6,
    caseTitle: "Vitamin A and the Retina Care",
    caseDescription: "In a medical survey conducted in rural primary schools, several children complain of difficulty reading the board in dim evening light. A medical doctor checks their eyes and prescribes a change in diet, advising them to eat more papayas, carrots, and spinach.",
    subQuestions: [
      {
        question: "What vision defect is affect by the pupils under poor light?",
        options: ["Color blindness", "Cataract", "Night blindness", "Glaucoma"],
        correctIndex: 2,
        answer: "Night blindness",
        explanation: "Night blindness is the inability to see in low-light environments, typically caused by Vitamin A deficiency."
      },
      {
        question: "Carrots and papayas help correct this deficiency because they are rich in:",
        options: ["Vitamin C", "Vitamin A", "Iron minerals", "Calcium"],
        correctIndex: 1,
        answer: "Vitamin A",
        explanation: "Carrots and papayas are rich in beta-carotene, which our body converts to Vitamin A, essential for rod photopigments."
      }
    ]
  },
  {
    id: 7,
    caseTitle: "Symmetrical Laser Reflection Tracking",
    caseDescription: "In an optics lab, a student projects a narrow red laser beam to hit a flat plane reflecting sheet. Normal line calculations are traced. Protractors measure the incoming ray making a 40° angle from the normal line.",
    subQuestions: [
      {
        question: "What is the angle of reflection of the red laser beam from the normal?",
        options: ["40°", "50°", "90°", "10°"],
        correctIndex: 0,
        answer: "40°",
        explanation: "By the law of reflection, the angle of reflection matches the angle of incidence, both measured from the normal."
      },
      {
        question: "If she tilts the laser so the incident ray is aligned along the normal, what is the angle of reflection?",
        options: ["90°", "180°", "0°", "45°"],
        correctIndex: 2,
        answer: "0°",
        explanation: "Projecting light along the normal means angle of incidence is 0°. The ray reflects along the normal, so r = 0°."
      }
    ]
  },
  {
    id: 8,
    caseTitle: "The Cornea and cataract Surgery",
    caseDescription: "Grandmother undergoes eye surgery. The doctor explains that her biological eye lens became cloudy, which blocked light. They removed the hazy lens and inserted an artificial plastic intraocular lens.",
    subQuestions: [
      {
        question: "What is this cloudy eye lens vision defect called?",
        options: ["Astigmatism", "Cataract", "Presbyopia", "Myopia"],
        correctIndex: 1,
        answer: "Cataract",
        explanation: "Cataract is the clouding of the eye lens with age, which blocks light and causes hazy vision."
      },
      {
        question: "What does the surgeon do to restore grandmother's vision?",
        options: ["They clean the cornea with a laser", "They replace her cloudy biological lens with an artificial convex lens", "They remove the vitreous humor", "They change her retina pigment"],
        correctIndex: 1,
        answer: "They replace her cloudy biological lens with an artificial convex lens",
        explanation: "Cataract surgery replaces the clouded natural lens with a clear artificial convex lens to restore focus."
      }
    ]
  },
  {
    id: 9,
    caseTitle: "Bouncing Light in Rippled Ponds",
    caseDescription: "A boy stands next to a quiet garden pond. The water is perfectly still. He can view a sharp, colored image of the nearby cherry tree in the water. He throws a pebble into the pond. As ripples propagate, the mirror description of the tree collapses into a blurry, shifting smear of colors.",
    subQuestions: [
      {
        question: "What type of reflection formed the sharp image when the water was still?",
        options: ["Diffused reflection", "Regular reflection", "Reflux refraction", "Total internal refraction"],
        correctIndex: 1,
        answer: "Regular reflection",
        explanation: "Still, smooth water acts like a flat mirror, producing regular reflections that form sharp images."
      },
      {
        question: "Why did the image turn blurry when ripples traveled across the water surface?",
        options: ["The water absorbed all incoming light rays", "The ripples created and shifted surface normals, causing diffused reflection", "The speed of light in water increased", "The laws of reflection were completely broken"],
        correctIndex: 1,
        answer: "The ripples created and shifted surface normals, causing diffused reflection",
        explanation: "Ripples create an uneven surface. Light reflects at varying angles, causing diffuse reflection that smears the image."
      }
    ]
  },
  {
    id: 10,
    caseTitle: "Louis Braille and помощник Tactile Code",
    caseDescription: "A group of volunteers visits a rehabilitation center for visually disabled students. The students use a specialized stylus, a flat board stencil sheet, and thick card paper. They write by pressing dots, feeling the card flipside for raised configurations.",
    subQuestions: [
      {
        question: "Each tactile character in the Braille system has a grid consisting of:",
        options: ["8 dot positions", "12 dot positions", "6 dot positions", "10 dot positions"],
        correctIndex: 2,
        answer: "6 dot positions",
        explanation: "The Braille system uses grid cells of 6 dots (three dots high, two wide) to tactilely represent characters."
      },
      {
        question: "How do visually challenged students read Braille character cards?",
        options: ["Through retinal projection", "Using their sense of touch with their fingertips on raised dots", "By decoding Morse clicks", "Through heat signatures"],
        correctIndex: 1,
        answer: "Using their sense of touch with their fingertips on raised dots",
        explanation: "Braille is read tactilely by running fingertips over patterns of raised dots on thick paper."
      }
    ]
  },
  {
    id: 11,
    caseTitle: "An Incident Ray Angular Balance",
    caseDescription: "An angular plane mirror reflecting test is performed. The experiment list notes: 'Angle of incidence is 35°'. Normal lines are checked.",
    subQuestions: [
      {
        question: "What is the angle of reflection in this test?",
        options: ["35°", "55°", "90°", "10°"],
        correctIndex: 0,
        answer: "35°",
        explanation: "By the law of reflection, the angle of reflection matches the angle of incidence, which is 35° in this case."
      },
      {
        question: "What is the total angle between the incident ray and the reflected ray?",
        options: ["35°", "55°", "70°", "90°"],
        correctIndex: 2,
        answer: "70°",
        explanation: "The angle between the incident and reflected rays is i + r = 35° + 35° = 70°."
      }
    ]
  },
  {
    id: 12,
    caseTitle: "Submarine Periscope Geometry",
    caseDescription: "A military engineering team is assembling a steel periscope for stealth observation. They mount two flat mirrors at the upper and lower elbow bends of a long pipe shroud.",
    subQuestions: [
      {
        question: "What is the angle of inclination of the mirrors with the pipe's vertical axis?",
        options: ["90°", "45°", "60°", "30°"],
        correctIndex: 1,
        answer: "45°",
        explanation: "The mirrors are inclined at 45° to reflect parallel light rays 90° down the tube, and then another 90° into the observer's eyes."
      },
      {
        question: "Are the two mirrors of a periscope placed parallel or perpendicular?",
        options: ["Perpendicular to each other", "Parallel to each other", "At a 60° angle to each other", "At a 30° angle to each other"],
        correctIndex: 1,
        answer: "Parallel to each other",
        explanation: "The mirrors must be parallel so that the light emerging from the periscope is parallel to the light entering it, avoiding image distortion."
      }
    ]
  },
  {
    id: 13,
    caseTitle: "The Tapetum Lucidum of Cats",
    caseDescription: "During home play under a night camera, a student observes that her pet cat's eyes appear to glow in the dark when lit by a phone camera bulb. Humans' eyes do not display this intense glowing effect.",
    subQuestions: [
      {
        question: "What biological micro-mirror structure in cats causes this glow?",
        options: ["Cone cells", "Cornea layer bulge", "Tapetum Lucidum", "Sclera sheets"],
        correctIndex: 2,
        answer: "Tapetum Lucidum",
        explanation: "The tapetum lucidum is a reflective layer behind the retina in cats that bounces light back through photoreceptors, improving low-light vision and causing their eyes to glow."
      },
      {
        question: "What advantage does this membrane layer offer to nocturnal animals?",
        options: ["Improves daylight color vision", "Enhances low-light sensitivity by letting light hit photoreceptors twice", "Filters out ultraviolet radiation", "Allows active radiation emission"],
        correctIndex: 1,
        answer: "Enhances low-light sensitivity by letting light hit photoreceptors twice",
        explanation: "The tapetum lucidum reflects unused light back through the retina, absorbing more light and enhancing dim night vision."
      }
    ]
  },
  {
    id: 14,
    caseTitle: "Opaque flashlight Cast shadows",
    caseDescription: "During evening camp, kids play shadow hand puppets on a tent wall. By placing a wooden stick or holding their fingers in front of a battery lantern, they paint large black outlines of eagles and wolves.",
    subQuestions: [
      {
        question: "What is the key principle behind shadow formation?",
        options: ["Light travels in straight lines and cannot pass through opaque objects", "Light bends smoothly around objects", "Opaque materials emit dark light waves", "Flashlights shut down on contact with wood"],
        correctIndex: 0,
        answer: "Light travels in straight lines and cannot pass through opaque objects",
        explanation: "Light travels in straight lines, so blocking it with an opaque object prevents light from reaching the screen behind, casting a shadow."
      },
      {
        question: "Which of the following is an example of a translucent material that would cast a faint, blurred shadow?",
        options: ["Frosted glass / butter paper", "Polished mirror", "Wooden stick", "Clear glass sheet"],
        correctIndex: 0,
        answer: "Frosted glass / butter paper",
        explanation: "Translucent materials like frosted glass let some light pass through but scatter it, forming faint, blurred shadows."
      }
    ]
  },
  {
    id: 15,
    caseTitle: "Double Perpendicular Mirror Ray reflections",
    caseDescription: "An optical laboratory test constructs an L-shaped mirror set. Two flat mirrors are jointed at an exact 90-degree corner. A light beam strikes Mirror 1 at an angle of incidence of 40°.",
    subQuestions: [
      {
        question: "Since angle of incidence on Mirror 1 is 40°, what is the angle of reflection from Mirror 1?",
        options: ["40°", "50°", "90°", "10°"],
        correctIndex: 0,
        answer: "40°",
        explanation: "The angle of reflection equals the angle of incidence, which is 40° in this case."
      },
      {
        question: "What will be the angle of incidence on the second perpendicular mirror?",
        options: ["40°", "50°", "90°", "45°"],
        correctIndex: 1,
        answer: "50°",
        explanation: "Since the mirrors are perpendicular (90°), the sum of the angles of incidence must equal 90°, so the angle of incidence on Mirror 2 is 90° - 40° = 50°."
      }
    ]
  },
  {
    id: 16,
    caseTitle: "Animation and persistency lines",
    caseDescription: "A child draws a series of progressively opening wings of a bird on separate pages of a small booklet. By holding the book edge and flicking the pages fast, the bird begins to soar.",
    subQuestions: [
      {
        question: "Which physiological sensory feature of our eye makes this animation work?",
        options: ["Color perception by cones", "Accommodation of ciliary muscles", "Persistence of vision", "Refraction by pupil"],
        correctIndex: 2,
        answer: "Persistence of vision",
        explanation: "Persistence of vision retains an image on the retina for 1/16 of a second, merging fast succession prints into continuous motion."
      },
      {
        question: "What is the minimum frame-rate per second to achieve smooth animation transition?",
        options: ["1 to 2 frames per second", "At least 16 frames per second", "Exactly 5 frames per second", "More than 500 frames per second"],
        correctIndex: 1,
        answer: "At least 16 frames per second",
        explanation: "The retina retains an image for 1/16 of a second, so at least 16 frames per second are needed for smooth animation."
      }
    ]
  },
  {
    id: 17,
    caseTitle: "Sunlight Dispersion through drop rain",
    caseDescription: "Heavy post-noon showers are followed by bright yellow sunlight. Looking away from the sun, kids see a huge curved color strip sweeping across the eastern sky.",
    subQuestions: [
      {
        question: "What natural water particles act as prisms to create a rainbow?",
        options: ["Air dust particles", "Falling water raindrops", "Pond still borders", "Tree leaves"],
        correctIndex: 1,
        answer: "Falling water raindrops",
        explanation: "Raindrops act as tiny prisms, refracting, reflecting, and dispersing sunlight into a rainbow."
      },
      {
        question: "The correct sequence of colors in a rainbow from bottom to top is represented as:",
        options: ["ROYGBIV", "VIBGYOR", "YGBIVOR", "GIVORYB"],
        correctIndex: 1,
        answer: "VIBGYOR",
        explanation: "A rainbow splits sunlight into Violet, Indigo, Blue, Green, Yellow, Orange, and Red, from bottom to top."
      }
    ]
  },
  {
    id: 18,
    caseTitle: "The Iris and dilatation timing",
    caseDescription: "A parent walks from the bright sunny parking lot into the dark basement of a shopping mall. He reports failing to see the floor lines for several seconds, but then his sight normalizes.",
    subQuestions: [
      {
        question: "What muscle iris response happens when stepping from bright into dark light?",
        options: ["The pupil contracts immediately", "The ciliary muscles become solid", "The pupil slowly dilates to admit more light", "The cornea layers collapse"],
        correctIndex: 2,
        answer: "The pupil slowly dilates to admit more light",
        explanation: "Entering a dark room requires the pupil to dilate to let in more light, a process controlled by iris muscles that takes several seconds."
      },
      {
        question: "This delay of iris muscles in adjusting pupil diameter is called:",
        options: ["Dark adaptation", "Near focus strain", "Chromatic focus shift", "Retina bleach failure"],
        correctIndex: 0,
        answer: "Dark adaptation",
        explanation: "Dark adaptation is the time it takes for rods to adapt and the pupil to dilate when moving from bright to dim light."
      }
    ]
  },
  {
    id: 19,
    caseTitle: "Smooth vs Satin wall paint Reflections",
    caseDescription: "An interior designer has to decide color palettes. A high gloss paint option causes glares of light bulbs to be visible on the wall. A matte finish paint option hides all bulb reflections, displaying smooth ambient room illumination.",
    subQuestions: [
      {
        question: "What reflection occurs on the glossy paint surface?",
        options: ["Diffused reflection", "Regular reflection", "Bilateral inversion", "Wave refraction"],
        correctIndex: 1,
        answer: "Regular reflection",
        explanation: "A smooth glossy wall reflects light parallel, acting like a mirror and forming glare reflections."
      },
      {
        question: "Why does the matte paint hide bulb reflections?",
        options: ["It absorbs all room light", "Its rough microscopic surface scatters reflection vectors diffusely", "It shifts key light speeds", "It contains only black dyes"],
        correctIndex: 1,
        answer: "Its rough microscopic surface scatters reflection vectors diffusely",
        explanation: "A matte surface is microscopically rough, scattering incident light in all directions (diffuse reflection)."
      }
    ]
  },
  {
    id: 20,
    caseTitle: "The Crystalline Lens of Eyes",
    caseDescription: "During lens curvature research, a student models the human eye crystalline convex lens. The model relies on stretchable rubber boundaries that can be widened or squeezed.",
    subQuestions: [
      {
        question: "What biological eye tissues act as the squeezing stretches here?",
        options: ["Cones cells", "Ciliary muscles", "Choroid sheets", "Sclera bulks"],
        correctIndex: 1,
        answer: "Ciliary muscles",
        explanation: "Ciliary muscles stretch and compress the flexible crystalline lens to focus objects at varying distances."
      },
      {
        question: "Squeezing this lens to make it thicker decreases its focal length, allowing us to see:",
        options: ["Distant stars clearly", "Nearby books clearly", "No colors of spectrum", "Nothing at all"],
        correctIndex: 1,
        answer: "Nearby books clearly",
        explanation: "A thicker lens bends light more, decreasing focal length to focus rays from nearby objects onto the retina."
      }
    ]
  }
];

// 7. SELF-ASSESSMENT STUDYSET FOR CLASS 8 (25 MCQ Questions)
export const CLASS8_SELF_ASSESSMENT: QuizQuestion[] = [
  {
    id: 1,
    question: "When a dry wood board is illuminated by a flashlight, why do we NOT see an image of the flashlight on the wood?",
    options: [
      "Because wood is highly transparent.",
      "Because wood absorbs all light rays.",
      "Because the microscopic surface of wood is rough and scatters light in all directions (diffuse reflection).",
      "Because the angle of reflection is zero for wood."
    ],
    correctAnswer: 2,
    explanation: "Wood has a rough surface that scatters light in all directions (diffuse reflection), preventing the formation of a mirror image."
  },
  {
    id: 2,
    question: "If an incident ray strikes a plane mirror perpendicular to its surface, what is the angle of incidence?",
    options: ["90°", "45°", "0°", "180°"],
    correctAnswer: 2,
    explanation: "Angles must be measured from the normal. Since the incident ray is perpendicular to the mirror surface, it is aligned with the normal, making the angle of incidence 0°."
  },
  {
    id: 3,
    question: "Which cell types in our retinas are excited in extremely bright sunny courtyards and convey color information?",
    options: ["Rods", "Epithelial layers", "Cones", "Ciliary fibers"],
    correctAnswer: 2,
    explanation: "Cone cells are active in bright light and are responsible for detecting color and fine details."
  },
  {
    id: 4,
    question: "If you stand 2.5 meters in front of a flat household plane mirror, what is the distance between you and your reflected image?",
    options: ["2.5 meters", "5.0 meters", "7.5 meters", "1.25 meters"],
    correctAnswer: 1,
    explanation: "The image is formed as far behind the mirror as the object is in front. Since the object is 2.5m away, the total distance between you and your image is 2.5m + 2.5m = 5m."
  },
  {
    id: 5,
    question: "What occurs to the pupil when you walk out from a dim theater into dazzling summer sunlight?",
    options: [
      "The pupil dilates to admit more light.",
      "The pupil instantly contracts to safeguard retina receptors.",
      "The pupil stays unchanged.",
      "The pupil changes its color."
    ],
    correctAnswer: 1,
    explanation: "The pupil contracts in bright light to protect the retina from being bleached or burned."
  },
  {
    id: 6,
    question: "Louis Braille designed a tactile code system for visually challenged people. How many dots are in a single Braille character cell?",
    options: ["4 dots", "8 dots", "6 dots", "10 dots"],
    correctAnswer: 2,
    explanation: "The Braille system cell consists of a grid containing exactly 6 dot positions."
  },
  {
    id: 7,
    question: "How many images are formed when two plane mirrors are placed face-to-face parallel to each other?",
    options: ["One", "Three", "Ten", "An infinite number"],
    correctAnswer: 3,
    explanation: "Parallel mirrors (0° inclination) reflect light back and forth continuously, forming infinite images."
  },
  {
    id: 8,
    question: "Which of the following parts of the human eye acts as the light-sensitive screen at the back of the eyeball?",
    options: ["Cornea", "Iris", "Pupil", "Retina"],
    correctAnswer: 3,
    explanation: "The retina is the light-sensitive sensory layer at the back of the eye where images are focused."
  },
  {
    id: 9,
    question: "If the angle of reflection from a mirror is 40°, what is the angle of incidence?",
    options: ["50°", "40°", "90°", "0°"],
    correctAnswer: 1,
    explanation: "By the law of reflection, the angle of incidence matches the angle of reflection (∠i = ∠r)."
  },
  {
    id: 10,
    question: "What is the primary cause behind Cataracts in elderly individuals?",
    options: [
      "The retina becomes detached from the optic nerve.",
      "The eye lens loses its transparency and turns cloudy.",
      "The cornea curves excessively.",
      "Rods fail to sense green light."
    ],
    correctAnswer: 1,
    explanation: "Cataracts occur when the crystalline lens clouds over with age, blocking light from reaching the retina."
  },
  {
    id: 11,
    question: "What optical toy uses three mirrors inclined at 60° to form endless symmetrical patterns?",
    options: ["Telescope", "Periscope", "Kaleidoscope", "Microscope"],
    correctAnswer: 2,
    explanation: "A kaleidoscope uses three rectangular mirrors placed in a triangular configuration to form symmetrical visual patterns through multiple reflections."
  },
  {
    id: 12,
    question: "Which biological nerve transmits optical signal coordinates from our eyes to the occipital brain?",
    options: ["Olfactory nerve", "Auditory nerve", "Optic nerve", "Vagus nerve"],
    correctAnswer: 2,
    explanation: "The optic nerve delivers electrical impulses from the retina to the brain for visual processing."
  },
  {
    id: 13,
    question: "To correct night blindness, a patient's diet should be rich in which vitamin?",
    options: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin K"],
    correctAnswer: 1,
    explanation: "Vitamin A is essential for rods to synthesize rhodopsin, the photopigment needed for low-light vision."
  },
  {
    id: 14,
    question: "Why does the word 'AMBULANCE' appear written backwards on emergency vehicles?",
    options: [
      "It is written in Latin terminology.",
      "To produce lateral inversion in preceding drivers' rearview mirrors.",
      "To deflect weather winds.",
      "Due to optical aberrations."
    ],
    correctAnswer: 1,
    explanation: "The backwards word undergoes lateral inversion in rearview mirrors, displaying it correctly ('AMBULANCE') for preceding drivers."
  },
  {
    id: 15,
    question: "If we join two plane mirrors at a right angle (90°), how many images are formed of a pen placed between them?",
    options: ["One", "Two", "Three", "Four"],
    correctAnswer: 2,
    explanation: "Using n = (360/θ) - 1 with θ = 90°: n = (360/90) - 1 = 4 - 1 = 3 images."
  },
  {
    id: 16,
    question: "Which of the following animal species displays remarkable night sight due to high rod concentration in their retinas?",
    options: ["Owls", "Eagle Hawk", "Pigeons", "Butterfly"],
    correctAnswer: 0,
    explanation: "Owls have high retinal rod density, enabling excellent night vision but limited color perception."
  },
  {
    id: 17,
    question: "The glassy transparent dome layer that forms the front protective window of the eye is named the:",
    options: ["Retina", "Iris", "Lens", "Cornea"],
    correctAnswer: 3,
    explanation: "The cornea is the outer transparent bulge through which light enters, providing protection and initial refraction."
  },
  {
    id: 18,
    question: "If a light ray strikes a plane mirror making a 35° angle with the mirror surface, what is its angle of reflection?",
    options: ["35°", "55°", "45°", "90°"],
    correctAnswer: 1,
    explanation: "Angle with normal is 90° - 35° = 55°. Since angle of incidence is 55°, the angle of reflection is also 55°."
  },
  {
    id: 19,
    question: "Which muscle controls the curvature and shape of the human crystalline convex lens?",
    options: ["Iris muscle", "Cornea fibers", "Ciliary muscles", "Retinal ganglion"],
    correctAnswer: 2,
    explanation: "Ciliary muscles contract and relax to adjust the curvature and focal length of the eye lens."
  },
  {
    id: 20,
    question: "What is the biological blind spot of the mammalian eye?",
    options: [
      "The boundary where the pupil contracts.",
      "The border where ciliary muscles connect to the sclera.",
      "The junction where the optic nerve exits the retina, lacking rods or cones.",
      "The dark green pigment layer."
    ],
    correctAnswer: 2,
    explanation: "The blind spot is the exit point of the optic nerve, which has no photoreceptors, rendering it blind to light."
  },
  {
    id: 21,
    question: "Why do ciliary muscles adjust the lens of our eyes?",
    options: [
      "To regulate pupil diameter.",
      "To change the lens's focal length to see objects at different distances.",
      "To produce tears.",
      "To alter iris pigments."
    ],
    correctAnswer: 1,
    explanation: "Changing lens curvature varies its focal length, allowing the eye to focus on both near and far objects."
  },
  {
    id: 22,
    question: "What causes a shadow to be cast on a wall when you hold a cardboard sheet in front of a lamp?",
    options: [
      "Light bends smoothly around the cardboard.",
      "Light travels in straight lines and cannot pass through the opaque cardboard.",
      "The lamp turns off.",
      "The cardboard is a reflector."
    ],
    correctAnswer: 1,
    explanation: "Cardboard is opaque and blocks straight-traveling light, casting a shadow."
  },
  {
    id: 23,
    question: "Which of the following is a translucent material?",
    options: ["Cardboard", "Water", "Frosted glass", "Mirror sheet"],
    correctAnswer: 2,
    explanation: "Frosted glass is translucent; it transmits some light but scatters it, distorting objects behind it."
  },
  {
    id: 24,
    question: "How does still water mimic plane mirrors in regular reflection?",
    options: [
      "By absorbing all light rays.",
      "Its smooth, flat surface reflects parallel rays parallel, forming a sharp image.",
      "By shifting the speed of light.",
      "By changing red light into green light."
    ],
    correctAnswer: 1,
    explanation: "Still water acts as a smooth plane reflecting boundary, producing regular reflection."
  },
  {
    id: 25,
    question: "What is the minimum distance at which a normal healthy adult scan-read comfortable with no eye strain?",
    options: ["10 cm", "25 cm", "50 cm", "Infinity"],
    correctAnswer: 1,
    explanation: "25 cm is the Near Point (Least Distance of Distinct Vision) for a healthy adult eye."
  },
  {
    id: 26,
    question: "A student looks at their face through the back of a large polished stainless steel serving spoon. What will they observe about the image of their face?",
    options: [
      "The image is virtual, inverted, and bigger",
      "The image is virtual, erect, and smaller than their face",
      "The image is real, erect, and the exact same size",
      "No image is formed because spoon backs absorb all light"
    ],
    correctAnswer: 1,
    explanation: "Spoon backs act as convex mirrors. A convex mirror always diverges parallel rays of light, forming a virtual, erect, and smaller (diminished) image."
  },
  {
    id: 27,
    question: "Which of the following optical devices can act as a converging mirror, concentrating solar energy at its focus to boil water?",
    options: ["Convex mirror", "Concave mirror", "Concave lens", "Plane mirror"],
    correctAnswer: 1,
    explanation: "A concave mirror curves inwards and is a converging mirror. It focuses parallel solar light rays on its principal focus, creating immense heat capable of warming objects."
  },
  {
    id: 28,
    question: "Suppose you have a lens that is thinner in the middle and thicker at the edges. When a collimated (parallel) light beam passes through it, what does it do?",
    options: [
      "It focuses the beam onto a single point in front of the lens",
      "It diverges (spreads out) the beam of light",
      "It causes the light beam to rotate 90 degrees",
      "It behaves like a plane mirror and reflects the beam fully"
    ],
    correctAnswer: 1,
    explanation: "A lens that is thinner in the middle and thicker at the edges is a concave lens. This lens is a diverging lens, which spreads out incoming parallel rays of light."
  },
  {
    id: 29,
    question: "A dentist uses a small curved mirror to get a magnified, upright (erect) view of a patient's molars. What type of mirror does the dentist use?",
    options: ["Convex mirror", "Plane mirror", "Concave mirror", "Cylindrical-half mirror"],
    correctAnswer: 2,
    explanation: "When an object is placed very close to a concave mirror (between its focus and the pole), the concave mirror acts as a magnifying mirror, producing a virtual, erect, and magnified image."
  },
  {
    id: 30,
    question: "An image that can be projected and captured on a physical white screen placed in the path of light is known as a:",
    options: ["Virtual image", "Real image", "Laterally inverted virtual image", "Symmetrical phantom image"],
    correctAnswer: 1,
    explanation: "A real image is formed when reflected or refracted rays actually meet at a point. Such images can always be cast on a physical screen."
  }
];
