/**
 * Firestore collection: courses/{courseId}/lessons/{lessonId}/quiz/{questionId}
 * প্রতিটা লেসনের কুইজ প্রশ্নগুলো লেসনের সাব-কালেকশন হিসেবে থাকবে।
 *
 * Scoring নীতি:
 * - MCQ ও True/False: automatic scoring (সঠিক উত্তর ডেটাবেসে থাকে, তুলনা করে নম্বর দেওয়া হয়)
 * - Short Answer: automatic scoring নেই, submission সেভ হয় `needsReview: true` ফ্ল্যাগ সহ,
 *   পরবর্তীতে শিক্ষক/অ্যাডমিন ম্যানুয়ালি রিভিউ করবেন (এই ফেজে রিভিউ UI নেই, শুধু ডেটা স্ট্রাকচার প্রস্তুত)
 */
export type QuestionType = "mcq" | "true_false" | "short_answer";

export interface QuizQuestion {
  id: string;
  lessonId: string;
  courseId: string;
  order: number;
  type: QuestionType;
  questionText: string;
  // MCQ এর জন্য - ৪টা অপশন, correctOptionIndex দিয়ে সঠিক উত্তর নির্দেশ করা হয়
  options?: string[];
  correctOptionIndex?: number;
  // True/False এর জন্য
  correctBoolAnswer?: boolean;
  // Short Answer এর জন্য - কোনো "সঠিক উত্তর" রাখা হয় না, ম্যানুয়াল রিভিউ হবে
  points: number; // এই প্রশ্নের মান (ডিফল্ট ১)
}

/**
 * Firestore collection: quizAttempts/{userId}_{lessonId}
 * একজন ইউজারের একটা লেসনের সর্বশেষ কুইজ প্রচেষ্টা।
 * (একাধিকবার দেওয়ার ইতিহাস রাখার দরকার হলে পরে সাব-কালেকশনে সরানো যাবে)
 */
export interface QuizAnswer {
  questionId: string;
  type: QuestionType;
  selectedOptionIndex?: number; // mcq
  selectedBoolAnswer?: boolean; // true_false
  shortAnswerText?: string; // short_answer
  isCorrect?: boolean | null; // mcq/true_false এ auto-calculated, short_answer এ null (pending review)
}

export interface QuizAttempt {
  id: string; // `${userId}_${lessonId}`
  userId: string;
  courseId: string;
  lessonId: string;
  answers: QuizAnswer[];
  autoScorePercent: number; // শুধু mcq + true_false ভিত্তিক স্কোর
  hasShortAnswerPendingReview: boolean;
  submittedAt: string;
}

export function createDefaultQuizQuestion(
  data: Pick<QuizQuestion, "lessonId" | "courseId" | "order" | "type" | "questionText">
): Omit<QuizQuestion, "id"> {
  return {
    ...data,
    options: data.type === "mcq" ? ["", "", "", ""] : undefined,
    correctOptionIndex: data.type === "mcq" ? 0 : undefined,
    correctBoolAnswer: data.type === "true_false" ? true : undefined,
    points: 1,
  };
}

/**
 * MCQ ও True/False উত্তরগুলো থেকে auto-score হিসাব করে।
 * Short answer প্রশ্নগুলো এই হিসাবের বাইরে থাকে (তাদের points মোট থেকে বাদ)।
 */
export function calculateAutoScore(
  questions: QuizQuestion[],
  answers: QuizAnswer[]
): { autoScorePercent: number; hasShortAnswerPendingReview: boolean } {
  const autoQuestions = questions.filter((q) => q.type !== "short_answer");
  const hasShortAnswerPendingReview = questions.some((q) => q.type === "short_answer");

  if (autoQuestions.length === 0) {
    return { autoScorePercent: 0, hasShortAnswerPendingReview };
  }

  let earned = 0;
  let total = 0;

  for (const q of autoQuestions) {
    total += q.points;
    const answer = answers.find((a) => a.questionId === q.id);
    if (!answer) continue;

    if (q.type === "mcq" && answer.selectedOptionIndex === q.correctOptionIndex) {
      earned += q.points;
    } else if (
      q.type === "true_false" &&
      answer.selectedBoolAnswer === q.correctBoolAnswer
    ) {
      earned += q.points;
    }
  }

  return {
    autoScorePercent: total > 0 ? Math.round((earned / total) * 100) : 0,
    hasShortAnswerPendingReview,
  };
}
