import NavLeft from "./NavLeft"

export default function Navbar() {
  return (
    <div className="bg-[#2b0058] shadow-xl flex fixed h-[65px] items-center justify-center w-full z-10 cursor-not-allowed">
      <div className="flex justify-between items-center w-full p-8">
        <NavLeft />
        <div>ITEM 2</div>
      </div>
    </div>
  );
}