"use client";

import Link from "next/link";
import {
  BookOpenText,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
  Mail,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const socialLinks = [
    { href: "#", label: "Facebook", icon: Facebook },
    { href: "#", label: "YouTube", icon: Youtube },
    { href: "#", label: "Instagram", icon: Instagram },
    { href: "#", label: "Twitter", icon: Twitter },
    { href: "#", label: "LinkedIn", icon: Linkedin },
    { href: "#", label: "WhatsApp", icon: MessageCircle },
  ];

  return (
    <footer className="mt-16 border-t border-primary-100 bg-primary-950 text-primary-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
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
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 transition-colors hover:bg-gold-400 hover:text-primary-950"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-800 py-4 text-center text-xs text-primary-300">
        © {year} এসো কুরআন শিখি একাডেমি — {t.footer.rights}
      </div>
    </footer>
  );
}
