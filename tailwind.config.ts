/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      aspectRadio: {
        '9/16': '9 / 16',
        // 512/384
        '4/3': '4 / 3',
        // 512/340
        '128/85': '128 / 85',
        // 1280/720:video
      },
    },
  },
  plugins: [],
};
