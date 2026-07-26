"use client";

import { useState } from "react";
import { Paperclip, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { AssignmentSubmission } from "@/types/lesson-extras";

export function LessonAssignment({
  existingSubmission,
  onSubmit,
  isSubmitting,
}: {
  existingSubmission: AssignmentSubmission | null;
  onSubmit: (text: string, file: File | null) => void;
  isSubmitting: boolean;
}) {
  const [text, setText] = useState(existingSubmission?.textContent ?? "");
  const [file, setFile] = useState<File | null>(null);

  if (existingSubmission) {
    return (
      <div className="rounded-xl border border-primary-100 bg-primary-50 p-5">
        <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary-800">
          <CheckCircle2 size={16} />
          অ্যাসাইনমেন্ট জমা দেওয়া হয়েছে
        </p>
        <p className="text-sm text-ink-600 whitespace-pre-wrap">
          {existingSubmission.textContent}
        </p>
        {existingSubmission.fileName && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-primary-700">
            <Paperclip size={12} /> {existingSubmission.fileName}
          </p>
        )}
        {existingSubmission.feedback && (
          <div className="mt-3 rounded-lg bg-white p-3 text-sm text-ink-700">
            <span className="font-medium">শিক্ষকের মন্তব্য:</span> {existingSubmission.feedback}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <textarea
        rows={4}
        placeholder="আপনার অ্যাসাইনমেন্টের উত্তর লিখুন..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none ring-primary-500 focus:ring-2"
      />
      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-primary-200 px-3 py-2 text-sm text-ink-500 hover:bg-primary-50">
        <Paperclip size={15} />
        {file ? file.name : "ফাইল যুক্ত করুন (ঐচ্ছিক)"}
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <Button
        onClick={() => onSubmit(text, file)}
        disabled={text.trim().length === 0}
        isLoading={isSubmitting}
        className="w-full sm:w-auto"
      >
        জমা দিন
      </Button>
    </div>
  );
}
