"use client";

import { useState } from "react";
import { startGame } from "@/app/actions";
import { APP_PAGES } from "@/app/lib/constants";
import { AppPageType } from "@/app/lib/types";

export default function PlayNow() {
  const [isStarting, setIsStarting] = useState(false);

  const handlePlayNow = async () => {
    if (isStarting) return;

    try {
      setIsStarting(true);
      // This will redirect to /play/0 if successful
      await startGame(APP_PAGES.LANDING as AppPageType);
    } catch (error) {
      console.error("Error starting game:", error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="absolute w-full h-full flex justify-end items-end p-40 z-5">
      <button
        className="px-2 lg:px-4 py-0 lg:px-6 lg:py-4 bg-[#FE5420] text-white text-[2.5vw] lg:text-3xl font-bold rounded-lg cursor-pointer hover:text-black hover:bg-gray-300 drop-shadow-[0_0_50px_rgba(214,73,30,0.5)]"
        disabled={isStarting}
        onClick={handlePlayNow}
      >
        {isStarting ? "Starting game" : "Play Now"}
      </button>
    </div>
  );
}
