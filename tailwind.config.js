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
        dark: '#0f0f0f',
        'dark-card': '#1a1a1a',
        'dark-border': '#2a2a2a',
        'dark-hover': '#222222',
        accent: '#f97316',
        'text-primary': '#efefef',
        'text-muted': '#808080',
        'text-subtle': '#484848',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.65)',
      },
    },
  },
  plugins: [],
}
