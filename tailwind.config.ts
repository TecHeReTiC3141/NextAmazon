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
                    "base-100": "#312b2c",
                    "info": "#27cdff",
                    "success": "#5eb82e",
                    "warning": "#d39900",
                    "error": "#ff0048",
                    body: {
                        "background-color": "#191f2b",
                    }
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
                    body: {
                        "background-color": "#fff2f1",
                    }
                },
            },
        ],
    },
}
export default config
