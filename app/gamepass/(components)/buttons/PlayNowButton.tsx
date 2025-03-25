'use client';

import { useState } from 'react';
import { startGame } from '@/app/actions';
import { APP_PAGES } from '@/app/lib/constants';
import { AppPageType } from '@/app/lib/types';
import { Loader, Play } from 'lucide-react';

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
