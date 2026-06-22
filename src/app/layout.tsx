import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "../styles/globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pingo API",
  description: "Pingo API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${outfit.className} min-h-full`}>
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
