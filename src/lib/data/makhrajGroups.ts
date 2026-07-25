import type { MakhrajGroupId } from "@/types/arabicAlphabet";

/**
 * ৫টা মূল মাখরাজ গ্রুপের বিস্তারিত তথ্য - ডায়াগ্রামে হাইলাইট করার জন্য
 * নির্দিষ্ট মুখের অংশের (highlightArea) সাথে সংযুক্ত।
 */
export interface MakhrajGroupDetail {
  id: MakhrajGroupId;
  nameBengali: string;
  nameArabic: string;
  description: string;
  // MouthDiagram SVG এ কোন অংশ হাইলাইট হবে তার id রেফারেন্স
  highlightAreaId: string;
  letterIds: string[]; // এই গ্রুপের অন্তর্ভুক্ত অক্ষরের id (arabicLetters.ts থেকে)
  subPoints?: { name: string; description: string }[]; // যেমন হালকের ৩টা উপ-অংশ
}

export const MAKHRAJ_GROUPS: MakhrajGroupDetail[] = [
  {
    id: "jawf",
    nameBengali: "জাওফ",
    nameArabic: "الجَوْف",
    description:
      "মুখ ও গলার ফাঁকা স্থান (মুখগহ্বর)। এখান থেকে কোনো নির্দিষ্ট স্পর্শবিন্দু ছাড়াই দীর্ঘ স্বরধ্বনি (মাদ) উৎপন্ন হয় - আলিফ, ওয়াও (মাদ), ইয়া (মাদ)।",
    highlightAreaId: "jawf-area",
    letterIds: ["alif"],
    subPoints: [
      { name: "দীর্ঘ আ", description: "মুখ খোলা রেখে সোজা বাতাস বের করা (যেমন 'قَالَ' এর আলিফ)" },
      { name: "দীর্ঘ উ", description: "ঠোঁট গোলাকার করে (যেমন 'يَقُولُ' এর ওয়াও)" },
      { name: "দীর্ঘ ঈ", description: "জিহ্বা তালুর দিকে উঁচু করে (যেমন 'قِيلَ' এর ইয়া)" },
    ],
  },
  {
    id: "halq",
    nameBengali: "হালক",
    nameArabic: "الحَلْق",
    description:
      "কণ্ঠনালী - গলার ভেতরের অংশ। তিনটি উপ-অংশে বিভক্ত: গভীরতম অংশ থেকে সবচেয়ে কাছেরটা পর্যন্ত।",
    highlightAreaId: "halq-area",
    letterIds: ["hamza", "ha_large", "ain", "ha_small", "ghain", "kha"],
    subPoints: [
      { name: "আকসাল হালক (সবচেয়ে গভীর)", description: "হামযা (ء) ও হা (ه)" },
      { name: "ওয়াসাতুল হালক (মধ্যভাগ)", description: "আইন (ع) ও হা (ح)" },
      { name: "আদনাল হালক (সবচেয়ে কাছের)", description: "গাইন (غ) ও খা (خ)" },
    ],
  },
  {
    id: "lisan",
    nameBengali: "লিসান",
    nameArabic: "اللِّسَان",
    description:
      "জিহ্বা - সবচেয়ে বেশি অক্ষরের (১৮টি) মাখরাজ এখানে। জিহ্বার বিভিন্ন অংশ (আগা, মধ্যভাগ, পেছন, পাশ) তালু বা দাঁতের বিভিন্ন অংশ স্পর্শ করে ভিন্ন ভিন্ন ধ্বনি তৈরি করে।",
    highlightAreaId: "lisan-area",
    letterIds: [
      "qaf",
      "kaf",
      "jim",
      "shin",
      "ya",
      "dad",
      "lam",
      "nun",
      "ra",
      "ta",
      "dal",
      "ta_heavy",
      "tha",
      "dhal",
      "za_heavy",
      "sin",
      "sad",
      "zay",
    ],
    subPoints: [
      { name: "জিহ্বার গোড়া", description: "নরম তালুর সাথে - কাফ (ق), কাফ হালকা (ك)" },
      { name: "জিহ্বার মধ্যভাগ", description: "শক্ত তালুর সাথে - জীম (ج), শীন (ش), ইয়া (ي)" },
      { name: "জিহ্বার পাশ", description: "উপরের মাড়ির দাঁতের সাথে - দাদ (ض), লাম (ل)" },
      { name: "জিহ্বার আগা", description: "সামনের দাঁত/মাড়ির সাথে - নূন, রা, তা, দাল ও আরও অনেক" },
    ],
  },
  {
    id: "shafatain",
    nameBengali: "শাফাতাইন",
    nameArabic: "الشَّفَتَان",
    description: "দুই ঠোঁট। ঠোঁট বন্ধ করে বা সংকুচিত করে ধ্বনি তৈরি হয়।",
    highlightAreaId: "shafatain-area",
    letterIds: ["fa", "ba", "mim", "waw"],
    subPoints: [
      { name: "নিচের ঠোঁট + উপরের দাঁত", description: "ফা (ف)" },
      { name: "দুই ঠোঁট বন্ধ", description: "বা (ب), মীম (م)" },
      { name: "দুই ঠোঁট গোলাকার", description: "ওয়াও (و)" },
    ],
  },
  {
    id: "khaishoom",
    nameBengali: "খাইশুম",
    nameArabic: "الخَيْشُوم",
    description:
      "নাসিকা (নাকের ভেতরের ফাঁপা অংশ)। এখান থেকে গুন্নাহ (নাসিক্য অনুরণন) তৈরি হয়, যা মূলত নূন ও মীমের সাথে যুক্ত হয় (স্বাধীন অক্ষর নয়, বরং নূন/মীমের একটি গুণ)।",
    highlightAreaId: "khaishoom-area",
    letterIds: ["nun", "mim"],
    subPoints: [
      {
        name: "গুন্নাহ",
        description: "নূন ও মীম সাকিন/মুশাদ্দাদ অবস্থায় নাক দিয়ে ২ হারাকাত পরিমাণ অনুরণিত ধ্বনি",
      },
    ],
  },
];

export function getMakhrajGroup(id: MakhrajGroupId): MakhrajGroupDetail | undefined {
  return MAKHRAJ_GROUPS.find((g) => g.id === id);
}
