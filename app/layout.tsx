import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import LenisScrollInit from "./components/LenisScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayuba.vyuba.studio"),
  title: { default: "Ayuba Alexander", template: "%s | My Site" },
  description: "Engineering Meets Design",
  alternates: {
    canonical: "https://ayuba.vyuba.studio",
    languages: {
      "en-US": "https://ayuba.vyuba.studio/en-US",
    },
  },
  openGraph: {
    title: "Ayuba Alexander",
    description: "Engineering Meets Design",
    url: "https://ayuba.vyuba.studio",
    siteName: "Ayuba Alexander",
    // images: [{ url: "https://ayuba.vyuba.studio/og.png" }],
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
        className={`${geistSans.variable}  ${geistMono.variable} ${interTight.variable} antialiased bg-[#FBFBFB]`}
      >
        <LenisScrollInit>{children}</LenisScrollInit>
        {/*{children}*/}
      </body>
    </html>
  );
}
