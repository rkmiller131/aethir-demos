"use client";

import { APP_PAGES } from "@/app/lib/constants";
import PlayNowButton from "@/components/UI/buttons/PlayNowButton";
import Image from "next/image";
import { useRef, useState } from "react";
import Icon from "../icons/Icon";
import ControllerIcon from "../icons/ControllerIcon";
import CouchIcon from "../icons/CouchIcon";

export default function FIFAPopup() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }

  const handleMouseEnter = () => {
    setIsPopupVisible(true);
  };
  const handleMouseLeave = () => {
    setIsPopupVisible(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Image
        src="/fifa-banner2.png"
        alt="FIFA Thumbnail"
        width={2560}
        height={1440}
        className="rounded-md w-[300px] cursor-pointer"
      />

      <div
        className={`absolute top-0 left-[10%] w-[300px] bg-[#2b0058] rounded-md z-10 scale-150 flex flex-col
                   transition-all duration-600 ease-in-out
                   ${isPopupVisible ? 'opacity-100 translate-y-0 cursor-pointer' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
        <div className="relative rounded-md">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover rounded-md mb-2"
          >
            <source src="https://cdn.glitch.me/c4f540ac-7f7c-41b2-ae89-9e2617351aa6/banner-trailer.webm?v=1742318229191" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <Image
            src={isMuted ? "/sound-off.svg" : "/sound-on.svg"}
            alt="Toggle Sound"
            width={40}
            height={40}
            className="absolute right-0 bottom-5 cursor-pointer h-[20px]"
            onClick={toggleSound}
          />
        </div>
        <div className="px-2 flex flex-col gap-1">
          <PlayNowButton page={APP_PAGES.LUNA} alt={true}/>
          <span className="text-md font-bold">FIFA®26</span>
          <div className="flex gap-2 items-center">
            <span className="text-[0.6rem]">Play with:</span>
            <Image
              src="/keyboard.webp"
              alt="Keyboard Icon"
              width={52}
              height={68}
              className="h-[15px] lg:h-[20px] w-auto"
            />
            <Icon size="sm">{<ControllerIcon />}</Icon>
            <span className="font-mono">|</span>
            <Icon size="sm">{<CouchIcon />}</Icon>
          </div>
          <span className="text-[0.7rem]">Refactor Games</span>
          <div className="relative flex gap-1 items-center text-[0.5rem] mb-3">
            <span className="px-2 bg-white text-black rounded-full">SIMULATION</span>
            <span className="px-2 bg-white text-black rounded-full">SPORTS</span>
            <Image
              src="/ESRB_Everyone.png"
              alt="Game Rating"
              width={1200}
              height={1675}
              className="absolute right-0 bottom-0 h-[50px] w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}