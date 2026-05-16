import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "InfiniteCipher builds websites, web applications, and mobile apps — full-spectrum digital product development for businesses that want to grow online.",
  openGraph: {
    title: "Services | InfiniteCipher",
    description:
      "From your first website to complex cross-platform applications — we cover the full spectrum of digital product development.",
    url: "https://infinitecipher.com/services",
  },
  alternates: { canonical: "https://infinitecipher.com/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
