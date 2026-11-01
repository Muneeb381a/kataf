"use client";

import Link from "next/link";
import { useState } from "react";

export type InternshipRole = {
  slug: string;
  name: string;
  role: string;
  summary: string;
  tasks: string[];
  practise: string;
};

/** Pick a course, see the internship role that follows it. Sits on a dark background. */
export function InternshipExplorer({ roles }: { roles: InternshipRole[] }) {
  const [i, setI] = useState(0);
  const r = roles[i];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
      <div className="lg:col-span-4">
        <ul
          role="tablist"
          aria-label="Choose a course"
          className="grid grid-cols-2 gap-2 lg:block lg:gap-0 lg:border-t lg:border-paper/30"
        >
          {roles.map((x, k) => (
            <li key={x.slug} className="lg:border-b lg:border-paper/20">
              <button
                type="button"
                role="tab"
                id={`int-tab-${k}`}
                aria-selected={k === i}
                aria-controls="int-panel"
                onClick={() => setI(k)}
                className={`flex w-full items-baseline gap-3 rounded border px-3 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 lg:py-3.5 ${
                  k === i
                    ? "border-wheat bg-paper/10 text-wheat lg:border-l-wheat"
                    : "border-paper/25 text-paper/80 hover:text-paper lg:border-l-transparent"
                }`}
              >
                <span className="label text-[11px] opacity-70">{String(k + 1).padStart(2, "0")}</span>
                <span className="font-serif text-[18px] leading-tight tracking-[-0.01em] md:text-[22px]">{x.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-8" id="int-panel" role="tabpanel" aria-labelledby={`int-tab-${i}`}>
        <div className="rounded border border-paper/30 bg-paper/5 p-6 md:p-10">
          <p className="label text-wheat">Your internship role</p>
          <h3 className="mt-2 font-serif text-[34px] leading-tight tracking-[-0.02em] md:text-[46px]">{r.role}</h3>
          <p className="mt-2 max-w-[48ch] text-paper/70">{r.summary}</p>

          <p className="label mb-4 mt-9 text-paper/60">You could work on</p>
          <ul className="grid gap-5 md:grid-cols-3">
            {r.tasks.map((t) => (
              <li key={t} className="border-t-2 border-wheat pt-3 text-[16px] leading-snug">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-paper/20 pt-6">
            <p className="label text-paper/60">You practise: {r.practise}</p>
            <Link href={`/academy/${r.slug}`} className="link-quiet font-medium text-wheat">
              View the course →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
