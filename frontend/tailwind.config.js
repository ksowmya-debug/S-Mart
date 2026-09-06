/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8FBFF',          // Main Light Background
          lightBlue: '#EFF8FF',   // Very Light Blue Sections
          subtle: '#F5F7FF',      // Subtle Background Tint
          card: '#FFFFFF',        // White Cards
          border: '#E2E8F0',      // Subtle Card Borders
          cyan: '#06B6D4',        // Primary Bright Cyan
          blue: '#2563EB',        // Secondary Vibrant Blue
          purple: '#9333EA',      // Purple Accent
          purpleLight: '#A855F7', // Light Purple Accent
          dark: '#0F172A',        // Primary Headings / Dark Navy
          text: '#475569',        // Secondary Body Text
          muted: '#64748B',       // Muted Text
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(37, 99, 235, 0.08), 0 4px 12px -2px rgba(6, 182, 212, 0.06)',
        'hover': '0 20px 40px -10px rgba(37, 99, 235, 0.14), 0 8px 20px -4px rgba(147, 51, 234, 0.1)',
        'card': '0 4px 20px rgba(15, 23, 42, 0.05)',
        'floating': '0 20px 50px -12px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.04)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.35)',
        'glow-blue': '0 0 25px rgba(37, 99, 235, 0.35)',
        'glow-purple': '0 0 25px rgba(147, 51, 234, 0.3)',
      },
      borderRadius: {
        '2xl': '1.25rem', // 20px
        '3xl': '1.75rem', // 28px
      },
    },
  },
  plugins: [],
}
