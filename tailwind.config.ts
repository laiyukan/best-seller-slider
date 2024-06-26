import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        outer: "0 0 8px rgba(0, 0, 0, 0.1608)",
      },
      colors: {
        "ibp-red": "#ff1b1b",
        "ibp-zinc": "#929292",
        "ibp-light-blue": "#f2f6fa",
      },
      fontSize: {
        xxs: "0.7rem",
      },
    },
  },
  plugins: [],
};
export default config;
