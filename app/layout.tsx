import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoidContextProvider from "./recoilContextProvider";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Primastat",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
   <html lang="en">
   <head>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className={inter.className}>
          <RecoidContextProvider>{children}</RecoidContextProvider>      
        </body>
      </html>
    </SessionWrapper>
  );
}
