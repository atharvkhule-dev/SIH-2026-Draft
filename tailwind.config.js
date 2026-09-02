/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          blue: {
            DEFAULT: "#1F4E79",
            light: "#2B6CB0",
            dark: "#143350",
            50: "#F0F5FA",
            100: "#D9E6F2",
            800: "#1F4E79",
            900: "#143350"
          },
          teal: {
            DEFAULT: "#2F7D6B",
            light: "#3E9C87",
            dark: "#1F5448",
            50: "#F0F8F6",
            100: "#D5ECE7"
          },
          accent: {
            DEFAULT: "#E6A23C",
            light: "#EBAE57",
            dark: "#C68525"
          },
          bg: "#F7F8FA",
          surface: "#FFFFFF",
          text: {
            primary: "#1F2937",
            secondary: "#5B6470",
            muted: "#7A8491"
          },
          status: {
            success: "#2E7D32",
            warning: "#B7791F",
            error: "#C62828",
            info: "#2563EB"
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'Roboto', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '8px',
        'modal': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'modal': '0 12px 32px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
