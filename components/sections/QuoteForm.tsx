"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { budgets, businessTypes, interests } from "@/lib/forms";
import { SubmitButton } from "@/components/ui/Button";

type Errors = Partial<Record<string, string>>;

export function QuoteForm({
  defaultInterest = "",
  sourcePage = "/contact",
  dark = false,
}: {
  defaultInterest?: string;
  sourcePage?: string;
  dark?: boolean;
}) {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setErrors({});
    setFormError("");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, sourcePage }),
      });
      if (res.ok) {
        router.push("/thank-you");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (data.errors) setErrors(data.errors);
      setFormError(
        res.status === 429
          ? "Too many requests from this connection. Please wait a few minutes, or message us on WhatsApp."
          : data.error ?? "Please check the highlighted fields.",
      );
    } catch {
      setFormError("Could not send. Check your connection, or message us on WhatsApp.");
    }
    setSending(false);
  }

  const field = dark
    ? "border-paper/40 bg-transparent text-paper placeholder:text-paper/40 focus:border-paper"
    : "border-ink/40 bg-paper text-ink placeholder:text-muted/70 focus:border-ink";
  const input = `w-full rounded border px-4 py-3 text-[16px] ${field}`;
  const labelCls = `label mb-2 block ${dark ? "text-paper/80" : "text-muted"}`;
  const errCls = dark ? "text-olive-tint" : "text-[#8a2b1a]";

  const Err = ({ k }: { k: string }) =>
    errors[k] ? (
      <p id={`${k}-err`} className={`mt-1.5 text-[14px] ${errCls}`}>
        {errors[k]}
      </p>
    ) : null;

  const aria = (k: string) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className={`grid gap-6 ${dark ? "on-dark" : ""}`}>
      {/* honeypot: real people never see or fill this */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name *
          </label>
          <input id="name" name="name" required autoComplete="name" className={input} {...aria("name")} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone / WhatsApp *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="03XX XXXXXXX"
            className={input}
            {...aria("phone")}
          />
          <Err k="phone" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="businessType" className={labelCls}>
            Business type
          </label>
          <select id="businessType" name="businessType" defaultValue="" className={input}>
            <option value="" className="text-ink">
              Select
            </option>
            {businessTypes.map((b) => (
              <option key={b} className="text-ink">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="interestedIn" className={labelCls}>
            Interested in *
          </label>
          <select
            id="interestedIn"
            name="interestedIn"
            required
            defaultValue={defaultInterest}
            className={input}
            {...aria("interestedIn")}
          >
            <option value="" disabled className="text-ink">
              Select
            </option>
            {interests.map((i) => (
              <option key={i} className="text-ink">
                {i}
              </option>
            ))}
          </select>
          <Err k="interestedIn" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Tell us about your business *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What do you do, how many people work with you, and what is hardest to keep track of today?"
          className={input}
          {...aria("message")}
        />
        <Err k="message" />
      </div>

      <div>
        <label htmlFor="budget" className={labelCls}>
          Budget range (optional)
        </label>
        <select id="budget" name="budget" defaultValue="" className={`${input} md:max-w-[50%]`}>
          <option value="" className="text-ink">
            Not sure yet
          </option>
          {budgets
            .filter((b) => b !== "Not sure yet")
            .map((b) => (
              <option key={b} className="text-ink">
                {b}
              </option>
            ))}
        </select>
      </div>

      <div aria-live="polite">{formError && <p className={errCls}>{formError}</p>}</div>

      <div>
        <SubmitButton type="submit" disabled={sending} variant={dark ? "paper" : "primary"}>
          {sending ? "Sending" : "Get a Quote"}
        </SubmitButton>
      </div>
    </form>
  );
}
