/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/*.{js,jsx,ts,tsx}",
        "./src/components/*.{js,jsx,ts,tsx}",
        "./src/components/web3/*.{js,jsx,ts,tsx}",
        "./src/components/NftViews/*.{js,jsx,ts,tsx}",
    ],

    plugins: [require("daisyui")],

    daisyui: {
        styled: true,
        themes: [
            {
                base: {
                    primary: "#0ea5e9",
                    secondary: "#a7f3d0",
                    accent: "#7dd3fc",
                    neutral: "#e5e7eb",
                    "base-100": "#374151",
                    info: "#c4b5fd",
                    success: "#22c55e",
                    warning: "#fbbd23",
                    error: "#dc2626",
                },
            },
        ],
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "base",
    },
}
