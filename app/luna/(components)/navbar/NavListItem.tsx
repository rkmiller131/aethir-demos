import HomeIcon from "./icons/HomeIcon";

export default function NavListItem({ text }: { text: string }) {
  return (
    <div
      className="relative flex items-center gap-2 after:content-[''] after:absolute after:bg-[#fff] after:height-[2px] after:width-[25px] after:bottom-[-25px]"
    >
      <HomeIcon />
      <span>{text}</span>
    </div>
  );
}