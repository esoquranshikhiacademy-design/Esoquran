import { doc, getDoc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { buildProgressId, type LessonProgress } from "@/types/enrollment";

const PROGRESS = "lessonProgress";

export async function getLessonProgress(
  userId: string,
  lessonId: string
): Promise<LessonProgress | null> {
  const id = buildProgressId(userId, lessonId);
  const snap = await getDoc(doc(db, PROGRESS, id));
  if (!snap.exists()) return null;
  return snap.data() as LessonProgress;
}

export async function getCourseProgress(
  userId: string,
  courseId: string
): Promise<LessonProgress[]> {
  const q = query(
    collection(db, PROGRESS),
    where("userId", "==", userId),
    where("courseId", "==", courseId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as LessonProgress);
}

export async function markLessonProgress(
  userId: string,
  courseId: string,
  lessonId: string,
  updates: Partial<Pick<LessonProgress, "isCompleted" | "videoWatchedPercent" | "quizScore">>
): Promise<void> {
  const id = buildProgressId(userId, lessonId);
  const existing = await getLessonProgress(userId, lessonId);
  const now = new Date().toISOString();

  const data: LessonProgress = {
    id,
    userId,
    courseId,
    lessonId,
    isCompleted: existing?.isCompleted ?? false,
    videoWatchedPercent: existing?.videoWatchedPercent ?? 0,
    quizScore: existing?.quizScore ?? null,
    lastAccessedAt: now,
    completedAt: existing?.completedAt ?? null,
    ...updates,
  };

  if (updates.isCompleted && !existing?.isCompleted) {
    data.completedAt = now;
  }

  await setDoc(doc(db, PROGRESS, id), data);
}
