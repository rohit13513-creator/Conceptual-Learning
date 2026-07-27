// Class 10 Optics Study Data
import { QuizQuestion, NCERTSolvedQuestion, ShortQuestion, LongQuestion, AssertionReasonQuestion, CompetencyQuestion } from "../types-custom";

// NCERT SOLVED STUDY ELEMENTS (Class 10) - 20 Solved Questions
export const CLASS10_NCERT_SOLVED: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Textbook Q1",
    question: "A convex mirror used for rearview on an automobile has a radius of curvature of 3.00 m. If a bus is located at 5.00 m from this mirror, find the position, nature, and size of the image.",
    given: { "Radius of curvature (R)": "+3.00 m", "Object distance (u)": "-5.00 m" },
    formulaUsed: "f = R/2; 1/v + 1/u = 1/f; m = -v/u",
    derivationSteps: [
      "Focal length f = R/2 = +3.00 / 2 = +1.50 m.",
      "Using mirror formula: 1/v = 1/f - 1/u = 1/1.50 - 1/(-5.00) = 1/1.50 + 1/5.00.",
      "1/v = 10/15 + 1/5 = 2/3 + 1/5 = 13/15. So, v = 15/13 = +1.15 m.",
      "Magnification m = -v/u = - (1.15) / (-5.00) = +0.23."
    ],
    finalAnswer: "The image is at 1.15 m behind the mirror. It is virtual, erect, and diminished (0.23 times the bus size).",
    conceptualTip: "A convex mirror always has a positive focal length and always forms virtual images."
  },
  {
    id: 2,
    questionNumber: "Textbook Q2",
    question: "An object, 4.0 cm in size, is placed at 25.0 cm in front of a concave mirror of focal length 15.0 cm. At what distance from the mirror should a screen be placed in order to obtain a sharp image? Find the nature and size of the image.",
    given: { "Object size (h)": "4.0 cm", "Object distance (u)": "-25.0 cm", "Focal length (f)": "-15.0 cm" },
    formulaUsed: "1/v + 1/u = 1/f; m = h'/h = -v/u",
    derivationSteps: [
      "Using mirror equation: 1/v = 1/f - 1/u = 1/(-15.0) - 1/(-25.0) = -1/15 + 1/25 = -2/75.",
      "Therefore, image distance v = -75/2 = -37.5 cm.",
      "Using magnification: h' = h * (-v/u) = 4.0 * (-(-37.5) / -25.0) = 4.0 * (-1.5) = -6.0 cm."
    ],
    finalAnswer: "The screen should be placed at 37.5 cm in front of the mirror. The image is real, inverted, and magnified (size: 6.0 cm).",
    conceptualTip: "Negative magnification signifies a real and inverted image."
  },
  {
    id: 3,
    questionNumber: "Textbook Q3",
    question: "A concave lens has focal length of 15 cm. At what distance should the object from the lens be placed so that it forms an image at 10 cm from the lens? Also, find the magnification produced by the lens.",
    given: { "Focal length (f)": "-15 cm", "Image distance (v)": "-10 cm" },
    formulaUsed: "1/v - 1/u = 1/f; m = v/u",
    derivationSteps: [
      "Using lens equation: 1/u = 1/v - 1/f = 1/(-10) - 1/(-15) = -1/10 + 1/15 = -1/30.",
      "Thus, object distance u = -30 cm.",
      "Magnification m = v / u = -10 / -30 = +0.33."
    ],
    finalAnswer: "The object must be placed at 30 cm in front of the concave lens. Magnification is +0.33.",
    conceptualTip: "Concave lenses always form virtual, erect, and diminished images on the same side as the object."
  },
  {
    id: 4,
    questionNumber: "Textbook Q4",
    question: "A 2.0 cm tall object is placed perpendicular to the principal axis of a convex lens of focal length 10 cm. The distance of the object from the lens is 15 cm. Find the nature, position, and size of the image. Also find its magnification.",
    given: { "Object size (h)": "2.0 cm", "Focal length (f)": "+10 cm", "Object distance (u)": "-15 cm" },
    formulaUsed: "1/v - 1/u = 1/f; m = h'/h = v/u",
    derivationSteps: [
      "Using lens equation: 1/v = 1/f + 1/u = 1/10 + 1/(-15) = 1/10 - 1/15 = 1/30.",
      "So, image distance v = +30 cm.",
      "Magnification m = v/u = 30 / -15 = -2.0.",
      "Image height h' = m * h = -2.0 * 2.0 = -4.0 cm."
    ],
    finalAnswer: "The image is formed at 30 cm on the other side of the lens. It is real, inverted, and double the size of the object.",
    conceptualTip: "For lenses, positive image distance values represent real images on the opposite side."
  },
  {
    id: 5,
    questionNumber: "Textbook Q5",
    question: "Find the focal length of a lens of power -2.0 D. What type of lens is this?",
    given: { "Power (P)": "-2.0 D" },
    formulaUsed: "P = 1 / f (in meters)",
    derivationSteps: [
      "Using power formula: f = 1 / P = 1 / (-2.0) = -0.5 m.",
      "f = -0.5 * 100 = -50 cm.",
      "Since focal length is negative, it is a concave lens."
    ],
    finalAnswer: "The focal length is -50 cm (-0.5 m). It is a concave lens.",
    conceptualTip: "Doctors prescribe negative powers for correcting Myopia (nearsightedness)."
  },
  {
    id: 6,
    questionNumber: "Textbook Q6",
    question: "A doctor has prescribed a corrective lens of power +1.5 D. Find the focal length of the lens. Is the prescribed lens diverging or converging?",
    given: { "Power (P)": "+1.5 D" },
    formulaUsed: "f = 1 / P",
    derivationSteps: [
      "f = 1 / +1.5 = +2/3 m = +0.67 m.",
      "f = +66.7 cm.",
      "Since the power and focal length are positive, it is a converging (convex) lens."
    ],
    finalAnswer: "The focal length is +66.7 cm. It is a converging (convex) lens.",
    conceptualTip: "Positive power lens is used to treat Hypermetropia (farsightedness)."
  },
  {
    id: 7,
    questionNumber: "Textbook Q7",
    question: "The refractive index of carbon disulfide is 1.63. What is the speed of light in carbon disulfide?",
    given: { "Refractive index (n)": "1.63", "Speed of light in vacuum (c)": "3 x 10^8 m/s" },
    formulaUsed: "n = c / v",
    derivationSteps: [
      "v = c / n = (3.00 x 10^8) / 1.63.",
      "v = 1.84 x 10^8 m/s."
    ],
    finalAnswer: "The speed of light in carbon disulfide is 1.84 x 10^8 m/s.",
    conceptualTip: "Higher refractive index means optically denser medium and slower light speed."
  },
  {
    id: 8,
    questionNumber: "Textbook Q8",
    question: "An object is placed at a distance of 10 cm from a convex mirror of focal length 15 cm. Find the position and nature of the image.",
    given: { "Object distance (u)": "-10 cm", "Focal length (f)": "+15 cm" },
    formulaUsed: "1/v + 1/u = 1/f",
    derivationSteps: [
      "Using mirror formula: 1/v = 1/f - 1/u = 1/15 - 1/(-10) = 1/15 + 1/10 = 5/30 = 1/6.",
      "Therefore, image distance v = +6 cm."
    ],
    finalAnswer: "The image is formed at 6 cm behind the mirror. It is virtual, erect.",
    conceptualTip: "A convex mirror never forms a real image of a real object."
  },
  {
    id: 9,
    questionNumber: "Textbook Q9",
    question: "A concave mirror produces three times magnified real image of an object placed at 10 cm in front of it. Where is the image located?",
    given: { "Magnification (m)": "-3 (negative for real image)", "Object distance (u)": "-10 cm" },
    formulaUsed: "m = -v/u",
    derivationSteps: [
      "Substitute: -3 = -v / (-10) = v / 10.",
      "Multiply both sides by -10: v = -30 cm."
    ],
    finalAnswer: "The image is located at a distance of 30 cm in front of the concave mirror.",
    conceptualTip: "Real images are formed in front of the mirror where a screen can be placed."
  },
  {
    id: 10,
    questionNumber: "Textbook Q10",
    question: "Light enters from air to a glass plate having refractive index 1.50. What is the speed of light in the glass?",
    given: { "Refractive index of glass n": "1.50", "Speed of light in vacuum c": "3 x 10^8 m/s" },
    formulaUsed: "n = c / v",
    derivationSteps: [
      "v = c / n = (3 x 10^8) / 1.50.",
      "v = 2 x 10^8 m/s."
    ],
    finalAnswer: "The speed of light in the glass is 2 x 10^8 m/s.",
    conceptualTip: "Light slows down by exactly 33.3% as it transitions from vacuum to crown glass."
  },
  {
    id: 11,
    questionNumber: "Textbook Q11",
    question: "Why does a normal eye fail to see clearly any objects placed closer than 25 cm?",
    given: { "Near point distance": "25 cm" },
    formulaUsed: "Ciliary muscle contraction limit",
    derivationSteps: [
      "To focus on nearby objects, ciliary muscles contract to increase eye lens curvature.",
      "They cannot contract beyond a certain biological limit.",
      "Therefore, objects held closer than 25 cm appear blurred and cause strain."
    ],
    finalAnswer: "Because the focal length of the eye lens cannot be decreased below a certain limit to focus nearby objects on the retina.",
    conceptualTip: "25 cm is the Near Point of a normal eye of an adult."
  },
  {
    id: 12,
    questionNumber: "Textbook Q12",
    question: "A person with a myopic eye can see objects clearly up to 1.2 m. What is the nature and power of the lens required to restore normal distant vision?",
    given: { "Far point of myopic eye (d)": "1.2 m", "Normal far point (u)": "-infinity", "Image distance needed (v)": "-1.2 m" },
    formulaUsed: "1/f = 1/v - 1/u; P = 1/f",
    derivationSteps: [
      "Using lens formula: 1/f = 1/(-1.2) - 1/(-infinity) = -1/1.2.",
      "So focal length f = -1.2 m.",
      "Power P = 1 / f = 1 / (-1.2) = -0.83 D."
    ],
    finalAnswer: "The lens required is a concave lens of power -0.83 Dioptres.",
    conceptualTip: "Myopic correction shifts the virtual image of infinite far objects to the person's real far point."
  },
  {
    id: 13,
    questionNumber: "Textbook Q13",
    question: "What is the far point and near point of the human eye with normal vision?",
    given: { "Optical state": "Emmetropic (normal)" },
    formulaUsed: "Visual boundary limits",
    derivationSteps: [
      "A normal eye can see distant stars, hence far point is Infinity.",
      "The closest distance at which text can be read comfortably is 25 cm, hence near point is 25 cm."
    ],
    finalAnswer: "The near point is 25 cm, and the far point is infinity for a normal eye.",
    conceptualTip: "Infants can focus much closer, while seniors experience receding near points."
  },
  {
    id: 14,
    questionNumber: "Textbook Q14",
    question: "A student sitting on the last bench can read the blackboard writing but has difficulty reading her printed textbook. What is she suffering from and how is it corrected?",
    given: { "Can see": "Far objects clearly", "Cannot see": "Near objects clearly" },
    formulaUsed: "Hypermetropia analysis",
    derivationSteps: [
      "The student can focus far objects but not near ones.",
      "This is farsightedness (Hypermetropia). It is caused by lens flattening or eyeball shortening.",
      "It is corrected using a convex lens of appropriate power."
    ],
    finalAnswer: "She is suffering from Hypermetropia (farsightedness). It is corrected using a convex lens.",
    conceptualTip: "A convex lens supplies additional converging power so light focuses exactly on the retina."
  },
  {
    id: 15,
    questionNumber: "Textbook Q15",
    question: "Why does the sun appear reddish early in the morning? Explain using light scattering physics.",
    given: { "Position of sun": "At the horizon", "Atmospheric path": "Very thick layer" },
    formulaUsed: "Rayleigh's Scattering Law: Scattering ∝ 1/λ^4",
    derivationSteps: [
      "At horizon, sunlight travels a much longer path through the atmosphere.",
      "Shorter wavelengths (blue, violet) scatter away in all directions.",
      "Longer wavelengths (red, orange) escape scattering and reach our eyes."
    ],
    finalAnswer: "Sunlight travels through thick atmospheric layers at the horizon; shorter blue wavelengths are scattered away, leaving only red and orange to reach our eyes.",
    conceptualTip: "Noon sunlight is white because the path length is shortest, resulting in minimal scattering."
  },
  {
    id: 16,
    questionNumber: "Textbook Q16",
    question: "A concave mirror of focal length 20 cm is used to obtain an erect image of an object. What should be the range of distance of the object from the mirror? What is the nature of the image?",
    given: { "Focal length (f)": "-20 cm", "Image nature required": "Erect" },
    formulaUsed: "Mirror reflection ranges",
    derivationSteps: [
      "A concave mirror forms an erect image only when the object is between the pole (P) and the focus (F).",
      "So, the range of distance is from 0 cm to 20 cm from the mirror.",
      "This erect image is always virtual and magnified."
    ],
    finalAnswer: "The object distance should be between 0 cm and 20 cm. The image is virtual, erect, and magnified.",
    conceptualTip: "This virtual magnified image range of a concave mirror is utilized in shaving/makeup mirrors."
  },
  {
    id: 17,
    questionNumber: "Textbook Q17",
    question: "Define refractive index of medium 2 with respect to medium 1 in terms of light speed. Draw its mathematical representation.",
    given: { "Medium 1 speed": "v1", "Medium 2 speed": "v2" },
    formulaUsed: "1_n_2 = v1 / v2",
    derivationSteps: [
      "The refractive index of medium 2 relative to 1 is the ratio of light speed in medium 1 to that in medium 2.",
      "Mathematically: n21 = v1 / v2."
    ],
    finalAnswer: "The relative refractive index n21 = speed of light in medium 1 / speed of light in medium 2.",
    conceptualTip: "If medium 1 is vacuum/air, this is the absolute refractive index."
  },
  {
    id: 18,
    questionNumber: "Textbook Q18",
    question: "One half of a convex lens is covered with a black paper. Will this lens produce a complete image of the object? Explain.",
    given: { "Modification": "50% of lens area blacked out" },
    formulaUsed: "Wavefront re-focusing",
    derivationSteps: [
      "Every part of the lens can refract light and form an image of the object.",
      "If half is covered, light rays from the top half still refract and meet to form a complete image.",
      "Since the refracting area is halved, fewer light rays form the image, making it less bright."
    ],
    finalAnswer: "Yes, the lens will form a complete image, but its brightness (intensity) will be reduced to half.",
    conceptualTip: "Image position and size do not change when a lens is partially covered."
  },
  {
    id: 19,
    questionNumber: "Textbook Q19",
    question: "Why do stellar stars appear to twinkle on a clear dry night while planets do not twinkle?",
    given: { "Stars": "Point-like sources far away", "Planets": "Extended disk sources close by" },
    formulaUsed: "Atmospheric refraction variations",
    derivationSteps: [
      "Stars are extremely far and act as point sources of light.",
      "Refined wind layers constantly shift temperatures, varying the bending of light.",
      "The star's light shifts continuously, appearing to twinkle.",
      "Planets are close and act as extended sources, so these shifts average out."
    ],
    finalAnswer: "Stars are distant point sources whose light is refracted by moving atmospheric layers; planets are larger, closer sources whose refractive shifts average out.",
    conceptualTip: "Astronauts in space do not see stars twinkle; they see them shine steadily."
  },
  {
    id: 20,
    questionNumber: "Textbook Q20",
    question: "What is Tyndall Effect? Give two examples from everyday observations.",
    given: { "Mechanism": "Colloid particle light scattering" },
    formulaUsed: "Scattering of light beams",
    derivationSteps: [
      "When light passes through a colloidal suspension, the particles scatter the beam.",
      "This scatters light in all directions, making the path of the beam visible.",
      "Examples: 1. Sunlight passing through dense forest canopy mist. 2. A light beam from a projector in a dusty cinema hall."
    ],
    finalAnswer: "Tyndall Effect is the scattering of a light beam by colloidal particles, making its path visible. E.g. headlight beams in thick fog.",
    conceptualTip: "True solutions (like salt water) do not show the Tyndall effect because their particles are too small."
  }
];

// CLASS 10 QUESTION BANK (At least 20 in each section)

// 1. MCQS (20 Questions)
export const CLASS10_MCQS: QuizQuestion[] = [
  {
    id: 1,
    question: "A concave mirror produces a real, inverted image of the same size as the object. Where should the object be placed?",
    options: ["At Focus (F)", "Between F and Pole (P)", "At the Center of Curvature (C)", "Beyond C"],
    correctAnswer: 2,
    explanation: "For a concave mirror, when the object is at the center of curvature (C), the image is also formed at C and is real, inverted, and of identical size."
  },
  {
    id: 2,
    question: "Which of the following materials has the highest absolute refractive index?",
    options: ["Water", "Crown Glass", "Diamond", "Kerosene"],
    correctAnswer: 2,
    explanation: "Diamond has the highest optical density and refractive index among common materials, with a value of approximately 2.42."
  },
  {
    id: 3,
    question: "What type of lens is prescribed to correct the eye defect Hypermetropia?",
    options: ["Bi-focal lens", "Concave lens", "Convex lens", "Cylindrical lens"],
    correctAnswer: 2,
    explanation: "Hypermetropia (farsightedness) requires additional converging power to focus nearby light rays on the retina, which is provided by a convex lens."
  },
  {
    id: 4,
    question: "A spherical mirror and a thin spherical lens each have a focal length of -15 cm. The mirror and the lens are likely to be:",
    options: ["Both concave", "Both convex", "Mirror is concave and lens is convex", "Mirror is convex and lens is concave"],
    correctAnswer: 0,
    explanation: "By Cartesian sign convention, both concave mirrors and concave lenses have negative focal lengths."
  },
  {
    id: 5,
    question: "Which of the following is correct for the speed of light in medium A (n = 1.33) compared to medium B (n = 1.50)?",
    options: [
      "Light travels faster in medium A than in medium B",
      "Light travels faster in medium B than in medium A",
      "Light travels at the same speed in both",
      "Speed is zero in medium B"
    ],
    correctAnswer: 0,
    explanation: "Higher refractive index means lower speed of light (v = c/n). Since n is smaller in A (1.33) than B (1.50), light travels faster in medium A."
  },
  {
    id: 6,
    question: "The power of a thin convex lens of focal length 25 cm is:",
    options: ["-4 D", "+4 D", "+0.25 D", "-0.25 D"],
    correctAnswer: 1,
    explanation: "Power P = 1 / f(m). f = 25 cm = 0.25 m. P = 1 / 0.25 = +4 D."
  },
  {
    id: 7,
    question: "When a ray of light passes from glass into air, how does its speed change and which way does it bend?",
    options: [
      "Launches faster, bends toward normal",
      "Slows down, bends away from normal",
      "Launches faster, bends away from normal",
      "Slows down, bends toward normal"
    ],
    correctAnswer: 2,
    explanation: "Air is optically rarer than glass. As light transitions from a denser (glass) to a rarer (air) medium, its speed increases and it bends away from the normal."
  },
  {
    id: 8,
    question: "What is the reason behind the twinkling of stars?",
    options: [
      "Star light absorption by clouds",
      "Atmospheric refraction of star light due to shifting temperature layers",
      "Fluctuations in starlight emission",
      "Total internal reflection inside high vapor bands"
    ],
    correctAnswer: 1,
    explanation: "Shifting temperatures vary atmospheric density and refractive index, which constantly changes the path of starlight, making it appear to twinkle."
  },
  {
    id: 9,
    question: "In which part of the human eye is pupil size regulated dynamically?",
    options: ["Sclera", "Iris", "Choroid", "Cornea"],
    correctAnswer: 1,
    explanation: "The iris is a colored muscular sheet that controls pupil size to regulate light entry."
  },
  {
    id: 10,
    question: "What occurs to a ray of light when it passes obliquely through the optical center of any thin lens?",
    options: [
      "It refracts at a sharp 90° angle",
      "It bounces straight back",
      "It passes straight through without any deviation",
      "It splits into VIBGYOR colors"
    ],
    correctAnswer: 2,
    explanation: "Rays passing through the optical center (O) of a thin lens suffer no deviation and emerge straight."
  },
  {
    id: 11,
    question: "Which of the following optical phenomena is responsible for the formation of a rainbow?",
    options: [
      "Reflection and Absorption only",
      "Refraction, Dispersion, and Internal Reflection",
      "Scattering of light by dust",
      "Diffuse reflectiveness of clouds"
    ],
    correctAnswer: 1,
    explanation: "Raindrops act as prisms, refracting, dispersing, and internally reflecting sunlight to create a rainbow."
  },
  {
    id: 12,
    question: "By how much does the focal length of a glass convex lens change when it is immersed in a liquid of refractive index equal to that of glass?",
    options: ["It becomes half", "It becomes double", "It becomes infinite", "It stays completely unchanged"],
    correctAnswer: 2,
    explanation: "If the refractive index of the liquid matches the lens glass, light does not bend at the interface. Power becomes 0, and focal length becomes infinite."
  },
  {
    id: 13,
    question: "For a real object, which of the following devices can form a magnified virtual image?",
    options: ["Convex lens only", "Concave mirror only", "Both convex lens and concave mirror", "Concave lens"],
    correctAnswer: 2,
    explanation: "Both convex lenses (when u < f) and concave mirrors (when u < f) can form virtual, erect, and magnified images."
  },
  {
    id: 14,
    question: "At what point in front of a convex lens should an object be placed to form a real image of identical size at 2F on the other side?",
    options: ["At Focus (F)", "At twice the focal length (2F)", "Between F and Optical Center", "At infinity"],
    correctAnswer: 1,
    explanation: "Placing an object at 2F in front of a convex lens forms a real, inverted image of identical size at 2F on the opposite side."
  },
  {
    id: 15,
    question: "Which color component of white sunlight undergoes maximum deviation when refracted through a glass prism?",
    options: ["Red", "Green", "Yellow", "Violet"],
    correctAnswer: 3,
    explanation: "Violet light has the shortest wavelength and travels slowest in glass, so it refracts and bends the most."
  },
  {
    id: 16,
    question: "What is the unit of power of a lens?",
    options: ["Meter", "Dioptre", "Watt", "Pascal"],
    correctAnswer: 1,
    explanation: "The SI unit of lens power is the Dioptre (D), which is the reciprocal of focal length in meters (1 D = 1 m⁻¹)."
  },
  {
    id: 17,
    question: "A person cannot see distant objects clearly. His vision defect is named ____________ and is corrected by a ____________ lens.",
    options: [
      "Hypermetropia, convex",
      "Myopia, concave",
      "Presbyopia, cylindrical",
      "Astigmatism, bifocal"
    ],
    correctAnswer: 1,
    explanation: "Myopia (nearsightedness) causes difficulty seeing far objects, which is corrected using a concave (diverging) lens."
  },
  {
    id: 18,
    question: "What causes the blue color of a clear sky on a dry morning?",
    options: [
      "Refraction from ozone",
      "Rayleigh scattering of blue light by atmospheric gas molecules",
      "Reflection of the ocean",
      "Absorption of red waves by ocean vapor"
    ],
    correctAnswer: 1,
    explanation: "Gas molecules scatter shorter blue wavelengths of sunlight more than other colors, coloring the sky blue."
  },
  {
    id: 19,
    question: "A virtual image formed by a concave mirror is always:",
    options: ["Inverted and diminished", "Erect and diminished", "Erect and magnified", "Inverted and magnified"],
    correctAnswer: 2,
    explanation: "A concave mirror forms a virtual image only when the object is closer than the focal length, producing an erect, magnified image."
  },
  {
    id: 20,
    question: "If the magnification of an optical system is -0.5, what can we conclude about the image?",
    options: [
      "The image is virtual, erect, and magnified",
      "The image is real, inverted, and diminished",
      "The image is real, inverted, and magnified",
      "The image is virtual, erect, and diminished"
    ],
    correctAnswer: 1,
    explanation: "A negative sign indicates a real and inverted image. A value of 0.5 (< 1.0) indicates a diminished image."
  },
  {
    id: 21,
    question: "What is the focal length of a flat, standard plane mirror?",
    options: ["Zero", "25 cm", "Infinite", "15 cm"],
    correctAnswer: 2,
    explanation: "A plane mirror has no curvature, which means its radius of curvature is infinite. Consequently, its focal length is also infinite (f = R/2 = infinite)."
  },
  {
    id: 22,
    question: "Why does a straight pencil dipped in a glass of water appear bent at the water's surface?",
    options: ["Due to diffuse reflection", "Due to light scattering", "Due to refraction at the air-water boundary", "Due to total internal reflection"],
    correctAnswer: 2,
    explanation: "Light travels slower in water than in air. When light rays travel from water into air, they bend away from the normal (refraction), making the pencil appear bent."
  },
  {
    id: 23,
    question: "A lens has a power of -2.0 D. What is its focal length and what type of lens is it?",
    options: ["-50 cm, concave lens", "+50 cm, convex lens", "-20 cm, concave lens", "+20 cm, convex lens"],
    correctAnswer: 0,
    explanation: "Power P = 1/f (in meters). So f = 1/P = 1/(-2.0) = -0.5 m = -50 cm. A negative focal length specifies a concave (diverging) lens."
  },
  {
    id: 24,
    question: "What is the mathematical relationship between the focal length (f) and the radius of curvature (R) of a spherical mirror?",
    options: ["f = 2 * R", "f = R / 2", "f = R", "f = R / 3"],
    correctAnswer: 1,
    explanation: "For spherical mirrors of small aperture, the focus lies exactly halfway between the pole and the center of curvature, giving f = R/2."
  },
  {
    id: 25,
    question: "Which of the following optical phenomena is primarily responsible for the twinkling of stars in the night sky?",
    options: ["Total Internal Reflection", "Refraction of light by different layers of the atmosphere", "Rayleigh scattering", "Dispersion of light"],
    correctAnswer: 1,
    explanation: "Twinkling (scintillation) is caused by atmospheric refraction. Light from a star passes through different layers of air with differing densities/temperatures, bending the rays continuously as they reach our eyes."
  }
];

// 2. ASSERTION & REASON (20 Questions)
export const CLASS10_ASSERTIONS: AssertionReasonQuestion[] = [
  {
    id: 1,
    assertion: "A concave lens always forms a virtual, erect, and diminished image of a real object.",
    reason: "A concave lens is a diverging lens which diverges light rays away from its principal axis.",
    correctOption: "A",
    explanation: "Both statements are true. Because a concave lens diverges light, refracted rays can only meet when projected backward, forming a virtual, erect, and diminished image."
  },
  {
    id: 2,
    assertion: "The refractive index of glass with respect to water is less than 1.",
    reason: "The speed of light in water is less than the speed of light in glass.",
    correctOption: "D",
    explanation: "Glass is denser than water, so its refractive index relative to water is greater than 1, and the speed of light in water is faster than in glass. Both statements are false."
  },
  {
    id: 3,
    assertion: "A convex mirror is preferred as a rearview mirror in vehicles.",
    reason: "Convex mirrors produce erect, diminished images and have a wide field of view.",
    correctOption: "A",
    explanation: "Both statements are true and the reason explains why convex mirrors are used for rearview visibility."
  },
  {
    id: 4,
    assertion: "The power of a lens is positive if it is concave.",
    reason: "The power of a lens is the reciprocal of its focal length in meters.",
    correctOption: "D",
    explanation: "The assertion is false (concave lens power is negative) but the reason is true (P = 1/f), making Option D correct."
  },
  {
    id: 5,
    assertion: "Sunlight splits into seven constituent colors when refracted through a glass prism.",
    reason: "Different colors of light travel at different speeds in glass, resulting in different angles of deviation.",
    correctOption: "A",
    explanation: "Both are true. Dispersion occurs because the glass's refractive index varies with the wavelength of light."
  },
  {
    id: 6,
    assertion: "A person with myopia cannot see nearby objects clearly.",
    reason: "Myopia is corrected using a concave lens.",
    correctOption: "D",
    explanation: "Myopia is nearsightedness, so nearby objects are seen clearly, making the assertion false, though the reason is true."
  },
  {
    id: 7,
    assertion: "Stars twinkle while planets do not.",
    reason: "Stars are point sources of light located extremely far away, while planets are closer, extended sources.",
    correctOption: "A",
    explanation: "Both are true and the physical difference in size/distance explains why star shifts cause noticeable twinkling while planet shifts average out."
  },
  {
    id: 8,
    assertion: "When a ray of light travels from air to water, it bends away from the normal.",
    reason: "Water is an optically rarer medium compared to air.",
    correctOption: "D",
    explanation: "Water is optically denser than air. Light slows down and bends toward the normal, making both statements false."
  },
  {
    id: 9,
    assertion: "The optical center of a lens is a point on its principal axis through which rays pass without deviation.",
    reason: "Thin lenses suffer negligible lateral shift at their center.",
    correctOption: "A",
    explanation: "Both are true and the minimal lateral shift in thin lenses allows rays to pass through the optical center with no deviation."
  },
  {
    id: 10,
    assertion: "The rainbow is always formed in the direction of the sun.",
    reason: "Raindrops act as miniature prisms, dispersing and internally reflecting sunlight.",
    correctOption: "D",
    explanation: "A rainbow is always formed opposite the sun, making the assertion false, though the reason is true."
  },
  {
    id: 11,
    assertion: "The red color of a stop light travels furthest in fog.",
    reason: "Red light has a longer wavelength and is scattered less by air and dust particles.",
    correctOption: "A",
    explanation: "Both are true. In accordance with Rayleigh scattering, longer wavelengths scatter less, allowing red light to travel furthest through fog."
  },
  {
    id: 12,
    assertion: "A virtual image formed by a concave mirror is always real.",
    reason: "A real image can be caught on a screen.",
    correctOption: "D",
    explanation: "A virtual image can never be real, making the assertion false, though the reason is true."
  },
  {
    id: 13,
    assertion: "As a person gets older, they can develop Presbyopia.",
    reason: "Aging weakens ciliary muscles and reduces the flexibility of the eye lens.",
    correctOption: "A",
    explanation: "Both statements are true and the reason provides the physiological explanation for presbyopia."
  },
  {
    id: 14,
    assertion: "The focal length of a spherical mirror changes when it is immersed in oil.",
    reason: "The focal length of a mirror depends only on its radius of curvature (f = R/2) and is independent of the surrounding medium.",
    correctOption: "D",
    explanation: "The focal length of a mirror is independent of the surrounding medium, making the assertion false, though the reason is true."
  },
  {
    id: 15,
    assertion: "The refractive index of crown glass is greater than that of water.",
    reason: "Crown glass is optically denser than water.",
    correctOption: "A",
    explanation: "Glass is denser than water, meaning its refractive index (1.50) is higher than that of water (1.33)."
  },
  {
    id: 16,
    assertion: "A convex lens is also known as a diverging lens.",
    reason: "A convex lens converges parallel rays of light falling on it.",
    correctOption: "D",
    explanation: "A convex lens is a converging lens, making the assertion false, though the reason is true."
  },
  {
    id: 17,
    assertion: "An object placed at 2F in front of a convex lens forms an image of identical size at 2F on the other side.",
    reason: "The magnification of an object placed at 2F of a convex lens is -1.",
    correctOption: "A",
    explanation: "Both are true. A magnification of -1 indicates a real, inverted image of identical size."
  },
  {
    id: 18,
    assertion: "The Tyndall effect is seen when sunlight passes through a canopy of a forest.",
    reason: "Mist and dust particles scatter sunlight.",
    correctOption: "A",
    explanation: "Both statements are true and the reason explains how particles scatter light to create the Tyndall effect."
  },
  {
    id: 19,
    assertion: "Light travels fastest in a vacuum.",
    reason: "Vacuum represents an empty space with a refractive index of exactly 1.0.",
    correctOption: "A",
    explanation: "Both are true. Without particles to refract or absorb light, light travels at its maximum speed of 3 x 10^8 m/s in a vacuum."
  },
  {
    id: 20,
    assertion: "The image formed by a plane mirror is virtual and erect.",
    reason: "The magnification produced by a plane mirror is +1.",
    correctOption: "A",
    explanation: "Both are true. A magnification of +1 indicates a virtual, erect image of identical size."
  }
];

// 3. VERY SHORT ANSWER QUESTIONS (2 Marks Each - 20 Questions)
export const CLASS10_VERY_SHORT: ShortQuestion[] = [
  {
    id: 1,
    question: "Define power of a lens and state its SI unit.",
    answer: "Power of a lens is the measure of its ability to converge or diverge light, defined as the reciprocal of its focal length in meters (P = 1/f). Its SI unit is the Dioptre (D).",
    keyPoints: ["Reciprocal of focal length in meters", "SI Unit: Dioptre (D)"]
  },
  {
    id: 2,
    question: "State the laws of refraction of light.",
    answer: "1) The incident ray, refracted ray, and normal at the point of incidence lie in the same plane. 2) Snell's law: The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant (sin i / sin r = constant).",
    keyPoints: ["Co-planar rays", "Snell's Law: sin i / sin r = n"]
  },
  {
    id: 3,
    question: "Define the term absolute refractive index of a medium.",
    answer: "The absolute refractive index of a medium (n) is the ratio of the speed of light in a vacuum (c) to the speed of light in that medium (v): n = c / v.",
    keyPoints: ["Ratio of speeds", "n = c / v"]
  },
  {
    id: 4,
    question: "What is Myopia? How is it corrected?",
    answer: "Myopia is nearsightedness, where a person can see nearby objects clearly but distant objects appear blurry. It is corrected using a concave (diverging) lens.",
    keyPoints: ["Nearsightedness", "Corrected with concave lens"]
  },
  {
    id: 5,
    question: "What is Hypermetropia? How is it corrected?",
    answer: "Hypermetropia is farsightedness, where distant objects are seen clearly but near objects appear blurry. It is corrected using a convex (converging) lens.",
    keyPoints: ["Farsightedness", "Corrected with convex lens"]
  },
  {
    id: 6,
    question: "What is Presbyopia? Why does it occur?",
    answer: "Presbyopia is age-related farsightedness, where the eye loses its ability to focus on close objects. It is caused by the aging of ciliary muscles and loss of lens flexibility.",
    keyPoints: ["Age-related farsightedness", "Stiff lens and weak muscles"]
  },
  {
    id: 7,
    question: "Define focal length of a spherical mirror.",
    answer: "The focal length (f) of a spherical mirror is the distance from the pole of the mirror to its principal focus, which is half of its radius of curvature (f = R/2).",
    keyPoints: ["Distance from pole to focus", "f = R/2"]
  },
  {
    id: 8,
    question: "What is the magnification of a plane mirror? What does it signify?",
    answer: "The magnification of a plane mirror is +1. The (+1) signifies that the image is virtual, erect, and of identical size to the object.",
    keyPoints: ["Magnification = +1", "Virtual, erect, same size"]
  },
  {
    id: 9,
    question: "A lens has a power of +2.0 D. Find its focal length.",
    answer: "P = 1/f, so f = 1/P = 1 / +2.0 = +0.5 meters = +50 cm.",
    keyPoints: ["f = 1/P", "f = +50 cm"]
  },
  {
    id: 10,
    question: "State the cause of dispersion of white light passing through a prism.",
    answer: "Dispersion occurs because different colors (wavelengths) of light travel at different speeds in glass, causing them to bend at different angles when entering the prism.",
    keyPoints: ["Wavelength speed variation", "Different angles of refraction"]
  },
  {
    id: 11,
    question: "Why does the sky appear dark to an astronaut in space instead of blue?",
    answer: "In space, there is no atmosphere to scatter light, so sunlight travels without scattering and the sky appears black.",
    keyPoints: ["No atmosphere", "No Rayleigh scattering"]
  },
  {
    id: 12,
    question: "State two applications of convex mirrors.",
    answer: "1. Rearview mirrors in automobiles to provide a wider field of view. 2. Security mirrors in shops and blind corners.",
    keyPoints: ["Automobile rearview", "Security viewing"]
  },
  {
    id: 13,
    question: "State two applications of concave mirrors.",
    answer: "1. Shaving or makeup mirrors to produce virtual, magnified images. 2. Reflectors in car headlights and solar furnaces.",
    keyPoints: ["Magnified shaving mirror", "Headlight reflectors"]
  },
  {
    id: 14,
    question: "What is the focal length of a plane mirror?",
    answer: "The focal length of a plane mirror is infinite (∞) because its surface has no curvature, so and its center of curvature is at infinity.",
    keyPoints: ["Infinite (∞)", "No curvature"]
  },
  {
    id: 15,
    question: "What is lateral displacement in a glass slab?",
    answer: "Lateral displacement is the perpendicular distance between the incident ray and the emergent ray after light passes through a parallel-sided glass slab.",
    keyPoints: ["Perpendicular distance shift", "Incident vs emergent rays"]
  },
  {
    id: 16,
    question: "Define angle of deviation for a prism.",
    answer: "The angle of deviation (δ) is the angle between the original direction of the incident ray and the final direction of the emergent ray after passing through a prism.",
    keyPoints: ["Angle between incident and emergent rays", "Refraction turn"]
  },
  {
    id: 17,
    question: "What is Rayleigh scattering?",
    answer: "Rayleigh scattering is the scattering of light by particles much smaller than its wavelength. The intensity of scattered light is inversely proportional to the fourth power of wavelength (I ∝ 1/λ⁴).",
    keyPoints: ["Gas particles scattering", "I ∝ 1/λ⁴"]
  },
  {
    id: 18,
    question: "Define the term least distance of distinct vision.",
    answer: "The least distance of distinct vision is the minimum distance at which a normal healthy eye can see an object clearly without eye strain, which is 25 cm.",
    keyPoints: ["Near Point of eye", "25 cm"]
  },
  {
    id: 19,
    question: "What is the speed of light in a vacuum?",
    answer: "The speed of light in a vacuum is approximately 3.00 × 10⁸ m/s.",
    keyPoints: ["3.00 × 10⁸ m/s", "Universal speed limit"]
  },
  {
    id: 20,
    question: "Why can't a concave lens form a real image of a real object?",
    answer: "Because a concave lens diverges light rays. Diverging refracted rays cannot intersect in front of the lens; they can only meet when projected backwards, forming a virtual image.",
    keyPoints: ["Diverging nature", "Virtual image only"]
  }
];

// 4. SHORT ANSWER QUESTIONS (3 Marks Each - 20 Questions)
export const CLASS10_SHORT: ShortQuestion[] = [
  {
    id: 1,
    question: "Derive the relation between the focal length (f) and radius of curvature (R) of a spherical mirror.",
    answer: "For a spherical mirror, a ray of light running parallel to the principal axis passes through the focus F after reflecting. Using geometry and the law of reflection (i = r), we find that the triangle formed by the focus, mirror, and center of curvature is isosceles. For small apertures, this simplifies to f = R/2.",
    keyPoints: ["Parallel ray focus path", "Isosceles triangle properties", "f = R/2 for small apertures"]
  },
  {
    id: 2,
    question: "Draw ray diagrams to explain why a convex mirror has a wider field of view than a plane mirror.",
    answer: "A convex mirror curves outward, which diverges light. Light rays from a wider field can hit the mirror and reflect into the driver's eye, displaying a much larger area behind the vehicle than a plane mirror of identical size.",
    keyPoints: ["Curves outwards", "Diverges light rays", "Wider field of view"]
  },
  {
    id: 3,
    question: "An object is placed at a distance of 12 cm in front of a concave mirror of focal length 8 cm. Find the position, nature, and magnification of the image.",
    answer: "Given u = -12 cm, f = -8 cm. 1/v = 1/f - 1/u = -1/8 - (-1/12) = -1/8 + 1/12 = -3/24 + 2/24 = -1/24. So v = -24 cm. Magnification m = -v/u = -(-24)/(-12) = -2. The image is real, inverted, and magnified.",
    keyPoints: ["u = -12, f = -8", "v = -24 cm", "m = -2 (real, inverted)"]
  },
  {
    id: 4,
    question: "Explain the refraction of light through a rectangular glass slab. Show that the emergent ray is parallel to the incident ray.",
    answer: "When light enters the slab, it refracts at the air-glass transition, bending toward the normal. When it exits at the glass-air transition, it refracts by an equal and opposite angle, bending away from the normal, so the emergent ray is parallel to the incident ray.",
    keyPoints: ["Air-to-glass and glass-to-air transitions", "Refractions are equal and opposite", "Emergent ray parallel to incident ray"]
  },
  {
    id: 5,
    question: "Define refractive index. How is the speed of light in a medium related to its refractive index? Calculate light speed in water (n = 1.33).",
    answer: "Refractive index n is the ratio of light speed in a vacuum (c) to its speed in a medium (v). Speed v = c/n. For water: v = (3.00 × 10⁸) / 1.33 = 2.25 × 10⁸ m/s.",
    keyPoints: ["n = c / v", "v = c / n", "v_water = 2.25 × 10⁸ m/s"]
  },
  {
    id: 6,
    question: "What is power of a lens? How is the power of a combination of lenses calculated? Find total power for lenses of +2.0 D and -1.5 D.",
    answer: "Power of a lens is its convergence or divergence ability, P = 1/f(m). The power of a combination of lenses is the algebraic sum of individual powers: P = P1 + P2 + ... For these lenses: P = +2.0 D + (-1.5 D) = +0.5 D.",
    keyPoints: ["Reciprocal of focal length", "Algebraic sum of powers", "Total P = +0.5 D"]
  },
  {
    id: 7,
    question: "Explain Myopia with its symptoms and causes. How is it corrected?",
    answer: "Myopia (nearsightedness) is when nearby objects are seen clearly but far objects appear blurry. It is caused by an elongated eyeball or excessive lens curvature. It is corrected using a concave lens to diverge light before it enters the eye.",
    keyPoints: ["Far vision blur", "Elongated eyeball / curved lens", "Corrected with concave lens"]
  },
  {
    id: 8,
    question: "Explain Hypermetropia with its symptoms and causes. How is it corrected?",
    answer: "Hypermetropia (farsightedness) is when far objects are seen clearly but near objects are blurry. It is caused by a shortened eyeball or flat lens. It is corrected using a convex lens, which converges light to focus exactly on the retina.",
    keyPoints: ["Near vision blur", "Shortened eyeball", "Corrected with convex lens"]
  },
  {
    id: 9,
    question: "What is Presbyopia? How is it different from Hypermetropia? How is it corrected?",
    answer: "Presbyopia is age-related loss of near vision caused by weakening ciliary muscles and decreasing lens flexibility. While Hypermetropia is caused by eyeball size or lens shape, presbyopia is caused by aging. It is corrected using reading glasses or bifocal lenses.",
    keyPoints: ["Age-related Near point loss", "Loss of lens flexibility", "Corrected with convex / bifocals"]
  },
  {
    id: 10,
    question: "Explain dispersion of white light by a glass prism. Label the spectrum colors in order.",
    answer: "When white light enters a prism, different colors travel at different speeds in glass. The speed difference refracts colors at different angles, separating light into VIBGYOR: Violet, Indigo, Blue, Green, Yellow, Orange, Red.",
    keyPoints: ["Refractive index depends on color", "Violet bends most, Red least", "VIBGYOR spectral spread"]
  },
  {
    id: 11,
    question: "Why does the sun appear white at noon but reddish at sunrise and sunset?",
    answer: "At noon, sunlight travels the shortest atmospheric distance, scattering minimal light. At sunrise and sunset, light travels a much longer distance through thick atmosphere. Shorter wavelengths (blue/violet) are scattered away, leaving only red and orange to reach our eyes.",
    keyPoints: ["Short vs long atmospheric path", "Rayleigh scattering", "Shorter wavelengths scattered away"]
  },
  {
    id: 12,
    question: "What is Tyndall Effect? Describe an experiment to demonstrate it.",
    answer: "The Tyndall effect is the scattering of light by colloidal suspension particles. Pass a flashlight beam through clean water (no paths are visible), and then add some milk or soap to the water. The beam's path becomes clearly visible due to scattering by colloidal particles.",
    keyPoints: ["Colloid scattering path", "Water vs soap comparison", "Tyndall pathway visibility"]
  },
  {
    id: 13,
    question: "Explain why planets do not twinkle like stars.",
    answer: "Stars are distant point sources whose light path is easily shifted by atmospheric refraction. Planets are much closer and act as extended sources of light. Refractive shifts in different points of a planet average out, resulting in a steady shine.",
    keyPoints: ["Point sources vs extended sources", "Average shift cancelation", "Steady planet luminosity"]
  },
  {
    id: 14,
    question: "A convex lens of focal length 15 cm forms a real, inverted image at a distance of 30 cm. Find the object distance and magnification.",
    answer: "Given f = +15 cm, v = +30 cm. 1/u = 1/v - 1/f = 1/30 - 1/15 = -1/30. So u = -30 cm. Magnification m = v / u = 30 / -30 = -1. The object is at 2F, and the image is of identical size.",
    keyPoints: ["f = +15, v = +30", "u = -30 cm", "m = -1"]
  },
  {
    id: 15,
    question: "Compare convex and concave lenses with respect to their shape, nature, and types of images they can form.",
    answer: "Convex lenses are thicker in the middle, converge light, and can form both real (inverted) and virtual (erect) magnified images. Concave lenses are thinner in the middle, diverge light, and can only form virtual, erect, and diminished images.",
    keyPoints: ["Converging vs Diverging lens", "Thick center vs Thin center", "Erect/Inverted options vs virtual-diminished only"]
  },
  {
    id: 16,
    question: "Define critical angle and total internal reflection (TIR). Under what conditions does TIR occur?",
    answer: "Critical angle is the angle of incidence in a denser medium that results in a 90° angle of refraction in a rarer medium. Total Internal Reflection occurs when light in a denser medium strikes a rarer medium at an angle greater than the critical angle, reflecting 100% of the light back into the denser medium.",
    keyPoints: ["r = 90° incidence", "u > critical angle", "Denser to rarer direction"]
  },
  {
    id: 17,
    question: "State three rules for drawing ray diagrams for a concave mirror.",
    answer: "1. Rays parallel to principal axis reflect through focus (F). 2. Rays passing through focus F reflect parallel to principal axis. 3. Rays passing through center of curvature C reflect back along their original path.",
    keyPoints: ["Parallel through focus", "Focus through parallel", "C returns along C"]
  },
  {
    id: 18,
    question: "Define optical density. How is it different from mass density? Give an example.",
    answer: "Optical density is a medium's ability to refract light, measured by its refractive index. Mass density is mass per unit volume. Kerosene has a lower mass density than water (it floats), but it has a higher optical density (higher refractive index).",
    keyPoints: ["Refraction capability vs mass/volume", "Kerosene vs water example"]
  },
  {
    id: 19,
    question: "What is meant by accommodation of the eye? How does focal length change for near and distant vision?",
    answer: "Accommodation is the eye's ability to adjust its focal length using ciliary muscles. For distant vision, muscles relax, flattening the lens (increasing focal length). For nearby vision, muscles contract, bulging the lens (decreasing focal length).",
    keyPoints: ["Eye self focus adjustment", "Relaxed flat lens (far)", "Contracted bulged lens (near)"]
  },
  {
    id: 20,
    question: "Explain why we cannot see clear detailed images in a mirror covered in water vapor.",
    answer: "Water vapor droplets settle unevenly on the mirror, forming a rough surface that causes diffuse reflection of light in random directions, blurring the image.",
    keyPoints: ["Moisture condensation", "Microscopic surface curvature", "Diffuse scatter blur"]
  }
];

// 5. LONG ANSWER QUESTIONS (5 Marks Each - 20 Questions)
export const CLASS10_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Discuss the Lens Maker's Formula conceptually. How does refractive index and surface radii affect the focal length of a lens?",
    markingScheme: [
      "Explain thin lens structure (1 mark)",
      "Explain refraction at curved surfaces (1.5 marks)",
      "Lens Maker's Equation: 1/f = (n - 1)(1/R1 - 1/R2) (1.5 marks)",
      "Analyze dependence on surrounding medium (1 mark)"
    ],
    answerParts: [
      { part: "Lens refracting faces", text: "A lens has two refracting surfaces with radii of curvature R1 and R2." },
      { part: "General Equation", text: "The focal length is given by the Lens Maker's Formula: 1/f = (n_lens/n_medium - 1) * (1/R1 - 1/R2)." },
      { part: "Radii dependencies", text: "Larger radii of curvature produce flatter lenses, longer focal lengths, and lower powers." },
      { part: "Medium dependencies", text: "Immersing a glass lens in water decreases its refractive index relative to the surrounding medium, increasing its focal length." }
    ]
  },
  {
    id: 2,
    question: "Explain the image formation by concave mirrors for all six positions of the object. State the position, size, and nature of the image for each.",
    markingScheme: [
      "Describe object at infinity and beyond C (1 mark)",
      "Describe object at C and between C and F (1.5 marks)",
      "Describe object at F (1 mark)",
      "Describe object between F and P (virtual image) (1.5 marks)"
    ],
    answerParts: [
      { part: "Far ranges (Infinity to C)", text: "At infinity: image is formed at focus F; real, inverted, highly diminished. Beyond C: image is formed between C and F; real, inverted, diminished." },
      { part: "Middle ranges (At C and between C and F)", text: "At C: image is formed at C; real, inverted, same size. Between C and F: image is formed beyond C; real, inverted, magnified." },
      { part: "At Focus range (At F)", text: "At F: image is formed at infinity; real, inverted, highly magnified." },
      { part: "In focus range (Between F and Pole)", text: "Between F and P: image is formed behind the mirror; virtual, erect, magnified." }
    ]
  },
  {
    id: 3,
    question: "Compare Myopia, Hypermetropia, and Presbyopia. Discuss their symptoms, causes, structural differences, and lens corrections with equations.",
    markingScheme: [
      "Detail Myopia causes, eye structures, and concave lenses (1.5 marks)",
      "Detail Hypermetropia causes, eye structures, and convex lenses (1.5 marks)",
      "Detail Presbyopia aging, accommodation loss, and bifocals (2 marks)"
    ],
    answerParts: [
      { part: "Myopia structural shift", text: "Myopia (nearsightedness) is when nearby objects are seen clearly but far objects appear blurry. It is caused by an elongated eyeball or highly curved lens, and is corrected using a concave lens." },
      { part: "Hypermetropia structural shift", text: "Hypermetropia (farsightedness) is when far objects are seen clearly but near objects appear blurry. It is caused by a shortened eyeball or flat lens, and is corrected using a convex lens." },
      { part: "Presbyopia age loss", text: "Presbyopia is age-related near point loss caused by weakening ciliary muscles and decreasing lens flexibility. It is corrected using reading glasses or bifocal lenses." }
    ]
  },
  {
    id: 4,
    question: "Describe light dispersion through a glass prism. Explain the refraction process, angle of deviation, and why white light separates into colors.",
    markingScheme: [
      "Explain refraction at two tilted surfaces (1.5 marks)",
      "Define angle of deviation and its relation to prism angle (1.5 marks)",
      "Explain VIBGYOR dispersion using speed deviations (2 marks)"
    ],
    answerParts: [
      { part: "Prism Refraction Geometry", text: "Light entering a prism bends toward the normal at the first face, and away from the normal as it exits the second face." },
      { part: "Deviation properties", text: "The angle of deviation (δ) is the angle between the incident and emergent rays: A + δ = i + e." },
      { part: "Speed and deviation differences", text: "Since refractive index depends on color (wavelength), violet light bends the most (slowest wave speed) and red light bends the least, separating white light into VIBGYOR." }
    ]
  },
  {
    id: 5,
    question: "Derive the mirror formula (1/v + 1/u = 1/f) using geometry and similar triangles for a concave mirror.",
    markingScheme: [
      "Set up geometry with concave mirror object, image, and curvature center (1.5 marks)",
      "Identify similar triangles (1.5 marks)",
      "Apply sign conventions to complete algebraic derivation (2 marks)"
    ],
    answerParts: [
      { part: "Geometric set", text: "Place an object beyond C of a concave mirror. Trace two rays to form similar triangles." },
      { part: "Similar ratios", text: "Triangles A'B'C and ABC are similar, so A'B'/AB = CB'/CB. Triangles A'B'F and MPF are also similar, so A'B'/MP = FB'/FP." },
      { part: "Mirror Formula", text: "Applying Cartesian sign conventions (u = -u, v = -v, f = -f) yields: 1/v + 1/u = 1/f." }
    ]
  },
  {
    id: 6,
    question: "Explain the refraction, critical angle, and total internal reflection of light with a detailed analysis of applications.",
    markingScheme: [
      "Explain refraction physics and index equations (1.5 marks)",
      "Explain critical angle derivation (1.5 marks)",
      "Discuss applications (mirages, optical fibers, diamond sparkling) (2 marks)"
    ],
    answerParts: [
      { part: "Refraction Index", text: "Refraction is the bending of light at medium boundaries, defined by Snell's Law: n1 * sin(i) = n2 * sin(r)." },
      { part: "Critical angle condition", text: "Critical angle (θc) is the angle of incidence in a denser medium that refracts light at 90°: sin(θc) = n_rarer / n_denser." },
      { part: "TIR Applications", text: "Used in optical fibers for high-speed internet, and cause diamonds to sparkle due to multiple internal reflections." }
    ]
  },
  {
    id: 7,
    question: "Discuss the mechanics of human eyes. Explain pupil iris control, ciliary muscle accommodation, and retinal signal processing.",
    markingScheme: [
      "Explain iris pupil brightness balancing (1.5 marks)",
      "Explain ciliary lens accommodation (1.5 marks)",
      "Explain retinal rods/cones and optic nerve signals (2 marks)"
    ],
    answerParts: [
      { part: "Aperture adjustment", text: "The iris adjusts pupil size to regulate light entry, shrinking in bright light and dilating in dim light." },
      { part: "Accommodation mechanics", text: "The ciliary muscles contract to round the lens for near vision and relax to flatten it for distant vision." },
      { part: "Signal pathways", text: "Photoreceptors on the retina convert light into nerve signals, which are transmitted to the brain via the optic nerve." }
    ]
  },
  {
    id: 8,
    question: "Derive the lens formula (1/v - 1/u = 1/f) using thin lens geometry and similar triangles for a convex lens.",
    markingScheme: [
      "Setup thin lens ray paths (1.5 marks)",
      "Identify similar ratios (1.5 marks)",
      "Apply sign conventions to complete lens equation (2 marks)"
    ],
    answerParts: [
      { part: "Structure Setup", text: "Place an object beyond 2F of a convex lens. Trace rays through the optical center O and focus F." },
      { part: "Triangle math ratios", text: "Triangles AB0 and A'B'0 are similar, so A'B'/AB = OB'/OB. Triangles A'B'F and OMF are similar, so A'B'/OM = FB'/OF." },
      { part: "Lens Formula", text: "Applying Cartesian sign conventions (u = -u, v = +v, f = +f) yields: 1/v - 1/u = 1/f." }
    ]
  },
  {
    id: 9,
    question: "What is scattering of light? State Rayleigh's law of scattering. Explain why sky is blue, sun is red at horizon, and clouds are white.",
    markingScheme: [
      "State scattering mechanism and quote Rayleigh's Law (1.5 marks)",
      "Explain blue sky and sunset sunset transitions (1.5 marks)",
      "Explain white clouds using larger Mie particles (2 marks)"
    ],
    answerParts: [
      { part: "Rayleigh's Rayleigh scattering", text: "Scattering is light redirection by tiny particles, proportional to 1/λ⁴." },
      { part: "Atmosphere color transitions", text: "Blue light scatters more than red light, coloring the sky blue. At sunset, light travels a longer atmospheric path, scattering away blue light and leaving only red and orange to reach our eyes." },
      { part: "Cloud white light reflection", text: "Cloud droplets are larger than the wavelength of light, so they scatter all wavelengths equally, making clouds look white." }
    ]
  },
  {
    id: 10,
    question: "Analyze the image formation limits for thin lenses. Explain focal limits, focal plane definitions, and virtual magnified situations.",
    markingScheme: [
      "Identify thin boundaries limits (1.5 marks)",
      "Explain focus and double focus planes (1.5 marks)",
      "Explain virtual erect magnifying glass range (2 marks)"
    ],
    answerParts: [
      { part: "Aperture constraints", text: "Thin lenses have thin center-edge profiles, minimizing spherical aberration." },
      { part: "Plane focal definitions", text: "Light parallel to the principal axis converges onto the focal plane." },
      { part: "Magnifying glass", text: "Placing an object closer than the focal length (u < f) of a convex lens produces a virtual, erect, and magnified image." }
    ]
  },
  {
    id: 11,
    question: "Discuss refracting astronomical telescopes. Show how magnification is calculated, drawing ray pathways from stars to eyes.",
    markingScheme: [
      "Explain objective lens role (1.5 marks)",
      "Explain eyepiece lens role (1.5 marks)",
      "Derive magnification equation: m = -fo / fe (2 marks)"
    ],
    answerParts: [
      { part: "Objective lens role", text: "The large objective lens converges light from remote stars to form a real image." },
      { part: "Eyepiece magnifying lens", text: "The eyepiece lens magnifies this image for comfortable viewing by the eye." },
      { part: "Magnification math", text: "Magnification is m = -f_objective / f_eyepiece, where longer objective focal lengths improve magnifying power." }
    ]
  },
  {
    id: 12,
    question: "State sign conventions used for spherical mirrors and lenses. Calculate critical sign values for concave mirrors and convex lenses.",
    markingScheme: [
      "Cartesian Sign Convention rules (1.5 marks)",
      "Sign assignment for concave and convex mirrors (1.5 marks)",
      "Sign assignment for concave and convex lenses (2 marks)"
    ],
    answerParts: [
      { part: "Cartesian signage rules", text: "1. Distances are measured from the pole/optical center. 2. Distances in the direction of incident light are positive. 3. Heights above the principal axis are positive." },
      { part: "Spherical Mirrors signs", text: "Concave mirrors have negative focal lengths; convex mirrors have positive focal lengths. u is always negative." },
      { part: "Lens signs", text: "Convex lenses have positive focal lengths; concave lenses have negative focal lengths. Real image distances are positive." }
    ]
  },
  {
    id: 13,
    question: "Compare refracting spectacles for Myopia, Hypermetropia, and Astigmatism. Contrast cylindrical, concave, and convex lenses.",
    markingScheme: [
      "Explain Myopia correction with concave lenses (1.5 marks)",
      "Explain Hypermetropia correction with convex lenses (1.5 marks)",
      "Explain Astigmatism correction with cylindrical lenses (2 marks)"
    ],
    answerParts: [
      { part: "Concave lens for Myopia", text: "A concave lens diverges incoming parallel light, moving the virtual image to a nearsighted person's close far point." },
      { part: "Convex lens for Hypermetropia", text: "A convex lens supplies additional converging power, moving the virtual image of near objects to a farsighted person's near point." },
      { part: "Cylindrical lens for Astigmatism", text: "Astigmatism is caused by an uneven cornea. Cylindrical lenses correct varying focal planes to restore uniform focus." }
    ]
  },
  {
    id: 14,
    question: "How does water refractive behavior cause a straight stick to look bent and shallow in a swimming pool? Calculate apparent depth.",
    markingScheme: [
      "Explain bending at water-air boundary (1.5 marks)",
      "Explain back-tracing of diverging rays (1.5 marks)",
      "Express formula: apparent depth = real depth / n (2 marks)"
    ],
    answerParts: [
      { part: "Refraction interface", text: "Light from an underwater stick bends away from the normal as it exits the water into the air." },
      { part: "Virtual lift traces", text: "Tracing these refracted rays backward projects an image of the stick higher than its real position, making it look bent." },
      { part: "Depth Equation", text: "Apparent Depth = Real Depth / n. Since n_water = 1.33, pools look 25% shallower than they actually are." }
    ]
  },
  {
    id: 15,
    question: "Describe an experiment to trace rays of light through a triangular glass prism. Define prism angle, angle of incidence, and deviation.",
    markingScheme: [
      "Experimental board pin setup (1.5 marks)",
      "Traced lines definitions (1.5 marks)",
      "Prism formula representation (2 marks)"
    ],
    answerParts: [
      { part: "Experimental board setup", text: "Secure a paper sheet to a board. Draw the outline of the prism and place pins on the incident path." },
      { part: "Pins trace path", text: "Look through the opposite prism face and align two more pins with the images of the first two." },
      { part: "Prism Equation", text: "A + D = i + e, where A is the prism angle, D is the angle of deviation, i is the incident angle, and e is the emergent angle." }
    ]
  },
  {
    id: 16,
    question: "Explain modern eye lens health and cataract treatments. Explain why artificial convex lenses replace clouded natural lenses.",
    markingScheme: [
      "Explain lens clouding mechanics (1.5 marks)",
      "Explain surgical removal of cloudy lens (1.5 marks)",
      "Explain intraocular lens (IOL) focal correction (2 marks)"
    ],
    answerParts: [
      { part: "Cataract clouding", text: "Aging aggregates proteins on the lens, clouding it and blocking light." },
      { part: "Modern laser phacoemulsification", text: "Phacoemulsification uses ultrasound to break up the cloudy lens, which is then removed by suction." },
      { part: "Intraocular convex lens", text: "An artificial convex lens (IOL) is implanted in place of the natural lens, restoring clear vision." }
    ]
  },
  {
    id: 17,
    question: "Analyze why the transition of light from dense to rare medium can lead to total internal reflection. Calculate glass critical angle.",
    markingScheme: [
      "Derive Snell's law boundary values (1.5 marks)",
      "Define critical angle criteria (1.5 marks)",
      "Derive critical angle of crown glass (n = 1.5) as 41.8° (2 marks)"
    ],
    answerParts: [
      { part: "Refraction interfaces", text: "Light traveling from a denser to a rarer medium bends away from the normal." },
      { part: "Critical limit", text: "Increasing the incident angle reaches a point where the refracted ray travels along the boundary (r = 90°)." },
      { part: "Glass TIR", text: "For glass (n = 1.5): sin(θc) = 1 / 1.5 = 0.67, so the critical angle matches 41.8°." }
    ]
  },
  {
    id: 18,
    question: "Explain optical fibers. Discuss their structure, core, cladding index differences, and how multiple TIR signals are transmitted.",
    markingScheme: [
      "Core and cladding specifications (1.5 marks)",
      "Refractive index difference (n_core > n_cladding) (1.5 marks)",
      "Signal transmission without attenuation (2 marks)"
    ],
    answerParts: [
      { part: "Fiber Structure", text: "An optical fiber consists of a high refractive index glass glass core surrounded by a lower index cladding." },
      { part: "TIR confinement", text: "Light entering the core at an angle greater than the critical angle undergoes continuous total internal reflection, reflecting along the core." },
      { part: "Signal Advantages", text: "TIR prevents escape of light, carrying high-speed data across continents with minimal loss." }
    ]
  },
  {
    id: 19,
    question: "Detail rainbow physics. Compare secondary and primary rainbows. Explain internal reflection differences.",
    markingScheme: [
      "Refraction and dispersion step on entering raindrop (1.5 marks)",
      "Internal reflection step inside drop (1.5 marks)",
      "Primary (one internal reflection) vs Secondary (two internal reflections) rainbows (2 marks)"
    ],
    answerParts: [
      { part: "Raindrop entering refraction", text: "Light entering a raindrop bends and disperses into colors." },
      { part: "Internal reflections", text: "One internal reflection bounces light out at 40° to 42° to produce a primary rainbow." },
      { part: "Secondary rainbows", text: "Two internal reflections produce a secondary rainbow at 50° to 53°, with reversed colors and lower intensity." }
    ]
  },
  {
    id: 20,
    question: "Compare convex lens magnifying glasses with compound microscopes. Discuss objective and eyepiece focal lengths.",
    markingScheme: [
      "Simple convex magnifying glass boundaries (1.5 marks)",
      "Compound microscope two lens set (1.5 marks)",
      "Explanation of high total magnification (2 marks)"
    ],
    answerParts: [
      { part: "Simple magnifying lens", text: "A single convex lens forms a virtual, erect, and magnified image when u < f." },
      { part: "Compound microscope objective lens", text: "A small objective lens of short focal length forms a real, magnified image of a tiny close-up specimen." },
      { part: "Compound eyepiece amplification", text: "The eyepiece lens magnifies this real image further, producing high overall magnification." }
    ]
  }
];

// 6. DETAILED CASE-BASED COMPETENCY QUESTIONS (4 Marks Each - 20 Questions)
export const CLASS10_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "Advik's Spherical Lens Experiment",
    caseDescription: "Advik is experimenting with a convex lens to study image formation. He mounts the lens on a ruler and places a candle at various distances on the principal axis. He notes that when the candle is 30 cm in front of the lens, a clear image of identical size is formed on a paper screen placed at 30 cm on the opposite side of the lens.",
    subQuestions: [
      {
        question: "Based on this experiment, what is the focal length of Advik's convex lens?",
        options: ["30 cm", "15 cm", "10 cm", "60 cm"],
        correctIndex: 1,
        answer: "15 cm",
        explanation: "An image of identical size is formed when u = 2F. Since 2F = 30 cm, the focal length is F = 15 cm."
      },
      {
        question: "If Advik shifts the candle closer to the lens, placing it at 12 cm, what will be the nature of the image formed?",
        options: ["Real and inverted", "Virtual, erect, and magnified", "Real, inverted, and diminished", "No image is formed"],
        correctIndex: 1,
        answer: "Virtual, erect, and magnified",
        explanation: "Placing the candle at 12 cm is closer than the focal length of 15 cm (u < f). The lens acts as a magnifying glass, forming a virtual, erect, and magnified image."
      }
    ]
  },
  {
    id: 2,
    caseTitle: "Astha's Spectacle Prescription",
    caseDescription: "Astha, a 15-year-old student, is unable to read the questions written on the school blackboard from her back bench. However, she can read her science textbook clearly. She visits an eye clinic, and the ophthalmologist tests her eyes and prescribes corrective spectacles.",
    subQuestions: [
      {
        question: "What visual defect is Astha suffering from?",
        options: ["Hypermetropia", "Myopia", "Presbyopia", "Astigmatism"],
        correctIndex: 1,
        answer: "Myopia",
        explanation: "Astha can see near objects clearly but struggles with distant ones, which is nearsightedness (Myopia)."
      },
      {
        question: "What lens type must be used to correct Astha's vision?",
        options: ["Convex lens", "Concave lens", "Cylindrical lens", "Bifocal lens"],
        correctIndex: 1,
        answer: "Concave lens",
        explanation: "Myopia requires a concave (diverging) lens to focus distant light rays on the retina."
      }
    ]
  },
  {
    id: 3,
    caseTitle: "The Sparkling Diamond Optic",
    caseDescription: "Diamonds mined from deep earth look like ordinary dull glass stones. They are cut and polished with flat faces by jewelry engineers. This cutting process maximizes the trapping of light within the diamond, making it sparkle with brilliant colors when lit.",
    subQuestions: [
      {
        question: "What physical optical concept causes the sparkling of polished diamonds?",
        options: ["Diffraction of light", "Total Internal Reflection", "Scattering of light", "Absorption of light"],
        correctIndex: 1,
        answer: "Total Internal Reflection",
        explanation: "Diamonds sparkling is mainly caused by Refraction and Total Internal Reflection of trapped light."
      },
      {
        question: "What is the critical angle for a diamond-air interface (n = 2.42)?",
        options: ["41.8°", "48.6°", "24.4°", "90°"],
        correctIndex: 2,
        answer: "24.4°",
        explanation: "Using sin(θc) = 1/n = 1 / 2.42 = 0.413, we find the critical angle is approximately 24.4°."
      }
    ]
  },
  {
    id: 4,
    caseTitle: "Stellar atmospheric refraction shifts",
    caseDescription: "Amay sets up an astronomical telescope on a dry night to trace stars. He notices that the stars twinkle even on clear nights, but planets like Mars and Jupiter appear as steady disks without twinkling.",
    subQuestions: [
      {
        question: "Stellar twinkling is caused by which of the following optical phenomena?",
        options: ["Periodic changes in stellar light output", "Refraction variations in moving atmospheric gas layers", "Cosmic dust scattering", "Total internal reflection of starlight in clouds"],
        correctIndex: 1,
        answer: "Refraction variations in moving atmospheric gas layers",
        explanation: "Stars twinkle because their light is refracted by moving atmospheric layers of varying densities."
      },
      {
        question: "Why do planets like Mars and Jupiter NOT twinkle in Amay's eyepiece?",
        options: ["Planets emit polarized light", "Planets are closer and act as extended sources whose shifts average out", "Planets are block by ozone", "Planets do not reflect light"],
        correctIndex: 1,
        answer: "Planets are closer and act as extended sources whose shifts average out",
        explanation: "Planets are closer and larger, so refractive shifts average out, resulting in a steady shine."
      }
    ]
  },
  {
    id: 5,
    caseTitle: "Kerosene optical density testing",
    caseDescription: "In a school laboratory, a student is given three beakers filled with water (n = 1.33), kerosene (n = 1.44), and crown glass (n = 1.50). She shoots a yellow laser beam through each beaker and measures the angle of bending.",
    subQuestions: [
      {
        question: "In which medium does the yellow laser light travel slowest?",
        options: ["Water", "Crown Glass", "Kerosene", "Air"],
        correctIndex: 1,
        answer: "Crown Glass",
        explanation: "Speed of light is inversely proportional to refractive index (v = c/n). Glass has the highest index (1.50) and therefore the slowest light speed."
      },
      {
        question: "If light enters from water (n = 1.33) obliquely into kerosene (n = 1.44), which way does it bend?",
        options: ["Bends away from the normal", "Bends toward the normal", "Does not bend", "Bends at 90°"],
        correctIndex: 1,
        answer: "Bends toward the normal",
        explanation: "Kerosene is optically denser than water (1.44 > 1.33), so light slows down and bends toward the normal."
      }
    ]
  },
  {
    id: 6,
    caseTitle: "Rainbow spectrum raindrops",
    caseDescription: "A group of children observes a rainbow in the western sky in the late afternoon. They notice that the sun is behind them, shining on a retreating rain shower in front of them.",
    subQuestions: [
      {
        question: "What physical step splits white sunlight into a rainbow spectrum on entering a raindrop?",
        options: ["Absorption", "Dispersion", "Total scattering", "Polarization"],
        correctIndex: 1,
        answer: "Dispersion",
        explanation: "Dispersion is the splitting of composite white light into its constituent colors (VIBGYOR) due to varying refraction levels."
      },
      {
        question: "How many times does light undergo refraction and internal reflection inside a raindrop to form a primary rainbow?",
        options: [
          "One refraction, one reflection",
          "Two refractions, one internal reflection",
          "Two refractions, two internal reflections",
          "One refraction, two reflections"
        ],
        correctIndex: 1,
        answer: "Two refractions, one internal reflection",
        explanation: "A primary rainbow is formed when light is refracted on entering a raindrop, internally reflected once at the back, and refracted again as it exits."
      }
    ]
  },
  {
    id: 7,
    caseTitle: "The Tyndall colloidal fog lights",
    caseDescription: "During winter, a driver notices that his car's headlights project clear beams through thick fog, making the fog particles visible. He also notices that his fog light uses yellow bulbs instead of blue.",
    subQuestions: [
      {
        question: "The visibility of the headlight path through the fog is caused by which phenomenon?",
        options: ["Atmospheric refraction", "Tyndall Effect (scattering by colloidal particles)", "Dispersion of light", "Laser interference"],
        correctIndex: 1,
        answer: "Tyndall Effect (scattering by colloidal particles)",
        explanation: "The Tyndall effect is the scattering of light by colloidal particles, which makes the path of the beam visible."
      },
      {
        question: "Why does yellow headlight light penetrate fog better than blue light?",
        options: ["Yellow is brighter", "Yellow has a longer wavelength and scatters less in fog", "Yellow is absorbed by water", "Blue is blocked by the windshield"],
        correctIndex: 1,
        answer: "Yellow has a longer wavelength and scatters less in fog",
        explanation: "Yellow light has a longer wavelength and scatters less in fog than blue, improving visibility."
      }
    ]
  },
  {
    id: 8,
    caseTitle: "Double Convex Lens Focal covered paper",
    caseDescription: "A student is asked to cover 50% of a convex lens with black paper to see how it affects image formation. He uses a 10 cm focal length lens and places a candle at 25 cm on its principal axis.",
    subQuestions: [
      {
        question: "Will the covered lens still produce a complete image on the screen?",
        options: ["No, only half of the image will be formed", "Yes, a complete image is formed, but with 50% reduced brightness", "No, the image is turned virtual", "Yes, and the image is doubled in size"],
        correctIndex: 1,
        answer: "Yes, a complete image is formed, but with 50% reduced brightness",
        explanation: "Yes, a complete image is formed because the uncovered half of the lens still refracts light from the entire object, but with reduced brightness due to less light passing through."
      },
      {
        question: "At what distance from the lens should the screen be placed to capture the sharpest image?",
        options: ["10 cm", "16.7 cm", "25 cm", "50 cm"],
        correctIndex: 1,
        answer: "16.7 cm",
        explanation: "Using 1/v = 1/f + 1/u = 1/10 + 1/(-25) = 1/10 - 1/25 = 3/50, we find v = 50/3 = 16.7 cm."
      }
    ]
  },
  {
    id: 9,
    caseTitle: "Prescription of senior readers",
    caseDescription: "A grandfather has perfect distant vision but cannot read small print without holding the newspaper at arm's length. His ophthalmologist prescribes corrective glasses.",
    subQuestions: [
      {
        question: "What eye focus defect is grandfather experiencing?",
        options: ["Myopia", "Presbyopia", "Astigmatism", "Glaucoma"],
        correctIndex: 1,
        answer: "Presbyopia",
        explanation: "Presbyopia is age-related farsightedness, which makes close up focusing difficult."
      },
      {
        question: "What lens type is typically used if he also suffers from Myopia?",
        options: ["Pure concave lenses", "Bifocal lenses (top half concave, bottom half convex)", "Pure cylindrical lenses", "Glass prisms"],
        correctIndex: 1,
        answer: "Bifocal lenses (top half concave, bottom half convex)",
        explanation: "Bifocal lenses contain a concave lens in the top half (for far vision) and a convex lens in the bottom half (for reading), helping people with both myopia and presbyopia."
      }
    ]
  },
  {
    id: 10,
    caseTitle: "Flat parallel Glass Slab lateral shift",
    caseDescription: "In an optics laboratory, a student shines a laser beam at an angle through a thick flat plate of crown glass. She notices that the laser emerges parallel to its original path, but shifted sideways.",
    subQuestions: [
      {
        question: "This sideways shift of the emerging light ray is called:",
        options: ["Angular refraction", "Lateral displacement", "Chromatic deviation", "Total reflection"],
        correctIndex: 1,
        answer: "Lateral displacement",
        explanation: "Lateral displacement is the perpendicular distance between the incident ray and the emergent ray after light passes through a parallel-sided glass slab."
      },
      {
        question: "This sideways shift (lateral displacement) increases when:",
        options: ["Slab thickness decreases", "Slab thickness increases", "Refractive index of slab is 1.0", "Laser is normal to the surface"],
        correctIndex: 1,
        answer: "Slab thickness increases",
        explanation: "Lateral displacement is directly proportional to slab thickness, refractive index, and angle of incidence."
      }
    ]
  },
  {
    id: 11,
    caseTitle: "A Concave Mirror Shaving Reflection",
    caseDescription: "A gentleman uses a concave mirror to shave. He stands close to the mirror, placing his face at a distance of 10 cm, which is less than the mirror's focal length of 30 cm.",
    subQuestions: [
      {
        question: "What is the nature of the image formed in his shaving mirror?",
        options: ["Real, inverted, and magnified", "Virtual, erect, and magnified", "Virtual, erect, and diminished", "Real, inverted, and same size"],
        correctIndex: 1,
        answer: "Virtual, erect, and magnified",
        explanation: "When an object is closer than the focal length of a concave mirror, it forms a virtual, erect, and magnified image."
      },
      {
        question: "If he moves his face back to 40 cm, what will happen to the image?",
        options: ["Image stays virtual and erect", "Image becomes real, inverted, and magnified", "Image disappears completely", "No change occurs"],
        correctIndex: 1,
        answer: "Image becomes real, inverted, and magnified",
        explanation: "At 40 cm (between C and F, since C = 2F = 60 cm and F = 30 cm), the mirror forms a real, inverted, and magnified image."
      }
    ]
  },
  {
    id: 12,
    caseTitle: "Optical Fibers for High-Speed Internet",
    caseDescription: "Telecommunication companies run millions of miles of optical fiber underground. These fibers carry massive volumes of internet data across continents using lasers.",
    subQuestions: [
      {
        question: "What optical concept allows light to travel along a curved fiber without escaping?",
        options: ["Atmospheric refraction", "Total Internal Reflection", "Rayleigh scattering", "Bilateral inversion"],
        correctIndex: 1,
        answer: "Total Internal Reflection",
        explanation: "Optical fibers confine light within their core using Total Internal Reflection at the core-cladding boundary."
      },
      {
        question: "For Total Internal Reflection to occur, the refractive indices must satisfy:",
        options: [
          "n_core = n_cladding",
          "n_core > n_cladding",
          "n_core < n_cladding",
          "n_cladding = 1.0"
        ],
        correctIndex: 1,
        answer: "n_core > n_cladding",
        explanation: "Yes, the core must be optically denser than the cladding (n_core > n_cladding) for total internal reflection to occur."
      }
    ]
  },
  {
    id: 13,
    caseTitle: "Prism refract angle measurement",
    caseDescription: "In an optics lab, a student is refracting a light ray through an equilateral glass prism (prism angle A = 60°). He measures the angle of incidence as 48° and the angle of emergence as 44°.",
    subQuestions: [
      {
        question: "Using the prism equation, calculate the angle of deviation (D) for this refraction.",
        options: ["32°", "42°", "52°", "60°"],
        correctIndex: 0,
        answer: "32°",
        explanation: "Using A + D = i + e: 60° + D = 48° + 44° = 92°. So, D = 92° - 60° = 32°."
      },
      {
        question: "If the prism is replaced with one of higher refractive index, how does the angle of deviation change?",
        options: ["It decreases", "It increases", "It stays the same", "It drops to zero"],
        correctIndex: 1,
        answer: "It increases",
        explanation: "Higher refractive index bends light more, increasing the angle of deviation."
      }
    ]
  },
  {
    id: 14,
    caseTitle: "Tyndall laser suspension scattered",
    caseDescription: "A teacher shines a green laser beam in a dark classroom. It passes through two beakers, one containing water and sugar, and the other containing water and starch.",
    subQuestions: [
      {
        question: "In which beaker will the laser beam's path be clearly visible?",
        options: ["Beaker with sugar water", "Beaker with starch water", "Visible in both beakers", "Neither beaker"],
        correctIndex: 1,
        answer: "Beaker with starch water",
        explanation: "Starch forms a colloidal suspension whose particles scatter light, making the beam's path visible (Tyndall effect). Sugar forms a true solution with particles too small to scatter light."
      },
      {
        question: "What is this light scattering optical effect called?",
        options: ["Rayleigh dispersion", "Tyndall Effect", "Brewster shift", "Snell refraction"],
        correctIndex: 1,
        answer: "Tyndall Effect",
        explanation: "The Tyndall effect is the scattering of a light beam by colloidal particles, which makes its path visible."
      }
    ]
  },
  {
    id: 15,
    caseTitle: "Headlight parabolic silvered Mirrors",
    caseDescription: "A car designer is selecting reflectors for vehicle headlights. The goal is to project a strong, parallel beam of light far down the road.",
    subQuestions: [
      {
        question: "What mirror should be used, and where should the bulb be placed?",
        options: [
          "Convex mirror, bulb at focus",
          "Concave mirror, bulb at focus",
          "Plane mirror, bulb at 25 cm",
          "Concave mirror, bulb at center of curvature"
        ],
        correctIndex: 1,
        answer: "Concave mirror, bulb at focus",
        explanation: "Placing the bulb at the focus (F) of a concave mirror reflects diverging light rays into a strong, parallel beam."
      },
      {
        question: "If the bulb is placed at the center of curvature (C), where will the reflected rays meet?",
        options: ["At focus", "At infinity", "At center of curvature C", "Behind the mirror"],
        correctIndex: 2,
        answer: "At center of curvature C",
        explanation: "Rays from an object at the center of curvature (C) represent are reflected back through C."
      }
    ]
  },
  {
    id: 16,
    caseTitle: "A Convex Lens virtual magnifying",
    caseDescription: "A botanist uses a convex lens of focal length 5 cm to inspect plant pollen. She holds the lens close to her eye and places the leaf at 4 cm from the lens.",
    subQuestions: [
      {
        question: "Calculate the image distance (v) for this leaf position.",
        options: ["-20 cm", "+20 cm", "-10 cm", "+5 cm"],
        correctIndex: 0,
        answer: "-20 cm",
        explanation: "Using 1/v = 1/f + 1/u: 1/f = 1/5, 1/u = -1/4. 1/v = 1/5 - 1/4 = -1/20. So, v = -20 cm."
      },
      {
        question: "What is the magnification (m) of this image?",
        options: ["-5", "+5", "-4", "+4"],
        correctIndex: 1,
        answer: "+5",
        explanation: "Using m = v / u = -20 / -4 = +5. The positive sign indicates a virtual, erect, and magnified image."
      }
    ]
  },
  {
    id: 17,
    caseTitle: "Sky scattering Rayleigh limits",
    caseDescription: "A geography student is researching light scattering in Earth's atmosphere. He models scattering intensity using wavelengths of blue light (450 nm) and red light (650 nm).",
    subQuestions: [
      {
        question: "Which of the following describes the scattering of blue light compared to red light?",
        options: ["Blue light scatters less than red light", "Blue light scatters approximately 4 to 5 times more than red light", "Both scatter equally", "Red light scatters infinite times more"],
        correctIndex: 1,
        answer: "Blue light scatters approximately 4 to 5 times more than red light",
        explanation: "By Rayleigh scattering, scattering intensity is inversely proportional to the fourth power of wavelength: (650/450)⁴ ≈ 4.3. Blue light scatters around 4.3 times more than red."
      },
      {
        question: "Which atmospheric particles are primarily responsible for the blue color of the sky?",
        options: ["Rain droplets", "Oxygen and nitrogen gas molecules", "Ash particles", "Ozone molecules"],
        correctIndex: 1,
        answer: "Oxygen and nitrogen gas molecules",
        explanation: "Oxygen and nitrogen gas molecules are smaller than the wavelength of light, causing Rayleigh scattering that colors the sky blue."
      }
    ]
  },
  {
    id: 18,
    caseTitle: "Bifocals and ciliary accommodation",
    caseDescription: "A senior school teacher uses spectacles with bifocal lenses. The upper half of the lenses are concave, and the lower half has convex segments.",
    subQuestions: [
      {
        question: "Why does the teacher need bifocal lenses?",
        options: [
          "To correct Myopia and Astigmatism",
          "To correct Myopia and Presbyopia (difficulty seeing both near and far)",
          "To block UV blue rays",
          "Because of a cataract condition"
        ],
        correctIndex: 1,
        answer: "To correct Myopia and Presbyopia (difficulty seeing both near and far)",
        explanation: "Bifocal lenses help people with both myopia (corrected by the upper concave portion) and presbyopia (corrected by the lower convex portion)."
      },
      {
        question: "What is the primary cause of Presbyopia in senior individuals?",
        options: [
          "Elongation of the eyeball",
          "Aging and stiffening of the eye lens and ciliary muscles",
          "Detachment of retina",
          "Clouding of cornea"
        ],
        correctIndex: 1,
        answer: "Aging and stiffening of the eye lens and ciliary muscles",
        explanation: "Yes, presbyopia is caused by the aging and stiffening of the eye's lens and muscles, reducing its accommodation ability."
      }
    ]
  },
  {
    id: 19,
    caseTitle: "Double Lens combination equations",
    caseDescription: "An optician combines a converging lens of focal length 20 cm and a diverging lens of focal length 50 cm to create a compound lens system.",
    subQuestions: [
      {
        question: "Calculate the total combined power (P) of this lens system.",
        options: ["+3.0 D", "+7.0 D", "-3.0 D", "+2.5 D"],
        correctIndex: 0,
        answer: "+3.0 D",
        explanation: "P1 = 1 / +0.20 = +5.0 D. P2 = 1 / -0.50 = -2.0 D. P_total = P1 + P2 = +5.0 D - 2.0 D = +3.0 D."
      },
      {
        question: "What is the equivalent focal length (f) of this compound lens system, and does it act as converging or diverging?",
        options: ["+33.3 cm, converging", "-33.3 cm, diverging", "+70 cm, converging", "-70 cm, diverging"],
        correctIndex: 0,
        answer: "+33.3 cm, converging",
        explanation: "F = 1 / P = 1 / +3.0 = +0.333 meters = +33.3 cm. Since the focal length is positive, the system is converging."
      }
    ]
  },
  {
    id: 20,
    caseTitle: "The critical angle of Crown Glass interface",
    caseDescription: "In an optics lab, a laser beam is shone through a semi-circular crown glass block (n = 1.50) into the air (n = 1.00). The student slowly increases the angle of incidence.",
    subQuestions: [
      {
        question: "At what angle of incidence will the laser ray emerge along the glass surface (r = 90°)?",
        options: ["30°", "41.8°", "48.6°", "90°"],
        correctIndex: 1,
        answer: "41.8°",
        explanation: "Using sin(θc) = 1/n = 1 / 1.50 = 0.67, we find the critical angle (θc) is approximately 41.8°."
      },
      {
        question: "What will occur if the angle of incidence is increased to 45°?",
        options: [
          "The ray will refract normally and escape into the air",
          "The ray is 100% reflected back into the glass (Total Internal Reflection)",
          "The ray turns green",
          "The laser shuts off"
        ],
        correctIndex: 1,
        answer: "The ray is 100% reflected back into the glass (Total Internal Reflection)",
        explanation: "Since 45° is greater than the critical angle of 41.8°, the light undergoes Total Internal Reflection, reflecting back into the glass."
      }
    ]
  }
];

// 7. SELF-ASSESSMENT STUDYSET FOR CLASS 10 (25 MCQ Questions)
export const CLASS10_SELF_ASSESSMENT: QuizQuestion[] = [
  {
    id: 1,
    question: "An object is placed at a distance of 15 cm in front of a concave mirror of focal length 10 cm. Where is the image formed?",
    options: ["At 30 cm in front of the mirror", "At 30 cm behind the mirror", "At 6 cm in front of the mirror", "At 15 cm behind the mirror"],
    correctAnswer: 0,
    explanation: "Using 1/v = 1/f - 1/u = 1/(-10) - 1/(-15) = -1/10 + 1/15 = -1/30. So v = -30 cm (30 cm in front of the mirror)."
  },
  {
    id: 2,
    question: "What is the refractive index of glass relative to water, if refractive indices of glass and water are 1.50 and 1.33 respectively?",
    options: ["1.13", "0.89", "2.00", "1.50"],
    correctAnswer: 0,
    explanation: "n_glass_water = n_glass / n_water = 1.50 / 1.33 ≈ 1.13."
  },
  {
    id: 3,
    question: "What is the focal length of a thin convex lens of power +4.0 D?",
    options: ["-25 cm", "+25 cm", "+40 cm", "-40 cm"],
    correctAnswer: 1,
    explanation: "f = 1 / P = 1 / +4.0 = +0.25 m = +25 cm."
  },
  {
    id: 4,
    question: "Which of the following optical defects is corrected using a concave (diverging) lens?",
    options: ["Hypermetropia", "Presbyopia", "Myopia", "Astigmatism"],
    correctAnswer: 2,
    explanation: "Myopia (nearsightedness) is corrected using a concave lens to diverge light before it enters the eye."
  },
  {
    id: 5,
    question: "At sunset, why does the sun appear red or reddish-orange?",
    options: [
      "Because red light is absorbed by the atmosphere",
      "Because shorter wavelengths (blue) are scattered away over the long atmospheric path",
      "Because the sun cools down in the evening",
      "Due to dust reflecting red light"
    ],
    correctAnswer: 1,
    explanation: "At sunset, sunlight travels a long atmospheric path, scattering away blue light and leaving only red and orange to reach our eyes."
  },
  {
    id: 6,
    question: "What is the speed of light in crown glass, if its refractive index is 1.50?",
    options: ["3 x 10^8 m/s", "2 x 10^8 m/s", "1.5 x 10^8 m/s", "2.25 x 10^8 m/s"],
    correctAnswer: 1,
    explanation: "v = c/n = (3.00 × 10⁸) / 1.50 = 2.00 × 10⁸ m/s."
  },
  {
    id: 7,
    question: "What type of image is formed when an object is placed between the Focus and Pole of a concave mirror?",
    options: ["Real, inverted, and magnified", "Virtual, erect, and magnified", "Virtual, erect, and diminished", "Real, inverted, and diminished"],
    correctAnswer: 1,
    explanation: "Placing an object closer than the focus of a concave mirror produces a virtual, erect, and magnified image behind the mirror."
  },
  {
    id: 8,
    question: "Why do stellar stars twinkle while planets do not?",
    options: [
      "Stars are closer than planets",
      "Stars are point sources whose light path is easily shifted by atmospheric refraction; planets are closer, extended sources whose shifts average out",
      "Planets have atmospheres that block twinkling",
      "Due to solar flares"
    ],
    correctAnswer: 1,
    explanation: "Stars are distant point sources, so atmospheric refraction easily shifts their light. Planets are closer/larger source, so these shifts average out."
  },
  {
    id: 9,
    question: "A student sitting on the last bench cannot read the blackboard clearly but reads her textbook with ease. What defect does she have?",
    options: ["Hypermetropia", "Presbyopia", "Myopia", "Cataract"],
    correctAnswer: 2,
    explanation: "Struggling with distant vision but having clear near vision is nearsightedness (Myopia)."
  },
  {
    id: 10,
    question: "Which cell types in the retina are active in bright light and responsible for color vision?",
    options: ["Rods", "Cones", "Ciliary fibers", "Iris muscles"],
    correctAnswer: 1,
    explanation: "Cone cells are active in bright light and detect color and detail."
  },
  {
    id: 11,
    question: "Calculate the total combined power of a convex lens of +3.0 D and a concave lens of -1.5 D in a system.",
    options: ["+4.5 D", "+1.5 D", "-1.5 D", "+2.0 D"],
    correctAnswer: 1,
    explanation: "P_total = P1 + P2 = +3.0 D - 1.5 D = +1.5 D."
  },
  {
    id: 12,
    question: "What is Tyndall Effect?",
    options: [
      "Splitting of white light by a prism",
      "Scattering of light by colloidal particles, making its path visible",
      "Reflection of light by a mirror",
      "Total reflection under critical angles"
    ],
    correctAnswer: 1,
    explanation: "The Tyndall effect is the scattering of a light beam by colloidal particles, making its path visible."
  },
  {
    id: 13,
    question: "Under what condition will light undergo Total Internal Reflection (TIR)?",
    options: [
      "Light passes from rarer to denser medium with angle of incidence smaller than critical angle",
      "Light passes from denser to rarer medium with angle of incidence greater than critical angle",
      "Light falls normal to a mirror",
      "Light traveling in a vacuum"
    ],
    correctAnswer: 1,
    explanation: "Total internal reflection occurs when light traveling from a denser to a rarer medium strikes the boundary at an angle greater than the critical angle."
  },
  {
    id: 14,
    question: "A concave lens has a focal length of 15 cm. At what distance should an object be placed to form an image at 10 cm from the lens?",
    options: ["-30 cm", "-15 cm", "-45 cm", "-10 cm"],
    correctAnswer: 0,
    explanation: "Using thin lens equation with f = -15, v = -10: 1/u = 1/v - 1/f = -1/10 + 1/15 = -1/30. So, u = -30 cm."
  },
  {
    id: 15,
    question: "Which of the following describes the behavior of a light ray passing through the optical center of a thin lens?",
    options: ["Deviates by 90°", "Bounces back along its path", "Passes straight through without deviation", "Splits into colors"],
    correctAnswer: 2,
    explanation: "Light rays passing through the optical center of a thin lens suffer no deviation and emerge straight."
  },
  {
    id: 16,
    question: "A convex lens of focal length 12 cm forms a real, inverted image at 24 cm. Where is the object located?",
    options: ["At 12 cm", "At 24 cm", "At 6 cm", "At infinity"],
    correctAnswer: 1,
    explanation: "v = 24 cm with f = 12 cm. Placing an object at 2F (24 cm) forms an image of identical size at 2F on the opposite side."
  },
  {
    id: 17,
    question: "What color of the white light spectrum experiences minimum deviation through a prism?",
    options: ["Violet", "Blue", "Green", "Red"],
    correctAnswer: 3,
    explanation: "Red light has the longest wavelength and travels fastest in glass, so it refracts and bends the least."
  },
  {
    id: 18,
    question: "What is the critical angle for crown glass (n = 1.50) entering air?",
    options: ["30°", "41.8°", "45°", "48.6°"],
    correctAnswer: 1,
    explanation: "sin(θc) = 1/n = 1/1.50 = 0.67, which corresponds to a critical angle of 41.8°."
  },
  {
    id: 19,
    question: "What is lateral displacement?",
    options: [
      "Splitting of light in a prism",
      "Perpendicular shift between incident and emergent rays after passing through a glass slab",
      "Focus shifting of astigmatism",
      "Magnification multiplier"
    ],
    correctAnswer: 1,
    explanation: "Lateral displacement is the perpendicular distance between the incident and emergent rays in a glass slab."
  },
  {
    id: 20,
    question: "Which of the following is correct for the focal length of a spherical mirror when immersed in water?",
    options: ["It becomes half", "It gets doubled", "It stays the same", "It becomes infinite"],
    correctAnswer: 2,
    explanation: "The focal length of a mirror depends only on its radius of curvature (f = R/2) and is independent of the surrounding medium."
  },
  {
    id: 21,
    question: "What is the power of a lens prescription of -2.5 D? What does it indicate?",
    options: [
      "Focal length is -40 cm, diverging (concave)",
      "Focal length is +40 cm, converging (convex)",
      "Focal length is -25 cm, diverging",
      "Focal length is -10 cm, converging"
    ],
    correctAnswer: 0,
    explanation: "f = 1 / P = 1 / -2.5 = -0.4 m = -40 cm. The negative focal length indicates a diverging (concave) lens."
  },
  {
    id: 22,
    question: "What biological muscle tissue dynamically controls the power of accommodation of our eye lenses?",
    options: ["Iris circular muscle", "Ciliary muscles", "Retinal receptor layer", "Sclera bands"],
    correctAnswer: 1,
    explanation: "Ciliary muscles contract and relax to adjust the shape and focal length of the eye lens."
  },
  {
    id: 23,
    question: "Which color component of white light scatters most in the atmosphere, coloring the clear sky blue?",
    options: ["Red", "Blue", "Yellow", "Green"],
    correctAnswer: 1,
    explanation: "By Rayleigh scattering, shorter blue wavelengths scatter more in the atmosphere, coloring the sky blue."
  },
  {
    id: 24,
    question: "An object is placed at 5 cm in front of a convex lens of focal length 10 cm. Find the nature of the image formed.",
    options: [
      "Real, inverted, and magnified",
      "Virtual, erect, and magnified",
      "Virtual, erect, and diminished",
      "No image is formed"
    ],
    correctAnswer: 1,
    explanation: "u = -5 cm with f = +10 cm. Placing the object closer than the focus (u < f) forms a virtual, erect, and magnified image."
  },
  {
    id: 25,
    question: "Which of the following parts of the eye acts as the transparent outer window where light is first refracted?",
    options: ["Iris", "Retina", "Pupil", "Cornea"],
    correctAnswer: 3,
    explanation: "The cornea is the outer transparent bulge through which light enters, providing initial refraction."
  }
];
