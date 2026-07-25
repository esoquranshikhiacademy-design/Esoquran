/**
 * Firestore collection: dailyContent/{date}  (date ফরম্যাট: YYYY-MM-DD)
 * প্রতিদিন একটা করে ডকুমেন্ট, বা অ্যাডমিন প্যানেল থেকে ব্যাচে সেট করা "pool"
 * থেকে র‍্যান্ডম বাছাই করা যাবে (Phase 7 এ অ্যাডমিন প্যানেল থেকে ম্যানেজ হবে)
 */
export interface DailyContent {
  date: string;
  ayah: {
    arabic: string;
    bengali: string;
    reference: string; // যেমন: "সূরা বাকারা, আয়াত ১৫৩"
  };
  dua: {
    arabic: string;
    bengali: string;
    title: string;
  };
  hadith: {
    bengali: string;
    reference: string;
  };
}
