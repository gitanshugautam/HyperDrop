export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {animation: {
  slideIn: "slideIn 0.3s ease-out",
},
keyframes: {
  slideIn: {
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(0)" },
  },
},
},
  },
  plugins: [],
};
