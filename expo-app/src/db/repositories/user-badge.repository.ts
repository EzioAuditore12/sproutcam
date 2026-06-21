import { db, type DbType } from "@/db";
import { eq, inArray } from "drizzle-orm";
import { type InsertUserBadge, type UserBadge, userBadgesTable } from "../tables/user-badge.table";

export class UserBadgeRepository {
  private readonly database: DbType;
  private readonly table = userBadgesTable;

  constructor(database: DbType = db) {
    this.database = database;
  }

  public async create(insertUserBadge: InsertUserBadge): Promise<UserBadge> {
    return await this.database.insert(this.table).values(insertUserBadge).returning().get();
  }

  public async createMultiple(insertUserBadges: InsertUserBadge[]): Promise<void> {
    if (insertUserBadges.length === 0) return;
    await this.database.insert(this.table).values(insertUserBadges);
  }

  public async get(id: string): Promise<UserBadge | undefined> {
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

  public async getManyById(ids: string[]): Promise<UserBadge[]> {
    if (ids.length === 0) return [];
    return await this.database.select().from(this.table).where(inArray(this.table.id, ids)).all();
  }

  public async createMany(userBadges: InsertUserBadge[]): Promise<UserBadge[]> {
    if (userBadges.length === 0) return [];
    return await this.database.insert(this.table).values(userBadges).returning().all();
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

export const userBadgeRepository = new UserBadgeRepository();
