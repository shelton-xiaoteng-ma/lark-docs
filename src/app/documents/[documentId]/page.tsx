import { Navbar } from "@/features/documents/components/navbar";
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
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-white print:hidden h-32">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-32 print:pt-0">
        <Ruler />
        <TiptapEditor />
      </div>
    </div>
  );
};

export default DocumentIdPage;
