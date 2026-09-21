import type { LongQuestion, CompetencyQuestion } from "../types-custom";

// ── LONG ANSWER QUESTIONS (5 marks each) ──
export const ENERGY9_LONG: LongQuestion[] = [
  {
    id: 1,
    question: "What is the scientific meaning of work? Write the formula, define one joule, and explain with examples when the work done is zero.",
    markingScheme: ["Meaning of work: force applied x displacement in the direction of the force -- 1 mark", "Formula W = F x s with SI unit joule -- 1 mark", "Definition of 1 J = 1 N x 1 m -- 1 mark", "Zero work when there is no displacement (pushing a wall) -- 1 mark", "Zero work when force is zero or force is at right angles to the displacement (girl carrying a box) -- 1 mark"],
    answerParts: [
      { part: "Meaning of work", text: "In science, work is done on an object when a force moves it in the direction of the force. Just feeling tired is not enough. Work = force applied x displacement in the direction of the force. For example, lifting a bag of wheat to a height is work. Lifting 3 bags does 3 times the work, and lifting one bag to 3 times the height also does 3 times the work." },
      { part: "Formula and unit", text: "W = F x s. Here F is the force in newton (N), s is the displacement in metre (m) and W is the work in joule (J). Work has no direction. It is only a number with a plus or a minus sign." },
      { part: "One joule", text: "1 joule of work is done when a force of 1 newton moves an object by 1 metre in the direction of the force. So 1 J = 1 N x 1 m = 1 kg m²/s²." },
      { part: "Zero work: no displacement", text: "If you push a rigid wall with all your strength, the wall does not move. The displacement s = 0, so W = F x 0 = 0. You feel tired because your muscles use up the energy stored in your body, but no work is done on the wall." },
      { part: "Zero work: no force or a force at right angles", text: "If the force is zero (F = 0), the work is zero. If a force acts at right angles to the displacement, the work by that force is zero. A girl carries a box and walks on a level road. Her upward force balances the weight, but the box moves sideways, so this force does no work on the box." }
    ]
  },
  {
    id: 2,
    question: "Explain positive work and negative work with examples. A goalkeeper's hand moves back by 15 cm while she stops a ball with a force of 200 N. Find the work done by her on the ball.",
    markingScheme: ["Positive work: displacement in the direction of the force, with example (pushing a wheelchair) -- 1 mark", "Negative work: displacement opposite to the force, with example (goalkeeper stopping a ball) -- 1 mark", "Dumbbell example: positive work while lifting, negative work while lowering -- 1 mark", "Given data and formula W = F x s with negative displacement -- 1 mark", "Answer W = -30 J with its meaning -- 1 mark"],
    answerParts: [
      { part: "Positive work", text: "When the displacement is in the same direction as the force, the work done is positive. When you push a wheelchair forward, your force and its displacement are in the same direction, so you do positive work on the wheelchair. The wheelchair gains energy." },
      { part: "Negative work", text: "When the displacement is opposite to the direction of the force, the work done is negative. A goalkeeper stops a football by applying a force against its motion. So she does negative work on the ball, and the ball loses energy." },
      { part: "Dumbbell example", text: "A girl lifts a dumbbell up. Her force is upward and the displacement is upward, so she does positive work. When she lowers it slowly, her force is still upward but the displacement is downward, so she does negative work." },
      { part: "Given and formula", text: "Given: force F = 200 N. The ball moves opposite to the force applied by the goalkeeper, so the displacement is taken as s = -0.15 m (15 cm = 0.15 m). Formula: W = F x s." },
      { part: "Working and answer", text: "W = 200 N x (-0.15 m) = -30 J. The negative sign shows that she did negative work on the ball. She took away 30 J of energy from the ball." }
    ]
  },
  {
    id: 3,
    question: "State the work-energy theorem. Explain it with a carrom shot, showing who does positive work, who does negative work and how the energy changes.",
    markingScheme: ["Meaning of energy as the capacity to do work, with examples -- 1 mark", "Statement: work done on an object = change in its energy -- 1 mark", "Positive work increases energy, negative work decreases energy -- 1 mark", "Carrom: striker does positive work on the white coin, white coin does negative work on the striker -- 1 mark", "White coin does positive work on the black coin and black coin does negative work on the white coin -- 1 mark"],
    answerParts: [
      { part: "Energy", text: "An object that can do work is said to have energy. A cricket ball thrown by a fielder can hit the wickets and make them fall. A flowerpot kept high can break something below it when it falls. The ball got its energy from the work done by the fielder, and the pot got its energy from the work done in raising it." },
      { part: "The theorem", text: "The work done on an object appears as a change in its energy. Work-energy theorem: work done on an object = change in its energy. The unit of energy is the same as that of work, the joule (J)." },
      { part: "Positive and negative work", text: "When positive work is done on an object, its energy increases. When negative work is done on it, its energy decreases. The object can later use its energy to push another object, and so it transfers the energy." },
      { part: "Carrom shot: first collision", text: "The moving striker hits the white coin. The striker pushes the white coin forward, in the direction of its displacement, so the striker does positive work on the white coin and the energy of the coin increases. By the third law, the white coin pushes the striker backwards, so it does negative work on the striker, and the energy of the striker decreases." },
      { part: "Carrom shot: second collision", text: "The moving white coin then hits the black coin. The white coin does positive work on the black coin and increases its energy. The black coin does negative work on the white coin and decreases its energy. The energy is passed from the striker to the white coin and then to the black coin." }
    ]
  },
  {
    id: 4,
    question: "Derive the expression for kinetic energy K = 1/2 mv² using the work-energy theorem, W = F x s and the equation v² = u² + 2as.",
    markingScheme: ["Meaning of kinetic energy (energy due to motion) -- 1 mark", "Start with v² = u² + 2as, so s = (v² - u²)/2a -- 1 mark", "Use W = F x s and F = ma -- 1 mark", "Substitute to get W = 1/2 m (v² - u²) -- 1 mark", "Put u = 0 to get K = 1/2 mv², unit joule, no direction -- 1 mark"],
    answerParts: [
      { part: "Meaning", text: "The energy possessed by an object due to its motion is called kinetic energy. A moving bicycle or a rolling ball has kinetic energy. An object at rest is taken to have zero kinetic energy." },
      { part: "Step 1: equation of motion", text: "Let a constant force F act on an object of mass m. It has a constant acceleration a. Its velocity changes from u to v while it moves through a distance s. Then v² = u² + 2as, so s = (v² - u²)/(2a)." },
      { part: "Step 2: work done", text: "The work done by the force is W = F x s. By Newton's second law, F = ma. So W = ma x s." },
      { part: "Step 3: substitute s", text: "Put s = (v² - u²)/(2a): W = ma x (v² - u²)/(2a). The a cancels out, so W = 1/2 m (v² - u²)." },
      { part: "Step 4: kinetic energy", text: "By the work-energy theorem, this work is the change in energy. If the object starts from rest, u = 0, so the work done equals the final kinetic energy: K = 1/2 mv². Its unit is joule. It has no direction. Doubling the velocity makes the kinetic energy 4 times." }
    ]
  },
  {
    id: 5,
    question: "What is potential energy? Describe the sand and ball activity. Derive the expression for gravitational potential energy U = mgh.",
    markingScheme: ["Meaning of potential energy with examples (stretched band, bent bow, spring) -- 1 mark", "Sand activity: ball dropped from 1 m and 2 m -- 1 mark", "Observation: greater height gives a deeper depression, so more energy -- 1 mark", "Derivation: force needed to raise the object slowly is mg, W = mg x h -- 1 mark", "By work-energy theorem U = mgh, unit joule, zero on the ground -- 1 mark"],
    answerParts: [
      { part: "Meaning", text: "The energy stored in an object because of its changed shape, or in a system of objects because of their positions, is called potential energy. A stretched rubber band, a bent bow and a squeezed spring store energy. When released, they push another object and give it kinetic energy. A lifted ball and the Earth also store energy." },
      { part: "Sand activity: method", text: "Take a heavy ball and a large tray of loose sand. Drop the ball from a height of about 1 m and see the depression it makes. Then drop it from 2 m, at a slightly different place so the depressions do not overlap, and compare the depths." },
      { part: "Observation", text: "The depression is the deepest when the ball is dropped from the greatest height. Raising a ball higher needs more work, so it has more energy at a greater height. This energy makes a deeper depression. So potential energy increases with height." },
      { part: "Derivation", text: "Let an object of mass m lie on the ground, where we take its potential energy as zero. To raise it slowly to a height h, we must apply an upward force equal to its weight, F = mg. The work done is W = force x displacement = mg x h = mgh." },
      { part: "Result", text: "By the work-energy theorem, this work is stored as potential energy. So U = mgh. The unit is joule. This formula is valid near the surface of the Earth, where g is nearly constant." }
    ]
  },
  {
    id: 6,
    question: "State the law of conservation of mechanical energy. For an object of mass m dropped freely from a height h, show that its mechanical energy stays equal to mgh at every point.",
    markingScheme: ["Mechanical energy = kinetic energy + potential energy -- 1 mark", "At the starting point A: PE = mgh, KE = 0, total = mgh -- 1 mark", "After time t: v = gt and height fallen = 1/2 gt² -- 1 mark", "At point B: PE = mgh - 1/2 mg²t² and KE = 1/2 mg²t², total = mgh -- 1 mark", "Statement: mechanical energy is conserved if no other external force acts; lost PE becomes KE -- 1 mark"],
    answerParts: [
      { part: "Mechanical energy", text: "The sum of the kinetic energy and the potential energy of an object is called its mechanical energy." },
      { part: "At the top (point A)", text: "The object is released from rest at height h. Its potential energy is mgh. Its kinetic energy is 0 because u = 0. So the mechanical energy = 0 + mgh = mgh." },
      { part: "After time t (point B)", text: "The acceleration is g. Velocity v = u + gt = gt. Distance fallen s = ut + 1/2 gt² = 1/2 gt². So the height of the object above the ground is h' = h - 1/2 gt²." },
      { part: "Energy at point B", text: "Potential energy = mgh' = mgh - 1/2 mg²t². Kinetic energy = 1/2 mv² = 1/2 m(gt)² = 1/2 mg²t². Mechanical energy = mgh - 1/2 mg²t² + 1/2 mg²t² = mgh. It is the same as at A. Just before it hits the ground, PE = 0 and v² = 2gh, so KE = 1/2 m x 2gh = mgh again." },
      { part: "Law", text: "As the object falls, its potential energy decreases and its kinetic energy increases by the same amount. The mechanical energy of an object stays constant if no other external force acts on it. This is the conservation of mechanical energy." }
    ]
  },
  {
    id: 7,
    question: "Describe the simple pendulum activity to show the conservation of mechanical energy. Explain the energy at the extreme point and at the lowest point, and why a real pendulum finally stops.",
    markingScheme: ["Setup: pendulum, white paper on the wall, horizontal line at the starting level -- 1 mark", "Bob released from point P at the level of the line -- 1 mark", "Energy at P and R (extreme points): only potential energy, no kinetic energy -- 1 mark", "Energy at Q (lowest point): only kinetic energy, no potential energy; bob reaches almost the same height -- 1 mark", "Real pendulum stops because of friction at the support and air resistance -- 1 mark"],
    answerParts: [
      { part: "Setup", text: "Hang a simple pendulum. Paste a white sheet of paper on the wall behind it. Draw a horizontal line at the level of the bob at one side, at point P, when it is pulled aside." },
      { part: "Procedure", text: "Take the bob to point P, on the line, and let it go. Watch the extreme points of the first few swings. Does the bob nearly reach the level of the line on the other side?" },
      { part: "Energy at the extreme points", text: "At P the bob is at the greatest height h and is momentarily at rest. It has potential energy mgh and no kinetic energy. At R, the extreme point on the other side, the bob is again at rest for a moment, and again has only potential energy." },
      { part: "Energy at the lowest point", text: "At the lowest point Q, the height is zero, so the potential energy is zero, but the bob moves fastest. It has only kinetic energy. The potential energy of P was changed into kinetic energy at Q and again into potential energy at R." },
      { part: "Why it stops", text: "The bob reaches almost the same height, which shows that mechanical energy stays nearly constant. But in real life the pendulum slowly comes down and stops. The reason is the loss of energy due to friction at the support and the air resistance. The mechanical energy changes into heat." }
    ]
  },
  {
    id: 8,
    question: "A child slides down a slide of height h. Show that the speed at the bottom is v = sqrt(2gh), and explain why the shape of the slide and the mass of the child do not matter.",
    markingScheme: ["Potential energy at the top is mgh -- 1 mark", "Friction is neglected, so all PE changes to KE at the bottom -- 1 mark", "Equating 1/2 mv² = mgh -- 1 mark", "Result v = sqrt(2gh) -- 1 mark", "Reason: mass cancels and only height h is present, so mass and shape do not matter -- 1 mark"],
    answerParts: [
      { part: "Energy at the top", text: "The child of mass m is at rest at the top of the slide, at height h. The potential energy is mgh and the kinetic energy is zero." },
      { part: "Energy at the bottom", text: "If we neglect friction, no energy is lost. The whole potential energy changes into kinetic energy. At the bottom, the potential energy is zero and the kinetic energy is 1/2 mv²." },
      { part: "Equating", text: "By conservation of mechanical energy, 1/2 mv² = mgh." },
      { part: "Result", text: "The m cancels on both sides: v² = 2gh, so v = sqrt(2gh). For example, on a slide of height 5 m, v = sqrt(2 x 10 x 5) = 10 m/s." },
      { part: "Meaning", text: "The mass m has cancelled, so a heavy child and a light child reach the bottom with the same speed. The answer depends only on the height h, so slides of any shape (straight or curved) of the same height give the same speed at the bottom. In real life, friction makes the speed a little less." }
    ]
  },
  {
    id: 9,
    question: "Escape ramps on highways stop trucks whose brakes fail. A truck of mass 10000 kg is moving at 72 km/h. The sand on the ramp exerts a force of 50000 N against the motion, and the ramp rises 1 m for every 2 m of length. Find the minimum length of the ramp. Take g = 10 m/s².",
    markingScheme: ["Convert speed: 72 km/h = 20 m/s -- 1 mark", "Initial KE = 1/2 x 10000 x 20² = 2000000 J -- 1 mark", "Final PE after distance d: height d/2, PE = 50000 x d -- 1 mark", "Work by sand = -50000 x d and the work-energy theorem is applied -- 1 mark", "Solving: 100000 x d = 2000000, so d = 20 m -- 1 mark"],
    answerParts: [
      { part: "Speed in m/s", text: "v = 72 km/h = 72 x 1000 / 3600 = 20 m/s. Mass m = 10000 kg." },
      { part: "Initial energy", text: "Initial KE = 1/2 mv² = 1/2 x 10000 x (20)² = 2000000 J. Initial PE = 0. So the total initial energy is 2000000 J." },
      { part: "Final energy", text: "Let the truck travel a distance d along the ramp. Height gained = d/2. Final KE = 0. Final PE = mg x d/2 = 10000 x 10 x d/2 = 50000 x d. The total final energy is 50000 d joule." },
      { part: "Work-energy theorem", text: "The sand pushes against the motion, so the work done by the sand = -50000 x d. By the work-energy theorem: work done = final energy - initial energy. So -50000 d = 50000 d - 2000000." },
      { part: "Answer", text: "2000000 = 100000 d, so d = 2000000/100000 = 20 m. The minimum length of the ramp is 20 m. Check: the PE gained is 50000 x 20 = 1000000 J and the work done by sand is 50000 x 20 = 1000000 J. Together they make 2000000 J, the original KE." }
    ]
  },
  {
    id: 10,
    question: "A jet aircraft of mass 15000 kg lands on an aircraft carrier. A wire exerts a constant backward force of 367500 N and stops it within 100 m. Find the speed of the aircraft just before the wire caught it.",
    markingScheme: ["Initial KE = 1/2 x 15000 x v², final KE = 0 -- 1 mark", "Change in KE = -1/2 x 15000 x v² -- 1 mark", "Work by the wire is negative: 367500 x (-100) J -- 1 mark", "Equating using the work-energy theorem to get v² = 4900 -- 1 mark", "v = 70 m/s = 252 km/h -- 1 mark"],
    answerParts: [
      { part: "Given", text: "Mass m = 15000 kg, force F = 367500 N (backwards), distance s = 100 m, final velocity = 0. We need the initial velocity v." },
      { part: "Change in kinetic energy", text: "Initial KE = 1/2 x 15000 x v². Final KE = 0. Change in KE = 0 - 1/2 x 15000 x v² = -7500 v² joule." },
      { part: "Work done by the wire", text: "The force of the wire is opposite to the displacement of the aircraft, so the work is negative. W = F x s = 367500 x (-100) = -36750000 J." },
      { part: "Work-energy theorem", text: "Work done = change in kinetic energy. So -7500 v² = -36750000. This gives v² = 36750000/7500 = 4900 m²/s²." },
      { part: "Answer", text: "v = sqrt(4900) = 70 m/s. In km/h: 70 x 3600/1000 = 252 km/h. So the aircraft was landing at 70 m/s (252 km/h) towards the ship." }
    ]
  },
  {
    id: 11,
    question: "Define power and its SI unit. (a) A weightlifter lifts a 75 kg mass by 2 m in 5 s. Find her power. (b) A car of mass 1000 kg starts from rest and reaches 72 km/h in 10 s. Find the power of its engine. Take g = 10 m/s².",
    markingScheme: ["Definition P = W/t and unit watt (1 W = 1 J/s) -- 1 mark", "Running up the stairs versus walking: same work, different power -- 1 mark", "(a) Work = mgh = 1500 J -- 1 mark", "(a) Power = 1500/5 = 300 W -- 1 mark", "(b) Work = KE = 200000 J and power = 20000 W -- 1 mark"],
    answerParts: [
      { part: "Definition", text: "Power is the rate at which work is done. P = W/t. Its SI unit is the watt (W). 1 watt = 1 joule of work done per second (1 W = 1 J/s). For more power we either do more work in the same time or do the same work in less time. One horsepower is 746 W." },
      { part: "Idea", text: "If you carry a bag up a flight of stairs, running takes 1 minute and walking takes 5 minutes. The work done is the same, but running needs more power because the time is shorter." },
      { part: "(a) Work", text: "Given: m = 75 kg, h = 2 m, t = 5 s. Work done = mgh = 75 x 10 x 2 = 1500 J." },
      { part: "(a) Power", text: "P = W/t = 1500/5 = 300 W." },
      { part: "(b) Car", text: "Given: m = 1000 kg, u = 0, v = 72 km/h = 20 m/s, t = 10 s. Work done by the engine = final KE - initial KE = 1/2 x 1000 x 20² - 0 = 200000 J. Power = 200000/10 = 20000 W (20 kW)." }
    ]
  },
  {
    id: 12,
    question: "What are simple machines? Define effort, load and mechanical advantage. Explain the pulley: what is the mechanical advantage of a fixed pulley, and how can movable pulleys give a mechanical advantage greater than 1?",
    markingScheme: ["Simple machines make work easier by changing the size or direction of the force; they do not reduce the total work -- 1 mark", "Effort and load defined -- 1 mark", "Mechanical advantage = load/effort -- 1 mark", "Fixed pulley: only changes direction of the force, effort = load, MA = 1 -- 1 mark", "Movable pulleys or a system of pulleys: MA more than 1, with uses (crane, elevator) -- 1 mark"],
    answerParts: [
      { part: "Simple machines", text: "A simple machine is a device that makes a task easier by changing the size or the direction of the force we must apply. The total work needed for the task cannot be reduced by any machine. The three simple machines we study are the pulley, the inclined plane and the lever." },
      { part: "Effort and load", text: "The force that we apply to a machine is called the effort. The force that must be overcome, for example the weight of the object to be lifted, is called the load." },
      { part: "Mechanical advantage", text: "Mechanical advantage = load/effort. It tells us how many times the machine multiplies our force. It is a ratio, so it has no unit." },
      { part: "Fixed pulley", text: "A pulley is a wheel with a groove that guides a rope. In a fixed pulley, fixed at the top, we pull the rope down and the load goes up, as when a flag is raised. It is easier to pull down than to lift up. The effort is equal to the load, so the mechanical advantage is 1. It only changes the direction of the force and gives convenience." },
      { part: "Movable pulleys", text: "In a movable pulley, the load hangs from the moving pulley, one end of the rope is fixed and we pull the other end. Movable pulleys, or a system of pulleys, can have a mechanical advantage greater than 1, so a small effort can lift a very heavy load. They are used in cranes and elevators." }
    ]
  },
  {
    id: 13,
    question: "Describe the activity with a cart, a plank and a spring balance to study an inclined plane. Show that the mechanical advantage of an inclined plane is L/h, and find it for a ramp of height 30 cm and base 40 cm.",
    markingScheme: ["Setup: plank, cart, spring balance, height about 0.5 m -- 1 mark", "Reading for a vertical lift is the weight; reading along the plank is less, and it falls as the plank becomes longer -- 1 mark", "Derivation: F x L = mgh, so mg/F = L/h -- 1 mark", "Length of ramp by right-angled triangle = 50 cm -- 1 mark", "MA = 50/30 = 1.67 -- 1 mark"],
    answerParts: [
      { part: "Setup", text: "Take a smooth plank about 1.5 m long, a cart and a spring balance fixed to the cart. Make a raised surface, such as a low stool or a pile of books, about 0.5 m high." },
      { part: "Observation", text: "First lift the cart straight up to the top of the stool and note the reading, which is the weight of the cart. Then pull the cart slowly and steadily up the plank and note the reading. It is less than the weight. Now make the plank less steep, that is longer, and repeat. The force needed becomes even smaller, but we must pull over a longer distance." },
      { part: "Derivation", text: "Let the object have mass m. Load = mg and effort = F. Work done by us = F x L, where L is the length of the plank. Potential energy gained = mgh. Ignoring friction, F x L = mgh, so mg/F = L/h. Mechanical advantage = load/effort = L/h." },
      { part: "Meaning", text: "L is more than h, so F is less than mg and the mechanical advantage is more than 1. A longer, gentler ramp gives a larger mechanical advantage. The work is the same, as less force is used over more distance. That is why hill roads wind in gentle slopes and why a sloping ladder is easier to climb." },
      { part: "Numerical", text: "Height AB = 30 cm, base BC = 40 cm. Length AC = sqrt(30² + 40²) = sqrt(900 + 1600) = sqrt(2500) = 50 cm. Mechanical advantage = L/h = 50/30 = 1.67." }
    ]
  },
  {
    id: 14,
    question: "Describe the beam balance activity with a scale, string, paper cups and coins to study a lever. What is the condition of balance? How is the mechanical advantage of a lever found?",
    markingScheme: ["Meaning of lever, fulcrum, effort arm and load arm -- 1 mark", "Setup: scale hung from its middle as a beam with paper cups on both ends -- 1 mark", "Procedure: 1 coin on the left, 2, 4, 8 coins on the right, heavier pan moved closer to the fulcrum -- 1 mark", "Result: n1 x L1 = n2 x L2, that is effort x effort arm = load x load arm -- 1 mark", "MA = load/effort = effort arm/load arm; a lever gives less effort but needs more movement -- 1 mark"],
    answerParts: [
      { part: "Lever", text: "A lever is a rigid bar that can turn about a fixed point called the fulcrum. The distance of the effort from the fulcrum is the effort arm and the distance of the load from the fulcrum is the load arm. With a scale on a pencil, a light eraser can lift a heavy stapler." },
      { part: "Setup", text: "Tie a string tightly at the midpoint of a long scale and hang it, so that it swings freely. This is the beam and the string is the fulcrum. Fix a paper cup at each end as pans, and adjust till the beam is level. Coins are the weights." },
      { part: "Procedure", text: "Put 1 coin in the left pan (effort) and 1 coin in the right pan (load). The beam stays level. Add more coins to the right pan, first 2, then 4 and then 8. Each time the beam tilts, so move the heavier pan nearer to the centre till the beam is level again. Measure the distances and fill a table with n1, L1, n2, L2." },
      { part: "Result", text: "The beam is balanced when n1 x L1 = n2 x L2. This means effort x effort arm = load x load arm. For example, 1 coin at 8 cm balances 2 coins at 4 cm." },
      { part: "Mechanical advantage", text: "Mechanical advantage = load/effort = effort arm/load arm = L1/L2. Increasing the effort arm reduces the effort needed for the same load. But the effort moves through a larger distance, so the work done by us stays the same. A lever reduces force, not work." }
    ]
  },
  {
    id: 15,
    question: "A seesaw has seats A and E at 2 m from the fulcrum C, and seats B and D at 1 m from C. A child of 15 kg sits on seat A. Where must a child of 30 kg sit to balance the seesaw? Explain your working using the lever rule. What happens to the balance if the 30 kg child sits at 2 m?",
    markingScheme: ["State the lever rule: effort x effort arm = load x load arm -- 1 mark", "Given data: 15 kg at 2 m, 30 kg at L -- 1 mark", "Equation 15 x 2 = 30 x L -- 1 mark", "L = 1 m, so the child sits on seat D -- 1 mark", "Sitting at 2 m: 30 x 2 = 60 is more than 30, so the heavier child's side goes down -- 1 mark"],
    answerParts: [
      { part: "Rule", text: "A seesaw is a lever with the fulcrum in the middle. It is balanced when (mass of child 1 x distance 1) = (mass of child 2 x distance 2). Weights are proportional to masses, so masses can be used directly." },
      { part: "Given", text: "The 15 kg child sits on seat A, at 2 m from the fulcrum. The 30 kg child sits at an unknown distance L from the fulcrum." },
      { part: "Working", text: "15 kg x 2 m = 30 kg x L. So 30 = 30 x L." },
      { part: "Answer", text: "L = 30/30 = 1 m. A seat at 1 m from the fulcrum on the other side is seat D. So the 30 kg child should sit on seat D." },
      { part: "Check", text: "If the heavy child sat at seat E (2 m), the turning effect would be 30 x 2 = 60 units against 15 x 2 = 30 units on the other side. The seesaw would not balance and the side with the heavier child would go down. The heavier child must sit closer to the fulcrum." }
    ]
  },
  {
    id: 16,
    question: "Levers are of three types, depending on the positions of the fulcrum, load and effort. Describe each type with a sketch in words and two everyday examples of each.",
    markingScheme: ["First type: fulcrum in between load and effort -- 1 mark", "Examples of first type (scissors, crowbar, seesaw, pliers, balance) -- 1 mark", "Second type: load in between fulcrum and effort, with examples (wheelbarrow, lemon squeezer, bottle opener) -- 1 mark", "Third type: effort in between fulcrum and load -- 1 mark", "Examples of third type (tweezers, broom, hammer, oar, tongs) and general idea that machines only help us use energy better -- 1 mark"],
    answerParts: [
      { part: "First type", text: "The fulcrum is between the load and the effort. The effort is on one side, the load is on the other side of the fulcrum." },
      { part: "Examples of the first type", text: "Scissors, crowbar, pliers, seesaw, and the beam balance. In scissors, the object being cut is the load, the pivot screw is the fulcrum and the fingers give the effort." },
      { part: "Second type", text: "The load is between the fulcrum and the effort. The effort arm is always longer than the load arm, so the mechanical advantage is always more than 1. Examples: a wheelbarrow, a lemon squeezer and a bottle opener." },
      { part: "Third type", text: "The effort is between the fulcrum and the load. Here the effort arm is shorter than the load arm, so the effort is larger than the load, but the load moves through a big distance and quickly." },
      { part: "Examples of the third type", text: "Tweezers, a broom, a hammer used to hit a nail, an oar and some tongs. Many everyday machines are made of two or more simple machines. In all of them, the work we put in is equal to the useful work done on the load, if we ignore friction. Machines do not create energy." }
    ]
  },
  {
    id: 17,
    question: "Name the energy change that takes place in each of these: (i) a truck moving uphill, (ii) unwinding of a watch spring, (iii) photosynthesis in green leaves, (iv) water flowing from a dam, (v) burning of a matchstick, (vi) explosion of a fire cracker, (vii) speaking into a microphone, (viii) a glowing electric bulb, (ix) a solar panel.",
    markingScheme: ["Truck uphill and watch spring -- 1 mark", "Photosynthesis and water flowing from a dam -- 1 mark", "Matchstick and fire cracker -- 1 mark", "Microphone and glowing bulb -- 1 mark", "Solar panel, and the idea that energy changes form but is not created -- 1 mark"],
    answerParts: [
      { part: "(i) and (ii)", text: "(i) A truck moving uphill: chemical energy of the fuel changes into kinetic energy and potential energy of the truck (and some heat). (ii) Unwinding of a watch spring: the potential energy stored in the wound spring changes into kinetic energy of the moving parts of the watch." },
      { part: "(iii) and (iv)", text: "(iii) Photosynthesis: the light energy of the Sun is changed into chemical energy stored in the food made by the leaves. (iv) Water flowing from a dam: the potential energy of the stored water changes into kinetic energy of the flowing water (and then to electrical energy in a power plant)." },
      { part: "(v) and (vi)", text: "(v) Burning of a matchstick: chemical energy changes into heat and light energy. (vi) Explosion of a fire cracker: chemical energy changes into sound, light and heat energy, and also kinetic energy of the pieces." },
      { part: "(vii) and (viii)", text: "(vii) Speaking into a microphone: the sound energy of the voice changes into electrical energy. (viii) A glowing electric bulb: electrical energy changes into light energy and heat energy." },
      { part: "(ix) and summary", text: "(ix) A solar panel: light energy of the Sun changes into electrical energy. In every case energy is only changed from one form to another. It is not created or destroyed." }
    ]
  },
  {
    id: 18,
    question: "Explain how a traditional watermill (gharat or panchakki) works, and name the energy conversions at each stage. How is the same idea used in a dam?",
    markingScheme: ["Where the water gets its energy: stored at a height, so it has potential energy -- 1 mark", "Stage A: water flowing down the pipe, PE becomes KE -- 1 mark", "Stage B: fast water hits the wheel and makes it rotate -- 1 mark", "Stage C: the wheel turns the grinding stone, which grinds the grain -- 1 mark", "Dams: PE of stored water changes into KE, which produces electricity -- 1 mark"],
    answerParts: [
      { part: "Source of energy", text: "In hilly regions such as the Himalayas, water flows down from a height. At the top, the water has potential energy because of its height. A gharat uses this energy to grind grain." },
      { part: "Stage A: the pipe", text: "The water is led through a pipe or channel downhill. While it comes down, its potential energy changes into kinetic energy, so it moves faster." },
      { part: "Stage B: the wheel", text: "The fast-moving water strikes the blades of the wheel. The water does work on the wheel and gives it kinetic energy, so the wheel starts rotating." },
      { part: "Stage C: the stone", text: "The wheel is joined to the grinding stone at the top. When the wheel rotates, the stone rotates too and grinds the grain into flour. So the energy of the water is used to do useful work." },
      { part: "Dams", text: "In modern times, the potential energy of the water stored in a dam is changed into kinetic energy of falling water in the same way. That turns the turbines of a power plant, which produce electricity. Overall: potential energy, kinetic energy, and then electrical energy." }
    ]
  },
  {
    id: 19,
    question: "(a) A cricketer bowls a ball of mass 0.2 kg at 154.8 km/h. Find its kinetic energy. (b) A fielder throws a ball of mass 200 g to a maximum height of 10 m. Find its potential energy at the top. (c) If the velocity of a vehicle doubles, what happens to its kinetic energy? Take g = 10 m/s².",
    markingScheme: ["(a) Converting 154.8 km/h to 43 m/s -- 1 mark", "(a) K = 1/2 mv² = 184.9 J -- 1 mark", "(b) Converting 200 g to 0.2 kg and using U = mgh -- 1 mark", "(b) U = 0.2 x 10 x 10 = 20 J -- 1 mark", "(c) K becomes 4 times, with working -- 1 mark"],
    answerParts: [
      { part: "(a) Speed", text: "Mass m = 0.2 kg. Velocity = 154.8 km/h = 154.8 x 1000/3600 = 43 m/s." },
      { part: "(a) Kinetic energy", text: "K = 1/2 mv² = 1/2 x 0.2 x (43)² = 0.1 x 1849 = 184.9 J." },
      { part: "(b) Given and formula", text: "Mass = 200 g = 0.2 kg, h = 10 m, g = 10 m/s². Formula: U = mgh." },
      { part: "(b) Answer", text: "U = 0.2 x 10 x 10 = 20 J. The ball has 20 J of potential energy at its highest point." },
      { part: "(c) Doubling the velocity", text: "Initial K = 1/2 mv². When the velocity becomes 2v, the new K = 1/2 m (2v)² = 1/2 m x 4v² = 4 x (1/2 mv²). The kinetic energy becomes 4 times the old value." }
    ]
  },
  {
    id: 20,
    question: "A student of mass 50 kg is lifted slowly by an elevator to the top of a building of height 72.5 m. Later the same student climbs the stairs to the top. Find the gain in potential energy in each case and state what you conclude. Take g = 10 m/s².",
    markingScheme: ["Formula U = mgh and given data -- 1 mark", "Gain in PE by the elevator = 36250 J -- 1 mark", "Gain in PE by the stairs = 36250 J -- 1 mark", "Same height, same mass, same g, so the same result -- 1 mark", "Conclusion: PE depends only on height, not on the path taken -- 1 mark"],
    answerParts: [
      { part: "Given", text: "m = 50 kg, h = 72.5 m, g = 10 m/s². Formula: U = mgh." },
      { part: "Elevator", text: "The gain in PE = 50 x 10 x 72.5 = 500 x 72.5 = 36250 J." },
      { part: "Stairs", text: "The student reaches the same top floor, so the height gained is again 72.5 m. Gain in PE = 50 x 10 x 72.5 = 36250 J." },
      { part: "Comparison", text: "In both cases the mass, g and the vertical height are the same, so the gain in potential energy is the same: 36250 J. The stairs are longer than the vertical height, but only the vertical height counts." },
      { part: "Conclusion", text: "The potential energy of an object depends only on its height above the ground (and on m and g). It does not depend on the path taken to reach that height. Climbing takes more effort and time because the student's own body does the work, but the gain in potential energy is the same." }
    ]
  },
  {
    id: 21,
    question: "A crane lifts a mass m to the 10th floor of a building in a certain time t. Then it lifts the same mass to the 20th floor in double the time. How much more energy and power are needed? Assume all floors have the same height.",
    markingScheme: ["Energy needed is the gain in PE = mgh, and let the height of 10 floors be H -- 1 mark", "For the 10th floor: E1 = mgH -- 1 mark", "For the 20th floor: height is 2H, so E2 = 2mgH, double energy -- 1 mark", "Power P = E/t: P1 = mgH/t -- 1 mark", "P2 = 2mgH/2t = mgH/t, so power stays the same -- 1 mark"],
    answerParts: [
      { part: "Idea", text: "The crane must supply energy equal to the gain in potential energy of the mass, U = mgh. Let H be the height of the 10th floor from the ground." },
      { part: "10th floor", text: "Energy needed E1 = mgH, in time t." },
      { part: "20th floor", text: "The height is now 2H, because the floors are equally high. Energy needed E2 = mg(2H) = 2mgH. So double the energy is required." },
      { part: "Power for the 10th floor", text: "P1 = E1/t = mgH/t." },
      { part: "Power for the 20th floor", text: "The time taken is 2t. P2 = E2/(2t) = 2mgH/2t = mgH/t. So P2 = P1. The energy required is doubled, but the power required stays the same, as the time is also doubled." }
    ]
  },
  {
    id: 22,
    question: "A coconut of mass 1.5 kg falls from the top of a 10 m tall tree on wet sand. Find (a) its velocity just before it hits the sand, (b) its kinetic energy, and (c) the depth of the depression it makes if the average resisting force of the sand is 3000 N. Take g = 10 m/s².",
    markingScheme: ["Use of conservation of energy, mgh = 1/2 mv² -- 1 mark", "v = sqrt(2gh) = sqrt(200) = 14.1 m/s -- 1 mark", "KE just before impact = mgh = 150 J -- 1 mark", "Work done by sand = -3000 x d equals the change in KE -- 1 mark", "3000 x d = 150, so d = 0.05 m (5 cm) -- 1 mark"],
    answerParts: [
      { part: "Method", text: "Ignoring air resistance, the potential energy at the top changes fully into kinetic energy just before the coconut hits the sand: mgh = 1/2 mv²." },
      { part: "(a) Velocity", text: "v = sqrt(2gh) = sqrt(2 x 10 x 10) = sqrt(200) = 14.1 m/s. This does not depend on the mass." },
      { part: "(b) Kinetic energy", text: "KE = 1/2 mv² = 1/2 x 1.5 x 200 = 150 J. Check with the potential energy at the top: mgh = 1.5 x 10 x 10 = 150 J." },
      { part: "(c) Work-energy theorem", text: "The sand pushes against the motion with a force of 3000 N over the depth d, so the work done by the sand is -3000 x d. The coconut comes to rest, so its KE changes from 150 J to 0. We assume all of its energy goes into making the depression. So -3000 x d = 0 - 150." },
      { part: "(c) Answer", text: "d = 150/3000 = 0.05 m = 5 cm. The depression is 0.05 m deep." }
    ]
  },
  {
    id: 23,
    question: "A man of mass 60 kg rides a scooter of mass 100 kg and brings it to a speed v. Next day his son of mass 40 kg also sits on the scooter, and the scooter reaches the same speed v in the same time. Find the ratio of the fuel used on the two days. Assume the energy comes only from the fuel and no energy is lost.",
    markingScheme: ["Fuel energy equals the kinetic energy gained -- 1 mark", "First day total mass = 160 kg -- 1 mark", "Energy on day 1 = 1/2 x 160 x v² = 80 v² -- 1 mark", "Day 2 total mass = 200 kg, energy = 100 v² -- 1 mark", "Ratio = 80 : 100 = 4 : 5 -- 1 mark"],
    answerParts: [
      { part: "Idea", text: "By the work-energy theorem, the energy supplied by the fuel becomes the kinetic energy of the man and scooter. So the fuel used is proportional to the kinetic energy gained, K = 1/2 mv²." },
      { part: "Day 1", text: "Total mass = 60 + 100 = 160 kg." },
      { part: "Energy on day 1", text: "K1 = 1/2 x 160 x v² = 80 v² joule." },
      { part: "Day 2", text: "Total mass = 60 + 100 + 40 = 200 kg. K2 = 1/2 x 200 x v² = 100 v² joule." },
      { part: "Ratio", text: "Fuel on day 1 : fuel on day 2 = K1 : K2 = 80 : 100 = 4 : 5. Since the time is the same, the ratio of the power of the engine is also 4 : 5." }
    ]
  },
  {
    id: 24,
    question: "The gravity on the surface of the Moon is about 1/6 of that on the Earth. An astronaut throws a ball up to a height of 8 m on the Earth. How high will the ball go if it is thrown with the same velocity on the Moon? Explain using energy.",
    markingScheme: ["Same starting velocity means same starting kinetic energy -- 1 mark", "At the highest point all KE becomes PE: 1/2 mv² = mgh -- 1 mark", "So h = v²/2g, and h is inversely proportional to g -- 1 mark", "Moon: g is 1/6 of the Earth's g, so h becomes 6 times -- 1 mark", "Height = 6 x 8 = 48 m -- 1 mark"],
    answerParts: [
      { part: "Starting energy", text: "The ball is thrown with the same velocity v on both, so it starts with the same kinetic energy, 1/2 mv²." },
      { part: "At the top", text: "At the highest point the velocity is zero, so the whole kinetic energy has become potential energy. 1/2 mv² = mgh." },
      { part: "Formula for height", text: "The m cancels: h = v²/(2g). For the same v, the height is inversely proportional to g." },
      { part: "Moon", text: "On the Moon, g is 1/6 of the value on the Earth. So the height becomes 6 times as large." },
      { part: "Answer", text: "Height on the Moon = 6 x 8 m = 48 m. Check: on the Earth with g = 10 and h = 8, v² = 2 x 10 x 8 = 160. On the Moon g = 10/6, so h = 160/(2 x 10/6) = 160/(20/6) = 48 m, which agrees." }
    ]
  },
  {
    id: 25,
    question: "A ball of mass 2 kg is thrown up with a velocity of 20 m/s and reaches a height of 19.4 m. (a) Is the work done by gravity positive or negative while the ball goes up, and while it comes down? (b) Find the work done by air resistance. Take g = 10 m/s².",
    markingScheme: ["(a) Going up: gravity acts down, displacement is up, so work is negative -- 1 mark", "(a) Coming down: gravity and displacement are both down, so work is positive -- 1 mark", "(b) Initial KE = 1/2 x 2 x 20² = 400 J -- 1 mark", "(b) PE at the top = 2 x 10 x 19.4 = 388 J -- 1 mark", "(b) Work by air resistance = 388 - 400 = -12 J -- 1 mark"],
    answerParts: [
      { part: "(a) Going up", text: "Gravity pulls the ball downwards, but the ball moves upwards. The force and the displacement are in opposite directions, so the work done by gravity is negative. The ball slows down." },
      { part: "(a) Coming down", text: "While the ball comes down, gravity and the displacement are both downwards, so the work done by gravity is positive. The ball speeds up." },
      { part: "(b) Initial energy", text: "Initial KE = 1/2 mv² = 1/2 x 2 x 20² = 400 J. The initial PE is 0, so the initial total energy is 400 J." },
      { part: "(b) Final energy", text: "At the highest point the KE is zero. PE = mgh = 2 x 10 x 19.4 = 388 J. So the final total energy is 388 J." },
      { part: "(b) Work by air resistance", text: "By the work-energy theorem, the work done by air resistance = final energy - initial energy = 388 - 400 = -12 J. It is negative because the air pushes against the motion of the ball. 12 J of energy is lost as heat. Without air, the ball would reach h = 400/20 = 20 m." }
    ]
  }
];

// ── CASE-BASED QUESTIONS (4 marks each: 4 sub-questions of 1 mark) ──
export const ENERGY9_COMPETENCY: CompetencyQuestion[] = [
  {
    id: 1,
    caseTitle: "The Escape Ramp",
    caseDescription: "On a mountain highway there is an escape ramp filled with sand, for trucks whose brakes fail. A truck of mass 4000 kg rushes onto it at 20 m/s. The ramp rises 1 m for every 2 m of its length. The sand pushes back on the truck with a constant force of 20000 N. Take g = 10 m/s².",
    subQuestions: [
      { question: "Which energy does the truck have at the moment it enters the ramp?", options: ["Only potential energy", "Only kinetic energy", "Neither kinetic nor potential energy", "Only heat energy"], correctIndex: 1, answer: "Only kinetic energy", explanation: "The truck is moving, so it has kinetic energy. It is at ground level at the start, so its potential energy is zero." },
      { question: "Find the kinetic energy of the truck as it enters the ramp.", answer: "800000 J", explanation: "K = 1/2 mv² = 1/2 x 4000 x 20² = 2000 x 400 = 800000 J." },
      { question: "The truck stops after travelling a distance d along the ramp. Find d.", answer: "20 m", explanation: "The height gained is d/2, so the gain in PE = 4000 x 10 x d/2 = 20000 d. Work against the sand = 20000 d. Total = 40000 d = 800000, so d = 20 m." },
      { question: "Find the work done by the sand on the truck over the full stopping distance. Is it positive or negative?", answer: "-400000 J. It is negative.", explanation: "W = force x displacement = 20000 x (-20) = -400000 J. The sand pushes against the motion, so the work is negative. The other 400000 J of the energy goes into the potential energy of the truck." }
    ]
  },
  {
    id: 2,
    caseTitle: "Slides in the Park",
    caseDescription: "A park has two slides of the same height, 5 m. One is straight and the other has many curves. Tina has a mass of 20 kg and uses the straight slide. Her cousin Jay has a mass of 30 kg and uses the curved slide. Both start from rest at the top. Ignore friction and take g = 10 m/s².",
    subQuestions: [
      { question: "Who reaches the bottom with the greater speed?", options: ["Tina, because her slide is straight", "Jay, because he is heavier", "Jay, because his slide is longer", "Both reach with the same speed"], correctIndex: 3, answer: "Both reach with the same speed", explanation: "From 1/2 mv² = mgh, v = sqrt(2gh). It depends only on the height, not on the mass or the shape of the slide." },
      { question: "Find the speed of the children at the bottom.", answer: "10 m/s", explanation: "v = sqrt(2gh) = sqrt(2 x 10 x 5) = sqrt(100) = 10 m/s." },
      { question: "Find the kinetic energy of Tina at the bottom.", answer: "1000 J", explanation: "Her PE at the top is mgh = 20 x 10 x 5 = 1000 J. This all changes into kinetic energy. Check: 1/2 x 20 x 10² = 1000 J." },
      { question: "If the slide is made 20 m high, what will be the speed at the bottom?", answer: "20 m/s", explanation: "v = sqrt(2 x 10 x 20) = sqrt(400) = 20 m/s. The height became 4 times, and the speed became 2 times." }
    ]
  },
  {
    id: 3,
    caseTitle: "The Winding Hill Road",
    caseDescription: "A village on a hill is 100 m higher than the plain below. A straight road of length 300 m goes up to it, and a winding road of length 600 m with gentle bends goes to the same place. A jeep and its passengers together weigh 6000 N. Ignore friction.",
    subQuestions: [
      { question: "Why are roads on hills built with gentle bends instead of going straight up?", options: ["To increase the work done", "To reduce the height of the hill", "To reduce the force the engine has to apply, by increasing the length", "To make the jeep lighter"], correctIndex: 2, answer: "To reduce the force the engine has to apply, by increasing the length", explanation: "A longer, gentler slope has a larger mechanical advantage L/h, so a smaller effort is needed." },
      { question: "Find the mechanical advantage of the straight road.", answer: "3", explanation: "MA = L/h = 300/100 = 3." },
      { question: "Find the force needed along the winding road to move the jeep up.", answer: "1000 N", explanation: "MA = 600/100 = 6. Effort = load/MA = 6000/6 = 1000 N. (On the straight road it would be 6000/3 = 2000 N.)" },
      { question: "Compare the work done by the engine on the two roads.", answer: "It is the same: 600000 J on both roads.", explanation: "Straight road: 2000 x 300 = 600000 J. Winding road: 1000 x 600 = 600000 J. Also mgh = 6000 x 100 = 600000 J. The force is less on the winding road, but the distance is more, so the work is the same." }
    ]
  },
  {
    id: 4,
    caseTitle: "The Crane at the Building Site",
    caseDescription: "At a building site a crane lifts 500 kg of bricks to a height of 20 m in 25 s. Later, a second, slower crane lifts the same bricks to the same height in 50 s. Take g = 10 m/s².",
    subQuestions: [
      { question: "What kind of energy do the bricks gain as they are lifted slowly?", options: ["Kinetic energy", "Potential energy", "Sound energy", "Light energy"], correctIndex: 1, answer: "Potential energy", explanation: "The bricks rise to a height, so their gravitational potential energy increases. They are lifted slowly, so their kinetic energy hardly changes." },
      { question: "Find the work done by the first crane.", answer: "100000 J", explanation: "W = mgh = 500 x 10 x 20 = 100000 J." },
      { question: "Find the power of the first crane.", answer: "4000 W", explanation: "P = W/t = 100000/25 = 4000 W." },
      { question: "Find the power of the second crane and compare the two.", answer: "2000 W. The second crane does the same work but has half the power.", explanation: "P = 100000/50 = 2000 W. The work is the same, but the time is double, so the power is half." }
    ]
  },
  {
    id: 5,
    caseTitle: "Roller Coaster at the Science Park",
    caseDescription: "In a science park, a roller coaster car of mass 200 kg is released from rest at the top of a track, 20 m above the lowest point. Assume there is no friction for the first part of the ride. Take g = 10 m/s².",
    subQuestions: [
      { question: "What form of energy is the greatest at the lowest point of the track?", options: ["Potential energy", "Chemical energy", "Kinetic energy", "Sound energy"], correctIndex: 2, answer: "Kinetic energy", explanation: "At the lowest point the height is zero, so the potential energy is zero. All the potential energy of the top has changed into kinetic energy." },
      { question: "Find the potential energy of the car at the top.", answer: "40000 J", explanation: "U = mgh = 200 x 10 x 20 = 40000 J." },
      { question: "Find the speed of the car at the lowest point.", answer: "20 m/s", explanation: "v = sqrt(2gh) = sqrt(2 x 10 x 20) = sqrt(400) = 20 m/s." },
      { question: "Find the kinetic energy of the car at a point 5 m above the lowest point.", answer: "30000 J", explanation: "Total mechanical energy = 40000 J. PE at 5 m = 200 x 10 x 5 = 10000 J. KE = 40000 - 10000 = 30000 J." }
    ]
  },
  {
    id: 6,
    caseTitle: "The Gharat in the Hills",
    caseDescription: "In a hill village, a watermill (gharat) is run by a stream. Every second, 100 kg of water comes down a channel from a height of 5 m to strike the wheel. The wheel turns a stone that grinds wheat. Take g = 10 m/s².",
    subQuestions: [
      { question: "Which is the correct order of energy changes in the gharat?", options: ["Kinetic energy of water, potential energy of water, rotation of the wheel", "Potential energy of water, kinetic energy of water, rotation of the wheel and stone", "Heat energy, kinetic energy, potential energy", "Electrical energy, kinetic energy, sound energy"], correctIndex: 1, answer: "Potential energy of water, kinetic energy of water, rotation of the wheel and stone", explanation: "Water at a height has potential energy. As it comes down the channel this changes into kinetic energy, which turns the wheel and the stone." },
      { question: "Find the potential energy lost by 100 kg of water in falling 5 m.", answer: "5000 J", explanation: "U = mgh = 100 x 10 x 5 = 5000 J." },
      { question: "If 40 percent of this energy is used to run the wheel, find the useful power.", answer: "2000 W", explanation: "Useful energy every second = 40/100 x 5000 = 2000 J. Power = 2000 J / 1 s = 2000 W." },
      { question: "Find the speed of the water at the bottom of the channel, if no energy is lost.", answer: "10 m/s", explanation: "v = sqrt(2gh) = sqrt(2 x 10 x 5) = 10 m/s." }
    ]
  },
  {
    id: 7,
    caseTitle: "Balancing the Seesaw",
    caseDescription: "In a park, Arjun (40 kg) sits on a seesaw at 1.5 m from the fulcrum. The seesaw plank is long and children can sit at any distance from the fulcrum on either side.",
    subQuestions: [
      { question: "What is the condition for a seesaw to be balanced?", options: ["Both children have the same mass", "Both children sit at the same distance", "Mass x distance on one side = mass x distance on the other side", "The total mass is more than 100 kg"], correctIndex: 2, answer: "Mass x distance on one side = mass x distance on the other side", explanation: "It is the lever rule, effort x effort arm = load x load arm. Weights are proportional to masses." },
      { question: "Arjun's friend Sara has a mass of 30 kg. At what distance from the fulcrum should she sit to balance Arjun?", answer: "2 m", explanation: "40 x 1.5 = 30 x L, so 60 = 30 L and L = 2 m." },
      { question: "Arjun's father has a mass of 60 kg. At what distance should he sit to balance Arjun?", answer: "1 m", explanation: "40 x 1.5 = 60 x L, so L = 60/60 = 1 m." },
      { question: "Arjun now moves to 1 m from the fulcrum, while his father remains at 1 m on the other side. Which side goes down, and why?", answer: "The father's side goes down.", explanation: "Arjun: 40 x 1 = 40. Father: 60 x 1 = 60. The larger turning effect is on the father's side, so his side goes down." }
    ]
  },
  {
    id: 8,
    caseTitle: "Wheelbarrow and Crowbar",
    caseDescription: "A gardener uses a wheelbarrow to carry soil. The load is 600 N and its centre is 0.5 m from the wheel axle. The handles are 1.5 m from the axle. A worker also uses a crowbar to lift a stone of weight 1800 N. The crowbar has a load arm of 0.2 m and an effort arm of 1.2 m.",
    subQuestions: [
      { question: "In a wheelbarrow, where is the load placed?", options: ["Between the fulcrum (wheel) and the effort (handles)", "At the fulcrum", "Beyond the handles", "On the opposite side of the wheel"], correctIndex: 0, answer: "Between the fulcrum (wheel) and the effort (handles)", explanation: "The wheel axle is the fulcrum, the soil is between the wheel and the handles, and the handles carry the effort. This is the second type of lever." },
      { question: "Find the effort the gardener must apply on the handles.", answer: "200 N", explanation: "Effort x 1.5 = 600 x 0.5, so effort = 300/1.5 = 200 N." },
      { question: "Find the mechanical advantage of the wheelbarrow.", answer: "3", explanation: "MA = load/effort = 600/200 = 3, or effort arm/load arm = 1.5/0.5 = 3." },
      { question: "Find the effort needed with the crowbar to lift the 1800 N stone.", answer: "300 N", explanation: "Effort x 1.2 = 1800 x 0.2, so effort = 360/1.2 = 300 N. The mechanical advantage is 1.2/0.2 = 6." }
    ]
  },
  {
    id: 9,
    caseTitle: "The Fielder and the Bowler",
    caseDescription: "A bowler throws a cricket ball of mass 0.16 kg and it reaches the fielder at 30 m/s. The fielder catches it and, by pulling her hands back, brings the ball to rest over a distance of 0.4 m. Ignore air resistance.",
    subQuestions: [
      { question: "What is the sign of the work done by the fielder's hands on the ball?", options: ["Positive, because the ball gains energy", "Zero, because the ball stops", "Positive, because the force is large", "Negative, because the force is opposite to the displacement"], correctIndex: 3, answer: "Negative, because the force is opposite to the displacement", explanation: "The hands push against the motion of the ball, so they do negative work and take energy away from the ball." },
      { question: "Find the kinetic energy of the ball just before it is caught.", answer: "72 J", explanation: "K = 1/2 mv² = 1/2 x 0.16 x 30² = 0.08 x 900 = 72 J." },
      { question: "Find the average force applied by the hands on the ball.", answer: "180 N", explanation: "Work done by the hands = change in KE = -72 J. F x (-0.4) = -72, so F = 72/0.4 = 180 N." },
      { question: "If the ball had come at 60 m/s instead, what would its kinetic energy be?", answer: "288 J", explanation: "K = 0.08 x 60² = 0.08 x 3600 = 288 J. Doubling the speed makes the kinetic energy 4 times: 4 x 72 = 288 J." }
    ]
  },
  {
    id: 10,
    caseTitle: "The Archery Bow",
    caseDescription: "At an archery camp, Kavya pulls the string of a bow and bends its arms. She releases the string and an arrow of mass 0.05 kg leaves the bow at 40 m/s. Assume all the energy stored in the bow goes into the arrow. Take g = 10 m/s².",
    subQuestions: [
      { question: "What kind of energy is stored in the bent bow?", options: ["Elastic potential energy", "Kinetic energy", "Light energy", "Sound energy"], correctIndex: 0, answer: "Elastic potential energy", explanation: "The bow changes its shape when it is bent. Energy stored because of a change in shape is potential energy." },
      { question: "Find the kinetic energy of the arrow as it leaves the bow.", answer: "40 J", explanation: "K = 1/2 mv² = 1/2 x 0.05 x 40² = 0.025 x 1600 = 40 J." },
      { question: "If the arrow is shot straight up, to what height does it go? Ignore air resistance.", answer: "80 m", explanation: "At the top all KE becomes PE: mgh = 40, so h = 40/(0.05 x 10) = 40/0.5 = 80 m." },
      { question: "Kavya pulls the string farther and the stored energy becomes 160 J. Find the new speed of the arrow.", answer: "80 m/s", explanation: "1/2 x 0.05 x v² = 160, so v² = 160/0.025 = 6400 and v = 80 m/s. Four times the energy gives twice the speed." }
    ]
  },
  {
    id: 11,
    caseTitle: "The Electricity Bill",
    caseDescription: "A room heater of power 1000 W is used for 2 hours every day. The electricity board charges Rs 6 for each unit. One unit is 1 kilowatt-hour (kWh), which is the energy used by a 1000 W device in 1 hour. A month has 30 days.",
    subQuestions: [
      { question: "What does a power of 1 watt mean?", options: ["1 joule of work done every hour", "1 newton of force", "1 joule of work done every second", "1 metre of displacement in 1 second"], correctIndex: 2, answer: "1 joule of work done every second", explanation: "Power is the rate of doing work, and 1 W = 1 J/s." },
      { question: "Find the energy used by the heater in one day, in joules.", answer: "7200000 J", explanation: "Time = 2 x 3600 = 7200 s. Energy = power x time = 1000 x 7200 = 7200000 J." },
      { question: "Find the energy used in one day in kWh.", answer: "2 kWh", explanation: "1 kW x 2 h = 2 kWh. (1 kWh = 3600000 J, so 7200000/3600000 = 2.)" },
      { question: "Find the cost of running the heater for 30 days.", answer: "Rs 360", explanation: "Energy in 30 days = 2 x 30 = 60 kWh. Cost = 60 x 6 = Rs 360." }
    ]
  },
  {
    id: 12,
    caseTitle: "Stairs: Walk or Run?",
    caseDescription: "Nisha has a mass of 40 kg. Her study room is on the first floor, 3 m above the ground. On Monday she runs up the stairs in 6 s. On Tuesday she walks up in 12 s. Take g = 10 m/s².",
    subQuestions: [
      { question: "On which day does Nisha need more power?", options: ["Tuesday, because she takes more time", "Monday, because she does the same work in less time", "Both days, because she does more work on Monday", "On neither day"], correctIndex: 1, answer: "Monday, because she does the same work in less time", explanation: "Power = work/time. The work is the same on both days, but the time is less on Monday, so the power is more." },
      { question: "Find the work done by Nisha against gravity in climbing up.", answer: "1200 J", explanation: "W = mgh = 40 x 10 x 3 = 1200 J." },
      { question: "Find her power on Monday.", answer: "200 W", explanation: "P = W/t = 1200/6 = 200 W." },
      { question: "Find her power on Tuesday.", answer: "100 W", explanation: "P = 1200/12 = 100 W. The same work in double the time needs half the power." }
    ]
  },
  {
    id: 13,
    caseTitle: "A Drum and a Ramp",
    caseDescription: "A shopkeeper must load a drum of mass 100 kg onto a truck whose floor is 1 m high. He cannot lift it straight up, so he uses a smooth wooden ramp 4 m long and pushes the drum slowly up. Ignore friction. Take g = 10 m/s².",
    subQuestions: [
      { question: "What happens to the total work done when a ramp is used instead of lifting straight up?", options: ["It becomes much less", "It stays the same", "It becomes zero", "It becomes more than the weight"], correctIndex: 1, answer: "It stays the same", explanation: "A machine does not reduce the total work. It reduces the force by increasing the distance over which the force acts." },
      { question: "Find the mechanical advantage of the ramp.", answer: "4", explanation: "MA = L/h = 4/1 = 4." },
      { question: "Find the force the shopkeeper must apply along the ramp.", answer: "250 N", explanation: "Load = mg = 100 x 10 = 1000 N. Effort = load/MA = 1000/4 = 250 N." },
      { question: "Show that the work done in pushing along the ramp equals the work done in lifting the drum straight up.", answer: "Both are 1000 J.", explanation: "Along the ramp: 250 N x 4 m = 1000 J. Lifting up: 1000 N x 1 m = 1000 J (which is also mgh, the gain in PE)." }
    ]
  },
  {
    id: 14,
    caseTitle: "The Spring Toy Car",
    caseDescription: "Rohan compresses the spring of a toy launcher by pushing hard on it. The compressed spring stores 5 J of energy. When it is released, it pushes a toy car of mass 0.1 kg. Assume all the stored energy goes to the car. Take g = 10 m/s².",
    subQuestions: [
      { question: "Where does the energy stored in the spring come from?", options: ["From the work done by Rohan in compressing it", "From the air", "From the toy car", "From nowhere; the spring makes energy on its own"], correctIndex: 0, answer: "From the work done by Rohan in compressing it", explanation: "By the work-energy theorem, the work done on the spring is stored in it as potential energy." },
      { question: "How much work did Rohan do on the spring?", answer: "5 J", explanation: "The work done on the spring equals the energy stored, 5 J." },
      { question: "Find the speed of the car when it leaves the spring.", answer: "10 m/s", explanation: "1/2 x 0.1 x v² = 5, so v² = 5/0.05 = 100 and v = 10 m/s." },
      { question: "If the car is thrown straight up with this energy, how high will it go? Ignore air resistance.", answer: "5 m", explanation: "mgh = 5, so h = 5/(0.1 x 10) = 5 m." }
    ]
  },
  {
    id: 15,
    caseTitle: "Bicycle Brakes",
    caseDescription: "Imran and his bicycle have a total mass of 80 kg. He is riding at 5 m/s when he applies the brakes. The brake shoes and the road together give a constant stopping force of 200 N.",
    subQuestions: [
      { question: "Where does the kinetic energy of the cycle go when it stops?", options: ["It is destroyed", "It changes into heat energy", "It changes into potential energy of the wheels", "It changes into light energy"], correctIndex: 1, answer: "It changes into heat energy", explanation: "Friction in the brakes and between the tyres and the road warms them up. Energy is not destroyed but changed into another form." },
      { question: "Find the kinetic energy of Imran and the cycle.", answer: "1000 J", explanation: "K = 1/2 x 80 x 5² = 40 x 25 = 1000 J." },
      { question: "Find the distance in which the cycle stops.", answer: "5 m", explanation: "Work done by the stopping force = -200 x d, which equals the change in KE = -1000 J. So d = 1000/200 = 5 m." },
      { question: "If Imran had been riding at 10 m/s, find the stopping distance with the same force.", answer: "20 m", explanation: "K = 1/2 x 80 x 100 = 4000 J. d = 4000/200 = 20 m. Double the speed gives 4 times the stopping distance." }
    ]
  },
  {
    id: 16,
    caseTitle: "Speed and Braking Distance",
    caseDescription: "A car of mass 1000 kg has brakes that give a constant stopping force of 5000 N. A road safety talk shows the braking of this car from 10 m/s and from 20 m/s.",
    subQuestions: [
      { question: "When the speed of a car doubles, its kinetic energy becomes", options: ["2 times", "Half", "4 times", "8 times"], correctIndex: 2, answer: "4 times", explanation: "K = 1/2 mv². If v becomes 2v, then K becomes 1/2 m (2v)² = 4 x (1/2 mv²)." },
      { question: "Find the kinetic energy of the car at 10 m/s.", answer: "50000 J", explanation: "K = 1/2 x 1000 x 10² = 500 x 100 = 50000 J." },
      { question: "Find the braking distance from 10 m/s.", answer: "10 m", explanation: "The work done by the brakes = -5000 x d = -50000 J, so d = 10 m." },
      { question: "Find the braking distance from 20 m/s and explain why fast driving is dangerous.", answer: "40 m. The braking distance becomes 4 times.", explanation: "K = 1/2 x 1000 x 400 = 200000 J, so d = 200000/5000 = 40 m. A small increase in speed needs a much longer distance to stop, so fast driving is dangerous." }
    ]
  },
  {
    id: 17,
    caseTitle: "The Trolley on the Plank",
    caseDescription: "In a science lab, Meera pulls a 2 kg trolley up a smooth plank using a spring balance. The plank is 2 m long and its top end is 0.5 m above the table. She pulls the trolley slowly and steadily. Take g = 10 m/s².",
    subQuestions: [
      { question: "If Meera uses a longer plank to reach the same height, the reading of the spring balance will", options: ["Increase", "Decrease", "Stay zero", "Become equal to the weight"], correctIndex: 1, answer: "Decrease", explanation: "A longer plank is less steep. The force needed is smaller, but it acts over a longer distance." },
      { question: "Find the mechanical advantage of this plank.", answer: "4", explanation: "MA = L/h = 2/0.5 = 4." },
      { question: "Find the reading of the spring balance.", answer: "5 N", explanation: "Load = 2 x 10 = 20 N. Effort = 20/4 = 5 N." },
      { question: "Find the gain in potential energy of the trolley, and check that it equals the work done by Meera.", answer: "10 J. Work done = 5 N x 2 m = 10 J, the same.", explanation: "PE gain = mgh = 2 x 10 x 0.5 = 10 J. Work = F x L = 5 x 2 = 10 J. They are equal when friction is ignored." }
    ]
  },
  {
    id: 18,
    caseTitle: "Power from a Dam",
    caseDescription: "Water stored behind a dam falls through a pipe of height 30 m to a turbine in the power house. Every second, 1000 kg of water flows through the pipe. Take g = 10 m/s².",
    subQuestions: [
      { question: "Which is the correct order of energy changes in a hydroelectric power plant?", options: ["Electrical, kinetic, potential", "Kinetic, electrical, potential", "Potential, kinetic, electrical", "Heat, potential, electrical"], correctIndex: 2, answer: "Potential, kinetic, electrical", explanation: "The stored water has potential energy. It becomes kinetic energy of the falling water, which turns the turbine, and the generator produces electrical energy." },
      { question: "Find the potential energy lost by 1000 kg of water in falling through 30 m.", answer: "300000 J", explanation: "U = mgh = 1000 x 10 x 30 = 300000 J." },
      { question: "If all of this energy could be used every second, find the power.", answer: "300000 W (300 kW)", explanation: "P = 300000 J / 1 s = 300000 W = 300 kW." },
      { question: "In reality only half of the energy is changed into electrical energy. Find the electrical power.", answer: "150000 W (150 kW)", explanation: "Half of 300000 W is 150000 W." }
    ]
  },
  {
    id: 19,
    caseTitle: "Wind and Sun for a Village",
    caseDescription: "A village uses a wind turbine and a solar panel to charge a battery, which lights the street lamps at night. The solar panel gives 100 W for 5 hours in a day. Each street lamp uses 10 W. (1 kWh = 3600000 J.)",
    subQuestions: [
      { question: "What is the energy change in a solar panel?", options: ["Electrical energy to light energy", "Light energy to electrical energy", "Heat energy to sound energy", "Chemical energy to light energy"], correctIndex: 1, answer: "Light energy to electrical energy", explanation: "A solar panel takes in the light of the Sun and gives out electrical energy." },
      { question: "What is the energy change in the wind turbine?", answer: "Kinetic energy of the wind changes into electrical energy.", explanation: "The moving air turns the blades. The blades run a generator, which produces electrical energy." },
      { question: "Find the energy given by the solar panel in a day, in kWh and in joules.", answer: "0.5 kWh, which is 1800000 J", explanation: "Energy = 100 W x 5 h = 500 Wh = 0.5 kWh. In joules: 0.5 x 3600000 = 1800000 J." },
      { question: "For how long can one 10 W lamp run on this energy?", answer: "50 hours", explanation: "Time = energy/power = 500 Wh / 10 W = 50 h. In the battery the electrical energy is stored as chemical energy and is changed back to electrical and then to light in the lamp." }
    ]
  },
  {
    id: 20,
    caseTitle: "The Pen Refill Launcher",
    caseDescription: "Aman makes a launcher from a pen barrel, a refill and a rubber band. He stretches the band and releases it, and the refill of mass 5 g (0.005 kg) shoots out. When the band is stretched a little, it stores 0.16 J of energy. When stretched more, it stores 0.64 J. Assume all the stored energy becomes the kinetic energy of the refill. Take g = 10 m/s².",
    subQuestions: [
      { question: "What is the energy change when the rubber band is released?", options: ["Kinetic energy to potential energy", "Sound energy to kinetic energy", "Elastic potential energy to kinetic energy", "Heat energy to potential energy"], correctIndex: 2, answer: "Elastic potential energy to kinetic energy", explanation: "The stretched band stores elastic potential energy. When released it pushes the refill and gives it kinetic energy." },
      { question: "Find the speed of the refill for the small stretch.", answer: "8 m/s", explanation: "1/2 x 0.005 x v² = 0.16, so v² = 0.16/0.0025 = 64 and v = 8 m/s." },
      { question: "Find the speed of the refill for the larger stretch, and compare it with the first speed.", answer: "16 m/s, which is twice the first speed", explanation: "v² = 0.64/0.0025 = 256, so v = 16 m/s. The energy became 4 times and the speed became 2 times." },
      { question: "If the refill is shot straight up with the small stretch, how high does it go? Ignore air resistance.", answer: "3.2 m", explanation: "mgh = 0.16, so h = 0.16/(0.005 x 10) = 0.16/0.05 = 3.2 m." }
    ]
  }
];
