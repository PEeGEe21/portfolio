import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Udeh Praise C. — Full-Stack Software Engineer",
    template: "%s · Praise",
  },
  description:
    "Portfolio of Udeh Praise C., a full-stack software engineer building dependable products across frontend, backend, and infrastructure.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Udeh Praise C. — Full-Stack Software Engineer",
    description: "Full-stack software engineer building dependable products across frontend, backend, and infrastructure.",
    siteName: "Udeh Praise C.",
    images: [{ url: "/opengraph-image", alt: "Udeh Praise C. — Full-Stack Software Engineer" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[60] -translate-y-24 rounded-md bg-accent px-4 py-2 font-semibold text-accent-foreground transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
