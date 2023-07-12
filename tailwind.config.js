/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    extend: {
        screens: {
            xs: '375px',
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['bumblebee'],
    },
};
