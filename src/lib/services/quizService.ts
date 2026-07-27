import {
  collection,
  collectionGroup,
  doc,
  addDoc,
  getDocs,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { calculateAutoScore, type QuizAnswer, type QuizAttempt, type QuizQuestion } from "@/types/quiz";
import { getPublishedCourses } from "@/lib/services/courseService";
import type { Course } from "@/types/course";

function quizCollection(courseId: string, lessonId: string) {
  return collection(db, "courses", courseId, "lessons", lessonId, "quiz");
}

export async function getQuizQuestions(
  courseId: string,
  lessonId: string
): Promise < QuizQuestion[] > {
  const q = query(quizCollection(courseId, lessonId), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as QuizQuestion);
}

export async function createQuizQuestion(
  courseId: string,
  lessonId: string,
  data: Omit < QuizQuestion, "id" >
): Promise < string > {
  const docRef = await addDoc(quizCollection(courseId, lessonId), data);
  return docRef.id;
}

export async function submitQuizAttempt(
  userId: string,
  courseId: string,
  lessonId: string,
  questions: QuizQuestion[],
  answers: QuizAnswer[]
): Promise < QuizAttempt > {
  const { autoScorePercent, hasShortAnswerPendingReview } = calculateAutoScore(
    questions,
    answers
  );
  
  const attempt: QuizAttempt = {
    id: `${userId}_${lessonId}`,
    userId,
    courseId,
    lessonId,
    answers,
    autoScorePercent,
    hasShortAnswerPendingReview,
    submittedAt: new Date().toISOString(),
  };
  
  await setDoc(doc(db, "quizAttempts", attempt.id), attempt);
  return attempt;
}

/**
 * Quiz Center এর জন্য - সব প্রকাশিত কোর্সের সব লেসনের quiz প্রশ্ন একত্রিত করে আনে।
 * collectionGroup("quiz") দিয়ে একবারে সব কোর্স/লেসন জুড়ে কুয়েরি করা হয় (courseId/lessonId
 * ধরে ধরে আলাদা fetch করার চেয়ে অনেক বেশি efficient)।
 *
 * প্রতিটা প্রশ্নের সাথে courseTitle যুক্ত করা হয় (কোন কোর্স থেকে এসেছে তা দেখানোর জন্য)।
 * lessonTitle ইচ্ছাকৃতভাবে বাদ দেওয়া হয়েছে - lesson ডকুমেন্ট আলাদাভাবে fetch করতে
 * lesson-level enrollment permission লাগত, যা Quiz Center কে একটা সাধারণ
 * ব্রাউজ/রিভিউ টুল রাখার উদ্দেশ্যের সাথে অপ্রয়োজনীয় জটিলতা যোগ করত।
 */
export interface CentralQuizQuestion extends QuizQuestion {
  courseTitle: string;
}

export async function getAllQuizQuestionsForCenter(): Promise < CentralQuizQuestion[] > {
  const publishedCourses = await getPublishedCourses();
  const courseMap = new Map < string,
    Course > (publishedCourses.map((c) => [c.id, c]));
  
  const snap = await getDocs(collectionGroup(db, "quiz"));
  
  const results: CentralQuizQuestion[] = [];
  for (const docSnap of snap.docs) {
    const data = docSnap.data() as QuizQuestion;
    // শুধু প্রকাশিত কোর্সের প্রশ্ন দেখানো হবে (draft কোর্সের quiz Quiz Center এ আসবে না)
    const course = courseMap.get(data.courseId);
    if (!course) continue;
    
    results.push({
      ...data,
      id: docSnap.id,
      courseTitle: course.title,
    });
  }
  
  return results;
}