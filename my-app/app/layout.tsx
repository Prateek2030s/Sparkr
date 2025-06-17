// app/layout.tsx
import "./globals.css";
import { Provider } from "../components/ui/provider";
import { Shell } from "../components/ui/Shell";    // ← add this import

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LifeHack Collab",
  description: "Your IDE for remote hackathon collaboration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <Shell>{children}</Shell>   {/* Now Shell is defined */}
        </Provider>
      </body>
    </html>
  );
}
