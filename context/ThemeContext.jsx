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
  }, []);

  const setTheme = next => {
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
