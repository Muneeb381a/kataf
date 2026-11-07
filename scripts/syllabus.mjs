// Builds the detailed Kataf Academy syllabus PDF from scripts/syllabus-data.mjs.
//   npm run syllabus  ->  syllabus/Kataf-Academy-Syllabus.pdf
// This is a hand-out file. It is not served by the website.
import puppeteer from "puppeteer-core";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { syllabus, order } from "./syllabus-data.mjs";
import { site } from "../lib/config.ts";

const HOURS_PER_SESSION = 2;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const chrome = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
if (!chrome) throw new Error("Chrome or Edge not found");

const dataUri = (f) => "data:image/png;base64," + readFileSync(f).toString("base64");
const logoFull = dataUri("public/logo/alkausar.png");
const markPath = readFileSync("components/ui/Logo.tsx", "utf8").match(/MARK_PATH =\s*\n?\s*"([^"]+)"/)[1];
const mark = (w = 26, h = 24) => `<svg viewBox="70 70 1270 1180" width="${w}" height="${h}"><path fill="currentColor" fill-rule="evenodd" d="${markPath}"/></svg>`;

// ---- derived numbers -------------------------------------------------------
const courses = order
  .map((slug) => syllabus.find((c) => c.slug === slug))
  .map((c) => {
    const weeks = c.modules.reduce((n, x) => n + x.weeks, 0);
    const hoursPerWeek = c.perWeek * HOURS_PER_SESSION;
    let at = 1;
    const modules = c.modules.map((x) => {
      const from = at;
      at += x.weeks;
      return { ...x, from, to: at - 1, hours: x.weeks * hoursPerWeek };
    });
    return { ...c, weeks, hoursPerWeek, totalHours: weeks * hoursPerWeek, modules };
  });
const bySlug = Object.fromEntries(courses.map((c) => [c.slug, c]));
const beginner = courses.filter((c) => c.track === "beginner");
const advanced = courses.filter((c) => c.track === "advanced");
const weeksLabel = (a, b) => (a === b ? `Week ${a}` : `Weeks ${a}–${b}`);

const css = `
@page { size: A4; margin: 15mm 16mm 17mm }
* { box-sizing: border-box; margin: 0; padding: 0 }
:root { --paper:#fbf2df; --paper2:#f2e2c0; --ink:#14130f; --terra:#a8421c; --deep:#7a2c10; --tint:#f4d9c2; --wheat:#d9a23a; --muted:#6a5a47; --line:#e3cfa6 }
html { background: var(--paper) }
body { font-family: 'Outfit', 'Segoe UI', sans-serif; color: var(--ink); font-size: 10pt; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.serif { font-family: 'Fraunces', Georgia, serif; font-weight: 400; letter-spacing: -.02em }
.mono { font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .08em; font-size: 7.6pt }
.num { color: var(--terra) }
.muted { color: var(--muted) }
.break { break-before: page }
.avoid { break-inside: avoid }
h1, h2, h3, h4 { break-after: avoid }
.sec-title { font-size: 26pt; line-height: 1.05; margin: 3mm 0 4mm }
.lead { font-size: 11pt; line-height: 1.55; color: var(--muted); max-width: 150mm }
.rule { border-top: .45mm solid var(--ink); margin: 6mm 0 }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm }
.card { border: .3mm solid var(--ink); border-radius: 1.4mm; padding: 4mm; background: #fff8e9 }
.card h5 { font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .08em; font-size: 7.4pt; color: var(--terra); font-weight: 500; margin-bottom: 1.6mm }
.pt { display: grid; grid-template-columns: 9mm 1fr; padding: 3.2mm 0; border-top: .3mm solid var(--ink) }
.pt b { font-weight: 500; font-size: 10.5pt }
.pt p { color: var(--muted); margin-top: .6mm; font-size: 9.4pt }
.chip { display: inline-block; font-size: 7.8pt; border: .3mm solid var(--line); background: var(--tint); color: var(--deep); padding: .9mm 2mm; border-radius: 1mm; margin: 0 1.2mm 1.2mm 0 }
.badge { display: inline-block; background: var(--terra); color: var(--paper); padding: 1mm 2.4mm; border-radius: 1mm }
.badge.adv { background: var(--ink) }
table { width: 100%; border-collapse: collapse }
th { text-align: left; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .06em; font-size: 7.2pt; color: var(--muted); font-weight: 400; padding: 2mm 2mm 2mm 0; border-bottom: .45mm solid var(--ink) }
td { padding: 2.1mm 2mm 2.1mm 0; border-bottom: .25mm solid var(--line); vertical-align: top; font-size: 9.6pt }
td.r, th.r { text-align: right; white-space: nowrap }
tr { break-inside: avoid }
.cover { height: 297mm; background: var(--deep); color: var(--paper); padding: 22mm; position: relative; overflow: hidden }
.cover .big { font-size: 64pt; line-height: .98; margin-top: 34mm; position: relative }
.cover .big i { color: var(--wheat) }
.sun { position: absolute; right: -40mm; bottom: -40mm; width: 150mm; height: 150mm; border-radius: 50%; background: var(--wheat) }
.sun2 { position: absolute; right: -22mm; bottom: -22mm; width: 114mm; height: 114mm; border-radius: 50%; border: 1.2mm solid var(--deep) }
.chead { border-bottom: .5mm solid var(--ink); padding-bottom: 4mm; display: flex; justify-content: space-between; align-items: flex-start }
.cname { font-size: 30pt; line-height: 1.02; margin-top: 2mm }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); border: .3mm solid var(--ink); border-radius: 1.4mm; margin: 5mm 0; background: #fff8e9 }
.stats div { padding: 3mm 4mm; border-left: .3mm solid var(--line) }
.stats div:first-child { border-left: 0 }
.stats b { display: block; font-family: 'Fraunces', serif; font-weight: 400; font-size: 19pt; line-height: 1.1 }
.stats span { color: var(--muted) }
.est { font-size: 8.2pt; color: var(--muted); font-style: italic; margin-top: -2mm; margin-bottom: 4mm }
ul.ticks { list-style: none }
ul.ticks li { padding: 1mm 0 1mm 5.5mm; position: relative; border-top: .25mm solid var(--line); font-size: 9.4pt }
ul.ticks li:first-child { border-top: 0 }
ul.ticks li:before { content: '✓'; position: absolute; left: 0; color: var(--terra) }
.mod { border: .3mm solid var(--ink); border-radius: 1.4mm; margin-top: 4mm; background: #fffaf0; break-inside: avoid }
.mod .mh { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; padding: 3mm 4mm; border-bottom: .3mm solid var(--ink); background: var(--tint) }
.mod .mh h4 { font-size: 12.5pt; font-weight: 500; font-family: 'Fraunces', serif; letter-spacing: -.01em }
.mod .mb { display: grid; grid-template-columns: 1.1fr 1fr; gap: 5mm; padding: 3mm 4mm }
.mod ul { list-style: none }
.mod li { font-size: 9pt; padding: .35mm 0 .35mm 4.5mm; position: relative; color: #3b3226 }
.mod li:before { content: '→'; position: absolute; left: 0; color: var(--terra) }
.mod .lab { font-size: 9pt }
.mod h6 { font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .08em; font-size: 7pt; color: var(--terra); font-weight: 500; margin: 0 0 .8mm }
.mod .lab p + h6 { margin-top: 2.2mm }
.cap { background: var(--ink); color: var(--paper); border-radius: 1.4mm; padding: 5mm; margin-top: 6mm; break-inside: avoid }
.cap h5 { font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .08em; font-size: 7.4pt; color: var(--wheat); font-weight: 400; margin-bottom: 1.6mm }
.cap p { font-size: 10.5pt; line-height: 1.5 }
`;

const stat = (n, l) => `<div><b>${n}</b><span class="mono">${l}</span></div>`;

const cover = `<section class="cover">
  <div class="sun"></div><div class="sun2"></div>
  <div style="position:relative;display:inline-flex;align-items:center;gap:6mm"><div style="background:var(--paper);border-radius:2mm;padding:5mm 7mm"><img src="${logoFull}" style="height:30mm;display:block"></div><span class="mono" style="border:.3mm solid var(--paper);padding:1mm 2.5mm;border-radius:1mm">Kataf Academy</span></div>
  <div class="big serif">Course<br/>Syllabus<br/><i>${new Date().getFullYear()}</i></div>
  <p style="font-size:12.5pt;margin-top:12mm;max-width:108mm;line-height:1.5;position:relative;color:#f6e6c9">${courses.length} hands-on courses, beginner and advanced, with weekly plans, estimated durations, projects and an internship for every course.</p>
  <div class="mono" style="position:absolute;left:22mm;bottom:20mm;color:#f6e6c9">${esc(site.city)} · ${esc(site.domain)}</div>
</section>`;

const glanceRows = (list) =>
  list
    .map(
      (c) =>
        `<tr><td><span class="serif" style="font-size:13pt">${esc(c.name)}</span></td><td class="r">${c.weeks} weeks</td><td class="r">${c.perWeek} × ${HOURS_PER_SESSION} h / week</td><td class="r"><b>${c.totalHours} h</b></td></tr>`
    )
    .join("");

const paths = [
  ["Office professional", ["computer-essentials"]],
  ["Designer", ["graphic-designing", "graphic-designing-advanced"]],
  ["Video editor", ["video-editing"]],
  ["Digital marketer", ["digital-marketing", "ai"]],
  ["Frontend developer", ["web-development"]],
  ["Backend developer", ["web-development", "backend-development"]],
  ["Full stack developer", ["full-stack-development"]],
  ["Content creator", ["graphic-designing", "video-editing", "digital-marketing"]],
];

const how = [
  ["You work in every session", "Each class is a working session. You do the task yourself, on your own computer, with the instructor beside you."],
  ["Every module ends in a build", "No module is finished until you have made something: a design, a page, an API, a video, a spreadsheet."],
  ["Feedback on your own work", "We review what you made, show you what to fix, and you fix it."],
  ["A capstone you can show", "Every course ends with a project for your portfolio."],
];

const front = `<section>
  <p class="mono num">01 / About this syllabus</p>
  <h2 class="serif sec-title">Built around doing the work.</h2>
  <p class="lead">Every course is a sequence of modules. Each module has topics, a hands-on lab you complete in class, and a deliverable you finish. Nothing is only watched.</p>
  <div class="rule"></div>
  <div class="grid3">
    <div class="card"><h5>Session</h5><b class="serif" style="font-size:20pt;font-weight:400">${HOURS_PER_SESSION} hours</b><p class="muted" style="margin-top:1mm">Each class is a working session on your own computer.</p></div>
    <div class="card"><h5>Week</h5><b class="serif" style="font-size:20pt;font-weight:400">3 sessions</b><p class="muted" style="margin-top:1mm">6 hours a week. Full Stack runs 4 sessions, 8 hours a week.</p></div>
    <div class="card"><h5>Plus</h5><b class="serif" style="font-size:20pt;font-weight:400">Practice</b><p class="muted" style="margin-top:1mm">Expect a few hours of your own practice each week. It is not counted in the totals.</p></div>
  </div>
  <p class="est" style="margin-top:5mm">All durations in this document are estimates for planning. Final batch length, dates and fees are confirmed in writing at admission.</p>
  <h3 class="serif" style="font-size:18pt;margin-top:8mm">Courses at a glance</h3>
  <p class="mono" style="margin:4mm 0 1mm"><span class="badge">Beginner</span> &nbsp;No experience needed</p>
  <table><thead><tr><th>Course</th><th class="r">Duration</th><th class="r">Schedule</th><th class="r">Total</th></tr></thead><tbody>${glanceRows(beginner)}</tbody></table>
  <p class="mono" style="margin:6mm 0 1mm"><span class="badge adv">Advanced</span> &nbsp;Professional tracks</p>
  <table><thead><tr><th>Course</th><th class="r">Duration</th><th class="r">Schedule</th><th class="r">Total</th></tr></thead><tbody>${glanceRows(advanced)}</tbody></table>
</section>

<section class="break">
  <p class="mono num">02 / Learning paths</p>
  <h2 class="serif sec-title">Where each path can take you.</h2>
  <p class="lead">Start at the level that matches you. Estimated time is the sum of the course durations.</p>
  <div style="margin-top:5mm"><table><thead><tr><th>Path</th><th>Courses, in order</th><th class="r">Estimated time</th></tr></thead><tbody>
  ${paths
    .map(([name, slugs]) => {
      const w = slugs.reduce((n, s) => n + bySlug[s].weeks, 0);
      return `<tr><td><span class="serif" style="font-size:12.5pt">${name}</span></td><td>${slugs.map((s) => esc(bySlug[s].name)).join(" → ")}</td><td class="r"><b>${w} weeks</b></td></tr>`;
    })
    .join("")}
  </tbody></table></div>
  <p class="mono num" style="margin-top:10mm">03 / How we teach</p>
  <h2 class="serif sec-title">We do not just teach. You get full hands-on experience.</h2>
  <div style="margin-top:3mm">${how.map(([t, d], i) => `<div class="pt"><span class="mono num">0${i + 1}</span><div><b>${t}</b><p>${d}</p></div></div>`).join("")}<div style="border-top:.3mm solid var(--ink)"></div></div>
</section>

<section class="break">
  <p class="mono num">04 / Assessment, certificate and internship</p>
  <h2 class="serif sec-title">How you are assessed, and what you receive.</h2>
  <div class="grid2" style="margin-top:4mm">
    <div class="card"><h5>Assessment</h5><ul class="ticks"><li>A hands-on lab in every session, reviewed by the instructor.</li><li>A deliverable at the end of every module.</li><li>A capstone project reviewed against a clear checklist.</li></ul></div>
    <div class="card"><h5>Certificate</h5><ul class="ticks"><li>Awarded when every module deliverable and the capstone are complete.</li><li>Carries your name, the course and a unique ID.</li><li>Anyone can verify it online at ${esc(site.domain)}/verify.</li></ul></div>
  </div>
  <div class="card" style="margin-top:5mm"><h5>Internship</h5><p>An internship follows every course, working with the team on real tasks with feedback. Estimated length: <b>4 to 8 weeks</b>, part-time. Dates, hours and terms are explained at admission, before you pay.</p></div>
  <div class="card" style="margin-top:5mm"><h5>Batches</h5><p>Men and women study in separate batches with their own timings. Choose your batch and a preferred slot on the admission form.</p></div>
</section>`;

const courseHtml = (c) => {
  const adv = c.track === "advanced";
  return `<section class="break">
  <div class="chead"><div><p class="mono num">Course ${order.indexOf(c.slug) + 1} of ${courses.length}</p><div class="cname serif">${esc(c.name)}</div></div><span class="badge mono ${adv ? "adv" : ""}">${adv ? "Advanced" : "Beginner"}</span></div>
  <div class="stats">${stat(c.weeks, "weeks")}${stat(`${c.perWeek} × ${HOURS_PER_SESSION} h`, "per week")}${stat(c.totalHours + " h", "class time")}${stat("4–8 wk", "internship")}</div>
  <p class="est">Estimated durations. Class time is hands-on sessions only, not self-practice or the internship.</p>
  <p class="lead" style="max-width:none">${esc(c.overview)}</p>
  <div class="grid2" style="margin-top:5mm">
    <div class="card"><h5>Who it is for</h5>${esc(c.audience)}<h5 style="margin-top:3mm">Before you start</h5>${esc(c.prerequisites)}</div>
    <div class="card"><h5>By the end you can</h5><ul class="ticks">${c.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}</ul></div>
  </div>
  <p style="margin-top:4mm"><span class="mono num" style="margin-right:2mm">Tools</span>${c.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</p>
  <div class="avoid"><h3 class="serif" style="font-size:16pt;margin-top:6mm;margin-bottom:2mm">Plan at a glance</h3>
  <table><thead><tr><th>Module</th><th class="r">When</th><th class="r">Hours</th></tr></thead><tbody>
  ${c.modules.map((x, i) => `<tr><td><span class="mono num" style="margin-right:2mm">${String(i + 1).padStart(2, "0")}</span>${esc(x.name)}</td><td class="r">${weeksLabel(x.from, x.to)}</td><td class="r">${x.hours} h</td></tr>`).join("")}
  <tr><td><b>Total</b></td><td class="r"><b>${c.weeks} weeks</b></td><td class="r"><b>${c.totalHours} h</b></td></tr>
  </tbody></table></div>
  <h3 class="serif" style="font-size:16pt;margin-top:7mm">Module by module</h3>
  ${c.modules
    .map(
      (x, i) => `<div class="mod"><div class="mh"><h4><span class="mono num" style="margin-right:2mm">${String(i + 1).padStart(2, "0")}</span>${esc(x.name)}</h4><span class="mono muted">${weeksLabel(x.from, x.to)} · ${x.hours} h</span></div>
      <div class="mb"><div><h6>Topics</h6><ul>${x.topics.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
      <div class="lab"><h6>Hands-on lab</h6><p>${esc(x.lab)}</p><h6>You finish with</h6><p><b style="font-weight:500">${esc(x.deliverable)}</b></p></div></div></div>`
    )
    .join("")}
  <div class="cap"><h5>Capstone project</h5><p>${esc(c.capstone)}</p></div>
  <div class="grid2" style="margin-top:5mm">
    <div class="card avoid"><h5>Where it leads</h5><ul class="ticks">${c.careers.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="card avoid"><h5>Internship role</h5><p><b style="font-weight:500">${esc(c.internship)}</b>. Work alongside the team on real tasks, with feedback.</p><h5 style="margin-top:3mm">${c.next.length ? "Good next steps" : "Next"}</h5>${c.next.length ? c.next.map((n) => `<span class="chip">${esc(n)}</span>`).join("") : '<p class="muted">This is the end of the path.</p>'}</div>
  </div>
</section>`;
};

const back = `<section style="background:var(--deep);color:var(--paper);padding:22mm 22mm;height:297mm">
  <div style="background:var(--paper);display:inline-block;border-radius:2mm;padding:4mm 6mm;margin-bottom:14mm"><img src="${logoFull}" style="height:24mm;display:block"></div>
  <p class="mono" style="color:var(--wheat)">Join the Academy</p>
  <h2 class="serif" style="font-size:38pt;line-height:1.02;margin-top:5mm;max-width:150mm">Ready to start? <i style="color:var(--wheat)">Apply.</i></h2>
  <p style="font-size:11.5pt;margin-top:6mm;max-width:130mm;color:#f6e6c9">Send the admission form on our website or message us on WhatsApp. We reply with the fee, the next batch dates and what to bring, in writing, before you decide.</p>
  <div style="border-top:.45mm solid #f6e6c9;margin:9mm 0 0"></div>
  ${[["Web", site.domain + "/apply"], ["Email", site.email], ["Visit", site.city + " · " + site.hours], ["Verify", site.domain + "/verify"]]
    .map(([k, v]) => `<div style="display:grid;grid-template-columns:24mm 1fr;padding:4mm 0;border-bottom:.3mm solid #c98a6e"><span class="mono" style="color:var(--wheat)">${k}</span><b style="font-weight:500;font-size:12pt">${esc(v)}</b></div>`)
    .join("")}
</section>`;

const body = front + courses.map(courseHtml).join("");
const head = `<!doctype html><html><head><meta charset="utf-8"><title>Al-Kausar Computer Institute · Kataf Academy Syllabus</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style></head>`;

mkdirSync("syllabus", { recursive: true });
writeFileSync("syllabus/syllabus.html", `${head}<body>${body}</body></html>`);
writeFileSync("syllabus/back.html", `${head}<body style="margin:0"><style>@page{margin:0}</style>${back}</body></html>`);
writeFileSync("syllabus/cover.html", `${head}<body style="margin:0"><style>@page{margin:0}</style>${cover}</body></html>`);

const browser = await puppeteer.launch({ executablePath: chrome, headless: "new" });
const url = (f) => "file:///" + process.cwd().split("\\").join("/") + "/syllabus/" + f;
const render = async (file, opts) => {
  const pg = await browser.newPage();
  await pg.goto(url(file), { waitUntil: "networkidle0" });
  await pg.evaluate(() => document.fonts.ready);
  const buf = await pg.pdf({ format: "A4", printBackground: true, ...opts });
  await pg.close();
  return buf;
};
const coverPdf = await render("cover.html", { margin: { top: 0, right: 0, bottom: 0, left: 0 } });
const backPdf = await render("back.html", { margin: { top: 0, right: 0, bottom: 0, left: 0 } });
const bodyPdf = await render("syllabus.html", { margin: { top: "15mm", right: "16mm", bottom: "17mm", left: "16mm" } });
await browser.close();

// assemble: cover, body pages on a cream underlay (so the margins are cream too), back page
const out = await PDFDocument.create();
const cream = rgb(0xfb / 255, 0xf2 / 255, 0xdf / 255);
const addAsIs = async (buf) => {
  const src = await PDFDocument.load(buf);
  (await out.copyPages(src, src.getPageIndices())).forEach((p) => out.addPage(p));
};
await addAsIs(coverPdf);
const bodySrc = await PDFDocument.load(bodyPdf);
for (const emb of await out.embedPdf(bodySrc, bodySrc.getPageIndices())) {
  const p = out.addPage([emb.width, emb.height]);
  p.drawRectangle({ x: 0, y: 0, width: emb.width, height: emb.height, color: cream });
  p.drawPage(emb);
}
await addAsIs(backPdf);
const font = await out.embedFont(StandardFonts.Helvetica);
const markImg = await out.embedPng(readFileSync("public/logo/alkausar-mark.png"));
const pages = out.getPages();
const total = pages.length;
pages.forEach((p, i) => {
  if (i === 0 || i === total - 1) return;
  const { width } = p.getSize();
  const grey = rgb(0.42, 0.35, 0.28);
  const mh = 15;
  p.drawImage(markImg, { x: 45, y: 17, width: mh * (640 / 345), height: mh });
  p.drawText("AL-KAUSAR COMPUTER INSTITUTE  -  KATAF ACADEMY  -  SYLLABUS", { x: 45 + mh * (640 / 345) + 8, y: 22, size: 7, font, color: grey });
  const n = `${i + 1} / ${total}`;
  p.drawText(n, { x: width - 45 - font.widthOfTextAtSize(n, 7), y: 22, size: 7, font, color: grey });
});
writeFileSync("syllabus/Kataf-Academy-Syllabus.pdf", await out.save());
console.log(`Saved syllabus/Kataf-Academy-Syllabus.pdf (${total} pages)`);
