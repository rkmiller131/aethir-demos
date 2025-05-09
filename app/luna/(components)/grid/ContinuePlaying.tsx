"use client";

import Image from "next/image";
import Icon from "../icons/Icon";
import LibraryIcon from "../icons/LibraryIcon";
import FIFAPopup from "./FIFAPopup";

export default function ContinuePlaying() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 px-16 py-0">
        <span className="flex gap-2 items-center col-span-12 text-center text-2xl mb-2">
          <Image
            src="/luna_play_circle.webp"
            alt="Continue Playing"
            width={24}
            height={24}
          />
          <div className="text-lg lg:text-2xl">
            CONTINUE PLAYING
          </div>
        </span>
      </div>
      <span className="px-16 flex gap-6">
        <FIFAPopup />
        <div className="flex flex-col gap-3 items-center justify-center w-[300px] bg-[#181818] rounded-md cursor-not-allowed">
          <Icon size="xxl">{<LibraryIcon />}</Icon>
          <span className="text-md lg:text-2xl">See Your Games</span>
        </div>
      </span>
    </div>
  );
}
