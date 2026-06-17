import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  define: {
    // react-native-web reads __DEV__ at runtime
    __DEV__: JSON.stringify(true)
  }
})
