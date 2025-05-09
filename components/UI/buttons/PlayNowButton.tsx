"use client";

import { startGame } from "@/app/actions";
import { APP_PAGES } from "@/app/lib/constants";
import { AppPageType } from "@/app/lib/types";
import { useState } from "react";
import Image from "next/image";
import { Loader, Play } from 'lucide-react';

export default function PlayNowButton({ page, alt }: { page: AppPageType, alt?: boolean }) {
    const [isStarting, setIsStarting] = useState(false);

    const handlePlayNow = async () => {
      if (isStarting) return;

      setIsStarting(true);
      // redirect happens inside the server action, and we can't put it in a try/catch
      // because it will not be caught by the next.js side error handler for redirects.
      await startGame(page);
      // reset if redirect doesn't happen.
      setIsStarting(false);
    };

    if (page === APP_PAGES.LANDING) {
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

    if (page === APP_PAGES.NETFLIX) {
      return (
        <button
          className="flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-0 lg:px-6 lg:py-4 bg-white text-black text-[2.5vw] lg:text-3xl font-bold rounded-sm cursor-pointer hover:bg-gray-300"
          disabled={isStarting}
          onClick={handlePlayNow}
        >
          <Image
            src="/play-icon.svg"
            alt="play icon"
            height={30}
            width={30}
            className="h-[10px] sm:h-[15px] lg:h-[30px] w-auto"
          />
          {isStarting ? "Starting game" : "Play Now"}
        </button>
      );
    }

    if (page === APP_PAGES.GAMEPASS) {
      return (
        <>
          <button
            className="flex items-center max-h-[120px] gap-1 lg:gap-2 px-2 lg:px-4 py-0 lg:py-4 bg-gray-500/75 text-[2.5vw] lg:text-3xl font-bold rounded-sm cursor-pointer"
            disabled={isStarting}
            onClick={handlePlayNow}
          >
            {isStarting ? (
              <Loader
                height={15}
                width={15}
                color="white"
                className={`animate-spin ${isStarting ? 'spin' : ''}`}
              />
            ) : (
              <Play height={15} width={15} color="white" />
            )}
          </button>
        </>
      );
    }

    if (page === APP_PAGES.LUNA) {
      if (alt) {
        return (
          <button
            className="bg-gradient-to-br from-[#9146ff] to-[#5f00ff] rounded-md mb-3 text-center text-sm lg:text-md hover:opacity-80 transition-all duration-200 ease-in-out cursor-pointer"
            disabled={isStarting}
            onClick={handlePlayNow}
          >
            <div className="flex gap-2 items-center justify-center py-2">
              <Image
                src="/luna_icon.svg"
                alt="Luna Icon"
                height={30}
                width={30}
                className="w-[16px] h-auto ml-[-16px]"
              />
              {isStarting ? "Starting game" : "Play now"}
            </div>
          </button>
        );
      } else {
        return (
          <button
            className="bg-gradient-to-br from-[#9146ff] to-[#5f00ff] rounded-lg w-[75%] text-center text-md lg:text-lg border-4 border-transparent hover:opacity-80 hover:shadow-[0_0_0_2px_rgb(90,208,190)] hover:bg-clip-content transition-all duration-200 ease-in-out cursor-pointer"
            disabled={isStarting}
            onClick={handlePlayNow}
          >
            <div className="flex gap-3 items-center justify-center py-2">
              <Image
                src="/luna_icon.svg"
                alt="Luna Icon"
                height={30}
                width={30}
                className="ml-[-30px]"
              />
              {isStarting ? "Starting game" : "Play now"}
            </div>
          </button>
        );
      }
    }
}