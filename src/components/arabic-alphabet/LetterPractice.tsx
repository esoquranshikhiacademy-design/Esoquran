"use client";

import { useRef, useState, type PointerEvent } from "react";
import { Eraser } from "lucide-react";

/**
 * সরল ক্যানভাস-ভিত্তিক ট্রেসিং প্র্যাকটিস - ইউজার আঙুল/মাউস দিয়ে
 * ব্যাকগ্রাউন্ডে দেখানো হালকা অক্ষরের উপর দিয়ে লিখে অনুশীলন করতে পারবে।
 * এটা হাতের লেখা যাচাই করে না (OCR নেই), শুধু muscle-memory অনুশীলনের সুযোগ দেয়।
 */
export function LetterPractice({ letter }: { letter: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  function getContext() {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }

  function getPos(e: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handlePointerDown(e: PointerEvent<HTMLCanvasElement>) {
    const ctx = getContext();
    if (!ctx) return;
    setIsDrawing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function handlePointerMove(e: PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const ctx = getContext();
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#186447";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  function handlePointerUp() {
    setIsDrawing(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-2 border-dashed border-primary-200 bg-white">
        {/* ব্যাকগ্রাউন্ডে হালকা অক্ষর - ট্রেস করার গাইড হিসেবে */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-arabic-text text-7xl text-primary-100">{letter}</span>
        </div>
        <canvas
          ref={canvasRef}
          width={192}
          height={192}
          className="relative touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>
      <button
        onClick={clearCanvas}
        className="mt-3 flex items-center gap-1.5 rounded-full border border-primary-200 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50"
      >
        <Eraser size={13} /> মুছে ফেলুন
      </button>
    </div>
  );
}
