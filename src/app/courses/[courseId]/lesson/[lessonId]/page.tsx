"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight, StickyNote, FileDown } from "lucide-react";

import { getCourseById, getLessonsByCourse, getLessonById } from "@/lib/services/courseService";
import { getEnrollmentStatus } from "@/lib/services/enrollmentService";
import { getCourseProgress, markLessonProgress } from "@/lib/services/progressService";
import { getQuizQuestions, submitQuizAttempt } from "@/lib/services/quizService";
import {
  getMyAssignmentSubmission,
  submitAssignment,
  getLessonComments,
  postComment,
} from "@/lib/services/lessonExtrasService";

import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { LessonVideoPlayer } from "@/components/lesson/LessonVideoPlayer";
import { LessonNavigation } from "@/components/lesson/LessonNavigation";
import { LessonQuiz } from "@/components/lesson/LessonQuiz";
import { LessonAssignment } from "@/components/lesson/LessonAssignment";
import { LessonComments } from "@/components/lesson/LessonComments";
import { LessonTabs } from "@/components/lesson/LessonTabs";
import { Button } from "@/components/ui/Button";

import type { Course, Lesson } from "@/types/course";
import type { QuizQuestion, QuizAnswer } from "@/types/quiz";
import type { AssignmentSubmission, LessonComment } from "@/types/lesson-extras";

function LessonPageContent() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;
  const { user, profile } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundOrLocked, setNotFoundOrLocked] = useState(false);

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizResult, setQuizResult] = useState<{
    autoScorePercent: number;
    hasShortAnswerPendingReview: boolean;
  } | null>(null);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);

  const [assignment, setAssignment] = useState<AssignmentSubmission | null>(null);
  const [isSubmittingAssignment, setIsSubmittingAssignment] = useState(false);

  const [comments, setComments] = useState<LessonComment[]>([]);
  const [isPostingComment, setIsPostingComment] = useState(false);

  const loadLesson = useCallback(async () => {
    if (!user || !profile) return;
    setIsLoading(true);
    setNotFoundOrLocked(false);

    try {
      const [courseData, lessonList, lessonData, enrollmentData] = await Promise.all([
        getCourseById(courseId),
        getLessonsByCourse(courseId),
        getLessonById(courseId, lessonId),
        getEnrollmentStatus(user.uid, courseId),
      ]);

      if (!courseData || !lessonData) {
        setNotFoundOrLocked(true);
        setIsLoading(false);
        return;
      }

      const approved = enrollmentData?.status === "approved";
      const canAccess = approved || lessonData.isFreePreview;

      if (!canAccess) {
        setNotFoundOrLocked(true);
        setIsLoading(false);
        return;
      }

      setCourse(courseData);
      setLessons(lessonList);
      setLesson(lessonData);
      setIsApproved(approved);

      const [progressData, quizData, assignmentData, commentsData] = await Promise.all([
        getCourseProgress(user.uid, courseId),
        getQuizQuestions(courseId, lessonId),
        getMyAssignmentSubmission(courseId, lessonId, user.uid),
        getLessonComments(courseId, lessonId),
      ]);

      setCompletedLessonIds(
        new Set(progressData.filter((p) => p.isCompleted).map((p) => p.lessonId))
      );
      setQuizQuestions(quizData);
      setAssignment(assignmentData);
      setComments(commentsData);

      // লেসনে ঢোকা মাত্র access টাইমস্ট্যাম্প আপডেট (progress ডকুমেন্ট তৈরি/আপডেট হবে)
      await markLessonProgress(user.uid, courseId, lessonId, {});
    } finally {
      setIsLoading(false);
    }
  }, [courseId, lessonId, user, profile]);

  useEffect(() => {
    loadLesson();
  }, [loadLesson]);

  async function handleMarkComplete() {
    if (!user) return;
    await markLessonProgress(user.uid, courseId, lessonId, { isCompleted: true });
    setCompletedLessonIds((prev) => new Set(prev).add(lessonId));
  }

  async function handleQuizSubmit(answers: QuizAnswer[]) {
    if (!user) return;
    setIsSubmittingQuiz(true);
    try {
      const attempt = await submitQuizAttempt(
        user.uid,
        courseId,
        lessonId,
        quizQuestions,
        answers
      );
      setQuizResult({
        autoScorePercent: attempt.autoScorePercent,
        hasShortAnswerPendingReview: attempt.hasShortAnswerPendingReview,
      });
      await markLessonProgress(user.uid, courseId, lessonId, {
        quizScore: attempt.autoScorePercent,
      });
    } finally {
      setIsSubmittingQuiz(false);
    }
  }

  async function handleAssignmentSubmit(text: string, file: File | null) {
    if (!user || !profile) return;
    setIsSubmittingAssignment(true);
    try {
      await submitAssignment(courseId, lessonId, user.uid, profile.name, text, file);
      const updated = await getMyAssignmentSubmission(courseId, lessonId, user.uid);
      setAssignment(updated);
    } finally {
      setIsSubmittingAssignment(false);
    }
  }

  async function handlePostComment(text: string) {
    if (!user || !profile) return;
    setIsPostingComment(true);
    try {
      await postComment(courseId, lessonId, {
        lessonId,
        courseId,
        userId: user.uid,
        userName: profile.name,
        userPhotoURL: profile.photoURL,
        text,
        parentCommentId: null,
        createdAt: new Date().toISOString(),
      });
      const updated = await getLessonComments(courseId, lessonId);
      setComments(updated);
    } finally {
      setIsPostingComment(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={28} />
      </div>
    );
  }

  if (notFoundOrLocked || !course || !lesson) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-ink-500">
          এই লেসনটি পাওয়া যায়নি, অথবা দেখার জন্য এনরোলমেন্ট প্রয়োজন।
        </p>
        <Link
          href={`/courses/${courseId}`}
          className="mt-3 inline-block text-sm font-semibold text-primary-700"
        >
          কোর্স পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const currentIndex = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const isCompleted = completedLessonIds.has(lessonId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr_260px]">
        {/* বামে - Course Navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[80vh] overflow-y-auto rounded-2xl border border-primary-100 bg-white p-3">
            <LessonNavigation
              courseId={courseId}
              lessons={lessons}
              currentLessonId={lessonId}
              completedLessonIds={completedLessonIds}
              isApproved={isApproved}
            />
          </div>
        </aside>

        {/* মাঝে - ভিডিও ও মূল কনটেন্ট */}
        <main>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <LessonVideoPlayer youtubeVideoId={lesson.youtubeVideoId} />

            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-primary-950">{lesson.title}</h1>
                <p className="mt-1 text-sm text-ink-500">{lesson.summary}</p>
              </div>
              {!isCompleted && (
                <Button onClick={handleMarkComplete} className="w-auto shrink-0 px-4">
                  সম্পন্ন করুন
                </Button>
              )}
            </div>

            {/* আগের/পরের লেসন নেভিগেশন */}
            <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4">
              {prevLesson ? (
                <Link
                  href={`/courses/${courseId}/lesson/${prevLesson.id}`}
                  className="flex items-center gap-1 text-sm font-medium text-primary-700"
                >
                  <ChevronLeft size={16} /> আগের লেসন
                </Link>
              ) : (
                <span />
              )}
              {nextLesson ? (
                <Link
                  href={`/courses/${courseId}/lesson/${nextLesson.id}`}
                  className="flex items-center gap-1 text-sm font-medium text-primary-700"
                >
                  পরের লেসন <ChevronRight size={16} />
                </Link>
              ) : (
                <span />
              )}
            </div>

            {/* নিচে ট্যাব: transcript, reference, exercise/assignment, quiz, comments */}
            <div className="mt-8">
              <LessonTabs
                tabs={[
                  {
                    key: "transcript",
                    label: "ট্রান্সক্রিপ্ট",
                    content: (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-600">
                        {lesson.transcript || "এই লেসনের জন্য কোনো ট্রান্সক্রিপ্ট নেই।"}
                      </p>
                    ),
                  },
                  {
                    key: "reference",
                    label: "রেফারেন্স",
                    content: (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-600">
                        {lesson.referenceNotes || "কোনো অতিরিক্ত রেফারেন্স যুক্ত করা হয়নি।"}
                      </p>
                    ),
                  },
                  {
                    key: "assignment",
                    label: "অ্যাসাইনমেন্ট",
                    content: (
                      <LessonAssignment
                        existingSubmission={assignment}
                        onSubmit={handleAssignmentSubmit}
                        isSubmitting={isSubmittingAssignment}
                      />
                    ),
                  },
                  {
                    key: "quiz",
                    label: "কুইজ",
                    content: (
                      <LessonQuiz
                        questions={quizQuestions}
                        onSubmit={handleQuizSubmit}
                        isSubmitting={isSubmittingQuiz}
                        result={quizResult}
                      />
                    ),
                  },
                  {
                    key: "comments",
                    label: `মন্তব্য (${comments.length})`,
                    content: (
                      <LessonComments
                        comments={comments}
                        onPost={handlePostComment}
                        isPosting={isPostingComment}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </motion.div>
        </main>

        {/* ডানে - নোটস ও ডাউনলোড */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-2xl border border-primary-100 bg-white p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink-800">
                <StickyNote size={15} /> আপনার নোট
              </p>
              <textarea
                rows={8}
                placeholder="এখানে নিজের নোট লিখে রাখুন (শুধু আপনার ব্রাউজারে সংরক্ষিত থাকবে)"
                className="w-full rounded-lg border border-ink-100 p-2 text-sm outline-none ring-primary-500 focus:ring-2"
              />
            </div>

            {lesson.pdfUrl && (
              <a
                href={lesson.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-primary-100 bg-white p-4 text-sm font-medium text-primary-700 hover:bg-primary-50"
              >
                <FileDown size={16} />
                {lesson.pdfName || "লেসন পিডিএফ ডাউনলোড করুন"}
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function LessonPage() {
  return (
    <ProtectedRoute>
      <LessonPageContent />
    </ProtectedRoute>
  );
}
