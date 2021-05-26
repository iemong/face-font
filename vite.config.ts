import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    server: {
        https: true,
    },
    resolve: {
        alias: [{ find: '~', replacement: '/src' }],
    },
})
