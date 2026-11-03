import { NextResponse } from "next/server";
import { applySchema } from "@/lib/forms";
import { getDb, schema } from "@/lib/db";
import { ipOf, limited } from "@/lib/server/rateLimit";
import { sendEmail, sendWhatsApp } from "@/lib/server/notify";

export async function POST(req: Request) {
  if (limited("apply", ipOf(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = applySchema.safeParse(json);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "form");
      errors[k] ??= issue.message;
    }
    return NextResponse.json({ errors }, { status: 400 });
  }

  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true }); // honeypot

  let stored = false;
  const db = getDb();
  if (db) {
    try {
      await db.insert(schema.applications).values({
        name: d.name,
        phone: d.phone,
        city: d.city || null,
        course: d.course,
        background: d.background || null,
        batch: d.batch || null,
        slot: d.slot || null,
        message: d.message || null,
        sourcePage: d.sourcePage || null,
      });
      stored = true;
    } catch (err) {
      console.error("[apply] db insert failed", err);
    }
  }

  const summary =
    `New Kataf Academy application\n${d.name} · ${d.phone}\nCourse: ${d.course}\n` +
    `City: ${d.city || "-"} · Background: ${d.background || "-"}\nBatch: ${d.batch || "-"} · Slot: ${d.slot || "-"}\n\n${d.message || "(no message)"}\n\nFrom: ${d.sourcePage || "-"}`;

  const [emailed, whatsapped] = await Promise.all([
    sendEmail(`Academy application: ${d.course} · ${d.name}`, summary),
    sendWhatsApp(summary),
  ]);

  if (!stored && !emailed && !whatsapped) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[apply] (dev, nothing configured) application:\n" + summary);
    } else {
      console.error("[apply] application could not be saved or delivered:\n" + summary);
      return NextResponse.json({ error: "Could not send right now. Please message us on WhatsApp." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
