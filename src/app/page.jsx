import Image from "next/image";
import PokeNCard from "./components/SearchandCard/PokeNCard"
import { Suspense } from "react";



export default function Home() {
  return (
    <>
      <section className=" flex flex-col items-center justify-center">
      <div className="big-logo text-center">
        <Image src="big-logo.svg" width={400} height={200} alt="PokeDex Big Logo" className="w-64 sm:w-80 md:w-96 lg:w-400"></Image>
      </div>
      <Suspense>
      <PokeNCard />
      </Suspense>
      </section>
    </>
  );
}
