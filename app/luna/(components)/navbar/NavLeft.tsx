import Image from "next/image";
import HomeIcon from "./icons/HomeIcon";
import NavListItem from "./NavListItem";
import LibraryIcon from "./icons/LibraryIcon";
import PlaylistIcon from "./icons/PlaylistIcon";
import CouchIcon from "./icons/CouchIcon";
import BroadcastIcon from "./icons/BroadcastIcon";
import SearchIcon from "./icons/SearchIcon";

export default function NavLeft() {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/luna_logo.png"
        alt="Luna Logo"
        width={300}
        height={152}
        className="w-[75px] lg:w-[105px] h-auto"
      />
      <div className="hidden lg:flex font-ember font-bold px-[7px] py-[2px] text-sm bg-gradient-to-r from-[#2eaae8] to-[#02fddc] bg-clip-text text-transparent border border-l-[#2eaae8] border-b-[#2eaae8] border-r-[#02fddc] border-t-[#02fddc] rounded-sm">
        CLOUD GAMING
      </div>
      <nav className="ml-4 flex gap-4 lg:gap-6">
        <NavListItem icon={<HomeIcon />} text="Home" active={true}/>
        <NavListItem icon={<LibraryIcon />} text="Library"/>
        <NavListItem icon={<PlaylistIcon />} text="Playlist"/>
        <NavListItem icon={<CouchIcon />} text="Couch"/>
        <NavListItem icon={<BroadcastIcon />} text="Broadcast"/>
        <NavListItem icon={<SearchIcon />} text="Search"/>
      </nav>
    </div>
  );
}