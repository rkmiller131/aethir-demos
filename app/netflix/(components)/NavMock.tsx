"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavMock() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 5;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div
      className={`
          sticky top-0 h-auto min-h-[70px] z-10 w-full flex justify-between px-5 lg:px-20 py-5 drop-shadow-md cursor-not-allowed
          ${scrolled ? "bg-[#0D0D0D]" : "bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_10%,transparent)]"}
          transition-bg duration-500 ease
        `}
    >
      <div className="flex gap-6 items-center">
        <Image
          src="/netflix-logo.png"
          alt="netflix-logo"
          width={100}
          height={30}
          className="w-[60px] lg:w-[100px]"
        />
        <div className="hidden text-sm md:flex md:gap-4 lg:text-lg">
          {["Home", "TV Shows", "Movies", "New & Popular", "My List", "Browse by Languages"].map((text, index) =>
            <span key={text} className={`${index === 0 ? "font-bold" : "font-thin"}`}>{text}</span>)
          }
        </div>
      </div>
      <div className="flex gap-4 items-center text-sm font-thin">
        <Image
          src="/search.svg"
          alt="mock search"
          width={25}
          height={25}
          className="w-[15px] md:w-[20px] lg:w-[25px]"
        />
        <span>Kids</span>
        <Image
          src="/bell.svg"
          alt="mock notification"
          width={20}
          height={20}
          className="w-[10px] md:w-[15px] lg:w-[20px]"
        />
        <Image
          src="/profile.svg"
          alt="mock profile"
          width={35}
          height={35}
          className="w-[25px] md:w-[30px] lg:w-[35px]"
        />
      </div>
    </div>
  );
}