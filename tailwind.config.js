/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'transit-blue': '#1e40af',
        'transit-light': '#dbeafe',
        'covid-red': '#dc2626',
        'recovery-green': '#059669',
        'warning-amber': '#d97706'
      },
      fontFamily: {
        'mono': ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Cascadia Code', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
