import type {
  AssessmentSectionId,
  OverallLevel,
  SectionResult,
} from "@/types/assessment";
import { ASSESSMENT_SECTIONS } from "@/types/assessment";

/**
 * সেকশন থেকে কোর্স ক্যাটাগরিতে ম্যাপিং।
 * এই ম্যাপিং Phase 2 এর Course.category ফিল্ডের মানের সাথে মিলিয়ে
 * রাখা হয়েছে (যেমন কোর্স ক্যাটাগরি "তাজবীদ", "আরবি ভাষা" ইত্যাদি)।
 * Admin কোর্স তৈরির সময় এই একই ক্যাটাগরি নাম ব্যবহার করলে recommendation
 * সরাসরি কোর্সের সাথে মিলে যাবে।
 */
const SECTION_TO_CATEGORY: Record<AssessmentSectionId, string> = {
  arabic_letters: "আরবি ভাষা",
  harakat: "আরবি ভাষা",
  tanween: "তাজবীদ",
  sakin: "তাজবীদ",
  madd: "তাজবীদ",
  makhraj: "মাখরাজ",
  tajweed: "তাজবীদ",
  surah_reading: "কুরআন পাঠ",
};

const STRENGTH_THRESHOLD = 70;
const WEAKNESS_THRESHOLD = 50;

export function determineOverallLevel(overallScorePercent: number): OverallLevel {
  if (overallScorePercent >= 75) return "advanced";
  if (overallScorePercent >= 45) return "intermediate";
  return "beginner";
}

export function analyzeResults(sectionResults: SectionResult[]): {
  overallScorePercent: number;
  overallLevel: OverallLevel;
  strengths: AssessmentSectionId[];
  weaknesses: AssessmentSectionId[];
  recommendedCategory: string;
  estimatedLearningHours: number;
} {
  const overallScorePercent = Math.round(
    sectionResults.reduce((sum, s) => sum + s.scorePercent, 0) / sectionResults.length
  );

  const strengths = sectionResults
    .filter((s) => s.scorePercent >= STRENGTH_THRESHOLD)
    .map((s) => s.sectionId);

  const weaknesses = sectionResults
    .filter((s) => s.scorePercent < WEAKNESS_THRESHOLD)
    .map((s) => s.sectionId);

  // সবচেয়ে কম স্কোর করা সেকশনটাই সবচেয়ে জরুরি - সেটার ক্যাটাগরি সাজেস্ট করা হবে
  const weakestSection = [...sectionResults].sort(
    (a, b) => a.scorePercent - b.scorePercent
  )[0];
  const recommendedCategory = SECTION_TO_CATEGORY[weakestSection.sectionId];

  const overallLevel = determineOverallLevel(overallScorePercent);

  // দুর্বলতা যত বেশি, আনুমানিক সময় তত বেশি (মোটামুটি হিসাব, প্রতি দুর্বল সেকশনে ৩ ঘণ্টা)
  const estimatedLearningHours = Math.max(5, weaknesses.length * 3 + 5);

  return {
    overallScorePercent,
    overallLevel,
    strengths,
    weaknesses,
    recommendedCategory,
    estimatedLearningHours,
  };
}

export function getSectionLabel(sectionId: AssessmentSectionId): string {
  return ASSESSMENT_SECTIONS.find((s) => s.id === sectionId)?.label ?? sectionId;
}

export const LEVEL_LABEL_BN: Record<OverallLevel, string> = {
  beginner: "শুরুর স্তর",
  intermediate: "মধ্যম স্তর",
  advanced: "উচ্চ স্তর",
};
