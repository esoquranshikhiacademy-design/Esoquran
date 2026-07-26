"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Loader2,
  Clock,
  BarChart3,
  User,
  PlayCircle,
  Lock,
  CheckCircle2,
  HourglassIcon,
  XCircle,
} from "lucide-react";
import { getCourseById, getLessonsByCourse } from "@/lib/services/courseService";
import {
  getEnrollmentStatus,
  requestEnrollment,
} from "@/lib/services/enrollmentService";
import { getCourseProgress } from "@/lib/services/progressService";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import type { Course, Lesson } from "@/types/course";
import type { Enrollment, LessonProgress } from "@/types/enrollment";
import { cn } from "@/lib/utils";

const LEVEL_LABEL: Record<Course["level"], string> = {
  beginner: "শুরুর স্তর",
  intermediate: "মধ্যম স্তর",
  advanced: "উচ্চ স্তর",
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const { user, profile } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, LessonProgress>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [courseData, lessonData] = await Promise.all([
        getCourseById(courseId),
        getLessonsByCourse(courseId),
      ]);
      setCourse(courseData);
      setLessons(lessonData);

      if (user) {
        const enrollmentData = await getEnrollmentStatus(user.uid, courseId);
        setEnrollment(enrollmentData);

        if (enrollmentData?.status === "approved") {
          const progressData = await getCourseProgress(user.uid, courseId);
          const map: Record<string, LessonProgress> = {};
          progressData.forEach((p) => (map[p.lessonId] = p));
          setProgressMap(map);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [courseId, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleEnrollRequest() {
    if (!user || !profile || !course) {
      router.push("/login");
      return;
    }
    setIsRequesting(true);
    try {
      await requestEnrollment(user.uid, profile.name, profile.email, course.id, course.title);
      await loadData();
    } finally {
      setIsRequesting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={28} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-ink-500">কোর্সটি খুঁজে পাওয়া যায়নি।</p>
        <Link href="/courses" className="mt-3 inline-block text-sm font-semibold text-primary-700">
          সব কোর্স দেখুন
        </Link>
      </div>
    );
  }

  const isApproved = enrollment?.status === "approved";
  const isPending = enrollment?.status === "pending";
  const isRejected = enrollment?.status === "rejected";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* কোর্স হেডার */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-2xl border border-primary-100 bg-white p-6 shadow-sm"
      >
        <span className="mb-2 inline-block rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
          {LEVEL_LABEL[course.level]}
        </span>
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">{course.title}</h1>
        <p className="mt-2 text-sm text-ink-600">{course.description}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-500">
          <span className="flex items-center gap-1.5">
            <BarChart3 size={15} /> {lessons.length} লেসন
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} /> {course.estimatedHours} ঘণ্টা
          </span>
          <span className="flex items-center gap-1.5">
            <User size={15} /> {course.instructorName}
          </span>
        </div>

        {/* Enrollment স্ট্যাটাস / বাটন */}
        <div className="mt-5 border-t border-primary-100 pt-5">
          {isApproved && (
            <p className="flex items-center gap-2 text-sm font-medium text-primary-700">
              <CheckCircle2 size={16} /> আপনি এই কোর্সে ভর্তি আছেন
            </p>
          )}
          {isPending && (
            <p className="flex items-center gap-2 text-sm font-medium text-gold-700">
              <HourglassIcon size={16} /> আপনার এনরোলমেন্ট রিকোয়েস্ট পর্যালোচনাধীন
            </p>
          )}
          {isRejected && (
            <p className="flex items-center gap-2 text-sm font-medium text-red-600">
              <XCircle size={16} /> আপনার রিকোয়েস্ট গ্রহণ করা হয়নি
              {enrollment?.note ? ` — ${enrollment.note}` : ""}
            </p>
          )}
          {!enrollment && (
            <Button
              onClick={handleEnrollRequest}
              isLoading={isRequesting}
              className="w-full sm:w-auto"
            >
              এনরোলমেন্ট রিকোয়েস্ট পাঠান
            </Button>
          )}
        </div>
      </motion.div>

      {/* লেসন লিস্ট */}
      <h2 className="mb-4 text-lg font-semibold text-primary-950">কোর্স কারিকুলাম</h2>
      <div className="space-y-2">
        {lessons.length === 0 && (
          <p className="rounded-xl border border-dashed border-primary-200 bg-primary-50/50 p-6 text-center text-sm text-ink-500">
            এই কোর্সে এখনো কোনো লেসন যুক্ত হয়নি।
          </p>
        )}
        {lessons.map((lesson, index) => {
          const canAccess = isApproved || lesson.isFreePreview;
          const isCompleted = progressMap[lesson.id]?.isCompleted;

          const content = (
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl border border-primary-100 bg-white p-4 transition-colors",
                canAccess ? "hover:border-primary-300" : "opacity-60"
              )}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                {isCompleted ? (
                  <CheckCircle2 size={18} className="text-primary-600" />
                ) : canAccess ? (
                  <PlayCircle size={18} />
                ) : (
                  <Lock size={16} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-800">
                  {index + 1}. {lesson.title}
                </p>
                <p className="truncate text-xs text-ink-400">{lesson.summary}</p>
              </div>
              {lesson.isFreePreview && !isApproved && (
                <span className="shrink-0 rounded-full bg-gold-50 px-2 py-0.5 text-xs text-gold-700">
                  ফ্রি প্রিভিউ
                </span>
              )}
              {lesson.durationMinutes ? (
                <span className="shrink-0 text-xs text-ink-400">
                  {lesson.durationMinutes} মিনিট
                </span>
              ) : null}
            </div>
          );

          return canAccess ? (
            <Link key={lesson.id} href={`/courses/${courseId}/lesson/${lesson.id}`}>
              {content}
            </Link>
          ) : (
            <div key={lesson.id}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
