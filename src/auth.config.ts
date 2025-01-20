import { db } from "@/db/drizzle";
import { getUserFromDb } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { signInSchema } from "@/lib/zod";
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
        user = await getUserFromDb(email);
        if (!user || !user.password) {
          throw new Error("User not found.");
        }
        const pwHash = user.password;
        const isPasswordValid = verifyPassword(password, pwHash);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials.");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig;
