"use client";

import Link from "next/link";
import { BookOpenText, Facebook, Youtube, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/courses", label: t.nav.courses },
    { href: "/quran-learning", label: t.nav.quranLearning },
    { href: "/self-assessment", label: t.nav.selfAssessment },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <footer className="mt-16 border-t border-primary-100 bg-primary-950 text-primary-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {/* ব্র্যান্ড */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400 text-primary-950">
              <BookOpenText size={20} />
            </div>
            <span className="text-lg font-semibold">এসো কুরআন শিখি</span>
          </div>
          <p className="mt-3 text-sm text-primary-200">{t.footer.about}</p>
        </div>

        {/* দ্রুত লিংক */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-300">
            {t.footer.quickLinks}
          </h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-primary-200 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* যোগাযোগ */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-300">
            {t.footer.contact}
          </h3>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-sm text-primary-200 hover:text-white"
          >
            <Mail size={14} />
            যোগাযোগ পেইজ
          </Link>
        </div>

        {/* সোশ্যাল */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-300">
            সংযুক্ত থাকুন
          </h3>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 transition-colors hover:bg-gold-400 hover:text-primary-950"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 transition-colors hover:bg-gold-400 hover:text-primary-950"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-800 py-4 text-center text-xs text-primary-300">
        © {year} এসো কুরআন শিখি একাডেমি — {t.footer.rights}
      </div>
    </footer>
  );
}
