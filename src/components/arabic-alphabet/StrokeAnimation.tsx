"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * SVG stroke-dasharray/dashoffset কৌশল ব্যবহার করে "আঁকার" অ্যানিমেশন দেখায়।
 * পুনরায় চালানোর জন্য key পরিবর্তন করে রি-মাউন্ট করা হয় (সহজ ও নির্ভরযোগ্য পদ্ধতি)।
 */
export function StrokeAnimation({
  pathData,
  letter,
}: {
  pathData: string;
  letter: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [replayKey]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-48 w-48 items-center justify-center rounded-2xl bg-primary-50/50">
        <svg viewBox="0 0 100 100" className="h-40 w-40" style={{ direction: "rtl" }}>
          {/* হালকা background আকৃতি - আসল অক্ষর, রেফারেন্স হিসেবে */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="50"
            className="fill-primary-100 font-arabic"
          >
            {letter}
          </text>
          <path
            key={replayKey}
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="#186447"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
              animation: pathLength ? "draw-stroke 2s ease-in-out forwards" : "none",
            }}
          />
        </svg>
      </div>
      <button
        onClick={() => setReplayKey((k) => k + 1)}
        className="mt-3 flex items-center gap-1.5 rounded-full border border-primary-200 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50"
      >
        <RotateCcw size={13} /> আবার দেখুন
      </button>
    </div>
  );
}
