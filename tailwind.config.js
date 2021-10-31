module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        media: "url('@/asset/image/macbook.png')",
        download: "url('@/asset/image/download.png')",
        play: "url('@/asset/image/play.png')",
        pause: "url('@/asset/image/pause.png')",
        language: "url('@/asset/image/language.png')",
        github: "url('@/asset/image/github.png')",
        website: "url('@/asset/image/website.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
