"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ComingSoon } from "@/components/ui/ComingSoon";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-2 text-ink-500">
        <Search size={18} />
        <span className="text-sm">
          সার্চ ফলাফল: <span className="font-semibold text-ink-800">&quot;{query}&quot;</span>
        </span>
      </div>
      <ComingSoon
        title="সার্চ সিস্টেম"
        description="সম্পূর্ণ কনটেন্ট-ভিত্তিক স্মার্ট সার্চ (কোর্স, লেসন, আর্টিকেল, তাজবীদ রুল) শীঘ্রই আসছে।"
        phaseNote="সম্পূর্ণ সার্চ ফিচার Phase 6 তে যুক্ত হবে"
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-ink-400">লোড হচ্ছে...</div>}>
      <SearchContent />
    </Suspense>
  );
}
