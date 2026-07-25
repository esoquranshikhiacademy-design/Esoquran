/**
 * Firestore collection: courses/{courseId}/lessons/{lessonId}/assignmentSubmissions/{userId}
 * প্রতিটা লেসনে একটাই assignment ধরা হচ্ছে (এই ফেজে) - টেক্সট বা ফাইল সাবমিশন।
 * ডকুমেন্ট আইডি হিসেবে userId ব্যবহার করা হচ্ছে, তাই একজন ইউজার একটা লেসনে
 * একটাই সাবমিশন রাখতে পারবে (নতুন সাবমিশন আগেরটা ওভাররাইট করবে)।
 */
export interface AssignmentSubmission {
  id: string; // userId
  userId: string;
  userName: string;
  courseId: string;
  lessonId: string;
  textContent?: string;
  fileUrl?: string | null;
  fileName?: string | null;
  submittedAt: string;
  status: "submitted" | "reviewed";
  feedback?: string; // শিক্ষকের মন্তব্য (পরের ফেজে রিভিউ UI আসবে)
}

/**
 * Firestore collection: courses/{courseId}/lessons/{lessonId}/comments/{commentId}
 * সাধারণ, ফ্ল্যাট ডিসকাশন থ্রেড - reply এর জন্য parentCommentId ব্যবহার হবে
 * (nested replies দেখাতে ক্লায়েন্ট সাইডে গ্রুপ করা হবে, Firestore এ সাব-সাব-কালেকশন নয়)
 */
export interface LessonComment {
  id: string;
  lessonId: string;
  courseId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string | null;
  text: string;
  parentCommentId?: string | null;
  createdAt: string;
}
