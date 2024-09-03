'use client';
import React,{useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = ({ theme, toggleTheme }) => {

    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    return (
        <nav className='w-full px-5 md:px-12 my-8 flex items-center justify-between'>
            <div className='logo'>
                <Link href="/">
                    <Image src="/logo.svg" width={120} height={100} alt="PokeDex Logo" />
                </Link>
            </div>
            <div onClick={toggleMenu} className='menu'>
                <div className='menu-closed cursor-pointer'>
                    <Image src="/options.png" width={26} height={26} alt='Options' />
                </div>
                {menu && (
                    <div className='menu-open absolute rounded-md shadow-md right-10 mt-2 bg-white text-white py-2'>
                        <h2 className='font-bold mt-3 px-3 text-red-700'>Options</h2>
                        <hr className='border mt-2 border-gray-100'></hr>
                        <ul className=' mt-3'>
                            <li className='flex  gap-x-8 px-3 text-black'>
                                Enable Red Theme
                                <button onClick={toggleTheme}>
                                    {!theme ? (<Image src="/off.svg" width={40} height={40} alt='OFF' />) : (<Image src="/on.svg" width={40} height={40} alt="ON" />)}
                                </button>
                            </li>
                        </ul>
                        <hr className='border mt-2 border-gray-100'></hr>
                        <h2 className='font-normal text-[15px] mt-3 px-3 text-black'>Created by <Link href="https://github.com/RayX81194"><span className='font-semibold underline'>Ray</span></Link> - <Link href="https://github.com/rayX81194/pokedex"><span className='underline font-semibold'>Source Code</span></Link></h2>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
