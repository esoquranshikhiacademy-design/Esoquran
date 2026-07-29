"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Type,
  Mic2,
  BookMarked,
  BookOpenCheck,
  Puzzle,
  type LucideIcon,
} from "lucide-react";

interface Slide {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SLIDES: Slide[] = [
  {
    icon: Type,
    title: "আরবি বর্ণমালা শিখুন",
    description: "২৯টা আরবি অক্ষর - সঠিক লেখা, মাখরাজ ও উদাহরণসহ ধাপে ধাপে",
  },
  {
    icon: Mic2,
    title: "মাখরাজ প্রশিক্ষণ",
    description: "উচ্চারণস্থলের ইন্টারেক্টিভ ডায়াগ্রাম ও বিস্তারিত ব্যাখ্যা",
  },
  {
    icon: BookMarked,
    title: "তাজবীদের নিয়ম",
    description: "তাজবীদের নিয়মকানুন, উদাহরণ ও নিয়মিত অনুশীলন",
  },
  {
    icon: BookOpenCheck,
    title: "কুরআন পাঠ অনুশীলন",
    description: "রঙিন তাজবীদ হাইলাইট সহ কুরআন তেলাওয়াতের চর্চা",
  },
  {
    icon: Puzzle,
    title: "মজার প্র্যাকটিস গেম",
    description: "গেম খেলে খেলে শেখা ঝালিয়ে নিন",
  },
];

const AUTO_ROTATE_MS = 4500;

export function HeroBannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];
  const Icon = slide.icon;

  return (
    <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
      <div className="relative h-44 overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-gold-50 shadow-sm sm:h-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-700 text-white">
              <Icon size={22} />
            </div>
            <h3 className="text-lg font-bold text-primary-950">{slide.title}</h3>
            <p className="max-w-sm text-sm text-ink-600">{slide.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ডট ইন্ডিকেটর */}
      <div className="mt-3 flex justify-center gap-1.5">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-primary-700" : "w-1.5 bg-primary-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
