import Image from "next/image";

export default function NavMock() {
  return (
    <div className="w-full flex justify-between px-20 py-5 bg-[#0D0D0D] drop-shadow-md">
      <div className="flex gap-6 items-center">
        <Image
          src="/netflix-logo.png"
          alt="netflix-logo"
          width={100}
          height={100}
        />
        {["Home", "TV Shows", "Movies", "New & Popular", "My List", "Browse by Languages"].map((text, index) =>
          <span key={text} className={`text-md cursor-not-allowed ${index === 0 ? "font-bold" : "font-thin"}`}>{text}</span>)
        }
      </div>
      {/* <Image
        src="/refactor-logo.png"
        alt="refactor-logo"
        width={100}
        height={100}
      /> */}
      <Image
        src="/mock-login.png"
        alt="mock login"
        width={160}
        height={100}
        className="cursor-not-allowed"
      />
    </div>
  );
}