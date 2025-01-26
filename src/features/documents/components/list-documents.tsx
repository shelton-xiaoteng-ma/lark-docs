"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetDocuments } from "../hooks/use-get-documents";
import { DocumentData } from "../types";
import { DocumentTable } from "./document-table";

export const ListDocuments = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetDocuments({ page, pageSize: 5 });

  useEffect(() => {
    if (data?.documents) {
      if (page === 1) {
        setDocuments(data.documents);
      } else {
        setDocuments((prev) => [...prev, ...data.documents]);
      }
    }
  }, [data, page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const hasMore = data?.documents.length === 5;

  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Recent documents</h3>
      <div className="flex flex-col gap-3">
        {isLoading || documents.length > 0 ? (
          <DocumentTable documents={documents} />
        ) : (
          <div>No documents found</div>
        )}
      </div>
      {isLoading ? (
        <Loader2 className="animate-spin size-10 mx-auto" />
      ) : (
        hasMore && (
          <Button variant="ghost" onClick={loadMore}>
            Load More
          </Button>
        )
      )}
    </div>
  );
};
