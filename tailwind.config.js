module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-desktop': "url('/src/images/desktop-bg.svg')",
        'hero-mobile': "url('/src/images/mobile-bg.svg')",
      }
    },
  },
  plugins: [],
}
