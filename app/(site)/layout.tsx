import { SiteShell } from "@/components/layout/SiteShell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell variant="software">{children}</SiteShell>;
}
