"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Timer, Play, Square } from "lucide-react";
import { SURAHS } from "@/lib/data/surahs";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function SpeedReadingGame() {
  const [selectedSurahId, setSelectedSurahId] = useState(SURAHS[0].id);
  const [status, setStatus] = useState<"idle" | "running" | "finished">("idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const surah = SURAHS.find((s) => s.id === selectedSurahId)!;

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function start() {
    setElapsedMs(0);
    setStatus("running");
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current);
    }, 100);
  }

  function finish() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStatus("finished");
  }

  function reset() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStatus("idle");
    setElapsedMs(0);
  }

  const totalWords = surah.ayahs.reduce(
    (sum, ayah) => sum + ayah.segments.reduce((s, seg) => s + seg.text.trim().split(/\s+/).length, 0),
    0
  );
  const seconds = elapsedMs / 1000;
  const wordsPerMinute = seconds > 0 ? Math.round((totalWords / seconds) * 60) : 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link
        href="/practice-zone"
        className="mb-4 flex items-center gap-1 text-sm font-medium text-primary-700"
      >
        <ChevronLeft size={16} /> প্র্যাকটিস জোন
      </Link>

      <h1 className="mb-1 text-xl font-bold text-primary-950">Speed Reading</h1>
      <p className="mb-6 text-sm text-ink-500">
        সূরা বেছে নিয়ে শুরু বাটনে চাপুন, পড়া শেষ হলে থামান বাটনে চাপুন
      </p>

      {status === "idle" && (
        <div className="mb-5 flex flex-wrap gap-2">
          {SURAHS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSurahId(s.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                selectedSurahId === s.id
                  ? "border-primary-700 bg-primary-700 text-white"
                  : "border-primary-200 text-primary-700"
              )}
            >
              {s.nameBengali}
            </button>
          ))}
        </div>
      )}

      <div className="mb-5 flex items-center justify-center gap-2 rounded-xl bg-primary-50 py-3">
        <Timer size={18} className="text-primary-700" />
        <span className="text-2xl font-bold text-primary-900 tabular-nums">
          {seconds.toFixed(1)}s
        </span>
      </div>

      {status !== "idle" && (
        <div className="mb-5 rounded-2xl border border-primary-100 bg-white p-5">
          <p className="font-arabic-text text-right text-2xl leading-loose text-ink-900" dir="rtl">
            {surah.ayahs.map((ayah) =>
              ayah.segments.map((seg) => seg.text).join("")
            ).join(" ")}
          </p>
        </div>
      )}

      <div className="flex justify-center gap-3">
        {status === "idle" && (
          <Button onClick={start} className="w-auto px-8">
            <Play size={15} /> শুরু করুন
          </Button>
        )}
        {status === "running" && (
          <Button onClick={finish} variant="outline" className="w-auto px-8">
            <Square size={15} /> থামান
          </Button>
        )}
        {status === "finished" && (
          <Button onClick={reset} variant="outline" className="w-auto px-8">
            আবার চেষ্টা করুন
          </Button>
        )}
      </div>

      {status === "finished" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-2xl border border-primary-100 bg-primary-50 p-5 text-center"
        >
          <p className="text-lg font-semibold text-primary-900">
            সময় লেগেছে: {seconds.toFixed(1)} সেকেন্ড
          </p>
          <p className="mt-1 text-sm text-ink-500">
            আনুমানিক গতি: {wordsPerMinute} শব্দ/মিনিট ({totalWords} শব্দ)
          </p>
        </motion.div>
      )}
    </div>
  );
}
