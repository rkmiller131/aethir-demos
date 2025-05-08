import CaretLeft from "./icons/CaretLeft";
import CaretRight from "./icons/CaretRight";
import Icon from "./icons/Icon";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex items-center justify-center w-full p-4 mt-[75px] gap-4">
      <Icon size="lg">{<CaretLeft />}</Icon>
      <div className="flex flex-grow justify-between items-center bg-[#040207] rounded-xl shadow-lg h-[400px]">
        <div className="flex flex-col justify-evenly h-full py-4 px-12 h-full">
          <Image
            src="/FIFA-logo.png"
            alt="FIFA Logo"
            height={500}
            width={500}
            className="h-[45px] lg:h-[75px] w-auto mb-8"
          />
          <div className="text-lg lg:text-xl">
            Feel the glory of lifting the World Cup
          </div>
          <div
            className="bg-gradient-to-br from-[#9146ff] to-[#5f00ff] rounded-lg w-[75%] text-center text-md lg:text-lg border-4 border-transparent hover:opacity-80 hover:shadow-[0_0_0_2px_rgb(90,208,190)] hover:bg-clip-content transition-all duration-200 ease-in-out cursor-pointer"
          >
            <div className="py-2">
              Play now
            </div>
          </div>
          <div>...</div>
        </div>
        <div className="hidden lg:block w-[50%] rounded-xl h-[400px]">
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
      <Icon size="lg">{<CaretRight />}</Icon>
    </div>
  );
}