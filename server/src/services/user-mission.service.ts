import { and, eq, gt } from 'drizzle-orm';

import { db } from '@/db';
import {
  userMission,
  type InsertUserMission,
  type UpdateUserMission,
  type UserMission,
} from '@/db/schemas/user-mission.schema';

export class UserMissionService {
  private readonly database = db;
  private readonly table = userMission;

  public async create(
    insertUserMission: InsertUserMission,
  ): Promise<UserMission> {
    return await this.database
      .insert(this.table)
      .values(insertUserMission)
      .returning()
      .then((res) => res[0]);
  }

  public async createMany(
    insertUserMissions: InsertUserMission[],
  ): Promise<UserMission[]> {
    return await this.database
      .insert(this.table)
      .values(insertUserMissions)
      .returning();
  }

  public async getUpdatedSince(
    userId: string,
    lastSyncedAt?: Date,
  ): Promise<UserMission[]> {
    if (!lastSyncedAt) {
      return await this.database
        .select()
        .from(this.table)
        .where(eq(this.table.userId, userId));
    }

    return await this.database
      .select()
      .from(this.table)
      .where(
        and(
          eq(this.table.userId, userId),
          gt(this.table.updatedAt, lastSyncedAt),
        ),
      );
  }

  public async update(
    userId: string,
    missionId: bigint,
    updateData: UpdateUserMission,
  ) {
    return await this.database
      .update(this.table)
      .set(updateData)
      .where(
        and(eq(this.table.userId, userId), eq(this.table.missionId, missionId)),
      );
  }

  public async delete(userId: string, missionId: bigint) {
    return await this.database
      .delete(this.table)
      .where(
        and(eq(this.table.userId, userId), eq(this.table.missionId, missionId)),
      );
  }
}

export const userMissionService = new UserMissionService();
