"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AssessmentProgress({
  currentSectionIndex,
  totalSections,
}: {
  currentSectionIndex: number;
  totalSections: number;
}) {
  const percent = ((currentSectionIndex + 1) / totalSections) * 100;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-xs text-ink-500">
        <span>
          বিভাগ {currentSectionIndex + 1}/{totalSections}
        </span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-primary-100">
        <motion.div
          className={cn("h-full rounded-full bg-primary-600")}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
