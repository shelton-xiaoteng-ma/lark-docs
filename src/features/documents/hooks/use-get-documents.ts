import fetcher from "@/lib/fetch";
import useSWR from "swr";
import { DocumentData } from "../types";

export const useGetDocuments = ({
  page = 1,
  pageSize = 10,
  sort = "updatedAt",
  sortOrder = "desc",
}: {
  page?: number;
  pageSize?: number;
  sort?: string;
  sortOrder?: string;
}) => {
  const { data, error, isLoading } = useSWR<{
    documents: DocumentData[];
    totalPages: number;
    totalDocuments: number;
    currentPage: number;
    pageSize: number;
  }>(
    `/api/documents?page=${page}&pageSize=${pageSize}&sort=${sort}&sortOrder=${sortOrder}`,
    fetcher
  );
  return { data, error, isLoading };
};
