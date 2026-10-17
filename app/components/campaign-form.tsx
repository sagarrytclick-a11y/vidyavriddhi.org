"use client";

import { useState } from "react";
import { siteConfig } from "../site-config";
import { CheckIcon } from "./icons";

/**
 * The enquiry schema is the same module the API route validates with, so the
 * two can never drift. It pulls in Zod — around 30 KB of JavaScript — which
 * nobody needs until they submit, so it is fetched on the first focus (while
 * the visitor is still typing) instead of being part of the initial bundle.
 * The import promise is cached by the module system, so the submit path only
 * awaits a file that is already warm.
 */
const loadValidation = () => import("../lib/enquiry-schema");

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success"; message: string }
  | { state: "error"; message: string; errors?: Record<string, string> };

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-slate-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 disabled:bg-slate-50 aria-invalid:border-red-300 aria-invalid:ring-2 aria-invalid:ring-red-100";

export default function CampaignForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const fieldErrors = status.state === "error" ? status.errors : undefined;
  const sending = status.state === "sending";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    // The same schema the API validates with, so mistakes are caught before
    // the request leaves the browser.
    const { enquirySchema, enquiryFieldErrors } = await loadValidation();
    const parsed = enquirySchema.safeParse(payload);

    if (!parsed.success) {
      setStatus({
        state: "error",
        message: "Please check the highlighted fields and try again.",
        errors: enquiryFieldErrors(parsed.error),
      });
      return;
    }

    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; errors?: Record<string, string> }
        | null;

      if (!response.ok || !result?.ok) {
        setStatus({
          state: "error",
          message:
            result?.message ??
            "Something went wrong while sending. Please try again.",
          errors: result?.errors,
        });
        return;
      }

      form.reset();
      setStatus({
        state: "success",
        message: result.message ?? "Thanks — your enquiry is with our team.",
      });
    } catch {
      setStatus({
        state: "error",
        message:
          "We couldn't reach the server. Please check your connection and try again.",
      });
    }
  }

  return (
    <div
      id="plan"
      className="relative scroll-mt-24 rounded-2xl border border-slate-200/80 border-t-4 border-t-brand-orange bg-white p-6 shadow-xl shadow-brand-navy/5 sm:p-8"
    >
      <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-orange sm:text-xs sm:tracking-[0.25em]">
        <span className="h-0.5 w-8 bg-brand-orange" />
        Campaign planning
      </p>

      <h2 className="mt-3 text-2xl font-extrabold leading-snug text-brand-navy sm:text-3xl">
        Build a stronger student enquiry pipeline
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Tell us about your institution and intake. We&apos;ll discuss a channel
        mix suited to your courses, audience and goals.
      </p>

      {status.state === "success" ? (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green-500 text-white">
            <CheckIcon className="h-6 w-6" />
          </span>
          <p className="mt-4 text-base font-extrabold text-brand-navy">
            Enquiry sent
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {status.message}
          </p>
          <button
            type="button"
            onClick={() => setStatus({ state: "idle" })}
            className="mt-5 rounded-full border border-brand-navy/20 px-5 py-2.5 text-sm font-bold text-brand-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-navy/40 hover:shadow-lg hover:shadow-brand-navy/5"
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          // Warm the validation chunk as soon as the visitor touches a field.
          onFocus={() => {
            void loadValidation();
          }}
          className="mt-6 space-y-5"
        >
          {status.state === "error" && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold leading-relaxed text-red-700"
            >
              {status.message}
            </p>
          )}

          {/* Honeypot — hidden from people, irresistible to bots. */}
          <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-brand-navy">
                Full Name <span className="text-brand-orange">*</span>
              </span>
              <input
                type="text"
                name="fullName"
                required
                maxLength={80}
                autoComplete="name"
                disabled={sending}
                placeholder="Enter your name"
                aria-invalid={Boolean(fieldErrors?.fullName)}
                className={inputClass}
              />
              {fieldErrors?.fullName && (
                <span className="mt-1.5 block text-xs font-semibold text-red-600">
                  {fieldErrors.fullName}
                </span>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-brand-navy">
                Mobile Number <span className="text-brand-orange">*</span>
              </span>
              <input
                type="tel"
                name="mobile"
                required
                inputMode="tel"
                autoComplete="tel"
                disabled={sending}
                placeholder="Enter your mobile number"
                aria-invalid={Boolean(fieldErrors?.mobile)}
                className={inputClass}
              />
              {fieldErrors?.mobile && (
                <span className="mt-1.5 block text-xs font-semibold text-red-600">
                  {fieldErrors.mobile}
                </span>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-brand-navy">
                Work Email <span className="text-brand-orange">*</span>
              </span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                disabled={sending}
                placeholder="you@institution.com"
                aria-invalid={Boolean(fieldErrors?.email)}
                className={inputClass}
              />
              {fieldErrors?.email && (
                <span className="mt-1.5 block text-xs font-semibold text-red-600">
                  {fieldErrors.email}
                </span>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-brand-navy">
                Institution / Company <span className="text-brand-orange">*</span>
              </span>
              <input
                type="text"
                name="institution"
                required
                maxLength={120}
                autoComplete="organization"
                disabled={sending}
                placeholder="Enter institution name"
                aria-invalid={Boolean(fieldErrors?.institution)}
                className={inputClass}
              />
              {fieldErrors?.institution && (
                <span className="mt-1.5 block text-xs font-semibold text-red-600">
                  {fieldErrors.institution}
                </span>
              )}
            </label>
          </div>

          <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-brand-mist p-4">
            <input
              type="checkbox"
              name="consent"
              required
              disabled={sending}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-brand-orange"
            />
            <span className="text-xs leading-relaxed text-slate-600">
              I agree to be contacted by {siteConfig.name} regarding this enquiry
              and accept the{" "}
              <a href="/privacy" className="font-semibold text-brand-orange underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {fieldErrors?.consent && (
            <p className="text-xs font-semibold text-red-600">
              {fieldErrors.consent}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-full bg-gradient-to-r from-brand-orange to-brand-orange-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-orange/40 hover:brightness-105 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {sending ? "Sending…" : "Request My Channel Plan"}
          </button>

          <p className="text-center text-xs text-slate-500">
            We&apos;ll use your details to follow up about this request.
          </p>
        </form>
      )}
    </div>
  );
}
