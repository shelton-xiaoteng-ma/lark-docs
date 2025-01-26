import { useState } from "react";
import { mutate } from "swr";
import { DocumentData } from "../types";

type Options = {
  onSuccess?: (data: DocumentData) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
};

export const useDeleteDocument = () => {
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);

  const deleteDocument = async (documentId: string, options?: Options) => {
    try {
      setStatus("pending");
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create document");
      }

      const result = await response.json();

      // Optionally mutate the SWR cache to update the list of documents
      mutate(
        (key: string) =>
          typeof key === "string" && key.startsWith("/api/documents")
      );
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
  return { deleteDocument, status };
};
