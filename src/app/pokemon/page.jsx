import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: 'PokeDex - Pokemon',
    description: 'Learn more about our team and mission.',
  };

export default function Pokemon() {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/pokemon">Pokemon</Link>
      <h1 className="text-5xl">Hello Pokemon</h1>   
    </>
  );
}
