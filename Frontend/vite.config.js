import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
     ],
     theme: {
      extend: {
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
          palanquin: ['Palanquin', 'sans-serif'],
          inter: ['Inter', 'sans-serif'],
        },
      },
    },
     
})
