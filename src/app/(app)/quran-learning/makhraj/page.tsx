"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { MAKHRAJ_GROUPS, getMakhrajGroup } from "@/lib/data/makhrajGroups";
import { getLetterById } from "@/lib/data/arabicLetters";
import { MouthDiagram } from "@/components/makhraj/MouthDiagram";
import type { MakhrajGroupId } from "@/types/arabicAlphabet";

export default function MakhrajStudioPage() {
  const [activeGroupId, setActiveGroupId] = useState<MakhrajGroupId>("halq");
  const activeGroup = getMakhrajGroup(activeGroupId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">মাখরাজ স্টুডিও</h1>
        <p className="mt-2 text-sm text-ink-500">
          মুখের ডায়াগ্রামে ট্যাপ করে প্রতিটা মাখরাজের উচ্চারণস্থল জানুন
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[280px_1fr]">
        {/* ডায়াগ্রাম */}
        <div>
          <MouthDiagram activeGroup={activeGroupId} onSelectGroup={setActiveGroupId} />

          {/* গ্রুপ সিলেক্টর বাটন (মোবাইলে ডায়াগ্রামে ট্যাপ করা কঠিন হতে পারে বলে বিকল্প） */}
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {MAKHRAJ_GROUPS.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  activeGroupId === group.id
                    ? "border-primary-700 bg-primary-700 text-white"
                    : "border-primary-200 text-primary-700"
                }`}
              >
                {group.nameBengali}
              </button>
            ))}
          </div>
        </div>

        {/* তথ্য প্যানেল */}
        <AnimatePresence mode="wait">
          {activeGroup && (
            <motion.div
              key={activeGroup.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-primary-100 bg-white p-5"
            >
              <p className="text-xs font-medium text-gold-600">{activeGroup.nameArabic}</p>
              <h2 className="text-xl font-bold text-primary-950">{activeGroup.nameBengali}</h2>
              <p className="mt-2 text-sm text-ink-600">{activeGroup.description}</p>

              {activeGroup.subPoints && (
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                    <Info size={13} /> উপ-অংশসমূহ
                  </p>
                  {activeGroup.subPoints.map((sp, i) => (
                    <div key={i} className="rounded-lg bg-primary-50/60 p-2.5">
                      <p className="text-sm font-medium text-ink-800">{sp.name}</p>
                      <p className="text-xs text-ink-500">{sp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold text-ink-500">এই গ্রুপের অক্ষরসমূহ</p>
                <div className="flex flex-wrap gap-2">
                  {activeGroup.letterIds.map((id) => {
                    const letter = getLetterById(id);
                    if (!letter) return null;
                    return (
                      <Link
                        key={id}
                        href={`/quran-learning/arabic-alphabet/${id}`}
                        className="flex items-center gap-1 rounded-lg border border-primary-100 bg-primary-50/50 px-2.5 py-1.5 text-sm hover:bg-primary-100"
                      >
                        <span className="font-arabic-text text-lg text-primary-900">
                          {letter.letter}
                        </span>
                        <span className="text-xs text-ink-500">{letter.nameBengali}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
