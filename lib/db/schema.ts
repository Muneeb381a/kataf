import { boolean, date, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  businessType: text("business_type"),
  interestedIn: text("interested_in").notNull(),
  message: text("message").notNull(),
  budget: text("budget"),
  sourcePage: text("source_page"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  city: text("city"),
  course: text("course").notNull(),
  background: text("background"),
  batch: text("batch"),
  slot: text("slot"),
  message: text("message"),
  sourcePage: text("source_page"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  studentName: text("student_name").notNull(),
  course: text("course").notNull(),
  issuedOn: date("issued_on").notNull().defaultNow(),
  revoked: boolean("revoked").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
