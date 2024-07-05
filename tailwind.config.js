/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "320px",

      mobilemedium: "425px",
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      transitionProperty: {
        width: "width",
        height: "height",
      },
      colors: {
        aquamarine: "#7FFFD4",
        wheat: "#F5DEB3",
        secondary: "#AEEEED",
        secondarysecond: "#38f2c1",
        bg_blue: "#E8EFFD",
        text_blue: "#032E66",
        login: "#DAFDFF",
        reset: "#FFDADA",
        newPassword: "#DFDAFF",
      },
      fontSize: {
        xxs: "0.5rem",
      },
    },
  },
  plugins: [],
};
