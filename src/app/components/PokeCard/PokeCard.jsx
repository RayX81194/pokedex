'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PokeCard() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
      let data = await res.json();

      // Fetch additional details for each Pokémon
      const detailedPosts = await Promise.all(
        data.results.map(async (pokemon, index) => {
          // Fetch Pokémon details (including sprites)
          const pokemonRes = await fetch(pokemon.url);
          const pokemonData = await pokemonRes.json();

          // Fetch Pokémon species details (including descriptions)
          const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index + 1}/`);
          const speciesData = await speciesRes.json();

          // Find the English description
          const englishDescription = speciesData.flavor_text_entries[28].flavor_text;

          return {
            ...pokemon,
            sprites: pokemonData.sprites,
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
      {posts.map((poke, index) => {
        return (
          <div
            key={index + 1}
            className="bg-white hover:shadow-xl transition-all hover:scale-105 shadow-md rounded-xl max-w-[370px] p-4 flex flex-col justify-between"
          >
            <div className="poke-info flex justify-between">
              <div className="flex gap-x-2">
                <h1 className="px-3 py-1 font-semibold bg-green-500 text-black rounded-full text-[11px]">Grass</h1>
                <h1 className="px-3 py-1 font-semibold bg-purple-600 text-black rounded-full text-[11px]">Poison</h1>
              </div>
              <p className="text-black font-bold">#{index + 1}</p>
            </div>
            <div className="poke-image gap-x-3 flex justify-between">
              <div className="flex flex-col gap-y-1 items-start justify-between">
                <h1 className="font-bold text-black mt-1 text-3xl">{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h1>
                <p className="font-medium text-black text-[14px] max-w-[400px]">
                  {poke.description}
                </p>
                <Link href={`/pokemon/${index + 1}`}>
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
