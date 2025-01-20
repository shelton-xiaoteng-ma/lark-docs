import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { getUserFromDb } from "@/lib/db";
import { saltAndHashPassword } from "@/lib/password";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const existingUser = await getUserFromDb(email);

    if (!existingUser) {
      return NextResponse.json(
        { message: "This email address has been registered" },
        { status: 400 }
      );
    }

    const hashedPassword = saltAndHashPassword(password);

    await db.insert(users).values({
      email,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({ message: "Register success", user: { email } }),
      { status: 201 }
    );
  } catch (error) {
    console.error("register error:", error);
    return new Response(JSON.stringify({ message: "register error" }), {
      status: 500,
    });
  }
}
