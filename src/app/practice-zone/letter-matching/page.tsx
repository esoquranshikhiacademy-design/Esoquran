"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { ARABIC_LETTERS } from "@/lib/data/arabicLetters";
import { GameResultBanner } from "@/components/practice/GameResultBanner";
import { cn } from "@/lib/utils";

const ROUND_SIZE = 8;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRound() {
  const chosen = shuffle(ARABIC_LETTERS).slice(0, ROUND_SIZE);
  return {
    letters: shuffle(chosen),
    names: shuffle(chosen),
  };
}

export default function LetterMatchingGame() {
  const [round, setRound] = useState(() => buildRound());
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const score = matchedIds.size;

  function handleLetterClick(letterId: string) {
    if (matchedIds.has(letterId)) return;
    setSelectedLetterId(letterId);
  }

  function handleNameClick(letterId: string) {
    if (!selectedLetterId || matchedIds.has(letterId)) return;
    setAttempts((a) => a + 1);

    if (selectedLetterId === letterId) {
      const updated = new Set(matchedIds);
      updated.add(letterId);
      setMatchedIds(updated);
      setSelectedLetterId(null);

      if (updated.size === ROUND_SIZE) {
        setIsFinished(true);
      }
    } else {
      setWrongPair([selectedLetterId, letterId]);
      setTimeout(() => setWrongPair(null), 500);
      setSelectedLetterId(null);
    }
  }

  function replay() {
    setRound(buildRound());
    setSelectedLetterId(null);
    setMatchedIds(new Set());
    setWrongPair(null);
    setAttempts(0);
    setIsFinished(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link
        href="/practice-zone"
        className="mb-4 flex items-center gap-1 text-sm font-medium text-primary-700"
      >
        <ChevronLeft size={16} /> প্র্যাকটিস জোন
      </Link>

      <h1 className="mb-1 text-xl font-bold text-primary-950">Letter Matching</h1>
      <p className="mb-6 text-sm text-ink-500">অক্ষরে ট্যাপ করুন, তারপর তার সঠিক নামে ট্যাপ করুন</p>

      {isFinished ? (
        <GameResultBanner
          score={score}
          total={ROUND_SIZE}
          onReplay={replay}
          extraInfo={`মোট চেষ্টা: ${attempts}`}
        />
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {/* অক্ষর কলাম */}
          <div className="space-y-2">
            {round.letters.map((letter) => {
              const isMatched = matchedIds.has(letter.id);
              const isSelected = selectedLetterId === letter.id;
              const isWrong = wrongPair?.[0] === letter.id;
              return (
                <button
                  key={letter.id}
                  onClick={() => handleLetterClick(letter.id)}
                  disabled={isMatched}
                  className={cn(
                    "font-arabic-text flex w-full items-center justify-center rounded-xl border py-3 text-2xl transition-colors",
                    isMatched && "border-primary-300 bg-primary-50 text-primary-300",
                    isSelected && "border-primary-600 bg-primary-100",
                    isWrong && "border-red-400 bg-red-50",
                    !isMatched && !isSelected && !isWrong && "border-ink-100 hover:bg-ink-50"
                  )}
                >
                  {letter.letter}
                </button>
              );
            })}
          </div>

          {/* নাম কলাম */}
          <div className="space-y-2">
            {round.names.map((letter) => {
              const isMatched = matchedIds.has(letter.id);
              const isWrong = wrongPair?.[1] === letter.id;
              return (
                <button
                  key={letter.id}
                  onClick={() => handleNameClick(letter.id)}
                  disabled={isMatched}
                  className={cn(
                    "flex w-full items-center justify-center gap-1.5 rounded-xl border py-3 text-sm transition-colors",
                    isMatched && "border-primary-300 bg-primary-50 text-primary-300",
                    isWrong && "border-red-400 bg-red-50",
                    !isMatched && !isWrong && "border-ink-100 hover:bg-ink-50"
                  )}
                >
                  {isMatched && <CheckCircle2 size={13} />}
                  {letter.nameBengali}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!isFinished && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-ink-400"
        >
          মিলেছে: {score}/{ROUND_SIZE}
        </motion.p>
      )}
    </div>
  );
}
