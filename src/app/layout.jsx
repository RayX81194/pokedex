import { Kumbh_Sans } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import SmoothScrolling from "./components/SmoothScrolling/SmoothScrolling";
import BackToTopButton from "./components/BackToTop/BackToTop";
import { SpeedInsights } from "@vercel/speed-insights/next"

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "PokeDex - Home",
  description: "PokeDex is a modern web app built with Next.js, offering detailed insights into Pokémon, including stats, evolutions, abilities, and more, all presented in a visually appealing format.",
};

export default function RootLayout({ children }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the scroll smooth
    });
  };

  return (
    <html lang="en">  
      <body className={`${kumbh.className} overflow-x-hidden bg-[#F6F8FC]`}>
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
        <Navbar />
        {children}
        <SpeedInsights />
        <BackToTopButton />
        </SmoothScrolling>
      </body>
    </html>
  );
}
