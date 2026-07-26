"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Shuffle, HelpCircle } from "lucide-react";
import { getAllQuizQuestionsForCenter, type CentralQuizQuestion } from "@/lib/services/quizService";
import { QuizCenterCard } from "@/components/quiz-center/QuizCenterCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function QuizCenterPage() {
  const [allQuestions, setAllQuestions] = useState<CentralQuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [shuffleKey, setShuffleKey] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const questions = await getAllQuizQuestionsForCenter();
        setAllQuestions(questions);
      } catch {
        setError("কুইজ লোড করা যায়নি। একটু পর আবার চেষ্টা করুন।");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const courseTitles = useMemo(() => {
    const set = new Set(allQuestions.map((q) => q.courseTitle));
    return Array.from(set);
  }, [allQuestions]);

  const filteredQuestions = useMemo(() => {
    const base =
      selectedCourse === "all"
        ? allQuestions
        : allQuestions.filter((q) => q.courseTitle === selectedCourse);
    // shuffleKey পরিবর্তন হলে নতুন করে shuffle করার জন্য dependency তে রাখা হয়েছে
    return shuffle(base);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQuestions, selectedCourse, shuffleKey]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">কুইজ সেন্টার</h1>
        <p className="mt-2 text-sm text-ink-500">
          সব কোর্সের কুইজ প্রশ্ন এক জায়গায় - স্ব-মূল্যায়নের জন্য অনুশীলন করুন
        </p>
      </motion.div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-primary-600" size={28} />
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-600">{error}</p>
      )}

      {!isLoading && !error && allQuestions.length === 0 && (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 py-16 text-center">
          <HelpCircle className="mb-3 text-primary-400" size={32} />
          <p className="text-sm text-ink-500">
            এখনো কোনো কুইজ প্রশ্ন পাওয়া যায়নি। কোর্সে লেসন যোগ হলে এখানে দেখা যাবে।
          </p>
        </div>
      )}

      {!isLoading && allQuestions.length > 0 && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCourse("all")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                selectedCourse === "all"
                  ? "border-primary-700 bg-primary-700 text-white"
                  : "border-primary-200 text-primary-700"
              )}
            >
              সব কোর্স
            </button>
            {courseTitles.map((title) => (
              <button
                key={title}
                onClick={() => setSelectedCourse(title)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  selectedCourse === title
                    ? "border-primary-700 bg-primary-700 text-white"
                    : "border-primary-200 text-primary-700"
                )}
              >
                {title}
              </button>
            ))}
          </div>

          <div className="mb-5 flex justify-center">
            <Button
              onClick={() => setShuffleKey((k) => k + 1)}
              variant="outline"
              className="w-auto px-5"
            >
              <Shuffle size={14} /> এলোমেলো করুন
            </Button>
          </div>

          <p className="mb-3 text-center text-xs text-ink-400">
            মোট {filteredQuestions.length}টি প্রশ্ন
          </p>

          <div className="space-y-3">
            {filteredQuestions.map((question) => (
              <QuizCenterCard key={question.id} question={question} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
