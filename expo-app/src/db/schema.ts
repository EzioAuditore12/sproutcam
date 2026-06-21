import { DrizzleAppSchema } from "@powersync/drizzle-driver";

import { missionsTable } from "./tables/mission.table";
import { badgesTable } from "./tables/badge.table";
import { userMissionsTable } from "./tables/user-mission.table";
import { userBadgesTable } from "./tables/user-badge.table";

export const drizzleSchema = {
  missionsTable,
  badgesTable,
  userMissionsTable,
  userBadgesTable,
};

export const AppSchema = new DrizzleAppSchema(drizzleSchema);
