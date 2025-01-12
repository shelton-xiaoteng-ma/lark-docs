import { TiptapEditor } from "./tiptap-editor";
import { Toolbar } from "./toolbar";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  console.log(documentId);
  return (
    <div className="h-screen bg-gray-100">
      <Toolbar />
      <TiptapEditor />
    </div>
  );
};

export default DocumentIdPage;
