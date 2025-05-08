import CaretLeft from "./icons/CaretLeft";
import CaretRight from "./icons/CaretRight";
import Icon from "./icons/Icon";

export default function Hero() {
  return (
    <div className="flex items-center justify-center w-full p-4 mt-[75px] gap-4">
      <Icon size="lg">{<CaretLeft />}</Icon>
      <div className="flex flex-grow justify-between items-center bg-[#040207] rounded-xl shadow-lg">
        <div className="py-4 px-12">
          Item1
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