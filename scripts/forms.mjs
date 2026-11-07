// Builds the printable hand-outs from scripts/syllabus-data.mjs and lib/schedule.ts:
//   syllabus/Al-Kausar-Admission-Form.pdf       a two-page admission form
//   syllabus/Al-Kausar-Course-Sheets.pdf        one page per course, all together
//   syllabus/course-sheets/<course>.pdf         the same pages, one file each
// Run with: npm run forms
import puppeteer from "puppeteer-core";
import { PDFDocument } from "pdf-lib";
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { syllabus, order } from "./syllabus-data.mjs";
import { site, whatsappDisplay } from "../lib/config.ts";
import { batches } from "../lib/schedule.ts";

const HOURS_PER_SESSION = 2;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const chrome = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
if (!chrome) throw new Error("Chrome or Edge not found");
const dataUri = (f) => "data:image/png;base64," + readFileSync(f).toString("base64");
const logo = dataUri("public/logo/alkausar.png");
const markImg = dataUri("public/logo/alkausar-mark.png");

const courses = order
  .map((slug) => syllabus.find((c) => c.slug === slug))
  .map((c) => {
    const weeks = c.modules.reduce((n, x) => n + x.weeks, 0);
    let at = 1;
    const modules = c.modules.map((x) => {
      const from = at;
      at += x.weeks;
      return { ...x, from, to: at - 1 };
    });
    return { ...c, weeks, totalHours: weeks * c.perWeek * HOURS_PER_SESSION, modules };
  });
const weeksLabel = (a, b) => (a === b ? `Wk ${a}` : `Wk ${a}–${b}`);
const firstSentence = (t) => (t.match(/^.*?[.!?](\s|$)/) || [t])[0].trim();

const css = `
@page { size: A4; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
:root { --paper:#fbf2df; --ink:#14130f; --terra:#a8421c; --deep:#7a2c10; --tint:#f4d9c2; --wheat:#d9a23a; --muted:#6a5a47; --line:#e3cfa6; --green:#033703 }
html { background: var(--paper) }
body { font-family: 'Outfit', 'Segoe UI', sans-serif; color: var(--ink); font-size: 9.6pt; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.serif { font-family: 'Fraunces', Georgia, serif; font-weight: 400; letter-spacing: -.02em }
.mono { font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .08em; font-size: 7pt }
.num { color: var(--terra) }
.muted { color: var(--muted) }
.page { width: 210mm; height: 297mm; padding: 9mm 13mm 8mm; position: relative; overflow: hidden; background: var(--paper); break-after: page; display: flex; flex-direction: column }
.page:last-child { break-after: auto }
.top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 2.4mm; border-bottom: .5mm solid var(--ink) }
.top img { height: 12.5mm; display: block }
.badge { display: inline-block; background: var(--terra); color: var(--paper); padding: 1mm 2.4mm; border-radius: 1mm }
.badge.adv { background: var(--ink) }
h5, h6 { font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .08em; font-size: 7pt; color: var(--terra); font-weight: 500; margin-bottom: 1.4mm }
.card { border: .3mm solid var(--ink); border-radius: 1.4mm; padding: 2.6mm 3.4mm; background: #fff8e9 }
.chip { display: inline-block; font-size: 7.6pt; border: .3mm solid var(--line); background: var(--tint); color: var(--deep); padding: .6mm 1.8mm; border-radius: 1mm; margin: 0 1mm 1mm 0 }
ul.ticks { list-style: none }
ul.ticks li { padding: .5mm 0 .5mm 5mm; position: relative; border-top: .25mm solid var(--line); font-size: 8.4pt; line-height: 1.34 }
ul.ticks li:first-child { border-top: 0 }
ul.ticks li:before { content: '✓'; position: absolute; left: 0; color: var(--terra) }
.foot { margin-top: auto; border-top: .45mm solid var(--ink); padding-top: 2mm; display: flex; justify-content: space-between; gap: 6mm; align-items: flex-end }
.foot b { font-weight: 500 }

/* ---- course sheet ---- */
.ctitle { font-size: 27pt; line-height: 1.02; margin: 2.6mm 0 1.2mm }
.tag { font-size: 10pt; color: var(--muted); max-width: 165mm; line-height: 1.45 }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); border: .3mm solid var(--ink); border-radius: 1.4mm; margin: 2.8mm 0; background: #fff8e9 }
.stats span { font-size: 6.2pt; letter-spacing: .05em; white-space: nowrap }
.stats div { padding: 1.6mm 3.2mm; border-left: .3mm solid var(--line) }
.stats div:first-child { border-left: 0 }
.stats b { display: block; font-family: 'Fraunces', serif; font-weight: 400; font-size: 14.5pt; line-height: 1.1 }
.cols { display: grid; grid-template-columns: 1.15fr 1fr; gap: 4mm }
.plan-h { display: flex; justify-content: space-between; align-items: baseline; margin: 3mm 0 1.4mm }
.plan-h h3 { font-size: 14pt }
.plan { display: grid; grid-template-columns: 1fr 1fr; gap: 1.6mm 3mm }
.m { border: .3mm solid var(--ink); border-radius: 1.2mm; background: #fffaf0; overflow: hidden }
.m .mh { display: flex; justify-content: space-between; align-items: baseline; gap: 2mm; padding: .9mm 2.6mm; background: var(--tint); border-bottom: .3mm solid var(--ink) }
.m .mh b { font-family: 'Fraunces', serif; font-weight: 500; font-size: 9.6pt; letter-spacing: -.01em }
.m .mh span { white-space: nowrap }
.m p { padding: 1mm 2.6mm 1.2mm; font-size: 7.5pt; line-height: 1.34; color: #3b3226 }
.dense .m p { font-size: 7.2pt; line-height: 1.3; padding-top: .6mm; padding-bottom: .8mm }
.dense .plan { gap: 1.2mm 3mm }
.dense .cap { margin-top: 2.2mm; padding: 2mm 4mm }
.dense .m .mh { padding: .8mm 2.4mm }
.dense .ctitle { font-size: 26pt; margin-top: 2.4mm }
.dense .stats { margin: 2.4mm 0 }
.cap { background: var(--ink); color: var(--paper); border-radius: 1.4mm; padding: 2.6mm 4mm; margin-top: 3mm }
.cap h5 { color: var(--wheat) }
.cap p { font-size: 8.6pt; line-height: 1.4 }
.pair { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 2.6mm }

/* ---- form ---- */
.ftitle { font-size: 30pt; line-height: 1; margin-top: 1mm }
.sec { margin-top: 4.4mm }
.sec > .mono { display: flex; align-items: center; gap: 2mm; margin-bottom: 2mm; color: var(--terra) }
.sec > .mono:after { content: ''; flex: 1; height: .3mm; background: var(--ink) }
.f { display: grid; gap: 3.2mm 4mm }
.f2 { grid-template-columns: 1fr 1fr } .f3 { grid-template-columns: 1fr 1fr 1fr } .f1 { grid-template-columns: 1fr }
.fld > span { display: block; font-size: 7.6pt; color: var(--muted); margin-bottom: .6mm }
.fld i { display: block; height: 6.6mm; border-bottom: .3mm solid var(--ink); background: #fff8e9 }
.box { display: inline-flex; align-items: center; gap: 1.6mm; margin: 0 4mm 1.4mm 0; font-size: 9pt; white-space: nowrap }
.box:before { content: ''; width: 3.6mm; height: 3.6mm; border: .35mm solid var(--ink); background: #fff8e9; border-radius: .5mm; display: inline-block }
.photo { width: 30mm; height: 38mm; border: .35mm dashed var(--muted); display: flex; align-items: center; justify-content: center; text-align: center; color: var(--muted); font-size: 7.4pt; line-height: 1.3; background: #fff8e9 }
.crow { display: grid; grid-template-columns: 1fr 1fr; gap: .6mm 5mm }
.crow .box { margin-right: 0; justify-content: flex-start; white-space: normal }
.crow .box small { color: var(--muted); font-size: 7.6pt; margin-left: 1mm }
.cg { font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .08em; font-size: 6.8pt; color: var(--muted); margin: 1.4mm 0 .8mm }
.slotbox { border: .3mm solid var(--ink); border-radius: 1.4mm; padding: 2.6mm 3.4mm; background: #fff8e9 }
.terms { counter-reset: t }
.terms li { list-style: none; display: grid; grid-template-columns: 7mm 1fr; padding: 1.2mm 0; border-top: .25mm solid var(--line); font-size: 9pt }
.terms li:before { counter-increment: t; content: '0' counter(t); font-family: 'JetBrains Mono', monospace; font-size: 7.4pt; color: var(--terra); padding-top: .4mm }
.sig { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8mm; margin-top: 9mm }
.sig div { border-top: .35mm solid var(--ink); padding-top: 1.2mm; font-size: 7.6pt; color: var(--muted) }
.office { border: .4mm solid var(--ink); border-radius: 1.4mm; margin-top: 4mm; background: #f2e2c0 }
.office .oh { padding: 1.6mm 4mm; background: var(--ink); color: var(--paper); border-radius: 1mm 1mm 0 0 }
.office .ob { padding: 3mm 4mm 4mm }
.slip { margin-top: 5mm; border-top: .4mm dashed var(--ink); padding-top: 3mm; position: relative }
.slip:before { content: '✂'; position: absolute; top: -3.4mm; left: 6mm; background: var(--paper); padding: 0 2mm; font-size: 10pt }
`;

/* ------------------------------ course sheets ------------------------------ */
const sheet = (c) => {
  const adv = c.track === "advanced";
  const dense = c.modules.length > 9;
  const modules = c.modules
    .map((x, i) => {
      const topics = x.topics.slice(0, 3).join(" · ");
      return `<div class="m"><div class="mh"><b><span class="mono num" style="margin-right:1.6mm">${String(i + 1).padStart(2, "0")}</span>${esc(x.name)}</b><span class="mono muted">${weeksLabel(x.from, x.to)}</span></div><p>${esc(topics)}</p></div>`;
    })
    .join("");
  return `<section class="page ${dense ? "dense" : ""}">
  <div class="top"><img src="${logo}" alt=""><div style="text-align:right"><span class="badge mono ${adv ? "adv" : ""}">${adv ? "Advanced" : "Beginner"} course</span><p class="mono muted" style="margin-top:1.6mm">Course ${order.indexOf(c.slug) + 1} of ${courses.length}</p></div></div>
  <div class="ctitle serif">${esc(c.name)}</div>
  <p class="tag">${esc(firstSentence(c.overview))}</p>
  <div class="stats">
    <div><b>${c.weeks} weeks</b><span class="mono muted">Estimated duration</span></div>
    <div><b>${c.perWeek} × ${HOURS_PER_SESSION} h</b><span class="mono muted">Classes per week</span></div>
    <div><b>${c.totalHours} h</b><span class="mono muted">Hands-on class time</span></div>
    <div><b>Included</b><span class="mono muted">Internship + certificate</span></div>
  </div>
  <div class="cols">
    <div class="card"><h5>What you will learn</h5><ul class="ticks">${c.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}</ul><h5 style="margin-top:2mm">Tools you will use</h5>${c.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
    <div class="card"><h5>Who it is for</h5><p style="font-size:8.4pt">${esc(c.audience)}</p><h5 style="margin-top:2mm">Before you start</h5><p style="font-size:8.4pt">${esc(c.prerequisites)}</p><h5 style="margin-top:2mm">Where it leads</h5>${c.careers.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div>
  </div>
  <div class="plan-h"><h3 class="serif">Your course, step by step</h3><span class="mono muted">${c.modules.length} modules · every one has a hands-on lab</span></div>
  <div class="plan">${modules}</div>
  <div class="cap"><h5>You finish with a real project</h5><p>${esc(c.capstone)}</p></div>
  <div class="card" style="margin-top:2.6mm;display:flex;gap:4mm;align-items:baseline"><h5 style="margin:0;white-space:nowrap">Internship</h5><p style="font-size:8.4pt"><b style="font-weight:500">${esc(c.internship)}</b>. After the course, work with the team on real tasks, with feedback.</p></div>
  <div class="foot">
    <div><p class="mono num">Fee and next batch</p><p><b>WhatsApp ${esc(whatsappDisplay)}</b> · ${esc(site.email)}</p></div>
    <div style="text-align:right"><p class="mono num">Certificate</p><p>Verify online: <b>${esc(site.domain)}/verify</b></p></div>
  </div>
</section>`;
};

/* ---------------------------------- form ---------------------------------- */
const fld = (label) => `<div class="fld"><span>${label}</span><i></i></div>`;
const box = (t) => `<span class="box">${t}</span>`;
const courseBox = (c) => `<span class="box">${esc(c.name)}<small>${c.weeks} wk · ${c.totalHours} h</small></span>`;
const slotLine = (key) =>
  `<p class="cg">${key === "men" ? "Men's batch" : "Women's batch"}</p>` +
  batches[key].slots.map((s) => `<span class="box">${esc(s.name)} <small>${esc(s.time)}, ${s.days.join("/")}</small></span>`).join("");

const formPage1 = `<section class="page">
  <div class="top"><img src="${logo}" alt=""><div style="text-align:right"><p class="mono num">Admission form</p><p class="mono muted" style="margin-top:1.4mm">Form no. ______________ &nbsp; Date ____ / ____ / ________</p></div></div>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-top:3mm;gap:6mm">
    <div><div class="ftitle serif">Admission <i style="color:var(--terra)">form</i></div><p class="muted" style="margin-top:2mm;max-width:130mm">Please fill in capital letters, tick the boxes that apply, and sign on the second page. We confirm your seat and timings in writing.</p></div>
    <div class="photo">Passport<br>size photo</div>
  </div>

  <div class="sec"><div class="mono">01 · About you</div>
    <div class="f f2">${fld("Full name")}${fld("Father's / guardian's name")}</div>
    <div class="f f3" style="margin-top:3.2mm">${fld("Date of birth")}${fld("CNIC / B-form no.")}<div class="fld"><span>Gender</span><div style="padding-top:1.4mm">${box("Male")}${box("Female")}</div></div></div>
    <div class="f f3" style="margin-top:3.2mm">${fld("Mobile no.")}${fld("WhatsApp no.")}${fld("Email (optional)")}</div>
    <div class="f f2" style="margin-top:3.2mm">${fld("Home address")}${fld("City")}</div>
    <div style="margin-top:3mm"><p class="cg" style="margin-top:0">Education</p>${box("Matric")}${box("Intermediate")}${box("Bachelor's")}${box("Master's")}${box("Other")}
    <p class="cg">Currently</p>${box("Student")}${box("Job")}${box("Business")}${box("Housewife")}${box("Other")}</div>
  </div>

  <div class="sec"><div class="mono">02 · Course you are joining</div>
    <p class="cg" style="margin-top:0">Beginner courses</p><div class="crow">${courses.filter((c) => c.track === "beginner").map(courseBox).join("")}</div>
    <p class="cg">Advanced courses</p><div class="crow">${courses.filter((c) => c.track === "advanced").map(courseBox).join("")}</div>
    <div style="margin-top:1.6mm">${box("Not sure, help me choose")}</div>
  </div>

  <div class="sec"><div class="mono">03 · Batch and timing</div>
    <div class="slotbox"><p class="cg" style="margin-top:0">Separate batches for men and women. Tick one batch and your preferred slot.</p>${slotLine("men")}${slotLine("women")}</div>
  </div>

  <div class="foot"><p class="mono muted">Page 1 of 2 · continue overleaf</p><p class="mono muted">${esc(site.email)} · ${esc(whatsappDisplay)}</p></div>
</section>`;

const formPage2 = `<section class="page">
  <div class="top"><img src="${markImg}" alt="" style="height:11mm"><p class="mono num">Admission form · page 2 of 2</p></div>

  <div class="sec" style="margin-top:4mm"><div class="mono">04 · A little more</div>
    <p class="cg" style="margin-top:0">Computer experience</p>${box("None")}${box("Some")}${box("Good")}
    <p class="cg">What do you want after the course</p>${box("A job")}${box("Freelancing")}${box("My own business")}${box("New skills")}
    <p class="cg">How did you hear about us</p>${box("Facebook")}${box("Instagram")}${box("WhatsApp")}${box("Friend / family")}${box("Walked in")}${box("Website")}${box("Other")}
  </div>
  <div class="sec"><div class="mono">05 · Emergency contact</div>
    <div class="f f3">${fld("Name")}${fld("Relation")}${fld("Phone")}</div>
  </div>

  <div class="sec"><div class="mono">06 · What you can expect, and what we expect</div>
    <ol class="terms">
      <li><span>Every course is hands-on. You work on your own computer in every session, and you finish each module with something you built.</span></li>
      <li><span>You receive a certificate with your name, the course and a unique ID after you complete every module and the final project. Anyone can check the ID at ${esc(site.domain)}/verify.</span></li>
      <li><span>An internship follows every course. The dates, hours and terms are explained to you at admission, before you pay.</span></li>
      <li><span>Men and women study in separate batches. The batch and timing you tick here are confirmed to you in writing.</span></li>
      <li><span>I will attend regularly, finish the assigned practice, and treat the institute, its equipment and other students with respect.</span></li>
      <li><span>The fee, instalments and any refund terms are given to me in writing, and I have read them before paying. The details on this form are correct.</span></li>
    </ol>
  </div>

  <div class="sig"><div>Student's signature<br>Date: ____ / ____ / ________</div><div>Parent / guardian's signature<br>(if under 18)</div><div>Received by<br>(institute stamp)</div></div>

  <div class="office"><div class="oh mono">For office use only</div><div class="ob">
    <div class="f f3">${fld("Roll no.")}${fld("Batch and slot")}${fld("Start date")}</div>
    <div class="f f3" style="margin-top:3.2mm">${fld("Total fee")}${fld("Paid today")}${fld("Balance")}</div>
    <div class="f f3" style="margin-top:3.2mm">${fld("Receipt no.")}${fld("Next payment date")}${fld("Admitted by")}</div>
    <div style="margin-top:3mm">${box("Documents checked")}${box("Photo received")}${box("Added to WhatsApp group")}</div>
  </div></div>

  <div class="slip">
    <div style="display:flex;justify-content:space-between;align-items:center"><img src="${logo}" alt="" style="height:12mm"><p class="mono num">Student's admission slip · keep this</p></div>
    <div class="f" style="margin-top:2.4mm;grid-template-columns:1.4fr 1.2fr 1fr .7fr">${fld("Student name")}${fld("Course")}${fld("Batch and slot")}${fld("Roll no.")}</div>
    <p class="muted" style="margin-top:2.4mm;font-size:8pt">Questions? WhatsApp ${esc(whatsappDisplay)} · ${esc(site.email)}</p>
  </div>
</section>`;

/* ---------------------------------- build ---------------------------------- */
const head = `<!doctype html><html><head><meta charset="utf-8"><title>Al-Kausar Computer Institute</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style></head>`;

mkdirSync("syllabus/course-sheets", { recursive: true });
const tmp = "syllabus/_tmp";
mkdirSync(tmp, { recursive: true });
writeFileSync(`${tmp}/form.html`, `${head}<body>${formPage1}${formPage2}</body></html>`);
writeFileSync(`${tmp}/sheets.html`, `${head}<body>${courses.map(sheet).join("")}</body></html>`);

const browser = await puppeteer.launch({ executablePath: chrome, headless: "new" });
const render = async (file) => {
  const pg = await browser.newPage();
  await pg.goto("file:///" + process.cwd().split("\\").join("/") + `/${tmp}/${file}`, { waitUntil: "networkidle0" });
  await pg.evaluate(() => document.fonts.ready);
  const buf = await pg.pdf({ width: "210mm", height: "297mm", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await pg.close();
  return buf;
};
const overflow = async (file) => {
  const pg = await browser.newPage();
  await pg.goto("file:///" + process.cwd().split("\\").join("/") + `/${tmp}/${file}`, { waitUntil: "networkidle0" });
  await pg.evaluate(() => document.fonts.ready);
  const bad = await pg.$$eval(".page", (els) => els.map((e, i) => (e.scrollHeight > e.clientHeight + 1 ? i + 1 : 0)).filter(Boolean));
  await pg.close();
  return bad;
};
for (const f of ["form.html", "sheets.html"]) {
  const bad = await overflow(f);
  if (bad.length) console.warn(`WARNING: ${f} page(s) ${bad.join(", ")} overflow the A4 page and are cut off.`);
}
const formPdf = await render("form.html");
const sheetsPdf = await render("sheets.html");
await browser.close();

writeFileSync("syllabus/Al-Kausar-Admission-Form.pdf", formPdf);
writeFileSync("syllabus/Al-Kausar-Course-Sheets.pdf", sheetsPdf);

const all = await PDFDocument.load(sheetsPdf);
const pages = all.getPageCount();
if (pages !== courses.length) console.warn(`WARNING: expected ${courses.length} sheet pages but got ${pages}. A sheet overflowed onto a second page.`);
for (let i = 0; i < Math.min(pages, courses.length); i++) {
  const one = await PDFDocument.create();
  const [p] = await one.copyPages(all, [i]);
  one.addPage(p);
  writeFileSync(`syllabus/course-sheets/${courses[i].slug}.pdf`, await one.save());
}
const formPages = (await PDFDocument.load(formPdf)).getPageCount();
if (formPages !== 2) console.warn(`WARNING: the form is ${formPages} pages, expected 2.`);
if (!process.env.KEEP_TMP) rmSync(tmp, { recursive: true, force: true });
console.log(`Form: ${formPages} pages. Course sheets: ${pages} pages.`);
