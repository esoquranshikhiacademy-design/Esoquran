"use client";

import { motion } from "framer-motion";
import { TAJWEED_RULES } from "@/lib/data/tajweedRules";
import type { Ayah, ReadingMode } from "@/types/quranReading";
import { cn } from "@/lib/utils";

function getRuleColor(ruleId?: string) {
  if (!ruleId) return null;
  return TAJWEED_RULES.find((r) => r.id === ruleId)?.color ?? null;
}

export function AyahDisplay({
  ayah,
  readingMode,
  showTranslation,
}: {
  ayah: Ayah;
  readingMode: ReadingMode;
  showTranslation: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-primary-100 bg-white p-5"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
          {ayah.number}
        </span>
      </div>

      <p
        className={cn(
          "font-arabic-text text-right text-2xl leading-loose text-ink-900",
          readingMode === "slow" && "tracking-wider leading-[2.6]"
        )}
        dir="rtl"
      >
        {ayah.segments.map((segment, i) => {
          const color = getRuleColor(segment.tajweedRuleId);
          return (
            <span
              key={i}
              style={color ? { color, fontWeight: 600 } : undefined}
              className={cn(readingMode === "slow" && "inline-block")}
            >
              {segment.text}
            </span>
          );
        })}
      </p>

      {showTranslation && (
        <p className="mt-3 border-t border-ink-100 pt-3 text-sm text-ink-600">
          {ayah.translationBengali}
        </p>
      )}
    </motion.div>
  );
}
