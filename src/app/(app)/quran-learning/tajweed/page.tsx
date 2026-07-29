"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TAJWEED_RULES } from "@/lib/data/tajweedRules";

export default function TajweedLabPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">তাজবীদ ল্যাব</h1>
        <p className="mt-2 text-sm text-ink-500">
          তাজবীদের ৭টি মূল নিয়ম - উদাহরণ, সাধারণ ভুল ও কুইজ সহ
        </p>
      </motion.div>

      <div className="space-y-3">
        {TAJWEED_RULES.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={`/quran-learning/tajweed/${rule.id}`}
              className="flex items-center gap-3 rounded-2xl border border-primary-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
                style={{ backgroundColor: rule.color }}
              >
                {rule.order}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-800">{rule.nameBengali}</p>
                <p className="mt-0.5 truncate text-sm text-ink-500">{rule.shortDescription}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
