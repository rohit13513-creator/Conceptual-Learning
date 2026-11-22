import type { CTopic } from "./carbonNotesTypes";

// Class VIII Science, Exploring Forces (NCERT Chapter 5). Topics 1 to 8: force, its effects, contact forces and friction, the magnetic force.
// In every text: **bold** makes bold, m^{2} gives a superscript. A slash is never used (the screen would show a fraction): "per", "or" and ÷ are used.

export const FO_A: CTopic[] = [
  {
    id: "f1", category: "Force", title: "What Is a Force?", heading: "What Is a Force? Push and Pull",
    sub: "A windy day, a cycle ride and the box you move.",
    blocks: [
      { t: "p", s: "It was a windy day. **Sonali and Ragini** were riding their bicycles. The wind pushed against them, so they had to **push the pedals harder**. On a long path to a hilltop some parts were rough and **hard to pedal**, and some parts smooth. On the way back, passing a herd of sheep, they **pressed the bicycle bells** and **turned the handles**. Coming down the slope they moved at a great speed **without pedalling**. Something seemed to be **pulling them downhill**. What could it be? This chapter explores such forces." },
      { t: "note", title: "Probe and ponder: think about these", s: "Why does it feel **harder to pedal a bicycle uphill** than on flat ground? Why is it **easier to slip on a wet surface**? Why do we feel **light or floating** just after a swing passes its highest point and begins to come down? You will find the answers in this chapter." },
      { t: "act", title: "Activity 5.1: Moving a box",
        steps: ["Take a large cardboard box.", "Try moving the box in as many different ways as you can think of."],
        see: ["You can **push** the box, **pull** it, or **lift (pull up) and carry** it."],
        why: ["In every way you moved the box, you had to apply a **push or a pull** on it. The push or pull applied on an object is called a **force**."] },
      { t: "dia", id: "fo_pushpull" },
      { t: "key", title: "Force", s: "A **force** is a **push or a pull** on an object. Its **SI unit is the newton**, written with a small 'n' as newton, and its symbol is **N**." },
      { t: "qa", title: "Check yourself", items: [
        ["What is a force?", "A **push or a pull** on an object."],
        ["Write the SI unit of force and its symbol.", "The **newton**, symbol **N**."],
      ] },
    ],
  },
  {
    id: "f2", category: "Effects of force", title: "Effects of a Force", heading: "What Can a Force Do to an Object?",
    sub: "Start, stop, speed up, turn and change the shape.",
    blocks: [
      { t: "act", title: "Activity 5.2: Actions and their effects",
        steps: ["Think of situations where a force (push or pull) is applied and list them in a table.", "Write the effect of the force in each situation."],
        see: ["**Holding a moving bicycle from behind:** a pull that stops it or decreases its speed.", "**Hitting a moving ball with a bat:** a push that changes the direction of the ball.", "**Pressing an inflated balloon:** a push that changes the shape of the balloon."],
        why: ["A force can make an object **move from rest**, **change its speed**, **change its direction** or **change its shape**."] },
      { t: "dia", id: "fo_effects" },
      { t: "ul", items: [
        "Everyday examples: opening a **drawer**, stretching a **rubber band**, a fielder **stopping a ball**, **kicking** a football, applying **brakes** on a bicycle, **rolling a chapati**, turning the **steering handle** of an autorickshaw.",
        "A force may cause **some or all** of these effects together. A fielder stopping a ball changes its speed and direction.",
        "None of these changes takes place **without the action of a force**. So an object whose speed or direction is changing always has a force acting on it.",
      ] },
      { t: "note", title: "A step further: an object at rest", s: "Suppose an object is **at rest**. Does it mean that **no force** is acting on it? It means that the forces acting on the object are **balancing one another**. You will learn about balanced forces in higher classes." },
      { t: "qa", title: "Check yourself", items: [
        ["Name four effects a force can have on an object.", "It can **move an object from rest**, **change its speed**, **change its direction** and **change its shape**."],
        ["A friend holds your moving bicycle from behind. Is it a push or a pull, and what is the effect?", "It is a **pull**; it **stops the bicycle or decreases its speed**."],
      ] },
    ],
  },
  {
    id: "f3", category: "Interaction", title: "Force as an Interaction", heading: "Are Forces an Interaction Between Two or More Objects?",
    sub: "Why your hand feels the table too.",
    blocks: [
      { t: "p", s: "When you **push a table**, your hand is one object applying force on another object, the table. We say that your hand and the table are **two objects interacting** with each other. Think of all the actions of the last topic: in each, **two objects interact**." },
      { t: "dia", id: "fo_interaction" },
      { t: "key", title: "Force is an interaction", s: "A **force is a push or a pull on an object resulting from the object's interaction with another object**. **At least two objects must interact** for a force to come into play." },
      { t: "note", title: "A step further", s: "When you pushed the table, did you feel a **force on your hand** too? The moment you stopped pushing, the force on your hand disappeared. Whenever **two objects interact, each object experiences a force from the other**. As soon as the interaction ceases, the two objects **no longer experience the force**." },
      { t: "qa", title: "Check yourself", items: [
        ["How many objects are needed for a force to act?", "**At least two** objects must interact."],
        ["You push a wall. Does the wall also act on your hand?", "**Yes.** Each of the two interacting objects experiences a force from the other."],
      ] },
    ],
  },
  {
    id: "f4", category: "Types of forces", title: "Types of Forces", heading: "What Are the Different Types of Forces?",
    sub: "With contact or without contact.",
    blocks: [
      { t: "dia", id: "fo_types" },
      { t: "table", head: ["", "Contact forces", "Non-contact forces"], rows: [
        ["Act", "Only when there is **physical contact** between the objects", "Even when the objects are **not in contact**"],
        ["Examples", "**Muscular force** and **friction**", "**Magnetic**, **electrostatic** and **gravitational** force"],
        ["Contact", "Direct (hands, body) or **indirect** (using a stick or a rope)", "Not needed"],
      ] },
      { t: "p", s: "To apply a force on an object, we often need **physical contact** between our body and the object. The contact can be **direct**, such as using our hands or other body parts, or **indirect**, such as using a **stick or a rope**." },
      { t: "qa", title: "Check yourself", items: [
        ["Name two contact forces and three non-contact forces.", "**Contact:** muscular force and friction. **Non-contact:** magnetic force, electrostatic force and gravitational force."],
      ] },
    ],
  },
  {
    id: "f5", category: "Muscular force", title: "Muscular Force", heading: "Muscular Force: The Force of Our Muscles",
    sub: "From walking to the beating of the heart.",
    blocks: [
      { t: "dia", id: "fo_muscular" },
      { t: "key", title: "Muscular force", s: "The force resulting due to the **action of muscles** is called **muscular force**. It acts when muscles **contract and elongate** while we walk, run, lift, push, jump or stretch. It is a **contact force**." },
      { t: "ul", items: [
        "**Animals, birds, fish and insects** use muscular force for movement and survival.",
        "Humans used the muscular force of **animals** (bullocks, horses) for a long time to **plough fields and pull carts**.",
        "Muscular force plays an important role **inside our body** too: it helps us **chew food** and **push it through the alimentary canal** (the food pipe) in digestion.",
        "The **expansion and contraction of the heart muscles** allow the **blood to circulate** in the body, a process essential for survival.",
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["Give one example of muscular force.", "A child **lifting a school bag**, or a bullock pulling a cart."],
        ["Which force pumps the blood in our body?", "**Muscular force** of the heart muscles."],
      ] },
    ],
  },
  {
    id: "f6", category: "Friction", title: "Friction", heading: "Friction: The Force That Stops a Moving Object",
    sub: "Why a rolling ball stops on its own.",
    blocks: [
      { t: "p", s: "A ball rolling on flat ground **stops on its own** after some time. If we stop pedalling, a bicycle **slows down and stops**. If the road is **rough**, it stops **sooner** than on a smoother road. We learnt that a force is needed to change speed, yet no force seems to act on the ball. Which force is it?" },
      { t: "act", title: "Activity 5.3: Why does a pushed object stop?",
        steps: ["Take an object with a flat base (an empty lunch box, geometry box or notebook) and place it on a table or floor.", "Push it gently and watch it. Does it stop after some distance?", "Now push it in the opposite direction. Does it stop again?"],
        see: ["The object **stops after sliding a certain distance**, in both directions."],
        why: ["A force acts between the **surfaces in contact**, in a direction **opposite to the motion**. This force brings the object to a stop."] },
      { t: "dia", id: "fo_friction" },
      { t: "key", title: "Friction", s: "The force that comes into play when an object **moves or tries to move over another surface** is called the **force of friction** or simply **friction**. It always acts in the direction **opposite** to that in which the object is moving or trying to move. It is a **contact force**, since it arises between two surfaces in contact." },
      { t: "ul", items: [
        "**Cause:** even smooth-looking surfaces have a large number of **minute irregularities** (tiny bumps and dips). When two surfaces are in contact, the irregularities **lock into each other** and oppose any effort to move one surface over the other.",
      ] },
      { t: "act", title: "Activity 5.4: Friction and the surface",
        steps: ["Repeat Activity 5.3, but place the same object on different surfaces: glass, cloth, wood, ceramic tile and sand.", "Note whether the object stops after the same distance on every surface."],
        see: ["The object stops after **different distances** on different surfaces."],
        why: ["The force of friction depends on the **nature of the surfaces in contact**. Friction is **greater on rough surfaces**."] },
      { t: "dia", id: "fo_surfaces" },
      { t: "note", title: "A step further: liquids and gases", s: "Friction does not act only on solid surfaces. **Air, water and other liquids** also exert a force of friction on objects moving through them. That is why **aeroplanes, ships, boats and high-speed trains** are designed with **specific shapes** to reduce the friction due to air or water." },
      { t: "qa", title: "Check yourself", items: [
        ["In which direction does friction act?", "Always **opposite** to the direction in which the object moves or tries to move."],
        ["Why does a bicycle stop sooner on a rough road?", "A rough road gives **more friction** than a smooth road."],
      ] },
    ],
  },
  {
    id: "f7", category: "Friction", title: "Friction: A Necessity and a Problem", heading: "Friction: Friend and Foe",
    sub: "Slipping on ice, and the ball on a slope.",
    blocks: [
      { t: "dia", id: "fo_necessity" },
      { t: "h", s: "Why do we slip on smooth or wet surfaces?" },
      { t: "p", s: "On **ice, polished floors or wet surfaces** the surface is very smooth (water fills the irregularities), so **friction is very small** and our feet cannot grip. That is why it is easy to slip on a wet surface." },
      { t: "h", s: "Where does the ball stop?" },
      { t: "p", s: "A ball is released from the point P, moves down an inclined plane and then along a horizontal surface, and stops at the point A. How can we change where it stops?" },
      { t: "dia", id: "fo_slope" },
      { t: "ol", items: [
        "To stop it **before A**: make the horizontal surface **rougher** (spread sand, a cloth or a towel) to **increase friction**.",
        "To stop it **after A**: make the surface **smoother** (a glass sheet or a polished surface) to **reduce friction**.",
      ] },
      { t: "qa", title: "Check yourself", items: [
        ["Why do we sometimes slip on a wet floor?", "The wet floor is very smooth, so the **friction is very small** and our feet cannot grip."],
        ["Name two ways of reducing friction.", "**Oiling or greasing**, using **ball bearings or wheels**, and making the surface smooth."],
      ] },
    ],
  },
  {
    id: "f8", category: "Magnetic force", title: "Magnetic Force", heading: "Magnetic Force: A Force from a Distance",
    sub: "Floating ring magnets.",
    blocks: [
      { t: "p", s: "In Class 6 you learnt that a magnet **attracts objects made of magnetic materials**. When two magnets are brought close, **like poles** (North and North, South and South) **repel** and **unlike poles** (North and South) **attract**. In the chapter on electricity you learnt that **electromagnets** behave like magnets. Attraction and repulsion are a form of **push and pull**, that is, a force." },
      { t: "act", title: "Activity 5.5: Two ring magnets on a stick",
        steps: ["Take two ring magnets and a wooden stick. Hold the stick vertically over a wooden table and insert one ring magnet.", "Insert the second ring magnet above it so that the **like poles face each other**. Does it float above the first?", "Try pushing the second magnet down gently. Do you feel a force?", "Reverse the poles of both magnets. Does the second magnet still float?"],
        see: ["The upper magnet **stays floating** above the lower one and **pushes back** when pressed.", "It floats again after reversing both, as the **like poles still face each other**."],
        why: ["A magnet can exert a force on another magnet **without being in contact** with it."] },
      { t: "dia", id: "fo_ringmagnets" },
      { t: "dia", id: "fo_poles" },
      { t: "key", title: "Magnetic force", s: "The force exerted by a **magnet** on another magnet or on a **magnetic material** is called the **magnetic force**. Since a magnet can exert this force **from a distance**, it is a **non-contact force**." },
      { t: "qa", title: "Check yourself", items: [
        ["Why is the magnetic force called a non-contact force?", "A magnet can exert the force on another magnet or a magnetic material **without touching it**."],
        ["Two like poles are brought close. What happens?", "They **repel** each other."],
      ] },
    ],
  },
];
