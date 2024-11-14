import { TopBar } from "@/components/home/topbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/home/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const interRegular = localFont({
  src: "./fonts/inter-Regular.woff2",
  variable: "--font-inter-regular",
  weight: "400",
});

const offBitDotBold = localFont({
  src: "./fonts/OffBit-DotBold.woff2",
  variable: "--font-dots",
  weight: "900",
});

export const metadata: Metadata = {
  title: "Home | Apppify",
  description: "Turn API to APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${interRegular.variable} ${offBitDotBold.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
