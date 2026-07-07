/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(${name}) / <alpha-value>)`;
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette is driven by CSS variables (see globals.css) so a `.dark`
        // class on <html> inverts the paper/ink families site-wide.
        paper: { DEFAULT: v("--paper"), 2: v("--paper-2"), 3: v("--paper-3") },
        ink: { DEFAULT: v("--ink"), 2: v("--ink-2"), 3: v("--ink-3"), bg: v("--ink-bg"), bg2: v("--ink-bg2") },
        terracotta: { DEFAULT: "#C7295E", dk: "#9E1E49" },
        ochre: "#E5A23A",
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        pixel: ['Silkscreen', '"JetBrains Mono"', 'monospace'],
        arabic: ['Tajawal', '"Hanken Grotesk"', 'sans-serif'],
      },
      maxWidth: { container: "1760px" },
      transitionTimingFunction: { brand: "cubic-bezier(.2,.7,.2,1)" },
      keyframes: {
        pulse2: { "0%": { boxShadow: "0 0 0 0 rgba(199,41,94,.5)" }, "70%": { boxShadow: "0 0 0 12px rgba(199,41,94,0)" }, "100%": { boxShadow: "0 0 0 0 rgba(199,41,94,0)" } },
        drift: { "0%": { transform: "translate3d(0,0,0) scale(1)" }, "100%": { transform: "translate3d(2.5%,-2%,0) scale(1.06)" } },
      },
      animation: { pulse2: "pulse2 2.4s infinite", drift: "drift 22s ease-in-out infinite alternate" },
    },
  },
  plugins: [],
};
