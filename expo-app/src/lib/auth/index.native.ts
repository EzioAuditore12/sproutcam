import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import { fetch } from "react-native-nitro-fetch";
import * as SecureStore from "expo-secure-store";

import { env } from "@/env";

export const authClient = createAuthClient({
  baseURL: env.SERVER_URL,
  plugins: [
    expoClient({
      scheme: "sproutcam",
      storagePrefix: "sproutcam",
      storage: SecureStore,
    }),
  ],
  fetchOptions: {
    customFetchImpl: fetch,
  },
});

export const { signIn, signUp, useSession } = authClient;
