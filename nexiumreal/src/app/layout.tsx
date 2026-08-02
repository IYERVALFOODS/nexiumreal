import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXIUM | Cinematic Movie Edits",
  description:
    "Daily Cinematic Edits — Movies, Series, Iconic Scenes. Follow @nexiumreal on Instagram.",
  openGraph: {
    title: "NEXIUM | Cinematic Movie Edits",
    description: "Daily Cinematic Edits — Movies, Series, Iconic Scenes.",
    url: "https://nexiumreal.vercel.app",
    siteName: "NEXIUM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXIUM | Cinematic Movie Edits",
    description: "Daily Cinematic Edits — Movies, Series, Iconic Scenes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
