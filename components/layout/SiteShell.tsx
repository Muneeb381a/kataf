import { Nav, type NavVariant } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

/**
 * Page frame shared by both halves of Kataf.
 * The academy variant swaps the colours (see .theme-academy) and uses its own nav and footer.
 */
export function SiteShell({ variant, children }: { variant: NavVariant; children: React.ReactNode }) {
  const academy = variant === "academy";
  return (
    <div className={academy ? "theme-academy min-h-screen bg-paper text-ink" : ""}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-olive focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav variant={variant} />
      <main id="main">{children}</main>
      <Footer variant={variant} />
      <WhatsAppFloat />
    </div>
  );
}
