/**
 * Practice Zone - ৮টা ইন্টারেক্টিভ গেম।
 * সব গেমের স্কোর/রেজাল্ট শুধু সেশন-ভিত্তিক (React state), Firestore এ সেভ হয় না -
 * পেজ রিলোড/ছাড়লে হারিয়ে যাবে। এটা ইচ্ছাকৃত সিদ্ধান্ত (হালকা, দ্রুত অনুশীলনের জন্য)।
 */

export type GameId =
  | "letter-matching"
  | "word-matching"
  | "drag-drop"
  | "listening-test"
  | "memory-game"
  | "speed-reading"
  | "missing-letter"
  | "arrange-ayah";

export interface GameMeta {
  id: GameId;
  href: string;
  titleBengali: string;
  description: string;
  dataSource: string; // কোন ডেটাসেট ব্যবহার হয় তার সংক্ষিপ্ত বর্ণনা (UI তে দেখানোর জন্য)
  available: boolean;
}

export const GAMES: GameMeta[] = [
  {
    id: "letter-matching",
    href: "/practice-zone/letter-matching",
    titleBengali: "Letter Matching",
    description: "আরবি অক্ষর তার সঠিক নামের সাথে মেলান",
    dataSource: "আরবি বর্ণমালা",
    available: true,
  },
  {
    id: "word-matching",
    href: "/practice-zone/word-matching",
    titleBengali: "Word Matching",
    description: "আরবি শব্দ তার বাংলা অর্থের সাথে মেলান",
    dataSource: "উদাহরণ শব্দ",
    available: true,
  },
  {
    id: "drag-drop",
    href: "/practice-zone/drag-drop",
    titleBengali: "Drag & Drop",
    description: "অক্ষরগুলো বর্ণমালার সঠিক ক্রমে সাজান",
    dataSource: "আরবি বর্ণমালা",
    available: true,
  },
  {
    id: "listening-test",
    href: "/practice-zone/listening-test",
    titleBengali: "Listening Test",
    description: "শুনে সঠিক অক্ষর/শব্দ বেছে নিন",
    dataSource: "audio প্রয়োজন",
    available: false,
  },
  {
    id: "memory-game",
    href: "/practice-zone/memory-game",
    titleBengali: "Memory Game",
    description: "লুকানো কার্ড উল্টিয়ে জোড়া মেলান",
    dataSource: "আরবি বর্ণমালা",
    available: true,
  },
  {
    id: "speed-reading",
    href: "/practice-zone/speed-reading",
    titleBengali: "Speed Reading",
    description: "নির্দিষ্ট সময়ে যতটা সম্ভব দ্রুত ও সঠিকভাবে পড়ুন",
    dataSource: "কুরআন রিডিং ল্যাব",
    available: true,
  },
  {
    id: "missing-letter",
    href: "/practice-zone/missing-letter",
    titleBengali: "Missing Letter",
    description: "আয়াতের ফাঁকা জায়গায় সঠিক অক্ষর/শব্দ বসান",
    dataSource: "কুরআন রিডিং ল্যাব",
    available: true,
  },
  {
    id: "arrange-ayah",
    href: "/practice-zone/arrange-ayah",
    titleBengali: "Arrange Ayah",
    description: "এলোমেলো শব্দ সাজিয়ে সঠিক আয়াত তৈরি করুন",
    dataSource: "কুরআন রিডিং ল্যাব",
    available: true,
  },
];
