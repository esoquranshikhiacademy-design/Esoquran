"use client";

import { motion } from "framer-motion";
import { TEACHERS } from "@/lib/data/teachers";
import { TeacherCard } from "@/components/teacher/TeacherCard";

export default function OstadPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-xl font-bold text-primary-950 sm:text-2xl">ওস্তাদ</h1>
        <p className="mt-2 text-sm text-ink-500">যাদের কাছ থেকে শিখছেন</p>
      </motion.div>

      <div className="space-y-4">
        {TEACHERS.map((teacher, index) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <TeacherCard teacher={teacher} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
