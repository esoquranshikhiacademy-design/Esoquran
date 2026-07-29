"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Type, BookOpenCheck, GraduationCap, Puzzle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  {
    href: "/quran-learning/arabic-alphabet",
    icon: Type,
    label: "বর্ণমালা",
    match: "/quran-learning/arabic-alphabet",
  },
  {
    href: "/quran-learning/reading-lab",
    icon: BookOpenCheck,
    label: "কুরআন",
    match: "/quran-learning/reading-lab",
  },
  {
    href: "/courses",
    icon: GraduationCap,
    label: "কোর্স",
    match: "/courses",
  },
  {
    href: "/practice-zone",
    icon: Puzzle,
    label: "প্র্যাকটিস",
    match: "/practice-zone",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "সেটিং",
    match: "/settings",
  },
] as const;

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-primary-100 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      aria-label="মূল নেভিগেশন"
    >
      <div className="mx-auto flex max-w-2xl items-stretch justify-between px-1">
        {TABS.map((tab) => {
          const isActive = pathname?.startsWith(tab.match);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                isActive ? "text-primary-700" : "text-ink-500 hover:text-primary-600"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={22} strokeWidth={isActive ? 2.4 : 2} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
