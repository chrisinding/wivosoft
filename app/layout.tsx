import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Wivosoft | Software modernization, migration and verification";
const description =
  "Wivosoft modernizes, migrates and validates business-critical software systems without throwing away what already works.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "wivosoft.dk";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    title,
    description,
    applicationName: "Wivosoft",
    keywords: [
      "software modernization",
      "software migration",
      "data migration",
      "test automation",
      ".NET",
      "Java",
      "quality engineering",
    ],
    authors: [{ name: "Wivosoft" }],
    alternates: { canonical: `${origin}/` },
    icons: {
      icon: "/wivosoft-logo.png",
      shortcut: "/wivosoft-logo.png",
    },
    openGraph: {
      type: "website",
      url: `${origin}/`,
      siteName: "Wivosoft",
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1731,
          height: 909,
          alt: "Wivosoft — Modernizing software without breaking what already works.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070a0b",
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
