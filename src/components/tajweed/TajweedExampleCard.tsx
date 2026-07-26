"use client";

import type { TajweedExample } from "@/types/tajweed";

export function TajweedExampleCard({
  example,
  color,
}: {
  example: TajweedExample;
  color: string;
}) {
  const index = example.arabicText.indexOf(example.highlightSubstring);

  // সাব-স্ট্রিং না মিললে (ডেটা এন্ট্রিতে ভুল থাকলে) পুরো টেক্সট স্বাভাবিক রঙে দেখানো হবে,
  // যাতে ভাঙা UI না দেখিয়ে অন্তত টেক্সটটুকু সঠিকভাবে প্রদর্শিত হয়
  const before = index >= 0 ? example.arabicText.slice(0, index) : example.arabicText;
  const highlighted = index >= 0 ? example.highlightSubstring : "";
  const after = index >= 0 ? example.arabicText.slice(index + example.highlightSubstring.length) : "";

  return (
    <div className="rounded-xl bg-ink-50 p-4">
      <p className="font-arabic-text text-center text-2xl leading-loose text-ink-900" dir="rtl">
        {before}
        <span
          className="rounded px-0.5 font-semibold"
          style={{ backgroundColor: `${color}25`, color }}
        >
          {highlighted}
        </span>
        {after}
      </p>
      <p className="mt-2 text-center text-sm text-ink-500">{example.transliteration}</p>
      <p className="mt-1 text-center text-xs text-ink-400">{example.explanation}</p>
    </div>
  );
}
