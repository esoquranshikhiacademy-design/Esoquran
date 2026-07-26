"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ArabicLetter } from "@/types/arabicAlphabet";

export function LetterGrid({ letters }: { letters: ArabicLetter[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {letters.map((letter, index) => (
        <motion.div
          key={letter.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.02 }}
        >
          <Link
            href={`/quran-learning/arabic-alphabet/${letter.id}`}
            className="flex flex-col items-center gap-1 rounded-2xl border border-primary-100 bg-white p-4 shadow-sm transition-all hover:scale-[1.03] hover:shadow-md"
          >
            <span className="font-arabic-text text-3xl text-primary-900">{letter.letter}</span>
            <span className="text-xs text-ink-500">{letter.nameBengali}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
