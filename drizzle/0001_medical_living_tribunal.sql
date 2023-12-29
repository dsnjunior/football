CREATE TABLE IF NOT EXISTS "club" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"slug" text,
	"description" text,
	"founded" date,
	"crest_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"name" text,
	"slug" text,
	"number" integer,
	"position" text,
	"join_date" date NOT NULL,
	"leave_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "website" (
	"id" text PRIMARY KEY NOT NULL,
	"club_id" text NOT NULL,
	"name" text,
	"url" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "website_page" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"name" text,
	"url" text,
	"route" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "website_page_content" (
	"id" text PRIMARY KEY NOT NULL,
	"website_page_id" text NOT NULL,
	"content" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player" ADD CONSTRAINT "player_website_id_website_id_fk" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "website" ADD CONSTRAINT "website_club_id_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "website_page" ADD CONSTRAINT "website_page_website_id_website_id_fk" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "website_page_content" ADD CONSTRAINT "website_page_content_website_page_id_website_page_id_fk" FOREIGN KEY ("website_page_id") REFERENCES "website_page"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
