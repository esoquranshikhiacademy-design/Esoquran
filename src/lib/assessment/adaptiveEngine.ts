import type { QuestionDifficulty } from "@/types/assessment";

/**
 * Adaptive difficulty নীতি:
 * - সবসময় "easy" দিয়ে একটা সেকশন শুরু হয়
 * - সঠিক উত্তর → এক ধাপ কঠিন (easy→medium, medium→hard, hard এ থাকলে hard-ই থাকে)
 * - ভুল উত্তর → এক ধাপ সহজ (hard→medium, medium→easy, easy তে থাকলে easy-ই থাকে)
 *
 * প্রতিটা সেকশনে সর্বোচ্চ ৩টা প্রশ্ন (questionBank এ প্রতি সেকশনে easy/medium/hard
 * একটা করেই আছে বলে ৩টার বেশি প্রশ্ন দেখানো সম্ভবও না)।
 */
export function getNextDifficulty(
  currentDifficulty: QuestionDifficulty,
  wasCorrect: boolean
): QuestionDifficulty {
  const order: QuestionDifficulty[] = ["easy", "medium", "hard"];
  const currentIndex = order.indexOf(currentDifficulty);

  if (wasCorrect) {
    const nextIndex = Math.min(currentIndex + 1, order.length - 1);
    return order[nextIndex];
  } else {
    const prevIndex = Math.max(currentIndex - 1, 0);
    return order[prevIndex];
  }
}

/**
 * একটা সেকশনের উত্তর থেকে scorePercent হিসাব করে।
 * শুধু "কয়টা সঠিক" না দেখে difficulty ওয়েট করা হয়েছে -
 * hard প্রশ্নে সঠিক উত্তর easy প্রশ্নে সঠিক উত্তরের চেয়ে বেশি মূল্যবান,
 * কারণ এটা প্রকৃত দক্ষতার আরও ভালো ইঙ্গিত দেয়।
 */
const DIFFICULTY_WEIGHT: Record<QuestionDifficulty, number> = {
  easy: 1,
  medium: 1.5,
  hard: 2,
};

export function calculateSectionScore(
  answers: { difficulty: QuestionDifficulty; isCorrect: boolean }[]
): number {
  if (answers.length === 0) return 0;

  let earned = 0;
  let total = 0;

  for (const answer of answers) {
    const weight = DIFFICULTY_WEIGHT[answer.difficulty];
    total += weight;
    if (answer.isCorrect) earned += weight;
  }

  return Math.round((earned / total) * 100);
}
