import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import AuthProvider from "./provider";
import { getSession } from "../lib/auth";
import AuthSessionProvider from "@/lib/providers/auth-session";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Merchant Portal",
  description: "Merchant portal E-commerce manager",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-gray-100 ")}>
        <AuthProvider session={session}>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
