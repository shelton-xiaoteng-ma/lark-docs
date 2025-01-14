import { Ruler } from "@/features/documents/components/ruler";
import { TiptapEditor } from "@/features/documents/components/tiptap-editor";
import { Toolbar } from "@/features/documents/components/toolbar";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  console.log(documentId);
  return (
    <div className="h-screen bg-neutral-100">
      <Toolbar />
      <Ruler />
      <TiptapEditor />
    </div>
  );
};

export default DocumentIdPage;
