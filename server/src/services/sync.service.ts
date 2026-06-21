import { badgeService } from "./badge.service";
import { missionService } from "./mission.service";
import { userBadgeService } from "./user-badge.service";
import { userMissionService } from "./user-mission.service";

import type { PushChanges } from "@/validators/sync/push-changes";
import type { PullChangesResponse } from "@/validators/sync/pull-changes";
import { decodeId } from "@/utils/decode-id.util";

export class SyncService {
  private readonly missionService = missionService;
  private readonly badgeService = badgeService;

  private readonly userMissionService = userMissionService;
  private readonly userBadgeService = userBadgeService;

  /**
   * Applies client-side changes to the server.
   */
  async pushChanges(userId: string, changes: PushChanges) {
    if (changes.userMissions) {
      await this.applyUserMissionChanges(userId, changes.userMissions);
    }
    if (changes.userBadges) {
      await this.applyUserBadgeChanges(userId, changes.userBadges);
    }
  }

  /**
   * Returns all changes since the client's last successful sync.
   */
  async pullChanges(userId: string, lastSyncedAt?: Date): Promise<PullChangesResponse> {
    const [missions, badges, userMissions, userBadges] = await Promise.all([
      this.getMissionChanges(lastSyncedAt),
      this.getBadgeChanges(lastSyncedAt),
      this.getUserMissionChanges(userId, lastSyncedAt),
      this.getUserBadgeChanges(userId, lastSyncedAt),
    ]);

    return {
      changes: {
        missions,
        badges,
        userMissions,
        userBadges,
      },
      timestamp: new Date(),
    };
  }

  // ---------- Private ----------

  private async applyUserMissionChanges(userId: string, changes: NonNullable<PushChanges["userMissions"]>) {
    if (changes.created.length > 0) {
      // Ensure userId matches the authenticated user and convert missionId to BigInt
      const created = changes.created.map((c) => ({ ...c, userId, missionId: decodeId(c.missionId) }));
      await this.userMissionService.createMany(created);
    }
    if (changes.updated.length > 0) {
      for (const update of changes.updated) {
        if (update.missionId) {
          const missionId = decodeId(update.missionId);
          await this.userMissionService.update(userId, missionId, { ...update, missionId });
        }
      }
    }
    if (changes.deleted.length > 0) {
      for (const id of changes.deleted) {
        await this.userMissionService.delete(userId, decodeId(id));
      }
    }
  }

  private async applyUserBadgeChanges(userId: string, changes: NonNullable<PushChanges["userBadges"]>) {
    if (changes.created.length > 0) {
      const created = changes.created.map((c) => ({ ...c, userId }));
      await this.userBadgeService.createMany(created);
    }
    if (changes.updated.length > 0) {
      // Badges don't have updateable fields currently
    }
    if (changes.deleted.length > 0) {
      for (const id of changes.deleted) {
        await this.userBadgeService.delete(userId, String(id));
      }
    }
  }

  private async getMissionChanges(lastSyncedAt?: Date) {
    const updated = lastSyncedAt
      ? await this.missionService.getUpdatedSince(lastSyncedAt)
      : await this.missionService.getAll();

    return {
      created: !lastSyncedAt ? updated : [],
      updated: lastSyncedAt ? updated : [],
      deleted: [], // Add tombstone logic if missions can be deleted
    };
  }

  private async getBadgeChanges(lastSyncedAt?: Date) {
    const updated = lastSyncedAt
      ? await this.badgeService.getUpdatedSince(lastSyncedAt)
      : await this.badgeService.getAll();

    return {
      created: !lastSyncedAt ? updated : [],
      updated: lastSyncedAt ? updated : [],
      deleted: [], // Add tombstone logic if badges can be deleted
    };
  }

  private async getUserMissionChanges(userId: string, lastSyncedAt?: Date) {
    const updated = await this.userMissionService.getUpdatedSince(userId, lastSyncedAt);

    return {
      created: !lastSyncedAt ? updated : [],
      updated: lastSyncedAt ? updated : [],
      deleted: [], // Handle tombstone tracking if needed
    };
  }

  private async getUserBadgeChanges(userId: string, lastSyncedAt?: Date) {
    const updated = await this.userBadgeService.getUpdatedSince(userId, lastSyncedAt);

    return {
      created: !lastSyncedAt ? updated : [],
      updated: lastSyncedAt ? updated : [],
      deleted: [], // Handle tombstone tracking if needed
    };
  }
}

export const syncService = new SyncService();
