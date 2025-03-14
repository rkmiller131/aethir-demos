"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PlayNowButton from "@/components/UI/buttons/PlayNowButton";

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
    // <div className="h-[63%] flex flex-col">
    <div className="h-[46.25vw] flex flex-col mt-[-60px]">
      {/* Overlay */}
      {/* <div className="hidden lg:block absolute z-0 top-0 left-0 w-full h-[105%] bg-gradient-to-t from-[#141414] to-transparent from-0% to-15%" /> */}
      <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-br from-black/60 to-transparent opacity-100 transition-opacity duration-500" />
      {/* FIFA LOGO */}
      <div className="flex justify-center sm:justify-start">
        <Image
          src="/FIFA-logo.png"
          alt="FIFA logo"
          height={500}
          width={500}
          className="absolute z-5 h-[50px] md:h-[75px] lg:h-[100px] w-auto sm:pl-5 lg:pl-20 top-[25%] lg:top-[35%] drop-shadow-md"
        />
      </div>
      {/* Buttons */}
      <div className="absolute z-5 sm:pl-5 lg:pl-20 top-[50%] lg:top-[60%] w-[99.9%] flex flex-col items-center sm:items-start gap-10 text-sm lg:text-lg lg:flex-row lg:justify-between lg:items-stretch lg:gap-0">
        <div className="flex flex-col lg:flex-row gap-2">
          <PlayNowButton />
          <Link
            className="flex items-center gap-2 p-2 px-6 bg-gray-300/50 hover:bg-gray-400/50 rounded-sm cursor-pointer"
            href="https://www.fifa.com/en"
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
        <div className="flex gap-4 items-center self-end">
          <Image
            src={isMuted ? "/sound-off.svg" : "/sound-on.svg"}
            alt="Toggle Sound"
            width={40}
            height={40}
            className="cursor-pointer h-[30px] lg:h-[40px]"
            onClick={toggleSound}
          />
          <span className="bg-black opacity-75 p-2 pr-5 lg:p-3 lg:pr-10 border border-white border-t-0 border-l-3 border-r-0 border-b-0">Game-ALL</span>
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
      <div className="absolute left-0 right-0 top-auto bottom-[-1px] w-full h-[14.7vw] z-0 bg-gradient-to-b from-[hsla(0,0%,8%,0)] via-[hsla(0,0%,8%,0.15)_15%] via-[hsla(0,0%,8%,0.35)_29%] via-[hsla(0,0%,8%,0.58)_44%] via-[#141414_68%] to-[#141414] bg-[length:100%_100%] bg-[repeat:repeat-x] bg-[position:0_top] opacity-100"></div>
    </div>
  );
}