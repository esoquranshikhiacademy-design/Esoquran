"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Globe,
  LogOut,
  ChevronRight,
  HelpCircle,
  Mail,
  LogIn,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { InstallAppButton } from "@/components/pwa/InstallAppButton";

function SettingsRow({
  href,
  icon: Icon,
  label,
  sublabel,
  onClick,
}: {
  href?: string;
  icon: typeof UserIcon;
  label: string;
  sublabel?: string;
  onClick?: () => void;
}) {
  const content = (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-sm font-medium text-ink-800">{label}</p>
        {sublabel && <p className="text-xs text-ink-400">{sublabel}</p>}
      </div>
      <ChevronRight size={18} className="shrink-0 text-ink-300" />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block transition-colors hover:bg-primary-50/60">
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full transition-colors hover:bg-primary-50/60"
    >
      {content}
    </button>
  );
}

export default function SettingsPage() {
  const { user, profile, signOut } = useAuth();
  const { locale, setLocale } = useLanguage();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-xl font-bold text-primary-950"
      >
        সেটিং
      </motion.h1>

      {/* প্রোফাইল কার্ড */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6 flex items-center gap-3 rounded-2xl border border-primary-100 bg-white p-4 shadow-sm"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-700 text-white">
          <UserIcon size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-ink-800">
            {profile?.name ?? user?.displayName ?? "অতিথি ব্যবহারকারী"}
          </p>
          <p className="truncate text-xs text-ink-400">
            {user?.email ?? "লগইন করুন আপনার অগ্রগতি সংরক্ষণ করতে"}
          </p>
        </div>
      </motion.div>

      {/* অ্যাপ ইনস্টল (শুধু ইনস্টলযোগ্য হলে দেখাবে) */}
      <InstallAppButton />

      {/* অ্যাকাউন্ট */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-5 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm"
      >
        {user ? (
          <>
            <SettingsRow
              href="/dashboard"
              icon={LayoutDashboard}
              label="ড্যাশবোর্ড"
              sublabel="আপনার অগ্রগতি ও পরিসংখ্যান দেখুন"
            />
            <div className="border-t border-primary-50" />
            <SettingsRow
              icon={LogOut}
              label="লগআউট"
              onClick={() => signOut()}
            />
          </>
        ) : (
          <SettingsRow
            href="/login"
            icon={LogIn}
            label="লগইন করুন"
            sublabel="আপনার অগ্রগতি সংরক্ষণ করতে অ্যাকাউন্ট খুলুন"
          />
        )}
      </motion.div>

      {/* ভাষা */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-5 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm"
      >
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
            <Globe size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-ink-800">ভাষা</p>
          </div>
          <div className="flex overflow-hidden rounded-full border border-primary-200">
            <button
              onClick={() => setLocale("bn")}
              className={cn(
                "px-3 py-1 text-xs font-medium transition-colors",
                locale === "bn"
                  ? "bg-primary-700 text-white"
                  : "bg-white text-ink-600 hover:bg-primary-50"
              )}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLocale("en")}
              className={cn(
                "px-3 py-1 text-xs font-medium transition-colors",
                locale === "en"
                  ? "bg-primary-700 text-white"
                  : "bg-white text-ink-600 hover:bg-primary-50"
              )}
            >
              EN
            </button>
          </div>
        </div>
      </motion.div>

      {/* সাহায্য */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm"
      >
        <SettingsRow href="/faq" icon={HelpCircle} label="প্রশ্নোত্তর (FAQ)" />
        <div className="border-t border-primary-50" />
        <SettingsRow href="/contact" icon={Mail} label="যোগাযোগ করুন" />
      </motion.div>
    </div>
  );
}
