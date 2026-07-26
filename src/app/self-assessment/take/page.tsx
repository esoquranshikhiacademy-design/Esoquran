"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ASSESSMENT_SECTIONS } from "@/types/assessment";
import type {
  AssessmentSectionId,
  QuestionDifficulty,
  SectionAnswer,
  SectionResult,
  AssessmentResult,
} from "@/types/assessment";
import { getQuestion } from "@/lib/assessment/questionBank";
import { getNextDifficulty, calculateSectionScore } from "@/lib/assessment/adaptiveEngine";
import { analyzeResults } from "@/lib/assessment/reportEngine";
import { saveAssessmentResult } from "@/lib/services/assessmentService";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { AssessmentQuestionCard } from "@/components/assessment/AssessmentQuestionCard";
import { Loader2 } from "lucide-react";

const QUESTIONS_PER_SECTION = 3;

function TakeAssessmentContent() {
  const { user } = useAuth();
  const router = useRouter();

  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionCountInSection, setQuestionCountInSection] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState<QuestionDifficulty>("easy");
  const [currentSectionAnswers, setCurrentSectionAnswers] = useState<SectionAnswer[]>([]);
  const [allSectionResults, setAllSectionResults] = useState<SectionResult[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const currentSection = ASSESSMENT_SECTIONS[sectionIndex];
  const currentQuestion = getQuestion(currentSection.id as AssessmentSectionId, currentDifficulty);

  const finishAssessment = useCallback(
    async (finalResults: SectionResult[]) => {
      if (!user) return;
      setIsSaving(true);

      const analysis = analyzeResults(finalResults);
      const result: AssessmentResult = {
        id: user.uid,
        userId: user.uid,
        sectionResults: finalResults,
        ...analysis,
        completedAt: new Date().toISOString(),
      };

      await saveAssessmentResult(result);
      router.push("/self-assessment/report");
    },
    [user, router]
  );

  function handleAnswer(selectedIndex: number, isCorrect: boolean) {
    const answer: SectionAnswer = {
      questionId: currentQuestion.id,
      difficulty: currentDifficulty,
      selectedOptionIndex: selectedIndex,
      isCorrect,
    };

    const updatedAnswers = [...currentSectionAnswers, answer];
    const nextQuestionCount = questionCountInSection + 1;

    if (nextQuestionCount >= QUESTIONS_PER_SECTION) {
      // এই সেকশন শেষ - স্কোর হিসাব করে পরের সেকশনে যাওয়া (বা সব শেষ হলে ফিনিশ)
      const sectionResult: SectionResult = {
        sectionId: currentSection.id as AssessmentSectionId,
        answers: updatedAnswers,
        correctCount: updatedAnswers.filter((a) => a.isCorrect).length,
        scorePercent: calculateSectionScore(updatedAnswers),
      };
      const updatedResults = [...allSectionResults, sectionResult];
      setAllSectionResults(updatedResults);

      if (sectionIndex + 1 >= ASSESSMENT_SECTIONS.length) {
        finishAssessment(updatedResults);
      } else {
        setSectionIndex((prev) => prev + 1);
        setQuestionCountInSection(0);
        setCurrentDifficulty("easy");
        setCurrentSectionAnswers([]);
      }
    } else {
      // একই সেকশনে পরের প্রশ্ন, difficulty adaptive ভাবে ঠিক হবে
      setCurrentSectionAnswers(updatedAnswers);
      setQuestionCountInSection(nextQuestionCount);
      setCurrentDifficulty(getNextDifficulty(currentDifficulty, isCorrect));
    }
  }

  if (isSaving) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-primary-600" size={28} />
        <p className="text-sm text-ink-500">আপনার রিপোর্ট তৈরি হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <AssessmentProgress
        currentSectionIndex={sectionIndex}
        totalSections={ASSESSMENT_SECTIONS.length}
      />

      <motion.p
        key={currentSection.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 text-center text-sm font-semibold text-primary-700"
      >
        {currentSection.label}
      </motion.p>

      <AssessmentQuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default function TakeAssessmentPage() {
  return (
    <ProtectedRoute>
      <TakeAssessmentContent />
    </ProtectedRoute>
  );
}
