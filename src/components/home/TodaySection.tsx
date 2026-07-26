"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { BookOpen, HandHeart, ScrollText, TrendingUp } from "lucide-react";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import type { DailyContent } from "@/types/content";

// Firestore এ আজকের কন্টেন্ট না থাকলে দেখানোর ফলব্যাক ডেটা
const FALLBACK_CONTENT: DailyContent = {
  date: "fallback",
  ayah: {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    bengali: "নিশ্চয়ই কষ্টের সাথে স্বস্তি রয়েছে।",
    reference: "সূরা আশ-শারহ, আয়াত ৬",
  },
  dua: {
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    bengali: "হে আমার রব, আমার জ্ঞান বৃদ্ধি করে দাও।",
    title: "জ্ঞান বৃদ্ধির দোয়া",
  },
  hadith: {
    bengali:
      "তোমাদের মধ্যে সর্বোত্তম ব্যক্তি সে, যে কুরআন শেখে এবং শিক্ষা দেয়।",
    reference: "সহীহ বুখারী",
  },
};

function cardVariants(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  };
}

export function TodaySection() {
  const { t } = useLanguage();
  const { user, profile } = useAuth();
  const [content, setContent] = useState<DailyContent>(FALLBACK_CONTENT);

  useEffect(() => {
    async function fetchTodayContent() {
      try {
        const today = new Date().toISOString().split("T")[0];
        const docRef = doc(db, "dailyContent", today);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setContent(snap.data() as DailyContent);
        }
        // না পাওয়া গেলে চুপচাপ FALLBACK_CONTENT থেকে যাবে - এরর দেখানোর দরকার নেই
      } catch {
        // Firestore এখনো সেটআপ না থাকলে বা নেটওয়ার্ক সমস্যা হলে fallback দেখানো হবে
      }
    }
    fetchTodayContent();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* আজকের আয়াত */}
        <motion.div
          {...cardVariants(0)}
          className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2 text-primary-700">
            <BookOpen size={18} />
            <span className="text-sm font-semibold">{t.todaySection.ayah}</span>
          </div>
          <p className="font-arabic-text mb-2 text-right text-lg text-primary-900">
            {content.ayah.arabic}
          </p>
          <p className="text-sm text-ink-600">{content.ayah.bengali}</p>
          <p className="mt-2 text-xs text-ink-400">{content.ayah.reference}</p>
        </motion.div>

        {/* আজকের দোয়া */}
        <motion.div
          {...cardVariants(0.1)}
          className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2 text-gold-600">
            <HandHeart size={18} />
            <span className="text-sm font-semibold">{t.todaySection.dua}</span>
          </div>
          <p className="font-arabic-text mb-2 text-right text-lg text-primary-900">
            {content.dua.arabic}
          </p>
          <p className="text-sm text-ink-600">{content.dua.bengali}</p>
          <p className="mt-2 text-xs text-ink-400">{content.dua.title}</p>
        </motion.div>

        {/* আজকের হাদিস */}
        <motion.div
          {...cardVariants(0.2)}
          className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2 text-primary-700">
            <ScrollText size={18} />
            <span className="text-sm font-semibold">{t.todaySection.hadith}</span>
          </div>
          <p className="text-sm text-ink-600">{content.hadith.bengali}</p>
          <p className="mt-2 text-xs text-ink-400">{content.hadith.reference}</p>
        </motion.div>

        {/* আজকের অগ্রগতি */}
        <motion.div
          {...cardVariants(0.3)}
          className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-700 to-primary-900 p-5 text-white shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp size={18} />
            <span className="text-sm font-semibold">{t.todaySection.progress}</span>
          </div>
          {user && profile ? (
            <div>
              <p className="text-3xl font-bold">{profile.streakDays} দিন</p>
              <p className="mt-1 text-sm text-primary-100">
                ধারাবাহিক শেখার স্ট্রিক চলছে
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-primary-100">
                আপনার অগ্রগতি ট্র্যাক করতে লগইন করুন
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
