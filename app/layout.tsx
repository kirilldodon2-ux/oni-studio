import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";
import { SITE_ORIGIN, SITE_PREVIEW, SITE_TITLE, SITE_DESCRIPTION } from "@/content/site";
import "./globals.css";
import { LocaleProvider } from "@/systems/i18n/LocaleProvider";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const cascadia = localFont({
  src: [
    { path: "./fonts/CascadiaCodePL-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/CascadiaCodePL-SemiBold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-cascadia",
  display: "swap",
});

const bounded = localFont({
  src: "./fonts/Bounded-Variable.ttf",
  weight: "200 900",
  style: "normal",
  variable: "--font-bounded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "ONI Studio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_PREVIEW],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_PREVIEW],
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
        className={`${bebasNeue.variable} ${cascadia.variable} ${bounded.variable} font-sans antialiased`}
      >
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
