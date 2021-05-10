import { defineConfig, loadEnv } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

const env = loadEnv(
    'mock', // mode
    process.cwd(), // root
    '' // prefix (defaults to "VITE_")
)
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    define: {
        'process.env': env,
    },
    server: {
        https: true,
    },
    resolve: {
        alias: [{ find: '~', replacement: '/src' }],
    },
})
