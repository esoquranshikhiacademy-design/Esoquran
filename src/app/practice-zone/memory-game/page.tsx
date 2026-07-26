"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ARABIC_LETTERS } from "@/lib/data/arabicLetters";
import { GameResultBanner } from "@/components/practice/GameResultBanner";
import { cn } from "@/lib/utils";

const PAIR_COUNT = 6;

interface Card {
  cardId: string; // ইউনিক (letterId + "-a"/"-b")
  letterId: string;
  display: string;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildBoard(): Card[] {
  const chosen = shuffle(ARABIC_LETTERS).slice(0, PAIR_COUNT);
  const cards: Card[] = [];
  chosen.forEach((letter) => {
    // একই অক্ষরের দুইটা কার্ড - একটায় অক্ষর, একটায় নাম (দুটোই "একই জিনিস" প্রতিনিধিত্ব করে)
    cards.push({ cardId: `${letter.id}-letter`, letterId: letter.id, display: letter.letter });
    cards.push({ cardId: `${letter.id}-name`, letterId: letter.id, display: letter.nameBengali });
  });
  return shuffle(cards);
}

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>(() => buildBoard());
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedLetterIds, setMatchedLetterIds] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const isFinished = matchedLetterIds.size === PAIR_COUNT;

  function handleCardClick(card: Card) {
    if (isLocked) return;
    if (flippedIds.includes(card.cardId)) return;
    if (matchedLetterIds.has(card.letterId)) return;
    if (flippedIds.length === 2) return;

    const newFlipped = [...flippedIds, card.cardId];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.cardId === firstId)!;
      const secondCard = cards.find((c) => c.cardId === secondId)!;

      if (firstCard.letterId === secondCard.letterId) {
        setTimeout(() => {
          setMatchedLetterIds((prev) => new Set(prev).add(firstCard.letterId));
          setFlippedIds([]);
          setIsLocked(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedIds([]);
          setIsLocked(false);
        }, 900);
      }
    }
  }

  function replay() {
    setCards(buildBoard());
    setFlippedIds([]);
    setMatchedLetterIds(new Set());
    setMoves(0);
    setIsLocked(false);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:px-6">
      <Link
        href="/practice-zone"
        className="mb-4 flex items-center gap-1 text-sm font-medium text-primary-700"
      >
        <ChevronLeft size={16} /> প্র্যাকটিস জোন
      </Link>

      <h1 className="mb-1 text-xl font-bold text-primary-950">Memory Game</h1>
      <p className="mb-6 text-sm text-ink-500">কার্ড উল্টিয়ে অক্ষর ও তার নামের জোড়া মেলান</p>

      {isFinished ? (
        <GameResultBanner
          score={PAIR_COUNT}
          total={PAIR_COUNT}
          onReplay={replay}
          extraInfo={`মোট চাল: ${moves}`}
        />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2">
            {cards.map((card) => {
              const isFlipped = flippedIds.includes(card.cardId);
              const isMatched = matchedLetterIds.has(card.letterId);
              const isRevealed = isFlipped || isMatched;

              return (
                <button
                  key={card.cardId}
                  onClick={() => handleCardClick(card)}
                  disabled={isMatched}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-xl border p-1 text-center transition-colors",
                    isMatched
                      ? "border-primary-300 bg-primary-50 text-primary-300"
                      : isRevealed
                        ? "border-primary-500 bg-white"
                        : "border-primary-200 bg-primary-600"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isRevealed ? (
                      <motion.span
                        key="front"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        className={cn(
                          card.display.length <= 2 ? "font-arabic-text text-xl" : "text-[11px] leading-tight"
                        )}
                      >
                        {card.display}
                      </motion.span>
                    ) : (
                      <motion.span key="back" className="text-white">
                        ?
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-center text-sm text-ink-400">
            মিলেছে: {matchedLetterIds.size}/{PAIR_COUNT} • চাল: {moves}
          </p>
        </>
      )}
    </div>
  );
}
