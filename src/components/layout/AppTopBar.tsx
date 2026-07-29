"use client";

import Link from "next/link";
import { BookOpenText, Menu } from "lucide-react";

interface AppTopBarProps {
  onMenuClick: () => void;
}

export function AppTopBar({ onMenuClick }: AppTopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-primary-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700 text-white">
            <BookOpenText size={18} />
          </div>
          <span className="text-base font-semibold text-primary-900">
            এসো কুরআন শিখি
          </span>
        </Link>

        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-700 hover:bg-primary-50"
          aria-label="মেনু খুলুন"
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}
