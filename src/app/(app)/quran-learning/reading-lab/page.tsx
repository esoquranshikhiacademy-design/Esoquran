"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { SURAHS } from "@/lib/data/surahs";

export default function ReadingLabPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">কুরআন রিডিং ল্যাব</h1>
        <p className="mt-2 text-sm text-ink-500">
          রঙিন তাজবীদ হাইলাইট সহ কুরআন পাঠের অনুশীলন করুন
        </p>
      </motion.div>

      <div className="mb-4 rounded-xl bg-gold-50 p-3 text-center text-xs text-gold-700">
        এই মুহূর্তে {SURAHS.length}টি সূরা উপলব্ধ। বাকি সূরাগুলো শীঘ্রই যুক্ত হবে।
      </div>

      <div className="space-y-3">
        {SURAHS.map((surah, index) => (
          <motion.div
            key={surah.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
          >
            <Link
              href={`/quran-learning/reading-lab/${surah.id}`}
              className="flex items-center gap-3 rounded-2xl border border-primary-100 bg-white p-4 shadow-sm hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <BookOpen size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-ink-800">{surah.nameBengali}</p>
                  <span className="font-arabic-text text-lg text-primary-800">
                    {surah.nameArabic}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-ink-400">
                  {surah.totalAyahs} আয়াত • {surah.revelationType === "makki" ? "মাক্কী" : "মাদানী"}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
                #{surah.number}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
