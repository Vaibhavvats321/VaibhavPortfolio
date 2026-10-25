import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";

import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/context/ThemeContext";

import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.fullName,
  authors: [{ name: siteConfig.fullName }],
  creator: siteConfig.fullName,
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080a12" },
    { media: "(prefers-color-scheme: light)", color: "#f4f5fa" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${sans.variable} ${inter.variable} ${spaceGrotesk.variable} ${mono.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-[rgb(var(--bg))] font-sans text-[rgb(var(--text))] antialiased transition-colors duration-500">
        <ThemeProvider>
          <noscript>
            <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
          </noscript>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
