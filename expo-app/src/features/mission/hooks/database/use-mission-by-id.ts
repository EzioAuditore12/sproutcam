import { db } from "@/db";
import { useLiveQuery } from "@/db/hooks/use-live-query";
import { missionsTable } from "@/db/tables/mission.table";
import { userMissionsTable } from "@/db/tables/user-mission.table";
import { eq } from "drizzle-orm";

export function useMissionById(id: string) {
  const { data, isLoading, error } = useLiveQuery(
    db
      .select({
        id: missionsTable.id,
        title: missionsTable.title,
        description: missionsTable.description,
        targetObject: missionsTable.targetObject,
        requiredCount: missionsTable.requiredCount,
        rewardStars: missionsTable.rewardStars,
        progress: userMissionsTable.progress,
        completedAt: userMissionsTable.completedAt,
      })
      .from(missionsTable)
      .leftJoin(userMissionsTable, eq(missionsTable.id, userMissionsTable.id))
      .where(eq(missionsTable.id, id))
      .limit(1)
  );

  return {
    mission: data?.[0],
    isLoading,
    error,
  };
}
