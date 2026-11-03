"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { backgrounds } from "@/lib/forms";
import { courses } from "@/lib/courses";
import { batchOptions, slotOptions } from "@/lib/schedule";
import { SubmitButton } from "@/components/ui/Button";

type Errors = Partial<Record<string, string>>;

export function ApplyForm({
  defaultCourse = "",
  sourcePage = "/apply",
  dark = false,
}: {
  defaultCourse?: string;
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
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, sourcePage }),
      });
      if (res.ok) {
        router.push("/thank-you?type=apply");
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
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="a-name" className={labelCls}>
            Name *
          </label>
          <input id="a-name" name="name" required autoComplete="name" className={input} {...aria("name")} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="a-phone" className={labelCls}>
            Phone / WhatsApp *
          </label>
          <input
            id="a-phone"
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
          <label htmlFor="a-course" className={labelCls}>
            Course *
          </label>
          <select
            id="a-course"
            name="course"
            required
            defaultValue={defaultCourse}
            className={input}
            {...aria("course")}
          >
            <option value="" disabled className="text-ink">
              Select
            </option>
            {courses.map((c) => (
              <option key={c.slug} className="text-ink">
                {c.name}
              </option>
            ))}
            <option className="text-ink">Not sure, help me choose</option>
          </select>
          <Err k="course" />
        </div>
        <div>
          <label htmlFor="a-city" className={labelCls}>
            City
          </label>
          <input id="a-city" name="city" autoComplete="address-level2" className={input} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="a-batch" className={labelCls}>
            Batch
          </label>
          <select id="a-batch" name="batch" defaultValue="" className={input}>
            <option value="" className="text-ink">
              Select
            </option>
            {batchOptions.map((b) => (
              <option key={b} className="text-ink">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="a-slot" className={labelCls}>
            Preferred slot
          </label>
          <select id="a-slot" name="slot" defaultValue="" className={input}>
            <option value="" className="text-ink">
              Select
            </option>
            {slotOptions.map((x) => (
              <option key={x} className="text-ink">
                {x}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="a-bg" className={labelCls}>
          About you
        </label>
        <select id="a-bg" name="background" defaultValue="" className={`${input} md:max-w-[50%]`}>
          <option value="" className="text-ink">
            Select
          </option>
          {backgrounds.map((b) => (
            <option key={b} className="text-ink">
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="a-msg" className={labelCls}>
          Anything we should know? (optional)
        </label>
        <textarea
          id="a-msg"
          name="message"
          rows={4}
          placeholder="Your experience so far, what you want to do after the course, or the timing that suits you."
          className={input}
        />
      </div>

      <div aria-live="polite">{formError && <p className={errCls}>{formError}</p>}</div>

      <div>
        <SubmitButton type="submit" disabled={sending} variant={dark ? "paper" : "primary"}>
          {sending ? "Sending" : "Apply now"}
        </SubmitButton>
      </div>
    </form>
  );
}
