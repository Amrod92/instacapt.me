import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import instacapt_logo from '../../public/instacapt_logo.png';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='container mx-auto'>
      <nav className='flex justify-between items-center w-full mt-6 sm:px-4 px-2'>
        {/* Logo  */}
        <>
          <div className='flex w-full flex-wrap items-center justify-between lg:w-auto'>
            <Image
              src={instacapt_logo}
              alt='Picture of the author'
              width={50}
              height={50}
            />
            <Link href='/'>
              <h1 className='text-purple-500 text-4xl font-semibold'>
                InstaCapt.me
              </h1>
            </Link>
          </div>
        </>

        {/* menu  */}
        <div className='mr-3'>
          <div className='hidden text-center lg:flex lg:items-center'>
            <Link href='/faq'>
              <p className='font-medium'>FAQ</p>
            </Link>
          </div>
        </div>

        {/* <div className='nav__item mr-3 hidden space-x-4 lg:flex '>
          <ThemeSwitcher />
        </div> */}
      </nav>
      <hr className='my-6 border-gray-200 md:my-8 dark:border-gray-700' />
    </div>
  );
};

export default Navbar;
