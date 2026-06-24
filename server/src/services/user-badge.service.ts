import { and, eq, gt } from 'drizzle-orm';

import { db } from '@/db';
import {
  userBadge,
  type InsertUserBadge,
  type UpdateUserBadge,
  type UserBadge,
} from '@/db/schemas/user-badge.schema';

export class UserBadgeService {
  private readonly database = db;
  private readonly table = userBadge;

  public async create(insertUserBadge: InsertUserBadge): Promise<UserBadge> {
    return await this.database
      .insert(this.table)
      .values(insertUserBadge)
      .returning()
      .then((res) => res[0]);
  }

  public async createMany(
    insertUserBadges: InsertUserBadge[],
  ): Promise<UserBadge[]> {
    return await this.database
      .insert(this.table)
      .values(insertUserBadges)
      .returning();
  }

  public async getUpdatedSince(
    userId: string,
    lastSyncedAt?: Date,
  ): Promise<UserBadge[]> {
    if (!lastSyncedAt) {
      return await this.database
        .select()
        .from(this.table)
        .where(eq(this.table.userId, userId));
    }
    // user_badge doesn't have updatedAt. We can use earnedAt as a proxy for created
    return await this.database
      .select()
      .from(this.table)
      .where(
        and(
          eq(this.table.userId, userId),
          gt(this.table.earnedAt, lastSyncedAt),
        ),
      );
  }

  public async delete(userId: string, badgeId: string) {
    return await this.database
      .delete(this.table)
      .where(
        and(eq(this.table.userId, userId), eq(this.table.badgeId, badgeId)),
      );
  }
}

export const userBadgeService = new UserBadgeService();
