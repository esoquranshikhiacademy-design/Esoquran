"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpenText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
    case "auth/too-many-requests":
      return "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
    default:
      return "লগইন করা যায়নি। আবার চেষ্টা করুন।";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      setError(getFirebaseErrorMessage(code));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setIsLoading(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch {
      setError("গুগল দিয়ে লগইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-700 text-white">
            <BookOpenText size={24} />
          </div>
          <h1 className="text-2xl font-bold text-primary-950">লগইন করুন</h1>
          <p className="mt-1 text-sm text-ink-500">
            আপনার শেখার যাত্রা চালিয়ে যেতে লগইন করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            type="email"
            label="ইমেইল"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            type="password"
            label="পাসওয়ার্ড"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <Button type="submit" isLoading={isLoading}>
            লগইন করুন
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink-100" />
          <span className="text-xs text-ink-400">অথবা</span>
          <div className="h-px flex-1 bg-ink-100" />
        </div>

        <Button variant="outline" onClick={handleGoogleSignIn} isLoading={isLoading}>
          গুগল দিয়ে লগইন করুন
        </Button>

        <p className="mt-6 text-center text-sm text-ink-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/register" className="font-semibold text-primary-700">
            রেজিস্ট্রেশন করুন
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
