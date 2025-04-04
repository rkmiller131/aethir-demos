import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import EmergencyRedButton from "@/components/UI/buttons/EmergencyRedButton";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <EmergencyRedButton />
      </body>
    </html>
  );
}
