
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				},
				// New muted pastel color palette for Gen Z appeal
				coral: {
					DEFAULT: 'hsl(var(--coral))',
					foreground: 'hsl(var(--coral-foreground))'
				},
				mint: {
					DEFAULT: 'hsl(var(--mint))',
					foreground: 'hsl(var(--mint-foreground))'
				},
				lavender: {
					DEFAULT: 'hsl(var(--lavender))',
					foreground: 'hsl(var(--lavender-foreground))'
				},
				peach: {
					DEFAULT: 'hsl(var(--peach))',
					foreground: 'hsl(var(--peach-foreground))'
				},
				sky: {
					DEFAULT: 'hsl(var(--sky))',
					foreground: 'hsl(var(--sky-foreground))'
				},
				// Legacy brand colors for backwards compatibility
				blush: {
					DEFAULT: 'hsl(var(--blush))',
					foreground: 'hsl(var(--blush-foreground))'
				},
				sunset: {
					DEFAULT: 'hsl(var(--sunset))',
					foreground: 'hsl(var(--sunset-foreground))'
				},
				cream: {
					DEFAULT: 'hsl(var(--cream))',
					foreground: 'hsl(var(--cream-foreground))'
				},
				imprint: {
					50: '#f5f3ff',
					100: '#ede8ff',
					200: '#dbd0ff',
					300: '#c4adff',
					400: '#aa83ff',
					500: '#9557ff',
					600: '#8235f5',
					700: '#7026d9',
					800: '#5a21b0',
					900: '#4b1e8e',
					950: '#2e1165',
				},
				memory: {
					50: '#fef2f3',
					100: '#fde6e7',
					200: '#fbd0d5',
					300: '#f9aab2',
					400: '#f47a8a',
					500: '#ea4c62',
					600: '#d42d4b',
					700: '#b21e3c',
					800: '#951c36',
					900: '#801c34',
				},
				warmth: {
					50: '#fff9ed',
					100: '#fff2d4',
					200: '#ffe2a8',
					300: '#ffcb70',
					400: '#ffb041',
					500: '#ff911d',
					600: '#f97109',
					700: '#cc4c0b',
					800: '#a93c11',
					900: '#8a3412',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'Poppins', 'Nunito Sans', 'sans-serif'],
				display: ['Poppins', 'Inter', 'sans-serif'],
				body: ['Inter', 'Poppins', 'sans-serif'],
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'card': 'var(--shadow-card)',
				'floating': 'var(--shadow-floating)',
				'coral': 'var(--shadow-coral)',
				'mint': 'var(--shadow-mint)',
				'lavender': 'var(--shadow-lavender)',
				'memory': '0 4px 15px rgba(234, 76, 98, 0.15)',
				'warm': '0 4px 15px rgba(255, 145, 29, 0.15)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'pulse-soft': {
					'0%, 100%': {
						opacity: '1',
					},
					'50%': {
						opacity: '0.8',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
