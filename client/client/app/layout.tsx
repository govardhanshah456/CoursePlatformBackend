'use client';
import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google"
import { ThemeProvider } from "./Components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import React from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./Components/Loader";
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
      <body className={`${poppins.variable} ${josefin.variable} bg-no-repeat !bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers><ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Custom>{children}</Custom></ThemeProvider>
          <Toaster position="top-center" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({})
  console.log(isLoading)
  return (
    <>
      {
        isLoading ? <Loader /> : <>{children}</>
      }
    </>
  )
}