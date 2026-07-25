import type { AssessmentQuestion, AssessmentSectionId } from "@/types/assessment";

/**
 * প্রশ্ন ব্যাংক - প্রতি সেকশনে easy/medium/hard একটা করে প্রশ্ন।
 * Adaptive ইঞ্জিন (getNextQuestion) প্রতিটা সেকশনে সর্বোচ্চ ৩টা প্রশ্ন দেখাবে,
 * ইউজারের উত্তরের সঠিকতার ভিত্তিতে difficulty অ্যাডজাস্ট করে।
 *
 * প্রশ্নগুলো ডেমো/স্টার্টার কনটেন্ট হিসেবে তৈরি - বিষয়বস্তুর দিক থেকে
 * শিক্ষাগতভাবে যাচাইকৃত প্রশ্ন ব্যাংক তৈরি করতে চাইলে ভবিষ্যতে একজন
 * তাজবীদ বিশেষজ্ঞের রিভিউ প্রয়োজন হবে।
 */
export const QUESTION_BANK: AssessmentQuestion[] = [
  // --- আরবি অক্ষর ---
  {
    id: "al_easy",
    sectionId: "arabic_letters",
    difficulty: "easy",
    questionText: "নিচের কোনটি আরবি বর্ণমালার প্রথম অক্ষর?",
    options: ["ب (বা)", "ا (আলিফ)", "ت (তা)", "ث (সা)"],
    correctOptionIndex: 1,
  },
  {
    id: "al_medium",
    sectionId: "arabic_letters",
    difficulty: "medium",
    questionText: "'ع' (আইন) ও 'غ' (গাইন) অক্ষর দুটির মধ্যে পার্থক্য কী?",
    options: [
      "কোনো পার্থক্য নেই",
      "আইন কণ্ঠনালী থেকে, গাইন গলার আরও গভীর থেকে উচ্চারিত হয়",
      "আইন নাসিকা থেকে উচ্চারিত হয়",
      "গাইন শুধু তানওয়ীনে ব্যবহৃত হয়",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "al_hard",
    sectionId: "arabic_letters",
    difficulty: "hard",
    questionText: "কোন অক্ষরগুলোকে 'হুরুফুল হালক' (কণ্ঠনালীর অক্ষর) বলা হয়?",
    options: [
      "ب، م، و",
      "ء، ه، ع، ح، غ، خ",
      "ت، د، ط",
      "ن، ل، ر",
    ],
    correctOptionIndex: 1,
  },

  // --- হরকত ---
  {
    id: "har_easy",
    sectionId: "harakat",
    difficulty: "easy",
    questionText: "একটি অক্ষরের উপর 'যবর' (َ) চিহ্ন থাকলে তার উচ্চারণ কেমন হয়?",
    options: ["অ-কার (ফাতহা)", "ই-কার (কাসরা)", "উ-কার (দাম্মা)", "কোনো স্বরধ্বনি হবে না"],
    correctOptionIndex: 0,
  },
  {
    id: "har_medium",
    sectionId: "harakat",
    difficulty: "medium",
    questionText: "'কাসরা' (ِ) ও 'দাম্মা' (ُ) এর মধ্যে পার্থক্য কী?",
    options: [
      "দুটোই একই",
      "কাসরা 'ই' স্বরধ্বনি, দাম্মা 'উ' স্বরধ্বনি নির্দেশ করে",
      "কাসরা শুধু শেষ অক্ষরে ব্যবহৃত হয়",
      "দাম্মা শুধু তানওয়ীনে ব্যবহৃত হয়",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "har_hard",
    sectionId: "harakat",
    difficulty: "hard",
    questionText: "একটি শব্দের শেষ অক্ষরের হরকত কীভাবে ব্যাকরণগত অবস্থান (ইরাব) নির্দেশ করে?",
    options: [
      "হরকত শুধু উচ্চারণের জন্য, ব্যাকরণের সাথে সম্পর্ক নেই",
      "দাম্মা সাধারণত কর্তা (মারফু), ফাতহা কর্ম (মানসুব), কাসরা সম্বন্ধ পদ (মাজরুর) নির্দেশ করতে পারে",
      "সব হরকত একই ব্যাকরণিক অর্থ বহন করে",
      "শুধু সাকিন ব্যাকরণ নির্দেশ করে",
    ],
    correctOptionIndex: 1,
  },

  // --- তানওয়ীন ---
  {
    id: "tan_easy",
    sectionId: "tanween",
    difficulty: "easy",
    questionText: "তানওয়ীন বলতে কী বোঝায়?",
    options: [
      "একটি অক্ষরে দুইবার হরকত থাকা (যেমন ٌ ً ٍ)",
      "একটি অক্ষরে কোনো হরকত না থাকা",
      "দুটো অক্ষর একসাথে উচ্চারণ করা",
      "একটি বিশেষ মাখরাজ",
    ],
    correctOptionIndex: 0,
  },
  {
    id: "tan_medium",
    sectionId: "tanween",
    difficulty: "medium",
    questionText: "তানওয়ীনের উচ্চারণে শেষে কোন ধ্বনি যুক্ত হয়?",
    options: ["'ম' ধ্বনি", "'ন' ধ্বনি", "'র' ধ্বনি", "কোনো অতিরিক্ত ধ্বনি যুক্ত হয় না"],
    correctOptionIndex: 1,
  },
  {
    id: "tan_hard",
    sectionId: "tanween",
    difficulty: "hard",
    questionText: "তানওয়ীনের পরে 'ব' (ب) অক্ষর আসলে কোন হুকুম প্রযোজ্য হবে?",
    options: ["ইজহার", "ইদগাম", "ইকলাব", "কোনো হুকুম প্রযোজ্য নয়"],
    correctOptionIndex: 2,
  },

  // --- সাকিন ---
  {
    id: "sak_easy",
    sectionId: "sakin",
    difficulty: "easy",
    questionText: "'সাকিন' চিহ্ন (ْ) থাকা অক্ষরের উচ্চারণ কেমন হয়?",
    options: [
      "কোনো স্বরধ্বনি ছাড়া থেমে উচ্চারিত হয়",
      "জোরে টেনে উচ্চারিত হয়",
      "দ্বিগুণ উচ্চারিত হয়",
      "উচ্চারণ করাই হয় না",
    ],
    correctOptionIndex: 0,
  },
  {
    id: "sak_medium",
    sectionId: "sakin",
    difficulty: "medium",
    questionText: "নূন সাকিন (نْ) এর পরে 'ইয়া' (ي) আসলে কোন হুকুম প্রযোজ্য হবে (যখন একই শব্দে না থাকে)?",
    options: ["ইজহার", "ইদগাম বিগুন্নাহ", "ইকলাব", "ইখফা"],
    correctOptionIndex: 1,
  },
  {
    id: "sak_hard",
    sectionId: "sakin",
    difficulty: "hard",
    questionText: "মীম সাকিন (مْ) এর তিনটি হুকুমের মধ্যে কোনটি নেই?",
    options: ["ইখফা শাফাবি", "ইদগাম মিসলাইন", "ইকলাব", "ইজহার শাফাবি"],
    correctOptionIndex: 2,
  },

  // --- মাদ ---
  {
    id: "madd_easy",
    sectionId: "madd",
    difficulty: "easy",
    questionText: "'মাদ' শব্দের অর্থ কী?",
    options: ["থামা", "টেনে লম্বা করে পড়া", "দ্রুত পড়া", "নিঃশব্দে পড়া"],
    correctOptionIndex: 1,
  },
  {
    id: "madd_medium",
    sectionId: "madd",
    difficulty: "medium",
    questionText: "মাদ আসলি (স্বাভাবিক মাদ) সাধারণত কত হারাকাত (মাত্রা) টানা হয়?",
    options: ["১ হারাকাত", "২ হারাকাত", "৪-৫ হারাকাত", "৬ হারাকাত"],
    correctOptionIndex: 1,
  },
  {
    id: "madd_hard",
    sectionId: "madd",
    difficulty: "hard",
    questionText: "'মাদ লাজিম' (আবশ্যক মাদ) কত হারাকাত টানতে হয়?",
    options: ["২ হারাকাত", "৪ হারাকাত", "৬ হারাকাত", "৮ হারাকাত"],
    correctOptionIndex: 2,
  },

  // --- মাখরাজ ---
  {
    id: "makh_easy",
    sectionId: "makhraj",
    difficulty: "easy",
    questionText: "'মাখরাজ' শব্দের অর্থ কী?",
    options: ["অক্ষরের অর্থ", "অক্ষরের উচ্চারণস্থল", "অক্ষরের নাম", "অক্ষরের হরকত"],
    correctOptionIndex: 1,
  },
  {
    id: "makh_medium",
    sectionId: "makhraj",
    difficulty: "medium",
    questionText: "'ব' (ب), 'ম' (م), 'ও' (و) অক্ষরগুলোর মূল মাখরাজ কোনটি?",
    options: ["কণ্ঠনালী (হালক)", "জিহ্বা (লিসান)", "দুই ঠোঁট (শাফাতাইন)", "নাসিকা (খাইশুম)"],
    correctOptionIndex: 2,
  },
  {
    id: "makh_hard",
    sectionId: "makhraj",
    difficulty: "hard",
    questionText: "'ص'، 'س'، 'ز' অক্ষরগুলোর মাখরাজের নির্দিষ্ট নাম কী?",
    options: [
      "আসলি লিসান (জিহ্বার প্রান্ত)",
      "আসিলুল লিসান (জিহ্বার গোড়া)",
      "হুরুফুস সাফির (শিসধ্বনির অক্ষর)",
      "হুরুফুল কালকালাহ",
    ],
    correctOptionIndex: 2,
  },

  // --- তাজবীদ ---
  {
    id: "taj_easy",
    sectionId: "tajweed",
    difficulty: "easy",
    questionText: "তাজবীদ শেখার মূল উদ্দেশ্য কী?",
    options: [
      "দ্রুত কুরআন পড়া শেখা",
      "কুরআন সঠিক উচ্চারণ ও নিয়ম মেনে পড়া",
      "কুরআন মুখস্থ করা",
      "কুরআনের অনুবাদ শেখা",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "taj_medium",
    sectionId: "tajweed",
    difficulty: "medium",
    questionText: "'গুন্নাহ' বলতে কী বোঝায়?",
    options: [
      "মুখ দিয়ে উচ্চারণ",
      "নাক দিয়ে ধ্বনির অনুরণন (২ হারাকাত পরিমাণ)",
      "জিহ্বা দিয়ে উচ্চারণ",
      "ঠোঁট বন্ধ রাখা",
    ],
    correctOptionIndex: 1,
  },
  {
    id: "taj_hard",
    sectionId: "tajweed",
    difficulty: "hard",
    questionText: "'কালকালাহ' অক্ষরগুলো (ق ط ب ج د) সাকিন অবস্থায় থাকলে কী হয়?",
    options: [
      "উচ্চারণ সম্পূর্ণ বাদ যায়",
      "একটি লাফানো/কম্পনযুক্ত ধ্বনি উৎপন্ন হয়",
      "দ্বিগুণ উচ্চারিত হয়",
      "পরবর্তী অক্ষরের সাথে মিশে যায়",
    ],
    correctOptionIndex: 1,
  },

  // --- সূরা পাঠ ---
  {
    id: "sur_easy",
    sectionId: "surah_reading",
    difficulty: "easy",
    questionText: "কুরআনের প্রথম সূরার নাম কী?",
    options: ["সূরা বাকারা", "সূরা ফাতিহা", "সূরা ইখলাস", "সূরা নাস"],
    correctOptionIndex: 1,
  },
  {
    id: "sur_medium",
    sectionId: "surah_reading",
    difficulty: "medium",
    questionText: "সূরা ফাতিহায় মোট কতটি আয়াত আছে?",
    options: ["৫টি", "৭টি", "৯টি", "১১টি"],
    correctOptionIndex: 1,
  },
  {
    id: "sur_hard",
    sectionId: "surah_reading",
    difficulty: "hard",
    questionText: "নামাজে সূরা ফাতিহা পড়ার পর 'আমীন' বলার সময় কোন নিয়ম প্রযোজ্য?",
    options: [
      "সবসময় নিঃশব্দে বলতে হয়",
      "ইমামের সাথে মিলিয়ে বলা মুস্তাহাব, উচ্চস্বরে নামাজে ইমাম-মুক্তাদি উভয়ে বলতে পারেন",
      "শুধু ইমাম বলবেন",
      "'আমীন' বলা নিষিদ্ধ",
    ],
    correctOptionIndex: 1,
  },
];

export function getQuestionsBySection(sectionId: AssessmentSectionId): AssessmentQuestion[] {
  return QUESTION_BANK.filter((q) => q.sectionId === sectionId);
}

export function getQuestion(
  sectionId: AssessmentSectionId,
  difficulty: "easy" | "medium" | "hard"
): AssessmentQuestion {
  const question = QUESTION_BANK.find(
    (q) => q.sectionId === sectionId && q.difficulty === difficulty
  );
  if (!question) {
    throw new Error(`প্রশ্ন পাওয়া যায়নি: ${sectionId} - ${difficulty}`);
  }
  return question;
}
