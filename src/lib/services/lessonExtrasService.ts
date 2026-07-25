import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type { AssignmentSubmission } from "@/types/lesson-extras";
import type { LessonComment } from "@/types/lesson-extras";

// --- Assignment ---

function assignmentCollection(courseId: string, lessonId: string) {
  return collection(db, "courses", courseId, "lessons", lessonId, "assignmentSubmissions");
}

export async function getMyAssignmentSubmission(
  courseId: string,
  lessonId: string,
  userId: string
): Promise<AssignmentSubmission | null> {
  const snap = await getDoc(doc(assignmentCollection(courseId, lessonId), userId));
  if (!snap.exists()) return null;
  return snap.data() as AssignmentSubmission;
}

export async function submitAssignment(
  courseId: string,
  lessonId: string,
  userId: string,
  userName: string,
  textContent: string,
  file?: File | null
): Promise<void> {
  let fileUrl: string | null = null;
  let fileName: string | null = null;

  if (file) {
    // Storage path: assignments/{courseId}/{lessonId}/{userId}/{fileName}
    const storageRef = ref(
      storage,
      `assignments/${courseId}/${lessonId}/${userId}/${file.name}`
    );
    await uploadBytes(storageRef, file);
    fileUrl = await getDownloadURL(storageRef);
    fileName = file.name;
  }

  const submission: AssignmentSubmission = {
    id: userId,
    userId,
    userName,
    courseId,
    lessonId,
    textContent,
    fileUrl,
    fileName,
    submittedAt: new Date().toISOString(),
    status: "submitted",
  };

  await setDoc(doc(assignmentCollection(courseId, lessonId), userId), submission);
}

// --- Comments ---

function commentsCollection(courseId: string, lessonId: string) {
  return collection(db, "courses", courseId, "lessons", lessonId, "comments");
}

export async function getLessonComments(
  courseId: string,
  lessonId: string
): Promise<LessonComment[]> {
  const q = query(commentsCollection(courseId, lessonId), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as LessonComment);
}

export async function postComment(
  courseId: string,
  lessonId: string,
  data: Omit<LessonComment, "id">
): Promise<void> {
  await addDoc(commentsCollection(courseId, lessonId), data);
}
