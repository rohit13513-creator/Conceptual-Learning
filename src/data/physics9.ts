// Class 9 CBSE Physics -- Chapter: Describing Motion Around Us (Motion in a straight line,
// graphical representation, kinematic equations, uniform circular motion)
import type {
  QuizQuestion,
  NCERTSolvedQuestion,
  ShortQuestion,
  LongQuestion,
  AssertionReasonQuestion,
  CompetencyQuestion,
} from "../types-custom";

// ── SOLVED TEXTBOOK-STYLE QUESTIONS (in-text "Pause and Ponder" + end-of-chapter "Revise, Reflect,
// Refine" + one derivation from "The Journey Beyond") ──
export const PHYSICS9_NCERT_SOLVED: NCERTSolvedQuestion[] = [
  {
    id: 1,
    questionNumber: "Pause & Ponder 1",
    question: "In the example of an athlete running back and forth on a straight track, when will the displacement of the athlete be zero? What will be the total distance travelled in that case?",
    given: { "Concept": "Displacement vs. total distance travelled for back-and-forth motion" },
    formulaUsed: "Displacement = net change in position (final position - initial position); it depends only on start and end points, not the path taken.",
    derivationSteps: [
      "Displacement is zero whenever the athlete's final position is exactly the same as their starting position O -- i.e. whenever they return all the way back to O, no matter what path they took to get there.",
      "This can happen, for example, if the athlete runs from O to A and then all the way back to O.",
      "In that case the total distance travelled is NOT zero -- it is the sum of every metre actually covered: distance O to A, plus distance A back to O, i.e. 2 x OA.",
      "So displacement being zero does not mean the object did not move; it only means the net change in position is zero."
    ],
    finalAnswer: "The athlete's displacement is zero whenever she returns exactly to her starting point O. In that case, the total distance travelled is not zero -- it equals twice the distance covered in one direction (e.g. 2 x OA if she ran from O to A and back to O).",
    conceptualTip: "Displacement can be zero even when a lot of distance has been covered -- always check whether the object returned to its starting position."
  },
  {
    id: 2,
    questionNumber: "Pause & Ponder 2",
    question: "Fuel used up in a vehicle depends on which of the following? Justify your answer. (i) Total distance travelled (ii) Displacement",
    given: { "Concept": "Fuel consumption relates to the actual path covered by the engine, not the net change in position" },
    formulaUsed: "Fuel consumed is proportional to the total distance travelled by the vehicle.",
    derivationSteps: [
      "A vehicle's engine works continuously as long as the wheels are turning and covering ground, regardless of the direction the vehicle is facing at any moment.",
      "Displacement only tells us the straight-line, net change between the start and end points -- it says nothing about how much ground was actually covered by the engine in between.",
      "For example, a vehicle that drives 50 km forward and then 50 km back to its starting point has a displacement of 0 km, but the engine has still burned fuel for the full 100 km actually driven.",
      "Therefore, fuel consumption tracks with the total distance travelled, not the displacement."
    ],
    finalAnswer: "Fuel used up depends on (i) the total distance travelled, because the engine consumes fuel for every metre it actually covers, irrespective of the net displacement.",
    conceptualTip: "Any real, physical quantity connected to the engine's actual work (fuel, tyre wear, engine running time) depends on total distance, not displacement."
  },
  {
    id: 3,
    questionNumber: "Pause & Ponder 3",
    question: "A ball rolls down an inclined track. Is its motion a straight-line motion? Assuming the starting point O to be the origin, can its motion from O to D be depicted using a horizontal line? Are the values of total distance travelled and magnitude of displacement from O equal or different at positions A, B, C and D?",
    given: { "Concept": "Motion along a straight incline is still linear motion; distance and displacement are equal only if the object never reverses direction" },
    formulaUsed: "For straight-line motion in one direction only, total distance travelled = magnitude of displacement.",
    derivationSteps: [
      "Even though the track is tilted (inclined), the ball still moves along one single straight line from O to D -- so this IS a case of straight-line (linear) motion; only the plane of that line is tilted, not the nature of the motion.",
      "Because the actual path is a straight line, it can be represented on a horizontal reference line/axis exactly like Fig. 4.3, with the distances travelled along the incline simply marked off along that line.",
      "The ball moves continuously in ONE direction the whole time, from O towards D, without ever reversing.",
      "Since the object never turns back, the total distance travelled up to any point (A, B, C or D) is exactly equal to the magnitude of the displacement from O up to that same point."
    ],
    finalAnswer: "Yes, this is straight-line motion (just along a tilted line), and it can be depicted on a horizontal line exactly as in Fig. 4.3. Since the ball moves in one direction only (without turning back), the total distance travelled and the magnitude of displacement from O are EQUAL at every position -- A, B, C and D.",
    conceptualTip: "\"Straight-line motion\" just means the path is a straight line -- it does not have to be horizontal or vertical. Equality of distance and displacement depends only on whether the object ever reverses direction."
  },
  {
    id: 4,
    questionNumber: "Pause & Ponder 4",
    question: "During a family road trip, you drive 200 km north in three hours. Afterwards, you drive 200 km south in two hours. Find the average speed and average velocity for your entire trip.",
    given: { "Distance north": "200 km", "Time north": "3 h", "Distance south": "200 km", "Time south": "2 h" },
    formulaUsed: "average speed = total distance travelled / time interval; average velocity = displacement / time interval",
    derivationSteps: [
      "Total distance travelled = 200 km + 200 km = 400 km.",
      "Total time taken = 3 h + 2 h = 5 h.",
      "average speed = 400 km / 5 h = 80 km/h.",
      "Net displacement: the trip ends exactly where it started (200 km north, then 200 km back south), so total displacement = 0 km.",
      "average velocity = displacement / time = 0 km / 5 h = 0 km/h."
    ],
    finalAnswer: "Average speed = 80 km/h. Average velocity = 0 km/h (since the car returns to its starting point, the net displacement is zero).",
    conceptualTip: "Whenever a trip ends at the same point it started, average velocity is always zero -- even though average speed is clearly not zero."
  },
  {
    id: 5,
    questionNumber: "Pause & Ponder 5",
    question: "Under what condition(s) is the (i) magnitude of average velocity of an object equal to its average speed? (ii) magnitude of average velocity of an object zero while its average speed is not zero?",
    given: { "Concept": "Relationship between distance/speed and displacement/velocity for straight-line motion" },
    formulaUsed: "average speed = total distance / time; average velocity = displacement / time",
    derivationSteps: [
      "(i) The magnitude of average velocity equals average speed exactly when total distance travelled equals the magnitude of displacement.",
      "This happens only when the object moves in a straight line without ever changing direction (moving only one way, never turning back).",
      "(ii) The magnitude of average velocity is zero when the displacement is zero, i.e. the object returns to its exact starting position.",
      "At the same time, average speed is not zero as long as the object actually moved some distance in between -- so this happens whenever the object travels along any path (straight or not) and ends up back at its starting point."
    ],
    finalAnswer: "(i) Magnitude of average velocity = average speed only when the object moves in a straight line in one direction without reversing. (ii) Magnitude of average velocity is zero while average speed is non-zero whenever the object returns to its starting position after covering some actual distance (e.g. going and coming back along the same or a closed path).",
    conceptualTip: "Think of a runner completing one lap of a circular track: displacement = 0, so average velocity = 0, but average speed is definitely not zero since real distance was covered."
  },
  {
    id: 6,
    questionNumber: "Q1",
    question: "My father went to a shop from home which is located at a distance of 250 m on a straight road. On reaching there, he discovered that he forgot to carry a cloth bag. He came home to take it, went to the shop again, bought provisions and came back home. How much was the total distance travelled by him? What was his displacement from home?",
    given: { "Home to shop distance": "250 m (straight road)", "Path": "Home -> Shop -> Home -> Shop -> Home" },
    formulaUsed: "Total distance travelled = sum of every leg actually walked; Displacement = net change in position (initial to final point)",
    derivationSteps: [
      "Journey legs: Home to Shop (250 m) + Shop to Home (250 m) + Home to Shop (250 m) + Shop to Home (250 m).",
      "Total distance = 250 + 250 + 250 + 250 = 1000 m.",
      "He ends up back at home, exactly where he started."
    ],
    finalAnswer: "Total distance travelled = 1000 m (1 km). Displacement from home = 0 m, since he ends up back at his starting point (home).",
    conceptualTip: "Count every leg of the journey for distance, but only compare the very first and very last position for displacement."
  },
  {
    id: 7,
    questionNumber: "Q2",
    question: "A student runs from the ground floor to the fourth floor of a school building to collect a book and then comes down to their classroom on the second floor. If the height of each floor is 3 m, find: (i) the total vertical distance travelled, and (ii) their displacement from the starting point.",
    given: { "Height of each floor": "3 m", "Path": "Ground floor -> 4th floor -> 2nd floor" },
    formulaUsed: "Total distance = sum of every vertical leg travelled; Displacement = net vertical change in position from start to end",
    derivationSteps: [
      "Ground floor to 4th floor: this is a rise of 4 floors = 4 x 3 m = 12 m (up).",
      "4th floor to 2nd floor: this is a drop of 2 floors = 2 x 3 m = 6 m (down).",
      "Total vertical distance travelled = 12 m + 6 m = 18 m.",
      "Displacement: net change from ground floor (0 m) to 2nd floor (2 x 3 m = 6 m above ground) = 6 m upward."
    ],
    finalAnswer: "(i) Total vertical distance travelled = 18 m. (ii) Displacement from the starting point (ground floor) = 6 m, directed upward (since the student ends up on the 2nd floor).",
    conceptualTip: "Treat 'up' as positive and 'down' as negative to track vertical displacement -- but distance always adds up the magnitude of every leg, regardless of direction."
  },
  {
    id: 8,
    questionNumber: "Q3",
    question: "A girl is riding her scooter and finds that its speedometer reading is constant. Is it possible for her scooter to be accelerating and if so, how?",
    given: { "Concept": "Acceleration depends on change in velocity, which includes change in direction, not just change in speed" },
    formulaUsed: "Velocity is a vector (has both magnitude and direction); acceleration occurs whenever velocity changes, even if only the direction changes.",
    derivationSteps: [
      "A speedometer shows only the magnitude of velocity (the speed) -- it never shows the direction of motion.",
      "If the girl is riding along a curved path or going around a turn/bend at a constant reading on the speedometer, her speed stays the same but the direction of her velocity keeps changing continuously.",
      "Since acceleration exists whenever velocity changes -- and a change in DIRECTION alone counts as a change in velocity -- the scooter is accelerating even though the speedometer reading (speed) stays constant.",
      "This is exactly the situation in uniform circular motion, discussed later in the chapter."
    ],
    finalAnswer: "Yes, it is possible. If the scooter is turning or moving along a curved path at constant speed, the direction of its velocity is continuously changing even though its magnitude (speed) is not -- so the scooter is accelerating.",
    conceptualTip: "A constant speedometer reading only rules out acceleration due to speeding up/slowing down -- it says nothing about acceleration due to a change in direction."
  },
  {
    id: 9,
    questionNumber: "Q4",
    question: "A car starts from rest and its velocity reaches 24 m/s in 6 s. Find the average acceleration and the distance travelled in these 6 s.",
    given: { "Initial velocity (u)": "0 m/s (starts from rest)", "Final velocity (v)": "24 m/s", "Time (t)": "6 s" },
    formulaUsed: "a = (v - u) / t;  s = ut + (1/2)at^2",
    derivationSteps: [
      "average acceleration, a = (v - u) / t = (24 - 0) / 6 = 4 m/s^2.",
      "Using s = ut + (1/2)at^2 with u = 0: s = 0 x 6 + (1/2) x 4 x 6^2 = (1/2) x 4 x 36 = 72 m."
    ],
    finalAnswer: "Average acceleration = 4 m/s^2. Distance travelled in 6 s = 72 m.",
    conceptualTip: "Whenever an object 'starts from rest', always take u = 0 -- this is one of the most common CBSE numerical setups."
  },
  {
    id: 10,
    questionNumber: "Q5",
    question: "A motorbike moving with initial velocity 28 m/s and constant acceleration stops after travelling 98 m. Find the acceleration of the motorbike and the time taken to come to a stop.",
    given: { "Initial velocity (u)": "28 m/s", "Final velocity (v)": "0 m/s (comes to a stop)", "Distance (s)": "98 m" },
    formulaUsed: "v^2 = u^2 + 2as;  v = u + at",
    derivationSteps: [
      "Using v^2 = u^2 + 2as: 0^2 = 28^2 + 2 x a x 98",
      "0 = 784 + 196a  =>  a = -784 / 196 = -4 m/s^2.",
      "The negative sign shows this is a deceleration (acting opposite to the direction of motion).",
      "Using v = u + at: 0 = 28 + (-4) x t  =>  t = 28 / 4 = 7 s."
    ],
    finalAnswer: "Acceleration = -4 m/s^2 (a retardation of 4 m/s^2). Time taken to come to a stop = 7 s.",
    conceptualTip: "'Comes to a stop' always means final velocity v = 0 -- this is the key phrase to translate into the equations."
  },
  {
    id: 11,
    questionNumber: "Q6",
    question: "Fig. 4.27 shows a position-time graph of two objects A and B that are moving along parallel tracks in the same direction. Do objects A and B ever have equal velocity? Justify your answer.",
    given: { "Concept": "Velocity at any instant is given by the slope of the position-time graph at that instant" },
    formulaUsed: "velocity = slope of the position-time graph (change in position / change in time)",
    derivationSteps: [
      "On a position-time graph, the velocity of an object at any instant is given by the slope (steepness) of the graph at that point.",
      "Two objects have EQUAL velocity at any instant where their two position-time graphs have the SAME slope (i.e. the two lines are equally steep at that point, whether or not they are at the same position).",
      "If both A and B are represented by straight lines that run parallel to each other throughout (as suggested by them moving on 'parallel tracks' with graphs of the same steepness), the two lines have the same constant slope everywhere.",
      "This means the two objects have equal velocity at every instant, even though B may always be ahead of (or behind) A by a fixed separation."
    ],
    finalAnswer: "Yes -- wherever the two position-time lines have the same slope, A and B have equal velocity at that instant. If, as shown in the graph, the two lines are straight and parallel to each other throughout, A and B move with the same constant velocity at all times (only their starting positions differ). To read the exact instant(s) from your own printed graph, compare the steepness of the two lines directly -- equal steepness means equal velocity at that point.",
    conceptualTip: "Never compare the POSITIONS of two lines to judge velocity -- always compare their SLOPES. Lines can be far apart on the graph and still represent equal velocity."
  },
  {
    id: 12,
    questionNumber: "Q7",
    question: "A graph in Fig. 4.28 shows the change in position with time for two objects A and B moving in a straight line from 0 to 10 seconds. Choose the correct option(s): (i) The average velocity of both over the 10 s time interval is equal since they have the same initial and final positions. (ii) The average speeds of both over the 10 s time interval are equal since both cover equal distance in equal time. (iii) The average speed of A over the 10 s time interval is lower than that of B since it covers a shorter distance than B in 10 seconds. (iv) The average speed of A over the 10 s time interval is greater than that of B since B's speed is lower than A's in some segments.",
    given: { "Time interval": "0 s to 10 s", "Both A and B": "start and end at the same positions" },
    formulaUsed: "average velocity = displacement / time (depends only on start/end position); average speed = total distance travelled / time (depends on the actual path taken)",
    derivationSteps: [
      "Average velocity depends ONLY on the net displacement (initial and final position), never on the path taken in between.",
      "Since A and B share the same initial and final positions over the same 10 s interval, their displacements are identical, so their average velocities MUST be equal -- this makes statement (i) correct by definition, regardless of what either graph looks like in between.",
      "Average speed, however, depends on the TOTAL DISTANCE actually covered along the path -- if one object's graph moves back and forth or takes a longer/curvier route between the same two endpoints, it covers more distance even though it ends up at the same final position.",
      "So average speeds are equal only if both objects travelled the exact same total distance -- this is not guaranteed just because the endpoints match, so (ii) is not necessarily true.",
      "Statements (iii) and (iv) directly contradict each other and depend on which object's actual path (as drawn in the graph) is longer -- only one of them can be correct, and this must be read from the specific shape of each curve in the printed figure."
    ],
    finalAnswer: "Statement (i) is always correct: average velocity is equal for A and B because they share the same initial and final positions over the same time interval. Statement (ii) is not necessarily true, since equal endpoints do not guarantee equal distance travelled. Between (iii) and (iv), whichever object's graph shows a longer/more winding path (a route that covers more total distance despite ending at the same point) has the higher average speed -- check which curve is longer in your printed graph to pick the correct one.",
    conceptualTip: "This is a classic exam trap: 'same start and end point' guarantees equal average VELOCITY but never guarantees equal average SPEED."
  },
  {
    id: 13,
    questionNumber: "Q8",
    question: "A truck driver driving at the speed of 54 km/h notices a road sign with a speed limit of 40 km/h for trucks. He slows down to 36 km/h in 36 s. What was the distance travelled by him during this time? Assume the acceleration to be constant while slowing down.",
    given: { "Initial velocity (u)": "54 km/h = 15 m/s", "Final velocity (v)": "36 km/h = 10 m/s", "Time (t)": "36 s" },
    formulaUsed: "s = [(u + v) / 2] x t  (average of initial and final velocity, multiplied by time, for constant acceleration)",
    derivationSteps: [
      "Convert to SI units: u = 54 x (1000/3600) = 15 m/s; v = 36 x (1000/3600) = 10 m/s.",
      "For constant acceleration, s = [(u + v) / 2] x t.",
      "s = [(15 + 10) / 2] x 36 = (25 / 2) x 36 = 12.5 x 36.",
      "s = 450 m."
    ],
    finalAnswer: "Distance travelled while slowing down = 450 m.",
    conceptualTip: "Always convert km/h to m/s first (multiply by 5/18) before using the kinematic equations, which are set up in SI units."
  },
  {
    id: 14,
    questionNumber: "Q9",
    question: "A car starts from rest and accelerates uniformly to 20 m/s in 5 seconds. It then travels at 20 m/s for 10 seconds and finally applies the brake (with uniform acceleration) to stop in 6 seconds. Find the total distance travelled.",
    given: { "Phase 1": "u = 0, v = 20 m/s, t = 5 s", "Phase 2": "constant v = 20 m/s, t = 10 s", "Phase 3": "u = 20 m/s, v = 0, t = 6 s" },
    formulaUsed: "s = [(u + v) / 2] x t for each phase of constant acceleration (or constant velocity)",
    derivationSteps: [
      "Phase 1 (speeding up): s1 = [(0 + 20) / 2] x 5 = 10 x 5 = 50 m.",
      "Phase 2 (constant speed): s2 = 20 m/s x 10 s = 200 m.",
      "Phase 3 (braking): s3 = [(20 + 0) / 2] x 6 = 10 x 6 = 60 m.",
      "Total distance = s1 + s2 + s3 = 50 + 200 + 60 = 310 m."
    ],
    finalAnswer: "Total distance travelled = 310 m.",
    conceptualTip: "Break multi-stage motion problems into separate phases and apply the kinematic equations (or simple v x t for constant speed) to each phase before adding the results."
  },
  {
    id: 15,
    questionNumber: "Q10",
    question: "A bus is travelling at 36 km/h when the driver sees an obstacle 30 m ahead. The driver takes 0.5 seconds to react before pressing the brake. Once the brake is applied, the velocity of the bus reduces with constant acceleration of 2.5 m/s^2. Will the bus be able to stop before reaching the obstacle?",
    given: { "Initial velocity": "36 km/h = 10 m/s", "Distance to obstacle": "30 m", "Reaction time": "0.5 s", "Deceleration after braking": "2.5 m/s^2" },
    formulaUsed: "During reaction time, the bus moves at constant velocity: distance = speed x time. After braking: v^2 = u^2 + 2as",
    derivationSteps: [
      "Convert speed: 36 km/h = 36 x (1000/3600) = 10 m/s.",
      "Distance covered during the 0.5 s reaction time (bus still moving at 10 m/s, brakes not yet applied): d_reaction = 10 x 0.5 = 5 m.",
      "Remaining distance available for braking = 30 - 5 = 25 m.",
      "Using v^2 = u^2 + 2as with u = 10 m/s, a = -2.5 m/s^2, v = 0: 0 = 10^2 + 2 x (-2.5) x s",
      "0 = 100 - 5s  =>  s = 20 m (the braking distance needed to stop).",
      "Since the braking distance required (20 m) is less than the remaining distance available (25 m), the bus stops in time."
    ],
    finalAnswer: "Yes, the bus stops before reaching the obstacle. It needs 5 m (reaction) + 20 m (braking) = 25 m in total to stop, which is 5 m less than the 30 m available.",
    conceptualTip: "Never forget the 'reaction time' phase in braking-distance problems -- the vehicle keeps moving at its original speed during this time, before any deceleration begins."
  },
  {
    id: 16,
    questionNumber: "Q11",
    question: "A student said, \"The Earth moves around the Sun\". In this context, discuss whether an object kept on the Earth can be considered to be at rest.",
    given: { "Concept": "Rest and motion are relative -- they depend on the chosen reference point" },
    formulaUsed: "An object is at rest if its position does not change with respect to the chosen reference point, and in motion if it does.",
    derivationSteps: [
      "Whether an object is 'at rest' or 'in motion' is never absolute -- it always depends on what reference point we choose to measure its position against.",
      "If we take a point on the Earth's surface as our reference point, an object simply resting on the ground does not change its position relative to the Earth, so it can correctly be called 'at rest' with respect to the Earth.",
      "However, if we take the Sun as the reference point, the entire Earth (and everything on it, including that object) is continuously changing position as the Earth orbits the Sun -- so, with respect to the Sun, the same object is clearly in motion.",
      "Therefore, the same object can be truthfully described as both 'at rest' and 'in motion' at the same time, depending purely on the reference point chosen."
    ],
    finalAnswer: "Yes, an object on Earth can be considered at rest -- but only relative to the Earth as the reference point. Relative to the Sun (or any point outside the Earth), the same object is in motion, since it travels along with the Earth's orbit. Rest and motion are always relative to the chosen reference point, never absolute.",
    conceptualTip: "This is the single most important 'concept' question in the chapter -- rest/motion is always RELATIVE to a chosen reference point, never an absolute property of the object."
  },
  {
    id: 17,
    questionNumber: "Q12",
    question: "The velocity-time graph from 0 s to 120 s for a cyclist is shown in Fig. 4.30. Shade the areas representing the displacement of the cyclist (i) while moving with constant velocity, and (ii) when the velocity is decreasing. Also calculate the displacement and average acceleration in the 120 s time interval.",
    given: { "Concept": "Area under a velocity-time graph = displacement; slope of a velocity-time graph = acceleration" },
    formulaUsed: "displacement = area enclosed between the v-t graph and the time axis; average acceleration = (final velocity - initial velocity) / total time",
    derivationSteps: [
      "(i) The region where the velocity-time line is a horizontal straight line (parallel to the time axis) represents constant velocity -- shade the rectangle formed between this horizontal segment and the time axis to represent that phase's displacement.",
      "(ii) The region where the line slopes downward (velocity decreasing towards zero) represents deceleration -- shade the triangular (or trapezoidal) region between this sloping segment and the time axis for that phase's displacement.",
      "To calculate the total displacement over 0-120 s, add up the areas of every individual shaded region (rectangle for the constant-velocity phase + triangle for the decreasing-velocity phase, and any accelerating phase, using area = 1/2 x base x height for triangles and length x breadth for rectangles).",
      "To calculate average acceleration over the full 120 s interval, use a = (v_final - v_initial) / 120 s, reading the initial velocity at t = 0 s and the final velocity at t = 120 s directly from your printed graph."
    ],
    finalAnswer: "Displacement in each phase equals the area between that portion of the graph and the time axis (rectangle for constant velocity, triangle/trapezium for changing velocity); add all phase-areas for the total 120 s displacement. Average acceleration = (velocity at 120 s - velocity at 0 s) / 120 s. Substitute the exact velocity values marked on your printed graph's axis into these formulas to get the final numeric answers.",
    conceptualTip: "Always split a multi-segment velocity-time graph into simple rectangle/triangle/trapezium shapes first -- then apply the basic area formulas to each piece separately before adding them up."
  },
  {
    id: 18,
    questionNumber: "Q13",
    question: "A girl is preparing for her first marathon by running on a straight road. She uses a smartwatch to calculate her running speed at different intervals. The graph (Fig. 4.31) depicts her velocity versus time. Estimate the distance she ran based on the graph.",
    given: { "Concept": "Distance covered = area under the velocity-time graph" },
    formulaUsed: "distance = area enclosed between the velocity-time graph and the time axis",
    derivationSteps: [
      "Since the graph plots her velocity against time, the total distance she covered is given by the total area enclosed between the plotted line and the time axis, over the full time interval shown.",
      "Break the graph into simple geometric shapes (rectangles for constant-velocity stretches, triangles or trapeziums for stretches where her speed is increasing or decreasing).",
      "Calculate the area of each individual shape using length x breadth (rectangle) or 1/2 x base x height (triangle), reading the exact velocity and time values marked on the axes of your printed graph.",
      "Add up the areas of all the individual shapes to estimate the total distance run."
    ],
    finalAnswer: "The distance she ran is estimated by adding up the areas of every geometric shape formed between her velocity-time graph and the time axis. Read the velocity and time values marked on your printed graph's axes, split the graph into rectangles/triangles, and sum their areas to get the final estimated distance.",
    conceptualTip: "The word 'estimate' is a hint that you are expected to approximate the graph using simple shapes rather than needing an exact curve-fitting formula."
  },
  {
    id: 19,
    questionNumber: "Q14",
    question: "On entering a state highway, a car continues to move with a constant velocity of 6 m/s for 2 minutes and then accelerates with a constant acceleration of 1 m/s^2 for 6 seconds. Find the displacement of the car on the state highway in the 2 min 6 s time interval by drawing a velocity-time graph for its motion.",
    given: { "Phase 1": "constant v = 6 m/s for 2 min = 120 s", "Phase 2": "u = 6 m/s, a = 1 m/s^2, t = 6 s" },
    formulaUsed: "Constant velocity phase: s = v x t.  Accelerating phase: s = ut + (1/2)at^2",
    derivationSteps: [
      "Phase 1 (constant velocity): s1 = v x t = 6 m/s x 120 s = 720 m.",
      "Phase 2 (accelerating): s2 = ut + (1/2)at^2 = (6 x 6) + (1/2)(1)(6^2) = 36 + (1/2)(1)(36) = 36 + 18 = 54 m.",
      "Total displacement = s1 + s2 = 720 + 54 = 774 m.",
      "On a velocity-time graph, this total is exactly the area of the rectangle (0 to 120 s, height 6 m/s) plus the area of the trapezium/triangle-topped region (120 s to 126 s, rising from 6 m/s to 12 m/s)."
    ],
    finalAnswer: "Total displacement in the 2 min 6 s (126 s) interval = 774 m (720 m during the constant-velocity phase + 54 m during the accelerating phase).",
    conceptualTip: "Always convert every given time into the same unit (here, minutes to seconds) before substituting into the kinematic equations."
  },
  {
    id: 20,
    questionNumber: "Q15",
    question: "Two cars A and B start moving with a constant acceleration from rest, in a straight line. Car A attains a velocity of 5 m/s in 5 s. Car B attains a velocity of 3 m/s in 10 s. Plot the velocity-time graphs for both cars on the same graph. Using the graph, calculate the displacement in the two time intervals mentioned.",
    given: { "Car A": "u = 0, v = 5 m/s, t = 5 s", "Car B": "u = 0, v = 3 m/s, t = 10 s" },
    formulaUsed: "s = [(u + v) / 2] x t  (equivalently, the area of the triangle under each velocity-time graph)",
    derivationSteps: [
      "Car A's acceleration: a_A = (5 - 0) / 5 = 1 m/s^2. On the graph, this is a straight line from (0 s, 0 m/s) to (5 s, 5 m/s).",
      "Displacement of Car A (area of the triangle under its line) = [(0 + 5) / 2] x 5 = 2.5 x 5 = 12.5 m.",
      "Car B's acceleration: a_B = (3 - 0) / 10 = 0.3 m/s^2. On the graph, this is a straight line from (0 s, 0 m/s) to (10 s, 3 m/s).",
      "Displacement of Car B (area of the triangle under its line) = [(0 + 3) / 2] x 10 = 1.5 x 10 = 15 m."
    ],
    finalAnswer: "Displacement of Car A in its 5 s interval = 12.5 m. Displacement of Car B in its 10 s interval = 15 m.",
    conceptualTip: "For any object starting from rest with constant acceleration, the area under its v-t graph is a right-angled triangle, so displacement = 1/2 x base(time) x height(final velocity)."
  },
  {
    id: 21,
    questionNumber: "Q16",
    question: "Rohan studies science from 6 PM to 7:30 PM at home. Consider the tip of the minute's hand of the wall clock. During the given time interval, what is its (i) distance travelled, (ii) displacement, (iii) speed, and (iv) velocity? The length of the minute's hand is 7 cm.",
    given: { "Radius (length of minute hand), r": "7 cm", "Time interval": "6:00 PM to 7:30 PM = 1.5 hours = 90 minutes = 5400 s" },
    formulaUsed: "In one full revolution: distance = circumference = 2*pi*r; number of revolutions = time / 60 min. After a half-integer number of revolutions, displacement = diameter = 2r.",
    derivationSteps: [
      "The minute hand completes 1 full revolution every 60 minutes. In 90 minutes, it completes 90/60 = 1.5 revolutions.",
      "Circumference of the circular path = 2*pi*r = 2 x (22/7) x 7 = 44 cm.",
      "(i) Total distance travelled = 1.5 x 44 cm = 66 cm.",
      "(ii) After exactly 1 full revolution (60 min), the tip returns to its starting point. In the remaining half revolution (0.5 rev), it moves to the exact diametrically opposite point on the circle. So the net displacement = diameter = 2r = 2 x 7 = 14 cm.",
      "(iii) Speed = total distance / time = 66 cm / 5400 s = 0.0122 cm/s (approximately 1.22 x 10^-2 cm/s).",
      "(iv) Velocity (magnitude) = displacement / time = 14 cm / 5400 s = 0.0026 cm/s (approximately 2.6 x 10^-3 cm/s)."
    ],
    finalAnswer: "(i) Distance travelled = 66 cm. (ii) Displacement = 14 cm. (iii) Speed ~ 1.22 x 10^-2 cm/s. (iv) Velocity (magnitude) ~ 2.6 x 10^-3 cm/s.",
    conceptualTip: "For a clock hand completing a half-integer number of revolutions (like 1.5), the displacement is simply the diameter (2r) -- the tip ends up exactly opposite its starting point."
  },
  {
    id: 22,
    questionNumber: "Journey Beyond",
    question: "Derive the two remaining kinematic equations, s = vt - (1/2)at^2 and s = [(u + v)/2] x t, starting from the two primary equations v = u + at and s = ut + (1/2)at^2. (Use the trapezium area formula for the second one, as hinted in the textbook.)",
    given: { "Primary equations": "v = u + at  (Eq. 4.4a)  and  s = ut + (1/2)at^2  (Eq. 4.4b)" },
    formulaUsed: "Substitution of u from Eq. 4.4a into Eq. 4.4b; Area of a trapezium = (1/2) x (sum of parallel sides) x height",
    derivationSteps: [
      "Derivation 1 -- eliminating u to get s = vt - (1/2)at^2:",
      "From v = u + at, we get u = v - at.",
      "Substitute into s = ut + (1/2)at^2:  s = (v - at)t + (1/2)at^2 = vt - at^2 + (1/2)at^2.",
      "s = vt - (1/2)at^2.",
      "Derivation 2 -- using the trapezium area of the velocity-time graph to get s = [(u + v)/2] x t:",
      "In the velocity-time graph (Fig. 4.19), the region OABD is a trapezium whose two parallel sides are the initial velocity u (side AO) and the final velocity v (side BD), and whose height/width is the time interval t (side OD).",
      "Displacement s = area enclosed = area of trapezium = (1/2) x (sum of parallel sides) x height = (1/2) x (u + v) x t.",
      "s = [(u + v) / 2] x t."
    ],
    finalAnswer: "s = vt - (1/2)at^2  (derived by substituting u = v - at into s = ut + (1/2)at^2).  s = [(u + v)/2] x t  (derived from the trapezium area of the velocity-time graph).",
    conceptualTip: "All five kinematic equations (v = u+at, s = ut+½at², v² = u²+2as, s = vt-½at², s = (u+v)t/2) are just algebraic rearrangements of the same two primary equations -- you never need to memorise all five independently."
  },
];

// ── QUESTION BANK: MULTIPLE CHOICE QUESTIONS (100) ──
export const PHYSICS9_MCQS: QuizQuestion[] = [
  { id: 1, question: "An object is said to be in motion if:", options: ["It has mass", "Its position changes with time with respect to a reference point", "It is touched", "It has a shape"], correctAnswer: 1, explanation: "Motion is defined as a change in the position of an object with respect to a reference point, over time." },
  { id: 2, question: "The fixed point used to describe the position of an object is called the:", options: ["Origin/reference point", "Focus", "Centre of mass", "Boundary"], correctAnswer: 0, explanation: "A reference point (origin) is required as a fixed baseline to describe the position and motion of any object." },
  { id: 3, question: "To completely describe the position of an object, we need to specify:", options: ["Only its distance from the reference point", "Only its direction from the reference point", "Both its distance and direction from the reference point", "Neither distance nor direction"], correctAnswer: 2, explanation: "Position requires both the distance from the reference point and the direction in which the object lies, relative to that point." },
  { id: 4, question: "An object is said to be at rest if:", options: ["Its speed is very low", "Its position does not change with time with respect to the reference point", "It has no mass", "It is inside a vehicle"], correctAnswer: 1, explanation: "An object is at rest when its position remains unchanged relative to the chosen reference point as time passes." },
  { id: 5, question: "A single reading of a clock at a specific moment is called:", options: ["A time interval", "An instant of time", "A duration", "A period"], correctAnswer: 1, explanation: "An instant of time is a single clock reading at a given point in time, distinct from a time interval (the duration between two instants)." },
  { id: 6, question: "The time duration between two instants of time is called:", options: ["An instant", "A time interval", "A frequency", "A period only"], correctAnswer: 1, explanation: "A time interval is the elapsed duration between two separate instants (clock readings)." },
  { id: 7, question: "Positions to the right of the reference point on a straight line are conventionally taken as:", options: ["Negative", "Positive", "Zero", "Undefined"], correctAnswer: 1, explanation: "By convention, positions to the right of the origin are taken as positive, and to the left as negative." },
  { id: 8, question: "The type of motion in which an object moves along a straight line is called:", options: ["Circular motion", "Oscillatory motion", "Linear (straight-line) motion", "Random motion"], correctAnswer: 2, explanation: "Motion along a straight line is called linear motion, the simplest kind of motion." },
  { id: 9, question: "The total path length covered by an object, irrespective of direction, is called its:", options: ["Displacement", "Distance travelled", "Velocity", "Position"], correctAnswer: 1, explanation: "Distance travelled is the total length of the actual path covered by the object, with no regard for direction." },
  { id: 10, question: "The net change in position of an object between two instants of time is called its:", options: ["Distance", "Speed", "Displacement", "Acceleration"], correctAnswer: 2, explanation: "Displacement is defined as the net change in position between two given instants." },
  { id: 11, question: "The SI unit of both distance and displacement is the:", options: ["Second", "Metre", "Metre per second", "Newton"], correctAnswer: 1, explanation: "Both distance and displacement are lengths, so their SI unit is the metre (m)." },
  { id: 12, question: "The numerical value (with units) of a physical quantity like displacement is called its:", options: ["Direction", "Vector", "Magnitude", "Scalar sum"], correctAnswer: 2, explanation: "Magnitude is the numerical value (with appropriate units) of a physical quantity, independent of its direction." },
  { id: 13, question: "A physical quantity that requires only a numerical value to be fully specified is called a:", options: ["Vector", "Scalar", "Tensor", "Unit"], correctAnswer: 1, explanation: "Scalars are physical quantities fully described by magnitude alone, e.g. distance and speed." },
  { id: 14, question: "A physical quantity that requires both magnitude and direction to be fully specified is called a:", options: ["Scalar", "Vector", "Constant", "Ratio"], correctAnswer: 1, explanation: "Vectors are physical quantities that need both a magnitude and a direction, e.g. displacement and velocity." },
  { id: 15, question: "Which of the following is a vector quantity?", options: ["Distance", "Speed", "Displacement", "Time"], correctAnswer: 2, explanation: "Displacement is a vector because it requires both magnitude and direction to be fully described." },
  { id: 16, question: "Which of the following is a scalar quantity?", options: ["Displacement", "Velocity", "Acceleration", "Distance"], correctAnswer: 3, explanation: "Distance is a scalar quantity -- it has only magnitude, no associated direction." },
  { id: 17, question: "For motion in a straight line without ever turning back, the total distance travelled and the magnitude of displacement are:", options: ["Always different", "Always equal", "Related only by a factor of 2", "Never comparable"], correctAnswer: 1, explanation: "If an object moves in one direction only (no reversal), the total distance equals the magnitude of displacement." },
  { id: 18, question: "The magnitude of displacement can never be:", options: ["Equal to the distance travelled", "Zero", "Greater than the distance travelled", "Less than the distance travelled"], correctAnswer: 2, explanation: "The magnitude of displacement is always less than or equal to the total distance travelled -- it can never exceed it, since displacement is the shortest net change in position." },
  { id: 19, question: "A person walks 4 m east and then 3 m west. The distance travelled and the magnitude of displacement are respectively:", options: ["7 m and 7 m", "7 m and 1 m", "1 m and 7 m", "1 m and 1 m"], correctAnswer: 1, explanation: "Distance = 4 + 3 = 7 m (total path). Displacement = 4 - 3 = 1 m east (net change in position)." },
  { id: 20, question: "An athlete runs one full round of a circular track of circumference 400 m and returns to the starting point. The distance travelled and displacement are:", options: ["400 m and 400 m", "0 m and 400 m", "400 m and 0 m", "0 m and 0 m"], correctAnswer: 2, explanation: "Distance travelled equals the full circumference (400 m), but since the athlete returns to the exact starting point, displacement is zero." },
  { id: 21, question: "The average speed of an object is defined as:", options: ["Displacement divided by time", "Total distance travelled divided by the time interval", "Time divided by distance", "Change in velocity divided by time"], correctAnswer: 1, explanation: "Average speed = total distance travelled / time interval, as per Eq. 4.1 in the chapter." },
  { id: 22, question: "Average speed is a:", options: ["Vector quantity, since it is derived from distance", "Scalar quantity, since distance travelled has no direction", "Neither scalar nor vector", "Always negative quantity"], correctAnswer: 1, explanation: "Since average speed is calculated from distance travelled (which has no direction), it is also a scalar quantity." },
  { id: 23, question: "If an object travels equal distances in equal intervals of time (for every possible interval), its motion is called:", options: ["Non-uniform motion", "Uniform motion", "Circular motion", "Retarded motion"], correctAnswer: 1, explanation: "Uniform motion in a straight line means the object covers equal distances in every equal time interval, i.e. it moves at constant speed." },
  { id: 24, question: "If an object covers unequal distances in equal intervals of time, its motion is called:", options: ["Uniform motion", "Circular motion", "Non-uniform motion", "Zero motion"], correctAnswer: 2, explanation: "Non-uniform motion means the object's speed is changing -- it covers unequal distances in equal time intervals." },
  { id: 25, question: "The average velocity of an object in a time interval is defined as:", options: ["Total distance travelled divided by time", "Displacement divided by the time interval", "Acceleration multiplied by time", "Distance multiplied by time"], correctAnswer: 1, explanation: "Average velocity = displacement / time interval, as per Eq. 4.2a." },
  { id: 26, question: "Average velocity is a:", options: ["Scalar quantity", "Vector quantity", "Dimensionless quantity", "Unit-less ratio"], correctAnswer: 1, explanation: "Since average velocity is derived from displacement (a vector), it is itself a vector quantity, having both magnitude and direction." },
  { id: 27, question: "The SI unit of both average speed and average velocity is:", options: ["m", "m/s", "s", "m/s^2"], correctAnswer: 1, explanation: "Both average speed and average velocity have the SI unit of metre per second (m/s), sometimes also expressed as km/h." },
  { id: 28, question: "For straight-line motion in one direction only, average speed and the magnitude of average velocity are:", options: ["Always different", "Always equal", "Related by a factor of pi", "Unrelated"], correctAnswer: 1, explanation: "When the object moves in one direction without reversing, average speed equals the magnitude of average velocity, since distance = |displacement| in this case." },
  { id: 29, question: "If a runner covers 400 m on a circular track and returns to the starting point in 80 s, their average velocity is:", options: ["5 m/s", "0 m/s", "400 m/s", "80 m/s"], correctAnswer: 1, explanation: "Since the runner returns to the starting point, displacement is 0, making average velocity = 0/80 = 0 m/s (even though average speed is 5 m/s)." },
  { id: 30, question: "A car travels 100 km in 2 hours. Its average speed is:", options: ["200 km/h", "50 km/h", "0.02 km/h", "102 km/h"], correctAnswer: 1, explanation: "Average speed = distance/time = 100 km / 2 h = 50 km/h." },
  { id: 31, question: "A ratio of change in one quantity to the corresponding change in time is called a:", options: ["Vector product", "Rate of change", "Scalar product", "Unit conversion"], correctAnswer: 1, explanation: "The rate of change of a quantity is defined as the ratio of the change in that quantity to the corresponding change in time." },
  { id: 32, question: "Average velocity can be described as the average rate of change of:", options: ["Time with respect to position", "Acceleration with respect to time", "Position of an object with respect to time", "Speed with respect to distance"], correctAnswer: 2, explanation: "Average velocity is precisely the average rate of change of an object's position with respect to time." },
  { id: 33, question: "The average acceleration of an object over a time interval is defined as:", options: ["Change in velocity divided by the time interval", "Change in position divided by time", "Velocity multiplied by time", "Displacement divided by velocity"], correctAnswer: 0, explanation: "Average acceleration = change in velocity / time interval, as per Eq. 4.3a." },
  { id: 34, question: "The SI unit of average acceleration is:", options: ["m/s", "m", "m/s^2", "s^2/m"], correctAnswer: 2, explanation: "Since acceleration is the rate of change of velocity (m/s) with time (s), its SI unit is m/s^2." },
  { id: 35, question: "If the magnitude of an object's velocity is increasing in a given time interval, the average acceleration acts:", options: ["Opposite to the direction of velocity", "In the direction of velocity", "Perpendicular to velocity", "In a random direction"], correctAnswer: 1, explanation: "When speed is increasing, acceleration acts in the same direction as the velocity, reinforcing the motion." },
  { id: 36, question: "If the magnitude of an object's velocity is decreasing in a given time interval, the average acceleration acts:", options: ["In the direction of velocity", "Opposite to the direction of velocity", "At 90 degrees to velocity", "It cannot be determined"], correctAnswer: 1, explanation: "When speed is decreasing, the acceleration (often called retardation/deceleration) acts opposite to the direction of velocity." },
  { id: 37, question: "For an object moving in a straight line in the same direction, if the magnitude of velocity increases by equal amounts in equal time intervals, the acceleration is:", options: ["Zero", "Constant", "Always negative", "Undefined"], correctAnswer: 1, explanation: "Equal changes in velocity over equal time intervals is the defining condition for constant (uniform) acceleration." },
  { id: 38, question: "A bus moving on a straight highway at a constant velocity has an acceleration of:", options: ["Maximum value", "Zero", "Negative infinity", "Equal to its velocity"], correctAnswer: 1, explanation: "Since velocity is not changing (constant), the acceleration is zero, no matter how high the constant speed is." },
  { id: 39, question: "A body dropped from a height falls with an acceleration due to gravity of approximately:", options: ["9.8 m/s (constant velocity)", "9.8 m/s^2", "0 m/s^2", "98 m/s^2"], correctAnswer: 1, explanation: "The acceleration due to gravity near Earth's surface is approximately 9.8 m/s^2, directed downward, and denoted by g." },
  { id: 40, question: "A car's velocity changes from 10 m/s to 30 m/s in 5 s. Its average acceleration is:", options: ["2 m/s^2", "4 m/s^2", "8 m/s^2", "40 m/s^2"], correctAnswer: 1, explanation: "a = (v - u)/t = (30 - 10)/5 = 20/5 = 4 m/s^2." },
  { id: 41, question: "A scooter decelerates from 20 m/s to 0 m/s in 4 s. The magnitude of its average acceleration is:", options: ["5 m/s^2", "80 m/s^2", "16 m/s^2", "0.2 m/s^2"], correctAnswer: 0, explanation: "a = (v-u)/t = (0-20)/4 = -5 m/s^2; magnitude = 5 m/s^2." },
  { id: 42, question: "On a position-time graph, the slope of the graph at any point gives:", options: ["Acceleration", "Velocity", "Distance", "Force"], correctAnswer: 1, explanation: "The slope of a position-time graph represents the velocity of the object at that instant." },
  { id: 43, question: "A straight-line position-time graph (not parallel to the time axis) indicates that the object is moving with:", options: ["Zero velocity", "Constant (uniform) velocity", "Changing (non-uniform) velocity", "Infinite velocity"], correctAnswer: 1, explanation: "A straight-line position-time graph means equal changes in position occur in equal time intervals, i.e. constant velocity." },
  { id: 44, question: "A curved position-time graph indicates that the object's motion is:", options: ["Uniform", "At rest", "Accelerated (non-uniform velocity)", "Impossible"], correctAnswer: 2, explanation: "A curved position-time graph means the slope (velocity) is continuously changing, so the object is undergoing accelerated motion." },
  { id: 45, question: "A position-time graph that is a straight horizontal line parallel to the time axis represents an object that is:", options: ["Moving with maximum velocity", "At rest (stationary)", "Accelerating uniformly", "Moving backward"], correctAnswer: 1, explanation: "A horizontal line on a position-time graph means the position is not changing with time, i.e. the object is at rest." },
  { id: 46, question: "On a velocity-time graph, the slope of the graph at any point gives:", options: ["Displacement", "Distance", "Acceleration", "Position"], correctAnswer: 2, explanation: "The slope of a velocity-time graph gives the acceleration, since acceleration is the rate of change of velocity." },
  { id: 47, question: "On a velocity-time graph, the area enclosed between the graph and the time axis, for a given time interval, gives:", options: ["Acceleration", "Displacement", "Average speed only", "Nothing physically meaningful"], correctAnswer: 1, explanation: "The area under a velocity-time graph, between the line and the time axis, represents the displacement in that time interval." },
  { id: 48, question: "A velocity-time graph that is a straight horizontal line parallel to the time axis represents:", options: ["Zero velocity throughout", "Constant velocity and zero acceleration", "Uniformly increasing velocity", "Uniformly decreasing velocity"], correctAnswer: 1, explanation: "A horizontal velocity-time line means the velocity is not changing, so the object has constant velocity and zero acceleration." },
  { id: 49, question: "A velocity-time graph that is a straight line sloping upward represents motion with:", options: ["Zero acceleration", "Constant, positive acceleration (speeding up)", "Constant, negative acceleration (slowing down)", "Non-uniform acceleration"], correctAnswer: 1, explanation: "An upward-sloping straight velocity-time line means velocity is increasing at a constant rate, i.e. constant positive acceleration." },
  { id: 50, question: "A velocity-time graph that is a straight line sloping downward towards zero represents motion with:", options: ["Increasing velocity", "Constant velocity", "Constant deceleration (velocity decreasing at a constant rate)", "Infinite acceleration"], correctAnswer: 2, explanation: "A downward-sloping straight velocity-time line means velocity is decreasing at a constant rate, i.e. constant deceleration." },
  { id: 51, question: "For a vehicle moving at a constant velocity of 20 m/s for 6 s, the displacement calculated from the area under its velocity-time graph is:", options: ["26 m", "120 m", "3.33 m", "20 m"], correctAnswer: 1, explanation: "Area of the rectangle = velocity x time = 20 m/s x 6 s = 120 m." },
  { id: 52, question: "Which of the following equations correctly relates final velocity (v), initial velocity (u), acceleration (a), and time (t)?", options: ["v = u - at", "v = u + at", "v = at - u", "v = u/at"], correctAnswer: 1, explanation: "This is the first kinematic equation, v = u + at, derived directly from the definition of average acceleration." },
  { id: 53, question: "Which of the following is the correct kinematic equation for displacement (s) with constant acceleration?", options: ["s = ut - (1/2)at^2", "s = ut + (1/2)at^2", "s = ut + at", "s = u + (1/2)at^2"], correctAnswer: 1, explanation: "This is the second kinematic equation, s = ut + (1/2)at^2." },
  { id: 54, question: "Which of the following is the correct kinematic equation relating v, u, a, and s (without using t)?", options: ["v^2 = u^2 + 2as", "v = u^2 + 2as", "v^2 = u + 2as", "v^2 = u^2 - as"], correctAnswer: 0, explanation: "This is the third kinematic equation, v^2 = u^2 + 2as, obtained by eliminating time from the first two." },
  { id: 55, question: "The kinematic equations v = u + at, s = ut + (1/2)at^2, and v^2 = u^2 + 2as are valid only when:", options: ["The object moves in a circle", "The acceleration is constant", "The object is at rest", "The velocity is zero"], correctAnswer: 1, explanation: "The kinematic (equations of motion) are derived assuming constant acceleration, and are valid only under that condition." },
  { id: 56, question: "A car starting from rest reaches a velocity of 10 m/s in 5 s. Using v = u + at, its acceleration is:", options: ["0.5 m/s^2", "2 m/s^2", "5 m/s^2", "50 m/s^2"], correctAnswer: 1, explanation: "a = (v-u)/t = (10-0)/5 = 2 m/s^2." },
  { id: 57, question: "A body starts from rest with an acceleration of 2 m/s^2. Using s = ut + (1/2)at^2, the distance covered in 4 s is:", options: ["8 m", "16 m", "4 m", "32 m"], correctAnswer: 1, explanation: "s = 0(4) + (1/2)(2)(4^2) = (1/2)(2)(16) = 16 m." },
  { id: 58, question: "A body moving at 10 m/s comes to rest after travelling 25 m with constant deceleration. Using v^2 = u^2 + 2as, the deceleration is:", options: ["1 m/s^2", "2 m/s^2", "5 m/s^2", "10 m/s^2"], correctAnswer: 1, explanation: "0 = 10^2 + 2a(25)  =>  0 = 100 + 50a  =>  a = -2 m/s^2, so the deceleration is 2 m/s^2." },
  { id: 59, question: "A vehicle accelerates uniformly from 5 m/s to 25 m/s in 4 s. The distance covered is:", options: ["30 m", "60 m", "100 m", "20 m"], correctAnswer: 1, explanation: "Using s = [(u+v)/2] x t = [(5+25)/2] x 4 = 15 x 4 = 60 m." },
  { id: 60, question: "Motion of an object along a path that is a plane (not a straight line), such as the flight of a kicked ball, is called:", options: ["One-dimensional motion", "Motion in a plane (two dimensions)", "Rest", "Zero-dimensional motion"], correctAnswer: 1, explanation: "Motion in a plane, such as the curved path of a kicked ball, is also called two-dimensional motion." },
  { id: 61, question: "When an object moves along a circular path, its motion is called:", options: ["Linear motion", "Circular motion", "Rectilinear motion", "Rest"], correctAnswer: 1, explanation: "Motion along a circular path is, by definition, called circular motion." },
  { id: 62, question: "When an object moves along a circular path with constant speed, its motion is called:", options: ["Non-uniform circular motion", "Uniform circular motion", "Random circular motion", "Linear circular motion"], correctAnswer: 1, explanation: "Circular motion with constant (uniform) speed is specifically called uniform circular motion." },
  { id: 63, question: "The distance travelled by an object making one complete revolution of a circle of radius R is:", options: ["R", "2R", "pi x R", "2 x pi x R"], correctAnswer: 3, explanation: "The distance covered in one revolution equals the circumference of the circle, 2*pi*R." },
  { id: 64, question: "For an object making one complete revolution and returning to its starting point, the displacement is:", options: ["Equal to the circumference", "Equal to the radius", "Zero", "Equal to the diameter"], correctAnswer: 2, explanation: "After one full revolution, the object returns exactly to its starting point, so its net displacement is zero." },
  { id: 65, question: "In uniform circular motion, which of the following remains constant throughout the motion?", options: ["The direction of velocity", "The speed (magnitude of velocity)", "The velocity vector", "The acceleration vector's direction"], correctAnswer: 1, explanation: "In uniform circular motion, only the speed (magnitude of velocity) stays constant; the direction of velocity keeps changing." },
  { id: 66, question: "In uniform circular motion, the direction of the velocity at any point is:", options: ["Along the radius, towards the centre", "Along the radius, away from the centre", "Along the tangent to the circle at that point", "Constant and never changes"], correctAnswer: 2, explanation: "At every point on the circular path, the velocity is directed along the tangent to the circle at that point, in the direction of motion." },
  { id: 67, question: "A straight line that touches a circle at exactly one point is called a:", options: ["Chord", "Secant", "Tangent", "Radius"], correctAnswer: 2, explanation: "A tangent is a straight line that meets a circle at one and only one point." },
  { id: 68, question: "In uniform circular motion, the object is said to be accelerating because:", options: ["Its speed is continuously increasing", "Its speed is continuously decreasing", "The direction of its velocity is continuously changing", "It moves along a straight line"], correctAnswer: 2, explanation: "Even though speed stays constant, the continuous change in the direction of velocity means the object is accelerating." },
  { id: 69, question: "If an object takes time T to complete one revolution of a circle of radius R, its average speed is given by:", options: ["R/T", "2R/T", "(2*pi*R)/T", "(pi*R^2)/T"], correctAnswer: 2, explanation: "Average speed = distance/time = circumference/T = (2*pi*R)/T, as per Eq. 4.5 in the chapter." },
  { id: 70, question: "An athlete running along a circular track continuously changes direction. As the number of sides of a polygonal track (like a hexagon) is increased indefinitely, the track approaches a:", options: ["Straight line", "Circle", "Square", "Point"], correctAnswer: 1, explanation: "As the number of sides of a regular polygon increases indefinitely, the shape approaches a circle." },
  { id: 71, question: "A marble spun inside a ring, once released by lifting the ring, moves in a:", options: ["Circular path, continuing forever", "Straight line, in the direction it was moving at that instant", "Spiral path", "It stops immediately"], correctAnswer: 1, explanation: "Once released, the marble continues moving in a straight line along the direction of motion at the instant it was released." },
  { id: 72, question: "The speedometer of a vehicle at any instant shows a reading nearly equal to the:", options: ["Direction of motion", "Magnitude of the velocity at that instant", "Total distance travelled so far", "Average acceleration"], correctAnswer: 1, explanation: "A speedometer reading approximates the magnitude of the instantaneous velocity, not its direction or the distance covered." },
  { id: 73, question: "Two postmen start 210 km apart and walk towards each other at 9 km/day and 5 km/day respectively (based on the chapter's ancient Indian example). Approximately how many days will they take to meet?", options: ["10 days", "15 days", "21 days", "30 days"], correctAnswer: 1, explanation: "Combined speed = 9 + 5 = 14 units/day; time to cover 210 units together = 210/14 = 15 days." },
  { id: 74, question: "An object moving in a straight line covers 100 m in the first 10 s and 100 m again in the next 10 s. This object is in:", options: ["Non-uniform motion", "Uniform motion", "Circular motion", "Retarded motion"], correctAnswer: 1, explanation: "Since equal distances (100 m) are covered in equal time intervals (10 s each), the motion is uniform." },
  { id: 75, question: "A body covers 20 m in the 1st second, 30 m in the 2nd second, and 40 m in the 3rd second. This motion is:", options: ["Uniform motion", "Non-uniform (accelerated) motion", "Motion at rest", "Circular motion"], correctAnswer: 1, explanation: "Since unequal (increasing) distances are covered in equal 1-second intervals, this is non-uniform, accelerated motion." },
  { id: 76, question: "Which pair of physical quantities both have the SI unit of metre per second (m/s)?", options: ["Distance and time", "Speed and velocity", "Acceleration and displacement", "Distance and acceleration"], correctAnswer: 1, explanation: "Both average speed and average velocity share the SI unit m/s." },
  { id: 77, question: "The reading of an odometer in a car measures:", options: ["Displacement from the start of the journey", "Total distance travelled", "Average velocity", "Instantaneous acceleration"], correctAnswer: 1, explanation: "An odometer records total distance travelled by the vehicle, not its net displacement." },
  { id: 78, question: "If the position-time graphs of two objects intersect at a point, this indicates that at that instant, the two objects:", options: ["Have equal velocity", "Are at the same position", "Have equal acceleration", "Are both at rest"], correctAnswer: 1, explanation: "An intersection point on a position-time graph means both objects are at the exact same position at that instant (though not necessarily moving at the same velocity)." },
  { id: 79, question: "On a position-time graph for two objects, the object whose graph line has a steeper slope has:", options: ["A lower velocity", "A higher velocity", "The same velocity as the other object", "Zero velocity"], correctAnswer: 1, explanation: "A steeper slope on a position-time graph corresponds to a greater rate of change of position, i.e. higher velocity." },
  { id: 80, question: "If a car's velocity-time graph shows a straight line passing through the origin with a positive slope, the car:", options: ["Starts from rest and accelerates uniformly", "Starts with some initial velocity and decelerates", "Moves at constant velocity", "Is at rest throughout"], correctAnswer: 0, explanation: "A line through the origin with positive slope means velocity starts at zero (rest) and increases uniformly with time -- uniform acceleration from rest." },
  { id: 81, question: "A car moving at 72 km/h is equivalent to a speed of:", options: ["10 m/s", "20 m/s", "72 m/s", "7.2 m/s"], correctAnswer: 1, explanation: "72 km/h x (5/18) = 20 m/s." },
  { id: 82, question: "A speed of 15 m/s is equivalent to:", options: ["15 km/h", "54 km/h", "150 km/h", "5.4 km/h"], correctAnswer: 1, explanation: "15 m/s x (18/5) = 54 km/h." },
  { id: 83, question: "The conversion factor used to convert a speed from km/h to m/s is:", options: ["18/5", "5/18", "60/60", "1000/1"], correctAnswer: 1, explanation: "To convert km/h to m/s, multiply by 5/18 (since 1 km = 1000 m and 1 h = 3600 s, giving 1000/3600 = 5/18)." },
  { id: 84, question: "For a body under free fall (dropped from rest) near Earth's surface, its velocity after 3 seconds (taking g = 9.8 m/s^2) is approximately:", options: ["9.8 m/s", "19.6 m/s", "29.4 m/s", "39.2 m/s"], correctAnswer: 2, explanation: "v = u + gt = 0 + 9.8 x 3 = 29.4 m/s." },
  { id: 85, question: "A cyclist moving at 5 m/s applies brakes and comes to rest after 10 s with uniform retardation. The retardation is:", options: ["0.5 m/s^2", "5 m/s^2", "50 m/s^2", "2 m/s^2"], correctAnswer: 0, explanation: "a = (v-u)/t = (0-5)/10 = -0.5 m/s^2, so the retardation is 0.5 m/s^2." },
  { id: 86, question: "A stone is dropped from a cliff and hits the ground after 4 s. Taking g = 9.8 m/s^2, the height of the cliff is approximately:", options: ["19.6 m", "39.2 m", "78.4 m", "9.8 m"], correctAnswer: 2, explanation: "s = ut + (1/2)gt^2 = 0 + (1/2)(9.8)(4^2) = (1/2)(9.8)(16) = 78.4 m." },
  { id: 87, question: "The reason a marble thrown inside a ring moves in a circle is that:", options: ["It is naturally attracted to the centre", "The ring's boundary continuously redirects its velocity along the circular path", "Gravity pulls it sideways", "The marble has no velocity"], correctAnswer: 1, explanation: "The ring's inner boundary continuously pushes the marble, changing the direction of its velocity so it follows the circular path." },
  { id: 88, question: "Which of these is an example of motion in a plane (two dimensions)?", options: ["A ball falling straight down", "A train moving on a straight track", "A satellite moving in a circular orbit", "A lift moving up and down a shaft"], correctAnswer: 2, explanation: "A satellite moving in a circular orbit follows a curved path within a plane, which is an example of two-dimensional motion." },
  { id: 89, question: "Which of the following is an example of one-dimensional (straight-line) motion?", options: ["A car overtaking another on a curved road", "A ball falling vertically from a height", "The tip of a clock's second hand", "A car taking a roundabout"], correctAnswer: 1, explanation: "A ball falling vertically moves along a single straight line, making it one-dimensional (linear) motion." },
  { id: 90, question: "If a train covers the first half of a journey at 60 km/h and the second half (equal distance) at 40 km/h, its average speed for the whole journey is:", options: ["50 km/h", "Less than 50 km/h", "Greater than 50 km/h", "100 km/h"], correctAnswer: 1, explanation: "For equal distances at different speeds, the average speed is the harmonic mean (2*60*40/(60+40) = 48 km/h), which is always less than the simple (arithmetic) average of 50 km/h." },
  { id: 91, question: "For an object moving with constant acceleration, the velocity-time graph is always a:", options: ["Curve", "Straight line", "Circle", "Set of disconnected points"], correctAnswer: 1, explanation: "With constant acceleration, velocity changes at a steady rate with time, producing a straight-line velocity-time graph." },
  { id: 92, question: "The 'Ready to Go Beyond' feature of the chapter states that as the time interval around an instant becomes infinitesimally small, average velocity approaches a value called:", options: ["Terminal velocity", "Escape velocity", "Instantaneous velocity", "Relative velocity"], correctAnswer: 2, explanation: "As the time interval shrinks towards zero, average velocity approaches a fixed value known as the instantaneous velocity." },
  { id: 93, question: "Two cars start from the same point at the same time and travel in the same direction. Car P is always ahead of Car Q by a constant distance. This means, on a position-time graph:", options: ["Their lines will be parallel", "Their lines will intersect repeatedly", "Their lines will be perpendicular", "Car Q's line will be horizontal"], correctAnswer: 0, explanation: "A constant separation with equal velocities throughout means the two position-time lines are parallel (same slope, different starting position)." },
  { id: 94, question: "Which of the following situations involves acceleration due ONLY to a change in direction, not speed?", options: ["A car speeding up on a straight road", "A car braking on a straight road", "A satellite in uniform circular orbit", "A ball dropped from rest"], correctAnswer: 2, explanation: "In uniform circular motion, speed stays constant but direction keeps changing, so the acceleration arises purely from the change in direction." },
  { id: 95, question: "A body travels 5 m in the first second and 5 m again in the second second, moving in a straight line without reversing direction. What can be concluded?", options: ["It is accelerating", "It is decelerating", "It is moving with uniform velocity in that interval", "It is at rest"], correctAnswer: 2, explanation: "Equal distances (5 m) in each of the equal 1-second intervals, in the same direction, means constant (uniform) velocity during that period." },
  { id: 96, question: "The area of a triangle formed under a velocity-time graph (starting from rest, constant acceleration) represents:", options: ["Acceleration", "Average velocity only", "Displacement", "Change in acceleration"], correctAnswer: 2, explanation: "Just like any shape under a velocity-time graph, the area of this triangle gives the displacement over that time interval." },
  { id: 97, question: "For uniform circular motion, if the radius of the circle is doubled while the time period T remains the same, the average speed:", options: ["Remains the same", "Is halved", "Is doubled", "Becomes zero"], correctAnswer: 2, explanation: "Average speed = 2*pi*R/T; doubling R while keeping T constant doubles the average speed." },
  { id: 98, question: "Which statement correctly compares distance and displacement in general?", options: ["Distance is always less than displacement", "Displacement is always greater than distance", "Distance is always greater than or equal to the magnitude of displacement", "They are always unrelated"], correctAnswer: 2, explanation: "Total distance travelled is always greater than or equal to the magnitude of displacement -- it is only equal when the object never reverses direction." },
  { id: 99, question: "A car's velocity-time graph is a straight line from (0 s, 10 m/s) to (5 s, 10 m/s). The distance travelled in these 5 s is:", options: ["10 m", "50 m", "5 m", "2 m"], correctAnswer: 1, explanation: "This is a horizontal line (constant velocity 10 m/s); area = 10 m/s x 5 s = 50 m." },
  { id: 100, question: "Which of the following best summarises why graphs are useful for describing motion?", options: ["They replace the need for units", "They give a visual way to compare motions and calculate quantities like velocity and displacement", "They only work for circular motion", "They eliminate the need for kinematic equations entirely"], correctAnswer: 1, explanation: "Graphs give a visual representation of motion, helping compare two motions and calculate physical quantities (via slope and area) without needing to substitute into equations each time." },
];

// ── QUESTION BANK: ASSERTION & REASON (50) ──
// Standard CBSE convention -- A: both true, R correctly explains A. B: both true, R does NOT correctly
// explain A. C: A is true, R is false. D: A is false, R is true.
export const PHYSICS9_ASSERTION_REASON: AssertionReasonQuestion[] = [
  { id: 1, assertion: "The displacement of an object can be zero even though it has travelled a non-zero distance.", reason: "Displacement depends only on the initial and final position of the object, not on the path taken.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains the assertion -- if the object returns to its starting point, displacement is zero regardless of distance covered." },
  { id: 2, assertion: "The magnitude of displacement is always equal to the distance travelled by an object.", reason: "Distance is the total path length covered, while displacement is the shortest (straight-line) change in position; the two are equal only when the object moves in one direction without ever reversing.", correctOption: "D", explanation: "The assertion is false -- displacement magnitude equals distance only in the special case of one-directional straight-line motion, not always. The reason is true and correctly explains why the assertion is false." },
  { id: 3, assertion: "Speed is a scalar quantity while velocity is a vector quantity.", reason: "Speed is calculated from distance travelled, which has no associated direction, while velocity is calculated from displacement, which does.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why speed is scalar and velocity is vector." },
  { id: 4, assertion: "A car moving at a constant speed of 60 km/h around a circular turn is not accelerating.", reason: "Even though the car's speed stays constant on the turn, the continuously changing direction of its velocity means it is accelerating.", correctOption: "D", explanation: "The assertion is false -- the car IS accelerating because its direction of motion is continuously changing, even though its speed is constant. The reason is true and correctly explains why the assertion is false." },
  { id: 5, assertion: "The odometer of a car measures the distance travelled, not the displacement.", reason: "Distance is the total path length covered, regardless of direction, while displacement depends on direction.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why an odometer (which just counts wheel rotations along the path) measures distance rather than displacement." },
  { id: 6, assertion: "An object can have zero velocity and still be accelerating.", reason: "Acceleration is the rate of change of velocity, and an object can be momentarily at rest while its velocity is in the process of changing (e.g. a ball thrown up, at its highest point).", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains the classic example of a ball at the highest point of its vertical throw -- velocity is zero there, but acceleration due to gravity still acts." },
  { id: 7, assertion: "For an object moving with uniform velocity in a straight line, the acceleration is zero.", reason: "Acceleration is the rate of change of velocity, and uniform velocity means velocity is not changing.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why zero change in velocity means zero acceleration." },
  { id: 8, assertion: "A position-time graph can never be a vertical straight line.", reason: "A vertical line would mean the object is at infinitely many positions at a single instant of time, which is physically impossible.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why a vertical position-time line is physically meaningless." },
  { id: 9, assertion: "The slope of a velocity-time graph gives the acceleration of the object.", reason: "Acceleration is defined as the rate of change of velocity with respect to time, which is exactly what the slope of a velocity-time graph represents.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why the slope of a v-t graph equals acceleration." },
  { id: 10, assertion: "The area under a velocity-time graph gives the acceleration of the object.", reason: "Acceleration is the rate of change of velocity with time.", correctOption: "C", explanation: "The assertion is false -- the area under a v-t graph gives displacement, not acceleration (acceleration is given by the slope). The reason, while a true statement about acceleration in general, does not support the false assertion." },
  { id: 11, assertion: "In uniform circular motion, the velocity of the object is constant throughout the motion.", reason: "In uniform circular motion, the speed is constant, but the direction of velocity continuously changes.", correctOption: "D", explanation: "The assertion is false -- velocity (a vector) is NOT constant in uniform circular motion since its direction keeps changing, even though speed is constant. The reason is a true statement that actually contradicts, and correctly clarifies, the false assertion." },
  { id: 12, assertion: "The kinematic equations v = u + at, s = ut + (1/2)at^2, and v^2 = u^2 + 2as can be applied to any type of motion.", reason: "These equations are derived assuming the acceleration remains constant throughout the motion.", correctOption: "D", explanation: "The assertion is false -- these equations apply only to motion with constant acceleration, not to any arbitrary motion. The reason is true and correctly explains why the assertion is false." },
  { id: 13, assertion: "A cyclist completing one full lap of a circular track has zero displacement.", reason: "Displacement depends only on the initial and final position, and the cyclist returns to the exact starting point after one lap.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why displacement is zero after a complete lap." },
  { id: 14, assertion: "Two objects moving with the same speed must have the same velocity.", reason: "Velocity depends on both the magnitude (speed) and the direction of motion.", correctOption: "D", explanation: "The assertion is false -- two objects can have equal speed but different directions, giving them different velocities. The reason is true and correctly explains why the assertion is false." },
  { id: 15, assertion: "The average velocity of an object over a round trip (returning to its starting point) is always zero.", reason: "Average velocity equals total displacement divided by total time, and the displacement for any round trip is zero.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why average velocity is zero for any journey ending where it began." },
  { id: 16, assertion: "A freely falling object under gravity has a constant acceleration.", reason: "The acceleration due to gravity (g) remains constant near the Earth's surface, regardless of the object's mass.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why g is constant for objects in free fall near Earth's surface." },
  { id: 17, assertion: "A car's speedometer shows the instantaneous velocity of the car, including its direction.", reason: "A speedometer reading is nearly equal to the magnitude of the velocity, but it never indicates direction.", correctOption: "D", explanation: "The assertion is false -- a speedometer shows only the magnitude (speed), never the direction. The reason is a true statement that correctly explains why the assertion is false." },
  { id: 18, assertion: "If the position-time graph of an object is a curve, the object's velocity is changing with time.", reason: "The slope of a curved position-time graph is different at different points, meaning velocity varies at different instants.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why a curved position-time graph corresponds to changing (non-uniform) velocity." },
  { id: 19, assertion: "The distance travelled by an object can never be negative.", reason: "Distance is a scalar quantity representing the total path length, and length can never be negative.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why distance, being a magnitude of path length, is always zero or positive." },
  { id: 20, assertion: "Displacement of an object can be negative.", reason: "Displacement is a vector quantity, and a negative sign is used to indicate direction opposite to the chosen positive direction.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why displacement can carry a negative sign (to indicate direction), unlike distance." },
  { id: 21, assertion: "An object moving with a constant speed can still be said to be accelerating.", reason: "Acceleration depends only on the magnitude of velocity, not its direction.", correctOption: "C", explanation: "The assertion is true (e.g. uniform circular motion), but the reason given is false -- acceleration depends on the full velocity vector, including direction, not just magnitude." },
  { id: 22, assertion: "For uniform motion in a straight line, the position-time graph is always a straight line.", reason: "In uniform motion, equal displacements occur in equal intervals of time, giving a constant slope on the position-time graph.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why uniform motion produces a straight-line position-time graph." },
  { id: 23, assertion: "A ball thrown vertically upward has zero acceleration at the highest point of its path.", reason: "At the highest point, the velocity of the ball is momentarily zero.", correctOption: "C", explanation: "The assertion is false -- the acceleration due to gravity acts on the ball throughout its flight, including at the highest point, even though velocity is momentarily zero there. The reason (velocity is zero at the highest point) is true but does not justify a false assertion about zero acceleration." },
  { id: 24, assertion: "Two straight, parallel lines on a position-time graph indicate that the two objects have equal velocities at every instant.", reason: "The slope of a position-time graph represents velocity, and parallel lines have equal slopes.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why parallel straight lines on a position-time graph mean equal (constant) velocities for both objects." },
  { id: 25, assertion: "The magnitude of average velocity can sometimes exceed the average speed of an object over the same time interval.", reason: "The magnitude of displacement is always less than or equal to the distance travelled.", correctOption: "D", explanation: "The assertion is false -- average velocity's magnitude can never exceed average speed, precisely because displacement magnitude never exceeds distance travelled (the reason, which is true, actually disproves the assertion)." },
  { id: 26, assertion: "A tangent to a circle touches the circle at exactly one point.", reason: "In uniform circular motion, the velocity at any point on the circle is directed along the tangent at that point.", correctOption: "B", explanation: "Both statements are true, but the reason (about the direction of velocity) does not explain the assertion (a geometric fact about tangents to a circle) -- they are both true but unrelated in a cause-effect sense." },
  { id: 27, assertion: "The distance-time and displacement-time graphs are always identical for any type of motion.", reason: "Distance and displacement remain numerically equal only for straight-line motion in one direction, without ever reversing.", correctOption: "D", explanation: "The assertion is false -- the two graphs differ whenever the object changes direction. The reason is true and correctly explains exactly why the assertion's blanket claim is false." },
  { id: 28, assertion: "A body moving with uniform acceleration must have a velocity-time graph that is a straight line.", reason: "Uniform acceleration means the velocity changes by equal amounts in equal time intervals, which plots as a straight line.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why constant acceleration always produces a straight (not curved) velocity-time graph." },
  { id: 29, assertion: "A stone dropped from a tower and a stone thrown horizontally from the same height at the same instant will hit the ground at the same time.", reason: "The vertical acceleration due to gravity acting on both stones is the same, independent of any horizontal motion.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why vertical fall time is unaffected by horizontal velocity (this concept extends the chapter's ideas on constant vertical acceleration)." },
  { id: 30, assertion: "The magnitude of average acceleration of an object undergoing uniform circular motion is always zero.", reason: "In uniform circular motion, the speed of the object remains constant.", correctOption: "D", explanation: "The assertion is false -- there IS acceleration in uniform circular motion (due to changing direction), even though speed is constant. The reason is true but does not justify the false assertion; in fact it highlights exactly why the naive assumption in the assertion is wrong." },
  { id: 31, assertion: "A person walking around the four sides of a square field and returning to the starting corner has zero net displacement.", reason: "Displacement depends only on the initial and final positions.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why returning to the starting point always gives zero displacement, regardless of the shape of the path." },
  { id: 32, assertion: "The reading of a car's odometer over a trip is always greater than or equal to the magnitude of the car's net displacement for that trip.", reason: "An odometer measures total distance travelled, which can never be less than the magnitude of net displacement.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains the general inequality between distance and displacement magnitude." },
  { id: 33, assertion: "If a graph of velocity versus time is a curve rather than a straight line, the acceleration of the object is non-uniform.", reason: "For non-uniform acceleration, the slope of the velocity-time graph changes from point to point.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why a curved (non-straight) velocity-time graph indicates changing (non-uniform) acceleration." },
  { id: 34, assertion: "It is not possible for an object to have a varying speed but constant velocity.", reason: "Velocity includes both magnitude (speed) and direction, so if speed varies, the velocity vector itself must also change.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why velocity cannot stay constant if its magnitude (speed) is changing." },
  { id: 35, assertion: "It is possible for an object to have a constant speed but a continuously changing velocity.", reason: "This occurs in uniform circular motion, where speed stays fixed but the direction of velocity keeps changing.", correctOption: "A", explanation: "Both statements are true, and the reason correctly gives uniform circular motion as the explanation/example for this apparent paradox." },
  { id: 36, assertion: "Average speed of an object over a time interval can never be less than the magnitude of its average velocity over the same interval.", reason: "Total distance travelled is always greater than or equal to the magnitude of the displacement.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why average speed (based on distance) is always at least as large as the magnitude of average velocity (based on displacement)." },
  { id: 37, assertion: "The value of g (acceleration due to gravity) depends on the mass of the falling object.", reason: "Heavier objects experience a greater gravitational force than lighter objects.", correctOption: "D", explanation: "The assertion is false -- g is the same for all objects near Earth's surface, regardless of their mass. While the reason (heavier objects DO experience greater force) is true, it does not make g mass-dependent because the resulting acceleration (F/m) works out to be the same value for every mass." },
  { id: 38, assertion: "The average velocity of an object equals its average speed only in special cases.", reason: "This equality holds only when the object moves in a straight line without ever reversing its direction.", correctOption: "A", explanation: "Both statements are true, and the reason correctly identifies the exact condition under which average speed and the magnitude of average velocity coincide." },
  { id: 39, assertion: "A negative value of acceleration always means the object is slowing down.", reason: "The sign of acceleration only indicates its direction relative to the chosen positive direction, not whether the object is speeding up or slowing down.", correctOption: "D", explanation: "The assertion is false -- a negative acceleration means the object is slowing down only if it is moving in the positive direction; if the object is already moving in the negative direction, a negative acceleration actually speeds it up. The reason correctly explains this subtlety." },
  { id: 40, assertion: "For a body under uniform acceleration starting from rest, the distance covered in successive equal time intervals keeps increasing.", reason: "With increasing velocity due to constant acceleration, the body covers more distance in each successive equal time interval.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why distance-per-interval grows for a uniformly accelerating body starting from rest." },
  { id: 41, assertion: "Two cars, one moving north at 40 km/h and the other moving south at 40 km/h, have equal velocities.", reason: "Velocity is a vector quantity, and its value depends on both magnitude and direction.", correctOption: "D", explanation: "The assertion is false -- despite having the same speed (magnitude), the two cars move in opposite directions, so their velocities are different (in fact opposite). The reason is true and correctly explains why the assertion is false." },
  { id: 42, assertion: "The area enclosed between a velocity-time graph and the time axis, below the time axis, represents a negative displacement.", reason: "A velocity value below the time axis indicates the object is moving in the negative direction, so the corresponding displacement is negative.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why area below the time axis on a v-t graph corresponds to displacement in the negative direction." },
  { id: 43, assertion: "It is possible for a body to have zero average velocity but non-zero average acceleration over the same time interval.", reason: "Average velocity depends on net displacement, while average acceleration depends on the change in velocity between the start and end of the interval -- these can behave independently.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why these two quantities are not directly tied together (e.g. a ball thrown up and caught at the same height has zero average velocity but non-zero average acceleration, due to gravity, throughout)." },
  { id: 44, assertion: "The kinematic equation v^2 = u^2 + 2as does not explicitly involve time (t).", reason: "This equation was derived specifically by eliminating the time variable t from the two primary kinematic equations.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why this third kinematic equation has no t term -- it was algebraically derived to eliminate t." },
  { id: 45, assertion: "The reference point chosen to describe an object's position must always be the object's own starting point.", reason: "Any fixed point can serve as a valid reference point for describing position and motion.", correctOption: "D", explanation: "The assertion is false -- while a starting point is a common and convenient choice, any fixed point can be used as the reference point. The reason is true and correctly explains why the assertion's restriction is unnecessary." },
  { id: 46, assertion: "If two objects have position-time graphs that are non-parallel straight lines, they must intersect (cross) at exactly one point (for suitably long enough time and position axes).", reason: "Non-parallel straight lines on a graph always meet at exactly one point somewhere along their length (if extended enough).", correctOption: "A", explanation: "Both statements are true, and the reason correctly gives the basic geometric fact -- two straight lines with different slopes always intersect exactly once (when extended sufficiently)." },
  { id: 47, assertion: "The velocity of the tip of a clock's minute hand changes continuously, even though the hand moves at a constant rotational speed.", reason: "The minute hand's tip undergoes uniform circular motion, in which the direction of velocity continuously changes even though its magnitude stays constant.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why the tip's velocity vector changes despite the constant rotational speed of the hand." },
  { id: 48, assertion: "A driver's reaction time before applying the brakes has no effect on the total stopping distance of a vehicle.", reason: "During the reaction time, the vehicle continues to travel at its original speed before any braking (deceleration) begins.", correctOption: "D", explanation: "The assertion is false -- reaction time DOES add extra distance to the total stopping distance, exactly because (as the true reason states) the vehicle keeps moving at full speed during that time before braking starts." },
  { id: 49, assertion: "A very small time interval taken around a given instant lets us determine the instantaneous velocity of an object at that instant.", reason: "As the time interval around an instant is made progressively smaller, the average velocity over that interval approaches a fixed value called the instantaneous velocity.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains the concept of instantaneous velocity as the limiting value of average velocity over a shrinking time interval." },
  { id: 50, assertion: "Uniform circular motion is only an idealised model and is rarely met exactly in real-world situations.", reason: "In the real world, maintaining an exactly constant speed on an exactly circular path is difficult, though the model remains a useful foundation for understanding more complex real motions like planetary orbits.", correctOption: "A", explanation: "Both statements are true, and the reason correctly explains why uniform circular motion, though idealised, is still a valuable and widely-used model in physics." },
];

// ── QUESTION BANK: VERY SHORT ANSWER (2 MARKS) -- includes numerical questions ──
export const PHYSICS9_VERY_SHORT: ShortQuestion[] = [
  { id: 1, question: "Define distance and displacement.", answer: "Distance is the total path length covered by an object, irrespective of direction. Displacement is the net change in the position of an object between two instants, specified by both magnitude and direction.", keyPoints: ["Distance: total path length, scalar", "Displacement: net change in position, vector", "Same SI unit: metre"] },
  { id: 2, question: "Define average speed and average velocity.", answer: "Average speed is the total distance travelled divided by the time interval. Average velocity is the displacement divided by the time interval in which that displacement occurs.", keyPoints: ["Speed = distance/time (scalar)", "Velocity = displacement/time (vector)", "Both have SI unit m/s"] },
  { id: 3, question: "Define average acceleration and state its SI unit.", answer: "Average acceleration is the change in velocity of an object divided by the time interval over which the change occurs. Its SI unit is m/s^2.", keyPoints: ["a = (v - u)/t", "Vector quantity", "SI unit: m/s^2"] },
  { id: 4, question: "Differentiate between a scalar and a vector quantity with one example each.", answer: "A scalar quantity is fully described by its magnitude alone, e.g. distance. A vector quantity requires both magnitude and direction to be fully described, e.g. displacement.", keyPoints: ["Scalar: magnitude only (e.g. distance, speed)", "Vector: magnitude + direction (e.g. displacement, velocity)", "Both need units"] },
  { id: 5, question: "A car travels 150 m in 10 s. Calculate its average speed.", answer: "Average speed = distance/time = 150 m / 10 s = 15 m/s.", keyPoints: ["Formula: speed = distance/time", "150/10 = 15", "Answer: 15 m/s"] },
  { id: 6, question: "A cyclist covers a displacement of 60 m north in 12 s. Calculate the average velocity.", answer: "Average velocity = displacement/time = 60 m / 12 s = 5 m/s, directed north.", keyPoints: ["Formula: velocity = displacement/time", "60/12 = 5", "Answer: 5 m/s north"] },
  { id: 7, question: "A car's velocity changes from 5 m/s to 25 m/s in 4 s. Find its average acceleration.", answer: "a = (v - u)/t = (25 - 5)/4 = 20/4 = 5 m/s^2.", keyPoints: ["Formula: a = (v-u)/t", "(25-5)/4 = 5", "Answer: 5 m/s^2"] },
  { id: 8, question: "What can you say about the motion of an object whose position-time graph is a straight line parallel to the time axis?", answer: "The object is at rest (stationary), since its position is not changing with time.", keyPoints: ["Horizontal line = constant position", "Object is at rest", "Velocity = 0"] },
  { id: 9, question: "What does the slope of a position-time graph represent?", answer: "The slope of a position-time graph represents the velocity of the object at that instant (or over that interval).", keyPoints: ["Slope = change in position / change in time", "This equals velocity", "Steeper slope = higher velocity"] },
  { id: 10, question: "What does the area under a velocity-time graph represent?", answer: "The area enclosed between the velocity-time graph and the time axis, over a given time interval, represents the displacement of the object in that interval.", keyPoints: ["Area = displacement", "Applies over any chosen time interval", "Works for rectangles, triangles, trapeziums"] },
  { id: 11, question: "State the three kinematic equations for motion with constant acceleration.", answer: "v = u + at,   s = ut + (1/2)at^2,   v^2 = u^2 + 2as, where u = initial velocity, v = final velocity, a = acceleration, t = time, and s = displacement.", keyPoints: ["v = u + at", "s = ut + (1/2)at^2", "v^2 = u^2 + 2as"] },
  { id: 12, question: "A body starting from rest attains a velocity of 12 m/s in 3 s. Find its acceleration.", answer: "a = (v - u)/t = (12 - 0)/3 = 4 m/s^2.", keyPoints: ["u = 0 (starts from rest)", "(12-0)/3 = 4", "Answer: 4 m/s^2"] },
  { id: 13, question: "A car moving at 20 m/s is brought to rest in 5 s. Find the distance it travels while stopping (assume uniform deceleration).", answer: "s = [(u+v)/2] x t = [(20+0)/2] x 5 = 10 x 5 = 50 m.", keyPoints: ["u=20, v=0, t=5", "s = average velocity x time", "Answer: 50 m"] },
  { id: 14, question: "Define uniform motion and non-uniform motion.", answer: "Uniform motion is motion in which an object covers equal distances in equal intervals of time. Non-uniform motion is motion in which the object covers unequal distances in equal intervals of time.", keyPoints: ["Uniform: equal distance, equal time -> constant speed", "Non-uniform: unequal distance, equal time -> changing speed", "Both apply to straight-line motion"] },
  { id: 15, question: "Why is direction not required to describe distance, but required for displacement?", answer: "Distance is a scalar quantity that describes only the total path length covered, so it needs no direction. Displacement is a vector quantity representing the net change in position, so both its magnitude and direction must be specified.", keyPoints: ["Distance: scalar, magnitude only", "Displacement: vector, needs direction too", "Different physical meaning"] },
  { id: 16, question: "What is uniform circular motion? Give one real-life example.", answer: "Uniform circular motion is motion in which an object moves along a circular path with constant (uniform) speed. Example: the tip of a clock's second hand, or a satellite in a stable circular orbit.", keyPoints: ["Circular path + constant speed", "Direction of velocity keeps changing", "Example: clock hand tip, circular orbit"] },
  { id: 17, question: "Why is an object in uniform circular motion said to be accelerating even though its speed does not change?", answer: "Because acceleration depends on the change in velocity, and velocity is a vector -- even though the speed (magnitude) stays constant, the direction of velocity keeps changing continuously as the object goes around the circle, so it is accelerating.", keyPoints: ["Velocity = magnitude + direction", "Direction changes continuously", "Change in direction = acceleration, even if speed is constant"] },
  { id: 18, question: "A wheel of radius 0.5 m completes one revolution. Find the distance covered and the displacement (take pi = 22/7... use pi ~ 3.14 if needed, or express in terms of pi).", answer: "Distance covered = circumference = 2*pi*r = 2 x 3.14 x 0.5 = 3.14 m. Displacement = 0, since the object returns to its starting point after one complete revolution.", keyPoints: ["Distance = 2*pi*r = 3.14 m", "Displacement = 0 (returns to start)", "One full revolution"] },
  { id: 19, question: "A body travels 20 m in the first 2 s and 20 m again in the next 2 s along a straight line without reversing. Is this uniform or non-uniform motion? Justify.", answer: "This is uniform motion, because the body covers equal distances (20 m each) in equal time intervals (2 s each), which is the defining condition for uniform motion.", keyPoints: ["Equal distance (20 m) in equal time (2 s)", "Matches definition of uniform motion", "Conclusion: uniform motion"] },
  { id: 20, question: "Give one example each of uniform motion and non-uniform motion from everyday life.", answer: "Uniform motion example: a car moving at a constant, unchanging speed on a straight, empty highway with cruise control on. Non-uniform motion example: a car moving through city traffic, constantly speeding up and slowing down.", keyPoints: ["Uniform: constant speed (e.g. cruise control on highway)", "Non-uniform: changing speed (e.g. city traffic)", "Everyday, realistic examples"] },
  { id: 21, question: "A stone is dropped from rest and falls for 2 s. Taking g = 9.8 m/s^2, find its velocity just before hitting the ground.", answer: "v = u + gt = 0 + 9.8 x 2 = 19.6 m/s.", keyPoints: ["u=0, g=9.8, t=2", "v = u+gt", "Answer: 19.6 m/s"] },
  { id: 22, question: "A car decelerates from 30 m/s to 10 m/s in 4 s. Find the magnitude of its average acceleration.", answer: "a = (v-u)/t = (10-30)/4 = -20/4 = -5 m/s^2; magnitude = 5 m/s^2.", keyPoints: ["u=30, v=10, t=4", "a = (10-30)/4 = -5", "Magnitude = 5 m/s^2 (deceleration)"] },
  { id: 23, question: "Why do we need both a distance and a direction to fully describe the position of an object with respect to a reference point?", answer: "Just knowing the distance from a reference point tells us the object could be anywhere on a circle of that radius around the point; the direction is also needed to pin down the exact single position of the object.", keyPoints: ["Distance alone leaves many possible positions", "Direction narrows it to one exact position", "Both together fully describe position"] },
  { id: 24, question: "What physical quantity does the tangent to a circle at a point represent, in the context of uniform circular motion?", answer: "The tangent to the circle at any point represents the direction of the object's velocity at that point, since in uniform circular motion the velocity is always directed along the tangent to the path.", keyPoints: ["Tangent = direction of velocity at that point", "Meets the circle at exactly one point", "Changes continuously as the object moves"] },
  { id: 25, question: "A car covers the first 100 m of a journey in 10 s and the next 100 m in 20 s. Is its average speed for the whole 200 m journey 10 m/s? Justify with a calculation.", answer: "No. Total distance = 200 m, total time = 10 + 20 = 30 s, so average speed = 200/30 = 6.67 m/s, not 10 m/s -- the average speed for unequal-time segments cannot simply be averaged directly.", keyPoints: ["Total distance = 200 m", "Total time = 30 s", "Average speed = 200/30 ~ 6.67 m/s (not 10 m/s)"] },
  { id: 26, question: "State the physical quantity you would use, and why, to compare which of two runners is 'faster' on average over a race.", answer: "Average speed, because it directly measures total distance covered per unit time, which is the everyday sense of how 'fast' someone ran overall, regardless of any change in direction during the race.", keyPoints: ["Average speed used for 'faster' comparisons", "Speed = distance/time", "Direction not relevant to 'how fast'"] },
  { id: 27, question: "A ball is thrown vertically upward and returns to the thrower's hand after 4 s. What is its displacement and what is its average velocity for the trip?", answer: "Since the ball returns to the exact same point it was thrown from, its displacement is 0 m, and hence its average velocity (displacement/time) is also 0 m/s.", keyPoints: ["Ball returns to starting point", "Displacement = 0", "Average velocity = 0/4 = 0 m/s"] },
  { id: 28, question: "A vehicle's velocity increases from 12 m/s to 20 m/s while covering 32 m. Find its acceleration using v^2 = u^2 + 2as.", answer: "20^2 = 12^2 + 2a(32)  =>  400 = 144 + 64a  =>  64a = 256  =>  a = 4 m/s^2.", keyPoints: ["u=12, v=20, s=32", "400 = 144 + 64a", "a = 4 m/s^2"] },
  { id: 29, question: "Two towns are 90 km apart. A bus takes 1.5 hours to travel between them. Find its average speed in m/s.", answer: "Average speed = 90 km / 1.5 h = 60 km/h = 60 x (5/18) = 16.67 m/s.", keyPoints: ["90/1.5 = 60 km/h", "Convert: 60 x 5/18", "Answer: ~16.67 m/s"] },
  { id: 30, question: "What is the difference between 'instant of time' and 'time interval'? Give an example of each.", answer: "An instant of time is a single reading of the clock at one moment, e.g. 3:00 PM. A time interval is the duration between two instants, e.g. the 30 minutes between 3:00 PM and 3:30 PM.", keyPoints: ["Instant: single clock reading (e.g. 3:00 PM)", "Interval: duration between two instants (e.g. 30 min)", "Distinct but related concepts"] },
  { id: 31, question: "A body moving with constant velocity has zero acceleration. Explain why, using the definition of acceleration.", answer: "Acceleration is defined as the rate of change of velocity with time. Since a constant velocity means the velocity is not changing at all, the change in velocity is zero, and so the acceleration must also be zero.", keyPoints: ["a = change in velocity / time", "Constant velocity -> zero change", "Hence acceleration = 0"] },
  { id: 32, question: "A runner completes a 400 m circular track in 50 s and finishes exactly where she started. Find her average speed and average velocity.", answer: "Average speed = distance/time = 400/50 = 8 m/s. Average velocity = displacement/time = 0/50 = 0 m/s (since she returns to the start).", keyPoints: ["Average speed = 8 m/s", "Displacement = 0 (back to start)", "Average velocity = 0 m/s"] },
  { id: 33, question: "Why can the magnitude of displacement never be greater than the distance travelled?", answer: "Displacement is the shortest, straight-line change in position between the initial and final points, while distance is the length of the actual (possibly longer, curved, or back-and-forth) path taken -- the straight-line path can never be longer than any other path between the same two points.", keyPoints: ["Displacement = shortest path (straight line)", "Distance = actual path length (can be longer)", "Straight line is the shortest possible connection"] },
  { id: 34, question: "A car accelerates uniformly from rest and covers 100 m in 5 s. Find its acceleration using s = ut + (1/2)at^2.", answer: "100 = 0(5) + (1/2)a(5^2)  =>  100 = 12.5a  =>  a = 8 m/s^2.", keyPoints: ["u=0, s=100, t=5", "100 = 12.5a", "a = 8 m/s^2"] },
  { id: 35, question: "Distinguish between speed and velocity in terms of what quantity determines each.", answer: "Speed is determined by the total distance travelled and does not involve direction (a scalar). Velocity is determined by the displacement, which involves both magnitude and direction (a vector).", keyPoints: ["Speed: from distance (scalar)", "Velocity: from displacement (vector)", "Velocity therefore carries direction information"] },
  { id: 36, question: "What conclusion can you draw if the velocity-time graph of an object is a straight line passing through the origin at 45 degrees to the time axis (with matching scales)?", answer: "The object started from rest (zero velocity) and is undergoing uniform (constant) positive acceleration, since the graph is a straight line with a constant, non-zero slope starting at zero velocity.", keyPoints: ["Passes through origin -> u = 0", "Straight line -> constant acceleration", "Positive slope -> speeding up uniformly"] },
  { id: 37, question: "A body's velocity changes from 8 m/s to 8 m/s in the opposite direction over 4 s (i.e., from +8 m/s to -8 m/s). Find its average acceleration.", answer: "a = (v-u)/t = (-8 - 8)/4 = -16/4 = -4 m/s^2.", keyPoints: ["u = +8, v = -8, t = 4", "(-8-8)/4 = -4", "Answer: -4 m/s^2 (direction reversed)"] },
  { id: 38, question: "Why does a position-time graph never have two different position values for the same instant of time?", answer: "An object can only be at one single position at any given instant of time -- it is physically impossible for it to be in two places simultaneously -- so a valid position-time graph can only have one position value per instant.", keyPoints: ["An object occupies only one position at a time", "Physical impossibility of being in two places at once", "Graph must be single-valued in time"] },
  { id: 39, question: "A cyclist's velocity increases uniformly from 4 m/s to 10 m/s over a distance of 21 m. Find her acceleration.", answer: "v^2 = u^2 + 2as  =>  10^2 = 4^2 + 2a(21)  =>  100 = 16 + 42a  =>  42a = 84  =>  a = 2 m/s^2.", keyPoints: ["u=4, v=10, s=21", "100 = 16 + 42a", "a = 2 m/s^2"] },
  { id: 40, question: "What is the significance of the negative sign in a value of acceleration, such as a = -3 m/s^2?", answer: "The negative sign indicates that the acceleration acts in the direction opposite to the chosen positive direction (usually opposite to the direction of motion), typically meaning the object is slowing down if it was moving in the positive direction.", keyPoints: ["Negative sign shows direction, opposite to positive convention", "Usually indicates deceleration/retardation", "Sign is relative to the chosen positive direction"] },
  { id: 41, question: "A train 200 m long crosses a signal post in 10 s. Find the speed of the train.", answer: "The distance the train must cover to fully cross the post equals its own length, 200 m. Speed = distance/time = 200/10 = 20 m/s.", keyPoints: ["Distance = length of train = 200 m", "Speed = 200/10", "Answer: 20 m/s"] },
  { id: 42, question: "How is average acceleration different from acceleration at an instant (instantaneous acceleration)?", answer: "Average acceleration is calculated over a finite time interval (change in velocity divided by that interval), while instantaneous acceleration is the value of acceleration at one particular instant, obtained as the time interval around that instant is made infinitesimally small.", keyPoints: ["Average: over a finite time interval", "Instantaneous: at one specific instant", "Instantaneous = limiting value as interval shrinks to zero"] },
  { id: 43, question: "A ball rolling on a smooth floor decelerates from 6 m/s to rest over a distance of 12 m. Find the deceleration.", answer: "v^2 = u^2 + 2as  =>  0 = 6^2 + 2a(12)  =>  0 = 36 + 24a  =>  a = -1.5 m/s^2, so the deceleration is 1.5 m/s^2.", keyPoints: ["u=6, v=0, s=12", "0 = 36 + 24a", "a = -1.5 m/s^2 (deceleration = 1.5 m/s^2)"] },
  { id: 44, question: "Can an object have a non-zero velocity and zero acceleration at the same time? Give an example.", answer: "Yes. Any object moving with constant (uniform) velocity has a non-zero velocity but zero acceleration, since its velocity is not changing -- for example, a car moving at a steady 60 km/h on a straight, empty highway.", keyPoints: ["Constant velocity motion", "Non-zero velocity, zero acceleration", "Example: car at steady speed on straight road"] },
  { id: 45, question: "What quantity is represented by the slope of the line joining any two points on a curved position-time graph?", answer: "It represents the average velocity of the object over the time interval between those two points (this is different from the instantaneous velocity, which needs the slope of the tangent at a single point).", keyPoints: ["Slope of chord (secant) = average velocity over that interval", "Different from instantaneous velocity", "Applies to any two points on the curve"] },
  { id: 46, question: "A car covers 60 km at 30 km/h and the next 60 km at 60 km/h. Find the total time taken for the whole journey.", answer: "Time for first part = 60/30 = 2 h. Time for second part = 60/60 = 1 h. Total time = 2 + 1 = 3 h.", keyPoints: ["t1 = 60/30 = 2 h", "t2 = 60/60 = 1 h", "Total time = 3 h"] },
  { id: 47, question: "In the context of motion, what is meant by saying that 'rest and motion are relative'?", answer: "It means whether an object is described as being 'at rest' or 'in motion' depends entirely on the reference point chosen -- the same object can be at rest with respect to one reference point and in motion with respect to another (e.g. a passenger is at rest relative to their moving train, but in motion relative to the ground).", keyPoints: ["Rest/motion depends on chosen reference point", "Not an absolute property of the object", "Example: passenger at rest relative to train, moving relative to ground"] },
  { id: 48, question: "A body moving with uniform acceleration has a velocity of 10 m/s at t = 0 and 30 m/s at t = 5 s. Find the distance covered in this interval.", answer: "s = [(u+v)/2] x t = [(10+30)/2] x 5 = 20 x 5 = 100 m.", keyPoints: ["u=10, v=30, t=5", "s = average velocity x time", "Answer: 100 m"] },
  { id: 49, question: "Why is it that in uniform circular motion, the object's average velocity over one complete revolution is always zero, no matter how fast it is moving?", answer: "Average velocity depends only on the net displacement over the time interval, and after one complete revolution the object returns exactly to its starting point, giving zero displacement -- so the average velocity is zero regardless of how fast (or slow) the object was actually moving along the path.", keyPoints: ["One revolution -> returns to start -> displacement = 0", "Average velocity depends only on displacement, not speed", "True regardless of the object's actual speed"] },
  { id: 50, question: "A boy walks 8 m east, then 6 m north. Find the magnitude of his total displacement (using the Pythagorean idea of a right-angled path).", answer: "Since east and north are perpendicular directions, the displacement is the hypotenuse of a right triangle with legs 8 m and 6 m: displacement = sqrt(8^2 + 6^2) = sqrt(64+36) = sqrt(100) = 10 m.", keyPoints: ["Perpendicular legs: 8 m and 6 m", "Displacement = sqrt(8^2+6^2)", "Answer: 10 m"] },
];

// ── QUESTION BANK: SHORT ANSWER (3 MARKS) -- includes numerical questions ──
export const PHYSICS9_SHORT: ShortQuestion[] = [
  { id: 1, question: "Distinguish between distance and displacement (any three points), and explain when their magnitudes are equal.", answer: "Distance is a scalar quantity measuring the total path length covered, is never negative, and can keep increasing even if the object turns back. Displacement is a vector quantity measuring the net change in position, can be positive, negative, or zero, and depends only on the initial and final points. The magnitude of displacement equals distance only when the object moves in a straight line in one direction without ever reversing.", keyPoints: ["Distance: scalar, total path, never decreases", "Displacement: vector, net change, can be zero/negative", "Equal only for one-directional straight-line motion"] },
  { id: 2, question: "A car travels the first 30 km of its journey at 60 km/h and the next 30 km at 40 km/h. Find the average speed for the entire journey.", answer: "Time for first part = 30/60 = 0.5 h. Time for second part = 30/40 = 0.75 h. Total distance = 60 km. Total time = 0.5 + 0.75 = 1.25 h. Average speed = 60/1.25 = 48 km/h.", keyPoints: ["t1 = 0.5 h, t2 = 0.75 h", "Total distance = 60 km, total time = 1.25 h", "Average speed = 48 km/h"] },
  { id: 3, question: "Explain, with the help of the definition of acceleration, why an object moving in a circle at constant speed is said to be accelerating. This is a commonly asked CBSE conceptual question.", answer: "Acceleration is the rate of change of velocity, and velocity is a vector with both magnitude (speed) and direction. In circular motion at constant speed, the magnitude of velocity does not change, but the direction of velocity changes continuously as the object moves around the curve (it is always along the tangent at that point). Since velocity (as a vector) is changing due to this continuous change in direction, the object is accelerating, even though its speed stays the same.", keyPoints: ["Velocity = magnitude + direction (vector)", "Speed constant, but direction changes continuously", "Change in velocity vector = acceleration present"] },
  { id: 4, question: "A bus starting from rest moves with a uniform acceleration of 2 m/s^2 for 10 s. Find (i) the velocity acquired, and (ii) the distance travelled in this time.", answer: "(i) v = u + at = 0 + 2(10) = 20 m/s. (ii) s = ut + (1/2)at^2 = 0 + (1/2)(2)(100) = 100 m.", keyPoints: ["u = 0, a = 2, t = 10", "v = u+at = 20 m/s", "s = ut + 1/2 at^2 = 100 m"] },
  { id: 5, question: "Draw and explain the shape of the velocity-time graph for (i) uniform velocity, and (ii) uniformly accelerated motion starting from rest.", answer: "(i) For uniform velocity, the velocity-time graph is a straight line parallel to the time axis, since the velocity value does not change with time. (ii) For uniformly accelerated motion starting from rest, the graph is a straight line starting from the origin (0,0) and rising with a constant positive slope, since velocity increases steadily from zero at a constant rate.", keyPoints: ["Uniform velocity: horizontal straight line", "Accelerated from rest: straight line through origin, positive slope", "Slope of (ii) gives the constant acceleration"] },
  { id: 6, question: "A stone is thrown vertically upward with an initial velocity of 19.6 m/s. Taking g = 9.8 m/s^2 (acting as a deceleration while going up), find the maximum height reached and the time taken to reach it.", answer: "At maximum height, v = 0. Using v = u - gt: 0 = 19.6 - 9.8t  =>  t = 2 s. Using v^2 = u^2 - 2gs: 0 = 19.6^2 - 2(9.8)s  =>  0 = 384.16 - 19.6s  =>  s = 19.6 m.", keyPoints: ["v = 0 at max height", "t = u/g = 19.6/9.8 = 2 s", "s = u^2/2g = 19.6 m"] },
  { id: 7, question: "What is meant by uniform circular motion? Explain, with a labelled description, why the direction of velocity at any point on the circle is along the tangent at that point.", answer: "Uniform circular motion is motion along a circular path at a constant speed. As an object moves along the circle, at every instant it is moving in the direction it would continue in if suddenly released -- and this direction, at any point on a circle, is exactly along the line that touches the circle at only that one point, i.e. the tangent. This is why, in uniform circular motion, the velocity at any point is always directed along the tangent to the circle at that point, in the sense of motion.", keyPoints: ["Definition: circular path + constant speed", "Velocity direction = direction of instantaneous motion", "This direction is always along the tangent at that point"] },
  { id: 8, question: "A car moving at 15 m/s is uniformly accelerated at 3 m/s^2 for 4 s. Find (i) the final velocity, and (ii) the distance travelled during this acceleration.", answer: "(i) v = u + at = 15 + 3(4) = 15 + 12 = 27 m/s. (ii) s = ut + (1/2)at^2 = 15(4) + (1/2)(3)(16) = 60 + 24 = 84 m.", keyPoints: ["u=15, a=3, t=4", "v = 15+12 = 27 m/s", "s = 60+24 = 84 m"] },
  { id: 9, question: "Explain the difference between uniform and non-uniform acceleration, and state which type is used in the kinematic equations of this chapter.", answer: "Uniform (constant) acceleration means the velocity of the object changes by equal amounts in equal intervals of time throughout the motion. Non-uniform acceleration means the rate of change of velocity itself keeps varying, so equal time intervals do not produce equal changes in velocity. The three kinematic equations of this chapter (v = u+at, s = ut+½at², v² = u²+2as) are derived assuming, and are valid only for, uniform (constant) acceleration.", keyPoints: ["Uniform acceleration: equal velocity change per equal time", "Non-uniform: rate of change of velocity itself varies", "Kinematic equations apply only to constant acceleration"] },
  { id: 10, question: "A train travelling at 90 km/h is brought to rest by applying brakes in 10 s. Find (i) the retardation, and (ii) the distance travelled before stopping.", answer: "u = 90 km/h = 25 m/s, v = 0, t = 10 s. (i) a = (v-u)/t = (0-25)/10 = -2.5 m/s^2, so retardation = 2.5 m/s^2. (ii) s = [(u+v)/2] x t = [(25+0)/2] x 10 = 125 m.", keyPoints: ["Convert 90 km/h to 25 m/s", "a = -2.5 m/s^2 (retardation)", "s = 125 m"] },
  { id: 11, question: "Using a labelled velocity-time graph, show how displacement can be found for an object moving with constant, non-zero initial velocity and constant positive acceleration.", answer: "The velocity-time graph is a straight, upward-sloping line starting from a point above the origin (since initial velocity u is not zero) at t=0, rising to a higher value v at time t. The displacement equals the area under this line and the time axis, which is a trapezium: it can be split into a rectangle (base t, height u) plus a triangle (base t, height v-u), giving s = ut + (1/2)(v-u)t, which simplifies to s = ut + (1/2)at^2 using v-u = at.", keyPoints: ["Line starts above origin (u not zero), slopes upward", "Area = rectangle (u x t) + triangle (1/2 x t x (v-u))", "Simplifies to s = ut + 1/2at^2"] },
  { id: 12, question: "A cyclist increases her speed uniformly from 3 m/s to 9 m/s while covering a distance of 24 m. Find (i) her acceleration, and (ii) the time taken.", answer: "(i) Using v^2 = u^2 + 2as: 9^2 = 3^2 + 2a(24)  =>  81 = 9 + 48a  =>  a = 72/48 = 1.5 m/s^2. (ii) Using v = u + at: 9 = 3 + 1.5t  =>  t = 6/1.5 = 4 s.", keyPoints: ["u=3, v=9, s=24", "a = 1.5 m/s^2", "t = 4 s"] },
  { id: 13, question: "Why are the kinematic equations of motion not applicable to uniform circular motion, even though the motion is 'uniform' (constant speed)?", answer: "The kinematic equations (v=u+at, s=ut+½at², v²=u²+2as) are derived for straight-line motion under constant, unchanging acceleration in one fixed direction. In uniform circular motion, although the speed is constant, the direction of velocity is constantly changing, meaning the acceleration is not constant in direction (it continuously points toward the centre of the circle) -- so the straight-line kinematic equations, which assume one-dimensional constant acceleration, do not apply.", keyPoints: ["Kinematic equations assume straight-line, constant acceleration", "In UCM, acceleration's direction keeps changing", "So these equations cannot be applied to circular motion"] },
  { id: 14, question: "A ball is dropped from a height of 44.1 m. Taking g = 9.8 m/s^2, find the time it takes to reach the ground and its velocity just before hitting the ground.", answer: "Using s = ut + (1/2)gt^2 with u=0: 44.1 = (1/2)(9.8)t^2  =>  44.1 = 4.9t^2  =>  t^2 = 9  =>  t = 3 s. Using v = u + gt: v = 0 + 9.8(3) = 29.4 m/s.", keyPoints: ["44.1 = 4.9t^2 -> t = 3 s", "v = gt = 9.8 x 3", "Answer: t = 3 s, v = 29.4 m/s"] },
  { id: 15, question: "Explain how you would use a position-time graph to determine whether two moving objects ever meet, and what their meeting would look like on the graph.", answer: "Plot the position-time graphs of both objects on the same set of axes. The point(s), if any, where the two graphs intersect represent the instant(s) at which both objects are at the exact same position at the same time -- this is when they 'meet'. If the lines never cross within the time range shown, the two objects never occupy the same position during that interval.", keyPoints: ["Plot both objects' position-time graphs together", "Intersection point = same position at same time = they meet", "No intersection = they never meet in that interval"] },
  { id: 16, question: "A car's velocity-time graph shows it accelerating uniformly from 0 to 15 m/s in 5 s, then moving at constant 15 m/s for the next 10 s. Find the total distance travelled in these 15 s using the graph-area method.", answer: "Phase 1 (triangle): s1 = (1/2) x base x height = (1/2)(5)(15) = 37.5 m. Phase 2 (rectangle): s2 = 15 x 10 = 150 m. Total distance = 37.5 + 150 = 187.5 m.", keyPoints: ["Phase 1: triangle area = 37.5 m", "Phase 2: rectangle area = 150 m", "Total = 187.5 m"] },
  { id: 17, question: "State any three real-life applications or situations where understanding the concepts of velocity and acceleration (as covered in this chapter) is important for safety.", answer: "(1) Maintaining a safe following distance from the vehicle ahead depends on your velocity and the vehicle's braking deceleration. (2) A driver's reaction time before braking directly adds to the total stopping distance, which matters for road safety. (3) Vehicle-to-vehicle (V2V) communication technology uses real-time velocity data to warn drivers of possible collisions.", keyPoints: ["Safe following distance depends on speed and braking capability", "Reaction time affects total stopping distance", "V2V technology uses velocity data to prevent collisions"] },
  { id: 18, question: "A body moving with uniform acceleration covers 10 m in the 3rd second and 14 m in the 5th second of its motion. Using the fact that distance in the nth second = u + a(n - 1/2), find its acceleration.", answer: "Distance in nth second: s_n = u + a(n - 1/2). For n=3: 10 = u + a(2.5). For n=5: 14 = u + a(4.5). Subtracting: 14 - 10 = a(4.5 - 2.5)  =>  4 = 2a  =>  a = 2 m/s^2.", keyPoints: ["s_n = u + a(n - 1/2) for each given second", "Subtract the two equations to eliminate u", "a = 2 m/s^2"] },
  { id: 19, question: "Explain why displacement is considered a more complete description of an object's overall change in position than distance, using a suitable example.", answer: "Displacement captures both how far and in which direction an object has effectively moved from its starting point, giving the true net outcome of the motion. Distance only tells us how much ground was covered, without any information about the final direction or net effect. For example, someone who walks 5 km east then 5 km west has covered 10 km of distance but has a displacement of 0 km -- displacement correctly shows they have made no net progress from where they began, which distance alone cannot show.", keyPoints: ["Displacement shows net effect (magnitude + direction)", "Distance only shows total ground covered", "Example: 5 km east + 5 km west -> distance 10 km, displacement 0 km"] },
  { id: 20, question: "A motorcyclist covers a distance of 4.5 km at a certain average speed and then covers another 4.5 km at double that speed. If her average speed for the first part is x km/h, express the total time taken for both parts in terms of x, and hence show that her average speed for the whole 9 km trip depends on x.", answer: "Time for first part = 4.5/x hours. Time for second part = 4.5/(2x) = 2.25/x hours. Total time = 4.5/x + 2.25/x = 6.75/x hours. Average speed for the whole trip = total distance / total time = 9 / (6.75/x) = (9/6.75) x = 1.33x km/h, which clearly still depends on the value of x, confirming that average speed for unequal-time journeys is not simply the arithmetic mean of the two speeds.", keyPoints: ["Time1 = 4.5/x, Time2 = 2.25/x", "Total time = 6.75/x hours", "Average speed = 1.33x km/h (depends on x)"] },
  { id: 21, question: "Explain, using the concept of slope, how a velocity-time graph can be used to identify whether an object is speeding up, slowing down, or moving at constant velocity.", answer: "If the velocity-time graph has a positive slope (rising line), the object's velocity is increasing with time, i.e. it is speeding up. If the slope is negative (falling line), the velocity is decreasing, i.e. it is slowing down. If the slope is zero (a horizontal line), the velocity is not changing at all, i.e. the object is moving at constant velocity.", keyPoints: ["Positive slope: speeding up (positive acceleration)", "Negative slope: slowing down (negative acceleration/deceleration)", "Zero slope (horizontal): constant velocity"] },
  { id: 22, question: "A stone is thrown vertically upward with a velocity of 29.4 m/s from the top of a tower. Taking g = 9.8 m/s^2, find the time it takes to reach its highest point and the maximum height it reaches above the point of projection.", answer: "At the highest point, v = 0. Using v = u - gt: 0 = 29.4 - 9.8t  =>  t = 3 s. Using v^2 = u^2 - 2gs: 0 = 29.4^2 - 2(9.8)s  =>  0 = 864.36 - 19.6s  =>  s = 44.1 m.", keyPoints: ["v=0 at highest point", "t = u/g = 3 s", "s = u^2/2g = 44.1 m"] },
  { id: 23, question: "Explain why it is important, when solving numerical problems using the kinematic equations, to first ensure all quantities are converted to consistent (SI) units.", answer: "The kinematic equations are dimensionally consistent only when all quantities use the same unit system (SI: metres, seconds, m/s, m/s^2). If, for example, velocity is left in km/h while time is in seconds, the numerical relationships between the quantities become incorrect, leading to a wrong final answer even if the correct formula and method are used. Converting everything to SI units first (e.g. km/h to m/s using the 5/18 factor) avoids this error.", keyPoints: ["Equations are valid only in a consistent unit system", "Mixing units (e.g. km/h with seconds) gives wrong answers", "Always convert to SI (m, s, m/s, m/s^2) first"] },
  { id: 24, question: "A car A is 100 m behind car B, and both start from rest at the same instant with accelerations 2 m/s^2 and 1 m/s^2 respectively, moving in the same direction. Will car A catch up to car B in 10 s? (Find the distance covered by each in 10 s and compare with the 100 m gap plus B's distance.)", answer: "Distance by A in 10 s: s_A = 0 + (1/2)(2)(10^2) = 100 m. Distance by B in 10 s: s_B = 0 + (1/2)(1)(10^2) = 50 m. Since A started 100 m behind, A's position from B's start = 100 (A's travel) - 100 (initial gap) = 0 m from B's original start, while B has moved to 50 m -- so A is still 50 m behind B after 10 s and has NOT caught up yet.", keyPoints: ["s_A = 100 m, s_B = 50 m in 10 s", "A's net position relative to B's start = 100 - 100 = 0 m", "A is still 50 m behind B; has not caught up"] },
  { id: 25, question: "State three key differences between a position-time graph and a velocity-time graph.", answer: "(1) A position-time graph plots position on the Y-axis, while a velocity-time graph plots velocity on the Y-axis (both use time on the X-axis). (2) The slope of a position-time graph gives velocity, while the slope of a velocity-time graph gives acceleration. (3) A position-time graph does not directly show acceleration, while the area under a velocity-time graph gives displacement, which a position-time graph shows directly as its Y-value.", keyPoints: ["Different Y-axis quantity (position vs velocity)", "Slope gives different quantities (velocity vs acceleration)", "Area under v-t graph = displacement; not applicable the same way to p-t graph"] },
  { id: 26, question: "A body moving with an initial velocity of 5 m/s is uniformly accelerated and covers 90 m in 6 s. Find the acceleration and the final velocity.", answer: "Using s = ut + (1/2)at^2: 90 = 5(6) + (1/2)a(36)  =>  90 = 30 + 18a  =>  18a = 60  =>  a = 3.33 m/s^2. Using v = u + at: v = 5 + 3.33(6) = 5 + 20 = 25 m/s.", keyPoints: ["90 = 30 + 18a -> a ~ 3.33 m/s^2", "v = u + at = 5 + 20", "Answer: a ~ 3.33 m/s^2, v = 25 m/s"] },
  { id: 27, question: "Explain, with reference to the chapter, why 'total distance travelled' rather than 'displacement' is the correct quantity for calculating fuel consumption or tyre wear of a vehicle.", answer: "Fuel consumption and tyre wear depend on how much actual physical work the engine and tyres have done, which corresponds to every metre of ground actually covered by the vehicle -- this is measured by total distance travelled. Displacement only reflects the net change in position and can be much smaller than (or even zero compared to) the actual ground covered, so it would give a misleadingly low estimate of fuel used or wear experienced.", keyPoints: ["Fuel/tyre wear depend on actual ground covered", "This is measured by total distance, not displacement", "Displacement can under-represent the real work done"] },
  { id: 28, question: "A particle moves along a circle of radius 7 m and completes 3 revolutions in 22 s. Find its average speed (take pi = 22/7).", answer: "Circumference = 2*pi*r = 2 x (22/7) x 7 = 44 m. Distance in 3 revolutions = 3 x 44 = 132 m. Average speed = distance/time = 132/22 = 6 m/s.", keyPoints: ["Circumference = 44 m", "Distance for 3 revolutions = 132 m", "Average speed = 132/22 = 6 m/s"] },
  { id: 29, question: "Explain the meaning of the statement 'acceleration due to gravity (g) is constant', and state one situation described in the chapter where this fact is used.", answer: "This means that, near the Earth's surface, every freely falling object experiences the same acceleration (approximately 9.8 m/s^2, directed downward), regardless of its mass or how fast it is already moving -- so the increase in speed per second is always the same for any object in free fall. In the chapter, this fact is used in Example 4.4, where an object dropped from a height is shown to gain 9.8 m/s of speed in every successive one-second interval, confirming the acceleration stays constant throughout the fall.", keyPoints: ["g is the same for all freely falling objects, regardless of mass", "Approximately 9.8 m/s^2, directed downward", "Used in the chapter's dropped-object example (Example 4.4)"] },
  { id: 30, question: "A car's velocity-time graph is a straight line from (2 s, 8 m/s) to (8 s, 20 m/s). Find (i) the acceleration, and (ii) the displacement between t = 2 s and t = 8 s using the graph-area (trapezium) method.", answer: "(i) a = slope = (20-8)/(8-2) = 12/6 = 2 m/s^2. (ii) Displacement = area of trapezium = [(8+20)/2] x (8-2) = 14 x 6 = 84 m.", keyPoints: ["a = (20-8)/(8-2) = 2 m/s^2", "Displacement = average velocity x time interval", "Answer: a = 2 m/s^2, s = 84 m"] },
];

// ── QUESTION BANK: LONG ANSWER (5 MARKS) -- derivations and board-style numericals, several of
// which are close variants of questions repeatedly seen in CBSE board papers and sample papers ──
export const PHYSICS9_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "Derive the equation v = u + at graphically, using a velocity-time graph, for an object moving with uniform acceleration.",
    markingScheme: ["Correct labelled velocity-time graph (1.5 marks)", "Identifying slope = acceleration (1.5 marks)", "Correct algebraic derivation to v = u + at (2 marks)"],
    answerParts: [
      { part: "Setting up the graph", text: "Consider an object moving with uniform acceleration a. Its velocity-time graph is a straight line, starting at velocity u at time t = 0 and reaching velocity v at time t. Let A be the point (0, u) and B be the point (t, v) on the graph." },
      { part: "Identifying the slope", text: "Draw AC parallel to the time axis and BC parallel to the velocity axis, meeting at C. Then BC = v - u (change in velocity) and AC = t - 0 = t (change in time). The slope of line AB = BC/AC = (v-u)/t, and this slope represents the acceleration a." },
      { part: "Algebraic derivation", text: "So, a = (v - u)/t. Rearranging: at = v - u, which gives v = u + at. This is the first kinematic equation, valid for any object moving with constant acceleration." },
    ],
  },
  {
    id: 2,
    question: "Derive the equation s = ut + (1/2)at^2 graphically, using the area under a velocity-time graph, for an object moving with uniform acceleration.",
    markingScheme: ["Correct labelled velocity-time graph identifying the trapezium (1.5 marks)", "Splitting the area into a rectangle and a triangle (1.5 marks)", "Correct algebraic derivation to s = ut + (1/2)at^2 (2 marks)"],
    answerParts: [
      { part: "Setting up the graph", text: "Consider the same velocity-time graph as before: a straight line from A (0, u) to B (t, v), with the acceleration a constant. The displacement s in time t is given by the area enclosed between the line AB, the time axis, and the vertical lines at t=0 and t=t (region OABD, where D is the point (t, 0))." },
      { part: "Splitting into simple shapes", text: "This area (a trapezium) can be split into a rectangle OACD (with sides u and t) and a triangle ABC (with base t and height v - u). Area of rectangle = u x t. Area of triangle = (1/2) x t x (v - u)." },
      { part: "Algebraic derivation", text: "So, s = ut + (1/2) x t x (v - u). Since v - u = at (from the first kinematic equation), substitute: s = ut + (1/2) x t x at = ut + (1/2)at^2. This is the second kinematic equation." },
    ],
  },
  {
    id: 3,
    question: "Derive the equation v^2 = u^2 + 2as algebraically, by eliminating time (t) from the first two kinematic equations.",
    markingScheme: ["Correctly stating the two primary equations (1 mark)", "Correctly finding t from the first equation (1 mark)", "Correct substitution and algebraic simplification (3 marks)"],
    answerParts: [
      { part: "Starting equations", text: "We start from the two primary kinematic equations: v = u + at ... (1), and s = ut + (1/2)at^2 ... (2)." },
      { part: "Eliminating t", text: "From equation (1): t = (v - u)/a. Substitute this into equation (2): s = u x [(v-u)/a] + (1/2) x a x [(v-u)/a]^2." },
      { part: "Simplifying", text: "s = [u(v-u)/a] + [(v-u)^2 / (2a)] = [2u(v-u) + (v-u)^2] / (2a) = [(v-u)(2u + v - u)] / (2a) = [(v-u)(u+v)] / (2a) = (v^2 - u^2) / (2a). So, 2as = v^2 - u^2, which gives v^2 = u^2 + 2as." },
    ],
  },
  {
    id: 4,
    question: "Distinguish clearly between distance and displacement (giving at least four points of difference), and illustrate with the example of a person walking 60 m east and then 20 m west.",
    markingScheme: ["Any four correct points of difference (3 marks)", "Correct calculation of distance for the example (1 mark)", "Correct calculation of displacement for the example (1 mark)"],
    answerParts: [
      { part: "Points of difference", text: "(1) Distance is a scalar quantity; displacement is a vector quantity. (2) Distance can only be zero or positive; displacement can be positive, negative, or zero. (3) Distance depends on the actual path taken; displacement depends only on the initial and final positions. (4) The magnitude of displacement is always less than or equal to the distance; it is never greater." },
      { part: "Calculating distance", text: "For the example: total distance travelled = 60 m (east) + 20 m (west) = 80 m." },
      { part: "Calculating displacement", text: "Taking east as positive: net displacement = +60 m - 20 m = +40 m, i.e. 40 m east. Notice the displacement's magnitude (40 m) is indeed less than the distance travelled (80 m), confirming the general rule." },
    ],
  },
  {
    id: 5,
    question: "What is uniform circular motion? Explain why it is considered an accelerated motion, describe the direction of velocity at any point on the circular path, and give two real-life examples.",
    markingScheme: ["Correct definition (1 mark)", "Explanation of why it is accelerated (2 marks)", "Direction of velocity along the tangent (1 mark)", "Two valid real-life examples (1 mark)"],
    answerParts: [
      { part: "Definition", text: "Uniform circular motion is the motion of an object along a circular path at a constant (unchanging) speed." },
      { part: "Why it is accelerated", text: "Even though the speed remains constant, the velocity of the object (a vector quantity) is not constant, because its direction keeps changing continuously as the object moves around the circle. Since acceleration is defined as any change in velocity (whether in magnitude or direction), and here the direction is continuously changing, the object is undergoing acceleration at every instant." },
      { part: "Direction of velocity", text: "At any point on the circular path, the velocity of the object is directed along the tangent to the circle at that point, in the sense of the object's motion. A tangent is a straight line that touches the circle at exactly one point." },
      { part: "Real-life examples", text: "Examples include: the tip of the second hand of a clock moving around the dial, and (idealised) a satellite moving in a stable circular orbit around the Earth." },
    ],
  },
  {
    id: 6,
    question: "A car accelerates uniformly from 18 km/h to 36 km/h in 5 s. Calculate (i) the acceleration, and (ii) the distance covered by the car in that time.",
    markingScheme: ["Correct unit conversion of both velocities to m/s (1 mark)", "Correct formula and calculation of acceleration (2 marks)", "Correct formula and calculation of distance (2 marks)"],
    answerParts: [
      { part: "Converting units", text: "u = 18 km/h = 18 x (5/18) = 5 m/s. v = 36 km/h = 36 x (5/18) = 10 m/s. t = 5 s." },
      { part: "Finding acceleration", text: "a = (v - u)/t = (10 - 5)/5 = 5/5 = 1 m/s^2." },
      { part: "Finding distance", text: "Using s = ut + (1/2)at^2: s = 5(5) + (1/2)(1)(5^2) = 25 + 12.5 = 37.5 m. (This can also be checked using s = [(u+v)/2] x t = [(5+10)/2] x 5 = 7.5 x 5 = 37.5 m.)" },
    ],
  },
  {
    id: 7,
    question: "Explain, with the help of a suitable position-time graph, how you can determine (i) whether an object is at rest or in uniform motion, and (ii) the velocity of the object from the graph.",
    markingScheme: ["Correct description of graph for rest (1 mark)", "Correct description of graph for uniform motion (1 mark)", "Correct method to find velocity from slope, with formula (2 marks)", "Correct worked numeric example (1 mark)"],
    answerParts: [
      { part: "Identifying rest", text: "If the position-time graph is a straight line parallel to the time axis (i.e. the position value never changes as time passes), the object is at rest." },
      { part: "Identifying uniform motion", text: "If the position-time graph is a straight, sloped line (not parallel to either axis), the object is in uniform motion, i.e. moving with constant, non-zero velocity." },
      { part: "Finding velocity from the graph", text: "To find velocity, pick any two points A (t1, s1) and B (t2, s2) on the straight-line graph. The velocity equals the slope: v = (s2 - s1)/(t2 - t1)." },
      { part: "Worked example", text: "For instance, if the graph passes through (2 s, 40 m) and (6 s, 120 m): v = (120-40)/(6-2) = 80/4 = 20 m/s." },
    ],
  },
  {
    id: 8,
    question: "A ball is dropped from the top of a tower 122.5 m high. Taking g = 9.8 m/s^2, find (i) the time taken to reach the ground, and (ii) the velocity with which it strikes the ground.",
    markingScheme: ["Correct identification of u = 0 and correct equation choice (1 mark)", "Correct substitution and calculation of time (2 marks)", "Correct substitution and calculation of final velocity (2 marks)"],
    answerParts: [
      { part: "Given values", text: "Initial velocity u = 0 (dropped, not thrown), acceleration a = g = 9.8 m/s^2 (downward), distance s = 122.5 m." },
      { part: "Finding time", text: "Using s = ut + (1/2)gt^2: 122.5 = 0 + (1/2)(9.8)t^2 = 4.9t^2. So t^2 = 122.5/4.9 = 25, giving t = 5 s." },
      { part: "Finding final velocity", text: "Using v = u + gt: v = 0 + 9.8(5) = 49 m/s. (This can be checked using v^2 = u^2 + 2gs = 0 + 2(9.8)(122.5) = 2401, and sqrt(2401) = 49 m/s.)" },
    ],
  },
  {
    id: 9,
    question: "A truck travelling at 72 km/h applies brakes on seeing a stalled vehicle 100 m ahead. If the driver's reaction time is 0.7 s and the braking deceleration is 5 m/s^2, determine whether the truck stops before hitting the stalled vehicle. This kind of applied braking-distance numerical is a frequently asked CBSE board question.",
    markingScheme: ["Correct unit conversion of speed (0.5 marks)", "Correct calculation of distance covered during reaction time (1.5 marks)", "Correct calculation of braking distance using kinematic equation (2 marks)", "Correct comparison and conclusion (1 mark)"],
    answerParts: [
      { part: "Converting units", text: "u = 72 km/h = 72 x (5/18) = 20 m/s." },
      { part: "Distance during reaction time", text: "During the 0.7 s reaction time, the truck still moves at 20 m/s (brakes not yet applied): d_reaction = 20 x 0.7 = 14 m." },
      { part: "Braking distance", text: "Remaining distance available = 100 - 14 = 86 m. Using v^2 = u^2 + 2as with v=0, u=20, a=-5: 0 = 400 - 10s  =>  s = 40 m (the braking distance actually needed)." },
      { part: "Conclusion", text: "Since the required braking distance (40 m) is well within the 86 m of road still available after the reaction-time gap, the truck stops safely before reaching the stalled vehicle, with about 46 m to spare." },
    ],
  },
  {
    id: 10,
    question: "Explain the meaning of the slope and the area under a velocity-time graph. Illustrate using a graph where the velocity increases uniformly from 5 m/s to 25 m/s over 8 s, finding both the acceleration and the displacement.",
    markingScheme: ["Correct explanation of slope = acceleration (1 mark)", "Correct explanation of area = displacement (1 mark)", "Correct calculation of acceleration for the example (1.5 marks)", "Correct calculation of displacement for the example (1.5 marks)"],
    answerParts: [
      { part: "Meaning of slope", text: "The slope of a velocity-time graph at any point equals the acceleration of the object at that instant, since acceleration is the rate of change of velocity with time, exactly what the slope measures." },
      { part: "Meaning of area", text: "The area enclosed between the velocity-time graph and the time axis, over a given interval, equals the displacement of the object during that interval." },
      { part: "Calculating acceleration", text: "For the given example: a = (v-u)/t = (25-5)/8 = 20/8 = 2.5 m/s^2." },
      { part: "Calculating displacement", text: "Displacement = area of the trapezium = [(u+v)/2] x t = [(5+25)/2] x 8 = 15 x 8 = 120 m." },
    ],
  },
  {
    id: 11,
    question: "A body covers a distance of 4 m in the 3rd second and 6 m in the 5th second of its motion, moving with uniform acceleration and starting from some initial velocity u. Find the initial velocity u and the acceleration a. (Use s_n = u + a(n - 1/2) for the distance in the nth second.)",
    markingScheme: ["Correct formula setup for both given seconds (2 marks)", "Correctly solving the simultaneous equations for a (1.5 marks)", "Correctly solving for u (1.5 marks)"],
    answerParts: [
      { part: "Setting up equations", text: "Using s_n = u + a(n - 1/2): For n=3: 4 = u + a(2.5) ... (1). For n=5: 6 = u + a(4.5) ... (2)." },
      { part: "Solving for acceleration", text: "Subtracting (1) from (2): 6 - 4 = a(4.5 - 2.5)  =>  2 = 2a  =>  a = 1 m/s^2." },
      { part: "Solving for initial velocity", text: "Substituting a = 1 into equation (1): 4 = u + (1)(2.5)  =>  u = 4 - 2.5 = 1.5 m/s." },
    ],
  },
  {
    id: 12,
    question: "Explain, using appropriate physical reasoning and the definitions from this chapter, why 'rest' and 'motion' are relative concepts. Support your explanation with two distinct examples.",
    markingScheme: ["Correct explanation of the concept of relativity of rest and motion (2 marks)", "First correct, well-explained example (1.5 marks)", "Second correct, well-explained example (1.5 marks)"],
    answerParts: [
      { part: "Explaining relativity of motion", text: "Whether an object is described as being at rest or in motion depends entirely on the reference point chosen to observe it. Since motion is defined as a change in position with respect to a reference point, changing the reference point can change the conclusion -- the object's own physical state has not changed, only our vantage point for describing it." },
      { part: "Example 1", text: "A passenger sitting inside a moving train is at rest relative to the train (and to fellow passengers), since their position with respect to the train's interior does not change. However, the same passenger is in motion relative to a person standing on the ground outside, since their position relative to the ground is continuously changing." },
      { part: "Example 2", text: "An object resting on the ground is at rest relative to the Earth's surface. However, relative to the Sun, that same object is in motion, since the Earth (and everything on it) is continuously orbiting the Sun." },
    ],
  },
  {
    id: 13,
    question: "A car accelerates uniformly from rest to 30 m/s in 10 s, travels at that constant speed for 20 s, and then decelerates uniformly to rest in 5 s. Draw the shape of the velocity-time graph and calculate the total distance travelled during the entire 35 s journey.",
    markingScheme: ["Correct description of the three-phase graph shape (1 mark)", "Correct calculation for the accelerating phase (1.5 marks)", "Correct calculation for the constant-speed phase (1 mark)", "Correct calculation for the decelerating phase and total (1.5 marks)"],
    answerParts: [
      { part: "Graph shape", text: "The velocity-time graph consists of three connected straight-line segments: an upward-sloping line from (0,0) to (10, 30), a horizontal line from (10, 30) to (30, 30), and a downward-sloping line from (30, 30) to (35, 0)." },
      { part: "Phase 1 -- accelerating", text: "s1 = [(0+30)/2] x 10 = 15 x 10 = 150 m." },
      { part: "Phase 2 -- constant speed", text: "s2 = 30 m/s x 20 s = 600 m." },
      { part: "Phase 3 -- decelerating, and total", text: "s3 = [(30+0)/2] x 5 = 15 x 5 = 75 m. Total distance = s1 + s2 + s3 = 150 + 600 + 75 = 825 m." },
    ],
  },
  {
    id: 14,
    question: "State and explain the three kinematic equations of motion for constant acceleration, clearly identifying each symbol used and stating the condition under which they are valid.",
    markingScheme: ["Correct statement of all three equations (1.5 marks)", "Correct identification of all symbols (1.5 marks)", "Correct explanation of what each equation is used to find (1 mark)", "Correct statement of the condition of validity (1 mark)"],
    answerParts: [
      { part: "The three equations", text: "(1) v = u + at, (2) s = ut + (1/2)at^2, (3) v^2 = u^2 + 2as." },
      { part: "Symbols used", text: "u = initial velocity, v = final velocity, a = (constant) acceleration, t = time interval, s = displacement (distance travelled, for straight-line one-directional motion)." },
      { part: "What each equation finds", text: "Equation (1) is used when u, a, t are known and v is required (no s needed). Equation (2) is used when u, a, t are known and s is required (no v needed). Equation (3) is used when u, a, s are known and v is required, without needing t at all." },
      { part: "Condition of validity", text: "All three equations are valid ONLY for motion with constant (uniform) acceleration. They cannot be applied directly to motion where the acceleration itself is changing, such as uniform circular motion." },
    ],
  },
  {
    id: 15,
    question: "A stone is thrown vertically upward from the ground with a velocity of 39.2 m/s. Taking g = 9.8 m/s^2, find (i) the maximum height reached, (ii) the time taken to reach the maximum height, and (iii) the total time for the stone to return to the ground.",
    markingScheme: ["Correct identification of v=0 at max height and correct sign convention (1 mark)", "Correct calculation of maximum height (1.5 marks)", "Correct calculation of time to reach max height (1.5 marks)", "Correct calculation of total time of flight (1 mark)"],
    answerParts: [
      { part: "Setting up", text: "Taking upward as positive: u = 39.2 m/s, a = -g = -9.8 m/s^2 (gravity acts downward, opposing the upward motion). At the highest point, v = 0." },
      { part: "Maximum height", text: "Using v^2 = u^2 + 2as: 0 = (39.2)^2 + 2(-9.8)s  =>  0 = 1536.64 - 19.6s  =>  s = 78.4 m." },
      { part: "Time to reach maximum height", text: "Using v = u + at: 0 = 39.2 + (-9.8)t  =>  t = 39.2/9.8 = 4 s." },
      { part: "Total time of flight", text: "By symmetry, the time to fall back down from the highest point equals the time taken to go up, so total time of flight = 2 x 4 = 8 s." },
    ],
  },
  {
    id: 16,
    question: "Explain the difference between average velocity and instantaneous velocity, and describe how instantaneous velocity can be obtained as a limiting case of average velocity. This conceptual distinction is a frequently tested 'higher order thinking' question in CBSE exams.",
    markingScheme: ["Correct definition of average velocity (1.5 marks)", "Correct definition/description of instantaneous velocity (1.5 marks)", "Correct explanation of the limiting process connecting the two (2 marks)"],
    answerParts: [
      { part: "Average velocity", text: "Average velocity over a time interval is the total displacement of the object divided by that time interval: v_av = (change in position)/(time interval). It gives an overall picture of motion across the whole interval, but hides any variations within it." },
      { part: "Instantaneous velocity", text: "Instantaneous velocity (often just called 'velocity' in this chapter) is the velocity of the object at one single specific instant of time." },
      { part: "The limiting process", text: "If we compute the average velocity over smaller and smaller time intervals, all centred around a particular instant, the value of that average velocity keeps changing less and less as the interval shrinks. As the time interval is made infinitesimally small (approaching zero), the average velocity approaches a single, fixed value -- this limiting value is defined as the instantaneous velocity at that particular instant." },
    ],
  },
  {
    id: 17,
    question: "A cyclist starts from rest and accelerates uniformly at 0.5 m/s^2 for 12 s. She then continues at the velocity reached for the next 15 s, and finally comes to rest with a uniform deceleration in the next 5 s. Draw the velocity-time graph and calculate the total distance travelled.",
    markingScheme: ["Correct calculation of velocity reached after accelerating phase (1 mark)", "Correct distance for accelerating phase (1 mark)", "Correct distance for constant-velocity phase (1 mark)", "Correct distance for decelerating phase and correct total (2 marks)"],
    answerParts: [
      { part: "Velocity reached", text: "v = u + at = 0 + 0.5(12) = 6 m/s (this is the velocity at the end of the accelerating phase, and also the constant velocity used in the next phase)." },
      { part: "Phase 1 -- accelerating (0 to 12 s)", text: "s1 = [(0+6)/2] x 12 = 3 x 12 = 36 m." },
      { part: "Phase 2 -- constant velocity (12 s to 27 s)", text: "s2 = 6 m/s x 15 s = 90 m." },
      { part: "Phase 3 -- decelerating (27 s to 32 s), and total", text: "s3 = [(6+0)/2] x 5 = 3 x 5 = 15 m. Total distance = 36 + 90 + 15 = 141 m." },
    ],
  },
  {
    id: 18,
    question: "Explain how displacement can be calculated from a velocity-time graph when the object's acceleration is not constant throughout the interval (i.e. the graph is a curve for part of the motion). Describe the general method, and state what additional technique higher grades use for exact calculation.",
    markingScheme: ["Correct explanation of the approximate area-splitting method (2 marks)", "Correct explanation of using smaller shapes for better accuracy (1.5 marks)", "Correct mention of the exact method used in higher grades (calculus/integration, at a conceptual level) (1.5 marks)"],
    answerParts: [
      { part: "General method for curved graphs", text: "Even if the velocity-time graph is a smooth curve (non-constant acceleration), the displacement is still equal to the total area enclosed between the curve and the time axis. This area can be approximated by dividing the time interval into several narrow strips and treating each strip as a rectangle or trapezium." },
      { part: "Improving accuracy", text: "The area of each narrow strip is calculated using the velocity value at that strip (rectangle method) or the average of the velocities at its two edges (trapezium method), and all the strip-areas are added together. Using a larger number of narrower strips gives a more accurate estimate of the true area under the curve." },
      { part: "Exact method in higher grades", text: "As mentioned in the chapter's 'Ready to Go Beyond' notes, in higher grades this idea is made mathematically exact using integral calculus, which effectively uses infinitely many, infinitesimally narrow strips to compute the exact area under any curve, giving the precise displacement even for continuously changing acceleration." },
    ],
  },
  {
    id: 19,
    question: "A particle moves along a circular path of radius 14 m. It completes 5 revolutions in 44 s. Find (i) the total distance travelled, (ii) the displacement after these 5 revolutions, and (iii) the average speed. (Take pi = 22/7.)",
    markingScheme: ["Correct calculation of circumference (1 mark)", "Correct calculation of total distance for 5 revolutions (1.5 marks)", "Correct reasoning and value for displacement (1 mark)", "Correct calculation of average speed (1.5 marks)"],
    answerParts: [
      { part: "Circumference", text: "Circumference = 2*pi*r = 2 x (22/7) x 14 = 88 m." },
      { part: "Total distance", text: "Distance for 5 complete revolutions = 5 x 88 = 440 m." },
      { part: "Displacement", text: "Since the particle completes a whole number of revolutions (5, an integer), it returns exactly to its starting point each time, so the net displacement after 5 revolutions is 0 m." },
      { part: "Average speed", text: "Average speed = total distance/time = 440/44 = 10 m/s. (Note: average velocity, by contrast, would be 0/44 = 0 m/s, since displacement is zero.)" },
    ],
  },
  {
    id: 20,
    question: "Explain, with a numerical example of your own choosing, why average speed calculated from two different speeds over two EQUAL time intervals is simply their arithmetic mean, but average speed over two equal DISTANCES at different speeds is NOT their arithmetic mean.",
    markingScheme: ["Correct explanation and example for equal time intervals (2.5 marks)", "Correct explanation and example for equal distances (2.5 marks)"],
    answerParts: [
      { part: "Equal time intervals", text: "If an object travels at speed v1 for a time t, then at speed v2 for the same time t, total distance = v1(t) + v2(t) = (v1+v2)t, and total time = 2t. Average speed = (v1+v2)t / 2t = (v1+v2)/2, which IS the simple arithmetic mean. For example, at 20 m/s for 10 s then 40 m/s for 10 s: distance = 200+400=600 m, time=20 s, average speed = 30 m/s = (20+40)/2. It works because the WEIGHT (time) given to each speed is equal." },
      { part: "Equal distances", text: "If an object travels a distance d at speed v1, then the same distance d at speed v2, time1 = d/v1 and time2 = d/v2 -- these times are generally NOT equal (a slower speed takes longer for the same distance). So each speed is not given equal 'weight' in time, and the correct average speed = total distance/total time = 2d / (d/v1 + d/v2), which works out to the harmonic mean, not the arithmetic mean. For example, 20 m/s for 100 m then 40 m/s for 100 m: time1=5s, time2=2.5s, total distance=200m, total time=7.5s, average speed=26.67 m/s, which is LESS than the arithmetic mean of (20+40)/2=30 m/s." },
    ],
  },
  {
    id: 21,
    question: "A vehicle's velocity-time graph shows it moving at a constant 12 m/s from t=0 to t=10 s, then accelerating uniformly to 24 m/s from t=10 s to t=15 s, and then immediately decelerating uniformly back to 0 m/s from t=15 s to t=20 s. Find the total distance travelled over the full 20 s and the vehicle's average speed for the entire journey.",
    markingScheme: ["Correct distance for constant-velocity phase (1 mark)", "Correct distance for accelerating phase (1.5 marks)", "Correct distance for decelerating phase (1.5 marks)", "Correct total distance and average speed (1 mark)"],
    answerParts: [
      { part: "Phase 1 (0-10 s, constant velocity)", text: "s1 = 12 m/s x 10 s = 120 m." },
      { part: "Phase 2 (10-15 s, accelerating 12 to 24 m/s)", text: "s2 = [(12+24)/2] x 5 = 18 x 5 = 90 m." },
      { part: "Phase 3 (15-20 s, decelerating 24 to 0 m/s)", text: "s3 = [(24+0)/2] x 5 = 12 x 5 = 60 m." },
      { part: "Total distance and average speed", text: "Total distance = 120 + 90 + 60 = 270 m. Average speed = total distance/total time = 270/20 = 13.5 m/s." },
    ],
  },
  {
    id: 22,
    question: "Compare and contrast linear (straight-line) motion and uniform circular motion in terms of (i) the path followed, (ii) whether speed can be constant, (iii) whether velocity can be constant, and (iv) whether acceleration can be zero while the object is moving at constant speed.",
    markingScheme: ["Correct comparison of path (1 mark)", "Correct comparison of speed behaviour (1.5 marks)", "Correct comparison of velocity behaviour (1.5 marks)", "Correct comparison of acceleration-at-constant-speed behaviour (1 mark)"],
    answerParts: [
      { part: "Path followed", text: "Linear motion follows a straight line; uniform circular motion follows a circular (curved) path." },
      { part: "Speed behaviour", text: "In both types of motion, speed CAN be constant -- for linear motion this is called uniform motion, and for circular motion (by definition) uniform circular motion always has constant speed." },
      { part: "Velocity behaviour", text: "In linear (straight-line) motion at constant speed, velocity is also constant, since both magnitude and direction stay fixed. In uniform circular motion, velocity is NEVER constant, because even though speed is fixed, the direction of motion is continuously changing." },
      { part: "Acceleration at constant speed", text: "In linear motion at constant speed, acceleration IS zero, since velocity does not change at all. In uniform circular motion, even at constant speed, acceleration is NEVER zero, because the continuously changing direction of velocity means the object is always accelerating." },
    ],
  },
];

// ── QUESTION BANK: COMPETENCY-BASED / CASE STUDY (PARAGRAPH-BASED, 4 MARKS) ──
export const PHYSICS9_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The School Bus Safety Drill",
    caseDescription: "During a road-safety workshop, students learn that their school bus, moving at 54 km/h, needs to stop safely when the driver spots children crossing 60 m ahead. The driver's reaction time is 0.6 s, and once the brakes are applied, the bus decelerates at 5 m/s^2.",
    subQuestions: [
      { question: "What is the bus's speed in m/s?", options: ["10 m/s", "15 m/s", "20 m/s", "54 m/s"], correctIndex: 1, answer: "15 m/s", explanation: "54 km/h x (5/18) = 15 m/s." },
      { question: "How far does the bus travel during the driver's reaction time, before the brakes are even applied?", answer: "Distance = speed x reaction time = 15 x 0.6 = 9 m.", explanation: "During reaction time, the bus is still moving at its original, unreduced speed." },
      { question: "Using the remaining distance, will the bus stop before reaching the children (60 m away)?", answer: "Remaining distance = 60 - 9 = 51 m. Braking distance needed: 0^2 = 15^2 + 2(-5)s => 0 = 225 - 10s => s = 22.5 m. Since 22.5 m < 51 m, yes, the bus stops well before reaching the children.", explanation: "The kinematic equation v^2 = u^2 + 2as, with v=0, gives the exact braking distance required." }
    ]
  },
  {
    id: 2,
    caseTitle: "Sprint Timing at the School Sports Day",
    caseDescription: "At the annual sports day, a 100 m sprint is timed using a smartwatch. Meera completes the race in 12.5 s, running the full distance in a straight line without ever slowing down or reversing.",
    subQuestions: [
      { question: "What is Meera's average speed for the race?", answer: "Average speed = distance/time = 100/12.5 = 8 m/s.", explanation: "Simple application of the average speed formula." },
      { question: "What is Meera's average velocity for the race?", options: ["0 m/s", "8 m/s in the direction she ran", "12.5 m/s", "Cannot be determined"], correctIndex: 1, answer: "8 m/s in the direction she ran", explanation: "Since she runs in a straight line without reversing, distance equals the magnitude of displacement, so average speed and average velocity have the same numeric value here." },
      { question: "If instead Meera had run 100 m out and then jogged back 100 m to the same starting line in a total of 30 s, what would her average velocity for that whole activity be?", answer: "Zero, because her final position is the same as her starting position, giving zero net displacement, regardless of the total time taken or distance covered.", explanation: "Average velocity depends only on displacement (start to end position), not on the path or total distance." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Ferris Wheel Ride",
    caseDescription: "At an amusement park, a Ferris wheel of radius 10 m rotates at a constant speed, completing one full rotation every 40 s. A child sits in one of the cabins throughout the ride.",
    subQuestions: [
      { question: "What type of motion does the child experience?", options: ["Linear motion", "Uniform circular motion", "Random motion", "The child is at rest"], correctIndex: 1, answer: "Uniform circular motion", explanation: "Constant speed along a circular path of fixed radius is, by definition, uniform circular motion." },
      { question: "Is the child accelerating, even though the wheel's speed does not change? Explain.", answer: "Yes, the child is accelerating, because although speed is constant, the direction of the child's velocity is continuously changing as the wheel rotates, and any change in velocity (including just direction) constitutes acceleration.", explanation: "This tests the key conceptual distinction between constant speed and constant velocity." },
      { question: "Find the child's average speed during one full rotation. (Take pi = 22/7.)", answer: "Circumference = 2*pi*r = 2 x (22/7) x 10 = 62.86 m (approx). Average speed = 62.86/40 = 1.57 m/s (approx).", explanation: "Average speed = distance (circumference) / time (period T), as per Eq. 4.5 of the chapter." }
    ]
  },
  {
    id: 4,
    caseTitle: "GPS Tracking a Delivery Van",
    caseDescription: "A delivery company tracks its van using GPS. The van starts at the warehouse, drives 8 km east to the first stop, then 6 km north to the second stop, delivering packages along the way. The total driving time for this route is 20 minutes.",
    subQuestions: [
      { question: "What is the total distance travelled by the van?", answer: "Total distance = 8 km + 6 km = 14 km.", explanation: "Distance simply adds up every leg of the actual path travelled." },
      { question: "What is the magnitude of the van's net displacement from the warehouse to the second stop?", options: ["14 km", "2 km", "10 km", "48 km"], correctIndex: 2, answer: "10 km", explanation: "Since the two legs (8 km east, 6 km north) are perpendicular, displacement = sqrt(8^2 + 6^2) = sqrt(64+36) = sqrt(100) = 10 km." },
      { question: "Which value -- distance or displacement -- would the delivery company more likely use to estimate fuel costs, and why?", answer: "Distance, because fuel consumption depends on the total actual path covered by the van's engine and wheels, not on the net straight-line change in position.", explanation: "This connects the GPS scenario to the chapter's fuel-consumption reasoning (Pause and Ponder)." }
    ]
  },
  {
    id: 5,
    caseTitle: "The Elevator's Journey",
    caseDescription: "An elevator in a tall building starts from rest at the ground floor and accelerates uniformly upward at 1 m/s^2 for 3 s, then moves at the constant velocity it has reached for the next 8 s, before decelerating uniformly to rest in 2 s at the top floor.",
    subQuestions: [
      { question: "What velocity does the elevator reach at the end of the first (accelerating) phase?", answer: "v = u + at = 0 + 1(3) = 3 m/s.", explanation: "Simple application of the first kinematic equation with u=0." },
      { question: "What distance does the elevator cover during the constant-velocity phase?", options: ["3 m", "8 m", "24 m", "11 m"], correctIndex: 2, answer: "24 m", explanation: "Distance = velocity x time = 3 m/s x 8 s = 24 m." },
      { question: "Is the elevator's acceleration the same throughout the whole 13 s journey? Explain using the three phases.", answer: "No. In phase 1 (0-3 s), acceleration = +1 m/s^2 (speeding up). In phase 2 (3-11 s), acceleration = 0 (constant velocity). In phase 3 (11-13 s), acceleration is negative (decelerating from 3 m/s to 0 in 2 s, i.e. -1.5 m/s^2).", explanation: "This tests reading multi-phase motion, recognising each phase has its own constant (but different) acceleration." }
    ]
  },
  {
    id: 6,
    caseTitle: "Analysing a Cyclist's Smartwatch Data",
    caseDescription: "A cyclist's smartwatch records her velocity every few seconds during a training ride: at t=0 s her velocity is 2 m/s, at t=10 s it is 8 m/s, and from t=10 s to t=20 s her velocity stays constant at 8 m/s.",
    subQuestions: [
      { question: "What was her average acceleration between t=0 s and t=10 s?", answer: "a = (v-u)/t = (8-2)/10 = 0.6 m/s^2.", explanation: "Direct application of the average acceleration formula using the recorded velocities." },
      { question: "What is her acceleration between t=10 s and t=20 s?", options: ["0.6 m/s^2", "0.8 m/s^2", "0 m/s^2", "8 m/s^2"], correctIndex: 2, answer: "0 m/s^2", explanation: "Since her velocity is constant (8 m/s) throughout this interval, there is no change in velocity, so acceleration is zero." },
      { question: "Find her total displacement between t=0 s and t=20 s.", answer: "Phase 1 (0-10s): s1 = [(2+8)/2] x 10 = 50 m. Phase 2 (10-20s): s2 = 8 x 10 = 80 m. Total = 50 + 80 = 130 m.", explanation: "Splitting into the two phases and applying the appropriate area/formula for each." }
    ]
  },
  {
    id: 7,
    caseTitle: "The Runaway Marble Experiment",
    caseDescription: "In science class, students perform the ring-and-marble activity from the textbook: a marble is spun inside a circular ring on a smooth table, moving along the inner boundary of the ring. After a couple of revolutions, a student carefully lifts the ring away without disturbing the marble.",
    subQuestions: [
      { question: "What was the marble's motion while inside the ring?", options: ["Linear motion", "Uniform circular motion (if speed stayed constant)", "The marble was at rest", "Random motion"], correctIndex: 1, answer: "Uniform circular motion (if speed stayed constant)", explanation: "The ring constrains the marble to a circular path, matching the definition of circular motion." },
      { question: "What happens to the marble's path immediately after the ring is lifted away?", answer: "The marble moves in a straight line, in the direction it was moving at the exact instant the ring was removed.", explanation: "This matches Activity 4.5 in the chapter -- once the circular constraint is removed, the object continues in a straight line (tangent direction) rather than continuing to curve." },
      { question: "Which direction, specifically, does the marble travel in once released?", answer: "It moves along the tangent to the circle at the exact point where it was released, since that tangent direction is the direction its velocity was pointing at that instant.", explanation: "In uniform circular motion, velocity at any point is always directed along the tangent to the circle at that point." }
    ]
  },
  {
    id: 8,
    caseTitle: "Reading a Highway Patrol Officer's Speed Log",
    caseDescription: "A highway patrol officer records that a car covered 150 m in 5 s while she was watching it through a fixed radar point, and the car appeared to move steadily without any sudden speeding up or slowing down.",
    subQuestions: [
      { question: "What is the car's average speed as recorded by the officer?", answer: "Average speed = 150/5 = 30 m/s.", explanation: "Basic application of average speed = distance/time." },
      { question: "Convert this speed to km/h.", options: ["30 km/h", "54 km/h", "108 km/h", "300 km/h"], correctIndex: 2, answer: "108 km/h", explanation: "30 m/s x (18/5) = 108 km/h." },
      { question: "The officer notes the car moved 'steadily, without sudden speeding up or slowing down.' What can you conclude about its acceleration during this observation?", answer: "The car's acceleration was approximately zero during this interval, since it was moving with constant (uniform) velocity.", explanation: "No change in speed over the observed interval implies zero acceleration." }
    ]
  },
  {
    id: 9,
    caseTitle: "The Astronaut and the Orbiting Satellite",
    caseDescription: "An astronaut explains to students that a communication satellite orbits the Earth in a stable, circular orbit at a constant speed, completing one full orbit every 90 minutes.",
    subQuestions: [
      { question: "What is the satellite's displacement after exactly one complete orbit?", options: ["Equal to the orbit's circumference", "Zero", "Equal to the orbit's radius", "Cannot be determined"], correctIndex: 1, answer: "Zero", explanation: "After one complete revolution, the satellite returns to its exact starting point in the orbit, so its net displacement is zero." },
      { question: "Is the satellite's velocity constant throughout its orbit? Justify your answer.", answer: "No, the satellite's velocity is not constant, even though its speed is. Since the satellite is in uniform circular motion, the direction of its velocity is continuously changing as it moves around the orbit, even though the magnitude (speed) stays the same.", explanation: "Tests the core distinction between constant speed and constant velocity in circular motion." },
      { question: "Is the satellite accelerating? If so, why, given that it moves at constant speed?", answer: "Yes, the satellite is accelerating, because its velocity (a vector) is continuously changing direction, even though its speed is not changing. A change in the direction of velocity alone is enough to produce acceleration.", explanation: "Reinforces that acceleration in uniform circular motion comes from the change in direction alone." }
    ]
  },
  {
    id: 10,
    caseTitle: "Comparing Two Runners on a Track",
    caseDescription: "Two friends, Kabir and Aditi, run on a straight 200 m track. Kabir runs the full 200 m in one direction and stops. Aditi runs 200 m forward, then jogs back 50 m before the timer stops, both taking exactly 40 s in total.",
    subQuestions: [
      { question: "What is Kabir's average speed?", answer: "Average speed = 200/40 = 5 m/s.", explanation: "Distance/time for Kabir, who moves in one direction only." },
      { question: "What is Kabir's average velocity?", options: ["0 m/s", "5 m/s (same as his average speed)", "10 m/s", "Cannot be determined"], correctIndex: 1, answer: "5 m/s (same as his average speed)", explanation: "Since Kabir moves in a straight line without reversing, his distance equals his displacement magnitude, so speed and velocity coincide." },
      { question: "What is Aditi's average speed, and how does it compare to her average velocity?", answer: "Aditi's total distance = 200 + 50 = 250 m, so her average speed = 250/40 = 6.25 m/s. Her net displacement = 200 - 50 = 150 m, so her average velocity = 150/40 = 3.75 m/s. Her average speed (6.25 m/s) is greater than the magnitude of her average velocity (3.75 m/s), because she reversed direction partway through.", explanation: "This demonstrates that speed and velocity magnitude diverge whenever the object changes direction." }
    ]
  },
  {
    id: 11,
    caseTitle: "The Free-Falling Coconut",
    caseDescription: "A coconut breaks loose from a tree and falls freely to the ground, taking 1.5 s to hit the ground. Assume there is no air resistance, and take g = 9.8 m/s^2.",
    subQuestions: [
      { question: "What is the initial velocity of the coconut as it starts to fall?", options: ["9.8 m/s", "0 m/s", "1.5 m/s", "Cannot be determined"], correctIndex: 1, answer: "0 m/s", explanation: "The coconut starts falling from rest, so its initial velocity is zero." },
      { question: "Find the velocity of the coconut just before it hits the ground.", answer: "v = u + gt = 0 + 9.8(1.5) = 14.7 m/s.", explanation: "Direct application of the first kinematic equation with constant acceleration g." },
      { question: "Find the height of the tree from which the coconut fell.", answer: "s = ut + (1/2)gt^2 = 0 + (1/2)(9.8)(1.5)^2 = (1/2)(9.8)(2.25) = 11.025 m.", explanation: "Direct application of the second kinematic equation, using u=0 for free fall from rest." }
    ]
  },
  {
    id: 12,
    caseTitle: "The Clock Tower's Hour and Minute Hands",
    caseDescription: "A large clock tower has a minute hand of length 1.5 m and an hour hand of length 0.9 m. Students are asked to compare the motion of the tips of both hands over a 3-hour period, from 12:00 to 3:00.",
    subQuestions: [
      { question: "How many complete revolutions does the tip of the minute hand make in 3 hours?", options: ["1", "3", "12", "0.25"], correctIndex: 1, answer: "3", explanation: "The minute hand completes 1 revolution every 60 minutes, so in 3 hours (180 min) it completes 180/60 = 3 revolutions." },
      { question: "How many complete revolutions does the tip of the hour hand make in the same 3 hours?", answer: "The hour hand completes 1 revolution every 12 hours, so in 3 hours it completes 3/12 = 0.25 (a quarter) revolution.", explanation: "The hour hand moves much more slowly, taking 12 hours for a full circle." },
      { question: "Which tip -- minute or hour hand -- has the greater average speed, and why?", answer: "The tip of the minute hand has the greater average speed. Even though the minute hand is longer (giving it a larger circumference to cover), it completes far more revolutions in the same time, and its much shorter time period (60 min per revolution, vs 720 min for the hour hand) makes its average speed (2*pi*r/T) considerably higher.", explanation: "Combines the circular motion average speed formula with reasoning about both radius and period." }
    ]
  },
  {
    id: 13,
    caseTitle: "The Weather Balloon's Ascent",
    caseDescription: "A weather balloon is released from the ground and rises with a uniform acceleration of 0.5 m/s^2 (starting from rest) for the first 20 s of its flight, after which it continues to rise at the velocity it has then reached.",
    subQuestions: [
      { question: "What velocity does the balloon reach after the first 20 s?", answer: "v = u + at = 0 + 0.5(20) = 10 m/s.", explanation: "Direct application of v = u + at with u = 0." },
      { question: "What height does the balloon reach in the first 20 s?", options: ["100 m", "200 m", "10 m", "50 m"], correctIndex: 0, answer: "100 m", explanation: "s = ut + (1/2)at^2 = 0 + (1/2)(0.5)(20^2) = (1/2)(0.5)(400) = 100 m." },
      { question: "If the balloon continues rising at its reached velocity for another 30 s, what additional height does it gain, and what is its total height at that point?", answer: "Additional height = 10 m/s x 30 s = 300 m. Total height = 100 m (first phase) + 300 m (second phase) = 400 m.", explanation: "Constant-velocity phase uses simple distance = speed x time, added to the earlier accelerating phase's distance." }
    ]
  },
  {
    id: 14,
    caseTitle: "Odometer vs GPS Displacement Tracker",
    caseDescription: "A cab driver notices that his car's odometer shows he drove 18 km on a particular trip, but the ride-hailing app's GPS-based 'distance from pickup to drop' shown to the passenger before the ride only estimated 12 km (a straight-line-ish route estimate).",
    subQuestions: [
      { question: "Which of the two readings -- the odometer or the app's pre-ride estimate -- more closely represents 'distance travelled' as defined in this chapter?", options: ["The odometer (18 km)", "The app's pre-ride estimate (12 km)", "Both represent the same quantity", "Neither represents distance"], correctIndex: 0, answer: "The odometer (18 km)", explanation: "An odometer tracks the actual total path length covered by the wheels, matching the definition of distance travelled." },
      { question: "What might explain why the app's estimate (12 km) is lower than the odometer reading?", answer: "The app's route likely does not perfectly match the actual roads driven (e.g. due to traffic diversions, one-way streets, or the app estimating a more direct route than what the driver actually had to take), and 'distance from pickup to drop' as displayed by such apps is often closer to a straight-line or shortest-path estimate rather than the true path taken.", explanation: "Encourages reasoning about how real-world distance measurements can differ from idealised displacement-like estimates." },
      { question: "Strictly speaking, based on the definitions in this chapter, is the app's 12 km figure best described as 'distance' or as an approximation closer to 'displacement'? Explain briefly.", answer: "It is closer to an approximation of displacement (or at least a more direct route estimate), since displacement is concerned with the net, most-direct change in position rather than the full winding path actually driven, which is what distance/odometer readings capture.", explanation: "Reinforces the conceptual difference between the two quantities using a relatable, real-world app scenario." }
    ]
  },
  {
    id: 15,
    caseTitle: "The Robotics Club's Line-Following Robot",
    caseDescription: "A robotics club programs a small robot to move in a straight line along the classroom floor. Sensors record that the robot's velocity increases uniformly from 0.2 m/s to 1.0 m/s over a distance of 1.8 m.",
    subQuestions: [
      { question: "Using v^2 = u^2 + 2as, find the robot's acceleration.", answer: "1.0^2 = 0.2^2 + 2a(1.8)  =>  1 = 0.04 + 3.6a  =>  3.6a = 0.96  =>  a = 0.267 m/s^2 (approx).", explanation: "Direct substitution into the third kinematic equation and solving for a." },
      { question: "How long does the robot take to cover this 1.8 m?", options: ["Approximately 3 s", "Approximately 1.5 s", "Approximately 6 s", "Approximately 0.6 s"], correctIndex: 0, answer: "Approximately 3 s", explanation: "Using v = u + at: 1.0 = 0.2 + 0.267t => t = 0.8/0.267 ~ 3 s." },
      { question: "If the robot's programming is changed so it moves at a constant 0.6 m/s instead (the average of its start and end speeds), would it cover the same distance in the same time as before? Explain.", answer: "Yes, moving at the constant average velocity (0.6 m/s, the mean of 0.2 and 1.0 m/s) for the same duration (about 3 s) covers 0.6 x 3 = 1.8 m, the same total distance -- this is exactly why the formula s = [(u+v)/2] x t works for uniformly accelerated motion.", explanation: "Reinforces the meaning behind the average-velocity form of the kinematic equation." }
    ]
  },
  {
    id: 16,
    caseTitle: "Interpreting a Fitness App's Speed Graph",
    caseDescription: "A jogger's fitness app plots her speed against time during a run. The graph shows her speed rising from 0 to 3 m/s over the first 30 s, staying flat at 3 m/s from 30 s to 90 s, and then dropping back to 0 over the final 15 s as she cools down.",
    subQuestions: [
      { question: "What does the flat portion of the graph (30 s to 90 s) tell you about her motion during that time?", options: ["She was accelerating", "She was decelerating", "She was moving at constant speed", "She was at rest"], correctIndex: 2, answer: "She was moving at constant speed", explanation: "A horizontal segment on a speed/velocity-time graph indicates unchanging speed." },
      { question: "Using the area-under-the-graph method, estimate the distance she covered during the flat (constant-speed) portion.", answer: "Distance = speed x time = 3 m/s x (90-30) s = 3 x 60 = 180 m.", explanation: "For a constant-speed phase, area under the graph is simply a rectangle: speed x time." },
      { question: "Roughly estimate her total distance covered over the full 135 s workout shown, treating the speeding-up and cooling-down phases as triangular regions.", answer: "Speeding-up phase (triangle): (1/2)(30)(3) = 45 m. Flat phase (rectangle): 180 m. Cooling-down phase (triangle): (1/2)(15)(3) = 22.5 m. Total = 45 + 180 + 22.5 = 247.5 m.", explanation: "Demonstrates splitting a multi-segment speed-time graph into simple shapes and summing their areas." }
    ]
  },
  {
    id: 17,
    caseTitle: "The Roller Coaster's Loop",
    caseDescription: "An engineering student studies a roller coaster car that moves through a circular loop of radius 8 m at a constant speed of 12.56 m/s at the top of the loop (an idealised, simplified scenario for this exercise).",
    subQuestions: [
      { question: "Is the roller coaster car in uniform circular motion at this point? Why or why not?", answer: "Yes, at this point (and throughout the circular loop, in this idealised scenario), it is moving along a circular path at constant speed, which matches the definition of uniform circular motion.", explanation: "Directly applies the chapter's definition." },
      { question: "At the very top of the loop, in which direction is the car's velocity directed?", options: ["Straight up", "Straight down", "Horizontal, along the tangent to the loop at that point", "Toward the centre of the loop"], correctIndex: 2, answer: "Horizontal, along the tangent to the loop at that point", explanation: "Velocity in circular motion is always along the tangent to the circle at that point -- at the very top of a vertical loop, the tangent is horizontal." },
      { question: "Roughly how long does the car take to complete one full loop at this constant speed? (Take pi = 3.14.)", answer: "Circumference = 2*pi*r = 2 x 3.14 x 8 = 50.24 m. Time = circumference/speed = 50.24/12.56 = 4 s (approx).", explanation: "Rearranging the average speed formula (v = 2*pi*r/T) to solve for the time period T." }
    ]
  },
  {
    id: 18,
    caseTitle: "The Traffic Signal Countdown Dilemma",
    caseDescription: "A car is moving at 20 m/s (72 km/h) when the driver notices the traffic signal 50 m ahead turn yellow. The driver decides to brake immediately (assume zero reaction time for this scenario) with a deceleration of 4 m/s^2.",
    subQuestions: [
      { question: "Using v^2 = u^2 + 2as, find the distance the car needs to come to a complete stop.", answer: "0 = 20^2 + 2(-4)s => 0 = 400 - 8s => s = 50 m.", explanation: "Direct substitution into the third kinematic equation with v=0, u=20, a=-4." },
      { question: "Based on this calculation, will the car stop exactly at, before, or after the signal (50 m away)?", options: ["Well before the signal", "Exactly at the signal line", "Well past the signal", "Cannot be determined"], correctIndex: 1, answer: "Exactly at the signal line", explanation: "The calculated stopping distance (50 m) exactly matches the given distance to the signal (50 m)." },
      { question: "In a real situation, why might the car actually NOT stop exactly at the line, even with the same deceleration value?", answer: "In reality, the driver's reaction time (time taken to notice, decide, and physically press the brake) is never truly zero, so the car would travel some extra distance at its original speed before braking even begins, meaning the true stopping point would be somewhat beyond the calculated 50 m in this idealised, zero-reaction-time scenario.", explanation: "Connects the idealised physics calculation to the real-world importance of reaction time, as emphasised in the chapter's road-safety discussion." }
    ]
  },
  {
    id: 19,
    caseTitle: "Studying an Accelerometer App's Readings",
    caseDescription: "As suggested in the chapter's activities, a group of students installs an accelerometer app on a smartphone and records readings in two situations: (i) the phone resting still on an outstretched, motionless palm, and (ii) the phone resting on the floor.",
    subQuestions: [
      { question: "In an ideal situation, what acceleration reading would you expect the app to show while the phone is perfectly still (whether on the palm or the floor)?", options: ["A large, non-zero value", "Approximately zero", "Exactly the value of g", "A negative value only"], correctIndex: 1, answer: "Approximately zero", explanation: "A truly motionless object has unchanging velocity, so its acceleration should read close to zero." },
      { question: "Why might the reading on the outstretched palm show small, non-zero fluctuations compared to the reading on the floor?", answer: "A human hand, even when trying to hold still, has tiny, involuntary muscle movements and micro-tremors that cause very small accelerations, which a sensitive accelerometer can detect -- whereas the floor is a much more stable, motionless surface with no such involuntary movement.", explanation: "As the chapter notes, such tiny accelerations are studied in medical research, e.g. related to movement disorders." },
      { question: "What does this activity demonstrate about the sensitivity of the concept of acceleration to even very small, real-world motions?", answer: "It demonstrates that acceleration is not just a textbook abstraction for cars and balls -- it can be detected in extremely small, everyday, even involuntary motions, showing how sensitive and universally applicable the concept of a 'change in velocity' really is.", explanation: "Encourages a reflective, real-world connection to the chapter's core concept." }
    ]
  },
  {
    id: 20,
    caseTitle: "The Two Trains Problem",
    caseDescription: "Train A leaves a station and accelerates uniformly from rest at 0.2 m/s^2. At the very same instant, Train B passes through the same station already moving at a constant 15 m/s in the same direction, and continues at that same constant speed.",
    subQuestions: [
      { question: "What is Train A's velocity after 60 s?", answer: "v = u + at = 0 + 0.2(60) = 12 m/s.", explanation: "Direct application of v = u + at." },
      { question: "What distance has each train covered after 60 s?", options: ["Train A: 360 m, Train B: 900 m", "Train A: 900 m, Train B: 360 m", "Both cover 900 m", "Both cover 360 m"], correctIndex: 0, answer: "Train A: 360 m, Train B: 900 m", explanation: "Train A: s = ut + (1/2)at^2 = 0 + (1/2)(0.2)(3600) = 360 m. Train B: s = 15 x 60 = 900 m." },
      { question: "Based on the distances after 60 s, has Train A caught up to Train B yet? What does this tell you about their relative motion so far?", answer: "No, Train A (360 m) is still well behind Train B (900 m) after 60 s -- a gap of 540 m. This shows that even though Train A is continuously accelerating, its velocity (12 m/s at t=60s) has not yet exceeded Train B's constant 15 m/s, so the gap between them is, in fact, still growing at this point, not shrinking.", explanation: "Encourages deeper reasoning about relative motion beyond a single-step calculation -- Train A will only start closing the gap once its velocity exceeds 15 m/s." }
    ]
  },
];

// ── SELF-ASSESSMENT: TIMED TEST POOL (50 questions, standalone from the main MCQ bank) ──
export const PHYSICS9_SELF_ASSESSMENT: QuizQuestion[] = [
  { id: 1, question: "An object's position with respect to a reference point is fully described by:", options: ["Distance alone", "Direction alone", "Both distance and direction", "Neither distance nor direction"], correctAnswer: 2, explanation: "Position needs both the distance from, and direction relative to, the reference point." },
  { id: 2, question: "The net change in the position of an object between two instants is called its:", options: ["Distance", "Displacement", "Speed", "Acceleration"], correctAnswer: 1, explanation: "This is the definition of displacement." },
  { id: 3, question: "Which of these is a vector quantity?", options: ["Distance", "Speed", "Velocity", "Time"], correctAnswer: 2, explanation: "Velocity requires both magnitude and direction, making it a vector." },
  { id: 4, question: "The total path length covered by a moving object is called its:", options: ["Displacement", "Position", "Distance travelled", "Velocity"], correctAnswer: 2, explanation: "Distance travelled is the total length of the path covered, irrespective of direction." },
  { id: 5, question: "If an object returns to its exact starting point, its displacement is:", options: ["Equal to the distance travelled", "Zero", "Negative infinity", "Undefined"], correctAnswer: 1, explanation: "Displacement is zero whenever the object ends exactly where it started." },
  { id: 6, question: "Average speed is calculated as:", options: ["Displacement / time", "Distance travelled / time interval", "Time / distance", "Velocity x time"], correctAnswer: 1, explanation: "This is the definition of average speed." },
  { id: 7, question: "Average velocity is calculated as:", options: ["Distance / time", "Displacement / time interval", "Acceleration x time", "Speed x distance"], correctAnswer: 1, explanation: "This is the definition of average velocity." },
  { id: 8, question: "The SI unit of acceleration is:", options: ["m/s", "m", "m/s^2", "s"], correctAnswer: 2, explanation: "Acceleration is the rate of change of velocity, giving units of m/s^2." },
  { id: 9, question: "A car moving at constant velocity has an acceleration of:", options: ["Maximum", "Zero", "Negative", "Equal to g"], correctAnswer: 1, explanation: "No change in velocity means zero acceleration." },
  { id: 10, question: "If an object covers equal distances in equal time intervals, its motion is:", options: ["Non-uniform", "Uniform", "Circular only", "Impossible"], correctAnswer: 1, explanation: "This is the definition of uniform motion." },
  { id: 11, question: "The slope of a position-time graph gives:", options: ["Acceleration", "Velocity", "Distance", "Displacement squared"], correctAnswer: 1, explanation: "Slope of position-time graph = velocity." },
  { id: 12, question: "The slope of a velocity-time graph gives:", options: ["Displacement", "Distance", "Acceleration", "Position"], correctAnswer: 2, explanation: "Slope of velocity-time graph = acceleration." },
  { id: 13, question: "The area under a velocity-time graph gives:", options: ["Acceleration", "Velocity", "Displacement", "Speed only"], correctAnswer: 2, explanation: "Area under velocity-time graph = displacement." },
  { id: 14, question: "A horizontal line on a position-time graph represents an object that is:", options: ["Accelerating", "At rest", "Moving at maximum speed", "In circular motion"], correctAnswer: 1, explanation: "Unchanging position over time means the object is at rest." },
  { id: 15, question: "A car starts from rest and reaches 20 m/s in 4 s. Its acceleration is:", options: ["5 m/s^2", "80 m/s^2", "0.2 m/s^2", "16 m/s^2"], correctAnswer: 0, explanation: "a = (20-0)/4 = 5 m/s^2." },
  { id: 16, question: "Which kinematic equation relates v, u, a, and t?", options: ["v = u + at", "s = ut + at^2", "v^2 = u + 2as", "s = v/t"], correctAnswer: 0, explanation: "v = u + at is the first kinematic equation." },
  { id: 17, question: "Which kinematic equation is used to find displacement without knowing final velocity directly?", options: ["v = u + at", "s = ut + (1/2)at^2", "v^2 = u^2 + 2as", "a = v/t"], correctAnswer: 1, explanation: "s = ut + (1/2)at^2 finds displacement using u, a, and t." },
  { id: 18, question: "Which kinematic equation does NOT require the time (t) to be known?", options: ["v = u + at", "s = ut + (1/2)at^2", "v^2 = u^2 + 2as", "All require time"], correctAnswer: 2, explanation: "v^2 = u^2 + 2as was derived specifically by eliminating t." },
  { id: 19, question: "The kinematic equations of motion are valid only when:", options: ["The object is at rest", "Acceleration is constant", "The path is circular", "Velocity is zero"], correctAnswer: 1, explanation: "These equations assume constant (uniform) acceleration." },
  { id: 20, question: "Motion along a circular path with constant speed is called:", options: ["Linear motion", "Uniform circular motion", "Random motion", "Rest"], correctAnswer: 1, explanation: "This is the definition of uniform circular motion." },
  { id: 21, question: "In uniform circular motion, which quantity remains constant?", options: ["Velocity", "Direction of motion", "Speed", "Acceleration's direction"], correctAnswer: 2, explanation: "Only speed (magnitude of velocity) stays constant; direction of velocity keeps changing." },
  { id: 22, question: "The velocity of an object in circular motion is directed:", options: ["Toward the centre", "Away from the centre", "Along the tangent to the circle", "Vertically upward always"], correctAnswer: 2, explanation: "Velocity in circular motion is always along the tangent at that point." },
  { id: 23, question: "The distance covered in one complete revolution of a circle of radius R is:", options: ["R", "2R", "pi R", "2 pi R"], correctAnswer: 3, explanation: "This is the circumference of the circle, 2*pi*R." },
  { id: 24, question: "After one complete revolution, the displacement of an object on a circular track is:", options: ["Equal to the circumference", "Zero", "Equal to the radius", "Undefined"], correctAnswer: 1, explanation: "The object returns to its starting point, giving zero displacement." },
  { id: 25, question: "A body dropped from rest falls under gravity. Its acceleration is approximately:", options: ["0 m/s^2", "9.8 m/s^2", "9.8 m/s", "98 m/s^2"], correctAnswer: 1, explanation: "The acceleration due to gravity near Earth's surface is about 9.8 m/s^2." },
  { id: 26, question: "72 km/h is equal to:", options: ["10 m/s", "20 m/s", "72 m/s", "7.2 m/s"], correctAnswer: 1, explanation: "72 x 5/18 = 20 m/s." },
  { id: 27, question: "For motion in a straight line without reversing direction, distance and the magnitude of displacement are:", options: ["Always different", "Always equal", "Related by a factor of 2", "Never comparable"], correctAnswer: 1, explanation: "One-directional straight-line motion makes distance equal to displacement magnitude." },
  { id: 28, question: "A person walks 6 m east then 8 m north. The magnitude of the resultant displacement is:", options: ["14 m", "2 m", "10 m", "48 m"], correctAnswer: 2, explanation: "sqrt(6^2+8^2) = sqrt(36+64) = sqrt(100) = 10 m." },
  { id: 29, question: "A vehicle covers 300 m in 20 s at constant speed. Its speed is:", options: ["6000 m/s", "15 m/s", "20 m/s", "300 m/s"], correctAnswer: 1, explanation: "300/20 = 15 m/s." },
  { id: 30, question: "Deceleration (retardation) is:", options: ["Acceleration in the direction of motion", "Acceleration opposite to the direction of motion", "Always exactly zero", "Only possible in circular motion"], correctAnswer: 1, explanation: "Deceleration acts opposite to the direction of motion, slowing the object down." },
  { id: 31, question: "A curved position-time graph indicates:", options: ["Constant velocity", "The object is at rest", "Non-uniform (changing) velocity", "Impossible motion"], correctAnswer: 2, explanation: "A curve means the slope (velocity) is changing, i.e. non-uniform motion." },
  { id: 32, question: "A straight, upward-sloping velocity-time graph indicates:", options: ["Zero acceleration", "Constant positive acceleration", "Constant negative acceleration", "Circular motion"], correctAnswer: 1, explanation: "A rising straight line means velocity increases at a constant rate." },
  { id: 33, question: "A car's velocity changes from 8 m/s to 20 m/s in 6 s. Its acceleration is:", options: ["2 m/s^2", "12 m/s^2", "28 m/s^2", "4.67 m/s^2"], correctAnswer: 0, explanation: "a = (20-8)/6 = 2 m/s^2." },
  { id: 34, question: "For a body starting from rest with a = 3 m/s^2, the distance covered in 4 s is:", options: ["12 m", "24 m", "48 m", "6 m"], correctAnswer: 1, explanation: "s = 0 + (1/2)(3)(16) = 24 m." },
  { id: 35, question: "A ball at the highest point of a vertical throw has:", options: ["Zero velocity and zero acceleration", "Zero velocity but non-zero acceleration (g)", "Maximum velocity", "Maximum acceleration"], correctAnswer: 1, explanation: "At the highest point, velocity is momentarily zero, but gravity still acts, giving non-zero acceleration." },
  { id: 36, question: "Which of these is an example of one-dimensional (straight-line) motion?", options: ["A satellite in circular orbit", "A ball falling vertically", "A car taking a roundabout", "A kicked football's curved path"], correctAnswer: 1, explanation: "A vertically falling ball moves along a single straight line." },
  { id: 37, question: "A body's speed is 10 m/s and its displacement magnitude equals the distance travelled. This means the body:", options: ["Is accelerating", "Moved in one direction without reversing", "Is in circular motion", "Is at rest"], correctAnswer: 1, explanation: "Distance = displacement magnitude only for one-directional straight-line motion." },
  { id: 38, question: "The reading on a car's speedometer approximates:", options: ["The direction of velocity", "The magnitude of velocity (speed)", "The total distance travelled", "The acceleration"], correctAnswer: 1, explanation: "A speedometer shows speed (magnitude of velocity), not direction." },
  { id: 39, question: "A body moving with uniform acceleration covers unequal distances in successive equal time intervals, with each interval covering MORE distance than the last. This means the body is:", options: ["Decelerating", "Accelerating (speeding up)", "At constant velocity", "At rest"], correctAnswer: 1, explanation: "Increasing distance per equal time interval indicates increasing speed, i.e. acceleration." },
  { id: 40, question: "A motorbike moving at 20 m/s stops after travelling 50 m under constant deceleration. Using v^2=u^2+2as, the deceleration is:", options: ["2 m/s^2", "4 m/s^2", "8 m/s^2", "0.4 m/s^2"], correctAnswer: 1, explanation: "0 = 400 + 2a(50) => a = -400/100 = -4 m/s^2, so deceleration = 4 m/s^2." },
  { id: 41, question: "Two objects moving with the same velocity have:", options: ["The same speed only", "The same speed and the same direction", "Different directions necessarily", "No relationship"], correctAnswer: 1, explanation: "Equal velocity means both magnitude (speed) and direction are the same." },
  { id: 42, question: "If a car's odometer shows 40 km travelled but its net displacement from start to end is 25 km, this means:", options: ["The car travelled in a perfectly straight line", "The car's path was not a straight line, or it reversed direction at some point", "This situation is impossible", "The odometer is faulty"], correctAnswer: 1, explanation: "Distance (40 km) exceeding displacement magnitude (25 km) means the path was not a single straight, one-directional line." },
  { id: 43, question: "Which of the following is the correct formula for displacement using average velocity form?", options: ["s = [(u+v)/2] x t", "s = (u-v) x t", "s = u/v x t", "s = (u+v) x t^2"], correctAnswer: 0, explanation: "This is the average-velocity form of the second kinematic equation, valid for constant acceleration." },
  { id: 44, question: "A cyclist accelerates from 4 m/s to 10 m/s while covering 21 m. Find the acceleration.", options: ["1 m/s^2", "1.5 m/s^2", "2 m/s^2", "3 m/s^2"], correctAnswer: 2, explanation: "100 = 16 + 42a => a = 84/42 = 2 m/s^2." },
  { id: 45, question: "In everyday language, when we say a vehicle is 'accelerating', we usually mean:", options: ["It is turning only", "Its speed is increasing", "It has stopped", "It is moving in a circle"], correctAnswer: 1, explanation: "Colloquially, 'accelerating' usually refers to speeding up, though physics defines acceleration more broadly to include direction changes too." },
  { id: 46, question: "A wheel of radius 7 m makes one full revolution. Taking pi=22/7, the distance covered is:", options: ["22 m", "44 m", "14 m", "7 m"], correctAnswer: 1, explanation: "2*pi*r = 2 x (22/7) x 7 = 44 m." },
  { id: 47, question: "A body's average velocity over a time interval is zero. What can we conclude about its average speed over the same interval?", options: ["It must also be zero", "It could be zero or non-zero, but is zero only if the body did not move at all", "It must be negative", "It must be greater than 100 m/s"], correctAnswer: 1, explanation: "Average velocity being zero (return to start) does not force average speed to be zero -- speed is zero only if the body never actually moved." },
  { id: 48, question: "The primary reason a marble released from a spinning ring moves in a straight line (not a curve) is:", options: ["It suddenly loses all its velocity", "It continues moving in the direction of its velocity at the instant of release", "Gravity pulls it straight", "It was never actually moving"], correctAnswer: 1, explanation: "Once the circular constraint (the ring) is removed, the marble simply continues in the direction it was already moving." },
  { id: 49, question: "For an object with constant acceleration, plotting velocity against time will always produce a:", options: ["Curve", "Straight line", "Circle", "Series of unconnected dots"], correctAnswer: 1, explanation: "Constant acceleration means a constant rate of change of velocity, which graphs as a straight line." },
  { id: 50, question: "Which statement correctly describes the relationship between rest and motion?", options: ["An object is either always at rest or always in motion, regardless of reference point", "Rest and motion are relative, depending on the chosen reference point", "Only objects on Earth can be considered at rest", "Motion is only possible in a straight line"], correctAnswer: 1, explanation: "Whether an object is 'at rest' or 'in motion' depends entirely on the reference point chosen -- rest and motion are always relative, never absolute." },
];
