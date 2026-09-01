import type { Metadata } from "next";
import WivosoftSite from "../WivosoftSite";

const title = "Wivosoft — Software Modernization Demo";
const description =
  "An interactive Wivosoft demonstration of safe software modernization, migration and verification.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/demo" },
  openGraph: {
    type: "website",
    url: "/demo",
    siteName: "Wivosoft",
    title,
    description,
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
  },
};

export default function DemoPage() {
  return <WivosoftSite />;
}
