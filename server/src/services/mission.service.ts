import { db } from "@/db";
import {
  type InsertMission,
  type Mission,
  mission,
} from "@/db/schemas/mission.schema";
import { eq } from "drizzle-orm";

export class MissionService {
  private readonly database = db;
  private readonly table = mission;

  public async create(insertMission: InsertMission): Promise<Mission> {
    return await this.database
      .insert(this.table)
      .values(insertMission)
      .returning()
      .then((res) => res[0]);
  }

  public async createMany(insertMissions: InsertMission[]): Promise<Mission[]> {
    return await this.database
      .insert(this.table)
      .values(insertMissions)
      .returning();
  }

  public async findById(id: bigint): Promise<Mission | null> {
    return await this.database
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .then((res) => res[0] ?? null);
  }
}

export const missionService = new MissionService();
