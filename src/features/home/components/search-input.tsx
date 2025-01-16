"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";

export const SearchInput = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex-1 flex items-center justify-center gap-2 px-8">
      <Button
        variant="ghost"
        onClick={() => {}}
        className="translate-x-14 hover:bg-white hover:bg-opacity-0 rounded-full"
      >
        <SearchIcon className="size-4" />
      </Button>
      <Input
        type="text"
        placeholder="Search"
        className="border border-black rounded-xl px-10 py-2 max-w-[720px] focus-visible:shadow-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <XIcon
        className={cn(
          "w-4 h-4 -translate-x-10",
          search && "text-muted-foreground"
        )}
        onClick={() => setSearch("")}
      />
    </div>
  );
};
