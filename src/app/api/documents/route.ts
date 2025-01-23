import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const Documents = await db
    .select()
    .from(documents)
    .where(eq(documents.ownerId, session?.user?.id));

  return NextResponse.json(
    {
      documents: Documents,
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { title, initialContent } = await req.json();
  const result = await db
    .insert(documents)
    .values({ title, initialContent, ownerId: session?.user?.id })
    .returning();
  const insertedDocument = result.length > 0 ? result[0] : null;
  return NextResponse.json(
    { message: "Document created", document: insertedDocument },
    { status: 201 }
  );
}
