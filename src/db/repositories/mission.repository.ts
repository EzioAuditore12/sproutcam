import { db, type DbType } from "@/db";
import { eq, inArray } from "drizzle-orm";
import { type InsertMission, type Mission, missionsTable } from "../tables/mission.table";

export class MissionRepository {
  private readonly database: DbType;
  private readonly table = missionsTable;

  constructor(database: DbType = db) {
    this.database = database;
  }

  public async create(insertMission: InsertMission): Promise<Mission> {
    return await this.database.insert(this.table).values(insertMission).returning().get();
  }

  public async createMany(insertMissions: InsertMission[]): Promise<void> {
    if (insertMissions.length === 0) return;
    await this.database.insert(this.table).values(insertMissions);
  }

  public async get(id: string): Promise<Mission | undefined> {
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

  public async getManyById(ids: string[]): Promise<Mission[]> {
    if (ids.length === 0) return [];
    return await this.database.select().from(this.table).where(inArray(this.table.id, ids)).all();
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

  public async getManyTitlesById(ids: string[]): Promise<string[]> {
    if (ids.length === 0) return [];
    const result = await this.database
      .select({ title: this.table.title })
      .from(this.table)
      .where(inArray(this.table.id, ids))
      .all();

    const foundTitles = result.map((c) => c.title);

    return foundTitles;
  }
}

export const missionRepository = new MissionRepository();
