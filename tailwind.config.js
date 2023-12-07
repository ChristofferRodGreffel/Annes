export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "rotate(1)" },
        },
      },

      animation: {
        slowZoom: "slowZoom 1.5s ease-in-out infinite",
      },

      minWidth: {
        sidebarMinWidth: "20rem",
        productOverviewMinWidth: "400px",
      },
      minHeight: {
        productOverviewMinHeight: "70%",
      },
      colors: {
        primary: "var(--color-primary)",
        primaryLow: "var(--color-primary-opacity)",
        dark: "var(--color-dark)",
        white: "var(--color-white)",
        mainGrey: "var(--color-main-grey)",
        lightGrey: "var(--color-light-grey)",
        grey: "var(--color-grey)",
        red: "var(--color-red)",
        green: "var(--color-green)",
        cancelGrey: "var(--color-cancelGrey)",
      },
    },
  },
  plugins: [],
};
