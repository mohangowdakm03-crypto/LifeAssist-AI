/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        med: {
          sky: "#e9f4ff",
          blue: "#2a6fdb",
          green: "#3fa372",
          slate: "#2d3f54",
          alert: "#cf2a2a"
        }
      },
      boxShadow: {
        soft: "0 12px 35px rgba(16, 61, 120, 0.12)"
      },
      keyframes: {
        pulseStrong: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.06)", opacity: "0.65" }
        }
      },
      animation: {
        pulseStrong: "pulseStrong 1s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
