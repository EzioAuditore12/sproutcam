import { DrizzleAppSchema } from "@powersync/drizzle-driver";

import { badgesTable } from "./tables/badge.table";
import { missionsTable } from "./tables/mission.table";
import { userBadgesTable } from "./tables/user-badge.table";
import { userMissionsTable } from "./tables/user-mission.table";

export const drizzleSchema = {
  missionsTable,
  badgesTable,
  userMissionsTable,
  userBadgesTable,
};

export const AppSchema = new DrizzleAppSchema(drizzleSchema);
