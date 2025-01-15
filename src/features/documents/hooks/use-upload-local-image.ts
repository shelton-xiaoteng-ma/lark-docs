import { useEditorStore } from "@/features/documents/store/use-editor-store";

export const useUploadLocalImage = () => {
  const { editor } = useEditorStore();

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUploadLocalImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    };
    input.click();
  };

  return { onUploadLocalImage };
};
