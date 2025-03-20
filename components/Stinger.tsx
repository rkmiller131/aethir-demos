"use client";

import { useEffect } from "react";

interface StingerProps {
  onEnd: () => void;
  version: number | null;
}

export default function Stinger({ onEnd, version }: StingerProps) {
  const src = version === 1 ? "/DelphiLogo2K60.mp4" : "/new-stinger.mp4";

  useEffect(() => {
    sessionStorage.setItem("hasStingerPlayed", "false");
    const videoElement = document.getElementById("stinger") as HTMLVideoElement

    videoElement.addEventListener("ended", onEnd)
    videoElement.play()

    return () => {
      videoElement.removeEventListener("ended", onEnd)
    }
  }, [onEnd])

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-10">
      <video id="stinger" className="w-full h-full object-cover" preload="auto" autoPlay src={src} />
    </div>
  );
}