import { z } from "zod";
import { userMissionSchema } from "@/db/schemas/user_mission.schema";

export const subscribeMissionResponseSchema = userMissionSchema
  .omit({
    missionId: true,
  })
  .extend({
    missionId: z.coerce.string(),
  });

export type SubscribeMissionResponse = z.infer<
  typeof subscribeMissionResponseSchema
>;
