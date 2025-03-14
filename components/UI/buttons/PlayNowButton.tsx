"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { checkGameAvailability, startGame } from "@/app/actions";

export default function PlayNowButton() {
  const [isGameAvailable, setIsGameAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);

  const checkAvailability = async () => {
    try {
      setIsLoading(true);
      const result = await checkGameAvailability();
      setIsGameAvailable(result.isAvailable);
    } catch (error) {
      console.error("Error checking game availability:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAvailability();
    // Poll for game availability every 10 seconds
    const intervalId = setInterval(() => {
      if (!isGameAvailable) {
        checkAvailability();
      }
    }, 10000);

    return () => clearInterval(intervalId);

  }, [isGameAvailable]);

  const handlePlayNow = async () => {
    if (!isGameAvailable || isStarting) return;

    try {
      setIsStarting(true);
      // This will redirect to /play if successful
      await startGame();

      // If we're still here, there was an issue
      checkAvailability();
    } catch (error) {
      console.error("Error starting game:", error);
      checkAvailability();
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <>
      <button
        className="flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-0 lg:px-6 lg:py-4 bg-white text-black text-[2.5vw] lg:text-3xl font-bold rounded-sm cursor-pointer hover:bg-gray-300"
        disabled={!isGameAvailable || isLoading || isStarting}
        onClick={handlePlayNow}
      >
        <Image
          src="/play-icon.svg"
          alt="play icon"
          height={30}
          width={30}
          className="h-[10px] sm:h-[15px] lg:h-[30px] w-auto"
        />
        {isLoading ? "Checking availability..." :
         isStarting ? "Starting game" :
         isGameAvailable ? "Play Now" : "Game in progress"}
      </button>
    </>
  );
}