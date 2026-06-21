import { db } from "@/db";
import { useLiveQuery } from "@/db/hooks/use-live-query";
import { missionsTable } from "@/db/tables/mission.table";

export const useGetMissions = () => {
  return useLiveQuery(db.select().from(missionsTable));
};
