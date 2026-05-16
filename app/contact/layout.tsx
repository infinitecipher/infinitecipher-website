import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with InfiniteCipher. Whether you have a clear brief or just an idea, we're here to help you figure out the best path forward.",
  openGraph: {
    title: "Contact | InfiniteCipher",
    description: "Start a conversation with InfiniteCipher — we respond within 24 hours.",
    url: "https://infinitecipher.com/contact",
  },
  alternates: { canonical: "https://infinitecipher.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
