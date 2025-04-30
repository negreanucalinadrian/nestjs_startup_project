import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        mkcert(),
        tsconfigPaths(),
        react(
            {
                exclude: /\.(stories|test)\.([tj])sx?$/,
                // Only .tsx files
                include: '**/*.tsx',
            },
        ),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': '/src/',
            '@shared_types': '../shared_types/',
        },
    },
});
