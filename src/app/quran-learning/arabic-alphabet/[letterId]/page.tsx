"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertTriangle, BookText } from "lucide-react";
import { getLetterById, getAdjacentLetters } from "@/lib/data/arabicLetters";
import { MAKHRAJ_GROUP_LABEL } from "@/types/arabicAlphabet";
import { StrokeAnimation } from "@/components/arabic-alphabet/StrokeAnimation";
import { LetterPractice } from "@/components/arabic-alphabet/LetterPractice";
import { LetterQuiz } from "@/components/arabic-alphabet/LetterQuiz";

export default function LetterDetailPage() {
  const params = useParams();
  const letterId = params.letterId as string;
  const letter = getLetterById(letterId);

  if (!letter) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-ink-500">এই অক্ষরটি খুঁজে পাওয়া যায়নি।</p>
        <Link
          href="/quran-learning/arabic-alphabet"
          className="mt-3 inline-block text-sm font-semibold text-primary-700"
        >
          সব অক্ষর দেখুন
        </Link>
      </div>
    );
  }

  const { prev, next } = getAdjacentLetters(letter.order);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* হেডার */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <Link
          href="/quran-learning/arabic-alphabet"
          className="flex items-center gap-1 text-sm font-medium text-primary-700"
        >
          <ChevronLeft size={16} /> সব অক্ষর
        </Link>
        <span className="text-xs text-ink-400">
          {letter.order}/২৯
        </span>
      </motion.div>

      {/* অক্ষর + নাম */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6 text-center"
      >
        <span className="font-arabic-text block text-7xl text-primary-900">{letter.letter}</span>
        <h1 className="mt-2 text-2xl font-bold text-primary-950">{letter.nameBengali}</h1>
        <p className="text-sm text-ink-400">{letter.nameEnglish}</p>
      </motion.div>

      {/* Stroke Animation + Practice পাশাপাশি */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center rounded-2xl border border-primary-100 bg-white p-4"
        >
          <p className="mb-3 text-sm font-semibold text-ink-700">লেখার নিয়ম</p>
          <StrokeAnimation pathData={letter.strokePathData} letter={letter.letter} />
          <p className="mt-3 text-center text-xs text-ink-500">
            {letter.strokeOrderDescription}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-center rounded-2xl border border-primary-100 bg-white p-4"
        >
          <p className="mb-3 text-sm font-semibold text-ink-700">নিজে অনুশীলন করুন</p>
          <LetterPractice letter={letter.letter} />
        </motion.div>
      </div>

      {/* মাখরাজ তথ্য */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 rounded-2xl border border-primary-100 bg-primary-50/50 p-4"
      >
        <div className="mb-1 flex items-center justify-between">
          <p className="text-sm font-semibold text-primary-800">মাখরাজ (উচ্চারণস্থল)</p>
          <Link
            href="/quran-learning/makhraj"
            className="text-xs font-medium text-primary-700 underline"
          >
            {MAKHRAJ_GROUP_LABEL[letter.makhrajGroup]}
          </Link>
        </div>
        <p className="text-sm text-ink-600">{letter.makhrajDescription}</p>
      </motion.div>

      {/* সাধারণ ভুল */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 rounded-2xl border border-gold-100 bg-white p-4"
      >
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-gold-700">
          <AlertTriangle size={15} /> সাধারণ ভুল
        </p>
        <ul className="space-y-1.5">
          {letter.commonMistakes.map((mistake, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              {mistake}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* উদাহরণ শব্দ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 rounded-2xl border border-primary-100 bg-white p-4"
      >
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-800">
          <BookText size={15} /> উদাহরণ শব্দ
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {letter.exampleWords.map((w, i) => (
            <div key={i} className="rounded-lg bg-ink-50 p-3 text-center">
              <p className="font-arabic-text text-xl text-primary-900">{w.word}</p>
              <p className="mt-1 text-xs text-ink-500">
                {w.transliteration} — {w.meaning}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* কুইজ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <LetterQuiz letter={letter} />
      </motion.div>

      {/* আগের/পরের অক্ষর নেভিগেশন */}
      <div className="flex items-center justify-between border-t border-ink-100 pt-4">
        {prev ? (
          <Link
            href={`/quran-learning/arabic-alphabet/${prev.id}`}
            className="flex items-center gap-1.5 text-sm font-medium text-primary-700"
          >
            <ChevronLeft size={16} />
            <span className="font-arabic-text text-lg">{prev.letter}</span> {prev.nameBengali}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/quran-learning/arabic-alphabet/${next.id}`}
            className="flex items-center gap-1.5 text-sm font-medium text-primary-700"
          >
            {next.nameBengali} <span className="font-arabic-text text-lg">{next.letter}</span>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
