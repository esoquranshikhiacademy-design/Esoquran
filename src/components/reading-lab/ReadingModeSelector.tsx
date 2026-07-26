"use client";

import { Gauge, Wind, Headphones, Repeat } from "lucide-react";
import { READING_MODE_LABEL, type ReadingMode } from "@/types/quranReading";
import { cn } from "@/lib/utils";

const MODE_ICON: Record<ReadingMode, typeof Gauge> = {
  slow: Wind,
  normal: Gauge,
  listen: Headphones,
  repeat: Repeat,
};

export function ReadingModeSelector({
  activeMode,
  onSelect,
}: {
  activeMode: ReadingMode;
  onSelect: (mode: ReadingMode) => void;
}) {
  const modes: ReadingMode[] = ["slow", "normal", "listen", "repeat"];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {modes.map((mode) => {
        const Icon = MODE_ICON[mode];
        const isAudioMode = mode === "listen" || mode === "repeat";
        return (
          <button
            key={mode}
            onClick={() => onSelect(mode)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              activeMode === mode
                ? "border-primary-700 bg-primary-700 text-white"
                : "border-primary-200 text-primary-700 hover:bg-primary-50"
            )}
          >
            <Icon size={13} />
            {READING_MODE_LABEL[mode]}
            {isAudioMode && (
              <span className="rounded-full bg-gold-100 px-1.5 py-0.5 text-[10px] text-gold-700">
                audio শীঘ্রই
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
