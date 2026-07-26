"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ClipboardCheck, CheckCircle2 } from "lucide-react";
import { ASSESSMENT_SECTIONS } from "@/types/assessment";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { getAssessmentResult } from "@/lib/services/assessmentService";
import { LEVEL_LABEL_BN } from "@/lib/assessment/reportEngine";

function AssessmentIntroContent() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [hasPreviousResult, setHasPreviousResult] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function check() {
      if (!user) return;
      const result = await getAssessmentResult(user.uid);
      setHasPreviousResult(result !== null);
      setIsChecking(false);
    }
    check();
  }, [user]);

  if (isChecking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={28} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-700 text-white">
          <ClipboardCheck size={26} />
        </div>
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">
          নিজেকে যাচাই করুন
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          ৮টি সংক্ষিপ্ত ধাপে আপনার বর্তমান লেভেল নির্ণয় করুন এবং উপযুক্ত কোর্স খুঁজে নিন
        </p>
      </motion.div>

      {hasPreviousResult && profile?.currentLevel && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-3 rounded-xl border border-primary-100 bg-primary-50 p-4"
        >
          <CheckCircle2 className="shrink-0 text-primary-600" size={20} />
          <p className="text-sm text-primary-800">
            আপনি ইতিমধ্যে অ্যাসেসমেন্ট সম্পন্ন করেছেন — বর্তমান লেভেল:{" "}
            <span className="font-semibold">{LEVEL_LABEL_BN[profile.currentLevel]}</span>
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 rounded-2xl border border-primary-100 bg-white p-5"
      >
        <p className="mb-3 text-sm font-semibold text-ink-800">যেসব বিষয় যাচাই হবে:</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ASSESSMENT_SECTIONS.map((section, index) => (
            <div
              key={section.id}
              className="flex items-center gap-2 rounded-lg bg-primary-50/60 px-2.5 py-2 text-xs text-ink-600"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-[10px] font-semibold text-primary-700">
                {index + 1}
              </span>
              {section.label}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-400">
          মোট আনুমানিক সময়: ৩-৫ মিনিট। প্রতিটা বিভাগে প্রশ্নের কঠিনতা আপনার উত্তরের
          উপর ভিত্তি করে স্বয়ংক্রিয়ভাবে সমন্বয় হবে।
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <Button onClick={() => router.push("/self-assessment/take")} className="sm:w-auto sm:px-8">
          {hasPreviousResult ? "আবার যাচাই করুন" : "যাচাই শুরু করুন"}
        </Button>
        {hasPreviousResult && (
          <Link
            href="/self-assessment/report"
            className="flex items-center justify-center rounded-xl border border-primary-300 px-6 py-2.5 text-sm font-semibold text-primary-800 hover:bg-primary-50"
          >
            আগের রিপোর্ট দেখুন
          </Link>
        )}
      </motion.div>
    </div>
  );
}

export default function SelfAssessmentIntroPage() {
  return (
    <ProtectedRoute>
      <AssessmentIntroContent />
    </ProtectedRoute>
  );
}
