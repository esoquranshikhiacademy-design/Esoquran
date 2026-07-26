"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Trophy, BookOpen, Award, ArrowRight } from "lucide-react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { getUserApprovedCourseIds } from "@/lib/services/enrollmentService";
import { getCourseById } from "@/lib/services/courseService";
import type { Course } from "@/types/course";

function StatCard({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: typeof Flame;
  label: string;
  value: string | number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
        <Icon size={18} />
      </div>
      <p className="text-2xl font-bold text-primary-950">{value}</p>
      <p className="text-sm text-ink-500">{label}</p>
    </motion.div>
  );
}

function DashboardContent() {
  const { user, profile } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const courseIds = await getUserApprovedCourseIds(user.uid);
        const courses = await Promise.all(courseIds.map((id) => getCourseById(id)));
        setEnrolledCourses(courses.filter((c): c is Course => c !== null));
      } finally {
        setIsLoadingCourses(false);
      }
    }
    load();
  }, [user]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">
          স্বাগতম, {profile?.name ?? "শিক্ষার্থী"} 👋
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          {profile?.hasCompletedAssessment
            ? "আপনার শেখার যাত্রা চলছে — চালিয়ে যান!"
            : "আপনার লেভেল যাচাই করতে সেলফ অ্যাসেসমেন্ট সম্পন্ন করুন।"}
        </p>
      </motion.div>

      {!profile?.hasCompletedAssessment && (
        <motion.a
          href="/self-assessment"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary-700 to-primary-800 px-5 py-4 text-white shadow-md"
        >
          <div>
            <p className="font-semibold">সেলফ অ্যাসেসমেন্ট বাকি আছে</p>
            <p className="text-sm text-primary-100">
              ২ মিনিটে যাচাই করুন আপনি কোন লেভেল থেকে শুরু করবেন
            </p>
          </div>
          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-primary-800">
            শুরু করুন
          </span>
        </motion.a>
      )}

      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Flame}
          label="শেখার স্ট্রিক"
          value={`${profile?.streakDays ?? 0} দিন`}
          delay={0}
        />
        <StatCard icon={Trophy} label="মোট XP" value={profile?.xp ?? 0} delay={0.1} />
        <StatCard icon={BookOpen} label="চলমান কোর্স" value={enrolledCourses.length} delay={0.2} />
        <StatCard icon={Award} label="সার্টিফিকেট" value={0} delay={0.3} />
      </div>

      {/* চলমান কোর্স / Continue Learning */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-primary-950">আপনার কোর্সসমূহ</h2>

        {isLoadingCourses && (
          <p className="text-sm text-ink-400">লোড হচ্ছে...</p>
        )}

        {!isLoadingCourses && enrolledCourses.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 p-8 text-center">
            <p className="text-sm text-ink-500">
              আপনি এখনো কোনো কোর্সে ভর্তি হননি।
            </p>
            <Link
              href="/courses"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700"
            >
              কোর্স ব্রাউজ করুন <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {!isLoadingCourses && enrolledCourses.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/courses/${course.id}`}
                  className="flex flex-col rounded-2xl border border-primary-100 bg-white p-4 shadow-sm hover:shadow-md"
                >
                  <p className="font-semibold text-ink-800">{course.title}</p>
                  <p className="mt-1 text-sm text-ink-500 line-clamp-2">{course.description}</p>
                  <span className="mt-3 flex items-center gap-1 text-sm font-medium text-primary-700">
                    চালিয়ে যান <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
