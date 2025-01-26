import { documents } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type CreateDocumentData = InferInsertModel<typeof documents>;
export type DocumentData = InferSelectModel<typeof documents>;
