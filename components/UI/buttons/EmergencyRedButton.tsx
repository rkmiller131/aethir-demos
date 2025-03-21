"use client";

import { endGamesInPlace } from "@/app/actions";
import Image from "next/image";

export default function EmergencyRedButton() {
  const handleStopGame = async () => {
    await endGamesInPlace();
  }
  return (
    <button
      className="bg-red-700 text-white p-2 rounded-full fixed bottom-4 right-4 hover:bg-red-900 pointer-events-all cursor-pointer"
      onClick={handleStopGame}
    >
      <Image
        src="/power.svg"
        alt="Emergency Button"
        width={28}
        height={28}
      />
    </button>
  );
}