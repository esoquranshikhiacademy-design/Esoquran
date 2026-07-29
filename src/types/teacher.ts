/**
 * "ওস্তাদ" সেকশনের জন্য শিক্ষকের প্রোফাইল টাইপ।
 * Phase 4-এ স্ট্যাটিক ডেটা দিয়ে শুরু, পরবর্তীতে Firestore থেকে আসতে পারে।
 */
export interface Teacher {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoURL?: string | null;
  qualifications?: string[];
}
