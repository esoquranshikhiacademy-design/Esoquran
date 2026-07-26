"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      // Firestore collection: contactMessages - Admin Panel এ (Phase 7) দেখা যাবে
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
        status: "unread",
      });
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("বার্তা পাঠানো যায়নি। একটু পর আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-700 text-white">
          <MessageCircle size={22} />
        </div>
        <h1 className="text-2xl font-bold text-primary-950 sm:text-3xl">যোগাযোগ করুন</h1>
        <p className="mt-2 text-sm text-ink-500">
          কোনো প্রশ্ন বা মতামত থাকলে নিচের ফর্মটি পূরণ করুন
        </p>
      </motion.div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center rounded-2xl border border-primary-100 bg-primary-50 p-8 text-center"
        >
          <CheckCircle2 className="mb-3 text-primary-600" size={40} />
          <p className="font-semibold text-primary-900">আপনার বার্তা পাঠানো হয়েছে</p>
          <p className="mt-1 text-sm text-ink-500">আমরা যত দ্রুত সম্ভব উত্তর দেওয়ার চেষ্টা করব।</p>
          <Button
            variant="outline"
            className="mt-5 w-auto px-6"
            onClick={() => setIsSubmitted(false)}
          >
            আরেকটি বার্তা পাঠান
          </Button>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-primary-100 bg-white p-6 shadow-sm"
        >
          <Input
            id="name"
            label="আপনার নাম"
            placeholder="নাম লিখুন"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            id="email"
            type="email"
            label="ইমেইল"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
              বার্তা
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="আপনার প্রশ্ন বা মতামত লিখুন..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm outline-none ring-primary-500 transition-shadow focus:ring-2"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" isLoading={isSubmitting}>
            <Send size={16} />
            বার্তা পাঠান
          </Button>

          <div className="flex items-center justify-center gap-2 pt-2 text-sm text-ink-500">
            <Mail size={14} />
            অথবা সরাসরি ইমেইল করুন
          </div>
        </motion.form>
      )}
    </div>
  );
}
