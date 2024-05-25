import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

const ubuntu = Ubuntu({ weight: "400", subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"] });
const title = Ubuntu({ weight: "500", subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Magzhan.kz",
  description: "Latest news in Magzhan.kz only",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Suspense >
          <Header />{children}<Footer /></Suspense></body>
    </html>
  );
}
