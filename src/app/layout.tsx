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
    url: "https://srdigitalsolution.com",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
