import Navbar from "@/features/home/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full h-16 bg-white">
        <Navbar />
      </div>
      <div className="mt-16 flex items-center justify-center">
        <div>
          Click{" "}
          <Link href="/documents/1" className="text-blue-500 underline px-2">
            here
          </Link>
          to go to documentId.
        </div>
      </div>
    </div>
  );
}
