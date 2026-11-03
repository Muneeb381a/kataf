/** Flat, hand-made course illustrations. Brand colours only, 1.5px strokes, no gradients. */
const S = "stroke-ink";

function Design() {
  return (
    <>
      {/* bezier curve with handles */}
      <path d="M40 170 C 90 40, 170 40, 220 120 S 330 190, 360 70" className={`${S} fill-none`} strokeWidth="2.5" />
      <path d="M40 170 L90 40 M220 120 L170 40 M220 120 L270 190 M360 70 L330 190" className="stroke-olive fill-none" strokeWidth="1.2" strokeDasharray="3 3" />
      {[[90, 40], [170, 40], [270, 190], [330, 190]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="5" className="fill-paper stroke-olive" strokeWidth="1.5" />
      ))}
      {[[40, 170], [220, 120], [360, 70]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x - 6} y={y - 6} width="12" height="12" className="fill-olive stroke-ink" strokeWidth="1.5" />
      ))}
      {/* swatches */}
      {["fill-olive", "fill-olive-tint", "fill-ink", "fill-paper-2"].map((c, i) => (
        <rect key={c} x={28 + i * 30} y="196" width="24" height="24" className={`${c} stroke-ink`} strokeWidth="1.5" />
      ))}
      <text x="300" y="228" className="fill-ink font-serif" fontSize="44">Aa</text>
    </>
  );
}

function Web() {
  return (
    <>
      <rect x="50" y="30" width="300" height="180" className="fill-paper stroke-ink" strokeWidth="2" />
      <path d="M50 58H350" className={S} strokeWidth="2" />
      {[68, 82, 96].map((x) => (
        <circle key={x} cx={x} cy="44" r="4" className="fill-paper stroke-ink" strokeWidth="1.5" />
      ))}
      <rect x="70" y="76" width="120" height="14" className="fill-olive" />
      <rect x="70" y="100" width="190" height="8" className="fill-olive-tint" />
      <rect x="70" y="114" width="150" height="8" className="fill-olive-tint" />
      <rect x="70" y="138" width="70" height="26" className="fill-ink" />
      <rect x="236" y="76" width="94" height="88" className="fill-paper-2 stroke-ink" strokeWidth="1.5" />
      <text x="246" y="132" className="fill-olive font-mono" fontSize="30" fontWeight="500">{"</>"}</text>
      <rect x="70" y="178" width="260" height="8" className="fill-olive-tint" />
    </>
  );
}

function Backend() {
  return (
    <>
      {[34, 84, 134].map((y, i) => (
        <g key={y}>
          <rect x="40" y={y} width="150" height="38" className="fill-paper stroke-ink" strokeWidth="2" />
          <circle cx="58" cy={y + 19} r="4" className={i === 1 ? "fill-olive" : "fill-olive-tint stroke-olive"} strokeWidth="1" />
          <path d={`M76 ${y + 19}H150`} className="stroke-olive-tint" strokeWidth="6" />
        </g>
      ))}
      <path d="M190 100 H250" className={S} strokeWidth="2" />
      <path d="M242 94 L252 100 L242 106" className={`${S} fill-none`} strokeWidth="2" />
      {/* database */}
      <path d="M262 62 v100 a50 16 0 0 0 100 0 v-100" className="fill-olive-tint stroke-ink" strokeWidth="2" />
      <ellipse cx="312" cy="62" rx="50" ry="16" className="fill-paper stroke-ink" strokeWidth="2" />
      <path d="M262 100 a50 16 0 0 0 100 0 M262 134 a50 16 0 0 0 100 0" className="fill-none stroke-ink" strokeWidth="1.5" />
      <text x="40" y="214" className="fill-olive font-mono" fontSize="13">GET /orders  200 OK</text>
    </>
  );
}

function FullStack() {
  const layers = [
    { y: 30, t: "UI", c: "fill-paper" },
    { y: 90, t: "API", c: "fill-olive-tint" },
    { y: 150, t: "DB", c: "fill-olive" },
  ];
  return (
    <>
      {layers.map((l) => (
        <g key={l.t}>
          <rect x="90" y={l.y} width="220" height="44" className={`${l.c} stroke-ink`} strokeWidth="2" />
          <text x="110" y={l.y + 28} className={`${l.t === "DB" ? "fill-paper" : "fill-ink"} font-mono`} fontSize="15" fontWeight="500">
            {l.t}
          </text>
        </g>
      ))}
      {[74, 134].map((y) => (
        <g key={y}>
          <path d={`M200 ${y}V${y + 16}`} className={S} strokeWidth="2" />
          <path d={`M194 ${y + 10}L200 ${y + 17}L206 ${y + 10}`} className={`${S} fill-none`} strokeWidth="2" />
        </g>
      ))}
      <text x="250" y="60" className="fill-muted font-mono" fontSize="11">React</text>
      <text x="250" y="120" className="fill-muted font-mono" fontSize="11">Node.js</text>
      <text x="236" y="180" className="fill-paper font-mono" fontSize="11">PostgreSQL</text>
    </>
  );
}

function AI() {
  const nodes: [number, number][] = [[60, 60], [60, 120], [60, 180], [160, 40], [160, 105], [160, 170], [260, 80], [260, 150], [350, 115]];
  const links: [number, number][] = [[0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7], [6, 8], [7, 8]];
  return (
    <>
      {links.map(([a, b]) => (
        <path
          key={`${a}${b}`}
          d={`M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}`}
          className="stroke-olive"
          strokeWidth="1.2"
          opacity=".55"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 8 ? 16 : 9}
          className={`${i === 8 ? "fill-olive" : i % 2 ? "fill-olive-tint" : "fill-paper"} stroke-ink`}
          strokeWidth="2"
        />
      ))}
      <path d="M350 108 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" className="fill-paper" />
    </>
  );
}

function Marketing() {
  const bars = [40, 62, 54, 92, 120, 156];
  return (
    <g transform="translate(-8 16) scale(.95)">
      <path d="M40 210H370" className={S} strokeWidth="2" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={56 + i * 52}
          y={210 - h}
          width="34"
          height={h}
          className={`${i === bars.length - 1 ? "fill-olive" : "fill-olive-tint"} stroke-ink`}
          strokeWidth="2"
        />
      ))}
      <path d="M62 150 L116 128 L170 138 L222 96 L274 70 L326 36" className="fill-none stroke-ink" strokeWidth="2.5" strokeDasharray="1 7" strokeLinecap="round" />
      <path d="M312 34 L328 34 L328 50" className="fill-none stroke-ink" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="90" cy="60" r="22" className="fill-paper stroke-ink" strokeWidth="2" />
      <circle cx="90" cy="60" r="13" className="fill-none stroke-olive" strokeWidth="2" />
      <circle cx="90" cy="60" r="4" className="fill-olive" />
    </g>
  );
}

function Video() {
  return (
    <>
      <rect x="110" y="20" width="180" height="104" className="fill-ink stroke-ink" strokeWidth="2" />
      <circle cx="200" cy="72" r="22" className="fill-olive" />
      <path d="M193 60 L213 72 L193 84Z" className="fill-paper" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x="30" y={140 + r * 28} width="340" height="22" className="fill-paper stroke-ink" strokeWidth="1.5" />
          <rect x={40 + r * 18} y={143 + r * 28} width="90" height="16" className="fill-olive stroke-ink" strokeWidth="1" />
          <rect x={150 + r * 10} y={143 + r * 28} width="70" height="16" className="fill-olive-tint stroke-olive" strokeWidth="1" />
          <rect x={240 - r * 12} y={143 + r * 28} width="100" height="16" className="fill-paper-2 stroke-ink" strokeWidth="1" />
        </g>
      ))}
      <path d="M170 134 V228" className="stroke-ink" strokeWidth="2" />
      <path d="M163 134 h14 l-7 9z" className="fill-ink" />
    </>
  );
}

function Office() {
  return (
    <>
      <rect x="40" y="26" width="240" height="176" className="fill-paper stroke-ink" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((r) => (
        <path key={"h" + r} d={"M40 " + (56 + r * 29) + "H280"} className="stroke-ink" strokeWidth="1" opacity=".5" />
      ))}
      {[0, 1, 2, 3].map((c) => (
        <path key={"v" + c} d={"M" + (100 + c * 60) + " 26V202"} className="stroke-ink" strokeWidth="1" opacity=".5" />
      ))}
      <rect x="40" y="26" width="240" height="30" className="fill-olive" />
      <text x="62" y="46" className="fill-paper font-mono" fontSize="12">A       B       C       D</text>
      <rect x="100" y="85" width="60" height="29" className="fill-olive-tint stroke-olive" strokeWidth="1.5" />
      {[[56, 36], [116, 52], [176, 28], [236, 62]].map(([x, h], i) => (
        <rect key={i} x={x} y={196 - h} width="26" height={h} className="fill-olive stroke-ink" strokeWidth="1.2" />
      ))}
      <rect x="300" y="50" width="64" height="86" className="fill-paper stroke-ink" strokeWidth="2" />
      {[64, 76, 88, 100].map((y) => (
        <path key={y} d={"M308 " + y + "H356"} className="stroke-olive-tint" strokeWidth="4" />
      ))}
      <text x="332" y="124" textAnchor="middle" className="fill-ink font-serif" fontSize="22">W</text>
    </>
  );
}

const art = {
  "graphic-designing-advanced": Design,
  "video-editing": Video,
  "computer-essentials": Office,
  "graphic-designing": Design,
  "web-development": Web,
  "backend-development": Backend,
  "full-stack-development": FullStack,
  ai: AI,
  "digital-marketing": Marketing,
} as const;

export function CourseArt({ slug, className = "" }: { slug: string; className?: string }) {
  const Art = art[slug as keyof typeof art];
  if (!Art) return null;
  return (
    <svg viewBox="0 0 400 240" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <Art />
    </svg>
  );
}
