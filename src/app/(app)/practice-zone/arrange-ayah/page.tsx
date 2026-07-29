"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import { SURAHS } from "@/lib/data/surahs";
import { Button } from "@/components/ui/Button";
import { GameResultBanner } from "@/components/practice/GameResultBanner";
import { cn } from "@/lib/utils";

const ROUND_SIZE = 5;

interface ArrangeQuestion {
  key: string;
  correctWords: string[];
  shuffledWords: { id: string; text: string }[];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestions(): ArrangeQuestion[] {
  const candidates: ArrangeQuestion[] = [];
  SURAHS.forEach((surah) => {
    surah.ayahs.forEach((ayah) => {
      const fullText = ayah.segments.map((s) => s.text).join("");
      const words = fullText.trim().split(/\s+/);
      if (words.length < 2 || words.length > 6) return; // খুব ছোট/বড় আয়াত বাদ (গেমটা ম্যানেজযোগ্য রাখতে)

      candidates.push({
        key: `${surah.id}-${ayah.number}`,
        correctWords: words,
        shuffledWords: shuffle(words.map((w, i) => ({ id: `${i}-${w}`, text: w }))),
      });
    });
  });

  return shuffle(candidates).slice(0, ROUND_SIZE);
}

export default function ArrangeAyahGame() {
  const [questions, setQuestions] = useState<ArrangeQuestion[]>(() => buildQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedWords, setPlacedWords] = useState<{ id: string; text: string }[]>([]);
  const [availableWords, setAvailableWords] = useState(questions[0]?.shuffledWords ?? []);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
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

  function addWord(word: { id: string; text: string }) {
    if (feedback) return;
    setPlacedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((w) => w.id !== word.id));
  }

  function removeWord(word: { id: string; text: string }) {
    if (feedback) return;
    setAvailableWords((prev) => [...prev, word]);
    setPlacedWords((prev) => prev.filter((w) => w.id !== word.id));
  }

  function checkAnswer() {
    const placedTexts = placedWords.map((w) => w.text);
    const isCorrect = placedTexts.join(" ") === current.correctWords.join(" ");
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setIsFinished(true);
      } else {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setPlacedWords([]);
        setAvailableWords(questions[nextIndex].shuffledWords);
        setFeedback(null);
      }
    }, 1400);
  }

  function replay() {
    const newQuestions = buildQuestions();
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setPlacedWords([]);
    setAvailableWords(newQuestions[0]?.shuffledWords ?? []);
    setScore(0);
    setFeedback(null);
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

      <h1 className="mb-1 text-xl font-bold text-primary-950">Arrange Ayah</h1>
      <p className="mb-6 text-sm text-ink-500">শব্দগুলোতে ট্যাপ করে সঠিক ক্রমে আয়াত সাজান</p>

      {isFinished ? (
        <GameResultBanner score={score} total={questions.length} onReplay={replay} />
      ) : (
        <motion.div
          key={current.key}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="mb-3 text-center text-xs text-ink-400">
            প্রশ্ন {currentIndex + 1}/{questions.length}
          </p>

          {/* উত্তর এলাকা */}
          <div
            className={cn(
              "mb-4 flex min-h-[4rem] flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4",
              feedback === "correct" && "border-primary-500 bg-primary-50",
              feedback === "wrong" && "border-red-400 bg-red-50",
              !feedback && "border-primary-200 bg-white"
            )}
            dir="rtl"
          >
            {placedWords.length === 0 && (
              <span className="text-sm text-ink-300">শব্দ বাছাই করে এখানে সাজান</span>
            )}
            {placedWords.map((word) => (
              <button
                key={word.id}
                onClick={() => removeWord(word)}
                disabled={!!feedback}
                className="font-arabic-text flex items-center gap-1 rounded-lg bg-primary-100 px-3 py-1.5 text-lg text-primary-900"
              >
                {word.text}
                {!feedback && <X size={12} />}
              </button>
            ))}
          </div>

          {feedback === "wrong" && (
            <p className="mb-3 text-center text-xs text-red-600">
              সঠিক ক্রম: {current.correctWords.join(" ")}
            </p>
          )}

          {/* উপলব্ধ শব্দ */}
          <div className="flex flex-wrap justify-center gap-2" dir="rtl">
            {availableWords.map((word) => (
              <button
                key={word.id}
                onClick={() => addWord(word)}
                disabled={!!feedback}
                className="font-arabic-text rounded-lg border border-ink-100 bg-white px-3 py-1.5 text-lg hover:bg-ink-50"
              >
                {word.text}
              </button>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <Button
              onClick={checkAnswer}
              disabled={availableWords.length > 0 || !!feedback}
              className="w-auto px-8"
            >
              মিলিয়ে দেখুন
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
