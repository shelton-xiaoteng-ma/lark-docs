import { ModalProvider } from "@/features/documents/providers/modal-provider";

interface DocumentsLayoutProps {
  children: React.ReactNode;
}

const DocumentsLayout = ({ children }: DocumentsLayoutProps) => {
  return (
    <div>
      <ModalProvider />
      {children}
    </div>
  );
};

export default DocumentsLayout;
