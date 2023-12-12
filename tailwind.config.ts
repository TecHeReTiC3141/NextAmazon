import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                darkTheme: {
                    "primary": "#059669",
                    "secondary": "#009800",
                    "accent": "#00f800",
                    "neutral": "#050701",
                    "base-100": "#2d1f2a",
                    "info": "#27cdff",
                    "success": "#5eb82e",
                    "warning": "#d39900",
                    "error": "#ff0048",
                },
                lightTheme: {
                    "primary": "#3b82f6",
                    "secondary": "#00d440",
                    "accent": "#047857",
                    "neutral": "#0c1109",
                    "base-100": "#fff2f1",
                    "info": "#00e1ff",
                    "success": "#00c892",
                    "warning": "#ea580c",
                    "error": "#f43f5e",
                },
            },
        ],
    },
}
export default config
