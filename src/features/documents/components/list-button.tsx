import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/features/documents/store/use-editor-store";
import { cn } from "@/lib/utils";
import { ListCheckIcon, ListIcon, ListOrderedIcon } from "lucide-react";

export function ListButton() {
  const { editor } = useEditorStore();

  const listTypes = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: editor?.isActive("bulletList"),
      onClick: () => {
        editor?.chain().focus().toggleBulletList().run();
      },
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: editor?.isActive("orderedList"),
      onClick: () => {
        editor?.chain().focus().toggleOrderedList().run();
      },
    },
    {
      label: "Check List",
      icon: ListCheckIcon,
      isActive: editor?.isActive("taskList"),
      onClick: () => {
        editor?.chain().focus().toggleTaskList().run();
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-300/80">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {listTypes.map((listType) => (
          <DropdownMenuItem
            key={listType.label}
            onClick={() => {
              listType.onClick();
            }}
            className={cn(
              "flex items-center gap-2",
              listType.isActive && "bg-neutral-300/80"
            )}
          >
            <listType.icon className="size-4" />
            <span>{listType.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
