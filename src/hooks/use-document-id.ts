import { useParams } from "next/navigation";

export const useDocumentId = () => {
  const { documentId } = useParams();
  return documentId as string;
};
