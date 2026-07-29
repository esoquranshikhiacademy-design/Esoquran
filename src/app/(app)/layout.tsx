"use client";

import { useState, type ReactNode } from "react";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { AppBottomNav } from "@/components/layout/AppBottomNav";
import { MoreMenuDrawer } from "@/components/layout/MoreMenuDrawer";

export default function AppShellLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <AppTopBar onMenuClick={() => setIsMenuOpen(true)} />

      <div className="pb-20">{children}</div>

      <AppBottomNav />

      <MoreMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
