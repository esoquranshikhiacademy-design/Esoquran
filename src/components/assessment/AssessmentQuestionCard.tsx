"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AssessmentQuestion } from "@/types/assessment";
import { cn } from "@/lib/utils";

const DIFFICULTY_LABEL = {
  easy: "সহজ",
  medium: "মধ্যম",
  hard: "কঠিন",
} as const;

const DIFFICULTY_COLOR = {
  easy: "bg-primary-50 text-primary-700",
  medium: "bg-gold-50 text-gold-700",
  hard: "bg-red-50 text-red-600",
} as const;

export function AssessmentQuestionCard({
  question,
  onAnswer,
}: {
  question: AssessmentQuestion;
  onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  function handleSelect(index: number) {
    if (isRevealed) return;
    setSelected(index);
    setIsRevealed(true);

    const isCorrect = index === question.correctOptionIndex;
    // সংক্ষিপ্ত বিরতি দিয়ে সঠিক/ভুল দেখিয়ে তারপর পরের প্রশ্নে যাওয়া -
    // এতে ইউজার নিজের ভুল বুঝতে পারবে, কিন্তু প্রবাহ থেমে যাবে না
    setTimeout(() => {
      onAnswer(index, isCorrect);
    }, 900);
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm"
      >
        <span
          className={cn(
            "mb-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
            DIFFICULTY_COLOR[question.difficulty]
          )}
        >
          {DIFFICULTY_LABEL[question.difficulty]}
        </span>

        <p className="mb-4 text-base font-medium text-ink-900">{question.questionText}</p>

        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isThisSelected = selected === index;
            const isCorrectOption = index === question.correctOptionIndex;

            let stateClass = "border-ink-100 hover:bg-ink-50";
            if (isRevealed && isCorrectOption) {
              stateClass = "border-primary-500 bg-primary-50 text-primary-800";
            } else if (isRevealed && isThisSelected && !isCorrectOption) {
              stateClass = "border-red-400 bg-red-50 text-red-700";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={isRevealed}
                className={cn(
                  "w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-colors",
                  stateClass
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
