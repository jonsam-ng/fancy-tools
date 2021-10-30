module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "recorder-media": "url('@/asset/image/macbook.png')",
        "recorder-download": "url('@/asset/image/download.png')",
        "recorder-play": "url('@/asset/image/play.png')",
        "recorder-pause": "url('@/asset/image/pause.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
