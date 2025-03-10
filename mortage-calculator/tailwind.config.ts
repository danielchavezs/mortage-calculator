import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // 'xs': '375px', // Añadir un nuevo punto de quiebre para móviles pequeños
        'sm': '320px',
        'md': '480px',
        'lg': '900px',
        // 'xl': '1280px',
        // '2xl': '1536px',
      },
      colors: {
        lime: 'hsl(61, 70%, 52%)',
        ligthlime: 'hsl(61, 70%, 72%)',
        red: 'hsl(4, 69%, 50%)',
        // cyan: {
        //   50: 'rgb(207, 204, 253)'  // 'rgb(207, 204, 254)'
        // },
        slate: {
          100: 'hsl(202, 86%, 94%)',
          300: 'hsl(203, 41%, 72%)',
          500: 'hsl(200, 26%, 54%)',
          700: 'hsl(200, 24%, 40%)',
          900: 'hsl(202, 54%, 17%)',  // modificado para darle un grado menos al tono 'hsl(202, 55%, 18%)'
          920: 'hsl(202, 60%, 13%)',  // agregado para darle contraste al cuadro de resultados
        },
        white: 'hsl(0, 0%, 100%)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif']
      },
      fontSize: {
        base: '16px'
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      textColor: ['checked'],
    },
  },
  plugins: [],
};
export default config;
