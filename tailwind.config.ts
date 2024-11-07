import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "upbit-blue": "rgb(1,53,151)", // 업비트 테마 컬러 추가
      },
    },
  },
  plugins: [],
};
export default config;
