import { gt } from 'drizzle-orm';

import { db } from '@/db';
import { badge, type Badge, type InsertBadge } from '@/db/schemas/badge.schema';

export class BadgeService {
  private readonly database = db;
  private readonly table = badge;

  public async create(insertBadge: InsertBadge): Promise<Badge> {
    return await this.database
      .insert(this.table)
      .values(insertBadge)
      .returning()
      .then((res) => res[0]);
  }

  public async createMany(insertBadges: InsertBadge[]): Promise<Badge[]> {
    return await this.database
      .insert(this.table)
      .values(insertBadges)
      .returning();
  }

  public async getAll(): Promise<Badge[]> {
    return await this.database.select().from(this.table);
  }

  public async getUpdatedSince(lastSyncedAt: Date): Promise<Badge[]> {
    return await this.database
      .select()
      .from(this.table)
      .where(gt(this.table.updatedAt, lastSyncedAt));
  }
}

export const badgeService = new BadgeService();
