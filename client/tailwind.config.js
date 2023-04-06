/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        "dynamic-screen": ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      backgroundImage: {
        'gradient-radial-out': 'radial-gradient(80% 120% at 40% 55%, var(--tw-gradient-stops))',
        'gradient-radial-top-right': 'radial-gradient(100% 120% at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        "custom-large": "clamp(3rem, 5vw + 1rem, 6rem",
        "custom-large-2": "clamp(2rem, 5vw + 0.5rem, 3rem",
        "custom-normal": "min(2rem, 5vw)"
      },
      screens: {
        "4k": "2560px"
      }
    },
  },
  plugins: [],
};
