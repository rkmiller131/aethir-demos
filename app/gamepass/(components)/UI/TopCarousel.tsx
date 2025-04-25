'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import games from '../../../lib/games.json';
import { startGame } from '@/app/actions';
import { APP_PAGES } from '@/app/lib/constants';
import { AppPageType } from '@/app/lib/types';

export default function TopCarousel() {
  const visibleCount = 3;
  const [startIndex, setStartIndex] = useState(0);
  const [isStarting, setIsStarting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayNow = async () => {
    if (isStarting) return;

    try {
      setIsStarting(true);
      await startGame(APP_PAGES.GAMEPASS as AppPageType);
    } catch (error) {
      console.error('Error starting game from TopCarousel.tsx:', error);
    } finally {
      setIsStarting(false);
    }
  };

  const scrollTo = (index: number) => {
    setStartIndex(index);
  };

  return (
    <div className="relative mx-auto pb-6">
      <div className="flex gap-4 overflow-hidden">
        {loading
          ? Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 min-w-[400px] h-[300px] bg-gray-800/50 rounded-lg overflow-hidden flex flex-col relative animate-[pulse_0.5s_infinite]"
                ></div>
              ))
          : games.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className={
                  i === 0
                    ? 'flex-shrink-0 min-w-[400px] h-[300px] bg-gray-800 rounded-lg overflow-hidden flex flex-col relative cursor-pointer hover:brightness-75 transition'
                    : 'flex-shrink-0 min-w-[400px] h-[300px] bg-gray-800 rounded-lg overflow-hidden flex flex-col relative cursor-not-allowed hover:brightness-75 transition'
                }
                onClick={() => {
                  if (i === 0) {
                    handlePlayNow();
                  }
                }}
              >
                <div className="relative w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={item.square}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent items-center">
                      <p className="text-white font-bold truncate">
                        {item.name}
                      </p>
                      <p className="text-gray-300 text-sm truncate">
                        {item.pub}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(games.length / visibleCount) }).map(
          (_, index) => (
            <button
              key={index}
              disabled={true}
              onClick={() => scrollTo(index * visibleCount)}
              className={`w-2 h-2 rounded-full transition cursor-not-allowed ${
                startIndex === index * visibleCount
                  ? 'bg-white'
                  : 'bg-gray-500/50'
              }`}
            />
          )
        )}
      </div>
    </div>
  );
}
