// Issue, list and revoke Kataf Academy certificates.
//   npm run cert:issue -- "Student Name" "Full Stack Development" [YYYY-MM-DD]
//   npm run cert:list
//   npm run cert:revoke -- KTF-2026-ABC123
// Needs DATABASE_URL (read from .env.local).
import { randomInt } from "node:crypto";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Put it in .env.local first.");
  process.exit(1);
}
const sql = postgres(url, { max: 1 });
const [cmd, ...args] = process.argv.slice(2);
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
const makeCode = (year) => `KTF-${year}-${Array.from({ length: 6 }, () => CHARS[randomInt(CHARS.length)]).join("")}`;
const site = process.env.SITE_URL ?? "https://kataf.pk";

try {
  if (cmd === "issue") {
    const [name, course, date] = args;
    if (!name || !course) throw new Error('Usage: cert:issue -- "Student Name" "Course Name" [YYYY-MM-DD]');
    const issued = date ?? new Date().toISOString().slice(0, 10);
    for (let i = 0; i < 5; i++) {
      const code = makeCode(issued.slice(0, 4));
      try {
        await sql`insert into certificates (code, student_name, course, issued_on) values (${code}, ${name}, ${course}, ${issued})`;
        console.log(`Issued ${code}\n  ${name} · ${course} · ${issued}\n  Verify: ${site}/verify/${code}`);
        break;
      } catch (e) {
        if (e.code !== "23505" || i === 4) throw e; // retry on the rare duplicate code
      }
    }
  } else if (cmd === "revoke") {
    const [code] = args;
    if (!code) throw new Error("Usage: cert:revoke -- KTF-2026-ABC123");
    const r = await sql`update certificates set revoked = true where code = ${code.toUpperCase()} returning code`;
    console.log(r.length ? `Revoked ${code}` : "No such certificate");
  } else if (cmd === "list") {
    const rows = await sql`select code, student_name, course, issued_on, revoked from certificates order by id desc limit 50`;
    for (const r of rows) console.log(`${r.code}  ${r.student_name} · ${r.course} · ${r.issued_on.toISOString?.().slice(0, 10) ?? r.issued_on}${r.revoked ? "  [REVOKED]" : ""}`);
    if (!rows.length) console.log("No certificates yet.");
  } else {
    console.log("Commands: issue, revoke, list");
  }
} catch (e) {
  console.error(e.message ?? e);
  process.exitCode = 1;
} finally {
  await sql.end();
}
