"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "এই প্ল্যাটফর্মে কুরআন শেখা শুরু করতে কী কী লাগবে?",
    answer:
      "শুধু একটি ইমেইল দিয়ে রেজিস্ট্রেশন করলেই যথেষ্ট। এরপর একটি সংক্ষিপ্ত সেলফ অ্যাসেসমেন্টের মাধ্যমে আপনার বর্তমান লেভেল যাচাই করে উপযুক্ত কোর্স সাজেস্ট করা হবে।",
  },
  {
    question: "আমি কি আরবি বর্ণমালা না জেনেও শুরু করতে পারব?",
    answer:
      "হ্যাঁ। আরবি বর্ণমালা স্টুডিও থেকে একদম শুরু থেকে শেখা যায় — প্রতিটি অক্ষরের উচ্চারণ, লেখার নিয়ম এবং অনুশীলন সহ।",
  },
  {
    question: "কোর্সগুলো কি সম্পূর্ণ বিনামূল্যে?",
    answer:
      "প্ল্যাটফর্মের বেশ কিছু কোর্স এবং ফিচার বিনামূল্যে থাকবে। প্রিমিয়াম কোর্স সংক্রান্ত বিস্তারিত তথ্য কোর্স পেজে দেওয়া থাকবে।",
  },
  {
    question: "সার্টিফিকেট কীভাবে পাওয়া যায়?",
    answer:
      "একটি কোর্সের সব লেসন, কুইজ এবং মূল্যায়ন সম্পন্ন করলে অটোমেটিক সার্টিফিকেট জেনারেট হয়ে যাবে, যা ডাউনলোড করা যাবে।",
  },
  {
    question: "মোবাইল দিয়ে কি সব ফিচার ব্যবহার করা যাবে?",
    answer:
      "হ্যাঁ, পুরো প্ল্যাটফর্মটি মোবাইল-ফার্স্ট ডিজাইনে তৈরি এবং PWA হিসেবে ইনস্টল করেও ব্যবহার করা যাবে।",
  },
];

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-2xl border border-primary-100 bg-white shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-ink-800 sm:text-base">{question}</span>
        <ChevronDown
          size={18}
          className={cn("shrink-0 text-primary-600 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden px-5 text-sm text-ink-600 transition-all duration-300",
          isOpen ? "max-h-40 pb-4" : "max-h-0"
        )}
      >
        {answer}
      </div>
    </motion.div>
  );
}

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-700 text-white">
          <HelpCircle size={22} />
        </div>
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">সচরাচর জিজ্ঞাসিত প্রশ্ন</h1>
        <p className="mt-2 text-sm text-ink-500">আপনার প্রশ্নের উত্তর এখানে খুঁজে নিন</p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, index) => (
          <FaqItem key={faq.question} {...faq} index={index} />
        ))}
      </div>
    </div>
  );
}
