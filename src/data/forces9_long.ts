import type { LongQuestion, CompetencyQuestion } from "../types-custom";

// ── LONG ANSWER QUESTIONS (5 marks each) ──
export const FORCES9_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "State Newton's first law of motion. Explain what it means when the net force on an object is zero, give two everyday examples, and explain what inertia is.",
    markingScheme: ["Statement of the first law -- 1 mark", "Meaning of zero net force: no change in velocity, acceleration is zero -- 1 mark", "Everyday example 1 (box pushed with a force equal to friction) -- 1 mark", "Everyday example 2 (passengers in a bus that brakes suddenly) -- 1 mark", "Meaning of inertia -- 1 mark"],
    answerParts: [
      { part: "Statement", text: "An object at rest remains at rest, and an object in motion continues to move with a constant velocity, unless a net force acts upon it." },
      { part: "Meaning of zero net force", text: "If the net force on an object is zero, the object cannot start moving and cannot change its velocity. So its acceleration is zero. Constant velocity means that neither the speed nor the direction changes, so the object moves in a straight line at the same speed." },
      { part: "Example 1: pushing a box", text: "A person pushes a moving box forward with a force equal to the force of friction. The two forces are equal and opposite, so they balance. The net force is zero, and the box keeps moving with the same velocity." },
      { part: "Example 2: bus braking", text: "When a moving bus brakes suddenly, the passengers lurch forward. The bus is stopped by a force, but the passengers are not stopped at the same moment. Their bodies tend to keep moving with the old velocity. Similarly, when a bus at rest starts suddenly, passengers fall backwards." },
      { part: "Inertia", text: "Isaac Newton used the word inertia for the tendency of an object to resist any change in its state of rest or of uniform motion. An object needs a net force to change its state. That is why the first law is also called the law of inertia." }
    ]
  },
  {
    id: 2,
    question: "State Newton's second law of motion and write it as an equation. Explain the meaning of each term, the direction of the acceleration, and give two everyday examples, one showing the effect of force and one showing the effect of mass.",
    markingScheme: ["Statement of the second law -- 1 mark", "Equation a = F/m or F = ma with meaning of each symbol -- 1 mark", "Direction of acceleration is along the net force -- 1 mark", "Example showing acceleration grows with force -- 1 mark", "Example showing acceleration falls with mass -- 1 mark"],
    answerParts: [
      { part: "Statement", text: "When a net force acts on an object, the object accelerates in the direction of the net force. The acceleration is proportional to the net force and inversely proportional to the mass of the object." },
      { part: "Equation", text: "a = F/m, or F = ma. Here F is the net force in newton (N), m is the mass in kilogram (kg) and a is the acceleration in m/s²." },
      { part: "Direction", text: "The acceleration always points in the same direction as the net force. If the net force is along the motion, the object speeds up. If it is opposite to the motion, the object slows down." },
      { part: "Example: effect of force", text: "If you push a ball gently, it starts moving slowly, so the acceleration is small. If you push it hard, it moves away fast, so the acceleration is large. For the same ball, a bigger force gives a bigger acceleration." },
      { part: "Example: effect of mass", text: "With the same push, an empty cart speeds up quickly but a cart loaded with heavy things speeds up slowly. Two children of different mass on identical swings need different pushes for the same start: the heavier child needs a larger force." }
    ]
  },
  {
    id: 3,
    question: "State Newton's third law of motion. Explain why the two forces of an action-reaction pair do not cancel each other, and why they may still produce different accelerations. Give suitable examples.",
    markingScheme: ["Statement of the third law -- 1 mark", "Forces always come in pairs, equal and opposite -- 1 mark", "The two forces act on different objects so they do not cancel -- 1 mark", "Example of a pair (kicking a ball or pushing a wall) -- 1 mark", "Equal forces but different accelerations because masses differ, with example -- 1 mark"],
    answerParts: [
      { part: "Statement", text: "Whenever one object exerts a force on a second object, the second object simultaneously exerts an equal and opposite force on the first object." },
      { part: "Forces come in pairs", text: "A single force never exists alone. There are always two forces, equal in size and opposite in direction. The law is true for contact forces like a push and also for non-contact forces like magnetic, electric and gravitational forces." },
      { part: "Why they do not cancel", text: "The two forces of the pair act on two different objects. Forces cancel each other only when they act on the same object. So an action-reaction pair can never be balanced forces." },
      { part: "Example", text: "When you kick a ball, your foot pushes the ball forward, and the ball pushes your foot backward with an equal force. You can feel the force of the ball on your foot." },
      { part: "Different accelerations", text: "Equal forces do not always give equal accelerations, because a = F/m and the two objects may have different masses. When a girl on a wheeled chair pushes a heavy table, the forces on both are equal, but the light chair with the girl moves more than the heavy table." }
    ]
  },
  {
    id: 4,
    question: "Describe the activity in which a stack of four coins is pushed by a stretched rubber band on different surfaces. What do you observe, and what does it show about the force of friction?",
    markingScheme: ["Setup: coins stacked and taped, rubber band stretched to the same mark C each time -- 1 mark", "Why the coins start moving (rubber band force larger than friction, net force forward) -- 1 mark", "Why the coins slow down and stop after release (only friction acts) -- 1 mark", "Observation: distance is different on wooden, laminated and marble surfaces -- 1 mark", "Conclusion: friction depends on the surface, less friction means a longer distance -- 1 mark"],
    answerParts: [
      { part: "Setup", text: "Four coins are stacked and fixed together with tape. A rubber band is held between the finger and thumb, and the stack is pushed back till the band is stretched to a fixed mark C. The stack is then released. The same stretch is used on a wooden table top, a laminated table top and a polished marble or tiled floor." },
      { part: "Why the coins start moving", text: "Before release the stack is at rest, so the forces on it are balanced. After release, the stretched rubber band pushes the stack forward with a force larger than friction. So there is a net force forward, and the stack gets an acceleration." },
      { part: "Why the coins stop", text: "As soon as the stack leaves the rubber band, the band no longer acts on it. Only the force of friction remains, and it acts opposite to the motion. It slowly reduces the velocity to zero and the stack stops." },
      { part: "Observation", text: "The stretch of the rubber band is the same every time, but the distance travelled is different. The stack travels the shortest distance on the wooden table, a longer distance on the laminated top and the longest distance on the polished marble or tiles. On the smoother surface, the velocity falls more slowly." },
      { part: "Conclusion", text: "Since the starting push was the same but the distances were different, the force of friction must be different on different surfaces. The smaller the force of friction, the more slowly the velocity decreases and the farther the stack travels." }
    ]
  },
  {
    id: 5,
    question: "Describe the activity in which a wooden block is pulled with a spring balance on different surfaces. What does the reading of the spring balance tell us? How does this activity support the coin activity?",
    markingScheme: ["Setup: spring balance in horizontal position, zero error checked, block hooked to it -- 1 mark", "Procedure: pull with slowly increasing force and note the reading when the block just moves -- 1 mark", "Meaning: velocity not changing means net force is zero, so the reading equals the friction -- 1 mark", "Observation: readings are different on different surfaces -- 1 mark", "Link: smallest reading on the surface where the coins went farthest, and largest where they went least -- 1 mark"],
    answerParts: [
      { part: "Setup", text: "A spring balance is placed horizontally on a surface and its reading is checked to be zero. A wooden block is attached to its hook. The same four surfaces of the coin activity are used one by one." },
      { part: "Procedure", text: "The free end of the spring balance is pulled with a slowly increasing force. The reading is noted at the moment the block just starts to move. The same steps are repeated on every surface." },
      { part: "What the reading means", text: "Two forces act on the block along the surface: the pull by the spring and the force of friction. When the block moves with a steady velocity, its velocity is not changing, so the net force is zero. Then the pull of the spring is equal to the force of friction. So the reading gives an approximate measure of the friction between the block and the surface." },
      { part: "Observation", text: "The readings are not the same on the four surfaces. A small reading means a small force of friction and a large reading means a large force of friction." },
      { part: "Link with the coin activity", text: "The reading is smallest on the surface where the stack of coins travelled the farthest, and largest on the surface where it travelled the least. Together, the two activities show that friction depends on the surfaces in contact, and less friction means a slower fall in velocity and a longer distance." }
    ]
  },
  {
    id: 6,
    question: "Describe the thought experiment of an object moving on a floor with zero friction. What would happen to its velocity? Explain Galileo's idea and how it leads to Newton's first law.",
    markingScheme: ["Why a thought experiment is used (zero friction cannot be made in real life) -- 1 mark", "In the coin activity, less friction gives less loss of velocity and more distance -- 1 mark", "With zero friction, no force acts, so velocity never decreases and the object never stops -- 1 mark", "Galileo's idea: without any hindrance, motion on a horizontal plane goes on forever -- 1 mark", "Conclusion: no force is needed to keep an object moving at constant velocity; a force is needed only to change it -- 1 mark"],
    answerParts: [
      { part: "Thought experiment", text: "A thought experiment is done in the mind when the conditions are too hard to make in real life. It is not possible to find a surface that has exactly zero friction, so we imagine one." },
      { part: "The trend seen in the coin activity", text: "On rough surfaces the coins lose their velocity fast and stop soon. On smoother surfaces they lose their velocity slowly and go farther. As the surface gets smoother, the friction gets smaller and the distance keeps growing." },
      { part: "Zero friction", text: "Imagine the same push on a very smooth object on a perfectly smooth horizontal floor. After it leaves the rubber band, no force acts on it in the direction of motion. Its velocity will not decrease. It will keep moving forever with the same velocity in a straight line." },
      { part: "Galileo's idea", text: "In the 17th century, Galileo Galilei argued in this way. For ages people had thought that a force is needed to keep an object moving. Galileo said that objects seem to stop only because friction and other hindrances act on them. If all hindrances are removed, an object moving along a horizontal plane will continue to move indefinitely." },
      { part: "Conclusion", text: "A force is not needed to keep an object moving with constant velocity. A force is needed only to start it, to stop it, or to change its speed or direction. This idea became Newton's first law of motion." }
    ]
  },
  {
    id: 7,
    question: "With the help of the cart and hanging cup activities, show how the acceleration depends on the force and on the mass. Write the second law as F = ma and define one newton.",
    markingScheme: ["Setup: cart pulled by a thread from a cup over a pulley -- 1 mark", "Doubling the force (cup mass) on the same cart increases the acceleration (from s = 1/2 a t², a1/a2 = (T2/T1)²) -- 1 mark", "Doubling the mass of the cart with the same force decreases the acceleration -- 1 mark", "Result a = F/m, that is F = ma -- 1 mark", "Definition of 1 N: force that gives 1 m/s² to 1 kg -- 1 mark"],
    answerParts: [
      { part: "Setup", text: "A light cart with wheels is joined by a thread to a paper cup. The thread passes over a pulley at the edge of a table. Coins are put in the cup. The weight of the cup with its coins pulls the cart with a constant force. The time taken by the cart to cover the same distance s from rest is noted using a slow-motion video." },
      { part: "Effect of force", text: "In the first run the time is T1 and the acceleration is a1. The mass in the cup is doubled and the time is T2, with acceleration a2. The cart starts from rest (u = 0) and covers the same distance in both runs, so s = 1/2 a1 T1² = 1/2 a2 T2². This gives a1/a2 = T2²/T1². The cart takes less time when the force is doubled, so its acceleration is more. For the same mass, the acceleration increases with the force." },
      { part: "Effect of mass", text: "The cup and coins are kept the same, and the mass of the cart is doubled by adding objects. The cart now takes more time, and the acceleration is less. For the same force, a larger mass has a smaller acceleration." },
      { part: "Result", text: "Acceleration is proportional to the force and inversely proportional to the mass: a = F/m, or F = ma. In the real activity the acceleration may not double exactly, because of measurement errors and the friction of the wheels." },
      { part: "Definition of one newton", text: "If m = 1 kg and a = 1 m/s², then F = 1 kg x 1 m/s² = 1 kg m/s² = 1 N. One newton is the force that produces an acceleration of 1 m/s² in an object of mass 1 kg." }
    ]
  },
  {
    id: 8,
    question: "What is meant by the acceleration due to gravity (g)? Show that the weight of an object is F = mg. Find the weight of a barbell of total mass 30 kg and the upward force a weightlifter must apply to hold it steady. Take g = 10 m/s².",
    markingScheme: ["Meaning of g and its unit -- 1 mark", "Weight is the gravitational force; F = mg from F = ma -- 1 mark", "g is about 9.8 m/s² (10 m/s² for estimates) and does not depend on mass -- 1 mark", "Weight of the barbell = 300 N -- 1 mark", "Steady holding means balanced forces, so the upward force is 300 N -- 1 mark"],
    answerParts: [
      { part: "Meaning of g", text: "When an object falls towards the Earth, it gets an acceleration because of the gravitational pull of the Earth. This is called the acceleration due to gravity and it is written as g. Its unit is m/s², the same as any acceleration." },
      { part: "Formula for weight", text: "The weight of an object is the gravitational force by the Earth on it. Using F = ma with a = g, the weight is F = mg. It is a force, so it is measured in newton." },
      { part: "Value of g", text: "Near the Earth's surface, g = 9.8 m/s², and it is nearly constant. For quick calculations, we take g = 10 m/s². The value of g does not depend on the mass of the object." },
      { part: "Given and working", text: "Given: m = 30 kg, g = 10 m/s². Formula: F = mg. Working: F = 30 x 10 = 300 N, acting downwards." },
      { part: "Holding steady", text: "The barbell is not moving, so the net force on it is zero. The upward force of the weightlifter must be equal to the weight. Answer: the weight is 300 N and she must apply 300 N upwards. (With g = 9.8 the answer would be 294 N.)" }
    ]
  },
  {
    id: 9,
    question: "Explain, using F = ma, (a) why a fielder pulls the hands back while catching a fast cricket ball, (b) why airbags are used in cars, and (c) why a coconut breaks when it is dropped on a hard surface. A ball of mass 0.15 kg moving at 20 m/s is stopped in 0.01 s by stiff hands and in 0.1 s by hands pulled back. Find the force in each case.",
    markingScheme: ["Cricket catch: pulling back increases the stopping time, so acceleration and force are smaller -- 1 mark", "Airbag: it increases the time of the hit, so the force on the person is smaller -- 1 mark", "Coconut: it stops in a very short time, so the ground exerts a very large force -- 1 mark", "Force with stiff hands (300 N) with working -- 1 mark", "Force with hands pulled back (30 N) and comparison -- 1 mark"],
    answerParts: [
      { part: "(a) Cricket catch", text: "The ball must lose its velocity to become zero. If the fielder pulls the hands back, the time taken to stop the ball becomes longer. The acceleration (change in velocity divided by time) becomes smaller, so by F = ma a smaller force is needed. This also saves the fielder from injury." },
      { part: "(b) Airbag", text: "In a crash the car stops suddenly. The airbag inflates quickly into a soft cushion. The head and chest of the passenger push into the bag instead of the hard steering wheel, so the time of stopping is longer. The acceleration is smaller, and the force on the person is smaller. This lowers the risk of serious injury, especially with a seat belt." },
      { part: "(c) Coconut", text: "The coconut hits the ground at high velocity and stops in a very short time. Its velocity changes very quickly, so the acceleration is very large. The ground must apply a very large force on it, and this large force breaks the shell." },
      { part: "Numerical: stiff hands", text: "Given: m = 0.15 kg, u = 20 m/s, v = 0, t = 0.01 s. Formula: a = (v - u)/t and F = ma. Working: a = (0 - 20)/0.01 = -2000 m/s². F = 0.15 x 2000 = 300 N. The magnitude of the force is 300 N." },
      { part: "Numerical: hands pulled back", text: "Given: t = 0.1 s. Working: a = (0 - 20)/0.1 = -200 m/s². F = 0.15 x 200 = 30 N. Answer: the force is 30 N, which is ten times smaller, because the stopping time is ten times longer." }
    ]
  },
  {
    id: 10,
    question: "Describe the chair-and-table activity and the two-spring-balances activity. What does each of them show about Newton's third law?",
    markingScheme: ["Chair and table: sit on a wheeled chair with feet up and push a heavy table forward; the chair moves backwards -- 1 mark", "Pulling the table towards you moves the chair forward; conclusion that the table pushes or pulls back on you -- 1 mark", "Two spring balances hooked together, one end fixed, the other pulled by hand -- 1 mark", "Both readings are always equal, even when the pull is changed -- 1 mark", "Conclusion: the forces are equal in size and opposite in direction, which is the third law -- 1 mark"],
    answerParts: [
      { part: "Chair and table: pushing", text: "A person sits on a wheeled chair with the legs raised above the floor, and pushes a large heavy table away with both hands. The person and the chair move backwards, in the direction opposite to the push." },
      { part: "Chair and table: pulling", text: "Now the person pulls the table towards herself. The chair moves forward towards the table. In both cases, the table applies a force on the person in the direction opposite to the force the person applies on the table. That is why the person moves." },
      { part: "Two spring balances: setup", text: "Two identical spring balances are placed on a table and joined hook to hook. The free end of one is fixed to a wall or held still. The free end of the other is pulled by hand. We first guess that both readings will be equal." },
      { part: "Two spring balances: observation", text: "The pull is repeated many times with different sizes of force. Every time, the readings of both scales are the same. Each balance measures the force the other one applies on it." },
      { part: "Conclusion", text: "The two forces are equal in magnitude and opposite in direction, and they occur at the same time. This is the third law: if the first object exerts a force on the second, the second object exerts an equal and opposite force on the first." }
    ]
  },
  {
    id: 11,
    question: "Explain with Newton's third law (a) how we walk, (b) how a canoe moves forward, (c) how a person climbs a coconut tree, and (d) how a rocket lifts off. How did the Chandrayaan-3 lander use the same idea to slow down?",
    markingScheme: ["Walking: the foot pushes the ground backwards, the ground (friction) pushes the person forward -- 1 mark", "Canoe: paddle pushes water backwards, water pushes the paddle and canoe forward -- 1 mark", "Tree climbing: legs push down on the trunk, friction pushes the person up; smooth trunk is harder -- 1 mark", "Rocket: exhaust gas is pushed down, the gas pushes the rocket up with force larger than its weight -- 1 mark", "Chandrayaan-3: engine fired in the direction of motion, exhaust force opposes motion and slows the lander -- 1 mark"],
    answerParts: [
      { part: "(a) Walking", text: "While walking, the foot pushes the ground backwards. The ground pushes the foot forward with an equal force. This force is the force of friction, so here friction helps us to move. On a wet or icy floor there is very little friction, so the foot slips." },
      { part: "(b) Canoe", text: "The canoeist pushes the water backwards with the paddle. The water pushes the paddle forward with an equal force. The two forces act on different objects, the paddle and the water, so they do not cancel. The force on the paddle moves the canoe forward. A harder push on the water gives a larger forward force and the velocity increases." },
      { part: "(c) Climbing a coconut tree", text: "The legs of the climber push down against the trunk. The friction between the trunk and the legs pushes the person upward with an equal force. A smooth trunk has less friction, so it is harder to climb." },
      { part: "(d) Rocket", text: "The rocket engine makes hot gas and throws it out downwards. The gas pushes the rocket upward with an equal and opposite force. When this upward force is larger than the weight of the rocket, the net force is upward and the rocket lifts off. It works like the balloon rocket, where air rushes out and the balloon moves the other way." },
      { part: "Chandrayaan-3 lander", text: "When the Vikram lander fired its engine in the direction of its motion, the exhaust gas was thrown forward. The gas pushed the lander backwards with an equal force, opposite to its motion. So the lander slowed down and reached the velocity needed for a soft landing near the south pole of the Moon." }
    ]
  },
  {
    id: 12,
    question: "(a) The Earth and a falling fruit pull each other with equal forces. Why does only the fruit seem to move? (b) A gun of mass 5 kg fires a bullet of mass 0.1 kg with a force of 2 N. Find the initial accelerations of the bullet and the gun. Why is the gun's recoil so small?",
    markingScheme: ["Earth and fruit pull each other with equal and opposite forces -- 1 mark", "The Earth's mass is huge, so its acceleration a = F/m is too small to notice -- 1 mark", "Recoil force on the gun is 2 N by the third law -- 1 mark", "Acceleration of the bullet 20 m/s² and of the gun 0.4 m/s² with working -- 1 mark", "Reason: equal forces but different masses give different accelerations -- 1 mark"],
    answerParts: [
      { part: "(a) Equal forces", text: "By Newton's third law, the Earth pulls the fruit with a force, and the fruit pulls the Earth with an equal and opposite force." },
      { part: "(a) Why only the fruit moves", text: "The mass of the Earth is extremely large compared with the fruit. The acceleration of the Earth is a = F/m, which is extremely small. Its effect is too small to be noticed. The fruit has a small mass, so it gets a large acceleration and clearly falls." },
      { part: "(b) Given and third law", text: "Given: mass of bullet = 0.1 kg, mass of gun = 5 kg, force on the bullet = 2 N. By the third law, the recoil force on the gun is also 2 N, in the opposite direction." },
      { part: "(b) Working", text: "Formula: a = F/m. Bullet: a = 2/0.1 = 20 m/s². Gun: a = 2/5 = 0.4 m/s². Answer: the initial acceleration of the bullet is 20 m/s² and that of the gun is 0.4 m/s²." },
      { part: "(b) Reason", text: "The forces on the bullet and the gun are equal in size, but their masses are different. The gun is 50 times heavier than the bullet, so its acceleration is 50 times smaller. That is why the recoil is small and slow. Equal forces do not, in general, give equal accelerations." }
    ]
  },
  {
    id: 13,
    question: "Explain balanced and unbalanced forces with the example of tug of war. Two forces of 10 N and 6 N act on a block on a table in three ways: (a) both to the right, (b) 10 N to the right and 6 N to the left, (c) 6 N to the right and 10 N to the left. Find the net force in each case.",
    markingScheme: ["Balanced forces: equal and opposite, net force zero, rope does not move -- 1 mark", "Unbalanced forces: net force is not zero, motion is towards the larger force -- 1 mark", "Case (a): 16 N to the right -- 1 mark", "Case (b): 4 N to the right -- 1 mark", "Case (c): 4 N to the left -- 1 mark"],
    answerParts: [
      { part: "Balanced forces", text: "In tug of war, if both teams pull the rope with equal force in opposite directions, the rope does not move. Two forces that are equal in size and opposite in direction are called balanced forces. Their net force is zero." },
      { part: "Unbalanced forces", text: "If one team pulls harder, the forces are no longer balanced. A non-zero net force acts on the rope and it moves in the direction of the larger force. If two forces act in opposite directions, the net force is their difference. If they act in the same direction, the net force is their sum." },
      { part: "Case (a): same direction", text: "Given: 10 N and 6 N, both to the right. Working: net force = 10 + 6 = 16 N. Answer: 16 N towards the right." },
      { part: "Case (b): opposite, larger to the right", text: "Given: 10 N to the right and 6 N to the left. Working: net force = 10 - 6 = 4 N. Answer: 4 N towards the right." },
      { part: "Case (c): opposite, larger to the left", text: "Given: 6 N to the right and 10 N to the left. Working: net force = 10 - 6 = 4 N. Answer: 4 N towards the left, the direction of the larger force." }
    ]
  },
  {
    id: 14,
    question: "Two boxes of masses m1 = 6 kg and m2 = 4 kg are joined by a light string on a frictionless horizontal table. A force F = 50 N pulls Box 1 in the forward direction, and Box 2 is behind it. Using the system approach, find the acceleration of the boxes and the tension in the string. Say which forces are internal and which are external.",
    markingScheme: ["Treat both boxes and the string as one system of mass m1 + m2 -- 1 mark", "Tension is an internal force, F is the external force -- 1 mark", "Acceleration a = F/(m1 + m2) = 5 m/s² -- 1 mark", "Tension from Box 2: T = m2 a = 20 N -- 1 mark", "Check with Box 1: F - T = m1 a -- 1 mark"],
    answerParts: [
      { part: "System approach", text: "We treat the two boxes and the string as one single object. Its mass is m1 + m2 = 6 + 4 = 10 kg. Such a system moves like a single object of this mass." },
      { part: "Internal and external forces", text: "The tension T acts between the boxes, on both of them, and by the third law the two pulls are equal and opposite. So T is an internal force and can be ignored for the whole system. The pull F = 50 N comes from outside, so it is the external force. The weights are balanced by the normal forces of the table." },
      { part: "Acceleration", text: "Formula: a = F/(m1 + m2). Working: a = 50/10 = 5 m/s². Answer: both boxes have an acceleration of 5 m/s² in the direction of F." },
      { part: "Tension", text: "The only force on Box 2 is the tension T, and it moves with a = 5 m/s². Formula: T = m2 a. Working: T = 4 x 5 = 20 N. Answer: the tension is 20 N." },
      { part: "Check with Box 1", text: "On Box 1 the force F acts forward and T acts backward. Net force = 50 - 20 = 30 N. m1 x a = 6 x 5 = 30 N. Both agree, so the answers are correct." }
    ]
  },
  {
    id: 15,
    question: "A sports car of mass 1500 kg moves towards the east. Its velocity-time graph is a straight line rising from 0 to 10 m/s between 0 s and 5 s, a horizontal straight line at 10 m/s between 5 s and 10 s, and a straight line falling from 10 m/s to 0 between 10 s and 15 s. Find the force acting on the car in each of the three stages.",
    markingScheme: ["Stage 1: acceleration from v = u + at is 2 m/s² -- 1 mark", "Stage 1: force = 3000 N towards the east -- 1 mark", "Stage 2: constant velocity, so acceleration and net force are zero -- 1 mark", "Stage 3: acceleration = -2 m/s² -- 1 mark", "Stage 3: force = -3000 N, that is 3000 N towards the west -- 1 mark"],
    answerParts: [
      { part: "Stage 1 (0 s to 5 s): acceleration", text: "Given: m = 1500 kg, u = 0, v = 10 m/s, t = 5 s. The line is straight and inclined, so the acceleration is constant. Formula: v = u + at. Working: 10 = 0 + a x 5, so a = 2 m/s²." },
      { part: "Stage 1: force", text: "Formula: F = ma. Working: F = 1500 x 2 = 3000 N. Answer: 3000 N towards the east." },
      { part: "Stage 2 (5 s to 10 s)", text: "The line is horizontal, so the velocity stays at 10 m/s. The acceleration is zero, and F = ma = 1500 x 0 = 0. Answer: no net force acts on the car in this stage." },
      { part: "Stage 3 (10 s to 15 s): acceleration", text: "Given: u = 10 m/s, v = 0, t = 5 s. Formula: v = u + at. Working: 0 = 10 + a x 5, so a = -2 m/s². The negative sign shows the acceleration is opposite to the motion." },
      { part: "Stage 3: force", text: "F = ma = 1500 x (-2) = -3000 N. Answer: the force is 3000 N acting towards the west, opposite to the motion, so the car slows down and stops." }
    ]
  },
  {
    id: 16,
    question: "A bullet of mass 50 g moving at 100 m/s enters a heavy wooden block and stops after going 50 cm into it. Assuming constant acceleration, find the stopping force on the bullet.",
    markingScheme: ["Write the given data in SI units (0.05 kg, 0.5 m) -- 1 mark", "Choose the formula v² = u² + 2as -- 1 mark", "Substitute and find a = -10000 m/s² -- 1 mark", "Use F = ma -- 1 mark", "Answer F = 500 N, opposite to the motion -- 1 mark"],
    answerParts: [
      { part: "Given", text: "m = 50 g = 0.05 kg, u = 100 m/s, v = 0 (the bullet stops), s = 50 cm = 0.5 m. To find: the stopping force F." },
      { part: "Formula", text: "Since the time is not given, use v² = u² + 2as to find the acceleration. Then use F = ma." },
      { part: "Working: acceleration", text: "0 = (100)² + 2 x a x 0.5. So 0 = 10000 + a, and a = -10000 m/s². The negative sign means the bullet slows down." },
      { part: "Working: force", text: "F = ma = 0.05 x (-10000) = -500 N. The negative sign shows that the force is opposite to the motion of the bullet." },
      { part: "Answer", text: "The stopping force on the bullet is 500 N, opposite to its direction of motion." }
    ]
  },
  {
    id: 17,
    question: "A footballer takes a penalty kick and the ball leaves the foot at a speed of 108 km/h. The average force on the ball is 800 N and the mass of the ball is 0.4 kg. Find the time for which the foot is in contact with the ball. Assume the ball starts from rest.",
    markingScheme: ["Convert 108 km/h to 30 m/s -- 1 mark", "Write the given data and the formulae F = ma and v = u + at -- 1 mark", "Acceleration a = F/m = 2000 m/s² -- 1 mark", "Substitute in v = u + at -- 1 mark", "Answer t = 0.015 s -- 1 mark"],
    answerParts: [
      { part: "Given", text: "Speed after the kick v = 108 km/h = 108 x 1000/3600 = 30 m/s. Initial speed u = 0. Force F = 800 N. Mass m = 0.4 kg. To find: the contact time t." },
      { part: "Formula", text: "F = ma, so a = F/m. Then v = u + at, so t = (v - u)/a." },
      { part: "Working: acceleration", text: "a = 800/0.4 = 2000 m/s²." },
      { part: "Working: time", text: "30 = 0 + 2000 x t, so t = 30/2000 = 0.015 s." },
      { part: "Answer", text: "The foot is in contact with the ball for 0.015 s, which is 15 milliseconds. This is a very short time, so a large force is needed to give the ball such a large speed." }
    ]
  },
  {
    id: 18,
    question: "An object of mass 2 kg moves at a constant velocity of 10 m/s. It enters a rough patch where the force of friction on it is 7 N. At the same time, an extra constant force of 3 N is applied against its motion. How far does the object travel on the rough patch before it stops?",
    markingScheme: ["Before the patch the velocity is constant, so net force is zero (first law) -- 1 mark", "Total opposing force = 7 + 3 = 10 N -- 1 mark", "Deceleration a = F/m = 5 m/s² -- 1 mark", "Use v² = u² + 2as with v = 0 -- 1 mark", "Distance s = 10 m -- 1 mark"],
    answerParts: [
      { part: "Given", text: "m = 2 kg, u = 10 m/s, v = 0 at the end. Friction = 7 N and extra force = 3 N, both opposite to the motion. To find: the distance s." },
      { part: "Net force", text: "Before the patch, the velocity is constant, so the net force is zero. On the patch, the two forces act in the same direction (against the motion), so they add up. Net force = 7 + 3 = 10 N, opposite to the motion." },
      { part: "Acceleration", text: "a = F/m = 10/2 = 5 m/s². It is opposite to the velocity, so a = -5 m/s²." },
      { part: "Distance", text: "Formula: v² = u² + 2as. Working: 0 = (10)² + 2 x (-5) x s, so 0 = 100 - 10s, and s = 100/10 = 10 m." },
      { part: "Answer", text: "The object travels 10 m on the rough patch before coming to rest. (Time taken = u/a = 10/5 = 2 s.)" }
    ]
  },
  {
    id: 19,
    question: "A student pushes a stationary block of mass 25 kg on a horizontal floor. The largest force of friction opposing the motion is 50 N. Find the acceleration and the displacement in 2 s if the student pushes with a constant force of (i) 50 N and (ii) 55 N.",
    markingScheme: ["Case (i): forces balance, net force zero, the block stays at rest -- 1 mark", "Case (ii): net force = 55 - 50 = 5 N -- 1 mark", "Acceleration a = F/m = 0.2 m/s² -- 1 mark", "Displacement from s = ut + 1/2 at² -- 1 mark", "Answer s = 0.4 m in the forward direction -- 1 mark"],
    answerParts: [
      { part: "Given", text: "m = 25 kg, maximum friction = 50 N, u = 0, t = 2 s." },
      { part: "Case (i): push of 50 N", text: "The push is equal to the friction. The two forces are balanced, so the net force is zero. By the first law, the block stays at rest. Acceleration = 0 and displacement = 0." },
      { part: "Case (ii): net force", text: "The push is 55 N forward and friction is 50 N backward. Net force = 55 - 50 = 5 N forward." },
      { part: "Case (ii): acceleration", text: "Formula: a = F/m. Working: a = 5/25 = 0.2 m/s²." },
      { part: "Case (ii): displacement", text: "Formula: s = ut + 1/2 at². Working: s = 0 x 2 + 1/2 x 0.2 x (2)² = 0.1 x 4 = 0.4 m. Answer: in case (ii) the acceleration is 0.2 m/s² and the block moves 0.4 m forward in 2 s." }
    ]
  },
  {
    id: 20,
    question: "A tractor pulls a harrow of mass m1 with a net force F and gets an acceleration a1. With the same force F it pulls a trolley of mass m2 and gets an acceleration a2. Find the acceleration when the same tractor pulls the trolley with the harrow placed on it, using the same force F. Ignore friction. Then find the answer if a1 = 3 m/s² and a2 = 6 m/s².",
    markingScheme: ["Express m1 = F/a1 and m2 = F/a2 -- 1 mark", "Total mass when the harrow is on the trolley is m1 + m2 -- 1 mark", "a = F/(m1 + m2) and substitution -- 1 mark", "Simplify to a = a1 a2/(a1 + a2) -- 1 mark", "Numerical check: a = 2 m/s² -- 1 mark"],
    answerParts: [
      { part: "Masses from the second law", text: "From a = F/m we get m = F/a. So m1 = F/a1 and m2 = F/a2." },
      { part: "Total mass", text: "When the harrow is placed on the trolley, the tractor pulls both together. The total mass is m1 + m2 = F/a1 + F/a2." },
      { part: "New acceleration", text: "a = F/(m1 + m2) = F / (F/a1 + F/a2). Taking F common in the bottom, a = 1 / (1/a1 + 1/a2)." },
      { part: "Simplify", text: "1/a1 + 1/a2 = (a2 + a1)/(a1 a2). So a = a1 a2 / (a1 + a2). The force F cancels out." },
      { part: "Numerical check", text: "With a1 = 3 and a2 = 6: a = (3 x 6)/(3 + 6) = 18/9 = 2 m/s². Check with masses: if F = 18 N, then m1 = 6 kg, m2 = 3 kg, total = 9 kg, and a = 18/9 = 2 m/s². The answers agree." }
    ]
  },
  {
    id: 21,
    question: "Solve using F = ma. (a) Find the net force needed to give a car of mass 800 kg an acceleration of 2.5 m/s². (b) Find the force needed to give a 5 kg object an acceleration of 4 m/s². (c) A net force of 60 N gives an acceleration of 1.5 m/s² to an object. Find its mass. (d) A net force of 20 N acts on a 10 kg object and then on a 20 kg object. Find both accelerations and compare them.",
    markingScheme: ["Writing the formulae F = ma, a = F/m and m = F/a with units -- 1 mark", "Part (a): 2000 N -- 1 mark", "Part (b): 20 N -- 1 mark", "Part (c): 40 kg -- 1 mark", "Part (d): 2 m/s² and 1 m/s², with comparison -- 1 mark"],
    answerParts: [
      { part: "Formulae", text: "F = ma gives the force in newton (N) when m is in kg and a is in m/s². Rearranged, a = F/m and m = F/a." },
      { part: "(a)", text: "Given: m = 800 kg, a = 2.5 m/s². Working: F = 800 x 2.5 = 2000 N. Answer: 2000 N." },
      { part: "(b)", text: "Given: m = 5 kg, a = 4 m/s². Working: F = 5 x 4 = 20 N. Answer: 20 N." },
      { part: "(c)", text: "Given: F = 60 N, a = 1.5 m/s². Working: m = F/a = 60/1.5 = 40 kg. Answer: 40 kg." },
      { part: "(d)", text: "Given: F = 20 N. For 10 kg: a = 20/10 = 2 m/s². For 20 kg: a = 20/20 = 1 m/s². Answer: the accelerations are 2 m/s² and 1 m/s². When the mass is doubled for the same force, the acceleration becomes half." }
    ]
  },
  {
    id: 22,
    question: "Friction is not always a nuisance. Explain (a) how friction opposes motion and why we must keep pushing a moving box, (b) how friction helps us to walk, (c) why shoes have grooves and tyres have treads, and (d) why it is risky to walk on a wet polished floor.",
    markingScheme: ["Friction acts opposite to the motion, so a moving object slows down and stops without a push -- 1 mark", "Walking: the foot pushes the ground back, friction pushes us forward -- 1 mark", "Without friction the foot would slip backwards and we would fall -- 1 mark", "Grooves and treads increase friction between the sole or tyre and the ground -- 1 mark", "Wet floors, ice, water or snow have little friction, so walking and driving are risky -- 1 mark"],
    answerParts: [
      { part: "(a) Friction opposes motion", text: "The force of friction acts on an object opposite to its direction of motion. When you stop pushing a box, or stop pedalling a bicycle, friction slows it and brings it to rest. So to keep an object moving, a push equal to friction is needed. If the push is equal to friction, the net force is zero and the velocity stays constant." },
      { part: "(b) Friction helps walking", text: "While walking, the foot tries to slide backwards on the ground. So the friction on the foot acts forward. This is the reaction to the push of the foot on the ground, and it moves us forward." },
      { part: "(b) Without friction", text: "If there were no friction, the foot would slip backwards when we try to push the ground, and we would fall down." },
      { part: "(c) Grooves and treads", text: "The grooves on the soles of shoes and the treads on tyres increase the friction between the shoe or tyre and the ground. This gives a better grip and prevents slipping." },
      { part: "(d) Wet floors", text: "On a wet polished floor, ice, or a road covered with water or snow, the friction is very small. The foot cannot push well, and a vehicle cannot grip the road. So it is difficult to walk and risky to drive." }
    ]
  },
  {
    id: 23,
    question: "What do the position-time and velocity-time graphs look like when the net force on an object is zero? Describe both cases (object at rest, object moving with constant velocity) in words. Also find the net force on a toy car of mass 100 g moving with a constant velocity of 0.5 m/s.",
    markingScheme: ["Object at rest: position-time graph is a horizontal line, velocity-time graph lies along the time axis -- 1 mark", "Constant velocity: position-time graph is a straight inclined line, velocity-time graph is a horizontal line above the axis -- 1 mark", "Reason: zero net force means zero acceleration, so the velocity does not change -- 1 mark", "Everyday example where forces balance (box pushed against friction) -- 1 mark", "Toy car: acceleration is zero, so net force = 0 N -- 1 mark"],
    answerParts: [
      { part: "Object at rest", text: "The position does not change with time, so the position-time graph is a horizontal straight line. The velocity is always zero, so the velocity-time graph is a line lying on the time axis." },
      { part: "Object moving with constant velocity", text: "The position changes by equal amounts in equal times, so the position-time graph is a straight line sloping upward. The velocity is constant, so the velocity-time graph is a horizontal line at a height equal to the velocity." },
      { part: "Reason", text: "Zero net force means zero acceleration (a = F/m = 0). The velocity therefore stays the same, which is what the first law says. The object is either at rest or moving in a straight line at a steady speed." },
      { part: "Example", text: "A person pushes a box so that the push is exactly equal to the friction on it. The two forces balance, and the net force is zero. The box moves along a straight line with the same velocity, and its graphs are the ones for constant velocity." },
      { part: "Toy car", text: "Given: m = 100 g = 0.1 kg, constant velocity 0.5 m/s. The velocity is not changing, so a = 0. Working: F = ma = 0.1 x 0 = 0 N. Answer: the net force on the toy car is zero." }
    ]
  },
  {
    id: 24,
    question: "In a snake boat race practice, 100 oarsmen row a boat of mass 6000 kg. Ninety-five of them row so that the boat goes forward, but by mistake 5 of them row the opposite way. Each oarsman applies a horizontal force of 200 N. Ignore drag. Find the net force on the boat and its acceleration. Explain by the third law how the rowing makes the boat move.",
    markingScheme: ["Third law: oars push water back, water pushes oars and boat forward -- 1 mark", "Forward force 95 x 200 = 19000 N and backward force 5 x 200 = 1000 N -- 1 mark", "Net force = 19000 - 1000 = 18000 N forward -- 1 mark", "Acceleration a = F/m = 3 m/s² -- 1 mark", "Compare with all 100 rowing correctly (20000 N), so the mistake costs 2000 N -- 1 mark"],
    answerParts: [
      { part: "Third law", text: "Each oarsman pushes the water backwards with the oar. The water pushes the oar forward with an equal force. These forces act on different objects, so they do not cancel, and the forward force on the oars pushes the boat forward." },
      { part: "Forces", text: "Given: forward rowers = 95, backward rowers = 5, force of each = 200 N, m = 6000 kg. Forward force = 95 x 200 = 19000 N. Backward force = 5 x 200 = 1000 N." },
      { part: "Net force", text: "The forces act in opposite directions, so we subtract. Net force = 19000 - 1000 = 18000 N, forward." },
      { part: "Acceleration", text: "Formula: a = F/m. Working: a = 18000/6000 = 3 m/s². Answer: the boat has an acceleration of 3 m/s² forward." },
      { part: "Effect of the mistake", text: "If all 100 rowed correctly, the net force would be 100 x 200 = 20000 N. Because of the 5 wrong rowers, it is only 18000 N. So the mistake loses 2000 N of force, and the acceleration would have been 20000/6000, about 3.3 m/s²." }
    ]
  },
  {
    id: 25,
    question: "Use Newton's third law to explain (a) why the boat moves backwards when a sailor jumps forward onto the shore, (b) why a compass needle moves when a bar magnet is brought near but the magnet does not, (c) what happens when a loaded hand cart hits an identical empty hand cart. In (c), the force is 60 N, the loaded cart has a mass of 30 kg and the empty one 10 kg. Find both accelerations.",
    markingScheme: ["Sailor: he pushes the boat back, the boat pushes him forward, so the boat moves backwards -- 1 mark", "Magnet and compass: equal and opposite magnetic forces act (third law holds for non-contact forces) -- 1 mark", "The compass needle is light and free to turn, so it moves, while the heavy or held magnet shows almost no motion -- 1 mark", "Hand carts: both carts push each other with equal force (60 N), whichever is loaded -- 1 mark", "Accelerations 2 m/s² (loaded) and 6 m/s² (empty) with working -- 1 mark"],
    answerParts: [
      { part: "(a) Sailor and boat", text: "The sailor pushes the boat backwards with his feet. The boat pushes the sailor forward with an equal force and he jumps to the shore. The boat gets a force backwards and moves backwards, away from the shore." },
      { part: "(b) Magnet and compass: forces", text: "The bar magnet pushes or pulls the compass needle, and the needle pushes or pulls the magnet with a force equal in size and opposite in direction. The third law works for non-contact forces like magnetic force too." },
      { part: "(b) Why only the needle moves", text: "The needle is very light and is free to turn, so the force gives it a large acceleration and it moves. The bar magnet has a much larger mass and also friction with the table, so the same force gives it too small an acceleration to see." },
      { part: "(c) Equal forces", text: "When the two hand carts collide, they push each other with equal and opposite forces. The loaded cart does not push harder, just because it has more load. Suppose that the force on each is 60 N." },
      { part: "(c) Accelerations", text: "Formula: a = F/m. Loaded cart: a = 60/30 = 2 m/s². Empty cart: a = 60/10 = 6 m/s². Answer: the empty cart changes its velocity three times as fast, because its mass is three times smaller. The forces are equal but the accelerations are not." }
    ]
  }
];

// ── CASE-BASED QUESTIONS (4 marks each: 4 sub-questions of 1 mark) ──
export const FORCES9_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Canoe Race",
    caseDescription: "Meena and her friend Sana are in a canoe race. Meena paddles alone in a canoe. The canoe and Meena together have a mass of 100 kg. She pushes the water backwards and the net forward force on the canoe is 200 N. Ignore drag. In the next race, Sana sits in the same canoe. Sana has a mass of 100 kg too, and Meena pushes with the same force.",
    subQuestions: [
      { question: "Which force makes the canoe move forward?", options: ["The force of the paddle on the water", "The force of the water on the paddle", "The weight of the canoe", "The force of Meena's hands on the canoe"], correctIndex: 1, answer: "The force of the water on the paddle", explanation: "The paddle pushes the water backwards. By the third law, the water pushes the paddle, and so the canoe, forward with an equal force." },
      { question: "Find the acceleration of the canoe when Meena is alone.", answer: "2 m/s²", explanation: "a = F/m = 200/100 = 2 m/s²." },
      { question: "Find the acceleration when Sana also sits in the canoe and the force stays 200 N.", answer: "1 m/s²", explanation: "The total mass is 100 + 100 = 200 kg. a = 200/200 = 1 m/s². The same force gives half the acceleration for double the mass." },
      { question: "The force of the paddle on the water and the force of the water on the paddle are equal and opposite. Why do they not cancel each other?", answer: "They act on two different objects, the water and the paddle.", explanation: "Only forces that act on the same object can balance each other. Here one force acts on the water and the other acts on the paddle." }
    ]
  },
  {
    id: 2,
    caseTitle: "Pushing a Heavy Box",
    caseDescription: "Ravi is moving a 40 kg box across three floors of a school. He always pushes with a constant force of 100 N along the floor and the box is already moving. On the wooden floor, the friction is 100 N. On the tile floor, the friction is 60 N. On the rough cement floor, the friction is 140 N.",
    subQuestions: [
      { question: "What does the box do on the wooden floor?", options: ["Speeds up", "Slows down", "Moves with a constant velocity", "Stops at once"], correctIndex: 2, answer: "Moves with a constant velocity", explanation: "The push and friction are both 100 N and opposite, so the net force is zero. By the first law, the velocity stays constant." },
      { question: "Find the acceleration of the box on the tile floor.", answer: "1 m/s² in the direction of the push", explanation: "Net force = 100 - 60 = 40 N. a = 40/40 = 1 m/s²." },
      { question: "On the cement floor, the box moves at 4 m/s when Ravi pushes as before. How far does it go before it stops?", answer: "8 m", explanation: "Net force = 140 - 100 = 40 N against the motion, so a = 40/40 = 1 m/s² backwards. Using v² = u² + 2as: 0 = 16 - 2s, so s = 8 m." },
      { question: "Ravi pushes a stack of coins on the same three floors. On which floor will it travel the farthest after leaving his hand, and why?", answer: "On the tile floor, because it has the least friction.", explanation: "Less friction means the velocity falls more slowly, so the object travels a longer distance before it stops." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Bus Brakes Suddenly",
    caseDescription: "A bus of mass 8000 kg is moving at 20 m/s on a straight road. The driver sees a cow and applies the brakes. The bus stops uniformly in 10 s. Passengers standing in the bus feel a push forward. One of them is a boy of mass 50 kg.",
    subQuestions: [
      { question: "Why do the standing passengers lurch forward when the bus stops suddenly?", options: ["The brakes push them forward", "Their bodies tend to keep moving with the old velocity", "The bus pulls them forward", "Gravity pulls them forward"], correctIndex: 1, answer: "Their bodies tend to keep moving with the old velocity", explanation: "This is inertia. The bus is stopped by a force, but the passengers are not, so they keep moving forward." },
      { question: "Find the size of the acceleration of the bus during braking.", answer: "2 m/s² (opposite to the motion)", explanation: "a = (v - u)/t = (0 - 20)/10 = -2 m/s²." },
      { question: "Find the braking force on the bus.", answer: "16000 N", explanation: "F = ma = 8000 x 2 = 16000 N, opposite to the motion." },
      { question: "What force must act on the 50 kg boy so that he stops together with the bus?", answer: "100 N, opposite to the motion", explanation: "He has the same acceleration of 2 m/s². F = 50 x 2 = 100 N. It is given by the handrail, the seat or the floor friction." }
    ]
  },
  {
    id: 4,
    caseTitle: "Catching the Cricket Ball",
    caseDescription: "In a cricket match, a fielder catches a ball of mass 0.16 kg that is moving at 25 m/s. In the first try, the fielder keeps the hands stiff and the ball stops in 0.02 s. In the second try, the fielder pulls the hands back as the ball is caught, and the ball stops in 0.2 s.",
    subQuestions: [
      { question: "Why does a fielder pull the hands back while catching?", options: ["To make the ball go faster", "To increase the time of stopping and so reduce the force", "To increase the mass of the ball", "To increase the velocity of the ball"], correctIndex: 1, answer: "To increase the time of stopping and so reduce the force", explanation: "A longer time means a smaller acceleration, and by F = ma the force on the hands is smaller." },
      { question: "Find the force on the hands when they are stiff (stopping time 0.02 s).", answer: "200 N", explanation: "a = 25/0.02 = 1250 m/s². F = 0.16 x 1250 = 200 N." },
      { question: "Find the force when the hands are pulled back (stopping time 0.2 s).", answer: "20 N", explanation: "a = 25/0.2 = 125 m/s². F = 0.16 x 125 = 20 N." },
      { question: "What would be the force if the stopping time were 0.1 s?", answer: "40 N", explanation: "a = 25/0.1 = 250 m/s². F = 0.16 x 250 = 40 N. Note that the force is inversely proportional to the time." }
    ]
  },
  {
    id: 5,
    caseTitle: "The Car Airbag",
    caseDescription: "A test car hits a wall at 15 m/s. The driver has a mass of 60 kg. Without an airbag, the driver hits the steering wheel and stops in 0.03 s. With an airbag, the head and chest sink into the soft bag and the driver stops in 0.3 s.",
    subQuestions: [
      { question: "How does an airbag reduce injury?", options: ["It increases the speed of the driver", "It increases the time of the stopping, so the force is less", "It increases the mass of the driver", "It removes the force completely"], correctIndex: 1, answer: "It increases the time of the stopping, so the force is less", explanation: "The change in velocity is the same but it happens over a longer time. So the acceleration and the force are smaller." },
      { question: "Find the force on the driver without the airbag.", answer: "30000 N", explanation: "a = 15/0.03 = 500 m/s². F = 60 x 500 = 30000 N." },
      { question: "Find the force on the driver with the airbag.", answer: "3000 N", explanation: "a = 15/0.3 = 50 m/s². F = 60 x 50 = 3000 N." },
      { question: "By what factor does the airbag reduce the force, and why?", answer: "10 times. The stopping time becomes 10 times longer (0.03 s to 0.3 s).", explanation: "For the same change in velocity and the same mass, the force is inversely proportional to the time taken." }
    ]
  },
  {
    id: 6,
    caseTitle: "Cycling and Walking",
    caseDescription: "Arjun sits on his bicycle and wants to move forward without pedalling. He pushes the ground backwards with his feet and moves forward. Later, he walks on a wet polished floor and slips. When he walks normally, his feet push the ground backwards with a horizontal force of 150 N. His mass is 50 kg and we ignore other horizontal forces.",
    subQuestions: [
      { question: "Which force pushes Arjun forward when he pushes the ground backwards with his feet?", options: ["The force of friction from the ground on his feet", "The weight of the bicycle", "The force of air on him", "The force of his hands on the bicycle"], correctIndex: 0, answer: "The force of friction from the ground on his feet", explanation: "By the third law, the ground pushes his feet forward. This force is the friction between the ground and his feet." },
      { question: "How large is the forward force of the ground on Arjun when his feet push back with 150 N?", answer: "150 N", explanation: "Action and reaction are equal in magnitude." },
      { question: "With this force as the only horizontal force, find his acceleration.", answer: "3 m/s²", explanation: "a = F/m = 150/50 = 3 m/s²." },
      { question: "Why did Arjun slip on the wet polished floor?", answer: "The wet floor has very little friction, so it cannot give him a forward push and his foot slides back.", explanation: "Friction helps us to walk. When friction is small, the foot slips backwards." }
    ]
  },
  {
    id: 7,
    caseTitle: "The Fireperson and the Hose",
    caseDescription: "A fireperson of mass 60 kg holds a hose from which water rushes out forward at high speed. To hold the hose steady, she must apply a force of 300 N on it forward. She is standing on a slippery, wet floor where the largest friction on her boots is 240 N.",
    subQuestions: [
      { question: "Why does a fireperson sometimes struggle to hold a hose that has water rushing out?", options: ["The water pushes the hose backwards with an equal force", "The water is very cold", "The hose is very long", "The hose has no mass"], correctIndex: 0, answer: "The water pushes the hose backwards with an equal force", explanation: "The hose pushes the water forward, so the water pushes the hose backwards by the third law." },
      { question: "How large is the backward force of the water on the hose (and on her, through the hose)?", answer: "300 N", explanation: "It is equal and opposite to the force of the hose on the water, which is 300 N here." },
      { question: "On the slippery floor, find the acceleration of the fireperson, taking the net backward force on her as 300 N - 240 N.", answer: "1 m/s² backwards", explanation: "Net force = 300 - 240 = 60 N. a = 60/60 = 1 m/s²." },
      { question: "Suggest one way to stop her from sliding back.", answer: "Wear boots with grooved soles or stand on a rough floor, or let a second person hold her.", explanation: "More friction gives a larger forward force on her, so the net force becomes zero." }
    ]
  },
  {
    id: 8,
    caseTitle: "Rocket Launch and Chandrayaan-3",
    caseDescription: "A small rocket of mass 5000 kg stands on the launch pad. When the engine starts, the hot gas is thrown out downwards and the gas pushes the rocket upwards with a force of 75000 N. Take g = 10 m/s². Later, the Vikram lander of Chandrayaan-3 fired its engine in the direction of its motion while moving above the Moon, in order to slow down.",
    subQuestions: [
      { question: "Which force lifts the rocket off the ground?", options: ["The push of the launch pad on the rocket", "The push of the exhaust gas on the rocket, equal and opposite to the push of the rocket on the gas", "The weight of the rocket", "The push of air on the rocket"], correctIndex: 1, answer: "The push of the exhaust gas on the rocket, equal and opposite to the push of the rocket on the gas", explanation: "This is Newton's third law. The rocket throws gas down and the gas pushes the rocket up." },
      { question: "Find the weight of the rocket.", answer: "50000 N", explanation: "W = mg = 5000 x 10 = 50000 N." },
      { question: "Find the acceleration of the rocket just after lift-off.", answer: "5 m/s² upwards", explanation: "Net force = 75000 - 50000 = 25000 N upward. a = 25000/5000 = 5 m/s²." },
      { question: "In which direction does the exhaust gas push the lander when the engine fires in the direction of its motion, and what is the effect?", answer: "Opposite to its motion, so the lander slows down.", explanation: "The gas is thrown forward, so it pushes the lander backward. This reduces the velocity and helps in a soft landing." }
    ]
  },
  {
    id: 9,
    caseTitle: "The Balloon Rocket at School",
    caseDescription: "In the science club, students tie a straw to an inflated balloon and pass a long thread through the straw. When they release the neck of the balloon, air rushes out of the back and the balloon zooms along the thread. The balloon has a mass of 0.02 kg. The air rushing out gives it a forward force of 0.1 N.",
    subQuestions: [
      { question: "In which direction does the balloon move, compared with the direction in which the air rushes out?", options: ["The same direction", "The opposite direction", "Sideways", "It does not move"], correctIndex: 1, answer: "The opposite direction", explanation: "The balloon pushes the air out, and the air pushes the balloon the other way with an equal force." },
      { question: "Find the acceleration of the balloon.", answer: "5 m/s²", explanation: "a = F/m = 0.1/0.02 = 5 m/s²." },
      { question: "With a bigger inflation the force becomes 0.2 N. What is the new acceleration?", answer: "10 m/s²", explanation: "a = 0.2/0.02 = 10 m/s². Double the force gives double the acceleration for the same mass." },
      { question: "Which real vehicle works on the same idea as the balloon rocket?", answer: "A rocket, which throws hot gas backwards and is pushed forward.", explanation: "Both use the third law: the gas pushed out exerts an equal and opposite force on the vehicle." }
    ]
  },
  {
    id: 10,
    caseTitle: "Tug of War",
    caseDescription: "In a tug of war, Team A has 5 players who each pull with 300 N. Team B has 4 players who each pull with 350 N. The rope and the mud on it have a combined mass of 50 kg, and we take the ground friction on the rope as zero.",
    subQuestions: [
      { question: "When will the rope stay at rest?", options: ["When one team pulls harder", "When the forces of the two teams are balanced", "When the rope is long", "When the rope is heavy"], correctIndex: 1, answer: "When the forces of the two teams are balanced", explanation: "Equal and opposite forces give a net force of zero, and the rope stays at rest." },
      { question: "Find the net force on the rope and its direction.", answer: "100 N towards Team A", explanation: "Team A: 5 x 300 = 1500 N. Team B: 4 x 350 = 1400 N. Net = 1500 - 1400 = 100 N towards Team A." },
      { question: "Find the acceleration of the rope.", answer: "2 m/s²", explanation: "a = F/m = 100/50 = 2 m/s²." },
      { question: "How much extra pull must Team B add so that the forces become balanced?", answer: "100 N", explanation: "Team B needs 1400 + 100 = 1500 N to equal Team A's pull of 1500 N." }
    ]
  },
  {
    id: 11,
    caseTitle: "The Snake Boat Race",
    caseDescription: "In the snake boat race (Vallam Kali) in Kerala, 60 oarsmen row a boat of mass 4200 kg. During practice, 58 oarsmen row so that the boat moves forward, while 2 row the wrong way by mistake. Each oarsman applies a horizontal force of 150 N. Ignore drag and air friction.",
    subQuestions: [
      { question: "How does the rowing push the boat forward?", options: ["The oars push the water backwards and the water pushes the oars forward", "The water pulls the oars backwards", "The air pushes the boat", "The boat pushes the oars"], correctIndex: 0, answer: "The oars push the water backwards and the water pushes the oars forward", explanation: "This is the third law. The equal and opposite force of the water on the oars moves the boat." },
      { question: "Find the net force on the boat.", answer: "8400 N forward", explanation: "Forward = 58 x 150 = 8700 N. Backward = 2 x 150 = 300 N. Net = 8700 - 300 = 8400 N." },
      { question: "Find the acceleration of the boat.", answer: "2 m/s²", explanation: "a = 8400/4200 = 2 m/s²." },
      { question: "If the boat starts from rest, what is its speed after 5 s with this acceleration?", answer: "10 m/s", explanation: "v = u + at = 0 + 2 x 5 = 10 m/s." }
    ]
  },
  {
    id: 12,
    caseTitle: "Climbing the Coconut Tree",
    caseDescription: "Raju, whose mass is 50 kg, climbs a coconut tree. His legs push down against the trunk. He climbs at a steady speed. Once, when he stops and rests, he finds that the friction between his legs and the smooth trunk can give only 400 N. Take g = 10 m/s².",
    subQuestions: [
      { question: "What is the force that pushes Raju upwards while climbing?", options: ["The friction of the trunk on his legs", "The weight of the tree", "The force of the wind", "The push of the coconuts"], correctIndex: 0, answer: "The friction of the trunk on his legs", explanation: "His legs push down on the trunk, and by the third law the friction from the trunk pushes him up with an equal force." },
      { question: "What friction force is needed to hold him steady on the trunk?", answer: "500 N", explanation: "His weight is mg = 50 x 10 = 500 N. For zero net force, the friction must also be 500 N upwards." },
      { question: "If the friction can give only 400 N, find his acceleration.", answer: "2 m/s² downwards", explanation: "Net force = 500 - 400 = 100 N downwards. a = 100/50 = 2 m/s²." },
      { question: "Why is it harder to climb a smooth tree trunk than a rough one?", answer: "A smooth trunk gives less friction, so the upward push on the climber is smaller.", explanation: "The upward push on the climber is the force of friction, and it is less on a smooth surface." }
    ]
  },
  {
    id: 13,
    caseTitle: "Skaters Pushing Each Other",
    caseDescription: "Two skaters stand face to face on smooth ice. Anil has a mass of 40 kg and Bela has a mass of 60 kg. Anil pushes Bela with a force of 120 N. Ignore friction with the ice.",
    subQuestions: [
      { question: "How large is the force with which Bela pushes Anil?", options: ["Zero", "60 N", "120 N", "240 N"], correctIndex: 2, answer: "120 N", explanation: "By the third law, Bela pushes Anil with an equal and opposite force of 120 N." },
      { question: "Find the acceleration of Bela.", answer: "2 m/s²", explanation: "a = F/m = 120/60 = 2 m/s², in the direction of Anil's push." },
      { question: "Find the acceleration of Anil.", answer: "3 m/s² in the opposite direction", explanation: "a = 120/40 = 3 m/s²." },
      { question: "The forces are equal. Why does Anil move faster than Bela?", answer: "Anil has a smaller mass, so the same force gives him a larger acceleration.", explanation: "From a = F/m, for equal forces the lighter person gets the larger acceleration." }
    ]
  },
  {
    id: 14,
    caseTitle: "Two Carts Tied Together",
    caseDescription: "Two toy carts on a smooth table are tied by a light string. Cart 1 has a mass of 3 kg and Cart 2 has a mass of 2 kg. A student pulls Cart 1 with a horizontal force of 20 N, and Cart 2 follows behind on the string.",
    subQuestions: [
      { question: "When we treat both carts as one system, which force is the external force?", options: ["The tension in the string", "The pull of 20 N", "The force of Cart 2 on Cart 1", "The force of Cart 1 on Cart 2"], correctIndex: 1, answer: "The pull of 20 N", explanation: "The pull comes from outside the system. The tension acts between the two carts, so it is an internal force." },
      { question: "Find the acceleration of the carts.", answer: "4 m/s²", explanation: "a = F/(m1 + m2) = 20/(3 + 2) = 4 m/s²." },
      { question: "Find the tension in the string.", answer: "8 N", explanation: "The tension is the only force on Cart 2. T = m2 x a = 2 x 4 = 8 N." },
      { question: "Find the net force on Cart 1 and show that it agrees with F = ma for Cart 1.", answer: "12 N, and 3 x 4 = 12 N", explanation: "Net force on Cart 1 = 20 - 8 = 12 N. m1 x a = 3 x 4 = 12 N, so both agree." }
    ]
  },
  {
    id: 15,
    caseTitle: "The Spring Balance Pulled from Two Sides",
    caseDescription: "Two students, Kavi and Lata, stand on opposite sides of a table. They connect two identical spring balances hook to hook. Kavi holds one balance and Lata pulls the other. First Lata pulls with 12 N and the balances do not move.",
    subQuestions: [
      { question: "What will the reading of each balance be?", options: ["6 N on each", "12 N on each", "24 N on each", "0 N on each"], correctIndex: 1, answer: "12 N on each", explanation: "The balances pull each other with equal and opposite forces, so both show the same reading, 12 N." },
      { question: "What is the net force on the pair of joined balances?", answer: "Zero", explanation: "They are at rest. The pulls of Kavi and Lata are equal and opposite, so the net force is zero." },
      { question: "Which of Newton's laws does the equal reading of both balances show?", answer: "The third law of motion", explanation: "Each balance applies on the other an equal and opposite force." },
      { question: "Lata now pulls with 8 N. What is the pull of Kavi's hand, and what do the balances read?", answer: "Kavi pulls with 8 N and both read 8 N.", explanation: "Since the balances stay at rest, the forces balance. Both the balances show 8 N." }
    ]
  },
  {
    id: 16,
    caseTitle: "Lifting a Bag",
    caseDescription: "Diya holds a bag of mass 5 kg at rest. Then she lifts it by pulling it upward with a constant force of 70 N. Take g = 10 m/s².",
    subQuestions: [
      { question: "What force must her hand apply on the bag to hold it steady?", options: ["5 N", "10 N", "50 N", "70 N"], correctIndex: 2, answer: "50 N", explanation: "The weight is mg = 5 x 10 = 50 N. To keep it steady the upward force must equal the weight, so the net force is zero." },
      { question: "Find the acceleration of the bag when she pulls with 70 N.", answer: "4 m/s² upwards", explanation: "Net force = 70 - 50 = 20 N upwards. a = 20/5 = 4 m/s²." },
      { question: "How far does the bag rise in 1 s, starting from rest?", answer: "2 m", explanation: "s = 1/2 at² = 1/2 x 4 x 1² = 2 m." },
      { question: "What force must she apply to lift the bag at a constant velocity?", answer: "50 N", explanation: "At constant velocity the acceleration is zero, so the net force is zero and the pull equals the weight, 50 N." }
    ]
  },
  {
    id: 17,
    caseTitle: "Shoes with Grooves",
    caseDescription: "Sunil has a mass of 50 kg. To start walking with an acceleration of 1 m/s², he needs a forward force of friction from the floor. On a wet floor, his old smooth-soled shoes can give at most 20 N of friction. His new shoes with grooves on the soles can give at most 80 N on the same floor.",
    subQuestions: [
      { question: "Why do shoes have grooves on their soles?", options: ["To look good", "To increase the friction between the sole and the floor", "To reduce the weight of the shoe", "To reduce the friction so that we can slide"], correctIndex: 1, answer: "To increase the friction between the sole and the floor", explanation: "More friction gives a better grip, and the foot does not slip while pushing the ground." },
      { question: "What forward force does Sunil need to walk off with an acceleration of 1 m/s²?", answer: "50 N", explanation: "F = ma = 50 x 1 = 50 N." },
      { question: "Can he do this with the old smooth shoes? Give a reason.", answer: "No. The old shoes give only 20 N, which is less than the 50 N needed, so his foot slips.", explanation: "The friction is the only forward force that the floor can give. It is too small, so the foot slides backwards." },
      { question: "What is the largest acceleration he can get with the new grooved shoes?", answer: "1.6 m/s²", explanation: "a = F/m = 80/50 = 1.6 m/s²." }
    ]
  },
  {
    id: 18,
    caseTitle: "Sliding or Rolling",
    caseDescription: "A worker pushes a 50 kg crate on a floor with a constant force of 220 N. When the crate slides on the floor, the friction is 200 N. When the same crate is placed on round steel rollers, the friction falls to 20 N. The crate starts from rest.",
    subQuestions: [
      { question: "Which statement is correct about the friction on a rolling object and on a sliding object?", options: ["Rolling friction is much less than sliding friction", "Rolling friction is much more than sliding friction", "They are always equal", "Friction is zero for a rolling object"], correctIndex: 0, answer: "Rolling friction is much less than sliding friction", explanation: "This is why the wheel was such an important invention." },
      { question: "Find the acceleration of the crate when it slides.", answer: "0.4 m/s²", explanation: "Net force = 220 - 200 = 20 N. a = 20/50 = 0.4 m/s²." },
      { question: "Find the acceleration of the crate when it is on the rollers.", answer: "4 m/s²", explanation: "Net force = 220 - 20 = 200 N. a = 200/50 = 4 m/s²." },
      { question: "How many times greater is the acceleration on the rollers than in sliding?", answer: "10 times", explanation: "4 divided by 0.4 is 10. The net force is 10 times larger, while the mass is the same." }
    ]
  },
  {
    id: 19,
    caseTitle: "A Ball on Ice and on Grass",
    caseDescription: "A ball of mass 0.5 kg is kicked so that it starts at 6 m/s along a frozen lake. The friction on the ball is 0.5 N on the ice. When the same ball is kicked at 6 m/s on a grass field, the friction is 3 N. Nothing else acts on the ball along the ground.",
    subQuestions: [
      { question: "Find the deceleration of the ball on the ice.", answer: "1 m/s²", explanation: "a = F/m = 0.5/0.5 = 1 m/s², opposite to the motion." },
      { question: "How far does the ball travel on the ice before it stops?", answer: "18 m", explanation: "v² = u² + 2as gives 0 = 36 - 2 x 1 x s, so s = 18 m." },
      { question: "How far does the ball travel on the grass?", answer: "3 m", explanation: "a = 3/0.5 = 6 m/s². 0 = 36 - 2 x 6 x s, so s = 36/12 = 3 m." },
      { question: "What would happen to the ball on a perfectly smooth ice with zero friction?", options: ["It would stop after 18 m", "It would keep moving forever with the same velocity", "It would speed up", "It would move backwards"], correctIndex: 1, answer: "It would keep moving forever with the same velocity", explanation: "With no net force, the ball keeps its velocity. This was Galileo's idea and Newton's first law." }
    ]
  },
  {
    id: 20,
    caseTitle: "Weighing with a Spring Balance",
    caseDescription: "In a science lab, students use a spring balance marked in newton to measure the pull on objects. They hang a 3 kg object and read the scale. Take g = 10 m/s².",
    subQuestions: [
      { question: "What does the spring balance really measure?", options: ["The mass of the object", "The force acting on its hook", "The volume of the object", "The density of the object"], correctIndex: 1, answer: "The force acting on its hook", explanation: "A spring balance measures the size of the force that pulls on its spring. For a hanging object, this force is its weight." },
      { question: "What is the reading for the 3 kg object?", answer: "30 N", explanation: "Weight = mg = 3 x 10 = 30 N." },
      { question: "Another object gives a reading of 12 N. What is its mass?", answer: "1.2 kg", explanation: "m = F/g = 12/10 = 1.2 kg." },
      { question: "About what mass has a weight of 1 N? Say how it can be felt.", answer: "About 100 g (0.1 kg). A 100 g mass on the palm presses down with about 1 N.", explanation: "m = F/g = 1/10 = 0.1 kg = 100 g. The palm has to push up with about 1 N to hold it." }
    ]
  }
];
