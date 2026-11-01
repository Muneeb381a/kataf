import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

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
  message: text("message"),
  sourcePage: text("source_page"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
