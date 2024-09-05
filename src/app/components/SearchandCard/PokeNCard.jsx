'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PokeNCard() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPokemonData() {
      let data;
      let detailedPosts;
      try {
        data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=905&offset=0');
        const result = await data.json();
        detailedPosts = await Promise.all(
          result.results.map(async (post) => {
            let details, species;
            try {
              let detailData = await fetch(post.url);
              details = await detailData.json();
              let speciesData = await fetch(details.species.url);
              species = await speciesData.json();
            } catch (error) {
              console.error("Failed to fetch details for a Pokémon:", error);
              return null; // Skip this Pokémon if there's an error
            }

            return {
              id: details.id,
              name: details.name,
              image: details.sprites.other['official-artwork'].front_default,
              types: details.types.map((typeInfo) => typeInfo.type.name),
              description: species.flavor_text_entries
                .find((entry) => entry.language.name === "en")
                ?.flavor_text.replace(/[\n\r\f]/g, " ")
                .replace(/\s+/g, " ")
                .trim() || "Description not available",
            };
          })
        );
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
        return <div>Error loading data</div>;
      }

      // Filter out any null results in case of fetch errors
      setPosts(detailedPosts.filter((poke) => poke !== null));
    }

    fetchPokemonData();
  }, []);

  // Filter Pokémon based on the search query
  const filteredPosts = posts.filter(poke =>
    poke.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="my-10 sm:mx-20">
      {/* Search Bar */}
      <div className="flex bg-white w-[20rem] mb-10 sm:w-[30rem] md:w-[40rem] lg:w-[50rem] gap-x-3 font-medium outline-none h-[4rem] mx-auto shadow-md placeholder-gray-500 px-5 rounded-[100px]">
      <Image src="search.svg" width={25} height={10} alt="Search Icon" />
        <input
          type="text"
          placeholder="Search Pokémon eg, Pikachu..."
              className="bg-transparent outline-none w-[20rem] sm:w-[30rem] md:w-[40rem] lg:w-[50rem]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Pokémon Grid */}
      <div className="flex mb-10 items-center justify-center flex-wrap gap-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((poke) => (
            <div
              key={poke.id}
              className="bg-white transition-all border border-gray-300 shadow-md rounded-xl max-w-[370px] p-4 flex flex-col justify-between"
            >
              <div className="poke-info flex justify-between">
                <div className="flex gap-x-2">
                  {poke.types.map((type) => (
                    <h1
                      key={type}
                      className={`px-3 py-1 font-medium text-white rounded-full text-[11px] ${
                        typeColors[type] || "bg-gray-300"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </h1>
                  ))}
                </div>
                <p className="text-black font-bold">#{poke.id.toString().padStart(3, '0')}</p>
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
                    <button className="bg-gray-200 hover:bg-gray-300 active:bg-gray-200 active:scale-95 transition-all text-black font-bold py-2 px-4 text-[12px] mt-1 rounded-md">
                      Know More
                    </button>
                  </Link>
                </div>
                <div className="flex items-end justify-end">
                  {poke.image ? (
                    <Image
                      src={poke.image}
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
          ))
        ) : (<div className="ml-20 mt-20">
            <Image src="/loader2.gif" width={200} height={200} alt="Loader" unoptimized></Image>
        </div>
        )}
      </div>
    </div>
  );
}
