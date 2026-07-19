import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = { title: "ClawPump Platform", description: "Solana AI Agent Dashboard" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body className={inter.className + " bg-[#0a0a12] text-gray-100 flex min-h-screen"}>
      <Shell>{children}</Shell>
    </body></html>
  );
}
