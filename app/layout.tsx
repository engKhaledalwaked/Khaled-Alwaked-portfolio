import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Khaled M Alwaked | Software Developer",
    template: "%s | Khaled M Alwaked",
  },
  description:
    "Software developer portfolio for Khaled M Alwaked, focused on Next.js, React, Flutter, AI integrations, product engineering, and polished user experiences.",
  applicationName: "Khaled M Alwaked Portfolio",
  authors: [{ name: "Khaled M Alwaked" }],
  creator: "Khaled M Alwaked",
  keywords: [
    "Khaled Alwaked",
    "Software Developer",
    "Next.js Developer",
    "React Developer",
    "Flutter Developer",
    "AI Integration",
    "Portfolio",
  ],
  openGraph: {
    title: "Khaled M Alwaked | Software Developer",
    description:
      "Portfolio of scalable web, mobile, and AI-enabled product work by Khaled M Alwaked.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Khaled M Alwaked | Software Developer",
    description:
      "Scalable web, mobile, and AI-enabled product work by Khaled M Alwaked.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
