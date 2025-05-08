import CaretDown from "./icons/CaretDown";
import ControllerIcon from "./icons/ControllerIcon";
import Icon from "./icons/Icon";
import Image from "next/image";

export default function NavRight() {
  return (
    <div className="flex items-center gap-6">
      <div className="hidden xl:block text-xs rounded-md py-2 px-4 bg-[#9146ff]">
        Subscribe to Luna+
      </div>
      <div className="hidden lg:block relative">
        <Icon size="lg">{<ControllerIcon />}</Icon>
        <div className="absolute bottom-[-3px] right-[-3px] h-[6px] w-[6px] rounded-full bg-gray-500"/>
      </div>
      <div className="flex items-center">
        <Image
          src="/luna_avatar.webp"
          alt="Luna Avatar"
          width={32}
          height={32}
          className="w-[28px] h-auto"
        />
        <Icon size="md">{<CaretDown />}</Icon>
      </div>
    </div>
  );
}