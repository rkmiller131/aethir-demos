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
        className="flex items-center gap-2 px-6 bg-white text-black text-lg font-bold rounded-sm cursor-pointer hover:bg-gray-300"
        disabled={!isGameAvailable || isLoading || isStarting}
        onClick={handlePlayNow}
      >
        <Image
          src="/play-icon.svg"
          alt="play icon"
          height={20}
          width={20}
          className="h-10 lg:h-[20px]"
        />
        {isLoading ? "Checking availability..." :
         isStarting ? "Starting game" :
         isGameAvailable ? "Play Now" : "Game in progress"}
      </button>
    </>
  );
}