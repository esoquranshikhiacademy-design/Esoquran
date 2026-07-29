import type { ReactNode } from "react";
import { SimpleTopBar } from "@/components/layout/SimpleTopBar";

export default function MoreSectionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <SimpleTopBar />
      {children}
    </div>
  );
}
