import PlayNowButton from "@/components/UI/buttons/PlayNowButton";
import CaretLeft from "./icons/CaretLeft";
import CaretRight from "./icons/CaretRight";
import Icon from "./icons/Icon";
import Image from "next/image";
import { APP_PAGES } from "@/app/lib/constants";

export default function Hero() {
  return (
    <div className="flex items-center justify-center w-full p-4 mt-[75px] gap-4">
      <Icon size="xl">
        {<CaretLeft />}
      </Icon>
      <div className="flex flex-grow justify-between items-center bg-[#040207] rounded-xl shadow-lg h-full">
        <div className="flex flex-col justify-evenly py-4 px-12 h-[425px] gap-4">
          <Image
            src="/FIFA-logo.png"
            alt="FIFA Logo"
            height={500}
            width={500}
            className="h-[45px] lg:h-[75px] w-fit mb-8"
          />
          <div className="text-lg lg:text-xl">
            Feel the glory of lifting the World Cup
          </div>

          <PlayNowButton page={APP_PAGES.LUNA}/>

          {/* Pagination */}
          <div className="flex gap-2 items-center">
            <span className="w-[5px] h-[5px] bg-white opacity-50 rounded-full"/>
            <span className="w-[8px] h-[8px] bg-[#5ad0be] rounded-full"/>
            <span className="w-[5px] h-[5px] bg-white opacity-50 rounded-full"/>
            <span className="w-[5px] h-[5px] bg-white opacity-50 rounded-full"/>
            <span className="w-[5px] h-[5px] bg-white opacity-50 rounded-full"/>
          </div>
        </div>
        <div className="hidden lg:block w-[50%] rounded-xl h-[425px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover rounded-xl"
          >
            <source src="https://cdn.glitch.me/c4f540ac-7f7c-41b2-ae89-9e2617351aa6/banner-trailer.webm?v=1742318229191" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <Icon size="xl">
        {<CaretRight />}
      </Icon>
    </div>
  );
}