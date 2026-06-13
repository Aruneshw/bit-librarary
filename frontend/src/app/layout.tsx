import type { Metadata } from "next";
import "./globals.css";
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: "BIT LIBRARY — Academic Nexus",
  description: "Elite AI-powered knowledge system for BIT Sathy students. Access your academic subjects, track progress, and achieve mastery.",
  keywords: "BIT Sathy, academic, study, BIT Library, knowledge system",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BIT LIBRARY",
  },
  other: {
    'google': 'notranslate',
  },
};

import ClientProviders from "@/components/providers/ClientProviders";
import PwaRegister from "@/components/providers/PwaRegister";
import GoogleTranslatePatch from "@/components/providers/GoogleTranslatePatch";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="h-full antialiased notranslate">
      <body className="min-h-full flex flex-col notranslate">
        <GoogleTranslatePatch />
        <PwaRegister />
        <ClientProviders>
          <div className="app-container flex-1 flex flex-col">
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
