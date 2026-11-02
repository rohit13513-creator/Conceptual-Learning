// Posts the "What's new" updates to the Latest Updates list that students see. Safe to run again: an update that is
// already posted (same title for the same audience) is skipped. Updates about features that need the Supabase scripts
// are posted only once those scripts have been run.
//   Preview:  node scripts/post-whats-new.mjs
//   Post:     node scripts/post-whats-new.mjs --post
//
// Each update is: a short first paragraph (what students see in the list), a blank line, then the details
// (what opens when a student taps it). Audience: "All" = Class VIII, IX and X; "9th", "10th", "8th" = that class only;
// "canadian" = Canadian-board students.
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const post = process.argv.includes("--post");

// (The "your profile is now a social profile" update was withdrawn on request and must not be posted again.)
const MARKS = {
  title: "New: School Marks - track your progress at school",
  needs: "marks",
  message: `Add your PT, Half Yearly, Pre-Board and Final Exam marks, Maths and Science separately, and watch your progress on a chart.

How to use it:
• Go to My Profile, open School marks and press Add marks.
• Choose the school year and the exam: PT1 to PT4, Half Yearly, Pre-Board 1 to 4, Final Exam, or type the name of any other exam.
• Enter the marks you got and the maximum marks for Maths and Science on their own lines. You can add more subjects. You can correct or delete any entry later.
• You will see your latest result in each subject, the change since the last exam, your best and your average, and a progress chart.
• Your marks are private: only you and your teacher can see them, unless you choose to show your latest percentage on your profile.`,
};
const VERIFY = {
  title: "New: verify your school marks for a green tick",
  needs: "verify",
  message: `Upload your result page or test copy to confirm your marks and earn a verified tick.

How it works:
• Under an exam in School marks, press Verify marks.
• Upload your school's result page, or the front page of your test copy, where your marks and the school's name are written. Add up to 3 photos, or one PDF. Keep the whole page in the picture, in good light.
• In about a minute you will see, subject by subject, whether your marks match.
• If a mark does not match, you will see what the page shows, so you can correct it. If something needs your teacher's decision, it is sent to your teacher.
• Your teacher can see the page you upload. Other students cannot.`,
};
const FASTER = {
  title: "The app now opens faster",
  message: `The app now loads much faster, and Google sign-in is more reliable.

What to expect:
• The first screen is about five times smaller, so it opens quickly even on a slow connection.
• A chapter's notes or questions load the first time you open them, so you may see "Loading..." for a moment. After that they open at once.
• Google sign-in works only with the same email you registered with. If it does not work, log in with your email and password.
• If the app ever looks stuck, reload the page once.`,
};

const UPDATES = [
  // ── class-wise ──
  { audience: "10th", title: "Class X Chemistry: Carbon and its Compounds is now complete", message: `Notes, Competition Zone, solved NCERT, a large question bank and a self assessment for the chapter.

What is there:
• Notes: 19 topics with 117 clear diagrams, activities, a mind map and a Competition Zone with counting rules and trap questions. Classroom students can download the notes as a PDF.
• Solved NCERT: the in-text questions, activities and exercises of the chapter, all solved.
• Question bank: 200 MCQs, 50 two-mark, 50 three-mark, 25 five-mark, 30 competency-based and 50 assertion-reason questions, many with diagrams.
• Self assessment: 80 challenging questions in 50 minutes, kept within the textbook chapter.
• In Solved NCERT, Question Bank and Self Assessment, use the chapter buttons to switch between Chemical Reactions and Carbon and its Compounds.` },
  { audience: "9th", title: "Class IX Maths: Circles chapter added", message: `Notes with proofs and diagrams, a mind map, a Competition Zone, solved NCERT questions and a question bank.

What is there:
• Notes: topic-wise and point-wise, with every theorem proved using a clear diagram, plus a mind map and a Competition Zone of tricky problems.
• Solved NCERT: all the textbook questions of the chapter, solved step by step.
• Question bank: 50 MCQs, 50 two-mark, 30 three-mark, 25 competency-based (four-mark) and 25 five-mark questions, about half of them with figures.
• Find it under Notes, Solved NCERT and Question Bank for Class IX Maths.` },
  { audience: "9th", title: "Class IX Biology: Diversity chapter added", message: `Patterns in Life: Diversity and Classification, with notes, solved questions, a question bank and a self assessment.

What is new:
• The chapter is added to Class IX Biology notes, with clear diagrams.
• Solved Questions, Question Bank and Self Assessment now have a chapter switcher: Cell, Tissues, Diversity.
• Classroom students can also download the chapter notes as a PDF.` },
  { audience: "canadian", title: "Canadian Maths: Data Analysis notes added", message: `Nine topics with worked examples, three levels of exercises with answers, and a PDF.

What is there:
• Topics: data in the real world, one-variable data, quartiles and outliers, box plots, scatter plots, correlation, trend lines, regression models and the modelling process.
• 16 worked examples with figures, and exercises at Level 1, 2 and 3, each with its answers.
• Open it from Notes > Canadian Maths, or the Canadian Maths button on your home page. You can download the notes as a PDF.` },
  { audience: "canadian", title: "Canadian-board homework deadline", message: `Homework is due at 7:30 PM Windsor time on the next day, and the deadline is shown in Windsor time.` },
  // ── for everyone ──
  { audience: ["All", "canadian"], ...MARKS },
  { audience: ["All", "canadian"], ...VERIFY },
  { audience: ["All", "canadian"], ...FASTER },
  { audience: "All", title: "Revision: clearer results", message: `Your result now shows which marks you can still earn, and it updates by itself.

What is new:
• After a paper is checked, a note lists the questions where marks are still available, for example "D2 (4)".
• To earn them, write your own answer to those questions and press Improve Score. A question you skip stays at its present marks.
• Checking usually takes one to three minutes. You do not need to wait on the page: your result will be there when you come back.` },
  { audience: "All", title: "Homework: late marks and improving a submission", message: `Late marks are now fairer, and improving a submission never adds a new penalty.

The rule:
• Late by 1 day: 1 mark is deducted. 2 days: 3 marks. 3 days: 3 marks. 4 days: 4 marks. 5 or more days: 5 marks, which is the most that can be deducted.
• Improving or completing a submission never adds a new penalty.
• Electricity homeworks are never marked late.` },
  { audience: "All", title: "PDF downloads are for classroom students", message: `Download PDF buttons are available to students registered for the classroom (offline) batch.

What this means:
• Students who have joined the classroom batch can download PDF notes and NCERT chapters.
• Online students can read every note, solved question and question bank on the website, and practise as usual.
• Notes and question banks open only after you log in.` },
];

const ready = { profile: false, marks: false, verify: false };
ready.profile = !(await supabase.from("users").select("city, school, ambition, profile_visibility").limit(1)).error;
ready.marks = !(await supabase.from("school_marks").select("id").limit(1)).error;
ready.verify = ready.marks && !(await supabase.from("school_marks").select("verification_status, proof_paths").limit(1)).error;
console.log("Supabase scripts run?  profile fields:", ready.profile, "| school marks table:", ready.marks, "| marks verification:", ready.verify);

const { data: existing } = await supabase.from("announcements").select("title, target_class");
const already = new Set((existing || []).map((a) => `${a.target_class}|${a.title}`));

const todo = [];
for (const u of UPDATES) {
  if (u.needs && !ready[u.needs]) { console.log(`HOLD   (needs its Supabase script first) ${u.title}`); continue; }
  for (const aud of Array.isArray(u.audience) ? u.audience : [u.audience]) {
    if (already.has(`${aud}|${u.title}`)) { console.log(`skip   (already posted) [${aud}] ${u.title}`); continue; }
    todo.push({ aud, title: u.title, message: u.message });
  }
}
console.log(`\n${todo.length} update(s) ${post ? "to post now" : "would be posted (preview only; add --post)"}:`);
todo.forEach((t) => console.log(`  [${t.aud}] ${t.title}  --  ${t.message.split("\n\n")[0].slice(0, 90)}`));

if (post && todo.length) {
  // The list shows newest first, so insert the last one first: the first update in the list above ends up on top.
  const base = Date.now();
  for (let i = todo.length - 1; i >= 0; i--) {
    const t = todo[i];
    const { error } = await supabase.from("announcements").insert({ title: t.title, message: t.message, target_class: t.aud, created_by: "rohit13513@gmail.com", created_at: new Date(base + (todo.length - i) * 2000).toISOString() });
    console.log(error ? `FAILED [${t.aud}] ${t.title}: ${error.message}` : `posted [${t.aud}] ${t.title}`);
  }
}
