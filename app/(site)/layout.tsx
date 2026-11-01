import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-olive focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
