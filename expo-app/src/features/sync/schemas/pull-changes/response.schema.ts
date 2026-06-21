import { type } from "arktype";
import { missionSchema } from "@/db/tables/mission.table";
import { badgeSchema } from "@/db/tables/badge.table";
import { userMissionSchema } from "@/db/tables/user-mission.table";
import { userBadgeSchema } from "@/db/tables/user-badge.table";

import { tableChangesSchema } from "../table-change.schema";

const dateTransformer = type("string.date.iso").pipe((val) => new Date(val));
const nullableDateTransformer = type("string.date.iso | null").pipe((val) =>
  val ? new Date(val) : null
);

const pullMissionSchema = missionSchema.omit("createdAt", "updatedAt").and({
  createdAt: dateTransformer,
  updatedAt: dateTransformer,
});

const pullBadgeSchema = badgeSchema.omit("createdAt", "updatedAt").and({
  createdAt: dateTransformer,
  updatedAt: dateTransformer,
});

const pullUserMissionSchema = userMissionSchema
  .omit("createdAt", "updatedAt", "claimedAt", "completedAt")
  .and({
    createdAt: dateTransformer,
    updatedAt: dateTransformer,
    claimedAt: nullableDateTransformer,
    completedAt: nullableDateTransformer,
  });

const pullUserBadgeSchema = userBadgeSchema.omit("earnedAt").and({
  earnedAt: dateTransformer,
});

export const pullChangesResponseSchema = type({
  changes: {
    "missions?": tableChangesSchema(pullMissionSchema),
    "badges?": tableChangesSchema(pullBadgeSchema),
    "userMissions?": tableChangesSchema(pullUserMissionSchema),
    "userBadges?": tableChangesSchema(pullUserBadgeSchema),
  },
  timestamp: dateTransformer,
});

export type PullChangesResponse = typeof pullChangesResponseSchema.infer;
