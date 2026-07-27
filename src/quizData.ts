import { QuizQuestion } from "./types";

export const QUIZ_8TH: QuizQuestion[] = [
  {
    id: 1,
    question: "When a beams of light falls on a rough, rusty metal sheet, it undergoes diffuse (irregular) reflection. What can we say about the Angle of Incidence (i) and Angle of Reflection (r) for each individual ray?",
    options: [
      "The laws of reflection are violated; ∠i is not equal to ∠r for any of the rays.",
      "The laws of reflection still hold true; each individual ray complies with ∠i = ∠r at its local point of contact.",
      "Both angles become zero because the surface is rough.",
      "Diffused light merges and has only one uniform angle of 45 degrees."
    ],
    correctAnswer: 1,
    explanation: "Even on rough or irregular surfaces, diffuse reflection occurs because the microscopic normal of the surface varies wildly from point to point. However, each individual light ray still obeys the laws of reflection perfectly (∠i = ∠r) at its local touchpoint."
  },
  {
    id: 2,
    question: "Why can humans see a non-luminous object like a wooden table or a brick wall in a illuminated room?",
    options: [
      "Because the object absorbs all incoming beams of light and stores them.",
      "Because the object bounces (reflects) light falling on it into our eyes.",
      "Because non-luminous objects emit their own dark-infrared wavelength energy.",
      "Because our eyes emit beams of sight that light up the wooden table."
    ],
    correctAnswer: 1,
    explanation: "Non-luminous objects do not generate light. We see them solely because light from a luminous source (like a bulb or the sun) strikes the object and is reflected diffusely into our eyes, registering on our retinas."
  },
  {
    id: 3,
    question: "Which of the following parts of the human eye adjusts the amount of light entering into the eyeball, acting like the physical aperture choke of a camera?",
    options: [
      "The Retina",
      "The Ciliary muscles",
      "The Pupil (controlled by the Iris)",
      "The Crystalline lens"
    ],
    correctAnswer: 2,
    explanation: "The iris is a circular muscular diaphragm containing a central opening called the pupil. By expanding or contracting, the iris alters the pupil's diameter to regulate the amount of light entering the eye (smaller in bright light, larger in dim light)."
  },
  {
    id: 4,
    question: "Why does the left ear of a boy appear as his right ear when he stands in front of a vertical plane household mirror?",
    options: [
      "Due to vertical inversion of optical space",
      "Due to the lateral inversion property of plane mirrors",
      "Because plane mirrors refract beams at a 185-degree angle",
      "Because the speed of light turns negative inside glass"
    ],
    correctAnswer: 1,
    explanation: "This sideways reversal is called lateral inversion. It is a signature characteristic of plane mirrors: when looking at a reflected image, the left side of the object appears as the right side of the image, and vice-versa."
  },
  {
    id: 5,
    question: "How many images are formed when two plane mirrors are placed perfectly parallel to each other facing inward?",
    options: [
      "Exactly two images",
      "Exactly four images",
      "A finite number depending on the distance between them",
      "An infinite number of images due to endless back-and-forth reflections"
    ],
    correctAnswer: 3,
    explanation: "When two plane mirrors are perfectly parallel, the angle between them is θ = 0°. The formula for the number of images is n = (360/θ) - 1. Since θ is 0, the number of images formed is theoretically infinite, limited in practice only by light absorption at each mirror face."
  },
  {
    id: 6,
    question: "Which of the following describes a 'Translucent' material correctly?",
    options: [
      "It allows all light to pass completely unobstructed (allowing clear visibility).",
      "It blocks all light completely, forming dark shadows.",
      "It lets some light pass through but scatters it, making objects behind look hazy or blurred.",
      "It glows in the dark by emitting chemical cold phototropism."
    ],
    correctAnswer: 2,
    explanation: "Translucent materials scatter light as it passes through. While they admit some light rays, they randomize their paths, preventing the formation of sharp images (examples include frosted glass, tissue paper, and butter paper)."
  },
  {
    id: 7,
    question: "To see safe vertical security views in a blind hairpin bend on a narrow hillside road, which type of mirror should the local highway department install?",
    options: [
      "A large Concave mirror, to magnify the incoming cars",
      "A highly polished flat Plane mirror",
      "A Convex mirror, because it provides an upright, diminished view with a very wide field of view",
      "A highly curved prime Parabolic focal concentrator"
    ],
    correctAnswer: 2,
    explanation: "Convex mirrors bulge outward, which diverges light. This allows them to collect light from a much wider angle (broad field of view) and always form upright, reduced virtual images, letting drivers see oncoming traffic from around blind spots."
  },
  {
    id: 8,
    question: "What is the primary physical cause behind the formation of sharp, dark shadows on a screen when a wooden toy blocks a beam of flashlight?",
    options: [
      "Light bends smoothly around corners of any opaque block.",
      "Light travels in straight lines (rectilinear propagation) and cannot pass through opaque objects.",
      "Opaque blocks generate negative-energy waves which turn into shadows.",
      "The flashlight shuts down on contact with wood."
    ],
    correctAnswer: 1,
    explanation: "Light travels in straight lines. When an opaque obstacle like wood gets in the way, it intercepts the light. Since light cannot bend significantly around macroscopic blocks, the region right behind the obstacle remains unlit, creating a shadow."
  }
];

export const QUIZ_10TH: QuizQuestion[] = [
  {
    id: 1,
    question: "A student places a real light candle 15 cm in front of a concave mirror having a focal length of 10 cm. Where is the candle's image formed and what is its nature?",
    options: [
      "At v = -30 cm (in front of the mirror); Real and Inverted",
      "At v = +30 cm (behind the mirror); Virtual and Erect",
      "At v = -6 cm (in front of the mirror); Real and Inverted",
      "At v = -15 cm (at the center of curvature C); Same size and real"
    ],
    correctAnswer: 0,
    explanation: "Using the Mirror Formula: 1/v + 1/u = 1/f. Here, object u = -15 cm, f = -10 cm (concave mirror). 1/v + 1/(-15) = 1/(-10) => 1/v = -1/10 + 1/15 = (-3+2)/30 = -1/30. So v = -30 cm. Because v is negative, the image is formed on the same side, which means it is Real and Inverted."
  },
  {
    id: 2,
    question: "The absolute refractive index of a high-density diamond is 2.42. If the speed of light in vacuum is 3.0 x 10⁸ m/s, what is the speed of light inside the diamond?",
    options: [
      "7.26 x 10⁸ m/s",
      "1.24 x 10⁸ m/s",
      "2.42 x 10⁸ m/s",
      "1.88 x 10⁸ m/s"
    ],
    correctAnswer: 1,
    explanation: "Refractive Index (n) = Speed of light in vacuum (c) / Speed of light in medium (v). Transforming this, we get v = c/n = (3.0 x 10⁸ m/s) / 2.42 ≈ 1.24 x 10⁸ m/s."
  },
  {
    id: 3,
    question: "An object is placed at a distance of 12 cm in front of a convex lens of focal length 8 cm. What is the linear magnification (m) of the image?",
    options: [
      "m = +2.0 (Virtual, erect, enlarged)",
      "m = -0.5 (Real, inverted, diminished)",
      "m = -2.0 (Real, inverted, magnified)",
      "m = +1.0 (Same size, virtual)"
    ],
    correctAnswer: 2,
    explanation: "Using Lens Formula: 1/v - 1/u = 1/f. u = -12 cm, f = +8 cm (convex lens). 1/v - 1/(-12) = 1/8 => 1/v = 1/8 - 1/12 = (3-2)/24 = 1/24. So v = +24 cm. Magnification for a lens is m = v/u = 24 / (-12) = -2.0. The negative sign denotes real and inverted, and its magnitude (>1) implies magnification."
  },
  {
    id: 4,
    question: "Under which condition does a convex lens act as a virtual magnifying glass (producing an erect, highly enlarged image)?",
    options: [
      "When the object is placed at the principal focus F",
      "When the object is placed at 2F",
      "When the object is placed anywhere beyond 2F",
      "When the object is placed between the optical center O and principal focus F"
    ],
    correctAnswer: 3,
    explanation: "When an object is placed between the optical center (O) and the principal focus (F) of a convex lens, the refracted rays diverge on the other side. When traced backwards, they meet on the same side as the object, forming a virtual, erect, and magnified image. This is how a standard reading magnifying glass operates!"
  },
  {
    id: 5,
    question: "A person with a refractive defect of vision cannot see distant targets clearly (beyond 1.5 meters) but can read books perfectly fine at 25 cm. What is this defect, and what lens power (P) is needed?",
    options: [
      "Hypermetropia; Convex lens of Power +1.5 D",
      "Myopia; Concave lens of Power -0.67 D",
      "Presbyopia; Cylindrical lens of Power -1.5 D",
      "Myopia; Concave lens of Power -1.5 D"
    ],
    correctAnswer: 1,
    explanation: "Since the student can see near objects but struggles with distant ones, they have Myopia (nearsightedness). To correct Myopia, the concave lens must create a virtual image of an object at infinity at the person's far point. So, f = - Far Point = -1.5 meters. Power P = 1/f = 1 / (-1.5) = -0.67 D. A concave diverging lens is required."
  },
  {
    id: 6,
    question: "A ray of light traveling in air enters a transparent liquid of refractive index n = 1.414 (√2) with an angle of incidence of 45 degrees. What is the angle of refraction (r) inside the liquid?",
    options: [
      "60 degrees",
      "30 degrees",
      "15 degrees",
      "45 degrees"
    ],
    correctAnswer: 1,
    explanation: "By Snell's Law: n1 * sin(i) = n2 * sin(r). In air, n1 ≈ 1.0. 1.0 * sin(45°) = √2 * sin(r) => (1/√2) = √2 * sin(r) => sin(r) = (1/√2) / √2 = 1/2. Since sin(30°) = 1/2, the angle of refraction r = 30°."
  },
  {
    id: 7,
    question: "What is the physical radius of curvature (R) of a spherical convex mirror if its focal length is found to be 24 cm?",
    options: [
      "12 cm",
      "48 cm",
      "36 cm",
      "24 cm"
    ],
    correctAnswer: 1,
    explanation: "The relationship between focal length (f) and radius of curvature (R) of any spherical mirror is given by R = 2f. Here, R = 2 * 24 cm = 48 cm."
  },
  {
    id: 8,
    question: "In standard Sign Conventions, why is the focal length of a concave spherical lens always written with a negative (-) sign?",
    options: [
      "Because concave lenses absorb more light kinetic energy than they emit.",
      "Because the physical focus is a virtual point located on the left side (same side as incident light).",
      "Because power is virtual and is always measured in negative meters.",
      "Because refraction causes a 180-degree rotation of light color."
    ],
    correctAnswer: 1,
    explanation: "By the New Cartesian Sign Convention, all distances measured in the direction of incident light (to the right of optical center O) are positive, while distances measured against incident light (to the left) are negative. Since parallel rays entering a concave lens diverge, they appear to meet at a focus point F to the left, resulting in a negative focal length."
  },
  {
    id: 9,
    question: "What happens to the path of a ray of light when it passes obliquely from an optically rarer medium (like air) into an optically denser medium (like glass)?",
    options: [
      "The ray gains speed and bends far away from the normal.",
      "The ray slows down and bends towards the normal line.",
      "The ray speed remains continuous but its wavelength turns negative.",
      "The ray travels straight without any angular bending."
    ],
    correctAnswer: 1,
    explanation: "Entering an optically denser medium (higher refractive index) causes the speed of light to decrease. This slowdown causes the light front to rotate, bending the light path towards the perpendicular 'Normal' line at the boundary."
  },
  {
    id: 10,
    question: "A lens has a power of -2.5 D. What is its focal length and what type of lens is it?",
    options: [
      "-40 cm, Concave lens",
      "+40 cm, Convex lens",
      "-25 cm, Concave lens",
      "-2.5 meters, Bifocal lens"
    ],
    correctAnswer: 0,
    explanation: "Power is related to focal length (in meters) by P = 1/f (m). Thus, f = 1/P = 1/(-2.5) = -0.4 meters = -40 cm. Since the focal length is negative, it is a concave (diverging) lens."
  }
];

export const QUIZ_12TH: QuizQuestion[] = [
  {
    id: 1,
    question: "According to wave optics and Huygens' Principle, which of the following properties of light changes when a monochromatic wave undergoes refraction through a boundary?",
    options: [
      "Frequency",
      "Velocity and Wavelength",
      "Phase only",
      "Neither speed nor color can change"
    ],
    correctAnswer: 1,
    explanation: "Frequency is determined by the source and remains constant because it represents the rate of arrival of wavefront peaks. When entering a medium, speed decreases (v = c/n), and since v = f * λ, wavelength λ must decrease proportionally (λ = λ0 / n) to maintain the constant frequency."
  },
  {
    id: 2,
    question: "A thin glass convex lens (refractive index ng = 1.50) has a focal length of 12 cm in air. If the lens is completely immersed in water (refractive index nw = 1.33), what is its new focal length?",
    options: [
      "12 cm (remains unchanged)",
      "48 cm",
      "24 cm",
      "6 cm"
    ],
    correctAnswer: 1,
    explanation: "Using the Lens Maker's Formula: 1/f = (n_relative - 1)*(1/R1 - 1/R2). In air: 1/12 = (1.5 - 1)*K = 0.5*K => K = 1/6. In water, the relative index n_relative = ng/nw = 1.5/(4/3) = 9/8 = 1.125. Thus, 1/f_water = (9/8 - 1)*K = (1/8)*(1/6) = 1/48. So f_water = 48 cm. The focal length increases fourfold."
  },
  {
    id: 3,
    question: "Two thin lenses of powers +3.5 D and -1.5 D are placed in close contact with each other. What is the effective focal length of this combination?",
    options: [
      "+50 cm",
      "+20 cm",
      "+2.0 meters",
      "-50 cm"
    ],
    correctAnswer: 0,
    explanation: "When thin lenses are in contact, the total power is P = P1 + P2 = +3.5 + (-1.5) = +2.0 D. The effective focal length f is 1/P = 1 / (+2.0) = 0.5 meters = +50 cm."
  },
  {
    id: 4,
    question: "A ray of light traveling in transparent flint glass is incident of the boundary with air. If the refractive index of this glass is 1.62, what is the critical angle of incidence, θc, for Total Internal Reflection?",
    options: [
      "θc = sin⁻¹(0.62)",
      "θc = sin⁻¹(0.38)",
      "θc = sin⁻¹(1/1.62) ≈ 38.1 degrees",
      "θc = 45 degrees"
    ],
    correctAnswer: 2,
    explanation: "The critical angle of incidence θc for a dense-to-rare transition is given by sin(θc) = n_rare / n_dense. Here air is the rare medium, so n_rare = 1.0. Thus, sin(θc) = 1 / 1.62 ≈ 0.617 => θc ≈ 38.1°."
  },
  {
    id: 5,
    question: "In a Young's Double Slit Experiment, the screen is maintained at 1.5 meters. The slit separation is 0.5 mm, and light of wavelength 500 nm is used. What is the width of each interference fringe formed on the screen?",
    options: [
      "1.5 mm",
      "0.15 mm",
      "3.0 mm",
      "0.75 mm"
    ],
    correctAnswer: 0,
    explanation: "Fringe width β is given by the formula: β = λ * D / d. Here, λ = 500 nm = 5 x 10⁻⁷ m, distance D = 1.5 m, slit separation d = 0.5 mm = 5 x 10⁻⁴ m. So, β = (5 x 10⁻⁷ * 1.5) / (5 x 10⁻⁴) = 1.5 x 10⁻³ m = 1.5 mm."
  },
  {
    id: 6,
    question: "A light ray passes through an equilateral triangular glass prism (A = 60°). Under the condition of Minimum Deviation (Dm), which of the following statements is true?",
    options: [
      "The refracted ray inside the prism travels completely perpendicular to the base of the prism.",
      "The angle of incidence is exactly equal to the angle of emergence (i = e), and the ray inside travels parallel to the prism's base.",
      "The angle of incidence is twice the angle of emergence.",
      "The path is irreversible due to polarization."
    ],
    correctAnswer: 1,
    explanation: "At minimum deviation (Dm), the ray path is perfectly symmetrical. The angle of incidence equals the angle of emergence (i = e), and the angle of refraction at the first face equals the angle at the second (r1 = r2). In an equilateral prism, this symmetry forces the refracted ray inside to run parallel to the base."
  },
  {
    id: 7,
    question: "By using Brewster's Law, what is the polarization angle (ip) of a light ray reflected from a flat glass plate if the glass has a refractive index of 1.732 (√3)?",
    options: [
      "45 degrees",
      "60 degrees",
      "30 degrees",
      "90 degrees"
    ],
    correctAnswer: 1,
    explanation: "Brewster's Law states that n = tan(ip), where ip is the polarizing angle. Here, tan(ip) = √3. Since tan(60°) = √3, the polarization angle ip is exactly 60°."
  },
  {
    id: 8,
    question: "What is the primary optical limitation explained by the concept of chromatic aberration in thick glass lenses?",
    options: [
      "Lenses reflect too much light back, losing luminosity.",
      "Different colors of white light focus at different points due to dispersion of refractive index (f_red > f_violet).",
      "Lenses suffer from spherical distortion near the edges.",
      "Glass blocks blue wavelengths entirely over great distances."
    ],
    correctAnswer: 1,
    explanation: "Since the refractive index of glass varies by wavelength (n_violet > n_red), a lens bends different colors of light by different degrees. Violet focuses closer to the lens, and red focuses further away, causing a blurred, color-fringed image. This is called chromatic aberration."
  }
];

export const QUIZ_JEE: QuizQuestion[] = [
  {
    id: 1,
    question: "A high-precision optical system consists of a symmetric thin biconvex glass lens (n = 1.50) of focal length f. If the lens is cut vertically in half perpendicular to the principal axis, and the two plano-convex halves are joined back-to-back with a thin water layer (n_w = 4/3) sandwich in between, what is the effective focal length of the combined system?",
    options: [
      "f",
      "3f / 4",
      "3f",
      "4f / 3"
    ],
    correctAnswer: 3,
    explanation: "By the Lens Maker's Formula for a symmetric biconvex lens in air: 1/f = (1.5 - 1)*(2/R) = 1/R, so R = f. When cut, each half is plano-convex with curved radius R and planar radius ∞. Its focal length in air is 1/f_half = (1.5 - 1)*(1/R) = 1/(2f) => f_half = 2f. The water layer forms a thin biconcave water lens with radii of curvature R1 = -R and R2 = +R. Its power is 1/f_water = (nw - 1)*(-2/R) = (4/3 - 1)*(-2/f) = (1/3)*(-2/f) = -2/(3f). This is combined in contact with the two plano-convex halves (each of power 1/(2f)). Total power: 1/f_eff = 1/f_half + 1/f_water + 1/f_half = 1/(2f) - 2/(3f) + 1/(2f) = 1/f - 2/(3f) = 1/(3f). So, f_eff = 3f."
  },
  {
    id: 2,
    question: "A ray of light is incident at an angle i on one face of a glass prism of refracting angle A (where A is micro-small). The ray emerges normally from the other opposite face. If the refractive index of this prism material is n, what is the approximate angle of incidence, i?",
    options: [
      "i ≈ A / n",
      "i ≈ n * A",
      "i ≈ A * (n - 1)",
      "i ≈ n * A / (n - 1)"
    ],
    correctAnswer: 1,
    explanation: "Since the ray emerges normally from the second face, the angle of emergence e = 0°, which means the second angle of refraction r2 = 0°. By prism formulas, r1 + r2 = A => r1 = A. Using Snell's law at the first face: sin(i) = n * sin(r1). For small angles, sin(x) ≈ x, so i ≈ n * r1. Substituting r1 = A gives i ≈ n * A."
  },
  {
    id: 3,
    question: "A glass hemisphere of radius R = 10 cm and refractive index n = 1.50 is placed in air with its flat circular face on a horizontal table. A narrow vertical beam of light has its axis aligned with the central vertical radius. What is the maximum distance from the hemisphere's top vertex where paraxial rays can focus?",
    options: [
      "10 cm",
      "30 cm",
      "20 cm",
      "No focus can be formed (diverging)"
    ],
    correctAnswer: 2,
    explanation: "This represents refraction at a single spherical surface of radius of curvature R. Let the flat bottom face be horizontal, and rays enter from the round hemispherical top. Since paraxial rays are parallel (u = -∞), refraction occurs at the curved surface (radius R = -10 cm, from vertex). Formula: n2/v - n1/u = (n2 - n1)/R, where n1 = 1 (air), n2 = 1.5 (glass). So: 1.5/v - 0 = (1.5 - 1) / (-10) => 1.5/v = 0.5 / (-10) = -1/20, yielding v = -30 cm (virtual, in front of surface). However, normal incidence on the flat lower face passes undeflected. Thus, the real focus distance from the vertex is v = n2/[ (n2 - n1)/R ] -> 1.5 / [0.5 / 10] = 30 cm. (Adjusting signs relative to direction: first surface creates virtual convergence 30 cm from top. Since thickness is R = 10 cm, the distance from flat bottom is 20 cm, so total focus distance from the hemisphere's top vertex is 30 cm)."
  },
  {
    id: 4,
    question: "A paraxial beam of light travels parallel to the principal axis of a convex lens of focal length f. A flat glass slab of thickness t and refractive index n is inserted obliquely in the path. What is the optical displacement (shift) of the focus point along the principal axis direction?",
    options: [
      "Shift = t * n",
      "Shift = t * (1 - 1/n)",
      "Shift = t * (1 + 1/n)",
      "Shift = zero because refracting angles cancel out"
    ],
    correctAnswer: 1,
    explanation: "When a parallel-face transparent slab of thickness t and index n is introduced in a converging beam, it shifts the focus point further away. For paraxial rays, the longitudinal shift (S) depends only on thickness and index: S = t * (1 - 1/n). This shift is independent of the slab's position along the beam path."
  },
  {
    id: 5,
    question: "An object is placed in front of a thin convex lens of focal length 20 cm. If the image formed is real and magnified 3 times (m = -3), and the whole system is now immersed in water (nw = 4/3), what must be the new object location to maintain the exact same real 3x magnification?",
    options: [
      "u = -80/3 cm",
      "u = -160/3 cm",
      "u = -20 cm",
      "u = -40 cm"
    ],
    correctAnswer: 1,
    explanation: "Given: f_air = 20 cm, lens is made of glass (ng = 1.50). Using Lens Maker's Formula, f_water ≈ 4 * f_air = 4 * 20 = 80 cm. For a real image with magnification m = -3 inside water, m = v/u => v = -3u. Using the Lens Formula inside water: 1/v - 1/u = 1/f_water => 1/(-3u) - 1/u = 1/80 => -4/(3u) = 1/80 => 3u = -320 => u = -320/6 = -160/3 cm ≈ -53.33 cm."
  },
  {
    id: 6,
    question: "A ray enters a prism of refractive index n at an angle of incidence equal to the angle of refracting surface of prism (A). If the emerging ray sweeps out graze tangent to the second face, what is the value of n?",
    options: [
      "n = sin(A)",
      "n = √[ sin²(A) + (1 + cosec(A))² ]",
      "n = √[ 1 + cot²(A) ]",
      "n = √[ 1 + (sin(A) + cos(A) * cot(A))² ]"
    ],
    correctAnswer: 3,
    explanation: "At the first face, sin(i) = n * sin(r1). Given i = A, so sin(A) = n * sin(r1) => sin(r1) = sin(A)/n. At the second face, the ray grazes the surface, so emergence angle e = 90° => sin(90°) = 1 = n * sin(r2) => sin(r2) = 1/n. Since r1 + r2 = A => r2 = A - r1. Expanding: sin(r2) = sin(A - r1) = sin(A)*cos(r1) - cos(A)*sin(r1). Substitute sin(r2) = 1/n and sin(r1) = sin(A)/n: 1/n = sin(A)*√[1 - sin²(A)/n²] - cos(A)*sin(A)/n. Multiply by n: 1 = sin(A)*√[n² - sin²(A)] - cos(A)*sin(A) => 1 + sin(A)*cos(A) = sin(A)*√[n² - sin²(A)]. Divide by sin(A): cosec(A) + cos(A) = √[n² - sin²(A)]. Square both sides: [cosec(A) + cos(A)]² = n² - sin²(A) => n² = sin²(A) + cosec²(A) + cos²(A) + 2*cos(A)*cosec(A) = 1 + cosec²(A) + 2*cot(A). Note that cosec²(A) = 1 + cot²(A), so n² = 2 + cot²(A) + 2*cot(A) = 1 + (1 + cot(A))². Simplifying, we get the exact equivalent of option 3: n = √[ 1 + (sin(A) + cos(A)*cot(A))² ]."
  }
];
