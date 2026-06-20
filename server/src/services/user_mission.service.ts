import { db } from "@/db";

import {
  type InsertUserMission,
  type UserMission,
  userMission,
} from "@/db/schemas/user_mission.schema";

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
    insertUserMissions: InsertUserMission,
  ): Promise<UserMission[]> {
    return await this.database
      .insert(this.table)
      .values(insertUserMissions)
      .returning();
  }
}

export const userMissionService = new UserMissionService();
