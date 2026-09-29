import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/ui/MotionProvider";
import { siteConfig } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "SR Digital Solution | Affordable Websites & Web Applications",
  description:
    "Professional, modern websites and web applications for businesses, startups and individuals in Malaysia — without the high agency price. Websites from RM500.",
  keywords: [
    "web development Malaysia",
    "affordable website",
    "freelance web developer",
    "business website",
    "website from RM500",
    "SR Digital Solution",
    "Malaysia web developer",
    "responsive website",
    "web application",
    "small business website",
  ],
  authors: [{ name: "SR Digital Solution" }],
  openGraph: {
    title: "SR Digital Solution | Affordable Websites & Web Applications",
    description:
      "Professional, modern websites and web applications for businesses, startups and individuals — without the high agency price.",
    url: siteConfig.url,
    siteName: "SR Digital Solution",
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SR Digital Solution | Affordable Websites & Web Applications",
    description:
      "Professional, modern websites and web applications — websites from RM500.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
