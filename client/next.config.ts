import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: "#E2B844",
          600: "#caa437",
        },
        navy: {
          900: "#121d3a",
        },
      },
      boxShadow: {
        gold: "0px 4px 10px rgba(226, 184, 68, 0.5)",
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default nextConfig;
