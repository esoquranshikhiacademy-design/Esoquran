"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CentralQuizQuestion } from "@/lib/services/quizService";

export function QuizCenterCard({ question }: { question: CentralQuizQuestion }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedBool, setSelectedBool] = useState<boolean | null>(null);
  const [shortAnswerText, setShortAnswerText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleMcqSelect(index: number) {
    if (isSubmitted) return;
    setSelectedOption(index);
    setIsSubmitted(true);
  }

  function handleBoolSelect(value: boolean) {
    if (isSubmitted) return;
    setSelectedBool(value);
    setIsSubmitted(true);
  }

  function handleShortAnswerSubmit() {
    if (shortAnswerText.trim().length === 0) return;
    setIsSubmitted(true);
  }

  return (
    <div className="rounded-xl border border-primary-100 bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
          {question.courseTitle}
        </span>
        <span className="text-xs text-ink-400">
          {question.type === "mcq" ? "MCQ" : question.type === "true_false" ? "সত্য/মিথ্যা" : "সংক্ষিপ্ত"}
        </span>
      </div>

      <p className="mb-3 flex items-start gap-2 text-sm font-medium text-ink-800">
        <HelpCircle size={15} className="mt-0.5 shrink-0 text-primary-600" />
        {question.questionText}
      </p>

      {question.type === "mcq" && (
        <div className="space-y-2 pl-6">
          {(question.options ?? []).map((option, index) => {
            const isCorrect = index === question.correctOptionIndex;
            const isThisSelected = selectedOption === index;
            let stateClass = "border-ink-100 hover:bg-ink-50";
            if (isSubmitted && isCorrect) stateClass = "border-primary-500 bg-primary-50 text-primary-800";
            else if (isSubmitted && isThisSelected && !isCorrect) stateClass = "border-red-400 bg-red-50 text-red-700";

            return (
              <button
                key={index}
                onClick={() => handleMcqSelect(index)}
                disabled={isSubmitted}
                className={cn("flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors", stateClass)}
              >
                {isSubmitted && isThisSelected && (isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />)}
                {option}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "true_false" && (
        <div className="flex gap-2 pl-6">
          {[true, false].map((val) => {
            const isCorrect = val === question.correctBoolAnswer;
            const isThisSelected = selectedBool === val;
            let stateClass = "border-ink-100 text-ink-600 hover:bg-ink-50";
            if (isSubmitted && isCorrect) stateClass = "border-primary-500 bg-primary-50 text-primary-800";
            else if (isSubmitted && isThisSelected && !isCorrect) stateClass = "border-red-400 bg-red-50 text-red-700";

            return (
              <button
                key={String(val)}
                onClick={() => handleBoolSelect(val)}
                disabled={isSubmitted}
                className={cn("rounded-lg border px-4 py-2 text-sm font-medium transition-colors", stateClass)}
              >
                {val ? "সত্য" : "মিথ্যা"}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "short_answer" && (
        <div className="pl-6">
          <textarea
            rows={2}
            placeholder="আপনার উত্তর লিখুন..."
            value={shortAnswerText}
            onChange={(e) => setShortAnswerText(e.target.value)}
            disabled={isSubmitted}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none ring-primary-500 focus:ring-2 disabled:bg-ink-50"
          />
          {!isSubmitted && (
            <button
              onClick={handleShortAnswerSubmit}
              className="mt-2 rounded-lg bg-primary-700 px-3 py-1.5 text-xs font-medium text-white"
            >
              জমা দিন
            </button>
          )}
          {isSubmitted && (
            <p className="mt-2 text-xs text-gold-700">
              এই ধরনের উত্তর স্ব-মূল্যায়নের জন্য - কোনো নির্দিষ্ট "সঠিক উত্তর" নেই, নিজের বোঝাপড়া যাচাই করুন
            </p>
          )}
        </div>
      )}
    </div>
  );
}
