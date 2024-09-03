'use client';
import { Kumbh_Sans } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import SmoothScrolling from "./components/SmoothScrolling/SmoothScrolling";
import BackToTopButton from "./components/BackToTop/BackToTop";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { useState } from 'react'; // Import useState here

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <html lang="en">
      <body className={`${kumbh.className} overflow-x-hidden ${theme ? 'bg-[#DD092F]' : 'bg-[#F6F8FC]'}`}>
        <SmoothScrolling>
          <div className="bg-images overflow-hidden">
            <div className="absolute -z-10 -top-12 -left-24">
              <Image src="/pokeball.svg" width={350} height={350} className="w-64 sm:w-80 md:w-96 lg:w-400" alt="Pokeball" />
            </div>
            <div className="absolute -z-10 -top-48 right-80">
              <Image src="/pokeball.svg" width={350} height={350} alt="Pokeball" />
            </div>
            <div className="absolute -z-10 top-60 -right-40">
              <Image src="/pokeball.svg" width={350} height={350} className="w-64 sm:w-80 md:w-96 lg:w-400" alt="Pokeball" />
            </div>
          </div>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          {children}
          <SpeedInsights />
          <BackToTopButton />
        </SmoothScrolling>
      </body>
    </html>
  );
}
