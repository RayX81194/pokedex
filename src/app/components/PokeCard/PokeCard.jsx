'use client';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
 
import { useState, useEffect } from 'react'
   
const page = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=9`)
      let data = await res.json()
      setPosts(data)
      console.log(data)
    }
    fetchPosts()
  }, [])

 
  if (!posts) return <div>Loading...</div>

  return (
    <div className="grid my-10 sm:mx-20 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10">
    {posts.results.map((poke,index) => {
      return (
        <div key={index + 1} className='bg-white hover:shadow-xl transition-all hover:scale-105 shadow-md rounded-xl max-w-[370px] p-4 flex flex-col justify-between'>
        <div className='poke-info flex justify-between'>
        <div className='flex gap-x-2'>
        <h1 className='px-3 py-1 font-semibold bg-green-500 text-black rounded-full text-[11px]'>Grass</h1>
        <h1 className='px-3 py-1 font-semibold bg-purple-600 text-black rounded-full text-[11px]'>Posion</h1>     
        </div>
        <p className='text-black font-bold'>#{index + 1}</p>
        </div>
        <div className='poke-image gap-x-3 flex justify-between'>
        <div className='flex flex-col gap-y-1 items-start justify-between'>
        <h1 className='font-bold text-black mt-1 text-3xl'>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h1>
        <p className='font-medium text-black text-[14px] max-w-[400px]'>A strange seed was planted on its back at birth. the plant sprouts and grows with this pokémon.</p>
        <Link href={`/pokemon/${index + 1}`}>
        <button className='bg-gray-200 hover:bg-gray-300 transition-all text-black font-bold py-2 px-4 text-[12px] mt-1 rounded-md'>Know More</button>
        </Link>
        </div>
        <div className='flex items-end justify-end'>
        <Image src="/bulb.png" width={300} height={100} alt="Pokemon Image"></Image>
        </div>
        </div>
        </div>
      )
    })}
    </div>
  )
}

export default page