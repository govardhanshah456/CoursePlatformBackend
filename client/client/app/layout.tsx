'use client';
import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google"
import { THemeProvider } from "./Components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins"
})

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin"
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} !bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers> <THemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</THemeProvider>
          <Toaster position="top-center" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
