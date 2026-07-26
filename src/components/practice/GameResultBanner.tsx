"use client";

import { motion } from "framer-motion";
import { Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function GameResultBanner({
  score,
  total,
  onReplay,
  extraInfo,
}: {
  score: number;
  total: number;
  onReplay: () => void;
  extraInfo?: string;
}) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center rounded-2xl border border-primary-100 bg-primary-50 p-6 text-center"
    >
      <Trophy className="mb-2 text-gold-500" size={32} />
      <p className="text-2xl font-bold text-primary-900">
        {score}/{total}
      </p>
      <p className="text-sm text-ink-500">সঠিক উত্তর ({percent}%)</p>
      {extraInfo && <p className="mt-1 text-xs text-ink-400">{extraInfo}</p>}
      <Button onClick={onReplay} variant="outline" className="mt-4 w-auto px-6">
        <RotateCcw size={14} /> আবার খেলুন
      </Button>
    </motion.div>
  );
}
