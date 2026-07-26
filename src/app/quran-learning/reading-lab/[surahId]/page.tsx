"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Languages, Palette } from "lucide-react";
import { getSurahById } from "@/lib/data/surahs";
import { AyahDisplay } from "@/components/reading-lab/AyahDisplay";
import { ReadingModeSelector } from "@/components/reading-lab/ReadingModeSelector";
import type { ReadingMode } from "@/types/quranReading";

export default function SurahReadingPage() {
  const params = useParams();
  const surahId = params.surahId as string;
  const surah = getSurahById(surahId);

  const [readingMode, setReadingMode] = useState<ReadingMode>("normal");
  const [showTranslation, setShowTranslation] = useState(true);

  if (!surah) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-ink-500">এই সূরাটি খুঁজে পাওয়া যায়নি।</p>
        <Link
          href="/quran-learning/reading-lab"
          className="mt-3 inline-block text-sm font-semibold text-primary-700"
        >
          সব সূরা দেখুন
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <Link
          href="/quran-learning/reading-lab"
          className="flex items-center gap-1 text-sm font-medium text-primary-700"
        >
          <ChevronLeft size={16} /> সব সূরা
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-5 text-center"
      >
        <span className="font-arabic-text text-3xl text-primary-900">{surah.nameArabic}</span>
        <h1 className="mt-1 text-xl font-bold text-primary-950">{surah.nameBengali}</h1>
        <p className="text-xs text-ink-400">
          {surah.totalAyahs} আয়াত • {surah.revelationType === "makki" ? "মাক্কী" : "মাদানী"}
        </p>
      </motion.div>

      {/* কন্ট্রোল */}
      <div className="mb-5 space-y-3">
        <ReadingModeSelector activeMode={readingMode} onSelect={setReadingMode} />
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setShowTranslation((v) => !v)}
            className="flex items-center gap-1.5 rounded-full border border-primary-200 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50"
          >
            <Languages size={13} />
            {showTranslation ? "অনুবাদ লুকান" : "অনুবাদ দেখান"}
          </button>
          <Link
            href="/quran-learning/tajweed"
            className="flex items-center gap-1.5 rounded-full border border-gold-200 px-3 py-1.5 text-xs font-medium text-gold-700 hover:bg-gold-50"
          >
            <Palette size={13} /> রঙের অর্থ জানুন
          </Link>
        </div>
      </div>

      {/* আয়াতসমূহ */}
      <div className="space-y-3">
        {surah.ayahs.map((ayah) => (
          <AyahDisplay
            key={ayah.number}
            ayah={ayah}
            readingMode={readingMode}
            showTranslation={showTranslation}
          />
        ))}
      </div>
    </div>
  );
}
