"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, User as UserIcon, BookOpenText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/quran-learning", label: t.nav.quranLearning },
    { href: "/courses", label: t.nav.courses },
    { href: "/self-assessment", label: t.nav.selfAssessment },
    { href: "/resources", label: t.nav.resources },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-700 text-white">
            <BookOpenText size={20} />
          </div>
          <span className="hidden text-lg font-semibold text-primary-900 sm:block">
            এসো কুরআন শিখি
          </span>
        </Link>

        {/* ডেস্কটপ নেভিগেশন */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-primary-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ডান পাশের অ্যাকশন */}
        <div className="flex items-center gap-2">
          {/* ভাষা টগল */}
          <button
            onClick={() => setLocale(locale === "bn" ? "en" : "bn")}
            className="flex items-center gap-1 rounded-full border border-primary-200 px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-50"
            aria-label="ভাষা পরিবর্তন করুন"
          >
            <Globe size={14} />
            {locale === "bn" ? "EN" : "বাং"}
          </button>

          {/* Auth অবস্থা */}
          {user && profile ? (
            <div className="hidden items-center gap-2 sm:flex">
              {(profile.role === "admin" || profile.role === "teacher") && (
                <Link
                  href="/admin"
                  className="rounded-full border border-gold-300 px-3 py-1.5 text-sm font-medium text-gold-700 hover:bg-gold-50"
                >
                  অ্যাডমিন
                </Link>
              )}
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-full bg-primary-700 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-800"
              >
                <UserIcon size={14} />
                {t.nav.dashboard}
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-600 hover:text-red-600"
              >
                {t.nav.logout}
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="rounded-full px-4 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50"
              >
                {t.nav.login}
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-primary-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-800"
              >
                {t.nav.register}
              </Link>
            </div>
          )}

          {/* মোবাইল মেনু বাটন */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-ink-700 lg:hidden"
            aria-label="মেনু খুলুন"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* মোবাইল মেনু */}
      <div
        className={cn(
          "overflow-hidden border-t border-primary-100 bg-white transition-all duration-300 lg:hidden",
          isMenuOpen ? "max-h-[28rem] py-3" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-primary-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-primary-100 pt-3">
            {user && profile ? (
              <>
                {(profile.role === "admin" || profile.role === "teacher") && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg border border-gold-300 px-3 py-2.5 text-center text-sm font-medium text-gold-700"
                  >
                    অ্যাডমিন প্যানেল
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-primary-700 px-3 py-2.5 text-center text-sm font-medium text-white"
                >
                  {t.nav.dashboard}
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-red-600"
                >
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg border border-primary-200 px-3 py-2.5 text-center text-sm font-medium text-primary-700"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-primary-700 px-3 py-2.5 text-center text-sm font-medium text-white"
                >
                  {t.nav.register}
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
