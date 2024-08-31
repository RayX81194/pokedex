import Link from 'next/link'
import Image from 'next/image'
 
export default function NotFound() {
  return (
    <div className='w-full h-full flex flex-col items-center mt-20'>
        <Image src="/lost.png" width={200} height={200}></Image>
      <h2 className='font-bold mt-4 text-5xl'>Page does not exist</h2>
      <p className='font-regular mt-3 text-3xl'>Hmm... are you sure you're at right place?</p>
      <Link className='bg-red-500 px-5 mt-3 py-3 text-white shadow-md mx-auto rounded-[100px]' href="/">Return Home</Link>
    </div>
  )
}