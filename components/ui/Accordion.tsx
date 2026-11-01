/** Native <details> accordion: no JS, keyboard and screen reader friendly. */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((it) => (
        <details key={it.q} className="group border-b border-line">
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-6">
            <span className="font-serif text-[22px] leading-snug tracking-[-0.02em] md:text-[24px]">{it.q}</span>
            <span aria-hidden="true" className="label mt-2 text-olive">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <p className="max-w-[62ch] pb-7 text-muted">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
