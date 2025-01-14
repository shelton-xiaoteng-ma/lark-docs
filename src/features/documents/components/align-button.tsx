import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/features/documents/store/use-editor-store";
import { cn } from "@/lib/utils";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";

export function AlignButton() {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Left",
      icon: AlignLeftIcon,
      value: "left",
    },
    {
      label: "Center",
      icon: AlignCenterIcon,
      value: "center",
    },
    {
      label: "Right",
      icon: AlignRightIcon,
      value: "right",
    },
    {
      label: "Justify",
      icon: AlignJustifyIcon,
      value: "justify",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-300/80">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {alignments.map((alignment) => (
          <DropdownMenuItem
            key={alignment.value}
            onClick={() => {
              editor?.chain().focus().setTextAlign(alignment.value).run();
            }}
            className={cn(
              "flex items-center gap-2",
              editor?.isActive({ textAlign: alignment.value }) &&
                "bg-neutral-300/80"
            )}
          >
            <alignment.icon className="size-4" />
            <span>{alignment.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
