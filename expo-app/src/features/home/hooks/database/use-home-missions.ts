import { eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import { useLiveQuery } from "@/db/hooks/use-live-query";
import { missionsTable } from "@/db/tables/mission.table";
import { userMissionsTable } from "@/db/tables/user-mission.table";

export function useTodayMission() {
  const { data, isLoading, error } = useLiveQuery(
    db
      .select({
        id: missionsTable.id,
        title: missionsTable.title,
        description: missionsTable.description,
        rewardStars: missionsTable.rewardStars,
      })
      .from(missionsTable)
      .leftJoin(userMissionsTable, eq(missionsTable.id, userMissionsTable.id))
      .where(isNull(userMissionsTable.completedAt))
      .limit(1)
  );

  return {
    mission: data?.[0] || null,
    isLoading,
    error,
  };
}
