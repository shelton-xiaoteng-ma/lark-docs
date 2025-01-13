"use client";

import { useEditorStore } from "@/features/documents/store/use-editor-store";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const TiptapEditor = () => {
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none print:border-0 bg-white border border-gray-300 flex flex-col min-h-[1054px] w-[816px] py-10 pr-14 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: `
      <h1>This is a 1st level heading</h1>
      <h2>This is a 2nd level heading</h2>
      <h3>This is a 3rd level heading</h3>
      <p>Example Text</p>
      <p style="font-style: italic">This as well.</p>

      <blockquote>
        Nothing is impossible, the word itself says “I’m possible!”
      </blockquote>

      <ul>
        <li>A list item</li>
        <li>And another one</li>
      </ul>

      <ol>
        <li>A list item</li>
        <li>And another one</li>
      </ol>

      <ol start="5">
        <li>This item starts at 5</li>
        <li>And another one</li>
      </ol>

      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="true">A list item</li>
        <li data-type="taskItem" data-checked="false">And another one</li>
      </ul>
    `,
  });

  return (
    <div className="size-full overflow-x-auto bg-gray-100 px-4 print:p-0 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
