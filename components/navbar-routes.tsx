'use client';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [top, setTop] = useState(0);
  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setTop(prevScrollPos > currentScrollPos ? 0 : -110);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const menus = [
    { title: 'Home', path: '/' },
    { title: 'Become a Donor', path: '/register' },
  ];

  const clickHandler = () => {
    router.push('/sign-in');
  };

  return (
    <nav
      className={`sticky top-${top} bg-white shadow transition-shadow duration-300 z-10 w-full border-b md:border-0`}
      style={{ transition: 'top ease-in-out 0.3s' }}>
      <div className='flex items-center justify-between px-4 py-3 max-w-screen-2xl mx-auto md:flex md:px-8 md:py-5'>
        <Link href='/' aria-label='Brand Logo'>
          <Image
            src='/assets/logo.png'
            width={70}
            height={70}
            alt='Branding logo'
            priority
          />
        </Link>
        <button
          className='md:hidden text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'>
          {isOpen ? <X /> : <Menu />}
        </button>

        <div
          className={`flex-1 text-center space-y-5 mt-8 md:space-y-0 md:flex md:items-center md:justify-center md:mt-0 ${
            isOpen ? 'block' : 'hidden'
          }`}>
          <ul className='flex flex-col items-center space-y-5 md:flex-row md:space-x-10 md:space-y-0'>
            {menus.map((item, idx) => (
              <li
                key={idx}
                className='font-medium text-black hover:text-indigo-600 transition-colors duration-200'>
                <Link href={item.path} aria-label={item.title}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='md:flex md:items-center md:gap-3 md:ml-auto'>
          {!userId ? (
            <Button
              variant='success'
              border='rounded'
              size='lg'
              onClick={clickHandler}>
              Sign in
            </Button>
          ) : (
            <Link href='/dashboard'>
              <Button variant='success' border='rounded' size='lg'>
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
