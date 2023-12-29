import { relations } from "drizzle-orm";
import { pgTable, text, date, bigint, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  google_sub: text("google_sub"),
  avatar_url: text("avatar_url"),
  display_name: text("display_name"),
});

export const userSession = pgTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", { mode: "bigint" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: 'bigint' }).notNull(),
});

export const userKey = pgTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password"),
});

export const club = pgTable("club", {
  id: text("id").primaryKey(),
  name: text("name"),
  slug: text("slug"),
  description: text("description"),
  founded: date("founded"),
  crestUrl: text("crest_url"),
});

export const website = pgTable("website", {
  id: text("id").primaryKey(),
  clubId: text("club_id")
    .notNull()
    .references(() => club.id),
  name: text("name"),
  url: text("url"),
  description: text("description"),
});

export const websiteRelations = relations(website, ({ many }) => ({
  pages: many(websitePage),
}))

export const websitePage = pgTable("website_page", {
  id: text("id").primaryKey(),
  websiteId: text("website_id")
    .notNull()
    .references(() => website.id),
  name: text("name"),
  url: text("url"),
  route: text("route"),
});

export const websitePageRelations = relations(websitePage, ({ many , one }) => ({
  content: many(websitePageContent),
  website: one(website, { fields: [websitePage.websiteId], references: [website.id] }),
}))

export const websitePageContent = pgTable("website_page_content", {
  id: text("id").primaryKey(),
  websitePageId: text("website_page_id")
    .notNull()
    .references(() => websitePage.id),
  content: text("content"),
});

export const websitePageContentRelations = relations(websitePageContent, ({ one }) => ({
  websitePage: one(websitePage, { fields: [websitePageContent.websitePageId], references: [websitePage.id] }),
}));

export const player = pgTable("player", {
  id: text("id").primaryKey(),
  websiteId: text("website_id")
    .notNull()
    .references(() => website.id),
  name: text("name"),
  slug: text("slug"),
  number: integer("number"),
  position: text("position"),
  joinDate: date("join_date").notNull(),
  leaveDate: date("leave_date"),
});