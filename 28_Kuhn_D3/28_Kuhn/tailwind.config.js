/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'neonyellow-100': '#eeffa8',
        'neonyellow-200': '#e3ff6e',
        'neonyellow-500': '#CFFF04',
        'charcoal': '#474747',
      },
    },
    
  },
  plugins: [],
}

