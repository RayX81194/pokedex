"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const LIMIT = 30; // Number of Pokémon to fetch per request

export default function PokeCard({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [nextUrl, setNextUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (url) => {
    try {
      let res = await fetch(url);
      let data = await res.json();
      const detailedPosts = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonRes = await fetch(pokemon.url);
          const pokemonData = await pokemonRes.json();
          const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`);
          const speciesData = await speciesRes.json();
          const englishDescription = speciesData.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            ?.flavor_text.replace(/[\n\r\f]/g, " ")
            .replace(/\s+/g, " ")
            .trim();

          return {
            ...pokemonData,
            description: englishDescription || "No description available.",
          };
        })
      );
      setPosts((prev) => [...prev, ...detailedPosts]);
      setNextUrl(data.next); // Set URL for the next page
      if (!data.next) setHasMore(false); // No more data to fetch
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
    }
  };

  useEffect(() => {
    fetchPosts(nextUrl);
  }, [nextUrl]);

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
              {poke.sprites?.versions?.["generation-v"]?.["black-white"]?.animated
                ?.front_default ? (
                <Image
                  src={
                    poke.sprites.versions["generation-v"]["black-white"]
                      .animated.front_default
                  }
                  width={150}
                  height={150}
                  alt={poke.name}
                />
              ) : (
                <p className="text-gray-400">Image not available</p>
              )}
            </div>
          </div>
        </div>
      ))}
      {hasMore && (
        <button
          onClick={() => fetchPosts(nextUrl)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Load More
        </button>
      )}
    </div>
  );
}
