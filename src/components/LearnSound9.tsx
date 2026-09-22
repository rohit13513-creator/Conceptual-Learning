import React, { useState } from "react";
import { Award, HelpCircle, ChevronLeft, ChevronRight, FlaskConical, Zap, Waves, Ear, Volume2, Network, Trophy, Lightbulb, Radio } from "lucide-react";
import { SoundChainDiagram, WaveTermsDiagram, VfLambdaDiagram, PitchLoudnessDiagram, SpeedMediaDiagram, EchoDiagram, HearingRangeDiagram, SonarDiagram, SoundMindMap } from "./sound9Diagrams";

// Notes for the chapter "Sound Waves: Characteristics and Applications". Simple words, short sentences, point by point.

const IMG_BASE = "/diagrams/sound9/";
interface Pic { file: string; alt: string; caption: string; }
type SvgKey = "chain" | "terms" | "vf" | "pitch" | "speed" | "echo" | "range" | "sonar" | "mind";

type Block =
  | { t: "card"; title: string; body: React.ReactNode[] }
  | { t: "h"; text: string }
  | { t: "ul"; items: React.ReactNode[] }
  | { t: "facts"; rows: [string, React.ReactNode][] }
  | { t: "compare"; left: string; right: string; rows: [string, string][] }
  | { t: "remember"; title: string; body: React.ReactNode }
  | { t: "img"; pic: Pic }
  | { t: "imgs"; pics: Pic[] }
  | { t: "svg"; key: SvgKey; caption: string }
  | { t: "exq"; n: number; q: string; a: string }
  | { t: "activity"; title: string; aim: string; steps: string[]; observation: string; conclusion: string }
  | { t: "done"; items: string[] }
  | { t: "p"; body: React.ReactNode };

interface Topic { id: string; title: string; category: string; heading: string; sub: string; blocks: Block[]; }

const b = (s: string) => <b>{s}</b>;

const TOPICS: Topic[] = [
  {
    id: "intro",
    title: "1. Sound Around Us",
    category: "Production",
    heading: "Sound Around Us",
    sub: "We hear sound every day. How is it made and how does it reach us?",
    blocks: [
      { t: "card", title: "Core Idea", body: [
        <>Sound helps us know what is happening around us: voices, birds, waves, leaves rustling, phones ringing, horns, music and thunder.</>,
        <>Sound is a form of {b("energy")}. Energy cannot be created or destroyed, it only changes form. So some other form of energy must change into sound energy.</>,
        <>Here we find out {b("how sound is made")}, {b("how it travels")} and {b("how we use it")}.</>,
      ] },
      { t: "img", pic: { file: "space-astronauts", alt: "Two astronauts working outside a space station above the Earth", caption: "Can astronauts talk to each other during a spacewalk?" } },
      { t: "h", text: "Think About These" },
      { t: "ul", items: [
        <>Two astronauts repair a space station arm. Can they hear each other or the clanking of metal?</>,
        <>How do most bats find their prey in the dark?</>,
        <>You will find both answers as you read on.</>,
      ] },
    ],
  },
  {
    id: "production",
    title: "2. Production of Sound",
    category: "Production",
    heading: "Production of Sound",
    sub: "Sound is produced by vibrating objects.",
    blocks: [
      { t: "img", pic: { file: "taal", alt: "A small pair of metal cymbals called taal", caption: "A taal: metal that rings when struck" } },
      { t: "activity", title: "Activity: Rubber band on a box", aim: "To see what makes sound.", steps: [
        "Take a cardboard box open on one side. Stretch a rubber band across the open side.",
        "Pluck the rubber band. Do you hear a sound? Is the band moving?",
        "Wait until the band stops moving. Do you still hear the sound?",
        "Change the tension (stretch it more or less) and pluck again. What changes?",
        "Take the band off the box, stretch it between two fingers and pluck it near your ear.",
      ], observation: "Sound is heard only while the band vibrates. When it stops, the sound stops. A tighter band gives a different sound.", conclusion: "Sound is produced by vibrations." },
      { t: "img", pic: { file: "rubber-band-box", alt: "A hand plucking a rubber band stretched across a box", caption: "A plucked rubber band makes sound" } },
      { t: "ul", items: [
        <>{b("Vibration")} means a to and fro motion (oscillation) of an object.</>,
        <>The object that makes the sound is called the {b("source")} of sound.</>,
        <>A stretched string, a struck metal, a membrane, and a column of air (as in a bansuri) can all vibrate and make sound.</>,
        <>Most musical instruments have more than one vibrating part.</>,
      ] },
      { t: "h", text: "How Humans and Animals Make Sound" },
      { t: "img", pic: { file: "vocal-cords", alt: "The larynx with vocal cords open and closed", caption: "Vocal cords in the voice box (larynx)" } },
      { t: "ul", items: [
        <>Touch your throat while you talk. You can feel vibrations.</>,
        <>In humans, sound comes from the vibration of the {b("vocal cords")}, which are tight muscular flaps in the voice box (larynx).</>,
        <>The tongue, lips, mouth and nose help turn the sound into speech or music.</>,
        <>Grasshoppers and crickets make sound by rubbing their wings or legs together.</>,
      ] },
      { t: "h", text: "The Tuning Fork" },
      { t: "img", pic: { file: "tuning-fork", alt: "A tuning fork with prongs and stem and a rubber pad", caption: "A tuning fork and a rubber pad" } },
      { t: "ul", items: [
        <>A {b("tuning fork")} is a U-shaped metal bar with a stem. The two sides of the U are called {b("prongs")} (or tines).</>,
        <>It is usually made of steel or aluminium. It gives nearly a single frequency.</>,
        <>Strike a prong gently on a soft rubber pad. Never strike it on a hard surface.</>,
      ] },
      { t: "imgs", pics: [
        { file: "tuning-fork-strike", alt: "A hand striking a tuning fork on a rubber pad", caption: "Striking a tuning fork on a rubber pad" },
        { file: "fork-water", alt: "A vibrating prong touching the surface of water and making ripples", caption: "A vibrating prong makes ripples in water" },
      ] },
      { t: "ul", items: [
        <>Bring the vibrating fork near your ear: you hear a sound.</>,
        <>Touch a vibrating prong to water: ripples form. This shows the prongs are really vibrating.</>,
      ] },
      { t: "remember", title: "Remember", body: <>Every sound has a vibrating source. No vibration, no sound.</> },
    ],
  },
  {
    id: "medium",
    title: "3. How Sound Travels",
    category: "Propagation",
    heading: "Propagation of Sound: It Needs a Medium",
    sub: "Sound travels through solids, liquids and gases, but not through empty space.",
    blocks: [
      { t: "card", title: "Medium", body: [
        <>The material through which sound travels is called a {b("medium")}. It can be a solid, a liquid or a gas.</>,
        <>A space with no matter is called a {b("vacuum")}.</>,
      ] },
      { t: "svg", key: "chain", caption: "Sound goes from the source, through a medium, to the ear" },
      { t: "activity", title: "Activity: Listen through a desk", aim: "To see if sound travels in solids.", steps: [
        "Stand at a desk while a friend gently scratches or knocks on the other side. Listen with your ear in the air.",
        "Now put your ear on the desk, and close your other ear. Listen again.",
      ], observation: "The sound is heard clearly through the desk.", conclusion: "Sound travels through solids." },
      { t: "img", pic: { file: "desk-listen", alt: "A girl listening with her ear on a table while a friend taps the other side", caption: "Listening to sound through a table" } },
      { t: "activity", title: "Activity: Spoons in water", aim: "To see if sound travels in liquids.", steps: [
        "Tap two metal spoons together in air and listen.",
        "Now dip the spoons in a tub of water, without touching the sides or bottom, and tap them again.",
      ], observation: "You still hear the sound of the spoons.", conclusion: "Sound travels through water (a liquid) and then air to reach you." },
      { t: "img", pic: { file: "spoons-water", alt: "Tapping two spoons in air and under water", caption: "Two spoons tapped (a) in air and (b) in water" } },
      { t: "h", text: "Sound Cannot Travel in a Vacuum" },
      { t: "img", pic: { file: "bell-jar", alt: "An electric bell inside a glass jar connected to a vacuum pump", caption: "The vacuum bell jar experiment" } },
      { t: "ul", items: [
        <>An electric bell rings inside a glass jar. Note how loud it is.</>,
        <>A vacuum pump sucks the air out. The sound gets fainter and fainter.</>,
        <>When almost all the air is gone, you see the bell ringing but hear almost nothing.</>,
        <>Let the air back in: the sound slowly returns to its first loudness.</>,
        <>So sound {b("needs a medium")}. It cannot travel in a vacuum.</>,
      ] },
      { t: "remember", title: "Astronauts", body: <>Outer space is nearly a vacuum. So astronauts on a spacewalk cannot hear each other or the clank of metal. They talk through special devices in their suits.</> },
    ],
  },
  {
    id: "wave",
    title: "4. Sound Waves",
    category: "Propagation",
    heading: "Sound Waves",
    sub: "Compressions and rarefactions moving through a medium.",
    blocks: [
      { t: "activity", title: "Activity: A slinky", aim: "To see how a disturbance travels in a medium.", steps: [
        "Mark one turn of a slinky with a marker. Lay it flat on a table. A friend holds one end.",
        "Give your end a sharp push towards your friend and pull it back.",
        "Push and pull many times in a row. Watch the marked turn.",
      ], observation: "Regions where the turns are close together and regions where they are spread out travel along the slinky. The marked turn only moves back and forth in its place.", conclusion: "The disturbance travels, but the parts of the slinky do not travel with it. Sound moves the same way in a medium." },
      { t: "img", pic: { file: "slinky", alt: "A slinky with close turns and spread turns and a marked turn", caption: "A disturbance moving along a slinky" } },
      { t: "h", text: "A Piston in a Tube" },
      { t: "img", pic: { file: "piston-tube", alt: "A tube of air with a piston making compressions and rarefactions", caption: "Air in a tube with an oscillating piston" } },
      { t: "ul", items: [
        <>When the piston is still, the air has an even density, the {b("average density")}.</>,
        <>Piston moves {b("forward")}: it pushes air particles together. This small region of higher density is a {b("compression (C)")}.</>,
        <>Piston moves {b("backward")}: particles spread out. This region of lower density is a {b("rarefaction (R)")}.</>,
        <>Colliding particles pass the compression or rarefaction forward. The particles themselves only vibrate about their mean position.</>,
        <>An oscillating piston makes compressions and rarefactions one after the other.</>,
      ] },
      { t: "card", title: "Definition of a Sound Wave", body: [
        <>A {b("sound wave")} is a disturbance of alternate compressions and rarefactions moving through a medium, without the particles of the medium flowing along.</>,
        <>The direction in which the wave moves is called the {b("direction of propagation")}.</>,
      ] },
      { t: "remember", title: "Important", body: <>The particles of the medium do not travel with the wave. They only vibrate about their mean positions. It is the {b("energy")} that is carried forward.</> },
      { t: "h", text: "Longitudinal Waves" },
      { t: "img", pic: { file: "longitudinal-wave", alt: "A longitudinal wave with particles vibrating along the direction of the wave", caption: "A longitudinal wave: particles vibrate along the direction of travel" } },
      { t: "ul", items: [
        <>In sound, the particles vibrate {b("parallel")} to the direction the wave moves. Such waves are {b("longitudinal waves")}.</>,
        <>Waves that need a material medium are {b("mechanical waves")}. Sound is a mechanical wave.</>,
      ] },
      { t: "h", text: "Transverse Waves and Beyond" },
      { t: "img", pic: { file: "transverse-wave", alt: "A transverse wave with particles vibrating at right angles to the direction of the wave", caption: "A transverse wave: particles vibrate at right angles to the direction of travel" } },
      { t: "compare", left: "Longitudinal wave", right: "Transverse wave", rows: [
        ["Particles vibrate parallel to the direction of the wave", "Particles vibrate at right angles to the direction of the wave"],
        ["Made of compressions and rarefactions", "Made of crests and troughs"],
        ["Example: sound in air", "Example: ripples on water, light (light needs no medium)"],
      ] },
      { t: "ul", items: [
        <>Earthquakes make seismic waves in the Earth. They can be longitudinal or transverse. The longitudinal ones reach the seismograph first.</>,
        <>Light is a transverse wave that can travel through a vacuum. That is why sunlight reaches us.</>,
      ] },
      { t: "h", text: "Waves Spread in All Directions" },
      { t: "img", pic: { file: "spherical-waves", alt: "Compressions and rarefactions spreading in circles from a point source", caption: "Sound from a small source spreads in all directions as spherical waves" } },
      { t: "ul", items: [
        <>A small source sends sound in all directions. The waves spread out like a growing sphere.</>,
        <>Firecrackers and thunder make a sudden loud pulse. Air or gas is heated fast and expands suddenly, sending out a disturbance.</>,
        <>A jet moving faster than sound (a supersonic plane) makes a loud sound called a {b("sonic boom")}.</>,
      ] },
      { t: "img", pic: { file: "supersonic-jet", alt: "A supersonic jet in flight", caption: "A supersonic aircraft" } },
    ],
  },
  {
    id: "energy",
    title: "5. Energy of Sound",
    category: "Propagation",
    heading: "Energy of Sound Waves",
    sub: "Sound carries energy. Microphones and speakers change it into other forms.",
    blocks: [
      { t: "activity", title: "Activity: Dancing grains", aim: "To show that sound carries energy.", steps: [
        "Stretch a balloon sheet tightly over a wide bowl. Fix it with tape or a rubber band.",
        "Sprinkle rice, semolina or salt evenly on the sheet.",
        "Make a loud sound near the bowl (for example hit a metal plate with a beater) without touching the sheet.",
        "Try a louder sound and a softer sound.",
      ], observation: "The grains jump and move. A louder sound makes them jump higher.", conclusion: "Sound reaches the sheet through the air and makes it vibrate. So sound is energy, and a larger amplitude carries more energy." },
      { t: "img", pic: { file: "grains-sheet", alt: "A metal plate struck near a bowl with a sheet and grains on top", caption: "Sound makes grains on a sheet move" } },
      { t: "ul", items: [
        <>The source transfers energy to the medium. Particles vibrate and collide, and pass the energy along.</>,
        <>In a sound wave the {b("energy")} moves forward, not the particles.</>,
        <>Particles of a medium are never fully still. They always move a little because of heat. A sound wave adds to this motion for a short time.</>,
      ] },
      { t: "h", text: "Microphone and Speaker" },
      { t: "img", pic: { file: "mic-speaker", alt: "A microphone and a loudspeaker", caption: "(a) A microphone (b) a speaker" } },
      { t: "ul", items: [
        <>A {b("microphone")} changes sound energy into electrical energy. Sound makes a thin sheet (diaphragm) vibrate and this becomes an electrical signal.</>,
        <>A {b("speaker")} does the opposite. An electrical signal makes a cone vibrate and it makes sound.</>,
      ] },
    ],
  },
  {
    id: "graph",
    title: "6. Graph of a Sound Wave",
    category: "Wave terms",
    heading: "Graphical Representation of a Sound Wave",
    sub: "Show the changing density as a wave.",
    blocks: [
      { t: "img", pic: { file: "density-graph", alt: "Compressions and rarefactions above a graph of density against distance with crests and troughs", caption: "Density of the medium (a) and its graph against distance (b)" } },
      { t: "ul", items: [
        <>At one instant, the density of the medium goes up and down along the path of the wave.</>,
        <>Plot {b("distance")} on the x-axis and {b("density")} on the y-axis. The average density is a dashed line.</>,
        <>In a compression the density goes above the average. The highest point is the {b("crest")}.</>,
        <>In a rarefaction the density goes below the average. The lowest point is the {b("trough")}.</>,
        <>You can also plot density against time at one fixed point.</>,
      ] },
      { t: "svg", key: "terms", caption: "Crest, trough, wavelength and amplitude on a wave graph" },
    ],
  },
  {
    id: "terms",
    title: "7. Wavelength, Frequency, Period",
    category: "Wave terms",
    heading: "Wavelength, Frequency and Time Period",
    sub: "The main quantities that describe a sound wave.",
    blocks: [
      { t: "facts", rows: [
        ["Wavelength (λ)", "The distance between two consecutive crests or two consecutive troughs. SI unit: metre (m)"],
        ["Frequency (f)", "The number of density oscillations per second at a fixed point. SI unit: hertz (Hz), 1 Hz = 1 per second"],
        ["Time period (T)", "The time for one complete oscillation at a fixed point. SI unit: second (s)"],
        ["Relation", "f = 1 / T. A shorter period means a higher frequency"],
      ] },
      { t: "img", pic: { file: "wavelength-long-short", alt: "A wave with a long wavelength and a wave with a short wavelength", caption: "(a) Long wavelength (b) short wavelength" } },
      { t: "ul", items: [
        <>One complete oscillation: the density at a fixed point goes from maximum to minimum and back to maximum.</>,
        <>Everyday sounds have a mixture of many frequencies. A tuning fork or careful whistling gives nearly one frequency.</>,
        <>Each musical note (Sa, Re, Ga, Ma...) has its own frequency. Sa has the lowest and the others rise.</>,
        <>A thin rubber band vibrates faster than a thick one, so it has a higher frequency and a shorter time period.</>,
      ] },
      { t: "card", title: "Speed, Wavelength and Frequency", body: [
        <>In one time period T the wave moves one wavelength λ. So speed v = λ / T.</>,
        <>Since f = 1 / T, we get {b("v = f × λ")}.</>,
        <>speed = frequency × wavelength</>,
      ] },
      { t: "svg", key: "vf", caption: "Triangle for v, f and λ" },
      { t: "h", text: "Solved Examples" },
      { t: "exq", n: 1, q: "There are 10 density oscillations in 2 s at a place. Find the frequency and the time period.", a: "Frequency = number of oscillations / time = 10 / 2 = 5 Hz. Time period = 1 / 5 = 0.2 s." },
      { t: "exq", n: 2, q: "Human hearing goes from 20 Hz to 20 kHz. Find the wavelengths in air. (speed of sound 344 m/s)", a: "λ = v / f. For 20 Hz: λ = 344 / 20 = 17.2 m. For 20000 Hz: λ = 344 / 20000 = 0.0172 m = 1.72 cm." },
      { t: "exq", n: 3, q: "A sound wave in steel has a wavelength of 50 m and the speed of sound in steel is 5000 m/s. Find the frequency and the time period.", a: "f = v / λ = 5000 / 50 = 100 Hz. T = 1 / f = 1 / 100 = 0.01 s." },
      { t: "img", pic: { file: "steel-wave-graph", alt: "Graph of a sound wave in steel with distance in metres", caption: "A sound wave in steel" } },
      { t: "remember", title: "Careful", body: <>If the frequency of the source changes, the wavelength changes but the speed in the same medium stays the same.</> },
    ],
  },
  {
    id: "amplitude",
    title: "8. Amplitude and Intensity",
    category: "Wave terms",
    heading: "Amplitude and Intensity",
    sub: "How big the wave is and how much energy it carries.",
    blocks: [
      { t: "card", title: "Amplitude", body: [
        <>The {b("amplitude")} of a sound wave is the biggest change in density (in a compression or a rarefaction) from the average density.</>,
        <>A bigger change in density means a bigger amplitude, and the wave carries {b("more energy")}.</>,
      ] },
      { t: "img", pic: { file: "amplitude-waves", alt: "A low amplitude sound wave and a high amplitude sound wave", caption: "(a) Low amplitude (b) High amplitude" } },
      { t: "card", title: "Intensity", body: [
        <>{b("Intensity")} is the amount of sound energy passing through a unit area, at right angles to the direction of travel, in one second.</>,
      ] },
      { t: "img", pic: { file: "intensity-spread", alt: "Sound spreading from a point source over larger and larger areas", caption: "The same energy spreads over a larger area as it moves away" } },
      { t: "ul", items: [
        <>As the wave moves away from the source, the same energy spreads over a bigger area. So the intensity {b("falls with distance")}.</>,
        <>A sound that starts with a larger amplitude has more energy and goes a longer distance before it fades away.</>,
        <>Hit the metal plate harder in the grain activity: more energy, bigger jumps.</>,
      ] },
    ],
  },
  {
    id: "speed",
    title: "9. Speed of Sound",
    category: "Wave terms",
    heading: "Speed of Sound",
    sub: "How fast the compressions and rarefactions move.",
    blocks: [
      { t: "card", title: "Definition", body: [
        <>The {b("speed of sound")} is the distance a point on the wave (such as a crest) moves in one second.</>,
        <>{b("v = f × λ")} (or v = λ / T).</>,
      ] },
      { t: "ul", items: [
        <>Sound is {b("fastest in solids")}, slower in liquids and {b("slowest in gases")}.</>,
        <>Sound is about 4 to 5 times faster in water than in air, and about 15 to 20 times faster in solids than in air.</>,
        <>In air the speed {b("increases with temperature")} and with {b("humidity")}.</>,
        <>In dry air the speed is about {b("331 m/s at 0 °C")} and about {b("344 m/s at 22 °C")}.</>,
        <>In most media the speed depends on the medium only, not on the source or the frequency.</>,
      ] },
      { t: "svg", key: "speed", caption: "Speed of sound at 15 °C in air, water and steel" },
      { t: "facts", rows: [
        ["Steel (solid)", "about 5000 m/s"],
        ["Water (liquid)", "about 1500 m/s"],
        ["Air (gas)", "about 340 m/s"],
      ] },
      { t: "h", text: "Solved Examples" },
      { t: "exq", n: 1, q: "In a thunderstorm you hear the thunder 5 s after seeing the lightning. How far is the lightning? (speed of sound 340 m/s; light is almost instant)", a: "Distance = v × t = 340 × 5 = 1700 m, so the lightning struck about 1.7 km away." },
      { t: "remember", title: "Why lightning is seen first", body: <>Light moves at 300 000 km/s. Sound moves at only 340 m/s. So the flash reaches us almost at once and the thunder comes later.</> },
    ],
  },
  {
    id: "perception",
    title: "10. Pitch, Loudness, Hearing",
    category: "Hearing",
    heading: "How We Hear Sound: Pitch and Loudness",
    sub: "Our experience of sound is not exactly the same as its physical properties.",
    blocks: [
      { t: "ul", items: [
        <>Time period, wavelength, frequency, amplitude and speed can be measured.</>,
        <>How we {b("feel")} a sound is personal. We use words like pitch and loudness for it.</>,
      ] },
      { t: "svg", key: "pitch", caption: "Pitch goes with frequency, loudness goes with amplitude" },
      { t: "card", title: "Pitch", body: [
        <>{b("Pitch")} is how we feel the frequency of a sound.</>,
        <>A whistle or a siren is {b("shrill")}: high pitch, high frequency. Thunder or an aircraft rumble is {b("deep")}: low pitch, low frequency.</>,
        <>Male, female and children's voices differ in frequency and also in how the throat, mouth and nose shape the sound. In teenage boys the vocal cords get longer and thicker, vibrate slower and the voice becomes deeper.</>,
      ] },
      { t: "card", title: "Loudness", body: [
        <>{b("Loudness")} is how we feel the amplitude of a sound. A larger amplitude sounds louder. Loudness falls as we move away from the source.</>,
        <>Intensity can be measured. Loudness depends on the listener's ears too.</>,
        <>Loudness is measured in {b("decibels (dB)")}: rustling leaves a few dB, normal talk about 60 dB, firecrackers over 100 dB.</>,
      ] },
      { t: "h", text: "Range of Hearing" },
      { t: "svg", key: "range", caption: "Infrasonic, audible and ultrasonic sound" },
      { t: "ul", items: [
        <>Humans hear from {b("20 Hz to 20 000 Hz (20 kHz)")}. It varies from person to person and gets smaller with age.</>,
        <>Below 20 Hz: {b("infrasonic")} waves. Above 20 kHz: {b("ultrasonic")} waves. We cannot hear either.</>,
        <>Dogs, cats, bats and dolphins hear ultrasound. Elephants hear infrasound.</>,
      ] },
      { t: "h", text: "Noise" },
      { t: "ul", items: [
        <>Unwanted or harmful sound is {b("noise")}. Noise pollution is a serious problem.</>,
        <>Loud sound for a long time harms health, sleep and hearing, and can cause hearing loss. An audiogram tests hearing.</>,
        <>A hearing aid has a microphone, an amplifier and a speaker.</>,
      ] },
      { t: "h", text: "The Human Ear" },
      { t: "img", pic: { file: "ear", alt: "A diagram of the human ear with the eardrum and cochlea", caption: "The human ear" } },
      { t: "ul", items: [
        <>Sound makes the thin {b("eardrum")} vibrate.</>,
        <>Tiny bones make the vibrations bigger. The {b("cochlea")} changes them into electrical signals for the brain.</>,
        <>Two ears help us find the direction of a sound from the tiny time gap between the two ears.</>,
        <>Snakes and fish feel vibrations through their bodies. Some insects have ear-like parts on their bodies.</>,
      ] },
    ],
  },
  {
    id: "quality",
    title: "11. Tone, Note and Timbre",
    category: "Hearing",
    heading: "Tone, Musical Note and Timbre",
    sub: "Why a flute and a tabla sound different at the same pitch.",
    blocks: [
      { t: "img", pic: { file: "tone-note", alt: "The clean wave of a tuning fork tone and the complex wave of a child singing", caption: "(a) A tone from a tuning fork (b) a note from a singing child" } },
      { t: "ul", items: [
        <>A {b("tone")} has a single frequency, like a tuning fork or whistling.</>,
        <>A {b("musical note")} (plucking a tanpura, or singing) is a mixture: the lowest frequency, called the {b("fundamental")}, plus higher frequencies called {b("overtones")}.</>,
        <>{b("Timbre")} is the quality that makes a flute, ektara and tabla sound different even for the same note at the same loudness. It comes from the shape, material and build of the instrument, which decide the overtones.</>,
        <>An {b("octave")} is the gap between two notes where one has double the frequency of the other, for example 200 Hz and 400 Hz.</>,
        <>Sitar, sarangi and veena have extra strings to enrich the sound.</>,
      ] },
      { t: "img", pic: { file: "tabla", alt: "A pair of tabla drums", caption: "A tabla set" } },
      { t: "ul", items: [
        <>Tabla and mridangam have a black patch in the middle of the drum skin, called {b("syaahi")}. It changes how the skin vibrates and gives a rich variety of sound.</>,
      ] },
      { t: "img", pic: { file: "raman", alt: "Portrait of Sir C. V. Raman", caption: "Sir C. V. Raman" } },
      { t: "ul", items: [
        <>Sir C. V. Raman won India's first Nobel Prize in Science for the Raman Effect in light. He also studied how the tabla and mridangam make their rich sounds.</>,
      ] },
      { t: "ul", items: [
        <>In Kongthong, a village near Shillong, every person has a tune as a name. It is called Jingrwai Iawbei.</>,
      ] },
    ],
  },
  {
    id: "reflection",
    title: "12. Echo and Reverberation",
    category: "Reflection",
    heading: "Reflection of Sound: Echo and Reverberation",
    sub: "Sound bounces off hard surfaces.",
    blocks: [
      { t: "card", title: "Reflection", body: [
        <>Sound bounces back from solids and liquids. This is {b("reflection of sound")}.</>,
        <>It follows the same laws as light: the angle of incidence equals the angle of reflection, and the incident sound, the reflected sound and the normal all lie in one plane.</>,
      ] },
      { t: "h", text: "Echo" },
      { t: "ul", items: [
        <>Shout near a cliff or in a long empty hall and you hear your voice again. This is an {b("echo")}.</>,
        <>We can hear two sounds as separate only if the gap between them is at least {b("0.1 s")}.</>,
        <>Sound at 340 m/s covers 340 × 0.1 = 34 m in 0.1 s. That is the trip to the wall and back.</>,
        <>So the wall must be at least {b("17 m")} away to hear an echo.</>,
        <>Hard smooth surfaces give strong echoes. Curtains and soft things absorb sound. Rough surfaces scatter it.</>,
      ] },
      { t: "svg", key: "echo", caption: "An echo: the sound goes to the wall and back" },
      { t: "card", title: "Distance from an Echo", body: [
        <>{b("distance = v × t / 2")} (the sound covers the distance twice)</>,
      ] },
      { t: "exq", n: 1, q: "You clap in an empty corridor and hear an echo after 0.5 s. How far is the wall? (speed of sound 340 m/s)", a: "Distance = v × t / 2 = 340 × 0.5 / 2 = 85 m." },
      { t: "h", text: "Reverberation" },
      { t: "ul", items: [
        <>In a big hall the sound reflects many times from the walls. The sound lasts after the source stops. This is {b("reverberation")}.</>,
        <>It happens when the reflected sounds arrive with a gap of less than about 0.05 s.</>,
        <>Too much reverberation makes the sound garbled. Halls use sound-absorbing panels, cushioned chairs and curtains to reduce it.</>,
        <>Modern concert halls are built to keep a pleasant amount of reverberation.</>,
        <>The Whispering Gallery of Gol Gumbaz in Bijapur (Karnataka) lets a whisper be heard many times across the big dome.</>,
      ] },
      { t: "compare", left: "Echo", right: "Reverberation", rows: [
        ["A separate repeat of the sound (gap of 0.1 s or more)", "Sound seems to last longer (gap less than 0.05 s)"],
        ["Needs a distant reflector, at least 17 m away", "Happens in halls with many reflections"],
        ["Used in sonar and echolocation", "Reduced with soft materials"],
      ] },
    ],
  },
  {
    id: "uses",
    title: "13. Uses of Ultrasound and Infrasound",
    category: "Uses",
    heading: "Ultrasonic and Infrasonic Waves and Their Uses",
    sub: "Sound outside the audible range is very useful.",
    blocks: [
      { t: "img", pic: { file: "sound-applications", alt: "A chart of uses of infrasonic, audible and ultrasonic sound waves", caption: "Uses of sound waves of different frequencies" } },
      { t: "facts", rows: [
        ["Infrasonic (below 20 Hz)", "Detect earthquakes and volcanic eruptions. Detect severe storms, since these waves travel far through air and the Earth"],
        ["Audible (20 Hz to 20 kHz)", "Ultrasonography (scans of internal organs) is done with ultrasound"],
        ["Ultrasonic (above 20 kHz)", "Scans without surgery, breaking kidney stones, ultrasonic welding, cleaning delicate parts, finding flaws inside metal blocks, locating objects by reflected waves"],
      ] },
      { t: "h", text: "Echolocation" },
      { t: "img", pic: { file: "bat-echolocation", alt: "A bat sending ultrasonic waves that reflect off prey", caption: "A bat uses echolocation" } },
      { t: "ul", items: [
        <>Bats hunt at night. They send short bursts of ultrasound. The waves reflect from objects and the bat senses the echoes.</>,
        <>From the echoes the bat finds where obstacles and prey are. This is called {b("echolocation")}.</>,
        <>Dolphins, whales and some birds also use echolocation.</>,
      ] },
      { t: "h", text: "Sonar" },
      { t: "img", pic: { file: "sonar", alt: "A ship sending ultrasonic waves that reflect from a submarine", caption: "Sonar: sound navigation and ranging" } },
      { t: "ul", items: [
        <>{b("Sonar")} means sound navigation and ranging. A ship sends ultrasonic waves into water and studies the echoes.</>,
        <>This gives the distance, direction and speed of submarines, shipwrecks and the sea bed.</>,
        <>Sound travels much farther in water than light does, so it is used for underwater work.</>,
      ] },
      { t: "svg", key: "sonar", caption: "Depth from a sonar signal" },
      { t: "exq", n: 1, q: "A sonar signal sent into seawater returns after 0.90 s. The speed of sound in seawater is 1530 m/s. How far is the object?", a: "The signal goes to the object and back, so the one-way time is 0.90 / 2 = 0.45 s. Distance = 1530 × 0.45 = 688.5 m." },
      { t: "h", text: "Drones and Audio Surveillance" },
      { t: "img", pic: { file: "drone", alt: "A drone in the air", caption: "A drone" } },
      { t: "ul", items: [
        <>Drones and aircraft hum with low frequency sound from their motors. Sound sensors can pick this up even when the drone is far or hard to see. This is called audio surveillance and it helps guard airspace.</>,
      ] },
      { t: "remember", title: "Sound explores the unseen", body: <>Space probes have recorded the first sounds from Mars. Scientists use the sound of far earthquakes to measure small changes in ocean temperature. Even the tiny crackles of soil microbes are studied to check soil health.</> },
    ],
  },
  {
    id: "mindmap",
    title: "14. Mind Map",
    category: "Revision",
    heading: "Mind Map of the Topic",
    sub: "The whole topic on one page.",
    blocks: [
      { t: "svg", key: "mind", caption: "Mind map: sound" },
      { t: "h", text: "Formulas at a Glance" },
      { t: "facts", rows: [
        ["Speed of a wave", "v = f × λ"],
        ["Frequency and period", "f = 1 / T"],
        ["Distance from an echo or sonar", "d = v × t / 2"],
        ["Distance from thunder", "d = v × t (light is instant)"],
        ["Echo condition", "Gap of at least 0.1 s, so a wall at least 17 m away"],
        ["Audible range", "20 Hz to 20 kHz"],
        ["Order of speed", "solid > liquid > gas"],
      ] },
    ],
  },
  {
    id: "competitive-1",
    title: "15. Competitive Corner: Ideas",
    category: "Advanced",
    heading: "Competitive Corner",
    sub: "The main topic is enough for school exams. These ideas take you one step further.",
    blocks: [
      { t: "card", title: "Speed of sound in air and temperature", body: [
        <>For air, the speed rises by about 0.6 m/s for each 1 °C rise in temperature. That fits 331 m/s at 0 °C and about 344 m/s at 22 °C.</>,
        <>The speed of sound in air does not depend on the pressure (if temperature stays the same), and it is a little more in moist air because moist air is lighter.</>,
      ] },
      { t: "card", title: "Change of medium", body: [
        <>When a sound wave goes from one medium into another, its {b("frequency stays the same")} (it is set by the source). The speed changes, so the {b("wavelength changes")}: λ = v / f.</>,
        <>From air into water the speed goes up about 4 to 5 times, so the wavelength also goes up about 4 to 5 times.</>,
      ] },
      { t: "card", title: "Doppler effect (idea)", body: [
        <>When a source of sound moves towards you, you hear a higher pitch. When it moves away, you hear a lower pitch. This is the {b("Doppler effect")}. The siren of an ambulance sounds higher as it comes near and lower as it goes away.</>,
      ] },
      { t: "facts", rows: [
        ["Mach number", "speed of an object / speed of sound. Above 1 it is supersonic and makes a sonic boom"],
        ["Intensity level", "Measured in decibels: every 10 dB step means 10 times the intensity"],
        ["Beats", "Two sounds of nearly equal frequency together give a rise and fall in loudness. Beat frequency = difference of the two frequencies"],
        ["Resonance", "An object vibrates strongly when a sound of its own natural frequency reaches it"],
        ["Quality of sound", "Depends on the overtones present (timbre)"],
        ["Ultrasound scan", "Waves above 20 kHz reflect at the boundaries of tissues and make an image"],
        ["Tone quality of a string", "A shorter, thinner, tighter string gives a higher frequency"],
        ["Two-way distance", "Radar and sonar use time delay: distance = speed × time / 2"],
        ["Sound and heat", "Sound needs a medium, so the sun's heat and light (which need none) reach us but not its sound"],
        ["Loudness scale", "Whisper about 30 dB, talk 60 dB, traffic 80 dB, firecracker over 100 dB"],
      ] },
      { t: "remember", title: "Exam traps", body: <>(1) Sound cannot travel in a vacuum. (2) Particles do not travel with the wave. (3) For echo and sonar use d = v t / 2. (4) Frequency does not change when the medium changes, wavelength does. (5) Pitch goes with frequency, loudness with amplitude. (6) Sound is longitudinal, not transverse. (7) Speed is largest in solids.</> },
    ],
  },
  {
    id: "competitive-2",
    title: "16. Competitive Corner: Solved",
    category: "Advanced",
    heading: "Solved Practice Questions",
    sub: "Try each one on paper first. Then check.",
    blocks: [
      { t: "exq", n: 1, q: "A tuning fork of frequency 256 Hz makes a sound in air where the speed is 344 m/s. Find the wavelength. What is the wavelength if the same sound goes into water where the speed is 1500 m/s?", a: "In air: λ = 344 / 256 = 1.34 m. In water the frequency is the same, 256 Hz: λ = 1500 / 256 = 5.86 m. The wavelength grows because the speed is more." },
      { t: "exq", n: 2, q: "A man fires a gun near a cliff and hears the echo after 3 s. The speed of sound is 340 m/s. How far is the cliff?", a: "d = v × t / 2 = 340 × 3 / 2 = 510 m." },
      { t: "exq", n: 3, q: "A boat sends a sonar pulse and gets the echo from the sea bed after 2.4 s. The speed of sound in seawater is 1500 m/s. Find the depth.", a: "d = 1500 × 2.4 / 2 = 1800 m." },
      { t: "exq", n: 4, q: "A person standing between two cliffs claps once. He hears the first echo after 2 s and the second after 3 s. The speed of sound is 340 m/s. Find the distance between the cliffs.", a: "First cliff: 340 × 2 / 2 = 340 m. Second cliff: 340 × 3 / 2 = 510 m. Distance between the cliffs = 340 + 510 = 850 m." },
      { t: "exq", n: 5, q: "A sound wave has a frequency of 500 Hz and a wavelength of 0.68 m. Find its speed and the time it takes to cover 1.7 km.", a: "v = f × λ = 500 × 0.68 = 340 m/s. Time = 1700 / 340 = 5 s." },
      { t: "exq", n: 6, q: "A ship's sonar sends a pulse of frequency 40 kHz in water (speed 1500 m/s). Find the wavelength of the pulse.", a: "λ = v / f = 1500 / 40000 = 0.0375 m = 3.75 cm." },
      { t: "exq", n: 7, q: "A bat sends an ultrasonic pulse and receives the echo from an insect after 0.02 s. The speed of sound in air is 340 m/s. How far is the insect?", a: "d = v × t / 2 = 340 × 0.02 / 2 = 3.4 m." },
      { t: "exq", n: 8, q: "A hammer strikes a steel rail. A listener 1700 m away hears the sound through the rail and also through the air. Find the time gap between the two sounds. (air 340 m/s, steel 5000 m/s)", a: "Time in air = 1700 / 340 = 5 s. Time in steel = 1700 / 5000 = 0.34 s. Time gap = 5 - 0.34 = 4.66 s. The sound in the rail arrives first." },
    ],
  },
  {
    id: "complete",
    title: "17. Topic Complete",
    category: "Complete",
    heading: "Topic Complete",
    sub: "Well done. Check what you can now do.",
    blocks: [
      { t: "done", items: [
        "I can say that sound is made by vibrations and name some sources.",
        "I can show that sound needs a medium and explain the bell jar experiment.",
        "I can explain compressions and rarefactions, and why sound is a longitudinal wave.",
        "I can read a density-distance graph and name crest, trough and wavelength.",
        "I can use f = 1 / T and v = f × λ.",
        "I can explain amplitude, intensity, pitch, loudness and timbre.",
        "I can say the range of hearing and the meaning of infrasonic and ultrasonic.",
        "I can explain echo, reverberation, sonar and echolocation and solve problems with d = v × t / 2.",
      ] },
      { t: "facts", rows: [
        ["Speed of a wave", "v = f × λ"],
        ["Time period", "T = 1 / f"],
        ["Echo or sonar", "d = v × t / 2"],
        ["Audible range", "20 Hz to 20 kHz"],
        ["Echo needs", "A gap of 0.1 s, a wall at least 17 m away"],
      ] },
      { t: "remember", title: "What to do next", body: <>Go to the Question Bank for practice. Then take the Self Assessment quiz to check how well you know the topic. If you make mistakes, come back to the topic and read it again.</> },
    ],
  },
];

const ICONS: Record<string, React.ElementType> = { Production: Volume2, Propagation: Waves, "Wave terms": Zap, Hearing: Ear, Reflection: Radio, Uses: Radio, Revision: Network, Advanced: Award, Complete: Trophy };

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#0a1a1f] border border-cyan-500/15 p-5 rounded-2xl space-y-3 shadow-md">
    <div className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-cyan-400" /><h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 font-mono">{title}</h3></div>
    <div className="space-y-3 text-sm font-semibold leading-relaxed text-slate-300">{children}</div>
  </div>
);
const RememberBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-amber-950/20 border border-amber-500/10 p-4 rounded-xl space-y-1.5 font-sans font-semibold">
    <h5 className="font-bold text-amber-400 font-mono text-[12.5px] uppercase tracking-wider flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {title}</h5>
    <div className="text-[14px] leading-relaxed">{children}</div>
  </div>
);
const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 text-[12.5px] font-black uppercase tracking-wider text-cyan-300 font-mono"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span>{children}</span></div>
);
const FactRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-sm text-slate-300 font-semibold"><span className="text-white font-black">{label}:</span> <span>{children}</span></div>
);
const CompareTable: React.FC<{ left: string; right: string; rows: [string, string][]; isLightMode: boolean }> = ({ left, right, rows, isLightMode }) => (
  <div className={`overflow-hidden rounded-xl border ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
    <div className={`grid grid-cols-2 text-[12.5px] font-black uppercase tracking-wider ${isLightMode ? "bg-slate-800 text-white" : "bg-cyan-950/50 text-cyan-300"}`}>
      <div className="px-3 py-2 border-r border-slate-700/50">{left}</div><div className="px-3 py-2">{right}</div>
    </div>
    <div className={`divide-y ${isLightMode ? "divide-slate-200" : "divide-slate-800"}`}>
      {rows.map(([l, r], i) => (
        <div key={i} className={`grid grid-cols-2 text-[14px] font-semibold ${isLightMode ? "odd:bg-white even:bg-slate-50" : "odd:bg-slate-950 even:bg-slate-900/60"}`}>
          <div className={`px-3 py-2 border-r ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>{l}</div><div className="px-3 py-2">{r}</div>
        </div>
      ))}
    </div>
  </div>
);
const PicCard: React.FC<{ pic: Pic; isLightMode: boolean }> = ({ pic, isLightMode }) => (
  <figure className="space-y-2 m-0">
    <div className={`rounded-2xl border p-3 shadow-lg bg-white flex items-center justify-center ${isLightMode ? "border-slate-200" : "border-slate-700"}`}>
      <img src={IMG_BASE + pic.file + ".webp"} alt={pic.alt} loading="lazy" className="w-auto h-auto max-w-full max-h-[440px] object-contain" />
    </div>
    <figcaption className="text-center text-[13px] font-bold text-slate-500">{pic.caption}</figcaption>
  </figure>
);
const ExampleQ: React.FC<{ n: number; q: string; a: string }> = ({ n, q, a }) => (
  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
    <p className="text-sm font-bold leading-relaxed"><span className="text-cyan-400 font-mono">Q{n}.</span> {q}</p>
    <p className="text-sm font-semibold leading-relaxed"><span className="text-emerald-400 font-black">Answer: </span>{a}</p>
  </div>
);

function renderSvg(key: SvgKey) {
  switch (key) {
    case "chain": return <SoundChainDiagram />;
    case "terms": return <WaveTermsDiagram />;
    case "vf": return <VfLambdaDiagram />;
    case "pitch": return <PitchLoudnessDiagram />;
    case "speed": return <SpeedMediaDiagram />;
    case "echo": return <EchoDiagram />;
    case "range": return <HearingRangeDiagram />;
    case "sonar": return <SonarDiagram />;
    case "mind": return <SoundMindMap />;
  }
}

function renderBlock(block: Block, i: number, isLightMode: boolean) {
  switch (block.t) {
    case "card": return <InfoCard key={i} title={block.title}>{block.body.map((p, j) => <p key={j}>{p}</p>)}</InfoCard>;
    case "h": return <SectionHeading key={i}>{block.text}</SectionHeading>;
    case "p": return <p key={i} className="text-sm font-semibold leading-relaxed">{block.body}</p>;
    case "ul": return <ul key={i} className="list-disc pl-5 text-sm font-semibold leading-relaxed space-y-2">{block.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
    case "facts": return <div key={i} className="grid grid-cols-1 gap-2.5">{block.rows.map(([l, r], j) => <FactRow key={j} label={l}>{r}</FactRow>)}</div>;
    case "compare": return <CompareTable key={i} left={block.left} right={block.right} rows={block.rows} isLightMode={isLightMode} />;
    case "remember": return <RememberBox key={i} title={block.title}>{block.body}</RememberBox>;
    case "img": return <PicCard key={i} pic={block.pic} isLightMode={isLightMode} />;
    case "imgs": return <div key={i} className={`grid grid-cols-1 gap-4 ${block.pics.length > 1 ? "sm:grid-cols-2" : ""}`}>{block.pics.map((p) => <PicCard key={p.file} pic={p} isLightMode={isLightMode} />)}</div>;
    case "exq": return <ExampleQ key={i} n={block.n} q={block.q} a={block.a} />;
    case "svg": return (
      <figure key={i} className="space-y-2 m-0">
        <div className={`rounded-2xl border p-3 shadow-lg bg-white overflow-x-auto ${isLightMode ? "border-slate-200" : "border-slate-700"}`}>
          <div className={block.key === "mind" ? "min-w-[640px]" : ""}>{renderSvg(block.key)}</div>
        </div>
        <figcaption className="text-center text-[13px] font-bold text-slate-500">{block.caption}</figcaption>
      </figure>
    );
    case "activity": return (
      <div key={i} className={`rounded-2xl border p-5 space-y-4 shadow-md ${isLightMode ? "bg-white border-slate-200" : "bg-[#0a1a1f] border-cyan-500/15"}`}>
        <div className="flex items-start gap-2.5"><FlaskConical className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" /><h3 className="text-base font-black leading-snug">{block.title}</h3></div>
        <p className="text-sm font-semibold leading-relaxed"><span className="text-cyan-400 font-black">Aim: </span>{block.aim}</p>
        <SectionHeading>Steps</SectionHeading>
        <ol className="list-decimal pl-5 text-sm font-semibold leading-relaxed space-y-1.5">{block.steps.map((s, j) => <li key={j}>{s}</li>)}</ol>
        <RememberBox title="What you see">{block.observation}</RememberBox>
        <RememberBox title="What it shows">{block.conclusion}</RememberBox>
      </div>
    );
    case "done": return (
      <div key={i} className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3">
        <div className="flex items-center gap-2"><Trophy className="w-6 h-6 text-emerald-400" /><h3 className="text-base font-black text-emerald-300">You have finished Sound</h3></div>
        <ul className="space-y-2">
          {block.items.map((it, j) => (
            <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed"><span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-500 text-slate-950 text-[12px] font-black flex items-center justify-center">✓</span><span>{it}</span></li>
          ))}
        </ul>
      </div>
    );
  }
}

interface LearnSound9Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

export function LearnSound9({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnSound9Props) {
  const [activeId, setActiveId] = useState<string>(TOPICS[0].id);
  const idx = Math.max(0, TOPICS.findIndex((t) => t.id === activeId));
  const topic = TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-sound9-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <select value={activeId} onChange={(e) => setActiveId(e.target.value)} className={`w-full min-w-0 rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
          {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><Volume2 className="w-5 h-5 text-cyan-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>Sound</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>How sound is made, how it travels, its properties and uses.</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {TOPICS.map((t) => (
            <button key={t.id} onClick={() => setActiveId(t.id)} className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 ${activeId === t.id ? (isLightMode ? "bg-cyan-50 border border-cyan-300" : "bg-cyan-950/40 border border-cyan-500/30") : "border border-transparent hover:bg-slate-800/40"}`}>
              <span className={`text-[12px] font-black uppercase tracking-widest font-mono block ${activeId === t.id ? "text-cyan-400" : "text-slate-500"}`}>{t.category}</span>
              <span className={`text-sm font-bold ${activeId === t.id ? (isLightMode ? "text-cyan-800" : "text-white") : isLightMode ? "text-slate-700" : "text-slate-300"}`}>{t.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-sound9-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-sound9-main p, #learn-sound9-main li, #learn-sound9-main span, #learn-sound9-main label, #learn-sound9-main div:not(.bg-gradient-to-r) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-sound9-main b, #learn-sound9-main strong, #learn-sound9-main h1, #learn-sound9-main h2, #learn-sound9-main h3, #learn-sound9-main h4, #learn-sound9-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          ${isLightMode ? `#learn-sound9-container .bg-slate-900, #learn-sound9-container .bg-\\[\\#0d1424\\], #learn-sound9-container .bg-\\[\\#0a1a1f\\], #learn-sound9-container .bg-slate-950 { background-color: #ffffff !important; border-color: #cbd5e1 !important; } #learn-sound9-container .border-slate-800 { border-color: #cbd5e1 !important; }` : ""}
        ` }} />
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <span className="text-[12px] font-black uppercase tracking-widest font-mono text-cyan-400 flex items-center gap-1.5">{React.createElement(ICONS[topic.category] || Lightbulb, { className: "w-3.5 h-3.5" })}{topic.category}</span>
            <h1 className="text-2xl font-black tracking-tight leading-tight">{topic.heading}</h1>
            <p className="text-base font-semibold text-slate-400">{topic.sub}</p>
          </div>

          <div className="space-y-6" key={topic.id}>
            {topic.blocks.map((blk, i) => renderBlock(blk, i, isLightMode))}
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
            {idx > 0 ? (
              <button onClick={() => setActiveId(TOPICS[idx - 1].id)} className={navBtn}><ChevronLeft className="w-3 h-3" />Previous Topic</button>
            ) : <div />}
            {idx < TOPICS.length - 1 ? (
              <button onClick={() => setActiveId(TOPICS[idx + 1].id)} className={navBtn}>Next Topic<ChevronRight className="w-3 h-3" /></button>
            ) : (
              <div className="flex flex-wrap gap-3 justify-end w-full sm:w-auto">
                {onCompleteNotes && (
                  <button onClick={onCompleteNotes} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-black text-[14px] cursor-pointer shadow-md border border-cyan-400/30 shrink-0">Complete Notes<ChevronRight className="w-3.5 h-3.5" /></button>
                )}
                {onGoToSelfAssessment && (
                  <button onClick={onGoToSelfAssessment} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-[14px] cursor-pointer shadow-md border border-cyan-400/30 shrink-0">Take Self Assessment Quiz<Award className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
