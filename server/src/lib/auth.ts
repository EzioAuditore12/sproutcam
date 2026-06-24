import { expo } from '@better-auth/expo/server';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { bearer, openAPI } from 'better-auth/plugins';

import { db } from '@/db';
import { env } from '@/env';
import { sendEmail } from '@/utils/email';

export const auth = betterAuth({
  trustedOrigins: env.CORS_ORIGIN,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ url, token, user }, request) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        text: `Click the link to verify your email ${url}`,
      });
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: env.isProduction ? 'none' : 'lax',
      secure: env.isProduction,
    },
  },
  plugins: [expo(), openAPI(), bearer()],
});
