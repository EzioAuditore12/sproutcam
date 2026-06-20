import { db, type DbType } from "@/db";
import { eq, inArray } from "drizzle-orm";
import {
  type InsertMissionProgress,
  type MissionProgress,
  missionProgressTable,
} from "../tables/mission-progress.table";

export class MissionProgressRepository {
  private readonly database: DbType;
  private readonly table = missionProgressTable;

  constructor(database: DbType = db) {
    this.database = database;
  }

  public async create(insertMissionProgress: InsertMissionProgress): Promise<MissionProgress> {
    return await this.database.insert(this.table).values(insertMissionProgress).returning().get();
  }

  public async createMultiple(insertMissionProgresses: InsertMissionProgress[]): Promise<void> {
    if (insertMissionProgresses.length === 0) return;
    await this.database.insert(this.table).values(insertMissionProgresses);
  }

  public async get(id: string): Promise<MissionProgress | undefined> {
    return await this.database.select().from(this.table).where(eq(this.table.id, id)).get();
  }

  public async isExisting(id: string): Promise<boolean> {
    const result = await this.database
      .select({ id: this.table.id })
      .from(this.table)
      .where(eq(this.table.id, id))
      .get();

    if (!result) return false;

    return true;
  }

  public async getManyById(ids: string[]): Promise<MissionProgress[]> {
    if (ids.length === 0) return [];
    return await this.database.select().from(this.table).where(inArray(this.table.id, ids)).all();
  }

  public async createMany(missionProgresses: InsertMissionProgress[]): Promise<MissionProgress[]> {
    if (missionProgresses.length === 0) return [];
    return await this.database.insert(this.table).values(missionProgresses).returning().all();
  }

  public async areExistingManyById(ids: string[]): Promise<string[]> {
    if (ids.length === 0) return [];
    const result = await this.database
      .select({ id: this.table.id })
      .from(this.table)
      .where(inArray(this.table.id, ids))
      .all();

    const foundIds = result.map((c) => c.id);

    return foundIds;
  }
}

export const missionProgressRepository = new MissionProgressRepository();
