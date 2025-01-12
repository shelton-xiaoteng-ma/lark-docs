"use client";

import { ToolbarButton } from "@/features/documents/components/toolbar-button";
import { LucideIcon, Undo2Icon } from "lucide-react";
import { useEditorStore } from "../store/use-editor-store";

export const Toolbar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: true,
      },
    ],
  ];
  return (
    <div className="bg-gray-200 px-2 py-1 rounded-sm min-h-10 flex items-center gap-x-1 overflow-x-auto">
      {sections[0].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}
    </div>
  );
};
