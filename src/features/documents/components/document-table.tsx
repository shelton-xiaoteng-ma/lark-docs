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
import { formatDistanceToNow } from "date-fns";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { DocumentData } from "../types";

interface DocumentTableProps {
  documents: DocumentData[];
}

export const DocumentTable = ({ documents }: DocumentTableProps) => {
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
            <TableCell>{document.title}</TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(document.createdAt), {
                addSuffix: true,
              })}
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(document.updatedAt), {
                addSuffix: true,
              })}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto p-2">
                    <MoreVerticalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={`/documents/${document.id}`}>View</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/documents/${document.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/documents/${document.id}/delete`}>
                      Delete
                    </Link>
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
