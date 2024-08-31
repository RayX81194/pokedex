'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function PokeEvol() {
  const [pokeEvol, setPokeEvol] = useState(null);
  const params = useParams();
  const id = params.id;
  
  useEffect(() => {
    async function fetchPokemonSpecies() {
      try {
        // Fetch Pokémon species data to get the evolution chain URL
        let speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        let speciesData = await speciesRes.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        // Fetch the evolution chain data
        let evolutionRes = await fetch(evolutionChainUrl);
        let evolutionData = await evolutionRes.json();
        setPokeEvol(evolutionData);
        console.log(evolutionData);
      } catch (error) {
        console.error("Error fetching the Pokémon evolution chain:", error);
      }
    }
    fetchPokemonSpecies();
  }, [id]);

  const renderEvolutions = (chain) => {
    const evolutions = [];
    let currentChain = chain;

    while (currentChain) {
      const name = currentChain.species.name;
      const pokeId = currentChain.species.url.split('/').slice(-2, -1)[0]; // Extract Pokémon ID from species URL
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;

      evolutions.push(
        <div key={name} className="flex flex-col items-center">
          <Image src={imageUrl} width={100} height={100} alt={name} />
          <p className="font-semibold text-lg">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </p>
        </div>
      );
      currentChain = currentChain.evolves_to[0]; // Move to the next evolution stage
    }

    return evolutions;
  };

  if (!pokeEvol) return <div>Loading...</div>;

  return (
    <section className="mt-10">
      <h2 className="font-bold text-[40px] tracking-wide">Evolutions</h2>
      <div className="poke-evols flex gap-10">
        {renderEvolutions(pokeEvol.chain)}
      </div>
    </section>
  );
}
