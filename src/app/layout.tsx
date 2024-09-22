import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSession } from "../lib/utils/auth";
import '../styles/globals.css';
import AuthProvider from "../lib/providers/auth-provider";
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
