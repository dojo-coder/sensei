import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Source files import RN primitives from 'react-native'; this alias resolves
// them to 'react-native-web' so they run in the browser preview.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    },
    extensions: ['.web.js', '.js', '.jsx', '.json']
  },
  define: {
    global: 'window',
    __DEV__: 'true'
  }
});
