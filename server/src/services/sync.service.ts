import { decodeId } from '@/utils/decode-id.util';
import type { PullChangesResponse } from '@/validators/sync/pull-changes';
import type { PushChanges } from '@/validators/sync/push-changes';
import { badgeService } from './badge.service';
import { missionService } from './mission.service';
import { userBadgeService } from './user-badge.service';
import { userMissionService } from './user-mission.service';

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
  async pullChanges(
    userId: string,
    lastSyncedAt?: Date,
  ): Promise<PullChangesResponse> {
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

  private async applyUserMissionChanges(
    userId: string,
    changes: NonNullable<PushChanges['userMissions']>,
  ) {
    if (changes.created.length > 0) {
      const created = changes.created.map((c) => {
        const { id, ...rest } = c;
        return { ...rest, userId, missionId: decodeId(id) };
      });
      await this.userMissionService.createMany(created);
    }
    if (changes.updated.length > 0) {
      for (const update of changes.updated) {
        const { id, ...rest } = update;
        if (id) {
          const missionId = decodeId(id);
          await this.userMissionService.update(userId, missionId, {
            ...rest,
            missionId,
          });
        }
      }
    }
    if (changes.deleted.length > 0) {
      for (const id of changes.deleted) {
        await this.userMissionService.delete(userId, decodeId(id));
      }
    }
  }

  private async applyUserBadgeChanges(
    userId: string,
    changes: NonNullable<PushChanges['userBadges']>,
  ) {
    if (changes.created.length > 0) {
      const created = changes.created.map((c) => {
        const { id, ...rest } = c;
        return { ...rest, userId, badgeId: id };
      });
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

    const mapped = updated.map((m) => ({ ...m, id: String(m.id) }));

    return {
      created: !lastSyncedAt ? mapped : [],
      updated: lastSyncedAt ? mapped : [],
      deleted: [], // Add tombstone logic if missions can be deleted
    };
  }

  private async getBadgeChanges(lastSyncedAt?: Date) {
    const updated = lastSyncedAt
      ? await this.badgeService.getUpdatedSince(lastSyncedAt)
      : await this.badgeService.getAll();

    const mapped = updated.map((b) => ({ ...b, id: String(b.id) }));

    return {
      created: !lastSyncedAt ? mapped : [],
      updated: lastSyncedAt ? mapped : [],
      deleted: [], // Add tombstone logic if badges can be deleted
    };
  }

  private async getUserMissionChanges(userId: string, lastSyncedAt?: Date) {
    const updated = await this.userMissionService.getUpdatedSince(
      userId,
      lastSyncedAt,
    );
    const mapped = updated.map((u) => {
      const { missionId, ...rest } = u as any;
      return { ...rest, id: String(missionId) };
    });

    return {
      created: !lastSyncedAt ? mapped : [],
      updated: lastSyncedAt ? mapped : [],
      deleted: [], // Handle tombstone tracking if needed
    };
  }

  private async getUserBadgeChanges(userId: string, lastSyncedAt?: Date) {
    const updated = await this.userBadgeService.getUpdatedSince(
      userId,
      lastSyncedAt,
    );
    const mapped = updated.map((u) => {
      const { badgeId, ...rest } = u as any;
      return { ...rest, id: String(badgeId) };
    });

    return {
      created: !lastSyncedAt ? mapped : [],
      updated: lastSyncedAt ? mapped : [],
      deleted: [], // Handle tombstone tracking if needed
    };
  }
}

export const syncService = new SyncService();
