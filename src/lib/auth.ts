import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./mongodb.js";

const trustedOrigins = ["http://localhost:3000", process.env.FRONTEND_URL].filter(
  (origin): origin is string => Boolean(origin)
);

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    },
  },

  secret: process.env.BETTER_AUTH_SECRET!,

  baseURL: process.env.BETTER_AUTH_URL!,

  trustedOrigins,

  // The frontend and API are separate Vercel origins in production. The
  // session cookie must therefore be allowed on credentialed cross-origin
  // requests. Keep the development cookie compatible with plain HTTP.
  advanced:
    process.env.NODE_ENV === "production"
      ? {
          defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
          },
        }
      : undefined,
});
