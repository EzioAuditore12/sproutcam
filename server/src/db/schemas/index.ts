import * as authSchema from './auth.schema';
import { badge } from './badge.schema';
import { mission } from './mission.schema';
import { userBadge } from './user-badge.schema';
import { userMission } from './user-mission.schema';

const schema = {
  ...authSchema,
  userMission,
  userBadge,
  mission,
  badge,
};

export default schema;
