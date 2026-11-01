"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export type FieldItem = { name: string; href: string; group: "software" | "academy" };

const W = 1200;
const H = 440;
const GROUND = 360;
const ease = [0.22, 1, 0.36, 1] as const;

const SOFT_X = [110, 250, 390];
const ACAD_X = Array.from({ length: 6 }, (_, i) => 560 + i * 112);
const HEIGHTS = [230, 280, 250, 170, 240, 190, 270, 210, 250];
const LEAN = [14, -12, 10, -10, 12, -8, 14, -12, 8];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.32, delayChildren: 0.15 } } };
const stalkGroup: Variants = { hidden: {}, show: {} };
const root: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 0.55, transition: { duration: 0.7, ease } },
};
const stem: Variants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { delay: 0.5, duration: 1.5, ease } },
};
const grain: Variants = {
  hidden: { opacity: 0, scale: 0.1 },
  show: (k: number) => ({ opacity: 1, scale: 1, transition: { delay: 1.35 + k * 0.08, duration: 0.5, ease } }),
};
const box = { transformBox: "fill-box", transformOrigin: "50% 100%" } as const;

/** Rain: deterministic so server and client agree. */
const drops = Array.from({ length: 22 }, (_, i) => ({
  x: 70 + ((i * 197) % 1060),
  d: 3.2 + ((i * 7) % 10) / 10,
  s: 3 + ((i * 13) % 20) / 10,
}));

function Stalk({ x, h, lean, tone }: { x: number; h: number; lean: number; tone: "ink" | "olive" }) {
  const tipX = x + lean;
  const tipY = GROUND - h;
  const stalkD = `M${x} ${GROUND} C ${x + lean * 0.3} ${GROUND - h * 0.4}, ${x - lean * 0.25} ${GROUND - h * 0.72}, ${tipX} ${tipY}`;
  const pairs = 5;
  const colour = tone === "ink" ? "text-ink" : "text-olive";
  const px = (t: number) => x + lean * t * t;

  return (
    <motion.g variants={stalkGroup} className={colour}>
      {/* roots, drawn first, under the soil */}
      {[`M${x} ${GROUND} q -10 24 -28 54`, `M${x} ${GROUND} q 2 32 6 70`, `M${x} ${GROUND} q 12 22 30 46`].map((d) => (
        <motion.path key={d} d={d} variants={root} className="fill-none stroke-olive-tint" strokeWidth="1.4" strokeLinecap="round" />
      ))}
      {/* stem grows up out of the ground */}
      <motion.path d={stalkD} variants={stem} className="fill-none stroke-current" strokeWidth="2.6" strokeLinecap="round" />
      {/* base leaves */}
      <motion.path
        d={`M${x} ${GROUND - 10} C ${x - 22} ${GROUND - 26}, ${x - 46} ${GROUND - 26}, ${x - 56} ${GROUND - 38} C ${x - 36} ${GROUND - 40}, ${x - 12} ${GROUND - 30}, ${x} ${GROUND - 10}Z`}
        variants={grain}
        custom={0}
        style={box}
        className="fill-current"
      />
      <motion.path
        d={`M${x} ${GROUND - 24} C ${x + 22} ${GROUND - 42}, ${x + 46} ${GROUND - 44}, ${x + 58} ${GROUND - 58} C ${x + 36} ${GROUND - 58}, ${x + 12} ${GROUND - 46}, ${x} ${GROUND - 24}Z`}
        variants={grain}
        custom={1}
        style={box}
        className="fill-current"
      />
      {/* grains, bottom to top */}
      {Array.from({ length: pairs }, (_, k) => {
        const t = 0.58 + k * 0.085;
        const y = GROUND - h * t;
        const cx = px(t);
        return (
          <motion.g key={k} variants={grain} custom={k + 2} style={box} className="fill-current">
            <ellipse cx={cx - 8} cy={y} rx="5" ry="12" transform={`rotate(-32 ${cx - 8} ${y})`} />
            <ellipse cx={cx + 8} cy={y - 10} rx="5" ry="12" transform={`rotate(32 ${cx + 8} ${y - 10})`} />
          </motion.g>
        );
      })}
      <motion.ellipse cx={tipX} cy={tipY - 8} rx="5" ry="14" variants={grain} custom={pairs + 2} style={box} className="fill-current" />
    </motion.g>
  );
}

export function FieldScene({ items }: { items: FieldItem[] }) {
  const reduce = useReducedMotion();
  const software = items.filter((i) => i.group === "software");
  const academy = items.filter((i) => i.group === "academy");
  const ordered = [...software, ...academy];
  const xs = [...SOFT_X, ...ACAD_X];

  return (
    <div className="relative">
      {/* full-bleed soil so the ground runs edge to edge */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[18.2%] bg-ink" />

      <div className="relative mx-auto w-full max-w-[1240px]">
        <motion.svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Wheat growing out of the soil, one stalk for each Kataf product and course"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? "show" : undefined}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* sun */}
          <g className="spin-slow" style={{ transformOrigin: "480px 70px" }}>
            {Array.from({ length: 12 }, (_, i) => (
              <line
                key={i}
                x1="480"
                y1="30"
                x2="480"
                y2="42"
                transform={`rotate(${i * 30} 480 70)`}
                className="stroke-olive"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </g>
          <circle cx="480" cy="70" r="18" className="fill-olive-tint stroke-olive" strokeWidth="2" />

          {/* rain, after the stalks are up */}
          {drops.map((d, i) => (
            <line
              key={i}
              x1={d.x}
              y1="20"
              x2={d.x - 3}
              y2="34"
              className="rain stroke-olive"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{ animationDuration: `${d.d}s`, animationDelay: `${d.s}s` }}
            />
          ))}

          {/* soil */}
          <path
            d={`M0 ${GROUND} C 60 ${GROUND - 6}, 130 ${GROUND + 4}, 210 ${GROUND - 2} S 360 ${GROUND + 5}, 450 ${GROUND - 1} S 620 ${GROUND + 4}, 720 ${GROUND - 3} S 920 ${GROUND + 5}, 1010 ${GROUND - 1} S 1150 ${GROUND + 3}, 1200 ${GROUND - 2} V ${H} H0 Z`}
            className="fill-ink"
          />
          {Array.from({ length: 46 }, (_, i) => (
            <circle
              key={i}
              cx={14 + ((i * 53) % 1180)}
              cy={GROUND + 14 + ((i * 29) % 58)}
              r={1.2 + (i % 3) * 0.5}
              className="fill-olive-tint"
              opacity=".28"
            />
          ))}
          <text x="110" y={GROUND + 72} className="fill-paper/60 font-mono" fontSize="13" letterSpacing="1.5">
            SOFTWARE
          </text>
          <text x="560" y={GROUND + 72} className="fill-paper/60 font-mono" fontSize="13" letterSpacing="1.5">
            ACADEMY
          </text>

          {/* stalks: software on the left, courses on the right */}
          {ordered.map((it, i) => (
            <Stalk key={it.href} x={xs[i]} h={HEIGHTS[i]} lean={LEAN[i]} tone={it.group === "software" ? "ink" : "olive"} />
          ))}
        </motion.svg>

        {/* labels sit on top of each stalk once it has grown */}
        <ul className="pointer-events-none absolute inset-0 hidden md:block">
          {ordered.map((it, i) => {
            const bottom = ((H - (GROUND - HEIGHTS[i] - 32)) / H) * 100;
            const delay = 0.15 + i * 0.32 + 2.1;
            const left = ((xs[i] + LEAN[i]) / W) * 100;
            const tag = (
              <Link
                href={it.href}
                className={`pointer-events-auto block max-w-[112px] rounded border px-2 py-1 text-center font-mono text-[11px] uppercase leading-tight tracking-[0.06em] transition-colors ${
                  it.group === "software"
                    ? "border-ink bg-ink text-paper hover:bg-olive-deep"
                    : "border-olive bg-paper text-olive hover:bg-olive hover:text-paper"
                }`}
              >
                {it.name}
              </Link>
            );
            return (
              <li key={it.href} className="absolute -translate-x-1/2" style={{ left: `${left}%`, bottom: `${bottom}%` }}>
                {reduce ? (
                  tag
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ delay, duration: 0.45, ease }}
                  >
                    {tag}
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
