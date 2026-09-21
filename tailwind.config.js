/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-base": "#F8FAFC",
        "light-card": "#FFFFFF",
        "light-border": "#E2E8F0",
        "text-primary": "#0F172A",
        "text-muted": "#475569",
        "brand-primary": "#023e8a",
        "brand-subtle": "#EFF6FF",
        "btn-confirm": "#059669",
        "btn-cancel": "#F1F5F9",
        "btn-danger": "#E11D48",
        "badge-warning": "#D97706",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};
