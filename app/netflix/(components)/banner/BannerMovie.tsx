"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import PlayNowButton from "@/app/netflix/(components)/banner/buttons/PlayNowButton";
import MoreInfoButton from "./buttons/MoreInfoButton";

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
    <div className="relative h-[46.25vw] flex flex-col mt-[-60px]">
      {/* Overlay */}
      <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-br from-black/60 to-transparent opacity-75 transition-opacity duration-500" />
      {/* Main Banner Container */}
      <div className="absolute z-5 w-full h-full flex flex-col justify-center">
        {/* Billboard Content */}
        <div className="pl-5 lg:pl-20 flex flex-col gap-5 md:gap-10 lg:gap-30">
          {/* FIFA LOGO */}
          <div className="">
            <Image
              src="/FIFA-logo.png"
              alt="FIFA logo"
              height={500}
              width={500}
              className="h-[25px] md:h-[60px] lg:h-[110px] w-auto"
            />
          </div>
          {/* UI Buttons */}
          <div className="flex flex-col lg:flex-row gap-2 text-[2.5vw] lg:text-3xl justify-between items-stretch">
            <div className="flex gap-2">
              <PlayNowButton />
              <MoreInfoButton />
            </div>
            <div className="flex gap-0 md:gap-4 items-center self-end">
              <Image
                src={isMuted ? "/sound-off.svg" : "/sound-on.svg"}
                alt="Toggle Sound"
                width={40}
                height={40}
                className="cursor-pointer h-[20px] sm:h-[30px] lg:h-[40px]"
                onClick={toggleSound}
              />
              <span className="bg-[#333333]/[0.6] p-2 pr-5 lg:p-3 lg:pr-10 border border-white border-t-0 border-l-3 border-r-0 border-b-0 text-xs lg:text-2xl">
                Game-ALL
              </span>
            </div>
          </div>
        </div>
        {/* Banner Video */}
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
      {/* Bottom Blend Gradient */}
      <div className="absolute left-0 right-0 top-auto bottom-[-1px] w-full h-[14.7vw] z-0 bg-gradient-to-b from-[hsla(0,0%,8%,0)] via-[hsla(0,0%,8%,0.15)_15%] via-[hsla(0,0%,8%,0.35)_29%] via-[hsla(0,0%,8%,0.58)_44%] via-[#141414_68%] to-[#141414] bg-[length:100%_100%] bg-[repeat:repeat-x] bg-[position:0_top] opacity-100"></div>
    </div>
  );
}