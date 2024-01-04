import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    plugins: [require("daisyui")],
    darkMode: "class",
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
                    primary: "#f4aa3a",
                    secondary: "#f4f4a1",
                    accent: "#1be885",
                    neutral: "#aeaeb2",
                    "base-100": "#ffffff",
                    info: "#778ad4",
                    success: "#23b893",
                    warning: "#f79926",
                    error: "#ea535a",
                    body: {
                        "background-color": "#e3e6e6",
                    },
                },
            },
        ],
    },
}
export default config
