/**
 * Self Assessment সিস্টেম
 *
 * ৮টা নির্দিষ্ট সেকশন (ডকুমেন্টে বর্ণিত ক্রম অনুযায়ী): আরবি অক্ষর → হরকত →
 * তানওয়ীন → সাকিন → মাদ → মাখরাজ → তাজবীদ → সূরা পাঠ।
 *
 * প্রতিটা সেকশনে ৩টা প্রশ্ন, adaptive difficulty সহ:
 * - প্রথম প্রশ্ন সবসময় "easy"
 * - সঠিক উত্তর দিলে পরের প্রশ্ন এক ধাপ কঠিন হবে (easy→medium, medium→hard)
 * - ভুল উত্তর দিলে পরের প্রশ্ন এক ধাপ সহজ হবে (hard→medium, medium→easy),
 *   easy তে ভুল করলে easy তেই থাকবে (আরও নিচে যাওয়ার কিছু নেই)
 *
 * প্রশ্ন ব্যাংক কোডে হার্ডকোড করা (Firestore নয়) কারণ এটা স্ট্যাটিক
 * শিক্ষাগত কনটেন্ট, ঘন ঘন পরিবর্তন হবে না। ভবিষ্যতে admin থেকে
 * এডিট করার দরকার হলে Firestore এ সরানো যাবে।
 */

export type AssessmentSectionId =
  | "arabic_letters"
  | "harakat"
  | "tanween"
  | "sakin"
  | "madd"
  | "makhraj"
  | "tajweed"
  | "surah_reading";

export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface AssessmentQuestion {
  id: string;
  sectionId: AssessmentSectionId;
  difficulty: QuestionDifficulty;
  questionText: string;
  questionTextArabic?: string; // প্রযোজ্য হলে আরবি টেক্সট দেখানোর জন্য
  options: string[];
  correctOptionIndex: number;
}

export const ASSESSMENT_SECTIONS: { id: AssessmentSectionId; label: string }[] = [
  { id: "arabic_letters", label: "আরবি অক্ষর" },
  { id: "harakat", label: "হরকত" },
  { id: "tanween", label: "তানওয়ীন" },
  { id: "sakin", label: "সাকিন" },
  { id: "madd", label: "মাদ" },
  { id: "makhraj", label: "মাখরাজ" },
  { id: "tajweed", label: "তাজবীদ" },
  { id: "surah_reading", label: "সূরা পাঠ" },
];

/**
 * একটা সেকশনে ইউজারের উত্তরের রেকর্ড
 */
export interface SectionAnswer {
  questionId: string;
  difficulty: QuestionDifficulty;
  selectedOptionIndex: number;
  isCorrect: boolean;
}

export interface SectionResult {
  sectionId: AssessmentSectionId;
  answers: SectionAnswer[];
  correctCount: number; // ০-৩
  // সর্বোচ্চ যে difficulty তে সঠিক উত্তর দিয়েছে তার উপর ভিত্তি করে সেকশন স্কোর (0-100)
  scorePercent: number;
}

export type OverallLevel = "beginner" | "intermediate" | "advanced";

/**
 * Firestore collection: assessmentResults/{userId}
 * একজন ইউজারের সর্বশেষ সম্পূর্ণ assessment রেজাল্ট।
 * (ইতিহাস রাখার দরকার হলে ভবিষ্যতে সাব-কালেকশনে নেওয়া যাবে)
 */
export interface AssessmentResult {
  id: string; // userId
  userId: string;
  sectionResults: SectionResult[];
  overallScorePercent: number;
  overallLevel: OverallLevel;
  strengths: AssessmentSectionId[]; // ৭০%+ স্কোর করা সেকশন
  weaknesses: AssessmentSectionId[]; // ৫০% এর কম স্কোর করা সেকশন
  recommendedCategory: string; // দুর্বলতম সেকশন থেকে ম্যাপ করা ক্যাটাগরি
  estimatedLearningHours: number;
  completedAt: string;
}

export function buildEmptySectionResult(sectionId: AssessmentSectionId): SectionResult {
  return {
    sectionId,
    answers: [],
    correctCount: 0,
    scorePercent: 0,
  };
}
