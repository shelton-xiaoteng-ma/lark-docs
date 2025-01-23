import { db } from "@/db/drizzle";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  const { documentId } = await params;
  const document = await db
    .select()
    .from(documents)
    .where(eq(documents.id, documentId))
    .limit(1);
  if (document.length === 0) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  } else {
    return NextResponse.json(document[0]);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  const { documentId } = await params;
  const { title, initialContent } = await req.json();
  await db
    .update(documents)
    .set({ title, initialContent })
    .where(eq(documents.id, documentId));
  return NextResponse.json({ message: "Document updated" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  const { documentId } = await params;
  await db.delete(documents).where(eq(documents.id, documentId));
  return NextResponse.json({ message: "Document deleted" });
}
