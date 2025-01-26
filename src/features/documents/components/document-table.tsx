import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteDocument } from "../hooks/use-delete-document";
import { DocumentData } from "../types";
import { RemoveDialog } from "./remove-dialog";

interface DocumentTableProps {
  documents: DocumentData[];
}

export const DocumentTable = ({ documents }: DocumentTableProps) => {
  const { deleteDocument } = useDeleteDocument();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const handleDeleteDocument = (documentId: string) => {
    deleteDocument(documentId, {
      onSuccess: (document) => {
        toast.success(`Document ${document.title} has been deleted`);
      },
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Document Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents?.map((document: DocumentData) => (
          <TableRow key={document.id}>
            <TableCell>
              <Link href={`/documents/${document.id}`}>{document.title}</Link>
            </TableCell>
            <TableCell>
              {(() => {
                const date = new Date(document.createdAt);
                return differenceInDays(new Date(), date) > 3
                  ? format(date, "MMM dd, yyyy")
                  : formatDistanceToNow(date, { addSuffix: true });
              })()}
            </TableCell>
            <TableCell>
              {(() => {
                const date = new Date(document.updatedAt);
                return differenceInDays(new Date(), date) > 3
                  ? format(date, "MMM dd, yyyy")
                  : formatDistanceToNow(date, { addSuffix: true });
              })()}
            </TableCell>
            <TableCell>
              <DropdownMenu
                open={openMenus[document.id]}
                onOpenChange={(open) =>
                  setOpenMenus((prev) => ({
                    ...prev,
                    [document.id]: open,
                  }))
                }
              >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto p-2">
                    <MoreVerticalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Button variant="ghost" size="icon">
                      <Link
                        href={`/documents/${document.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button variant="ghost" size="icon">
                      <Link
                        href={`/documents/${document.id}/edit`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Edit
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => e.preventDefault()}
                    className="cursor-pointer"
                  >
                    <RemoveDialog
                      onConfirm={() => handleDeleteDocument(document.id)}
                      onCancel={() =>
                        setOpenMenus((prev) => ({
                          ...prev,
                          [document.id]: false,
                        }))
                      }
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
