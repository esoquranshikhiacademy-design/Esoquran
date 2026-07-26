"use client";

import { motion } from "framer-motion";
import type { MakhrajGroupId } from "@/types/arabicAlphabet";
import { cn } from "@/lib/utils";

const AREA_COLOR: Record<MakhrajGroupId, string> = {
  jawf: "#2b9a6c",
  halq: "#d9971e",
  lisan: "#186447",
  shafatain: "#e8b134",
  khaishoom: "#4fb587",
};

export function MouthDiagram({
  activeGroup,
  onSelectGroup,
}: {
  activeGroup: MakhrajGroupId | null;
  onSelectGroup: (id: MakhrajGroupId) => void;
}) {
  function isActive(id: MakhrajGroupId) {
    return activeGroup === id;
  }

  return (
    <div className="flex justify-center rounded-2xl bg-primary-50/40 p-4">
      <svg viewBox="0 0 240 220" className="h-64 w-64 sm:h-72 sm:w-72">
        {/* মাথা/মুখের বাইরের কাঠামো - সরল সাইড-প্রোফাইল */}
        <path
          d="M 40 40 Q 30 100 50 160 Q 70 200 120 205 Q 180 200 200 150 Q 210 100 190 60 Q 170 30 130 25 Q 80 20 40 40 Z"
          fill="#fdfcf9"
          stroke="#d5dae0"
          strokeWidth="2"
        />

        {/* খাইশুম - নাসিকা (উপরে) */}
        <motion.ellipse
          onClick={() => onSelectGroup("khaishoom")}
          cx="150"
          cy="55"
          rx="22"
          ry="14"
          className="cursor-pointer"
          fill={AREA_COLOR.khaishoom}
          animate={{ opacity: isActive("khaishoom") ? 0.85 : 0.25 }}
          whileHover={{ opacity: 0.6 }}
        />
        <text x="150" y="58" textAnchor="middle" fontSize="9" className="pointer-events-none fill-ink-800 font-medium">
          নাসিকা
        </text>

        {/* হালক - কণ্ঠনালী (পেছনে/নিচে) */}
        <motion.path
          onClick={() => onSelectGroup("halq")}
          d="M 55 130 Q 50 155 65 180 Q 80 195 100 195 L 95 140 Q 75 125 55 130 Z"
          className="cursor-pointer"
          fill={AREA_COLOR.halq}
          animate={{ opacity: isActive("halq") ? 0.85 : 0.25 }}
          whileHover={{ opacity: 0.6 }}
        />
        <text x="72" y="165" textAnchor="middle" fontSize="9" className="pointer-events-none fill-ink-800 font-medium">
          হালক
        </text>

        {/* জাওফ - মুখগহ্বর (মাঝখানে) */}
        <motion.ellipse
          onClick={() => onSelectGroup("jawf")}
          cx="120"
          cy="120"
          rx="28"
          ry="20"
          className="cursor-pointer"
          fill={AREA_COLOR.jawf}
          animate={{ opacity: isActive("jawf") ? 0.85 : 0.25 }}
          whileHover={{ opacity: 0.6 }}
        />
        <text x="120" y="123" textAnchor="middle" fontSize="9" className="pointer-events-none fill-ink-800 font-medium">
          জাওফ
        </text>

        {/* লিসান - জিহ্বা (মুখের ভেতরে, লম্বা) */}
        <motion.path
          onClick={() => onSelectGroup("lisan")}
          d="M 95 130 Q 130 145 165 135 Q 175 150 160 165 Q 130 175 100 160 Q 90 145 95 130 Z"
          className="cursor-pointer"
          fill={AREA_COLOR.lisan}
          animate={{ opacity: isActive("lisan") ? 0.85 : 0.25 }}
          whileHover={{ opacity: 0.6 }}
        />
        <text x="130" y="155" textAnchor="middle" fontSize="9" className="pointer-events-none fill-white font-medium">
          লিসান
        </text>

        {/* শাফাতাইন - ঠোঁট (সামনে) */}
        <motion.ellipse
          onClick={() => onSelectGroup("shafatain")}
          cx="195"
          cy="150"
          rx="16"
          ry="20"
          className="cursor-pointer"
          fill={AREA_COLOR.shafatain}
          animate={{ opacity: isActive("shafatain") ? 0.85 : 0.25 }}
          whileHover={{ opacity: 0.6 }}
        />
        <text x="195" y="153" textAnchor="middle" fontSize="8" className="pointer-events-none fill-ink-800 font-medium">
          ঠোঁট
        </text>
      </svg>
    </div>
  );
}
