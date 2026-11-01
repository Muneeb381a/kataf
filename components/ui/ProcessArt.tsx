/** Small hand-drawn scenes for the four steps. Brand colours only. */
const ink = "stroke-ink fill-none";

function Understand() {
  return (
    <>
      <rect x="22" y="14" width="74" height="54" className="fill-paper stroke-ink" strokeWidth="2" />
      {[28, 38, 48, 58].map((y) => (
        <path key={y} d={`M32 ${y}H${y % 20 ? 84 : 70}`} className="stroke-olive-tint" strokeWidth="3" />
      ))}
      <circle cx="104" cy="44" r="18" className="fill-paper/60 stroke-ink" strokeWidth="2.5" />
      <circle cx="104" cy="44" r="12" className="fill-olive-tint stroke-olive" strokeWidth="1.5" />
      <path d="M117 57L132 72" className={ink} strokeWidth="5" strokeLinecap="round" />
    </>
  );
}
function Design() {
  return (
    <>
      <path d="M20 66L56 20H92L56 66Z" className="fill-olive-tint stroke-ink" strokeWidth="2" />
      <path d="M32 58L58 24M42 58L64 28" className="stroke-olive" strokeWidth="1" />
      <path d="M96 62L132 20" className={ink} strokeWidth="9" strokeLinecap="round" />
      <path d="M96 62L132 20" className="stroke-olive fill-none" strokeWidth="5" strokeLinecap="round" />
      <path d="M92 70L98 56L104 66Z" className="fill-ink" />
    </>
  );
}
function Build() {
  return (
    <>
      <rect x="20" y="46" width="42" height="26" className="fill-olive stroke-ink" strokeWidth="2" />
      <rect x="66" y="46" width="42" height="26" className="fill-paper stroke-ink" strokeWidth="2" />
      <rect x="42" y="18" width="42" height="26" className="fill-olive-tint stroke-ink" strokeWidth="2" />
      <rect x="88" y="18" width="42" height="26" className="fill-olive stroke-ink" strokeWidth="2" />
      <path d="M112 60h28" className={ink} strokeWidth="2" strokeDasharray="2 4" />
    </>
  );
}
function Support() {
  return (
    <>
      <circle cx="76" cy="44" r="30" className="fill-paper stroke-ink" strokeWidth="2.5" />
      <circle cx="76" cy="44" r="12" className="fill-olive-tint stroke-ink" strokeWidth="2" />
      {[0, 90, 180, 270].map((a) => (
        <path key={a} d="M76 14 v12" transform={`rotate(${a} 76 44)`} className="stroke-olive" strokeWidth="9" />
      ))}
      <path d="M76 14 v12 M76 62 v12 M46 44 h12 M94 44 h12" className="stroke-ink" strokeWidth="2" opacity=".0" />
    </>
  );
}

const art = [Understand, Design, Build, Support];

export function ProcessArt({ index, className = "" }: { index: number; className?: string }) {
  const Art = art[index];
  return (
    <svg viewBox="0 0 152 88" className={className} aria-hidden="true">
      <Art />
    </svg>
  );
}
