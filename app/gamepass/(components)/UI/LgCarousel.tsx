'use client';

import Image from 'next/image';
import { useState } from 'react';
import games from '../../../lib/games.json';
import PlayNowButton from '../buttons/PlayNowButton';

export default function LgCarousel() {
  const visibleCount = 3;
  const [startIndex, setStartIndex] = useState(0);

  const scrollTo = (index: number) => {
    setStartIndex(index);
  };

  return (
    <div className="relative mx-auto pb-6">
      <div className="flex gap-4 overflow-hidden">
        {games.slice(startIndex, startIndex + visibleCount).map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 min-w-[400px] h-[300px] bg-gray-800 rounded-lg overflow-hidden flex flex-col relative"
          >
            <div className="relative w-full h-full">
              <Image
                src={item.portrait}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="relative w-full h-full">
                <Image
                  src={item.portrait}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />

                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold truncate">{item.name}</p>
                    <p className="text-gray-300 text-sm truncate">{item.pub}</p>
                  </div>
                  <div className="ml-auto">
                    <PlayNowButton />
                  </div>
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
              onClick={() => scrollTo(index * visibleCount)}
              className={`w-2 h-2 rounded-full transition ${
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
