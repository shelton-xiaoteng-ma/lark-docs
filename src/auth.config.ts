import { db } from "@/db/drizzle";
import { signInSchema } from "@/lib/zod";
import { getUserFromDb } from "@/utils/db";
import { saltAndHashPassword } from "@/utils/password";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

export default {
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        const validatedFields = signInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error("Invalid credentials.");
        }

        const { email, password } = validatedFields.data;
        const pwHash = saltAndHashPassword(password);
        user = await getUserFromDb(email, pwHash);

        if (!user) {
          throw new Error("Invalid credentials.");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig;
