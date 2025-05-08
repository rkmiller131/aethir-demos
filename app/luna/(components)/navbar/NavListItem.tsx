import { ReactNode } from "react";
import Icon from "./icons/Icon";

interface NavListItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
}

export default function NavListItem({ icon, text, active = false }: NavListItemProps) {
  return (
    <div
      className={`relative flex items-center gap-2 ${
        active
          ? "after:content-[''] after:absolute after:bg-white after:h-0.75 after:w-full after:left-0 after:bottom-[-25px]"
          : ""
      }`}
    >
      {
        <Icon size="md">
          {icon}
        </Icon>
      }
      <span className="hidden lg:block text-sm">{text}</span>
    </div>
  );
}