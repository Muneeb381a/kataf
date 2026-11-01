"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Headline that rises word by word when it scrolls into view.
 * Wrap words in *asterisks* to set them in italic (with `italicClassName`).
 */
export function RevealWords({
  text,
  as: Tag = "h2",
  className = "",
  italicClassName = "italic text-olive",
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  italicClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text
    .split("*")
    .flatMap((seg, i) => seg.split(/(\s+)/).filter(Boolean).map((w) => ({ w, italic: i % 2 === 1 })));

  let n = 0;
  return (
    <Tag className={className}>
      {words.map(({ w, italic }, idx) => {
        if (/^\s+$/.test(w)) return " ";
        const k = n++;
        const cls = italic ? italicClassName : "";
        if (reduce) return <span key={idx} className={cls}>{w}</span>;
        return (
          <span key={idx} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            <motion.span
              className={`inline-block ${cls}`}
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: delay + k * 0.06 }}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
