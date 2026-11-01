import { SiteShell } from "@/components/layout/SiteShell";

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell variant="academy">{children}</SiteShell>;
}
