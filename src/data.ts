import { DeviceType, NCERTTableRow, QuizQuestion } from "./types";

export const DEV_LIMITS = {
  uMin: -300,
  uMax: -50, // Avoid overlapping with center O
  hMin: 5,
  hMax: 50,
  fMin: 50,
  fMax: 500,
};

// Standard tables for highlighting active states
export const PLANE_MIRROR_TABLE: NCERTTableRow[] = [
  {
    objectPos: "At infinity",
    imagePos: "At infinity behind the mirror (v = ∞)",
    size: "Same size",
    nature: "Virtual and erect",
    rangeMinU: 320,
    rangeMaxU: 99999,
  },
  {
    objectPos: "At a finite distance in front of mirror",
    imagePos: "At equal distance behind mirror (v = -u)",
    size: "Same size (m = +1)",
    nature: "Virtual and erect",
    rangeMinU: 0,
    rangeMaxU: 320,
  }
];

export const CONCAVE_MIRROR_TABLE: NCERTTableRow[] = [
  {
    objectPos: "At infinity",
    imagePos: "At the focus F",
    size: "Highly diminished, point-sized",
    nature: "Real and inverted",
    rangeMinU: 320,
    rangeMaxU: 99999,
  },
  {
    objectPos: "Beyond C (2F)",
    imagePos: "Between F and C",
    size: "Diminished",
    nature: "Real and inverted",
    rangeMinU: 210, // Assuming C is around 200
    rangeMaxU: 320,
  },
  {
    objectPos: "At C (2F)",
    imagePos: "At C",
    size: "Same size",
    nature: "Real and inverted",
    rangeMinU: 190,
    rangeMaxU: 210,
  },
  {
    objectPos: "Between C and F",
    imagePos: "Beyond C",
    size: "Magnified",
    nature: "Real and inverted",
    rangeMinU: 110, // Assuming F is around 100
    rangeMaxU: 190,
  },
  {
    objectPos: "At focus F",
    imagePos: "At infinity",
    size: "Highly magnified",
    nature: "Real and inverted",
    rangeMinU: 90,
    rangeMaxU: 110,
  },
  {
    objectPos: "Between P and F",
    imagePos: "Behind the mirror",
    size: "Magnified",
    nature: "Virtual and erect",
    rangeMinU: 0,
    rangeMaxU: 90,
  },
];

export const CONVEX_MIRROR_TABLE: NCERTTableRow[] = [
  {
    objectPos: "At infinity",
    imagePos: "At focus F, behind the mirror",
    size: "Highly diminished, point-sized",
    nature: "Virtual and erect",
    rangeMinU: 280,
    rangeMaxU: 99999,
  },
  {
    objectPos: "Between infinity and Pole (P)",
    imagePos: "Between P and F, behind mirror",
    size: "Diminished",
    nature: "Virtual and erect",
    rangeMinU: 0,
    rangeMaxU: 280,
  },
];

export const CONVEX_LENS_TABLE: NCERTTableRow[] = [
  {
    objectPos: "At infinity",
    imagePos: "At focus F₂",
    size: "Highly diminished, point-sized",
    nature: "Real and inverted",
    rangeMinU: 320,
    rangeMaxU: 99999,
  },
  {
    objectPos: "Beyond 2F₁",
    imagePos: "Between F₂ and 2F₂",
    size: "Diminished",
    nature: "Real and inverted",
    rangeMinU: 210,
    rangeMaxU: 320,
  },
  {
    objectPos: "At 2F₁",
    imagePos: "At 2F₂",
    size: "Same size",
    nature: "Real and inverted",
    rangeMinU: 190,
    rangeMaxU: 210,
  },
  {
    objectPos: "Between F₁ and 2F₁",
    imagePos: "Beyond 2F₂",
    size: "Magnified",
    nature: "Real and inverted",
    rangeMinU: 110,
    rangeMaxU: 190,
  },
  {
    objectPos: "At focus F₁",
    imagePos: "At infinity",
    size: "Highly magnified",
    nature: "Real and inverted",
    rangeMinU: 90,
    rangeMaxU: 110,
  },
  {
    objectPos: "Between F₁ and Optical Centre O",
    imagePos: "On the same side of the lens",
    size: "Magnified",
    nature: "Virtual and erect",
    rangeMinU: 0,
    rangeMaxU: 90,
  },
];

export const CONCAVE_LENS_TABLE: NCERTTableRow[] = [
  {
    objectPos: "At infinity",
    imagePos: "At focus F₁",
    size: "Highly diminished, point-sized",
    nature: "Virtual and erect",
    rangeMinU: 280,
    rangeMaxU: 99999,
  },
  {
    objectPos: "Between infinity and Optical Centre O",
    imagePos: "Between F₁ and Optical Centre",
    size: "Diminished",
    nature: "Virtual and erect",
    rangeMinU: 0,
    rangeMaxU: 280,
  },
];

export const NCERT_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "A concave mirror produces a virtual, erect, and magnified image. Where should the object be placed?",
    options: [
      "At the focus F",
      "Between center of curvature C and focus F",
      "Beyond center of curvature C",
      "Between the pole P and focus F"
    ],
    correctAnswer: 3,
    explanation: "When an object is placed between the pole (P) and focus (F) of a concave mirror, the image is formed behind the mirror, which is virtual, erect, and magnified. This is the only case where a concave mirror forms a virtual image."
  },
  {
    id: 2,
    question: "What is the nature of the image formed by a convex mirror for any position of the real object?",
    options: [
      "Always real and inverted",
      "Always virtual, erect, and diminished",
      "Always virtual, erect, and magnified",
      "Real and inverted when object is beyond C"
    ],
    correctAnswer: 1,
    explanation: "A convex mirror always forms a virtual, erect, and diminished image behind the mirror, regardless of where the object is placed on the principal axis."
  },
  {
    id: 3,
    question: "When an object is placed at 2F₁ (or C) of a convex lens, where is the image formed and what is its size?",
    options: [
      "At focus F₂, highly diminished",
      "At 2F₂, same size as the object",
      "Beyond 2F₂, magnified",
      "Between F₂ and 2F₂, diminished"
    ],
    correctAnswer: 1,
    explanation: "An object placed at 2F₁ (which corresponds to C, the double focus distance) of a convex lens forms a real, inverted image at 2F₂ on the other side, and its size is exactly the same as the object (magnification m = -1)."
  },
  {
    id: 4,
    question: "A concave lens always forms:",
    options: [
      "A real, inverted, and magnified image",
      "A virtual, erect, and diminished image on the same side as the object",
      "A virtual, erect, and magnified image behind the lens",
      "No image at all"
    ],
    correctAnswer: 1,
    explanation: "A concave (diverging) lens always refracts light rays so that they diverge on the other side. When projected back, they meet on the same side, forming a virtual, erect, and diminished image between the optical center and focus F₁."
  },
  {
    id: 5,
    question: "According to the Cartesian Sign Convention, the focal length of a concave mirror and a convex lens are respectively:",
    options: [
      "Positive, Negative",
      "Negative, Positive",
      "Negative, Negative",
      "Positive, Positive"
    ],
    correctAnswer: 1,
    explanation: "For a concave mirror, the focus lies on the left side (in front of the reflective surface), so its focal length is negative. For a convex lens, the parallel rays converge at the focus F₂ on the right side of the lens, so its focal length is positive."
  },
  {
    id: 6,
    question: "When light travels from air into glass, which of the following properties of light remains unchanged?",
    options: [
      "Velocity",
      "Wavelength",
      "Frequency",
      "Both Velocity and Wavelength"
    ],
    correctAnswer: 2,
    explanation: "Frequency is a characteristic property of the source of light. When light transitions between optical media, its speed and wavelength change proportionally, but the frequency remains constant."
  },
  {
    id: 7,
    question: "The speed of light in glass is 2 x 10⁸ m/s. What is the absolute refractive index of this glass? (Speed of light in vacuum = 3 x 10⁸ m/s)",
    options: [
      "1.33",
      "1.50",
      "1.66",
      "2.00"
    ],
    correctAnswer: 1,
    explanation: "Refractive index (n) = Speed of light in vacuum (c) / Speed of light in medium (v). Here n = (3 x 10⁸) / (2 x 10⁸) = 1.5."
  },
  {
    id: 8,
    question: "A doctor prescribes a corrective lens of power +2.0 D. What is the focal length of this lens and its type?",
    options: [
      "+50 cm, Convex (converging)",
      "-50 cm, Concave (diverging)",
      "+20 cm, Convex (converging)",
      "+2.0 m, Bifocal"
    ],
    correctAnswer: 0,
    explanation: "Power P = 1/f (f in meters). Hence, f = 1/P = 1/2.0 = 0.5 m = 50 cm. Since power is positive, it is a converging (convex) lens."
  },
  {
    id: 9,
    question: "An object is placed 10 cm in front of a plane mirror. The distance between the object and its image is:",
    options: [
      "10 cm",
      "20 cm",
      "5 cm",
      "Infinity"
    ],
    correctAnswer: 1,
    explanation: "In a plane mirror, the image is formed at the same distance behind the mirror as the object is in front of it. Object to mirror is 10 cm, mirror to image is 10 cm, total distance is 20 cm."
  },
  {
    id: 10,
    question: "Which type of mirror is primarily used as a security or surveillance mirror in parking garages or large shops?",
    options: [
      "Concave mirror",
      "Plane mirror",
      "Convex mirror",
      "Parabolic concentrating mirror"
    ],
    correctAnswer: 2,
    explanation: "Convex mirrors are used for security and rearview mirrors because they provide erect images and have a wide field of view, as they are curved outwards."
  },
  {
    id: 11,
    question: "A spherical mirror and a thin spherical lens have each a focal length of -15 cm. The mirror and the lens are likely to be:",
    options: [
      "Both Concave",
      "Both Convex",
      "The mirror is concave and the lens is convex",
      "The mirror is convex and the lens is concave"
    ],
    correctAnswer: 0,
    explanation: "By convention, any concave system (whether mirror or lens) has a negative focal length. Concave mirrors form focus in front (negative), and concave lenses diverge light having a virtual focus on the left (negative)."
  },
  {
    id: 12,
    question: "The refractive index of medium A is 1.25 and that of medium B is 1.50. Under what condition will light travel faster?",
    options: [
      "Light travels faster in medium B because its index is higher",
      "Light travels faster in medium A because its index is lower",
      "Light travels at the same speed in both media",
      "Speed depends only on source frequency"
    ],
    correctAnswer: 1,
    explanation: "Speed of light is inversely proportional to the refractive index of the medium (v = c/n). A lower refractive index (1.25) means less optical density and faster light travel speed."
  },
  {
    id: 13,
    question: "When a ray of light passes straight through the optical center of a thin lens, its angle of deviation is:",
    options: [
      "90 degrees",
      "180 degrees",
      "0 degrees",
      "45 degrees"
    ],
    correctAnswer: 2,
    explanation: "A light ray passing through the optical center (O) of a thin lens suffers no deviation and passes completely straight through (deviation angle = 0)."
  },
  {
    id: 14,
    question: "The focal length of a spherical mirror of radius of curvature 30 cm is:",
    options: [
      "30 cm",
      "15 cm",
      "60 cm",
      "10 cm"
    ],
    correctAnswer: 1,
    explanation: "For any spherical mirror, the focal length f is half of its radius of curvature R (f = R/2). Hence f = 30 / 2 = 15 cm."
  },
  {
    id: 15,
    question: "If the magnification produced by an optical device is m = -2.5, what can be deduced about the image formed?",
    options: [
      "The image is virtual, erect, and magnified",
      "The image is real, inverted, and diminished",
      "The image is real, inverted, and magnified",
      "The image is virtual, erect, and same size"
    ],
    correctAnswer: 2,
    explanation: "A negative magnification (m < 0) always denotes a real and inverted image. An absolute value greater than 1 (|m| = 2.5 > 1) denotes that the image is magnified or enlarged."
  },
  {
    id: 16,
    question: "If the upper half of a convex lens is covered with black paper, what happens to the image of an object placed in front of it?",
    options: [
      "No image is formed because half of the refracting surface is blocked",
      "Only the lower half of the image is formed",
      "A complete image is formed, but its intensity and brightness are reduced",
      "Only the upper half of the image is formed, but upside down"
    ],
    correctAnswer: 2,
    explanation: "The remaining exposed half of the lens still refracts light from all parts of the object to form a complete image at the same position. However, because only half the amount of light passes through the lens, the image will be less bright (reduced intensity)."
  },
  {
    id: 17,
    question: "Which of the following optical phenomena are involved in the formation of a natural rainbow in the sky?",
    options: [
      "Only refraction and dispersion",
      "Refraction, dispersion, and total internal reflection",
      "Refraction, dispersion, and internal reflection",
      "Refraction and internal scattering"
    ],
    correctAnswer: 2,
    explanation: "A raindrop acts like a tiny prism. When sunlight enters, it undergoes refraction and dispersion (splits into constituent colors), followed by internal reflection off the back surface of the drop, and refraction again as it exits into the air. (Note: in standard curricula, 'internal reflection' or 'total internal reflection' are accepted, but specifically refraction, dispersion, and internal reflection are the core stages)."
  },
  {
    id: 18,
    question: "If you stand between two parallel plane mirrors facing each other, how many virtual images of yourself will theoretically be formed?",
    options: [
      "Only 2 images",
      "Exactly 8 images",
      "An infinite number of images",
      "No images due to wave cancellation"
    ],
    correctAnswer: 2,
    explanation: "When mirrors are aligned perfectly parallel, the angle between them is 0 degrees. The theoretical number of images is given by (360 / θ) - 1. For θ = 0, this yields (360 / 0) - 1 which is infinite, formed due to endless back-and-forth reflections."
  },
  {
    id: 19,
    question: "How does the focal length of a glass convex lens change when we switch the incident ray from red light to blue light?",
    options: [
      "The focal length remains exactly the same",
      "The focal length decreases",
      "The focal length increases",
      "The lens ceases to converge light"
    ],
    correctAnswer: 1,
    explanation: "According to Cauchy's Principle and the Lens Maker's Formula, the refractive index of glass is higher for blue light than for red light (n_blue > n_red). A higher refractive index means the lens bends blue light more sharply, focusing it closer to the lens, which decreases the focal length (f_blue < f_red)."
  },
  {
    id: 20,
    question: "A coin is placed at the bottom of a beaker filled with water (refractive index = 1.33) to a depth of 12 cm. When viewed from straight above, what is the apparent depth of the coin?",
    options: [
      "12 cm (remains unchanged)",
      "16 cm (appears deeper)",
      "9 cm (appears shallower)",
      "8 cm (appears shallower)"
    ],
    correctAnswer: 2,
    explanation: "For normal viewing, the apparent depth is given by: Apparent Depth = Real Depth / Refractive Index. Substituting the values: Apparent Depth = 12 cm / 1.33 ≈ 12 / (4/3) = 9 cm. The coin looks raised by 3 cm!"
  },
  {
    id: 21,
    question: "During hot summer days, drivers often see illusory pools of water on asphalt highways in the distance (mirages). This is primarily caused by:",
    options: [
      "Rayleigh scattering of blue wavelengths by air particles",
      "Total Internal Reflection in air layers of varying temperatures and densities",
      "Diffraction of light near the flat tar boundaries",
      "Regular specular reflection of light from metal elements in the asphalt"
    ],
    correctAnswer: 1,
    explanation: "The ground heats the adjacent air layer, making it warm and less dense (optically rarer, lower index) than the cooler air above (optically denser). Light traveling downward from the sky bends progressively away from the normal until it exceeds the critical angle and undergoes Total Internal Reflection, curving back up to simulate a shiny pool of water reflecting the sky."
  },
  {
    id: 22,
    question: "A symmetric biconvex lens of focal length f is cut perpendicular to its principal axis into two identical plano-convex lenses. The focal length of each individual plano-convex lens becomes:",
    options: [
      "f / 2",
      "2f",
      "f (remains unchanged)",
      "Infinity (flat plate)"
    ],
    correctAnswer: 1,
    explanation: "By the Lens Maker's Formula, 1/f = (n - 1) * (1/R1 - 1/R2). For a biconvex lens with equal radii R, 1/f = (n - 1) * (2/R). Cutting it in half leaves one curved surface of radius R and one flat surface of infinite radius (R2 = ∞). Thus, for the half-lens, 1/f_half = (n - 1) * (1/R) = 1 / (2f), so the focal length doubles to 2f."
  },
  {
    id: 23,
    question: "The twinkling of stars observed in the clear night sky is physically caused by:",
    options: [
      "Stellar solar flares releasing periodic pulses of light",
      "Atmospheric refraction of starlight due to fluctuating temperature and density air layers",
      "Cosmic dust clouds passing in front of stellar bodies",
      "Diffraction of starlight by ice crystals in high altitude clouds"
    ],
    correctAnswer: 1,
    explanation: "Starlight travels through dynamic, moving layers of the Earth's atmosphere. These layers have varying temperatures and densities, causing their refractive indices to fluctuate continuously. Consequently, the apparent position and intensity of light from the point-like star shift rapidly, which we perceive as twinkling."
  },
  {
    id: 24,
    question: "Light enters from water (refractive index = 1.33) into a solid diamond (refractive index = 2.42). The speed of light during this transition:",
    options: [
      "Increases because diamond has higher structural hardness",
      "Decreases because diamond is optically denser than water",
      "Remains constant, only wavelength changes",
      "Rises to match the high optical power of the medium"
    ],
    correctAnswer: 1,
    explanation: "The velocity of light inside any medium is inversely proportional to its absolute refractive index (v = c/n). Since diamond has a much higher refractive index than water (2.42 > 1.33), it is optically far denser, meaning light slows down significantly upon entering it."
  },
  {
    id: 25,
    question: "The critical angle for a glass-air interface is θc. If the refractive index of this glass is 1.50, what is the sine of the critical angle (sin θc)?",
    options: [
      "1.50",
      "0.50",
      "0.67",
      "0.75"
    ],
    correctAnswer: 2,
    explanation: "The critical angle θc is related to the refractive index n by the equation: sin θc = n_rare / n_dense. Here, sin θc = 1.00 / 1.50 = 2/3 ≈ 0.67."
  },
  {
    id: 26,
    question: "When a parallel beam of white light passes through a rectangular flat glass slab obliquely, it does NOT show a rainbow spectrum exit on the other side. This is because:",
    options: [
      "Glass slabs are physically too thick for dispersion to occur",
      "Dispersion can only occur in liquid mediums like raindrops",
      "The dispersion produced at the first face is reversed by equal and opposite refraction at the second parallel face, emerging as a combined white beam",
      "The speed of all light colors inside glass is identical, preventing splitting"
    ],
    correctAnswer: 2,
    explanation: "While white light is dispersed into constituent colors at the first air-to-glass interface, the slab's opposite faces are perfectly parallel. The refraction at the second glass-to-air interface reverses the process, bending the colored rays back into parallel paths. They exit merged together as a single white beam (with a small lateral displacement)."
  }
];
