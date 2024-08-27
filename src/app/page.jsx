'use client'
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {

  const [pokemon,setPokemon] = useState("");

  const handleEvent = (e) => {
    e.preventDefault();
    setPokemon(e.target.value)
  }

  return (
    <>
      <section className="mt-16 flex flex-col items-center justify-center">
      <div className="big-logo">
        <Image src="big-logo.svg" width={400} height={200}></Image>
      </div>
      <form className="flex mt-10 gap-x-3" onSubmit={(e) => e.preventDefault()}>
        <input value={pokemon} onChange={handleEvent} className="bg-white w-[50rem] h-[4rem] mx-auto shadow-md placeholder-gray-500 px-5 rounded-[100px]" placeholder="search eg, pikachu or ditto..." type="text"></input>
        <button className="bg-red-500 px-5 flex items-center justify-center shadow-md mx-auto rounded-[100px]" type="submit">
          <Image src="search.svg" width={25} height={10}></Image>
        </button>
      </form>
      </section>
    </>
  );
}
