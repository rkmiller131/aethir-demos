"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PlayNowButton from "../buttons/PlayNowButton";

export default function BannerMovie() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }

  return (
    <div className="h-[63%] flex flex-col">
      {/* Overlay */}
      <div className="absolute z-0 top-0 left-0 w-full h-[100%] bg-gradient-to-t from-[#141414] to-transparent from-0% to-15%" />
      {/* FIFA LOGO */}
      <Image
        src="/FIFA-logo.png"
        alt="FIFA logo"
        height={500}
        width={500}
        className="absolute z-5 pl-20 top-[35%] drop-shadow-md"
      />
      {/* Buttons */}
      <div className="absolute z-5 pl-20 top-[60%] w-[99.9%] flex justify-between">
        <div className="flex gap-2">
          <PlayNowButton />
          <Link
            className="flex items-center gap-2 px-6 bg-gray-300/50 hover:bg-gray-400/50 text-lg rounded-sm cursor-pointer"
            href="https://www.refactorgames.com/"
            target="_blank"
            referrerPolicy="no-referrer"
          >
          <Image
              src="/info-icon.svg"
              alt="more info icon"
              height={20}
              width={20}
            />
            More Info
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Image
            src={isMuted ? "/sound-off.svg" : "/sound-on.svg"}
            alt="Toggle Sound"
            width={40}
            height={40}
            className="cursor-pointer"
            onClick={toggleSound}
          />
          <span className="bg-black opacity-75 p-3 pr-10 border border-white border-t-0 border-l-3 border-r-0 border-b-0 text-lg">Game-ALL</span>
        </div>
      </div>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className="h-full w-full object-cover z-[-1]"
      >
        <source src="https://cdn.glitch.me/c4f540ac-7f7c-41b2-ae89-9e2617351aa6/banner-movie.mp4?v=1741788746068" type="video/mp4" />
      </video>
    </div>
  );
}