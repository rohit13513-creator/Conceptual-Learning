// Tests for the school-marks checking rules (marksVerification.ts). They use made-up document readings only -- no
// database, no real students. Run: npx tsx scripts/test-marks-verification.mts
import { signMarksReviewToken, verifyMarksReviewToken } from "../marksReviewToken.ts";
import { decideVerification, schoolNamesAgree, personNamesAgree, type ClaimedEntry, type DocumentRead } from "../marksVerification.ts";

let pass = 0, fail = 0;
const ok = (name: string, cond: boolean, extra = "") => { if (cond) { pass++; console.log("ok  ", name); } else { fail++; console.log("FAIL", name, extra); } };

const claimed: ClaimedEntry[] = [
  { entryId: "m", subject: "Maths", marksObtained: 64, maxMarks: 80 },
  { entryId: "s", subject: "Science", marksObtained: 70, maxMarks: 80 },
];
const baseRead = (): DocumentRead => ({
  documentKind: "result_card", schoolNameOnDocument: "Gaurs International School, Ghaziabad", studentNameOnDocument: "CHAITANYA BHATT",
  examNameOnDocument: "Half Yearly", looksEdited: false, editedReason: "",
  perEntry: [
    { entryId: "m", foundOnDocument: true, marksShown: 64, maxShown: 80, legible: true },
    { entryId: "s", foundOnDocument: true, marksShown: 70, maxShown: 80, legible: true },
  ],
});
const decide = (mut: (r: DocumentRead) => void, profile = { profileName: "Chaitanya Bhatt", profileSchool: "Gaur's International School" }) => {
  const read = baseRead(); mut(read);
  return decideVerification({ claimed, read, ...profile });
};
const statuses = (d: any) => (d.decisions ? d.decisions.map((x: any) => x.status).join(",") : "REFUSED");

ok("everything matches -> both verified", statuses(decide(() => {})) === "verified,verified");
ok("max marks reported as -1 (not shown), marks match -> verified", statuses(decide((r) => { r.perEntry[0].maxShown = -1; })) === "verified,verified");
ok("marks reported as -1 -> not checked", statuses(decide((r) => { r.perEntry[1].marksShown = -1; })) === "verified,unverified");
ok("max marks not shown, marks match -> verified", statuses(decide((r) => { r.perEntry[0].maxShown = null; })) === "verified,verified");
{
  const d: any = decide((r) => { r.perEntry[1].marksShown = 72; });
  ok("one wrong mark -> that one is a mismatch, the other still verified", statuses(d) === "verified,mismatch" && /shows 72\/80 for Science, but you entered 70\/80/.test(d.decisions[1].note), JSON.stringify(d.decisions));
}
ok("document shows a different maximum -> mismatch", statuses(decide((r) => { r.perEntry[0].maxShown = 100; })) === "mismatch,verified");
ok("subject not on the document -> not checked", statuses(decide((r) => { r.perEntry[1].foundOnDocument = false; r.perEntry[1].marksShown = null; })) === "verified,unverified");
ok("unclear number -> not checked, never verified", statuses(decide((r) => { r.perEntry[0].legible = false; })) === "unverified,verified");
ok("model leaves an entry out -> that entry is not checked", statuses(decide((r) => { r.perEntry.pop(); })) === "verified,unverified");
ok("a different school -> sent to the teacher, not ticked", statuses(decide((r) => { r.schoolNameOnDocument = "Delhi Public School, Noida"; })) === "review,review");
ok("a different student name -> sent to the teacher", statuses(decide((r) => { r.studentNameOnDocument = "Rahul Verma"; })) === "review,review");
ok("doubt about whether the page is genuine -> sent to the teacher", statuses(decide((r) => { r.authenticityDoubt = true; })) === "review,review");
ok("a doubt does not hide a wrong mark", statuses(decide((r) => { r.authenticityDoubt = true; r.perEntry[0].marksShown = 50; })) === "mismatch,review");
ok("signs of editing -> sent to the teacher", statuses(decide((r) => { r.looksEdited = true; })) === "review,review");
ok("a wrong mark is still a mismatch even when the school differs", statuses(decide((r) => { r.schoolNameOnDocument = "Delhi Public School"; r.perEntry[0].marksShown = 50; })) === "mismatch,review");
ok("profile school not filled in -> school is not compared", statuses(decide(() => {}, { profileName: "Chaitanya Bhatt", profileSchool: "" })) === "verified,verified");
ok("not a school document -> refused", statuses(decide((r) => { r.documentKind = "other"; })) === "REFUSED");
ok("unreadable photo -> refused", statuses(decide((r) => { r.documentKind = "not_readable"; })) === "REFUSED");
ok("no school name on the page -> refused", statuses(decide((r) => { r.schoolNameOnDocument = "  "; })) === "REFUSED");
ok("test copy front page is accepted", statuses(decide((r) => { r.documentKind = "test_copy_front_page"; })) === "verified,verified");

ok("school names: apostrophe, city and word order differences agree", schoolNamesAgree("Gaurs International School, Ghaziabad", "Gaur's International School") && schoolNamesAgree("St. Mary's Convent Sr. Sec. School", "St Marys School"));
ok("school names: clearly different schools disagree", !schoolNamesAgree("Delhi Public School", "Gaurs International School") && !schoolNamesAgree("Ryan International School", "Gaurs International School"));
ok("person names: capitals, initials and order agree", personNamesAgree("CHAITANYA BHATT", "Chaitanya Bhatt") && personNamesAgree("Bhatt Chaitanya", "Chaitanya Bhatt") && personNamesAgree("C. Bhatt", "Chaitanya Bhatt") && personNamesAgree("Chaitanya", "Chaitanya Bhatt"));
ok("person names: a different person disagrees", !personNamesAgree("Rahul Verma", "Chaitanya Bhatt"));

// ── the signed link in the teacher's e-mail ──
{
  const target = { email: "a@b.com", academicYear: "2026-27", examName: "Half Yearly" };
  const good = signMarksReviewToken(target, "secret-1");
  ok("e-mail link: a genuine link opens the right exam", JSON.stringify(verifyMarksReviewToken(good, "secret-1")) === JSON.stringify(target));
  ok("e-mail link: signed with another secret -> refused", verifyMarksReviewToken(good, "secret-2") === null);
  const [body, sig] = good.split(".");
  const forged = Buffer.from(JSON.stringify({ e: "someone-else@b.com", y: "2026-27", x: "Half Yearly", exp: Date.now() + 1e9 })).toString("base64url");
  ok("e-mail link: changing the student inside it -> refused", verifyMarksReviewToken(forged + "." + sig, "secret-1") === null);
  ok("e-mail link: damaged signature -> refused", verifyMarksReviewToken(body + "." + sig.slice(0, -2) + "xx", "secret-1") === null);
  ok("e-mail link: garbage -> refused", verifyMarksReviewToken("abc", "secret-1") === null && verifyMarksReviewToken("", "secret-1") === null);
  const realNow = Date.now; Date.now = () => realNow() + 15 * 24 * 60 * 60 * 1000;
  const expired = verifyMarksReviewToken(good, "secret-1"); Date.now = realNow;
  ok("e-mail link: stops working after 14 days", expired === null);
  const { signToken } = await import("../sessionToken.ts");
  ok("e-mail link: a normal login token cannot be used as a review link", verifyMarksReviewToken(signToken({ email: "a@b.com", role: "student" }, "secret-1"), "secret-1") === null);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
