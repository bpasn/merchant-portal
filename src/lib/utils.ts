import { AxiosError } from "axios";
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

export const toUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const delay = (duration: number) => new Promise((res) => setTimeout(res, duration));


export const report = (error: unknown):string => {
  if (error instanceof AxiosError) {
    console.log(error.response?.data ? error.response.data : error.message)
    return error.response?.data ? error.response.data : error.message;
  }
  if (error instanceof Error) {
    console.log(error.message)
    return error.message;
  }
  console.log("Internal server error")

  return "Internal server error";
};