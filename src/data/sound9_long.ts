import type { LongQuestion, CompetencyQuestion } from "../types-custom";

// ── LONG ANSWER QUESTIONS (5 marks each) ──
export const SOUND9_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "How is sound produced? Describe the rubber band activity and the tuning fork activity to show that sound is produced by vibrations.",
    markingScheme: ["Meaning of vibration (to and fro motion) and that sound is produced by vibrations -- 1 mark", "Rubber band on an open box: pluck it and it vibrates and gives sound -- 1 mark", "When the vibration stops, the sound stops; changing the tension changes the sound -- 1 mark", "Tuning fork struck on a rubber pad gives sound near the ear -- 1 mark", "Vibrating prong touching water makes waves; other sources of sound (strings, air columns, vocal cords) -- 1 mark"],
    answerParts: [
      { part: "Meaning", text: "Vibration is the to and fro motion (oscillation) of an object. Sound is produced by vibrating objects. The object that produces the sound is called the source of the sound." },
      { part: "Rubber band activity", text: "Stretch a rubber band across the open side of a cardboard box and pluck it with a finger. You hear a sound and you can see the band moving to and fro. So the band is vibrating." },
      { part: "Observations", text: "When the band stops vibrating, you do not hear the sound any more. If you stretch the band more or loosen it, the sound changes. This shows that the sound comes only while the band is vibrating." },
      { part: "Tuning fork activity", text: "A tuning fork is a U-shaped metal bar with a stem. Hold it by the stem, strike one prong gently on a soft rubber pad (never on a hard surface) and bring it near your ear. You hear a sound." },
      { part: "Waves in water and other sources", text: "When a vibrating prong touches the surface of water, waves form on the water. This proves the prong is vibrating. Sound can also be made by vibrating strings, membranes and air columns, for example a bansuri, where the air inside the pipe vibrates. In humans, the vocal cords in the throat vibrate to give sound." }
    ]
  },
  {
    id: 2,
    question: "Does sound need a medium? Describe the vacuum bell jar experiment. Also describe the desk activity and the spoon activity to show that sound travels through solids and liquids.",
    markingScheme: ["Meaning of medium and vacuum -- 1 mark", "Bell jar experiment: the sound becomes fainter as air is pumped out -- 1 mark", "Conclusion: sound cannot travel in a vacuum; astronauts use special devices to talk -- 1 mark", "Desk activity: sound is heard through the solid desk -- 1 mark", "Spoon activity: sound is heard through water, so sound travels in liquids -- 1 mark"],
    answerParts: [
      { part: "Medium and vacuum", text: "The material through which sound travels is called a medium. It can be a solid, a liquid or a gas. A space with no matter at all is called a vacuum." },
      { part: "Bell jar experiment", text: "An electric bell is kept inside a bell jar and switched on. We hear its sound. Now the air is slowly pumped out of the jar. The sound becomes fainter and fainter. When almost all the air is gone, we hear almost nothing, even though we can see the bell hammer moving." },
      { part: "Conclusion", text: "When air is let back into the jar, the sound slowly becomes loud again. So sound cannot travel through a vacuum. It needs a medium. In outer space there is almost a vacuum, so astronauts on a spacewalk cannot hear each other directly. They talk through special devices fitted in their suits." },
      { part: "Desk activity", text: "One friend gently knocks on a desk. First listen with your ear in the air. Then put your ear against the desk and close the other ear. You hear the sound clearly through the desk. So sound travels through solids." },
      { part: "Spoon activity", text: "Tap two metal spoons together in air and listen. Now dip both spoons in a full bucket of water (not touching the sides) and tap them again. You still hear the sound. It has come through the water, so sound travels through liquids too." }
    ]
  },
  {
    id: 3,
    question: "Describe the slinky activity. Explain with a tube and a piston how compressions and rarefactions are formed and why the particles of air only oscillate and do not travel with the wave.",
    markingScheme: ["Slinky: push and pull one end, closer turns and spread out turns travel along it -- 1 mark", "The marked turn only moves back and forth about its own position -- 1 mark", "Piston moves forward: air is pushed and a compression (high density) is formed -- 1 mark", "Piston moves back: a rarefaction (low density) is formed; they alternate as the piston oscillates -- 1 mark", "Particles only vibrate about their mean positions; sound wave is a series of compressions and rarefactions moving forward -- 1 mark"],
    answerParts: [
      { part: "Slinky activity", text: "Mark one turn of a slinky. A friend holds one end fixed and you hold the other end. Push it sharply towards your friend and pull it back. You see regions where the turns are close together and regions where they are more spread out. These regions move along the slinky." },
      { part: "The marked turn", text: "The mark on the slinky does not travel with the disturbance. It only moves a little to and fro about its own place, parallel to the direction in which the disturbance moves. Each turn vibrates about its own position while the disturbance goes from one end to the other." },
      { part: "Compression in the tube", text: "Take a long tube of air with a piston at one end. When the piston is at rest, the air has an average density. When the piston moves forward, it pushes the nearby air particles and squeezes them together. This region of higher density is called a compression (C). These particles hit the next ones and so the compression moves forward." },
      { part: "Rarefaction in the tube", text: "When the piston moves back, the air near it becomes thinner. This region of lower density is called a rarefaction (R). As the piston keeps oscillating, compressions and rarefactions are made one after the other and move away from the source." },
      { part: "Particles do not travel", text: "The particles of air only vibrate to and fro about their mean positions. They do not move along with the wave. What travels is the disturbance in density. A sound wave is a series of compressions and rarefactions moving through a medium without the actual flow of the particles of the medium." }
    ]
  },
  {
    id: 4,
    question: "What are longitudinal waves and transverse waves? Write three differences between them with examples. Is sound a mechanical wave?",
    markingScheme: ["Longitudinal wave: particles vibrate parallel to the direction of the wave -- 1 mark", "Transverse wave: particles vibrate at right angles to the direction of the wave -- 1 mark", "Examples: sound is longitudinal; light is transverse (also waves on a rope or string) -- 1 mark", "Differences: compressions and rarefactions versus crests and troughs; medium needed for sound but not for light -- 1 mark", "Mechanical waves need a medium; sound is a mechanical wave; seismic waves can be of both kinds -- 1 mark"],
    answerParts: [
      { part: "Longitudinal wave", text: "In a longitudinal wave, the particles of the medium vibrate to and fro in a direction parallel to the direction in which the wave travels. Sound in air is a longitudinal wave. It has compressions and rarefactions." },
      { part: "Transverse wave", text: "In a transverse wave, the particles vibrate in a direction at right angles (perpendicular) to the direction of the wave. A wave on a shaken rope is an example. Light is also a transverse wave." },
      { part: "Examples", text: "Longitudinal: sound in air, water or steel; the wave in a slinky pushed and pulled along its length. Transverse: a wave in a rope shaken up and down; light waves." },
      { part: "Differences", text: "(1) Direction of particle motion: parallel in a longitudinal wave and perpendicular in a transverse wave. (2) A longitudinal wave forms compressions and rarefactions, while a transverse wave forms crests and troughs. (3) Sound needs a medium to travel, but light, a transverse wave, can travel through a vacuum. This is why sunlight reaches us across empty space." },
      { part: "Mechanical waves", text: "Waves that need a material medium are called mechanical waves. Sound is a mechanical wave. Earthquakes send seismic waves through the Earth, and these can be longitudinal or transverse. The longitudinal ones are detected first by a seismograph." }
    ]
  },
  {
    id: 5,
    question: "Show that sound carries energy. Describe the grains and sheet activity. Also explain how a microphone and a speaker work.",
    markingScheme: ["Setup of the activity: sheet stretched over a container with grains on it -- 1 mark", "A loud sound makes the grains move or jump without touching -- 1 mark", "Conclusion: the source transfers energy through the medium; particles do not travel, energy does -- 1 mark", "Microphone: sound makes the diaphragm vibrate and it is changed to an electrical signal -- 1 mark", "Speaker: an electrical signal makes the cone vibrate and produce sound -- 1 mark"],
    answerParts: [
      { part: "Setup", text: "Stretch a rubber or cellophane sheet tightly over a wide mouthed container. Sprinkle grains such as rice or salt evenly on the sheet." },
      { part: "Observation", text: "Now make a loud sound near it, for example by hitting a metal plate, without touching the sheet. The grains move and jump. If the sound is louder, the grains jump higher." },
      { part: "Conclusion", text: "The sound travelled through the air and made the sheet vibrate, and the sheet made the grains move. So sound is a form of energy. When a source vibrates, it gives energy to the medium. In a sound wave it is the energy that is passed on, not the particles of the medium." },
      { part: "Microphone", text: "A microphone changes sound energy into electrical energy. When we speak into it, the sound waves make a thin membrane called the diaphragm vibrate. These vibrations are changed into an electrical signal." },
      { part: "Speaker", text: "A speaker does the opposite. An electrical signal makes a cone or diaphragm inside the speaker vibrate, and this produces sound. If all parts work well, the sound from the speaker is very close to the sound that was captured." }
    ]
  },
  {
    id: 6,
    question: "Draw and explain the graph of a sound wave. Define crest, trough, wavelength, frequency, time period and amplitude. Write the relations f = 1/T and v = f x λ.",
    markingScheme: ["Graph: density of the medium against distance, with the average density line -- 1 mark", "Crest (highest point, compression) and trough (lowest point, rarefaction) -- 1 mark", "Wavelength (distance between two crests or two troughs, unit metre) and amplitude -- 1 mark", "Frequency (oscillations per second, hertz) and time period (time for one oscillation, second), f = 1/T -- 1 mark", "Speed v = distance/time = λ/T, so v = f x λ; example with units -- 1 mark"],
    answerParts: [
      { part: "The graph", text: "At one instant, the density of the medium changes again and again with distance. We plot distance on the x-axis and density on the y-axis. A dashed horizontal line shows the average density. The curve goes above and below this line like a wave." },
      { part: "Crest and trough", text: "In a compression the density is above the average and the highest point of the curve is called the crest. In a rarefaction the density is below the average and the lowest point is called the trough." },
      { part: "Wavelength and amplitude", text: "The distance between two consecutive crests or two consecutive troughs is the wavelength, written λ (lambda). Its SI unit is the metre (m). The amplitude is the maximum change in density from the average density, in a compression or in a rarefaction." },
      { part: "Frequency and time period", text: "The number of density oscillations per second at a fixed point is the frequency f. Its unit is hertz (Hz), which is 1/s. The time taken for one complete oscillation is the time period T, in seconds. They are opposite to each other: f = 1/T. A shorter time period means a higher frequency." },
      { part: "Speed relation", text: "In one time period T the wave moves forward by one wavelength λ. So speed v = distance/time = λ/T. Since 1/T = f, we get v = f x λ (speed = frequency x wavelength). Example: f = 100 Hz and λ = 3.4 m give v = 340 m/s." }
    ]
  },
  {
    id: 7,
    question: "What are amplitude, loudness and intensity of sound? How are they related? Why does the intensity of sound become less as we go away from the source?",
    markingScheme: ["Amplitude of a sound wave and its link with the energy carried -- 1 mark", "Loudness: how we feel the amplitude; bigger amplitude sounds louder -- 1 mark", "Intensity: sound energy passing through a unit area per unit time -- 1 mark", "Difference: intensity can be measured, loudness depends on the listener's ear -- 1 mark", "Why intensity falls: energy spreads over a larger area as the wave goes away -- 1 mark"],
    answerParts: [
      { part: "Amplitude and energy", text: "The amplitude of a sound wave is the maximum change in the density of the medium compared to the average density. A wave with a larger amplitude carries more energy. When the metal plate is hit harder in the grains activity, the grains jump higher." },
      { part: "Loudness", text: "We feel the amplitude of a sound as its loudness. A sound with a large amplitude is heard loud and a sound with a small amplitude is heard soft. Loudness becomes less as we move away from the source." },
      { part: "Intensity", text: "The amount of sound energy passing through a unit area, placed at right angles to the direction of the wave, in one unit of time, is called the intensity of sound." },
      { part: "Loudness and intensity", text: "In daily talk we use these two words for the same thing, but they are not the same. Intensity is a quantity that can be measured. Loudness is how the listener feels the sound, and it depends on the hearing ability of the listener." },
      { part: "Fall with distance", text: "A sound wave spreads out in all directions from a source. As it goes farther, the same energy is spread over a larger and larger area. The energy passing through each unit area becomes less, so the intensity decreases with distance. A sound with a bigger starting amplitude has more energy and can travel farther before it dies out." }
    ]
  },
  {
    id: 8,
    question: "Explain how the speed of sound is different in solids, liquids and gases. Give the values for steel, water and air. How do temperature and humidity change the speed of sound in air?",
    markingScheme: ["Speed is highest in solids, less in liquids, least in gases -- 1 mark", "Values: steel 5000 m/s, water 1500 m/s, air 340 m/s -- 1 mark", "Water is about 4 to 5 times and solids about 15 to 20 times faster than air -- 1 mark", "Speed in air increases with temperature: 331 m/s at 0 °C and 344 m/s at 22 °C -- 1 mark", "Speed also increases with humidity; speed does not depend on the frequency or source in most media -- 1 mark"],
    answerParts: [
      { part: "Order of speeds", text: "The speed of sound depends on the medium. It is highest in solids, less in liquids and least in gases." },
      { part: "Values", text: "At about 15 °C, the speed of sound is nearly 5000 m/s in steel, 1500 m/s in water and 340 m/s in air. Check: water is 1500/340, about 4.4 times faster than air, and steel is 5000/1500, about 3.3 times faster than water." },
      { part: "Comparison", text: "In general, sound travels about 4 to 5 times faster in water and about 15 to 20 times faster in solids than in air." },
      { part: "Temperature", text: "In air, the speed of sound increases when the temperature increases. In dry air it is about 331 m/s at 0 °C and about 344 m/s at 22 °C." },
      { part: "Humidity and frequency", text: "If the humidity of the air increases, the speed of sound also increases. In most media, such as air, the speed depends only on the medium, not on the source or the frequency. If the frequency changes, the wavelength changes but the speed stays the same." }
    ]
  },
  {
    id: 9,
    question: "Explain pitch, loudness, tone, note, timbre and octave. Why do a flute and a tabla sound different when they play the same note at the same loudness?",
    markingScheme: ["Pitch: how we feel the frequency; high frequency gives high pitch (whistle), low frequency gives low pitch (thunder) -- 1 mark", "Loudness is linked to amplitude -- 1 mark", "Tone is a sound of a single frequency; note is a mixture of a fundamental and overtones -- 1 mark", "Timbre: the quality that makes instruments sound different; it depends on the overtones -- 1 mark", "Octave: two notes with a frequency ratio of 2 (200 Hz and 400 Hz); syaahi of the tabla adds to the variety of sound -- 1 mark"],
    answerParts: [
      { part: "Pitch", text: "Pitch is how our ear and brain feel the frequency of a sound. A shrill sound like a whistle or a siren has a high pitch. A deep sound like thunder has a low pitch. Higher frequency usually means higher pitch." },
      { part: "Loudness", text: "Loudness is how we feel the amplitude of the sound. A bigger amplitude sounds louder. Loudness and pitch are two different things." },
      { part: "Tone and note", text: "A tone is a sound of a single frequency, like that of a tuning fork or a person whistling. A musical note, like the sound of a plucked tanpura string, is a mix of a lowest frequency called the fundamental and higher frequencies called overtones. Together they make a rich and pleasant sound." },
      { part: "Timbre", text: "Even when a flute, an ektara and a tabla play the same note at the same loudness, each sounds different. This quality is called timbre. It comes from the shape, material and make of the instrument, which decide the pattern and strength of the overtones." },
      { part: "Octave and syaahi", text: "An octave is the gap between two notes when one has double the frequency of the other, for example 200 Hz and 400 Hz. Indian drums such as the tabla have a black patch called the syaahi on the drum head. It changes the way the membrane vibrates, so the drum can give a rich variety of sounds." }
    ]
  },
  {
    id: 10,
    question: "What is the audible range of human hearing? What are infrasonic and ultrasonic waves? Give two uses of each and name animals that can hear them.",
    markingScheme: ["Audible range is 20 Hz to 20000 Hz (20 kHz) and it changes from person to person and with age -- 1 mark", "Infrasonic waves have a frequency below 20 Hz -- 1 mark", "Ultrasonic waves have a frequency above 20 kHz -- 1 mark", "Uses of infrasound: detecting earthquakes, volcanic eruptions and storms -- 1 mark", "Uses of ultrasound (scanning, breaking kidney stones, cleaning, finding cracks) and animals (dogs, bats, dolphins; elephants) -- 1 mark"],
    answerParts: [
      { part: "Audible range", text: "Humans can hear sounds with frequencies from 20 Hz to 20000 Hz (20 kHz). This range is different for each person and becomes smaller with age." },
      { part: "Infrasonic waves", text: "Sound waves with a frequency below 20 Hz are called infrasonic waves. We cannot hear them." },
      { part: "Ultrasonic waves", text: "Sound waves with a frequency above 20 kHz are called ultrasonic waves. We cannot hear these either." },
      { part: "Uses of infrasound", text: "Infrasound is used to detect natural events such as earthquakes and volcanic eruptions. It is also used to detect severe storms, because these waves travel very long distances through air and through the Earth." },
      { part: "Uses of ultrasound and animals", text: "Ultrasound is used for imaging the inside of the body (ultrasonography), for breaking kidney stones into small pieces, for cleaning delicate machine parts and welding, for finding defects inside metal blocks, and for locating objects. Dogs, cats, bats and dolphins can hear ultrasound. Elephants can hear infrasound." }
    ]
  },
  {
    id: 11,
    question: "Describe how the human ear works. Name the parts that help in hearing and explain the path of sound from the outside to the brain. Why do we have two ears?",
    markingScheme: ["Sound enters the ear and makes the thin eardrum vibrate -- 1 mark", "Tiny bones make the vibrations stronger -- 1 mark", "The cochlea changes the vibrations into electrical signals -- 1 mark", "Signals go to the brain, which we feel as sound -- 1 mark", "Two ears help the brain find the direction of the sound from the tiny time gap -- 1 mark"],
    answerParts: [
      { part: "Eardrum", text: "Sound waves from the air enter the ear and hit a thin stretched membrane called the eardrum. The changing density of air makes the eardrum vibrate." },
      { part: "Tiny bones", text: "Behind the eardrum there are tiny bones. They quickly make these vibrations stronger and pass them on." },
      { part: "Cochlea", text: "The vibrations reach the cochlea. The cochlea changes them into electrical signals." },
      { part: "To the brain", text: "The electrical signals rush along the nerves to the brain. The brain understands them and we feel them as sound." },
      { part: "Two ears", text: "The sound reaches one ear a tiny bit earlier than the other, often by less than a thousandth of a second. The brain compares this time gap and finds out from which direction the sound came." }
    ]
  },
  {
    id: 12,
    question: "What is reflection of sound? Explain echo. Show that the minimum distance of the reflecting surface to hear an echo is about 17 m. Which surfaces give a good echo?",
    markingScheme: ["Reflection of sound follows the same laws as light (equal angles, same plane) -- 1 mark", "Echo: hearing our own sound again after reflection from a hard surface -- 1 mark", "We can hear two sounds separately if the gap is at least 0.1 s -- 1 mark", "Distance in 0.1 s = 340 x 0.1 = 34 m (going and coming back), so minimum distance is 34/2 = 17 m -- 1 mark", "Hard smooth surfaces give a good echo; soft surfaces absorb and rough surfaces scatter -- 1 mark"],
    answerParts: [
      { part: "Reflection", text: "Sound bounces back when it hits a solid or a liquid surface. This is reflection of sound. It follows the same laws as light: the incident sound and the reflected sound make equal angles with the normal at the point of incidence, and all three lie in the same plane." },
      { part: "Echo", text: "When we shout near a mountain, a cliff or in a long corridor, we hear our voice again after some time. This repeated sound is called an echo." },
      { part: "The 0.1 s rule", text: "Our brain can separate two sounds only if they reach us at least 0.1 s apart. If the gap is less than 0.1 s, we cannot clearly tell them apart. So for an echo, the reflected sound must come back after at least 0.1 s." },
      { part: "Derivation of 17 m", text: "Taking the speed of sound as 340 m/s, the distance travelled in 0.1 s = speed x time = 340 x 0.1 = 34 m. This is the distance from the source to the wall and back. So the wall must be at least 34/2 = 17 m away." },
      { part: "Surfaces", text: "Echoes are strong from hard and smooth surfaces. Soft surfaces like curtains absorb the sound, and rough surfaces scatter it in different directions, so we do not hear a clear echo from them." }
    ]
  },
  {
    id: 13,
    question: "Differentiate between echo and reverberation. Why are reverberations a problem in a large hall, and how are auditoriums designed to control them?",
    markingScheme: ["Echo: a separate repeated sound heard after at least 0.1 s -- 1 mark", "Reverberation: sound stays on because of many reflections arriving less than 0.05 s apart -- 1 mark", "Too much reverberation makes the sound garbled and unclear -- 1 mark", "Design: soft, porous things like curtains, panels and upholstered chairs absorb sound -- 1 mark", "Some reverberation is kept on purpose so that everyone hears speech and music clearly; example of the Gol Gumbaz whispering gallery -- 1 mark"],
    answerParts: [
      { part: "Echo", text: "An echo is heard as a separate sound. The reflected sound reaches us at least 0.1 s after the original sound, from a surface at least 17 m away." },
      { part: "Reverberation", text: "In a large hall the sound is reflected many times from the walls, the floor and the roof. These reflections arrive with a gap of less than 0.05 s, so the sound seems to stay on after the source has stopped. This is reverberation." },
      { part: "The problem", text: "If the reverberation is too much, the sounds mix with each other. Speech and music become garbled and unclear, and the audience cannot follow." },
      { part: "Design of auditoriums", text: "Modern auditoriums and concert halls use sound absorbing panels, upholstered chairs, curtains and other soft, porous surfaces. They absorb the extra reflections and reduce unwanted reverberation." },
      { part: "Desirable reverberation", text: "A little reverberation is kept on purpose so that people sitting everywhere can hear speech and music clearly and without distortion. Old builders also knew this. The Whispering Gallery of the Gol Gumbaz in Bijapur is designed so that even a faint whisper can be heard many times across the big dome." }
    ]
  },
  {
    id: 14,
    question: "Explain echolocation in bats and sonar. A sonar signal sent into seawater returns after 0.90 s. If the speed of sound in seawater is 1530 m/s, find the distance of the object.",
    markingScheme: ["Bats send short bursts of ultrasound and listen to the echoes to find prey and obstacles (echolocation) -- 1 mark", "Dolphins, whales and some birds also use it -- 1 mark", "Sonar: ultrasonic waves are sent into water and the echoes are studied to find distance, direction and speed -- 1 mark", "Time to reach the object = 0.90/2 = 0.45 s -- 1 mark", "Distance = 1530 x 0.45 = 688.5 m -- 1 mark"],
    answerParts: [
      { part: "Echolocation in bats", text: "Bats fly and hunt at night in the dark without hitting anything. They send out short bursts of ultrasonic waves. These waves are reflected from nearby objects. By sensing the echoes, the bat finds the position of obstacles and of its prey. This is called echolocation." },
      { part: "Other animals", text: "Dolphins, whales and some birds also use echolocation to find their way and to hunt." },
      { part: "Sonar", text: "Sonar means sound navigation and ranging. In sonar, ultrasonic waves are sent into water from a ship. The reflected waves are studied to find the distance, direction and speed of underwater objects like submarines and shipwrecks." },
      { part: "Numerical: given and time", text: "Given: total time for going and coming back = 0.90 s, speed v = 1530 m/s. The sound takes half of this time to reach the object: t = 0.90/2 = 0.45 s." },
      { part: "Numerical: distance", text: "Distance = speed x time = 1530 x 0.45 = 688.5 m. The object is 688.5 m away." }
    ]
  },
  {
    id: 15,
    question: "Describe any five applications of ultrasound in medicine and industry. Why are ultrasonic waves useful in these places?",
    markingScheme: ["Ultrasonography: imaging internal organs without surgery -- 1 mark", "Breaking kidney stones into small pieces that pass out of the body -- 1 mark", "Cleaning delicate machine parts and ultrasonic welding in industry -- 1 mark", "Finding cracks or defects inside metal blocks -- 1 mark", "Locating objects by reflection (sonar, parking sensors, drones or aircraft detection) and why: high frequency, short wavelength, can be reflected -- 1 mark"],
    answerParts: [
      { part: "Ultrasonography", text: "Ultrasonic waves are sent into the body and the echoes from the organs are used to make a picture of the inside. Doctors see the organs without any surgery." },
      { part: "Kidney stones", text: "Strong ultrasonic waves can break a kidney stone into small pieces. These small pieces then pass out of the body along with urine." },
      { part: "Cleaning and welding", text: "Industries use ultrasound to clean delicate machine parts and small hard-to-reach places, and for ultrasonic welding." },
      { part: "Testing metal", text: "Ultrasound is used to find cracks and defects inside metal blocks, used in construction and industry. Where there is a hidden crack, the waves are reflected differently." },
      { part: "Locating objects", text: "Ultrasonic waves are used to locate objects when they are reflected back. Sonar finds objects under water, and a parking sensor in a car uses the echo to warn the driver of an obstacle. Ultrasound is useful because it cannot be heard by us, so it causes no disturbance, and it can be sent as a narrow beam and reflected from objects." }
    ]
  },
  {
    id: 16,
    question: "What is noise pollution? Explain the decibel scale with examples. How can loud sounds harm us and what can be done to reduce noise?",
    markingScheme: ["Noise is unwanted or harmful sound; noise pollution is a serious problem -- 1 mark", "Decibel (dB) is the unit of loudness -- 1 mark", "Examples: leaves rustling a few dB, conversation about 60 dB, firecrackers above 100 dB; small rise in dB means a big rise in intensity -- 1 mark", "Harm: bad effect on health, sleep and hearing; loss of hearing tested by audiogram; hearing aid -- 1 mark", "Ways to reduce noise (low volume on earphones, no horns, sound absorbing walls, trees) -- 1 mark"],
    answerParts: [
      { part: "Noise", text: "Unwanted or harmful sound is called noise. Too much noise is called noise pollution. It is a serious problem, especially in cities." },
      { part: "Decibel", text: "The loudness of sound is commonly measured in decibels (dB)." },
      { part: "Examples", text: "Very soft sounds like rustling leaves are only a few dB. A normal conversation is about 60 dB. Very loud sounds like firecrackers can go above 100 dB. Even a small rise in the dB level means a very large rise in the intensity of the sound." },
      { part: "Harm", text: "Loud sound for a long time can harm health, disturb sleep and damage hearing. Long exposure to loud sound can cause hearing loss. Hearing can be checked by an audiogram. A person with hearing loss can use a hearing aid, which has a microphone, an amplifier and a speaker." },
      { part: "Prevention", text: "We can keep the volume of earphones and speakers low, avoid unnecessary honking, avoid firecrackers, plant trees and use sound absorbing walls and windows near noisy places. Loud sound should not be used for a long time." }
    ]
  },
  {
    id: 17,
    question: "(a) If there are 10 density oscillations in 2 s at a given position, find the frequency and the time period. (b) Find the wavelengths in air for 20 Hz and 20 kHz if the speed of sound is 344 m/s. (c) Lightning is seen and thunder is heard 5 s later. Find the distance of the lightning at 340 m/s.",
    markingScheme: ["(a) Frequency = 10/2 = 5 Hz -- 1 mark", "(a) Time period T = 1/5 = 0.2 s -- 1 mark", "(b) λ = v/f = 344/20 = 17.2 m for 20 Hz -- 1 mark", "(b) λ = 344/20000 = 0.0172 m = 1.72 cm for 20 kHz -- 1 mark", "(c) Distance = 340 x 5 = 1700 m = 1.7 km (light reaches almost at once) -- 1 mark"],
    answerParts: [
      { part: "(a) Frequency", text: "Frequency = number of oscillations / time taken = 10 / 2 s = 5 Hz." },
      { part: "(a) Time period", text: "T = 1/f = 1/5 = 0.2 s. Also, one oscillation takes 2 s / 10 = 0.2 s, which is the same." },
      { part: "(b) For 20 Hz", text: "λ = v/f = 344 m/s / 20 Hz = 17.2 m." },
      { part: "(b) For 20 kHz", text: "20 kHz = 20000 Hz. λ = 344 / 20000 = 0.0172 m = 1.72 cm. So the lowest audible sound has a very long wavelength and the highest has a very short one." },
      { part: "(c) Lightning distance", text: "Light travels so fast that we can say we see the flash at once. So the 5 s is the time taken by the sound. Distance = v x t = 340 x 5 = 1700 m. The lightning struck about 1.7 km away." }
    ]
  },
  {
    id: 18,
    question: "(a) A sound wave in steel has a wavelength of 50 m and the speed of sound in steel is 5000 m/s. Find its frequency and time period. (b) You clap in an empty corridor and hear an echo after 0.5 s. If the speed of sound is 340 m/s, find your distance from the wall.",
    markingScheme: ["(a) Formula f = v/λ -- 1 mark", "(a) f = 5000/50 = 100 Hz -- 1 mark", "(a) T = 1/f = 1/100 = 0.01 s -- 1 mark", "(b) The sound goes to the wall and comes back, so distance = v x t / 2 -- 1 mark", "(b) Distance = 340 x 0.5 / 2 = 85 m -- 1 mark"],
    answerParts: [
      { part: "(a) Formula", text: "From v = f x λ, the frequency f = v/λ. Given: v = 5000 m/s and λ = 50 m." },
      { part: "(a) Frequency", text: "f = 5000 / 50 = 100 Hz." },
      { part: "(a) Time period", text: "T = 1/f = 1/100 = 0.01 s." },
      { part: "(b) Method", text: "The clap travels to the wall and then back to you. So the total distance covered by the sound is 2d, where d is the distance of the wall. 2d = v x t." },
      { part: "(b) Answer", text: "2d = 340 x 0.5 = 170 m, so d = 170/2 = 85 m. The wall is 85 m away. This is more than 17 m, so an echo is possible." }
    ]
  },
  {
    id: 19,
    question: "(a) The speed of sound is 5000 m/s in steel, 1500 m/s in water and 340 m/s in air. Find the ratio of the speed in water to that in air, and of steel to water. (b) Two friends stand 340 m apart along a steel fence. One knocks on the fence and the other has her ear on it. Find the time difference between the two sounds and say whether she can tell them apart.",
    markingScheme: ["(a) Water : air = 1500/340 = about 4.4 -- 1 mark", "(a) Steel : water = 5000/1500 = about 3.3 -- 1 mark", "(b) Time in air = 340/340 = 1 s -- 1 mark", "(b) Time in steel = 340/5000 = 0.068 s; difference = 1 - 0.068 = 0.932 s -- 1 mark", "(b) The difference is more than 0.1 s, so she can hear the two sounds separately -- 1 mark"],
    answerParts: [
      { part: "(a) Water to air", text: "Ratio = 1500 / 340 = 4.41, so sound in water is about 4.4 times faster than in air." },
      { part: "(a) Steel to water", text: "Ratio = 5000 / 1500 = 3.33, so sound in steel is about 3.3 times faster than in water." },
      { part: "(b) Time through air", text: "t = distance / speed = 340 / 340 = 1 s." },
      { part: "(b) Time through steel", text: "t = 340 / 5000 = 0.068 s. Time difference = 1 - 0.068 = 0.932 s." },
      { part: "(b) Conclusion", text: "Two sounds can be heard separately if they are at least 0.1 s apart. Here the gap is 0.932 s, which is much more than 0.1 s. So she hears the sound through the steel first, and then the sound through the air, as two different sounds." }
    ]
  },
  {
    id: 20,
    question: "(a) An experiment needs an echo that comes back 0.2 s after the sound is made. What is the minimum distance of the reflecting surface if the speed of sound is 343 m/s? (b) A sonar signal takes 4 s to return from the ocean floor. Find the depth of the ocean if the speed of sound in seawater is 1500 m/s.",
    markingScheme: ["(a) Total distance = 343 x 0.2 = 68.6 m -- 1 mark", "(a) Distance of the surface = 68.6/2 = 34.3 m -- 1 mark", "(b) Time to reach the floor = 4/2 = 2 s -- 1 mark", "(b) Depth = 1500 x 2 = 3000 m -- 1 mark", "Reason for dividing by 2: the sound goes down and comes back up -- 1 mark"],
    answerParts: [
      { part: "(a) Total distance", text: "Distance travelled by the sound in 0.2 s = 343 x 0.2 = 68.6 m." },
      { part: "(a) Distance of the surface", text: "This distance is to the surface and back, so the surface must be at least 68.6/2 = 34.3 m away." },
      { part: "(b) Time one way", text: "The 4 s is for going down and coming back. The sound reaches the ocean floor in 4/2 = 2 s." },
      { part: "(b) Depth", text: "Depth = speed x time = 1500 x 2 = 3000 m. The ocean is 3000 m (3 km) deep at that place." },
      { part: "Why divide by 2", text: "In both parts, the measured time includes the journey to the object and the journey back. So the one-way distance is half of speed x time." }
    ]
  },
  {
    id: 21,
    question: "(a) A source produces a sound wave of wavelength 3.44 m in air where the speed of sound is 344 m/s. Find the time period. (b) A ship looking for a wreck sends a sonar signal and gets the echo after 5 s. If the speed of the ultrasonic wave in seawater is 1525 m/s, how deep is the wreck?",
    markingScheme: ["(a) Frequency f = v/λ = 344/3.44 = 100 Hz -- 1 mark", "(a) Time period T = 1/f = 1/100 = 0.01 s (or T = λ/v) -- 1 mark", "(b) One-way time = 5/2 = 2.5 s -- 1 mark", "(b) Depth = 1525 x 2.5 -- 1 mark", "(b) Depth = 3812.5 m -- 1 mark"],
    answerParts: [
      { part: "(a) Frequency", text: "f = v/λ = 344 / 3.44 = 100 Hz." },
      { part: "(a) Time period", text: "T = 1/f = 1/100 = 0.01 s. Check with T = λ/v = 3.44/344 = 0.01 s." },
      { part: "(b) One-way time", text: "The signal goes down and comes back in 5 s. So it takes 5/2 = 2.5 s to reach the wreck." },
      { part: "(b) Calculation", text: "Depth = speed x time = 1525 x 2.5." },
      { part: "(b) Answer", text: "1525 x 2.5 = 3812.5 m. The wreck lies about 3812.5 m below the surface." }
    ]
  },
  {
    id: 22,
    question: "(a) A car parking sensor starts to beep when an obstacle is 1.2 m away. How much time does the ultrasonic wave take to go to the obstacle and come back? Take the speed as 345 m/s. (b) By how much time will thunder be delayed over a distance of 1720 m if the air temperature falls from 22 °C to 0 °C? The speed of sound is 344 m/s at 22 °C and 331 m/s at 0 °C.",
    markingScheme: ["(a) Total distance = 2 x 1.2 = 2.4 m -- 1 mark", "(a) Time = 2.4/345 = 0.00696 s, about 0.007 s -- 1 mark", "(b) Time at 22 °C = 1720/344 = 5 s -- 1 mark", "(b) Time at 0 °C = 1720/331 = about 5.196 s -- 1 mark", "(b) Extra time = 5.196 - 5 = about 0.2 s -- 1 mark"],
    answerParts: [
      { part: "(a) Total distance", text: "The wave goes to the obstacle and comes back, so the total distance = 2 x 1.2 = 2.4 m." },
      { part: "(a) Time", text: "Time = distance / speed = 2.4 / 345 = 0.00696 s. So the time taken is about 0.007 s, which is 7 milliseconds." },
      { part: "(b) Time at 22 °C", text: "t1 = 1720 / 344 = 5 s." },
      { part: "(b) Time at 0 °C", text: "t2 = 1720 / 331 = 5.196 s (nearly)." },
      { part: "(b) Extra time", text: "Extra time = t2 - t1 = 5.196 - 5 = 0.196 s, which is about 0.2 s. Sound is slower in colder air, so the thunder takes a little more time." }
    ]
  },
  {
    id: 23,
    question: "(a) A sound wave travelling at 340 m/s is drawn so that 2 complete wavelengths fit in 8 cm. Find its wavelength and frequency. (b) Two sound waves A and B travel at 345 m/s. The wavelength of A is 2.5 cm and that of B is 5.0 cm. Find the frequency of each.",
    markingScheme: ["(a) Wavelength = 8 cm / 2 = 4 cm = 0.04 m -- 1 mark", "(a) Frequency = v/λ = 340/0.04 = 8500 Hz -- 1 mark", "(b) Formula f = v/λ with λ in metres (2.5 cm = 0.025 m, 5.0 cm = 0.05 m) -- 1 mark", "(b) f of A = 345/0.025 = 13800 Hz -- 1 mark", "(b) f of B = 345/0.05 = 6900 Hz; the shorter wavelength has the higher frequency -- 1 mark"],
    answerParts: [
      { part: "(a) Wavelength", text: "Two wavelengths make 8 cm, so one wavelength λ = 8/2 = 4 cm = 0.04 m." },
      { part: "(a) Frequency", text: "f = v/λ = 340 / 0.04 = 8500 Hz (8.5 kHz)." },
      { part: "(b) Method", text: "Both waves have the same speed, v = 345 m/s. Change the wavelengths to metres: λA = 2.5 cm = 0.025 m and λB = 5.0 cm = 0.05 m. Use f = v/λ." },
      { part: "(b) Wave A", text: "fA = 345 / 0.025 = 13800 Hz." },
      { part: "(b) Wave B", text: "fB = 345 / 0.05 = 6900 Hz. Wave B has double the wavelength, so it has half the frequency of A. The two sounds are one octave apart." }
    ]
  },
  {
    id: 24,
    question: "Two identical sound sources, one in air and one under water, produce sound at the same time. The sound goes to a vertical cliff and comes back. The sound in air takes 4.5 times as long as the sound in water to return. Find the ratio of the speed of sound in air to that in water. Give a real example of sound moving faster in a denser medium.",
    markingScheme: ["Same distance to the cliff, so the total distance is the same for both = 2d -- 1 mark", "Speed = distance/time, so speed is inversely proportional to time -- 1 mark", "t(air) = 4.5 x t(water) -- 1 mark", "Ratio v(air) : v(water) = t(water) : t(air) = 1 : 4.5 -- 1 mark", "Simplify to 2 : 9; example: table knock, steel fence or the desk activity -- 1 mark"],
    answerParts: [
      { part: "Same distance", text: "Both sounds go to the cliff and back over the same path length, so the total distance is the same. Call it D." },
      { part: "Speed and time", text: "Speed = D / time. For the same D, the greater the time, the smaller the speed. So the speed is inversely proportional to the time taken." },
      { part: "Given", text: "The time in air is 4.5 times the time in water: t(air) = 4.5 x t(water)." },
      { part: "Ratio", text: "v(air) / v(water) = [D / t(air)] / [D / t(water)] = t(water) / t(air) = 1 / 4.5." },
      { part: "Answer and example", text: "So v(air) : v(water) = 1 : 4.5 = 2 : 9. Sound is 4.5 times faster in water. This matches the known values, 1500 m/s in water and 340 m/s in air (about 4.4 times). In the desk activity, sound in the desk is also heard more clearly than sound in the air." }
    ]
  },
  {
    id: 25,
    question: "Many students use earphones for a long time at high volume. Explain how this can harm hearing, how hearing loss is checked, and how a hearing aid helps. Also list four simple habits for safe listening.",
    markingScheme: ["Loud sound has a large amplitude and carries more energy to the eardrum -- 1 mark", "Long exposure to loud sound can cause hearing loss -- 1 mark", "Hearing is tested by an audiogram -- 1 mark", "Hearing aid: microphone, amplifier and speaker to make the sound stronger -- 1 mark", "Four safe habits: low volume, breaks, no very loud places, ear checks -- 1 mark"],
    answerParts: [
      { part: "Why loud sound harms", text: "A loud sound has a large amplitude, so it carries more energy. In earphones, this energy is delivered very close to the eardrum. Very loud sound above the safe level makes the delicate parts of the ear, such as the cochlea, work too hard." },
      { part: "Hearing loss", text: "Loud sound for a long time can lead to loss of hearing. A small rise in the decibel level means a large rise in intensity. So a phone at full volume is much more harmful than it seems. The damage builds up slowly and may not come back." },
      { part: "Testing hearing", text: "Hearing can be tested with an audiogram, which shows how well a person hears sounds of different frequencies and loudness." },
      { part: "Hearing aid", text: "A hearing aid has a microphone, an amplifier and a speaker. The microphone picks up the sound and changes it into an electrical signal. The amplifier makes the signal stronger and the speaker changes it back to a louder sound. This helps a person with hearing loss to hear and talk better." },
      { part: "Safe habits", text: "(1) Keep the volume at a low or medium level. (2) Take a break after using earphones for some time. (3) Keep away from very loud sounds like firecrackers and loud speakers. (4) Get your hearing checked if you feel any problem, such as ringing in the ears." }
    ]
  }
];

// ── CASE-BASED QUESTIONS (4 marks each: 4 sub-questions of 1 mark) ──
export const SOUND9_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "Astronauts on a Spacewalk",
    caseDescription: "Two astronauts are repairing the arm of a space station outside the spacecraft. One of them drops a metal tool, which hits the metal arm. The astronauts see it hit, but neither hears any clank. Yet they can talk to each other clearly through devices fitted in their suits.",
    subQuestions: [
      { question: "Why can the astronauts not hear the clank of the tool in outer space?", options: ["Sound is too fast in space", "Outer space is almost a vacuum, and sound needs a medium", "The tool is too heavy to make sound", "Metal never makes sound"], correctIndex: 1, answer: "Outer space is almost a vacuum, and sound needs a medium", explanation: "Sound is a mechanical wave and needs a solid, a liquid or a gas to travel. There is almost no matter in outer space, so the sound cannot travel to the ear." },
      { question: "Name a lab experiment that shows sound cannot travel in a vacuum.", answer: "The vacuum bell jar experiment.", explanation: "As air is pumped out of the jar with the electric bell, the sound becomes fainter and almost disappears, though the bell is seen ringing." },
      { question: "How do the astronauts talk to each other in space?", answer: "Through special devices fitted in their suits.", explanation: "They cannot use sound through the vacuum, so their voices are carried by devices inside the suits." },
      { question: "If an astronaut holds one end of a metal rod on the station wall and puts her helmet on the other end, would she hear the clank of the tool? Why?", answer: "Yes, she would hear it, because sound can travel through the solid rod.", explanation: "A solid is a medium. Sound travels through the metal, so the vibrations can reach her helmet and then her ear." }
    ]
  },
  {
    id: 2,
    caseTitle: "The Bat Hunting at Night",
    caseDescription: "A bat flies in the dark and sends out short bursts of sound. The sound hits a moth and the echo comes back to the bat after 0.02 s. The speed of sound in air is 340 m/s. The frequency of the burst is 50 kHz.",
    subQuestions: [
      { question: "What is the ability of a bat to find objects by using reflected sound called?", options: ["Reverberation", "Echolocation", "Refraction", "Resonance"], correctIndex: 1, answer: "Echolocation", explanation: "Bats send ultrasonic waves and sense the echoes to find the position of obstacles and prey. This is echolocation." },
      { question: "Can a person hear the burst of frequency 50 kHz? Why?", answer: "No. It is ultrasound, above 20 kHz.", explanation: "The human audible range is 20 Hz to 20 kHz. 50 kHz is above this range, so it is an ultrasonic wave." },
      { question: "How far is the moth from the bat?", answer: "3.4 m", explanation: "The total distance = 340 x 0.02 = 6.8 m to the moth and back. The moth is 6.8/2 = 3.4 m away." },
      { question: "Find the wavelength of the burst in air.", answer: "0.0068 m (6.8 mm)", explanation: "λ = v/f = 340 / 50000 = 0.0068 m = 6.8 mm. A short wavelength lets the bat detect small objects like the moth." }
    ]
  },
  {
    id: 3,
    caseTitle: "Dolphins and Sonar",
    caseDescription: "A dolphin sends out clicks under water and listens for the echoes to find a fish. An echo returns after 0.04 s. The speed of sound in seawater is 1500 m/s. A fishing boat uses sonar in the same way to find the sea floor.",
    subQuestions: [
      { question: "Which of these uses the same principle as the dolphin's clicks?", options: ["A tuning fork", "Sonar", "A microphone only", "A rubber band"], correctIndex: 1, answer: "Sonar", explanation: "Sonar sends ultrasonic waves into water and studies the reflected waves to find the distance of objects. Dolphins do the same with their clicks." },
      { question: "Find the distance of the fish from the dolphin.", answer: "30 m", explanation: "Total distance = 1500 x 0.04 = 60 m. One way = 60/2 = 30 m." },
      { question: "The boat's sonar receives an echo from the sea floor after 0.2 s. Find the depth at the place.", answer: "150 m", explanation: "One-way time = 0.2/2 = 0.1 s. Depth = 1500 x 0.1 = 150 m." },
      { question: "Why is sound used under water rather than light for such finding of objects?", answer: "Sound travels much farther in water than light does.", explanation: "Sound travels a long way in water and can be reflected from objects, so it works in dark and deep water where light does not go far." }
    ]
  },
  {
    id: 4,
    caseTitle: "The Ultrasound Scan",
    caseDescription: "A doctor uses an ultrasound machine to check the liver of a patient. The machine sends ultrasonic waves of frequency 2 MHz (2000000 Hz) into the body and detects the echoes. Take the speed of sound in the body as 1500 m/s. An echo from an organ 7.5 cm deep comes back to the machine.",
    subQuestions: [
      { question: "Why is ultrasound, and not audible sound, used for the scan?", options: ["Because it is very loud", "Because it can be sent as a narrow beam and reflected, and it cannot be heard", "Because it travels slower", "Because it does not need a medium"], correctIndex: 1, answer: "Because it can be sent as a narrow beam and reflected, and it cannot be heard", explanation: "Ultrasound has a high frequency and a short wavelength. It is sent into the body, reflected from organs, and causes no sound disturbance to the patient." },
      { question: "Find the wavelength of the ultrasound in the body.", answer: "0.00075 m (0.75 mm)", explanation: "λ = v/f = 1500 / 2000000 = 0.00075 m = 0.75 mm." },
      { question: "Find the time taken for the echo from the organ 7.5 cm deep to return.", answer: "0.0001 s", explanation: "Total distance = 2 x 0.075 = 0.15 m. Time = 0.15 / 1500 = 0.0001 s." },
      { question: "Name another medical use of ultrasound.", answer: "Breaking kidney stones into small pieces.", explanation: "Ultrasound can break kidney stones into small pieces that then pass out of the body." }
    ]
  },
  {
    id: 5,
    caseTitle: "A Thunderstorm at Night",
    caseDescription: "During a thunderstorm, Meera sees a flash of lightning and counts 8 seconds before she hears the thunder. Take the speed of sound in air as 340 m/s. The speed of light is so high that the flash reaches her almost at once.",
    subQuestions: [
      { question: "Why does she see the flash before she hears the thunder?", options: ["Light travels much faster than sound", "Sound travels faster than light", "Thunder is produced later than lightning", "Her eyes work faster than her ears"], correctIndex: 0, answer: "Light travels much faster than sound", explanation: "Light reaches us almost instantly. Sound in air travels at only about 340 m/s, so it takes noticeable time." },
      { question: "How far is the lightning from Meera?", answer: "2720 m", explanation: "Distance = v x t = 340 x 8 = 2720 m, that is about 2.7 km." },
      { question: "Later, the gap between the flash and the thunder becomes 3 s. How far is the storm now?", answer: "1020 m", explanation: "Distance = 340 x 3 = 1020 m. The storm is coming closer." },
      { question: "Sound is a longitudinal wave. What does this mean?", answer: "The particles of air vibrate parallel to the direction in which the wave travels.", explanation: "In a longitudinal wave, the air particles move to and fro along the direction of the wave, forming compressions and rarefactions." }
    ]
  },
  {
    id: 6,
    caseTitle: "Knocking on the Fence",
    caseDescription: "Two friends stand 170 m apart along a long steel fence. Rina places her ear on the fence and Sameer hits it with a metal rod. She hears two sounds, one through the steel and one through the air. Take the speed of sound as 5000 m/s in steel and 340 m/s in air.",
    subQuestions: [
      { question: "Which sound reaches Rina first?", options: ["The one through the air", "The one through the steel", "Both at the same time", "Neither, as sound cannot travel in steel"], correctIndex: 1, answer: "The one through the steel", explanation: "Sound is fastest in solids, so it reaches her first through the steel." },
      { question: "How long does the sound take to reach her through the air?", answer: "0.5 s", explanation: "t = 170 / 340 = 0.5 s." },
      { question: "How long does it take through the steel?", answer: "0.034 s", explanation: "t = 170 / 5000 = 0.034 s." },
      { question: "Can Rina hear the two sounds separately? Give the time gap.", answer: "Yes. The gap is 0.466 s, which is more than 0.1 s.", explanation: "0.5 - 0.034 = 0.466 s. Two sounds are heard separately if they are at least 0.1 s apart." }
    ]
  },
  {
    id: 7,
    caseTitle: "The Concert Hall",
    caseDescription: "A new concert hall is 30 m long. During the first show, the music sounded garbled because the sound kept bouncing between the bare walls and stayed on. The builders then added curtains, soft chairs and wall panels, and the sound became clear. Take the speed of sound as 340 m/s.",
    subQuestions: [
      { question: "What is the persistence of sound because of many reflections in a hall called?", options: ["Echo", "Reverberation", "Echolocation", "Refraction"], correctIndex: 1, answer: "Reverberation", explanation: "Multiple reflections arriving less than 0.05 s apart make the sound stay on after the source stops. This is reverberation." },
      { question: "Why did the curtains and soft chairs make the sound clearer?", answer: "They absorb sound, so the extra reflections are reduced.", explanation: "Soft and porous surfaces absorb sound instead of reflecting it, which reduces unwanted reverberation." },
      { question: "Sound from the stage goes to the back wall and returns. How long does this take?", answer: "About 0.18 s (0.176 s)", explanation: "Distance to the wall and back = 2 x 30 = 60 m. Time = 60/340 = 0.176 s." },
      { question: "Will a person on the stage hear this reflection as an echo? Why?", answer: "Yes, because the gap is more than 0.1 s.", explanation: "0.176 s is more than 0.1 s, so the reflected sound is heard as a separate sound. Also, the wall is 30 m away, more than the minimum 17 m." }
    ]
  },
  {
    id: 8,
    caseTitle: "The Whispering Gallery of Gol Gumbaz",
    caseDescription: "In the Gol Gumbaz at Bijapur, a visitor whispers near the wall of the huge dome. A friend standing at the opposite side of the gallery, 34 m away, hears the whisper clearly, and then hears it again a little later. Take the speed of sound as 340 m/s.",
    subQuestions: [
      { question: "The whisper is heard again because of", options: ["Reflection of sound from the hard wall", "Refraction of light", "The vibration of the friend's ear", "The absence of air in the dome"], correctIndex: 0, answer: "Reflection of sound from the hard wall", explanation: "The hard, smooth walls of the dome reflect sound again and again, and the sound reaches the listener several times." },
      { question: "How long does the whisper take to reach the friend directly?", answer: "0.1 s", explanation: "t = 34 / 340 = 0.1 s." },
      { question: "If a reflected whisper travels a total path of 68 m, when does it arrive?", answer: "0.2 s after the whisper", explanation: "t = 68 / 340 = 0.2 s." },
      { question: "Why can the friend hear the whisper twice as two separate sounds?", answer: "The two sounds reach her at least 0.1 s apart.", explanation: "The direct sound arrives at 0.1 s and the reflected one at 0.2 s. The gap is 0.1 s, which is enough to hear them separately, so we hear the whisper more than once." }
    ]
  },
  {
    id: 9,
    caseTitle: "Tuning Fork on Water",
    caseDescription: "In the lab, Arjun strikes a tuning fork of frequency 500 Hz on a rubber pad. When he touches a vibrating prong to the surface of water, small waves spread on the water. He also hears a clear sound near his ear. Take the speed of sound in air as 340 m/s.",
    subQuestions: [
      { question: "What do the waves on the water show?", options: ["The prong is vibrating", "The prong is at rest", "The water is a solid", "Sound does not need a medium"], correctIndex: 0, answer: "The prong is vibrating", explanation: "The moving prong makes the water surface move, so waves form. This supports the idea that sound is produced by vibrating objects." },
      { question: "Find the time period of the tuning fork.", answer: "0.002 s", explanation: "T = 1/f = 1/500 = 0.002 s." },
      { question: "Find the wavelength of the sound in air.", answer: "0.68 m", explanation: "λ = v/f = 340/500 = 0.68 m." },
      { question: "How many oscillations does a prong complete in 3 s?", answer: "1500", explanation: "Number = f x t = 500 x 3 = 1500 oscillations." }
    ]
  },
  {
    id: 10,
    caseTitle: "Strings of a Guitar",
    caseDescription: "Nisha plucks the thick bottom string and the thin top string of a guitar. The thin string gives a shrill sound and the thick string gives a deep sound. When she tightens a string, its sound changes too. The A note of a string has a frequency of 440 Hz.",
    subQuestions: [
      { question: "The shrill sound of the thin string has", options: ["A lower frequency and a low pitch", "A higher frequency and a high pitch", "A lower speed", "A greater wavelength in every case"], correctIndex: 1, answer: "A higher frequency and a high pitch", explanation: "Pitch is how we feel the frequency. A thin string vibrates faster, so its frequency and pitch are high." },
      { question: "Find the time period of the 440 Hz note.", answer: "About 0.0023 s", explanation: "T = 1/440 = 0.00227 s." },
      { question: "What is the frequency of the note one octave above 440 Hz?", answer: "880 Hz", explanation: "An octave is a gap where the frequency becomes double, so 2 x 440 = 880 Hz." },
      { question: "Which property, loudness or pitch, changes when she plucks the same string harder?", answer: "Loudness changes, not the pitch.", explanation: "A harder pluck gives a bigger amplitude, which we hear as a louder sound. The frequency, and so the pitch, stays the same." }
    ]
  },
  {
    id: 11,
    caseTitle: "The Tabla and the Syaahi",
    caseDescription: "In a music program, a tabla and a flute play the same note at the same loudness, but the audience can easily tell them apart. The tabla has a black patch called the syaahi at the centre of its drum head. Sir C. V. Raman studied such Indian drums to understand their rich sound. The note played has a frequency of 300 Hz.",
    subQuestions: [
      { question: "What quality lets us tell the flute and the tabla apart when they play the same note at the same loudness?", options: ["Amplitude", "Timbre", "Wavelength only", "Speed"], correctIndex: 1, answer: "Timbre", explanation: "Timbre depends on the pattern and strength of the overtones, which depend on the shape, material and make of the instrument." },
      { question: "What is the job of the syaahi?", answer: "It changes the vibration of the drum membrane, giving a rich variety of sounds and good control of the tone.", explanation: "The black patch changes the way the membrane vibrates, so the tabla gives a rich variety of sounds." },
      { question: "A note of 300 Hz and another note one octave higher are played. Find the frequency of the higher note.", answer: "600 Hz", explanation: "One octave means double the frequency: 2 x 300 = 600 Hz." },
      { question: "What is the difference between a tone and a musical note?", answer: "A tone has a single frequency, and a note has a fundamental frequency with overtones.", explanation: "A tuning fork gives a tone. A plucked tanpura string or a singing voice gives a note, which is richer." }
    ]
  },
  {
    id: 12,
    caseTitle: "Microphone and Speaker at the School Function",
    caseDescription: "At the school function, the principal speaks into a microphone. The sound comes out from big speakers placed at the back of the ground. A student asks how the voice can get into wires and come out again as sound.",
    subQuestions: [
      { question: "What energy change happens in a microphone?", options: ["Electrical energy to sound energy", "Sound energy to electrical energy", "Heat energy to sound energy", "Light energy to sound energy"], correctIndex: 1, answer: "Sound energy to electrical energy", explanation: "Sound makes the diaphragm of the microphone vibrate, and these vibrations are changed into an electrical signal." },
      { question: "What part of the microphone vibrates when a person speaks into it?", answer: "The diaphragm (a thin membrane)", explanation: "The sound waves make the thin diaphragm vibrate." },
      { question: "What does a speaker do?", answer: "It changes an electrical signal into sound.", explanation: "The electrical signal makes a cone or diaphragm in the speaker vibrate, and this vibration produces sound." },
      { question: "Why does the sound from a good speaker sound almost the same as the original voice?", answer: "Because if all parts work properly, the speaker reproduces the vibrations captured by the microphone.", explanation: "The speaker does the opposite of the microphone, so the sound it gives closely matches the sound that was captured." }
    ]
  },
  {
    id: 13,
    caseTitle: "Noise Near the Highway",
    caseDescription: "A school stands beside a busy highway. Students find it hard to study because of constant honking and engine noise. A measurement shows the sound level in the school yard is about 85 dB. Normal conversation is about 60 dB and firecrackers can go above 100 dB.",
    subQuestions: [
      { question: "Unwanted or harmful sound is called", options: ["Pitch", "Timbre", "Noise", "Tone"], correctIndex: 2, answer: "Noise", explanation: "Unwanted or harmful sound is noise. Too much of it is called noise pollution." },
      { question: "In which unit is the loudness of sound commonly measured?", answer: "Decibel (dB)", explanation: "Loudness is commonly measured in decibels." },
      { question: "The level near the school is how many dB more than normal conversation?", answer: "25 dB", explanation: "85 - 60 = 25 dB. Even a small rise in dB means a large rise in intensity, so 25 dB is a big rise." },
      { question: "Suggest two ways to reduce the noise for the school.", answer: "Plant trees along the wall and put sound absorbing panels; ask drivers not to honk near the school.", explanation: "Trees and soft, porous panels absorb sound, and less honking lowers the noise at its source. Long exposure to loud sound can harm health, sleep and hearing." }
    ]
  },
  {
    id: 14,
    caseTitle: "Grandfather's Hearing Aid",
    caseDescription: "Ravi's grandfather could not hear well, so a doctor did a hearing test and showed a graph called an audiogram. He was given a small hearing aid to wear. After that, he could take part in the family talks again.",
    subQuestions: [
      { question: "Which of these are the main parts of a hearing aid?", options: ["Lens, mirror and screen", "Microphone, amplifier and speaker", "Piston, tube and spring", "Bell, jar and pump"], correctIndex: 1, answer: "Microphone, amplifier and speaker", explanation: "A hearing aid has a microphone to pick up sound, an amplifier to make the signal stronger and a speaker to give out the louder sound." },
      { question: "What is the test that checks how well a person hears called?", answer: "An audiogram", explanation: "Hearing loss can be tested using audiograms." },
      { question: "In a normal ear, which part changes the vibrations into electrical signals for the brain?", answer: "The cochlea", explanation: "The eardrum vibrates, tiny bones make the vibrations stronger and the cochlea changes them into electrical signals." },
      { question: "Which part of the hearing aid makes the sound stronger?", answer: "The amplifier", explanation: "The microphone changes sound to an electrical signal, and the amplifier makes this signal stronger before the speaker changes it back to sound." }
    ]
  },
  {
    id: 15,
    caseTitle: "Earphones at Full Volume",
    caseDescription: "Kabir listens to music through earphones at full volume for hours. His mother warns him that this can harm his hearing. He notices that when he turns the volume up, the music becomes louder but the notes do not change their pitch.",
    subQuestions: [
      { question: "Which property of the sound wave increases when Kabir turns the volume up?", options: ["Amplitude", "Speed", "Frequency", "Time period"], correctIndex: 0, answer: "Amplitude", explanation: "A louder sound has a bigger amplitude. The frequency, and so the pitch, stays the same." },
      { question: "Why does the pitch of the notes not change when the volume is increased?", answer: "Because pitch depends on the frequency, and the frequency does not change.", explanation: "Pitch is how we feel the frequency. Volume changes the amplitude, not the frequency." },
      { question: "What harm can long exposure to very loud sound cause?", answer: "Hearing loss, and also problems with health and sleep.", explanation: "Prolonged exposure to loud sound can affect health, sleep and hearing." },
      { question: "A friend says, \"Loudness and intensity are the same thing.\" Is she fully right?", answer: "No. Intensity can be measured, but loudness depends on how the listener hears it.", explanation: "Intensity is the sound energy passing through a unit area per second. Loudness is how our ears feel the sound." }
    ]
  },
  {
    id: 16,
    caseTitle: "The Balloon Burst Experiment",
    caseDescription: "A teacher takes students to a large ground to measure the speed of sound. Anil stands with balloons at one end. Priya stands 200 m away with a stopwatch. She starts the watch when she sees a balloon burst and stops it when she hears the pop. She repeats this three times and gets 0.56 s, 0.58 s and 0.60 s.",
    subQuestions: [
      { question: "Why does Priya start the watch when she sees the burst and not when she hears it?", options: ["Light reaches her almost instantly, so the seeing marks the time of the burst", "Sound is faster than light", "The balloon makes no sound at first", "Her eyes are faster than the sound of any other thing"], correctIndex: 0, answer: "Light reaches her almost instantly, so the seeing marks the time of the burst", explanation: "Light travels much faster than sound, so the time between seeing and hearing is the time the sound needs to travel 200 m." },
      { question: "Find the average of the three times.", answer: "0.58 s", explanation: "(0.56 + 0.58 + 0.60) / 3 = 1.74 / 3 = 0.58 s." },
      { question: "Find the speed of sound from her data.", answer: "About 345 m/s", explanation: "v = 200 / 0.58 = 344.8 m/s, which is about 345 m/s." },
      { question: "Why does the teacher ask her to repeat the experiment and take an average?", answer: "To reduce the error made in starting and stopping the watch by hand.", explanation: "One reading may be a little wrong because of reaction time. The average of many readings is closer to the true value." }
    ]
  },
  {
    id: 17,
    caseTitle: "Drone Surveillance",
    caseDescription: "A border security team uses sensitive sound sensors to detect drones even when they are hard to see. A drone's motors make a low humming sound of frequency 200 Hz. One drone is flying 1020 m away. Take the speed of sound in air as 340 m/s.",
    subQuestions: [
      { question: "Detecting a drone from the hum of its motor is called", options: ["Echolocation", "Audio surveillance", "Ultrasonography", "Reverberation"], correctIndex: 1, answer: "Audio surveillance", explanation: "Listening for the characteristic sound of motors and engines with sound sensors, to watch the airspace, is called audio surveillance." },
      { question: "Is the 200 Hz hum audible to humans? Why?", answer: "Yes, because it lies between 20 Hz and 20 kHz.", explanation: "The audible range is 20 Hz to 20000 Hz. 200 Hz is inside this range." },
      { question: "Find the wavelength of the hum in air.", answer: "1.7 m", explanation: "λ = v/f = 340/200 = 1.7 m." },
      { question: "After how much time does the hum from the drone at 1020 m reach the sensor?", answer: "3 s", explanation: "t = distance/speed = 1020/340 = 3 s." }
    ]
  },
  {
    id: 18,
    caseTitle: "The Parking Sensor",
    caseDescription: "A car has an ultrasonic parking sensor at the rear bumper. It sends out waves of frequency 40 kHz. The beeps become faster as the car comes closer to a wall. Take the speed of the wave in air as 345 m/s.",
    subQuestions: [
      { question: "The 40 kHz wave used by the sensor is", options: ["Infrasonic", "Audible", "Ultrasonic", "Not a sound wave"], correctIndex: 2, answer: "Ultrasonic", explanation: "A frequency above 20 kHz is ultrasonic. We cannot hear it." },
      { question: "Find the wavelength of the wave in air.", answer: "About 0.0086 m (8.6 mm)", explanation: "λ = v/f = 345 / 40000 = 0.008625 m, about 8.6 mm." },
      { question: "The wall is 0.5 m from the sensor. Find the time for the wave to go to the wall and come back.", answer: "About 0.0029 s", explanation: "Total distance = 2 x 0.5 = 1.0 m. Time = 1.0 / 345 = 0.0029 s." },
      { question: "Why does the sensor work on the same idea as a bat?", answer: "Both send out waves and use the reflected wave (echo) to find how far an object is.", explanation: "This is echolocation. The time taken by the echo tells the distance of the obstacle." }
    ]
  },
  {
    id: 19,
    caseTitle: "Elephants and Earthquakes",
    caseDescription: "Before a big earthquake, some people noticed that elephants became restless. Scientists say elephants can detect infrasonic waves, and instruments use infrasound to detect earthquakes and volcanic eruptions. Consider an infrasonic wave of frequency 10 Hz in air, where the speed of sound is 340 m/s.",
    subQuestions: [
      { question: "Infrasonic waves are sound waves with a frequency", options: ["Above 20 kHz", "Between 20 Hz and 20 kHz", "Below 20 Hz", "Exactly 20 kHz"], correctIndex: 2, answer: "Below 20 Hz", explanation: "Sound waves with a frequency below 20 Hz are called infrasonic waves. Humans cannot hear them." },
      { question: "Find the time period of the 10 Hz wave.", answer: "0.1 s", explanation: "T = 1/f = 1/10 = 0.1 s." },
      { question: "Find its wavelength in air.", answer: "34 m", explanation: "λ = v/f = 340/10 = 34 m." },
      { question: "Why can infrasound be used to detect storms and earthquakes far away?", answer: "Because such waves travel long distances through air and the Earth.", explanation: "Infrasonic waves travel a very long way before they die out, so events far away can be detected." }
    ]
  },
  {
    id: 20,
    caseTitle: "The Bansuri and the Air Column",
    caseDescription: "Isha plays a note of frequency 400 Hz on a bansuri. She blows across the hole and the air inside the hollow pipe vibrates. A friend far away hears the note. Take the speed of sound in air as 344 m/s.",
    subQuestions: [
      { question: "Which part vibrates to produce the sound in a bansuri?", options: ["The bamboo wall only", "The air inside the pipe", "Isha's fingers", "The air outside only, at rest"], correctIndex: 1, answer: "The air inside the pipe", explanation: "In a bansuri, the vibration of the air column inside the hollow pipe produces the sound." },
      { question: "Find the wavelength of the 400 Hz note in air.", answer: "0.86 m", explanation: "λ = v/f = 344/400 = 0.86 m." },
      { question: "Isha plays the note one octave higher. What are its frequency and wavelength?", answer: "800 Hz and 0.43 m", explanation: "An octave doubles the frequency: 2 x 400 = 800 Hz. λ = 344/800 = 0.43 m. The speed stays the same, so doubling the frequency halves the wavelength." },
      { question: "As the sound moves from Isha to her friend, do the air particles travel to the friend?", answer: "No. The particles only vibrate about their mean positions; the compressions and rarefactions travel.", explanation: "A sound wave carries energy through the medium, but the particles of air do not move along with the wave." }
    ]
  }
];
