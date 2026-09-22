import React, { useState } from "react";
import { Award, HelpCircle, ChevronLeft, ChevronRight, FlaskConical, Zap, Scale, Wind, Rocket, Boxes, Network, Trophy, Move, Lightbulb } from "lucide-react";
import { NetForceCases, FmaTriangle, ForceAccelGraphs, ActionReactionDiagram, BusInertiaDiagram, TimeForceDiagram, RecoilDiagram, ForcesMindMap } from "./forces9Diagrams";

// Notes for the chapter "How Forces Affect Motion". Simple words, short sentences.

const IMG_BASE = "/diagrams/forces9/";
interface Pic { file: string; alt: string; caption: string; }
type SvgKey = "netcases" | "fma" | "graphs" | "actreact" | "bus" | "time" | "recoil" | "mind";

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
    id: "force",
    title: "1. What is a Force?",
    category: "Force",
    heading: "What is a Force?",
    sub: "A push or a pull that can change how things move.",
    blocks: [
      { t: "card", title: "Core Idea", body: [
        <>A {b("force")} is a push or a pull. It can start a motion, stop a motion, change the speed, change the direction, or change the shape of an object.</>,
        <>Think of a canoe. When the canoeist pushes the water backwards with the paddle, the canoe moves forward. When they push harder, it moves faster.</>,
      ] },
      { t: "img", pic: { file: "force-effects", alt: "Kicking a ball, striking a ball with a bat and squeezing a lemon", caption: "A force can start a motion, change a direction or change a shape" } },
      { t: "ul", items: [
        <>Kicking a ball at rest makes it move. That is a force starting a motion.</>,
        <>A bat hits a cricket ball and its direction changes. That is a force changing the direction.</>,
        <>Your fingers squeeze a lemon and its shape changes.</>,
      ] },
      { t: "h", text: "Size and Direction" },
      { t: "ul", items: [
        <>Every force has a {b("size")} (called magnitude) and a {b("direction")}. If either one changes, the effect of the force changes.</>,
        <>The SI unit of force is the {b("newton")}. Its symbol is {b("N")}. When a unit is named after a person, the full word starts with a small letter (newton), but the symbol is a capital letter (N).</>,
      ] },
      { t: "h", text: "Measuring a Force" },
      { t: "ul", items: [
        <>A {b("spring balance")} measures a force. When you pull its hook, it shows how hard you pull.</>,
        <>The {b("weight")} of an object is the force with which the Earth pulls it down. A spring balance can measure it too.</>,
        <>Holding a 100 g mass in your palm needs an upward force of about 1 N.</>,
      ] },
      { t: "img", pic: { file: "spring-balance", alt: "A spring balance measuring the weight of an object", caption: "A spring balance measures the size of a force" } },
    ],
  },
  {
    id: "balanced",
    title: "2. Balanced and Unbalanced Forces",
    category: "Force",
    heading: "Balanced and Unbalanced Forces",
    sub: "More than one force usually acts on an object. What matters is the net force.",
    blocks: [
      { t: "card", title: "Many forces at once", body: [
        <>Usually more than one force acts on an object. When you push a box, the floor also pulls back on it with {b("friction")}. A ball floating on water has its weight pulling down and the {b("buoyant force")} of water pushing up.</>,
        <>The single force that has the same effect as all of them together is the {b("net force")}.</>,
      ] },
      { t: "img", pic: { file: "forces-on-object", alt: "A block with applied force, force of friction, normal force and gravitational force", caption: "Four forces on a pushed block. The weight and the normal force cancel each other" } },
      { t: "img", pic: { file: "tug-of-war", alt: "Tug of war with equal and with unequal pulls", caption: "Tug of war: (a) equal pulls, no motion (b) bigger pull wins" } },
      { t: "compare", left: "Balanced forces", right: "Unbalanced forces", rows: [
        ["Equal in size and opposite in direction", "Not equal, so one force is bigger"],
        ["Net force is zero", "Net force is not zero"],
        ["The object does not change its motion", "The object speeds up, slows down or turns"],
      ] },
      { t: "h", text: "How to Find the Net Force" },
      { t: "ul", items: [
        <>Two forces in the {b("same direction")}: {b("add")} them. The net force goes the same way.</>,
        <>Two forces in {b("opposite directions")}: {b("subtract")} the smaller from the bigger. The net force goes the way of the bigger force.</>,
      ] },
      { t: "svg", key: "netcases", caption: "A block with a 10 N force and a 6 N force in three different ways" },
      { t: "img", pic: { file: "weightlifter-armwrestle", alt: "A weightlifter holding a barbell and two players arm wrestling", caption: "Left: a steady barbell has balanced forces. Right: in arm wrestling, the player whose side is going down is being beaten by the bigger force" } },
      { t: "remember", title: "Remember", body: <>An object may have many forces on it, but its motion depends only on the {b("net force")}.</> },
    ],
  },
  {
    id: "friction",
    title: "3. Force of Friction",
    category: "Friction",
    heading: "The Force of Friction",
    sub: "Often forgotten, but it is always present when things touch and slide.",
    blocks: [
      { t: "card", title: "Why does a pushed box stay still at first?", body: [
        <>{b("Friction")} acts between the bottom of the box and the floor. It acts {b("opposite")} to the push. The box moves only when your push is {b("bigger")} than friction, so that a net force acts forward.</>,
        <>Once the box moves and you stop pushing, friction slows it down until it stops. To keep an object moving you have to push against friction all the time. If friction were not there, no push would be needed to keep it moving.</>,
      ] },
      { t: "img", pic: { file: "box-pushed", alt: "A girl pushing a box with net force shown forward and friction backward", caption: "Pushing a box: friction acts against the motion" } },
      { t: "activity", title: "Activity: Which surface has less friction?", aim: "To see that friction depends on the surfaces that touch each other.", steps: [
        "Tape four coins in a stack. Stretch a rubber band between two marks A and B on a wooden table.",
        "Push the stack back to mark C, stretching the band. Release it and measure how far the stack travels.",
        "Repeat on a laminated table top and then on a polished tile or marble floor. Keep A, B and C at the same distances.",
        "Now pull a wooden block with a spring balance on each surface. Note the reading just as the block starts to move.",
      ], observation: "On the smoothest surface the coins slide the farthest and the spring balance reading is the smallest.", conclusion: "Smaller friction means the speed drops more slowly and the object travels farther. Friction depends on the two surfaces in contact." },
      { t: "imgs", pics: [
        { file: "coins-activity", alt: "Rubber band stretched with marks A, B and C and a stack of coins", caption: "Coins pushed back against a rubber band" },
        { file: "coins-forces", alt: "Force of the rubber band and friction on the coins, then only friction", caption: "(a) rubber band force and friction (b) only friction after release" },
      ] },
      { t: "img", pic: { file: "block-spring-balance", alt: "A block pulled by a spring balance", caption: "The spring balance reading gives the friction on the block" } },
      { t: "card", title: "Friction helps us too", body: [
        <>When you walk, your foot pushes the ground backwards. The ground pushes your foot forward with friction. Without friction your foot would slip and you would fall.</>,
        <>That is why shoes have grooves and tyres have treads, to increase friction. It is hard to walk on a wet floor or on ice, and risky to drive on a wet or snowy road.</>,
      ] },
      { t: "remember", title: "Think like a scientist", body: <>Galileo argued that if every obstacle to motion is removed, a moving object would keep moving forever. That idea leads to Newton's first law.</> },
    ],
  },
  {
    id: "first",
    title: "4. Newton's First Law",
    category: "Laws of Motion",
    heading: "Newton's First Law of Motion",
    sub: "If no net force acts, nothing changes in the motion.",
    blocks: [
      { t: "img", pic: { file: "galileo", alt: "Galileo Galilei", caption: "Galileo Galilei" } },
      { t: "card", title: "The First Law", body: [
        <>An object at rest {b("stays at rest")}, and an object in motion {b("keeps moving with constant velocity")}, unless a net force acts on it.</>,
        <>So if the net force is zero, the acceleration is zero. The velocity cannot change.</>,
      ] },
      { t: "ul", items: [
        <>{b("Constant velocity")} means that neither the speed nor the direction changes. If it is not zero, the object moves in a straight line at a steady speed.</>,
        <>No force is needed to keep an object moving at constant velocity. A force is needed to {b("start")} it, {b("stop")} it, or {b("change")} its velocity.</>,
        <>{b("Inertia")} is the tendency of an object to resist any change in its state of rest or motion. A heavier object has more inertia.</>,
      ] },
      { t: "svg", key: "bus", caption: "Inertia in a bus: your body wants to keep its old state" },
      { t: "h", text: "Graphs When No Net Force Acts" },
      { t: "img", pic: { file: "no-force-graphs", alt: "Position-time and velocity-time graphs for an object at rest and for an object with constant velocity", caption: "At rest: flat lines. Constant velocity: a slanted position line and a flat velocity line" } },
      { t: "exq", n: 1, q: "A person pushes a moving box forward with a force equal to the friction on it. Will the box keep moving or stop?", a: "Friction acts backward and the push acts forward. They are equal and opposite, so the net force is zero. By the first law the box keeps moving with constant velocity." },
      { t: "remember", title: "Remember", body: <>Zero net force does not mean the object is at rest. It can also be moving with a steady velocity.</> },
    ],
  },
  {
    id: "second",
    title: "5. Newton's Second Law",
    category: "Laws of Motion",
    heading: "Newton's Second Law of Motion",
    sub: "A net force gives an acceleration. How much depends on the force and the mass.",
    blocks: [
      { t: "card", title: "The Second Law", body: [
        <>When a net force acts on an object, the object {b("accelerates in the direction of the net force")}. The acceleration is {b("directly proportional to the force")} and {b("inversely proportional to the mass")}.</>,
        <>{b("a = F / m")} and so {b("F = m × a")}</>,
      ] },
      { t: "svg", key: "fma", caption: "Cover the quantity you want to find, and the triangle shows the formula" },
      { t: "activity", title: "Activity: Force, mass and acceleration", aim: "To find how acceleration depends on the force and on the mass.", steps: [
        "Make a cart from a small box with wheels. Tie a thread to it, pass the thread over a pulley at the table edge and hang a paper cup on it.",
        "Put some coins in the cup. Release the cart and note the time T1 it takes to reach the end of the table.",
        "Double the mass in the cup and repeat. Note the time T2. The bigger force gives a bigger acceleration.",
        "Now keep the cup mass the same and double the mass of the cart. The acceleration becomes smaller.",
      ], observation: "More force on the same cart gives more acceleration. The same force on a heavier cart gives less acceleration.", conclusion: "Acceleration increases with force and decreases with mass. The measured change may be a little off because of friction in the wheels." },
      { t: "img", pic: { file: "cart-pulley", alt: "A cart with wheels connected by a thread over a pulley to a paper cup", caption: "The cart and the pulley set up" } },
      { t: "svg", key: "graphs", caption: "Acceleration against force and against mass" },
      { t: "h", text: "The Newton" },
      { t: "ul", items: [
        <>{b("1 newton")} is the force that gives an acceleration of 1 m/s² to a mass of 1 kg. So 1 N = 1 kg m/s².</>,
        <>Near the Earth, the pull of gravity gives every falling object the same acceleration, {b("g = 9.8 m/s²")}. For quick sums use 10 m/s².</>,
        <>The weight of an object of mass m is {b("W = m × g")}.</>,
      ] },
      { t: "remember", title: "Mass and weight", body: <>Mass is the amount of matter in an object, in kg. Weight is a force, in N. Weight = mass × g.</> },
      { t: "h", text: "Solved Examples" },
      { t: "exq", n: 1, q: "A weightlifter holds a barbell steady. The bar is 10 kg and there is a 10 kg mass on each side. How much force does she apply? (g = 9.8 m/s²)", a: "Total mass = 10 + 10 + 10 = 30 kg. Weight = 30 × 9.8 = 294 N downward. To hold it steady she applies an equal force of 294 N upward." },
      { t: "exq", n: 2, q: "A 25 kg block rests on a floor. The most friction the floor can give is 50 N. How far does the block move in 2 s if you push with (i) 50 N and (ii) 55 N?", a: "(i) Push = friction, so the net force is zero and the block does not move. (ii) Net force = 55 - 50 = 5 N. a = 5 / 25 = 0.2 m/s². Distance s = ut + ½at² = 0 + ½ × 0.2 × 2 × 2 = 0.4 m forward." },
      { t: "img", pic: { file: "velocity-time-car", alt: "Velocity-time graph of a sports car: rises to 10 m/s in 5 s, stays constant till 10 s, falls to zero at 15 s", caption: "Velocity-time graph of a 1500 kg car" } },
      { t: "exq", n: 3, q: "For the car above (mass 1500 kg), find the force in 0 to 5 s, 5 to 10 s and 10 to 15 s.", a: "0 to 5 s: a = (10 - 0)/5 = 2 m/s², so F = 1500 × 2 = 3000 N towards the east. 5 to 10 s: the graph is flat, a = 0, so no net force. 10 to 15 s: a = (0 - 10)/5 = -2 m/s², so F = 1500 × (-2) = -3000 N. The minus sign means the force acts backward, towards the west." },
    ],
  },
  {
    id: "second-life",
    title: "6. Second Law in Daily Life",
    category: "Laws of Motion",
    heading: "The Second Law in Daily Life",
    sub: "If the stopping time is longer, the force needed is smaller.",
    blocks: [
      { t: "card", title: "The big idea", body: [
        <>To stop a moving object, its velocity must fall to zero. If this happens in a {b("longer time")}, the acceleration is {b("smaller")}, so the force is {b("smaller")}. If it happens in a {b("very short time")}, the force is {b("very large")}.</>,
      ] },
      { t: "svg", key: "time", caption: "The same ball stopped in a short time and in a longer time" },
      { t: "imgs", pics: [
        { file: "catching-ball", alt: "A fielder pulls the hands back while catching a cricket ball", caption: "A fielder pulls the hands back with the ball" },
        { file: "airbag", alt: "An inflated airbag in a vehicle", caption: "An airbag inflates in a crash" },
        { file: "coconut-crack", alt: "A coconut being cracked on a hard surface", caption: "A coconut hits a hard surface and stops at once" },
        { file: "high-jump-mat", alt: "A high jumper falling on a thick soft mat", caption: "A soft mat gives the jumper more time to stop" },
      ] },
      { t: "ul", items: [
        <>{b("Cricket catch:")} the fielder pulls the hands back. The ball takes longer to stop, so the force on the hands is smaller and there is less injury.</>,
        <>{b("Airbag:")} in a crash the airbag inflates into a soft cushion. The head and chest take more time to stop, so the force is smaller. It works best with a seat belt.</>,
        <>{b("Coconut:")} it stops in a very short time on hard ground. The ground pushes back with a very large force and the shell breaks.</>,
        <>{b("Packing glass:")} bubble wrap and hay give more time for the glass to stop when it gets a jolt, so the force is small and it does not break.</>,
        <>{b("High jump mat:")} a thick soft mat lets the jumper stop slowly, so the jumper is not hurt.</>,
      ] },
      { t: "exq", n: 1, q: "Two children of different masses sit on identical swings. Which child needs a bigger push to get the same acceleration?", a: "F = m × a. For the same acceleration, the child with the bigger mass needs the bigger force." },
      { t: "exq", n: 2, q: "A toy car of mass 100 g moves with a constant velocity of 0.5 m/s. What is the net force on it?", a: "The velocity is constant, so the acceleration is zero. Net force = m × a = 0 N." },
    ],
  },
  {
    id: "third",
    title: "7. Newton's Third Law",
    category: "Laws of Motion",
    heading: "Newton's Third Law of Motion",
    sub: "Forces always come in pairs. Push on something and it pushes back.",
    blocks: [
      { t: "card", title: "The Third Law", body: [
        <>Whenever one object pushes or pulls a second object, the second object {b("at the same time")} pushes or pulls the first one with a force that is {b("equal in size and opposite in direction")}.</>,
        <>A common way to say it: to every action there is an equal and opposite reaction.</>,
      ] },
      { t: "svg", key: "actreact", caption: "A force pair: two forces, two different objects" },
      { t: "remember", title: "Most important point", body: <>The two forces of a pair act on {b("different objects")}, so they never cancel each other. Two equal and opposite forces on the {b("same")} object do cancel each other.</> },
      { t: "img", pic: { file: "kicking-ball", alt: "A girl kicking a ball and the ball pushing back on her foot", caption: "You push the ball, the ball pushes your foot" } },
      { t: "activity", title: "Activity: Push the table", aim: "To see that when you push something, it pushes you back.", steps: [
        "Sit on a chair with wheels. Lift your feet off the floor.",
        "Push a large heavy table away from you with both hands. See which way your chair moves.",
        "Now pull the table towards you. See which way the chair moves now.",
      ], observation: "When you push the table forward, the chair moves back. When you pull the table, the chair moves forward.", conclusion: "Each time you apply a force on the table, the table applies an equal force on you in the opposite direction." },
      { t: "img", pic: { file: "chair-table", alt: "A girl on a wheeled chair pushing and pulling a table", caption: "Pushing and pulling a table from a chair with wheels" } },
      { t: "activity", title: "Activity: Two spring balances", aim: "To check that the two forces of a pair are equal.", steps: [
        "Hook two identical spring balances together on a table. Fix the free end of one of them.",
        "Pull the free end of the other one. Try different pulls.",
        "Read both scales each time.",
      ], observation: "Both spring balances show the same reading every time.", conclusion: "The two forces on each other are equal in size and opposite in direction." },
      { t: "img", pic: { file: "two-spring-balances", alt: "Two spring balances connected and pulled in opposite directions", caption: "Both scales read the same" } },
      { t: "h", text: "Examples of the Third Law" },
      { t: "imgs", pics: [
        { file: "bicycle-push", alt: "A rider pushing the ground backwards while the ground pushes the rider and bicycle forward", caption: "Feet push the ground back, the ground pushes forward" },
        { file: "walking-forces", alt: "Foot pushing the ground backward and friction pushing the person forward", caption: "Walking: friction pushes you forward" },
        { file: "tree-climber", alt: "A person climbing a coconut tree", caption: "Climbing a tree: legs push the trunk down, friction pushes the person up" },
        { file: "canoe", alt: "A canoeist pushing water backwards and the water pushing the paddle forward", caption: "The paddle pushes the water back, the water pushes the canoe forward" },
        { file: "sailor-boat", alt: "A boy jumping from a boat to the shore while the boat moves away", caption: "Jump from a boat to the shore and the boat moves back" },
      ] },
      { t: "ul", items: [
        <>{b("Walking:")} you push the ground back. The ground pushes you forward with friction. This is why smooth, wet or icy ground is slippery.</>,
        <>{b("Climbing a tree:")} it is harder to climb a smooth trunk because there is less friction.</>,
        <>{b("Canoe:")} the paddle pushes water backwards, the water pushes the paddle forward. The forces act on different objects (the paddle and the water), so they do not cancel.</>,
        <>{b("Fire hose:")} the water rushes out with force, so it pushes the hose backward. That is why a fire fighter can struggle to hold it.</>,
      ] },
      { t: "activity", title: "Activity: Balloon on a thread", aim: "To see how air rushing out moves a balloon.", steps: [
        "Inflate a balloon and tie its neck with a thread.",
        "Stick a piece of straw on the balloon. Pass a long thread through the straw and tie both ends to two nails on walls. Keep the thread tight.",
        "Remove the small thread from the neck of the balloon and watch.",
      ], observation: "The air rushes out backward and the balloon moves forward along the thread.", conclusion: "The balloon pushes the air out and the air pushes the balloon the other way. This is the same idea a rocket uses." },
      { t: "imgs", pics: [
        { file: "balloon-straw", alt: "A balloon with a straw on a thread and air rushing out", caption: "Air rushing out of the balloon" },
        { file: "rocket-launch", alt: "A rocket launching with exhaust gas pushed downwards", caption: "A rocket expels gas downward and moves up" },
      ] },
      { t: "ul", items: [
        <>A {b("rocket")} pushes hot gas downward. The gas pushes the rocket upward. When this upward force is larger than the weight of the rocket, the rocket lifts off.</>,
        <>In space, firing the engine in the direction of motion slows the rocket down, because the gas pushes it back. The Vikram lander of Chandrayaan-3 used this idea to slow down for a soft landing on the Moon.</>,
        <>A spacecraft where gravity is negligible can change its velocity only by firing its engine, because that gives the push it needs.</>,
      ] },
      { t: "h", text: "It Works for All Kinds of Forces" },
      { t: "img", pic: { file: "magnet-cars-balloons", alt: "Two toy cars with magnets and two charged balloons pushing each other apart", caption: "Two magnets or two similarly charged balloons push each other with equal forces" } },
      { t: "ul", items: [
        <>The third law holds for contact forces and also for {b("magnetic")}, {b("electric")} and {b("gravitational")} forces.</>,
      ] },
      { t: "img", pic: { file: "earth-fruit", alt: "The Earth and a fruit pulling each other with equal forces", caption: "The Earth pulls the fruit and the fruit pulls the Earth" } },
      { t: "exq", n: 1, q: "The Earth and a fruit pull each other with equal forces. Why does only the fruit seem to move?", a: "The forces are equal, but the mass of the Earth is huge. By a = F / m, the Earth's acceleration is so small that we cannot notice it." },
      { t: "svg", key: "recoil", caption: "Bullet and gun feel the same force but not the same acceleration" },
      { t: "exq", n: 2, q: "A 0.1 kg bullet is fired from a 5 kg gun with a force of 2 N. Find the initial acceleration of the bullet and of the gun.", a: "By the third law the force on the gun is also 2 N. Gun: a = 2 / 5 = 0.4 m/s². Bullet: a = 2 / 0.1 = 20 m/s². The forces are equal, but the accelerations are not, because the masses are different." },
      { t: "remember", title: "Do not mix up", body: <>Equal forces do not give equal accelerations. The lighter object gets the bigger acceleration.</> },
    ],
  },
  {
    id: "system",
    title: "8. Forces on a System of Objects",
    category: "System",
    heading: "Forces on a System of Objects",
    sub: "Objects joined together can be treated as one single object.",
    blocks: [
      { t: "card", title: "Two boxes and a string", body: [
        <>Two boxes of masses m1 and m2 sit on a smooth surface, joined by a string. A force F pulls box 1. Box 1 pulls box 2 through the string, and box 2 pulls back on box 1 with an equal force. This pull in the string is called {b("tension (T)")}.</>,
      ] },
      { t: "img", pic: { file: "two-boxes-string", alt: "Two boxes connected by a string with force F pulling one of them and tension T acting on both", caption: "Two boxes joined by a string" } },
      { t: "ul", items: [
        <>Take both boxes and the string as one {b("system")}.</>,
        <>{b("Internal forces")} (like the tension T) act inside the system. Leave them out.</>,
        <>{b("External forces")} (like F) come from outside. Only these decide the motion of the system.</>,
        <>Acceleration of the system: {b("a = F / (m1 + m2)")}. The system accelerates like one object of mass m1 + m2.</>,
      ] },
      { t: "img", pic: { file: "system-external-forces", alt: "External forces on a system of two boxes: F, total weight (m1+m2)g and normal force N1+N2", caption: "External forces: F, the total weight and the total normal force. Weight and normal force cancel" } },
      { t: "exq", n: 1, q: "Two boxes of 3 kg and 2 kg are joined by a string on a smooth floor. A force of 20 N pulls the 3 kg box. Find the acceleration and the tension in the string.", a: "System mass = 3 + 2 = 5 kg. a = 20 / 5 = 4 m/s². The string pulls only the 2 kg box, so T = 2 × 4 = 8 N." },
      { t: "remember", title: "Useful habit", body: <>Studying a whole body as one object often makes a hard problem easy. Even when you walk, your overall motion can be studied by treating your body as one object.</> },
    ],
  },
  {
    id: "mindmap",
    title: "9. Mind Map",
    category: "Revision",
    heading: "Mind Map of the Topic",
    sub: "The whole topic on one page.",
    blocks: [
      { t: "svg", key: "mind", caption: "Mind map: forces and motion" },
      { t: "h", text: "Topic at a Glance" },
      { t: "facts", rows: [
        ["Force", "A push or a pull, measured in newton (N). Has size and direction"],
        ["Net force", "Same direction: add. Opposite direction: subtract"],
        ["Friction", "Acts opposite to the motion. Depends on the two surfaces. Also helps us walk"],
        ["First law", "No net force: rest stays rest, motion stays at constant velocity"],
        ["Second law", "F = m × a, so a = F / m. Weight W = m × g"],
        ["Third law", "Forces come in pairs, equal and opposite, on two different objects"],
        ["System", "a = F / (m1 + m2), only external forces count"],
      ] },
    ],
  },
  {
    id: "competitive-1",
    title: "10. Competitive Corner: Ideas",
    category: "Advanced",
    heading: "Competitive Corner",
    sub: "The main topic is enough for school exams. These ideas take you one step further.",
    blocks: [
      { t: "card", title: "Momentum and Impulse", body: [
        <>{b("Momentum")} p = m × v. It is a vector, in the direction of velocity. Unit: kg m/s.</>,
        <>The full form of the second law: {b("F = change in momentum / time")}, so F = (mv - mu) / t. It also works when the mass changes, as in a rocket.</>,
        <>{b("Impulse")} = F × t = change in momentum. The same change in momentum over a longer time needs a smaller force. This is why airbags and soft mats work.</>,
      ] },
      { t: "card", title: "Conservation of Momentum", body: [
        <>If no external force acts on a system, its total momentum stays the same. This follows from the third law.</>,
        <>Gun and bullet: before firing both are at rest, so the total momentum is zero. After firing, m1v1 + m2v2 = 0. The gun moves back with a small velocity because its mass is large.</>,
      ] },
      { t: "card", title: "Types of Friction", body: [
        <>{b("Static friction")} acts when there is no motion. It grows with the push, up to a maximum (limiting friction).</>,
        <>{b("Kinetic (sliding) friction")} acts when the object slides. It is a little less than the limiting friction.</>,
        <>Friction depends on the surfaces and on the normal force. Friction = μ × N. It does not depend much on the area of contact. Rolling friction is much smaller than sliding friction, which is why wheels are useful.</>,
      ] },
      { t: "facts", rows: [
        ["Inertia and mass", "Mass is the measure of inertia. More mass means more inertia"],
        ["Kinds of inertia", "Inertia of rest (jerk back when a bus starts), inertia of motion (jerk forward when it stops), inertia of direction (thrown outward on a sharp turn)"],
        ["kgf", "1 kgf = 9.8 N, the weight of 1 kg"],
        ["Lift moving up with acceleration a", "Reading on a weighing machine = m(g + a): feels heavier"],
        ["Lift moving down with acceleration a", "Reading = m(g - a): feels lighter. In free fall the reading is zero"],
        ["Cart and hanging mass (smooth table)", "a = m2 g / (m1 + m2) and T = m1 × a"],
        ["Weight in space", "Mass stays the same everywhere. Weight changes with g (on the Moon, weight is about one sixth)"],
        ["Free body diagram", "A simple drawing of one object with arrows for every force on it. Draw it first, then use F = m × a"],
      ] },
      { t: "remember", title: "Exam traps", body: <>(1) Action and reaction never cancel because they are on different bodies. (2) Constant velocity means zero net force, not zero velocity. (3) Weight is a force in N, mass is in kg. (4) A negative force or acceleration only shows direction. (5) Friction can help motion, as in walking.</> },
    ],
  },
  {
    id: "competitive-2",
    title: "11. Competitive Corner: Solved",
    category: "Advanced",
    heading: "Solved Practice Questions",
    sub: "Try each one on paper first. Then check.",
    blocks: [
      { t: "exq", n: 1, q: "A 1000 kg car moving at 20 m/s is brought to rest in 5 s. Find the average braking force.", a: "a = (0 - 20) / 5 = -4 m/s². F = 1000 × (-4) = -4000 N. The braking force is 4000 N opposite to the motion." },
      { t: "exq", n: 2, q: "A ball of mass 0.15 kg moving at 20 m/s is caught and stopped in 0.1 s. Find the force. What if the fielder stops it in 0.01 s?", a: "Change in momentum = 0.15 × 20 = 3 kg m/s. F = 3 / 0.1 = 30 N. In 0.01 s: F = 3 / 0.01 = 300 N. Ten times less time gives ten times more force." },
      { t: "exq", n: 3, q: "A bullet of mass 50 g leaves a gun of mass 3 kg at 300 m/s. Find the recoil velocity of the gun.", a: "Total momentum is zero before and after. 0.05 × 300 + 3 × v = 0. So 15 + 3v = 0 and v = -5 m/s. The gun recoils at 5 m/s opposite to the bullet." },
      { t: "exq", n: 4, q: "A 60 kg person stands on a weighing machine in a lift. What does it read when the lift accelerates upward at 2 m/s²? And downward at 2 m/s²? (g = 9.8 m/s²)", a: "Up: N = m(g + a) = 60 × (9.8 + 2) = 60 × 11.8 = 708 N. Down: N = m(g - a) = 60 × (9.8 - 2) = 60 × 7.8 = 468 N. (At rest it would show 60 × 9.8 = 588 N.)" },
      { t: "exq", n: 5, q: "A 4 kg cart on a smooth table is pulled by a string over a pulley with a 1 kg mass hanging from it. Find the acceleration and the tension. (g = 10 m/s²)", a: "Whole system mass = 4 + 1 = 5 kg. The pulling force is the weight of the hanging mass = 1 × 10 = 10 N. a = 10 / 5 = 2 m/s². Tension T = 4 × 2 = 8 N." },
      { t: "exq", n: 6, q: "A 10 kg box is on a floor with μ = 0.3. Find the friction when you push with (i) 25 N and (ii) 40 N. (g = 10 m/s²)", a: "Normal force = 10 × 10 = 100 N. Maximum friction = 0.3 × 100 = 30 N. (i) 25 N is less than 30 N, so the box does not move and friction = 25 N. (ii) 40 N is more than 30 N, so the box slides. Net force = 40 - 30 = 10 N and a = 10 / 10 = 1 m/s²." },
      { t: "exq", n: 7, q: "A rocket of mass 2000 kg has an engine push (thrust) of 30000 N. Find its initial acceleration. (g = 10 m/s²)", a: "Weight = 2000 × 10 = 20000 N downward. Net force = 30000 - 20000 = 10000 N upward. a = 10000 / 2000 = 5 m/s² upward." },
      { t: "exq", n: 8, q: "A horse pulls a cart. By the third law the cart pulls the horse back with an equal force. Then how does the cart ever move?", a: "The two forces act on different objects, so they do not cancel. The cart moves because the forward force on the cart from the horse is bigger than the friction on the cart. The horse moves because the ground pushes it forward more than the cart pulls it back." },
    ],
  },
  {
    id: "complete",
    title: "12. Topic Complete",
    category: "Complete",
    heading: "Topic Complete",
    sub: "Well done. Check what you can now do.",
    blocks: [
      { t: "done", items: [
        "I can say what a force is and name its unit.",
        "I can find the net force when forces act in the same or opposite direction.",
        "I can explain why friction acts against motion and why it also helps us walk.",
        "I can state Newton's first law and explain inertia with an example.",
        "I can use F = m × a and W = m × g to solve numerical problems.",
        "I can explain why more stopping time means less force (airbag, catching a ball).",
        "I can state Newton's third law and explain why the two forces do not cancel.",
        "I can treat two joined objects as one system and find a = F / (m1 + m2).",
      ] },
      { t: "facts", rows: [
        ["Newton's first law", "No net force, no change in motion"],
        ["Newton's second law", "F = m × a"],
        ["Newton's third law", "Equal and opposite forces on two different objects"],
        ["Weight", "W = m × g, with g = 9.8 m/s²"],
        ["System", "a = F / (m1 + m2)"],
      ] },
      { t: "remember", title: "What to do next", body: <>Go to the Question Bank for practice. Then take the Self Assessment quiz to check how well you know the topic. If you make mistakes, come back to the topic and read it again.</> },
    ],
  },
];

const ICONS: Record<string, React.ElementType> = { Force: Zap, Friction: Wind, "Laws of Motion": Scale, System: Boxes, Revision: Network, Advanced: Award, Complete: Trophy };

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
    case "netcases": return <NetForceCases />;
    case "fma": return <FmaTriangle />;
    case "graphs": return <ForceAccelGraphs />;
    case "actreact": return <ActionReactionDiagram />;
    case "bus": return <BusInertiaDiagram />;
    case "time": return <TimeForceDiagram />;
    case "recoil": return <RecoilDiagram />;
    case "mind": return <ForcesMindMap />;
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
        <div className="flex items-center gap-2"><Trophy className="w-6 h-6 text-emerald-400" /><h3 className="text-base font-black text-emerald-300">You have finished Forces</h3></div>
        <ul className="space-y-2">
          {block.items.map((it, j) => (
            <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed"><span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-500 text-slate-950 text-[12px] font-black flex items-center justify-center">✓</span><span>{it}</span></li>
          ))}
        </ul>
      </div>
    );
  }
}

interface LearnForces9Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

export function LearnForces9({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnForces9Props) {
  const [activeId, setActiveId] = useState<string>(TOPICS[0].id);
  const idx = Math.max(0, TOPICS.findIndex((t) => t.id === activeId));
  const topic = TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-forces9-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <select value={activeId} onChange={(e) => setActiveId(e.target.value)} className={`w-full min-w-0 rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
          {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><Move className="w-5 h-5 text-cyan-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>Forces</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>How forces change motion: friction and Newton's three laws.</p>
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

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-forces9-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-forces9-main p, #learn-forces9-main li, #learn-forces9-main span, #learn-forces9-main label, #learn-forces9-main div:not(.bg-gradient-to-r) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-forces9-main b, #learn-forces9-main strong, #learn-forces9-main h1, #learn-forces9-main h2, #learn-forces9-main h3, #learn-forces9-main h4, #learn-forces9-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          ${isLightMode ? `#learn-forces9-container .bg-slate-900, #learn-forces9-container .bg-\\[\\#0d1424\\], #learn-forces9-container .bg-\\[\\#0a1a1f\\], #learn-forces9-container .bg-slate-950 { background-color: #ffffff !important; border-color: #cbd5e1 !important; } #learn-forces9-container .border-slate-800 { border-color: #cbd5e1 !important; }` : ""}
        ` }} />
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <span className="text-[12px] font-black uppercase tracking-widest font-mono text-cyan-400 flex items-center gap-1.5">{React.createElement(ICONS[topic.category] || Rocket, { className: "w-3.5 h-3.5" })}{topic.category}</span>
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
