import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "@vivekkv178/library/dist/style.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import StoreProvider from "@/lib/StoreProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My-Files",
  description:
    "Transform your file management with My-Files – the ultimate solution for seamless file uploads, processing, and dynamic search.",
  metadataBase: new URL(
    `${process.env.NEXT_PUBLIC_CDN_PATH}/files/Thumbnail.png`,
  ),
  openGraph: {
    title: "My-Files",
    description:
      "Transform your file management with My-Files – the ultimate solution for seamless file uploads, processing, and dynamic search.",
    url: "https://my-files-vivekkv.vercel.app/",
    siteName: "My-Files",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CDN_PATH}/files/Thumbnail.png`, // Must be an absolute URL
        width: 800,
        height: 1000,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_PATH}/files/Thumbnail.png`, // Must be an absolute URL
        width: 1800,
        height: 2000,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
