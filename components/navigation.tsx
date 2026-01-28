'use client';

import { Button } from '@/components/ui/button';
import { Camera, Code2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className='flex justify-between items-center mx-auto px-4 py-4 max-w-7xl'>
        <Link href='/' className='group flex items-center gap-2'>
          <div className='flex justify-center items-center bg-linear-to-r from-primary to-secondary rounded-full w-10 h-10 group-hover:scale-110 transition-transform'>
            <img
              src={'https://avatars.githubusercontent.com/u/124069013?v=4'}
              className='rounded-full w-9 h-9'
            />
          </div>
          <span className='font-bold text-foreground text-xl'>Léo Sgarbi</span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-4'>
          <Link href='/'>
            <Button
              variant={pathname === '/' ? 'default' : 'ghost'}
              className='group gap-2'
            >
              <Code2 className='w-4 h-4 group-hover:rotate-12 transition-transform' />
              Developer
            </Button>
          </Link>

          <Link href='/photography'>
            <Button
              variant={pathname === '/photography' ? 'default' : 'ghost'}
              className='group gap-2'
            >
              <Camera className='w-4 h-4 group-hover:scale-110 transition-transform' />
              Photo & Video
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2 text-foreground hover:text-primary transition-colors'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? (
            <X className='w-6 h-6' />
          ) : (
            <Menu className='w-6 h-6' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden border-border border-t glass-effect'>
          <div className='flex flex-col gap-2 px-4 py-4'>
            <Link href='/' onClick={() => setIsMenuOpen(false)}>
              <Button
                variant={pathname === '/' ? 'default' : 'ghost'}
                className='justify-start gap-2 w-full'
              >
                <Code2 className='w-4 h-4' />
                Developer
              </Button>
            </Link>

            <Link href='/photography' onClick={() => setIsMenuOpen(false)}>
              <Button
                variant={pathname === '/photography' ? 'default' : 'ghost'}
                className='justify-start gap-2 w-full'
              >
                <Camera className='w-4 h-4' />
                Photo & Video
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
