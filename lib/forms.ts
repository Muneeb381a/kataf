import { z } from "zod";

export const interests = [
  "Printing ERP",
  "Installment Manager",
  "Doctor ERP",
  "Custom Software",
  "Custom Website",
] as const;

export const businessTypes = [
  "Printing press",
  "Shop / retail",
  "Clinic / doctor",
  "Trading / distribution",
  "School / academy",
  "Construction",
  "Other",
] as const;

export const budgets = [
  "Under PKR 100,000",
  "PKR 100,000 - 300,000",
  "PKR 300,000 - 750,000",
  "PKR 750,000+",
  "Not sure yet",
] as const;

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a phone or WhatsApp number with at least 10 digits"),
  businessType: z.string().trim().max(60).optional().or(z.literal("")),
  interestedIn: z.enum(interests, { message: "Choose what you are interested in" }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(3000),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  sourcePage: z.string().trim().max(200).optional(),
  website: z.string().max(200).optional(), // honeypot
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const backgrounds = [
  "School / college student",
  "Working professional",
  "Freelancer",
  "Business owner",
  "Other",
] as const;

export const applySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a phone or WhatsApp number with at least 10 digits"),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  course: z.string().trim().min(2, "Choose a course").max(80),
  background: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  sourcePage: z.string().trim().max(200).optional(),
  website: z.string().max(200).optional(), // honeypot
});

export type ApplyInput = z.infer<typeof applySchema>;
