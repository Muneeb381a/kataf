"use client";

import Link from "next/link";
import { useState } from "react";
import { courses, type Course } from "@/lib/courses";
import { CourseArt } from "@/components/ui/CourseArt";

type Track = "beginner" | "advanced";

const copy: Record<Track, { title: string; blurb: string }> = {
  beginner: {
    title: "Start here",
    blurb: "No experience needed. You begin from zero and build real things from the first week.",
  },
  advanced: {
    title: "Go professional",
    blurb: "Career tracks for people who want to build production software. Expect depth, code review and real systems.",
  },
};

export function CourseBrowser() {
  const [track, setTrack] = useState<Track>("beginner");
  const list = courses.filter((c) => c.track === track);
  const count = (t: Track) => courses.filter((c) => c.track === t).length;

  return (
    <div>
      <div role="tablist" aria-label="Choose your level" className="grid gap-3 sm:grid-cols-2">
        {(["beginner", "advanced"] as Track[]).map((t) => {
          const on = track === t;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              id={`track-${t}`}
              aria-selected={on}
              aria-controls="track-panel"
              onClick={() => setTrack(t)}
              className={`flex items-center justify-between gap-4 rounded border px-5 py-4 text-left transition-colors ${
                on
                  ? t === "beginner"
                    ? "border-olive bg-olive text-paper"
                    : "border-ink bg-ink text-paper"
                  : "border-ink/40 hover:border-ink"
              }`}
            >
              <span>
                <span className="label block opacity-80">{t === "beginner" ? "Level 1" : "Level 2"}</span>
                <span className="font-serif text-[26px] capitalize leading-tight tracking-[-0.02em]">{t}</span>
              </span>
              <span className="label rounded border border-current px-2.5 py-1">{count(t)} courses</span>
            </button>
          );
        })}
      </div>

      <div id="track-panel" role="tabpanel" aria-labelledby={`track-${track}`} className="mt-10">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <h3 className="font-serif text-[30px] leading-tight tracking-[-0.02em]">{copy[track].title}</h3>
          <p className="max-w-[56ch] text-muted">{copy[track].blurb}</p>
        </div>

        {track === "beginner" ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <li key={c.slug} className="flex">
                <BeginnerCard c={c} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-6 lg:grid-cols-2">
            {list.map((c) => (
              <li key={c.slug} className="flex">
                <AdvancedCard c={c} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Friendly: big illustration, what you will make, no jargon. */
function BeginnerCard({ c }: { c: Course }) {
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded border border-ink bg-paper transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#14130F] motion-reduce:hover:transform-none">
      <div className="stage relative !rounded-none !border-0 !border-b !border-ink">
        <span className="label absolute left-4 top-4 rounded bg-wheat px-2 py-1 text-ink">Start here</span>
        <CourseArt slug={c.slug} className="mx-auto block h-[190px] w-full max-w-[380px] px-4 py-3" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-serif text-[28px] leading-[1.1] tracking-[-0.02em]">
          <Link
            href={`/academy/${c.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-olive"
          >
            {c.name}
          </Link>
        </h4>
        <p className="mt-2 text-[16px] text-muted">{c.short}</p>

        <p className="label mb-3 mt-5 text-olive">You will make</p>
        <ul className="space-y-2 text-[16px]">
          {c.projects.slice(0, 3).map((p) => (
            <li key={p} className="flex gap-3">
              <span aria-hidden="true" className="text-olive">
                ✓
              </span>
              {p}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2">
          <li className="label rounded border border-line bg-olive-tint px-2 py-1 text-olive-deep">100% hands-on</li>
          <li className="label rounded border border-line bg-olive-tint px-2 py-1 text-olive-deep">Certificate</li>
          <li className="label rounded border border-line bg-olive-tint px-2 py-1 text-olive-deep">Internship</li>
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-5 mt-6">
          <span className="label text-muted">No experience needed</span>
          <span aria-hidden="true" className="flex items-center gap-2 font-medium text-olive">
            View course <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}

/** Technical: dark, terminal header, numbered curriculum, tools. */
function AdvancedCard({ c }: { c: Course }) {
  return (
    <article className="on-dark group relative flex w-full flex-col overflow-hidden rounded border border-ink bg-ink text-paper transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#d9a23a] motion-reduce:hover:transform-none">
      <div className="flex items-center gap-3 border-b border-paper/25 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block h-2 w-2 rounded-full bg-paper/40" />
          <i className="block h-2 w-2 rounded-full bg-paper/40" />
          <i className="block h-2 w-2 rounded-full bg-wheat" />
        </span>
        <span className="label text-[11px] normal-case tracking-normal text-paper/60">~/kataf-academy/{c.slug}</span>
        <span className="label ml-auto rounded bg-wheat px-2 py-0.5 text-ink">Advanced</span>
      </div>

      <div className="grid flex-1 gap-6 p-6">
        <div className="flex flex-col">
          <h4 className="font-serif text-[30px] leading-[1.1] tracking-[-0.02em]">
            <Link
              href={`/academy/${c.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-wheat"
            >
              {c.name}
            </Link>
          </h4>
          <p className="mt-2 text-[16px] text-paper/70">{c.short}</p>

          <ol className="mt-5 space-y-1.5 font-mono text-[13px] text-paper/85">
            {c.modules.slice(0, 5).map((m, i) => (
              <li key={m.name} className="flex gap-3">
                <span className="text-wheat">{String(i + 1).padStart(2, "0")}</span>
                {m.name}
              </li>
            ))}
            <li className="text-wheat">+ {c.modules.length - 5} more modules</li>
          </ol>

          <ul className="mt-5 flex flex-wrap gap-2">
            {c.tools.slice(0, 5).map((t) => (
              <li key={t} className="label rounded border border-paper/30 px-2 py-1 text-paper/80">
                {t}
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-paper/25 px-6 py-4">
        <span className="label text-paper/70">
          {c.modules.length} modules · {c.projects.length} projects · hands-on · internship
        </span>
        <span aria-hidden="true" className="flex items-center gap-2 font-medium text-wheat">
          View course <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </article>
  );
}
