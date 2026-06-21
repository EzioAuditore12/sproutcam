import { eq, inArray } from "drizzle-orm";
import type { AnySQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";

import { db } from "@/db";
import { pullChangesApi } from "@/features/sync/api/pull-changes.api";
import { useSettingStore } from "@/store/settings";

import { missionsTable } from "@/db/tables/mission.table";
import { badgesTable } from "@/db/tables/badge.table";
import { userMissionsTable } from "@/db/tables/user-mission.table";
import { userBadgesTable } from "@/db/tables/user-badge.table";

type TransactionType = Parameters<Parameters<typeof db.transaction>[0]>[0];

export class SyncDatabase {
  private readonly database = db;

  private readonly missionsTable = missionsTable;
  private readonly badgesTable = badgesTable;
  private readonly userMissionsTable = userMissionsTable;
  private readonly userBadgesTable = userBadgesTable;

  public async pullChanges() {
    const lastSyncedAt = this.getLastSyncedAt();

    const { changes, timestamp } = await pullChangesApi({ lastSyncedAt });

    await this.database.transaction(async (transaction) => {
      if (changes.missions) {
        await this.synchronizeRecords(transaction, this.missionsTable, changes.missions);
      }

      if (changes.badges) {
        await this.synchronizeRecords(transaction, this.badgesTable, changes.badges);
      }

      if (changes.userMissions) {
        await this.synchronizeRecords(transaction, this.userMissionsTable, changes.userMissions);
      }

      if (changes.userBadges) {
        await this.synchronizeRecords(transaction, this.userBadgesTable, changes.userBadges);
      }

      this.updateLastSyncedAt(timestamp);
    });
  }

  private async synchronizeRecords<
    TTable extends SQLiteTable & { id: AnySQLiteColumn<{ data: string }> },
  >(
    transaction: TransactionType,
    table: TTable,
    data: { created: any[]; updated: any[]; deleted: unknown[] }
  ): Promise<void> {
    await this.insertNewRecords(transaction, table, data.created);
    await this.updateExistingRecords(transaction, table, data.updated);
    await this.deleteRecords(transaction, table, data.deleted);
  }

  private async insertNewRecords<
    TTable extends SQLiteTable & { id: AnySQLiteColumn<{ data: string }> },
  >(transaction: TransactionType, table: TTable, data: any[]): Promise<void> {
    if (!this.isArrayEmpty(data)) {
      const existingRecords = await this.findExistingIds(
        transaction,
        table,
        data.map((d) => d.id)
      );

      const existingIds = new Set(existingRecords.map((u) => u.id));

      const newData = data.filter((u) => !existingIds.has(u.id));

      if (!this.isArrayEmpty(newData)) {
        await transaction.insert(table).values(newData);
      }
    }
  }

  private async updateExistingRecords<
    TTable extends SQLiteTable & { id: AnySQLiteColumn<{ data: string }> },
  >(transaction: TransactionType, table: TTable, data: any[]): Promise<void> {
    if (!this.isArrayEmpty(data)) {
      for (const record of data) {
        await transaction.update(table).set(record).where(eq(table.id, record.id));
      }
    }
  }

  private async deleteRecords<
    TTable extends SQLiteTable & { id: AnySQLiteColumn<{ data: string }> },
  >(transaction: TransactionType, table: TTable, deletedIds: unknown[]): Promise<void> {
    const ids = deletedIds as string[];
    if (!this.isArrayEmpty(ids)) {
      await transaction.delete(table).where(inArray(table.id, ids));
    }
  }

  private async findExistingIds<
    TTable extends SQLiteTable & { id: AnySQLiteColumn<{ data: string }> },
  >(transaction: TransactionType, table: TTable, ids: string[]) {
    if (this.isArrayEmpty(ids)) return [];

    return await transaction.select({ id: table.id }).from(table).where(inArray(table.id, ids));
  }

  private getLastSyncedAt(): Date | undefined {
    return useSettingStore.getState().getLastSyncedAt();
  }

  private updateLastSyncedAt(timestamp: Date): void {
    useSettingStore.getState().setLastSyncedAt(timestamp);
  }

  private isArrayEmpty(data: any[]): boolean {
    return data.length === 0;
  }
}

export const syncDatabase = new SyncDatabase();
