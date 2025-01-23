import { mutate } from "swr";

type CreateDocumentData = {
  title?: string;
  initialContent?: string;
  roomId?: string;
  organizationId?: string;
};

export const useCreateDocument = () => {
  const createDocument = async (data: CreateDocumentData) => {
    try {
      // Send POST request to create a document
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create document");
      }

      const result = await response.json();

      // Optionally mutate the SWR cache to update the list of documents
      mutate("/api/documents");

      return result?.document;
    } catch (error) {
      throw error;
    }
  };
  return { createDocument };
};
