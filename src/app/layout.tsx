// builtin

// external
import type { Metadata } from "next";
import { Caveat, Nothing_You_Could_Do } from "next/font/google";

// internal
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"]
})

const nothingYouCouldDo = Nothing_You_Could_Do({
  variable: "--font-nothing-you-could-do",
  weight: "400",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Alan Liu",
  description: "Hi y'all! Welcome to my solo exposition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${caveat.variable} ${nothingYouCouldDo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
