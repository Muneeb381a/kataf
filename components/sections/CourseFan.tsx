import { CourseArt } from "@/components/ui/CourseArt";

const cards = [
  { slug: "graphic-designing", label: "Design", cls: "left-0 top-16 w-[54%] -rotate-6 z-0" },
  { slug: "web-development", label: "Web", cls: "right-0 top-0 w-[54%] rotate-3 z-10" },
  { slug: "ai", label: "AI", cls: "left-[22%] bottom-0 w-[56%] -rotate-1 z-20" },
];

/** Three course illustrations fanned out like a hand of cards. Decorative. */
export function CourseFan({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      {cards.map((c) => (
        <div
          key={c.slug}
          className={`absolute overflow-hidden rounded border border-ink bg-paper shadow-frame ${c.cls}`}
        >
          <div className="stage relative !rounded-none !border-0">
            <span className="label absolute left-3 top-3 rounded bg-ink px-2 py-1 text-paper">{c.label}</span>
            <CourseArt slug={c.slug} className="block h-auto w-full p-2 pt-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
