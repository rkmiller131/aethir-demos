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
      <head>
        {/* Force landscape orientation on mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, orientation=landscape" />

        {/* For Apple devices */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <EmergencyRedButton />
      </body>
    </html>
  );
}
