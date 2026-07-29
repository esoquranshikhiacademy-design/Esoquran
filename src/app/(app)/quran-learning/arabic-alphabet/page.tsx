"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ARABIC_LETTERS } from "@/lib/data/arabicLetters";
import { MAKHRAJ_GROUP_LABEL, type MakhrajGroupId } from "@/types/arabicAlphabet";
import { LetterGrid } from "@/components/arabic-alphabet/LetterGrid";
import { cn } from "@/lib/utils";

const FILTERS: { value: MakhrajGroupId | "all"; label: string }[] = [
  { value: "all", label: "সব" },
  ...(Object.entries(MAKHRAJ_GROUP_LABEL) as [MakhrajGroupId, string][]).map(
    ([value, label]) => ({ value, label })
  ),
];

export default function ArabicAlphabetPage() {
  const [filter, setFilter] = useState<MakhrajGroupId | "all">("all");

  const filteredLetters =
    filter === "all" ? ARABIC_LETTERS : ARABIC_LETTERS.filter((l) => l.makhrajGroup === filter);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">আরবি বর্ণমালা স্টুডিও</h1>
        <p className="mt-2 text-sm text-ink-500">
          যেকোনো অক্ষরে ট্যাপ করে বিস্তারিত শিখুন - লেখা, উচ্চারণ, উদাহরণ ও কুইজ
        </p>
      </motion.div>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
              filter === f.value
                ? "border-primary-700 bg-primary-700 text-white"
                : "border-primary-200 text-primary-700 hover:bg-primary-50"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <LetterGrid letters={filteredLetters} />
    </div>
  );
}
