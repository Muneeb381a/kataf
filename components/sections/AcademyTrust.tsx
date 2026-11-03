import Link from "next/link";
import { handsOn, admission, includes, internshipGets, internshipQualify, internshipRoles, internshipSteps } from "@/lib/academy";
import { courses } from "@/lib/courses";
import { site, whatsappDisplay, whatsappLink } from "@/lib/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Wheat } from "@/components/ui/Wheat";
import { VerifyForm } from "@/components/sections/VerifyForm";
import { InternshipExplorer } from "@/components/sections/InternshipExplorer";
import { InternshipRoadmap } from "@/components/sections/InternshipRoadmap";
import { Button } from "@/components/ui/Button";
import { CertificateArt } from "@/components/ui/CertificateArt";

/** What every course includes: certificate, internship, and a visible, honest admission path. */
export function HandsOnSection() {
  return (
    <section className="relative overflow-hidden bg-olive py-16 text-paper md:py-24">
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <p className="label mb-5 text-wheat">03 / How we teach</p>
          <h2 className="h2">
            We do not just teach. You get full <span className="italic text-wheat">hands-on</span> experience.
          </h2>
          <p className="mt-6 max-w-[44ch] text-paper/80">
            Watching someone else work does not teach a skill. So every class is a working session, and you leave every
            week with something you made yourself.
          </p>
        </div>
        <ol className="lg:col-span-7">
          {handsOn.map((h, i) => (
            <li key={h.t} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-paper/30 py-6">
              <span className="label pt-2 text-wheat">0{i + 1}</span>
              <div>
                <h3 className="h3">{h.t}</h3>
                <p className="mt-2 max-w-[48ch] text-paper/80">{h.d}</p>
              </div>
            </li>
          ))}
          <li className="border-t border-paper/30" aria-hidden="true" />
        </ol>
      </div>
    </section>
  );
}

export function Includes() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionLabel num="04">Every course includes</SectionLabel>
        <h2 className="h2 max-w-[18ch]">Hands-on learning, a certificate, and a way into work.</h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <Reveal className="lg:col-span-6" x={-30} y={0}>
            <div className="stage p-5 md:p-10">
              <CertificateArt
                course="Full Stack Development"
                className="mx-auto block h-auto w-full max-w-[520px] -rotate-2 shadow-frame transition-transform duration-300 hover:rotate-0"
              />
              <p className="label mt-6 text-center text-olive-deep">Sample certificate</p>
            </div>
          </Reveal>

          <ol className="lg:col-span-6">
            {includes.map((x, i) => (
              <li key={x.t} className="border-t border-ink">
                <Reveal className="grid grid-cols-[3rem_1fr] gap-x-4 py-6" delay={i * 0.05}>
                  <span className="label pt-2 text-olive">0{i + 1}</span>
                  <div>
                    <h3 className="h3">{x.t}</h3>
                    <p className="mt-2 max-w-[44ch] text-muted">{x.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
            <li className="border-t border-ink" aria-hidden="true" />
          </ol>
        </div>

        <div className="mt-14 grid gap-6 border-y border-ink py-8 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <div className="lg:col-span-5">
            <p className="label text-olive">Check any certificate</p>
            <p className="mt-2 font-serif text-[26px] leading-tight tracking-[-0.02em]">
              Every certificate has an ID. Anyone can verify it online.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <VerifyForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export function InternshipPath() {
  const roles = courses.map((c) => ({ slug: c.slug, name: c.name, ...internshipRoles[c.slug] }));
  return (
    <section id="internship" className="on-dark relative overflow-hidden bg-ink py-20 text-paper md:py-32">
      <Wheat className="pointer-events-none absolute -right-4 -top-10 hidden h-[520px] rotate-[14deg] text-wheat/15 lg:block" />
      <div className="wrap relative">
        <p className="label mb-5 text-wheat">05 / Internship</p>
        <h2 className="h2 max-w-[18ch]">
          Learn it. Then do it for <span className="italic text-wheat">real</span>.
        </h2>
        <p className="mt-6 max-w-[54ch] text-paper/70">
          Kataf is a working software house, so an internship follows every course. You work alongside the team on real
          tasks, with feedback, and leave with experience you can describe in an interview.
        </p>

        <InternshipRoadmap steps={internshipSteps} />

        <div className="mt-24">
          <p className="label text-wheat">What you could work on</p>
          <h3 className="h3 mb-8 mt-2 !text-[32px] md:!text-[40px]">Pick a course. See the role that follows.</h3>
          <InternshipExplorer roles={roles} />
        </div>

        <div className="mt-24 grid gap-12 border-t border-paper/25 pt-12 lg:grid-cols-2 lg:gap-x-10">
          <div>
            <p className="label text-wheat">What you get</p>
            <ul className="mt-5">
              {internshipGets.map((g) => (
                <li key={g} className="flex gap-4 border-b border-paper/20 py-3.5">
                  <span aria-hidden="true" className="text-wheat">
                    ✓
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label text-wheat">How you qualify</p>
            <ol className="mt-5">
              {internshipQualify.map((q, i) => (
                <li key={q} className="grid grid-cols-[2.5rem_1fr] border-b border-paper/20 py-3.5">
                  <span className="label pt-1 text-wheat">0{i + 1}</span>
                  {q}
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Button href="/apply" variant="paper">
                Apply now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Fee comparison. Real fees appear here as soon as they are set in lib/courses.ts. */
export function FeeTable() {
  return (
    <section id="fees" className="section">
      <div className="wrap">
        <SectionLabel num="06">Fees</SectionLabel>
        <h2 className="h2 max-w-[18ch]">Clear fees, shared before you decide.</h2>
        <p className="mt-6 max-w-[52ch] text-muted">
          Fee and batch dates change from batch to batch. We send the exact figure on WhatsApp, so you see it in writing
          before you join.
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-[16px]">
            <thead>
              <tr className="border-y border-ink">
                {["Course", "Level", "Duration", "Fee", "Certificate", "Internship"].map((h) => (
                  <th key={h} scope="col" className="label py-4 pr-4 font-normal text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.slug} className="border-b border-line align-baseline transition-colors hover:bg-olive-tint">
                  <th scope="row" className="py-5 pr-4 font-normal">
                    <Link href={`/academy/${c.slug}`} className="font-serif text-[22px] tracking-[-0.02em] hover:text-olive">
                      {c.name}
                    </Link>
                  </th>
                  <td className="pr-4 text-muted">{c.level}</td>
                  <td className="pr-4">{c.duration ?? <span className="text-muted">With batch date</span>}</td>
                  <td className="pr-4 font-medium">
                    {c.fee ?? (
                      <a
                        href={whatsappLink(`Hi Kataf, what is the fee for ${c.name}?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-quiet text-olive"
                      >
                        Ask on WhatsApp
                      </a>
                    )}
                  </td>
                  <td className="pr-4 text-olive">✓</td>
                  <td className="pr-4">{c.internship ? <span className="text-olive">✓</span> : <span className="text-muted">Project showcase</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/** Talk to a person before paying: the quickest way to earn trust. */
export function TalkFirst() {
  return (
    <section className="border-y border-line bg-paper-2 py-16 md:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <SectionLabel num="07">Admission</SectionLabel>
          <h2 className="h2">Talk to us before you pay anything.</h2>
          <p className="mt-6 max-w-[40ch] text-muted">
            Visit, call or message. Ask about the syllabus, the batch and the internship, and decide only when you are
            sure.
          </p>
          <ul className="mt-8 border-t border-ink">
            <li className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
              <span className="label text-muted">WhatsApp</span>
              <a href={whatsappLink("Hi Kataf, I have a question about the Academy.")} target="_blank" rel="noopener noreferrer" className="font-medium text-olive">
                {whatsappDisplay}
              </a>
            </li>
            <li className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
              <span className="label text-muted">Visit</span>
              <span className="text-right">{site.city}</span>
            </li>
            <li className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
              <span className="label text-muted">Hours</span>
              <span className="text-right">{site.hours}</span>
            </li>
          </ul>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {admission.map((a, i) => (
            <li key={a.t} className="border-t border-ink">
              <Reveal className="grid grid-cols-[3rem_1fr] gap-x-4 py-6" delay={i * 0.05}>
                <span className="font-serif text-[44px] leading-none tracking-[-0.04em] text-olive-tint">{i + 1}</span>
                <div>
                  <h3 className="h3">{a.t}</h3>
                  <p className="mt-2 max-w-[44ch] text-muted">{a.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
          <li className="border-t border-ink" aria-hidden="true" />
        </ol>
      </div>
    </section>
  );
}
