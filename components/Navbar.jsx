import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 border-b"
      style={{ background: 'var(--nav-bg)', borderColor: 'var(--nav-border)' }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-sm font-medium" style={{ color: 'var(--c-text)' }} data-hover>
          rahul<span className="text-accent">.</span>dev
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            open
          </span>

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
        </div>
      </nav>
    </header>
  );
}
