import Link from "next/link";
import { courses } from "@/lib/courses";
import { CourseArt } from "@/components/ui/CourseArt";
import { Reveal } from "@/components/ui/Reveal";

/** Course cards: illustration on top, then title, bullets and one clear action. */
export function CourseCards() {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((c, i) => (
        <li key={c.slug} className="flex">
          <Reveal className="flex w-full" delay={(i % 3) * 0.05}>
            <article className="group relative flex w-full flex-col overflow-hidden rounded border border-ink bg-paper transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#14130F] motion-reduce:hover:transform-none">
              <div className="stage relative !rounded-none !border-0 !border-b !border-ink">
                <span className="label absolute left-4 top-4 rounded border border-ink bg-paper px-2 py-1 text-ink">
                  {c.num}
                </span>
                <span className="label absolute right-4 top-4 rounded bg-ink px-2 py-1 text-paper">{c.level}</span>
                <CourseArt slug={c.slug} className="mx-auto block h-[210px] w-full max-w-[400px] px-4 py-3" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-0.02em]">
                  <Link
                    href={`/academy/${c.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-olive"
                  >
                    {c.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[16px] text-muted">{c.short}</p>

                <ul className="mt-5 mb-6 space-y-2 border-t border-line pt-5 text-[16px]">
                  {c.modules.slice(0, 4).map((m) => (
                    <li key={m.name} className="flex gap-3">
                      <span aria-hidden="true" className="text-olive">
                        ✓
                      </span>
                      {m.name}
                    </li>
                  ))}
                  <li className="label pl-6 text-olive">+{c.modules.length - 4} more modules</li>
                </ul>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-5">
                  <span className="label text-muted">
                    {c.modules.length} modules · {c.projects.length} projects
                  </span>
                  <span className="flex items-center gap-2 font-medium text-olive" aria-hidden="true">
                    View course
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
