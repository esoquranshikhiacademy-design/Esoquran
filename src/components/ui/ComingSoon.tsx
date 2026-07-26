"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Construction, ArrowLeft } from "lucide-react";

export function ComingSoon({
  title,
  description,
  phaseNote,
}: {
  title: string;
  description: string;
  phaseNote: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
          <Construction size={26} />
        </div>
        <h1 className="text-2xl font-bold text-primary-950">{title}</h1>
        <p className="mt-2 text-sm text-ink-500">{description}</p>
        <p className="mt-4 rounded-lg bg-primary-50 px-4 py-2 text-xs text-primary-700">
          {phaseNote}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700"
        >
          <ArrowLeft size={14} />
          হোমে ফিরে যান
        </Link>
      </motion.div>
    </div>
  );
}
