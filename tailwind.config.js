module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5CC0CD",
        secondary: "#F3F3F3",
        "pack-single-color": "#99BEC4",
        "pack-share-color": "#29455D",
        "pack-nonshare-color": "#649299",
      },
      fontFamily: {
        'pt-sans-narrow': ['PT Sans Narrow', 'sans-serif']
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require('@tailwindcss/line-clamp'),
  ],
}
