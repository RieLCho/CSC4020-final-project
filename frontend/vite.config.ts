import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // WSL을 사용하는 경우 필요
    },
    hmr: {
      overlay: true,
    },
  },
});
