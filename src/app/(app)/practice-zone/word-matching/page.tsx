"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { ARABIC_LETTERS } from "@/lib/data/arabicLetters";
import { GameResultBanner } from "@/components/practice/GameResultBanner";
import { cn } from "@/lib/utils";

const ROUND_SIZE = 8;

interface WordItem {
  key: string; // ইউনিক আইডি (letterId + wordIndex)
  word: string;
  meaning: string;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildWordPool(): WordItem[] {
  const pool: WordItem[] = [];
  const seenMeanings = new Set<string>();

  ARABIC_LETTERS.forEach((letter) => {
    letter.exampleWords.forEach((w, i) => {
      // একই অর্থ (meaning) দ্বিতীয়বার এলে বাদ দেওয়া হচ্ছে - নাহলে একই রাউন্ডে
      // দুইটা ভিন্ন আরবি শব্দের winner অর্থ (যেমন "আলো") থাকলে মেলানো অস্পষ্ট হয়ে যায়
      if (seenMeanings.has(w.meaning)) return;
      seenMeanings.add(w.meaning);
      pool.push({ key: `${letter.id}-${i}`, word: w.word, meaning: w.meaning });
    });
  });
  return pool;
}

function buildRound() {
  const pool = buildWordPool();
  const chosen = shuffle(pool).slice(0, ROUND_SIZE);
  return {
    words: shuffle(chosen),
    meanings: shuffle(chosen),
  };
}

export default function WordMatchingGame() {
  const [round, setRound] = useState(() => buildRound());
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [matchedKeys, setMatchedKeys] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const score = matchedKeys.size;

  function handleWordClick(key: string) {
    if (matchedKeys.has(key)) return;
    setSelectedKey(key);
  }

  function handleMeaningClick(key: string) {
    if (!selectedKey || matchedKeys.has(key)) return;
    setAttempts((a) => a + 1);

    if (selectedKey === key) {
      const updated = new Set(matchedKeys);
      updated.add(key);
      setMatchedKeys(updated);
      setSelectedKey(null);
      if (updated.size === ROUND_SIZE) setIsFinished(true);
    } else {
      setWrongPair([selectedKey, key]);
      setTimeout(() => setWrongPair(null), 500);
      setSelectedKey(null);
    }
  }

  function replay() {
    setRound(buildRound());
    setSelectedKey(null);
    setMatchedKeys(new Set());
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

      <h1 className="mb-1 text-xl font-bold text-primary-950">Word Matching</h1>
      <p className="mb-6 text-sm text-ink-500">শব্দে ট্যাপ করুন, তারপর তার সঠিক অর্থে ট্যাপ করুন</p>

      {isFinished ? (
        <GameResultBanner
          score={score}
          total={ROUND_SIZE}
          onReplay={replay}
          extraInfo={`মোট চেষ্টা: ${attempts}`}
        />
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            {round.words.map((item) => {
              const isMatched = matchedKeys.has(item.key);
              const isSelected = selectedKey === item.key;
              const isWrong = wrongPair?.[0] === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleWordClick(item.key)}
                  disabled={isMatched}
                  className={cn(
                    "font-arabic-text flex w-full items-center justify-center rounded-xl border py-3 text-lg transition-colors",
                    isMatched && "border-primary-300 bg-primary-50 text-primary-300",
                    isSelected && "border-primary-600 bg-primary-100",
                    isWrong && "border-red-400 bg-red-50",
                    !isMatched && !isSelected && !isWrong && "border-ink-100 hover:bg-ink-50"
                  )}
                >
                  {item.word}
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            {round.meanings.map((item) => {
              const isMatched = matchedKeys.has(item.key);
              const isWrong = wrongPair?.[1] === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleMeaningClick(item.key)}
                  disabled={isMatched}
                  className={cn(
                    "flex w-full items-center justify-center gap-1.5 rounded-xl border py-3 text-sm transition-colors",
                    isMatched && "border-primary-300 bg-primary-50 text-primary-300",
                    isWrong && "border-red-400 bg-red-50",
                    !isMatched && !isWrong && "border-ink-100 hover:bg-ink-50"
                  )}
                >
                  {isMatched && <CheckCircle2 size={13} />}
                  {item.meaning}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!isFinished && (
        <p className="mt-4 text-center text-sm text-ink-400">
          মিলেছে: {score}/{ROUND_SIZE}
        </p>
      )}
    </div>
  );
}
