import { ReactNode } from "react";

interface IconProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
}

export default function Icon({ children, size = "sm" }: IconProps) {
  // Map to actual pixel values
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 42
  };

  const pixelSize = sizeMap[size];

  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: pixelSize, height: pixelSize }}
    >
      {children}
    </div>
  );
}