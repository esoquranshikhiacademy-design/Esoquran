/**
 * Tajweed Lab
 *
 * তাজবীদের মূল নিয়মগুলো (rules) কোডে হার্ডকোড করা - এটা স্ট্যাটিক
 * শিক্ষাগত রেফারেন্স কনটেন্ট। প্রতিটা রুলের নিজস্ব রঙ আছে যা
 * Quran Reading Lab এর তাজবীদ হাইলাইটিংয়ের সাথে সরাসরি যুক্ত -
 * একই রুল আইডি ও রঙ দুই মডিউলেই ব্যবহৃত হয়, তাই ইউজার Tajweed Lab এ
 * যে রঙ শিখবে, Reading Lab এ কুরআনের টেক্সটে সেই একই রঙ দেখবে।
 */

export type TajweedRuleId =
  | "ghunnah" // গুন্নাহ
  | "idgham" // ইদগাম
  | "ikhfa" // ইখফা
  | "iqlab" // ইকলাব
  | "izhar" // ইজহার
  | "qalqalah" // কালকালাহ
  | "madd"; // মাদ

export interface TajweedExample {
  arabicText: string;
  highlightSubstring: string; // arabicText এর যে অংশ হাইলাইট হবে, সরাসরি সাব-স্ট্রিং হিসেবে (ক্যারেক্টার ইনডেক্সের বদলে - Arabic diacritics/combining marks এর কারণে ইনডেক্স গণনা ভুল হওয়ার ঝুঁকি এড়াতে)
  transliteration: string;
  explanation: string;
}

export interface TajweedRule {
  id: TajweedRuleId;
  order: number;
  nameBengali: string;
  nameArabic: string;
  color: string; // হেক্স কালার - Reading Lab এও একই রঙ ব্যবহৃত হবে
  shortDescription: string;
  fullDescription: string;
  applicableLetters: string[]; // যেসব অক্ষরের সাথে এই রুল প্রযোজ্য
  examples: TajweedExample[];
  commonMistakes: string[];
  quizQuestion: {
    text: string;
    options: string[];
    correctIndex: number;
  };
}
