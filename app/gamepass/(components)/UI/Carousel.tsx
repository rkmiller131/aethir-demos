'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import games from '../../../lib/games.json';
import { startGame } from '@/app/actions';
import { APP_PAGES } from '@/app/lib/constants';
import { AppPageType } from '@/app/lib/types';

export default function Carousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isStarting, setIsStarting] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      const cardWidth = 192;
      const containerWidth = window.innerWidth * 0.8;
      setVisibleCount(Math.max(1, Math.floor(containerWidth / cardWidth)));
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => {
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    setStartIndex((prev) =>
      direction === 'left'
        ? Math.max(0, prev - visibleCount)
        : Math.min(games.length - visibleCount, prev + visibleCount)
    );
  };

  const handlePlayNow = async () => {
    if (isStarting) return;

    try {
      setIsStarting(true);
      await startGame(APP_PAGES.GAMEPASS as AppPageType);
    } catch (error) {
      console.error('Error starting game from Carousel.tsx:', error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="flex flex-col max-w-[1232px] mx-auto pb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Picks for you</h1>
          <p className="text-gray-500/75">
            With games added all the time, you&apos;ll always have something new
            to play.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className={`p-2 bg-gray-500/50 text-white rounded-md transition ${
              startIndex > 0
                ? 'hover:bg-gray-700'
                : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={true}
          >
            <ChevronLeft className="w-5 h-5" color="gray" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`p-2 bg-gray-500/50 text-white rounded-md transition ${
              startIndex + visibleCount < games.length
                ? 'hover:bg-gray-700'
                : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={true}
          >
            <ChevronRight className="w-5 h-5" color="gray" />
          </button>
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={
                    i === 0
                      ? 'flex-shrink-0 w-48 h-[350px] bg-gray-800/50 rounded-lg overflow-hidden flex flex-col cursor-pointer hover:brightness-75 transition animate-[pulse_0.7s_infinite]'
                      : 'flex-shrink-0 w-48 h-[350px] bg-gray-800/50 rounded-lg overflow-hidden cursor-not-allowed flex flex-col hover:brightness-75 transition animate-[pulse_0.7s_infinite]'
                  }
                >
                  <div className="relative flex-grow"></div>
                  <div className="p-3"></div>
                </div>
              ))
          : games.slice(0, 6).map((item, i) => (
              <div
                key={i}
                className={
                  i === 0
                    ? 'flex-shrink-0 w-48 h-[350px] bg-gray-800/50 rounded-lg overflow-hidden flex flex-col cursor-pointer hover:brightness-75 transition'
                    : 'flex-shrink-0 w-48 h-[350px] bg-gray-800/50 rounded-lg overflow-hidden cursor-not-allowed flex flex-col hover:brightness-75 transition'
                }
                onClick={() => {
                  if (i === 0) {
                    handlePlayNow();
                  }
                }}
              >
                <div className="relative flex-grow">
                  <Image
                    src={item.portrait}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-3">
                  <p className="text-white font-bold truncate">{item.name}</p>
                  <p className="text-gray-300 text-sm truncate">{item.pub}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
