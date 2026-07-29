"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Reorder } from "framer-motion";
import { ChevronLeft, CheckCircle2, GripVertical } from "lucide-react";
import { ARABIC_LETTERS } from "@/lib/data/arabicLetters";
import type { ArabicLetter } from "@/types/arabicAlphabet";
import { Button } from "@/components/ui/Button";
import { GameResultBanner } from "@/components/practice/GameResultBanner";
import { cn } from "@/lib/utils";

const ROUND_SIZE = 6;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRound(): ArabicLetter[] {
  // ধারাবাহিক ২৯টা অক্ষর থেকে যেকোনো একটা শুরুর পয়েন্ট বেছে একটা টানা অংশ নেওয়া হচ্ছে,
  // এতে ক্রমটা যৌক্তিক থাকে (একদম এলোমেলো ৬টা অক্ষরের চেয়ে সাজানো সহজ)
  const maxStart = ARABIC_LETTERS.length - ROUND_SIZE;
  const start = Math.floor(Math.random() * (maxStart + 1));
  const sequence = ARABIC_LETTERS.slice(start, start + ROUND_SIZE);
  return shuffle(sequence);
}

export default function DragDropGame() {
  const [items, setItems] = useState<ArabicLetter[]>(() => buildRound());
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function checkOrder() {
    const sorted = [...items].every((item, i) => i === 0 || item.order > items[i - 1].order);
    setIsCorrect(sorted);
    setIsChecked(true);
  }

  function replay() {
    setItems(buildRound());
    setIsChecked(false);
    setIsCorrect(false);
  }

  const correctCount = items.filter(
    (item, i) => i === 0 || item.order > items[i - 1].order
  ).length;

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:px-6">
      <Link
        href="/practice-zone"
        className="mb-4 flex items-center gap-1 text-sm font-medium text-primary-700"
      >
        <ChevronLeft size={16} /> প্র্যাকটিস জোন
      </Link>

      <h1 className="mb-1 text-xl font-bold text-primary-950">Drag & Drop</h1>
      <p className="mb-6 text-sm text-ink-500">
        অক্ষরগুলো টেনে বর্ণমালার সঠিক ক্রমানুসারে সাজান
      </p>

      {isChecked ? (
        isCorrect ? (
          <GameResultBanner score={ROUND_SIZE} total={ROUND_SIZE} onReplay={replay} />
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-gold-200 bg-gold-50 p-6 text-center">
            <p className="text-lg font-semibold text-gold-800">এখনো সঠিক হয়নি</p>
            <p className="mt-1 text-sm text-ink-500">
              সঠিক অবস্থানে আছে: {correctCount}/{ROUND_SIZE}
            </p>
            <Button
              onClick={() => setIsChecked(false)}
              variant="outline"
              className="mt-4 w-auto px-6"
            >
              আবার সাজান
            </Button>
          </div>
        )
      ) : (
        <>
          <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
            {items.map((letter) => (
              <Reorder.Item
                key={letter.id}
                value={letter}
                className="flex items-center gap-3 rounded-xl border border-primary-100 bg-white p-3 shadow-sm active:cursor-grabbing"
              >
                <GripVertical size={16} className="shrink-0 text-ink-300" />
                <span className="font-arabic-text text-2xl text-primary-900">{letter.letter}</span>
                <span className="text-sm text-ink-500">{letter.nameBengali}</span>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <Button onClick={checkOrder} className="mt-5">
            মিলিয়ে দেখুন
          </Button>
        </>
      )}
    </div>
  );
}
