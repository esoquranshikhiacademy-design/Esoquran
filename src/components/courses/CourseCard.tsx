"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, BarChart3, User } from "lucide-react";
import type { Course } from "@/types/course";

const LEVEL_LABEL: Record<Course["level"], string> = {
  beginner: "শুরুর স্তর",
  intermediate: "মধ্যম স্তর",
  advanced: "উচ্চ স্তর",
};

const LEVEL_COLOR: Record<Course["level"], string> = {
  beginner: "bg-primary-50 text-primary-700",
  intermediate: "bg-gold-50 text-gold-700",
  advanced: "bg-red-50 text-red-600",
};

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/courses/${course.id}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="flex h-36 items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
          <BookOpen size={36} className="text-primary-600" />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span
            className={`mb-2 inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${LEVEL_COLOR[course.level]}`}
          >
            {LEVEL_LABEL[course.level]}
          </span>
          <h3 className="mb-1 text-base font-semibold text-ink-900 line-clamp-2">
            {course.title}
          </h3>
          <p className="mb-3 flex-1 text-sm text-ink-500 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center justify-between border-t border-ink-100 pt-3 text-xs text-ink-400">
            <span className="flex items-center gap-1">
              <BarChart3 size={12} />
              {course.totalLessons} লেসন
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {course.estimatedHours} ঘণ্টা
            </span>
            <span className="flex items-center gap-1">
              <User size={12} />
              {course.instructorName}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
