"use client";

import { useEffect } from "react";

interface NetflixStingerProps {
  onEnd: () => void;
}

export default function NetflixStinger({ onEnd }: NetflixStingerProps) {
  useEffect(() => {
    sessionStorage.setItem("hasStingerPlayed", "false");
    const videoElement = document.getElementById("netflix-stinger") as HTMLVideoElement

    videoElement.addEventListener("ended", onEnd)
    videoElement.play()

    return () => {
      videoElement.removeEventListener("ended", onEnd)
    }
  }, [onEnd])

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-10">
      <video id="netflix-stinger" className="w-full h-full object-cover" preload="auto" autoPlay src="/new-stinger.mp4" />
    </div>
  );
}