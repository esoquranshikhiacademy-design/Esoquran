import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AssessmentResult } from "@/types/assessment";

const ASSESSMENT_RESULTS = "assessmentResults";

export async function getAssessmentResult(userId: string): Promise<AssessmentResult | null> {
  const snap = await getDoc(doc(db, ASSESSMENT_RESULTS, userId));
  if (!snap.exists()) return null;
  return snap.data() as AssessmentResult;
}

/**
 * Assessment রেজাল্ট সেভ করা এবং একই সাথে ইউজারের প্রোফাইল আপডেট করা
 * (hasCompletedAssessment ও currentLevel) - দুটো আলাদা ডকুমেন্ট কিন্তু
 * একটাই কাজের ফলাফল, তাই একসাথে একটা ফাংশনে রাখা হলো যাতে কলার সাইটে
 * দুইবার আলাদা কল করে ভুলে যাওয়ার ঝুঁকি না থাকে।
 */
export async function saveAssessmentResult(result: AssessmentResult): Promise<void> {
  await setDoc(doc(db, ASSESSMENT_RESULTS, result.id), result);
  await updateDoc(doc(db, "users", result.userId), {
    hasCompletedAssessment: true,
    currentLevel: result.overallLevel,
    updatedAt: new Date().toISOString(),
  });
}
