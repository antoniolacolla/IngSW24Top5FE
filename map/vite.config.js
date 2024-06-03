import { fileURLToPath, URL } from 'node:url' // Importa le funzioni per manipolare gli URL dei file

import { defineConfig } from 'vite' // Importa la funzione defineConfig di Vite
import vue from '@vitejs/plugin-vue' // Importa il plugin Vue per Vite

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // Aggiunge il plugin Vue alla configurazione di Vite
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Imposta il proxy per le chiamate API verso il server backend locale
        changeOrigin: true // Cambia l'origine delle richieste in base all'URL di destinazione
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // Crea un alias '@' per la cartella 'src', rendendo più semplice importare i file
    }
  }
})