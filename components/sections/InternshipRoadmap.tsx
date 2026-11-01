"use client";

import { motion, useReducedMotion } from "framer-motion";

type Step = { t: string; d: string };

/**
 * Four stations on a path. On desktop the line draws itself from left to right
 * and the stations light up as it reaches them. On phones it is a vertical list.
 */
export function InternshipRoadmap({ steps }: { steps: Step[] }) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">
      {/* path, desktop only */}
      <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[19px] hidden h-px border-t border-dashed border-paper/30 lg:block" />
      {reduce ? (
        <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[19px] hidden h-0.5 bg-wheat lg:block" />
      ) : (
        <motion.span
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-[18px] hidden h-0.5 origin-left bg-wheat lg:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
        />
      )}

      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        const node = (
          <span
            aria-hidden="true"
            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-[13px] ${
              last ? "border-wheat bg-wheat text-ink" : "border-wheat bg-ink text-wheat"
            }`}
          >
            {last ? "★" : i + 1}
          </span>
        );
        const body = (
          <>
            <h3 className="h3 mt-5">{s.t}</h3>
            <p className="mt-2 max-w-[28ch] text-paper/70">{s.d}</p>
          </>
        );
        return (
          <li key={s.t} className="flex gap-5 lg:block lg:text-center">
            {reduce ? (
              <div className="lg:flex lg:flex-col lg:items-center">
                {node}
                <div className="hidden lg:block">{body}</div>
              </div>
            ) : (
              <motion.div
                className="lg:flex lg:flex-col lg:items-center"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.5 }}
              >
                {node}
                <div className="hidden lg:block">{body}</div>
              </motion.div>
            )}
            <div className="lg:hidden">
              <h3 className="h3">{s.t}</h3>
              <p className="mt-1 text-paper/70">{s.d}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
