"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function SimpleTopBar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-primary-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <button
          onClick={() => router.back()}
          className="rounded-lg p-2 text-ink-700 hover:bg-primary-50"
          aria-label="পেছনে যান"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-base font-semibold text-primary-900">
          এসো কুরআন শিখি
        </span>
      </div>
    </header>
  );
}
