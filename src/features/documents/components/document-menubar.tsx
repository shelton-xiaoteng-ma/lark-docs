"use client";

import {
  ArrowRightLeftIcon,
  BoldIcon,
  CircleHelpIcon,
  EyeIcon,
  FileCode2,
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
import { BsFilePdf, BsFullscreen, BsTranslate } from "react-icons/bs";

export const DocumentMenubar = () => {
  return (
    <div className="flex items-center gap-2">
      <Menubar className="border-none bg-transparent shadow-none h-auto p-0 space-x-2">
        <MenubarMenu>
          <MenubarTrigger className="text-base font-normal rounded-sm hover:bg-muted h-auto p-1">
            <span>File</span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>
                <SaveIcon className="size-4 mr-2" />
                <span>Save</span>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <FileJson2Icon className="size-4 mr-2" />
                  <span>JSON</span>
                </MenubarItem>
                <MenubarItem>
                  <GlobeIcon className="size-4 mr-2" />
                  <span>HTML</span>
                </MenubarItem>
                <MenubarItem>
                  <BsFilePdf className="size-4 mr-2" />
                  <span>PDF</span>
                </MenubarItem>
                <MenubarItem>
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
            <MenubarItem>
              <Undo2Icon className="size-4 mr-2" />
              <span>Undo</span>
              <MenubarShortcut>⌘+Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
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
                <MenubarItem>
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
                    placeholder="5"
                    type="number"
                    className="w-8 border-none outline-none"
                  />
                  <span className="mr-2">x</span>
                  <input
                    placeholder="5"
                    type="number"
                    className="w-8 border-none outline-none"
                  />
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
                <MenubarItem>
                  <BoldIcon className="size-4 mr-2" />
                  <span>Bold</span>
                  <MenubarShortcut>⌘+B</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <ItalicIcon className="size-4 mr-2" />
                  <span>Italic</span>
                  <MenubarShortcut>⌘+I</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <UnderlineIcon className="size-4 mr-2" />
                  <span>Underline</span>
                  <MenubarShortcut>⌘+U</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <StrikethroughIcon className="size-4 mr-2" />
                  <span>Strikethrough</span>
                  <MenubarShortcut>⌘+T</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
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
