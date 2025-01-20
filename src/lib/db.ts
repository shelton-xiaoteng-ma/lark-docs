import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserFromDb = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email));
  return user.length > 0 ? user[0] : null;
};
