import { Resend } from "resend";
import { site } from "@/lib/config";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEmail(subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const { error } = await new Resend(key).emails.send({
      from: process.env.RESEND_FROM ?? "Al-Kausar Website <onboarding@resend.dev>",
      to: process.env.LEAD_TO_EMAIL ?? site.email,
      subject,
      text,
      html: `<pre style="font-family:inherit;white-space:pre-wrap">${esc(text)}</pre>`,
    });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("[notify] email failed", err);
    return false;
  }
}

/** WhatsApp Cloud API, only if configured. Free-form text works inside the 24h customer-service window. */
export async function sendWhatsApp(text: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const to = process.env.WHATSAPP_NOTIFY_TO ?? site.whatsapp;
  if (!token || !phoneId) return false;
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: text } }),
    });
    if (!res.ok) throw new Error(await res.text());
    return true;
  } catch (err) {
    console.error("[notify] whatsapp failed", err);
    return false;
  }
}
