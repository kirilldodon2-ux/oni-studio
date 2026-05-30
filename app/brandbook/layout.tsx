import type { CSSProperties, ReactNode } from "react";
import { JetBrains_Mono, Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-brandbook-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "700"],
  variable: "--font-brandbook-mono",
  display: "swap",
});

export const metadata = {
  title: "Brandbook — ONI Studio",
  description:
    "Interactive ONI Brandbook — identity, logo, colors, typography, and links.",
};

const brandbookFontVars = {
  "--font-display": `var(--font-brandbook-display), sans-serif`,
  "--font-mono": `var(--font-brandbook-mono), monospace`,
} as CSSProperties;

export default function BrandbookLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${outfit.variable} ${jetbrainsMono.variable} brandbook-root h-full`}
      style={brandbookFontVars}
    >
      {children}
    </div>
  );
}
