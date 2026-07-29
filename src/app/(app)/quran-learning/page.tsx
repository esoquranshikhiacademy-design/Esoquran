"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Type, Mic2, BookMarked, BookOpenCheck, ArrowRight, Puzzle, HelpCircle } from "lucide-react";

const MODULES = [
  {
    href: "/quran-learning/arabic-alphabet",
    icon: Type,
    title: "আরবি বর্ণমালা স্টুডিও",
    description: "২৯টা আরবি অক্ষর - লেখার নিয়ম, মাখরাজ, উদাহরণ শব্দ ও কুইজ",
    available: true,
  },
  {
    href: "/quran-learning/makhraj",
    icon: Mic2,
    title: "মাখরাজ স্টুডিও",
    description: "উচ্চারণস্থলের ইন্টারেক্টিভ ডায়াগ্রাম ও বিস্তারিত ব্যাখ্যা",
    available: true,
  },
  {
    href: "/quran-learning/tajweed",
    icon: BookMarked,
    title: "তাজবীদ ল্যাব",
    description: "তাজবীদের নিয়মকানুন, উদাহরণ ও অনুশীলন",
    available: true,
  },
  {
    href: "/quran-learning/reading-lab",
    icon: BookOpenCheck,
    title: "কুরআন রিডিং ল্যাব",
    description: "রঙিন তাজবীদ হাইলাইট সহ কুরআন পাঠের অনুশীলন",
    available: true,
  },
  {
    href: "/practice-zone",
    icon: Puzzle,
    title: "প্র্যাকটিস জোন",
    description: "৮টা মজার গেম দিয়ে শেখা ঝালিয়ে নিন",
    available: true,
  },
  {
    href: "/quiz-center",
    icon: HelpCircle,
    title: "কুইজ সেন্টার",
    description: "সব কোর্সের কুইজ প্রশ্ন এক জায়গায়",
    available: true,
  },
];

export default function QuranLearningHubPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">কুরআন শিক্ষা</h1>
        <p className="mt-2 text-sm text-ink-500">
          একদম শুরু থেকে সঠিক তাজবীদ পর্যন্ত ধাপে ধাপে শিখুন
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MODULES.map((module, index) => {
          const Icon = module.icon;
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`flex items-start gap-3 rounded-2xl border p-5 transition-shadow ${
                module.available
                  ? "border-primary-100 bg-white shadow-sm hover:shadow-md"
                  : "border-dashed border-ink-200 bg-ink-50/50 opacity-70"
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <Icon size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-800">{module.title}</p>
                <p className="mt-1 text-sm text-ink-500">{module.description}</p>
                {!module.available && (
                  <span className="mt-2 inline-block rounded-full bg-gold-50 px-2 py-0.5 text-xs text-gold-700">
                    শীঘ্রই আসছে
                  </span>
                )}
              </div>
              {module.available && (
                <ArrowRight size={16} className="mt-1 shrink-0 text-primary-400" />
              )}
            </motion.div>
          );

          return module.available ? (
            <Link key={module.href} href={module.href}>
              {content}
            </Link>
          ) : (
            <div key={module.href}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
