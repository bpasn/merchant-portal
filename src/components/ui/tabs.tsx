"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import Link from "next/link";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { href: string; }
>(({ className, href, ...props }, ref) => (
  <TabsPrimitive.Trigger
    asChild
    ref={ref}
    className={cn(
      "inline-flex p-0 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "text-md h-[50px] w-full flex justify-center ",
      "data-[state=active]:shadow-[rgba(0,0,0,.2)_1px_0px_2px_-1px_,rgba(0,0,0,.2)_-1px_0px_2px_-1px]",
      "data-[state=active]:text-primary",
      "data-[state=active]:underline-offset-8",
      "data-[state=active]:underline",
      "data-[state=active]:bg-white",
      "data-[state=active]:font-bold",
      "data-[state=inactive]:font-normal",
      "data-[state=inactive]:bg-gray-200 ",
      "data-[state=active]:rounded-tl-md",
      "data-[state=active]:rounded-tr-md",
      "data-[state=active]:rounded-br-none ",
      "data-[state=active]:rounded-bl-none",
      className
    )}
    {...props}
  >
    <Link href={href}>{props.children}</Link>
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "mt-0 w-full bg-[rgb(255,255,255)] shadow-[rgba(0,0,0,.2)_1px_0px_2px_-1px_,rgba(0,0,0,.2)_-1px_0px_2px_-1px]",
      "rounded-bl-md rounded-br-md rounded-tr-md",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
