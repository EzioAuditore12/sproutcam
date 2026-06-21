import { db, type DbType } from "@/db";
import { eq, inArray } from "drizzle-orm";
import {
  type InsertUserMission,
  type UserMission,
  userMissionsTable,
} from "../tables/user-mission.table";

export class UserMissionRepository {
  private readonly database: DbType;
  private readonly table = userMissionsTable;

  constructor(database: DbType = db) {
    this.database = database;
  }

  public async create(insertUserMission: InsertUserMission): Promise<UserMission> {
    return await this.database.insert(this.table).values(insertUserMission).returning().get();
  }

  public async createMultiple(insertUserMissions: InsertUserMission[]): Promise<void> {
    if (insertUserMissions.length === 0) return;
    await this.database.insert(this.table).values(insertUserMissions);
  }

  public async get(id: string): Promise<UserMission | undefined> {
    return await this.database.select().from(this.table).where(eq(this.table.id, id)).get();
  }

  public async isExisting(id: string): Promise<boolean> {
    const result = await this.database
      .select({ id: this.table.id })
      .from(this.table)
      .where(eq(this.table.id, id))
      .get();

    return !!result;
  }

  public async getManyById(ids: string[]): Promise<UserMission[]> {
    if (ids.length === 0) return [];
    return await this.database.select().from(this.table).where(inArray(this.table.id, ids)).all();
  }

  public async createMany(userMissions: InsertUserMission[]): Promise<UserMission[]> {
    if (userMissions.length === 0) return [];
    return await this.database.insert(this.table).values(userMissions).returning().all();
  }

  public async areExistingManyById(ids: string[]): Promise<string[]> {
    if (ids.length === 0) return [];
    const result = await this.database
      .select({ id: this.table.id })
      .from(this.table)
      .where(inArray(this.table.id, ids))
      .all();

    return result.map((c) => c.id);
  }
}

export const userMissionRepository = new UserMissionRepository();
