'use client'

import { IconProps } from "@/types/icon";
import { icons } from "lucide-react";

const IconLucide = ({ name, ...props }: IconProps) => {
  const LucideIcon = icons[name];
  return (
      <LucideIcon {...props} />
  );
}

export default IconLucide