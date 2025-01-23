"use client";

import { Button } from "@/components/ui/button";
import { useDocumentId } from "@/hooks/use-document-id";
import { PencilIcon, StarIcon } from "lucide-react";
import { BsCloudCheck } from "react-icons/bs";
import { useGetDocument } from "../hooks/use-get-document";

export const DocumentInput = () => {
  const documentId = useDocumentId();
  const { data } = useGetDocument({ documentId });

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        {data ? data.title : ""}
      </span>
      <Button variant="ghost" size="icon">
        <PencilIcon className="size-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <StarIcon className="size-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <BsCloudCheck className="size-4" />
      </Button>
    </div>
  );
};
