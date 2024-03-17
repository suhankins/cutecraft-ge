import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths()],
    esbuild: false,
    test: {
        environment: 'node',
        globals: true,
        clearMocks: true,
        unstubEnvs: true,
    },
});
