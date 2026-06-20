import * as authSchema from "./auth.schema";
import { badge } from "./badge.schema";

const schema = {
  ...authSchema,
  badge,
};

export default schema;
