import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GroceryListProvider } from "@/context/GroceryListContext";
import { MacroGoalsProvider } from "@/context/MacroGoalsContext";

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
  title: "MacroPlanner",
  description: "AI Meal Planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MacroGoalsProvider>
          <GroceryListProvider>
            {children}
          </GroceryListProvider>
        </MacroGoalsProvider>     
      </body>
    </html>
  );
}
