"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TajweedRule } from "@/types/tajweed";

export function TajweedRuleQuiz({ rule }: { rule: TajweedRule }) {
  const [selected, setSelected] = useState<number | null>(null);

  const isCorrect = selected === rule.quizQuestion.correctIndex;

  return (
    <div className="rounded-xl border border-primary-100 bg-white p-4">
      <p className="mb-3 text-sm font-medium text-ink-800">{rule.quizQuestion.text}</p>
      <div className="space-y-2">
        {rule.quizQuestion.options.map((option, index) => {
          const isThisSelected = selected === index;
          const isThisCorrect = index === rule.quizQuestion.correctIndex;
          let stateClass = "border-ink-100 hover:bg-ink-50";
          if (selected !== null && isThisCorrect) {
            stateClass = "border-primary-500 bg-primary-50 text-primary-800";
          } else if (selected !== null && isThisSelected && !isThisCorrect) {
            stateClass = "border-red-400 bg-red-50 text-red-700";
          }

          return (
            <button
              key={index}
              onClick={() => setSelected(index)}
              disabled={selected !== null}
              className={cn("w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors", stateClass)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <p
          className={cn(
            "mt-3 flex items-center gap-1.5 text-sm font-medium",
            isCorrect ? "text-primary-700" : "text-red-600"
          )}
        >
          {isCorrect ? (
            <>
              <CheckCircle2 size={15} /> সঠিক উত্তর!
            </>
          ) : (
            <>
              <XCircle size={15} /> সঠিক উত্তর: {rule.quizQuestion.options[rule.quizQuestion.correctIndex]}
            </>
          )}
        </p>
      )}
    </div>
  );
}
