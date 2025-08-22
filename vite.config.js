import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import tailwindcss from "@tailwindcss/vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@components': resolve(__dirname, './src/components/*'),
            "@pages/*": resolve(__dirname, './src/pages/*'),
            "@hooks/*": resolve(__dirname, './src/hooks/*'),
            "@utils/*": resolve(__dirname, './src/utils/*'),
            "@store/*": resolve(__dirname, './src/store/*'),
            "@api/*": resolve(__dirname, './src/api/*'),
            "@types/*": resolve(__dirname, './src/types/*'),
            "@assets/*": resolve(__dirname, './src/assets/*'),
            "@routes/*": resolve(__dirname, './src/routes/*'),
            "@services/*": resolve(__dirname, './src/services/*'),
            "@constants/*": resolve(__dirname, './src/constants/*'),
        },
    },
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    forms: ['formik', 'yup'],
                    query: ['@tanstack/react-query']
                }
            }
        }
    }
});
