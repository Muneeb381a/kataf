import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/forms";
import { getDb, schema } from "@/lib/db";
import { ipOf, limited } from "@/lib/server/rateLimit";
import { sendEmail, sendWhatsApp } from "@/lib/server/notify";

export async function POST(req: Request) {
  if (limited("quote", ipOf(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "form");
      errors[k] ??= issue.message;
    }
    return NextResponse.json({ errors }, { status: 400 });
  }

  const d = parsed.data;

  // Honeypot filled: pretend success, store nothing.
  if (d.website) return NextResponse.json({ ok: true });

  let stored = false;
  const db = getDb();
  if (db) {
    try {
      await db.insert(schema.leads).values({
        name: d.name,
        phone: d.phone,
        businessType: d.businessType || null,
        interestedIn: d.interestedIn,
        message: d.message,
        budget: d.budget || null,
        sourcePage: d.sourcePage || null,
      });
      stored = true;
    } catch (err) {
      console.error("[quote] db insert failed", err);
    }
  }

  const summary =
    `New Kataf lead\n${d.name} · ${d.phone}\nInterested in: ${d.interestedIn}\n` +
    `Business: ${d.businessType || "-"} · Budget: ${d.budget || "-"}\n\n${d.message}\n\nFrom: ${d.sourcePage || "-"}`;

  const [emailed, whatsapped] = await Promise.all([sendEmail(`New lead: ${d.interestedIn} · ${d.name}`, summary), sendWhatsApp(summary)]);

  if (!stored && !emailed && !whatsapped) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[quote] (dev, nothing configured) lead:\n" + summary);
    } else {
      console.error("[quote] lead could not be saved or delivered:\n" + summary);
      return NextResponse.json({ error: "Could not send right now. Please message us on WhatsApp." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

