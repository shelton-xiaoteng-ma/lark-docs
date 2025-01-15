"use client";

import {
  AiOutlineInsertRowAbove,
  AiOutlineInsertRowBelow,
  AiOutlineInsertRowLeft,
  AiOutlineInsertRowRight,
} from "react-icons/ai";

import {
  ArrowRightLeftIcon,
  BoldIcon,
  CircleHelpIcon,
  EyeIcon,
  FileCode2,
  FileImageIcon,
  FileJson2Icon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  GraduationCapIcon,
  ItalicIcon,
  ListPlusIcon,
  MessageCircleQuestionIcon,
  PersonStandingIcon,
  Printer,
  RadioTowerIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SaveIcon,
  SearchIcon,
  SheetIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useUploadLocalImage } from "@/features/documents/hooks/use-upload-local-image";
import { useEditorStore } from "@/features/documents/store/use-editor-store";
import { useImageModalStore } from "@/features/documents/store/use-image-modal-store";
import { useState } from "react";
import { BsFilePdf, BsFullscreen, BsTranslate } from "react-icons/bs";

export const DocumentMenubar = () => {
  const { editor } = useEditorStore();
  const [tableRows, setTableRows] = useState(5);
  const [tableColumns, setTableColumns] = useState(5);
  const { open: openUploadImageModal } = useImageModalStore();
  const { onUploadLocalImage } = useUploadLocalImage();

  const insertTable = (rows: number, columns: number) => {
    editor?.chain().focus().insertTable({ rows, cols: columns }).run();
  };

  const handleDefaultInsertTable = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    insertTable(3, 3);
  };

  const handleCustomInsertTable = () => {
    insertTable(tableRows, tableColumns);
    setTableRows(5);
    setTableColumns(5);
  };

  const onDownload = (blob: Blob, filename: string) => {
    const userFilename = prompt("Enter a filename:", filename);
    if (!userFilename) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = userFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSaveJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, "document.json");
  };

  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, "document.html");
  };

  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, "document.txt");
  };

  return (
    <div className="flex items-center gap-2">
      <Menubar className="border-none bg-transparent shadow-none h-auto p-0 space-x-2">
        <MenubarMenu>
          <MenubarTrigger className="text-base font-normal rounded-sm hover:bg-muted h-auto p-1">
            <span>File</span>
          </MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarSub>
              <MenubarSubTrigger>
                <SaveIcon className="size-4 mr-2" />
                <span>Save</span>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={onSaveJSON}>
                  <FileJson2Icon className="size-4 mr-2" />
                  <span>JSON</span>
                </MenubarItem>
                <MenubarItem onClick={onSaveHTML}>
                  <GlobeIcon className="size-4 mr-2" />
                  <span>HTML</span>
                </MenubarItem>
                <MenubarItem onClick={() => window.print()}>
                  <BsFilePdf className="size-4 mr-2" />
                  <span>PDF</span>
                </MenubarItem>
                <MenubarItem onClick={onSaveText}>
                  <FileTextIcon className="size-4 mr-2" />
                  <span>Text</span>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              <FilePlusIcon className="size-4 mr-2" />
              <span>New Document</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <FilePenIcon className="size-4 mr-2" />
              <span>Rename</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <TrashIcon className="size-4 mr-2" />
              <span>Delete</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => window.print()}>
              <Printer className="size-4 mr-2" />
              <span>Print</span>
              <MenubarShortcut>⌘+P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarSeparator />
        <MenubarMenu>
          <MenubarTrigger className="text-base font-normal rounded-sm hover:bg-muted h-auto p-1">
            <span>View</span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <EyeIcon className="size-4 mr-2" />
              <span>Show</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <BsFullscreen className="size-4 mr-2" />
              <span>Full Screen</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-base font-normal rounded-sm hover:bg-muted h-auto p-1">
            <span>Edit</span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
              <Undo2Icon className="size-4 mr-2" />
              <span>Undo</span>
              <MenubarShortcut>⌘+Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
              <Redo2Icon className="size-4 mr-2" />
              <span>Redo</span>
              <MenubarShortcut>⌘+Y</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-base font-normal rounded-sm hover:bg-muted h-auto p-1">
            <span>Insert</span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>
                <SheetIcon className="size-4 mr-2" />
                <span>Table</span>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={handleDefaultInsertTable}>
                  <span>3 x 3</span>
                </MenubarItem>
                <MenubarItem
                  onSelect={(event) => {
                    event.preventDefault(); // Prevent menu from closing
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="mr-2">Custom: </span>
                  <input
                    onChange={(event) =>
                      setTableRows(Number(event.target.value))
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleCustomInsertTable();
                      }
                    }}
                    value={tableRows}
                    placeholder="5"
                    type="number"
                    className="w-8 border-none outline-none"
                  />
                  <span className="mr-2">x</span>
                  <input
                    onChange={(event) =>
                      setTableColumns(Number(event.target.value))
                    }
                    value={tableColumns}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleCustomInsertTable();
                      }
                    }}
                    placeholder="5"
                    type="number"
                    className="w-8 border-none outline-none"
                  />
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().addRowBefore().run()}
                >
                  <AiOutlineInsertRowAbove className="size-4 mr-2" />
                  <span>Insert Row Above</span>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().addRowAfter().run()}
                >
                  <AiOutlineInsertRowBelow className="size-4 mr-2" />
                  <span>Insert Row Below</span>
                </MenubarItem>
                <MenubarItem
                  onClick={() =>
                    editor?.chain().focus().addColumnBefore().run()
                  }
                >
                  <AiOutlineInsertRowLeft className="size-4 mr-2" />
                  <span>Insert Column Left</span>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().addColumnAfter().run()}
                >
                  <AiOutlineInsertRowRight className="size-4 mr-2" />
                  <span>Insert Column Right</span>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>
                <FileImageIcon className="size-4 mr-2" />
                <span>Image</span>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={onUploadLocalImage}>
                  <UploadIcon className="size-4 mr-2" />
                  Upload
                </MenubarItem>
                <MenubarItem onClick={openUploadImageModal}>
                  <SearchIcon className="size-4 mr-2" />
                  Paste Image URL
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-base font-normal rounded-sm hover:bg-muted h-auto p-1">
            <span>Format</span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>
                <TextIcon className="size-4 mr-2" />
                <span>Text</span>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <BoldIcon className="size-4 mr-2" />
                  <span>Bold</span>
                  <MenubarShortcut>⌘+B</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <ItalicIcon className="size-4 mr-2" />
                  <span>Italic</span>
                  <MenubarShortcut>⌘+I</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                >
                  <UnderlineIcon className="size-4 mr-2" />
                  <span>Underline</span>
                  <MenubarShortcut>⌘+U</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                  <StrikethroughIcon className="size-4 mr-2" />
                  <span>Strikethrough</span>
                  <MenubarShortcut>⌘+T</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem
              onClick={() => editor?.chain().focus().unsetAllMarks().run()}
            >
              <RemoveFormattingIcon className="size-4 mr-2" />
              <span>Remove Formatting</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-base font-normal rounded-sm hover:bg-muted h-auto p-1">
            <span>Tools</span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <FileTextIcon className="size-4 mr-2" />
              <span>Word Count</span>
            </MenubarItem>
            <MenubarItem>
              <ArrowRightLeftIcon className="size-4 mr-2" />
              <span>Compare Documents</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <BsTranslate className="size-4 mr-2" />
              <span>Translate Document</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <PersonStandingIcon className="size-4 mr-2" />
              <span>Accessibility</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-base font-normal rounded-sm hover:bg-muted h-auto p-1">
            <span>Extensions</span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>
                <ListPlusIcon className="size-4 mr-2" />
                <span>Add-ons</span>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <span>Get Add-ons</span>
                </MenubarItem>
                <MenubarItem>
                  <span>Manage Add-ons</span>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              <FileCode2 className="size-4 mr-2" />
              <span>Apps Script</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-base font-normal rounded-sm hover:bg-muted h-auto p-1">
            <span>Help</span>
          </MenubarTrigger>
          <MenubarContent className="w-60">
            <MenubarItem>
              <SearchIcon className="size-4 mr-2" />
              <span>Search the menus</span>
              <MenubarShortcut>Option+/</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <CircleHelpIcon className="size-4 mr-2" />
              <span>Help</span>
            </MenubarItem>
            <MenubarItem>
              <GraduationCapIcon className="size-4 mr-2" />
              <span>Training</span>
            </MenubarItem>
            <MenubarItem>
              <RadioTowerIcon className="size-4 mr-2" />
              <span>Updates</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <MessageCircleQuestionIcon className="size-4 mr-2" />
              <span>Feedback</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
