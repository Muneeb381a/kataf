// Builds the "Admissions open" marketing flyer (A4 PDF) from the syllabus data and site config.
//   npm run flyer  ->  marketing/Al-Kausar-Admissions-Open.pdf
import puppeteer from "puppeteer-core";
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { syllabus, order } from "./syllabus-data.mjs";
import { site, whatsappDisplay } from "../lib/config.ts";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const chrome = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
if (!chrome) throw new Error("Chrome or Edge not found");
const uri = (f) => "data:image/png;base64," + readFileSync(f).toString("base64");
const logoLight = uri("public/logo/alkausar-light.png");

const courses = order.map((s) => syllabus.find((c) => c.slug === s)).map((c) => ({ ...c, weeks: c.modules.reduce((n, x) => n + x.weeks, 0) }));
const row = (c) => `<li><span>${esc(c.name)}</span><b>${c.weeks} wk</b></li>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Admissions open</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400;1,9..144,600&family=JetBrains+Mono:wght@500&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
<style>
@page { size: A4; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
:root { --g0:#021f02; --g1:#033703; --g2:#0b4d0b; --leaf:#7fc41f; --leaf2:#96d63c; --cream:#fbf2df; --wheat:#f0b43c; --ink:#14130f }
body { width: 210mm; height: 297mm; overflow: hidden; font-family: 'Outfit', sans-serif; color: var(--cream); -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { position: relative; width: 210mm; height: 297mm; overflow: hidden; background: radial-gradient(120% 70% at 85% 0%, var(--g2) 0%, var(--g1) 45%, var(--g0) 100%) }
.serif { font-family: 'Fraunces', Georgia, serif; letter-spacing: -.025em }
.mono { font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .14em; font-size: 7.6pt }
.ring { position: absolute; border-radius: 50%; border: .5mm solid rgba(240,180,60,.35) }
.sun { position: absolute; border-radius: 50%; background: var(--wheat) }
.dots { position: absolute; inset: 0; background-image: radial-gradient(rgba(251,242,223,.09) 1px, transparent 1.2px); background-size: 6mm 6mm }
.leaf { position: absolute; right: -30mm; top: 70mm; width: 150mm }
.head { position: absolute; left: 14mm; right: 14mm; top: 12mm; display: flex; justify-content: space-between; align-items: center }
.head img { height: 33mm; display: block }
.pill { border: .35mm solid var(--wheat); color: var(--wheat); padding: 1.6mm 4mm; border-radius: 10mm }
.hero { position: absolute; left: 14mm; top: 52mm; width: 150mm }
.kick { display: inline-flex; align-items: center; gap: 2.4mm; color: var(--leaf2) }
.kick:before { content: ''; width: 9mm; height: .5mm; background: var(--leaf2) }
.h1 { font-size: 72pt; line-height: .86; margin-top: 4mm; font-weight: 400 }
.h1 i { color: var(--wheat); font-weight: 400 }
.sub { font-size: 13pt; line-height: 1.4; margin-top: 4mm; max-width: 140mm; color: #e8dfc6 }
.sub b { color: #fff; font-weight: 600 }
.sticker { position: absolute; right: 15mm; top: 58mm; width: 40mm; height: 40mm; border-radius: 50%; background: var(--wheat); color: var(--g0); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; transform: rotate(10deg); box-shadow: 0 2mm 6mm rgba(0,0,0,.35) }
.sticker:before { content: ''; position: absolute; inset: 1.6mm; border: .4mm dashed var(--g1); border-radius: 50% }
.sticker b { font-family: 'Fraunces', serif; font-weight: 600; font-size: 34pt; line-height: 1 }
.sticker span { font-size: 8pt; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; line-height: 1.25 }
.panel { position: absolute; left: 14mm; right: 14mm; top: 137mm; background: var(--cream); color: var(--ink); border-radius: 4mm; padding: 5mm 7mm 4mm; box-shadow: 0 3mm 9mm rgba(0,0,0,.35) }
.panel h3 { font-size: 17pt; font-weight: 500 }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; margin-top: 3mm }
.cols h4 { font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .12em; font-size: 7pt; font-weight: 500; color: #fff; display: inline-block; padding: 1mm 2.6mm; border-radius: 1mm; background: var(--g1); margin-bottom: 1.6mm }
.cols h4.adv { background: var(--ink) }
.cols ul { list-style: none }
.cols li { display: flex; justify-content: space-between; align-items: baseline; padding: 1.35mm 0; border-bottom: .25mm solid #e3cfa6; font-size: 10.4pt; font-weight: 500 }
.cols li:last-child { border-bottom: 0 }
.cols li b { font-family: 'JetBrains Mono', monospace; font-weight: 500; font-size: 7.4pt; color: #3d7a0a; letter-spacing: .04em; white-space: nowrap }
.note { font-size: 8.6pt; color: #6a5a47; line-height: 1.4 }
.feats { position: absolute; left: 14mm; right: 14mm; top: 221mm; display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm }
.feat { border: .35mm solid rgba(251,242,223,.28); border-radius: 3mm; padding: 3.2mm 3.2mm; background: rgba(255,255,255,.05) }
.feat svg { width: 8mm; height: 8mm; stroke: var(--wheat); fill: none; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round }
.feat b { display: block; font-family: 'Fraunces', serif; font-weight: 500; font-size: 11.6pt; line-height: 1.15; margin-top: 2mm; letter-spacing: -.01em }
.feat p { font-size: 8pt; line-height: 1.35; margin-top: 1mm; color: #d6ccb2 }
.cta { position: absolute; left: 0; right: 0; bottom: 0; height: 34mm; background: var(--wheat); color: var(--g0); padding: 5mm 14mm 0; display: grid; grid-template-columns: 1.25fr 1fr; gap: 8mm }
.cta .l p.mono { color: var(--g1) }
.cta .num { font-family: 'Fraunces', serif; font-weight: 600; font-size: 29pt; line-height: 1; margin-top: 1.2mm; letter-spacing: -.02em }
.cta .em { font-size: 10.4pt; font-weight: 600; margin-top: 2mm }
.cta .r { border-left: .5mm solid rgba(3,55,3,.35); padding-left: 7mm }
.line { border-bottom: .4mm solid var(--g1); height: 7mm; margin-top: 1.4mm }
.cta .r small { display: block; font-size: 7.6pt; margin-top: 2.6mm; color: var(--g1); font-weight: 500 }
</style></head><body><div class="page">
  <div class="dots"></div>
  <div class="sun" style="width:150mm;height:150mm;right:-52mm;top:-46mm;opacity:.14"></div>
  <div class="ring" style="width:118mm;height:118mm;right:-36mm;top:-30mm"></div>
  <div class="ring" style="width:190mm;height:190mm;left:-80mm;bottom:20mm;opacity:.5"></div>
  <svg class="leaf" viewBox="0 0 400 200" fill="none"><path d="M0 170 C80 120 170 110 250 70 C310 40 360 12 400 6 C350 30 300 70 240 110 C170 155 80 175 0 170Z" fill="#7fc41f" opacity=".22"/></svg>

  <div class="head"><img src="${logoLight}" alt="Al-Kausar Computer Institute"><span class="pill mono">Enrol today</span></div>

  <div class="hero">
    <p class="kick mono">New batches · Beginner and advanced</p>
    <h1 class="h1 serif">Admissions<br><i>open.</i></h1>
    <p class="sub">Learn a skill you can <b>earn from</b>. Hands-on classes, a real <b>internship</b> and a <b>certificate</b> anyone can verify online.</p>
  </div>
  <div class="sticker"><b>${courses.length}</b><span>Skill<br>courses</span></div>

  <div class="panel">
    <h3 class="serif">Pick your course</h3>
    <div class="cols">
      <div><h4>Beginner</h4><ul>${courses.filter((c) => c.track === "beginner").map(row).join("")}</ul></div>
      <div><h4 class="adv">Advanced</h4><ul>${courses.filter((c) => c.track === "advanced").map(row).join("")}</ul>
        <p class="note" style="margin-top:4mm"><b style="color:#033703">Not sure which one?</b> Tell us your goal and we will suggest the right course.</p></div>
    </div>
  </div>

  <div class="feats">
    <div class="feat"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg><b>Full hands-on</b><p>You work on a computer in every class. Not just lectures.</p></div>
    <div class="feat"><svg viewBox="0 0 24 24"><path d="M3 8l9-4 9 4-9 4-9-4z"/><path d="M7 10.5V15c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5"/></svg><b>Internship</b><p>An internship follows every course, with the team.</p></div>
    <div class="feat"><svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="5.5"/><path d="M9 14l-1.5 6 4.5-2.5 4.5 2.5L15 14"/></svg><b>Verified certificate</b><p>A unique ID that anyone can check online.</p></div>
    <div class="feat"><svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="8" r="3"/><path d="M2.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M14.5 14.2c.6-.2 1.3-.2 2-.2 2.7 0 5 1.8 5 5"/></svg><b>Men's and women's batches</b><p>Separate batches with their own timings.</p></div>
  </div>

  <div class="cta">
    <div class="l"><p class="mono">Apply now · Message us on WhatsApp</p><div class="num">${esc(whatsappDisplay)}</div><p class="em">${esc(site.email)}</p></div>
    <div class="r"><p class="mono" style="color:#033703">New batch starts</p><div class="line"></div><p class="mono" style="color:#033703;margin-top:3mm">Fee and timing</p><small>Message us for the fee and the batch that suits you.</small></div>
  </div>
</div></body></html>`;

mkdirSync("marketing/_tmp", { recursive: true });
writeFileSync("marketing/_tmp/flyer.html", html);
const browser = await puppeteer.launch({ executablePath: chrome, headless: "new" });
const pg = await browser.newPage();
await pg.goto("file:///" + process.cwd().split("\\").join("/") + "/marketing/_tmp/flyer.html", { waitUntil: "networkidle0" });
await pg.evaluate(() => document.fonts.ready);
const over = await pg.evaluate(() => document.querySelector(".page").scrollHeight > document.querySelector(".page").clientHeight + 1);
if (over) console.warn("WARNING: flyer overflows the page.");
const buf = await pg.pdf({ width: "210mm", height: "297mm", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
writeFileSync("marketing/Al-Kausar-Admissions-Open.pdf", buf);
if (process.env.KEEP_TMP) {
  await pg.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.4 });
  await pg.screenshot({ path: "marketing/_tmp/flyer.png" });
} else rmSync("marketing/_tmp", { recursive: true, force: true });
await browser.close();
console.log("Saved marketing/Al-Kausar-Admissions-Open.pdf");
