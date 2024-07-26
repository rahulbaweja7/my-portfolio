import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleShadow);
    return () => window.removeEventListener('scroll', handleShadow);
  }, []);

  return (
    <div className={shadow ? 'fixed w-full h-20 shadow-lg bg-gray-800 z-[100] transition-shadow duration-300' : 'fixed w-full h-20 bg-gray-800 z-[100] transition-shadow duration-300'}>
      <div className='flex justify-between items-center w-full h-full px-4 md:px-8 lg:px-16'>
        <div className='flex items-center'>
          <div className='relative w-12 h-12 overflow-hidden rounded-full'>
            <Image
              src='/assets/RahulAnimated.png'
              alt='Logo'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <span className='ml-4 text-white text-3xl font-semibold'>Rahul Baweja</span>
        </div>
        <div className='hidden md:flex space-x-6'>
          <Link href='/' className='text-white text-base uppercase hover:text-gray-400'>Home</Link>
          <Link href='/about' className='text-white text-base uppercase hover:text-gray-400'>About</Link>
          <Link href='/skills' className='text-white text-base uppercase hover:text-gray-400'>Skills</Link>
          <Link href='/projects' className='text-white text-base uppercase hover:text-gray-400'>Projects</Link>
          <Link href='/contact' className='text-white text-base uppercase hover:text-gray-400'>Contact</Link>
        </div>
        <div onClick={handleNav} className='md:hidden'>
          {nav ? (
            <AiOutlineClose size={25} className='text-white cursor-pointer' />
          ) : (
            <AiOutlineMenu size={25} className='text-white cursor-pointer' />
          )}
        </div>
      </div>
      {nav && (
        <div className='fixed top-0 left-0 w-full h-screen bg-black/90 flex flex-col items-center justify-center'>
          <AiOutlineClose
            size={30}
            className='text-white cursor-pointer absolute top-4 right-4'
            onClick={() => setNav(!nav)}
          />
          <ul className='flex flex-col space-y-6'>
            <Link href='/' className='text-white text-lg uppercase'>Home</Link>
            <Link href='/about' className='text-white text-lg uppercase'>About</Link>
            <Link href='/skills' className='text-white text-lg uppercase'>Skills</Link>
            <Link href='/projects' className='text-white text-lg uppercase'>Projects</Link>
            <Link href='/contact' className='text-white text-lg uppercase'>Contact</Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
