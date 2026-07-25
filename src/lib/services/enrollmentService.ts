import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { buildEnrollmentId, createEnrollmentRequest, type Enrollment } from "@/types/enrollment";

const ENROLLMENTS = "enrollments";

export async function requestEnrollment(
  userId: string,
  userName: string,
  userEmail: string,
  courseId: string,
  courseTitle: string
): Promise<void> {
  const enrollment = createEnrollmentRequest(userId, userName, userEmail, courseId, courseTitle);
  // setDoc (addDoc নয়) যাতে একই ইউজার+কোর্সের জন্য ডকুমেন্ট আইডি ফিক্সড থাকে -
  // দ্বিতীয়বার রিকোয়েস্ট করলে আগেরটাই আপডেট হবে, ডুপ্লিকেট তৈরি হবে না।
  await setDoc(doc(db, ENROLLMENTS, enrollment.id), enrollment);
}

export async function getEnrollmentStatus(
  userId: string,
  courseId: string
): Promise<Enrollment | null> {
  const id = buildEnrollmentId(userId, courseId);
  const snap = await getDoc(doc(db, ENROLLMENTS, id));
  if (!snap.exists()) return null;
  return snap.data() as Enrollment;
}

export async function getUserApprovedCourseIds(userId: string): Promise<string[]> {
  const q = query(
    collection(db, ENROLLMENTS),
    where("userId", "==", userId),
    where("status", "==", "approved")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => (d.data() as Enrollment).courseId);
}

export async function getPendingEnrollments(): Promise<Enrollment[]> {
  const q = query(collection(db, ENROLLMENTS), where("status", "==", "pending"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as Enrollment);
}

export async function decideEnrollment(
  enrollmentId: string,
  decision: "approved" | "rejected",
  adminUid: string
): Promise<void> {
  await updateDoc(doc(db, ENROLLMENTS, enrollmentId), {
    status: decision,
    decidedAt: new Date().toISOString(),
    decidedBy: adminUid,
  });
}
