CREATE TABLE "feedbacks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar,
	"text" text,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "feedbacks_email_unique" UNIQUE("email")
);
