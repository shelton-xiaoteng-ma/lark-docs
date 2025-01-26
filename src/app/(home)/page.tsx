import { ListDocuments } from "@/features/documents/components/list-documents";
import Navbar from "@/features/home/components/navbar";
import { TemplateGallery } from "@/features/home/components/template-gallery";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full h-16 bg-white p-2">
        <Navbar />
      </div>
      <div className="py-4 mt-20 w-full">
        <TemplateGallery />
        <ListDocuments />
      </div>
    </div>
  );
}
