import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Geist_Mono, Onest } from "next/font/google";
import { DEFAULT_SCHEME, SCHEME_SCRIPT } from "@repo/ui/schemes";
import "./globals.css";

const display = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
});

const sans = Onest({
  variable: "--font-onest",
  subsets: ["latin", "latin-ext"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Family App",
  description: "Our family organizer",
  appleWebApp: { capable: true, title: "Family", statusBarStyle: "black-translucent" },
  icons: { apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0c1012",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_SCHEME}
      suppressHydrationWarning
      className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Applies the saved color scheme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: SCHEME_SCRIPT }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
