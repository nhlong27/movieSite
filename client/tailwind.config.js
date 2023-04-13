/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'dynamic-screen': ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      backgroundImage: {
        'gradient-radial-out': 'radial-gradient(80% 120% at 40% 55%, var(--tw-gradient-stops))',
        'gradient-radial-top-right':
          'radial-gradient(100% 120% at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'custom-min-large': 'min(3rem, 2.5vw)',
        'custom-min-medium': 'min(2rem, 2.5vw)',
        'custom-min-normal': 'min(1rem, 2.5vw)',
        'custom-max-large': 'max(2rem, 2.5vw)',
        'custom-max-medium': 'max(1rem, 2.5vw)',
        'custom-max-normal': 'max(0.5rem, 2.5vw)',
      },
      gap: {
        'custom-x-min-large': 'min(3rem, 2.5vw)',
        'custom-x-min-medium': 'min(2rem, 2.5vw)',
        'custom-x-min-normal': 'min(1rem, 2.5vw)',
        'custom-x-max-large': 'max(2rem, 2.5vw)',
        'custom-x-max-medium': 'max(1rem, 2.5vw)',
        'custom-x-max-normal': 'max(0.5rem, 2.5vw)',
        'custom-y-min-large': 'min(6rem, 2.5vh)',
        'custom-y-min-medium': 'min(4rem, 2.5vh)',
        'custom-y-min-normal': 'min(2rem, 2.5vh)',
        'custom-y-max-large': 'max(3rem, 2.5vh)',
        'custom-y-max-medium': 'max(2rem, 2.5vh)',
        'custom-y-max-normal': 'max(1rem, 2.5vh)'
      },
      margin: {
        'custom-x-min-large': 'min(3rem, 2.5vw)',
        'custom-x-min-medium': 'min(2rem, 2.5vw)',
        'custom-x-min-large': 'min(3rem, 2.5vw)',
        'custom-x-min-medium': 'min(2rem, 2.5vw)',
        'custom-x-min-normal': 'min(1rem, 2.5vw)',
        'custom-x-max-large': 'max(2rem, 2.5vw)',
        'custom-x-max-medium': 'max(1rem, 2.5vw)',
        'custom-x-max-normal': 'max(0.5rem, 2.5vw)',
        'custom-y-min-large': 'min(6rem, 2.5vh)',
        'custom-y-min-medium': 'min(4rem, 2.5vh)',
        'custom-y-min-normal': 'min(2rem, 2.5vh)',
        'custom-y-max-large': 'max(3rem, 2.5vh)',
        'custom-y-max-medium': 'max(2rem, 2.5vh)',
        'custom-y-max-normal': 'max(1rem, 2.5vh)'
      },
      padding: {
        'custom-x-min-large': 'min(3rem, 2.5vw)',
        'custom-x-min-medium': 'min(2rem, 2.5vw)',
        'custom-x-min-normal': 'min(1rem, 2.5vw)',
        'custom-x-max-large': 'max(2rem, 2.5vw)',
        'custom-x-max-medium': 'max(1rem, 2.5vw)',
        'custom-x-max-normal': 'max(0.5rem, 2.5vw)',
        'custom-y-min-large': 'min(6rem, 5vh)',
        'custom-y-min-medium': 'min(4rem, 5vh)',
        'custom-y-min-normal': 'min(2rem, 5vh)',
        'custom-y-max-large': 'max(3rem, 5vh)',
        'custom-y-max-medium': 'max(2rem, 5vh)',
        'custom-y-max-normal': 'max(1rem, 5vh)'
      },
      screens: {
        '4k': '2560px',
        'xs': '500px'
      },
    },
  },
  plugins: [],
};
