import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Instrument Serif"', 'Georgia', 'serif'],
                sans: ['"Satoshi"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            },
            colors: {
                stone: {
                    50: '#F8F6F1',
                    100: '#F0EDE6',
                    200: '#E4E0D7',
                    300: '#D5D0C5',
                    400: '#A8A29A',
                    500: '#7A756D',
                    600: '#5C5852',
                    800: '#2C2A26',
                    900: '#1C1917',
                },
                ink: {
                    900: '#0F1419',
                    800: '#1B2838',
                },
                academic: {
                    blue: '#2C3E50',
                    green: '#2D6A4F',
                    accent: '#D4A853',
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                }
            },
            boxShadow: {
                'paper': '0 1px 3px rgba(15, 20, 25, 0.04)',
                'card': '0 4px 16px rgba(15, 20, 25, 0.06), 0 1px 4px rgba(15, 20, 25, 0.04)',
                'float': '0 12px 40px rgba(15, 20, 25, 0.1), 0 4px 12px rgba(15, 20, 25, 0.05)',
                'dramatic': '0 32px 80px rgba(15, 20, 25, 0.18), 0 8px 24px rgba(15, 20, 25, 0.08)',
                'glow': '0 0 60px -10px rgba(212, 168, 83, 0.35)',
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                breathe: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
                    '50%': { transform: 'scale(1.05)', opacity: '0.8' },
                },
                orbital: {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                'float': 'float 6s ease-in-out infinite',
                'breathe': 'breathe 4s ease-in-out infinite',
                'orbital': 'orbital 30s linear infinite',
                'orbital-reverse': 'orbital 20s linear infinite reverse',
                'marquee': 'marquee 35s linear infinite',
            },
        }
    },
    plugins: [],
} satisfies Config;
