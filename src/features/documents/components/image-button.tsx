import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUploadLocalImage } from "@/features/documents/hooks/use-upload-local-image";
import { useImageModalStore } from "@/features/documents/store/use-image-modal-store";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";

export const ImageButton = () => {
  const { open: openModal } = useImageModalStore();
  const { onUploadLocalImage } = useUploadLocalImage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-300/80">
          <ImageIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onUploadLocalImage}>
          <UploadIcon className="size-4" />
          Upload
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openModal}>
          <SearchIcon className="size-4" />
          Paste Image URL
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
