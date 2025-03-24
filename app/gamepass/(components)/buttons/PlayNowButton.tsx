'use client';

import Image from 'next/image';
import { useState } from 'react';
import { startGame } from '@/app/actions';
import { APP_PAGES } from '@/app/lib/constants';
import { AppPageType } from '@/app/lib/types';

export default function PlayNowButton() {
  const [isStarting, setIsStarting] = useState(false);

  const handlePlayNow = async () => {
    if (isStarting) return;

    try {
      setIsStarting(true);
      await startGame(APP_PAGES.GAMEPASS as AppPageType);
    } catch (error) {
      console.error('Error starting game:', error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <>
      <button
        className="flex items-center max-h-[120px] gap-1 lg:gap-2 px-2 lg:px-4 py-0 lg:py-4 bg-white text-black text-[2.5vw] lg:text-3xl font-bold rounded-sm cursor-pointer hover:bg-gray-300"
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
        {isStarting ? 'Starting game' : 'Play Now'}
      </button>
    </>
  );
}
