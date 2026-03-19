import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/about',    label: 'About'    },
  { href: '/work',     label: 'Work'     },
  { href: '/skills',   label: 'Skills'   },
  { href: '/projects', label: 'Projects' },
  { href: '/contact',  label: 'Contact'  },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (nav) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [nav]);

  return (
    <header
      className={`fixed w-full z-[100] transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-sm border-b border-dark-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto flex items-center justify-between h-16 px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 overflow-hidden rounded-full border border-dark-border group-hover:border-accent transition-colors duration-200">
            <Image src="/assets/RahulAnimated.png" alt="Rahul" fill style={{ objectFit: 'cover' }} />
          </div>
          <span className="text-[#efefef] text-sm font-medium hidden sm:block">
            rahul<span className="text-accent">.</span>dev
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = router.pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3.5 py-2 text-sm rounded transition-colors duration-200 ${
                    isActive
                      ? 'text-[#efefef]'
                      : 'text-text-muted hover:text-[#efefef]'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="block h-px w-full bg-accent mt-px rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setNav(!nav)}
          className="md:hidden p-2 text-text-muted hover:text-[#efefef] transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <AiOutlineMenu size={19} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {nav && (
        <div className="fixed inset-0 z-[200] bg-dark flex flex-col">
          <div className="flex items-center justify-between h-16 px-6 border-b border-dark-border">
            <span className="text-[#efefef] text-sm font-medium">
              rahul<span className="text-accent">.</span>dev
            </span>
            <button
              onClick={() => setNav(false)}
              className="p-2 text-text-muted hover:text-[#efefef]"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          <ul className="flex flex-col items-center justify-center flex-1 gap-8">
            {navLinks.map(({ href, label }, i) => (
              <li
                key={href}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.06}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <Link
                  href={href}
                  onClick={() => setNav(false)}
                  className={`text-3xl font-light transition-colors duration-200 ${
                    router.pathname === href ? 'text-accent' : 'text-text-muted hover:text-[#efefef]'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
