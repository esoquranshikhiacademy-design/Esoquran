"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArabicLetter } from "@/types/arabicAlphabet";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function LetterQuiz({ letter }: { letter: ArabicLetter }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const options = useMemo(() => {
    const optionSet = new Set(letter.quizOptions);
    optionSet.add(letter.nameBengali);
    return shuffle(Array.from(optionSet));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter.id, key]);

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);
  }

  function reset() {
    setSelected(null);
    setKey((k) => k + 1);
  }

  const isCorrect = selected === letter.nameBengali;

  return (
    <div className="rounded-xl border border-primary-100 bg-white p-4">
      <p className="mb-3 text-sm font-medium text-ink-800">
        এই অক্ষরটির নাম কী?{" "}
        <span className="font-arabic-text text-xl text-primary-900">{letter.letter}</span>
      </p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const isThisSelected = selected === option;
          const isThisCorrect = option === letter.nameBengali;
          let stateClass = "border-ink-100 hover:bg-ink-50";
          if (selected && isThisCorrect) stateClass = "border-primary-500 bg-primary-50 text-primary-800";
          else if (selected && isThisSelected && !isThisCorrect) stateClass = "border-red-400 bg-red-50 text-red-700";

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!selected}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm transition-colors",
                stateClass
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-3 flex items-center justify-between">
          <p
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium",
              isCorrect ? "text-primary-700" : "text-red-600"
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 size={15} /> সঠিক উত্তর!
              </>
            ) : (
              <>
                <XCircle size={15} /> সঠিক উত্তর: {letter.nameBengali}
              </>
            )}
          </p>
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs font-medium text-ink-500 hover:text-primary-700"
          >
            <RotateCcw size={12} /> আবার চেষ্টা করুন
          </button>
        </div>
      )}
    </div>
  );
}
