"use client";

import { useLinkStatus } from "@/context/link-status-context";
import { Link } from "@/components/link";

function Hint() {
  const { pending } = useLinkStatus();

  return (
    <span
      className={`inline-block transition-opacity duration-200 ${
        pending ? "opacity-100" : "opacity-0"
      }`}
    >
      {pending && "⏳"}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col gap-3 w-full max-w-md px-4">
        <Link
          href="/dashboard"
          className="bg-blue-500 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200 flex items-center justify-between shadow-sm hover:shadow-md"
        >
          <span>Go to dashboard</span>
          <Hint />
        </Link>

        <Link
          href="/dashboard"
          className="bg-blue-500 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200 flex items-center justify-between shadow-sm hover:shadow-md"
        >
          <span>Go to dashboard</span>
          <Hint />
        </Link>

        <Link
          href="/dashboard"
          className="bg-blue-500 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200 flex items-center justify-between shadow-sm hover:shadow-md"
        >
          <span>Go to dashboard</span>
          <Hint />
        </Link>
      </div>
    </div>
  );
}
