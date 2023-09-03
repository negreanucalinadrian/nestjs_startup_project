import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    server: { https: true },
    plugins: [
        mkcert(),
        react(
        {
            exclude: /\.(stories|test)\.([tj])sx?$/,
            // Only .tsx files
            include: '**/*.tsx'
        }
    )],
    resolve: {
        alias: {
            '@': '/src/',
            '@shared_types': '../shared_types/',
        },
    },
    build: {
        outDir: '../server/dist_client'
    }
})
