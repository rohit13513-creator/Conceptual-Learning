import type { CTopic } from "./carbonNotesTypes";

// Class VIII Science, Exploring Forces (NCERT Chapter 5). Topics 17 to 23: the Competition Corner from Rohit's notes, a step beyond the textbook
// (Newton's laws, momentum, gravitation, kinds of friction, pressure, Hooke's law, buoyant force, Coulomb's law). Same writing rules as foNotesA.ts.
// The question bank does NOT use this part: it stays inside NCERT.

export const FO_C: CTopic[] = [
  {
    id: "c1", category: "Competition Corner", title: "Force as a Vector: Balanced and Unbalanced Forces", heading: "Competition Corner: Adding and Subtracting Forces",
    sub: "Size and direction of a force, and the resultant.",
    blocks: [
      { t: "note", title: "Competition Corner", s: "These topics go a step beyond the textbook and are useful for Olympiads and other competitive tests. First be sure of the NCERT chapter. The question bank and the self assessment of this chapter stay inside NCERT." },
      { t: "key", title: "Vector quantity", s: "A **vector quantity** has both **magnitude (size) and direction**. **Force is a vector**: to describe a force we must say how big it is and in which direction it acts." },
      { t: "dia", id: "fo_resultant" },
      { t: "ol", items: [
        "Two forces in the **same direction add**: 5 N + 3 N = **8 N** in that direction.",
        "Two forces in **opposite directions subtract**: 5 N − 3 N = **2 N**, in the direction of the larger force.",
        "The single force that has the same effect as all the forces together is the **resultant force**.",
      ] },
      { t: "table", head: ["", "Balanced forces", "Unbalanced forces"], rows: [
        ["Resultant", "**Zero**", "**Not zero**"],
        ["Effect on motion", "Do **not change** the state of rest or motion", "**Change the speed or the direction** of the object"],
        ["Effect on shape", "May change the shape", "May change the shape"],
        ["Example", "A book resting on a table", "A football being kicked"],
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["Forces of 20 N to the right and 8 N to the left act on a box. Find the resultant.", "20 − 8 = **12 N to the right**."],
      ] },
    ],
  },
  {
    id: "c2", category: "Competition Corner", title: "Speed, Velocity and Acceleration", heading: "Competition Corner: Describing Motion",
    sub: "Three quantities and two formulas.",
    blocks: [
      { t: "table", head: ["Quantity", "Meaning", "Unit"], rows: [
        ["**Speed**", "Distance covered per unit time", "m per s"],
        ["**Velocity**", "Speed in a given direction (a **vector**)", "m per s"],
        ["**Acceleration**", "Rate of change of velocity", "m per s^{2}"],
      ] },
      { t: "eq", lines: ["Speed = Distance ÷ Time", "a = (v − u) ÷ t"] },
      { t: "ul", items: [
        "Here **u is the initial velocity**, **v the final velocity** and **t the time taken**.",
        "A **negative acceleration** (slowing down) is called **retardation**.",
      ] },
      { t: "qa", title: "Solved example", items: [
        ["A bus speeds up from 10 m per s to 30 m per s in 5 s. Find its acceleration.", "a = (30 − 10) ÷ 5 = 20 ÷ 5 = **4 m per s^{2}**."],
      ] },
    ],
  },
  {
    id: "c3", category: "Competition Corner", title: "Newton's Laws of Motion and Momentum", heading: "Competition Corner: Newton's Three Laws",
    sub: "Inertia, F = m × a, and action and reaction.",
    blocks: [
      { t: "dia", id: "fo_newton" },
      { t: "h", s: "First law: the law of inertia" },
      { t: "ul", items: [
        "An object **stays at rest**, or keeps **moving with uniform velocity in a straight line**, unless an **unbalanced force** acts on it.",
        "**Inertia** is the tendency of an object to **resist any change** in its state of rest or motion. **Mass is the measure of inertia**: a heavier object has more inertia.",
        "**Inertia of rest:** passengers fall **backwards** when a bus starts suddenly; dust falls off a carpet when it is beaten.",
        "**Inertia of motion:** passengers fall **forward** when a moving bus stops suddenly; an athlete runs a few steps beyond the finish line.",
        "**Inertia of direction:** passengers are pushed **outwards** when a car takes a sharp turn.",
      ] },
      { t: "h", s: "Momentum and the second law" },
      { t: "eq", lines: ["Momentum  p = m × v", "Force  F = m × a"] },
      { t: "ul", items: [
        "**Momentum** is the product of the **mass and velocity** of an object. It is a vector; its SI unit is **kg m per s**.",
        "**Second law:** the rate of change of momentum is proportional to the applied unbalanced force and takes place in the direction of the force.",
        "**1 newton** is the force that gives a mass of 1 kg an acceleration of 1 m per s^{2}. So 1 N = 1 kg m per s^{2}. In the CGS system the unit is the **dyne**: 1 N = 10^{5} dyne.",
        "**Impulse** = force × time = change in momentum (F × t = m v − m u). Increasing the **time of impact reduces the force**: a fielder pulls the hands back while catching, vehicles have shock absorbers, high jumpers land on sand or mattresses.",
      ] },
      { t: "h", s: "Third law and conservation of momentum" },
      { t: "ul", items: [
        "**Third law:** to every **action** there is an **equal and opposite reaction**. Action and reaction act on **two different objects** at the same time, so they **never cancel** each other.",
        "Examples: the **recoil of a gun**, a **rocket** moving up by pushing gases down, a **swimmer** pushing water backwards, **walking** by pushing the ground backwards, a **boat moving back** when a person jumps out.",
        "**Law of conservation of momentum:** when no external force acts, the **total momentum of a system remains constant**: m1 u1 + m2 u2 = m1 v1 + m2 v2.",
      ] },
      { t: "qa", title: "Solved examples", items: [
        ["A force gives a 5 kg object an acceleration of 2 m per s^{2}. Find the force.", "F = m × a = 5 × 2 = **10 N**."],
        ["A car of mass 1000 kg moves at 20 m per s. Find its momentum.", "p = m × v = 1000 × 20 = **20 000 kg m per s**."],
        ["A 4 kg gun fires a 0.02 kg bullet at 400 m per s. Find the recoil speed of the gun.", "Momentum before firing is zero. 0.02 × 400 = 4 × v, so 8 = 4 v and v = **2 m per s**, backwards."],
      ] },
    ],
  },
  {
    id: "c4", category: "Competition Corner", title: "Gravitation and the Acceleration due to Gravity", heading: "Competition Corner: Newton's Universal Law of Gravitation",
    sub: "G, g and W = m × g.",
    blocks: [
      { t: "ul", items: [
        "**Universal law of gravitation (Newton):** every object in the universe attracts every other object with a force **proportional to the product of their masses** and **inversely proportional to the square of the distance** between them.",
        "**G**, the universal gravitational constant, is 6.67 × 10^{-11} N m^{2} per kg^{2}.",
        "**Acceleration due to gravity (g):** the acceleration of a freely falling object. On the Earth g ≈ **9.8 m per s^{2}** (taken as **10 m per s^{2}**).",
        "**g on the Moon** is about 1.63 m per s^{2}, about **one-sixth** of that on the Earth. So the weight on the Moon is one-sixth of the weight on the Earth.",
        "**g is slightly more at the poles** than at the equator, and it **decreases with height and with depth**.",
      ] },
      { t: "eq", lines: ["F = G m1 m2 ÷ r^{2}", "Weight  W = m × g"] },
      { t: "qa", title: "Solved examples", items: [
        ["Find the weight of a 60 kg person on the Earth and on the Moon (g = 10 m per s^{2}). What is the mass on the Moon?", "On the Earth: W = 60 × 10 = **600 N**. On the Moon: 600 ÷ 6 = **100 N**. The mass stays **60 kg**."],
        ["Find the weight of a 5 kg object on the Earth (g = 10 m per s^{2}).", "W = 5 × 10 = **50 N**."],
      ] },
    ],
  },
  {
    id: "c5", category: "Competition Corner", title: "Kinds of Friction and Pressure", heading: "Competition Corner: Static, Sliding and Rolling Friction; Pressure",
    sub: "Which friction is the largest, and why a knife is sharp.",
    blocks: [
      { t: "table", head: ["Kind of friction", "When it acts", "Size"], rows: [
        ["**Static** friction", "Before the object starts moving", "The **largest**"],
        ["**Sliding** friction", "While one surface slides over another", "Less than static"],
        ["**Rolling** friction", "When an object **rolls**", "The **smallest**, so wheels and ball bearings are used"],
      ] },
      { t: "eq", lines: ["Static > Sliding > Rolling", "f = μ × N"] },
      { t: "ul", items: [
        "In f = μ × N, **μ (mu) is the coefficient of friction** (it has no unit) and **N is the normal force** (equal to the weight on a flat surface).",
        "**Fluid friction (drag)** is the friction exerted by liquids and gases. It depends on the speed, the shape and the nature of the fluid, and is reduced by **streamlined shapes**.",
      ] },
      { t: "h", s: "Pressure" },
      { t: "ul", items: [
        "**Pressure** is the **force acting per unit area** (thrust per unit area). **P = F ÷ A**. Its SI unit is the **pascal (Pa)**: 1 Pa = 1 N per m^{2}.",
        "The same force on a **smaller area** gives **more pressure**: knives are sharp and nails pointed. Schoolbags have **wide straps** and tractors **wide tyres** to reduce pressure.",
      ] },
      { t: "qa", title: "Solved examples", items: [
        ["A 500 N box rests on an area of 0.5 m^{2}. Find the pressure.", "P = 500 ÷ 0.5 = **1000 Pa**."],
        ["A 20 N force pushes a box to the right and friction of 8 N acts to the left. Find the net force.", "20 − 8 = **12 N to the right**."],
      ] },
    ],
  },
  {
    id: "c6", category: "Competition Corner", title: "Hooke's Law, Buoyant Force and Coulomb's Law", heading: "Competition Corner: Three More Laws",
    sub: "Springs, buoyancy and charges.",
    blocks: [
      { t: "ul", items: [
        "**Hooke's law:** within the elastic limit, the **extension of a spring is proportional to the force applied**. Spring balances work on this law. **F = k × x**, where k is the **spring constant** (N per m) and x the extension.",
        "**Buoyant force (Archimedes' principle):** F_{B} = V × ρ × g, where **V is the volume of liquid displaced** and **ρ (rho) its density**. An object **floats if its density is less than that of the liquid**.",
        "**Relative density** = density of a substance ÷ density of water. It has **no unit**.",
        "**Coulomb's law:** the force between two charges is **proportional to the product of the charges** and **inversely proportional to the square of the distance** between them. **F = k q1 q2 ÷ r^{2}**, where k = 9 × 10^{9} N m^{2} per C^{2}.",
        "The **SI unit of charge** is the **coulomb (C)**. The charge of an electron is −1.6 × 10^{-19} C.",
      ] },
      { t: "qa", title: "Solved examples", items: [
        ["A spring with k = 200 N per m is stretched by a 10 N weight. Find the extension.", "x = F ÷ k = 10 ÷ 200 = 0.05 m = **5 cm**."],
        ["A body displaces 0.002 m^{3} of water (density 1000 kg per m^{3}). Find the buoyant force (g = 10 m per s^{2}).", "F_{B} = 0.002 × 1000 × 10 = **20 N**."],
      ] },
    ],
  },
  {
    id: "c7", category: "Competition Corner", title: "Practice: Formula Sheet and Tricky Questions", heading: "Competition Corner: Formulas and Practice",
    sub: "Everything in one table, and ten tricky questions.",
    blocks: [
      { t: "table", head: ["Formula", "Meaning"], rows: [
        ["Speed = Distance ÷ Time", "Speed (m per s)"],
        ["a = (v − u) ÷ t", "Acceleration (m per s^{2})"],
        ["p = m × v", "Momentum (kg m per s)"],
        ["F = m × a", "Force (newton)"],
        ["W = m × g", "Weight (newton), g = 10 m per s^{2}"],
        ["f = μ × N", "Friction"],
        ["P = F ÷ A", "Pressure (pascal)"],
        ["F = k × x", "Hooke's law (spring)"],
        ["F_{B} = V × ρ × g", "Buoyant force"],
        ["F = G m1 m2 ÷ r^{2}", "Gravitation"],
        ["F = k q1 q2 ÷ r^{2}", "Coulomb's law"],
      ] },
      { t: "h", s: "Tricky questions" },
      { t: "qa", items: [
        ["Why is a heavier truck harder to stop than a light car moving at the same speed?", "It has **more mass**, so **more inertia** and more momentum."],
        ["A passenger falls forward when a moving bus stops suddenly. Which law explains it?", "The **first law (inertia of motion)**: the body tends to continue moving."],
        ["Action and reaction are equal and opposite. Why do they not cancel each other?", "They act on **two different objects**."],
        ["A 2 kg object is given an acceleration of 3 m per s^{2}. Find the force.", "F = 2 × 3 = **6 N**."],
        ["Find the pressure of 200 N acting on 0.1 m^{2}.", "P = 200 ÷ 0.1 = **2000 Pa**."],
        ["A spring stretches 5 cm under 10 N. How much does it stretch under 20 N (within the elastic limit)?", "The extension is proportional to the force, so **10 cm**."],
        ["Which is larger: the weight of a 1 kg object on Jupiter or on the Earth?", "On **Jupiter** (25.4 N against 10 N)."],
        ["A boat moves back when a person jumps out of it. Which law explains it?", "The **third law**: action and reaction."],
        ["Why do we use ball bearings in machines?", "**Rolling friction is the smallest**, so they reduce friction and wear."],
        ["Why does a high jumper land on a sand bed or a mattress?", "A **longer time of impact** gives a **smaller force**."],
      ] },
    ],
  },
];
