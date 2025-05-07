import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import EmergencyRedButton from "@/components/UI/buttons/EmergencyRedButton";

import "./globals.css";

const amazonEmber = localFont({
  src: [
    {
      path: "Amazon_Ember_Heavy.woff2",
      weight: "800",
      style: "bold",
    },
    {
      path: "Amazon_Ember_Medium.woff2",
      weight: "500",
      style: "normal",
    }
  ],
  display: "swap",
  variable: "--font-amazon-ember",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Aragorn",
  description: "Cloud Streaming at its finest!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${amazonEmber.className} antialiased`}
      >
        {children}
        <EmergencyRedButton />
      </body>
    </html>
  );
}
