'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function PokeEvol() {
  const [pokeEvol, setPokeEvol] = useState(null);
  const [error, setError] = useState(null); // Add error state
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    async function fetchPokemonSpecies() {
      try {
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        const speciesData = await speciesRes.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        const evolutionRes = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionRes.json();
        setPokeEvol(evolutionData);
      } catch (error) {
        console.error("Error fetching the Pokémon evolution chain:", error);
        setError(error); // Set error state
      }
    }

    fetchPokemonSpecies();
  }, [id]);

  const renderEvolutions = (chain) => {
    const evolutions = [];
    const renderChain = (currentChain) => {
      if (!currentChain) return;

      const name = currentChain.species.name;
      const pokeId = currentChain.species.url.split('/').slice(-2, -1)[0]; // Extract Pokémon ID from species URL
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;

      evolutions.push(
        <div key={name} className="flex w-full flex-col items-center">
          <Image src={imageUrl} width={200} height={200} alt={name} />
          <p className="font-semibold text-2xl">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </p>
        </div>
      );

      // Recursively render each evolution in the current chain
      currentChain.evolves_to.forEach(nextEvolution => renderChain(nextEvolution));
    };

    renderChain(chain);
    return evolutions;
  };

  if (error) {
    return (
      <section className="w-[76rem] h-[10rem] my-1 flex items-center justify-center">
        <p>Error fetching evolutions: {error.message}</p>
      </section>
    );
  }

  if (!pokeEvol) {
    return (
      <section className="w-[76rem] h-[10rem] my-1 flex items-center justify-center">
        <Image src="/loader.svg" alt="Loader" width={50} height={50} />
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="font-bold text-[40px] tracking-wide">Evolutions</h2>
      <div className="poke-evols grid grid-cols-1 md:flex gap-10">
        {renderEvolutions(pokeEvol.chain)}
      </div>
    </section>
  );
}