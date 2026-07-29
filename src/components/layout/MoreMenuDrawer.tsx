"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  X,
  Mic2,
  BookMarked,
  HelpCircle,
  ClipboardCheck,
  Library,
  GraduationCap,
  User as UserIcon,
  MessageCircleQuestion,
  Mail,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MoreMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  href: string;
  icon: typeof Mic2;
  label: string;
  sublabel: string;
}

const LEARNING_ITEMS: MenuItem[] = [
  {
    href: "/quran-learning/makhraj",
    icon: Mic2,
    label: "মাখরাজ স্টুডিও",
    sublabel: "উচ্চারণস্থলের ইন্টারেক্টিভ ডায়াগ্রাম",
  },
  {
    href: "/quran-learning/tajweed",
    icon: BookMarked,
    label: "তাজবীদ ল্যাব",
    sublabel: "নিয়মকানুন, উদাহরণ ও অনুশীলন",
  },
  {
    href: "/quiz-center",
    icon: HelpCircle,
    label: "কুইজ সেন্টার",
    sublabel: "সব কোর্সের কুইজ প্রশ্ন এক জায়গায়",
  },
  {
    href: "/self-assessment",
    icon: ClipboardCheck,
    label: "নিজেকে যাচাই করুন",
    sublabel: "আপনার বর্তমান লেভেল নির্ধারণ করুন",
  },
  {
    href: "/resources",
    icon: Library,
    label: "রিসোর্স",
    sublabel: "আর্টিকেল ও কুরআন এক্সপ্লোরার",
  },
];

const COMMUNITY_ITEMS: MenuItem[] = [
  {
    href: "/ostad",
    icon: UserIcon,
    label: "ওস্তাদ",
    sublabel: "যাদের কাছ থেকে শিখছেন",
  },
  {
    href: "/dashboard",
    icon: GraduationCap,
    label: "ড্যাশবোর্ড",
    sublabel: "আপনার অগ্রগতি ও পরিসংখ্যান",
  },
];

const SUPPORT_ITEMS: MenuItem[] = [
  {
    href: "/faq",
    icon: MessageCircleQuestion,
    label: "প্রশ্নোত্তর (FAQ)",
    sublabel: "সাধারণ জিজ্ঞাসা",
  },
  {
    href: "/contact",
    icon: Mail,
    label: "যোগাযোগ করুন",
    sublabel: "আমাদের সাথে যোগাযোগ করুন",
  },
];

function MenuSection({ title, items, onNavigate }: { title: string; items: MenuItem[]; onNavigate: () => void }) {
  return (
    <div className="mb-5">
      <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-ink-400">
        {title}
      </p>
      <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.href}>
              {index > 0 && <div className="border-t border-primary-50" />}
              <Link
                href={item.href}
                onClick={onNavigate}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-primary-50/60"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink-800">{item.label}</p>
                  <p className="truncate text-xs text-ink-400">{item.sublabel}</p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-ink-300" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * বাকি সব ফিচারের জন্য Hamburger মেনু ড্রয়ার:
 * তাজবীদ, মাখরাজ, কুইজ সেন্টার, যাচাই করুন, রিসোর্স, ওস্তাদ, ড্যাশবোর্ড, FAQ, যোগাযোগ।
 */
export function MoreMenuDrawer({ isOpen, onClose }: MoreMenuDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* ব্যাকড্রপ */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden="true"
      />

      {/* ড্রয়ার প্যানেল */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-primary-50/40 shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="আরও মেনু"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-primary-100 bg-white px-4 py-3">
          <span className="text-base font-semibold text-primary-900">আরও</span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-ink-700 hover:bg-primary-50"
            aria-label="মেনু বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <MenuSection title="শেখা" items={LEARNING_ITEMS} onNavigate={onClose} />
          <MenuSection title="কমিউনিটি" items={COMMUNITY_ITEMS} onNavigate={onClose} />
          <MenuSection title="সাহায্য" items={SUPPORT_ITEMS} onNavigate={onClose} />
        </div>
      </div>
    </>
  );
}
