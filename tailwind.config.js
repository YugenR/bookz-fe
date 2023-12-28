/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#9f00ff",
          "secondary": "#00ff40",
          "accent": "#0067d2",
          "neutral": "#060900",
          "base-100": "#262626",
          "info": "#00a1f8",
          "success": "#008800",
          "warning": "#ff7900",
          "error": "#ff8292",
        },
      },
    ],
  },
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
