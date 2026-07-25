import type { Surah } from "@/types/quranReading";

/**
 * ডেমো হিসেবে ৪টা সূরা (ফাতিহা + ৩টা ছোট সূরা) hardcode করা হয়েছে।
 * বাকি ১০০টা সূরা ভবিষ্যতে একটা Quran API (যেমন alquran.cloud) দিয়ে
 * সম্পূরিত করা যাবে - এই ফাইলের স্ট্রাকচার (Surah/Ayah/AyahSegment) সেই
 * সম্প্রসারণের জন্য প্রস্তুত রাখা হয়েছে।
 *
 * প্রতিটা আয়াতকে ছোট সেগমেন্টে ভাগ করে কিছু গুরুত্বপূর্ণ তাজবীদ পয়েন্টে
 * tajweedRuleId ট্যাগ করা হয়েছে (প্রতিটা সম্ভাব্য তাজবীদ নিয়ম চিহ্নিত করা
 * হয়নি - শুধু স্পষ্ট, শিক্ষামূলক উদাহরণ হিসেবে কয়েকটা প্রধান জায়গা)।
 */
export const SURAHS: Surah[] = [
  {
    id: "al-fatiha",
    number: 1,
    nameArabic: "الفاتحة",
    nameBengali: "সূরা ফাতিহা",
    nameEnglish: "Al-Fatiha",
    totalAyahs: 7,
    revelationType: "makki",
    ayahs: [
      {
        number: 1,
        segments: [{ text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" }],
        translationBengali: "পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে",
      },
      {
        number: 2,
        segments: [
          { text: "الْحَمْدُ لِلَّهِ رَبِّ " },
          { text: "الْعَالَمِينَ", tajweedRuleId: "madd" },
        ],
        translationBengali: "সমস্ত প্রশংসা আল্লাহর জন্য, যিনি সকল সৃষ্টিজগতের প্রতিপালক",
      },
      {
        number: 3,
        segments: [{ text: "الرَّحْمَٰنِ الرَّحِيمِ" }],
        translationBengali: "যিনি পরম করুণাময়, অসীম দয়ালু",
      },
      {
        number: 4,
        segments: [{ text: "مَالِكِ يَوْمِ " }, { text: "الدِّينِ", tajweedRuleId: "madd" }],
        translationBengali: "যিনি বিচার দিনের মালিক",
      },
      {
        number: 5,
        segments: [{ text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" }],
        translationBengali: "আমরা একমাত্র তোমারই ইবাদত করি এবং একমাত্র তোমারই সাহায্য চাই",
      },
      {
        number: 6,
        segments: [{ text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ" }],
        translationBengali: "আমাদের সরল সঠিক পথ দেখাও",
      },
      {
        number: 7,
        segments: [
          { text: "صِرَاطَ الَّذِينَ " },
          { text: "أَنْ", tajweedRuleId: "ikhfa" },
          { text: "عَمْتَ عَلَيْهِمْ غَيْرِ " },
          { text: "الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ" },
        ],
        translationBengali:
          "সেসব লোকের পথ, যাদের তুমি অনুগ্রহ করেছ, তাদের পথ নয় যাদের প্রতি তোমার ক্রোধ নেমে এসেছে, এবং না তাদের পথ যারা পথভ্রষ্ট হয়েছে",
      },
    ],
  },
  {
    id: "al-ikhlas",
    number: 112,
    nameArabic: "الإخلاص",
    nameBengali: "সূরা ইখলাস",
    nameEnglish: "Al-Ikhlas",
    totalAyahs: 4,
    revelationType: "makki",
    ayahs: [
      {
        number: 1,
        segments: [{ text: "قُلْ هُوَ اللَّهُ " }, { text: "أَحَدٌ", tajweedRuleId: "madd" }],
        translationBengali: "বলুন, তিনি আল্লাহ, একক",
      },
      {
        number: 2,
        segments: [{ text: "اللَّهُ " }, { text: "الصَّمَدُ", tajweedRuleId: "qalqalah" }],
        translationBengali: "আল্লাহ অমুখাপেক্ষী, সবার প্রার্থিত",
      },
      {
        number: 3,
        segments: [
          { text: "لَمْ يَلِدْ " },
          { text: "وَلَمْ", tajweedRuleId: "qalqalah" },
          { text: " يُولَدْ" },
        ],
        translationBengali: "তিনি কাউকে জন্ম দেননি, এবং তাঁকেও জন্ম দেওয়া হয়নি",
      },
      {
        number: 4,
        segments: [
          { text: "وَلَمْ يَكُنْ " },
          { text: "لَهُ", tajweedRuleId: "idgham" },
          { text: " كُفُوًا " },
          { text: "أَحَدٌ", tajweedRuleId: "madd" },
        ],
        translationBengali: "এবং তাঁর সমতুল্য কেউ নেই",
      },
    ],
  },
  {
    id: "an-nas",
    number: 114,
    nameArabic: "الناس",
    nameBengali: "সূরা নাস",
    nameEnglish: "An-Nas",
    totalAyahs: 6,
    revelationType: "makki",
    ayahs: [
      {
        number: 1,
        segments: [{ text: "قُلْ أَعُوذُ بِرَبِّ " }, { text: "النَّاسِ", tajweedRuleId: "ghunnah" }],
        translationBengali: "বলুন, আমি আশ্রয় প্রার্থনা করছি মানুষের রবের কাছে",
      },
      {
        number: 2,
        segments: [{ text: "مَلِكِ " }, { text: "النَّاسِ", tajweedRuleId: "ghunnah" }],
        translationBengali: "মানুষের অধিপতির কাছে",
      },
      {
        number: 3,
        segments: [{ text: "إِلَٰهِ " }, { text: "النَّاسِ", tajweedRuleId: "ghunnah" }],
        translationBengali: "মানুষের ইলাহর কাছে",
      },
      {
        number: 4,
        segments: [
          { text: "مِنْ " },
          { text: "شَرِّ", tajweedRuleId: "ikhfa" },
          { text: " الْوَسْوَاسِ الْخَنَّاسِ" },
        ],
        translationBengali: "কুমন্ত্রণাদাতা, যে (আল্লাহর স্মরণে) পিছিয়ে যায়, তার অনিষ্ট থেকে",
      },
      {
        number: 5,
        segments: [{ text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ " }, { text: "النَّاسِ", tajweedRuleId: "ghunnah" }],
        translationBengali: "যে মানুষের অন্তরে কুমন্ত্রণা দেয়",
      },
      {
        number: 6,
        segments: [{ text: "مِنَ الْجِنَّةِ وَ" }, { text: "النَّاسِ", tajweedRuleId: "ghunnah" }],
        translationBengali: "জিন ও মানুষের মধ্য থেকে",
      },
    ],
  },
  {
    id: "al-kawthar",
    number: 108,
    nameArabic: "الكوثر",
    nameBengali: "সূরা কাউসার",
    nameEnglish: "Al-Kawthar",
    totalAyahs: 3,
    revelationType: "makki",
    ayahs: [
      {
        number: 1,
        segments: [
          { text: "إِنَّا", tajweedRuleId: "ghunnah" },
          { text: " أَعْطَيْنَاكَ " },
          { text: "الْكَوْثَرَ" },
        ],
        translationBengali: "নিশ্চয়ই আমি তোমাকে কাউসার (অফুরন্ত কল্যাণ) দান করেছি",
      },
      {
        number: 2,
        segments: [{ text: "فَصَلِّ لِرَبِّكَ وَ" }, { text: "انْحَرْ", tajweedRuleId: "qalqalah" }],
        translationBengali: "অতএব তোমার রবের উদ্দেশ্যে নামাজ পড় এবং কুরবানি কর",
      },
      {
        number: 3,
        segments: [
          { text: "إِنَّ", tajweedRuleId: "ghunnah" },
          { text: " شَانِئَكَ هُوَ " },
          { text: "الْأَبْتَرُ" },
        ],
        translationBengali: "নিশ্চয়ই তোমার শত্রুই তো লেজকাটা (নিঃসন্তান, স্মরণহীন)",
      },
    ],
  },
];

export function getSurahById(id: string): Surah | undefined {
  return SURAHS.find((s) => s.id === id);
}
