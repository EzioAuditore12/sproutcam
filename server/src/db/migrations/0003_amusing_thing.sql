CREATE TABLE "user_missions" (
	"user_id" text NOT NULL,
	"mission_id" bigint NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp,
	"claimed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "user_missions_user_id_mission_id_pk" PRIMARY KEY("user_id","mission_id")
);
--> statement-breakpoint
ALTER TABLE "missions" DROP CONSTRAINT "missions_user_id_user_id_fk";
--> statement-breakpoint
DROP INDEX "mission_user_id_idx";--> statement-breakpoint
ALTER TABLE "user_missions" ADD CONSTRAINT "user_missions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_missions" ADD CONSTRAINT "user_missions_mission_id_missions_id_fk" FOREIGN KEY ("mission_id") REFERENCES "public"."missions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_missions_user_id_idx" ON "user_missions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_missions_mission_id_idx" ON "user_missions" USING btree ("mission_id");--> statement-breakpoint
ALTER TABLE "missions" DROP COLUMN "user_id";