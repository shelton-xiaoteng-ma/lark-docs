import fetcher from "@/lib/fetch";
import useSWR from "swr";

export const useGetDocument = ({ documentId }: { documentId: string }) => {
  const { data, error, isLoading } = useSWR(
    `/api/documents/${documentId}`,
    fetcher
  );
  return { data, error, isLoading };
};
