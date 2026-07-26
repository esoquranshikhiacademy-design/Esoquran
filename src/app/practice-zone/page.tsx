"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Puzzle,
  BookOpenCheck,
  Move,
  Headphones,
  Grid3x3,
  Zap,
  PenLine,
  ListOrdered,
} from "lucide-react";
import { GAMES } from "@/types/practice";
import type { GameId } from "@/types/practice";

const GAME_ICON: Record<GameId, typeof Puzzle> = {
  "letter-matching": Puzzle,
  "word-matching": BookOpenCheck,
  "drag-drop": Move,
  "listening-test": Headphones,
  "memory-game": Grid3x3,
  "speed-reading": Zap,
  "missing-letter": PenLine,
  "arrange-ayah": ListOrdered,
};

export default function PracticeZonePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">প্র্যাকটিস জোন</h1>
        <p className="mt-2 text-sm text-ink-500">
          মজার ইন্টারেক্টিভ গেম খেলে আপনার শেখা ঝালিয়ে নিন
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {GAMES.map((game, index) => {
          const Icon = GAME_ICON[game.id];
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={`flex items-start gap-3 rounded-2xl border p-5 transition-shadow ${
                game.available
                  ? "border-primary-100 bg-white shadow-sm hover:shadow-md"
                  : "border-dashed border-ink-200 bg-ink-50/50 opacity-70"
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <Icon size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-800">{game.titleBengali}</p>
                <p className="mt-1 text-sm text-ink-500">{game.description}</p>
                <span className="mt-2 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-xs text-primary-600">
                  {game.dataSource}
                </span>
                {!game.available && (
                  <span className="mt-2 ml-1.5 inline-block rounded-full bg-gold-50 px-2 py-0.5 text-xs text-gold-700">
                    শীঘ্রই আসছে
                  </span>
                )}
              </div>
            </motion.div>
          );

          return game.available ? (
            <Link key={game.id} href={game.href}>
              {content}
            </Link>
          ) : (
            <div key={game.id}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
