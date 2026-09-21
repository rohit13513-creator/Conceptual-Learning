import React, { useState } from "react";
import { Award, HelpCircle, ChevronLeft, ChevronRight, FlaskConical, Zap, Gauge, Cog, Wrench, Network, Trophy, Lightbulb, Scale, Battery } from "lucide-react";
import { WorkSignsDiagram, WorkFormulaDiagram, KineticEnergyDiagram, PotentialEnergyDiagram, EnergyBarsDiagram, PowerDiagram, LeverBalanceDiagram, SeesawDiagram, InclinedPlaneDiagram, PulleyDiagram, EnergyMindMap } from "./energy9Diagrams";

// Notes for the chapter "Work, Energy and Simple Machines". Simple words, short sentences, point by point.

const IMG_BASE = "/diagrams/energy9/";
interface Pic { file: string; alt: string; caption: string; }
type SvgKey = "signs" | "formula" | "ke" | "pe" | "bars" | "power" | "lever" | "seesaw" | "incline" | "pulley" | "mind";

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
    title: "1. Why Work and Energy?",
    category: "Work",
    heading: "Why Work, Energy and Power?",
    sub: "A simpler way to look at motion, and machines that make tasks easier.",
    blocks: [
      { t: "card", title: "Core Idea", body: [
        <>When forces change with time or act in complicated ways, Newton's laws and the kinematic equations become hard to use. The ideas of {b("work, energy and power")} give a simpler way to study such motion.</>,
        <>{b("Energy")} is the capacity to do work. It sits behind almost every activity in our daily life. We also learn about {b("simple machines")}, which help us do a task with less effort.</>,
      ] },
      { t: "img", pic: { file: "energy-sources", alt: "A person walking on food energy, a fan running on electricity and a car running on fuel", caption: "Energy for tasks comes from different sources" } },
      { t: "ul", items: [
        <>Food gives us the energy to walk.</>,
        <>Electricity gives the energy to turn a fan.</>,
        <>Fuel gives the energy to move a car.</>,
        <>In science, the words {b("work")}, {b("energy")} and {b("power")} have very exact meanings, different from everyday talk.</>,
      ] },
      { t: "h", text: "Think About These" },
      { t: "ul", items: [
        <>A child slides down a slide. How fast is the child at the bottom?</>,
        <>Will two children of different masses reach the bottom with the same speed?</>,
        <>Does the shape of the slide change the speed at the bottom? (You will find the answers in the topic on conservation of energy.)</>,
      ] },
    ],
  },
  {
    id: "work",
    title: "2. Work Done by a Force",
    category: "Work",
    heading: "Work Done by a Constant Force",
    sub: "Work happens when a force moves an object in its own direction.",
    blocks: [
      { t: "card", title: "Building the idea", body: [
        <>Lift one bag of wheat (5 kg) up by 1 m. You apply an upward force equal to its weight, {b("mg")}, and the bag moves 1 m in the direction of the force. You have done some work.</>,
        <>Lift 3 such bags one after the other to the same height: you do 3 times the work. Lift all 3 together: you need 3 times the force over the same distance, so again 3 times the work.</>,
        <>Lift one bag to 3 m instead of 1 m: 3 times the work. So more force over the same distance, or the same force over more distance, means proportionally more work.</>,
      ] },
      { t: "img", pic: { file: "work-bags", alt: "Lifting one bag, three bags one by one, three bags together, and one bag to three metres", caption: "Lifting bags to a height: more force or more distance means more work" } },
      { t: "card", title: "Definition", body: [
        <>Work done by a constant force = {b("force × displacement in the direction of the force")}.</>,
        <>{b("W = F × s")}</>,
      ] },
      { t: "svg", key: "formula", caption: "Work is force times the displacement along the force" },
      { t: "img", pic: { file: "work-direction", alt: "A force moving a box horizontally and another lifting a box vertically", caption: "The rule works for a horizontal push (a) and a vertical lift (b)" } },
      { t: "h", text: "Unit of Work" },
      { t: "ul", items: [
        <>The SI unit of work is the {b("joule")}, symbol {b("J")}.</>,
        <>{b("1 J = 1 N × 1 m")}. One joule of work is done when a force of 1 N moves an object by 1 m in the direction of the force.</>,
        <>Since 1 N = 1 kg m/s², we get {b("1 J = 1 kg m²/s²")}.</>,
        <>Work has {b("no direction")}. It is just a number with a plus or a minus sign.</>,
        <>While talking about work, always say which force does the work and on which object.</>,
      ] },
      { t: "h", text: "Work from a Graph" },
      { t: "img", pic: { file: "force-displacement-graph", alt: "Force displacement graph with a constant force of 10 N up to 1 m", caption: "Force against displacement: the shaded area is the work" } },
      { t: "ul", items: [
        <>Plot force on the y-axis and displacement (in the direction of force) on the x-axis.</>,
        <>Work done = {b("area under the graph")}. Here it is 10 N × 1 m = 10 J.</>,
        <>Even when the force is not constant, work is the area under the graph between the start and end positions.</>,
      ] },
      { t: "exq", n: 1, q: "A force of 20 N moves a box by 3 m in the direction of the force. How much work is done?", a: "W = F × s = 20 N × 3 m = 60 J." },
    ],
  },
  {
    id: "work-signs",
    title: "3. Zero, Positive and Negative Work",
    category: "Work",
    heading: "When is Work Zero, Positive or Negative?",
    sub: "The direction of the force compared to the movement decides the sign.",
    blocks: [
      { t: "h", text: "When is Work Zero?" },
      { t: "ul", items: [
        <>If the force is zero (F = 0), no work is done.</>,
        <>If the displacement is zero (s = 0), no work is done, however big the force is. Pushing a rigid wall does no work on the wall.</>,
        <>You feel tired because your muscles keep using up the body's internal energy. But in science you have done no work on the wall.</>,
        <>If the force is at a right angle (perpendicular) to the displacement, the work done by that force is zero. A girl carrying a box on level ground pushes it up (to balance its weight) while the box moves sideways. The upward force does no work.</>,
      ] },
      { t: "imgs", pics: [
        { file: "pushing-wall", alt: "A boy pushing a brick wall which does not move", caption: "Pushing a wall: no displacement, no work" },
        { file: "carrying-box", alt: "A girl carrying a box: the force is upward and the displacement is forward", caption: "Force up, movement forward: work is zero" },
      ] },
      { t: "h", text: "Positive and Negative Work" },
      { t: "ul", items: [
        <>{b("Positive work:")} the displacement is in the same direction as the force. Pushing a wheelchair forward is an example.</>,
        <>{b("Negative work:")} the displacement is opposite to the force. A goalkeeper stops a ball by pushing against its motion, so the goalkeeper does negative work on the ball.</>,
        <>Force and displacement are both vectors. Work is a plain number with a sign.</>,
      ] },
      { t: "svg", key: "signs", caption: "Same direction: positive. Opposite: negative. Right angle: zero" },
      { t: "img", pic: { file: "wheelchair-goalkeeper", alt: "A boy pushing a wheelchair (positive work) and a goalkeeper stopping a ball (negative work)", caption: "(a) Positive work on the wheelchair (b) Negative work on the ball" } },
      { t: "remember", title: "Both do work on each other", body: <>The ball and the goalkeeper push on each other with equal and opposite forces. The ball does positive work on the goalkeeper's hand, while the goalkeeper does negative work on the ball.</> },
      { t: "exq", n: 1, q: "A girl lifts a dumbbell and then slowly lowers it. When is the work she does positive, and when negative?", a: "She applies an upward force equal to the weight. While lifting, the force and displacement are both upward, so her work is positive. While lowering, the force is upward but the displacement is downward, so her work is negative." },
      { t: "exq", n: 2, q: "A goalkeeper's hand moves back 15 cm while stopping a ball with a force of 200 N. How much work does she do on the ball?", a: "The force acts opposite to the movement of the ball, so the displacement along the force is negative. W = 200 N × (-0.15 m) = -30 J." },
    ],
  },
  {
    id: "wet",
    title: "4. Work-Energy Theorem",
    category: "Energy",
    heading: "The Work-Energy Theorem",
    sub: "Work done on an object shows up as a change in its energy.",
    blocks: [
      { t: "card", title: "What is energy?", body: [
        <>An object that can do work is said to have {b("energy")}. Energy is the capacity to do work.</>,
        <>A flying cricket ball can knock down the wickets. A flowerpot on a high ledge can damage things below if it falls. Both have the capacity to do work.</>,
      ] },
      { t: "img", pic: { file: "ball-wicket-pot", alt: "A fielder throwing a ball, the ball hitting the wickets, and a flowerpot on a high ledge", caption: "The ball and the pot both have energy" } },
      { t: "ul", items: [
        <>The ball got its energy from the work the fielder did in throwing it.</>,
        <>The pot got its energy from the work done in raising it to a height.</>,
        <>When positive work is done on an object, it {b("gains energy")}. It can then use that energy to push another object and give it motion. This is called {b("transferring energy")}.</>,
      ] },
      { t: "card", title: "Work-Energy Theorem", body: [
        <>{b("Work done on an object = change in its energy")}</>,
        <>The SI unit of energy is the same as the unit of work: the {b("joule (J)")}.</>,
        <>The theorem also works for a system of objects and when the force is not constant. It helps us solve problems we could not solve easily otherwise.</>,
      ] },
      { t: "ul", items: [
        <>Positive work on an object: its energy {b("increases")}.</>,
        <>Negative work on an object: its energy {b("decreases")}.</>,
        <>Zero work: its energy does not change.</>,
      ] },
      { t: "h", text: "Example: A Carrom Shot" },
      { t: "img", pic: { file: "carrom", alt: "A carrom board with the striker, a white coin and the black coin", caption: "A carrom shot: the striker hits the white coin, which hits the black coin" } },
      { t: "ul", items: [
        <>The moving striker pushes the white coin forward: the striker does {b("positive work")} on the white coin, so the coin gains energy.</>,
        <>By Newton's third law, the white coin pushes back on the striker: it does {b("negative work")} on the striker, so the striker loses energy.</>,
        <>The same happens between the white coin and the black coin.</>,
      ] },
      { t: "remember", title: "Other ways to move energy", body: <>Doing work is only one way to transfer energy. Energy also moves as {b("heat")} (from a hot object to a cold one), by {b("radiation")} (sunlight reaching the Earth), through electric circuits, by sound waves and in nuclear reactions.</> },
    ],
  },
  {
    id: "forms",
    title: "5. Forms of Energy",
    category: "Energy",
    heading: "Forms of Energy",
    sub: "Energy has many forms and can change from one form to another.",
    blocks: [
      { t: "img", pic: { file: "forms-of-energy", alt: "Mechanical, thermal, light, sound, electrical, nuclear and chemical energy", caption: "Different forms of energy" } },
      { t: "facts", rows: [
        ["Mechanical energy", "Energy due to the motion or position of objects"],
        ["Thermal (heat) energy", "Energy that makes things warm or hot"],
        ["Light energy", "Energy that allows us to see"],
        ["Sound energy", "Energy of vibrations of air or other molecules"],
        ["Electrical energy", "Energy related to the position or motion of charges"],
        ["Nuclear energy", "Energy stored in the nuclei of atoms"],
        ["Chemical energy", "Energy stored in fuels and food in the chemical bonds between atoms"],
      ] },
      { t: "h", text: "Energy Changes Form" },
      { t: "ul", items: [
        <>A bulb changes {b("electrical energy")} into light (and some heat).</>,
        <>A water heater changes electrical energy into {b("heat")}.</>,
        <>The {b("chemical energy")} of food is changed into {b("mechanical energy")} by our muscles.</>,
        <>A ringing bell changes mechanical energy into {b("sound")}.</>,
        <>A solar panel changes light energy into electrical energy.</>,
        <>Green leaves change light energy into chemical energy (photosynthesis).</>,
      ] },
      { t: "remember", title: "Focus of this chapter", body: <>We study {b("mechanical energy")} closely because it is directly connected to the forces and motions you have already learnt.</> },
    ],
  },
  {
    id: "ke",
    title: "6. Kinetic Energy",
    category: "Energy",
    heading: "Kinetic Energy",
    sub: "The energy an object has because it is moving.",
    blocks: [
      { t: "card", title: "Definition", body: [
        <>{b("Kinetic energy")} is the energy of an object due to its {b("motion")}. A moving bicycle, a rolling ball and a running child all have it.</>,
        <>An object at rest has zero kinetic energy.</>,
      ] },
      { t: "img", pic: { file: "car-kinetic", alt: "A car at rest with zero kinetic energy and the same car moving with kinetic energy K", caption: "Work done by the force makes the car gain kinetic energy" } },
      { t: "h", text: "Getting the Formula" },
      { t: "ul", items: [
        <>Take an object of mass m. A constant force F acts on it, so it has a constant acceleration a. It starts with speed u, reaches speed v, and moves a distance s.</>,
        <>From the kinematic equation: {b("v² = u² + 2as")}, so {b("s = (v² - u²) / 2a")}.</>,
        <>Work done W = F × s = ma × s. Put in s: {b("W = ½ m (v² - u²)")}.</>,
        <>By the work-energy theorem, this work is the change in energy.</>,
        <>If the object starts from rest (u = 0), the change in energy is its kinetic energy.</>,
      ] },
      { t: "card", title: "Kinetic Energy", body: [
        <>{b("K = ½ m v²")}</>,
        <>Unit: joule (J). Kinetic energy has {b("no direction")}.</>,
      ] },
      { t: "ul", items: [
        <>Positive work is done and the speed goes up: kinetic energy {b("increases")}.</>,
        <>Negative work is done and the speed goes down: kinetic energy {b("decreases")}.</>,
        <>No work is done and the speed stays the same: kinetic energy {b("stays constant")}. So an object moving with constant velocity has constant kinetic energy.</>,
      ] },
      { t: "svg", key: "ke", caption: "Kinetic energy rises with the square of the speed" },
      { t: "remember", title: "Very common question", body: <>If the speed is doubled, the kinetic energy becomes {b("4 times")}. If the speed is tripled, it becomes 9 times. If two objects have equal kinetic energy and one has 4 times the mass, its speed is half.</> },
      { t: "h", text: "Solved Examples" },
      { t: "exq", n: 1, q: "A cricket ball of mass 0.2 kg is bowled at 154.8 km/h. Find its kinetic energy.", a: "Speed = 154.8 km/h = 154.8 × 1000 / 3600 = 43 m/s. K = ½ m v² = ½ × 0.2 × 43 × 43 = 184.9 J." },
      { t: "img", pic: { file: "aircraft-carrier", alt: "A jet aircraft landing on an aircraft carrier", caption: "A jet landing on a ship is stopped by a wire" } },
      { t: "exq", n: 2, q: "A 15000 kg jet is stopped by a wire that pulls back with a constant 367500 N over 100 m. What was its speed before the wire caught the hook?", a: "The wire does negative work: W = 367500 × (-100) = -36750000 J. This equals the change in kinetic energy: 0 - ½ × 15000 × v² . So 7500 v² = 36750000, v² = 4900, and v = 70 m/s (252 km/h)." },
    ],
  },
  {
    id: "pe",
    title: "7. Potential Energy",
    category: "Energy",
    heading: "Potential Energy",
    sub: "The energy stored in an object because of its shape or its position.",
    blocks: [
      { t: "card", title: "Stored energy", body: [
        <>Pull back a slingshot band or bend a bow, and let go. The band or bow pushes the stone or arrow forward and gives it kinetic energy. This energy was {b("stored")} in the band or bow when work was done to stretch or bend it.</>,
      ] },
      { t: "imgs", pics: [
        { file: "slingshot", alt: "A boy using a slingshot", caption: "A stretched band stores energy" },
        { file: "archery", alt: "An archer pulling a bow", caption: "A bent bow stores energy" },
      ] },
      { t: "img", pic: { file: "spring-states", alt: "A spring in its original shape, compressed, and released pushing a ball", caption: "A spring (a) at rest (b) compressed (c) released" } },
      { t: "ul", items: [
        <>To squeeze or stretch a spring, you must push against its internal forces. The work you do is stored in the spring.</>,
        <>When released, the spring goes back to its shape and gives the stored energy to the object in contact.</>,
        <>Energy can also be stored by changing the {b("arrangement of objects")} in a system. Unlike magnetic poles pulled apart, or opposite electric charges pulled apart, can store energy. When let go, they rush together and gain kinetic energy.</>,
      ] },
      { t: "img", pic: { file: "magnet-charge-pe", alt: "Two magnets and two opposite charges attracting each other", caption: "A system of two magnets or two charges" } },
      { t: "card", title: "Definition", body: [
        <>{b("Potential energy")} is the energy stored by an object because of its {b("deformation")} (shape change), or stored in a system of objects because of their {b("relative positions")}.</>,
      ] },
      { t: "h", text: "Gravitational Potential Energy" },
      { t: "ul", items: [
        <>A ball and the Earth attract each other. Lift the ball and let go: the ball and Earth rush towards each other and gain kinetic energy. So a ball lifted above the ground stores energy.</>,
        <>The Earth is so massive that it hardly moves. So we just call this the potential energy of the ball. In this chapter, potential energy usually means gravitational potential energy.</>,
      ] },
      { t: "img", pic: { file: "earth-ball-system", alt: "A ball above the ground with the gravitational force between the ball and the Earth", caption: "The ball and the Earth form one system" } },
      { t: "activity", title: "Activity: Ball and sand", aim: "To see that a higher ball has more energy.", steps: [
        "Fill a large container with loose sand.",
        "Drop a heavy ball into the sand from about 1 m. See the dent it makes.",
        "Drop it again from 2 m at a different spot. Compare the depth of the dents.",
      ], observation: "The dent is deepest when the ball is dropped from the greatest height.", conclusion: "More work is needed to raise the ball higher, so it stores more energy. The higher the ball, the greater its potential energy." },
      { t: "img", pic: { file: "sand-depressions", alt: "A sand tray with two dents made by a ball dropped from different heights", caption: "Dents made in sand by a ball dropped from different heights" } },
      { t: "h", text: "Formula for Potential Energy" },
      { t: "img", pic: { file: "raise-to-height", alt: "An object raised slowly from the ground to a height h with a force equal to mg", caption: "Raising an object slowly to height h" } },
      { t: "ul", items: [
        <>Take an object of mass m on the ground. Define its potential energy there as zero.</>,
        <>To raise it slowly to a height h, apply a force equal to its weight, {b("mg")}.</>,
        <>Work done W = force × distance = mg × h = {b("mgh")}.</>,
        <>By the work-energy theorem, this work becomes the potential energy: {b("U = mgh")}.</>,
        <>Unit: joule (J). It is valid near the Earth's surface, where g is nearly constant.</>,
      ] },
      { t: "svg", key: "pe", caption: "Potential energy grows in step with the height" },
      { t: "remember", title: "Points to note", body: <>Moving sideways at a constant height does not change the potential energy. Only a change in height does. Work done against friction is not stored as potential energy.</> },
      { t: "exq", n: 1, q: "A 200 g cricket ball is thrown up 10 m. Find its potential energy at the top. (g = 10 m/s²)", a: "m = 200 g = 0.2 kg. U = mgh = 0.2 × 10 × 10 = 20 J." },
    ],
  },
  {
    id: "conservation",
    title: "8. Conservation of Mechanical Energy",
    category: "Energy",
    heading: "Conservation of Mechanical Energy",
    sub: "Potential energy and kinetic energy change into each other, but their sum stays the same.",
    blocks: [
      { t: "card", title: "Mechanical energy", body: [
        <>{b("Mechanical energy = kinetic energy + potential energy")}</>,
        <>If no other outside force acts, the mechanical energy of an object moving under gravity stays constant. This is the {b("conservation of mechanical energy")}.</>,
      ] },
      { t: "h", text: "A Freely Falling Object" },
      { t: "img", pic: { file: "free-fall-energy", alt: "An object falling from point A at height h to point B at height h dash, then C on the ground", caption: "An object dropped from height h" } },
      { t: "ul", items: [
        <>At the top (A): PE = mgh, KE = 0. Mechanical energy = mgh.</>,
        <>After time t (at B): speed v = gt. The object has fallen ½ g t².</>,
        <>PE at B = mgh - ½ m g² t², KE at B = ½ m v² = ½ m g² t².</>,
        <>Add them: mechanical energy at B = mgh. Same as at A.</>,
        <>As it falls, PE goes down and KE goes up by exactly the same amount.</>,
        <>Just before it hits the ground, PE = 0 and KE = mgh.</>,
      ] },
      { t: "svg", key: "bars", caption: "In free fall the potential energy turns into kinetic energy. The total stays mgh" },
      { t: "activity", title: "Activity: The pendulum", aim: "To see that the energy of a swinging bob stays nearly the same.", steps: [
        "Set up a simple pendulum. Paste a white sheet behind it and draw a horizontal line at the level of the raised bob.",
        "Take the bob to one side (point P), at the level of the line, and let it go.",
        "Watch the extreme points of the first few swings. Does the bob reach the line again?",
      ], observation: "The bob reaches almost the same height on the other side. At the lowest point Q it has only kinetic energy. At the extreme points P and R it has only potential energy.", conclusion: "The mechanical energy of the bob stays almost constant. In real life the pendulum slowly stops because of friction at the support and air resistance." },
      { t: "img", pic: { file: "pendulum", alt: "A pendulum with points P and R at the ends and Q at the bottom", caption: "Pendulum: PE at the ends, KE at the bottom" } },
      { t: "h", text: "Speed at the Bottom of a Slide" },
      { t: "ul", items: [
        <>Child of mass m at the top of a slide of height h: PE = mgh.</>,
        <>At the bottom (ignoring friction), all of it becomes KE: ½ m v² = mgh.</>,
        <>So {b("v = √(2gh)")}.</>,
        <>The speed depends only on the height h. It does {b("not depend on the mass")} of the child or on the {b("shape")} of the slide. That answers the questions at the start of the chapter: a taller slide gives a bigger speed at the bottom.</>,
      ] },
      { t: "img", pic: { file: "escape-ramp", alt: "An escape ramp beside a highway", caption: "An escape ramp filled with sand or gravel" } },
      { t: "ul", items: [
        <>Escape ramps are sloping tracks with sand or gravel that stop trucks whose brakes have failed. The truck's kinetic energy is used up as it climbs (potential energy) and as the sand pushes back (negative work).</>,
      ] },
      { t: "exq", n: 1, q: "A truck of 10000 kg moving at 20 m/s enters an escape ramp inclined at 30 degrees. The sand pushes back with 50000 N. For every 2 m along the ramp the truck rises 1 m. How long must the ramp be? (g = 10 m/s²)", a: "Start: KE = ½ × 10000 × 20² = 2000000 J, PE = 0. Let the distance along the ramp be d. Height gained = d/2, so PE at the end = 10000 × 10 × d/2 = 50000 d. Sand does work = -50000 d. Work = change in energy: -50000 d = 50000 d - 2000000. So 100000 d = 2000000 and d = 20 m." },
      { t: "img", pic: { file: "roller-coaster", alt: "A ball roller coaster with peaks A, B, C, D and E getting lower", caption: "A roller coaster in a science park: each peak is lower than the one before" } },
      { t: "ul", items: [
        <>A ball released at the top has the most PE. At the low points it has the most KE.</>,
        <>Later peaks are lower because some mechanical energy is lost as heat and sound due to friction and air drag.</>,
      ] },
      { t: "remember", title: "The bigger picture", body: <>Mechanical energy is only one part of the story. The total energy of an object or system on which no outside force acts stays constant. Energy is never created or destroyed, only changed from one form to another.</> },
    ],
  },
  {
    id: "power",
    title: "9. Power",
    category: "Power",
    heading: "Power",
    sub: "How fast work is done.",
    blocks: [
      { t: "card", title: "Definition", body: [
        <>Running up the stairs in 1 minute feels very different from walking up in 5 minutes, though the work done is the same. The difference is {b("power")}.</>,
        <>{b("Power is the rate at which work is done.")}</>,
        <>{b("P = W / t")} (average power = work done divided by time taken)</>,
      ] },
      { t: "svg", key: "power", caption: "The same work in less time needs more power" },
      { t: "ul", items: [
        <>SI unit: the {b("watt (W)")}. {b("1 W = 1 J/s")}.</>,
        <>More work in the same time needs more power.</>,
        <>The same work in a shorter time also needs more power.</>,
        <>Bigger units: 1 kilowatt (kW) = 1000 W.</>,
        <>{b("1 horsepower (hp) = 746 W")}. It is used for car engines and water pumps. It was named when engines were compared with real horses that pulled carriages.</>,
        <>The watt is named after {b("James Watt")}, who invented an efficient steam engine.</>,
      ] },
      { t: "h", text: "Solved Examples" },
      { t: "exq", n: 1, q: "A weightlifter lifts a 75 kg mass by 2 m in 5 s. What power does she need? (g = 10 m/s²)", a: "Work = mgh = 75 × 10 × 2 = 1500 J. Power = 1500 / 5 = 300 W." },
      { t: "exq", n: 2, q: "A car of 1000 kg starts from rest and reaches 72 km/h in 10 s. Find the engine power for this start.", a: "72 km/h = 20 m/s. Work done = change in KE = ½ × 1000 × 20² - 0 = 200000 J. Power = 200000 / 10 = 20000 W." },
      { t: "remember", title: "Remember", body: <>Energy and work are measured in joules. Power is measured in watts. Do not mix them up.</> },
    ],
  },
  {
    id: "machines",
    title: "10. Simple Machines",
    category: "Machines",
    heading: "Simple Machines and Mechanical Advantage",
    sub: "Devices that make a task easier. They do not reduce the total work.",
    blocks: [
      { t: "card", title: "What is a simple machine?", body: [
        <>The total work needed for a task cannot be reduced. But it can be made easier by changing the {b("size")} or the {b("direction")} of the force we apply. Devices that do this are called {b("simple machines")}.</>,
        <>We study three: the {b("pulley")}, the {b("inclined plane")} and the {b("lever")}.</>,
      ] },
      { t: "facts", rows: [
        ["Effort", "The force we apply to the machine"],
        ["Load", "The force that must be overcome (for example the weight of the object)"],
        ["Mechanical advantage (MA)", "Load / effort. It shows by how many times the machine multiplies our force"],
      ] },
      { t: "card", title: "Mechanical Advantage", body: [
        <>{b("MA = load / effort")}</>,
        <>MA has no unit, since it is a ratio of two forces.</>,
        <>MA more than 1 means a small effort moves a big load. MA = 1 means the machine only changes the direction of the force.</>,
      ] },
      { t: "remember", title: "Golden rule", body: <>A machine does not create energy. The work we put in is equal to the useful work done on the load (ignoring friction). What we gain in force, we pay for in distance.</> },
    ],
  },
  {
    id: "pulley",
    title: "11. Pulley",
    category: "Machines",
    heading: "The Pulley",
    sub: "A grooved wheel that guides a rope.",
    blocks: [
      { t: "img", pic: { file: "pulley", alt: "A single pulley wheel with a groove", caption: "A pulley: a wheel with a groove for the rope" } },
      { t: "ul", items: [
        <>A {b("pulley")} is a wheel with a groove that guides a rope.</>,
        <>A flag is raised by pulling a rope downward while the flag goes up. This uses a pulley fixed at the top.</>,
        <>A {b("fixed pulley")} does not reduce the force. It only {b("changes its direction")}. Pulling down is easier for us than lifting up.</>,
        <>Effort = load, so the mechanical advantage of a fixed pulley is {b("1")}.</>,
      ] },
      { t: "img", pic: { file: "pulley-direct-vs-pulley", alt: "Pulling a load up directly and using a pulley", caption: "Lifting a load (a) directly and (b) using a pulley" } },
      { t: "h", text: "Movable Pulleys" },
      { t: "ul", items: [
        <>In a {b("movable pulley")} the load hangs from the pulley. One end of the rope is fixed and the other end is pulled.</>,
        <>A movable pulley, or a system of pulleys, can have an MA {b("greater than 1")}. It can lift a heavy load with a smaller effort.</>,
        <>Pulleys are used in lifts (elevators) and cranes.</>,
      ] },
      { t: "img", pic: { file: "pulley-system", alt: "A system with a fixed pulley and a movable pulley lifting a load", caption: "A system of one fixed and one movable pulley" } },
      { t: "svg", key: "pulley", caption: "Fixed pulley changes the direction. Movable pulley also cuts the effort" },
    ],
  },
  {
    id: "incline",
    title: "12. Inclined Plane",
    category: "Machines",
    heading: "The Inclined Plane",
    sub: "A slope that lets us raise a load with a smaller force.",
    blocks: [
      { t: "card", title: "Why use a ramp?", body: [
        <>Lifting a heavy box straight up needs a force equal to its weight. Pushing it up a smooth sloping plank needs a smaller force.</>,
      ] },
      { t: "img", pic: { file: "box-lift-ramp", alt: "A box lifted onto a truck directly and pushed up a ramp", caption: "A box (a) lifted vertically (b) pushed up a ramp" } },
      { t: "activity", title: "Activity: Cart on a plank", aim: "To see how the slope of a plank changes the force needed.", steps: [
        "Take a smooth plank about 1.5 m long, a toy cart and a spring balance. Put a pile of books about 0.5 m high.",
        "Lift the cart straight up to the top of the pile with the spring balance. Note the reading. This is the weight of the cart.",
        "Now pull the cart up along the plank slowly. Note the reading.",
        "Make the plank less steep (longer) and repeat. Compare the readings.",
      ], observation: "The pull along the plank is smaller than the vertical lift. The less steep the plank, the smaller the force needed, but the longer the path.", conclusion: "A longer, gentler slope needs less force but the force acts over a larger distance. The total work stays the same." },
      { t: "img", pic: { file: "cart-plank", alt: "A cart pulled up a plank with a spring balance on a steep and a gentle slope", caption: "Measuring the pull along (a) a shorter and (b) a longer plank" } },
      { t: "img", pic: { file: "incline-lengths", alt: "A load lifted vertically, along a slope, and along a longer slope", caption: "Longer slope: smaller force, larger distance" } },
      { t: "h", text: "Mechanical Advantage of an Inclined Plane" },
      { t: "ul", items: [
        <>Let the mass be m, the load be mg, the height be h and the length of the slope be L. Let the effort be F.</>,
        <>Work done by us = F × L (moving at constant speed).</>,
        <>Potential energy gained = mgh.</>,
        <>Ignoring friction, F × L = mgh, so mg / F = L / h.</>,
        <>{b("MA = load / effort = L / h")}</>,
        <>L is bigger than h, so MA is more than 1. A longer slope (shallower angle) gives a bigger MA.</>,
      ] },
      { t: "svg", key: "incline", caption: "Inclined plane: F × L = mgh, so MA = L / h" },
      { t: "exq", n: 1, q: "A ramp of width 40 cm helps a person raise an object over a step 30 cm high. Find the MA of the ramp.", a: "The ramp forms a right-angled triangle with sides 30 cm and 40 cm. The slope length L = 50 cm. MA = L / h = 50 / 30 = 1.67." },
      { t: "imgs", pics: [
        { file: "ramp-triangle", alt: "A right angled triangle with height 30 cm, base 40 cm and slope 50 cm", caption: "The ramp triangle: 30 cm, 40 cm, 50 cm" },
        { file: "ladders", alt: "A slanted ladder and an upright ladder against a wall", caption: "A slanted ladder is easier to climb than an upright one" },
      ] },
      { t: "ul", items: [
        <>Roads on hills wind around in gentle slopes instead of going straight up. A longer path means a smaller force is needed.</>,
        <>An inclined ladder is easier to climb than a vertical one for the same reason.</>,
      ] },
    ],
  },
  {
    id: "lever",
    title: "13. Lever",
    category: "Machines",
    heading: "The Lever",
    sub: "A rigid bar that turns about a fixed point.",
    blocks: [
      { t: "activity", title: "Activity: Lift a stapler with an eraser", aim: "To see how a lever lets a light object lift a heavy one.", steps: [
        "Place a 30 cm scale over a pencil, so the pencil is near one end of the scale.",
        "Put a stapler on the end near the pencil.",
        "Put one eraser on the other end. Add another eraser if the stapler does not lift.",
      ], observation: "A light eraser can lift a much heavier stapler.", conclusion: "The scale worked as a lever, a simple machine that multiplies force." },
      { t: "img", pic: { file: "lever-scale-stapler", alt: "A stapler lifted by an eraser using a scale resting on a pencil", caption: "A heavy stapler lifted by a light eraser" } },
      { t: "card", title: "Parts of a Lever", body: [
        <>A {b("lever")} is a rigid bar that can turn about a fixed point.</>,
        <>{b("Fulcrum:")} the fixed point about which the lever turns.</>,
        <>{b("Load:")} the force to be overcome.</>,
        <>{b("Effort:")} the force we apply.</>,
        <>{b("Effort arm:")} distance of the effort from the fulcrum. {b("Load arm:")} distance of the load from the fulcrum.</>,
      ] },
      { t: "img", pic: { file: "lever-parts", alt: "A lever lifting a rock showing effort, load, fulcrum, effort arm and load arm", caption: "A lever used to lift a heavy rock" } },
      { t: "ul", items: [
        <>The end where the small force F1 acts moves a large distance d1. The other end, where the large force F2 acts, moves a small distance d2.</>,
        <>Work is passed from one end to the other: {b("F1 × d1 = F2 × d2")}.</>,
        <>A longer effort arm gives a bigger force at the load.</>,
        <>A lever reduces the force needed, but not the total work.</>,
      ] },
      { t: "activity", title: "Activity: A beam balance", aim: "To find the rule for balancing a lever.", steps: [
        "Tie a string at the middle of a long scale and hang it so it swings freely. Hang a paper cup at each end.",
        "Put 1 coin in each cup. The beam stays level.",
        "Put 2 coins in the right cup. The beam tilts. Slide that cup closer to the middle until it balances. Measure its distance.",
        "Repeat with 4 and 8 coins. Note every distance in a table.",
      ], observation: "The beam balances when (coins on left × distance on left) equals (coins on right × distance on right).", conclusion: "Effort × effort arm = load × load arm." },
      { t: "img", pic: { file: "beam-balance-cups", alt: "A scale hung by a string with two paper cups at the ends", caption: "A beam balance made from a scale and two cups" } },
      { t: "card", title: "Law of the Lever", body: [
        <>{b("Effort × effort arm = load × load arm")}</>,
        <>{b("MA = load / effort = effort arm / load arm")}</>,
        <>A longer effort arm means a bigger mechanical advantage.</>,
      ] },
      { t: "svg", key: "lever", caption: "A lever in balance" },
      { t: "h", text: "The Seesaw" },
      { t: "img", pic: { file: "seesaw", alt: "A seesaw with seats A, B, D and E and the fulcrum at C", caption: "A seesaw with four seats. The fulcrum is at C" } },
      { t: "exq", n: 1, q: "A seesaw has seats A, B, D, E with the fulcrum at C. AC = EC = 2 m and BC = DC = 1 m. Where should children of 15 kg and 30 kg sit to balance it?", a: "Put the 15 kg child on A, 2 m from the fulcrum. Let the 30 kg child sit L away: 15 × 2 = 30 × L, so L = 1 m. The 30 kg child sits on seat D." },
      { t: "svg", key: "seesaw", caption: "Seesaw sum: 15 × 2 = 30 × 1" },
      { t: "ul", items: [
        <>Use a spoon to open a can lid: the long handle gives a big effort arm and a big force at the lid.</>,
        <>To cut something hard with scissors, put it close to the fulcrum. The load arm becomes short, so the MA is large.</>,
      ] },
      { t: "img", pic: { file: "spoon-lid", alt: "A spoon used as a lever to open the lid of a can", caption: "Opening a lid with a spoon" } },
      { t: "h", text: "Three Classes of Levers" },
      { t: "img", pic: { file: "lever-classes", alt: "Table of Class I, II and III levers with examples", caption: "Classes of levers" } },
      { t: "compare", left: "Class of lever", right: "Position and examples", rows: [
        ["Class I", "Fulcrum in between. Scissors, crowbar, pliers, balance scale, seesaw"],
        ["Class II", "Load in between. Lemon squeezer, wheelbarrow, bottle opener"],
        ["Class III", "Effort in between. Tongs, tweezers, broom, hammer, oar"],
      ] },
      { t: "remember", title: "Machines in machines", body: <>Many daily machines are made of two or more simple machines. Next time, try to spot the levers, pulleys and inclined planes in them.</> },
    ],
  },
  {
    id: "daily",
    title: "14. Energy in Daily Life",
    category: "Machines",
    heading: "Energy in Everyday Life",
    sub: "Watermills, dams, and why no machine can run forever.",
    blocks: [
      { t: "card", title: "The gharat (panchakki)", body: [
        <>In the Himalayan region, water flowing downhill turns its {b("potential energy into kinetic energy")}.</>,
        <>Water starts from the top (A) and gains speed down the pipe. Its kinetic energy turns the wheel (B). The wheel is joined to the grinding stone (C) above it.</>,
        <>In modern times, water stored in a dam is used the same way to make {b("electricity")}.</>,
      ] },
      { t: "img", pic: { file: "watermill", alt: "A traditional watermill showing water pipe A, wheel B and grinding stone C", caption: "A watermill (gharat or panchakki)" } },
      { t: "h", text: "Perpetual Motion" },
      { t: "ul", items: [
        <>A perpetual machine would keep doing useful work forever without any fuel or electricity. Many designs with wheels, weights or magnets have been tried. None works.</>,
        <>Every real machine has friction and air drag. They turn some useful energy into heat and sound. So the machine slows down and stops unless we keep giving it energy.</>,
        <>Machines do not create energy. They only help us use it better.</>,
      ] },
      { t: "h", text: "Try It Yourself" },
      { t: "ul", items: [
        <>Make a pen-refill launcher with a rubber band. Stretch the band by different amounts and see how the refill's range changes. This shows elastic potential energy turning into kinetic energy.</>,
        <>Build a small model with a lever, a pulley and a ramp. Measure effort and load and find the mechanical advantage.</>,
      ] },
    ],
  },
  {
    id: "mindmap",
    title: "15. Mind Map",
    category: "Revision",
    heading: "Mind Map of the Chapter",
    sub: "The whole chapter on one page.",
    blocks: [
      { t: "svg", key: "mind", caption: "Mind map: work, energy and simple machines" },
      { t: "h", text: "Formulas at a Glance" },
      { t: "facts", rows: [
        ["Work", "W = F × s (in joule)"],
        ["Kinetic energy", "K = ½ m v²"],
        ["Potential energy", "U = m g h"],
        ["Mechanical energy", "KE + PE, constant when only gravity acts"],
        ["Speed after falling h", "v = √(2gh)"],
        ["Power", "P = W / t (in watt)"],
        ["Mechanical advantage", "Load / effort"],
        ["Inclined plane", "MA = L / h"],
        ["Lever", "Effort × effort arm = load × load arm"],
      ] },
    ],
  },
  {
    id: "competitive-1",
    title: "16. Competitive Corner: Ideas",
    category: "Advanced",
    heading: "Competitive Corner",
    sub: "The main chapter is enough for school exams. These ideas take you one step further.",
    blocks: [
      { t: "card", title: "Work when force is at an angle", body: [
        <>If a force F acts at an angle θ to the displacement s, the work done is {b("W = F s cos θ")}. At θ = 0 the work is F s (maximum). At θ = 90° the work is zero. At θ = 180° the work is -F s.</>,
        <>Pulling a sled with a rope at an angle: only the part of the force along the ground, F cos θ, does work.</>,
      ] },
      { t: "card", title: "Kinetic energy and momentum", body: [
        <>{b("Momentum")} p = m v. Kinetic energy K = p² / 2m = ½ p v.</>,
        <>Two objects with the same momentum: the lighter one has more kinetic energy. Two objects with the same kinetic energy: the heavier one has more momentum.</>,
        <>Stopping distance: work by the brakes equals the kinetic energy, so F × d = ½ m v². If the speed doubles, the stopping distance becomes {b("4 times")} for the same braking force. This is why speed limits matter.</>,
      ] },
      { t: "card", title: "Conservative forces", body: [
        <>For gravity, the work done depends only on the start and end heights, not on the path. Such forces are called {b("conservative")}. Potential energy exists for them.</>,
        <>Friction is not conservative. The work it does depends on the path and turns into heat.</>,
      ] },
      { t: "facts", rows: [
        ["Elastic potential energy", "For a spring with stiffness k stretched by x: U = ½ k x²"],
        ["Efficiency", "Useful work out / work in. Real machines always have efficiency less than 100 percent"],
        ["Velocity ratio (VR)", "Distance moved by effort / distance moved by load. MA = VR only when there is no friction"],
        ["Pulley systems", "An ideal system with n supporting rope strands has MA = n"],
        ["Kilowatt hour (kWh)", "A unit of energy: 1 kWh = 3.6 × 10⁶ J. Electricity bills use it (1 unit)"],
        ["Escape velocity idea", "Energy conservation is also used to find the speed needed to leave the Earth"],
        ["Power and speed", "For a steady force, P = F × v. At the same power, a bigger force means a smaller speed"],
        ["Hydro power", "A dam stores potential energy. Power = (mass of water per second) × g × h"],
        ["Change in PE for a slope", "Depends only on the height gained: mgh, whatever the length of the slope"],
        ["Free-fall check", "An object dropped from rest falls 5 m in 1 s and has speed 10 m/s (with g = 10)"],
      ] },
      { t: "remember", title: "Exam traps", body: <>(1) Work needs displacement in the direction of the force. (2) A force at right angles does no work. (3) KE depends on v squared, not on v. (4) Mechanical advantage is a ratio and has no unit. (5) A machine never gives more work than it takes in. (6) On a slide the final speed does not depend on mass or on the shape.</> },
    ],
  },
  {
    id: "competitive-2",
    title: "17. Competitive Corner: Solved",
    category: "Advanced",
    heading: "Solved Practice Questions",
    sub: "Try each one on paper first. Then check.",
    blocks: [
      { t: "exq", n: 1, q: "A body of mass 2 kg is moving at 3 m/s. Its speed is increased to 5 m/s. How much work is done on it?", a: "Work = change in kinetic energy = ½ × 2 × (5² - 3²) = 1 × (25 - 9) = 16 J." },
      { t: "exq", n: 2, q: "A 1000 kg car moving at 20 m/s brakes with a force of 5000 N. How far does it go before it stops? What if the speed is 40 m/s?", a: "KE = ½ × 1000 × 400 = 200000 J. Distance = 200000 / 5000 = 40 m. At 40 m/s: KE = 800000 J and distance = 160 m. Double the speed gives 4 times the distance." },
      { t: "exq", n: 3, q: "A pump lifts 600 kg of water per minute to a tank 20 m high. Find the power of the pump. (g = 10 m/s²)", a: "Work per minute = mgh = 600 × 10 × 20 = 120000 J. Power = 120000 / 60 = 2000 W (2 kW)." },
      { t: "exq", n: 4, q: "A ball is dropped from 20 m. Find its speed when it has fallen 15 m, using energy. (g = 10 m/s²)", a: "PE lost = m × 10 × 15 = 150 m. This becomes KE: ½ m v² = 150 m, so v² = 300 and v = 17.3 m/s (about 17)." },
      { t: "exq", n: 5, q: "A block of 5 kg is pushed up a smooth slope 4 m long to a height of 1 m. Find the effort needed and the MA. (g = 10 m/s²)", a: "F × L = mgh, so F × 4 = 5 × 10 × 1 = 50 and F = 12.5 N. Load = 50 N. MA = 50 / 12.5 = 4 = L / h." },
      { t: "exq", n: 6, q: "A crowbar 1.2 m long has its fulcrum 20 cm from the load end. What load can be lifted with an effort of 100 N at the other end?", a: "Load arm = 0.2 m, effort arm = 1.2 - 0.2 = 1.0 m. Load × 0.2 = 100 × 1.0, so load = 500 N. MA = 5." },
      { t: "exq", n: 7, q: "A 2 kg mass is thrown up at 10 m/s. Find the maximum height and the PE at the top. Ignore air. (g = 10 m/s²)", a: "KE at the start = ½ × 2 × 100 = 100 J. At the top all of it is PE = 100 J. mgh = 100, so h = 100 / 20 = 5 m." },
      { t: "exq", n: 8, q: "A 60 kg boy climbs a 5 m high staircase in 10 s. Find his power. (g = 10 m/s²)", a: "Work = mgh = 60 × 10 × 5 = 3000 J. Power = 3000 / 10 = 300 W." },
    ],
  },
  {
    id: "complete",
    title: "18. Chapter Complete",
    category: "Complete",
    heading: "Chapter Complete",
    sub: "Well done. Check what you can now do.",
    blocks: [
      { t: "done", items: [
        "I can define work, use W = F × s, and say when work is zero, positive or negative.",
        "I can state the work-energy theorem and name the forms of energy.",
        "I can write and use K = ½ m v², and explain why doubling the speed gives 4 times the energy.",
        "I can write and use U = mgh, and explain stored energy in springs, bows and magnets.",
        "I can explain conservation of mechanical energy and find the speed at the bottom of a slide.",
        "I can define power and use P = W / t with watt and horsepower.",
        "I can explain effort, load and mechanical advantage.",
        "I can explain the fixed pulley, the inclined plane (MA = L / h) and the lever (effort × effort arm = load × load arm).",
      ] },
      { t: "facts", rows: [
        ["Work-energy theorem", "Work done = change in energy"],
        ["Kinetic energy", "½ m v²"],
        ["Potential energy", "m g h"],
        ["Power", "W / t"],
        ["Machine rule", "A machine changes force and distance, never the total work"],
      ] },
      { t: "remember", title: "What to do next", body: <>Go to the Question Bank for practice. Then take the Self Assessment quiz to check how well you know the chapter. If you make mistakes, come back to the topic and read it again.</> },
    ],
  },
];

const ICONS: Record<string, React.ElementType> = { Work: Gauge, Energy: Battery, Power: Zap, Machines: Cog, Revision: Network, Advanced: Award, Complete: Trophy };

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
    case "signs": return <WorkSignsDiagram />;
    case "formula": return <WorkFormulaDiagram />;
    case "ke": return <KineticEnergyDiagram />;
    case "pe": return <PotentialEnergyDiagram />;
    case "bars": return <EnergyBarsDiagram />;
    case "power": return <PowerDiagram />;
    case "lever": return <LeverBalanceDiagram />;
    case "seesaw": return <SeesawDiagram />;
    case "incline": return <InclinedPlaneDiagram />;
    case "pulley": return <PulleyDiagram />;
    case "mind": return <EnergyMindMap />;
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
        <div className="flex items-center gap-2"><Trophy className="w-6 h-6 text-emerald-400" /><h3 className="text-base font-black text-emerald-300">You have finished Work and Energy</h3></div>
        <ul className="space-y-2">
          {block.items.map((it, j) => (
            <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed"><span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-500 text-slate-950 text-[12px] font-black flex items-center justify-center">✓</span><span>{it}</span></li>
          ))}
        </ul>
      </div>
    );
  }
}

interface LearnEnergy9Props {
  isLightMode?: boolean;
  onCompleteNotes?: () => void;
  onGoToSelfAssessment?: () => void;
}

export function LearnEnergy9({ isLightMode = false, onCompleteNotes, onGoToSelfAssessment }: LearnEnergy9Props) {
  const [activeId, setActiveId] = useState<string>(TOPICS[0].id);
  const idx = Math.max(0, TOPICS.findIndex((t) => t.id === activeId));
  const topic = TOPICS[idx];
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg border font-bold text-[13.5px] cursor-pointer transition ${isLightMode ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm" : "bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700"}`;

  return (
    <div className={`flex-1 flex flex-col md:flex-row overflow-hidden h-full transition-colors duration-300 ${isLightMode ? "bg-slate-50" : "bg-[#060b14]"}`} id="learn-energy9-container">
      <div className={`sticky top-0 shrink-0 z-20 p-3 md:hidden w-full ${isLightMode ? "bg-white/95 border-b border-slate-200" : "bg-[#0d1424]/95 border-b border-slate-800"}`}>
        <select value={activeId} onChange={(e) => setActiveId(e.target.value)} className={`w-full min-w-0 rounded-lg border px-2 py-2 text-sm font-bold ${isLightMode ? "bg-white border-slate-300 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-100"}`}>
          {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <aside className={`hidden md:flex md:w-80 shrink-0 flex-col overflow-y-auto select-none ${isLightMode ? "bg-white border-r border-slate-200" : "bg-[#0d1424] border-r border-[#1e293b]"}`}>
        <div className={`p-4 border-b ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
          <div className="flex items-center gap-2"><Scale className="w-5 h-5 text-cyan-500" /><h3 className={`text-base font-black tracking-wider uppercase ${isLightMode ? "text-slate-800" : "text-slate-100"}`}>Work and Energy</h3></div>
          <p className={`text-[13.5px] mt-1 font-semibold ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>Work, kinetic and potential energy, power and simple machines.</p>
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

      <main className={`flex-1 overflow-y-auto px-5 py-8 md:px-10 ${isLightMode ? "bg-white" : "bg-[#060b14]"}`} id="learn-energy9-main">
        <style dangerouslySetInnerHTML={{ __html: `
          #learn-energy9-main p, #learn-energy9-main li, #learn-energy9-main span, #learn-energy9-main label, #learn-energy9-main div:not(.bg-gradient-to-r) { color: ${isLightMode ? "#334155" : "#f1f5f9"}; }
          #learn-energy9-main b, #learn-energy9-main strong, #learn-energy9-main h1, #learn-energy9-main h2, #learn-energy9-main h3, #learn-energy9-main h4, #learn-energy9-main h5 { color: ${isLightMode ? "#0f172a" : "#ffffff"}; }
          ${isLightMode ? `#learn-energy9-container .bg-slate-900, #learn-energy9-container .bg-\\[\\#0d1424\\], #learn-energy9-container .bg-\\[\\#0a1a1f\\], #learn-energy9-container .bg-slate-950 { background-color: #ffffff !important; border-color: #cbd5e1 !important; } #learn-energy9-container .border-slate-800 { border-color: #cbd5e1 !important; }` : ""}
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
