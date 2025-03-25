'use client';

import Image from 'next/image';
import { useState } from 'react';

import games from '../../../lib/games.json';

import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Home,
  Library,
  Store,
} from 'lucide-react';

export default function Navbar() {
  const [active, setActive] = useState(true);
  const [game, setGame] = useState('');

  return (
    <div
      className={
        active
          ? 'flex flex-col min-w-[230px] min-h-screen p-2 bg-black'
          : 'flex flex-col min-h-screen p-2 bg-black'
      }
    >
      {active ? (
        <>
          <div className="flex flex-row mb-4">
            <Image
              src={games.at(0)!.portrait}
              width={32}
              height={32}
              alt="profile"
              className="w-[32px] h-[32px] rounded-full object-center"
            />
            <div className="flex flex-row ml-auto gap-2">
              <Home
                height={32}
                width={32}
                color="white"
                className="bg-gray-500/50 p-[4px] rounded-md cursor-pointer"
              />
              <Bell
                height={32}
                width={32}
                color="white"
                className="bg-gray-500/50 p-[4px] rounded-md cursor-pointer"
              />
              <ChevronLeft
                height={32}
                width={32}
                color="white"
                onClick={() => setActive(!active)}
                className="bg-gray-500/50 p-[4px] rounded-md cursor-pointer"
              />
            </div>
          </div>
          <div className="space-y-2 mb-2">
            <button className="flex flex-row w-full items-center bg-gray-800/50 text-white p-2 rounded-md cursor-pointer">
              <Home height={24} width={24} color="gray" />
              <p className="ml-2">Home Page</p>
            </button>
            <button className="flex flex-row w-full items-center bg-gray-800/50 text-white p-2 rounded-md cursor-pointer">
              <Library height={24} width={24} color="gray" />
              <p className="ml-2">My Library</p>
            </button>
            <button className="flex flex-row w-full items-center bg-gray-800/50 text-white p-2 rounded-md cursor-pointer">
              <Cloud height={24} width={24} color="gray" />
              <p className="ml-2">Cloud Gaming</p>
            </button>
            <button className="flex flex-row w-full items-center bg-gray-800/50 text-white p-2 rounded-md cursor-pointer">
              <Store height={24} width={24} color="gray" />
              <p className="ml-2">Store</p>
            </button>
          </div>
          <div className="mb-2">
            <select
              className="my-2 block w-full p-2 rounded-lg bg-gray-800/50 cursor-pointer"
              value={game}
              onChange={(e) => console.log(e.target.value)}
            >
              <option value={1}>Action</option>
              <option value={2}>RPG</option>
              <option value={3}>FPS</option>
              <option value={4}>Sports</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <>
              {games.map((item) => (
                <div
                  className="flex flex-row bg-gray-800/50 rounded-md p-2 items-center cursor-pointer"
                  key={item.id}
                >
                  <Image
                    src={item.portrait}
                    width={48}
                    height={48}
                    alt="profile"
                    className="w-[48px] h-[48px] rounded-md object-cover"
                  />
                  <div className="flex flex-col items-left w-full px-2">
                    <h2 className="font-bold truncate">{item.name}</h2>
                    <p className="text-sm text-gray-400 whitespace-nowrap">
                      Last Played: 1hr ago
                    </p>
                  </div>
                </div>
              ))}
            </>
          </div>
        </>
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
  );
}
