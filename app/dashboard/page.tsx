"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
}
