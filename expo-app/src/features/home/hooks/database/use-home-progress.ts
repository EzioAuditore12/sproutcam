import { isNotNull, eq } from "drizzle-orm";
import { db } from "@/db";
import { useLiveQuery } from "@/db/hooks/use-live-query";
import { missionsTable } from "@/db/tables/mission.table";
import { userMissionsTable } from "@/db/tables/user-mission.table";

export function useHomeProgress() {
  const { data: missions } = useLiveQuery(db.select({ id: missionsTable.id }).from(missionsTable));

  const { data: completedMissions } = useLiveQuery(
    db
      .select({ id: userMissionsTable.id })
      .from(userMissionsTable)
      .where(isNotNull(userMissionsTable.completedAt))
  );

  const total = missions?.length || 0;
  const completed = completedMissions?.length || 0;

  return {
    total,
    completed,
    progressText: `${completed} of ${total} missions completed`,
  };
}

export function useTotalStars() {
  const { data } = useLiveQuery(
    db
      .select({ rewardStars: missionsTable.rewardStars })
      .from(missionsTable)
      .innerJoin(userMissionsTable, eq(missionsTable.id, userMissionsTable.id))
      .where(isNotNull(userMissionsTable.completedAt))
  );

  const totalStars = data?.reduce((acc, curr) => acc + curr.rewardStars, 0) || 0;

  return { totalStars };
}
