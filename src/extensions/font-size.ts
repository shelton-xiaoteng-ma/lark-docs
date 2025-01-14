import "@tiptap/extension-text-style";
import { Extension } from "@tiptap/react";

type FontSizeOptions = {
  types: string[];
  getStyle: (fontSize: string) => string;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSizeExtension = Extension.create<FontSizeOptions>({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
      getStyle: (fontSize: string) => {
        return `font-size: ${fontSize}`;
      },
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: "16px",
            parseHTML: (element) => {
              return element.style.fontSize;
            },
            renderHTML: (attrs) => {
              if (!attrs.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attrs.fontSize};`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().unsetMark("textStyle").run();
        },
    };
  },
});
