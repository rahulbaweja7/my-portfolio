import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { pathname } = useRouter();
  const label = `${theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} (Shift+D)`;

  // Shift+D toggles the theme, except while typing
  useEffect(() => {
    const onKey = e => {
      if (!e.shiftKey || e.metaKey || e.ctrlKey || e.altKey || e.key.toLowerCase() !== 'd') return;
      const el = document.activeElement;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);

  return (
    <button
      onClick={toggle}
      data-hover
      className={`theme-toggle fixed right-5 ${pathname === '/about' ? 'bottom-5 md:bottom-[62px]' : 'bottom-5'} z-[200] flex items-center justify-center w-9 h-9 rounded-full`}
      style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}
      aria-label={label}
      title={label}
    >
      <span key={theme} className="theme-toggle-icon flex">
      {theme === 'dark' ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
      </span>
    </button>
  );
}
