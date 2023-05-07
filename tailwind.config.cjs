/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/*.{js,jsx,ts,tsx}",
        "./src/components/*.{js,jsx,ts,tsx}",
        "./src/components/web3/*.{js,jsx,ts,tsx}",
    ],

    plugins: [require("daisyui")],

    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "dark",
    },
}
