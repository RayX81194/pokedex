"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PokeCard({ searchQuery }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50`);
      let data = await res.json();

      // Fetch additional details for each Pokémon
      const detailedPosts = await Promise.all(
        data.results.map(async (pokemon) => {
          // Fetch Pokémon details (including sprites)
          const pokemonRes = await fetch(pokemon.url);
          const pokemonData = await pokemonRes.json();

          // Fetch Pokémon species details (including descriptions)
          const speciesRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`
          );
          const speciesData = await speciesRes.json();

          // Find the English description
          const englishDescription = speciesData.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            .flavor_text.replace(/[\n\r\f]/g, " ") // Replace newlines, carriage returns, and form feeds with spaces
            .replace(/\s+/g, " ") // Replace multiple spaces with a single space
            .trim(); // Trim any leading or trailing spaces

          return {
            ...pokemonData,
            description: englishDescription,
          };
        })
      );

      setPosts(detailedPosts);
    }
    fetchPosts();
  }, []);

  if (!posts)
    return (
      <div className="mt-20">
        <Image src="/loader.svg" width={50} height={50} alt="Loading" />
      </div>
    );

  const typeColors = {
    grass: "bg-green-500",
    poison: "bg-purple-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    bug: "bg-green-700",
    normal: "bg-gray-400",
    electric: "bg-yellow-500",
    ground: "bg-yellow-700",
    fairy: "bg-pink-400",
    fighting: "bg-red-700",
    psychic: "bg-pink-500",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    ice: "bg-blue-300",
    dragon: "bg-indigo-800",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    flying: "bg-blue-200",
  };

  const filteredPosts = posts.filter((poke) =>
    poke.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid my-10 sm:mx-20 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10">
      {filteredPosts.map((poke) => (
        <div
          key={poke.id}
          className="bg-white hover:shadow-xl transition-all hover:scale-105 active:scale-95 shadow-md rounded-xl max-w-[370px] p-4 flex flex-col justify-between"
        >
          <div className="poke-info flex justify-between">
            <div className="flex gap-x-2">
              {poke.types.map((typeInfo) => (
                <h1
                  key={typeInfo.type.name}
                  className={`px-3 py-1 font-semibold text-black rounded-full text-[11px] ${
                    typeColors[typeInfo.type.name] || "bg-gray-300"
                  }`}
                >
                  {typeInfo.type.name.charAt(0).toUpperCase() +
                    typeInfo.type.name.slice(1)}
                </h1>
              ))}
            </div>
            <p className="text-black font-bold">#{poke.id}</p>
          </div>
          <div className="poke-image gap-x-3 flex justify-between">
            <div className="flex flex-col gap-y-1 items-start justify-between">
              <h1 className="font-bold text-black mt-1 text-3xl">
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
              </h1>
              <p className="font-medium text-black text-[14px] max-w-[400px]">
                {poke.description.charAt(0).toUpperCase() +
                  poke.description.slice(1).toLowerCase()}
              </p>
              <Link href={`/pokemon/${poke.id}/details`}>
                <button className="bg-gray-200 hover:bg-gray-300 transition-all text-black font-bold py-2 px-4 text-[12px] mt-1 rounded-md">
                  Know More
                </button>
              </Link>
            </div>
            <div className="flex items-end justify-end">
              <Image
                src={
                  poke.sprites.versions["generation-v"]["black-white"]
                    .animated.front_default
                }
                width={150}
                height={150}
                alt={poke.name}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
