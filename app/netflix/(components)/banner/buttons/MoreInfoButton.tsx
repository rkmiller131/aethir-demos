import Image from "next/image";
import Link from "next/link";

export default function MoreInfoButton() {
  return (
    <Link
      className="flex items-center gap-1 p-2 lg:gap-2 lg:px-6 bg-gray-300/50 hover:bg-gray-400/50 rounded-sm cursor-pointer"
      href="https://www.fifa.com/en"
      target="_blank"
      referrerPolicy="no-referrer"
    >
    <Image
        src="/info-icon.svg"
        alt="more info icon"
        height={30}
        width={30}
        className="h-[10px] sm:h-[15px] lg:h-[30px] w-auto"
      />
      More Info
    </Link>
  );
}