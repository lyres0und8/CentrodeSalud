/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // ajusta la ruta a tu proyecto
    "./node_modules/flowbite/**/*.js", // para que se lean las clases de Flowbite
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: "#2563eb", // Color principal para botones
          700: "#1d4ed8", // Color hover
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
