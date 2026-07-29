import { redirect } from "next/navigation";

/**
 * এই হাব পেজটা আর সরাসরি নেভিগেশনে নেই — বর্ণমালা ও কুরআন(রিডিং ল্যাব)
 * এখন আলাদা বটম-ন্যাভ ট্যাব হিসেবে সরাসরি নিজ নিজ পেজে যায়।
 * তাজবীদ, মাখরাজ, কুইজ সেন্টার হ্যামবার্গার মেনুতে সরানো হয়েছে (Phase 4)।
 * পুরনো /quran-learning লিংক থেকে আসলে বর্ণমালায় পাঠিয়ে দেওয়া হচ্ছে।
 */
export default function QuranLearningIndexRedirect() {
  redirect("/quran-learning/arabic-alphabet");
}
