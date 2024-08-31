'use client'
import Image from "next/image";
import { useState } from "react";


export default function PokeSearch() {

  const [pokemon,setPokemon] = useState("");

  const handleEvent = (e) => {
    e.preventDefault();
    setPokemon(e.target.value)
  }

  return (
      <form className="flex px-3 sm:flex-row mt-10 gap-x-3 gap-y-3 sm:gap-y-0" onSubmit={(e) => e.preventDefault()}>
  <input
    value={pokemon}
    onChange={handleEvent}
    className="bg-white w-[20rem] sm:w-[30rem] md:w-[40rem] lg:w-[50rem] font-medium focus:ring-2 transition-all focus:shadow-xl ring-red-600 outline-none h-[4rem] mx-auto shadow-md placeholder-gray-500 px-5 rounded-[100px]"
    placeholder="Search eg, Pikachu or Ditto..."
    type="text"
  />
  <button className="bg-red-500 px-5 flex items-center justify-center shadow-md mx-auto rounded-[100px]" type="submit">
    <Image src="search.svg" width={25} height={10} />
  </button>
</form>
  );
}
