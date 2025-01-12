"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

export const ToolbarButton = ({
  icon: Icon,
  onClick,
  isActive,
}: ToolbarButtonProps) => {
  return (
    <button
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-300/80",
        isActive && "bg-neutral-300/80"
      )}
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};
