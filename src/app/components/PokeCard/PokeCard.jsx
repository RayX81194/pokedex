"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PokeCard() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1`);
      let data = await res.json();

      // Fetch additional details for each Pokémon
      const detailedPosts = await Promise.all(
        data.results.map(async (pokemon) => {
          // Fetch Pokémon details (including sprites)
          const pokemonRes = await fetch(pokemon.url);
          const pokemonData = await pokemonRes.json();

          // Fetch Pokémon species details (including descriptions)
          const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`);
          const speciesData = await speciesRes.json();

          // Find the English description
          const englishDescription = speciesData.flavor_text_entries
            .find(entry => entry.language.name === 'en')
            .flavor_text.replace(/[\n\r\f]/g, ' ') // Replace newlines, carriage returns, and form feeds with spaces
            .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
            .trim(); // Trim any leading or trailing spaces

          return {
            ...pokemonData,
            description: englishDescription
          };
        })
      );

      setPosts(detailedPosts);
      console.log(detailedPosts);
    }
    fetchPosts();
  }, []);

  if (!posts)
    return (
      <div className="mt-20">
        <Image src="/loader.svg" width={50} height={50} alt="Loading" />
      </div>
    );

  return (
    <div className="grid my-10 sm:mx-20 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10">
      {posts.map((poke) => {
        return (
          <div
            key={poke.id}
            className="bg-white hover:shadow-xl transition-all hover:scale-105 active:scale-95 shadow-md rounded-xl max-w-[370px] p-4 flex flex-col justify-between"
          >
            <div className="poke-info flex justify-between">
              <div className="flex gap-x-2">
                {poke.types.map((typeInfo) => (
                  <h1
                    key={typeInfo.type.name}
                    className={`px-3 py-1 font-semibold bg-gray-300 text-black rounded-full text-[11px] ${typeInfo.type.name}`}
                  >
                    {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                  </h1>
                ))}
              </div>
              <p className="text-black font-bold">#{poke.id}</p>
            </div>
            <div className="poke-image gap-x-3 flex justify-between">
              <div className="flex flex-col gap-y-1 items-start justify-between">
                <h1 className="font-bold text-black mt-1 text-3xl">{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h1>
                <p className="font-medium text-black text-[14px] max-w-[400px]">
                  {poke.description.charAt(0).toUpperCase() + poke.description.slice(1).toLowerCase()}
                </p>
                <Link href={`/pokemon/${poke.id}/details`}>
                  <button className="bg-gray-200 hover:bg-gray-300 transition-all text-black font-bold py-2 px-4 text-[12px] mt-1 rounded-md">
                    Know More
                  </button>
                </Link>
              </div>
              <div className="flex items-end justify-end">
                <Image
                  src={poke.sprites.versions['generation-v']['black-white'].animated.front_default}
                  width={150}
                  height={150}
                  alt="Pokemon Image"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
