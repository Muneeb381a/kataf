import { site } from "@/lib/config";

/** A sample certificate, drawn in code. Always labelled as a sample so nobody mistakes it for a real one. */
export function CertificateArt({ course = "Course name", className = "" }: { course?: string; className?: string }) {
  return (
    <svg viewBox="0 0 480 340" className={className} role="img" aria-label={`Sample Kataf Academy certificate for ${course}`}>
      <rect x="8" y="8" width="464" height="324" className="fill-paper stroke-ink" strokeWidth="2" />
      <rect x="22" y="22" width="436" height="296" className="fill-none stroke-olive" strokeWidth="1.2" />
      <rect x="28" y="28" width="424" height="284" className="fill-none stroke-olive" strokeWidth="0.6" strokeDasharray="3 4" />

      <text x="44" y="50" className="fill-muted font-mono" fontSize="7.5" letterSpacing="1">
        ID  KTF-2026-A7K3PQ
      </text>
      <text x="436" y="50" textAnchor="end" className="fill-muted font-mono" fontSize="7.5" letterSpacing="1">
        {site.domain}/verify
      </text>

      {/* mark */}
      <image href="/logo/alkausar-mark.png" x="214" y="38" width="52" height="28" />
      <text x="240" y="80" textAnchor="middle" className="fill-ink font-serif" fontSize="11.5" fontWeight="600" letterSpacing="1.5">
        AL-KAUSAR COMPUTER INSTITUTE
      </text>
      <text x="240" y="93" textAnchor="middle" className="fill-olive font-mono" fontSize="7.5" letterSpacing="3">
        KATAF ACADEMY
      </text>

      <text x="240" y="132" textAnchor="middle" className="fill-ink font-serif" fontSize="38">
        Certificate
      </text>
      <text x="240" y="154" textAnchor="middle" className="fill-muted font-serif" fontSize="16" fontStyle="italic">
        of Completion
      </text>

      <text x="240" y="188" textAnchor="middle" className="fill-muted font-sans" fontSize="10.5">
        This certifies that
      </text>
      <text x="240" y="216" textAnchor="middle" className="fill-ink font-serif" fontSize="20" fontStyle="italic">
        Student Name
      </text>
      <path d="M120 224H360" className="stroke-ink" strokeWidth="0.8" />

      <text x="240" y="244" textAnchor="middle" className="fill-muted font-sans" fontSize="10.5">
        has completed the course
      </text>
      <text x="240" y="268" textAnchor="middle" className="fill-olive font-serif" fontSize="19">
        {course}
      </text>

      {/* date, seal, signature */}
      <path d="M52 296H152" className="stroke-ink" strokeWidth="0.8" />
      <text x="102" y="308" textAnchor="middle" className="fill-muted font-mono" fontSize="7.5" letterSpacing="1.5">
        DATE
      </text>
      <path d="M328 296H428" className="stroke-ink" strokeWidth="0.8" />
      <text x="378" y="308" textAnchor="middle" className="fill-muted font-mono" fontSize="7.5" letterSpacing="1.5">
        DIRECTOR
      </text>
      <circle cx="240" cy="292" r="19" className="fill-olive" />
      <circle cx="240" cy="292" r="15" className="fill-none stroke-paper" strokeWidth="0.8" />
      <image href="/logo/alkausar-mark-light.png" x="230" y="285" width="20" height="10.8" />
    </svg>
  );
}
