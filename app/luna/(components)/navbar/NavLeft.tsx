import Image from "next/image";

export default function NavLeft() {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/luna_logo.png"
        alt="Luna Logo"
        width={300}
        height={152}
        className="w-[120px] h-auto"
      />
      <div className="hidden lg:flex font-ember font-bold px-[7px] py-[2px] bg-gradient-to-r from-[#2eaae8] to-[#02fddc] bg-clip-text text-transparent border border-l-[#2eaae8] border-b-[#2eaae8] border-r-[#02fddc] border-t-[#02fddc] rounded-sm">
        CLOUD GAMING
      </div>
    </div>
  );
}