/**
 * i18n Dictionary
 * এখন শুধু bn (বাংলা) এবং en (English) সাপোর্ট করছে।
 * আরবি (ar) Phase 7 এ পূর্ণাঙ্গভাবে যোগ হবে - কাঠামো এখনই রাখা হলো
 * যাতে পরে পুরো অ্যাপ জুড়ে রিফ্যাক্টর করতে না হয়।
 */

export const dictionary = {
  bn: {
    nav: {
      home: "হোম",
      quranLearning: "কুরআন শিক্ষা",
      courses: "কোর্সসমূহ",
      selfAssessment: "যাচাই করুন",
      resources: "রিসোর্স",
      dashboard: "ড্যাশবোর্ড",
      login: "লগইন",
      register: "রেজিস্ট্রেশন",
      logout: "লগআউট",
    },
    hero: {
      title: "এসো কুরআন শিখি একাডেমি",
      subtitle: "ধাপে ধাপে, সঠিক তাজবীদসহ কুরআন শেখার সম্পূর্ণ প্ল্যাটফর্ম",
      cta: "শেখা শুরু করুন",
      ctaSecondary: "নিজেকে যাচাই করুন",
    },
    todaySection: {
      ayah: "আজকের আয়াত",
      dua: "আজকের দোয়া",
      hadith: "আজকের হাদিস",
      progress: "আজকের অগ্রগতি",
    },
    journey: {
      title: "আপনার শেখার যাত্রা",
      steps: [
        "শুরু করুন",
        "নিজেকে যাচাই করুন",
        "লেভেল নির্ধারণ",
        "কোর্স সাজেশন",
        "শেখা",
        "প্র্যাকটিস",
        "কুইজ",
        "লাইভ মূল্যায়ন",
        "সার্টিফিকেট",
        "পরবর্তী কোর্স",
      ],
    },
    search: {
      placeholder: "মাখরাজ, তাজবীদ, সূরা ফাতিহা... যা খুশি সার্চ করুন",
    },
    footer: {
      about: "একটি স্মার্ট ইসলামিক লার্নিং প্ল্যাটফর্ম",
      quickLinks: "দ্রুত লিংক",
      contact: "যোগাযোগ",
      rights: "সর্বস্বত্ব সংরক্ষিত",
    },
  },
  en: {
    nav: {
      home: "Home",
      quranLearning: "Quran Learning",
      courses: "Courses",
      selfAssessment: "Self Assessment",
      resources: "Resources",
      dashboard: "Dashboard",
      login: "Login",
      register: "Register",
      logout: "Logout",
    },
    hero: {
      title: "Esho Quran Shikhi Academy",
      subtitle: "A complete platform to learn the Quran step by step, with proper Tajweed",
      cta: "Start Learning",
      ctaSecondary: "Take Self Assessment",
    },
    todaySection: {
      ayah: "Today's Ayah",
      dua: "Today's Dua",
      hadith: "Today's Hadith",
      progress: "Today's Progress",
    },
    journey: {
      title: "Your Learning Journey",
      steps: [
        "Start",
        "Self Assessment",
        "Level Determination",
        "Course Suggestion",
        "Learn",
        "Practice",
        "Quiz",
        "Live Assessment",
        "Certificate",
        "Next Course",
      ],
    },
    search: {
      placeholder: "Search Makhraj, Tajweed, Surah Fatiha...",
    },
    footer: {
      about: "A smart Islamic learning platform",
      quickLinks: "Quick Links",
      contact: "Contact",
      rights: "All rights reserved",
    },
  },
} as const;

export type Locale = keyof typeof dictionary;
export type Dictionary = (typeof dictionary)["bn"];
