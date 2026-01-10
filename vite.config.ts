import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // loadEnv is kept for potential future use, but environment variables
  // should be accessed via import.meta.env.VITE_* in the code
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    // Removed the 'define' block - it was an anti-pattern
    // Environment variables should be accessed via import.meta.env.VITE_*
    // Add your keys to .env.local with VITE_ prefix:
    // VITE_GEMINI_API_KEY=your-key-here
    // VITE_SUPABASE_URL=your-url-here
    // VITE_SUPABASE_ANON_KEY=your-key-here
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
