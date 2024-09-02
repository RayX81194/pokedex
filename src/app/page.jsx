import Image from "next/image";
import PokeNCard from "./components/PokeNewCard/PokeNCard"
import { Suspense } from "react";



export default function Home() {
  return (
    <>
      <section className="mt-16 flex flex-col items-center justify-center">
      <div className="big-logo">
        <Image src="big-logo.svg" width={400} height={200} className="w-64 sm:w-80 md:w-96 lg:w-400"></Image>
      </div>
      <Suspense>
      <PokeNCard />
      </Suspense>
      </section>
    </>
  );
}
