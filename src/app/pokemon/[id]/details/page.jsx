import PokeInfo from "@/app/components/PokeInfo/PokeInfo";
import PokeEvol from "@/app/components/PokeEvol/PokeEvol";

export const metadata = {
  title: "PokeDex - Details",
  description: "PokeDex is a modern web app built with Next.js, offering detailed insights into Pokémon, including stats, evolutions, abilities, and more, all presented in a visually appealing format.",
};

export const experimental_ppr = true


export default function Pokemon() {
  return (
    <div className="my-16 mx-4 lg:mx-40">
      <PokeInfo />
      <PokeEvol />
    </div>
   
  );
}
