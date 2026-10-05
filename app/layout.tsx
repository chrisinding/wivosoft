import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./consulting.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wivosoft.dk"),
  applicationName: "Wivosoft",
  keywords: [
    "software consulting",
    "software development",
    "software testing",
    "software modernization",
    "software migration",
    "test automation",
    ".NET",
    "Java",
    "Python",
    "quality engineering",
  ],
  authors: [{ name: "Wivosoft" }],
  icons: {
    icon: [
      {
        url: "/wivosoft-favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        url: "/wivosoft-icon-v2.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: "/wivosoft-favicon.svg",
    apple: "/wivosoft-icon-v2.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#1e575e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
