import { inter, plusJakartaSans } from "./ui/assets/fonts";
import type { Metadata } from "next";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mortage Calculator.",
  description: "Mortage calculator app developed by Daniel Chavez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} bg-slate-100 text-slate-900`}>{children}</body>
    </html>
  );
}
