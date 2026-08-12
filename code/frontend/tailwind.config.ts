import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        appBackground: "#F8FAFC",
        surface: "#FFFFFF",
        success: "#10B981",
        danger: "#EF4444"
      }
    }
  },
  plugins: []
};

export default config;
