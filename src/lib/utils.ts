import { type ClassValue, clsx } from "clsx";
import { Children } from "react";
import { twMerge } from "tailwind-merge";
import axios, { AxiosError } from "axios";

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

export const report = (error: unknown): string => {
  if (error instanceof AxiosError) {
    console.log(error.response?.data);
    return error.response && error.response.data ? (error.response.data as ErrorResponse).message : error.message;
  }
  console.log((error as Error).message);
  return (error as Error).message;
};

export const ElementRenderWhen = ({
  children,
  _if,
  _el
}: {
  children: React.ReactNode;
  _el: React.ReactNode;
  _if: boolean;
}) => {
return _if ? children : _el
};