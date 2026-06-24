import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { useLiveQuery } from "@/db/hooks/use-live-query";
import { badgesTable } from "@/db/tables/badge.table";
import { userBadgesTable } from "@/db/tables/user-badge.table";

export function useLatestBadge() {
  const { data } = useLiveQuery(
    db
      .select({
        name: badgesTable.name,
        icon: badgesTable.icon,
      })
      .from(userBadgesTable)
      .innerJoin(badgesTable, eq(userBadgesTable.id, badgesTable.id))
      .orderBy(desc(userBadgesTable.earnedAt))
      .limit(1)
  );

  return {
    latestBadge: data?.[0] || null,
  };
}
