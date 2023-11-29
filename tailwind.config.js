function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryTest: withOpacity("--color-primary-test"),
        background: withOpacity("--color-background"),
        chrisTest: "#1B6788",
      },
    },
  },
  plugins: [],
};
