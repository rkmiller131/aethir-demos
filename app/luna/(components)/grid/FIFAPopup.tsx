"use client";

import { APP_PAGES } from "@/app/lib/constants";
import PlayNowButton from "@/components/UI/buttons/PlayNowButton";
import Image from "next/image";
import { useState } from "react";

export default function FIFAPopup() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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

      {isPopupVisible && (
        <div className="absolute top-0 left-[10%] w-[300px] bg-[#2b0058] rounded-md z-10 scale-150 flex flex-col">
          <div className="rounded-md">
            <video
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
          </div>
          <div className="px-2 flex flex-col">
            <PlayNowButton page={APP_PAGES.LUNA} alt={true}/>
            <span className="text-sm font-bold">FIFA®26</span>
            <span>Play with:</span>
            <span className="text-xs">Refactor Games</span>
          </div>
        </div>
      )}

    </div>
  );
}