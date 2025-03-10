import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/features/documents/store/use-editor-store";
import { HighlighterIcon } from "lucide-react";
import { CirclePicker, ColorResult } from "react-color";

export const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-1 pt-0.5 h-7 min-w-7 shrink-0 hover:bg-neutral-300/80 rounded-md flex flex-col items-center justify-center">
          <HighlighterIcon className="size-3.5 rounded-md" />
          <div className="w-full h-1" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <CirclePicker onChange={onChange} color={value} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
