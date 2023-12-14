import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  return (
    <div className='w-full'>
      <nav className='flex flex-wrap items-center justify-around p-6 shadow-md'>
        {/* Logo  */}
        <>
          <div className='flex w-full flex-wrap items-center justify-between lg:w-auto'>
            <Link href='/'>
              <h1 className='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-semibold text-transparent'>
                InstaCapt.me
              </h1>
            </Link>
          </div>
        </>

        {/* menu  */}
        <>
          <div className='hidden text-center lg:flex lg:items-center'>
            <Link href='/info'>
              <p>Info</p>
            </Link>
          </div>
        </>

        {/* <div className='nav__item mr-3 hidden space-x-4 lg:flex '>
          <ThemeSwitcher />
        </div> */}
      </nav>
    </div>
  );
};

export default Navbar;
