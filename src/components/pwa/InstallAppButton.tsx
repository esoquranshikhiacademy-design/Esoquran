"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallAppButton() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // ইতিমধ্যে standalone মোডে (ইনস্টল করা অবস্থায়) চললে বাটন দেখানোর দরকার নেই
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    }

    function handleAppInstalled() {
      setIsInstalled(true);
      setInstallEvent(null);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (isInstalled || !installEvent) return null;

  const handleInstall = async () => {
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  };

  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm">
      <button
        onClick={handleInstall}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-primary-50/60"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
          <Download size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink-800">অ্যাপ ইনস্টল করুন</p>
          <p className="text-xs text-ink-400">হোম স্ক্রিনে যোগ করে দ্রুত অ্যাক্সেস পান</p>
        </div>
      </button>
    </div>
  );
}
