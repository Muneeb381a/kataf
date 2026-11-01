import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";

/** KTF-2026-A7K3PQ */
export const CODE_RE = /^KTF-\d{4}-[A-HJ-NP-Z2-9]{6}$/;

export const normalizeCode = (raw: string) => decodeURIComponent(raw).trim().toUpperCase().replace(/\s+/g, "");

export type CertificateResult =
  | { status: "valid"; name: string; course: string; issuedOn: string; code: string }
  | { status: "revoked"; code: string }
  | { status: "not-found"; code: string }
  | { status: "unavailable"; code: string };

export async function lookupCertificate(raw: string): Promise<CertificateResult> {
  const code = normalizeCode(raw);
  if (!CODE_RE.test(code)) return { status: "not-found", code };
  const db = getDb();
  if (!db) return { status: "unavailable", code };
  try {
    const [row] = await db.select().from(schema.certificates).where(eq(schema.certificates.code, code)).limit(1);
    if (!row) return { status: "not-found", code };
    if (row.revoked) return { status: "revoked", code };
    return { status: "valid", name: row.studentName, course: row.course, issuedOn: row.issuedOn, code };
  } catch (err) {
    console.error("[verify] lookup failed", err);
    return { status: "unavailable", code };
  }
}
