import { Button } from "@/components/ui/button";
import { PencilIcon, StarIcon } from "lucide-react";
import { BsCloudCheck } from "react-icons/bs";

export const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        Untitled Document
      </span>
      <Button variant="ghost" size="icon">
        <PencilIcon className="size-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <StarIcon className="size-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <BsCloudCheck className="size-4" />
      </Button>
    </div>
  );
};
