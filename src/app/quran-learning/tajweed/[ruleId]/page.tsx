"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertTriangle, BookOpenText } from "lucide-react";
import { getTajweedRuleById, getAdjacentTajweedRules } from "@/lib/data/tajweedRules";
import { TajweedExampleCard } from "@/components/tajweed/TajweedExampleCard";
import { TajweedRuleQuiz } from "@/components/tajweed/TajweedRuleQuiz";

export default function TajweedRuleDetailPage() {
  const params = useParams();
  const ruleId = params.ruleId as string;
  const rule = getTajweedRuleById(ruleId);

  if (!rule) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-ink-500">এই নিয়মটি খুঁজে পাওয়া যায়নি।</p>
        <Link
          href="/quran-learning/tajweed"
          className="mt-3 inline-block text-sm font-semibold text-primary-700"
        >
          সব তাজবীদ নিয়ম দেখুন
        </Link>
      </div>
    );
  }

  const { prev, next } = getAdjacentTajweedRules(rule.order);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <Link
          href="/quran-learning/tajweed"
          className="flex items-center gap-1 text-sm font-medium text-primary-700"
        >
          <ChevronLeft size={16} /> সব নিয়ম
        </Link>
        <span className="text-xs text-ink-400">{rule.order}/৭</span>
      </motion.div>

      {/* হেডার */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6 rounded-2xl p-5 text-center text-white"
        style={{ backgroundColor: rule.color }}
      >
        <p className="text-sm opacity-90">{rule.nameArabic}</p>
        <h1 className="mt-1 text-2xl font-bold">{rule.nameBengali}</h1>
        <p className="mt-2 text-sm opacity-90">{rule.shortDescription}</p>
      </motion.div>

      {/* বিস্তারিত বিবরণ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 rounded-2xl border border-primary-100 bg-white p-5"
      >
        <p className="text-sm leading-relaxed text-ink-700">{rule.fullDescription}</p>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold text-ink-500">প্রযোজ্য অক্ষরসমূহ</p>
          <div className="flex flex-wrap gap-2">
            {rule.applicableLetters.map((letter, i) => (
              <span
                key={i}
                className="font-arabic-text flex h-9 w-9 items-center justify-center rounded-lg text-lg"
                style={{ backgroundColor: `${rule.color}20`, color: rule.color }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* উদাহরণ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4"
      >
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-800">
          <BookOpenText size={15} /> উদাহরণ
        </p>
        <div className="space-y-3">
          {rule.examples.map((ex, i) => (
            <TajweedExampleCard key={i} example={ex} color={rule.color} />
          ))}
        </div>
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
          {rule.commonMistakes.map((mistake, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              {mistake}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* কুইজ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <TajweedRuleQuiz rule={rule} />
      </motion.div>

      {/* নেভিগেশন */}
      <div className="flex items-center justify-between border-t border-ink-100 pt-4">
        {prev ? (
          <Link
            href={`/quran-learning/tajweed/${prev.id}`}
            className="flex items-center gap-1.5 text-sm font-medium text-primary-700"
          >
            <ChevronLeft size={16} /> {prev.nameBengali}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/quran-learning/tajweed/${next.id}`}
            className="flex items-center gap-1.5 text-sm font-medium text-primary-700"
          >
            {next.nameBengali} <ChevronRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
