import type { Metadata } from "next";
import { Footer, Header } from "@/components/Header";
import { LatestBanner } from "@/components/LatestBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://betterllms.com"),
  title: {
    default: "BetterLLMs - Pick the right AI model",
    template: "%s | BetterLLMs",
  },
  description:
    "Choose the best AI model for your task, see simple cost differences, and know when switching is worth it.",
  openGraph: {
    siteName: "BetterLLMs",
    type: "website",
    title: "BetterLLMs - Pick the right AI model",
    description: "Compare LLMs, estimate API costs, and choose a model for your task.",
  },
  twitter: {
    card: "summary",
    title: "BetterLLMs - Pick the right AI model",
    description: "Compare LLMs, estimate API costs, and choose a model for your task.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=overused-grotesk@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Pixelify+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-sans">
        <LatestBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
