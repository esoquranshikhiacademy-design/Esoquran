"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    // ডেভেলপমেন্টে SW নিবন্ধন এড়ানো হয় যাতে হট-রিলোড/ক্যাশিং একে অপরের সাথে না মেশে
    if (process.env.NODE_ENV !== "production") return;

    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.error("Service worker registration failed:", err));
  }, []);

  return null;
}
