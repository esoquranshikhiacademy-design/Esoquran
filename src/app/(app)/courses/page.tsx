"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, BookX } from "lucide-react";
import { getPublishedCourses } from "@/lib/services/courseService";
import { CourseCard } from "@/components/courses/CourseCard";
import type { Course, CourseLevel } from "@/types/course";
import { cn } from "@/lib/utils";

const LEVEL_FILTERS: { value: CourseLevel | "all"; label: string }[] = [
  { value: "all", label: "সব" },
  { value: "beginner", label: "শুরুর স্তর" },
  { value: "intermediate", label: "মধ্যম স্তর" },
  { value: "advanced", label: "উচ্চ স্তর" },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [levelFilter, setLevelFilter] = useState<CourseLevel | "all">("all");

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublishedCourses();
        setCourses(data);
      } catch {
        setError("কোর্স লোড করা যায়নি। একটু পর আবার চেষ্টা করুন।");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filteredCourses =
    levelFilter === "all" ? courses : courses.filter((c) => c.level === levelFilter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">কোর্সসমূহ</h1>
        <p className="mt-2 text-sm text-ink-500">
          আপনার লেভেল অনুযায়ী উপযুক্ত কোর্স বেছে নিন
        </p>
      </motion.div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {LEVEL_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setLevelFilter(filter.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              levelFilter === filter.value
                ? "border-primary-700 bg-primary-700 text-white"
                : "border-primary-200 text-primary-700 hover:bg-primary-50"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-primary-600" size={28} />
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-600">
          {error}
        </p>
      )}

      {!isLoading && !error && filteredCourses.length === 0 && (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 py-16 text-center">
          <BookX className="mb-3 text-primary-400" size={32} />
          <p className="text-sm text-ink-500">
            এখনো কোনো কোর্স প্রকাশিত হয়নি। শীঘ্রই যুক্ত হবে।
          </p>
        </div>
      )}

      {!isLoading && filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
