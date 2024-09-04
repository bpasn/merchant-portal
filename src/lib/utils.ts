import { type ClassValue, clsx } from "clsx";
import { Children } from "react";
import { twMerge } from "tailwind-merge";
import ProjectError from "./utils/project-error.class";
import { AxiosError } from "axios";

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

export const report = (error:any):string => {
  if(error instanceof AxiosError){
    return error.response && error.response.data ? (error.response.data as ErrorResponse).message : error.message;
  }
  if(error instanceof ProjectError){
    return error.message;
  }
  return "Internal server error";
};