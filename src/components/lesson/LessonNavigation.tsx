"use client";

import Link from "next/link";
import { CheckCircle2, PlayCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/types/course";

export function LessonNavigation({
  courseId,
  lessons,
  currentLessonId,
  completedLessonIds,
  isApproved,
}: {
  courseId: string;
  lessons: Lesson[];
  currentLessonId: string;
  completedLessonIds: Set<string>;
  isApproved: boolean;
}) {
  return (
    <nav className="space-y-1">
      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
        কোর্স কনটেন্ট
      </p>
      {lessons.map((lesson, index) => {
        const canAccess = isApproved || lesson.isFreePreview;
        const isActive = lesson.id === currentLessonId;
        const isCompleted = completedLessonIds.has(lesson.id);

        const inner = (
          <div
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
              isActive
                ? "bg-primary-100 font-medium text-primary-900"
                : canAccess
                  ? "text-ink-600 hover:bg-primary-50"
                  : "text-ink-300"
            )}
          >
            {isCompleted ? (
              <CheckCircle2 size={15} className="shrink-0 text-primary-600" />
            ) : canAccess ? (
              <PlayCircle size={15} className="shrink-0" />
            ) : (
              <Lock size={13} className="shrink-0" />
            )}
            <span className="truncate">
              {index + 1}. {lesson.title}
            </span>
          </div>
        );

        return canAccess ? (
          <Link key={lesson.id} href={`/courses/${courseId}/lesson/${lesson.id}`}>
            {inner}
          </Link>
        ) : (
          <div key={lesson.id}>{inner}</div>
        );
      })}
    </nav>
  );
}
