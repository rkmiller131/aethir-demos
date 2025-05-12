"use client";

import Image from "next/image";
import Icon from "../icons/Icon";
import LibraryIcon from "../icons/LibraryIcon";
import FIFAPopup from "./FIFAPopup";

export default function ContinuePlaying() {
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center px-16">
        <Image
          src="/luna_play_circle.webp"
          alt="Continue Playing"
          width={24}
          height={24}
        />
        <span className="text-lg lg:text-2xl">
          CONTINUE PLAYING
        </span>
      </div>
      <span className="px-16 flex gap-4 lg:gap-6 w-full">
        <FIFAPopup />
        <div className="flex flex-col gap-3 items-center justify-center min-w-[175px] w-[300px] bg-[#181818] rounded-lg cursor-not-allowed">
          <Icon size="xxl">{<LibraryIcon />}</Icon>
          <span className="text-md lg:text-2xl">See Your Games</span>
        </div>
      </span>
    </div>
  );
}
