import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A curated portfolio of websites, web applications, and mobile apps built by InfiniteCipher — spanning e-commerce, healthtech, SaaS, and more.",
  openGraph: {
    title: "Work | InfiniteCipher",
    description:
      "A selection of projects that showcase our range across web, mobile, and digital experiences.",
    url: "https://infinitecipher.com/work",
  },
  alternates: { canonical: "https://infinitecipher.com/work" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
