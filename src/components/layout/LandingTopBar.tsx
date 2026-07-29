"use client";

import Link from "next/link";
import { BookOpenText } from "lucide-react";

interface LandingTopBarProps {
  showLogo: boolean;
}

export function LandingTopBar({ showLogo }: LandingTopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-primary-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3 sm:px-6">
        {showLogo && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700 text-white">
              <BookOpenText size={18} />
            </div>
            <span className="text-base font-semibold text-primary-900">
              এসো কুরআন শিখি একাডেমি
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
