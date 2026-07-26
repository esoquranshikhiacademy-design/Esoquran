"use client";

import { useState } from "react";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { QuizQuestion, QuizAnswer } from "@/types/quiz";

export function LessonQuiz({
  questions,
  onSubmit,
  isSubmitting,
  result,
}: {
  questions: QuizQuestion[];
  onSubmit: (answers: QuizAnswer[]) => void;
  isSubmitting: boolean;
  result: { autoScorePercent: number; hasShortAnswerPendingReview: boolean } | null;
}) {
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});

  if (questions.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-primary-200 bg-primary-50/50 p-6 text-center text-sm text-ink-500">
        এই লেসনে কোনো কুইজ যুক্ত নেই।
      </p>
    );
  }

  function updateAnswer(questionId: string, answer: QuizAnswer) {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }

  function handleSubmit() {
    const allAnswers = questions.map(
      (q) =>
        answers[q.id] ?? {
          questionId: q.id,
          type: q.type,
          isCorrect: null,
        }
    );
    onSubmit(allAnswers);
  }

  const allAnswered = questions.every((q) => {
    const a = answers[q.id];
    if (!a) return false;
    if (q.type === "mcq") return a.selectedOptionIndex !== undefined;
    if (q.type === "true_false") return a.selectedBoolAnswer !== undefined;
    return (a.shortAnswerText ?? "").trim().length > 0;
  });

  if (result) {
    return (
      <div className="rounded-xl border border-primary-100 bg-primary-50 p-5 text-center">
        <CheckCircle2 className="mx-auto mb-2 text-primary-600" size={28} />
        <p className="font-semibold text-primary-900">কুইজ জমা দেওয়া হয়েছে</p>
        <p className="mt-1 text-sm text-ink-600">
          MCQ ও True/False স্কোর: <span className="font-semibold">{result.autoScorePercent}%</span>
        </p>
        {result.hasShortAnswerPendingReview && (
          <p className="mt-1 text-xs text-gold-700">
            সংক্ষিপ্ত উত্তরগুলো শিক্ষক পর্যালোচনা করার পর চূড়ান্ত ফলাফল পাবেন
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {questions.map((q, index) => (
        <div key={q.id} className="rounded-xl border border-primary-100 bg-white p-4">
          <p className="mb-3 flex items-start gap-2 text-sm font-medium text-ink-800">
            <HelpCircle size={16} className="mt-0.5 shrink-0 text-primary-600" />
            <span>
              {index + 1}. {q.questionText}
            </span>
          </p>

          {q.type === "mcq" && (
            <div className="space-y-2 pl-6">
              {(q.options ?? []).map((option, optIndex) => (
                <label
                  key={optIndex}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
                    answers[q.id]?.selectedOptionIndex === optIndex
                      ? "border-primary-500 bg-primary-50"
                      : "border-ink-100 hover:bg-ink-50"
                  )}
                >
                  <input
                    type="radio"
                    name={q.id}
                    className="accent-primary-700"
                    checked={answers[q.id]?.selectedOptionIndex === optIndex}
                    onChange={() =>
                      updateAnswer(q.id, {
                        questionId: q.id,
                        type: "mcq",
                        selectedOptionIndex: optIndex,
                      })
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {q.type === "true_false" && (
            <div className="flex gap-2 pl-6">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() =>
                    updateAnswer(q.id, {
                      questionId: q.id,
                      type: "true_false",
                      selectedBoolAnswer: val,
                    })
                  }
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                    answers[q.id]?.selectedBoolAnswer === val
                      ? "border-primary-500 bg-primary-50 text-primary-800"
                      : "border-ink-100 text-ink-600 hover:bg-ink-50"
                  )}
                >
                  {val ? "সত্য" : "মিথ্যা"}
                </button>
              ))}
            </div>
          )}

          {q.type === "short_answer" && (
            <div className="pl-6">
              <textarea
                rows={2}
                placeholder="আপনার উত্তর লিখুন..."
                value={answers[q.id]?.shortAnswerText ?? ""}
                onChange={(e) =>
                  updateAnswer(q.id, {
                    questionId: q.id,
                    type: "short_answer",
                    shortAnswerText: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none ring-primary-500 focus:ring-2"
              />
              <p className="mt-1 text-xs text-ink-400">
                এই ধরনের উত্তর শিক্ষক ম্যানুয়ালি পর্যালোচনা করবেন
              </p>
            </div>
          )}
        </div>
      ))}

      <Button
        onClick={handleSubmit}
        disabled={!allAnswered}
        isLoading={isSubmitting}
        className="w-full sm:w-auto"
      >
        কুইজ জমা দিন
      </Button>
    </div>
  );
}
