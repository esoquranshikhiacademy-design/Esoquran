"use client";

import { motion } from "framer-motion";
import { BookOpenText } from "lucide-react";

const SESSION_KEY = "eqs_splash_shown";
/** লোগো মাঝখানে কতক্ষণ থামবে, তারপর navbar-এ উঠা শুরু হবে (ms) */
export const HOLD_DURATION = 900;
/** শেয়ার্ড লেআউট ট্রানজিশনের সময়কাল (sec) */
const RISE_DURATION = 0.65;

interface SplashScreenProps {
  /** true হলে লোগো navbar পজিশনে (ছোট) রেন্ডার হয় — শেয়ার্ড layout এই দুই অবস্থার মধ্যে অটো-এনিমেট করে */
  riseToNav: boolean;
  /** rise ট্রানজিশন শেষ হলে কল হবে — তখন স্প্ল্যাশ ওভারলে সরিয়ে ফেলা হয় */
  onRiseComplete: () => void;
}

export function SplashScreen({ riseToNav, onRiseComplete }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-white"
      initial={false}
      animate={{ opacity: riseToNav ? 0 : 1 }}
      transition={{ duration: 0.3, delay: riseToNav ? RISE_DURATION - 0.15 : 0 }}
      onAnimationComplete={() => {
        if (riseToNav) onRiseComplete();
      }}
      style={{ pointerEvents: riseToNav ? "none" : "auto" }}
    >
      <div
        className={
          riseToNav
            ? "mx-auto flex w-full max-w-6xl items-center px-4 py-3 sm:px-6"
            : "flex h-full items-center justify-center"
        }
      >
        <motion.div
          layout
          className="flex items-center gap-3"
          transition={{ duration: RISE_DURATION, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            layout
            className="flex items-center justify-center rounded-2xl bg-primary-700 text-white"
            animate={{
              width: riseToNav ? 32 : 56,
              height: riseToNav ? 32 : 56,
              borderRadius: riseToNav ? 8 : 16,
            }}
            transition={{ duration: RISE_DURATION, ease: [0.65, 0, 0.35, 1] }}
          >
            <BookOpenText size={riseToNav ? 18 : 30} />
          </motion.div>
          <motion.span
            layout
            className="font-bold text-primary-900"
            animate={{ fontSize: riseToNav ? "1rem" : "1.5rem" }}
            transition={{ duration: RISE_DURATION, ease: [0.65, 0, 0.35, 1] }}
          >
            এসো কুরআন শিখি একাডেমি
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/** এই সেশনে স্প্ল্যাশ আগে দেখানো হয়েছে কিনা */
export function hasSeenSplashThisSession() {
  if (typeof window === "undefined") return true;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}

export function markSplashSeen() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SESSION_KEY, "1");
}
