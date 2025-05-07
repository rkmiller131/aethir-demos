import Image from "next/image";

export default function Navbar() {
  return (
    <div className="bg-[#2b0058] shadow-xl flex fixed h-[70px] items-center justify-center w-full z-10">
      <div className="flex justify-between items-center w-full p-8">
        <div className="flex items-center gap-8">
          <Image
            src="/luna_logo.png"
            alt="Luna Logo"
            width={300}
            height={152}
            className="w-[120px] h-auto"
          />
          <div className="font-ember px-[2px] py-[7px] bg-gradient-to-r from-[#2eaae8] to-[#02fddc] bg-clip-text text-transparent">
            CLOUD GAMING
          </div>
        </div>
        <div>ITEM 2</div>
      </div>
    </div>
  );
}