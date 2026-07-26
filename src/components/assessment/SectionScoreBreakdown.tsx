"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getSectionLabel } from "@/lib/assessment/reportEngine";
import type { SectionResult } from "@/types/assessment";

function scoreColor(score: number): string {
  if (score >= 70) return "bg-primary-600";
  if (score >= 50) return "bg-gold-500";
  return "bg-red-400";
}

export function SectionScoreBreakdown({ sectionResults }: { sectionResults: SectionResult[] }) {
  return (
    <div className="space-y-3">
      {sectionResults.map((section, index) => (
        <motion.div
          key={section.sectionId}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-ink-700">{getSectionLabel(section.sectionId)}</span>
            <span className="font-medium text-ink-500">{section.scorePercent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
            <motion.div
              className={cn("h-full rounded-full", scoreColor(section.scorePercent))}
              initial={{ width: 0 }}
              animate={{ width: `${section.scorePercent}%` }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
