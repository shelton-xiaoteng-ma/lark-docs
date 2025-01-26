import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { documents } from "@/db/schema";
import { AnyColumn, asc, count, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const page = req.nextUrl.searchParams.get("page");
  const pageSize = req.nextUrl.searchParams.get("pagesize");
  const pageNumber = page ? Number(page) : 1;
  const pageSizeNumber = pageSize ? Number(pageSize) : 10;
  const sort = req.nextUrl.searchParams.get("sort");
  const sortOrder = req.nextUrl.searchParams.get("sortOrder");
  const sortBy =
    sort && sort in documents ? (sort as keyof typeof documents) : "updatedAt";
  const sortOrderDirection = sortOrder ? sortOrder : "desc";
  const column = documents[sortBy] ?? documents.updatedAt;
  const Documents = await db
    .select()
    .from(documents)
    .where(eq(documents.ownerId, session?.user?.id))
    .orderBy(
      sortOrderDirection === "asc"
        ? asc(column as AnyColumn)
        : desc(column as AnyColumn)
    )
    .limit(pageSizeNumber)
    .offset((pageNumber - 1) * pageSizeNumber);

  const totalDocuments = await db
    .select({ count: count() })
    .from(documents)
    .where(eq(documents.ownerId, session?.user?.id));

  return NextResponse.json(
    {
      documents: Documents,
      totalPages: Math.ceil(Number(totalDocuments[0].count) / pageSizeNumber),
      totalDocuments: Number(totalDocuments[0].count),
      pageSize: pageSizeNumber,
      currentPage: pageNumber,
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { title, initialContent, ownerId } = await req.json();
  const result = await db
    .insert(documents)
    .values({ title, initialContent, ownerId: ownerId })
    .returning();
  const insertedDocument = result.length > 0 ? result[0] : null;
  return NextResponse.json(
    { message: "Document created", document: insertedDocument },
    { status: 201 }
  );
}
