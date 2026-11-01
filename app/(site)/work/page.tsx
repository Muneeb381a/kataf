import type { Metadata } from "next";
import { getAllWork } from "@/lib/work";
import { WorkList } from "@/components/sections/WorkList";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies from Kataf: the problem, what we built, and what changed.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="pt-14 md:pt-24">
        <div className="wrap">
          <SectionLabel>Work</SectionLabel>
          <h1 className="display max-w-[12ch]">The problem first. Then what we built.</h1>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="wrap">
          <WorkList items={getAllWork()} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
