'use client'
import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {

    const [menu,setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu)
    }
  return (
    <nav className='w-full px-12 my-8 flex items-center justify-between'>
        <div className='logo'>
            <Link href="/">
            <Image src="logo.svg" width={120} height={100}></Image>
            </Link>
        </div>
        <div onClick={toggleMenu} className='menu'>
        <div className='menu-closed cursor-pointer'>
         {menu ? (<Image src="menu-close.svg" width={26} height={26}></Image>) : (<Image src="menu-open.svg" width={26} height={26}></Image>)}   
        </div>
        {menu && (
                    <div className='menu-open absolute rounded-md shadow-md right-10 mt-2 bg-white text-white py-2'>
                    <h2 className='font-bold px-3 text-black'>Options</h2>
                    <hr className='border border-black'></hr>
                    <ul>
                        <li className='px-3 text-black'>Pokemon Theme</li>
                    </ul>
                </div>
        )}
        </div>
    </nav>
  )
}

export default Navbar