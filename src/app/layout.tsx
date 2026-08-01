import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXIUM | Cinematic Edits",
  description:
    "Daily cinematic edits — Movies, Series, Iconic Scenes. Your daily dose of viral cinematic content.",
  keywords: [
    "NEXIUM",
    "cinematic edits",
    "movie edits",
    "film editing",
    "viral scenes",
    "Instagram edits",
  ],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🎬%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "NEXIUM | Cinematic Edits",
    description:
      "Daily cinematic edits — Movies, Series, Iconic Scenes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-[#f5f5f5]`}
      >
        {children}
      </body>
    </html>
  );
}
