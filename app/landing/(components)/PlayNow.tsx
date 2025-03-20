"use client";

import { useState } from "react";
import { startGame } from "@/app/actions";

export default function PlayNow() {
  const [isStarting, setIsStarting] = useState(false);

  const handlePlayNow = async () => {
    if (isStarting) return;

    try {
      setIsStarting(true);
      // This will redirect to /play if successful
      await startGame();
    } catch (error) {
      console.error("Error starting game:", error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <>
      <button
        className="flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-0 lg:px-6 lg:py-4 bg-white text-black text-[2.5vw] lg:text-3xl font-bold rounded-sm cursor-pointer hover:bg-gray-300"
        disabled={isStarting}
        onClick={handlePlayNow}
      >
        {isStarting ? "Starting game" : "Play Now"}
      </button>
    </>
  );
}
