import { type } from "arktype";

export const userProfileSchema = type({
  id: "string",
  image: "string | null",
  name: "string",
  email: "string",
  emailVerified: "boolean",
  createdAt: "string.date.iso",
  updatedAt: "string.date.iso",
});

export type UserProfile = typeof userProfileSchema.infer;
