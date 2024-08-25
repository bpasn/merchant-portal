import { type ClassValue, clsx } from "clsx";
import { Children } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const EachElement = <T>({
  of,
  render }: {
    of: T[];
    render: (element: T, index: number) => React.ReactNode;
  }) => Children.toArray(of.map(render));