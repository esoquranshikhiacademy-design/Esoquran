"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  SplashScreen,
  HOLD_DURATION,
  hasSeenSplashThisSession,
  markSplashSeen,
} from "@/components/layout/SplashScreen";
import { LandingTopBar } from "@/components/layout/LandingTopBar";

type SplashPhase = "checking" | "hold" | "rise" | "done";

export function LandingShell({ children }: { children: ReactNode }) {
  // সার্ভার-রেন্ডারে সবসময় "checking" (হাইড্রেশন মিসম্যাচ এড়াতে);
  // ক্লায়েন্টে মাউন্ট হওয়ার সাথে সাথেই সঠিক ফেজে চলে যায়।
  const [phase, setPhase] = useState<SplashPhase>("checking");

  useEffect(() => {
    // repeat ভিজিটে সরাসরি "done" এ চলে যায় যাতে লোগো এক ফ্রেমের জন্যও না লুকায়
    setPhase(hasSeenSplashThisSession() ? "done" : "hold");
  }, []);

  useEffect(() => {
    if (phase !== "hold") return;
    const timer = setTimeout(() => setPhase("rise"), HOLD_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleRiseComplete = () => {
    markSplashSeen();
    setPhase("done");
  };

  // "checking" ফেজে navbar-এর জায়গাটা reserve রাখা হয় (height অপরিবর্তিত),
  // কিন্তু লোগো দেখানো হয় না — যাতে flash না হয়, শুধু সংক্ষিপ্ত ফাঁকা থাকে।
  return (
    <>
      <LandingTopBar showLogo={phase === "done" || phase === "rise"} />

      {(phase === "hold" || phase === "rise") && (
        <SplashScreen riseToNav={phase === "rise"} onRiseComplete={handleRiseComplete} />
      )}

      {children}
    </>
  );
}
