"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// শুরুর জন্য জনপ্রিয় সার্চ ট্যাগ - পরে Firestore থেকে ডাইনামিক হবে
const POPULAR_TAGS = ["মাখরাজ", "তাজবীদ", "সূরা ফাতিহা", "গুন্নাহ", "আরবি বর্ণমালা"];

export function SmartSearch() {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length === 0) return;
    // Phase 6/Algolia আসার আগে পর্যন্ত এই রুট একটা সাধারণ সার্চ রেজাল্ট পেজে যাবে
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSearch}
        className="relative"
      >
        <Search
          size={20}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search.placeholder}
          className="w-full rounded-full border border-primary-200 bg-white py-4 pl-12 pr-28 text-sm shadow-sm outline-none ring-primary-500 transition-shadow focus:ring-2 sm:text-base"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary-700 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-800"
        >
          সার্চ
        </button>
      </motion.form>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => router.push(`/search?q=${encodeURIComponent(tag)}`)}
            className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs text-primary-700 transition-colors hover:bg-primary-100"
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
