"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2, XCircle } from "lucide-react";
import { SURAHS } from "@/lib/data/surahs";
import { GameResultBanner } from "@/components/practice/GameResultBanner";
import { cn } from "@/lib/utils";

const ROUND_SIZE = 6;

interface Question {
  key: string;
  fullWords: string[];
  blankIndex: number;
  correctWord: string;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestions(): Question[] {
  // সব আয়াত থেকে ৩+ শব্দবিশিষ্ট আয়াত বেছে একটা শব্দ ফাঁকা করে প্রশ্ন তৈরি করা হচ্ছে
  const allWordPools: string[] = [];
  SURAHS.forEach((s) =>
    s.ayahs.forEach((a) =>
      a.segments.forEach((seg) =>
        seg.text
          .trim()
          .split(/\s+/)
          .forEach((w) => allWordPools.push(w))
      )
    )
  );

  const candidates: Question[] = [];
  SURAHS.forEach((surah) => {
    surah.ayahs.forEach((ayah) => {
      const fullText = ayah.segments.map((s) => s.text).join("");
      const words = fullText.trim().split(/\s+/);
      if (words.length < 3) return;

      const blankIndex = Math.floor(Math.random() * words.length);
      const correctWord = words[blankIndex];

      // ভুল অপশন হিসেবে অন্য এলোমেলো শব্দ বাছাই (correctWord বাদ দিয়ে)
      const wrongOptions = shuffle(allWordPools.filter((w) => w !== correctWord)).slice(0, 3);

      candidates.push({
        key: `${surah.id}-${ayah.number}`,
        fullWords: words,
        blankIndex,
        correctWord,
        options: shuffle([correctWord, ...wrongOptions]),
      });
    });
  });

  return shuffle(candidates).slice(0, ROUND_SIZE);
}

export default function MissingLetterGame() {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const current = questions[currentIndex];

  if (!current) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-ink-500">এই মুহূর্তে পর্যাপ্ত আয়াত ডেটা পাওয়া যায়নি।</p>
        <Link href="/practice-zone" className="mt-3 inline-block text-sm font-semibold text-primary-700">
          প্র্যাকটিস জোনে ফিরে যান
        </Link>
      </div>
    );
  }

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === current.correctWord) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setIsFinished(true);
      } else {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
      }
    }, 900);
  }

  function replay() {
    setQuestions(buildQuestions());
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setIsFinished(false);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <Link
        href="/practice-zone"
        className="mb-4 flex items-center gap-1 text-sm font-medium text-primary-700"
      >
        <ChevronLeft size={16} /> প্র্যাকটিস জোন
      </Link>

      <h1 className="mb-1 text-xl font-bold text-primary-950">Missing Letter</h1>
      <p className="mb-6 text-sm text-ink-500">আয়াতের ফাঁকা জায়গায় সঠিক শব্দ বসান</p>

      {isFinished ? (
        <GameResultBanner score={score} total={questions.length} onReplay={replay} />
      ) : (
        <motion.div
          key={current.key}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-primary-100 bg-white p-5"
        >
          <p className="mb-2 text-center text-xs text-ink-400">
            প্রশ্ন {currentIndex + 1}/{questions.length}
          </p>
          <p className="font-arabic-text text-center text-2xl leading-loose text-ink-900" dir="rtl">
            {current.fullWords.map((word, i) =>
              i === current.blankIndex ? (
                <span
                  key={i}
                  className={cn(
                    "mx-1 inline-block min-w-[3rem] rounded-lg border-b-2 px-2",
                    selected
                      ? selected === current.correctWord
                        ? "border-primary-600 bg-primary-50"
                        : "border-red-400 bg-red-50"
                      : "border-gold-400 bg-gold-50"
                  )}
                >
                  {selected ?? "____"}
                </span>
              ) : (
                <span key={i}> {word} </span>
              )
            )}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {current.options.map((option) => {
              const isThisSelected = selected === option;
              const isCorrectOption = option === current.correctWord;
              let stateClass = "border-ink-100 hover:bg-ink-50";
              if (selected && isCorrectOption) stateClass = "border-primary-500 bg-primary-50";
              else if (selected && isThisSelected && !isCorrectOption)
                stateClass = "border-red-400 bg-red-50";

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={!!selected}
                  className={cn(
                    "font-arabic-text flex items-center justify-center gap-1.5 rounded-xl border py-3 text-lg transition-colors",
                    stateClass
                  )}
                >
                  {selected === option &&
                    (isCorrectOption ? (
                      <CheckCircle2 size={14} className="text-primary-600" />
                    ) : (
                      <XCircle size={14} className="text-red-500" />
                    ))}
                  {option}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
