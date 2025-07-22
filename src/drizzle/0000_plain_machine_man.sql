CREATE TYPE "public"."transaction_currency" AS ENUM('USD', 'RUB');--> statement-breakpoint
CREATE TYPE "public"."transaction_state" AS ENUM('pending', 'success', 'failed');--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"state" "transaction_state" NOT NULL,
	"currency" "transaction_currency" NOT NULL,
	"url" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"transactionId" uuid NOT NULL,
	"ipVersion" varchar NOT NULL,
	"usageType" varchar NOT NULL,
	"function" varchar NOT NULL,
	"protocol" varchar NOT NULL,
	"tariff" varchar NOT NULL,
	"tcpConnectionsLimit" integer NOT NULL,
	"whitelistedIpLimit" integer NOT NULL,
	"subnet" varchar NOT NULL,
	"location" varchar NOT NULL,
	"permalink" text NOT NULL,
	"expiresAt" varchar,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keys" ADD CONSTRAINT "keys_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keys" ADD CONSTRAINT "keys_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;