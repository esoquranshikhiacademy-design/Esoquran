"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { LessonComment } from "@/types/lesson-extras";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "এইমাত্র";
  if (mins < 60) return `${mins} মিনিট আগে`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ঘণ্টা আগে`;
  return `${Math.floor(hours / 24)} দিন আগে`;
}

export function LessonComments({
  comments,
  onPost,
  isPosting,
}: {
  comments: LessonComment[];
  onPost: (text: string) => void;
  isPosting: boolean;
}) {
  const [text, setText] = useState("");

  function handleSubmit() {
    if (text.trim().length === 0) return;
    onPost(text.trim());
    setText("");
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="প্রশ্ন বা মতামত লিখুন..."
          className="flex-1 rounded-full border border-ink-200 px-4 py-2 text-sm outline-none ring-primary-500 focus:ring-2"
        />
        <Button
          onClick={handleSubmit}
          isLoading={isPosting}
          className="w-auto shrink-0 rounded-full px-4"
        >
          <Send size={15} />
        </Button>
      </div>

      {comments.length === 0 ? (
        <p className="flex items-center justify-center gap-2 py-6 text-sm text-ink-400">
          <MessageCircle size={16} /> এখনো কোনো মন্তব্য নেই — প্রথম মন্তব্যটি আপনিই করুন
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-xl bg-ink-50 p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-ink-800">{comment.userName}</span>
                <span className="text-xs text-ink-400">{timeAgo(comment.createdAt)}</span>
              </div>
              <p className="text-sm text-ink-600">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
