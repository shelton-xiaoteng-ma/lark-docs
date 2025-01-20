"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const UserButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const handleManageAccount = () => {
    router.push("/settings");
  };

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback className="bg-sky-500 text-white uppercase">
            {user.name?.charAt(0) ?? user.email?.split("@")[0].charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuItem className="px-5 py-4">
          <div className="flex items-center gap-5">
            <Avatar className="size-9">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback className="bg-sky-500 text-white uppercase">
                {user.name?.charAt(0) ?? user.email?.split("@")[0].charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium uppercase">
                {user.name ?? user.email?.split("@")[0]}
              </p>
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          className="px-7 py-4"
          onClick={handleManageAccount}
          disabled={true}
        >
          <Settings className="size-7 mr-5" />
          Manage Account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="px-7 py-4">
          <LogOut className="size-7 mr-5" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
