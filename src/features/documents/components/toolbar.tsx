"use client";

import { Separator } from "@/components/ui/separator";
import { ToolbarButton } from "@/features/documents/components/toolbar-button";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useEditorStore } from "../store/use-editor-store";
import { AlignButton } from "./align-button";
import { FontFamilyButton } from "./font-family-button";
import { HeadingLevelButton } from "./heading-level-button";
import { HighlightColorButton } from "./highlight-color-button";
import { ImageButton } from "./image-button";
import { LinkButton } from "./link-button";
import { ListButton } from "./list-button";
import { TextColorButton } from "./text-color-button";

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
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
        isActive: true,
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("Comment"),
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <div className="bg-neutral-100 px-2 py-1 rounded-sm min-h-10 flex items-center gap-x-1 overflow-x-auto">
      {sections[0].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}
      <Separator orientation="vertical" className="h-7 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-7 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-7 bg-neutral-300" />
      {sections[1].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-7 bg-neutral-300" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      {/* TODO: Line height */}
      <ListButton />
      <Separator orientation="vertical" className="h-7 bg-neutral-300" />
      {sections[2].map((section) => (
        <ToolbarButton key={section.label} {...section} />
      ))}
      <Separator orientation="vertical" className="h-7 bg-neutral-300" />
      {/* TODO: Font size */}
      {/* TODO: Formatting */}
      {/* TODO: Alignment */}
      {/* TODO: Indent */}
      {/* TODO: Outdent */}
      {/* TODO: Table */}
      {/* TODO: Code */}
      {/* TODO: Quote */}
    </div>
  );
};
