import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/about',    label: 'About'    },
  { href: '/work',     label: 'Work'     },
  { href: '/skills',   label: 'Skills'   },
  { href: '/projects', label: 'Projects' },
  { href: '/contact',  label: 'Contact'  },
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#';

/* ── Scramble link ──────────────────────────────────────────────── */
function ScrambleLink({ href, label, isActive, setRef }) {
  const [display, setDisplay] = useState(label);
  const iv = useRef(null);

  const scramble = () => {
    let i = 0;
    clearInterval(iv.current);
    iv.current = setInterval(() => {
      setDisplay(
        label.split('').map((ch, idx) =>
          idx < Math.floor(i) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      );
      i += 0.55;
      if (Math.floor(i) >= label.length) { clearInterval(iv.current); setDisplay(label); }
    }, 28);
  };

  useEffect(() => () => clearInterval(iv.current), []);

  return (
    <Link
      href={href}
      ref={setRef}
      onMouseEnter={scramble}
      data-hover
      className="relative z-10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest transition-colors duration-200 select-none whitespace-nowrap rounded-lg"
      style={{ color: isActive ? 'var(--c-text)' : 'var(--c-subtle)' }}
    >
      {display}
    </Link>
  );
}

/* ── Navbar ─────────────────────────────────────────────────────── */
export default function Navbar() {
  const router   = useRouter();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [slider,     setSlider]     = useState({ left: 0, width: 0, ready: false });

  const containerRef = useRef(null);
  const linkRefs     = useRef({});

  /* Slide indicator to active link */
  const syncSlider = useCallback(() => {
    const container = containerRef.current;
    const activeEl  = linkRefs.current[router.pathname];
    if (!container || !activeEl) return;
    const cRect = container.getBoundingClientRect();
    const lRect = activeEl.getBoundingClientRect();
    setSlider({ left: lRect.left - cRect.left, width: lRect.width, ready: true });
  }, [router.pathname]);

  useEffect(() => {
    syncSlider();
    window.addEventListener('resize', syncSlider);
    return () => window.removeEventListener('resize', syncSlider);
  }, [syncSlider]);

  /* Lock body scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [router.pathname]);

  return (
    <>
      {/* ── Floating pill ───────────────────────────────────────── */}
      <header className="fixed top-4 left-0 right-0 z-[100] px-4 sm:px-6">
        <nav
          className="max-w-5xl mx-auto flex items-center justify-between h-11 px-3 rounded-2xl"
          style={{
            background:   'var(--nav-bg)',
            border:       '1px solid var(--nav-border)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" data-hover>
            <div
              className="relative w-6 h-6 overflow-hidden rounded-full transition-all duration-200"
              style={{ border: '1px solid var(--c-border)' }}
            >
              <Image src="/assets/RahulAnimated.png" alt="Rahul" fill style={{ objectFit: 'cover' }} />
            </div>
            <span className="text-[13px] font-medium hidden sm:block" style={{ color: 'var(--c-text)' }}>
              rahul<span className="text-accent">.</span>dev
            </span>
          </Link>

          {/* Desktop links with sliding indicator */}
          <div
            ref={containerRef}
            className="hidden md:flex items-center relative p-1 rounded-xl"
            style={{ background: 'rgba(128,128,128,0.08)' }}
          >
            {/* Slider */}
            {slider.ready && (
              <div
                className="absolute inset-y-1 rounded-lg pointer-events-none"
                style={{
                  left:       slider.left,
                  width:      slider.width,
                  background: 'rgba(128,128,128,0.12)',
                  transition: 'left 0.28s cubic-bezier(0.25,1,0.5,1), width 0.28s cubic-bezier(0.25,1,0.5,1)',
                }}
              />
            )}

            {navLinks.map(({ href, label }) => (
              <ScrambleLink
                key={href}
                href={href}
                label={label}
                isActive={router.pathname === href}
                setRef={el => { linkRefs.current[href] = el; }}
              />
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Status — desktop only */}
            <span className="hidden md:flex items-center gap-1.5 text-[10px] font-mono text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              open
            </span>

            {/* Theme toggle — desktop only */}
            <button
              onClick={toggle}
              data-hover
              className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-200"
              style={{ background: 'var(--c-border)', color: 'var(--c-text)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col gap-[5px] p-1.5"
              aria-label="Open menu"
            >
              <span className="block w-5 h-px" style={{ background: 'var(--c-muted)' }} />
              <span className="block w-3.5 h-px" style={{ background: 'var(--c-muted)' }} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile fullscreen menu ───────────────────────────────── */}
      <div
        className="fixed inset-0 z-[200] flex flex-col md:hidden transition-all duration-400"
        style={{
          background: 'var(--c-bg)',
          opacity:    mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-5">
          <span className="text-sm font-medium font-mono" style={{ color: 'var(--c-text)' }}>
            rahul<span className="text-accent">.</span>dev
          </span>
          <div className="flex items-center gap-3">
            {/* Mobile theme toggle */}
            <button
              onClick={toggle}
              data-hover
              className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-200"
              style={{ background: 'var(--c-border)', color: 'var(--c-text)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="transition-colors p-1"
              style={{ color: 'var(--c-subtle)' }}
              aria-label="Close menu"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex-1 flex flex-col justify-center px-6 gap-0">
          {navLinks.map(({ href, label }, i) => {
            const isActive = router.pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-baseline gap-4 py-4 border-b border-dark-border group"
                style={{
                  opacity:   mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.3s ease ${i * 0.06 + 0.05}s, transform 0.3s ease ${i * 0.06 + 0.05}s`,
                }}
              >
                <span className="text-[10px] font-mono w-5" style={{ color: 'var(--c-subtle)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="font-black uppercase text-4xl leading-none tracking-tight transition-colors duration-200"
                  style={{ color: isActive ? '#f97316' : 'var(--c-border-2)' }}
                >
                  {label}
                </span>
                {isActive && (
                  <span className="ml-auto text-accent text-sm">→</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom status */}
        <div className="px-6 py-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[11px] font-mono" style={{ color: 'var(--c-subtle)' }}>open to work</span>
        </div>
      </div>
    </>
  );
}
