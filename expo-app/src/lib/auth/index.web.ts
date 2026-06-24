import { createAuthClient } from "better-auth/react";

import { env } from "@/env";
import { fetch } from "../fetch";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: env.SERVER_URL,
  fetchOptions: {
    customFetchImpl: fetch,
  },
});

export const { signIn, signUp, useSession } = authClient;
