import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext({ theme: 'dark', toggle: () => {}, setTheme: () => {} });

function applyTheme(t) {
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(t);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const t = stored || sys;
    setThemeState(t);
    applyTheme(t);

    // Follow OS theme changes until the visitor picks one explicitly
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = e => {
      if (localStorage.getItem('theme')) return;
      const next = e.matches ? 'dark' : 'light';
      setThemeState(next);
      applyTheme(next);
    };
    mq.addEventListener('change', onSystemChange);

    // Keep other open tabs in sync
    const onStorage = e => {
      if (e.key !== 'theme' || (e.newValue !== 'dark' && e.newValue !== 'light')) return;
      setThemeState(e.newValue);
      applyTheme(e.newValue);
    };
    window.addEventListener('storage', onStorage);

    return () => {
      mq.removeEventListener('change', onSystemChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const setTheme = next => {
    // Briefly enable color transitions so the switch fades instead of snapping
    const root = document.documentElement;
    root.classList.add('theme-transition');
    clearTimeout(window.__themeTransitionTimer);
    window.__themeTransitionTimer = setTimeout(() => root.classList.remove('theme-transition'), 350);

    setThemeState(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  };

  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Ctx.Provider value={{ theme: mounted ? theme : 'dark', toggle, setTheme }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTheme = () => useContext(Ctx);
