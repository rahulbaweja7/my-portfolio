/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark:         'var(--c-bg)',
        'dark-card':  'var(--c-card)',
        'dark-border':'var(--c-border)',
        'dark-hover': 'var(--c-card-alt)',
        accent:       '#f97316',
        'text-primary': 'var(--c-text)',
        'text-muted':   'var(--c-muted)',
        'text-subtle':  'var(--c-subtle)',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card:       '0 4px 24px rgba(0,0,0,0.12)',
        'card-hover':'0 8px 32px rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
}
