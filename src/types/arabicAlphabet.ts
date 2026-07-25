/**
 * Arabic Alphabet Studio
 *
 * ২৯টা আরবি অক্ষরের সম্পূর্ণ ডেটা কোডে হার্ডকোড করা (Firestore নয়) -
 * এটা স্ট্যাটিক ভাষাগত রেফারেন্স কনটেন্ট, কোর্স/লেসনের মতো ঘন ঘন পরিবর্তন হয় না।
 * ভবিষ্যতে audio ফাইল যোগ করতে চাইলে audioUrl ফিল্ড Firebase Storage URL
 * দিয়ে পূরণ করা যাবে (এখন null/undefined থাকবে)।
 */

export type MakhrajGroupId =
  | "jawf" // জাওফ - মুখগহ্বর
  | "halq" // হালক - কণ্ঠনালী
  | "lisan" // লিসান - জিহ্বা
  | "shafatain" // শাফাতাইন - দুই ঠোঁট
  | "khaishoom"; // খাইশুম - নাসিকা

export interface ArabicLetter {
  id: string; // যেমন "alif", "ba", "ta"
  order: number; // ১-২৯, বর্ণমালার ক্রম
  letter: string; // "ا"
  letterFinal?: string; // শব্দের শেষে রূপ (যদি ভিন্ন হয়)
  letterMedial?: string; // মধ্যে রূপ
  letterInitial?: string; // শুরুতে রূপ
  nameBengali: string; // "আলিফ"
  nameEnglish: string; // "Alif"
  makhrajGroup: MakhrajGroupId;
  makhrajDescription: string; // এই অক্ষরের নির্দিষ্ট উচ্চারণস্থল বর্ণনা
  strokeOrderDescription: string; // লেখার ধাপ বর্ণনা (আনিমেশন না থাকলেও ধাপে ধাপে বোঝানো)
  strokePathData: string; // SVG path 'd' attribute - stroke animation এর জন্য
  commonMistakes: string[];
  exampleWords: { word: string; meaning: string; transliteration: string }[];
  quizOptions: string[]; // ভুল উত্তর সহ ৪টা অপশন (নাম মেলানোর কুইজে ব্যবহৃত হবে)
  audioUrl?: string | null; // ভবিষ্যতে admin থেকে আপলোড হবে
}

export const MAKHRAJ_GROUP_LABEL: Record<MakhrajGroupId, string> = {
  jawf: "জাওফ (মুখগহ্বর)",
  halq: "হালক (কণ্ঠনালী)",
  lisan: "লিসান (জিহ্বা)",
  shafatain: "শাফাতাইন (দুই ঠোঁট)",
  khaishoom: "খাইশুম (নাসিকা)",
};
