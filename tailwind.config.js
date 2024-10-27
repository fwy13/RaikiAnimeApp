import daisyui from "daisyui";
import tailwindcss_animated from "tailwindcss-animated"
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [daisyui, tailwindcss_animated],
    daisyui: {
        themes: [
            "dark"
        ],
    },
};
