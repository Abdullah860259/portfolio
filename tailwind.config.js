const { PiShoppingBag } = require('react-icons/pi');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                spartan: ['League Spartan', 'sans-serif'],
                merriweather: ['Merriweather', 'serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
