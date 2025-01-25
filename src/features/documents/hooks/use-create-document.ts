import { documents } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { useState } from "react";
import { mutate } from "swr";

type CreateDocumentData = InferInsertModel<typeof documents>;

type DocumentData = InferSelectModel<typeof documents>;

type Options = {
  onSuccess?: (data: DocumentData) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
};

export const useCreateDocument = () => {
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);

  const createDocument = async (
    data: CreateDocumentData,
    options?: Options
  ) => {
    try {
      setStatus("pending");
      // Send POST request to create a document
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create document");
      }

      const result = await response.json();

      // Optionally mutate the SWR cache to update the list of documents
      mutate("/api/documents");
      options?.onSuccess?.(result?.document);
      setStatus("success");
      return result?.document;
    } catch (error) {
      setStatus("error");
      options?.onError?.(
        error instanceof Error ? error : new Error("An error occurred")
      );
    } finally {
      setStatus("settled");
      options?.onSettled?.();
    }
  };
  return { createDocument, status };
};
