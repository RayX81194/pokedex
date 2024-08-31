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
            <h1 className='px-3 py-1 font-semibold bg-green-500 text-black rounded-full text-[11px]'>Grass</h1>
            <h1 className='px-3 py-1 font-semibold bg-purple-600 text-black rounded-full text-[11px]'>Poison</h1>     
          </div>
          <p className="max-w-[400px] mt-3">{pokeDesc.flavor_text_entries[1]?.flavor_text}</p>
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
          <div className="flex mt-4 mb-10 gap-x-5">
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
