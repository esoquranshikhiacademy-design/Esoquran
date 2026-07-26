"use client";

import { motion } from "framer-motion";
import {
  PlayCircle,
  ClipboardCheck,
  BarChart3,
  BookMarked,
  GraduationCap,
  Dumbbell,
  HelpCircle,
  Video,
  Award,
  ArrowRightCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ICONS = [
  PlayCircle,
  ClipboardCheck,
  BarChart3,
  BookMarked,
  GraduationCap,
  Dumbbell,
  HelpCircle,
  Video,
  Award,
  ArrowRightCircle,
];

export function LearningJourney() {
  const { t } = useLanguage();

  return (
    <section className="bg-primary-50/50 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-2xl font-bold text-primary-950 sm:text-3xl"
        >
          {t.journey.title}
        </motion.h2>

        <div className="relative">
          {/* সংযোগকারী রেখা - শুধু ডেস্কটপে */}
          <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-0.5 bg-primary-200 sm:block lg:left-1/2" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {t.journey.steps.map((step, index) => {
              const Icon = ICONS[index] ?? PlayCircle;
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="relative flex flex-col items-center rounded-2xl border border-primary-100 bg-white p-5 text-center shadow-sm"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <Icon size={22} />
                  </div>
                  <span className="text-xs font-semibold text-gold-600">
                    ধাপ {index + 1}
                  </span>
                  <p className="mt-1 text-sm font-medium text-ink-800">{step}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
