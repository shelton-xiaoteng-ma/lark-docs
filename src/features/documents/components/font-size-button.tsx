import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useEditorStore } from "../store/use-editor-store";

export const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("fontSize").fontSize
    ? editor?.getAttributes("fontSize").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputSize, setInputSize] = useState(fontSize);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(`${size}px`);
      setInputSize(size);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = e.target.value;
    setInputSize(newSize);
  };

  const handleInputBlur = () => {
    updateFontSize(inputSize);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputSize);
    }
  };

  const incrementFontSize = () => {
    const newSize = parseInt(fontSize) + 1;
    setFontSize(`${newSize}px`);
    setInputSize(newSize);
    updateFontSize(`${newSize}`);
  };

  const decrementFontSize = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      setFontSize(`${newSize}px`);
      setInputSize(newSize);
      updateFontSize(`${newSize}`);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={decrementFontSize}
        className="size-7 shrink-0 rounded-md hover:bg-neutral-300/80 flex items-center justify-center"
      >
        <MinusIcon className="size-4" />
      </button>
      <Input
        type="number"
        value={inputSize}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="h-6 w-11 border border-neutral-500"
      />
      <button
        onClick={incrementFontSize}
        className="size-7 shrink-0 rounded-md hover:bg-neutral-300/80 flex items-center justify-center"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};
