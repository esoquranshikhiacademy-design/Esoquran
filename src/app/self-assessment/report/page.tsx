"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  Clock,
  Award,
  ArrowRight,
  RefreshCcw,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { SectionScoreBreakdown } from "@/components/assessment/SectionScoreBreakdown";
import { getAssessmentResult } from "@/lib/services/assessmentService";
import { getRecommendedCourses } from "@/lib/services/learningPathService";
import { getSectionLabel, LEVEL_LABEL_BN } from "@/lib/assessment/reportEngine";
import type { AssessmentResult } from "@/types/assessment";
import type { Course } from "@/types/course";

function ReportContent() {
  const { user } = useAuth();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const assessmentResult = await getAssessmentResult(user.uid);
      setResult(assessmentResult);

      if (assessmentResult) {
        const courses = await getRecommendedCourses(
          assessmentResult.recommendedCategory,
          assessmentResult.overallLevel
        );
        setRecommendedCourses(courses);
      }
      setIsLoading(false);
    }
    load();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={28} />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-ink-500">আপনি এখনো কোনো অ্যাসেসমেন্ট সম্পন্ন করেননি।</p>
        <Link
          href="/self-assessment"
          className="mt-3 inline-block text-sm font-semibold text-primary-700"
        >
          অ্যাসেসমেন্ট শুরু করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* সারমর্ম হেডার */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-center text-white"
      >
        <p className="text-sm text-primary-100">আপনার সামগ্রিক ফলাফল</p>
        <p className="mt-1 text-4xl font-bold">{result.overallScorePercent}%</p>
        <span className="mt-3 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
          {LEVEL_LABEL_BN[result.overallLevel]}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* শক্তি */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-primary-100 bg-white p-5"
        >
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary-700">
            <TrendingUp size={16} /> আপনার শক্তির জায়গা
          </p>
          {result.strengths.length === 0 ? (
            <p className="text-sm text-ink-400">
              এখনো কোনো সেকশনে উল্লেখযোগ্য দক্ষতা দেখা যায়নি — আরও অনুশীলন দরকার
            </p>
          ) : (
            <ul className="space-y-1.5">
              {result.strengths.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-ink-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  {getSectionLabel(s)}
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* দুর্বলতা */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-gold-100 bg-white p-5"
        >
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold-700">
            <TrendingDown size={16} /> উন্নতির প্রয়োজন
          </p>
          {result.weaknesses.length === 0 ? (
            <p className="text-sm text-ink-400">চমৎকার! কোনো বড় দুর্বলতা পাওয়া যায়নি</p>
          ) : (
            <ul className="space-y-1.5">
              {result.weaknesses.map((w) => (
                <li key={w} className="flex items-center gap-2 text-sm text-ink-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  {getSectionLabel(w)}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>

      {/* বিস্তারিত সেকশন-ভিত্তিক স্কোর */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-5 rounded-2xl border border-primary-100 bg-white p-5"
      >
        <p className="mb-4 text-sm font-semibold text-ink-800">বিস্তারিত ফলাফল</p>
        <SectionScoreBreakdown sectionResults={result.sectionResults} />
      </motion.div>

      {/* আনুমানিক সময় */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-5 flex items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50/50 p-5"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
          <Clock size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-800">আনুমানিক শেখার সময়</p>
          <p className="text-sm text-ink-500">
            আপনার বর্তমান লেভেল অনুযায়ী প্রায় {result.estimatedLearningHours} ঘণ্টা প্রয়োজন
          </p>
        </div>
      </motion.div>

      {/* Recommended Courses */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-800">
          <Award size={16} className="text-gold-600" /> আপনার জন্য সাজেস্টেড কোর্স
        </p>

        {recommendedCourses.length === 0 ? (
          <p className="rounded-xl border border-dashed border-primary-200 bg-primary-50/50 p-5 text-center text-sm text-ink-500">
            এই মুহূর্তে উপযুক্ত কোর্স খুঁজে পাওয়া যায়নি। শীঘ্রই নতুন কোর্স যুক্ত হবে।
          </p>
        ) : (
          <div className="space-y-3">
            {recommendedCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-primary-100 bg-white p-4 hover:shadow-md"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-800">{course.title}</p>
                  <p className="mt-0.5 text-xs text-ink-400">
                    {course.category} • {course.estimatedHours} ঘণ্টা
                  </p>
                </div>
                <ArrowRight size={16} className="shrink-0 text-primary-600" />
              </Link>
            ))}
          </div>
        )}
      </motion.div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/self-assessment/take"
          className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-primary-700"
        >
          <RefreshCcw size={14} /> আবার যাচাই করুন
        </Link>
      </div>
    </div>
  );
}

export default function AssessmentReportPage() {
  return (
    <ProtectedRoute>
      <ReportContent />
    </ProtectedRoute>
  );
}
