import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: {
    default: "Khaled M Alwaked | Software Developer",
    template: "%s | Khaled M Alwaked",
  },
  description:
    "Khaled M Alwaked — software developer building web and mobile products with Next.js, React and Flutter.",
  applicationName: "Khaled M Alwaked Portfolio",
  authors: [{ name: "Khaled M Alwaked" }],
  creator: "Khaled M Alwaked",
  keywords: ["Khaled Alwaked", "Software Developer", "Next.js Developer", "React Developer", "Flutter Developer", "Portfolio"],
  openGraph: {
    title: "Khaled M Alwaked | Software Developer",
    description: "Web and mobile products built with Next.js, React and Flutter.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Khaled M Alwaked | Software Developer",
    description: "Web and mobile products built with Next.js, React and Flutter.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} ${arabic.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
