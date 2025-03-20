"use client";

import { useRef, useState } from "react";
import PlayNow from "./(components)/PlayNow";
import Image from "next/image";

export default function Landing() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleSound = () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      }
    }
  return (
    <div className="w-[100dvw] h-[100dvh]">
      <div className="flex">
        <PlayNow />
        <Image
          src={isMuted ? "/sound-off.svg" : "/sound-on.svg"}
          alt="Toggle Sound"
          width={40}
          height={40}
          className="absolute z-5 m-10 cursor-pointer h-[20px] sm:h-[30px] lg:h-[40px]"
          onClick={toggleSound}
        />
      </div>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover z-[-1]"
      >
        <source src="https://cdn.glitch.me/c4f540ac-7f7c-41b2-ae89-9e2617351aa6/banner-trailer.webm?v=1742318229191" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
