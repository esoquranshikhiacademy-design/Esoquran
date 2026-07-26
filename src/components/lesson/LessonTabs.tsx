"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  key: string;
  label: string;
  content: ReactNode;
}

export function LessonTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key);

  return (
    <div>
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-ink-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              "shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
              active === tab.key
                ? "border-primary-700 text-primary-800"
                : "border-transparent text-ink-400 hover:text-ink-600"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((t) => t.key === active)?.content}</div>
    </div>
  );
}
