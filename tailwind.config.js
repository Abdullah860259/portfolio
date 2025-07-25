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
            transitionTimingFunction: {
                jump: 'cubic-bezier(0.68, -0.55, 0.265, 1.55))',
            },
            backgroundImage: {
                'half-red-blue': 'linear-gradient(to right, red 50%, blue 50%)',
            },
        },
    },
    plugins: [],
};
