'use client';
import { useState } from 'react';
import Link from 'next/link';
import instacapt_logo from '../../public/instacapt_logo.png';
import Image from 'next/image';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage mobile menu toggle

  return (
    <div className='container mx-auto'>
      <nav className='flex justify-between items-center w-full mt-6 sm:px-4 px-2'>
        {/* Logo */}
        <div className='flex items-center justify-between w-full lg:w-auto'>
          <Image
            src={instacapt_logo}
            alt='InstaCapt Logo'
            width={50}
            height={50}
          />
          <Link href='/'>
            <h1 className='text-purple-500 text-4xl font-semibold cursor-pointer'>
              InstaCapt.me
            </h1>
          </Link>

          {/* Hamburger Icon for Mobile */}
          <button
            className='lg:hidden'
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <section
          className={`${
            isNavOpen ? 'showMenuNav' : 'hideMenuNav'
          } flex lg:hidden`}
        >
          {/* Mobile Menu Items */}
          <div>
            {/* Close Icon */}
            <div
              className='absolute top-0 right-0 px-8 py-8'
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className='h-8 w-8 text-gray-600'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </div>
            <ul className='flex flex-col items-center justify-between min-h-[15px]'>
              <li>
                <Link href='/' onClick={() => setIsNavOpen(false)}>
                  <p className='font-medium cursor-pointer border-b border-gray-400 my-8 uppercase'>
                    Home
                  </p>
                </Link>
              </li>
              <li>
                <Link href='/faq' onClick={() => setIsNavOpen(false)}>
                  <p className='font-medium cursor-pointer border-b border-gray-400 my-8 uppercase'>
                    FAQ
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Desktop Menu */}
        <ul className='hidden lg:flex space-x-8'>
          <li>
            <Link href='/faq'>
              <p className='font-medium cursor-pointer'>FAQ</p>
            </Link>
          </li>
        </ul>
      </nav>
      <hr className='my-6 border-gray-200 md:my-8 dark:border-gray-700' />
      {/* Styles */}
      <style jsx>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: fixed; /* changed from absolute to fixed */
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(10px); /* Added blur effect */
        }
      `}</style>
    </div>
  );
};

export default Navbar;
