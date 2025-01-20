import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 gap-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <h3 className="text-2xl font-bold">Lark Docs</h3>
      </div>
      <SearchInput />
      <div className="flex items-center gap-4">
        <UserButton />
      </div>
    </nav>
  );
}
