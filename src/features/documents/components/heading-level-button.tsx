import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/features/documents/store/use-editor-store";
import { cn } from "@/lib/utils";
import type { Level } from "@tiptap/extension-heading";
import { ChevronDownIcon } from "lucide-react";

export const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "1rem" },
    { label: "Heading 1", value: 1, fontSize: "1.6rem" },
    { label: "Heading 2", value: 2, fontSize: "1.4rem" },
    { label: "Heading 3", value: 3, fontSize: "1.2rem" },
    { label: "Heading 4", value: 4, fontSize: "1.1rem" },
    { label: "Heading 5", value: 5, fontSize: "1rem" },
  ];

  const getCurrentHeadingLevel = () => {
    const currentHeadingLevel = editor?.getAttributes("heading").level;
    if (currentHeadingLevel) {
      return `Heading ${currentHeadingLevel}`;
    }
    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 w-32 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-300/80 px-2 overflow-hidden">
          <span>{getCurrentHeadingLevel()}</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-1">
        {headings.map((heading) => (
          <DropdownMenuItem
            key={heading.value}
            className={cn("hover:bg-neutral-300/80", {
              "bg-neutral-300/80": getCurrentHeadingLevel() === heading.label,
            })}
          >
            <button
              className="w-full flex items-center gap-x-2 px-2 py-1 rounded-sm "
              onClick={() => {
                if (heading.value === 0) {
                  editor?.chain().focus().setParagraph().run();
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: heading.value as Level })
                    .run();
                }
              }}
            >
              <span style={{ fontSize: heading.fontSize }}>
                {heading.label}
              </span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
