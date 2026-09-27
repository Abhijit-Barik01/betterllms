import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F7F8",
        ink: "#272727",
        mute: "#6e6e6e",
        line: "#e8e8ea",
        accent: "#2e80d9",
        info: "#2f7cf6",
        cream: "#f1e8d4",
        mint: "#7fe59a",
        navy: "#2b6e9d",
        charcoal: "#1f1f1d",
      },
      fontFamily: {
        sans: [
          "Overused Grotesk",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["IBM Plex Mono", "ui-monospace", "SF Mono", "Menlo", "monospace"],
        pixel: ["Pixelify Sans", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(59,59,59,.09), 0 2px 4px rgba(59,59,59,.05), 0 0 0 1px rgba(59,59,59,.01)",
        float:
          "0 18px 40px rgba(40,40,40,.08), 0 1px 2px rgba(59,59,59,.09), 0 0 0 1px rgba(59,59,59,.01)",
      },
      borderRadius: {
        btn: "9px",
        folder: "18px",
      },
    },
  },
  plugins: [],
};

export default config;
