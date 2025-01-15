import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useImageModalStore } from "@/features/documents/store/use-image-modal-store";
import { useState } from "react";
import { useEditorStore } from "../store/use-editor-store";

export default function UploadImageModal() {
  const { isOpen, close: closeModal } = useImageModalStore();
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paste Image URL</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="https://example.com"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleImageUrlSubmit();
            }
          }}
        />
        <DialogFooter className="flex justify-end">
          <Button onClick={handleImageUrlSubmit}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
