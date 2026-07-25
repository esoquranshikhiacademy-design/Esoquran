import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Course, Lesson } from "@/types/course";

const COURSES = "courses";

export async function getPublishedCourses(): Promise<Course[]> {
  const q = query(
    collection(db, COURSES),
    where("status", "==", "published"),
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Course);
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  const snap = await getDoc(doc(db, COURSES, courseId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Course;
}

export async function getAllCoursesForAdmin(): Promise<Course[]> {
  const q = query(collection(db, COURSES), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Course);
}

export async function createCourse(data: Omit<Course, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COURSES), data);
  return docRef.id;
}

export async function updateCourse(
  courseId: string,
  data: Partial<Course>
): Promise<void> {
  await updateDoc(doc(db, COURSES, courseId), {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

// --- Lessons (courses/{courseId}/lessons সাব-কালেকশন) ---

function lessonsCollection(courseId: string) {
  return collection(db, COURSES, courseId, "lessons");
}

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  const q = query(lessonsCollection(courseId), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Lesson);
}

export async function getLessonById(
  courseId: string,
  lessonId: string
): Promise<Lesson | null> {
  const snap = await getDoc(doc(db, COURSES, courseId, "lessons", lessonId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Lesson;
}

/**
 * নতুন লেসন তৈরি করে এবং একই সাথে কোর্সের totalLessons কাউন্টার বাড়িয়ে দেয়।
 * দুইটা আলাদা অপারেশন (transaction নয়) কারণ এই স্কেলে race condition এর ঝুঁকি নগণ্য
 * এবং admin-only ফর্ম থেকেই কল হয়।
 */
export async function createLesson(
  courseId: string,
  data: Omit<Lesson, "id">
): Promise<string> {
  const docRef = await addDoc(lessonsCollection(courseId), data);
  await updateDoc(doc(db, COURSES, courseId), {
    totalLessons: increment(1),
    updatedAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateLesson(
  courseId: string,
  lessonId: string,
  data: Partial<Lesson>
): Promise<void> {
  await updateDoc(doc(db, COURSES, courseId, "lessons", lessonId), {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}
