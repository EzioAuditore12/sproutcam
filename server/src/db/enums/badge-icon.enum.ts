import { pgEnum } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const badgeIcon = [
  'book-detective',
  'camera-rookie',
  'flower-finder',
  'leaf-collector',
  'little-explorer',
  'mission-champion',
  'rock-discoverer',
  'shape-spotter',
  'star-collector',
  'toy-hunter',
  'tree-explorer',
  'water-bottle-hero',
] as const;

export const badgeIconEnum = pgEnum('badge_icon', badgeIcon);

export const badgeIconEnumSchema = z.enum(badgeIcon);

export type BadgeIcon = z.infer<typeof badgeIconEnumSchema>;
