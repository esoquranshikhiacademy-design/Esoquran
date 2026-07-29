"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HeroBannerSlider } from "@/components/home/HeroBannerSlider";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white py-10 sm:py-16">
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন - জ্যামিতিক ইসলামিক প্যাটার্নের অনুভূতি */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-200/40 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* হিরো ব্যানার স্লাইডার */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <HeroBannerSlider />
      </motion.div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-bold leading-tight text-primary-950 sm:text-5xl lg:text-6xl"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-5 max-w-2xl text-base text-ink-600 sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/quran-learning"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-700/20 transition-all hover:bg-primary-800 sm:w-auto"
          >
            {t.hero.cta}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/self-assessment"
            className="w-full rounded-full border border-primary-300 px-6 py-3 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-50 sm:w-auto"
          >
            {t.hero.ctaSecondary}
          </Link>
        </motion.div>

        {/* আরবি ক্যালিগ্রাফি অনুভূতি - বিসমিল্লাহ স্টাইল টেক্সট */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-arabic-text mt-10 text-2xl text-primary-700/70 sm:text-3xl"
          dir="rtl"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>
      </div>
    </section>
  );
}
