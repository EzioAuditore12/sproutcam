import { db, type DbType } from "@/db";
import { count, eq, inArray } from "drizzle-orm";
import { type InsertBadge, type Badge, badgesTable } from "../tables/badge.table";

export class BadgeRepository {
  private readonly database: DbType;
  private readonly table = badgesTable;

  constructor(database: DbType = db) {
    this.database = database;
  }

  public async create(insertBadge: InsertBadge): Promise<Badge> {
    return await this.database.insert(this.table).values(insertBadge).returning().get();
  }

  public async createMany(insertBadges: InsertBadge[]): Promise<void> {
    if (insertBadges.length === 0) return;
    await this.database.insert(this.table).values(insertBadges);
  }

  public async get(id: string): Promise<Badge | undefined> {
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

  public async getManyById(ids: string[]): Promise<Badge[]> {
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

  public async getManyNamesById(ids: string[]): Promise<string[]> {
    if (ids.length === 0) return [];
    const result = await this.database
      .select({ name: this.table.name })
      .from(this.table)
      .where(inArray(this.table.id, ids))
      .all();

    const foundNames = result.map((c) => c.name);

    return foundNames;
  }

  public async count(): Promise<number> {
    return await this.database
      .select({ count: count() })
      .from(this.table)
      .then((res) => res[0].count);
  }
}

export const badgeRepository = new BadgeRepository();
