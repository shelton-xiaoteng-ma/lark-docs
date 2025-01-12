"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useEditorStore } from "../store/use-editor-store";

export const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Helvetica", value: "Helvetica" },
    { label: "Georgia", value: "Georgia" },
    { label: "Impact", value: "Impact" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 w-32 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-300/80 px-2 overflow-hidden">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-1">
        {fonts.map((font) => (
          <DropdownMenuItem key={font.value}>
            <button
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
                editor?.getAttributes("textStyle").fontFamily === font.value &&
                  "bg-neutral-300/80"
              )}
              key={font.value}
              onClick={() => {
                editor?.commands.setFontFamily(font.value);
              }}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
