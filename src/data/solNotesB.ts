import type { CTopic } from "./carbonNotesTypes";

// Class VIII Science, The Amazing World of Solutes, Solvents, and Solutions (NCERT Chapter 9). Topics 7 to 12: floating and sinking, density,
// density and floating, measuring mass, measuring volume, and volume of solids with the calculation of density.

export const SOL_B: CTopic[] = [
  {
    id: "s7", category: "Floating and sinking", title: "Why Do Objects Float or Sink?", heading: "Why Do Objects Float or Sink in Water?",
    sub: "Rice, husk, oil and the word density.",
    blocks: [
      { t: "ul", items: [
        "Some objects **float** in water and others **sink**. While washing rice, the **husk floats** on the water but the **rice sinks** to the bottom. **Oil floats** on water.",
        "It is commonly believed that objects that float are **lighter** and objects that sink are **heavier** than the liquid.",
        "A wooden stick and an iron rod may be of the same size, yet the iron rod feels much heavier. When we say iron is heavier than wood, we are talking about a property called **density**.",
      ] },
      { t: "note", title: "Remember", s: "The density of a substance is **not the only factor** that decides whether it will float or sink in a liquid. It explains floating and sinking **only partly**." },
      { t: "qa", title: "Think", items: [
        ["Why does sawdust float on water while sand sinks?", "The sawdust is less dense than water, so it floats. The sand is denser than water, so it sinks."],
      ] },
    ],
  },
  {
    id: "s8", category: "Density", title: "What Is Density?", heading: "What Is Density?",
    sub: "Mass in a unit volume, its units and relative density.",
    blocks: [
      { t: "p", s: "Imagine a **crowded bus** where many people are packed together: this is **high density**. The same bus with only a few people is **low density**. A forest where trees grow close to each other is a **dense forest**; if the trees are far apart it is less dense." },
      { t: "dia", id: "sl_density" },
      { t: "key", title: "Density", s: "Matter is anything that has **mass** and occupies **space (volume)**. **Density is the mass present in a unit volume of a substance.**" },
      { t: "eq", lines: ["Density = Mass ÷ Volume"] },
      { t: "ul", items: [
        "The density of a substance is **independent of its shape or size**. For example, clay of mass 120 g and volume 60 cm^{3} has density 2 g per cm^{3}, whether it is a cube or a thin sheet.",
        "The density depends on **temperature and pressure**. Pressure mainly affects the density of **gases**; its effect on solids and liquids is negligible.",
      ] },
      { t: "h", s: "Units of density" },
      { t: "dia", id: "sl_units" },
      { t: "ul", items: [
        "The unit of density depends on the units of mass and volume. The **SI unit** is **kilogram per cubic metre (kg per m^{3})**.",
        "For liquids, other units are used for convenience: **gram per millilitre (g per mL)** and **gram per cubic centimetre (g per cm^{3})**.",
        "**1 kg per m^{3} = 1000 g per m^{3} = 1 g per L = 1 g per 1000 mL = 1 g per 1000 cm^{3}.**",
        "The mass of 1 mL of water is close to 1 g at room temperature, so **10 mL of water is about 10 g** and **100 mL of water is about 100 g**. The density of water is about **1 g per cm^{3}**.",
      ] },
      { t: "h", s: "Relative density" },
      { t: "eq", lines: ["Relative density = Density of the substance ÷ Density of water at that temperature"] },
      { t: "ul", items: [
        "It is a **ratio of two densities**, so it has **no unit**.",
        "Example: an aluminium block of mass 27 g and volume 10 cm^{3} has density **2.7 g per cm^{3}**. So aluminium is **2.7 times denser than water** and its **relative density is 2.7**.",
        "**Think like a scientist:** a pack labelled 1 litre of oil weighs only about **910 g**. So the oil has a density of about **0.91 g per mL**, which is **less than water** (1 g per mL). That is why oil floats on water.",
      ] },
    ],
  },
  {
    id: "s9", category: "Density and floating", title: "Density, Floating and Sinking", heading: "Floating, Sinking and Density",
    sub: "Oil, oranges, an egg, rafts and the Dead Sea.",
    blocks: [
      { t: "key", title: "The rule", s: "An object **floats** on water if its **density is less** than that of water, and it **sinks** if its **density is more**." },
      { t: "dia", id: "sl_float" },
      { t: "ul", items: [
        "**Oil floats on water**, so water is denser than oil. Oil does not dissolve in water.",
        "**Unpeeled and peeled orange:** the unpeeled orange **floats** because its peel has **air pockets** that make it less dense than water. The peeled orange **sinks**.",
        "**Raw egg:** it sinks in tap water, but it **floats when enough salt is dissolved** in the water, because **salt water is denser**.",
        "**Bamboo and wooden logs** are light and float easily.",
      ] },
      { t: "h", s: "The Dead Sea (from the research project)" },
      { t: "ul", items: [
        "The **Dead Sea** is a very salty lake between Jordan and Israel, about 430 m below sea level, the lowest land on the Earth. Its water has about **34 percent salt**, nearly ten times saltier than the ocean.",
        "There are **no fish or plants** in it, because the very salty water draws water out of the cells of living things and holds very little dissolved oxygen. Only a few bacteria survive.",
        "The salty water is very dense (about 1.24 g per cm^{3}), so a person **floats easily** on it without swimming.",
        "Other very salty water bodies with little or no life: the Great Salt Lake (USA), Lake Assal (Djibouti) and Don Juan Pond (Antarctica).",
      ] },
      { t: "note", title: "Ever heard of rafts and boats?", s: "Before large ships, people crossed rivers and seas on **rafts of bamboo and wooden logs**. **Bamboo is light, hollow and floats easily**; bamboo poles were tied together to make rafts and small boats for fishing, trade and travel. Logs of strong trees were hollowed out to make boats. Such traditional boats are still used in some regions for transport and as tourist attractions." },
      { t: "qa", title: "Think like a scientist", items: [
        ["A raw egg sinks in tap water. What change can make it float?", "Dissolve **salt** in the water. Salt water is denser than tap water, so the egg floats."],
      ] },
    ],
  },
  {
    id: "s10", category: "Measuring mass", title: "Measuring Mass", heading: "How to Measure Mass",
    sub: "The digital balance, and the difference between mass and weight.",
    blocks: [
      { t: "ul", items: [
        "**Mass** is the **quantity of matter** present in an object. It is measured with a **balance**. Units: **gram (g)** and **kilogram (kg)**.",
        "To find the density of an object we measure two quantities: its **mass** and its **volume**, and divide mass by volume.",
      ] },
      { t: "dia", id: "sl_balance" },
      { t: "ol", items: [
        "Switch on the **digital weighing balance**. It should show **zero**. If not, press the **tare** (reset) button.",
        "Place a **clean, dry watch glass** (or butter paper) on the pan and press **tare** again to get zero.",
        "Place the solid object (a stone) on the watch glass and read the display. It gives the **mass** of the stone, for example **16.400 g**.",
      ] },
      { t: "p", s: "For a **liquid**, a **beaker** is used in place of the watch glass." },
      { t: "h", s: "A step further: mass and weight" },
      { t: "table", head: ["Mass", "Weight"], rows: [
        ["The quantity of matter in an object", "The force with which the Earth pulls an object"],
        ["Unit: gram (g), kilogram (kg)", "Unit: newton (N)"],
        ["A two-pan balance measures mass", "Most other balances measure weight but show it in mass units (g, kg)"],
      ] },
      { t: "p", s: "In daily life the words mass and weight are used as the same, but in science they are different. On the Earth they are closely related." },
    ],
  },
  {
    id: "s11", category: "Measuring volume", title: "Measuring Volume: The Measuring Cylinder", heading: "How to Measure Volume",
    sub: "Units of volume, the smallest reading and the meniscus.",
    blocks: [
      { t: "ul", items: [
        "**Volume** is the **space occupied** by an object. The SI unit is the **cubic metre (m^{3})**, the volume of a cube of side 1 m.",
        "Smaller volumes are given in **cubic decimetre (dm^{3})** or **cubic centimetre (cm^{3})**; 1 cm^{3} is also written as **1 cc**.",
        "The volume of a liquid is given in **litres (L)**: **1 L = 1 dm^{3}** and **1 mL = 1 cm^{3}**. A tetra pack marked 200 mL holds 200 mL of buttermilk.",
        "**Example:** a bottle of 2 L has 500 mL of water in it. It can hold 2000 − 500 = **1500 mL (1.5 L)** more.",
      ] },
      { t: "h", s: "The measuring cylinder" },
      { t: "ul", items: [
        "A **measuring cylinder** is a **narrow, tall, transparent cylinder**, open at one end and closed at the other, with markings to measure the volume of **liquids**. It comes in sizes such as 5, 10, 25, 50, 100, 250 and 500 mL.",
        "It is made **narrow and tall** so that a small change in volume makes a large change in height, and the reading is **more accurate**.",
        "**Water bottles are tall and cylindrical, not spherical,** because they stand firmly, are easy to hold and pour from, and pack closely together without wasting space.",
      ] },
      { t: "dia", id: "sl_cylinder" },
      { t: "h", s: "Smallest reading of a measuring cylinder" },
      { t: "ol", items: [
        "Note the volume between two bigger marks, for example **10 mL** (between 10 mL and 20 mL).",
        "Count the small divisions between these marks, for example **10**.",
        "Divide: 10 mL ÷ 10 = **1 mL**. This is the smallest reading.",
      ] },
      { t: "table", head: ["Capacity of the cylinder", "Smallest reading"], rows: [
        ["10 mL or 25 mL", "0.1 mL"], ["100 mL", "1 mL"], ["250 mL", "2 mL"], ["500 mL", "5 mL"],
      ] },
      { t: "p", s: "**Choosing the right cylinder:** to measure 70 mL, a 50 mL cylinder needs two steps, and a 250 mL or 500 mL cylinder is less accurate. So a **100 mL cylinder is the best choice**." },
      { t: "h", s: "Reading the meniscus" },
      { t: "ul", items: [
        "The **meniscus** is the **curved surface** formed by a liquid in a measuring cylinder.",
        "For **water and colourless liquids**, read the mark at the **bottom of the meniscus**. For **coloured liquids**, read the mark at the **top of the meniscus**.",
        "The **eyes must be level** with the meniscus while reading.",
      ] },
    ],
  },
  {
    id: "s12", category: "Volume of solids", title: "Volume of Solids and Calculating Density", heading: "Volume of Solids and Calculating Density",
    sub: "Length times width times height, and the displacement method.",
    blocks: [
      { t: "h", s: "Regular solids" },
      { t: "eq", lines: ["Volume of a cuboid = length × width × height = l × w × h"] },
      { t: "p", s: "A notebook 25 cm long, 18 cm wide and 2 cm high has volume 25 × 18 × 2 = **900 cm^{3}**." },
      { t: "h", s: "Irregular solids: the displacement method" },
      { t: "ol", items: [
        "Fill a measuring cylinder with water up to a level, say **50 mL** (initial volume A).",
        "Tie the stone with a thread and lower it **slowly** into the water.",
        "Note the new level, say **55 mL** (final volume B). **Volume of the object = B − A** = 55 − 50 = **5 mL = 5 cm^{3}**.",
      ] },
      { t: "dia", id: "sl_volume" },
      { t: "p", s: "The volume in mL is written in the equal unit **cm^{3}** for solids." },
      { t: "h", s: "Worked examples of density" },
      { t: "table", head: ["Object", "Mass", "Volume", "Density = Mass ÷ Volume"], rows: [
        ["Stone", "16.400 g", "5 cm^{3}", "16.400 ÷ 5 = **3.28 g per cm^{3}**"],
        ["Stone sculpture", "225 g", "90 cm^{3}", "225 ÷ 90 = **2.5 g per cm^{3}**: denser than water, so it **sinks**"],
        ["An object", "400 g", "40 cm^{3}", "400 ÷ 40 = **10 g per cm^{3}**"],
        ["Object A", "200 g", "40 cm^{3}", "200 ÷ 40 = **5 g per cm^{3}**"],
        ["Object B", "240 g", "60 cm^{3}", "240 ÷ 60 = **4 g per cm^{3}**"],
      ] },
      { t: "ul", items: [
        "Object A (5 g per cm^{3}) is **denser** than object B (4 g per cm^{3}).",
        "**Finding the volume from the mass and density:** an iron block of mass 600 g and density 7.9 g per cm^{3} has volume = mass ÷ density = 600 ÷ 7.9 ≈ **75.9 cm^{3}**.",
      ] },
    ],
  },
];
