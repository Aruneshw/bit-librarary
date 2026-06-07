import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BIT LIBRARY — Academic Nexus",
  description: "Elite AI-powered knowledge system for BIT Sathy students. Access your academic subjects, track progress, and achieve mastery.",
  keywords: "BIT Sathy, academic, study, BIT Library, knowledge system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="app-container flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
