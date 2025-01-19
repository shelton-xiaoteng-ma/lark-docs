import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getUserFromDb = async (email: string, password: string) => {
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.password, password)));
  return user.length > 0 ? user[0] : null;
};
