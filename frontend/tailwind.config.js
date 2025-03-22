module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        background: 'oklch(1 0 0)', // Color de fondo
        foreground: 'oklch(0.145 0 0)', // Color de texto
        card: 'oklch(1 0 0)', // Color de tarjeta
      },
    },
  },
  plugins: [],
}
