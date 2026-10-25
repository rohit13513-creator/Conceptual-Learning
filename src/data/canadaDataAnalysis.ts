// Canadian Maths: "Data Analysis: Box Plots, Scatter Plots and Trend Lines".
// Text in strings uses **double stars** for bold. Figures are in /public/diagrams/canada-data/.

export type CBlock =
  | { t: "p"; s: string }
  | { t: "h"; s: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "img"; file: string; alt: string; caption: string }
  | { t: "note"; title: string; s: string }
  | { t: "ex"; title: string; body: CBlock[] }
  | { t: "qs"; items: { n: string; q: string; parts?: string[]; table?: { head: string[]; rows: string[][] }; img?: { file: string; alt: string; caption: string } }[] };

export interface CTopic { id: string; title: string; category: string; heading: string; sub: string; blocks: CBlock[]; }

const fig = (file: string, alt: string, caption: string): CBlock => ({ t: "img", file, alt, caption });

export const CANADA_DATA_TOPICS: CTopic[] = [
  {
    id: "real-world", title: "1. Data in the Real World", category: "Data", heading: "Data in the Real World",
    sub: "Data are facts or numbers collected to answer a question. Today, very large amounts of data are collected automatically every second.",
    blocks: [
      { t: "h", s: "1.1 Where large amounts of data come from" },
      { t: "table", head: ["Context", "Data collected", "How the data are used"], rows: [
        ["Transit fare cards", "Where and when each rider taps on and off", "Plan bus routes and schedules"],
        ["Fitness watches", "Heart rate, steps, sleep, location", "Give health advice; research"],
        ["Streaming services", "What you watch, for how long, what you skip", "Recommend shows; decide what to produce"],
        ["Store loyalty cards", "Every item bought, when and where", "Send personalized offers; stock shelves"],
        ["National census", "Age, household size, language, income of every household", "Plan schools, hospitals and services"],
        ["Weather stations", "Temperature, wind, precipitation every minute", "Forecasts and climate research"],
      ] },
      { t: "h", s: "1.2 Implications of collecting and using data" },
      { t: "p", s: "When data are collected, stored, represented and used, there are benefits and risks." },
      { t: "ul", items: [
        "**Benefits:** better planning (bus routes, hospital staffing), new medical discoveries, convenience (recommendations, navigation).",
        "**Privacy:** personal information, such as your location, can reveal where you live, work or go to school.",
        "**Consent:** people may not know their data are being collected or sold.",
        "**Security:** stored data can be stolen in a data breach.",
        "**Bias and fairness:** if the data leave out some groups, decisions based on the data may be unfair to those groups.",
        "**Misleading representation:** a graph with a broken or stretched scale can make a small change look large.",
      ] },
      { t: "h", s: "1.3 Populations, samples and bias" },
      { t: "ul", items: [
        "The **population** is the whole group you want to learn about.",
        "A **sample** is a smaller part of the population that is actually studied.",
        "A **census** collects data from every member of the population.",
        "**Primary data** are collected by you. **Secondary data** were collected by someone else (for example, data from a government website).",
      ] },
      { t: "p", s: "A sample should be **representative**, which means it is like the whole population. A sample that is not representative has **bias**." },
      { t: "table", head: ["Type of bias", "Example", "Better method"], rows: [
        ["Sampling bias", "Surveying only hockey players about the most popular sport in a school", "Survey a random selection of all students"],
        ["Leading question", "\"Don't you agree that the school day is too long?\"", "\"How do you feel about the length of the school day?\""],
        ["Response bias", "Asking students in public whether they have ever cheated", "Use an anonymous survey"],
      ] },
      { t: "h", s: "1.4 Types of data" },
      { t: "table", head: ["Type", "Description", "Examples"], rows: [
        ["Categorical", "Names or labels, not numbers", "Favourite sport, province of birth, eye colour"],
        ["Numerical (discrete)", "Numbers you count; only certain values are possible", "Number of siblings, goals scored"],
        ["Numerical (continuous)", "Numbers you measure; any value in a range is possible", "Height, time, mass, temperature"],
      ] },
      { t: "ul", items: [
        "**One-variable data** describe one quantity, such as the heights of students in a class. Histograms and box plots are used for one-variable data.",
        "**Two-variable data** pair two quantities for each item, such as each student's hours of study and test mark. Scatter plots are used for two-variable data.",
      ] },
    ],
  },
  {
    id: "one-variable", title: "2. One-Variable Data", category: "Data", heading: "Representing and Summarizing One-Variable Data",
    sub: "Frequency tables, histograms and the three measures of the centre.",
    blocks: [
      { t: "h", s: "2.1 Frequency tables and histograms" },
      { t: "p", s: "A **frequency table** shows how many values fall in each interval. A **histogram** is a bar graph of a frequency table for continuous data. The bars touch because the intervals have no gaps between them." },
      { t: "ex", title: "Example 1", body: [
        { t: "p", s: "Thirty students recorded their daily screen time in minutes." },
        { t: "table", head: ["Screen time (min)", "0 to <60", "60 to <120", "120 to <180", "180 to <240", "240 to <300"], rows: [["Frequency", "3", "7", "11", "6", "3"]] },
        fig("histogram-screen-time", "A histogram of the daily screen time of 30 students, with bars of height 3, 7, 11, 6 and 3", "Daily screen time of 30 students"),
        { t: "ul", items: [
          "The most common interval (the **modal interval**) is 120 to <180 minutes.",
          "6 + 3 = 9 students have 180 minutes or more, which is 9 ÷ 30 = **30%** of the class.",
          "The histogram is roughly **symmetrical**: it has a single peak in the middle.",
        ] },
      ] },
      { t: "h", s: "2.2 Measures of central tendency" },
      { t: "p", s: "A **measure of central tendency** is one number that represents the \"centre\" of a data set." },
      { t: "table", head: ["Measure", "How to find it", "Best used when"], rows: [
        ["Mean", "Add all the values, then divide by the number of values", "Data have no extreme values"],
        ["Median", "The middle value of sorted data. With an even number of values, take the mean of the two middle values", "Data have an extreme value (outlier)"],
        ["Mode", "The value that occurs most often. A set may have no mode or more than one mode", "Data are categories, or you want the most common value"],
      ] },
      { t: "p", s: "The **range** measures spread: range = maximum − minimum." },
      { t: "ex", title: "Example 2 (odd number of values)", body: [
        { t: "p", s: "Find the mean, median, mode and range of 8, 3, 5, 9, 5, 12, 7." },
        { t: "ul", items: ["Sorted: 3, 5, 5, 7, 8, 9, 12", "Mean = 49 ÷ 7 = **7**", "Median = the 4th value = **7**", "Mode = **5**", "Range = 12 − 3 = **9**"] },
      ] },
      { t: "ex", title: "Example 3 (even number of values)", body: [
        { t: "p", s: "Find the mean and median of 14, 22, 9, 17, 30, 11." },
        { t: "ul", items: ["Sorted: 9, 11, 14, 17, 22, 30", "Mean = 103 ÷ 6 ≈ **17.17**", "Median = (14 + 17) ÷ 2 = **15.5**"] },
      ] },
      { t: "ex", title: "Example 4 (finding a missing value)", body: [
        { t: "p", s: "Kayla's marks on four tests are 78, 85, 72 and 90. What mark does she need on the fifth test to have a mean of 82?" },
        { t: "ul", items: ["Total needed: 82 × 5 = 410", "Total so far: 78 + 85 + 72 + 90 = 325", "Fifth mark: 410 − 325 = **85**"] },
      ] },
    ],
  },
  {
    id: "quartiles", title: "3. Quartiles and Outliers", category: "Data", heading: "Quartiles and the Five-Number Summary",
    sub: "Splitting sorted data into four equal parts, and spotting values that do not belong.",
    blocks: [
      { t: "p", s: "**Quartiles** divide sorted data into **four equal parts**, each holding about 25% of the values." },
      { t: "table", head: ["Term", "Meaning"], rows: [
        ["Minimum", "The smallest value"],
        ["First quartile (Q1)", "The median of the lower half of the data"],
        ["Median (Q2)", "The middle value of the whole data set"],
        ["Third quartile (Q3)", "The median of the upper half of the data"],
        ["Maximum", "The largest value"],
      ] },
      { t: "p", s: "Together, these five values form the **five-number summary**." },
      { t: "note", title: "Interquartile range (IQR)", s: "IQR = Q3 − Q1. It measures the spread of the **middle 50%** of the data. Unlike the range, extreme values do not affect it." },
      { t: "h", s: "3.1 Steps for finding quartiles" },
      { t: "ol", items: [
        "Sort the data from least to greatest.",
        "Find the median.",
        "Split the data into a lower half and an upper half. If the number of values is **odd**, leave the median out of both halves.",
        "Q1 is the median of the lower half. Q3 is the median of the upper half.",
      ] },
      { t: "ex", title: "Example 5 (odd number of values)", body: [
        { t: "p", s: "Find the five-number summary of 10, 12, 21, 23, 37, 45, 50, 69, 90." },
        { t: "ul", items: [
          "There are 9 values, so the median is the 5th value: **37**",
          "Lower half: 10, 12, 21, 23, so Q1 = (12 + 21) ÷ 2 = **16.5**",
          "Upper half: 45, 50, 69, 90, so Q3 = (50 + 69) ÷ 2 = **59.5**",
          "Five-number summary: **10, 16.5, 37, 59.5, 90**",
          "Range = 90 − 10 = 80. IQR = 59.5 − 16.5 = **43**",
        ] },
      ] },
      { t: "ex", title: "Example 6 (even number of values)", body: [
        { t: "p", s: "A hockey team scored these goals in 10 games: 2, 5, 1, 3, 4, 6, 2, 8, 3, 7." },
        { t: "ul", items: [
          "Sorted: 1, 2, 2, 3, 3, 4, 5, 6, 7, 8",
          "Median = (3 + 4) ÷ 2 = **3.5**",
          "Lower half: 1, 2, 2, 3, 3, so Q1 = **2**",
          "Upper half: 4, 5, 6, 7, 8, so Q3 = **6**",
          "Five-number summary: **1, 2, 3.5, 6, 8**. IQR = **4**",
        ] },
      ] },
      { t: "ex", title: "Example 7 (negative values)", body: [
        { t: "p", s: "The daily high temperatures (°C) in Winnipeg over 11 days in January were −18, −12, −25, −9, −15, −21, −6, −14, −11, −19, −8." },
        { t: "ul", items: [
          "Sorted: −25, −21, −19, −18, −15, −14, −12, −11, −9, −8, −6",
          "Median = the 6th value = **−14**",
          "Lower half: −25, −21, −19, −18, −15, so Q1 = **−19**",
          "Upper half: −12, −11, −9, −8, −6, so Q3 = **−9**",
          "Five-number summary: **−25, −19, −14, −9, −6**. IQR = −9 − (−19) = **10**",
        ] },
      ] },
      { t: "h", s: "3.2 Outliers" },
      { t: "p", s: "An **outlier** is a value that is much smaller or much larger than the rest of the data. A common test:" },
      { t: "note", title: "The 1.5 × IQR test", s: "A value is an outlier if it is **less than Q1 − 1.5 × IQR** or **greater than Q3 + 1.5 × IQR**." },
      { t: "ex", title: "Example 8", body: [
        { t: "p", s: "Is there an outlier in 12, 15, 17, 18, 20, 21, 22, 24, 58?" },
        { t: "ul", items: [
          "Median = 20. Q1 = (15 + 17) ÷ 2 = 16. Q3 = (22 + 24) ÷ 2 = 23. IQR = 7",
          "Lower limit: 16 − 1.5(7) = 5.5",
          "Upper limit: 23 + 1.5(7) = 33.5",
          "58 > 33.5, so **58 is an outlier**.",
          "The mean (23) is pulled up by the outlier, but the median (20) is not. When a data set has an outlier, the **median** is the better measure of centre.",
        ] },
      ] },
    ],
  },
  {
    id: "box-plots", title: "4. Box Plots", category: "Graphs", heading: "Box Plots (Box-and-Whisker Plots)",
    sub: "A box plot shows the five-number summary on a number line.",
    blocks: [
      { t: "ul", items: [
        "A **box** is drawn from Q1 to Q3, with a vertical line at the median.",
        "**Whiskers** extend from the box to the minimum and to the maximum.",
        "Each whisker and each half of the box holds about **25%** of the data.",
        "A box plot shows the **spread** and **centre** of a large data set in a small space. The data must be sorted first.",
      ] },
      { t: "h", s: "4.1 Steps for drawing a box plot" },
      { t: "ol", items: [
        "Find the five-number summary.",
        "Draw a number line with an even scale that covers the minimum to the maximum.",
        "Mark the five values above the number line.",
        "Draw the box from Q1 to Q3 and a line through it at the median.",
        "Draw whiskers from the box to the minimum and the maximum.",
      ] },
      { t: "ex", title: "Example 9", body: [
        { t: "p", s: "Draw a box plot for the data 10, 12, 21, 23, 37, 45, 50, 69, 90." },
        { t: "ul", items: [
          "The data are already sorted. There are 9 values, so the median is the 5th value: **37**",
          "Lower half: 10, 12, 21, 23 (4 values). Q1 = the mean of the two middle values = (12 + 21) ÷ 2 = **16.5**",
          "Upper half: 45, 50, 69, 90 (4 values). Q3 = the mean of the two middle values = (50 + 69) ÷ 2 = **59.5**",
          "Five-number summary: minimum 10, Q1 16.5, median 37, Q3 59.5, maximum 90",
          "Use a scale from 0 to 100 in steps of 10, then draw the box from 16.5 to 59.5, a line at 37, and whiskers to 10 and 90.",
        ] },
        fig("box-plot-9-values", "A box plot with minimum 10, Q1 16.5, median 37, Q3 59.5 and maximum 90 on a scale from 0 to 100", "Box plot for Example 9"),
      ] },
      { t: "ex", title: "Example 10", body: [
        { t: "p", s: "A hockey team scored these goals in 10 games: 2, 5, 1, 3, 4, 6, 2, 8, 3, 7. Draw a box plot of the data." },
        { t: "ul", items: [
          "Sorted: 1, 2, 2, 3, 3, 4, 5, 6, 7, 8. There are 10 values, so the median = (3 + 4) ÷ 2 = **3.5**",
          "Lower half: 1, 2, 2, 3, 3 (5 values). Q1 = the middle value = **2**",
          "Upper half: 4, 5, 6, 7, 8 (5 values). Q3 = the middle value = **6**",
          "Five-number summary: minimum 1, Q1 2, median 3.5, Q3 6, maximum 8",
          "Use a scale from 0 to 9 in steps of 1, then draw the box from 2 to 6, a line at 3.5, and whiskers to 1 and 8.",
        ] },
        fig("box-plot-hockey", "A box plot with minimum 1, Q1 2, median 3.5, Q3 6 and maximum 8 on a scale from 0 to 9", "Box plot for Example 10"),
      ] },
      { t: "h", s: "4.2 Reading a box plot" },
      { t: "table", head: ["Part of the plot", "What it tells you"], rows: [
        ["Left whisker", "The lowest 25% of the data"],
        ["Box", "The middle 50% of the data; its length is the IQR"],
        ["Line in the box", "The median; 50% of the data are below it and 50% above"],
        ["Right whisker", "The highest 25% of the data"],
        ["A short box or whisker", "Data in that part are close together"],
        ["A long box or whisker", "Data in that part are spread out"],
      ] },
      { t: "p", s: "For example, for the data 10, 12, 21, 23, 37, 45, 50, 69, 90, the right whisker (59.5 to 90) is much longer than the left whisker (10 to 16.5). The highest 25% of the values are spread out, while the lowest 25% are close together." },
      { t: "h", s: "4.3 Comparing box plots" },
      { t: "p", s: "Two box plots drawn on the **same scale** can be compared. Compare the **medians** (which group is typically higher) and the **IQRs or ranges** (which group is more consistent)." },
      { t: "ex", title: "Example 11", body: [
        { t: "p", s: "Two classes wrote the same math test." },
        fig("box-plot-compare-classes", "Two box plots on the same scale, Class A in blue and Class B in orange", "Class A and Class B on the same scale"),
        { t: "table", head: ["", "Class A", "Class B"], rows: [
          ["Five-number summary", "52, 64, 72, 80, 95", "40, 58, 75, 84, 98"],
          ["Median", "72", "75"],
          ["IQR", "80 − 64 = 16", "84 − 58 = 26"],
          ["Range", "95 − 52 = 43", "98 − 40 = 58"],
        ] },
        { t: "ul", items: [
          "Class B has the higher median, so a typical student in Class B did slightly better.",
          "Class A has a smaller IQR and range, so its marks are more consistent.",
          "In Class A, 25% of students scored 80 or higher. In Class B, 25% scored 84 or higher.",
        ] },
      ] },
    ],
  },
  {
    id: "scatter", title: "5. Scatter Plots", category: "Graphs", heading: "Scatter Plots",
    sub: "Graphing two sets of data together to see whether they are related.",
    blocks: [
      { t: "p", s: "A **scatter plot** is a graph of points (dots) that shows a possible relationship between **two sets of data**." },
      { t: "ul", items: [
        "The **independent variable** is plotted on the horizontal (x) axis. It is the variable that is changed or controlled.",
        "The **dependent variable** is plotted on the vertical (y) axis. Its value may depend on the independent variable.",
        "Each pair of data values is plotted as one point (x, y). The points are **not** joined.",
      ] },
      { t: "ex", title: "Example 12", body: [
        { t: "p", s: "The table shows the hours six students studied and their test marks. Graph the data." },
        { t: "table", head: ["Hours studied, x", "1", "2", "3", "4", "5", "6"], rows: [["Test mark (%), y", "55", "62", "66", "74", "80", "85"]] },
        fig("scatter-study-trend", "On the left, a scatter plot of study hours and test marks. On the right, the same points with the trend line y = 6x + 49", "Study time and test marks, without and with the trend line y = 6x + 49"),
        { t: "p", s: "As the hours of study increase, the test marks also increase." },
      ] },
    ],
  },
  {
    id: "correlation", title: "6. Correlation", category: "Graphs", heading: "Correlation",
    sub: "Describing the direction and the strength of the relationship between two sets of data.",
    blocks: [
      { t: "p", s: "**Correlation** describes the relationship between two sets of data." },
      { t: "table", head: ["Type", "What the points do", "Real-life example"], rows: [
        ["Positive correlation", "As x increases, y tends to increase. The points rise from left to right.", "Kilometres driven and fuel used"],
        ["Negative correlation", "As x increases, y tends to decrease. The points fall from left to right.", "Age of a car and its value"],
        ["No correlation", "There is no pattern. The points are scattered.", "Shoe size and math mark"],
      ] },
      { t: "p", s: "The **strength** of a correlation describes how closely the points follow a straight line:" },
      { t: "ul", items: ["**Strong:** the points lie close to a line.", "**Weak:** the points show a trend, but they are spread out."] },
      fig("correlation-positive-none", "Three scatter plots: strong positive, weak positive and no correlation", "Strong positive, weak positive and no correlation"),
      fig("correlation-negative", "Two scatter plots: strong negative and weak negative", "Strong negative and weak negative"),
      { t: "p", s: "More examples:" },
      { t: "ol", items: [
        "Height and arm span: **strong positive**",
        "Outdoor temperature in winter and the cost of heating a home: **negative**",
        "Number of hours of daylight and electricity used for lighting: **negative**",
        "Number of people at a party and amount of food eaten: **positive**",
        "The last digit of a person's phone number and their height: **no correlation**",
      ] },
      { t: "h", s: "6.1 The correlation coefficient, r" },
      { t: "p", s: "Graphing technology, such as Desmos or a graphing calculator, calculates a number called the **correlation coefficient, r**, for a linear model." },
      { t: "ul", items: [
        "r is always between **−1 and 1**.",
        "The **sign** gives the direction: r > 0 is positive, r < 0 is negative.",
        "The **size** gives the strength: the closer r is to 1 or −1, the stronger the correlation.",
      ] },
      { t: "table", head: ["Value of r", "Strength of correlation"], rows: [
        ["0.67 ≤ r ≤ 1", "Strong positive"],
        ["0.33 ≤ r < 0.67", "Moderate positive"],
        ["−0.33 < r < 0.33", "Weak or none"],
        ["−0.67 < r ≤ −0.33", "Moderate negative"],
        ["−1 ≤ r ≤ −0.67", "Strong negative"],
      ] },
      { t: "p", s: "For example, for hours studied 1, 2, 3, 4, 5, 6 and test marks 55, 62, 66, 74, 80, 85, technology gives r ≈ 0.997, which is a strong positive correlation. For a perfectly straight line of points, r = 1 or r = −1." },
      { t: "note", title: "Correlation does not mean causation", s: "Ice cream sales and the number of people swimming at beaches both increase in summer, so they have a positive correlation. Buying ice cream does not cause swimming; hot weather causes both." },
    ],
  },
  {
    id: "trend-lines", title: "7. Trend Lines", category: "Models", heading: "Trend Lines (Lines of Best Fit)",
    sub: "A trend line shows the correlation more clearly and helps us make predictions.",
    blocks: [
      { t: "ul", items: [
        "It should **best represent the shape** of the data.",
        "It does **not** need to pass through the most points, or through any point.",
        "There should be about the **same number of points above and below** the line.",
        "It should follow the direction of the whole data set, not just a few points.",
      ] },
      { t: "h", s: "7.1 Finding the equation of a trend line" },
      { t: "ol", items: [
        "Draw the trend line.",
        "Choose two points **on the line** that are far apart, (x₁, y₁) and (x₂, y₂).",
        "Find the slope: m = (y₂ − y₁) ÷ (x₂ − x₁).",
        "Substitute one point into y = mx + b and solve for b.",
        "Write the equation y = mx + b.",
      ] },
      { t: "ex", title: "Example 13", body: [
        { t: "p", s: "The table shows the hours six students studied and their test marks. A trend line for the data passes through (1, 55) and (6, 85). Find the equation of the trend line." },
        { t: "table", head: ["Hours studied, x", "1", "2", "3", "4", "5", "6"], rows: [["Test mark (%), y", "55", "62", "66", "74", "80", "85"]] },
        { t: "ul", items: [
          "Slope: m = (85 − 55) ÷ (6 − 1) = 30 ÷ 5 = **6**",
          "Substitute (1, 55): 55 = 6(1) + b, so **b = 49**",
          "Equation: **y = 6x + 49**",
          "Meaning of the slope: each extra hour of study adds about 6 percentage points to the mark.",
        ] },
      ] },
      { t: "h", s: "7.2 Making predictions" },
      { t: "ul", items: [
        "**Interpolation** is a prediction **inside** the range of the given data. It is usually reliable.",
        "**Extrapolation** is a prediction **outside** the range of the given data. It is less reliable, because the trend may not continue.",
      ] },
      { t: "ex", title: "Example 14", body: [
        { t: "p", s: "The trend line y = 6x + 49 models the test mark (%), y, of a student who studies for x hours. The data used to make the model were for 1 to 6 hours of study. Predict the mark for 4.5, 8 and 10 hours of study, and state whether each prediction is interpolation or extrapolation." },
        { t: "ul", items: [
          "4.5 hours (interpolation): y = 6(4.5) + 49 = **76%**",
          "8 hours (extrapolation): y = 6(8) + 49 = **97%**",
          "10 hours (extrapolation): y = 6(10) + 49 = **109%**. This is impossible, because a mark cannot exceed 100%. It shows why extrapolation must be used with care.",
        ] },
      ] },
      { t: "ex", title: "Example 15 (negative correlation)", body: [
        { t: "p", s: "The table shows the value of a car as it ages." },
        { t: "table", head: ["Age (years), x", "0", "1", "2", "3", "4", "5", "6"], rows: [["Value ($ thousands), y", "32", "27", "24", "20", "17", "13", "11"]] },
        fig("car-value-trend", "A scatter plot of car value against age with the trend line y = −3.5x + 32", "Car value with trend line y = −3.5x + 32"),
        { t: "ul", items: [
          "The data show a **strong negative correlation**.",
          "A trend line passes through (0, 32) and (6, 11). Slope = (11 − 32) ÷ (6 − 0) = **−3.5**. The y-intercept is 32.",
          "Equation: **y = −3.5x + 32**. The car loses about $3500 in value each year.",
          "Value at 4.5 years: y = −3.5(4.5) + 32 = 16.25, or about **$16 250**.",
          "When will the car be worth $5000? 5 = −3.5x + 32 gives x = 27 ÷ 3.5 ≈ **7.7 years** (extrapolation).",
        ] },
      ] },
    ],
  },
  {
    id: "regression", title: "8. Regression Models", category: "Models", heading: "Testing Regression Models with Technology",
    sub: "Not all data follow a straight line, so we test different models and choose the one that fits best.",
    blocks: [
      { t: "p", s: "A **regression model** is an equation that technology calculates to fit data as closely as possible. Not all data follow a straight line, so we test different models and choose the one that fits best." },
      fig("three-model-shapes", "Three curves: a straight line labelled linear, a hill-shaped curve labelled quadratic, and a rising curve labelled exponential", "Linear, quadratic and exponential"),
      { t: "table", head: ["Model", "Equation form", "Shape", "Example situation"], rows: [
        ["Linear", "y = mx + b", "Straight line; constant rate of change", "Cost of a taxi ride by distance"],
        ["Quadratic", "y = ax² + bx + c", "U-shaped or ∩-shaped curve", "Height of a ball thrown into the air"],
        ["Exponential", "y = a(b)ˣ", "Curve that grows or decays faster and faster", "Bacteria growth, money earning compound interest"],
      ] },
      { t: "h", s: "8.1 Steps using graphing technology (for example, Desmos)" },
      { t: "ol", items: [
        "Enter the data in a table (x₁ and y₁ columns).",
        "Type a model, for example y₁ ~ mx₁ + b (linear), y₁ ~ ax₁² + bx₁ + c (quadratic) or y₁ ~ a·b^x₁ (exponential).",
        "Record the equation and how well it fits (r for linear models; R² for others, where a value close to 1 means a good fit).",
        "Look at the graph: does the model pass close to **all** the points, including the first and last?",
        "Choose the model that fits best **and** makes sense in the situation.",
      ] },
      { t: "ex", title: "Example 16", body: [
        { t: "p", s: "The number of bacteria in a sample was counted every hour." },
        { t: "table", head: ["Time (h), x", "0", "1", "2", "3", "4", "5"], rows: [["Bacteria, y", "50", "76", "112", "170", "255", "380"]] },
        { t: "p", s: "Technology gives these two models:" },
        { t: "ul", items: ["Linear: y = 64.14x + 13.48, with r ≈ 0.962", "Exponential: y = 50(1.5)ˣ"] },
        fig("bacteria-two-models", "A graph of bacteria against time with a straight dashed linear model and a curved exponential model passing through the points", "Bacteria: testing two models"),
        { t: "table", head: ["x", "0", "1", "2", "3", "4", "5"], rows: [
          ["Actual y", "50", "76", "112", "170", "255", "380"],
          ["Linear model", "13.5", "77.6", "141.8", "205.9", "270.1", "334.2"],
          ["Exponential model", "50", "75", "112.5", "168.8", "253.1", "379.7"],
        ] },
        { t: "ul", items: [
          "The linear model has a high r, but it misses the first and last points badly, and the points curve upward.",
          "The exponential model is almost exactly equal to every data value, so it is the **better model**. It also makes sense: each hour, the number of bacteria is multiplied by about 1.5.",
          "Prediction at 6 hours: exponential y = 50(1.5)⁶ ≈ **570 bacteria**. The linear model predicts only about 398, which is too low.",
        ] },
      ] },
      { t: "note", title: "Remember", s: "A high value of r alone does not prove a linear model is the best choice. Always look at the shape of the data." },
    ],
  },
  {
    id: "modelling", title: "9. The Modelling Process", category: "Models", heading: "The Mathematical Modelling Process",
    sub: "Using data and mathematics to answer a real-life question.",
    blocks: [
      { t: "p", s: "**Mathematical modelling** uses data and mathematics to answer a real-life question. Models help people make decisions, such as how many buses to run or how much food to order." },
      fig("modelling-cycle", "A cycle of six boxes: ask a question, understand the situation, collect the data, display and analyse, answer and report, evaluate and revise, with a dashed arrow to revise and repeat if needed", "The six steps of the modelling process"),
      { t: "ol", items: [
        "**Ask a question.** Choose a question that can be answered with data.",
        "**Understand the situation.** Identify the variables, what may change and what may stay the same, and make **assumptions**.",
        "**Collect the data.** Make a plan: what data, how much, and from what source (primary or secondary).",
        "**Display and analyse.** Choose a graph, look for patterns, and create a model (for example, a trend line or regression equation).",
        "**Answer and report.** Use the model to answer the question and make predictions.",
        "**Evaluate and revise.** How well does the model fit? What are its limitations? If needed, change the assumptions or collect more data and repeat.",
      ] },
      { t: "ex", title: "Example 17", body: [
        { t: "p", s: "Amir asks: \"How long will my phone battery last on a school day?\"" },
        { t: "ul", items: [
          "**Variables:** time since a full charge (independent) and battery level (dependent).",
          "**Assumptions:** he uses the same apps and screen brightness each day; the battery is in good condition.",
          "**Data (primary):** he records the battery level every hour.",
        ] },
        { t: "table", head: ["Time (h), x", "0", "1", "2", "3", "4", "5", "6"], rows: [["Battery (%), y", "100", "91", "85", "76", "68", "61", "52"]] },
        { t: "ul", items: [
          "**Display and analyse:** the scatter plot shows a strong negative linear pattern. Technology gives y = −7.89x + 99.82 with r ≈ −0.999.",
          "**Answer:** the battery reaches 0% when 0 = −7.89x + 99.82, so x ≈ 12.7 hours. A full charge lasts a school day.",
          "**Evaluate:** the prediction is extrapolation. Gaming or video calls would drain the battery faster, so Amir should collect data on different kinds of days.",
        ] },
      ] },
    ],
  },
  {
    id: "exercise-1", title: "10. Exercise: Level 1", category: "Exercise", heading: "Exercise: Level 1", sub: "Show all your work.",
    blocks: [{ t: "qs", items: [
      { n: "1", q: "Classify each type of data as categorical, numerical discrete or numerical continuous.", parts: ["(a) Favourite NHL team", "(b) Number of siblings", "(c) Time to run 100 m", "(d) Province or territory of birth", "(e) Mass of a backpack"] },
      { n: "2", q: "Find the mean, median, mode and range of 15, 8, 22, 8, 19, 11, 26." },
      { n: "3", q: "Find the five-number summary and the interquartile range of 34, 28, 41, 19, 45, 37, 22, 30, 50." },
      { n: "4", q: "Find the five-number summary and the interquartile range of 6, 9, 4, 12, 7, 15, 10, 3." },
      { n: "5", q: "Use the box plot below.", img: { file: "exercise-box-plot", alt: "A box plot on a scale from 10 to 90", caption: "Box plot for question 5" }, parts: ["(a) Write the five-number summary.", "(b) Find the range and the interquartile range.", "(c) What percent of the data are greater than 60?", "(d) What percent of the data are between 35 and 80?", "(e) What percent of the data are less than 45?"] },
      { n: "6", q: "State whether each pair of variables likely has a positive, negative or no correlation.", parts: ["(a) The number of kilometres driven and the amount of fuel used", "(b) The outdoor temperature and the number of hot chocolates sold at an outdoor rink", "(c) A student's height and the number of letters in their first name", "(d) The number of hours spent practising piano and the number of mistakes made in a recital"] },
      { n: "7", q: "Describe the correlation shown in each scatter plot as strong positive, weak positive, strong negative, weak negative or none.", img: { file: "exercise-scatter-plots", alt: "Four scatter plots labelled (a), (b), (c) and (d)", caption: "Scatter plots (a) to (d) for question 7" } },
      { n: "8", q: "Graph the data on a scatter plot and describe the correlation.", table: { head: ["x", "1", "2", "3", "4", "5", "6"], rows: [["y", "40", "34", "31", "25", "22", "15"]] } },
      { n: "9", q: "The table shows how long 32 students take to travel to school.", table: { head: ["Travel time (min)", "0 to <10", "10 to <20", "20 to <30", "30 to <40", "40 to <50"], rows: [["Frequency", "5", "9", "10", "6", "2"]] }, parts: ["(a) Draw a histogram of the data.", "(b) Which interval has the most students?", "(c) How many students travel for at least 30 minutes?", "(d) What percent of students travel for less than 20 minutes?", "(e) In which interval is the median travel time?"] },
      { n: "10", q: "For each situation, state whether a census or a sample should be used. Explain.", parts: ["(a) The favourite lunch of the 28 students in your class", "(b) The lifetime of the light bulbs made in a factory", "(c) The mean height of all Grade 9 students in the country"] },
    ] }],
  },
  {
    id: "exercise-2", title: "10. Exercise: Level 2", category: "Exercise", heading: "Exercise: Level 2", sub: "Show all your work.",
    blocks: [{ t: "qs", items: [
      { n: "11", q: "Find any outliers in 3, 18, 21, 22, 24, 25, 27, 28, 30, 31, 47. Show the limits you used." },
      { n: "12", q: "The ages of 12 members of a curling club are 14, 22, 35, 41, 29, 56, 63, 48, 38, 52, 67, 31. Find the five-number summary and draw a box plot." },
      { n: "13", q: "The box plots show the points scored per game by two basketball teams over a season.", img: { file: "exercise-teams-box-plots", alt: "Two box plots on the same scale for Team Maple and Team Spruce", caption: "Points per game: Maple and Spruce" }, parts: ["(a) Which team has the higher median score?", "(b) Find the IQR and range for each team. Which team is more consistent?", "(c) In what percent of games did Team Maple score at least 22 points?", "(d) A coach needs a team that reliably scores at least 15 points. Which team would you choose? Explain using the box plots."] },
      { n: "14", q: "The table shows the daily high temperature and the number of visitors at an outdoor pool.", table: { head: ["Temperature (°C), x", "18", "21", "24", "26", "28", "30", "32"], rows: [["Visitors, y", "120", "155", "190", "230", "250", "290", "300"]] }, parts: ["(a) Graph the data and describe the correlation.", "(b) A trend line passes through (20, 140) and (30, 270). Find its equation.", "(c) Predict the number of visitors when the temperature is 25 °C. Is this interpolation or extrapolation?", "(d) At what temperature would you expect 320 visitors? Is this interpolation or extrapolation?"] },
      { n: "15", q: "A trend line for the battery level of a phone passes through (2, 85) and (10, 45), where x is the number of hours since the phone was fully charged and y is the battery level (%).", parts: ["(a) Find the equation of the trend line.", "(b) Explain the meaning of the slope.", "(c) Predict the battery level after 6 hours.", "(d) After how many hours will the battery reach 0%? Why might this prediction be unreliable?"] },
      { n: "16", q: "The mean of six numbers is 14. Five of the numbers are 9, 12, 15, 18 and 20. Find the sixth number." },
      { n: "17", q: "Class A has 24 students with a mean mark of 72%. Class B has 26 students with a mean mark of 78%. Find the mean mark of all 50 students. Explain why it is not 75%." },
      { n: "18", q: "Identify the type of bias in each situation and describe a better method.", parts: ["(a) To find out how residents of Vancouver feel about a new bike lane, a reporter surveys members of a cycling club.", "(b) A survey asks, \"Don't you agree that students deserve a longer lunch break?\"", "(c) A teacher asks students to raise their hands in class if they have ever copied homework."] },
      { n: "19", q: "(a) Match each correlation coefficient with a description: r = 0.97, r = −0.92, r = 0.45, r = −0.40, r = 0.03. Descriptions: strong positive, strong negative, moderate positive, moderate negative, little or no correlation. (b) Which shows a stronger correlation, r = −0.85 or r = 0.70? Explain." },
      { n: "20", q: "A city's transit fare cards record each rider's card number and the time and place of every trip.", parts: ["(a) Describe two ways the city could use these data to improve service.", "(b) Describe two possible concerns about collecting and storing these data.", "(c) Suggest one way to protect riders' privacy."] },
    ] }],
  },
  {
    id: "exercise-3", title: "10. Exercise: Level 3", category: "Exercise", heading: "Exercise: Level 3", sub: "Show all your work.",
    blocks: [{ t: "qs", items: [
      { n: "21", q: "Write a set of seven whole numbers with minimum 4, Q1 = 6, median = 11, Q3 = 15 and maximum 20." },
      { n: "22", q: "Use the data set 10, 12, 21, 23, 37, 45, 50, 69, 90.", parts: ["(a) Find the mean, median, IQR and range.", "(b) The value 90 is replaced by 150. Which of the four measures change? Find their new values.", "(c) Explain why the median and IQR are called resistant measures."] },
      { n: "23", q: "Use the data set 4, 7, 9, 12, 18.", parts: ["(a) Find the mean, median and range.", "(b) Add 5 to every value. Find the new mean, median and range.", "(c) Multiply every original value by 3. Find the new mean, median and range.", "(d) Describe the pattern you see."] },
      { n: "24", q: "The commute times (in minutes) of 12 employees at an office in Calgary are 8, 12, 15, 15, 18, 20, 22, 25, 27, 30, 34, 75.", parts: ["(a) Find the five-number summary.", "(b) Use the 1.5 × IQR test to identify any outliers.", "(c) Find the mean with and without the outlier.", "(d) Which measure of centre best describes a typical commute? Explain."] },
      { n: "25", q: "The table shows the number of electric vehicles registered in a city, where x is the number of years since 2015.", table: { head: ["Years since 2015, x", "0", "1", "2", "3", "4", "5", "6", "7"], rows: [["Vehicles (thousands), y", "2.1", "2.8", "3.9", "4.6", "5.8", "6.4", "7.7", "8.3"]] }, parts: ["(a) Describe the correlation.", "(b) A trend line passes through (1, 3.0) and (7, 8.4). Find its equation.", "(c) Interpret the slope in this situation.", "(d) Predict the number of electric vehicles in 2025.", "(e) Use your equation to predict the number in 2045. Explain why this prediction may not be reliable."] },
      { n: "26", q: "A news article reports a strong positive correlation between the number of firefighters at a fire and the cost of the damage. A reader concludes that sending more firefighters causes more damage. Identify the error and name a more likely cause of the relationship." },
      { n: "27", q: "Eight test marks (whole numbers) have the five-number summary 45, 60, 71, 82, 96. Six of the marks are 45, 57, 63, 70, 85 and 96. The two missing marks are both between 70 and 85. Find the two missing marks." },
      { n: "28", q: "The five-number summary of a data set of 11 values is 20, 30, 42, 50, 61.", parts: ["(a) Find the IQR and the limits for outliers.", "(b) A new value of 95 is added to the data. Is it an outlier? Explain.", "(c) Without calculating, explain whether the median of the new set of 12 values will be greater than, less than or equal to 42."] },
      { n: "29", q: "The number of followers of a new school social media account is recorded each month. Technology gives a linear model y = 107.11x + 157.38 (r ≈ 0.982) and an exponential model y = 200(1.3)ˣ.", table: { head: ["Month, x", "0", "1", "2", "3", "4", "5"], rows: [["Followers, y", "200", "260", "338", "439", "571", "743"]] }, parts: ["(a) Use each model to estimate the number of followers in month 3. Compare with the actual value.", "(b) Which model fits the data better? Explain.", "(c) Use each model to predict the number of followers in month 8.", "(d) The value of r for the linear model is very high. Explain why the linear model is still not the best choice."] },
      { n: "30", q: "The student council wants to know how many pizzas to order for a school dance.", parts: ["(a) Write a question of interest that a mathematical model could answer.", "(b) Identify the independent and dependent variables.", "(c) State two assumptions.", "(d) Describe what data you would collect and where you would get them.", "(e) Describe how you would display and analyse the data, and one limitation of your model."] },
    ] }],
  },
  {
    id: "answers-1", title: "11. Answers: Level 1", category: "Answers", heading: "Answers: Level 1", sub: "Check your work against these.",
    blocks: [{ t: "qs", items: [
      { n: "1", q: "(a) categorical (b) numerical discrete (c) numerical continuous (d) categorical (e) numerical continuous" },
      { n: "2", q: "Sorted: 8, 8, 11, 15, 19, 22, 26. Mean = 109 ÷ 7 ≈ 15.57; median = 15; mode = 8; range = 18" },
      { n: "3", q: "Sorted: 19, 22, 28, 30, 34, 37, 41, 45, 50. Median 34; Q1 = (22 + 28) ÷ 2 = 25; Q3 = (41 + 45) ÷ 2 = 43. Summary: 19, 25, 34, 43, 50. IQR = 18" },
      { n: "4", q: "Sorted: 3, 4, 6, 7, 9, 10, 12, 15. Median = (7 + 9) ÷ 2 = 8; Q1 = (4 + 6) ÷ 2 = 5; Q3 = (10 + 12) ÷ 2 = 11. Summary: 3, 5, 8, 11, 15. IQR = 6" },
      { n: "5", q: "(a) 20, 35, 45, 60, 80 (b) range = 60, IQR = 25 (c) 25% (d) 75% (e) 50%" },
      { n: "6", q: "(a) positive (b) negative (c) no correlation (d) negative" },
      { n: "7", q: "(a) strong positive (b) weak negative (c) none (d) strong negative" },
      { n: "8", q: "The points fall from left to right in a fairly straight pattern: strong negative correlation." },
      { n: "9", q: "(a) Five touching bars with heights 5, 9, 10, 6 and 2 (b) 20 to <30 min (c) 6 + 2 = 8 students (d) (5 + 9) ÷ 32 = 14 ÷ 32 = 43.75% (e) The median is between the 16th and 17th values. The running totals are 5, 14, 24, so the median is in the 20 to <30 min interval." },
      { n: "10", q: "(a) Census: the class is small, so asking everyone is easy. (b) Sample: testing a bulb's lifetime uses it up, so testing every bulb would leave none to sell. (c) Sample: there are far too many students to measure them all." },
    ] }],
  },
  {
    id: "answers-2", title: "11. Answers: Level 2", category: "Answers", heading: "Answers: Level 2", sub: "Check your work against these.",
    blocks: [{ t: "qs", items: [
      { n: "11", q: "Median 25; Q1 = 21; Q3 = 30; IQR = 9. Limits: 21 − 13.5 = 7.5 and 30 + 13.5 = 43.5. Outliers: 3 and 47" },
      { n: "12", q: "Sorted: 14, 22, 29, 31, 35, 38, 41, 48, 52, 56, 63, 67. Median = (38 + 41) ÷ 2 = 39.5; Q1 = (29 + 31) ÷ 2 = 30; Q3 = (52 + 56) ÷ 2 = 54. Summary: 14, 30, 39.5, 54, 67", img: { file: "answer-box-plot", alt: "A box plot with minimum 14, Q1 30, median 39.5, Q3 54 and maximum 67", caption: "Box plot for answer 12" } },
      { n: "13", q: "(a) Team Maple (18 vs 17) (b) Maple: IQR = 22 − 14 = 8, range = 30 − 8 = 22. Spruce: IQR = 19 − 15 = 4, range = 24 − 12 = 12. Team Spruce is more consistent. (c) 25% (d) Team Spruce: Q1 is 15, so it scored at least 15 points in about 75% of games, and it never scored below 12. Team Maple scored below 14 points in 25% of games and as low as 8." },
      { n: "14", q: "(a) strong positive correlation (b) m = (270 − 140) ÷ (30 − 20) = 13; 140 = 13(20) + b gives b = −120, so y = 13x − 120 (c) y = 13(25) − 120 = 205 visitors, interpolation (d) 320 = 13x − 120 gives x = 440 ÷ 13 ≈ 33.8 °C, extrapolation" },
      { n: "15", q: "(a) m = (45 − 85) ÷ (10 − 2) = −5; 85 = −5(2) + b gives b = 95, so y = −5x + 95 (b) The battery drops about 5% per hour. (c) y = −5(6) + 95 = 65% (d) 0 = −5x + 95 gives x = 19 hours. This is extrapolation; phone use may change, and batteries do not always drain at a steady rate." },
      { n: "16", q: "Total = 6 × 14 = 84. Sum of five = 74. Sixth number = 10" },
      { n: "17", q: "(24 × 72 + 26 × 78) ÷ 50 = (1728 + 2028) ÷ 50 = 75.12%. It is not 75% because Class B has more students, so its higher mean counts more." },
      { n: "18", q: "(a) Sampling bias: cyclists are likely to support bike lanes. Survey a random sample of all Vancouver residents. (b) Leading question: it pushes people to agree. Ask, \"How do you feel about the length of the lunch break?\" (c) Response bias: students may not answer honestly in public. Use an anonymous survey." },
      { n: "19", q: "(a) 0.97 strong positive; −0.92 strong negative; 0.45 moderate positive; −0.40 moderate negative; 0.03 little or no correlation (b) r = −0.85, because it is closer to −1 than 0.70 is to 1. The sign only shows direction." },
      { n: "20", q: "Sample answers: (a) add buses on the busiest routes and times; plan new routes where many trips start and end (b) the data could reveal where a person lives, works or goes to school; the data could be stolen in a breach or shared without consent (c) remove card numbers and names before the data are analysed, and only report totals." },
    ] }],
  },
  {
    id: "answers-3", title: "11. Answers: Level 3", category: "Answers", heading: "Answers: Level 3", sub: "Check your work against these.",
    blocks: [{ t: "qs", items: [
      { n: "21", q: "The values must be 4, 6, a, 11, b, 15, 20, with 6 ≤ a ≤ 11 and 11 ≤ b ≤ 15. One answer: 4, 6, 9, 11, 13, 15, 20" },
      { n: "22", q: "(a) Mean = 357 ÷ 9 ≈ 39.67; median 37; IQR 43; range 80 (b) Only the mean and range change: mean = 417 ÷ 9 ≈ 46.33, range = 150 − 10 = 140. The median (37) and IQR (43) stay the same. (c) They depend only on the middle values, so a change to an extreme value does not affect them." },
      { n: "23", q: "(a) mean 10, median 9, range 14 (b) mean 15, median 14, range 14 (c) mean 30, median 27, range 42 (d) Adding a number shifts the mean and median by that amount but does not change the range. Multiplying by a number multiplies the mean, median and range by that number." },
      { n: "24", q: "(a) Median = (20 + 22) ÷ 2 = 21; Q1 = (15 + 15) ÷ 2 = 15; Q3 = (27 + 30) ÷ 2 = 28.5. Summary: 8, 15, 21, 28.5, 75 (b) IQR = 13.5. Upper limit = 28.5 + 20.25 = 48.75, so 75 is an outlier (c) With the outlier: 301 ÷ 12 ≈ 25.08 min. Without it: 226 ÷ 11 ≈ 20.55 min (d) The median (21 min), because the outlier pulls the mean up." },
      { n: "25", q: "(a) strong positive (b) m = (8.4 − 3.0) ÷ (7 − 1) = 0.9; 3.0 = 0.9(1) + b gives b = 2.1, so y = 0.9x + 2.1 (c) About 900 more electric vehicles are registered each year. (d) x = 10: y = 0.9(10) + 2.1 = 11.1, about 11 100 vehicles (e) x = 30: y = 29.1, about 29 100 vehicles. This is far outside the data, and the growth rate may change with prices, technology or government policy." },
      { n: "26", q: "Correlation does not show causation. Both variables are linked to a third variable, the size of the fire: a bigger fire needs more firefighters and causes more damage." },
      { n: "27", q: "Sorted, the marks are 45, 57, 63, 70, x, y, 85, 96. Median: (70 + x) ÷ 2 = 71, so x = 72. Q3: (y + 85) ÷ 2 = 82, so y = 79. Check Q1: (57 + 63) ÷ 2 = 60 ✓" },
      { n: "28", q: "(a) IQR = 50 − 30 = 20. Limits: 30 − 30 = 0 and 50 + 30 = 80 (b) 95 > 80, so yes, it is an outlier (c) With 12 values, the median is the mean of the 6th and 7th values. The old median 42 becomes the 6th value, and the 7th value is at least 42, so the new median is greater than or equal to 42." },
      { n: "29", q: "(a) Linear: 107.11(3) + 157.38 ≈ 479. Exponential: 200(1.3)³ ≈ 439. The actual value is 439, so the exponential model matches. (b) Exponential: it matches every data value almost exactly, and the followers are multiplied by about 1.3 each month. (c) Linear: 107.11(8) + 157.38 ≈ 1014. Exponential: 200(1.3)⁸ ≈ 1631 (d) r is high because the data always increase, but the points curve upward. A straight line is too low at the start and end and too high in the middle." },
      { n: "30", q: "Sample answer: (a) \"How many pizzas should we order for a dance, based on the number of tickets sold?\" (b) Independent: number of tickets sold; dependent: number of pizzas eaten. (c) Each student eats about the same amount; the same pizza size is ordered each time. (d) Records of tickets sold and pizzas eaten at past school dances (secondary data), or a survey of how many slices students would eat (primary data). (e) Make a scatter plot of tickets sold and pizzas eaten, find a linear model with technology, and use it to predict the number of pizzas. Limitation: the time of the dance or other food served may change how much students eat." },
    ] }],
  },
];
