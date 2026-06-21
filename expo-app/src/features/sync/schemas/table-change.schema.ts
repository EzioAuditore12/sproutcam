import { type, type Type } from "arktype";

export const tableChangesSchema = <T>(schema: Type<T, any>) =>
  type({
    created: schema.array(),
    updated: schema.array(),
    deleted: "unknown[]",
  });
