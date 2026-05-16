import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const siteUrl = "https://infinitecipher.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "InfiniteCipher — Web & Mobile Development Studio",
    template: "%s | InfiniteCipher",
  },
  description:
    "InfiniteCipher is a web and mobile development studio helping businesses launch websites, web applications, and mobile apps that perform.",
  openGraph: {
    type: "website",
    siteName: "InfiniteCipher",
    title: "InfiniteCipher — Web & Mobile Development Studio",
    description:
      "Web and mobile development studio helping businesses build digital products that perform.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "InfiniteCipher — Web & Mobile Development Studio",
    description:
      "Web and mobile development studio helping businesses build digital products that perform.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InfiniteCipher",
  url: siteUrl,
  email: "hello@infinitecipher.com",
  description:
    "Web and mobile development studio helping businesses launch websites, web applications, and mobile apps that perform.",
  serviceType: ["Web Development", "Mobile App Development", "Web Application Development"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ic-void text-ic-chalk antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
