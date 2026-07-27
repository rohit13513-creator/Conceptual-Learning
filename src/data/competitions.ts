// Optics for Competitions - JEE, NEET, Olympiads, and Foundations Study Data
import { QuizQuestion, AssertionReasonQuestion } from "../types-custom";

export interface CompetitionNotesModule {
  id: string;
  title: string;
  summary: string;
  content: string; // HTML-friendly rich educational text
}

// =========================================================================
// 1. DYNAMIC COMPULSORY COMPETITION NOTES GENERATOR
// =========================================================================

export function getCompetitionNotes(grade: '8th' | '10th'): CompetitionNotesModule[] {
  const isJunior = grade === '8th';

  return [
    {
      id: "mod-1",
      title: "Module 1: Plane Mirrors & Multiple Reflections",
      summary: "Understand reflection laws, mirror rotations, and calculate exact images from tilted mirrors.",
      content: `
        <div class="space-y-4">
          <p class="text-sm text-slate-350 leading-relaxed">
            Light travels in a straight line in a medium (Rectilinear Propagation). When it strikes a smooth reflective surface, it bounces back into the same medium, complying with the <b>Laws of Reflection</b>:
          </p>
          <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
            <p>1. <b>Angle of Incidence (i) = Angle of Reflection (r)</b>: Measured strictly relative to the perpendicular <i>Normal</i> at the point of incidence.</p>
            <p>2. <b>Same Plane Rule</b>: The incident ray, the reflected ray, and the normal at the point of contact all reside within the exact same physical plane.</p>
          </div>
          
          <h4 class="text-xs font-black text-cyan-400 uppercase tracking-wider">Multiple Reflections & Image Formula</h4>
          <p class="text-xs text-slate-350">
            If two plane mirrors are jointed at an angle <span class="text-white font-bold font-mono">θ</span>, the number of images (<span class="text-yellow-400 font-mono font-bold">N</span>) formed of an object placed between them depends on the ratio <span class="text-cyan-300 font-mono">m = 360 / θ</span>:
          </p>
          <ul class="list-disc pl-5 text-xs text-slate-400 space-y-1.5">
            <li>If <b>m is an even integer:</b> <span class="text-cyan-300 font-mono font-bold">N = m - 1</span> (regardless of symmetrical or asymmetrical placement).</li>
            <li>If <b>m is an odd integer:</b>
              <ul class="list-circle pl-4 mt-1 space-y-1">
                <li>Symmetrical placement (object on angle bisector): <span class="text-cyan-300 font-mono font-bold">N = m - 1</span></li>
                <li>Asymmetrical placement: <span class="text-cyan-300 font-mono font-bold">N = m</span></li>
              </ul>
            </li>
            <li>If <b>m is a fraction:</b> <span class="text-cyan-300 font-mono font-bold">N = Floor(m)</span> (the integral part of the fraction).</li>
          </ul>

          ${!isJunior ? `
          <div class="p-3.5 bg-cyan-950/20 border border-cyan-800/30 rounded-xl text-xs space-y-2">
            <h5 class="text-cyan-400 font-bold uppercase tracking-wider">🚀 Advanced JEE & NEET Insights: Mirror Rotation</h5>
            <p>• If a plane mirror is rotated by an angle <span class="text-white font-mono font-bold">θ</span> while keeping the incident ray in the same direction, the reflected ray rotates by an angle <span class="text-cyan-300 font-mono font-bold">2θ</span>.</p>
            <p>• <b>Minimum Height of Mirror</b>: To view one's complete height <span class="text-white font-mono">H</span>, the minimum height of a vertical plane mirror required is <span class="text-cyan-300 font-mono font-bold">H / 2</span>.</p>
          </div>
          ` : `
          <div class="p-3 bg-slate-900 border border-slate-850 rounded-xl text-xs">
            <span class="text-amber-400 font-bold text-[10px] uppercase block mb-1">💡 Junior Olympiad Tip (KVPY / NTSE Foundation)</span>
            A periscope uses two plane mirrors parallel at 45° to elevate line of sight, while a kaleidoscope uses three mirror strips at 60° to form infinite symmetrical colorful patterns.
          </div>
          `}
        </div>
      `
    },
    {
      id: "mod-2",
      title: "Module 2: Spherical Mirrors & Image Formation",
      summary: "Explore concave and convex mirrors, learn key terms, sign convetions, and the mirror equations.",
      content: `
        <div class="space-y-4">
          <p class="text-sm text-slate-350 leading-relaxed">
            Spherical mirrors are part of a hollow glass sphere whose outer or inner surface is polished and reflecting:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <b class="text-cyan-400">1. Concave Mirror (Converging):</b> Reflecting surface curved inwards. Parallel rays from infinity converge to a real, physical focus in front of the mirror. Can form both real (inverted) and virtual (erect) images.
            </div>
            <div class="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <b class="text-teal-400">2. Convex Mirror (Diverging):</b> Reflecting surface is curved outwards. Parallel rays are scattered and appear to diverge from a virtual focus point located behind the mirror. Always forms virtual, erect, and smaller images.
            </div>
          </div>

          <h4 class="text-xs font-black text-cyan-400 uppercase tracking-wider">Key Optical Terms</h4>
          <p class="text-xs text-slate-350">
            • <b>Pole (P)</b>: The geometric center of the mirror's reflecting surface.<br/>
            • <b>Center of Curvature (C)</b>: The center of the sphere of which the mirror is a part.<br/>
            • <b>Focal Length (f)</b>: Distance between Pole and Focus. For mirrors of small aperture, <span class="text-cyan-300 font-bold font-mono">f = R / 2</span>, where R is the Radius of Curvature.
          </p>

          <h4 class="text-xs font-black text-cyan-400 uppercase tracking-wider">New Cartesian Sign Convention</h4>
          <p class="text-xs text-slate-350">
            1. All distances are measured starting from the Pole (origin).<br/>
            2. Distances measured in direction of incident ray (usually left-to-right) are **positive**, opposite directions are **negative**.<br/>
            3. Heights above the principal axis are **positive**, downwards are **negative**.<br/>
            • Focal length (<span class="text-white font-mono">f</span>) is <b>negative</b> for Concave Mirrors, and <b>positive</b> for Convex Mirrors.
          </p>

          ${!isJunior ? `
          <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
            <h5 class="text-cyan-400 font-bold uppercase font-mono tracking-wide">📐 The Mirror Equation</h5>
            <div class="bg-slate-950 p-2 text-center text-cyan-300 font-mono text-sm rounded border border-slate-850">
              1 / v + 1 / u = 1 / f
            </div>
            <p>Where <span class="text-white font-mono">u</span> is object distance, <span class="text-white font-mono">v</span> is image distance, <span class="text-white font-mono">f</span> is focal length. Magnification (<span class="text-white font-mono">m</span>) is:</p>
            <div class="bg-slate-950 p-2 text-center text-cyan-300 font-mono text-sm rounded border border-slate-850">
              m = - v / u = f / (f - u) = (f - v) / f
            </div>
            <p>• If <span class="text-yellow-450 font-mono">m</span> is negative: image is Real & Inverted. If positive: Virtual & Erect.</p>
          </div>
          ` : `
          <div class="p-3 bg-cyan-950/20 border border-cyan-800/20 rounded-xl text-xs">
            <span class="text-cyan-400 font-bold uppercase block mb-1">🔍 Practical Uses (NTSE Syllabus)</span>
            • <b>Concave Mirrors:</b> Used by dentists (to see magnified teeth), in solar cookers (to focus sunlight), and in torches/car headlights (for parallel search beams).<br/>
            • <b>Convex Mirrors:</b> Used as automobiles' side rear-view mirrors because they cover a wide traffic field and form erect images.
          </div>
          `}
        </div>
      `
    },
    {
      id: "mod-3",
      title: "Module 3: Refraction at Flat Interfaces & TIR",
      summary: "Analyse the bending of light across medium boundaries, Snell's law, and Total Internal Reflection.",
      content: `
        <div class="space-y-4">
          <p class="text-sm text-slate-350 leading-relaxed">
            Refraction is the change in traveling direction of a light wave as it passes obliquely from one transparent medium to another with different optical densities, caused by differing speeds of light:
          </p>
          <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1.5">
            <p>• <b>Refractive Index (n)</b>: Ratio of speed of light in vacuum (<span class="text-white">c</span>) to speed in medium (<span class="text-white">v</span>): <span class="text-cyan-300 font-mono font-bold">n = c / v</span>.</p>
            <p>• <b>Snell's Law</b>: For two mediums, the product of index and sine of angle is constant: <span class="text-cyan-300 font-mono font-bold">n₁ * sin(i) = n₂ * sin(r)</span>.</p>
          </div>

          <h4 class="text-xs font-black text-cyan-400 uppercase tracking-wider">Apparent Depth & Bending Effects</h4>
          <p class="text-xs text-slate-350">
            When looking vertically into a denser medium (like water) from air, objects appear shallower than they are:
          </p>
          <div class="bg-slate-950 p-2.5 rounded text-center text-cyan-300 font-mono text-xs border border-slate-900">
            Real Depth / Apparent Depth = n_medium
          </div>

          <h4 class="text-xs font-black text-teal-400 uppercase tracking-wider">Total Internal Reflection (TIR)</h4>
          <p class="text-xs text-slate-350">
            When light travels from an optically <b>denser</b> medium to a <b>rarer</b> medium, it bends away from the normal. As the angle of incidence increases, the angle of refraction eventually reaches 90°:
          </p>
          <ul class="list-disc pl-5 text-xs text-slate-400 space-y-1.5">
            <li><b>Critical Angle (θc):</b> The angle of incidence in the denser medium for which the refraction angle is exactly 90°. <span class="text-cyan-355 font-mono font-bold">sin(θc) = n_rarer / n_denser</span>.</li>
            <li><b>TIR Condition:</b> If angle of incidence <span class="text-cyan-300 font-mono">i > θc</span>, no light refracts; 100% of the light reflects back inside the denser medium.</li>
          </ul>

          ${!isJunior ? `
          <div class="p-3.5 bg-cyan-950/20 border border-cyan-800/30 rounded-xl text-xs space-y-1.5">
            <h5 class="text-cyan-400 font-bold uppercase tracking-wider">🚀 JEE/NEET Applications</h5>
            <p>• <b>Mirages in Deserts:</b> Density-gradient air bends ray paths continuously upward, resulting in virtual reflections on hot sand.</p>
            <p>• <b>Optical Fibers:</b> Telecommunication signal guidance through core-cladding glass channels featuring persistent TIR bounces.</p>
          </div>
          ` : `
          <div class="p-3 bg-slate-900 border border-slate-850 rounded-xl text-xs">
            <span class="text-amber-400 font-bold text-[10px] uppercase block mb-1">💡 Junior Exam Pointer</span>
            Crucial reason why swimming pools appear shallower than they actually are is the refraction (bending) of light as it escapes water (n=1.33) into air (n=1).
          </div>
          `}
        </div>
      `
    },
    {
      id: "mod-4",
      title: "Module 4: Prisms, Slabs & White Light Dispersion",
      summary: "Understand lateral displacement, refraction through triangular prisms, and scattering properties.",
      content: `
        <div class="space-y-4">
          <b class="text-xs font-black text-cyan-400 uppercase tracking-wider block">1. Refraction through rectangular glass slabs:</b>
          <p class="text-xs text-slate-350 leading-relaxed">
            When a ray passes through a parallel-faced glass slab, it undergoes refraction twice. The emerging ray is parallel to the original incident path but shifted slightly sideways. This shift is called <b>Lateral Displacement</b>.
          </p>

          <b class="text-xs font-black text-cyan-400 uppercase tracking-wider block">2. Refraction through Triangular Prisms:</b>
          <p class="text-xs text-slate-350 leading-relaxed">
            A prism is a transparent wedge boundary. Because its faces are inclined, emerging rays refract downward toward the base. The angle between the incident ray and the emergent ray is the <b>Angle of Deviation (δ)</b>.
          </p>

          ${!isJunior ? `
          <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2 font-mono">
            <p class="text-cyan-400 font-bold uppercase font-sans">📐 Prism Equation</p>
            <p>• Angle formula: A + δ = i + e (Where A is prism angle, δ deviation, i incidence, e emergence)</p>
            <p>• At minimum deviation (δ = δm): i = e, and r₁ = r₂ = A / 2</p>
            <p>• Refractive index: n = sin( (A + δm) / 2 ) / sin( A / 2 )</p>
          </div>
          ` : ''}

          <h4 class="text-xs font-black text-teal-400 uppercase tracking-wider">Dispersion of White Light</h4>
          <p class="text-xs text-slate-350">
            Sir Isaac Newton discovered that white sunlight consists of seven spectral colors (VIBGYOR). Because different wavelengths have different traveling speeds inside glass, they refract by different amounts (Violet refracts the most, Red the least), separating into a beautiful spectrum.
          </p>

          <div class="p-3 bg-slate-900 border border-slate-850 rounded-xl text-xs">
            <b class="text-amber-400">Scattering of Light:</b>
            According to <b>Rayleigh's Scattering Law</b>, the intensity of scattered light is inversely proportional to the fourth power of the wavelength: <span class="text-cyan-300 font-mono font-bold">I ∝ 1 / λ⁴</span>. Since blue light has a shorter wavelength, it is scattered much more by air molecules than red, which is why the clear sky appears beautiful blue!
          </div>
        </div>
      `
    },
    {
      id: "mod-5",
      title: "Module 5: Spherical Lenses & Combination Power",
      summary: "Understand biconvex and biconcave lenses, focal points, lens equations, and equivalent systems.",
      content: `
        <div class="space-y-4">
          <p class="text-sm text-slate-350 leading-relaxed">
            A lens is a piece of transparent refracting glass bound by two spherical surfaces:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <b class="text-cyan-400">1. Convex Lens (Converging):</b> Thicker in the middle than at the edges. Bends parallel light rays inwards to meet at a real focus point. Used in magnifying glasses and camera lenses.
            </div>
            <div class="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <b class="text-teal-400">2. Concave Lens (Diverging):</b> Thinner in the middle than at the edges. Bends parallel light rays outwards, so they appear to diverge from a virtual focal point. Always forms virtual, erect, and smaller images.
            </div>
          </div>

          <h4 class="text-xs font-black text-cyan-400 uppercase tracking-wider">The Lens Formulas</h4>
          ${!isJunior ? `
          <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5 text-xs">
            <p>1. <b>Thin Lens Formula:</b> <span class="text-cyan-350 font-mono font-bold">1 / v - 1 / u = 1 / f</span></p>
            <p>2. <b>Linear Magnification:</b> <span class="text-cyan-350 font-mono font-bold">m = v / u = f / (f + u)</span></p>
            <p>3. <b>Lens Maker's Formula:</b> <span class="text-cyan-350 font-mono font-bold">1 / f = ( (n₂ / n₁) - 1 ) * (1/R₁ - 1/R₂)</span></p>
            <p>4. <b>Power of a Lens (P):</b> Unit is Dioptre (D). <span class="text-cyan-350 font-mono font-bold">P = 1 / f(in meters) = 100 / f(in cm)</span>. positive for convex, negative for concave.</p>
          </div>
          ` : `
          <p class="text-xs text-slate-350">
            • <b>Convex Lenses</b> act as converging elements, magnifying near images. Convex focal length is always **positive**.<br/>
            • <b>Concave Lenses</b> diverge light, forming smaller upright virtual views. Concave focal length is always **negative**.<br/>
            • <b>Lens Power (P)</b>: Measures a lens's ability to bend light, calculated as <span class="text-cyan-300 font-mono">P = 1 / f(in meters)</span>, in units of <b>Dioptres (D)</b>.
          </p>
          `}

          ${!isJunior ? `
          <div class="p-3.5 bg-cyan-950/20 border border-cyan-800/30 rounded-xl text-xs space-y-1.5">
            <span class="text-cyan-455 font-bold uppercase block text-cyan-400">👥 Lenses in Contact (JEE/NEET Specials)</span>
            If two thin lenses of focal lengths <span class="text-white font-mono">f₁</span> and <span class="text-white font-mono">f₂</span> are placed in close contact:
            <div class="text-center font-mono text-cyan-300 bg-slate-950 p-2 rounded border border-slate-900">
              1 / F_eq = 1 / f₁ + 1 / f₂ &nbsp;|&nbsp; P_eq = P₁ + P₂
            </div>
          </div>
          ` : ''}
        </div>
      `
    },
    {
      id: "mod-6",
      title: "Module 6: Human Eye, Defects, & Visual Aids",
      summary: "Structure of human eye, optical defects (myopia, hypermetropia, astigmatism) and corrections.",
      content: `
        <div class="space-y-4">
          <p class="text-sm text-slate-350 leading-relaxed">
            The human eye forms images on a light-sensitive neural screen called the <b>Retina</b>, rich in rod and cone photodetector cells.
          </p>
          <div class="p-3 bg-slate-900 border border-slate-850 rounded-xl text-xs space-y-2">
            <p>• <b>Myopia (Short-sightedness):</b> A person can see near objects clearly but distant objects appear blurred. Light focuses in front of the retina. <b>Corrected using a matching Diverging Concave Lens</b>.</p>
            <p>• <b>Hypermetropia (Far-sightedness):</b> A person can see distant objects clearly but near objects appear blurred. Light focuses behind the retina. <b>Corrected using a Converging Convex Lens</b>.</p>
            <p>• <b>Presbyopia:</b> Age-related decrease in ciliary flexibility. Near point recedes. Corrected using bifocal lenses with both concave and convex components.</p>
          </div>

          <h4 class="text-xs font-black text-cyan-400 uppercase tracking-wider">Sensory Eye Mechanics</h4>
          <p class="text-xs text-slate-350">
            • <b>Rods</b>: Cells sensitive to low-light intensity, responsible for nighttime sight.<br/>
            • <b>Cones</b>: Cells sensitive to colored spectral wavelengths, active during bright sunny hours.<br/>
            • <b>Persistence of Vision</b>: Retinal image stimulation persists for approx <span class="text-yellow-450 font-bold font-mono">1/16th of a sec</span>. Rapid frame changes trick our brain into seeing continuous realistic animation.
          </p>
        </div>
      `
    },
    {
      id: "mod-7",
      title: "Module 7: Advanced Wave Phenomena & Analytical Systems",
      summary: "High-level JEE/NEET: Fermat's Principle of least time, Cauchy dispersion, silvering of lenses.",
      content: `
        <div class="space-y-4">
          <p class="text-sm text-slate-350 leading-relaxed">
            This module encompasses the mathematical foundational core of wave & high-level geometric optics crucial for competitive engineering and medical entrance tests:
          </p>
          <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
            <b class="text-cyan-400">1. Fermat's Principle of Least Time:</b>
            <p class="text-slate-300">Light propagates between two spots choosing a path that minimizes (or renders stationary) the total travel time. By setting <span class="text-white font-mono">dT/dx = 0</span>, both reflection (i=r) and refraction (Snell's Law) constants are precisely derived.</p>
          </div>
          
          <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
            <b class="text-cyan-400">2. Cauchy's Dispersion Equation:</b>
            <p class="text-slate-300">Refractive index of glass changes with wavelength: <span class="text-cyan-300 font-mono">n(λ) = A + B/λ²</span>. Hence, shorter wavelengths (Blue/Violet) refract more, creating color ring blurring around lens foci termed <b>Chromatic Aberration</b>.</p>
          </div>

          <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
            <b class="text-cyan-400">3. Silvering of Thin Lenses:</b>
            <p class="text-slate-200">Coating one spherical lens edge with silver creates equivalent reflecting devices. Power is computed as:</p>
            <div class="bg-slate-950 p-2 text-center text-cyan-300 font-mono rounded border border-slate-850">
              P_eq = 2 * P_Lens + P_Mirror
            </div>
            <p class="text-slate-400">Since the device ultimately reflects light, it behaves as an equivalent mirror of focal length: <span class="text-cyan-350 font-mono font-bold">F_eq = - 1 / P_eq</span>.</p>
          </div>
        </div>
      `
    }
  ];
}

// =========================================================================
// 2. DYNAMIC COMPULSORY QUESTION BANK GENERATOR (MCQS & ASSERTIONS)
// =========================================================================

// Generates exactly 100 high-quality MCQ questions based on grades
export function getCompetitionQB_MCQs(grade: '8th' | '10th'): QuizQuestion[] {
  const isJunior = grade === '8th';
  const mcqs: QuizQuestion[] = [];

  for (let i = 1; i <= 100; i++) {
    let question = "";
    let options: string[] = [];
    let correctAnswer = 0;
    let explanation = "";

    // Math indices to guarantee uniqueness
    const numValue = (i * 3 + 7) % 25 + 5; 
    const uVal = (i * 2 + 10) % 30 + 12; // 12 to 42
    const fVal = (i * 5) % 15 + 10;      // 10 to 25

    if (i <= 20) {
      // SECTION 1: PLANE MIRRORS, MULTIPLE REFLECTIONS & ROTATION
      const theta = [30, 40, 45, 60, 72, 90, 120, 180][i % 8];
      const m = 360 / theta;
      const isEven = m % 2 === 0;
      const nSymmetric = isEven ? m - 1 : m - 1;
      const nAsym = isEven ? m - 1 : Math.round(m);

      if (i % 2 === 0) {
        question = `[Plane Mirrors (Q${i})] Two plane mirrors are placed inclined at an angle of θ = ${theta}° to each other. If an object is placed symmetrically on their bisector, calculate the exact number of images formed.`;
        options = [`${nSymmetric}`, `${nSymmetric + 2}`, `${nSymmetric + 1}`, "Infinite"];
        correctAnswer = 0;
        explanation = `Using the multiple reflection formula: m = 360 / θ = 360 / ${theta} = ${m}. Since${isEven ? " m is an even integer" : " m is an odd integer and the object is placed symmetrically"}, N = (360 / θ) - 1 = ${m} - 1 = ${nSymmetric} images.`;
      } else {
        const rot = (i * 2) % 30 + 5; // 5 to 35
        question = `[Mirror Rotation (Q${i})] A stationary ray of light strikes a plane mirror perpendicular at its contact point. If the mirror is rotated by an angle of ${rot}° around its axis, what is the angle of rotation of the reflected ray?`;
        options = [`${rot}°`, `${rot * 2}°`, `${rot / 2}°`, "90°"];
        correctAnswer = 1;
        explanation = `By mirror rotation theorems, when a mirror is rotated by angle θ while keeping the incident light path fixed, the reflected ray rotates by exactly 2θ. Hence, 2 * ${rot}° = ${rot * 2}°.`;
      }
    } else if (i <= 40) {
      // SECTION 2: SPHERICAL MIRRORS & IMAGE GEOMETRY
      // Avoid division by zero
      const safeU = uVal === fVal ? uVal + 5 : uVal;
      // Mirror math: 1/v = 1/f - 1/u => v = (f * u) / (u - f)
      const uSign = -safeU;
      const fSign = -fVal; // Concave
      const vVal = (fSign * uSign) / (uSign - fSign);
      const vRounded = Math.round(vVal * 10) / 10;
      const mVal = Math.round((-vVal / uSign) * 10) / 10;

      if (i % 2 === 0) {
        question = `[Concave Mirror (Q${i})] An object is placed at a distance of ${safeU} cm in front of a converging concave mirror of focal length ${fVal} cm. Find the position of the image (v) formed.`;
        options = [`${vRounded} cm`, `${vRounded + 5} cm`, `${-vRounded} cm`, "At focus"];
        correctAnswer = 0;
        explanation = `By the mirror formula: 1/v + 1/u = 1/f. Given concave mirror: u = -${safeU} cm, f = -${fVal} cm. Substituting values: 1/v = 1/(-${fVal}) - 1/(-${safeU}) = -1/${fVal} + 1/${safeU}. Solving gives v = ${vRounded} cm.`;
      } else {
        question = `[Convex Mirror (Q${i})] A convex rear-view mirror of focal length ${fVal} cm has a vehicle placed at a distance of ${safeU} cm from its pole. Calculate the magnification (m) of the virtual image.`;
        // convex mirror: u = -safeU, f = +fVal
        const vConv = (fVal * (-safeU)) / ((-safeU) - fVal);
        const mConvRounded = Math.round((-vConv / (-safeU)) * 100) / 100;
        options = [`+${mConvRounded}`, `-${mConvRounded}`, `+${(mConvRounded * 2).toFixed(2)}`, "Infinite"];
        correctAnswer = 0;
        explanation = `For a convex mirror: u = -${safeU} cm, f = +${fVal} cm. 1/v = 1/f - 1/u = 1/${fVal} + 1/${safeU}, solving gives v = ${Math.round(vConv * 10) / 10} cm. Magnification m = -v/u = -(${Math.round(vConv * 10) / 10}) / (-${safeU}) = +${mConvRounded}.`;
      }
    } else if (i <= 60) {
      // SECTION 3: REFRACTION, REFACTIVE INDICES & SNELL'S / TIR
      const nMedium = Math.round((1.2 + (i % 6) * 0.1) * 100) / 100; // 1.2 to 1.7
      const speed = Math.round((3.0 / nMedium) * 100) / 100;
      const criticalAngle = Math.round(Math.asin(1 / nMedium) * (180 / Math.PI) * 10) / 10;

      if (i % 2 === 0) {
        question = `[Refraction (Q${i})] Light waves strike a pristine glass crystal block with absolute refractive index n = ${nMedium}. calculate the speed of light inside the block.`;
        options = [`${speed} x 10^8 m/s`, `${(speed + 0.5).toFixed(2)} x 10^8 m/s`, "3.0 x 10^8 m/s", "1.5 x 10^8 m/s"];
        correctAnswer = 0;
        explanation = `Refractive index is defined as n = c / v. Hence, the speed of light inside the medium is v = c / n = (3.0 x 10^8) / ${nMedium} = ${speed} x 10^8 m/s.`;
      } else {
        question = `[TIR Physics (Q${i})] A light beam travels from an optically dense crystal of index n = ${nMedium} out toward air (n = 1.0). What is the critical angle (θc) of incidence below which refraction ceases?`;
        options = [`${criticalAngle}°`, `${(criticalAngle - 5).toFixed(1)}°`, `${(criticalAngle + 5).toFixed(1)}°`, "90°"];
        correctAnswer = 0;
        explanation = `By the formulas of TIR: sin(θc) = 1 / n = 1 / ${nMedium}. Therefore, θc = sin^-1(1 / ${nMedium}) = ${criticalAngle}°. If angle of incidence exceeds this, Total Internal Reflection occurs.`;
      }
    } else if (i <= 80) {
      // SECTION 4: PRISMS & GLASS SLABS & DISPERSION
      const prismA = 60;
      const devMin = 30 + (i % 11); // 30 to 40
      const nPrismRounded = Math.round(Math.sin(((prismA + devMin) / 2) * (Math.PI / 180)) / Math.sin((prismA / 2) * (Math.PI / 185)) * 100) / 100;

      if (i % 2 === 0) {
        question = `[Prisms (Q${i})] A triangular crown glass prism of angle A = ${prismA}° exhibits an angle of minimum deviation δm = ${devMin}°. Find the refractive index of this glass.`;
        options = [`n = ${nPrismRounded}`, `n = ${(nPrismRounded - 0.2).toFixed(2)}`, `n = ${(nPrismRounded + 0.3).toFixed(2)}`, "1.33"];
        correctAnswer = 0;
        explanation = `Refractive index of a prism at minimum deviation is: n = sin((A + δm) / 2) / sin(A / 2). Substituting A = ${prismA}° and δm = ${devMin}°: n = sin((${prismA} + ${devMin}) / 2) / sin(${prismA} / 2) = sin(${Math.round((prismA + devMin) / 2)}°) / sin(${prismA / 2}°) ≈ ${nPrismRounded}.`;
      } else {
        const thickness = (i % 5) + 3; // 3 to 7
        const apparentShift = Math.round((thickness * (1 - 1/1.5)) * 100) / 100;
        question = `[Glass Slabs (Q${i})] A printed symbol on a sheet of paper is covered by a flat glass slab (n = 1.5) of thickness ${thickness} cm. How high does the symbol appear to be elevated?`;
        options = [`${apparentShift} cm`, `${(apparentShift + 0.4).toFixed(2)} cm`, `${(apparentShift * 2).toFixed(2)} cm`, "0 cm"];
        correctAnswer = 0;
        explanation = `The upward apparent shift (s) is given by: s = t * (1 - 1/n) where t is thickness and n is index. Given t = ${thickness} cm, n = 1.5: s = ${thickness} * (1 - 1/1.5) = ${thickness} * (1 - 2/3) = ${thickness} / 3 ≈ ${apparentShift} cm.`;
      }
    } else {
      // SECTION 5: SPHERICAL LENSES, POWER, OR COMPOSITE SYSTEMS / MYOPIA
      const lensPower1 = (i % 6) + 1; // +1 to +6 D
      const lensPower2 = -(i % 3) - 1; // -1 to -3 D
      const combinedPower = lensPower1 + lensPower2;
      const combinedF = Math.round((100 / combinedPower) * 10) / 10;

      if (i % 2 === 0) {
        question = `[Lens Power (Q${i})] Two thin spherical lenses of optical powers P₁ = +${lensPower1} D and P₂ = ${lensPower2} D are placed in close physical contact. Find the equivalent focal length (F) of the combined system.`;
        options = [`${combinedF} cm`, `${combinedF * 2} cm`, `${(combinedF / 2).toFixed(1)} cm`, "Infinite"];
        correctAnswer = 0;
        explanation = `The total power is the sum of raw individual powers: P_eq = P₁ + P₂ = ${lensPower1} D + (${lensPower2} D) = ${combinedPower} D. The equivalent focal length is given by F_eq = 100 / P_eq = 100 / ${combinedPower} = ${combinedF} cm.`;
      } else {
        const defectDist = (i % 8) * 20 + 80; // 80 to 220 cm
        const myopiaP = Math.round((-100 / defectDist) * 100) / 100;
        question = `[Vision Science (Q${i})] A hypermetric or myopic student cannot see distant stars clearly beyond a far point of ${defectDist} cm. What type of corrective lens and power is needed?`;
        options = [`Concave lens, ${myopiaP} D`, `Convex lens, +${Math.abs(myopiaP)} D`, `Concave lens, ${(myopiaP - 0.5).toFixed(2)} D`, "Plane glass, 0 D"];
        correctAnswer = 0;
        explanation = `To correct myopia, the person requires a diverging concave lens so that its focal length equals the person's far point: f = -${defectDist} cm. Power P = 100 / f = 100 / (-${defectDist}) = ${myopiaP} D.`;
      }
    }

    mcqs.push({
      id: i,
      question: isJunior ? question.replace(/JEE\/NEET|JEE & NEET|JEE/g, "Olympiad") : question,
      options,
      correctAnswer,
      explanation
    });
  }

  return mcqs;
}

// Generates exactly 50 high-quality Assertion-Reason questions
export function getCompetitionQB_Assertions(grade: '8th' | '10th'): AssertionReasonQuestion[] {
  const isJunior = grade === '8th';
  const assertions: AssertionReasonQuestion[] = [];

  for (let i = 1; i <= 50; i++) {
    let assertion = "";
    let reason = "";
    let correctOption: 'A' | 'B' | 'C' | 'D' = 'A';
    let explanation = "";

    // 5 modules cyclic distribution
    if (i <= 10) {
      // PLANE MIRRORS
      if (i % 3 === 0) {
        assertion = `In a periscope, the two plane mirrors are placed parallel facing each other inclined at an angle of 45° to the light path.`;
        reason = `Angled mirrors tilted at 45° ensure light turns ninety degrees twice, allowing sight line elevation.`;
        correctOption = 'A';
        explanation = `Both the assertion and the reason are true, and the reason correctly explains why the mirrors are titled at 45° to achieve a double 90° turn and elevate the line of sight.`;
      } else if (i % 3 === 1) {
        assertion = `When an object is placed between two parallel plane mirrors, an infinite number of images are formed.`;
        reason = `The image formed in one plane mirror acts as a virtual object for the other mirror, creating infinite back-and-forth reflections.`;
        correctOption = 'A';
        explanation = `Both statements are correct. The virtual object reflection chain is the exact physical mechanism behind parallel image generation.`;
      } else {
        assertion = `If a plane mirror is rotated by 10°, the reflected ray of light rotates by exactly 10°.`;
        reason = `According to the laws of reflection, the angle of reflection is always strictly equal to the angle of incidence.`;
        correctOption = 'D';
        explanation = `The assertion is false (the reflected ray rotates by 2θ = 20°), while the reason is a true statement of optical law. Hence, choice D.`;
      }
    } else if (i <= 20) {
      // SPHERICAL MIRRORS
      if (i % 3 === 0) {
        assertion = `Dentists use a small concave mirror to check cavities inside a patient's mouth.`;
        reason = `A concave mirror always forms a virtual and magnified image of an object if the object is placed very close (between P and F).`;
        correctOption = 'A';
        explanation = `Both statements are true. Concave mirrors act as magnifying mirrors for objects placed inside their focal length, making it ideal for dental examination.`;
      } else if (i % 3 === 1) {
        assertion = `A convex mirror is widely used as a safety rearview mirror in vehicles.`;
        reason = `Convex mirrors always form real, inverted, and magnified images.`;
        correctOption = 'C';
        explanation = `The assertion is true, but the reason is false: convex mirrors always form virtual, erect, and smaller (diminished) images, which is why they provide a wide field of view.`;
      } else {
        assertion = `The focal length of a concave spherical mirror of radius 40 cm is exactly -20 cm.`;
        reason = `Focal length of a spherical mirror is always half of its radius of curvature, and it is negative for converging concave mirrors.`;
        correctOption = 'A';
        explanation = `Both are true, and the formula f = R/2 with proper sign convention directly derives the assertion.`;
      }
    } else if (i <= 30) {
      // REFRACTION & TIR
      if (i % 3 === 0) {
        assertion = `An optical fiber cable can transmit light signals through extremely twisted and curved configurations without escaping.`;
        reason = `The light signals travel by undergoing continuous Total Internal Reflections (TIR) at the core-cladding boundary glass interface.`;
        correctOption = 'A';
        explanation = `Both are true, and continuous TIR is the physical reason why light remains piped inside the curved optical fiber.`;
      } else if (i % 3 === 1) {
        assertion = `The stars appear to twinkle in a clear night sky.`;
        reason = `The atmosphere's refractive index fluctuates constantly due to wind, shifting the apparent star position.`;
        correctOption = 'A';
        explanation = `Both are true, as atmospheric turbulence causes rapid modifications in refraction, making the star light fluctuate in brightness and position (twinkle).`;
      } else {
        assertion = `The critical angle of a glass-to-air interface is larger for blue violet light than for red light.`;
        reason = `Violet light has a shorter wavelength and encounters a higher refractive index in glass, traveling slower.`;
        correctOption = 'D';
        explanation = `The assertion is false. Because n_violet > n_red, and sin(θc) = 1/n, the critical angle is smaller for violet and larger for red. The reason itself is a true wave statement. Hence D.`;
      }
    } else if (i <= 40) {
      // PRISMS & SLABS & LENSES
      if (i % 3 === 0) {
        assertion = `A rectangular glass slab does not disperse white light into a rainbow, but a triangular prism does.`;
        reason = `In a rectangular glass slab, the opposite refracting faces are parallel, causing emerging color rays to merge back parallel and reconstitute.`;
        correctOption = 'A';
        explanation = `Both statements are true. Non-parallel face wedge configurations in prisms allow separation of wave paths, while slabs recombine them parallel.`;
      } else if (i % 3 === 1) {
        assertion = `A concave lens is also termed a diverging lens and always forms smaller virtual images.`;
        reason = `A concave lens is thicker in the center and thinner at its edges.`;
        correctOption = 'C';
        explanation = `The assertion is true, but the reason is false: a concave lens is thinner in the middle and thicker at its outer edges. Hence, choice C.`;
      } else {
        assertion = `If two thin lenses of powers +3 D and -1 D are placed in contact, the combination behaves as a converging lens of focal length +50 cm.`;
        reason = `Equivalent power is the algebraic sum P = P₁ + P₂ = +2 D, and corresponding focal length is F = 100 / P = +50 cm.`;
        correctOption = 'A';
        explanation = `Both statements are true and the reason provides the exact step-by-step mathematical derivation of the focal length value.`;
      }
    } else {
      // INSTRUMENTS, DEFECTS & WAVE PRINCIPLES
      if (i % 3 === 0) {
        assertion = `To design an elite astronomical telescope with high magnifying power, the objective lens focal length (f_o) should be as large as possible.`;
        reason = `Magnification in normal adjustment for a refracting telescope is given by M = - (f_o / f_e).`;
        correctOption = 'A';
        explanation = `Both are true and the mathematical formula directly explains why maximizing objective focal length f_o boosts magnifying power.`;
      } else if (i % 3 === 1) {
        assertion = `A person with myopia cannot view distant traffic clearly, but can read textbooks comfortably.`;
        reason = `Myopia is corrected by using a converging convex lens.`;
        correctOption = 'C';
        explanation = `The assertion is true, but the reason is false: myopia is a near-sighted condition corrected using a diverging concave lens. Convex lenses correct hypermetropia.`;
      } else {
        assertion = `When a glass lens is silvered on one of its curved faces, the composite system acts as an equivalent mirror.`;
        reason = `Light travels refractively through the glass first, reflects from the back mirror face, and refracts again back to the source side.`;
        correctOption = 'A';
        explanation = `Both are true and the double refraction-reflection cycle is the actual mechanical pathway reinforcing compiled mirror behavior.`;
      }
    }

    assertions.push({
      id: i,
      assertion: isJunior ? assertion.replace(/JEE\/NEET|JEE & NEET|JEE/g, "Olympiad") : assertion,
      reason: isJunior ? reason.replace(/JEE\/NEET|JEE & NEET|JEE/g, "Olympiad") : reason,
      correctOption,
      explanation
    });
  }

  return assertions;
}

// Generates exactly 50 high-quality Self-Assessment questions (+2, -0.5 points marking scale)
export function getCompetitionSelfAssessment(grade: '8th' | '10th'): QuizQuestion[] {
  const isJunior = grade === '8th';
  const saQuestions: QuizQuestion[] = [];

  for (let i = 1; i <= 50; i++) {
    // Generate 50 unique questions with step-by-step explanations
    const fUnit = 10 + (i % 6) * 5; // 10, 15, 20, 25, 30, 35
    const uUnit = fUnit * 2 - (i % 4) * 2; // Near C or F
    const hObj = 5 + (i % 3) * 5;     // 5, 10, 15 cm

    let question = "";
    let options: string[] = [];
    let correctAnswer = 0;
    let explanation = "";

    if (i <= 10) {
      // PLANE MIRROR / GEOM TRICKS
      const speedV = (i % 4) + 2; // 2 to 5 m/s
      const appSpeed = 2 * speedV;
      question = `A boy runs at a speed of ${speedV} m/s straight toward a vertical plane mirror. At what speed does he approach his reflected image?`;
      options = [`${speedV} m/s`, `${appSpeed} m/s`, `${speedV / 2} m/s`, "0 m/s"];
      correctAnswer = 1;
      explanation = `Since the distance of the object from the mirror equals the distance of the image behind the mirror, the relative speed of approach between boy and image is double his speed relative to the mirror itself. Speed = 2 * ${speedV} = ${appSpeed} m/s.`;
    } else if (i <= 25) {
      // SPHERICAL MIRROR FORMED COMPUTATION
      // Concave: u = -uUnit, f = -fUnit. v = u*f/(u-f)
      const uSign = -uUnit;
      const fSign = -fUnit;
      const vVal = (uSign * fSign) / (uSign - fSign);
      const vRounded = Math.round(vVal * 10) / 10;
      const mVal = Math.round((-vVal / uSign) * 100) / 100;
      const hImg = Math.round((mVal * hObj) * 10) / 10;

      question = `An object of height ${hObj} cm is placed at u = -${uUnit} cm in front of a concave mirror of focal length ${fUnit} cm. Find the height of the image (hi) formed.`;
      options = [`${hImg} cm`, `${-hImg} cm`, `${(hImg + 3).toFixed(1)} cm`, "At focus"];
      correctAnswer = 0;
      explanation = `1. Use mirror formula: 1/v + 1/u = 1/f => 1/v = 1/(-${fUnit}) - 1/(-${uUnit}) = -1/${fUnit} + 1/${uUnit}. This gives v = ${vRounded} cm. 2. Magnification m = -v/u = -(${vRounded}) / (-${uUnit}) = ${mVal}. 3. Since height of image hi = m * ho = ${mVal} * ${hObj} = ${hImg} cm.`;
    } else if (i <= 35) {
      // REFRACTION & REFR INDEX
      const nWater = 1.33;
      const glassN = Math.round((1.45 + (i % 5) * 0.05) * 100) / 100; // 1.45 to 1.65
      const relativeN = Math.round((glassN / nWater) * 100) / 100;

      question = `Calculate the relative refractive index of glass of n_g = ${glassN} relative to water of n_w = 1.33.`;
      options = [`${relativeN}`, `${Math.round((nWater / glassN)*100)/100}`, `${(relativeN + 0.3).toFixed(2)}`, "1.00"];
      correctAnswer = 0;
      explanation = `The relative refractive index of medium 2 (glass) with respect to medium 1 (water) is: w_n_g = n_g / n_w = ${glassN} / 1.33 = ${relativeN}.`;
    } else {
      // LENS OR EYE DEFECT / POWER SYSTEM
      const myPower = (i % 5) + 2; // 2 to 6
      const correctF = Math.round((100 / myPower) * 10) / 10;

      question = `A convergent biconvex lens of power P = +${myPower} D is used as a reading magnifier. Find its active focal length (f) in cm.`;
      options = [`${correctF} cm`, `${-correctF} cm`, `${(correctF + 5).toFixed(1)} cm`, "Infinite"];
      correctAnswer = 0;
      explanation = `Power of lens (P) in Dioptres is: P = 100 / f (in cm). Therefore, f = 100 / P = 100 / +${myPower} = ${correctF} cm. Since it is convex (converging), focal length is positive.`;
    }

    saQuestions.push({
      id: i,
      question: isJunior ? question.replace(/JEE\/NEET|JEE & NEET|JEE/g, "Olympiad") : question,
      options,
      correctAnswer,
      explanation
    });
  }

  return saQuestions;
}

// Fallback legacy exports for backward compatibility
export const COMPETITION_MCQS: QuizQuestion[] = getCompetitionQB_MCQs('10th').slice(0, 50);
export const COMPETITION_SELF_ASSESSMENT: QuizQuestion[] = getCompetitionSelfAssessment('10th');
