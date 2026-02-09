import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import LenisScrollInit from "./components/LenisScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vyuba.work"),
  title: { default: "vyuba", template: "%s | My Site" },
  description: "Engineering Meets Design",
  alternates: {
    canonical: "https://vyuba.work",
    languages: {
      "en-US": "https://vyuba.work/en-US",
    },
  },
  openGraph: {
    title: "vyuba",
    description: "Engineering Meets Design",
    url: "https://vyuba.work",
    siteName: "vyuba",
    // images: [{ url: "https://vyuba.work/og.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisScrollInit>{children}</LenisScrollInit>
      </body>
    </html>
  );
}
