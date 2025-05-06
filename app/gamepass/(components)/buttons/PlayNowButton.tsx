'use client';

import { useState } from 'react';
import { startGame } from '@/app/actions';
import { APP_PAGES } from '@/app/lib/constants';
import { Loader, Play } from 'lucide-react';

export default function PlayNowButton() {
  const [isStarting, setIsStarting] = useState(false);

  const handlePlayNow = async () => {
    if (isStarting) return;

    setIsStarting(true);
    // redirect happens inside the server action, and we can't put it in a try/catch
    // because it will not be caught by the next.js side error handler for redirects.
    await startGame(APP_PAGES.GAMEPASS);
    // reset if redirect doesn't happen.
    setIsStarting(false);
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
