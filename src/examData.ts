export interface NCERTSolvedQuestion {
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

export interface ShortQuestion {
  id: number;
  question: string;
  answer: string;
  keyPoints: string[];
}

export interface LongQuestion {
  id: number;
  question: string;
  markingScheme: string[];
  answerParts: { part: string; text: string }[];
}

export interface AssertionReasonQuestion {
  id: number;
  assertion: string;
  reason: string;
  correctOption: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface CompetencyQuestion {
  id: number;
  caseTitle: string;
  caseDescription: string;
  subQuestions: {
    question: string;
    options?: string[];
    correctIndex?: number;
    answer: string;
    explanation?: string;
  }[];
}

export const NCERT_SOLVED_QUESTIONS: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Textbook Question 1 (Chapter In-Text)",
    question: "A convex mirror used for rearview on an automobile has a radius of curvature of 3.00 m. If a bus is located at 5.00 m from this mirror, find the position, nature, and size of the image.",
    given: {
      "Radius of Curvature (R)": "+3.00 m",
      "Focal Length (f) = R/2": "+1.50 m (convex mirror)",
      "Object distance (u)": "-5.00 m (placed to the left)"
    },
    formulaUsed: "Mirror Formula: 1/v + 1/u = 1/f  and Magnification m = -v/u",
    derivationSteps: [
      "1. Rewrite mirror formula for image distance: 1/v = 1/f - 1/u",
      "2. Substitute given values: 1/v = 1/(1.50) - 1/(-5.00)",
      "3. Simplify: 1/v = 1/1.50 + 1/5.00 = 2/3 + 1/5",
      "4. Find least common denominator (15): 1/v = 10/15 + 3/15 = 13/15",
      "5. Solve for v: v = 15/13 ≈ +1.15 m",
      "6. Calculate magnification: m = -v/u = - (1.15) / (-5.00) = +0.23"
    ],
    finalAnswer: "The image is formed at a distance of 1.15 m behind the mirror. The nature of the image is virtual and erect, and its size is diminished (0.23 times the original size of the object).",
    conceptualTip: "A positive magnification factor and positive sign of v always indicate that the image is formed behind the mirror, hence it is virtual and erect."
  },
  {
    id: 2,
    questionNumber: "Textbook Question 2 (Chapter In-Text)",
    question: "An object, 4.0 cm in size, is placed at 25.0 cm in front of a concave mirror of focal length 15.0 cm. At what distance from the mirror should a screen be placed in order to obtain a sharp image? Find the nature and size of the image.",
    given: {
      "Object size (h)": "+4.0 cm",
      "Object distance (u)": "-25.0 cm",
      "Focal length (f)": "-15.0 cm (concave mirror)"
    },
    formulaUsed: "1/v + 1/u = 1/f and m = h'/h = -v/u",
    derivationSteps: [
      "1. Find 1/v: 1/v = 1/f - 1/u",
      "2. Substitute: 1/v = 1/(-15) - 1/(-25) = -1/15 + 1/25",
      "3. Solve with LCD (75): 1/v = -5/75 + 3/75 = -2/75",
      "4. Image distance v = -75/2 = -37.5 cm",
      "5. Calculate magnification m = -v/u = -(-37.5) / (-25) = -1.5",
      "6. Find image size h': h' = m * h = -1.5 * 4.0 = -6.0 cm"
    ],
    finalAnswer: "The screen should be placed at 37.5 cm in front of the mirror. The image is real and inverted, and its physical height is -6.0 cm (downward-pointing).",
    conceptualTip: "The negative sign of image distance means the image is real, meaning it can be caught on a physical screen placed in front of the mirror."
  },
  {
    id: 3,
    questionNumber: "Textbook Question 3 (Chapter In-Text)",
    question: "A concave lens has focal length of 15 cm. At what distance should the object from the lens be placed so that it forms an image at 10 cm from the lens? Also, find the magnification produced by the lens.",
    given: {
      "Focal length (f)": "-15 cm (concave lens)",
      "Image distance (v)": "-10 cm (concave lens always forms a virtual image on the same left side)"
    },
    formulaUsed: "Lens Formula: 1/v - 1/u = 1/f and Magnification m = v/u",
    derivationSteps: [
      "1. Rearrange lens formula for 1/u: 1/u = 1/v - 1/f",
      "2. Substitute values: 1/u = 1/(-10) - 1/(-15)",
      "3. Simplify: 1/u = -1/10 + 1/15",
      "4. Solve with LCD (30): 1/u = -3/30 + 2/30 = -1/30",
      "5. Object distance u = -30 cm",
      "6. Calculate magnification: m = v/u = (-10) / (-30) = +1/3 ≈ +0.33"
    ],
    finalAnswer: "The object must be placed at 30 cm in front of the concave lens. Magnification is +0.33 (image is virtual, erect and diminished to 1/3 of object size).",
    conceptualTip: "A concave lens always behaves like a diverging component, yielding positive magnification less than 1 directly in front of the source focus."
  },
  {
    id: 4,
    questionNumber: "Textbook In-Text Study Question 4",
    question: "Define the principal focus of a concave mirror. How does it physically differ from the focus of a convex mirror?",
    given: {
      "Mirror System": "Concave Mirror (Converging type)",
      "Significance": "Primary focus is formed in front of the reflective surface."
    },
    formulaUsed: "Physical convergence criterion: incident parallel rays meet at focal point F.",
    derivationSteps: [
      "1. Parallel rays of light from astronomical distances strike the concave mirror.",
      "2. After reflection, all these rays actually intersect at a single point F on the principal axis.",
      "3. This intersection point in front of the mirror is the real focus.",
      "4. For a convex mirror, parallel rays diverge and appear to meet virtually behind the surface."
    ],
    finalAnswer: "The principal focus of a concave mirror is a real point on the principal axis where all incident light rays parallel to the axis actually converge after reflection. In contrast, a convex mirror has a virtual focus behind it where rays only appear to diverge.",
    conceptualTip: "Because real light rays meet in a concave mirror, the focus is physical and can burn materials if strong sunlight is directed there."
  },
  {
    id: 5,
    questionNumber: "Textbook In-Text Study Question 5",
    question: "The radius of curvature of a spherical mirror is 20 cm. Find its focal length.",
    given: {
      "Radius of Curvature (R)": "20 cm"
    },
    formulaUsed: "Focal length f = R / 2",
    derivationSteps: [
      "1. Identify the relationship between focal length and curvature radius.",
      "2. Substitute the given radius R = 20 cm into the formula.",
      "3. Divide 20 cm by 2: f = 20 / 2 = 10 cm."
    ],
    finalAnswer: "The focal length of the spherical mirror is 10 cm.",
    conceptualTip: "This relation holds true for both concave and convex spherical mirrors, as long as their aperture is small compared to their radius of curvature."
  },
  {
    id: 6,
    questionNumber: "Textbook Exercises, Question 16",
    question: "Find the focal length of a lens of power -2.0 D. What type of lens is this?",
    given: {
      "Power of Lens (P)": "-2.0 D"
    },
    formulaUsed: "Power of a Lens: P = 1 / f (where f is in meters)",
    derivationSteps: [
      "1. Rearrange the power equation to solve for focal length f: f = 1 / P",
      "2. Substitute given power: f = 1 / (-2.0 D) = -0.5 m",
      "3. Convert focal length to centimeters: f = -0.5 x 100 = -50 cm",
      "4. Evaluate lens type based on sign convention: Negative focal length signifies a diverging lens."
    ],
    finalAnswer: "The focal length of the lens is -0.5 m (or -50 cm). Since the focal length is negative, it is a concave (diverging) lens.",
    conceptualTip: "Concave lenses are commonly prescribed to correct myopia (nearsightedness) by shifting the virtual focal point."
  },
  {
    id: 7,
    questionNumber: "Textbook Exercises, Question 17",
    question: "A doctor has prescribed a corrective lens of power +1.5 D. Find the focal length of the lens. Is the prescribed lens diverging or converging?",
    given: {
      "Optical Power (P)": "+1.5 D"
    },
    formulaUsed: "Focal distance f (in meters) = 1 / P",
    derivationSteps: [
      "1. Write the rearranged equation for focal length: f = 1 / P",
      "2. Substitute +1.5 D: f = 1 / 1.5 = 1 / (3/2) = 2/3 m ≈ +0.67 m",
      "3. Convert to centimeters: f ≈ +66.7 cm",
      "4. Determine nature from the positive focal length: Positive denotes a convex, converging lens."
    ],
    finalAnswer: "The focal length of the prescribed lens is +0.67 m (or +66.7 cm). Since the focal length is positive, it is a converging (convex) lens.",
    conceptualTip: "A converging lens refracts incoming parallel rays inwards to correct hypermetropia (farsightedness)."
  },
  {
    id: 8,
    questionNumber: "Textbook In-Text Analytical Question 8",
    question: "The refractive index of glass is 1.50 and that of water is 1.33. Find the relative refractive index of glass with respect to water.",
    given: {
      "Absolute refractive index of glass (n_g)": "1.50",
      "Absolute refractive index of water (n_w)": "1.33 (or 4/3)"
    },
    formulaUsed: "Relative refractive index n_gw = n_g / n_w",
    derivationSteps: [
      "1. Write the formula for refractive index of medium 2 with respect to 1: n₂₁ = n₂ / n₁",
      "2. Substitute medium 2 (glass) and medium 1 (water): n_gw = 1.50 / 1.33",
      "3. Calculate in fractions: n_gw = (3/2) / (4/3) = (3/2) * (3/4) = 9/8 = 1.125"
    ],
    finalAnswer: "The relative refractive index of glass with respect to water is 1.125.",
    conceptualTip: "This represents how much light slows down when transitioning from water into glass, which is less than the slowdown from air (1.50) because water is already dense."
  },
  {
    id: 9,
    questionNumber: "Textbook Summary Question 9",
    question: "State the mirror formula and explain what each symbol denotes. Write down the magnification expression for spherical mirrors.",
    given: {
      "Optical elements": "Spherical mirrors (convex or concave)",
      "Variables": "u (object distance), v (image distance), f (focal length)"
    },
    formulaUsed: "1/v + 1/u = 1/f;  m = -v/u = h'/h",
    derivationSteps: [
      "1. The mirror formula expresses the relationship between distances: 1/v + 1/u = 1/f.",
      "2. Coordinate 'u' is distance from pole to object, 'v' is pole to image, 'f' is pole to principal focus.",
      "3. Spherical mirror magnification is defined as m = Height of image (h') / Height of object (h).",
      "4. This is algebraically equivalent to the negative ratio of image/object distance: m = -v / u."
    ],
    finalAnswer: "The Mirror Formula is 1/v + 1/u = 1/f. Magnification m = h'/h = -v/u. In these formulas, u is the object distance, v is the image distance, f is the focal length, h is the object height, and h' is the image height.",
    conceptualTip: "Adhering strictly to Cartesian sign rules is critical. For instance, u is negative in all real setups."
  },
  {
    id: 10,
    questionNumber: "Textbook Exercises, Question 12",
    question: "An object is placed at a distance of 10 cm from a convex mirror of focal length 15 cm. Find the position and nature of the image.",
    given: {
      "Object distance (u)": "-10 cm",
      "Focal length (f)": "+15 cm (convex mirror)"
    },
    formulaUsed: "1/v + 1/u = 1/f",
    derivationSteps: [
      "1. Rearrange mirror formula for 1/v: 1/v = 1/f - 1/u",
      "2. Substitute given values: 1/v = 1/15 - 1/(-10) = 1/15 + 1/10",
      "3. Common denominator (30): 1/v = 2/30 + 3/30 = 5/30",
      "4. Invert to find v: v = 30 / 5 = +6 cm",
      "5. Calculate magnification: m = -v/u = -(6) / (-10) = +0.6"
    ],
    finalAnswer: "The image is formed at a distance of 6 cm behind the mirror. The nature of the image is virtual, erect, and diminished (0.6 times original size).",
    conceptualTip: "A convex mirror can never produce a real image when a virtual object is not present; its output is always virtual and erect."
  },
  {
    id: 11,
    questionNumber: "Textbook Exercises, Question 13",
    question: "Why do we prefer a convex mirror as a rearview mirror in vehicles?",
    given: {
      "Automobile mirrors": "Convex type",
      "Optical advantages": "Wider field of view and erect images"
    },
    formulaUsed: "Reflection over convex cylindrical curves",
    derivationSteps: [
      "1. Convex mirrors always form virtual, erect, and diminished images of objects.",
      "2. Since the image size is smaller, they enable drivers to fit a massive trailing scene on a small glass surface.",
      "3. Their outward curvature curves light rays inward from a much wider angle."
    ],
    finalAnswer: "We prefer convex mirrors because they always produce an erect, upright image, even though it is physically diminished in size. Because they bulge outwards, they have a much broader global field of view, enabling drivers to view the entire scope of trailing traffic securely.",
    conceptualTip: "The safety warning 'Objects in mirror are closer than they appear' exists because convex reflections diminish targets, tricking our depth perception."
  },
  {
    id: 12,
    questionNumber: "Textbook In-Text Question 14",
    question: "Define 1 dioptre of power of a lens. How does focal length relate to its numerical power value?",
    given: {
      "Unit of Lens Power": "Dioptre (D)",
      "Target definition": "1 Dioptre"
    },
    formulaUsed: "P = 1 / f (where f must be expressed in meters)",
    derivationSteps: [
      "1. Power is the mathematical reciprocal of its focal length in meters.",
      "2. Set focal length f = 1 meter.",
      "3. Solve: P = 1 / 1 m = 1 m⁻¹ = 1 Dioptre."
    ],
    finalAnswer: "One dioptre (1 D) is define as the optical power of a lens whose focal length is exactly 1 meter (1 D = 1 m⁻¹).",
    conceptualTip: "This is a standard unit in ophthalmology. A thick, high-power lens has a very short focal length, whereas a thin, low-power lens has a long focal length."
  },
  {
    id: 13,
    questionNumber: "Textbook Exercises, Question 10",
    question: "Why do stars twinkle, whereas planets do not twinkle in the night sky?",
    given: {
      "Astronomical sources": "Stars (extremely distant point sources) and Planets (close extended discs)",
      "Medium": "Atmosphere with fluctuating temperature and density layers"
    },
    formulaUsed: "Continuous atmospheric refraction of point vs extended targets",
    derivationSteps: [
      "1. Stars are situated extremely far away, making them look like point sources of light.",
      "2. Starlight travels through several atmospheric layers with constantly fluctuating temperatures, density values, and refractive indices.",
      "3. This causes continuous random bending (refraction) of starlight, making the starlight shift position and intensity.",
      "4. This variance is perceived as twinkling by our eyes.",
      "5. Planets are closer and look like wide extended disks of light. The variations from all point areas average out to zero."
    ],
    finalAnswer: "Stars twinkle because they are incredibly far away and act as small single point sources of light. As starlight travels through our constantly moving, uneven atmospheric air layers, it undergoes atmospheric refraction. This continuously bends starlight, causing its apparent position and intense brightness to flicker rapidly. Planets are closer, acting as larger circular extended light sources; their overall light fluctuations cancel each other out, making them shine with a stable, steady glow.",
    conceptualTip: "This is why telescopes like Hubble and James Webb are launched into space. Outside Earth's atmospheric blanket, starlight undergoes zero refraction, so stars never twinkle!"
  },
  {
    id: 14,
    questionNumber: "Textbook Exercises, Question 11",
    question: "Explain why the sun appears reddish early in the morning and at sunset, but looks white at noon.",
    given: {
      "Sun's positions": "Horizon (morning/sunset) and Overhead (noon)",
      "Medium": "Thick atmospheric layers of air molecules and particulate dust"
    },
    formulaUsed: "Rayleigh Scattering Law: Light scattering intensity is inversely proportional to λ⁴",
    derivationSteps: [
      "1. According to Rayleigh's law, blue/violet short waves scatter much more strongly than red long waves.",
      "2. In the morning and evening, the sun is near the horizon. Sunlight must pass through the thickest, longest column of Earth's atmosphere.",
      "3. Most of the blue, violet, and green rays are scattered out of our direct line of sight.",
      "4. The unscattered red, orange, and yellow rays pass through to reach our eyes, creating a deep red glow.",
      "5. At noon, the sun is directly overhead, crossing the shortest path of air. Minimal scattering occurs, leaving the light white."
    ],
    finalAnswer: "The reddish appearance of the sun at sunrise and sunset is caused by Rayleigh scattering of light. Since the sun is near the horizon, sunlight must travel through a much thicker column of atmospheric air. Most of the shorter blue and violet wavelengths are scattered away in all directions by gas molecules. The least-scattered longer wavelengths (reds and oranges) pass straight through to our eyes. At noon, the sun is overhead and travels a short distance through the air, so very little scattering happens, making the sun look white.",
    conceptualTip: "This same Rayleigh scattering of blue waves is what makes our sky look blue during the day when sunlight is scattered laterally across the sky."
  },
  {
    id: 15,
    questionNumber: "Textbook Exercises, Question 14",
    question: "Why is a normal human eye unable to focus clearly on objects placed closer than 25 cm?",
    given: {
      "Biological vision constraint": "Least distance of distinct vision = 25 cm",
      "Biological mechanism": "Accommodation limits of crystalline lens"
    },
    formulaUsed: "P = 1 / f and maximum ciliary muscle flex",
    derivationSteps: [
      "1. To view nearby objects clearly, the ciliary muscles must contract to increase the curvature of the crystalline lens.",
      "2. Contracted ciliary muscles make the lens more curved, thicker, and decrease its focal length (f) to produce crisp focus.",
      "3. However, ciliary muscles cannot contract indefinitely beyond a safe biological limit.",
      "4. The maximum contraction limit allows the lens to focus on objects no closer than 25 cm for a normal healthy eye.",
      "5. If an object is placed closer than 25 cm, the ciliary muscles cannot make the lens thick enough, resulting in a blurry image."
    ],
    finalAnswer: "A normal human eye cannot focus clearly on objects placed closer than 25 cm because the ciliary muscles have a maximum biological contraction limit. To focus on closer objects, the eye lens must become thicker and highly curved to shorten its focal length. At 25 cm (the near point of the eye), the ciliary muscles reach their absolute maximum strain. Placing an object closer than 25 cm requires a shorter focal length than the lens can generate, resulting in a blurry, strained visual perception.",
    conceptualTip: "The distance of 25 cm is known as the Least Distance of Distinct Vision or the Near Point of a normal human eye."
  },
  {
    id: 16,
    questionNumber: "Textbook Exercises, Question 15",
    question: "What happens to the image distance inside the eye when we increase the distance of an object from the eye?",
    given: {
      "Eyeball structure": "Fixed spherical scale (~2.5 cm from lens to retina)",
      "Object coordinates": "Moves farther away (u increases)"
    },
    formulaUsed: "Accommodation adjustment by ciliary muscles",
    derivationSteps: [
      "1. The distance between the crystalline lens and the retina in a healthy eye is a fixed anatomical length.",
      "2. Thus, the image distance (v) must stay completely constant to form a sharp focus on the retina.",
      "3. When object distance increases, the ciliary muscles relax, making the eye lens thinner and less curved.",
      "4. This increases the lens's focal length (f) to keep the focused image strictly on the retina."
    ],
    finalAnswer: "The image distance inside the eye remains absolutely constant. It is anatomically fixed at the distance from the crystalline lens to the retina (about 2.5 cm). To focus objects at different distances, the ciliary muscles adjust the curvature and thickness of the lens, dynamically changing its focal length so that the image is always cast perfectly onto the retina.",
    conceptualTip: "A mechanical camera must physically move its glass lenses forward and backward to focus, while the eye focuses by changing the shape of its single crystalline lens."
  },
  {
    id: 17,
    questionNumber: "Class VIII Light Textbook Exercise Q1",
    question: "Suppose you are in a dark room. Can you see objects in the room? Can you see objects outside the room? Explain.",
    given: {
      "Room light level": "Pitch dark (no source of illumination)",
      "Outside light level": "Illuminated by outside light source"
    },
    formulaUsed: "Reflection mechanism: we see objects when light from them enters our eyes",
    derivationSteps: [
      "1. To see an object, light rays from a source must strike the object and reflect into our eyes.",
      "2. In a dark room, there is no light source. Therefore, no light reflects off the room objects, and we cannot see them.",
      "3. Objects outside the room have light reflecting off them that enters our room and reaches our eyes.",
      "4. Consequently, outside objects are visible while room objects are not."
    ],
    finalAnswer: "We cannot see objects in a dark room because there is no light to reflect from them into our eyes. However, we can see objects outside the room if there is light outside, because that light reflects off those objects and travels into our eyes.",
    conceptualTip: "Light itself is invisible but makes other objects visible to us through reflection.",
    grade: "8th"
  },
  {
    id: 18,
    questionNumber: "Class VIII Light Textbook Exercise Q3",
    question: "State the laws of reflection of light clearly.",
    given: {
      "Reflection parameters": "Incident ray, reflected ray, normal to the mirror, angle of incidence (i), angle of reflection (r)"
    },
    formulaUsed: "First Law: i = r; Second Law: coplanar geometry",
    derivationSteps: [
      "1. Measure the angle between the incident ray and the normal (Angle of Incidence, i).",
      "2. Measure the angle between the reflected ray and the normal (Angle of Reflection, r). Observe that they are always equal.",
      "3. The incident ray, the reflected ray and the normal at the point of incidence all lie in the same physical plane."
    ],
    finalAnswer: "The laws of reflection are: 1) The angle of incidence is always equal to the angle of reflection (∠i = ∠r). 2) The incident ray, the reflected ray, and the normal at the point of incidence all lie in the same plane.",
    conceptualTip: "These laws hold true for all reflecting surfaces including smooth plane mirrors and rough/irregular surfaces.",
    grade: "8th"
  },
  {
    id: 19,
    questionNumber: "Class VIII Light Textbook Exercise Q5",
    question: "An incident ray makes an angle of 30° with the surface of a plane mirror. What is the angle of reflection?",
    given: {
      "Angle with mirror surface": "30°",
      "Normal angle to surface": "90°"
    },
    formulaUsed: "Angle of Incidence (i) = 90° - (angle with mirror surface) & Angle of Reflection (r) = Angle of Incidence (i)",
    derivationSteps: [
      "1. Find angle of incidence relative to the normal: i = 90° - 30° = 60°.",
      "2. Apply the First Law of Reflection: Angle of reflection (r) is equal to the angle of incidence (i).",
      "3. Therefore: r = 60°."
    ],
    finalAnswer: "The angle of reflection is 60°. Since the normal is perpendicular (90°) to the mirror, the angle of incidence is 90° - 30° = 60°. By the law of reflection, the angle of reflection equals the angle of incidence, which is 60°.",
    conceptualTip: "Always measure the angle of incidence and reflection from the normal line, not the mirror surface!",
    grade: "8th"
  }
];

export const SHORT_ANSWER_QUESTIONS: ShortQuestion[] = [
  {
    id: 1,
    question: "Why do we prefer a convex mirror as a rearview mirror in vehicles?",
    answer: "We prefer convex mirrors for rear-view in automobiles because they always give an erect, though diminished, image. Moreover, they have a wider field of view as they are curved outwards. This enables the driver to view a much larger traffic area behind them than would be possible with a plane mirror.",
    keyPoints: ["Erect images", "Diminished size", "Wider field of view", "Curved outwards"]
  },
  {
    id: 2,
    question: "Define the refractive index of a medium in terms of speed of light. What is its unit?",
    answer: "The refractive index of a medium (n) is defined as the ratio of the speed of light in vacuum (c) to the speed of light in that specific medium (v). Mathematically, n = c / v. Since it is a ratio of two identical physical quantities (speeds), it is a dimensionless pure number and has no unit.",
    keyPoints: ["Ratio of speed of light in vacuum to medium", "n = c / v", "No unit / Dimensionless number"]
  },
  {
    id: 3,
    question: "A ray of light traveling in water enters obliquely into glass. Does the light ray bend towards or away from the normal? Why?",
    answer: "The light ray bends towards the normal. This is because glass is optically denser than water (refractive index of glass is ~1.5, while water is ~1.33). When a ray of light transitions from an optically rarer medium to an optically denser medium, its speed decreases, causing it to refract towards the normal line.",
    keyPoints: ["Bends towards normal", "Glass is optically denser than water", "Speed of light decreases in glass"]
  },
  {
    id: 4,
    question: "What is power of a lens? Define its SI unit (Dioptre).",
    answer: "The power of a lens is the measure of the degree of convergence or divergence of light rays falling on it. It is mathematically defined as the reciprocal of its focal length in meters (P = 1/f). The SI unit of power is Dioptre (D). 1 Dioptre is the power of a lens whose focal length is exactly 1 meter.",
    keyPoints: ["Measure of convergence or divergence", "Reciprocal of focal length in meters", "SI unit: Dioptre (D)", "1 D = 1 m⁻¹"]
  },
  {
    id: 5,
    question: "Distinguish between a real image and a virtual image formed by optical systems.",
    answer: "A real image is formed when light rays actually meet and intersect after reflection or refraction; it can be caught on a screen and is always inverted. A virtual image is formed when light rays do not actually intersect but only appear to meet when projected backward; it cannot be caught on a screen and is always erect.",
    keyPoints: ["Actual meeting vs virtual projection", "Screen capture capability", "Real is inverted; virtual is erect"]
  },
  {
    id: 6,
    question: "How does the focal length of a spherical mirror change when it is completely immersed in water?",
    answer: "The focal length of a spherical mirror remains unchanged when immersed in water. This is because the focal length of a mirror depends only on its radius of curvature (f = R/2), which is a geometry dimension independent of the surrounding medium. This differs from lenses, whose focal length changes when immersed.",
    keyPoints: ["Remains unchanged", "f = R/2 relies solely on geometric radius", "Refractive index of surrounding medium has no effect"]
  },
  {
    id: 7,
    question: "What is meant by the magnification of a spherical mirror? Under what condition is it mathematically negative?",
    answer: "Magnification (m) is the ratio of the height of the image (h') to the height of the object (h), representing how enlarged or reduced the image is. It is negative when the image formed is real and inverted, because the inverted image height is negative in Cartesian coordinate system while object height is positive.",
    keyPoints: ["Ratio of image height to object height", "m = h'/h = -v/u", "Negative for real and inverted images"]
  },
  {
    id: 8,
    question: "What is the relation between the focal length (f) and radius of curvature (R) of a spherical mirror? Does it hold for lenses?",
    answer: "For a spherical mirror, f = R/2. This means focal length is exactly half of the radius. This relation does not hold for lenses. Lens focal length depends not only on the radius of curvature of its two surfaces but also on its refractive index relative to the surrounding medium, as defined by the Lens Maker's Formula.",
    keyPoints: ["f = R/2 for mirrors", "Does not hold for lenses", "Lens focal length is determined by radii and refractive index"]
  },
  {
    id: 9,
    question: "Explain why a pencil partially immersed in water appears bent and raised at the interface.",
    answer: "This is due to the refraction of light. Light rays coming from the immersed portion of the pencil in water (a denser medium) bend away from the normal as they enter the air (a rarer medium). These refracted rays seem to originate from a higher point when traced back, causing the pencil to look bent and shallower.",
    keyPoints: ["Light refraction phenomenon", "Bends away from normal when entering air from water", "Appears elevated/raised"]
  },
  {
    id: 10,
    question: "The absolute refractive index of diamond is 2.42. What is the physical significance of this statement?",
    answer: "It means that the speed of light in a diamond is 2.42 times slower than the speed of light in a vacuum. Mathematically, speed in diamond v = c / 2.42, which is about 1.24 x 10⁸ m/s. It also indicates that diamond is highly optically dense, causing light to bend significantly upon entry, which contributes to its brilliance.",
    keyPoints: ["Light slows by 2.42 times compared to vacuum", "Speed reduction factor", "High optical density and light bending"]
  }
];

export const LONG_ANSWER_QUESTIONS: LongQuestion[] = [
  {
    id: 1,
    question: "State the laws of refraction of light. Write the mathematical relation for Snell's law and explain what each symbol denotes.",
    markingScheme: [
      "1 Mark: Statement of first law (incident ray, refracted ray, normal at same plane)",
      "2 Marks: Statement of second law / Snell's law (ratio of sines is constant)",
      "1 Mark: Correct mathematical representation (sin i / sin r = constant)",
      "1 Mark: Defining terms (angle of incidence 'i', angle of refraction 'r' and relative refractive index)"
    ],
    answerParts: [
      {
        part: "First Law of Refraction",
        text: "The incident ray, the refracted ray, and the normal to the interface of two transparent media at the point of incidence, all lie in the same physical plane."
      },
      {
        part: "Second Law of Refraction (Snell's Law)",
        text: "The ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant for a given pair of media and for light of a given color/wavelength. This is known as Snell's Law."
      },
      {
        part: "Mathematical Representation",
        text: "sin(i) / sin(r) = constant = n₂₁ (where 'i' is the angle of incidence in medium 1, and 'r' is the angle of refraction in medium 2. The constant n₂₁ is called the refractive index of the second medium with respect to the first medium)."
      }
    ]
  },
  {
    id: 2,
    question: "Describe with the help of a ray diagram the path of light through a rectangular glass slab. Show that the emergent ray is parallel to the incident ray but laterally displaced.",
    markingScheme: [
      "2 Marks: Neat labeled diagram of rectangular glass slab refraction",
      "1 Mark: Explaining refraction at air-glass interface and glass-air interface",
      "1 Mark: Proving angles are equal using alternate interior geometric angles",
      "1 Mark: Explaining Lateral Displacement"
    ],
    answerParts: [
      {
        part: "Glass Slab Refraction Setup",
        text: "When light enters a rectangular glass slab obliquely, it refracts at two parallel faces: the air-glass boundary and the glass-air boundary. At the first face, light bends towards the normal as it enters a denser medium. At the second face, light bends away from the normal by an equal angular offset as it re-enters the rarer air."
      },
      {
        part: "Proof of Parallelism",
        text: "Let the angle of incidence be i₁ and angle of refraction be r₁. At the opposite parallel surface of the slab, the interior alternate angle serves as the incident angle: i₂ = r₁. Since boundaries are parallel, applying Snell's law at both faces yields: n_glass * sin(r₁) = n_air * sin(i₁) and n_glass * sin(i₂) = n_air * sin(e) where 'e' is the emergence angle. Since i₂ = r₁, it immediately follows that sin(e) = sin(i₁) and hence, the emergence angle equals the incidence angle (e = i₁)."
      },
      {
        part: "Lateral Displacement",
        text: "The emergent ray is parallel to the incident ray because the extent of bending at the opposite parallel faces of the rectangular glass slab is equal and opposite. However, the path is shifted sideways, a perpendicular distance called lateral displacement, proportional to slab thickness and incidence angle."
      }
    ]
  },
  {
    id: 3,
    question: "Derive and detail the primary cases of image formation by a concave mirror as the object moves from infinity to close proximity.",
    markingScheme: [
      "2 Marks: Explanation of real cases (Infinity, Beyond C, At C)",
      "1.5 Marks: Explanation of intermediate cases (Between C and F, At F)",
      "1.5 Marks: Analysis of the virtual case (Between F and P)"
    ],
    answerParts: [
      {
        part: "Distant Cases (Infinity to C)",
        text: "When the object is at infinity, incoming rays are parallel and converge directly to focus F, creating a tiny, real, inverted point image. As safety approaches C, the image shifts from F to between F and C, remaining real, inverted, and diminished. When placed exactly at Center of Curvature C, the reflected rays converge at C, producing a real, inverted image of the exact same size as the object (magnification m = -1)."
      },
      {
        part: "Intermediate Cases (Between C and F)",
        text: "When moving the object inside C to a spot between C and F, the reflected light converges far outward beyond C, forming a real, inverted, and magnified image. If placed exactly on Focus F, the reflected rays fail to cross because they emerge parallel, forming a highly magnified image theoretically at infinity on the left."
      },
      {
        part: "Close Proximity Case (Within Focus F)",
        text: "When the object is held very close to the mirror, placed between Focus F and Pole P, the rays diverge after striking the surface. This prevents them from meeting on the left. However, tracing them backwards shows they intersect behind the mirror, creating a virtual, erect, and magnified magnifying-glass effect."
      }
    ]
  },
  {
    id: 4,
    question: "Analyze the optical workings of a simple magnifying glass using a convex lens, detailing image characteristics.",
    markingScheme: [
      "2 Marks: Identifying the principal position for magnification",
      "1.5 Marks: Explaining tracing of divergent rays",
      "1.5 Marks: Summarizing properties and limitations"
    ],
    answerParts: [
      {
        part: "Principal Position",
        text: "For a convex lens to act as a magnifying glass, the object must be situated within the primary focal point, between Focus F₁ and the Optical Center O. This ensures that the light rays striking the lens emerge as diverging beams on the opposite side."
      },
      {
        part: "Ray Tracing and Virtual Focus",
        text: "Since the refracting rays on the right diverge, they cannot meet on that side to create a real image. When an observer looks through the lens, their eyes trace these divergent rays back to their apparent point of intersection on the same side. This yields an upright, erect, and enlarged virtual image."
      },
      {
        part: "Key Properties",
        text: "The resulting image is virtual, erect, magnified, and located on the same side as the object. The magnifying power is greatest when the image is formed at the near point of the human eye (usually 25 cm)."
      }
    ]
  },
  {
    id: 5,
    question: "Explain what is meant by refraction of light, its fundamental cause, and derive the relation between index and speed.",
    markingScheme: [
      "1 Mark: Refraction of light definition",
      "2 Marks: Explaining change of speed as the fundamental cause",
      "2 Marks: Deriving relative refractive index ratio"
    ],
    answerParts: [
      {
        part: "Definition of Refraction",
        text: "Refraction is the bending of light rays as they pass obliquely from one transparent medium to another of different optical densities, occurring at the boundary interface."
      },
      {
        part: "Fundamental Cause",
        text: "The cause of refraction is the change in the speed of light as it transitions between media. Light travels fastest in a vaccum (3 x 10⁸ m/s) and slows down in denser media like water or glass. This speed difference forces the wavefront of light to pivot and change direction at the oblique boundary."
      },
      {
        part: "index and Speed Derivation",
        text: "The refractive index of medium 2 with respect to medium 1 (n₂₁) is the ratio of speed of light in medium 1 (v₁) to speed in medium 2 (v₂): n₂₁ = v₁ / v₂. By utilizing absolute index values (n₁ = c/v₁ and n₂ = c/v₂), we find v₁ = c/n₁ and v₂ = c/n₂. Substituting these yields: n₂₁ = (c/n₁) / (c/n₂) = n₂ / n₁. This mathematically proves that relative refractive index corresponds inversely to speed and directly to absolute indices."
      }
    ]
  },
  {
    id: 6,
    question: "Elaborate the rules of the New Cartesian Sign Convention applied to both spherical mirrors and lenses.",
    markingScheme: [
      "1.5 Marks: Explaining the Origin and direction of measurements",
      "2 Marks: Defining signs of distances along/against incident light",
      "1.5 Marks: Vertical offsets above/below principal axis"
    ],
    answerParts: [
      {
        part: "Origin and Direction",
        text: "By convention, the optical center O of a lens or Pole P of a mirror acts as the coordinate origin. The object is always placed on the left side, meaning light travels from left to right."
      },
      {
        part: "Incident Light Axis (Horizontal Rules)",
        text: "Distances measured in the direction of incident light (to the right of origin) are positive (+), while those measured against incident light (to the left) are negative (-). Consequently, object distance u is always negative."
      },
      {
        part: "Vertical Alignments",
        text: "Distances measured perpendicularly above the principal axis (erect orientation) are positive (+), while height measurements downwards below the axis (inverted orientation) are negative (-)."
      }
    ]
  },
  {
    id: 7,
    question: "Discuss optical lens power, cumulative combinations, and calculate the properties of a +20 cm and -50 cm contact system.",
    markingScheme: [
      "2 Marks: Defining power of lens and contact combination sum",
      "1.5 Marks: Calculating individual powers in meter fractions",
      "1.5 Marks: Calculating combined power and net focal length"
    ],
    answerParts: [
      {
        part: "Power of Lenses and Summation",
        text: "Power represents how strongly a lens converges or diverges light. If multiple thin lenses are placed in contact, their combined optical power is the simple algebraic sum of their individual powers: Power_total = P₁ + P₂ + P₃..."
      },
      {
        part: "Individual Calculations",
        text: "For Lens 1 (convex), f₁ = +20 cm = +0.2 m. Power P₁ = 1 / f₁ = 1 / 0.2 = +5 D. For Lens 2 (concave), f₂ = -50 cm = -0.5 m. Power P₂ = 1 / f₂ = 1 / -0.5 = -2 D."
      },
      {
        part: "Combined Performance",
        text: "The net power P_total = P₁ + P₂ = +5 D + (-2 D) = +3 D. The equivalent focal length f_total = 1 / P_total = 1 / 3 m ≈ +33.3 cm. Since the overall power is positive, the combined system acts as a converging lens."
      }
    ]
  },
  {
    id: 8,
    question: "Analyze the image characteristics formed by a convex lens for four distinct object positions, detailing the pathways.",
    markingScheme: [
      "2 Marks: Analysis of 'Beyond 2F₁' and 'At 2F₁'",
      "2 Marks: Analysis of 'Between F₁ and 2F₁' and 'Within Focus'",
      "1 Mark: General trend summary of shifting positions"
    ],
    answerParts: [
      {
        part: "Distant Placements (Beyond 2F₁ to At 2F₁)",
        text: "When an object lies beyond 2F₁, the refracted rays converge between F₂ and 2F₂ on the right, producing a real, inverted, and diminished image. If positioned exactly at 2F₁, the rays focus exactly at 2F₂ on the opposite side, forming a real, inverted image of equal size."
      },
      {
        part: "Intermediate and Close Placements",
        text: "As the object moves between 2F₁ and F₁, the real image shifts further out beyond 2F₂ and becomes magnified. If the object shifts inside the focal point F₁, refractive rays diverge on the right, and tracing back creates a virtual, erect, and magnified image on the object's side."
      },
      {
        part: "Summary Trend",
        text: "As the object moves closer to the lens, the real image moves further away from the lens and increases in size, eventually turning virtual, erect, and magnified when inside the focal length."
      }
    ]
  },
  {
    id: 9,
    question: "Explain the phenomenon of Total Internal Reflection of light, stating its requirements and applications.",
    markingScheme: [
      "1.5 Marks: Physical description and critical angle",
      "1.5 Marks: Dual strict requirements",
      "2 Marks: Practical applications in modern systems"
    ],
    answerParts: [
      {
        part: "Concept and Critical Angle",
        text: "When light travels from an optically denser medium to a rarer medium, it bends away from the normal. As the angle of incidence increases, the angle of refraction also increases until it reaches 90° at a specific angle called the critical angle. Increasing the incidence angle past this limit causes the ray to reflect entirely back into the denser medium."
      },
      {
        part: "Strict Conditions",
        text: "1) Light must travel from an optically denser medium (e.g. glass, water) into an optically rarer medium (e.g. air). 2) The angle of incidence in the denser medium must exceed the critical angle of the media interface."
      },
      {
        part: "Modern Applications",
        text: "TIR is utilized in high-speed optical fibers to transmit internet data across oceans without loss of intensity, in endoscopic medical tools, and in the high light trapping that makes diamonds sparkle."
      }
    ]
  },
  {
    id: 10,
    question: "Set up a complete mathematical comparison of mirror and lens physics, identifying formulas, signs, and orientations.",
    markingScheme: [
      "2 Marks: Defining and contrasting mirror vs lens formulas",
      "2 Marks: Contrasting magnification equations and sign values",
      "1 Mark: Synthesizing real/virtual alignment comparisons"
    ],
    answerParts: [
      {
        part: "Formula Comparison",
        text: "The mirror formula is additive: 1/f = 1/v + 1/u, reflecting that image coordinates and object coordinates relate symmetrically. The lens formula is subtractive: 1/f = 1/v - 1/u, which stems from the refraction transition across focal centers."
      },
      {
        part: "Magnification Contrast",
        text: "Magnification in spherical mirrors is negative: m = -v/u, meaning a real image formed on the same (negative) side has inverted (negative) magnification. In lenses, magnification is positive: m = v/u, as a real image formed on the opposite (positive) side is inverted (negative) because u is negative."
      },
      {
        part: "Real and Virtual Coordinates",
        text: "For mirrors, real images form on the left (negative v) and virtual images behind (positive v). For lenses, real images form on the right where light travels (positive v) and virtual images form on the left (negative v)."
      }
    ]
  }
];

export const ASSERTION_REASON_QUESTIONS: AssertionReasonQuestion[] = [
  {
    id: 1,
    assertion: "A convex lens can form both real and virtual images depending on the position of the object.",
    reason: "A convex lens is a converging lens which bends incoming light rays inwards towards its focal plane.",
    correctOption: "B",
    explanation: "Both Assertion and Reason are true, but Reason is NOT the correct explanation for the assertion. Convex lenses produce virtual erect images specifically when the object is placed between Focus F and Optical Center O. At all other outer distances, the convergence results in real inverted images."
  },
  {
    id: 2,
    assertion: "The power of a concave lens is negative.",
    reason: "A concave lens diverges parallel light rays, and its virtual principal focus lies on the same side as the incident light, making its focal length negative by sign convention.",
    correctOption: "A",
    explanation: "Both Assertion and Reason are true, and the Reason is the correct explanation. Power (P = 1/f) inherits the mathematical sign of the focal length. Since concave lens has virtual negative focal length, its optical power is always negative."
  },
  {
    id: 3,
    assertion: "When a light ray enters glass from air, its frequency changes.",
    reason: "Refractive index of glass is greater than that of air.",
    correctOption: "D",
    explanation: "Assertion is False, but Reason is True. When light passes into a different optical medium, its velocity and wavelength change, but its source frequency remains completely constant!"
  },
  {
    id: 4,
    assertion: "Convex mirrors are preferred as rearview mirrors in cars.",
    reason: "Convex mirrors form real images of distant traffic with high magnification.",
    correctOption: "C",
    explanation: "Assertion is true, but Reason is false. Convex mirrors always form virtual, erect, and diminished images, never real or inverted ones. The diminished size is critical because it grants a wide angle Field of View."
  },
  {
    id: 5,
    assertion: "A plane mirror has infinite focal length and its power is zero.",
    reason: "A flat surface has an infinite radius of curvature, meaning it does not converge or diverge parallel rays.",
    correctOption: "A",
    explanation: "Both Assertion and Reason are true, and the Reason is the correct explanation. Power P = 1/f. Since a plane surface is flat, R = ∞ and f = ∞, which makes Power P = 1/∞ = 0."
  },
  {
    id: 6,
    assertion: "A virtual image cannot be captured on a physical screen.",
    reason: "Rays of light forming a virtual image do not actually meet and intersect but only appear to diverge from a point behind the device.",
    correctOption: "A",
    explanation: "Both Assertion and Reason are true, and the Reason is the correct explanation. Screens can only register actual light energy converging at a point. Virtual images are created by diverged wavefronts that only focus inside our eye lens."
  },
  {
    id: 7,
    assertion: "The focal length of a concave mirror decreases when placed in water.",
    reason: "The refractive index of water is greater than that of air.",
    correctOption: "D",
    explanation: "Assertion is false, but Reason is true. The focal length of a mirror depends only on its geometric radius of curvature (f = R/2) and does not change when placed in water. Lenses, on the other hand, are highly affected by ambient refractive indexes."
  },
  {
    id: 8,
    assertion: "A ray of light traveling along the normal to the surface of a glass slab passes without bending.",
    reason: "For normal incidence, the angle of incidence is 90 degrees.",
    correctOption: "C",
    explanation: "Assertion is true, but Reason is false. A ray traveling normal to the boundary does pass straight without bending because angle of incidence (i) is 0 degrees, not 90 degrees. Snell's law reveals sin(0)/sin(r) = n, so r = 0."
  },
  {
    id: 9,
    assertion: "Dentists use small concave mirrors to see larger images of teeth.",
    reason: "When a target is held between the Focus F and Pole P of a concave mirror, it creates an erect, magnified, and virtual image.",
    correctOption: "A",
    explanation: "Both Assertion and Reason are true, and the Reason is the correct explanation of the dental mirror application. The tooth represents an object situated close to the mirror within its focal plane."
  },
  {
    id: 10,
    assertion: "A convex lens of focal length 10 cm has greater power than one of focal length 25 cm.",
    reason: "Lenses of shorter focal lengths bend incident light rays more steeply, producing tighter convergence.",
    correctOption: "A",
    explanation: "Both Assertion and Reason are true, and the Reason is the correct explanation. Power represents convergence strength and relates inversely to focal length: P = 1 / f. Shorter focal lengths bend light more sharply."
  }
];

export const COMPETENCY_QUESTIONS: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "Dentist's Special Diagnostic Mirrors",
    caseDescription: "Dr. Ananya, a pediatric dentist at Apex Dental Care, uses specialized hand mirrors to examine teeth cavities. During diagnostics, she holds the small mirror very close to the child's tooth. This provides her with a clear, magnified view of the tooth surface without requiring awkward head positions. Young children feel at ease due to the non-invasive check, and Ananya can easily locate microscopic decay on the molars.",
    subQuestions: [
      {
        question: "Which type of mirror is Dr. Ananya utilizing for dental diagnostics?",
        options: [
          "Convex Mirror",
          "Concave Mirror",
          "Plane Mirror",
          "Bifocal Cylinder Mirror"
        ],
        correctIndex: 1,
        answer: "Concave Mirror",
        explanation: "Concave mirrors are capable of forming magnified, virtual and erect images when the object is placed extremely close to the mirror (within its focal length)."
      },
      {
        question: "Where should the tooth be located relative to the mirror's principal points to form a virtual and magnified image?",
        options: [
          "At the Center of Curvature (C)",
          "Between the Center of Curvature (C) and Focus (F)",
          "Between the Pole (P) and Focus (F)",
          "Beyond Center of Curvature (C)"
        ],
        correctIndex: 2,
        answer: "Between the Pole (P) and Focus (F)",
        explanation: "When the object is within the focus focal range, the reflected rays diverge on the left but intersect virtually when traced backwards, forming a clear upright magnified image behind the mirror."
      }
    ]
  },
  {
    id: 2,
    caseTitle: "Solar Energy Furnaces and Parabolic Collectors",
    caseDescription: "In green energy laboratories, major research is being done on solar concentrators. Large concave reflective surfaces are deployed to collect solar radiation. These surfaces focus parallel incident rays of sunlight onto a central black receiver tube containing molten salts. This fluid heats up to 550°C and is pumped to a heat exchanger to produce turbine steam, generating clean electricity for the city grid.",
    subQuestions: [
      {
        question: "Why are solar collectors curved as concave surfaces instead of convex?",
        answer: "Concave surfaces are converging surfaces. They bend all incoming parallel solar rays of light inwards to meet at a single hot focus. Convex surfaces would diverge the light rays, dispersing the solar energy and failing to heat the pipe.",
        explanation: "Convergence concentrates parallel solar energy onto the core node, while divergence scatters it."
      },
      {
        question: "At what position should the central fluid pipe be mounted for optimal thermal performance?",
        options: [
          "At the Pole P",
          "At the Focus of the mirror",
          "At the Center of Curvature",
          "At any random convenient distance"
        ],
        correctIndex: 1,
        answer: "At the Focus of the mirror",
        explanation: "Sunlight rays coming from astronomical distances are parallel to the principal axis and converge perfectly to focus at the mirror's focal plane, maximizing temperatures at that point."
      }
    ]
  },
  {
    id: 3,
    caseTitle: "Lens Combinations in Camera Optic Systems",
    caseDescription: "High-precision photographic cameras and zoom lenses do not utilize a single simple lens. Instead, they feature an assembly of multiple positive and negative lenses grouped together. This is highly critical to eliminate chromatic or spherical aberrations and distortions. This assembly allows photographers to maintain pristine focus, sharpness, and uniform illumination across the entire film frame.",
    subQuestions: [
      {
        question: "What is the net power of a combined lens system containing a convex lens of +4.0 D and a concave lens of -2.5 D in contact?",
        options: [
          "+6.5 D",
          "+1.5 D",
          "-1.5 D",
          "+2.5 D"
        ],
        correctIndex: 1,
        answer: "+1.5 D",
        explanation: "The combined power is the algebraic sum of individual powers: P_net = P₁ + P₂ = +4.0 D + (-2.5 D) = +1.5 D."
      },
      {
        question: "What is the effective focal length of a contact system whose combined power is calculated to be +5.0 D?",
        options: [
          "5 cm",
          "20 cm",
          "50 cm",
          "10 cm"
        ],
        correctIndex: 1,
        answer: "20 cm",
        explanation: "Combined focal length f = 1 / P = 1 / 5.0 m = 0.2 m = 20 cm."
      }
    ]
  },
  {
    id: 4,
    caseTitle: "Highway Safety and Convex Traffic Mirrors",
    caseDescription: "At sharp blind mountain turns, multi-lane parking ramps, and warehouse exit gates, civil engineers install large curved glass mirrors on brackets. These mirrors allow drivers approaching a blind intersect to check around corners. The mirrors are engineered to handle exposure to atmospheric rain, wind, and broad temperatures while maintaining optical clarity.",
    subQuestions: [
      {
        question: "Why do engineers explicitly install convex mirrors here rather than concave or plane mirrors?",
        answer: "Convex mirrors provide upright, erect images and possess a wide field of view due to their outer curve. Plane mirrors provide a narrower field of view, while concave mirrors can create dangerously confusing inverted images of distant vehicles.",
        explanation: "Convex mirrors curve outwards to provide a wide field of view, presenting a small, erect visual of distant vehicles around the bend."
      },
      {
        question: "If a car is approaching a blind turn at 15 meters, the magnification produced by the convex traffic mirror is:",
        options: [
          "Exactly 1.0",
          "Greater than 1.0",
          "Less than 1.0",
          "Negative values"
        ],
        correctIndex: 2,
        answer: "Less than 1.0",
        explanation: "Convex mirrors always produce erect, virtual, and diminished images. Because the image is diminished, the magnification absolute value is always less than 1.0."
      }
    ]
  },
  {
    id: 5,
    caseTitle: "Optical Fibers and High-Speed Broadband Networks",
    caseDescription: "Broadband telecom systems transmit terabytes of internet data across subsea optical cables using laser beams. These light beams are guided down narrow glass fiber cores whose thickness is smaller than a strand of human hair. Despite bending around obstacles, the light suffers practically zero intensity leakage as it propagates over thousands of kilometers.",
    subQuestions: [
      {
        question: "Under what physical optical phenomenon does light stay trapped inside the glass fiber core?",
        options: [
          "Diffuse scattering",
          "Total Internal Reflection",
          "Polarized phase shift",
          "Achromatic dispersion"
        ],
        correctIndex: 1,
        answer: "Total Internal Reflection",
        explanation: "Total internal reflection repeatedly reflects the light ray back into the denser glass fiber core every time it attempts to escape into the lower-density cladding shell."
      },
      {
        question: "What must be the relationship between the light ray's angle of incidence (i) inside the glass fiber, and the critical angle (θ_c) of the cladding interface to remain trapped?",
        options: [
          "i must be less than θ_c",
          "i must be equal to θ_c",
          "i must be greater than θ_c-",
          "i must be greater than θ_c"
        ],
        correctIndex: 3,
        answer: "i must be greater than θ_c",
        explanation: "Total internal reflection can only happen if the light travels from a denser to a rarer medium and the angle of incidence strictly exceeds the critical angle (i > θ_c)."
      }
    ]
  }
];
