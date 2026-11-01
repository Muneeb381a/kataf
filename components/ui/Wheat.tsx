"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const parent = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: 0.07 } },
});
const stalk: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease } },
};
const grow: Variants = {
  hidden: { opacity: 0, scale: 0.15 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};
const fade: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  show: { opacity: 1, pathLength: 1, transition: { duration: 0.6, ease } },
};

const box = { transformBox: "fill-box", transformOrigin: "50% 100%" } as const;

/**
 * Hand-drawn wheat stalk, the "harvest" motif.
 * On entering the viewport the stalk draws itself, then the grains grow from the bottom up,
 * then the whole stalk sways slowly. With reduced motion it simply appears.
 */
export function Wheat({
  className = "",
  strokeWidth = 1.6,
  delay = 0.2,
}: {
  className?: string;
  strokeWidth?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  // bottom to top, so they grow in the order a real stalk would
  const grains = Array.from({ length: 9 }, (_, i) => 70 + (8 - i) * 40);

  return (
    <motion.svg
      viewBox="0 0 200 640"
      aria-hidden="true"
      className={`wheat-sway ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      variants={parent(delay)}
      initial={reduce ? false : "hidden"}
      animate={reduce ? "show" : undefined}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.path d="M100 640C98 500 106 300 100 56" variants={stalk} />
      <motion.path d="M100 600C70 570 40 560 14 566C40 590 74 600 100 600Z" variants={grow} style={box} />
      <motion.path d="M100 560C130 530 162 520 188 526C162 550 126 560 100 560Z" variants={grow} style={box} />
      {grains.map((y, k) => {
        const i = 8 - k;
        return (
          <motion.g key={y} variants={grow} style={box}>
            <ellipse cx="82" cy={y} rx="8" ry="22" transform={`rotate(-32 82 ${y})`} />
            <ellipse cx="118" cy={y + 20} rx="8" ry="22" transform={`rotate(32 118 ${y + 20})`} />
            {i < 4 && <path d={`M${i % 2 ? 66 : 134} ${y - 16}l${i % 2 ? -12 : 12} -20`} opacity=".6" />}
          </motion.g>
        );
      })}
      <motion.ellipse cx="100" cy="34" rx="8" ry="24" variants={fade} />
    </motion.svg>
  );
}
