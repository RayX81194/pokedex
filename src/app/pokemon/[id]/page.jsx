import Image from "next/image";
import PokeInfo from "@/app/components/PokeInfo/PokeInfo";

export const metadata = {
  title: "PokeDex - Home ",
  description: "PokeDex is a modern web app built with Next.js, offering detailed insights into Pokémon, including stats, evolutions, abilities, and more, all presented in a visually appealing format.",
};


export default function Pokemon() {
  return (
    <div>
      <PokeInfo />
    </div>
   
  );
}
