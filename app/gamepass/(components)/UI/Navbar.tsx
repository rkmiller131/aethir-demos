'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import games from '../../../lib/games.json';

import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Home,
  Library,
  Store,
} from 'lucide-react';

export default function Navbar() {
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen p-2 bg-black overflow-hidden transition-[width] duration-300 ease-in-out ${
        active ? 'w-[265px]' : 'w-[50px]'
      }`}
    >
      <div className="flex flex-row items-center mb-4">
        {active && (
          <Image
            src={games.at(9)!.portrait}
            width={32}
            height={32}
            alt="profile"
            className="w-[32px] h-[32px] rounded-full object-center cursor-not-allowed"
          />
        )}
        <div className="flex flex-row ml-auto gap-2">
          {active && (
            <>
              <Home
                height={32}
                width={32}
                color="white"
                className="bg-gray-500/50 p-[4px] rounded-md cursor-not-allowed"
              />
              <Bell
                height={32}
                width={32}
                color="white"
                className="bg-gray-500/50 p-[4px] rounded-md cursor-not-allowed"
              />
            </>
          )}
          {active ? (
            <ChevronLeft
              height={32}
              width={32}
              color="white"
              onClick={() => setActive(!active)}
              className="bg-gray-500/50 p-[4px] rounded-md cursor-pointer"
            />
          ) : (
            <ChevronRight
              height={32}
              width={32}
              color="white"
              onClick={() => setActive(!active)}
              className="bg-gray-500/50 p-[4px] rounded-md cursor-pointer"
            />
          )}
        </div>
      </div>

      {active && (
        <>
          <div className="space-y-2 mb-2">
            {[
              { Icon: Home, label: 'Home Page' },
              { Icon: Library, label: 'My Library' },
              { Icon: Cloud, label: 'Cloud Gaming' },
              { Icon: Store, label: 'Store' },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                className="flex flex-row w-full items-center bg-gray-800/50 text-white p-2 rounded-md cursor-not-allowed"
              >
                <Icon height={24} width={24} color="gray" />
                <p className="ml-2 p-2 text-white/80">{label}</p>
              </button>
            ))}
          </div>

          <div className="mb-2 relative">
            <select
              className="my-2 block w-full rounded-lg bg-gray-800/50 p-4 text-white/80 cursor-not-allowed appearance-none pr-10"
              value={1}
              disabled
            >
              <option value={1}>Action</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown
                height={24}
                width={24}
                color="white"
                className="bg-gray-500/50 p-[4px] rounded-md cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {loading
              ? Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      className="flex flex-row w-[238.5px] h-[64px] bg-gray-800/50 rounded-md p-2 items-center cursor-not-allowed animate-[pulse_0.5s_infinite]"
                      key={i}
                    ></div>
                  ))
              : games.slice(0, 7).map((item, i) => (
                  <div
                    className="flex flex-row bg-gray-800/40 rounded-md p-2 items-center cursor-not-allowed"
                    key={item.id}
                  >
                    <Image
                      src={item.portrait}
                      width={48}
                      height={48}
                      alt="profile"
                      className="min-w-[48px] h-[48px] rounded-md object-cover brightness-80"
                    />
                    <div className="flex flex-col items-left w-full px-2">
                      <h2 className="font-bold truncate">{item.name}</h2>
                      <p className="text-sm text-gray-400 whitespace-nowrap">
                        {`Last Played: ${i === 0 ? 'Now' : `${i} min ago`}`}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
}
