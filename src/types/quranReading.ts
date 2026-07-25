import type { TajweedRuleId } from "@/types/tajweed";

/**
 * Quran Reading Lab
 *
 * প্রতিটা আয়াতকে "সেগমেন্ট" এ ভাগ করা হয়েছে - প্রতিটা সেগমেন্ট একটা
 * ছোট টেক্সট অংশ যার সাথে ঐচ্ছিকভাবে একটা tajweedRuleId যুক্ত থাকতে পারে।
 * এভাবে ভাগ করার ফলে Tajweed Lab এর রঙের সাথে সরাসরি সংযোগ করে
 * "রঙিন তাজবীদ" হাইলাইটিং সম্ভব হয় - কোনো রুল না থাকলে স্বাভাবিক রঙে দেখাবে।
 */
export interface AyahSegment {
  text: string;
  tajweedRuleId?: TajweedRuleId; // থাকলে সেই রুলের রঙে হাইলাইট হবে
}

export interface Ayah {
  number: number; // সূরার মধ্যে আয়াত নম্বর
  segments: AyahSegment[];
  translationBengali: string;
}

export interface Surah {
  id: string; // যেমন "al-fatiha"
  number: number; // ১-১১৪ (কুরআনে ক্রম)
  nameArabic: string;
  nameBengali: string;
  nameEnglish: string;
  totalAyahs: number;
  revelationType: "makki" | "madani";
  ayahs: Ayah[];
}

export type ReadingMode = "slow" | "normal" | "listen" | "repeat";

export const READING_MODE_LABEL: Record<ReadingMode, string> = {
  slow: "ধীরে পড়া",
  normal: "স্বাভাবিক গতি",
  listen: "শুনে পড়া",
  repeat: "Repeat Mode",
};
