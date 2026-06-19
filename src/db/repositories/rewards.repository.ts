import { db, type DbType } from "@/db";
import { eq, inArray } from "drizzle-orm";
import { type InsertReward, type Reward, rewardsTable } from "../tables/rewards.table";

export class RewardRepository {
  private readonly database: DbType;
  private readonly table = rewardsTable;

  constructor(database: DbType = db) {
    this.database = database;
  }

  public async create(insertReward: InsertReward): Promise<Reward> {
    return await this.database.insert(this.table).values(insertReward).returning().get();
  }

  public async createMultiple(insertRewards: InsertReward[]): Promise<void> {
    if (insertRewards.length === 0) return;
    await this.database.insert(this.table).values(insertRewards);
  }

  public async get(id: string): Promise<Reward | undefined> {
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

  public async getManyById(ids: string[]): Promise<Reward[]> {
    if (ids.length === 0) return [];
    return await this.database.select().from(this.table).where(inArray(this.table.id, ids)).all();
  }

  public async createMany(rewards: InsertReward[]): Promise<Reward[]> {
    if (rewards.length === 0) return [];
    return await this.database.insert(this.table).values(rewards).returning().all();
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

  public async getManyBadgeNamesById(ids: string[]): Promise<(string | null)[]> {
    if (ids.length === 0) return [];
    const result = await this.database
      .select({ badgeName: this.table.badgeName })
      .from(this.table)
      .where(inArray(this.table.id, ids))
      .all();

    const foundNames = result.map((c) => c.badgeName);

    return foundNames;
  }
}

export const rewardRepository = new RewardRepository();
