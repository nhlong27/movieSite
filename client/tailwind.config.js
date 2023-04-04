/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial-out': 'radial-gradient(80% 120% at 40% 55%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
