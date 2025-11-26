import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path'; 

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      allow: [
        path.resolve(__dirname, '.'),           
        path.resolve(__dirname, '../../'),      
        path.resolve(__dirname, '../../shared') 
      ]
    }
  },
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../../shared"),
     
    }
  }
});
