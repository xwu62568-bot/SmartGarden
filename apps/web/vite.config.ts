import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages && repoName ? `/${repoName}/` : '/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
});
