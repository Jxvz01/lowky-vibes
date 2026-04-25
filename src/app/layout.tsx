import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { AudioProvider } from "@/components/player/AudioProvider";
import { Player } from "@/components/player/Player";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lowky Vibes",
  description: "Production-ready Spotify Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-white overflow-hidden h-screen flex flex-col`}>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto bg-zinc-900 flex flex-col">
            {children}
          </div>
        </div>
        <Player />
        <AudioProvider />
      </body>
    </html>
  );
}
