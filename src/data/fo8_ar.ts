import type { AssertionReasonQuestion } from "../types-custom";
import { u } from "./fo8Util";

// Class VIII Science, Exploring Forces: 22 assertion-reason questions for the separate Assertion section
// (different from the 15 inside the multiple-choice list).
// A = both true and R explains A, B = both true but R does not explain A, C = A true and R false, D = A false and R true.

type Opt = "A" | "B" | "C" | "D";
let n = 0;
const q = (assertion: string, reason: string, correctOption: Opt, explanation: string): AssertionReasonQuestion => {
  n++;
  return { id: n, assertion: u(assertion), reason: u(reason), correctOption, explanation: u(explanation) };
};

export const FO8_ASSERTIONS: AssertionReasonQuestion[] = [
  q("At least two objects must interact for a force to come into play.", "A force is a push or a pull resulting from the interaction of an object with another object.", "A", "Both are true and R is the definition that explains A."),
  q("When you push a table, you also feel a force on your hand.", "Each of two interacting objects experiences a force from the other.", "A", "Both are true and R explains A."),
  q("A bicycle on a flat road slows down and stops after we stop pedalling.", "The road exerts a force of friction on the tyres, opposite to the motion.", "A", "Both are true. Friction opposes the motion and brings the bicycle to a stop."),
  q("The force of friction is greater on rough surfaces.", "Rough surfaces have a large number of irregularities that lock into each other.", "A", "Both are true and R explains A."),
  q("A ball thrown upwards comes back to the ground.", "The Earth attracts every object towards itself.", "A", "Both are true and R explains A."),
  q("The spring stretches by different amounts when different objects are hung from it.", "The Earth pulls different objects with different forces.", "A", "Both are true: the weights of the objects are different, so the stretches are different."),
  q("A mug feels lighter inside the water.", "Water applies an upward force on the mug.", "A", "Both are true: the upthrust reduces the effort needed to hold the mug."),
  q("Pumice, a volcanic rock, floats on water.", "Pumice has tiny bubbles of gas trapped in it, so it is less dense than water.", "A", "Both are true and R explains A."),
  q("A force can change the shape of an object.", "A force can change the speed of an object.", "B", "Both are true, but the change of speed is a different effect and does not explain the change of shape."),
  q("Air and water exert a force of friction on objects moving through them.", "Aeroplanes and ships are given special shapes.", "B", "Both are true, but the special shapes are a result of the friction of air and water, not the reason for it."),
  q("The gravitational force is always attractive.", "The magnetic force can be attractive or repulsive.", "B", "Both are true, but the nature of the magnetic force does not explain the nature of gravity."),
  q("Weight is measured in newton.", "A spring balance is used to measure weight.", "B", "Both are true, but the use of a spring balance does not explain the unit of weight. Weight is a force, so its unit is the newton."),
  q("A charged balloon attracts hair strands.", "A plastic scale rubbed with polythene attracts small pieces of paper.", "B", "Both are true and show the same electrostatic force, but R is another example and not the reason for A."),
  q("A magnet attracts an iron nail from a distance.", "The magnetic force is a contact force.", "C", "A is true. R is false: the magnetic force is a non-contact force."),
  q("The upper ring magnet floats when like poles face each other.", "Unlike poles repel each other.", "C", "A is true. R is false: like poles repel; unlike poles attract."),
  q("A charged plastic scale attracts small pieces of paper.", "The paper pieces are also charged by rubbing with polythene.", "C", "A is true. R is false: the paper pieces were not rubbed; a charged object attracts uncharged objects."),
  q("The weight of a 1 kg object is 25.4 N on Jupiter and 10 N on the Earth.", "The mass of the object is different on Jupiter and on the Earth.", "C", "A is true. R is false: the mass stays 1 kg; the pull of the planet is different."),
  q("An object floats in a liquid when the gravitational force and the buoyant force on it are equal.", "A floating object has no gravitational force acting on it.", "C", "A is true. R is false: gravity acts on every object, floating or not."),
  q("The weight of an object is the same on the Moon and on the Earth.", "The mass of an object is the same everywhere.", "D", "A is false: the weight on the Moon is about one-sixth. R is true: the mass is the same everywhere."),
  q("The weight of a body is measured in kilogram.", "Weight is a force.", "D", "A is false: weight is measured in newton. R is true: weight is a force."),
  q("The mass of an object on the Moon is one-sixth of its mass on the Earth.", "The mass of an object is the amount of matter in it and does not change from place to place.", "D", "A is false: the mass does not change. R is true."),
  q("Two like charges attract each other.", "Two unlike charges attract each other.", "D", "A is false: like charges repel. R is true: unlike charges attract."),
];
