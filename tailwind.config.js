import animate from 'tailwindcss-animate'
import textScalePlugin from 'tailwindcss-text-scale'

/** @type {import('tailwindcss').Config} */
export const darkMode = ['class']
export const safelist = ['dark']
export const prefix = ''
export const content = [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{ts,tsx,vue}',
]
export const theme = {
    container: {
        center: true,
        padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
        },
        screens: {
            '2xl': '1440px',
        },
    },
    extend: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
        },
        transitionProperty: {
            border: 'border',
            padding: 'padding',
        },
        colors: {
            border: {
                DEFAULT: 'hsl(var(--border))',
                primary: 'hsl(var(--border-primary))',
                secondary: 'hsl(var(--border-secondary))',
            },
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
                DEFAULT: 'hsl(var(--primary))',
                foreground: 'hsl(var(--primary-foreground))',
                hover: 'hsl(var(--primary-hover))',
            },
            secondary: {
                DEFAULT: 'hsl(var(--secondary))',
                foreground: 'hsl(var(--secondary-foreground))',
            },
            destructive: {
                DEFAULT: 'hsl(var(--destructive))',
                foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
                DEFAULT: 'hsl(var(--muted))',
                foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
                DEFAULT: 'hsl(var(--accent))',
                foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
                DEFAULT: 'hsl(var(--popover))',
                foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
                DEFAULT: 'hsl(var(--card))',
                foreground: 'hsl(var(--card-foreground))',
            },
            'electric-green': 'hsl(var(--electric-green))',
            'blue-sky': 'hsl(var(--blue-sky))',
            'grey': 'hsl(var(--grey))',
            'chalk': 'hsl(var(--chalk))',
            'blue': 'hsl(var(--blue))',
            'olive': 'hsl(var(--olive))',
            'brown': 'hsl(var(--brown))',
            'ivy': 'hsl(var(--ivy))',
            'danger': 'hsl(var(--danger))',
        },
        borderRadius: {
            xl: 'calc(var(--radius) + 4px)',
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
        },
        keyframes: {
            'accordion-down': {
                from: { height: 0 },
                to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
                from: { height: 'var(--radix-accordion-content-height)' },
                to: { height: 0 },
            },
            'collapsible-down': {
                from: { height: 0 },
                to: { height: 'var(--radix-collapsible-content-height)' },
            },
            'collapsible-up': {
                from: { height: 'var(--radix-collapsible-content-height)' },
                to: { height: 0 },
            },
        },
        animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            'collapsible-down': 'collapsible-down 0.2s ease-in-out',
            'collapsible-up': 'collapsible-up 0.2s ease-in-out',
        },
        backgroundImage	: {
            'info-gradient': 'linear-gradient(0deg, rgba(0, 77, 242, 0.1), rgba(0, 77, 242, 0.1)), linear-gradient(to right, #FFFFFF, #E8F0FE)',
            'danger-gradient': 'linear-gradient(45deg, rgba(255, 0, 0, 0.2), rgba(255, 255, 255, 0.8))',
        },
    },
}
export const plugins = [animate, textScalePlugin]