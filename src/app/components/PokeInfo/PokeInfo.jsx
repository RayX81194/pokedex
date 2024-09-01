'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PokeInfo() {
    const [poke, setPoke] = useState(null);
    const [pokeDesc, setPokeDesc] = useState(null);
    const params = useParams();
    const id = params.id;
  
    useEffect(() => {
      async function fetchPokemon() {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await res.json();
          setPoke(data);
        } catch (error) {
          console.error("Error fetching the Pokémon:", error);
        }
      }
      fetchPokemon();
    }, [id]);

    useEffect(() => {
      async function fetchPokemonDesc() {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
          const data = await res.json();
          setPokeDesc(data);
        } catch (error) {
          console.error("Error fetching the Pokémon:", error);
        }
      }
      fetchPokemonDesc();
    }, [id]);

    if (!poke || !pokeDesc) {
        return (
          <section className="bg-white w-[76rem] h-[38rem] my-10 shadow-2xl rounded-lg flex items-center justify-center">
          <Image src="/loader.svg" width={50} height={50}></Image>
          </section>
        )
    }

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
      <section className="bg-white shadow-2xl rounded-lg flex flex-col xl:flex-row items-start">
        <div className="poke-image px-20 py-10">
          <Image 
            src={poke.sprites.other.home.front_default} 
            width={500} 
            height={500} 
            unoptimized 
            alt={poke.name} 
          />
        </div>        
        <div className="poke-info mt-10 flex flex-col items-start">
          <h2 className="font-bold">#{poke.id.toString().padStart(3, '0')}</h2>
          <h2 className="font-bold text-[40px] tracking-wide">{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h2>
          <div className='flex mt-1 gap-x-2'>
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
          <p className="max-w-[400px] mt-3">{pokeDesc.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            .flavor_text.replace(/[\n\r\f]/g, " ") // Replace newlines, carriage returns, and form feeds with spaces
            .replace(/\s+/g, " ") // Replace multiple spaces with a single space
            .trim()}</p>
          <div className="flex mt-4 gap-x-5">
            <div className="flex rounded-md items-center justify-between bg-[#F6F8FC] w-[220px] px-3 py-2">
              <h2 className="font-bold">Height</h2>
              <h2>{poke.height}m</h2>
            </div>
            <div className="flex rounded-md items-center justify-between bg-[#F6F8FC] w-[220px] px-3 py-2">
              <h2 className="font-bold">Weight</h2>
              <h2>{poke.weight}Kg</h2>
            </div>
          </div>
          <h2 className="font-bold text-xl mt-3">Stats</h2>
          <div className="grid grid-cols-2 gap-y-3 mt-4 gap-x-5">
            {poke.stats.map((stat, index) => (
              <div key={index} className="flex rounded-md items-center justify-between bg-[#F6F8FC] w-[220px] px-3 py-2">
                <h2 className="font-bold">{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}</h2>
                <h2>{stat.base_stat}</h2>
              </div>
            ))}
          </div>
          <h2 className="font-bold mt-4 text-xl">Abilities</h2>
          <div className="grid grid-cols-2 gap-y-3 mt-4 mb-10 gap-x-5">
            {poke.abilities.map((ability, index) => (
              <div key={index} className="flex rounded-md items-center justify-start bg-[#F6F8FC] w-[220px] px-3 py-2">
                <h2 className="font-bold">{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
