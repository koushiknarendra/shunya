import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = localFont({
  src: "./fonts/BricolageGrotesque-Variable.ttf",
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shunya — CA & Accounting Services for Businesses",
  description:
    "Everything your business needs — company registration, compliance, GST, taxation, and accounting. All in one place.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#0a0a0b] text-white">{children}</body>
    </html>
  );
}
