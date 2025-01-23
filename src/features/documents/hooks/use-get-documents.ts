import fetcher from "@/lib/fetch";
import useSWR from "swr";

export const useGetDocuments = () => {
  const { data, error, isLoading } = useSWR("/api/documents", fetcher);
  return { data, error, isLoading };
};
