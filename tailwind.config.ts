import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "portfolio-dark": "#0a0a0a",
        "portfolio-orange": "#ff6b35",
        "portfolio-blue": "#4a9eff",
      },
    },
  },
  plugins: [],
};

export default config;
