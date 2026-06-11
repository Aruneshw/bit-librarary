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

import MatrixBackground from "@/components/animations/MatrixBackground";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import PresenceProvider from "@/components/providers/PresenceProvider";
import StudyTrackerProvider from "@/components/providers/StudyTrackerProvider";
import PwaRegister from "@/components/providers/PwaRegister";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="h-full antialiased notranslate">
      <body className="min-h-full flex flex-col notranslate">
        <PwaRegister />
        <PostHogProvider>
          <PresenceProvider />
          <StudyTrackerProvider />
          <MatrixBackground />
          <div className="app-container flex-1 flex flex-col">
            {children}
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
