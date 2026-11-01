import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";

/** A sample of a message a Kataf product sends. Always marked as a sample. */
export function WhatsAppBubble({ label, text, className = "" }: { label: string; text: string; className?: string }) {
  return (
    <figure
      className={`w-[230px] rounded border border-ink bg-paper shadow-[4px_4px_0_#14130F] ${className}`}
      aria-label={`Sample WhatsApp message: ${label}`}
    >
      <figcaption className="flex items-center justify-between gap-2 border-b border-ink bg-olive px-3 py-1.5 text-paper">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em]">
          <WhatsAppIcon className="h-3.5 w-3.5" /> {label}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.08em] opacity-80">Sample</span>
      </figcaption>
      <p className="px-3 pb-1 pt-3 text-[14px] leading-snug text-ink">{text}</p>
      <p className="px-3 pb-2 text-right font-mono text-[10px] text-olive">✓✓</p>
    </figure>
  );
}
