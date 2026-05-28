// Slowmotion by 1 second on test runs

import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        launchOptions: {
            slowMo: 1000,
        },
    },
});