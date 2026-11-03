import Link from "next/link";
import { courses } from "@/lib/courses";
import { Button } from "@/components/ui/Button";
import { Edge } from "@/components/ui/Edge";
import { Wheat } from "@/components/ui/Wheat";
import { CourseFan } from "@/components/sections/CourseFan";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Home: the one place the software site points at the academy.
 * It wears the academy's own colours so visitors can tell they are about to enter a different space.
 */
export function AcademyDoor() {
  return (
    <section className="theme-academy relative overflow-hidden bg-paper-2 py-20 text-ink md:py-28">
      <Edge className="text-[#f5f0e3]" />
      <Wheat
        delay={0.3}
        className="pointer-events-none absolute -bottom-20 right-[44%] hidden h-[440px] -rotate-[8deg] text-olive/20 lg:block"
      />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-12 lg:gap-x-6">
        <Reveal className="lg:col-span-6" x={-30} y={0}>
          <p className="label mb-5 flex items-center gap-3 text-olive">
            <span>04</span>
            <span className="h-px w-8 bg-olive" aria-hidden="true" />
            Kataf Academy
          </p>
          <h2 className="h2 max-w-[16ch]">
            Want to learn the <span className="italic text-olive">craft</span>? We teach it.
          </h2>
          <p className="mt-5 max-w-[44ch] text-muted">
            Nine hands-on courses in design, video, computer skills, code, AI and marketing. Every one ends with a project, a certificate with an ID anyone
            can verify, and an internship.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {courses.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/academy/${c.slug}`}
                  className="label block rounded border border-olive px-3 py-2 text-olive transition-colors hover:bg-olive hover:text-paper"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/academy">Enter the Academy</Button>
            <Button href="/apply" variant="outline">
              Apply now
            </Button>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-6" x={30} y={0} delay={0.1}>
          <CourseFan className="mx-auto hidden h-[420px] max-w-[560px] md:block" />
        </Reveal>
      </div>
    </section>
  );
}
