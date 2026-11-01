"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export type FieldItem = { name: string; href: string; group: "software" | "academy" };

const W = 1200;
const H = 440;
const GROUND = 360;
const ease = [0.22, 1, 0.36, 1] as const;

const SOFT_X = [150, 280, 410];
const ACAD_X = Array.from({ length: 6 }, (_, i) => 580 + i * 108);
const XS = [...SOFT_X, ...ACAD_X];
const HEIGHTS = [240, 290, 260, 190, 250, 205, 280, 225, 262];
const LEAN = [14, -12, 10, -10, 12, -8, 14, -12, 8];
const PAIRS = [5, 6, 5, 4, 6, 5, 7, 5, 6];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.32, delayChildren: 0.15 } } };
const stalkGroup: Variants = { hidden: {}, show: {} };
const root: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 0.6, transition: { duration: 0.8, ease } },
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

/** Rain, deterministic so server and client agree. */
const drops = Array.from({ length: 20 }, (_, i) => ({
  x: 560 + ((i * 97) % 600),
  d: 3.2 + ((i * 7) % 10) / 10,
  s: 3.4 + ((i * 13) % 20) / 10,
}));

function Stalk({
  i,
  x,
  h,
  lean,
  pairs,
  tone,
}: {
  i: number;
  x: number;
  h: number;
  lean: number;
  pairs: number;
  tone: "ink" | "olive";
}) {
  const tipX = x + lean;
  const tipY = GROUND - h;
  const stalkD = `M${x} ${GROUND} C ${x + lean * 0.3} ${GROUND - h * 0.4}, ${x - lean * 0.25} ${GROUND - h * 0.72}, ${tipX} ${tipY}`;
  const colour = tone === "ink" ? "text-ink" : "text-olive";
  const px = (t: number) => x + lean * t * t;
  const start = 0.52 + (7 - pairs) * 0.012;

  return (
    <motion.g
      variants={stalkGroup}
      className={`stalk-sway ${colour}`}
      style={{
        transformOrigin: `${x}px ${GROUND}px`,
        animationDelay: `${3.4 + i * 0.35}s`,
        animationDuration: `${4.4 + (i % 4) * 0.7}s`,
      }}
    >
      {/* roots, drawn first, under the soil */}
      {[
        `M${x} ${GROUND} q -10 22 -30 52`,
        `M${x} ${GROUND} q 2 32 6 66`,
        `M${x} ${GROUND} q 12 22 32 44`,
        `M${x} ${GROUND + 30} q -14 6 -26 22`,
      ].map((d) => (
        <motion.path key={d} d={d} variants={root} className="fill-none stroke-olive-tint" strokeWidth="1.3" strokeLinecap="round" />
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
      {/* grains with awns, bottom to top */}
      {Array.from({ length: pairs }, (_, k) => {
        const t = start + k * (0.4 / pairs);
        const y = GROUND - h * t;
        const cx = px(t);
        return (
          <motion.g key={k} variants={grain} custom={k + 2} style={box} className="fill-current">
            <ellipse cx={cx - 8} cy={y} rx="5" ry="12" transform={`rotate(-32 ${cx - 8} ${y})`} />
            <ellipse cx={cx + 8} cy={y - 10} rx="5" ry="12" transform={`rotate(32 ${cx + 8} ${y - 10})`} />
            <path
              d={`M${cx - 14.4} ${y - 10.2} l-5 -13 M${cx + 14.4} ${y - 20.2} l5 -13`}
              className="stroke-current"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>
        );
      })}
      <motion.g variants={grain} custom={pairs + 2} style={box} className="fill-current">
        <ellipse cx={tipX} cy={tipY - 8} rx="5" ry="14" />
        <path d={`M${tipX} ${tipY - 22} v-14`} className="stroke-current" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </motion.g>
    </motion.g>
  );
}

function Cloud({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g className="cloud" style={{ animationDelay: `${delay}s` }}>
      <g transform={`translate(${x} ${y}) scale(${s})`} className="fill-paper" opacity=".92">
        <ellipse cx="0" cy="0" rx="34" ry="11" />
        <ellipse cx="-14" cy="-8" rx="16" ry="12" />
        <ellipse cx="10" cy="-11" rx="20" ry="14" />
      </g>
    </g>
  );
}

function Bird({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g className="bird" style={{ animationDelay: `${delay}s` }}>
      <path
        d={`M${x} ${y} q 6 -8 12 0 q 6 -8 12 0`}
        className="fill-none stroke-ink"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </g>
  );
}

export function FieldScene({ items }: { items: FieldItem[] }) {
  const reduce = useReducedMotion();
  const ordered = [...items.filter((i) => i.group === "software"), ...items.filter((i) => i.group === "academy")];

  return (
    <div className="relative">
      {/* full-bleed backdrop: far hills, near hills and layered soil, stretched edge to edge */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d={`M0 250 C 160 196, 320 236, 520 206 S 880 168, 1200 226 V ${H} H0Z`}
          className="fill-olive-tint"
          opacity=".6"
        />
        <path
          d={`M0 300 C 220 262, 420 304, 700 272 S 1040 252, 1200 292 V ${H} H0Z`}
          className="fill-olive"
          opacity=".16"
        />
        {/* soil */}
        <path
          d={`M0 ${GROUND} C 80 ${GROUND - 6}, 170 ${GROUND + 4}, 260 ${GROUND - 2} S 450 ${GROUND + 5}, 560 ${GROUND - 1} S 800 ${GROUND + 4}, 920 ${GROUND - 3} S 1120 ${GROUND + 4}, 1200 ${GROUND - 1} V ${H} H0 Z`}
          className="fill-ink"
        />
        <rect x="0" y="406" width={W} height={H - 406} className="fill-olive-deep" />
        <path d={`M0 406 H${W}`} className="stroke-paper" strokeWidth="1" strokeDasharray="4 7" opacity=".18" />
      </svg>

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
          {/* sky */}
          <Cloud x={230} y={52} s={1.1} />
          <Cloud x={830} y={40} s={0.9} delay={-8} />
          <Cloud x={1060} y={96} s={0.7} delay={-14} />
          <Bird x={330} y={110} />
          <Bird x={362} y={96} delay={-3} />
          <Bird x={930} y={86} delay={-6} />

          {/* sun */}
          <g className="spin-slow" style={{ transformOrigin: "490px 70px" }}>
            {Array.from({ length: 14 }, (_, i) => (
              <line
                key={i}
                x1="490"
                y1="28"
                x2="490"
                y2={i % 2 ? 40 : 46}
                transform={`rotate(${i * (360 / 14)} 490 70)`}
                className="stroke-olive"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </g>
          <circle cx="490" cy="70" r="24" className="fill-olive-tint stroke-olive" strokeWidth="2" />
          <circle cx="490" cy="70" r="14" className="fill-paper" opacity=".7" />

          {/* watering can, pouring on the first stalk: the "care" */}
          <g className="can" style={{ transformOrigin: "62px 176px" }}>
            <g transform="rotate(-16 62 176)">
              <path d="M30 156 h50 l-4 40 h-42z" className="fill-paper stroke-ink" strokeWidth="2" />
              <path d="M30 164 q-24 -4 -12 22 q6 8 16 6" className="fill-none stroke-ink" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M78 176 L112 150 L118 156 L80 190Z" className="fill-olive-tint stroke-ink" strokeWidth="2" strokeLinejoin="round" />
              <path d="M108 146 l14 14" className="stroke-ink" strokeWidth="5" strokeLinecap="round" />
              <path d="M40 170 h30" className="stroke-olive" strokeWidth="2" />
            </g>
          </g>
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={116 + i * 3}
              y1="170"
              x2={115 + i * 3}
              y2="180"
              className="pour stroke-olive"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{ animationDelay: `${3.6 + i * 0.28}s` }}
            />
          ))}

          {/* rain over the courses, after the stalks are up */}
          {drops.map((d, i) => (
            <line
              key={i}
              x1={d.x}
              y1="24"
              x2={d.x - 3}
              y2="38"
              className="rain stroke-olive"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ animationDuration: `${d.d}s`, animationDelay: `${d.s}s` }}
            />
          ))}

          {/* grass tufts along the ground */}
          {Array.from({ length: 34 }, (_, i) => {
            const gx = 20 + i * 35 + ((i * 17) % 13);
            return (
              <path
                key={i}
                d={`M${gx} ${GROUND + 1} q -3 -9 -5 -13 M${gx} ${GROUND + 1} q 1 -11 1 -17 M${gx} ${GROUND + 1} q 4 -8 7 -12`}
                className="fill-none stroke-olive"
                strokeWidth="1.3"
                strokeLinecap="round"
                opacity=".55"
              />
            );
          })}

          {/* pebbles in the soil */}
          {Array.from({ length: 40 }, (_, i) => (
            <circle
              key={i}
              cx={14 + ((i * 53) % 1180)}
              cy={GROUND + 12 + ((i * 29) % 36)}
              r={1.2 + (i % 3) * 0.5}
              className="fill-olive-tint"
              opacity=".3"
            />
          ))}

          {/* signpost between the two groups */}
          <g>
            <rect x="504" y={GROUND - 104} width="5" height="108" className="fill-ink" />
            <polygon points="502,262 440,262 432,271 440,280 502,280" className="fill-ink" />
            <text x="446" y="274" className="fill-paper font-mono" fontSize="8.5" letterSpacing="1">
              SOFTWARE
            </text>
            <polygon points="511,288 566,288 574,297 566,306 511,306" className="fill-olive" />
            <text x="517" y="300" className="fill-paper font-mono" fontSize="8.5" letterSpacing="1">
              ACADEMY
            </text>
          </g>

          {/* stalks: software on the left, courses on the right */}
          {ordered.map((it, i) => (
            <Stalk
              key={it.href}
              i={i}
              x={XS[i]}
              h={HEIGHTS[i]}
              lean={LEAN[i]}
              pairs={PAIRS[i]}
              tone={it.group === "software" ? "ink" : "olive"}
            />
          ))}
        </motion.svg>

        {/* garden name-stakes planted beside each stalk once it has grown */}
        <ul className="pointer-events-none absolute inset-0 hidden md:block">
          {ordered.map((it, i) => {
            const bottom = ((H - GROUND + 2) / H) * 100;
            const delay = 0.15 + i * 0.32 + 2.0;
            const left = ((XS[i] + 8) / W) * 100;
            const software = it.group === "software";
            const tag = (
              <Link
                href={it.href}
                className={`pointer-events-auto relative block w-[98px] rounded-[3px] border px-2 py-1.5 text-center font-mono text-[10.5px] uppercase leading-tight tracking-[0.05em] shadow-[2px_2px_0_#14130F] transition-transform hover:-translate-y-0.5 after:absolute after:left-1/2 after:top-full after:h-[26px] after:w-[3px] after:-translate-x-1/2 after:bg-olive-tint after:content-[''] ${
                  software ? "border-ink bg-ink text-paper" : "border-ink bg-paper text-ink"
                }`}
              >
                <span className={`block text-[9px] ${software ? "text-olive-tint" : "text-olive"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {it.name}
              </Link>
            );
            return (
              <li key={it.href} className="absolute -translate-x-1/2" style={{ left: `${left}%`, bottom: `${bottom}%` }}>
                {reduce ? (
                  tag
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.85 }}
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
