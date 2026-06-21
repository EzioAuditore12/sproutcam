CREATE INDEX "badges_updated_at_idx" ON "badges" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "missions_updated_at_idx" ON "missions" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "user_badges_user_earned_at_idx" ON "user_badges" USING btree ("user_id","earned_at");--> statement-breakpoint
CREATE INDEX "user_missions_user_updated_at_idx" ON "user_missions" USING btree ("user_id","updated_at");