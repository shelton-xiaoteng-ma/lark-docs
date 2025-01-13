import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/features/documents/store/use-editor-store";
import { CirclePicker, type ColorResult } from "react-color";

export const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-1 pt-1.5 size-7 flex flex-col items-center bg-neutral-100 hover:bg-neutral-300/80 rounded-md">
          <span className="text-[14px] leading-[14px]">A</span>
          <div className="w-full h-1" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <DropdownMenuItem>
          <CirclePicker onChange={onChange} color={value} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
