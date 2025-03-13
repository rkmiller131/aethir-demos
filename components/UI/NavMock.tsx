import Image from "next/image";

export default function NavMock() {
  return (
    <div className="w-full flex justify-between px-5 lg:px-20 py-5 bg-[#0D0D0D] drop-shadow-md cursor-not-allowed">
      <div className="flex gap-6 items-center">
        <Image
          src="/netflix-logo.png"
          alt="netflix-logo"
          width={100}
          height={30}
          className="w-[60px] lg:w-[100px]"
        />
        <div className="hidden lg:flex lg:gap-6">
          {["Home", "TV Shows", "Movies", "New & Popular", "My List", "Browse by Languages"].map((text, index) =>
            <span key={text} className={`text-md ${index === 0 ? "font-bold" : "font-thin"}`}>{text}</span>)
          }
        </div>
      </div>
      <Image
        src="/mock-login.png"
        alt="mock login"
        width={100}
        height={30}
        className="w-[100px] lg:w-[150px]"
      />
    </div>
  );
}