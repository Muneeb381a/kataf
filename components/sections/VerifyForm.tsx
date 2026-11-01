"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitButton } from "@/components/ui/Button";

export function VerifyForm({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [code, setCode] = useState(initial);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const c = code.trim();
        if (c) router.push(`/verify/${encodeURIComponent(c)}`);
      }}
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label htmlFor="cert-code" className="label mb-2 block text-muted">
          Certificate ID
        </label>
        <input
          id="cert-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="KTF-2026-A7K3PQ"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          className="w-full rounded border border-ink/40 bg-paper px-4 py-3.5 font-mono text-[16px] uppercase tracking-[0.08em] placeholder:normal-case placeholder:tracking-normal placeholder:text-muted/60 focus:border-ink"
        />
      </div>
      <SubmitButton type="submit">Verify</SubmitButton>
    </form>
  );
}
