/** @type {import('tailwindcss').Config} */
module.exports = {
  // Active le mode sombre via la classe 'dark'
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",  // Couleur de fond basée sur une variable CSS
        foreground: "var(--foreground)",  // Couleur de premier plan basée sur une variable CSS
        // Ajout des couleurs pour le mode sombre
        darkBackground: "#1a202c", // Exemple de couleur de fond en mode sombre
        darkForeground: "#a0aec0", // Exemple de couleur de texte en mode sombre
      },
    },
  },
  plugins: [],
};
