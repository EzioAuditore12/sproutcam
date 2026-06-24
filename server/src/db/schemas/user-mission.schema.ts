import {
  bigint,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

import { user } from './auth.schema';
import { mission } from './mission.schema';

export const USER_MISSIONS_TABLE_NAME = 'user_missions';

export const userMission = pgTable(
  USER_MISSIONS_TABLE_NAME,
  {
    userId: text('user_id')
      .references(() => user.id, { onDelete: 'cascade' })
      .notNull(),

    missionId: bigint('mission_id', { mode: 'bigint' })
      .references(() => mission.id, { onDelete: 'cascade' })
      .notNull(),

    progress: integer('progress').notNull().default(0),

    claimedAt: timestamp('claimed_at'),

    completedAt: timestamp('completed_at'),

    createdAt: timestamp('created_at').defaultNow().notNull(),

    updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
  },
  (t) => [
    primaryKey({
      columns: [t.userId, t.missionId],
    }),
    index('user_missions_mission_id_idx').on(t.missionId),
    index('user_missions_user_updated_at_idx').on(t.userId, t.updatedAt),
  ],
);

export const userMissionSchema = createSelectSchema(userMission);
export const insertUserMissionSchema = createInsertSchema(userMission);
export const updateUserMissionSchema = createUpdateSchema(userMission);

export type UserMission = z.infer<typeof userMissionSchema>;
export type InsertUserMission = z.infer<typeof insertUserMissionSchema>;
export type UpdateUserMission = z.infer<typeof updateUserMissionSchema>;
