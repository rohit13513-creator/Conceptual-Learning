import type { QuizQuestion } from "../types-custom";

// Sound Waves: 20 more multiple-choice questions for the Self Assessment, which now has 100 questions in 60 minutes
// (the first 80 are in sound9_practice.ts). Each question is written with the right answer first; the right answer is
// then placed at the position listed in POSITION so the answers are spread out.

const POSITION = [0, 0, 3, 0, 3, 2, 3, 3, 0, 2, 3, 1, 1, 0, 1, 3, 0, 2, 3, 3];

let n = 80;
const q = (question: string, right: string, wrong: string[], explanation: string): QuizQuestion => {
  const at = POSITION[n - 80];
  const options = [...wrong];
  options.splice(at, 0, right);
  return { id: ++n, question, options, correctAnswer: at, explanation };
};

export const SOUND9_SELF_MORE: QuizQuestion[] = [
  q("Loudness of sound is measured in:", "decibels (dB)", ["hertz (Hz)", "metres (m)", "seconds (s)"],
    "Loudness is how we feel the amplitude of a sound. It is measured in decibels."),
  q("The loudness of normal talk is about:", "60 dB", ["10 dB", "120 dB", "200 dB"],
    "Rustling leaves are a few dB, normal talk is about 60 dB and firecrackers are over 100 dB."),
  q("The voice of a teenage boy becomes deeper because his vocal cords:", "become longer and thicker and vibrate more slowly", ["become shorter and thinner", "stop vibrating", "vibrate faster than before"],
    "Slower vibration means a lower frequency, so the pitch falls and the voice sounds deeper."),
  q("A hearing aid has:", "a microphone, an amplifier and a speaker", ["a lens and a mirror", "a battery and a bulb only", "a tuning fork and a bell jar"],
    "The microphone picks up sound, the amplifier makes the signal bigger and the speaker plays it into the ear."),
  q("The thin part of the ear that is made to vibrate when sound arrives is the:", "eardrum", ["cochlea", "syaahi", "prong"],
    "Sound makes the thin eardrum vibrate. Tiny bones then pass the vibrations on towards the cochlea."),
  q("The cochlea in the ear:", "changes the vibrations into electrical signals for the brain", ["holds the vocal cords", "reflects the sound back out", "makes the air around us vibrate"],
    "The brain understands electrical signals. The cochlea makes them from the vibrations."),
  q("We can tell the direction of a sound mainly because:", "the sound reaches our two ears with a tiny time gap", ["sound is brighter on one side", "sound always travels clockwise", "one ear is much louder than the other ear for every sound"],
    "Two ears, with the small gap in arrival time between them, help the brain find where the sound came from."),
  q("A sound with a single frequency, such as the sound of a tuning fork, is called a:", "tone", ["noise", "echo", "reverberation"],
    "A tone has one frequency. A musical note is a mixture of a fundamental and overtones."),
  q("In a musical note, the lowest frequency is called the:", "fundamental", ["overtone", "octave", "timbre"],
    "The lowest frequency is the fundamental. The higher frequencies that come with it are the overtones."),
  q("A note has a frequency of 300 Hz. The note one octave higher has a frequency of:", "600 Hz", ["450 Hz", "900 Hz", "150 Hz"],
    "An octave is a gap in which one note has double the frequency of the other, so 2 × 300 = 600 Hz."),
  q("A flute and a tabla play the same note at the same loudness but they sound different. The quality that differs is:", "timbre", ["pitch", "amplitude", "speed"],
    "Timbre depends on the overtones present, which come from the shape, material and build of the instrument."),
  q("The black patch (syaahi) on a tabla:", "gives a rich variety of sound by changing how the skin vibrates", ["makes the drum waterproof", "is only a decoration", "stops all echoes"],
    "The syaahi changes the way the drum skin vibrates, which gives the tabla and mridangam their rich sound."),
  q("Which pair of gaps is correct for an echo and for reverberation?", "Echo: 0.1 s or more. Reverberation: less than about 0.05 s", ["Echo: less than 0.05 s. Reverberation: 0.1 s or more", "Both need a gap of 1 s", "Both need a gap of less than 0.01 s"],
    "An echo is heard separately, so the gap must be at least 0.1 s. In reverberation the reflected sounds arrive very close together."),
  q("The Whispering Gallery of Gol Gumbaz is famous because:", "a whisper is heard many times across the dome as it reflects again and again", ["sound cannot reflect inside it", "it uses ultrasound", "it makes no echoes at all"],
    "It is a good example of repeated reflection of sound."),
  q("A ship sends ultrasound into seawater and the echo from the sea bed returns after 1.2 s. If the speed of sound in seawater is 1530 m/s, the depth is:", "918 m", ["1836 m", "459 m", "1275 m"],
    "The one-way time is 1.2 ÷ 2 = 0.6 s. Depth = 1530 × 0.6 = 918 m."),
  q("Infrasonic waves are used to:", "detect earthquakes and volcanic eruptions", ["clean delicate machine parts", "break kidney stones", "weld plastics together"],
    "Infrasound travels far through air and the Earth, so it helps in detecting earthquakes, volcanic eruptions and severe storms."),
  q("Flaws inside a metal block can be found using:", "ultrasonic waves", ["infrasonic waves", "audible sound only", "the light of a bulb"],
    "Ultrasonic waves reflect from a hidden flaw, which shows that something is wrong inside the block."),
  q("A drone can be spotted by sound sensors even from far away because:", "its motors give out a low frequency hum", ["it makes ultrasound", "it gives out light", "it is completely silent"],
    "This is called audio surveillance. The hum from the motors can be picked up by sound sensors."),
  q("The siren of an ambulance sounds higher in pitch when the ambulance moves towards you. This is the:", "Doppler effect", ["echo", "reverberation", "sonic boom"],
    "A source moving towards the listener sounds higher in pitch, and a source moving away sounds lower."),
  q("A sound wave goes from air into water. Which quantity stays the same?", "frequency", ["wavelength", "speed", "none of these"],
    "The frequency is set by the source. The speed changes, so the wavelength changes as well, since λ = v ÷ f."),
];
