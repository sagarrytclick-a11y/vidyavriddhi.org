import { z } from "zod";
import { siteConfig } from "../site-config";

/**
 * Validation for the home page campaign enquiry form.
 *
 * Imported by both `app/api/enquiry/route.ts` (the source of truth) and
 * `app/components/campaign-form.tsx` (instant feedback before the request), so
 * the two can never drift apart.
 */

/**
 * Indian mobile number, normalised to `+91XXXXXXXXXX`.
 *
 * Accepts the number typed any reasonable way — `9839865347`, `+91 98398
 * 65347`, `09839865347`, `98398-65347` — and rejects anything that is not a
 * 10-digit mobile number starting 6-9 (landlines and short codes included).
 */
export const mobileField = z
  .string({ error: "Please enter your mobile number." })
  .trim()
  .min(1, "Please enter your mobile number.")
  .transform((value) => {
    const digits = value.replace(/\D/g, "");
    // Drop a country code or trunk prefix: 919839865347 / 09839865347.
    const local = digits.replace(/^(?:91|0)(?=\d{10}$)/, "");
    return local.length === 10 ? `+91${local}` : value;
  })
  .refine((value) => /^\+91[6-9]\d{9}$/.test(value), {
    error: "Enter a valid 10-digit mobile number, e.g. 98398 65347.",
  });

export const enquirySchema = z.object({
  fullName: z
    .string({ error: "Please enter your full name." })
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That looks too long — please shorten your name."),

  mobile: mobileField,

  email: z
    .string({ error: "Please enter your work email." })
    .trim()
    .toLowerCase()
    .min(1, "Please enter your work email.")
    .pipe(
      z.email("Enter a valid email address, e.g. name@institution.com."),
    ),

  institution: z
    .string({ error: "Please enter your institution or company." })
    .trim()
    .min(2, "Please enter your institution or company.")
    .max(120, "That looks too long — please shorten the name."),

  consent: z
    .unknown()
    .refine((value) => value === "on" || value === true, {
      error: `Please accept the ${siteConfig.name} Privacy Policy to continue.`,
    }),

  /** Honeypot — hidden in the form, so only bots fill it in. */
  website: z.string().optional().default(""),
});

export type Enquiry = z.infer<typeof enquirySchema>;

/** Flatten Zod issues to `{ field: "first message" }`, the shape the form renders. */
export function enquiryFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    // First message per field wins; later issues are alternatives.
    if (typeof field === "string" && !(field in fieldErrors)) {
      fieldErrors[field] = issue.message;
    }
  }

  return fieldErrors;
}
