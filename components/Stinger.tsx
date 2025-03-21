"use client";

import { useEffect } from "react";

interface StingerProps {
  onEnd: () => void;
  version: number | null;
}

export default function Stinger({ onEnd, version }: StingerProps) {
  console.log('version is', version)
  // const src = version === 0 ? "" : "/netflix-stinger.mp4";

  useEffect(() => {
    sessionStorage.setItem("hasStingerPlayed", "false");
    const videoElement = document.getElementById("transition-stinger") as HTMLVideoElement

    videoElement.addEventListener("ended", onEnd)
    videoElement.play()

    return () => {
      videoElement.removeEventListener("ended", onEnd)
    }
  }, [onEnd]);

  // if (!version || !src) {
  //   return null
  // }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-10">
      <video id="transition-stinger" className="w-full h-full object-cover" preload="auto" autoPlay src="/netflix-stinger.mp4" />
    </div>
  );
}