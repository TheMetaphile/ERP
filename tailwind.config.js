/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "320px",
      sm: "576px",
      tablet: "1024px",
      // => @media (min-width: 640px) { ... }

      laptop: "1280px",
      
      // => @media (min-width: 1024px) { ... }

      // desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      transitionProperty: {
        width: "width",
        height: "height",
      },
      colors: {
        aquamarine: "#7FFFD4",
        wheat: "#F5DEB3",
        secondary: "#AEEEED",
        secondarysecond: "#38f2c1",
        bg_blue: "#E8EFFD",
        text_blue: "#032E66",
        login: "#DAFDFF",
        reset: "#FFDADA",
        newPassword: "#DFDAFF",
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        dark: {
          50: '#111827',
          100: '#1f2937',
          200: '#374151',
          300: '#4b5563',
          400: '#6b7280',
          500: '#9ca3af',
          600: '#d1d5db',
          700: '#e5e7eb',
          800: '#f3f4f6',
          900: '#ffffff',
        }
      },
      fontSize: {
        xxs: "0.5rem",
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'dark-lg': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
    },
  },
  plugins: [],
};
