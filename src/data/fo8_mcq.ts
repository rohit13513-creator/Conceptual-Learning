import type { QuizQuestion } from "../types-custom";
import { mc, ar } from "./fo8Util";

// Class VIII Science, Exploring Forces: 50 multiple-choice questions, 15 of them assertion-reason (35 ordinary ones).
// Everything stays inside NCERT Chapter 5. Do not write a slash in any text (use "per" or ÷). Powers are written m^2 (see fo8Util.ts).

export const FO8_MCQS: QuizQuestion[] = [
  // ── force and its effects ──
  mc("A force is", "a push or a pull on an object", ["the speed of an object", "the weight of an object only", "the shape of an object"], "A push or a pull applied on an object is called a force.", "fo_pushpull"),
  mc("The SI unit of force is", "newton", ["kilogram", "newton per metre only", "gram"], "The SI unit of force is the newton, written with a small 'n', and its symbol is N."),
  mc("Which of the following is NOT an effect of a force on an object?", "it changes the mass of the object", ["it makes the object move from rest", "it changes the direction of the object", "it changes the shape of the object"], "A force can make an object move, change its speed or direction and change its shape. It does not change the amount of matter, that is, the mass.", "fo_effects"),
  mc("A friend holds your moving bicycle from behind. This is a", "pull that decreases the speed of the bicycle", ["push that increases the speed", "push that changes the shape of the bicycle", "pull that changes the colour of the bicycle"], "The pull from behind stops the bicycle or decreases its speed."),
  mc("When you press an inflated balloon with your hands, the force applied changes its", "shape", ["colour", "mass", "direction of motion only"], "Pressing is a push; it changes the shape of the balloon."),
  mc("At least how many objects must interact for a force to come into play?", "two", ["one", "three", "four"], "A force results from the interaction of an object with another object, so at least two objects are needed.", "fo_interaction"),
  // ── types ──
  mc("Which of the following is a non-contact force?", "gravitational force", ["muscular force", "force of friction", "a push by the hand"], "Muscular force and friction are contact forces. Magnetic, electrostatic and gravitational forces act without contact.", "fo_types"),
  mc("The force resulting from the action of muscles is called", "muscular force", ["magnetic force", "electrostatic force", "gravitational force"], "Muscular force is caused when muscles contract and elongate."),
  mc("Which force helps the heart to pump blood in our body?", "muscular force", ["magnetic force", "gravitational force", "electrostatic force"], "The expansion and contraction of the heart muscles allow the blood to circulate.", "fo_muscular"),
  // ── friction ──
  mc("The force of friction always acts", "opposite to the direction in which the object moves or tries to move", ["in the direction of the motion", "at right angles to the motion only", "only when the object is at rest"], "Friction opposes the motion or the attempt to move.", "fo_friction"),
  mc("Friction arises because", "even smooth surfaces have minute irregularities that lock into each other", ["surfaces are always perfectly smooth", "the Earth pulls the surfaces", "the surfaces are charged"], "When two surfaces are in contact, their irregularities lock into each other and oppose motion."),
  mc("The same object is pushed on glass, cloth, wood, ceramic tile and sand. It stops soonest on", "sand", ["glass", "ceramic tile", "wood"], "Friction is greater on rough surfaces, and sand is the roughest of these.", "fo_surfaces"),
  mc("Which statement about friction is correct?", "Friction is a contact force.", ["Friction is a non-contact force.", "Friction acts only on solid surfaces.", "Friction is less on rough surfaces."], "Friction arises between two surfaces in contact. Air and water also exert friction on moving objects."),
  mc("Aeroplanes, ships and high-speed trains have special shapes to", "reduce the friction due to air or water", ["increase the friction", "increase their weight", "reduce their mass"], "Air and water exert friction on moving objects, so such shapes reduce it."),
  mc("We slip easily on a wet floor because", "the friction between the feet and the floor becomes very small", ["the friction becomes very large", "gravity becomes zero", "the floor becomes charged"], "A wet or polished smooth floor gives very little friction, so the feet cannot grip."),
  mc("A ball released from P on a slope stops at A on a horizontal surface. It will stop before A if the surface is", "made rougher by spreading sand", ["made smoother with a glass sheet", "made wet and oily", "removed"], "More friction stops the ball sooner.", "fo_slope"),
  // ── magnetic and electrostatic ──
  mc("The force exerted by a magnet on a magnetic material is called the", "magnetic force", ["electrostatic force", "muscular force", "frictional force"], "A magnet exerts a magnetic force on another magnet or on a magnetic material, even from a distance.", "fo_ringmagnets"),
  mc("Two ring magnets are placed on a stick with like poles facing each other. The upper magnet", "floats above the lower one", ["sticks to the lower one", "falls off the stick", "turns into a non-magnetic ring"], "Like poles repel each other, so the upper magnet is pushed up and floats."),
  mc("When a plastic scale is rubbed with polythene, it can attract small pieces of paper because", "it gets charged by rubbing", ["it becomes a magnet", "it becomes heavier", "the paper becomes magnetic"], "Rubbing builds up static charges on the scale, and a charged object attracts uncharged objects.", "fo_charged"),
  mc("Two balloons are rubbed with a woollen cloth and brought near each other. They", "repel each other", ["attract each other", "do not exert any force", "stick together"], "Both balloons get the same kind of charge, and like charges repel.", "fo_balloons"),
  mc("The two kinds of static charges are called", "positive and negative", ["north and south", "heavy and light", "hot and cold"], "Like charges repel and unlike charges attract; the two kinds are positive and negative."),
  // ── gravity ──
  mc("The force with which the Earth attracts objects towards itself is called", "gravitational force", ["electrostatic force", "magnetic force", "muscular force"], "This force is also called the force of gravity or simply gravity.", "fo_gravity"),
  mc("A ball is thrown vertically upwards. At its topmost point the force acting on it is", "only gravity, downwards", ["only gravity, upwards", "no force at all", "gravity downwards and a push upwards"], "At the top the ball is at rest for a moment, but the gravitational force still acts downwards.", "fo_vertical"),
  mc("When a ball is going up, the forces acting on it are", "gravity and air friction, both downwards", ["gravity downwards and air friction upwards", "gravity upwards and air friction downwards", "only air friction"], "Air friction opposes the upward motion, so it acts downwards, like gravity."),
  mc("While an object thrown upwards is coming down, its speed", "goes on increasing", ["goes on decreasing", "remains constant", "is zero"], "The gravitational force pulls it downwards and its speed increases."),
  // ── weight, mass and spring balance ──
  mc("The weight of an object is", "the force with which the Earth pulls it towards itself", ["the amount of matter in it", "its volume", "its density"], "Weight is the gravitational force of the Earth on the object, so it is measured in newton."),
  mc("Which of the following is the SI unit of weight?", "newton", ["kilogram", "gram", "litre"], "Weight is a force, so its SI unit is the newton."),
  mc("A spring balance has 5 divisions between the marks 0 and 1 N. Its smallest reading is", "0.2 N", ["0.5 N", "5 N", "0.02 N"], "The smallest reading = 1 N ÷ 5 = 0.2 N.", "fo_balance"),
  mc("A spring balance has a range of 0 to 10 N. A student should not hang on it an object of weight", "12 N", ["4 N", "7.5 N", "10 N"], "An object heavier than the range may damage the spring balance."),
  mc("An object has a mass of 1 kg on the Earth. On the Moon its mass is", "1 kg", ["1.6 kg", "6 kg", "0.17 kg"], "The mass of an object remains the same everywhere; only its weight changes.", "fo_planets"),
  mc("A 3 kg object is taken to Mars, where 1 kg weighs 3.8 N. Its weight on Mars is", "11.4 N", ["3.8 N", "30 N", "1.27 N"], "Weight = 3 × 3.8 = 11.4 N."),
  // ── floating and sinking ──
  mc("The upward force applied by a liquid on an object placed in it is called", "upthrust or buoyant force", ["gravitational force", "frictional force", "muscular force"], "All liquids apply an upward force on objects in them.", "fo_buoyancy"),
  mc("An object sinks in a liquid when", "the gravitational force on it is more than the buoyant force", ["the buoyant force is more than the gravitational force", "the two forces are equal", "the liquid is very cold"], "If the downward gravitational force is more than the upward buoyant force, the object sinks."),
  mc("An object floats in a liquid when", "the gravitational force and the buoyant force on it are equal", ["the gravitational force is more than the buoyant force", "no force acts on it", "the buoyant force is zero"], "When the two forces are equal the object floats."),
  mc("Pumice, a rock, floats on water because", "tiny gas bubbles trapped inside make it light and less dense than water", ["it is heavier than water", "it is a magnet", "it dissolves in water"], "Pumice is a light, porous rock full of air pockets."),
  // ── assertion-reason ──
  ar("A force can change the speed of a moving object.", "A force can change the direction of a moving object.", 1, "Both are true: a force can change the speed, the direction or both. But the change of direction does not explain the change of speed."),
  ar("An object at rest may still have forces acting on it.", "The forces acting on an object at rest may balance one another.", 0, "Both are true. An object at rest may have forces acting on it that balance each other, so R explains A."),
  ar("The force of friction is a contact force.", "Friction arises between two surfaces in contact.", 0, "Both are true and R explains A: friction acts only because the two surfaces touch."),
  ar("A rolling ball on flat ground slows down and stops on its own.", "The speed of an object changes only if a force acts on it.", 0, "Both are true. The force of friction acts on the ball, and a force is needed to change its speed."),
  ar("The gravitational force is a non-contact force.", "The Earth pulls objects only when they touch the ground.", 2, "A is true: gravity acts without contact. R is false, since the Earth pulls objects even when they are not touching it."),
  ar("Two similarly charged balloons repel each other.", "Like charges repel each other.", 0, "Both are true and R explains A."),
  ar("Gravitational force can be attractive or repulsive.", "It is a non-contact force.", 3, "A is false: gravitational force is always attractive. R is true: it acts without contact."),
  ar("The weight of an object on the Moon is less than on the Earth.", "The mass of the object on the Moon is less than on the Earth.", 2, "A is true: the weight on the Moon is about one-sixth. R is false: the mass stays the same."),
  ar("The weight of an object is measured in newton.", "The mass of an object is measured in kilogram.", 1, "Both are true, but the unit of mass does not explain the unit of weight. Weight is a force, so it is measured in newton."),
  ar("Muscular force is a contact force.", "Animals, birds, fish and insects use muscular force for movement.", 1, "Both are true, but the use of muscular force by living beings does not explain why it is a contact force."),
  ar("An object sinks in water if the gravitational force on it is more than the buoyant force.", "A coin and a wooden block of the same weight both sink.", 2, "A is true. R is false: a wooden block floats, since it displaces water equal to its own weight before it sinks fully."),
  ar("A magnet attracts an iron nail only if it touches it.", "The magnetic force is a non-contact force.", 3, "A is false: a magnet attracts the nail without touching it. R is true: the magnetic force is a non-contact force."),
  ar("A spring balance measures weight.", "The spring stretches by an amount that depends on the force applied by the Earth on the object.", 0, "Both are true: the stretch gives the weight, so R explains A."),
  ar("The magnetic force is a non-contact force.", "The electrostatic force is also a non-contact force.", 1, "Both are true, but one non-contact force is not the reason for another being non-contact."),
  ar("Friction acts in the direction of the motion of the object.", "Friction arises due to the irregularities in the two surfaces in contact.", 3, "A is false: friction acts opposite to the direction of motion. R is true: irregularities of the surfaces lock into each other."),
];
