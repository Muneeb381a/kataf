import Link from "next/link";
import type { Course } from "@/lib/courses";
import { whatsappLink } from "@/lib/config";
import { Button } from "@/components/ui/Button";

/** Sticky "fee and what you get" card on a course page. Shows real values when set, otherwise says so plainly. */
export function EnrolCard({ course: c }: { course: Course }) {
  const rows: { k: string; v: React.ReactNode }[] = [
    { k: "Fee", v: c.fee ?? <span className="text-olive">Shared on WhatsApp</span> },
    { k: "Duration", v: c.duration ?? <span className="text-olive">Shared with the batch date</span> },
    { k: "Track", v: c.track === "advanced" ? "Advanced" : "Beginner" },
    { k: "Level", v: c.level },
    { k: "Format", v: "100% hands-on" },
    { k: "Batches", v: "Separate for men and women" },
    { k: "Projects", v: `${c.projects.length} to build` },
    { k: "Certificate", v: "Yes, on completion" },
    { k: "Internship", v: c.internship ? "Yes, after the course" : "Project showcase" },
  ];

  return (
    <div className="rounded border border-ink bg-paper shadow-frame">
      <div className="border-b border-ink bg-olive-tint px-6 py-5">
        <p className="label text-olive-deep">Enrol in</p>
        <p className="font-serif text-[26px] leading-tight tracking-[-0.02em]">{c.name}</p>
      </div>
      <dl className="px-6">
        {rows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between gap-4 border-b border-line py-3.5 text-[16px] last:border-b-0">
            <dt className="label text-muted">{r.k}</dt>
            <dd className="text-right font-medium">{r.v}</dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-3 border-t border-line p-6">
        <Button href={`/apply?course=${c.slug}`} className="w-full justify-between">
          Apply now
        </Button>
        <a
          href={whatsappLink(`Hi Kataf, I would like the fee and next batch date for ${c.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-between rounded border border-ink px-6 py-3.5 font-medium leading-none transition-colors hover:bg-ink hover:text-paper"
        >
          Ask on WhatsApp <span aria-hidden="true">→</span>
        </a>
        <p className="label text-center text-muted">We share the full fee and batch date before you decide.</p>
      </div>
      <Link href="/academy#fees" className="label block border-t border-line px-6 py-3 text-center text-olive hover:bg-olive-tint">
        Compare all courses →
      </Link>
    </div>
  );
}
